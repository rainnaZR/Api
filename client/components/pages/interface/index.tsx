import React, { ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import autoBind from "class-autobind";
import NavMenu from "../../common/navMenu";
import SideTree from "./sideTree";
import EditInterface from "./editInterface";
import InterfaceDetail from "./interfaceDetail";
import ModuleDetail from "./moduleDetail";
import "./index.scss";
import { Button, Message, MessageBox } from "element-react";
import { deleteModule, getModule } from "../../../request/module";
import { getInterface, deleteInterface } from "../../../request/interface";

type PathParamsType = any;
type Props = RouteComponentProps<PathParamsType> & {
    projectId?: any;
};
interface State {
    projectId?: any;
    mainTitle?: string;
    mainPageType?: string;
    treeData?: Array<Common.Tree>;
    interfaceForm?: Interface.Form | any;
    moduleForm?: Module.Form | any;
}

class Index extends React.Component<Props, State> {
    $treeRef: any;
    constructor(props: Props) {
        super(props);
        autoBind(this);

        this.state = {
            projectId: this.props.match?.params?.projectId,
            mainTitle: "新增接口",
            mainPageType: "",
            treeData: [],
            interfaceForm: {
                name: "",
                requestUrl: "",
                requestMethod: "",
                requestParams: "{}",
                requestResponse: "{}"
            },
            moduleForm: {
                name: "",
                introduce: "",
                apiList: []
            }
        };
    }

    onTreeRef(ref: any) {
        this.$treeRef = ref;
    }

    // 更新分类
    onGetTreeList() {
        this.$treeRef.onGetTreeList();
    }

    // 接口详情
    onViewInterfaceDetail(id: string | number) {
        getInterface({
            id
        }).then((res: any) => {
            this.setState({
                mainTitle: "接口详情",
                mainPageType: "interfaceDetail",
                interfaceForm: res.data
            });
        });
        this.props.history.push(
            `/detail/${this.state.projectId}/${id}?type=interface`
        );
    }

    // 模块详情
    onViewModuleDetail(id: string | number) {
        getModule({
            id
        }).then((res: any) => {
            this.setState({
                mainTitle: "模块详情",
                mainPageType: "moduleDetail",
                moduleForm: res.data
            });
        });
        this.props.history.push(
            `/detail/${this.state.projectId}/${id}?type=module`
        );
    }

    // 新增接口
    onAddInterface(options = {}) {
        this.setState({
            mainTitle: "新增接口",
            mainPageType: "addInterface",
            ...options
        });
    }

    // 编辑接口
    onEditInterface(id: string | number) {
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
    onDeleteInterface(id: string | number) {
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

    // 删除模块
    onDeleteModule(id: string | number) {
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
                this.onGetTreeList();
            } else {
                Message.error(message);
            }
        });
    }

    onImport() {}

    render(): ReactNode {
        const {
            projectId,
            mainTitle,
            mainPageType,
            treeData,
            interfaceForm,
            moduleForm
        } = this.state;

        return (
            <div className="m-interface">
                {/* 导航 */}
                <NavMenu projectId={projectId} defaultActive="interface" />

                <div className="f-flexr m-content">
                    {/* 边栏目录 */}
                    <div className="m-side">
                        <SideTree
                            projectId={projectId}
                            treeData={treeData}
                            onRef={this.onTreeRef}
                            onViewInterfaceDetail={this.onViewInterfaceDetail}
                            onViewModuleDetail={this.onViewModuleDetail}
                            onEditInterface={this.onEditInterface}
                            onDeleteInterface={this.onDeleteInterface}
                            onAddInterface={this.onAddInterface}
                            onDeleteModule={this.onDeleteModule}
                        />
                    </div>
                    <div className="m-main f-flex-f1 f-ml20">
                        <div className="operation">
                            <Button type="primary" onClick={this.onImport}>
                                文件导入
                            </Button>
                        </div>
                        <div className="detail">
                            <div className="title f-fs16 f-mt20 f-mb20">
                                {mainTitle}
                            </div>
                            <div className="content">
                                {/* 新增接口页面 */}
                                {mainPageType === "addInterface" && (
                                    <EditInterface
                                        projectId={projectId}
                                        interfaceForm={interfaceForm}
                                        onGetTreeList={this.onGetTreeList}
                                    />
                                )}

                                {/* {编辑接口页面} */}
                                {mainPageType === "editInterface" && (
                                    <EditInterface
                                        projectId={projectId}
                                        interfaceForm={interfaceForm}
                                        onGetTreeList={this.onGetTreeList}
                                    />
                                )}

                                {/* {接口详情页面} */}
                                {mainPageType === "interfaceDetail" && (
                                    <InterfaceDetail
                                        interfaceForm={interfaceForm}
                                        onEditInterface={this.onEditInterface}
                                        onDeleteInterface={
                                            this.onDeleteInterface
                                        }
                                    />
                                )}

                                {/* 模块详情页面 */}
                                {mainPageType === "moduleDetail" && (
                                    <ModuleDetail
                                        moduleForm={moduleForm}
                                        onViewInterfaceDetail={
                                            this.onViewInterfaceDetail
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Index);
