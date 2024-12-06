import { Fragment } from "react"


export const ComprasActionDigitacaoDistribuicao = () => {
  return (

    <Fragment>

      <div className="">
        <section>
          <table id="tableDigitacaoDistribuicao" className="table table-bordered table-hover table-responsive-lg table-striped w-100">
            <caption></caption>
            <thead className="bg-primary-600">
              <tr>
                <th style={{border: "0px;"}}></th>
                <th style={{border: "0px;"}}></th>
                <th style={{border: "0px;"}}></th>
                <th style={{border: "0px;"}}></th>
                <th style={{border: "0px;"}}></th>
                <th style={{border: "0px;"}}></th>
                <th style={{border: "0px;"}}></th>
                <th style={{border: "0px;"}}></th>
                <th style={{border: "0px;"}}></th>
                <tr>
                  <th>N° Interno</th>
                  <th>Item</th>
                  <th>Descrição</th>
                  <th>Cod Barras</th>
                  <th>Linha</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <th>Total</th>
                  <th style={{ borderRight: "1px solid;"}}>Itens Restante</th>
                </tr>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </section>
      </div>

      <div className="row">
        <div className="col-sm-12 col-xl-12 d-none">
          <div id="resultadodistribuicaocompras">
          </div>
        </div>
      </div>
    </Fragment>
  )
}