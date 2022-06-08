import { PropaneSharp } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";
import FormField from "../FormField/FormField";
import { apiGetSavAccount, apiPayLoan } from "../../auth/auth";
import { MODAL_FORM_FIELDS, Accounts, Loanno } from "../../data/loanmodaldata";
import { ReactNotifications, Store } from 'react-notifications-component'
import { toastNotification } from "../Notification/Notification";
import 'react-notifications-component/dist/theme.css';
import { useNavigate } from "react-router-dom";

function LoanModal(props) {
    console.log(props);
    const [accData, setAccData] = useState([]);
    const loanDataFormat = {
        email: localStorage.getItem('email'),
        pwd: "",
        accno: "",
        amount: Math.round(props.datum.data.PRINCIPLE/props.datum.data.TERM),
        interest: Math.round(props.datum.data.PRINCIPLE * props.datum.data.INTERESTRATE / 100),
        loanno: props.datum.data.LOANID,
    }
    const [loanData, setloanData] = useState(loanDataFormat);
    const [bit, setBit] = useState(false)
    const changeLoanState = (args) => {
        let prevState = loanData
        prevState[args.key] = args.value
        setloanData({ ...prevState })
    }
    const config = {
        headers: {
            authorization: localStorage.getItem("email"),
        }
    };

    console.log(props.datum);
    if (!props.datum.modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const proceedTransaction = async () => {
        const resp = await apiPayLoan(loanData);
        if (resp === undefined) {
            console.log('Error Try Again')
        }
        else {
            if (resp.status === 200) {
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });
                props.datum.setModal(false)
            }
            else if (resp.status >= 400 && resp.status < 500) {
                console.log("Query Error")
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });

            }
            else if (resp.status >= 500 && resp.status < 600) {
                console.log("Internal Server Error")
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });

            }
        }
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
                setAccData(resp.data);
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
        <>
            <div className={`${styles.modal}`}>
                <div onClick={() => { props.datum.setModal(!props.datum.modal) }} className={`${styles.overlay}`}></div>
                <div className={`${styles.modalContent}`}>
                    <button className={`${styles.closeModal}`} onClick={() => { props.datum.setModal(false) }}>
                        x
                    </button>
                    <h2>Pay Loan</h2>
                    {Loanno.map((field, key) => {
                        return (
                            <>
                                <FormField
                                    key={key}
                                    type={field.type}
                                    name={field.name}
                                    heading={field.heading}
                                    value={loanData}
                                    setter={changeLoanState}
                                />
                            </>
                        );
                    })
                    }
                    {bit && Accounts.map((field, key) => {
                        return (
                            <>
                                <FormField
                                    key={key}
                                    type={field.type}
                                    name={field.name}
                                    heading={field.heading}
                                    value={loanData}
                                    dropdownValues={accData}
                                    setter={changeLoanState}
                                />
                            </>
                        );
                    })
                    }
                    {MODAL_FORM_FIELDS.map((field, key) => {
                        return (
                            <>
                                <FormField
                                    key={key}
                                    type={field.type}
                                    name={field.name}
                                    heading={field.heading}
                                    value={loanData}
                                    setter={changeLoanState}
                                />
                            </>
                        );
                    })
                    }

                    <Button text='Proceed' onClickMethod={proceedTransaction} />
                </div>
            </div>
        </>)

}
export default LoanModal;