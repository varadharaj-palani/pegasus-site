import { useState, createContext, useEffect, useRef } from "react";
import styles from "./AddEmployee.module.css";
import FormField from "../../components/FormField/FormField";
import { NEW_EMPLOYEE_FORM_FIELDS, NEW_EMPLOYEE_FORM_FIELDS2, BRANCH_IFSC, Designation } from "../../data/employeedata";
import SimpleLoader from "../../components/SimpleLoader/SimpleLoader";
import Button from "../../components/Button/Button";
import { Modal } from "react-responsive-modal";
// import Popup from "../../components/Popup/Popup";

// import RegisterForm from "./../Register/RegisterForm";
import Page_transition from "../../components/Animation/Transition";
import Heading from "../../components/Heading/Heading.js";
import { apiAddEmployee, apiGetBranchIfsc } from "../../auth/auth";
import { ReactNotifications, Store } from 'react-notifications-component'
import { useNavigate } from "react-router-dom";
import { toastNotification } from "../../components/Notification/Notification";
import 'react-notifications-component/dist/theme.css';

const axios = require('axios');



const AddEmployee = () => {
    var navigate = useNavigate();
    const empDetailsFormat = {
        
        name: "",
        dob: "",
        gender: "",
        phone: "",
        email: "",
        line1: "",
        line2: "",
        city: "",
        pincode: "",
        password: "",
        salary: 0,
        ifsc: "",
        desig: ""
    }
    const clickedSubmit = async () => {

        // setloader(true);
        //   console.log({...empDetails,captcha: reCaptchaRef.current.getValue()});

        const resp = await apiAddEmployee({
            ...empDetails, godmail: localStorage.getItem('email')
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
    const config = {
        headers: {
            authorization: localStorage.getItem("email"),
        }
    };
    const [loader, setloader] = useState(false);
    const [bit, setBit] = useState(false);
    const [empDetails, setempDetails] = useState(empDetailsFormat);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [branchIfsc, setBranchIfsc] = useState({
        ifsclist: []
    })
    const changeempFormState = (args) => {
        let prevState = empDetails
        prevState[args.key] = args.value
        setempDetails({ ...prevState })
    }
    const callapi = async () => {
        const resp = await apiGetBranchIfsc(config);
        if (resp === undefined) {
            console.log('Error Try Again')
        }
        else {
            if (resp.status === 200) {
                console.log("Account Found")
                console.log(resp.data);
                setBranchIfsc(resp.data.ifsclist);
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
            setBit(!bit);
        });
    }, [])

    return (
        <Page_transition>
            <div className={`${styles.emp_wrapper_main}`}>
                <div className={`${styles.emp_wrapper}`}>
                    <Heading text='RECRUIT' />
                    <div className={`${styles.register_container}`}>
                        <div className={`${styles.registerFormContainer}`}>
                            {loader && <SimpleLoader message={"Logging in"} />}
                            <div
                                style={{ display: loader ? "none" : "flex" }}
                                className={`${styles.formWrapper}`}
                            >
                                <>
                                    {NEW_EMPLOYEE_FORM_FIELDS.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={empDetails}
                                                    setter={changeempFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }
                                    {Designation.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={empDetails}
                                                    dropdownValues={field.dropdownValues}
                                                    setter={changeempFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }
                                    {bit && BRANCH_IFSC.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={empDetails}
                                                    dropdownValues={branchIfsc}
                                                    setter={changeempFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }
                                    {NEW_EMPLOYEE_FORM_FIELDS2.map((field, key) => {
                                        return (
                                            <>
                                                <FormField
                                                    key={key}
                                                    type={field.type}
                                                    name={field.name}
                                                    heading={field.heading}
                                                    value={empDetails}
                                                    setter={changeempFormState}
                                                />
                                            </>
                                        );
                                    })
                                    }
                                </>
                                <div>
                                    <Button text={"Add Employee"} onClickMethod={clickedSubmit} color='rgb(255, 100, 0)' />
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

export default AddEmployee;