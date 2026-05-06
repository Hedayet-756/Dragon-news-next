import dns from "node:dns";
dns.setServers(['8.8.8.8', '8.8.4.4']);


// src/proxy.js
import { NextResponse } from "next/server";

export async function proxy(request) {
    // Better Auth সেশন টোকেন কুকি থেকে রিড করা
    const sessionToken = request.cookies.get("better-auth.session_token");

    // যদি কুকি না থাকে, তবে লগইন পেজে পাঠিয়ে দিন
    if (!sessionToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // কুকি থাকলে রিকোয়েস্টটি এগিয়ে যেতে দিন
    return NextResponse.next();
};

export const config = {
    matcher: ['/career', '/news/:path*'],
};


// import { NextResponse } from "next/server";
// import { auth } from "../lib/auth";
// import { headers } from "next/headers";

// export async function proxy(request) {
//     // console.log('Proxy middleware hit for:', request);

//     const session = await auth.api.getSession({
//         headers: await headers()
//     })
//     console.log('Session in proxy:', session);

//     // const isLoggedIn = false; // Replace with actual authentication logic

//     if (session) {
//         return NextResponse.next();
//     }
//     return NextResponse.redirect(new URL('/login', request.url))
// };

// export const config = {
//     matcher: ['/career', '/news/:path*'],
// };