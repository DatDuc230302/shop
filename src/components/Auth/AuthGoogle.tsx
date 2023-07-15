import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import axios from 'axios';
import { ServerURL } from '../../connect';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cartAction from '../../redux/actions/cartAction';
import authClientAction from '../../redux/actions/authClientAction';

const clientId = '796532655839-3484b4jq39k3kin9f8v1hfv8f0q1slvs.apps.googleusercontent.com';

gapi.load('client:auth2', () => {
    gapi.client.init({
        // Cấu hình OAuth Client ID và các cài đặt khác
        clientId: clientId,
        scope: 'email',
    });
});

export function LoginGoogle() {
    // Redux
    const dispath = useDispatch();

    // Router
    const navigate = useNavigate();

    const loginSuccess = async (res: any) => {
        const api = res.profileObj;
        // Kiểm tra xem idUser đã tồn tại trên database chưa
        const resData = await axios.get(`${ServerURL}/users/queryId?id=${api.googleId}`);
        const data = resData.data[0];
        if (data !== undefined) {
            const dataUser = {
                id: data.id,
                name: data.name,
                avatar: data.avatar,
                rule: data.rule,
            };
            localStorage.setItem('currentUserId', data.id);
            dispath(authClientAction('LOGINCLIENT', dataUser));
        } else {
            const dataUser = {
                id: api.googleId,
                name: api.name,
                avatar: api.imageUrl,
                rule: 1,
            };
            dispath(authClientAction('LOGINCLIENT', dataUser));
            localStorage.setItem('currentUserId', api.googleId);
            // Khi đăng nhập với gmail thì sẽ tạo password ngẫu nhiên với 8 kí tự
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var password = '';
            var charactersLength = characters.length;

            for (var i = 0; i < 8; i++) {
                var randomIndex = Math.floor(Math.random() * charactersLength);
                password += characters.charAt(randomIndex);
            }
            // End random here
            await axios.post(`${ServerURL}/users/add`, {
                id: api.googleId,
                password: password,
                name: api.name,
                avatar: api.imageUrl,
                rule: 1,
            });
            await axios.post(`${ServerURL}/carts/addCarts`, { idUser: api.googleId });
        }
        dispath(cartAction());
        navigate('/');
    };

    const loginFailure = (res: any) => {
        console.log('LOGIN FAILED! res: ', res);
    };

    const loginUI = ({ onClick }: any) => {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    width: '100%',
                    height: '42px',
                    gap: '1rem',
                    border: '1px solid #ccc',
                    padding: '0 10px',
                    borderRadius: '4px',
                }}
                onClick={onClick}
            >
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48">
                    <g>
                        <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                        ></path>
                        <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                        ></path>
                        <path
                            fill="#FBBC05"
                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                        ></path>
                        <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                        ></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                    </g>
                </svg>
                <span style={{ transform: 'translateY(-1px)', fontSize: '1.4rem', fontWeight: 'bold' }}>
                    Login with Google
                </span>
            </div>
        );
    };

    return (
        <GoogleLogin
            clientId={clientId}
            onSuccess={loginSuccess}
            onFailure={loginFailure}
            cookiePolicy="single_host_origin"
            isSignedIn={true}
            render={(props) => loginUI(props)}
        />
    );
}

export function LogoutGoogle() {
    const dispath = useDispatch();
    const logoutSuccess = () => {
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('carts');
        dispath(cartAction());
        dispath(authClientAction('LOGOUTCLIENT', {}));
    };

    const logoutUI = ({ onClick }: any) => {
        return (
            <div
                style={{ height: 50, display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
                onClick={onClick}
            >
                <span style={{ fontSize: '1.2rem' }}>Sign out</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18px"
                    height="17.6px"
                    fill="currentColor"
                >
                    <g
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        stroke="#757575"
                        fill="none"
                        strokeMiterlimit="10"
                    >
                        <path d="M17 12H2M7 17l-5-5 5-5M10 1h12v22H10"></path>
                    </g>
                </svg>
            </div>
        );
    };

    return <GoogleLogout clientId={clientId} onLogoutSuccess={logoutSuccess} render={(props) => logoutUI(props)} />;
}
