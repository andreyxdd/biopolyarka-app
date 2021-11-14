import { Tab } from "@mui/material";
import React from "react";

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const ScrollTab: React.FC<any> = ({
  toId,
  toRef,
  duration,
  marginLeft,
  marginRight,
}) => {
  return (
    <Tab
      style={{ color: "white", marginRight, marginLeft }}
      label="Item One"
      {...a11yProps(0)}
    />
  );
};

export default ScrollTab;
