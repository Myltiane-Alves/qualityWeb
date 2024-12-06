import { Fragment } from "react"


export const ComprasActionNotaOrigemDistribuicao = () => {
  return (

    <Fragment>

    <section>
      <table className="table table-bordered table-hover table-responsive-lg table-striped w-100">
        <thead className="bg-primary-600">
          <tr>
            <th>N° Interno</th>
            <th>Item</th>
            <th>Descrição</th>
            <th>Cod Barras</th>
            <th>Linha</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </section>
    </Fragment>
  )
}
