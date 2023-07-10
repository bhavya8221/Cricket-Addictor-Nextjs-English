import React, { useState, useEffect } from "react";
import noPlayer from "../../../public/Images/no-player.png";
import styles from "../../../styles/players.module.scss";
import { playersAPI } from "../../../Constants/Api/Api";
import HOST from "../../../Constants/host";
import slugify from "react-slugify";
import DataList from "../../../Common/data.json";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Breadcrumbs from "../../../Common/BreadcrumbsSchema/Breadcrumbs";

const Players = () => {
   

  const router = useRouter();
  const { team, tid } = router.query;
  const [teamID, setTeamID] = useState(25);
  const [teamName, setTeamName] = useState("India");
  const [alpha, setAlph] = useState("A");
  const [playerData, setPlayerData] = useState([]);
  const [playingRole, setPlayingRole] = useState("");
  const [format, setFormat] = useState("");
  function getEventId(value1, value2) {
    setTeamID(value1);
    setTeamName(value2);
  }

    function handleClick(letter) {
      setAlph(letter);
    }

  //   const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   for (let i = 0; i < alphabet.length; i++) {
  //     const letter = alphabet.charAt(i);
  //     window["handleClick" + letter] = handleClick.bind(null, letter);
  //   }

  //   function handleClickInitial() {
  //     setPlayingRole("");
  //     setFormat("");
  //   }
  //   // function handleClickPlayingRoleAll() {
  //   //   setFormat("All");
  //   // }
  //   function handleClickPlayingRoleTest() {
  //     setPlayingRole("");
  //     setFormat("Test");
  //   }
  //   function handleClickPlayingRoleOdi() {
  //     setPlayingRole("");
  //     setFormat("ODI");
  //   }
  //   function handleClickPlayingRoleT20I() {
  //     setPlayingRole("");
  //     setFormat("T20I");
  //   }
  //   function handleClickPlayingRoleWTest() {
  //     setPlayingRole("");
  //     setFormat("WTest");
  //   }
  //   function handleClickPlayingRoleWOdi() {
  //     setPlayingRole("");
  //     setFormat("WODI");
  //   }
  //   function handleClickPlayingRoleWT20I() {
  //     setPlayingRole("");
  //     setFormat("WT20I");
  //   }
  //   function handleClickPlayingRoleAllRounder() {
  //     setFormat("");
  //     setPlayingRole("all");
  //   }
  //   function handleClickPlayingRoleBatters() {
  //     setFormat("");
  //     setPlayingRole("bat");
  //   }
  //   function handleClickPlayingRoleBowlers() {
  //     setFormat("");
  //     setPlayingRole("bowl");
  //   }
  //   function handleClickPlayingRoleWks() {
  //     setFormat("");
  //     setPlayingRole("wk");
  //   }
  //   // const navigate = useNavigate();
  //   // const Navigation = useCallback(
  //   //   (value1, value2) => {
  //   //     let value = `/error/${value1}/${value2}`;
  //   //     navigate(value);
  //   //   },
  //   //   [navigate]
  //   // );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    playersAPI(tid, alpha, playingRole, format)
      .then((res) => {
        setPlayerData(res.data.data[0].Allplayer);
      })
      .catch((e) => {
     
      });
  }, [teamID, alpha, playingRole, format, tid]);


  const articleBreadcrumb = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${HOST}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Players",
        item: `${HOST}players/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: teamName,
        item: `${HOST}${router.asPath}/`,
      },
    ],
  };
 
  return (
    <>
      <Head>
        <title itemprop="name">
        All {teamName} cricket players, contracted players, profiles, stats, records, averages, photos & videos
        </title>
        <meta
          name="description"
          itemprop="description"
          content={`${teamName} cricket players, full details of ${teamName} cricketers - profile, batting & averages, stats in ${teamName} and abroad, full statistics, records and photos
          `}
        />

        <Link rel="canonical" href={`${HOST}players/${teamName}/`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleBreadcrumb),
          }}
        />
      </Head>

      <div className={styles.PlayersDisplay}>
        <div className={styles.PlayerTeam}>
          <div className={styles.player_row}>
            <div className={styles.player_col1}>
              <h5>Player</h5>
            </div>
            <div className={styles.player_col2}>
              {DataList.data.teams.map((item, index) => {
                return (
                  <Link
                    href={`/players/${slugify(item.title)}/${item.tid}/`}
                    className={styles.link}
                    key={index}
                  >
                    <h5
                      onClick={() => getEventId(item.tid, item.title)}
                      style={{
                        backgroundColor:
                          teamID === item.tid ? "var(--primary)" : "white",
                        color: teamID === item.tid ? "white" : "black",
                      }}
                    >
                      {item.title}
                    </h5>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} />

        <div className={styles.PlayerBox}>
          <h5 style={{ fontSize: 18 }}>
            {teamName} Player
          </h5>
          <div className={styles.List}>
            <div className={styles.ActivePlayer}>Active Player</div>
            <div className={styles.Alphabets}>
              <span>|</span>
              {Array.from(Array(26), (_, i) => String.fromCharCode(65 + i)).map(
                (char) => (
                  <span
                    key={char}
                    onClick={() => handleClick(char)}
                    className={alpha === char ? "selectedAlpha" : null}
                  >
                    {char}
                  </span>
                )
              )}
            </div>
          </div>
          <div className={styles.listMatch}>
            <div
              className={
                format === "" && playingRole === ""
                  ? styles.MatchNameActive
                  : styles.MatchName
              }
              onClick={() => {
                handleClickInitial();
              }}
            >
              INTL
            </div>
            {/* <div
            className="MatchName"
            onClick={() => {
              handleClickPlayingRoleAll();
            }}
          >
            ALL
          </div> */}
            <div
              className={
                format === "Test" && playingRole === ""
                  ? styles.MatchNameActive
                  : styles.MatchName
              }
              // onClick={() => {
              //   handleClickPlayingRoleTest();
              // }}
            >
              TEST
            </div>
            <div
              className={
                format === "ODI" && playingRole === ""
                  ? styles.MatchNameActive
                  : styles.MatchName
              }
              // onClick={() => {
              //   handleClickPlayingRoleOdi();
              // }}
            >
              ODI
            </div>
            <div
              className={
                format === "T20I" && playingRole === ""
                  ? styles.MatchNameActive
                  : styles.MatchName
              }
              // onClick={() => {
              //   handleClickPlayingRoleT20I();
              // }}
            >
              T20I
            </div>
            <div
              className={
                format === "WTest" && playingRole === ""
                  ? styles.MatchNameActive
                  : styles.MatchName
              }
              // onClick={() => {
              //   handleClickPlayingRoleWTest();
              // }}
            >
              WTEST
            </div>
            <div
              className={
                format === "WODI" && playingRole === ""
                  ? styles.MatchNameActive
                  : styles.MatchName
              }
              // onClick={() => {
              //   handleClickPlayingRoleWOdi();
              // }}
            >
              WODI
            </div>
            <div
              className={
                format === "WT20I" && playingRole === ""
                  ? styles.MatchNameActive
                  : styles.MatchName
              }
              // onClick={() => {
              //   handleClickPlayingRoleWT20I();
              // }}
            >
              WT20I
            </div>
            <div
              className={
                format === "" && playingRole === "all"
                  ? styles.MatchNameActive
                  : styles.MatchName
              }
              // onClick={() => {
              //   handleClickPlayingRoleAllRounder();
              // }}
            >
              All Rounders
            </div>
            <div
              className={
                format === "" && playingRole === "bat"
                  ? styles.MatchNameActive
                  : styles.MatchName
              }
              // onClick={() => {
              //   handleClickPlayingRoleBatters();
              // }}
            >
              Batters
            </div>
            <div
              className={
                format === "" && playingRole === "bowl"
                  ? styles.MatchNameActive
                  : styles.MatchName
              }
              // onClick={() => {
              //   handleClickPlayingRoleBowlers();
              // }}
            >
              Bowlers
            </div>
            <div
              className={
                format === "" && playingRole === "wk"
                  ? styles.MatchNameActive
                  : styles.MatchName
              }
              // onClick={() => {
              //   handleClickPlayingRoleWks();
              // }}
            >
              Wickets
            </div>
          </div>
          <div className={styles.playerCardContainer}>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {playerData.length === 0
                ? null
                : playerData.map((item, index) => {
                    return (
                      <div className="col" key={index}>
                        <div className={`"card" ${styles.playerCard}`}>
                          <div className={styles.playerCardStyle}>
                            <div className={styles.playerImage}>
                              <div className={styles.backText}>
                                {item.jersey === "" || item.jersey === null
                                  ? "0"
                                  : item.jersey}
                              </div>
                              <Image
                                src={
                                  item.profile_pic_odi === "" ||
                                  item.profile_pic_odi === null
                                    ? noPlayer
                                    : HOST + item.profile_pic_odi
                                }
                                alt="images"
                                className={styles.img}
                                width={100}
                                height={100}
                              />
                            </div>
                            <div className={styles.playerInfo}>
                              <div className={styles.PlayerName}>
                                {item.title}
                              </div>

                              <Link
                                className={styles.ViewProfile}
                                href={`/players/${slugify(item.nationality)}/${
                                  item.pid
                                }/${slugify(item.title)}/`}
                              >
                                View Profile
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Players;
