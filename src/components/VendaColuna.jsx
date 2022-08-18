import { setDoc, collection, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import React from 'react';
import Real from './ComponentReal';
import { Formik, Form, Field } from 'formik';
import { useUserAuth } from '../contexts/AuthContext';
import { reloadList } from '../utils/updateList';
import DataParsed from './dataParsed';

function VendaColuna({ venda }) {
  const { user } = useUserAuth();
  const reloadUpdate = reloadList((state) => state.toggle);

  const bancos = ["Santander", "Nubank", "Mercado Pago"]

  async function handleSubmitValue(values) {

    const docRef = doc(collection(db, user.uid), venda.id);
    await setDoc(docRef, { ...values, confirmado: true }, { merge: true });
    reloadUpdate();
  }

  async function editVenda(vendaId) {
    const docRef = doc(collection(db, user.uid), vendaId);
    await setDoc(docRef, { confirmado: false }, { merge: true });
    reloadUpdate();
  }

  async function deletarVenda(vendaId) {
    alert('Deletar');
    await deleteDoc(doc(db, user.uid, vendaId));
    reloadUpdate();
  }

  return (
    <>
      {venda.confirmado === false ? (
        <div className="flex justify-start" id="e">
          <Formik initialValues={venda} onSubmit={handleSubmitValue}>
            {({ values, handleSubmit, handleChange }) => (
              <>
                <div className="row w-[150px] pt-2">
                  <DataParsed timestamp={venda.datetime} format="DD/MM/YYYY" />
                </div>
                <div className="w-[150px] pt-2 border border-black text-center">
                  {venda.userID}
                </div>
                <div className="w-[150px] pt-2 border border-black text-center">
                  {venda.userName}
                </div>
                <Form className="flex">
                  <div className="border pt-2 text-center border-black">
                    <div className="flex w-[88px] justify-evenly">
                      <label className="mx-1">
                        R
                        <Field
                          type="radio"
                          className="ml-2 scale-150"
                          name="tipo"
                          value="R"
                        ></Field>
                      </label>
                      <label className="mx-1">
                        N
                        <Field
                          type="radio"
                          className="ml-2 scale-150"
                          name="tipo"
                          value="N"
                        ></Field>
                      </label>
                    </div>
                  </div>
                  <div className="border border-black text-center">
                    <input
                      onChange={handleChange}
                      name="banco"
                      value={values.banco}
                      className="form-input capitalize w-[140px]"
                      list="bank"
                    />
                    <datalist id="bank">
                      {bancos.map((banco) => (
                        <option key={banco} value={banco}>
                          {banco}
                        </option>
                      ))}
                    </datalist>
                  </div>
                  <div className="border border-black text-center">
                    <Field
                      name="quantidade"
                      className="form-input max-w-[80px] input-number"
                      type="number"
                      placeholder="Qnt."
                    ></Field>
                  </div>
                  <div className="border border-black text-center">
                    <Field
                      name="valorVenda"
                      className="form-input max-w-[100px] input-number"
                      type="number"
                      placeholder="R$ 100.00"
                    ></Field>
                  </div>
                  <div className="w-[110px] pt-2 border border-black text-center">
                    <Real valor={values.quantidade * venda.custoUnitario} />
                  </div>
                  <div className="w-[110px] pt-2 border border-black text-center">
                    <Real
                      valor={
                        values.valorVenda -
                        values.quantidade * venda.custoUnitario
                      }
                    />
                  </div>
                  <div className="w-[110px] pt-2 border border-black text-center">
                    {values.banco && values.quantidade && values.valorVenda ? (
                      <input
                        className="scale-150"
                        type="checkbox"
                        onInput={handleSubmit}
                      />
                    ) : (
                      <input className="scale-150" type="checkbox" disabled />
                    )}
                  </div>
                  <div className="w-[40px] justify-evenly flex p-1 border border-black text-center">
                    <a
                      className="p-2 block mt-1 delete hover:cursor-pointer"
                      onClick={() => deletarVenda(venda.id)}
                    ></a>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </div>
      ) : (
        <div className="flex justify-start" id="c">
          <div className="row w-[150px]">
            <DataParsed timestamp={venda.datetime} format="DD/MM/YYYY" />
          </div>
          <div className="row w-[150px]">{venda.userID}</div>
          <div className="row w-[150px]">{venda.userName}</div>
          <form className="flex">
            <div className="row w-[90px]">{venda.tipo}</div>
            <div className="row w-[150px] capitalize">{venda.banco}</div>
            <div className="row w-[90px]">{venda.quantidade}</div>
            <div className="row w-[110px]">
              <Real valor={venda.valorVenda} />
            </div>
            <div className="row w-[110px]">
              <Real valor={venda.quantidade * venda.custoUnitario} />
            </div>
            <div className="row w-[110px]">
              <Real
                valor={
                  venda.valorVenda - venda.quantidade * venda.custoUnitario
                }
              />
            </div>
            <div className="row w-[110px]">
              <a
                className="p-2 block task mt-1 hover:cursor-pointer"
                onClick={() => editVenda(venda.id)}
              ></a>
            </div>
            <div className="w-[40px] justify-evenly flex p-1 border border-black text-center">
              <a
                className="p-2 block delete mt-1 hover:cursor-pointer"
                onClick={() => deletarVenda(venda.id)}
              ></a>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
export default VendaColuna;
