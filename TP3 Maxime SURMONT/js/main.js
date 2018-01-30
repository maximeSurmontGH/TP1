//import * from './js/notification.js';

const notifications = [];

function createNotification(type){
    if(document.getElementById('title').value == '' || document.getElementById('message').value == ''){
        alert("Your notification need a title AND a message to be pushed.");
    }else{
        let notification = document.createElement('div');
        notification.setAttribute('type', type);

        let title = document.createElement('span');
        title.innerHTML = document.getElementById('title').value.toUpperCase();
        document.getElementById('title').value = '';


        let icon = document.createElement('span');
        icon.innerHTML = '&times;';
        icon.className = 'removeIcon';
        icon.onclick = function(){
            notifications.splice(notifications.indexOf(this), 1);
            printNotifications();
        };

        let message = document.createElement('span');
        message.innerHTML = document.getElementById('message').value.toLowerCase();
        document.getElementById('message').value = '';

        notification.appendChild(title);
        notification.appendChild(icon);
        notification.appendChild(message);

        notifications.push(notification);

        printNotifications();
    }
}

function printNotifications(){
    let aside = document.getElementById('notification');

    while(aside.hasChildNodes()){
        aside.removeChild(aside.firstChild);
    }

    for (let notif of notifications){
        aside.appendChild(notif);
    }
}