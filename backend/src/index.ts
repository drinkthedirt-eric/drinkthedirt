import "reflect-metadata";
import { buildSchema } from "type-graphql";
import * as path from "path";
import { createServer } from "@graphql-yoga/node";

import { CoffeeResolver } from "./coffee-resolver";

async function main() {
  const schema = await buildSchema({
      resolvers: [CoffeeResolver],
      // automatically create `schema.gql` file with schema definition in current folder
      emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = createServer({ schema });
  await server.start();
}

main();
