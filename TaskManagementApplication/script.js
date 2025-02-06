// Retrieve tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskManagerContainer = document.querySelector(".taskManager");
const confirmEl = document.querySelector(".confirm");
const confirmedBtn = confirmEl.querySelector(".confirmed");
const cancelledBtn = confirmEl.querySelector(".cancel");
let indexToBeDeleted = null
let indexToBeEdited = null
//localStorage.setItem('rad', "All");
let radioSelect = localStorage.getItem('rad');

// Add event listener to the form submit event
document.getElementById('taskForm').addEventListener('submit', handleFormSubmit);

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const taskTitle = document.getElementById('taskTitle');
  const taskDescription = document.getElementById('taskDescription');
  const taskDate = document.getElementById('taskDate');
  const taskTitleText = taskTitle.value.trim();
  const taskDescriptionText = taskDescription.value.trim();
  const taskDateText = taskDate.value.trim();

  if (taskTitleText !== '' && taskDescriptionText !== '' && taskDateText !== '' ) {
    const newTask = {
      text: taskTitleText,
      description: taskDescriptionText,
      date: taskDateText,
      completed: false
    };

    tasks.push(newTask);
    saveTasks();
    taskTitle.value = '';
    taskDescription.value = '';
    taskDate.value = '';
  tableCreate();
  location.reload();
  }
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


tableCreate(radioSelect);


