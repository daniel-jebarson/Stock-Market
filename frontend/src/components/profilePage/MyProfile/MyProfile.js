import React from "react";

import ProfileCard from "../ProfileCard/ProfileCard";
function MyProfile() {
  // alert(sessionStorage.getItem("username"));
  return (
    <center>
      <section
        className="prof"
        style={{
          backgroundColor: "#0a507c",
          width: "fit-content",
          marginTop: "50px",
        }}
      >
        {/* <NavBar /> */}
        <ProfileCard />
      </section>
    </center>
  );
}

export default MyProfile;
