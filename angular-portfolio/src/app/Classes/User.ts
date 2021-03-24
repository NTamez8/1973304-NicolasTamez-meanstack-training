export class User{
    constructor(public FName:string, public LName:string, public UName:string,public Password:string){}

    
    getName()
    {
        return this.FName + ' ' + this.LName;
    }
    getUname()
    {
        return this.UName;
    }
    getPassword()
    {
        return this.Password;
    }


}