module.exports.controller = function(app) {
  this.app = app;

  /*
   * Example usage:
   * /search?q=searchterm
   */
  app.get('/search', function(req, res) {
    console.log("Search")
    var q = req.query.q;
    if (!q) {
      res.send(406);
      return;
    }

    app.get('tpb').search(q
      //, {category: '208'}
    ).then(function(results){
      if (results.length == 0) {
        res.json({'results':results});
        res.send(200);
        console.log("no results found");
        return;
      }

      for (var i = 0; i < results.length; i++)
        results[i].score = parseInt(results[i].seeders) + parseInt(results[i].leechers);
      results.sort(function(a, b) {return b.score - a.score});

      var top5 = results.slice(0, results.length > 5 ? 5 : results.length);

      res.json({'results':results});
    }).catch(function(err){
      console.log(err);
    });

  });

}
