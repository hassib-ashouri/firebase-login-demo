import { app } from '../firebase/server.js';
import { getAuth } from 'firebase-admin/auth'

async function getAuthenticatedUser(cookies) {
    let user = null;
    const auth = getAuth(app);

    /* check current session */
    if(!cookies.get('__session')) {
        return user;
    }

    /* get the user */
    const sessionCookies = cookies.get('__session').value;
    const decodedCookies = await auth.verifySessionCookie(sessionCookies);
    user = await auth.getUser(decodedCookies.uid);


    return user;
}


export { getAuthenticatedUser };
