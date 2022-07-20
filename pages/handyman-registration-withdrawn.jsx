import { useState, useEffect, useCallback } from "react"
import { Layout, Footer } from "../component";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Image from "next/image";
import PostalCode from "../constent/postal"
import { useDispatch, useSelector } from 'react-redux'
import { get, toPath, trim } from "lodash";
import Select from 'react-select';
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/router'
import { set } from "cookie-cutter";
// import { route } from "next/dist/next-server/server/router";
// import {get} from "lodash";


export default function Category(props) {
  const route = useDropzone()
  const [pincode, setPincode] = useState([])
  const [city, setCity] = useState([])
  const [radius, setRedius] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState({})
  const [code, setCode] = useState([])
  const [allCity, setAllCity] = useState([])









  const [UserData, setUserData] = useState({});


  const [tabIndex, setTabIndex] = useState(0);
  const [mainIndex, setMainIndex] = useState(0);



  const [Images, setImages] = useState([]);
  const [aggrement, setAggrement] = useState(false);
  
  const [mainError, setMainError] = useState(false);

  const [certificate, setCertificate] = useState([])
  const [DocImg, setDocImg] = useState()

  const dispatch = useDispatch()
  const router = useRouter()
  const { searchByIdData, addGigData, gig, update, UploadDoc } = useSelector(state => ({
    searchByIdData: state.services.searchByIdData,
    searchByIdLoading: state.services.searchByIdLoading,
    addGigLoading: state.handyman.addGigLoading,
    addGigData: state.handyman.addGigData,
    gigLoading: state.handyman.gigLoading,
    gig: state.handyman.gig,
    update: state.handyman.update,
    UploadDoc: state.handyman.uploadData
  }
  ));




  useEffect(() => {
    if (get(router, 'query.id', false)) {
      setTitle(get(gig, 'title', ''))
      setCategory(get(gig, 'service', ''))
      setDescription(get(gig, 'description', ''))
      setPincode(get, (gig, 'pincode', ''))
      setRedius(get, (gig, 'radius', ''))
      setFrom(get, (gig, 'from', ''))
      setTo(get, (gig, 'to', ''))
    }


  }, [gig])













  useEffect(() => {
    console.log("addGigData", addGigData)
    if (get(addGigData, 'data.success', false) || get(addGigData, 'data.success', false)) {
      router.push('/handyman-registration-services')
      dispatch({ type: 'RESET_GIG' })
    }
  }, [addGigData, update])













  useEffect(() => {
    dispatch({ type: 'GET_SERVICE' })
    if (get(router, 'query.id', false)) {
      dispatch({ type: 'GET_GIG', payload: get(router, 'query.id', '') })
    }
    const pin = []
    const pinCity = []
    PostalCode.map((data) => {
      pin.push({ value: data.code, label: data.code })
      pinCity.push({ value: data.city, label: data.city })
    })
    setCode([...pin])
    setAllCity([...pinCity])


    // dispatch({ type: 'ADD_GIG', payload: "payloads" })
  }, [])


















  function onChange(e) {
    console.log(e.target.name, e.target.value)
    const re = /^[0-9,\b]+$/;
    if (e.target.name == 'radius') {
      // if (e.target.value === '' || re.test(e.target.value)) {
      setUserData({ ...UserData, [e.target.name]: e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") })
      // }
    } else if (e.target.name == 'to') {
      // if (e.target.value === '' || re.test(e.target.value)) {
      setUserData({ ...UserData, [e.target.name]: e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") })
      // }
    } else if (e.target.name == 'form') {
      // if (e.target.value === '' || re.test(e.target.value)) {
      setUserData({ ...UserData, [e.target.name]: e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") })
      // }
    }
    else {
      setUserData({ ...UserData, [e.target.name]: e.target.value })

    }
  }











  useEffect(() => {
    console.log("run")
    console.log(DocImg)
    //  setImgData(UploadDoc.data[0])
    if (get(UploadDoc, 'data[0].key', '') == DocImg) {
      // setImgData(UploadDoc.data[0].url)
      setImages([...Images, UploadDoc.data[0].url])

      setCertificate([...certificate, UploadDoc.data[0].url])


      dispatch({ type: "RESET_HANDYMAN" })
    }

  }, [UploadDoc])













  function uploadWorkLicense(e) {

    const formData = new FormData();
    formData.append('files', e.target.files[0])
    dispatch({ type: "UPLOAD_REQUEST", payload: { files: formData, key: e.target.name } })
    setDocImg(e.target.name)

  }









  function nextStep() {
      console.log("scsc")
  
    // const Terror = {}
    // if (!UserData.title) {
    //   Terror.title = "Please enter title"
    // } else if (!UserData.serivce) {
    //   Terror.serivce = "Please select a serivce"
    // } else if (!UserData.workingArea && !UserData.city) {
    //   Terror.radius = "Please enter radius or select a city"
    // } else if (!UserData.pincode) {
    //   Terror.pincode = "Please select pincode"
    // } else if (UserData.minPrice === '') {
    //   Terror.minPrice = "Please enter start price"
    // } else if (!UserData.maxPrice) {
    //   Terror.maxPrice = "Please enter end price"
    // } else if (!UserData.description) {
    //   Terror.description = "Please enter description"
    // }
   
    // setError(Terror)
  
    // if (!Object.keys(Terror).length)
    //  {
      //  console.log(UserData)
       dispatch({ type: 'ADD_GIG', payload: UserData })
      // setTabIndex(1)
      // if (mainIndex < 1) {
      //   setMainIndex(1)
      // }
      // window.scroll({
      //   top: 1,
      // })
    // }
  }

  function submitForm() {



    // setUserData({ ...UserData, ["images"]: certificate })
    // console.log(UserData)

    // console.log(error)
    // console.log(Images)
    // console.log(certificate)
    // const Terror = {}
    const mainError = {}
    // if (title === '') {
    //   Terror.title = "Please enter title"
    // } if (category === '') {
    //   Terror.category = "Please select a category"
    // } if (radius === '' && !city.length) {
    //   Terror.radius = "Please enter radius or select a city"
    // } //if (!pincode.length) {
    // //Terror.pincode = "Please select pincode"
    // //} 
    // if (from === '') {
    //   Terror.from = "Please enter start price"
    // } if (to === '') {
    //   Terror.to = "Please enter end price"
    // } if (description === '') {
    //   Terror.description = "Please enter description"
    // }// if (!aggrement) {
    // //   mainError.aggrement = "Please accept term and conditions"
    // } 
    // if (Images.length!= 3) {
    //   mainError.images = "Please upload all three images"
    // }

    // // setError(Terror)
    // setMainError(mainError)
    // // console.log("Terror", Terror, mainError)
    // if (!Object.keys(mainError).length) {
      // const data = new FormData()
      // data.append('title', title);
      // data.append('service', category);
      // data.append('radius', radius);
      // pincode.map((pin) => {
      //   data.append('pincode', pin.value);
      // })

      // data.append('from', from);
      // data.append('to', to);
      // data.append('description', description);
      // // data.append('description', description);
      // Images.map((img) => {
      //   data.append('images[]', img);
      // })
      // pincode.map((code) => {
      //   data.append('pincode[]', code.value)
      // })
      // city.map((cit) => {
      //   data.append('city[]', cit.value)
      // })

    //   if (get(router, 'query.id', false)) {
    //     data.append('gigId', get(router, 'query.id', ''))
    //     console.log("apilol")
    //     dispatch({ type: 'UPDATE_REQUEST', payload: UserData })
    //   }
    //   else {
      console.log("api 187 ", UserData)

    //     dispatch({ type: 'ADD_GIG', payload: UserData })
    //   }
    // }
  
  }

  // const onDrop = useCallback(acceptedFiles => {
  //   console.log("acceptedFiles", acceptedFiles)
  //   const file = images
  //   const image = acceptedFiles[0]
  //   // const blob = new Blob([image], {type: 'image/png'})
  //   image.url = URL.createObjectURL(image)
  //   var reader = new FileReader();
  //   // image.url = reader.readAsDataURL(image);
  //   console.log("image", image)
  //   file.push(image)
  //   setImages([...file])
  // }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxSize: 26214400, multiple: false, accept: "image/*" })
  // console.log(images.length, images[0])
  return (
    <Layout setWebSoket={props.setWebSoket}>
      <div className="category">

        <div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 registration-tabs">
                <Tabs selectedIndex={tabIndex} onSelect={index => mainIndex == 1 && index <= 1 && setTabIndex(index)} >
                  <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Gallery</Tab>
                    <Tab>Publish</Tab>
                  </TabList>

                  <TabPanel>
                    <div className="mb30">
                      <h3 className="label">Service Title</h3>
                      <input
                        type="text"
                        name="title"

                        onChange={(e) => onChange(e)}
                        className="input-field"
                        placeholder="Professional Moving Out Service"
                      />
                      {get(error, 'title', '') &&
                        <span>{get(error, 'title', '')}</span>
                      }
                    </div>

                    <div className="d-flex flexwrap margmin15 align-btm">

                      <div className="col-lg-5 col-md-12 marb30">
                        <h3 className="label">Category</h3>
                        {/* <input
                          type="text"
                          className="input-field"
                          placeholder="Professional Moving Out Service"
                        /> */}
                        <select value={UserData.serivce} name="serivce" onChange={(e) => onChange(e)} className="input-field">
                          <option value="">Pick a serivce</option>
                          {searchByIdData && searchByIdData.map((data, key) => (
                            <option key={key} value={get(data, '_id', '')}>{get(data, 'name', '')}</option>
                          ))}
                        </select>
                        {get(error, 'serivce', '') &&
                          <span>{get(error, 'serivce', '')}</span>
                        }
                      </div>

                      <div className="col-lg-3 col-md-5">
                        <h3 className="label">Working Area</h3>
                        <input
                          type="text"
                          name="workingArea"
                          onChange={(e) => onChange(e)}
                          // value={UserData.radius}
                          className="input-field"
                          placeholder="Radius (in kms)"
                        />
                        {get(error, 'radius', '') &&
                          <span>{get(error, 'workingArea', '')}</span>
                        }
                      </div>

                      <div className="col-lg-1 col-md-2"><span className="aroundlabel">around</span></div>

                      <div className="col-lg-3 col-md-5">
                        <h3 className="label">Pincode</h3>
                        {/* <input
                          type="text"
                          className="input-field"
                          placeholder="Select a pincode"
                        /> */}
                        {/* <select multiple={true} onChange={(e) =>onChange(e)}    name="pincode" className="input-field">
                          <option value="">Select a pincode</option>
                          {PostalCode.map((data, key) => (
                            <option key={key} value={data.code}>{data.code}</option>
                          ))}
                        </select> */}
                        {/* <Select
                          // isMulti={true}
                          
                           value={UserData.pincode}
                          name="pincode"
                          placeholder="Select a pincode"
                          onChange={(e) =>onChange(e)}
                          options={code}

                        /> */}
                        <select name="pincode" onChange={(e) => onChange(e)} className="input-field">
                          <option value={UserData.pincode}>Select a pincode</option>
                          {PostalCode.map((data, key) => (
                            <option key={key} value={data.code}>{data.code}</option>
                          ))}
                        </select>
                        {/* {get(error, 'category', '') &&
                          <span>{get(error, 'category', '')}</span>
                        } */}
                        {get(error, 'pincode', '') &&
                          <span>{get(error, 'pincode', '')}</span>
                        }
                      </div>
                    </div>



                    <div className="d-flex flexwrap margmin15 mt-3 mb-3">

                      <div className="col-md-5">
                      </div>

                      <div className="col-lg-7 col-md-12 textcenter">Or</div>
                    </div>


                    <div className="d-flex flexwrap margmin15">

                      <div className="col-md-5">
                      </div>

                      <div className="col-md-7">
                        {/* <input
                          type="text"
                          className="input-field"
                          placeholder="Select A City"
                        /> */}
                        {/* <select onChange={onChangeCity} value={city} className="input-field">
                          <option value="">Select a City</option>
                          {PostalCode.map((data, key) => (
                            <option key={key} value={data.city}>{data.city}</option>
                          ))}
                        </select> */}
                        {/* <Select
                          isMulti={true}
                          // value={city}
                          name="city"
                          onChange={(e) =>onChange(e)}
                          placeholder="Select A City"
                          // className="input-field"
                          options={allCity}
                        /> */}
                        <select name="city" onChange={(e) => onChange(e)} className="input-field">
                          <option value={UserData.city}>Select a city</option>
                          {allCity.map((data, key) => (
                            <option key={key} value={data.value}>{data.value}</option>
                          ))}
                        </select>
                        {get(error, 'city', '') &&
                          <span>{get(error, 'city', '')}</span>
                        }
                      </div>

                    </div>

                    <div className="mapimg">
                      <Image
                        src="/assets/images/mapimg.png"
                        alt="testimonial2"
                        layout="responsive"
                        width={1098}
                        height={297}
                      />
                    </div>
                    <div className="d-flex flexwrap margmin15 align-btm">
                      <div className="col-lg-4 col-md-5">
                        <h3 className="label">Set Your Price Range</h3>
                        <input
                          type="text"
                          name="minPrice"
                          value={UserData.from}
                          onChange={(e) => onChange(e)}
                          // value={from}
                          className="input-field"
                          placeholder="Amount In Euros"
                        />
                        {get(error, 'minPrice', '') &&
                          <span>{get(error, 'from', '')}</span>
                        }
                      </div>
                      <div className="col-lg-1 col-md-2"><span className="aroundlabel">To</span></div>
                      <div className="col-lg-4 col-md-5">
                        <input
                          type="text"
                          name="maxPrice"
                          value={UserData.to}
                          onChange={(e) => onChange(e)}
                          // value={to}
                          className="input-field"
                          placeholder="Amount in Euros"
                        />
                        {get(error, 'to', '') &&
                          <span>{get(error, 'maxPrice', '')}</span>
                        }
                      </div>
                    </div>
                    <div className="col-md-12 margmin15 mt-5 width-xtra">
                      <h3 className="label">Service Description</h3>
                      <textarea name="description" value={UserData.description} onChange={(e) => onChange(e)} type="text" className="textarea" placeholder="Add a description about your service here" />
                      {get(error, 'description', '') &&
                        <span>{get(error, 'description', '')}</span>
                      }
                    </div>

                    <div className="col-md-12 text-center margmin15 mt-5 width-xtra">
                      <button className="btn primarybtn-fill" onClick={nextStep}>Save & Continue</button>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="img-section">
                      <div className="servicephotos">
                        <div className="servicephotos-head">
                          <h5>Service Photos</h5>
                          <h6>({Images.length}/3)</h6>
                        </div>
                        <p>Upload photos that describe or are related to your service.</p>
                      </div>

                      <ul className="servicephotos-listing">
                        {Images.length === 0 ?
                          <li>
                            <div accept="image/*" multiple={false} {...getRootProps()}>
                              <input name="img1" {...getInputProps()} onChange={(e) => uploadWorkLicense(e)} />
                              <div className="upload-content">
                                <Image
                                  src="/assets/svg/ic-upload.png"
                                  alt="testimonial2"
                                  width={111}
                                  height={129}
                                />
                                <h4>Drag a Photo or</h4>
                                <h5>Browse</h5>
                              </div>

                              {/* <Image
                                src="/assets/svg/photo-img.svg"
                                alt="testimonial2"
                                width={111}
                                height={129}
                              /> */}
                            </div>
                            <button className="delete-btn"></button>
                          </li>
                          : <li>
                            {
                              <img
                                src={Images[0]}
                                alt="testimonial2"
                                width={111}
                                height={129}
                              />
                            }
                            <button className="delete-btn"></button>
                          </li>
                        }{Images.length === 1 ?
                          <li>
                            <div {...getRootProps()}>
                              <input name="img2" {...getInputProps()} onChange={(e) => uploadWorkLicense(e)} />
                              <div className="upload-content">

                                <Image
                                  src="/assets/svg/ic-upload.png"
                                  alt="test"
                                  width={111}
                                  height={129}
                                />
                                <h4>Drag a Photo or</h4>
                                <h5>Browse</h5>
                              </div>
                              {/* <img
                                src="/assets/svg/photo-img.svg"
                                alt="testimonial2"
                                width={111}
                                height={129}
                              /> */}
                            </div>
                            <button className="delete-btn"></button>
                          </li>
                          : <li>
                            <div>
                              {
                                <img
                                  src={Images[1]}
                                  alt="testimonial2"
                                  width={111}
                                  height={129}
                                />

                              }
                            </div>
                            <button className="delete-btn"></button>
                          </li>
                        }{Images.length === 2 ?
                          <li>
                            <div accept="image/*" multiple={false} {...getRootProps()}>
                              <input name="img3" {...getInputProps()} onChange={(e) => uploadWorkLicense(e)} />
                              <div className="upload-content">
                                <Image
                                  src="/assets/svg/ic-upload.png"
                                  alt="testimonial2"
                                  width={111}
                                  height={129}
                                />
                                <h4>Drag a Photo or</h4>
                                <h5>Browse</h5>
                              </div>
                              {/* <Image
                                src="/assets/svg/photo-img.svg"
                                alt="testimonial2"
                                width={111}
                                height={129}
                              /> */}
                            </div>
                            <button className="delete-btn"></button>
                          </li>
                          : <li>
                            {<img
                              src={Images[2]}
                              alt="testimonial2"
                              width={111}
                              height={129}
                            />
                            }
                            <button className="delete-btn"></button>
                          </li>
                        }
                        {get(mainError, 'images', '') &&
                          <span>{get(mainError, 'images', '')}</span>
                        }
                      </ul>

                      <div className="form-group checkbox-wrapper checkbox-margin-t">
                        <input type="checkbox" checked={aggrement} onChange={(e) => setAggrement(e.target.checked)} id="html" />
                        <label for="html">
                          I declare that these materials were created by myself or by my team and do not infringe on any 3rd party rights. I understand that the
                          illegal use of digital assets is against Dein Hausman’s Terms of Service and may result in blocking of my seller account.
                        </label>
                        {get(mainError, 'aggrement', '') &&
                          <span>{get(mainError, 'aggrement', '')}</span>
                        }
                      </div>


                      <div className="col-md-12 text-center mt-5">
                        <button onClick={submitForm} className="btn primarybtn-fill">Publish</button>
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="publish-section">
                      <h5>Congratulations! Your service is now live for buyers to view.</h5>
                      <div className="linkinput">
                        <Image
                          src="/assets/svg/ic-link.svg"
                          alt="testimonial2"
                          width={36}
                          height={36}
                        />
                        <input type="text" placeholder="https://www.deinhausm ..." />
                      </div>
                      <div className="col-md-12 text-center mt-5">
                        <button className="btn primarybtn-fill">Return to Dashboard</button>
                      </div>
                    </div>
                  </TabPanel>
                </Tabs>

              </div>
            </div>
          </div>
        </div>

        <div className="home-section-padding">
          <Footer ws={props.ws} />
        </div>
      </div>
    </Layout>
  );
}
