import { useEffect, useState } from "react";

interface Props {
    token: string;
}

interface Task {
    id: number;
    title: string;
    content: string;
    done: boolean;
}

export function Todo(props: Props)
{
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getTasks();
    }, [props.token])

    async function getTasks()
    {
        await fetch(`http://localhost:3000/todos?token=${props.token}`).then(response => response.json()).then(data => setTasks(data))
    }

    async function addTask()
    {
        await fetch(`http://localhost:3000/todos?token=${props.token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        }).catch(error => console.error(error));
        await getTasks();     
    }

    async function updateTaskStatus(id: number, done: boolean)
    {
        await fetch(`http://localhost:3000/todos/${id}?token=${props.token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                done: done
            })
        }).catch(error => console.error(error));
        await getTasks();
    }

    async function updateTask(id: number)
    {
        await fetch(`http://localhost:3000/todos/${id}?token=${props.token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        }).catch(error => console.error(error));
        await getTasks();
    }
    async function deleteTask(id: number)
    {
        await fetch(`http://localhost:3000/todos/${id}?token=${props.token}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(error => console.error(error));
        await getTasks();
    }
    return (
        <>
            <h2>Todo</h2>
            <input type="text" placeholder="Title" value={title} onInput={e => setTitle(e.currentTarget.value)} />
            <input type="text" placeholder="Content" value={content} onInput={e => setContent(e.currentTarget.value)} />
            <button onClick={addTask}>Add</button>
            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th></th>
                        <th>Done</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (tasks.length > 0) ? tasks.map(task => {
                            return (
                                <tr key={task.id}>
                                    <td>{task.title} - {task.content}</td>
                                    <button onClick={() => updateTask(task.id)}>Edit</button>
                                    <td><input type="checkbox" checked={task.done} onInput={() => {updateTaskStatus(task.id, !task.done)}} /></td>
                                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                                </tr>
                            )
                        }) : undefined
                    }
                </tbody>
            </table>
        </>
    )
}