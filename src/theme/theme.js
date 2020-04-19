import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    typography : {
        useNextVariants: true
    },
    palette : {
        primary : {
            main : '#E50000'
        },
        common : {
            white : 'white'
        },
        secondary : {
            main : '#1976D2'
        }
    },
    spacing : 10
});

export default theme;