import React, { memo, useEffect, useState } from "react";
import styles from  "./LatestNewsCard.module.scss";
import HOST from "../../Constants/host";
import {  homeBannerNewsApi } from "../../Constants/Api/Api";
import background from "../../public/Images/no-img.png";
 
import slugify from "react-slugify";
import Link from "next/link";
import { useRouter } from "next/router";


function FantasyNewsCard(props) {
  const router = useRouter();
  function handleMoreTips() {
    // window.location.href = "/fantasy-cricket/";
    router.replace("/fantasy-cricket/")
  }
   
  const [LatestData, setLatestData] = useState([]);
  useEffect(() => {
    homeBannerNewsApi(props.news_type)
      .then((res) => {
        setLatestData(res.data.data);
      })
      .catch((e) => {
   
      });
  }, [props.news_type]);

  return (
    <>
      <div className={styles.latestNews_section}>
        <div className={styles.scrollStyle2}>
          {LatestData.map((item, index) => {
            return (
              <div key={index}>
                <Link
                  className={styles.link_color}
                  href={`/fantasy-cricket/${slugify(item.slug)}/`}
                >
                  <div
                    className={styles.news_card}
                    style={{
                      backgroundImage:
                        item.attachment.length === 0 ||
                        item.attachment === undefined
                          ? `url(${background})`
                          : item.attachment[0].file_name === ""
                          ? `url(${background})`
                          : `url(${HOST}${item.attachment[0].file_uri}/${item.attachment[0].file_name})`,
                    }}
                  >
                    <div className={styles.captions}>
                      <button className={styles.ltsBtn}>
                        {item.category === null
                          ? "Fantasy News"
                          : item.category.name}
                      </button>
                    </div>
                  </div>
                  <p
                    className={styles.ltstitle}
                    dangerouslySetInnerHTML={{
                      __html: item.title,
                    }}
                  ></p>
                  <p className={styles.ltsdate}>{item.date_start}</p>
                </Link>
                <div className={styles.line} />
              </div>
            );
          })}
        </div>

        <button className={styles.ltsMoreBtn} onClick={handleMoreTips}>
        More  Tips
        </button>
      </div>
    </>
  );
}

export default memo(FantasyNewsCard);
