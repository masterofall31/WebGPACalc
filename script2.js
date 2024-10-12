document.addEventListener("DOMContentLoaded", function () {
    var numClassesInput = document.getElementById("numClasses2");
    var createInputsBtn = document.getElementById("createInputs2");
    var getGPABtn = document.getElementById("getGPA2");
    var resetBtn = document.getElementById("reset2");
    var resultLabel = document.getElementById("result2");
    var numClasses = 0;
    var gradeInputs = [];
    var resetBtns = [];
    var classTypeSelects = [];
    getGPABtn.disabled = true;
  
    resetBtn.addEventListener("click", function () {
     
      removeAllClassInputs();
      numClassesInput.value = "";
      classTypeSelects = [];
      gradeInputs = [];
      numClasses = 0;
      createInputsBtn.disabled = false;
      resultLabel.textContent = "";
    });

    createInputsBtn.addEventListener("click", function () {
      if (parseInt(numClassesInput.value) < 9 && parseInt(numClassesInput.value) > 0) {
        numClasses = parseInt(numClassesInput.value);
      }
      else {
        resultLabel.textContent = "Enter a number of classes between 0 and 8";
        alert("Enter a number of classes between 0 and 8");
      }
      if (!isNaN(numClasses) && numClasses > 0) {
        createClassInputs(numClasses);
      } else {
        removeAllClassInputs();
        resultLabel.textContent = "";
      }
    });
  
    getGPABtn.addEventListener("click", function () {
      var totalGradePoints = 0;
      var hasBlankInputs = false;
  
      for (var i = 0; i < numClasses; i++) {
        var classTypeSelect = classTypeSelects[i];
        var gradeInput = gradeInputs[i];
        var grade = parseInt(gradeInput.value);
  
        if (grade < 0 || grade > 100 || isNaN(grade)) {
          alert("Please enter a number between 0 and 100 (" + grade + ")");
          gradeInputs[i].value = "";
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
        resultLabel.textContent = "Please fill in all grade inputs";
        return;
      }
  
      totalGradePoints = totalGradePoints / numClasses;
      var gpa = totalGradePoints;
      resultLabel.textContent = " Your GPA is: " + gpa.toFixed(4);
      
      getGPABtn.disabled = true;
 
      for (var i = 0; i < gradeInputs.length; i++) {
        gradeInputs[i].disabled = true;
        classTypeSelects[i].disabled = true;
      }
    });
    function getFirstDigit(grade) {
      // Convert the absolute value of the grade to a string
      const gradeString = Math.abs(grade).toString();
  
      // Extract the first character (first digit) from the grade string
      const firstDigit = parseInt(gradeString.charAt(0));
  
      // Return the first digit
      return firstDigit;
    }
    function getLastDigit(grade) {
      // Calculate the remainder when dividing the grade by 10
      const lastDigit = Math.abs(grade) % 10;
  
      // Return the last digit
      return lastDigit;
    }
  
    function createClassInputs(numClasses) {
  
      removeAllClassInputs();
  
  
      for (var i = 0; i < numClasses; i++) {
        var classInput = document.createElement("div");
        classInput.className = "class-input";
  
        var classTypeLabel = document.createElement("label");
        classTypeLabel.textContent = "Class " + (i + 1) + " Type:";
        var classTypeInput = document.createElement("input");
        classTypeInput.className = "dropdown-btn";
  
        /*var creditLabel = document.createElement("label");
        creditLabel.textContent = "Credit Hours:";
        var creditInput = document.createElement("input");
        creditInput.type = "number";
        creditInput.className = "credit-input";*/
  
        var gradeLabel = document.createElement("label");
        gradeLabel.textContent = "Grade (0 - 100):";
        var gradeInput = document.createElement("input");
        gradeInput.type = "number";
        //gradeInput.step = "0.01";
        gradeInput.className = "grade-input";
  
        var classTypeSelect = document.createElement("select");
        classTypeSelect.id = "classTypeSelect";
        classTypeSelect.className="dropdown-btn";
  
        var option1 = document.createElement("option");
        option1.value = "on-level";
        option1.textContent = "On-level";
  
        var option2 = document.createElement("option");
        option2.value = "advanced-ap";
        option2.textContent = "Advanced/AP";
  
        classTypeSelect.appendChild(option1);
        classTypeSelect.appendChild(option2);
  
        // Append the dropdown list to a container element
        var container = document.getElementById("container");
        //classInput.appendChild(classTypeSelect);
  
        classInput.appendChild(classTypeLabel);
        classInput.appendChild(classTypeSelect);
        //classInput.appendChild(classTypeInput);
        //classInput.appendChild(creditLabel);
        //classInput.appendChild(creditInput);
        classInput.appendChild(gradeLabel);
        classInput.appendChild(gradeInput);

        gradeInputs.push(gradeInput);
        classTypeSelects.push(classTypeSelect);
  
        document.getElementById("classInputs2").appendChild(classInput);
        getGPABtn.disabled = false;
        createInputsBtn.disabled = true;
      }
    }
  
    function removeAllClassInputs() {
      var classInputs = document.querySelectorAll(".class-input");
      classInputs.forEach(function (classInput) {
        classInput.remove();
      });
    }
    const buttons = document.getElementsByClassName("btn");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        // Hide all screens
        const screens = document.getElementsByClassName("screen");
        for (let j = 0; j < screens.length; j++) {
          screens[j].style.display = "none";
        }
  
        // Show the corresponding screen based on the button index
        document.getElementById(`screen${i + 1}`).style.display = "block";
  
      });
    }
  });