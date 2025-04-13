import nodemailer from 'nodemailer';

//configure the email transport using the default SMTP transport and a GMail account.*

const transporter=nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port:587,
    secure:false,
    auth:{
        user: process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    },
    debug:true,
    logger:true,

});

export const sendAccountCreationEmail = async(name: string | null, email: string, password: string) => {
    try {
        await transporter.sendMail({
            from: `Admin <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: 'Your Account Has Been Created',
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Account Created</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f9; color: #333333;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="padding: 30px 0; text-align: center; background-color: #4a6ee0;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Account Created</h1>
                            </td>
                        </tr>
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <h2 style="margin-top: 0; color: #4a6ee0; font-size: 22px; font-weight: 600;">Welcome, ${name}!</h2>
                                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">Your account has been created successfully. You can now access our platform using the credentials below:</p>
                                
                                <div style="background-color: #f8f9fa; border-left: 4px solid #4a6ee0; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
                                    <p style="font-size: 16px; margin: 0 0 10px 0;"><strong style="color: #4a6ee0;">Email:</strong> ${email}</p>
                                    <p style="font-size: 16px; margin: 0;"><strong style="color: #4a6ee0;">Password:</strong> ${password}</p>
                                </div>
                                
                                <div style="background-color: #fff8e6; border-left: 4px solid #f6c23e; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
                                    <p style="color: #856404; font-size: 16px; margin: 0;"><strong>Important:</strong> For security reasons, please change your password upon your first login.</p>
                                </div>
                                
                                <a href="#" style="display: inline-block; background-color: #4a6ee0; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 4px; font-weight: 600; margin: 20px 0;">Login Now</a>
                                
                                <p style="font-size: 16px; line-height: 1.6; margin-top: 25px; margin-bottom: 10px;">If you have any questions, please don't hesitate to contact our support team.</p>
                                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 0;">Thank you for joining us!</p>
                            </td>
                        </tr>
                        <!-- Footer -->
                        <tr>
                            <td style="padding: 20px 30px; background-color: #f4f7f9; text-align: center; border-top: 1px solid #e3e8ec;">
                                <p style="color: #77869e; font-size: 14px; margin: 0;">© 2025 Your Company. All rights reserved.</p>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        });
        console.log('Email sent successfully!');
        return true;
    } catch(err) {
        console.error('Error in sendAccountCreationEmail:', err);
        return false;
    }   
}

export const sendAccountUpdateEmail = async(name: string | null, email: string, updatedFields: string[], updatedValues: string[]) => {
    try {
        await transporter.sendMail({
            from: `Admin <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: 'Your Account Has Been Updated',
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Account Updated</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f9; color: #333333;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="padding: 30px 0; text-align: center; background-color: #4a6ee0;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Account Updated</h1>
                            </td>
                        </tr>
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <h2 style="margin-top: 0; color: #4a6ee0; font-size: 22px; font-weight: 600;">Hello${name ? ', ' + name : ''}!</h2>
                                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">Your account has been updated successfully. Please review the changes below:</p>
                                
                                <div style="background-color: #f8f9fa; border-left: 4px solid #4a6ee0; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
                                    <h3 style="margin-top: 0; margin-bottom: 15px; color: #4a6ee0; font-size: 18px;">Account Changes</h3>
                                    <table style="width: 100%; border-collapse: collapse;">
                                        <tr style="border-bottom: 1px solid #e3e8ec;">
                                            <th style="text-align: left; padding: 10px 5px; color: #77869e; font-weight: 600;">Field</th>
                                            <th style="text-align: left; padding: 10px 5px; color: #77869e; font-weight: 600;">New Value</th>
                                        </tr>
                                        ${updatedFields.map((field, index) => `
                                            <tr style="border-bottom: 1px solid #e3e8ec;">
                                                <td style="padding: 10px 5px; font-weight: 500;">${field}</td>
                                                <td style="padding: 10px 5px;">${index < updatedValues.length ? updatedValues[index] : ''}</td>
                                            </tr>
                                        `).join('')}
                                    </table>
                                </div>
                                
                                <div style="background-color: #fff8e6; border-left: 4px solid #f6c23e; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
                                    <p style="color: #856404; font-size: 16px; margin: 0;"><strong>Security Notice:</strong> If you did not make these changes, please contact our support team immediately.</p>
                                </div>
                                
                                <a href="#" style="display: inline-block; background-color: #4a6ee0; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 4px; font-weight: 600; margin: 20px 0;">View Account</a>
                                
                                <p style="font-size: 16px; line-height: 1.6; margin-top: 25px;">Thank you for being a valued member of our community!</p>
                            </td>
                        </tr>
                        <!-- Footer -->
                        <tr>
                            <td style="padding: 20px 30px; background-color: #f4f7f9; text-align: center; border-top: 1px solid #e3e8ec;">
                                <p style="color: #77869e; font-size: 14px; margin: 0;">© 2025 Your Company. All rights reserved.</p>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        });
        console.log('Email update sent successfully!');
        return true;

    } catch(err) {
        console.error('Error in sendAccountUpdateEmail:', err);
        return false;
    }
}


