// Exercício 8: Objetos
// Crie um script que receba um objeto representando uma pessoa e faça as seguintes
// operações:
// 1. Adicione uma nova propriedade ao objeto.
// 2. Remova uma propriedade do objeto.
// 3. Liste todas as propriedades do objeto.
// Utilize o objeto { nome: "Carlos", idade: 28, cidade: "São Paulo" } para os testes.

const pessoa = {
    nome: "Carlos",
    idade: 28,
    cidade: "São Paulo"
};

// 1. Adicionar uma nova propriedade ao objeto
pessoa.profissao = "Desenvolvedor";
console.log("Objeto após adicionar profissão:", pessoa);

// 2. Remover uma propriedade do objeto
delete pessoa.idade;
console.log("Objeto após remover a propriedade 'idade':", pessoa);

// 3. Listar todas as propriedades do objeto
console.log("Propriedades do objeto:");
for (let chave in pessoa) {
    console.log(`${chave}: ${pessoa[chave]}`);
}
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
function obterInfoLivro(livro) {
    const { titulo, autor } = livro;
    return `O livro "${titulo}" foi escrito por ${autor}.`;
}

const infoLivro = obterInfoLivro(livro);
console.log(infoLivro);