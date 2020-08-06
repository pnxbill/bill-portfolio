
import { Navbar, Nav } from 'react-bootstrap';
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
                  <span className="nav-link mr-4">Welcome {user.username}</span>
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