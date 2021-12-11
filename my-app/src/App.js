import logo from './logo.svg';
import './App.css';
import { Content } from './components/content';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="#home">My App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='me-auto'>
              <Nav.Link href="#read">Read</Nav.Link>
              <Nav.Link href="#create">Create</Nav.Link>
              <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/1">Action 1</NavDropdown.Item>
                <NavDropdown.Item href="#action/2">Action 2</NavDropdown.Item>
                <NavDropdown.Item href="#action/3">Action 3</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
        <br/>
        <Routes>
          <Route path='#home' element={<Content/>} />
          <Route path='#read' element={<Content/>}/>
          <Route path='#create' element={<Content/>}/>
          <Route/>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
