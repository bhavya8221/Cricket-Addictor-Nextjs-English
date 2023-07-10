import React, { useEffect, useState, useCallback } from "react";
import Video from "../../../../../../Pages/Video/Video";
import { useNavigate, useParams } from "react-router-dom";
import { GetPlayerVideoPhotoAPI } from "../../../../../../Constants/Api/Api";
import "./SquadVideo.scss";
 

const SquadVideo = () => {
   
  const [videoData, setVideoData] = useState();
  const [visible, setVisible] = useState(false);
  const { pid } = useParams();

  const navigate = useNavigate();
   // const Navigation = useCallback(
  //   (value1, value2) => {
  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  useEffect(() => {
    GetPlayerVideoPhotoAPI(pid, "Video")
      .then((res) => {
        setVideoData(res.data.data);
        setVisible(true);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [pid]);

 

  return (
    <>
      {visible === true && videoData.length === 0 ? (
        <h3>No Videos...</h3>
      ) : (
        <div className="SquadVideo_section">
          <div className="justi mx-3">
            <div>
              <h3 className="H3">
                <b>Videos</b>
              </h3>
            </div>
          </div>

          <Video menus="hide" data={videoData} visible={visible} type="Array" />
        </div>
      )}
    </>
  );
};

export default SquadVideo;
