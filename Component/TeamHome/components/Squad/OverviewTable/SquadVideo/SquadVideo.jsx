import React, { useEffect, useState, useCallback } from "react";
// import Video from "../../../../../../Pages/Video/Video";
import { GetPlayerVideoPhotoAPI } from "../../../../../../Constants/Api/Api";
import  styles from "./SquadVideo.module.scss";
 
import { useRouter } from "next/router";

const SquadVideo = () => {
  const router =useRouter()
   
  const [videoData, setVideoData] = useState();
  const [visible, setVisible] = useState(false);
  // const { pid,tid } = useParams();
  const pathname  = router.asPath
  // const pathSegments = window.location.pathname.split("/");
  // const index = pathSegments.indexOf(tid);
  // if (index !== -1) {
  //   pathSegments.splice(index, 1);
  // }
  // const newPath = pathSegments.join("/");
 
  // const newUrl = window.location.origin + newPath + window.location.search;
  // window.history.replaceState({}, "", newUrl);
   // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {
       
  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  // useEffect(() => {
  //   GetPlayerVideoPhotoAPI(pid, "Video")
  //     .then((res) => {
  //       setVideoData(res.data.data);
  //       setVisible(true);
  //     })
  //     .catch((e) => {
  //        // Navigation(e.code, e.message);
  //     });
  // }, [pid]);



  return (
    <>
      {visible === true && videoData.length === 0 ? (
        <h3>No Video...</h3>
      ) : (
        <div className={styles["SquadVideo_section Tname"]}>
          <div className={styles.justi}>
            <div className="">
              <h3 className={styles.H3}>
                <b>Videos</b>
              </h3>
            </div>
          </div>

          {/* <Video menus="hide" data={videoData} visible={visible} type="Array" /> */}
        </div>
      )}
    </>
  );
};

export default SquadVideo;
