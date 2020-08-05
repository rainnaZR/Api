// 模块详情页
import React, { ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import autoBind from "class-autobind";
import { Table, Button, Tag } from "element-react";
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
                    label: "地址",
                    prop: "requestUrl",
                    width: 180
                },
                {
                    label: "类型",
                    prop: "requestMethod"
                },
                {
                    label: "标签",
                    prop: "tag",
                    render: (data: any, column: any) => {
                        return data.tag && <Tag type="success">{data.tag}</Tag>;
                    }
                },
                {
                    label: "创建时间",
                    prop: "createTime"
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
                <div className="m-list f-curp">
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
