"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Product, PRODUCTS } from "@/lib/products"

interface OrderDetailsProps {
  product: Product
  orderBumpProduct: Product
  isOrderBumpSelected: boolean
  totalPrice: number
}

export function OrderDetails({ 
  product, 
  orderBumpProduct, 
  isOrderBumpSelected, 
  totalPrice 
}: OrderDetailsProps) {
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
      transition={{ delay: 0.65 }}
      className="mt-8"
    >
      <h2 className="mb-4 text-base font-semibold text-gray-900">Detalhes do pedido</h2>
      <Card className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-900">
            <span>{product.name}</span>
            <span className="font-medium">{formatPrice(product.price)}</span>
          </div>
          <AnimatePresence>
            {isOrderBumpSelected && (
              <>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex justify-between text-sm text-gray-900"
                >
                  <span>{orderBumpProduct.name}</span>
                  <span className="font-medium">{formatPrice(orderBumpProduct.price)}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex justify-between text-sm text-gray-900"
                >
                  <span>Subtotal</span>
                  <span className="font-medium">{formatPrice(product.price + orderBumpProduct.price)}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex justify-between text-sm text-green-600"
                >
                  <span>Desconto Bundle</span>
                  <span className="font-medium">-{formatPrice((product.price + orderBumpProduct.price) - PRODUCTS.note_complete_bundle.price)}</span>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between text-base font-semibold text-gray-900">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
