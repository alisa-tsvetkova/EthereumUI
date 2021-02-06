import React from "react";
import {
    useParams
} from "react-router-dom";

function Block() {
    let { blockId } = useParams();
    return <div>
        <h3 className="text-center">
            <a className="btn btn-xs btn-icon btn-soft-info mr-1" href={`/block/${blockId - 1}`}><i className="fa fa-chevron-left btn-icon__inner"></i></a>
            <span className="mr-1">Requested ID: {blockId ? blockId : "latest"}</span>
            {blockId !== "latest" && <a className="btn btn-xs btn-icon btn-soft-info mr-1" href={`/block/${Number(blockId) + 1}`}><i className="fa fa-chevron-right btn-icon__inner"></i></a>}
        </h3>
    </div>;
}

export default Block;