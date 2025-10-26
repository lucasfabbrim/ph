"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ShieldCheck, ChevronDown } from "lucide-react"
import { PRODUCTS } from "@/lib/products"

interface CheckoutHeaderProps {
  totalPrice: number
  orderBumpSelected: boolean
}

export function CheckoutHeader({ totalPrice, orderBumpSelected }: CheckoutHeaderProps) {
  const getProductImage = (productId: string) => {
    if (productId === PRODUCTS.note_private.id) {
      return "/note-private.png"
    }
    if (productId === PRODUCTS.note_finances.id) {
      return "/note-finances.png"
    }
    return "/noteplanning-app-icon-logo.jpg"
  }

  const getProductName = (productId: string) => {
    if (productId === PRODUCTS.note_private.id) {
      return PRODUCTS.note_private.name
    }
    if (productId === PRODUCTS.note_finances.id) {
      return PRODUCTS.note_finances.name
    }
    return "Note Private (Template)"
  }

  return (
    <motion.div 
      className=""
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div id="header" className="justify-center text-center items-center h-auto pt-4 flex flex-col gap-2">
        <div
          id="header-payment-security"
          className="p-2 px-20 bg-[#FFFFFF] rounded-[10px] mx-4 my-4 flex items-center justify-center gap-2"
        >
          <ShieldCheck className="size-5 text-zinc-700" />
          <h2 className="text-base text-zinc-600 tracking-wide">COMPRA SEGURA</h2>
        </div>
        
        <div id="header-products" className="pb-2 flex flex-row items-center space-x-4 pt-1">
          <Image
            src={getProductImage(PRODUCTS.note_private.id)}
            alt="product-noteplanning"
            width={100}
            height={20}
            quality={100}
            className="rounded-[5px]"
          />
          <h2>{getProductName(PRODUCTS.note_private.id)}</h2>
        </div>
        
        <div id="header-details" className="items-center justify-center space-y-3 pt-2">
          <div className="p-2 bg-[#D1EFE0] h-7 rounded-[7px] flex flex-row justify-between items-center text-center">
            <h2 className="px-2 text-sm text-zinc-700">Detalhe da Compra</h2>
            <ChevronDown className="size-5 text-zinc-700" strokeWidth={1.0} />
          </div>
        </div>
        
        <div id="header-prices" className="flex flex-col w-full pb-4 px-5">
          <div className="bg-green-200 h-[1px] w-full" />
          <div className="flex w-full justify-between items-center pt-1">
            <h2 className="font-normal text-base">TOTAL</h2>
            <motion.h2 
              className="font-bold text-zinc-800"
              style={{ color: "#00dc82" }}
              animate={{ 
                scale: [1, 1.2, 1],
                color: ["#00dc82", "#00ff88", "#00dc82"]
              }}
              transition={{ 
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              R$ {totalPrice.toFixed(2).replace('.', ',')}
            </motion.h2>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
