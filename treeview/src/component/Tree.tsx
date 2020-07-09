import React from 'react'
import * as data from "../temp.json";
import { TreeModel, ChannelRoot, TabsNode } from '../model/TreeModel.js';
import { Checkbox, Label } from '@fluentui/react';
import { initializeIcons } from '@uifabric/icons';
import { Icon } from '@fluentui/react/lib/Icon';
initializeIcons();

interface TreeState {
    isTreeVisible: boolean;
    TreeViewData: ChannelRoot[];
}

interface ParentChannelProps {
    channelObj: ChannelRoot[];
    toggleParentCheckbox(e: any, x: string): void;
    toggleChildCheckbox(e: any, x: string, y: string): void;
}

interface ChildTabsProps {
    tabsObj: TabsNode[];
    parentChannelName: string;
    toggleChildCheckbox(e: any, x: string, y: string): void;
}

class Tree extends React.Component<{}, TreeState>
{
    constructor(props: any) {
        super(props);

        this.state = {
            isTreeVisible: true,
            TreeViewData: data.channels
        }
        this.toggleChildTabCheckboxMethod = this.toggleChildTabCheckboxMethod.bind(this);
        this.toggleParentChannelCheckboxMethod = this.toggleParentChannelCheckboxMethod.bind(this);
    }

    private toggleChildTabCheckboxMethod(event: any, channelName: string, tabName: string) {
        console.log(`The option has been changed to ${event.target.checked}. ` + channelName + " " + tabName);
        let nextStateListArr = [...this.state.TreeViewData];
        Object.values(nextStateListArr)
            .filter(x => x.DisplayName === channelName)[0].Tabs
            .filter(x => x.DisplayName === tabName)[0].IsChecked = event.target.checked;
        let checkedChildElementLen = Object.values(nextStateListArr)
            .filter(x => x.DisplayName === channelName)[0].Tabs
            .filter(x => x.IsChecked === true).length;
        let actualChildElementLen = Object.values(nextStateListArr)
            .filter(x => x.DisplayName === channelName)[0].Tabs.length;

        if (checkedChildElementLen === actualChildElementLen) {
            Object.values(nextStateListArr)
                .filter(x => x.DisplayName === channelName)[0].IsChecked = true;
        } else {
            Object.values(nextStateListArr)
                .filter(x => x.DisplayName === channelName)[0].IsChecked = false;
        }

        this.setState({
            TreeViewData: [...nextStateListArr]
        });
        console.log(nextStateListArr);
    }


    private toggleParentChannelCheckboxMethod(event: any, channelName: string) {
        console.log(`The option has been changed to ${event.target.checked}. ` + channelName);
        let nextStateListArr = [...this.state.TreeViewData];

        Object.values(nextStateListArr)
            .filter(x => x.DisplayName === channelName)[0].IsChecked = event.target.checked;

        let allChildElementLen = Object.values(nextStateListArr)
            .filter(x => x.DisplayName === channelName)[0].Tabs.length;

        for (let i = 0; i < allChildElementLen; i++) {
            let isDisabledChild = Object.values(nextStateListArr).filter(x => x.DisplayName === channelName)[0].Tabs[i].IsDefault;
            if (!isDisabledChild) {
                Object.values(nextStateListArr)
                    .filter(x => x.DisplayName === channelName)[0].Tabs[i].IsChecked = event.target.checked;
            }
        }

        this.setState({
            TreeViewData: [...nextStateListArr]
        });
    }


    render() {
        return (
            <div style={{ height: "200px", width: "50%", backgroundColor: "powderblue" }}>
                <h2>Add Ons</h2>
                <div>
                    <div><Icon iconName="ChevronDownMed" className="ChevronDownMed" /><Label>SEE Team</Label></div>
                    <div>
                        <ParentChannel channelObj={this.state.TreeViewData} toggleParentCheckbox={this.toggleParentChannelCheckboxMethod} toggleChildCheckbox={this.toggleChildTabCheckboxMethod} />
                    </div>
                </div>
            </div>
        )
    }
}


const ParentChannel = (props: ParentChannelProps) => {
    return (
        <div>
            {props.channelObj.length > 0 && (
                props.channelObj.map((todoObj: ChannelRoot, index: number) => {
                    return (
                        <div key={"SEE-TreeParentDiv_" + todoObj.DisplayName}>
                            <div>
                                <Checkbox name={todoObj.DisplayName} checked={!!todoObj.IsChecked} onChange={(e: any) => { props.toggleParentCheckbox(e, todoObj.DisplayName) }} title={todoObj.DisplayName} label={todoObj.DisplayName} key={"SEE_TreeParent_" + todoObj.DisplayName} />
                            </div>
                            <div>
                                {todoObj.Tabs.length > 0 && (
                                    <ChildTabs tabsObj={todoObj.Tabs} parentChannelName={todoObj.DisplayName} toggleChildCheckbox={props.toggleChildCheckbox} />
                                )}
                            </div>
                        </div>)
                })
            )}
        </div>
    )
}


const ChildTabs = (props: ChildTabsProps) => {
    return (
        <div key={"SEE-TreeChildDiv_" + props.parentChannelName}>
            {props.tabsObj.map((todoTabsObj: TabsNode, index: number) => {
                return (<Checkbox label={todoTabsObj.DisplayName} checked={!!todoTabsObj.IsChecked} disabled={!!todoTabsObj.IsDefault} onChange={(e: any) => { props.toggleChildCheckbox(e, props.parentChannelName, todoTabsObj.DisplayName) }} parent-Name={props.parentChannelName} ariaLabel={todoTabsObj.DisplayName} name={todoTabsObj.DisplayName} title={todoTabsObj.DisplayName} key={"SEE-TreeChild_" + props.parentChannelName + "_" + todoTabsObj.DisplayName} />)
            })
            }
        </div>
    )
}

export default Tree
