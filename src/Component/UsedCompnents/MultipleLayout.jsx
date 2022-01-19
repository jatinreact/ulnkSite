import React from 'react'
import { Grid } from '@material-ui/core';

import "./Monitize.css";

//used image
import embided from "../images/embided.png"

import { withRouter } from "react-router-dom"

function MultipleLayout(props) {
    return (
        <>
            <div>
                <Grid className="Component_main_grid p-3 ">
                    <Grid item md={6} className="p-3">
                        <div className="text-center">
                            <img src={embided} alt="" className="image_height" />
                        </div>
                    </Grid>
                    <Grid item md={6} className="p-3">
                        <div className="page_heading">Multiple layouts</div>
                        <div className="data_fomtting_image mt-5">Add multiple link options such as social media accounts, music, videos-
                            ULNK hub along with custom layouts to showcase your brand.
                        </div>
                        <div className=" mt-3 mb-3">
                            <button className="Home_page_button" onClick={() => props.history.push("/login")}>Try for Free <i className="fa fa-arrow-right" /></button>
                        </div>
                    </Grid>

                </Grid>


            </div>
        </>
    )
}

export default withRouter(MultipleLayout)
