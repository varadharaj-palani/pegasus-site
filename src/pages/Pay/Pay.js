import { useState, createContext, useEffect, useRef } from "react";
import styles from "./Pay.module.css";
import FormField from "../../components/FormField/FormField";
import { PAY_FORM_FIELDS, Accounts } from "../../data/paydata";
import SimpleLoader from "../../components/SimpleLoader/SimpleLoader";
import Button from "../../components/Button/Button";
import { Modal } from "react-responsive-modal";
// import Popup from "../../components/Popup/Popup";

// import RegisterForm from "./../Register/RegisterForm";
import Page_transition from "../../components/Animation/Transition";
import Heading from "../../components/Heading/Heading.js";
import { apiPay, apiGetSavAccount, apiGetBeneficiary, apiAddBeneficiary } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import { ReactNotifications, Store } from 'react-notifications-component'
import { toastNotification } from "../../components/Notification/Notification";
import 'react-notifications-component/dist/theme.css';
const axios = require('axios');

const Pay = () => {
    var navigate = useNavigate();

    const config = {
        headers: {
            authorization: localStorage.getItem("email"),
        }
    };

    const payDetailsFormat = {
        amount: 0,
        toacc: "",
        pwd: "",
        facc: "",
        purpose: "",
        email: localStorage.getItem("email")
    }
    const proceedPay = async () => {
        const resp = await apiPay({
            ...payDetails,
        });
        // window.location.href="/profile";
        if (resp === undefined) {
            Store.addNotification({ ...toastNotification, message: "Error Undefined" })
        } else {
            if (resp.status === 200) {
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });
                navigate('../');
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
    const clickedSubmit = async () => {

        setloader(true);
        //   console.log({...loginDetails,captcha: reCaptchaRef.current.getValue()});

        const res = await apiGetBeneficiary(payDetails);
        if (res === undefined) {
            console.log('Error Try Again')
        }
        else {
            const beneficiary = res.data;
            console.log(beneficiary)
            if (res.status === 200) {
                if (!beneficiary.includes(payDetails.toacc)) {
                    const rsp = await apiAddBeneficiary(payDetails);
                    if (rsp === undefined) {
                        console.log('Error Try Again')
                    }
                    else {
                        if (rsp.status === 200) {
                            await proceedPay();
                        }
                        else if (rsp.status >= 400 && rsp.status < 500) {
                            console.log("Query Error")
                        }
                        else if (rsp.status >= 500 && rsp.status < 600) {
                            console.log("Internal Server Error")
                        }
                    }
                }
                else {
                    await proceedPay();
                }
            }
            else if (res.status >= 400 && res.status < 500) {
                console.log("Query Error")
            }
            else if (res.status >= 500 && res.status < 600) {
                console.log("Internal Server Error")
            }
        }



    }
    const [loader, setloader] = useState(false);
    const [payDetails, setPayDetails] = useState(payDetailsFormat);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bit, setBit] = useState(false);
    const [data, setData] = useState([]);
    const changePayFormState = (args) => {
        let prevState = payDetails
        prevState[args.key] = args.value
        setPayDetails({ ...prevState })
    }

    const callapi = async () => {
        const resp = await apiGetSavAccount(config);
        if (resp === undefined) {
            console.log('Error Try Again')
        }
        else {
            if (resp.status === 200) {
                console.log("Account Found")
                console.log(resp.data);
                setData(resp.data);
            }
            else if (resp.status >= 400 && resp.status < 500) {
                console.log("Query Error")
            }
            else if (resp.status >= 500 && resp.status < 600) {
                console.log("Internal Server Error")
            }
        }
    }

    useEffect(() => {
        console.log("useEffect");
        callapi().then(() => {
            console.log(data);
            setBit(!bit);
        });
    }, [])

    return (
        <Page_transition>
            {bit && (<div className={`${styles.login_wrapper_main}`}>
                <div className={`${styles.login_wrapper}`}>
                    <Heading text='PAYMENT' />
                    <div className={`${styles.register_container}`}>
                        <div className={`${styles.registerFormContainer}`}>
                            {loader && <SimpleLoader message={"Logging in"} />}
                            <div
                                style={{ display: loader ? "none" : "flex" }}
                                className={`${styles.formWrapper}`}
                            >
                                <>
                                    {Accounts.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={payDetails}
                                                    dropdownValues={data}
                                                    setter={changePayFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }
                                    {PAY_FORM_FIELDS.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={payDetails}
                                                    setter={changePayFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }


                                </>
                                <div>
                                    <Button text={"Proceed"} onClickMethod={clickedSubmit} color='rgb(255, 100, 0)' />
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
            </div>)}

        </Page_transition>
    )
}

export default Pay