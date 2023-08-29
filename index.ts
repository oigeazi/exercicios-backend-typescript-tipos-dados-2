const fs = require("fs");

const lerArquivo = (): unknown => JSON.parse(fs.readFileSync("./db.json"));

const escreverArquivos = (dados: any): void => {
  fs.writeFileSync("./db.json", JSON.stringify(dados));
};

type Endereco = {
  cep: string;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
};

type Usuario = {
  nome: string;
  email: string;
  cpf: string;
  profissao?: string;
  endereco: Endereco | null;
};

function cadastrarUsuario(dados: Usuario): Usuario {
  const bd = lerArquivo() as Usuario[];
  bd.push(dados);
  escreverArquivos(bd);
  return dados;
}

function listarUsuarios(filtro?: string): Usuario[] {
  const bd = lerArquivo() as Usuario[];

  const usuarios = bd.filter((usuario) => {
    if (filtro) {
      return usuario.profissao === filtro;
    }
    return usuario;
  });

  return usuarios;
}

function detalharUsuario(cpf: string): Usuario {
  const bd = lerArquivo() as Usuario[];
  const usuario = bd.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário Não encontrado");
  }

  return usuario;
}

function atualizarUsuario(cpf: string, dados: Usuario) {
  const bd = lerArquivo() as Usuario[];
  const usuario = bd.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário Não encontrado");
  }
  Object.assign(usuario, dados);
  escreverArquivos(bd);

  return dados;
}

function excluirUsuario(cpf: string): Usuario {
  const bd = lerArquivo() as Usuario[];
  const usuario = bd.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário Não encontrado");
  }

  const exclusao = bd.filter((usuario) => {
    return usuario.cpf !== cpf;
  });

  escreverArquivos(exclusao);

  return usuario;
}

// Cadastrar um novo usuário
const novoUsuario: Usuario = {
  nome: "Novo Usuário",
  email: "novo@example.com",
  cpf: "111.222.333-44",
  profissao: "Designer",
  endereco: {
    cep: "12345-678",
    rua: "Rua Nova",
    bairro: "Novo Bairro",
    cidade: "Cidade Nova",
  },
};

cadastrarUsuario(novoUsuario);

// Listar todos os usuários
const todosUsuarios = listarUsuarios();
console.log("Todos os Usuários:");
console.log(todosUsuarios);

// Detalhar um usuário pelo CPF
const usuarioDetalhado = detalharUsuario("987.654.321-02");
console.log("Usuário Detalhado:");
console.log(usuarioDetalhado);

// Atualizar informações de um usuário
const usuarioAtualizado = {
  nome: "Usuário Atualizado",
  email: "atualizado@example.com",
  cpf: "111.222.333-44",
  profissao: "Engenheiro",
  endereco: {
    cep: "54321-987",
    rua: "Rua Atualizada",
    bairro: "Bairro Atualizado",
    cidade: "Cidade Atualizada",
  },
};

atualizarUsuario("987.654.321-00", usuarioAtualizado);

// Excluir um usuário pelo CPF
const usuarioExcluido = excluirUsuario("111.222.333-44");
console.log("Usuário Excluído:");
console.log(usuarioExcluido);
