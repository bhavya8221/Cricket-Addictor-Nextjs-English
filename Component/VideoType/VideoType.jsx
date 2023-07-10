import React, { useEffect, useState } from "react";
import styles from "./VideoType.module.scss";
import VideoCard from "../../Component/VideoCard/VideoCard";
import MenuButton from "../../Component/MenuButton/MenuButton";
import usePagination from "../../Common/Pagination/Pagination";
import { List, ListItem } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import noVideo from "../../public/Images/no-video.png";
import HOST from "../../Constants/host";

 
import BreadcrumbsSchema from "../../Common/BreadcrumbsSchema/BreadcrumbsSchema";
import { useRouter } from "next/router";
import { getVideoTypeAPI } from "../../Constants/Api/Api";
import Head from "next/head";
import Breadcrumbs from "../../Common/BreadcrumbsSchema/Breadcrumbs";

function VideoType(props) {
  const router = useRouter();
  const pathname = router.asPath;
  const [videosData, setVideosData] = useState([]);
  const [visible, setVisible] = useState(false);

  let [page, setPage] = useState(1);
  const PER_PAGE = 12;
  const count = Math.ceil(videosData.length / PER_PAGE);
  const _DATA = usePagination(videosData, PER_PAGE);
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
  const video_menus = [
    { title:"allVideos", path: "/videos/all" },
    { title:"interviews", path: "/videos/interviews" },
    { title:"Press_Conferences", path: "/videos/press-conferences" },
    { title:"highlights", path: "/videos/highlights" },
  ];

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
    if (props.active === 0) {
      getVideoTypeAPI("Video", "")
        .then((res) => {
          setVideosData(res.data.data);
          setVisible(true);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
    if (props.active === 1) {
      getVideoTypeAPI("Video", "Interviews")
        .then((res) => {
          setVideosData(res.data.data);
          setVisible(true);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
    if (props.active === 2) {
      getVideoTypeAPI("Video", "PressConfearance")
        .then((res) => {
          setVideosData(res.data.data);
          setVisible(true);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
    if (props.active === 3) {
      getVideoTypeAPI("Video", "Highlights")
        .then((res) => {
          setVideosData(res.data.data);
          setVisible(true);
        })
        .catch((e) => {
          // Navigation(e.code, e.message);
        });
    }
  }, [props.active]);

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
        name: "Videos",
        item: `${HOST}${router.asPath.split("/")[1]}/all`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${
          pathname.split("/")[2] === "all"
            ? "All Videos"
            : pathname.split("/")[2]
        }`,
        item: `${HOST}${pathname}`,
      },
    ],
  };
 

  return (
    <>
      <MenuButton
        title="videos"
        menuitems={video_menus}
        activeMenu={props.active}
        pathname={pathname}
      />
      <Head>
        <title itemprop="name">
          {pathname.split("/")[2] === "all"
            ? `क्रिकेट Videos देखें - Videos हाइलाइट, मैच क्लिप`
            : `क्रिकेट ${pathname.split("/")[2]} Videos`}
        </title>
        <meta
          name="description"
          itemprop="description"
          content={
            pathname.split("/")[2] === "all"
              ? `नवीनतम क्रिकेट Videos - क्रिकेट एडिक्टर पर All क्रिकेट Videos, Videos हाइलाइट, मैच क्लिप, क्रिकेट News क्लिप देखें।`
              : `क्रिकेट एडिक्टर पर क्रिकेट ${
                  pathname.split("/")[2]
                } Videos देखें`
          }
        />
        <link rel="canonical" href={currentPageUrl} />
        {prevPageUrl && <link rel="prev" href={prevPageUrl} />}
        {nextPageUrl && <link rel="next" href={nextPageUrl} />}
         <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleBreadcrumb),
          }}/>
      </Head>
      <div className={styles.video_section}>
      <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} />


        <List
          className={styles.flexContainer}
          style={{ paddingLeft: "15px", paddingRight: "15px" }}
        >
          {visible === true
            ? videosData.map((item, index) => {
                return (
                  <div className="col-md-3 col-mx-12" key={index}>
                    <ListItem key={item.id} style={{ paddingLeft: 0 }}>
                      <span
                        className="link_color"
                        onClick={() => {
                          window.open(
                            HOST + item.file_uri + item.file_name,
                            "_blank"
                          );
                        }}
                      >
                        <VideoCard source={noVideo} data={item} />
                      </span>
                    </ListItem>
                  </div>
                );
              })
            : null}
        </List>
      </div>
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />{" "}
    </>
  );
}

export default VideoType;
