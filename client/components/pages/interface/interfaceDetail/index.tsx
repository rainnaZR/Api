// 接口详情页
import React, { ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import autoBind from "class-autobind";
import { Button } from "element-react";
import CodeMirror from "../../../common/codeMirror";
import "./index.scss";

type PathParamsType = any;
type Props = RouteComponentProps<PathParamsType> & {
    interfaceForm?: Interface.Form | any;
    onEditInterface: any;
    onDeleteInterface: any;
};
interface State {}

class Index extends React.Component<Props, State> {
    $requestParamsCodeMirrorRef: any;
    $requestResponseCodeMirrorRef: any;

    constructor(props: Props) {
        super(props);
        autoBind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        this.onRefreshCM(nextProps.interfaceForm);
        this.setState({
            interfaceForm: nextProps.interfaceForm
        });
    }

    /**
     * 更新code mirror内容
     * **/
    onRefreshCM(options: any) {
        const { requestParams, requestResponse } = options;
        requestParams &&
            this.$requestParamsCodeMirrorRef.cm.setValue(requestParams);
        requestResponse &&
            this.$requestResponseCodeMirrorRef.cm.setValue(requestResponse);
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
                value: interfaceForm.name
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
        const codeMirrorOptions = {
            readOnly: "nocursor",
            lineNumbers: false,
            theme: "preview"
        };

        return (
            <div className="m-detail">
                <div className="m-topbar f-tar f-mb10">
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
                <div className="m-list">
                    {/* 基础信息 */}
                    {dataList.map((data, index) => {
                        return (
                            <div className="f-flexr f-mb15" key={index}>
                                <div className="label">{data.label}：</div>
                                <div className="content">
                                    {data.value || "--"}
                                </div>
                            </div>
                        );
                    })}
                    {/* 请求参数 */}
                    <div className="f-flexr f-flex-as f-mb15">
                        <div className="label">请求参数：</div>
                        <div className="content f-flex-f1">
                            <CodeMirror
                                value={interfaceForm.requestParams}
                                options={codeMirrorOptions}
                                ref={$codeMirrorRef => {
                                    this.$requestParamsCodeMirrorRef = $codeMirrorRef;
                                }}
                            />
                        </div>
                    </div>
                    {/* 响应内容 */}
                    <div className="f-flexr f-flex-as f-mb15">
                        <div className="label">响应内容：</div>
                        <div className="content f-flex-f1">
                            <CodeMirror
                                value={interfaceForm.requestResponse}
                                options={codeMirrorOptions}
                                ref={$codeMirrorRef => {
                                    this.$requestResponseCodeMirrorRef = $codeMirrorRef;
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Index);
