import React from "react";
import Card from "./Card";
import TopicsComponent from "./TopicComponent";
import OwerClientSlider from "./OwerClientSlider";
import AboutUs from "./Aboutus";
import ContactUs from "./ContactUs";
import ServicesSection from "./ServicesSection";
import Banner1 from "./Banner1";
import Services from "./OurServices/Services";
import Solution from "./Solution/Solution";
import WhyUs from "./WhyUs";
import BrandScrolling from "./BrandScrolling";
import JoinIinsaf from "../JoinIinsaf";
import OrganizationScrolling from "./OrganizationScrolling";

const Home = ({
  activeTopic,
  setActiveTopic,
  activeCareer,
  setActiveCareer,
}) => {
  return (
    <div className="relative w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-blue-100 via-blue-400 to-[#f2effd] w-full">
        <Banner1 />
        <div className="flex items-center justify-center w-full">
          <div className="marqueenew w-full text-3xl">
            <span>
              IINSAF is a leading platform dedicated to promoting social justice through innovative technological solutions.
            </span>
          </div>
        </div>

        <Services
          activeCareer={activeCareer}
          setActiveCareer={setActiveCareer}
        />
        <Solution />
        <TopicsComponent
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
        />
        <OwerClientSlider />
        <WhyUs />
        <Card />
        <BrandScrolling />
        <OrganizationScrolling />
        <AboutUs />
        <ContactUs />
      </div>
    </div>
  );
};

export default Home;