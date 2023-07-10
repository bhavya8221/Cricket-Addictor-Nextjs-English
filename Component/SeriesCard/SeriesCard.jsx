import React, { useEffect } from "react";
import styles from "./SeriesCard.module.scss";
import { Card } from "react-bootstrap";

import slugify from "react-slugify";
import { useRouter } from "next/router";
import { Link } from "@mui/material";

function SeriesCard(props) {
  const router = useRouter();
  const pathname = router.asPath;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  // const eventSchema = {
  //   "@context": "http://schema.org",
  //   "@type": "SportsEvent",
  //   name: props.data.title,
  //   startDate: props.data.date_start,
  //   endDate: props.data.dateend,
  // };

  return (
    <>
      <div className={styles.seriesCard_section}>
        {/* <Head>
          <script type="application/ld+json">
            {JSON.stringify(eventSchema)}
          </script>
        </Head> */}
        <Card
          className={styles[("series-Card-Section", "mt-4")]}
          style={{ borderColor: "black" }}
        >
          <Card.Body className={styles.Scustom_card}>
            <div className="row row-style">
              <div className="col">
                <p className={styles["Stitle-card"]}>
                  {props.data.title} {props.data.season}
                </p>
                <p className={styles["Sdate-card"]}>
                  {props.data.date_start} - {props.data.dateend}
                </p>
              </div>
              <div className="col">
                {pathname === "/cricket-series/live/" ? (
                  <div className={styles["right-side-col"]}>
                    <h5
                      className={`mx-1 ${styles.Schedule}`}
                      onClick={() => {
                        const path = `/cricket-series/${props.data.status}/${
                          props.data.cid
                        }/${slugify(props.data.title)}-${
                          props.data.season
                        }/schedule/`;
                        router.push(path);
                      }}
                    >
                      Schedule
                    </h5>

                    <h5
                      className={`mx-1 ${styles.Schedule}`}
                      onClick={() => {
                        const path = `/cricket-series/${props.data.status}/${
                          props.data.cid
                        }/${slugify(props.data.title)}-${
                          props.data.season
                        }/result/`;
                        router.push(path);
                      }}
                    >
                      Result
                    </h5>

                    <h5
                      className={`mx-1 ${styles.Schedule}`}
                      onClick={() => {
                        const path = `/cricket-series/${
                          props.data.status
                        }/${props.data.cid}/${slugify(props.data.title)}-${
                          props.data.season
                        }/stats/`;
                        router.push(path);
                      }}
                    >
                      Stats
                    </h5>
                  </div>
                ) : pathname === "/cricket-series/recent/" ? (
                  <div className={styles["right-side-col"]}>
                    <h5
                      className={`mx-1 ${styles.Schedule}`}
                      onClick={() => {
                        const path = `/cricket-series/${
                          props.data.status
                        }/${props.data.cid}/${slugify(props.data.title)}-${
                          props.data.season
                        }/result`;
                        router.push(path);
                      }}
                    >
                      Result
                    </h5>

                    <h5
                      className={`mx-1 ${styles.Schedule}`}
                      onClick={() => {
                        const path = `/cricket-series/${
                          props.data.status
                        }/${props.data.cid}/${slugify(props.data.title)}-${
                          props.data.season
                        }/stats/`;
                        router.push(path);
                      }}
                    >
                      Stats
                    </h5>
                  </div>
                ) : (
                  <div className={styles["right-side-col"]}>
                    <h5
                      className={`mx-1 ${styles.Schedule}`}
                      onClick={() => {
                        const path = `/cricket-series/${
                          props.data.status
                        }/${props.data.cid}/${slugify(props.data.title)}-${
                          props.data.season
                        }/schedule/`;
                        router.push(path);
                      }}
                    >
                      Schedule
                    </h5>

                    <h5
                      className={`mx-1 ${styles.Schedule}`}
                      onClick={() => {
                        const path = `/cricket-series/${
                          props.data.status
                        }/${props.data.cid}/${slugify(props.data.title)}-${
                          props.data.season
                        }/stats/`;
                        router.push(path);
                      }}
                    >
                      Stats
                    </h5>
                  </div>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default SeriesCard;
