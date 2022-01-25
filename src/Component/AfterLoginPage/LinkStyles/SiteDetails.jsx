import React, { useState,useEffect } from 'react'
import { Card, Button } from '@material-ui/core';
import RichTextEditor from "react-rte";
import Switch from "react-switch";

import * as actionCreator from "../../../store/actions/style";
import {connect} from "react-redux";

function SiteDetails(props) {
    const [rteValue, setrteValue] = useState(RichTextEditor.createEmptyValue())
    const [ischecked, setischecked] = useState(false)


    const HandleRichtext = (rteValue) => {
        setrteValue(rteValue);
        if (props.onChange) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            props.onChange(
                rteValue.toString('html')
            );
        }
    };
    const[file,setFile]=useState(null);
    const[isHidden,setIsHidden]=useState(null);

    const onchangeFuncFile=(e)=>{
        
        setFile(e.target.files[0]);
    }
    const onchangeFunc=(e)=>{

        let val=e.target.value;
        if(val === "option1"){
            setIsHidden(true);
        }
        if(val === "option2"){
            setIsHidden(false);
        }
    }

    const token = localStorage.getItem("token");
    const profile_name= localStorage.getItem("PageLink");

    const editProfileImage=()=>{
        let data;
data={
    profile_photo:file,
    profile_title:profile_name,
    visible:isHidden,
}
props.editProfile(token,data);
    }

console.log(rteValue.toString('html'));  
let error=null;
const editProfileBio=()=>{
if(rteValue.toString('html') == "<p><br></p>"){
  error = "If you want to edit bio then fill it bio section!"
}
    let data;

data={
    profile_title:profile_name,
  bio:rteValue.toString('html'),
}
props.editProfile(token,data);
setrteValue(RichTextEditor.createEmptyValue());

}

console.log(error);



useEffect(()=>{

    //enable share button


let what;
if(ischecked === true){
    what={enabled:ischecked}
    props.enbShareBtn(token,what);
}else{
    what={enabled:ischecked}
    props.enbShareBtn(token,what);
}
console.log(what);

},[ischecked])

//set video 
const[video,setVideo]=useState(null);

const videoChangeFunc=(e)=>{
    setVideo(e.target.value);

}
const setVideoFunc=()=>{
    let data={
        url:video,
        type:"media"
    }
    props.setVideo(token,data)
}
console.log(video);

//favicon
const[fav,setFav]=useState(null);
const onchangeFavFunc=(e)=>{
    setFav(e.target.files[0]);
}
const uploadFav=()=>{
    console.log(fav);
    props.setfavicon(token,{fav_icon:fav})
}

//page titles
const [titles,setTitles]=useState({
    Social_Titles:"",
    Music_Titles:"",
    Link_Titles:"",
    Contacts_Titles:"",
})

const titleChangeFunc=(e)=>{
    const val=e.target.value;
    const name=e.target.name;
    setTitles({...titles,[name]:val});
    console.log(val,name);
}
const [title,isTitle]=useState(null);

