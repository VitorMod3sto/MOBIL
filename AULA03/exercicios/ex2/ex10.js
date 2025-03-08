// Função para filtrar, multiplicar e somar os números
function processarArray(array) {
    // 1. Filtra os números pares
    const numerosPares = array.filter(num => num % 2 === 0);
    
    // 2. Multiplica cada número por 2
    const numerosMultiplicados = numerosPares.map(num => num * 2);
    
    // 3. Calcula a soma de todos os números
    const soma = numerosMultiplicados.reduce((acc, num) => acc + num, 0);
    
    return soma;
}

// Array de exemplo
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Chama a função e exibe o resultado
const resultado = processarArray(array);
console.log("Soma dos números processados:", resultado);
