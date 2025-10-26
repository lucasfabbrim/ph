"use client"

import { motion } from "framer-motion"
import { AlertCircle, QrCode, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface CheckoutFormData {
  fullName: string
  email: string
  phone: string
  cpfCnpj: string
}

interface CheckoutFormProps {
  values: CheckoutFormData
  errors: Record<string, string | undefined>
  setValue: (field: keyof CheckoutFormData, value: string) => void
  handlePhoneChange: (value: string) => void
  handleDocumentChange: (value: string) => void
}

export function CheckoutForm({
  values,
  errors,
  setValue,
  handlePhoneChange,
  handleDocumentChange,
}: CheckoutFormProps) {
  return (
    <motion.div 
      style={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card id="content" className="rounded-t-[20px] bg-[#FFFFFF] flex flex-col shadow-zinc-200">
        <div id="content-header" className="flex flex-col my-6 items-center">
          <h1 className="font-semibold text-zinc-900">OS SEUS DADOS</h1>
        </div>
        
        <div id="content-inputs" className="px-4 pb-10">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fullName" className="text-zinc-600">
                Nome e sobrenome *
              </FieldLabel>
              <Input
                id="fullName"
                type="text"
                placeholder="João Silva"
                value={values.fullName || ""}
                onChange={(e) => setValue("fullName", e.target.value)}
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && (
                <motion.p 
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="size-4" />
                  {errors.fullName}
                </motion.p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="email" className="text-zinc-600">
                E-mail *
              </FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="joao@example.com"
                value={values.email || ""}
                onChange={(e) => setValue("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <motion.p 
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="size-4" />
                  {errors.email}
                </motion.p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="phone" className="text-zinc-600">
                Celular *
              </FieldLabel>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={values.phone || ""}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <motion.p 
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="size-4" />
                  {errors.phone}
                </motion.p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="cpfCnpj" className="text-zinc-600">
                CPF / CNPJ *
              </FieldLabel>
              <Input
                id="cpfCnpj"
                type="text"
                placeholder="000.000.000-00"
                value={values.cpfCnpj || ""}
                onChange={(e) => handleDocumentChange(e.target.value)}
                className={errors.cpfCnpj ? "border-red-500" : ""}
              />
              {errors.cpfCnpj && (
                <motion.p 
                  className="text-red-500 text-sm mt-1 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="size-4" />
                  {errors.cpfCnpj}
                </motion.p>
              )}
            </Field>
          </FieldGroup>
        </div>
        
        <div id="content-method-payment" className="flex flex-col pb-10 px-5 space-y-5">
          <h1 className="font-semibold text-zinc-800 items-center text-center">MÉTODO DE PAGAMENTO</h1>
          <div 
            className="p-4 bg-green-500 text-white rounded-[7px] h-20 w-44 flex flex-col space-y-2 cursor-pointer hover:bg-green-600 transition-colors"
            onClick={() => handlePaymentMethodSelect("pix")}
          >
            <QrCode className="size-5" />
            <h2 className="text-sm font-medium">PIX</h2>
          </div>
          
          <div className="flex flex-col no-underline">
            <h4 className="text-green-500 flex flex-row items-center gap-2 text-xs">
              <AlertCircle className="size-4" />
              ATENÇÃO A ESTES DETALHES
            </h4>
            <div className="pt-3 px-1 text-xs text-zinc-500/90 flex flex-col space-y-1.5">
              <span>- Somente à vista;</span>
              <span>
                - O(s) produto(s) será(ão) liberado(s) somente após recebermos a confirmação de pagamento;
              </span>
              <span>
                - Fique atento(a) à data de vencimento. Após a expiração, será necessário refazer seu pedido.
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
