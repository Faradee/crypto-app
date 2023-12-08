"use client";
import React, { useState } from "react";
import { GoStarFill, GoStar } from "react-icons/go";
import styles from "./priceTable.module.scss";
const FavoriteButton = ({ id }: { id: number }) => {
  const [favorited, setFavorited] = useState<boolean>(false);
  const handleFavorite = () => {
    setFavorited(!favorited);
  };
  return (
    <div onClick={handleFavorite} className={styles.favoriteButton}>
      {favorited ? <GoStarFill size="20" /> : <GoStar size="20" />}
    </div>
  );
};

export default FavoriteButton;
