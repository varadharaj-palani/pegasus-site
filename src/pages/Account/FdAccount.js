import React, { useEffect, useState } from "react";
import { apiGetAccount } from "../../auth/auth";
import styles from "../Account/Account.module.css";
import Heading from "../../components/Heading/Heading";
import { useParams } from 'react-router-dom'

function FdAccount() {
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
        const resp = await apiGetAccount(config,'fd',acct);
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
                        <p className={`${styles.itemContent}`}>Fixed Deposit</p>
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
                        <p className={`${styles.itemHeader}`}>Principle</p>
                        <p className={`${styles.itemContent}`}>{data.account.PRINCIPLE.toFixed(2)}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>Amount</p>
                        <p className={`${styles.itemContent}`}>{data.account.AMOUNT.toFixed(2)}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>Term</p>
                        <p className={`${styles.itemContent}`}>{data.account.TERM}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>Deposit Date</p>
                        <p className={`${styles.itemContent}`}>{data.account.DEPDATE.slice(0,10)}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>Maturity Date</p>
                        <p className={`${styles.itemContent}`}>{data.account.MATURDATE.slice(0,10)}</p>
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

export default FdAccount;