import React from 'react'
import * as data from "../temp.json";
import { TreeModel, ChannelRoot, TabsNode } from '../model/TreeModel.js';
import { Checkbox, Label } from '@fluentui/react';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
// import CheckboxTree from 'react-checkbox-tree';
import fontawesome, { icon } from '@fortawesome/fontawesome'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faSquare, faFolder } from '@fortawesome/fontawesome-free-solid'
import { initializeIcons } from '@uifabric/icons';
import { Icon } from '@fluentui/react/lib/Icon';
initializeIcons();
fontawesome.library.add(faChevronCircleRight, faSquare, faFolder);
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

interface ChildTabsProps{
    tabsObj:TabsNode[];
    parentChannelName:string;
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
    //     let nextCheckedList: Record<string, Record<string, boolean>> = {};
    //     this.FullList = data.channels;
    //     console.log(this.FullList);
    //     this.FullList.map((obj: any, index: any) => {
    //         nextCheckedList[obj.DisplayName] = {};
    //     });
    //     this.setState({
    //         TreeViewData: this.FullList
    //     });
    // }
    //     //console.log(nextCheckedList);
        // this.FullList.map((obj:any) => {
        //     let listTabs = this.FullList[obj.Tabs];
        //     listTabs.map((tabsObj:any,ind:Number) => {
        //         nextCheckedList[obj.DisplayName][tabsObj.DisplayName] = false;
        //     });
        // });
        //console.log(nextCheckedList);
        //let setIntervalId = setInterval(() => {
        //if (Object.keys(data.channels).length) {
        //this.labelsFullList = { ...data };
        // this.dropdownState = this.setCheckboxesState();
        //   this.setState({
        //     labelsList: this.props.dropdownData,
        //     isMenuVisible: false,
        //     checkedList: this.setCheckboxesState(),
        //     searchText: "",
        //     isGeoRegionExpanded: this.setDropdownState()
        //   });
        // clearInterval(setIntervalId);
        // }
        //}, 100);
    

    private _onChange(event: any) {
        console.log(`The option has been changed to ${event.target.checked}.`);
    }

    render() {
        //console.log(this.state.TreeViewData);
        return (
            <div style={{ height: "200px", width: "50%", backgroundColor: "powderblue" }}>
                <h2>Add Ons</h2>
                <div>
                    <div><Icon iconName="ChevronDownMed" className="ChevronDownMed" /><Label>SEE Team</Label></div>
                    <div>                      
                        <ParentChannel channelObj={this.state.TreeViewData} />
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
                props.channelObj.map((todoObj:ChannelRoot,index:number) => {
                    return(
                <div>
                    <div>
                        <Checkbox name={todoObj.DisplayName} checked={false} title={todoObj.DisplayName} label={todoObj.DisplayName} />
                    </div>
                    <div>
                    {todoObj.Tabs.length > 0 && (
                        <ChildTabs tabsObj={todoObj.Tabs} parentChannelName={todoObj.DisplayName}/>
                    )}
                    </div>
                </div>)
                })
                )}
        </div>
    )
}


const ChildTabs = (props:ChildTabsProps) => {
    return(
        <div>
        {props.tabsObj.map((todoTabsObj:TabsNode,index:number) => {
            return(<Checkbox label={todoTabsObj.DisplayName} parent-Name={props.parentChannelName} ariaLabel={todoTabsObj.DisplayName} name={todoTabsObj.DisplayName} title={todoTabsObj.DisplayName}/>)
        })
    }
        </div>
    )
}

// const nodes = [{
//     value: 'Pre-Sale',
//     label: 'Pre-Sale',
//     children: [
//         { value: 'Apps Playbook', label: 'Apps Playbook' },
//         { value: 'Apps', label: 'Apps' },
//         { value: 'Ipkit', label: 'Ipkit' },
//         { value: 'Test', label: 'Test' }
//     ],
// },
// {
//     value: 'Delivery',
//     label: 'Delivery',
//     children: [
//         { value: 'Playbook', label: 'Playbook' },
//         { value: 'Okay', label: 'Okay' },
//         { value: 'CPOD', label: 'CPOD',checked:true,disabled:true , icon: <Icon iconName="CheckboxFill" className="CheckboxFill"/>}        
//     ],
// }
// ];

// class Tree extends React.Component {
//     state = {
//         checked: [],
//         expanded: ["Pre-Sale","Delivery"],
//     };

//     private handleClickEvent(targetNode:any){
//         console.log(targetNode);
//     }

//     render() {
//         return (
//             <CheckboxTree
//                 nodes={nodes}
//                 checked={this.state.checked}
//                 expanded={this.state.expanded}
//                 onCheck={checked => this.setState({ checked })}
//                 onExpand={expanded => this.setState({ expanded })}
//                 showNodeIcon={false}
//                 expandOnClick={true}
//                 showExpandAll={true}
//                 //nativeCheckboxes={true}
//                 // iconsClass="fa5"
//                 onClick={this.handleClickEvent}

//                 icons={{
//                     check: <Icon iconName="CheckboxCompositeReversed" className="CheckboxCompositeReversed" />,
//                     uncheck: <Icon iconName="Checkbox" className="Checkbox" />,
//                     halfCheck: <Icon iconName="CheckboxComposite" className="CheckboxComposite" />,
//                     expandClose: <Icon iconName="ChevronRightMed" className="ChevronRightMed" />,
//                     expandOpen: <Icon iconName="ChevronDownMed" className="ChevronDownMed" />,
//                     expandAll: <Icon iconName="ExploreContent" className="ExploreContent" />,
//                     //disableIcon:<Icon iconName="CheckboxFill" className="CheckboxFill"/>
//                     // collapseAll: <Icon iconName="CheckboxComposite" className="CheckboxComposite" />,
//                     // parentClose: <Icon iconName="CheckboxComposite" className="CheckboxComposite" />,
//                     // parentOpen: <Icon iconName="CheckboxComposite" className="CheckboxComposite" />,
//                     // leaf: <Icon iconName="CheckboxFill" className="CheckboxFill" />
//                 }}
//             />
//         );
//     }
// }
export default Tree
