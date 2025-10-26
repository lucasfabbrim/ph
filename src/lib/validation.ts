export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => string | undefined
}

export interface ValidationSchema {
  [key: string]: ValidationRule
}

export function validateField(value: any, rules: ValidationRule): string | undefined {
  if (rules.required && (!value || value.toString().trim() === '')) {
    return 'Este campo é obrigatório'
  }

  if (value && rules.minLength && value.toString().length < rules.minLength) {
    return `Deve ter pelo menos ${rules.minLength} caracteres`
  }

  if (value && rules.maxLength && value.toString().length > rules.maxLength) {
    return `Deve ter no máximo ${rules.maxLength} caracteres`
  }

  if (value && rules.pattern && !rules.pattern.test(value.toString())) {
    return 'Formato inválido'
  }

  if (value && rules.custom) {
    return rules.custom(value)
  }

  return undefined
}

export function validateForm(values: Record<string, any>, schema: ValidationSchema): Record<string, string | undefined> {
  const errors: Record<string, string | undefined> = {}

  for (const [field, rules] of Object.entries(schema)) {
    const error = validateField(values[field], rules)
    if (error) {
      errors[field] = error
    }
  }

  return errors
}

// Validações específicas
export function validateEmail(email: string): string | undefined {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Email inválido'
  }
  return undefined
}

export function validatePhone(phone: string): string | undefined {
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/
  if (!phoneRegex.test(phone)) {
    return 'Telefone inválido. Use o formato (XX) XXXXX-XXXX'
  }
  return undefined
}

export function validateCPF(cpf: string): string | undefined {
  const cleaned = cpf.replace(/\D/g, '')
  if (cleaned.length !== 11) {
    return 'CPF deve ter 11 dígitos'
  }
  
  // Validação básica de CPF
  if (/^(\d)\1{10}$/.test(cleaned)) {
    return 'CPF inválido'
  }
  
  return undefined
}

export function validateCNPJ(cnpj: string): string | undefined {
  const cleaned = cnpj.replace(/\D/g, '')
  if (cleaned.length !== 14) {
    return 'CNPJ deve ter 14 dígitos'
  }
  
  // Validação básica de CNPJ
  if (/^(\d)\1{13}$/.test(cleaned)) {
    return 'CNPJ inválido'
  }
  
  return undefined
}

export function validateCPFOrCNPJ(document: string): string | undefined {
  const cleaned = document.replace(/\D/g, '')
  
  if (cleaned.length === 11) {
    return validateCPF(document)
  } else if (cleaned.length === 14) {
    return validateCNPJ(document)
  } else {
    return 'Documento deve ter 11 (CPF) ou 14 (CNPJ) dígitos'
  }
}

export function formatDocument(document: string): string {
  const cleaned = document.replace(/\D/g, '')
  
  if (cleaned.length <= 11) {
    // CPF: 000.000.000-00
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  } else {
    // CNPJ: 00.000.000/0000-00
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }
}

export function formatBrazilianPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length <= 10) {
    // (XX) XXXX-XXXX
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  } else {
    // (XX) XXXXX-XXXX
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
}

export function validateBrazilianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 10 && cleaned.length <= 11
}
