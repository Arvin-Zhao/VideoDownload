import {NavLink, Outlet} from "react-router-dom";
import {Col, Container, Nav, NavItem, Row} from "react-bootstrap";

export default function DownloadIndex()
{
    return (
        <Container fluid>
            <Row>
                <Col xs={1} className={"bg-light"}>
                    <Nav className={"d-block"}>
                        <NavItem>
                            <NavLink to={""} className={"nav-link"}>New UI</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={"old"} className={"nav-link"}>Old UI</NavLink>
                        </NavItem>
                    </Nav>
                </Col>
                <Col xs={11}>
                    <Outlet />
                </Col>
            </Row>


        </Container>
    )
}