import React, { Component } from 'react';
import { consumerFirebase } from '../../server';
import { Container, Paper, Grid, Breadcrumbs, Link, Typography } from '@material-ui/core';
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
                    </Grid>
                </Paper>
            </Container>
        );
    }
}

export default consumerFirebase(EditarNegocio);