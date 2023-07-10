import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import styles from "../../styles/BlogArticlesLatest.module.scss";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import HOST from "../../Constants/host";
import background from "../../public/Images/no-img.png";
import { Row, Col } from "react-bootstrap";
import fbIcon from "../../public/Images/FB.png";
import Whtaspp from "../../public/Images/WA.png";
import Tweeter from "../../public/Images/Tweet.png";
import Mail from "../../public/Images/Mail.png";
import Pint from "../../public/Images/Pint.png";
import Arrow from "../../public/Images/ArrowLogo.png";
import { FiUserPlus } from "react-icons/fi";
import slugify from "react-slugify";
import { RxDotFilled } from "react-icons/rx";
import Slider from "react-slick";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  articalsDetail,
  blogPostDetailApi,
  iPLListApi,
  newPrimaryCategory,
  newsCategoryApi,
  teamListDetailAPI,
  teamPlayerProfile,
} from "../../Constants/Api/Api";
import NewsCard from "../../Component/NewsCard/NewsCard";
import Image from "next/image";
import CricketNewsAll from "../cricket-news/all";
import Script from "next/script";
import Breadcrumbs from "../../Common/BreadcrumbsSchema/Breadcrumbs";
export default function BlogArticlesLatest({ data }) {
  const blogPost = data.data;
  const router = useRouter();
  const { primarycategory = [] } = router.query;
  const [LatestData, setLatestData] = useState([]);
  const [fantasyData, setFanstasyData] = useState([]);
  const [eventId, setEventId] = useState(0);
  const [eventType, setEventType] = useState("");
  const [saveCid, setSaveCid] = useState();
  const [articals, setArticals] = useState([]);
  const [Data, setData] = useState([]);
  const [playerDescription, setPlayerDescription] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newsCategoryList, setNewsCategoryList] = useState([]);
  const [teamID, setTeamID] = useState("");
  const [teamName, setTeamName] = useState("");

  function getEventId(value1, value2) {
    setTeamID(value1);
    setTeamName(value2);
  }

  

  function getEventId(value1, value2, value3) {
    setEventId(value1);
    setEventType(value2);
    setSaveCid(value3);
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
  const baseUrl = `${$url.protocol}${HOST.split("/")[2]}${router.asPath}`;
  const primaryUrl = `${baseUrl}`;

  const getDay = (data) => {
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekday[new Date(data).getDay()];
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.head.appendChild(script);
    // }
  }, []);

  useEffect(() => {
    setTimeout(function () {
      window.twttr.ready(() => {
        window.twttr.widgets.load();
      });
    }, 2000);
    // }
  }, []);

  const crumbs = router.pathname;
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": crumbs,
    },
    headline: blogPost.meta_title,
    description: blogPost.meta_description,
    image:
      blogPost.length === 0 || blogPost === undefined
        ? null
        : blogPost.attachment === [] ||
          blogPost.attachment.length === 0 ||
          blogPost.attachment === undefined
        ? `${background}`
        : blogPost.attachment[0].file_name === ""
        ? `${background}`
        : `${HOST}${blogPost.attachment[0].file_uri}/${blogPost.attachment[0].file_name}`,
    author: {
      "@type": "Person",
      name: blogPost.user == null ? "Admin" : blogPost.user.name,
      url: `${HOST}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Cricket Addictor",
      logo: {
        "@type": "ImageObject",
        url: `${HOST}`,
      },
    },
    datePublished: blogPost.created_at,
    dateModified: blogPost.created_at,
  };

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
        name: `${
          router.asPath.split("/")[2] === "all"
            ? "All News"
            : primarycategory[0].split("-").join(" ")
        }`,
        item: `${HOST}${router.asPath.split("/")[1]}/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blogPost.title,
        item: `${HOST}${router.asPath}`,
      },
    ],
  };
  const [blogPostContent, setBlogPostContent] = useState("");

  useLayoutEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.unibotscdn.com/ubplayer/player.js";
    document.head.appendChild(script);

    window.unibots = window.unibots || { cmd: [] };
    unibots.cmd.push(() => {
      unibotsPlayer("cricketaddictor");
    });

    // (adsbygoogle = window.adsbygoogle || []).push({});
    setTimeout(() => {
   
    }, 2000);
  }, [primarycategory]);

  useEffect(() => {
    const htmlString =
      blogPost.description === undefined ? null : blogPost.description; // Assuming this is the HTML string you receive
    const parser = new DOMParser();
    const dom = parser.parseFromString(htmlString, "text/html");
    const firstParagraph = dom.querySelector("p:nth-of-type(1)");
    const thirdParagraph = dom.querySelector("p:nth-of-type(3)");
    const fifthParagraph = dom.querySelector("p:nth-of-type(5)");

    if (firstParagraph) {
      const scriptString = renderToString(
        <div id="div-ub-cricketaddictor" style={{ width: "100%" }}>
          <script
            dangerouslySetInnerHTML={{
              __html: `// <![CDATA[
                window.unibots = window.unibots || { cmd: [] };
                unibots.cmd.push(() => {
                  unibotsPlayer("cricketaddictor");
                });
              // ]]>`,
            }}
          />
        </div>
      );
      firstParagraph.insertAdjacentHTML("afterend", scriptString);
    }

    if (thirdParagraph) {
      const scriptString = renderToString(
        <ins
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-6125827673616617"
          data-ad-slot="6233974858"
        >
          <script
            dangerouslySetInnerHTML={{
              __html: `// <![CDATA[
                  const adSlot = document.querySelector('.adsbygoogle');
                  adSlot.addEventListener('load', () => {
                      (adsbygoogle = window.adsbygoogle || []).push({});
                  });
              // ]]>`,
            }}
          />
        </ins>
      );
      thirdParagraph.insertAdjacentHTML("afterend", scriptString);
    }

    if (fifthParagraph) {
      const scriptString = renderToString(
        <ins
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-6125827673616617"
          data-ad-slot="8386345532"
        >
          <script
            dangerouslySetInnerHTML={{
              __html: `// <![CDATA[
                  const adSlot = document.querySelector('.adsbygoogle');
                  adSlot.addEventListener('load', () => {
                      (adsbygoogle = window.adsbygoogle || []).push({});
                  });
              // ]]>`,
            }}
          />
        </ins>
      );
      fifthParagraph.insertAdjacentHTML("afterend", scriptString);
    }

    const blogPostContent = dom.documentElement.outerHTML;
    setBlogPostContent(blogPostContent);
  }, [blogPost.description]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    newPrimaryCategory("primary_category")
      .then((res) => {
        setNewsCategoryList(res.data.data);
      })
      .catch((e) => {
        
      });
    newsCategoryApi("", primarycategory[0], "10", "")
      .then((res) => {
        setData(res.data.data.rows);
      })
      .catch((e) => {});

    articalsDetail(eventId)
      .then((res) => {
        setArticals(res.data.data);
      })
      .catch((e) => {
      });
    if (eventType === "player") {
      teamPlayerProfile(eventId)
        .then((res) => {
          setPlayerDescription(res.data.data);
        })
        .catch((e) => {
        });
    }
    if (eventType === "teams") {
      teamListDetailAPI(eventId)
        .then((res) => {
          setPlayerDescription(res.data.data);
        })
        .catch((e) => {
        });
    }
    if (eventType === "seasons") {
      iPLListApi()
        .then((res) => {
          setPlayerDescription(res.data.data);
        })
        .catch((e) => {});
    }
    newsCategoryApi("", "", "", "")
      .then((res) => {
        setLatestData(res.data.data.rows);
      })
      .catch((e) => {});
    newsCategoryApi("", "fantasy-cricket", "", "")
      .then((res) => {
        setFanstasyData(res.data.data.rows);
      })
      .catch((e) => {});
  }, [primarycategory, eventId, eventType]);

  const [settings, setSettings] = useState({});
  const sliderRef = useRef(null);
  useEffect(() => {
    const generateSettings = () => {
      const newSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: window.innerWidth < 767 ? 1 : 3,
        slidesToScroll: 1,
        rows: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1000,
      };
      setSettings(newSettings);
    };

    // Add event listener for window resize
    window.addEventListener("resize", generateSettings);

    // Initial calculation of settings
    generateSettings();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", generateSettings);
    };
  }, []);

  const next = () => {
    sliderRef.current.slickNext();
  };
  const previous = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <>
      {primarycategory.length === 1 ? (
        <CricketNewsAll category={primarycategory[0]} />
      ) : (
        <>
          {blogPost.length == 0 ? null : (
            <Head>
              <title>
                {blogPost.meta_title === ""
                  ? blogPost.title
                  : blogPost.meta_title}
              </title>
              <meta
                name="description"
                content={
                  blogPost.meta_description === "" ||
                  blogPost.meta_description === null
                    ? blogPost.title
                    : blogPost.meta_description
                }
                key="desc"
              />

              <meta name="keywords" content={blogPost.meta_keyword} />

              <link rel="canonical" href={primaryUrl} />

              <meta
                property="og:title"
                content={
                  blogPost.image_title === "" || blogPost.image_title === null
                    ? blogPost.title
                    : blogPost.image_title
                }
              />

              <meta
                property="og:description"
                content={
                  blogPost.meta_description === "" ||
                  blogPost.meta_description === null
                    ? blogPost.title
                    : blogPost.meta_description
                }
              />

              <meta
                property="og:image"
                content={`${HOST}${blogPost.image_file_uri}/${blogPost.image_file_name}`}
              />

              <meta
                property="og:image:alt"
                content="Alternative text for the image"
              />
              <meta property="og:url" content={primaryUrl} />

              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(articleBreadcrumb),
                }}
              />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(articleStructuredData),
                }}
              />

              <link rel="canonical" href={primaryUrl} />
            </Head>
          )}
          <Script
            src="https://platform.twitter.com/widgets.js"
            strategy="lazyOnload"
          />
          <div className={styles.BlogArticlesLatest}>
            <div className={styles.newscat_row}>
              <div className={styles.newscat_col2}>
                <Link href="/cricket-news/all/" className={styles.link}>
                  <h5
                    style={{
                      backgroundColor:
                        router.asPath.split("/")[2] === "all"
                          ? "var(--primary)"
                          : "white",
                      color:
                        router.asPath.split("/")[2] === "all"
                          ? "white"
                          : "black",
                    }}
                  >
                    All News
                  </h5>
                </Link>
                {newsCategoryList.length === 0
                  ? null
                  : newsCategoryList.map((item, index) => {
                      return (
                        <Link
                          href={`/${slugify(item.slug)}/`}
                          className={styles.link}
                          key={index}
                        >
                          <h5
                            style={{
                              backgroundColor:
                                primarycategory[0] === item.slug &&
                                router.asPath.split("/")[2] !== "all"
                                  ? "var(--primary)"
                                  : "white",
                              color:
                                primarycategory[0] === item.slug &&
                                router.asPath.split("/")[2] !== "all"
                                  ? "white"
                                  : "black",
                            }}
                          >
                            {item.name}
                          </h5>
                        </Link>
                      );
                    })}
              </div>
            </div>

            <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} />

            {blogPost.length == 0 ? null : (
              <Row className={styles.BlogArticlesLatestRow}>
                <Col sm={8} className={styles.BlogArticlesLatestCol1}>
                  <div className={styles.BlogArticlesLatestCol1Content}>
                    <div className={styles.blogAritcal_Heading}>
                      <h1
                        dangerouslySetInnerHTML={{ __html: blogPost.title }}
                      ></h1>
                    </div>
                    <div className={styles.blogAritcal_date}>
                      <div class="verticalLine"></div>
                      <div>
                        <h2>
                          {" "}
                          {getDay(blogPost.created_at)},&nbsp;
                          <span style={{ color: "var(--primary)" }}>
                            {blogPost.created_at}
                          </span>
                          &nbsp;
                          <span>
                            {blogPost.start_time === undefined
                              ? null
                              : blogPost.start_time}
                          </span>
                        </h2>
                      </div>
                      <div class="verticalLine"></div>
                    </div>
                    <div className={styles.blogAritcal_socialLogo}>
                      <Image
                        src={fbIcon}
                        className={styles.social_icon}
                        onClick={() => {
                          window.open(
                            `https://www.facebook.com/share.php?u=${
                              $url.protocol + HOST.split("/")[2] + router.asPath
                            }`,
                            "_blank"
                          );
                        }}
                        width={30}
                        height={30}
                        alt="images"
                      />
                      <Image
                        src={Whtaspp}
                        className={styles.social_icon}
                        onClick={() => {
                          window.open(
                            `https://wa.me/?text=${
                              $url.protocol + HOST.split("/")[2] + router.asPath
                            }`,
                            "_blank"
                          );
                        }}
                        alt="images"
                        width={30}
                        height={30}
                      />{" "}
                      <Image
                        src={Tweeter}
                        className={styles.social_icon}
                        onClick={() => {
                          window.open(
                            `https://twitter.com/intent/tweet?url=${
                              $url.protocol + HOST.split("/")[2] + router.asPath
                            }`,
                            "_blank"
                          );
                        }}
                        width={30}
                        height={30}
                        alt="images"
                      />{" "}
                      <Image
                        src={Mail}
                        className={styles.social_icon}
                        onClick={(e) => {
                          window.location.href = `mailto:?subject=New%20Article%20on%20OnCricket&body=${
                            $url.protocol + HOST.split("/")[2] + router.asPath
                          }`;
                          e.preventDefault();
                        }}
                        width={30}
                        height={30}
                        alt="images"
                      />{" "}
                      <Image
                        src={Pint}
                        className={styles.social_icon}
                        onClick={() => {
                          window.open(
                            `http://pinterest.com/pin/create/link/?url=${
                              $url.protocol + HOST.split("/")[2] + router.asPath
                            }`,
                            "_blank"
                          );
                        }}
                        width={30}
                        height={30}
                        alt="images"
                      />
                    </div>
                    <div className={styles.blogAritcal_potedby}>
                      <h3>by</h3>
                      <h3
                        className={styles.admin}
                        style={{
                          color: "var(--primary)",
                          textDecoration: "underline",
                        }}
                      >
                        {blogPost.user == null ? "Admin" : blogPost.user.name}
                      </h3>
                      <h3>
                        <FiUserPlus className={styles.adminLogo} />
                      </h3>
                    </div>
                    <div
                      className={styles.blogAritcal_post_summary}
                      dangerouslySetInnerHTML={{ __html: blogPost.summary }}
                    ></div>

                    <div className={styles.blogAritcal_poster}>
                      <div>
                        <Image
                          src={Arrow}
                          alt="images"
                          style={{
                            position: "absolute",
                            margin: "1px",
                            padding: "1px",
                            background: "white",
                          }}
                          width={40}
                          height={40}
                        />
                      </div>
                      {blogPost.attachment === undefined ||
                      blogPost.attachment.length === 0
                        ? null
                        : blogPost?.attachment?.map((item, index) => {
                            return (
                              <Image
                                key={index}
                                src={
                                  item === []
                                    ? `${background}`
                                    : item.file_name === ""
                                    ? `${background}`
                                    : `${HOST}${item.file_uri}/${item.file_name}`
                                }
                                className={styles.blogAritcal_poster_img}
                                width={100}
                                height={100}
                                alt={item.file_name.split(".")[0]}
                              />
                            );
                          })}
                    </div>
                    <div className={styles.blogAritcal_post_content}>
                      <div
                        dangerouslySetInnerHTML={{ __html: blogPostContent }}
                      ></div>
                    </div>

                    <Head>
                      <script
                        dangerouslySetInnerHTML={{
                          __html: `
              window.unibots = window.unibots || { cmd: [] };
              unibots.cmd.push(() => {
                unibotsPlayer("cricketaddictor");
              });
            `,
                        }}
                      />
                      <script
                        dangerouslySetInnerHTML={{
                          __html: `
              (adsbygoogle = window.adsbygoogle || []).push({});
            `,
                        }}
                      />
                    </Head>
                    <ins
                      class="adsbygoogle"
                      style={{ display: "block" }}
                      data-ad-format="autorelaxed"
                      data-ad-client="ca-pub-6125827673616617"
                      data-ad-slot="6901873477"
                    ></ins>
                    <div id="my-image"></div>
                  </div>
                </Col>
                <Col sm={4} className={styles.BlogArticlesLatestCol2}>
                  <div className={styles.BlogArticlesLatestCol2Content}>
                    <div className={styles.Latest_news_section}>
                      <div className={styles.Latest_news_section_heading}>
                        <h5 className={styles.Latest_news}>Latest</h5>
                        <h5 class="horizontalLine"></h5>
                      </div>
                      {LatestData.map((item, index) => {
                        return (
                          <>
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                              href={
                                item.category === null ||
                                item.category.length === 0 ||
                                item.category.slug === null
                                  ? `/${item.news_category}/${item.slug}/`
                                  : `/${item.news_category}/${slugify(
                                      item.category.slug
                                    )}/${item.slug}/`
                              }
                            >
                              <div
                                style={{ display: "flex", margin: "15px 0px" }}
                              >
                                <div className={styles.latestListLi}>
                                  <RxDotFilled />
                                </div>
                                <div
                                  className={styles.Latest_news_section_content}
                                  key={index}
                                >
                                  <p
                                    className={styles.title}
                                    dangerouslySetInnerHTML={{
                                      __html: item.title,
                                    }}
                                  ></p>
                                  <p className={styles.date}>
                                    {item.post_date}
                                  </p>
                                </div>
                              </div>
                            </Link>
                            <hr />
                          </>
                        );
                      })}
                    </div>
                    <div className={styles.fantasy_news_section}>
                      <div className={styles.fantasy_news_section_heading}>
                        <h5 className={styles.fantasy_news}>Fantasy Tips</h5>
                        <h5 class="horizontalLine"></h5>
                      </div>
                      {fantasyData.map((item, index) => {
                        return (
                          <>
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                              href={`/fantasy-cricket/${slugify(item.slug)}/`}
                            >
                              <div
                                style={{ display: "flex", margin: "15px 0px" }}
                              >
                                <div className={styles.latestListLi}>
                                  <RxDotFilled />
                                </div>
                                <div
                                  className={
                                    styles.fantasy_news_section_content
                                  }
                                  key={index}
                                >
                                  <p
                                    className={styles.title}
                                    dangerouslySetInnerHTML={{
                                      __html: item.title,
                                    }}
                                  ></p>
                                  <p className={styles.date}>
                                    {item.post_date}
                                  </p>
                                </div>
                              </div>
                            </Link>
                            <hr />
                          </>
                        );
                      })}
                    </div>
                  </div>
                </Col>
              </Row>
            )}

            <div className={styles.blogAritcal_related_section}>
              <div className={styles.related_section}>
                <h5 className={styles.verticalLine}></h5>
                <h5 className={styles.related_news}>Related News</h5>
                <h5 className={styles.horizontalLine}></h5>
              </div>

              <Slider ref={sliderRef} {...settings}>
                {Data.length === 0
                  ? null || Data === []
                  : Data.map((item, index) => {
                      return (
                        <Link
                          key={index}
                          className={styles.link_color}
                          href={
                            item.category === null ||
                            item.category.length === 0 ||
                            item.category.slug === null
                              ? `/${item.news_category}/${item.slug}/`
                              : `/${item.news_category}/${slugify(
                                  item.category.slug
                                )}/${item.slug}/`
                          }
                        >
                          <NewsCard
                            title={item.title}
                            date={item.post_date}
                            source={
                              item.attachment.length === 0 ||
                              item.attachment === undefined
                                ? `${background}`
                                : item.attachment[0].file_name === ""
                                ? `${background}`
                                : `${HOST}${item.attachment[0].file_uri}/${item.attachment[0].file_name}`
                            }
                            type="related"
                          />
                        </Link>
                      );
                    })}
              </Slider>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <div
                  className={styles.preNextButton}
                  style={{
                    width: "auto",
                    backgroundColor: "#d9d9d9",
                  }}
                >
                  <button className={styles.preMoreBtn} onClick={previous}>
                    <MdKeyboardArrowLeft />
                  </button>
                  <button className={styles.preMoreBtn} onClick={next}>
                    <MdKeyboardArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* } */}
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { primarycategory } = query;

  const slug =
    primarycategory.length === 3 ? primarycategory[2] : primarycategory[1];

  const response = await blogPostDetailApi(slug);
  const data = response.data;

  return {
    props: {
      data,
    },
  };
}
