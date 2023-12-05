import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-stars";
import toBn from "../../utils/toBn";
import styles from "./BookCard.module.scss";

const BookCard = ({ image, name, star, link, review, author }) => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.wrapper}`}>
      <img
        src={image}
        crossOrigin="true"
        className={`${styles.img}`}
        alt=""
        onClick={() => navigate(link)}
      />
      <Link to={link} className={styles.link}>
        {name}
      </Link>
      <span className="d-block text-center">{author ? author : ""}</span>

      {review ? (
        <>
          <div className="">
            {star ? (
              <ReactStars
                count={5}
                value={star}
                size={24}
                color2={"#f68a3c"}
                edit={false}
              />
            ) : (
              <ReactStars
                count={5}
                value={4.5}
                size={24}
                color2={"#f68a3c"}
                edit={false}
              />
            )}
          </div>
          <span className="d-block text-secondary">
            {toBn(review ? parseInt(review) : 122)} রিভিউ
          </span>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BookCard;
