import React from "react";
import { Link, Outlet } from "react-router-dom";
import { EDU_ROUTING_PREFIX } from "../constants/prefix";

export const Layout = () => {
  return (
    <div>
      <header>
        <div>
          <Link to="/">
            <span>Urclass</span>
          </Link>
          <nav>
            <ul>
              <li>
                <Link to={`${EDU_ROUTING_PREFIX}`}>에듀 홈</Link>
              </li>
              <li>
                <Link to={`${EDU_ROUTING_PREFIX}/1`}>에듀 1</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
