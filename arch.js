import React, { useState, useEffect, useRef } from 'react';
//import classNames from 'classnames';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import Axios from "axios";
import { TabView, TabPanel } from 'primereact/tabview';
import './DataTableDemo.css';
export const Archivo = () => {
    const [Archivo, setArchivo] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [selectedEnviado, setselectedEnviado] = useState(null);
    const dt = useRef(null);
    const dten = useRef(null);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [loading, setloading] = useState(false);
    const toast = useRef(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [globalFilterEnviado, setGlobalFilterEnviado] = useState(null);
    const [tipoComprobate, setTipoComprobate] = useState(null);
    const [DataComprobates, setDataComprobates] = useState([]);
    const [fechaincio, setfechaincio] = useState(null);
    const [fechafin, setfechafin] = useState(null);

    const [estadoError, setestadoError] = useState(0);

 

      useEffect(async () => {
        try {
          VerComprobantesEnviados();
        } catch (e) {
            console.error(e);
        }
       /* async function combo(params) {
         const resque =await axios.get(''); 
       } */
    }, []);

      const confirmDeleteSelected = () => {
          //abre la modal
        setDeleteProductsDialog(true);
    }

    const VerComprobantesEnviados = () =>{

      Axios({
        url: "http://localhost:8087/archivosenviados/0",
      })
        .then((response) => {
         // const rows= (response.data);
           console.log("comprobantes enviados"+ response.data);
           // setArchivo(response.data);
           setDataComprobates(response.data)
        
        })
        .catch((error) => {
          console.log(error);
        });

    }

    const seleccionarlistado =  (e) =>{
         console.log((e.target.value))
       // settipoComprobate(e.target.value);
          Axios({
            url: "http://localhost:8087/archivos/"+e.target.value,
          })
            .then((response) => {
              setArchivo(response.data);
              setTipoComprobate(e.target.value);
             // console.log("tipocomprobante"+tipoComprobate);
            })
            .catch((error) => {
              console.log(error);
            });
  
       } 

       const verArchivos = (tipo) =>{

        Axios({
          url: "http://localhost:8087/archivos/"+tipo,
        })
          .then((response) => {
            setArchivo(response.data);
           // setTipoComprobate(e.target.value);
           // console.log("tipocomprobante"+tipoComprobate);
          })
          .catch((error) => {
            console.log(error);
          });
       }

       const deleteSelectedProducts = () => {
       // setDeleteProductsDialog(false); +"\\"+element.nombreArchivo

       //D:\ArchvosXml
       setloading(true)
      // console.log("infor"+ JSON.stringify(selectedProducts)); 
      // const path="C:\\POS_EFACT\\DaemonOSE\\documents\\out\\";
     //  const path1="C:\\ArchvosXml\\";
       //C:\ArchvosXml
       //tipoDocumento
       selectedProducts.forEach(element => {
              /*   let fd = new FormData()
                fd.append('FileName', element.nombreArchivo);
                fd.append('Path', "C:\\POS_EFACT\\DaemonOSE\\documents\\out\\"+element.tipoDocumento+'\\');
                fd.append('Length', element.tamaodeArchivo);
                fd.append('ContentType', "application/xml");
                //http://192.168.15.202:81/api/efac/v1/enviararchivoxml
                 fetch('http://192.168.15.202:81/api/efac/v1/enviararchivoxml', {
                    method: 'POST',
                    body: fd,
                  })
                    .then((response) => {
                     console.log("response>>>>>>>>"+ JSON.stringify(response));
                    //setrespuesta(response.ok)
                    console.log(response)
                     if(response.ok==true){
                        setloading(false)
                        setDeleteProductsDialog(false);
                        setSelectedProducts(null)
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'los comprobantes enviados', life: 3000 });
                     //  seleccionarlistado()
                        console.log("tipooo"+tipoComprobate);
                        verArchivos(tipoComprobate);
                        VerComprobantesEnviados();
                     }else{
                        toast.current.show({ severity: 'error', summary: 'Successful', detail: 'error de envio', life: 3000 });
                        setloading(false)
                        setDeleteProductsDialog(false);
                     }
                    })
                    .catch((error) => {
                      console.log('Error:', error.message)
                      toast.current.show({ severity: 'info', summary: 'Successful', detail: 'Sin conexion con el server. comunicarse con el administrador', life: 3000 });
                      setloading(false)
                      setDeleteProductsDialog(false);
                      throw error
                    })  */

                    let fd = new FormData()
                    fd.append('FileName', element.nombreArchivo);
                    fd.append('Path', "C:\\POS_EFACT\\DaemonOSE\\documents\\out\\"+element.tipoDocumento+'\\');
                    fd.append('Length', element.tamaodeArchivo);
                    fd.append('ContentType', "application/xml");

                    Axios({
                      method: "post",
                      url: "http://192.168.15.202:81/api/efac/v1/enviararchivoxml",
                      data: fd,
                      headers: { "Content-Type": "multipart/form-data" },
                    })
                      .then(function (response) {
                        //handle success
                        console.log("todo el  objeto"+JSON.stringify(response.data))
                        console.log("mesajeee"+response.data.oResult.sMessage);
                         // console.log(response.data.oResult);
                        //  console.log(response.data.oResult.bSatisfactorio);
                        //console.log(response.data.oResult.sErrCode);
                         //const  mensajeerror=JSON.parse(response.data.bSatisfactorio);
                        // console.log(mensajeerror);
                          if(response.data.oResult.bSatisfactorio==true){
                            setloading(false)
                            setDeleteProductsDialog(false);
                            setSelectedProducts(null)
                            toast.current.show({ severity: 'success', summary: 'Satisfactorio', detail: response.data.oResult.sMessage, life: 3000 });
                            verArchivos(tipoComprobate);
                            VerComprobantesEnviados();
                          }else if(response.data.oResult.bSatisfactorio==false){
                            toast.current.show({ severity: 'error', summary: 'Información', detail: response.data.oResult.sErrCode, life: 3000 });
                            setloading(false)
                            setDeleteProductsDialog(false);

                          }else{
                            toast.current.show({ severity: 'info', summary: 'Error', detail: 'Error', life: 3000 });
                            setDeleteProductsDialog(false);
                          }
                      })
                      .catch(function (response) {
                        //handle error
                        toast.current.show({ severity: 'info', summary: ':-)', detail: 'Error de serve', life: 3000 });
                        console.log(response);
                      });
              });
       }

       const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" 
            onClick={hideDeleteProductsDialog} 
            />
            <Button label="Yes" icon="pi pi-check" className="p-button-success mr-2" disabled={loading}
            onClick={deleteSelectedProducts}
             />
        </>
       );

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Buscar Comprobantes</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar Comprobante..." />
            </span>
        </div>
    );

    const headerenviado = (
      <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
          <h5 className="m-0">Buscar comprobantes</h5>
          <span className="block mt-2 md:mt-0 p-input-icon-left">
              <i className="pi pi-search" />
              <InputText type="search" onInput={(e) => setGlobalFilterEnviado(e.target.value)} placeholder="Buscar comprobate..." />
          </span>
      </div>
  );

    const statusBodyTemplate = (rowData) => {
      console.log("situcion"+rowData.situcionActual)
      return (
        <>
            <Button label={rowData.situcionActual==0? 'No Enviado' :''} className="p-button-danger p-button-text mr-2 mb-2" />
        </>
    )
    }

    const statusBodyTemplateEnviado = (rowDataenviado) => {

      return (
        <>
           <Button label={rowDataenviado.situacionActual==1? 'Enviado' :''} className="p-button-rounded p-button-success mr-2 mb-2" />    
        </>
    )
    }

    const BuscarPorfechaarchivos = (e) => {

      console.log("buscar"+e.target.value);

      let busca = Archivo.filter(n => n.fecha == e.target.value);

      console.log("buscar"+JSON.stringify(busca));

     setArchivo(busca);


    }

    const leftToolbarTemplate = () => {
      return (
          <React.Fragment>
            <label> Comprobate &nbsp; </label>
              <select className="p-dropdown-label p-inputtext p-placeholder" aria-label="Default select example" 
                            onChange={seleccionarlistado}
                            >
                            <option value="0">Seleccionar </option>
                            <option value="invoice">Factura</option>
                            <option value="boleta">Boleta</option>
                            <option value="creditnote">Nota de crédito</option>
                            <option value="debitnote">Nota de débito</option>
                        </select>
                        <label>&nbsp; Buscar Por fecha &nbsp; </label>
                        <input type='date' className="p-dropdown-label p-inputtext p-placeholder" 
                              onChange={BuscarPorfechaarchivos}
                             />
          </React.Fragment>
      )
  }

  const rightToolbarTemplate = () => {
    return (
        <React.Fragment>
          <Button label="Procesar" icon="pi pi-plus" className="p-button-success mr-2"
                 onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> 
           
        </React.Fragment>
    )
}

