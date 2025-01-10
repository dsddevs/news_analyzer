import React from "react";
import {FooterHeader} from "./footerHeader.tsx";
import {FooterContactMode} from "./footerContactMode.tsx";
import {Images} from "../images/images.tsx";
import {FooterIconLink} from "./footerIconLink.tsx";
import {footerStyle} from "./footerStyle.tsx";

export const FooterPage: React.FC = () => {
    return (
        <footer className={footerStyle.page}>

            <div className={footerStyle.contactDiv}>
                <FooterHeader name={`CONTACT ME WITH`} order={`flex space-x-4`}>
                    <FooterIconLink path={FooterContactMode.TELEGRAM} iconPath={Images.telegram}/>
                    <FooterIconLink path={FooterContactMode.GMAIL} iconPath={Images.google}/>
                    <FooterIconLink path={FooterContactMode.LINKEDIN} iconPath={Images.linkedin}/>
                    <FooterIconLink path={FooterContactMode.YOUTUBE} iconPath={Images.youtube}/>
                </FooterHeader>
            </div>

            <hr className={footerStyle.separator}/>

            <div className={footerStyle.copyrightDiv}>
                <p className={footerStyle.copyright}>
                    Copyright © 2024 DSD. All rights reserved.
                </p>
            </div>

        </footer>
    )
}
