import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getPublisherDetails } from "../../actions/Publisher.action";
import AuthorBooks from "../../components/AuthorBooks/AuthorBooks";
import Footer from "../../components/Footer/Footer";
import { HeroCommon } from "../../components/HeroCommon";
import Topbar from "../../components/Topbar/Topbar";

const PublishersDetailsV2Page = ({ getPublisherDetails, data }) => {
  const { id } = useParams();
  useEffect(() => {
    getPublisherDetails(id);
  }, [id]);
  return (
    <>
      <Topbar />
      <HeroCommon title={data && data._id === id ? data.name : "Loading..."} />
      {data && data._id === id ? <AuthorBooks books={data.books} /> : <></>}
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.publisher.selected_publisher,
});

export default connect(mapStateToProps, { getPublisherDetails })(
  PublishersDetailsV2Page
);
