import { HandlerContext } from "$fresh/server.ts";
import { graphql, buildSchema } from "graphql";

const schema = buildSchema(`
  type Query {
    greeting: String
  }
`)

const rootValue = {
  greeting: () => {
    return "Hello!";
  }
}

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const raw = await _req.json();
  const res = await graphql({schema, source: raw.query, rootValue});
  return new Response(JSON.stringify(res))
};
