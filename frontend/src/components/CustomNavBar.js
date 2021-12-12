import React from 'react';
import {
    Navbar,
    Nav,
    Container,
    Form,
    FormControl,
    InputGroup,
    DropdownButton,
    Dropdown
} from 'react-bootstrap';
import axios from "axios";
import {NavLink} from "react-router-dom";

function NavBarCustom() {

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/">[대충 아이콘]</Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarScroll"/>

                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{maxHeight: '100px'}}
                            navbarScroll
                        >
                            <Nav.Link href="/home" className="nav-link" activeClassName="active">
                                <p className="m-0">Home</p>
                            </Nav.Link>
                            <NavLink to="/new" className="nav-link" activeClassName="active">
                                <p className="m-0">New</p>
                            </NavLink>
                            <NavLink to="/profile" className="nav-link" activeClassName="active">
                                <p className="m-0">Profile</p>
                            </NavLink>
                            <NavLink to="/follow" className="nav-link" activeClassName="active">
                                <p className="m-0">Follow</p>
                            </NavLink>
                            <NavLink to="/msg" className="nav-link" activeClassName="active">
                                <p className="m-0">Message</p>
                            </NavLink>
                        </Nav>
                        <Nav>
                            <Form className="d-flex">
                                <InputGroup>
                                    <FormControl
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        id="search"
                                    />
                                    <DropdownButton
                                        variant="outline-secondary"
                                        title="검색"
                                        id="input-group-dropdown-2"
                                        align="end"
                                    >
                                        <Dropdown.Item onClick={() => {
                                            document.location.href = "/home/search/user/" + document.getElementById("search").value
                                        }}>작성자</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            document.location.href = "/home/search/text/" + document.getElementById("search").value
                                        }}>텍스트</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            document.location.href = "/home/search/hashtag/" + document.getElementById("search").value
                                        }}>해시태그</Dropdown.Item>
                                    </DropdownButton>
                                </InputGroup>
                            </Form>
                            <Nav.Link onClick={() => {
                                axios.get("/api/v1/auth/logout").then(res => {
                                }).catch(err => {
                                    console.log(err);
                                }).finally(() => {
                                    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                    window.location.href = "/";
                                })
                            }}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBarCustom;