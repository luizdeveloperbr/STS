import { FormWrapper } from "./FormWrapper"

//type UserData = {
//  firstName: string
//  lastName: string
//  age: string
//}
//
//type UserFormProps = UserData & {
//  updateFields: (fields: Partial<UserData>) => void
//}

export function UserForm({
  nome,
  email,
  password,
  updateFields,
}) {
  return (
    <FormWrapper title="Informações de Login">
      <>
        <p>Nome</p>
        <input
          autoFocus
          required
          type="text"
          className="w-full"
          value={nome}
          onChange={e => updateFields({ nome: e.target.value })}
        />
        <p>E-mail</p>
        <input
          required
          className="w-full"
          type="email"
          value={email}
          onChange={e => updateFields({ email: e.target.value })}
        />
        <p>Password</p>
        <input
          className="w-full"
          required
          type="password"
          value={password}
          onChange={e => updateFields({ password: e.target.value })}
        />
      </>
    </FormWrapper>
  )
}