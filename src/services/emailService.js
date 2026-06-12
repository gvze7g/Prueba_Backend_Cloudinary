import transporter from '../config/email.js';

export const sendVerificationEmail = async ( email, verificationCode) => {
    try{
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verificacion de cuenta',
         html: `
            <h2> API </h2>
            <p> Tu codigo de verificacion es: </p>
            <h1>${verificationCode}</h1>
            <p>Expira en 15 minutos </p>
            `
    });

 }catch(error){
    console.error (error.message)
    }
}

export const sendPasswordResetEmail = async (email, resetCode) => {
    try{
        await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reinicio de Contraseña',
        html: `
        <h2> API </h2>
        <p> Tu codigo de verificacion es: </p>
        <h1>${resetCode}</h1>
        <p>Expira en 15 minutos </p>
        `
        });
    }   catch(error){
        console.error (error.message)
    }
}