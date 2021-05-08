import React from 'react'
import { Card, Button } from 'react-bootstrap';
export const TodoItem = (props) => {
    const {item, removeTodo, completeTodo } = props
    return (
            item.completed ?
                item.priority ?
                <Card.Body className="text-decoration-line-through bg-warning text-dark" key={item.id}>
                    <Card.Title>{item.item}<small className="text-decoration-line-through float-right font-weight-lighter" style={{float: "right"}}>Priorytetowe<br />{item.category}</small></Card.Title>
                    <Card.Text>
                        {item.description}
                    </Card.Text>
                    <Button onClick={() => props.removeTodo(item.id)} variant="danger" className="float-right" style={{float: "right"}}>Usuń</Button>
                    <Button onClick={() => props.completeTodo(item.id)} variant="success" className="float-right" style={{float: "right"}}>Zrobione</Button>
                </Card.Body>
                :
                <Card.Body className="text-decoration-line-through bg-info text-white" key={item.id}>
                    <Card.Title>{item.item}<small className="text-decoration-line-through float-right font-weight-lighter" style={{float: "right"}}>{item.category}</small></Card.Title>
                    <Card.Text>
                        {item.description}
                    </Card.Text>
                    <Button onClick={() => props.removeTodo(item.id)} variant="danger" className="float-right" style={{float: "right"}}>Usuń</Button>
                    <Button onClick={() => props.completeTodo(item.id)} variant="success" className="float-right" style={{float: "right"}}>Zrobione</Button>
                </Card.Body>
            :
                item.priority ?
                <Card.Body className="bg-warning text-dark" key={item.id}>
                    <Card.Title>{item.item}<small className="float-right font-weight-lighter" style={{float: "right"}}>Priorytetowe<br />{item.category}</small></Card.Title>
                    <Card.Text>
                        {item.description}
                    </Card.Text>
                    <Button onClick={() => props.removeTodo(item.id)} variant="danger" className="float-right" style={{float: "right"}}>Usuń</Button>
                    <Button onClick={() => props.completeTodo(item.id)} variant="success" className="float-right" style={{float: "right"}}>Zrobione</Button>
                </Card.Body>
                :
                <Card.Body className="bg-info text-white" key={item.id}>
                    <Card.Title>{item.item}<small className="float-right font-weight-lighter" style={{float: "right"}}>{item.category}</small></Card.Title>
                    <Card.Text>
                        {item.description}
                    </Card.Text>
                    <Button onClick={() => props.removeTodo(item.id)} variant="danger" className="float-right" style={{float: "right"}}>Usuń</Button>
                    <Button onClick={() => props.completeTodo(item.id)} variant="success" className="float-right" style={{float: "right"}}>Zrobione</Button>
                </Card.Body>
    )
}
