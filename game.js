"use strict";

window.addEventListener("load", start);

let points = 0;
let lives = 0;

function start() {
  console.log("JavaScript running");
  //Prevents dragging - Makes stuf easier to click on i think
  const img = document.querySelector("img");
  img.ondragstart = () => {
    return false;
  };
  //Reset points and lives
  points = 0;
  lives = 3;

  startAnimations();
  startClickListeners();
  setStartPositions();
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

function clickMink1() {
  console.log("clickMink1");
  // Stop listening for click
  document
    .querySelector("#mink1_container")
    .removeEventListener("click", clickMink1);
  // Stop container at clicked position
  document.querySelector("#mink1_container").classList.add("paused");
  //Start zoom/rotate animation
  document.querySelector("#mink1_sprite").classList.add("rotate_zoom");
  //When animation stops, run mink1Gone
  document
    .querySelector("#mink1_container")
    .addEventListener("animationend", mink1Gone);
  givePoints();
}

function clickMink2() {
  console.log("clickMink2");
  // Stop listening for click
  document
    .querySelector("#mink2_container")
    .removeEventListener("click", clickMink2);
  // Stop container at clicked position
  document.querySelector("#mink2_container").classList.add("paused");
  //Start zoom/rotate animation
  document.querySelector("#mink2_sprite").classList.add("rotate_zoom");
  //When animation stops, run mink1Gone
  document
    .querySelector("#mink2_container")
    .addEventListener("animationend", mink2Gone);
  givePoints();
}

function clickLars() {
  console.log("clickLars");
  //Stop listening for click
  document
    .querySelector("#lars_container")
    .removeEventListener("click", clickLars);
  // Stop container at clicked position
  document.querySelector("#lars_container").classList.add("paused");
  //Start zoom/rotate animation
  document.querySelector("#lars_sprite").classList.add("rotate_zoom");
  //When animation stops, run mink1Gone
  document
    .querySelector("#lars_container")
    .addEventListener("animationend", larsGone);

  decreaseLives();
}

function clickJakob() {
  console.log("clickJakob");
  //Stop listening for click
  document
    .querySelector("#jakob_container")
    .removeEventListener("click", clickJakob);
  // Stop container at clicked position
  document.querySelector("#jakob_container").classList.add("paused");
  //Start zoom/rotate animation
  document.querySelector("#jakob_sprite").classList.add("rotate_zoom");
  //When animation stops, run mink1Gone
  document
    .querySelector("#jakob_container")
    .addEventListener("animationend", jakobGone);
  decreaseLives();
}

function mink1Gone() {
  console.log("mink1Gone");
  //Stop listening
  document
    .querySelector("#mink1_container")
    .removeEventListener("animationend", mink1Gone);
  //Remove rotate_zoom animation
  document.querySelector("#mink1_sprite").classList.remove("rotate_zoom");
  //Remove paused animation
  document.querySelector("#mink1_container").classList.remove("paused");
  //Restart animations
  document.querySelector("#mink1_container").classList.remove("left_to_right");
  document.querySelector("#mink1_container").offsetHeight;
  document.querySelector("#mink1_container").classList.add("left_to_right");
  //Start listening for click again
  document
    .querySelector("#mink1_container")
    .addEventListener("click", clickMink1);
}

function mink2Gone() {
  console.log("mink2Gone");
  //Stop listening to not run mink2Gone
  document
    .querySelector("#mink2_container")
    .removeEventListener("animationend", mink2Gone);
  //Remove rotate_zoom animation
  document.querySelector("#mink2_sprite").classList.remove("rotate_zoom");
  //Remove paused animation
  document.querySelector("#mink2_container").classList.remove("paused");
  //Restart animations
  document.querySelector("#mink2_container").classList.remove("right_to_left");
  document.querySelector("#mink2_container").offsetHeight;
  document.querySelector("#mink2_container").classList.add("right_to_left");
  //Start listening for click again
  document
    .querySelector("#mink2_container")
    .addEventListener("click", clickMink2);
}

function larsGone() {
  console.log("larsGone");
  //Stop listening
  document
    .querySelector("#lars_container")
    .removeEventListener("animationend", larsGone);
  //Remove rotate_zoom animation
  document.querySelector("#lars_sprite").classList.remove("rotate_zoom");
  //Remove paused animation
  document.querySelector("#lars_container").classList.remove("paused");
  //Restart animations
  document.querySelector("#lars_container").classList.remove("left_to_right");
  document.querySelector("#lars_container").offsetHeight;
  document.querySelector("#lars_container").classList.add("left_to_right");
  //Start listening for click again
  document
    .querySelector("#lars_container")
    .addEventListener("click", clickLars);
}

function jakobGone() {
  console.log("jakobGone");
  //Stop listening
  document
    .querySelector("#jakob_container")
    .removeEventListener("animationend", jakobGone);
  //Remove rotate_zoom animation
  document.querySelector("#jakob_sprite").classList.remove("rotate_zoom");
  //Remove paused animation
  document.querySelector("#jakob_container").classList.remove("paused");
  //Restart animations
  document.querySelector("#jakob_container").classList.remove("right_to_left");
  document.querySelector("#jakob_container").offsetHeight;
  document.querySelector("#jakob_container").classList.add("right_to_left");
  //Start listening for click again
  document
    .querySelector("#jakob_container")
    .addEventListener("click", clickJakob);
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

function game_over() {
  console.log("Game Over");
  document.querySelector("#game_over").classList.remove("hidden");
}
