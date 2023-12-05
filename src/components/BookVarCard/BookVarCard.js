import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import toBn from "../../utils/toBn";
import styles from "./BookVarCard.module.scss";

const BookVarCard = ({ image, name, star, link, review }) => {
  return (
    <div className={`${styles.wrapper} `}>
      <Row>
        <Col xs={12}>
          <img
            src={image}
            crossOrigin="true"
            className={`${styles.img}`}
            alt=""
          />
        </Col>
        <Col xs={12}>
          <Link to={link} className={styles.link}>
            {name}
          </Link>
          {star ? <></> : <></>}

          {review ? (
            <>
              <span className="d-block">মুহম্মদ জাফর ইকবাল</span>
              <div className="">
                <ReactStars
                  count={5}
                  value={4.5}
                  size={24}
                  color2={"#f68a3c"}
                  edit={false}
                />
              </div>
              <span className="d-block text-secondary">{toBn(122)} রিভিউ</span>
            </>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BookVarCard;
