import React from "react";
import {Logo} from "../images/logo.tsx";
import {UserDropDown} from "./userDropDown.tsx";

export const UserNavigation: React.FC = () => {
    return (
        <div className={`z-50 fixed top-0 left-0 flex justify-between items-center w-full h-20 px-12 bg-indigo-700`}>
            <Logo/>
            <UserDropDown/>
        </div>
    )
}
