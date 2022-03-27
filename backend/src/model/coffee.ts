import "reflect-metadata";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class Coffee {

  @Field(type => ID)
  id: string;

  @Field()
  name: string;
}

export default Coffee;
