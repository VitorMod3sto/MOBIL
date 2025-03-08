// Exercício 3: Estruturas de Controle
// Crie um script que receba uma idade e verifique se a pessoa é:
// 1. Menor de idade.
// 2. Maior de idade.
// 3. Idosa (idade >= 65).
// Utilize a idade 70 para os testes.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Digite sua idade: ", (idade) => {
    idade = parseInt(idade); // Convertendo para número inteiro

    if (idade < 18) {
        console.log("Você é menor de idade.");
    } else if (idade >= 65) {
        console.log("Você é idoso.");
    } else {
        console.log("Você é maior de idade.");
    }

    rl.close();
});