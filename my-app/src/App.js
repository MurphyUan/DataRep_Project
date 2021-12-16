// Import Dependencies
import './App.css';
import { Navbar, Nav, Container} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import Components
import { Content } from './components/content'
import { View } from './components/view'
import { EditProject } from './components/editProject'

// Function to Render App
function App() {
  // Render Application
  return (
    <div className="App">
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/">My App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='me-auto'>
              <Nav.Link href="/projects">View Projects</Nav.Link>
              <Nav.Link href="/projects/add">Add</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
        <br/>
        {/* Routing */}
        <Switch>
          <Route path="/" exact><Content/></Route>
          <Route path="/projects"><View/></Route>
          <Route path={"/projects/add"}><Content/></Route>
          <Route path={"/projects/:id"}><EditProject/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
