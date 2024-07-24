import { getAuth } from 'firebase-admin/auth';
import { app } from '../../../firebase/server';

export const prerender = false;

export const POST = async ({request, redirect}) => {

    const auth = getAuth(app);

    // get form data
    const formData = await request.formData();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const name = formData.get('name')?.toString();

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
        return new Response("Something went wrong", {status: 400});
    }

    return redirect("/signin");
};
