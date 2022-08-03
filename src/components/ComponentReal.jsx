function Real({ valor }) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default Real;