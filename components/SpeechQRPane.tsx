'use client';

import { QRCode } from "react-qrcode-logo";

export const SpeechQRPane = () => {
  const location = window.location;
  const href = location.href;
  const searchParams = location.search;

  const url = new URL(href);
  url.searchParams.set('via', 'qr');
  url.searchParams.set('text', searchParams);

  return (
    <div className="hidden lg:block absolute bottom-4 right-4">
      <div className="flex flex-col gap-2 items-center p-4 bg-purple-100 rounded-3xl mt-4 border-2 border-purple-500">
        <div className="flex items-center justify-center w-32 h-32 bg-white rounded-xl">
          <QRCode value={url.toString()} size={96} qrStyle='dots' />
        </div>
        <span className="font-bold">Scan to open</span>
      </div>
    </div>
  )
};