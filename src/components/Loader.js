import React from "react";
import { ScaleLoader } from "react-spinners";
import themes from "../styles/themes";
const { colors } = themes;

const Loader = () => {
  return (
    <div style={{ marginLeft: "50vw", marginTop: "40vh" }}>
      <ScaleLoader color={colors.lightBlue} width={10} height={45} loading />
    </div>
  );
};

export default Loader;
