module.exports.controller = function(app) {
  this.app = app;

  /*
   * Example usage:
   * /search?q=searchterm
   */
  app.get('/search', function(req, res) {
    console.log("Search")
    var q = encodeURIComponent(req.query.q || "");

    app.get('tpb').search(q
      //, {category: '208'}
    ).then(function(results){
      if (results.length == 0) {
        res.json({'results':results});
        res.send(200);
        console.log("no results found");
        return;
      }

      res.json({'results': results});
    }).catch(function(err){
      console.log(err);
    });

  });

}
