import React, { useEffect, useState, useCallback } from "react";
import styles from "./SquadPhotos.module.scss";
import { GetPlayerVideoPhotoAPI } from "../../../../../../Constants/Api/Api";
import HOST from "../../../../../../Constants/host";
import { IoMdShareAlt } from "react-icons/io";
import { BsXSquareFill } from "react-icons/bs";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import background from "../../../../../../public/Images/no-banner.png";
 
import StatsTable from "../Stats/StatsTable/StatsTable";
import { useRouter } from "next/router";
import Image from "next/image";

function SquadPhotos() {
   
  const router = useRouter();
  const {slug} =router.query
  const [image, setImage] = useState("");
  const [photoData, setPhotoData] = useState();
  const [visible, setVisible] = useState(false);
  // const { pid,tid } = useParams();
  const pathSegments = window.location.pathname.split("/");
  // const index = pathSegments.indexOf(tid);
  // if (index !== -1) {
  //   pathSegments.splice(index, 1);
  // }
  const newPath = pathSegments.join("/");

  const newUrl = window.location.origin + newPath + window.location.search;
  window.history.replaceState({}, "", newUrl);
  const pathname = router.asPath;
  const getImage = (val) => {
    setImage(val);
  };

  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  useEffect(() => {
    GetPlayerVideoPhotoAPI(slug[1], "Image")
      .then((res) => {
        setPhotoData(res.data.data);
        setVisible(true);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);

      });
  }, [ slug[1]]);


  return (
    <>
      {visible === true && photoData.length === 0 ? (
        <h3>No Photos...</h3>
      ) : (
        <div className={styles["SquadPhotos_section" ,"Tname"]}>
          <div className={styles.justi}>
            <div>
              <h3 className={styles.H3}>
                <b>Photos</b>
              </h3>
            </div>
          </div>

          <div className="row" style={{ marginBottom: "20px" }}>
            {visible === true &&
              photoData.map((item, index) => {
                return (
                  <div
                    key={index}
                    data-bs-toggle="modal"
                    data-bs-target="#PlayerImageModal"
                    className="col-md-3 col-xs-12 col_div"
                  >
                    <Image
                      src={
                        item.file_uri === "" || item.file_uri === null
                          ? `${background}`
                          : item.file_name === "" || item.file_name === null
                          ? `${background}`
                          : `${HOST}${item.file_uri}/${item.file_name}`
                      }
width={400}
height={400}
                      className={styles.photos_style}
                      alt="images"
                      onClick={() =>
                        getImage(
                          item.file_uri === "" || item.file_uri === null
                            ? `${background}`
                            : item.file_name === "" || item.file_name === null
                            ? `${background}`
                            : `${HOST}${item.file_uri}/${item.file_name}`
                        )
                      }
                    />
                  </div>
                );
              })}
          </div>

          <div
            className="modal fade"
            id="PlayerImageModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div
                  className="modal-body"
                  style={{
                    padding: "2px",
                  }}
                >
                  <BsXSquareFill
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className={styles.iconX}
                    color="var(--primary)"
                    size={28}
                  />
                  <Image
                    src={image}
                    className={styles["photos_style_popup"]}
                    alt="images"
                    width={10}
                    height={10}
                  />
                  <div
                    className={styles.div_share}
                    style={{
                      marginTop: -28,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className={styles.img_logo}></div>
                    <h5 style={{ marginBottom: 0 }}>
                      <b className={styles.share}>Share</b>
                      <IoMdShareAlt color="black" size={20} />
                      <FaFacebookSquare
                        className={styles.icon}
                        color="var(--primary)"
                        size={28}
                        onClick={() => {
                          window.open("http://www.facebook.com", "_blank");
                        }}
                      />
                      <FaTwitterSquare
                        className={styles.icon}
                        color="var(--primary)"
                        size={28}
                        onClick={() => {
                          window.open("http://www.twitter.com", "_blank");
                        }}
                      />
                      <FaInstagramSquare
                        className={styles.icon}
                        color="var(--primary)"
                        size={28}
                        onClick={() => {
                          window.open("http://www.instagram.com", "_blank");
                        }}
                      />
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <StatsTable />
        </div>
      )}
    </>
  );
}

export default SquadPhotos;
