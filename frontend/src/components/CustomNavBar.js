import React from 'react';
import {Navbar, Nav, NavDropdown, Container, Form, FormControl, Button} from 'react-bootstrap';
import axios from "axios";
import {NavLink} from "react-router-dom";

function NavBarCustom(){

    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/">[대충 아이콘]</Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <NavLink to="/home" className="nav-link" activeClassName="active">
                                <p className="m-0">Home</p>
                            </NavLink>
                            <NavLink to="/profile" className="nav-link" activeClassName="active">
                                <p className="m-0">Profile</p>
                            </NavLink>
                            <NavLink to="/follow" className="nav-link" activeClassName="active">
                                <p className="m-0">Follow</p>
                            </NavLink>
                            <NavLink to="/message" className="nav-link" activeClassName="active">
                                <p className="m-0">Message</p>
                            </NavLink>
                        </Nav>
                        <Nav>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                            <Nav.Link onClick={()=>{
                                axios.get("/api/v1/logout").then(res=>{
                                }).catch(err=>{
                                    console.log(err);
                                }).finally(()=>{
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