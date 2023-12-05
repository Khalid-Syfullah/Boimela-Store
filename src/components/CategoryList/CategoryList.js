import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Moment from "react-moment";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CategoryList.module.scss";
import { connect } from "react-redux";
import { BsFileEarmarkPlus, BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { deleteCategory, getCategoryList } from "../../actions/Category.action";
import { useModals } from "@mantine/modals";
import { Text } from "@mantine/core";
import { toast } from "react-toastify";

const CategoryList = ({ categories, getCategoryList, deleteCategory }) => {
  const [list, setList] = useState(categories === null ? [] : categories);
  const modals = useModals();
  const navigate = useNavigate();

  useEffect(() => {
    if (categories === null) {
      getCategoryList();
    }
    if (categories !== null) {
      setList(categories);
    }
  }, [categories]);

  const [searchText, setSearchText] = useState("");

  const searchHandeler = (text) => {
    if (text !== "") {
      setList(
        categories.filter((item) => {
          return item.name.toLowerCase().includes(text.toLowerCase());
        })
      );
    } else {
      setList(categories);
    }
    setSearchText(text);
  };

  // DELETE HANDELER
  const deleteHandeler = (id) =>
    modals.openConfirmModal({
      title: "Delete this category",
      centered: true,
      children: (
        <Text size="md">
          Are you sure you want to delete this category? This action is
          destructive and you can not undo it.
        </Text>
      ),
      labels: { confirm: "Delete category", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => confirmHandeler(id),
    });

  // On CONFIRM DELETE
  const confirmHandeler = async (id) => {
    let check = await deleteCategory(id);
    if (check === true) {
      toast.success("Category deleted successfully");
      navigate("/category");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Container className="pb-4">
      <div className="d-flex justify-content-between align-items-center pb-3 ">
        <div className="d-flex align-items-center w-100">
          <span className="d-block fs-4">Search Category</span>
          <Form.Control
            type="text"
            placeholder="Search category by name..."
            className={`${styles.searchInput}`}
            onChange={(e) => searchHandeler(e.target.value)}
            value={searchText}
          />
        </div>
        <div className="">
          <Link to="/category/add" className={styles.add}>
            <BsFileEarmarkPlus />
          </Link>
        </div>
      </div>
      <Card className="crd p-md-4 pb-md-0 p-2">
        <Card.Body>
          {categories === null ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: 600 }}
            >
              <Spinner variant="dark" animation="grow" />
            </div>
          ) : (
            <>
              {list.length === 0 && (
                <span className="d-block text-center fs-4 lead pb-4">
                  No Category Found
                </span>
              )}
              {list !== null &&
                list.map((player, i) => (
                  <Row
                    key={player._id}
                    className={`mb-3 pb-3 ${
                      list.length - 1 === i ? "" : "border-bottom"
                    }`}
                  >
                    <Col md={11} className="">
                      <div className="">
                        <Link
                          to={`/category/${player._id}`}
                          className={` fw-bold ${styles.link}`}
                        >
                          {player.name}
                        </Link>
                      </div>
                      <span className="d-block fw-light text-secondary">
                        <Moment format="dddd, MMMM DD YYYY">
                          {player.createdAt}
                        </Moment>
                      </span>
                    </Col>

                    <Col
                      md={1}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Link
                        to={`/category/${player._id}/edit`}
                        className={` fw-bold fs-4 ${styles.link}`}
                      >
                        <AiOutlineEdit />
                      </Link>
                      <span
                        className={`ms-3 fw-bold fs-4 ${styles.link}`}
                        onClick={() => deleteHandeler(player._id)}
                      >
                        <BsTrash className="text-danger" />
                      </span>
                    </Col>
                  </Row>
                ))}
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  categories: state.category.category,
});

export default connect(mapStateToProps, { getCategoryList, deleteCategory })(
  CategoryList
);
