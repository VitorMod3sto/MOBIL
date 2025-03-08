// Exercício 9: Desestruturação de Objetos
// Crie um script que receba um objeto representando um livro e faça as seguintes
// operações:
// 1. Desestruture o título e o autor do objeto.
// 2. Crie uma função que receba o objeto e retorne uma string com o título e o
// autor.
// Utilize o objeto { titulo: "O Senhor dos Anéis", autor: "J.R. Tolkien", ano: 1954 }
// para os testes.

const livro = {
    titulo: "O Senhor dos Anéis",
    autor: "J.R. Tolkien",
    ano: 1954
};

// 1. Desestruturar o título e o autor do objeto
const { titulo, autor } = livro;
console.log(`Título: ${titulo}`);
console.log(`Autor: ${autor}`);

// 2. Criar uma função que receba o objeto e retorne uma string com o título e o autor
function obterInfoLivro({ titulo, autor }) {
    return `O livro "${titulo}" foi escrito por ${autor}.`;
}

const infoLivro = obterInfoLivro(livro);
console.log(infoLivro);