import { Avatar } from "@mantine/core";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.scss";

const CategoryCard = ({ name, link, i }) => {
  return (
    <div className={`${styles.wrapper} shadow`}>
      <Row>
        <Col xs={4}>
          <Avatar color="yellow" radius="xl">
            {i}
          </Avatar>
        </Col>
        <Col xs={8}>
          <Link to={link} className={styles.link}>
            {name}
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default CategoryCard;
