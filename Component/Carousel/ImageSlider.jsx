import React from "react";
import HOST from "../../Constants/host";
import styles from "./ImageSlider.module.scss";
import { Carousel } from "react-bootstrap";
import { FaCaretRight } from "react-icons/fa";
import background from "../../public/Images/no-img.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function ImageSlider(props) {
  const router = useRouter()
  return (
    <>
      <div className={styles.imageSlider_section}>
        <Carousel interval={200000} fade style={{ marginTop: 10 }} controls={false}>
          {props.CarouselData.map((item, index) => {
            return (
              <Carousel.Item
                style={{ cursor: "pointer" }}
                active
                key={index}
                onClick={() => {
                  const path =
                    item.category === null || item.category.length === 0
                      ? `/${item.news_category}/${item.slug}/`
                      : `/${item.news_category}/${item.category.slug}/${item.slug}/`;
                  router.push(path);
                }}
              >
                <Image
                  className={`${styles.d_block} w-100 ${styles.slidder}`}
                  src={
                    item.attachment === [] ||
                      item.attachment.length === 0 ||
                      item.attachment === undefined
                      ? `${background}`
                      : item.attachment[0].file_name === ""
                        ? `${background}`
                        : `${HOST}${item.attachment[0].file_uri}/${item.attachment[0].file_name}`
                  }
                  width={100}
                  height={10}
                  alt="Image description"
                />
                <Carousel.Caption className={styles.carouselOption} style={{ left: 0, right: 0, paddingTop: "2px", paddingBottom: "2px", paddingRight: "10px", paddingLeft: "10px" }} >
                  <button
                    className={styles.newsBtn}
                    onClick={() => {
                      const path =
                        item.category === null || item.category.length === 0
                          ? `/${item.news_category}/${item.slug}/`
                          : `/${item.news_category}/${item.category.slug}/${item.slug}/`;
                      router.push(path);
                    }}
                  >
                    <FaCaretRight size={18} color="var(--light)" />
                    {item.category === null ||
                      item.category === [] ||
                      item.category === {} ||
                      item.category === ""
                      ? "Cricket News"
                      : item.category[0] === undefined
                        ? item.category.name
                        : item.category[0].name}

                  </button>
                  <p className={styles.title}>
                    <span
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "white",
                      }}
                    >
                      &nbsp;{item.title}&nbsp;
                    </span>
                  </p>
                  <p className={styles.date}>{item.post_date}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}
export default ImageSlider;
