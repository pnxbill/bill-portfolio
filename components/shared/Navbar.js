
import { Navbar, Navdropdown, Nav } from 'react-bootstrap';


const AppNavbar = () => {

  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-dark fj-mw9">
        <Navbar.Brand className="mr-3 font-weight-bold" href="#">
          Bill Marques
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link className="mr-3" href="#" >
              Portfolios
            </Nav.Link>
            <Nav.Link className="mr-3" href="#">
              Forum
            </Nav.Link>
            <Nav.Link className="mr-3" href="#">
              Cv
            </Nav.Link>
            <Nav.Link className="mr-3" href="#">
              Ask me
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="mr-3" href="#">
              Sign Up
            </Nav.Link>
            <Nav.Link className="mr-3 btn btn-success bg-green-2 bright" href="#">
              Sign In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default AppNavbar;