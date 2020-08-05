// 模块详情页
import React, { ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import autoBind from "class-autobind";
import { Table, Button } from "element-react";
import "./index.scss";

type PathParamsType = any;
type Props = RouteComponentProps<PathParamsType> & {
    moduleForm?: Module.Form | any;
    onViewInterfaceDetail?: any;
};
interface State {
    moduleForm?: Module.Form | any;
    columns?: Array<any>;
}

class Index extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        autoBind(this);

        this.state = {
            moduleForm: props.moduleForm,
            columns: [
                {
                    label: "名称",
                    prop: "name",
                    width: 180
                },
                {
                    label: "路径",
                    prop: "requestUrl",
                    width: 180
                },
                {
                    label: "类型",
                    prop: "requestMethod"
                },
                {
                    label: "版本号",
                    prop: "tag"
                },
                {
                    label: "更新时间",
                    prop: "updateTime"
                },
                {
                    label: "操作",
                    prop: "zip",
                    fixed: "right",
                    width: 100,
                    render: () => {
                        return (
                            <span>
                                <Button type="text" size="small">
                                    编辑
                                </Button>
                                <Button type="text" size="small">
                                    删除
                                </Button>
                            </span>
                        );
                    }
                }
            ]
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            moduleForm: nextProps.moduleForm
        });
    }

    /**
     * 操作行点击
     * **/
    onRowClick(row?: any, event?: any) {
        event?.preventDefault();
        this.props.onViewInterfaceDetail(row.id);
    }

    render(): ReactNode {
        const { moduleForm, columns } = this.state;

        return (
            <div className="m-detail">
                <div className="m-list">
                    <div className="f-flexr f-mb15">
                        <div className="label">名称：</div>
                        <div className="content">{moduleForm.name}</div>
                    </div>
                    <div className="f-flexr f-mb15">
                        <div className="label">描述：</div>
                        <div className="content">{moduleForm.introduce}</div>
                    </div>
                </div>
                <div className="m-list">
                    <Table
                        columns={columns}
                        data={moduleForm.apiList}
                        onRowClick={this.onRowClick}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(Index);
