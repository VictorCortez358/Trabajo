import React, { useState } from 'react';

const Solicitudes = ({ solicitudes }) => {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    // Función para filtrar las solicitudes por fechas
    const filtrarSolicitudes = () => {
        if (!fechaInicio || !fechaFin) return solicitudes;

        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);

        return solicitudes.filter(solicitud => {
            const fechaSolicitud = new Date(solicitud.fecha);
            return fechaSolicitud >= inicio && fechaSolicitud <= fin;
        });
    };

    const solicitudesFiltradas = filtrarSolicitudes();

    return (
        <div>
            <div>
                <label>Fecha de inicio:</label>
                <input
                    type="date"
                    value={fechaInicio}
                    onChange={e => setFechaInicio(e.target.value)}
                />
            </div>
            <div>
                <label>Fecha final:</label>
                <input
                    type="date"
                    value={fechaFin}
                    onChange={e => setFechaFin(e.target.value)}
                />
            </div>

            <h2>Solicitudes Filtradas</h2>
            <ul>
                {solicitudesFiltradas.map(solicitud => (
                    <li key={solicitud.id}>
                        {`Solicitud ID: ${solicitud.id}, Fecha: ${solicitud.fecha}`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Solicitudes;
