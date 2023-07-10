import React, { useState, useEffect, useCallback } from "react";
import NewsCard from "../../../../../NewsCard/NewsCard";
import background from "../../../../../../public/Images/no-banner.png";
import { List, ListItem } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import usePagination from "../../../../../../Common/Pagination/Pagination";
import Link from "next/link";
import {
  NewsTeamsPlayersApi,
  newsTeamsPlayersApi,
} from "../../../../../../Constants/Api/Api";
import styles from "./SquadNews.module.scss";
import HOST from "../../../../../../Constants/host";
 
import { useRouter } from "next/router";
import Head from "next/head";

const SquadNews = () => {
  const router = useRouter();
   
  const [Data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  // const { pid ,tid} = useParams();
  const pathname = router.asPath;
  const { slug } = router.query;
  // const pathSegments = window.location.pathname.split("/");
  // const index = pathSegments.indexOf(tid);
  // if (index !== -1) {
  //   pathSegments.splice(index, 1);
  // }
  // const newPath = pathSegments.join("/");
 ;
  // const newUrl = window.location.origin + newPath + window.location.search;
  // window.history.replaceState({}, "", newUrl);
  let [page, setPage] = useState(1);
  const PER_PAGE = 6;
  const count = Math.ceil(allData.length / PER_PAGE);
  const _DATA = usePagination(Data, PER_PAGE);
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

  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  useEffect(() => {
    newsTeamsPlayersApi(slug[1], "", "")
      .then((res) => {
        setAllData(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });

    newsTeamsPlayersApi(slug[1], PER_PAGE, page)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [slug[1], page, PER_PAGE]);

  return (
    <div className={`col ${styles.SquadNews_section}`}>
      <div className={`col ${styles.Tname}`}>
        <Head>
          <link rel="canonical" href={currentPageUrl} />
          {prevPageUrl && <link rel="prev" href={prevPageUrl} />}
          {nextPageUrl && <link rel="next" href={nextPageUrl} />}
        </Head>
        <h5>News</h5>
        <div className={styles.rightcol}>
          
            <List className={styles.flexContainer}>
              {Data.length === 0 ? (
                <h6>No News...</h6>
              ) : (
                // null
                Data.map((item, index) => {
                  return (
                    <div key={index} className="col-md-6 mt-3 cols">
                      <ListItem key={index}>
                        <Link
                          className={styles.link_color}
                          href={`/cricket-news/${item.news_category}/${item.slug}`}
                        >
                          <NewsCard
                            title={item.title}
                            date={item.date}
                            // source={background}
                            // source={
                            //   item.file_uri === "" || item.file_uri === null
                            //     ? `${background}`
                            //     : item.file_name === "" ||
                            //       item.file_name === null
                            //     ? `${background}`
                            //     : `${HOST}${item.file_uri}/${item.file_name}`
                            // }
                          />
                        </Link>
                      </ListItem>
                    </div>
                  );
                })
              )}
            </List>
            <Pagination
              count={count}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />{" "}
          </div>
        </div>
      </div>
  
  );
};
export default SquadNews;
