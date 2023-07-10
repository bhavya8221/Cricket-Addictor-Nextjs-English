import React, { useState } from "react";
 
import { useNavigate, useLocation } from "react-router-dom";
import "./SideTable.scss";
const SideTable = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedField, setselectedField] = useState("Overview");
  const Fields = [
    "overviews",
   "stats",
    "records",
    "matches",
    "videos",
   "news",
    "photos",
  ];
  const handleChange = (value) => {
    setselectedField(value.toLowerCase());
    navigate(value.toLowerCase()+"/");
  };
  React.useEffect(() => {
    if (!pathname.split("/")[4]) {
      setselectedField("overview");
      return;
    }
    setselectedField(pathname.split("/")[4]);
  }, [pathname]);


  return (
    <div className="SideTable">
      <div className="sidetableitem">
        {Fields.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleChange(item)}
              className={`siderTable ${
                selectedField === item.toLowerCase() ? "selected" : null
              }`}
            >
              <p> {item} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideTable;
