import React, { useState, useEffect } from "react";

//common component
import HOC from "../../Common/HOC";

//css file
import "./Login.css";

//login,register,resetpassword uses material ui text-feild
import { Button, Card, TextField, IconButton, OutlinedInput, InputAdornment, FormControl } from "@material-ui/core";

//icons to show & hide th password
import { Visibility, VisibilityOff } from "@material-ui/icons";

//for API Call
import { getBaseUrl } from "../../utils";
import axios from "axios";
import Loder from "../../Loder/Loder";
import { blankValidator, emailValidator, showNotificationMsz } from "../../utils/Validation"

const Login = (props) => {

    //---------------------local state ----------------------
    const [showPassword, setshowPassword] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const [isloading, setisloading] = useState(false)

    //error
    const [emailError, setemailError] = useState(false);
    const [emailmatchError, setemailmatchError] = useState(false);
    const [passwordError, setpasswordError] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    const LoginDetail = () => {
        try {

            if (!blankValidator(email)) {
                setemailError(true);
                return;
            }
            if (!emailValidator(email)) {
                setemailmatchError(true);
                return;
            }
            if (!blankValidator(password)) {
                setpasswordError(true);
                return;
            }
            setisloading(true)
            let url = getBaseUrl() + "login";
            let temp = {
                email,
                password
            };
            axios
                .post(url, temp)
                .then(
                    (res) => {
                        console.log("res", res.data.loginToken)

                        showNotificationMsz(res.data.msg, "success")
                        localStorage.setItem("userId", res.data.user._id)
                        localStorage.setItem("userName", res.data.user.name)
                        localStorage.setItem("token", res.data.loginToken)
                        if (res.data.token !== "") {
                            localStorage.setItem("isAuth", true)
                        }
                        localStorage.setItem("PageLink", res.data.user.profile_name);

                        props.history.push("/edit-profile")
                        setisloading(false)
                    },
                    (error) => {
                        showNotificationMsz(`${error}`, "danger")
                        console.log("data response error:::", error)
                        setisloading(false)
                    }
                )

        } catch (error) {
            showNotificationMsz(`${error}`, "danger")
            setisloading(false)
            console.log("data response error:::", error)
        }
    }

    return (
        <>
            <div className="home_background_color">
                <div className="Login_Main_div content_padding pb-5">
                    <Card className="pt-2 pb-2 Card_shadow form_width mt-2">
                        <p className="login_page_heading mt-3">Log In</p>
                        <div className="main_padding_top_bottom">
                            <div>
                                <TextField
                                    placeholder="Email Address"
                                    id="outlined-basic"
                                    variant="outlined"
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => {
                                        setemailError(false);
                                        setemailmatchError(false);
                                        setemail(e.target.value)
                                    }}

                                />
                                {emailError && (
                                    <span className="text-danger float-left">Enter the Email Address</span>
                                )}
                                {emailmatchError && (
                                    <span className="text-danger float-left">Enter the Correct Email Address</span>
                                )}

                            </div>

                            <div className="mt-2">
                                <FormControl className="MuiFormControl-fullWidth" variant="outlined">
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => {
                                            setpasswordError(false)
                                            setpassword(e.target.value)
                                        }}
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="off"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setshowPassword(!showPassword)}
                                                    onMouseDown={(event) => event.preventDefault()}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                {passwordError && (
                                    <span className="text-danger float-left">Enter the Password</span>
                                )}

                            </div>

                            <div className="text-right mt-1 mb-2">
                                {/* <span>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                        <label className="form-check-label login_content" for="defaultCheck1">
                                            Remember me
                                        </label>
                                    </div>
                                </span> */}
                                <span className="login_content hover_cursor" onClick={() => props.history.push("/email-verify")}>forgot Password?</span>
                            </div>

                            <div className="inputfiledformatting mt-3">
                                <Button
                                    variant="contained"
                                    className="Login_page_button"
                                    onClick={LoginDetail}
                                //onClick={() => props.history.push("/edit-profile")}
                                >
                                    Log in
                                </Button>
                            </div>
                            <div className="mt-1 mb-1 login_content">By creating an account you agree to our <span className="link_terms">Terms and conditions</span></div>
                            <div className="mt-1 mb-3 login_content">Don't have an account? <span className="link_terms" onClick={() => props.history.push("/register")}>Sign up</span></div>
                        </div>
                    </Card>

                </div>
            </div>

            <Loder loading={isloading} />

        </>
    );
};

export default HOC(Login);
