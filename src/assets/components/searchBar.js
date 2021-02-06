import React, { useState } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { withRouter } from 'react-router';

function SearchBar(props) {
    const [blockId, setBlockId] = useState('');
    const [isValid, setValidated] = useState(true);

    function doSearch() {
        // eslint-disable-next-line react/prop-types
        props.history.push(`/block/${blockId}`);
    }

    function handleChange(event) {
        const newBlockId = event.target.value;
        if (newBlockId === '' || /^[0-9]*$/.test(newBlockId)) {
            setValidated(true);
            setBlockId(newBlockId);
        }
        else
            setValidated(false);
    }

    return <div><InputGroup className="mb-3">
        <FormControl
            inputMode="numeric"
            placeholder="Block ID"
            aria-label="Block ID"
            value={blockId}
            onChange={handleChange}
        />
        <InputGroup.Append>
            <Button variant="btn btn-soft-info" onClick={doSearch}><i className="fa fa-search"></i></Button>
        </InputGroup.Append>
        {!isValid && <div className="invalid-feedback text-center visible">
            Only numbers are suitable
        </div>}

    </InputGroup>

    </div>;
}

export default withRouter(SearchBar);