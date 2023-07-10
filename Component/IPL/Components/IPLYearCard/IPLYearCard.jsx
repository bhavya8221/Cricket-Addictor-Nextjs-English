import styles from "./IPLYearCard.module.scss";
import React, { useState, useEffect } from "react";
import tropy from "../../../../public/Images/Medal.png";
import Link from "next/link";
import { iPLListApi } from "../../../../Constants/Api/Api";
import Image from "next/image";
const IPLYearCard = () => {
  const [iplList, setIplList] = useState([]);
  const [season, setSeason] = useState(0);
  const colorsArray = [
    "linear-gradient(#E2FC8E, #688800)",
    "linear-gradient(#FFA58B, #C02A00)",
    "linear-gradient(#cc0260, #730136)",
    "linear-gradient(#93FA02, #345900)",
    "linear-gradient(#c7ba02, #504A00)",
    "linear-gradient(#e9a6f5, #590069)",
    "linear-gradient(#b2ede7, #05a393)",
    "linear-gradient(#f09ea4, #e00917)",
    "linear-gradient(#8F9BEB, #0E008F)",
    "linear-gradient(#db7e04, #5D3500)",
  ];

  function randomNumber() {
    return Math.floor(Math.random() * 10);
  }
  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {
  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );
  useEffect(() => {
    iPLListApi()
      .then((res) => {
        setIplList(res.data.data);
      })
      .catch((e) => {
      
      });
  }, []);

  return (
    <div>
      <div className={styles.IPLYearCard_section}>
        <div
          className="row"
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
        >
          {/* col1  */}
          {iplList
            .sort(function (a, b) {
              return b.id - a.id;
            })
            .map((item, index) => {
              return (
                <div
                  className={` col-xs-12 col-md-6 col-lg-4 my-3 col-xl-3 ${styles.center_box}`}
                  key={index}
                >
                  {season === 0 ? setSeason(item.season) : null}
                  <Link
                    className={styles.link_color}
                    href={`/ipl/ipl-${item.season}/${item.cid}/`}
                  >
                    <div
                      className={styles.child_IPL}
                      style={{ backgroundImage: colorsArray[randomNumber()] }}
                    >
                      <h3>{item.abbr}</h3>
                      <h3>{item.season}</h3>

                      <div className={styles.bck_white}>
                        <Link href={"#"}>
                          <Image
                            alt="images"
                            src={tropy}
                            className={styles.tropy_img}
                          />{" "}
                          {item.title[0].title}
                        </Link>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default IPLYearCard;
