import React from 'react';
import {Button, Card, Col, Nav, Row} from 'react-bootstrap';
import axios from "axios";

function Home(props) {
    const getContent = ()=>{
        axios.get('/api/v1/content/'+props.userId)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <Card>
            <Row xs={1} md={4} className="g-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Card>
    )
}
export default Home;