import {NavLink, Outlet} from "react-router-dom";
import {Col, Container, Nav, NavItem, Row} from "react-bootstrap";
import "./index.css"
export default function DownloadIndex()
{
    return (
        <Container fluid className={"content"}>
            <Row className={"full-height"}>
                <Col className={"full-height side-bar"}>
                    <Nav className={"d-block full-height"}>
                        <NavItem>
                            <NavLink to={""} end className={({isActive} ) => isActive ? "nav-link active" : "nav-link"}>New UI</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={"old"} className={({isActive} ) => isActive ? "nav-link active" : "nav-link "}>Old UI</NavLink>
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