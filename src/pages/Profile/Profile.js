import React, { useEffect, useState } from "react";
import { apiProfile } from "../../auth/auth";
import styles from "../Profile/Profile.module.css";
import Heading from "../../components/Heading/Heading";

function Profile() {
    const config = {
        headers: {
            authorization: localStorage.getItem("email"),
        }
    };
    const dataFormat = {
        'customer': {},
        'savingsacc': {},
       
    };
    const [data, setData] = useState(dataFormat);

    const callapi = async () => {
        console.log(config)
        const resp = await apiProfile(config);
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
                        <p className={`${styles.itemHeader}`}>Fname</p>
                        <p className={`${styles.itemContent}`}>{data.customer.FNAME}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>Lname</p>
                        <p className={`${styles.itemContent}`}>{data.customer.LNAME}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>phone number</p>
                        <p className={`${styles.itemContent}`}>{data.customer.PHONE}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>email</p>
                        <p className={`${styles.itemContent}`}>{data.customer.EMAIL}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>aadhaar no</p>
                        <p className={`${styles.itemContent}`}>{data.customer.AADHAR}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>pancard no</p>
                        <p className={`${styles.itemContent}`}>{data.customer.PAN}</p>
                    </div>
                    <div className={`${styles.itemRow}`}>
                        <p className={`${styles.itemHeader}`}>primary account no</p>
                        <p className={`${styles.itemContent}`}>{data.savingsacc.ACCNO}</p>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default Profile;