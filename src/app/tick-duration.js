import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export const TickDuration = ({ formatter, paused = false }) => {
  const spanReference = useRef();

  useEffect(() => {
    let handle;
    let span = spanReference.current;

    const callback = () => {
      span.textContent = formatter();
      handle = requestAnimationFrame(callback);
    };

    if (!paused) {
      callback();
    }

    return () => {
      cancelAnimationFrame(handle);
    };
  }, [formatter, paused]);

  return (
    <span ref={spanReference}>
      {formatter()}
      {paused && " ❚❚"}
    </span>
  );
};

TickDuration.propTypes = {
  formatter: PropTypes.func.isRequired,
  paused: PropTypes.bool,
};
