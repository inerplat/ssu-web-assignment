import React, {useEffect} from "react";
import {Card} from "react-bootstrap";

function Profile(props) {
    const [time, setTime] = React.useState(Date().toLocaleString());

    useEffect(() => {
        const interval = setInterval(() => setTime(Date().toLocaleString()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <Card>
            <Card.Body>
                <Card.Title>ID</Card.Title>
                <Card.Text>
                    {props.userId}
                </Card.Text>
                <hr />
                <Card.Title>Time</Card.Title>
                <Card.Text>
                    {time}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Profile;