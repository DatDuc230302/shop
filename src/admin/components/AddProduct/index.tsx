import classNames from 'classnames/bind';
import style from './AddProduct.module.scss';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../App';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerURL } from '../../../connect';

const cx = classNames.bind(style);

function AddProduct() {
    // State
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Categories');
    const [imageFile, setImageFile] = useState<File>();
    const [downloadURL, setDownLoadURL] = useState('');
    const [progressUpload, setProgressUpload] = useState(0);

    const handleSubmit = () => {
        if (
            name.length > 0 &&
            price !== 0 &&
            title.length > 0 &&
            description.length > 0 &&
            category !== 'Categories' &&
            selectedImage !== null
        ) {
            const file = imageFile;
            if (file && file.size < 100000000) {
                console.log(file);
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
                        });
                    },
                );
            } else {
                console.log('File not found');
            }
        } else {
            alert('Du lieu ban dien con thieu');
        }
    };

    useEffect(() => {
        if (downloadURL.length > 0) {
            postData();
        }
    }, [downloadURL]);

    const postData = async () => {
        let priceDiscount: number;
        if (discount > 0) {
            priceDiscount = price - (discount / 100) * price;
        } else {
            priceDiscount = 0;
        }
        const data = await axios.post(`${ServerURL}/products/add`, {
            name: name,
            price: price,
            discount: discount,
            priceDiscount: priceDiscount.toFixed(2),
            title: title,
            description: description,
            category: category,
            img: downloadURL,
            sold: 0,
            views: 0,
        });
        if (data.data.status) {
            alert('Uploaded');
        }
    };
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h1 className={cx('header')}>Upload Products</h1>
                <input
                    onChange={(e) => setName(e.target.value)}
                    className={cx('input')}
                    type="text"
                    placeholder="Name"
                />
                <div className={cx('row')}>
                    <input
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className={cx('input')}
                        type="number"
                        placeholder="Price (USD)"
                    />
                    <input
                        onChange={(e) => setDiscount(Number(e.target.value))}
                        className={cx('input')}
                        type="number"
                        placeholder="Discount (%)"
                    />
                </div>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    className={cx('input')}
                    type="text"
                    placeholder="Title"
                />
                <input
                    onChange={(e) => setDescription(e.target.value)}
                    className={cx('input')}
                    type="text"
                    placeholder="Description"
                />
                <select onChange={(e) => handleOptionChange(e.target.value)} className={cx('select')}>
                    <option className={cx('option')}>Categories</option>
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
                <label className={cx('input')} htmlFor="fileImg">
                    Upload Image
                </label>
                {selectedImage && (
                    <>
                        <img className={cx('view-img')} src={selectedImage} alt="Selected" />{' '}
                        <h1 className={cx('input')} onClick={() => setSelectedImage(null)}>
                            Clear Img
                        </h1>
                    </>
                )}
                <button onClick={handleSubmit} className={cx('input')}>
                    Upload Data
                </button>
            </div>
            <input hidden id="fileImg" accept="image/png" type="file" onChange={handleFileChange} />
        </div>
    );
}

export default AddProduct;
