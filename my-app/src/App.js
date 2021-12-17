// Import Dependencies
import './App.css';
import { Navbar, Nav, Container} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import Components
import { View } from './components/view'
import { ViewStories } from './components/viewStories'
import { Welcome } from './components/hello';

// Function to Render App
function App() {
  // Render Application
  return (
    <div className="App">
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/">Projects & Stories</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='me-auto'>
              <Nav.Link href="/view">View Projects</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
        <br/>
        {/* Routing */}
        <Switch>
          <Route path="/" exact><Welcome/></Route>
          <Route path={"/projects/:id"} component={ViewStories}></Route>
          <Route path="/view"><View/></Route>
        </Switch>
      </Router>
      <footer>&copy;G00385338</footer>
    </div>
  );
}

export default App;
