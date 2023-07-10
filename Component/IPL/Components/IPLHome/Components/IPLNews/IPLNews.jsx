import React, { useState, useEffect } from "react";
import NewsCard from "../../../../../NewsCard/NewsCard";
import background from "../../../../../../public/Images/no-banner.png";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Pagination from "@mui/material/Pagination";
import usePagination from "../../../../../../Common/Pagination/Pagination";
// import { Link, useLocation, useParams } from "react-router-dom";
import { newsTeamsPlayersApi } from "../../../../../../Constants/Api/Api";
import styles from "./IPLNews.module.scss";
import HOST from "../../../../../../Constants/host";
import Link from "next/link";
import { useRouter } from "next/router";

const IPLNews = () => {
  const router = useRouter();
  const [Data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const { season } = router.query;
  const pathname = router.asPath;

  let [page, setPage] = useState(1);
  const PER_PAGE = 12;
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
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    newsTeamsPlayersApi(season, "", "")
      .then((res) => {
        setAllData(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });

    newsTeamsPlayersApi(season, PER_PAGE, page)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [season, page, PER_PAGE]);

  return (
    <div className="col IPLNews_section">
      <div className="col Tname">
        {/* <Helmet>
        <link rel="canonical" href={currentPageUrl} />
          {prevPageUrl && <link rel="prev" href={prevPageUrl} />}
          {nextPageUrl && <link rel="next" href={nextPageUrl} />}
        </Helmet> */}
        {/* <h5>News</h5> */}
        <div className="rightcol">
          <div className="row ">
            <List className="flexContainer">
              {Data.length === 0 ? (
                <h6>No News...</h6>
              ) : (
                Data.map((item, index) => {
                  return (
                    <div key={index} className="col-md-3 mt-3 cols">
                      <ListItem key={index}>
                        <Link
                          className="link_color"
                          href={`/cricket-news/${item.news_category}/${item.slug}`}
                        >
                          <NewsCard
                            title={item.title}
                            date={item.date}
                            source={
                              item.file_uri === "" || item.file_uri === null
                                ? `${background}`
                                : item.file_name === "" ||
                                  item.file_name === null
                                ? `${background}`
                                : `${HOST}${item.file_uri}/${item.file_name}`
                            }
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
    </div>
  );
};
export default IPLNews;
