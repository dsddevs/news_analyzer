import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import React, {Dispatch, useEffect, useMemo} from "react";
import {homeRoute, RouteData, userRoute} from "./routeData.tsx";
import {HomeNavigation} from "../home/homeNavigation.tsx";
import {FooterPage} from "../footer/footerPage.tsx";
import {useDispatch} from "react-redux";
import {restoreLoginSession} from "../login/loginSlice.tsx"
import {AppDispatch} from "../store.tsx";
import {RouteClient} from "./routeClient.tsx";
import {UserNavigation} from "../user/userNavigation.tsx";
import {restoreOtpSession} from "../otp/otpSlice.tsx";
import {restoreRecoverySession} from "../recovery/recoverySlice.tsx";
import {accessManager} from "../access/accessManager.tsx";

export const Routers: React.FC = () => {
    const dispatch: Dispatch<AppDispatch> = useDispatch<AppDispatch>();
    const accessJwt: boolean = accessManager();
    console.log("Routers: " + accessJwt);

    const homeRouteMap: Element[] = useMemo(() =>
        homeRoute.map((route: RouteData, index: number) =>
            <Route key={`${route.path}-${index}`} path={route.path} element={route.element}/>
        ), []
    );

    const userRouteMap: Element[] = useMemo(() =>
        userRoute.map((route: RouteData, index: number) =>
            <Route key={`${route.path}-${index}`} path={route.path} element={route.element}/>
        ), []
    );

    const homeNotFoundPage: Element = useMemo(() =>
        <Route path="*" element={<Navigate to={RouteClient.HOME} replace/>}/>, []
    );

    const userNotFoundPage: Element = useMemo(() =>
        <Route path="*" element={<Navigate to={RouteClient.NEWS_ANALYZER} replace/>}/>, []
    );

    useEffect(() => {
        dispatch(restoreLoginSession());
        dispatch(restoreOtpSession());
        dispatch(restoreRecoverySession());
    }, [dispatch]);

    return (
        <BrowserRouter>
            {accessJwt ? <UserNavigation/> : <HomeNavigation/>}
            <Routes>
                {accessJwt ? (userRouteMap) : (homeRouteMap)}
                {accessJwt ? (userNotFoundPage) : (homeNotFoundPage)}
            </Routes>
            <FooterPage/>
        </BrowserRouter>
    )
}
