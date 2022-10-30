import React, {useState} from "react";
import Task from "../../model/Task";

type CardProps = {
    changeStatus: (taskId: string, taskIdx: number, status: boolean) => void
    task: Task
    idx: number
}

function Card({idx, task, changeStatus}: CardProps) {

    const [isDone, setDone] = useState<boolean>(task.isDone)

    function toggleStatus() {
        const newStatus = !task.isDone
        changeStatus(task.id, idx, newStatus)
    }

    return (
        <div>
            Id: {task.id} / Idx: {idx}
            Text: {task.text}
            Status: {isDone.toString()}
            <button onClick={event => {
                toggleStatus()
            }}>Toggle
            </button>
        </div>
    );
}

export default Card