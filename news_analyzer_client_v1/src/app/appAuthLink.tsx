import React from "react";
import {NavLink} from "react-router-dom";
import {appStyle} from "./appStyle.tsx";

export interface AuthLinkData {
    name: string;
    path: string;
}

export const AppAuthLink: React.FC<AuthLinkData> = ({name, path}) =>{
    return (
        <NavLink
            key={path}
            to={path}
            className={appStyle.authLink}>
            {name}
        </NavLink>
    )
}
