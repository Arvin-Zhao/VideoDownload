import React, {useEffect, useState} from "react"
import * as signalR from "@microsoft/signalr"
import DownloadItemsProgress from "./downloaditemsprogress"
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";


export interface DownloadItemInfo{
    id:number;
    percent:number;
    name:string;
    totalSize:string;
    speed:string;
    eta:string;
    spend:string;
}

const connection = new signalR.HubConnectionBuilder()
    .withUrl("downloadhub")
    .build()

connection.start().catch(error => document.write(error))
const allLogs:string[] = []

function YoutubeDl() {
    const [url, setUrl] = useState("")

    const [downloadItems, setDownloadItems] = useState<DownloadItemInfo[]>([])
    useEffect(()=>{
        connection.on("getMessage", (data:DownloadItemInfo[], log:string) =>{
            setDownloadItems(data)
            const logs = log.split("\n\r\n")
            for(var i = 0; i < logs.length; i++)
            {
                const item = logs[i]
                if(item.length > 0)
                {
                    allLogs.push(item)
                }
            }
            while(allLogs.length > 100){
                allLogs.shift()
            }

        })
    }, [])


    function send()
    {
        connection.send("download", url)
            .then(()=> setUrl(""))
    }
    function messageEnter(e:React.KeyboardEvent<HTMLInputElement>){
        if(e.key === "Enter")
            send();
    }

    return (
        <>
           <div className={"row"}>
               <div className="col-8">
                   <div className="input-group">
                       <span className="input-group-text">Url:</span>
                       <input type="url" className="form-control"
                              value={url}
                              onKeyUp={(e) => messageEnter(e)}
                              onChange={(e) =>  setUrl(e.target.value)}/>
                   </div>
               </div>
               <div className="col">
                   <button className="btn btn-outline-primary" onClick={send}>download</button>
               </div>
           </div>
            <div className="row">
                <p>{url}</p>
            </div>
            <div className="row">
                <DownloadItemsProgress items={downloadItems}/>
            </div>
            <div >{allLogs.map(item =>{
                return <p key={generateUniqueID()}>{item}</p>
            })}</div>
        </>
    );

}



export default YoutubeDl