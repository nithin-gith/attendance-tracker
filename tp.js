const axios = require('axios');

axios.post('http://localhost:5001/add', {
	"name":"nithin",
	"age":21,
	"present":4,
	"absent":1
}).then((res)=>{
    console.log(res.data)
}).catch((err)=>{
    console.log(err)
})