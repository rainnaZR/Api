import React from "react";
import Logo from "./logo";
import "./index.scss";

const Page = () => {
    return (
        <div className="m-header f-flexr">
            <Logo />
            <p className="f-flex-f1">API接口管理平台</p>
            <div>Developer</div>
        </div>
    );
};

export default Page;
