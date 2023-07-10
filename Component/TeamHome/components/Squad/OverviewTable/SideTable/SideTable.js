import React, { useState } from "react";
 
import { useRouter } from "next/router";
import styles from "./SideTable.module.scss";
const SideTable = () => {
  //  
  // const navigate = useNavigate();
  const router = useRouter();
  const pathname = router.asPath;
  const { slug } = router.query;
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
    let navValue = "";
    value
      .replace(/\s+/g, "")
      .split(" ")
      .forEach((element) => {
        navValue +=
          element === "अवलोकन"
            ? "OVERVIEW"
            : element === "आँकड़े"
            ? "STATS"
            : element === "News"
            ? "NEWS"
            : element === "रिकॉर्ड"
            ? "RECORDS"
            : element === "मैच"
            ? "MATCHES"
            : element === "Videos"
            ? "VIDEOS"
            : element === "तस्वीरें"
            ? "PHOTOS"
            : element;
      });
    setselectedField(navValue.toLowerCase());
    router.replace(
      `/players/${slug[0]}/${slug[1]}/${slug[2]}/${navValue.toLowerCase()}/`
    );
  };
  // const handleChange = (value) => {
  //   setselectedField(value.toLowerCase()+"/");
  //   navigate(value.toLowerCase()+"/");
  // };
  React.useEffect(() => {
    if (!pathname.split("/")[5]) {
      setselectedField("overview");
      return;
    }
    setselectedField(pathname.split("/")[5]);
  }, [pathname]);


  return (
    <div className={styles.SideTable}>
      <div className={styles.sidetableitem}>
        {Fields.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleChange(item)}
              className={`siderTable ${
                selectedField === item.toLowerCase() ? styles.selected : null
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
