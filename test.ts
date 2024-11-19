import * as problemDB from "./database/problemDB"
const problem1 : problemDB.ProblemType =
{
  "problemType" : "text",
  "stem" : "After high school, I _ for a nearby plastic surgeon.",
  "answers" : "interned"
}
async function start()
    {
      const idlist : number[]=await problemDB.randomFindId("text",1)
      const pro=await problemDB.problemFind(idlist);
      const right=await problemDB.answerCheck(
	[{id : idlist[0],answer :"interned"}]);
      console.log((await pro[0])?.stem);
      console.log(await right[0]);
    }
start()
