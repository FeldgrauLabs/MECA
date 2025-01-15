import { NextRequest, NextResponse } from "next/server";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { SupportedLang } from "./app/[lang]/dictionaries";
 
const locales: SupportedLang[] = ['en', 'jp', 'es', 'de', 'fr']
 
function getLocale(request: NextRequest) {
  const acceptLangVal = request.headers.get('accept-language');
  const languages = new Negotiator({ headers: { 'accept-language': acceptLangVal || '' } }).languages()
  const defaultLocale = 'en'
   
  const l = match(languages, locales, defaultLocale);
  return l;
}
 
export function middleware(request: NextRequest) {
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
 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|favicon.ico).*)',
    // "/((?!favicon.ico).*)"
    // Optional: only run on root (/) URL
    // '/',
    // '/(en|jp|fr|de|es)/:path*'
  ],
}