import logo from '../../assets/001.jpg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './Navbar.css';

import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../../action/userAction';

function Header() {
  const navigate = useNavigate();

  const userSiginin = useSelector((state) => state.userSignin);
  const { userInfo } = userSiginin;
  // console.log(userInfo);
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
    navigate('/signin');
    toast.success('siginin out successfully');
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin');
    }
  }, [navigate, userInfo]);

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        style={{
          borderBottom: "solid 3px blue",
          // position: "fixed",
          height: "62px",
          width: "100%",
          zIndex: "100",
          background: "#fff",
          padding: "10px",
          justifyItems: "center",
        }}
      >
        <Container>
          <Navbar.Brand to="/HomeB">
            <img src={logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <div>
              <Nav className="me-auto">
                <NavLink
                  to="/HomeB"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "hef"
                  }
                >
                  HOME
                </NavLink>
                <NavLink
                  to="/HomeB/PublicationB"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "hef"
                  }
                >
                  PUBLICATIONS
                </NavLink>
                <NavLink
                  to="/HomeB/PartnersB"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "hef"
                  }
                >
                  PARTNERS
                </NavLink>
                {userInfo.isAdmin === "admin" && (
                  <NavLink
                    to="/HomeB/users"
                    className={({ isActive }) =>
                      isActive ? "active-link" : "hef"
                    }
                  >
                    Users
                  </NavLink>
                )}

                <NavLink
                  to="/HomeB/Resumes"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "hef"
                  }
                >
                  Resumes
                </NavLink>
                <Button
                  type="button"
                  className="btn btn-info"
                  onClick={signoutHandler}
                >
                  Logout
                </Button>
                <div
                  style={{
                    marginTop: "12px",
                    marginLeft: "26px",
                  }}
                >
                  <h6 style={{ color: "rgb(64 124 185)", marginLeft: "1rem" }}>
                    {userInfo ? (
                      <div>
                        welcome
                        <div>
                          <span>
                            <strong style={{ color: "blueviolet" }}>
                              {userInfo.firstname}
                            </strong>
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </h6>
                </div>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
