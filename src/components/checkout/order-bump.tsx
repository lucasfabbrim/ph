"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Product } from "@/lib/products"

interface OrderBumpProps {
  product: Product
  orderBumpProduct: Product
  isSelected: boolean
  onToggle: (checked: boolean) => void
  isDisabled?: boolean
}

export function OrderBump({ 
  product, 
  orderBumpProduct, 
  isSelected, 
  onToggle, 
  isDisabled = false 
}: OrderBumpProps) {
  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="border-gray-200 pt-2"
    >
      <h2 className="mb-4 text-base font-semibold text-gray-900">Aproveite e compre junto:</h2>
      <div className="space-y-3">
        <motion.div
          whileHover={!isDisabled ? { scale: 1.005 } : {}}
          onClick={() => !isDisabled && onToggle(!isSelected)}
          className={`transition-all cursor-pointer ${isDisabled ? "opacity-50" : ""}`}
        >
          <Card className={`p-4 transition-all ${
            isSelected ? "border-green-400 bg-green-50" : "border-gray-200"
          }`}>
            <div className="flex items-start gap-3">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-[#1e3a8a]">
                <img
                  src={product.id === 'np-001' ? '/note-finances.png' : '/note-private.png'}
                  alt={orderBumpProduct.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-normal leading-tight text-gray-900">
                  {orderBumpProduct.name}
                </h3>
                <p className="mt-2 text-lg font-bold text-gray-900">{formatPrice(orderBumpProduct.price)}</p>
              </div>
            </div>
            <Card className="mt-3 bg-green-100 border-green-200">
              <div className="flex items-center gap-2 p-4">
                <Checkbox
                  id="order-bump"
                  checked={isSelected}
                  onCheckedChange={onToggle}
                  className={`transition-all rounded-[5px] ${
                    isSelected 
                      ? "bg-green-600 border-green-600 text-white" 
                      : "bg-transparent border-gray-400"
                  }`}
                  disabled={isDisabled}
                />
                <Label htmlFor="order-bump" className="cursor-pointer text-sm font-normal text-gray-700">
                  {isSelected ? "Remover produto" : "Adicionar produto"}
                </Label>
              </div>
            </Card>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}