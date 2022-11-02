import React from "react";
import Task from "../../model/Task";
import "./Card.css"

type CardProps = {
    changeStatus: (taskId: string, taskIdx: number, status: boolean) => void
    remove: (taskId: string) => void
    task: Task
    idx: number
}

function Card({idx, task, changeStatus, remove}: CardProps) {

    function toggleStatus() {
        const newStatus = !task.isDone
        changeStatus(task.id, idx, newStatus)
    }

    return (
        <div className={`Card ${task.isDone ? "ToDo" : "Done"}`}>
            <div>
                <button onClick={() => {
                    remove(task.id)
                }}>X
                </button>
                Id: {task.id.substring(0, 8)}</div>
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