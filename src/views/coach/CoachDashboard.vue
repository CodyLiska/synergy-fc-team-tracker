<template>
  <PageWrapper>
    <div class="main-container">
      <div class="coach-dashboard">

        <!-- Team Stats Section -->
        <div class="section-card">
          <h2 class="section-heading"><el-icon>
              <TrendCharts />
            </el-icon>Team Stats</h2>
          <StatsRow :statsArray="statsArray" />
          <div class="add-game-outcome-button">
            <el-button type="primary" @click="navigateToAddGameOutcome" style="margin-top: 10px;">Add Game
              Outcome</el-button>
          </div>
        </div>

        <!-- Team Skills Chart Section -->
        <div class="section-card team-skills-chart-section">
          <h2 class="section-heading"><el-icon>
              <DataAnalysis />
            </el-icon> Team Skills Overview</h2>
          <TeamSkillsChart :data="teamSkillsData" />
          <div v-if="teamSkillsData.labels[0] === 'No Data Available'">
            No player data available. Add players to see the chart.
          </div>
        </div>


        <!-- Player Section -->
        <div class="section-card">
          <h2 class="section-heading"><el-icon>
              <User />
            </el-icon> Players</h2>
          <div class="add-player-button">
            <el-button type="primary" @click="navigateToCreatePlayer"><el-icon>
                <Plus />
              </el-icon> Add New Player</el-button>
          </div>
          <el-skeleton v-if="isLoadingPlayers" animated :rows="3" />

          <PlayerCards :players="players" :getAverage="getAverage" @player-archived="handlePlayerDataChanged"
            @show-details="handleShowDetails" @player-updated="handlePlayerDataChanged" />

          <PlayerDetail v-if="selectedPlayer" :player="selectedPlayer" :visible="playerDialogVisible"
            @update:visible="playerDialogVisible = $event" @player-updated="handlePlayerUpdated" />
        </div>

        <!-- Recent Activity Section -->
        <div class="section-card">
          <h2 class="section-heading"><el-icon>
              <Document />
            </el-icon> Recent Activity</h2>
          <div class="recent-activity-header">
            <el-button type="primary" @click="goToAddActivity">Add Activity</el-button>
          </div>
          <RecentActivity :recentActivity="combinedRecent" @delete="handleDeleteRecent" />
          <!-- <el-button type="primary" @click="goToAddActivity" style="margin-top: 10px;">Add Activity</el-button> -->
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router';
import { playerService } from '../../services/playerService';
import { recentActivityService } from '../../services/recentActivityService';
import { teamStatsService } from '../../services/teamStatsService';
import PageWrapper from '../../components/ui/PageWrapper.vue';
import StatsRow from '../../components/dashboard/StatsRow.vue';
import TeamSkillsChart from '../../components/dashboard/TeamSkillsChart.vue';
import PlayerCards from '../../components/dashboard/PlayerCards.vue';
import PlayerDetail from '../../components/dashboard/PlayerDetail.vue';
import RecentActivity from '../../components/dashboard/RecentActivity.vue';
import axios from 'axios';
import { Document, DataAnalysis, User, TrendCharts, Plus } from '@element-plus/icons-vue'


// --- State and Logic ---
const router = useRouter();
const players = ref([])
const playerDialogVisible = ref(false)
const selectedPlayer = ref(null)
const recentActivity = ref([]);
const recentGames = ref([]);
const isLoadingPlayers = ref(false);

// --- TEAM STATS (from backend) ---
const teamStats = ref({
  totalPlayers: 0,
  gamesPlayed: 0,
  winRate: '0%',
  teamRating: 0,
});

// --- STATS ROW ---
const statsArray = computed(() => [
  { label: 'Total Players', value: teamStats.value.totalPlayers, desc: 'Players on roster' },
  { label: 'Games Played', value: teamStats.value.gamesPlayed, desc: 'Total games played' },
  { label: 'Win Rate', value: teamStats.value.winRate, desc: 'Win percentage' },
  { label: 'Team Rating', value: teamStats.value.teamRating, desc: 'Avg. technical rating' },
]);

// --- TEAM SKILLS CHART ---
const teamSkillsData = ref({
  labels: ['No Data Available'],
  datasets: [
    {
      label: 'No Data',
      backgroundColor: '#e0e0e0',
      data: [0],
    },
  ],
});

// Navigate to CreatePlayer.vue
const navigateToCreatePlayer = () => {
  router.push('/create-player');
};

// Navigate to AddGameOutcome.vue
const navigateToAddGameOutcome = () => {
  router.push('/add-game-outcome');
};

// --- PLAYERS CARDS ---
const fetchPlayers = async () => {
  try {
    isLoadingPlayers.value = true;
    players.value = await playerService.getAllPlayers();
  } catch (error) {
    ElMessage.error("Error fetching players.");
  } finally {
    isLoadingPlayers.value = false;
  }
};

