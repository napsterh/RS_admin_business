import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class ListaBusiness extends Component {
    render() {
        return (
            <div>
                <Button variant="contained" color="primary">Seleccionar negocio</Button>
                <Button variant="contained" color="secondary">Color secundario</Button>
            </div>
        )
    }
}

export default ListaBusiness;