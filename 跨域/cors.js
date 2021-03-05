
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "http://api.bob.com");
    res.header("Access-Control-Allow-Credentials",true);
    res.header("Access-Control-Allow-Headers","Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,HEAD,OPTIONS"),
    if(req.method === "OPTIONS"){
        res.send('OK!');
        return;
    }
    next();
})