import React, { Component } from 'react';
import { consumerFirebase } from '../../server';
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField, Button } from '@material-ui/core';
import HomeIcon from "@material-ui/icons/Home";

const style = {
    container : {
        paddingTop: "8px"
    },
    paper : {
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        background: "#f5f5f5"
    },
    link :{
        padding: "20px",
        background: "#f5f5f5"
    },
    homeIcon: {
        width: 20,
        height:20,
        marginRight: "4px"
    },
    submit: {
        marginTop: 15,
        marginButtom: 10
    }
}


class EditarNegocio extends Component {
    render() {
        return (
            <Container style={style.container}>
                <Paper style={style.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Breadcrumbs aria-label="breadcrumbs">
                                <Link color="inherit" style={style.link} href="/" >
                                    <HomeIcon style={style.homeIcon}/>
                                    Home
                                </Link>
                                <Typography color="textSecondary">
                                    Editar Negocio
                                </Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="direccion"
                                label="Dirección del negocio"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="distrito"
                                label="Distrito"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="ciudad"
                                label="Ciudad"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="telefono"
                                label="Teléfono"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="nombreP"
                                label="Nombre del propietario"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="descripcion"
                                label="Descripción de negocio"
                                fullWidth
                                rowsMax="4"
                            />
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

export default consumerFirebase(EditarNegocio);