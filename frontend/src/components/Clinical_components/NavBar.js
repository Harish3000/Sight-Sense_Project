import React from "react";
import "../../styles/GeneralTest/Clinical/navBar.css";
import "../../assets/Clinical_assets/search-line.png";

function NavBar() {
  return (
    <div className="Container">
      <div className="Inner">
        <div className="SearchBar">
          <input type="text" placeholder="Search.." className="input" />
          <div className="SearchIcon">
            <i class="ri-search-line"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
