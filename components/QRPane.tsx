'use client';

import { QRCode } from 'react-qrcode-logo';

interface Props {
  url: string;
}

export const QRPane = ({ url }: Props) => {
  return (
    <div className="hidden lg:block absolute bottom-4 right-4">
      <div className="flex flex-col gap-2 items-center p-4 bg-purple-100 rounded-3xl mt-4 border-2 border-purple-500">
        <div className="flex items-center justify-center w-32 h-32 bg-white rounded-xl">
          <QRCode value={url} size={96} qrStyle='dots' />
        </div>
        <span className="font-bold">Scan to open</span>
      </div>
    </div>
  )
};