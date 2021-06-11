/* import styles from './index.css';
import less from './less.less';
import sass from './sass.scss';

console.log("styles: ", styles, less, sass);



const title = require('../../../static/title.txt');
const userName = 'zhangsanttt';

const doc = document.querySelector('#root');


const hello = `<div>
    <h1 class="${styles.hello}">我是 About页面 </h1>
    <h1 class="${styles.hello}">${title.default}</h1>
    <h1 class="${less['less-container']}">
        <p>${'less-container: '+userName}</p>
    </h1>
    <h1 class="${sass['sass-container']}">
        <p>${'sass-container: '+userName}</p>
        <p class="work">hello World</p>
    </h1>
</div>`
doc.innerHTML = hello;
 */

import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store';

import App from '../../components/AppMuti';
import styles from './index.less';
import img from '../../assets/fg.jpeg'

ReactDOM.render(
    <Provider store={ store }>
        <App title="about pages" styles={styles} img={img}/>
    </Provider>,
    document.getElementById('root')
);
