import React from "react";
import {Card} from "react-bootstrap";

function Intro({ user }) {
    return (
        <Card>
            <Card.Header>
                <Card.Title>
                    <h1>🐄🐕</h1>
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    static한 사이트 소개를 작성하라고 하셨는데
                </Card.Text>
                <Card.Text>
                    무슨말을 써야할지 도저히 모르겠습니다.
                </Card.Text>
                <Card.Text>
                    교수님 죄송합니다 이런 코드를 짰기에
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Intro;