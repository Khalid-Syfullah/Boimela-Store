import React from "react";
import { useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { getPublisherList } from "../../actions/Publisher.action";
import AuthorCard from "../AuthorCard/AuthorCard";
import { PublisherCard } from "../PublisherCard";
import styles from "./PublishersV2.module.scss";

const PublishersV2 = ({ publishers, getPublisherList }) => {
  useEffect(() => {
    if (!publishers) {
      getPublisherList(1);
    }
  }, []);
  return (
    <Container>
      {!publishers ? (
        <div className="py-5">
          <Spinner variant="dark" />
        </div>
      ) : (
        <>
          <Row className="py-5">
            {publishers.items.map((publisher) => (
              <Col key={publisher._id} md={3} className="p-3">
                <PublisherCard publisher={publisher} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  publishers: state.publisher.publisher,
});
export default connect(mapStateToProps, { getPublisherList })(PublishersV2);
