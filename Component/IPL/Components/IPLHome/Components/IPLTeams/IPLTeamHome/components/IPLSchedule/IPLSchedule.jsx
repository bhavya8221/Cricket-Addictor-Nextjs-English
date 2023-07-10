import React, { useState, useEffect } from "react";
// import { Link, useLocation, useParams } from "react-router-dom";
import styles from  "./IPLSchedule.module.scss";
import {iPLScheduleResultApi } from "../../../../../../../../../Constants/Api/Api";
import Pagination from '@mui/material/Pagination';
import usePagination from '@mui/material/usePagination';
import HOST from "../../../../../../../../../Constants/host";
import { useRouter } from "next/router";

const IPLSchedule = () => {
  const router =useRouter()
  const { cid, tid } = router.query
  // const navigate = useNavigate();
  const [teamWiseLiveMatch, setTeamWiseLiveMatch] = useState([]); //don't remove
  const [teamWiseScheduledMatch, setTeamWiseScheduledMatch] = useState([]);
  const [allTeamWiseData, setAllTeamWiseData] = useState(0);
  const pathname=router.asPath
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;
  
  var teamWiseMatch = teamWiseLiveMatch.concat(teamWiseScheduledMatch);

  const count = Math.ceil(allTeamWiseData.length / PER_PAGE);
  const _DATA = usePagination(teamWiseMatch, PER_PAGE);
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
    iPLScheduleResultApi(tid, cid, "", "", "Scheduled")
      .then((res) => {
        setAllTeamWiseData(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });

    iPLScheduleResultApi(tid, cid, PER_PAGE, page, "Scheduled")
      .then((res) => {
        setTeamWiseScheduledMatch(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });

    // TeamWiseMatchListAPI(tid, "Live", page, PER_PAGE)
    //   .then((res) => {
    //     setTeamWiseLiveMatch(res.data.data);
    //     // setIsLoading(false);
    //     if (res.data.code !== 200) {
    //       Navigation();
    //     }
    //   })
    //   .catch((e) => {
    //     Navigation();
    //   });
  }, [cid, tid, page, PER_PAGE]);


  return (
    <div className="IPL_Schedule">
     
      {teamWiseLiveMatch.length === 0 ? (
       null
      ) : (
        teamWiseMatch.map((item, index) => {
          return (
            <div className="livecomm-section" key={index}>
              <div className="card-child">
                <div className="row ss">
                  <div className="col-lg-5 col-md-12 flex-row">
                    <div className="row-style">
                      <div className="card-imgs">
                        <img
                          alt="images"
                          className="img-flag"
                          src={item.teama.logo_url}
                        />
                      </div>
                      <div className="comment-data">
                        <h5>{item.teama.name}</h5>
                        <h4>{item.teama.scores}</h4>
                        <h5>{item.teama.scores_full}</h5>
                      </div>
                    </div>
                    <div className="text-vs">
                      <h4 className="text_yellow">V/S</h4>
                    </div>
                    <div className="desktop">
                      <div className="row-style">
                        <div className="comment-data-right">
                          <h5>{item.teamb.name}</h5>
                          <h4>{item.teamb.scores}</h4>
                          <h5>{item.teamb.scores_full}</h5>
                        </div>
                        <div>
                          <img
                            alt="images"
                            className="img-flag"
                            src={item.teamb.logo_url}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mobile">
                      <div className="row-style">
                        <div>
                          <img
                            alt="images"
                            className="img-flag"
                            src={item.teamb.logo_url}
                          />
                        </div>
                        <div className="comment-data-right">
                          <h5>{item.teamb.name}</h5>
                          <h4>{item.teamb.scores}</h4>
                          <h5>{item.teamb.scores_full}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-12">
                    <div className="text-border comment-data">
                      {/* <h6 className="text-red">SUPERNOVAS WON BY 4 RUNS(WINNERS)</h6> */}
                      <Link
                        to={`/cricket-live-score/${
                          item.status_str === "Scheduled" ? "upcoming" : "live"
                        }/${item.match_id}/${item.latest_inning_number}`}
                        className="match-box"
                      >
                        MATCH CENTRE
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-12">
                    <div className="comment-data-col3">
                      <div className="status_button">
                        <div>
                          <h6 className="live_text">
                            {item.status_str === "Live"
                              ? "Live"
                              : item.status_str === "Completed"
                              ? "Match Ended"
                              : item.status_str === "Scheduled"
                              ? // ? "Notify"
                                "Match Upcoming"
                              : "-"}
                            {item.status_str === "live" ? (
                              <div id="div1"></div>
                            ) : null}
                          </h6>
                        </div>
                        <div>
                          {/* {item.status_str === "Scheduled" ? (
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckDefault"
                              disabled
                            />
                          </div>
                        ) : null} */}
                        </div>
                      </div>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}

      <div>
        {teamWiseLiveMatch.length === 0 ? null : (
          <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default IPLSchedule;
