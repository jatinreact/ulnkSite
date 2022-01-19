import React from 'react'
import { Grid } from '@material-ui/core';

import "./Monitize.css";

//used image
import monitize from "../images/monitize.png"
import { withRouter } from "react-router-dom"

function Monitize(props) {
    return (
        <>
            <div>
                <Grid className="Component_main_grid p-3 ">
                    <Grid item md={6} className="p-3">
                        <div className="page_heading">Monetize Social Power</div>
                        <div className="data_fomtting_image mt-5">
                            The ULNK hub is a platform where users can create and share digital content and
                            drives revenue with direct connection to sales pages and affiliate marketing partners.
                        </div>
                        <div className="mt-3 mb-3">
                            <button className="Home_page_button" onClick={() => props.history.push("/login")}>Try for Free <i className="fa fa-arrow-right" /></button>
                        </div>
                    </Grid>
                    <Grid item md={6} className="p-3">
                        <div className="text-center">
                            <img src={monitize} alt="" className="image_height" />
                        </div>
                    </Grid>
                </Grid>


            </div>
        </>
    )
}

export default withRouter(Monitize)
