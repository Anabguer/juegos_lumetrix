var ca = { exports: {} }, io = {}, fa = { exports: {} }, $ = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vr = Symbol.for("react.element"), Lf = Symbol.for("react.portal"), Rf = Symbol.for("react.fragment"), Mf = Symbol.for("react.strict_mode"), If = Symbol.for("react.profiler"), Df = Symbol.for("react.provider"), Of = Symbol.for("react.context"), Ff = Symbol.for("react.forward_ref"), Af = Symbol.for("react.suspense"), Uf = Symbol.for("react.memo"), $f = Symbol.for("react.lazy"), Zs = Symbol.iterator;
function Bf(e) {
  return e === null || typeof e != "object" ? null : (e = Zs && e[Zs] || e["@@iterator"], typeof e == "function" ? e : null);
}
var da = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, pa = Object.assign, ha = {};
function bn(e, t, n) {
  this.props = e, this.context = t, this.refs = ha, this.updater = n || da;
}
bn.prototype.isReactComponent = {};
bn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
bn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ma() {
}
ma.prototype = bn.prototype;
function Yi(e, t, n) {
  this.props = e, this.context = t, this.refs = ha, this.updater = n || da;
}
var Gi = Yi.prototype = new ma();
Gi.constructor = Yi;
pa(Gi, bn.prototype);
Gi.isPureReactComponent = !0;
var qs = Array.isArray, ga = Object.prototype.hasOwnProperty, Ji = { current: null }, ya = { key: !0, ref: !0, __self: !0, __source: !0 };
function va(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) ga.call(t, r) && !ya.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in s = e.defaultProps, s) l[r] === void 0 && (l[r] = s[r]);
  return { $$typeof: Vr, type: e, key: o, ref: i, props: l, _owner: Ji.current };
}
function Wf(e, t) {
  return { $$typeof: Vr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Zi(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Vr;
}
function Hf(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var bs = /\/+/g;
function Po(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Hf("" + e.key) : t.toString(36);
}
function Cl(e, t, n, r, l) {
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
        case Vr:
        case Lf:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + Po(i, 0) : r, qs(l) ? (n = "", e != null && (n = e.replace(bs, "$&/") + "/"), Cl(l, t, n, "", function(c) {
    return c;
  })) : l != null && (Zi(l) && (l = Wf(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(bs, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", qs(e)) for (var s = 0; s < e.length; s++) {
    o = e[s];
    var u = r + Po(o, s);
    i += Cl(o, t, n, u, l);
  }
  else if (u = Bf(e), typeof u == "function") for (e = u.call(e), s = 0; !(o = e.next()).done; ) o = o.value, u = r + Po(o, s++), i += Cl(o, t, n, u, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function sl(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Cl(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function Vf(e) {
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
var Pe = { current: null }, _l = { transition: null }, Qf = { ReactCurrentDispatcher: Pe, ReactCurrentBatchConfig: _l, ReactCurrentOwner: Ji };
function xa() {
  throw Error("act(...) is not supported in production builds of React.");
}
$.Children = { map: sl, forEach: function(e, t, n) {
  sl(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return sl(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return sl(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Zi(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
$.Component = bn;
$.Fragment = Rf;
$.Profiler = If;
$.PureComponent = Yi;
$.StrictMode = Mf;
$.Suspense = Af;
$.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Qf;
$.act = xa;
$.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = pa({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = Ji.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
    for (u in t) ga.call(t, u) && !ya.hasOwnProperty(u) && (r[u] = t[u] === void 0 && s !== void 0 ? s[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    s = Array(u);
    for (var c = 0; c < u; c++) s[c] = arguments[c + 2];
    r.children = s;
  }
  return { $$typeof: Vr, type: e.type, key: l, ref: o, props: r, _owner: i };
};
$.createContext = function(e) {
  return e = { $$typeof: Of, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Df, _context: e }, e.Consumer = e;
};
$.createElement = va;
$.createFactory = function(e) {
  var t = va.bind(null, e);
  return t.type = e, t;
};
$.createRef = function() {
  return { current: null };
};
$.forwardRef = function(e) {
  return { $$typeof: Ff, render: e };
};
$.isValidElement = Zi;
$.lazy = function(e) {
  return { $$typeof: $f, _payload: { _status: -1, _result: e }, _init: Vf };
};
$.memo = function(e, t) {
  return { $$typeof: Uf, type: e, compare: t === void 0 ? null : t };
};
$.startTransition = function(e) {
  var t = _l.transition;
  _l.transition = {};
  try {
    e();
  } finally {
    _l.transition = t;
  }
};
$.unstable_act = xa;
$.useCallback = function(e, t) {
  return Pe.current.useCallback(e, t);
};
$.useContext = function(e) {
  return Pe.current.useContext(e);
};
$.useDebugValue = function() {
};
$.useDeferredValue = function(e) {
  return Pe.current.useDeferredValue(e);
};
$.useEffect = function(e, t) {
  return Pe.current.useEffect(e, t);
};
$.useId = function() {
  return Pe.current.useId();
};
$.useImperativeHandle = function(e, t, n) {
  return Pe.current.useImperativeHandle(e, t, n);
};
$.useInsertionEffect = function(e, t) {
  return Pe.current.useInsertionEffect(e, t);
};
$.useLayoutEffect = function(e, t) {
  return Pe.current.useLayoutEffect(e, t);
};
$.useMemo = function(e, t) {
  return Pe.current.useMemo(e, t);
};
$.useReducer = function(e, t, n) {
  return Pe.current.useReducer(e, t, n);
};
$.useRef = function(e) {
  return Pe.current.useRef(e);
};
$.useState = function(e) {
  return Pe.current.useState(e);
};
$.useSyncExternalStore = function(e, t, n) {
  return Pe.current.useSyncExternalStore(e, t, n);
};
$.useTransition = function() {
  return Pe.current.useTransition();
};
$.version = "18.3.1";
fa.exports = $;
var N = fa.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xf = N, Kf = Symbol.for("react.element"), Yf = Symbol.for("react.fragment"), Gf = Object.prototype.hasOwnProperty, Jf = Xf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Zf = { key: !0, ref: !0, __self: !0, __source: !0 };
function wa(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) Gf.call(t, r) && !Zf.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Kf, type: e, key: o, ref: i, props: l, _owner: Jf.current };
}
io.Fragment = Yf;
io.jsx = wa;
io.jsxs = wa;
ca.exports = io;
var m = ca.exports, Sa = { exports: {} }, We = {}, ka = { exports: {} }, Ea = {};
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
  function t(T, D) {
    var O = T.length;
    T.push(D);
    e: for (; 0 < O; ) {
      var K = O - 1 >>> 1, fe = T[K];
      if (0 < l(fe, D)) T[K] = D, T[O] = fe, O = K;
      else break e;
    }
  }
  function n(T) {
    return T.length === 0 ? null : T[0];
  }
  function r(T) {
    if (T.length === 0) return null;
    var D = T[0], O = T.pop();
    if (O !== D) {
      T[0] = O;
      e: for (var K = 0, fe = T.length, at = fe >>> 1; K < at; ) {
        var xe = 2 * (K + 1) - 1, bt = T[xe], Re = xe + 1, Y = T[Re];
        if (0 > l(bt, O)) Re < fe && 0 > l(Y, bt) ? (T[K] = Y, T[Re] = O, K = Re) : (T[K] = bt, T[xe] = O, K = xe);
        else if (Re < fe && 0 > l(Y, O)) T[K] = Y, T[Re] = O, K = Re;
        else break e;
      }
    }
    return D;
  }
  function l(T, D) {
    var O = T.sortIndex - D.sortIndex;
    return O !== 0 ? O : T.id - D.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var i = Date, s = i.now();
    e.unstable_now = function() {
      return i.now() - s;
    };
  }
  var u = [], c = [], g = 1, p = null, h = 3, x = !1, S = !1, y = !1, F = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, a = typeof setImmediate != "undefined" ? setImmediate : null;
  typeof navigator != "undefined" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function d(T) {
    for (var D = n(c); D !== null; ) {
      if (D.callback === null) r(c);
      else if (D.startTime <= T) r(c), D.sortIndex = D.expirationTime, t(u, D);
      else break;
      D = n(c);
    }
  }
  function v(T) {
    if (y = !1, d(T), !S) if (n(u) !== null) S = !0, nr(E);
    else {
      var D = n(c);
      D !== null && Gr(v, D.startTime - T);
    }
  }
  function E(T, D) {
    S = !1, y && (y = !1, f(M), M = -1), x = !0;
    var O = h;
    try {
      for (d(D), p = n(u); p !== null && (!(p.expirationTime > D) || T && !B()); ) {
        var K = p.callback;
        if (typeof K == "function") {
          p.callback = null, h = p.priorityLevel;
          var fe = K(p.expirationTime <= D);
          D = e.unstable_now(), typeof fe == "function" ? p.callback = fe : p === n(u) && r(u), d(D);
        } else r(u);
        p = n(u);
      }
      if (p !== null) var at = !0;
      else {
        var xe = n(c);
        xe !== null && Gr(v, xe.startTime - D), at = !1;
      }
      return at;
    } finally {
      p = null, h = O, x = !1;
    }
  }
  var _ = !1, P = null, M = -1, re = 5, U = -1;
  function B() {
    return !(e.unstable_now() - U < re);
  }
  function be() {
    if (P !== null) {
      var T = e.unstable_now();
      U = T;
      var D = !0;
      try {
        D = P(!0, T);
      } finally {
        D ? ut() : (_ = !1, P = null);
      }
    } else _ = !1;
  }
  var ut;
  if (typeof a == "function") ut = function() {
    a(be);
  };
  else if (typeof MessageChannel != "undefined") {
    var et = new MessageChannel(), Eo = et.port2;
    et.port1.onmessage = be, ut = function() {
      Eo.postMessage(null);
    };
  } else ut = function() {
    F(be, 0);
  };
  function nr(T) {
    P = T, _ || (_ = !0, ut());
  }
  function Gr(T, D) {
    M = F(function() {
      T(e.unstable_now());
    }, D);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(T) {
    T.callback = null;
  }, e.unstable_continueExecution = function() {
    S || x || (S = !0, nr(E));
  }, e.unstable_forceFrameRate = function(T) {
    0 > T || 125 < T ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : re = 0 < T ? Math.floor(1e3 / T) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(T) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var D = 3;
        break;
      default:
        D = h;
    }
    var O = h;
    h = D;
    try {
      return T();
    } finally {
      h = O;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(T, D) {
    switch (T) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        T = 3;
    }
    var O = h;
    h = T;
    try {
      return D();
    } finally {
      h = O;
    }
  }, e.unstable_scheduleCallback = function(T, D, O) {
    var K = e.unstable_now();
    switch (typeof O == "object" && O !== null ? (O = O.delay, O = typeof O == "number" && 0 < O ? K + O : K) : O = K, T) {
      case 1:
        var fe = -1;
        break;
      case 2:
        fe = 250;
        break;
      case 5:
        fe = 1073741823;
        break;
      case 4:
        fe = 1e4;
        break;
      default:
        fe = 5e3;
    }
    return fe = O + fe, T = { id: g++, callback: D, priorityLevel: T, startTime: O, expirationTime: fe, sortIndex: -1 }, O > K ? (T.sortIndex = O, t(c, T), n(u) === null && T === n(c) && (y ? (f(M), M = -1) : y = !0, Gr(v, O - K))) : (T.sortIndex = fe, t(u, T), S || x || (S = !0, nr(E))), T;
  }, e.unstable_shouldYield = B, e.unstable_wrapCallback = function(T) {
    var D = h;
    return function() {
      var O = h;
      h = D;
      try {
        return T.apply(this, arguments);
      } finally {
        h = O;
      }
    };
  };
})(Ea);
ka.exports = Ea;
var qf = ka.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bf = N, Be = qf;
function C(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Ca = /* @__PURE__ */ new Set(), Tr = {};
function wn(e, t) {
  Xn(e, t), Xn(e + "Capture", t);
}
function Xn(e, t) {
  for (Tr[e] = t, e = 0; e < t.length; e++) Ca.add(t[e]);
}
var Et = !(typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined"), ni = Object.prototype.hasOwnProperty, ed = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, eu = {}, tu = {};
function td(e) {
  return ni.call(tu, e) ? !0 : ni.call(eu, e) ? !1 : ed.test(e) ? tu[e] = !0 : (eu[e] = !0, !1);
}
function nd(e, t, n, r) {
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
function rd(e, t, n, r) {
  if (t === null || typeof t == "undefined" || nd(e, t, n, r)) return !0;
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
function Le(e, t, n, r, l, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
var ke = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ke[e] = new Le(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ke[t] = new Le(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ke[e] = new Le(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ke[e] = new Le(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ke[e] = new Le(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ke[e] = new Le(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ke[e] = new Le(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ke[e] = new Le(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ke[e] = new Le(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var qi = /[\-:]([a-z])/g;
function bi(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    qi,
    bi
  );
  ke[t] = new Le(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(qi, bi);
  ke[t] = new Le(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(qi, bi);
  ke[t] = new Le(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ke[e] = new Le(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ke.xlinkHref = new Le("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ke[e] = new Le(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function es(e, t, n, r) {
  var l = ke.hasOwnProperty(t) ? ke[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (rd(t, n, l, r) && (n = null), r || l === null ? td(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Tt = bf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ul = Symbol.for("react.element"), zn = Symbol.for("react.portal"), jn = Symbol.for("react.fragment"), ts = Symbol.for("react.strict_mode"), ri = Symbol.for("react.profiler"), _a = Symbol.for("react.provider"), Na = Symbol.for("react.context"), ns = Symbol.for("react.forward_ref"), li = Symbol.for("react.suspense"), oi = Symbol.for("react.suspense_list"), rs = Symbol.for("react.memo"), It = Symbol.for("react.lazy"), Ta = Symbol.for("react.offscreen"), nu = Symbol.iterator;
function ir(e) {
  return e === null || typeof e != "object" ? null : (e = nu && e[nu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ne = Object.assign, Lo;
function hr(e) {
  if (Lo === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Lo = t && t[1] || "";
  }
  return `
` + Lo + e;
}
var Ro = !1;
function Mo(e, t) {
  if (!e || Ro) return "";
  Ro = !0;
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
`), i = l.length - 1, s = o.length - 1; 1 <= i && 0 <= s && l[i] !== o[s]; ) s--;
      for (; 1 <= i && 0 <= s; i--, s--) if (l[i] !== o[s]) {
        if (i !== 1 || s !== 1)
          do
            if (i--, s--, 0 > s || l[i] !== o[s]) {
              var u = `
` + l[i].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= i && 0 <= s);
        break;
      }
    }
  } finally {
    Ro = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? hr(e) : "";
}
function ld(e) {
  switch (e.tag) {
    case 5:
      return hr(e.type);
    case 16:
      return hr("Lazy");
    case 13:
      return hr("Suspense");
    case 19:
      return hr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Mo(e.type, !1), e;
    case 11:
      return e = Mo(e.type.render, !1), e;
    case 1:
      return e = Mo(e.type, !0), e;
    default:
      return "";
  }
}
function ii(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case jn:
      return "Fragment";
    case zn:
      return "Portal";
    case ri:
      return "Profiler";
    case ts:
      return "StrictMode";
    case li:
      return "Suspense";
    case oi:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Na:
      return (e.displayName || "Context") + ".Consumer";
    case _a:
      return (e._context.displayName || "Context") + ".Provider";
    case ns:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case rs:
      return t = e.displayName || null, t !== null ? t : ii(e.type) || "Memo";
    case It:
      t = e._payload, e = e._init;
      try {
        return ii(e(t));
      } catch (n) {
      }
  }
  return null;
}
function od(e) {
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
      return ii(t);
    case 8:
      return t === ts ? "StrictMode" : "Mode";
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
function Yt(e) {
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
function za(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function id(e) {
  var t = za(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function al(e) {
  e._valueTracker || (e._valueTracker = id(e));
}
function ja(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = za(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Ol(e) {
  if (e = e || (typeof document != "undefined" ? document : void 0), typeof e == "undefined") return null;
  try {
    return e.activeElement || e.body;
  } catch (t) {
    return e.body;
  }
}
function si(e, t) {
  var n = t.checked;
  return ne({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n != null ? n : e._wrapperState.initialChecked });
}
function ru(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = Yt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Pa(e, t) {
  t = t.checked, t != null && es(e, "checked", t, !1);
}
function ui(e, t) {
  Pa(e, t);
  var n = Yt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? ai(e, t.type, n) : t.hasOwnProperty("defaultValue") && ai(e, t.type, Yt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function lu(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function ai(e, t, n) {
  (t !== "number" || Ol(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var mr = Array.isArray;
function $n(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Yt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function ci(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(C(91));
  return ne({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function ou(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(C(92));
      if (mr(n)) {
        if (1 < n.length) throw Error(C(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: Yt(n) };
}
function La(e, t) {
  var n = Yt(t.value), r = Yt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function iu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ra(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function fi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ra(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var cl, Ma = function(e) {
  return typeof MSApp != "undefined" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (cl = cl || document.createElement("div"), cl.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = cl.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function zr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var vr = {
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
}, sd = ["Webkit", "ms", "Moz", "O"];
Object.keys(vr).forEach(function(e) {
  sd.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), vr[t] = vr[e];
  });
});
function Ia(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || vr.hasOwnProperty(e) && vr[e] ? ("" + t).trim() : t + "px";
}
function Da(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Ia(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var ud = ne({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function di(e, t) {
  if (t) {
    if (ud[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(C(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(C(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(C(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(C(62));
  }
}
function pi(e, t) {
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
var hi = null;
function ls(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var mi = null, Bn = null, Wn = null;
function su(e) {
  if (e = Kr(e)) {
    if (typeof mi != "function") throw Error(C(280));
    var t = e.stateNode;
    t && (t = fo(t), mi(e.stateNode, e.type, t));
  }
}
function Oa(e) {
  Bn ? Wn ? Wn.push(e) : Wn = [e] : Bn = e;
}
function Fa() {
  if (Bn) {
    var e = Bn, t = Wn;
    if (Wn = Bn = null, su(e), t) for (e = 0; e < t.length; e++) su(t[e]);
  }
}
function Aa(e, t) {
  return e(t);
}
function Ua() {
}
var Io = !1;
function $a(e, t, n) {
  if (Io) return e(t, n);
  Io = !0;
  try {
    return Aa(e, t, n);
  } finally {
    Io = !1, (Bn !== null || Wn !== null) && (Ua(), Fa());
  }
}
function jr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = fo(n);
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
  if (n && typeof n != "function") throw Error(C(231, t, typeof n));
  return n;
}
var gi = !1;
if (Et) try {
  var sr = {};
  Object.defineProperty(sr, "passive", { get: function() {
    gi = !0;
  } }), window.addEventListener("test", sr, sr), window.removeEventListener("test", sr, sr);
} catch (e) {
  gi = !1;
}
function ad(e, t, n, r, l, o, i, s, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (g) {
    this.onError(g);
  }
}
var xr = !1, Fl = null, Al = !1, yi = null, cd = { onError: function(e) {
  xr = !0, Fl = e;
} };
function fd(e, t, n, r, l, o, i, s, u) {
  xr = !1, Fl = null, ad.apply(cd, arguments);
}
function dd(e, t, n, r, l, o, i, s, u) {
  if (fd.apply(this, arguments), xr) {
    if (xr) {
      var c = Fl;
      xr = !1, Fl = null;
    } else throw Error(C(198));
    Al || (Al = !0, yi = c);
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
function Ba(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function uu(e) {
  if (Sn(e) !== e) throw Error(C(188));
}
function pd(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Sn(e), t === null) throw Error(C(188));
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
        if (o === n) return uu(l), e;
        if (o === r) return uu(l), t;
        o = o.sibling;
      }
      throw Error(C(188));
    }
    if (n.return !== r.return) n = l, r = o;
    else {
      for (var i = !1, s = l.child; s; ) {
        if (s === n) {
          i = !0, n = l, r = o;
          break;
        }
        if (s === r) {
          i = !0, r = l, n = o;
          break;
        }
        s = s.sibling;
      }
      if (!i) {
        for (s = o.child; s; ) {
          if (s === n) {
            i = !0, n = o, r = l;
            break;
          }
          if (s === r) {
            i = !0, r = o, n = l;
            break;
          }
          s = s.sibling;
        }
        if (!i) throw Error(C(189));
      }
    }
    if (n.alternate !== r) throw Error(C(190));
  }
  if (n.tag !== 3) throw Error(C(188));
  return n.stateNode.current === n ? e : t;
}
function Wa(e) {
  return e = pd(e), e !== null ? Ha(e) : null;
}
function Ha(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ha(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Va = Be.unstable_scheduleCallback, au = Be.unstable_cancelCallback, hd = Be.unstable_shouldYield, md = Be.unstable_requestPaint, ie = Be.unstable_now, gd = Be.unstable_getCurrentPriorityLevel, os = Be.unstable_ImmediatePriority, Qa = Be.unstable_UserBlockingPriority, Ul = Be.unstable_NormalPriority, yd = Be.unstable_LowPriority, Xa = Be.unstable_IdlePriority, so = null, pt = null;
function vd(e) {
  if (pt && typeof pt.onCommitFiberRoot == "function") try {
    pt.onCommitFiberRoot(so, e, void 0, (e.current.flags & 128) === 128);
  } catch (t) {
  }
}
var ot = Math.clz32 ? Math.clz32 : Sd, xd = Math.log, wd = Math.LN2;
function Sd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (xd(e) / wd | 0) | 0;
}
var fl = 64, dl = 4194304;
function gr(e) {
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
function $l(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var s = i & ~l;
    s !== 0 ? r = gr(s) : (o &= i, o !== 0 && (r = gr(o)));
  } else i = n & ~l, i !== 0 ? r = gr(i) : o !== 0 && (r = gr(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - ot(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function kd(e, t) {
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
function Ed(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - ot(o), s = 1 << i, u = l[i];
    u === -1 ? (!(s & n) || s & r) && (l[i] = kd(s, t)) : u <= t && (e.expiredLanes |= s), o &= ~s;
  }
}
function vi(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ka() {
  var e = fl;
  return fl <<= 1, !(fl & 4194240) && (fl = 64), e;
}
function Do(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Qr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - ot(t), e[t] = n;
}
function Cd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - ot(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function is(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - ot(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var Q = 0;
function Ya(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Ga, ss, Ja, Za, qa, xi = !1, pl = [], $t = null, Bt = null, Wt = null, Pr = /* @__PURE__ */ new Map(), Lr = /* @__PURE__ */ new Map(), Ot = [], _d = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function cu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      $t = null;
      break;
    case "dragenter":
    case "dragleave":
      Bt = null;
      break;
    case "mouseover":
    case "mouseout":
      Wt = null;
      break;
    case "pointerover":
    case "pointerout":
      Pr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Lr.delete(t.pointerId);
  }
}
function ur(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = Kr(t), t !== null && ss(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Nd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return $t = ur($t, e, t, n, r, l), !0;
    case "dragenter":
      return Bt = ur(Bt, e, t, n, r, l), !0;
    case "mouseover":
      return Wt = ur(Wt, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Pr.set(o, ur(Pr.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Lr.set(o, ur(Lr.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function ba(e) {
  var t = cn(e.target);
  if (t !== null) {
    var n = Sn(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ba(n), t !== null) {
          e.blockedOn = t, qa(e.priority, function() {
            Ja(n);
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
function Nl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = wi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      hi = r, n.target.dispatchEvent(r), hi = null;
    } else return t = Kr(n), t !== null && ss(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function fu(e, t, n) {
  Nl(e) && n.delete(t);
}
function Td() {
  xi = !1, $t !== null && Nl($t) && ($t = null), Bt !== null && Nl(Bt) && (Bt = null), Wt !== null && Nl(Wt) && (Wt = null), Pr.forEach(fu), Lr.forEach(fu);
}
function ar(e, t) {
  e.blockedOn === t && (e.blockedOn = null, xi || (xi = !0, Be.unstable_scheduleCallback(Be.unstable_NormalPriority, Td)));
}
function Rr(e) {
  function t(l) {
    return ar(l, e);
  }
  if (0 < pl.length) {
    ar(pl[0], e);
    for (var n = 1; n < pl.length; n++) {
      var r = pl[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for ($t !== null && ar($t, e), Bt !== null && ar(Bt, e), Wt !== null && ar(Wt, e), Pr.forEach(t), Lr.forEach(t), n = 0; n < Ot.length; n++) r = Ot[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Ot.length && (n = Ot[0], n.blockedOn === null); ) ba(n), n.blockedOn === null && Ot.shift();
}
var Hn = Tt.ReactCurrentBatchConfig, Bl = !0;
function zd(e, t, n, r) {
  var l = Q, o = Hn.transition;
  Hn.transition = null;
  try {
    Q = 1, us(e, t, n, r);
  } finally {
    Q = l, Hn.transition = o;
  }
}
function jd(e, t, n, r) {
  var l = Q, o = Hn.transition;
  Hn.transition = null;
  try {
    Q = 4, us(e, t, n, r);
  } finally {
    Q = l, Hn.transition = o;
  }
}
function us(e, t, n, r) {
  if (Bl) {
    var l = wi(e, t, n, r);
    if (l === null) Qo(e, t, r, Wl, n), cu(e, r);
    else if (Nd(l, e, t, n, r)) r.stopPropagation();
    else if (cu(e, r), t & 4 && -1 < _d.indexOf(e)) {
      for (; l !== null; ) {
        var o = Kr(l);
        if (o !== null && Ga(o), o = wi(e, t, n, r), o === null && Qo(e, t, r, Wl, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Qo(e, t, r, null, n);
  }
}
var Wl = null;
function wi(e, t, n, r) {
  if (Wl = null, e = ls(r), e = cn(e), e !== null) if (t = Sn(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Ba(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Wl = e, null;
}
function ec(e) {
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
      switch (gd()) {
        case os:
          return 1;
        case Qa:
          return 4;
        case Ul:
        case yd:
          return 16;
        case Xa:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var At = null, as = null, Tl = null;
function tc() {
  if (Tl) return Tl;
  var e, t = as, n = t.length, r, l = "value" in At ? At.value : At.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return Tl = l.slice(e, 1 < r ? 1 - r : void 0);
}
function zl(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function hl() {
  return !0;
}
function du() {
  return !1;
}
function He(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(o) : o[s]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? hl : du, this.isPropagationStopped = du, this;
  }
  return ne(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = hl);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = hl);
  }, persist: function() {
  }, isPersistent: hl }), t;
}
var er = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, cs = He(er), Xr = ne({}, er, { view: 0, detail: 0 }), Pd = He(Xr), Oo, Fo, cr, uo = ne({}, Xr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: fs, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== cr && (cr && e.type === "mousemove" ? (Oo = e.screenX - cr.screenX, Fo = e.screenY - cr.screenY) : Fo = Oo = 0, cr = e), Oo);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Fo;
} }), pu = He(uo), Ld = ne({}, uo, { dataTransfer: 0 }), Rd = He(Ld), Md = ne({}, Xr, { relatedTarget: 0 }), Ao = He(Md), Id = ne({}, er, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Dd = He(Id), Od = ne({}, er, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Fd = He(Od), Ad = ne({}, er, { data: 0 }), hu = He(Ad), Ud = {
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
}, $d = {
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
}, Bd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Wd(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Bd[e]) ? !!t[e] : !1;
}
function fs() {
  return Wd;
}
var Hd = ne({}, Xr, { key: function(e) {
  if (e.key) {
    var t = Ud[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = zl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? $d[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: fs, charCode: function(e) {
  return e.type === "keypress" ? zl(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? zl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Vd = He(Hd), Qd = ne({}, uo, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), mu = He(Qd), Xd = ne({}, Xr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: fs }), Kd = He(Xd), Yd = ne({}, er, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Gd = He(Yd), Jd = ne({}, uo, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = He(Jd), qd = [9, 13, 27, 32], ds = Et && "CompositionEvent" in window, wr = null;
Et && "documentMode" in document && (wr = document.documentMode);
var bd = Et && "TextEvent" in window && !wr, nc = Et && (!ds || wr && 8 < wr && 11 >= wr), gu = " ", yu = !1;
function rc(e, t) {
  switch (e) {
    case "keyup":
      return qd.indexOf(t.keyCode) !== -1;
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
function lc(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Pn = !1;
function ep(e, t) {
  switch (e) {
    case "compositionend":
      return lc(t);
    case "keypress":
      return t.which !== 32 ? null : (yu = !0, gu);
    case "textInput":
      return e = t.data, e === gu && yu ? null : e;
    default:
      return null;
  }
}
function tp(e, t) {
  if (Pn) return e === "compositionend" || !ds && rc(e, t) ? (e = tc(), Tl = as = At = null, Pn = !1, e) : null;
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
      return nc && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var np = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function vu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!np[e.type] : t === "textarea";
}
function oc(e, t, n, r) {
  Oa(r), t = Hl(t, "onChange"), 0 < t.length && (n = new cs("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Sr = null, Mr = null;
function rp(e) {
  gc(e, 0);
}
function ao(e) {
  var t = Mn(e);
  if (ja(t)) return e;
}
function lp(e, t) {
  if (e === "change") return t;
}
var ic = !1;
if (Et) {
  var Uo;
  if (Et) {
    var $o = "oninput" in document;
    if (!$o) {
      var xu = document.createElement("div");
      xu.setAttribute("oninput", "return;"), $o = typeof xu.oninput == "function";
    }
    Uo = $o;
  } else Uo = !1;
  ic = Uo && (!document.documentMode || 9 < document.documentMode);
}
function wu() {
  Sr && (Sr.detachEvent("onpropertychange", sc), Mr = Sr = null);
}
function sc(e) {
  if (e.propertyName === "value" && ao(Mr)) {
    var t = [];
    oc(t, Mr, e, ls(e)), $a(rp, t);
  }
}
function op(e, t, n) {
  e === "focusin" ? (wu(), Sr = t, Mr = n, Sr.attachEvent("onpropertychange", sc)) : e === "focusout" && wu();
}
function ip(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return ao(Mr);
}
function sp(e, t) {
  if (e === "click") return ao(t);
}
function up(e, t) {
  if (e === "input" || e === "change") return ao(t);
}
function ap(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var st = typeof Object.is == "function" ? Object.is : ap;
function Ir(e, t) {
  if (st(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ni.call(t, l) || !st(e[l], t[l])) return !1;
  }
  return !0;
}
function Su(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ku(e, t) {
  var n = Su(e);
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
    n = Su(n);
  }
}
function uc(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? uc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function ac() {
  for (var e = window, t = Ol(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch (r) {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Ol(e.document);
  }
  return t;
}
function ps(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function cp(e) {
  var t = ac(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && uc(n.ownerDocument.documentElement, n)) {
    if (r !== null && ps(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = ku(n, o);
        var i = ku(
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
var fp = Et && "documentMode" in document && 11 >= document.documentMode, Ln = null, Si = null, kr = null, ki = !1;
function Eu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  ki || Ln == null || Ln !== Ol(r) || (r = Ln, "selectionStart" in r && ps(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), kr && Ir(kr, r) || (kr = r, r = Hl(Si, "onSelect"), 0 < r.length && (t = new cs("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Ln)));
}
function ml(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Rn = { animationend: ml("Animation", "AnimationEnd"), animationiteration: ml("Animation", "AnimationIteration"), animationstart: ml("Animation", "AnimationStart"), transitionend: ml("Transition", "TransitionEnd") }, Bo = {}, cc = {};
Et && (cc = document.createElement("div").style, "AnimationEvent" in window || (delete Rn.animationend.animation, delete Rn.animationiteration.animation, delete Rn.animationstart.animation), "TransitionEvent" in window || delete Rn.transitionend.transition);
function co(e) {
  if (Bo[e]) return Bo[e];
  if (!Rn[e]) return e;
  var t = Rn[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in cc) return Bo[e] = t[n];
  return e;
}
var fc = co("animationend"), dc = co("animationiteration"), pc = co("animationstart"), hc = co("transitionend"), mc = /* @__PURE__ */ new Map(), Cu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Jt(e, t) {
  mc.set(e, t), wn(t, [e]);
}
for (var Wo = 0; Wo < Cu.length; Wo++) {
  var Ho = Cu[Wo], dp = Ho.toLowerCase(), pp = Ho[0].toUpperCase() + Ho.slice(1);
  Jt(dp, "on" + pp);
}
Jt(fc, "onAnimationEnd");
Jt(dc, "onAnimationIteration");
Jt(pc, "onAnimationStart");
Jt("dblclick", "onDoubleClick");
Jt("focusin", "onFocus");
Jt("focusout", "onBlur");
Jt(hc, "onTransitionEnd");
Xn("onMouseEnter", ["mouseout", "mouseover"]);
Xn("onMouseLeave", ["mouseout", "mouseover"]);
Xn("onPointerEnter", ["pointerout", "pointerover"]);
Xn("onPointerLeave", ["pointerout", "pointerover"]);
wn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
wn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
wn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
wn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
wn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
wn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var yr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), hp = new Set("cancel close invalid load scroll toggle".split(" ").concat(yr));
function _u(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, dd(r, t, void 0, e), e.currentTarget = null;
}
function gc(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var s = r[i], u = s.instance, c = s.currentTarget;
        if (s = s.listener, u !== o && l.isPropagationStopped()) break e;
        _u(l, s, c), o = u;
      }
      else for (i = 0; i < r.length; i++) {
        if (s = r[i], u = s.instance, c = s.currentTarget, s = s.listener, u !== o && l.isPropagationStopped()) break e;
        _u(l, s, c), o = u;
      }
    }
  }
  if (Al) throw e = yi, Al = !1, yi = null, e;
}
function Z(e, t) {
  var n = t[Ti];
  n === void 0 && (n = t[Ti] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (yc(t, e, 2, !1), n.add(r));
}
function Vo(e, t, n) {
  var r = 0;
  t && (r |= 4), yc(n, e, r, t);
}
var gl = "_reactListening" + Math.random().toString(36).slice(2);
function Dr(e) {
  if (!e[gl]) {
    e[gl] = !0, Ca.forEach(function(n) {
      n !== "selectionchange" && (hp.has(n) || Vo(n, !1, e), Vo(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[gl] || (t[gl] = !0, Vo("selectionchange", !1, t));
  }
}
function yc(e, t, n, r) {
  switch (ec(t)) {
    case 1:
      var l = zd;
      break;
    case 4:
      l = jd;
      break;
    default:
      l = us;
  }
  n = l.bind(null, t, n, e), l = void 0, !gi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Qo(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var i = r.tag;
    if (i === 3 || i === 4) {
      var s = r.stateNode.containerInfo;
      if (s === l || s.nodeType === 8 && s.parentNode === l) break;
      if (i === 4) for (i = r.return; i !== null; ) {
        var u = i.tag;
        if ((u === 3 || u === 4) && (u = i.stateNode.containerInfo, u === l || u.nodeType === 8 && u.parentNode === l)) return;
        i = i.return;
      }
      for (; s !== null; ) {
        if (i = cn(s), i === null) return;
        if (u = i.tag, u === 5 || u === 6) {
          r = o = i;
          continue e;
        }
        s = s.parentNode;
      }
    }
    r = r.return;
  }
  $a(function() {
    var c = o, g = ls(n), p = [];
    e: {
      var h = mc.get(e);
      if (h !== void 0) {
        var x = cs, S = e;
        switch (e) {
          case "keypress":
            if (zl(n) === 0) break e;
          case "keydown":
          case "keyup":
            x = Vd;
            break;
          case "focusin":
            S = "focus", x = Ao;
            break;
          case "focusout":
            S = "blur", x = Ao;
            break;
          case "beforeblur":
          case "afterblur":
            x = Ao;
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
            x = pu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            x = Rd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            x = Kd;
            break;
          case fc:
          case dc:
          case pc:
            x = Dd;
            break;
          case hc:
            x = Gd;
            break;
          case "scroll":
            x = Pd;
            break;
          case "wheel":
            x = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            x = Fd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            x = mu;
        }
        var y = (t & 4) !== 0, F = !y && e === "scroll", f = y ? h !== null ? h + "Capture" : null : h;
        y = [];
        for (var a = c, d; a !== null; ) {
          d = a;
          var v = d.stateNode;
          if (d.tag === 5 && v !== null && (d = v, f !== null && (v = jr(a, f), v != null && y.push(Or(a, v, d)))), F) break;
          a = a.return;
        }
        0 < y.length && (h = new x(h, S, null, n, g), p.push({ event: h, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", x = e === "mouseout" || e === "pointerout", h && n !== hi && (S = n.relatedTarget || n.fromElement) && (cn(S) || S[Ct])) break e;
        if ((x || h) && (h = g.window === g ? g : (h = g.ownerDocument) ? h.defaultView || h.parentWindow : window, x ? (S = n.relatedTarget || n.toElement, x = c, S = S ? cn(S) : null, S !== null && (F = Sn(S), S !== F || S.tag !== 5 && S.tag !== 6) && (S = null)) : (x = null, S = c), x !== S)) {
          if (y = pu, v = "onMouseLeave", f = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (y = mu, v = "onPointerLeave", f = "onPointerEnter", a = "pointer"), F = x == null ? h : Mn(x), d = S == null ? h : Mn(S), h = new y(v, a + "leave", x, n, g), h.target = F, h.relatedTarget = d, v = null, cn(g) === c && (y = new y(f, a + "enter", S, n, g), y.target = d, y.relatedTarget = F, v = y), F = v, x && S) t: {
            for (y = x, f = S, a = 0, d = y; d; d = Nn(d)) a++;
            for (d = 0, v = f; v; v = Nn(v)) d++;
            for (; 0 < a - d; ) y = Nn(y), a--;
            for (; 0 < d - a; ) f = Nn(f), d--;
            for (; a--; ) {
              if (y === f || f !== null && y === f.alternate) break t;
              y = Nn(y), f = Nn(f);
            }
            y = null;
          }
          else y = null;
          x !== null && Nu(p, h, x, y, !1), S !== null && F !== null && Nu(p, F, S, y, !0);
        }
      }
      e: {
        if (h = c ? Mn(c) : window, x = h.nodeName && h.nodeName.toLowerCase(), x === "select" || x === "input" && h.type === "file") var E = lp;
        else if (vu(h)) if (ic) E = up;
        else {
          E = ip;
          var _ = op;
        }
        else (x = h.nodeName) && x.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (E = sp);
        if (E && (E = E(e, c))) {
          oc(p, E, n, g);
          break e;
        }
        _ && _(e, h, c), e === "focusout" && (_ = h._wrapperState) && _.controlled && h.type === "number" && ai(h, "number", h.value);
      }
      switch (_ = c ? Mn(c) : window, e) {
        case "focusin":
          (vu(_) || _.contentEditable === "true") && (Ln = _, Si = c, kr = null);
          break;
        case "focusout":
          kr = Si = Ln = null;
          break;
        case "mousedown":
          ki = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ki = !1, Eu(p, n, g);
          break;
        case "selectionchange":
          if (fp) break;
        case "keydown":
        case "keyup":
          Eu(p, n, g);
      }
      var P;
      if (ds) e: {
        switch (e) {
          case "compositionstart":
            var M = "onCompositionStart";
            break e;
          case "compositionend":
            M = "onCompositionEnd";
            break e;
          case "compositionupdate":
            M = "onCompositionUpdate";
            break e;
        }
        M = void 0;
      }
      else Pn ? rc(e, n) && (M = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (M = "onCompositionStart");
      M && (nc && n.locale !== "ko" && (Pn || M !== "onCompositionStart" ? M === "onCompositionEnd" && Pn && (P = tc()) : (At = g, as = "value" in At ? At.value : At.textContent, Pn = !0)), _ = Hl(c, M), 0 < _.length && (M = new hu(M, e, null, n, g), p.push({ event: M, listeners: _ }), P ? M.data = P : (P = lc(n), P !== null && (M.data = P)))), (P = bd ? ep(e, n) : tp(e, n)) && (c = Hl(c, "onBeforeInput"), 0 < c.length && (g = new hu("onBeforeInput", "beforeinput", null, n, g), p.push({ event: g, listeners: c }), g.data = P));
    }
    gc(p, t);
  });
}
function Or(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Hl(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = jr(e, n), o != null && r.unshift(Or(e, o, l)), o = jr(e, t), o != null && r.push(Or(e, o, l))), e = e.return;
  }
  return r;
}
function Nn(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Nu(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var s = n, u = s.alternate, c = s.stateNode;
    if (u !== null && u === r) break;
    s.tag === 5 && c !== null && (s = c, l ? (u = jr(n, o), u != null && i.unshift(Or(n, u, s))) : l || (u = jr(n, o), u != null && i.push(Or(n, u, s)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var mp = /\r\n?/g, gp = /\u0000|\uFFFD/g;
function Tu(e) {
  return (typeof e == "string" ? e : "" + e).replace(mp, `
`).replace(gp, "");
}
function yl(e, t, n) {
  if (t = Tu(t), Tu(e) !== t && n) throw Error(C(425));
}
function Vl() {
}
var Ei = null, Ci = null;
function _i(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Ni = typeof setTimeout == "function" ? setTimeout : void 0, yp = typeof clearTimeout == "function" ? clearTimeout : void 0, zu = typeof Promise == "function" ? Promise : void 0, vp = typeof queueMicrotask == "function" ? queueMicrotask : typeof zu != "undefined" ? function(e) {
  return zu.resolve(null).then(e).catch(xp);
} : Ni;
function xp(e) {
  setTimeout(function() {
    throw e;
  });
}
function Xo(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Rr(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Rr(t);
}
function Ht(e) {
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
function ju(e) {
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
var tr = Math.random().toString(36).slice(2), dt = "__reactFiber$" + tr, Fr = "__reactProps$" + tr, Ct = "__reactContainer$" + tr, Ti = "__reactEvents$" + tr, wp = "__reactListeners$" + tr, Sp = "__reactHandles$" + tr;
function cn(e) {
  var t = e[dt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Ct] || n[dt]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ju(e); e !== null; ) {
        if (n = e[dt]) return n;
        e = ju(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Kr(e) {
  return e = e[dt] || e[Ct], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Mn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(C(33));
}
function fo(e) {
  return e[Fr] || null;
}
var zi = [], In = -1;
function Zt(e) {
  return { current: e };
}
function q(e) {
  0 > In || (e.current = zi[In], zi[In] = null, In--);
}
function G(e, t) {
  In++, zi[In] = e.current, e.current = t;
}
var Gt = {}, Ne = Zt(Gt), De = Zt(!1), mn = Gt;
function Kn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Gt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Oe(e) {
  return e = e.childContextTypes, e != null;
}
function Ql() {
  q(De), q(Ne);
}
function Pu(e, t, n) {
  if (Ne.current !== Gt) throw Error(C(168));
  G(Ne, t), G(De, n);
}
function vc(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(C(108, od(e) || "Unknown", l));
  return ne({}, n, r);
}
function Xl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Gt, mn = Ne.current, G(Ne, e), G(De, De.current), !0;
}
function Lu(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(C(169));
  n ? (e = vc(e, t, mn), r.__reactInternalMemoizedMergedChildContext = e, q(De), q(Ne), G(Ne, e)) : q(De), G(De, n);
}
var xt = null, po = !1, Ko = !1;
function xc(e) {
  xt === null ? xt = [e] : xt.push(e);
}
function kp(e) {
  po = !0, xc(e);
}
function qt() {
  if (!Ko && xt !== null) {
    Ko = !0;
    var e = 0, t = Q;
    try {
      var n = xt;
      for (Q = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      xt = null, po = !1;
    } catch (l) {
      throw xt !== null && (xt = xt.slice(e + 1)), Va(os, qt), l;
    } finally {
      Q = t, Ko = !1;
    }
  }
  return null;
}
var Dn = [], On = 0, Kl = null, Yl = 0, Ke = [], Ye = 0, gn = null, wt = 1, St = "";
function un(e, t) {
  Dn[On++] = Yl, Dn[On++] = Kl, Kl = e, Yl = t;
}
function wc(e, t, n) {
  Ke[Ye++] = wt, Ke[Ye++] = St, Ke[Ye++] = gn, gn = e;
  var r = wt;
  e = St;
  var l = 32 - ot(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - ot(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, wt = 1 << 32 - ot(t) + l | n << l | r, St = o + e;
  } else wt = 1 << o | n << l | r, St = e;
}
function hs(e) {
  e.return !== null && (un(e, 1), wc(e, 1, 0));
}
function ms(e) {
  for (; e === Kl; ) Kl = Dn[--On], Dn[On] = null, Yl = Dn[--On], Dn[On] = null;
  for (; e === gn; ) gn = Ke[--Ye], Ke[Ye] = null, St = Ke[--Ye], Ke[Ye] = null, wt = Ke[--Ye], Ke[Ye] = null;
}
var $e = null, Ue = null, b = !1, lt = null;
function Sc(e, t) {
  var n = Ge(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Ru(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, $e = e, Ue = Ht(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, $e = e, Ue = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = gn !== null ? { id: wt, overflow: St } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ge(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, $e = e, Ue = null, !0) : !1;
    default:
      return !1;
  }
}
function ji(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Pi(e) {
  if (b) {
    var t = Ue;
    if (t) {
      var n = t;
      if (!Ru(e, t)) {
        if (ji(e)) throw Error(C(418));
        t = Ht(n.nextSibling);
        var r = $e;
        t && Ru(e, t) ? Sc(r, n) : (e.flags = e.flags & -4097 | 2, b = !1, $e = e);
      }
    } else {
      if (ji(e)) throw Error(C(418));
      e.flags = e.flags & -4097 | 2, b = !1, $e = e;
    }
  }
}
function Mu(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  $e = e;
}
function vl(e) {
  if (e !== $e) return !1;
  if (!b) return Mu(e), b = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !_i(e.type, e.memoizedProps)), t && (t = Ue)) {
    if (ji(e)) throw kc(), Error(C(418));
    for (; t; ) Sc(e, t), t = Ht(t.nextSibling);
  }
  if (Mu(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(C(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ue = Ht(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Ue = null;
    }
  } else Ue = $e ? Ht(e.stateNode.nextSibling) : null;
  return !0;
}
function kc() {
  for (var e = Ue; e; ) e = Ht(e.nextSibling);
}
function Yn() {
  Ue = $e = null, b = !1;
}
function gs(e) {
  lt === null ? lt = [e] : lt.push(e);
}
var Ep = Tt.ReactCurrentBatchConfig;
function fr(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(C(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(C(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var s = l.refs;
        i === null ? delete s[o] : s[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(C(284));
    if (!n._owner) throw Error(C(290, e));
  }
  return e;
}
function xl(e, t) {
  throw e = Object.prototype.toString.call(t), Error(C(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Iu(e) {
  var t = e._init;
  return t(e._payload);
}
function Ec(e) {
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
  function s(f, a, d, v) {
    return a === null || a.tag !== 6 ? (a = ei(d, f.mode, v), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function u(f, a, d, v) {
    var E = d.type;
    return E === jn ? g(f, a, d.props.children, v, d.key) : a !== null && (a.elementType === E || typeof E == "object" && E !== null && E.$$typeof === It && Iu(E) === a.type) ? (v = l(a, d.props), v.ref = fr(f, a, d), v.return = f, v) : (v = Dl(d.type, d.key, d.props, null, f.mode, v), v.ref = fr(f, a, d), v.return = f, v);
  }
  function c(f, a, d, v) {
    return a === null || a.tag !== 4 || a.stateNode.containerInfo !== d.containerInfo || a.stateNode.implementation !== d.implementation ? (a = ti(d, f.mode, v), a.return = f, a) : (a = l(a, d.children || []), a.return = f, a);
  }
  function g(f, a, d, v, E) {
    return a === null || a.tag !== 7 ? (a = hn(d, f.mode, v, E), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function p(f, a, d) {
    if (typeof a == "string" && a !== "" || typeof a == "number") return a = ei("" + a, f.mode, d), a.return = f, a;
    if (typeof a == "object" && a !== null) {
      switch (a.$$typeof) {
        case ul:
          return d = Dl(a.type, a.key, a.props, null, f.mode, d), d.ref = fr(f, null, a), d.return = f, d;
        case zn:
          return a = ti(a, f.mode, d), a.return = f, a;
        case It:
          var v = a._init;
          return p(f, v(a._payload), d);
      }
      if (mr(a) || ir(a)) return a = hn(a, f.mode, d, null), a.return = f, a;
      xl(f, a);
    }
    return null;
  }
  function h(f, a, d, v) {
    var E = a !== null ? a.key : null;
    if (typeof d == "string" && d !== "" || typeof d == "number") return E !== null ? null : s(f, a, "" + d, v);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case ul:
          return d.key === E ? u(f, a, d, v) : null;
        case zn:
          return d.key === E ? c(f, a, d, v) : null;
        case It:
          return E = d._init, h(
            f,
            a,
            E(d._payload),
            v
          );
      }
      if (mr(d) || ir(d)) return E !== null ? null : g(f, a, d, v, null);
      xl(f, d);
    }
    return null;
  }
  function x(f, a, d, v, E) {
    if (typeof v == "string" && v !== "" || typeof v == "number") return f = f.get(d) || null, s(a, f, "" + v, E);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case ul:
          return f = f.get(v.key === null ? d : v.key) || null, u(a, f, v, E);
        case zn:
          return f = f.get(v.key === null ? d : v.key) || null, c(a, f, v, E);
        case It:
          var _ = v._init;
          return x(f, a, d, _(v._payload), E);
      }
      if (mr(v) || ir(v)) return f = f.get(d) || null, g(a, f, v, E, null);
      xl(a, v);
    }
    return null;
  }
  function S(f, a, d, v) {
    for (var E = null, _ = null, P = a, M = a = 0, re = null; P !== null && M < d.length; M++) {
      P.index > M ? (re = P, P = null) : re = P.sibling;
      var U = h(f, P, d[M], v);
      if (U === null) {
        P === null && (P = re);
        break;
      }
      e && P && U.alternate === null && t(f, P), a = o(U, a, M), _ === null ? E = U : _.sibling = U, _ = U, P = re;
    }
    if (M === d.length) return n(f, P), b && un(f, M), E;
    if (P === null) {
      for (; M < d.length; M++) P = p(f, d[M], v), P !== null && (a = o(P, a, M), _ === null ? E = P : _.sibling = P, _ = P);
      return b && un(f, M), E;
    }
    for (P = r(f, P); M < d.length; M++) re = x(P, f, M, d[M], v), re !== null && (e && re.alternate !== null && P.delete(re.key === null ? M : re.key), a = o(re, a, M), _ === null ? E = re : _.sibling = re, _ = re);
    return e && P.forEach(function(B) {
      return t(f, B);
    }), b && un(f, M), E;
  }
  function y(f, a, d, v) {
    var E = ir(d);
    if (typeof E != "function") throw Error(C(150));
    if (d = E.call(d), d == null) throw Error(C(151));
    for (var _ = E = null, P = a, M = a = 0, re = null, U = d.next(); P !== null && !U.done; M++, U = d.next()) {
      P.index > M ? (re = P, P = null) : re = P.sibling;
      var B = h(f, P, U.value, v);
      if (B === null) {
        P === null && (P = re);
        break;
      }
      e && P && B.alternate === null && t(f, P), a = o(B, a, M), _ === null ? E = B : _.sibling = B, _ = B, P = re;
    }
    if (U.done) return n(
      f,
      P
    ), b && un(f, M), E;
    if (P === null) {
      for (; !U.done; M++, U = d.next()) U = p(f, U.value, v), U !== null && (a = o(U, a, M), _ === null ? E = U : _.sibling = U, _ = U);
      return b && un(f, M), E;
    }
    for (P = r(f, P); !U.done; M++, U = d.next()) U = x(P, f, M, U.value, v), U !== null && (e && U.alternate !== null && P.delete(U.key === null ? M : U.key), a = o(U, a, M), _ === null ? E = U : _.sibling = U, _ = U);
    return e && P.forEach(function(be) {
      return t(f, be);
    }), b && un(f, M), E;
  }
  function F(f, a, d, v) {
    if (typeof d == "object" && d !== null && d.type === jn && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case ul:
          e: {
            for (var E = d.key, _ = a; _ !== null; ) {
              if (_.key === E) {
                if (E = d.type, E === jn) {
                  if (_.tag === 7) {
                    n(f, _.sibling), a = l(_, d.props.children), a.return = f, f = a;
                    break e;
                  }
                } else if (_.elementType === E || typeof E == "object" && E !== null && E.$$typeof === It && Iu(E) === _.type) {
                  n(f, _.sibling), a = l(_, d.props), a.ref = fr(f, _, d), a.return = f, f = a;
                  break e;
                }
                n(f, _);
                break;
              } else t(f, _);
              _ = _.sibling;
            }
            d.type === jn ? (a = hn(d.props.children, f.mode, v, d.key), a.return = f, f = a) : (v = Dl(d.type, d.key, d.props, null, f.mode, v), v.ref = fr(f, a, d), v.return = f, f = v);
          }
          return i(f);
        case zn:
          e: {
            for (_ = d.key; a !== null; ) {
              if (a.key === _) if (a.tag === 4 && a.stateNode.containerInfo === d.containerInfo && a.stateNode.implementation === d.implementation) {
                n(f, a.sibling), a = l(a, d.children || []), a.return = f, f = a;
                break e;
              } else {
                n(f, a);
                break;
              }
              else t(f, a);
              a = a.sibling;
            }
            a = ti(d, f.mode, v), a.return = f, f = a;
          }
          return i(f);
        case It:
          return _ = d._init, F(f, a, _(d._payload), v);
      }
      if (mr(d)) return S(f, a, d, v);
      if (ir(d)) return y(f, a, d, v);
      xl(f, d);
    }
    return typeof d == "string" && d !== "" || typeof d == "number" ? (d = "" + d, a !== null && a.tag === 6 ? (n(f, a.sibling), a = l(a, d), a.return = f, f = a) : (n(f, a), a = ei(d, f.mode, v), a.return = f, f = a), i(f)) : n(f, a);
  }
  return F;
}
var Gn = Ec(!0), Cc = Ec(!1), Gl = Zt(null), Jl = null, Fn = null, ys = null;
function vs() {
  ys = Fn = Jl = null;
}
function xs(e) {
  var t = Gl.current;
  q(Gl), e._currentValue = t;
}
function Li(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Vn(e, t) {
  Jl = e, ys = Fn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Ie = !0), e.firstContext = null);
}
function Ze(e) {
  var t = e._currentValue;
  if (ys !== e) if (e = { context: e, memoizedValue: t, next: null }, Fn === null) {
    if (Jl === null) throw Error(C(308));
    Fn = e, Jl.dependencies = { lanes: 0, firstContext: e };
  } else Fn = Fn.next = e;
  return t;
}
var fn = null;
function ws(e) {
  fn === null ? fn = [e] : fn.push(e);
}
function _c(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, ws(t)) : (n.next = l.next, l.next = n), t.interleaved = n, _t(e, r);
}
function _t(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Dt = !1;
function Ss(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Nc(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function kt(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Vt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, H & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, _t(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, ws(r)) : (t.next = l.next, l.next = t), r.interleaved = t, _t(e, n);
}
function jl(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, is(e, n);
  }
}
function Du(e, t) {
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
function Zl(e, t, n, r) {
  var l = e.updateQueue;
  Dt = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var u = s, c = u.next;
    u.next = null, i === null ? o = c : i.next = c, i = u;
    var g = e.alternate;
    g !== null && (g = g.updateQueue, s = g.lastBaseUpdate, s !== i && (s === null ? g.firstBaseUpdate = c : s.next = c, g.lastBaseUpdate = u));
  }
  if (o !== null) {
    var p = l.baseState;
    i = 0, g = c = u = null, s = o;
    do {
      var h = s.lane, x = s.eventTime;
      if ((r & h) === h) {
        g !== null && (g = g.next = {
          eventTime: x,
          lane: 0,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        });
        e: {
          var S = e, y = s;
          switch (h = t, x = n, y.tag) {
            case 1:
              if (S = y.payload, typeof S == "function") {
                p = S.call(x, p, h);
                break e;
              }
              p = S;
              break e;
            case 3:
              S.flags = S.flags & -65537 | 128;
            case 0:
              if (S = y.payload, h = typeof S == "function" ? S.call(x, p, h) : S, h == null) break e;
              p = ne({}, p, h);
              break e;
            case 2:
              Dt = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [s] : h.push(s));
      } else x = { eventTime: x, lane: h, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, g === null ? (c = g = x, u = p) : g = g.next = x, i |= h;
      if (s = s.next, s === null) {
        if (s = l.shared.pending, s === null) break;
        h = s, s = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (g === null && (u = p), l.baseState = u, l.firstBaseUpdate = c, l.lastBaseUpdate = g, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    vn |= i, e.lanes = i, e.memoizedState = p;
  }
}
function Ou(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(C(191, l));
      l.call(r);
    }
  }
}
var Yr = {}, ht = Zt(Yr), Ar = Zt(Yr), Ur = Zt(Yr);
function dn(e) {
  if (e === Yr) throw Error(C(174));
  return e;
}
function ks(e, t) {
  switch (G(Ur, t), G(Ar, e), G(ht, Yr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : fi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = fi(t, e);
  }
  q(ht), G(ht, t);
}
function Jn() {
  q(ht), q(Ar), q(Ur);
}
function Tc(e) {
  dn(Ur.current);
  var t = dn(ht.current), n = fi(t, e.type);
  t !== n && (G(Ar, e), G(ht, n));
}
function Es(e) {
  Ar.current === e && (q(ht), q(Ar));
}
var ee = Zt(0);
function ql(e) {
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
var Yo = [];
function Cs() {
  for (var e = 0; e < Yo.length; e++) Yo[e]._workInProgressVersionPrimary = null;
  Yo.length = 0;
}
var Pl = Tt.ReactCurrentDispatcher, Go = Tt.ReactCurrentBatchConfig, yn = 0, te = null, de = null, ye = null, bl = !1, Er = !1, $r = 0, Cp = 0;
function Ee() {
  throw Error(C(321));
}
function _s(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!st(e[n], t[n])) return !1;
  return !0;
}
function Ns(e, t, n, r, l, o) {
  if (yn = o, te = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Pl.current = e === null || e.memoizedState === null ? zp : jp, e = n(r, l), Er) {
    o = 0;
    do {
      if (Er = !1, $r = 0, 25 <= o) throw Error(C(301));
      o += 1, ye = de = null, t.updateQueue = null, Pl.current = Pp, e = n(r, l);
    } while (Er);
  }
  if (Pl.current = eo, t = de !== null && de.next !== null, yn = 0, ye = de = te = null, bl = !1, t) throw Error(C(300));
  return e;
}
function Ts() {
  var e = $r !== 0;
  return $r = 0, e;
}
function ft() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ye === null ? te.memoizedState = ye = e : ye = ye.next = e, ye;
}
function qe() {
  if (de === null) {
    var e = te.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = de.next;
  var t = ye === null ? te.memoizedState : ye.next;
  if (t !== null) ye = t, de = e;
  else {
    if (e === null) throw Error(C(310));
    de = e, e = { memoizedState: de.memoizedState, baseState: de.baseState, baseQueue: de.baseQueue, queue: de.queue, next: null }, ye === null ? te.memoizedState = ye = e : ye = ye.next = e;
  }
  return ye;
}
function Br(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Jo(e) {
  var t = qe(), n = t.queue;
  if (n === null) throw Error(C(311));
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
    var s = i = null, u = null, c = o;
    do {
      var g = c.lane;
      if ((yn & g) === g) u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var p = {
          lane: g,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (s = u = p, i = r) : u = u.next = p, te.lanes |= g, vn |= g;
      }
      c = c.next;
    } while (c !== null && c !== o);
    u === null ? i = r : u.next = s, st(r, t.memoizedState) || (Ie = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, te.lanes |= o, vn |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Zo(e) {
  var t = qe(), n = t.queue;
  if (n === null) throw Error(C(311));
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
function zc() {
}
function jc(e, t) {
  var n = te, r = qe(), l = t(), o = !st(r.memoizedState, l);
  if (o && (r.memoizedState = l, Ie = !0), r = r.queue, zs(Rc.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || ye !== null && ye.memoizedState.tag & 1) {
    if (n.flags |= 2048, Wr(9, Lc.bind(null, n, r, l, t), void 0, null), ve === null) throw Error(C(349));
    yn & 30 || Pc(n, t, l);
  }
  return l;
}
function Pc(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = te.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, te.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Lc(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Mc(t) && Ic(e);
}
function Rc(e, t, n) {
  return n(function() {
    Mc(t) && Ic(e);
  });
}
function Mc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !st(e, n);
  } catch (r) {
    return !0;
  }
}
function Ic(e) {
  var t = _t(e, 1);
  t !== null && it(t, e, 1, -1);
}
function Fu(e) {
  var t = ft();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Br, lastRenderedState: e }, t.queue = e, e = e.dispatch = Tp.bind(null, te, e), [t.memoizedState, e];
}
function Wr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = te.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, te.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Dc() {
  return qe().memoizedState;
}
function Ll(e, t, n, r) {
  var l = ft();
  te.flags |= e, l.memoizedState = Wr(1 | t, n, void 0, r === void 0 ? null : r);
}
function ho(e, t, n, r) {
  var l = qe();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (de !== null) {
    var i = de.memoizedState;
    if (o = i.destroy, r !== null && _s(r, i.deps)) {
      l.memoizedState = Wr(t, n, o, r);
      return;
    }
  }
  te.flags |= e, l.memoizedState = Wr(1 | t, n, o, r);
}
function Au(e, t) {
  return Ll(8390656, 8, e, t);
}
function zs(e, t) {
  return ho(2048, 8, e, t);
}
function Oc(e, t) {
  return ho(4, 2, e, t);
}
function Fc(e, t) {
  return ho(4, 4, e, t);
}
function Ac(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Uc(e, t, n) {
  return n = n != null ? n.concat([e]) : null, ho(4, 4, Ac.bind(null, t, e), n);
}
function js() {
}
function $c(e, t) {
  var n = qe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && _s(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Bc(e, t) {
  var n = qe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && _s(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Wc(e, t, n) {
  return yn & 21 ? (st(n, t) || (n = Ka(), te.lanes |= n, vn |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Ie = !0), e.memoizedState = n);
}
function _p(e, t) {
  var n = Q;
  Q = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Go.transition;
  Go.transition = {};
  try {
    e(!1), t();
  } finally {
    Q = n, Go.transition = r;
  }
}
function Hc() {
  return qe().memoizedState;
}
function Np(e, t, n) {
  var r = Xt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Vc(e)) Qc(t, n);
  else if (n = _c(e, t, n, r), n !== null) {
    var l = je();
    it(n, e, r, l), Xc(n, t, r);
  }
}
function Tp(e, t, n) {
  var r = Xt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Vc(e)) Qc(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, s = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = s, st(s, i)) {
        var u = t.interleaved;
        u === null ? (l.next = l, ws(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch (c) {
    } finally {
    }
    n = _c(e, t, l, r), n !== null && (l = je(), it(n, e, r, l), Xc(n, t, r));
  }
}
function Vc(e) {
  var t = e.alternate;
  return e === te || t !== null && t === te;
}
function Qc(e, t) {
  Er = bl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Xc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, is(e, n);
  }
}
var eo = { readContext: Ze, useCallback: Ee, useContext: Ee, useEffect: Ee, useImperativeHandle: Ee, useInsertionEffect: Ee, useLayoutEffect: Ee, useMemo: Ee, useReducer: Ee, useRef: Ee, useState: Ee, useDebugValue: Ee, useDeferredValue: Ee, useTransition: Ee, useMutableSource: Ee, useSyncExternalStore: Ee, useId: Ee, unstable_isNewReconciler: !1 }, zp = { readContext: Ze, useCallback: function(e, t) {
  return ft().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Ze, useEffect: Au, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ll(
    4194308,
    4,
    Ac.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Ll(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Ll(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = ft();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = ft();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Np.bind(null, te, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = ft();
  return e = { current: e }, t.memoizedState = e;
}, useState: Fu, useDebugValue: js, useDeferredValue: function(e) {
  return ft().memoizedState = e;
}, useTransition: function() {
  var e = Fu(!1), t = e[0];
  return e = _p.bind(null, e[1]), ft().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = te, l = ft();
  if (b) {
    if (n === void 0) throw Error(C(407));
    n = n();
  } else {
    if (n = t(), ve === null) throw Error(C(349));
    yn & 30 || Pc(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Au(Rc.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, Wr(9, Lc.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = ft(), t = ve.identifierPrefix;
  if (b) {
    var n = St, r = wt;
    n = (r & ~(1 << 32 - ot(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = $r++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Cp++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, jp = {
  readContext: Ze,
  useCallback: $c,
  useContext: Ze,
  useEffect: zs,
  useImperativeHandle: Uc,
  useInsertionEffect: Oc,
  useLayoutEffect: Fc,
  useMemo: Bc,
  useReducer: Jo,
  useRef: Dc,
  useState: function() {
    return Jo(Br);
  },
  useDebugValue: js,
  useDeferredValue: function(e) {
    var t = qe();
    return Wc(t, de.memoizedState, e);
  },
  useTransition: function() {
    var e = Jo(Br)[0], t = qe().memoizedState;
    return [e, t];
  },
  useMutableSource: zc,
  useSyncExternalStore: jc,
  useId: Hc,
  unstable_isNewReconciler: !1
}, Pp = { readContext: Ze, useCallback: $c, useContext: Ze, useEffect: zs, useImperativeHandle: Uc, useInsertionEffect: Oc, useLayoutEffect: Fc, useMemo: Bc, useReducer: Zo, useRef: Dc, useState: function() {
  return Zo(Br);
}, useDebugValue: js, useDeferredValue: function(e) {
  var t = qe();
  return de === null ? t.memoizedState = e : Wc(t, de.memoizedState, e);
}, useTransition: function() {
  var e = Zo(Br)[0], t = qe().memoizedState;
  return [e, t];
}, useMutableSource: zc, useSyncExternalStore: jc, useId: Hc, unstable_isNewReconciler: !1 };
function nt(e, t) {
  if (e && e.defaultProps) {
    t = ne({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Ri(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : ne({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var mo = { isMounted: function(e) {
  return (e = e._reactInternals) ? Sn(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = je(), l = Xt(e), o = kt(r, l);
  o.payload = t, n != null && (o.callback = n), t = Vt(e, o, l), t !== null && (it(t, e, l, r), jl(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = je(), l = Xt(e), o = kt(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Vt(e, o, l), t !== null && (it(t, e, l, r), jl(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = je(), r = Xt(e), l = kt(n, r);
  l.tag = 2, t != null && (l.callback = t), t = Vt(e, l, r), t !== null && (it(t, e, r, n), jl(t, e, r));
} };
function Uu(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !Ir(n, r) || !Ir(l, o) : !0;
}
function Kc(e, t, n) {
  var r = !1, l = Gt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Ze(o) : (l = Oe(t) ? mn : Ne.current, r = t.contextTypes, o = (r = r != null) ? Kn(e, l) : Gt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = mo, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function $u(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && mo.enqueueReplaceState(t, t.state, null);
}
function Mi(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Ss(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = Ze(o) : (o = Oe(t) ? mn : Ne.current, l.context = Kn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Ri(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && mo.enqueueReplaceState(l, l.state, null), Zl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Zn(e, t) {
  try {
    var n = "", r = t;
    do
      n += ld(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function qo(e, t, n) {
  return { value: e, source: null, stack: n != null ? n : null, digest: t != null ? t : null };
}
function Ii(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Lp = typeof WeakMap == "function" ? WeakMap : Map;
function Yc(e, t, n) {
  n = kt(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    no || (no = !0, Vi = r), Ii(e, t);
  }, n;
}
function Gc(e, t, n) {
  n = kt(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Ii(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Ii(e, t), typeof r != "function" && (Qt === null ? Qt = /* @__PURE__ */ new Set([this]) : Qt.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function Bu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Lp();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Qp.bind(null, e, t, n), t.then(e, e));
}
function Wu(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Hu(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = kt(-1, 1), t.tag = 2, Vt(n, t, 1))), n.lanes |= 1), e);
}
var Rp = Tt.ReactCurrentOwner, Ie = !1;
function ze(e, t, n, r) {
  t.child = e === null ? Cc(t, null, n, r) : Gn(t, e.child, n, r);
}
function Vu(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return Vn(t, l), r = Ns(e, t, n, r, o, l), n = Ts(), e !== null && !Ie ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Nt(e, t, l)) : (b && n && hs(t), t.flags |= 1, ze(e, t, r, l), t.child);
}
function Qu(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Fs(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Jc(e, t, o, r, l)) : (e = Dl(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Ir, n(i, r) && e.ref === t.ref) return Nt(e, t, l);
  }
  return t.flags |= 1, e = Kt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Jc(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Ir(o, r) && e.ref === t.ref) if (Ie = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Ie = !0);
    else return t.lanes = e.lanes, Nt(e, t, l);
  }
  return Di(e, t, n, r, l);
}
function Zc(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(Un, Ae), Ae |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, G(Un, Ae), Ae |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, G(Un, Ae), Ae |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, G(Un, Ae), Ae |= r;
  return ze(e, t, l, n), t.child;
}
function qc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Di(e, t, n, r, l) {
  var o = Oe(n) ? mn : Ne.current;
  return o = Kn(t, o), Vn(t, l), n = Ns(e, t, n, r, o, l), r = Ts(), e !== null && !Ie ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Nt(e, t, l)) : (b && r && hs(t), t.flags |= 1, ze(e, t, n, l), t.child);
}
function Xu(e, t, n, r, l) {
  if (Oe(n)) {
    var o = !0;
    Xl(t);
  } else o = !1;
  if (Vn(t, l), t.stateNode === null) Rl(e, t), Kc(t, n, r), Mi(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, s = t.memoizedProps;
    i.props = s;
    var u = i.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Ze(c) : (c = Oe(n) ? mn : Ne.current, c = Kn(t, c));
    var g = n.getDerivedStateFromProps, p = typeof g == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    p || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== r || u !== c) && $u(t, i, r, c), Dt = !1;
    var h = t.memoizedState;
    i.state = h, Zl(t, r, i, l), u = t.memoizedState, s !== r || h !== u || De.current || Dt ? (typeof g == "function" && (Ri(t, n, g, r), u = t.memoizedState), (s = Dt || Uu(t, n, s, r, h, u, c)) ? (p || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), i.props = r, i.state = u, i.context = c, r = s) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, Nc(e, t), s = t.memoizedProps, c = t.type === t.elementType ? s : nt(t.type, s), i.props = c, p = t.pendingProps, h = i.context, u = n.contextType, typeof u == "object" && u !== null ? u = Ze(u) : (u = Oe(n) ? mn : Ne.current, u = Kn(t, u));
    var x = n.getDerivedStateFromProps;
    (g = typeof x == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== p || h !== u) && $u(t, i, r, u), Dt = !1, h = t.memoizedState, i.state = h, Zl(t, r, i, l);
    var S = t.memoizedState;
    s !== p || h !== S || De.current || Dt ? (typeof x == "function" && (Ri(t, n, x, r), S = t.memoizedState), (c = Dt || Uu(t, n, c, r, h, S, u) || !1) ? (g || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, S, u), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, S, u)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = S), i.props = r, i.state = S, i.context = u, r = c) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Oi(e, t, n, r, o, l);
}
function Oi(e, t, n, r, l, o) {
  qc(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && Lu(t, n, !1), Nt(e, t, o);
  r = t.stateNode, Rp.current = t;
  var s = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = Gn(t, e.child, null, o), t.child = Gn(t, null, s, o)) : ze(e, t, s, o), t.memoizedState = r.state, l && Lu(t, n, !0), t.child;
}
function bc(e) {
  var t = e.stateNode;
  t.pendingContext ? Pu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Pu(e, t.context, !1), ks(e, t.containerInfo);
}
function Ku(e, t, n, r, l) {
  return Yn(), gs(l), t.flags |= 256, ze(e, t, n, r), t.child;
}
var Fi = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ai(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function ef(e, t, n) {
  var r = t.pendingProps, l = ee.current, o = !1, i = (t.flags & 128) !== 0, s;
  if ((s = i) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), s ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), G(ee, l & 1), e === null)
    return Pi(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = vo(i, r, 0, null), e = hn(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Ai(n), t.memoizedState = Fi, e) : Ps(t, i));
  if (l = e.memoizedState, l !== null && (s = l.dehydrated, s !== null)) return Mp(e, t, i, r, s, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, s = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = Kt(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), s !== null ? o = Kt(s, o) : (o = hn(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? Ai(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = Fi, r;
  }
  return o = e.child, e = o.sibling, r = Kt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Ps(e, t) {
  return t = vo({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function wl(e, t, n, r) {
  return r !== null && gs(r), Gn(t, e.child, null, n), e = Ps(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Mp(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = qo(Error(C(422))), wl(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = vo({ mode: "visible", children: r.children }, l, 0, null), o = hn(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Gn(t, e.child, null, i), t.child.memoizedState = Ai(i), t.memoizedState = Fi, o);
  if (!(t.mode & 1)) return wl(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var s = r.dgst;
    return r = s, o = Error(C(419)), r = qo(o, r, void 0), wl(e, t, i, r);
  }
  if (s = (i & e.childLanes) !== 0, Ie || s) {
    if (r = ve, r !== null) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, _t(e, l), it(r, e, l, -1));
    }
    return Os(), r = qo(Error(C(421))), wl(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Xp.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Ue = Ht(l.nextSibling), $e = t, b = !0, lt = null, e !== null && (Ke[Ye++] = wt, Ke[Ye++] = St, Ke[Ye++] = gn, wt = e.id, St = e.overflow, gn = t), t = Ps(t, r.children), t.flags |= 4096, t);
}
function Yu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Li(e.return, t, n);
}
function bo(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function tf(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (ze(e, t, r.children, n), r = ee.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Yu(e, n, t);
      else if (e.tag === 19) Yu(e, n, t);
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
  if (G(ee, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && ql(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), bo(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && ql(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      bo(t, !0, n, null, o);
      break;
    case "together":
      bo(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Rl(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Nt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), vn |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(C(153));
  if (t.child !== null) {
    for (e = t.child, n = Kt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Kt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Ip(e, t, n) {
  switch (t.tag) {
    case 3:
      bc(t), Yn();
      break;
    case 5:
      Tc(t);
      break;
    case 1:
      Oe(t.type) && Xl(t);
      break;
    case 4:
      ks(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      G(Gl, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (G(ee, ee.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? ef(e, t, n) : (G(ee, ee.current & 1), e = Nt(e, t, n), e !== null ? e.sibling : null);
      G(ee, ee.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return tf(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), G(ee, ee.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Zc(e, t, n);
  }
  return Nt(e, t, n);
}
var nf, Ui, rf, lf;
nf = function(e, t) {
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
Ui = function() {
};
rf = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, dn(ht.current);
    var o = null;
    switch (n) {
      case "input":
        l = si(e, l), r = si(e, r), o = [];
        break;
      case "select":
        l = ne({}, l, { value: void 0 }), r = ne({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = ci(e, l), r = ci(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Vl);
    }
    di(n, r);
    var i;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var s = l[c];
      for (i in s) s.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Tr.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (s = l != null ? l[c] : void 0, r.hasOwnProperty(c) && u !== s && (u != null || s != null)) if (c === "style") if (s) {
        for (i in s) !s.hasOwnProperty(i) || u && u.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in u) u.hasOwnProperty(i) && s[i] !== u[i] && (n || (n = {}), n[i] = u[i]);
      } else n || (o || (o = []), o.push(
        c,
        n
      )), n = u;
      else c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, s = s ? s.__html : void 0, u != null && s !== u && (o = o || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Tr.hasOwnProperty(c) ? (u != null && c === "onScroll" && Z("scroll", e), o || s === u || (o = [])) : (o = o || []).push(c, u));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
lf = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function dr(e, t) {
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
function Ce(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Dp(e, t, n) {
  var r = t.pendingProps;
  switch (ms(t), t.tag) {
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
      return Ce(t), null;
    case 1:
      return Oe(t.type) && Ql(), Ce(t), null;
    case 3:
      return r = t.stateNode, Jn(), q(De), q(Ne), Cs(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (vl(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, lt !== null && (Ki(lt), lt = null))), Ui(e, t), Ce(t), null;
    case 5:
      Es(t);
      var l = dn(Ur.current);
      if (n = t.type, e !== null && t.stateNode != null) rf(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(C(166));
          return Ce(t), null;
        }
        if (e = dn(ht.current), vl(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[dt] = t, r[Fr] = o, e = (t.mode & 1) !== 0, n) {
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
              for (l = 0; l < yr.length; l++) Z(yr[l], r);
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
              ru(r, o), Z("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Z("invalid", r);
              break;
            case "textarea":
              ou(r, o), Z("invalid", r);
          }
          di(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var s = o[i];
            i === "children" ? typeof s == "string" ? r.textContent !== s && (o.suppressHydrationWarning !== !0 && yl(r.textContent, s, e), l = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (o.suppressHydrationWarning !== !0 && yl(
              r.textContent,
              s,
              e
            ), l = ["children", "" + s]) : Tr.hasOwnProperty(i) && s != null && i === "onScroll" && Z("scroll", r);
          }
          switch (n) {
            case "input":
              al(r), lu(r, o, !0);
              break;
            case "textarea":
              al(r), iu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Vl);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ra(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[dt] = t, e[Fr] = r, nf(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = pi(n, r), n) {
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
                for (l = 0; l < yr.length; l++) Z(yr[l], e);
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
                ru(e, r), l = si(e, r), Z("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = ne({}, r, { value: void 0 }), Z("invalid", e);
                break;
              case "textarea":
                ou(e, r), l = ci(e, r), Z("invalid", e);
                break;
              default:
                l = r;
            }
            di(n, l), s = l;
            for (o in s) if (s.hasOwnProperty(o)) {
              var u = s[o];
              o === "style" ? Da(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Ma(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && zr(e, u) : typeof u == "number" && zr(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Tr.hasOwnProperty(o) ? u != null && o === "onScroll" && Z("scroll", e) : u != null && es(e, o, u, i));
            }
            switch (n) {
              case "input":
                al(e), lu(e, r, !1);
                break;
              case "textarea":
                al(e), iu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Yt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? $n(e, !!r.multiple, o, !1) : r.defaultValue != null && $n(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Vl);
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
      return Ce(t), null;
    case 6:
      if (e && t.stateNode != null) lf(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(C(166));
        if (n = dn(Ur.current), dn(ht.current), vl(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[dt] = t, (o = r.nodeValue !== n) && (e = $e, e !== null)) switch (e.tag) {
            case 3:
              yl(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && yl(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[dt] = t, t.stateNode = r;
      }
      return Ce(t), null;
    case 13:
      if (q(ee), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (b && Ue !== null && t.mode & 1 && !(t.flags & 128)) kc(), Yn(), t.flags |= 98560, o = !1;
        else if (o = vl(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(C(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(C(317));
            o[dt] = t;
          } else Yn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          Ce(t), o = !1;
        } else lt !== null && (Ki(lt), lt = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || ee.current & 1 ? pe === 0 && (pe = 3) : Os())), t.updateQueue !== null && (t.flags |= 4), Ce(t), null);
    case 4:
      return Jn(), Ui(e, t), e === null && Dr(t.stateNode.containerInfo), Ce(t), null;
    case 10:
      return xs(t.type._context), Ce(t), null;
    case 17:
      return Oe(t.type) && Ql(), Ce(t), null;
    case 19:
      if (q(ee), o = t.memoizedState, o === null) return Ce(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) dr(o, !1);
      else {
        if (pe !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = ql(e), i !== null) {
            for (t.flags |= 128, dr(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return G(ee, ee.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && ie() > qn && (t.flags |= 128, r = !0, dr(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = ql(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), dr(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !b) return Ce(t), null;
        } else 2 * ie() - o.renderingStartTime > qn && n !== 1073741824 && (t.flags |= 128, r = !0, dr(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = ie(), t.sibling = null, n = ee.current, G(ee, r ? n & 1 | 2 : n & 1), t) : (Ce(t), null);
    case 22:
    case 23:
      return Ds(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Ae & 1073741824 && (Ce(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ce(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(C(156, t.tag));
}
function Op(e, t) {
  switch (ms(t), t.tag) {
    case 1:
      return Oe(t.type) && Ql(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Jn(), q(De), q(Ne), Cs(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Es(t), null;
    case 13:
      if (q(ee), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(C(340));
        Yn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return q(ee), null;
    case 4:
      return Jn(), null;
    case 10:
      return xs(t.type._context), null;
    case 22:
    case 23:
      return Ds(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Sl = !1, _e = !1, Fp = typeof WeakSet == "function" ? WeakSet : Set, L = null;
function An(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    oe(e, t, r);
  }
  else n.current = null;
}
function $i(e, t, n) {
  try {
    n();
  } catch (r) {
    oe(e, t, r);
  }
}
var Gu = !1;
function Ap(e, t) {
  if (Ei = Bl, e = ac(), ps(e)) {
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
        var i = 0, s = -1, u = -1, c = 0, g = 0, p = e, h = null;
        t: for (; ; ) {
          for (var x; p !== n || l !== 0 && p.nodeType !== 3 || (s = i + l), p !== o || r !== 0 && p.nodeType !== 3 || (u = i + r), p.nodeType === 3 && (i += p.nodeValue.length), (x = p.firstChild) !== null; )
            h = p, p = x;
          for (; ; ) {
            if (p === e) break t;
            if (h === n && ++c === l && (s = i), h === o && ++g === r && (u = i), (x = p.nextSibling) !== null) break;
            p = h, h = p.parentNode;
          }
          p = x;
        }
        n = s === -1 || u === -1 ? null : { start: s, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ci = { focusedElem: e, selectionRange: n }, Bl = !1, L = t; L !== null; ) if (t = L, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, L = e;
  else for (; L !== null; ) {
    t = L;
    try {
      var S = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (S !== null) {
            var y = S.memoizedProps, F = S.memoizedState, f = t.stateNode, a = f.getSnapshotBeforeUpdate(t.elementType === t.type ? y : nt(t.type, y), F);
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
          throw Error(C(163));
      }
    } catch (v) {
      oe(t, t.return, v);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, L = e;
      break;
    }
    L = t.return;
  }
  return S = Gu, Gu = !1, S;
}
function Cr(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && $i(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function go(e, t) {
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
function Bi(e) {
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
function of(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, of(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[dt], delete t[Fr], delete t[Ti], delete t[wp], delete t[Sp])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function sf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ju(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || sf(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Wi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Vl));
  else if (r !== 4 && (e = e.child, e !== null)) for (Wi(e, t, n), e = e.sibling; e !== null; ) Wi(e, t, n), e = e.sibling;
}
function Hi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Hi(e, t, n), e = e.sibling; e !== null; ) Hi(e, t, n), e = e.sibling;
}
var we = null, rt = !1;
function Mt(e, t, n) {
  for (n = n.child; n !== null; ) uf(e, t, n), n = n.sibling;
}
function uf(e, t, n) {
  if (pt && typeof pt.onCommitFiberUnmount == "function") try {
    pt.onCommitFiberUnmount(so, n);
  } catch (s) {
  }
  switch (n.tag) {
    case 5:
      _e || An(n, t);
    case 6:
      var r = we, l = rt;
      we = null, Mt(e, t, n), we = r, rt = l, we !== null && (rt ? (e = we, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : we.removeChild(n.stateNode));
      break;
    case 18:
      we !== null && (rt ? (e = we, n = n.stateNode, e.nodeType === 8 ? Xo(e.parentNode, n) : e.nodeType === 1 && Xo(e, n), Rr(e)) : Xo(we, n.stateNode));
      break;
    case 4:
      r = we, l = rt, we = n.stateNode.containerInfo, rt = !0, Mt(e, t, n), we = r, rt = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!_e && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && $i(n, t, i), l = l.next;
        } while (l !== r);
      }
      Mt(e, t, n);
      break;
    case 1:
      if (!_e && (An(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (s) {
        oe(n, t, s);
      }
      Mt(e, t, n);
      break;
    case 21:
      Mt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (_e = (r = _e) || n.memoizedState !== null, Mt(e, t, n), _e = r) : Mt(e, t, n);
      break;
    default:
      Mt(e, t, n);
  }
}
function Zu(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Fp()), t.forEach(function(r) {
      var l = Kp.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function tt(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, i = t, s = i;
      e: for (; s !== null; ) {
        switch (s.tag) {
          case 5:
            we = s.stateNode, rt = !1;
            break e;
          case 3:
            we = s.stateNode.containerInfo, rt = !0;
            break e;
          case 4:
            we = s.stateNode.containerInfo, rt = !0;
            break e;
        }
        s = s.return;
      }
      if (we === null) throw Error(C(160));
      uf(o, i, l), we = null, rt = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (c) {
      oe(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) af(t, e), t = t.sibling;
}
function af(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (tt(t, e), ct(e), r & 4) {
        try {
          Cr(3, e, e.return), go(3, e);
        } catch (y) {
          oe(e, e.return, y);
        }
        try {
          Cr(5, e, e.return);
        } catch (y) {
          oe(e, e.return, y);
        }
      }
      break;
    case 1:
      tt(t, e), ct(e), r & 512 && n !== null && An(n, n.return);
      break;
    case 5:
      if (tt(t, e), ct(e), r & 512 && n !== null && An(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          zr(l, "");
        } catch (y) {
          oe(e, e.return, y);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, s = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          s === "input" && o.type === "radio" && o.name != null && Pa(l, o), pi(s, i);
          var c = pi(s, o);
          for (i = 0; i < u.length; i += 2) {
            var g = u[i], p = u[i + 1];
            g === "style" ? Da(l, p) : g === "dangerouslySetInnerHTML" ? Ma(l, p) : g === "children" ? zr(l, p) : es(l, g, p, c);
          }
          switch (s) {
            case "input":
              ui(l, o);
              break;
            case "textarea":
              La(l, o);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var x = o.value;
              x != null ? $n(l, !!o.multiple, x, !1) : h !== !!o.multiple && (o.defaultValue != null ? $n(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : $n(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[Fr] = o;
        } catch (y) {
          oe(e, e.return, y);
        }
      }
      break;
    case 6:
      if (tt(t, e), ct(e), r & 4) {
        if (e.stateNode === null) throw Error(C(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (y) {
          oe(e, e.return, y);
        }
      }
      break;
    case 3:
      if (tt(t, e), ct(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Rr(t.containerInfo);
      } catch (y) {
        oe(e, e.return, y);
      }
      break;
    case 4:
      tt(t, e), ct(e);
      break;
    case 13:
      tt(t, e), ct(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Ms = ie())), r & 4 && Zu(e);
      break;
    case 22:
      if (g = n !== null && n.memoizedState !== null, e.mode & 1 ? (_e = (c = _e) || g, tt(t, e), _e = c) : tt(t, e), ct(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !g && e.mode & 1) for (L = e, g = e.child; g !== null; ) {
          for (p = L = g; L !== null; ) {
            switch (h = L, x = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Cr(4, h, h.return);
                break;
              case 1:
                An(h, h.return);
                var S = h.stateNode;
                if (typeof S.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, S.props = t.memoizedProps, S.state = t.memoizedState, S.componentWillUnmount();
                  } catch (y) {
                    oe(r, n, y);
                  }
                }
                break;
              case 5:
                An(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  bu(p);
                  continue;
                }
            }
            x !== null ? (x.return = h, L = x) : bu(p);
          }
          g = g.sibling;
        }
        e: for (g = null, p = e; ; ) {
          if (p.tag === 5) {
            if (g === null) {
              g = p;
              try {
                l = p.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (s = p.stateNode, u = p.memoizedProps.style, i = u != null && u.hasOwnProperty("display") ? u.display : null, s.style.display = Ia("display", i));
              } catch (y) {
                oe(e, e.return, y);
              }
            }
          } else if (p.tag === 6) {
            if (g === null) try {
              p.stateNode.nodeValue = c ? "" : p.memoizedProps;
            } catch (y) {
              oe(e, e.return, y);
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
      tt(t, e), ct(e), r & 4 && Zu(e);
      break;
    case 21:
      break;
    default:
      tt(
        t,
        e
      ), ct(e);
  }
}
function ct(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (sf(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(C(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (zr(l, ""), r.flags &= -33);
          var o = Ju(e);
          Hi(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, s = Ju(e);
          Wi(e, s, i);
          break;
        default:
          throw Error(C(161));
      }
    } catch (u) {
      oe(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Up(e, t, n) {
  L = e, cf(e);
}
function cf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; L !== null; ) {
    var l = L, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Sl;
      if (!i) {
        var s = l.alternate, u = s !== null && s.memoizedState !== null || _e;
        s = Sl;
        var c = _e;
        if (Sl = i, (_e = u) && !c) for (L = l; L !== null; ) i = L, u = i.child, i.tag === 22 && i.memoizedState !== null ? ea(l) : u !== null ? (u.return = i, L = u) : ea(l);
        for (; o !== null; ) L = o, cf(o), o = o.sibling;
        L = l, Sl = s, _e = c;
      }
      qu(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, L = o) : qu(e);
  }
}
function qu(e) {
  for (; L !== null; ) {
    var t = L;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            _e || go(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !_e) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : nt(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Ou(t, o, r);
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
              Ou(t, i, n);
            }
            break;
          case 5:
            var s = t.stateNode;
            if (n === null && t.flags & 4) {
              n = s;
              var u = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  u.autoFocus && n.focus();
                  break;
                case "img":
                  u.src && (n.src = u.src);
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
                  p !== null && Rr(p);
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
            throw Error(C(163));
        }
        _e || t.flags & 512 && Bi(t);
      } catch (h) {
        oe(t, t.return, h);
      }
    }
    if (t === e) {
      L = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, L = n;
      break;
    }
    L = t.return;
  }
}
function bu(e) {
  for (; L !== null; ) {
    var t = L;
    if (t === e) {
      L = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, L = n;
      break;
    }
    L = t.return;
  }
}
function ea(e) {
  for (; L !== null; ) {
    var t = L;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            go(4, t);
          } catch (u) {
            oe(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              oe(t, l, u);
            }
          }
          var o = t.return;
          try {
            Bi(t);
          } catch (u) {
            oe(t, o, u);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Bi(t);
          } catch (u) {
            oe(t, i, u);
          }
      }
    } catch (u) {
      oe(t, t.return, u);
    }
    if (t === e) {
      L = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      s.return = t.return, L = s;
      break;
    }
    L = t.return;
  }
}
var $p = Math.ceil, to = Tt.ReactCurrentDispatcher, Ls = Tt.ReactCurrentOwner, Je = Tt.ReactCurrentBatchConfig, H = 0, ve = null, ce = null, Se = 0, Ae = 0, Un = Zt(0), pe = 0, Hr = null, vn = 0, yo = 0, Rs = 0, _r = null, Me = null, Ms = 0, qn = 1 / 0, yt = null, no = !1, Vi = null, Qt = null, kl = !1, Ut = null, ro = 0, Nr = 0, Qi = null, Ml = -1, Il = 0;
function je() {
  return H & 6 ? ie() : Ml !== -1 ? Ml : Ml = ie();
}
function Xt(e) {
  return e.mode & 1 ? H & 2 && Se !== 0 ? Se & -Se : Ep.transition !== null ? (Il === 0 && (Il = Ka()), Il) : (e = Q, e !== 0 || (e = window.event, e = e === void 0 ? 16 : ec(e.type)), e) : 1;
}
function it(e, t, n, r) {
  if (50 < Nr) throw Nr = 0, Qi = null, Error(C(185));
  Qr(e, n, r), (!(H & 2) || e !== ve) && (e === ve && (!(H & 2) && (yo |= n), pe === 4 && Ft(e, Se)), Fe(e, r), n === 1 && H === 0 && !(t.mode & 1) && (qn = ie() + 500, po && qt()));
}
function Fe(e, t) {
  var n = e.callbackNode;
  Ed(e, t);
  var r = $l(e, e === ve ? Se : 0);
  if (r === 0) n !== null && au(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && au(n), t === 1) e.tag === 0 ? kp(ta.bind(null, e)) : xc(ta.bind(null, e)), vp(function() {
      !(H & 6) && qt();
    }), n = null;
    else {
      switch (Ya(r)) {
        case 1:
          n = os;
          break;
        case 4:
          n = Qa;
          break;
        case 16:
          n = Ul;
          break;
        case 536870912:
          n = Xa;
          break;
        default:
          n = Ul;
      }
      n = vf(n, ff.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function ff(e, t) {
  if (Ml = -1, Il = 0, H & 6) throw Error(C(327));
  var n = e.callbackNode;
  if (Qn() && e.callbackNode !== n) return null;
  var r = $l(e, e === ve ? Se : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = lo(e, r);
  else {
    t = r;
    var l = H;
    H |= 2;
    var o = pf();
    (ve !== e || Se !== t) && (yt = null, qn = ie() + 500, pn(e, t));
    do
      try {
        Hp();
        break;
      } catch (s) {
        df(e, s);
      }
    while (!0);
    vs(), to.current = o, H = l, ce !== null ? t = 0 : (ve = null, Se = 0, t = pe);
  }
  if (t !== 0) {
    if (t === 2 && (l = vi(e), l !== 0 && (r = l, t = Xi(e, l))), t === 1) throw n = Hr, pn(e, 0), Ft(e, r), Fe(e, ie()), n;
    if (t === 6) Ft(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Bp(l) && (t = lo(e, r), t === 2 && (o = vi(e), o !== 0 && (r = o, t = Xi(e, o))), t === 1)) throw n = Hr, pn(e, 0), Ft(e, r), Fe(e, ie()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(C(345));
        case 2:
          an(e, Me, yt);
          break;
        case 3:
          if (Ft(e, r), (r & 130023424) === r && (t = Ms + 500 - ie(), 10 < t)) {
            if ($l(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              je(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Ni(an.bind(null, e, Me, yt), t);
            break;
          }
          an(e, Me, yt);
          break;
        case 4:
          if (Ft(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - ot(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = ie() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * $p(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Ni(an.bind(null, e, Me, yt), r);
            break;
          }
          an(e, Me, yt);
          break;
        case 5:
          an(e, Me, yt);
          break;
        default:
          throw Error(C(329));
      }
    }
  }
  return Fe(e, ie()), e.callbackNode === n ? ff.bind(null, e) : null;
}
function Xi(e, t) {
  var n = _r;
  return e.current.memoizedState.isDehydrated && (pn(e, t).flags |= 256), e = lo(e, t), e !== 2 && (t = Me, Me = n, t !== null && Ki(t)), e;
}
function Ki(e) {
  Me === null ? Me = e : Me.push.apply(Me, e);
}
function Bp(e) {
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
function Ft(e, t) {
  for (t &= ~Rs, t &= ~yo, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - ot(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function ta(e) {
  if (H & 6) throw Error(C(327));
  Qn();
  var t = $l(e, 0);
  if (!(t & 1)) return Fe(e, ie()), null;
  var n = lo(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = vi(e);
    r !== 0 && (t = r, n = Xi(e, r));
  }
  if (n === 1) throw n = Hr, pn(e, 0), Ft(e, t), Fe(e, ie()), n;
  if (n === 6) throw Error(C(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, an(e, Me, yt), Fe(e, ie()), null;
}
function Is(e, t) {
  var n = H;
  H |= 1;
  try {
    return e(t);
  } finally {
    H = n, H === 0 && (qn = ie() + 500, po && qt());
  }
}
function xn(e) {
  Ut !== null && Ut.tag === 0 && !(H & 6) && Qn();
  var t = H;
  H |= 1;
  var n = Je.transition, r = Q;
  try {
    if (Je.transition = null, Q = 1, e) return e();
  } finally {
    Q = r, Je.transition = n, H = t, !(H & 6) && qt();
  }
}
function Ds() {
  Ae = Un.current, q(Un);
}
function pn(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, yp(n)), ce !== null) for (n = ce.return; n !== null; ) {
    var r = n;
    switch (ms(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Ql();
        break;
      case 3:
        Jn(), q(De), q(Ne), Cs();
        break;
      case 5:
        Es(r);
        break;
      case 4:
        Jn();
        break;
      case 13:
        q(ee);
        break;
      case 19:
        q(ee);
        break;
      case 10:
        xs(r.type._context);
        break;
      case 22:
      case 23:
        Ds();
    }
    n = n.return;
  }
  if (ve = e, ce = e = Kt(e.current, null), Se = Ae = t, pe = 0, Hr = null, Rs = yo = vn = 0, Me = _r = null, fn !== null) {
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
function df(e, t) {
  do {
    var n = ce;
    try {
      if (vs(), Pl.current = eo, bl) {
        for (var r = te.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        bl = !1;
      }
      if (yn = 0, ye = de = te = null, Er = !1, $r = 0, Ls.current = null, n === null || n.return === null) {
        pe = 1, Hr = t, ce = null;
        break;
      }
      e: {
        var o = e, i = n.return, s = n, u = t;
        if (t = Se, s.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, g = s, p = g.tag;
          if (!(g.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var h = g.alternate;
            h ? (g.updateQueue = h.updateQueue, g.memoizedState = h.memoizedState, g.lanes = h.lanes) : (g.updateQueue = null, g.memoizedState = null);
          }
          var x = Wu(i);
          if (x !== null) {
            x.flags &= -257, Hu(x, i, s, o, t), x.mode & 1 && Bu(o, c, t), t = x, u = c;
            var S = t.updateQueue;
            if (S === null) {
              var y = /* @__PURE__ */ new Set();
              y.add(u), t.updateQueue = y;
            } else S.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Bu(o, c, t), Os();
              break e;
            }
            u = Error(C(426));
          }
        } else if (b && s.mode & 1) {
          var F = Wu(i);
          if (F !== null) {
            !(F.flags & 65536) && (F.flags |= 256), Hu(F, i, s, o, t), gs(Zn(u, s));
            break e;
          }
        }
        o = u = Zn(u, s), pe !== 4 && (pe = 2), _r === null ? _r = [o] : _r.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var f = Yc(o, u, t);
              Du(o, f);
              break e;
            case 1:
              s = u;
              var a = o.type, d = o.stateNode;
              if (!(o.flags & 128) && (typeof a.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (Qt === null || !Qt.has(d)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var v = Gc(o, s, t);
                Du(o, v);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      mf(n);
    } catch (E) {
      t = E, ce === n && n !== null && (ce = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function pf() {
  var e = to.current;
  return to.current = eo, e === null ? eo : e;
}
function Os() {
  (pe === 0 || pe === 3 || pe === 2) && (pe = 4), ve === null || !(vn & 268435455) && !(yo & 268435455) || Ft(ve, Se);
}
function lo(e, t) {
  var n = H;
  H |= 2;
  var r = pf();
  (ve !== e || Se !== t) && (yt = null, pn(e, t));
  do
    try {
      Wp();
      break;
    } catch (l) {
      df(e, l);
    }
  while (!0);
  if (vs(), H = n, to.current = r, ce !== null) throw Error(C(261));
  return ve = null, Se = 0, pe;
}
function Wp() {
  for (; ce !== null; ) hf(ce);
}
function Hp() {
  for (; ce !== null && !hd(); ) hf(ce);
}
function hf(e) {
  var t = yf(e.alternate, e, Ae);
  e.memoizedProps = e.pendingProps, t === null ? mf(e) : ce = t, Ls.current = null;
}
function mf(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Op(n, t), n !== null) {
        n.flags &= 32767, ce = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        pe = 6, ce = null;
        return;
      }
    } else if (n = Dp(n, t, Ae), n !== null) {
      ce = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      ce = t;
      return;
    }
    ce = t = e;
  } while (t !== null);
  pe === 0 && (pe = 5);
}
function an(e, t, n) {
  var r = Q, l = Je.transition;
  try {
    Je.transition = null, Q = 1, Vp(e, t, n, r);
  } finally {
    Je.transition = l, Q = r;
  }
  return null;
}
function Vp(e, t, n, r) {
  do
    Qn();
  while (Ut !== null);
  if (H & 6) throw Error(C(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(C(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Cd(e, o), e === ve && (ce = ve = null, Se = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || kl || (kl = !0, vf(Ul, function() {
    return Qn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Je.transition, Je.transition = null;
    var i = Q;
    Q = 1;
    var s = H;
    H |= 4, Ls.current = null, Ap(e, n), af(n, e), cp(Ci), Bl = !!Ei, Ci = Ei = null, e.current = n, Up(n), md(), H = s, Q = i, Je.transition = o;
  } else e.current = n;
  if (kl && (kl = !1, Ut = e, ro = l), o = e.pendingLanes, o === 0 && (Qt = null), vd(n.stateNode), Fe(e, ie()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (no) throw no = !1, e = Vi, Vi = null, e;
  return ro & 1 && e.tag !== 0 && Qn(), o = e.pendingLanes, o & 1 ? e === Qi ? Nr++ : (Nr = 0, Qi = e) : Nr = 0, qt(), null;
}
function Qn() {
  if (Ut !== null) {
    var e = Ya(ro), t = Je.transition, n = Q;
    try {
      if (Je.transition = null, Q = 16 > e ? 16 : e, Ut === null) var r = !1;
      else {
        if (e = Ut, Ut = null, ro = 0, H & 6) throw Error(C(331));
        var l = H;
        for (H |= 4, L = e.current; L !== null; ) {
          var o = L, i = o.child;
          if (L.flags & 16) {
            var s = o.deletions;
            if (s !== null) {
              for (var u = 0; u < s.length; u++) {
                var c = s[u];
                for (L = c; L !== null; ) {
                  var g = L;
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Cr(8, g, o);
                  }
                  var p = g.child;
                  if (p !== null) p.return = g, L = p;
                  else for (; L !== null; ) {
                    g = L;
                    var h = g.sibling, x = g.return;
                    if (of(g), g === c) {
                      L = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = x, L = h;
                      break;
                    }
                    L = x;
                  }
                }
              }
              var S = o.alternate;
              if (S !== null) {
                var y = S.child;
                if (y !== null) {
                  S.child = null;
                  do {
                    var F = y.sibling;
                    y.sibling = null, y = F;
                  } while (y !== null);
                }
              }
              L = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, L = i;
          else e: for (; L !== null; ) {
            if (o = L, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Cr(9, o, o.return);
            }
            var f = o.sibling;
            if (f !== null) {
              f.return = o.return, L = f;
              break e;
            }
            L = o.return;
          }
        }
        var a = e.current;
        for (L = a; L !== null; ) {
          i = L;
          var d = i.child;
          if (i.subtreeFlags & 2064 && d !== null) d.return = i, L = d;
          else e: for (i = a; L !== null; ) {
            if (s = L, s.flags & 2048) try {
              switch (s.tag) {
                case 0:
                case 11:
                case 15:
                  go(9, s);
              }
            } catch (E) {
              oe(s, s.return, E);
            }
            if (s === i) {
              L = null;
              break e;
            }
            var v = s.sibling;
            if (v !== null) {
              v.return = s.return, L = v;
              break e;
            }
            L = s.return;
          }
        }
        if (H = l, qt(), pt && typeof pt.onPostCommitFiberRoot == "function") try {
          pt.onPostCommitFiberRoot(so, e);
        } catch (E) {
        }
        r = !0;
      }
      return r;
    } finally {
      Q = n, Je.transition = t;
    }
  }
  return !1;
}
function na(e, t, n) {
  t = Zn(n, t), t = Yc(e, t, 1), e = Vt(e, t, 1), t = je(), e !== null && (Qr(e, 1, t), Fe(e, t));
}
function oe(e, t, n) {
  if (e.tag === 3) na(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      na(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Qt === null || !Qt.has(r))) {
        e = Zn(n, e), e = Gc(t, e, 1), t = Vt(t, e, 1), e = je(), t !== null && (Qr(t, 1, e), Fe(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Qp(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = je(), e.pingedLanes |= e.suspendedLanes & n, ve === e && (Se & n) === n && (pe === 4 || pe === 3 && (Se & 130023424) === Se && 500 > ie() - Ms ? pn(e, 0) : Rs |= n), Fe(e, t);
}
function gf(e, t) {
  t === 0 && (e.mode & 1 ? (t = dl, dl <<= 1, !(dl & 130023424) && (dl = 4194304)) : t = 1);
  var n = je();
  e = _t(e, t), e !== null && (Qr(e, t, n), Fe(e, n));
}
function Xp(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), gf(e, n);
}
function Kp(e, t) {
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
      throw Error(C(314));
  }
  r !== null && r.delete(t), gf(e, n);
}
var yf;
yf = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || De.current) Ie = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Ie = !1, Ip(e, t, n);
    Ie = !!(e.flags & 131072);
  }
  else Ie = !1, b && t.flags & 1048576 && wc(t, Yl, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Rl(e, t), e = t.pendingProps;
      var l = Kn(t, Ne.current);
      Vn(t, n), l = Ns(null, t, r, e, l, n);
      var o = Ts();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Oe(r) ? (o = !0, Xl(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Ss(t), l.updater = mo, t.stateNode = l, l._reactInternals = t, Mi(t, r, e, n), t = Oi(null, t, r, !0, o, n)) : (t.tag = 0, b && o && hs(t), ze(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Rl(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Gp(r), e = nt(r, e), l) {
          case 0:
            t = Di(null, t, r, e, n);
            break e;
          case 1:
            t = Xu(null, t, r, e, n);
            break e;
          case 11:
            t = Vu(null, t, r, e, n);
            break e;
          case 14:
            t = Qu(null, t, r, nt(r.type, e), n);
            break e;
        }
        throw Error(C(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : nt(r, l), Di(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : nt(r, l), Xu(e, t, r, l, n);
    case 3:
      e: {
        if (bc(t), e === null) throw Error(C(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, Nc(e, t), Zl(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = Zn(Error(C(423)), t), t = Ku(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = Zn(Error(C(424)), t), t = Ku(e, t, r, n, l);
          break e;
        } else for (Ue = Ht(t.stateNode.containerInfo.firstChild), $e = t, b = !0, lt = null, n = Cc(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Yn(), r === l) {
            t = Nt(e, t, n);
            break e;
          }
          ze(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Tc(t), e === null && Pi(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, _i(r, l) ? i = null : o !== null && _i(r, o) && (t.flags |= 32), qc(e, t), ze(e, t, i, n), t.child;
    case 6:
      return e === null && Pi(t), null;
    case 13:
      return ef(e, t, n);
    case 4:
      return ks(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Gn(t, null, r, n) : ze(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : nt(r, l), Vu(e, t, r, l, n);
    case 7:
      return ze(e, t, t.pendingProps, n), t.child;
    case 8:
      return ze(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ze(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, G(Gl, r._currentValue), r._currentValue = i, o !== null) if (st(o.value, i)) {
          if (o.children === l.children && !De.current) {
            t = Nt(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var s = o.dependencies;
          if (s !== null) {
            i = o.child;
            for (var u = s.firstContext; u !== null; ) {
              if (u.context === r) {
                if (o.tag === 1) {
                  u = kt(-1, n & -n), u.tag = 2;
                  var c = o.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var g = c.pending;
                    g === null ? u.next = u : (u.next = g.next, g.next = u), c.pending = u;
                  }
                }
                o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Li(
                  o.return,
                  n,
                  t
                ), s.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (i = o.return, i === null) throw Error(C(341));
            i.lanes |= n, s = i.alternate, s !== null && (s.lanes |= n), Li(i, n, t), i = o.sibling;
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
      return l = t.type, r = t.pendingProps.children, Vn(t, n), l = Ze(l), r = r(l), t.flags |= 1, ze(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = nt(r, t.pendingProps), l = nt(r.type, l), Qu(e, t, r, l, n);
    case 15:
      return Jc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : nt(r, l), Rl(e, t), t.tag = 1, Oe(r) ? (e = !0, Xl(t)) : e = !1, Vn(t, n), Kc(t, r, l), Mi(t, r, l, n), Oi(null, t, r, !0, e, n);
    case 19:
      return tf(e, t, n);
    case 22:
      return Zc(e, t, n);
  }
  throw Error(C(156, t.tag));
};
function vf(e, t) {
  return Va(e, t);
}
function Yp(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ge(e, t, n, r) {
  return new Yp(e, t, n, r);
}
function Fs(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Gp(e) {
  if (typeof e == "function") return Fs(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ns) return 11;
    if (e === rs) return 14;
  }
  return 2;
}
function Kt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ge(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Dl(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") Fs(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case jn:
      return hn(n.children, l, o, t);
    case ts:
      i = 8, l |= 8;
      break;
    case ri:
      return e = Ge(12, n, t, l | 2), e.elementType = ri, e.lanes = o, e;
    case li:
      return e = Ge(13, n, t, l), e.elementType = li, e.lanes = o, e;
    case oi:
      return e = Ge(19, n, t, l), e.elementType = oi, e.lanes = o, e;
    case Ta:
      return vo(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case _a:
          i = 10;
          break e;
        case Na:
          i = 9;
          break e;
        case ns:
          i = 11;
          break e;
        case rs:
          i = 14;
          break e;
        case It:
          i = 16, r = null;
          break e;
      }
      throw Error(C(130, e == null ? e : typeof e, ""));
  }
  return t = Ge(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function hn(e, t, n, r) {
  return e = Ge(7, e, r, t), e.lanes = n, e;
}
function vo(e, t, n, r) {
  return e = Ge(22, e, r, t), e.elementType = Ta, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ei(e, t, n) {
  return e = Ge(6, e, null, t), e.lanes = n, e;
}
function ti(e, t, n) {
  return t = Ge(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Jp(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Do(0), this.expirationTimes = Do(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Do(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function As(e, t, n, r, l, o, i, s, u) {
  return e = new Jp(e, t, n, s, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Ge(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ss(o), e;
}
function Zp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: zn, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function xf(e) {
  if (!e) return Gt;
  e = e._reactInternals;
  e: {
    if (Sn(e) !== e || e.tag !== 1) throw Error(C(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Oe(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(C(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Oe(n)) return vc(e, n, t);
  }
  return t;
}
function wf(e, t, n, r, l, o, i, s, u) {
  return e = As(n, r, !0, e, l, o, i, s, u), e.context = xf(null), n = e.current, r = je(), l = Xt(n), o = kt(r, l), o.callback = t != null ? t : null, Vt(n, o, l), e.current.lanes = l, Qr(e, l, r), Fe(e, r), e;
}
function xo(e, t, n, r) {
  var l = t.current, o = je(), i = Xt(l);
  return n = xf(n), t.context === null ? t.context = n : t.pendingContext = n, t = kt(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Vt(l, t, i), e !== null && (it(e, l, i, o), jl(e, l, i)), i;
}
function oo(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function ra(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Us(e, t) {
  ra(e, t), (e = e.alternate) && ra(e, t);
}
function qp() {
  return null;
}
var Sf = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function $s(e) {
  this._internalRoot = e;
}
wo.prototype.render = $s.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(C(409));
  xo(e, t, null, null);
};
wo.prototype.unmount = $s.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    xn(function() {
      xo(null, e, null, null);
    }), t[Ct] = null;
  }
};
function wo(e) {
  this._internalRoot = e;
}
wo.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Za();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Ot.length && t !== 0 && t < Ot[n].priority; n++) ;
    Ot.splice(n, 0, e), n === 0 && ba(e);
  }
};
function Bs(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function So(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function la() {
}
function bp(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = oo(i);
        o.call(c);
      };
    }
    var i = wf(t, r, e, 0, null, !1, !1, "", la);
    return e._reactRootContainer = i, e[Ct] = i.current, Dr(e.nodeType === 8 ? e.parentNode : e), xn(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var c = oo(u);
      s.call(c);
    };
  }
  var u = As(e, 0, !1, null, null, !1, !1, "", la);
  return e._reactRootContainer = u, e[Ct] = u.current, Dr(e.nodeType === 8 ? e.parentNode : e), xn(function() {
    xo(t, u, n, r);
  }), u;
}
function ko(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var s = l;
      l = function() {
        var u = oo(i);
        s.call(u);
      };
    }
    xo(t, i, e, l);
  } else i = bp(n, t, e, l, r);
  return oo(i);
}
Ga = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = gr(t.pendingLanes);
        n !== 0 && (is(t, n | 1), Fe(t, ie()), !(H & 6) && (qn = ie() + 500, qt()));
      }
      break;
    case 13:
      xn(function() {
        var r = _t(e, 1);
        if (r !== null) {
          var l = je();
          it(r, e, 1, l);
        }
      }), Us(e, 1);
  }
};
ss = function(e) {
  if (e.tag === 13) {
    var t = _t(e, 134217728);
    if (t !== null) {
      var n = je();
      it(t, e, 134217728, n);
    }
    Us(e, 134217728);
  }
};
Ja = function(e) {
  if (e.tag === 13) {
    var t = Xt(e), n = _t(e, t);
    if (n !== null) {
      var r = je();
      it(n, e, t, r);
    }
    Us(e, t);
  }
};
Za = function() {
  return Q;
};
qa = function(e, t) {
  var n = Q;
  try {
    return Q = e, t();
  } finally {
    Q = n;
  }
};
mi = function(e, t, n) {
  switch (t) {
    case "input":
      if (ui(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = fo(r);
            if (!l) throw Error(C(90));
            ja(r), ui(r, l);
          }
        }
      }
      break;
    case "textarea":
      La(e, n);
      break;
    case "select":
      t = n.value, t != null && $n(e, !!n.multiple, t, !1);
  }
};
Aa = Is;
Ua = xn;
var e0 = { usingClientEntryPoint: !1, Events: [Kr, Mn, fo, Oa, Fa, Is] }, pr = { findFiberByHostInstance: cn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, t0 = { bundleType: pr.bundleType, version: pr.version, rendererPackageName: pr.rendererPackageName, rendererConfig: pr.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Tt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Wa(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: pr.findFiberByHostInstance || qp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined") {
  var El = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!El.isDisabled && El.supportsFiber) try {
    so = El.inject(t0), pt = El;
  } catch (e) {
  }
}
We.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = e0;
We.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Bs(t)) throw Error(C(200));
  return Zp(e, t, null, n);
};
We.createRoot = function(e, t) {
  if (!Bs(e)) throw Error(C(299));
  var n = !1, r = "", l = Sf;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = As(e, 1, !1, null, null, n, !1, r, l), e[Ct] = t.current, Dr(e.nodeType === 8 ? e.parentNode : e), new $s(t);
};
We.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(C(188)) : (e = Object.keys(e).join(","), Error(C(268, e)));
  return e = Wa(t), e = e === null ? null : e.stateNode, e;
};
We.flushSync = function(e) {
  return xn(e);
};
We.hydrate = function(e, t, n) {
  if (!So(t)) throw Error(C(200));
  return ko(null, e, t, !0, n);
};
We.hydrateRoot = function(e, t, n) {
  if (!Bs(e)) throw Error(C(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = Sf;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = wf(t, null, e, 1, n != null ? n : null, l, !1, o, i), e[Ct] = t.current, Dr(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new wo(t);
};
We.render = function(e, t, n) {
  if (!So(t)) throw Error(C(200));
  return ko(null, e, t, !1, n);
};
We.unmountComponentAtNode = function(e) {
  if (!So(e)) throw Error(C(40));
  return e._reactRootContainer ? (xn(function() {
    ko(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ct] = null;
    });
  }), !0) : !1;
};
We.unstable_batchedUpdates = Is;
We.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!So(n)) throw Error(C(200));
  if (e == null || e._reactInternals === void 0) throw Error(C(38));
  return ko(e, t, n, !1, r);
};
We.version = "18.3.1-next-f1338f8080-20240426";
function kf() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ == "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(kf);
    } catch (e) {
      console.error(e);
    }
}
kf(), Sa.exports = We;
var n0 = Sa.exports, Ef, oa = n0;
Ef = oa.createRoot, oa.hydrateRoot;
const ia = [
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
], sa = { "#39ff14": 110, "#ff2fbf": 320, "#00e5ff": 190, "#ff6b6b": 0, "#ffd93d": 55, "#7c3aed": 265 };
function ua(e) {
  return ia[(e - 1) % ia.length];
}
function vt(e) {
  const t = Math.floor((e - 1) / 10) + 1, n = (e - 1) % 10 + 1, r = l0.worlds[t - 1];
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
function r0(e) {
  return vt(e).tiles;
}
function Tn(e) {
  return vt(e).time;
}
const aa = [
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
], l0 = {
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
      time: [30, 28, 26, 24, 22, 20, 20, 20, 20, 20],
      notes: "Mundo 3 — más fichas y menos tiempo."
    },
    {
      id: 4,
      mechanics: [["double"], ["double"], ["double"], ["drag", "double"], ["drag"], ["double"], ["drag", "double"], ["drag", "double"], ["double"], ["drag", "double"]],
      tiles: [5, 5, 6, 6, 7, 7, 8, 8, 9, 9],
      time: [28, 26, 24, 22, 20, 20, 20, 19, 18, 20],
      notes: "Mundo 4 — introduce doble toque y combina mecánicas."
    },
    {
      id: 5,
      mechanics: [["touch", "drag", "double"], ["touch", "drag", "double"], ["touch", "drag", "double"], ["touch", "drag", "double"], ["touch", "drag", "double"], ["touch", "drag", "double"], ["touch", "drag", "double"], ["touch", "drag", "double"], ["touch", "drag", "double"], ["touch", "drag", "double"]],
      tiles: [6, 7, 8, 8, 9, 9, 9, 9, 9, 9],
      time: [24, 22, 20, 20, 20, 20, 19, 18, 18, 20],
      notes: "Mundo 5 — dominio total de todas las mecánicas."
    }
  ]
};
function o0(e, t = 0.15) {
  const n = N.useRef(null), r = N.useRef(null), l = N.useRef(null), o = typeof window != "undefined" ? window : {}, i = () => {
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
  }, s = (y = 440, F = 0.12, f = "sine", a = 0.07) => {
    const d = i();
    if (d)
      try {
        const v = d.createOscillator(), E = d.createGain();
        v.type = f, v.frequency.value = y, E.gain.value = a, v.connect(E), E.connect(d.destination), d.state === "suspended" && d.resume().catch(() => {
        });
        const _ = d.currentTime;
        v.start(_), v.stop(_ + F);
      } catch (v) {
      }
  }, u = (y, F = 0.12, f = 0.04) => {
    const a = i();
    if (!(!a || !y || !y.length))
      try {
        a.state === "suspended" && a.resume().catch(() => {
        }), y.forEach((d, v) => {
          const E = a.createOscillator(), _ = a.createGain();
          E.type = "triangle", E.frequency.value = d, _.gain.value = 0.08, E.connect(_), _.connect(a.destination);
          const P = a.currentTime + v * (F + f);
          E.start(P), E.stop(P + F);
        });
      } catch (d) {
      }
  }, c = () => {
    if (!r.current)
      try {
        const y = new Audio("lumetrix/audio/audiofondo.mp3");
        y.loop = !0, y.volume = t, r.current = y;
      } catch (y) {
        console.log("Error cargando audio de fondo:", y);
      }
  }, g = (y = !0) => {
    if (!(!y || !r.current))
      try {
        r.current.play().catch((F) => {
          console.log("Error reproduciendo audio de fondo:", F);
        });
      } catch (F) {
      }
  }, p = () => {
    if (r.current)
      try {
        r.current.pause(), r.current.currentTime = 0;
      } catch (y) {
      }
  }, h = (y) => {
    r.current && (r.current.volume = y);
  }, x = () => {
    if (!l.current)
      try {
        const y = new Audio("lumetrix/audio/jugar.mp3");
        y.volume = 0.7, l.current = y;
      } catch (y) {
        console.log("Error cargando audio de inicio:", y);
      }
  }, S = () => {
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
      S();
    },
    ok: (y) => s(y || 880, 0.1, "triangle", 0.07),
    fail: () => s(260, 0.12, "sine", 0.045),
    // suave "meck"
    blink: (y) => s(y || 720, 0.12, "sine", 0.08),
    // Victoria: siempre trozo corto (5–6 notas) + retraso 300ms
    winMelody: (y) => {
      const F = y && y.length ? y.slice(0, 6) : [659.25, 880, 1046.5];
      setTimeout(() => u(F, 0.12, 0.04), 300);
    },
    // Audio de fondo
    initBg: c,
    startBg: g,
    stopBg: p,
    updateVolume: h,
    // Audio de inicio
    initStart: x
  };
}
function gt(e, t) {
  try {
    t && navigator.vibrate && navigator.vibrate(e);
  } catch (n) {
  }
}
function i0() {
  N.useEffect(() => {
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
      .board{position:relative;margin:10px 10px 5px 10px;border-radius:16px;border:2px solid var(--accent);box-shadow:0 0 12px var(--accent);height:calc(100% - 105px);overflow:hidden;animation:pulseGlow 2s ease-in-out infinite}
      @keyframes pulseGlow{0%,100%{box-shadow:0 0 12px var(--accent)}50%{box-shadow:0 0 14px var(--accent),0 0 18px var(--accent)}}
      .tile{position:absolute;border-radius:12px;border:1px solid #ffffff2f;z-index:1;touch-action:manipulation;transition:filter .12s ease, transform .2s ease-out, box-shadow .2s ease-out;cursor:pointer}
      .tile:active{transform:scale(1.05);box-shadow:0 0 15px currentColor, 0 0 25px currentColor}
      .tile.dragging{transform:scale(1.1);z-index:100;box-shadow:0 0 20px rgba(255,255,255,0.5);cursor:grabbing}
      .drop-zone{border:3px solid #ffffff66;border-radius:12px;background:transparent;pointer-events:none;z-index:100}
      .drop-zone.drag-over{border-style:solid;transform:scale(1.1);box-shadow:0 0 25px currentColor}
      .lit{box-shadow:0 0 10px var(--accent), 0 0 18px var(--accent); filter:brightness(1.18)}
      .overlay{position:absolute;inset:0;display:grid;place-items:center;z-index:2}
      .modal{position:fixed;inset:0;background:#000c;display:flex;align-items:center;justify-content:center;z-index:50;padding:20px}
      .card{position:relative;width:280px;max-width:85vw;background:#000;border:1px solid #ffffff1f;border-radius:14px;box-shadow:0 0 12px #ff2fbf55;color:#fff;padding:20px;min-height:auto;max-height:80vh;overflow-y:auto}
      .card h3{margin-top:0;margin-bottom:16px;padding-top:4px}
      .card-compact{position:relative;width:280px;max-width:85vw;background:#000;border:1px solid #ffffff1f;border-radius:14px;box-shadow:0 0 12px #ff2fbf55;color:#fff;padding:24px;min-height:200px;max-height:240px}
      .closer{position:absolute;right:8px;top:8px;width:28px;height:28px;border-radius:999px;background:#000b;border:1px solid #ffffff33;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;font-size:14px;line-height:1}
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
      
      /* ---- Drag Nudge / Hints ---- */
      @keyframes nudgeShake {
        0% { transform: translate(0,0) rotate(0deg) }
        20% { transform: translate(2px, -1px) rotate(-1.2deg) }
        40% { transform: translate(-2px, 1px) rotate(1.2deg) }
        60% { transform: translate(2px, 0px) rotate(-0.8deg) }
        80% { transform: translate(-1px, 1px) rotate(0.8deg) }
        100% { transform: translate(0,0) rotate(0deg) }
      }
      .tile.nudge-shake {
        animation: nudgeShake .45s ease both;
        filter: brightness(1.12);
      }

      @keyframes pulseRing {
        0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.35), 0 0 18px currentColor; }
        70%  { box-shadow: 0 0 0 10px rgba(255,255,255,0),   0 0 18px currentColor; }
        100% { box-shadow: 0 0 0 0 rgba(255,255,255,0),      0 0 18px currentColor; }
      }
      .drop-zone.pulse {
        animation: pulseRing .9s ease-out 1;
      }

      .drag-hint {
        position: absolute;
        pointer-events: none;
        z-index: 1000;
        padding: 6px 10px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 800;
        color: #000;
        background: #00fff0;
        box-shadow: 0 0 12px #00fff077;
        transform: translate(-50%, -140%);
        opacity: 0;
        transition: opacity .12s ease, transform .25s ease;
      }
      .drag-hint.show {
        opacity: 1;
        transform: translate(-50%, -160%);
      }
      .drag-hint::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: -6px;
        width: 0; height: 0;
        transform: translateX(-50%);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #00fff0;
      }
    `, document.head.appendChild(t), () => {
      try {
        document.head.removeChild(t);
      } catch (n) {
      }
    };
  }, []);
}
function s0({ onPlay: e, onAuth: t }) {
  const n = N.useRef(null), r = N.useRef(null), [l, o] = N.useState(!1), [i, s] = N.useState(null), u = async () => {
    try {
      await window.LUM_API.api("auth.php?action=logout"), o(!1), s(null), window.location.reload();
    } catch (c) {
      console.log("Error al cerrar sesión");
    }
  };
  return N.useEffect(() => {
    const c = n.current;
    if (!c) return;
    const p = setInterval(() => {
      const h = document.createElement("i"), x = 20 + Math.random() * 25, S = 40 + Math.random() * 60;
      let y, F;
      if (Math.random() < 0.7) {
        const v = [
          { x: [0, 15], y: [0, 100] },
          // Lado izquierdo
          { x: [85, 100], y: [0, 100] },
          // Lado derecho  
          { x: [0, 100], y: [0, 15] },
          // Parte superior
          { x: [0, 100], y: [85, 100] }
          // Parte inferior
        ], E = v[Math.floor(Math.random() * v.length)];
        y = E.x[0] + Math.random() * (E.x[1] - E.x[0]), F = E.y[0] + Math.random() * (E.y[1] - E.y[0]);
      } else
        y = Math.random() * 100, F = Math.random() * 100;
      h.style.left = y + "%", h.style.top = F + "%", h.style.width = x + "px", h.style.height = S + "px";
      const a = [0, 60, 120, 180, 240, 300, 45, 135, 225, 315], d = a[Math.floor(Math.random() * a.length)];
      h.style.background = `hsl(${d} 95% 65% / .9)`, c.appendChild(h), setTimeout(() => h.remove(), 3e3);
    }, 80);
    return () => clearInterval(p);
  }, []), N.useEffect(() => {
    const c = () => {
      var y;
      const p = r.current;
      if (!p) return;
      const h = (y = p.parentElement) == null ? void 0 : y.parentElement;
      if (!h) return;
      p.style.fontSize = "";
      let x = Math.min(42, Math.max(28, Math.floor(h.clientWidth * 0.16)));
      p.style.fontSize = x + "px", p.style.letterSpacing = "0.16em";
      let S = 0;
      for (; p.scrollWidth > h.clientWidth - 24 && S < 20; )
        x -= 1, p.style.fontSize = x + "px", S++;
    };
    c();
    const g = new ResizeObserver(c);
    return g.observe(document.body), () => g.disconnect();
  }, []), N.useEffect(() => {
    (async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const g = await window.LUM_API.api("auth.php?action=check_session");
          g && g.success && (o(!0), s(g.user));
        }
      } catch (g) {
        console.log("No hay sesión activa"), o(!1), s(null);
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
        /* @__PURE__ */ m.jsx("img", { src: "lumetrix/img/logo.png", alt: "LUMETRIX", style: {
          height: "150px",
          width: "500px",
          filter: "drop-shadow(0 0 20px #39ff14) drop-shadow(0 0 40px #00ffff) drop-shadow(0 0 60px #ff00ff)",
          animation: "logoGlow 2s ease-in-out infinite alternate"
        }, onError: (c) => {
          c.target.style.display = "none", c.target.nextSibling.style.display = "block";
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
      l ? (
        // Usuario logueado - mostrar progreso guardado
        /* @__PURE__ */ m.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
          /* @__PURE__ */ m.jsxs("div", { style: { fontSize: 18, opacity: 0.9, color: "#39ff14", fontWeight: 700, marginBottom: 16 }, children: [
            "¡Hola, ",
            (i == null ? void 0 : i.nick) || "Usuario",
            "!"
          ] }),
          /* @__PURE__ */ m.jsx("div", { className: "actions", style: { marginBottom: 8 }, children: /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: e, children: "CONTINUAR" }) }),
          /* @__PURE__ */ m.jsx(
            "button",
            {
              className: "btn btn2",
              onClick: u,
              style: { fontSize: 11, padding: "6px 12px", opacity: 0.7 },
              children: "Salir"
            }
          )
        ] })
      ) : (
        // Usuario NO logueado - opción invitado o entrar
        /* @__PURE__ */ m.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
          /* @__PURE__ */ m.jsx("div", { className: "actions", style: { marginBottom: 16 }, children: /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: e, children: "JUGAR" }) }),
          /* @__PURE__ */ m.jsx("div", { style: { fontSize: 12, opacity: 0.5, marginBottom: 6 }, children: "¿Ya tienes cuenta?" }),
          /* @__PURE__ */ m.jsx(
            "button",
            {
              className: "btn btn2",
              onClick: t,
              style: { fontSize: 12, padding: "6px 14px" },
              children: "Entrar"
            }
          )
        ] })
      )
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: "copy", style: { fontSize: "14px", fontWeight: 500 }, children: "© @intocables13 · Todos los derechos reservados" })
  ] }) });
}
function u0({ level: e, setLevel: t, soundOn: n, musicOn: r, musicVolume: l, vibrateOn: o, onOpenAuth: i, onOpenRanking: s, onOpenOptions: u, onTotalUpdate: c, totalTime: g }) {
  const p = N.useRef(null), [h, x] = N.useState(Tn(e)), [S, y] = N.useState(!1), [F, f] = N.useState(!1), [a, d] = N.useState(!1), [v, E] = N.useState(!1), [_, P] = N.useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0;
    } catch (w) {
      return 0;
    }
  }), [M, re] = N.useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("lum_puntos") || "0")) || 0;
    } catch (w) {
      return 0;
    }
  });
  N.useEffect(() => {
    typeof g == "number" && P(g);
  }, [g]);
  const U = (w, k, z = !0, I = !1) => {
    let j = 10;
    w <= 10 ? j = 10 : w <= 20 ? j = 15 : w <= 30 ? j = 20 : w <= 40 ? j = 25 : j = 30;
    let R = 0;
    k <= 5 ? R = 0 : k <= 10 ? R = 5 : k <= 15 ? R = 10 : R = 15;
    let A = 0;
    return z && (A += 10), I || (A += 5), j + R + A;
  }, B = o0(n, l), be = Math.floor((e - 1) / 10) + 1, ut = (e - 1) % 10 + 1, et = N.useMemo(() => ua(e), [e]);
  N.useEffect(() => {
    B.initBg(), B.initStart();
    const w = setTimeout(() => {
      B.startBg(r);
    }, 1e3);
    return () => clearTimeout(w);
  }, [B, r]), N.useEffect(() => {
    r ? B.startBg(!0) : B.stopBg();
  }, [r, B]), N.useEffect(() => {
    B.updateVolume(l);
  }, [l, B]);
  const Eo = (w) => {
    const k = vt(w), z = k.mechanics, I = Math.floor((w - 1) / 10) + 1;
    if (z.includes("drag") && z.includes("double")) {
      const j = k.tiles, R = 1, A = 1, he = [...Array.from({ length: j }, (ae, Ve) => Ve)].sort(() => Math.random() - 0.5), se = new Set(he.slice(0, R)), me = new Set(he.slice(R, R + A)), ue = new Set(he.slice(R + A));
      if (Zr(se), qr(me), br(ue), Jr(me), zt.current = me, se.size > 0) {
        const ae = Array.from(se)[0];
        at(ae), Y.current = ae, _o(ae);
      } else
        at(null), Y.current = null, _o(null);
    } else if (z.includes("double") && !z.includes("drag")) {
      const R = /* @__PURE__ */ new Set();
      for (; R.size < 1; ) {
        const A = Math.floor(Math.random() * k.tiles);
        R.add(A);
      }
      zt.current = R, Jr(R), Zr(/* @__PURE__ */ new Set()), qr(/* @__PURE__ */ new Set()), br(/* @__PURE__ */ new Set()), _o(null), at(null), Y.current = null;
    } else if (I >= 2 && z.includes("drag")) {
      const j = k.tiles, R = Array.from({ length: j - 1 }, (he, se) => se + 1), A = Math.floor(Math.random() * R.length), X = R[A];
      at(X), Y.current = X, zt.current.clear(), Jr(/* @__PURE__ */ new Set()), Zr(/* @__PURE__ */ new Set()), qr(/* @__PURE__ */ new Set()), br(/* @__PURE__ */ new Set());
    } else
      zt.current.clear(), Jr(/* @__PURE__ */ new Set()), Zr(/* @__PURE__ */ new Set()), qr(/* @__PURE__ */ new Set()), br(/* @__PURE__ */ new Set()), at(null), Y.current = null;
    mt.current.clear(), kn(/* @__PURE__ */ new Set());
  }, [nr, Gr] = N.useState([]), [T, D] = N.useState(null), [O, K] = N.useState(null), [fe, at] = N.useState(null), xe = N.useRef(null), bt = N.useRef({ x: 0, y: 0 }), Re = N.useRef({ x: 0, y: 0 }), Y = N.useRef(null), en = N.useRef(null), [p0, Jr] = N.useState(/* @__PURE__ */ new Set()), zt = N.useRef(/* @__PURE__ */ new Set()), [h0, kn] = N.useState(/* @__PURE__ */ new Set()), mt = N.useRef(/* @__PURE__ */ new Set()), [Ws, Zr] = N.useState(/* @__PURE__ */ new Set()), [Co, qr] = N.useState(/* @__PURE__ */ new Set()), [m0, br] = N.useState(/* @__PURE__ */ new Set()), [g0, _o] = N.useState(null), Te = N.useRef([]), le = N.useRef(0);
  N.useRef(/* @__PURE__ */ new Map());
  const jt = N.useRef(null), tn = N.useRef(!1), Cf = 8, No = N.useRef({ x: 0, y: 0 }), To = N.useRef(!1), el = (w) => {
    const z = (vt(e) || { mechanics: [] }).mechanics || [], I = Math.floor((e - 1) / 10) + 1;
    return z.includes("combo") || z.includes("touch") && z.includes("drag") && z.includes("double") ? Ws.has(w) : I >= 2 && z.includes("drag") ? Y.current === w : !1;
  }, _f = (w = "tap") => {
    const k = p.current;
    if (!k || Y.current == null) return;
    const z = k.querySelector(`.tile[data-id="${Y.current}"]`);
    if (!z) return;
    z.classList.remove("nudge-shake"), z.offsetHeight, z.classList.add("nudge-shake"), setTimeout(() => z.classList.remove("nudge-shake"), 550), D((A) => A && { ...A, hint: !0 }), setTimeout(() => D((A) => A && { ...A, hint: !1 }), 900);
    const I = z.getBoundingClientRect(), j = k.getBoundingClientRect(), R = document.createElement("div");
    R.className = "drag-hint", R.textContent = "arrastra", Object.assign(R.style, {
      left: `${I.left - j.left + I.width / 2}px`,
      top: `${I.top - j.top}px`
    }), k.appendChild(R), requestAnimationFrame(() => R.classList.add("show")), setTimeout(() => {
      R.classList.remove("show"), setTimeout(() => {
        try {
          R.remove();
        } catch (A) {
        }
      }, 180);
    }, 800);
    try {
      B.blink(720);
    } catch (A) {
    }
    gt(10, o);
  }, Nf = (w) => {
    const k = p.current;
    if (!k) return;
    const z = k.querySelector(`.tile[data-id="${w}"]`);
    if (!z) return;
    z.classList.remove("nudge-shake"), z.offsetHeight, z.classList.add("nudge-shake"), setTimeout(() => z.classList.remove("nudge-shake"), 550);
    const I = z.getBoundingClientRect(), j = k.getBoundingClientRect(), R = document.createElement("div");
    R.className = "drag-hint", R.textContent = "dos veces", Object.assign(R.style, {
      left: `${I.left - j.left + I.width / 2}px`,
      top: `${I.top - j.top}px`
    }), k.appendChild(R), requestAnimationFrame(() => R.classList.add("show")), setTimeout(() => {
      R.classList.remove("show"), setTimeout(() => {
        try {
          R.remove();
        } catch (A) {
        }
      }, 180);
    }, 800);
    try {
      B.blink(720);
    } catch (A) {
    }
    gt(10, o);
  }, tl = (w = "unknown") => {
    const k = p.current, z = Y.current;
    if (!k || z == null) return;
    const I = k.querySelector(`.tile[data-id="${z}"]`);
    if (!I) return;
    let j = en.current;
    if (!j && I.dataset.origX && (j = {
      x: parseFloat(I.dataset.origX),
      y: parseFloat(I.dataset.origY),
      width: parseFloat(I.dataset.origW),
      height: parseFloat(I.dataset.origH)
    }), !j) {
      console.warn("restoreSpecialTile: no original position", { reason: w, id: z });
      return;
    }
    I.style.position = "absolute", I.style.left = `${j.x}px`, I.style.top = `${j.y}px`, I.style.width = `${j.width}px`, I.style.height = `${j.height}px`, I.classList.remove("dragging"), I.style.zIndex = "", I.style.pointerEvents = "", K(null), xe.current = null;
  }, Hs = (w, k, z, I, j = 48) => {
    if (!z || !I) return !1;
    const R = I.getBoundingClientRect(), A = w - R.left, X = k - R.top;
    return A > z.x - j && A < z.x + z.w + j && X > z.y - j && X < z.y + z.h + j;
  }, Vs = (w) => {
    var z;
    const k = (z = p.current) == null ? void 0 : z.querySelector(`.tile[data-id="${w}"]`);
    if (k) {
      const I = parseFloat(k.dataset.pitch || "880");
      k.style.background = nn.current || et, k.style.pointerEvents = "none", k.style.opacity = "0.7", B.ok(I), gt(20, o);
    }
  }, Qs = () => {
    if (le.current++, le.current >= Te.current.length) {
      if (!rn.current) {
        rn.current = !0;
        const w = Math.ceil((Date.now() - nl.current) / 1e3);
        zo(w);
        try {
          if (window.LUM_API) {
            const k = U(e, Tn(e) - h);
            window.LUM_API.api("game.php?action=save_progress", {
              method: "POST",
              body: JSON.stringify({
                level: e + 1,
                // Próximo nivel desbloqueado
                total_time_s: w,
                puntos: k,
                success: 1
              })
            }).catch((z) => {
              console.log("No hay sesión activa para guardar progreso");
            });
          }
        } catch (k) {
        }
      }
      jt.current && clearInterval(jt.current), y(!1), tn.current = !1, f(!0);
      try {
        B.winMelody((rl.current || []).slice(0, 6));
      } catch (w) {
      }
    }
  }, Xs = () => {
    B.fail(), gt(80, o), le.current = 0, ol(), mt.current.clear(), kn(/* @__PURE__ */ new Set());
    const w = p.current;
    if (w && Y.current !== null && en.current) {
      const k = w.querySelector(`.tile[data-id="${Y.current}"]`);
      k && (k.style.position = "absolute", k.style.left = `${en.current.x}px`, k.style.top = `${en.current.y}px`, k.style.width = `${en.current.width}px`, k.style.height = `${en.current.height}px`, k.style.zIndex = "", k.style.pointerEvents = "", k.classList.remove("dragging"));
    }
  }, nl = N.useRef(0), rl = N.useRef([]), nn = N.useRef(et), rn = N.useRef(!1);
  N.useEffect(() => {
    var k;
    const w = (k = p.current) == null ? void 0 : k.closest(".device");
    w && w.style.setProperty("--accent", et);
  }, [et]);
  const zo = (w) => {
    try {
      const z = (Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0) + w;
      localStorage.setItem("lum_total", JSON.stringify(z)), P(z), typeof c == "function" && c(z);
    } catch (k) {
    }
  };
  function Tf(w, k = null, z = null) {
    var lr;
    const j = vt(e).mechanics, R = j.includes("drag") && j.includes("double"), A = z || (R ? Co : zt.current), X = p.current;
    if (!X) return;
    X.querySelectorAll(".tile, .dropzone").forEach((V) => V.remove());
    const he = X.getBoundingClientRect(), se = he.width, me = he.height, ue = (V, ge) => Math.random() * (ge - V) + V, ae = (lr = sa[nn.current || et]) != null ? lr : 0, Ve = () => {
      let V = Math.floor(Math.random() * 360), ge = 0;
      for (; Math.min(Math.abs(V - ae), 360 - Math.abs(V - ae)) < 30 && ge++ < 120; )
        V = Math.floor(Math.random() * 360);
      return V;
    };
    let Qe = null;
    Math.floor((e - 1) / 10) + 1 >= 2 && k !== null && (Qe = "hsl(300 96% 58%)");
    const Lt = [], Rt = /* @__PURE__ */ new Set();
    for (let V = 0; V < w; V++) {
      let ge = 0, Xe = 0, ln = 0, on = 0, Ks = !1, Pf = 0;
      for (; !Ks && Pf++ < 300; )
        ge = Math.max(56, Math.min(140, 60 + Math.random() * 80)), Xe = Math.max(56, Math.min(160, 60 + Math.random() * 100)), ln = Math.max(8, Math.min(se - ge - 8, ue(0, se - ge))), on = Math.max(8, Math.min(me - Xe - 8, ue(0, me - Xe))), Ks = !Lt.some((J) => !(ln + ge <= J.x || J.x + J.w <= ln || on + Xe <= J.y || J.y + J.h <= on));
      Lt.push({ x: ln, y: on, w: ge, h: Xe });
      const W = document.createElement("button");
      W.type = "button", W.className = "tile";
      let _n;
      if (k === V && Qe)
        _n = Qe, Rt.add(Qe);
      else {
        let J;
        do
          J = Ve(), _n = `hsl(${J} 96% 58%)`;
        while (Rt.has(_n) || _n === Qe);
        Rt.add(_n);
      }
      if (Object.assign(W.style, { left: ln + "px", top: on + "px", width: ge + "px", height: Xe + "px", background: _n }), W.style.background === (nn.current || et)) {
        const J = ((sa[nn.current || et] || 0) + 180) % 360;
        W.style.background = `hsl(${J} 96% 58%)`;
      }
      W.dataset.id = String(V), W.dataset.orig = W.style.background;
      const Ys = rl.current || [];
      W.dataset.pitch = String(Ys[V % Ys.length] || 660);
      const il = vt(e).mechanics, Gs = Math.floor((e - 1) / 10) + 1;
      if (W.style.cursor = "pointer", Gs >= 2 && Y.current === V && (W.classList.add("special-drag-tile"), W.addEventListener("dragstart", (J) => J.preventDefault()), W.addEventListener("touchstart", (J) => J.preventDefault(), { passive: !1 }), W.addEventListener("pointerdown", (J) => {
        jo(J, { id: V });
      }, { passive: !1 }), setTimeout(() => {
        var Js;
        const J = W.getBoundingClientRect(), sn = (Js = p.current) == null ? void 0 : Js.getBoundingClientRect();
        if (sn) {
          const or = {
            x: J.left - sn.left,
            y: J.top - sn.top,
            width: J.width,
            height: J.height
          };
          en.current = or, W.dataset.origX = String(or.x), W.dataset.origY = String(or.y), W.dataset.origW = String(or.width), W.dataset.origH = String(or.height);
        }
      }, 50)), il.includes("combo") || il.includes("touch") && il.includes("drag") && il.includes("double"))
        if (Ws.has(V)) {
          const J = W.style.background;
          W.style.border = `1px solid ${J}`, W.style.boxShadow = `0 0 8px ${J}88`, W.style.cursor = "grab", W.addEventListener("pointerdown", (sn) => jo(sn, V)), W.addEventListener("dragstart", (sn) => sn.preventDefault());
        } else Co.has(V) ? (W.style.setProperty("border", "2px solid white", "important"), W.style.setProperty("outline", "2px solid white", "important"), W.style.setProperty("outline-offset", "4px", "important")) : (W.style.border = "1px solid rgba(255,255,255,0.2)", W.style.boxShadow = "none");
      else
        A.has(V) && (W.style.setProperty("border", "2px solid white", "important"), W.style.setProperty("outline", "2px solid white", "important"), W.style.setProperty("outline-offset", "4px", "important"));
      Gs >= 2 && Y.current === V && (W.style.cursor = "grab"), X.appendChild(W);
    }
    X.__lumDeleg && X.removeEventListener("pointerdown", X.__lumDeleg);
    const Cn = (V) => {
      const ge = V.target && V.target.closest && V.target.closest(".tile");
      if (!ge || !X.contains(ge) || !tn.current) return;
      const Xe = Number(ge.dataset.id), ln = Te.current[le.current], on = el(ln);
      if (ge.classList.contains("special-drag-tile") || Xe === Y.current) {
        jo(V, { id: Xe });
        return;
      }
      on || (V.preventDefault && V.preventDefault(), rr(Xe));
    };
    X.addEventListener("pointerdown", Cn, { passive: !1 }), X.__lumDeleg = Cn;
  }
  function ll(w) {
    const k = p.current, z = k && k.querySelector(`.tile[data-id="${w}"]`);
    if (!z) return;
    z.style.background;
    const I = z.style.border, j = z.style.boxShadow, R = z.style.outline, A = z.style.outlineOffset;
    z.classList.add("lit"), z.style.background = nn.current || et, B.blink(parseFloat(z.dataset.pitch || "720")), setTimeout(() => {
      z.classList.remove("lit"), zt.current.has(w) && (z.style.border = I, z.style.boxShadow = j, z.style.outline = R, z.style.outlineOffset = A);
    }, 260);
  }
  function zf() {
    const w = Te.current;
    w && w.length && ll(w[0]);
  }
  function ol() {
    const w = p.current;
    w && w.querySelectorAll(".tile").forEach((k) => {
      k.style.background = k.dataset.orig || k.style.background, k.classList.remove("lit"), k.style.opacity = "1";
    });
  }
  function En(w) {
    var Ve;
    const k = typeof w == "number" ? w : e, z = (Ve = p.current) == null ? void 0 : Ve.closest(".device");
    nn.current = ua(k), z && z.style.setProperty("--accent", nn.current), f(!1), d(!1), E(!1), rn.current = !1, jt.current && clearInterval(jt.current);
    const I = r0(k), j = Array.from({ length: I }, (Qe, Pt) => Pt), R = 0, A = j.slice(1).sort(() => Math.random() - 0.5);
    Te.current = [R, ...A], le.current = 0, rl.current = aa[Math.floor(Math.random() * aa.length)] || [440, 494, 523, 587, 659, 698, 784, 880, 988, 1046, 1174, 1318, 1396, 1567, 1760], Eo(k);
    let X = null, he = /* @__PURE__ */ new Set();
    const se = Math.floor((k - 1) / 10) + 1;
    vt(k).mechanics, X = Y.current, he = zt.current, Tf(I, X, he), setTimeout(() => {
      var Pt, Lt, Rt;
      const Qe = vt(k);
      if (se >= 2 && X !== null && Qe.mechanics.includes("drag")) {
        const Cn = (Pt = p.current) == null ? void 0 : Pt.querySelector(`.tile[data-id="${X}"]`);
        if (Cn) {
          const lr = Cn.getBoundingClientRect();
          if ((Lt = p.current) == null ? void 0 : Lt.getBoundingClientRect()) {
            (Rt = p.current) == null || Rt.getBoundingClientRect();
            const ge = 60, Xe = {
              x: ge,
              // Esquina izquierda con margen
              y: ge,
              // Esquina superior con margen
              w: lr.width,
              h: lr.height,
              color: Cn.style.backgroundColor,
              over: !1
            };
            D(Xe);
          }
        }
      } else
        D(null);
    }, 100);
    const ue = Tn(k);
    x(ue), y(!0), tn.current = !0, B.start(), nl.current = Date.now();
    const ae = Date.now();
    jt.current = setInterval(() => {
      const Qe = (Date.now() - ae) / 1e3, Pt = Math.max(0, ue - Qe);
      if (x(Math.ceil(Pt)), Pt <= 0) {
        if (!rn.current) {
          rn.current = !0;
          const Lt = Math.ceil((Date.now() - nl.current) / 1e3);
          zo(Lt);
          try {
            window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
              method: "POST",
              body: JSON.stringify({
                level: e,
                total_time_s: Lt,
                puntos: 0,
                // No hay puntos al perder
                success: 0
              })
            }).catch((Rt) => {
              console.log("No hay sesión activa para guardar progreso");
            });
          } catch (Rt) {
          }
        }
        clearInterval(jt.current), y(!1), tn.current = !1, tl("timeout"), d(!0), B.fail(), ol();
      }
    }, 100), setTimeout(zf, 1500);
  }
  N.useEffect(() => {
    const w = (k) => {
      To.current && (k.preventDefault(), k.stopPropagation(), To.current = !1);
    };
    return document.addEventListener("click", w, !0), () => document.removeEventListener("click", w, !0);
  }, []), N.useEffect(() => {
    window.LumetrixTest = Object.assign({}, window.LumetrixTest, {
      start: En,
      state: () => ({ level: e, world: be, levelInWorld: ut, running: S, time: h, seqLen: (Te.current || []).length }),
      tapExpected: () => {
        const w = Te.current[le.current];
        w != null && rr(w);
      },
      tapId: (w) => rr(w),
      isDragStep: () => {
        const w = Te.current[le.current];
        return el(w);
      },
      test: {
        ignoreClicksOnDragStep: () => {
          const w = Te.current[le.current], k = le.current;
          return el(w) ? (rr(w === 0 ? 1 : 0), { ok: le.current === k, step: le.current, expected: w }) : { ok: !1, reason: "not drag step" };
        }
      }
    });
  }, [e, be, ut, S, h]);
  const jo = (w, k) => {
    var R;
    if (!tn.current) return;
    const z = Te.current[le.current], I = p.current, j = I == null ? void 0 : I.querySelector(`.tile[data-id="${k.id}"]`);
    if (j) {
      if (k.id === Y.current) {
        w.preventDefault(), w.stopPropagation();
        const A = j.getBoundingClientRect();
        No.current = { x: A.left, y: A.top }, To.current = !0, K(k.id), xe.current = (R = w.pointerId) != null ? R : null, bt.current = { x: w.clientX - A.left, y: w.clientY - A.top }, Re.current = { x: A.left, y: A.top }, j.style.zIndex = 1e3, j.classList.add("dragging"), j.style.pointerEvents = "none", j.style.touchAction = "none";
        return;
      }
      if (k.id !== z) return Xs();
      Vs(k.id), Qs();
    }
  };
  function rr(w) {
    if (!tn.current) return;
    const k = vt(e);
    if (k.mechanics.includes("drag") && w === Y.current)
      return;
    const z = Te.current[le.current], I = p.current;
    if (el(z))
      return;
    const j = I && I.querySelector(`.tile[data-id="${w}"]`);
    if (!j) return;
    const R = parseFloat(j.dataset.pitch || "880"), A = zt.current.has(w), X = (k.mechanics.includes("combo") || k.mechanics.includes("touch") && k.mechanics.includes("drag") && k.mechanics.includes("double")) && Co.has(w);
    if (A && k.mechanics.includes("double") || X)
      if (w === z)
        if (mt.current.has(w))
          j.style.opacity = "1", ll(w), B.ok(R), gt(20, o), le.current++, mt.current.delete(w), kn(new Set(mt.current));
        else {
          j.style.opacity = "0.6", ll(w), B.ok(R), gt(20, o), mt.current.add(w), kn(new Set(mt.current)), Nf(w);
          return;
        }
      else {
        B.fail(), gt(80, o), le.current = 0, ol(), mt.current.clear(), kn(/* @__PURE__ */ new Set());
        return;
      }
    else if (w === z) {
      ll(w), B.ok(R), gt(20, o), le.current++;
      const he = Math.floor((e - 1) / 10) + 1;
      if ((he >= 2 || k.mechanics.includes("combo") || k.mechanics.includes("touch") && k.mechanics.includes("drag") && k.mechanics.includes("double")) && le.current < Te.current.length ? setTimeout(() => {
        var me, ue;
        if (Math.floor((e - 1) / 10) + 1 >= 2 && Y.current !== null) {
          const ae = (me = p.current) == null ? void 0 : me.querySelector(`.tile[data-id="${Y.current}"]`);
          if (ae) {
            (ue = p.current) == null || ue.getBoundingClientRect();
            const Ve = 60, Qe = {
              x: Ve,
              // Esquina izquierda con margen
              y: Ve,
              // Esquina superior con margen
              w: ae.offsetWidth,
              h: ae.offsetHeight,
              color: ae.style.backgroundColor,
              over: !1
            };
            D(Qe);
          }
        }
      }, 100) : (he >= 2 || k.mechanics.includes("combo") || k.mechanics.includes("touch") && k.mechanics.includes("drag") && k.mechanics.includes("double")) && D(null), le.current >= Te.current.length) {
        if (!rn.current) {
          rn.current = !0;
          const se = Math.ceil((Date.now() - nl.current) / 1e3);
          zo(se);
          try {
            if (window.LUM_API) {
              const me = U(e, Tn(e) - h);
              window.LUM_API.api("game.php?action=save_progress", {
                method: "POST",
                body: JSON.stringify({
                  level: e + 1,
                  // Próximo nivel desbloqueado
                  total_time_s: se,
                  puntos: me,
                  success: 1
                })
              }).catch((ue) => {
                console.log("No hay sesión activa para guardar progreso");
              });
            }
          } catch (me) {
          }
        }
        jt.current && clearInterval(jt.current), y(!1), tn.current = !1, e === 50 ? E(!0) : f(!0);
        try {
          B.winMelody((rl.current || []).slice(0, 6));
        } catch (se) {
        }
      }
    } else
      B.fail(), gt(80, o), le.current = 0, tl("wrong-tap"), ol(), mt.current.clear(), kn(/* @__PURE__ */ new Set());
  }
  function jf() {
    f(!1), d(!1), E(!1);
    const w = e + 1;
    t(w), setTimeout(() => En(w), 0);
  }
  return N.useEffect(() => {
    window.LumetrixTest = { start: En, state: () => ({ level: e, world: be, levelInWorld: ut, running: S, time: h, seqLen: (Te.current || []).length }), tapExpected: () => {
      const w = Te.current[le.current];
      w != null && rr(w);
    } };
  }, [e, be, ut, S, h]), N.useEffect(() => {
    const w = (z) => {
      var ae;
      if (O == null || xe.current !== null && z.pointerId !== xe.current) return;
      const I = z.clientX - bt.current.x, j = z.clientY - bt.current.y, R = (ae = p.current) == null ? void 0 : ae.querySelector(`.tile[data-id="${O}"]`);
      if (!R) return;
      const A = Math.abs(I - Re.current.x), X = Math.abs(j - Re.current.y), he = 5;
      (A > he || X > he || R.style.position === "fixed") && (R.style.position = "fixed", R.style.left = `${I}px`, R.style.top = `${j}px`, Re.current = { x: I, y: j });
      const se = I + ((R == null ? void 0 : R.offsetWidth) || 0) / 2, me = j + ((R == null ? void 0 : R.offsetHeight) || 0) / 2, ue = Hs(se, me, T, p.current, 48);
      D((Ve) => Ve ? { ...Ve, over: ue } : null);
    }, k = (z) => {
      var me;
      if (O == null || xe.current !== null && z.pointerId !== xe.current) return;
      const I = Te.current[le.current], j = (me = p.current) == null ? void 0 : me.querySelector(`.tile[data-id="${O}"]`), R = Re.current.x, A = Re.current.y, X = R + ((j == null ? void 0 : j.offsetWidth) || 0) / 2, he = A + ((j == null ? void 0 : j.offsetHeight) || 0) / 2, se = Hs(X, he, T, p.current, 48);
      if (console.debug("Drag drop validation:", {
        expected: I,
        draggingId: O,
        special: Y.current,
        inside: se,
        step: le.current,
        drop: T
      }), O === I && O === Y.current && se && j)
        return j.style.position = "absolute", j.style.left = `${T.x + (T.w - j.offsetWidth) / 2}px`, j.style.top = `${T.y + (T.h - j.offsetHeight) / 2}px`, K(null), xe.current = null, D((ue) => ue ? { ...ue, over: !1 } : null), j && (j.classList.remove("dragging"), j.style.pointerEvents = "", j.style.zIndex = ""), Vs(O), Qs();
      if (O === Y.current)
        if (Math.hypot(R - No.current.x, A - No.current.y) < Cf) {
          tl("tap-detected"), K(null), xe.current = null, D((ae) => ae ? { ...ae, over: !1 } : null), _f("tap");
          return;
        } else
          tl("drop-miss");
      K(null), xe.current = null, D((ue) => ue ? { ...ue, over: !1 } : null), Xs();
    };
    return document.addEventListener("pointermove", w, !0), document.addEventListener("pointerup", k, !0), document.addEventListener("pointercancel", k, !0), () => {
      document.removeEventListener("pointermove", w, !0), document.removeEventListener("pointerup", k, !0), document.removeEventListener("pointercancel", k, !0);
    };
  }, [O, T, nr]), /* @__PURE__ */ m.jsxs("section", { className: "screen", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "topbar", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ m.jsx("img", { src: "lumetrix/img/logo2.png", alt: "LUMETRIX", style: { height: "32px", width: "auto" }, onError: (w) => {
          w.target.style.display = "none", w.target.nextSibling.style.display = "inline";
        } }),
        /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "16px", fontWeight: "900", letterSpacing: "0.1em", color: "#fff" }, children: "LUMETRIX" })
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: "icons", children: [
        /* @__PURE__ */ m.jsxs("button", { className: "icon", onClick: s, "aria-label": "Ranking", children: [
          /* @__PURE__ */ m.jsx("img", { src: "lumetrix/img/ico_ranking.png", alt: "Ranking", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (w) => {
            w.target.style.display = "none", w.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "🏆" })
        ] }),
        /* @__PURE__ */ m.jsxs("button", { className: "icon", onClick: u, "aria-label": "Opciones", children: [
          /* @__PURE__ */ m.jsx("img", { src: "lumetrix/img/ico_config.png", alt: "Configuración", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (w) => {
            w.target.style.display = "none", w.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "⚙️" })
        ] }),
        /* @__PURE__ */ m.jsxs("button", { className: "icon", onClick: i, "aria-label": "Login", children: [
          /* @__PURE__ */ m.jsx("img", { src: "lumetrix/img/ico_user.png", alt: "Usuario", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (w) => {
            w.target.style.display = "none", w.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "👤" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "hud", children: [
      /* @__PURE__ */ m.jsx("div", { className: "timebar", children: /* @__PURE__ */ m.jsx("i", { className: "timefill", style: { width: `${Math.max(0, Math.min(100, h / Tn(e) * 100))}%` } }) }),
      /* @__PURE__ */ m.jsxs("div", { className: "meta", children: [
        /* @__PURE__ */ m.jsxs("span", { className: "chip", children: [
          "Nivel ",
          /* @__PURE__ */ m.jsx("b", { children: e })
        ] }),
        /* @__PURE__ */ m.jsxs("span", { className: "chip", children: [
          "🏆 ",
          /* @__PURE__ */ m.jsxs("b", { children: [
            M,
            " pts"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "board", ref: p, children: [
      T && /* @__PURE__ */ m.jsx(
        "div",
        {
          className: `drop-zone ${T.over ? "drag-over" : ""} ${T.hint ? "pulse" : ""}`,
          style: {
            position: "absolute",
            left: T.x,
            top: T.y,
            width: T.w,
            height: T.h,
            border: `3px dashed ${T.color}`,
            borderRadius: "12px",
            background: "rgba(0,0,0,0.3)",
            pointerEvents: "none",
            zIndex: 10,
            transition: "all 0.2s ease",
            boxShadow: T.over ? `0 0 25px ${T.color}` : `0 0 15px ${T.color}33`
          }
        }
      ),
      !S && !F && !a && /* @__PURE__ */ m.jsxs("div", { className: "overlay", style: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }, children: [
        /* @__PURE__ */ m.jsx("button", { className: "btn-start", onClick: () => En(), children: "EMPEZAR" }),
        /* @__PURE__ */ m.jsxs("div", { style: { marginTop: "16px", color: "#ffffff88", fontSize: "16px", fontWeight: 600 }, children: [
          "Nivel ",
          e,
          " • Mundo ",
          be
        ] })
      ] }),
      F && /* @__PURE__ */ m.jsx("div", { className: "overlay", children: /* @__PURE__ */ m.jsxs("div", { className: "card-compact", style: { textAlign: "center" }, children: [
        /* @__PURE__ */ m.jsx("div", { style: { fontSize: 32, marginBottom: 8, textShadow: "0 0 10px var(--neon2), 0 0 20px var(--neon2)" }, children: "✨" }),
        /* @__PURE__ */ m.jsx("h3", { style: { color: "var(--neon2)", marginBottom: 8 }, children: "¡Nivel superado!" }),
        /* @__PURE__ */ m.jsxs("div", { style: { fontSize: 16, color: "#ffffff88", marginBottom: 16 }, children: [
          "Puntos: ",
          U(e, Tn(e) - h),
          " pts"
        ] }),
        /* @__PURE__ */ m.jsxs("div", { style: { display: "flex", gap: "12px", justifyContent: "center" }, children: [
          /* @__PURE__ */ m.jsx("button", { className: "btn", onClick: () => {
            f(!1), En();
          }, style: { border: "2px solid #ff6b6b", color: "#ff6b6b", boxShadow: "0 0 10px #ff6b6b44" }, children: "Reiniciar" }),
          /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: jf, children: "Siguiente" })
        ] })
      ] }) }),
      a && /* @__PURE__ */ m.jsx("div", { className: "overlay", children: /* @__PURE__ */ m.jsxs("div", { className: "card-compact", style: { textAlign: "center" }, children: [
        /* @__PURE__ */ m.jsx("div", { style: { fontSize: 32, marginBottom: 8, textShadow: "0 0 10px var(--neon1), 0 0 20px var(--neon1)" }, children: "💔" }),
        /* @__PURE__ */ m.jsx("h3", { style: { color: "var(--neon1)", marginBottom: 12 }, children: "Tiempo agotado" }),
        /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: () => En(), children: "Reintentar" })
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
            E(!1), s();
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
function a0({ onClose: e, total: t }) {
  const [n, r] = N.useState([]), [l, o] = N.useState(!0), [i, s] = N.useState(null), u = N.useRef(null);
  N.useEffect(() => {
    (async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const h = await window.LUM_API.api("auth.php?action=check_session");
          h && h.success && s(h.user.email);
          const x = await window.LUM_API.api("ranking.php?action=global");
          x && x.success && x.data && r(x.data.map((S, y) => ({
            rank: y + 1,
            name: S.nick,
            email: S.email,
            level: S.level,
            puntos: S.total_puntos,
            world: Math.floor((S.level - 1) / 10) + 1
          })));
        }
      } catch (h) {
        r([]);
      } finally {
        o(!1);
      }
    })();
  }, []), N.useEffect(() => {
    !l && u.current && setTimeout(() => {
      var p;
      (p = u.current) == null || p.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }, [l, n]);
  const c = (p) => p === 1 ? "#FFD700" : p === 2 ? "#C0C0C0" : p === 3 ? "#CD7F32" : "#00ffff", g = (p) => p === 1 ? "1" : p === 2 ? "2" : p === 3 ? "3" : p;
  return /* @__PURE__ */ m.jsx("div", { className: "modal", children: /* @__PURE__ */ m.jsxs("div", { className: "card", style: { border: "2px solid #00ffff", boxShadow: "0 0 20px #00ffff44" }, children: [
    /* @__PURE__ */ m.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #00ffff", boxShadow: "0 0 10px #00ffff", background: "#000" }, children: "✕" }),
    /* @__PURE__ */ m.jsx("h3", { style: { color: "#00ffff", marginTop: 0, textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff", fontSize: "20px" }, children: "RANKING GLOBAL" }),
    l ? /* @__PURE__ */ m.jsx("div", { style: { textAlign: "center", padding: "40px", color: "#00ffff66" }, children: "Cargando ranking..." }) : n.length === 0 ? /* @__PURE__ */ m.jsxs("div", { style: { textAlign: "center", padding: "40px", color: "#00ffff66" }, children: [
      /* @__PURE__ */ m.jsx("div", { style: { fontSize: 16, marginBottom: 8 }, children: "Aún no hay jugadores" }),
      /* @__PURE__ */ m.jsx("div", { style: { fontSize: 12 }, children: "¡Sé el primero en aparecer aquí!" })
    ] }) : /* @__PURE__ */ m.jsx("div", { className: "list", style: { gap: "8px", maxHeight: "400px", overflowY: "auto", paddingRight: "4px" }, children: n.map((p) => {
      const h = i && p.email === i;
      return /* @__PURE__ */ m.jsxs(
        "div",
        {
          ref: h ? u : null,
          style: {
            background: h ? "rgba(255,215,0,0.15)" : "rgba(0,255,255,0.1)",
            border: h ? "2px solid #FFD700" : "1px solid #00ffff33",
            borderRadius: "8px",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            boxShadow: h ? "0 0 12px rgba(255,215,0,0.3)" : "none"
          },
          children: [
            h && /* @__PURE__ */ m.jsx("div", { style: {
              position: "absolute",
              right: "4px",
              top: "4px",
              background: "#FFD700",
              color: "#000",
              fontSize: "8px",
              fontWeight: "bold",
              padding: "1px 4px",
              borderRadius: "6px",
              zIndex: 10
            }, children: "TÚ" }),
            /* @__PURE__ */ m.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
              /* @__PURE__ */ m.jsxs("span", { style: {
                color: c(p.rank),
                fontWeight: "bold",
                fontSize: "14px",
                minWidth: "30px"
              }, children: [
                "#",
                g(p.rank)
              ] }),
              /* @__PURE__ */ m.jsx("span", { style: { color: h ? "#FFD700" : "#fff", fontSize: "12px", fontWeight: h ? "bold" : "normal" }, children: p.name })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { style: { textAlign: "right", fontSize: "11px", opacity: 0.8 }, children: [
              /* @__PURE__ */ m.jsxs("div", { children: [
                "Mundo ",
                p.world,
                " • Nivel ",
                p.level
              ] }),
              /* @__PURE__ */ m.jsxs("div", { style: { color: h ? "#FFD700" : "#00ffff" }, children: [
                p.puntos,
                " pts"
              ] })
            ] })
          ]
        },
        p.rank
      );
    }) })
  ] }) });
}
function c0({ onClose: e, onOpenAuth: t, level: n, setLevel: r, soundOn: l, musicOn: o, vibrateOn: i, setSoundOn: s, setMusicOn: u, setVibrateOn: c, onResetTotal: g, musicVolume: p, setMusicVolume: h }) {
  return /* @__PURE__ */ m.jsx("div", { className: "modal", children: /* @__PURE__ */ m.jsxs("div", { className: "card", style: { border: "2px solid #39ff14", boxShadow: "0 0 20px #39ff1444" }, children: [
    /* @__PURE__ */ m.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #39ff14", boxShadow: "0 0 10px #39ff14", background: "#000" }, children: "✕" }),
    /* @__PURE__ */ m.jsx("h3", { style: { color: "#39ff14", marginTop: 0, textShadow: "0 0 10px #39ff14, 0 0 20px #39ff14", fontSize: "20px" }, children: "CONFIGURACIÓN" }),
    /* @__PURE__ */ m.jsxs("div", { className: "list", style: { gap: "12px" }, children: [
      /* @__PURE__ */ m.jsxs("label", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ m.jsx("span", { style: { color: "#39ff14", fontWeight: "bold" }, children: "Música de fondo" }),
        /* @__PURE__ */ m.jsx("input", { type: "checkbox", checked: o, onChange: (x) => u(x.target.checked), style: { transform: "scale(1.2)", accentColor: "#39ff14" } })
      ] }),
      o && /* @__PURE__ */ m.jsxs("div", { style: { background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ m.jsxs("div", { style: { color: "#39ff14", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }, children: [
          "Volumen: ",
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
            onChange: (x) => h(parseFloat(x.target.value)),
            style: {
              width: "100%",
              accentColor: "#39ff14",
              background: "transparent"
            }
          }
        )
      ] }),
      /* @__PURE__ */ m.jsxs("label", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ m.jsx("span", { style: { color: "#39ff14", fontWeight: "bold" }, children: "Vibración" }),
        /* @__PURE__ */ m.jsx("input", { type: "checkbox", checked: i, onChange: (x) => c(x.target.checked), style: { transform: "scale(1.2)", accentColor: "#39ff14" } })
      ] })
    ] })
  ] }) });
}
function f0({ onClose: e }) {
  const [t, n] = N.useState("login"), [r, l] = N.useState(""), [o, i] = N.useState(""), [s, u] = N.useState(""), [c, g] = N.useState(""), [p, h] = N.useState(""), [x, S] = N.useState(!1), [y, F] = N.useState(!1), [f, a] = N.useState(null);
  N.useEffect(() => {
    (async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const P = await window.LUM_API.api("auth.php?action=check_session");
          P && P.success && (F(!0), a(P.user));
        }
      } catch (P) {
        F(!1);
      }
    })();
  }, []);
  const d = async () => {
    S(!0);
    try {
      await window.LUM_API.api("auth.php?action=logout"), window.location.reload();
    } catch (_) {
      h("❌ Error al cerrar sesión"), S(!1);
    }
  }, v = async () => {
    if (!o || !r || !s || !c) {
      h("❌ Rellena todos los campos");
      return;
    }
    S(!0), h("");
    try {
      const _ = await window.LUM_API.api("auth.php?action=register", {
        method: "POST",
        body: JSON.stringify({ nombre: o, username: r, email: s, password: c })
      });
      _.success ? (h("✅ ¡Registrado! Ahora inicia sesión"), n("login"), g("")) : h("❌ " + (_.message || "Error en registro"));
    } catch (_) {
      h("❌ Error de conexión");
    }
    S(!1);
  }, E = async () => {
    if (!s || !c) {
      h("❌ Rellena email y contraseña");
      return;
    }
    S(!0), h("");
    try {
      const _ = await window.LUM_API.api("auth.php?action=login", {
        method: "POST",
        body: JSON.stringify({ username: s, password: c })
      });
      _.success ? (h("✅ ¡Bienvenido!"), setTimeout(() => {
        window.location.reload();
      }, 500)) : h("❌ " + (_.message || "Credenciales incorrectas"));
    } catch (_) {
      h("❌ Error de conexión");
    }
    S(!1);
  };
  return /* @__PURE__ */ m.jsx("div", { className: "modal", children: /* @__PURE__ */ m.jsxs("div", { className: "card", style: { maxWidth: "420px", border: "2px solid #ff00ff", boxShadow: "0 0 20px #ff00ff44" }, children: [
    /* @__PURE__ */ m.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #ff00ff", boxShadow: "0 0 10px #ff00ff", background: "#000" }, children: "✕" }),
    y ? (
      // Usuario ya logueado - mostrar info y logout
      /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
        /* @__PURE__ */ m.jsx("h3", { style: { color: "#ff00ff", marginTop: 0, marginBottom: 12, textShadow: "0 0 10px #ff00ff, 0 0 20px #ff00ff", fontSize: "18px" }, children: "Mi cuenta" }),
        /* @__PURE__ */ m.jsxs("div", { className: "list", style: { gap: 12 }, children: [
          f && /* @__PURE__ */ m.jsxs("div", { style: { background: "rgba(255,0,255,0.1)", border: "1px solid #ff00ff33", borderRadius: "10px", padding: "16px", textAlign: "center" }, children: [
            /* @__PURE__ */ m.jsx("div", { style: { fontSize: 12, opacity: 0.6, marginBottom: 4 }, children: "Jugador" }),
            /* @__PURE__ */ m.jsx("div", { style: { fontSize: 20, color: "#ff00ff", fontWeight: "bold", marginBottom: 4 }, children: f.nick }),
            /* @__PURE__ */ m.jsx("div", { style: { fontSize: 11, opacity: 0.5, marginBottom: 8 }, children: f.email }),
            f.fecha_registro && /* @__PURE__ */ m.jsxs("div", { style: { fontSize: 9, opacity: 0.4 }, children: [
              "Desde ",
              new Date(f.fecha_registro).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })
            ] })
          ] }),
          /* @__PURE__ */ m.jsx(
            "button",
            {
              className: "btn",
              onClick: d,
              disabled: x,
              style: { border: "2px solid #ff4466", color: "#ff4466", boxShadow: "0 0 10px #ff446644", fontWeight: "bold", width: "100%", opacity: x ? 0.5 : 1 },
              children: x ? "Cerrando..." : "Cerrar sesión"
            }
          ),
          /* @__PURE__ */ m.jsxs("div", { style: { fontSize: 10, opacity: 0.4, textAlign: "center", marginTop: 8, lineHeight: 1.4 }, children: [
            "¿Eliminar cuenta?",
            " ",
            /* @__PURE__ */ m.jsx(
              "a",
              {
                href: "mailto:info@intocables13.com?subject=Eliminar cuenta - Lumetrix&body=Solicito la eliminación de mi cuenta con el email: ",
                style: { color: "#ff00ff", textDecoration: "underline" },
                children: "Contactar"
              }
            )
          ] })
        ] })
      ] })
    ) : (
      // Usuario NO logueado - mostrar login/registro
      /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
        /* @__PURE__ */ m.jsxs("div", { style: { display: "flex", gap: 8, marginBottom: 16, borderBottom: "1px solid #ff00ff33", paddingBottom: 8 }, children: [
          /* @__PURE__ */ m.jsx(
            "button",
            {
              onClick: () => n("login"),
              style: {
                background: t === "login" ? "rgba(255,0,255,0.2)" : "transparent",
                border: "none",
                color: t === "login" ? "#ff00ff" : "#ffffff66",
                padding: "8px 16px",
                cursor: "pointer",
                fontWeight: t === "login" ? "bold" : "normal",
                fontSize: "14px"
              },
              children: "Entrar"
            }
          ),
          /* @__PURE__ */ m.jsx(
            "button",
            {
              onClick: () => n("register"),
              style: {
                background: t === "register" ? "rgba(255,0,255,0.2)" : "transparent",
                border: "none",
                color: t === "register" ? "#ff00ff" : "#ffffff66",
                padding: "8px 16px",
                cursor: "pointer",
                fontWeight: t === "register" ? "bold" : "normal",
                fontSize: "14px"
              },
              children: "Crear cuenta"
            }
          )
        ] }),
        /* @__PURE__ */ m.jsx("h3", { style: { color: "#ff00ff", marginTop: 0, marginBottom: 12, textShadow: "0 0 10px #ff00ff, 0 0 20px #ff00ff", fontSize: "18px" }, children: t === "login" ? "Entrar con tu cuenta" : "Crear nueva cuenta" }),
        /* @__PURE__ */ m.jsxs("div", { className: "list", style: { gap: 12 }, children: [
          t === "register" && /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
            /* @__PURE__ */ m.jsx(
              "input",
              {
                placeholder: "Nombre completo",
                value: o,
                onChange: (_) => i(_.target.value),
                style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#fff", boxShadow: "0 0 10px #ff00ff22", outline: "none" }
              }
            ),
            /* @__PURE__ */ m.jsx(
              "input",
              {
                placeholder: "Nick (nombre de usuario)",
                value: r,
                onChange: (_) => l(_.target.value),
                style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#fff", boxShadow: "0 0 10px #ff00ff22", outline: "none" }
              }
            )
          ] }),
          /* @__PURE__ */ m.jsx(
            "input",
            {
              placeholder: "Email",
              type: "email",
              value: s,
              onChange: (_) => u(_.target.value),
              style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#fff", boxShadow: "0 0 10px #ff00ff22", outline: "none" }
            }
          ),
          /* @__PURE__ */ m.jsx(
            "input",
            {
              placeholder: "Contraseña",
              type: "password",
              value: c,
              onChange: (_) => g(_.target.value),
              onKeyPress: (_) => _.key === "Enter" && (t === "login" ? E() : v()),
              style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#fff", boxShadow: "0 0 10px #ff00ff22", outline: "none" }
            }
          ),
          p && /* @__PURE__ */ m.jsx("div", { style: { fontSize: 14, textAlign: "center", marginTop: 4, color: p.includes("✅") ? "#39ff14" : "#ff4466" }, children: p }),
          /* @__PURE__ */ m.jsxs("div", { style: { display: "flex", gap: 12, justifyContent: "center", marginTop: 8 }, children: [
            /* @__PURE__ */ m.jsx(
              "button",
              {
                className: "btn btn1",
                onClick: t === "login" ? E : v,
                disabled: x,
                style: { border: "2px solid #39ff14", color: "#39ff14", boxShadow: "0 0 10px #39ff1444", fontWeight: "bold", opacity: x ? 0.5 : 1 },
                children: x ? "Cargando..." : t === "login" ? "Entrar" : "Crear cuenta"
              }
            ),
            /* @__PURE__ */ m.jsx(
              "button",
              {
                className: "btn",
                onClick: e,
                disabled: x,
                style: { border: "2px solid #00ffff", color: "#00ffff", boxShadow: "0 0 10px #00ffff44", fontWeight: "bold", opacity: x ? 0.5 : 1 },
                children: "Cancelar"
              }
            )
          ] })
        ] })
      ] })
    )
  ] }) });
}
function d0() {
  i0();
  const [e, t] = N.useState("intro"), [n, r] = N.useState(!1), [l, o] = N.useState(!1), [i, s] = N.useState(!1), [u, c] = N.useState(!0), [g, p] = N.useState(!0), [h, x] = N.useState(0.15), [S, y] = N.useState(!0), [F, f] = N.useState(1), [a, d] = N.useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0;
    } catch (v) {
      return 0;
    }
  });
  return N.useEffect(() => {
    (async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const E = await window.LUM_API.api("auth.php?action=check_session");
          if (E && E.success) {
            const _ = await window.LUM_API.api("game.php?action=get_progress");
            if (_ && _.success && _.data) {
              const P = _.data.nivel_actual || 1, M = _.data.total_time_s || 0;
              f(P), d(M), console.log(`Progreso cargado: Nivel ${P}, Tiempo ${M}s`);
            }
          }
        }
      } catch (E) {
        console.log("Sin progreso guardado, empezando desde nivel 1");
      }
    })();
  }, []), N.useEffect(() => {
    window.LumetrixTest = Object.assign({}, window.LumetrixTest, { help: "LumetrixTest.start(), .tapExpected(), .state() — tras pulsar Jugar" });
  }, []), /* @__PURE__ */ m.jsx("div", { className: "shell", children: /* @__PURE__ */ m.jsxs("div", { className: "device", children: [
    e === "intro" ? /* @__PURE__ */ m.jsx(s0, { onPlay: () => t("game"), onAuth: () => s(!0) }) : /* @__PURE__ */ m.jsx(
      u0,
      {
        level: F,
        setLevel: f,
        soundOn: u,
        musicOn: g,
        musicVolume: h,
        vibrateOn: S,
        onOpenAuth: () => s(!0),
        onOpenRanking: () => r(!0),
        onOpenOptions: () => o(!0),
        onTotalUpdate: d,
        totalTime: a
      }
    ),
    n && /* @__PURE__ */ m.jsx(a0, { onClose: () => r(!1), total: a }),
    l && /* @__PURE__ */ m.jsx(
      c0,
      {
        onClose: () => o(!1),
        onOpenAuth: () => {
          o(!1), s(!0);
        },
        level: F,
        setLevel: f,
        soundOn: u,
        musicOn: g,
        vibrateOn: S,
        setSoundOn: c,
        setMusicOn: p,
        setVibrateOn: y,
        musicVolume: h,
        setMusicVolume: x,
        onResetTotal: () => {
          try {
            localStorage.removeItem("lum_total");
          } catch (v) {
          }
          d(0);
        }
      }
    ),
    i && /* @__PURE__ */ m.jsx(f0, { onClose: () => s(!1) })
  ] }) });
}
function v0(e) {
  const t = Ef(e);
  t.render(/* @__PURE__ */ m.jsx(d0, {})), e.__lum_unmount = () => {
    var n;
    return (n = t.unmount) == null ? void 0 : n.call(t);
  };
}
function x0(e) {
  var t;
  try {
    (t = e.__lum_unmount) == null || t.call(e);
  } catch (n) {
  }
}
export {
  v0 as mount,
  x0 as unmount
};
//# sourceMappingURL=game.bundle.js.map
