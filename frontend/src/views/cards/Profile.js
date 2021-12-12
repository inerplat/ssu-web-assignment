import React, {useEffect} from "react";
import {Card} from "react-bootstrap";
import axios from "axios";

function Profile(props) {
    const [time, setTime] = React.useState(Date().toLocaleString());
    const [friend, setFriend] = React.useState({followee: null, follower: null});
    useEffect(() => {
        axios.get('/api/v1/friend/count')
            .then(res => {
                setFriend(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        const interval = setInterval(() => setTime(Date().toLocaleString()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <Card>
            <Card.Body className="p-4">
                <Card.Title>ID</Card.Title>
                <Card.Text>
                    {props.userId}
                </Card.Text>
                <hr/>
                <Card.Title>Time</Card.Title>
                <Card.Text>
                    {time}
                </Card.Text>
                <hr/>
                <Card.Title>내가 팔로우한사람</Card.Title>
                <Card.Text>
                    {friend.followee}
                </Card.Text>
                <hr/>
                <Card.Title>나를 팔로우한사람</Card.Title>
                <Card.Text>
                    {friend.follower}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Profile;