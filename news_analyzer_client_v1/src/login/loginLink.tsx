import React from "react";
import {NavLink} from "react-router-dom";
import {RouteClient} from "../routers/routeClient.tsx";
import {loginStyle} from "./loginStyle.tsx";

export const LoginLink: React.FC = () => {
    const active: string = `${loginStyle.active}`;
    const inactive: string = `${loginStyle.inactive}`;
    return (
        <nav className={loginStyle.nav}>
            <NavLink
                key={RouteClient.LOGIN}
                to={RouteClient.LOGIN}
                className={(props: { isActive: boolean }) => props.isActive ? active : inactive}>
                Login
            </NavLink>
        </nav>
    )
}
