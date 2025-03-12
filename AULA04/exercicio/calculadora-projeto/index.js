// Importação (Exercício 1)
import { soma, subtracao, multiplicacao, divisao } from './calculadora.js';
import moment from 'moment';

console.log("Soma: ", soma(10, 5));
console.log("Subtração: ", subtracao(10, 5));
console.log("Multiplicação: ", multiplicacao(10, 5));
console.log("Divisão: ", divisao(10, 2));


// Exercício 2
// Definindo o ano de nascimento e calculando idade

function calcularIdade(anoNascimento) {
    const dataAtual = moment(); 
    const dataNascimento = moment(`${anoNascimento}-01-01`, "YYYY-MM-DD"); 
    
    // Calculando a idade
    const idade = dataAtual.year() - dataNascimento.year();    
    return idade;
  }


const anoNascimento = 1990;
const idade = calcularIdade(anoNascimento);

// Exibindo a idade no console
console.log(`Idade: ${idade} anos`);

// Exibindo a data de nascimento no formato DD/MM/yyyy
const hoje = moment().locale('pt-br');
console.log("Data atual: " + hoje.format('DD/MM/yyyy'));
