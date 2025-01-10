import React from "react";
import {Logo} from "../images/logo.tsx";
import {HomeLink} from "./homeLink.tsx";
import {homeStyle} from "./homeStyle.tsx";

export const HomeNavigation: React.FC = () => {
    return (
        <div className={homeStyle.nav}>
            <Logo/>
            <HomeLink/>
        </div>
    )
}
