import React, { useEffect, useState } from "react";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useRouter } from "next/router";
import { NavDropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FaSearch, FaBars } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { CiLight, CiDark } from "react-icons/ci";
import Main from "../Main/Main";
import dummy from "../../../public/Images/no-player.png";
import iconImage from "../../../public/Images/language.webp";
import slugify from "react-slugify";
import dataList from "../../../Common/data.json";
import classname from "classnames";
import styles from "./Navs.module.scss";
import SideMenu from "../../sideMenu/sideMenu";
import { COffcanvas, COffcanvasBody, COffcanvasHeader } from "@coreui/react";
import Link from "next/link";
import { logoutAPI, profilAPI } from "../../../Constants/Api/Api";

const Navs = () => {
  const [userProfile, setUserProfile] = useState([]);
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search");
  const [searchQuery, setSearchQuery] = useState("");


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (show === true) {
      setShow(false);
    }
    if (show === false) {
      setShow(true);
    }
  };
  const [showSearch, setShowSearch] = useState(false);
  const handleShowSearch = () => setShowSearch(true);
  //

  const router = useRouter();

  const keyPressHandler = (event) => {
    if (event.key === "Enter") {
      router.push(
        `/searchpage/${searchQuery === "" ? "undefined" : searchQuery}`
      );
    }
  };
  const handleSubmit = (event) => {
    const authTokenRefresh = localStorage.getItem("authTokenRefreshLogin");
    const authTokenAccess = localStorage.getItem("authTokenAccessLogin");
    event.preventDefault();

    logoutAPI(authTokenAccess, authTokenRefresh)
      .then((response) => {

        localStorage.removeItem("authTokenRefreshLogin");
        localStorage.removeItem("authTokenAccessLogin");
        window.location.href = "/";
        // router.push('/');
      })
      .catch((error) => { });
  };

  // const handleSearchSubmit = () => {
  //   if (searchQuery.length >= 4) {
  //     NavBarSearchApi(searchQuery, 5, 1)
  //       .then((res) => {
  //         router.push(
  //           `/searchpage/${searchQuery === "" ? "undefined" : searchQuery}`
  //         );
  //       })
  //       .catch((e) => {
  //
  //         //   // Navigation(e.code, e.message);
  //       });
  //   }
  // };

  const handlePlaceholder = () => {
    setSearchQuery("");
    setSearchPlaceholder("Please enter minimum 4 characters");
  };


  const [isCliendSide, setClientSide] = useState(true);

  useEffect(() => {
    const authTokenRefresh = localStorage.getItem("authTokenRefreshLogin");
    const authTokenAccess = localStorage.getItem("authTokenAccessLogin");
    setClientSide(true);

    if (authTokenAccess !== null) {
      profilAPI()
        .then((res) => {
          setUserProfile(res.data.data);
        })
        .catch((e) => {

          //   // Navigation(e.code, e.message);
        });
    }
  });

  return (
    <>
      {!isCliendSide && <div></div>}
      {isCliendSide && (
        <div className={classname(styles.navs_section, "navs_section")}>
          <Navbar className={styles.navbar} expand="lg" postion="sticky">
            <Container fluid className={styles.navmain_div}>
              <div className={styles.icontop}>
                <div className={styles.hamburger2}>
                  <FaBars size="40px" color="white" onClick={handleShow} />
                </div>
                <div className={styles.SearchIconOnTop}>
                  {showSearch === false ? (
                    <FaSearch
                      className={styles.openSearchbar}
                      size="40px"
                      color="white"
                      style={{ padding: "2px" }}
                      onClick={handleShowSearch}
                    />
                  ) : (
                    <>
                      <Form
                        className={
                          searchPlaceholder ===
                            "Please enter minimum 4 characters"
                            ? classname(
                              "d-flex",
                              styles.animation,
                              styles.forms,
                              styles.formsplaceholder
                            )
                            : classname(
                              "d-flex",
                              styles.animation,
                              styles.forms
                            )
                        }
                      >
                        <Form.Control
                          type="search"
                          placeholder={searchPlaceholder}
                          className={classname("me-2", styles.search)}
                          aria-label="Search"
                          style={{ fontSize: 14 }}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          value={searchQuery}
                          onKeyDown={keyPressHandler}
                          minLength={4}
                        />
                        <FaSearch
                          style={{ marginRight: 10, cursor: "pointer" }}
                          size="18px"
                          color="gray"
                          onClick={() =>
                            searchQuery.length > 0 && searchQuery.length < 4
                              ? handlePlaceholder()
                              : // : handleSearchSubmit()
                              alert("some")
                          }
                        />
                      </Form>
                    </>
                  )}
                </div>
              </div>

              <Navbar.Collapse
                id="navbarScroll"
                style={{
                  minHeight: "50px",
                }}
              >
                <Nav
                  className="me-auto"
                  navbarScroll
                  style={{ whiteSpace: "nowrap" }}
                >
                  <div className={styles.hamburger}>
                    <FaBars size="30px" color="white" onClick={handleShow} />
                  </div>

                  <div
                    className="nav-link"
                    onClick={() => {
                      const path = "/cricket-live-score/live-matches/all";
                      router.push(path);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Live Score
                  </div>

                  <NavDropdown title="Series" id="navbarScrollingDropdown">
                    {dataList.data.series.map((item, index) => {
                      return (
                        <NavDropdown.Item
                          key={index}
                          onClick={() => {
                            const path = `/cricket-series/${item.status === "upcoming"
                              ? "fixture"
                              : item.status
                              }/${item.cid}/${slugify(item.title)}-${item.season
                              }/schedule/`;
                            router.push(path);
                          }}
                        >
                          {item.title}&nbsp;{item.season}
                        </NavDropdown.Item>
                      );
                    })}
                    <NavDropdown.Divider />

                    <NavDropdown.Item
                      onClick={() => {
                        const path = "/cricket-series/live";
                        router.push(path);
                      }}
                    >
                      All Series
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Team" id="navbarScrollingDropdown">
                    {dataList.data.teams.map((item, index) => {
                      return (
                        <NavDropdown.Item
                          key={index}
                          onClick={() => {
                            const path = `/teams/men/${item.tid}/${slugify(
                              item.title
                            )}-cricket-team/`;
                            router.push(path);
                          }}
                        >
                          {item.title} National Cricket Team
                        </NavDropdown.Item>
                      );
                    })}
                    <NavDropdown.Divider />

                    <NavDropdown.Item
                      onClick={() => {
                        const path = "/teams/men";
                        router.push(path);
                      }}
                    >
                      All Team
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Link href="/players" passHref className={styles.link}>
                    <Nav.Link as="span">Player</Nav.Link>
                  </Link>
                  <NavDropdown title="News" id="navbarScrollingDropdown">
                    <NavDropdown.Item
                      onClick={() => {
                        const path = "/cricket-news/all";
                        router.push(path);
                      }}
                    >
                      All News
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    {dataList.data.category.length === 0
                      ? null
                      : dataList.data.category.map((item, index) => {
                        return (
                          <NavDropdown.Item
                            key={index}
                            // onClick={() => getEventId(item.id, item.name)}
                            // onClick={() =>
                            //   setDescription(
                            //     item.description === "" ? "--" : item.description
                            //   )
                            // }
                            onClick={() => {
                              const path = `/${slugify(item.slug)}/`;
                              router.push(path);
                            }}
                          >
                            {item.name}
                          </NavDropdown.Item>
                        );
                      })}
                  </NavDropdown>

                  <NavDropdown title="IPL" id="navbarScrollingDropdown">
                    {dataList.data.IPL.map((item, index) => {
                      return (
                        <NavDropdown.Item
                          key={index}
                          onClick={() => {
                            const path = `/ipl/ipl-${item.season}/${item.cid}/`;
                            router.push(path);
                          }}
                        >
                          IPL {item.season}
                        </NavDropdown.Item>
                      );
                    })}
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => {
                        const path = "/ipl";
                        router.push(path);
                      }}
                    >
                      All IPL
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Videos" id="navbarScrollingDropdown">
                    <NavDropdown.Item
                      onClick={() => {
                        const path = "/videos/highlights";
                        router.push(path);
                      }}
                    >
                      Highlights
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => {
                        const path = "/videos/interviews";
                        router.push(path);
                      }}
                    >
                      Interviews
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => {
                        const path = "/videos/press-conferences";
                        router.push(path);
                      }}
                    >
                      Press Conferences
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item
                      onClick={() => {
                        const path = "/videos/all";
                        router.push(path);
                      }}
                    >
                      All Videos
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Ranking" id="navbarScrollingDropdown">
                    <NavDropdown.Item
                      onClick={() => {
                        const path = "/icc-rankings-men/teams/tests";
                        router.push(path);
                      }}
                    >
                      Icc Ranking - Men
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => {
                        const path = "/icc-rankings-women/teams/tests";
                        router.push(path);
                      }}
                    >
                      Icc Ranking - Women
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Link
                    href="/fantasy-cricket"
                    passHref
                    className={styles.link}
                  >
                    <Nav.Link as="span">Fantasy Tips</Nav.Link>
                  </Link>
                </Nav>
                <div>
                  <Form
                    className={
                      searchPlaceholder === "Please enter minimum 4 characters"
                        ? " d-flex forms formsplaceholder"
                        : "d-flex forms"
                    }
                  >
                    <Form.Control
                      type="search"
                      placeholder={searchPlaceholder}
                      className={classname("me-2", styles.search)}
                      aria-label="Search"
                      style={{ fontSize: 14 }}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      value={searchQuery}
                      onKeyDown={keyPressHandler}
                      minLength={4}
                    />
                    <FaSearch
                      style={{
                        marginRight: 25,
                        cursor: "pointer",
                        position: "absolute",
                        right: 0,
                        marginTop: 5,
                      }}
                      size="18px"
                      color="gray"
                      onClick={() =>
                        searchQuery.length > 0 && searchQuery.length < 4
                          ? handlePlaceholder()
                          : handleSearchSubmit()
                      }
                    />
                  </Form>
                </div>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <COffcanvas
            placement="start"
            scroll={true}
            visible={show}
            onHide={() => setShow(false)}
          >
            <COffcanvasHeader
            // style={{
            //   background: theme === "dark" ? "grey" : "unset",
            //   color: theme === "dark" ? "grey" : "unset",
            //   padding: 0,
            // }}
            >
              <div className={styles.SideMenuHeader}>
                <div
                  className={styles.top_line}
                // style={{
                //   background: theme === "dark" ? "grey" : "unset",
                //   color: theme === "dark" ? "white" : "unset",
                //   padding: 0,
                // }}
                >
                  <div className={styles.dummy_image_border}>
                    <Image
                      src={dummy}
                      className={styles.dummy_img}
                      alt="images"
                    />

                    {userProfile.length === 0 ? (
                      <h2>
                        <Link href="/login" className={styles.link}>
                          Sign In/Up
                        </Link>
                      </h2>
                    ) : (
                      <>
                        <h3 style={{ textTransform: "capitalize" }}>
                          {userProfile.name}
                        </h3>
                      </>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    {userProfile.length === 0 ? null : (
                      <span>
                        {" "}
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={handleSubmit}
                        >
                          Logout
                        </button>
                      </span>
                    )}

                    <div className={styles.Hindilangunge}>
                      <Image
                        src={iconImage}
                        className="langunge"
                        alt="images"
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </COffcanvasHeader>
            <COffcanvasBody>
              <SideMenu handleClose={handleClose} dataList={dataList} />
            </COffcanvasBody>
            <COffcanvasHeader>
              <div className={styles.SideMenuFooter}>
                <div className={styles.light_theme}>
                  <div className={styles.fotter_button}>
                    <CiLight className={styles.icon} />
                    <h4>Light</h4>
                  </div>

                  <div className={styles.fotter_button}>
                    <CiDark className={styles.icon} />
                    <h4>Dark</h4>
                  </div>
                </div>

                <div className={styles.footer_list}>
                  <div className={styles.fotter_list_divide}>
                    <li>
                      <Link
                        href="/editorial-policy"
                        onClick={handleClose}
                        className={styles.link}
                      >
                        Editorial Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/non-partisanship-policy"
                        onClick={handleClose}
                        className={styles.link}
                      >
                        Non-Partisanship Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/code-of-ethics"
                        onClick={handleClose}
                        className={styles.link}
                      >
                        Code Of Ethics
                      </Link>
                    </li>
                  </div>
                  <div className={styles.fotter_list_divide}>
                    <li>
                      <Link
                        href="/fact-check-policy"
                        onClick={handleClose}
                        className={styles.link}
                      >
                        Fact Check Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/correction-policy"
                        onClick={handleClose}
                        className={styles.link}
                      >
                        Correction Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/sponsored-content-policy"
                        onClick={handleClose}
                        className={styles.link}
                      >
                        Sponsored Content Policy
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
            </COffcanvasHeader>
          </COffcanvas>
          <Main show={show} />
        </div>
      )}
    </>
  );
};

export default Navs;
