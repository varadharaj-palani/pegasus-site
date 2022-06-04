import React, { useEffect, useState } from "react";
import { apiGetAccount } from "../../auth/auth";
import styles from "../Account/Account.module.css";
import Heading from "../../components/Heading/Heading";
import { useParams } from 'react-router-dom'

function SavAccount() {
    let { acct } = useParams();

    const config = {
        headers: {
            authorization: localStorage.getItem("email"),
        }
    };
    const dataFormat = {
        'customer': {},
        'account': {},
        'branch': {}
    };
    const [data, setData] = useState(dataFormat);
    const [bit, setBit] = useState(false);

    const callapi = async () => {
        console.log(config)
        console.log(acct);
        const resp = await apiGetAccount(config, 'savings', acct);
        if (resp === undefined) {
            console.log('Error Try Again')
        }
        else {
            if (resp.status === 200) {
                console.log("Account Found");
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
            setBit(!bit)
        });
    }, [])
    return (
        <div className={`${styles.wrapper}`}>
            <Heading text="ACCOUNT" />
            {bit && (<div className={`${styles.maincontainer}`}>
                <div className={`${styles.profilecontainer}`}>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>Account Number</p>
                        <p className={`${styles.itemContent}`}>{data.account.ACCNO}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>Account Type</p>
                        <p className={`${styles.itemContent}`}>Savings</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>Branch</p>
                        <p className={`${styles.itemContent}`}>{data.branch.CITY}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>IFSC</p>
                        <p className={`${styles.itemContent}`}>{data.branch.IFSC}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>Balance</p>
                        <p className={`${styles.itemContent}`}>{data.account.BALANCE}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>Status</p>
                        <p className={`${styles.itemContent}`}>{data.account.STATUS}</p>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default SavAccount;