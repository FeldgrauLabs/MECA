import { NextRequest, NextResponse } from "next/server";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { SupportedLang } from "./app/[lang]/dictionaries";
import { clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server';
 
const locales: SupportedLang[] = ['en', 'jp', 'es', 'de', 'fr']
 
function getLocale(request: NextRequest) {
  const acceptLangVal = request.headers.get('accept-language');
  const languages = new Negotiator({ headers: { 'accept-language': acceptLangVal || '' } }).languages()
  const defaultLocale = 'en'
   
  const l = match(languages, locales, defaultLocale);
  return l;
}
 
const isProtectedRoute = createRouteMatcher([]);

function langMiddleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return
 
  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products

  return NextResponse.redirect(request.nextUrl)
}

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    // Nothing is protected as of now
  }
 
  return langMiddleware(req);
});

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|favicon.ico).*)',
  ],
}