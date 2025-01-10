import React from "react";
export interface FooterIconData {
    path: string,
    iconPath: string,
}

export const FooterIconLink: React.FC<FooterIconData> = ({path, iconPath}) => {
    return (
        <li>
            <a href={path} target={`_blank`}>
                <img src={iconPath} alt={`${iconPath} social media icons`} className={`w-8 h-8`}/>
            </a>
        </li>
    )
}
