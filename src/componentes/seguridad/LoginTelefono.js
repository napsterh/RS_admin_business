import React, { Component } from 'react';
import * as firebaseui from 'firebaseui';
import  { consumerFirebase } from '../../server';
import { Container, Typography, Grid, TextField, Button, Card, CardActionArea, CardMedia, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

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
    },
    captcha : {
        flexGrow : 1,
        marginBottom : 10
    }
}


class LoginTelefono extends Component {

    state= {
        disable : true,
        dialogAbierto : false
    }


    componentDidMount(){
        const {firebase} = this.props;

        firebase.auth.languageCode = "es";
        window.recaptchaVerifier = new firebase.authorization.RecaptchaVerifier(
            this.recaptcha,
            {
                size : "normal",
                callback : response => {
                    this.setState({
                        disable : false
                    })
                },
                "expired-callback" : function(){
                    this.setState({
                        disable: true
                    })
                }
            }
        );

        window.recaptchaVerifier.render().then(function(widgetID){
            window.recaptchaVerifierId = widgetID;
        });

    }

    verificarNumero = e => {
        e.preventDefault();
        this.setState({
            dialogAbierto : true
        })
    }

    render() {
        return (
            <Container maxWidth="xs">
                <Dialog open={this.state.dialogAbierto} onClose={() => { this.setState({dialogAbierto: false}) }}>
                    <DialogTitle>Ingrese su código</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Ingrese el código que recibio por mensaje de texto
                        </DialogContentText>
                        <TextField autoFocus margin="dense" name="codigo" fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={() => { this.setState({dialogAbierto: false}) }}>Cancelar</Button>
                        <Button color="secondary">Verificar</Button>
                    </DialogActions>

                </Dialog>

                <div style={style.paper}>
                    <Card style={style.root}>
                        <CardActionArea>
                            <CardMedia style={style.media}
                                image="https://cdn.discordapp.com/attachments/701064473955401759/701219593254993960/La-ruta-solidaria-logo-transparente.png"
                            />
                        </CardActionArea>
                    </Card>
                    <Typography component="h1" variant="h5">
                        Ingrese número telefónico
                    </Typography>
                    <form style={style.form}>
                        <Grid container style={style.captcha} justify="center">
                            <div ref={ref => (this.recaptcha = ref)}></div>
                        </Grid>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="telefono"
                            label="Ingrese número telefónico"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            style={style.submit}
                            onClick={this.verificarNumero}
                            disabled = {this.state.disable}
                        >
                            Enviar
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default consumerFirebase(LoginTelefono);