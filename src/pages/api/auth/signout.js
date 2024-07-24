
export const GET = async ({cookies, redirect}) => {

    cookies.delete("__session", { path: "/" });
    
    return redirect("/signin");
};
