import React, {useState} from 'react'
import { connect } from "react-redux"
import { addTodos, removeTodos, completeTodos } from "../redux/reducer"
import { TodoItem } from "./TodoItem"
const mapStateToProps = state => {
    return {
        todos: state
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
    const [todo, setTodo] = useState("")

    const handleChange = e => {
        setTodo(e.target.value)
    }
    return (
        <div className="addTodos">
            <input type="text" onChange={(e) => handleChange(e)} className="todo-input"/>
            <button className="add-btn" onClick={() => props.addTodo({
                id: Math.floor(Math.random()*1000),
                item: todo,
                completed: false
            })}>Add</button>
            <ul>
                {
                    props.todos.map(item => (
                        <TodoItem 
                            key={item.id}
                            item={item}
                            removeTodo={props.removeTodo}
                            completeTodo={props.completeTodo}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Todos)
