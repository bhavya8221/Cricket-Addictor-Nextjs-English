import { ListItem } from "@mui/material";
import Link from "next/link";
import React from "react";

import styles from "../../styles/BreadcrumbsSchema.module.scss";

const BreadcrumbsSchema = ({ label, url, isActive, isLast }) => {
  // const { data } = props;

  return (
    <li
      className={`breadcrumb-item${isActive ? styles.active : ""}
    ${isLast ? styles.last : ""}
    `}
    >
      {isActive ? <span>{label}</span> : <Link href={url} className={styles.link}>{label}</Link>}
    </li>
  );
};

export default BreadcrumbsSchema;
