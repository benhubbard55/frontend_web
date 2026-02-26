import React from "react";
import Link from "next/link";
import { Footer as StyledFooter } from "@/styles/common.style";

const Header = () => {
  return (
    <StyledFooter>
      <div className="footer-top">
        <div className="container-common">
          <div className="f-main">
            <ul>
              <li>
                <a href="/privacyPolicy">Privacy Policy</a>
              </li>
              <li>
                <a href="/termCondition">Terms & Conditions</a>
              </li>
            </ul>
            <div className="footer-bottom">
              <p>
                Copyright @ {new Date().getFullYear()} Uphony,
              </p>
              <p>All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Header;
