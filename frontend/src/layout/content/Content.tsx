import './Content.css'
import {ChangeTaskStatus, GetTasks} from "../../../wailsjs/go/main/App";
import {LogError, LogInfo} from "../../../wailsjs/runtime";
import Task from "../../model/Task";
import React, {useEffect, useState} from "react";
import Card from "../../components/card/Card";


async function LoadTodos(): Promise<Task[]> {
    LogInfo("Loading tasks from Go backend.")
    const tasks: Task[] = []
    await GetTasks().then(items => {
        items.forEach(item => {
            LogInfo(item.Id + " " + item.Text + " " + item.IsDone)
            tasks.push({
                id: item.Id,
                text: item.Text,
                isDone: item.IsDone
            })
        })
    })
    return tasks
}

function Content() {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        LogInfo(
            "Occurs ONCE, AFTER the initial render."
        );
        loadTasks()
    }, []);

    function loadTasks() {
        LoadTodos().then(apiTasks => {
                setTasks([...apiTasks])
            }
        )
    }

    function changeStatus(taskId: string, taskIdx: number, status: boolean) {
        LogInfo("Change status for task with index " + taskId + " and new status of " + status.toString())
        ChangeTaskStatus(taskId, status).then(() => {
            tasks[taskIdx].isDone = status
            setTasks([...tasks])
        }).catch(err => {
            LogError(err)
        })
    }

    return (
        <div id="Content">
            <div>Tasks:</div>
            <div className="CardContainer">
                {tasks.map((task: Task, idx: number) => {
                    return <Card key={task.id} idx={idx} task={task} changeStatus={changeStatus}/>
                })}
            </div>
        </div>
    );

}

export default Content