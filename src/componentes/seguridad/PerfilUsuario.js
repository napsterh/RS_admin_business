import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../session/store';
import { Container, Typography, Grid, TextField, Button, Avatar } from '@material-ui/core';
import reactFoto from '../../logo.svg';
import  { consumerFirebase } from '../../server';
import { openMensajePantalla } from '../../session/actions/snackbarAction';
import ImageUploader from 'react-images-upload';
import uuid from 'uuid';

const style = {
    paper: {
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100",
        margintop: 20
    },
    submit: {
        marginTop: 15,
        marginBottom: 20
    },
    tipography: {
        marginBottom : 15
    }
}

const PerfilUsuario = props => {
    const [{ sesion }, dispatch] = useStateValue();
    const firebase = props.firebase;
    let [estado, cambiarEstado] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        id: "",
        foto: ""
    })

    const cambiarDato = e => {
        const {name, value} = e.target;
        cambiarEstado(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const guardarCambios = e => {
        e.preventDefault();

        firebase.db
        .collection("Users")
        .doc(firebase.auth.currentUser.uid)
        .set(estado, {merge: true})
        .then(success => {

            dispatch({
                type : "INICIAR_SESION",
                sesion : estado,
                autenticado : true
            })

            openMensajePantalla(dispatch, {
                open : true,
                mensaje : "Se guardaron los cambios"
            })

        })
        .catch(error => {
            openMensajePantalla(dispatch, {
                open : true,
                mensaje : "Error al guardar en base de datos" + error
            })
        })
    }

    const validarestadoformulario = sesion => {
        if(sesion){
            cambiarEstado(sesion.usuario);
        }
    }

    useEffect(()=>{

        if(estado.id === ""){
            validarestadoformulario(sesion);
        }
    })

    const subirFoto = fotos => {
        //1: capturar imagen
        const foto = fotos[0];
        //2: Renombrar la imagen
        const claveUnicaFoto = uuid.v4();
        //3: Obtener nombre foto
        const nombreFoto = foto.name;
        //4: Obtener extension imagen
        const extensionFoto = nombreFoto.split('.').pop();
        //5: Crear nuevo nombre de la foto - alias
        const alias = (nombreFoto.split('.')[0] + "_" + claveUnicaFoto + "." + extensionFoto).replace(/\s/g,"_").toLowerCase();
        // homer.jpg --> homer_1867453186456153.jpg


        firebase.guardarDocumento(alias, foto).then(metadata => {
            firebase.devolverDocumento(alias).then(urlFoto => {
                estado.foto = urlFoto;

                firebase.db
                .collection("Users")
                .doc(firebase.auth.currentUser.uid)
                .set(
                    {
                    foto : urlFoto
                    },
                    {merge: true}
                )
                .then(userBD => {
                    dispatch({
                        type: "INICIAR_SESION",
                        sesion: estado,
                        autenticado: true
                    })
                })
            })
        })
    }

    let fotoKey = uuid.v4();

    return (sesion
        ? (
            <Container component="main" maxwith="md" justify="center">
                <div style={style.paper}>
                    <Avatar style={style.avatar} src={estado.foto || reactFoto} />
                    <Typography style={style.tipography} component="h1" variant="h5">
                        Perfil de Cuenta
                    </Typography>
                    <form style={style.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="nombre"
                                    variant="outlined"
                                    fullWidth
                                    label="Ingrese sus nombres"
                                    value={estado.nombre}
                                    onChange={cambiarDato}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="apellido"
                                    variant="outlined"
                                    fullWidth
                                    label="Ingrese sus Apellidos"
                                    value={estado.apellido}
                                    onChange={cambiarDato}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="email"
                                    variant="outlined"
                                    fullWidth
                                    label="Ingrese su E-Mail"
                                    value={estado.email}
                                    onChange={cambiarDato}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="telefono"
                                    variant="outlined"
                                    fullWidth
                                    label="Ingrese su teléfono"
                                    value={estado.telefono}
                                    onChange={cambiarDato}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <ImageUploader
                                withIcon={true}
                                withLabel={false}
                                key={fotoKey}
                                singleImage={true}
                                buttonText="Seleccione una foto de perfil"
                                onChange={subirFoto}
                                imgExtension={[".jpg",".gif","png",".jpeg"]}
                                maxFileSize={5242880}
                                />
                            </Grid>

                        </Grid>
                        <Grid container justify="center">
                            <Grid item xs={12} md={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    style={style.submit}
                                    onClick={guardarCambios}
                                >
                                Actualizar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
        : null
    );
}

export default consumerFirebase(PerfilUsuario);