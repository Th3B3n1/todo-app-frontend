import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function login()
    {
        await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(response => response.json()).then(data => {
            localStorage.setItem("token", data.token);
            navigate('/');
        })
    }
    return (
        <>
            <div>
                <h2>Login</h2>
                <input type="text" placeholder="Username" value={username} onInput={e => setUsername(e.currentTarget.value)} />
                <input type="text" placeholder="Password" value={password} onInput={e => setPassword(e.currentTarget.value)} />
                <button onClick={login}>Login</button>
                <Link to={"/register"}>Register</Link>
            </div>
        </>
    )
}