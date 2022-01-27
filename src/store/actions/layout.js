import * as actionTypes from "./actionTypes";
import { getBaseUrl } from "../../utils";
import {getPublicLinks} from "./link.js"
let profileName=localStorage.getItem("PageLink");
 //edit profile

export const setLayoutStart=()=>{
    return{
        type:actionTypes.SET_LAYOUT_START,
    }
}

export const setLayoutSuccess=(data)=>{
    
    return{
        type:actionTypes.SET_LAYOUT_SUCCESS,
        data:data
    }
   
}

export const setLayoutFail=(err)=>{
    return{
        type:actionTypes.SET_LAYOUT_FAIL,
        err,
    }
}

export const setLayout=(token,req)=>{
    return async(dispatch)=>{
        dispatch(setLayoutStart());


    try{
            const formData = new FormData();
            for await(const [key, value] of Object.entries(req)) {
                console.log(`${key}: ${value}`);
                formData.append(key, value)
              }
          const response = await fetch(getBaseUrl() + "links/appearance", {
            method: "POST",
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
        
        dispatch(setLayoutSuccess(data));
     dispatch(getPublicLinks(token,profileName));

    }catch(err){
        dispatch(setLayoutFail(err));
    }
    }
}

