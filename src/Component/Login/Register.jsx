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
import { blankValidator, emailValidator, showNotificationMsz } from "../../utils/Validation";

const Register = (props) => {

    //---------------------local state ----------------------
    const [showPassword, setshowPassword] = useState(false);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phonenumber, setphonenumber] = useState("");
    const [password, setpassword] = useState("");
    const [isloading, setisloading] = useState(false)
    const [profiletitle, setprofiletitle] = useState("")
    const [profileimage, setprofileimage] = useState(null)

    //error
    const [nameError, setnameError] = useState(false);
    const [emailError, setemailError] = useState(false);
    const [emailMatchError, setemailMatchError] = useState(false);
    const [phoneError, setphoneError] = useState(false);
    const [passwordError, setpasswordError] = useState(false);
    const [profiletitleError, setprofiletitleError] = useState(false);
    const [profileimageError, setprofileimageError] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    const RegisterUserData = () => {
        try {
            if (!blankValidator(name)) {
                setnameError(true)
                return;
            }
            if (!blankValidator(email)) {
                setemailError(true)
                return;
            }
            if (!emailValidator(email)) {
                setemailMatchError(true)
                return;
            }
            if (!blankValidator(profiletitle)) {
                setprofiletitleError(true)
                return;
            }
            if (!blankValidator(password)) {
                setpasswordError(true)
                return;
            }


            setisloading(true)
            let url = getBaseUrl() + "signup";

            const fd = new FormData();
            fd.append('name', name)
            fd.append('email', email)
            fd.append("password", password)
            fd.append("profile_name", profiletitle)
            axios
                .post(url, fd)
                .then(
                    (res) => {
                        console.log("register res", res.data);
                        showNotificationMsz(res.data.msg, "success")
                        localStorage.setItem("userId", res.data.user._id)
                        localStorage.setItem("userName", res.data.user.name)
                        localStorage.setItem("token", res.data.loginToken)
                        if (res.data.token !== "") {
                            localStorage.setItem("isAuth", true)
                        }
                        localStorage.setItem("PageLink", res.data.user.profile_name)
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
                        <p className="login_page_heading mt-3">Sign Up</p>
                        <div className="main_padding_top_bottom">
                            <div>
                                <TextField
                                    placeholder="Name"
                                    id="outlined-basic"
                                    variant="outlined"
                                    autoComplete="off"
                                    value={name}
                                    onChange={(e) => {
                                        setnameError(false)
                                        setname(e.target.value)
                                    }}
                                />
                                {nameError && (
                                    <span className="text-danger float-left">Enter the Name</span>
                                )}
                            </div>
                            <div className="mt-2">
                                <TextField
                                    placeholder="Email Address"
                                    id="outlined-basic"
                                    variant="outlined"
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => {
                                        setemailMatchError(false)
                                        setemailError(false)
                                        setemail(e.target.value)
                                    }}
                                />
                                {emailError && (
                                    <span className="text-danger float-left">Enter the Email Address</span>
                                )}
                                {emailMatchError && (
                                    <span className="text-danger float-left">Enter the Correct Email Address</span>
                                )}
                            </div>

                            {/* <div className="mt-2">
                                <TextField
                                    placeholder="Mobile Number"
                                    id="outlined-basic"
                                    variant="outlined"
                                    autoComplete="off"
                                    value={phonenumber}
                                    onChange={(e) => {
                                        setphoneError(false)
                                        setphonenumber(e.target.value)
                                    }}
                                />
                                {phoneError && (
                                    <span className="text-danger float-left">Enter the phone Number</span>
                                )}
                            </div> */}

                            {/* <div className="mt-2">
                                <input
                                    type="file"
                                    className="form-control form-control-lg"
                                    onChange={(e) => {
                                        setprofileimageError(false)
                                        setprofileimage(e.target.files[0])
                                    }}
                                />
                                {profileimageError && (
                                    <span className="text-danger float-left">Choose the Profile photo</span>
                                )}
                            </div> */}


                            <div className="mt-2">
                                <TextField
                                    placeholder="Profile Title"
                                    id="outlined-basic"
                                    variant="outlined"
                                    autoComplete="off"
                                    value={profiletitle}
                                    onChange={(e) => {
                                        setprofiletitleError(false)
                                        setprofiletitle(e.target.value)
                                    }}
                                />
                                {profiletitleError && (
                                    <span className="text-danger float-left">Enter the Profile Title</span>
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


                            {/* <div className="d-flex justify-content-between mt-1 mb-2">
                                <span>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                        <label className="form-check-label login_content" for="defaultCheck1">
                                            Remember me
                                        </label>
                                    </div>
                                </span>
                                <span className="login_content hover_cursor">forgot Password?</span>
                            </div> */}

                            <div className="inputfiledformatting mt-3">
                                <Button
                                    variant="contained"
                                    className="Login_page_button"
                                    onClick={RegisterUserData}
                                // onClick={() => props.history.push("/edit-profile")}
                                >
                                    Sign up
                                </Button>
                            </div>
                            <div className="mt-1 mb-1 login_content">By creating an account you agree to our <span className="link_terms">Terms and conditions</span></div>
                            <div className="mt-1 mb-3 login_content">Already have an account? <span className="link_terms" onClick={() => props.history.push("/login")}>Login</span></div>
                        </div>
                    </Card>

                </div>
            </div>

            <Loder loading={isloading} />
        </>
    );
};

export default HOC(Register);
