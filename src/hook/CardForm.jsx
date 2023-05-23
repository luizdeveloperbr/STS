// STS-backend - HTML Pure Initialization
import { FormWrapper } from './FormWrapper'
import {initMercadoPago, CardPayment } from '@mercadopago/sdk-react'

export function CardForm({ nome, email, updateFields }) {
 initMercadoPago("TEST-64bacd3e-9884-4807-8935-25fff7c671de",{locale: "pt-BR"})

  return (
    <FormWrapper title="Informações de Pagamento">
      <CardPayment initialization={{amount: 1}} onSubmit={async (e) => {}}/>
    </FormWrapper>
  )
}