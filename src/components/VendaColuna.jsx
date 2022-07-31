import { setDoc, collection, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import React from 'react';
import Real from './ComponentReal';
import { Formik, Form, Field } from 'formik';
import { useUserAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DataParsed from './dataParsed';
import Datalist from './Datalist';

function VendaColuna(prop) {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  async function handleSubmitValue(values) {
    const docRef = doc(collection(db, user.uid), prop.venda.id);
    await setDoc(docRef, values, { merge: true });
    navigate('/');
  }

  async function deletarVenda(vendaId) {
    alert('Deletar');
    await deleteDoc(doc(db, user.uid, vendaId));
    navigate('/');
  }

  return (
    <div className="flex justify-start" id="e">
      <Formik
        initialValues={{
          tipo: 'R',
          banco: '',
          valorVenda: '',
          quantidade: '',
          confirmado: true,
        }}
        onSubmit={handleSubmitValue}
      >
        {({ values, handleSubmit }) => (
          <>
            <div className="footer w-[150px] pt-2">
              <DataParsed timestamp={prop.venda.datetime} format="DD/MM/YYYY" />
            </div>
            <div className="w-[150px] pt-2 border border-black text-center">
              {prop.venda.userID}
            </div>
            <div className="w-[150px] pt-2 border border-black text-center">
              {prop.venda.userName}
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
                <Field name="banco" placeholder="Banco" as={Datalist}></Field>
              </div>
              <div className="border border-black text-center">
                <Field
                  name="quantidade"
                  className="form-input max-w-[80px]"
                  type="number"
                  placeholder="Qnt."
                ></Field>
              </div>
              <div className="border border-black text-center">
                <Field
                  name="valorVenda"
                  className="form-input max-w-[100px]"
                  type="number"
                  placeholder="R$ 100.00"
                ></Field>
              </div>
              <div className="w-[110px] pt-2 border border-black text-center">
                <Real valor={values.quantidade * prop.venda.custoUnitario} />
              </div>
              <div className="w-[110px] pt-2 border border-black text-center">
                <Real
                  valor={
                    values.valorVenda -
                    values.quantidade * prop.venda.custoUnitario
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
              <div className="w-[110px] pt-1 border border-black text-center">
                <a
                  className="button mx-1 hover:cursor-pointer bg-blue-600"
                  onClick={() => deletarVenda(prop.venda.id)}
                >
                  E
                </a>
                <a
                  className="button mx-1 hover:cursor-pointer"
                  onClick={() => deletarVenda(prop.venda.id)}
                >
                  X
                </a>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}
export default VendaColuna;
