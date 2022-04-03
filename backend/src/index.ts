import "reflect-metadata";
import { buildSchema } from "type-graphql";
import * as path from "path";
import express from "express";
import cors from "cors"
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
  const app = express()

  app.use('/graphql', server)
  app.use(cors())

  app.listen(4000, () => {
    console.log('Running a GraphQL API server on port 4000')
  })
}

main();
