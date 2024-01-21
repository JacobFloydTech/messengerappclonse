import { redirect } from '@sveltejs/kit';
import Cookies from 'js-cookie'
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async({cookies}) => { 
    const token = cookies.get('token')
    const req = await fetch('http://localhost:3000/verifyToken', { 
        method: "POST",
        body: JSON.stringify({token})
    });
    const {verify, newToken, id} = await req.json();
    Cookies.set('token', newToken)
    if (!verify) { return redirect(307, '/login')}
    return {id}
}