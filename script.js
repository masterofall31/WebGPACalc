document.addEventListener("DOMContentLoaded", function () {

  var getGPABtn = document.getElementById("getGPA");
  var resetBtn = document.getElementById("reset");
  var cumulativeGPAInput = document.getElementById("cumulativeGPA");
  var semestersCompletedInput = document.getElementById("semestersCompleted");
  var resultLabel = document.getElementById("result");
  var semsInputBtn = document.getElementById("createSems");
  var semsInput = document.getElementById("sems");
  var semInputsContainer = document.getElementById("semInputs");
  var sems = 0;
  var numClasses2 = 0;
  var classInputs = [];
  var classInputs2 = [];
  var semesterInputs = [];
  var semesterInputs2 = [];

  getGPABtn.disabled = true;

    removeAllSemInputs();
    classInputs.splice(0);
    classInputs2.splice(0);



  semsInputBtn.addEventListener("click", function () {
    semsInputBtn.disabled = true;
    if (parseInt(semsInput.value) < 9 && parseInt(semsInput.value) > 0) {
      sems = parseInt(semsInput.value);
    }
    else {
      alert("Enter a number of semesters between 1 and 8");
      semsInput.value = "";
      semsInputBtn.disabled = false;
      sems = 0;
    }
    if (!isNaN(sems) && sems > 0) {
      createSemInputs(sems);
      semsInput.disabled = true;
    } else {
      removeAllSemInputs();
      resultLabel.textContent = "";
    }
  });

  getGPABtn.addEventListener("click", function () {
    var totalGradePoints = 0;
    var hasBlankInputs = false;

    for (var i = 0; i < numClasses2; i++) {
      var classTypeSelect = classInputs2[i];
      var gradeInput = classInputs[i];
      var grade = parseInt(gradeInput.value);

      if (grade < 0 || grade > 100 || isNaN(grade)) {
        if(isNaN(grade)) {
          alert("Please enter a number between 0 and 100");
          return;8
        }
        alert("Please enter a number between 0 and 100 (" + grade + ")");
        classInputs[i].value = "";
        return;
      }

      if (gradeInput.value.trim() == "") {
        hasBlankInputs = true;
      }

      var selectedOption = classTypeSelect.value;

      var grade2;
      if (selectedOption == "on-level") {
        var firstDigit = getFirstDigit(grade);
        var lastDigit = getLastDigit(grade) / 10;
        var firstActualDigit = 0;
        if (firstDigit == 1 && grade.toString().length === 3) {
          firstActualDigit = 5;
        } else if (firstDigit == 9) {
          firstActualDigit = 4;
        } else if (firstDigit == 8) {
          firstActualDigit = 3;
        } else if (firstDigit == 7) {
          firstActualDigit = 2;
        } else {
          firstActualDigit = 0;
        }
        grade2 = firstActualDigit + lastDigit;
      } else {
        var firstDigit = getFirstDigit(grade);
        var lastDigit = getLastDigit(grade) / 10;
        var firstActualDigit = 0;
        if (firstDigit === 1 && grade.toString().length === 3) {
          firstActualDigit = 6;
        } else if (firstDigit === 9) {
          firstActualDigit = 5;
        } else if (firstDigit === 8) {
          firstActualDigit = 4;
        } else if (firstDigit === 7) {
          firstActualDigit = 3;
        } else {
          firstActualDigit = 0;
        }
        grade2 = firstActualDigit + lastDigit;
      }

      totalGradePoints += grade2;
    }

    if (hasBlankInputs) {
      alert("Please fill in all grade inputs");
      return;
    }

    var totalGradePoints2 = totalGradePoints;
    totalGradePoints = totalGradePoints / numClasses2;
    var gpa = totalGradePoints;
    resultLabel.textContent = " Your GPA is: " + gpa.toFixed(4);
    
    getGPABtn.disabled = true;
    for (var i = 0; i < resetBtns.length; i++) {
      resetBtns[i].disabled = true;
    }
    for (var i = 0; i < classInputs.length; i++) {
      classInputs[i].disabled = true;
      classInputs2[i].disabled = true;
    }
  });

  resetBtn.addEventListener("click", function () {
    semsInputBtn.disabled = false;
    removeAllSemInputs();
    classInputs.splice(0);
    classInputs2.splice(0);
    createInputsBtns.splice(0);
    semsInput.disabled = false;
    semsInput.value = ""; 
   
  });


  function getFirstDigit(grade) {
    const gradeString = Math.abs(grade).toString();
    const firstDigit = parseInt(gradeString.charAt(0));
    return firstDigit;
  }

  function getLastDigit(grade) {
    const lastDigit = Math.abs(grade) % 10;
    return lastDigit;
  }

  var createInputsBtns = [];
  var resetBtns = [];
  var labels = [];
  function createSemInputs(sems) {
    removeAllSemInputs();
    classInputs = [];
    classInputs2 = [];
    createInputBtns = [];
    resetBtns = [];
    for (var i = 0; i < sems; i++) {
      var semContainer = document.createElement("div");
      semContainer.className = "semester-container";
      semContainer.setAttribute("data-semester-index", i);

      var numClassesLabel = document.createElement("label");
      numClassesLabel.textContent = "Number of Classes in Semester " + (i + 1) + ":";
      var numClassesInput = document.createElement("input");
      numClassesInput.type = "number";
      numClassesInput.className = "num-classes-input";

      var createInputsBtn = document.createElement("button");
      createInputsBtn.textContent = "Create Classes";
      createInputsBtn.className = "calculator2-btn";

      var classInputsContainer = document.createElement("div");
      classInputsContainer.className = "class-inputs-container";

      var resetBtn = document.createElement("button");
      resetBtn.textContent = "Reset";
      resetBtn.className = "calculator2-btn";

      resetBtn.disabled = true;
      var numClasses = 0;
      createInputsBtn.addEventListener("click", (function (container, input, semesterCounter, createInputsBtn, resetBtn, numClassesInput) {
        return function () {
          resetBtn.disabled = false;
          numClasses = parseInt(input.value);
          if (isNaN(numClasses) || numClasses <= 0 || numClasses > 8) {
            alert("Enter a valid number of classes between 1-8");
            numClasses = 0;
            resetBtn.disabled = true;
            return;
          } else {
            createClassInputs(numClasses, container, semesterCounter);
            numClasses2 += numClasses;
            getGPABtn.disabled = false;
            createInputsBtns[semesterCounter].disabled = true;
            numClassesInput.disabled = true;
          }
        };
      })(classInputsContainer, numClassesInput, i, createInputsBtn, resetBtn, numClassesInput));

      resetBtn.addEventListener(
        "click",
        (function (
          container,
          input,
          createInputsBtn,
          resetBtn,
          numClassesInput
        ) {
          return function () {
            numClasses = parseInt(input.value);
            if (!isNaN(numClasses)) {
              var gradeInputsContainer = container.querySelector(
                ".grade-inputs-container"
              );

              while (gradeInputsContainer.firstChild) {
                gradeInputsContainer.firstChild.remove();
              }

              getGPABtn.disabled = true;
              numClasses2 -= numClasses;

              var semesterIndex = container.parentNode.parentNode.getAttribute("data-semester-index");
              var insertIndex = semesterIndex * numClasses;
              classInputs.splice(insertIndex,numClasses);
              classInputs2.splice(insertIndex, numClasses);

              createInputsBtn.disabled = false;
              resetBtn.disabled = true;
              numClassesInput.disabled = false;
              numClassesInput.value = "";
              var classTypeInputs = container.querySelectorAll(".class-type-input");
              for (var i = 0; i < classTypeInputs.length + 1; i++) {
                if (classTypeInputs[i].selectedIndex != 0) {
                  classTypeInputs[i].selectedIndex = 0;
                } // Reset to the first option
              }
            } else {
              alert("Enter a number of classes to reset");
            }
          };
        })(
          classInputsContainer,
          numClassesInput,
          createInputsBtn,
          resetBtn,
          numClassesInput
        )
      );

      semContainer.appendChild(numClassesLabel);
      semContainer.appendChild(numClassesInput);
      semContainer.appendChild(createInputsBtn);
      semContainer.appendChild(resetBtn);
      semContainer.appendChild(classInputsContainer);

      createInputsBtns.push(createInputsBtn);
      resetBtns.push(resetBtn);

      semInputsContainer.appendChild(semContainer);
    }
  }

  // Function to create inputs for classes
  function createClassInputs(numClasses, container, semesterIndex) {
    removeAllClassInputs(container);

    var classInputsCurrentSemester = [];
    var classInputsCurrentSemester2 = [];
    var gradeInputsContainer = document.createElement("div");
    gradeInputsContainer.className = "grade-inputs-container";

    for (var i = 0; i < numClasses; i++) {
      var classInput = document.createElement("div");
      classInput.className = "class-input";

      var classTypeLabel = document.createElement("label");
      classTypeLabel.textContent = "Class " + (i + 1) + " Type:";

      var classTypeSelect = document.createElement("select");
      classTypeSelect.className = "dropdown-btn";

      var option1 = document.createElement("option");
      option1.value = "on-level";
      option1.textContent = "On-level";

      var option2 = document.createElement("option");
      option2.value = "advanced-ap";
      option2.textContent = "Advanced/AP";

      classTypeSelect.appendChild(option1);
      classTypeSelect.appendChild(option2);

      var gradeLabel = document.createElement("label");
      gradeLabel.textContent = "Grade (0 - 100):";
      var gradeInput = document.createElement("input");
      gradeInput.type = "number";
      gradeInput.className = "grade-input";

      classInput.appendChild(classTypeLabel);
      classInput.appendChild(classTypeSelect);
      classInput.appendChild(gradeLabel);
      classInput.appendChild(gradeInput);

      gradeInputsContainer.appendChild(classInput);

      // Use closure to capture the correct reference to gradeInput
      classInputsCurrentSemester.push(gradeInput);
      classInputsCurrentSemester2.push(classTypeSelect);
    }

    container.appendChild(gradeInputsContainer);

    var insertIndex = semesterIndex * numClasses;
    Array.prototype.splice.apply(classInputs2, [insertIndex, 0].concat(classInputsCurrentSemester2));

    classInputs = classInputs.concat(classInputsCurrentSemester);
  }

  // Function to remove all class inputs
  function removeAllClassInputs(container) {
    while (container.firstChild) {
      container.firstChild.remove();
    }
  }

  // Function to remove all semester inputs
  function removeAllSemInputs() {
    resultLabel.textContent = "";
    
    numClasses2 = 0;
    getGPABtn.disabled = true;
    while (semInputsContainer.firstChild) {
      semInputsContainer.firstChild.remove();
    }
  }

  const buttons = document.getElementsByClassName("btn");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    const screens = document.getElementsByClassName("screen");
    
    // Reset all screens
    for (let j = 0; j < screens.length; j++) {
      screens[j].style.display = "none";
   
    }
    
    // Display the clicked screen
    document.getElementById(`screen${i + 1}`).style.display = "block";
  });
}

});




