// Breakpoints that will be used in media queries to make components responsive

const size = {
  xs: "320px",
  sm: "768px",
  lg: "1200px",
};

const device = {
  xs: `(min-width: ${size.xs})`,
  sm: `(min-width: ${size.sm})`,
  lg: `(min-width: ${size.lg})`,
};

export default { size, device };
