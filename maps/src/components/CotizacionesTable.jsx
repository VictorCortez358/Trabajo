import React from "react";
import MUIDataTable from "mui-datatables";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



const columns = [
    { name: "Name", label: "Name" },
    { name: "Company", label: "Company" },
    { name: "City", label: "City" },
    {
        name: "items",
        label: "Items",
        options: {
            customBodyRender: (value) => {
                if (value && Array.isArray(value)) {
                    return value.map((item) => item.nombre || item.nombre2).join(", ");
                }
                return "No items";
            },
        },
    },
];

const data = [
    { Name: "Joe James", Company: "Test Corp", City: "Yonkers", items: [{ id: 1, nombre: "Item 1" }] },
    { Name: "John Walsh", Company: "Another Corp", City: "Hartford", items: [{ id: 2, nombre: "Item 2" }] },
];

const userInfo = {
    name: "Nombre de su negocio",
    nit: "900.000.000-1",
    address: "Cra 345 # 34-45 La Esmeralda",
    phone: "3102020202",
    email: "prueba@gmail.com"
};

const providerInfo = {
    name: "Nombre del proveedor",
    nit: "900.000.000-1",
    address: "Cra 345 # 34-45 La Esmeralda",
    phone: "3102020202"
};

const options = {
    selectableRows: "multiple",
};

function CustomTableCotizaciones() {
    const navigate = useNavigate();
    const datosGenerados = { /* datos */ };

    const handleGenerarCotizacion = () => {
        navigate('/otra-pagina', { data: datosGenerados });
    };

    const location = useLocation();
    const datosRecibidos = location.state;

    return <div>{JSON.stringify(datosRecibidos)}</div>;

    return (
        <div>
            <MUIDataTable
                title={"Employee List"}
                data={data}
                columns={columns}
                options={options}
            />
            <button onClick={generatePDF} style={{ marginTop: "10px" }}>
                Generar PDF
            </button>
        </div>
    );
}

export default CustomTableCotizaciones;
