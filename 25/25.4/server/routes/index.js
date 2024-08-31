const {Router} = require('express')
const fs = require('fs');
const path = require('path');
const cwd = process.cwd();

const {createProductObject, updateLastId} = require('./utils');

const router = Router()

router.get('/', function (req, res) {
    
    fs.readFile(__dirname + '/index.html', {encoding: "utf-8"}, (err, html) => {
        if (err) {
            console.error(err.message);
        }

        res.send(html);
    });
});

router.get('/getProducts', function(req, res){
    fs.readFile(path.join(cwd, "/server/data/products.json"), "utf-8", (err, dataString) => {
        if (err){
            console.error(err.message);
            res.json({success: false, error: err.message});
        } else {
            const products = JSON.parse(dataString);
            res.json(products.data);
        }
    });
});

router.post('/createProduct', function(req, res){
    fs.readFile(path.join(cwd, "/server/data/products.json"), "utf-8", (err, json) => {
        if (err) {
            console.error(err.message);
            res.json({success: false, error: err.message});
        } else {
            
            const products = JSON.parse(json);
            const lastId = products.lastId === null ? 1 : products.lastId + 1;
            const newProduct = createProductObject(lastId, req.body, ["red", "green", "blue"]);
            
            products.data.push(newProduct);
            products.lastId = lastId;

            fs.writeFile(path.join(cwd, "/server/data/products.json"), JSON.stringify(products), (err) => {
                if (err) {
                    console.error(err.message);
                    res.json({success: false, error: err.message});
                } else {
                    res.json({success: true});
                }
            })
        }
    });
});

router.delete('/deleteProduct', function(req, res){

    const {uid} = req.body;

    if (!uid){
        res.json({success: false, error: "No uid presented"});
    }

    fs.readFile(path.join(cwd, "/server/data/products.json"), "utf-8", (err, json) => {
        if (err) {
            console.error(err.message);
            res.json({success: false, error: err.message});
        } else {
            const {lastId, data} = JSON.parse(json);
            const isUidEqualLastId = uid === lastId;
            let stringData;

            if (isUidEqualLastId) {
                data.pop();
                const updatedLastId = updateLastId(data);
                stringData = JSON.stringify({lastId: updatedLastId, data});
                
            } else {
                const filteredData = data.filter(item => item.uid !== uid);
                stringData = JSON.stringify({lastId, data: filteredData});
            }

            fs.writeFile(path.join(cwd, "/server/data/products.json"), stringData, (err) => {
                if (err){
                    console.error(err.message);
                    res.json({success: false, error: err.message});
                } else {
                    res.json({success: true});
                }
            });
        }
    });
});

router.post('/updateProduct', function(req, res){
    fs.readFile(path.join(cwd, "/server/data/products.json"), "utf-8", (err, json) => {
        if (err) {
            console.error(err.message);
            res.json({success: false, error: err.message});
        } else {
            
            const {uid, ...rest} = req.body;
            const products = JSON.parse(json);
            const updatedProduct = createProductObject(uid, rest, ["red", "green", "blue"]);
            
            const updatedProductList = products.data.map(product => {
                if (product.uid === uid){
                    return updatedProduct;
                }
                return product;
            });

            fs.writeFile(path.join(cwd, "/server/data/products.json"), JSON.stringify({lastId: products.lastId, data: updatedProductList}), (err) => {
                if (err) {
                    console.error(err.message);
                    res.json({success: false, error: err.message});
                } else {
                    res.json({success: true});
                }
            })
        }
    });
});

module.exports = router