import React, {useState, useEffect} from 'react';
import user from "../../images/user.jpg";
import {Button} from '@material-ui/core';
import "./MobileLinkView.css";
import {getBaseUrl} from "../../../utils/index";
import Loder from '../../../Loder/Loder';
import * as actionCreator from "../../../store/actions/link";
import {connect} from "react-redux";
import {showNotificationMsz} from "../../../utils/Validation";
function PublicMobileLinkView(props) {

    let profile_name=props.location.pathname.split("/")[1]
console.log(profile_name);
    const token = localStorage.getItem("token");



   
    useEffect(() => {
        window.scrollTo(0, 0);

        props.getPubliclink(token,profile_name);
        

    }, []);

    // edit delet function
    const [vDiag, setVdiag] = useState({delete: false, edit: false});

    const [id, setId] = useState(null);
    const editDeleteFunc = (argu, id) => {
        
        if (id) {

            setId(id)
        }
        if (argu === "delete") {
            setVdiag({
                ...vDiag,
                edit: false,
                delete: true
            });
        }

        if (argu === "edit") {
            setVdiag({
                ...vDiag,
                edit: true,
                delete: false
            });
        }


    }

    // checking the delete response


    const deleteFunc = () => {
        
        props.deleteLink(token, id);
        setVdiag({
            ...vDiag,
            delete: false
        });

        showNotificationMsz("link deleted!","success");
    }
    // edit form'
    const [form, setForm] = useState({title: "", url: ""})
    const editChangeFunc = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setForm({
            ...form,
            [name]: value
        })
    }
    

    // edit function

    const editFunc = () => {
        let data = {
            title: form.title,
            url: form.url,
            linkId: id
        }
        setVdiag({
            ...vDiag,
            edit: false
        });
        props.updateLink(token, data);
        
        showNotificationMsz("link edited!","success");

    }

    //notifications

    // delete
// const func=()=>{
//     let icons;
//     if(props.getPublicLinkRes){
//          icons = props.getPublicLinkRes.data.links.find((link) => {
//             return   link.title === 'icon'
//          })
//     }
   
//     console.log(icons);
// }
    
