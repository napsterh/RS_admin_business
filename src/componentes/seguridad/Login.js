import React, { Component } from 'react';
import { Container, Typography, TextField, Button, Grid, Link } from '@material-ui/core';
import { compose } from 'recompose';
import { consumerFirebase } from '../../server';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { iniciarSesion } from '../../session/actions/sesionAction';
import { openMensajePantalla } from '../../session/actions/snackbarAction';

import { StateContext } from '../../session/store';

const style = {
    paper: {
        marginTop: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100%",
        marginTop: 5,
        marginBottom: 5
    },
    button: {
        marginTop: 20
    },
    root: {
        maxWidth: 345,
        margin: 20
      },
    media: {
       height: 164,
       width:  345
    },
    submit: {
        marginTop: 10,
        marginBottom: 20
    }
}


class Login extends Component {
    static contextType = StateContext;

    state = {
        firebase : null,
        usuario : {
            email : '',
            password : ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.firebase === prevState.firebase){
            return null;
        }

        return {
            firebase : nextProps.firebase
        }

    }

    onChange = e =>{
        let usuario = Object.assign({},this.state.usuario);
        usuario[e.target.name] = e.target.value;
        this.setState({
            usuario : usuario
        })
    }

    login = async e => {
        e.preventDefault();
        const [{sesion}, dispatch] = this.context;
        const { firebase, usuario } = this.state;
        const {email, password} = usuario;

        let callback = await iniciarSesion(dispatch, firebase, email, password)
        if(callback.status){
            openMensajePantalla(dispatch, {
                open : true,
                mensaje : "Inició sesión correctamente"
            });
            this.props.history.push("/");
        }else{
            openMensajePantalla(dispatch, {
                open : true,
                mensaje : "Usuario y/o contraseña incorrecta"
            });
        }
    }


    resetearPassword = () => {
        const {firebase, usuario} = this.state;
        const [{sesion}, dispatch] = this.context;

        firebase.auth.sendPasswordResetEmail(usuario.email)
            .then(success => {
                openMensajePantalla(dispatch, {
                    open: true,
                    mensaje: "Se ha enviado un correo electrónico a tu cuenta"
                })
            })
            .catch(error => {
                openMensajePantalla(dispatch, {
                    open: true,
                    mensaje: error.message
                })
            })
    }


    render() {
        return (
            <Container maxWidth="xs">
                <div style={style.paper}>
                    <Card style={style.root}>
                        <CardActionArea>
                            <CardMedia style={style.media}
                                image="https://cdn.discordapp.com/attachments/701064473955401759/701219593254993960/La-ruta-solidaria-logo-transparente.png"
                            />
                        </CardActionArea>
                    </Card>
                    <Typography component="h1" variant="h5">
                        Iniciar sesión
                    </Typography>
                    <form style={style.form}>
                        <TextField
                            variant="outlined"
                            label="Ingrese correo electrónico"
                            name="email"
                            fullWidth
                            margin="normal"
                            onChange = {this.onChange}
                            value = {this.state.usuario.email}
                        />
                        <TextField
                            variant="outlined"
                            label="Ingrese contraseña"
                            type="password"
                            name="password"
                            fullWidth
                            margin="normal"
                            onChange = {this.onChange}
                            value = {this.state.usuario.password}
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={this.login}
                        style={style.submit}
                        >
                            Enviar
                        </Button>

                        <Grid container>
                            <Link href="#" variant="body2" onClick={this.resetearPassword}>
                                {"Olvidó su contraseña?"}
                            </Link>
                        </Grid>
                        <Grid>
                            <Link href="/auth/registrarUser" variant="body2">
                                {"No tienes una cuenta? Regístrate"}
                            </Link>
                        </Grid>
                    </form>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        style={style.submit}
                        href="#"
                    >
                        Ingrese con su teléfono
                    </Button>
                </div>
            </Container>
        )
    }
}

export default compose(consumerFirebase)(Login);