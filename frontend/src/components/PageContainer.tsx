import Container from "react-bootstrap/Container";

function PageContainer(props: {children: any}) {
  return (
    <Container style={style}>
    { props.children }
    </Container>
  );
}

const style: {[key:string]: any} = {
  marginTop: 5
};

export default PageContainer;
