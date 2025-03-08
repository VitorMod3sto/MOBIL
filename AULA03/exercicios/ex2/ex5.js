// Exercício 5: Funções
// Crie um script que tenha uma função que receba um número e retorne:
// 1. O dobro do número.
// 2. O triplo do número.
// 3. O quadrado do número.

// Utilize o número 5 para os testes.

function calcularNumeros(num) {
    const dobro = num * 2;
    const triplo = num * 3;
    const quadrado = num * num;

    return { dobro, triplo, quadrado };
}

const resultado = calcularNumeros(5);

console.log(`Dobro: ${resultado.dobro}`);
console.log(`Triplo: ${resultado.triplo}`);
console.log(`Quadrado: ${resultado.quadrado}`);