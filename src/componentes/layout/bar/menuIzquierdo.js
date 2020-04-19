import React, {Component} from 'react';
import { List, Link, ListItem, ListItemText, Divider } from "@material-ui/core";


export const MenuIzquierdo = ({classes}) => (
    <div className={classes.list}>
        <List>
            <ListItem component={Link} button to="">
                <i className="material-icons">account_box</i>
                <ListItemText classes={{primary : classes.ListItemText}} primary="Perfil" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button to="">
                <i className="material-icons">add_box</i>
                <ListItemText className={{primary: classes.ListItemText}} primary="Nuevo Negocio" />
            </ListItem>
            <ListItem component={Link} button to="">
                <i className="material-icons">business</i>
                <ListItemText className={{primary: classes.ListItemText}} primary="Negocios" />
            </ListItem>
            <ListItem component={Link} button to="">
                <i className="material-icons">mail_outline</i>
                <ListItemText className={{primary: classes.ListItemText}} primary="Mensajes" />
            </ListItem>
        </List>
    </div>
);