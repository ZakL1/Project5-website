import React from "react";
import styles from "../styles/Avatar.module.css";

const DEFAULT_IMAGE = "https://res.cloudinary.com/dvajuxx87/image/upload/v1746104198/defaultprofile_hwuglk.jpg";

const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src || DEFAULT_IMAGE}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;