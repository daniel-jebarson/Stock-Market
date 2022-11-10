import React, { useState } from "react";
import "./admin.css";
import AdminComp from "../components/AdminPage/admin";

const AdminPage = () => {
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  return username !== "admin" ? (
    <div
      style={{
        height: "100vh",
        background:
          "linear-gradient(90deg, rgb(53, 184, 220), rgb(239, 89, 241))",
      }}
    >
      <div style={{ paddingTop: "5%", marginLeft: "20%" }}>
        <div
          style={{
            backgroundColor: "azure",
            width: "75%",
            textAlign: "center",
            padding: "55px 0",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(180deg, rgb(53, 184, 220), rgb(239, 89, 241))",
              color: "transparent",
              backgroundClip: "text",

              webkitBackgroundClip: "text",
              webkitTextFillColor: "transparent",
              fontSize: "70px",
              textTransform: "uppercase",
              fontWeight: "bolder",
            }}
          >
            Access Denied
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: "400",
              marginTop: "30px",
              color: "black",
              textTransform: "uppercase",
            }}
          >
            OOPS! You don't have admin permission!
          </div>
          <div
            style={{
              marginTop: "30px",
              padding: "0px 100px",
              textAlign: "center",
              fontSize: "22px",
              color: "black",
            }}
          >
            Sorry you have been blocked from accessing this page since you don't
            have administrative previliges
          </div>
          <form
            style={{
              marginTop: "42px",
            }}
            action="/"
          >
            <button className="attackSubmitTransit" type="submit">
              Return Home
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <AdminComp />
    </div>
  );
};

export default AdminPage;
