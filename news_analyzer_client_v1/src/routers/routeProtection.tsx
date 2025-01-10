import {Navigate} from "react-router-dom";
import React from "react";
import {RouteClient} from "./routeClient.tsx";
import {accessManager} from "../access/accessManager.tsx";

interface ProtectedRouteData {
    children: React.ReactNode;
}

export const RouteProtection: React.FC<ProtectedRouteData> = ({children}) => {
    const accessJwt: boolean = accessManager();
    console.log("Route Protection: " + accessJwt);
    return accessJwt ? <>{children}</> : <Navigate to={RouteClient.HOME} replace/>;
};
