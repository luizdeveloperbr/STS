import React from 'react'
function Cadastro() {
    return (
        <div className="w-96 my-24 mx-auto">
            <div className='shadow-lg drop-shadow-lg rounded-md bg-slate-200 p-12'>
                <div className="text-center font-bold text-2xl mb-8">
                    Cadastre-se
                </div>
                <form className='flex gap-3 flex-col'>
                        <input type="text" className="form-input" placeholder="Nome" name="displayName" />
                        <input required type="email" placeholder='E-mail' className="form-input" name="email" />
                        <input required type="password" placeholder='Senha' className="form-input" name="password" />
                        <input required type="password" placeholder='Confirme a Senha' className="form-input" name="password" />
                        <button type="submit" className="btn bg-zinc-400 disabled:bg-red-600" >Enviar</button>
                </form>
            </div>
        </div>
    )
}
export default Cadastro