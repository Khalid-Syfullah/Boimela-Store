import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { getBestSellerBook } from "../../actions/Landing.action";
import { BASE_URL } from "../../constants/URL";
import styles from "./BestSellerSection.module.scss";
import BookCard from "../BookCard/BookCard";

const BestSellerSection = ({ getBestSellerBook, week, auth }) => {
  useEffect(() => {
    if (!week) {
      getBestSellerBook();
    }
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.bg}></div>

      <Container className="">
        <h2 className="">বেস্টসেলার</h2>
        <div className={styles.line}></div>
        <Slider {...settings}>
          {week && week.books && week.books.length > 0 ? (
            week.books.map((book) => (
              <div key={book._id}>
                <BookCard
                  name={book.name}
                  image={`${BASE_URL}/image/small/${book.image}`}
                  link={`/book/${book._id}`}
                />
              </div>
            ))
          ) : (
            <></>
          )}
          {week && week.books && week.books.length > 0 ? (
            week.books.map((book) => (
              <div key={book._id}>
                <BookCard
                  name={book.name}
                  image={`${BASE_URL}/image/small/${book.image}`}
                  link={`/book/${book._id}`}
                />
              </div>
            ))
          ) : (
            <></>
          )}
        </Slider>
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => ({
  week: state.landing.best,
  auth: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { getBestSellerBook })(
  BestSellerSection
);
