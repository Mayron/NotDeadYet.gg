const font = {
  // Used for small labels, etc...
  smallSize: "0.875rem",
  header: {
    family: "'Rajdhani', sans-serif",
    weight: 700,
    sizes: [3, 2.5, 2, 1.75, 1.35, 1.125],
  },
  standard: {
    family: "Roboto, sans-serif",
    size: "18px",
    lineHeight: "24px",
    weights: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  mobile: {
    size: "16",
    lineHeight: "19px",
  },
};

const vars = {
  font,
  maxContentSize: "900px",
  sectionPadding: "30px",
  sectionMobilePadding: "30px 8px",
  navHeight: "40px",
};

export default vars;
