import React, { useState, useEffect } from "react";
import { apiCallSavingsInterest, apiCallLoanInterest, apiCallFdInterest } from '../../auth/auth';
import Heading from "../../components/Heading/Heading.js";
import styles from "./EmployeeProcedure.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { ReactNotifications, Store } from 'react-notifications-component'
import { toastNotification } from "../../components/Notification/Notification";
import 'react-notifications-component/dist/theme.css';

function EmployeeProcedure() {

    const config = {
        headers: {
            authorization: localStorage.getItem("email"),
        }
    };

    const savInterest = async () => {
        const resp = await apiCallSavingsInterest(config);
        if (resp === undefined) {
            console.log("Error");
        Store.addNotification({ ...toastNotification, message: "Undefined Error"});

        }
        else {
            if (resp.status >= 200 && resp.status <= 299) {
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });

            }
            else if (resp.status >= 400 && resp.status < 500) {
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });

            }
            else if (resp.status >= 500 && resp.status < 600) {
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });

                console.log("Server Side Error");
            }
        }
    }

    const fdInterest = async () => {
        const resp = await apiCallFdInterest(config);
        if (resp === undefined) {
            console.log("Error");
        Store.addNotification({ ...toastNotification, message: "Undefined Error"});

        }
        else {
            if (resp.status >= 200 && resp.status <= 299) {
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });

            }
            else if (resp.status >= 400 && resp.status < 500) {
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });

            }
            else if (resp.status >= 500 && resp.status < 600) {
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });

                console.log("Server Side Error");
            }
        }
    }

    const loanInterest = async () => {
        const resp = await apiCallLoanInterest(config);
        if (resp === undefined) {
            console.log("Error");
        Store.addNotification({ ...toastNotification, message: "Undefined Error"});

        }
        else {
            if (resp.status >= 200 && resp.status <= 299) {
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });

            }
            else if (resp.status >= 400 && resp.status < 500) {
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });

            }
            else if (resp.status >= 500 && resp.status < 600) {
                Store.addNotification({ ...toastNotification, message: resp.data.message, type: resp.data.flag });

                console.log("Server Side Error");
            }
        }
    }


    return (
        <>
            <Heading text='PROCEDURES' />

            <div className={`${styles.transactionTable}`}>
                <div style={{ display: "inline-block", margin: "auto" }}>
                    <Button text='ADD INTEREST TO SAVINGS ACCOUNTS' onClickMethod={savInterest} color={"#70AD47"} />
                </div>
                <br></br>
                <br></br>
                <div style={{ display: "inline-block", margin: "auto" }}>
                    <Button text='ADD INTEREST TO LOANS' onClickMethod={loanInterest} color={"#70AD47"} />
                </div>
                <br></br>
                <br></br>
                <div style={{ display: "inline-block", margin: "auto" }}>
                    <Button text='ADD INTEREST TO FD ACCOUNTS' onClickMethod={fdInterest} color={"#70AD47"} />
                </div>
            </div>
        </>
    )
}

export default EmployeeProcedure;