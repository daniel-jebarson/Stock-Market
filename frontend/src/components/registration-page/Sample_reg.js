import { React, useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { que } from "query-string";
import Axios from "axios";
import "./SampleRegstyle.css";
import Pic1 from "./../../assets/stonksManProfile.jpg";
import Pic2 from "./../../assets/stonksManProfile.jpg";
import { toast, ToastContainer } from "react-toastify";
const queryString = require("query-string");
function Sample_reg() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [listOfData, setListOfData] = useState([]);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [ban, setBan] = useState(false);
  const [username, setUsername] = useState("");
  const { search } = useLocation();

  useEffect(() => {
    Axios.get("http://localhost:3002/getUsers").then((response) => {
      setListOfUsers(response.data);
    });

    Axios.get("http://localhost:3002/getData").then((response) => {
      setListOfData(response.data);
    });

    {
      if (!sessionStorage.getItem("username")) {
        // undefined
        if (queryString.parse(search)["logout"] === "true") {
          alert("Session expired!");
        }
      }
    }
  }, []);
  // {"username":"dani","coins":0,"IBM":{stocks:0,times:0,cp:0},"TSCO":{stocks:0,times:0,cp:0},"DAI":{stocks:0,times:0,cp:0},"SHOP":{stocks:0,times:0,cp:0},"GPV":{stocks:0,times:0,cp:0},"RELIANCE":{stocks:0,times:0,cp:0},"start":new Date()}
  const dataCreator = () => {
    var today = new Date();

    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const coins = 5000,
      profit = 0,
      IBM = { stocks: 0, times: 0, cp: 0 },
      TSCO = { stocks: 0, times: 0, cp: 0 },
      DAI = { stocks: 0, times: 0, cp: 0 },
      SHOP = { stocks: 0, times: 0, cp: 0 },
      GPV = { stocks: 0, times: 0, cp: 0 },
      RELIANCE = { stocks: 0, times: 0, cp: 0 },
      total = 0,
      start = date;

    Axios.post("http://localhost:3002/createData", {
      username,
      profit,
      coins,
      IBM,
      TSCO,
      DAI,
      SHOP,
      GPV,
      RELIANCE,
      start,
      total,
    }).then((response) => {
      setListOfData([
        ...listOfData,
        {
          username,
          profit,
          coins,
          IBM,
          TSCO,
          DAI,
          SHOP,
          GPV,
          RELIANCE,
          start,
          total,
        },
      ]);
    });
  };

  const userCreator = () => {
    Axios.post("http://localhost:3002/createUser", {
      username,
      password,
      email,
      ban,
    }).then((response) => {
      setListOfUsers([
        ...listOfUsers,
        {
          username,
          password,
          email,
          ban,
        },
      ]);
    });
  };

  const navigate = useNavigate();
  const createUser = () => {
    Axios.get("http://localhost:3002/getUsers").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i]["username"] === username) {
          // alert("Username " + response.data[i]["username"] + " already exist!");
          toast.warn(
            "Username " + response.data[i]["username"] + " already exist!",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
          console.log("User already exist!");
          return "already exist";
        }
      }
      console.log("User created");
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("active", new Date().getTime());
      console.log("Logged in as " + sessionStorage.getItem("username"));
      userCreator();
      dataCreator();
      alert(`account created success for ${username}`);
      window.location.href = "/mainPage";
      navigate("/mainPage");
    });
  };

  const [password1, setPassword1] = useState("");
  const [username1, setUsername1] = useState("");

  const confirmUser = (event) => {
    Axios.get("http://localhost:3002/getUsers").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i]["username"] === username1) {
          if (response.data[i]["password"] === password1) {
            if (response.data[i]["ban"] == false) {
              toast.success("Login success !", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              alert("Welcome " + response.data[i]["username"] + " !");
              sessionStorage.setItem("username", username1);
              sessionStorage.setItem("active", new Date().getTime());
              window.location.href = "/mainPage";
              navigate("/mainPage");
              return "Login Success";
            } else {
              toast.error("Sorry you have been banned!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              return "Banned!";
            }
          } else {
            toast.error("Wrong Password!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            return "Wrong password";
          }
        }
      }

      toast.error("Invalid username!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
    event.preventDefault();
  };

  return (
    <div className="body">
      <div className="container">
        <input type="checkbox" id="flip" />
        <div className="cover">
          <div className="front">
            <img src={Pic1} alt="" />
          </div>
          <div className="back">
            <img src={Pic2} alt="" />
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <div className="login-form">
              <div className="title">Login</div>
              <form action="#" onSubmit={confirmUser}>
                <div className="input-boxes">
                  <div className="input-box">
                    <i class="fas fa-user"></i>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      required
                      onChange={(e) => {
                        setUsername1(e.target.value);
                      }}
                    />
                  </div>
                  <div className="input-box">
                    <i class="fas fa-lock"></i>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      required
                      onChange={(e) => {
                        setPassword1(e.target.value);
                      }}
                    />
                  </div>
                  <div className="text">
                    <a href="#">Forgot password?</a>
                  </div>
                  <div className="button input-box">
                    <input type="submit" value="Submit" />
                  </div>
                  <div className="text sign-up-text">
                    Don't have an account? <label for="flip">Sigup now</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="signup-form">
              <div className="title">Signup</div>

              <form action="#">
                <div className="input-boxes">
                  <div className="input-box">
                    <i class="fas fa-user"></i>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                    />
                  </div>
                  <div className="input-box">
                    <i class="fas fa-envelope"></i>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="input-box">
                    <i class="fas fa-lock"></i>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      required
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                  </div>
                  <div className="button input-box">
                    <input type="submit" value="Submit" onClick={createUser} />
                  </div>
                  <div className="text sign-up-text">
                    Already have an account? <label for="flip">Login now</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5002}
        limit={3}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </div>
  );
}

export default Sample_reg;
