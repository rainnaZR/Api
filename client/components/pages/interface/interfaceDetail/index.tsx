// 接口详情页
import React, { ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import autoBind from "class-autobind";
import { Button } from "element-react";
import "./index.scss";

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
                label: "名称",
                value: interfaceForm.label
            },
            {
                label: "路径",
                value: interfaceForm.requestUrl
            },
            {
                label: "类型",
                value: interfaceForm.requestMethod
            },
            {
                label: "描述",
                value: interfaceForm.introduce
            },
            {
                label: "版本号",
                value: interfaceForm.tag
            },
            {
                label: "创建时间",
                value: interfaceForm.createTime
            },
            {
                label: "更新时间",
                value: interfaceForm.updateTime
            }
        ];

        return (
            <div className="m-detail">
                <div className="topbar f-tar f-mb10">
                    <Button
                        type="primary"
                        onClick={() => onEditInterface(interfaceForm.id)}
                    >
                        <i className="el-icon-edit f-ml5 f-fs12"></i>
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => onDeleteInterface(interfaceForm.id)}
                    >
                        <i className="el-icon-delete f-ml5 f-fs12"></i>
                    </Button>
                </div>
                <div className="list">
                    {/* 基础信息 */}
                    {dataList.map((data, index) => {
                        return (
                            <div className="f-flexr f-mb15" key={index}>
                                <div className="label">{data.label}：</div>
                                <div className="content">
                                    {data.value || "暂无"}
                                </div>
                            </div>
                        );
                    })}
                    {/* 请求参数 */}
                    <div className="f-flexr">
                        <div className="s-fc1">请求参数：</div>
                        <div className="s-fc2">
                            {interfaceForm.requestParams}
                        </div>
                    </div>
                    {/* 响应内容 */}
                    <div className="f-flexr">
                        <div className="s-fc1">响应内容：</div>
                        <div className="s-fc2">
                            {interfaceForm.requestResponse}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Index);
