import React from "react";
import {Card} from "react-bootstrap";

function Intro({user}) {
    return (
        <Card>
            <Card.Header>
                <Card.Title>
                    <h1>๐๐</h1>
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    staticํ ์ฌ์ดํธ ์๊ฐ๋ฅผ ์์ฑํ๋ผ๊ณ  ํ์จ๋๋ฐ
                </Card.Text>
                <Card.Text>
                    ๋ฌด์จ๋ง์ ์จ์ผํ ์ง ๋ชจ๋ฅด๊ฒ ์ต๋๋ค.
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Intro;