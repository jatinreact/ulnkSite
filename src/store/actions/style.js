
import * as actionTypes from "./actionTypes";
import { getBaseUrl } from "../../utils";
import {getPublicLinks} from "./link.js"
let profileName=localStorage.getItem("PageLink");
 //edit profile

export const editProfileStart=()=>{
    return{
        type:actionTypes.EDIT_PROFILE_START,
    }
}

export const editProfileSuccess=(data)=>{
    
    return{
        type:actionTypes.EDIT_PROFILE_SUCCESS,
        data:data
    }
   
}

export const editProfileFail=(err)=>{
    return{
        type:actionTypes.EDIT_PROFILE_FAIL,
        err,
    }
}

export const editProfile=(token,req)=>{
    return async(dispatch)=>{
        dispatch(editProfileStart());
        console.log(req.profile_title);

    try{
            const formData = new FormData();
            for await(const [key, value] of Object.entries(req)) {
                console.log(`${key}: ${value}`);
                formData.append(key, value)
              }
          const response = await fetch(getBaseUrl() + "profile", {
            method: "PUT",
            headers: {
//                "Content-Type": "multipart/form-data",
                "Authorization": "bearer "+token,


            },
            body:formData,
        })

        const data = await response.json(); 
        
        if(response.ok !== true){
            throw Error("Something went wrong!")
        }
        
        dispatch(editProfileSuccess(data));
     dispatch(getPublicLinks(token,req.profile_title));

    }catch(err){
        dispatch(editProfileFail(err));
    }
    }
}


//enb share btn profile

export const enbShareBtnStart=()=>{
    return{
        type:actionTypes.ENB_SHARE_BTN_START,
    }
}

export const enbShareBtnSuccess=(data)=>{
    
    return{
        type:actionTypes.ENB_SHARE_BTN_SUCCESS,
        data:data
    }
   
}

export const enbShareBtnFail=(err)=>{
    return{
        type:actionTypes.ENB_SHARE_BTN_FAIL,
        err,
    }
}

export const enbShareBtn=(token,what)=>{
    
    return async(dispatch)=>{
        dispatch(enbShareBtnStart());
        console.log(what);

    try{
           
              
          const response = await fetch(getBaseUrl() + "share-button", {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
                "Authorization": "bearer "+token,


            },
            body:JSON.stringify(what),
        })

        const data = await response.json(); 
        
        if(response.ok !== true){
            throw Error("Something went wrong!")
        }
        
        dispatch(enbShareBtnSuccess(data));
     dispatch(getPublicLinks(token,profileName));

    }catch(err){
        dispatch(enbShareBtnFail(err));
    }
    }
}


//set video

export const setVideoStart=()=>{
    return{
        type:actionTypes.SET_VIDEO_START,
    }
}

export const setVideoSuccess=(data)=>{
    
    return{
        type:actionTypes.SET_VIDEO_SUCCESS,
        data:data
    }
   
}

export const setVideoFail=(err)=>{
    return{
        type:actionTypes.SET_VIDEO_FAIL,
        err,
    }
}

export const setVideo=(token,what)=>{
    
    return async(dispatch)=>{
        dispatch(setVideoStart());
        console.log(what);

    try{
           
              
          const response = await fetch(getBaseUrl() + "links/videos", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
                "Authorization": "bearer "+token,


            },
            body:JSON.stringify(what),
        })

        const data = await response.json(); 
        
        if(response.ok !== true){
            throw Error("Something went wrong!")
        }
        console.log("video res:",data);
        dispatch(setVideoSuccess(data));
     dispatch(getPublicLinks(token,profileName));

    }catch(err){
        dispatch(setVideoFail(err));
    }
    }
}

////set favicon

export const setfaviconStart=()=>{
    return{
        type:actionTypes.SET_FAV_START,
    }
}

export const setfaviconSuccess=(data)=>{
    
    return{
        type:actionTypes.SET_FAV_SUCCESS,
        data:data
    }
   
}

export const setfaviconFail=(err)=>{
    return{
        type:actionTypes.SET_FAV_FAIL,
        err,
    }
}

export const setfavicon=(token,what)=>{
    
    return async(dispatch)=>{
        dispatch(setfaviconStart());
        console.log(what);

    try{
           
        const formData = new FormData();
        for await(const [key, value] of Object.entries(what)) {
            console.log(`${key}: ${value}`);
            formData.append(key, value)
          }
          const response = await fetch(getBaseUrl() + "links/fav-icon", {
            method: "POST",
            headers: {
            //    "Content-Type": "application/json",
                "Authorization": "bearer "+token,


            },
            body:formData,
        })

        const data = await response.json(); 
        
        if(response.ok !== true){
            throw Error("Something went wrong!")
        }
        console.log("favicon res:",data);
        dispatch(setfaviconSuccess(data));
     dispatch(getPublicLinks(token,profileName));

    }catch(err){
        dispatch(setfaviconFail(err));
    }
    }
}

////set page titles

export const setPageTitlesStart=()=>{
    return{
        type:actionTypes.SET_FAV_START,
    }
}

export const setPageTitlesSuccess=(data)=>{
    
    return{
        type:actionTypes.SET_FAV_SUCCESS,
        data:data
    }
   
}

export const setPageTitlesFail=(err)=>{
    return{
        type:actionTypes.SET_FAV_FAIL,
        err,
    }
}

export const setPageTitles=(token,what)=>{
    
    return async(dispatch)=>{
        dispatch(setPageTitlesStart());
        console.log(what);

    try{
           
       
          const response = await fetch(getBaseUrl() + "links/page-titles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer "+token,


            },
            body:JSON.stringify(what),
        })

        const data = await response.json(); 
        
        if(response.ok !== true){
            throw Error("Something went wrong!")
        }
        console.log("favicon res:",data);
        dispatch(setPageTitlesSuccess(data));
     dispatch(getPublicLinks(token,profileName));

    }catch(err){
        dispatch(setPageTitlesFail(err));
    }
    }
}

