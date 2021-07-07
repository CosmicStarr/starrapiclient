import { IUser } from "./User";

export class UserParam{
    public gender: string;
    public minAge = 18;
    public maxAge = 99;
    public pageNumber = 1;
    public pageSize = 5;
    public orderBy = 'lastActive';

 
    constructor(user:IUser) {
        this.gender = user.Gender === 'female' ? 'male' : 'female';

    }
}