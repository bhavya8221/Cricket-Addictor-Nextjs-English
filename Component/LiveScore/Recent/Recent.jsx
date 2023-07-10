import React from "react";
import styles from "./Recent.module.scss";
import ScorePanelRecentNew from "../../ScorePanelRecentNew/ScorePanelRecentNew";
import { useRouter } from "next/router";
import MenuOptionsNew from "../../MenuOptionsNew/MenuOptionsNew";
import Commentary from "../../Commentary/Commentary";
import LiveBlog from "../../LiveBlog/LiveBlog";
import ScoreCard from "../../ScoreCard/ScoreCard";
import Teamcom from "../../Teamcom/Teamcom";
import Videocom from "../../Videocom/Videocom";
import Photos from "../../Photos/Photos";
import WagonWheel from "../../WagonWheel/WagonWheel";
import Manhattan from "../../Manhattan/Manhattan";
import CommentaryRecent from "../../CommentaryRecent/CommentaryRecent";

function Recent() {
  const router = useRouter();
  const { slug } = router.query;
  const pathname = router.asPath;
  
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const initialURL = `/cricket-live-score/recent-matches/${
    slug === undefined ? null : slug[0]
  }/${slug === undefined ? null : slug[1]}/${
    slug === undefined ? null : slug[2]
  }`;
  const handleButtonClick = (path) => {
    const fullURL = initialURL + path;
    router.push(fullURL);
  };
 
  return (
    <>
      <ScorePanelRecentNew type="recent" />
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
      {/* <Commentary type="recent" />
      <LiveBlog />
      <ScoreCard type="recent" /> */}
      {
      pathname.split("/")[6] === undefined ? null : pathname.split("/")[6] ===
          "commentray"? (
        <CommentaryRecent type="recent" />
      ) : 
      pathname.split("/")[6] === "liveblog" ? (
        <LiveBlog />
      ) : pathname.split("/")[6] === "scorecard" ? (
        <ScoreCard type="recent" />
      ) : pathname.split("/")[6] === "team" ? (
        <Teamcom type="recent" />
      ) : pathname.split("/")[6] === "videos" ? (
        <Videocom />
      ) : pathname.split("/")[6] === "photos" ? (
        <Photos />
      ) : pathname.split("/")[6] === "wagonwheel" ? (
        <WagonWheel />
      ) : pathname.split("/")[6] === "manhattan" ? (
        <Manhattan />
      ) : (
        <CommentaryRecent type="recent" />
      )}
      {/* <Outlet /> */}
    </>
  );
}

export default Recent;
