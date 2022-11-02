import { setDoc, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import React from "react";
import Real from "./ComponentReal";
import { Formik, Form, Field } from "formik";
import { useUserAuth } from "../contexts/AuthContext";
import { reloadList } from "../utils/updateList";
import DataParsed from "./dataParsed";

function VendaColuna({ venda }) {
  const { user } = useUserAuth();
  const reloadUpdate = reloadList((state) => state.toggle);

  const bancos = ["Santander", "Nubank", "Mercado Pago"];

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
    alert("Deletar");
    await deleteDoc(doc(db, user.uid, vendaId));
    reloadUpdate();
  }

  return (
    <>
      {venda.confirmado === false ? (
        <div
          className="flex justify-start"
          id="e"
        >
          <Formik
            initialValues={venda}
            onSubmit={handleSubmitValue}
          >
            {({ values, handleSubmit, handleChange }) => (
              <>
                <div className=" w-[150px] pt-2 text-center">
                  <DataParsed
                    timestamp={venda.datetime}
                    format="DD/MM/YYYY"
                  />
                </div>
                <div className="w-[150px] pt-2  text-center">{venda.userID}</div>
                <div className="w-[150px] pt-2  text-center">{venda.userName}</div>
                <Form className="flex">
                  <div className="pt-2 ">
                    <div className="flex w-[88px] justify-evenly">
                      <label className="mx-1">
                        R
                        <Field
                          type="radio"
                          className="ml-2 form-radio"
                          name="tipo"
                          value="R"
                        ></Field>
                      </label>
                      <label className="mx-1">
                        N
                        <Field
                          type="radio"
                          className="ml-2 form-radio"
                          name="tipo"
                          value="N"
                        ></Field>
                      </label>
                    </div>
                  </div>
                  <div className="">
                    <input
                      onChange={handleChange}
                      name="banco"
                      value={values.banco}
                      className="form-input capitalize w-[140px] "
                      list="bank"
                    />
                    <datalist id="bank">
                      {bancos.map((banco) => (
                        <option
                          key={banco}
                          value={banco}
                        >
                          {banco}
                        </option>
                      ))}
                    </datalist>
                  </div>
                  <div className="">
                    <Field
                      name="quantidade"
                      className="form-input max-w-[90px]  input-number"
                      type="number"
                      placeholder="Qnt."
                    ></Field>
                  </div>
                  <div className="">
                    <Field
                      name="valorVenda"
                      className="form-input max-w-[110px]  input-number"
                      type="number"
                      placeholder="R$ 100.00"
                    ></Field>
                  </div>
                  <div className="w-[110px] pt-2 text-center ">
                    <Real valor={values.quantidade * venda.custoUnitario} />
                  </div>
                  <div className="w-[110px] pt-2 text-center ">
                    <Real
                      valor={
                        values.valorVenda -
                        values.quantidade * venda.custoUnitario
                      }
                    />
                  </div>
                  <div className="w-[110px] pt-2 text-center ">
                    {values.banco && values.quantidade && values.valorVenda ? (
                      <input
                        className="form-checkbox scale-125"
                        type="checkbox"
                        onInput={handleSubmit}
                      />
                    ) : (
                      <input
                        className="form-checkbox scale-125"
                        type="checkbox"
                        disabled
                      />
                    )}
                  </div>
                  <div className="w-[40px] justify-evenly flex p-1 text-center ">
                    <a
                      className="p-2 block hover:cursor-pointer"
                      onClick={() => deletarVenda(venda.id)}
                    >
                      <svg
                        className="fill-slate-600 hover:fill-red-600 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 8 8"
                      >
                        <path d="M4 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-1.5 1.78l1.5 1.5 1.5-1.5.72.72-1.5 1.5 1.5 1.5-.72.72-1.5-1.5-1.5 1.5-.72-.72 1.5-1.5-1.5-1.5.72-.72z" />
                      </svg>
                    </a>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </div>
      ) : (
        <div
          className="flex justify-start"
          id="c"
        >
          <div className="text-center w-[150px]">
            <DataParsed
              timestamp={venda.datetime}
              format="DD/MM/YYYY"
            />
          </div>
          <div className="text-center w-[150px]">{venda.userID}</div>
          <div className="text-center w-[150px]">{venda.userName}</div>
          <form className="flex">
            <div className="text-center w-[90px]">{venda.tipo}</div>
            <div className="text-center w-[140px] capitalize">{venda.banco}</div>
            <div className="text-center w-[90px]">{venda.quantidade}</div>
            <div className="text-center w-[110px]">
              <Real valor={venda.valorVenda} />
            </div>
            <div className="text-center w-[110px]">
              <Real valor={venda.quantidade * venda.custoUnitario} />
            </div>
            <div className="text-center w-[110px]">
              <Real
                valor={
                  venda.valorVenda - venda.quantidade * venda.custoUnitario
                }
              />
            </div>
            <div className="text-center w-[110px]">
              <a
                className="p-2 block hover:cursor-pointer"
                onClick={() => editVenda(venda.id)}
              >
                <svg
                className="mx-auto fill-slate-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 8 8"
                >
                  <path d="M0 0v7h7v-3.59l-1 1v1.59h-5v-5h3.59l1-1h-5.59zm7 0l-3 3-1-1-1 1 2 2 4-4-1-1z" />
                </svg>
              </a>
            </div>
            <div className="w-[40px] justify-evenly flex">
              <a
                className="p-2 block hover:cursor-pointer"
                onClick={() => deletarVenda(venda.id)}
              >
                <svg
                  className="fill-slate-600 hover:fill-red-600 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 8 8"
                >
                  <path d="M4 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-1.5 1.78l1.5 1.5 1.5-1.5.72.72-1.5 1.5 1.5 1.5-.72.72-1.5-1.5-1.5 1.5-.72-.72 1.5-1.5-1.5-1.5.72-.72z" />
                </svg>
              </a>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
export default VendaColuna;
