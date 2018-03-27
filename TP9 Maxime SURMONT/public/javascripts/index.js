const getConnected = () =>{
	let user = {login: document.getElementById("login").value, password: document.getElementById("password").value};

	fetch('https://localhost:8443/login', {
		method: 'POST',
		body: JSON.stringify(user),
		credentials: 'include',
		headers: new Headers({
			'Content-Type': 'application/json',
		})
	}).then(res => {
			if(res.status == 403){
				document.location.href="https://localhost:8443/loginError";
			}else{
				document.location.href="https://localhost:8443/chat";
			}
	});
};

/*
const getDisconnected = () => {
	fetch('https://localhost:8443/disconnect', {
		method: 'POST',
		credentials: 'include'
	}).then(() => {
		document.location.href = "https://localhost:8443/";
	});
};

const sendMessage = () => {
	const message = document.getElementById('message').value;

	let divMessage = document.createElement('div');
	divMessage.className = "message";
	let spanMessage = document.createElement('span');
	spanMessage.className = "me";
	spanMessage.className = "them";
	spanMessage.innerText = "Maxime:";
	let span2Message = document.createElement('span');
	span2Message.innerText = message;

	divMessage.appendChild(spanMessage);
	divMessage.appendChild(span2Message);
	document.getElementById('chatMessages').appendChild(divMessage);

	document.getElementById('message').value = '';
};*/