
import Image from "next/image";
import Link from "next/link"
import Reviews from "../Reviews/Reviews";
import ServiceCard from "../ServiceCard/ServiceCard";
import { get } from "lodash"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useCallback } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import moment from "moment"
import {FacebookShareButton , WhatsappShareButton ,   TwitterShareButton, EmailShareButton } from "react-share"
import {EmailIcon, FacebookIcon, WhatsappIcon, FacebookMessengerIcon, TwitterIcon} from "react-share";

const questions = [{
  type: "field",
  accept: "text",
  name: "What is your age?",
  required: true
}, {
  type: "option",
  options: ["India", "Germany"],
  name: "Select Country",
  required: true
}]
export default function PackingService(props) {
  const dispatch = useDispatch()
  const [loader,setLoader]=useState(false)
  const [formSubmit, setForm] = useState(false)
  const [wishList, setWishList] = useState(false)
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const { inqueryForm, inqueryData, userData ,ws} = useSelector(state => ({
    inqueryForm: state.services.inqueryForm,
    inqueryData: state.services.inqueryData,
    userData: state.user.user,
    ws: state.services.ws,
  }));

  const moreService = () => (
    get(props, 'gig.related', []).map((data, key) => (
      <div key={key} className="col-md-4">
        <ServiceCard data={data} />
      </div>
    ))
  )

  const renderInputs = () => (
    get(props, 'gig.serivce.form', []).map((data, key) => (
      data.type === "text" ?
        <input
          key={key}
          id={data.id}
          type="text"
          className="input large"
          name={data.name}
          placeholder={data.name}
          required={true}
          validationMessage={data.name + 'is required'}
        />
        : data.type === "number" ?
          <input
          key={key}
          id={data.id}
          type="number"
          className="input large"
          name={data.name}
          placeholder={data.name}
          required={true}
          validationMessage={data.name + 'is required'}
        />
        : data.type === "option" ?
          <select
            key={key}
            className="input large"
            id={data.id}
            name={data.name}
            placeholder={data.name}
            required={true}
            validationMessage={data.name + 'is required'}
          >
            {data.options.map((opt, key) => (
              <option key={key} value={opt}>{opt}</option>
            ))
            }
          </select>
          : <></>
    ))
  )

  function submitForm(e) {



    setLoader(true)
    e.preventDefault()
    
    const allInput = e.target.querySelectorAll('input, select, textarea')
    const input = Array.prototype.slice.call(allInput)
    const answers = {}
    input.map((data) => {
      answers[data.name] = (data.value)
    })

    const user = JSON.parse(localStorage.getItem('user'))
    const payload ={gig: get(props, 'gig._id', ''), initiate: answers,amount:0,state:"false",clientStatus:"Awaiting" ,["buyer"]: user.id  }
    get(ws.ws, "on", false) &&   ws.ws.emit("order", payload, (error) => {
      if(error.success===true){
        setLoader(false)
      setForm(true)
      }

    })
    // dispatch({ type: 'FORM_REQUEST', payload: { gig: get(props, 'gig._id', ''), initiate: answers,amount:0,state:"false",clientStatus:"disputed" } })
  }

  useEffect(() => {
    if (get(inqueryData, 'error', false)) {
      dispatch({ type: 'RESET_FORM' })
      if (get(inqueryData, 'message', 'Please try again') === "No Auth Token") {
        NotificationManager.error('Please login')
        dispatch({ type: 'LOGIN_REQUIRED' })
      } else {
        dispatch({ type: 'RESET_FORM' })
        NotificationManager.error(get(inqueryData, 'message', 'Please try again'))
      }
    } else if (get(inqueryData, 'code', false) == 401) {
      dispatch({ type: 'RESET_FORM' })
      NotificationManager.error('Please login')
      dispatch({ type: 'LOGIN_REQUIRED' })
    } else if (get(inqueryData, 'success', false)) {
      
      setForm(true)
    }
    console.log(inqueryData,"inquer")
  }, [inqueryData])

  useEffect(() => {
    const getWish = get(userData, 'wishlist', [])
    const wish = getWish.includes(get(props, 'data._id', false))
    setWishList(wish)
  }, [userData.wishlist])

  function setWish() {
    const wish = !wishList
    setTimeout(()=>{
    if (wish) {
      dispatch({ type: 'ADD_WISH', payload: { gigId: get(props, 'data._id', '') } })
    } else {
      dispatch({ type: 'REMOVE_WISH', payload: { gigId: get(props, 'data._id', '') } })
    }
    }, 500)
    setWishList(wish)
  }
 
  return (

    <div className="packing-service">
  
      <div className="heading d-flex align-items-center justify-content-start flexwrap">
        <div className="col-md-2 mr-4 service-image">
          <Image
            src="/assets/images/howitwork2.jpg"
            alt="image"
            layout="responsive"
            width={100}
            height={100}
          />
        </div>
        <div className="title-section d-flex flex-column justify-content-center flexwrap">
          <h2 className="mb-3">{get(props, 'data.title', '')}</h2>
          <div className="d-flex justify-content-between flexwrap">
            <div className="d-flex align-items-center flexwrap">
              <h4 className="secondary handyman-name"><Link href={`/sellerprofile?id=${get(props, 'gig._id', '')}`}>{get(props, 'data.sellerPersonalInfo.fname', '')}</Link></h4>{" "}
              <div className="ml-3 mr-3">
                <i className="fa fa-star" aria-hidden="true"></i>
              </div>
              <h5>4.68 (110 Reviews)</h5>
            </div>
            <div className="d-flex align-items-center justify-content-end flex-wrap">
              <div>
                <button className="btn d-flex align-items-center justify-content-center share-save">
                  <i className="fa fa-share-square" aria-hidden="true"></i>
                  <p className="ml-2 h4">Share</p>
                </button>
              </div>
              <div>
              {wishList === true ?
                <button onClick={setWish} className="btn m-2 d-flex align-items-center justify-content-center share-save true">                  
                    <i className="fa fa-heart selected" fill="#9043C3" style={{fill: "#9043C3"}} aria-hidden="true"></i>
                  <p className="ml-2 h4">Save</p>
                </button>
                :
                <button onClick={setWish} className="btn m-2 d-flex align-items-center justify-content-center share-save false">                  
                <i className="fa fa-heart" style={{fill :"#000"}} aria-hidden="true"></i>
              <p className="ml-2 h4">Save</p>
            </button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="body mt-5 d-flex align-items-center justify-content-between flexwrap">
        <div className="image m-4">
          <div className="image-area">
            <Image
              src="/assets/images/spotlight1.jpg"
              alt="handyman1"
              layout="responsive"
              width={600}
              height={550}
            />
          </div>
        </div>
        <div className="d-flex flex-column align-items-start justify-content-center width-full">
        
          {formSubmit ?
            <>Your details have been submitted, once the handyman confirms you will receive a notification in the messages tab on the menu.</>
            :
            <div style={ {position:"relative"} } className="form p-5 form-full">
              <p className="mb-3 h5 font-weight-bold">
                Fill This Form & Get A Free Price Quote
            </p>
              <form onSubmit={submitForm}>
              {
            loader && <>
            <div style={{position:"absolute",bottom:"90px",right:"50px"}}>
            <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
            </div>
          
            </>
          }
                {renderInputs()}
           
                {/* <input type="text" className="input small" placeholder="Name" />
            <input type="email" className="input small" placeholder="Email" />
            <div className="d-flex flexwrap">
              <input
                type="text"
                className="input mr-2"
                placeholder="Shifting From?"
              />
              <input
                type="text"
                className="input ml-2"
                placeholder="Shifting To?"
              />
            </div>
            <input
              type="text"
              className="input large"
              placeholder="Date of Service"
            />
            <input
              type="text"
              className="input large"
              placeholder="Time of Service"
            /> */}

                <div className="m-4 text-center">
                  <button type="submit" className="btn btn-primary" disabled={inqueryForm}>Submit</button>
                </div>
              </form>
            </div>
          }
        </div>
      </div>

      <div className="row about-services">
        <div className="col-lg-6 col-sm-12">
          <h3>About This Service</h3>
          <p>
            {get(props, 'data.description', '')}
          </p>
          {/* <p>
              We aim at customer satisfaction and continual quality improvement. Therefore all our services are modified to suit client’s needs and requirements. 
            </p> */}
        </div>
        <div className="col-lg-6 col-sm-12">
          <h3>About The Seller</h3>
          <ul>
            <li>
              <h5>From :</h5>
              <h4>{get(props, 'data.sellerPersonalInfo.state', '')}, {get(props, 'data.sellerPersonalInfo.country', '')}</h4>
            </li>
            <li>
              <h5>Member Since :</h5>
              <h4>{moment(get(props, 'data.createdAt', '')).format('MMM YYYY')}</h4>
            </li>
          </ul>
          <p>Marie Adolfo was our Handyman. She went above and beyond the assigned call of duty. All of her work was first class, very quick and extremely professional. She even worked on repairing a broken window in our lawn outside in a rain storm! </p>
        </div>
      </div>


      <div className="rating-section p-5">
        <h3 className="text-center mb-5">Customer Reviews and Ratings</h3>
        <div className="row">
          <div className="col">
            <Reviews />
          </div>
          <div className="col">
            <Reviews />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Reviews />
          </div>
          <div className="col">
            <Reviews />
          </div>
        </div>
        <div className="mt-4">
          <Link href='/sellerprofile'><button className="btn btn-primary-rd">Read all 112+ Reviews</button></Link>
        </div>
      </div>
      <div className="more-services mt-5">
        <h1 className="mb-5 span-cursur">
          More Services by <Link href={`/sellerprofile?id=${get(props, 'gig._id', '')}`}><span className="name">{get(props, 'gig.sellerPersonalInfo.fname', '')}</span></Link>
        </h1>
        <div className="row ">
          {moreService()}
          {/* <div className="col-md-4">
            <ServiceCard />
          </div>
          <div className="col-md-4">
            <ServiceCard />
          </div> */}
        </div>
      </div>
    </div>
  );
}
