import './Content.css'
import {ChangeTaskStatus, GetTasks} from "../../../wailsjs/go/main/App";
import {LogError, LogInfo} from "../../../wailsjs/runtime";
import Task from "../../model/Task";
import React from "react";
import {Card} from "../../components/card/Card";


async function LoadTodos(): Promise<Task[]> {
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

type ContentProps = {}

type ContentState = {
    tasks: Task[]
}

class Content extends React.Component<ContentProps, ContentState> {

    constructor(props: ContentProps, state: ContentState) {
        super(props, state);
    }

    loadTasks() {
        LoadTodos().then(tasks => {
                LogInfo("Loading tasks from Go backend.")
                this.setState({
                    tasks: tasks
                })
            }
        )
    }

    changeStatus(taskId: string, status: boolean) {
        alert("Change status for task with index " + taskId + " and new status of " + status.toString())
        ChangeTaskStatus(taskId, status).then(() => {
            LoadTodos().then(tasks => {
                    LogInfo("Loading tasks from Go backend.")
                    this.setState({
                        tasks: tasks
                    })
                }
            )
        }).catch(err => {
            LogError(err)
        })
    }

    render() {
        return (
            <div id="Content">
                <div>Tasks:</div>
                <div className="CardContainer">
                    {this.state?.tasks.map((task: Task, idx: number) => {
                        return <Card key={task.id} idx={idx} task={task} changeStatus={this.changeStatus}/>
                    })}
                </div>
                <div>
                    <button onClick={() => this.loadTasks()}>Load Tasks</button>
                </div>
            </div>
        );
    }
}

export default Content