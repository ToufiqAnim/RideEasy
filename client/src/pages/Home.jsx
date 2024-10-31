import React from "react";
import Banner from "../components/Banner";
import Service from "../components/Service";
import Testimonials from "../components/Testimonial";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Banner />
      <Service />
      <Testimonials />
    </div>
  );
};

export default Home;
