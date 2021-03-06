import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleRight,
  faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ModalContext } from "../../context/modal";
import "../../App.css";

const ModalFeaturesDemo = props => {
  const { closeModal } = useContext(ModalContext);
  const startIndex = props.index;

  const [activeInfoWindow, setActiveInfoWindow] = useState(startIndex);

  const renderTopInfo = () => {
    switch (activeInfoWindow) {
      case 0:
        return "See fish activity near you";
      case 1:
        return "Log and keep track of your catches";
      case 2:
        return "Never miss a perfect day";
      case 3:
        return "Discover new places";
      default:
        return "";
    }
  };

  const renderMainImage = () => {
    switch (activeInfoWindow) {
      case 0:
        return "/img/nearby-catches-cropped-2.png";
      case 1:
        return "/img/log-catch-large-cropped-2.png";
      case 2:
        return "/img/weather-cropped.png";
      case 3:
        return "/img/access-locations.PNG";
      default:
        return "";
    }
  };

  const handlePageChange = direction => {
    if (direction === "forward") {
      if (activeInfoWindow < 3) {
        setActiveInfoWindow(prevValue => prevValue + 1);
      } else {
        setActiveInfoWindow(0);
      }
    }
    if (direction === "back") {
      if (activeInfoWindow > 0) {
        setActiveInfoWindow(prevValue => prevValue - 1);
      } else {
        setActiveInfoWindow(4);
      }
    }
  };

  return (
    /* OUTER CONTAINER */
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* INNER MODAL WINDOW CONTAINER */}
      <div
        style={{
          maxWidth: "90%",
          backgroundColor: "#FDFCFA",
          border: "1px solid lightgray",
          borderRadius: 5,
        }}
      >
        {/* INNER MODAL TOP ROW*/}
        <div
          style={{
            width: "100%",
            display: "flex",
            color: "#555",
            justifyContent: "center",
            padding: 5,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 1,
              height: 50,
            }}
          >
            <h1>{renderTopInfo()}</h1>
          </div>
          <div
            className="close-modal"
            onClick={closeModal}
            style={{
              padding: "0px 10px",
              display: "flex",
              alignItems: "center",
              fontSize: "25px",
            }}
          >
            &#10006;
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={renderMainImage()}
            alt="site features"
          />
          {/* PAGE BACK */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              display: "inline-block",
              padding: 5,
            }}
          >
            <FontAwesomeIcon
              onClick={() => handlePageChange("back")}
              className="change-page"
              icon={faChevronCircleLeft}
              style={{ height: 40, width: 40 }}
            />
          </div>
          {/* PAGE FORWARD */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              display: "inline-block",
              padding: 5,
            }}
          >
            <FontAwesomeIcon
              onClick={() => handlePageChange("forward")}
              className="change-page"
              icon={faChevronCircleRight}
              style={{ height: 40, width: 40 }}
            />
          </div>
        </div>
        <div style={{ width: "100%", height: 50 }}></div>
      </div>
    </div>
  );
};

export default ModalFeaturesDemo;
