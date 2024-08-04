import React, { useEffect } from 'react'
 import Second from '../../layouts/Second'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from '../../redux/slices/RazorpaySlice'
import toast from 'react-hot-toast'
import {BiRupee} from 'react-icons/bi'
const Checkout = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const razorpayKey =useSelector((state)=>state?.razorpay?.key)
    const subscription_id =useSelector((state)=>state?.razorpay?.subscription_id)
    const isPaymentVerified=useSelector((state)=>state?.razorpay?.isPaymentVerified)
    const userData=useSelector((state)=>state?.auth?.data)

    async function load()
    {
      await dispatch(getRazorPayId())
        await dispatch(purchaseCourseBundle())
    }

    const paymentDetails={
        razorpay_payment_id: '',
        razorpay_subscription_id: '',
        razorpay_signature:''
    }
    useEffect(()=>{
        load()
    },[])


    async function handleSubscription(e){
       e.preventDefault();
       if(!razorpayKey||!subscription_id)
       {
         toast.error("Cant find subscription id")
         return;
       }
       const options={
        key:razorpayKey,
        subscription_id:subscription_id,
        name:"MERNERA",
        description:"Subscription",
        theme:{
            color:'673ab7'
        },
        // when payment completed this method will be called
        handler: async function(response)
        {  console.log("RAZOR")
        console.log(response)
            paymentDetails.razorpay_payment_id=response.razorpay_payment_id
            paymentDetails.razorpay_subscription_id=response.razorpay_subscription_id
            paymentDetails.razorpay_signature=response.razorpay_signature
            toast.success("Payment Sucess")
            const res=await dispatch(verifyUserPayment(paymentDetails))
            console.log(res);
            res?.payload?.success ?navigate('/checkout/success'):navigate('/checkout/failed')
        }


       };
       const paymentOptions=new window.Razorpay(options)
       paymentOptions.open();
    }
   
  return (
    <Second>

    <form
        onSubmit={handleSubscription}
         className="min-h-[90vh] flex items-center justify-center text-white"
        >
            <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_100px_purple] rounded-lg relative">
                          <h1 className="bg-purple-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">Subscription Bundle</h1>
                    <div className="px-4 space-y-5 text-center">
                            <p className="text-[17px]">
                                      This purchase will allow you to access all available course
                                            of our platform for {" "} 
                            <span className="text-purple-500 font-bold">
                                <br />
                                1 Year
                            </span> { " " }
                            All the existing and new launched courses will be also available
                        </p>
                        <p className='flex items-center justify-center gap-1 text-2xl font-bold text-purple-500'>
                            <BiRupee/>
                            <span>499 only</span>
                        </p>
                        <div className='text-gray-200'>
                            <p>100%  refund on cancellation *</p>
                            <p>Terms and conditions apply </p>
                        </div>
                        <button
                                  type='submit'
                        className='bg-purple-500 hover:bg-purple-600 text-center px-2 py-4 absolute bottom-0 w-full left-0 rounded-b-lg text-2xl font-bold'  >
                            Buy Now
                        </button>
                 </div>
             </div>
     </form>
    </Second>
  )
}

export default Checkout
