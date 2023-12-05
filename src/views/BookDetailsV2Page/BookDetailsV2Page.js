import React, { useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookDetails } from "../../actions/Book.action";
import BookInfoV2 from "../../components/BookInfoV2/BookInfoV2";
import Footer from "../../components/Footer/Footer";
import { HeroCommon } from "../../components/HeroCommon";
import Topbar from "../../components/Topbar/Topbar";

const BookDetailsV2Page = ({ getBookDetails, data }) => {
  const { id } = useParams();
  useEffect(() => {
    getBookDetails(id);
  }, [id]);
  return (
    <>
      <Topbar />

      <HeroCommon title={data && data._id === id ? data.name : "Loading..."} />

      {data ? (
        <>
          <Container className="py-5">
            {data._id === id ? (
              <BookInfoV2 book={data} />
            ) : (
              <div className="py-5">
                <Spinner variant="dark" />
              </div>
            )}
          </Container>
        </>
      ) : (
        <></>
      )}
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.book.selected_book,
});

export default connect(mapStateToProps, { getBookDetails })(BookDetailsV2Page);
