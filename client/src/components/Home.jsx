import React from "react";
import useAuth from "./../hooks/useAuth";
import {USER} from "../constants/roles.constants";
import Default from "./Layouts/Default";
import Header from "./Header/Header";

const Home = () => {
  return (<div>
        <Header>
          <h2>Gallery block</h2>
        </Header>
        <Default>
          Content
        </Default>
      </div>
  );
}

export default useAuth(Home, USER)