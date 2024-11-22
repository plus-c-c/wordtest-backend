import * as api from "./api"
async function test(){
  const repGetId=await api.wordtestConnector("get problem id",{problemType : "text",length: 1})
  console.log(repGetId);
  const repFindProblem=await api.wordtestConnector("find problem", repGetId)
  console.log(repFindProblem)
  const repCheckAns=await api.wordtestConnector("check answer", [{id : repGetId[0].id,answer : "intend"}])
  console.log(repCheckAns)
}
test()
