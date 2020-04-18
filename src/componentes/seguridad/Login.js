import React, { Component } from 'react';
import { Container, Typography, TextField, Button } from '@material-ui/core';
import { compose } from 'recompose';
import { consumerFirebase } from '../../server';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const style = {
    paper: {
        marginTop: 9,
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
       height: 220,
       width:  220
    }
}


class Login extends Component {
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

    login = e => {
        e.preventDefault();

        const { firebase, usuario } = this.state;

        firebase.auth
        .signInWithEmailAndPassword(usuario.email, usuario.password)
        .then(auth => {
            this.props.history.push('/')
        })
        .catch(error =>{
            console.log("Ocurrió un error",error);
        })
    }


    render() {
        return (
            <Container maxWidth="xs">
                <div style={style.paper}>
                    <Card style={style.root}>
                        <CardActionArea>
                            <CardMedia style={style.media}
                                image="https://cdn.icon-icons.com/icons2/1715/PNG/512/2730360-hand-help-inkcontober-united_112704.png"
                            />
                        </CardActionArea>
                    </Card>
                    <Typography Component="h1" variant="h5">
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
                        <Button style={style.button}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.login}
                        >
                            Enviar
                        </Button>
                    </form>
                </div>
            </Container>
        )
    }
}

export default compose(consumerFirebase)(Login);