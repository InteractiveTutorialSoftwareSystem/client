/*!

 =========================================================
 * Material Kit React - v1.10.0 based on Material Kit - v2.0.2
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-kit-react
 * Copyright 2021 Creative Tim (https://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-kit-react/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

// ##############################
// // // Variables - Styles that are used on more than one component
// #############################

const drawerWidth = 260;

const transition = {
  transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
};

const containerFluid = {
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto",
  width: "100%",
};
const container = {
  ...containerFluid,
  "@media (min-width: 576px)": {
    maxWidth: "540px",
  },
  "@media (min-width: 768px)": {
    maxWidth: "720px",
  },
  "@media (min-width: 992px)": {
    maxWidth: "960px",
  },
  "@media (min-width: 1200px)": {
    maxWidth: "1140px",
  },
};

const boxShadow = {
  boxShadow:
    "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
};

const card = {
  display: "inline-block",
  position: "relative",
  width: "100%",
  margin: "25px 0",
  boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
  borderRadius: "3px",
  color: "rgba(0, 0, 0, 0.87)",
  background: "#fff",
};

// Professional Typography System
const defaultFont = {
  fontFamily: '"Inter", "SF Pro Display", "Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
  fontWeight: "400",
  lineHeight: "1.6",
  letterSpacing: "-0.01em",
};

const headingFont = {
  fontFamily: '"Inter", "SF Pro Display", "Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
  fontWeight: "600",
  lineHeight: "1.2",
  letterSpacing: "-0.02em",
};

// Professional Warm Analogous Color Scheme
const primaryColor = "#D4A574";      // Warm Gold (primary brand)
const secondaryColor = "#C8956D";    // Warm Amber (secondary)
const accentColor = "#B8946A";       // Warm Bronze (accent)
const tertiaryColor = "#E8C4A0";     // Light Warm Cream (tertiary)

// Functional Colors
const successColor = "#7D8F69";      // Warm Sage Green
const warningColor = "#D49C3D";      // Professional Amber
const dangerColor = "#C17B5B";       // Warm Terracotta Red
const infoColor = "#8FA5A3";         // Muted Teal

// Neutral Colors
const grayColor = "#6B7280";         // Professional Gray
const darkGrayColor = "#374151";     // Dark Text Gray
const lightGrayColor = "#F3F4F6";    // Light Background Gray
const whiteColor = "#FFFFFF";
const blackColor = "#111827";        // Rich Black

// Legacy color mapping for backward compatibility
const roseColor = primaryColor;       // Map rose to primary

// Professional Shadow System
const primaryBoxShadow = {
  boxShadow:
    "0 8px 16px -4px rgba(212, 165, 116, 0.25), 0 4px 12px 0px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(212, 165, 116, 0.15)",
};
const infoBoxShadow = {
  boxShadow:
    "0 8px 16px -4px rgba(143, 165, 163, 0.25), 0 4px 12px 0px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(143, 165, 163, 0.15)",
};
const successBoxShadow = {
  boxShadow:
    "0 8px 16px -4px rgba(125, 143, 105, 0.25), 0 4px 12px 0px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(125, 143, 105, 0.15)",
};
const warningBoxShadow = {
  boxShadow:
    "0 8px 16px -4px rgba(212, 156, 61, 0.25), 0 4px 12px 0px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(212, 156, 61, 0.15)",
};
const dangerBoxShadow = {
  boxShadow:
    "0 8px 16px -4px rgba(193, 123, 91, 0.25), 0 4px 12px 0px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(193, 123, 91, 0.15)",
};
const roseBoxShadow = {
  boxShadow:
    "0 8px 16px -4px rgba(212, 165, 116, 0.25), 0 4px 12px 0px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(212, 165, 116, 0.15)",
};

const warningCardHeader = {
  color: "#fff",
  background: "linear-gradient(135deg, #D49C3D, #C8956D)",
  ...warningBoxShadow,
};
const successCardHeader = {
  color: "#fff",
  background: "linear-gradient(135deg, #7D8F69, #6B7A5A)",
  ...successBoxShadow,
};
const dangerCardHeader = {
  color: "#fff",
  background: "linear-gradient(135deg, #C17B5B, #B5694A)",
  ...dangerBoxShadow,
};
const infoCardHeader = {
  color: "#fff",
  background: "linear-gradient(135deg, #8FA5A3, #7A9290)",
  ...infoBoxShadow,
};
const primaryCardHeader = {
  color: "#fff",
  background: "linear-gradient(135deg, #D4A574, #C8956D)",
  ...primaryBoxShadow,
};
const roseCardHeader = {
  color: "#fff",
  background: "linear-gradient(135deg, #D4A574, #C8956D)",
  ...roseBoxShadow,
};
const cardActions = {
  margin: "0 20px 10px",
  paddingTop: "10px",
  borderTop: "1px solid #eeeeee",
  height: "auto",
  ...defaultFont,
};

const cardHeader = {
  margin: "-30px 15px 0",
  borderRadius: "3px",
  padding: "15px",
};

const defaultBoxShadow = {
  border: "0",
  borderRadius: "3px",
  boxShadow:
    "0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  padding: "10px 0",
  transition: "all 150ms ease 0s",
};

const title = {
  color: darkGrayColor,
  margin: "1.75rem 0 0.875rem",
  textDecoration: "none",
  ...headingFont,
};

const cardTitle = {
  ...title,
  marginTop: ".625rem",
};

const cardLink = {
  "& + $cardLink": {
    marginLeft: "1.25rem",
  },
};

const cardSubtitle = {
  marginBottom: "0",
  marginTop: "-.375rem",
};

export {
  //variables
  drawerWidth,
  transition,
  container,
  containerFluid,
  boxShadow,
  card,
  // Typography
  defaultFont,
  headingFont,
  // Professional Color Palette
  primaryColor,
  secondaryColor,
  accentColor,
  tertiaryColor,
  // Functional Colors
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  // Neutral Colors
  grayColor,
  darkGrayColor,
  lightGrayColor,
  whiteColor,
  blackColor,
  // Legacy Colors
  roseColor,
  // Shadow System
  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow,
  roseBoxShadow,
  // Card Headers
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  // Layout
  cardActions,
  cardHeader,
  defaultBoxShadow,
  title,
  cardTitle,
  cardLink,
  cardSubtitle,
};
