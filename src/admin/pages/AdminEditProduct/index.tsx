import classNames from 'classnames/bind';
import style from './AdminEditProduct.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerURL } from '../../../connect';
import { useNavigate, useParams } from 'react-router-dom';
import { loadingApi } from '../../../components/Loading';
import Loading from '../../../components/Loading';
import { Alert } from '@mui/material';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../App';

const cx = classNames.bind(style);
function AdminEditProduct() {
    // React Router
    const params = useParams();
    const navigate = useNavigate();

    // State
    const [selectedImage, setSelectedImage] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Categories');
    const [imageFile, setImageFile] = useState<File>();
    const [downloadURL, setDownLoadURL] = useState('');
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [warn, setWarn] = useState(false);
    const [success, setSuccess] = useState(false);
    const [progressUpload, setProgressUpload] = useState(0);
    const idParams = params.key;
    const [submitImg, setSubmitImg] = useState(false);
    const [firstImg, setFirstImg] = useState('');

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setImageFile(file);
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOptionChange = (e: any) => {
        setCategory(e);
    };

    const postData = async () => {
        if (name.length > 0 && price > 0 && title.length > 0 && description.length > 0) {
            let priceDiscount: number;
            if (discount > 0) {
                priceDiscount = price - (discount / 100) * price;
            } else {
                priceDiscount = 0;
            }
            const dataPost = {
                id: idParams,
                name: name,
                price: price,
                discount: discount,
                priceDiscount: priceDiscount.toFixed(2),
                title: title,
                description: description,
                category: category,
                img: downloadURL,
            };
            const api = await axios.post(`${ServerURL}/products/updateProductById`, dataPost);
            if (api.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    window.location.reload();
                }, 2000);
            }
        } else {
            setWarn(true);
            setTimeout(() => {
                setWarn(false);
            }, 1000);
        }
    };

    useEffect(() => {
        if (selectedImage !== firstImg) {
            setSubmitImg(true);
        } else {
            setSubmitImg(false);
        }
    }, [downloadURL, selectedImage]);

    const handleSubmit = () => {
        const file = imageFile;
        if (file && file.size < 100000000) {
            setLoading(true);
            const name = file.name;
            const storageRef = ref(storage, `${category}/${name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgressUpload(progress);
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setDownLoadURL(url);
                        setLoading(false);
                    });
                },
            );
        } else {
            setWarn(true);
            setTimeout(() => {
                setWarn(false);
            }, 1000);
        }
    };

    useEffect(() => {
        getApi();
    }, []);

    // Check downloadURL > 0 then post data update

    // Get Api From Id
    const getApi = loadingApi(async () => {
        const api = await axios.get(`${ServerURL}/products/queryId?id=${idParams}`);
        const product = api.data[0];
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setDiscount(product.discount);
        setTitle(product.title);
        setDescription(product.description);
        setCategory(product.category);
        setSelectedImage(product.img);
        setDownLoadURL(product.img);
        setFirstImg(product.img);
    }, setLoading);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Loading />
            ) : (
                <div className={cx('inner')}>
                    <>
                        <h1 className={cx('header')}>Edit Products </h1>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            className={cx('input')}
                            type="text"
                            placeholder="Name"
                            value={name}
                        />
                        <div className={cx('row')}>
                            <input
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className={cx('input')}
                                type="number"
                                placeholder="Price (USD)"
                                value={price}
                            />
                            <input
                                onChange={(e) => setDiscount(Number(e.target.value))}
                                className={cx('input')}
                                type="number"
                                placeholder="Discount (%)"
                                value={discount}
                            />
                        </div>
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            className={cx('input')}
                            type="text"
                            placeholder="Title"
                            value={title}
                        />
                        <textarea
                            style={{ height: 100, outline: 'none', resize: 'none' }}
                            onChange={(e) => setDescription(e.target.value)}
                            className={cx('input')}
                            placeholder="Description"
                            value={description}
                        ></textarea>
                        <select onChange={(e) => handleOptionChange(e.target.value)} className={cx('select')}>
                            <option className={cx('option')}>{category}</option>
                            <option value={'gaming'} className={cx('option')}>
                                Gaming
                            </option>
                            <option value={'software'} className={cx('option')}>
                                Software
                            </option>
                            <option value={'gift cards'} className={cx('option')}>
                                Gift Cards
                            </option>
                            <option value={'subscriptions'} className={cx('option')}>
                                Subscriptions
                            </option>
                            <option value={'e - learning'} className={cx('option')}>
                                E - Learning
                            </option>
                            <option value={'charity'} className={cx('option')}>
                                Charity
                            </option>
                            <option value={'keys'} className={cx('option')}>
                                Keys
                            </option>
                            <option value={'other'} className={cx('option')}>
                                Other
                            </option>
                        </select>
                        <img className={cx('view-img')} src={selectedImage} alt="Selected" />
                        <div className={cx('row')}>
                            <label className={cx('input')} htmlFor="fileImg">
                                Change Image
                            </label>
                            <label
                                onClick={() => submitImg && handleSubmit()}
                                className={cx('input', !submitImg && 'disable')}
                            >
                                Submit Change Image
                            </label>
                        </div>
                    </>
                    <button onClick={() => postData()} className={cx('input')}>
                        Update Data
                    </button>
                    <input hidden id="fileImg" accept="image/png" type="file" onChange={handleFileChange} />
                </div>
            )}
            <div className={cx('warn', warn && 'active')}>
                <Alert severity="warning"></Alert>
                Missing Data
            </div>
            <div className={cx('success', success && 'active')}>
                <Alert severity="success"></Alert>
                Posted successfully
            </div>
        </div>
    );
}

export default AdminEditProduct;
