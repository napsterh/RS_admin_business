import React, { Component } from 'react';
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField, Button, Checkbox, FormControlLabel, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { consumerFirebase } from '../../server';
import { openMensajePantalla } from '../../session/actions/snackbarAction';
import ReactImageUploadComponent from 'react-images-upload';
import uuid from 'uuid';


const style = {
    container: {
        paddingTop: '30px'
    },
    paper: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5'
    },
    link: {
        display: 'flex'
    },
    homeIcon: {
        with: 20,
        height: 20,
        marginRight: '4px'
    },
    submit: {
        marginTop: 15,
        marginButtom: 10
    },
    foto: {
        height: "100px"
    }
}


class NuevoBusiness extends Component {

    state = {
        negocio: {
            direccion: '',
            nombreNegocio: '',
            distrito: '',
            ciudad: '',
            nombreP: '',
            correo: '',
            celular: '',
            descripcion: '',
            fotos: []
        },
        archivos: []
    };

    entradaDatoEstado = e => {
        let negocio_ = Object.assign({}, this.state.negocio);
        negocio_[e.target.name] = e.target.value
        this.setState({
            negocio: negocio_
        });
    };

    subirFotos = documentos => {
        Object.keys(documentos).forEach(function(key){
            documentos[key].urlTemp = URL.createObjectURL(documentos[key]);
        })

        this.setState({
            archivos : this.state.archivos.concat(documentos)
        })

    }

    guardarNegocio = () => {
        const {negocio} = this.state;

        this.props.firebase.db
            .collection("Business")
            .add(negocio)
            .then(success=>{
                this.props.history.push("/");
            })
            .catch(error=>{
                openMensajePantalla({
                    open: true,
                    mensaje: 'Ocurrió un error'
                });
            });
    };


    eliminarFoto = nombreFoto => () =>{
        this.setState({
            archivos: this.state.archivos.filter(archivo => {
                return archivo.name !== nombreFoto
            })
        })
    }


    render() {
        let imagenKey = uuid.v4();



        return (
            <Container style={style.container}>
                <Paper style={style.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" style={style.link} href="/">
                                    <HomeIcon style={style.homeIcon} />
                                        Inicio
                                </Link>
                                <Typography color="textSecondary">Nuevo Negocio</Typography>
                            </Breadcrumbs>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="direccion"
                                label="Dirección del Negocio"
                                fullWidth
                                onChange={this.entradaDatoEstado}
                                value={this.state.negocio.direccion}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="nombreNegocio"
                                label="Nombre del Negocio"
                                fullWidth
                                onChange={this.entradaDatoEstado}
                                value={this.state.negocio.nombreNegocio}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="distrito"
                                label="Distrito"
                                fullWidth
                                onChange={this.entradaDatoEstado}
                                value={this.state.negocio.distrito}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="ciudad"
                                label="Ciudad"
                                fullWidth
                                onChange={this.entradaDatoEstado}
                                value={this.state.negocio.ciudad}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="nombreP"
                                label="Nombre del propietario"
                                fullWidth
                                onChange={this.entradaDatoEstado}
                                value={this.state.negocio.nombreP}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="correo"
                                label="Correo electrónico"
                                fullWidth
                                onChange={this.entradaDatoEstado}
                                value={this.state.negocio.correo}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="celular"
                                label="Teléfono o celular"
                                fullWidth
                                onChange={this.entradaDatoEstado}
                                value={this.state.negocio.celular}
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                name="descripcion"
                                label="Descripción del negocio"
                                fullWidth
                                multiline
                                onChange={this.entradaDatoEstado}
                                value={this.state.negocio.descripcion}
                            />
                        </Grid>

                    </Grid>

                    <Grid container justify="center">
                        <Grid item xs={12} sm={6}>
                            <ReactImageUploadComponent
                                key = {imagenKey}
                                withIcon = {true}
                                buttontext = "Seleccione imagenes"
                                onChange = {this.subirFotos}
                                imgExtension = {[".jpg",".gif",".png",".jpeg"]}
                                maxFileSize = {5242880}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Table>
                                <TableBody>
                                    {
                                        this.state.archivos.map((archivo, i) => (
                                            <TableRow key={i}>
                                                <TableCell align="left">
                                                    <img src={archivo.urlTemp} style={style.foto} />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        onClick={this.eliminarFoto(archivo.name)}
                                                        >
                                                        Eliminar
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </Grid>

                    </Grid>

                    <Grid container justify="center">
                        <Grid item xs={12} md={6}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                size="large"
                                color="secondary"
                                style={style.submit}
                                onClick={this.guardarNegocio}
                            >
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>

                </Paper>
            </Container>
        );
    }
}

export default consumerFirebase(NuevoBusiness);
