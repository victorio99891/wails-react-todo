import './Content.css'
import {LogError, LogInfo} from "../../../wailsjs/runtime";
import Task from "../../model/Task";
import React, {useEffect, useState} from "react";
import Card from "../../components/card/Card";
import {AddTask, ChangeTaskStatus, GetTasks, RemoveTask} from "../../../wailsjs/go/backend/TaskController";
import {useAlert} from "../../context/Alert";


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
    tasks.sort((t1, t2) => t1.id.localeCompare(t2.id))
    return tasks
}

function Content() {
    const {setAlert} = useAlert()
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        LogInfo("Initial task load execution!");
        refreshTasks()
    }, []);

    function addRandomTask() {
        AddTask(new Date().toISOString())
            .then((newTaskId: string) => {
                setAlert({
                    text: `Added: ${newTaskId}`,
                    type: "success"
                })
                refreshTasks()
            })
    }

    function refreshTasks() {
        LoadTodos().then(apiTasks => {
                setTasks([...apiTasks])
            }
        )
    }

    function changeStatus(taskId: string, taskIdx: number, status: boolean) {
        LogInfo("Change status for task with index " + taskId + " and new status of " + status.toString())
        ChangeTaskStatus(taskId, status).then(() => {
            setAlert({
                text: `Changed status: ${taskId}`,
                type: "success"
            })
            tasks[taskIdx].isDone = status
            refreshTasks()
        }).catch(err => {
            LogError(err)
        })
    }

    function removeTask(taskId: string) {
        LogInfo("Removed: " + taskId)
        RemoveTask(taskId).then(() => {
            setAlert({
                text: `Removed task with id: ${taskId}`,
                type: "warning"
            })
            refreshTasks()
        }).catch(err => {
            LogError(err)
        })
    }

    return (
        <div id="Content">
            <div className="AddTaskButton">
                <button onClick={() => {
                    addRandomTask()
                }}>Add random task!
                </button>
            </div>
            <div className="CardContainer">
                <div className="ToDoColumn">
                    {tasks.filter(t => !t.isDone).map((task: Task, idx: number) => {
                        return <Card key={task.id}
                                     idx={idx}
                                     task={task}
                                     changeStatus={changeStatus}
                                     remove={removeTask}/>
                    })}
                </div>
                <div className="DoneColumn">
                    {tasks.filter(t => t.isDone).map((task: Task, idx: number) => {
                        return <Card key={task.id}
                                     idx={idx}
                                     task={task}
                                     changeStatus={changeStatus}
                                     remove={removeTask}/>
                    })}
                </div>

            </div>
        </div>
    );

}

export default Content