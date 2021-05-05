import React, {useState} from 'react'
import { connect } from "react-redux"
import { addTodos, removeTodos, completeTodos } from "../redux/reducer"
import { TodoItem } from "./TodoItem"
import uniqid from 'uniqid'
const mapStateToProps = state => {
    return {
        taskList: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTodo: obj => dispatch(addTodos(obj)),
        removeTodo: id => dispatch(removeTodos(id)),
        completeTodo: id => dispatch(completeTodos(id))
    }
}

const Todos = (props) => {
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [category, setCategory] = useState('Sport')
    const [priority, setPriority] = useState(false)
    const [filter, setFilter] = useState('wszystko')
    const [newCategory, setNewCategory] = useState('')
    const [categoryList, setCategoryList] = useState(['Sport','Nauka','Sprzątanie'])

    const changeTaskName = e => {
        setTaskName(e.target.value)
    }

    const changeTaskDescription = e => {
        setTaskDescription(e.target.value)
    }

    const changeTaskCategory = e => {
        setCategory(e.target.value) 
    }

    const changeTaskNewCategory = e => {
        setNewCategory(e.target.value) 
    }

    const changeTaskCategoryList = () => {
        if(newCategory.length) setCategoryList([...categoryList, newCategory]);
    }

    const changeTaskPriority = e => {
        setPriority(e.target.value) 
    }

    const changeFilter = e => {
        setFilter(e.target.value) 
    }

    return (
        <div>
            Nowa kategoria: <input type="text" onChange={e => changeTaskNewCategory(e)}/><br />
            <button onClick={() => changeTaskCategoryList()}>Dodaj kategorie</button><br /><br /><br />
            Nazwa: <input type="text" onChange={(e) => changeTaskName(e)}/>
            <input type="checkbox" value="true" onChange={(e) => changeTaskPriority(e)}/>
            Opis: <input type="text" onChange={(e) => changeTaskDescription(e)}/><br />
            Kategoria: 
            <select name="category"defaultValue={category} onChange={e => changeTaskCategory(e)}>
                {categoryList.map((name,key)=> (
                    <option key={key} value={name}>{name}</option>
                ))}
            </select><br />
            <button onClick={() => props.addTodo({
                id: uniqid(),
                item: taskName,
                completed: false,
                category: category,
                description: taskDescription,
                priority: priority
            })}>Dodaj zadanie</button>
            <ul>                
                Kategoria: <select name="filterCategory" defaultValue={filter} onChange={e => changeFilter(e)}>
                {categoryList.map((name,key)=> (
                    <option key={key} value={name}>{name}</option>
                ))}
                    <option value="wszystko">Wszystko</option>
                </select><br />
                Zadania z filtrem
                {
                    props.taskList.length > 0 && 
                    props.taskList.map(item => {
                        if(filter==="wszystko"){
                            return (
                                <TodoItem 
                                    key={item.id}
                                    item={item}
                                    removeTodo={props.removeTodo}
                                    completeTodo={props.completeTodo}
                                />
                            )
                        }else{
                            return(
                                item.category === filter &&
                                <TodoItem 
                                    key={item.id}
                                    item={item}
                                    removeTodo={props.removeTodo}
                                    completeTodo={props.completeTodo}
                                />
                            )
                        }
                    })
                }
            </ul>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Todos)
