import React, { ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import autoBind from "class-autobind";
import NavMenu from "../../common/navMenu";
import EditInterface from "./editInterface";
import "./index.scss";
import {
    Tree,
    Button,
    Form,
    Input,
    Message,
    Dialog,
    MessageBox
} from "element-react";
import {
    getModuleList,
    postModule,
    getModule,
    putModule,
    deleteModule
} from "../../../request/module";
import { getInterface, deleteInterface } from "../../../request/interface";

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
            }
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
                id: "",
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
        let { success, message } = res;
        if (success) {
            Message.success(message);
            this.setState({
                modalShow: false
            });
            this.getTreeList();
        } else {
            Message.error(message);
        }
    }

    // 编辑模块
    onEditModule(id: string | number, event?: any) {
        event?.stopPropagation();

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
    onDelete(request: any, params: any, msgOptions: any) {
        MessageBox.confirm(msgOptions.content, msgOptions.title, {
            type: "warning"
        }).then(() => {
            this.doDelete(request, params);
        });
    }

    // 删除
    doDelete(request: any, params: any) {
        request(params).then((res: any) => {
            let { success, message } = res;
            if (success) {
                Message.success(message);
                this.getTreeList();
            } else {
                Message.error(message);
            }
        });
    }

    // 删除模块
    onDeleteModule(id: string | number, event?: any) {
        event?.stopPropagation();

        this.onDelete(
            deleteModule,
            {
                id
            },
            {
                title: "提示",
                content: "此操作将删除该模块下的所有接口, 是否继续?"
            }
        );
    }

    // 新增接口
    onAddInterface(moduleId: string | number, event?: any) {
        event?.stopPropagation();

        this.setState({
            mainTitle: "新增接口",
            mainPageType: "addInterface",
            interfaceForm: {
                moduleId
            }
        });
    }

    // 编辑接口
    onEditInterface(id: string | number, event?: any) {
        event?.stopPropagation();
        getInterface({
            id
        }).then((res: any) => {
            this.setState({
                mainTitle: "编辑接口",
                mainPageType: "editInterface",
                interfaceForm: res.data
            });
        });
    }

    // 删除接口
    onDeleteInterface(id: string | number, event?: any) {
        event?.stopPropagation();
        this.onDelete(
            deleteInterface,
            {
                id
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
                                title="编辑接口"
                                className="el-icon-edit s-fc0 f-mr10"
                                onClick={event =>
                                    this.onEditInterface(data.id, event)
                                }
                            ></i>
                            <i
                                title="删除接口"
                                className="el-icon-delete s-fc0 f-mr10"
                                onClick={event =>
                                    this.onDeleteInterface(data.id, event)
                                }
                            ></i>
                        </span>
                    ) : (
                        <span>
                            <i
                                title="新增接口"
                                className="el-icon-plus s-fc0 f-mr10"
                                onClick={event =>
                                    this.onAddInterface(data.id, event)
                                }
                            ></i>
                            <i
                                title="编辑模块"
                                className="el-icon-edit s-fc0 f-mr10"
                                onClick={event =>
                                    this.onEditModule(data.id, event)
                                }
                            ></i>
                            <i
                                title="删除模块"
                                className="el-icon-delete s-fc0 f-mr10"
                                onClick={event =>
                                    this.onDeleteModule(data.id, event)
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
            interfaceForm
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
                                {mainPageType === "addInterface" && (
                                    <EditInterface
                                        interfaceForm={interfaceForm}
                                        getTreeList={this.getTreeList}
                                    />
                                )}

                                {/* {编辑接口页面} */}
                                {mainPageType === "editInterface" && (
                                    <EditInterface
                                        interfaceForm={interfaceForm}
                                        getTreeList={this.getTreeList}
                                    />
                                )}
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
