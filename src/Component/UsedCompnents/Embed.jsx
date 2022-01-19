import React from 'react'
import { Grid } from '@material-ui/core';

import "./Monitize.css";

//used image
import embided from "../images/embided.png"
import { withRouter } from "react-router-dom"

function Embed(props) {
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
                        <div className="page_heading">Content Everywhere</div>
                        <div className="data_fomtting_image mt-5">
                            UNLK helps creators, influencers, entrepreneurs, and brand drive
                            their traffic to the things they're promoting, and connect their followers.
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

export default withRouter(Embed)
