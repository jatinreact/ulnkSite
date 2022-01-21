
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
        console.log(req);

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
     

    }catch(err){
        dispatch(editProfileFail(err));
    }
    }
}
