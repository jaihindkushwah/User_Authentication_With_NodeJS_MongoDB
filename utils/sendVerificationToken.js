const nodemailer=require("nodemailer");


const sendVerificationToken= async(email,verificationToken)=>{
    const transport=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'jaihindkushwaha672001@gmail.com',
            pass: process.env.EMAIL_PASS,
        }
    }); 
    const mailOptions={
        from:"Image.com",
        to:email,
        subject:'Email verification',
        // text:`Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
        html:`<div>
            <h1>Email verification token</h1>
            <a href="http://localhost:8000/api/verify/${verificationToken}">Click here to verify</a>
        </div>`
    };
    try {
        await transport.sendMail(mailOptions);
        console.log("Verification email sent successfully");
    } catch (error) {
        console.log("error while sending mail");
    }
    
}
module.exports={sendVerificationToken};