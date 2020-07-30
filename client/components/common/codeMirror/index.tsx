import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/duotone-light.css"; //  https://codemirror.net/theme/
import "codemirror/theme/material.css";
import "./index.scss";
import "codemirror/mode/javascript/javascript";
import { UnControlled as CodeMirror } from "react-codemirror2";

interface Props {
    value?: any;
    options?: any;
    onChange?: any;
}

const Page = (props: Props) => {
    let options = {
        mode: "application/json", // 语言
        theme: "material", // 编辑器主题
        lineNumbers: false, // 显示行号
        lineWrapping: true, // 代码长文时是折叠还是滚动
        readOnly: false, // 是否只读
        indentUnit: 2, // 缩进空格
        smartIndent: true, // 是否自动缩进
        ...(props.options || {})
    };
    let jsonValue = props.value
        ? JSON.stringify(JSON.parse(props.value), null, options.indentUnit)
        : "";

    return (
        <CodeMirror
            value={jsonValue}
            options={options}
            onChange={(editor, data, value) => {
                props.onChange(value);
            }}
        />
    );
};

export default Page;
