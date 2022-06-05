import React, { useState, useEffect } from "react";
import { apiGetHistory } from '../../auth/auth';
import Heading from "../../components/Heading/Heading.js";
import styles from "./History.module.css";
import { useParams } from 'react-router-dom'

// function History(){
//     return (<>history</>)
// }

// export default History;

// var response={};

function Historyrecord(props) {

    return (
        <>
            <tr>
                <td>{props.transid}</td>
                <td>{props.name}</td>
                <td>{props.aacno}</td>
                <td>{props.ttype}</td>
                <td>{props.amount}</td>
                <td>{props.date.slice(0,10)}</td>
            </tr>
        </>
    )
}

function HistoryList(props){
    console.log(props.data);
    const hlist = props.data.map((item, i) => {
        return <Historyrecord transid={item.TRANSID} aacno={item.AACNO} ttype={item.TTYPE} amount={item.AMOUNT} date={item.TRANSDATE} name={item.name} />
    });
    return hlist;
    // return <>hii</>

}



function History() {

    const [data, setData] = useState({});
    const [bit, setBit] = useState(false);
    let { acct } = useParams();

    const config = {
        headers: {
            authorization: localStorage.getItem("email"),
        }
    };

    const fetchHistory = async () => {

        const history = await apiGetHistory(config,acct);
        if (history === undefined) {
            console.log("Error");
        }
        else {
            if (history.status >= 200 && history.status <= 299) {
                // console.log(profile.data);
                const res = history.data;
                if (res) {
                    console.log(res);
                    setData(res.tlist);

                }
            }
            else if (history.status >= 400 && history.status < 500) {
                //about to fill
            }
            else if (history.status >= 500 && history.status < 600) {
                console.log("Server Side Error");
            }
        }
    }


    useEffect(() => {
        console.log("useEffect");
        fetchHistory().then(() => {
            console.log(data);
            setBit(!bit);
        });
    }, [])



    //   console.log(response+"askj")
    return (<>
        <Heading text="TRANSACTIONS" />
        <table className={`${styles.transactionTable}`}>
            <thead>
                <tr>
                    <th>TRANSACTION ID</th>
                    <th>PAYEE/BENEFICIARY</th>
                    <th>ACCOUNT NUMBER</th>
                    <th>TYPE</th>
                    <th>AMOUNT</th>
                    <th>DATE</th>
                </tr>
            </thead>
            {bit && <HistoryList data={data} />}
        </table>
    </>)

}

export default History;