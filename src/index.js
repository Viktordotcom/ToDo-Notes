import { projectsArray, Project, taskConstructor, currentProjectId, rememberProjects, deleteCompletedTasks } from './app';
import { btnDeleteCompletedTasks, modal, createProject, nameInputFromPform, renderTask, deleteBtnIconTform, submitBtnTform, navbar, navbarHiddenCheckbox, plusIconPform, PformForProjectCreation } from './dom'


window.addEventListener('keyup', (e)=>{
    if(modal.className.toString() == 'open')
    if (e.target.tagName.toLowerCase() !== 'textarea'){    
        if(e.key == 'Enter'){
            taskConstructor();
            createProject()
            renderTask()
            modal.classList.remove('open')
        }
    }
})


btnDeleteCompletedTasks.addEventListener('click', deleteCompletedTasks)


const btnAddTask = document.getElementById('add-task-plus-icon');
    btnAddTask.addEventListener('click', ()=>{
        const modal = document.getElementById('modal')
        modal.classList.toggle('open')
        if(projectsArray.length == 0){
            if(nameInputFromPform.value != '') nameInputFromPform.value = ''
            const defaultProject = new Project(`Default`)
            projectsArray.push(defaultProject)
            currentProjectId = defaultProject.id
            createProject();
        }
    })

    deleteBtnIconTform.addEventListener('click', ()=>{
        modal.classList.remove('open')
    });
    
    submitBtnTform.addEventListener('click', ()=>{
        taskConstructor();
        createProject()
        renderTask()
        modal.classList.remove('open')
    });

    navbar.addEventListener('click', switchToCurrentProject)

    function switchToCurrentProject(e){
        
        if(e.target.tagName.toLowerCase() == 'div'){
            currentProjectId = e.target.dataset.id
            e.target.classList.toggle('current')
            navbarHiddenCheckbox.checked = false
        }
        else if(e.target.tagName.toLowerCase() == 'option'){
            currentProjectId = e.target.parentElement.parentElement.dataset.id
            e.target.parentElement.parentElement.classList.toggle('current')
            navbarHiddenCheckbox.checked = false
        }
        else return
        createProject()
        renderTask()
    
    }
    
    modal.addEventListener('click', (e)=>{
        if(e.target.classList.contains('open')){
            modal.classList.remove('open')
        }
    })
    
    plusIconPform.addEventListener('click', ()=>{
        if(nameInputFromPform.value == null || nameInputFromPform.value === '') return
        createProject();
    })
    PformForProjectCreation.addEventListener('submit', ()=>{
        if(nameInputFromPform.value == null || nameInputFromPform.value === '') return
        createProject();
    });

    document.body.onload= (()=>{
        let addTaskText =  document.getElementById('add-task-text')
        setInterval(()=>{
            addTaskText.classList.add('on')
            setTimeout(()=>{
                addTaskText.classList.remove('on')

            },1000)
        },5000)

    })()

    function listenOnTaskChange(){
    const currentProject = projectsArray.find(element=>{
        return element.id === currentProjectId
    })
   
    const selectTitleIn = document.querySelectorAll('.task-title-in')
        selectTitleIn.forEach(element=>{
        element.addEventListener('change', (e)=>{
            currentProject.tasksArray[element.parentElement.parentElement.dataset.key].title = e.target.value
            rememberProjects();
            
        })
})
    const selectDescIn = document.querySelectorAll('.task-desc-in')
        selectDescIn.forEach(element=>{
        element.addEventListener('change', (e)=>{
            currentProject.tasksArray[element.parentElement.parentElement.dataset.key].description = e.target.value
            rememberProjects();
            
        })
})
    const selectDateIn = document.querySelectorAll('.task-date-in')
        selectDateIn.forEach(element=>{
        element.addEventListener('change', (e)=>{
            currentProject.tasksArray[element.parentElement.parentElement.dataset.key].dueDate = e.target.value
            rememberProjects();
            
        })
})
    const selectPrioIn = document.querySelectorAll('.task-prio-in')
        selectPrioIn.forEach(element=>{
        element.addEventListener('change', (e)=>{
            currentProject.tasksArray[element.parentElement.parentElement.dataset.key].priority = e.target.value
            if(element.value == 'high') element.style.color = 'red'
            else if(element.value == 'medium') element.style.color = 'orangered'
            else element.style.color = 'green'
            rememberProjects();
            
        })
})
    const selectCompleteIn = document.querySelectorAll('.task-complete-in')
    selectCompleteIn.forEach(element=>{
        element.addEventListener('change', (e)=>{
            currentProject.tasksArray[element.parentElement.parentElement.dataset.key].complete = e.target.checked
            if(element.checked == true) {
                element.parentElement.parentElement.classList.add('complete')
            }
            else {
                element.parentElement.parentElement.classList.remove('complete')
            }
            rememberProjects()
    })
})
}

createProject();
renderTask();

export { listenOnTaskChange }