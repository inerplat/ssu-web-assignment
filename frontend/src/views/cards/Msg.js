import React, {useEffect} from "react";
import {Card, Col, Tab, Row, ListGroup, Container, InputGroup, FormControl, Button} from "react-bootstrap";
import axios from "axios";

function Msg(props) {
    const [friends, setFriends] = React.useState([]);
    const [talker, setTalker] = React.useState(null);
    const [messages, setMessages] = React.useState([]);
    const [sendMsg, setSendMsg] = React.useState('');
    useEffect(() => {
        getFriends()
    }, []);
    const getFriends = (e) => {
        axios.get('/api/v1/friend')
            .then(res => {
                const newFriends = []
                res.data.forEach(friend => {
                    newFriends.push(friend)
                })
                setFriends(newFriends);
            }).catch(err => {
            console.log(err);
        });
    }
    const getMessage = (friend) => {
        axios.get('/api/v1/msg', {
            params: {
                id: friend
            }
        })
            .then(res => {
                const newMessage = []
                res.data.forEach(message => {
                    newMessage.push(message)
                })
                setMessages(newMessage);
            }).catch(err => {
            console.log(err);
        });
    }
    const sendMessage = (friend) => {
        axios.post('/api/v1/msg', {
            id: friend,
            msg: sendMsg
        }).then(res => {
            setSendMsg('');
            getMessage(friend)
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <Card>
            <Card.Text className={"m-auto p-3"}>
                <h3>서로 팔로우되어 있어야 메시지기능을 이용할 수 있습니다</h3>
            </Card.Text>
            <div className="m-3">

                <Tab.Container id="list-group-tabs-example">
                    <Row>
                        <Col sm={4}>
                            <ListGroup>
                                {
                                    friends.map((friend, idx) => {
                                        return (
                                            <ListGroup.Item
                                                action
                                                href={"#link" + (props.userId === friend.duser ? friend.suser : friend.duser)}
                                                key={idx}
                                                onClick={() => {
                                                    setTalker(friend.duser)
                                                    getMessage(friend.duser)
                                                }}>{friend.username} ({friend.duser})
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                        </Col>
                        <Col sm={8}>
                            <Tab.Content>
                                {
                                    messages.map((message, idx) => {
                                        return (
                                            <Tab.Pane
                                                eventKey={"#link" + (props.userId === message.duser ? message.suser : message.duser)}
                                                key={idx}>
                                                <Container>
                                                    <Row>
                                                        <Col>{props.userId === message.duser ? <ListGroup.Item
                                                            variant="secondary">{message.msg}</ListGroup.Item> : " "}</Col>
                                                        <Col
                                                            style={{textAlign: "right"}}>{props.userId === message.suser ?
                                                            <ListGroup.Item
                                                                variant="warning">{message.msg}</ListGroup.Item> : " "}</Col>
                                                    </Row>
                                                </Container>
                                            </Tab.Pane>
                                        )
                                    })
                                }
                            </Tab.Content>

                            <InputGroup className="mt-3 mr-5 p-3">
                                <FormControl
                                    placeholder="메시지를 입력해주세요"
                                    aria-label="메시지를 입력해주세요"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) => {
                                        setSendMsg(e.target.value)
                                    }}
                                    value={sendMsg}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            sendMessage(talker)
                                        }
                                    }}
                                />
                                <Button variant="outline-secondary"
                                        id="button-addon2"
                                        onClick={e => sendMessage(talker)}
                                        type="submit"
                                >
                                    전송
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </Card>
    );
}

export default Msg;