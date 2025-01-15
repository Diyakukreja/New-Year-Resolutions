const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));


app.get('/', function(req,res) {
    // res.send("welcome");
    fs.readdir('./files', function(err,files){
        res.render("index", {files: files});
    })
    
})

app.get('/files/:filename', function(req,res) {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, data){
        res.render('show', {filename: req.params.filename, filedata: data});
    })
    
})

app.get('/edit/:filename', function(req,res){
    res.render('edit', {filename: req.params.filename});
})


app.post('/create', function(req, res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.det, function(err){
        res.redirect("/");
    })
})

app.post('/edit', function(req,res){

    fs.rename(`./files/${req.body.prev}`, `./files/${req.body.new}`, function(err){
        res.redirect('/');
    });
})

//deleting the file now
// fs.unlink("C:\\Users\\Diya\\Desktop\\alchemist\\developer\\backend\\copy\\copyofhey.txt", function(err){
//     if(err) console.error(err.message);
//     else console.log("file removed");
// })
app.post('/delete', function(req,res){
    const fileName = req.body.fileName;
    const filePath = path.join(__dirname, 'files', fileName);

    fs.unlink(filePath, function(err) {
        if (err) {
            return res.status(500).send("Error deleting file.");
        }
        res.redirect('/');  // Redirect to the main page after successful deletion
    });
  
})

app.listen(3000);