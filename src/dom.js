import { projectConstructor, projectsArray, rememberProjects, currentProjectId } from './app.js'
import { listenOnTaskChange } from './index.js'

const navbar = document.getElementById('navbar')
const currentProjectTasksContainer = document.getElementById('current-project-tasks-container')

// DOM elements for Task Creation Form
const titleInputFromTform = document.getElementById('Tform-title-in')
const descInputFromTform = document.getElementById('Tform-description-in')
const dateInputFromTform = document.getElementById('Tform-date-in')
const selectPriorityFromTform = document.getElementById('Tform-priority-select')
const checkCompleteFromTform = document.getElementById('Tform-complete-in')
const modal = document.getElementById('modal')
const deleteBtnIconTform = document.getElementById('Tform-delete-icon');
const submitBtnTform = document.getElementById('Tform-btn-submit-form');


const navbarHiddenCheckbox = document.getElementById('navbar-hidden-checkbox')
const nameInputFromPform = document.getElementById('Pform-for-project-creation-in')
const PformForProjectCreation =  document.getElementById('Pform-for-project-creation');
const plusIconPform = document.getElementById('Pform-plus-icon')
const btnDeleteCompletedTasks = document.getElementById('btn-delete-complete-tasks')



function createProject(){
    projectConstructor();
    renderProject();
    nameInputFromPform.value = '';
    rememberProjects()
}

// render the Project together with its tasks
function renderProject(){
    currentProjectTasksContainer.innerHTML = ''
    navbar.innerHTML = ''
    projectsArray.forEach(element =>{

        // Position of Current Project inside the Array
        let i = projectsArray.indexOf(element);

        const navbarProjectContainer = document.createElement('div')
        const selectFromNavbarProject = document.createElement('select');

        projectsArray[i].tasksArray.forEach(task =>{
            const optionFromNavbarProject = document.createElement('option')
            optionFromNavbarProject.textContent = `${task.title}` + ' ' + `${task.dueDate}`
            selectFromNavbarProject.appendChild(optionFromNavbarProject)

        })
        navbarProjectContainer.dataset.id = projectsArray[i].id
        navbarProjectContainer.textContent = `${projectsArray[i].title}`
        navbarProjectContainer.setAttribute('class', 'navbar-projects')
        if(projectsArray[i].id === currentProjectId) navbarProjectContainer.classList.add('current')
        const iconDeleteNavbarProjectContainer = document.createElement('span')
        iconDeleteNavbarProjectContainer.textContent = 'delete'
        iconDeleteNavbarProjectContainer.setAttribute('class', 'material-icons')
        


        navbarProjectContainer.appendChild(iconDeleteNavbarProjectContainer);   
        navbarProjectContainer.appendChild(selectFromNavbarProject);
        navbar.appendChild(navbarProjectContainer)
        
        iconDeleteNavbarProjectContainer.addEventListener('click', (e)=>{
            
            // remove the object from array, delete the DOM element and 
            // assign the currentProjectId to 
            // either the previous or next sibling depending where event was triggered from
            if(e.target.parentElement.dataset.id == currentProjectId){
                if(e.target.parentElement.nextSibling != null){
                    e.target.parentElement.nextSibling.classList.add('current') 
                    currentProjectId = e.target.parentElement.nextSibling.dataset.id
                    rememberProjects()
                }
                else{
                    // if there is only one project 
                    if(projectsArray.length == 1){
                        navbar.removeChild(e.target.parentElement)
                        projectsArray.splice(projectsArray.indexOf(element), 1)
                        renderTask()
                        rememberProjects()
                        return
                    }
                    e.target.parentElement.previousSibling.classList.add('current')
                currentProjectId = e.target.parentElement.previousSibling.dataset.id
                }
            }
            // if the event.target is not the currentProjectId
            projectsArray.splice(projectsArray.indexOf(element), 1)
            navbar.removeChild(e.target.parentElement)
            renderTask()
            rememberProjects()
        });
    })
}


