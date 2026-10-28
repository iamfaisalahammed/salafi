
import Banner from "../../Sections/Banner";
import Channel from "../../Sections/Channel";
import Footer from "../../Sections/Footer";
// import IslamicDonation from "../../Sections/IslamicDonation";

import Nav from "../../Sections/Nav";
import Resources from "../../Sections/Resources";
import Scholars from "../../Sections/Scholars";
import Tools from "../Tools/Tools";
import Topics from "../../Sections/Topics";

const Home = () => {
  return (
    <div className="">
      <Nav></Nav>
      <Banner></Banner>
      
      <div id="tools">
      <Tools></Tools>
      </div>
      <div id="topics">
        <Topics></Topics>
      </div>
  
        <div id="resources">
        <Resources></Resources>
      </div>
      
      
      <div id="scholars">
        <Scholars></Scholars>
      </div>
      <div id="channels"> <Channel> </Channel> </div>

     {/* <IslamicDonation></IslamicDonation> */}
      <Footer></Footer>
    </div>
   
  );
};

export default Home;
