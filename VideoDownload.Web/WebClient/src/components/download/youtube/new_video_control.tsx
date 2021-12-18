import {ButtonGroup, Col, DropdownButton, FormControl, InputGroup, Row} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import Button from "react-bootstrap/Button";
import NewVideoList from "./new_video_list";
import {useEffect, useState} from "react";
import {HubConnection} from "@microsoft/signalr";
import {VideoItem} from "./new_video_list"
interface NewVideoControlProp {
    visible: boolean,
    client:HubConnection
}

export default function NewVideoControl(props: NewVideoControlProp) {
    const {visible, client} = props;
    const [newUrl, setNewUrl] = useState<string>("")
    const [videoList,setVideoList] = useState<VideoItem[]>([])

    useEffect(()=>{
        client.on("getUrlInfo", (data:VideoItem[])=>{

        })
    },[])
    function GetUrlInfo()
    {
        client.send("getUrlInfo", newUrl).then(()=>{

        })
    }

    return (
        <>
            <Row className={visible ? "mt-2 show" : "me-2 hidden"}>
                <Col md={5}>
                    <InputGroup>
                        <InputGroup.Text>Url</InputGroup.Text>
                        <FormControl type={"url"} pattern="https://.*" placeholder={"https://youtube.com/XXXX"} value={newUrl}
                         onChange={e=>setNewUrl(e.target.value) }  />
                    </InputGroup>
                </Col>
                <Col>
                    <ButtonGroup>
                        <DropdownButton variant={"outline-secondary"} title="Youtube-dl">
                            <DropdownItem>Youtube-dl</DropdownItem>
                            <DropdownItem>Annie</DropdownItem>
                            <DropdownItem>Curl</DropdownItem>
                            <DropdownItem>You-Get</DropdownItem>
                            <DropdownItem>ytdl</DropdownItem>
                        </DropdownButton>
                        <Button variant={"outline-primary"} disabled={!newUrl} onClick={e=> GetUrlInfo()} >查看信息</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <NewVideoList list={videoList} />
        </>
    )
}