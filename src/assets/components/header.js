import React from "react";
import SearchBar from "./searchBar";

function Header() {
    return <header className="header container-fluid w-75 mx-auto mt-2" >
        <SearchBar {...Header}></SearchBar>
    </header>;
}

export default Header;