import React, {useState, useEffect} from 'react';
import user from "../../images/user.jpg";
import {Button} from '@material-ui/core';
import "./MobileLinkView.css";
import {getBaseUrl} from "../../../utils/index";
import Loder from '../../../Loder/Loder';
import * as actionCreator from "../../../store/actions/link";
import {connect} from "react-redux";

function MobileLinkView(props) {


    const token = localStorage.getItem("token");

    let pageLink = localStorage.getItem("userName");

    const [links, setLinks] = useState();

    const getLinks = async () => {
        const response = await fetch(getBaseUrl() + "links/link-list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + token
            }
        })

        const data = await response.json();

        setLinks(data);

    }

    useEffect(() => {
        window.scrollTo(0, 0);

        props.linkChecker(token);
        props.getIcon(token)
        props.getPubliclink({profile_name:pageLink})

    }, [props.load, props.checked]);

    console.log(links);

    // edit delet function
    const [vDiag, setVdiag] = useState({delete: false, edit: false});

    const [id, setId] = useState(null);
    const editDeleteFunc = (argu, id) => {
        console.log(id);
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
        console.log("deleted!", id);
        props.deleteLink(token, id);
        setVdiag({
            ...vDiag,
            delete: false
        });
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
    console.log(form);

    // edit function

    const editFunc = () => {
        let data = {
            title: form.title,
            url: form.url,
            linkId: id
        }

        props.updateLink(token, data);

    }
    return (
        <> {/* edit delete dialog box */}
            {
            vDiag.delete && (
                <div className='dialogBox-Links'>
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


            <div className="p-2 userdaboard_color d-flex justify-content-between">
                <div className="add_link_heading">MY ULNK HUB LINK:
                    <br/><a href={
                            `/${pageLink}`
                        }
                        target="_blank">
                        <span className="link_color">
                            {pageLink}</span>
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


                    <div className="text-center">
                        <div className="mt-3">
                            <img src={user}
                                alt=""
                                className="user_Image"/>
                        </div>
                        <div>User Name</div>


                    </div>


                    <div className="mt-2 p-2 linkoverflow_scroll mobile-view">

                        {/* above icons */}
                        {

                        props.iconsRes && ! props.checked ? (
                            <> {
                                props.iconsRes.links.map((el, i) => {
                                    return (
                                        <>
                                            <a href={
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
                            } </>
                        ) : (
                            <p style={
                                {"textAlign": "center"}
                            }></p>
                        )
                    }


                        {


                        props.links ? (
                            <> {
                                props.links.links.map((el, i) => {
                                    return (
                                        <>

                                            <a href={
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


                                            <div className='links-div'>
                                                <span className='links-editable'>
                                                    <i className='fa fa-trash'
                                                        onClick={
                                                            () => editDeleteFunc("delete", el._id)
                                                    }></i>
                                                    <i className='fa fa-edit'
                                                        onClick={
                                                            () => {
                                                                editDeleteFunc("edit", el._id);
                                                                setForm({
                                                                    ...form,
                                                                    title: el.title,
                                                                    url: el.original_url
                                                                })
                                                            }
                                                    }></i>
                                            </span>
                                        </div>


                                    </>
                                    )
                                })
                            } </>
                        ) : (
                            <p style={
                                {"textAlign": "center"}
                            }>No result found!</p>
                        )
                    }

                        {/* icons */}

                        {

                        props.iconsRes && props.checked ? (
                            <> {
                                props.iconsRes.links.map((el, i) => {
                                    return (
                                        <>
                                            <a href={
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
                            } </>
                        ) : (
                            <p style={
                                {"textAlign": "center"}
                            }></p>
                        )
                    } </div>
                </div>

            </div>
        </>
    )
}


const mapStateToProps = (state) => {
    return {links: state.links.links, iconsRes: state.links.iconList, delRes: state.links.delLinkRes}
}

const mapDispatchToProps = (dispatch) => {
    return {
        linkChecker: (token) => dispatch(actionCreator.LinkChecker(token)),
        getIcon: (token) => dispatch(actionCreator.getIcon(token)),
        deleteLink: (token, id) => dispatch(actionCreator.deleteLink(token, id)),
        updateLink: (token, data) => dispatch(actionCreator.updateLink(token, data)),
        getPubliclink: (u_name) => dispatch(actionCreator.getPublicLinks(u_name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileLinkView)
