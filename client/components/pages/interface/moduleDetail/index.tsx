// 模块详情页
import React, { ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import autoBind from "class-autobind";
import "./index.scss";

type PathParamsType = any;
type Props = RouteComponentProps<PathParamsType> & {
    moduleForm?: Module.Form | any;
};
interface State {}

class Index extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        autoBind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            moduleForm: nextProps.moduleForm
        });
    }

    render(): ReactNode {
        const moduleForm = this.props.moduleForm;

        return (
            <div className="m-detail">
                <div className="m-list">
                    <div className="f-flexr f-mb15">
                        <div className="label">名称：</div>
                        <div className="content">{moduleForm.label}</div>
                    </div>
                    <div className="f-flexr f-mb15">
                        <div className="label">描述：</div>
                        <div className="content">{moduleForm.introduce}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Index);
