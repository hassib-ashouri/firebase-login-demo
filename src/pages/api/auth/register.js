import { getAuth } from 'firebase-admin/auth';
import { app } from '../../../firebase/server';

export const prerender = false;

export const POST = async ({request, redirect}) => {

    const auth = getAuth(app);

    // get form data
    const data = await request.json();
    const email = data.email;
    const password = data.password;
    const name = data.name

    if(!email || !password || !name){
        return new Response("Missing fields", {status: 400});
    }

    /* create user */
    try {
        await auth.createUser({
            email,
            password,
            displayName: name
        });
    } catch(e) {
        console.error(e);
        let errorMessage = "Something went wrong";
        if(e.errorInfo) {
            errorMessage = e.errorInfo.message;
        }
        return new Response(errorMessage, {status: 400});
    }

    return redirect("/signin");
};
