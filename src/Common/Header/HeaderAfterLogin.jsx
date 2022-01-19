import React, { useState } from 'react';

//material ui appbar
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

//css file
import "./Header.css";

//logo
import logo from "./logo.jpeg";
import { blankValidator } from '../../utils/Validation';

const HeaderAfterLogin = (props) => {

    let userName = localStorage.getItem("userName")

    /*local state */
    const [Sidebar, setSidebar] = useState(false);

    /*function to open a sidebar */
    const setLoadingnewside = () => {
        document.getElementById("mySidenav").style.width = "250px";
        setSidebar(true)
    };

    /*function to close a sidebar */
    const Closesidebar = () => {
        document.getElementById("mySidenav").style.width = "0px";
        setSidebar(false)
    }

    return (
        <div className="topheader">
            <AppBar position="fixed" className="MainHeader">
                <Toolbar className="header_padding">
                    <div>
                        <img src={logo} alt="" style={{ height: "75px" }} />
                    </div>
                    <div className="header_grow" />
                    <div className="header_links">
                        <span className="header_link_color">
                            <div class="dropdown show">
                                <span className="user_image p-2 mr-2" id="dropdownMenuLink" data-toggle="dropdown" >{userName !== null && userName.substring(0, 3)}</span>{userName}
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">

                                    <span class="dropdown-item" onClick={() => {
                                        localStorage.clear();
                                        props.history.push("/home")
                                    }}>Logout</span>
                                </div>
                            </div>
                            {/* <div className="dropdown">
                                <span><span className="user_image p-2 mr-2">PR</span>Profile Name</span>
                                <div className="dropdown-content">

                                    <div className="mt-3" >Profile Title</div>
                                    <hr />
                                    <div className="mt-1" onClick={() => props.history.push("/my-account")}>Account</div>
                                    <div className="mt-1" >Billing</div>
                                    <div className="mt-1" onClick={() => {
                                        localStorage.clear();
                                        window.location.href = "/home"
                                    }}>Logout</div>
                                </div>
                            </div> */}


                        </span>
                    </div>
                    <div className="mobile_Burger_Menu">
                        <span
                            className="logout_Pointer_cursor mr-3 text-right mt-2"
                            onClick={!Sidebar ? setLoadingnewside : Closesidebar}
                        >
                            <i class="fa fa-bars"></i>
                        </span>

                        <div id="mySidenav" className="sidenav">
                            <div className="cross_icon_style">
                                <i
                                    class="fa fa-times cursor"
                                    onClick={() => {
                                        document.getElementById("mySidenav").style.width =
                                            "0px";
                                        setSidebar(false);
                                    }}
                                ></i>
                            </div>
                            <div className='text-center ml-5'>
                                <div className=" user_imgae_in_sidebar">
                                    {userName !== null && userName}
                                </div>
                            </div>

                            <span className="logout_Pointer_cursor" onClick={() => {
                                localStorage.clear();
                                props.history.push("/home")
                            }}>
                                Logout
                            </span>

                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default HeaderAfterLogin
