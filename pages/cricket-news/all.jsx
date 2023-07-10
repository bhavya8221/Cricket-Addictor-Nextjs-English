import React, { useState, useEffect } from "react";
import HOST from "../../Constants/host";
import styles from "../../styles/News.module.scss";
import {
  newPrimaryCategory,
  newsCategoryApi,
  primarycategoryDesciption,
} from "../../Constants/Api/Api";
import NewsCard from "../../Component/NewsCard/NewsCard";
import usePagination from "../../Common/Pagination/Pagination";
import { List, ListItem } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Link from "next/link";
import { useRouter } from "next/router";
import background from "../../public/Images/no-img.png";
import slugify from "react-slugify";


import Head from "next/head";
import Breadcrumbs from "../../Common/BreadcrumbsSchema/Breadcrumbs";

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

function CricketNewsAll(props) {


  const [Data, setData] = useState([]);
  const [data_count, setCount] = useState();
  const [newsCategoryList, setNewsCategoryList] = useState([]);
  const router = useRouter();
  const [description, setDescription] = useState("");
  const { primarycategory } = router.query;
  let [page, setPage] = useState(1);
  const PER_PAGE = 16;
  const count = Math.ceil(data_count / PER_PAGE);
  const _DATA = usePagination(Data, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  //   const HOST = {HOST};
  const $url = url(HOST);
  //   const baseUrl = `${$url.protocol}${HOST.split("/")[2]}${router.asPath}`;

  //   var $url = url(HOST);

  const baseUrl = `${$url.protocol}${HOST.split("/")[2]}${router.asPath}`;

  const currentPageUrl = page === 1 ? `${baseUrl}` : `${baseUrl}?page=${page}`;
  const prevPageUrl = page > 1 ? `${baseUrl}?page=${page - 1}` : null;
  const nextPageUrl = page < count ? `${baseUrl}?page=${page + 1}` : null;
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    newsCategoryApi("", props.category, PER_PAGE, page)
      .then((res) => {
        setData(res.data.data.rows);
        setCount(res.data.data.count);
      })
      .catch((e) => { });

    newPrimaryCategory("primary_category")
      .then((res) => {
        setNewsCategoryList(res.data.data);

      })
      .catch((e) => {
      });
    primarycategoryDesciption(props.category)
      .then((res) => {
        setDescription(res.data.data);
      })
      .catch((e) => {
      });
  }, [props.category, page, PER_PAGE]);

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
        name: `${router.asPath.split("/")[2] === "all"
            ? "All News"
            : router.asPath === "/fantasy-cricket/dream11/"
              ? "fantasy cricket/dream11"
              : primarycategory[0].split("-").join(" ")
          }`,
        item: `${HOST}${router.asPath}`,
      },
    ],
  };

  const [showMore, setShowMore] = useState(false);

  function handleClick() {
    setShowMore(!showMore);
  }
