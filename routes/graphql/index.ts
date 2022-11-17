import { HandlerContext } from "$fresh/server.ts";
import { graphql, buildSchema } from "graphql";

const schema = buildSchema(`
  type Query {
    greeting(name: String!): String
  }
`)

const rootValue = {
  greeting: (args) => {
    return "Hello " + args.name + "!";
  }
}

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const raw = await _req.json();
  const res = await graphql({schema, source: raw.query, rootValue});
  return new Response(JSON.stringify(res))
};
