import React from 'react'

export const TodoItem = (props) => {
    const {item, removeTodo, completeTodo } = props
    return (
        <li key={item.id}>
            {item.item} 
            <button onClick={() => props.removeTodo(item.id)}> Usuń </button>
            <button onClick={() => props.completeTodo(item.id)}> Zrobione </button>
        </li>
    )
}
