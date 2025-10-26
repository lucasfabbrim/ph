import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function CheckoutLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-6 text-lg text-gray-600 font-medium">Preparando checkout...</p>
        <p className="mt-2 text-sm text-gray-500">Aguarde um momento</p>
      </div>
    </div>
  )
}
