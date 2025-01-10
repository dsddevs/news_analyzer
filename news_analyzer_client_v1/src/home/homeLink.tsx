import React from "react";
import {NavLink} from "react-router-dom";
import {navigationRoute, RouteData} from "../routers/routeData.tsx";
import {LoginLink} from "../login/loginLink.tsx";
import {homeStyle} from "./homeStyle.tsx";

export const HomeLink: React.FC = () => {

    return (
        <nav className={homeStyle.navRoute}>
            {
                navigationRoute.map((route: RouteData) => (
                    <NavLink
                        key={route.path}
                        to={route.path}
                        className={(props: { isActive: boolean }) => props.isActive
                            ? "text-white"
                            : "text-indigo-300"
                    }
                    >
                        {route.label}
                    </NavLink>
                ))
            }
            <LoginLink/>
        </nav>
    )
}
