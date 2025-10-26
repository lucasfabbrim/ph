"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { PRODUCTS } from "@/lib/products"

interface OrderBumpProps {
  orderBumpSelected: boolean
  setOrderBumpSelected: (selected: boolean) => void
}

export function OrderBump({ orderBumpSelected, setOrderBumpSelected }: OrderBumpProps) {
  const getProductImage = (productId: string) => {
    if (productId === PRODUCTS.note_private.id) {
      return "/note-private.png"
    }
    if (productId === PRODUCTS.note_finances.id) {
      return "/note-finances.png"
    }
    return "/noteplanning-app-icon-logo.jpg"
  }

  return (
    <motion.div 
      id="orderbump" 
      className="flex flex-col px-4 pb-10 w-full max-w-5xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {/* Decorative SVG */}
      <svg className="w-full" width="100%" height="17" viewBox="0 0 642 17" preserveAspectRatio="none">
        <path
          d="M0 2.4326e-10L10.7167 5.38333C17.4596 8.77055 25.407 8.77055 32.15 5.38333C38.893 1.99612 46.8404 1.99612 53.5833 5.38333C60.3263 8.77055 68.2737 8.77055 75.0167 5.38333C81.7596 1.99612 89.707 1.99612 96.45 5.38333C103.193 8.77055 111.14 8.77055 117.883 5.38333C124.626 1.99612 132.574 1.99612 139.317 5.38333C146.06 8.77055 154.007 8.77055 160.75 5.38333C167.493 1.99612 175.44 1.99612 182.183 5.38333C188.926 8.77055 196.874 8.77055 203.617 5.38333C210.36 1.99612 218.307 1.99612 225.05 5.38333C231.793 8.77055 239.74 8.77055 246.483 5.38333C253.226 1.99612 261.174 1.99612 267.917 5.38333C274.66 8.77055 282.607 8.77055 289.35 5.38333C296.093 1.99612 304.04 1.99612 310.783 5.38333C317.526 8.77055 325.474 8.77055 332.217 5.38333C338.96 1.99612 346.907 1.99612 353.65 5.38333C360.393 8.77055 368.34 8.77055 375.083 5.38333C381.826 1.99612 389.774 1.99612 396.517 5.38333C403.26 8.77055 411.207 8.77055 417.95 5.38333C424.693 1.99612 432.64 1.99612 439.383 5.38333C446.126 1.99612 454.074 1.99612 460.817 5.38333C467.56 1.99612 475.507 1.99612 482.25 5.38333C488.993 8.77055 496.94 8.77055 503.683 5.38333C510.426 1.99612 518.374 1.99612 525.117 5.38334C531.86 8.77055 539.807 8.77054 546.55 5.38333C553.293 1.99613 561.24 1.99612 567.983 5.38333C574.726 8.77055 582.674 8.77055 589.417 5.38333C596.16 1.99612 604.107 1.99612 610.85 5.38332C617.593 8.77054 625.54 8.77054 632.283 5.38332L643 0V17H0V2.4326e-10Z"
          fill="#EFEFEF"
        />
      </svg>
      
      <div id="orderbump-header" className="flex flex-col items-center text-center justify-center space-y-2 mt-4">
        <h1 className="text-zinc-900 font-semibold">Essa oferta não irá aparecer em nenhum outro lugar!</h1>
        <h4 className="text-zinc-900">Aproveite e compre outros produtos com desconto.</h4>
      </div>
      
      <div id="orderbump-products" className="flex flex-col items-center text-center justify-center space-y-2 pt-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOrderBumpSelected(!orderBumpSelected)}
          className="cursor-pointer"
        >
          <Card className="bg-white p-2 px-4 py-4 items-start text-start justify-start">
            <h1 className="text-zinc-900 font-medium">{PRODUCTS.note_complete_bundle.description}</h1>
            <div className="py-2 flex flex-row items-center gap-4">
              <Checkbox 
                className="border-green-600 border-2 size-5"
                checked={orderBumpSelected}
                onCheckedChange={(checked) => setOrderBumpSelected(!!checked)}
              />
              <div id="header-products" className="pb-2 flex flex-row items-center space-x-4 pt-3">
                <Image
                  src={getProductImage(PRODUCTS.note_finances.id)}
                  alt="order-bump-bundle"
                  width={100}
                  height={100}
                  quality={100}
                  className="rounded-[5px]"
                />
                <div className="flex flex-col space-y-1">
                  <h2 className="text-zinc-700">{PRODUCTS.note_complete_bundle.name}</h2>
                  <h2 className="font-semibold">R$ {PRODUCTS.note_complete_bundle.price.toFixed(2).replace('.', ',')}</h2>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
      
      {/* Decorative SVG */}
      <svg className="w-full" width="100%" height="17" viewBox="0 0 642 17" preserveAspectRatio="none">
        <path
          d="M0 2.4326e-10L10.7167 5.38333C17.4596 8.77055 25.407 8.77055 32.15 5.38333C38.893 1.99612 46.8404 1.99612 53.5833 5.38333C60.3263 8.77055 68.2737 8.77055 75.0167 5.38333C81.7596 1.99612 89.707 1.99612 96.45 5.38333C103.193 8.77055 111.14 8.77055 117.883 5.38333C124.626 1.99612 132.574 1.99612 139.317 5.38333C146.06 8.77055 154.007 8.77055 160.75 5.38333C167.493 1.99612 175.44 1.99612 182.183 5.38333C188.926 8.77055 196.874 8.77055 203.617 5.38333C210.36 1.99612 218.307 1.99612 225.05 5.38333C231.793 8.77055 239.74 8.77055 246.483 5.38333C253.226 1.99612 261.174 1.99612 267.917 5.38333C274.66 8.77055 282.607 8.77055 289.35 5.38333C296.093 1.99612 304.04 1.99612 310.783 5.38333C317.526 8.77055 325.474 8.77055 332.217 5.38333C338.96 1.99612 346.907 1.99612 353.65 5.38333C360.393 8.77055 368.34 8.77055 375.083 5.38333C381.826 1.99612 389.774 1.99612 396.517 5.38333C403.26 8.77055 411.207 8.77055 417.95 5.38333C424.693 1.99612 432.64 1.99612 439.383 5.38333C446.126 1.99612 454.074 1.99612 460.817 5.38333C467.56 1.99612 475.507 1.99612 482.25 5.38333C488.993 8.77055 496.94 8.77055 503.683 5.38333C510.426 1.99612 518.374 1.99612 525.117 5.38334C531.86 8.77055 539.807 8.77054 546.55 5.38333C553.293 1.99613 561.24 1.99612 567.983 5.38333C574.726 8.77055 582.674 8.77055 589.417 5.38333C596.16 1.99612 604.107 1.99612 610.85 5.38332C617.593 8.77054 625.54 8.77054 632.283 5.38332L643 0V17H0V2.4326e-10Z"
          fill="#EFEFEF"
        />
      </svg>
    </motion.div>
  )
}
