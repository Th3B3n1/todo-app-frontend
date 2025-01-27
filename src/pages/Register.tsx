import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function register() {
        await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(response => response.json()).then(data => {
            console.log(data);
            navigate('/');
        })
    }
    return (
        <>
            <div>
                <h2>Register</h2>
                <input type="text" placeholder="Username" value={username} onInput={e => setUsername(e.currentTarget.value)} />
                <input type="text" placeholder="Password" value={password} onInput={e => setPassword(e.currentTarget.value)} />
                <button onClick={register}>Register</button>
                <Link to={"/login"}>Login</Link>
            </div>
        </>
    )
}