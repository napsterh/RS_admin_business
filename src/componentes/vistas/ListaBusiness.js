import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField, Card, CardContent, CardActions } from '@material-ui/core';
import CardMedia from "@material-ui/core/CardMedia";
import HomeIcon from '@material-ui/icons/Home';
import { consumerFirebase } from '../../server';
import logo from '../../logo.svg';

const style = {
    cardGrid: {
        paddingTop: 8,
        paddingBottom: 8
    },
    paper: {
        backgroundColor: "#f5f5f5",
        padding: "20px",
        minHeight: 650
    },
    link: {
        display: "flex"
    },
    gridTextfield: {
        marginTop: "20px"
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardMedia: {
        paddingTop: "56.25%"
    },
    cardContent: {
        flexGrow: 1
    }
}


class ListaBusiness extends Component {

    state = {
        negocios: [],
        textoBusqueda: ""
    }

    cambiarBusquedaTexto = e => {
        const self = this;
        self.setState({
            [e.target.name]: e.target.value
        })

        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }

        self.setState({
            name: e.target.value,
            typing: false,
            typingTimeout: setTimeout(goTime => {
                let objectQuery = this.props.firebase.db
                    .collection("Business")
                    .orderBy("distrito")
                    .where("keywords", "array-contains", self.state.textoBusqueda.toLowerCase());

                if (self.state.textoBusqueda.trim() === "") {
                    objectQuery = this.props.firebase.db
                        .collection("Business")
                        .orderBy("distrito")
                }


                objectQuery.get().then(snapshot => {
                    const arrayNegocio = snapshot.docs.map(doc => {
                        let data = doc.data();
                        let id = doc.id;
                        return { id, ...data };
                    })

                    this.setState({
                        negocios: arrayNegocio
                    })
                })

            }, 5000)
        })
    }

    async componentDidMount() {
        let objectQuery = this.props.firebase.db.collection("Business").orderBy("direccion");

        const snapshot = await objectQuery.get();

        const arrayNegocio = snapshot.docs.map(doc => {
            let data = doc.data();
            console.log(data);
            let id = doc.id;
            return { id, ...data };
        })

        this.setState({
            negocios: arrayNegocio
        });
    }

    eliminarNegocio = id => {
        this.props.firebase.db
            .collection("Business")
            .doc(id)
            .delete()
            .then(success => {
                this.eliminarNegocioListaEstado(id);
            })
    }

    eliminarNegocioListaEstado = id => {
        const negocioListaNueva = this.state.negocios.filter(
            negocio => negocio.id !== id
        )
        this.setState({
            negocios: negocioListaNueva
        })
    }

    render() {
        return (
            <Container style={style.cardGrid}>
                <Paper style={style.paper}>
                    <Grid item xs={12} sm={12}>
                        <Breadcrumbs aria-label="breadcrumbs">
                            <Link color="inherit" style={style.link} href="/">
                                <HomeIcon />
                                    Home
                                </Link>
                            <Typography color="textPrimary">Mis Negocios</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={12} sm={6} style={style.gridTextfield}>
                        <TextField
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            name="textoBusqueda"
                            variant="outlined"
                            label="Ingrese el negocio a buscar"
                            onChange={this.cambiarBusquedaTexto}
                            value={this.state.textoBusqueda}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} style={style.gridTextfield}>
                        <Grid container spacing={4}>
                            {this.state.negocios.map(card => (
                                <Grid item key={card.id} xs={12} sm={6} md={4}>
                                    <Card style={style.card}>
                                        <CardMedia
                                            style={style.cardMedia}
                                            image={
                                                card.fotos
                                                    ? card.fotos[0]
                                                        ? card.fotos[0]
                                                        : logo
                                                    : logo
                                            }
                                            title="Mi negocio"
                                        />
                                        <CardContent style={style.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {card.distrito + ", " + card.ciudad}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                color="secondary"
                                            >
                                                Editar
                                                </Button>
                                            <Button
                                                size="small"
                                                color="secondary"
                                                onClick={() => this.eliminarNegocio(card.id)}
                                            >
                                                Eliminar
                                                </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                </Paper>
            </Container>
        );
    };
};

export default consumerFirebase(ListaBusiness);