const titlesShowFunc=(e)=>{

console.log(e.target.value);
if(e.target.value === "option1"){
    isTitle(true);
}
if(e.target.value === "option2"){
    isTitle(false);
}
}
const setTitlesFunc=()=>{

    let data={
        social_title : titles.Social_Titles,
         link_title : titles.Link_Titles,
        music_title: titles.Music_Titles,
        contact_title: titles.Contacts_Titles,
        show_titles: title
    }
    props.setPageTitles(token,data);
    console.log(titles,data);
}

    return (
        <>
            <div className="mt-3">
                <Card className=" mb-2 Card_shadow p-2">
                    <div className="text-center Style_heading">Profile picture & Username</div>
                    <div className="text-center">
                        <img
                            src={props.getPublicLinkRes && props.getPublicLinkRes.data.settings.user.image ? props.getPublicLinkRes.data.settings.user.image : "https://www.seekpng.com/png/detail/202-2024994_profile-icon-profile-logo-no-background.png"}
                            alt=""
                            id="img"
                            className="profile_Edit"
                        />
                    </div>
                    <div className="profile_input text-center">
                        <input
                            type="file"
                            accept="image/*"
                            name="image-upload"
                            id="input"
                            onChange={onchangeFuncFile}
                        />
                        <div className="">
                            <label className="resumeview_image_upload" htmlFor="input">
                                <i class="fa fa-camera mr-1"></i>
                            </label>
                        </div>
                    </div>
                    <div className="data_padding_from_both mt-2">
                        <div className="d-flex justify-content-between">
                            <span>
                                <div className="text-center"><i className="fa fa-user" /></div>
                                <div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"  />
                                        <label class="form-check-label" for="exampleRadios2">
                                            Hidden
                                        </label>
                                    </div>
                                </div>
                            </span>
                            <span>
                                <div className="text-center"><i className="fa fa-user" /></div>
                                <div class="form-check">
                                    <input class="form-check-input"  type="radio" name="exampleRadios" id="exampleRadios1" value="option1" onChange={onchangeFunc} />
                                    <label class="form-check-label" for="exampleRadios1">
                                    Visible
                                    </label>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="text-right mt-2 mb-2">
                            <span>
                                <Button
                                    variant="contained"
                                    className="button_formatting mr-2"
                                >
                                    Clear
                                </Button>
                            </span>
                            <span>
                                <Button
                                    variant="contained"
                                    className="button_formatting"
                                    onClick={editProfileImage}
                                >
                                    Save
                                </Button>
                            </span>
                        </div>
                </Card>


                <div className="mt-3">
                    <Card className=" mb-2 Card_shadow p-2">
                        <div className="text-center Style_heading">Bio</div>
                        <div className="text-center Style_para mt-2">Capture the attention of visitors by including emojis</div>
                        <RichTextEditor
                            className="Site_details_Editor mt-3"
                            value={rteValue}
                            onChange={HandleRichtext}
                        />
{
    error && (
        <p>{error}</p>
    )
}
                        <div className="text-right mt-2 mb-2">
                            <span>
                                <Button
                                    variant="contained"
                                    className="button_formatting mr-2"
                                >
                                    Clear
                                </Button>
                            </span>
                            <span>
                                <Button
                                    variant="contained"
                                    className="button_formatting"
                                    onClick={editProfileBio}
                                >
                                    Save
                                </Button>
                            </span>
                        </div>
                    </Card>
                </div>

                <div className="mt-3">
                    <Card className=" mb-2 Card_shadow p-2">
                        <div className="text-center Style_heading">Enable Share Button</div>
                        <div className="text-center Style_para mt-2">Enabling this will add a share icon to the top right of your page <br />
                            which will allow users to easily copy the link to your page and <br />share it.
                        </div>
                        <div className="data_padding_from_both mt-4">
                            <div className="d-flex justify-content-between">
                                <span className="Style_heading">Enable Share Button</span>
                                <span className=""><Switch onChange={() => setischecked(!ischecked)} checked={ischecked} /></span>
                            </div>
                        </div>
                    </Card>
                </div>

                <div>
                    <Card className="pt-3 pb-3 Card_shadow mt-4">
                        <div className="text-center Heading_setting mt-1">Favicon</div>
                        <div className="text-center heading_content mt-1">Creators prefer these advanced features</div>
                        <div className="text-center mt-3 ">
                            <input
                            type="file"
                            accept="image/*"
                            name="image-upload"
                            id="input"
                            onChange={onchangeFavFunc}
                        />
                            <Button
                                variant="contained"
                                className="starttrailbtn"
                                onClick={uploadFav}
                            >
                                Upload  <i className="fa fa-send ml-2" />
                            </Button>
                        </div>
                    </Card>
                </div>

                <div className="mt-3">
                    <Card className=" mb-2 Card_shadow p-2">
                        <div className="text-center Style_heading">Featured Video</div>
                        <div className="text-center Style_para mt-2">By including an embed YouTube, Twitch, Vimeo video, visitors can <br /> play it directly on the page.</div>
                        <div className="data_padding_from_both mt-2">
                            <div className="d-flex justify-content-between">
                                <span>
                                    <div className="text-center"><i className="fa fa-arrow-up" /></div>
                                    <div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value={"option2"}  />
                                            <label class="form-check-label" for="exampleRadios2">
                                                Below Links
                                            </label>
                                        </div>
                                    </div>
                                </span>
                                <span>
                                    <div className="text-center"><i className="fa fa-arrow-down" /></div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                                        <label class="form-check-label" for="exampleRadios1">
                                            Above Links
                                        </label>
                                    </div>
                                </span>
                            </div>

                            <div className="mt-2 mb-2">
                                <input className="form-control" type="text  " placeholder="YouTube, Twitch, Vimeo" value={video} onChange={(e)=>videoChangeFunc(e)}/>
                            </div>
                        </div>

                        <div className="text-right mt-2 mb-2">
                            <span>
                                <Button
                                    variant="contained"
                                    className="button_formatting mr-2"
                                >
                                    Clear
                                </Button>
                            </span>
                            <span>
                                <Button
                                    variant="contained"
                                    className="button_formatting"
                                    onClick={setVideoFunc}
                                >
                                    Save
                                </Button>
                            </span>
                        </div>
                    </Card>
                </div>

                <div className="mt-3">
                    <Card className=" mb-2 Card_shadow p-2">
                        <div className="text-center Style_heading">Page Titles</div>
                        <div className="data_padding_from_both mt-2">
                                               <div className="data_padding_from_both mt-2">
                        <div className="d-flex justify-content-between">
                            <span>
                                <div className="text-center"><i className="fa fa-user" /></div>
                                <div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" onChange={titlesShowFunc} />
                                        <label class="form-check-label" for="exampleRadios2">
                                            Hidden
                                        </label>
                                    </div>
                                </div>
                            </span>
                            <span>
                                <div className="text-center"><i className="fa fa-user" /></div>
                                <div class="form-check">
                                    <input class="form-check-input"  type="radio" name="exampleRadios" id="exampleRadios1" value="option1" onChange={titlesShowFunc} />
                                    <label class="form-check-label" for="exampleRadios1">
                                    Visible
                                    </label>
                                </div>
                            </span>
                        </div>
                    </div>
                           
                            <div className="mt-1">Social Titles</div>
                            <div className="mt-1 mb-2">
                                <input className="form-control" name='Social_Titles' placeholder="My Socials" value={titles.Social_Titles} onChange={titleChangeFunc}/>
                            </div>
                            <div className="mt-1">Music Titles</div>
                            <div className="mt-1 mb-2">
                                <input className="form-control" placeholder="My Music" name='Music_Titles' value={titles.Music_Titles} onChange={titleChangeFunc}/>
                            </div>
                            <div className="mt-1">Link Titles</div>
                            <div className="mt-1 mb-2">
                                <input className="form-control" placeholder="My Links" name='Link_Titles' value={titles.Link_Titles} onChange={titleChangeFunc}/>
                            </div>
                            <div className="mt-1">Contacts Titles</div>
                            <div className="mt-1 mb-2">
                                <input className="form-control" placeholder="My Contacts" name='Contacts_Titles' value={titles.Contacts_Titles} onChange={titleChangeFunc}/>
                            </div>

                        </div>

                        <div className="text-right mt-2 mb-2">
                            <span>
                                <Button
                                    variant="contained"
                                    className="button_formatting mr-2"
                                >
                                    Clear
                                </Button>
                            </span>
                            <span>
                                <Button
                                    variant="contained"
                                    className="button_formatting"
                                    onClick={setTitlesFunc}
                                >
                                    Save
                                </Button>
                            </span>
                        </div>
                    </Card>
                </div>

                <div>
                    <Card className="pt-3 pb-3 Card_shadow mt-4">
                        <div className="text-center Heading_setting mt-1">Link Groups</div>
                        <div className="text-center heading_content mt-1">Creators prefer these advanced features</div>
                        <div className="text-center mt-3 ">
                            <Button
                                variant="contained"
                                className="starttrailbtn"
                            >
                                Start Free Trial <i className="fa fa-send ml-2" />
                            </Button>
                        </div>
                    </Card>
                </div>

            </div>

        </>
    )
}


const mapStateToProps=(state)=>{
    return{
        editProfileRes:state.links.editProfileRes,
        getPublicLinkRes:state.links.getPublicLinkRes,
        
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        editProfile:(token,data)=>dispatch(actionCreator.editProfile(token,data)),
        enbShareBtn:(token,what)=>dispatch(actionCreator.enbShareBtn(token,what)),
        
        setVideo:(token,what)=>dispatch(actionCreator.setVideo(token,what)),
        
        setfavicon:(token,what)=>dispatch(actionCreator.setfavicon(token,what)),
        setPageTitles:(token,what)=>dispatch(actionCreator.setPageTitles(token,what)),
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (SiteDetails);
