import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Helper from "../../utilities/helper";
import BlockInfo from "./blockInfo";

function Block() {
    let { blockId } = useParams();
    const [blockRealId, setBlockRealId] = useState(null);
    const [blockData, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isValid, setValidated] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const isValid = Helper.validateBlockId(blockId);
        setValidated(isValid);

        if (isValid) { // eslint-disable-next-line no-undef
            const url = `${process.env.REACT_APP_API_URL}/api/block/${(Helper.isEmptyBlockId(blockId)
                ? 'latest'
                : blockId)}`;
            setLoading(true);
            axios
                .get(url)
                .then(result => {
                    let success = false;
                    let errorDetails;
                    if (result != null) {
                        if (result.data) {
                            if (result.data.error)
                                errorDetails = result.data.error.message;
                            else {
                                if (result.data.result == null) {
                                    errorDetails = 'No actual information found.';
                                }
                                else {
                                    success = true;
                                    setData(result.data);
                                    setBlockRealId(parseInt(Number(result.data.result.number), 10));
                                    setLoading(false);
                                }
                            }
                        }
                    }
                    if (!success) {
                        throw new Error(`Your block number ID '${blockId}' has invalid or empty data. ${(errorDetails != undefined ? errorDetails : '')}`);
                    }
                })
                .catch(error => {
                    setErrorMessage(`Some error occured. ${error}`);
                    setValidated(false);
                    setLoading(false);
                });
        } else
            setErrorMessage(`Some error occured. Your block number ID '${blockId}' is not valid and could not be loaded. Only numbers are suitable.`);
    }, [blockId]);

    return <div className="add-margin">
        <h1 className="text-center"><small>
            {isValid &&
                <div>
                    {(blockId >= 0 || blockRealId >= 0) && <a className="btn btn-xs btn-icon btn-soft-info mr-1"
                        href={`/block/${(blockRealId >= 0 ? blockRealId : Number(blockId)) - 1}`}>
                        <i className="fa fa-caret-left btn-icon__inner"></i>
                    </a>}
                    <span className="mr-1">Block ID
                        <span className="text-secondary"> #{blockRealId >= 0 ? blockRealId : blockId}</span>
                    </span>
                    {!(blockId === undefined) && <a className="btn btn-xs btn-icon btn-soft-info mr-1"
                        href={`/block/${(blockRealId >= 0 ? blockRealId : Number(blockId)) + 1}`}>
                        <i className="fa fa-caret-right btn-icon__inner"></i>
                    </a>}
                </div>
            }
            {!isValid && <div className="text-danger">
                <small>
                    {errorMessage}
                </small>
            </div>}</small>
        </h1>
        {isLoading
            ? <div className="loader">
                <Spinner className="spinner text-primary" animation="border" role="status" />
            </div>
            : (blockData !== null &&
                <BlockInfo blockData={blockData}></BlockInfo>)
        }

    </div >;
}

export default Block;