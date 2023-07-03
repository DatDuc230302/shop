import classNames from 'classnames/bind';
import style from './AdminEditProduct.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerURL } from '../../../connect';
import { useNavigate, useParams } from 'react-router-dom';
import { loadingApi } from '../../../components/Loading';
import Loading from '../../../components/Loading';
import { Alert, Button } from '@mui/material';
import { ref, uploadBytesResumable, getDownloadURL, list } from 'firebase/storage';
import { storage } from '../../../App';
import { useMediaQuery } from 'react-responsive';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

const cx = classNames.bind(style);
function AdminEditProduct() {
    // Responsive
    const pc = useMediaQuery({ minWidth: 992 });
    const tb = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const mb = useMediaQuery({ maxWidth: 767 });

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
    const [type, setType] = useState('');
    const [views, setViews] = useState(0);
    const [sold, setSold] = useState(0);
    const [rerender, setRerender] = useState(false);

    // Keys
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [keyDel, setKeyDel] = useState('');
    const [listKeys, setListKeys] = useState([]);
    const [key1, setKey1] = useState('');
    const [key2, setKey2] = useState('');
    const [key3, setkey3] = useState('');

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
                type: type,
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
    }, [rerender]);

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
        setType(product.type);
        setViews(product.views);
        setSold(product.sold);
        setListKeys(product.keys);
    }, setLoading);

    const addKey = async () => {
        if (key1.length > 0 && key2.length > 0 && key3.length > 0) {
            const key = `${key1}-${key2}-${key3}`;
            const api = await axios.post(`${ServerURL}/products/addKey`, { id: id, key: key });
            if (api.data.status === 200) {
                setRerender(!rerender);
                setKey1('');
                setKey2('');
                setkey3('');
            }
        } else {
            setWarn(true);
            setTimeout(() => {
                setWarn(false);
            }, 500);
        }
    };

    const deleteKey = async () => {
        const api = await axios.post(`${ServerURL}/products/deleteKey`, { id: id, key: keyDel });
        if (api.data.status === 200) {
            setRerender(!rerender);
            setConfirmDelete(false);
        }
    };

    const onChangeKey123 = (number: number, e: any) => {
        const valueKey = String(e.target.value).toLocaleUpperCase();
        if (valueKey.length <= 2) {
            switch (number) {
                case 1:
                    setKey1(valueKey);
                    break;
                case 2:
                    setKey2(valueKey);
                    break;
                case 3:
                    setkey3(valueKey);
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Loading />
            ) : (
                <div className={cx('inner', tb && 'tb', mb && 'mb')}>
                    <div className={cx('info')}>
                        <span style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>Information</span>
                        <div className={cx('row')}>
                            <div className={cx('col')}>
                                <span className={cx('label-title')}>Sold</span>
                                <div className={cx('input')}>{sold}</div>
                            </div>
                            <div className={cx('col')}>
                                <span className={cx('label-title')}>Views</span>
                                <div className={cx('input')}>{views}</div>
                            </div>
                        </div>
                        <div className={cx('col')}>
                            <span className={cx('label-title')}>List Keys</span>
                            <div className={cx('keys-add')}>
                                <div className={cx('row')}>
                                    <input
                                        onChange={(e) => onChangeKey123(1, e)}
                                        className={cx('key-input')}
                                        type="text"
                                        placeholder="Add Key1 Here"
                                        value={key1}
                                    />
                                    -
                                    <input
                                        onChange={(e) => onChangeKey123(2, e)}
                                        className={cx('key-input')}
                                        type="text"
                                        placeholder="Add Key2 Here"
                                        value={key2}
                                    />
                                    -
                                    <input
                                        onChange={(e) => onChangeKey123(3, e)}
                                        className={cx('key-input')}
                                        type="text"
                                        placeholder="Add Key3 Here"
                                        value={key3}
                                    />
                                </div>
                                <div onClick={() => addKey()} className={cx('keys-btn')}>
                                    Add key
                                </div>
                            </div>
                            <div className={cx('keys-box')}>
                                {listKeys.length > 0 ? (
                                    <>
                                        <span className={cx('keys-total')}>
                                            Total Keys: <strong>{listKeys.length}</strong>
                                        </span>
                                        {listKeys.map((item: string, index: number) => (
                                            <div key={index} className={cx('keys-item')}>
                                                <div>
                                                    <span className={cx('keys-quantity')}>{index} : </span>
                                                    <span className={cx('keys-name')}>{item}</span>
                                                </div>
                                                <div style={{ display: 'flex', gap: 10 }}>
                                                    <DeleteIcon
                                                        onClick={() => {
                                                            setConfirmDelete(true);
                                                            setKeyDel(String(item));
                                                        }}
                                                        sx={{ cursor: 'pointer', fontSize: 20 }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <span style={{ textAlign: 'center', fontSize: 15 }}>
                                        This Products Doesn't Have any key!
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={cx('edit')}>
                        <h1 className={cx('header')}>Edit Products </h1>
                        <div className={cx('col')}>
                            <span className={cx('label-title')}>Name</span>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                className={cx('input')}
                                type="text"
                                placeholder="Name"
                                value={name}
                            />
                        </div>
                        <div className={cx('row')}>
                            <div className={cx('col')}>
                                <span className={cx('label-title')}>Price</span>
                                <input
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    className={cx('input')}
                                    type="number"
                                    placeholder="Price (USD)"
                                    value={price}
                                />
                            </div>
                            <div className={cx('col')}>
                                <span className={cx('label-title')}>Discount</span>
                                <input
                                    onChange={(e) => setDiscount(Number(e.target.value))}
                                    className={cx('input')}
                                    type="number"
                                    placeholder="Discount (%)"
                                    value={discount}
                                />
                            </div>
                        </div>
                        <div className={cx('col')}>
                            <span className={cx('label-title')}>Title</span>
                            <input
                                onChange={(e) => setTitle(e.target.value)}
                                className={cx('input')}
                                type="text"
                                placeholder="Title"
                                value={title}
                            />
                        </div>
                        <div className={cx('col')}>
                            <span className={cx('label-title')}>Description</span>
                            <textarea
                                style={{ height: 100, outline: 'none', resize: 'none' }}
                                onChange={(e) => setDescription(e.target.value)}
                                className={cx('input')}
                                placeholder="Description"
                                value={description}
                            ></textarea>
                        </div>
                        <div className={cx('col')}>
                            <span className={cx('label-title')}>Category</span>
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
                        </div>
                        <div className={cx('col')}>
                            <span className={cx('label-title')}>Type</span>
                            <input
                                onChange={(e) => setType(e.target.value)}
                                className={cx('input')}
                                type="text"
                                placeholder="Type"
                                value={type}
                            />
                        </div>
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
                        <button onClick={() => postData()} className={cx('input')}>
                            Update Data
                        </button>
                        <input hidden id="fileImg" accept="image/png" type="file" onChange={handleFileChange} />
                    </div>
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
            {confirmDelete && (
                <div className={cx('confirm-delKey')}>
                    <div className={cx('confirmDelKey-header')}>Do you want to delete this key?</div>
                    <Button onClick={() => deleteKey()} variant="contained">
                        Yes
                    </Button>
                    <Button onClick={() => setConfirmDelete(false)} variant="outlined">
                        No
                    </Button>
                </div>
            )}
        </div>
    );
}

export default AdminEditProduct;
