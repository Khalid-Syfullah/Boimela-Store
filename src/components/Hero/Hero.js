import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { FiExternalLink } from "react-icons/fi";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { getThisWeekBook } from "../../actions/Landing.action";
import { BASE_URL } from "../../constants/URL";
import styles from "./Hero.module.scss";
import logo from "../../assets/logo.png";

const Hero = ({ getThisWeekBook, week, auth }) => {
  useEffect(() => {
    if (!week) {
      getThisWeekBook();
    }
  }, []);
  const navigate = useNavigate();
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
          slidesToShow: 2,
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
      <div className="text-center pt-3">
        <img src={logo} alt="" style={{ width: 150 }} />
      </div>
      <div className="text-center pt-3">
        <span className="d-block text-center fs-3">Boimela Foundation</span>
      </div>
      <div className={styles.bg}></div>
      <h1 className="py-5 text-center">এই সপ্তাহের নির্বাচিত বই</h1>
      <Container className="">
        <Slider {...settings}>
          {week && week.books && week.books.length > 0 ? (
            week.books.map((book) => (
              <div key={book._id}>
                <span
                  className="d-block fw-bold text-center pb-3"
                  style={{ color: "#5B5A31" }}
                >
                  {book.name}
                </span>
                <div
                  className={`${styles.slide} shadow`}
                  onClick={() => navigate(`/book/${book._id}`)}
                >
                  <img
                    crossOrigin="true"
                    src={`${BASE_URL}/image/small/${book.image}`}
                    alt={book.name}
                    className={styles.img}
                  />
                  <div className={styles.text}>
                    <span className="d-block fs-1 fw-bold text_primary ">
                      <FiExternalLink />
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
          {week && week.books && week.books.length > 0 ? (
            week.books.map((book) => (
              <div key={book._id}>
                <span
                  className="d-block fw-bold text-center pb-3"
                  style={{ color: "#5B5A31" }}
                >
                  {book.name}
                </span>
                <div
                  className={`${styles.slide} shadow`}
                  onClick={() => navigate(`/book/${book._id}`)}
                >
                  <img
                    crossOrigin="true"
                    src={`${BASE_URL}/image/small/${book.image}`}
                    alt={book.name}
                    className={styles.img}
                  />
                  <div className={styles.text}>
                    <span className="d-block fs-1 fw-bold text_primary ">
                      <FiExternalLink />
                    </span>
                  </div>
                </div>
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
  week: state.landing.week,
  auth: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { getThisWeekBook })(Hero);
