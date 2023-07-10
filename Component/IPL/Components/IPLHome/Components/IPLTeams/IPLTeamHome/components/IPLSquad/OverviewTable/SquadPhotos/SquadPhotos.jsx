import React, { useEffect, useState, useCallback } from "react";
import "./SquadPhotos.scss";
import { useNavigate, useParams } from "react-router-dom";
import { GetPlayerVideoPhotoAPI } from "../../../../../../Constants/Api/Api";
import HOST from "../../../../../../Constants/host";
import { IoMdShareAlt } from "react-icons/io";
import { BsXSquareFill } from "react-icons/bs";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import background from "../../../../../../../assets/Images/no-banner.png";
 

function SquadPhotos() {
   
  const [image, setImage] = useState("");
  const [photoData, setPhotoData] = useState();
  const [visible, setVisible] = useState(false);
  const { pid } = useParams();

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
    GetPlayerVideoPhotoAPI(pid, "Image")
      .then((res) => {
        setPhotoData(res.data.data);
        setVisible(true);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
        
      });
  }, [pid]);



  return (
    <>
      {visible === true && photoData.length === 0 ? (
        <h3>No Photos...</h3>
      ) : (
        <div className="SquadPhotos_section">
          <div className="justi mx-3">
            <div>
              <h3 className="H3">
                <b>Photos</b>
              </h3>
            </div>
          </div>

          <div className="row">
            {visible === true &&
              photoData.map((item, index) => {
                return (
                  <div
                    key={index}
                    data-bs-toggle="modal"
                    data-bs-target="#PlayerImageModal"
                    className="col-md-3 col-xs-12 col_div"
                  >
                    <img
                      src={
                        item.file_uri === "" || item.file_uri === null
                          ? `${background}`
                          : item.file_name === "" || item.file_name === null
                          ? `${background}`
                          : `${HOST}${item.file_uri}/${item.file_name}`
                      }
                      className="photos-style"
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
                    className="iconX"
                    color="var(--primary)"
                    size={28}
                  />
                  <img
                    src={image}
                    className="photos-style-popup"
                    alt="images"
                  />
                  <div
                    className="div_share"
                    style={{
                      marginTop: -28,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="img_logo"></div>
                    <h5 style={{ marginBottom: 0 }}>
                      <b className="share">Share</b>
                      <IoMdShareAlt color="black" size={20} />
                      <FaFacebookSquare
                        className="icon"
                        color="var(--primary)"
                        size={28}
                        onClick={() => {
                          window.open("http://www.facebook.com", "_blank");
                        }}
                      />
                      <FaTwitterSquare
                        className="icon"
                        color="var(--primary)"
                        size={28}
                        onClick={() => {
                          window.open("http://www.twitter.com", "_blank");
                        }}
                      />
                      <FaInstagramSquare
                        className="icon"
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
        </div>
      )}
    </>
  );
}

export default SquadPhotos;
