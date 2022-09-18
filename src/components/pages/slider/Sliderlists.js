import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, Router,useNavigate } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import MaterialTable from 'material-table';
import edit from "../../images/edit.png";
import add from "../../images/add.png";
import deletes from "../../images/delete.png";
import list from "../../images/list.png";
import Leftsidebar from '../home/component/Leftsidebar';
import Header from '../header';
import {API_URL} from '../../../config'



const Sliderlists = () => {
    const [data, setData] = useState([]);
    const [sliderdata,setSliderdata] = useState([])
    const navigate = useNavigate();

    const [editSuccessSliderModal, setEditSuccessSliderModal] = useState(false);
    const editSuccessToggleModal = () => setEditSuccessSliderModal(!editSuccessSliderModal);
    const [fillallfieldmodal, setFillallfieldModal] = useState(false);
    const fillallfieldtoggleModal = () => setFillallfieldModal(!fillallfieldmodal);
    // const links = useRef();
 
    const [baseImage, setBaseImage] = useState("");
    const [sliderid, setSliderid] = useState(null);
    const [editSliderModal, setEditSliderModal] = useState(false);
    const editSliderToggleModal = () => setEditSliderModal(!editSliderModal);

    const [deleteslidernameModal, setDeleteslidernameModal] = useState(false);
    const deleteslidernameToggleModal = () => setDeleteslidernameModal(!deleteslidernameModal);

    const [deletesuccessfulslidernameModal, setDeletesuccessfulslidernameModal] = useState(false);
    const deletesuccessfulslidernameToggleModal = () => setDeletesuccessfulslidernameModal(!deletesuccessfulslidernameModal);
    const {id} = useParams();
    const [links, setlinks] = useState("")

    
    console.log("ourdata",links)

    useEffect(() => {
       

        const interval = setInterval(() => {
            getSliders();
            
        }, 3000);
        return () => clearInterval(interval);

    }, []);





    const editslideItempopUp = (id) => {
       
        setSliderid(id);
        setEditSliderModal(!editSliderModal)
        // setlinks(links);


        fetch(API_URL +"/get/slider/" + id,

        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
               
            },
        }

    ).then((response) => {
        if (response.status == 200) {
            response.json().then((resp) => {
                // console.warn("result", resp);
              
                setSliderdata(resp.data);
                setlinks(resp.data.link);
                
                
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


    


    const deleteslideItempopUp = (id) => {
        setSliderid(id);
        setDeleteslidernameModal(!deleteslidernameModal)

    }

    const updateSlider = () => {
        let data = {};

        data['link'] = links;
        data['slideimg'] = baseImage?baseImage: sliderdata.slideimg;

        // if( baseImage == ""){
        //     fillallfieldtoggleModal();
        //     return false
        // }

        fetch(API_URL +"/update/slider/by/"+ sliderid, {
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
                    getSliders();
                    editSliderToggleModal();
                    editSuccessToggleModal();

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

   
    const deleteSlider = () => {

        fetch(API_URL +"/delete/slider/" + sliderid, {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json',
               

            },
            body: JSON.stringify(data)
        }).then((response) => {

            if (response.status == 200) {

                response.json().then((resp) => {
                    console.log("results", resp);
                    deleteslidernameToggleModal();
                    deletesuccessfulslidernameToggleModal();
                    getSliders();

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


    const getSliders = () => {

        fetch(API_URL +"/get/slider/by/" + id,

            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                   
                },
            }

        ).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    // console.warn("result", resp);
                    let _temp = [];
                    resp.data.map((v, i) => {
                        _temp.push({
                            slideimg: <a href={v.slideimg} target="_blank"><img src={v.slideimg} className="slide-img" /></a>,
                            link: v.link,
                            actions: <p> <a href='#' onClick={() => {editslideItempopUp(v._id)}}  className="downloadimg"><img src={edit} /></a> <a href="#" onClick={()=> deleteslideItempopUp(v._id)} className="downloadimg" ><img src={deletes} /></a> </p>
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

   
    const logOut = ()=>{
        localStorage.clear();
        navigate('/login')
      }

    const columns = [
        {
            title: "slide image", field: "slideimg"
        },
        {
            title: "Link", field: "link"
        },
        {
            title: <span className="text-right">Actions</span>, field: "actions"
        }
    ]


    return (


        <div>
				 
				<Header />
                
				<div className='home-db-wrap'>
					<div className="leftsidebar">
						<Leftsidebar />
					</div>
					<div className="right-sidebar">
                    <div className='slider-wp'>
                    <div className="right-section">
                    <div className='slider-name-wrp'>
                        <div className="head-demoreport">
                            <h3>Slider list</h3>
                           
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
                    </div>
					</div>
				</div>



                <Modal isOpen={editSliderModal} toggle={editSliderToggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={editSliderToggleModal}><span className="ml-1 roititle ">Update image</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-p">

                            <div className='preview-img'><img src={baseImage?baseImage: sliderdata.slideimg} /></div>

                            <input className='plus-popup-inpt' type="file" id="img" name="img"  accept="image" onChange={(e) => {
                                uploadImage(e)

                            }} />

                            <input className='plus-popup-inpt' type='url' defaultValue={sliderdata.link} key={sliderdata.link} placeholder='Link' onChange={(e) => setlinks(e.target.value)} />

                           
                            <div className='butn-wrp'>
                                <button onClick={editSliderToggleModal}>close</button>
                                <button onClick={() => { updateSlider()}}>Update Image</button>
                            </div>

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

            <Modal isOpen={deleteslidernameModal} toggle={deleteslidernameToggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={deleteslidernameToggleModal}><span className="ml-1 roititle ">Delete Slider</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-p">
                            <p className='para'>Are you sure, You want to delete this?</p>

                            <div className='butn-wrp'>
                                <button onClick={deleteslidernameToggleModal}>Cancel</button>
                                <button onClick={deleteSlider}>Delete</button>
                            </div>
                        </div>
                    </ModalBody>

                </Modal>

                <Modal isOpen={deletesuccessfulslidernameModal} toggle={deletesuccessfulslidernameToggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={deletesuccessfulslidernameToggleModal}><span className="ml-1 roititle ">Successful</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-p">
                            <p>Slider deleted successfully</p>
                        </div>
                    </ModalBody>

                </Modal>

                <Modal isOpen={editSuccessSliderModal} toggle={editSuccessToggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={editSuccessToggleModal}><span className="ml-1 roititle ">Successful</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-p">
                            <p>edit image updated successfully</p>
                        </div>
                    </ModalBody>

                </Modal>
            
			</div>
    )
}

export default Sliderlists;