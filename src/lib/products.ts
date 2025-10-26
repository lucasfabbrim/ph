export interface Product {
  id: string
  name: string
  description: string
  price: number
  type: "TEMPLATE" | "CREDITS" | "BUNDLE"
  creditsAmount?: number
  createdAt: string
  updatedAt: string
}

export const PRODUCTS: Record<string, Product> = {
  note_finances: {
    id: "nf-001",
    name: "Note Finances",
    description: "(50% OFF) Organize sua vida financeira em um só lugar",
    price: 1999,
    type: "TEMPLATE",
    createdAt: "2025-01-26T00:00:00.000Z",
    updatedAt: "2025-01-26T00:00:00.000Z",
  },
  note_private: {
    id: "np-001",
    name: "Note Private",
    description: "(50% OFF) Organize sua vida inteira em um só lugar",
    price: 2499,
    type: "TEMPLATE",
    createdAt: "2025-01-26T00:00:00.000Z",
    updatedAt: "2025-01-26T00:00:00.000Z",
  },
  note_complete_bundle: {
    id: "bundle-001",
    name: "Note Complete Bundle",
    description: "(Economia de R$ 7,00) Note Finances + Note Private - Organize sua vida completa",
    price: 3799,
    type: "BUNDLE",
    createdAt: "2025-01-26T00:00:00.000Z",
    updatedAt: "2025-01-26T00:00:00.000Z",
  },
}

export function calculateTotal(productIds: string[]): number {
  return productIds.reduce((total, id) => {
    const product = PRODUCTS[id]
    return product ? total + product.price : total
  }, 0)
}
