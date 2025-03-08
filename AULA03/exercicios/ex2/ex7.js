// Exercício 7: Métodos de Arrays
// Crie um script que receba um array de strings e faça as seguintes operações:
// 1. Converta todas as strings para maiúsculas.
// 2. Filtre as strings que começam com a letra 'A'.
// 3. Crie um novo array com o comprimento de cada string.
// Utilize o array ["Maçã", "Banana", "Abacaxi", "Laranja"] para os testes.

const frutas = ["Maçã", "Banana", "Abacaxi", "Laranja"];

// 1. Converter todas as strings para maiúsculas
const frutasMaiusculas = frutas.map(fruta => fruta.toUpperCase());
console.log(`Frutas em maiúsculas: ${frutasMaiusculas}`);

// 2. Filtrar as strings que começam com a letra 'A'
const frutasComA = frutas.filter(fruta => fruta[0].toUpperCase() === 'A');
console.log(`Frutas que começam com 'A': ${frutasComA}`);

// 3. Criar um novo array com o comprimento de cada string
const comprimentoDasFrutas = frutas.map(fruta => fruta.length);
console.log(`Comprimento de cada fruta: ${comprimentoDasFrutas}`);