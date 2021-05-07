import React, {useState} from 'react'
import { connect } from "react-redux"
import { addTodos, removeTodos, completeTodos } from "../redux/reducer"
import { TodoItem } from "./TodoItem"
import uniqid from 'uniqid'
import styles from './Todos.module.scss'
import { Card, Nav, Container, Row, Col, Form, Button, InputGroup} from 'react-bootstrap';
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

    const createTask = () =>{
        props.addTodo({
            id: uniqid(),
            item: taskName,
            completed: false,
            category: category,
            description: taskDescription,
            priority: priority
        })
    }

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
        setPriority(e.target.checked) 
    }

    const changeFilter = e => {
        setFilter(e.target.value) 
    }

    return (
        <Container className={styles.container}>
            <Row>
                <Col lg={1}></Col>
                <Col lg={10} className={styles.userPanel}>
                    <Form>
                        <Row>
                            <Col md={8}>
                                <Form.Group>
                                    <Form.Label>Nazwa zadania:</Form.Label>
                                    <InputGroup className="mb-2 mr-sm-2">
                                        <InputGroup.Prepend className={styles.categoryCheck}>
                                            <InputGroup.Text className={priority ? styles.categoryOn : styles.categoryOff}>
                                                <Form.Label className="mb-0" htmlFor="priority">Priorytet</Form.Label>
                                                <Form.Check type="checkbox" id="priority" name="priority" onChange={(e) => changeTaskPriority(e)} />
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="text" placeholder="Nazwa" onChange={(e) => changeTaskName(e)} />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={1}></Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Kategoria zadania:</Form.Label>
                                    <Form.Control as="select" name="category" defaultValue={category} onChange={e => changeTaskCategory(e)}>
                                        {categoryList.map((name,key)=> (
                                            <option key={key} value={name}>{name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col lg={12}>
                                <Form.Group>
                                    <Form.Label>Opis zadania:</Form.Label>
                                    <Form.Control as="textarea" rows={3} type="text" placeholder="Opis" onChange={(e) => changeTaskDescription(e)}/>
                                </Form.Group>
                                <Button className="float-right mt-3 " style={{float: "right"}} variant="success" onClick={() => createTask()}>Dodaj zadanie
                                </Button>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col lg={12}>
                                <Form.Group>
                                    <Form.Label>Nowa kategoria:</Form.Label>
                                    <Form.Control type="text" placeholder="Kategoria" onChange={e => changeTaskNewCategory(e)} />
                                </Form.Group>
                                <Button className="float-right mt-3" style={{float: "right"}} variant="primary" onClick={() => changeTaskCategoryList()}>Dodaj kategorie</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col lg={1}></Col>
                <Col sm={1}></Col>
                <Col sm={10}>
                    <Card className={styles.card}>
                        <Card.Header>
                            <Nav>
                                <Form.Group>
                                    <Form.Label>Filtracja zadań po kategori:</Form.Label>
                                    <Form.Control size="sm" as="select" name="filterCategory" defaultValue="wszystko" onChange={e => changeFilter(e)}>
                                    {categoryList.map((name,key)=> (
                                        <option value={name} key={key}>
                                            {name}
                                        </option>
                                    ))}
                                        <option value="wszystko">
                                            Wszystko
                                        </option>
                                    </Form.Control>
                                </Form.Group>
                            </Nav>
                        </Card.Header>
                        {
                            props.taskList.length > 0 ?
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
                            :
                            <div id={styles['emptyTaskList']} className="border rounded justify-content-center d-flex align-items-center">
                                Brak zadań
                            </div>
                        }
                    </Card>
                </Col>
                <Col sm={1}></Col>
            </Row>
        </Container>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Todos)
