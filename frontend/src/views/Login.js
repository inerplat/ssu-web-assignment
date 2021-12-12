import React, {Component} from 'react';
import {Button, Card, Form, Image, Modal} from "react-bootstrap";
import axios from "axios";
import ssu from "assets/image/ssu.png"

class Login extends Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            redirect: false,
            width: 0,
            height: 0,
            modalShow: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.LoginRequest = this.LoginRequest.bind(this)
        this.modalHandle = this.modalHandle.bind(this)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.signUpSubmit = this.signUpSubmit.bind(this)
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
        axios.post("/api/v1/auth/login", account)
            .then((res) => {
                if (res.data["login"]) {
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

    modalHandle(state) {
        this.setState({modalShow: state})
    }

    signUpSubmit() {
        const id = document.getElementById("formId").value
        const email = document.getElementById("formEmail").value
        const username = document.getElementById("formName").value
        const password = document.getElementById("formPassword").value

        axios.post("/api/v1/auth/signup", {
            id: id,
            password: password,
            username: username,
            email: email
        }).then((res) => {
            alert("회원가입에 성공하였습니다")
            this.modalHandle(false)
        }).catch(e => {
            alert(e.response.data.error)
        }).finally(() => {
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
                    <Image src={ssu} style={{
                        margin: "auto",
                        width: "75%",
                        top: "0",
                        left: "0"
                    }}/>
                    <Form className="w-auto m-3" onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>계정</Form.Label>
                            <Form.Control type="id" name="id" placeholder="ID"/>
                        </Form.Group>
                        <Form.Group controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password"/>
                        </Form.Group>
                        <Button className="mt-3" style={{width: "100%"}} variant="primary" type="submit">
                            Login
                        </Button>
                        <Button className="mt-3" style={{width: "100%"}} variant="secondary"
                                onClick={() => this.modalHandle(true)}>
                            회원가입
                        </Button>
                    </Form>
                </Card>
                <Modal show={this.state.modalShow} onHide={() => this.modalHandle(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>회원가입</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formId">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="id" placeholder="ID" onChange={() => {
                                    const id = document.getElementById("formId").value
                                    if (id.length > 0) {
                                        axios.get("/api/v1/auth/signup/duplicate", {
                                            params: {
                                                id: id
                                            }
                                        }).then(res => {
                                            if (res.data.result) {
                                                document.getElementById("formId").style.borderColor = "red"
                                                document.getElementById("login-comment").innerHTML = "중복된 ID입니다"
                                            } else {
                                                document.getElementById("formId").style.borderColor = "green"
                                                document.getElementById("login-comment").textContent = "사용가능한 ID 입니다"

                                            }
                                        }).catch(e => {
                                            console.log(e)
                                        })
                                    }
                                }}/>
                                <Form.Text className="text-muted pl-4" id="login-comment">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>이메일</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>이름</Form.Label>
                                <Form.Control type="name" placeholder="Name"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.modalHandle(false)}>
                            취소
                        </Button>
                        <Button variant="primary" onClick={this.signUpSubmit}>
                            회원가입
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Login;
