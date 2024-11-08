import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const initialData = [
    { id: 1, nombre: "Item 1", nombre2: "Item 1", estado: 1 },
    { id: 2, nombre: null, nombre2: "Item prueba", estado: 1 },
    { id: 3, nombre: null, nombre2: "Item prueba", estado: 0 },
    { id: 4, nombre: "Item 4", nombre2: "Item 4", estado: 1 },
    { id: 5, nombre: "Item 5", nombre2: "Item 5", estado: 0 },
    { id: 6, nombre: "Item 6", nombre2: "Item 6", estado: 1 },
    { id: 7, nombre: "Item 7", nombre2: "Item 7", estado: 0 },
    { id: 8, nombre: "Item 8", nombre2: "Item 8", estado: 1 },
    { id: 9, nombre: "Item 9", nombre2: "Item 9", estado: 0 },
    { id: 10, nombre: "Item 10", nombre2: "Item 10", estado: 1 },
];

function CustomTable() {
    const [data, setData] = useState(initialData);
    const [open, setOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editName, setEditName] = useState("");

    const handleSwitchChange = (index) => {
        setData(prevData => 
            prevData.map((item, i) => 
                i === index ? { ...item, estado: item.estado === 1 ? 0 : 1 } : item
            )
        );
    };

    const handleOpenDialog = (index) => {
        setEditIndex(index);
        setEditName(data[index].nombre);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setData(prevData =>
            prevData.map((item, i) =>
                i === editIndex ? { ...item, nombre: editName } : item
            )
        );
        handleCloseDialog();
    };

    const columns = [
        {
            name: "nombre",
            label: "Nombre Item",
            options: {
                customBodyRender: (value, tableMeta) => {
                    const rowIndex = tableMeta.rowIndex;
                    const item = data[rowIndex];
                    return item.nombre !== null ? item.nombre : item.nombre2;
                },
            },
        },
        {
            name: "estado",
            label: "Estado",
            options: {
                customBodyRender: (value, tableMeta) => {
                    const index = tableMeta.rowIndex;
                    return (
                        <>
                            <Switch
                                checked={data[index].estado === 1}
                                onChange={() => handleSwitchChange(index)}
                                color="primary"
                            />
                            {data[index].estado === 1 ? "Habilitado" : "Deshabilitado"}
                        </>
                    );
                },
            },
        },
        {
            name: "acciones",
            label: "Acciones",
            options: {
                customBodyRender: (value, tableMeta) => {
                    const index = tableMeta.rowIndex;
                    return (
                        <IconButton onClick={() => handleOpenDialog(index)} color="primary">
                            <EditIcon />
                        </IconButton>
                    );
                },
            },
        },
    ];

    const options = {
        selectableRows: "none",
        textLabels: {
            body: {
                noMatch: "No se encontraron registros",
                toolTip: "Ordenar",
            },
            pagination: {
                next: "Siguiente",
                previous: "Anterior",
                rowsPerPage: "Filas por página:",
                displayRows: "de",
            },
            toolbar: {
                search: "Buscar",
                downloadCsv: "Descargar CSV",
                print: "Imprimir",
                viewColumns: "Ver Columnas",
                filterTable: "Filtrar Tabla",
            },
            filter: {
                all: "Todo",
                title: "FILTROS",
                reset: "REINICIAR",
            },
            viewColumns: {
                title: "Mostrar Columnas",
                titleAria: "Mostrar/Ocultar Columnas",
            },
            selectedRows: {
                text: "fila(s) seleccionada(s)",
                delete: "Eliminar",
                deleteAria: "Eliminar filas seleccionadas",
            },
        },
    };

    return (
        <div>
            <MUIDataTable
                title={"Lista de Items"}
                data={data}
                columns={columns}
                options={options}
            />
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Editar Nombre del Item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre del Item"
                        type="text"
                        fullWidth
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CustomTable;
