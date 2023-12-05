import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../constants/URL";
import BookCard from "../BookCard/BookCard";
import styles from "./AuthorBooks.module.scss";

const AuthorBooks = ({ books }) => {
  return (
    <Container className="py-5">
      {books && books.length > 0 ? (
        <>
          <Row>
            {books.map((book) => (
              <Col md={3} key={book._id} className="p-2">
                <div className="shadow">
                  <BookCard
                    name={book.name}
                    image={`${BASE_URL}/image/small/${book.image}`}
                    link={`/book/${book._id}`}
                    star={book.rating}
                    review={book.numberOfRating}
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
  );
};

export default AuthorBooks;
