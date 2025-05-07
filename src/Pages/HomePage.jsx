import Header from "../Components/Header";
import HomePageBody from "../Components/HomePageBody";
import FAQsSection from "../Components/FAQsSection";
import GetInTouch from "../Components/GetInTouch";
import Footer from "../Components/Footer";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../helperFunctions/UserContext"; // Import from new location
import { Link } from "react-router-dom";

//      </Link><Link to={`/EditFirmProfile/${}`}>

function HomePage() {
  const { userData, setUserData } = useContext(UserDataContext);
  const[links,setLinks] = useState(null); 

useEffect(()=>{
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUserData(JSON.parse(storedUser));
  }

},[]);

  useEffect(() => {
    
    let account = null;

if(userData && userData.userType === "firm"){
account = "My firm";
}
else if(userData && userData.userType === "client") {
  account = "My account";
}
else{
  account = null;
  console.log("none ");
}

if(account){
  if(account==="My firm"){
    setLinks( [
      { item: "My account",direction: `/EditFirmProfile/${userData.accountingFirm}` },
    ]);
  }
  else{
    setLinks( [
      { item: "My account",direction: "/UserRequests" },
    ]);
  }
}
else{
}
  }, [userData]);



  

  return (
    <>
      <Header menuItems={links}></Header>
      <HomePageBody />
      <FAQsSection />
      <GetInTouch />
      <Footer />
    </>
  );
}

export default HomePage;
