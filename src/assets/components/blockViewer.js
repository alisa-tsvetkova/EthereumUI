import React, { useState, useEffect } from "react";
import {
    useParams
} from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Helper from "../../utilities/helper";

function Block() {
    let { blockId } = useParams();
    const [isValid, setValidated] = useState(true);
    const [blockData, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const isValid = Helper.validateBlockId(blockId);
        console.log(isValid);
        setValidated(isValid);

        if (isValid) { // eslint-disable-next-line no-undef 
            const url = process.env.REACT_APP_API_URL + "/api/block/" + (Helper.isEmptyBlockId(blockId) ? 'latest' : blockId);
            setLoading(true);
            axios.get(url)
                .then(result => {
                    if (result.data) {
                        console.log(result.data);
                        setData(result.data);

                    }
                    else {
                        const error = "Invalid or empty data";
                        console.log(error);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
        }
    }, [blockId]);

    return <div>

        <h3 className="text-center">
            {isValid && <div>
                <a className="btn btn-xs btn-icon btn-soft-info mr-1" href={`/block/${blockId - 1}`}><i className="fa fa-chevron-left btn-icon__inner"></i></a>
                <span className="mr-1">Requested ID: {blockId ? blockId : (blockData !== null ? blockData.id : "latest")}</span>
                {blockId !== "latest" && <a className="btn btn-xs btn-icon btn-soft-info mr-1" href={`/block/${Number(blockId) + 1}`}><i className="fa fa-chevron-right btn-icon__inner"></i></a>}
            </div>}
            {!isValid && <div className="text-danger">
                Your block number ID `{blockId}` is not valid and could not be loaded.<br />
                Only numbers are suitable.
            </div>}
        </h3>
        {isLoading ? <div className="loader">
            <Spinner className="spinner text-primary" animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div> : (
                blockData !== null &&
                <div>
                    <div>Hash: {blockData.result.hash}</div>
                    <div>Transactions: {JSON.stringify(blockData.result.transactions)}</div>
                </div>
            )
        }

    </div>;
}

export default Block;