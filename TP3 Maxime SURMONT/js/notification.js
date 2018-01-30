const notifications = [];

function createNotification(type){
    let notification = document.createElement('div');
    notification.setAttribute('type', type);

    let title = document.createElement('span');
    title.innerHTML = document.getElementById('title').value;
    document.getElementById('title').value = '';

    let icon = = document.createElement('span');
    icon.innerHTML = '&times;';
    icon.className = 'removeIcon';
    icon.onclick = function(){
        notifications.splice(notifications.indexOf(this), 1);
        printNotifications();
    }

    let message = document.createElement('span');
    message.innerHTML = document.getElementById('message').value;
    document.getElementById('title').value = '';

    notification.appendChild(title);
    notification.appendChild(icon);
    notification.appendChild(message);

    notifications.push(notification);
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