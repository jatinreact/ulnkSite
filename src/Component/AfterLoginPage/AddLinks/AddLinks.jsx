import React, { useState } from 'react'
import HOC1 from "../../../Common/HOC1.jsx"
import { Grid, Button, Card, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import "./AddLinks.css"
import Expand from "react-expand-animated"
import user from "../../images/user.jpg"

//tab pannel
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AddlinkExamples from './AddlinkExamples.jsx';

import facebook from "../../images/icons/facebook.png";
import twitter from "../../images/icons/twitter.png"
import whatsapp from "../../images/icons/whatsapp.png"
import youtube from "../../images/icons/youtube.png"
import telegram from "../../images/icons/telegram.png"
import instagram from "../../images/icons/instagram.png"
import pintrest from "../../images/icons/pintrest.png"
import shopping from "../../images/icons/shopping.png"
import linkedin from "../../images/icons/linkedin.png"
import etsy from "../../images/icons/etsy.png"
import tiktok from "../../images/icons/tiktok.png"
import amazon from "../../images/icons/amazon.png"
import paypal from "../../images/icons/paypal.png"
import ebay from "../../images/icons/ebay.png"
import google from "../../images/icons/google.png"
import digg from "../../images/icons/digg.png"
import m from "../../images/icons/m.png"
import spotify from "../../images/icons/spotify.png"
import twitch from "../../images/icons/twitch.png"
import discord from "../../images/icons/discord.png"
import website from "../../images/icons/website.png"
import snapchat from "../../images/icons/snapchat.png"
import shopify from "../../images/icons/shopify.png"
import soundcloud from "../../images/icons/soundcloud.png"
import messanger from "../../images/icons/messanger.png"
import line from "../../images/icons/line.png"
import MobileLinkView from '../MobileLinkView/PublicMobileLinkView';

import {getBaseUrl} from "../../../utils/index.jsx";
import {showNotificationMsz} from "../../../utils/Validation";
import {connect} from "react-redux";
import * as actionCreator from "../../../store/actions/link"
import { set } from 'react-hook-form';


function AddLinks(props) {

    let pageLink = localStorage.getItem("PageLink")

    const [value, setValue] = React.useState(0);
    //local state
    const [addMangeopen, setaddMangeopen] = useState(false);
    const [EditDailogOpen, setEditDailogOpen] = useState(false)
    const [error, setError] = useState(false);
    const [fclass,setClass]=useState(null);

    const token=localStorage.getItem("token");




    const [title, settitle] = useState("")
    const [link, setlink] = useState("")
    const[load,setLoad] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const SocailIcons = [
        {
            path: facebook,
            class:"fa fa facebook"
        },
        {
            path: twitter,
            class:"fa fa-twitter"
        },
        {
            path: whatsapp,
            class:"fa fa-whatsapp"
        },
        {
            path: youtube,
            class:"fa fa-youtube-play"
        },
        {
            path: telegram,
            class:"fa fa-telegram"
        },
        {
            path: instagram,
            class:"fa fa-instagram"
        },
        {
            path: pintrest,
            class:"fa fa-pinterest"
        },
        // {
        //     path: shopping,
        //     class:"fas fa-shopping-cart"
        // },
        {
            path: linkedin,
            class:"fa fa-linkedin-square"
        },
        {
            path: etsy,
            class:"fa fa-etsy"
        },
        // {
        //     path: tiktok,
        //     class:"fab fa-tiktok"
        // },
        // {
        //     path: amazon,
        //     class:"fab fa-amazon"
        // },
        // {
        //     path: paypal,
        //     class:"fab fa-paypal"
        // },
        // {
        //     path: ebay,
        //     class:"fab fa-ebay"
        // },
        {
            path: google,
            class:"fa fa-google"
        },
        {
            path: digg,
            class:"fa fa-digg"
        },
        // {
        //     path: m,
        //     class:"fab fa-medium-m  "
        // },
        {
            path: spotify,
            class:"fa fa-spotify"
        },
        {
            path: twitch,
            class:"fa fa-twitch"
        },
        // {
        //     path: discord,
        //     class:"fab fa-discord"
        // },
        // {
        //     path: website,
        //     class:"fa fa-facebook-f"
        // },
        {
            path: snapchat,
            class:"fa fa-snapchat"
        },
        // {
        //     path: shopify,
        //     class:"fab fa-shopify"
        // },
        {
            path: soundcloud,
            class:"fa  fa-soundcloud"
        },
        // {
        //     path: messanger,
        //     class:"fab fa-facebook-messenger"
        // },
        // {
        //     path: line,
        //     class:"fab fa-line"
        // }

    ]


    //add new link function

    const addNewLink=async()=>{

        let data;
        
    
    if(title === "" || link === ""  ){
       
        setError(true);

    }else{

        data={
            title:title,
            url:link,
            type:"link",
            image:""
            
                    }

                    try
                    {
                        const response = await fetch(getBaseUrl()+"links",{
                            method:"POST",
                           headers:{
                               "Content-Type":"application/json",
                               "Authorization": "bearer "+token,
                           },
                           body:JSON.stringify(data)
                        })
                
                        
                        const res = await response.json();  
                
                        if(response.ok !== true){

                            throw Error("something went wrong!")
                        }else{
                            showNotificationMsz("User Created!","success");
                            setLoad(!load);
                            props.getPubliclink(token,pageLink);
                        }
    
                        setError(false);
                    }catch(err){
                        showNotificationMsz(`${err.message}`,"danger");
                    }
                    

                   
    }

        
        
    }

    
    

//onchangefunc
const[url,setUrl]=useState(null);
const iconUrlChangeFunc=(e)=>{
    setUrl(e.target.value);
}
const setIconFunc=()=>{
    let data={
        url:url,
        css:fclass
    }
    
    props.setIcon(token,data);

    setUrl("");
}

//checkboxfunc
const[checked,setChecked]=useState(false);

const checkBoxFunc=(e)=>{
    
 if(e.target.value === "option1"){
     setChecked(true);
     props.aboveLink(token,{icons_position:"above"},pageLink);
     showNotificationMsz("icons are above","success");
 }else{
    props.aboveLink(token,{icons_position:"below"},pageLink);
    showNotificationMsz("icons are below","success");
 }
}





    return (
        <>
            <div className="home_background_color">
                <div className="padding_from_top">
                    <Grid className="Component_main_grid p-3 ">
                        <Grid item md={7} className="p-3">
                            <div className="border_right_links">
                                <div className="tabs text-center userdaboard_color">
                                    <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
                                        <Tab label="Example" {...a11yProps(0)} className="button_login_decoration  tabs_text_formatting" />
                                        <Tab label="Link" {...a11yProps(1)} className="button_login_decoration  tabs_text_formatting" />
                                        <Tab label="Icons" {...a11yProps(2)} className="button_login_decoration  tabs_text_formatting" />
                                    </Tabs>
                                </div>

                                <div className="mt-1">
                                    {/* first tab data*/}
                                    <div className="tab_pannel_data">
                                        <TabPanel value={value} index={0}>
                                            <AddlinkExamples />
                                        </TabPanel>
                                    </div>

                                    {/* second tab data*/}
                                    <TabPanel value={value} index={1}>
                                        <div className="mt-2">
                                            <Button
                                                variant="contained"
                                                className="add_new_link_btn"
                                                onClick={() => setaddMangeopen(!addMangeopen)}

                                            >
                                                <i className="fa fa-plus mr-2" /> Add New Link
                                            </Button>
                                        </div>

                                        <div className="mt-3 ">
                                            <Expand open={addMangeopen}>
                                                <Card className=" mb-2 Card_shadow p-2">
                                                    <div className="mt-2">
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon1"> <i class="fa fa-file"></i></span>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Title Example"
                                                                value={title}
                                                                onChange={(e) => {
                                                                    settitle(e.target.value)
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text" id="basic-addon1"> <i class="fa fa-globe"></i></span>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="www.example.com"
                                                                value={link}
                                                                onChange={(e) => {
                                                                    setlink(e.target.value)
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
{ error && (<p className='text-danger create-link'>please fil the form</p>)}
                                                    <div className="mt-2 mb-2 text-right">
                                                        <Button
                                                            variant="contained"
                                                            className="button_formatting"
                                                            onClick={   addNewLink}
                                                        >
                                                            Add Link
                                                        </Button>
                                                    </div>
                                                </Card>
                                            </Expand>
                                        </div>
{
    props.links && (
        <>
        { 
        props.links.links.length === 0 && (
            <><div className="text-center home_para mt-3">You haven't  added any links yet - <br /> complete the input box above to add one</div></>
        )

        }
         
        </>
    )
}
                                       

                                        <div className="mt-3">
                                            <Card className="Card_shadow documentation_back_color p-3">
                                                <div className="d-flex justify-content-between">
                                                    <span>
                                                        <div className="mt-2">DOCUMENTATION</div>
                                                        <div className="mt-2">Get started with Ulnk</div>
                                                    </span>
                                                    <span>
                                                        <div className="mt-2">
                                                            <i class="fa fa-chevron-right"></i>
                                                        </div>
                                                    </span>
                                                </div>
                                            </Card>
                                        </div>

                                    </TabPanel>

                                    {/* third tab data*/}
                                    <TabPanel value={value} index={2}>
                                        <div className="mt-3">
                                            <Card className=" mb-2 Card_shadow p-2">
                                                <div className="text-center Style_heading">Position</div>
                                                <div className="text-center Style_para mt-2">Set the icon block above links and below links.</div>
                                                <div className="data_padding_from_both mt-2">
                                                    <div className="d-flex justify-content-between">
                                                        <span>
                                                            <div className="text-center"><i className="fa fa-arrow-up" /></div>
                                                            <div>
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" onChange={checkBoxFunc}/>
                                                                    <label class="form-check-label" for="exampleRadios2">
                                                                        Above Links
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </span>
                                                        <span>
                                                            <div className="text-center"><i className="fa fa-arrow-down" /></div>
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1"  onChange={(e)=>{checkBoxFunc(e)}}/>
                                                                <label class="form-check-label" for="exampleRadios1">
                                                                    Below Links
                                                                </label>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>

                                        <div class="alert alert-warning text-center" role="alert">
                                            Missing an icon?<span className="suggest_Font"> Suggest it!</span>
                                        </div>

                                        <div className="mt-3">
                                            <Card className=" mb-2 Card_shadow p-2">
                                                <Grid className="d-flex flex-wrap">
                                                    {SocailIcons.map((item, index) => (
                                                        <Grid item md={2} className="p-3 text-center">
                                                            <img src={item.path} alt="" className="social_icon_width" onClick={() => {setEditDailogOpen(!EditDailogOpen);
                                                                setClass(item.class)}} />
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Card>
                                        </div>

                                    </TabPanel>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={5} className="p-3">
                            <MobileLinkView  load={load} checked={checked} hideEdit={"yes"}/>
                        </Grid>
                    </Grid>
                </div >
            </div >

            <Dialog
                open={EditDailogOpen}
                aria-labelledby="form-dialog-title"
                maxWidth="sm"
                fullWidth="fullWidth"
            >
                <DialogTitle>
                    Add this Link
                    <span
                        className="float-right icon_color"

                    >
                        <i class="fa fa-times hover_cursor" onClick={() => setEditDailogOpen(!EditDailogOpen)}></i>{" "}
                    </span>
                </DialogTitle>
                <DialogContent>

                    <div className=" mt-1">
                        <input
                            type="text"
                            className="form-control "
                            placeholder="@link"
                            autoComplete="off"
                            value={url}
                             onChange={(e)=>iconUrlChangeFunc(e)}
                        />

                    </div>

                </DialogContent>
                <DialogActions>
                    <Button
                        className="button_formatting"
                        onClick={() => setEditDailogOpen(!EditDailogOpen)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="button_formatting"
onClick={setIconFunc}
                    >
                        
                        Save{" "}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const mapStateToProps=(state)=>{
    return{
        links:state.links.links,
        
        abovelinkRes:state.links.abovelinkRes
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        setIcon:(token,data)=>dispatch(actionCreator.setIcon(token,data)),
        aboveLink:(toke,data,u_name)=>dispatch(actionCreator.aboveLink(toke,data,u_name)),
        getPubliclink: (token,u_name) => dispatch(actionCreator.getPublicLinks(token,u_name)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (HOC1(AddLinks)); 
