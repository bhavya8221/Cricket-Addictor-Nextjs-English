import React from "react";
import BreadcrumbItem from "./BreadcrumbItem";

const Breadcrumbs = ({ itemListElement }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb" style={{ textTransform: "capitalize" }}>
        {itemListElement.map((item, index) => (
          <BreadcrumbItem
            key={index}
            name={item.name}
            item={item.item}
            isActive={index === itemListElement.length - 1}
          />
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
