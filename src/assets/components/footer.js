import React from "react";

function Footer() {
    return <footer className="footer fixed-bottom text-center small">
        <a href="https://www.linkedin.com/in/alisa-tsvetkova/">Alisa Tsvetkova</a> for <a href="https://www.opera.com">Opera</a> © {new Date().getFullYear()}
    </footer>;
}

export default Footer;