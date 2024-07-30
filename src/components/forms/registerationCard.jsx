import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button, buttonVariants }from '@/components/ui/button'
import { Loader2, Check } from "lucide-react";

// form states loading, error, success, draft
const FORM_STATES = {
    DRAFT: 'draft',
    LOADING: 'loading',
    ERROR: 'error',
    SUCCESS: 'success'
}

function RegistrationCard(props) {
    const [formState, setFormState] = useState(FORM_STATES.DRAFT);
    const [error, setError] = useState(null);

    // handle the registeration form submission
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // form is loading
        setFormState(FORM_STATES.LOADING);

        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async res => {
            // handle error resopnse
            if(res.ok === false) {
                // check error message
                const errorMessage = await res.text();
                return Promise.reject(new Error(errorMessage));
            }

            // form is success
            setFormState(FORM_STATES.SUCCESS);
            if(res.redirected) {
                setTimeout(() => {
                    // redirect to login page
                    window.location.assign(res.url);
                },1000);
            }
        })
        .catch(err => {
            // form has error
            setFormState(FORM_STATES.ERROR);
            setError(err.message);
        })

    }


    return (
        <Card className="w-[350px]">
        <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Already have an account? <a className={buttonVariants({variant: "link"}) + " !p-0"} href="/signin">Login</a></CardDescription>
        </CardHeader>
        <CardContent>

        <form id="registeration-form" onSubmit={onSubmit} >
        <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" id="name" placeholder="Name" required/>
        </div>

        <div className="flex flex-col space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" id="email" placeholder="Email" />
        </div>

        <div className="flex flex-col space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" id="password" placeholder="Password" />
        </div>

        </div>
        </form>
        </CardContent>
        <CardFooter className="flex-wrap gap-2">
        <Button type="submit" form="registeration-form" className="basis-full" disabled={formState === FORM_STATES.LOADING}>
        {formState == FORM_STATES.LOADING && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
        {formState == FORM_STATES.SUCCESS && <Check className="mr-2 h-4 w-4"/>}
        Register</Button>
        {error && <p className="text-red-400 text-sm font-medium leading-none">{error}</p>}
        </CardFooter>
        </Card>
    );
}

export default RegistrationCard;
