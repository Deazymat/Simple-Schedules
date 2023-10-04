$(function () {

    var currentDayElem = document.getElementById("currentDay");
    var currentDate = new Date();
    currentDayElem.textContent = currentDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    var timeBlocks = document.querySelectorAll(".time-block");
    var currentHour = currentDate.getHours();

    timeBlocks.forEach(function (block) {
      // this is ti extract the hour from the id
      var blockHour = parseInt(block.getAttribute("id").split("-")[1], 10);

      if (blockHour < currentHour) {
        block.classList.add("past");
      } else if (blockHour === currentHour) {
        block.classList.add("present");
      } else {
        block.classList.add("future");
      }

      // load data from storage
      var savedText = localStorage.getItem(block.getAttribute("id"));
      if (savedText) {
        block.querySelector("textarea").value = savedText;
      }
    });

    // adding event listeners to the save buttons

    var saveButtons = document.querySelectorAll(".saveBtn");

    saveButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var blockHour = button.parentElement.getAttribute("id");
        var userInput = button.parentElement.querySelector("textarea").value;
        localStorage.setItem(blockHour, userInput);
      });
    });
  });
