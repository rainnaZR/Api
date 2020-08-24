// 左侧目录
import React, { ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import autoBind from "class-autobind";
import { Tree, Button, Dialog, Form, Input, Message, Tag } from "element-react";
import {
    getModuleList,
    getModule,
    putModule,
    postModule
} from "../../../../request/module";
import {
    BUSINESS_STATUS,
    BUSINESS_STATUS_DESC
} from "../../../common/constants";

type PathParamsType = any;
type Props = RouteComponentProps<PathParamsType> & {
    projectId?: string | number;
    treeData?: Array<Common.Tree>;
    onRef?: any;
    onViewInterfaceDetail?: any;
    onViewModuleDetail?: any;
    onEditInterface?: any;
    onDeleteInterface?: any;
    onAddInterface?: any;
    onDeleteModule?: any;
};
interface State {
    treeData?: Array<Common.Tree>;
    treeOptions?: Common.TreeOptions;
    modalShow?: boolean | any;
    modelTitle?: string;
    moduleForm?: Module.Form | any;
    moduleFormRules?: Module.FormRules;
}

class Index extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        autoBind(this);

        this.state = {
            treeData: props.treeData,
            treeOptions: {
                children: "children",
                name: "name"
            },
            modalShow: false,
            modelTitle: "新增模块",
            moduleForm: {
                name: "",
                introduce: ""
            },
            moduleFormRules: {
                name: [
                    {
                        required: true,
                        message: "请输入模块名称",
                        trigger: "blur"
                    }
                ]
            }
        };
        this.onGetTreeList();
    }

    componentDidUpdate() {
        this.props.onRef(this);
    }

    // 获取左侧目录列表
    onGetTreeList() {
        getModuleList({
            projectId: this.props.projectId
        })?.then(res => {
            this.setState({
                treeData: res?.data?.list
            });
        });
    }

    // 查看详情
    onViewDetail(data?: any) {
        data.moduleId
            ? this.props.onViewInterfaceDetail(data.id)
            : this.props.onViewModuleDetail(data.id);
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
                name: "",
                introduce: ""
            }
        });
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

    // 删除模块
    onDeleteModule(id: string | number, event?: any) {
        event?.stopPropagation();
        this.props.onDeleteModule(id);
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
        const projectId = this.props.projectId;
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
            this.onGetTreeList();
        } else {
            Message.error(message);
        }
    }

    renderContent(nodeModel?: any, data?: any, store?: any) {
        let statusMap: any = BUSINESS_STATUS_DESC;

        return (
            <span>
                <span
                    className="treename"
                    onClick={this.onViewDetail.bind(this, data)}
                >
                    {data.businessStatus == BUSINESS_STATUS.FINISHED && (
                        <Tag type="danger" className="f-mr5">
                            {statusMap[data.businessStatus]}
                        </Tag>
                    )}
                    {data.name}
                </span>
                <span className="opts" style={{ float: "right" }}>
                    {data.moduleId ? (
                        <span>
                            <i
                                title="编辑接口"
                                className="el-icon-edit s-fc0 f-mr10"
                                onClick={this.props.onEditInterface.bind(
                                    this,
                                    data.id
                                )}
                            ></i>
                            <i
                                title="删除接口"
                                className="el-icon-delete s-fc0 f-mr10"
                                onClick={this.props.onDeleteInterface.bind(
                                    this,
                                    data.id
                                )}
                            ></i>
                        </span>
                    ) : (
                        <span>
                            <i
                                title="新增接口"
                                className="el-icon-plus s-fc0 f-mr10"
                                onClick={this.props.onAddInterface.bind(this, {
                                    interfaceForm: {
                                        moduleId: data.id,
                                        requestParams: "{}",
                                        requestResponse: "{}"
                                    }
                                })}
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

    render(): ReactNode {
        const {
            treeData,
            treeOptions,
            modelTitle,
            modalShow,
            moduleForm,
            moduleFormRules
        } = this.state;

        return (
            <div>
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
                    renderContent={(...args) => this.renderContent(...args)}
                />
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
                            <Form.Item label="模块名称" prop="name">
                                <Input
                                    value={moduleForm.name}
                                    placeholder="请输入模块名称"
                                    onChange={this.onModuleChange.bind(
                                        this,
                                        "name"
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
