import React, { useState, useEffect } from "react";
import styles from "./IPLResults.module.scss";
// import { Link, useLocation, useParams } from "react-router-dom";
import { iPLScheduleResultApi } from "../../../../../../../../../Constants/Api/Api";
import Pagination from "@mui/material/Pagination";
import usePagination from "@mui/material/usePagination";
import HOST from "../../../../../../../../../Constants/host";
import slugify from "react-slugify";
import { useRouter } from "next/router";
import Link from "next/link";

const IPLResults = () => {
  const router = useRouter();
  const { cid, tid } = router.query;
  // const navigate = useNavigate();
  const [teamWiseCompletedMatch, setTeamWiseCompletedMatch] = useState([]);
  const [allTeamWiseData, setAllTeamWiseData] = useState(0);
  const pathname = router.asPath;

  let [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const count = Math.ceil(allTeamWiseData.length / PER_PAGE);
  const _DATA = usePagination(teamWiseCompletedMatch, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  function url($url) {
    var url = $url.split("//");
    if (url[0] === "http:" || url[0] === "https:") {
      var protocol = url[0] + "//";
      var host = url[1].split("/")[0];
      url = protocol + host;
      var path = $url.split(url)[1];
      return {
        protocol: protocol,
        host: host,
        path: path,
      };
    }
  }
  var $url = url(HOST);
  // const canonicalUrl = `${$url.protocol}${HOST.split("/")[2]}${pathname}`;
  const baseUrl = `${$url.protocol}${HOST.split("/")[2]}${pathname}`;
  // const primaryUrl = `${baseUrl}`;

  const currentPageUrl = page === 1 ? `${baseUrl}` : `${baseUrl}?page=${page}`;
  const prevPageUrl = page > 1 ? `${baseUrl}?page=${page - 1}` : null;
  const nextPageUrl = page < count ? `${baseUrl}?page=${page + 1}` : null;

  function getDate(value) {
    var date = new Date(value);
    return date.toLocaleDateString();
  }

  const getDay = (data) => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekday[new Date(data).getDay()];
  };

  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // setIsLoading(true);
    iPLScheduleResultApi(tid, cid, "", "", "Completed")
      .then((res) => {
        setAllTeamWiseData(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
    iPLScheduleResultApi(tid, cid, "", "", "Completed")
      .then((res) => {
        setTeamWiseCompletedMatch(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [cid, tid, PER_PAGE, page]);


  return (
    <div className={styles.IPL_Results}>
      {teamWiseCompletedMatch.map((item, index) => {
        return (
          <div className={styles.livecomm_section} key={index}>
            <div className={styles.card_child}>
              <div className={`row ${styles.ss}`}>
                <div className={`col-lg-5 col-md-12 ${styles.flex_row}`}>
                  <div className={styles.row_style}>
                    <div className={styles.card_imgs}>
                      <img
                        alt="images"
                        className={styles.img_flag}
                        src={item.teama.logo_url}
                      />
                    </div>
                    <div className={styles.comment_data}>
                      <h5>{item.teama.short_name}</h5>
                      <h4>{item.teama.scores}</h4>
                      <h5>({item.teama.overs})</h5>
                    </div>
                  </div>
                  <div className={styles.text_vs}>
                    <h4 className={styles.text_yellow}>V/S</h4>
                  </div>
                  <div className={styles.desktop}>
                    <div className={styles.row_style}>
                      <div className={styles.comment_dat_right}>
                        <h5>{item.teamb.short_name}</h5>
                        <h5>{item.teamb.scores}</h5>
                        <h5>({item.teamb.overs})</h5>
                      </div>
                      <div>
                        <img
                          alt="images"
                          className={styles.img_flag}
                          src={item.teamb.logo_url}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.mobile}>
                    <div className={styles.row_style}>
                      <div>
                        <img
                          alt="images"
                          className={styles.img_flag}
                          src={item.teamb.logo_url}
                        />
                      </div>
                      <div className={styles.comment_data_right}>
                        <h5>{item.teamb.short_name}</h5>
                        <h5>{item.teamb.scores}</h5>
                        <h5>({item.teamb.overs})</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-12">
                  <div className={`${styles.text_border} ${styles.comment_data}`}>
                    {/* <h6 className="text-red">{item.result}</h6> */}
                    <Link
                      href={`/cricket-live-score/recent-matches/${
                        item.match_id
                      }/${item.latest_inning_number}/${slugify(
                        item.short_title
                      )}-${slugify(item.subtitle)}-${slugify(
                        item.competition.title
                      )}/`}
                      className={styles.match_Center}
                    >
                      MATCH CENTRE
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className={styles.comment_data_col3}>
                    {/* <div className="status_button">
                      <div>
                        <h6 className="live_text">Match Ended</h6>
                      </div>
                    </div> */}
                    <h6>
                      <b>
                        {" "}
                        {getDay(item.competition.datestart)},{" "}
                        {getDate(item.date_start)}
                      </b>
                    </h6>
                    <h6>
                      {item.subtitle} at {item.venue.name},(
                      {item.venue.location}),{getDate(item.date_start)}
                    </h6>
                    <h6>{item.result}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div>
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default IPLResults;
