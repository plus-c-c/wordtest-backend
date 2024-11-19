"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sql = __importStar(require("@prisma/client"));
const prisma = new sql.PrismaClient();
//记录单个用户的类，目前功能：注册，登录
class User {
    //虽然写了构造函数，但不推荐使用，请尽量使用signUp和signIn
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }
    //注册
    signUp(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.name = name;
            this.password = password;
            yield prisma.user.create({ data: { name: this.name, password: this.password } });
        });
    }
    //登录，有三个返回值：2表示用户不存在，1表示登陆成功，0：表示密码错误
    signIn(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield prisma.user.findMany({ where: { name: String(name) } });
            if (findUser.length === 0)
                return 2; //用户不存在
            if (findUser[0].password === password) {
                this.name = name;
                this.password = password;
            }
            return findUser[0].password == password ? 1 : 0;
        });
    }
}
exports.User = User;
