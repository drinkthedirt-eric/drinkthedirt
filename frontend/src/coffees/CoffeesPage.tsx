import ListGroup from "react-bootstrap/ListGroup";
import PageSpinner from "../components/PageSpinner";
import PageContainer from "../components/PageContainer";
import { useQuery, gql } from "@apollo/client";

interface Coffee {
  id: number,
  name: string
}

const GET_COFFEES_LIST = gql`
  query {
    coffees {
      id
      name
    }
  }
`;

function CoffeesPage() {
  const { loading, error, data } = useQuery(GET_COFFEES_LIST);
  const localCoffees: Coffee[] = [
    {
      id: 1,
      name: "Something or other"
    },
    {
      id: 2,
      name: "Something or other 2"
    }
  ];

  if (loading) {
    return (
      <PageContainer>
        <PageSpinner />
      </PageContainer>
    );
  }

  if (error || data == null) {
    return (
      <PageContainer>
        <p>ERROR</p>
      </PageContainer>
    );
  }

  // const coffeeListItems = data.coffees.map((coffee: Coffee) => coffeesListItem(coffee));
  const coffeeListItems = localCoffees.map((coffee: Coffee) => coffeesListItem(coffee));

  return (
    <PageContainer>
      <h2>Coffees</h2>
      <p>Browse coffee reviews, recipes, and other information.</p>
      <ListGroup>
      { coffeeListItems }
      </ListGroup>
    </PageContainer>
  );
}

function coffeesListItem(coffee: Coffee) {
  return (
      <ListGroup.Item key={coffee.id}>
        <div>
          <h4>{coffee.name}</h4>
          <p>
            <p>Lorem Ipsum I like Coffees</p>
          </p>
        </div>
      </ListGroup.Item>
  )
}

export default CoffeesPage;
