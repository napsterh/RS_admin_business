import React, { Component } from 'react';
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

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
    submit : {
        marginTop : 15,
        marginButtom : 10
    }
}


export default class NuevoBusiness extends Component {



    render() {
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

                        <Grid item xs={12} md={12}>
                            <TextField
                                name="direccion"
                                label="Dirección del Negocio"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="distrito"
                                label="Distrito"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="ciudad"
                                label="Ciudad"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="nombreP"
                                label="Nombre del propietario"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="correo"
                                label="Correo electrónico"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name="celular"
                                label="Teléfono o celular"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                name="descripcion"
                                label="Descripción del negocio"
                                fullWidth
                                multiline
                            />
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="checkedA"
                                        color="secondary"
                                    />
                                }
                                label="Acepto delivery"
                            />
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="checkedB"
                                        color="secondary"
                                    />
                                }
                                label="Acepto recojo en tienda"
                            />
                        </Grid>

                    </Grid>

                    <Grid container justify="center">
                        <Grid sx={12} md={6}>
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
        )
    }
}
