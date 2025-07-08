import React, { useContext } from 'react'
import "../App.css"
import { RiImageAiFill } from "react-icons/ri";
import { ImFolderUpload } from "react-icons/im";
import { BsChatLeft } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { IoMdArrowRoundUp } from "react-icons/io";
import { dataContext, prevUser, user } from '../context/UserContext';
import Chat from './Chat';
import { generateResponse } from '../gemini';
import { query } from '../huggingFace';
function Home(){
let{startRes,setStartRes,popUp,setPopUp,input,setInput,feature,setFeature,showResult,setShowResult,prevFeature,setPrevFeature,genImgUrl,setGenImgUrl}=useContext(dataContext)
 async function handleSubmit(e){


 setStartRes(true)
 setPrevFeature(feature)
 
 setShowResult("")
 prevUser.data=user.data;
 prevUser.mime_type=user.mime_type;
 prevUser.imgUrl=user.imgUrl;
 prevUser.prompt=input 
 user.data=null
   user.mime_type=null 
   user.imgUrl=null
 setInput("")
   let result=await generateResponse()
   setShowResult(result)
   setFeature=("chat")
  

 }
 function handleImage(e){
    setFeature("upimg")
    let file=e.target.files[0]

    let reader=new FileReader()
    reader.onload=(event)=>{
     let base64=event.target.result.split(",")[1]
     user.data=base64
     user.mime_type=file.type
     user.imgUrl=`data:${user.mime_type};base64,${user.data}`

    }
    reader.readAsDataURL(file)
   
 }
  async function handleGenrateImg(){
    setStartRes(true)
    setPrevFeature(feature)
    setGenImgUrl("")
     prevUser.prompt=input

   let result= await query().then((e)=>{
    
    let url=URL.createObjectURL(e)
    setGenImgUrl(url)

 })
 setInput("")
    setFeature("chat")}

    return(
   <div className='home'>
    <nav>
        <div className="logo" onClick={()=>{

            setStartRes(false)
            setFeature("chat")
            user.data=null
            user.mime_type=null
            user.imgUrl=null
            setPopUp(false)

        }}>

            Genie AI
        </div>
    </nav>
    <input type="file" accept='image/*'hidden id='inputImg' onChange={handleImage} />

    {!startRes?
    <div className="hero">
        <span id="tag">What can I help with ?</span>
        <div className="cate">
            <div className="upImg" onClick={()=>
                {
                    document.getElementById("inputImg").click()
                }
            }>
            <ImFolderUpload />
            <span>Upload image</span>


             </div>
            <div className="genImg" onClick={()=>setFeature("genimg")}>
            <RiImageAiFill />
            <span>Generate Image</span>

             </div>
    
             <div className="chat" onClick={()=>setFeature("chat")}>
             <BsChatLeft />
             <span>Lets'chat</span>


             </div>

        </div>
   </div>
   :
   <Chat/>
   }
   

    <form className="input-box" onSubmit={(e)=>{
        e.preventDefault()
        if(input){
            if(feature=="genimg"){
                handleGenrateImg()
            }
            else{
            handleSubmit(e)}
        }
        }
        }>
<img src={user.imgUrl} alt="" id="im"/>
        {popUp?
        <div className="pop-up">
            <div className="select-up"onClick={()=>
                {
                    setPopUp(false)
                    setFeature("chat")
                    document.getElementById("inputImg").click()
                }
            }>
            <ImFolderUpload />
            <span>Upload image</span>

             </div>
             <div className="select-gen"onClick={()=>{
                setPopUp(false);
                setFeature("genimg")}}>
             <RiImageAiFill />
             <span>Generate Image</span>

             </div>
        </div>
        : null
     }
 <div id="add" onClick={()=>{
    setPopUp(prev=>!prev)
 }}>
    {feature=="genimg"? <RiImageAiFill id="genImg" />:<HiPlus />}

</div>
    <input type="text" placeholder="Ask anything" onChange={(e)=>setInput(e.target.value)} value={input}/>
    {input?
     <button id="submit">
     <IoMdArrowRoundUp />
     </button>
     :null
    }

    
    </form>


   </div>
    


    )
}
export default Home