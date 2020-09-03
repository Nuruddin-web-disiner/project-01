let form = document.querySelector('#add_task');
let taskInput = document.querySelector('#new_task');
let filter = document.querySelector('#filter_tesk');
let taslList = document.querySelector('ul');
let clereBtn = document.querySelector('#cleare_btn');

//add evenlitiner
form.addEventListener('submit', addTask);
taslList.addEventListener('click', removeTask);
clereBtn.addEventListener('click', clereTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTask);


//add task

function addTask (e){
    if(taskInput.value === ''){
        alert('add a task')
    }else{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + ' '))
        taslList.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'X';
        li.appendChild(link);

        //store daTA

        storeTextInLocalStore(taskInput.value);


        taskInput.value = '';
        
    }
    e.preventDefault();
} 


//remove task
function removeTask(e){
    if(e.target.hasAttribute('href')){
        if(confirm('are you sure!')){
            let ele = e.target.parentElement;
            ele.remove();
            // console.log(e.target)

            removeFormLs(ele);
        }
        
    }
    
}

//cleare all task
function clereTask (e){
    // taslList.innerHTML = '';
    while(taslList.firstChild){
        taslList.removeChild(taslList.firstChild);
    }
    localStorage.clear();
}

// addfilter task

function filterTask(e){
   let tast = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
       let item = task.firstChild.textContent;

       if(item.toLowerCase().indexOf(tast) != -1){
            task.style.display = 'block';
       }else{
           task.style.display = 'none';
       }
    })
}

//Local store
function storeTextInLocalStore(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks));


}

function getTask(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach( task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + ' '))
        taslList.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'X';
        li.appendChild(link);

    })

}

function removeFormLs(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);
    tasks.forEach((task , index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index, 1)
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    })
}