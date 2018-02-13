var notifications = [];

export function getElement(){
    notifications = [];

    fetch('https://glo3102lab4.herokuapp.com/fee958c0-c320-40d0-a750-218f2d7c1303/tasks').then(function(response){
        response.json().then(function(data) {
            for (let task of data.tasks){
                notifications.push(createNotification(task));
                printNotifications();
            }
        });
    }).catch(function(error) {
        console.log('Fetch Error:', error);
    });
}getElement();

export function addElement(){
    if( document.getElementById('task').value == ''){
        alert("Your task need a content to be pushed.");
    }else{
        let task = {};
        task.name = document.getElementById('task').value;
        document.getElementById('task').value = '';

        fetch('https://glo3102lab4.herokuapp.com/fee958c0-c320-40d0-a750-218f2d7c1303/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => {
                console.error('Error:', error)
            })
            .then(response => {
                notifications.push(createNotification(response));
                printNotifications();
            });
    }
}

function removeElement(task){
    fetch('https://glo3102lab4.herokuapp.com/fee958c0-c320-40d0-a750-218f2d7c1303/tasks/'+task.id, {
        method: 'DELETE',
    }).then(res => res.json)
        .catch(error => {
            console.error('Error:', error);
        })
        .then(() => {
            getElement();
        });
}

function changeElement(task){
    task.name = window.prompt("Update the task", task.name);

    if(task.name != ''){
        fetch('https://glo3102lab4.herokuapp.com/fee958c0-c320-40d0-a750-218f2d7c1303/tasks/'+task.id, {
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
