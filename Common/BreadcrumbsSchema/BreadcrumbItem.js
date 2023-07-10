import React from "react";

const BreadcrumbItem = ({ name, item, isActive }) => {
  const linkStyle = isActive
    ? { color: "red", textDecoration: "none", cursor: "default" }
    : { textDecoration: "none" };

  return (
    <li
      className={`breadcrumb-item${isActive ? " active" : ""}`}
      aria-current={isActive ? "page" : null}
    >
      <a href={item} style={linkStyle}>
        {name}
      </a>
    </li>
  );
};

export default BreadcrumbItem;
