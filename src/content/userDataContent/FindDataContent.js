import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { login } from "../../apis/login";

import { BtnTag } from "../../component/BtnTag";
import { InputTag } from "../../component/InputTag";
import { LabelTag } from "../../component/LabelTag";

import { isEmailPattern } from "../../util/validation/isEmailPattern";
import { isIDPattern } from "../../util/validation/isIDPattern";

import styles from "./FindDataContent.module.css"

export const FindDataContent = () => {
    const { userData } = useParams();
    const [ mode, setMode ] = useState(userData);
    const [ email, setEmail ] = useState("");
    const [ id, setId ] = useState("");
    const [ sendData, setSendData ] = useState(null);

    const history = useNavigate();

    const findIdFunc = async () => {
        await login("searchId", { username : id })
            .then(req => {
                setSendData(req);
            })
    }

    const findPwFunc = async () => {
        await login("searchPw", { username : id, useremail : email })
            .then(req => {
                if(req) {
                    setSendData(req);
                } else {
                    alert("존재하는 아이디 혹은 이메일이 아닙니다.");
                }
            })
    }

    useEffect(() => {
        setSendData(null);
    }, [mode])

    return (
        <div className={styles.findContainer}>
            <LabelTag mode={mode} setMode={setMode} />
            {mode === "id" ? (
                sendData === null || sendData === "" ? (
                    <div className={styles.idFindContainer}>
                        <InputTag mode={"email"} setValue={setEmail} validate={email !== "" ? isEmailPattern(email) : true} />
                        <BtnTag type={"longBtn"} mode={"idFind"} event={findIdFunc} isdisabled={email !== ""} />
                    </div>
                ) : (
                    <div className={styles.idFindContainer}>
                        <p className={styles.text}>회원님의 아이디는 <span className={styles.textId}>{sendData}</span>입니다.</p>
                        <BtnTag type={"longBtn"} mode={"toLogin"} event={() => history("/login")} isdisabled={email !== ""} />
                    </div>
                )
            ) : (
                sendData === null || sendData === "" ? (
                    <div className={styles.pwFindContainer}>
                        <InputTag mode={"id"} setValue={setId} validate={id !== "" ? isIDPattern(id) : true} />
                        <InputTag mode={"email"} setValue={setEmail} validate={email !== "" ? isEmailPattern(email) : true} />
                        <BtnTag type={"longBtn"} mode={"pwFind"} event={findPwFunc} isdisabled={(id !== "" && email !== "")} />
                    </div>
                ) : (
                    <div className={styles.idFindContainer}>
                        <p className={styles.text}> 당신의 비밀번호는 <span>응애</span> 입니다.</p>
                        <BtnTag type={"longBtn"} mode={"toLogin"} event={() => history("/login")} isdisabled={email !== ""} />
                    </div>
                )
            )}
        </div>
    )
}