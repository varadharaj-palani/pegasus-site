import React, { useEffect, useState } from "react";
import { apiProfile } from "../../auth/auth";
import styles from "../Profile/Profile.module.css";
import Heading from "../../components/Heading/Heading";
import { ReactNotifications, Store } from 'react-notifications-component'
import { toastNotification } from "../../components/Notification/Notification";
import 'react-notifications-component/dist/theme.css';

function Profile() {
    const config = {
        headers: {
            authorization: localStorage.getItem("email")
        }
    };
    const dataFormat = {
        'customer': {},
        'account': {},

    };
    const [data, setData] = useState(dataFormat);

    const callapi = async () => {
        console.log(config)
        const resp = await apiProfile(config);
        if (resp === undefined) {
            console.log('Error Try Again')
            Store.addNotification({ ...toastNotification, message: "Undefined Error" });
        }
        else {
            if (resp.status === 200) {
                console.log("Account Found");
                console.log(resp.data);
                setData(resp.data);
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

    useEffect(() => {
        console.log("useEffect");
        callapi().then(() => {
            console.log(data);
        });
    }, [])

    return (
        <div className={`${styles.wrapper}`}>
            <Heading text="PROFILE" />
            {(<div className={`${styles.maincontainer}`}>
                <div className={`${styles.profilecontainer}`}>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>Customer ID</p>
                        <p className={`${styles.itemContent}`}>{data.customer.ID}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>First name</p>
                        <p className={`${styles.itemContent}`}>{data.customer.FNAME}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>Last name</p>
                        <p className={`${styles.itemContent}`}>{data.customer.LNAME}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>Phone</p>
                        <p className={`${styles.itemContent}`}>{data.customer.PHONE}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>Email</p>
                        <p className={`${styles.itemContent}`}>{data.customer.EMAIL}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>Aadhaar</p>
                        <p className={`${styles.itemContent}`}>{data.customer.AADHAR}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>Pan Id</p>
                        <p className={`${styles.itemContent}`}>{data.customer.PAN}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>Primary Account</p>
                        <p className={`${styles.itemContent}`}>{data.account.ACCNO}</p>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default Profile;