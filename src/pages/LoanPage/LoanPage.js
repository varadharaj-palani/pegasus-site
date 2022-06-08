import React, { useState, useEffect } from "react";
import { apiGetLoans } from '../../auth/auth';
import Heading from "../../components/Heading/Heading.js";
import styles from "./LoanPage.module.css";
import { useParams } from 'react-router-dom';
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/LoanModal";
import { useNavigate } from "react-router-dom";


// function Loan(){
//     return (<>Loan</>)
// }

// export default Loan;

// var response={};
function LoanRecord(props) {
    console.log(props);
    const pay = async (datum) => {
        console.log(datum)
        props.setDatum(datum);
        props.setModal(!props.modal);
    }
    return (
        <>
            <tr>
                <td>{props.data.LOANID}</td>
                <td>{props.data.ACCNO}</td>
                <td>{props.data.LOANTYPE}</td>
                <td>{props.data.PRINCIPLE}</td>
                <td>{Math.round(props.data.PRINCIPLE*props.data.INTERESTRATE/100)}</td>
                <td>{props.data.INTERESTRATE}</td>
                <td>{props.data.TERM}</td>
                <Button text='Pay' onClickMethod={() => pay(props)} color={"#70AD47"} />

            </tr>
        </>
    )
}

function LoanList(props) {
    console.log(props);
    const hlist = props.data.map((item, i) => {
        return <LoanRecord datum={props.datum} setDatum={props.setDatum} modal={props.modal} setModal={props.setModal} data={item} />
    });
    return hlist;
    // return <>hii</>

}



function LoanPage() {
    var navigate = useNavigate();
    const dataFormat = {
        loanList: []
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

    const fetchLoan = async () => {

        const Loan = await apiGetLoans(config);
        if (Loan === undefined) {
            console.log("Error");
        }
        else {
            if (Loan.status >= 200 && Loan.status <= 299) {
                // console.log(profile.data);
                const res = Loan.data;
                if (res) {
                    console.log(res);
                    setData(res.loanList);
                    console.log(data);
                }
            }
            else if (Loan.status >= 400 && Loan.status < 500) {
                //about to fill
            }
            else if (Loan.status >= 500 && Loan.status < 600) {
                console.log("Server Side Error");
            }
        }
    }
    


    useEffect(() => {
        console.log("useEffect");
        fetchLoan().then(() => {
            console.log(data);
            setBit(!bit);
        });
    }, [])



    //   console.log(response+"askj")
    return (<>
        <Heading text="Loan" />
        <div className={`${styles.transactionTable}`}>
            <table className={`${styles.transactionTable}`}>
                <thead>
                    <tr>
                        <th>LOAN ID</th>
                        <th>ACCOUNT</th>
                        <th>LOAN TYPE</th>
                        <th>PRINCIPLE</th>
                        <th>INTEREST DUE</th>
                        <th>INTEREST RATE</th>
                        <th>TERM</th>
                        <th></th>
                    </tr>
                </thead>
                {bit && <LoanList modal={modal} setModal={setModal} data={data} datum={datum} setDatum={setDatum} />}


            </table>
            <div style={{ display: "inline-block", margin: "auto" }}>
                <Button text='APPLY NEW LOAN' onClickMethod={() => navigate('/applyLoan')} color={"#70AD47"} />
            </div>
        </div>
        {modal && <Modal datum={datum} />}
    </>)

}

export default LoanPage;