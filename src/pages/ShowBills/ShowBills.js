import React, { useState, useEffect } from "react";
import { apiGetBills } from '../../auth/auth';
import Heading from "../../components/Heading/Heading.js";
import styles from "./ShowBills.module.css";
import { useParams } from 'react-router-dom';
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";


// function bills(){
//     return (<>bills</>)
// }

// export default bills;

// var response={};
function BillsRecord(props) {
    console.log(props);
    const pay = async (datum) => {
        props.setModal(!props.modal);
        props.setDatum(datum);
        console.log(datum, props);
    }
    return (
        <>
            <tr>
                <td>{props.billno}</td>
                <td>{props.catagory}</td>
                <td>{props.biller}</td>
                <td>{props.date.slice(0, 10)}</td>
                <td>{props.amount}</td>
                <Button text='Pay' onClickMethod={() => pay(props)} color={"#70AD47"} />

            </tr>
        </>
    )
}

function BillsList(props) {
    console.log(props);
    const hlist = props.data.map((item, i) => {
        return <BillsRecord datum={props.datum} setDatum={props.setDatum} modal={props.modal} setModal={props.setModal} billno={item.ID} catagory={item.CATEGORY} billerid={item.BILLERID} biller={item.BILLERNAME} amount={item.BILLAMOUNT} date={item.BILLDATE} />
    });
    return hlist;
    // return <>hii</>

}



function ShowBills() {
    var navigate = useNavigate();
    const dataFormat = {
        billList: []
    }

    const [data, setData] = useState(dataFormat);
    const [bit, setBit] = useState(false);
    const [modal, setModal] = useState(false);
    const [datum, setDatum] = useState({});

    const config = {
        headers: {
            authorization: localStorage.getItem("email"),
        }
    };

    const fetchBills = async () => {

        const bills = await apiGetBills(config);
        if (bills === undefined) {
            console.log("Error");
        }
        else {
            if (bills.status >= 200 && bills.status <= 299) {
                // console.log(profile.data);
                const res = bills.data;
                if (res) {
                    console.log(res);
                    setData(res.billList);
                    console.log(data);
                }
            }
            else if (bills.status >= 400 && bills.status < 500) {
                //about to fill
            }
            else if (bills.status >= 500 && bills.status < 600) {
                console.log("Server Side Error");
            }
        }
    }
    const payNew = async () => {
        return;
    }


    useEffect(() => {
        console.log("useEffect");
        fetchBills().then(() => {
            console.log(data);
            setBit(!bit);
        });
    }, [])



    //   console.log(response+"askj")
    return (<>
        <Heading text="BILLS" />
        <div className={`${styles.transactionTable}`}>
            <table className={`${styles.transactionTable}`}>
                <thead>
                    <tr>
                        <th>BILL NO</th>
                        <th>CATAGORY</th>
                        <th>BILLER</th>
                        <th>DATE</th>
                        <th>AMOUNT</th>
                        <th></th>
                    </tr>
                </thead>
                {bit && <BillsList modal={modal} setModal={setModal} data={data} datum={datum} setDatum={setDatum} />}


            </table>
            <div style={{ display: "inline-block", margin: "auto" }}>
                <Button text='PAY NEW BILL' onClickMethod={() => navigate('/payNewBill')} color={"#70AD47"} />
            </div>
        </div>
        {modal && <Modal datum={datum} />}
    </>)

}

export default ShowBills;