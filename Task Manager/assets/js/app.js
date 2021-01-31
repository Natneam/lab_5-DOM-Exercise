// UI variables
const taskInput = document.querySelector('#task');               //the task input text field

const form = document.querySelector('#task-form');             //The form at the top

const filter = document.querySelector('#filter');                      //the task filter text field

const taskList = document.querySelector('.collection');          //The ul

const clearBtn = document.querySelector('.clear-tasks');      //the all task clear button

//the reload button at the top right of navigation
const reloadIcon = document.querySelector('.fa'); 

// sort by property for the search
let sortBy = document.querySelector('#sortby');
let sortedElement = Array();


// Add Event Listener 

// form submit 
form.addEventListener('submit', addNewTask);

// Clear All Tasks
clearBtn.addEventListener('click', clearAllTasks);

//   Filter Task 
filter.addEventListener('keyup', filterTasks);

// Remove task event [event delegation]
taskList.addEventListener('click', removeTask);

//reloading the page
reloadIcon.addEventListener('click', () => {location.reload()});

sortBy.addEventListener('change', ()=>reOrder(sortedElement, taskList, sortBy.value=='ascending'?true:false));

 // Add New  Task Function definition 
 function addNewTask(e) {
    e.preventDefault(); //disable form submission
    if (taskInput.value == ""){
        taskInput.style.borderColor = "red";
        return
    } 

     // Create an li element when the user adds a task 
    const li = document.createElement('li');
    // Adding a class
    li.className = 'collection-item';
    // Create text node and append it 
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new element for the link 
    const link = document.createElement('a');
    // Add class and the x marker for a 
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append to ul
    sortedElement.push([Date.now(), li])
    if (sortBy.value === 'ascending'){
        reOrder(sortedElement, taskList, true)
    }else{
        reOrder(sortedElement, taskList, false)
    }
    taskInput.value = '';
}

// Clear Task Function definition 
function clearAllTasks() {
    // taskList.innerHTML = '';
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

}
// Filter tasks function definition 
function filterTasks(e) {
    let filteringString = e.target.value;
    let searchableList = taskList.children;
    for (let index = 0; index < searchableList.length; index++) {
        if ((searchableList[index].innerText.indexOf(filteringString)) == -1){
            searchableList[index].style.display = 'none';
        }else{
            searchableList[index].style.display = 'block';
        }
    }
}

// Remove Task function definition 
function removeTask(e) {

    if (e.target.parentElement.classList.contains('delete-item'))
        {
        if (confirm('Are You Sure about that ?'))
        {
            e.target.parentElement.parentElement.remove();
        }

    }

}


function reOrder(arr, renderOn, ascending=true) {
    if (ascending === true){
        arr.sort((a,b)=> a[0]-b[0])
    }else{
        arr.sort((a,b)=> b[0]-a[0])
    }
    renderOn.innerHTML = ''
    for (val of sortedElement){
        console.log(val)
        renderOn.appendChild(val[1]);
    }
}