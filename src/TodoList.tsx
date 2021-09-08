import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    changeTaskStatus:  (taskID: string, isDone: boolean) => void
}

function TodoList(props: TodolistPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle){
            props.addTask(title)
        }else {
            setError(true)
        }
        //props.addTask(title)
        setTitle("")
    }
    const setAllFilter = () => props.changeTodoListFilter("all")
    const setActiveFilter = () => props.changeTodoListFilter("active")
    const setCompletedFilter = () => props.changeTodoListFilter("completed")
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            addTask()
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if(error){
            setError(false)
        }
        setTitle(e.currentTarget.value)
    }
    //let sdfsf = "";
    //if (props.filter === "all") {
    //    sdfsf = "active-filter"
    //}
    const allBtnClass = props.filter === "all" ? "active-filter" : ""
    const activeBtnClass = props.filter === "active" ? "active-filter" : ""
    const completedBtnClass = props.filter === "completed" ? "active-filter" : ""
    const taskList = props.tasks.map(t => {
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
        return (
            <li key={t.id}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <span className={!t.isDone ? "notCompleted" : ""}>{t.title}</span>
                <button onClick={()=>props.removeTask(t.id)}>x</button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div style={{color:"red"}}>Title is required</div>}
            </div>
            <ul>
                {taskList}
            </ul>
            <div>
                <button
                    className={allBtnClass}
                    onClick={setAllFilter}>All</button>
                <button
                    className={activeBtnClass}
                    onClick={setActiveFilter}>Active</button>
                <button
                    className={completedBtnClass}
                    onClick={setCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;