import React, { createContext, useState } from 'react'
export const dataContext =createContext()

 export let user={
    data:null,
    mime_type:null,
    imgUrl:null
   
}

export let prevUser={
    data:null,
    mime_type:null,
    prompt:null,
    imgUrl:null
}

function UserContext({children}){
let[startRes,setStartRes]=useState(false)
 let[popUp,setPopUp]=useState(false)
 let[input,setInput]=useState("")
 let[feature,setFeature]=useState("chat")
 let[showResult,setShowResult]=useState("null")
 let[prevFeature,setPrevFeature]=useState("chat")
 let [genImgUrl,setGenImgUrl]=useState("")



    let value={
        startRes,setStartRes,
        popUp,setPopUp,
        input,setInput,
        feature,setFeature,
        showResult,setShowResult,
        prevFeature,setPrevFeature,
        genImgUrl,setGenImgUrl
    }
       
    return(
        <div>
         <dataContext.Provider value={value}>
              {children}  
            </dataContext.Provider>
            

        </div>
    )
}
export default UserContext