
import * as actionTypes from "./actionTypes";
import { getBaseUrl } from "../../utils";

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
        console.log(token);

    try{
          const response = await fetch(getBaseUrl() + "profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer "+token,


            },
            body:JSON.stringify(req)
        })

        const data = await response.json(); 
        console.log(data)
        if(response.ok !== true){
            throw Error("Something went wrong!")
        }
        
        dispatch(editProfileSuccess(data));
     

    }catch(err){
        dispatch(editProfileFail(err.message));
    }
    }
}
