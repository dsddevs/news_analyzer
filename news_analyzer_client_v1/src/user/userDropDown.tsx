import React, {Dispatch, useState} from "react";
import {logout} from "../login/loginSlice.tsx";
import {RouteClient} from "../routers/routeClient.tsx";
import {dropDownStyle} from "../app/appStyle.tsx";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {AppDispatch} from "../store.tsx";
import {useDispatch} from "react-redux";
import {nameManager} from "../access/nameManager.tsx";

export const UserDropDown: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch: Dispatch<AppDispatch> = useDispatch<AppDispatch>();
    const navigate: NavigateFunction = useNavigate();

    const pushLogout = () => {
        dispatch(logout());
        setIsDropdownOpen(false);
        navigate(RouteClient.HOME, {replace: true});
        window.location.reload();
    }

    const fullName: string = nameManager();

    return (
        <div className="relative">
            <button className={dropDownStyle.button}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <span className={`font-black text-xl`}>{fullName}</span>
                <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
            </button>

            {isDropdownOpen && (
                <div className={dropDownStyle.logOutDiv}>
                    <button className={dropDownStyle.logOutBtn}
                            onClick={pushLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};
