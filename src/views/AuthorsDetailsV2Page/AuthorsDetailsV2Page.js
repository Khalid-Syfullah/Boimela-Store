import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getAuthorDetails } from "../../actions/Author.action";
import AuthorBooks from "../../components/AuthorBooks/AuthorBooks";
import AuthorsV2 from "../../components/AuthorsV2/AuthorsV2";
import Footer from "../../components/Footer/Footer";
import { HeroCommon } from "../../components/HeroCommon";
import Topbar from "../../components/Topbar/Topbar";

const AuthorsDetailsV2Page = ({ getAuthorDetails, data }) => {
  const { id } = useParams();
  useEffect(() => {
    getAuthorDetails(id);
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
  data: state.author.selected_author,
});

export default connect(mapStateToProps, { getAuthorDetails })(
  AuthorsDetailsV2Page
);
