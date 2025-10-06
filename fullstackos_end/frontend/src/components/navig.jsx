import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';


export default function Navig() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
            <Container>
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className="custom-nav-link">Főoldal</Nav.Link>
                        <Nav.Link href="/uj" className="custom-nav-link">Új hozzáadása</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}