import { PRODUCTS } from "@/lib/products"

export const getProductPrice = (url: string) => {
  const urlParams = new URLSearchParams(url.split('?')[1])
  const productId = urlParams.get('product')
  
  if (productId) {
    const productKeyMap: Record<string, string> = {
      'np-001': 'note_private',
      'nf-001': 'note_finances'
    }
    
    const productKey = productKeyMap[productId]
    if (productKey && PRODUCTS[productKey]) {
      return PRODUCTS[productKey].price
    }
  }
  
  return 0
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(price)
}

export const getProductImage = (productTitle: string, fallbackIcon?: string) => {
  const imageMap: Record<string, string> = {
    'Note Private': '/note-private.png',
    'Note Finances': '/note-finances.png',
  }
  
  return imageMap[productTitle] || fallbackIcon || "/whey.png"
}
