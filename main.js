// Variable to keep track of the number of courses
var numberOfCourses = 0;
// Function called when web page id loaded
function webLoaded() {

    console.log("step 1");
    console.log("localstorage length : " + localStorage.length);
    numberOfCourses = localStorage.length

    // Loop through stored courses in local storage
    for (let i = 0; i < localStorage.length; i++) {


        console.log("I am in the loop");
        // Retrive course information from local storage
        var course = localStorage.getItem(i + 1);
        console.log("course : " + course);
        console.log("JSON.parse(course) : " + JSON.stringify(JSON.parse(course)));
        var parsedjson = JSON.parse(course);

        // Create a new div element
        const newDiv = document.createElement("div");
        // Create new option elements
        const newOptionA = document.createElement("option");
        const newOptionB = document.createElement("option");
        const newOptionC = document.createElement("option");
        const newOptionD = document.createElement("option");
        const newOptionF = document.createElement("option");
        // Assign values and innerHTML's for grade options
        newOptionA.value = "A";
        newOptionA.innerHTML = "A";
        newOptionB.value = "B";
        newOptionB.innerHTML = "B";
        newOptionC.value = "C";
        newOptionC.innerHTML = "C";
        newOptionD.value = "D";
        newOptionD.innerHTML = "D";
        newOptionF.value = "F";
        newOptionF.innerHTML = "F";
        // Create new options for course types
        const newOptionNormal = document.createElement("option");
        const newOptionAccelerated = document.createElement("option");
        const newOptionHonorsAP = document.createElement("option");
        //assign values and innerHTML's for type options
        newOptionNormal.value = "Normal";
        newOptionNormal.innerHTML = "Normal";
        newOptionAccelerated.value = "Accelerated";
        newOptionAccelerated.innerHTML = "Accelerated";
        newOptionHonorsAP.value = "Honors/AP";
        newOptionHonorsAP.innerHTML = "Honors/AP";
        // set up structire of the new course div
        newDiv.className = "addedCourses";
        newDiv.innerHTML = `
         <center>
         
         <input id="course${parsedjson.courseNumber}" style="text-align: center; font-size: 24px; border-color: transparent; width: 180px; background-color: transparent;"value="${parsedjson.courseName}" onchange="updateName(${parsedjson.courseNumber})"></input>
         <select id="grade${parsedjson.courseNumber}" onchange='editValue("grade", ${parsedjson.courseNumber}, document.getElementById("grade${parsedjson.courseNumber}").value)'>
         </select>

         <select id="type${parsedjson.courseNumber}" onchange='editValue("type", ${parsedjson.courseNumber}, document.getElementById("type${parsedjson.courseNumber}").value)'>
         </select>
         </center>
         <hr>
         <center>
             <br>
             <label> GPA Value: </label>
             <br>
             <label id="gradeNum${parsedjson.courseNumber}">4.00</label>
             <br>
             <br>
             <button class="deleteButton" onclick="deleteCourse(${parsedjson.courseNumber})" style="font-size:30px;">x</button>
         </center>`;
        // append the new div to the holder element
        document.getElementById('holder').appendChild(newDiv);
        // switch statement to set the selected grade option based on stored data
        switch (parsedjson.courseGrade) {
            case "A":
                newOptionA.selected = true;
                break;
            case "B":
                newOptionB.selected = true;
                break;
            case "C":
                newOptionC.selected = true;
                break;
            case "D":
                newOptionD.selected = true;
                break;
            case "F":
                newOptionF.selected = true;
                break;

        }

        // append grade options to the grade select element
        const gradeElement = document.getElementById("grade" + parsedjson.courseNumber.toString());
        if (gradeElement) {
            gradeElement.appendChild(newOptionA);
            gradeElement.appendChild(newOptionB);
            gradeElement.appendChild(newOptionC);
            gradeElement.appendChild(newOptionD);
            gradeElement.appendChild(newOptionF);
        } else {
            console.error("Element with ID 'grade" + parsedjson.courseNumber.toString() + "' not found.");
        }
        // switch statement to the selected type oftion based on stored data
        switch (parsedjson.courseType) {
            case "Normal":
                newOptionNormal.selected = true;
                break;
            case "Accelerated":
                newOptionAccelerated.selected = true;
                break;
            case "Honors/AP":
                newOptionHonorsAP.selected = true;
                break;
        }
        // append type options to the type select element
        const typeElement = document.getElementById("type" + parsedjson.courseNumber.toString());
        if (typeElement) {
            typeElement.appendChild(newOptionNormal);
            typeElement.appendChild(newOptionAccelerated);
            typeElement.appendChild(newOptionHonorsAP);
        } else {
            console.error("Type with ID 'type" + parsedjson.courseNumber.toString() + "' not found.");
        }


    }
    //update gpa after load courses
    updateGPA()
}

