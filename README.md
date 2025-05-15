# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

# TODO:

~~- Team Average chart background not changing to dark theme~~

- [x] Minor UI tweaks
- [x] Hook up to database
- [x] Add a player creation form
- COACH DASHBOARD
  - [x] Add a recenet activity form and update the component to pull data from the database
  - [x] Trash Can Icon for Recent Activity doesn't delete the activity and it should also refresh the list
  - [x] Team Stats > Win Rate needs to be calculated, currently it's hardcoded to 0%
  - [x] Team Stats > Team Rating needs to be calculated, currently it's hardcoded to 0
- PLAYERS CARDS
  - [x] Add a Delete button next to view details for each card and the functionality to delete a player
- IN THE MODAL
  - [x] Update the modal to display the player's skills heirarchy data
  - [x] Add a player update button with a form to update the player's skills heirarchy data
- PLAYER MODEL
- [ ] add robustness to the model
  - [ ] parents name
  - [ ] parnets contact info (phone, email, etc)
- ACTIVITY TABLE
- [ ] delete button for game outcomes isn't deleting from the table
- [ ] possible have it update with data from sport easy app
- SUMMARY PAGES
- [ ] add a summary page to display all games played

## Down the road
- [ ] implement a better color scheme - TEMPORARY FOR NOW
  - the overall layout 
  - bar graph colors
- [ ] to delete a row from RecentActivity, you have to click into it to diplay a modal, then click the delete button.