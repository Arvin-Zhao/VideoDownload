import React, {useState} from "react"
import * as signalR from "@microsoft/signalr"
import DownloadItemsProgress from "./downloaditemsprogress"


export interface DownloadItemInfo{
    id:number;
    percent:number;
    name:string;
}

function YoutubeDl() {
    const [url, setUrl] = useState("")
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("downloadhub")
        .build()
    const [downloadItems, setDownloadItems] = useState<DownloadItemInfo[]>([])
    connection.on("getMessage", (data:DownloadItemInfo[]) =>{
        setDownloadItems(data)
    })

    connection.start().catch(error => document.write(error))

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
        </>
    );

}



export default YoutubeDl