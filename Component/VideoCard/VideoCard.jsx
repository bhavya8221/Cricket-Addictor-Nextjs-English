import React from "react";
import { Card } from "react-bootstrap";
import { FaVideo } from "react-icons/fa";
import play from "../../public/Images/play.png";
import styles from "./VideoCard.module.scss";

function VideoCard(props) {
  function getDate(value) {
    var date = new Date(value);
    return date.toLocaleDateString();
  }

  return (
    <>
      {props.data === undefined ? null : (
        <div className={styles.videoCard_section}>
          <Card className={props.type === "related" ? styles.related_type : ""}>
            <Card.Body className={styles.Vcustom_card}>
              <img
                className={styles.Vimage_card}
                src={props.source}
                alt="newscard slide"
              />
              <img className={styles.play} src={play} alt="play" />
              <p className={styles.Vtitle_card}>{props.data.title}</p>
              <div className={`${styles.Vtime} mx-2`}>
                <p className={styles.Vdate_card}>
                  {getDate(props.data.created_at)}
                </p>
                <p className={styles.Vdate_card}>
                  <FaVideo className={styles.v_icon} color="black" /> --:--
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}

export default VideoCard;
