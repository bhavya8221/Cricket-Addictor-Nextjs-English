import React, { useEffect, useState } from "react";
import Video from "../../Component/Video/Video";
import styles from "./Videocom.module.scss";
import { useRouter } from "next/router";
import { getVideoPhotoAPI } from "../../Constants/Api/Api";

const Videocom = () => {
  const [team, setTeam] = useState("TEAM_A");
  const [videoData, setVideoData] = useState();
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

  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  useEffect(() => {
    getVideoPhotoAPI(match_id, "Video", "")
      .then((res) => {
        setVideoData(res.data.data);
        setVisible(true);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [match_id]);


  return (
    <>
      {visible === true && videoData.tab.length === 0 ? (
        <h3>No Videos...</h3>
      ) : (
        <div className="VideoCom">
          <div className="justi mx-3">
            <div>
              <h3 className="H3">
                <b>Videos</b>
              </h3>
            </div>

            <div className="player_team">
              <h5
                className="team_a"
                style={{
                  backgroundColor: team === "TEAM_A" ? null : "unset",
                  color: team === "TEAM_A" ? "var(--primary)" : "white",
                }}
                onClick={handleOnClickTEAM_A}
              >
                {visible === true ? videoData.tab[0] : "Team A"}
              </h5>
              <h5
                className="team_b"
                style={{
                  backgroundColor: team === "TEAM_B" ? null : "unset",
                  color: team === "TEAM_B" ? "var(--primary)" : "white",
                }}
                onClick={handleOnClickTEAM_B}
              >
                {visible === true ? videoData.tab[1] : "Team B"}
              </h5>
            </div>
          </div>

          <Video
            menus="hide"
            data={videoData}
            visible={visible}
            activeIndex={activeIndex}
            match_id={match_id}
            type="Object"
          />
        </div>
      )}
    </>
  );
};

export default Videocom;
