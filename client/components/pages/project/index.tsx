import React, { ReactNode } from "react";
import autoBind from "class-autobind";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {
    Button,
    Dialog,
    Form,
    Input,
    Message,
    MessageBox
} from "element-react";
import {
    postData,
    getDataList,
    getData,
    putData,
    deleteData
} from "../../../request/project";
import "./index.scss";

interface Props extends RouteComponentProps {}
interface State {
    modalShow?: any;
    modelTitle?: string;
    form?: any;
    rules?: any;
    id?: any;
    list?: Array<ProjectItem>;
}
interface ProjectItem {
    id?: number;
    name?: string;
    introduce?: string;
    gitPath?: string;
    createUser?: string;
    updateUser?: string;
    updateTime?: string;
}
class Index extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        autoBind(this);

        this.state = {
            modalShow: false,
            modelTitle: "新增项目",
            form: {
                name: "",
                introduce: "",
                gitPath: "",
                createUser: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入项目名称",
                        trigger: "blur"
                    }
                ],
                gitPath: [
                    {
                        required: true,
                        message: "请选择项目对应的仓库地址",
                        trigger: "blur"
                    }
                ]
            },
            id: "",
            list: []
        };
        this.getList();
    }

    getList() {
        getDataList()?.then((res: any) => {
            this.setState({
                list: res?.data?.list
            });
        });
    }

    onAdd() {
        const formRef: any = this.refs.form;
        formRef.resetFields();
        this.setState({
            modalShow: true,
            modelTitle: "新增项目",
            id: ""
        });
    }

    onEdit(id: any, event?: any) {
        event?.stopPropagation();
        getData({
            id
        }).then((res: any) => {
            const { id, name, introduce, gitPath, createUser } = res.data;
            this.setState({
                modalShow: true,
                modelTitle: "编辑项目",
                id,
                form: {
                    name,
                    introduce,
                    gitPath,
                    createUser
                }
            });
        });
    }

    onDelete(id: any, event?: any) {
        event?.stopPropagation();
        MessageBox.confirm(
            "此操作将删除该项目下的所有接口和数据, 是否继续?",
            "提示",
            {
                type: "warning"
            }
        )
            .then(() => {
                this.doDelete(id);
            })
            .catch(() => {
                Message({
                    type: "info",
                    message: "已取消删除"
                });
            });
    }

    doDelete(id: number) {
        deleteData({
            id
        }).then(res => {
            if (res.success) {
                Message.success("删除成功!");
                this.getList();
            } else {
                Message.error("删除失败!");
            }
        });
    }

    onChange(key: any, value: any) {
        this.setState({
            form: Object.assign(this.state.form, { [key]: value })
        });
    }

    onSubmit(e: any) {
        e.preventDefault();
        const formRef: any = this.refs.form;
        formRef.validate((valid: boolean) => {
            valid && this.doSubmit();
        });
    }

    doSubmit() {
        const formData = this.state.form;
        if (this.state.id) {
            // 更新用户
            putData({
                id: this.state.id,
                ...formData
            })?.then(res => {
                this.cbSubmit(res);
            });
        } else {
            // 创建新用户
            postData(formData)?.then(res => {
                this.cbSubmit(res);
            });
        }
    }

    cbSubmit(res: any) {
        if (res.success) {
            Message.success("操作成功");
            this.setState({
                modalShow: false
            });
            this.getList();
        } else {
            Message.success("操作失败");
        }
    }

    onClickItem(id: any) {
        this.props.history.push(`/detail/${id}`);
    }

    getItemTemplate(item: ProjectItem, index: number) {
        return (
            <div
                key={index}
                className="item f-trans f-curp"
                onClick={() => this.onClickItem(item.id)}
            >
                <div className="logo u-iconfont u-iconfont-build"></div>
                <div className="f-mt20 f-fs18">{item.name}</div>
                <div className="operation f-trans">
                    <Button.Group>
                        <Button
                            type="primary"
                            icon="edit"
                            size="small"
                            onClick={event => this.onEdit(item.id, event)}
                        ></Button>
                        <Button
                            type="primary"
                            icon="delete"
                            size="small"
                            onClick={event => this.onDelete(item.id, event)}
                        ></Button>
                    </Button.Group>
                </div>
            </div>
        );
    }

    render(): ReactNode {
        const { modalShow, modelTitle, form, rules, list } = this.state;
        return (
            <div className="m-project">
                {/* 头部信息 */}
                <div className="header f-flexr">
                    <p className="f-flex-f1">共{list?.length}个项目</p>
                    <Button type="primary" size="large" onClick={this.onAdd}>
                        新增项目
                    </Button>
                </div>
                {/* 列表展示 */}
                <div className="content f-flexr f-mt50">
                    {list?.map((item, index) =>
                        this.getItemTemplate(item, index)
                    )}
                </div>
                {/* 弹窗 */}
                <Dialog
                    title={modelTitle}
                    visible={modalShow}
                    onCancel={() => this.setState({ modalShow: false })}
                >
                    <Dialog.Body>
                        <Form
                            ref="form"
                            model={form}
                            rules={rules}
                            labelWidth="120"
                        >
                            <Form.Item label="项目名称" prop="name">
                                <Input
                                    value={form.name}
                                    placeholder="请输入项目名称"
                                    onChange={this.onChange.bind(this, "name")}
                                ></Input>
                            </Form.Item>
                            <Form.Item label="仓库地址" prop="gitPath">
                                <Input
                                    value={form.gitPath}
                                    placeholder="请输入仓库地址"
                                    onChange={this.onChange.bind(
                                        this,
                                        "gitPath"
                                    )}
                                ></Input>
                            </Form.Item>
                            <Form.Item label="项目介绍" prop="introduce">
                                <Input
                                    type="textarea"
                                    value={form.introduce}
                                    autosize={{ minRows: 2, maxRows: 4 }}
                                    placeholder="请输入项目介绍"
                                    onChange={this.onChange.bind(
                                        this,
                                        "introduce"
                                    )}
                                />
                            </Form.Item>
                            <Form.Item label="负责人" prop="createUser">
                                <Input
                                    value={form.createUser}
                                    placeholder="请输入项目负责人"
                                    onChange={this.onChange.bind(
                                        this,
                                        "createUser"
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
                        <Button
                            type="primary"
                            onClick={this.onSubmit.bind(this)}
                        >
                            确 定
                        </Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(Index);
