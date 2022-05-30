import { useState, createContext, useEffect, useRef } from "react";
import styles from "./Login.module.css";
import FormField from "../../components/FormField/FormField";
import { LOGIN_FORM_FIELDS } from "../../data/regdata";
import SimpleLoader from "../../components/SimpleLoader/SimpleLoader";

// import RegisterForm from "./../Register/RegisterForm";
import Page_transition from "../../components/Animation/Transition";
import Heading from "../../components/Heading/Heading.js";

const Login = () => {
  const loginDetailsFormat = {
    email: "",
    pwd: ""
}
  const [loader, setloader] = useState(false);
  const [loginDetails, setLoginDetails] = useState(loginDetailsFormat);
  const changeLoginFormState = (args) => {
    let prevState = loginDetails
    prevState[args.key] = args.value
    setLoginDetails({ ...prevState })
}
  return (
    <Page_transition>
      <div className={`${styles.login_wrapper_main}`}>
        <div className={`${styles.login_wrapper}`}>
          <Heading text='LOGIN' />
          <div className={`${styles.register_container}`}>
            <div className={`${styles.registerFormContainer}`}>
              {loader && <SimpleLoader message={"Logging in"} />}
                <div>
                  {LOGIN_FORM_FIELDS.map((field, key) => {
                          return (
                              <>
                                  <FormField
                                      key={key}
                                      type={field.type}
                                      name={field.name}
                                      heading={field.heading}
                                      value={loginDetails}
                                      setter={changeLoginFormState}
                                  />
                              </>
                          );
                      })
                    }
                </div>
            </div>
          </div>
        </div>
      </div>
     
      <h1>Login</h1>
    </Page_transition>
  )
}

export default Login