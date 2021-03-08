export function logIn(auth) {
    return function (dispatch) {
        fetch(`http://54.185.136.150:9000/login`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(auth)
        })
            .then((res) => res.json())

            .then(data => {
                sessionStorage.setItem("state", auth.username)
                if (data.authorize === 'true') {
                    dispatch({ type: 'LOG_IN', payload: auth })
                }
                else {
                    dispatch({ type: 'INVALID'})
                }
            })
    }
}

export function register(auth) {
    return function (dispatch) {
        fetch(`http://54.185.136.150:9000/register`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(auth)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.registration === 'successful') {
                    dispatch({ type: 'REGISTER', payload: data })
                }
                else {
                    dispatch({ type: 'REGISTER', payload: data })
                }
            })
    }
}