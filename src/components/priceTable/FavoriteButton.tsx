"use client";
import { useEffect, useState, useContext } from "react";
import { GoStarFill, GoStar } from "react-icons/go";
import styles from "./priceTable.module.scss";
import { getFavorite, setFavorite, unsetFavorite } from "@/actions/assetActions";
import AuthContext from "../navbar/AuthContext";
const FavoriteButton = ({ id }: { id: string }) => {
  const [favorited, setFavorited] = useState<boolean>(false);
  const { authorized } = useContext(AuthContext);
  const handleFavorite = async () => {
    const handled = !favorited ? await setFavorite(id) : await unsetFavorite(id);
    if (handled) setFavorited(!favorited);
  };
  useEffect(() => {
    const fetchFavorite = async () => {
      const favorited = authorized ? await getFavorite(id) : false;
      setFavorited(favorited);
    };
    fetchFavorite();
  }, [authorized, id]);
  useEffect(() => {
    const initFavorite = async () => {
      const favorited = await getFavorite(id);
      setFavorited(favorited);
    };
    initFavorite();
  }, [id]);
  return (
    <div onClick={handleFavorite} title="Добавить в избранное" className={styles.favoriteButton}>
      {favorited ? (
        <GoStarFill color="yellow" size="20" />
      ) : (
        <GoStar color={!authorized ? "gray" : "white"} size="20" />
      )}
    </div>
  );
};

export default FavoriteButton;
