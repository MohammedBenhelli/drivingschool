import Routing from "./components/Routing";
import {Container} from "react-bootstrap";
import Header from "./components/Header";

function App() {
  return (<>
      <Header/>
      <Container>
        <Routing />
      </Container>
  </>);
}

export default App;
