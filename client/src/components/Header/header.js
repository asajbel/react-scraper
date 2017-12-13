import React from "react";
import "./header.css"

const Header = props => (
	<header>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="/">Reddit Scrapper</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className={`nav-item ${window.location.pathname === "/" ? "active" : ""}`} >
          <a className="nav-link" href="/">Home { window.location.pathname === "/" && <span className="sr-only">(current)</span> }</a>
        </li>
        <li className={`nav-item ${window.location.pathname === "/saved" ? "active" : ""}`}>
          <a className="nav-link" href="/saved">Saved Articles { window.location.pathname === "/saved" && <span className="sr-only">(current)</span> }</a>
        </li>
      </ul>
    </div>
  </nav>
</header>
);

export default Header;