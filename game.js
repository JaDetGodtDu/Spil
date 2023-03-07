"use strict";

window.addEventListener("load", startScreen);

let points = 0;
let lives = 0;

function startScreen() {
  console.log("startScreen");
  document.querySelector("#startBtn").addEventListener("click", start);

  document.querySelector("#start_screen").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");

  document
    .querySelector("#btn_return_to_start")
    .addEventListener("click", restart);
}
function restart() {
  document.querySelector("#start_screen").classList.remove("hidden");
  document.querySelector("#start_screen").classList.add("zoom_in");
  document.querySelector("#game_over").classList.remove("zoom_in");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.remove("zoom_in");
  document.querySelector("#level_complete").classList.add("hidden");
  document.querySelector("#game").classList.remove("zoom_in");
  startScreen();
}
function start() {
  console.log("Game is running");

  //Prevents dragging - Makes stuf easier to click on i think
  const img = document.querySelector("img");
  img.ondragstart = () => {
    return false;
  };
  //Hide start screen
  document.querySelector("#start_screen").classList.add("hidden");

  document.querySelector("#game").classList.add("zoom_in");

  //Reset points and lives
  resetPoints();
  resetLives();

  //Start the stuf. It's alive!
  startMusic();
  startTimer();
  startAnimations();
  startClickListeners();
  setStartPositions();
}
function resetPoints() {
  points = 0;
  displayPoints();
}
function resetLives() {
  lives = 3;
  document.querySelector("#heart0").classList.remove("gray_heart");
  document.querySelector("#heart1").classList.remove("gray_heart");
  document.querySelector("#heart2").classList.remove("gray_heart");
}
function startAnimations() {
  document.querySelector("#mink1_container").classList.add("left_to_right");
  document.querySelector("#mink2_container").classList.add("right_to_left");
  document.querySelector("#lars_container").classList.add("left_to_right");
  document.querySelector("#jakob_container").classList.add("right_to_left");
  document.querySelector("#hvede_container").classList.add("left_to_right");
}
function startClickListeners() {
  document
    .querySelector("#mink1_container")
    .addEventListener("mousedown", clickMink1);
  document
    .querySelector("#mink2_container")
    .addEventListener("mousedown", clickMink2);
  document
    .querySelector("#lars_container")
    .addEventListener("mousedown", clickLars);
  document
    .querySelector("#jakob_container")
    .addEventListener("mousedown", clickJakob);
  document
    .querySelector("#hvede_container")
    .addEventListener("mousedown", clickHvede);
}
function setStartPositions() {
  document.querySelector("#mink1_container").classList.add("position1");
  document.querySelector("#mink2_container").classList.add("position2");
  document.querySelector("#lars_container").classList.add("position3");
  document.querySelector("#jakob_container").classList.add("position4");
  document.querySelector("#hvede_container").classList.add("position5");
}
function startMusic() {
  console.log("music is playing");
  document.querySelector("#game_music").volume = 0.75;
  document.querySelector("#game_music").load();
  document.querySelector("#game_music").play();
  document.querySelector("#game_music").loop = true;
}
function clickMink1() {
  console.log("clickMink1");
  let container = this;

  document.querySelector("#mink_sound").volume = 0.2;
  document.querySelector("#mink_sound").play();
  document.querySelector("#mink_sound").currentTime = 0;
  // Stop listening for click
  container.removeEventListener("mousedown", clickMink1);
  // Stop container at clicked position
  container.classList.add("paused");
  //Start zoom/rotate animation
  document.querySelector("#mink1_sprite").classList.add("rotate_zoom");
  //When animation stops, run mink1Gone
  container.addEventListener("animationend", mink1Gone);
  givePoints();
}
function clickMink2() {
  console.log("clickMink2");
  let container = this;

  document.querySelector("#mink_sound").volume = 0.2;
  document.querySelector("#mink_sound").play();
  document.querySelector("#mink_sound").currentTime = 0;
  // Stop listening for click
  container.removeEventListener("mousedown", clickMink2);
  // Stop container at clicked position
  container.classList.add("paused");
  //Start zoom/rotate animation
  document.querySelector("#mink2_sprite").classList.add("rotate_zoom");
  //When animation stops, run mink2Gone
  container.addEventListener("animationend", mink2Gone);
  givePoints();
}
function clickHvede() {
  console.log("clickHvede");
  let container = this;

  document.querySelector("#hvede_sound").volume = 0.5;
  document.querySelector("#hvede_sound").play();
  document.querySelector("#hvede_sound").currentTime = 0;
  // Stop listening for click
  container.removeEventListener("mousedown", clickHvede);
  // Stop container at clicked position
  container.classList.add("paused");
  //Start zoom/rotate animation
  document.querySelector("#hvede_sprite").classList.add("rotate_zoom");
  //When animation stops, run hvedeGone
  container.addEventListener("animationend", hvedeGone);
  giveHvedePoints();
}
function clickLars() {
  console.log("clickLars");
  let container = this;

  document.querySelector("#lars_jakob_sound").volume = 0.5;
  document.querySelector("#lars_jakob_sound").play();
  document.querySelector("#lars_jakob_sound").currentTime = 0;
  //Stop listening for click
  container.removeEventListener("mousedown", clickLars);
  // Stop container at clicked position
  container.classList.add("paused");
  //Start zoom/rotate animation
  document.querySelector("#lars_sprite").classList.add("rotate_zoom");
  //When animation stops, run larsGone
  container.addEventListener("animationend", larsGone);

  decreaseLives();
}
function clickJakob() {
  console.log("clickJakob");
  let container = this;

  document.querySelector("#lars_jakob_sound").volume = 0.5;
  document.querySelector("#lars_jakob_sound").play();
  document.querySelector("#lars_jakob_sound").currentTime = 0;
  //Stop listening for click
  container.removeEventListener("mousedown", clickJakob);
  // Stop container at clicked position
  container.classList.add("paused");
  //Start zoom/rotate animation
  document.querySelector("#jakob_sprite").classList.add("rotate_zoom");
  //When animation stops, run jakobGone
  container.addEventListener("animationend", jakobGone);
  decreaseLives();
}
function mink1Gone() {
  console.log("mink1Gone");
  let container = this;
  //Stop listening
  container.removeEventListener("animationend", mink1Gone);
  //Remove rotate_zoom animation
  document.querySelector("#mink1_sprite").classList.remove("rotate_zoom");
  //Remove paused animation
  container.classList.remove("paused");
  //Restart animations
  container.classList.remove("left_to_right");
  container.offsetHeight;
  container.classList.add("left_to_right");
  //Start listening for click again
  container.addEventListener("mousedown", clickMink1);
}
function mink2Gone() {
  console.log("mink2Gone");
  let container = this;
  //Stop listening to not run mink2Gone
  container.removeEventListener("animationend", mink2Gone);
  //Remove rotate_zoom animation
  document.querySelector("#mink2_sprite").classList.remove("rotate_zoom");
  //Remove paused animation
  container.classList.remove("paused");
  //Restart animations
  container.classList.remove("right_to_left");
  container.offsetHeight;
  container.classList.add("right_to_left");
  //Start listening for click again
  container.addEventListener("mousedown", clickMink2);
}
function hvedeGone() {
  console.log("hvedeGone");
  let container = this;
  //Stop listening
  container.removeEventListener("animationend", hvedeGone);
  //Remove rotate_zoom animation
  document.querySelector("#hvede_sprite").classList.remove("rotate_zoom");
  //Remove paused animation
  container.classList.remove("paused");
  //Restart animations
  container.classList.remove("left_to_right");
  container.offsetHeight;
  container.classList.add("left_to_right");
  //Start listening for click again
  container.addEventListener("mousedown", clickHvede);
}
function larsGone() {
  console.log("larsGone");
  let container = this;
  //Stop listening
  container.removeEventListener("animationend", larsGone);
  //Remove rotate_zoom animation
  document.querySelector("#lars_sprite").classList.remove("rotate_zoom");
  //Remove paused animation
  container.classList.remove("paused");
  //Restart animations
  container.classList.remove("left_to_right");
  container.offsetHeight;
  container.classList.add("left_to_right");
  //Start listening for click again
  container.addEventListener("mousedown", clickLars);
}
function jakobGone() {
  console.log("jakobGone");
  let container = this;
  //Stop listening
  container.removeEventListener("animationend", jakobGone);
  //Remove rotate_zoom animation
  document.querySelector("#jakob_sprite").classList.remove("rotate_zoom");
  //Remove paused animation
  container.classList.remove("paused");
  //Restart animations
  container.classList.remove("right_to_left");
  container.offsetHeight;
  container.classList.add("right_to_left");
  //Start listening for click again
  container.addEventListener("mousedown", clickJakob);
}
function givePoints() {
  console.log("givePoints");
  points = points + 10;
  displayPoints();
}
function giveHvedePoints() {
  console.log("giveHvedePoints");
  points = points + 25;
  displayPoints();
}
function displayPoints() {
  console.log("displayPoints");
  document.querySelector("#score").textContent = points;
}
function decreaseLives() {
  console.log("mist et liv");
  lives--;
  if (lives <= 0) {
    showDecreasedLives();
    setTimeout(() => {
      game_over();
    }, 1250);
  } else {
    showDecreasedLives();
  }
}
function showDecreasedLives() {
  document.querySelector("#heart" + lives).classList.add("gray_heart");
}
function game_over() {
  console.log("Game Over");
  document.querySelector("#game_over").classList.add("zoom_in");
  document.querySelector("#game_over").classList.remove("hidden");

  stopGame();

  document.querySelector("#game_music").pause();
  document.querySelector("#game_over_sound").play();
}
function levelComplete() {
  console.log("Level Complete");
  document.querySelector("#level_complete").classList.add("zoom_in");
  document.querySelector("#level_complete").classList.remove("hidden");

  stopGame();

  document.querySelector("#game_music").pause();
  document.querySelector("#succes_music").play();
  document.querySelector("#wow_sound").play();

  document
    .querySelector("#btn_return_to_start1")
    .addEventListener("click", restart);

  document.querySelector(
    "#playerPoints"
  ).textContent = `Du har tjent: ${points} point. Tillykke!`;
}
function stopGame() {
  console.log("stopGame");

  document.querySelector("#mink1_container").classList.remove("position1");
  document.querySelector("#mink2_container").classList.remove("position2");
  document.querySelector("#lars_container").classList.remove("position3");
  document.querySelector("#jakob_container").classList.remove("position4");
  document.querySelector("#hvede_container").classList.remove("position5");

  document.querySelector("#mink1_container").classList.remove("left_to_right");
  document.querySelector("#mink2_container").classList.remove("right_to_left");
  document.querySelector("#hvede_container").classList.remove("left_to_right");
  document.querySelector("#lars_container").classList.remove("left_to_right");
  document.querySelector("#jakob_container").classList.remove("right_to_left");

  document.querySelector("#number").classList.remove("count");
}
function startTimer() {
  console.log("startTimer");
  document.querySelector("#number").classList.add("count");
  document.querySelector("#number").addEventListener("animationend", timeIsUp);
}
function timeIsUp() {
  console.log("timeIsUp");
  document.querySelector("#number").classList.remove("count");

  levelComplete();
}
