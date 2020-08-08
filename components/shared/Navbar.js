
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import withApollo from '@/hoc/withApollo'
import { useState, useEffect } from 'react';
import { useLazyGetUser } from '../../apollo/actions';

const AppLink = ({ children, className, href }) =>
  <Link href={href}>
    <a className={`mr-3 ${className || ""}`}>{children}</a>
  </Link>

const AppNavbar = () => {
  const [user, setUser] = useState(null);
  const [hasResponse, setHasResponse] = useState(null);
  const [getUser, { data, error }] = useLazyGetUser();

  useEffect(() => {
    getUser();
  }, []);

  if (data) {
    if (data.user && !user) setUser(data.user);
    if (!data.user && user) setUser(null);
    if (!hasResponse) setHasResponse(true);
  }

  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-dark fj-mw9">

        <AppLink href="/" className="navbar-brand font-weight-bold">
          Bill Marques
        </AppLink>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <AppLink href="/portfolios" className="nav-link">Portfolios</AppLink>
            <AppLink href="/forum/categories" className="nav-link">Forum</AppLink>
            <AppLink href="/cv" className="nav-link">CV</AppLink>
          </Nav>
          {hasResponse &&
            <Nav>
              {user &&
                <>
                  <span className="nav-link mr-2">Welcome {user.username}</span>
                  <NavDropdown className="mr-2" title="Manage" id="basic-nav-dropdown">
                    {(user.role === 'admin' || user.role === 'instructor') &&
                      <AppLink href="/portfolios/new" className="dropdown-item">Create Portfolio</AppLink>
                    }
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
                  <AppLink href="/logout" className="nav-link btn btn-danger">Sign Out</AppLink>
                </>
              }
              {(error || !user) &&
                <>
                  <AppLink href="/login" className="nav-link">Sign In</AppLink>
                  <AppLink
                    href="/register"
                    className="nav-link btn btn-success bg-green-2 bright"
                  >
                    Sign Up
                  </AppLink>
                </>
              }
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default withApollo(AppNavbar);