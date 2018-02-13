const notifications = [];

export function createNotification(){
    if(document.getElementById('title').value == '' || document.getElementById('message').value == ''){
        alert("Your notification need a title AND a message to be pushed.");
    }else{
        let notification = document.createElement('div');

        let title = document.createElement('span');
        title.innerHTML = document.getElementById('title').value.toUpperCase();
        document.getElementById('title').value = '';

        let icon = document.createElement('span');
        icon.innerHTML = '&times;';
        icon.className = 'deleteIcon';

        let icon2 = document.createElement('span');
        icon2.innerHTML = '&#9998';
        icon2.className = 'putIcon';

        let message = document.createElement('span');
        message.innerHTML = document.getElementById('message').value.toLowerCase();
        document.getElementById('message').value = '';

        notification.appendChild(title);
        notification.appendChild(icon);
        notification.appendChild(icon2);
        notification.appendChild(message);

        notification.childNodes[1].onclick = () => {
            removeNotification(notification);
        };

        notifications.push(notification);

        printNotifications();
    }
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

var removeNotification = (notif) => {
    notifications.splice(notifications.indexOf(notif), 1);
    printNotifications();
}
