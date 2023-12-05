import React from "react";
import Footer from "../../components/Footer/Footer";
import { HeroCommon } from "../../components/HeroCommon";
import { PublishersV2 } from "../../components/PublishersV2";
import Topbar from "../../components/Topbar/Topbar";

const PublishersV2Page = () => {
  return (
    <>
      <Topbar />
      <HeroCommon title={"প্রকাশনী"} />
      <PublishersV2 />
      <Footer />
    </>
  );
};

export default PublishersV2Page;
