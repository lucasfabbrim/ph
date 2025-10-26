"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const checkoutSchema = z.object({
  email: z.string().email('O e-mail informado é inválido.'),
  confirmEmail: z.string().email('O e-mail informado é inválido.'),
  fullName: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  phone: z.string().min(10, 'O número de celular deve ter pelo menos 10 dígitos.'),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Os e-mails informados não coincidem.",
  path: ["confirmEmail"],
})

export function useCheckoutForm() {
  const [additionalProducts, setAdditionalProducts] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderBumpSelected, setOrderBumpSelected] = useState(false)

  const form = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: '',
      confirmEmail: '',
      fullName: '',
      phone: ''
    }
  })

  const { register, handleSubmit, formState: { errors, touchedFields }, watch, setValue } = form

  const toggleOrderBump = (checked: boolean) => {
    setOrderBumpSelected(checked)
    
    if (checked) {
      // Adicionar o produto do order bump aos produtos adicionais
      const orderBumpId = 'bundle-001' // ID do produto adicional
      setAdditionalProducts(prev => [...prev, orderBumpId])
    } else {
      // Remover o produto do order bump dos produtos adicionais
      setAdditionalProducts(prev => prev.filter(id => id !== 'bundle-001'))
    }
  }

  const watchedValues = watch()
  const isButtonDisabled = Object.keys(errors).length > 0 || isSubmitting || !watchedValues.fullName || !watchedValues.email || !watchedValues.confirmEmail || !watchedValues.phone

  return {
    form,
    register,
    handleSubmit,
    errors,
    touchedFields,
    setValue,
    additionalProducts,
    isSubmitting,
    setIsSubmitting,
    orderBumpSelected,
    toggleOrderBump,
    isButtonDisabled,
    watchedValues
  }
}
