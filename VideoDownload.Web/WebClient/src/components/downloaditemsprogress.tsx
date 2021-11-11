import React from "react";
import {DownloadItemInfo} from "./youtubedl";

function DownloadItemsProgress(props:{items:DownloadItemInfo[]}){
    const items = props.items
    return (
        <ul>
            { items.map((value, index) => {
                return <li key={value.id}>{value.name} {value.percent}</li>
            })}
        </ul>
    )
}

export default DownloadItemsProgress;