// function to edit the grades or type of course
function editValue(type, number, value)
{
    console.log("edited value");
    console.log("type: "+type);
    console.log("course number: " +number);
    console.log("value: " +value);
    var course = JSON.parse(localStorage.getItem(number));
    console.log(course);
    switch (type) {
        case "grade":
            course.courseGrade = value;
            break;
        case "type":
            course.courseType = value;
            break;
    }
    localStorage.setItem(number, JSON.stringify(course));
    updateGPA();
}


// function to create a new course div
function createDiv() {
    // increase the number of courses
    numberOfCourses += 1;
    var courseNumber = numberOfCourses;
    // Create a new div element
    const newDiv = document.createElement("div");

    // Set some attributes for the div
    newDiv.className = "addedCourses";
    newDiv.innerHTML = `
    <center>

    <input id="course${courseNumber}" style="text-align: center; font-size: 24px; border-color: transparent; width: 180px; background-color: transparent;"value="Course Name" onchange="updateName(${courseNumber})"></input>
    <select id="grade${courseNumber}" onchange='editValue("grade", ${courseNumber}, document.getElementById("grade${courseNumber}").value)'>  
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="F">F</option>
    </select>
    <select id="type${courseNumber}" onchange='editValue("type", ${courseNumber}, document.getElementById("type${courseNumber}").value)'>
        <option value="Normal">Normal</option>
        <option value="Accelerated">Accelerated</option>
        <option value="Honors/AP">Honors/AP</option>
    </select>
    </center>
    <hr>
    <center>
        <br>
        <label> GPA Value: </label>
        <br>
        <label id="gradeNum${courseNumber}">4.00</label>
        <br>
        <br>
        <button class="deleteButton" onclick="deleteCourse(${courseNumber})" style="font-size:30px;">x</button>
    </center>`;

    // Append the new div to the body
    document.getElementById('holder').appendChild(newDiv);
    // create a new course object with default values
    var course = {
        "courseGrade": document.getElementById('grade' + courseNumber.toString()).value,
        "courseType": document.getElementById('type' + courseNumber.toString()).value,
        "courseNumber": courseNumber,
        "courseName": document.getElementById('course' + courseNumber.toString()).value 
    }
    
    console.log("New Course : " + JSON.stringify(course));
    console.log("courseNumber : " + courseNumber);
    // store the new course in local storage
    localStorage.setItem(courseNumber, JSON.stringify(course))
    // update gpa after adding a new course
    updateGPA();
}

//function to update the name of a course
function updateName(number) {
    var courseName = document.getElementById(`course${number}`).value;
    var changedItem = JSON.parse(localStorage.getItem(number));
    changedItem.courseName = courseName;
    localStorage.setItem(number, JSON.stringify(changedItem));
}
// function to delete a course
function deleteCourse(number) {
    
    // Decrease numberOfCourses after deleting a course
    numberOfCourses -= 1;

    // Remove the course div from the DOM 
    const courseDiv = document.getElementById(`course${number}`).parentNode.parentNode;
    courseDiv.parentNode.removeChild(courseDiv);

    // reorder remaining courses in local storage
    if (number != localStorage.length){
        for (let i = number + 1; i <= localStorage.length; i++) {
            var changedItem = JSON.parse(localStorage.getItem(i));
            localStorage.setItem(i - 1, JSON.stringify(changedItem));
        }
    }
    // delete from localStorage
    localStorage.removeItem(localStorage.length);
    
    // Update GPA after reordering and deleting a course
    updateGPA();
}


