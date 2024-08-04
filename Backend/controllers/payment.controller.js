import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import { razorpay } from "../server.js";
import AppError from "../utils/appError.js";
import crypto from 'crypto'
export const getRazorpayApiKey = async (req, res, next) => {

try{
    res.status(200).json({
        success:true,
        message:"RaorPay Key",
        key:process.env.RAZORPAY_API_KEY
    })

}
catch(e)
{
    return next(new AppError(e.message,500))
}







};

export const buySubscription = async (req, res, next) => {

    try{
        const {id}=req.user;
        
        const user=await User.findById(id);

         
        if(!user)
        {
            return next(new AppError("User Not found",404))
        }
         
        if(user.role=='ADMIN')
        {
            return next (new AppError("Admin cant buy subscription",400))
        }

        const subscription= await razorpay.subscriptions.create({
            plan_id:process.env.RAZORPAY_PLAN,
            customer_notify:1 ,//sends mail to customer
            total_count:12 // charge for every 1 year
        })
        // console.log(subscription)
        // update userr with subscription
       
       
        user.subscription.id=subscription.id;
        user.subscription.status=subscription.status
       
        console.log()
        console.log(user.subscription.id)
           await user.save();
           res.status(200).json({
            subscription_id: subscription.id,
            success:true,
            message:" Subscribed Successfully"
           })
    }
    catch(e)
    { console.log(e)
        return next(new AppError(e.message,500))
       
    }
    











};

export const verifySubscription = async (req, res, next) => {

    try{
           const {id}=req.user;
           if(!id)
           {
               return next(new AppError("User id not found",404))
           }
           const user = await User.findById(id);
           if(!user)
           {
               return next(new AppError("User Not found",404))
           }
           const subscriptionId = user.subscription.id;

           const {razorpay_payment_id,razorpay_signature,razorpay_subscription_id}=req.body;
            
           const generatedSignature = crypto
           .createHmac('sha256', process.env.RAZORPAY_SECRET)
           .update(`${razorpay_payment_id}|${subscriptionId}`)
           .digest('hex');
             console.log(generatedSignature)
             console.log(razorpay_signature)

                                        if(generatedSignature!==razorpay_signature)
                                        {
                                            return next(new AppError("Error in verifying payment, plz contact support team wit payment details",500))
                                        }
  // Record Payment Details in Database
    await Payment.create({
        payment_id:razorpay_payment_id,
        subscription_id:razorpay_subscription_id,
        signature:razorpay_signature
        
    })
  // update user model with successful payment
  user.subscription.status='active';
  await user.save();


  res.status(200).json({
    success:true,
    message:"Payment Verified"
  })



    

    } 
    catch(e)
    {
        console.log(e)
        return next(new AppError(e.message,400))
        
    }
    
};

export const cancelSubscription = async (req, res, next) => {
    const { id } = req.user;

  // Finding the user
  const user = await User.findById(id);

  // Checking the user role
  if (user.role === 'ADMIN') {
    return next(
      new AppError('Admin does not need to cannot cancel subscription', 400)
    );
  }

  // Finding subscription ID from subscription
  const subscriptionId = user.subscription.id;

  // Creating a subscription using razorpay that we imported from the server
  try {
    const subscription = await razorpay.subscriptions.cancel(
      subscriptionId // subscription id
    );

    // Adding the subscription status to the user account
    user.subscription.status = subscription.status;

    // Saving the user object
    await user.save();
  } catch (error) {
    // Returning error if any, and this error is from razorpay so we have statusCode and message built in
    return next(new AppError(error.error.description, error.statusCode));
  }

  // Finding the payment using the subscription ID
  const payment = await Payment.findOne({
    razorpay_subscription_id: subscriptionId,
  });

  // Getting the time from the date of successful payment (in milliseconds)
  

  // refund period which in our case is 14 days
   

  // If refund period is valid then refund the full amount that the user has paid
  

  user.subscription.id = undefined; // Remove the subscription ID from user DB
  user.subscription.status = undefined; // Change the subscription Status in user DB

  await user.save();
  

  // Send the response
  res.status(200).json({
    success: true,
    message: 'Subscription canceled successfully',
  });
    
};

export const getAllPayments = async (req, res, next) => {
    try{
        const {count}=req.query;
        const subscriptions=razorpay.subscriptions.all({
            count: count ||10,
        });

        res.status(200).json({
            success:true,
            message:'All Payments',
            payments:subscriptions
        })

    }
    catch(e)
    {
        return next(new AppError(e.message,500))
    }
    
};
