import * as React from "react";

export const sideBarContainerStyle: React.CSSProperties = {
  backgroundImage:
    "url('https://cdnjs.cloudflare.com/ajax/libs/alchemyjs/0.4.2/styles/images/maze-black.png')",
  backgroundRepeat: "repeat",
  width: "25%",
  position: "fixed",
  height: "100vh",
  opacity: 0.8,
  zIndex: 99,
  boxShadow: "0 0 8px 8px black inset",
  overflowY: "auto"
};

export const sidebarHeaderWrapper: React.CSSProperties = {
  width: "100%",
  boxShadow: "0 2px 0 2px black inset",
  color: "orange",
  textAlign: "center",
  padding: "5%",
  fontWeight: "bold",
  fontSize: "large"
};

export const searchStyle: React.CSSProperties = {
  width: "80%",
  display: "block",
  margin: "auto"
};

export const sectionHeaderStyle: React.CSSProperties = {
  marginLeft: "10%",
  color: "wheat",
  marginTop: "5%",
  fontWeight: "bold",
  fontSize: "large"
};

export const dropDownSelectorStyle: React.CSSProperties = {
  display: "block",
  margin: "auto",
  width: "50%",
  marginTop: "5%"
};

export const insightsButtonStyle: React.CSSProperties = Object.assign(
  {},
  ...(dropDownSelectorStyle as object[]),
  { marginBottom: "5%" }
);

export const checkBoxStyle: React.CSSProperties = {
  color: "wheat"
};

export const insightsTextStyle: React.CSSProperties = Object.assign(
  {},
  ...(insightsButtonStyle as object[]),
  ...(checkBoxStyle as object[]),
  { width: "60%", marginLeft: "10%" }
);

export const explanationStyle: React.CSSProperties = {
  fontSize: "small"
};
