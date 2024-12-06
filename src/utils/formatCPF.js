export const mascaraCPF = (cpf) => {
  return cpf
    .replace(/\D/g, '') 
    .replace(/(\d{3})(\d)/, '$1.$2') 
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') 
}

export const removerMascaraCPF = (cpf) => cpf.replace(/\D/g, '');

export const validarCPFFuncionario = async (cpf) => {
  cpf = cpf.replace(/\D/g, "");
  
  if(cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999") {
    return false;
  }
  return true;

}