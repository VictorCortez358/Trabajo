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
import axios from "axios";

const initialData = [
    { id: 1, nombre: "Item 1", estado: 1 },
    { id: 2, nombre: "Item 2", estado: 0 },
    { id: 3, nombre: "Item 3", estado: 1 },
];

function CustomTable() {
    const [data, setData] = useState(initialData);
    const [open, setOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editName, setEditName] = useState("");

    const handleSwitchChange = async (index) => {
        const item = data[index];
        const newState = item.estado === 1 ? 0 : 1;

        try {
            // Llamada a la API para actualizar el estado
            await axios.patch(`/api/items/${item.id}/status`, { estado: newState });

            // Actualiza el estado localmente solo si la API fue exitosa
            const updatedData = [...data];
            updatedData[index].estado = newState;
            setData(updatedData);
        } catch (error) {
            console.error("Error actualizando el estado:", error);
        }
    };

    const handleOpenDialog = (index) => {
        setEditIndex(index);
        setEditName(data[index].nombre);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        const item = data[editIndex];

        try {
            // Llamada a la API para actualizar el nombre
            await axios.patch(`/api/items/${item.id}/name`, { nombre: editName });

            // Actualiza el nombre en el estado local solo si la API fue exitosa
            const updatedData = [...data];
            updatedData[editIndex].nombre = editName;
            setData(updatedData);
            handleCloseDialog();
        } catch (error) {
            console.error("Error actualizando el nombre del item:", error);
        }
    };

    const columns = [
        {
            name: "nombre",
            label: "Nombre Item",
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
                                checked={value === 1}
                                onChange={() => handleSwitchChange(index)}
                                color="primary"
                            />
                            {value === 1 ? "Habilitado" : "Deshabilitado"}
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
