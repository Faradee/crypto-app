"use client";
import { useEffect, useState } from "react";
import { GoStarFill, GoStar } from "react-icons/go";
import styles from "./priceTable.module.scss";
import { getFavorite, setFavorite, unsetFavorite } from "@/actions/postActions";
const FavoriteButton = ({ id }: { id: string }) => {
  const [favorited, setFavorited] = useState<boolean>(false);
  const handleFavorite = async () => {
    const handled = !favorited ? await setFavorite(id) : await unsetFavorite(id);
    if (handled) setFavorited(!favorited);
  };
  useEffect(() => {
    const initFavorite = async () => {
      const favorited = await getFavorite(id);
      setFavorited(favorited);
    };
    initFavorite();
  }, [id]);
  return (
    <div onClick={handleFavorite} className={styles.favoriteButton}>
      {favorited ? <GoStarFill size="20" /> : <GoStar size="20" />}
    </div>
  );
};

export default FavoriteButton;
