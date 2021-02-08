import React from "react";
import Table from "react-bootstrap/Table";

function BlockTranTable(props) {
    return props.blockData.result.transactions.length > 0 ? <Table striped bordered hover size="sm" className="tranTable">
        <thead>
            <tr>
                <th>Txn Hash</th>
                <th>From</th>
                <th>To</th>
            </tr>
        </thead>
        <tbody>
            {
                // eslint-disable-next-line react/prop-types
                props.blockData.result.transactions.map((transaction, index) =>
                    <tr key={`tran${index}`}>
                        <td>{transaction.hash}</td>
                        <td>{transaction.from}</td>
                        <td>{transaction.to}</td>
                    </tr>
                )
            }
        </tbody>
    </Table> : <div className="text-center">No transactions found</div>;
}

export default BlockTranTable;