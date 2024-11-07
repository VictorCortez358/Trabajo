import React from "react";
import MUIDataTable from "mui-datatables";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
    const generatePDF = () => {
        const doc = new jsPDF();

        // Header styling
        doc.autoTable({
            startY: 15,
            head: [["Cotización de proveedor"]],
            theme: 'grid',
            headStyles: { fillColor: [79, 129, 189], textColor: [255, 255, 255] },
            styles: { cellPadding: 3 },
        });

        // User info styling
        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 10, // Posiciona la siguiente tabla 10 unidades abajo de la anterior
            head: [["Información de su negocio"]],
            body: [
                ["Nombre", userInfo.name],
                ["NIT", userInfo.nit],
                ["Dirección", userInfo.address],
                ["Teléfono", userInfo.  phone],
                ["Correo", userInfo.email],
            ],
            theme: 'grid',
            headStyles: { fillColor: [79, 129, 189], textColor: [255, 255, 255] },
            styles: { cellPadding: 3 },
        });



        // Table content styling
        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 10, // Posiciona la siguiente tabla 10 unidades abajo de la anterior
            head: [['Name', 'Company', 'City', 'Items']],
            body: data.map((row) => [
                row.Name,
                row.Company,
                row.City,
                row.items.map(item => item.nombre || item.nombre2).join(", ")
            ]),
            theme: 'grid',
            headStyles: { fillColor: [79, 129, 189], textColor: [255, 255, 255] },
            styles: { cellPadding: 3 },
        });

        doc.save("Cotizacion_Proveedor.pdf");
    };

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
