import React from 'react';
import Container from 'react-bootstrap/Container'
import { useQuery, gql } from "@apollo/client";

const DEMO_COFFEE = gql`
  query {
    coffee(where:{id:1}) {
      id
      name
    }
  }
`;

function CoffeesPage() {
  const { loading, error, data } = useQuery(DEMO_COFFEE);

  if (error) {
    return (
      <Container>
        <p>ERROR</p>
      </Container>
    );
  }

  return (
    <Container>
      <p>This page has lots of info about roasters and coffees.</p>
      <p>
        { data != null && data.coffee.name }
      </p>
    </Container>
  );
}

export default CoffeesPage;
