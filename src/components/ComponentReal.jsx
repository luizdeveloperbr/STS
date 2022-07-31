function Real(valorNumero) {
return valorNumero.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default Real;