export const sendPasswordResetOTP = async(email: string, otp: string, name: string | null) => {
    try {
        await transporter.sendMail({
            from: `Admin <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: 'Your Password Reset Code',
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Password Reset Code</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f9; color: #333333;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="padding: 30px 0; text-align: center; background-color: #4a6ee0;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Password Reset Code</h1>
                            </td>
                        </tr>
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <h2 style="margin-top: 0; color: #4a6ee0; font-size: 22px; font-weight: 600;">Hello${name ? ', ' + name : ''}!</h2>
                                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">You've requested a password reset for your account. Please use the verification code below to complete the reset process:</p>
                                
                                <div style="background-color: #f8f9fa; border-left: 4px solid #4a6ee0; padding: 20px; margin-bottom: 25px; border-radius: 4px; text-align: center;">
                                    <h3 style="margin-top: 0; margin-bottom: 15px; color: #4a6ee0; font-size: 18px;">Your Reset Code</h3>
                                    <p style="font-family: monospace; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; color: #333333;">${otp}</p>
                                    <p style="color: #77869e; font-size: 14px; margin: 0;">This code will expire in 15 minutes</p>
                                </div>
                                
                                <div style="background-color: #fff8e6; border-left: 4px solid #f6c23e; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
                                    <p style="color: #856404; font-size: 16px; margin: 0;"><strong>Security Notice:</strong> If you did not request this password reset, please ignore this email or contact our support team immediately.</p>
                                </div>
                                
                                <a href="#" style="display: inline-block; background-color: #4a6ee0; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 4px; font-weight: 600; margin: 20px 0;">Back to Login</a>
                                
                                <p style="font-size: 16px; line-height: 1.6; margin-top: 25px;">Thank you for being a valued member of our community!</p>
                            </td>
                        </tr>
                        <!-- Footer -->
                        <tr>
                            <td style="padding: 20px 30px; background-color: #f4f7f9; text-align: center; border-top: 1px solid #e3e8ec;">
                                <p style="color: #77869e; font-size: 14px; margin: 0;">© 2025 Your Company. All rights reserved.</p>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        });
        console.log('Password reset OTP sent successfully!');
        return true;
    } catch(err) {
        console.error('Error in sendPasswordResetOTP:', err);
        return false;
    }
}

export const sendPasswordChangeConfirmation = async(email: string, name: string | null) => {
    try {
        await transporter.sendMail({
            from: `Admin <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: 'Your Password Has Been Changed',
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Password Changed</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f9; color: #333333;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="padding: 30px 0; text-align: center; background-color: #4a6ee0;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Password Changed</h1>
                            </td>
                        </tr>
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <h2 style="margin-top: 0; color: #4a6ee0; font-size: 22px; font-weight: 600;">Hello, ${name}!</h2>
                                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">Your password has been successfully changed. Your account is now secured with your new password.</p>
                                
                                <div style="background-color: #e7f7ee; border-left: 4px solid #28a745; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
                                    <p style="color: #155724; font-size: 16px; margin: 0;"><strong>Success:</strong> Your password update is complete. You can now log in using your new credentials.</p>
                                </div>
                                
                                <div style="background-color: #fff8e6; border-left: 4px solid #f6c23e; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
                                    <p style="color: #856404; font-size: 16px; margin: 0;"><strong>Security Notice:</strong> If you did not make this change, please contact our support team immediately.</p>
                                </div>
                                
                                <a href="#" style="display: inline-block; background-color: #4a6ee0; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 4px; font-weight: 600; margin: 20px 0;">Go to Login</a>
                                
                                <p style="font-size: 16px; line-height: 1.6; margin-top: 25px;">If you have any questions, please don't hesitate to contact our support team at <a href="mailto:support@yourcompany.com" style="color: #4a6ee0; text-decoration: none; font-weight: 500;">support@yourcompany.com</a>.</p>
                                
                                <p style="font-size: 16px; line-height: 1.6; margin-top: 25px;">Thank you for being a valued member of our community!</p>
                            </td>
                        </tr>
                        <!-- Footer -->
                        <tr>
                            <td style="padding: 20px 30px; background-color: #f4f7f9; text-align: center; border-top: 1px solid #e3e8ec;">
                                <p style="color: #77869e; font-size: 14px; margin: 0;">© 2025 Your Company. All rights reserved.</p>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        });
        console.log('Password change confirmation email sent successfully!');
        return true;
    } catch(err) {
        console.error('Error in sendPasswordChangeConfirmation:', err);
        return false;
    }
}