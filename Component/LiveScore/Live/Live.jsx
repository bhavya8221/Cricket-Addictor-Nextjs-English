import React from "react";
import styles from "./Live.module.scss";
 

import ScorePanelLiveNew from "../../ScorePanelLiveNew/ScorePanelLiveNew";
import MenuOptionsNew from "../../MenuOptionsNew/MenuOptionsNew";
import { useRouter } from "next/router";
import Commentary from "../../Commentary/Commentary";
import LiveBlog from "../../LiveBlog/LiveBlog";
import ScoreCard from "../../ScoreCard/ScoreCard";
import Teamcom from "../../Teamcom/Teamcom";
import Videocom from "../../Videocom/Videocom";
import Photos from "../../Photos/Photos";
import WagonWheel from "../../WagonWheel/WagonWheel";
import Manhattan from "../../Manhattan/Manhattan";
import Link from "next/link";

function Live() {
   
  const router = useRouter();
  const { slug } = router.query;

  const pathname = router.asPath;
 
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const initialURL = `/cricket-live-score/live-matches/${slug===undefined?null: slug[0]}/${slug===undefined?null: slug[1]}/${slug===undefined?null: slug[2]}`;

  const handleButtonClick = (path) => {
    const fullURL = initialURL + path;
    router.push(fullURL);
  };

  return (
    <>
      <ScorePanelLiveNew type="live" />
      {/* <MenuOptionsNew
        menus={menus}
        active={pathname?.split("/")[6]?.toUpperCase()}
        pathname={pathname}
        location="cricket-live-score"
      /> */}
      <div className={styles.SeperateMenuOption}>
        <div className={styles.list}>
          <h6 onClick={() => handleButtonClick("/commentray")}>Commentary</h6>
          <h6 onClick={() => handleButtonClick("/liveblog")}>LiveBlog</h6>
          <h6 onClick={() => handleButtonClick("/scorecard")}>ScoreCard</h6>
          <h6 onClick={() => handleButtonClick("/team")}>Team</h6>
          <h6 onClick={() => handleButtonClick("/videos")}>Video</h6>
          <h6 onClick={() => handleButtonClick("/photos")}>Photos</h6>
          <h6 onClick={() => handleButtonClick("/wagonwheel")}>WagonWheel</h6>
          <h6 onClick={() => handleButtonClick("/manhattan")}>Manhattan</h6>
        </div>
      </div>
      {pathname.split("/")[6] === undefined ? null : pathname.split("/")[6] ===
          "commentray" || pathname.split("/")[6] === undefined ? (
        <Commentary type="live" />
      ) : pathname.split("/")[6] === "liveblog" ? (
        <LiveBlog />
      ) : pathname.split("/")[6] === "scorecard" ? (
        <ScoreCard type="live" />
      ) : pathname.split("/")[6] === "team" ? (
        <Teamcom type="live" />
      ) : pathname.split("/")[6] === "videos" ? (
        <Videocom />
      ) : pathname.split("/")[6] === "photos" ? (
        <Photos />
      ) : pathname.split("/")[6] === "wagonwheel" ? (
        <WagonWheel />
      ) : pathname.split("/")[6] === "manhattan" ? (
        <Manhattan />
      ) : (
        <Commentary type="live" />
      )}
    </>
  );
}

export default Live;
