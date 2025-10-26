"use client"

import Image from "next/image"

export function CheckoutFooter() {
  return (
    <div id="footer" className="py-10 p-10">
      <div id="header-noteplanning" className="flex space-x-2">
        <Image
          src="/noteplanning-app-icon-logo.jpg"
          alt="icon-noteplanning"
          width={24}
          height={24}
          quality={100}
          className="rounded-[5px]"
        />
        <h4 className="tracking-tighter font-medium text-xl text-zinc-600">noteplanning</h4>
      </div>
    </div>
  )
}
