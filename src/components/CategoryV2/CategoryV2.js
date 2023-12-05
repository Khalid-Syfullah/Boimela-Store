import React from "react";
import { useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { getCategoryList } from "../../actions/Category.action";
import { CategoryCard } from "../CategoryCard";
import styles from "./CategoryV2.module.scss";

const CategoryV2 = ({ categorys, getCategoryList }) => {
  useEffect(() => {
    if (!categorys) {
      getCategoryList(1);
    }
  }, []);
  return (
    <Container>
      {!categorys ? (
        <div className="py-5">
          <Spinner variant="dark" />
        </div>
      ) : (
        <>
          <Row className="py-5">
            {categorys.map((category, i) => (
              <Col key={category._id} md={3} className="p-3">
                <CategoryCard
                  name={category.name}
                  link={`/categories/${category._id}`}
                  i={i + 1}
                />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  categorys: state.category.category,
});
export default connect(mapStateToProps, { getCategoryList })(CategoryV2);
