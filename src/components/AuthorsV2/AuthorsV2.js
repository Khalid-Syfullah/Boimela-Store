import React from "react";
import { useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { getAuthorList } from "../../actions/Author.action";
import AuthorCard from "../AuthorCard/AuthorCard";
import styles from "./AuthorsV2.module.scss";

const AuthorsV2 = ({ authors, getAuthorList }) => {
  useEffect(() => {
    if (!authors) {
      getAuthorList(1);
    }
  }, []);
  return (
    <Container>
      {!authors ? (
        <div className="py-5">
          <Spinner variant="dark" />
        </div>
      ) : (
        <>
          <Row className="py-5">
            {authors.items.map((author) => (
              <Col key={author._id} md={3} className="p-3">
                <AuthorCard author={author} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  authors: state.author.author,
});
export default connect(mapStateToProps, { getAuthorList })(AuthorsV2);
