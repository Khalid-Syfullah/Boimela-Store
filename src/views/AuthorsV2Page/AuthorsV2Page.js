import React from "react";
import AuthorsV2 from "../../components/AuthorsV2/AuthorsV2";
import Footer from "../../components/Footer/Footer";
import { HeroCommon } from "../../components/HeroCommon";
import Topbar from "../../components/Topbar/Topbar";

const AuthorsV2Page = () => {
  return (
    <>
      <Topbar />
      <HeroCommon title={"লেখক"} />
      <AuthorsV2 />
      <Footer />
    </>
  );
};

export default AuthorsV2Page;
