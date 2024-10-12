document.addEventListener("DOMContentLoaded", function () {
    var numClassesInput = document.getElementById("numClasses3");
    var createInputsBtn = document.getElementById("createInputs3");
    var getGPABtn = document.getElementById("getGPA3");
    var resetBtn = document.getElementById("reset3");
  
    var resultLabel = document.getElementById("result3");
    var numClasses = 0;
    var gradeInputs = [];
  
    getGPABtn.disabled = true;
  
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
  
      for (var i = 0; i < numClasses2; i++) {
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
  
  
        var grade2;
     
    
        var firstDigit = getFirstDigit(grade);
        
        var firstActualDigit = 0;
        if (firstDigit === 1 && grade.toString().length === 3) {
          firstActualDigit = 4;
        } else if (firstDigit === 9) {
          firstActualDigit = 4;
        } else if (firstDigit === 8) {
          firstActualDigit = 3;
        } else if (firstDigit === 7) {
          firstActualDigit = 2;
        } else {
          firstActualDigit = 0;
        }
        grade2 = firstActualDigit;
      

      totalGradePoints += grade2;
    }
  
      if (hasBlankInputs) {
        alert("Please fill in all grade inputs");
        return;
      }
  
      totalGradePoints = totalGradePoints / numClasses;
      var gpa = totalGradePoints;
      resultLabel.textContent = " Your GPA is: " + gpa.toFixed(4);
      
      getGPABtn.disabled = true;
      
      for (var i = 0; i < gradeInputs.length; i++) {
        gradeInputs[i].disabled = true;
       
      }
    });
  
    resetBtn.addEventListener("click", function () {
      numClassesInput.value = "";
      removeAllClassInputs();
      resultLabel.textContent = "";
      numClasses = 0;
      gradeInputs = [];
      createInputsBtn.disabled = false;
    });
    function getFirstDigit(grade) {
      // Convert the absolute value of the grade to a string
      const gradeString = Math.abs(grade).toString();
  
      // Extract the first character (first digit) from the grade string
      const firstDigit = parseInt(gradeString.charAt(0));
  
      // Return the first digit
      return firstDigit;
    }
  
    function createClassInputs(numClasses) {
  
      removeAllClassInputs();
  
  
      for (var i = 0; i < numClasses; i++) {
        var classInput = document.createElement("div");
        classInput.className = "class-input";
  
      
  
        /*var creditLabel = document.createElement("label");
        creditLabel.textContent = "Credit Hours:";
        var creditInput = document.createElement("input");
        creditInput.type = "number";
        creditInput.className = "credit-input";*/
  
        var gradeLabel = document.createElement("label");
        gradeLabel.textContent = "Class " +  (i+1) + " Grade (0-100):"; 
        var gradeInput = document.createElement("input");
        gradeInput.type = "number";
        //gradeInput.step = "0.01";
        gradeInput.className = "grade-input";
  
  
        
  
        // Append the dropdown list to a container element
       
        //classInput.appendChild(classTypeSelect);
  
        //classInput.appendChild(classTypeLabel);
        //classInput.appendChild(classTypeSelect);
        //classInput.appendChild(classTypeInput);
        //classInput.appendChild(creditLabel);
        //classInput.appendChild(creditInput);
        classInput.appendChild(gradeLabel);
        classInput.appendChild(gradeInput);
         
        gradeInputs.push(gradeInput);

        document.getElementById("classInputs3").appendChild(classInput);
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