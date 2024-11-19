export function isRight(ans:string,trueAns:string,rule:string){
  switch (rule){
    case "Unique":
      return ans = trueAns;
    default:
      return true;
  }
}
