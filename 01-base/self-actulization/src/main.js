import users from './users.png'
import logoicon from './logoicon.png'
import './index.js'

document.querySelector('#app').innerHTML=`
<img src="${users}" alt=""/>
<img src="${logoicon}" alt=""/>
`
console.log('我是 main');
