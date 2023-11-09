'use client'

import React, { useState } from "react";

export default function CollapseBox({
    children,
    title,
    subtitle,
    className,
}: {
    children: JSX.Element,
    title: JSX.Element,
    subtitle?: JSX.Element,
    className?: string,
}) {

    const [collapsed, setCollapsed] = useState<boolean>(false)

    return (
        <div className={`flex ${className} m-2 bg-cyan-900 p-2`}>
            <div className="flex-1">
                {title}
                {!collapsed&&<div>{children}</div>}
                {subtitle}
            </div>
            <button onClick={() => (setCollapsed(!collapsed))} className=" bg-blue-500 hover:bg-blue-900">
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    p-id="4042"
                    width="40"
                    height="40"
                    className={`dark:fill-white  ${collapsed ? '' : 'rotate-90'}`}>
                    <path d="M353.323071 246.407016L620.37222 510.637979l-265.320785 268.146133c-11.776208 11.775184-11.73425201 30.908964 0.091074 42.73429l0.001023 0c11.825326 11.82635 30.958082 11.867282 42.72815-2.930749L680.899758 535.559579c3.817955-4.273327 8.205892-9.321296 8.933463-12.045337 4.470825-11.112082 2.232854-24.76503301-6.710842-35.987632l-286.98213-286.98213c-11.875468-8.847505-31.096229-8.893554-42.922578 2.932796C341.393367 215.303624 341.439416 234.523361 353.323071 246.407016z"
                        p-id="4043" />
                </svg>
            </button>
        </div>
    )
}