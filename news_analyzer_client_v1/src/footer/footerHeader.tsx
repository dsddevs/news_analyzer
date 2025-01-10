import React from "react";
import {FooterTopicData,} from "./footerData.tsx";
import {footerStyle} from "./footerStyle.tsx";

export interface FooterTopicData {
    name: string,
    order: string,
    children: React.ReactNode
}

export const FooterHeader: React.FC<FooterTopicData> = ({name, order, children,}) => {
    return (
        <div className="space-y-4">
            <h6 className={footerStyle.topic}>{name}</h6>
            <ul className={order}>
                {children}
            </ul>
        </div>
    )
}


