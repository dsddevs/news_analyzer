import React from "react";
import logo from "../assets/logo.svg"

export const Logo: React.FC = () => {
    return (
        <div id={`logo`}>
            <img id={`logo-img`}
                 src={logo}
                 alt="News Analyzer Logo"
                 height={150}
                 width={150}
            />
        </div>
    )
}
