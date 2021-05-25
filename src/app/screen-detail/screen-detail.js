import "./screen-detail.css";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router";
import { Button, ButtonVariant } from "../button";

export const ScreenDetail = () => {
  const { stopwatchId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (typeof document === "undefined") {
    // figure out a way to render portals serverside
    // https://michalzalecki.com/render-react-portals-on-the-server/
    return null;
  }

  return createPortal(
    <div className="screen-detail">
      TBD! Stopwatch ID: {stopwatchId}
      <Button variant={ButtonVariant.RED}>Stop</Button>
    </div>,
    document.querySelector("#overlay")
  );
};
