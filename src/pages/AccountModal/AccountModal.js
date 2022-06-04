import React, { useState, useEffect } from "react";
import { apiDisplayAccount } from "../../auth/auth";
import styles from "../AccountModal/AccountModal.module.css";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from 'react-router-dom'
import Heading from "../../components/Heading/Heading";
import { ReactNotifications, Store } from 'react-notifications-component'
import { toastNotification } from "../../components/Notification/Notification";
import 'react-notifications-component/dist/theme.css';


function Print(props) {
    console.log(props)
    var acct;
    if (props.atom.ACCTYPE == "Savings") {
        acct = props.atom.ACCNO;
        return (
            <div className={`${styles.itemRow}`}>
                <Link to={`../account/savings/${acct}`}>
                    <p className={`${styles.itemHeader}`}>{props.atom.ACCNO}</p>
                    <p className={`${styles.itemContent}`}>{props.atom.ACCTYPE}</p>
                </Link>
            </div>
        )
    }
    else {
        acct = props.atom.ACCNO;
        return (
            <div className={`${styles.itemRow}`}>
                <Link to={`../account/fd/${acct}`}>
                    <p className={`${styles.itemHeader}`}>{props.atom.ACCNO}</p>
                    <p className={`${styles.itemContent}`}>{props.atom.ACCTYPE}</p>
                </Link>
            </div>
        )
    }

}

function DispData(props) {
    console.log(props.data)
    var allAccounts = props.data.map((item, i) => {
        return <Print atom={item} />
    })
    return (
        allAccounts
    )
}

function AccountModal() {
    if (localStorage.getItem('email') == null) {
        // Store.addNotification({ ...toastNotification, message: "Error Undefined" });
        window.location = '/login';
    }
    var navigate = useNavigate();

    const config = {
        headers: {
            authorization: localStorage.getItem("email"),
        }
    };

    const dataFormat = {
        'accounts': []
    };

    const [data, setData] = useState(dataFormat);
    const [bit, setBit] = useState(false);

    const callapi = async () => {
        const resp = await apiDisplayAccount(config);
        if (resp === undefined) {
            console.log('Error Try Again')
        }
        else {
            if (resp.status === 200) {
                console.log("Account Found")
                console.log(resp.data.accounts);
                setData(resp.data.accounts);
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
        <>
            <div className={`${styles.wrapper}`}>
                <Heading text="ACCOUNTS" />
                {bit && (<div className={`${styles.maincontainer}`}>
                    <div className={`${styles.profilecontainer}`}>
                        <DispData data={data} />
                    </div>
                </div>)}
            </div>
        </>
    )
}

export default AccountModal;