function renderTask(){

    currentProjectTasksContainer.innerHTML = ''
    const currentProject = projectsArray.find(element=>{
        return element.id === currentProjectId
    })
    if(currentProject == null) return
    currentProject.tasksArray.forEach(element=>{
    
    // Current Task Position in Array
    let i = currentProject.tasksArray.indexOf(element)
    
    
    
    
    const task = document.createElement('div');
    const btnDeleteTask = document.createElement('span');
    const taskTitlePara = document.createElement('p');
    const taskTitleInput = document.createElement('input');
    const taskDescPara = document.createElement('p');
    const taskDescInput = document.createElement('textarea');
    const taskDatePara = document.createElement('p');
    const taskDateInput = document.createElement('input');
    const taskPrioPara = document.createElement('p');
    const taskPrioSelection = document.createElement('select');
    const taskPrioOption1 = document.createElement('option')
    const taskPrioOption2 = document.createElement('option')
    const taskPrioOption3 = document.createElement('option')
    const taskCompletePara = document.createElement('p');
    const taskCompleteCheck = document.createElement('input');
    

    task.setAttribute('data-key', `${i}`)
    taskTitleInput.setAttribute('class', 'task-title-in')
    taskDescInput.setAttribute('class', 'task-desc-in')
    taskDateInput.setAttribute('class', 'task-date-in')
    taskPrioSelection.setAttribute('class', 'task-prio-in')
    taskCompleteCheck.setAttribute('class', 'task-complete-in')
    task.style.backgroundColor = currentProject.tasksArray[i].color
    task.setAttribute('class', 'task-containers');
    btnDeleteTask.setAttribute('id', 'delete-task-btn')
    btnDeleteTask.setAttribute('class', 'material-icons')
    btnDeleteTask.textContent = 'delete';
    btnDeleteTask.addEventListener('click', (e)=>{
        currentProject.tasksArray.splice(currentProject.tasksArray.indexOf(element),1)
        currentProjectTasksContainer.removeChild(e.target.parentElement)
        rememberProjects()
        location.reload()
    });
    taskTitlePara.textContent = 'Title '
    taskTitleInput.value = `${currentProject.tasksArray[i].title}`
    taskDescPara.textContent = 'Description '
    taskDescInput.value = `${currentProject.tasksArray[i].description}`
    taskDatePara.textContent = 'DueDate '
    taskDateInput.setAttribute('type', 'date')
    taskDateInput.value = `${currentProject.tasksArray[i].dueDate}`
    taskPrioPara.textContent = 'Priority'
    taskPrioOption1.setAttribute('value', 'high')
    taskPrioOption2.setAttribute('value', 'medium')
    taskPrioOption3.setAttribute('value', 'low')
    taskPrioOption1.textContent = 'High'
    taskPrioOption2.textContent = 'Medium'
    taskPrioOption3.textContent = 'Low'
    taskCompletePara.textContent = 'Complete?'
    taskCompleteCheck.setAttribute('type', 'checkbox')
    
    // returns boolean instead of string
        if(currentProject.tasksArray[i].complete == "true"){
        currentProject.tasksArray[i].complete = true
        
        }
        else if (currentProject.tasksArray[i].complete == "false"){
        currentProject.tasksArray[i].complete  = false
        }

        
    
    
    taskCompleteCheck.checked = currentProject.tasksArray[i].complete
    
    
    task.appendChild(btnDeleteTask)
    task.appendChild(taskTitlePara)
    taskTitlePara.appendChild(taskTitleInput)
    task.appendChild(taskDescPara)
    taskDescPara.appendChild(taskDescInput)
    task.appendChild(taskDatePara)
    taskDatePara.appendChild(taskDateInput)
    taskPrioSelection.appendChild(taskPrioOption1)
    taskPrioSelection.appendChild(taskPrioOption2)
    taskPrioSelection.appendChild(taskPrioOption3)
    taskPrioSelection.value = `${currentProject.tasksArray[i].priority}`
    taskPrioPara.appendChild(taskPrioSelection)
    task.appendChild(taskPrioPara)
    task.appendChild(taskCompletePara)
    taskCompletePara.appendChild(taskCompleteCheck)
    currentProjectTasksContainer.appendChild(task)

    
    if(taskPrioSelection.value == 'high') taskPrioSelection.style.color = 'red'
    else if(taskPrioSelection.value == 'medium') taskPrioSelection.style.color = 'orangered'
    else taskPrioSelection.style.color = 'green'
    if(currentProject.tasksArray[i].complete == true) {
        task.classList.add('complete')
    }
    else {
        task.classList.remove('complete')
    }
    listenOnTaskChange()
})
rememberProjects()
}




export {btnDeleteCompletedTasks, modal, navbarHiddenCheckbox, plusIconPform, PformForProjectCreation, deleteBtnIconTform, submitBtnTform,  nameInputFromPform, titleInputFromTform, descInputFromTform, dateInputFromTform, navbar,  checkCompleteFromTform, selectPriorityFromTform, renderTask, createProject, currentProjectTasksContainer, listenOnTaskChange}