const API_BASE_URL = "https://api-jx5sumy2za-uc.a.run.app/v2/gateway/pix"

export interface CreatePixPayload {
  productId: string
  email: string
  phone: string
  document: string
}

export interface PixResponse {
  success: boolean
  data: {
    id: string // ID do PIX do Pushin Pay
    qrCode: string
    qrCodeBase64: string
    value: number // Valor em reais
    expirationDate: string // ISO date string
  }
}

export interface PixStatusResponse {
  success: boolean
  data: {
    id: string
    status: "pending" | "paid" | "expired"
    value: string
    payer_name?: string
    payer_national_registration?: string
  }
}

export async function createPixPayment(payload: CreatePixPayload): Promise<PixResponse> {

  const response = await fetch(`${API_BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })


  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Erro ao criar pagamento PIX: ${response.status}`)
  }

  const data = await response.json()

  return data
}

export async function consultPixPayment(pixId: string): Promise<PixStatusResponse> {
  const response = await fetch(`${API_BASE_URL}/consult/${pixId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Erro ao consultar pagamento PIX: ${response.status}`)
  }

  const data = await response.json()

  return data
}
