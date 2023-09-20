import React from "react";
import "../../styles/GeneralTest/Clinical/NavBar.css";
import "../../assets/Clinical_assets/search-line.png";
import "../../assets/Clinical_assets/eye-fill.png";

function NavBar() {
  return (
    <div className="Container">
      <div className="Inner">
        <div className="SearchBar">
          {/* <div className="cliniclogo">
          <i class="ri-eye-fill"></i>
            <img height="32" width="32" src="../../assets/Clinical_assets/eye-fill.png" alt="logo" />
          </div> */}
          <input type="text" placeholder="Search.." className="input" />
          <div className="SearchIcon">
            <i class="ri-search-line"></i>
          </div>
        </div>
        <div className="RightContainer">
          <div className='NavButton'>
            <p>Hello,</p>
            <p>John</p>
          </div>
          <div className='NavButton'>
            <p>Hello,</p>
            <p>John</p>
          </div>
          <div className="BasketButton">
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
