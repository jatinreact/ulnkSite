import React, { useEffect, useState } from "react";
import HOC from "../../../Common/HOC.jsx";

//login,register,resetpassword uses material ui text-feild
import { Button, Card, TextField } from "@material-ui/core";

//for API Call
import { getBaseUrl } from "../../../utils";
import axios from "axios";
import Loder from "../../../Loder/Loder";
import { blankValidator, emailValidator, showNotificationMsz } from "../../../utils/Validation"

const VerifyEmail = (props) => {

    const [email, setemail] = useState("");
    const [isloading, setisloading] = useState(false)

    //error   
    const [emailError, setemailError] = useState(false)
    const [emailMatchError, setemailMatchError] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const EamilVerify = () => {
        try {
            if (!blankValidator(email)) {
                setemailError(true)
                return
            }
            if (!emailValidator(email)) {
                setemailMatchError(true)
                return
            }
            setisloading(true)
            let url = getBaseUrl() + "reset-password";

            const fd = new FormData();
            fd.append('email', email)

            axios
                .post(url, fd)
                .then(
                    (res) => {
                        props.history.push("/reset-password", { email: email })
                        showNotificationMsz(res.data.msg, "success")
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
                        <p className="login_page_heading mt-3">Verify Email</p>
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
                                        setemailMatchError(false);
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

                            <div className="inputfiledformatting mt-3">
                                <Button
                                    variant="contained"
                                    className="Login_page_button"
                                    onClick={EamilVerify}

                                >
                                    Verify
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

export default HOC(VerifyEmail);
