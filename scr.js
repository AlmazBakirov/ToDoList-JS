import {bindTaskEvent} from "./utils.js"

// console.log("test");
// printHelloWorld();


const taskInput = document.getElementById(`new-task`);
const addButton = document.getElementById(`add-task`);
const listOfInCompletedTasks = document.getElementById(`incompleted-tasks`);
const listOfCompletedTasks = document.getElementById(`completed-tasks`);

const createNewTaskElement = function(taskString) {
    const listItem = document.createElement(`li`);
    const checkBox = document.createElement(`input`);
    // checkBox.addEventListener(`click`, taskCompleted);
    const editInput = document.createElement(`input`);
    const label = document.createElement(`label`);
    const editButton = document.createElement(`button`);
    const deleteButton = document.createElement(`button`);
    // deleteButton.addEventListener("click", deleteTask);

    label.innerText = taskString;
    
    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit";
    editButton.className = "edit";

    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    
    return listItem;
};

const addNewTask = function() {
    const listItem = createNewTaskElement(taskInput.value);

    listOfInCompletedTasks.appendChild(listItem);
    bindTaskEvent(listItem, taskCompleted, editTask, deleteTask);
    taskInput.value = "";
};

addButton.addEventListener("click", addNewTask);
// console.log(createNewTaskElement('test task'))

const deleteTask = function (){
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem,);
};

const taskCompleted = function() {
    const listItem = this.parentNode;
    listOfCompletedTasks.appendChild(listItem);
    // this.addEventListener(`click`, taskInCompleted);
    bindTaskEvent(listItem, taskInCompleted, editTask, deleteTask);
};


const taskInCompleted = function() {
    const listItem = this.parentNode;
    listOfInCompletedTasks.appendChild(listItem);
    // this.addEventListener(`click`, taskCompleted);
    bindTaskEvent(listItem, taskCompleted, editTask, deleteTask);
};


const editTask = function () {
    const listItem = this.parentNode;

    const editInput = listItem.querySelector(`input[type=text]`);
    const label = listItem.querySelector(`label`);

    const containsClass = listItem.classList.contains(`editMode`);
    
    //!true = false
    //!false = true
    //!!false = true
    //!!true = false
    
    
    if (containsClass) {
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }
    listItem.classList.toggle(`editMode`);
};

// const bindTaskEvent = function(taskItem, checkBoxHandler){
//     const checkBox = taskItem.querySelector(`input[type=checkbox]`)
//     const editButton = taskItem.querySelector(`button.edit`)
//     const deleteButton = taskItem.querySelector(`button.delete`)

//     editButton.onclick = editTask;
//     deleteButton.onclick = deleteTask; // deleteButton.addEventlistener is the same
//     checkBox.onchange = checkBoxHandler;
// };

for (let i = 0; i < listOfInCompletedTasks.children.length; i++) {
    bindTaskEvent(listOfInCompletedTasks.children[i], taskCompleted,
    editTask,
    deleteTask
    );
}
for (let i = 0; i < listOfCompletedTasks.children.length; i++) {
    bindTaskEvent(listOfCompletedTasks.children[i], 
    taskInCompleted,
    editTask,
    deleteTask
    );
}