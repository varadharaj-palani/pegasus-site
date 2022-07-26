import { useState, createContext, useEffect, useRef } from "react";
import styles from "./Addloanacc.module.css";
import FormField from "../../components/FormField/FormField";
import { LOAN_ACCOUNT_FORM_FIELDS, LoanType } from "../../data/loanaccdata";
import SimpleLoader from "../../components/SimpleLoader/SimpleLoader";
import Button from "../../components/Button/Button";
import { Modal } from "react-responsive-modal";
// import Popup from "../../components/Popup/Popup";

// import RegisterForm from "./../Register/RegisterForm";
import Page_transition from "../../components/Animation/Transition";
import Heading from "../../components/Heading/Heading.js";
import { apiAddloanacc } from "../../auth/auth";
import { ReactNotifications, Store } from 'react-notifications-component'
import { useNavigate } from "react-router-dom";
import { toastNotification } from "../../components/Notification/Notification";
import 'react-notifications-component/dist/theme.css';

const axios = require('axios');



const Addloanacc = () => {
    var navigate=useNavigate();
    const AddloanaccDetailsFormat = {
        email: "",
        accno:"",
        sanctby: localStorage.getItem('email'),
        interestrate:"",
        principle: 0,
        term: "",
        loanType: "",
    }
    const clickedSubmit = async () => {

        // setloader(true);
        //   console.log({...AddloanaccDetails,captcha: reCaptchaRef.current.getValue()});

        const resp = await apiAddloanacc({
            ...AddloanaccDetails,
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
    const [AddloanaccDetails, setAddloanaccDetails] = useState(AddloanaccDetailsFormat);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const changeAddloanaccFormState = (args) => {
        let prevState = AddloanaccDetails
        prevState[args.key] = args.value
        console.log(prevState);
        setAddloanaccDetails({ ...prevState })
    }

    return (
        <Page_transition>
            <div className={`${styles.login_wrapper_main}`}>
                <div className={`${styles.login_wrapper}`}>
                    <Heading text='LOAN' />
                    <div className={`${styles.register_container}`}>
                        <div className={`${styles.registerFormContainer}`}>
                            {loader && <SimpleLoader message={"CREATING ACCOUNT"} />}
                            <div
                                style={{ display: loader ? "none" : "flex" }}
                                className={`${styles.formWrapper}`}
                            >
                                <>
                                    {LOAN_ACCOUNT_FORM_FIELDS.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={AddloanaccDetails}
                                                    setter={changeAddloanaccFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }
                                    {LoanType.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={AddloanaccDetails}
                                                    dropdownValues={field.dropdownValues}
                                                    setter={changeAddloanaccFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }
                                    
                                </>
                                <div>
                                    <Button text={"Create Loan"} onClickMethod={clickedSubmit} color='rgb(255, 100, 0)' />
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
export default Addloanacc