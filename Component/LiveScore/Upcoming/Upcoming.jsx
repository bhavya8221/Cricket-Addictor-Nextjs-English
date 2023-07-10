import React from "react";
import styles from "./Upcoming.module.scss";
import ScorePanelUpcomingNew from "../../ScorePanelUpcomingNew/ScorePanelUpcomingNew";
import Commentary from "../../Commentary/Commentary";

function Upcoming() {
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return (
    <>
      <ScorePanelUpcomingNew type="upcoming" />
      <Commentary type="upcoming" />
    </>
  );
}

export default Upcoming;
