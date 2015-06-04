var should = require('should');
var bboxed = require('../lib/bboxed')

describe('Extra stuff', function() {
   it('Should to shits', function() {
      var res = bboxed(
         "[img]asdf[/img]")
      console.log(res)
   });
});
