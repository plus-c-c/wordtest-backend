"use strict";
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
exports.ProblemDB = void 0;
const client_1 = require("@prisma/client");
const answerRule_1 = require("./answerRule");
const prisma = new client_1.PrismaClient();
class ProblemDB {
    create(problem) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            return (yield prisma.problem.create({
                data: {
                    problemType: problem.problemType,
                    stem: problem.stem,
                    answers: (_a = problem.answers) !== null && _a !== void 0 ? _a : "",
                    answerRule: (_b = problem.answerRule) !== null && _b !== void 0 ? _b : "Unique",
                    options: {
                        create: (_c = problem.options) === null || _c === void 0 ? void 0 : _c.map((value, index) => {
                            return { optionId: index, content: value };
                        })
                    }
                    // ,
                    //  subProblem :{
                    //connect : problem.element.subProblem?.element.map(this.create)??undefined
                    //}
                }
            }));
        });
    }
    randomFindId(type, length) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield prisma.problem.findMany({
                select: {
                    id: true
                },
                where: { problemType: type },
                orderBy: yield prisma.$queryRaw `random()`,
                take: length
            })).map((value) => { return value.id; });
        });
    }
    problemFind(idList) {
        return __awaiter(this, void 0, void 0, function* () {
            return idList.map((id) => __awaiter(this, void 0, void 0, function* () {
                return yield prisma.problem.findUnique({
                    select: {
                        stem: true,
                        problemType: true,
                        options: {
                            select: {
                                optionId: true,
                                content: true
                            }
                        }
                    },
                    where: { id: id }
                });
            }));
        });
    }
    answerCheck(checkList) {
        return __awaiter(this, void 0, void 0, function* () {
            return checkList.map((val) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const ans = yield prisma.problem.findUnique({
                    select: {
                        answers: true,
                        answerRule: true
                    },
                    where: { id: val.id }
                });
                return (0, answerRule_1.isRight)(val.answer, (_a = ans === null || ans === void 0 ? void 0 : ans.answers) !== null && _a !== void 0 ? _a : "", (_b = ans === null || ans === void 0 ? void 0 : ans.answerRule) !== null && _b !== void 0 ? _b : "");
            }));
        });
    }
}
exports.ProblemDB = ProblemDB;
/**
export class ProblemClass{
  element : ProblemType
  constructor(
    obj : ProblemType){
      this.element=obj;
      this.element.stem=this.element.stem??"";
      this.element.options=this.element.options??[];
      //this.element.subProblem=this.element.subProblem??new ProblemSeq(0).element;
  }

}
 */
