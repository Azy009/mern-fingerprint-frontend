import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { FaEye } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { BsFingerprint } from "react-icons/bs";
import { CaptureFinger, VerifyFinger } from "../mfs100";

const Home = () => {
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const nvg = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [status, setstatus] = useState("");
  const [fingerprint_img, setfingerprint_img] = useState("");
  const [fingerprint_key, setfingerprint_key] = useState("");

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const colums = [
    {
      field: "serialNo",
      headerName: "S.No",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "fullname",
      headerName: "Full Name",
      headerAlign: "center",
      align: "center",
      flex: 0.6,
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Mobile No",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    { field: "formatdate", headerName: "Created Date & Time", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      renderCell: ({ row: { status } }) => {
        return (
          <button
            className={status == "Active" ? "button-custom" : "button-custom"}
          >
            {status == "Active" ? "Active" : "Inactive"}
          </button>
        );
      },
    },
    {
      field: "_id",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      flex: 0.8,
      renderCell: ({ row: { _id } }) => {
        return (
          <div>
            <NavLink to={`/viewuser/${_id}`}>
              <FaEye
                style={{ paddingRight: "5px" }}
                fontSize={16}
                color="#E4602C"
              />
            </NavLink>
            <NavLink
              to="#"
              onClick={() => {deleteuser(_id)}}
            >
              <AiOutlineDelete fontSize={17} color="#E4602C" />
            </NavLink>
          </div>
        );
      },
    },
  ];
  const varifyfinger = (one, two, three) => {
    const client = new VerifyFinger(one, two);
    if (client.data.Status) {
      setData([three]);
    }
  };

  const verifyuser = () => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      varifyfinger(item.fingerprint_key, fingerprint_key, item);
    }
  };

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

  const deleteuser = async (id) => {
    try {
      const response = await axios.delete(
        `https://mern-fingerprint-backend.onrender.com/api/user/${id}`
      );

      window.location.reload();
    } catch (err) {
      console.log("error message", err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://mern-fingerprint-backend.onrender.com/api/user/userlist"
      );

      const dataWithSerialNumbers = response.data.data.map((row, index) => ({
        ...row,
        serialNo: index + 1,
        id: index + 1,
        fullname: `${row.first_name} ${row.last_name}`,
        formatdate: new Date(row.createdAt.split("Time")[0]).toLocaleDateString(
          "en-GB",
          {
            hour: "numeric",
            minute: "numeric",
          }
        ),
      }));

      setData(dataWithSerialNumbers);
      setLoading(false);
    } catch (err) {
      console.log("error message", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="heading">
        <h3
          style={{
            paddingTop: "35px",
            paddingBottom: "20px",
            fontSize: "32px",
            textAlign: "center",
          }}
        >
          User Management System
        </h3>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        fingerprint_img={fingerprint_img}
        verifyuser={verifyuser}
        CaptureFinger={CaptureFingerPrint}
      />
      <div
        className="table"
        style={{
          width: "90vw",
          background: "white",
          padding: "20px",
          boxShadow:
            "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0px",
          }}
        >
          <button
            className="button-custom"
            style={{ fontSize: "15px", fontWeight: "500" }}
            onClick={openModal}
          >
            <BsFingerprint
              color="#fff"
              fontSize={16}
              style={{ position: "relative", top: "3px" }}
            />{" "}
            Find User by Fingerprint
          </button>
          <button
            className="button-custom"
            style={{ fontSize: "15px", fontWeight: "500" }}
            onClick={() => {
              nvg("/adduser");
            }}
          >
            +Add New
          </button>
        </div>
        {Loading == true ? (
          ""
        ) : (
          <DataGrid
            columns={colums}
            rows={data}
            density="compact"
            pageSizeOptions={[10, 20, 30, 50, 100]}
            components={{ Toolbar: GridToolbar }}
            slots={{
              toolbar: GridToolbar,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Home;

const Modal = ({
  isOpen,
  onClose,
  fingerprint_img,
  CaptureFinger,
  verifyuser,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2
          style={{
            color: "#d15328",
            textDecoration: "underline",
            fontSize: "31px",
          }}
        >
          Find User by Fingerprint
        </h2>
        <div
          className="fingerprint-box"
          style={{
            minWidth: "400px",
            minHeight: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          onClick={CaptureFinger}
        >
          {fingerprint_img ? (
            <img
              src={`data:image/png;base64,${fingerprint_img}`}
              alt="404"
              width="200px"
              height="220px"
            />
          ) : (
            <>
              <span className="fingerprint-icon">
                <BsFingerprint color="#d15328" fontSize={100} />
              </span>
              <p>Click to Capture Fingerprint</p>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            verifyuser();
          }}
          className="search-button"
        >
          Search
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
