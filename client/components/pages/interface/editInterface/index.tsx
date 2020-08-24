// 新增/编辑接口
import React, { ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import autoBind from "class-autobind";
import { Button, Form, Input, Select, Message } from "element-react";
import { formatJson } from "../../../../utils/tools";
import { METHODS } from "../../../common/constants";
import CodeMirror from "../../../common/codeMirror";
import { postInterface, putInterface } from "../../../../request/interface";

type PathParamsType = any;
type Props = RouteComponentProps<PathParamsType> & {
    projectId?: string | number;
    interfaceForm?: Interface.Form | any;
    onGetTreeList: any;
    onViewInterfaceDetail: any;
    onViewModuleDetail: any;
};
interface State {
    projectId?: string | number;
    interfaceForm?: Interface.Form | any;
    interfaceFormRules?: Interface.FormRules;
}

class Index extends React.Component<Props, State> {
    $requestParamsCodeMirrorRef: any;
    $requestResponseCodeMirrorRef: any;

    constructor(props: Props) {
        super(props);
        autoBind(this);

        this.state = {
            projectId: props.projectId,
            interfaceForm: props.interfaceForm,
            interfaceFormRules: {
                name: [
                    {
                        required: true,
                        message: "请输入接口名称",
                        trigger: "blur"
                    }
                ],
                requestUrl: [
                    {
                        required: true,
                        message: "请输入接口地址",
                        trigger: "blur"
                    }
                ],
                requestMethod: [
                    {
                        required: true,
                        message: "请输入方法类型",
                        trigger: "blur"
                    }
                ]
            }
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        this.onRefreshCM(nextProps.interfaceForm);
        this.setState({
            interfaceForm: nextProps.interfaceForm
        });
    }

    /**
     * 接口数据变化
     * **/

    onInterfaceChange(key?: any, value?: any) {
        this.setState({
            interfaceForm: Object.assign(this.state.interfaceForm, {
                [key]: value
            })
        });
    }

    /**
     * 接口信息提交
     * **/

    onInterfaceSubmit(e?: any) {
        e.preventDefault();
        const formRef: any = this.refs.interfaceForm;
        formRef.validate((valid: boolean) => {
            valid && this.doInterfaceSubmit();
        });
    }

    /**
     * 接口信息提交
     * **/

    doInterfaceSubmit() {
        const projectId = this.state.projectId;
        const formData = {
            ...this.state.interfaceForm,
            requestParams: formatJson(this.state.interfaceForm.requestParams),
            requestResponse: formatJson(
                this.state.interfaceForm.requestResponse
            )
        };
        const request = formData.id ? putInterface : postInterface;
        request({
            projectId,
            ...formData
        }).then(res => {
            this.cbInterfaceSubmit(res);
        });
    }

    /**
     * 接口信息提交回调
     * **/

    cbInterfaceSubmit(res: any) {
        let { success, message, data } = res;
        if (success) {
            Message.success(message);
            this.props.onGetTreeList();
            this.props.onViewInterfaceDetail(data?.id);
        } else {
            Message.error(message);
        }
    }

    /**
     * json格式化
     * **/

    onFormatJson(key: string, e?: any) {
        e && e.preventDefault();
        try {
            let that: any = this;
            let ref: any = that[`$${key}CodeMirrorRef`];
            if (ref) {
                let beautifiedValue = formatJson(this.state.interfaceForm[key]);
                ref.cm.setValue(beautifiedValue);
            }
        } catch (error) {
            Message.error("JSON格式错误！");
            console.error(error);
        }
    }

    /**
     * 提交取消
     *  **/

    onInterfaceCancel(e?: any) {
        e.preventDefault();
        this.state.interfaceForm.id
            ? this.props.onViewInterfaceDetail(this.state.interfaceForm.id)
            : this.props.onViewModuleDetail(this.state.interfaceForm.moduleId);
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
        const { interfaceForm, interfaceFormRules } = this.state;

        return (
            <Form
                ref="interfaceForm"
                model={interfaceForm}
                rules={interfaceFormRules}
                labelWidth="120"
            >
                <Form.Item label="名称" prop="name">
                    <Input
                        value={interfaceForm.name}
                        placeholder="请输入接口名称"
                        onChange={this.onInterfaceChange.bind(this, "name")}
                    />
                </Form.Item>
                <Form.Item label="路径" prop="requestUrl">
                    <Input
                        value={interfaceForm.requestUrl}
                        placeholder="请输入接口路径"
                        onChange={this.onInterfaceChange.bind(
                            this,
                            "requestUrl"
                        )}
                    />
                </Form.Item>
                <Form.Item label="类型" prop="requestMethod">
                    <Select
                        value={interfaceForm.requestMethod}
                        placeholder="接口类型"
                        onChange={this.onInterfaceChange.bind(
                            this,
                            "requestMethod"
                        )}
                    >
                        {METHODS.map((method, index) => (
                            <Select.Option
                                key={index}
                                label={method}
                                value={method}
                            ></Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="描述" prop="introduce">
                    <Input
                        type="textarea"
                        value={interfaceForm.introduce}
                        placeholder="请输入接口描述"
                        autosize={{
                            minRows: 3,
                            maxRows: 5
                        }}
                        onChange={this.onInterfaceChange.bind(
                            this,
                            "introduce"
                        )}
                    />
                </Form.Item>
                <Form.Item label="版本号" prop="tag">
                    <Input
                        value={interfaceForm.tag}
                        placeholder="请输入接口版本号"
                        onChange={this.onInterfaceChange.bind(this, "tag")}
                    />
                </Form.Item>
                <Form.Item label="请求参数" prop="requestParams">
                    <CodeMirror
                        value={interfaceForm.requestParams}
                        onChange={(value: any) => {
                            this.onInterfaceChange("requestParams", value);
                        }}
                        ref={$codeMirrorRef => {
                            this.$requestParamsCodeMirrorRef = $codeMirrorRef;
                        }}
                    />
                    <Button
                        className="f-mt10"
                        onClick={e => this.onFormatJson("requestParams", e)}
                    >
                        格式化
                    </Button>
                </Form.Item>
                <Form.Item label="响应内容" prop="requestResponse">
                    <CodeMirror
                        value={interfaceForm.requestResponse}
                        onChange={(value: any) => {
                            this.onInterfaceChange("requestResponse", value);
                        }}
                        ref={$codeMirrorRef => {
                            this.$requestResponseCodeMirrorRef = $codeMirrorRef;
                        }}
                    />
                    <Button
                        className="f-mt10"
                        onClick={e => this.onFormatJson("requestResponse", e)}
                    >
                        格式化
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={this.onInterfaceSubmit}>
                        提 交
                    </Button>
                    <Button type="warning" onClick={this.onInterfaceCancel}>
                        取 消
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default withRouter(Index);
