import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

function PageSpinner() {

  return (
    <div style={style}>
      <Spinner animation="border" />
    </div>
  );
}

const style: {[key:string]: any} = {
  height: "60vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default PageSpinner;
