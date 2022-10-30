import React from "react";
import Task from "../../model/Task";
import "./Card.css"

type CardProps = {
    changeStatus: (taskId: string, taskIdx: number, status: boolean) => void
    task: Task
    idx: number
}

function Card({idx, task, changeStatus}: CardProps) {

    function toggleStatus() {
        const newStatus = !task.isDone
        changeStatus(task.id, idx, newStatus)
    }

    return (
        <div className="Card">
            <div>Id: {task.id} / Idx: {idx}</div>
            <div>Text: {task.text}</div>
            <div>Status: {task.isDone.toString()}</div>
            <button onClick={event => {
                toggleStatus()
            }}>{
                task.isDone && <span>Undone!</span>
            }
                {
                    !task.isDone && <span>Done!</span>
                }
            </button>
        </div>
    );
}

export default Card