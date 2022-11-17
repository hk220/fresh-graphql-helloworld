import { HandlerContext } from "$fresh/server.ts";

const query = "{greeting}";

async function graphql<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const resp = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({query, variables})
  });
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`${resp.status} ${body}`);
  }
  const json = await resp.json()
  if (json.errors) {
    throw new Error(json.errors.map((e: Error) => e.message).join("\n"));
  }
  return json.data as T;
}

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const json = await graphql(query);
  return new Response(JSON.stringify(json));
}
