"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Card } from "@/components/ui/card"
import Cupom from "@/assets/icons/cupom.svg"
import { ProductLink } from "@/types/profile"
import { fadeInUp } from "@/lib/profile-constants"
import { getProductImage, getProductPrice, formatPrice } from "@/lib/profile-utils"

interface ProductListProps {
  links: ProductLink[]
  sectionTitle: string
  onLinkClick: (title: string) => void
}

export function ProductList({ links, sectionTitle, onLinkClick }: ProductListProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className="space-y-5 mx-8 pb-10 border-b border-b-zinc-900"
    >
      <h1 className="items-center text-center text-xl pb-2 font-semibold">
        {sectionTitle || "Templates"}
      </h1>
      {links.map((product, index) => (
        <motion.div
          key={index}
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Card className="bg-neutral-900/60 border-none rounded-[25px]">
            <div className="w-full justify-between p-6 h-auto flex items-center">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-md overflow-hidden">
                  <Image
                    src={getProductImage(product.title, product.icon)}
                    alt={product.title}
                    className="object-contain"
                    fill
                  />
                </div>
                <div className="text-left">
                  <p className="font-medium text-lg text-white flex items-center gap-2">
                    {product.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg text-white font-semibold flex items-center gap-1.5 ml-0.5 pt-.5">
                      <Cupom className="w-5 h-5" /> {formatPrice(getProductPrice(product.url))}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-5 mr-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={product.url}
                    onClick={() => onLinkClick(product.title)}
                  >
                    <ShoppingCart className="w-7 h-7 text-white fill-white" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
