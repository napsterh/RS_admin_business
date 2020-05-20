import React, { Component } from 'react';
import * as firebaseui from 'firebaseui';
import { Container, Typography, Grid, TextField, Button, Card, CardActionArea, CardMedia } from '@material-ui/core';

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
                        Ingrese número telefónico
                    </Typography>
                    <form style={style.form}>
                        <Grid conatiner style={style.captcha} justify="center">
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
                        >
                            Enviar
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default LoginTelefono;