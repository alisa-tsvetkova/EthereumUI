import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Helper from "../../utilities/helper";

function Block() {
    let { blockId } = useParams();
    const [isValid,
        setValidated] = useState(true);
    const [errorMessage,
        setErrorMessage] = useState('');
    const [blockData,
        setData] = useState(null);
    const [isLoading,
        setLoading] = useState(false);

    useEffect(() => {
        const isValid = Helper.validateBlockId(blockId);
        console.log(isValid);
        setValidated(isValid);

        if (isValid) { // eslint-disable-next-line no-undef
            const url = `${process.env.REACT_APP_API_URL}/api/block/${(Helper.isEmptyBlockId(blockId)
                ? 'latest'
                : blockId)}`;
            setLoading(true);
            axios
                .get(url)
                .then(result => {
                    if (result.data) {
                        console.log(result.data);
                        setData(result.data);
                    } else {
                        setErrorMessage(`Your block number ID '${blockId}' has invalid or empty data.`);
                        setValidated(false);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    setErrorMessage(error);
                    setValidated(false);
                    setLoading(false);
                });
        } else
            setErrorMessage(`Your block number ID '${blockId}' is not valid and could not be loaded.<br />Only numbers are suitable.`);
    }
        , [blockId]);

    return <div className="add-margin">
        <h3 className="text-center">
            {isValid && <div>
                <a
                    className="btn btn-xs btn-icon btn-soft-info mr-1"
                    href={`/block/${blockId - 1}`}>
                    <i className="fa fa-chevron-left btn-icon__inner"></i>
                </a>
                <span className="mr-1">Block ID
                    <span className="text-secondary">#{(Helper.isEmptyBlockId(blockId)
                        ? 'latest'
                        : blockId)}</span>
                </span>
                {blockId !== "latest" && <a
                    className="btn btn-xs btn-icon btn-soft-info mr-1"
                    href={`/block/${Number(blockId) + 1}`}>
                    <i className="fa fa-chevron-right btn-icon__inner"></i>
                </a>}
            </div>}
            {!isValid && <div className="text-danger">
                {errorMessage}
            </div>}
        </h3>
        {isLoading
            ? <div className="loader">
                <Spinner className="spinner text-primary" animation="border" role="status" />
            </div>
            : (blockData !== null &&
                <div className="container-fluid w-75 mx-auto mt-2 mb-2">
                    <Card>
                        <Card.Body>
                            <div className="container-fluid">
                                <div className="font-weight-bold mb-1">
                                    Hash:</div>
                                <div className="small">
                                    {blockData.result.hash}
                                </div>
                            </div>
                            <div className="container-fluid">
                                <div className="font-weight-bold mb-1">
                                    Transactions:</div>
                                <div className="small">
                                    <Accordion defaultActiveKey="0">
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="0" className="container-fluid">
                                                Count: <span className="font-weight-bold">{blockData.result.transactions.length}</span>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>

                                                    <Table striped bordered hover size="sm" className="tranTable">
                                                        <thead>
                                                            <tr>
                                                                <th>Txn Hash</th>
                                                                <th>From</th>
                                                                <th>To</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                blockData.result.transactions.map((transaction, index) =>
                                                                    <tr key={`tran${index}`}>
                                                                        <td>{transaction.hash}</td>
                                                                        <td>{transaction.from}</td>
                                                                        <td>{transaction.to}</td>
                                                                    </tr>
                                                                )
                                                            }
                                                        </tbody>
                                                    </Table>

                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>)
        }

    </div >;
}

export default Block;