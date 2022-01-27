import React,{useState} from 'react'
import HOC1 from "../../../Common/HOC1.jsx"
import { Grid, Button, Card } from '@material-ui/core';
import "./LinkStyles.css"
import user from "../../images/user.jpg"

//tab pannel
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SiteDetails from './SiteDetails.jsx';
import MobileLinkView from '../MobileLinkView/PublicMobileLinkView.jsx';
import {connect} from "react-redux";
import * as actionCreator from "../../../store/actions/layout";




function AddLinks(props) {
    const [value, setValue] = React.useState(0);
    const imageArr = [
        { data: "Title" },
        { data: "Title" },
        { data: "Title" },
        { data: "Title" },
        { data: "Title" },
    ]


    const CarddataArr = [
        { data: "Background Image" },
        { data: "Page Color" },
        { data: "Main font" },
        { data: "Font for title" },
        { data: "Font Case" }
    ]
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //layout
    const[image,setImage]=useState("");
    const layoutImageFunc=(e)=>{
        setImage(e.target.files[0]);
    }

    //token
    const token=localStorage.getItem("token");

    const[layout,setLayout]=useState({
        page_color:"",
        main_font:"",
        title_font:"",
        font_case:""
    })
    const layoutChangeFunc=(e)=>{
           let name=e.target.name;
           let value=e.target.value;

           setLayout({...layout,[name]:value});
    }
    console.log(layout,image);
    //layout design 
    const[design,setDesign]=useState("");
    const layoutDesignFunc=(e)=>{
        setDesign(e.target.value);
    }
    //set layout 
    console.log(design);
    const setLayoutFunc=()=>{
        let  lay="default";
        if(design === "option1"){
            lay="grid"
        }
        if(design === "option2"){
            lay="list"
        }
        let data;
        if(layout.page_color){
        
             data={
                page_color:layout.page_color,
                main_font:layout.main_font,
                title_font:layout.title_font,
                font_case:layout.font_case,
                layout:lay,
            }
        }

        if(image){
            data={
                background_image:image,
                main_font:layout.main_font,
                title_font:layout.title_font,
                font_case:layout.font_case,
                layout:lay,
            }
        }
        
        data={
            ...data,
            main_font:layout.main_font,
            title_font:layout.title_font,
            font_case:layout.font_case,
            layout:lay,
        }
        props.setLayout(token,data);
        console.log(data);
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
                                        <Tab label="Site details" {...a11yProps(0)} className="button_login_decoration  tabs_text_formatting" />
                                        <Tab label="Layouts" {...a11yProps(1)} className="button_login_decoration  tabs_text_formatting" />

                                    </Tabs>
                                </div>

                                <div className="mt-1">
                                    {/* first tab data*/}
                                    <div className="tab_pannel_data">
                                        <TabPanel value={value} index={0}>
                                            <SiteDetails />
                                        </TabPanel>
                                    </div>

                                    {/* second tab data*/}
                                    <TabPanel value={value} index={1}>
                                        <div className="mt-3">
                                            <Card className=" mb-2 Card_shadow p-2">
                                                <div className="text-center Style_heading">Layout</div>
                                                <div className="text-center Style_para mt-2">List with optional squared (1:1) images</div>
                                                <div className="data_padding_from_both mt-2">
                                                    <Card className="Card_shadow p-2">
                                                        <Grid className="Component_main_grid">

                                                            <Grid item md={6} className="p-3">
                                                                <Card className=" mb-2 Card_shadow p-2">
                                                                    {imageArr.map((item, index) => (
                                                                        <div className="p-2 mt-2 styles_image">
                                                                            <span><i className="fa fa-image" /></span>
                                                                            <span className="ml-3">{item.data}</span>
                                                                        </div>
                                                                    ))}
                                                                </Card>
                                                                <div className="text-center">
                                                                    <div class="form-check form-check-inline">
                                                                        <input class="form-check-input" type="radio" id="inlineCheckbox1" value="option1" name="exampleRadios" onChange={layoutDesignFunc} />
                                                                        <label class="form-check-label" for="inlineCheckbox1">grid view</label>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item md={6} className="p-3">
                                                                <Card className=" mb-2 Card_shadow p-2">
                                                                    <div className="p-2 mt-2 styles_image text-center">
                                                                        <div><i className="fa fa-image" /></div>
                                                                        <div>Title</div>
                                                                    </div>

                                                                    <div className="p-2 mt-2 styles_image text-center">
                                                                        <div><i className="fa fa-image" /></div>
                                                                        <div>Title</div>
                                                                    </div>

                                                                    <div className="p-2 mt-2 styles_image text-center">
                                                                        <div><i className="fa fa-image" /></div>
                                                                        <div>Title</div>
                                                                    </div>
                                                                </Card>
                                                                <div className="text-center mt-4">
                                                                    <div class="form-check form-check-inline">
                                                                        <input class="form-check-input" type="radio" id="inlineCheckbox1" value="option2" name="exampleRadios" onChange={layoutDesignFunc} />
                                                                        <label class="form-check-label" for="inlineCheckbox1">list view</label>
                                                                    </div>
                                                                </div>

                                                            </Grid>
                                                            
                                                            <Button
                                                                variant="contained"
                                                                className="starttrailbtn m-auto"
                                                                onClick={setLayoutFunc}
                                                            >
                                                                Set <i className="fa fa-send ml-2" />
                                                            </Button>
                                                        </Grid>

                                                    </Card>
                                                </div>
                                            </Card>

                                            <div className="mt-3">
                                             
                                                    <Card className="pt-3 pb-3 Card_shadow p-2 mt-4">
                                                        <div  className="text-center Heading_setting mt-1">{CarddataArr[0].data}</div>
                                                        <div className="text-center heading_content mt-1">Creators prefer these advanced features</div>
                                                        <div className="text-center mt-3 ">
                                                            <input type="file" onChange={layoutImageFunc} />
                                                            <Button
                                                                variant="contained"
                                                                className="starttrailbtn"
                                                                onClick={setLayoutFunc}
                                                            >
                                                                Set <i className="fa fa-send ml-2" />
                                                            </Button>
                                                        </div>
                                                    </Card>

                                                    <Card className="pt-3 pb-3 Card_shadow p-4 mt-4">
                                                        <div className="text-center Heading_setting mt-1">{CarddataArr[1].data}</div>
                                                        <div className="text-center heading_content mt-1">Creators prefer these advanced features</div>
                                                        <div className="text-center mt-3 ">
                                                       <input className="form-control mb-2" name="page_color" placeholder="" onChange={layoutChangeFunc}/>
                                                            <Button
                                                                variant="contained"
                                                                className="starttrailbtn"
                                                                onClick={setLayoutFunc}
                                                            >
                                                                Set <i className="fa fa-send ml-2" />
                                                            </Button>
                                                        </div>
                                                    </Card>

                                                    <Card className="pt-3 pb-3 Card_shadow p-4 mt-4">
                                                        <div className="text-center Heading_setting mt-1">{CarddataArr[2].data}</div>
                                                        <div className="text-center heading_content mt-1">Creators prefer these advanced features</div>
                                                        <div className="text-center mt-3 ">
                                                       <input className="form-control mb-2" name="main_font" placeholder=""  onChange={layoutChangeFunc}/>
                                                            <Button
                                                                variant="contained"
                                                                className="starttrailbtn"
                                                                onClick={setLayoutFunc}
                                                            >
                                                                Set <i className="fa fa-send ml-2" />
                                                            </Button>
                                                        </div>
                                                    </Card>

                                                    <Card className="pt-3 pb-3 Card_shadow p-4 mt-4">
                                                        <div className="text-center Heading_setting mt-1">{CarddataArr[3].data}</div>
                                                        <div className="text-center heading_content mt-1">Creators prefer these advanced features</div>
                                                        <div className="text-center mt-3 ">
                                                       <input className="form-control mb-2" name="title_font" placeholder=""  onChange={layoutChangeFunc}/>
                                                            <Button
                                                                variant="contained"
                                                                className="starttrailbtn"
                                                                onClick={setLayoutFunc}
                                                            >
                                                                Set <i className="fa fa-send ml-2" />
                                                            </Button>
                                                        </div>
                                                    </Card>

                                                    <Card className="pt-3 pb-3 Card_shadow p-4 mt-4">
                                                        <div className="text-center Heading_setting mt-1">{CarddataArr[4].data}</div>
                                                        <div className="text-center heading_content mt-1">Creators prefer these advanced features</div>
                                                        <div className="text-center mt-3 ">
                                                       <input className="form-control" name="font_case" placeholder=""  onChange={layoutChangeFunc}/><br/>
                                                            <Button
                                                                variant="contained"
                                                                className="starttrailbtn"
                                                                onClick={setLayoutFunc}
                                                            >
                                                                Set <i className="fa fa-send ml-2" />
                                                            </Button>
                                                        </div>
                                                    </Card>
                                                
                                            </div>
                                        </div>

                                    </TabPanel>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={5} className="p-3">
                            <MobileLinkView  hideEdit={"yes"} />
                        </Grid>
                    </Grid>
                </div >
            </div >
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

const mapStateToProps = (state) => {
    return {
        links: state.links.links, 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLayout: (token,data) => dispatch(actionCreator.setLayout(token,data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (HOC1(AddLinks))
