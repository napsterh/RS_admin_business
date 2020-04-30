import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { consumerFirebase } from '../../server';

const style = {
    cardGrid: {
        paddingTop: 8,
        paddingBottom: 8
    },
    paper: {
        backgroundColor: "#f5f5f5",
        padding: "20px",
        height: 650
    },
    link: {
        display: "flex"
    },
    gridTextfield: {
        marginTop: "20px"
    }
}


class ListaBusiness extends Component {
    render() {
        return (
                <Container style={style.cardGrid}>
                    <Paper style={style.paper}>
                        <Grid item xs={12} sm={12}>
                            <Breadcrumbs aria-label="breadcrumbs">
                                <Link color="inherit" style={style.link} href="/">
                                    <HomeIcon/>
                                    Home
                                </Link>
                                <Typography color="textPrimary">Mis Negocios</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item xs={12} sm={6} style={style.gridTextfield}>
                            <TextField
                                fullWidth
                                InputLabelProps = {{
                                    shrink : true
                                }}
                                name="textoBusqueda"
                                variant="outlined"
                                label="Ingrese el negocio a buscar"
                            />
                        </Grid>
                    </Paper>
                </Container>
        );
    }
}

export default consumerFirebase(ListaBusiness);