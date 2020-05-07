import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField, Card, CardContent, CardActions, ButtonGroup } from '@material-ui/core';
import CardMedia from "@material-ui/core/CardMedia";
import HomeIcon from '@material-ui/icons/Home';
import { consumerFirebase } from '../../server';
import logo from '../../logo.svg';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import { obtenerData, obtenerDataAnterior } from '../../session/actions/negocioAction';

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
    },
    barraBoton: {
        marginTop: "20px"
    }
}


class ListaBusiness extends Component {

    state = {
        negocios: [],
        textoBusqueda: "",
        paginas: [],
        paginaSize: 8,
        negocioInicial: null,
        paginaActual: 0
    }

    cambiarBusquedaTexto = e => {
        const self = this;
        self.setState({
            [e.target.name]: e.target.value
        });

        if(self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }

        self.setState({
            name: e.target.value,
            typing: false,
            typingTimeout: setTimeout(goTime => {

                const firebase = this.props.firebase;
                const {paginaSize} = this.state;

                obtenerDataAnterior(firebase, paginaSize, 0, self.state.textoBusqueda).then(firebaseReturnData => {
                    const pagina = {
                        inicialValor : firebaseReturnData.inicialValor,
                        finalValor : firebaseReturnData.finalValor
                    }
                    const paginas = [];
                    paginas.push(pagina);

                    this.setState({
                        paginaActual : 0,
                        paginas,
                        negocios : firebaseReturnData.arrayNegocios
                    })

                })

            }, 500)
        });
    };

    anteriorPagina = () => {
        const { paginaActual, paginaSize, textoBusqueda, paginas } = this.state;

        if(paginaActual > 0){
            const firebase = this.props.firebase;

            obtenerDataAnterior(firebase, paginaSize, paginas[paginaActual-1].inicialValor, textoBusqueda).then(firebaseReturnData => {
                const pagina = {
                    inicialValor : firebaseReturnData.inicialValor,
                    finalValor : firebaseReturnData.finalValor
                }

                paginas.push(pagina);

                this.setState({
                    paginas,
                    paginaActual : paginaActual - 1,
                    negocios : firebaseReturnData.arrayNegocios
                })

            })
        }
    }

    siguientePagina = () => {
        const { paginaActual, paginaSize, textoBusqueda, paginas, negocioInicial } = this.state;
        const firebase = this.props.firebase;

        obtenerData(firebase, paginaSize, paginas[paginaActual].finalValor, textoBusqueda).then(firebaseReturnData => {

            if(firebaseReturnData.arrayNegocios.length > 0){
                const pagina = {
                    inicialValor : firebaseReturnData.inicialValor,
                    finalValor : firebaseReturnData.finalValor
                }

                paginas.push(pagina);
                this.setState({
                    paginas,
                    paginaActual : paginaActual + 1,
                    negocios : firebaseReturnData.arrayNegocios
                })
            }
        })
    }

    async componentDidMount() {

        const { paginaSize, textoBusqueda, negocioInicial, paginas } = this.state;

        const firebase = this.props.firebase;

        const firebaseReturnData = await obtenerData(firebase, paginaSize, negocioInicial, textoBusqueda);

        const pagina = {
            inicialValor : firebaseReturnData.inicialValor,
            finalValor : firebaseReturnData.finalValor
        }

        paginas.push(pagina);

        this.setState({
            negocios : firebaseReturnData.arrayNegocios,
            paginas,
            paginaActual : 0
        })

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

    editarNegocio = id => {
        this.props.history.push("/negocio/"+id)
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

                    <Grid item xs={12} md={12} style={style.barraBoton}>
                        <Grid container spacing={1} direction="column" alignItems="flex-end">
                            <ButtonGroup size="small" aria-label="small outlined group">
                                <Button onClick={this.anteriorPagina}>
                                    <ArrowLeft />
                                </Button>
                                <Button onClick={this.siguientePagina}>
                                    <ArrowRight />
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} style={style.gridTextfield}>
                        <Grid container spacing={4}>
                            {this.state.negocios.map(card => (
                                <Grid item key={card.id} xs={12} sm={6} md={3}>
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
                                            <Typography gutterBottom variant="h6" component="h2">
                                                {card.nombreNegocio}
                                            </Typography>
                                            <Typography gutterBottom variant="h6" component="h2">
                                                {card.distrito + ", " + card.ciudad}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                color="secondary"
                                                onClick={() => this.editarNegocio(card.id)}
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