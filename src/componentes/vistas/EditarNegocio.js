import React, { Component } from 'react';
import { consumerFirebase } from '../../server';
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField, Button, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import HomeIcon from "@material-ui/icons/Home";
import ReactImageUploadComponent from 'react-images-upload';
import uuid from 'uuid';
import { crearKeyword } from '../../session/actions/Keyword';

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
    },
    submit: {
        marginTop: 15,
        marginButtom: 10
    },
    fotoNegocio: {
        height: "100px"
    }
}


class EditarNegocio extends Component {
    state = {
        negocio: {
            direccion: "",
            distrito: "",
            ciudad: "",
            telefono: "",
            nombreP: "",
            descripcion: "",
            fotos: []
        }
    }

    cambiarDato = e => {
        let negocio = Object.assign({}, this.state.negocio);
        negocio[e.target.name] = e.target.value;
        this.setState({negocio});
    }

    subirImagenes = imagenes => {
        const { negocio } = this.state;
        const {id} = this.props.match.params;
        //Agregar un nombre dinamico por cada imagen que necesitemos subir a firestore

        Object.keys(imagenes).forEach(key => {
           let codigoDinamico = uuid.v4();
           let nombreImagen = imagenes[key].name;
           let extension = nombreImagen.split(".").pop();
           imagenes[key].alias = (nombreImagen.split(".")[0] + "_" + codigoDinamico + "." +extension).replace(/\s/g, "_").toLowerCase();
        })

        this.props.firebase.guardarDocumentos(imagenes).then(urlImagenes => {
            negocio.fotos = negocio.fotos.concat(urlImagenes);

            this.props.firebase.db
                .collection("Business")
                .doc(id)
                .set(negocio, {merge: true})
                .then(success =>{
                    this.setState({
                        negocio
                    })
                })
        })

    }

    eliminarFoto = fotoUrl => async () => {

        const { negocio } = this.state;
        const { id } = this.props.match.params;

        let fotoID = fotoUrl.match(/[\w-]+.(jpg|png|jepg|gif|svg)/);
        fotoID = fotoID[0];
        await this.props.firebase.eliminarDocumento(fotoID);

        let fotoList = this.state.negocio.fotos.filter(foto => {
            return foto !== fotoUrl;
        })

        negocio.fotos = fotoList;

        this.props.firebase.db
        .collection("Business")
        .doc(id)
        .set(negocio, {merge: true})
        .then(success => {
            this.setState({
                negocio
            })
        })
    }

    async componentDidMount(){
        const {id} = this.props.match.params;

        const negocioCollection = this.props.firebase.db.collection("Business");
        const negocioDB = await negocioCollection.doc(id).get();

        this.setState({
            negocio : negocioDB.data()
        })
    }

    guardarNegocio = () => {
        const { negocio } = this.state;
        const {id} = this.props.match.params;

        const textoBusqueda = negocio.direccion + " " + negocio.distrito + " " + negocio.ciudad;
        const keywords = crearKeyword(textoBusqueda);

        negocio.keywords = keywords;

        this.props.firebase.db
            .collection("Business")
            .doc(id)
            .set(negocio, {merge: true})
            .then(success =>{
                this.props.history.push("/");
            })

    }

    render() {
        let uniqueID = uuid.v4();
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
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="direccion"
                                label="Dirección del negocio"
                                fullWidth
                                onChange={this.cambiarDato}
                                value={this.state.negocio.direccion}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="distrito"
                                label="Distrito"
                                fullWidth
                                onChange={this.cambiarDato}
                                value={this.state.negocio.distrito}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="ciudad"
                                label="Ciudad"
                                fullWidth
                                onChange={this.cambiarDato}
                                value={this.state.negocio.ciudad}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="telefono"
                                label="Teléfono"
                                fullWidth
                                onChange={this.cambiarDato}
                                value={this.state.negocio.telefono}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="nombreP"
                                label="Nombre del propietario"
                                fullWidth
                                onChange={this.cambiarDato}
                                value={this.state.negocio.nombreP}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="descripcion"
                                label="Descripción de negocio"
                                fullWidth
                                multiline
                                onChange={this.cambiarDato}
                                value={this.state.negocio.descripcion}
                            />
                        </Grid>
                    </Grid>

                    <Grid container justify="center">
                        <Grid item xs={12} sm={6}>
                            <ReactImageUploadComponent
                                key={uniqueID}
                                withIcon={true}
                                buttontext="Seleccione imagen"
                                onChange={this.subirImagenes}
                                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                                maxFileSize={5242880}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Table>
                                <TableBody>
                                    {
                                        this.state.negocio.fotos
                                        ?this.state.negocio.fotos.map((foto, i)=> (
                                            <TableRow key={i}>
                                                <TableCell align="left">
                                                    <img src={foto} style={style.fotoNegocio} />
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        onClick={this.eliminarFoto(foto)}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        :""
                                    }
                                </TableBody>
                            </Table>
                        </Grid>

                    </Grid>

                    <Grid container justify="center">
                        <Grid item xs={12} md={6}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                size="large"
                                color="secondary"
                                style={style.submit}
                                onClick={this.guardarNegocio}
                            >
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>

                </Paper>
            </Container>
        );
    }
}

export default consumerFirebase(EditarNegocio);