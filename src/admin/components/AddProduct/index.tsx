import classNames from 'classnames/bind';
import style from './AddProduct.module.scss';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../App';
import { useState } from 'react';

const cx = classNames.bind(style);

function AddProduct() {
    const [imageFile, setImageFile] = useState<File>();
    const [downloadURL, setDownLoadURL] = useState('');
    const [progressUpload, setProgressUpload] = useState(0);

    const handleSelectFile = (files: any) => {
        const file = files[0];
        if (file && file.size < 100000000) {
            setImageFile(file);
            console.log(file);
        } else {
            console.log('File size to big');
        }
    };

    const handleUploadfile = () => {
        if (imageFile) {
            const name = imageFile.name;
            const storageRef = ref(storage, `images/${name}`);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);
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
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h1 className={cx('header')}>Upload Products</h1>
                <input className={cx('input')} type="text" placeholder="Name" />
                <div className={cx('row')}>
                    <input className={cx('input')} type="number" placeholder="Price" />
                    <input className={cx('input')} type="number" placeholder="Discount" />
                </div>
                <select className={cx('select')}>
                    <option className={cx('option')}>Categories</option>
                    <option className={cx('option')}>Gaming</option>
                    <option className={cx('option')}>Software</option>
                    <option className={cx('option')}>Gift Cards</option>
                    <option className={cx('option')}>Subscriptions</option>
                    <option className={cx('option')}>E - Learning</option>
                    <option className={cx('option')}>Charity</option>
                    <option className={cx('option')}>Other</option>
                </select>
                <input className={cx('input')} type="text" placeholder="Title" />
                <input className={cx('input')} type="text" placeholder="Description" />
                <input accept="image/png" type="file" onChange={(e) => handleSelectFile(e.target.files)} />
                <div>{imageFile && imageFile.name}</div>
                <button onClick={handleUploadfile}>Upload</button>
                {downloadURL && <img src={downloadURL} alt="" style={{ width: 200, height: 200 }} />}
            </div>
        </div>
    );
}

export default AddProduct;
