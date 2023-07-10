import React from "react";
import styles from  "./Video.module.scss";
import VideoCard from "../../Component/VideoCard/VideoCard";
import MenuButton from "../MenuButton/MenuButton";
// import usePagination from "../../Common/Pagination/Pagination";
import { List, ListItem } from "@mui/material";
// import Pagination from '@mui/material/Pagination';
import noVideo from "../../public/Images/no-video.png";
import HOST from "../../Constants/host";
import { useRouter } from "next/router";

function Video(props) {
  const router = useRouter();
  const pathname=router.asPath
  const video_menus = [
    { title: "All VIDEOS", path: "/videos/all/" },
    { title: "INTERVIEWS", path: "/videos/interviews/" },
    { title: "PRESS CONFERENCES", path: "/videos/press-conferences/" },
    { title: "HIGHLIGHTS", path: "/videos/highlights/" },
  ];

  return (
    <>
      {props.menus === "hide" ? null : (
        <MenuButton title="Videos" menuitems={video_menus}
        pathname={pathname} />
      )}
      {props.type !== "Array" ? (
        <List className="flexContainer">
          {props.visible === true &&
            Object.keys(props.data.innings_data).map((item, index) => {
              return index === props.activeIndex
                ? props.data.innings_data[item].map((item2, index2) => {
                    return (
                      <div className=" col-mx-12" key={index2}>
                        <ListItem key={item2.id}>
                          <span
                            className=" link_color"
                            onClick={() => {
                              window.open(
                                HOST + item2.file_uri + item2.file_name,
                                "_blank"
                              );
                            }}
                          >
                            <VideoCard source={noVideo} data={item2} />
                          </span>
                        </ListItem>
                      </div>
                    );
                  })
                : null;
            })}
        </List>
      ) : (
        <List className="flexContainer">
          {props.visible === true &&
            props.data.map((item, index) => {
              return (
                <div className="col-md-3 col-mx-12" key={index}>
                  <ListItem key={item.id}>
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
            })}
        </List>
      )}
      {/* <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />{" "} */}
    </>
  );
}

export default Video;
