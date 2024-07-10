'use strict'

import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify2 = async (token = '') => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, picture: img, email } = ticket.getPayload();

    console.log('Ticket:', ticket); // Agrega logs para ver información del ticket
    console.log('User data:', { name, img, email }); // Agrega logs para los datos del usuario

    return {
      name,
      img,
      email,
    };
  } catch (error) {
    console.error('Error during Google token verification:', error);
    throw error; // Re-lanza el error para que sea manejado fuera de esta función
  }
};

export {
  googleVerify2,
};
