import "./button.css";
import PropTypes from "prop-types";

export const ButtonVariant = {
  NORMAL: "NORMAL",
  RED: "RED",
};

export const Button = ({
  children,
  className,
  variant = ButtonVariant.NORMAL,
  ...properties
}) => {
  let buttonClass = "button button-variant-" + variant.toLowerCase();
  if (className) {
    buttonClass += " " + className;
  }

  return (
    <button type="button" className={buttonClass} {...properties}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf([ButtonVariant.NORMAL, ButtonVariant.RED]),
};
