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
            }
        ];

        return (
            <div className="m-detail">
                <div className="f-tar f-mb10">
                    <Button
                        type="primary"
                        onClick={() => onEditInterface(interfaceForm.id)}
                    >
                        编辑<i className="el-icon-edit f-ml5 f-fs12"></i>
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => onDeleteInterface(interfaceForm.id)}
                    >
                        删除<i className="el-icon-delete f-ml5 f-fs12"></i>
                    </Button>
                </div>
                {/* 基础信息 */}
                <div className="m-box">
                    {dataList.map((data, index) => {
                        return (
                            <div className="f-flexr" key={index}>
                                <div className="label">{data.label}：</div>
                                <div className="content">{data.value}</div>
                            </div>
                        );
                    })}
                </div>
                {/* 请求参数 */}
                <div className="m-box">
                    <div className="f-flexr">
                        <div className="label">请求参数：</div>
                        <div className="content">
                            {interfaceForm.requestParams}
                        </div>
                    </div>
                </div>
                {/* 响应内容 */}
                <div className="m-box">
                    <div className="f-flexr">
                        <div className="label">响应内容：</div>
                        <div className="content">
                            {interfaceForm.requestResponse}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Index);
