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

     Não podem rodar juntas: POR PARES; MENOS NA PRIMEIRA
    1.1 COMBO funciona porém a por pares e menos na primeira não funcionam juntas
    precisa ser criada uma lógica para não serem usadas em conjunto.
    
    PROMOÇÃO POR PARES // QUANTIDADE // PERCENTUAL DESCONTO IDRESUMOPROMOCAOMARKETING = 1
    Quantidade apartir de 1
    Porcentagem % 4
    IDPRODUTO
    1_330231104
    2_390141096

    PROMOÇÃO POR TODOS OS PRODUTOS // VALOR // PERCENTUAL DESCONTO   IDRESUMOPROMOCAOMARKETING = 21
    apartir do valor 1
    Porcentagem % 6
    IDPRODUTO
    1_330257809
    1_330257807

    PROMOÇÃO POR MENOS NA PRIMEIRA // QUANTIDADE // VALOR FINAL IDRESUMOPROMOCAOMARKETING = 15
    Quantidade apartir de 1
    desconto valor final 3
    IDPRODUTO
    1_330257844
    1_330257885
    2_390140957
    
*/


/*

 3.3 COMBO  funciona corretamente, com tipo de desconto diferente.
    
        PROMOÇÃO POR PARES // QUANTIDADE // PERCENTUAL DESCONTO IDRESUMOPROMOCAOMARKETING = 1
        Quantidade apartir de 1
        Porcentagem % 4
        IDPRODUTO
        1_330231104
        2_390141096

          PROMOÇÃO POR TODOS OS PRODUTOS // QUANTIDADE // VALOR FINAL IDRESUMOPROMOCAOMARKETING = 14
        Quantidade apartir de 1
        desconto valor final 4
        IDPRODUTO
        2_390139337
        1_330257843
*/

/*

Combinações Inválidas (para comparação):
❌ PROMOÇÃO POR PARES // QUANTIDADE // PERCENTUAL DESCONTO (1)
PROMOÇÃO POR PARES // VALOR // PERCENTUAL DESCONTO (5)
(Inválido - mesma aplicação destino "Pares")

❌ PROMOÇÃO POR TODOS OS PRODUTOS // QUANTIDADE // VALOR FINAL (14)
PROMOÇÃO POR TODOS OS PRODUTOS // VALOR // VALOR DESCONTO (10)
(Inválido - mesma aplicação destino "Todos")

❌ PROMOÇÃO POR EM UM PRODUTO // QUANTIDADE // PERCENTUAL DESCONTO (4)
PROMOÇÃO POR EM UM PRODUTO // VALOR // PERCENTUAL DESCONTO (8)
(Inválido - mesma aplicação destino "Em um produto")
*/