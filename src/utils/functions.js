import { Navigate } from "react-router-dom";

export const parseJwt  = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};


export const CheckUserExpired = (pageStatus) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const { exp } = parseJwt(token);
    if (exp * 1000 < Date.now()) {

        localStorage.removeItem('token');
        if(pageStatus != "public") {
            Navigate.push({
                url: '/login?expired=true',
                animated: true
            });
        }
    }
}