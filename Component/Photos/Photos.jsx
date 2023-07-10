import React, { useEffect, useState, useCallback } from "react";
import styles from "./Photos.module.scss";
import HOST from "../../Constants/host";
import { IoMdShareAlt } from "react-icons/io";
import { BsXSquareFill } from "react-icons/bs";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { getVideoPhotoAPI } from "../../Constants/Api/Api";

function Photos() {
  const [team, setTeam] = useState("TEAM_A");
  const [image, setImage] = useState("");
  const [photoData, setPhotoData] = useState();
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const { slug } = router.query;
  const match_id = slug[0];

  function handleOnClickTEAM_A() {
    setTeam("TEAM_A");
    setActiveIndex(0);
  }
  function handleOnClickTEAM_B() {
    setTeam("TEAM_B");
    setActiveIndex(1);
  }

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
    getVideoPhotoAPI(match_id, "Image", "")
      .then((res) => {
        setPhotoData(res.data.data);
        setVisible(true);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [match_id]);

 ;

  return (
    <>
      {visible === true && photoData.tab.length === 0 ? (
        <h3>No Photos...</h3>
      ) : (
        <div className="photos">
          <div className="justi mx-3">
            <div>
              <h3 className="H3">
                <b>Photos</b>
              </h3>
            </div>

            <div className="player_gender">
              <h5
                className="team_a"
                style={{
                  backgroundColor: team === "TEAM_A" ? null : "unset",
                  color: team === "TEAM_A" ? "var(--primary)" : "white",
                }}
                onClick={handleOnClickTEAM_A}
              >
                {visible === true ? photoData.tab[0] : "Team A"}
              </h5>
              <h5
                className="team_b"
                style={{
                  backgroundColor: team === "TEAM_B" ? null : "unset",
                  color: team === "TEAM_B" ? "var(--primary)" : "white",
                }}
                onClick={handleOnClickTEAM_B}
              >
                {visible === true ? photoData.tab[1] : "Team B"}
              </h5>
            </div>
          </div>

          <div className="row">
            {visible === true &&
              Object.keys(photoData.innings_data).map((item, index) => {
                return index === activeIndex
                  ? photoData.innings_data[item].map((item2, index2) => {
                      return (
                        <div
                          key={index2}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal2"
                          className="col-md-3 col-xs-12 col_div"
                        >
                          <img
                            src={HOST + item2.file_uri + item2.file_name}
                            className="photos-style"
                            alt="images"
                            onClick={() =>
                              getImage(HOST + item2.file_uri + item2.file_name)
                            }
                          />
                        </div>
                      );
                    })
                  : null;
              })}
          </div>

          <div
            className="modal fade"
            id="exampleModal2"
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
                  <img src={image} className="photos-style-popup" alt="images" />
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

export default Photos;
