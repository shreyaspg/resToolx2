import React from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.css";

import Toolbar from "./Toolbar/Toolbar";

const layout = props => {
  return (
    <Aux>
      <Toolbar userData={props.userData} updateFuncc={props.updateFunc} />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

export default layout;
