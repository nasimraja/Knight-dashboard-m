import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, Router,useNavigate } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import MaterialTable from 'material-table';
import edit from "../../images/edit.png";
import add from "../../images/add.png";
import deletes from "../../images/delete.png";
import list from "../../images/list.png";
import {API_URL} from "../../../config"



const TableList = () => {


    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [slidernameid, setSlidernameid] = useState(null);
    let _userId = localStorage.getItem('user_id');
    const [addslidernameModal, setaddslidernameModal] = useState(false);
    const addslidernameToggleModal = () => setaddslidernameModal(!addslidernameModal);
    const [addSliderModal, setAddsliderModal] = useState(false);
    const addSliderToggleModal = () => setAddsliderModal(!addSliderModal);

    const [editSliderModal, setEditSliderModal] = useState(false);
    const EditSliderToggleModal = () => setEditSliderModal(!editSliderModal);

    const [addslidersuccessModal, setAddslidersuccessModal] = useState(false);
    const addslidersuccessToggleModal = () => setAddslidersuccessModal(!addslidersuccessModal);

    const [addslidernamesuccessModal, setAddslidernamesuccessModal] = useState(false);
    const addslidernamesuccessToggleModal = () => setAddslidernamesuccessModal(!addslidernamesuccessModal);

    const [updateslidernamesuccessModal, setUpdateslidernamesuccessModal] = useState(false);
    const updateslidernamesuccessToggleModal = () => setUpdateslidernamesuccessModal(!updateslidernamesuccessModal);

    const [deleteslidernameModal, setDeleteslidernameModal] = useState(false);
    const deleteslidernameToggleModal = () => setDeleteslidernameModal(!deleteslidernameModal);

    const [deletesuccessfulslidernameModal, setDeletesuccessfulslidernameModal] = useState(false);
    const deletesuccessfulslidernameToggleModal = () => setDeletesuccessfulslidernameModal(!deletesuccessfulslidernameModal);

    const [fillallfieldmodal, setFillallfieldModal] = useState(false);
    const fillallfieldtoggleModal = () => setFillallfieldModal(!fillallfieldmodal);

    const slidername = useRef();
    const [error, setError] = useState(false);
    const links = useRef();
    const [baseImage, setBaseImage] = useState("");





    useEffect(() => {
        getSlidername();

        const interval = setInterval(() => {
            getSlidername();
        }, 3000);
        return () => clearInterval(interval);

    }, []);

    const slidenameSave = () => {
        let data = {};

        data['name'] = slidername.current.value;
        data['userid'] = JSON.parse(localStorage.getItem('users'))._id;

        if(slidername.current.value == ""){
            fillallfieldtoggleModal();
            return false;
        }


        fetch(API_URL+"/add/slider/name", {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

            },
            body: JSON.stringify(data)
        }).then((response) => {

            if (response.status == 200) {

                response.json().then((resp) => {
                    console.log("results", resp);
                    setError(false)
                    addslidernamesuccessToggleModal();
                    getSlidername();

                });
            } else if (response.status == 500) {
                setError(true);
            }
            else if (response.status == 401) {
                logOut()
            }
            else {
                alert("Network error")
            }

        })

    }

    const editslideItempopUp = (id) => {
        setSlidernameid(id);
        setEditSliderModal(!editSliderModal)

    }


    const editSlidename = () => {
        let data = {};

        data['name'] = slidername.current.value;

        if(slidername.current.value == ""){
            fillallfieldtoggleModal();
            return false
        }

        fetch(API_URL +"/update/slidername/" + slidernameid, {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                

            },
            body: JSON.stringify(data)
        }).then((response) => {

            if (response.status == 200) {

                response.json().then((resp) => {
                    console.log("results", resp);
                    EditSliderToggleModal();
                    updateslidernamesuccessToggleModal();
                    getSlidername();

                });
            }
            else if (response.status == 401) {
                logOut()
            }
            else {
                alert("Network error")
            }

        })

    }

    const deleteslideItempopUp = (id) => {
        setSlidernameid(id);
        setDeleteslidernameModal(!deleteslidernameModal)

    }

    const deleteSlidename = () => {

        fetch(API_URL+"/delete/slidername/" + slidernameid, {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

            },
            body: JSON.stringify(data)
        }).then((response) => {

            if (response.status == 200) {

                response.json().then((resp) => {
                    console.log("results", resp);
                    deleteslidernameToggleModal();
                    deletesuccessfulslidernameToggleModal();
                    getSlidername();

                });
            }
            else if (response.status == 401) {
                logOut()
            }
            else {
                alert("Network error")
            }

        })

    }



    const getSlidername = () => {
        console.log("slidertoken",localStorage.getItem('token'))

        fetch(API_URL +"/get/slidername",

            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
            }

        ).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    // console.warn("result", resp);
                    let _temp = [];
                    resp.data.map((v, i) => {
                        _temp.push({
                            name: v.name,

                            actions: <p><a href="#" className="downloadimg" onClick={() => openItemPopUp(v._id)} ><img src={add} /></a> <a href='#' onClick={() => editslideItempopUp(v._id)} className="downloadimg"><img src={edit} /></a> <a href={"/slider/" + v._id} className="downloadimg" ><img src={list} /></a> <a href="#" className="downloadimg" onClick={()=> deleteslideItempopUp(v._id)}><img src={deletes} /></a> </p>
                        })
                    })
                    setData(_temp);


                });
            }
            else if (response.status == 500) {
                setError(true);
            }
            else if (response.status == 401) {
                logOut()
            }
            else {
                alert("network error")
            }


        })


    }

    const sliderSave = () => {
        // const id = JSON.parse(localStorage.getItem('users'))._id;


        let data = {};

        data['link'] = links.current.value;
        data['userid'] = JSON.parse(localStorage.getItem('users'))._id;
        data['slideimg'] = baseImage;
        data['slidernameId'] = slidernameid

        if( baseImage == ""){
            fillallfieldtoggleModal();
            return false
        }

        fetch(API_URL +"/add/slider", {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

            },
            body: JSON.stringify(data)
        }).then((response) => {

            if (response.status == 200) {

                response.json().then((resp) => {
                    console.log("results", resp);
                    setError(false)
                    addslidersuccessToggleModal();

                });
            } else if (response.status == 500) {
                setError(true);
            }
            else if (response.status == 401) {
                logOut()
            }
            else {
                alert("Network error")
            }

        })


    }

    const uploadImage = async (e) => {

        const file = e.target.files[0];
        const base64 = await convertBase64(file)
        setBaseImage(base64);
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {

            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = (() => {
                resolve(fileReader.result);
            });

            fileReader.onerror = (() => {
                reject(error);
            })

        })
    }


    const openItemPopUp = (_id) => {
        setSlidernameid(_id);
        setAddsliderModal(!addSliderModal)
    }

    const logOut = ()=>{
        localStorage.clear();
        navigate('/login')
      }

    const columns = [
        {
            title: "Name", field: "name"
        },

        {
            title: <span className="text-right">Actions</span>, field: "actions"
        }
    ]


    return (
        <div className="">

            <div className="wrp-dashbord">
                <div className="sidebar-section">

                </div>
                <div className="right-section">
                    <div className='slider-name-wrp'>
                        <div className="head-demoreport">
                            <h3>Slider</h3>
                        </div>
                        <div className='add-slider'>
                            <a href='#' onClick={addslidernameToggleModal}>Add Slider</a>
                        </div>
                    </div>

                    <div className="wrp-bankform">
                        <div style={{ maxWidth: '100%' }}>
                            <MaterialTable
                                options={{
                                    search: true,
                                    showTitle: false,
                                    toolbar: true,
                                    pageSizeOptions: [5, 10, 20, 50, 150, 200]
                                }}
                                columns={columns}
                                data={data}
                                title=""
                            />

                        </div>
                    </div>
                </div>
                <Modal isOpen={addslidernameModal} toggle={addslidernameToggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={addslidernameToggleModal}><span className="ml-1 roititle ">Add slider name</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-p">

                            <input className='popup-inpt' type='text' placeholder='Enter slider name' ref={slidername}></input>
                            {
                                error &&
                                <p className="no-user-found">error</p>
                            }
                            <div className='butn-wrp'>

                                <button onClick={() => { slidenameSave(); addslidernameToggleModal(); }}>Add Slider</button>
                            </div>

                        </div>
                    </ModalBody>

                </Modal>


                <Modal isOpen={addSliderModal} toggle={addSliderToggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={addSliderToggleModal}><span className="ml-1 roititle ">Add slider</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-p">

                            <input className='plus-popup-inpt' type="file" id="img" name="img" accept="image" onChange={(e) => {
                                uploadImage(e)

                            }} />

                            <input className='plus-popup-inpt' type='url' placeholder='Link' ref={links} />

                            {
                                error &&
                                <p className="no-user-found">error</p>
                            }
                            <div className='butn-wrp'>
                                <button onClick={addSliderToggleModal}>close</button>
                                <button onClick={() => { sliderSave(); addSliderToggleModal() }}>Submit</button>
                            </div>

                        </div>
                    </ModalBody>

                </Modal>


                <Modal isOpen={addslidersuccessModal} toggle={addslidersuccessToggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={addslidersuccessToggleModal}><span className="ml-1 roititle ">Successful</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-p">
                            <p>Slider added successfully</p>
                        </div>
                    </ModalBody>

                </Modal>

                <Modal isOpen={addslidernamesuccessModal} toggle={addslidernamesuccessToggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={addslidernamesuccessToggleModal}><span className="ml-1 roititle ">Successful</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-p">
                            <p>Slider name added successfully</p>
                        </div>
                    </ModalBody>

                </Modal>

                <Modal isOpen={editSliderModal} toggle={EditSliderToggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={EditSliderToggleModal}><span className="ml-1 roititle ">Edit Slider</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-p">
                            <input className='popup-inpt' type='text' placeholder='Enter slider name' ref={slidername}></input>

                            <div className='butn-wrp'>
                                <button onClick={EditSliderToggleModal}>Cancel</button>
                                <button onClick={editSlidename}>SaveChange</button>
                            </div>
                        </div>
                    </ModalBody>

                </Modal>

                <Modal isOpen={updateslidernamesuccessModal} toggle={updateslidernamesuccessToggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={updateslidernamesuccessToggleModal}><span className="ml-1 roititle ">Successful</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-p">
                            <p>Slider name updated successfully</p>
                        </div>
                    </ModalBody>

                </Modal>


                <Modal isOpen={deleteslidernameModal} toggle={deleteslidernameToggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={deleteslidernameToggleModal}><span className="ml-1 roititle ">Delete Slider</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-p">
                            <p className='para'>Are you sure, You want to delete this?</p>

                            <div className='butn-wrp'>
                                <button onClick={deleteslidernameToggleModal}>Cancel</button>
                                <button onClick={deleteSlidename}>Delete</button>
                            </div>
                        </div>
                    </ModalBody>

                </Modal>

                <Modal isOpen={deletesuccessfulslidernameModal} toggle={deletesuccessfulslidernameToggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={deletesuccessfulslidernameToggleModal}><span className="ml-1 roititle ">Successful</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-p">
                            <p>Slider name deleted successfully</p>
                        </div>
                    </ModalBody>

                </Modal>

                <Modal isOpen={fillallfieldmodal} toggle={fillallfieldtoggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={fillallfieldtoggleModal}><span className="ml-1 roititle font-weight-bold">Error</span></ModalHeader>
                <ModalBody>
                    <div className="modal-error-p">
                        <p className='fillfield'>Please fill all field</p>
                    </div>
                </ModalBody>

            </Modal>

            </div>

        </div>
    )
}

export default TableList;