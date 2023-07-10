import React from "react";
import HOST from "../../Constants/host";
import styles from "./IPLImageSlider.module.scss";
import { Carousel } from "react-bootstrap";
import { FaCaretRight } from "react-icons/fa";
import background from "../../public/Images/no-img.png";
import { useRouter } from "next/router";

function IPLImageSlider(props) {
  const router = useRouter();
  function handleNews(value1, value2) {
    router.replace(`/news/${value2}/${value1}`);
    // window.location.href = `/news/${value2}/${value1}`;
  }
  return (
    <>
      {props.CarouselData.length === 0 ? (
        <h4 style={{ textAlign: "center", marginTop: 10 }}>No Banner Data</h4>
      ) : (
        <div className={styles.imageSlider_ipl_section}>
          <Carousel interval={3000} fade style={{ marginTop: 10 }}>
            {props.CarouselData.map((item, index) => {
              return (
                <Carousel.Item
                  style={{ cursor: "pointer" }}
                  active
                  key={index}
                  onClick={() => handleNews(item.slug, item.news_category)}
                >
                  <img
                    className={`d-block w-100 ${styles.slidder}`}
                    src={
                      item.file_uri === null || item.file_uri === ""
                        ? `${background}`
                        : item.file_name === null || item.file_name === ""
                        ? `${background}`
                        : `${HOST}${item.file_uri}/${item.file_name}`
                    }
                    alt="slide"
                  />
                  <Carousel.Caption className={styles.carouselOption}>
                    <button
                      className={styles.newsBtn}
                      onClick={() => handleNews(item.slug, item.news_category)}
                    >
                      <FaCaretRight size={18} color=" var(--light)" />
                      {item.category_name === null || item.category_name === ""
                        ? "Cricket News"
                        : item.category_name === undefined
                        ? "-------"
                        : item.category_name}
                    </button>
                    <p className={styles.title}>{item.title}</p>
                    <p className={styles.date}>{item.date}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      )}
    </>
  );
}
export default IPLImageSlider;
