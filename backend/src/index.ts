import "reflect-metadata";
import { buildSchema } from "type-graphql";
import * as path from "path";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createServer } from "@graphql-yoga/node";
import { createContext } from './context';
import { 
  Coffee,
  Roaster,
  FindUniqueCoffeeResolver,
  FindUniqueRoasterResolver,
  FindManyCoffeeResolver,
  AggregateCoffeeResolver,
  AggregateRoasterResolver,
  FindManyRoasterResolver,
  CoffeeRelationsResolver,
 } from "@generated/type-graphql";

async function main() {
  const schema = await buildSchema({
      resolvers: [
        Coffee,
        Roaster,
        FindUniqueCoffeeResolver,
        FindUniqueRoasterResolver,
        FindManyCoffeeResolver,
        AggregateCoffeeResolver,
        AggregateRoasterResolver,
        FindManyRoasterResolver,
        CoffeeRelationsResolver,
      ],
      dateScalarMode: "timestamp",
      // automatically create `schema.gql` file with schema definition in current folder
      emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = createServer({ schema, context: createContext });
  const app = express();

  app.use('/graphql', server);
  app.use(morgan('tiny'));
  app.use(cors());

  // Health check
  app.get('/health', function(req, res) {
    res.status(200).send('OK');
  });

  app.listen(4000, () => {
    console.log('Running a GraphQL API server on port 4000')
  });
}

main();
