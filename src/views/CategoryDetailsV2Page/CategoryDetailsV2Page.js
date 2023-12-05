import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategoryDetails } from "../../actions/Category.action";
import AuthorBooks from "../../components/AuthorBooks/AuthorBooks";
import BookCard from "../../components/BookCard/BookCard";
import Footer from "../../components/Footer/Footer";
import { HeroCommon } from "../../components/HeroCommon";
import Topbar from "../../components/Topbar/Topbar";
import { BASE_URL } from "../../constants/URL";

const CategoryDetailsV2Page = ({ getCategoryDetails, data }) => {
  const { id } = useParams();
  useEffect(() => {
    getCategoryDetails(id);
  }, [id]);
  console.log(data);
  return (
    <>
      <Topbar />

      <HeroCommon title={data && data._id === id ? data.name : "শ্রেণী"} />

      {data ? (
        <>
          <Container className="py-5">
            {data.books && data.books.length > 0 ? (
              <>
                <Row>
                  {data.books.map((book) => (
                    <Col md={3} key={book._id} className="p-2">
                      <div className="shadow">
                        <BookCard
                          name={book.name}
                          image={`${BASE_URL}/image/small/${book.image}`}
                          link={`/book/${book._id}`}
                          star={book.rating}
                          review={book.numberOfRating}
                          author={book.writer.name}
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
              </>
            ) : (
              <>
                <span className="d-block text-center fs-1">No Book Found!</span>
              </>
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
  data: state.category.selected_category,
});

export default connect(mapStateToProps, { getCategoryDetails })(
  CategoryDetailsV2Page
);
