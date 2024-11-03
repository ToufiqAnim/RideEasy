import React from "react";
import Banner from "../components/Banner";
import Service from "../components/Service";
import Testimonials from "../components/Testimonial";
import Cars from "./Cars/Cars";
import WhyChooseUs from "../components/WhyChooseUs";
import CarRentalProcess from "../components/RentalProcess";
import ArticlesSection from "../components/ArticleSection";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <Service />
      <Cars />
      <Testimonials />
      {/* <CarGallery /> */}
      <WhyChooseUs />
      <CarRentalProcess />
      <ArticlesSection />
    </div>
  );
};

export default Home;
