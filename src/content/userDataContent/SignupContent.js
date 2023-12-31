import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../apis/login";

import { BtnTag } from "../../component/BtnTag";
import { InputTag } from "../../component/InputTag";

import { isEmailPattern } from "../../util/validation/isEmailPattern";
import { isIDPattern } from "../../util/validation/isIDPattern";
import { isNickNamePattern } from "../../util/validation/isNickNamePattern";
import { isPWPattern } from "../../util/validation/isPWPattern";

import styles from "./SignupContent.module.css";

export const SignupContent = () => {
    const [ nickName, setNickName ] = useState("");
    const [ id, setId ] = useState("");
    const [ idValidate, setIdValidate ] = useState(true);
    const [ pw, setPw ] = useState("");
    const [ pwValidate, setPwValidate ] = useState(true);
    const [ pwSafe, setPwSafe ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ emailValidate, setEmailValidate ] = useState(true);
    const [ code, setCode ] = useState();
    const [ codeMode, setCodeMode ] = useState(false);
    const [ onBtn, setOnBtn ] = useState(true);

    const history = useNavigate();

    useEffect(() => {
        if(id && pw && email && nickName) {
            setOnBtn(false)
        } else {
            setOnBtn(true);
        }
    }, [id, email, pw, nickName]);

    useEffect(() => {
        if(isPWPattern(pw) && pw !== "") {
            setPwValidate(true);
        } else {
            setPwValidate(false);
        }
    }, [pw]);

    const IdDupleFunc = (e) => {
        e.preventDefault();

        if (isIDPattern(id)) {
            login("duple", { username : id })
                .then(res => {
                    if (res) {
                        setIdValidate(true);
                    } else {
                        alert("중복되는 아이디가 존재합니다.");
                        setIdValidate(false);
                    }
                })
                .catch (error => {
                    console.error("Error:", error);
                    setIdValidate(false);
                })
        } else {
            setIdValidate(false);
        }
    }

    const EmailFunc = (e) => {
        e.preventDefault();

        if(idValidate) {
            if(isEmailPattern(email)) {
                login("emailCode", { username : id, useremail : email })
                    .then(res => {
                        if(res) {
                            setCodeMode(true);
                        } else {
                            setCodeMode(false);
                        }
                    })
            } else {
                setEmailValidate(false);
            }
        } else {
            alert("아이디를 먼저 입력 후 인증해주세요.");
        }
    }

    const CodeFunc = (e) => {
        e.preventDefault();

        login("code", { username : id, code : parseInt(code) })
            .then(res => {
                if(res) {
                    setEmailValidate(true);
                } else {
                    alert("이메일 코드가 올바르지 않습니다.");
                }
            });
    }

    const signUpFunc = (e) => {
        e.preventDefault();

        login("signup", { username : id, useremail : email, userpassword : pw, usernickname : nickName })
            .then(res => {
                if(res) {
                    alert("회원가입 완료")
                    history("/login");
                } else {
                    alert("회원가입 실패");
                    history("/users/signup");
                }
            })
    }

    return (
        <>
            <form onSubmit={signUpFunc} className={styles.formTag}>
                <InputTag mode={"id"} check={true} checkType={"dupleBtn"} setValue={setId} validate={idValidate} disabled={id === ""} event={IdDupleFunc} />
                <InputTag mode={"name"} setValue={setNickName} validate={nickName !== "" ? isNickNamePattern(nickName) : true} />
                <InputTag mode={"pw"} setValue={setPw} validate={pwValidate} />
                <InputTag mode={"pwCorrect"} setValue={setPwSafe} validate={pwSafe !== "" ? pw === pwSafe : true} disabled={(pwSafe === "" || pw === "")} />
                <InputTag mode={"email"} check={true} checkType={"reqBtn"} setValue={setEmail} validate={emailValidate} disabled={email === ""} event={EmailFunc} />
                {codeMode ? (
                    <InputTag mode={"code"} check={true} checkType={"reqBtn"} setValue={setCode} disabled={code === ""} event={CodeFunc} />
                ) : null }
                <BtnTag type={"longBtn"} mode={"signup"} isdisabled={onBtn} />
            </form>
        </>
    )
}