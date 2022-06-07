import { useState, createContext, useEffect, useRef } from "react";
import styles from "./AddAccount.module.css";
import FormField from "../../components/FormField/FormField";
import { NEW_ACCOUNT_FORM_FIELDS, AccType, FdAcc, Term } from "../../data/accdata";
import SimpleLoader from "../../components/SimpleLoader/SimpleLoader";
import Button from "../../components/Button/Button";
import { Modal } from "react-responsive-modal";
// import Popup from "../../components/Popup/Popup";

// import RegisterForm from "./../Register/RegisterForm";
import Page_transition from "../../components/Animation/Transition";
import Heading from "../../components/Heading/Heading.js";
import { apiAddAccount } from "../../auth/auth";
import { ReactNotifications, Store } from 'react-notifications-component'
import { useNavigate } from "react-router-dom";
import { toastNotification } from "../../components/Notification/Notification";
import 'react-notifications-component/dist/theme.css';

const axios = require('axios');



const Login = () => {
    var navigate = useNavigate();
    const loginDetailsFormat = {
        fname: "",
        lname: "",
        dob: "",
        gender: "",
        phone: "",
        email: "",
        aadhar: "",
        pan: "",
        line1: "",
        line2: "",
        city: "",
        pincode: "",
        principle: 0,
        term: "",
        depdate: "",
        maturdate: "",
        accType: "",
        password: "",
    }
    const clickedSubmit = async () => {

        // setloader(true);
        //   console.log({...loginDetails,captcha: reCaptchaRef.current.getValue()});

        const resp = await apiAddAccount({
            ...loginDetails,
        });

        console.log(resp.data)
        if (resp === undefined) {
            Store.addNotification({ ...toastNotification, message: "Error Undefined" })
        } else {
            if (resp.status === 200) {
                // console.log(auth);
                // console.log(resp.data.message);
                // showMessage(resp.data.message, resp.data.flag);
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });
                navigate('/');
                // setloader(false);

            } else if (resp.status >= 400 && resp.status < 500) {
                console.log(resp.data.message);
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag })
                setloader(false);

            } else if (resp.status >= 500 && resp.status < 600) {
                console.log(resp.data.message);
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag })
                setloader(false);

            }
        }

    }
    const [loader, setloader] = useState(false);
    const [loginDetails, setLoginDetails] = useState(loginDetailsFormat);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const changeLoginFormState = (args) => {
        let prevState = loginDetails
        prevState[args.key] = args.value
        setLoginDetails({ ...prevState })
    }
    return (
        <Page_transition>
            <div className={`${styles.login_wrapper_main}`}>
                <div className={`${styles.login_wrapper}`}>
                    <Heading text='LOGIN' />
                    <div className={`${styles.register_container}`}>
                        <div className={`${styles.registerFormContainer}`}>
                            {loader && <SimpleLoader message={"Logging in"} />}
                            <div
                                style={{ display: loader ? "none" : "flex" }}
                                className={`${styles.formWrapper}`}
                            >
                                <>
                                    {NEW_ACCOUNT_FORM_FIELDS.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={loginDetails}
                                                    setter={changeLoginFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }
                                    {AccType.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={loginDetails}
                                                    dropdownValues={field.dropdownValues}
                                                    setter={changeLoginFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }
                                    {loginDetails.accType == "FD" && Term.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={loginDetails}
                                                    dropdownValues={field.dropdownValues}
                                                    setter={changeLoginFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }
                                    {loginDetails.accType == "FD" && FdAcc.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={loginDetails}
                                                    setter={changeLoginFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }
                                </>
                                <div>
                                    <Button text={"Login"} onClickMethod={clickedSubmit} color='rgb(255, 100, 0)' />
                                    <Modal showCloseIcon={false} open={isModalOpen} onClose={() => { setIsModalOpen(false) }} center autofocus={false} classNames={{
                                        overlay: `${styles.customOverlay}`,
                                        modal: `${styles.customModal}`,
                                    }}>
                                        {/* <Popup /> */}
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Page_transition>
    )
}

export default Login