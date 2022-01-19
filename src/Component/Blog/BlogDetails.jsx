import React, { useEffect } from 'react'
import HOC from "../../Common/HOC";
import { Card } from "@material-ui/core";
import "./Blog.css";

import { getBaseUrl } from "../../utils";

function BlogDetails(props) {
    console.log("blog data", props)

    let blogtitle = props.location.state.data.blogtitle;
    let authorname = props.location.state.data.blogauthor;
    let blogcontent = props.location.state.data.blogcontent;
    let blogimage = props.location.state.data.blogimage;

    useEffect(() => {
        window.scrollTo(0, 0);

    }, [])

    return (
        <>
            <div className="home_background_color">
                <div className="content_padding pb-3">
                    <div className="text-right">
                        <span className="subcontent_social" onClick={() => props.history.goBack()}><i className="fa fa-arrow-left mr-2" />Back</span>
                    </div>
                    <Card className="p-2 Card_shadow  mt-2">
                        <div>
                            <span className="blog_title">{blogtitle}</span>
                            <span className="ml-3">by- {authorname}</span>
                        </div>
                        <div classNAme="mt-2">
                            <img src={getBaseUrl() + blogimage} alt="" className="blog_image" />
                        </div>
                        <div className="blog_description_data mt-3">
                            {blogcontent}
                        </div>

                    </Card>
                </div>
            </div>


        </>
    )
}

export default HOC(BlogDetails)
