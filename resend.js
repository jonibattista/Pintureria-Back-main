import { Resend } from 'resend';

const resend = new Resend('re_czJyUETw_H4V5PtYVgdg8VuBEHkD9yiiv');

const email = async() => {
    try {
        const res = await resend.emails.send({
           from: 'Acme <onboarding@resend.dev>',
           to: ['abirchmeyer@frro.utn.edu.ar'],
           subject: 'hello world',
           html: '<p>it works!</p>',
      });
      console.log(res);
        
    } catch (error) {
        console.log(error);
    }

}

email();