import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

function GraphVendas({ data, tipo }) {
  return (
    <LineChart
      width={820}
      height={450}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      {
        tipo === "" ? (

          <Line
            type="monotone"
            dataKey="venda_mes"
            stroke="#8884d8"
          />
        ) :
        null
      }
      {
        tipo === "R" ? (

          <Line
            type="monotone"
            dataKey="venda_tipo_r"
            stroke="#8884d8"
          />
        ) :
        null
      }
      {
        tipo === "N" ? (

          <Line
            type="monotone"
            dataKey="venda_tipo_n"
            stroke="#8884d8"
          />
        ) :
        null
      }
      <CartesianGrid
        stroke="#ccc"
        strokeDasharray="5 5"
      />
      <Tooltip />
      <XAxis dataKey="mes"/>
      <YAxis />
    </LineChart>
  );
}
export default GraphVendas;
