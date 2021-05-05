import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const addTodoReducer = createSlice({
    name: "todos",
    initialState,
    reducers:{
        addTodos:(items,object) => {
            items.push(object.payload)
            return items
        },
        removeTodos:(items,object) => {
            return items.filter((item) => item.id!== object.payload)
        },
        completeTodos:(items,object) => {
            return items.map(task => {
                if(task.id === object.payload){
                    return{
                        ...task,
                        completed: true
                    }
                }
                return task
            })
        }
    }
})

export const {addTodos, removeTodos, completeTodos} = addTodoReducer.actions
export const reducer = addTodoReducer.reducer