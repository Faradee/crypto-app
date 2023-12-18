import React from "react";
import Image from "next/image";
import { Crypto } from "@/actions/assetActions";
import styles from "./details.module.scss";
const AssetDetails = ({ crypto, icon }: { crypto: Crypto; icon: string }) => {
  return (
    <tr>
      <td colSpan={6}>
        <div className={styles.headContainer}>
          <div>
            <Image src={icon} alt={crypto.id} width={50} height={50} />
          </div>
          <span>{crypto.name}</span>
        </div>
      </td>
    </tr>
  );
};

export default AssetDetails;
