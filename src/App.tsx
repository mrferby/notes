import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "completed" | "active"

function App() {
    //BI
    //const [tasks, setTasks] = useState<Array<TaskType>>(
    //    []
    //)
    //const tasks = array[0]
    //const setTasks = array[1]

    const [tasks, setTasks] = useState<Array<TaskType>>(
    [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
        ]
    )

    const [filter, setFilter] = useState<FilterValuesType>("all") // "active", "completed"
    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const removeTask = (taskId: string) => {
        let filteredTasks = tasks.filter(t => t.id !== taskId);
        setTasks(filteredTasks);
        //console.log(tasks)
        //return undefined
    }

    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        const updatedTasks: Array<TaskType> = [newTask, ...tasks]
        setTasks(updatedTasks)
    }

    const changeTaskStatus = (taskID: string, isDone: boolean ) => {
        const updatedTasks: Array<TaskType> = tasks
            .map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks(updatedTasks)
    }

    //UI:
    let tasksForRender = tasks

    if(filter === "active") {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if(filter === "completed") {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <TodoList
                filter={filter}
                title={"What to learn"}
                tasks={tasksForRender}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    )
}

export default App;
