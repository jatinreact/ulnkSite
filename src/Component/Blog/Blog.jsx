import React, { useState, useEffect } from 'react';
import "./Blog.css";
import { Grid, Button, Card } from '@material-ui/core';
import HOC from "../../Common/HOC";

import blog1 from "../images/blog1.png";
import blog from "../images/blog.png";

//for API Call
import { getBaseUrl } from "../../utils";
import axios from "axios";
import Loder from "../../Loder/Loder";
import { showNotificationMsz } from "../../utils/Validation";

function Blog(props) {
    const [isloading, setisloading] = useState(false);
    const [socialPostArr, setsocialPostArr] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
        //to get data of user
        const getBlogsData = () => {
            try {
                setisloading(true)
                let url = getBaseUrl() + "api/v1/blog/GetallBlogs";
                axios
                    .get(url)
                    .then(
                        (res) => {
                            console.log("resp", res)
                            setsocialPostArr(res.data.data.data)
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
        getBlogsData();
    }, [])

    return (
        <>
            <div className="home_background_color pt-5">
                <div className="cards_data_padding">
                    <Grid className="Component_main_grid p-3 ">
                        <Grid item md={8} >
                            <div className="home_content">Learn About Ulnk</div>
                            <div>
                                <Grid className="Component_main_grid ">
                                    <Grid item md={5} className="p-3">
                                        <img src={blog1} alt="" className="blog_image" />
                                        <div className="text-center mt-1"> <span><Button className="blog_link p-2">Why Should you use ulnk?</Button></span></div>
                                    </Grid>
                                    <Grid item md={1} className="p-3"></Grid>
                                    <Grid item md={5} className="p-3">
                                        <img src={blog} alt="" className="blog_image" />
                                        <div className="text-center mt-1"> <span><Button className="blog_link p-2">Get Started with ulnk</Button></span></div>
                                    </Grid>
                                    <Grid item md={1} className="p-3"></Grid>
                                </Grid>
                            </div>


                            <div className="home_content mt-5">Social Media Strategy</div>
                            <div className="subcontent_social">Know more about social media</div>
                            <div className="cardheight_overflow1 mt-2">
                                {socialPostArr.map((item, index) => (
                                    <div>
                                        <Grid className="Component_main_grid" onClick={() => props.history.push("/blog-details", { data: item })}>
                                            <Grid item md={4} className="p-3">
                                                <img src={getBaseUrl() + `${item.blogimage}`} alt="" className="social_media_image" />
                                            </Grid>

                                            <Grid item md={8} className="p-3">
                                                <div className="socail_media_heading">{item.blogtitle}</div>
                                                <div className="blog_content">{item.blogcontent.length > 100 ? item.blogcontent.substring(100) + "..." : item.blogcontent}</div>
                                                <div className="subcontent_social">{item.blogauthor}</div>
                                                <div className="subcontent_social"><i className="fa fa-arrow-right" /></div>
                                            </Grid>

                                        </Grid>
                                        <div className="horizontal_line" />
                                    </div>
                                ))}
                            </div>

                            <div className="home_content mt-5">Update</div>
                            <div>
                                <Grid className="Component_main_grid ">
                                    <Grid item md={3} className="p-3">
                                        <img src={blog1} alt="" className="social_media_image" />
                                    </Grid>
                                    <Grid item md={3} className="p-3">
                                        <img src={blog} alt="" className="social_media_image" />
                                    </Grid>
                                    <Grid item md={6} className="p-3"></Grid>
                                </Grid>
                            </div>

                            <div className="home_content mt-5">User's Story</div>
                            <div>
                                <Grid className="Component_main_grid ">
                                    <Grid item md={3} className="p-3">
                                        <img src={blog1} alt="" className="social_media_image" />
                                    </Grid>
                                    <Grid item md={3} className="p-3">
                                        <img src={blog} alt="" className="social_media_image" />
                                    </Grid>
                                    <Grid item md={6} className="p-3"></Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item md={4} className="p-3">
                            <div>
                                <div className="mt-2 mb-3 text-right">
                                    <button className="Home_page_button"><i className="fa fa-send mr-2" /> Subscribe</button>
                                </div>
                                <Card className="Card_shadow">
                                    <div className="text-center"><span className="trending_text">TRENDING POSTS</span></div>
                                    <hr style={{ width: "30%" }} />
                                    <div className="cardheight_overflow">
                                        {socialPostArr.slice(0, 8).map((item, index) => (
                                            <div className="p-2 d-flex mt-2" onClick={() => props.history.push("/blog-details", { data: item })}>
                                                <span><img src={getBaseUrl() + `${item.blogimage}`} className="treanding_post" alt="" /></span>
                                                <span className="ml-3">
                                                    <div className="trending_heading">{item.blogtitle}</div>
                                                    {/* <div className="trending_heading">1 day ago</div> */}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>

            <Loder loading={isloading} />
        </>
    )
}

export default HOC(Blog)
