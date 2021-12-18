import {Image, Row, Table} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";


interface NewVideoListProp{
    list:VideoItem[]
}

export interface VideoItem{
    thumbUrl:string,
    name:string,
    description:string,
    totalTime:string,
    totalSize:string,
    checked:boolean
}
export default function NewVideoList(props:NewVideoListProp)
{
    const {list} = props

    return (
        <Row className={list.length > 0 ? "mt-2 show":"me-2 hidden"}>
            <Table className={"table-success"} hover responsive striped>
                <thead>
                <tr>
                    <th> <FormCheckInput /> </th>
                    <th>#</th>
                    <th style={{"width":"100px"}}>封面</th>
                    <th>名称</th>
                    <th>时长</th>
                    <th>文件大小</th>
                </tr>
                </thead>
                <tbody>
                {list.map((value,index) => {
                    <tr>
                        <td>
                            <FormCheckInput isValid={value.checked} />
                        </td>
                        <td>{index}</td>
                        <td>
                            <Image thumbnail src={value.thumbUrl} />
                        </td>
                        <td>
                            <div> {value.name} </div>
                            {value.description}
                        </td>
                        <td>{ value.totalTime } </td>
                        <td>{ value.totalSize }</td>
                    </tr>
                })}

                </tbody>
            </Table>
        </Row>
    )
}