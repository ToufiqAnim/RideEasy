import React from "react";
import Banner from "../components/Banner";
import Service from "../components/Service";
import Testimonials from "../components/Testimonial";
import Cars from "./Cars/Cars";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <Service />
      <Cars />
      <Testimonials />
    </div>
  );
};

export default Home;
