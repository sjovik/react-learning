'use strict';

import ArticleStore from '../app/stores/ArticleStore';
import React from 'react';
import expect from 'expect';

describe('Getting data from server', () => {

  it('returns default values at initiation', () => {
    const state = ArticleStore.getState();

    expect(state.articles).toEqual([]);
    expect(state.selectedArticle).toBeA(Object);
    expect(state.loading).toEqual(false);
  });
});
