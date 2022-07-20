import { useState, useEffect, useCallback } from "react"
import Image from "next/image";
import Link from "next/link"
import PaymentCard from "../PaymentCard/PaymentCard";
import { withTranslation } from "../../constent/i18n/i18n"
import { get } from "lodash";
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Tab } from "react-tabs";
import { useDropzone } from 'react-dropzone'

const { NEXT_PUBLIC_STRIP_KEY } = process.env
const stripePromise = loadStripe(NEXT_PUBLIC_STRIP_KEY);


function ProfileManagement({ t }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { userData, uploadDoc, hyndyman, hyndymanLoading, uploadDocLoading, addPaymentLoading, addPayment } = useSelector(state => ({
    userData: state.user.user,
    uploadDoc: state.handyman.uploadData,
    uploadDocLoading: state.handyman.uploadLoading,
    hyndymanLoading: state.handyman.hyndymanLoading,
    hyndyman: state.handyman.hyndyman,
    addPaymentLoading: state.user.addPaymentLoading,
    addPayment: state.user.addPayment,
  }));

  const onDrop = useCallback(acceptedFiles => {
    const image = acceptedFiles[0]
    image.url = URL.createObjectURL(image)
    setPicture(image)
    // console.log("acceptedFiles", )
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const [name, setName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [location, setLocation] = useState('')
  const [about, setAbout] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [bankName, setbankName] = useState('')
  const [accountNumber, setaccountNumber] = useState('')
  const [iFSCCode, setiFSCCode] = useState('')
  const [error, setError] = useState({})
  const [workLicense, setWorkLicense] = useState({})
  const [taxationIdentityCard, setTaxationIdentityCard] = useState({})
  const [certificate, setCertificate] = useState([])
  const [picture, setPicture] = useState('')
  const [saveChanges, setsaveChanges] = useState([])

  useEffect(() => {
    setName(get(userData, 'fname', ''))
    setEmail(get(userData, 'phone', ''))
    setPhone(get(userData, 'email', ''))
    setbankName(get(userData, 'bankname', ''))
    setaccountNumber(get(userData, 'accountNumber', ''))
    setiFSCCode(get(userData, 'iFSCCode', ''))
  }, [userData])

  useEffect(() => {
    if (get(addPayment, 'success', false)) {
      router.push('/paymentgateway-successful')
      dispatch({ type: "RESET_PAYMENTS" })
    }
  }, [addPayment])

  useEffect(() => {
    if (get(hyndyman, '_id', false)) {
      router.push('/handyman-registration-complete')
      dispatch({ type: "RESET_HANDYMAN" })
    }
  }, [hyndyman])

  useEffect(() => {
    if(get(uploadDoc, 'data[0].key', '')=== "workLicense"){
      setWorkLicense(uploadDoc.data[0])
      dispatch({ type: "RESET_HANDYMAN" })
    }
    if(get(uploadDoc, 'data[0].key', '')=== "taxationIdentityCard"){
      setTaxationIdentityCard(uploadDoc.data[0])
      dispatch({ type: "RESET_HANDYMAN" })
    }
    if(get(uploadDoc, 'data[0].key', '')=== "certificate"){
      const data = saveChanges
      data.push(uploadDoc.data[0])
      setsaveChanges(data)
      dispatch({ type: "RESET_HANDYMAN" })
    }
  }, [uploadDoc])

  function onChanges(key) {

    // saveChanges[key] = {}
    // setsaveChanges([...saveChanges])

    const error = {}
    if (accountNumber == '') {
      error.accountNumber = "Required"
    } if (bankName == '') {
      error.bankName = "Required"
    } if (iFSCCode == '') {
      error.iFSCCode = "Required"
    }
    console.log("error", error)
    setError(error)
    if (!Object.keys(error).length) {
      const data = {
        bankName,
        accountNumber,
        iFSCCode
      }
      dispatch({ type: "ADD_PAYMENT", payload: [data] })
    }
  }
  function removeCertificate(key) {
    certificate[key] = {}
    setCertificate([...certificate])
  }

  function addCertificate(key) {
    var fileupload = document.getElementById(key);
    fileupload.click();
  }

  function uploadCerificate(e, key) {
    certificate[key] = e.target.files[0]
    const formData = new FormData();
    formData.append('files', e.target.files[0])
    dispatch({ type: "UPLOAD_REQUEST", payload: {files: formData, key: 'certificate' }})
    setCertificate([...certificate])
  }

  const renserCertificate = () => (
    certificate.map((data, key) => (
      <li key={key}>
        <div className="form-group checkbox-wrapper">
          <input checked={get(data, 'name', false)} disabled={true} type="checkbox" id="html" />
          <label for="html">Certificate {key + 1} (optional)</label>
        </div>
        { get(data, 'name', false) !== false ?
          <div className="remove-btn" onClick={() => removeCertificate(key)}>Remove</div>
          :
          <>
            <input accept="image/*" type="file" id={key} onChange={(e) => uploadCerificate(e, key)} style={{ display: "none" }} />
            <div className="remove-btn" onClick={() => addCertificate(key)}>Add</div>
          </>
        }
      </li>
    )
    )
  )

  function addMore() {
    setCertificate(oldArray => [...oldArray, {}]);
  }

  function uploadWorkLicense(file){
    const formData = new FormData();
    formData.append('files', file)
    dispatch({ type: "UPLOAD_REQUEST", payload: {files: formData, key: 'workLicense' }})
    setWorkLicense(file)
  }

  function uploadTaxationIdentityCard(file){
    const formData = new FormData();
    formData.append('files', file)
    dispatch({ type: "UPLOAD_REQUEST", payload: {files: formData, key: 'taxationIdentityCard' }})
    setTaxationIdentityCard (file)
  }

  function onSubmit() {
    const error = {}
    if (name == '') {
      error.name = "Required"
    } if (location == '') {
      error.location = "Required"
    } if (about == '') {
      error.about = "Required"
    } if (get(workLicense, '_id', false) === false) {
      error.workLicense = "Required"
    } if (get(taxationIdentityCard, '_id', false) === false) {
      error.taxationIdentityCard = "Required"
    }
    setError(error)
    if (!Object.keys(error).length) {
      const userFormData = {
        fullName: name,
        companyName: companyName,
        location: location,
        description: about,
        email: phone,
        phone: email, 
        proof: []
      }
      userFormData.proof.push({"name": "Work License", document: get(workLicense, '_id', '')})
      userFormData.proof.push({"name": "Taxation Identity Card", document: get(taxationIdentityCard, '_id', '')})
      // const formData = new FormData();
      // const userFormData = new FormData();
      // userFormData.append('fname', name)
      // userFormData.append('cname', companyName)
      // userFormData.append('location', location)
      // userFormData.append('description', about)
      // formData.append('doc[]', workLicense)
      // formData.append('doc[]', taxationIdentityCard)
      saveChanges.map((data) => { 
        if (get(data, '_id', false) !== false) {
          userFormData.proof.push({"name": "Certificate", document: get(data, '_id', '')})
        }
      })
      // dispatch({ type: "UPLOAD_REQUEST", payload: { formData } })
      // if(picture !== ''){
      //   userFormData.append('picture', picture)
      // }
      // router.push('/handyman-registration-complete')
      dispatch({ type: "BECOME_HYNDYMAN", payload: userFormData })


    }
  }
  console.log("userData", userData)
  return (
    <div className="profile-management">
      <div className="row">
        <div className="col-md-12">
          <div className="profile-manager m-3">
            <h1 className="mb-3">{t("handyRegis.title")}</h1>
            <p className="mb-5">
              {t("handyRegis.text")}
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-12">
          <div className="linked-accounts m-3">
            <div className="col-md-12 mb-5">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {picture === '' ?
                  <img
                    src={get(userData, 'picture', '') === '' ? "/assets/images/profile-pic.png" : userData.picture}
                    alt="testimonial2"
                    layout="responsive"
                    style={{ width: 200, height: 200, borderRadius: 100 }}
                  // width={236}
                  // height={236}
                  />
                  :
                  <img
                    src={get(picture, 'url', '/assets/images/profile-pic.png')}
                    alt="testimonial2"
                    layout="responsive"
                    style={{ width: 200, height: 200, borderRadius: 100 }}
                  />
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-12 profile-manager">
          <h5 className="head-regis">{t("handyRegis.formTitle")}</h5>
          <div className="d-flex flexwrap">
            <div className="small d-flex flex-column">
              <h3 className="label">{t("handyRegis.fName")}</h3>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="input mr-3"
                placeholder="Enter your name"
              />
              <p className="errormsg" style={{color: 'red'}}>{get(error, 'name', '')}</p>
            </div>
            <div className="small d-flex flex-column">
              <h3 className="label">{t("handyRegis.cName")}</h3>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                type="text"
                className="input"
                placeholder="Enter your company name"
              />
              <p className="errormsg" style={{color: 'red'}}>{get(error, 'companyName', '')}</p>
            </div>
          </div>

          <div className="d-flex flexwrap">
            <div className="small d-flex flex-column">
              <h3 className="label">{t("handyRegis.location")}</h3>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                className="input mr-3"
                placeholder="Enter your location"
              />
              <p className="errormsg" style={{color: 'red'}}>{get(error, 'location', '')}</p>
            </div>
          </div>

          <h3 className="label">{t("handyRegis.about")}</h3>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} type="text" className="textarea large" placeholder="" />
          <p className="errormsg">{get(error, 'about', '')}</p>
          <h5 className="head-regis mt-5">{t("handyRegis.cDetais")}</h5>

          <div className="d-flex flexwrap">
            <div className="small d-flex flex-column">
              <h3 className="label">{t("handyRegis.email")}</h3>
              <input
                value={phone}
                // onChange={(e) => setPhone(e.target.value)}
                type="text"
                readOnly={true}
                className="input mr-3"
                placeholder=""

              />
              <p className="errormsg" style={{color: 'red'}}>{get(error, 'phone', '')}</p>
            </div>
            <div className="small d-flex flex-column">
              <h3 className="label">{t("handyRegis.phone")}</h3>
              <input
                value={email}
                // onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="input"
                readOnly={true}
                placeholder=""

              />
              <p className="errormsg" style={{color: 'red'}}>{get(error, 'email', '')}</p>
            </div>
          </div>


          <h5 className="head-regis mt-5">{t("handyRegis.dDetails")}</h5>
          <ul className="upload-list">
            <li>
              <div className="form-group checkbox-wrapper">
                <input checked={get(workLicense, 'name', false)} disabled={true} type="checkbox" id="html" />
                <label for="html">Work License</label>
              </div>
              {get(workLicense, 'name', false) === false ?
                <>
                  <input accept="image/*" type="file" id={'workLicense'} onChange={(e) => uploadWorkLicense(e.target.files[0])} style={{ display: "none" }} />
                  <div className="remove-btn" onClick={() => addCertificate('workLicense')}>Add</div>
                </>
                :
                <div className="remove-btn" onClick={() => setWorkLicense({})}>Remove</div>
              }
              <p className="errormsg" style={{color: 'red'}}>{get(error, 'workLicense', '')}</p>
            </li>
            <li>
              <div className="form-group checkbox-wrapper">
                <input checked={get(taxationIdentityCard, 'name', false)} disabled={true} type="checkbox" id="html" />
                <label for="html">Taxation Identity Card</label>
              </div>
              {get(taxationIdentityCard, 'name', false) === false ?
                <>
                  <input accept="image/*" type="file" id={'taxationIdentityCard'} onChange={(e) => uploadTaxationIdentityCard(e.target.files[0])} style={{ display: "none" }} />
                  <div className="remove-btn" onClick={() => addCertificate('taxationIdentityCard')}>Add</div>
                </>
                :
                <div className="remove-btn" onClick={(e) => setTaxationIdentityCard({})}>Remove</div>
              }
              <p className="errormsg" style={{color: 'red'}}>{get(error, 'taxationIdentityCard', '')}</p>
            </li>
            {renserCertificate()}
          </ul>




          <div onClick={addMore} className="addmore-btn cursur-pointer">Add More</div>
          <p className="note"><span>{t("handyRegis.note")}:</span>{t("handyRegis.nText")}</p>
          {/* <Link href="/handyman-registration-complete"> */}
          <button disabled={(hyndymanLoading && uploadDocLoading)} className="btn primarybtn-fill" onClick={onSubmit}>{t("handyRegis.submitBtn")}</button>






          {/* <div>
         <Tab>BANK DETAILS</Tab>
         </div>
                 */}
          {get(userData, 'approved', false) === "approved" &&
            <>
              <div className="small d-flex flex-column">
                <h5 className="head-regis mt-5">{t("BANK DETAILS")}</h5>
                <h3 className="label">{t("Bank Name")}</h3>
                <input
                  value={bankName}
                  onChange={(e) => setbankName(e.target.value)}
                  type="text"
                  className="input"
                  readOnly={false}
                  placeholder="BOI"
                />
                <p className="errormsg" style={{color: 'red'}}>{get(error, 'bankName', '')}</p>
              </div>


              <div className="small d-flex flex-column">
                <h3 className="label">{t("Account Number")}</h3>
                <input
                  value={accountNumber}
                  onChange={(e) => setaccountNumber(e.target.value)}
                  type="text"
                  className="input"
                  readOnly={false}
                  placeholder="8833101000000"
                />
                <p className="errormsg" style={{color: 'red'}}>{get(error, 'accountNumber', '')}</p>
              </div>


              <div className="small d-flex flex-column">
                <h3 className="label">{t("IFSC Code")}</h3>
                <input
                  value={iFSCCode}
                  onChange={(e) => setiFSCCode(e.target.value)}
                  type="text"
                  className="input"
                  readOnly={false}
                  placeholder="BKID23242"
                />
                <p className="errormsg" style={{color: 'red'}}>{get(error, 'iFSCCode', '')}</p>
              </div>



              <button className="btn primarybtn-fill" onClick={onChanges}>{t("Save Bank Detail")}</button>
            </>
          }
          {/* </Link> */}
          {/* {get(userData, 'approved', false) === "approved" && */}
          {/* <Elements stripe={stripePromise}>
              <PaymentCard type="handyman" />
            </Elements> */}
          {/* } */}
        </div>


      </div>

    </div>


  );
}


export default withTranslation('common')(ProfileManagement)
