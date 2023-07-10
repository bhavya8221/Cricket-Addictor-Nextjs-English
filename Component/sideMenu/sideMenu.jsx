import React from "react";
import { Accordion } from "react-bootstrap";
import { TbLivePhoto } from "react-icons/tb";
import { TfiTimer } from "react-icons/tfi";
import { GiCricketBat, GiRank2 } from "react-icons/gi";
import { GrAnnounce } from "react-icons/gr";
import { BsDot, BsBarChart } from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";
import { RiTShirt2Line } from "react-icons/ri";
// import { FaNewspaper } from "react-icons/fa";
import { CiPlay1 } from "react-icons/ci";
import { ImNewspaper } from "react-icons/im";
import { MdVideoLibrary, MdOutlineTipsAndUpdates } from "react-icons/md";
import styles from "./sideMenu.module.scss";
import slugify from "react-slugify";
// import axios from "axios";
// import dataList from "../../Common/data.json";
import Link from "next/link";
import { useRouter } from "next/router";

function SideMenu({ dataList, handleClose }) {
  if (!dataList || !dataList.data || !dataList.data.teams) {
    // Handle the case when `dataList` or its properties are undefined
    return null; // Or render an alternative content or show a loading state
  }
  const router = useRouter();
  const pathname = router.asPath;
  return (
    <div
      className={styles.SideMenu}
    // style={{ background: theme === "dark" ? "grey" : "unset" }}
    >
      <div className={styles.scrollView}>
        <div style={{ marginLeft: "10px", marginRight: "10px" }}>
          <div className={styles.SideButtonTop}>
            <Link
              href="/cricket-live-score/live-matches/all/"
              className={styles.link}
            >
              <div
                className={styles.sidemenuButton}
                style={{
                  marginTop: 5,
                  backgroundColor:
                    pathname.split("/")[2] === "live-matches"
                      ? "var(--primary)"
                      : "#e9eaf4",
                  color:
                    pathname.split("/")[2] === "live-matches"
                      ? "white"
                      : "black",
                }}
                onClick={handleClose}
              >
                <TbLivePhoto className={styles.icon1} />
                <h5>Live matches</h5>
              </div>
            </Link>
            <Link
              href="/cricket-live-score/recent-matches/undefined/undefined/undefined/all/"
              className={styles.link}
            >
              <div
                className={styles.sidemenuButton}
                style={{
                  background:
                    pathname.split("/")[2] === "recent-matches"
                      ? "var(--primary)"
                      : "#e9eaf4",
                  color:
                    pathname.split("/")[2] === "recent-matches"
                      ? "white"
                      : "black",
                }}
                onClick={handleClose}
              >
                <TfiTimer className={styles.icon1} />
                <h5>Completed matches</h5>
              </div>
            </Link>
            <Link
              href="/cricket-live-score/upcoming-matches/all/"
              className={styles.link}
            >
              <div
                className={styles.sidemenuButton}
                style={{
                  background:
                    pathname.split("/")[2] === "upcoming-matches"
                      ? "var(--primary)"
                      : "#e9eaf4",
                  color:
                    pathname.split("/")[2] === "upcoming-matches"
                      ? "white"
                      : "black",
                }}
                onClick={handleClose}
              >
                <GiCricketBat className={styles.icon1} />
                <h5>Upcoming matches</h5>
              </div>
            </Link>
          </div>
        </div>
        <Accordion className={styles.sectionList}>
          <Accordion.Item eventKey="0">
            <Accordion.Header style={{ color: "blue" }}>
              <div
                className={styles.sidemenuButtonSection}
                style={{
                  backgroundColor:
                    pathname.split("/")[1] === "cricket-series"
                      ? null
                      : "unset",
                  color:
                    pathname.split("/")[1] === "cricket-series"
                      ? "var(--primary)"
                      : "black",
                }}
              >
                <BsBarChart className={styles.icon} />
                <h5>Series</h5>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {dataList.data.series.slice(0, 4).map((item, index) => (
                <Link
                  key={index}
                  href={`/cricket-series/${item.status}/${item.cid}/${slugify(
                    item.title
                  )}-${item.season}/schedule/`}
                  className={styles.link}
                  passHref // Add passHref prop to forward href to the anchor tag
                >
                  <div // Replace the div with an anchor tag
                    className={styles.sidemenuDropDownButton}
                    style={{
                      backgroundColor:
                        pathname.split("/")[4] ===
                          `${slugify(item.title)}-${item.season}`
                          ? "var(--primary)"
                          : "unset",
                      color:
                        pathname.split("/")[4] ===
                          `${slugify(item.title)}-${item.season}`
                          ? "white"
                          : "black",
                    }}
                    onClick={handleClose}
                  >
                    <BsDot className={styles.icon} />
                    <h5>
                      {item.title}&nbsp;{item.season}
                    </h5>
                  </div>
                </Link>
              ))}
              <Link
                href="/cricket-series/live/"
                onClick={handleClose}
                className={styles.link}
              >
                <div>
                  <h6 className={styles.allList}>all series</h6>
                </div>
              </Link>
            </Accordion.Body>
          </Accordion.Item>

          <hr />

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div
                className={styles.sidemenuButtonSection}
                style={{
                  backgroundColor:
                    pathname === "/teams-men/" ||
                      pathname === "/teams-women/" ||
                      pathname.split("/")[1] === "teams"
                      ? null
                      : "unset",
                  color:
                    pathname === "/teams-men/" ||
                      pathname === "/teams-women/" ||
                      pathname.split("/")[1] === "teams"
                      ? "var(--primary)"
                      : "black",
                }}
              >
                <RiTShirt2Line className={styles.icon} />
                <h5>Team</h5>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {dataList.data.teams.slice(0, 4).map((item, index) => (
                <Link
                  key={index}
                  href={`/teams/men/${item.tid}/${slugify(
                    item.title
                  )}-cricket-team/`}
                  className={styles.link}
                  passHref // Add passHref prop to forward href to the anchor tag
                >
                  <div // Replace the div with an anchor tag
                    className={styles.sidemenuDropDownButton}
                    style={{
                      backgroundColor:
                        pathname.split("/")[4] ===
                          `${slugify(item.title)}-cricket-team`
                          ? "var(--primary)"
                          : "unset",
                      color:
                        pathname.split("/")[4] ===
                          `${slugify(item.title)}-cricket-team`
                          ? "white"
                          : "black",
                    }}
                    onClick={handleClose}
                  >
                    <BsDot className={styles.icon} />
                    <h5> {item.title} National Cricket Team</h5>
                  </div>
                </Link>
              ))}
              <div>
                <Link
                  href="/teams/men/"
                  onClick={handleClose}
                  className={styles.link}
                >
                  <div>
                    <h6
                      className={styles.allList}
                      style={{ textAlign: "right" }}
                    >
                      All Team
                    </h6>
                  </div>
                </Link>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <hr />
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <div
                className={styles.sidemenuButtonSection}
                style={{
                  backgroundColor:
                    pathname.split("/")[2] === "all" ? null : "unset",
                  color:
                    pathname.split("/")[2] === "all"
                      ? "var(--primary)"
                      : "black",
                }}
              >
                <ImNewspaper className={styles.icon} />
                <h5>News</h5>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div>
                <Link
                  href="/cricket-news/all/"
                  passHref
                  className={styles.link}
                >
                  <div
                    style={{
                      padding: "2px",
                      backgroundColor:
                        pathname.split("/")[2] === "all"
                          ? "var(--primary)"
                          : "unset",
                      color:
                        pathname.split("/")[2] === "all" ? "white" : "black",
                    }}
                    onClick={handleClose}
                  >
                    <h5>
                      <span>
                        {" "}
                        <GrAnnounce className={styles.icon} />
                      </span>{" "}
                      All News
                    </h5>
                  </div>
                </Link>
              </div>
              <div>
                {dataList.data.category.length === 0
                  ? null
                  : dataList.data.category.slice(0, 4).map((item, index) => (
                    <Link
                      key={index}
                      href={`/${slugify(item.name)}/`}
                      passHref
                      className={styles.link}
                    >
                      <div
                        className={styles.sidemenuDropDownButton}
                        style={{
                          backgroundColor:
                            pathname.split("/")[1] ===
                              `${slugify(item.name)}` &&
                              pathname.split("/")[2] !== "all"
                              ? "var(--primary)"
                              : "unset",
                          color:
                            pathname.split("/")[1] ===
                              `${slugify(item.name)}` &&
                              pathname.split("/")[2] !== "all"
                              ? "white"
                              : "black",
                        }}
                        onClick={handleClose}
                      >
                        <BsDot className={styles.icon} />
                        <h5> {item.name}</h5>
                      </div>
                    </Link>
                  ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <hr />
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <div
                className={styles.sidemenuButtonSection}
                style={{
                  backgroundColor:
                    pathname.split("/")[1] === "ipl" ? null : "unset",
                  color:
                    pathname.split("/")[1] === "ipl"
                      ? "var(--primary)"
                      : "black",
                }}
              >
                <CiPlay1 className={styles.icon} />
                <h5>Ipl</h5>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div>
                {dataList.data.IPL.slice(0, 4).map((item, index) => (
                  <Link
                    key={index}
                    href={`/ipl/ipl-${item.season}/${item.cid}/`}
                    passHref
                    className={styles.link}
                  >
                    <div
                      className={styles.sidemenuDropDownButton}
                      style={{
                        backgroundColor:
                          pathname.split("/")[2] === item.season.toString()
                            ? "var(--primary)"
                            : "unset",
                        color:
                          pathname.split("/")[2] === item.season.toString()
                            ? "white"
                            : "black",
                      }}
                      onClick={handleClose}
                    >
                      <h5>
                        <span>
                          <BsDot className="icon" />
                        </span>
                        {item.abbr} {item.season}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>
              <div>
                <Link href="/ipl/" passHref className={styles.link}>
                  <div onClick={handleClose}>
                    <h6>All&nbsp;Ipl</h6>
                  </div>
                </Link>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <hr />
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <div
                className={styles.sidemenuButtonSection}
                style={{
                  backgroundColor:
                    pathname === "/videos/highlights/" ||
                      pathname === "/videos/interviews/" ||
                      pathname === "/videos/press-conferences/" ||
                      pathname === "videos/"
                      ? null
                      : "unset",
                  color:
                    pathname === "/highlights/" ||
                      pathname === "/videos/interviews/" ||
                      pathname === "/videos/press-conferences/" ||
                      pathname === "videos/"
                      ? "var(--primary)"
                      : "black",
                }}
              >
                <MdVideoLibrary className={styles.icon} />
                <h5>Videos</h5>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <>
                <Link href="/videos/highlights/" className={styles.link}>
                  <div
                    className={styles.sidemenuDropDownButton}
                    style={{
                      backgroundColor:
                        pathname === "/videos/highlights/"
                          ? "var(--primary)"
                          : "unset",
                      color:
                        pathname === "/videos/highlights/" ? "white" : "black",
                    }}
                    onClick={handleClose}
                  >
                    <BsDot className={styles.icon} />
                    <h5>Highlights</h5>
                  </div>
                </Link>
                <Link href="/videos/interviews/" className={styles.link}>
                  <div
                    className={styles.sidemenuDropDownButton}
                    style={{
                      backgroundColor:
                        pathname === "/videos/interviews/"
                          ? "var(--primary)"
                          : "unset",
                      color:
                        pathname === "/videos/interviews/" ? "white" : "black",
                    }}
                    onClick={handleClose}
                  >
                    <BsDot className={styles.icon} />
                    <h5>Interviews</h5>
                  </div>
                </Link>
                <Link href="/videos/press-conferences/" className={styles.link}>
                  <div
                    className={styles.sidemenuDropDownButton}
                    style={{
                      backgroundColor:
                        pathname === "/videos/press-conferences/"
                          ? "var(--primary)"
                          : "unset",
                      color:
                        pathname === "/videos/press-conferences/"
                          ? "white"
                          : "black",
                    }}
                    onClick={handleClose}
                  >
                    <BsDot className={styles.icon} />
                    <h5>Press Conferences</h5>
                  </div>
                </Link>
                <Link href="/videos/all/" className={styles.link}>
                  <div
                    className={styles.sidemenuDropDownButton}
                    style={{
                      backgroundColor:
                        pathname === "/videos/all/"
                          ? "var(--primary)"
                          : "unset",
                      color: pathname === "/videos/all/" ? "white" : "black",
                    }}
                    onClick={handleClose}
                  >
                    <BsDot className={styles.icon} />
                    <h5>All Videos</h5>
                  </div>
                </Link>
              </>
            </Accordion.Body>
          </Accordion.Item>
          <hr />
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              <div
                className={styles.sidemenuButtonSection}
                style={{
                  backgroundColor:
                    pathname.split("/")[1] === "icc-rankings-men" ||
                      pathname.split("/")[1] === "icc-rankings-women"
                      ? null
                      : "unset",
                  color:
                    pathname.split("/")[1] === "icc-rankings-men" ||
                      pathname.split("/")[1] === "icc-rankings-women"
                      ? "var(--primary)"
                      : "black",
                }}
              >
                <GiRank2 className={styles.icon} />
                <h5>Ranking</h5>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <>
                <Link
                  href="/icc-rankings-men/teams/tests/"
                  className={styles.link}
                >
                  <div
                    className={styles.sidemenuDropDownButton}
                    style={{
                      backgroundColor:
                        pathname.split("/")[1] === "icc-rankings-men"
                          ? "var(--primary)"
                          : "unset",
                      color:
                        pathname.split("/")[1] === "icc-rankings-men"
                          ? "white"
                          : "black",
                    }}
                    onClick={handleClose}
                  >
                    <BsDot className={styles.icon} />
                    <h5>ICC Ranking - men</h5>
                  </div>
                </Link>
                <Link
                  href="icc-rankings-women/teams/tests/"
                  className={styles.link}
                >
                  <div
                    className={styles.sidemenuDropDownButton}
                    style={{
                      backgroundColor:
                        pathname.split("/")[1] === "icc-rankings-women"
                          ? "var(--primary)"
                          : "unset",
                      color:
                        pathname.split("/")[1] === "icc-rankings-women"
                          ? "white"
                          : "black",
                    }}
                    onClick={handleClose}
                  >
                    <BsDot className="icon" />
                    <h5>ICC Ranking - women</h5>
                  </div>
                </Link>
              </>
            </Accordion.Body>
          </Accordion.Item>

          <hr />
          <div className={`${styles.Section} ${styles.SectionFantsay}`}>
            <Link href="/players/" className={styles.link}>
              <div
                className={styles.sidemenuButtonSectionFantasy}
                style={{
                  backgroundColor:
                    pathname.split("/")[1] === "players" ? null : "unset",
                  color:
                    pathname.split("/")[1] === "players"
                      ? "var(--primary)"
                      : "black",
                }}
                onClick={handleClose}
              >
                <AiOutlineTeam className={styles.icon} />
                <h5>Player</h5>
              </div>
            </Link>
          </div>
          <hr />
          <div className={`${styles.Section} ${styles.SectionFantsay}`}>
            <Link href="/fantasy-cricket/" className={styles.link}>
              <div
                className={styles.sidemenuButtonSectionFantasy}
                style={{
                  backgroundColor:
                    pathname.split("/")[1] === "fantasy-cricket"
                      ? null
                      : "unset",
                  color:
                    pathname.split("/")[1] === "fantasy-cricket"
                      ? "var(--primary)"
                      : "black",
                }}
                onClick={handleClose}
              >
                <MdOutlineTipsAndUpdates className={styles.icon} />
                <h5>Fantasy Tips</h5>
              </div>
            </Link>
          </div>
        </Accordion>
      </div>
    </div>
  );
}

export default SideMenu;
