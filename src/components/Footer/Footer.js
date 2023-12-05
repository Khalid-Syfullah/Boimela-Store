import { Nav } from "react-bootstrap";
import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={"border-top"}>
      <div className={styles.wrapper}>
        <div className="">
          <span className="d-block text-center fs-2">Boimela Foundation</span>
          <span className="d-block pb-4 pt-3 text-center fs-5">
            Book for everyone.
          </span>

          <div className="d-flex justify-content-center align-items-center flex-md-row flex-column pt-2 pb-3">
            <Nav.Link as={Link} to="/authors" className={styles.link}>
              Authors
            </Nav.Link>
            <Nav.Link as={Link} to="/publishers" className={styles.link}>
              Publishers
            </Nav.Link>
            <Nav.Link as={Link} to="/categories" className={styles.link}>
              Categories
            </Nav.Link>

            <Nav.Link as={Link} to="/register" className={styles.link}>
              Register
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className={styles.link}>
              Login
            </Nav.Link>
          </div>
          <hr className="w-50 mx-auto" />
          <span className="fs-5 text-center d-block pt-3">
            &copy;{new Date().getFullYear()} by Boimela Foundation
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