const fetchTeamSkillsData = async () => {
  try {
    const playersArr = await playerService.getAllPlayers();
    if (playersArr.length === 0) {
      teamSkillsData.value = {
        labels: ['No Data Available'],
        datasets: [
          {
            label: 'No Data',
            backgroundColor: '#e0e0e0',
            data: [0],
          },
        ],
      };
      teamStats.value.teamRating = 0;
      return;
    }

    // Initialize totals and counts for each category
    const totals = {
      psychological: 0,
      physical: 0,
      socialEmotional: 0,
      technical: 0,
    };
    const counts = {
      psychological: 0,
      physical: 0,
      socialEmotional: 0,
      technical: 0,
    };

    // Calculate totals and counts
    playersArr.forEach((player) => {
      Object.values(player.psychological || {}).forEach((value) => {
        totals.psychological += value;
        counts.psychological++;
      });
      Object.values(player.physical || {}).forEach((value) => {
        totals.physical += value;
        counts.physical++;
      });
      Object.values(player.socialEmotional || {}).forEach((value) => {
        totals.socialEmotional += value;
        counts.socialEmotional++;
      });
      Object.values(player.technical || {}).forEach((value) => {
        totals.technical += value;
        counts.technical++;
      });
    });

    // Calculate averages
    const averages = {
      psychological: counts.psychological ? (totals.psychological / counts.psychological).toFixed(1) : 0,
      physical: counts.physical ? (totals.physical / counts.physical).toFixed(1) : 0,
      socialEmotional: counts.socialEmotional
        ? (totals.socialEmotional / counts.socialEmotional).toFixed(1)
        : 0,
      technical: counts.technical ? (totals.technical / counts.technical).toFixed(1) : 0,
    };

    // Update chart data
    teamSkillsData.value = {
      labels: ['Psychological', 'Physical', 'Social/Emotional', 'Technical'],
      datasets: [
        {
          label: 'Team Average',
          backgroundColor: '#3498fd',
          data: [
            parseFloat(averages.psychological),
            parseFloat(averages.physical),
            parseFloat(averages.socialEmotional),
            parseFloat(averages.technical),
          ],
        },
      ],
    };

    // Calculate team rating as the average of the four category averages
    const avgValues = [
      parseFloat(averages.psychological),
      parseFloat(averages.physical),
      parseFloat(averages.socialEmotional),
      parseFloat(averages.technical),
    ];
    const teamRating =
      avgValues.reduce((sum, val) => sum + val, 0) / avgValues.length;
    teamStats.value.teamRating = teamRating.toFixed(2);

  } catch (error) {
    console.error('Error fetching team skills data:', error);
  }
};

// Fetch team stats from backend
const fetchTeamStats = async () => {
  try {
    const stats = await teamStatsService.getTeamStats();
    teamStats.value.totalPlayers = stats.totalPlayers;
    teamStats.value.gamesPlayed = stats.gamesPlayed;
    teamStats.value.winRate = stats.winRate;
    // teamRating will be set after bar chart averages are calculated
  } catch (err) {
    console.error('Error fetching team stats:', err);
  }
};

const handlePlayerDataChanged = async () => {
  await fetchPlayers();
  await fetchTeamSkillsData();
  await fetchTeamStats();
};

const getAverage = (skills) => {
  const values = Object.values(skills);
  return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
};

const handleShowDetails = (player) => {
  selectedPlayer.value = player;
  playerDialogVisible.value = true;
};

// --- RECENT ACTIVITY ---
const fetchRecentActivity = async () => {
  try {
    recentActivity.value = await recentActivityService.getRecentActivity();
  } catch (error) {
    console.error('Error fetching recent activity:', error);
  }
};

const goToAddActivity = () => {
  router.push('/add-activity');
};

const fetchRecentGames = async () => {
  try {
    // Fetch the most recent games, e.g., last 5
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/games?limit=5&sort=-date`);
    recentGames.value = response.data;
  } catch (error) {
    console.error('Error fetching recent games:', error);
  }
};

const combinedRecent = computed(() => {
  // Helper to format date as MM/DD/YYYY
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d)) return '';
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  // Map games to the same shape as activities
  const mappedGames = recentGames.value.map(game => ({
    _id: game._id,
    date: formatDate(game.date),
    player: 'Team',
    activity: 'Game Outcome',
    details: `vs ${game.opponent}: ${game.score.us}-${game.score.them} (${game.result})`
  }));

  // Map activities and format their date too
  const mappedActivities = recentActivity.value.map(act => ({
    ...act,
    date: formatDate(act.date)
  }));

  // Combine and sort by date descending
  return [...mappedActivities, ...mappedGames].sort((a, b) => new Date(b.date) - new Date(a.date));
});

const handleDeleteRecent = async (row) => {
  try {
    if (row.activity === 'Game Outcome') {
      // Delete game
      await axios.delete(`${import.meta.env.VITE_API_URL}/games/${row._id}`);
      await fetchRecentGames();
      await fetchTeamStats();
    } else {
      // Delete activity
      await recentActivityService.deleteActivity(row._id);
      await fetchRecentActivity();
    }
  } catch (error) {
    console.error('Error deleting row:', error);
  }
};

// Call this function when the component is mounted
onMounted(() => {
  fetchPlayers();
  fetchTeamStats();
  fetchTeamSkillsData();
  fetchRecentActivity();
  fetchRecentGames();
});
</script>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  width: 100%;
  overflow-x: hidden;
}

.section-heading:not(:first-child) {
  border-top: 1px solid #eee;
  padding-top: 24px;
}

.add-game-outcome-button,
.add-player-button,
.recent-activity-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

.coach-dashboard {
  padding: 16px 0 32px 0;
  overflow-x: hidden;
}
</style>