// Exportação

// Soma
export const soma = (a, b) => {
    return a + b;
}

// Subtração
export const subtracao = (a, b) => {
    return a - b;
}

// Multiplicação
export const multiplicacao = (a, b) => {
    return a * b;
}

// Divisão
export const divisao = (a, b) => {
    if (b === 0) {
        return "Divisão por zero! Inválida";
    }
    return a / b;
}
