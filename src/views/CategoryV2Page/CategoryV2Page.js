import React from "react";
import CategoryV2 from "../../components/CategoryV2/CategoryV2";
import Footer from "../../components/Footer/Footer";
import { HeroCommon } from "../../components/HeroCommon";
import Topbar from "../../components/Topbar/Topbar";

const CategoryV2Page = () => {
  return (
    <>
      <Topbar />
      <HeroCommon title={"শ্রেণী"} />
      <CategoryV2 />
      <Footer />
    </>
  );
};

export default CategoryV2Page;
