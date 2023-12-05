import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants/URL";
import styles from "./AuthorCard.module.scss";

const AuthorCard = ({ author }) => {
  return (
    <Card style={{ width: "100%" }} className="shadow">
      <Card.Body>
        <div className="p-3">
          <img
            crossOrigin="anonymous"
            src={`${BASE_URL}/image/small/${author.image}`}
            alt={author.name}
            className={`${styles.img} rounded-circle`}
          />
        </div>
        <Link
          to={`/authors/${author._id}`}
          className={`d-block text-center  fw-bold text-decoration-none text-dark ${styles.link}`}
        >
          {author.name}
        </Link>
      </Card.Body>
    </Card>
  );
};

export default AuthorCard;