function updateGPA() {
    const calculatedWeightedGPA = calculateWeightedGPA();
    const calculatedUnweightedGPA = calculateUnweightedGPA();

    // Update the overall GPA display
    document.getElementById('calculated').innerText = calculatedWeightedGPA;
    document.getElementById('calculated-unweighted').innerText = calculatedUnweightedGPA;

    // Update the GPA values for each course
    for (let i = 1; i <= numberOfCourses; i++) {
         
        var item = JSON.parse(localStorage.getItem(i));
        const gradeNumLabel = document.getElementById(`gradeNum${item.courseNumber}`);

        let courseGPA = 0.0;
        // calculate GPA based on course type and grade
        if (item.courseType === 'Honors/AP') {
            courseGPA = (item.courseGrade === 'A' ? 5.0 : (item.courseGrade === 'B' ? 4.0 : (item.courseGrade === 'C' ? 3.0 : (item.courseGrade === 'D' ? 1.0 : 0.0))));
        } else if (item.courseType === 'Accelerated') {
            courseGPA = (item.courseGrade === 'A' ? 4.5 : (item.courseGrade === 'B' ? 3.5 : (item.courseGrade === 'C' ? 2.5 : (item.courseGrade === 'D' ? 1.0 : 0.0))));
        } else {
            courseGPA = (item.courseGrade === 'A' ? 4.0 : (item.courseGrade === 'B' ? 3.0 : (item.courseGrade === 'C' ? 2.0 : (item.courseGrade === 'D' ? 1.0 : 0.0))));
        }
        // display the calculated GPA for the course
        gradeNumLabel.innerText = courseGPA.toFixed(2);
    }
}

// calculation of weighted GOA
function calculateWeightedGPA() {
    let weightedGPA = 0.0;
    // calculate total weighted gpa based on each course
    for (let i = 1; i <= numberOfCourses; i++) {
        console.log(i);
        var item = JSON.parse(localStorage.getItem(i));

        if (item.courseType === 'Honors/AP') {
            weightedGPA += (item.courseGrade=== 'A' ? 5.0 : (item.courseGrade === 'B' ? 4.0 : (item.courseGrade === 'C' ? 3.0 : (item.courseGrade === 'D' ? 1.0 : 0.0))));
        } else if (item.courseType === 'Accelerated') {
            weightedGPA += (item.courseGrade === 'A' ? 4.5 : (item.courseGrade === 'B' ? 3.5 : (item.courseGrade === 'C' ? 2.5 : (item.courseGrade === 'D' ? 1.0 : 0.0))));
        } else {
            weightedGPA += (item.courseGrade === 'A' ? 4.0 : (item.courseGrade === 'B' ? 3.0 : (item.courseGrade === 'C' ? 2.0 : (item.courseGrade === 'D' ? 1.0 : 0.0))));
        }
    }
    // calculate average weighted GPA
    if (numberOfCourses > 0) {
        weightedGPA /= numberOfCourses;
    }

    return weightedGPA.toFixed(2);
}
// function to calculate the unweighted GPA
function calculateUnweightedGPA() {
    
    let unweightedGPA = 0.0;
    // calculate the total unweighted GPA based on each course
    for (let i = 1; i <= numberOfCourses; i++) {
        var item = JSON.parse(localStorage.getItem(i));

        unweightedGPA += (item.courseGrade === 'A' ? 4.0 : (item.courseGrade === 'B' ? 3.0 : (item.courseGrade === 'C' ? 2.0 : (item.courseGrade === 'D' ? 1.0 : 0.0))));
    }
    // calculate average unweighted GPA
    if (numberOfCourses > 0) {
        unweightedGPA /= numberOfCourses;
    }

    return unweightedGPA.toFixed(2);
}

// Initial GPA update
updateGPA();
