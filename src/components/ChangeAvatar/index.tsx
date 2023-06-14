import classNames from 'classnames/bind';
import style from './ChangeAvatar.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerURL } from '../../connect';
import { useDispatch } from 'react-redux';
import cartAction from '../../redux/actions/cartAction';

const cx = classNames.bind(style);

function ChangeAvatar({ oldAvatar, avatar, setAvatar, setShowChangeAva, showChangeAva }: any) {
    const [api, setApi] = useState([]);
    const [img, setImg] = useState('');
    const [currentImg, setCurrentImg] = useState(-1);

    const dispath = useDispatch();

    useEffect(() => {
        getApi();
    }, []);

    const getApi = async () => {
        const data = await axios.get(`${ServerURL}/users/getAvatars`);
        setApi(data.data);
    };

    const handleSubmit = async () => {
        const idUser = localStorage.getItem('currentUser');
        await axios.post(`${ServerURL}/users/updateAvatar`, { idUser: idUser, avatar: img });
        setAvatar(img);
        dispath(cartAction());
        setShowChangeAva(false);
    };

    useEffect(() => {
        const id = api.filter((item: any) => item.url === avatar).map((item: any) => item.id)[0];
        if (id !== undefined) {
            setCurrentImg(id);
        } else {
            setCurrentImg(0);
        }
    }, [avatar, api]);
    return (
        <div className={cx('wrapper', showChangeAva && 'active')}>
            <div className={cx('inner')}>
                <div className={cx('box', showChangeAva && 'active')}>
                    <div onClick={() => setShowChangeAva(false)} className={cx('header')}>
                        <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24px"
                            height="24px"
                            fill="currentColor"
                        >
                            <path
                                d="M16 8l-8 8M16 16L8 8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </div>
                    <span className={cx('title')}>Choose your avatar</span>
                    <div className={cx('box-avatars')}>
                        <div
                            onClick={() => {
                                setCurrentImg(0);
                                setImg(oldAvatar);
                            }}
                            className={cx('item')}
                        >
                            <img className={cx('item-img', currentImg === 0 && 'currentImg')} src={oldAvatar} alt="" />
                        </div>
                        {api.map((item: any) => (
                            <div
                                onClick={() => {
                                    setImg(item.url);
                                    setCurrentImg(item.id);
                                }}
                                key={item.id}
                                className={cx('item')}
                            >
                                <img
                                    className={cx('item-img', currentImg === item.id && 'currentImg')}
                                    src={item.url}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                    <div onClick={() => handleSubmit()} className={cx('button')}>
                        Set avatar
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangeAvatar;
