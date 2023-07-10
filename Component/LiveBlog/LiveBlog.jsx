import React, { useState, useEffect } from "react";
import styles from "./LiveBlog.module.scss";
import fb_logo from "../../public/Images/image 4.png";
import twitter_logo from "../../public/Images/image 9.png";
import linkedIn_logo from "../../public/Images/Vector (1).png";
import pinterest_logo from "../../public/Images/Vector.png";
import clap from "../../public/Images/clap.png";
import shareImg from "../../public/Images/share.png";
import heart from "../../public/Images/heart.png";
import fire from "../../public/Images/fire.png";
import cry from "../../public/Images/cry.png";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  push,
  update,
  remove,
  onValue,
  startAt,
  entAt,
  where,
  orderByChild,
  orderBy,
} from "firebase/database";
import { liveMatchByIdApi } from "../../Constants/Api/Api";
import moment from "moment/moment";
import { BiChevronDown } from "react-icons/bi";
import {
  CCloseButton,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
} from "@coreui/react";
 
import { InputGroup } from "react-bootstrap";
import HOST from "../../Constants/host";
import CommentSection from "../CommentSection/CommentSection";
import { useRouter } from "next/router";
import Image from "next/image";

const firebaseConfig = {
  apiKey: "AIzaSyDe_F0qQW5YjvWLncdaIPN4dIHwuUDqWSg",
  authDomain: "oncricket.firebaseapp.com",
  databaseURL: "https://oncricket-default-rtdb.firebaseio.com",
  projectId: "oncricket",
  storageBucket: "oncricket.appspot.com",
  messagingSenderId: "700434180284",
  appId: "1:700434180284:web:ece01ad91651345b0c08b9",
  measurementId: "G-NW6WX0DRBS",
};
const LiveFirbase = initializeApp(firebaseConfig);
const LiveBlog = () => {
  const router = useRouter();
  const { slug } = router.query;
  const match_id = slug[0];
  const pathname = router.asPath;

  const [show, setShow] = useState(false);
  const [blogIId, setBlogIId] = useState("");
  const [blogTeamA, setBlogTeamA] = useState("");
  const [blogTeamB, setBlogTeamB] = useState("");
  const [gender, setGender] = React.useState("MENS");
  const [showliveBlog, setShowliveBlog] = useState(false);
  const [event, setEvent] = useState([]);
  useEffect(() => {
    liveMatchByIdApi(match_id)
      .then((response) => {
        setBlogTeamA(response.data.data.teama.name);
        setBlogTeamB(response.data.data.teamb.name);
        setBlogIId(response.data.data.livedata.response.live_inning.iid);
      })
      .catch((error) => {});
  }, [match_id]);
  useEffect(() => {
    const db = getDatabase();
    const address = match_id + blogIId + "/blog";
    const starCountRef = ref(db, address);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = Object.values(data);
      setEvent(dataArray);
     
    });
  }, [match_id, blogIId]);

  function handleOnClickMens() {
    setGender("MENS");
  }
  function handleOnClickWomens() {
    setGender("WOMENS");
  }

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

  return (
    <div className={styles.LiveBlog_section}>
      <div className={styles.playerTeam}>
        <div className={styles.TeamA}>
          <h4>{blogTeamA}</h4>
        </div>
        <div className={styles.TeamB}>
          <h4>{blogTeamB}</h4>
        </div>
      </div>
      <div className={styles.LiveBlogStart}>
        <div>
          <h2>Live Blog</h2>
        </div>

        <div className="">
          <div className="">
            <div className={styles.first_col_box}>
              <div className={styles.liveBlog_liveAni}>
                <div className={styles.liveblog_liveAnimation}>LIVE</div>
                <div id="div2"></div>
              </div>

              <div className={styles.ind_sri_liveScore}>
                {blogTeamA} VS {blogTeamB} LIVE SCORE
              </div>
              <div className={`row ${styles.lineShare_section}`}>
                <div
                  className={`${styles.bottomLine_section} col-md-9 col-xs-12`}
                ></div>
                <div
                  className={`col-md-3 col-xs-12  ${styles.shareLogo_section}`}
                >
                  <div>Share</div>
                  <Image
                    src={fb_logo}
                    alt="images"
                    className={styles.socialshare_img}
                    onClick={() => {
                      window.open(
                        `https://www.facebook.com/share.php?u=${
                          $url.protocol + HOST.split("/")[2] + pathname
                        }`,
                        "_blank"
                      );
                    }}
                  />
                  <Image
                    src={twitter_logo}
                    alt="images"
                    className={styles.socialshare_img}
                    onClick={() => {
                      window.open(
                        `https://twitter.com/intent/tweet?url=${
                          $url.protocol + HOST.split("/")[2] + pathname
                        }`,
                        "_blank"
                      );
                    }}
                  />
                  <Image
                    src={pinterest_logo}
                    alt="images"
                    className={styles.socialshare_img}
                    onClick={() => {
                      window.open(
                        `http://pinterest.com/pin/create/link/?url=${
                          $url.protocol + HOST.split("/")[2] + pathname
                        }`,
                        "_blank"
                      );
                    }}
                  />
                  <Image
                    src={linkedIn_logo}
                    alt="images"
                    className={styles.socialshare_img}
                    onClick={() => {
                      window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=${
                          $url.protocol + HOST.split("/")[2] + pathname
                        }`,
                        "_blank"
                      );
                    }}
                  />
                </div>
              </div>
              {event.length === 0 ? (
                <div style={{ margin: "20px" }}>
                  <h6 style={{ margin: "700" }}>No Live Scoring Now</h6>
                </div>
              ) : (
                event.map((item, index) => {
                  return (
                    <div className={styles.boxLine_section} key={index}>
                      <div className={styles.lineCircle_section}>
                        <div className={styles.line1}>
                          <div className={styles.circle}></div>
                          <div className={styles.line2}></div>
                        </div>
                      </div>
                      <div style={{ width: "97%" }}>
                        <div className={styles.sportTeam_font}>
                          By SportzWiki Team
                        </div>

                        <div className={styles.liveBox_section}>
                          <div className={styles.firstPart}>
                            <div className={styles.dateTime_section}>
                              <p className={styles.time_section}>
                                {moment(item.start_time).format("LT")}
                              </p>
                              <p className={styles.date_section}>
                                {moment(item.start_time).format("MMMM")}
                                {moment(item.start_time).format("D")},{" "}
                                {moment(item.start_time).format("YYYY")}
                              </p>
                            </div>
                            <div className={styles.midLine}></div>
                            <div className={styles.rightBox_section}>
                              <div className={styles.para_section}>
                                <div className={styles.radhaFont}>
                                  {item.action}
                                </div>
                                <div className={styles.paraFont}>
                                  {item.description}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.secondPart}>
                            <div className={styles.square_box}>
                              <img
                                src={clap}
                                alt="images"
                                className={styles.clapImg}
                              />
                              10
                            </div>
                            <div className={styles.share_section}>
                              <div className={styles.shareTag}>
                                Share{" "}
                                <img
                                  src={shareImg}
                                  alt="images"
                                  className={styles.shareImg}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div className={styles.boxLine_section}>
                <div className={styles.lineCircle_section}>
                  <div className={styles.line1}>
                    <div className={styles.line2}></div>
                  </div>
                </div>
                <div
                  className={`${styles.commentSection} ${styles.liveBox_section}`}
                >
                  <div>
                    <h5>COMMENTS (10)</h5>
                  </div>
                  <div className={styles.inputsection}>
                    <div
                      className={styles.commnet_post}
                      onClick={() => setShow(true)}
                    >
                      <h6>post you comment here</h6>
                    </div>
                    <COffcanvas
                      placement="end"
                      scroll={true}
                      visible={show}
                      onHide={() => setShow(false)}
                      style={{ width: "15%" }}
                    >
                      <COffcanvasHeader>
                        <div className={styles.CommentHeader}>
                          <div className={styles.greeting}>
                            <h6>
                              hi hitesh sharma
                              <span>
                                <BiChevronDown />
                              </span>
                            </h6>
                          </div>
                          <div className={styles.latest}>
                            <h6>
                              Latest
                              <span>
                                <BiChevronDown />
                              </span>
                            </h6>
                          </div>
                        </div>
                        <div className={styles.CommentHeader2}>
                          <h5>SRI LANKA WOMEN TOUR OF India 2022 (1st T20)</h5>
                        </div>

                        <div className={styles.CommentHeader3}>
                          <div className="">
                            <h6>All Comments</h6>
                          </div>
                          <div className="">
                            <h6>Replies</h6>
                          </div>
                        </div>
                        <hr />
                      </COffcanvasHeader>
                      <COffcanvasBody>
                        <CommentSection />
                      </COffcanvasBody>
                      <COffcanvasHeader>
                        <div className={styles.CommentFooter}>
                          <div className={styles.input_group}>
                            <input
                              type="text"
                              class="form-control"
                              aria-label="Sizing example input"
                              aria-describedby="inputGroup-sizing-default"
                              placeholder="write your comment here..."
                            />
                          </div>
                        </div>
                      </COffcanvasHeader>
                    </COffcanvas>
                    <div className={styles.live_blog}>
                      <h6>Live Blog</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveBlog;
