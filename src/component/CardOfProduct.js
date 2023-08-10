import { useNavigate } from "react-router-dom";

import { BtnTag } from "./BtnTag";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./CardOfProduct.module.css";

export const CardOfProduct = ({ src, data }) => {
    const history = useNavigate();

    const imgObj = {
        src: `${src}`,
        className: `${styles.stayImg}`,
    };

    const cardClickEvent = () => {
        history(`/product/${data.pdid}`);
    }

    return (
        <div key={data.pdid} className={styles.cardOfProduct}>
            <img {...imgObj} alt={"stay Photo"}/>
            <div className={styles.cardUi}>
                <div>
                    <p className={styles.starText}>
                        <FontAwesomeIcon icon={faStar} className={styles.starIcon} />
                        {data.pdpoint}
                    </p>
                    <p className={styles.locationText} onClick={cardClickEvent}>
                        [{data.pdaddr.split(" ")[0]} / {data.pdaddr.split(" ")[1]}] {data.pdname}
                    </p>
                    <p className={styles.payText}>
                        {data.pdprice} ~ / 1박
                    </p>
                </div>
                <BtnTag type={"shortBtn"} mode={"bookBtn"} event={() => history(`/payment/${data.pdid}/1`)}/>
            </div>
        </div>
    );
};
