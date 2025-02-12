import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async(res,req) => {
    try {
    const response = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['abirchmeyer@frro.utn.edu.ar'],
        subject: 'hello world',
        html: '<p>it works!</p>',
      });
    console.log(response);
    res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

}
