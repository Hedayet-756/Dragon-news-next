import dns from "node:dns";
dns.setServers(['8.8.8.8', '8.8.4.4']);


// import { NextResponse } from "next/server";

// export async function proxy(request) {
//     // Better Auth সেশন টোকেনটি পাওয়ার চেষ্টা করুন
//     const sessionToken = request.cookies.get("better-auth.session_token")?.value;

//     // লগ করার জন্য (এটি নেটলিফাই লগে দেখা যাবে)
//     console.log("Current Path:", request.nextUrl.pathname);
//     console.log("Session Token Found:", !!sessionToken);

//     // ১. যদি ইউজার লগইন পেজে থাকে এবং সেশন টোকেন থাকে, তবে তাকে ড্যাশবোর্ড বা হোম পেজে পাঠিয়ে দিন
//     if (request.nextUrl.pathname === "/login" && sessionToken) {
//         return NextResponse.redirect(new URL("/", request.url));
//     }

//     // ২. যদি ইউজার ক্যারিয়ার বা প্রটেক্টেড পেজে যাওয়ার চেষ্টা করে এবং সেশন না থাকে
//     if (!sessionToken) {
//         // নিশ্চিত করুন যে আমরা অলরেডি লগইন পেজে নেই (নাহলে ইনফিনিট লুপ হবে)
//         if (request.nextUrl.pathname !== "/login") {
//             const loginUrl = new URL("/login", request.url);
//             return NextResponse.redirect(loginUrl);
//         }
//     }

//     // সবকিছু ঠিক থাকলে রিকোয়েস্টটি এগিয়ে যেতে দিন
//     return NextResponse.next();
// }

// export const config = {
//     matcher: ["/career", "/news/:path*", "/login"], // লগইন পেজকেও ম্যাচারের ভেতরে রাখুন
// };



// // src/proxy.js
// import { NextResponse } from "next/server";

// // 'middleware' এর বদলে নাম পরিবর্তন করে 'proxy' করুন
// export async function proxy(request) {
//     // Better Auth সেশন টোকেন চেক করা
//     const sessionToken = request.cookies.get("better-auth.session_token")?.value;

//     // যদি সেশন টোকেন না থাকে, তবে লগইন পেজে রিডাইরেক্ট করুন
//     if (!sessionToken) {
//         const url = new URL("/login", request.url);
//         return NextResponse.redirect(url);
//     }

//     // সেশন থাকলে রিকোয়েস্টটি এগিয়ে যেতে দিন
//     return NextResponse.next();
// }

// // এই কনফিগটি নিশ্চিত করবে কোন পেজগুলো প্রটেক্ট করা হবে
// export const config = {
//     matcher: ["/career", "/news/:path*"],
// };

// // src/proxy.js
// import { NextResponse } from "next/server";

// export async function proxy(request) {
//     // Better Auth সেশন টোকেন কুকি থেকে রিড করা
//     const sessionToken = request.cookies.get("better-auth.session_token");

//     // যদি কুকি না থাকে, তবে লগইন পেজে পাঠিয়ে দিন
//     if (!sessionToken) {
//         return NextResponse.redirect(new URL('/login', request.url));
//     }

//     // কুকি থাকলে রিকোয়েস্টটি এগিয়ে যেতে দিন
//     return NextResponse.next();
// };

// export const config = {
//     matcher: ['/career', '/news/:path*'],
// };


import { NextResponse } from "next/server";
import { auth } from "../lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
    // console.log('Proxy middleware hit for:', request);

    const session = await auth.api.getSession({
        headers: await headers()
    })
    console.log('Session in proxy:', session);

    // const isLoggedIn = false; // Replace with actual authentication logic

    if (session) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url))
};

export const config = {
    matcher: ['/career', '/news/:path*'],
};