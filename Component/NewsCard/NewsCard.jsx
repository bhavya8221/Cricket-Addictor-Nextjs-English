import React from "react";
import styles from "../../styles/NewsCard.module.scss";
import { Card } from "react-bootstrap";
import Image from "next/image";

function NewsCard(props) {
  return (
    <>
      <div className={styles.newsCard_section}>
        <Card className={props.type === "related" ? "related_type" : ""}>
          <Card.Body className={styles.custom_card}>
            <Image
              className={styles.image_card}
              src={props.source}
              alt="newscard slide"
              width={200}
              height={100}
            />
            <noscript>
              <img src="/path/to/image.jpg" alt="newscard slide" />
            </noscript>
            {/* <p className='title-card'>{props.title}</p> */}
            <p
              className={styles.title_card}
              dangerouslySetInnerHTML={{ __html: props.title }}
            ></p>

            <p className={styles.date_card}>{props.date}</p>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default NewsCard;
