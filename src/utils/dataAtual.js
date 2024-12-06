import { format, subMonths, subDays, addMonths } from 'date-fns';

export function getHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, "0"); 
  const minuto = data.getMinutes().toString().padStart(2, "0"); 
  return `${hora}:${minuto}`; 
}

export function getDataAtual() {
  const data = new Date();
  const ano = data.getFullYear();
  const mes = (data.getMonth() + 1).toString().padStart(2, "0"); 
  const dia = data.getDate().toString().padStart(2, "0"); 
  return `${ano}-${mes}-${dia}`; 
}

export function getDataDoisMesesAtras() {
  const data = new Date();
  const ano = data.getFullYear();
  const mes = (data.getMonth() - 1).toString().padStart(2, "0"); 
  const dia = data.getDate().toString().padStart(2, "0"); 
  return `${ano}-${mes}-${dia}`; 
}

export function getUmdiaAntes() {
  const data = new Date();
  const ano = data.getFullYear();
  const mes = (data.getMonth() + 1).toString().padStart(2, "0"); 
  const dia = (data.getDate() - 1).toString().padStart(2, "0"); 
  return `${ano}-${mes}-${dia}`; 
}

export function adicionarMeses(dataInicial, meses) {
  const data = new Date(dataInicial);
  return format(addMonths(data, meses), 'yyyy-MM-dd');
}