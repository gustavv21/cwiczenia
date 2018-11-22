var express         = require("express"),
    app             = express(),
    bodyparser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require("mongoose");

// mongoose.connect("mongodb://localhost/zadania", { useNewUrlParser: true });
mongoose.connect("mongodb://gustav:Gustav1@ds119524.mlab.com:19524/zadania", { useNewUrlParser: true });
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(methodOverride("_method"));

var tabelaSchema = new mongoose.Schema({
    imie: String,
    nazwisko: String,
    telefon: Number,
    email: String
});
var Tabela = mongoose.model("Tabela", tabelaSchema);

app.get("/", function(req,res){
    res.render("ogolne/home");
});

app.get("/slider", function(req,res){
    res.render("ogolne/slider");
});

app.get("/tekst", function(req, res) {
    res.render("ogolne/tekst");
});

app.get("/petla", function(req, res) {
    res.render("ogolne/petla");
});

app.get("/tabela", function(req, res) {
    Tabela.find({}, function(err,tabele){
        if(err){
            console.log(err);
        } else {
            res.render("tabela/index", {tabela:tabele});
        }
    });
});

app.get("/tabela/new", function(req, res) {
    res.render("tabela/new");
});

app.post("/tabela", function(req,res){
    var imie = req.body.imie;
    var nazwisko = req.body.nazwisko;
    var telefon = req.body.telefon;
    var email = req.body.email;
    var nowaTabela = {imie:imie, nazwisko:nazwisko, telefon:telefon, email:email};
    Tabela.create(nowaTabela, function(err,nowaTabela){
        if(err){
            res.render("tabela/new");
        } else {
            res.redirect("/tabela");
        }
    });
});

app.get("/tabela/:id", function(req, res) {
    Tabela.findById(req.params.id, function(err,foundTabela){
        if(err){
            console.log(err);
        } else {
            res.render("tabela/show", {tabela:foundTabela});
        }
    });
});

app.get("/tabela/:id/edit", function(req, res) {
    Tabela.findById(req.params.id, function(err,foundTabela){
        if(err){
            console.log(err);
        } else {
            res.render("tabela/edit", {tabela:foundTabela});
        }
    });
});

app.put("/tabela/:id", function(req,res){
   Tabela.findByIdAndUpdate(req.params.id, req.body.tabela, function(err,updateTabela){
       if(err){
           res.redirect("/tabela");
       } else {
           res.redirect("/tabela");
       }
   }) ;
});

app.delete("/tabela/:id", function(req,res){
    Tabela.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/tabela");
        } else {
            res.redirect("/tabela");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("serwer is on");
})