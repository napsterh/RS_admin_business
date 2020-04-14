import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    typography : {
        useNextVariants: true
    },
    palette : {
        primary : {
            main : '#3700B3'
        },
        common : {
            white : 'white'
        },
        secondary : {
            main : '#018786'
        }
    },
    spacing : 10
});

export default theme;