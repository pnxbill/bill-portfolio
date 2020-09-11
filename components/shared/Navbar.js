
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import withApollo from '@/hoc/withApollo'
import { useState, useEffect } from 'react';
import { useLazyGetUser } from '../../apollo/actions';

const AppLink = ({ children, className, href, as }) =>
  <Link href={href} as={as}>
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
                      <>
                        <AppLink href="/portfolios/new" className="dropdown-item">Create Portfolio</AppLink>
                        <AppLink
                          href="/instructor/[id]/dashboard"
                          as={`/instructor/${user._id}/dashboard`}
                          className="dropdown-item"
                        >
                          Dashboard
                      </AppLink>
                      </>
                    }
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

// exporting component use withApollo 
export default withApollo(AppNavbar);