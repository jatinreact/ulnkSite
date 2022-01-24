
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
