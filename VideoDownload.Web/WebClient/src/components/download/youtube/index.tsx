import {
    ButtonGroup,
    Col,
    Row,
} from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import {useEffect, useState} from "react";
import NewVideoControl from "./new_video_control";
import * as signalR from "@microsoft/signalr";
import {HubConnection} from "@microsoft/signalr";

let connection: HubConnection
export default function YoutubeIndex() {
    const [newButtonActive, setNewButtonActive] = useState<boolean>(true)
    useEffect(() => {
        if (!connection) {
            connection = new signalR.HubConnectionBuilder()
                .withUrl("downloadhub")
                .build()
            connection.start().catch(error => document.write(error))
        }
    }, [])
    return (
        <>
            <Row>
                <Col>
                    <ButtonGroup>
                        <Button variant={"primary"} disabled={!newButtonActive}
                                onClick={e => setNewButtonActive(false)}>新增</Button>
                        <Button variant={"secondary"} disabled={newButtonActive}
                                onClick={e => setNewButtonActive(true)}>暂停</Button>
                        <Button variant={"warning"} disabled>删除</Button>
                        <Button variant={"info"} disabled>恢复</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <NewVideoControl visible={!newButtonActive} client={connection}/>
        </>
    )
}