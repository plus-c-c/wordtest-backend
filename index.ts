
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

fastify.get("/", async (request, reply) => {
  const validation  = request.compileValidationSchema(RequestSchema);
  validation(request.body)
  const req : any = request.body ;
  switch (req.head){
    case "get id":
      reply.send(db.randomFindId(req.body));
    case "find problem":
      reply.send(db.problemFind(req.body));
    case "check answer":
      reply.send(db.answerCheck(req.body));
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
