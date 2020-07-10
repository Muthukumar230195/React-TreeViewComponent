import React from 'react'
import * as data from "../temp.json";
import { TreeModel, ChannelRoot, TabsNode } from '../model/TreeModel.js';
import { Checkbox, Label } from '@fluentui/react';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import styles from '../component/PcwTreeViewUI.module.scss';
// import CheckboxTree from 'react-checkbox-tree';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faChevronCircleRight, faSquare, faFolder } from '@fortawesome/fontawesome-free-solid'
import { initializeIcons } from '@uifabric/icons';
import { Icon } from '@fluentui/react/lib/Icon';
initializeIcons();
//fontawesome.library.add(faChevronCircleRight, faSquare, faFolder);
interface TreeProps {
    treeJson: any;
}

interface TreeState {
    isTreeVisible: boolean;
    TreeViewData: ChannelRoot[];
}

interface ParentChannelProps {
    channelObj: ChannelRoot[];
}

interface ChildTabsProps {
    tabsObj: TabsNode[];
    parentChannelName: string;
}

class Tree extends React.Component<{}, TreeState>
{
    //private FullList: ChannelRoot[] | undefined;
    constructor(props: any) {
        super(props);

        this.state = {
            isTreeVisible: true,
            TreeViewData: data.channels
        }
        //this.setTreeViewData();
    }

    // private setTreeViewData() {
    // let nextCheckedList: Record<string, Record<string, boolean>> = {};
    // this.FullList = data.channels;
    // console.log(this.FullList);
    // this.FullList.map((obj: any, index: any) => {
    // nextCheckedList[obj.DisplayName] = {};
    // });
    // this.setState({
    // TreeViewData: this.FullList
    // });
    // }
    // //console.log(nextCheckedList);
    // this.FullList.map((obj:any) => {
    // let listTabs = this.FullList[obj.Tabs];
    // listTabs.map((tabsObj:any,ind:Number) => {
    // nextCheckedList[obj.DisplayName][tabsObj.DisplayName] = false;
    // });
    // });
    //console.log(nextCheckedList);
    //let setIntervalId = setInterval(() => {
    //if (Object.keys(data.channels).length) {
    //this.labelsFullList = { ...data };
    // this.dropdownState = this.setCheckboxesState();
    // this.setState({
    // labelsList: this.props.dropdownData,
    // isMenuVisible: false,
    // checkedList: this.setCheckboxesState(),
    // searchText: "",
    // isGeoRegionExpanded: this.setDropdownState()
    // });
    // clearInterval(setIntervalId);
    // }
    //}, 100);


    private _onChange(event: any) {
        console.log(`The option has been changed to ${event.target.checked}.`);
    }

    render() {
        //console.log(this.state.TreeViewData);
        return (
            <div className={styles.pcwAddOnContainer} >
                <h2>Add Ons</h2>
                <div className={styles.pcwInner} >
                    <div className={styles.treeToggle} ><Icon iconName="ChevronDownMed" className="ChevronDownMed" /><Label>SEE Team</Label></div>
                    <div className={styles.pcwInnerCheckboxtree} >
                        <ParentChannel channelObj={this.state.TreeViewData} />
                    </div>
                </div>
            </div>
        )
    }
}

const ParentChannel = (props: ParentChannelProps) => {
    return (
        <div className={styles.channelSectionparent}>
            {props.channelObj.length > 0 && (
                props.channelObj.map((todoObj: ChannelRoot, index: number) => {
                    return (
                        <div className={styles.channelSectioninner}>
                            <div className={styles.channelSectioninnerParent}>
                                <Checkbox name={todoObj.DisplayName} checked={false} title={todoObj.DisplayName} label={todoObj.DisplayName} />
                            </div>
                            <div className={styles.channelSectioninnerChild}>
                                {todoObj.Tabs.length > 0 && (
                                    <ChildTabs tabsObj={todoObj.Tabs} parentChannelName={todoObj.DisplayName} />
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
        <div >
            {props.tabsObj.map((todoTabsObj: TabsNode, index: number) => {
                return (<Checkbox className={styles.channelSectioninnerChildLabel} label={todoTabsObj.DisplayName} parent-Name={props.parentChannelName} ariaLabel={todoTabsObj.DisplayName} name={todoTabsObj.DisplayName} title={todoTabsObj.DisplayName} />)
            })
            }
        </div>
    )
}