# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

# TODO:

~~- Team Average chart background not changing to dark theme~~

- [x] Minor UI tweaks
- [x] Hook up to database
- [x] Add a player creation form

- COACH DASHBOARD
  - [x] Add a recent activity form and update the component to pull data from the database
  - [x] Trash Can Icon for Recent Activity doesn't delete the activity and it should also refresh the list
  - [x] Team Stats > Win Rate needs to be calculated, currently it's hardcoded to 0%
  - [x] Team Stats > Team Rating needs to be calculated, currently it's hardcoded to 0
  - [x] page doesn't refresh when a player is archived
  
- PLAYERS CARDS
  - [x] Add a Delete button next to view details for each card and the functionality to delete a player

- IN THE MODAL
  - [x] Update the modal to display the player's skills hierarchy data
  - [x] Add a player update button with a form to update the player's skills hierarchy data
  - [] EDIT PLAYER MODAL needs to be wider, font goes off screen
  
- PLAYER MODEL
- [ ] add robustness to the model
  - [ ] parents name
  - [ ] parents contact info (phone, email, etc)
  
- ACTIVITY TABLE
- [x] delete button for game outcomes isn't deleting from the table
- [ ] possible have it update with data from sport easy app
  
- SUMMARY PAGES
- [ ] add a summary page to display all games played

- TEAM STATS SECTION
- [x] Games Played card not updating when a game is deleted from the Recent Activity table

- VIEW DETAILS MODAL
- [x] stats aren't displaying in the modal

## Down the road (NICE TO HAVE)
- [ ] implement a better color scheme - TEMPORARY FOR NOW
  - the overall layout 
  - bar graph colors
- [ ] to delete a row from RecentActivity, you have to click into it to display a modal, then click the delete button.
- [ ] make the font in the Team Skills Overview chart look better.


# IMEDIATE TODO
- [ ] view details modal not showing data
- [ ] view details modal, undo the changes that turned it into an edit modal. *that might fix ^^^ this above one too
- [ ] in edit player modal the skill values need to be limited to 0-5