if(props.getPublicLinkRes){
    console.log(props.getPublicLinkRes.data.settings.user);
    console.log(props.getPublicLinkRes.data.links[0],props.getPublicLinkRes.data.links[1])
    }

    //html parser

    let stringToHTML = function (str) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(str, 'text/html');
        return doc.body;
    };

    // const[bio,setBio]=useState("");
    let html="";
    if(props.getPublicLinkRes){
        html=stringToHTML(props.getPublicLinkRes.data.settings.user.bio);
    }

    console.log(html);

   const getBio=(html)=>{
        return (
            html
        );
      }

      console.log(getBio(html))

    // console.log(bio);
    
    return (
        <> {/* edit delete dialog box */}
            {
            vDiag.delete && (
                <div className='dialogBox-Links' >
                    <div className='link-delete-diag'>
                        <p>Are you sure,do you want to delete?</p>
                        <button onClick={
                            () => {
                                setVdiag({
                                    ...vDiag,
                                    delete: false
                                })
                            }
                        }>cancel</button>
                        <button onClick={deleteFunc}>yes</button>
                    </div>
                </div>
            )
        }

            {
            vDiag.edit && (
                <div className='dialogBox-Links'>
                    <div className='link-edit-diag'>
                        <input type="text" name="title"
                            value={
                                form.title
                            }
                            onChange={editChangeFunc}
                            className="form-control"
                            placeholder="title Example"/>
                        <input type="text" name="url"
                            value={
                                form.url
                            }
                            onChange={editChangeFunc}
                            className="form-control"
                            placeholder="www.example.com"/>
                        <button onClick={
                            () => {
                                setVdiag({
                                    ...vDiag,
                                    edit: false
                                })
                            }
                        }>cancel</button>
                        <button onClick={editFunc}>edit</button>
                    </div>
                </div>
            )
        }


            <div className="p-2 userdaboard_color d-flex justify-content-between" >
                <div className="add_link_heading" >MY ULNK HUB LINK:
                    <br/><a href={
                            `/${profile_name}`
                        }
                        target="_blank">
                        <span className="link_color">
                            {profile_name}</span>
                    </a>
                </div>
                <div className="add_link_heading">

                    <span>
                        <Button variant="contained" className="button_formatting mr-2">
                            Edit
                        </Button>
                    </span>
                    <span>
                        <Button variant="contained" className="button_formatting">
                            Copy
                        </Button>
                    </span>
                </div>

            </div>
            <div className='phone_view_width'>
                <div className="phoneborder_afterlogin p-2 mt-5">

<>{
    props.getPublicLinkRes && (
        <>{
            props.getPublicLinkRes.data.settings.user.image  ? (
                <>
                <div className="text-center">
                        <div className="mt-3">
                            <img src={props.getPublicLinkRes.data.settings.user.image}
                                alt=""
                                className="user_Image"/>
                        </div>
                        <div>{props.getPublicLinkRes.data.settings.user.profile_title}</div>


                    </div>

                </>
            ) : (<>
            <div className="text-center">
                        <div className="mt-3">
                            <img src={user}
                                alt=""
                                className="user_Image"/>
                        </div>
                        <div>{profile_name}</div>


                    </div>

            </>)
        }</>
    )
}</>
                    
                    {props.getPublicLinkRes && props.getPublicLinkRes.data.settings.user.bio && props.getPublicLinkRes.data.settings.user.bio === "<p><br></p>" && (<>
                        <p>{getBio}</p>
                    </>)}

                    <div className="mt-2 p-2 linkoverflow_scroll mobile-view">
                        {
                            props.getPublicLinkRes && (
<>
{
   
    props.getPublicLinkRes.data.settings.icons_position === "above" ? (<>
    {
        
         props.getPublicLinkRes.data.links[1].links.map((el,ind)=>{
             return(
                <a key={ind} href={
                    `http://${
                        el.original_url
                    }`
                }
                target="_blank">
                <p className='add_new_link_btn '
                    style={
                        {"borderRadius": "20px"}
                }>
                    {
                    el.title
                }</p>
            </a>
             )
         })
    }
    </>):(
    
    <>
    {
        console.log("below sec")
    }
          {
              
              props.getPublicLinkRes.data.links[1].links.map((el,ki)=>{
                  return (
                      <>
                       <a key={ki} href={
                                    `http://${
                                        el.original_url
                                    }`
                                }
                                target="_blank">
                                <span>
                                    <i className={
                                        `${
                                            el.css
                                        } icons-links`
                                    }></i>
                                </span>
                            </a>
</>
                  )
              })
          }
    </>)
}

</>)}

{/* second section */}
{
                            props.getPublicLinkRes && (
<>
{
    props.getPublicLinkRes.data.settings.icons_position === "below" ? (<>
    {
         props.getPublicLinkRes.data.links[0].links.map((el,kk)=>{
             return(
                <a key={kk} href={
                    `http://${
                        el.original_url
                    }`
                }
                target="_blank">
                <p className='add_new_link_btn '
                    style={ 
                        {"borderRadius": "20px"}
                }>
                    {
                    el.title
                }</p>
            </a>
             )
         })
    }
    </>):(<>
          {
              props.getPublicLinkRes.data.links[0].links.map((el,ii)=>{
                  return (
                      <>
                       <a key={ii} href={
                                    `http://${
                                        el.original_url
                                    }`
                                }
                                target="_blank">
                                <span>
                                    <i className={
                                        `${
                                            el.css
                                        } icons-links`
                                    }></i>
                                </span>
                            </a>
</>
                  )
              })
          }
    </>)
}

</>)}

                                             </div>
                </div>

            </div>
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        links: state.links.links, 
        iconsRes: state.links.iconList, 
        delRes: state.links.delLinkRes,
        getPublicLinkRes:state.links.getPublicLinkRes,
        abovelinkRes:state.links.abovelinkRes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        linkChecker: (token) => dispatch(actionCreator.LinkChecker(token)),
        getIcon: (token) => dispatch(actionCreator.getIcon(token)),
        deleteLink: (token, id) => dispatch(actionCreator.deleteLink(token, id)),
        updateLink: (token, data) => dispatch(actionCreator.updateLink(token, data)),
        getPubliclink: (token,u_name) => dispatch(actionCreator.getPublicLinks(token,u_name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicMobileLinkView)
