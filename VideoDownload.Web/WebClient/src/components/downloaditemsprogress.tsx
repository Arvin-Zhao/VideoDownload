import React, {Dispatch, useReducer} from "react";
import {DownloadItemInfo} from "./youtubedl";
import "bootstrap-icons/bootstrap-icons.svg"
import "bootstrap-icons/font/bootstrap-icons.css"

interface SortItem{
    filedName:string,
    asc:boolean
}
function sort (state:SortItem, filedName:string)
{
    if(state.filedName === filedName)
        return {filedName, asc:! state.asc}
    else
        return {filedName, asc: state.asc}
}
function DownloadItemsProgress(props:{items:DownloadItemInfo[]}){
    const items = props.items
    const [sortField, setSortField] = useReducer(sort,{filedName:"id", asc:true})
    const data:DownloadItemInfo[] = Object.assign([], items)
        .sort((itemA, itemB) =>
            (itemA[sortField.filedName] > itemB[sortField.filedName] ? 1 :-1) * (sortField.asc ? 1: -1) )

    return (
        <table id="download_list" className="table table-hover table-responsive table-bordered table-striped">
            <thead>
                <tr>
                    <DownloadListTableHeader click={setSortField} sortInfo={sortField} name={"id"} displayName={"#"}></DownloadListTableHeader>
                    <DownloadListTableHeader click={setSortField} sortInfo={sortField} name={"name"} displayName={"名字"}></DownloadListTableHeader>
                    <DownloadListTableHeader click={setSortField} sortInfo={sortField} name={"percent"} displayName={"进度"}></DownloadListTableHeader>
                    <DownloadListTableHeader click={setSortField} sortInfo={sortField} name={"totalSize"} displayName={"文件大小"}></DownloadListTableHeader>
                    <DownloadListTableHeader click={setSortField} sortInfo={sortField} name={"speed"} displayName={"速度"}></DownloadListTableHeader>
                    <DownloadListTableHeader click={setSortField} sortInfo={sortField} name={"eta"} displayName={"剩余时间"}></DownloadListTableHeader>
                    <DownloadListTableHeader click={setSortField} sortInfo={sortField} name={"spend"} displayName={"耗时"}></DownloadListTableHeader>
                </tr>
            </thead>
            <tbody>
            { data.map((value, index) => {
                return  <tr key={value.id}>
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                    <td width={"300px"}>
                        <div className="progress" style={{height:"30px"}}>
                            <div className="progress-bar bg-info"
                                style={{width:value.percent + "%"} }
                                 role="progressbar"
                                 aria-valuenow={value.percent}
                                 aria-valuemin={0}
                                 aria-valuemax={100}>{value.percent} %
                            </div>
                        </div>
                    </td>
                    <td>{value.totalSize}</td>
                    <td>{value.speed}</td>
                    <td>{value.eta}</td>
                    <td>{value.spend}</td>
                </tr>
            })}
            </tbody>
        </table>
    )
}

interface TableHeaderSort{
    sortInfo:SortItem,
    name: string,
    displayName:string,
    click:Dispatch<string>
}

function DownloadListTableHeader(props:TableHeaderSort)
{
    const { sortInfo, name, displayName, click} = props;
    return (
        <th className={"table-header"} onClick={() => click(name)}>{displayName}
            {
                sortInfo.filedName === name ?
                    (sortInfo.asc ? <i className="bi bi-arrow-down"></i> : <i className="bi bi-arrow-up"></i>)
                    : ""
            }
        </th>
    )
}

export default DownloadItemsProgress;