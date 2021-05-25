import PropTypes from "prop-types";

export const InfoText = ({ children, visible = true, className }) => {
  if (!visible) {
    return null;
  }
  return <p className={className}>{children}</p>;
};

InfoText.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};
