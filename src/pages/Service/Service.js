import { useState, createContext, useEffect, useRef } from "react";
import styles from "./Service.module.css";
import FormField from "../../components/FormField/FormField";
import { SERVICE_FORM_FIELDS, Services } from "../../data/servicedata";
import SimpleLoader from "../../components/SimpleLoader/SimpleLoader";
import Button from "../../components/Button/Button";
import { Modal } from "react-responsive-modal";
// import Popup from "../../components/Popup/Popup";

// import RegisterForm from "./../Register/RegisterForm";
import Page_transition from "../../components/Animation/Transition";
import Heading from "../../components/Heading/Heading.js";
import { apiService } from "../../auth/auth";
import { ReactNotifications, Store } from 'react-notifications-component'
import { useNavigate } from "react-router-dom";
import { toastNotification } from "../../components/Notification/Notification";
import 'react-notifications-component/dist/theme.css';

const axios = require('axios');
const Service = () => {
    var navigate=useNavigate();
    const ServiceDetailsFormat = {
        Name: "",
        Email:"",
        Service:"",
    }
    const clickedSubmit = async () => {

        // setloader(true);
        //   console.log({...ServiceDetails,captcha: reCaptchaRef.current.getValue()});

        const resp = await apiService({
            ...ServiceDetails,
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
    const [ServiceDetails, setServiceDetails] = useState(ServiceDetailsFormat);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const changeServiceFormState = (args) => {
        let prevState = ServiceDetails
        prevState[args.key] = args.value
        setServiceDetails({ ...prevState })
    }

    return (
        <Page_transition>
            <div className={`${styles.login_wrapper_main}`}>
                <div className={`${styles.login_wrapper}`}>
                    <Heading text='REQUESTSERVICES' />
                    <div className={`${styles.register_container}`}>
                        <div className={`${styles.registerFormContainer}`}>
                            {loader && <SimpleLoader message={"SENDING REQUEST"} />}
                            <div
                                style={{ display: loader ? "none" : "flex" }}
                                className={`${styles.formWrapper}`}
                            >
                                <>
                                    {SERVICE_FORM_FIELDS.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={ServiceDetails}
                                                    setter={changeServiceFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }
                                    {Services.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={ServiceDetails}
                                                    dropdownValues={field.dropdownValues}
                                                    setter={changeServiceFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }
                                    
                                </>
                                <div>
                                    <Button text={"Submit"} onClickMethod={clickedSubmit} color='rgb(255, 100, 0)' />
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
export default Service
