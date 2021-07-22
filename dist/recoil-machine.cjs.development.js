'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var recoil = require('recoil');
var xstate = require('xstate');
var nanoid = require('nanoid');
var useActor = require('@xstate/react/lib/useActor');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var reset = '__$$RESET';

function isFunction(value) {
  return value && {}.toString.call(value) === '[object Function]';
}

function machineAtom(_ref) {
  var _extends2;

  var conf = _ref.config,
      options = _ref.options,
      key = _ref.key;
  var id = nanoid.nanoid();

  var config = _extends({}, conf, {
    id: id,
    on: _extends({}, conf.on, (_extends2 = {}, _extends2[reset] = {
      target: "##" + id,
      actions: xstate.assign(function () {
        var ctx = conf.context;
        if (isFunction(ctx)) return ctx();
        return ctx;
      })
    }, _extends2))
  });

  var out = recoil.atom({
    key: key,
    "default": xstate.interpret(xstate.createMachine(config, options)).start()
  });
  return out;
}

function useRecoilMachine(atom) {
  var _useActor = useActor.useActor(recoil.useRecoilValue(atom)),
      state = _useActor[0],
      send = _useActor[1];

  return {
    state: state,
    send: send
  };
}

exports.machineAtom = machineAtom;
exports.useRecoilMachine = useRecoilMachine;
//# sourceMappingURL=recoil-machine.cjs.development.js.map
