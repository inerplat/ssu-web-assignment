import React, {Component} from 'react';
import {Button, Card, Form, Image} from "react-bootstrap";
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            redirect: false,
            width: 0,
            height: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.LoginRequest = this.LoginRequest.bind(this)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({
            width: window.innerWidth > 1200 ? 1200 : window.innerWidth,
            height: window.innerHeight
        });
    }

    LoginRequest(account) {
        axios.post("/api/v1/login", account)
            .then((res) => {
                if (res.data["login"]) {
                    // this.setState({redirect: true})
                    window.location.reload(true)
                } else {
                    alert("ID/PW를 다시 확인해주세요")
                }
            })
            .catch(e => {
                alert("로그인 서버가 응답할 수 없습니다")
                console.log(e)
            })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.LoginRequest({
            id: event.target.id.value,
            password: event.target.password.value
        })
    }

    render() {
        return (
            <div style={{
                width: "100%",
                height: this.state.height,
                backgroundColor: "azure"
            }}
            >
                <div style={{
                    width: this.state.width,
                    height: "470px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -15%)"
                }}/>
                <Card className="m-auto pl-5 pr-5 pt-5 pb-2"
                      style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -80%)",
                      }}
                >
                    <Form className="w-auto" onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>계정</Form.Label>
                            <Form.Control type="id" name="id" placeholder="ID"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password"/>
                        </Form.Group>
                        <Button style={{width: "100%"}} variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>

                </Card>
            </div>
        );
    }
}

export default Login;
