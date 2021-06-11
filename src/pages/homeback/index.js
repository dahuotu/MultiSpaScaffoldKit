/* import styles from './index.css';
import less from './less.less';
import sass from './sass.scss';

console.log("styles: ", styles, less, sass);



const title = require('../../../static/title.txt');
const userName = 'zhangsanttt';

const doc = document.querySelector('#root');


const hello = `<div>
<h1 class="${styles.hello}">我是 Home 页面</h1>
    <h1 class="${styles.hello}">${title.default}</h1>
    <h1 class="${less['less-container']}">
        <p>${'less-container: '+userName}</p>
    </h1>
    <h1 class="${sass['sass-container']}">
        <p>${'sass-container: '+userName}</p>
        <p class="work">hello World</p>
    </h1>
</div>`
doc.innerHTML = hello; */

import React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../../components/AppMuti';

ReactDOM.render(
    <App title="home pages" />,
    document.getElementById('root')
);

