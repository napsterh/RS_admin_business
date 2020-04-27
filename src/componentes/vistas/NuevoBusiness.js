import React, { Component } from 'react';
import { Container, Paper, Grid, Breadcrumbs } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const style = {
    container : {
        paddingTop : '8px'
    },
    paper : {
        marginTop : 8,
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        padding : '20px',
        backgroundColor : '#f5f5f5'
    },
    link : {
        display : 'flex'
    },
    homeIcon : {
        with : 20,
        height : 20,
        marginRigth : '4px'
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
                                    <HomeIcon style={style.homeIcon}/>
                                        Home
                                </Link>
                            </Breadcrumbs>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        )
    }
}
