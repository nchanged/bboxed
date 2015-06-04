var should = require('should'),
   bboxed = require('../lib/bboxed');

describe('Parser', function() {
   describe('removeInvalidTags: true', function() {
      // To prevent spill-over into other tests
      var opts = {
         removeInvalidTags: true
      };

      it('removes stray closing tags', function() {
         bboxed('text[/b]', opts).should.equal('text');
      });

      it('removes unknown tags', function() {
         bboxed('[test]text[/test]', opts).should.equal('text');
      });


   });
});
