import * as sql from '@prisma/client'

const prisma=new sql.PrismaClient();

//记录单个用户的类，目前功能：注册，登录
export class User
{
    protected name:string;
    protected password:string;

    //虽然写了构造函数，但不推荐使用，请尽量使用signUp和signIn
    constructor(name:string,password:string)
    {
        this.name=name;
        this.password=password;
    }

    //注册
    async signUp(name:string,password:string):Promise<void>
    {
        this.name=name;
        this.password=password;
        await prisma.user.create({data:{name:this.name,password:this.password}})
    }

    //登录，有三个返回值：2表示用户不存在，1表示登陆成功，0：表示密码错误
    async signIn(name:string,password:string):Promise<number>
    {
        const findUser=await prisma.user.findMany({where:{name:String(name)}});
        if(findUser.length===0) return 2;//用户不存在
        if(findUser[0].password===password)
        {
            this.name=name;
            this.password=password;
        }
        return findUser[0].password==password?1:0;
    }

}
