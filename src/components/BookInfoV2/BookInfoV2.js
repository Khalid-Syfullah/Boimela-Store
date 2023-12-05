import React from "react";
import { Col, Row } from "react-bootstrap";
import { BsCloudDownload, BsFileEarmarkMusic } from "react-icons/bs";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-stars";
import { BASE_URL } from "../../constants/URL";
import styles from "./BookInfoV2.module.scss";

const BookInfoV2 = ({ book, isAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Row>
        <Col md={3} className="d-flex justify-content-end align-items-center ">
          <img
            src={`${BASE_URL}/image/small/${book.image}`}
            crossOrigin="true"
            className="w-75"
            alt={book.name}
          />
        </Col>
        <Col md={4} className="ps-4 border-end">
          <h2>{book.name}</h2>
          <span className="d-block pt-2 h5">{book?.writer?.name}</span>

          <span className="d-block pt-2">
            <span className="fw-bold me-2">Year: </span>
            {book.year}
          </span>
          <span className="d-block py-2">
            <span className="fw-bold me-2">Edition: </span>
            {book.edition}
          </span>

          <ReactStars
            count={5}
            value={parseInt(book.rating)}
            size={24}
            color2={"#f68a3c"}
            edit={false}
          />

          {book.numberOfRating ? (
            <span className="d-block text-secondary  pt-2">
              {parseInt(book.numberOfRating)} রিভিউ
            </span>
          ) : (
            <></>
          )}
          {isAuthenticated === true ? (
            <div className="d-flex align-items-start justify-content-between pt-4 flex-column">
              {book.pdfFile ? (
                <button
                  onClick={() => navigate(`/read/${book.pdfFile}`)}
                  className={`btn btn-warning fw-bold mb-3 ${styles.btn}`}
                >
                  <BsCloudDownload /> Read eBook
                </button>
              ) : (
                <></>
              )}
              {book.audioFile ? (
                <a
                  target={"_blank"}
                  href={`${BASE_URL}/files/${book.audioFile}`}
                  download
                  className={`btn btn-warning fw-bold ${styles.btn}`}
                >
                  <BsFileEarmarkMusic /> Download Audio
                </a>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <span className="d-block text-danger pt-4">
              Please login to read the book.
            </span>
          )}
        </Col>
        <Col md={4} className="ps-4">
          <span className="d-block h3">Description</span>
          <span className="d-block ">{book.description}</span>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(BookInfoV2);
