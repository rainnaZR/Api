// 接口详情页
import React, { ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import autoBind from "class-autobind";
import { Button } from "element-react";

type PathParamsType = any;
type Props = RouteComponentProps<PathParamsType> & {
    interfaceForm?: Interface.Form | any;
    onEditInterface: any;
    onDeleteInterface: any;
};
interface State {}

class Index extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        autoBind(this);
    }

    render(): ReactNode {
        const {
            interfaceForm,
            onEditInterface,
            onDeleteInterface
        } = this.props;
        const dataList = [
            {
                label: "接口名称",
                value: interfaceForm.label
            },
            {
                label: "接口路径",
                value: interfaceForm.requestUrl
            },
            {
                label: "接口类型",
                value: interfaceForm.requestMethod
            },
            {
                label: "请求参数",
                value: interfaceForm.requestParams
            },
            {
                label: "响应内容",
                value: interfaceForm.requestResponse
            }
        ];

        return (
            <div className="m-detail">
                <div className="topbar">
                    <Button
                        type="primary"
                        onClick={() => onEditInterface(interfaceForm.id)}
                    >
                        编辑
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => onDeleteInterface(interfaceForm.id)}
                    >
                        删除
                    </Button>
                </div>
                <div className="list">
                    {dataList.map(data => {
                        return (
                            <div className="item">
                                <div className="label">{data.label}：</div>
                                <div className="content">{data.value}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default withRouter(Index);
