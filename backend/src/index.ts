import "reflect-metadata";
import { buildSchema } from "type-graphql";
import * as path from "path";
import { createServer } from "@graphql-yoga/node";
import { createContext } from './context';
import { resolvers } from "@generated/type-graphql";

async function main() {
  const schema = await buildSchema({
      resolvers: resolvers,
      dateScalarMode: "timestamp",
      // automatically create `schema.gql` file with schema definition in current folder
      emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = createServer({ schema, context: createContext });
  await server.start();
}

main();
