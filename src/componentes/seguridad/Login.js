import React, { Component } from 'react';
import { Container, Avatar,Typography, TextField, Button } from '@material-ui/core';
import LockOutlineIcon from '@material-ui/icons/LockOutlined';
import { compose } from 'recompose';
import { consumerFirebase } from '../../server';

const style = {
    paper: {
        marginTop: 9,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: 5,
        backgroundColor: "red",
        width: "max",
        height: "max"
    },
    form: {
        width: "100%",
        marginTop: 5,
        marginBottom: 5
    },
    button: {
        marginTop: 20
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

    onChange = e =>{
        let usuario = Object.assign({},this.state.usuario);
        usuario[e.target.name] = e.target.value;
        this.setState({
            usuario : usuario
        })
    }


    render() {
        return (
            <Container maxWidth="xs">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOutlineIcon />
                    </Avatar>
                    <Typography Component="h1" variant="h5">
                        Iniciar Sesión
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