import ArticleStore from '../app/stores/ArticleStore';
import expect from 'expect';
import React from 'react'; // eslint-disable-line
import sinon from 'sinon';
import utils from '../app/libs/utils';

const TEST_URL = 'http://jsonplaceholder.typicode.com/posts/1';
const TEST_WRONGURL = 'http://jsonplaceholder.typicode.com/does_not_exist';


describe('ArticleStore.js', function() {
  it('returns default values at initiation', function() {
    const state = ArticleStore.getState();

    expect(state.articles).toEqual([]);
    expect(state.selectedArticle).toBeA(Object);
    expect(state.loading).toEqual(false);
  });

  describe('utils.js', function() {
    beforeEach(function() {
      this.xhr = sinon.useFakeXMLHttpRequest();
      global.XMLHttpRequest = this.xhr;

      this.request = [];
      this.xhr.onCreate = (xhr) => {
        this.request.push(xhr);
      };
    });

    afterEach(function() {
      this.xhr.restore();
    });

    it('returns no error on success', function(done) {
      utils.getJSON(TEST_URL, function(err) {
        expect(err).toNotExist();
        done();
      });

      this.request[0].respond(200, { 'Content-Type': 'text/json' }, JSON.stringify({}));
    });

    it('returns error on missing page', function(done) {
      utils.getJSON(TEST_WRONGURL, function(err) {
        expect(err).toExist();
        done();
      });
 
      this.request[0].respond(404, 'page does not exist');
    });

    it('should parse fetched data as JSON', function(done) {
      const data = { foo: 'bar' };
      const dataJSON = JSON.stringify(data);

      utils.getJSON(TEST_URL, function(err, res) {
        expect(res).toEqual(data);
        done();
      });

      this.request[0].respond(200, { 'Content-Type': 'text/json' }, dataJSON);
    });    
  });
});
