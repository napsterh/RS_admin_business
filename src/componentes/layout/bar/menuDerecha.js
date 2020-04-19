import React, {Component} from 'react';
import { List, Link, ListItemText, ListItem, Avatar } from '@material-ui/core';

export const MenuDerecha = ({
    classes,
    usuario,
    textoUsuario,
    fotoUsuario,
    salirSesion
    }) => (
    <div className={classes.list}>
        <List>
            <ListItem button component={Link} to= "/auth/RegistrarUser">
                <Avatar
                    src={fotoUsuario}
                />
                <ListItemText className={{primary : classes.listItemText}} primary={textoUsuario} />
            </ListItem>
            <ListItem button onClick={salirSesion}>
                <ListItemText classes={{primary : classes.listItemText}} primary="Salir" />
            </ListItem>
        </List>
    </div>
);