function tableCreate(statusParam) {
  // body.removeChild();
  // let parentElement = document.getElementById("body");
  // let childElement = document.getElementById("table");
	// parentElement.removeChild(childElement);  

  const taskContainer = document.getElementById('taskContainer');
  taskContainer.innerHTML = '';
  var body = document.getElementsByTagName('body')[0];

  var textx = document.createElement("INPUT");
  textx.setAttribute("type", "text");
  textx.description='43433'
  textx.addEventListener("input", (event) => {
    
    //to do

  });


  body.appendChild(textx);

  var radiox = document.createElement("INPUT");
  radiox.setAttribute("type", "radio");
  radiox.setAttribute("value", "All");
  radiox.setAttribute("name", "selec");
  radioSelect =="All"?radiox.checked = true:radiox.checked = false
  radiox.addEventListener('click', () => {
    localStorage.setItem('rad', "All");
    tableCreate("All");
   
    location.reload();
   
  });

  var label = document.createElement('label')
         label.htmlFor = 'num';
         var description = document.createTextNode('All');
         label.appendChild(description);
  body.appendChild(radiox);
  body.appendChild(label);

  var radiox = document.createElement("INPUT");
  radiox.setAttribute("type", "radio");
  radiox.setAttribute("value", "Completed");
  radiox.setAttribute("name", "selec");
  radioSelect =="Completed"?radiox.checked = true:radiox.checked = false
  radiox.addEventListener('click', () => {
    localStorage.setItem('rad', "Completed");
    tableCreate("Completed");
   
    location.reload();
   
  });

  var label = document.createElement('label')
         label.htmlFor = 'num';
         var description = document.createTextNode('Completed');
         label.appendChild(description);
  body.appendChild(radiox);
  body.appendChild(label);

  var radiox = document.createElement("INPUT");
  radiox.setAttribute("type", "radio");
  radiox.setAttribute("value", "Incomplete");
  radiox.setAttribute("name", "selec");
  radioSelect =="Incomplete"?radiox.checked = true:radiox.checked = false
  radiox.addEventListener('click', () => {
    localStorage.setItem('rad', "Incomplete");
    tableCreate("Incomplete");
    
    location.reload();
   
  });

  var label = document.createElement('label')
         label.htmlFor = 'num';
         var description = document.createTextNode('Incomplete');
         label.appendChild(description);
  body.appendChild(radiox);
  body.appendChild(label);

  var tbl = document.createElement('table');
  tbl.style.width = '100%';
  tbl.setAttribute('border', '1');
  var tbdy = document.createElement('tbody');

  var tr = document.createElement('tr');
var cell1 = document.createElement("td");
var cell2 = document.createElement("td");
var cell3 = document.createElement("td");
var cell4 = document.createElement("td");

cell1.innerHTML = "Title";
cell1.style.backgroundColor = '#00FFFF';
cell2.innerHTML = "Description";
cell2.style.backgroundColor = '#00FFFF';
cell3.innerHTML = "Date";
cell3.style.backgroundColor = '#00FFFF';
cell4.innerHTML = "Action";
cell4.style.backgroundColor = '#00FFFF';

// if(tasks.length>0){}
tr.appendChild(cell1);
tr.appendChild(cell2);
tr.appendChild(cell3);
tr.appendChild(cell4);
tbdy.appendChild(tr);
tbl.appendChild(tbdy);
body.appendChild(tbl)
//  }    why this is not working

  tasks.forEach((task, index) => {

    if(statusParam=='Completed' && (task.completed==false)){
               return;
    }
    if(statusParam=='Incomplete' && (task.completed==true)){
      return;
}

    
    
  
    var tr = document.createElement('tr');

      var cell1 = document.createElement("td");
      var cell2 = document.createElement("td");
      var cell3 = document.createElement("td");
      var cell4 = document.createElement("td");

      cell1.innerHTML = task.completed ? task.text.strike():task.text;
cell2.innerHTML = task.description;
cell3.innerHTML = task.date;



var statusButton = document.createElement("BUTTON");
const btnContentEl = document.createElement("span");
btnContentEl.classList.add(task.completed ? "green":"red");
    btnContentEl.innerText = task.completed ? 'Mark as Pending' : 'Mark as Completed';
    statusButton.appendChild(btnContentEl);
    statusButton.addEventListener('click', () => {
             tasks[index].completed = !tasks[index].completed;
             const row = task.parentElement;
             saveTasks();
             location.reload();
             tableCreate();
            
           });

cell4.appendChild(statusButton);


var editButton = document.createElement("BUTTON");
const btnContentE3 = document.createElement("span");
btnContentE3.innerText = "Edit";
editButton.appendChild(btnContentE3);
editButton.addEventListener('click', () => {
  indexToBeEdited = index
  let row = editButton.parentNode.parentNode;
  let titlCell = row.cells[0];
  let desCell = row.cells[1];
  let dateCell = row.cells[2];
  let titlEdit =
                prompt("Enter the updated TITLE:",
                  task.text);


                  task.text = titlEdit;       
                  saveTasks();         
                  tableCreate();
                  location.reload();
               
  let deseit =
                prompt("Enter the updated DESCRIPTION:",
                  task.description);


                  task.description = deseit;       
                  saveTasks();         
                  tableCreate();
                  location.reload();                
 

 let dateit =
                prompt("Enter the updated DATE:",
                  task.date);


                  task.date = dateit;       
                  saveTasks();         
                  tableCreate();
                  location.reload();                
 
 
 
});

cell4.appendChild(editButton);


var deleteButton = document.createElement("BUTTON");
const btnContentE2 = document.createElement("span");
btnContentE2.innerText = "Delete";
deleteButton.appendChild(btnContentE2);
deleteButton.addEventListener('click', () => {
  indexToBeDeleted = index
  confirmEl.style.display = "block";
  taskManagerContainer.classList.add("overlay");
 
});

cell4.appendChild(deleteButton);




tr.appendChild(cell1);
tr.appendChild(cell2);
tr.appendChild(cell3);
tr.appendChild(cell4);
     
       
 
    tbdy.appendChild(tr);

  });
  tbl.appendChild(tbdy);
  body.appendChild(tbl);


 
  
}



// function to delete the selected task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
 tableCreate();
}

confirmedBtn.addEventListener("click", () => {
  confirmEl.style.display = "none";
  taskManagerContainer.classList.remove("overlay");
  deleteTask(indexToBeDeleted)
  location.reload();
});

cancelledBtn.addEventListener("click", () => {
  confirmEl.style.display = "none";
  taskManagerContainer.classList.remove("overlay");
});
