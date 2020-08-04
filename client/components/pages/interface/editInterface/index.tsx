// 新增/编辑接口
import React, { ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import autoBind from "class-autobind";
import { Button, Form, Input, Select, Message } from "element-react";
import JSON5 from "json5";
import { METHODS } from "../../../common/constant";
import CodeMirror from "../../../common/codeMirror";
import { postInterface, putInterface } from "../../../../request/interface";

type PathParamsType = any;
type Props = RouteComponentProps<PathParamsType> & {
    projectId?: string | number;
    interfaceForm?: Interface.Form | any;
    onGetTreeList: any;
};
interface State {
    projectId?: string | number;
    interfaceForm?: Interface.Form | any;
    interfaceFormRules?: Interface.FormRules;
    requestParams?: any;
    requestResponse?: any;
}

class Index extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        autoBind(this);

        this.state = {
            projectId: props.projectId,
            interfaceForm: props.interfaceForm,
            interfaceFormRules: {
                label: [
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
            },
            requestParams: props.interfaceForm.requestParams,
            requestResponse: props.interfaceForm.requestResponse
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            interfaceForm: nextProps.interfaceForm
        });
    }

    // 接口数据变化
    onInterfaceChange(key?: any, value?: any) {
        this.setState({
            interfaceForm: Object.assign(this.state.interfaceForm, {
                [key]: value
            })
        });
    }

    // 接口信息提交
    onInterfaceSubmit(e?: any) {
        e.preventDefault();
        const formRef: any = this.refs.interfaceForm;
        formRef.validate((valid: boolean) => {
            valid && this.doInterfaceSubmit();
        });
    }

    // 接口信息提交
    doInterfaceSubmit() {
        const projectId = this.state.projectId;
        const formData = {
            ...this.state.interfaceForm,
            requestParams: this.state.requestParams,
            requestResponse: this.state.requestResponse
        };
        const request = formData.id ? putInterface : postInterface;
        request({
            projectId,
            ...formData
        }).then(res => {
            this.cbInterfaceSubmit(res);
        });
    }

    // 接口信息提交回调
    cbInterfaceSubmit(res: any) {
        let { success, message } = res;
        if (success) {
            Message.success(message);
            this.props.onGetTreeList();
            this.setState({
                interfaceForm: {
                    id: "",
                    moduleId: "",
                    label: "",
                    requestUrl: "",
                    requestMethod: "",
                    requestParams: "{}",
                    requestResponse: "{}"
                }
            });
        } else {
            Message.error(message);
        }
    }

    // json格式化
    onFormatJson(key: string, e?: any) {
        e.preventDefault();
        try {
            let state: any = this.state;
            let value = JSON5.parse(state[key]);
            let beautifiedValue = JSON.stringify(value, null, 2);
            this.setState({
                interfaceForm: {
                    ...this.state.interfaceForm,
                    [key]: beautifiedValue
                },
                [key]: beautifiedValue
            });
        } catch (error) {
            Message.error("JSON格式错误！");
            console.error(error);
        }
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
                <Form.Item label="接口名称" prop="label">
                    <Input
                        value={interfaceForm.label}
                        placeholder="请输入接口名称"
                        onChange={this.onInterfaceChange.bind(this, "label")}
                    />
                </Form.Item>
                <Form.Item label="接口路径" prop="requestUrl">
                    <Input
                        value={interfaceForm.requestUrl}
                        placeholder="请输入接口路径"
                        onChange={this.onInterfaceChange.bind(
                            this,
                            "requestUrl"
                        )}
                    />
                </Form.Item>
                <Form.Item label="接口类型" prop="requestMethod">
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
                <Form.Item label="接口描述" prop="introduce">
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
                <Form.Item label="接口版本号" prop="tag">
                    <Input
                        value={interfaceForm.tag}
                        placeholder="请输入接口版本号"
                        onChange={this.onInterfaceChange.bind(this, "tag")}
                    />
                </Form.Item>
                <Form.Item label="传入参数" prop="requestParams">
                    <CodeMirror
                        value={interfaceForm.requestParams}
                        onChange={(value: any) => {
                            this.setState({
                                requestParams: value
                            });
                        }}
                    />
                    <Button
                        className="f-mt15"
                        onClick={e => this.onFormatJson("requestParams", e)}
                    >
                        格式化
                    </Button>
                </Form.Item>
                <Form.Item label="返回值" prop="requestResponse">
                    <CodeMirror
                        value={interfaceForm.requestResponse}
                        onChange={(value: any) => {
                            this.setState({
                                requestResponse: value
                            });
                        }}
                    />
                    <Button
                        className="f-mt15"
                        onClick={e => this.onFormatJson("requestResponse", e)}
                    >
                        格式化
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={this.onInterfaceSubmit}>
                        确 定
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default withRouter(Index);
