import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { playerService } from "@/services/playerService";
import { recentActivityService } from "@/services/recentActivityService";
import { teamStatsService } from "@/services/teamStatsService";
import axios from "axios";

export function useCoachDashboard() {
  const router = useRouter();

  const players = ref([]);
  const playerDialogVisible = ref(false);
  const selectedPlayer = ref(null);
  const recentActivity = ref([]);
  const recentGames = ref([]);

  const teamStats = ref({
    totalPlayers: 0,
    gamesPlayed: 0,
    winRate: "0%",
    teamRating: 0,
  });

  const statsArray = computed(() => [
    {
      label: "Total Players",
      value: teamStats.value.totalPlayers,
      desc: "Players on roster",
    },
    {
      label: "Games Played",
      value: teamStats.value.gamesPlayed,
      desc: "Total games played",
    },
    {
      label: "Win Rate",
      value: teamStats.value.winRate,
      desc: "Win percentage",
    },
    {
      label: "Team Rating",
      value: teamStats.value.teamRating,
      desc: "Avg. technical rating",
    },
  ]);

  const teamSkillsData = ref({
    labels: ["No Data Available"],
    datasets: [
      {
        label: "No Data",
        backgroundColor: "#e0e0e0",
        data: [0],
      },
    ],
  });

  const fetchTeamStats = async () => {
    try {
      const stats = await teamStatsService.getTeamStats();
      teamStats.value.totalPlayers = stats.totalPlayers;
      teamStats.value.gamesPlayed = stats.gamesPlayed;
      teamStats.value.winRate = stats.winRate;
    } catch (err) {
      console.error("Error fetching team stats:", err);
    }
  };

  const fetchTeamSkillsData = async () => {
    try {
      const playersArr = await playerService.getAllPlayers();

      if (playersArr.length === 0) {
        teamSkillsData.value = {
          labels: ["No Data Available"],
          datasets: [
            { label: "No Data", backgroundColor: "#e0e0e0", data: [0] },
          ],
        };
        teamStats.value.teamRating = 0;
        return;
      }

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

      playersArr.forEach((player) => {
        Object.values(player.psychological || {}).forEach((val) => {
          totals.psychological += val;
          counts.psychological++;
        });
        Object.values(player.physical || {}).forEach((val) => {
          totals.physical += val;
          counts.physical++;
        });
        Object.values(player.socialEmotional || {}).forEach((val) => {
          totals.socialEmotional += val;
          counts.socialEmotional++;
        });
        Object.values(player.technical || {}).forEach((val) => {
          totals.technical += val;
          counts.technical++;
        });
      });

      const averages = {
        psychological: counts.psychological
          ? (totals.psychological / counts.psychological).toFixed(1)
          : 0,
        physical: counts.physical
          ? (totals.physical / counts.physical).toFixed(1)
          : 0,
        socialEmotional: counts.socialEmotional
          ? (totals.socialEmotional / counts.socialEmotional).toFixed(1)
          : 0,
        technical: counts.technical
          ? (totals.technical / counts.technical).toFixed(1)
          : 0,
      };

      teamSkillsData.value = {
        labels: ["Psychological", "Physical", "Social/Emotional", "Technical"],
        datasets: [
          {
            label: "Team Average",
            backgroundColor: "#3498fd",
            data: [
              parseFloat(averages.psychological),
              parseFloat(averages.physical),
              parseFloat(averages.socialEmotional),
              parseFloat(averages.technical),
            ],
          },
        ],
      };

      const avgValues = Object.values(averages).map(parseFloat);
      teamStats.value.teamRating = (
        avgValues.reduce((sum, val) => sum + val, 0) / avgValues.length
      ).toFixed(2);
    } catch (error) {
      console.error("Error fetching team skills data:", error);
    }
  };

  const fetchPlayers = async () => {
    try {
      players.value = await playerService.getAllPlayers();
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      recentActivity.value = await recentActivityService.getRecentActivity();
    } catch (error) {
      console.error("Error fetching recent activity:", error);
    }
  };

  const fetchRecentGames = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/games?limit=5&sort=-date`
      );
      recentGames.value = response.data;
    } catch (error) {
      console.error("Error fetching recent games:", error);
    }
  };

  const combinedRecent = computed(() => {
    const formatDate = (dateStr) => {
      const d = new Date(dateStr);
      if (isNaN(d)) return "";
      return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(
        d.getDate()
      ).padStart(2, "0")}/${d.getFullYear()}`;
    };

    const mappedGames = recentGames.value.map((game) => ({
      _id: game._id,
      date: formatDate(game.date),
      player: "Team",
      activity: "Game Outcome",
      details: `vs ${game.opponent}: ${game.score.us}-${game.score.them} (${game.result})`,
    }));

    const mappedActivities = recentActivity.value.map((act) => ({
      ...act,
      date: formatDate(act.date),
    }));

    return [...mappedActivities, ...mappedGames].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  });

  const handleDeleteRecent = async (row) => {
    try {
      if (row.activity === "Game Outcome") {
        await axios.delete(`${import.meta.env.VITE_API_URL}/games/${row._id}`);
        await fetchRecentGames();
      } else {
        await recentActivityService.deleteActivity(row._id);
        await fetchRecentActivity();
      }
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  onMounted(() => {
    fetchPlayers();
    fetchTeamStats();
    fetchTeamSkillsData();
    fetchRecentActivity();
    fetchRecentGames();
  });

  return {
    players,
    playerDialogVisible,
    selectedPlayer,
    teamStats,
    statsArray,
    teamSkillsData,
    recentActivity,
    recentGames,
    combinedRecent,
    fetchTeamStats,
    fetchTeamSkillsData,
    fetchPlayers,
    fetchRecentActivity,
    fetchRecentGames,
    handleDeleteRecent,
  };
}
