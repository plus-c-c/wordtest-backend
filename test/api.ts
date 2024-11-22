type RequestRandomfindIdType= {
  problemType : string,
  length : number
}
type RequestProblemFindType = {id :number}[]
type RequestAnswerCheckType = {id : number, answer : string}[]
export type RequestType = RequestAnswerCheckType | RequestProblemFindType | RequestRandomfindIdType
export async function wordtestConnector(requestType: string, body: RequestType,host?: string){
  return await (await fetch(host??"http://127.0.0.1:3000",
    {
      method : 'POST',
      headers : {
	'Content-Type': 'application/json'
      },
      body : JSON.stringify(
	{
	  head : requestType,
	  body : body
	}
      )
    })).json()
}
