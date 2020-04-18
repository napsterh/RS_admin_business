import React, { Component } from 'react'
import { Container, Typography, Grid, TextField, Button } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { compose } from 'recompose';
import { consumerFirebase } from '../../server';
import { crearUsuario } from '../../session/actions/sesionAction';
import { openMensajePantalla } from '../../session/actions/snackbarAction';
import { StateContext } from '../../session/store';

const style = {
    paper : {
        marginTop : 8,
        display : "flex",
        flexDirection : "column",
        alignItems : "center"
    },
    form : {
        width : "100%",
        marginTop : 10
    },
    submit : {
        marginTop : 20,
        marginBottom: 20
    },
    root: {
        maxWidth: 345,
        margin: 20
      },
    media: {
       height: 220,
       width:  220
    }
}


class RegistrarUser extends Component {
    static contextType = StateContext;

    state = {
        firebase : null,
        usuario : {
            nombre : '',
            apellido : '',
            email : '',
            password : ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){

        if(nextProps.firebase  === prevState.firebase){
            return null;
        }

        return {
            firebase : nextProps.firebase
        }

    }

    onChange = e => {
        let usuario = Object.assign({}, this.state.usuario);
        usuario[e.target.name] = e.target.value;
        this.setState({
            usuario : usuario
        })
    }

    registrarUsuario = async e => {
        e.preventDefault();
        const [{sesion}, dispatch] = this.context;
        const {firebase, usuario} = this.state;

        let callback = await crearUsuario(dispatch, firebase, usuario);
        if(callback.status){
            this.props.history.push("/")
        }else{
            openMensajePantalla(dispatch, {
                open : true,
                mensaje : callback.mensaje.message
            })
        }
    }

    render() {
        return (
            <Container maxWidth="md">
                <div style={style.paper}>
                    <Card style={style.root}>
                        <CardActionArea>
                            <CardMedia style={style.media}
                                image="https://cdn.icon-icons.com/icons2/1715/PNG/512/2730360-hand-help-inkcontober-united_112704.png"
                            />
                        </CardActionArea>
                    </Card>
                    <Typography component="h1" variant="h5">
                        Registrar cuenta
                    </Typography>
                    <form style={style.form}>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <TextField name="nombre" onChange={this.onChange} value={this.state.usuario.nombre} fullWidth label="Ingrese su nombre" />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="apellido" onChange={this.onChange} value={this.state.usuario.apellido} fullWidth label="Ingrese sus apellidos" />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="email" onChange={this.onChange} value={this.state.usuario.email} fullWidth label="Ingrese su correo electrónico" />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField type="password" onChange={this.onChange} name="password" value={this.state.usuario.password} fullWidth label="Ingrese su contraseña" />
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item md={6} xs={6}>
                                <Button type="submit" onClick={this.registrarUsuario} variant="contained" fullWidth size="large" color="primary" style={style.submit}>
                                    Registrar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

export default compose(consumerFirebase)(RegistrarUser);