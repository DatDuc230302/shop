import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems } from './List';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import style from './DefaultLayoutAdmin.module.scss';
import { Link as LinkMove } from 'react-router-dom';
import { logo } from '../../assets/logo';
import { Pagination } from '@mui/material';

const cx = classNames.bind(style);
const drawerWidth: number = 240;
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
interface MyComponentProps {
    children?: React.ReactNode;
}

export default function DefaultLayoutAdmin({ children }: MyComponentProps): JSX.Element {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const authAdmin = useSelector((state: any) => state.authAdminReducer);

    return authAdmin ? (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute">
                    <div className={cx('header')}>
                        <LinkMove className={cx('header-title')} to={'/'}>
                            {logo}
                        </LinkMove>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </div>
                </AppBar>
                <div className={cx('list')}>
                    <List component="nav">
                        {mainListItems}
                        <Divider />
                    </List>
                </div>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <div className={cx('body')}>{children}</div>
                </Box>
            </Box>
        </ThemeProvider>
    ) : (
        <div className={cx('cannot')}>
            <span>You are not allowed to access!</span>
            <span>Please Login to continue or return to G2A</span>
            <div className={cx('btns')}>
                <LinkMove to={'/admin/signin'} className={cx('login')}>
                    Login Admin
                </LinkMove>
                <LinkMove to={'/'} className={cx('return')}>
                    Return to G2A
                </LinkMove>
            </div>
        </div>
    );
}
