import React, { useState, useEffect } from 'react'
import HOC from "../../Common/HOC";
import { Card, Button } from "@material-ui/core";
import "./EditProfile.css";

//for API Call
import { getBaseUrl } from "../../utils";
import axios from "axios";
import Loder from "../../Loder/Loder";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";
import { connect } from 'react-redux';


function EditProfile(props) {
    let userName = localStorage.getItem("userName");
    const [isloading, setisloading] = useState(false)

    const [showimage, setshowimage] = useState("");
    const [profiletitle, setprofiletitle] = useState(localStorage.getItem("PageLink"))
    const [ChangePhotoName, setChangePhotoName] = useState("")
    const [ChangePhototosend, setChangePhototosend] = useState(null)
    const [isUpdated, setisUpdated] = useState(false)

    //error
    const [profiletitleError, setprofiletitleError] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
        //to get data of user
        const getProfileData = () => {
            try {
                setisloading(true)
                let url = getBaseUrl() + "user";
                axios
                    .get(url, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                    .then(
                        (res) => {
                            
                             setshowimage(res.data.profile_photo)
                             setprofiletitle(res.data.profile_name)
                            setisloading(false)
                        },
                        (error) => {
                            setisloading(false)
                            showNotificationMsz(error, "danger")
                        }
                    )
            } catch (error) {
                setisloading(false)
                showNotificationMsz(error, "danger")
            }
        }
        getProfileData();
    }, [isUpdated, userName])


    //Edit Profile
    const EditProfileDetails = () => {
        try {

            setisloading(true)
            let url = getBaseUrl() + `profileandphoto`;
            const fd = new FormData();

            fd.append("profile_name", profiletitle)

            if (ChangePhototosend === null) {
                fd.append('profile_photo', showimage)
            } else
                fd.append('profile_photo', ChangePhototosend)

            axios
                .put(url, fd, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(
                    (res) => {
                        showNotificationMsz(res.data.msg, "success")
                        setisUpdated(!isUpdated)
                        setChangePhotoName("")
                        props.history.push("/add-icons")
                        setChangePhototosend(null)
                        setisloading(false)
                    },
                    (error) => {
                        props.history.push("/add-icons")
                        // showNotificationMsz(`${error}`, "danger")
                    
                        setisloading(false)
                    }
                )

        } catch (error) {
            // showNotificationMsz(`${error}`, "danger")
            setisloading(false)
            console.log("data response error:::", error)
        }

    }

    return (
        <>
            <div className="home_background_color">
                <div className="content_padding pb-3">
                    <Card className="pt-2 pb-2 Card_shadow  mt-2">
                        <div className="mx-auto">
                            <div className="text-center">
                                <img
                                    src={getBaseUrl() + showimage}
                                    alt=""
                                    id="img"
                                    className="profile_Edit"
                                />
                            </div>
                            <div className="text-center">{ChangePhotoName}</div>
                            <div className="profile_input text-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="image-upload"
                                    id="input"
                                    onChange={(e) => {
                                        setChangePhototosend(e.target.files[0])
                                        setChangePhotoName(e.target.files[0].name)
                                    }}
                                />
                                <div className="">
                                    <label className="resumeview_image_upload" htmlFor="input">
                                        <i class="fa fa-camera mr-1"></i>

                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 data_padding_from_both">
                            <div className="profile_title_heading">Edit Your Profile title</div>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Profile title"
                                    value={profiletitle}
                                    onChange={(e) => {
                                        setprofiletitleError(false)
                                        setprofiletitle(e.target.value)
                                    }}
                                />
                                {profiletitleError && (
                                    <span className="text-danger">Enter the Profile Title</span>
                                )}
                            </div>
                            <div className="title_formating">* This can be changed at any time </div>

                            <div className="text-right mt-3 mb-3">
                                <Button
                                    variant="contained"
                                    className="button_formatting"
                                    onClick={EditProfileDetails}
                                // onClick={() => props.history.push("/add-icons")}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <Loder loading={isloading} />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        getPublicLinkRes:state.links.getPublicLinkRes,
   }
}

export default connect(mapStateToProps,null) (HOC(EditProfile))
