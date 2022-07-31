import { setDoc, collection, doc } from "firebase/firestore"
import { db } from "../firebase";
import React from "react";
import Real from "./ComponentReal";
import { Formik, Form, Field } from "formik"
import { useUserAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom";
import DataParsed from "./dataParsed";


function VendaColuna(prop) {
    const { user } = useUserAuth()
    const navigate = useNavigate()
    async function handleSubmit(values) {
        const docRef = doc(collection(db, user.uid), prop.venda.id)
        await setDoc(docRef, values, { merge: true })
        navigate("/")
    }

    const Datalist = (props) => {
        const bancos = ["nubank", "mercado pago", "santander"]
        return (
            <>
                <input list="bank" {...props} />
                <datalist id="bank">
                    {bancos.map(banco => (<option value={banco}>{banco}</option>))}
                </datalist>
            </>
        )
    }

    return (
        <>
            {prop.venda.confirmado ?
                <div className="flex justify-between" id="c">
                    <div className="flex justify-between w-full">
                        <div className="footer">
                            <DataParsed timestamp={prop.venda.datetime} format="DD/MM/YYYY" />
                        </div>
                        <div className="footer">{prop.venda.userID}</div>
                        <div className="footer">{prop.venda.userName}</div>
                        <div className="footer">{prop.venda.tipo}</div>
                        <div className="footer capitalize">{prop.venda.banco}</div>
                        <div className="footer">{prop.venda.quantidade}</div>
                        <div className="footer"><Real valor={prop.venda.valorVenda} /></div>
                        <div className="footer"><Real valor={prop.venda.quantidade * prop.venda.custoUnitario} /></div>
                        <div className="footer"><Real valor={prop.venda.valorVenda - (prop.venda.quantidade * prop.venda.custoUnitario)} /></div>
                        <div className="footer">{prop.venda.confirmado ? <div className="task min-w-full h-4"></div> : "Não Confirmado"}</div>
                        <div className="footer"></div>
                    </div>
                </div>
                :
                <div className="flex justify-between" id="e">
                    <Formik initialValues={{ tipo: "", banco: "", valorVenda: undefined, quantidade: undefined, custoUnitario: 4.5, confirmado: false }}
                        onSubmit={handleSubmit}>{({ values, isSubmitting }) => (
                            <div className="flex justify-between w-full">
                                <div className="flex justify-between w-full">
                                    <div className="w-full border border-black text-center">
                                        <DataParsed timestamp={prop.venda.datetime} format="DD/MM/YYYY" />
                                    </div>
                                    <div className="w-full border border-black text-center">{prop.venda.userID}</div>
                                    <div className="w-full border border-black text-center">{prop.venda.userName}</div>
                                </div>
                                <Form className="flex justify-between w-full">
                                    <div className="w-full border text-center border-black inline">
                                        <label className="mx-1">
                                            R
                                            <Field type="radio" className="ml-2 scale-150" name="tipo" value="R"></Field>
                                        </label>
                                        <label className="mx-1">
                                            N
                                            <Field type="radio" className="ml-2 scale-150" name="tipo" value="N"></Field>
                                        </label>
                                    </div>
                                    <div className="w-full border border-black text-center">
                                        <Field className="form-input w-[150px]" name="banco" placeholder="Banco" as={Datalist} required></Field>
                                    </div>
                                    <div className="w-full border border-black text-center">
                                        <Field name="quantidade" className="form-input max-w-[80px]" type="number" placeholder="Qnt." required></Field>
                                    </div>
                                    <div className="w-full border border-black text-center">
                                        <Field name="valorVenda" className="form-input max-w-[100px]" type="number" placeholder="R$ 100.00" required></Field>
                                    </div>
                                    <div className="w-full border border-black text-center"><Real valor={values.quantidade * values.custoUnitario} /></div>
                                    <div className="w-full border border-black text-center"><Real valor={values.valorVenda - (values.quantidade * values.custoUnitario)} /></div>
                                    <div className="w-full border border-black text-center" >
                                        <Field name="confirmado" className="scale-150" type="checkbox"></Field>
                                    </div>
                                    <div className="w-full border border-black text-center">
                                        <button type="submit" className="button disabled:text-red-600" disabled={isSubmitting}>Adicionar</button>
                                    </div>
                                </Form>
                            </div>
                        )}</Formik>
                </div>}
        </>
    )
}
export default VendaColuna