export interface TreeModel{
    Channels:Array<ChannelRoot>;

    // constructor(){
    //     this.Channels=[];
    // }
}

export interface ChannelRoot{    
    DisplayName:string;
    Tabs:Array<TabsNode>;
    IsChecked:Boolean;
    // constructor(){
    //     this.DisplayName="";
    //     this.Tabs=[];
    //     this.IsChecked=false;
    // }
}
export interface TabsNode{
    DisplayName:string;
    IsDefault:Boolean;
    IsChecked:Boolean;
    // constructor(){
    //     this.DisplayName="",
    //     this.IsDefault=false,
    //     this.IsChecked=false
    // }    
}