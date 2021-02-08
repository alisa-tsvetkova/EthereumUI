import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import TranTable from "./blockTranTable";

function BlockInfo(props) {
    return <div className="container-fluid col-12 col-md-10 mx-auto mt-2 mb-2">
        <Card>
            <Card.Body className="p-1 p-md-2 card-info">
                <div className="container-fluid">
                    <div className="font-weight-bold mb-1">
                        Hash:</div>
                    <div className="small block-info">
                        {props.blockData.result.hash}
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="font-weight-bold mb-1">
                        Transactions:</div>
                    <div className="small">
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0" className="container-fluid">
                                    Count:
                                    <span className="font-weight-bold">
                                        {props.blockData.result.transactions.length}
                                    </span>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <TranTable blockData={props.blockData} />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                </div>
            </Card.Body>
        </Card>
    </div>;
}

export default BlockInfo;