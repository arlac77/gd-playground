const hdt = require('hdt');

hdt.fromFile('./node_modules/hdt/test/test.hdt', (error, hdtDocument) => {
  hdtDocument.searchTriples(
    'http://example.org/s1',
    null,
    null,
    {
      offset: 0,
      limit: 10
    },
    function(error, triples, totalCount) {
      console.log(`Approximately ${totalCount} triples match the pattern.`);
      triples.forEach(triple => console.log(triple));
      hdtDocument.close();
    }
  );
});
