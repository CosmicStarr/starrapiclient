
export interface IGroups{
    groupName:string
    connections:IConnections[];   
}

interface IConnections{
    connectionId:string;
    username:string;
}