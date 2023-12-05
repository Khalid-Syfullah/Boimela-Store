import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants/URL";
import styles from "./PublisherCard.module.scss";

const PublisherCard = ({ publisher }) => {
  return (
    <Card style={{ width: "100%" }} className="shadow">
      <Card.Body>
        <div className="p-3">
          <img
            crossOrigin="anonymous"
            src={`${BASE_URL}/image/small/${publisher.image}`}
            alt={publisher.name}
            className={`${styles.img} rounded-circle`}
          />
        </div>
        <Link
          to={`/publishers/${publisher._id}`}
          className={`d-block text-center  fw-bold text-decoration-none text-dark ${styles.link}`}
        >
          {publisher.name}
        </Link>
      </Card.Body>
    </Card>
  );
};

export default PublisherCard;
