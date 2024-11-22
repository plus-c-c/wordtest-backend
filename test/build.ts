import * as problemDB from "../database/problemDB"
const problem : problemDB.ProblemType[] =
[
  {
    "problemType" : "text",
    "stem" : "After high school, I _ for a nearby plastic surgeon.",
    "answers" : "interned"
  },
  {
    "problemType" : "text",
    "stem" : "That experience, plus my grades, earned me a full four-year _ scholarship to the University of Maryland.",
    "answers" : "merit"
}
  ,
  {
    "problemType" : "text",
    "stem" : "I had a front-row seat in the _, watching _ surgeries that all looked so perfect.",
    "answers" : "operating room,cosmetic"
  }
]
async function create(){
  problem.map((val)=>{
    problemDB.create(val)
  })
}
create()
