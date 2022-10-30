import React from "react";
import Task from "../../model/Task";

type CardProps = {
    changeStatus: (idx: string, status: boolean) => void
    task: Task
    idx: number
}

type CardState = {
    isDone: boolean
}

export class Card extends React.Component<CardProps, CardState> {

    constructor(props: CardProps, state: CardState) {
        super(props, state);
    }

    componentDidMount() {
        this.setState({
            isDone: this.props.task.isDone
        })
    }

    toggleStatus() {
        const newStatus = !this.props.task.isDone
        this.props.changeStatus(this.props.task.id, newStatus)
        // this.setState({
        //     isDone: newStatus
        // })
    }

    render() {
        return (
            <div>
                Id: {this.props.task.id} / Idx: {this.props.idx}
                Text: {this.props.task.text}
                Status: {this.props.task.isDone.toString()}
                <button onClick={event => {
                    this.toggleStatus()
                }}>Toggle
                </button>
            </div>
        );
    }
}