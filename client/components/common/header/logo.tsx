import React from "react";
const LogoUrl =
    "https://lt3d.oss-cn-hangzhou.aliyuncs.com/Fashion/Company/081f1cd1-1d2d-3d30-8c62-f5c4f1356f08/files/20191225170259_7566_logo_20191203170419/logo_20191203170419.png";

export default function() {
    return (
        <div>
            <a href="/project">
                <img alt="LincTex" height="50" src={LogoUrl} />
            </a>
        </div>
    );
}
