import React from "react";
import { withRouter } from "react-router-dom";
import "./menu-item.styles.scss";

function MenuItem({ title, imageUrl, linkUrl, history, match }) {
  function handleItemClick() {
    history.push(`${match.url}${linkUrl}`);
  }

  const largeMenu = title === "mens" || title === "womens" ? "large" : "";

  return (
    <div className={`menu-item ${largeMenu}`} onClick={handleItemClick}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
}

export default withRouter(MenuItem);
