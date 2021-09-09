import { descInputFromTform, titleInputFromTform, dateInputFromTform, checkCompleteFromTform, selectPriorityFromTform, nameInputFromPform, renderTask} from "./dom";
const rcolor = require('rcolor')

// creates variables that will be used in storage
const PROJECT_ID = 'project.id';
const CURRENT_PROJECT = 'current.project.id';
let projectsArray = JSON.parse(localStorage.getItem(PROJECT_ID)) || [];
let currentProjectId = localStorage.getItem(CURRENT_PROJECT)



class Project {
    constructor(title){
        this.title = title;
        this.id = Date.now().toString();
        this.tasksArray = []
    }
}

class Task {
    constructor(title, description, dueDate, priority, complete, color){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority
        this.complete = complete
        this.color = color
    }
}

function projectConstructor(){
    if(nameInputFromPform.value == null || nameInputFromPform.value === '') return
    const newProject = new Project(`${nameInputFromPform.value}`);
    currentProjectId = newProject.id
    projectsArray.push(newProject)
}

function taskConstructor(){
    let randomTaskColor = rcolor()
    const currentProject = projectsArray.find(element=>{
        return element.id === currentProjectId
    })
    const newTask = new Task(`${titleInputFromTform.value}`, `${descInputFromTform.value}`, `${dateInputFromTform.value}`, `${selectPriorityFromTform.value}`, `${checkCompleteFromTform.checked}`, `${randomTaskColor}`);
    currentProject.tasksArray.push(newTask)
}

function deleteCompletedTasks(){
    const findFinished = projectsArray.find(project => project.id ===currentProjectId)
    if (findFinished == undefined) return
    findFinished.tasksArray = findFinished.tasksArray.filter(task => !task.complete)
    rememberProjects()
    renderTask()
}


function rememberProjects(){
localStorage.setItem(PROJECT_ID, JSON.stringify(projectsArray))
localStorage.setItem(CURRENT_PROJECT, currentProjectId)
}

export { Project, projectConstructor, taskConstructor,  projectsArray, rememberProjects , currentProjectId, deleteCompletedTasks }