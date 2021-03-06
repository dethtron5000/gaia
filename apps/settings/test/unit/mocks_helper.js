var MocksHelper = function(mocks) {
  this.mocks = mocks;
  this.realWindowObjects = {};
};

MocksHelper.prototype = {

  setup: function mh_setup() {
    this._forEachMock('mSetup');
  },

  suiteSetup: function mh_suiteSetup() {
    this.mocks.forEach(function(objName) {
      var mockName = 'Mock' + objName;
      if (!window[mockName]) {
        throw 'Mock ' + mockName + ' has not been loaded into the test';
      }

      this.realWindowObjects[objName] = window[objName];
      window[objName] = window[mockName];
    }, this);
    this._forEachMock('mSuiteSetup');
  },

  suiteTeardown: function mh_suiteTeardown() {
    this._forEachMock('mSuiteTeardown');
    this.mocks.forEach(function(objName) {
      window[objName] = this.realWindowObjects[objName];
    }, this);
  },

  teardown: function mh_teardown() {
    this._forEachMock('mTeardown');
  },

  _forEachMock: function mh_forEachMock(funcName) {
    this.mocks.forEach(function(objName) {
      var mockName = 'Mock' + objName;
      var mock = window[mockName];

      if (mock[funcName]) {
        mock[funcName]();
      }
    });
  },
};

