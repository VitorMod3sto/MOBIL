// Exercício 6: Arrays
// Crie um script que receba um array de números e faça as seguintes operações:
// 1. Adicione um número ao final do array.
// 2. Remova o primeiro número do array.
// 3. Encontre o maior número do array.
// 4. Encontre o menor número do array.
// Utilize o array [10, 20, 30, 40, 50] para os testes.

const numeros = [10, 20, 30, 40, 50];

// 1. Adicionar um número ao final do array
numeros.push(60);
console.log(`Array após adicionar 60 no final: ${numeros}`);

// 2. Remover o primeiro número do array
numeros.shift();
console.log(`Array após remover o primeiro número: ${numeros}`);

// 3. Encontrar o maior número do array
const maiorNumero = Math.max(...numeros);
console.log(`Maior número do array: ${maiorNumero}`);

// 4. Encontrar o menor número do array
const menorNumero = Math.min(...numeros);
console.log(`Menor número do array: ${menorNumero}`);