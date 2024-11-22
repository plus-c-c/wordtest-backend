import * as problemDB from "../database/problemDB"
async function start()
    {
      const idlist : {id : number}[]=await problemDB.randomFindId({problemType :"text",length :1})
      const pro=await problemDB.problemFind(idlist);
      const right=await problemDB.answerCheck(
	[{id : idlist[0].id,answer :"interned"}]);
      console.log((await pro[0])?.stem);
      console.log(await right[0]);
    }
start()
