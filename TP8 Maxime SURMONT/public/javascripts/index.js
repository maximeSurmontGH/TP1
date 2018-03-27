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
				document.location.href="https://localhost:8443/userProfile";
			}
	});
};

const getDisconnected = () => {
	fetch('https://localhost:8443/disconnect', {
		method: 'POST',
		credentials: 'include'
	}).then(() => {
		document.location.href = "https://localhost:8443/";
	});
};