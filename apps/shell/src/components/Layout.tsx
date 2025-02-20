import React from "react";
import { Link, Outlet } from "react-router-dom";
import { EDU_ROUTING_PREFIX } from "../constants/prefix";
import { Header } from "./Header";
import styled from "styled-components";

export const Layout = () => {
  return (
    <div>
      <Row>
        <Header />
      </Row>
      <div>
        <nav>
          <ul>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`${EDU_ROUTING_PREFIX}`}>EDU</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const Row = styled.div`
  display: flex;
  width: 100%;
  background-color: red;
  flex-direction: row;
`;
