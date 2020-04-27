import React, {Component} from 'react';
import { List, ListItem, ListItemText, Divider, Collapse, ListItemIcon } from "@material-ui/core";
import { Link } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YoutubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


export const MenuIzquierdo = ({classes}) => (
    <div className={classes.list}>
        <List>
            <ListItem component={Link} button to="/auth/perfil">
                <i className="material-icons">account_box</i>
                <ListItemText classes={{primary : classes.ListItemText}} primary="Perfil" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button to="/negocio/nuevo">
                <i className="material-icons">add_box</i>
                <ListItemText classes={{primary: classes.ListItemText}} primary="Nuevo Negocio" />
            </ListItem>
            <ListItem component={Link} button to="">
                <i className="material-icons">business</i>
                <ListItemText classes={{primary: classes.ListItemText}} primary="Negocios" />
            </ListItem>
            <ListItem component={Link} button to="">
                <i className="material-icons">mail_outline</i>
                <ListItemText classes={{primary: classes.ListItemText}} primary="Mensajes" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem>
                <ListItemText classes={{primary: classes.ListItemText}} primary="Síguenos en nuestras redes" />
            </ListItem>
            <ListItem component={Link} button to="">
                <FacebookIcon />
                <ListItemText classes={{primary: classes.ListItemText}} primary=" Facebook" />
            </ListItem>
            <ListItem component={Link} button to="">
                <InstagramIcon />
                <ListItemText classes={{primary: classes.ListItemText}} primary=" Instagram" />
            </ListItem>
            <ListItem component={Link} button to="">
                <YoutubeIcon />
                <ListItemText classes={{primary: classes.ListItemText}} primary=" YouTube" />
            </ListItem>
        </List>
    </div>
);
