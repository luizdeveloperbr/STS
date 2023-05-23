import { FormWrapper } from "./FormWrapper"

//type AccountData = {
//  email: string
//  password: string
//}

//type AccountFormProps = AccountData & {
//  updateFields: (fields: Partial<AccountData>) => void
//}

export function AccountForm({
  plan,
  updateFields,
}) {
  return (
    <FormWrapper title="Plano de Assinatura">
      <label className="border items-center rounded bg-slate-100 p-5 w-full flex" htmlFor="plan">
      <input
        autoFocus
        required
        checked
        name="plan"
        type="radio"
        value={plan}
        onChange={e => updateFields({ email: e.target.value })}
      />
     <span className="ml-2">Renovação Mensal <br /> R$ 19,90</span></label>
      
    </FormWrapper>
  )
}