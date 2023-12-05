import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { FiExternalLink } from "react-icons/fi";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { getThisWeekBook } from "../../actions/Landing.action";
import { BASE_URL } from "../../constants/URL";
import styles from "./HeroCommon.module.scss";
import logo from "../../assets/logo.png";

const HeroCommon = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      {/* <div className="text-center pt-3">
        <img src={logo} alt="" style={{ width: 150 }} />
      </div>
      <div className="text-center pt-3">
        <span className="d-block text-center fs-3">Boimela Foundation</span>
      </div> */}
      <div className={styles.bg}></div>
      <h1 className="py-5 text-center">{title}</h1>
    </div>
  );
};

export default HeroCommon;
