
import Fastify from "fastify";
import * as db from "./database/problemDB"
const fastify = Fastify({
  logger: true,
});
const RequestSchema = {
  type : "object",
  required : ["head"],
  properties :{
    head :{
      type : "string"
    },
    body :{
      type : "object",
      properties :{
	problemType : {
	  type : "string"
	},
	length :{
	  type : "integer"
	},
	id :{
	  type : "integer"
	},
	answer :{
	  type : "string"
	}
      }
    }
  }
}

fastify.post("/", async (request, reply) => {
  console.log("Request Received")
  const validation  = request.compileValidationSchema(RequestSchema);
  validation(request.body)
  const req : any = request.body ;
  console.log(req)
  switch (req.head){
    case "get problem id":
      reply.send(await db.randomFindId(req.body));
      break;
    case "find problem":
      reply.send(await db.problemFind(req.body));
      break;
    case "check answer":
      reply.send(await db.answerCheck(req.body));
      break;
    default:
      reply.send({ msg : "Invalid Answer" });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
