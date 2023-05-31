import { useState } from 'react';
import classNames from 'classnames/bind';
import style from './Editor.module.scss';

const cx = classNames.bind(style);
function Editor() {
    const [result, setResult] = useState(0);
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);

    return (
        <div className={cx('wrapper')}>
            <input className={cx('input')} onChange={(e) => setValue1(Number(e.target.value))} placeholder="Value1" />
            <input className={cx('input')} onChange={(e) => setValue2(Number(e.target.value))} placeholder="Value2" />
            <button onClick={() => setResult((value1 / value2) * 100)}>Calculate</button>
            <div style={{ fontSize: 20 }}>Ket qua: {result.toFixed(2)}%</div>
        </div>
    );
}

export default Editor;
