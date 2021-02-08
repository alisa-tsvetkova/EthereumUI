import React, { useState } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { withRouter } from 'react-router';
import Helper from "../../utilities/helper";
import { useHistory } from "react-router-dom";

function SearchBar() {
    const [blockId, setBlockId] = useState('');
    const [isValid, setValidated] = useState(true);
    const history = useHistory();

    function checkBlockId(newBlockId) {
        const isValid = Helper.validateBlockId(newBlockId);

        setValidated(isValid);
        if (isValid) {
            setBlockId(newBlockId);
        }
    }

    function doSearch() {
        history.push(`/block/${blockId}`);
    }

    function handleChange(event) {
        checkBlockId(event.target.value);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            checkBlockId(event.target.value);
            doSearch();
        }
    }

    return <div>
        <InputGroup className="mb-3">
            <FormControl
                inputMode="numeric"
                placeholder="Block ID"
                aria-label="Block ID"
                value={blockId}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <InputGroup.Append>
                {
                    //disable search button if no information entered
                    Helper.isEmptyBlockId(blockId) ?
                        <Button variant="btn secondary" onClick={doSearch} disabled>
                            <i className="fa fa-search"></i></Button>
                        : <Button variant="btn btn-soft-info" onClick={doSearch}>
                            <i className="fa fa-search"></i></Button>
                }
            </InputGroup.Append>
            {!isValid &&
                <div className="invalid-feedback text-center visible">
                    Only numbers are suitable
                </div>
            }
        </InputGroup>
    </div>;
}

export default withRouter(SearchBar);