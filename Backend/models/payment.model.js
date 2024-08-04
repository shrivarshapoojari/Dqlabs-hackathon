import {model,Schema} from 'mongoose'

const  paymentSchema=new Schema({
 
payment_id:{
    type:String,
    required:true
},
subscription_id:{
    type:String,
    required:true
},
signature:{
    type:String,
    required:true
}
    
});

const Payment =model('Payment',paymentSchema);
export default Payment;