import { Fragment } from "react"

export const ActionImportacaoArquivo = () => {
    return (
        <Fragment>
            <div 
                
                style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    marginTop: "2rem", 
                    padding: "1rem",
                    paddingBottom: "50rem",
                    backgroundColor: "transparent", 
                }}
            >

                <h1>Selecione o Arquivo para a importação</h1>
                <input type="file" name="file" id="file" className="inputfile" />
            </div>
        </Fragment>
    )
}