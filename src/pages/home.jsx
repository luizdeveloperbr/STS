import { Form, Field, Formik } from 'formik'
import { Link } from 'react-router-dom'
function Home() {
    const bancos = ["santander", "nubank", "mercdo pago"]
    const formikInitialValues = {
        userID: "",
        userName: "",
        tipo: "R",
        formaDePagamento: "",
        quantidade: "",
        valorVenda: "",
        custoUnitario: "",
        confirmado: false,
        datetime: "",
        mes: ""
    }
    return (
        <div id="main" className="p-4">
            <nav className="min-h-[40px] place-content-end mb-2 flex ring-1 ring-blue-300">
                <button className="py-1 px-2 mr-1 border my-auto border-black rounded" >Logut</button>
            </nav>
            <Formik initialValues={formikInitialValues}>
                {
                    ({ isSubmitting }) => (

                        <Form className="mx-auto flex overflow-x-auto ring-1 ring-blue-600">
                            <label className="m-1 grid text-sm" htmlFor="userID">
                                Usuario
                                <Field required className="form-input" name="userID" placeholder="Br1234" />
                            </label>
                            <label className="m-1 grid text-sm" htmlFor="userName">
                                Nome
                                <Field required className="form-input" name="userName" placeholder="Ex. João" />
                            </label>
                            <label className="m-1 grid text-sm">
                                Banco
                                <Field required as="select" className="capitalize form-input" name="formaDePagamento">
                                    <option selected defaultValue="">selecione</option>
                                    {bancos.map(banco => {
                                        return (<option className="capitalize" key={banco} value={banco}>{banco}</option>)
                                    })}
                                </Field>
                            </label>
                            <label className="m-1 grid text-center text-sm" for="userName">
                                Licenças
                                <Field type="number" required className="max-w-[60px] form-input" name="quantidade" placeholder="Qnt." />
                            </label>
                            <label className="m-1 text-sm" for="valorVenda">
                                <p>Valor Venda</p>
                                <Field type="number" id="valorVenda" required className="max-w-[80px] p-1 form-input" name="valorVenda" placeholder="RS 100,00" />
                            </label>
                            <div className="m-1 text-center">
                                <p className="text-sm mb-2">Tipo</p>
                                <label for="tipo">
                                    R
                                    <Field className="mx-1" type="radio" name="tipo" value="R" />
                                </label>
                                <label for="tipo">
                                    N
                                    <Field className="mx-1" type="radio" name="tipo" value="N" />
                                </label>
                            </div>
                            <label className="m-1 grid text-center text-sm" for="confirmado">
                                Confirmado
                                <Field name="confirmado" required className="mb-2" type="checkbox" />
                            </label>
                            <div className="self-center">
                            <button type="submit" className="button bg-slate-400 disabled:text-red-600" disabled={isSubmitting}>Adicionar</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>

        </div>
    )
}
export default Home;