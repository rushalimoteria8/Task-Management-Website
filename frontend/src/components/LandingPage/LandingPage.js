import React from "react";
import { Fragment } from "react";
import LandingPageHeader from "./LandingPageHeader";
import IntroSection from "./IntroSection";
import LandingSection1 from "./LandingSection1";
import LandingSection2 from "./LandingSection2";
import ScrollTop from "../ScrollTop";

const LandingPage = (props) => {
  return (
    <Fragment>
      <LandingPageHeader joinButton={true}> </LandingPageHeader>
      <IntroSection></IntroSection>
      <LandingSection1></LandingSection1>
      <LandingSection2></LandingSection2>
      <ScrollTop/>
    </Fragment>
  );
};

export default LandingPage;