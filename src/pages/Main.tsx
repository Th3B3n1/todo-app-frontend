import { useState } from "react"
import { Todo } from "./Todo";
import { Link } from "react-router-dom";

export function Main()
{
    const [token] = useState(localStorage.getItem('token') || '');
    return (
        <>
            {
                (token !== '') ? <Todo token={token} /> 
                :
                <>
                    <h1>You have to log in or register to be able to use the app</h1>
                    <Link to={"/login"}>Login</Link>
                </>
            }
        </>
    )
}