import { useState, createContext, useEffect, useRef } from "react";
import styles from "./AddMoney.module.css";
import FormField from "../../components/FormField/FormField";
import { DEPOSIT_DATA_FORM_FIELDS } from "../../data/depositdata";
import SimpleLoader from "../../components/SimpleLoader/SimpleLoader";
import Button from "../../components/Button/Button";
import { Modal } from "react-responsive-modal";
// import Popup from "../../components/Popup/Popup";

// import RegisterForm from "./../Register/RegisterForm";
import Page_transition from "../../components/Animation/Transition";
import Heading from "../../components/Heading/Heading.js";
import { apiAddMoney } from "../../auth/auth";
import { ReactNotifications, Store } from 'react-notifications-component'
import { useNavigate } from "react-router-dom";
import { toastNotification } from "../../components/Notification/Notification";
import 'react-notifications-component/dist/theme.css';

const axios = require('axios');



const AddMoney = () => {
    var navigate=useNavigate();
    const AddMoneyDetailsFormat = {
        email: "",
        accno:"",
        appby: localStorage.getItem('email'),
        amount: 0,
        pwd: ""
    }
    const clickedSubmit = async () => {

        // setloader(true);
        //   console.log({...AddMoneyDetails,captcha: reCaptchaRef.current.getValue()});

        const resp = await apiAddMoney({
            ...AddMoneyDetails,
        });

        console.log(resp.data)
        if (resp === undefined) {
            Store.addNotification({...toastNotification,message:"Error Undefined"})
        } else {
            if (resp.status === 200) {
                // console.log(auth);
                // console.log(resp.data.message);
                // showMessage(resp.data.message, resp.data.flag);
                Store.addNotification({...toastNotification,message:resp.data.message,type:resp.data.flag});
                navigate('/');
                // setloader(false);

            } else if (resp.status >= 400 && resp.status < 500) {
                console.log(resp.data.message);
                Store.addNotification({...toastNotification,message:resp.data.message,type:resp.data.flag})
                setloader(false);

            } else if (resp.status >= 500 && resp.status < 600) {
                console.log(resp.data.message);
                Store.addNotification({...toastNotification,message:resp.data.message,type:resp.data.flag})
                setloader(false);

            }
        }

    }
    const [loader, setloader] = useState(false);
    const [AddMoneyDetails, setAddMoneyDetails] = useState(AddMoneyDetailsFormat);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const changeAddMoneyFormState = (args) => {
        let prevState = AddMoneyDetails
        prevState[args.key] = args.value
        setAddMoneyDetails({ ...prevState })
    }
    console.log(AddMoneyDetails);

    return (
        <Page_transition>
            <div className={`${styles.login_wrapper_main}`}>
                <div className={`${styles.login_wrapper}`}>
                    <Heading text='DEPOSIT' />
                    <div className={`${styles.register_container}`}>
                        <div className={`${styles.registerFormContainer}`}>
                            {loader && <SimpleLoader message={"TRANSACTION UNDER PROCESSING"} />}
                            <div
                                style={{ display: loader ? "none" : "flex" }}
                                className={`${styles.formWrapper}`}
                            >
                                <>
                                    {DEPOSIT_DATA_FORM_FIELDS.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={AddMoneyDetails}
                                                    setter={changeAddMoneyFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }
                                    
                                    
                                </>
                                <div>
                                    <Button text={"Deposit"} onClickMethod={clickedSubmit} color='rgb(255, 100, 0)' />
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
export default AddMoney