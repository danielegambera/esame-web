class Api {

    //fa il login
    static doLogin = async (username, password) => {
        let response = await fetch('/api/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            }),
        });
        if (response.ok) {
            const username = await response.json();
            return username;
        } else {
            try {
                const errDetail = await response.json();
                throw errDetail.message;
            } catch (err) {
                throw err;
            }
        }
    }

    //fa il signup
    static doSignup = async (nome, email, password, creatore) => {
        let response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome,
                email,
                password,
                creatore
            }),
        });
        if (response.ok) {
            //const nome = await response.json();
            return;
        } else {
            try {
                const errDetail = await response.json();
                throw errDetail.message;
            } catch (err) {
                throw err;
            }
        }
    }

    //Fa il logout
    static doLogout = async () => {
        await fetch('/api/sessions/current', {
            method: 'DELETE'
        });
    }
}

export default Api;