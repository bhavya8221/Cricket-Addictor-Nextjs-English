import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import classname from "classnames";
import NextLink from "next/link";
import MenuButton from "../MenuButton/MenuButton";
import SeriesCard from "../SeriesCard/SeriesCard";
import { seriesApi } from "../../Constants/Api/Api";
import { List, ListItem } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import usePagination from "../../Common/Pagination/Pagination";
 
import styles from "./Series.module.scss";
import Head from "next/head";
import Breadcrumbs from "../../Common/BreadcrumbsSchema/Breadcrumbs";
import HOST from "../../Constants/host";
import Link from "next/link";

function Series(props) {
   
  const [seriesData, setSeriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = router.asPath;
  const [allSeriesData, setAllSeriesData] = useState(0);

  let [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const count = Math.ceil(allSeriesData.length / PER_PAGE);
  const _DATA = usePagination(seriesData, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const menus = [
    {
      title: (
        <>
          Current Series
        </>
      ),
      path: "/cricket-series/live",
    },
    {
      title: (
        <>
          Completed Series
        </>
      ),
      path: "/cricket-series/recent",
    },
    {
      title: (
        <>
          Upcoming Series
        </>
      ),
      path: "/cricket-series/upcoming",
    },
  ];

  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {
  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  // useEffect(() => {
  //   if (pathname === "/cricket-series/live) {
  //     setIsLoading(true);
  //     SeriesApi("", "live", "")
  //       .then((res) => {
  //         setAllSeriesData(res.data.data.rows);
  //         setIsLoading(false);
  //       })
  //       .catch((e) => {
  //         // Navigation(e.code, e.message);
  //       });
  //   }

  //   if (pathname === "/cricket-series/live") {
  //     setIsLoading(true);
  //     SeriesApi(PER_PAGE, "live", page)
  //       .then((res) => {
  //         setSeriesData(res.data.data.rows);
  //         setIsLoading(false);
  //       })
  //       .catch((e) => {
  //         // Navigation(e.code, e.message);
  //       });
  //   }

  //   if (pathname === "/cricket-series/recent") {
  //     setIsLoading(true);
  //     SeriesApi("", "result", "")
  //       .then((res) => {
  //         setAllSeriesData(res.data.data.rows);
  //         setIsLoading(false);
  //       })
  //       .catch((e) => {
  //         // Navigation(e.code, e.message);
  //       });
  //   }
  //   if (pathname === "/cricket-series/recent") {
  //     setIsLoading(true);
  //     SeriesApi(PER_PAGE, "result", page)
  //       .then((res) => {
  //         setSeriesData(res.data.data.rows);
  //         setIsLoading(false);
  //       })
  //       .catch((e) => {
  //         // Navigation(e.code, e.message);
  //       });
  //   }
  //   if (pathname === "/cricket-series/upcoming") {
  //     setIsLoading(true);
  //     SeriesApi("", "upcoming", "")
  //       .then((res) => {
  //         setAllSeriesData(res.data.data.rows);
  //         setIsLoading(false);
  //       })
  //       .catch((e) => {
  //         // Navigation(e.code, e.message);
  //       });
  //   }
  //   if (pathname === "/cricket-series/upcoming") {
  //     setIsLoading(true);
  //     SeriesApi(PER_PAGE, "upcoming", page)
  //       .then((res) => {
  //         setSeriesData(res.data.data.rows);
  //         setIsLoading(false);
  //       })
  //       .catch((e) => {
  //         // Navigation(e.code, e.message);
  //       });
  //   }
  // }, [PER_PAGE, page, pathname]);

  useEffect(() => {
    if (pathname === "/cricket-series/live/") {
      setIsLoading(true);
      seriesApi("", "live", "")
        .then((res) => {
          setAllSeriesData(res.data.data.rows);
          setIsLoading(false);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }

    if (pathname === "/cricket-series/live/") {
      setIsLoading(true);
      seriesApi(PER_PAGE, "live", page)
        .then((res) => {
          setSeriesData(res.data.data.rows);
          setIsLoading(false);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }

    if (pathname === "/cricket-series/recent/") {
      setIsLoading(true);
      seriesApi("", "result", "")
        .then((res) => {
          setAllSeriesData(res.data.data.rows);
          setIsLoading(false);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
    if (pathname === "/cricket-series/recent/") {
      setIsLoading(true);
      seriesApi(PER_PAGE, "result", page)
        .then((res) => {
          setSeriesData(res.data.data.rows);
          setIsLoading(false);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
    if (pathname === "/cricket-series/upcoming/") {
      setIsLoading(true);
      seriesApi("", "upcoming", "")
        .then((res) => {
          setAllSeriesData(res.data.data.rows);
          setIsLoading(false);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
    if (pathname === "/cricket-series/upcoming/") {
      setIsLoading(true);
      seriesApi(PER_PAGE, "upcoming", page)
        .then((res) => {
          setSeriesData(res.data.data.rows);
          setIsLoading(false);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
  }, [PER_PAGE, page, pathname]);

  const articleBreadcrumb = {
    "@context": "https://schema.org",
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
        name:
          props.active === 0
            ? "Current Series"
            : props.active === 1
            ? "Completed Series"
            : "Upcoming Series",
        item: `${HOST}${pathname}`,
      },
    ],
  };

  return (
    <div className={styles.series_section}>
      <MenuButton
        title="All Series"
        menuitems={menus}
        pathname={pathname}
        activeMenu={props.active}
      />
      <Head>
        <title itemprop="name">
          {props.active === 0
            ? "Cricket Series - Upcoming International, Domestic and T20 Series"
            : props.active === 1
            ? "Cricket Series - Recently Completed"
            : "Upcoming Cricket Series"}
        </title>
        <meta
          name="description"
          itemprop="description"
          content={
            props.active === 0
              ? "Check out Cricket Schedule of upcoming International, domestic and T20 Series on Cricketaddictor"
              : props.active === 1
              ? "Check out recently completed cricket schedule cricket Series on Cricketaddictor"
              : "Check out upcoming cricket series on Cricketaddictor"
          }
        />

         <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleBreadcrumb),
          }}/>
      </Head>
     
      <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} />

      <div className={`${styles.RowGrid} row`}>
        <div className={`${styles.ColGrid} col-md-12`}>
          <div>
            <div className={styles.Srelated_section}>
              <h2 className={styles.Sred_line}>|</h2>
              <h3 className={styles.Srelated}>
                {props.active === 0 ? (
                  <>
                   Current Series
                  </>
                ) : props.active === 1 ? (
                  <>
                    Completed Series
                  </>
                ) : (
                  <>
                    Upcoming Series
                  </>
                )}
              </h3>
              <div className={styles.Srelated_line} />
            </div>
            {isLoading === true ? null : (
              <List className={`${styles.flexContainer} mx-1`}>
                {seriesData.map((item, index) => {
                  return (
                    <div className={styles.SeiesList} key={index}>
                      <ListItem key={item.id}>
                        <SeriesCard data={item} />
                      </ListItem>
                    </div>
                  );
                })}
              </List>
            )}
          </div>
          <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
        </div>
        {/* <div className={styles["col-md-3" ,"ColGrid"]}>
          <div className={styles.ads_bx}>
            <h4>AD</h4>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Series;
