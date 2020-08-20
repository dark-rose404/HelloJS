class Manager {
    constructor(task){
        this.task = task;
    }
}

class ManagerUI {

    AddUI(task, ul){
        let li = document.createElement('li');
        li.className = "list";
        li.innerHTML = `${task} <a href="#" class="del-link"><i class="right del">x</i></a>`
        ul.appendChild(li);
    }

    delItem(event){
        if(event.parentElement.classList.contains('del-link')){
            event.parentElement.parentElement.remove();
        }
    }

    AlertUI(msg, cls){
        const body = document.querySelector('.task-manager_header'),
              header = document.querySelector('.task-manager_header h2');

        let pg = document.createElement('p');
        pg.className = `alert ${cls}`;
        pg.innerHTML = `${msg}`;
        body.insertBefore(pg, header);

        setTimeout(function(){
            pg.remove();
        }, 1100);
    }

    clearAll(){
        document.querySelector('.task-manager_content').innerHTML = '';
    }

    ClearFields(){
        document.querySelector('.task-manager_input').value = "";
    }
}


document.querySelector('form').addEventListener('submit', function(e){
    let ul = document.querySelector('.task-manager_content');
    let taskInput = document.querySelector('.task-manager_input').value;
    let TaskUI = new ManagerUI;
    let Task = new Manager(taskInput);

    if(taskInput !== ''){
        TaskUI.AddUI(Task.task, ul);
        TaskUI.ClearFields();
        TaskUI.AlertUI('Added successfully', 'success')
    }else {
        TaskUI.AlertUI('Please fill in the fields', 'danger');
    }
    console.log(Task);
    
    
    
    e.preventDefault();
});


document.querySelector('.task-manager_content').addEventListener('click', function(e){

    let UI = new ManagerUI;
    UI.delItem(e.target);
    e.preventDefault();
});


document.querySelector('.btn-clear').addEventListener('click', function(){
    let UI = new ManagerUI;

    UI.clearAll();
    

});
