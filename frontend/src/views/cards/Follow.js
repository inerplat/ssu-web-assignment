import React, {useEffect} from "react";
import {Card, ListGroup} from "react-bootstrap";
import axios from "axios";

function Follow(props) {
    const [followers, setFollowers] = React.useState([]);
    useEffect(() => {
        updateSuggest()
    }, []);
    const updateSuggest = () => {
        axios.get(`/api/v1/friend/suggest`)
            .then(res => {
                const newSuggest = []
                res.data.data.forEach(suggest => {
                    if (suggest.id !== props.userId) {
                        newSuggest.push(suggest)
                    }
                })
                setFollowers(newSuggest)
                console.log(newSuggest)
            })
            .catch(err => {
                console.log(err);
            });
    }
    const follow = (id) => {
        axios.put(`/api/v1/friend`, {
            id: id
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            updateSuggest()
        })
    }

    const unfollow = (id) => {
        axios.delete(`/api/v1/friend`, {
            data: {
                id: id
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            updateSuggest()
        })
    }
    return (
        <Card>
            <Card.Header>
                <Card.Title>
                    <h2>팔로우</h2>
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <ListGroup>
                    {followers.map(user => (
                        <ListGroup.Item key={user.id}>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <span className="ml-2">{user.username} ({user.id})</span>
                                </div>
                                {user.type !== 'F' ? (
                                    <div>
                                        <button className="btn btn-primary btn-sm" onClick={e => follow(user.id)}>팔로우
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <button className="btn btn-danger btn-sm"
                                                onClick={e => unfollow(user.id)}>언팔로우
                                        </button>
                                    </div>
                                )}
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default Follow;