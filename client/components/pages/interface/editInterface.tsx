// 新增/编辑接口
import React, { ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import autoBind from "class-autobind";
import { METHODS } from "../../common/constant";
import { Button, Form, Input, Select, Message } from "element-react";
import { postInterface, putInterface } from "../../../request/interface";

type PathParamsType = any;
type Props = RouteComponentProps<PathParamsType> & {
    interfaceForm?: Interface.Form | any;
    getTreeList: any;
};
interface State {
    projectId?: any;
    interfaceForm?: Interface.Form | any;
    interfaceFormRules?: Interface.FormRules;
}

class Index extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        autoBind(this);

        this.state = {
            projectId: this.props.match?.params?.projectId,
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
            }
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
        const formData = this.state.interfaceForm;
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
            this.props.getTreeList();
            this.setState({
                interfaceForm: {
                    id: "",
                    moduleId: "",
                    label: "",
                    requestUrl: "",
                    requestMethod: "",
                    requestParams: "",
                    requestResponse: ""
                }
            });
        } else {
            Message.error(message);
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
                    ></Input>
                </Form.Item>
                <Form.Item label="接口路径" prop="requestUrl">
                    <Input
                        value={interfaceForm.requestUrl}
                        placeholder="请输入接口路径"
                        onChange={this.onInterfaceChange.bind(
                            this,
                            "requestUrl"
                        )}
                    ></Input>
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
                <Form.Item label="传入参数" prop="requestParams">
                    <Input
                        type="textarea"
                        value={interfaceForm.requestParams}
                        placeholder="请输入入参"
                        autosize={{
                            minRows: 3,
                            maxRows: 4
                        }}
                        onChange={this.onInterfaceChange.bind(
                            this,
                            "requestParams"
                        )}
                    ></Input>
                </Form.Item>
                <Form.Item label="返回值" prop="requestResponse">
                    <Input
                        type="textarea"
                        value={interfaceForm.requestResponse}
                        autosize={{
                            minRows: 3,
                            maxRows: 5
                        }}
                        placeholder="请输入返回值"
                        onChange={this.onInterfaceChange.bind(
                            this,
                            "requestResponse"
                        )}
                    ></Input>
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
