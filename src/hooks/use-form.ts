import { useState, useCallback } from 'react'

export interface FormErrors {
  [key: string]: string | undefined
}

export interface UseFormOptions<T> {
  initialValues: T
  validate?: (values: T) => FormErrors
  onSubmit: (values: T) => void | Promise<void>
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as string]) {
      setErrors(prev => ({ ...prev, [name as string]: undefined }))
    }
  }, [errors])

  const setError = useCallback((name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name as string]: error }))
  }, [])

  const validateForm = useCallback(() => {
    if (!validate) return true
    
    const newErrors = validate(values)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [values, validate])

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    try {
      await onSubmit(values)
    } catch (error) {
    } finally {
      setIsSubmitting(false)
    }
  }, [values, validateForm, onSubmit])

  const register = useCallback((name: keyof T) => ({
    value: values[name] || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(name, e.target.value),
    onBlur: () => validateForm()
  }), [values, setValue, validateForm])

  return {
    values,
    errors,
    isSubmitting,
    setValue,
    setError,
    register,
    handleSubmit,
    validateForm
  }
}
