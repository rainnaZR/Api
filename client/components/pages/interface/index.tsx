import React, { ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import autoBind from "class-autobind";
import {
    Tree,
    Button,
    Form,
    Input,
    Message,
    Dialog,
    MessageBox,
    Select
} from "element-react";
import {
    getModuleList,
    postModule,
    getModule,
    putModule,
    deleteModule
} from "../../../request/module";
import { postInterface } from "../../../request/interface";
import NavMenu from "../../common/navMenu";
import "./index.scss";

type PathParamsType = any;
type Props = RouteComponentProps<PathParamsType> & {
    projectId?: any;
};
interface State {
    projectId?: any;
    modalShow?: any;
    modelTitle?: string;
    mainTitle?: string;
    mainPageType?: string;
    treeData?: Array<TreeInterface>;
    treeOptions?: TreeOptionsInterface;
    moduleForm?: Module.Form | any;
    moduleFormRules?: Module.FormRules;
    interfaceForm?: Interface.Form | any;
    interfaceFormRules?: Interface.FormRules;
    methods: Array<string>;
}
interface TreeInterface {
    id: number;
    label: string;
    children?: Array<TreeInterface>;
}
interface TreeOptionsInterface {
    label?: string;
    children?: string;
}

class Index extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        autoBind(this);

        this.state = {
            projectId: this.props.match?.params?.projectId,
            modalShow: false,
            modelTitle: "新增模块",
            mainTitle: "新增接口",
            mainPageType: "",
            treeData: [],
            treeOptions: {
                children: "children",
                label: "label"
            },
            moduleForm: {
                label: "",
                introduce: ""
            },
            moduleFormRules: {
                label: [
                    {
                        required: true,
                        message: "请输入模块名称",
                        trigger: "blur"
                    }
                ]
            },
            interfaceForm: {
                label: "",
                requestUrl: "",
                requestMethod: "",
                requestParams: "",
                requestResponse: ""
            },
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
            methods: [
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS",
                "HEAD",
                "PATCH"
            ]
        };

        this.getTreeList();
    }

    // 获取左侧目录列表
    getTreeList() {
        getModuleList({
            projectId: this.state.projectId
        })?.then(res => {
            this.setState({
                treeData: res?.data?.list
            });
        });
    }

    // 新增模块
    onAddModule() {
        const formRef: any = this.refs.moduleForm;
        formRef.resetFields();
        this.setState({
            modalShow: true,
            modelTitle: "新增模块",
            moduleForm: {
                label: "",
                introduce: ""
            }
        });
    }

    // 模块数据变更
    onModuleChange(key?: any, value?: any) {
        this.setState({
            moduleForm: Object.assign(this.state.moduleForm, { [key]: value })
        });
    }

    // 模块信息提交
    onModuleSubmit(e?: any) {
        e.preventDefault();
        const formRef: any = this.refs.moduleForm;
        formRef.validate((valid: boolean) => {
            valid && this.doModuleSubmit();
        });
    }

    // 模块信息提交
    doModuleSubmit() {
        const formData: any = this.state.moduleForm;
        const projectId = this.state.projectId;
        if (formData.id) {
            // 更新模块
            putModule(formData)?.then(res => {
                this.cbModuleSubmit(res);
            });
        } else {
            // 创建新模块
            postModule({
                projectId,
                ...formData
            }).then(res => {
                this.cbModuleSubmit(res);
            });
        }
    }

    // 模块信息提交回调
    cbModuleSubmit(res: any) {
        if (res.success) {
            Message.success("操作成功");
            this.setState({
                modalShow: false
            });
            this.getTreeList();
        } else {
            Message.success("操作失败");
        }
    }

    // 编辑模块
    onEditModule(store: any, data: any, event?: any) {
        event?.stopPropagation();
        const id = data.id;
        getModule({
            id
        }).then((res: any) => {
            this.setState({
                modalShow: true,
                modelTitle: "编辑模块",
                moduleForm: res.data
            });
        });
    }

    // 删除
    onDelete(params: any, msgOptions: any) {
        MessageBox.confirm(msgOptions.content, msgOptions.title, {
            type: "warning"
        }).then(() => {
            this.doDelete(params);
        });
    }

    // 删除
    doDelete(params: any) {
        deleteModule(params).then((res: any) => {
            if (res.success) {
                Message.success("删除成功!");
                this.getTreeList();
            } else {
                Message.error("删除失败!");
            }
        });
    }

    // 删除模块
    onDeleteModule(store: any, data: any, event?: any) {
        event?.stopPropagation();
        this.onDelete(
            {
                id: data.id
            },
            {
                title: "提示",
                content: "此操作将删除该模块下的所有接口, 是否继续?"
            }
        );
    }

    // 新增接口
    onAddInterface(store: any, data: any, event?: any) {
        event?.stopPropagation();
        this.setState({
            mainTitle: "新增接口",
            mainPageType: "addInterface",
            interfaceForm: {
                moduleId: data.id
            }
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
        // 创建新接口
        postInterface({
            projectId,
            ...formData
        }).then(res => {
            this.cbInterfaceSubmit(res);
        });
    }

    // 接口信息提交回调
    cbInterfaceSubmit(res: any) {
        if (res.success) {
            Message.success("操作成功");
            this.getTreeList();
            this.setState({
                interfaceForm: {
                    moduleId: "",
                    label: "",
                    requestUrl: "",
                    requestMethod: "",
                    requestParams: "",
                    requestResponse: ""
                }
            });
        } else {
            Message.success("操作失败");
        }
    }

    // 获取新增接口template
    getAddInterfaceTemplate(
        interfaceForm: Interface.Form | any,
        interfaceFormRules: Interface.FormRules | any,
        methods: Array<string>
    ) {
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
                        {methods.map((method, index) => (
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

    // 接口数据变化
    onInterfaceChange(key?: any, value?: any) {
        this.setState({
            interfaceForm: Object.assign(this.state.interfaceForm, {
                [key]: value
            })
        });
    }

    // 删除接口
    onDeleteInterface(store: any, data: any, event?: any) {
        event?.stopPropagation();
        this.onDelete(
            {
                id: data.id,
                type: 2
            },
            {
                title: "提示",
                content: "此操作将删除该接口, 是否继续?"
            }
        );
    }

    onImport() {}

    renderContent(nodeModel?: any, data?: any, store?: any) {
        return (
            <span>
                <span>
                    <span>{data.label}</span>
                </span>
                <span className="opts" style={{ float: "right" }}>
                    {data.moduleId ? (
                        <span>
                            <i
                                title="删除接口"
                                className="el-icon-delete s-fc0 f-mr10"
                                onClick={event =>
                                    this.onDeleteInterface(store, data, event)
                                }
                            ></i>
                        </span>
                    ) : (
                        <span>
                            <i
                                title="新增接口"
                                className="el-icon-plus s-fc0 f-mr10"
                                onClick={event =>
                                    this.onAddInterface(store, data, event)
                                }
                            ></i>
                            <i
                                title="编辑模块"
                                className="el-icon-edit s-fc0 f-mr10"
                                onClick={event =>
                                    this.onEditModule(store, data, event)
                                }
                            ></i>
                            <i
                                title="删除模块"
                                className="el-icon-delete s-fc0 f-mr10"
                                onClick={event =>
                                    this.onDeleteModule(store, data, event)
                                }
                            ></i>
                        </span>
                    )}
                </span>
            </span>
        );
    }

    onNodeClicked(data?: any, node?: any) {
        this.props.history.push(
            `/interface/${this.state.projectId}/${data.id}`
        );
    }

    render(): ReactNode {
        const {
            projectId,
            modalShow,
            modelTitle,
            mainTitle,
            mainPageType,
            treeData,
            treeOptions,
            moduleForm,
            moduleFormRules,
            interfaceForm,
            interfaceFormRules,
            methods
        } = this.state;
        return (
            <div className="m-interface">
                {/* 导航 */}
                <NavMenu projectId={projectId} defaultActive="interface" />
                <div className="f-flexr m-content">
                    <div className="m-side">
                        {/* 新增模块 */}
                        <div className="f-mt30 f-mb20 f-flexr">
                            <Button
                                className="f-flex-f1"
                                type="primary"
                                onClick={this.onAddModule}
                            >
                                新增模块
                            </Button>
                        </div>
                        {/* 接口目录 */}
                        <Tree
                            data={treeData}
                            options={treeOptions}
                            isShowCheckbox={false}
                            nodeKey="id"
                            defaultExpandAll={true}
                            expandOnClickNode={false}
                            highlightCurrent={true}
                            renderContent={(...args) =>
                                this.renderContent(...args)
                            }
                            onNodeClicked={(...args) =>
                                this.onNodeClicked(...args)
                            }
                        />
                    </div>
                    <div className="m-main f-flex-f1 f-ml20">
                        <div className="operation">
                            <Button type="primary" onClick={this.onImport}>
                                文件导入
                            </Button>
                        </div>
                        <div className="detail">
                            <div className="title f-mt20 f-mb20">
                                {mainTitle}
                            </div>
                            <div className="content">
                                {/* 新增接口页面 */}
                                {mainPageType === "addInterface"
                                    ? this.getAddInterfaceTemplate(
                                          interfaceForm,
                                          interfaceFormRules,
                                          methods
                                      )
                                    : ""}
                                {/* 编辑接口页面 */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* 模块弹窗 */}
                <Dialog
                    title={modelTitle}
                    visible={modalShow}
                    onCancel={() => this.setState({ modalShow: false })}
                >
                    <Dialog.Body>
                        <Form
                            ref="moduleForm"
                            model={moduleForm}
                            rules={moduleFormRules}
                            labelWidth="120"
                        >
                            <Form.Item label="模块名称" prop="label">
                                <Input
                                    value={moduleForm.label}
                                    placeholder="请输入模块名称"
                                    onChange={this.onModuleChange.bind(
                                        this,
                                        "label"
                                    )}
                                ></Input>
                            </Form.Item>
                            <Form.Item label="模块描述" prop="introduce">
                                <Input
                                    type="textarea"
                                    value={moduleForm.introduce}
                                    placeholder="请输入模块描述"
                                    autosize={{ minRows: 2, maxRows: 4 }}
                                    onChange={this.onModuleChange.bind(
                                        this,
                                        "introduce"
                                    )}
                                ></Input>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>

                    <Dialog.Footer className="dialog-footer">
                        <Button
                            onClick={() => this.setState({ modalShow: false })}
                        >
                            取 消
                        </Button>
                        <Button type="primary" onClick={this.onModuleSubmit}>
                            确 定
                        </Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(Index);
