import { ButtonTypeModal } from "../../../Buttons/ButtonTypeModal"
import { FooterModal } from "../../../Modais/FooterModal/footerModal"
import { HeaderModal } from "../../../Modais/HeaderModal/HeaderModal"
import { Modal } from "react-bootstrap"
import { Fragment } from "react"
import { ActionListaProdutosSelecionadoDestino } from "./actionListaProdutosSelecionadoDestino"
import { ActionListaProdutosSelecionadoOrigem } from "./actionListaProdutosSelecionadoOrigem"
export const ActionProdutoModalPromocaoSelecionado = ({ 
    dadosProdutosPromocaoDaPromocao, 
    show, 
    handleClose,  
    produtoDestinoSelecionado,
    setProdutoDestinoSelecionado, 
    produtoOrigemSelecionado,
    setProdutoOrigemSelecionado, 
    refetchProdutosPromocoes
}) => {
    return (
        <Fragment>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                className="modal fade"
                tabIndex={-1}
                role="dialog"
                aria-hidden="true"

            >

                <HeaderModal
                    title={"Lista de Produtos Origem Selecioado"}
                    // subTitle={"Po"}
                    handleClose={handleClose}
                />

                <Modal.Body>

                    {/* <ActionListaProdutosPromocaoSelecionado
                        dadosProdutosPromocaoDaPromocao={dadosProdutosPromocaoDaPromocao} 
                        produtoDestinoSelecionado={produtoDestinoSelecionado}
                        setProdutoDestinoSelecionado={setProdutoDestinoSelecionado} 
                        produtoOrigemSelecionado={produtoOrigemSelecionado}
                        setProdutoOrigemSelecionado={setProdutoOrigemSelecionado}
                        refetchProdutosPromocoes={refetchProdutosPromocoes}
                        handleClose={handleClose}
                    /> */}

                    <ActionListaProdutosSelecionadoOrigem produtoOrigemSelecionado={produtoOrigemSelecionado}/> 

                    {/* <ActionListaProdutosSelecionadoDestino produtoDestinoSelecionado={produtoDestinoSelecionado} /> */}
                    <FooterModal
                        ButtonTypeFechar={ButtonTypeModal}
                        onClickButtonFechar={handleClose}
                        textButtonFechar={"Fechar"}
                        corFechar={"secondary"}
                    />
                </Modal.Body>

            </Modal>
        </Fragment>
    )
}