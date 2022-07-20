import { useState, createContext, useEffect, useRef } from "react";
import styles from "./PayBill.module.css";
import FormField from "../../components/FormField/FormField";
import { BILL_FORM_FIELDS, Accounts, Category } from "../../data/billdata";
import SimpleLoader from "../../components/SimpleLoader/SimpleLoader";
import Button from "../../components/Button/Button";
import { Modal } from "react-responsive-modal";
// import Popup from "../../components/Popup/Popup";

// import RegisterForm from "./../Register/RegisterForm";
import Page_transition from "../../components/Animation/Transition";
import Heading from "../../components/Heading/Heading.js";
import { apiPayNewBill, apiGetSavAccount, apiAddBiller, apiGetBillers } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import { ReactNotifications, Store } from 'react-notifications-component'
import { toastNotification } from "../../components/Notification/Notification";
import 'react-notifications-component/dist/theme.css';
const axios = require('axios');

const PayBill = () => {
    var navigate = useNavigate();

    const config = {
        headers: {
            authorization: localStorage.getItem("email"),
        }
    };

    const billDetailsFormat = {
        billamount: 0,
        category: "",
        location: "",
        billername: "",
        billdate: "",
        pwd: "",
        email: localStorage.getItem("email")
    }
    const proceedPayBill = async () => {
        const resp = await apiPayNewBill({
            ...billDetails,
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

        const res = await apiGetBillers(billDetails);
        if (res === undefined) {
            console.log('Error Try Again')
        }
        else {
            const billers = res.data;
            console.log(billers)
            if (res.status === 200) {
                if (!billers.includes(billDetails.billername)) {
                    const rsp = await apiAddBiller(billDetails);
                    if (rsp === undefined) {
                        console.log('Error Try Again')
                    }
                    else {
                        if (rsp.status === 200) {
                            await proceedPayBill();
                            console.log('complted apiaddbillers')
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
                    console.log('else');
                    await proceedPayBill();
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
    const [billDetails, setBillDetails] = useState(billDetailsFormat);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bit, setBit] = useState(false);
    const [data, setData] = useState([]);
    const changeBillFormState = (args) => {
        let prevState = billDetails
        prevState[args.key] = args.value
        console.log(prevState)
        setBillDetails({ ...prevState })
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
                    <Heading text='BILL' />
                    <div className={`${styles.register_container}`}>
                        <div className={`${styles.registerFormContainer}`}>
                            {loader && <SimpleLoader message={"Logging in"} />}
                            <div
                                style={{ display: loader ? "none" : "flex" }}
                                className={`${styles.formWrapper}`}
                            >
                                <>
                                    {Category.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={billDetails}
                                                    dropdownValues={field.dropdownValues}
                                                    setter={changeBillFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }
                                    {Accounts.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={billDetails}
                                                    dropdownValues={data}
                                                    setter={changeBillFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }
                                    {BILL_FORM_FIELDS.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={billDetails}
                                                    setter={changeBillFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }


                                </>
                                <div>
                                    <Button text={"Pay Bill"} onClickMethod={clickedSubmit} color='rgb(255, 100, 0)' />
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

export default PayBill