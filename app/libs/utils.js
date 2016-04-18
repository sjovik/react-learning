// Fast implementation to be rid of jQuery. Will switch to other xhr lib if more functionality is needed.
export default {
  ajax: function(url, options) {
    console.log(options);
    const xhr = new XMLHttpRequest();

    xhr.open(options.type, url, true);

    xhr.onload = () => {
      (xhr.status >= 200 && xhr.status < 400) ? 
        options.success(null, xhr.responseText) :
        options.error('status: ' + xhr.status);
    };

    xhr.onerror = () => {
      options.error('error: ' + xhr.status);
    };

    xhr.send();
  },
  getJSON: function(url, callback) {
    this.ajax(url, {
      type: 'GET',
      success: function(err, res) {
        callback(err, JSON.parse(res));
      },
      error: function(err) {
        callback(err);
      }
    });
  }
};
