import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as LinkMove, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerURL } from '../../../connect';
import authAdminAction from '../../../redux/actions/authAdminAction';
import { useDispatch } from 'react-redux';
import { Alert } from '@mui/material';
import classNames from 'classnames/bind';
import style from './AdminSignin.module.scss';
import Loading, { loadingApi } from '../../../components/Loading';

const cx = classNames.bind(style);
const defaultTheme = createTheme();
export default function AdminSignin() {
    // State
    const [uid, setUid] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [successful, setSuccessful] = React.useState(false);
    const [failure, setFailure] = React.useState(false);
    const [warn, setWarn] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    // React Router
    const dispath = useDispatch();
    const navigate = useNavigate();

    const handelPost = loadingApi(async () => {
        if (uid.length > 0 && password.length > 0) {
            const api = await axios.get(`${ServerURL}/users/checkAdmin?uid=${uid}`);
            if (api.data.status) {
                setSuccessful(true);
                setTimeout(() => {
                    dispath(authAdminAction('LOGINADMIN'));
                    navigate('/admin/home');
                }, 1000);
            } else {
                setFailure(true);
                setTimeout(() => {
                    setFailure(false);
                }, 1000);
            }
        } else {
            setWarn(true);
            setTimeout(() => {
                setWarn(false);
            }, 1000);
        }
    }, setLoading);

    document.onkeydown = (e: any) => {
        if (e.which === 13) {
            handelPost();
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="User ID"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            InputProps={{
                                style: { fontSize: '1.5rem' },
                            }}
                            inputProps={{
                                style: { fontSize: '1.5rem' },
                            }}
                            onChange={(e) => setUid(String(e.target.value))}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(String(e.target.value))}
                            InputProps={{
                                style: { fontSize: '1.5rem' },
                            }}
                            inputProps={{
                                style: { fontSize: '1.5rem' },
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, fontSize: '1.4rem', padding: '10px 0' }}
                            onClick={() => handelPost()}
                        >
                            {loading ? <Loading size={'2rem'} /> : 'Sign in'}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Button>Forgot password?</Button>
                            </Grid>
                            <Grid item>
                                <LinkMove style={{ color: 'black', textDecoration: 'none' }} to="/admin/signup">
                                    Don't have an account? Sign Up
                                </LinkMove>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <div className={cx('alert', successful && 'active')}>
                <Alert severity="success" />
                Successful login
            </div>
            <div className={cx('alert-fail', failure && 'active')}>
                <Alert severity="error"></Alert>
                You do not have access
            </div>
            <div className={cx('alert-warn', warn && 'active')}>
                <Alert severity="warning"></Alert>
                Please enter uid and password
            </div>
        </ThemeProvider>
    );
}
