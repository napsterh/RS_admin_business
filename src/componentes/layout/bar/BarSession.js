import React, { Component } from 'react';
import { Toolbar, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    sectionDesktop : {
        display: "none",
        [theme.breakpoints.up("md")] : {
            display : "flex"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")] : {
            display : "none"
        }
    },
    grow : {
        flexGrow : 1
    }
});


class BarSession extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Toolbar>
                    <IconButton color="inherit">
                        <i className="material-icons">menu</i>
                    </IconButton>
                    <Typography variant="h6">
                        Ruta Solidaria
                    </Typography>
                    <div className={classes.grow}></div>
                    <div className={classes.sectionDesktop}>
                        <Button color="inherit">Registrar cuenta</Button>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton color="inherit">
                            <i className="material-icons">more_vert</i>
                        </IconButton>
                    </div>
                </Toolbar>
            </div>
        );
    }
}

export default withStyles(styles)(BarSession);