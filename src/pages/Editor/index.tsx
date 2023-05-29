import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

function Editor() {
    const params = useParams();
    const url = Number(params.key);

    return <div>{url === 3 ? 'Day la 3' : 'Day la 4'}</div>;
}

export default Editor;
