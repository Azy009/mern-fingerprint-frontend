import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Viewuser = () => {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [fingerprint_img, setfingerprint_img] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://mern-fingerprint-backend.onrender.com/api/user/${id}`
        );

        setfname(response.data.data.first_name);
        setlname(response.data.data.last_name);
        setemail(response.data.data.email);
        setnumber(response.data.data.mobile);
        setfingerprint_img(response.data.data.fingerprint_img);
      } catch (err) {
        console.log("error message", err);
      }
    };

    fetchData();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          width: "90vw",
          background: "white",
          padding: "20px",
          boxShadow:
            "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div>
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#d15328",
              textDecoration: "underline",
              fontSize: "26px",
            }}
          >
            USER DETAILS
          </h3>
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
                readOnly
                placeholder="Enter First Name"
                value={fname}
                onChange={(e) => {
                  setfname(e.target.value);
                }}
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
                readOnly
                placeholder="Enter Last Name"
                value={lname}
                onChange={(e) => {
                  setlname(e.target.value);
                }}
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
                readOnly
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
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
                readOnly
                placeholder="Enter Number"
                value={number}
                onChange={(e) => {
                  setnumber(e.target.value);
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 70px",
              minHeight: "200px",
              border: "1px solid #e6e6e6",
              alignItems: "center",
            }}
          >
            <img
              src={`data:image/png;base64,${fingerprint_img}`}
              alt="404"
              width="200px"
              height="220px"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Viewuser;
