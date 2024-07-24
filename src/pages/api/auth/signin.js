import { app } from '../../../firebase/server';
import { getAuth } from 'firebase-admin/auth';

export const GET = async ({request, cookies, redirect}) => {
    const auth = getAuth(app);


    // get token from request headers
    const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];
    if(!idToken){
        return new Response('No token found', {status: 401});
    }

    // Verify idtoken
    try {
        await auth.verifyIdToken(idToken);
    } catch(e) {
        return new Response('Invalid token', {status: 401});
    }

    const fiveDays = 5 * 24 * 60 * 60 * 1000;
    const sessionCookies = await auth.createSessionCookie(idToken, {expiresIn: fiveDays});

    cookies.set("__session", sessionCookies, { path: "/"} );

    return redirect("/dashboard");
};
