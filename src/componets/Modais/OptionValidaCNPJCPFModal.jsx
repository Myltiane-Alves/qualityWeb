import { Fragment, useState } from "react"
import Modal from 'react-bootstrap/Modal';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineHelpOutline } from "react-icons/md";
import ModalValidaCadastroClienteCNPJ from "./ModalValidaCadastroClienteCNPJ";
import ModalValidaCadastroClienteCPF from "./ModalValidaCadastroClienteCPF";
import ValidaCadastroClienteCPFModal from "./ModalValidaCadastroClienteCPF";


export default function OptionValidaCNPJCPFModal({ show, handleCloseModalOption }) {
  const [ValidaCadastroCPF, setValidaCadastroCPF] = useState(false);
  const [modalValidaCadastroCNPJ, setModalValidaCadastroCNPJ] = useState(false);
  const [showModalValidaCadastroCNPJ, setShowModalValidaCadastroCNPJ] = useState(false);
  const [showValidaCadastroCPF, setShowValidaCadastroCPF] = useState(false);
  const [fechaCloseModalOption, setFechaCloseModalOption] = useState(false);

  const handleShowModalValidaCadastroClientCNPJ = () => {
    setShowModalValidaCadastroCNPJ(true);
    // setFechaCloseModalOption(false)
    console.log(handleShowModalValidaCadastroClientCNPJ, "funcionou cnpj")
  } 

  const handleCloseModalValidaCadastroClientCNPJ = () => {
    setShowModalValidaCadastroCNPJ(false);
  }
  const handleShowModalValidaCadastroClientCPF = () => {
    setShowValidaCadastroCPF(true);
    // setFechaCloseModalOption(false)
    
    console.log(handleShowModalValidaCadastroClientCPF, "funcionou cpf")
  }

  const handleCloseModalValidaCadastroClientCPF = () => {
    setShowValidaCadastroCPF(false);
  }

  return (
    <Fragment>

      <Modal
        show={show}
        onHide={handleCloseModalOption}
        class="modal-content"
        centered
      >
        <div>

          <button
            type="button"
            className="btn"
            aria-label="Close this dialog"
            style={{ display: "flex", alignItems: "flex-start" }}
            onClick={handleCloseModalOption}
          >
            <AiOutlineCloseCircle size={22} />
          </button>
        </div>
        <Modal.Body
          // className="swal2-popup swal2-modal swal2-show"
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
        >
          <div class="swal2-header">
            <MdOutlineHelpOutline
              size={100}
              color="#886ab5"
              className="swal2-icon swal2-question swal2-animate-question-icon"
            // style={{border: "1px solid #beaed7"}}
            />
          </div>
          <h2 className="swal2-title" style={{ display: "flex" }}>Qual o tipo do Cliente?</h2>
          <p>
            Clique na opção desejada para validar o CPF/CNPJ
          </p>
          <div style={{ display: "flex", justifyContent: "space-evenly", alignContent: "center", width: 200 }} >
            <div>

            <button
              type="button"
              className="btn btn-primary"
              aria-label=""
              onClick={handleShowModalValidaCadastroClientCPF}
              // style={{ display: "inline-block", borderLeftColor: "rgb(136, 106, 181)", borderRightColor: "rgb(136, 106, 181)" }}
            >
              CPF
            </button>
            </div>

            <div>

            <button
              type="button"
              className="btn btn-info"
              aria-label=""
              onClick={handleShowModalValidaCadastroClientCNPJ}
            // style={{display: "inline-block", backgroundColor: "rgb(48, 133, 214)"}}
            >
              CNPJ
            </button>
            </div>
          </div>

        </Modal.Body>
      </Modal>
      
      {modalValidaCadastroCNPJ && 
        <ModalValidaCadastroClienteCNPJ 
          show={showModalValidaCadastroCNPJ}
          handleShowModalValidaCadastroClientCNPJ={handleShowModalValidaCadastroClientCNPJ}
          handleCloseModalValidaCadastroClientCNPJ={handleCloseModalValidaCadastroClientCNPJ}
        />
      }

      {/* {ValidaCadastroCPF &&
       
        <ValidaCadastroClienteCPFModal
          show={showValidaCadastroCPF}
          handleShowModalValidaCadastroClientCPF={handleShowModalValidaCadastroClientCPF}
          handleCloseModalValidaCadastroClientCPF={handleCloseModalValidaCadastroClientCPF}
        />
      } */}
    </Fragment>
  )
}