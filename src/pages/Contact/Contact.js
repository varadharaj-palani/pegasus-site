import React, { useState, useRef, useEffect } from "react";
import styles from "./Contact.module.css";
import Heading2 from "../../components/Heading/Heading2";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
// import { ReactNotifications, Store } from 'react-notifications-component'
import emailIcon from "@mui/icons-material/Email";
import messageIcon from "@mui/icons-material/Message";
import nameIcon from "@mui/icons-material/People";
import FormField from "../../components/FormField/FormField";
import { ReactNotifications, Store } from 'react-notifications-component'
import { validateContactForm } from "../../validators/contactValidator";
import ReCAPTCHA from "react-google-recaptcha";
import ContactButton from "../../components/Button/ContactButton";
import { apisendMail } from "../../auth/auth"
import Page_transition from "../../components/Animation/Transition";


function Contact() {

    const contactDetailsFormat = {
        name: "",
        email: "",
        message: "",
    };
    const changeContactFormState = (args) => {
        let prevState = formData;
        prevState[args.key] = args.value;
        setFormdata({ ...prevState });
    };


    const [loader, setloader] = useState(false);

    const [formData, setFormdata] = useState({
        contactDetailsFormat
    });




    const showMessage = (title, type = "danger") => {
        Store.addNotification({
            title: title,
            type: type,
            insert: "bottom",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 3000,
                onScreen: true
            }
        })
    }

    const clickedSubmit = async () => {
        // Form Validation
        let validation = validateContactForm(formData);

        if (validation.status === false) {
            showMessage(<p>{validation.message}</p>, "danger");
            return;
        }

        // reCaptcha Validation

        setloader(false);
        showMessage(<p>Your Query has been Submitted. We will get back to you soon!.</p>, "success");
        setFormdata(contactDetailsFormat);
    };

    return (
        <Page_transition>
            <section className={styles.contentbox}>
                <div className={styles.leftcont}>
                    <Heading2 text="How Can We Help You?" />

                    <div
                        style={{ display: loader ? "none" : "flex" }}
                        className={`${styles.formWrapper}`}
                    >
                        <h4>Name:</h4>
                        <FormField
                            className={styles.formField}
                            type={"text"}
                            fieldIcon={nameIcon}
                            placeholder="Enter Name"
                            name="name"
                            value={formData}
                            setter={changeContactFormState}
                        />
                        <h4>Email:</h4>
                        <FormField
                            className={styles.formField}
                            type={"text"}
                            fieldIcon={emailIcon}
                            placeholder="Enter Email"
                            name="email"
                            value={formData}
                            setter={changeContactFormState}
                        />
                        <h4>Message:</h4>
                        <FormField
                            className={styles.formField}
                            type={"textarea"}
                            fieldIcon={messageIcon}
                            placeholder="Your Message"
                            name="message"
                            value={formData}
                            setter={changeContactFormState}
                        />

                        <div style={{ display: "inline-block", margin: "auto" }}>
                            <ContactButton className={styles.button} text="SUBMIT" onClickMethod={clickedSubmit} />
                        </div>
                    </div>

                </div>
                <div className={styles.rightcont}>
                    <Heading2 text="Reach Us" />
                    <div
                        className={styles.reachus}
                        style={{ display: "flex", alignItems: "center", width: "100%" }}
                    >
                        <div className={styles.loc_link}>
                            <a
                                href="https://www.google.com/maps/place/4515+W+Mockingbird+Ln,+Dallas,+TX+75209,+USA/@32.8370136,-96.8319862,17z/data=!3m1!4b1!4m5!3m4!1s0x864e9e8357c19087:0x1d3133ff930fe72!8m2!3d32.8370136!4d-96.8297975"
                                target="_blank"
                                style={{ display: "block" }}
                            >
                                <RoomIcon className={styles.loc_icon} />
                            </a>
                        </div>
                        <div className={styles.location}>
                            PEGASUS BANK, 4515 W. Mockingbird Lane Dallas, TX 75209 United States
                        </div>
                    </div>

                    <div className={styles.contact}>
                        <Heading2 text="Contact Us" />
                        <center>
                            <div className={styles.ph_number}>
                                <PhoneIcon fontSize="1rem" />
                                <span> Head Quarters    -  +91 70000 77777 </span>
                            </div>
                            <div className={styles.ph_number}>
                                <PhoneIcon fontSize="1rem" />
                                <span> Administration Office    -  +91 70707 70707</span>
                            </div>
                        </center>
                    </div>
                </div>
            </section>
        </Page_transition>
    );
}

export default Contact;