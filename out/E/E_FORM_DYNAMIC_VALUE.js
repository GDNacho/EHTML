'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var E = require('./E');

var E_FORM_DYNAMIC_VALUE =
/*#__PURE__*/
function (_E) {
  _inherits(E_FORM_DYNAMIC_VALUE, _E);

  function E_FORM_DYNAMIC_VALUE(node) {
    _classCallCheck(this, E_FORM_DYNAMIC_VALUE);

    return _possibleConstructorReturn(this, _getPrototypeOf(E_FORM_DYNAMIC_VALUE).call(this, node));
  }

  _createClass(E_FORM_DYNAMIC_VALUE, [{
    key: "activate",
    value: function activate() {
      var _this = this;

      this.node.style.display = 'none';
      this.node.name = this.node.getAttribute('name');

      this.node.value = function () {
        return _this.appliedExpressionsInString(_this.node.getAttribute('data-bound-to'));
      };
    }
  }, {
    key: "appliedExpressionsInString",
    value: function appliedExpressionsInString(string) {
      return string.replace(/\$\{([^${}]+)\}/gm, function (match, p1) {
        // eslint-disable-next-line no-eval
        var appliedExpression = eval(p1);

        if (_typeof(appliedExpression) === 'object') {
          return JSON.stringify(appliedExpression);
        }

        return appliedExpression;
      });
    }
  }]);

  return E_FORM_DYNAMIC_VALUE;
}(E);

module.exports = E_FORM_DYNAMIC_VALUE;
