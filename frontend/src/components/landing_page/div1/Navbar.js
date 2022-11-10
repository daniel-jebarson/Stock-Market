import { Component } from "react";
import "./style.css";
class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="flex-container">
        <div>
          <h1 className="title">Stonks</h1>
        </div>
        <div className="small-flex">
          <form action="/registration">
            <button type="submit" className="login">
              Login
            </button>
          </form>
          <form action="/registration">
            <button type="submit" className="register">
              Register
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default Navbar;
