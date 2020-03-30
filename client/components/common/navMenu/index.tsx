import React, { PureComponent, ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import autoBind from "class-autobind";
import { Menu } from "element-react";

interface Props extends RouteComponentProps {
    projectId: number;
    defaultActive: string;
}
interface State {
    menuData: Array<menuItemInterface>;
}
interface menuItemInterface {
    name: string;
    label: string;
    children?: Array<menuItemInterface>;
}

class Index extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        autoBind(this);

        this.state = {
            menuData: [
                {
                    name: "interface",
                    label: "接口列表"
                },
                {
                    name: "modal",
                    label: "基础数据",
                    children: [
                        {
                            name: "globalModal",
                            label: "通用基础数据"
                        },
                        {
                            name: "globalModal",
                            label: "当前基础数据"
                        }
                    ]
                },
                {
                    name: "message",
                    label: "动态详情"
                }
            ]
        };
    }

    onSelect(menuName: string) {
        this.props.history.push(`/${menuName}/${this.props.projectId}`);
    }

    getMenuTemplate(menu: menuItemInterface, index: number) {
        if (menu.children && menu.children.length) {
            return (
                <Menu.SubMenu key={index} index={menu.name} title={menu.label}>
                    {menu.children.map((item, itemIndex) => (
                        <Menu.Item
                            key={`${index}-${itemIndex}`}
                            index={item.name}
                        >
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
            );
        }
        return (
            <Menu.Item key={index} index={menu.name}>
                {menu.label}
            </Menu.Item>
        );
    }

    render(): ReactNode {
        const { menuData } = this.state;
        const { defaultActive } = this.props;
        return (
            <div>
                <Menu
                    defaultActive={defaultActive}
                    mode="horizontal"
                    onSelect={this.onSelect}
                >
                    {menuData.map((menu, index) =>
                        this.getMenuTemplate(menu, index)
                    )}
                </Menu>
            </div>
        );
    }
}

export default withRouter(Index);
