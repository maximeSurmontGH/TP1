var notifications = [];

var key = prompt("Enter your user key or click on 'Cancel' to create a new user", "7e996803-54b8-4f78-a377-5775a9371143");

if(key == null || key == "") {
    fetch('https://glo3102lab4.herokuapp.com/users', {
        method: 'POST',
    }).then(res => res.json())
        .catch(error => {
            console.error('Error:', error)
        })
        .then(response => {
            key = response.id;
            alert("Your new user  key: " + response.id);
            getElement();
        });
}else{
    getElement();
}

function getElement(){
    notifications = [];
    printNotifications();

    fetch('https://glo3102lab4.herokuapp.com/'+key+'/tasks', {
        method: 'GET',
    }).then(res => res.json())
        .catch(error => {
            console.error('Error:', error);
            alert("Your user key is certainly not valid");
        })
        .then(data => {
            for (let task of data.tasks){
                notifications.push(createNotification(task));
                printNotifications();
            }
        });
}

export function addElement(){
    if( document.getElementById('task').value == ''){
        alert("Your task need a content to be pushed.");
    }else{
        let task = {};
        task.name = document.getElementById('task').value;
        document.getElementById('task').value = '';

        fetch('https://glo3102lab4.herokuapp.com/'+key+'/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => {
                console.error('Error:', error);
            })
            .then(response => {
                notifications.push(createNotification(response));
                printNotifications();
            });
    }
}

function removeElement(task){
    fetch('https://glo3102lab4.herokuapp.com/'+key+'/tasks/'+task.id, {
        method: 'DELETE',
    })
        .catch(error => {
            console.error('Error:', error);
        })
        .then(() => {
            getElement();
        });
}

function changeElement(task){
    var name = window.prompt("Update the task", task.name);

    if(name != null && name != "") {
        task.name = name;
    }


    if(task.name != ''){
        fetch('https://glo3102lab4.herokuapp.com/'+key+'/tasks/'+task.id, {
            method: 'PUT',
            body: JSON.stringify(task),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => {
                console.error('Error:', error)
            })
            .then(() => {
                getElement();
            });
    }else{
        alert("Change not worked. You can't push a void task.");
    }
}

function createNotification(task){
    let notification = document.createElement('div');

    let icon = document.createElement('span');
    icon.innerHTML = '&times;';
    icon.className = 'deleteIcon';

    let icon2 = document.createElement('span');
    icon2.innerHTML = '&#9998';
    icon2.className = 'putIcon';

    let message = document.createElement('span');
    message.innerHTML = task.name;

    notification.appendChild(icon);
    notification.appendChild(icon2);
    notification.appendChild(message);

    notification.childNodes[0].onclick = () => {
        removeElement(task);
    };

    notification.childNodes[1].onclick = () => {
        changeElement(task);
    };

    return notification;
}

function printNotifications(){
    let aside = document.getElementById('notification');

    while(aside.hasChildNodes()){
        aside.removeChild(aside.firstChild);
    }

    for(let notif of notifications){
        aside.appendChild(notif);
    }
}
