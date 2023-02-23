window.addEventListener("load", start);

function start() {
  console.log("working");
  document.querySelector("#mink1_container").classList.add("left_to_right");
  document.addEventListener("click", clickMink);
}

function clickMink() {
  console.log("pause");
  document.querySelector("#mink1_container").classList.add("paused");
  document
    .querySelector("#mink1_container")
    .addEventListener("animationend", pausedDone);
}
function pausedDone() {
  console.log("done");
  document
    .querySelector("#mink1_container")
    .classList.remove("paused")
    .classList.add("left_to_right");
}
