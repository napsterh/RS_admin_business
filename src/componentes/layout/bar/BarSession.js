import React, { Component } from 'react';
import { Toolbar, Typography, Button, Drawer, Avatar, NativeSelect } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { consumerFirebase } from '../../../server';
import { compose } from 'recompose';
import { StateContext } from '../../../session/store';
import { CerrarSesion } from '../../../session/actions/sesionAction';
import { MenuDerecha } from './menuDerecha';
import { MenuIzquierdo } from './menuIzquierdo';
import fotoUsuarioTemp from '../../../logo.svg';
import { withRouter, Link } from 'react-router-dom';


const styles = theme => ({
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    grow: {
        flexGrow: 1
    },
    avatarSize: {
        width: 40,
        heigth: 40
    },
    listitemtext: {
        fontSize: "14px",
        fontWeight: 600,
        paddinLeft: "15px",
        color: "#212121"
    },
    list: {
        width: 250
    }
});


class BarSession extends Component {
    static contextType = StateContext;

    state = {
        firebase: null,
        right: false,
        left : false
    }

    salirSesionApp = () => {
        const { firebase } = this.state;
        const [{ sesion }, dispatch] = this.context;

        CerrarSesion(dispatch, firebase).then(success => {
            this.props.history.push("/auth/login");
        })

    }

    toggleDrawer = (side, open) => () => {
        this.setState(
            {
                [side]: open
            }
        )
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        let nuevosObjetos = {};

        if (nextProps.firebase !== prevState.firebase) {
            nuevosObjetos.firebase = nextProps.firebase;
        }

        return nuevosObjetos;
    }

    render() {
        const { classes } = this.props;
        const [{ sesion }, dispatch] = this.context;
        const { usuario } = sesion;
        let textoUsuario = usuario.nombre + " " + usuario.apellido;

        return (
            <div>
                <Drawer
                    open={this.state.left}
                    onClose={this.toggleDrawer("left", false)}
                    anchor="left"
                >
                    <div
                        role="Button"
                        onClick={this.toggleDrawer("left", false)}
                        onKeyDown={this.toggleDrawer("left", false)}
                    >
                        <MenuIzquierdo classes={classes}/>
                    </div>
                </Drawer>

                <Drawer
                    open={this.state.right}
                    onClose={this.toggleDrawer("right", false)}
                    anchor="right"
                >
                    <div
                        role="Button"
                        onClick={this.toggleDrawer("right", false)}
                        onKeyDown={this.toggleDrawer("right", false)}
                    >
                        <MenuDerecha
                            classes={classes}
                            usuario={usuario}
                            textoUsuario={textoUsuario}
                            fotoUsuario={usuario.foto || fotoUsuarioTemp}
                            salirSesion={this.salirSesionApp}
                        />
                    </div>
                </Drawer>

                <Toolbar>
                    <IconButton color="inherit" onClick={this.toggleDrawer("left", true)}>
                        <i className="material-icons">menu</i>
                    </IconButton>
                    <Typography variant="h6">
                        Ruta Solidaria
                    </Typography>
                    <div className={classes.grow}></div>
                    <div className={classes.sectionDesktop}>
                        <Button color="inherit">{textoUsuario}</Button>
                        <IconButton color="inherit" component={Link} to="">
                            <i className="material-icons">mail_outline</i>
                        </IconButton>
                        <Button color="inherit" onClick={this.salirSesionApp}>
                            Salir
                        </Button>
                        <Avatar
                            src={usuario.foto || fotoUsuarioTemp}
                        >
                        </Avatar>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton color="inherit"
                            onClick={this.toggleDrawer("right", true)}
                        >
                            <i className="material-icons">more_vert</i>
                        </IconButton>
                    </div>
                </Toolbar>
            </div>
        );
    }
}

export default compose(
    withRouter,
    consumerFirebase,
    withStyles(styles)
)(BarSession);