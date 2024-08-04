
import AppError from '../utils/appError.js';
import sendEmail from '../utils/sendEmail.js';





export const contactUs = async (req, res, next) => {

    // Destructuring the required data from req.body
    const { name, email, message } = req.body;
  
    // Checking if values are valid
    if (!name || !email || !message) 
    {
      return next(new AppError('Name email message required'));
    }
  
    try {
      const subject = 'Contact Us Form';
      const textMessage = `${name} - ${email} <br /> ${message}`;
  
      // Await the send email
      await sendEmail(process.env.CONTACT_US_EMAIL, subject, textMessage);
    } 
    catch (error) 
    {
      console.log(error);
      return next(new AppError(error.message, 400));
    }
  
    res.status(200).json({
      success: true,
      message: 'Your request has been submitted successfully',
    });
  };