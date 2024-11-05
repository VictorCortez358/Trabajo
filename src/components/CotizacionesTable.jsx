import React from "react";
import MUIDataTable from "mui-datatables";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const columns = ["Name", "Company", "City", "State"];
const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
        <IconButton
            onClick={() => {
                // Acción personalizada al hacer clic en el icono
                const selectedData = selectedRows.data.map((row) => displayData[row.index].data);
                console.log("Filas seleccionadas:", selectedData);
                // Aquí puedes implementar cualquier acción personalizada
            }}
        >
            <FavoriteIcon />
        </IconButton>
    ),
    selectableRows: "multiple",
};

function CustomTableCotizaciones() {
    return (
        <MUIDataTable
            title={"Employee List"}
            data={data}
            columns={columns}
            options={options}
        />
    );
}

export default CustomTableCotizaciones;
