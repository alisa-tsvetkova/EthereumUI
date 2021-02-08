import React from "react";
import SearchBar from "./searchBar";

function Header() {
    return <header className="header container-fluid col-12 col-md-10 mx-auto mt-2 mb-2" >
        <SearchBar {...Header}></SearchBar>
    </header>;
}

export default Header;