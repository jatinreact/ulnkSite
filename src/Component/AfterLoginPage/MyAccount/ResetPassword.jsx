import React, { useEffect, useState } from "react";
import HOC from "../../../Common/HOC.jsx";

//login,register,resetpassword uses material ui text-feild
import { Button, Card, TextField, IconButton, OutlinedInput, InputAdornment, FormControl } from "@material-ui/core";

//icons to show & hide th password
import { Visibility, VisibilityOff } from "@material-ui/icons";

//for API Call
import { getBaseUrl } from "../../../utils";
import axios from "axios";
import Loder from "../../../Loder/Loder";
import { showNotificationMsz } from "../../../utils/Validation"

const ResetPassword = (props) => {

    //email
    let email = props.location.state.email

    const [showPassword, setshowPassword] = useState(false);

    const [otp, setotp] = useState("");
    const [password, setpassword] = useState("")

    const [isloading, setisloading] = useState(false)


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const ResetPassword = () => {
        try {

            setisloading(true)
            let url = getBaseUrl() + "reset-password/otp";

            const fd = new FormData();
            fd.append('email', email)
            fd.append('otp', otp)
            fd.append('password', password)

            axios
                .post(url, fd)
                .then(
                    (res) => {
                        props.history.push("/login")
                        showNotificationMsz(res.data.msg, "success")
                        setisloading(false)
                    },
                    (error) => {
                        showNotificationMsz(`${error}`, "danger")
                    
                        setisloading(false)
                    }
                )

        } catch (error) {
            showNotificationMsz(`${error}`, "danger")
            setisloading(false)
            
        }
    }

    return (
        <>
            <div className="home_background_color">
                <div className="Login_Main_div content_padding pb-5">
                    <Card className="pt-2 pb-2 Card_shadow form_width mt-2">
                        <p className="login_page_heading mt-3">Verify Email</p>
                        <div className="main_padding_top_bottom">
                            <div>
                                <TextField
                                    placeholder="Email Address"
                                    id="outlined-basic"
                                    variant="outlined"
                                    autoComplete="off"
                                    value={email}
                                    disabled={true}
                                />
                            </div>

                            <div className="mt-2">
                                <TextField
                                    placeholder="Email Address"
                                    id="outlined-basic"
                                    variant="outlined"
                                    autoComplete="off"
                                    value={otp}
                                    onChange={(e) => {
                                        setotp(e.target.value)
                                    }}
                                />
                            </div>

                            <div className="mt-2">
                                <FormControl className="MuiFormControl-fullWidth" variant="outlined">
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => {
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
                            </div>

                            <div className="inputfiledformatting mt-3">
                                <Button
                                    variant="contained"
                                    className="Login_page_button"
                                    onClick={ResetPassword}

                                >
                                    Reset Password
                                </Button>
                            </div>

                            <div className="mt-1 mb-3 login_content"><span className="link_terms" onClick={() => props.history.goBack()}>Cancel</span></div>
                        </div>
                    </Card>

                </div>
            </div>

            <Loder loading={isloading} />
        </>
    );
};

export default HOC(ResetPassword);
