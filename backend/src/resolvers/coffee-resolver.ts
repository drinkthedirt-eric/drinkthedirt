import {
  Resolver,
  Query,
  FieldResolver,
  Arg,
  Root,
  Mutation,
  Int,
  ResolverInterface,
} from 'type-graphql';
import Coffee from '../model/coffee';

@Resolver(Coffee)
export class CoffeeResolver  {

  @Query(returns => Coffee, { nullable: true })
  async coffee(): Promise<Coffee | undefined> {
    const coffee = Object.assign(new Coffee(), {
      id: "coffee_1",
      name: "Your Favorite Coffee",
    });
    return coffee;
  }
}
