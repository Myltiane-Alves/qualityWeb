export const dataFormatada = (date) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('pt-BR', options);
  return formattedDate;
};

export const dataHoraFormatada = (date) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const formattedDateTime = new Date(date).toLocaleString('pt-BR', options);
  return formattedDateTime;
};

export const formatarDataDTW = (data) => {
  if (!data) return '';

  // Verifica se a data está no formato ISO 8601
  if (data.includes('T')) {
      const dataObj = new Date(data);
      return `${dataObj.getFullYear()}${('0' + (dataObj.getMonth() + 1)).slice(-2)}${('0' + dataObj.getDate()).slice(-2)}`;
  }

  // Verifica se a data está no formato yyyy-mm-dd
  if (data.includes('-')) {
      return data.replace(/-/g, '');
  }

  // Verifica se a data está no formato dd/mm/yyyy
  if (data.includes('/')) {
      const partes = data.split(' ')[0].split('/');
      return `${partes[2]}${partes[1]}${partes[0]}`;
  }

  return '';
}

export const  formatMesAnoDTW = (date) => {
  const [day, month, year] = date.split("/"); 
  return `${month}/${year}`;
}