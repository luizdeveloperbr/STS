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
          placeholder="Digite seu nome"
          type="text"
          className="w-full"
          value={nome}
          onChange={e => updateFields({ nome: e.target.value })}
        />
        <p>E-mail</p>
        <input
          required
          placeholder="example@email.com"
          className="w-full"
          type="email"
          value={email}
          onChange={e => updateFields({ email: e.target.value })}
        />
        <p>Senha</p>
        <input
          className="w-full"
          required
          placeholder="Min. 6 caracteres"
          type="password"
          value={password}
          onChange={e => updateFields({ password: e.target.value })}
        />
      </>
    </FormWrapper>
  )
}