console.log(primarycategory,"check primary category")

  return (
    <>
      <Head>
        <title>
          {router.asPath === "/cricket-news/"
            ? "Latest and breaking Cricket News"
            : router.asPath === "/cricket-news/all/"
              ? "Latest and breaking Cricket News"
              : router.asPath === "/cricket-betting-tips-and-tricks/"
                ? "Cricket Betting Tips and Tricks | Match Prediction Today| Cricket Betting Winning Tips and Trikcs"
                : router.asPath === "/cricket-match-prediction-today/"
                  ? "Cricket Match Prediction Today | Cricket Match Prediction | IPL 2022"
                  : router.asPath === "/match-prediction-today/"
                    ? "Cricket Match Prediction | Today Match Prediction | IPL 2022"
                    : router.asPath === "/fantasy-cricket/"
                      ? "Fantasy Cricket Tips | Dream 11 Prediction | Fantasy Cricket Winning Tips"
                      : router.asPath === "/fantasy-cricket/dream11/"
                        ? "Dream11 Prediction Today Match| Dream11 Team Today| Dream11 Winning Tips"
                        : primarycategory[0]}
        </title>
        <meta
          name="description"
          content={
            router.asPath === "/cricket-news/all/"
              ? "Catch up with the latest and breaking Cricket News, detailed analysis on trending cricket topics, series and match previews, reviews, player interviews on Cricketaddictor"
              : router.asPath === "/cricket-news/"
                ? "Catch up with the latest and breaking Cricket News, detailed analysis on trending cricket topics, series and match previews, reviews, player interviews on Cricketaddictor"
                : router.asPath === "/cricket-betting-tips-and-tricks/"
                  ? "Cricket Betting Tips and Tricks | Match Prediction Today| Cricket Betting Winning Tips and Trikcs"
                  : router.asPath === "/cricket-match-prediction-today/"
                    ? "Cricket Match Prediction Today: Get IPL 2022, ICC Cricket World Cup, Cricket matches prediction and Today's match prediction on Cricket Addictor."
                    : router.asPath === "/match-prediction-today/"
                      ? "Today's Cricket Match Prediction : Get Indian Premier league (IPL 2022), ICC Cricket World Cup & Today's match prediction on Cricket Addictor."
                      : router.asPath === "/fantasy-cricket/"
                        ? "Fantasy Cricket Tips: Get the Best Dream XI playing for all the fantasy Leagues & Dream XI prediction with all the fantasy Cricket Tips."
                        : router.asPath === "/fantasy-cricket/dream11/"
                          ? "Dream11 Prediction Today Match| Dream11 Team Today| Dream11 Winning Tips: Get the Best Dream11 team for all the fantasy Leagues, Dream11 prediction with all the Fantasy Team Winning Tips."
                          : primarycategory[0]
          }
          key="desc"
        />
        <link rel="canonical" href={currentPageUrl} />
        {prevPageUrl && <link rel="prev" href={prevPageUrl} />}
        {nextPageUrl && <link rel="next" href={nextPageUrl} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleBreadcrumb),
          }}
        />
      </Head>
      <div className={styles.news_section}>
        <div>
          <div className={styles.newscat_col2}>
            <Link href="/cricket-news/all/" className={styles.link}>
              <h5
                style={{
                  backgroundColor:
                    router.asPath.split("/")[2] === "all"
                      ? "var(--primary)"
                      : "white",
                  color:
                    router.asPath.split("/")[2] === "all" ? "white" : "black",
                }}
              >

                All News
              </h5>
            </Link>
            {newsCategoryList.length === 0
              ? null
              : newsCategoryList.map((item, index) => (
                <Link
                  href={`/${item.slug}/`}
                  key={index}
                  className={styles.link}
                >
                  <h5

                    style={{
                      backgroundColor:primarycategory!==undefined&&
                        primarycategory[0] === item.slug &&
                          router.asPath.split("/")[2] !== "all"
                          ? "var(--primary)"
                          : "white",
                      color:primarycategory!==undefined&&
                        primarycategory[0] === item.slug &&
                          router.asPath.split("/")[2] !== "all"
                          ? "white"
                          : "black",
                    }}
                  >
                    {item.name}
                  </h5>
                </Link>
              ))}
          </div>
        </div>
        <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} />

        {router.asPath.split("/")[2] === "all" ? null : (
          <div className={styles.desc}>
            {router.asPath === "/fantasy-cricket/dream11/" ||
              description.length === 0 ||
              description === undefined ? null : (
              <div>
                <h1>{description.name}</h1>

                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      description.description === ""
                        ? null
                        : description.description.split(". ")[0] + ".",
                  }}
                ></span>
                <span
                  style={{ display: showMore ? "inline" : "none" }}
                  id="more"
                  dangerouslySetInnerHTML={{
                    __html:
                      description.description === ""
                        ? null
                        : description.description,
                  }}
                ></span>
                <span
                  id="dots"
                  style={{ display: showMore ? "none" : "inline" }}
                ></span>

                {description.description === "" ||
                  description.description.length < 250 ? null : (
                  <button
                    type="button"
                    // className={`${styles.btn} ${
                    //   styles.btn - outline - secondary
                    // } ${styles.btn - sm}`}
                    class="btn btn-outline-secondary btn-sm"
                    // style={{background:"var(--primary)",border:"none"}}
                    onClick={handleClick}
                  >
                    {showMore ? "Read less" : "Read more"}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        <List className={styles.flexContainer}>
          {Data.length === 0 ? null : (
            <>
              {Data.map((item, index) => {
                return (
                  <div className="col-md-4 wid_style" key={index}>
                    <ListItem >
                      <Link
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
                              item.attachment === [] ||
                              item.attachment === undefined
                              ? `${background}`
                              : item.attachment[0].file_name === ""
                                ? `${background}`
                                : `${HOST}${item.attachment[0].file_uri}/${item.attachment[0].file_name}`
                          }
                        />
                      </Link>
                    </ListItem>
                  </div>
                );
              })}
            </>
          )}
        </List>
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
        {/* <Pagination total={page} initialPage={count} onChange={handleChange}/> */}
      </div>
    </>
  );
}

export default CricketNewsAll;
