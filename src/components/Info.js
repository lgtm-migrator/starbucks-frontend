import React from "react";
import { Link } from "react-router-dom";
import "../styles/Info.css";

export const Info = ({
  image,
  title,
  background,
  info,
  link,
  color,
  path,
  className,
}) => {
  return (
    <div
      className="info"
      style={{
        color,
        background,
      }}
    >
      <img src={image} alt="starbucks is expensive" className="info__image" />
      <div className="info__text">
        <h4>{title}</h4>
        <h6>{info}</h6>
        <Link to={path} style={{ color }} className={className}>
          {link}
        </Link>
      </div>
    </div>
  );
};
