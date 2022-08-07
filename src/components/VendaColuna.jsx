import { setDoc, collection, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import React, { useState, useEffect } from 'react';
import Real from './ComponentReal';
import { Formik, Form, Field } from 'formik';
import { useUserAuth } from '../contexts/AuthContext';
import { reloadList } from "../utils/updateList"
import DataParsed from './dataParsed';
import moment from 'moment';

function VendaColuna({ venda }) {
  const [bancos, setBancos] = useState([]);

  const { user } = useUserAuth();
  const reloadUpdate = reloadList((state) => state.toggle)

  async function handleSubmitValue(values) {
    // let datetimeIn
    // if(typeof values.datetime === "object"){
    //   datetimeIn = moment.unix(values.datetime.seconds).format("YYYY-MM-DD")
    // }else{
    //   datetimeIn = values.datetime
    // }
    const docRef = doc(collection(db, user.uid), venda.id);
    await setDoc(docRef, { ...values, updatetime: moment().toDate(), confirmado: true }, { merge: true });
    reloadUpdate()
  }


  async function editVenda(vendaId) {
    const docRef = doc(collection(db, user.uid), vendaId);
    await setDoc(docRef, { confirmado: false }, { merge: true });
    // navigate('/');
    reloadUpdate()
  }

  async function deletarVenda(vendaId) {
    alert('Deletar');
    await deleteDoc(doc(db, user.uid, vendaId));
    reloadUpdate()
  }


  async function getBancos() {
    const docRef = await getDoc(doc(db, "config", "bancos"))
    setBancos(docRef.get("listBancos"))
  }
  useEffect(() => {
    getBancos()
  }, [])

  return (
    <>
      {/* apagar se necessario */}
      {
        venda.confirmado === false ?
          <div className="flex justify-start" id="e">
            <Formik
              initialValues={venda}
              onSubmit={handleSubmitValue}
            >
              {({ values, handleSubmit, handleChange }) => (
                <>
                  <div className="footer w-[150px] pt-2">
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
                      <input onChange={handleChange} name="banco" value={values.banco} className="form-input capitalize w-[140px]" list="bank" />
                      <datalist id="bank">
                        {bancos.map(banco => (<option key={banco} value={banco}>{banco}</option>))}
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
                    <div className="w-[110px] justify-evenly flex p-1 border border-black text-center">
                      <a
                        className="p-2 block min-w-[25px] rounded delete border border-black hover:cursor-pointer"
                        onClick={() => deletarVenda(venda.id)}
                      ></a>
                    </div>
                  </Form>
                </>
              )
              }
            </Formik>
          </div> :
          <>
            {typeof venda.datetime === "string" ?
              <></> :
              <div className="flex justify-start" id="c">
                <div className="footer w-[150px]">
                  <DataParsed timestamp={venda.datetime} format="DD/MM/YYYY" />
                </div>
                <div className="footer w-[150px]">{venda.userID}</div>
                <div className="footer w-[150px]">{venda.userName}</div>
                <form className="flex">
                  <div className="footer w-[90px]">{venda.tipo}</div>
                  <div className="footer w-[150px] capitalize">{venda.banco}</div>
                  <div className="footer w-[90px]">{venda.quantidade}</div>
                  <div className="footer w-[110px]"><Real valor={venda.valorVenda} /></div>
                  <div className="footer w-[110px]"><Real valor={venda.quantidade * venda.custoUnitario} /></div>
                  <div className="footer w-[110px]"><Real valor={venda.valorVenda - (venda.quantidade * venda.custoUnitario)} /></div>
                  <div className="footer w-[110px]"><div className="task min-w-full h-4"></div></div>
                  <div className="w-[110px] justify-evenly flex p-1 border border-black text-center">
                    <a
                      className="p-2 block min-w-[25px] rounded pencil border border-black hover:cursor-pointer"
                      onClick={() => editVenda(venda.id)}
                    ></a>
                    <a
                      className="p-2 block min-w-[25px] rounded delete border border-black hover:cursor-pointer"
                      onClick={() => deletarVenda(venda.id)}
                    ></a>
                  </div>
                </form>
              </div>
            }
          </>
      }
    </>
  );
}
export default VendaColuna;
