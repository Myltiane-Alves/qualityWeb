//  TPAPARTIRDE = 0  aplicação destino por pares
//  TPAPARTIRDE = 1  aplicação destino em todos os produtos
//  TPAPARTIRDE = 2  aplicação destino no ultimo após entrada da promoção
//  TPAPARTIRDE = 3  aplicação destino menos na primeira
//  TPAPARTIRDE = 4  aplicação destino em 1(um) produto

// TABELAS RESUMOPROMOCAOMARKETING
// TPAPLICADOA = 1->APLICADO A VALOR  2-> APLICADO A QUANTIDADE
// TPFATORPROMO = USADO PARA O PDV IDENTIFICAR A PROMOCAO
// 	TPFATORPROMO = 0  por valor final
//  TPFATORPROMO = 1  por valor desconto
// 	TPFATORPROMO = 2  por percentual desconto

/*
  1. Primeira mecânica: Bloqueada não poderá funcionar juntas
  
  PROMOÇÃO POR  PARES  VALOR  VALOR DESCONTO
  se e aplicacaoDestinoSelecionada = 0 e mecanicaSelecionada = 1 e tipoDescontoSelecionado = 1 
  TPAPARTIRDE = 4 E TPAPLICADOA = 2 E TPFATORPROMO = 2 
  
  PROMOÇÃO POR EM UM PRODUTO QUANTIDADE  PERCENTUAL DESCONTO
  se e aplicacaoDestinoSelecionada = 4  mecanicaSelecionada = 2 e tipoDescontoSelecionado = 2 
  TPAPARTIRDE = 0 E TPAPLICADOA = 1 E TPFATORPROMO = 1
  
*/


/*

    1. COMBO FUNCIONANDO

    PROMOÇÃO POR EM UM PRODUTO VALOR PERCENTUAL DESCONTO  IDRESUMOPROMOCAOMARKETING = 15
    Valor Desconto 10
    Porcentagem % 20
    IDPRODUTO
    1_330257844
    1_330257885


    PROMOÇÃO POR  TODOS OS PRODUTOS VALOR VALOR DESCONTO IDRESUMOPROMOCAOMARKETING = 16
    Apartir do Valor 2
    valor desconto 1
    IDPRODUTO
    1_330257884
    1_330257811

    PROMOÇÃO POR ÚLTIMO APÓS ENTRADA DA PROMOÇÃO  QUANTIDADE VALOR FINAL IDRESUMOPROMOCAOMARKETING = 21
    Quantidade apartir de 1
    Valor Final 5
    IDPRODUTO
    1_330257793
    1_330257818

*/