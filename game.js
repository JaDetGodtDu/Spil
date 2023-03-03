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
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}
function start() {
  console.log("JavaScript running");

  //Prevents dragging - Makes stuf easier to click on i think
  const img = document.querySelector("img");
  img.ondragstart = () => {
    return false;
  };
  //Hide start screen
  document.querySelector("#start_screen").classList.add("hidden");

  //Start the music
  startMusic();
  //Reset points and lives
  resetPoints();
  resetLives();

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
}
function startClickListeners() {
  document
    .querySelector("#mink1_container")
    .addEventListener("click", clickMink1);
  document
    .querySelector("#mink2_container")
    .addEventListener("click", clickMink2);
  document
    .querySelector("#lars_container")
    .addEventListener("click", clickLars);
  document
    .querySelector("#jakob_container")
    .addEventListener("click", clickJakob);
}
function setStartPositions() {
  document.querySelector("#mink1_container").classList.add("position1");
  document.querySelector("#mink2_container").classList.add("position2");
  document.querySelector("#lars_container").classList.add("position3");
  document.querySelector("#jakob_container").classList.add("position4");
}
function startMusic() {
  console.log("music is playing");
  document.querySelector("#game_music").load();
  document.querySelector("#game_music").play();
  document.querySelector("#game_music").loop = true;
}

function clickMink1() {
  console.log("clickMink1");
  let container = this;

  document.querySelector("#mink_sound").play();
  document.querySelector("#mink_sound").currentTime = 0;
  // Stop listening for click
  container.removeEventListener("click", clickMink1);
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

  document.querySelector("#mink_sound").play();
  document.querySelector("#mink_sound").currentTime = 0;
  // Stop listening for click
  container.removeEventListener("click", clickMink2);
  // Stop container at clicked position
  container.classList.add("paused");
  //Start zoom/rotate animation
  document.querySelector("#mink2_sprite").classList.add("rotate_zoom");
  //When animation stops, run mink1Gone
  container.addEventListener("animationend", mink2Gone);
  givePoints();
}

function clickLars() {
  console.log("clickLars");
  let container = this;

  document.querySelector("#lars_jakob_sound").play();
  document.querySelector("#lars_jakob_sound").currentTime = 0;
  //Stop listening for click
  container.removeEventListener("click", clickLars);
  // Stop container at clicked position
  container.classList.add("paused");
  //Start zoom/rotate animation
  document.querySelector("#lars_sprite").classList.add("rotate_zoom");
  //When animation stops, run mink1Gone
  container.addEventListener("animationend", larsGone);

  decreaseLives();
}

function clickJakob() {
  console.log("clickJakob");
  let container = this;

  document.querySelector("#lars_jakob_sound").play();
  document.querySelector("#lars_jakob_sound").currentTime = 0;
  //Stop listening for click
  container.removeEventListener("click", clickJakob);
  // Stop container at clicked position
  container.classList.add("paused");
  //Start zoom/rotate animation
  document.querySelector("#jakob_sprite").classList.add("rotate_zoom");
  //When animation stops, run mink1Gone
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
  container.addEventListener("click", clickMink1);
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
  container.addEventListener("click", clickMink2);
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
  container.addEventListener("click", clickLars);
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
  container.addEventListener("click", clickJakob);
}
function givePoints() {
  console.log("givePoints");
  points = points + 10;
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
function timer() {
  let time = 90;
}

function game_over() {
  console.log("Game Over");
  document.querySelector("#game_over").classList.remove("hidden");

  /* stopGame(); */

  document.querySelector("#game_music").pause();
  document.querySelector("#game_over_sound").play();
}
function levelComplete() {
  console.log("Level Complete");
  document.querySelector("#level_complete").classList.remove("hidden");

  document.querySelector("#game_music").pause();
  document.querySelector("#succes_music").play();
  document.querySelector("#wow_sound").play();

  document
    .querySelector("#btn_return_to_start1")
    .addEventListener("click", restart);

  document.querySelector("#playerPoints").textContent =
    /* "Du har tjent: " + points + " point."; */
    `Du har tjent: ${points} points. Tillykke!`;
}
/* function stopGame() {
  console.log("game has stopped");
  document.querySelector("#game").remove();
} */
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
