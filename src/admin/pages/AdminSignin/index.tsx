import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
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

const defaultTheme = createTheme();
export default function AdminSignin() {
    // State
    const [uid, setUid] = React.useState('');
    const [password, setPassword] = React.useState('');

    // React Router
    const dispath = useDispatch();
    const navigate = useNavigate();

    const handelPost = async () => {
        if (uid.length > 0 && password.length > 0) {
            const api = await axios.get(`${ServerURL}/users/checkAdmin?uid=${uid}`);
            if (api.data.status) {
                alert('Ban đã đăng nhập thành cong');
                dispath(authAdminAction('LOGINADMIN'));
                navigate('/admin/home');
            } else {
                alert('Tai khoan cua ban khong du quyen truy cap');
            }
        } else {
            alert('Ban nhap thieu du lieu');
        }
    };

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
                            Sign In
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
        </ThemeProvider>
    );
}
