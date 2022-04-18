import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image"
import ListGroup from "react-bootstrap/ListGroup";
import PageSpinner from "../components/PageSpinner";
import PageContainer from "../components/PageContainer";
import { useQuery, gql } from "@apollo/client";

interface Coffee {
  id: number,
  name: string,
  roaster: {
    id: number,
    name: string,
  }
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
      name: "Ethiopian blah be di blah",
      roaster: {
        id: 1,
        name: "Onda Origins"
      }
    },
    {
      id: 2,
      name: "Kenyan blah be di blah",
      roaster: {
        id: 1,
        name: "Onda Origins"
      }
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

  console.log(localCoffees)

  return (
    <PageContainer>
      <h2>Coffee</h2>
      <p>Browse coffee reviews, recipes, and other information.</p>
      <ListGroup>
      { coffeeListItems }
      </ListGroup>
    </PageContainer>
  );
}

function coffeesListItem(coffee: Coffee) {
  return (
      <ListGroup.Item key={coffee.id} style={styles.coffeeListItem}>
        <Stack direction="horizontal" style={styles.coffeeListItemStack} gap={1}>
            <Image src="https://cdn.shopify.com/s/files/1/1329/3307/products/umoja_740x.png?v=1637006798" fluid style={styles.coffeeThumbnail} />
            <Stack>
                <small><i>{coffee.roaster.name}</i></small>
                <b>{coffee.name}</b>
                <p>Lorem Ipsum I like Coffees</p>
            </Stack>
        </Stack>
      </ListGroup.Item>
  );
}

const styles: {[key:string]: any} = {
  coffeeListItem: {
    height: 100,
    padding: 0
  },
  coffeeListItemStack: {
    height: "100%",
  },
  coffeeListItemStackRow: {
    height: "100%",
  },
  coffeeThumbnail: {
    height: "100%"
  },
};


export default CoffeesPage;
