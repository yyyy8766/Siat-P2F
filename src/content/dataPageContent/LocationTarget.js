import { BtnTag } from "../../component/BtnTag";
import { TitleTag } from "../../component/TitleTag";

import styles from "./LocationTarget.module.css";

export const LocationTarget = ({ selected, setEvent }) => {
    const categories = ["서울", "경기", "부산", "제주", "강원", "전라", "경상"];

    return (
        <div className={styles.targetTitle}>
            <TitleTag mode={"locationTitle"} />
            <div className={styles.itemsList}>
                {categories.map((item, index) => (
                    <BtnTag type={"shortBtn"} mode={"categoryBtn"} event={({ target }) => setEvent(target.innerText.toString())} data={item} selected={ selected === item } />
                ))}
            </div>
        </div>
    )
}