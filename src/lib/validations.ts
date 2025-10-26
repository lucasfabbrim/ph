export function validateCPF(cpf: string): boolean {
  // Remove non-numeric characters
  cpf = cpf.replace(/[^\d]/g, "")

  if (cpf.length !== 11) return false

  // Check for known invalid CPFs
  if (/^(\d)\1{10}$/.test(cpf)) return false

  // Validate first digit
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(cpf.charAt(i)) * (10 - i)
  }
  let digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  if (digit !== Number.parseInt(cpf.charAt(9))) return false

  // Validate second digit
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(cpf.charAt(i)) * (11 - i)
  }
  digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  if (digit !== Number.parseInt(cpf.charAt(10))) return false

  return true
}

export function validateCNPJ(cnpj: string): boolean {
  // Remove non-numeric characters
  cnpj = cnpj.replace(/[^\d]/g, "")

  if (cnpj.length !== 14) return false

  // Check for known invalid CNPJs
  if (/^(\d)\1{13}$/.test(cnpj)) return false

  // Validate first digit
  let length = cnpj.length - 2
  let numbers = cnpj.substring(0, length)
  const digits = cnpj.substring(length)
  let sum = 0
  let pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += Number.parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== Number.parseInt(digits.charAt(0))) return false

  // Validate second digit
  length = length + 1
  numbers = cnpj.substring(0, length)
  sum = 0
  pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += Number.parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== Number.parseInt(digits.charAt(1))) return false

  return true
}

export function validateCPFOrCNPJ(document: string): boolean {
  const cleaned = document.replace(/[^\d]/g, "")

  if (cleaned.length === 11) {
    return validateCPF(cleaned)
  } else if (cleaned.length === 14) {
    return validateCNPJ(cleaned)
  }

  return false
}

export function validatePhoneByCountry(phone: string, countryCode: string): boolean {
  // Remove non-numeric characters
  const cleaned = phone.replace(/[^\d]/g, "")

  switch (countryCode) {
    case "+55": // Brazil
      return cleaned.length >= 10 && cleaned.length <= 11
    case "+1": // United States
      return cleaned.length === 10
    case "+351": // Portugal
      return cleaned.length === 9
    case "+34": // Spain
      return cleaned.length === 9
    case "+44": // United Kingdom
      return cleaned.length === 10 || cleaned.length === 11
    case "+49": // Germany
      return cleaned.length >= 10 && cleaned.length <= 11
    case "+33": // France
      return cleaned.length === 9
    case "+39": // Italy
      return cleaned.length === 10
    default:
      return cleaned.length >= 10
  }
}

export function formatCPF(value: string): string {
  const cleaned = value.replace(/[^\d]/g, "")
  if (cleaned.length <= 11) {
    return cleaned
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  }
  return value
}

export function formatCNPJ(value: string): string {
  const cleaned = value.replace(/[^\d]/g, "")
  return cleaned
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2")
}

export function formatDocument(value: string): string {
  const cleaned = value.replace(/[^\d]/g, "")
  if (cleaned.length <= 11) {
    return formatCPF(value)
  }
  return formatCNPJ(value)
}

export function formatBrazilianPhone(value: string): string {
  const cleaned = value.replace(/[^\d]/g, "")

  if (cleaned.length <= 10) {
    // Format: (XX) XXXX-XXXX
    return cleaned.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2")
  }

  // Format: (XX) XXXXX-XXXX
  return cleaned.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2")
}

export function validateBrazilianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[^\d]/g, "")
  // Brazilian phones: 10 digits (landline) or 11 digits (mobile)
  return cleaned.length === 10 || cleaned.length === 11
}