/* const stockBodyTemplate = (rowData) => {
  const stockClassName = classNames({
    'red': rowData.code_result_efac != 0,
}); 
return (
  <div className={stockClassName}>
      {rowData.code_result_efac}
  </div>
);

} */

const rowClass = (data) => {
  return { 'row-accessories': (data.code_result_efac != 0) };
}

const stockBodyTemplate = (rowData) => {
  return (
    <>
      {
        rowData.code_result_efac==0 ?  <Button label="Exitoso" className="p-button-success p-button-text texto-negrita mr-2 mb-2" />   :  <Button label={rowData.code_result_efac} className="p-button-danger p-button-text row-accessories mr-2 mb-2" />
      }
    
      </>
  );
}
const BuscarPorfecha = (e) =>{

    setfechafin(e.target.value)
   if(fechaincio==null ){
    alert("Selecionar fecha incio ");
   }else{
    Axios({
      url: "http://localhost:8087/buscar/"+fechaincio+'/'+e.target.value,
    })
      .then((response) => {
       setDataComprobates(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
   }
  
}

const verTicketTemplate = (rowData) => {
  /* let enlace = `http://192.168.15.202:81/api/efac/v1/obtenerarchivopdf/${rowData.description_result_efac}`;
  Axios.get(enlace,{
    responseType: 'blob',
  }).then(response=>{
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href= url
    link.setAttribute('download','Ticket.pdf')
    document.body.appendChild(link)
    link.click();

  }).catch(error=>{
  console.log(error);
  }); */

  return (<>
      <a href={'http://192.168.15.202:81/api/efac/v1/obtenerarchivopdf/'+rowData.description_result_efac}>{rowData.description_result_efac}</a>
  </>
  );


}

const seleccionarEnviado =(e)=>{
  setestadoError(e.target.value);
  console.log((e.target.value))
  // settipoComprobate(e.target.value);
     Axios({
       url: "http://localhost:8087/archivosenviados/"+e.target.value,
     })
       .then((response) => {
         console.log(response.data)
        // setArchivo(response.data);
        // setTipoComprobate(e.target.value);
        // console.log("tipocomprobante"+tipoComprobate);
        setDataComprobates(response.data)
       })
       .catch((error) => {
         console.log(error);
       });


}


const seleccionarComprobantePorestado =(e)=>{
 // estadoError
 console.log(estadoError);
 // if(estadoError!=""){ 
    Axios({
      url: "http://localhost:8087/vertipocomprobante/"+e.target.value+'/'+estadoError,
    })
      .then((response) => {
        console.log("inffooo"+response.data)
       // setArchivo(response.data);
       // setTipoComprobate(e.target.value);
       // console.log("tipocomprobante"+tipoComprobate);
       setDataComprobates(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

 /*  }else{
    console.log("entroo");

  } */

}

    return (
        <div className="card">
        <div className="grid">
            <div className="col-12">
            <TabView>
                <TabPanel header="Comprobantes sin Enviar">
                <div className="card">
                <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate}  
                    right={rightToolbarTemplate} 
                     >
                    </Toolbar>
                <DataTable 
                        ref={dt} 
                        value={Archivo} 
                        selection={selectedProducts} 
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="ver {first} to {last} of {totalRecords} comprobantes"
                        globalFilter={globalFilter} 
                        emptyMessage="Comprobate no encontrado." 
                       // header={header}
                        >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="tipoArchivo" header="Tipo de Archivo"  
                        ></Column>
                        <Column field="fechaCreacion" header="Fecha de Creacion"  sortable></Column>
                        <Column field="nombreArchivo" header="Nombre de Archivo"  headerStyle={{ width: '20rem' }}
                        ></Column>
                        <Column field="tamaodeArchivo"  header="Tamaño de Archivo" ></Column>
                        <Column field="cantidadImpreso" header="Cantida de Impreso"  ></Column>
                        <Column field="situcionActual" header="situcion Actual"  body={statusBodyTemplate}
                        ></Column>
                        <Column field="usuarioRegistrado" header="Usuario Registrado"  sortable></Column>
                </DataTable>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" 
                    modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                             {Archivo && <span>Seguro desea enviar los comprobantes?</span>} 
                        </div>
                    </Dialog>
                </div>
           
                  </TabPanel>
                        <TabPanel header="Comprobantes Enviados">
                        <div className="grid p-fluid"> 
                        <div className="col-1 ">
                        <div className="p-inputgroup">
                          <label>Desde:</label>
                          </div>
                        </div>
                        <div className="col-2">
                            <div className="p-inputgroup">
                              <input type='date' className="p-dropdown-label p-inputtext p-placeholder" 
                              onChange={(e) => setfechaincio(e.target.value)}/>
                            </div>
                        </div>
                        
                        <div className="col-1">
                        <label>Hasta:</label>
                        </div>

                        <div className="col-2">
                            <div className="p-inputgroup">
                             <input type='date' className="p-dropdown-label p-inputtext p-placeholder" 
                              onChange={BuscarPorfecha}
                             />
                            </div>
                        </div>



                        <div className="col-3">
                        <select className="p-dropdown-label p-inputtext p-placeholder" aria-label="Default select example" 
                           onChange={seleccionarComprobantePorestado}
                            >
                            <option value="0">Selecionar Comprobante </option>
                            <option value="01">Factura</option>
                            <option value="03">Boleta</option>
                            <option value="07">Nota de Crédito</option>
                        </select>
                        </div> 


                        <div className="col-3">
                        <select className="p-dropdown-label p-inputtext p-placeholder" aria-label="Default select example" 
                            onChange={seleccionarEnviado}
                            >
                            <option value="0">Todos </option>
                            <option value="1">Exitosos</option>
                            <option value="2">Errores</option>
                        </select>
                        </div> 

                      
                          </div>
                          
                        <DataTable   
                         value={DataComprobates} 
                         selection={selectedEnviado} 
                         ref={dten} 
                         dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                         paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                         currentPageReportTemplate="Showing {first} to {last} of {totalRecords} archivos"
                         //globalFilterEnviado={globalFilterEnviado}
                         emptyMessage="No hay Comprobante enviados." 
                         header={header}
                         globalFilter={globalFilter} 
                         onSelectionChange={(e) => setselectedEnviado(e.value)}
                         rowClassName={rowClass}
                         //headerStyle={{ color: 'red' }}
                        >
                         <Column field="id" header="N°" headerStyle={{ width: '2rem' }} ></Column>
                         <Column field="nombreArchivo" header="Nombre Archivo" ></Column>
                         <Column field="tipoArchivo" header="Tipo Documento" ></Column>
                         <Column field="cantidadImpreso" header="IMP." ></Column>
                         <Column field="situacionActual" header="Situción Actual" body={statusBodyTemplateEnviado} ></Column>
                         <Column field="description_result_efac" header="N° Ticket" body={verTicketTemplate}  ></Column>
                         <Column field="fechaRegistro" header="Fecha Registro" sortable ></Column>
                         <Column field="code_result_efac" header="Código" body={stockBodyTemplate}  ></Column>
                         <Column field="usuarioRegistro" header="Usuario" ></Column>
                        </DataTable>
                        </TabPanel>
                        <TabPanel header="Desarrollo">
                                        <p>404.</p>
                    </TabPanel>
                </TabView>
            </div>
        </div>
        </div>
    );
}

