import React, { useEffect, useState } from "react";
import axios from "axios";
import { CaptureFinger } from "../mfs100";
// import { CaptureFinger } from "../mfs100";

const Adduser = () => {
  const [fname,setfname] = useState('')
  const [lname,setlname] = useState('')
  const [email,setemail] = useState('')
  const [number,setnumber] = useState('')
  const [status,setstatus] = useState('')
  const [fingerprint_img,setfingerprint_img] = useState('')
  const [fingerprint_key,setfingerprint_key] = useState('')
  const [userdata,setuserdata] = useState({})
  const [updateres,setupdateres] = useState(false)


  const CaptureFingerPrint = () => {
    try {
      const client = new CaptureFinger();
      if (client.data.AnsiTemplate) {
        setstatus("success");
        setfingerprint_key(client.data.AnsiTemplate);
        setfingerprint_img(client.data.BitmapData);
      } else {
        setstatus("error");
        setfingerprint_key("");
        setfingerprint_img("");
      }
    } catch (error) {
      setstatus("error");
      setfingerprint_key("");
      setfingerprint_img("");
    }
  };

const sumbitprofile = async() =>{
    const data = {
        first_name: fname,
        last_name: lname,
        email,
        mobile:number,
        fingerprint_key,
        fingerprint_img,
      };
        const response = await axios.post(
          `https://mern-fingerprint-backend.onrender.com/api/user/createuser`,
          data
        );
        console.log("resons", response);
          window.location.href="/";

        // setupdateres(true);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);


}


// const CaptureFingerPrint = () => {
//     try {
//       const client = new CaptureFinger();
//       if (client.data.AnsiTemplate) {
//         setfingerprint_key(client.data.AnsiTemplate);
//         setfingerprint_img(client.data.BitmapData);
//       } else {
//         setfingerprint_key("");
//         setfingerprint_img("");
//       }
//     } catch (error) {
//       setfingerprint_key("");
//       setfingerprint_img("");
//     }
//   };



  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'60px'}}>

      <div  style={{width:'90vw',background:'white',padding:'20px',boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)"}}  >

        <div>
            <h3 style={{display:'flex',justifyContent:'center',color:'#d15328',textDecoration:'underline',fontSize:'26px'}}>ADD USER FROM</h3>
        </div>
        <form>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 70px",
            }}
          >
            <div className="form-group " style={{ width: "45%" }}>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                className="input-custom"
                id="firstName"
                placeholder="Enter First Name"
                value={fname}
                onChange={(e)=>{setfname(e.target.value)}}
              />
            </div>
            <div
              className="form-group"
              style={{ width: "45%", marginTop: "0px" }}
            >
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                className="input-custom"
                id="lastName"
                placeholder="Enter Last Name"
                value={lname}
                onChange={(e)=>{setlname(e.target.value)}}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 70px",
            }}
          >
            <div className="form-group" style={{ width: "45%" }}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="input-custom"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e)=>{setemail(e.target.value)}}
              />
            </div>
            <div
              className="form-group"
              style={{ width: "45%", marginTop: "0px" }}
            >
              <label htmlFor="number">Mobile No:</label>
              <input
                type="text"
                className="input-custom"
                id="number"
                placeholder="Enter Number"
                value={number}
                onChange={(e)=>{setnumber(e.target.value)}}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 70px",
              minHeight:'200px',
              border: "1px solid #e6e6e6",
              alignItems:'center'
            }}
          >
           {fingerprint_img ? <img src={`data:image/png;base64,${fingerprint_img}`} 
            onClick={()=>{CaptureFingerPrint()}}
             alt="404" width="200px" height="220px" /> : <p style={{color:'#d15328',fontSize:'32px'}} onClick={()=>{CaptureFingerPrint()}} >+ Add Fingerprint</p>}
          </div>
          {status == "error" ?  <div style={{display:'flex',justifyContent:'center'}}>
          <span style={{ color: "red" }}>Somthing Went Wrong Please try again</span>
          </div> : ''}
         
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px 70px",
            }}
          >
            <button type="button" onClick={()=>{sumbitprofile()}} className="button-custom"
            style={{fontSize:'17px',fontWeight:'500'}}>
              Submit
            </button>
          </div>
           
        </form>
      </div>

    </div>
  );
};

export default Adduser;