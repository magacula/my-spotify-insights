// Breakpoints that will be used in media queries to make components responsive

const size = {
  xs: "320px",
  sm: "425px",
  med: "768px",
  lg: "1200px",
};

const device = {
  xs: `max-width: ${size.xs}`,
  sm: `max-width: ${size.sm}`,
  med: `max-width: ${size.med}`,
  lg: `max-width: ${size.lg}`,
};

export default { size, device };
