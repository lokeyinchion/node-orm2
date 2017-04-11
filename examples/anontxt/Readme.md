# AnonTXT demo app

## Getting started

**Setup node-orm2!**

```bash
git clone https://github.com/dresende/node-orm2.git
cd node-orm2
npm install

# You may work off master, or checkout a different version if master is broken:
git tag
git checkout v2.1.4
```

**Setup AnonTXT**

Edit `anontxt/config/settings.js` to set your database, user & password.

```bash
cd examples/anontxt
npm install
node tasks/reset # sets up the database
./script/start
```

GET Request from Query Strings:
1.GET /test?name=fred&tel=0926xxx572

  app.get('/test', function(req, res) {
      console.log(req.query.name);
      console.log(req.query.tel);
  });

2.POST

  app.post('/test', function(req, res) {
      console.log(req.body.name);
      console.log(req.body.tel);
  });

3.GET /hello/fred/0926xxx572

 app.get('/hello/:name/:tel', function(req, res) {
     console.log(req.params.name);
     console.log(req.params.tel);
 });

And then open up [localhost:3000](http://localhost:3000/)

You can also just run it with `node server.js` however the script launches nodemon which
automatically restarts the server if you change any code.
