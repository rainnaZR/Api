import React from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "./index.scss"; // 默认主题样式-编辑模式
import "./preview.scss"; // 预览模式
import { UnControlled as CodeMirror } from "react-codemirror2";

interface Props {
    value?: any;
    options?: any;
    onChange?: any;
}

const Page = (props: Props) => {
    let options = {
        mode: "application/json", // 语言
        lineNumbers: true, // 显示行号
        lineWrapping: true, // 代码长文时是折叠还是滚动
        readOnly: false, // 是否只读
        indentUnit: 2, // 缩进空格
        tabSize: 2, // tab点击的空格
        smartIndent: true, // 是否自动缩进
        cursorBlinkRate: 0, // 光标闪动的间隔
        ...(props.options || {})
    };

    return (
        <CodeMirror
            value={props.value}
            options={options}
            onChange={(editor, data, value) => {
                props.onChange && props.onChange(value);
            }}
        />
    );
};

export default Page;
