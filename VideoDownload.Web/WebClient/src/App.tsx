import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/bootstrap-icons.svg"
import "bootstrap-icons/font/bootstrap-icons.css"
import {Container, Navbar, Nav} from "react-bootstrap";
import {NavLink, Outlet} from "react-router-dom";

function App() {
    return (
        <>
            <Navbar bg={"dark"} variant={"dark"}>
                <Container fluid>
                    <NavLink className={"navbar-brand"} to={"/"}>
                        <i className="bi bi-emoji-sunglasses smile"></i> {" "}
                        Home
                    </NavLink>
                    <Nav className={"me-auto"} >
                        <NavLink to={"download"} className={"nav-link"}>Download</NavLink>
                    </Nav>
                </Container>
            </Navbar>
            <Outlet />
        </>

    );
}

export default App;
