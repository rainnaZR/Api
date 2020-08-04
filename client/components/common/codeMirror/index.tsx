import React, { ReactNode } from "react";
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "./index.scss"; // 默认主题样式-编辑模式
import "./preview.scss"; // 预览模式

interface Props {
    value?: any;
    options?: any;
    onChange?: any;
}
interface States {
    options: any;
}

class Index extends React.Component<Props, States> {
    $host: any;
    cm: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            options: {
                mode: "application/json", // 语言
                lineNumbers: true, // 显示行号
                lineWrapping: true, // 代码长文时是折叠还是滚动
                readOnly: false, // 是否只读
                indentUnit: 2, // 缩进空格
                tabSize: 2, // tab点击的空格
                smartIndent: true, // 是否自动缩进
                cursorBlinkRate: 0, // 光标闪动的间隔
                ...(props.options || {})
            }
        };
    }

    componentDidMount() {
        const cm = CodeMirror.fromTextArea(this.$host, this.state.options);
        const { value, onChange } = this.props;
        if (value) {
            cm.setValue(value);
        }
        if (onChange) {
            cm.on("change", () => {
                onChange && onChange(cm.getValue());
            });
        }
        this.cm = cm;
    }

    render(): ReactNode {
        return (
            <textarea
                ref={$host => {
                    this.$host = $host;
                }}
            />
        );
    }
}

export default Index;
