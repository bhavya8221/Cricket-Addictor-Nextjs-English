import React, { useEffect, useState } from "react";
import Video from "../../../../../Video/Video";
import { getIPLVideoPhotoAPI } from "../../../../../../Constants/Api/Api";
import styles from "./IPLVideos.module.scss";
import { useRouter } from "next/router";
//  

const IPLVideos = () => {
  //  
  const router = useRouter();
  const [videoData, setVideoData] = useState();
  const [visible, setVisible] = useState(false);
  const { cid } = router.query;

  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {
  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    getIPLVideoPhotoAPI(cid, "Video")
      .then((res) => {
        setVideoData(res.data.data);
        setVisible(true);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [cid]);

  return (
    <>
      {visible === true && videoData.length === 0 ? (
        <h6>{"no_video"}...</h6>
      ) : (
        <div className="IPL_Video_section">
          <div className="justi">
            <div>
              <h3 className="H3">
                <b>videos</b>
              </h3>
            </div>
          </div>
          <Video menus="hide" data={videoData} visible={visible} type="Array" />
        </div>
      )}
    </>
  );
};

export default IPLVideos;
