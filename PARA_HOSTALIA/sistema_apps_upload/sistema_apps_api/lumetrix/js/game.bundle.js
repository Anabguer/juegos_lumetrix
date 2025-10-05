var qs = { exports: {} }, Zl = {}, bs = { exports: {} }, A = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $r = Symbol.for("react.element"), yf = Symbol.for("react.portal"), vf = Symbol.for("react.fragment"), xf = Symbol.for("react.strict_mode"), wf = Symbol.for("react.profiler"), Sf = Symbol.for("react.provider"), kf = Symbol.for("react.context"), Ef = Symbol.for("react.forward_ref"), Cf = Symbol.for("react.suspense"), _f = Symbol.for("react.memo"), Nf = Symbol.for("react.lazy"), Au = Symbol.iterator;
function Tf(e) {
  return e === null || typeof e != "object" ? null : (e = Au && e[Au] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ea = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ta = Object.assign, na = {};
function Jn(e, t, n) {
  this.props = e, this.context = t, this.refs = na, this.updater = n || ea;
}
Jn.prototype.isReactComponent = {};
Jn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Jn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ra() {
}
ra.prototype = Jn.prototype;
function Di(e, t, n) {
  this.props = e, this.context = t, this.refs = na, this.updater = n || ea;
}
var Fi = Di.prototype = new ra();
Fi.constructor = Di;
ta(Fi, Jn.prototype);
Fi.isPureReactComponent = !0;
var Uu = Array.isArray, la = Object.prototype.hasOwnProperty, $i = { current: null }, oa = { key: !0, ref: !0, __self: !0, __source: !0 };
function ia(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) la.call(t, r) && !oa.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var s = Array(u), c = 0; c < u; c++) s[c] = arguments[c + 2];
    l.children = s;
  }
  if (e && e.defaultProps) for (r in u = e.defaultProps, u) l[r] === void 0 && (l[r] = u[r]);
  return { $$typeof: $r, type: e, key: o, ref: i, props: l, _owner: $i.current };
}
function zf(e, t) {
  return { $$typeof: $r, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Ai(e) {
  return typeof e == "object" && e !== null && e.$$typeof === $r;
}
function jf(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Bu = /\/+/g;
function yo(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? jf("" + e.key) : t.toString(36);
}
function ml(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else switch (o) {
    case "string":
    case "number":
      i = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case $r:
        case yf:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + yo(i, 0) : r, Uu(l) ? (n = "", e != null && (n = e.replace(Bu, "$&/") + "/"), ml(l, t, n, "", function(c) {
    return c;
  })) : l != null && (Ai(l) && (l = zf(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Bu, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", Uu(e)) for (var u = 0; u < e.length; u++) {
    o = e[u];
    var s = r + yo(o, u);
    i += ml(o, t, n, s, l);
  }
  else if (s = Tf(e), typeof s == "function") for (e = s.call(e), u = 0; !(o = e.next()).done; ) o = o.value, s = r + yo(o, u++), i += ml(o, t, n, s, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function qr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return ml(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function Rf(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Re = { current: null }, gl = { transition: null }, Mf = { ReactCurrentDispatcher: Re, ReactCurrentBatchConfig: gl, ReactCurrentOwner: $i };
function ua() {
  throw Error("act(...) is not supported in production builds of React.");
}
A.Children = { map: qr, forEach: function(e, t, n) {
  qr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return qr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return qr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Ai(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
A.Component = Jn;
A.Fragment = vf;
A.Profiler = wf;
A.PureComponent = Di;
A.StrictMode = xf;
A.Suspense = Cf;
A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Mf;
A.act = ua;
A.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = ta({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = $i.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var u = e.type.defaultProps;
    for (s in t) la.call(t, s) && !oa.hasOwnProperty(s) && (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    u = Array(s);
    for (var c = 0; c < s; c++) u[c] = arguments[c + 2];
    r.children = u;
  }
  return { $$typeof: $r, type: e.type, key: l, ref: o, props: r, _owner: i };
};
A.createContext = function(e) {
  return e = { $$typeof: kf, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Sf, _context: e }, e.Consumer = e;
};
A.createElement = ia;
A.createFactory = function(e) {
  var t = ia.bind(null, e);
  return t.type = e, t;
};
A.createRef = function() {
  return { current: null };
};
A.forwardRef = function(e) {
  return { $$typeof: Ef, render: e };
};
A.isValidElement = Ai;
A.lazy = function(e) {
  return { $$typeof: Nf, _payload: { _status: -1, _result: e }, _init: Rf };
};
A.memo = function(e, t) {
  return { $$typeof: _f, type: e, compare: t === void 0 ? null : t };
};
A.startTransition = function(e) {
  var t = gl.transition;
  gl.transition = {};
  try {
    e();
  } finally {
    gl.transition = t;
  }
};
A.unstable_act = ua;
A.useCallback = function(e, t) {
  return Re.current.useCallback(e, t);
};
A.useContext = function(e) {
  return Re.current.useContext(e);
};
A.useDebugValue = function() {
};
A.useDeferredValue = function(e) {
  return Re.current.useDeferredValue(e);
};
A.useEffect = function(e, t) {
  return Re.current.useEffect(e, t);
};
A.useId = function() {
  return Re.current.useId();
};
A.useImperativeHandle = function(e, t, n) {
  return Re.current.useImperativeHandle(e, t, n);
};
A.useInsertionEffect = function(e, t) {
  return Re.current.useInsertionEffect(e, t);
};
A.useLayoutEffect = function(e, t) {
  return Re.current.useLayoutEffect(e, t);
};
A.useMemo = function(e, t) {
  return Re.current.useMemo(e, t);
};
A.useReducer = function(e, t, n) {
  return Re.current.useReducer(e, t, n);
};
A.useRef = function(e) {
  return Re.current.useRef(e);
};
A.useState = function(e) {
  return Re.current.useState(e);
};
A.useSyncExternalStore = function(e, t, n) {
  return Re.current.useSyncExternalStore(e, t, n);
};
A.useTransition = function() {
  return Re.current.useTransition();
};
A.version = "18.3.1";
bs.exports = A;
var R = bs.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pf = R, Lf = Symbol.for("react.element"), If = Symbol.for("react.fragment"), Of = Object.prototype.hasOwnProperty, Df = Pf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Ff = { key: !0, ref: !0, __self: !0, __source: !0 };
function sa(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) Of.call(t, r) && !Ff.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Lf, type: e, key: o, ref: i, props: l, _owner: Df.current };
}
Zl.Fragment = If;
Zl.jsx = sa;
Zl.jsxs = sa;
qs.exports = Zl;
var m = qs.exports, aa = { exports: {} }, He = {}, ca = { exports: {} }, fa = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(N, O) {
    var I = N.length;
    N.push(O);
    e: for (; 0 < I; ) {
      var W = I - 1 >>> 1, re = N[W];
      if (0 < l(re, O)) N[W] = O, N[I] = re, I = W;
      else break e;
    }
  }
  function n(N) {
    return N.length === 0 ? null : N[0];
  }
  function r(N) {
    if (N.length === 0) return null;
    var O = N[0], I = N.pop();
    if (I !== O) {
      N[0] = I;
      e: for (var W = 0, re = N.length, et = re >>> 1; W < et; ) {
        var X = 2 * (W + 1) - 1, ye = N[X], zt = X + 1, gt = N[zt];
        if (0 > l(ye, I)) zt < re && 0 > l(gt, ye) ? (N[W] = gt, N[zt] = I, W = zt) : (N[W] = ye, N[X] = I, W = X);
        else if (zt < re && 0 > l(gt, I)) N[W] = gt, N[zt] = I, W = zt;
        else break e;
      }
    }
    return O;
  }
  function l(N, O) {
    var I = N.sortIndex - O.sortIndex;
    return I !== 0 ? I : N.id - O.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var i = Date, u = i.now();
    e.unstable_now = function() {
      return i.now() - u;
    };
  }
  var s = [], c = [], g = 1, p = null, h = 3, w = !1, k = !1, y = !1, D = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, a = typeof setImmediate != "undefined" ? setImmediate : null;
  typeof navigator != "undefined" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function d(N) {
    for (var O = n(c); O !== null; ) {
      if (O.callback === null) r(c);
      else if (O.startTime <= N) r(c), O.sortIndex = O.expirationTime, t(s, O);
      else break;
      O = n(c);
    }
  }
  function v(N) {
    if (y = !1, d(N), !k) if (n(s) !== null) k = !0, be(E);
    else {
      var O = n(c);
      O !== null && Pe(v, O.startTime - N);
    }
  }
  function E(N, O) {
    k = !1, y && (y = !1, f(C), C = -1), w = !0;
    var I = h;
    try {
      for (d(O), p = n(s); p !== null && (!(p.expirationTime > O) || N && !ue()); ) {
        var W = p.callback;
        if (typeof W == "function") {
          p.callback = null, h = p.priorityLevel;
          var re = W(p.expirationTime <= O);
          O = e.unstable_now(), typeof re == "function" ? p.callback = re : p === n(s) && r(s), d(O);
        } else r(s);
        p = n(s);
      }
      if (p !== null) var et = !0;
      else {
        var X = n(c);
        X !== null && Pe(v, X.startTime - O), et = !1;
      }
      return et;
    } finally {
      p = null, h = I, w = !1;
    }
  }
  var z = !1, M = null, C = -1, Q = 5, F = -1;
  function ue() {
    return !(e.unstable_now() - F < Q);
  }
  function qt() {
    if (M !== null) {
      var N = e.unstable_now();
      F = N;
      var O = !0;
      try {
        O = M(!0, N);
      } finally {
        O ? bt() : (z = !1, M = null);
      }
    } else z = !1;
  }
  var bt;
  if (typeof a == "function") bt = function() {
    a(qt);
  };
  else if (typeof MessageChannel != "undefined") {
    var ho = new MessageChannel(), se = ho.port2;
    ho.port1.onmessage = qt, bt = function() {
      se.postMessage(null);
    };
  } else bt = function() {
    D(qt, 0);
  };
  function be(N) {
    M = N, z || (z = !0, bt());
  }
  function Pe(N, O) {
    C = D(function() {
      N(e.unstable_now());
    }, O);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(N) {
    N.callback = null;
  }, e.unstable_continueExecution = function() {
    k || w || (k = !0, be(E));
  }, e.unstable_forceFrameRate = function(N) {
    0 > N || 125 < N ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Q = 0 < N ? Math.floor(1e3 / N) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(s);
  }, e.unstable_next = function(N) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var O = 3;
        break;
      default:
        O = h;
    }
    var I = h;
    h = O;
    try {
      return N();
    } finally {
      h = I;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(N, O) {
    switch (N) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        N = 3;
    }
    var I = h;
    h = N;
    try {
      return O();
    } finally {
      h = I;
    }
  }, e.unstable_scheduleCallback = function(N, O, I) {
    var W = e.unstable_now();
    switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? W + I : W) : I = W, N) {
      case 1:
        var re = -1;
        break;
      case 2:
        re = 250;
        break;
      case 5:
        re = 1073741823;
        break;
      case 4:
        re = 1e4;
        break;
      default:
        re = 5e3;
    }
    return re = I + re, N = { id: g++, callback: O, priorityLevel: N, startTime: I, expirationTime: re, sortIndex: -1 }, I > W ? (N.sortIndex = I, t(c, N), n(s) === null && N === n(c) && (y ? (f(C), C = -1) : y = !0, Pe(v, I - W))) : (N.sortIndex = re, t(s, N), k || w || (k = !0, be(E))), N;
  }, e.unstable_shouldYield = ue, e.unstable_wrapCallback = function(N) {
    var O = h;
    return function() {
      var I = h;
      h = O;
      try {
        return N.apply(this, arguments);
      } finally {
        h = I;
      }
    };
  };
})(fa);
ca.exports = fa;
var $f = ca.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Af = R, We = $f;
function S(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), Sr = {};
function wn(e, t) {
  Hn(e, t), Hn(e + "Capture", t);
}
function Hn(e, t) {
  for (Sr[e] = t, e = 0; e < t.length; e++) da.add(t[e]);
}
var Et = !(typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined"), Vo = Object.prototype.hasOwnProperty, Uf = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Wu = {}, Hu = {};
function Bf(e) {
  return Vo.call(Hu, e) ? !0 : Vo.call(Wu, e) ? !1 : Uf.test(e) ? Hu[e] = !0 : (Wu[e] = !0, !1);
}
function Wf(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Hf(e, t, n, r) {
  if (t === null || typeof t == "undefined" || Wf(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function Me(e, t, n, r, l, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
var Se = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  Se[e] = new Me(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  Se[t] = new Me(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  Se[e] = new Me(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  Se[e] = new Me(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  Se[e] = new Me(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  Se[e] = new Me(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  Se[e] = new Me(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  Se[e] = new Me(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  Se[e] = new Me(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ui = /[\-:]([a-z])/g;
function Bi(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Ui,
    Bi
  );
  Se[t] = new Me(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Ui, Bi);
  Se[t] = new Me(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Ui, Bi);
  Se[t] = new Me(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  Se[e] = new Me(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Se.xlinkHref = new Me("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  Se[e] = new Me(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Wi(e, t, n, r) {
  var l = Se.hasOwnProperty(t) ? Se[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Hf(t, n, l, r) && (n = null), r || l === null ? Bf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Tt = Af.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, br = Symbol.for("react.element"), _n = Symbol.for("react.portal"), Nn = Symbol.for("react.fragment"), Hi = Symbol.for("react.strict_mode"), Qo = Symbol.for("react.profiler"), pa = Symbol.for("react.provider"), ha = Symbol.for("react.context"), Vi = Symbol.for("react.forward_ref"), Ko = Symbol.for("react.suspense"), Xo = Symbol.for("react.suspense_list"), Qi = Symbol.for("react.memo"), Lt = Symbol.for("react.lazy"), ma = Symbol.for("react.offscreen"), Vu = Symbol.iterator;
function er(e) {
  return e === null || typeof e != "object" ? null : (e = Vu && e[Vu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ne = Object.assign, vo;
function sr(e) {
  if (vo === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    vo = t && t[1] || "";
  }
  return `
` + vo + e;
}
var xo = !1;
function wo(e, t) {
  if (!e || xo) return "";
  xo = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (c) {
        var r = c;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (c) {
        r = c;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (var l = c.stack.split(`
`), o = r.stack.split(`
`), i = l.length - 1, u = o.length - 1; 1 <= i && 0 <= u && l[i] !== o[u]; ) u--;
      for (; 1 <= i && 0 <= u; i--, u--) if (l[i] !== o[u]) {
        if (i !== 1 || u !== 1)
          do
            if (i--, u--, 0 > u || l[i] !== o[u]) {
              var s = `
` + l[i].replace(" at new ", " at ");
              return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
            }
          while (1 <= i && 0 <= u);
        break;
      }
    }
  } finally {
    xo = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? sr(e) : "";
}
function Vf(e) {
  switch (e.tag) {
    case 5:
      return sr(e.type);
    case 16:
      return sr("Lazy");
    case 13:
      return sr("Suspense");
    case 19:
      return sr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = wo(e.type, !1), e;
    case 11:
      return e = wo(e.type.render, !1), e;
    case 1:
      return e = wo(e.type, !0), e;
    default:
      return "";
  }
}
function Yo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Nn:
      return "Fragment";
    case _n:
      return "Portal";
    case Qo:
      return "Profiler";
    case Hi:
      return "StrictMode";
    case Ko:
      return "Suspense";
    case Xo:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case ha:
      return (e.displayName || "Context") + ".Consumer";
    case pa:
      return (e._context.displayName || "Context") + ".Provider";
    case Vi:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Qi:
      return t = e.displayName || null, t !== null ? t : Yo(e.type) || "Memo";
    case Lt:
      t = e._payload, e = e._init;
      try {
        return Yo(e(t));
      } catch (n) {
      }
  }
  return null;
}
function Qf(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Yo(t);
    case 8:
      return t === Hi ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Xt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function ga(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Kf(e) {
  var t = ga(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n != "undefined" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, o = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(i) {
      r = "" + i, o.call(this, i);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(i) {
      r = "" + i;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function el(e) {
  e._valueTracker || (e._valueTracker = Kf(e));
}
function ya(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = ga(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Tl(e) {
  if (e = e || (typeof document != "undefined" ? document : void 0), typeof e == "undefined") return null;
  try {
    return e.activeElement || e.body;
  } catch (t) {
    return e.body;
  }
}
function Go(e, t) {
  var n = t.checked;
  return ne({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n != null ? n : e._wrapperState.initialChecked });
}
function Qu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = Xt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function va(e, t) {
  t = t.checked, t != null && Wi(e, "checked", t, !1);
}
function Jo(e, t) {
  va(e, t);
  var n = Xt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Zo(e, t.type, n) : t.hasOwnProperty("defaultValue") && Zo(e, t.type, Xt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Ku(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Zo(e, t, n) {
  (t !== "number" || Tl(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var ar = Array.isArray;
function Fn(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Xt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function qo(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(S(91));
  return ne({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Xu(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(S(92));
      if (ar(n)) {
        if (1 < n.length) throw Error(S(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: Xt(n) };
}
function xa(e, t) {
  var n = Xt(t.value), r = Xt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Yu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function wa(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function bo(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? wa(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var tl, Sa = function(e) {
  return typeof MSApp != "undefined" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (tl = tl || document.createElement("div"), tl.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = tl.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function kr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var dr = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, Xf = ["Webkit", "ms", "Moz", "O"];
Object.keys(dr).forEach(function(e) {
  Xf.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), dr[t] = dr[e];
  });
});
function ka(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || dr.hasOwnProperty(e) && dr[e] ? ("" + t).trim() : t + "px";
}
function Ea(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = ka(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var Yf = ne({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function ei(e, t) {
  if (t) {
    if (Yf[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(S(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(S(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(S(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(S(62));
  }
}
function ti(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var ni = null;
function Ki(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var ri = null, $n = null, An = null;
function Gu(e) {
  if (e = Br(e)) {
    if (typeof ri != "function") throw Error(S(280));
    var t = e.stateNode;
    t && (t = no(t), ri(e.stateNode, e.type, t));
  }
}
function Ca(e) {
  $n ? An ? An.push(e) : An = [e] : $n = e;
}
function _a() {
  if ($n) {
    var e = $n, t = An;
    if (An = $n = null, Gu(e), t) for (e = 0; e < t.length; e++) Gu(t[e]);
  }
}
function Na(e, t) {
  return e(t);
}
function Ta() {
}
var So = !1;
function za(e, t, n) {
  if (So) return e(t, n);
  So = !0;
  try {
    return Na(e, t, n);
  } finally {
    So = !1, ($n !== null || An !== null) && (Ta(), _a());
  }
}
function Er(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = no(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(S(231, t, typeof n));
  return n;
}
var li = !1;
if (Et) try {
  var tr = {};
  Object.defineProperty(tr, "passive", { get: function() {
    li = !0;
  } }), window.addEventListener("test", tr, tr), window.removeEventListener("test", tr, tr);
} catch (e) {
  li = !1;
}
function Gf(e, t, n, r, l, o, i, u, s) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (g) {
    this.onError(g);
  }
}
var pr = !1, zl = null, jl = !1, oi = null, Jf = { onError: function(e) {
  pr = !0, zl = e;
} };
function Zf(e, t, n, r, l, o, i, u, s) {
  pr = !1, zl = null, Gf.apply(Jf, arguments);
}
function qf(e, t, n, r, l, o, i, u, s) {
  if (Zf.apply(this, arguments), pr) {
    if (pr) {
      var c = zl;
      pr = !1, zl = null;
    } else throw Error(S(198));
    jl || (jl = !0, oi = c);
  }
}
function Sn(e) {
  var t = e, n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function ja(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Ju(e) {
  if (Sn(e) !== e) throw Error(S(188));
}
function bf(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Sn(e), t === null) throw Error(S(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (r = l.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === n) return Ju(l), e;
        if (o === r) return Ju(l), t;
        o = o.sibling;
      }
      throw Error(S(188));
    }
    if (n.return !== r.return) n = l, r = o;
    else {
      for (var i = !1, u = l.child; u; ) {
        if (u === n) {
          i = !0, n = l, r = o;
          break;
        }
        if (u === r) {
          i = !0, r = l, n = o;
          break;
        }
        u = u.sibling;
      }
      if (!i) {
        for (u = o.child; u; ) {
          if (u === n) {
            i = !0, n = o, r = l;
            break;
          }
          if (u === r) {
            i = !0, r = o, n = l;
            break;
          }
          u = u.sibling;
        }
        if (!i) throw Error(S(189));
      }
    }
    if (n.alternate !== r) throw Error(S(190));
  }
  if (n.tag !== 3) throw Error(S(188));
  return n.stateNode.current === n ? e : t;
}
function Ra(e) {
  return e = bf(e), e !== null ? Ma(e) : null;
}
function Ma(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ma(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Pa = We.unstable_scheduleCallback, Zu = We.unstable_cancelCallback, ed = We.unstable_shouldYield, td = We.unstable_requestPaint, ie = We.unstable_now, nd = We.unstable_getCurrentPriorityLevel, Xi = We.unstable_ImmediatePriority, La = We.unstable_UserBlockingPriority, Rl = We.unstable_NormalPriority, rd = We.unstable_LowPriority, Ia = We.unstable_IdlePriority, ql = null, ht = null;
function ld(e) {
  if (ht && typeof ht.onCommitFiberRoot == "function") try {
    ht.onCommitFiberRoot(ql, e, void 0, (e.current.flags & 128) === 128);
  } catch (t) {
  }
}
var it = Math.clz32 ? Math.clz32 : ud, od = Math.log, id = Math.LN2;
function ud(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (od(e) / id | 0) | 0;
}
var nl = 64, rl = 4194304;
function cr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Ml(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var u = i & ~l;
    u !== 0 ? r = cr(u) : (o &= i, o !== 0 && (r = cr(o)));
  } else i = n & ~l, i !== 0 ? r = cr(i) : o !== 0 && (r = cr(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - it(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function sd(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function ad(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - it(o), u = 1 << i, s = l[i];
    s === -1 ? (!(u & n) || u & r) && (l[i] = sd(u, t)) : s <= t && (e.expiredLanes |= u), o &= ~u;
  }
}
function ii(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Oa() {
  var e = nl;
  return nl <<= 1, !(nl & 4194240) && (nl = 64), e;
}
function ko(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Ar(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - it(t), e[t] = n;
}
function cd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - it(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function Yi(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - it(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var H = 0;
function Da(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Fa, Gi, $a, Aa, Ua, ui = !1, ll = [], At = null, Ut = null, Bt = null, Cr = /* @__PURE__ */ new Map(), _r = /* @__PURE__ */ new Map(), Ot = [], fd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function qu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      At = null;
      break;
    case "dragenter":
    case "dragleave":
      Ut = null;
      break;
    case "mouseover":
    case "mouseout":
      Bt = null;
      break;
    case "pointerover":
    case "pointerout":
      Cr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      _r.delete(t.pointerId);
  }
}
function nr(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = Br(t), t !== null && Gi(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function dd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return At = nr(At, e, t, n, r, l), !0;
    case "dragenter":
      return Ut = nr(Ut, e, t, n, r, l), !0;
    case "mouseover":
      return Bt = nr(Bt, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Cr.set(o, nr(Cr.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, _r.set(o, nr(_r.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Ba(e) {
  var t = cn(e.target);
  if (t !== null) {
    var n = Sn(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = ja(n), t !== null) {
          e.blockedOn = t, Ua(e.priority, function() {
            $a(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function yl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = si(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ni = r, n.target.dispatchEvent(r), ni = null;
    } else return t = Br(n), t !== null && Gi(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function bu(e, t, n) {
  yl(e) && n.delete(t);
}
function pd() {
  ui = !1, At !== null && yl(At) && (At = null), Ut !== null && yl(Ut) && (Ut = null), Bt !== null && yl(Bt) && (Bt = null), Cr.forEach(bu), _r.forEach(bu);
}
function rr(e, t) {
  e.blockedOn === t && (e.blockedOn = null, ui || (ui = !0, We.unstable_scheduleCallback(We.unstable_NormalPriority, pd)));
}
function Nr(e) {
  function t(l) {
    return rr(l, e);
  }
  if (0 < ll.length) {
    rr(ll[0], e);
    for (var n = 1; n < ll.length; n++) {
      var r = ll[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (At !== null && rr(At, e), Ut !== null && rr(Ut, e), Bt !== null && rr(Bt, e), Cr.forEach(t), _r.forEach(t), n = 0; n < Ot.length; n++) r = Ot[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Ot.length && (n = Ot[0], n.blockedOn === null); ) Ba(n), n.blockedOn === null && Ot.shift();
}
var Un = Tt.ReactCurrentBatchConfig, Pl = !0;
function hd(e, t, n, r) {
  var l = H, o = Un.transition;
  Un.transition = null;
  try {
    H = 1, Ji(e, t, n, r);
  } finally {
    H = l, Un.transition = o;
  }
}
function md(e, t, n, r) {
  var l = H, o = Un.transition;
  Un.transition = null;
  try {
    H = 4, Ji(e, t, n, r);
  } finally {
    H = l, Un.transition = o;
  }
}
function Ji(e, t, n, r) {
  if (Pl) {
    var l = si(e, t, n, r);
    if (l === null) Po(e, t, r, Ll, n), qu(e, r);
    else if (dd(l, e, t, n, r)) r.stopPropagation();
    else if (qu(e, r), t & 4 && -1 < fd.indexOf(e)) {
      for (; l !== null; ) {
        var o = Br(l);
        if (o !== null && Fa(o), o = si(e, t, n, r), o === null && Po(e, t, r, Ll, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Po(e, t, r, null, n);
  }
}
var Ll = null;
function si(e, t, n, r) {
  if (Ll = null, e = Ki(r), e = cn(e), e !== null) if (t = Sn(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = ja(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Ll = e, null;
}
function Wa(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (nd()) {
        case Xi:
          return 1;
        case La:
          return 4;
        case Rl:
        case rd:
          return 16;
        case Ia:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Ft = null, Zi = null, vl = null;
function Ha() {
  if (vl) return vl;
  var e, t = Zi, n = t.length, r, l = "value" in Ft ? Ft.value : Ft.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return vl = l.slice(e, 1 < r ? 1 - r : void 0);
}
function xl(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function ol() {
  return !0;
}
function es() {
  return !1;
}
function Ve(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var u in e) e.hasOwnProperty(u) && (n = e[u], this[u] = n ? n(o) : o[u]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? ol : es, this.isPropagationStopped = es, this;
  }
  return ne(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = ol);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = ol);
  }, persist: function() {
  }, isPersistent: ol }), t;
}
var Zn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, qi = Ve(Zn), Ur = ne({}, Zn, { view: 0, detail: 0 }), gd = Ve(Ur), Eo, Co, lr, bl = ne({}, Ur, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: bi, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== lr && (lr && e.type === "mousemove" ? (Eo = e.screenX - lr.screenX, Co = e.screenY - lr.screenY) : Co = Eo = 0, lr = e), Eo);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Co;
} }), ts = Ve(bl), yd = ne({}, bl, { dataTransfer: 0 }), vd = Ve(yd), xd = ne({}, Ur, { relatedTarget: 0 }), _o = Ve(xd), wd = ne({}, Zn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Sd = Ve(wd), kd = ne({}, Zn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Ed = Ve(kd), Cd = ne({}, Zn, { data: 0 }), ns = Ve(Cd), _d = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Td = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function zd(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Td[e]) ? !!t[e] : !1;
}
function bi() {
  return zd;
}
var jd = ne({}, Ur, { key: function(e) {
  if (e.key) {
    var t = _d[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = xl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Nd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: bi, charCode: function(e) {
  return e.type === "keypress" ? xl(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? xl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Rd = Ve(jd), Md = ne({}, bl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), rs = Ve(Md), Pd = ne({}, Ur, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: bi }), Ld = Ve(Pd), Id = ne({}, Zn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Od = Ve(Id), Dd = ne({}, bl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Fd = Ve(Dd), $d = [9, 13, 27, 32], eu = Et && "CompositionEvent" in window, hr = null;
Et && "documentMode" in document && (hr = document.documentMode);
var Ad = Et && "TextEvent" in window && !hr, Va = Et && (!eu || hr && 8 < hr && 11 >= hr), ls = " ", os = !1;
function Qa(e, t) {
  switch (e) {
    case "keyup":
      return $d.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Ka(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Tn = !1;
function Ud(e, t) {
  switch (e) {
    case "compositionend":
      return Ka(t);
    case "keypress":
      return t.which !== 32 ? null : (os = !0, ls);
    case "textInput":
      return e = t.data, e === ls && os ? null : e;
    default:
      return null;
  }
}
function Bd(e, t) {
  if (Tn) return e === "compositionend" || !eu && Qa(e, t) ? (e = Ha(), vl = Zi = Ft = null, Tn = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Va && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Wd = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function is(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Wd[e.type] : t === "textarea";
}
function Xa(e, t, n, r) {
  Ca(r), t = Il(t, "onChange"), 0 < t.length && (n = new qi("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var mr = null, Tr = null;
function Hd(e) {
  lc(e, 0);
}
function eo(e) {
  var t = Rn(e);
  if (ya(t)) return e;
}
function Vd(e, t) {
  if (e === "change") return t;
}
var Ya = !1;
if (Et) {
  var No;
  if (Et) {
    var To = "oninput" in document;
    if (!To) {
      var us = document.createElement("div");
      us.setAttribute("oninput", "return;"), To = typeof us.oninput == "function";
    }
    No = To;
  } else No = !1;
  Ya = No && (!document.documentMode || 9 < document.documentMode);
}
function ss() {
  mr && (mr.detachEvent("onpropertychange", Ga), Tr = mr = null);
}
function Ga(e) {
  if (e.propertyName === "value" && eo(Tr)) {
    var t = [];
    Xa(t, Tr, e, Ki(e)), za(Hd, t);
  }
}
function Qd(e, t, n) {
  e === "focusin" ? (ss(), mr = t, Tr = n, mr.attachEvent("onpropertychange", Ga)) : e === "focusout" && ss();
}
function Kd(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return eo(Tr);
}
function Xd(e, t) {
  if (e === "click") return eo(t);
}
function Yd(e, t) {
  if (e === "input" || e === "change") return eo(t);
}
function Gd(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var st = typeof Object.is == "function" ? Object.is : Gd;
function zr(e, t) {
  if (st(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Vo.call(t, l) || !st(e[l], t[l])) return !1;
  }
  return !0;
}
function as(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function cs(e, t) {
  var n = as(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = as(n);
  }
}
function Ja(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Ja(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Za() {
  for (var e = window, t = Tl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch (r) {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Tl(e.document);
  }
  return t;
}
function tu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Jd(e) {
  var t = Za(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Ja(n.ownerDocument.documentElement, n)) {
    if (r !== null && tu(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = cs(n, o);
        var i = cs(
          n,
          r
        );
        l && i && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Zd = Et && "documentMode" in document && 11 >= document.documentMode, zn = null, ai = null, gr = null, ci = !1;
function fs(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  ci || zn == null || zn !== Tl(r) || (r = zn, "selectionStart" in r && tu(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), gr && zr(gr, r) || (gr = r, r = Il(ai, "onSelect"), 0 < r.length && (t = new qi("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = zn)));
}
function il(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var jn = { animationend: il("Animation", "AnimationEnd"), animationiteration: il("Animation", "AnimationIteration"), animationstart: il("Animation", "AnimationStart"), transitionend: il("Transition", "TransitionEnd") }, zo = {}, qa = {};
Et && (qa = document.createElement("div").style, "AnimationEvent" in window || (delete jn.animationend.animation, delete jn.animationiteration.animation, delete jn.animationstart.animation), "TransitionEvent" in window || delete jn.transitionend.transition);
function to(e) {
  if (zo[e]) return zo[e];
  if (!jn[e]) return e;
  var t = jn[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in qa) return zo[e] = t[n];
  return e;
}
var ba = to("animationend"), ec = to("animationiteration"), tc = to("animationstart"), nc = to("transitionend"), rc = /* @__PURE__ */ new Map(), ds = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Gt(e, t) {
  rc.set(e, t), wn(t, [e]);
}
for (var jo = 0; jo < ds.length; jo++) {
  var Ro = ds[jo], qd = Ro.toLowerCase(), bd = Ro[0].toUpperCase() + Ro.slice(1);
  Gt(qd, "on" + bd);
}
Gt(ba, "onAnimationEnd");
Gt(ec, "onAnimationIteration");
Gt(tc, "onAnimationStart");
Gt("dblclick", "onDoubleClick");
Gt("focusin", "onFocus");
Gt("focusout", "onBlur");
Gt(nc, "onTransitionEnd");
Hn("onMouseEnter", ["mouseout", "mouseover"]);
Hn("onMouseLeave", ["mouseout", "mouseover"]);
Hn("onPointerEnter", ["pointerout", "pointerover"]);
Hn("onPointerLeave", ["pointerout", "pointerover"]);
wn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
wn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
wn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
wn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
wn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
wn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var fr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), ep = new Set("cancel close invalid load scroll toggle".split(" ").concat(fr));
function ps(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, qf(r, t, void 0, e), e.currentTarget = null;
}
function lc(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var u = r[i], s = u.instance, c = u.currentTarget;
        if (u = u.listener, s !== o && l.isPropagationStopped()) break e;
        ps(l, u, c), o = s;
      }
      else for (i = 0; i < r.length; i++) {
        if (u = r[i], s = u.instance, c = u.currentTarget, u = u.listener, s !== o && l.isPropagationStopped()) break e;
        ps(l, u, c), o = s;
      }
    }
  }
  if (jl) throw e = oi, jl = !1, oi = null, e;
}
function Z(e, t) {
  var n = t[mi];
  n === void 0 && (n = t[mi] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (oc(t, e, 2, !1), n.add(r));
}
function Mo(e, t, n) {
  var r = 0;
  t && (r |= 4), oc(n, e, r, t);
}
var ul = "_reactListening" + Math.random().toString(36).slice(2);
function jr(e) {
  if (!e[ul]) {
    e[ul] = !0, da.forEach(function(n) {
      n !== "selectionchange" && (ep.has(n) || Mo(n, !1, e), Mo(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[ul] || (t[ul] = !0, Mo("selectionchange", !1, t));
  }
}
function oc(e, t, n, r) {
  switch (Wa(t)) {
    case 1:
      var l = hd;
      break;
    case 4:
      l = md;
      break;
    default:
      l = Ji;
  }
  n = l.bind(null, t, n, e), l = void 0, !li || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Po(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var i = r.tag;
    if (i === 3 || i === 4) {
      var u = r.stateNode.containerInfo;
      if (u === l || u.nodeType === 8 && u.parentNode === l) break;
      if (i === 4) for (i = r.return; i !== null; ) {
        var s = i.tag;
        if ((s === 3 || s === 4) && (s = i.stateNode.containerInfo, s === l || s.nodeType === 8 && s.parentNode === l)) return;
        i = i.return;
      }
      for (; u !== null; ) {
        if (i = cn(u), i === null) return;
        if (s = i.tag, s === 5 || s === 6) {
          r = o = i;
          continue e;
        }
        u = u.parentNode;
      }
    }
    r = r.return;
  }
  za(function() {
    var c = o, g = Ki(n), p = [];
    e: {
      var h = rc.get(e);
      if (h !== void 0) {
        var w = qi, k = e;
        switch (e) {
          case "keypress":
            if (xl(n) === 0) break e;
          case "keydown":
          case "keyup":
            w = Rd;
            break;
          case "focusin":
            k = "focus", w = _o;
            break;
          case "focusout":
            k = "blur", w = _o;
            break;
          case "beforeblur":
          case "afterblur":
            w = _o;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            w = ts;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = vd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = Ld;
            break;
          case ba:
          case ec:
          case tc:
            w = Sd;
            break;
          case nc:
            w = Od;
            break;
          case "scroll":
            w = gd;
            break;
          case "wheel":
            w = Fd;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = Ed;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = rs;
        }
        var y = (t & 4) !== 0, D = !y && e === "scroll", f = y ? h !== null ? h + "Capture" : null : h;
        y = [];
        for (var a = c, d; a !== null; ) {
          d = a;
          var v = d.stateNode;
          if (d.tag === 5 && v !== null && (d = v, f !== null && (v = Er(a, f), v != null && y.push(Rr(a, v, d)))), D) break;
          a = a.return;
        }
        0 < y.length && (h = new w(h, k, null, n, g), p.push({ event: h, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", w = e === "mouseout" || e === "pointerout", h && n !== ni && (k = n.relatedTarget || n.fromElement) && (cn(k) || k[Ct])) break e;
        if ((w || h) && (h = g.window === g ? g : (h = g.ownerDocument) ? h.defaultView || h.parentWindow : window, w ? (k = n.relatedTarget || n.toElement, w = c, k = k ? cn(k) : null, k !== null && (D = Sn(k), k !== D || k.tag !== 5 && k.tag !== 6) && (k = null)) : (w = null, k = c), w !== k)) {
          if (y = ts, v = "onMouseLeave", f = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (y = rs, v = "onPointerLeave", f = "onPointerEnter", a = "pointer"), D = w == null ? h : Rn(w), d = k == null ? h : Rn(k), h = new y(v, a + "leave", w, n, g), h.target = D, h.relatedTarget = d, v = null, cn(g) === c && (y = new y(f, a + "enter", k, n, g), y.target = d, y.relatedTarget = D, v = y), D = v, w && k) t: {
            for (y = w, f = k, a = 0, d = y; d; d = Cn(d)) a++;
            for (d = 0, v = f; v; v = Cn(v)) d++;
            for (; 0 < a - d; ) y = Cn(y), a--;
            for (; 0 < d - a; ) f = Cn(f), d--;
            for (; a--; ) {
              if (y === f || f !== null && y === f.alternate) break t;
              y = Cn(y), f = Cn(f);
            }
            y = null;
          }
          else y = null;
          w !== null && hs(p, h, w, y, !1), k !== null && D !== null && hs(p, D, k, y, !0);
        }
      }
      e: {
        if (h = c ? Rn(c) : window, w = h.nodeName && h.nodeName.toLowerCase(), w === "select" || w === "input" && h.type === "file") var E = Vd;
        else if (is(h)) if (Ya) E = Yd;
        else {
          E = Kd;
          var z = Qd;
        }
        else (w = h.nodeName) && w.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (E = Xd);
        if (E && (E = E(e, c))) {
          Xa(p, E, n, g);
          break e;
        }
        z && z(e, h, c), e === "focusout" && (z = h._wrapperState) && z.controlled && h.type === "number" && Zo(h, "number", h.value);
      }
      switch (z = c ? Rn(c) : window, e) {
        case "focusin":
          (is(z) || z.contentEditable === "true") && (zn = z, ai = c, gr = null);
          break;
        case "focusout":
          gr = ai = zn = null;
          break;
        case "mousedown":
          ci = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ci = !1, fs(p, n, g);
          break;
        case "selectionchange":
          if (Zd) break;
        case "keydown":
        case "keyup":
          fs(p, n, g);
      }
      var M;
      if (eu) e: {
        switch (e) {
          case "compositionstart":
            var C = "onCompositionStart";
            break e;
          case "compositionend":
            C = "onCompositionEnd";
            break e;
          case "compositionupdate":
            C = "onCompositionUpdate";
            break e;
        }
        C = void 0;
      }
      else Tn ? Qa(e, n) && (C = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (C = "onCompositionStart");
      C && (Va && n.locale !== "ko" && (Tn || C !== "onCompositionStart" ? C === "onCompositionEnd" && Tn && (M = Ha()) : (Ft = g, Zi = "value" in Ft ? Ft.value : Ft.textContent, Tn = !0)), z = Il(c, C), 0 < z.length && (C = new ns(C, e, null, n, g), p.push({ event: C, listeners: z }), M ? C.data = M : (M = Ka(n), M !== null && (C.data = M)))), (M = Ad ? Ud(e, n) : Bd(e, n)) && (c = Il(c, "onBeforeInput"), 0 < c.length && (g = new ns("onBeforeInput", "beforeinput", null, n, g), p.push({ event: g, listeners: c }), g.data = M));
    }
    lc(p, t);
  });
}
function Rr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Il(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Er(e, n), o != null && r.unshift(Rr(e, o, l)), o = Er(e, t), o != null && r.push(Rr(e, o, l))), e = e.return;
  }
  return r;
}
function Cn(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function hs(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var u = n, s = u.alternate, c = u.stateNode;
    if (s !== null && s === r) break;
    u.tag === 5 && c !== null && (u = c, l ? (s = Er(n, o), s != null && i.unshift(Rr(n, s, u))) : l || (s = Er(n, o), s != null && i.push(Rr(n, s, u)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var tp = /\r\n?/g, np = /\u0000|\uFFFD/g;
function ms(e) {
  return (typeof e == "string" ? e : "" + e).replace(tp, `
`).replace(np, "");
}
function sl(e, t, n) {
  if (t = ms(t), ms(e) !== t && n) throw Error(S(425));
}
function Ol() {
}
var fi = null, di = null;
function pi(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var hi = typeof setTimeout == "function" ? setTimeout : void 0, rp = typeof clearTimeout == "function" ? clearTimeout : void 0, gs = typeof Promise == "function" ? Promise : void 0, lp = typeof queueMicrotask == "function" ? queueMicrotask : typeof gs != "undefined" ? function(e) {
  return gs.resolve(null).then(e).catch(op);
} : hi;
function op(e) {
  setTimeout(function() {
    throw e;
  });
}
function Lo(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Nr(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Nr(t);
}
function Wt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function ys(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var qn = Math.random().toString(36).slice(2), pt = "__reactFiber$" + qn, Mr = "__reactProps$" + qn, Ct = "__reactContainer$" + qn, mi = "__reactEvents$" + qn, ip = "__reactListeners$" + qn, up = "__reactHandles$" + qn;
function cn(e) {
  var t = e[pt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Ct] || n[pt]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ys(e); e !== null; ) {
        if (n = e[pt]) return n;
        e = ys(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Br(e) {
  return e = e[pt] || e[Ct], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Rn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(S(33));
}
function no(e) {
  return e[Mr] || null;
}
var gi = [], Mn = -1;
function Jt(e) {
  return { current: e };
}
function q(e) {
  0 > Mn || (e.current = gi[Mn], gi[Mn] = null, Mn--);
}
function K(e, t) {
  Mn++, gi[Mn] = e.current, e.current = t;
}
var Yt = {}, _e = Jt(Yt), Oe = Jt(!1), mn = Yt;
function Vn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Yt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function De(e) {
  return e = e.childContextTypes, e != null;
}
function Dl() {
  q(Oe), q(_e);
}
function vs(e, t, n) {
  if (_e.current !== Yt) throw Error(S(168));
  K(_e, t), K(Oe, n);
}
function ic(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(S(108, Qf(e) || "Unknown", l));
  return ne({}, n, r);
}
function Fl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Yt, mn = _e.current, K(_e, e), K(Oe, Oe.current), !0;
}
function xs(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(S(169));
  n ? (e = ic(e, t, mn), r.__reactInternalMemoizedMergedChildContext = e, q(Oe), q(_e), K(_e, e)) : q(Oe), K(Oe, n);
}
var xt = null, ro = !1, Io = !1;
function uc(e) {
  xt === null ? xt = [e] : xt.push(e);
}
function sp(e) {
  ro = !0, uc(e);
}
function Zt() {
  if (!Io && xt !== null) {
    Io = !0;
    var e = 0, t = H;
    try {
      var n = xt;
      for (H = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      xt = null, ro = !1;
    } catch (l) {
      throw xt !== null && (xt = xt.slice(e + 1)), Pa(Xi, Zt), l;
    } finally {
      H = t, Io = !1;
    }
  }
  return null;
}
var Pn = [], Ln = 0, $l = null, Al = 0, Xe = [], Ye = 0, gn = null, wt = 1, St = "";
function un(e, t) {
  Pn[Ln++] = Al, Pn[Ln++] = $l, $l = e, Al = t;
}
function sc(e, t, n) {
  Xe[Ye++] = wt, Xe[Ye++] = St, Xe[Ye++] = gn, gn = e;
  var r = wt;
  e = St;
  var l = 32 - it(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - it(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, wt = 1 << 32 - it(t) + l | n << l | r, St = o + e;
  } else wt = 1 << o | n << l | r, St = e;
}
function nu(e) {
  e.return !== null && (un(e, 1), sc(e, 1, 0));
}
function ru(e) {
  for (; e === $l; ) $l = Pn[--Ln], Pn[Ln] = null, Al = Pn[--Ln], Pn[Ln] = null;
  for (; e === gn; ) gn = Xe[--Ye], Xe[Ye] = null, St = Xe[--Ye], Xe[Ye] = null, wt = Xe[--Ye], Xe[Ye] = null;
}
var Be = null, Ue = null, b = !1, ot = null;
function ac(e, t) {
  var n = Ge(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function ws(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Be = e, Ue = Wt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Be = e, Ue = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = gn !== null ? { id: wt, overflow: St } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ge(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Be = e, Ue = null, !0) : !1;
    default:
      return !1;
  }
}
function yi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function vi(e) {
  if (b) {
    var t = Ue;
    if (t) {
      var n = t;
      if (!ws(e, t)) {
        if (yi(e)) throw Error(S(418));
        t = Wt(n.nextSibling);
        var r = Be;
        t && ws(e, t) ? ac(r, n) : (e.flags = e.flags & -4097 | 2, b = !1, Be = e);
      }
    } else {
      if (yi(e)) throw Error(S(418));
      e.flags = e.flags & -4097 | 2, b = !1, Be = e;
    }
  }
}
function Ss(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Be = e;
}
function al(e) {
  if (e !== Be) return !1;
  if (!b) return Ss(e), b = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !pi(e.type, e.memoizedProps)), t && (t = Ue)) {
    if (yi(e)) throw cc(), Error(S(418));
    for (; t; ) ac(e, t), t = Wt(t.nextSibling);
  }
  if (Ss(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(S(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ue = Wt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Ue = null;
    }
  } else Ue = Be ? Wt(e.stateNode.nextSibling) : null;
  return !0;
}
function cc() {
  for (var e = Ue; e; ) e = Wt(e.nextSibling);
}
function Qn() {
  Ue = Be = null, b = !1;
}
function lu(e) {
  ot === null ? ot = [e] : ot.push(e);
}
var ap = Tt.ReactCurrentBatchConfig;
function or(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(S(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(S(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var u = l.refs;
        i === null ? delete u[o] : u[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(S(284));
    if (!n._owner) throw Error(S(290, e));
  }
  return e;
}
function cl(e, t) {
  throw e = Object.prototype.toString.call(t), Error(S(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function ks(e) {
  var t = e._init;
  return t(e._payload);
}
function fc(e) {
  function t(f, a) {
    if (e) {
      var d = f.deletions;
      d === null ? (f.deletions = [a], f.flags |= 16) : d.push(a);
    }
  }
  function n(f, a) {
    if (!e) return null;
    for (; a !== null; ) t(f, a), a = a.sibling;
    return null;
  }
  function r(f, a) {
    for (f = /* @__PURE__ */ new Map(); a !== null; ) a.key !== null ? f.set(a.key, a) : f.set(a.index, a), a = a.sibling;
    return f;
  }
  function l(f, a) {
    return f = Kt(f, a), f.index = 0, f.sibling = null, f;
  }
  function o(f, a, d) {
    return f.index = d, e ? (d = f.alternate, d !== null ? (d = d.index, d < a ? (f.flags |= 2, a) : d) : (f.flags |= 2, a)) : (f.flags |= 1048576, a);
  }
  function i(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function u(f, a, d, v) {
    return a === null || a.tag !== 6 ? (a = Bo(d, f.mode, v), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function s(f, a, d, v) {
    var E = d.type;
    return E === Nn ? g(f, a, d.props.children, v, d.key) : a !== null && (a.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Lt && ks(E) === a.type) ? (v = l(a, d.props), v.ref = or(f, a, d), v.return = f, v) : (v = Nl(d.type, d.key, d.props, null, f.mode, v), v.ref = or(f, a, d), v.return = f, v);
  }
  function c(f, a, d, v) {
    return a === null || a.tag !== 4 || a.stateNode.containerInfo !== d.containerInfo || a.stateNode.implementation !== d.implementation ? (a = Wo(d, f.mode, v), a.return = f, a) : (a = l(a, d.children || []), a.return = f, a);
  }
  function g(f, a, d, v, E) {
    return a === null || a.tag !== 7 ? (a = hn(d, f.mode, v, E), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function p(f, a, d) {
    if (typeof a == "string" && a !== "" || typeof a == "number") return a = Bo("" + a, f.mode, d), a.return = f, a;
    if (typeof a == "object" && a !== null) {
      switch (a.$$typeof) {
        case br:
          return d = Nl(a.type, a.key, a.props, null, f.mode, d), d.ref = or(f, null, a), d.return = f, d;
        case _n:
          return a = Wo(a, f.mode, d), a.return = f, a;
        case Lt:
          var v = a._init;
          return p(f, v(a._payload), d);
      }
      if (ar(a) || er(a)) return a = hn(a, f.mode, d, null), a.return = f, a;
      cl(f, a);
    }
    return null;
  }
  function h(f, a, d, v) {
    var E = a !== null ? a.key : null;
    if (typeof d == "string" && d !== "" || typeof d == "number") return E !== null ? null : u(f, a, "" + d, v);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case br:
          return d.key === E ? s(f, a, d, v) : null;
        case _n:
          return d.key === E ? c(f, a, d, v) : null;
        case Lt:
          return E = d._init, h(
            f,
            a,
            E(d._payload),
            v
          );
      }
      if (ar(d) || er(d)) return E !== null ? null : g(f, a, d, v, null);
      cl(f, d);
    }
    return null;
  }
  function w(f, a, d, v, E) {
    if (typeof v == "string" && v !== "" || typeof v == "number") return f = f.get(d) || null, u(a, f, "" + v, E);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case br:
          return f = f.get(v.key === null ? d : v.key) || null, s(a, f, v, E);
        case _n:
          return f = f.get(v.key === null ? d : v.key) || null, c(a, f, v, E);
        case Lt:
          var z = v._init;
          return w(f, a, d, z(v._payload), E);
      }
      if (ar(v) || er(v)) return f = f.get(d) || null, g(a, f, v, E, null);
      cl(a, v);
    }
    return null;
  }
  function k(f, a, d, v) {
    for (var E = null, z = null, M = a, C = a = 0, Q = null; M !== null && C < d.length; C++) {
      M.index > C ? (Q = M, M = null) : Q = M.sibling;
      var F = h(f, M, d[C], v);
      if (F === null) {
        M === null && (M = Q);
        break;
      }
      e && M && F.alternate === null && t(f, M), a = o(F, a, C), z === null ? E = F : z.sibling = F, z = F, M = Q;
    }
    if (C === d.length) return n(f, M), b && un(f, C), E;
    if (M === null) {
      for (; C < d.length; C++) M = p(f, d[C], v), M !== null && (a = o(M, a, C), z === null ? E = M : z.sibling = M, z = M);
      return b && un(f, C), E;
    }
    for (M = r(f, M); C < d.length; C++) Q = w(M, f, C, d[C], v), Q !== null && (e && Q.alternate !== null && M.delete(Q.key === null ? C : Q.key), a = o(Q, a, C), z === null ? E = Q : z.sibling = Q, z = Q);
    return e && M.forEach(function(ue) {
      return t(f, ue);
    }), b && un(f, C), E;
  }
  function y(f, a, d, v) {
    var E = er(d);
    if (typeof E != "function") throw Error(S(150));
    if (d = E.call(d), d == null) throw Error(S(151));
    for (var z = E = null, M = a, C = a = 0, Q = null, F = d.next(); M !== null && !F.done; C++, F = d.next()) {
      M.index > C ? (Q = M, M = null) : Q = M.sibling;
      var ue = h(f, M, F.value, v);
      if (ue === null) {
        M === null && (M = Q);
        break;
      }
      e && M && ue.alternate === null && t(f, M), a = o(ue, a, C), z === null ? E = ue : z.sibling = ue, z = ue, M = Q;
    }
    if (F.done) return n(
      f,
      M
    ), b && un(f, C), E;
    if (M === null) {
      for (; !F.done; C++, F = d.next()) F = p(f, F.value, v), F !== null && (a = o(F, a, C), z === null ? E = F : z.sibling = F, z = F);
      return b && un(f, C), E;
    }
    for (M = r(f, M); !F.done; C++, F = d.next()) F = w(M, f, C, F.value, v), F !== null && (e && F.alternate !== null && M.delete(F.key === null ? C : F.key), a = o(F, a, C), z === null ? E = F : z.sibling = F, z = F);
    return e && M.forEach(function(qt) {
      return t(f, qt);
    }), b && un(f, C), E;
  }
  function D(f, a, d, v) {
    if (typeof d == "object" && d !== null && d.type === Nn && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case br:
          e: {
            for (var E = d.key, z = a; z !== null; ) {
              if (z.key === E) {
                if (E = d.type, E === Nn) {
                  if (z.tag === 7) {
                    n(f, z.sibling), a = l(z, d.props.children), a.return = f, f = a;
                    break e;
                  }
                } else if (z.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Lt && ks(E) === z.type) {
                  n(f, z.sibling), a = l(z, d.props), a.ref = or(f, z, d), a.return = f, f = a;
                  break e;
                }
                n(f, z);
                break;
              } else t(f, z);
              z = z.sibling;
            }
            d.type === Nn ? (a = hn(d.props.children, f.mode, v, d.key), a.return = f, f = a) : (v = Nl(d.type, d.key, d.props, null, f.mode, v), v.ref = or(f, a, d), v.return = f, f = v);
          }
          return i(f);
        case _n:
          e: {
            for (z = d.key; a !== null; ) {
              if (a.key === z) if (a.tag === 4 && a.stateNode.containerInfo === d.containerInfo && a.stateNode.implementation === d.implementation) {
                n(f, a.sibling), a = l(a, d.children || []), a.return = f, f = a;
                break e;
              } else {
                n(f, a);
                break;
              }
              else t(f, a);
              a = a.sibling;
            }
            a = Wo(d, f.mode, v), a.return = f, f = a;
          }
          return i(f);
        case Lt:
          return z = d._init, D(f, a, z(d._payload), v);
      }
      if (ar(d)) return k(f, a, d, v);
      if (er(d)) return y(f, a, d, v);
      cl(f, d);
    }
    return typeof d == "string" && d !== "" || typeof d == "number" ? (d = "" + d, a !== null && a.tag === 6 ? (n(f, a.sibling), a = l(a, d), a.return = f, f = a) : (n(f, a), a = Bo(d, f.mode, v), a.return = f, f = a), i(f)) : n(f, a);
  }
  return D;
}
var Kn = fc(!0), dc = fc(!1), Ul = Jt(null), Bl = null, In = null, ou = null;
function iu() {
  ou = In = Bl = null;
}
function uu(e) {
  var t = Ul.current;
  q(Ul), e._currentValue = t;
}
function xi(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Bn(e, t) {
  Bl = e, ou = In = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Ie = !0), e.firstContext = null);
}
function Ze(e) {
  var t = e._currentValue;
  if (ou !== e) if (e = { context: e, memoizedValue: t, next: null }, In === null) {
    if (Bl === null) throw Error(S(308));
    In = e, Bl.dependencies = { lanes: 0, firstContext: e };
  } else In = In.next = e;
  return t;
}
var fn = null;
function su(e) {
  fn === null ? fn = [e] : fn.push(e);
}
function pc(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, su(t)) : (n.next = l.next, l.next = n), t.interleaved = n, _t(e, r);
}
function _t(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var It = !1;
function au(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function hc(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function kt(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Ht(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, B & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, _t(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, su(r)) : (t.next = l.next, l.next = t), r.interleaved = t, _t(e, n);
}
function wl(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Yi(e, n);
  }
}
function Es(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, o = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var i = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        o === null ? l = o = i : o = o.next = i, n = n.next;
      } while (n !== null);
      o === null ? l = o = t : o = o.next = t;
    } else l = o = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function Wl(e, t, n, r) {
  var l = e.updateQueue;
  It = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var s = u, c = s.next;
    s.next = null, i === null ? o = c : i.next = c, i = s;
    var g = e.alternate;
    g !== null && (g = g.updateQueue, u = g.lastBaseUpdate, u !== i && (u === null ? g.firstBaseUpdate = c : u.next = c, g.lastBaseUpdate = s));
  }
  if (o !== null) {
    var p = l.baseState;
    i = 0, g = c = s = null, u = o;
    do {
      var h = u.lane, w = u.eventTime;
      if ((r & h) === h) {
        g !== null && (g = g.next = {
          eventTime: w,
          lane: 0,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null
        });
        e: {
          var k = e, y = u;
          switch (h = t, w = n, y.tag) {
            case 1:
              if (k = y.payload, typeof k == "function") {
                p = k.call(w, p, h);
                break e;
              }
              p = k;
              break e;
            case 3:
              k.flags = k.flags & -65537 | 128;
            case 0:
              if (k = y.payload, h = typeof k == "function" ? k.call(w, p, h) : k, h == null) break e;
              p = ne({}, p, h);
              break e;
            case 2:
              It = !0;
          }
        }
        u.callback !== null && u.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [u] : h.push(u));
      } else w = { eventTime: w, lane: h, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, g === null ? (c = g = w, s = p) : g = g.next = w, i |= h;
      if (u = u.next, u === null) {
        if (u = l.shared.pending, u === null) break;
        h = u, u = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (g === null && (s = p), l.baseState = s, l.firstBaseUpdate = c, l.lastBaseUpdate = g, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    vn |= i, e.lanes = i, e.memoizedState = p;
  }
}
function Cs(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(S(191, l));
      l.call(r);
    }
  }
}
var Wr = {}, mt = Jt(Wr), Pr = Jt(Wr), Lr = Jt(Wr);
function dn(e) {
  if (e === Wr) throw Error(S(174));
  return e;
}
function cu(e, t) {
  switch (K(Lr, t), K(Pr, e), K(mt, Wr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : bo(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = bo(t, e);
  }
  q(mt), K(mt, t);
}
function Xn() {
  q(mt), q(Pr), q(Lr);
}
function mc(e) {
  dn(Lr.current);
  var t = dn(mt.current), n = bo(t, e.type);
  t !== n && (K(Pr, e), K(mt, n));
}
function fu(e) {
  Pr.current === e && (q(mt), q(Pr));
}
var ee = Jt(0);
function Hl(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var Oo = [];
function du() {
  for (var e = 0; e < Oo.length; e++) Oo[e]._workInProgressVersionPrimary = null;
  Oo.length = 0;
}
var Sl = Tt.ReactCurrentDispatcher, Do = Tt.ReactCurrentBatchConfig, yn = 0, te = null, de = null, me = null, Vl = !1, yr = !1, Ir = 0, cp = 0;
function ke() {
  throw Error(S(321));
}
function pu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!st(e[n], t[n])) return !1;
  return !0;
}
function hu(e, t, n, r, l, o) {
  if (yn = o, te = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Sl.current = e === null || e.memoizedState === null ? hp : mp, e = n(r, l), yr) {
    o = 0;
    do {
      if (yr = !1, Ir = 0, 25 <= o) throw Error(S(301));
      o += 1, me = de = null, t.updateQueue = null, Sl.current = gp, e = n(r, l);
    } while (yr);
  }
  if (Sl.current = Ql, t = de !== null && de.next !== null, yn = 0, me = de = te = null, Vl = !1, t) throw Error(S(300));
  return e;
}
function mu() {
  var e = Ir !== 0;
  return Ir = 0, e;
}
function dt() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return me === null ? te.memoizedState = me = e : me = me.next = e, me;
}
function qe() {
  if (de === null) {
    var e = te.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = de.next;
  var t = me === null ? te.memoizedState : me.next;
  if (t !== null) me = t, de = e;
  else {
    if (e === null) throw Error(S(310));
    de = e, e = { memoizedState: de.memoizedState, baseState: de.baseState, baseQueue: de.baseQueue, queue: de.queue, next: null }, me === null ? te.memoizedState = me = e : me = me.next = e;
  }
  return me;
}
function Or(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Fo(e) {
  var t = qe(), n = t.queue;
  if (n === null) throw Error(S(311));
  n.lastRenderedReducer = e;
  var r = de, l = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      l.next = o.next, o.next = i;
    }
    r.baseQueue = l = o, n.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var u = i = null, s = null, c = o;
    do {
      var g = c.lane;
      if ((yn & g) === g) s !== null && (s = s.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var p = {
          lane: g,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        s === null ? (u = s = p, i = r) : s = s.next = p, te.lanes |= g, vn |= g;
      }
      c = c.next;
    } while (c !== null && c !== o);
    s === null ? i = r : s.next = u, st(r, t.memoizedState) || (Ie = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = s, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, te.lanes |= o, vn |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function $o(e) {
  var t = qe(), n = t.queue;
  if (n === null) throw Error(S(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = l = l.next;
    do
      o = e(o, i.action), i = i.next;
    while (i !== l);
    st(o, t.memoizedState) || (Ie = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function gc() {
}
function yc(e, t) {
  var n = te, r = qe(), l = t(), o = !st(r.memoizedState, l);
  if (o && (r.memoizedState = l, Ie = !0), r = r.queue, gu(wc.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || me !== null && me.memoizedState.tag & 1) {
    if (n.flags |= 2048, Dr(9, xc.bind(null, n, r, l, t), void 0, null), ge === null) throw Error(S(349));
    yn & 30 || vc(n, t, l);
  }
  return l;
}
function vc(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = te.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, te.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function xc(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Sc(t) && kc(e);
}
function wc(e, t, n) {
  return n(function() {
    Sc(t) && kc(e);
  });
}
function Sc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !st(e, n);
  } catch (r) {
    return !0;
  }
}
function kc(e) {
  var t = _t(e, 1);
  t !== null && ut(t, e, 1, -1);
}
function _s(e) {
  var t = dt();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Or, lastRenderedState: e }, t.queue = e, e = e.dispatch = pp.bind(null, te, e), [t.memoizedState, e];
}
function Dr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = te.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, te.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Ec() {
  return qe().memoizedState;
}
function kl(e, t, n, r) {
  var l = dt();
  te.flags |= e, l.memoizedState = Dr(1 | t, n, void 0, r === void 0 ? null : r);
}
function lo(e, t, n, r) {
  var l = qe();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (de !== null) {
    var i = de.memoizedState;
    if (o = i.destroy, r !== null && pu(r, i.deps)) {
      l.memoizedState = Dr(t, n, o, r);
      return;
    }
  }
  te.flags |= e, l.memoizedState = Dr(1 | t, n, o, r);
}
function Ns(e, t) {
  return kl(8390656, 8, e, t);
}
function gu(e, t) {
  return lo(2048, 8, e, t);
}
function Cc(e, t) {
  return lo(4, 2, e, t);
}
function _c(e, t) {
  return lo(4, 4, e, t);
}
function Nc(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Tc(e, t, n) {
  return n = n != null ? n.concat([e]) : null, lo(4, 4, Nc.bind(null, t, e), n);
}
function yu() {
}
function zc(e, t) {
  var n = qe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && pu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function jc(e, t) {
  var n = qe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && pu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Rc(e, t, n) {
  return yn & 21 ? (st(n, t) || (n = Oa(), te.lanes |= n, vn |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Ie = !0), e.memoizedState = n);
}
function fp(e, t) {
  var n = H;
  H = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Do.transition;
  Do.transition = {};
  try {
    e(!1), t();
  } finally {
    H = n, Do.transition = r;
  }
}
function Mc() {
  return qe().memoizedState;
}
function dp(e, t, n) {
  var r = Qt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Pc(e)) Lc(t, n);
  else if (n = pc(e, t, n, r), n !== null) {
    var l = je();
    ut(n, e, r, l), Ic(n, t, r);
  }
}
function pp(e, t, n) {
  var r = Qt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Pc(e)) Lc(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, u = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = u, st(u, i)) {
        var s = t.interleaved;
        s === null ? (l.next = l, su(t)) : (l.next = s.next, s.next = l), t.interleaved = l;
        return;
      }
    } catch (c) {
    } finally {
    }
    n = pc(e, t, l, r), n !== null && (l = je(), ut(n, e, r, l), Ic(n, t, r));
  }
}
function Pc(e) {
  var t = e.alternate;
  return e === te || t !== null && t === te;
}
function Lc(e, t) {
  yr = Vl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Ic(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Yi(e, n);
  }
}
var Ql = { readContext: Ze, useCallback: ke, useContext: ke, useEffect: ke, useImperativeHandle: ke, useInsertionEffect: ke, useLayoutEffect: ke, useMemo: ke, useReducer: ke, useRef: ke, useState: ke, useDebugValue: ke, useDeferredValue: ke, useTransition: ke, useMutableSource: ke, useSyncExternalStore: ke, useId: ke, unstable_isNewReconciler: !1 }, hp = { readContext: Ze, useCallback: function(e, t) {
  return dt().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Ze, useEffect: Ns, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, kl(
    4194308,
    4,
    Nc.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return kl(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return kl(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = dt();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = dt();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = dp.bind(null, te, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = dt();
  return e = { current: e }, t.memoizedState = e;
}, useState: _s, useDebugValue: yu, useDeferredValue: function(e) {
  return dt().memoizedState = e;
}, useTransition: function() {
  var e = _s(!1), t = e[0];
  return e = fp.bind(null, e[1]), dt().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = te, l = dt();
  if (b) {
    if (n === void 0) throw Error(S(407));
    n = n();
  } else {
    if (n = t(), ge === null) throw Error(S(349));
    yn & 30 || vc(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Ns(wc.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, Dr(9, xc.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = dt(), t = ge.identifierPrefix;
  if (b) {
    var n = St, r = wt;
    n = (r & ~(1 << 32 - it(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Ir++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = cp++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, mp = {
  readContext: Ze,
  useCallback: zc,
  useContext: Ze,
  useEffect: gu,
  useImperativeHandle: Tc,
  useInsertionEffect: Cc,
  useLayoutEffect: _c,
  useMemo: jc,
  useReducer: Fo,
  useRef: Ec,
  useState: function() {
    return Fo(Or);
  },
  useDebugValue: yu,
  useDeferredValue: function(e) {
    var t = qe();
    return Rc(t, de.memoizedState, e);
  },
  useTransition: function() {
    var e = Fo(Or)[0], t = qe().memoizedState;
    return [e, t];
  },
  useMutableSource: gc,
  useSyncExternalStore: yc,
  useId: Mc,
  unstable_isNewReconciler: !1
}, gp = { readContext: Ze, useCallback: zc, useContext: Ze, useEffect: gu, useImperativeHandle: Tc, useInsertionEffect: Cc, useLayoutEffect: _c, useMemo: jc, useReducer: $o, useRef: Ec, useState: function() {
  return $o(Or);
}, useDebugValue: yu, useDeferredValue: function(e) {
  var t = qe();
  return de === null ? t.memoizedState = e : Rc(t, de.memoizedState, e);
}, useTransition: function() {
  var e = $o(Or)[0], t = qe().memoizedState;
  return [e, t];
}, useMutableSource: gc, useSyncExternalStore: yc, useId: Mc, unstable_isNewReconciler: !1 };
function rt(e, t) {
  if (e && e.defaultProps) {
    t = ne({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function wi(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : ne({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var oo = { isMounted: function(e) {
  return (e = e._reactInternals) ? Sn(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = je(), l = Qt(e), o = kt(r, l);
  o.payload = t, n != null && (o.callback = n), t = Ht(e, o, l), t !== null && (ut(t, e, l, r), wl(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = je(), l = Qt(e), o = kt(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Ht(e, o, l), t !== null && (ut(t, e, l, r), wl(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = je(), r = Qt(e), l = kt(n, r);
  l.tag = 2, t != null && (l.callback = t), t = Ht(e, l, r), t !== null && (ut(t, e, r, n), wl(t, e, r));
} };
function Ts(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !zr(n, r) || !zr(l, o) : !0;
}
function Oc(e, t, n) {
  var r = !1, l = Yt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Ze(o) : (l = De(t) ? mn : _e.current, r = t.contextTypes, o = (r = r != null) ? Vn(e, l) : Yt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = oo, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function zs(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && oo.enqueueReplaceState(t, t.state, null);
}
function Si(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, au(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = Ze(o) : (o = De(t) ? mn : _e.current, l.context = Vn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (wi(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && oo.enqueueReplaceState(l, l.state, null), Wl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Yn(e, t) {
  try {
    var n = "", r = t;
    do
      n += Vf(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Ao(e, t, n) {
  return { value: e, source: null, stack: n != null ? n : null, digest: t != null ? t : null };
}
function ki(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var yp = typeof WeakMap == "function" ? WeakMap : Map;
function Dc(e, t, n) {
  n = kt(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Xl || (Xl = !0, Pi = r), ki(e, t);
  }, n;
}
function Fc(e, t, n) {
  n = kt(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      ki(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    ki(e, t), typeof r != "function" && (Vt === null ? Vt = /* @__PURE__ */ new Set([this]) : Vt.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function js(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new yp();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Mp.bind(null, e, t, n), t.then(e, e));
}
function Rs(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ms(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = kt(-1, 1), t.tag = 2, Ht(n, t, 1))), n.lanes |= 1), e);
}
var vp = Tt.ReactCurrentOwner, Ie = !1;
function ze(e, t, n, r) {
  t.child = e === null ? dc(t, null, n, r) : Kn(t, e.child, n, r);
}
function Ps(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return Bn(t, l), r = hu(e, t, n, r, o, l), n = mu(), e !== null && !Ie ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Nt(e, t, l)) : (b && n && nu(t), t.flags |= 1, ze(e, t, r, l), t.child);
}
function Ls(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !_u(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, $c(e, t, o, r, l)) : (e = Nl(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : zr, n(i, r) && e.ref === t.ref) return Nt(e, t, l);
  }
  return t.flags |= 1, e = Kt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function $c(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (zr(o, r) && e.ref === t.ref) if (Ie = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Ie = !0);
    else return t.lanes = e.lanes, Nt(e, t, l);
  }
  return Ei(e, t, n, r, l);
}
function Ac(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, K(Dn, Ae), Ae |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, K(Dn, Ae), Ae |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, K(Dn, Ae), Ae |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, K(Dn, Ae), Ae |= r;
  return ze(e, t, l, n), t.child;
}
function Uc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Ei(e, t, n, r, l) {
  var o = De(n) ? mn : _e.current;
  return o = Vn(t, o), Bn(t, l), n = hu(e, t, n, r, o, l), r = mu(), e !== null && !Ie ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Nt(e, t, l)) : (b && r && nu(t), t.flags |= 1, ze(e, t, n, l), t.child);
}
function Is(e, t, n, r, l) {
  if (De(n)) {
    var o = !0;
    Fl(t);
  } else o = !1;
  if (Bn(t, l), t.stateNode === null) El(e, t), Oc(t, n, r), Si(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, u = t.memoizedProps;
    i.props = u;
    var s = i.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Ze(c) : (c = De(n) ? mn : _e.current, c = Vn(t, c));
    var g = n.getDerivedStateFromProps, p = typeof g == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    p || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== r || s !== c) && zs(t, i, r, c), It = !1;
    var h = t.memoizedState;
    i.state = h, Wl(t, r, i, l), s = t.memoizedState, u !== r || h !== s || Oe.current || It ? (typeof g == "function" && (wi(t, n, g, r), s = t.memoizedState), (u = It || Ts(t, n, u, r, h, s, c)) ? (p || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), i.props = r, i.state = s, i.context = c, r = u) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, hc(e, t), u = t.memoizedProps, c = t.type === t.elementType ? u : rt(t.type, u), i.props = c, p = t.pendingProps, h = i.context, s = n.contextType, typeof s == "object" && s !== null ? s = Ze(s) : (s = De(n) ? mn : _e.current, s = Vn(t, s));
    var w = n.getDerivedStateFromProps;
    (g = typeof w == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== p || h !== s) && zs(t, i, r, s), It = !1, h = t.memoizedState, i.state = h, Wl(t, r, i, l);
    var k = t.memoizedState;
    u !== p || h !== k || Oe.current || It ? (typeof w == "function" && (wi(t, n, w, r), k = t.memoizedState), (c = It || Ts(t, n, c, r, h, k, s) || !1) ? (g || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, k, s), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, k, s)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = k), i.props = r, i.state = k, i.context = s, r = c) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Ci(e, t, n, r, o, l);
}
function Ci(e, t, n, r, l, o) {
  Uc(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && xs(t, n, !1), Nt(e, t, o);
  r = t.stateNode, vp.current = t;
  var u = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = Kn(t, e.child, null, o), t.child = Kn(t, null, u, o)) : ze(e, t, u, o), t.memoizedState = r.state, l && xs(t, n, !0), t.child;
}
function Bc(e) {
  var t = e.stateNode;
  t.pendingContext ? vs(e, t.pendingContext, t.pendingContext !== t.context) : t.context && vs(e, t.context, !1), cu(e, t.containerInfo);
}
function Os(e, t, n, r, l) {
  return Qn(), lu(l), t.flags |= 256, ze(e, t, n, r), t.child;
}
var _i = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ni(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Wc(e, t, n) {
  var r = t.pendingProps, l = ee.current, o = !1, i = (t.flags & 128) !== 0, u;
  if ((u = i) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), u ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), K(ee, l & 1), e === null)
    return vi(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = so(i, r, 0, null), e = hn(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Ni(n), t.memoizedState = _i, e) : vu(t, i));
  if (l = e.memoizedState, l !== null && (u = l.dehydrated, u !== null)) return xp(e, t, i, r, u, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, u = l.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = Kt(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), u !== null ? o = Kt(u, o) : (o = hn(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? Ni(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = _i, r;
  }
  return o = e.child, e = o.sibling, r = Kt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function vu(e, t) {
  return t = so({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function fl(e, t, n, r) {
  return r !== null && lu(r), Kn(t, e.child, null, n), e = vu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function xp(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Ao(Error(S(422))), fl(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = so({ mode: "visible", children: r.children }, l, 0, null), o = hn(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Kn(t, e.child, null, i), t.child.memoizedState = Ni(i), t.memoizedState = _i, o);
  if (!(t.mode & 1)) return fl(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var u = r.dgst;
    return r = u, o = Error(S(419)), r = Ao(o, r, void 0), fl(e, t, i, r);
  }
  if (u = (i & e.childLanes) !== 0, Ie || u) {
    if (r = ge, r !== null) {
      switch (i & -i) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, _t(e, l), ut(r, e, l, -1));
    }
    return Cu(), r = Ao(Error(S(421))), fl(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Pp.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Ue = Wt(l.nextSibling), Be = t, b = !0, ot = null, e !== null && (Xe[Ye++] = wt, Xe[Ye++] = St, Xe[Ye++] = gn, wt = e.id, St = e.overflow, gn = t), t = vu(t, r.children), t.flags |= 4096, t);
}
function Ds(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), xi(e.return, t, n);
}
function Uo(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function Hc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (ze(e, t, r.children, n), r = ee.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Ds(e, n, t);
      else if (e.tag === 19) Ds(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    r &= 1;
  }
  if (K(ee, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && Hl(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Uo(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Hl(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Uo(t, !0, n, null, o);
      break;
    case "together":
      Uo(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function El(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Nt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), vn |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(S(153));
  if (t.child !== null) {
    for (e = t.child, n = Kt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Kt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function wp(e, t, n) {
  switch (t.tag) {
    case 3:
      Bc(t), Qn();
      break;
    case 5:
      mc(t);
      break;
    case 1:
      De(t.type) && Fl(t);
      break;
    case 4:
      cu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      K(Ul, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (K(ee, ee.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Wc(e, t, n) : (K(ee, ee.current & 1), e = Nt(e, t, n), e !== null ? e.sibling : null);
      K(ee, ee.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Hc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), K(ee, ee.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Ac(e, t, n);
  }
  return Nt(e, t, n);
}
var Vc, Ti, Qc, Kc;
Vc = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
Ti = function() {
};
Qc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, dn(mt.current);
    var o = null;
    switch (n) {
      case "input":
        l = Go(e, l), r = Go(e, r), o = [];
        break;
      case "select":
        l = ne({}, l, { value: void 0 }), r = ne({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = qo(e, l), r = qo(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Ol);
    }
    ei(n, r);
    var i;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var u = l[c];
      for (i in u) u.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Sr.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var s = r[c];
      if (u = l != null ? l[c] : void 0, r.hasOwnProperty(c) && s !== u && (s != null || u != null)) if (c === "style") if (u) {
        for (i in u) !u.hasOwnProperty(i) || s && s.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in s) s.hasOwnProperty(i) && u[i] !== s[i] && (n || (n = {}), n[i] = s[i]);
      } else n || (o || (o = []), o.push(
        c,
        n
      )), n = s;
      else c === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, u = u ? u.__html : void 0, s != null && u !== s && (o = o || []).push(c, s)) : c === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(c, "" + s) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Sr.hasOwnProperty(c) ? (s != null && c === "onScroll" && Z("scroll", e), o || u === s || (o = [])) : (o = o || []).push(c, s));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
Kc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function ir(e, t) {
  if (!b) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
      r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
  }
}
function Ee(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Sp(e, t, n) {
  var r = t.pendingProps;
  switch (ru(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Ee(t), null;
    case 1:
      return De(t.type) && Dl(), Ee(t), null;
    case 3:
      return r = t.stateNode, Xn(), q(Oe), q(_e), du(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (al(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ot !== null && (Oi(ot), ot = null))), Ti(e, t), Ee(t), null;
    case 5:
      fu(t);
      var l = dn(Lr.current);
      if (n = t.type, e !== null && t.stateNode != null) Qc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(S(166));
          return Ee(t), null;
        }
        if (e = dn(mt.current), al(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[pt] = t, r[Mr] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              Z("cancel", r), Z("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              Z("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < fr.length; l++) Z(fr[l], r);
              break;
            case "source":
              Z("error", r);
              break;
            case "img":
            case "image":
            case "link":
              Z(
                "error",
                r
              ), Z("load", r);
              break;
            case "details":
              Z("toggle", r);
              break;
            case "input":
              Qu(r, o), Z("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Z("invalid", r);
              break;
            case "textarea":
              Xu(r, o), Z("invalid", r);
          }
          ei(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var u = o[i];
            i === "children" ? typeof u == "string" ? r.textContent !== u && (o.suppressHydrationWarning !== !0 && sl(r.textContent, u, e), l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (o.suppressHydrationWarning !== !0 && sl(
              r.textContent,
              u,
              e
            ), l = ["children", "" + u]) : Sr.hasOwnProperty(i) && u != null && i === "onScroll" && Z("scroll", r);
          }
          switch (n) {
            case "input":
              el(r), Ku(r, o, !0);
              break;
            case "textarea":
              el(r), Yu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Ol);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = wa(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[pt] = t, e[Mr] = r, Vc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = ti(n, r), n) {
              case "dialog":
                Z("cancel", e), Z("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                Z("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < fr.length; l++) Z(fr[l], e);
                l = r;
                break;
              case "source":
                Z("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                Z(
                  "error",
                  e
                ), Z("load", e), l = r;
                break;
              case "details":
                Z("toggle", e), l = r;
                break;
              case "input":
                Qu(e, r), l = Go(e, r), Z("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = ne({}, r, { value: void 0 }), Z("invalid", e);
                break;
              case "textarea":
                Xu(e, r), l = qo(e, r), Z("invalid", e);
                break;
              default:
                l = r;
            }
            ei(n, l), u = l;
            for (o in u) if (u.hasOwnProperty(o)) {
              var s = u[o];
              o === "style" ? Ea(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && Sa(e, s)) : o === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && kr(e, s) : typeof s == "number" && kr(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Sr.hasOwnProperty(o) ? s != null && o === "onScroll" && Z("scroll", e) : s != null && Wi(e, o, s, i));
            }
            switch (n) {
              case "input":
                el(e), Ku(e, r, !1);
                break;
              case "textarea":
                el(e), Yu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Xt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? Fn(e, !!r.multiple, o, !1) : r.defaultValue != null && Fn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Ol);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return Ee(t), null;
    case 6:
      if (e && t.stateNode != null) Kc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(S(166));
        if (n = dn(Lr.current), dn(mt.current), al(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[pt] = t, (o = r.nodeValue !== n) && (e = Be, e !== null)) switch (e.tag) {
            case 3:
              sl(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && sl(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[pt] = t, t.stateNode = r;
      }
      return Ee(t), null;
    case 13:
      if (q(ee), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (b && Ue !== null && t.mode & 1 && !(t.flags & 128)) cc(), Qn(), t.flags |= 98560, o = !1;
        else if (o = al(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(S(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(S(317));
            o[pt] = t;
          } else Qn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          Ee(t), o = !1;
        } else ot !== null && (Oi(ot), ot = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || ee.current & 1 ? pe === 0 && (pe = 3) : Cu())), t.updateQueue !== null && (t.flags |= 4), Ee(t), null);
    case 4:
      return Xn(), Ti(e, t), e === null && jr(t.stateNode.containerInfo), Ee(t), null;
    case 10:
      return uu(t.type._context), Ee(t), null;
    case 17:
      return De(t.type) && Dl(), Ee(t), null;
    case 19:
      if (q(ee), o = t.memoizedState, o === null) return Ee(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) ir(o, !1);
      else {
        if (pe !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = Hl(e), i !== null) {
            for (t.flags |= 128, ir(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return K(ee, ee.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && ie() > Gn && (t.flags |= 128, r = !0, ir(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = Hl(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), ir(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !b) return Ee(t), null;
        } else 2 * ie() - o.renderingStartTime > Gn && n !== 1073741824 && (t.flags |= 128, r = !0, ir(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = ie(), t.sibling = null, n = ee.current, K(ee, r ? n & 1 | 2 : n & 1), t) : (Ee(t), null);
    case 22:
    case 23:
      return Eu(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Ae & 1073741824 && (Ee(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ee(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(S(156, t.tag));
}
function kp(e, t) {
  switch (ru(t), t.tag) {
    case 1:
      return De(t.type) && Dl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Xn(), q(Oe), q(_e), du(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return fu(t), null;
    case 13:
      if (q(ee), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(S(340));
        Qn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return q(ee), null;
    case 4:
      return Xn(), null;
    case 10:
      return uu(t.type._context), null;
    case 22:
    case 23:
      return Eu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var dl = !1, Ce = !1, Ep = typeof WeakSet == "function" ? WeakSet : Set, j = null;
function On(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    le(e, t, r);
  }
  else n.current = null;
}
function zi(e, t, n) {
  try {
    n();
  } catch (r) {
    le(e, t, r);
  }
}
var Fs = !1;
function Cp(e, t) {
  if (fi = Pl, e = Za(), tu(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var l = r.anchorOffset, o = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, o.nodeType;
        } catch (v) {
          n = null;
          break e;
        }
        var i = 0, u = -1, s = -1, c = 0, g = 0, p = e, h = null;
        t: for (; ; ) {
          for (var w; p !== n || l !== 0 && p.nodeType !== 3 || (u = i + l), p !== o || r !== 0 && p.nodeType !== 3 || (s = i + r), p.nodeType === 3 && (i += p.nodeValue.length), (w = p.firstChild) !== null; )
            h = p, p = w;
          for (; ; ) {
            if (p === e) break t;
            if (h === n && ++c === l && (u = i), h === o && ++g === r && (s = i), (w = p.nextSibling) !== null) break;
            p = h, h = p.parentNode;
          }
          p = w;
        }
        n = u === -1 || s === -1 ? null : { start: u, end: s };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (di = { focusedElem: e, selectionRange: n }, Pl = !1, j = t; j !== null; ) if (t = j, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, j = e;
  else for (; j !== null; ) {
    t = j;
    try {
      var k = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (k !== null) {
            var y = k.memoizedProps, D = k.memoizedState, f = t.stateNode, a = f.getSnapshotBeforeUpdate(t.elementType === t.type ? y : rt(t.type, y), D);
            f.__reactInternalSnapshotBeforeUpdate = a;
          }
          break;
        case 3:
          var d = t.stateNode.containerInfo;
          d.nodeType === 1 ? d.textContent = "" : d.nodeType === 9 && d.documentElement && d.removeChild(d.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(S(163));
      }
    } catch (v) {
      le(t, t.return, v);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, j = e;
      break;
    }
    j = t.return;
  }
  return k = Fs, Fs = !1, k;
}
function vr(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && zi(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function io(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function ji(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function Xc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Xc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[pt], delete t[Mr], delete t[mi], delete t[ip], delete t[up])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Yc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function $s(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Yc(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Ri(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Ol));
  else if (r !== 4 && (e = e.child, e !== null)) for (Ri(e, t, n), e = e.sibling; e !== null; ) Ri(e, t, n), e = e.sibling;
}
function Mi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Mi(e, t, n), e = e.sibling; e !== null; ) Mi(e, t, n), e = e.sibling;
}
var xe = null, lt = !1;
function Pt(e, t, n) {
  for (n = n.child; n !== null; ) Gc(e, t, n), n = n.sibling;
}
function Gc(e, t, n) {
  if (ht && typeof ht.onCommitFiberUnmount == "function") try {
    ht.onCommitFiberUnmount(ql, n);
  } catch (u) {
  }
  switch (n.tag) {
    case 5:
      Ce || On(n, t);
    case 6:
      var r = xe, l = lt;
      xe = null, Pt(e, t, n), xe = r, lt = l, xe !== null && (lt ? (e = xe, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : xe.removeChild(n.stateNode));
      break;
    case 18:
      xe !== null && (lt ? (e = xe, n = n.stateNode, e.nodeType === 8 ? Lo(e.parentNode, n) : e.nodeType === 1 && Lo(e, n), Nr(e)) : Lo(xe, n.stateNode));
      break;
    case 4:
      r = xe, l = lt, xe = n.stateNode.containerInfo, lt = !0, Pt(e, t, n), xe = r, lt = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Ce && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && zi(n, t, i), l = l.next;
        } while (l !== r);
      }
      Pt(e, t, n);
      break;
    case 1:
      if (!Ce && (On(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (u) {
        le(n, t, u);
      }
      Pt(e, t, n);
      break;
    case 21:
      Pt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (Ce = (r = Ce) || n.memoizedState !== null, Pt(e, t, n), Ce = r) : Pt(e, t, n);
      break;
    default:
      Pt(e, t, n);
  }
}
function As(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Ep()), t.forEach(function(r) {
      var l = Lp.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function nt(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, i = t, u = i;
      e: for (; u !== null; ) {
        switch (u.tag) {
          case 5:
            xe = u.stateNode, lt = !1;
            break e;
          case 3:
            xe = u.stateNode.containerInfo, lt = !0;
            break e;
          case 4:
            xe = u.stateNode.containerInfo, lt = !0;
            break e;
        }
        u = u.return;
      }
      if (xe === null) throw Error(S(160));
      Gc(o, i, l), xe = null, lt = !1;
      var s = l.alternate;
      s !== null && (s.return = null), l.return = null;
    } catch (c) {
      le(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Jc(t, e), t = t.sibling;
}
function Jc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (nt(t, e), ft(e), r & 4) {
        try {
          vr(3, e, e.return), io(3, e);
        } catch (y) {
          le(e, e.return, y);
        }
        try {
          vr(5, e, e.return);
        } catch (y) {
          le(e, e.return, y);
        }
      }
      break;
    case 1:
      nt(t, e), ft(e), r & 512 && n !== null && On(n, n.return);
      break;
    case 5:
      if (nt(t, e), ft(e), r & 512 && n !== null && On(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          kr(l, "");
        } catch (y) {
          le(e, e.return, y);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, u = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null) try {
          u === "input" && o.type === "radio" && o.name != null && va(l, o), ti(u, i);
          var c = ti(u, o);
          for (i = 0; i < s.length; i += 2) {
            var g = s[i], p = s[i + 1];
            g === "style" ? Ea(l, p) : g === "dangerouslySetInnerHTML" ? Sa(l, p) : g === "children" ? kr(l, p) : Wi(l, g, p, c);
          }
          switch (u) {
            case "input":
              Jo(l, o);
              break;
            case "textarea":
              xa(l, o);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var w = o.value;
              w != null ? Fn(l, !!o.multiple, w, !1) : h !== !!o.multiple && (o.defaultValue != null ? Fn(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : Fn(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[Mr] = o;
        } catch (y) {
          le(e, e.return, y);
        }
      }
      break;
    case 6:
      if (nt(t, e), ft(e), r & 4) {
        if (e.stateNode === null) throw Error(S(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (y) {
          le(e, e.return, y);
        }
      }
      break;
    case 3:
      if (nt(t, e), ft(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Nr(t.containerInfo);
      } catch (y) {
        le(e, e.return, y);
      }
      break;
    case 4:
      nt(t, e), ft(e);
      break;
    case 13:
      nt(t, e), ft(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Su = ie())), r & 4 && As(e);
      break;
    case 22:
      if (g = n !== null && n.memoizedState !== null, e.mode & 1 ? (Ce = (c = Ce) || g, nt(t, e), Ce = c) : nt(t, e), ft(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !g && e.mode & 1) for (j = e, g = e.child; g !== null; ) {
          for (p = j = g; j !== null; ) {
            switch (h = j, w = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                vr(4, h, h.return);
                break;
              case 1:
                On(h, h.return);
                var k = h.stateNode;
                if (typeof k.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, k.props = t.memoizedProps, k.state = t.memoizedState, k.componentWillUnmount();
                  } catch (y) {
                    le(r, n, y);
                  }
                }
                break;
              case 5:
                On(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  Bs(p);
                  continue;
                }
            }
            w !== null ? (w.return = h, j = w) : Bs(p);
          }
          g = g.sibling;
        }
        e: for (g = null, p = e; ; ) {
          if (p.tag === 5) {
            if (g === null) {
              g = p;
              try {
                l = p.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (u = p.stateNode, s = p.memoizedProps.style, i = s != null && s.hasOwnProperty("display") ? s.display : null, u.style.display = ka("display", i));
              } catch (y) {
                le(e, e.return, y);
              }
            }
          } else if (p.tag === 6) {
            if (g === null) try {
              p.stateNode.nodeValue = c ? "" : p.memoizedProps;
            } catch (y) {
              le(e, e.return, y);
            }
          } else if ((p.tag !== 22 && p.tag !== 23 || p.memoizedState === null || p === e) && p.child !== null) {
            p.child.return = p, p = p.child;
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e;
            g === p && (g = null), p = p.return;
          }
          g === p && (g = null), p.sibling.return = p.return, p = p.sibling;
        }
      }
      break;
    case 19:
      nt(t, e), ft(e), r & 4 && As(e);
      break;
    case 21:
      break;
    default:
      nt(
        t,
        e
      ), ft(e);
  }
}
function ft(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Yc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(S(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (kr(l, ""), r.flags &= -33);
          var o = $s(e);
          Mi(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, u = $s(e);
          Ri(e, u, i);
          break;
        default:
          throw Error(S(161));
      }
    } catch (s) {
      le(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function _p(e, t, n) {
  j = e, Zc(e);
}
function Zc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; j !== null; ) {
    var l = j, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || dl;
      if (!i) {
        var u = l.alternate, s = u !== null && u.memoizedState !== null || Ce;
        u = dl;
        var c = Ce;
        if (dl = i, (Ce = s) && !c) for (j = l; j !== null; ) i = j, s = i.child, i.tag === 22 && i.memoizedState !== null ? Ws(l) : s !== null ? (s.return = i, j = s) : Ws(l);
        for (; o !== null; ) j = o, Zc(o), o = o.sibling;
        j = l, dl = u, Ce = c;
      }
      Us(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, j = o) : Us(e);
  }
}
function Us(e) {
  for (; j !== null; ) {
    var t = j;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            Ce || io(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !Ce) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : rt(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Cs(t, o, r);
            break;
          case 3:
            var i = t.updateQueue;
            if (i !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              Cs(t, i, n);
            }
            break;
          case 5:
            var u = t.stateNode;
            if (n === null && t.flags & 4) {
              n = u;
              var s = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  s.autoFocus && n.focus();
                  break;
                case "img":
                  s.src && (n.src = s.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var c = t.alternate;
              if (c !== null) {
                var g = c.memoizedState;
                if (g !== null) {
                  var p = g.dehydrated;
                  p !== null && Nr(p);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(S(163));
        }
        Ce || t.flags & 512 && ji(t);
      } catch (h) {
        le(t, t.return, h);
      }
    }
    if (t === e) {
      j = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, j = n;
      break;
    }
    j = t.return;
  }
}
function Bs(e) {
  for (; j !== null; ) {
    var t = j;
    if (t === e) {
      j = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, j = n;
      break;
    }
    j = t.return;
  }
}
function Ws(e) {
  for (; j !== null; ) {
    var t = j;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            io(4, t);
          } catch (s) {
            le(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              le(t, l, s);
            }
          }
          var o = t.return;
          try {
            ji(t);
          } catch (s) {
            le(t, o, s);
          }
          break;
        case 5:
          var i = t.return;
          try {
            ji(t);
          } catch (s) {
            le(t, i, s);
          }
      }
    } catch (s) {
      le(t, t.return, s);
    }
    if (t === e) {
      j = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      u.return = t.return, j = u;
      break;
    }
    j = t.return;
  }
}
var Np = Math.ceil, Kl = Tt.ReactCurrentDispatcher, xu = Tt.ReactCurrentOwner, Je = Tt.ReactCurrentBatchConfig, B = 0, ge = null, fe = null, we = 0, Ae = 0, Dn = Jt(0), pe = 0, Fr = null, vn = 0, uo = 0, wu = 0, xr = null, Le = null, Su = 0, Gn = 1 / 0, vt = null, Xl = !1, Pi = null, Vt = null, pl = !1, $t = null, Yl = 0, wr = 0, Li = null, Cl = -1, _l = 0;
function je() {
  return B & 6 ? ie() : Cl !== -1 ? Cl : Cl = ie();
}
function Qt(e) {
  return e.mode & 1 ? B & 2 && we !== 0 ? we & -we : ap.transition !== null ? (_l === 0 && (_l = Oa()), _l) : (e = H, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Wa(e.type)), e) : 1;
}
function ut(e, t, n, r) {
  if (50 < wr) throw wr = 0, Li = null, Error(S(185));
  Ar(e, n, r), (!(B & 2) || e !== ge) && (e === ge && (!(B & 2) && (uo |= n), pe === 4 && Dt(e, we)), Fe(e, r), n === 1 && B === 0 && !(t.mode & 1) && (Gn = ie() + 500, ro && Zt()));
}
function Fe(e, t) {
  var n = e.callbackNode;
  ad(e, t);
  var r = Ml(e, e === ge ? we : 0);
  if (r === 0) n !== null && Zu(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Zu(n), t === 1) e.tag === 0 ? sp(Hs.bind(null, e)) : uc(Hs.bind(null, e)), lp(function() {
      !(B & 6) && Zt();
    }), n = null;
    else {
      switch (Da(r)) {
        case 1:
          n = Xi;
          break;
        case 4:
          n = La;
          break;
        case 16:
          n = Rl;
          break;
        case 536870912:
          n = Ia;
          break;
        default:
          n = Rl;
      }
      n = of(n, qc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function qc(e, t) {
  if (Cl = -1, _l = 0, B & 6) throw Error(S(327));
  var n = e.callbackNode;
  if (Wn() && e.callbackNode !== n) return null;
  var r = Ml(e, e === ge ? we : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Gl(e, r);
  else {
    t = r;
    var l = B;
    B |= 2;
    var o = ef();
    (ge !== e || we !== t) && (vt = null, Gn = ie() + 500, pn(e, t));
    do
      try {
        jp();
        break;
      } catch (u) {
        bc(e, u);
      }
    while (!0);
    iu(), Kl.current = o, B = l, fe !== null ? t = 0 : (ge = null, we = 0, t = pe);
  }
  if (t !== 0) {
    if (t === 2 && (l = ii(e), l !== 0 && (r = l, t = Ii(e, l))), t === 1) throw n = Fr, pn(e, 0), Dt(e, r), Fe(e, ie()), n;
    if (t === 6) Dt(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Tp(l) && (t = Gl(e, r), t === 2 && (o = ii(e), o !== 0 && (r = o, t = Ii(e, o))), t === 1)) throw n = Fr, pn(e, 0), Dt(e, r), Fe(e, ie()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(S(345));
        case 2:
          sn(e, Le, vt);
          break;
        case 3:
          if (Dt(e, r), (r & 130023424) === r && (t = Su + 500 - ie(), 10 < t)) {
            if (Ml(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              je(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = hi(sn.bind(null, e, Le, vt), t);
            break;
          }
          sn(e, Le, vt);
          break;
        case 4:
          if (Dt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - it(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = ie() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Np(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = hi(sn.bind(null, e, Le, vt), r);
            break;
          }
          sn(e, Le, vt);
          break;
        case 5:
          sn(e, Le, vt);
          break;
        default:
          throw Error(S(329));
      }
    }
  }
  return Fe(e, ie()), e.callbackNode === n ? qc.bind(null, e) : null;
}
function Ii(e, t) {
  var n = xr;
  return e.current.memoizedState.isDehydrated && (pn(e, t).flags |= 256), e = Gl(e, t), e !== 2 && (t = Le, Le = n, t !== null && Oi(t)), e;
}
function Oi(e) {
  Le === null ? Le = e : Le.push.apply(Le, e);
}
function Tp(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!st(o(), l)) return !1;
        } catch (i) {
          return !1;
        }
      }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function Dt(e, t) {
  for (t &= ~wu, t &= ~uo, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - it(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Hs(e) {
  if (B & 6) throw Error(S(327));
  Wn();
  var t = Ml(e, 0);
  if (!(t & 1)) return Fe(e, ie()), null;
  var n = Gl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = ii(e);
    r !== 0 && (t = r, n = Ii(e, r));
  }
  if (n === 1) throw n = Fr, pn(e, 0), Dt(e, t), Fe(e, ie()), n;
  if (n === 6) throw Error(S(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, sn(e, Le, vt), Fe(e, ie()), null;
}
function ku(e, t) {
  var n = B;
  B |= 1;
  try {
    return e(t);
  } finally {
    B = n, B === 0 && (Gn = ie() + 500, ro && Zt());
  }
}
function xn(e) {
  $t !== null && $t.tag === 0 && !(B & 6) && Wn();
  var t = B;
  B |= 1;
  var n = Je.transition, r = H;
  try {
    if (Je.transition = null, H = 1, e) return e();
  } finally {
    H = r, Je.transition = n, B = t, !(B & 6) && Zt();
  }
}
function Eu() {
  Ae = Dn.current, q(Dn);
}
function pn(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, rp(n)), fe !== null) for (n = fe.return; n !== null; ) {
    var r = n;
    switch (ru(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Dl();
        break;
      case 3:
        Xn(), q(Oe), q(_e), du();
        break;
      case 5:
        fu(r);
        break;
      case 4:
        Xn();
        break;
      case 13:
        q(ee);
        break;
      case 19:
        q(ee);
        break;
      case 10:
        uu(r.type._context);
        break;
      case 22:
      case 23:
        Eu();
    }
    n = n.return;
  }
  if (ge = e, fe = e = Kt(e.current, null), we = Ae = t, pe = 0, Fr = null, wu = uo = vn = 0, Le = xr = null, fn !== null) {
    for (t = 0; t < fn.length; t++) if (n = fn[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var i = o.next;
        o.next = l, r.next = i;
      }
      n.pending = r;
    }
    fn = null;
  }
  return e;
}
function bc(e, t) {
  do {
    var n = fe;
    try {
      if (iu(), Sl.current = Ql, Vl) {
        for (var r = te.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        Vl = !1;
      }
      if (yn = 0, me = de = te = null, yr = !1, Ir = 0, xu.current = null, n === null || n.return === null) {
        pe = 1, Fr = t, fe = null;
        break;
      }
      e: {
        var o = e, i = n.return, u = n, s = t;
        if (t = we, u.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var c = s, g = u, p = g.tag;
          if (!(g.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var h = g.alternate;
            h ? (g.updateQueue = h.updateQueue, g.memoizedState = h.memoizedState, g.lanes = h.lanes) : (g.updateQueue = null, g.memoizedState = null);
          }
          var w = Rs(i);
          if (w !== null) {
            w.flags &= -257, Ms(w, i, u, o, t), w.mode & 1 && js(o, c, t), t = w, s = c;
            var k = t.updateQueue;
            if (k === null) {
              var y = /* @__PURE__ */ new Set();
              y.add(s), t.updateQueue = y;
            } else k.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              js(o, c, t), Cu();
              break e;
            }
            s = Error(S(426));
          }
        } else if (b && u.mode & 1) {
          var D = Rs(i);
          if (D !== null) {
            !(D.flags & 65536) && (D.flags |= 256), Ms(D, i, u, o, t), lu(Yn(s, u));
            break e;
          }
        }
        o = s = Yn(s, u), pe !== 4 && (pe = 2), xr === null ? xr = [o] : xr.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var f = Dc(o, s, t);
              Es(o, f);
              break e;
            case 1:
              u = s;
              var a = o.type, d = o.stateNode;
              if (!(o.flags & 128) && (typeof a.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (Vt === null || !Vt.has(d)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var v = Fc(o, u, t);
                Es(o, v);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      nf(n);
    } catch (E) {
      t = E, fe === n && n !== null && (fe = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function ef() {
  var e = Kl.current;
  return Kl.current = Ql, e === null ? Ql : e;
}
function Cu() {
  (pe === 0 || pe === 3 || pe === 2) && (pe = 4), ge === null || !(vn & 268435455) && !(uo & 268435455) || Dt(ge, we);
}
function Gl(e, t) {
  var n = B;
  B |= 2;
  var r = ef();
  (ge !== e || we !== t) && (vt = null, pn(e, t));
  do
    try {
      zp();
      break;
    } catch (l) {
      bc(e, l);
    }
  while (!0);
  if (iu(), B = n, Kl.current = r, fe !== null) throw Error(S(261));
  return ge = null, we = 0, pe;
}
function zp() {
  for (; fe !== null; ) tf(fe);
}
function jp() {
  for (; fe !== null && !ed(); ) tf(fe);
}
function tf(e) {
  var t = lf(e.alternate, e, Ae);
  e.memoizedProps = e.pendingProps, t === null ? nf(e) : fe = t, xu.current = null;
}
function nf(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = kp(n, t), n !== null) {
        n.flags &= 32767, fe = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        pe = 6, fe = null;
        return;
      }
    } else if (n = Sp(n, t, Ae), n !== null) {
      fe = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      fe = t;
      return;
    }
    fe = t = e;
  } while (t !== null);
  pe === 0 && (pe = 5);
}
function sn(e, t, n) {
  var r = H, l = Je.transition;
  try {
    Je.transition = null, H = 1, Rp(e, t, n, r);
  } finally {
    Je.transition = l, H = r;
  }
  return null;
}
function Rp(e, t, n, r) {
  do
    Wn();
  while ($t !== null);
  if (B & 6) throw Error(S(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(S(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (cd(e, o), e === ge && (fe = ge = null, we = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || pl || (pl = !0, of(Rl, function() {
    return Wn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Je.transition, Je.transition = null;
    var i = H;
    H = 1;
    var u = B;
    B |= 4, xu.current = null, Cp(e, n), Jc(n, e), Jd(di), Pl = !!fi, di = fi = null, e.current = n, _p(n), td(), B = u, H = i, Je.transition = o;
  } else e.current = n;
  if (pl && (pl = !1, $t = e, Yl = l), o = e.pendingLanes, o === 0 && (Vt = null), ld(n.stateNode), Fe(e, ie()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Xl) throw Xl = !1, e = Pi, Pi = null, e;
  return Yl & 1 && e.tag !== 0 && Wn(), o = e.pendingLanes, o & 1 ? e === Li ? wr++ : (wr = 0, Li = e) : wr = 0, Zt(), null;
}
function Wn() {
  if ($t !== null) {
    var e = Da(Yl), t = Je.transition, n = H;
    try {
      if (Je.transition = null, H = 16 > e ? 16 : e, $t === null) var r = !1;
      else {
        if (e = $t, $t = null, Yl = 0, B & 6) throw Error(S(331));
        var l = B;
        for (B |= 4, j = e.current; j !== null; ) {
          var o = j, i = o.child;
          if (j.flags & 16) {
            var u = o.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var c = u[s];
                for (j = c; j !== null; ) {
                  var g = j;
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      vr(8, g, o);
                  }
                  var p = g.child;
                  if (p !== null) p.return = g, j = p;
                  else for (; j !== null; ) {
                    g = j;
                    var h = g.sibling, w = g.return;
                    if (Xc(g), g === c) {
                      j = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = w, j = h;
                      break;
                    }
                    j = w;
                  }
                }
              }
              var k = o.alternate;
              if (k !== null) {
                var y = k.child;
                if (y !== null) {
                  k.child = null;
                  do {
                    var D = y.sibling;
                    y.sibling = null, y = D;
                  } while (y !== null);
                }
              }
              j = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, j = i;
          else e: for (; j !== null; ) {
            if (o = j, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                vr(9, o, o.return);
            }
            var f = o.sibling;
            if (f !== null) {
              f.return = o.return, j = f;
              break e;
            }
            j = o.return;
          }
        }
        var a = e.current;
        for (j = a; j !== null; ) {
          i = j;
          var d = i.child;
          if (i.subtreeFlags & 2064 && d !== null) d.return = i, j = d;
          else e: for (i = a; j !== null; ) {
            if (u = j, u.flags & 2048) try {
              switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  io(9, u);
              }
            } catch (E) {
              le(u, u.return, E);
            }
            if (u === i) {
              j = null;
              break e;
            }
            var v = u.sibling;
            if (v !== null) {
              v.return = u.return, j = v;
              break e;
            }
            j = u.return;
          }
        }
        if (B = l, Zt(), ht && typeof ht.onPostCommitFiberRoot == "function") try {
          ht.onPostCommitFiberRoot(ql, e);
        } catch (E) {
        }
        r = !0;
      }
      return r;
    } finally {
      H = n, Je.transition = t;
    }
  }
  return !1;
}
function Vs(e, t, n) {
  t = Yn(n, t), t = Dc(e, t, 1), e = Ht(e, t, 1), t = je(), e !== null && (Ar(e, 1, t), Fe(e, t));
}
function le(e, t, n) {
  if (e.tag === 3) Vs(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Vs(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Vt === null || !Vt.has(r))) {
        e = Yn(n, e), e = Fc(t, e, 1), t = Ht(t, e, 1), e = je(), t !== null && (Ar(t, 1, e), Fe(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Mp(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = je(), e.pingedLanes |= e.suspendedLanes & n, ge === e && (we & n) === n && (pe === 4 || pe === 3 && (we & 130023424) === we && 500 > ie() - Su ? pn(e, 0) : wu |= n), Fe(e, t);
}
function rf(e, t) {
  t === 0 && (e.mode & 1 ? (t = rl, rl <<= 1, !(rl & 130023424) && (rl = 4194304)) : t = 1);
  var n = je();
  e = _t(e, t), e !== null && (Ar(e, t, n), Fe(e, n));
}
function Pp(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), rf(e, n);
}
function Lp(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(S(314));
  }
  r !== null && r.delete(t), rf(e, n);
}
var lf;
lf = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Oe.current) Ie = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Ie = !1, wp(e, t, n);
    Ie = !!(e.flags & 131072);
  }
  else Ie = !1, b && t.flags & 1048576 && sc(t, Al, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      El(e, t), e = t.pendingProps;
      var l = Vn(t, _e.current);
      Bn(t, n), l = hu(null, t, r, e, l, n);
      var o = mu();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, De(r) ? (o = !0, Fl(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, au(t), l.updater = oo, t.stateNode = l, l._reactInternals = t, Si(t, r, e, n), t = Ci(null, t, r, !0, o, n)) : (t.tag = 0, b && o && nu(t), ze(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (El(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Op(r), e = rt(r, e), l) {
          case 0:
            t = Ei(null, t, r, e, n);
            break e;
          case 1:
            t = Is(null, t, r, e, n);
            break e;
          case 11:
            t = Ps(null, t, r, e, n);
            break e;
          case 14:
            t = Ls(null, t, r, rt(r.type, e), n);
            break e;
        }
        throw Error(S(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : rt(r, l), Ei(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : rt(r, l), Is(e, t, r, l, n);
    case 3:
      e: {
        if (Bc(t), e === null) throw Error(S(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, hc(e, t), Wl(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = Yn(Error(S(423)), t), t = Os(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = Yn(Error(S(424)), t), t = Os(e, t, r, n, l);
          break e;
        } else for (Ue = Wt(t.stateNode.containerInfo.firstChild), Be = t, b = !0, ot = null, n = dc(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Qn(), r === l) {
            t = Nt(e, t, n);
            break e;
          }
          ze(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return mc(t), e === null && vi(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, pi(r, l) ? i = null : o !== null && pi(r, o) && (t.flags |= 32), Uc(e, t), ze(e, t, i, n), t.child;
    case 6:
      return e === null && vi(t), null;
    case 13:
      return Wc(e, t, n);
    case 4:
      return cu(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Kn(t, null, r, n) : ze(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : rt(r, l), Ps(e, t, r, l, n);
    case 7:
      return ze(e, t, t.pendingProps, n), t.child;
    case 8:
      return ze(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ze(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, K(Ul, r._currentValue), r._currentValue = i, o !== null) if (st(o.value, i)) {
          if (o.children === l.children && !Oe.current) {
            t = Nt(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var u = o.dependencies;
          if (u !== null) {
            i = o.child;
            for (var s = u.firstContext; s !== null; ) {
              if (s.context === r) {
                if (o.tag === 1) {
                  s = kt(-1, n & -n), s.tag = 2;
                  var c = o.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var g = c.pending;
                    g === null ? s.next = s : (s.next = g.next, g.next = s), c.pending = s;
                  }
                }
                o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), xi(
                  o.return,
                  n,
                  t
                ), u.lanes |= n;
                break;
              }
              s = s.next;
            }
          } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (i = o.return, i === null) throw Error(S(341));
            i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), xi(i, n, t), i = o.sibling;
          } else i = o.child;
          if (i !== null) i.return = o;
          else for (i = o; i !== null; ) {
            if (i === t) {
              i = null;
              break;
            }
            if (o = i.sibling, o !== null) {
              o.return = i.return, i = o;
              break;
            }
            i = i.return;
          }
          o = i;
        }
        ze(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, Bn(t, n), l = Ze(l), r = r(l), t.flags |= 1, ze(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = rt(r, t.pendingProps), l = rt(r.type, l), Ls(e, t, r, l, n);
    case 15:
      return $c(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : rt(r, l), El(e, t), t.tag = 1, De(r) ? (e = !0, Fl(t)) : e = !1, Bn(t, n), Oc(t, r, l), Si(t, r, l, n), Ci(null, t, r, !0, e, n);
    case 19:
      return Hc(e, t, n);
    case 22:
      return Ac(e, t, n);
  }
  throw Error(S(156, t.tag));
};
function of(e, t) {
  return Pa(e, t);
}
function Ip(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ge(e, t, n, r) {
  return new Ip(e, t, n, r);
}
function _u(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Op(e) {
  if (typeof e == "function") return _u(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Vi) return 11;
    if (e === Qi) return 14;
  }
  return 2;
}
function Kt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ge(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Nl(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") _u(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case Nn:
      return hn(n.children, l, o, t);
    case Hi:
      i = 8, l |= 8;
      break;
    case Qo:
      return e = Ge(12, n, t, l | 2), e.elementType = Qo, e.lanes = o, e;
    case Ko:
      return e = Ge(13, n, t, l), e.elementType = Ko, e.lanes = o, e;
    case Xo:
      return e = Ge(19, n, t, l), e.elementType = Xo, e.lanes = o, e;
    case ma:
      return so(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case pa:
          i = 10;
          break e;
        case ha:
          i = 9;
          break e;
        case Vi:
          i = 11;
          break e;
        case Qi:
          i = 14;
          break e;
        case Lt:
          i = 16, r = null;
          break e;
      }
      throw Error(S(130, e == null ? e : typeof e, ""));
  }
  return t = Ge(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function hn(e, t, n, r) {
  return e = Ge(7, e, r, t), e.lanes = n, e;
}
function so(e, t, n, r) {
  return e = Ge(22, e, r, t), e.elementType = ma, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Bo(e, t, n) {
  return e = Ge(6, e, null, t), e.lanes = n, e;
}
function Wo(e, t, n) {
  return t = Ge(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Dp(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = ko(0), this.expirationTimes = ko(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ko(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Nu(e, t, n, r, l, o, i, u, s) {
  return e = new Dp(e, t, n, u, s), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Ge(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, au(o), e;
}
function Fp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: _n, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function uf(e) {
  if (!e) return Yt;
  e = e._reactInternals;
  e: {
    if (Sn(e) !== e || e.tag !== 1) throw Error(S(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (De(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(S(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (De(n)) return ic(e, n, t);
  }
  return t;
}
function sf(e, t, n, r, l, o, i, u, s) {
  return e = Nu(n, r, !0, e, l, o, i, u, s), e.context = uf(null), n = e.current, r = je(), l = Qt(n), o = kt(r, l), o.callback = t != null ? t : null, Ht(n, o, l), e.current.lanes = l, Ar(e, l, r), Fe(e, r), e;
}
function ao(e, t, n, r) {
  var l = t.current, o = je(), i = Qt(l);
  return n = uf(n), t.context === null ? t.context = n : t.pendingContext = n, t = kt(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Ht(l, t, i), e !== null && (ut(e, l, i, o), wl(e, l, i)), i;
}
function Jl(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Qs(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Tu(e, t) {
  Qs(e, t), (e = e.alternate) && Qs(e, t);
}
function $p() {
  return null;
}
var af = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function zu(e) {
  this._internalRoot = e;
}
co.prototype.render = zu.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(S(409));
  ao(e, t, null, null);
};
co.prototype.unmount = zu.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    xn(function() {
      ao(null, e, null, null);
    }), t[Ct] = null;
  }
};
function co(e) {
  this._internalRoot = e;
}
co.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Aa();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Ot.length && t !== 0 && t < Ot[n].priority; n++) ;
    Ot.splice(n, 0, e), n === 0 && Ba(e);
  }
};
function ju(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function fo(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Ks() {
}
function Ap(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = Jl(i);
        o.call(c);
      };
    }
    var i = sf(t, r, e, 0, null, !1, !1, "", Ks);
    return e._reactRootContainer = i, e[Ct] = i.current, jr(e.nodeType === 8 ? e.parentNode : e), xn(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function() {
      var c = Jl(s);
      u.call(c);
    };
  }
  var s = Nu(e, 0, !1, null, null, !1, !1, "", Ks);
  return e._reactRootContainer = s, e[Ct] = s.current, jr(e.nodeType === 8 ? e.parentNode : e), xn(function() {
    ao(t, s, n, r);
  }), s;
}
function po(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var u = l;
      l = function() {
        var s = Jl(i);
        u.call(s);
      };
    }
    ao(t, i, e, l);
  } else i = Ap(n, t, e, l, r);
  return Jl(i);
}
Fa = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = cr(t.pendingLanes);
        n !== 0 && (Yi(t, n | 1), Fe(t, ie()), !(B & 6) && (Gn = ie() + 500, Zt()));
      }
      break;
    case 13:
      xn(function() {
        var r = _t(e, 1);
        if (r !== null) {
          var l = je();
          ut(r, e, 1, l);
        }
      }), Tu(e, 1);
  }
};
Gi = function(e) {
  if (e.tag === 13) {
    var t = _t(e, 134217728);
    if (t !== null) {
      var n = je();
      ut(t, e, 134217728, n);
    }
    Tu(e, 134217728);
  }
};
$a = function(e) {
  if (e.tag === 13) {
    var t = Qt(e), n = _t(e, t);
    if (n !== null) {
      var r = je();
      ut(n, e, t, r);
    }
    Tu(e, t);
  }
};
Aa = function() {
  return H;
};
Ua = function(e, t) {
  var n = H;
  try {
    return H = e, t();
  } finally {
    H = n;
  }
};
ri = function(e, t, n) {
  switch (t) {
    case "input":
      if (Jo(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = no(r);
            if (!l) throw Error(S(90));
            ya(r), Jo(r, l);
          }
        }
      }
      break;
    case "textarea":
      xa(e, n);
      break;
    case "select":
      t = n.value, t != null && Fn(e, !!n.multiple, t, !1);
  }
};
Na = ku;
Ta = xn;
var Up = { usingClientEntryPoint: !1, Events: [Br, Rn, no, Ca, _a, ku] }, ur = { findFiberByHostInstance: cn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Bp = { bundleType: ur.bundleType, version: ur.version, rendererPackageName: ur.rendererPackageName, rendererConfig: ur.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Tt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ra(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: ur.findFiberByHostInstance || $p, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined") {
  var hl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!hl.isDisabled && hl.supportsFiber) try {
    ql = hl.inject(Bp), ht = hl;
  } catch (e) {
  }
}
He.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Up;
He.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ju(t)) throw Error(S(200));
  return Fp(e, t, null, n);
};
He.createRoot = function(e, t) {
  if (!ju(e)) throw Error(S(299));
  var n = !1, r = "", l = af;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Nu(e, 1, !1, null, null, n, !1, r, l), e[Ct] = t.current, jr(e.nodeType === 8 ? e.parentNode : e), new zu(t);
};
He.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(S(188)) : (e = Object.keys(e).join(","), Error(S(268, e)));
  return e = Ra(t), e = e === null ? null : e.stateNode, e;
};
He.flushSync = function(e) {
  return xn(e);
};
He.hydrate = function(e, t, n) {
  if (!fo(t)) throw Error(S(200));
  return po(null, e, t, !0, n);
};
He.hydrateRoot = function(e, t, n) {
  if (!ju(e)) throw Error(S(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = af;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = sf(t, null, e, 1, n != null ? n : null, l, !1, o, i), e[Ct] = t.current, jr(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new co(t);
};
He.render = function(e, t, n) {
  if (!fo(t)) throw Error(S(200));
  return po(null, e, t, !1, n);
};
He.unmountComponentAtNode = function(e) {
  if (!fo(e)) throw Error(S(40));
  return e._reactRootContainer ? (xn(function() {
    po(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ct] = null;
    });
  }), !0) : !1;
};
He.unstable_batchedUpdates = ku;
He.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!fo(n)) throw Error(S(200));
  if (e == null || e._reactInternals === void 0) throw Error(S(38));
  return po(e, t, n, !1, r);
};
He.version = "18.3.1-next-f1338f8080-20240426";
function cf() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ == "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cf);
    } catch (e) {
      console.error(e);
    }
}
cf(), aa.exports = He;
var Wp = aa.exports, ff, Xs = Wp;
ff = Xs.createRoot, Xs.hydrateRoot;
const Ys = [
  "#39ff14",
  // lima
  "#ff2fbf",
  // fucsia
  "#00e5ff",
  // cian
  "#ff6b6b",
  // coral
  "#ffd93d",
  // amarillo
  "#7c3aed"
  // violeta
], Gs = { "#39ff14": 110, "#ff2fbf": 320, "#00e5ff": 190, "#ff6b6b": 0, "#ffd93d": 55, "#7c3aed": 265 };
function Js(e) {
  return Ys[(e - 1) % Ys.length];
}
function an(e) {
  const t = Math.floor((e - 1) / 10) + 1, n = (e - 1) % 10 + 1, r = Vp.worlds[t - 1];
  return r ? {
    world: t,
    levelInWorld: n,
    tiles: r.tiles[n - 1] || r.tiles[0],
    time: r.time[n - 1] || r.time[0],
    mechanics: r.mechanics[n - 1] || r.mechanics[0]
  } : {
    world: t,
    levelInWorld: n,
    tiles: Math.min(4 + Math.floor(e / 3), 10),
    time: Math.max(35 - Math.floor(e / 2), 12),
    mechanics: ["touch"]
  };
}
function Hp(e) {
  return an(e).tiles;
}
function Ho(e) {
  return an(e).time;
}
const Zs = [
  // Escalas y motivos base
  [262, 294, 330, 349, 392, 440, 494, 523, 494, 440, 392, 349, 330, 294, 262],
  [523, 494, 440, 392, 349, 330, 294, 262],
  // Populares (fragmentos cortos 5–15 notas)
  [262, 262, 262, 294, 330, 330, 330, 294, 262, 262, 294, 330, 262],
  // La cucaracha (inicio)
  [262, 262, 392, 392, 440, 440, 392, 349, 349, 330, 330, 294, 294, 262],
  // Twinkle
  [294, 294, 330, 294, 262, 220, 196, 220, 262],
  // Seven Nation Army
  [392, 440, 494, 440, 392, 392, 440, 494, 440, 392, 330, 349, 392],
  // Bella Ciao
  [392, 392, 440, 392, 349, 330, 330, 349, 392, 349, 330],
  // Shape of You
  [330, 349, 392, 330, 349, 392, 349, 330, 294, 262],
  // Despacito
  [294, 294, 440, 440, 349, 349, 262, 262],
  // Smells Like Teen Spirit
  [392, 392, 392, 330, 392, 392, 392, 330, 294],
  // We Will Rock You
  // Añadidas
  [659, 494, 523, 587, 523, 494, 440, 440, 523, 659, 587, 523, 494],
  // Tetris A
  [659, 784, 740, 659, 988, 932, 880, 740, 932, 988],
  // Hedwig's Theme (inicio)
  [392, 392, 392, 311, 466, 392, 311, 466, 392],
  // Imperial March
  [330, 330, 349, 392, 392, 349, 330, 294, 262, 262, 294, 330, 330, 294, 294],
  // Ode to Joy
  [392, 392, 440, 392, 523, 494],
  // Happy Birthday (arranque)
  [659, 659, 659, 523, 659, 784, 392, 523],
  // Super Mario (arranque)
  [440, 587, 659, 587, 659, 587, 523, 659, 587, 440],
  // Zelda's Lullaby
  [330, 392, 440, 330, 392, 440, 494, 523, 494, 440, 392, 349],
  // Pirates (motivo)
  [392, 392, 392, 392, 392, 392, 392, 494, 330, 349, 392],
  // Jingle Bells
  [392, 440, 392, 349, 294, 294, 349, 392, 440, 392, 349, 330]
  // Titanic (motivo)
], Vp = {
  worlds: [
    {
      id: 1,
      mechanics: [["touch"], ["touch"], ["touch"], ["touch"], ["touch"], ["touch"], ["touch"], ["touch"], ["touch"], ["touch"]],
      tiles: [4, 4, 5, 5, 6, 6, 7, 7, 8, 8],
      time: [35, 32, 30, 28, 26, 24, 22, 20, 18, 16],
      notes: "Mundo 1 — introducción y aprendizaje."
    },
    {
      id: 2,
      mechanics: [["drag"], ["drag"], ["drag"], ["drag"], ["drag"], ["drag"], ["drag"], ["drag"], ["drag"], ["drag"]],
      tiles: [4, 4, 5, 5, 6, 6, 7, 8, 8, 9],
      time: [32, 30, 28, 26, 24, 22, 20, 18, 17, 16],
      notes: "Mundo 2 — introduce y domina arrastre."
    },
    {
      id: 3,
      mechanics: [["drag"], ["drag"], ["drag"], ["drag"], ["drag"], ["drag"], ["drag"], ["drag"], ["drag"], ["drag"]],
      tiles: [5, 5, 6, 6, 7, 7, 8, 8, 9, 9],
      time: [30, 28, 26, 24, 22, 20, 18, 17, 16, 15],
      notes: "Mundo 3 — más fichas y menos tiempo."
    },
    {
      id: 4,
      mechanics: [["double"], ["double"], ["double"], ["drag", "double"], ["drag"], ["double"], ["drag", "double"], ["drag", "double"], ["double"], ["drag", "double"]],
      tiles: [5, 5, 6, 6, 7, 7, 8, 8, 9, 9],
      time: [30, 28, 26, 24, 22, 20, 18, 17, 16, 15],
      notes: "Mundo 4 — introduce doble toque y combina mecánicas."
    },
    {
      id: 5,
      mechanics: [["touch", "drag", "double"], ["touch", "drag", "double"], ["touch", "drag", "double"], ["touch", "drag", "double"], ["touch", "drag", "double"], ["touch", "drag", "double"], ["touch", "drag", "double"], ["touch", "drag", "double"], ["touch", "drag", "double"], ["touch", "drag", "double"]],
      tiles: [6, 7, 8, 8, 9, 9, 9, 9, 9, 9],
      time: [26, 24, 22, 20, 19, 18, 17, 16, 15, 14],
      notes: "Mundo 5 — dominio total de todas las mecánicas."
    }
  ]
};
function Qp(e, t = 0.15) {
  const n = R.useRef(null), r = R.useRef(null), l = R.useRef(null), o = typeof window != "undefined" ? window : {}, i = () => {
    if (!e) return null;
    try {
      if (!n.current) {
        const y = o.AudioContext || o.webkitAudioContext;
        if (!y) return null;
        n.current = new y();
      }
      return n.current;
    } catch (y) {
      return null;
    }
  }, u = (y = 440, D = 0.12, f = "sine", a = 0.07) => {
    const d = i();
    if (d)
      try {
        const v = d.createOscillator(), E = d.createGain();
        v.type = f, v.frequency.value = y, E.gain.value = a, v.connect(E), E.connect(d.destination), d.state === "suspended" && d.resume().catch(() => {
        });
        const z = d.currentTime;
        v.start(z), v.stop(z + D);
      } catch (v) {
      }
  }, s = (y, D = 0.12, f = 0.04) => {
    const a = i();
    if (!(!a || !y || !y.length))
      try {
        a.state === "suspended" && a.resume().catch(() => {
        }), y.forEach((d, v) => {
          const E = a.createOscillator(), z = a.createGain();
          E.type = "triangle", E.frequency.value = d, z.gain.value = 0.08, E.connect(z), z.connect(a.destination);
          const M = a.currentTime + v * (D + f);
          E.start(M), E.stop(M + D);
        });
      } catch (d) {
      }
  }, c = () => {
    if (!r.current)
      try {
        const y = new Audio("sistema_apps_api/lumetrix/audiofondo.mp3");
        y.loop = !0, y.volume = t, r.current = y;
      } catch (y) {
        console.log("Error cargando audio de fondo:", y);
      }
  }, g = (y = !0) => {
    if (!(!y || !r.current))
      try {
        r.current.play().catch((D) => {
          console.log("Error reproduciendo audio de fondo:", D);
        });
      } catch (D) {
      }
  }, p = () => {
    if (r.current)
      try {
        r.current.pause(), r.current.currentTime = 0;
      } catch (y) {
      }
  }, h = (y) => {
    r.current && (r.current.volume = y);
  }, w = () => {
    if (!l.current)
      try {
        const y = new Audio("sistema_apps_api/lumetrix/jugar.mp3");
        y.volume = 0.7, l.current = y;
      } catch (y) {
        console.log("Error cargando audio de inicio:", y);
      }
  }, k = () => {
    if (!(!e || !l.current))
      try {
        l.current.currentTime = 0, l.current.play().catch((y) => {
          console.log("Error reproduciendo audio de inicio:", y);
        });
      } catch (y) {
      }
  };
  return {
    start: () => {
      k();
    },
    ok: (y) => u(y || 880, 0.1, "triangle", 0.07),
    fail: () => u(260, 0.12, "sine", 0.045),
    // suave "meck"
    blink: (y) => u(y || 720, 0.12, "sine", 0.08),
    // Victoria: siempre trozo corto (5–6 notas) + retraso 300ms
    winMelody: (y) => {
      const D = y && y.length ? y.slice(0, 6) : [659.25, 880, 1046.5];
      setTimeout(() => s(D, 0.12, 0.04), 300);
    },
    // Audio de fondo
    initBg: c,
    startBg: g,
    stopBg: p,
    updateVolume: h,
    // Audio de inicio
    initStart: w
  };
}
function on(e, t) {
  try {
    t && navigator.vibrate && navigator.vibrate(e);
  } catch (n) {
  }
}
function Kp() {
  R.useEffect(() => {
    const e = "lumetrix-css";
    if (document.getElementById(e)) return;
    const t = document.createElement("style");
    return t.id = e, t.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Tektur:wght@400;500;600;700;800;900&display=swap');
      :root{ --bg:#000; --fg:#e5e7eb; --muted:#9ca3af; --neon1:#ff2fbf; --neon2:#00e5ff; --accent:#39ff14; }
      *{box-sizing:border-box}
      html,body,#root{height:100%}
      body{margin:0;background:#000;color:#fff;font-family:'Tektur', sans-serif}
      .shell{min-height:100svh;display:flex;align-items:stretch;justify-content:center}
      .device{width:min(390px,100vw);height:100svh;background:#000;position:relative;overflow:hidden}
      @media (min-width:768px){.shell{padding:24px}.device{height:844px;border-radius:24px;border:1px solid #ffffff1a;box-shadow:0 0 0 8px #ffffff08}}
      .screen{position:absolute;inset:0}
      /* Intro */
      .introWrap{position:relative;height:100%;display:flex;align-items:center;justify-content:center;padding:12px;box-sizing:border-box}
      .introBg{position:absolute;inset:12px}
      .introBg i{position:absolute;border-radius:10px;opacity:.6;filter:blur(.5px)}
      .panel{position:relative;z-index:2;width:100%;max-width:300px;border-radius:16px;padding:40px 24px;background:#11111135;border:3px solid #00e5ff;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:0 0 22px rgba(0,0,0,.55);margin:0 20px;display:flex;flex-direction:column;justify-content:flex-start}
      .logo{font-weight:900;text-align:center;margin:0 0 8px;letter-spacing:.18em;line-height:1;display:flex;justify-content:center;align-items:center}
      .logo span{display:inline-block;background:linear-gradient(90deg,var(--neon1),var(--neon2));-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 8px #ff2fbf59,0 0 12px #00e5ff47}
      .actions{display:flex;gap:8px;justify-content:center}
      .btn{appearance:none;border-radius:12px;border:1px solid #ffffff44;background:transparent;color:#fff;font-weight:700;padding:12px 18px;cursor:pointer;font-size:16px}
      .btn-start{appearance:none;border-radius:16px;border:2px solid #39ff14;background:rgba(57,255,20,0.1);color:#39ff14;font-weight:900;padding:20px 32px;cursor:pointer;font-size:20px;box-shadow:0 0 20px rgba(57,255,20,0.3);transition:all 0.3s ease}
      .btn-start:hover{background:rgba(57,255,20,0.2);box-shadow:0 0 30px rgba(57,255,20,0.5);transform:scale(1.05)}
      .btn1{border-color:#f0abfc99;color:#f0abfc}.btn1:hover{background:#ff2fbf22}
      .btn2{border-color:#7dd3fc99;color:#7dd3fc}.btn2:hover{background:#00e5ff22}
      .copy{position:absolute;left:0;right:0;bottom:24px;text-align:center;color:#ffffffb3;font-size:10px;z-index:3}
      /* HUD / Board */
      .topbar{display:flex;align-items:center;justify-content:space-between;padding:8px 10px}
      .brand{font-size:18px;font-weight:800;background:linear-gradient(90deg,var(--neon1),var(--neon2));-webkit-background-clip:text;background-clip:text;color:transparent}
      .icons{display:flex;gap:12px}
      .icon{width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;color:#fff;border:none;background:transparent;cursor:pointer}
      .hud{display:flex;align-items:center;gap:8px;padding:0 10px}
      .meta{display:flex;align-items:center;gap:6px;margin-left:4px;font-size:11px;opacity:.9}
      .chip{border:1px solid #ffffff33;border-radius:999px;padding:4px 12px;background:#ffffff10;box-shadow:0 0 4px #ffffff16}
      .meta .chip b{font-weight:700;margin-right:4px}
      .timebar{flex:1;height:12px;border-radius:999px;border:1px solid var(--accent);box-shadow:0 0 6px #ffffff22, 0 0 12px var(--accent)}
      .timefill{display:block;height:8px;margin:2px;border-radius:999px;background:linear-gradient(90deg,var(--accent),#fff);box-shadow:0 0 8px var(--accent);width:100%}
      .board{position:relative;margin:10px 10px 5px 10px;border-radius:16px;border:2px solid var(--accent);box-shadow:0 0 12px var(--accent);height:calc(100% - 105px);overflow:hidden}
      .tile{position:absolute;border-radius:12px;border:1px solid #ffffff2f;z-index:1;touch-action:manipulation;transition:filter .12s ease, transform .06s ease;cursor:pointer}
      .tile:active{transform:scale(.985)}
      .tile.dragging{transform:scale(1.1);z-index:100;box-shadow:0 0 20px rgba(255,255,255,0.5);cursor:grabbing}
      .drop-zone{border:3px solid #ffffff66;border-radius:12px;background:transparent;pointer-events:none;z-index:100}
      .drop-zone.drag-over{border-style:solid;transform:scale(1.1);box-shadow:0 0 25px currentColor}
      .lit{box-shadow:0 0 10px var(--accent), 0 0 18px var(--accent); filter:brightness(1.18)}
      .overlay{position:absolute;inset:0;display:grid;place-items:center;z-index:2}
      .modal{position:fixed;inset:0;background:#000c;display:flex;align-items:center;justify-content:center;z-index:50}
      .card{position:relative;width:280px;max-width:85vw;background:#000;border:1px solid #ffffff1f;border-radius:14px;box-shadow:0 0 12px #ff2fbf55;color:#fff;padding:16px;min-height:400px}
      .card-compact{position:relative;width:240px;max-width:80vw;background:#000;border:1px solid #ffffff1f;border-radius:14px;box-shadow:0 0 12px #ff2fbf55;color:#fff;padding:20px;min-height:180px;max-height:220px}
      .closer{position:absolute;right:-10px;top:-10px;width:32px;height:32px;border-radius:999px;background:#000b;border:1px solid #ffffff33;color:#fff;display:grid;place-items:center;cursor:pointer}
      .list{display:flex;flex-direction:column;gap:8px}
      .bokeh{pointer-events:none}
      .bokeh i{position:absolute;border-radius:999px;filter:blur(24px)}
      .b1{left:-10%;top:10%;width:220px;height:220px;background:var(--neon1);opacity:.16;animation:blob1 14s linear infinite}
      .b2{left:60%;top:-8%;width:280px;height:280px;background:var(--neon2);opacity:.14;animation:blob2 18s linear infinite}
      .b3{left:20%;bottom:-12%;width:260px;height:260px;background:#7c3aed;opacity:.12;animation:blob3 20s linear infinite}
      @keyframes blob1{0%{transform:translate(0,0)}50%{transform:translate(40px,10px)}100%{transform:translate(0,0)} }
      @keyframes blob2{0%{transform:translate(0,0)}50%{transform:translate(-30px,30px)}100%{transform:translate(0,0)} }
      @keyframes blob3{0%{transform:translate(0,0)}50%{transform:translate(20px,-30px)}100%{transform:translate(0,0)} }
      /* Líneas de neón en bordes */
      .neon-borders{position:absolute;inset:12px;pointer-events:none;z-index:5;border-radius:16px;overflow:hidden}
      .neon-line{position:absolute;box-shadow:0 0 10px currentColor, 0 0 20px currentColor;animation:neonFlow 4s linear infinite}
      .neon-line.top{top:0;left:0;right:0;height:3px;background:#ff2fbf;color:#ff2fbf;animation-delay:0s;border-radius:0 0 3px 3px}
      .neon-line.right{right:0;top:0;bottom:0;width:3px;background:#00e5ff;color:#00e5ff;animation-delay:1s;border-radius:3px 0 0 3px}
      .neon-line.bottom{bottom:0;left:0;right:0;height:3px;background:#39ff14;color:#39ff14;animation-delay:2s;border-radius:3px 3px 0 0}
      .neon-line.left{left:0;top:0;bottom:0;width:3px;background:#ff6b6b;color:#ff6b6b;animation-delay:3s;border-radius:0 3px 3px 0}
      @keyframes neonFlow{0%{opacity:0;transform:scaleX(0)}25%{opacity:1;transform:scaleX(1)}75%{opacity:1;transform:scaleX(1)}100%{opacity:0;transform:scaleX(0)} }
      @keyframes logoGlow{0%{filter:drop-shadow(0 0 20px #39ff14) drop-shadow(0 0 40px #00ffff) drop-shadow(0 0 60px #ff00ff)}50%{filter:drop-shadow(0 0 30px #ff00ff) drop-shadow(0 0 50px #39ff14) drop-shadow(0 0 80px #00ffff)}100%{filter:drop-shadow(0 0 25px #00ffff) drop-shadow(0 0 45px #ff00ff) drop-shadow(0 0 70px #39ff14)} }
    `, document.head.appendChild(t), () => {
      try {
        document.head.removeChild(t);
      } catch (n) {
      }
    };
  }, []);
}
function Xp({ onPlay: e, onAuth: t }) {
  const n = R.useRef(null), r = R.useRef(null), [l, o] = R.useState(!1), [i, u] = R.useState(null);
  return R.useEffect(() => {
    const s = n.current;
    if (!s) return;
    const g = setInterval(() => {
      const p = document.createElement("i"), h = 20 + Math.random() * 25, w = 40 + Math.random() * 60;
      let k, y;
      if (Math.random() < 0.7) {
        const d = [
          { x: [0, 15], y: [0, 100] },
          // Lado izquierdo
          { x: [85, 100], y: [0, 100] },
          // Lado derecho  
          { x: [0, 100], y: [0, 15] },
          // Parte superior
          { x: [0, 100], y: [85, 100] }
          // Parte inferior
        ], v = d[Math.floor(Math.random() * d.length)];
        k = v.x[0] + Math.random() * (v.x[1] - v.x[0]), y = v.y[0] + Math.random() * (v.y[1] - v.y[0]);
      } else
        k = Math.random() * 100, y = Math.random() * 100;
      p.style.left = k + "%", p.style.top = y + "%", p.style.width = h + "px", p.style.height = w + "px";
      const f = [0, 60, 120, 180, 240, 300, 45, 135, 225, 315], a = f[Math.floor(Math.random() * f.length)];
      p.style.background = `hsl(${a} 95% 65% / .9)`, s.appendChild(p), setTimeout(() => p.remove(), 3e3);
    }, 80);
    return () => clearInterval(g);
  }, []), R.useEffect(() => {
    const s = () => {
      var k;
      const g = r.current;
      if (!g) return;
      const p = (k = g.parentElement) == null ? void 0 : k.parentElement;
      if (!p) return;
      g.style.fontSize = "";
      let h = Math.min(42, Math.max(28, Math.floor(p.clientWidth * 0.16)));
      g.style.fontSize = h + "px", g.style.letterSpacing = "0.16em";
      let w = 0;
      for (; g.scrollWidth > p.clientWidth - 24 && w < 20; )
        h -= 1, g.style.fontSize = h + "px", w++;
    };
    s();
    const c = new ResizeObserver(s);
    return c.observe(document.body), () => c.disconnect();
  }, []), R.useEffect(() => {
    (async () => {
      try {
        if (window.LUM_AUTH && window.LUM_AUTH.lum_check) {
          const c = await window.LUM_AUTH.lum_check();
          c && c.success && (o(!0), u(c.user));
        }
      } catch (c) {
        console.log("No hay sesión activa");
      }
    })();
  }, []), /* @__PURE__ */ m.jsx("section", { className: "screen intro", children: /* @__PURE__ */ m.jsxs("div", { className: "introWrap", children: [
    /* @__PURE__ */ m.jsx("div", { className: "introBg", ref: n }),
    /* @__PURE__ */ m.jsxs("div", { className: "neon-borders", children: [
      /* @__PURE__ */ m.jsx("div", { className: "neon-line top" }),
      /* @__PURE__ */ m.jsx("div", { className: "neon-line right" }),
      /* @__PURE__ */ m.jsx("div", { className: "neon-line bottom" }),
      /* @__PURE__ */ m.jsx("div", { className: "neon-line left" })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "panel", children: [
      /* @__PURE__ */ m.jsxs("h1", { className: "logo", children: [
        /* @__PURE__ */ m.jsx("img", { src: "sistema_apps_api/lumetrix/img/logo.png", alt: "LUMETRIX", style: {
          height: "150px",
          width: "500px",
          filter: "drop-shadow(0 0 20px #39ff14) drop-shadow(0 0 40px #00ffff) drop-shadow(0 0 60px #ff00ff)",
          animation: "logoGlow 2s ease-in-out infinite alternate"
        }, onError: (s) => {
          s.target.style.display = "none", s.target.nextSibling.style.display = "block";
        } }),
        /* @__PURE__ */ m.jsx("div", { style: { display: "none", fontSize: "48px", fontWeight: "900", letterSpacing: "0.1em", background: "linear-gradient(90deg,#39ff14,#00ffff,#ff00ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", textShadow: "0 0 20px #39ff14,0 0 40px #00ffff,0 0 60px #ff00ff" }, children: "LUMETRIX" })
      ] }),
      /* @__PURE__ */ m.jsxs("div", { style: { textAlign: "center", fontSize: 18, opacity: 0.9, marginTop: 20, marginBottom: 8, lineHeight: "1.4", fontWeight: 500 }, children: [
        "Esto no es un Simón: es el ",
        /* @__PURE__ */ m.jsx("b", { children: "anti‑Simón" }),
        ".",
        /* @__PURE__ */ m.jsx("br", {}),
        /* @__PURE__ */ m.jsx("br", {}),
        /* @__PURE__ */ m.jsx("b", { children: "Encuentra" }),
        " la secuencia y pinta ",
        /* @__PURE__ */ m.jsx("b", { children: "todas" }),
        " las piezas del color del borde."
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: "actions", style: { marginTop: 20 }, children: [
        /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: e, children: "Jugar" }),
        !l && /* @__PURE__ */ m.jsx("button", { className: "btn btn2", onClick: t, children: "Iniciar sesión" })
      ] }),
      l && /* @__PURE__ */ m.jsxs("div", { style: { textAlign: "center", marginTop: 8 }, children: [
        /* @__PURE__ */ m.jsxs("div", { style: { fontSize: 16, opacity: 0.8, color: "#39ff14", fontWeight: 600 }, children: [
          "¡Hola, ",
          (i == null ? void 0 : i.username) || "Usuario",
          "!"
        ] }),
        /* @__PURE__ */ m.jsx("button", { className: "btn btn2", onClick: t, style: { marginTop: 4, fontSize: 11 }, children: "Cerrar sesión" })
      ] })
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: "copy", style: { fontSize: "14px", fontWeight: 500 }, children: "© @intocables13 · Todos los derechos reservados" })
  ] }) });
}
function Yp({ level: e, setLevel: t, soundOn: n, musicOn: r, musicVolume: l, vibrateOn: o, onOpenAuth: i, onOpenRanking: u, onOpenOptions: s, onTotalUpdate: c, totalTime: g }) {
  const p = R.useRef(null), [h, w] = R.useState(Ho(e)), [k, y] = R.useState(!1), [D, f] = R.useState(!1), [a, d] = R.useState(!1), [v, E] = R.useState(!1), [z, M] = R.useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0;
    } catch (x) {
      return 0;
    }
  });
  R.useEffect(() => {
    typeof g == "number" && M(g);
  }, [g]);
  const C = Qp(n, l), Q = Math.floor((e - 1) / 10) + 1, F = (e - 1) % 10 + 1, ue = R.useMemo(() => Js(e), [e]);
  R.useEffect(() => {
    C.initBg(), C.initStart();
    const x = setTimeout(() => {
      C.startBg(r);
    }, 1e3);
    return () => clearTimeout(x);
  }, [C, r]), R.useEffect(() => {
    r ? C.startBg(!0) : C.stopBg();
  }, [r, C]), R.useEffect(() => {
    C.updateVolume(l);
  }, [l, C]);
  const qt = (x) => {
    const _ = an(x), L = _.mechanics, U = Math.floor((x - 1) / 10) + 1;
    if (console.log(`CACHE_ROTO_NUEVO_CODIGO_FUNCIONANDO_Nivel_${x}_mechanics_`, L), L.includes("drag") && L.includes("double")) {
      console.log("COMBO DETECTADO: drag + double");
      const T = _.tiles, P = Math.max(1, Math.floor(T / 4)), Y = Math.max(1, Math.floor(T / 4)), ae = [...Array.from({ length: T }, (Te, $e) => $e)].sort(() => Math.random() - 0.5), ce = new Set(ae.slice(0, P)), ve = new Set(ae.slice(P, P + Y)), oe = new Set(ae.slice(P + Y));
      if (Hr(ce), Vr(ve), Qr(oe), gt(ve), yt.current = ve, ce.size > 0) {
        const Te = Array.from(ce)[0];
        I(Te), X.current = Te, mo(Te);
      } else
        I(null), X.current = null, mo(null);
      console.log("COMBO: dragTiles=", Array.from(new Set(ae.slice(0, P)))), console.log("COMBO: doubleTiles=", Array.from(ve)), console.log("COMBO: touchTiles=", Array.from(new Set(ae.slice(P + Y))));
    } else if (L.includes("double") && !L.includes("drag")) {
      console.log(`DEBUG: Nivel ${x} - detectado como doble toque. mechanics=`, L);
      const T = 1, P = /* @__PURE__ */ new Set();
      for (; P.size < T; ) {
        const Y = Math.floor(Math.random() * _.tiles);
        P.add(Y);
      }
      console.log(`Mundo ${U}, Nivel ${x}: Fichas de doble toque = [${Array.from(P)}], Total fichas = ${_.tiles}`), yt.current = P, gt(P), Hr(/* @__PURE__ */ new Set()), Vr(/* @__PURE__ */ new Set()), Qr(/* @__PURE__ */ new Set()), mo(null), I(null), X.current = null;
    } else if (U >= 2 && L.includes("drag")) {
      const T = _.tiles, P = Array.from({ length: T - 1 }, (ae, ce) => ce + 1), Y = Math.floor(Math.random() * P.length), G = P[Y];
      console.log(`Mundo ${U}, Nivel ${x}: Ficha especial = ${G}, Total fichas = ${T}`), I(G), X.current = G, yt.current.clear(), gt(/* @__PURE__ */ new Set()), Hr(/* @__PURE__ */ new Set()), Vr(/* @__PURE__ */ new Set()), Qr(/* @__PURE__ */ new Set());
    } else
      yt.current.clear(), gt(/* @__PURE__ */ new Set()), Hr(/* @__PURE__ */ new Set()), Vr(/* @__PURE__ */ new Set()), Qr(/* @__PURE__ */ new Set()), I(null), X.current = null;
    Qe.current.clear(), kn(/* @__PURE__ */ new Set());
  }, [bt, ho] = R.useState([]), [se, be] = R.useState(null), [Pe, N] = R.useState(null), [O, I] = R.useState(null), W = R.useRef(null), re = R.useRef({ x: 0, y: 0 }), et = R.useRef({ x: 0, y: 0 }), X = R.useRef(null), ye = R.useRef(null), [zt, gt] = R.useState(/* @__PURE__ */ new Set()), yt = R.useRef(/* @__PURE__ */ new Set()), [bp, kn] = R.useState(/* @__PURE__ */ new Set()), Qe = R.useRef(/* @__PURE__ */ new Set()), [df, Hr] = R.useState(/* @__PURE__ */ new Set()), [Ru, Vr] = R.useState(/* @__PURE__ */ new Set()), [e0, Qr] = R.useState(/* @__PURE__ */ new Set()), [t0, mo] = R.useState(null), tt = R.useRef([]), Ne = R.useRef(0), jt = R.useRef(null), en = R.useRef(!1), Mu = (x, _, L, U, T = 48) => {
    if (!L || !U) return !1;
    const P = U.getBoundingClientRect(), Y = x - P.left, G = _ - P.top;
    return Y > L.x - T && Y < L.x + L.w + T && G > L.y - T && G < L.y + L.h + T;
  }, Pu = (x) => {
    var L;
    const _ = (L = p.current) == null ? void 0 : L.querySelector(`.tile[data-id="${x}"]`);
    if (_) {
      const U = parseFloat(_.dataset.pitch || "880");
      _.style.background = tn.current || ue, _.style.pointerEvents = "none", _.style.opacity = "0.7", C.ok(U), on(20, o);
    }
  }, Lu = () => {
    if (Ne.current++, Ne.current >= tt.current.length) {
      if (!nn.current) {
        nn.current = !0;
        const x = Math.ceil((Date.now() - Kr.current) / 1e3);
        go(x);
        try {
          window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
            method: "POST",
            body: JSON.stringify({
              level: e,
              total_time_s: x,
              success: 1
            })
          }).catch((_) => {
            console.log("No hay sesión activa para guardar progreso");
          });
        } catch (_) {
        }
      }
      jt.current && clearInterval(jt.current), y(!1), en.current = !1, f(!0);
      try {
        C.winMelody((Xr.current || []).slice(0, 6));
      } catch (x) {
      }
    }
  }, Iu = () => {
    C.fail(), on(80, o), Ne.current = 0, Gr(), Qe.current.clear(), kn(/* @__PURE__ */ new Set());
    const x = p.current;
    if (x && X.current !== null && ye.current) {
      const _ = x.querySelector(`.tile[data-id="${X.current}"]`);
      _ && (_.style.position = "absolute", _.style.left = `${ye.current.x}px`, _.style.top = `${ye.current.y}px`, _.style.width = `${ye.current.width}px`, _.style.height = `${ye.current.height}px`, _.style.zIndex = "", _.style.pointerEvents = "", _.classList.remove("dragging"), console.log(`Ficha especial ${X.current} reposicionada a su lugar original:`, ye.current));
    }
  }, Kr = R.useRef(0), Xr = R.useRef([]), tn = R.useRef(ue), nn = R.useRef(!1);
  R.useEffect(() => {
    var _;
    const x = (_ = p.current) == null ? void 0 : _.closest(".device");
    x && x.style.setProperty("--accent", ue);
  }, [ue]);
  const go = (x) => {
    try {
      const L = (Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0) + x;
      localStorage.setItem("lum_total", JSON.stringify(L)), M(L), typeof c == "function" && c(L);
    } catch (_) {
    }
  };
  function pf(x, _ = null, L = null) {
    var Rt;
    const U = L || yt.current;
    console.log(`placeTiles llamado: n=${x}, currentSpecialId=${_}, doubleTouchTiles=`, Array.from(U));
    const T = p.current;
    if (!T) return;
    T.querySelectorAll(".tile, .dropzone").forEach(($) => $.remove());
    const P = T.getBoundingClientRect(), Y = P.width, G = P.height, ae = ($, he) => Math.random() * (he - $) + $, ce = (Rt = Gs[tn.current || ue]) != null ? Rt : 0, ve = () => {
      let $ = Math.floor(Math.random() * 360), he = 0;
      for (; Math.min(Math.abs($ - ce), 360 - Math.abs($ - ce)) < 30 && he++ < 120; )
        $ = Math.floor(Math.random() * 360);
      return $;
    };
    let oe = null;
    Math.floor((e - 1) / 10) + 1 >= 2 && _ !== null && (oe = "hsl(300 96% 58%)");
    const $e = [], at = /* @__PURE__ */ new Set();
    for (let $ = 0; $ < x; $++) {
      let he = 0, Ke = 0, rn = 0, Mt = 0, Jr = !1, gf = 0;
      for (; !Jr && gf++ < 300; )
        he = Math.max(56, Math.min(140, 60 + Math.random() * 80)), Ke = Math.max(56, Math.min(160, 60 + Math.random() * 100)), rn = Math.max(8, Math.min(Y - he - 8, ae(0, Y - he))), Mt = Math.max(8, Math.min(G - Ke - 8, ae(0, G - Ke))), Jr = !$e.some((J) => !(rn + he <= J.x || J.x + J.w <= rn || Mt + Ke <= J.y || J.y + J.h <= Mt));
      $e.push({ x: rn, y: Mt, w: he, h: Ke });
      const V = document.createElement("button");
      V.type = "button", V.className = "tile";
      let En;
      if (_ === $ && oe)
        En = oe, at.add(oe);
      else {
        let J;
        do
          J = ve(), En = `hsl(${J} 96% 58%)`;
        while (at.has(En) || En === oe);
        at.add(En);
      }
      if (Object.assign(V.style, { left: rn + "px", top: Mt + "px", width: he + "px", height: Ke + "px", background: En }), V.style.background === (tn.current || ue)) {
        const J = ((Gs[tn.current || ue] || 0) + 180) % 360;
        V.style.background = `hsl(${J} 96% 58%)`;
      }
      V.dataset.id = String($), V.dataset.orig = V.style.background;
      const Fu = Xr.current || [];
      V.dataset.pitch = String(Fu[$ % Fu.length] || 660);
      const Zr = an(e).mechanics;
      if (Math.floor((e - 1) / 10) + 1 >= 2 && X.current === $ ? (V.style.cursor = "grab", V.addEventListener("pointerdown", (J) => Ou(J, { id: $ })), V.addEventListener("dragstart", (J) => J.preventDefault()), V.addEventListener("touchstart", (J) => J.preventDefault(), { passive: !1 }), setTimeout(() => {
        var $u;
        const J = V.getBoundingClientRect(), ln = ($u = p.current) == null ? void 0 : $u.getBoundingClientRect();
        ln && (ye.current = {
          x: J.left - ln.left,
          y: J.top - ln.top,
          width: J.width,
          height: J.height
        }, console.log("Posición original guardada:", ye.current));
      }, 50), console.log(`Ficha especial ${$} configurada para arrastre`)) : V.style.cursor = "pointer", Zr.includes("combo") || Zr.includes("touch") && Zr.includes("drag") && Zr.includes("double"))
        if (df.has($)) {
          const J = V.style.background;
          V.style.border = `1px solid ${J}`, V.style.boxShadow = `0 0 8px ${J}88`, V.style.cursor = "grab", V.addEventListener("pointerdown", (ln) => Ou(ln, $)), V.addEventListener("dragstart", (ln) => ln.preventDefault()), console.log(`Ficha ${$} marcada como ARRASTRE en COMBO`);
        } else Ru.has($) ? (V.style.setProperty("border", "2px solid white", "important"), V.style.setProperty("box-shadow", "0 0 0 2px transparent, 0 0 0 4px white, 0 0 0 6px transparent, 0 0 0 8px white", "important"), console.log(`Ficha ${$} marcada como doble toque en COMBO - BORDE DOBLE APLICADO`)) : (V.style.border = "1px solid rgba(255,255,255,0.2)", V.style.boxShadow = "none");
      else
        console.log(`Procesando ficha ${$}, doubleTouchTiles:`, Array.from(U), `¿Tiene ${$}?`, U.has($)), U.has($) && (V.style.setProperty("border", "2px solid white", "important"), V.style.setProperty("box-shadow", "0 0 0 2px transparent, 0 0 0 4px white, 0 0 0 6px transparent, 0 0 0 8px white", "important"), console.log(`🚨 CACHE ROOTO - Ficha ${$} marcada como doble toque - BORDES BLANCOS APLICADOS`));
      T.appendChild(V);
    }
    T.__lumDeleg && T.removeEventListener("pointerdown", T.__lumDeleg);
    const ct = ($) => {
      const he = $.target && $.target.closest && $.target.closest(".tile");
      if (!he || !T.contains(he) || !en.current) return;
      $.preventDefault && $.preventDefault();
      const Ke = Number(he.dataset.id);
      Math.floor((e - 1) / 10) + 1 >= 2 && X.current === Ke || Du(Ke);
    };
    T.addEventListener("pointerdown", ct, { passive: !1 }), T.__lumDeleg = ct;
  }
  function Yr(x) {
    const _ = p.current, L = _ && _.querySelector(`.tile[data-id="${x}"]`);
    if (!L) return;
    const U = L.style.background, T = L.style.border, P = L.style.boxShadow, Y = L.style.outline, G = L.style.outlineOffset;
    L.classList.add("lit"), L.style.background = tn.current || ue, C.blink(parseFloat(L.dataset.pitch || "720")), setTimeout(() => {
      L.classList.remove("lit"), L.style.background = U, yt.current.has(x) && (L.style.border = T, L.style.boxShadow = P, L.style.outline = Y, L.style.outlineOffset = G);
    }, 260);
  }
  function hf() {
    const x = tt.current;
    x && x.length && Yr(x[0]);
  }
  function Gr() {
    const x = p.current;
    x && x.querySelectorAll(".tile").forEach((_) => {
      _.style.background = _.dataset.orig || _.style.background, _.classList.remove("lit"), _.style.opacity = "1";
    });
  }
  function bn(x) {
    var $e;
    const _ = typeof x == "number" ? x : e, L = ($e = p.current) == null ? void 0 : $e.closest(".device");
    tn.current = Js(_), L && L.style.setProperty("--accent", tn.current), f(!1), d(!1), E(!1), nn.current = !1, jt.current && clearInterval(jt.current);
    const U = Hp(_), T = Array.from({ length: U }, (at, ct) => ct), P = 0, Y = T.slice(1).sort(() => Math.random() - 0.5);
    tt.current = [P, ...Y], console.log(`Secuencia generada para nivel ${_}:`, tt.current), Ne.current = 0, Xr.current = Zs[Math.floor(Math.random() * Zs.length)] || [440, 494, 523, 587, 659, 698, 784, 880, 988, 1046, 1174, 1318, 1396, 1567, 1760], qt(_);
    let G = null, ae = /* @__PURE__ */ new Set();
    const ce = Math.floor((_ - 1) / 10) + 1;
    an(_).mechanics, G = X.current, ae = yt.current, pf(U, G, ae), setTimeout(() => {
      var ct, Rt, $;
      const at = an(_);
      if (ce >= 2 && G !== null && at.mechanics.includes("drag")) {
        const he = (ct = p.current) == null ? void 0 : ct.querySelector(`.tile[data-id="${G}"]`);
        if (he) {
          const Ke = he.getBoundingClientRect();
          if ((Rt = p.current) == null ? void 0 : Rt.getBoundingClientRect()) {
            ($ = p.current) == null || $.getBoundingClientRect();
            const Mt = 60, Jr = {
              x: Mt,
              // Esquina izquierda con margen
              y: Mt,
              // Esquina superior con margen
              w: Ke.width,
              h: Ke.height,
              color: he.style.backgroundColor,
              over: !1
            };
            be(Jr), console.log(`Zona de drop creada para ficha ${G}`);
          }
        }
      } else
        be(null);
    }, 100);
    const oe = Ho(_);
    w(oe), y(!0), en.current = !0, C.start(), Kr.current = Date.now();
    const Te = Date.now();
    jt.current = setInterval(() => {
      const at = (Date.now() - Te) / 1e3, ct = Math.max(0, oe - at);
      if (w(Math.ceil(ct)), ct <= 0) {
        if (!nn.current) {
          nn.current = !0;
          const Rt = Math.ceil((Date.now() - Kr.current) / 1e3);
          go(Rt);
          try {
            window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
              method: "POST",
              body: JSON.stringify({
                level: e,
                total_time_s: Rt,
                success: 0
              })
            }).catch(($) => {
              console.log("No hay sesión activa para guardar progreso");
            });
          } catch ($) {
          }
        }
        clearInterval(jt.current), y(!1), en.current = !1, d(!0), C.fail(), Gr();
      }
    }, 100), setTimeout(hf, 1500);
  }
  const Ou = (x, _) => {
    var U;
    if (!en.current) return;
    const L = tt.current[Ne.current];
    if (_.id === X.current) {
      console.log(`Ficha especial ${_.id} tocada, esperada: ${L}`), console.log("Iniciando drag de ficha especial"), x.preventDefault(), x.stopPropagation();
      const T = x.currentTarget.getBoundingClientRect();
      N(_.id), W.current = (U = x.pointerId) != null ? U : null, re.current = { x: x.clientX - T.left, y: x.clientY - T.top }, et.current = { x: T.left, y: T.top };
      const P = x.currentTarget;
      P.style.zIndex = 1e3, P.classList.add("dragging"), P.style.touchAction = "none", console.log("Drag iniciado correctamente - ficha en posición original");
      return;
    }
    if (_.id !== L) return Iu();
    Pu(_.id), Lu();
  };
  function Du(x) {
    if (!en.current) return;
    const _ = tt.current[Ne.current], L = p.current, U = L && L.querySelector(`.tile[data-id="${x}"]`);
    if (!U) return;
    const T = parseFloat(U.dataset.pitch || "880"), P = an(e), Y = yt.current.has(x), G = (P.mechanics.includes("combo") || P.mechanics.includes("touch") && P.mechanics.includes("drag") && P.mechanics.includes("double")) && Ru.has(x);
    if (console.log(`tap(${x}): doubleTouchTiles=`, Array.from(yt.current), `isDoubleTile=${Y}`), console.log(`tap(${x}): isDoubleTile=${Y}, config.mechanics=`, P.mechanics, "includes('double')=", P.mechanics.includes("double"), `isComboDouble=${G}`), Y && P.mechanics.includes("double") || G)
      if (x === _)
        if (console.log(`Ficha ${x} es de doble toque y es su turno. partiallyTouched:`, Array.from(Qe.current), `¿Tiene ${x}?`, Qe.current.has(x)), Qe.current.has(x))
          console.log(`SEGUNDO TOQUE en ficha ${x} - completando doble toque`), U.style.opacity = "1", Yr(x), C.ok(T), on(20, o), Ne.current++, Qe.current.delete(x), kn(new Set(Qe.current));
        else {
          console.log(`PRIMER TOQUE en ficha ${x} - marcando como parcialmente tocada`), U.style.opacity = "0.6", Yr(x), C.ok(T), on(20, o), Qe.current.add(x), console.log("Actualizando partiallyTouched:", Array.from(Qe.current)), kn(new Set(Qe.current));
          return;
        }
      else {
        console.log(`Error: ficha de doble toque ${x} no es la esperada (${_})`), C.fail(), on(80, o), Ne.current = 0, Gr(), Qe.current.clear(), kn(/* @__PURE__ */ new Set());
        return;
      }
    else if (x === _) {
      Yr(x), C.ok(T), on(20, o), Ne.current++;
      const ae = Math.floor((e - 1) / 10) + 1;
      if ((ae >= 2 || P.mechanics.includes("combo") || P.mechanics.includes("touch") && P.mechanics.includes("drag") && P.mechanics.includes("double")) && Ne.current < tt.current.length ? setTimeout(() => {
        var ve, oe;
        if (Math.floor((e - 1) / 10) + 1 >= 2 && X.current !== null) {
          const Te = (ve = p.current) == null ? void 0 : ve.querySelector(`.tile[data-id="${X.current}"]`);
          if (Te) {
            (oe = p.current) == null || oe.getBoundingClientRect();
            const $e = 60, at = {
              x: $e,
              // Esquina izquierda con margen
              y: $e,
              // Esquina superior con margen
              w: Te.offsetWidth,
              h: Te.offsetHeight,
              color: Te.style.backgroundColor,
              over: !1
            };
            be(at);
          }
        }
      }, 100) : (ae >= 2 || P.mechanics.includes("combo") || P.mechanics.includes("touch") && P.mechanics.includes("drag") && P.mechanics.includes("double")) && be(null), Ne.current >= tt.current.length) {
        if (!nn.current) {
          nn.current = !0;
          const ce = Math.ceil((Date.now() - Kr.current) / 1e3);
          go(ce);
          try {
            window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
              method: "POST",
              body: JSON.stringify({
                level: e,
                // nivel actual
                total_time_s: ce,
                success: 1
              })
            }).catch((ve) => {
              console.log("No hay sesión activa para guardar progreso");
            });
          } catch (ve) {
          }
        }
        jt.current && clearInterval(jt.current), y(!1), en.current = !1, e === 50 ? E(!0) : f(!0);
        try {
          C.winMelody((Xr.current || []).slice(0, 6));
        } catch (ce) {
        }
      }
    } else
      console.log(`Error: ficha ${x} no es la esperada (${_})`), C.fail(), on(80, o), Ne.current = 0, Gr(), Qe.current.clear(), kn(/* @__PURE__ */ new Set());
  }
  function mf() {
    f(!1), d(!1), E(!1);
    const x = e + 1;
    t(x), setTimeout(() => bn(x), 0);
  }
  return R.useEffect(() => {
    window.LumetrixTest = { start: bn, state: () => ({ level: e, world: Q, levelInWorld: F, running: k, time: h, seqLen: (tt.current || []).length }), tapExpected: () => {
      const x = tt.current[Ne.current];
      x != null && Du(x);
    } };
  }, [e, Q, F, k, h]), R.useEffect(() => {
    const x = (L) => {
      var Te;
      if (Pe == null || W.current !== null && L.pointerId !== W.current) return;
      const U = L.clientX - re.current.x, T = L.clientY - re.current.y, P = (Te = p.current) == null ? void 0 : Te.querySelector(`.tile[data-id="${Pe}"]`);
      if (!P) return;
      const Y = Math.abs(U - et.current.x), G = Math.abs(T - et.current.y), ae = 5;
      (Y > ae || G > ae || P.style.position === "fixed") && (P.style.position = "fixed", P.style.left = `${U}px`, P.style.top = `${T}px`, et.current = { x: U, y: T });
      const ce = U + ((P == null ? void 0 : P.offsetWidth) || 0) / 2, ve = T + ((P == null ? void 0 : P.offsetHeight) || 0) / 2, oe = Mu(ce, ve, se, p.current, 48);
      be(($e) => $e ? { ...$e, over: oe } : null);
    }, _ = (L) => {
      var ve;
      if (Pe == null || W.current !== null && L.pointerId !== W.current) return;
      const U = tt.current[Ne.current], T = (ve = p.current) == null ? void 0 : ve.querySelector(`.tile[data-id="${Pe}"]`), P = et.current.x, Y = et.current.y, G = P + ((T == null ? void 0 : T.offsetWidth) || 0) / 2, ae = Y + ((T == null ? void 0 : T.offsetHeight) || 0) / 2, ce = Mu(G, ae, se, p.current, 48);
      if (console.debug("Drag drop validation:", {
        expected: U,
        draggingId: Pe,
        special: X.current,
        inside: ce,
        step: Ne.current,
        drop: se
      }), Pe === U && Pe === X.current && ce && T)
        return T.style.position = "absolute", T.style.left = `${se.x + (se.w - T.offsetWidth) / 2}px`, T.style.top = `${se.y + (se.h - T.offsetHeight) / 2}px`, N(null), W.current = null, be((oe) => oe ? { ...oe, over: !1 } : null), T && (T.classList.remove("dragging"), T.style.pointerEvents = "", T.style.zIndex = ""), Pu(Pe), Lu();
      Pe === X.current && T && ye.current && (console.log("Reposicionando ficha especial a su lugar original"), T.style.position = "absolute", T.style.left = `${ye.current.x}px`, T.style.top = `${ye.current.y}px`, T.style.width = `${ye.current.width}px`, T.style.height = `${ye.current.height}px`, T.style.zIndex = "", T.style.pointerEvents = "", T.classList.remove("dragging")), N(null), W.current = null, be((oe) => oe ? { ...oe, over: !1 } : null), Iu();
    };
    return document.addEventListener("pointermove", x, !0), document.addEventListener("pointerup", _, !0), document.addEventListener("pointercancel", _, !0), () => {
      document.removeEventListener("pointermove", x, !0), document.removeEventListener("pointerup", _, !0), document.removeEventListener("pointercancel", _, !0);
    };
  }, [Pe, se, bt]), /* @__PURE__ */ m.jsxs("section", { className: "screen", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "topbar", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "brand", style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
        /* @__PURE__ */ m.jsx("img", { src: "sistema_apps_api/lumetrix/img/logo2.png", alt: "LUMETRIX", style: { height: "32px", width: "auto" }, onError: (x) => {
          x.target.style.display = "none", x.target.nextSibling.style.display = "inline";
        } }),
        /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "16px", fontWeight: "900", letterSpacing: "0.1em", color: "#fff" }, children: "LUMETRIX" }),
        /* @__PURE__ */ m.jsx(
          "select",
          {
            value: e,
            onChange: (x) => {
              const _ = parseInt(x.target.value);
              t(_);
            },
            style: {
              background: "#000",
              color: "#fff",
              border: "1px solid #00ff88",
              borderRadius: "6px",
              padding: "4px 8px",
              fontSize: "12px",
              outline: "none",
              minWidth: "80px"
            },
            children: Array.from({ length: 50 }, (x, _) => _ + 1).map((x) => /* @__PURE__ */ m.jsxs("option", { value: x, children: [
              "Nivel ",
              x
            ] }, x))
          }
        ),
        /* @__PURE__ */ m.jsx(
          "button",
          {
            onClick: () => bn(e),
            style: {
              background: "#00ff88",
              color: "#000",
              border: "none",
              borderRadius: "6px",
              padding: "4px 12px",
              fontSize: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              marginLeft: "8px"
            },
            children: "IR"
          }
        )
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: "icons", children: [
        /* @__PURE__ */ m.jsxs("button", { className: "icon", onClick: u, "aria-label": "Ranking", children: [
          /* @__PURE__ */ m.jsx("img", { src: "sistema_apps_api/lumetrix/img/ico_ranking.png", alt: "Ranking", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (x) => {
            x.target.style.display = "none", x.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "🏆" })
        ] }),
        /* @__PURE__ */ m.jsxs("button", { className: "icon", onClick: s, "aria-label": "Opciones", children: [
          /* @__PURE__ */ m.jsx("img", { src: "sistema_apps_api/lumetrix/img/ico_config.png", alt: "Configuración", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (x) => {
            x.target.style.display = "none", x.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "⚙️" })
        ] }),
        /* @__PURE__ */ m.jsxs("button", { className: "icon", onClick: i, "aria-label": "Login", children: [
          /* @__PURE__ */ m.jsx("img", { src: "sistema_apps_api/lumetrix/img/ico_user.png", alt: "Usuario", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (x) => {
            x.target.style.display = "none", x.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "👤" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "hud", children: [
      /* @__PURE__ */ m.jsx("div", { className: "timebar", children: /* @__PURE__ */ m.jsx("i", { className: "timefill", style: { width: `${Math.max(0, Math.min(100, h / Ho(e) * 100))}%` } }) }),
      /* @__PURE__ */ m.jsxs("div", { className: "meta", children: [
        /* @__PURE__ */ m.jsxs("span", { className: "chip", children: [
          "W ",
          /* @__PURE__ */ m.jsx("b", { children: Q })
        ] }),
        /* @__PURE__ */ m.jsxs("span", { className: "chip", children: [
          "N ",
          /* @__PURE__ */ m.jsx("b", { children: F })
        ] }),
        /* @__PURE__ */ m.jsxs("span", { className: "chip", children: [
          "⏱ ",
          /* @__PURE__ */ m.jsxs("b", { children: [
            z,
            "s"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "board", ref: p, children: [
      se && /* @__PURE__ */ m.jsx(
        "div",
        {
          className: `drop-zone ${se.over ? "drag-over" : ""}`,
          style: {
            position: "absolute",
            left: se.x,
            top: se.y,
            width: se.w,
            height: se.h,
            border: `3px dashed ${se.color}`,
            borderRadius: "12px",
            background: "rgba(0,0,0,0.3)",
            pointerEvents: "none",
            zIndex: 10,
            transition: "all 0.2s ease",
            boxShadow: se.over ? `0 0 25px ${se.color}` : `0 0 15px ${se.color}33`
          }
        }
      ),
      !k && !D && !a && /* @__PURE__ */ m.jsxs("div", { className: "overlay", style: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }, children: [
        /* @__PURE__ */ m.jsx("button", { className: "btn-start", onClick: () => bn(), children: "EMPEZAR" }),
        /* @__PURE__ */ m.jsxs("div", { style: { marginTop: "16px", color: "#ffffff88", fontSize: "16px", fontWeight: 600 }, children: [
          "Nivel ",
          e,
          " • Mundo ",
          Q
        ] })
      ] }),
      D && /* @__PURE__ */ m.jsx("div", { className: "overlay", children: /* @__PURE__ */ m.jsxs("div", { className: "card-compact", style: { textAlign: "center" }, children: [
        /* @__PURE__ */ m.jsx("div", { style: { fontSize: 32, marginBottom: 8, textShadow: "0 0 10px var(--neon2), 0 0 20px var(--neon2)" }, children: "✨" }),
        /* @__PURE__ */ m.jsx("h3", { style: { color: "var(--neon2)", marginBottom: 12 }, children: "¡Nivel superado!" }),
        /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: mf, children: "Siguiente" })
      ] }) }),
      a && /* @__PURE__ */ m.jsx("div", { className: "overlay", children: /* @__PURE__ */ m.jsxs("div", { className: "card-compact", style: { textAlign: "center" }, children: [
        /* @__PURE__ */ m.jsx("div", { style: { fontSize: 32, marginBottom: 8, textShadow: "0 0 10px var(--neon1), 0 0 20px var(--neon1)" }, children: "💔" }),
        /* @__PURE__ */ m.jsx("h3", { style: { color: "var(--neon1)", marginBottom: 12 }, children: "Tiempo agotado" }),
        /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: () => bn(), children: "Reintentar" })
      ] }) }),
      v && /* @__PURE__ */ m.jsx("div", { className: "overlay", children: /* @__PURE__ */ m.jsxs("div", { className: "card-compact", style: { textAlign: "center", maxWidth: "90vw", padding: "24px" }, children: [
        /* @__PURE__ */ m.jsx("div", { style: { fontSize: 48, marginBottom: 16, textShadow: "0 0 20px #ffd700, 0 0 40px #ffd700" }, children: "🏆" }),
        /* @__PURE__ */ m.jsx("h2", { style: { color: "#ffd700", marginBottom: 16, fontSize: "24px", fontWeight: "bold", textShadow: "0 0 10px #ffd700" }, children: "¡CRACK TOTAL! 🎯" }),
        /* @__PURE__ */ m.jsxs("p", { style: { color: "#ffffff", marginBottom: 20, fontSize: "16px", lineHeight: "1.4" }, children: [
          "Has completado todos los 50 niveles.",
          /* @__PURE__ */ m.jsx("br", {}),
          "¡Eres una máquina de LUMETRIX! 🤖"
        ] }),
        /* @__PURE__ */ m.jsxs("p", { style: { color: "#00ffff", marginBottom: 24, fontSize: "14px", fontStyle: "italic" }, children: [
          "Si hay más cracks como tú,",
          /* @__PURE__ */ m.jsx("br", {}),
          "añadiremos más niveles. ¡Sigue practicando! 💪"
        ] }),
        /* @__PURE__ */ m.jsxs("div", { style: { display: "flex", gap: "12px", justifyContent: "center" }, children: [
          /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: () => {
            E(!1), t(1);
          }, children: "Reiniciar" }),
          /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: () => {
            E(!1), u();
          }, children: "Ranking" })
        ] })
      ] }) }),
      /* @__PURE__ */ m.jsxs("div", { className: "bokeh", children: [
        /* @__PURE__ */ m.jsx("i", { className: "b1" }),
        /* @__PURE__ */ m.jsx("i", { className: "b2" }),
        /* @__PURE__ */ m.jsx("i", { className: "b3" })
      ] })
    ] })
  ] });
}
function Gp({ onClose: e, total: t }) {
  var i;
  const r = (() => {
    const u = Math.max(30, t);
    return [
      { name: "CyberNinja", time: u - 15 + Math.random() * 10, level: 20, world: 4 },
      { name: "NeonMaster", time: u - 10 + Math.random() * 8, level: 19, world: 3 },
      { name: "LumetrixPro", time: u - 5 + Math.random() * 6, level: 18, world: 3 },
      { name: "QuantumGamer", time: u - 2 + Math.random() * 4, level: 17, world: 3 },
      { name: "PixelWarrior", time: u + Math.random() * 3, level: 16, world: 3 },
      { name: "DigitalHero", time: u + 2 + Math.random() * 4, level: 15, world: 2 },
      { name: "GlitchKing", time: u + 5 + Math.random() * 6, level: 14, world: 2 },
      { name: "CodeBreaker", time: u + 8 + Math.random() * 8, level: 13, world: 2 },
      { name: "ByteSmasher", time: u + 12 + Math.random() * 10, level: 12, world: 2 },
      { name: "Tú", time: t, level: Math.floor(t / 10) + 1, world: Math.floor(t / 50) + 1 }
    ].sort((c, g) => c.time - g.time).map((c, g) => ({
      ...c,
      rank: g + 1
    }));
  })(), l = (u) => u === 1 ? "#FFD700" : u === 2 ? "#C0C0C0" : u === 3 ? "#CD7F32" : "#00ffff", o = (u) => u <= 3 ? ["🥇", "🥈", "🥉"][u - 1] : "🏆";
  return (i = r.find((u) => u.name === "Tú")) != null && i.rank, /* @__PURE__ */ m.jsx("div", { className: "modal", children: /* @__PURE__ */ m.jsxs("div", { className: "card", style: { border: "2px solid #00ffff", boxShadow: "0 0 20px #00ffff44" }, children: [
    /* @__PURE__ */ m.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #00ffff", boxShadow: "0 0 10px #00ffff", background: "#000" }, children: "✕" }),
    /* @__PURE__ */ m.jsx("h3", { style: { color: "#00ffff", marginTop: 0, textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff", fontSize: "20px" }, children: "RANKING GLOBAL" }),
    /* @__PURE__ */ m.jsx("div", { className: "list", style: { gap: "8px", maxHeight: "300px", overflowY: "auto" }, children: r.map((u) => {
      const s = u.name === "Tú";
      return /* @__PURE__ */ m.jsxs("div", { style: {
        background: s ? "rgba(0,255,255,0.3)" : "rgba(0,255,255,0.1)",
        border: s ? "2px solid #00ffff" : "1px solid #00ffff33",
        borderRadius: "8px",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: s ? "0 0 15px #00ffff66" : "none"
      }, children: [
        /* @__PURE__ */ m.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ m.jsx("span", { style: { fontSize: "16px" }, children: o(u.rank) }),
          /* @__PURE__ */ m.jsxs("span", { style: { color: l(u.rank), fontWeight: "bold", fontSize: "14px" }, children: [
            "#",
            u.rank
          ] }),
          /* @__PURE__ */ m.jsx("span", { style: { color: s ? "#00ffff" : "#fff", fontSize: "12px", fontWeight: s ? "bold" : "normal" }, children: u.name })
        ] }),
        /* @__PURE__ */ m.jsxs("div", { style: { textAlign: "right", fontSize: "11px", opacity: 0.8 }, children: [
          /* @__PURE__ */ m.jsxs("div", { children: [
            "W",
            u.world,
            " • N",
            u.level
          ] }),
          /* @__PURE__ */ m.jsxs("div", { style: { color: "#00ffff" }, children: [
            Math.round(u.time),
            "s"
          ] })
        ] })
      ] }, u.rank);
    }) })
  ] }) });
}
function Jp({ onClose: e, onOpenAuth: t, level: n, setLevel: r, soundOn: l, musicOn: o, vibrateOn: i, setSoundOn: u, setMusicOn: s, setVibrateOn: c, onResetTotal: g, musicVolume: p, setMusicVolume: h }) {
  return /* @__PURE__ */ m.jsx("div", { className: "modal", children: /* @__PURE__ */ m.jsxs("div", { className: "card", style: { border: "2px solid #39ff14", boxShadow: "0 0 20px #39ff1444" }, children: [
    /* @__PURE__ */ m.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #39ff14", boxShadow: "0 0 10px #39ff14", background: "#000" }, children: "✕" }),
    /* @__PURE__ */ m.jsx("h3", { style: { color: "#39ff14", marginTop: 0, textShadow: "0 0 10px #39ff14, 0 0 20px #39ff14", fontSize: "20px" }, children: "⚙️ CONFIGURACIÓN" }),
    /* @__PURE__ */ m.jsxs("div", { className: "list", style: { gap: "12px" }, children: [
      /* @__PURE__ */ m.jsxs("label", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ m.jsx("span", { style: { color: "#39ff14", fontWeight: "bold" }, children: "🎵 Música de fondo" }),
        /* @__PURE__ */ m.jsx("input", { type: "checkbox", checked: o, onChange: (w) => s(w.target.checked), style: { transform: "scale(1.2)", accentColor: "#39ff14" } })
      ] }),
      o && /* @__PURE__ */ m.jsxs("div", { style: { background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ m.jsxs("div", { style: { color: "#39ff14", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }, children: [
          "🔊 Volumen: ",
          Math.round(p * 100),
          "%"
        ] }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            type: "range",
            min: "0",
            max: "1",
            step: "0.1",
            value: p,
            onChange: (w) => h(parseFloat(w.target.value)),
            style: {
              width: "100%",
              accentColor: "#39ff14",
              background: "transparent"
            }
          }
        )
      ] }),
      /* @__PURE__ */ m.jsxs("label", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ m.jsx("span", { style: { color: "#39ff14", fontWeight: "bold" }, children: "📳 Vibración" }),
        /* @__PURE__ */ m.jsx("input", { type: "checkbox", checked: i, onChange: (w) => c(w.target.checked), style: { transform: "scale(1.2)", accentColor: "#39ff14" } })
      ] }),
      /* @__PURE__ */ m.jsx("button", { className: "btn", onClick: t, style: { border: "2px solid #00ffff", color: "#00ffff", boxShadow: "0 0 10px #00ffff44", fontWeight: "bold" }, children: "👤 Identificarse" })
    ] })
  ] }) });
}
function Zp({ onClose: e }) {
  return /* @__PURE__ */ m.jsx("div", { className: "modal", children: /* @__PURE__ */ m.jsxs("div", { className: "card", style: { maxWidth: "420px", border: "2px solid #ff00ff", boxShadow: "0 0 20px #ff00ff44" }, children: [
    /* @__PURE__ */ m.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #ff00ff", boxShadow: "0 0 10px #ff00ff", background: "#000" }, children: "✕" }),
    /* @__PURE__ */ m.jsx("h3", { style: { color: "#ff00ff", marginTop: 0, marginBottom: 12, textShadow: "0 0 10px #ff00ff, 0 0 20px #ff00ff", fontSize: "20px" }, children: "👤 REGISTRARSE" }),
    /* @__PURE__ */ m.jsxs("div", { className: "list", style: { gap: 12 }, children: [
      /* @__PURE__ */ m.jsx("input", { placeholder: "🎮 Nick", style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#ff00ff", boxShadow: "0 0 10px #ff00ff22" } }),
      /* @__PURE__ */ m.jsx("input", { placeholder: "📧 Correo", type: "email", style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#ff00ff", boxShadow: "0 0 10px #ff00ff22" } }),
      /* @__PURE__ */ m.jsx("input", { placeholder: "🔒 Contraseña", type: "password", style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#ff00ff", boxShadow: "0 0 10px #ff00ff22" } }),
      /* @__PURE__ */ m.jsxs("div", { style: { display: "flex", gap: 12, justifyContent: "center", marginTop: 8 }, children: [
        /* @__PURE__ */ m.jsx("button", { className: "btn btn1", style: { border: "2px solid #39ff14", color: "#39ff14", boxShadow: "0 0 10px #39ff1444", fontWeight: "bold" }, children: "✅ Registrarse" }),
        /* @__PURE__ */ m.jsx("button", { className: "btn", onClick: e, style: { border: "2px solid #00ffff", color: "#00ffff", boxShadow: "0 0 10px #00ffff44", fontWeight: "bold" }, children: "❌ Cancelar" })
      ] })
    ] })
  ] }) });
}
function qp() {
  Kp();
  const [e, t] = R.useState("intro"), [n, r] = R.useState(!1), [l, o] = R.useState(!1), [i, u] = R.useState(!1), [s, c] = R.useState(!0), [g, p] = R.useState(!0), [h, w] = R.useState(0.15), [k, y] = R.useState(!0), [D, f] = R.useState(1), [a, d] = R.useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0;
    } catch (v) {
      return 0;
    }
  });
  return R.useEffect(() => {
    window.LumetrixTest = Object.assign({}, window.LumetrixTest, { help: "LumetrixTest.start(), .tapExpected(), .state() — tras pulsar Jugar" });
  }, []), /* @__PURE__ */ m.jsx("div", { className: "shell", children: /* @__PURE__ */ m.jsxs("div", { className: "device", children: [
    e === "intro" ? /* @__PURE__ */ m.jsx(Xp, { onPlay: () => t("game"), onAuth: () => u(!0) }) : /* @__PURE__ */ m.jsx(
      Yp,
      {
        level: D,
        setLevel: f,
        soundOn: s,
        musicOn: g,
        musicVolume: h,
        vibrateOn: k,
        onOpenAuth: () => u(!0),
        onOpenRanking: () => r(!0),
        onOpenOptions: () => o(!0),
        onTotalUpdate: d,
        totalTime: a
      }
    ),
    n && /* @__PURE__ */ m.jsx(Gp, { onClose: () => r(!1), total: a }),
    l && /* @__PURE__ */ m.jsx(
      Jp,
      {
        onClose: () => o(!1),
        onOpenAuth: () => {
          o(!1), u(!0);
        },
        level: D,
        setLevel: f,
        soundOn: s,
        musicOn: g,
        vibrateOn: k,
        setSoundOn: c,
        setMusicOn: p,
        setVibrateOn: y,
        musicVolume: h,
        setMusicVolume: w,
        onResetTotal: () => {
          try {
            localStorage.removeItem("lum_total");
          } catch (v) {
          }
          d(0);
        }
      }
    ),
    i && /* @__PURE__ */ m.jsx(Zp, { onClose: () => u(!1) })
  ] }) });
}
function l0(e) {
  const t = ff(e);
  t.render(/* @__PURE__ */ m.jsx(qp, {})), e.__lum_unmount = () => {
    var n;
    return (n = t.unmount) == null ? void 0 : n.call(t);
  };
}
function o0(e) {
  var t;
  try {
    (t = e.__lum_unmount) == null || t.call(e);
  } catch (n) {
  }
}
export {
  l0 as mount,
  o0 as unmount
};
//# sourceMappingURL=game.bundle.js.map
