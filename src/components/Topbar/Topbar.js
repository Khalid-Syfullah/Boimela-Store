import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import styles from "./Topbar.module.scss";
import logo from "../../assets/logo.png";
import { NavLink, Link } from "react-router-dom";

import { useModals } from "@mantine/modals";
import { logout } from "../../actions/Dashboard.action";
import LoginUser from "../LoginUser/LoginUser";
import { connect } from "react-redux";
import { RegUser } from "../RegUser";
import { EditUser } from "../EditUser";

const Topbar = ({ auth, user, logout }) => {
  const modal = useModals();
  const openLoginModal = () =>
    modal.openModal({
      title: "Login",
      children: (
        <>
          <LoginUser modals={modal} />
        </>
      ),
      centered: true,
      closeOnClickOutside: false,
    });
  const openRegModal = () =>
    modal.openModal({
      title: "Register",
      children: (
        <>
          <RegUser modals={modal} />
        </>
      ),
      centered: true,
      closeOnClickOutside: false,
    });
  const openEditModal = () =>
    modal.openModal({
      title: "Update Profile Name",
      children: (
        <>
          <EditUser modals={modal} />
        </>
      ),
      centered: true,
      closeOnClickOutside: false,
    });
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="shadow"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src={logo} alt="" className={styles.logo} />
            Boimela Foundation
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/authors">
                Authors
              </Nav.Link>
              <Nav.Link as={NavLink} to="/publishers">
                Publishers
              </Nav.Link>
              <Nav.Link eventKey={2} as={NavLink} to="/categories">
                Categories
              </Nav.Link>

              {!auth ? (
                <>
                  <Nav.Link onClick={openLoginModal}>Login</Nav.Link>
                  <Nav.Link onClick={openRegModal}>Register</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={openEditModal}>
                    {user && user.name}
                  </Nav.Link>
                  <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  auth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Topbar);
