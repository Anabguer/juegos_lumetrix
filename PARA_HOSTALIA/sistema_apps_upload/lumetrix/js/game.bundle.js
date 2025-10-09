var xa = { exports: {} }, go = {}, wa = { exports: {} }, $ = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var el = Symbol.for("react.element"), Wf = Symbol.for("react.portal"), Hf = Symbol.for("react.fragment"), Vf = Symbol.for("react.strict_mode"), Qf = Symbol.for("react.profiler"), Xf = Symbol.for("react.provider"), Kf = Symbol.for("react.context"), bf = Symbol.for("react.forward_ref"), Yf = Symbol.for("react.suspense"), Gf = Symbol.for("react.memo"), Jf = Symbol.for("react.lazy"), iu = Symbol.iterator;
function Zf(e) {
  return e === null || typeof e != "object" ? null : (e = iu && e[iu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Sa = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ka = Object.assign, Ea = {};
function ur(e, t, n) {
  this.props = e, this.context = t, this.refs = Ea, this.updater = n || Sa;
}
ur.prototype.isReactComponent = {};
ur.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
ur.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Ca() {
}
Ca.prototype = ur.prototype;
function rs(e, t, n) {
  this.props = e, this.context = t, this.refs = Ea, this.updater = n || Sa;
}
var ls = rs.prototype = new Ca();
ls.constructor = rs;
ka(ls, ur.prototype);
ls.isPureReactComponent = !0;
var su = Array.isArray, _a = Object.prototype.hasOwnProperty, os = { current: null }, Na = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ta(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) _a.call(t, r) && !Na.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in s = e.defaultProps, s) l[r] === void 0 && (l[r] = s[r]);
  return { $$typeof: el, type: e, key: o, ref: i, props: l, _owner: os.current };
}
function qf(e, t) {
  return { $$typeof: el, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function is(e) {
  return typeof e == "object" && e !== null && e.$$typeof === el;
}
function ed(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var uu = /\/+/g;
function Uo(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? ed("" + e.key) : t.toString(36);
}
function Ml(e, t, n, r, l) {
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
        case el:
        case Wf:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + Uo(i, 0) : r, su(l) ? (n = "", e != null && (n = e.replace(uu, "$&/") + "/"), Ml(l, t, n, "", function(c) {
    return c;
  })) : l != null && (is(l) && (l = qf(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(uu, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", su(e)) for (var s = 0; s < e.length; s++) {
    o = e[s];
    var u = r + Uo(o, s);
    i += Ml(o, t, n, u, l);
  }
  else if (u = Zf(e), typeof u == "function") for (e = u.call(e), s = 0; !(o = e.next()).done; ) o = o.value, u = r + Uo(o, s++), i += Ml(o, t, n, u, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function gl(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Ml(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function td(e) {
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
var Me = { current: null }, Il = { transition: null }, nd = { ReactCurrentDispatcher: Me, ReactCurrentBatchConfig: Il, ReactCurrentOwner: os };
function ja() {
  throw Error("act(...) is not supported in production builds of React.");
}
$.Children = { map: gl, forEach: function(e, t, n) {
  gl(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return gl(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return gl(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!is(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
$.Component = ur;
$.Fragment = Hf;
$.Profiler = Qf;
$.PureComponent = rs;
$.StrictMode = Vf;
$.Suspense = Yf;
$.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = nd;
$.act = ja;
$.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = ka({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = os.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
    for (u in t) _a.call(t, u) && !Na.hasOwnProperty(u) && (r[u] = t[u] === void 0 && s !== void 0 ? s[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    s = Array(u);
    for (var c = 0; c < u; c++) s[c] = arguments[c + 2];
    r.children = s;
  }
  return { $$typeof: el, type: e.type, key: l, ref: o, props: r, _owner: i };
};
$.createContext = function(e) {
  return e = { $$typeof: Kf, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Xf, _context: e }, e.Consumer = e;
};
$.createElement = Ta;
$.createFactory = function(e) {
  var t = Ta.bind(null, e);
  return t.type = e, t;
};
$.createRef = function() {
  return { current: null };
};
$.forwardRef = function(e) {
  return { $$typeof: bf, render: e };
};
$.isValidElement = is;
$.lazy = function(e) {
  return { $$typeof: Jf, _payload: { _status: -1, _result: e }, _init: td };
};
$.memo = function(e, t) {
  return { $$typeof: Gf, type: e, compare: t === void 0 ? null : t };
};
$.startTransition = function(e) {
  var t = Il.transition;
  Il.transition = {};
  try {
    e();
  } finally {
    Il.transition = t;
  }
};
$.unstable_act = ja;
$.useCallback = function(e, t) {
  return Me.current.useCallback(e, t);
};
$.useContext = function(e) {
  return Me.current.useContext(e);
};
$.useDebugValue = function() {
};
$.useDeferredValue = function(e) {
  return Me.current.useDeferredValue(e);
};
$.useEffect = function(e, t) {
  return Me.current.useEffect(e, t);
};
$.useId = function() {
  return Me.current.useId();
};
$.useImperativeHandle = function(e, t, n) {
  return Me.current.useImperativeHandle(e, t, n);
};
$.useInsertionEffect = function(e, t) {
  return Me.current.useInsertionEffect(e, t);
};
$.useLayoutEffect = function(e, t) {
  return Me.current.useLayoutEffect(e, t);
};
$.useMemo = function(e, t) {
  return Me.current.useMemo(e, t);
};
$.useReducer = function(e, t, n) {
  return Me.current.useReducer(e, t, n);
};
$.useRef = function(e) {
  return Me.current.useRef(e);
};
$.useState = function(e) {
  return Me.current.useState(e);
};
$.useSyncExternalStore = function(e, t, n) {
  return Me.current.useSyncExternalStore(e, t, n);
};
$.useTransition = function() {
  return Me.current.useTransition();
};
$.version = "18.3.1";
wa.exports = $;
var E = wa.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rd = E, ld = Symbol.for("react.element"), od = Symbol.for("react.fragment"), id = Object.prototype.hasOwnProperty, sd = rd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, ud = { key: !0, ref: !0, __self: !0, __source: !0 };
function za(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) id.call(t, r) && !ud.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: ld, type: e, key: o, ref: i, props: l, _owner: sd.current };
}
go.Fragment = od;
go.jsx = za;
go.jsxs = za;
xa.exports = go;
var p = xa.exports, Pa = { exports: {} }, Xe = {}, La = { exports: {} }, Ra = {};
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
  function t(P, O) {
    var U = P.length;
    P.push(O);
    e: for (; 0 < U; ) {
      var K = U - 1 >>> 1, ce = P[K];
      if (0 < l(ce, O)) P[K] = O, P[U] = ce, U = K;
      else break e;
    }
  }
  function n(P) {
    return P.length === 0 ? null : P[0];
  }
  function r(P) {
    if (P.length === 0) return null;
    var O = P[0], U = P.pop();
    if (U !== O) {
      P[0] = U;
      e: for (var K = 0, ce = P.length, Ut = ce >>> 1; K < Ut; ) {
        var V = 2 * (K + 1) - 1, St = P[V], Ye = V + 1, $e = P[Ye];
        if (0 > l(St, U)) Ye < ce && 0 > l($e, St) ? (P[K] = $e, P[Ye] = U, K = Ye) : (P[K] = St, P[V] = U, K = V);
        else if (Ye < ce && 0 > l($e, U)) P[K] = $e, P[Ye] = U, K = Ye;
        else break e;
      }
    }
    return O;
  }
  function l(P, O) {
    var U = P.sortIndex - O.sortIndex;
    return U !== 0 ? U : P.id - O.id;
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
  var u = [], c = [], g = 1, m = null, h = 3, w = !1, k = !1, y = !1, D = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, a = typeof setImmediate != "undefined" ? setImmediate : null;
  typeof navigator != "undefined" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function d(P) {
    for (var O = n(c); O !== null; ) {
      if (O.callback === null) r(c);
      else if (O.startTime <= P) r(c), O.sortIndex = O.expirationTime, t(u, O);
      else break;
      O = n(c);
    }
  }
  function v(P) {
    if (y = !1, d(P), !k) if (n(u) !== null) k = !0, ct(C);
    else {
      var O = n(c);
      O !== null && At(v, O.startTime - P);
    }
  }
  function C(P, O) {
    k = !1, y && (y = !1, f(M), M = -1), w = !0;
    var U = h;
    try {
      for (d(O), m = n(u); m !== null && (!(m.expirationTime > O) || P && !Ee()); ) {
        var K = m.callback;
        if (typeof K == "function") {
          m.callback = null, h = m.priorityLevel;
          var ce = K(m.expirationTime <= O);
          O = e.unstable_now(), typeof ce == "function" ? m.callback = ce : m === n(u) && r(u), d(O);
        } else r(u);
        m = n(u);
      }
      if (m !== null) var Ut = !0;
      else {
        var V = n(c);
        V !== null && At(v, V.startTime - O), Ut = !1;
      }
      return Ut;
    } finally {
      m = null, h = U, w = !1;
    }
  }
  var N = !1, z = null, M = -1, X = 5, A = -1;
  function Ee() {
    return !(e.unstable_now() - A < X);
  }
  function ye() {
    if (z !== null) {
      var P = e.unstable_now();
      A = P;
      var O = !0;
      try {
        O = z(!0, P);
      } finally {
        O ? at() : (N = !1, z = null);
      }
    } else N = !1;
  }
  var at;
  if (typeof a == "function") at = function() {
    a(ye);
  };
  else if (typeof MessageChannel != "undefined") {
    var be = new MessageChannel(), wt = be.port2;
    be.port1.onmessage = ye, at = function() {
      wt.postMessage(null);
    };
  } else at = function() {
    D(ye, 0);
  };
  function ct(P) {
    z = P, N || (N = !0, at());
  }
  function At(P, O) {
    M = D(function() {
      P(e.unstable_now());
    }, O);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(P) {
    P.callback = null;
  }, e.unstable_continueExecution = function() {
    k || w || (k = !0, ct(C));
  }, e.unstable_forceFrameRate = function(P) {
    0 > P || 125 < P ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : X = 0 < P ? Math.floor(1e3 / P) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(P) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var O = 3;
        break;
      default:
        O = h;
    }
    var U = h;
    h = O;
    try {
      return P();
    } finally {
      h = U;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(P, O) {
    switch (P) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        P = 3;
    }
    var U = h;
    h = P;
    try {
      return O();
    } finally {
      h = U;
    }
  }, e.unstable_scheduleCallback = function(P, O, U) {
    var K = e.unstable_now();
    switch (typeof U == "object" && U !== null ? (U = U.delay, U = typeof U == "number" && 0 < U ? K + U : K) : U = K, P) {
      case 1:
        var ce = -1;
        break;
      case 2:
        ce = 250;
        break;
      case 5:
        ce = 1073741823;
        break;
      case 4:
        ce = 1e4;
        break;
      default:
        ce = 5e3;
    }
    return ce = U + ce, P = { id: g++, callback: O, priorityLevel: P, startTime: U, expirationTime: ce, sortIndex: -1 }, U > K ? (P.sortIndex = U, t(c, P), n(u) === null && P === n(c) && (y ? (f(M), M = -1) : y = !0, At(v, U - K))) : (P.sortIndex = ce, t(u, P), k || w || (k = !0, ct(C))), P;
  }, e.unstable_shouldYield = Ee, e.unstable_wrapCallback = function(P) {
    var O = h;
    return function() {
      var U = h;
      h = O;
      try {
        return P.apply(this, arguments);
      } finally {
        h = U;
      }
    };
  };
})(Ra);
La.exports = Ra;
var ad = La.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cd = E, Qe = ad;
function _(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Ma = /* @__PURE__ */ new Set(), Fr = {};
function zn(e, t) {
  tr(e, t), tr(e + "Capture", t);
}
function tr(e, t) {
  for (Fr[e] = t, e = 0; e < t.length; e++) Ma.add(t[e]);
}
var Mt = !(typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined"), fi = Object.prototype.hasOwnProperty, fd = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, au = {}, cu = {};
function dd(e) {
  return fi.call(cu, e) ? !0 : fi.call(au, e) ? !1 : fd.test(e) ? cu[e] = !0 : (au[e] = !0, !1);
}
function pd(e, t, n, r) {
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
function hd(e, t, n, r) {
  if (t === null || typeof t == "undefined" || pd(e, t, n, r)) return !0;
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
function Ie(e, t, n, r, l, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
var ke = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ke[e] = new Ie(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ke[t] = new Ie(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ke[e] = new Ie(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ke[e] = new Ie(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ke[e] = new Ie(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ke[e] = new Ie(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ke[e] = new Ie(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ke[e] = new Ie(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ke[e] = new Ie(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ss = /[\-:]([a-z])/g;
function us(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    ss,
    us
  );
  ke[t] = new Ie(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(ss, us);
  ke[t] = new Ie(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(ss, us);
  ke[t] = new Ie(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ke[e] = new Ie(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ke.xlinkHref = new Ie("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ke[e] = new Ie(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function as(e, t, n, r) {
  var l = ke.hasOwnProperty(t) ? ke[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (hd(t, n, l, r) && (n = null), r || l === null ? dd(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ft = cd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, yl = Symbol.for("react.element"), Fn = Symbol.for("react.portal"), An = Symbol.for("react.fragment"), cs = Symbol.for("react.strict_mode"), di = Symbol.for("react.profiler"), Ia = Symbol.for("react.provider"), Da = Symbol.for("react.context"), fs = Symbol.for("react.forward_ref"), pi = Symbol.for("react.suspense"), hi = Symbol.for("react.suspense_list"), ds = Symbol.for("react.memo"), Ht = Symbol.for("react.lazy"), Oa = Symbol.for("react.offscreen"), fu = Symbol.iterator;
function gr(e) {
  return e === null || typeof e != "object" ? null : (e = fu && e[fu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var re = Object.assign, $o;
function Cr(e) {
  if ($o === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    $o = t && t[1] || "";
  }
  return `
` + $o + e;
}
var Bo = !1;
function Wo(e, t) {
  if (!e || Bo) return "";
  Bo = !0;
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
    Bo = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Cr(e) : "";
}
function md(e) {
  switch (e.tag) {
    case 5:
      return Cr(e.type);
    case 16:
      return Cr("Lazy");
    case 13:
      return Cr("Suspense");
    case 19:
      return Cr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Wo(e.type, !1), e;
    case 11:
      return e = Wo(e.type.render, !1), e;
    case 1:
      return e = Wo(e.type, !0), e;
    default:
      return "";
  }
}
function mi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case An:
      return "Fragment";
    case Fn:
      return "Portal";
    case di:
      return "Profiler";
    case cs:
      return "StrictMode";
    case pi:
      return "Suspense";
    case hi:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Da:
      return (e.displayName || "Context") + ".Consumer";
    case Ia:
      return (e._context.displayName || "Context") + ".Provider";
    case fs:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case ds:
      return t = e.displayName || null, t !== null ? t : mi(e.type) || "Memo";
    case Ht:
      t = e._payload, e = e._init;
      try {
        return mi(e(t));
      } catch (n) {
      }
  }
  return null;
}
function gd(e) {
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
      return mi(t);
    case 8:
      return t === cs ? "StrictMode" : "Mode";
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
function rn(e) {
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
function Fa(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function yd(e) {
  var t = Fa(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function vl(e) {
  e._valueTracker || (e._valueTracker = yd(e));
}
function Aa(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Fa(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Ql(e) {
  if (e = e || (typeof document != "undefined" ? document : void 0), typeof e == "undefined") return null;
  try {
    return e.activeElement || e.body;
  } catch (t) {
    return e.body;
  }
}
function gi(e, t) {
  var n = t.checked;
  return re({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n != null ? n : e._wrapperState.initialChecked });
}
function du(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = rn(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Ua(e, t) {
  t = t.checked, t != null && as(e, "checked", t, !1);
}
function yi(e, t) {
  Ua(e, t);
  var n = rn(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? vi(e, t.type, n) : t.hasOwnProperty("defaultValue") && vi(e, t.type, rn(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function pu(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function vi(e, t, n) {
  (t !== "number" || Ql(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var _r = Array.isArray;
function Yn(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + rn(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function xi(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(_(91));
  return re({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function hu(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(_(92));
      if (_r(n)) {
        if (1 < n.length) throw Error(_(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: rn(n) };
}
function $a(e, t) {
  var n = rn(t.value), r = rn(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function mu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ba(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function wi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ba(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var xl, Wa = function(e) {
  return typeof MSApp != "undefined" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (xl = xl || document.createElement("div"), xl.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = xl.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Ar(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var jr = {
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
}, vd = ["Webkit", "ms", "Moz", "O"];
Object.keys(jr).forEach(function(e) {
  vd.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), jr[t] = jr[e];
  });
});
function Ha(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || jr.hasOwnProperty(e) && jr[e] ? ("" + t).trim() : t + "px";
}
function Va(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Ha(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var xd = re({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Si(e, t) {
  if (t) {
    if (xd[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(_(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(_(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(_(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(_(62));
  }
}
function ki(e, t) {
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
var Ei = null;
function ps(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Ci = null, Gn = null, Jn = null;
function gu(e) {
  if (e = rl(e)) {
    if (typeof Ci != "function") throw Error(_(280));
    var t = e.stateNode;
    t && (t = So(t), Ci(e.stateNode, e.type, t));
  }
}
function Qa(e) {
  Gn ? Jn ? Jn.push(e) : Jn = [e] : Gn = e;
}
function Xa() {
  if (Gn) {
    var e = Gn, t = Jn;
    if (Jn = Gn = null, gu(e), t) for (e = 0; e < t.length; e++) gu(t[e]);
  }
}
function Ka(e, t) {
  return e(t);
}
function ba() {
}
var Ho = !1;
function Ya(e, t, n) {
  if (Ho) return e(t, n);
  Ho = !0;
  try {
    return Ka(e, t, n);
  } finally {
    Ho = !1, (Gn !== null || Jn !== null) && (ba(), Xa());
  }
}
function Ur(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = So(n);
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
  if (n && typeof n != "function") throw Error(_(231, t, typeof n));
  return n;
}
var _i = !1;
if (Mt) try {
  var yr = {};
  Object.defineProperty(yr, "passive", { get: function() {
    _i = !0;
  } }), window.addEventListener("test", yr, yr), window.removeEventListener("test", yr, yr);
} catch (e) {
  _i = !1;
}
function wd(e, t, n, r, l, o, i, s, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (g) {
    this.onError(g);
  }
}
var zr = !1, Xl = null, Kl = !1, Ni = null, Sd = { onError: function(e) {
  zr = !0, Xl = e;
} };
function kd(e, t, n, r, l, o, i, s, u) {
  zr = !1, Xl = null, wd.apply(Sd, arguments);
}
function Ed(e, t, n, r, l, o, i, s, u) {
  if (kd.apply(this, arguments), zr) {
    if (zr) {
      var c = Xl;
      zr = !1, Xl = null;
    } else throw Error(_(198));
    Kl || (Kl = !0, Ni = c);
  }
}
function Pn(e) {
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
function Ga(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function yu(e) {
  if (Pn(e) !== e) throw Error(_(188));
}
function Cd(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Pn(e), t === null) throw Error(_(188));
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
        if (o === n) return yu(l), e;
        if (o === r) return yu(l), t;
        o = o.sibling;
      }
      throw Error(_(188));
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
        if (!i) throw Error(_(189));
      }
    }
    if (n.alternate !== r) throw Error(_(190));
  }
  if (n.tag !== 3) throw Error(_(188));
  return n.stateNode.current === n ? e : t;
}
function Ja(e) {
  return e = Cd(e), e !== null ? Za(e) : null;
}
function Za(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Za(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var qa = Qe.unstable_scheduleCallback, vu = Qe.unstable_cancelCallback, _d = Qe.unstable_shouldYield, Nd = Qe.unstable_requestPaint, ae = Qe.unstable_now, Td = Qe.unstable_getCurrentPriorityLevel, hs = Qe.unstable_ImmediatePriority, ec = Qe.unstable_UserBlockingPriority, bl = Qe.unstable_NormalPriority, jd = Qe.unstable_LowPriority, tc = Qe.unstable_IdlePriority, yo = null, vt = null;
function zd(e) {
  if (vt && typeof vt.onCommitFiberRoot == "function") try {
    vt.onCommitFiberRoot(yo, e, void 0, (e.current.flags & 128) === 128);
  } catch (t) {
  }
}
var it = Math.clz32 ? Math.clz32 : Rd, Pd = Math.log, Ld = Math.LN2;
function Rd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Pd(e) / Ld | 0) | 0;
}
var wl = 64, Sl = 4194304;
function Nr(e) {
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
function Yl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var s = i & ~l;
    s !== 0 ? r = Nr(s) : (o &= i, o !== 0 && (r = Nr(o)));
  } else i = n & ~l, i !== 0 ? r = Nr(i) : o !== 0 && (r = Nr(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - it(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Md(e, t) {
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
function Id(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - it(o), s = 1 << i, u = l[i];
    u === -1 ? (!(s & n) || s & r) && (l[i] = Md(s, t)) : u <= t && (e.expiredLanes |= s), o &= ~s;
  }
}
function Ti(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function nc() {
  var e = wl;
  return wl <<= 1, !(wl & 4194240) && (wl = 64), e;
}
function Vo(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function tl(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - it(t), e[t] = n;
}
function Dd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - it(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function ms(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - it(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var Q = 0;
function rc(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var lc, gs, oc, ic, sc, ji = !1, kl = [], Yt = null, Gt = null, Jt = null, $r = /* @__PURE__ */ new Map(), Br = /* @__PURE__ */ new Map(), Qt = [], Od = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function xu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Yt = null;
      break;
    case "dragenter":
    case "dragleave":
      Gt = null;
      break;
    case "mouseover":
    case "mouseout":
      Jt = null;
      break;
    case "pointerover":
    case "pointerout":
      $r.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Br.delete(t.pointerId);
  }
}
function vr(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = rl(t), t !== null && gs(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Fd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return Yt = vr(Yt, e, t, n, r, l), !0;
    case "dragenter":
      return Gt = vr(Gt, e, t, n, r, l), !0;
    case "mouseover":
      return Jt = vr(Jt, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return $r.set(o, vr($r.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Br.set(o, vr(Br.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function uc(e) {
  var t = xn(e.target);
  if (t !== null) {
    var n = Pn(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ga(n), t !== null) {
          e.blockedOn = t, sc(e.priority, function() {
            oc(n);
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
function Dl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = zi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      Ei = r, n.target.dispatchEvent(r), Ei = null;
    } else return t = rl(n), t !== null && gs(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function wu(e, t, n) {
  Dl(e) && n.delete(t);
}
function Ad() {
  ji = !1, Yt !== null && Dl(Yt) && (Yt = null), Gt !== null && Dl(Gt) && (Gt = null), Jt !== null && Dl(Jt) && (Jt = null), $r.forEach(wu), Br.forEach(wu);
}
function xr(e, t) {
  e.blockedOn === t && (e.blockedOn = null, ji || (ji = !0, Qe.unstable_scheduleCallback(Qe.unstable_NormalPriority, Ad)));
}
function Wr(e) {
  function t(l) {
    return xr(l, e);
  }
  if (0 < kl.length) {
    xr(kl[0], e);
    for (var n = 1; n < kl.length; n++) {
      var r = kl[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (Yt !== null && xr(Yt, e), Gt !== null && xr(Gt, e), Jt !== null && xr(Jt, e), $r.forEach(t), Br.forEach(t), n = 0; n < Qt.length; n++) r = Qt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Qt.length && (n = Qt[0], n.blockedOn === null); ) uc(n), n.blockedOn === null && Qt.shift();
}
var Zn = Ft.ReactCurrentBatchConfig, Gl = !0;
function Ud(e, t, n, r) {
  var l = Q, o = Zn.transition;
  Zn.transition = null;
  try {
    Q = 1, ys(e, t, n, r);
  } finally {
    Q = l, Zn.transition = o;
  }
}
function $d(e, t, n, r) {
  var l = Q, o = Zn.transition;
  Zn.transition = null;
  try {
    Q = 4, ys(e, t, n, r);
  } finally {
    Q = l, Zn.transition = o;
  }
}
function ys(e, t, n, r) {
  if (Gl) {
    var l = zi(e, t, n, r);
    if (l === null) ei(e, t, r, Jl, n), xu(e, r);
    else if (Fd(l, e, t, n, r)) r.stopPropagation();
    else if (xu(e, r), t & 4 && -1 < Od.indexOf(e)) {
      for (; l !== null; ) {
        var o = rl(l);
        if (o !== null && lc(o), o = zi(e, t, n, r), o === null && ei(e, t, r, Jl, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else ei(e, t, r, null, n);
  }
}
var Jl = null;
function zi(e, t, n, r) {
  if (Jl = null, e = ps(r), e = xn(e), e !== null) if (t = Pn(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Ga(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Jl = e, null;
}
function ac(e) {
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
      switch (Td()) {
        case hs:
          return 1;
        case ec:
          return 4;
        case bl:
        case jd:
          return 16;
        case tc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Kt = null, vs = null, Ol = null;
function cc() {
  if (Ol) return Ol;
  var e, t = vs, n = t.length, r, l = "value" in Kt ? Kt.value : Kt.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return Ol = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Fl(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function El() {
  return !0;
}
function Su() {
  return !1;
}
function Ke(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(o) : o[s]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? El : Su, this.isPropagationStopped = Su, this;
  }
  return re(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = El);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = El);
  }, persist: function() {
  }, isPersistent: El }), t;
}
var ar = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, xs = Ke(ar), nl = re({}, ar, { view: 0, detail: 0 }), Bd = Ke(nl), Qo, Xo, wr, vo = re({}, nl, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ws, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== wr && (wr && e.type === "mousemove" ? (Qo = e.screenX - wr.screenX, Xo = e.screenY - wr.screenY) : Xo = Qo = 0, wr = e), Qo);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Xo;
} }), ku = Ke(vo), Wd = re({}, vo, { dataTransfer: 0 }), Hd = Ke(Wd), Vd = re({}, nl, { relatedTarget: 0 }), Ko = Ke(Vd), Qd = re({}, ar, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = Ke(Qd), Kd = re({}, ar, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), bd = Ke(Kd), Yd = re({}, ar, { data: 0 }), Eu = Ke(Yd), Gd = {
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
}, Jd = {
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
}, Zd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function qd(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Zd[e]) ? !!t[e] : !1;
}
function ws() {
  return qd;
}
var ep = re({}, nl, { key: function(e) {
  if (e.key) {
    var t = Gd[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Fl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Jd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ws, charCode: function(e) {
  return e.type === "keypress" ? Fl(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Fl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), tp = Ke(ep), np = re({}, vo, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Cu = Ke(np), rp = re({}, nl, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ws }), lp = Ke(rp), op = re({}, ar, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), ip = Ke(op), sp = re({}, vo, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), up = Ke(sp), ap = [9, 13, 27, 32], Ss = Mt && "CompositionEvent" in window, Pr = null;
Mt && "documentMode" in document && (Pr = document.documentMode);
var cp = Mt && "TextEvent" in window && !Pr, fc = Mt && (!Ss || Pr && 8 < Pr && 11 >= Pr), _u = " ", Nu = !1;
function dc(e, t) {
  switch (e) {
    case "keyup":
      return ap.indexOf(t.keyCode) !== -1;
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
function pc(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Un = !1;
function fp(e, t) {
  switch (e) {
    case "compositionend":
      return pc(t);
    case "keypress":
      return t.which !== 32 ? null : (Nu = !0, _u);
    case "textInput":
      return e = t.data, e === _u && Nu ? null : e;
    default:
      return null;
  }
}
function dp(e, t) {
  if (Un) return e === "compositionend" || !Ss && dc(e, t) ? (e = cc(), Ol = vs = Kt = null, Un = !1, e) : null;
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
      return fc && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var pp = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Tu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!pp[e.type] : t === "textarea";
}
function hc(e, t, n, r) {
  Qa(r), t = Zl(t, "onChange"), 0 < t.length && (n = new xs("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Lr = null, Hr = null;
function hp(e) {
  _c(e, 0);
}
function xo(e) {
  var t = Wn(e);
  if (Aa(t)) return e;
}
function mp(e, t) {
  if (e === "change") return t;
}
var mc = !1;
if (Mt) {
  var bo;
  if (Mt) {
    var Yo = "oninput" in document;
    if (!Yo) {
      var ju = document.createElement("div");
      ju.setAttribute("oninput", "return;"), Yo = typeof ju.oninput == "function";
    }
    bo = Yo;
  } else bo = !1;
  mc = bo && (!document.documentMode || 9 < document.documentMode);
}
function zu() {
  Lr && (Lr.detachEvent("onpropertychange", gc), Hr = Lr = null);
}
function gc(e) {
  if (e.propertyName === "value" && xo(Hr)) {
    var t = [];
    hc(t, Hr, e, ps(e)), Ya(hp, t);
  }
}
function gp(e, t, n) {
  e === "focusin" ? (zu(), Lr = t, Hr = n, Lr.attachEvent("onpropertychange", gc)) : e === "focusout" && zu();
}
function yp(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return xo(Hr);
}
function vp(e, t) {
  if (e === "click") return xo(t);
}
function xp(e, t) {
  if (e === "input" || e === "change") return xo(t);
}
function wp(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var ut = typeof Object.is == "function" ? Object.is : wp;
function Vr(e, t) {
  if (ut(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!fi.call(t, l) || !ut(e[l], t[l])) return !1;
  }
  return !0;
}
function Pu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Lu(e, t) {
  var n = Pu(e);
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
    n = Pu(n);
  }
}
function yc(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? yc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function vc() {
  for (var e = window, t = Ql(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch (r) {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Ql(e.document);
  }
  return t;
}
function ks(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Sp(e) {
  var t = vc(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && yc(n.ownerDocument.documentElement, n)) {
    if (r !== null && ks(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = Lu(n, o);
        var i = Lu(
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
var kp = Mt && "documentMode" in document && 11 >= document.documentMode, $n = null, Pi = null, Rr = null, Li = !1;
function Ru(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Li || $n == null || $n !== Ql(r) || (r = $n, "selectionStart" in r && ks(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Rr && Vr(Rr, r) || (Rr = r, r = Zl(Pi, "onSelect"), 0 < r.length && (t = new xs("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = $n)));
}
function Cl(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Bn = { animationend: Cl("Animation", "AnimationEnd"), animationiteration: Cl("Animation", "AnimationIteration"), animationstart: Cl("Animation", "AnimationStart"), transitionend: Cl("Transition", "TransitionEnd") }, Go = {}, xc = {};
Mt && (xc = document.createElement("div").style, "AnimationEvent" in window || (delete Bn.animationend.animation, delete Bn.animationiteration.animation, delete Bn.animationstart.animation), "TransitionEvent" in window || delete Bn.transitionend.transition);
function wo(e) {
  if (Go[e]) return Go[e];
  if (!Bn[e]) return e;
  var t = Bn[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in xc) return Go[e] = t[n];
  return e;
}
var wc = wo("animationend"), Sc = wo("animationiteration"), kc = wo("animationstart"), Ec = wo("transitionend"), Cc = /* @__PURE__ */ new Map(), Mu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function on(e, t) {
  Cc.set(e, t), zn(t, [e]);
}
for (var Jo = 0; Jo < Mu.length; Jo++) {
  var Zo = Mu[Jo], Ep = Zo.toLowerCase(), Cp = Zo[0].toUpperCase() + Zo.slice(1);
  on(Ep, "on" + Cp);
}
on(wc, "onAnimationEnd");
on(Sc, "onAnimationIteration");
on(kc, "onAnimationStart");
on("dblclick", "onDoubleClick");
on("focusin", "onFocus");
on("focusout", "onBlur");
on(Ec, "onTransitionEnd");
tr("onMouseEnter", ["mouseout", "mouseover"]);
tr("onMouseLeave", ["mouseout", "mouseover"]);
tr("onPointerEnter", ["pointerout", "pointerover"]);
tr("onPointerLeave", ["pointerout", "pointerover"]);
zn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
zn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
zn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
zn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
zn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
zn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Tr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), _p = new Set("cancel close invalid load scroll toggle".split(" ").concat(Tr));
function Iu(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Ed(r, t, void 0, e), e.currentTarget = null;
}
function _c(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var s = r[i], u = s.instance, c = s.currentTarget;
        if (s = s.listener, u !== o && l.isPropagationStopped()) break e;
        Iu(l, s, c), o = u;
      }
      else for (i = 0; i < r.length; i++) {
        if (s = r[i], u = s.instance, c = s.currentTarget, s = s.listener, u !== o && l.isPropagationStopped()) break e;
        Iu(l, s, c), o = u;
      }
    }
  }
  if (Kl) throw e = Ni, Kl = !1, Ni = null, e;
}
function J(e, t) {
  var n = t[Oi];
  n === void 0 && (n = t[Oi] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Nc(t, e, 2, !1), n.add(r));
}
function qo(e, t, n) {
  var r = 0;
  t && (r |= 4), Nc(n, e, r, t);
}
var _l = "_reactListening" + Math.random().toString(36).slice(2);
function Qr(e) {
  if (!e[_l]) {
    e[_l] = !0, Ma.forEach(function(n) {
      n !== "selectionchange" && (_p.has(n) || qo(n, !1, e), qo(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[_l] || (t[_l] = !0, qo("selectionchange", !1, t));
  }
}
function Nc(e, t, n, r) {
  switch (ac(t)) {
    case 1:
      var l = Ud;
      break;
    case 4:
      l = $d;
      break;
    default:
      l = ys;
  }
  n = l.bind(null, t, n, e), l = void 0, !_i || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function ei(e, t, n, r, l) {
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
        if (i = xn(s), i === null) return;
        if (u = i.tag, u === 5 || u === 6) {
          r = o = i;
          continue e;
        }
        s = s.parentNode;
      }
    }
    r = r.return;
  }
  Ya(function() {
    var c = o, g = ps(n), m = [];
    e: {
      var h = Cc.get(e);
      if (h !== void 0) {
        var w = xs, k = e;
        switch (e) {
          case "keypress":
            if (Fl(n) === 0) break e;
          case "keydown":
          case "keyup":
            w = tp;
            break;
          case "focusin":
            k = "focus", w = Ko;
            break;
          case "focusout":
            k = "blur", w = Ko;
            break;
          case "beforeblur":
          case "afterblur":
            w = Ko;
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
            w = ku;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = Hd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = lp;
            break;
          case wc:
          case Sc:
          case kc:
            w = Xd;
            break;
          case Ec:
            w = ip;
            break;
          case "scroll":
            w = Bd;
            break;
          case "wheel":
            w = up;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = bd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = Cu;
        }
        var y = (t & 4) !== 0, D = !y && e === "scroll", f = y ? h !== null ? h + "Capture" : null : h;
        y = [];
        for (var a = c, d; a !== null; ) {
          d = a;
          var v = d.stateNode;
          if (d.tag === 5 && v !== null && (d = v, f !== null && (v = Ur(a, f), v != null && y.push(Xr(a, v, d)))), D) break;
          a = a.return;
        }
        0 < y.length && (h = new w(h, k, null, n, g), m.push({ event: h, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", w = e === "mouseout" || e === "pointerout", h && n !== Ei && (k = n.relatedTarget || n.fromElement) && (xn(k) || k[It])) break e;
        if ((w || h) && (h = g.window === g ? g : (h = g.ownerDocument) ? h.defaultView || h.parentWindow : window, w ? (k = n.relatedTarget || n.toElement, w = c, k = k ? xn(k) : null, k !== null && (D = Pn(k), k !== D || k.tag !== 5 && k.tag !== 6) && (k = null)) : (w = null, k = c), w !== k)) {
          if (y = ku, v = "onMouseLeave", f = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (y = Cu, v = "onPointerLeave", f = "onPointerEnter", a = "pointer"), D = w == null ? h : Wn(w), d = k == null ? h : Wn(k), h = new y(v, a + "leave", w, n, g), h.target = D, h.relatedTarget = d, v = null, xn(g) === c && (y = new y(f, a + "enter", k, n, g), y.target = d, y.relatedTarget = D, v = y), D = v, w && k) t: {
            for (y = w, f = k, a = 0, d = y; d; d = Dn(d)) a++;
            for (d = 0, v = f; v; v = Dn(v)) d++;
            for (; 0 < a - d; ) y = Dn(y), a--;
            for (; 0 < d - a; ) f = Dn(f), d--;
            for (; a--; ) {
              if (y === f || f !== null && y === f.alternate) break t;
              y = Dn(y), f = Dn(f);
            }
            y = null;
          }
          else y = null;
          w !== null && Du(m, h, w, y, !1), k !== null && D !== null && Du(m, D, k, y, !0);
        }
      }
      e: {
        if (h = c ? Wn(c) : window, w = h.nodeName && h.nodeName.toLowerCase(), w === "select" || w === "input" && h.type === "file") var C = mp;
        else if (Tu(h)) if (mc) C = xp;
        else {
          C = yp;
          var N = gp;
        }
        else (w = h.nodeName) && w.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (C = vp);
        if (C && (C = C(e, c))) {
          hc(m, C, n, g);
          break e;
        }
        N && N(e, h, c), e === "focusout" && (N = h._wrapperState) && N.controlled && h.type === "number" && vi(h, "number", h.value);
      }
      switch (N = c ? Wn(c) : window, e) {
        case "focusin":
          (Tu(N) || N.contentEditable === "true") && ($n = N, Pi = c, Rr = null);
          break;
        case "focusout":
          Rr = Pi = $n = null;
          break;
        case "mousedown":
          Li = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Li = !1, Ru(m, n, g);
          break;
        case "selectionchange":
          if (kp) break;
        case "keydown":
        case "keyup":
          Ru(m, n, g);
      }
      var z;
      if (Ss) e: {
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
      else Un ? dc(e, n) && (M = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (M = "onCompositionStart");
      M && (fc && n.locale !== "ko" && (Un || M !== "onCompositionStart" ? M === "onCompositionEnd" && Un && (z = cc()) : (Kt = g, vs = "value" in Kt ? Kt.value : Kt.textContent, Un = !0)), N = Zl(c, M), 0 < N.length && (M = new Eu(M, e, null, n, g), m.push({ event: M, listeners: N }), z ? M.data = z : (z = pc(n), z !== null && (M.data = z)))), (z = cp ? fp(e, n) : dp(e, n)) && (c = Zl(c, "onBeforeInput"), 0 < c.length && (g = new Eu("onBeforeInput", "beforeinput", null, n, g), m.push({ event: g, listeners: c }), g.data = z));
    }
    _c(m, t);
  });
}
function Xr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Zl(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = Ur(e, n), o != null && r.unshift(Xr(e, o, l)), o = Ur(e, t), o != null && r.push(Xr(e, o, l))), e = e.return;
  }
  return r;
}
function Dn(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Du(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var s = n, u = s.alternate, c = s.stateNode;
    if (u !== null && u === r) break;
    s.tag === 5 && c !== null && (s = c, l ? (u = Ur(n, o), u != null && i.unshift(Xr(n, u, s))) : l || (u = Ur(n, o), u != null && i.push(Xr(n, u, s)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var Np = /\r\n?/g, Tp = /\u0000|\uFFFD/g;
function Ou(e) {
  return (typeof e == "string" ? e : "" + e).replace(Np, `
`).replace(Tp, "");
}
function Nl(e, t, n) {
  if (t = Ou(t), Ou(e) !== t && n) throw Error(_(425));
}
function ql() {
}
var Ri = null, Mi = null;
function Ii(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Di = typeof setTimeout == "function" ? setTimeout : void 0, jp = typeof clearTimeout == "function" ? clearTimeout : void 0, Fu = typeof Promise == "function" ? Promise : void 0, zp = typeof queueMicrotask == "function" ? queueMicrotask : typeof Fu != "undefined" ? function(e) {
  return Fu.resolve(null).then(e).catch(Pp);
} : Di;
function Pp(e) {
  setTimeout(function() {
    throw e;
  });
}
function ti(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Wr(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Wr(t);
}
function Zt(e) {
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
function Au(e) {
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
var cr = Math.random().toString(36).slice(2), yt = "__reactFiber$" + cr, Kr = "__reactProps$" + cr, It = "__reactContainer$" + cr, Oi = "__reactEvents$" + cr, Lp = "__reactListeners$" + cr, Rp = "__reactHandles$" + cr;
function xn(e) {
  var t = e[yt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[It] || n[yt]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Au(e); e !== null; ) {
        if (n = e[yt]) return n;
        e = Au(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function rl(e) {
  return e = e[yt] || e[It], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Wn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(_(33));
}
function So(e) {
  return e[Kr] || null;
}
var Fi = [], Hn = -1;
function sn(e) {
  return { current: e };
}
function Z(e) {
  0 > Hn || (e.current = Fi[Hn], Fi[Hn] = null, Hn--);
}
function b(e, t) {
  Hn++, Fi[Hn] = e.current, e.current = t;
}
var ln = {}, je = sn(ln), Fe = sn(!1), Cn = ln;
function nr(e, t) {
  var n = e.type.contextTypes;
  if (!n) return ln;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Ae(e) {
  return e = e.childContextTypes, e != null;
}
function eo() {
  Z(Fe), Z(je);
}
function Uu(e, t, n) {
  if (je.current !== ln) throw Error(_(168));
  b(je, t), b(Fe, n);
}
function Tc(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(_(108, gd(e) || "Unknown", l));
  return re({}, n, r);
}
function to(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || ln, Cn = je.current, b(je, e), b(Fe, Fe.current), !0;
}
function $u(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(_(169));
  n ? (e = Tc(e, t, Cn), r.__reactInternalMemoizedMergedChildContext = e, Z(Fe), Z(je), b(je, e)) : Z(Fe), b(Fe, n);
}
var zt = null, ko = !1, ni = !1;
function jc(e) {
  zt === null ? zt = [e] : zt.push(e);
}
function Mp(e) {
  ko = !0, jc(e);
}
function un() {
  if (!ni && zt !== null) {
    ni = !0;
    var e = 0, t = Q;
    try {
      var n = zt;
      for (Q = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      zt = null, ko = !1;
    } catch (l) {
      throw zt !== null && (zt = zt.slice(e + 1)), qa(hs, un), l;
    } finally {
      Q = t, ni = !1;
    }
  }
  return null;
}
var Vn = [], Qn = 0, no = null, ro = 0, Ge = [], Je = 0, _n = null, Pt = 1, Lt = "";
function yn(e, t) {
  Vn[Qn++] = ro, Vn[Qn++] = no, no = e, ro = t;
}
function zc(e, t, n) {
  Ge[Je++] = Pt, Ge[Je++] = Lt, Ge[Je++] = _n, _n = e;
  var r = Pt;
  e = Lt;
  var l = 32 - it(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - it(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, Pt = 1 << 32 - it(t) + l | n << l | r, Lt = o + e;
  } else Pt = 1 << o | n << l | r, Lt = e;
}
function Es(e) {
  e.return !== null && (yn(e, 1), zc(e, 1, 0));
}
function Cs(e) {
  for (; e === no; ) no = Vn[--Qn], Vn[Qn] = null, ro = Vn[--Qn], Vn[Qn] = null;
  for (; e === _n; ) _n = Ge[--Je], Ge[Je] = null, Lt = Ge[--Je], Ge[Je] = null, Pt = Ge[--Je], Ge[Je] = null;
}
var Ve = null, He = null, ee = !1, ot = null;
function Pc(e, t) {
  var n = Ze(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Bu(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Ve = e, He = Zt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Ve = e, He = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = _n !== null ? { id: Pt, overflow: Lt } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ze(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ve = e, He = null, !0) : !1;
    default:
      return !1;
  }
}
function Ai(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ui(e) {
  if (ee) {
    var t = He;
    if (t) {
      var n = t;
      if (!Bu(e, t)) {
        if (Ai(e)) throw Error(_(418));
        t = Zt(n.nextSibling);
        var r = Ve;
        t && Bu(e, t) ? Pc(r, n) : (e.flags = e.flags & -4097 | 2, ee = !1, Ve = e);
      }
    } else {
      if (Ai(e)) throw Error(_(418));
      e.flags = e.flags & -4097 | 2, ee = !1, Ve = e;
    }
  }
}
function Wu(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Ve = e;
}
function Tl(e) {
  if (e !== Ve) return !1;
  if (!ee) return Wu(e), ee = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ii(e.type, e.memoizedProps)), t && (t = He)) {
    if (Ai(e)) throw Lc(), Error(_(418));
    for (; t; ) Pc(e, t), t = Zt(t.nextSibling);
  }
  if (Wu(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(_(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              He = Zt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      He = null;
    }
  } else He = Ve ? Zt(e.stateNode.nextSibling) : null;
  return !0;
}
function Lc() {
  for (var e = He; e; ) e = Zt(e.nextSibling);
}
function rr() {
  He = Ve = null, ee = !1;
}
function _s(e) {
  ot === null ? ot = [e] : ot.push(e);
}
var Ip = Ft.ReactCurrentBatchConfig;
function Sr(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(_(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(_(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var s = l.refs;
        i === null ? delete s[o] : s[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(_(284));
    if (!n._owner) throw Error(_(290, e));
  }
  return e;
}
function jl(e, t) {
  throw e = Object.prototype.toString.call(t), Error(_(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Hu(e) {
  var t = e._init;
  return t(e._payload);
}
function Rc(e) {
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
    return f = nn(f, a), f.index = 0, f.sibling = null, f;
  }
  function o(f, a, d) {
    return f.index = d, e ? (d = f.alternate, d !== null ? (d = d.index, d < a ? (f.flags |= 2, a) : d) : (f.flags |= 2, a)) : (f.flags |= 1048576, a);
  }
  function i(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function s(f, a, d, v) {
    return a === null || a.tag !== 6 ? (a = ai(d, f.mode, v), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function u(f, a, d, v) {
    var C = d.type;
    return C === An ? g(f, a, d.props.children, v, d.key) : a !== null && (a.elementType === C || typeof C == "object" && C !== null && C.$$typeof === Ht && Hu(C) === a.type) ? (v = l(a, d.props), v.ref = Sr(f, a, d), v.return = f, v) : (v = Vl(d.type, d.key, d.props, null, f.mode, v), v.ref = Sr(f, a, d), v.return = f, v);
  }
  function c(f, a, d, v) {
    return a === null || a.tag !== 4 || a.stateNode.containerInfo !== d.containerInfo || a.stateNode.implementation !== d.implementation ? (a = ci(d, f.mode, v), a.return = f, a) : (a = l(a, d.children || []), a.return = f, a);
  }
  function g(f, a, d, v, C) {
    return a === null || a.tag !== 7 ? (a = En(d, f.mode, v, C), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function m(f, a, d) {
    if (typeof a == "string" && a !== "" || typeof a == "number") return a = ai("" + a, f.mode, d), a.return = f, a;
    if (typeof a == "object" && a !== null) {
      switch (a.$$typeof) {
        case yl:
          return d = Vl(a.type, a.key, a.props, null, f.mode, d), d.ref = Sr(f, null, a), d.return = f, d;
        case Fn:
          return a = ci(a, f.mode, d), a.return = f, a;
        case Ht:
          var v = a._init;
          return m(f, v(a._payload), d);
      }
      if (_r(a) || gr(a)) return a = En(a, f.mode, d, null), a.return = f, a;
      jl(f, a);
    }
    return null;
  }
  function h(f, a, d, v) {
    var C = a !== null ? a.key : null;
    if (typeof d == "string" && d !== "" || typeof d == "number") return C !== null ? null : s(f, a, "" + d, v);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case yl:
          return d.key === C ? u(f, a, d, v) : null;
        case Fn:
          return d.key === C ? c(f, a, d, v) : null;
        case Ht:
          return C = d._init, h(
            f,
            a,
            C(d._payload),
            v
          );
      }
      if (_r(d) || gr(d)) return C !== null ? null : g(f, a, d, v, null);
      jl(f, d);
    }
    return null;
  }
  function w(f, a, d, v, C) {
    if (typeof v == "string" && v !== "" || typeof v == "number") return f = f.get(d) || null, s(a, f, "" + v, C);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case yl:
          return f = f.get(v.key === null ? d : v.key) || null, u(a, f, v, C);
        case Fn:
          return f = f.get(v.key === null ? d : v.key) || null, c(a, f, v, C);
        case Ht:
          var N = v._init;
          return w(f, a, d, N(v._payload), C);
      }
      if (_r(v) || gr(v)) return f = f.get(d) || null, g(a, f, v, C, null);
      jl(a, v);
    }
    return null;
  }
  function k(f, a, d, v) {
    for (var C = null, N = null, z = a, M = a = 0, X = null; z !== null && M < d.length; M++) {
      z.index > M ? (X = z, z = null) : X = z.sibling;
      var A = h(f, z, d[M], v);
      if (A === null) {
        z === null && (z = X);
        break;
      }
      e && z && A.alternate === null && t(f, z), a = o(A, a, M), N === null ? C = A : N.sibling = A, N = A, z = X;
    }
    if (M === d.length) return n(f, z), ee && yn(f, M), C;
    if (z === null) {
      for (; M < d.length; M++) z = m(f, d[M], v), z !== null && (a = o(z, a, M), N === null ? C = z : N.sibling = z, N = z);
      return ee && yn(f, M), C;
    }
    for (z = r(f, z); M < d.length; M++) X = w(z, f, M, d[M], v), X !== null && (e && X.alternate !== null && z.delete(X.key === null ? M : X.key), a = o(X, a, M), N === null ? C = X : N.sibling = X, N = X);
    return e && z.forEach(function(Ee) {
      return t(f, Ee);
    }), ee && yn(f, M), C;
  }
  function y(f, a, d, v) {
    var C = gr(d);
    if (typeof C != "function") throw Error(_(150));
    if (d = C.call(d), d == null) throw Error(_(151));
    for (var N = C = null, z = a, M = a = 0, X = null, A = d.next(); z !== null && !A.done; M++, A = d.next()) {
      z.index > M ? (X = z, z = null) : X = z.sibling;
      var Ee = h(f, z, A.value, v);
      if (Ee === null) {
        z === null && (z = X);
        break;
      }
      e && z && Ee.alternate === null && t(f, z), a = o(Ee, a, M), N === null ? C = Ee : N.sibling = Ee, N = Ee, z = X;
    }
    if (A.done) return n(
      f,
      z
    ), ee && yn(f, M), C;
    if (z === null) {
      for (; !A.done; M++, A = d.next()) A = m(f, A.value, v), A !== null && (a = o(A, a, M), N === null ? C = A : N.sibling = A, N = A);
      return ee && yn(f, M), C;
    }
    for (z = r(f, z); !A.done; M++, A = d.next()) A = w(z, f, M, A.value, v), A !== null && (e && A.alternate !== null && z.delete(A.key === null ? M : A.key), a = o(A, a, M), N === null ? C = A : N.sibling = A, N = A);
    return e && z.forEach(function(ye) {
      return t(f, ye);
    }), ee && yn(f, M), C;
  }
  function D(f, a, d, v) {
    if (typeof d == "object" && d !== null && d.type === An && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case yl:
          e: {
            for (var C = d.key, N = a; N !== null; ) {
              if (N.key === C) {
                if (C = d.type, C === An) {
                  if (N.tag === 7) {
                    n(f, N.sibling), a = l(N, d.props.children), a.return = f, f = a;
                    break e;
                  }
                } else if (N.elementType === C || typeof C == "object" && C !== null && C.$$typeof === Ht && Hu(C) === N.type) {
                  n(f, N.sibling), a = l(N, d.props), a.ref = Sr(f, N, d), a.return = f, f = a;
                  break e;
                }
                n(f, N);
                break;
              } else t(f, N);
              N = N.sibling;
            }
            d.type === An ? (a = En(d.props.children, f.mode, v, d.key), a.return = f, f = a) : (v = Vl(d.type, d.key, d.props, null, f.mode, v), v.ref = Sr(f, a, d), v.return = f, f = v);
          }
          return i(f);
        case Fn:
          e: {
            for (N = d.key; a !== null; ) {
              if (a.key === N) if (a.tag === 4 && a.stateNode.containerInfo === d.containerInfo && a.stateNode.implementation === d.implementation) {
                n(f, a.sibling), a = l(a, d.children || []), a.return = f, f = a;
                break e;
              } else {
                n(f, a);
                break;
              }
              else t(f, a);
              a = a.sibling;
            }
            a = ci(d, f.mode, v), a.return = f, f = a;
          }
          return i(f);
        case Ht:
          return N = d._init, D(f, a, N(d._payload), v);
      }
      if (_r(d)) return k(f, a, d, v);
      if (gr(d)) return y(f, a, d, v);
      jl(f, d);
    }
    return typeof d == "string" && d !== "" || typeof d == "number" ? (d = "" + d, a !== null && a.tag === 6 ? (n(f, a.sibling), a = l(a, d), a.return = f, f = a) : (n(f, a), a = ai(d, f.mode, v), a.return = f, f = a), i(f)) : n(f, a);
  }
  return D;
}
var lr = Rc(!0), Mc = Rc(!1), lo = sn(null), oo = null, Xn = null, Ns = null;
function Ts() {
  Ns = Xn = oo = null;
}
function js(e) {
  var t = lo.current;
  Z(lo), e._currentValue = t;
}
function $i(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function qn(e, t) {
  oo = e, Ns = Xn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Oe = !0), e.firstContext = null);
}
function et(e) {
  var t = e._currentValue;
  if (Ns !== e) if (e = { context: e, memoizedValue: t, next: null }, Xn === null) {
    if (oo === null) throw Error(_(308));
    Xn = e, oo.dependencies = { lanes: 0, firstContext: e };
  } else Xn = Xn.next = e;
  return t;
}
var wn = null;
function zs(e) {
  wn === null ? wn = [e] : wn.push(e);
}
function Ic(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, zs(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Dt(e, r);
}
function Dt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Vt = !1;
function Ps(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Dc(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Rt(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function qt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, W & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Dt(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, zs(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Dt(e, n);
}
function Al(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ms(e, n);
  }
}
function Vu(e, t) {
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
function io(e, t, n, r) {
  var l = e.updateQueue;
  Vt = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var u = s, c = u.next;
    u.next = null, i === null ? o = c : i.next = c, i = u;
    var g = e.alternate;
    g !== null && (g = g.updateQueue, s = g.lastBaseUpdate, s !== i && (s === null ? g.firstBaseUpdate = c : s.next = c, g.lastBaseUpdate = u));
  }
  if (o !== null) {
    var m = l.baseState;
    i = 0, g = c = u = null, s = o;
    do {
      var h = s.lane, w = s.eventTime;
      if ((r & h) === h) {
        g !== null && (g = g.next = {
          eventTime: w,
          lane: 0,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        });
        e: {
          var k = e, y = s;
          switch (h = t, w = n, y.tag) {
            case 1:
              if (k = y.payload, typeof k == "function") {
                m = k.call(w, m, h);
                break e;
              }
              m = k;
              break e;
            case 3:
              k.flags = k.flags & -65537 | 128;
            case 0:
              if (k = y.payload, h = typeof k == "function" ? k.call(w, m, h) : k, h == null) break e;
              m = re({}, m, h);
              break e;
            case 2:
              Vt = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [s] : h.push(s));
      } else w = { eventTime: w, lane: h, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, g === null ? (c = g = w, u = m) : g = g.next = w, i |= h;
      if (s = s.next, s === null) {
        if (s = l.shared.pending, s === null) break;
        h = s, s = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (g === null && (u = m), l.baseState = u, l.firstBaseUpdate = c, l.lastBaseUpdate = g, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    Tn |= i, e.lanes = i, e.memoizedState = m;
  }
}
function Qu(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(_(191, l));
      l.call(r);
    }
  }
}
var ll = {}, xt = sn(ll), br = sn(ll), Yr = sn(ll);
function Sn(e) {
  if (e === ll) throw Error(_(174));
  return e;
}
function Ls(e, t) {
  switch (b(Yr, t), b(br, e), b(xt, ll), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : wi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = wi(t, e);
  }
  Z(xt), b(xt, t);
}
function or() {
  Z(xt), Z(br), Z(Yr);
}
function Oc(e) {
  Sn(Yr.current);
  var t = Sn(xt.current), n = wi(t, e.type);
  t !== n && (b(br, e), b(xt, n));
}
function Rs(e) {
  br.current === e && (Z(xt), Z(br));
}
var te = sn(0);
function so(e) {
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
var ri = [];
function Ms() {
  for (var e = 0; e < ri.length; e++) ri[e]._workInProgressVersionPrimary = null;
  ri.length = 0;
}
var Ul = Ft.ReactCurrentDispatcher, li = Ft.ReactCurrentBatchConfig, Nn = 0, ne = null, me = null, ve = null, uo = !1, Mr = !1, Gr = 0, Dp = 0;
function _e() {
  throw Error(_(321));
}
function Is(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!ut(e[n], t[n])) return !1;
  return !0;
}
function Ds(e, t, n, r, l, o) {
  if (Nn = o, ne = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ul.current = e === null || e.memoizedState === null ? Up : $p, e = n(r, l), Mr) {
    o = 0;
    do {
      if (Mr = !1, Gr = 0, 25 <= o) throw Error(_(301));
      o += 1, ve = me = null, t.updateQueue = null, Ul.current = Bp, e = n(r, l);
    } while (Mr);
  }
  if (Ul.current = ao, t = me !== null && me.next !== null, Nn = 0, ve = me = ne = null, uo = !1, t) throw Error(_(300));
  return e;
}
function Os() {
  var e = Gr !== 0;
  return Gr = 0, e;
}
function gt() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ve === null ? ne.memoizedState = ve = e : ve = ve.next = e, ve;
}
function tt() {
  if (me === null) {
    var e = ne.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = me.next;
  var t = ve === null ? ne.memoizedState : ve.next;
  if (t !== null) ve = t, me = e;
  else {
    if (e === null) throw Error(_(310));
    me = e, e = { memoizedState: me.memoizedState, baseState: me.baseState, baseQueue: me.baseQueue, queue: me.queue, next: null }, ve === null ? ne.memoizedState = ve = e : ve = ve.next = e;
  }
  return ve;
}
function Jr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function oi(e) {
  var t = tt(), n = t.queue;
  if (n === null) throw Error(_(311));
  n.lastRenderedReducer = e;
  var r = me, l = r.baseQueue, o = n.pending;
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
      if ((Nn & g) === g) u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var m = {
          lane: g,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (s = u = m, i = r) : u = u.next = m, ne.lanes |= g, Tn |= g;
      }
      c = c.next;
    } while (c !== null && c !== o);
    u === null ? i = r : u.next = s, ut(r, t.memoizedState) || (Oe = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, ne.lanes |= o, Tn |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ii(e) {
  var t = tt(), n = t.queue;
  if (n === null) throw Error(_(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = l = l.next;
    do
      o = e(o, i.action), i = i.next;
    while (i !== l);
    ut(o, t.memoizedState) || (Oe = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function Fc() {
}
function Ac(e, t) {
  var n = ne, r = tt(), l = t(), o = !ut(r.memoizedState, l);
  if (o && (r.memoizedState = l, Oe = !0), r = r.queue, Fs(Bc.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || ve !== null && ve.memoizedState.tag & 1) {
    if (n.flags |= 2048, Zr(9, $c.bind(null, n, r, l, t), void 0, null), xe === null) throw Error(_(349));
    Nn & 30 || Uc(n, t, l);
  }
  return l;
}
function Uc(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = ne.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ne.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function $c(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Wc(t) && Hc(e);
}
function Bc(e, t, n) {
  return n(function() {
    Wc(t) && Hc(e);
  });
}
function Wc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !ut(e, n);
  } catch (r) {
    return !0;
  }
}
function Hc(e) {
  var t = Dt(e, 1);
  t !== null && st(t, e, 1, -1);
}
function Xu(e) {
  var t = gt();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Jr, lastRenderedState: e }, t.queue = e, e = e.dispatch = Ap.bind(null, ne, e), [t.memoizedState, e];
}
function Zr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = ne.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ne.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Vc() {
  return tt().memoizedState;
}
function $l(e, t, n, r) {
  var l = gt();
  ne.flags |= e, l.memoizedState = Zr(1 | t, n, void 0, r === void 0 ? null : r);
}
function Eo(e, t, n, r) {
  var l = tt();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (me !== null) {
    var i = me.memoizedState;
    if (o = i.destroy, r !== null && Is(r, i.deps)) {
      l.memoizedState = Zr(t, n, o, r);
      return;
    }
  }
  ne.flags |= e, l.memoizedState = Zr(1 | t, n, o, r);
}
function Ku(e, t) {
  return $l(8390656, 8, e, t);
}
function Fs(e, t) {
  return Eo(2048, 8, e, t);
}
function Qc(e, t) {
  return Eo(4, 2, e, t);
}
function Xc(e, t) {
  return Eo(4, 4, e, t);
}
function Kc(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function bc(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Eo(4, 4, Kc.bind(null, t, e), n);
}
function As() {
}
function Yc(e, t) {
  var n = tt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Is(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Gc(e, t) {
  var n = tt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Is(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Jc(e, t, n) {
  return Nn & 21 ? (ut(n, t) || (n = nc(), ne.lanes |= n, Tn |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Oe = !0), e.memoizedState = n);
}
function Op(e, t) {
  var n = Q;
  Q = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = li.transition;
  li.transition = {};
  try {
    e(!1), t();
  } finally {
    Q = n, li.transition = r;
  }
}
function Zc() {
  return tt().memoizedState;
}
function Fp(e, t, n) {
  var r = tn(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, qc(e)) ef(t, n);
  else if (n = Ic(e, t, n, r), n !== null) {
    var l = Re();
    st(n, e, r, l), tf(n, t, r);
  }
}
function Ap(e, t, n) {
  var r = tn(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (qc(e)) ef(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, s = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = s, ut(s, i)) {
        var u = t.interleaved;
        u === null ? (l.next = l, zs(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch (c) {
    } finally {
    }
    n = Ic(e, t, l, r), n !== null && (l = Re(), st(n, e, r, l), tf(n, t, r));
  }
}
function qc(e) {
  var t = e.alternate;
  return e === ne || t !== null && t === ne;
}
function ef(e, t) {
  Mr = uo = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function tf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ms(e, n);
  }
}
var ao = { readContext: et, useCallback: _e, useContext: _e, useEffect: _e, useImperativeHandle: _e, useInsertionEffect: _e, useLayoutEffect: _e, useMemo: _e, useReducer: _e, useRef: _e, useState: _e, useDebugValue: _e, useDeferredValue: _e, useTransition: _e, useMutableSource: _e, useSyncExternalStore: _e, useId: _e, unstable_isNewReconciler: !1 }, Up = { readContext: et, useCallback: function(e, t) {
  return gt().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: et, useEffect: Ku, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, $l(
    4194308,
    4,
    Kc.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return $l(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return $l(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = gt();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = gt();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Fp.bind(null, ne, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = gt();
  return e = { current: e }, t.memoizedState = e;
}, useState: Xu, useDebugValue: As, useDeferredValue: function(e) {
  return gt().memoizedState = e;
}, useTransition: function() {
  var e = Xu(!1), t = e[0];
  return e = Op.bind(null, e[1]), gt().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = ne, l = gt();
  if (ee) {
    if (n === void 0) throw Error(_(407));
    n = n();
  } else {
    if (n = t(), xe === null) throw Error(_(349));
    Nn & 30 || Uc(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Ku(Bc.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, Zr(9, $c.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = gt(), t = xe.identifierPrefix;
  if (ee) {
    var n = Lt, r = Pt;
    n = (r & ~(1 << 32 - it(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Gr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Dp++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, $p = {
  readContext: et,
  useCallback: Yc,
  useContext: et,
  useEffect: Fs,
  useImperativeHandle: bc,
  useInsertionEffect: Qc,
  useLayoutEffect: Xc,
  useMemo: Gc,
  useReducer: oi,
  useRef: Vc,
  useState: function() {
    return oi(Jr);
  },
  useDebugValue: As,
  useDeferredValue: function(e) {
    var t = tt();
    return Jc(t, me.memoizedState, e);
  },
  useTransition: function() {
    var e = oi(Jr)[0], t = tt().memoizedState;
    return [e, t];
  },
  useMutableSource: Fc,
  useSyncExternalStore: Ac,
  useId: Zc,
  unstable_isNewReconciler: !1
}, Bp = { readContext: et, useCallback: Yc, useContext: et, useEffect: Fs, useImperativeHandle: bc, useInsertionEffect: Qc, useLayoutEffect: Xc, useMemo: Gc, useReducer: ii, useRef: Vc, useState: function() {
  return ii(Jr);
}, useDebugValue: As, useDeferredValue: function(e) {
  var t = tt();
  return me === null ? t.memoizedState = e : Jc(t, me.memoizedState, e);
}, useTransition: function() {
  var e = ii(Jr)[0], t = tt().memoizedState;
  return [e, t];
}, useMutableSource: Fc, useSyncExternalStore: Ac, useId: Zc, unstable_isNewReconciler: !1 };
function rt(e, t) {
  if (e && e.defaultProps) {
    t = re({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Bi(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : re({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Co = { isMounted: function(e) {
  return (e = e._reactInternals) ? Pn(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = Re(), l = tn(e), o = Rt(r, l);
  o.payload = t, n != null && (o.callback = n), t = qt(e, o, l), t !== null && (st(t, e, l, r), Al(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = Re(), l = tn(e), o = Rt(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = qt(e, o, l), t !== null && (st(t, e, l, r), Al(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Re(), r = tn(e), l = Rt(n, r);
  l.tag = 2, t != null && (l.callback = t), t = qt(e, l, r), t !== null && (st(t, e, r, n), Al(t, e, r));
} };
function bu(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !Vr(n, r) || !Vr(l, o) : !0;
}
function nf(e, t, n) {
  var r = !1, l = ln, o = t.contextType;
  return typeof o == "object" && o !== null ? o = et(o) : (l = Ae(t) ? Cn : je.current, r = t.contextTypes, o = (r = r != null) ? nr(e, l) : ln), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Co, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Yu(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Co.enqueueReplaceState(t, t.state, null);
}
function Wi(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Ps(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = et(o) : (o = Ae(t) ? Cn : je.current, l.context = nr(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Bi(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && Co.enqueueReplaceState(l, l.state, null), io(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function ir(e, t) {
  try {
    var n = "", r = t;
    do
      n += md(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function si(e, t, n) {
  return { value: e, source: null, stack: n != null ? n : null, digest: t != null ? t : null };
}
function Hi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Wp = typeof WeakMap == "function" ? WeakMap : Map;
function rf(e, t, n) {
  n = Rt(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    fo || (fo = !0, qi = r), Hi(e, t);
  }, n;
}
function lf(e, t, n) {
  n = Rt(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Hi(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Hi(e, t), typeof r != "function" && (en === null ? en = /* @__PURE__ */ new Set([this]) : en.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function Gu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Wp();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = n0.bind(null, e, t, n), t.then(e, e));
}
function Ju(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Zu(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Rt(-1, 1), t.tag = 2, qt(n, t, 1))), n.lanes |= 1), e);
}
var Hp = Ft.ReactCurrentOwner, Oe = !1;
function Le(e, t, n, r) {
  t.child = e === null ? Mc(t, null, n, r) : lr(t, e.child, n, r);
}
function qu(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return qn(t, l), r = Ds(e, t, n, r, o, l), n = Os(), e !== null && !Oe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Ot(e, t, l)) : (ee && n && Es(t), t.flags |= 1, Le(e, t, r, l), t.child);
}
function ea(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Xs(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, of(e, t, o, r, l)) : (e = Vl(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Vr, n(i, r) && e.ref === t.ref) return Ot(e, t, l);
  }
  return t.flags |= 1, e = nn(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function of(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Vr(o, r) && e.ref === t.ref) if (Oe = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Oe = !0);
    else return t.lanes = e.lanes, Ot(e, t, l);
  }
  return Vi(e, t, n, r, l);
}
function sf(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, b(bn, We), We |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, b(bn, We), We |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, b(bn, We), We |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, b(bn, We), We |= r;
  return Le(e, t, l, n), t.child;
}
function uf(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Vi(e, t, n, r, l) {
  var o = Ae(n) ? Cn : je.current;
  return o = nr(t, o), qn(t, l), n = Ds(e, t, n, r, o, l), r = Os(), e !== null && !Oe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Ot(e, t, l)) : (ee && r && Es(t), t.flags |= 1, Le(e, t, n, l), t.child);
}
function ta(e, t, n, r, l) {
  if (Ae(n)) {
    var o = !0;
    to(t);
  } else o = !1;
  if (qn(t, l), t.stateNode === null) Bl(e, t), nf(t, n, r), Wi(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, s = t.memoizedProps;
    i.props = s;
    var u = i.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = et(c) : (c = Ae(n) ? Cn : je.current, c = nr(t, c));
    var g = n.getDerivedStateFromProps, m = typeof g == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    m || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== r || u !== c) && Yu(t, i, r, c), Vt = !1;
    var h = t.memoizedState;
    i.state = h, io(t, r, i, l), u = t.memoizedState, s !== r || h !== u || Fe.current || Vt ? (typeof g == "function" && (Bi(t, n, g, r), u = t.memoizedState), (s = Vt || bu(t, n, s, r, h, u, c)) ? (m || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), i.props = r, i.state = u, i.context = c, r = s) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, Dc(e, t), s = t.memoizedProps, c = t.type === t.elementType ? s : rt(t.type, s), i.props = c, m = t.pendingProps, h = i.context, u = n.contextType, typeof u == "object" && u !== null ? u = et(u) : (u = Ae(n) ? Cn : je.current, u = nr(t, u));
    var w = n.getDerivedStateFromProps;
    (g = typeof w == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== m || h !== u) && Yu(t, i, r, u), Vt = !1, h = t.memoizedState, i.state = h, io(t, r, i, l);
    var k = t.memoizedState;
    s !== m || h !== k || Fe.current || Vt ? (typeof w == "function" && (Bi(t, n, w, r), k = t.memoizedState), (c = Vt || bu(t, n, c, r, h, k, u) || !1) ? (g || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, k, u), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, k, u)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = k), i.props = r, i.state = k, i.context = u, r = c) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Qi(e, t, n, r, o, l);
}
function Qi(e, t, n, r, l, o) {
  uf(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && $u(t, n, !1), Ot(e, t, o);
  r = t.stateNode, Hp.current = t;
  var s = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = lr(t, e.child, null, o), t.child = lr(t, null, s, o)) : Le(e, t, s, o), t.memoizedState = r.state, l && $u(t, n, !0), t.child;
}
function af(e) {
  var t = e.stateNode;
  t.pendingContext ? Uu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Uu(e, t.context, !1), Ls(e, t.containerInfo);
}
function na(e, t, n, r, l) {
  return rr(), _s(l), t.flags |= 256, Le(e, t, n, r), t.child;
}
var Xi = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ki(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function cf(e, t, n) {
  var r = t.pendingProps, l = te.current, o = !1, i = (t.flags & 128) !== 0, s;
  if ((s = i) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), s ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), b(te, l & 1), e === null)
    return Ui(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = To(i, r, 0, null), e = En(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Ki(n), t.memoizedState = Xi, e) : Us(t, i));
  if (l = e.memoizedState, l !== null && (s = l.dehydrated, s !== null)) return Vp(e, t, i, r, s, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, s = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = nn(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), s !== null ? o = nn(s, o) : (o = En(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? Ki(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = Xi, r;
  }
  return o = e.child, e = o.sibling, r = nn(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Us(e, t) {
  return t = To({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function zl(e, t, n, r) {
  return r !== null && _s(r), lr(t, e.child, null, n), e = Us(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Vp(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = si(Error(_(422))), zl(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = To({ mode: "visible", children: r.children }, l, 0, null), o = En(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && lr(t, e.child, null, i), t.child.memoizedState = Ki(i), t.memoizedState = Xi, o);
  if (!(t.mode & 1)) return zl(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var s = r.dgst;
    return r = s, o = Error(_(419)), r = si(o, r, void 0), zl(e, t, i, r);
  }
  if (s = (i & e.childLanes) !== 0, Oe || s) {
    if (r = xe, r !== null) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Dt(e, l), st(r, e, l, -1));
    }
    return Qs(), r = si(Error(_(421))), zl(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = r0.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, He = Zt(l.nextSibling), Ve = t, ee = !0, ot = null, e !== null && (Ge[Je++] = Pt, Ge[Je++] = Lt, Ge[Je++] = _n, Pt = e.id, Lt = e.overflow, _n = t), t = Us(t, r.children), t.flags |= 4096, t);
}
function ra(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), $i(e.return, t, n);
}
function ui(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function ff(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (Le(e, t, r.children, n), r = te.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && ra(e, n, t);
      else if (e.tag === 19) ra(e, n, t);
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
  if (b(te, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && so(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), ui(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && so(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      ui(t, !0, n, null, o);
      break;
    case "together":
      ui(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Bl(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Ot(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Tn |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(_(153));
  if (t.child !== null) {
    for (e = t.child, n = nn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = nn(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Qp(e, t, n) {
  switch (t.tag) {
    case 3:
      af(t), rr();
      break;
    case 5:
      Oc(t);
      break;
    case 1:
      Ae(t.type) && to(t);
      break;
    case 4:
      Ls(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      b(lo, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (b(te, te.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? cf(e, t, n) : (b(te, te.current & 1), e = Ot(e, t, n), e !== null ? e.sibling : null);
      b(te, te.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return ff(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), b(te, te.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, sf(e, t, n);
  }
  return Ot(e, t, n);
}
var df, bi, pf, hf;
df = function(e, t) {
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
bi = function() {
};
pf = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Sn(xt.current);
    var o = null;
    switch (n) {
      case "input":
        l = gi(e, l), r = gi(e, r), o = [];
        break;
      case "select":
        l = re({}, l, { value: void 0 }), r = re({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = xi(e, l), r = xi(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = ql);
    }
    Si(n, r);
    var i;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var s = l[c];
      for (i in s) s.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Fr.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (s = l != null ? l[c] : void 0, r.hasOwnProperty(c) && u !== s && (u != null || s != null)) if (c === "style") if (s) {
        for (i in s) !s.hasOwnProperty(i) || u && u.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in u) u.hasOwnProperty(i) && s[i] !== u[i] && (n || (n = {}), n[i] = u[i]);
      } else n || (o || (o = []), o.push(
        c,
        n
      )), n = u;
      else c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, s = s ? s.__html : void 0, u != null && s !== u && (o = o || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Fr.hasOwnProperty(c) ? (u != null && c === "onScroll" && J("scroll", e), o || s === u || (o = [])) : (o = o || []).push(c, u));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
hf = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function kr(e, t) {
  if (!ee) switch (e.tailMode) {
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
function Ne(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Xp(e, t, n) {
  var r = t.pendingProps;
  switch (Cs(t), t.tag) {
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
      return Ne(t), null;
    case 1:
      return Ae(t.type) && eo(), Ne(t), null;
    case 3:
      return r = t.stateNode, or(), Z(Fe), Z(je), Ms(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Tl(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ot !== null && (ns(ot), ot = null))), bi(e, t), Ne(t), null;
    case 5:
      Rs(t);
      var l = Sn(Yr.current);
      if (n = t.type, e !== null && t.stateNode != null) pf(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(_(166));
          return Ne(t), null;
        }
        if (e = Sn(xt.current), Tl(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[yt] = t, r[Kr] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              J("cancel", r), J("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              J("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Tr.length; l++) J(Tr[l], r);
              break;
            case "source":
              J("error", r);
              break;
            case "img":
            case "image":
            case "link":
              J(
                "error",
                r
              ), J("load", r);
              break;
            case "details":
              J("toggle", r);
              break;
            case "input":
              du(r, o), J("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, J("invalid", r);
              break;
            case "textarea":
              hu(r, o), J("invalid", r);
          }
          Si(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var s = o[i];
            i === "children" ? typeof s == "string" ? r.textContent !== s && (o.suppressHydrationWarning !== !0 && Nl(r.textContent, s, e), l = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (o.suppressHydrationWarning !== !0 && Nl(
              r.textContent,
              s,
              e
            ), l = ["children", "" + s]) : Fr.hasOwnProperty(i) && s != null && i === "onScroll" && J("scroll", r);
          }
          switch (n) {
            case "input":
              vl(r), pu(r, o, !0);
              break;
            case "textarea":
              vl(r), mu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = ql);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ba(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[yt] = t, e[Kr] = r, df(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = ki(n, r), n) {
              case "dialog":
                J("cancel", e), J("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                J("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Tr.length; l++) J(Tr[l], e);
                l = r;
                break;
              case "source":
                J("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                J(
                  "error",
                  e
                ), J("load", e), l = r;
                break;
              case "details":
                J("toggle", e), l = r;
                break;
              case "input":
                du(e, r), l = gi(e, r), J("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = re({}, r, { value: void 0 }), J("invalid", e);
                break;
              case "textarea":
                hu(e, r), l = xi(e, r), J("invalid", e);
                break;
              default:
                l = r;
            }
            Si(n, l), s = l;
            for (o in s) if (s.hasOwnProperty(o)) {
              var u = s[o];
              o === "style" ? Va(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Wa(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Ar(e, u) : typeof u == "number" && Ar(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Fr.hasOwnProperty(o) ? u != null && o === "onScroll" && J("scroll", e) : u != null && as(e, o, u, i));
            }
            switch (n) {
              case "input":
                vl(e), pu(e, r, !1);
                break;
              case "textarea":
                vl(e), mu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + rn(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? Yn(e, !!r.multiple, o, !1) : r.defaultValue != null && Yn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = ql);
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
      return Ne(t), null;
    case 6:
      if (e && t.stateNode != null) hf(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(_(166));
        if (n = Sn(Yr.current), Sn(xt.current), Tl(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[yt] = t, (o = r.nodeValue !== n) && (e = Ve, e !== null)) switch (e.tag) {
            case 3:
              Nl(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Nl(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[yt] = t, t.stateNode = r;
      }
      return Ne(t), null;
    case 13:
      if (Z(te), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (ee && He !== null && t.mode & 1 && !(t.flags & 128)) Lc(), rr(), t.flags |= 98560, o = !1;
        else if (o = Tl(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(_(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(_(317));
            o[yt] = t;
          } else rr(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          Ne(t), o = !1;
        } else ot !== null && (ns(ot), ot = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || te.current & 1 ? ge === 0 && (ge = 3) : Qs())), t.updateQueue !== null && (t.flags |= 4), Ne(t), null);
    case 4:
      return or(), bi(e, t), e === null && Qr(t.stateNode.containerInfo), Ne(t), null;
    case 10:
      return js(t.type._context), Ne(t), null;
    case 17:
      return Ae(t.type) && eo(), Ne(t), null;
    case 19:
      if (Z(te), o = t.memoizedState, o === null) return Ne(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) kr(o, !1);
      else {
        if (ge !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = so(e), i !== null) {
            for (t.flags |= 128, kr(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return b(te, te.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && ae() > sr && (t.flags |= 128, r = !0, kr(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = so(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), kr(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !ee) return Ne(t), null;
        } else 2 * ae() - o.renderingStartTime > sr && n !== 1073741824 && (t.flags |= 128, r = !0, kr(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = ae(), t.sibling = null, n = te.current, b(te, r ? n & 1 | 2 : n & 1), t) : (Ne(t), null);
    case 22:
    case 23:
      return Vs(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? We & 1073741824 && (Ne(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ne(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(_(156, t.tag));
}
function Kp(e, t) {
  switch (Cs(t), t.tag) {
    case 1:
      return Ae(t.type) && eo(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return or(), Z(Fe), Z(je), Ms(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Rs(t), null;
    case 13:
      if (Z(te), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(_(340));
        rr();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Z(te), null;
    case 4:
      return or(), null;
    case 10:
      return js(t.type._context), null;
    case 22:
    case 23:
      return Vs(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Pl = !1, Te = !1, bp = typeof WeakSet == "function" ? WeakSet : Set, L = null;
function Kn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    ie(e, t, r);
  }
  else n.current = null;
}
function Yi(e, t, n) {
  try {
    n();
  } catch (r) {
    ie(e, t, r);
  }
}
var la = !1;
function Yp(e, t) {
  if (Ri = Gl, e = vc(), ks(e)) {
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
        var i = 0, s = -1, u = -1, c = 0, g = 0, m = e, h = null;
        t: for (; ; ) {
          for (var w; m !== n || l !== 0 && m.nodeType !== 3 || (s = i + l), m !== o || r !== 0 && m.nodeType !== 3 || (u = i + r), m.nodeType === 3 && (i += m.nodeValue.length), (w = m.firstChild) !== null; )
            h = m, m = w;
          for (; ; ) {
            if (m === e) break t;
            if (h === n && ++c === l && (s = i), h === o && ++g === r && (u = i), (w = m.nextSibling) !== null) break;
            m = h, h = m.parentNode;
          }
          m = w;
        }
        n = s === -1 || u === -1 ? null : { start: s, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Mi = { focusedElem: e, selectionRange: n }, Gl = !1, L = t; L !== null; ) if (t = L, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, L = e;
  else for (; L !== null; ) {
    t = L;
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
          throw Error(_(163));
      }
    } catch (v) {
      ie(t, t.return, v);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, L = e;
      break;
    }
    L = t.return;
  }
  return k = la, la = !1, k;
}
function Ir(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && Yi(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function _o(e, t) {
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
function Gi(e) {
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
function mf(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, mf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[yt], delete t[Kr], delete t[Oi], delete t[Lp], delete t[Rp])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function gf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function oa(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || gf(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Ji(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ql));
  else if (r !== 4 && (e = e.child, e !== null)) for (Ji(e, t, n), e = e.sibling; e !== null; ) Ji(e, t, n), e = e.sibling;
}
function Zi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Zi(e, t, n), e = e.sibling; e !== null; ) Zi(e, t, n), e = e.sibling;
}
var we = null, lt = !1;
function Wt(e, t, n) {
  for (n = n.child; n !== null; ) yf(e, t, n), n = n.sibling;
}
function yf(e, t, n) {
  if (vt && typeof vt.onCommitFiberUnmount == "function") try {
    vt.onCommitFiberUnmount(yo, n);
  } catch (s) {
  }
  switch (n.tag) {
    case 5:
      Te || Kn(n, t);
    case 6:
      var r = we, l = lt;
      we = null, Wt(e, t, n), we = r, lt = l, we !== null && (lt ? (e = we, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : we.removeChild(n.stateNode));
      break;
    case 18:
      we !== null && (lt ? (e = we, n = n.stateNode, e.nodeType === 8 ? ti(e.parentNode, n) : e.nodeType === 1 && ti(e, n), Wr(e)) : ti(we, n.stateNode));
      break;
    case 4:
      r = we, l = lt, we = n.stateNode.containerInfo, lt = !0, Wt(e, t, n), we = r, lt = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Te && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && Yi(n, t, i), l = l.next;
        } while (l !== r);
      }
      Wt(e, t, n);
      break;
    case 1:
      if (!Te && (Kn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (s) {
        ie(n, t, s);
      }
      Wt(e, t, n);
      break;
    case 21:
      Wt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (Te = (r = Te) || n.memoizedState !== null, Wt(e, t, n), Te = r) : Wt(e, t, n);
      break;
    default:
      Wt(e, t, n);
  }
}
function ia(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new bp()), t.forEach(function(r) {
      var l = l0.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function nt(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, i = t, s = i;
      e: for (; s !== null; ) {
        switch (s.tag) {
          case 5:
            we = s.stateNode, lt = !1;
            break e;
          case 3:
            we = s.stateNode.containerInfo, lt = !0;
            break e;
          case 4:
            we = s.stateNode.containerInfo, lt = !0;
            break e;
        }
        s = s.return;
      }
      if (we === null) throw Error(_(160));
      yf(o, i, l), we = null, lt = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (c) {
      ie(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) vf(t, e), t = t.sibling;
}
function vf(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (nt(t, e), mt(e), r & 4) {
        try {
          Ir(3, e, e.return), _o(3, e);
        } catch (y) {
          ie(e, e.return, y);
        }
        try {
          Ir(5, e, e.return);
        } catch (y) {
          ie(e, e.return, y);
        }
      }
      break;
    case 1:
      nt(t, e), mt(e), r & 512 && n !== null && Kn(n, n.return);
      break;
    case 5:
      if (nt(t, e), mt(e), r & 512 && n !== null && Kn(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Ar(l, "");
        } catch (y) {
          ie(e, e.return, y);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, s = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          s === "input" && o.type === "radio" && o.name != null && Ua(l, o), ki(s, i);
          var c = ki(s, o);
          for (i = 0; i < u.length; i += 2) {
            var g = u[i], m = u[i + 1];
            g === "style" ? Va(l, m) : g === "dangerouslySetInnerHTML" ? Wa(l, m) : g === "children" ? Ar(l, m) : as(l, g, m, c);
          }
          switch (s) {
            case "input":
              yi(l, o);
              break;
            case "textarea":
              $a(l, o);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var w = o.value;
              w != null ? Yn(l, !!o.multiple, w, !1) : h !== !!o.multiple && (o.defaultValue != null ? Yn(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : Yn(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[Kr] = o;
        } catch (y) {
          ie(e, e.return, y);
        }
      }
      break;
    case 6:
      if (nt(t, e), mt(e), r & 4) {
        if (e.stateNode === null) throw Error(_(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (y) {
          ie(e, e.return, y);
        }
      }
      break;
    case 3:
      if (nt(t, e), mt(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Wr(t.containerInfo);
      } catch (y) {
        ie(e, e.return, y);
      }
      break;
    case 4:
      nt(t, e), mt(e);
      break;
    case 13:
      nt(t, e), mt(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Ws = ae())), r & 4 && ia(e);
      break;
    case 22:
      if (g = n !== null && n.memoizedState !== null, e.mode & 1 ? (Te = (c = Te) || g, nt(t, e), Te = c) : nt(t, e), mt(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !g && e.mode & 1) for (L = e, g = e.child; g !== null; ) {
          for (m = L = g; L !== null; ) {
            switch (h = L, w = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Ir(4, h, h.return);
                break;
              case 1:
                Kn(h, h.return);
                var k = h.stateNode;
                if (typeof k.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, k.props = t.memoizedProps, k.state = t.memoizedState, k.componentWillUnmount();
                  } catch (y) {
                    ie(r, n, y);
                  }
                }
                break;
              case 5:
                Kn(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  ua(m);
                  continue;
                }
            }
            w !== null ? (w.return = h, L = w) : ua(m);
          }
          g = g.sibling;
        }
        e: for (g = null, m = e; ; ) {
          if (m.tag === 5) {
            if (g === null) {
              g = m;
              try {
                l = m.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (s = m.stateNode, u = m.memoizedProps.style, i = u != null && u.hasOwnProperty("display") ? u.display : null, s.style.display = Ha("display", i));
              } catch (y) {
                ie(e, e.return, y);
              }
            }
          } else if (m.tag === 6) {
            if (g === null) try {
              m.stateNode.nodeValue = c ? "" : m.memoizedProps;
            } catch (y) {
              ie(e, e.return, y);
            }
          } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
            m.child.return = m, m = m.child;
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            g === m && (g = null), m = m.return;
          }
          g === m && (g = null), m.sibling.return = m.return, m = m.sibling;
        }
      }
      break;
    case 19:
      nt(t, e), mt(e), r & 4 && ia(e);
      break;
    case 21:
      break;
    default:
      nt(
        t,
        e
      ), mt(e);
  }
}
function mt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (gf(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(_(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Ar(l, ""), r.flags &= -33);
          var o = oa(e);
          Zi(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, s = oa(e);
          Ji(e, s, i);
          break;
        default:
          throw Error(_(161));
      }
    } catch (u) {
      ie(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Gp(e, t, n) {
  L = e, xf(e);
}
function xf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; L !== null; ) {
    var l = L, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Pl;
      if (!i) {
        var s = l.alternate, u = s !== null && s.memoizedState !== null || Te;
        s = Pl;
        var c = Te;
        if (Pl = i, (Te = u) && !c) for (L = l; L !== null; ) i = L, u = i.child, i.tag === 22 && i.memoizedState !== null ? aa(l) : u !== null ? (u.return = i, L = u) : aa(l);
        for (; o !== null; ) L = o, xf(o), o = o.sibling;
        L = l, Pl = s, Te = c;
      }
      sa(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, L = o) : sa(e);
  }
}
function sa(e) {
  for (; L !== null; ) {
    var t = L;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            Te || _o(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !Te) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : rt(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Qu(t, o, r);
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
              Qu(t, i, n);
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
                  var m = g.dehydrated;
                  m !== null && Wr(m);
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
            throw Error(_(163));
        }
        Te || t.flags & 512 && Gi(t);
      } catch (h) {
        ie(t, t.return, h);
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
function ua(e) {
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
function aa(e) {
  for (; L !== null; ) {
    var t = L;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            _o(4, t);
          } catch (u) {
            ie(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              ie(t, l, u);
            }
          }
          var o = t.return;
          try {
            Gi(t);
          } catch (u) {
            ie(t, o, u);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Gi(t);
          } catch (u) {
            ie(t, i, u);
          }
      }
    } catch (u) {
      ie(t, t.return, u);
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
var Jp = Math.ceil, co = Ft.ReactCurrentDispatcher, $s = Ft.ReactCurrentOwner, qe = Ft.ReactCurrentBatchConfig, W = 0, xe = null, pe = null, Se = 0, We = 0, bn = sn(0), ge = 0, qr = null, Tn = 0, No = 0, Bs = 0, Dr = null, De = null, Ws = 0, sr = 1 / 0, Tt = null, fo = !1, qi = null, en = null, Ll = !1, bt = null, po = 0, Or = 0, es = null, Wl = -1, Hl = 0;
function Re() {
  return W & 6 ? ae() : Wl !== -1 ? Wl : Wl = ae();
}
function tn(e) {
  return e.mode & 1 ? W & 2 && Se !== 0 ? Se & -Se : Ip.transition !== null ? (Hl === 0 && (Hl = nc()), Hl) : (e = Q, e !== 0 || (e = window.event, e = e === void 0 ? 16 : ac(e.type)), e) : 1;
}
function st(e, t, n, r) {
  if (50 < Or) throw Or = 0, es = null, Error(_(185));
  tl(e, n, r), (!(W & 2) || e !== xe) && (e === xe && (!(W & 2) && (No |= n), ge === 4 && Xt(e, Se)), Ue(e, r), n === 1 && W === 0 && !(t.mode & 1) && (sr = ae() + 500, ko && un()));
}
function Ue(e, t) {
  var n = e.callbackNode;
  Id(e, t);
  var r = Yl(e, e === xe ? Se : 0);
  if (r === 0) n !== null && vu(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && vu(n), t === 1) e.tag === 0 ? Mp(ca.bind(null, e)) : jc(ca.bind(null, e)), zp(function() {
      !(W & 6) && un();
    }), n = null;
    else {
      switch (rc(r)) {
        case 1:
          n = hs;
          break;
        case 4:
          n = ec;
          break;
        case 16:
          n = bl;
          break;
        case 536870912:
          n = tc;
          break;
        default:
          n = bl;
      }
      n = Tf(n, wf.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function wf(e, t) {
  if (Wl = -1, Hl = 0, W & 6) throw Error(_(327));
  var n = e.callbackNode;
  if (er() && e.callbackNode !== n) return null;
  var r = Yl(e, e === xe ? Se : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ho(e, r);
  else {
    t = r;
    var l = W;
    W |= 2;
    var o = kf();
    (xe !== e || Se !== t) && (Tt = null, sr = ae() + 500, kn(e, t));
    do
      try {
        e0();
        break;
      } catch (s) {
        Sf(e, s);
      }
    while (!0);
    Ts(), co.current = o, W = l, pe !== null ? t = 0 : (xe = null, Se = 0, t = ge);
  }
  if (t !== 0) {
    if (t === 2 && (l = Ti(e), l !== 0 && (r = l, t = ts(e, l))), t === 1) throw n = qr, kn(e, 0), Xt(e, r), Ue(e, ae()), n;
    if (t === 6) Xt(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Zp(l) && (t = ho(e, r), t === 2 && (o = Ti(e), o !== 0 && (r = o, t = ts(e, o))), t === 1)) throw n = qr, kn(e, 0), Xt(e, r), Ue(e, ae()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(_(345));
        case 2:
          vn(e, De, Tt);
          break;
        case 3:
          if (Xt(e, r), (r & 130023424) === r && (t = Ws + 500 - ae(), 10 < t)) {
            if (Yl(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              Re(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Di(vn.bind(null, e, De, Tt), t);
            break;
          }
          vn(e, De, Tt);
          break;
        case 4:
          if (Xt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - it(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = ae() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Jp(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Di(vn.bind(null, e, De, Tt), r);
            break;
          }
          vn(e, De, Tt);
          break;
        case 5:
          vn(e, De, Tt);
          break;
        default:
          throw Error(_(329));
      }
    }
  }
  return Ue(e, ae()), e.callbackNode === n ? wf.bind(null, e) : null;
}
function ts(e, t) {
  var n = Dr;
  return e.current.memoizedState.isDehydrated && (kn(e, t).flags |= 256), e = ho(e, t), e !== 2 && (t = De, De = n, t !== null && ns(t)), e;
}
function ns(e) {
  De === null ? De = e : De.push.apply(De, e);
}
function Zp(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!ut(o(), l)) return !1;
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
function Xt(e, t) {
  for (t &= ~Bs, t &= ~No, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - it(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function ca(e) {
  if (W & 6) throw Error(_(327));
  er();
  var t = Yl(e, 0);
  if (!(t & 1)) return Ue(e, ae()), null;
  var n = ho(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ti(e);
    r !== 0 && (t = r, n = ts(e, r));
  }
  if (n === 1) throw n = qr, kn(e, 0), Xt(e, t), Ue(e, ae()), n;
  if (n === 6) throw Error(_(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, vn(e, De, Tt), Ue(e, ae()), null;
}
function Hs(e, t) {
  var n = W;
  W |= 1;
  try {
    return e(t);
  } finally {
    W = n, W === 0 && (sr = ae() + 500, ko && un());
  }
}
function jn(e) {
  bt !== null && bt.tag === 0 && !(W & 6) && er();
  var t = W;
  W |= 1;
  var n = qe.transition, r = Q;
  try {
    if (qe.transition = null, Q = 1, e) return e();
  } finally {
    Q = r, qe.transition = n, W = t, !(W & 6) && un();
  }
}
function Vs() {
  We = bn.current, Z(bn);
}
function kn(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, jp(n)), pe !== null) for (n = pe.return; n !== null; ) {
    var r = n;
    switch (Cs(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && eo();
        break;
      case 3:
        or(), Z(Fe), Z(je), Ms();
        break;
      case 5:
        Rs(r);
        break;
      case 4:
        or();
        break;
      case 13:
        Z(te);
        break;
      case 19:
        Z(te);
        break;
      case 10:
        js(r.type._context);
        break;
      case 22:
      case 23:
        Vs();
    }
    n = n.return;
  }
  if (xe = e, pe = e = nn(e.current, null), Se = We = t, ge = 0, qr = null, Bs = No = Tn = 0, De = Dr = null, wn !== null) {
    for (t = 0; t < wn.length; t++) if (n = wn[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var i = o.next;
        o.next = l, r.next = i;
      }
      n.pending = r;
    }
    wn = null;
  }
  return e;
}
function Sf(e, t) {
  do {
    var n = pe;
    try {
      if (Ts(), Ul.current = ao, uo) {
        for (var r = ne.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        uo = !1;
      }
      if (Nn = 0, ve = me = ne = null, Mr = !1, Gr = 0, $s.current = null, n === null || n.return === null) {
        ge = 1, qr = t, pe = null;
        break;
      }
      e: {
        var o = e, i = n.return, s = n, u = t;
        if (t = Se, s.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, g = s, m = g.tag;
          if (!(g.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var h = g.alternate;
            h ? (g.updateQueue = h.updateQueue, g.memoizedState = h.memoizedState, g.lanes = h.lanes) : (g.updateQueue = null, g.memoizedState = null);
          }
          var w = Ju(i);
          if (w !== null) {
            w.flags &= -257, Zu(w, i, s, o, t), w.mode & 1 && Gu(o, c, t), t = w, u = c;
            var k = t.updateQueue;
            if (k === null) {
              var y = /* @__PURE__ */ new Set();
              y.add(u), t.updateQueue = y;
            } else k.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Gu(o, c, t), Qs();
              break e;
            }
            u = Error(_(426));
          }
        } else if (ee && s.mode & 1) {
          var D = Ju(i);
          if (D !== null) {
            !(D.flags & 65536) && (D.flags |= 256), Zu(D, i, s, o, t), _s(ir(u, s));
            break e;
          }
        }
        o = u = ir(u, s), ge !== 4 && (ge = 2), Dr === null ? Dr = [o] : Dr.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var f = rf(o, u, t);
              Vu(o, f);
              break e;
            case 1:
              s = u;
              var a = o.type, d = o.stateNode;
              if (!(o.flags & 128) && (typeof a.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (en === null || !en.has(d)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var v = lf(o, s, t);
                Vu(o, v);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Cf(n);
    } catch (C) {
      t = C, pe === n && n !== null && (pe = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function kf() {
  var e = co.current;
  return co.current = ao, e === null ? ao : e;
}
function Qs() {
  (ge === 0 || ge === 3 || ge === 2) && (ge = 4), xe === null || !(Tn & 268435455) && !(No & 268435455) || Xt(xe, Se);
}
function ho(e, t) {
  var n = W;
  W |= 2;
  var r = kf();
  (xe !== e || Se !== t) && (Tt = null, kn(e, t));
  do
    try {
      qp();
      break;
    } catch (l) {
      Sf(e, l);
    }
  while (!0);
  if (Ts(), W = n, co.current = r, pe !== null) throw Error(_(261));
  return xe = null, Se = 0, ge;
}
function qp() {
  for (; pe !== null; ) Ef(pe);
}
function e0() {
  for (; pe !== null && !_d(); ) Ef(pe);
}
function Ef(e) {
  var t = Nf(e.alternate, e, We);
  e.memoizedProps = e.pendingProps, t === null ? Cf(e) : pe = t, $s.current = null;
}
function Cf(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Kp(n, t), n !== null) {
        n.flags &= 32767, pe = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ge = 6, pe = null;
        return;
      }
    } else if (n = Xp(n, t, We), n !== null) {
      pe = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      pe = t;
      return;
    }
    pe = t = e;
  } while (t !== null);
  ge === 0 && (ge = 5);
}
function vn(e, t, n) {
  var r = Q, l = qe.transition;
  try {
    qe.transition = null, Q = 1, t0(e, t, n, r);
  } finally {
    qe.transition = l, Q = r;
  }
  return null;
}
function t0(e, t, n, r) {
  do
    er();
  while (bt !== null);
  if (W & 6) throw Error(_(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(_(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Dd(e, o), e === xe && (pe = xe = null, Se = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Ll || (Ll = !0, Tf(bl, function() {
    return er(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = qe.transition, qe.transition = null;
    var i = Q;
    Q = 1;
    var s = W;
    W |= 4, $s.current = null, Yp(e, n), vf(n, e), Sp(Mi), Gl = !!Ri, Mi = Ri = null, e.current = n, Gp(n), Nd(), W = s, Q = i, qe.transition = o;
  } else e.current = n;
  if (Ll && (Ll = !1, bt = e, po = l), o = e.pendingLanes, o === 0 && (en = null), zd(n.stateNode), Ue(e, ae()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (fo) throw fo = !1, e = qi, qi = null, e;
  return po & 1 && e.tag !== 0 && er(), o = e.pendingLanes, o & 1 ? e === es ? Or++ : (Or = 0, es = e) : Or = 0, un(), null;
}
function er() {
  if (bt !== null) {
    var e = rc(po), t = qe.transition, n = Q;
    try {
      if (qe.transition = null, Q = 16 > e ? 16 : e, bt === null) var r = !1;
      else {
        if (e = bt, bt = null, po = 0, W & 6) throw Error(_(331));
        var l = W;
        for (W |= 4, L = e.current; L !== null; ) {
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
                      Ir(8, g, o);
                  }
                  var m = g.child;
                  if (m !== null) m.return = g, L = m;
                  else for (; L !== null; ) {
                    g = L;
                    var h = g.sibling, w = g.return;
                    if (mf(g), g === c) {
                      L = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = w, L = h;
                      break;
                    }
                    L = w;
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
              L = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, L = i;
          else e: for (; L !== null; ) {
            if (o = L, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Ir(9, o, o.return);
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
                  _o(9, s);
              }
            } catch (C) {
              ie(s, s.return, C);
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
        if (W = l, un(), vt && typeof vt.onPostCommitFiberRoot == "function") try {
          vt.onPostCommitFiberRoot(yo, e);
        } catch (C) {
        }
        r = !0;
      }
      return r;
    } finally {
      Q = n, qe.transition = t;
    }
  }
  return !1;
}
function fa(e, t, n) {
  t = ir(n, t), t = rf(e, t, 1), e = qt(e, t, 1), t = Re(), e !== null && (tl(e, 1, t), Ue(e, t));
}
function ie(e, t, n) {
  if (e.tag === 3) fa(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      fa(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (en === null || !en.has(r))) {
        e = ir(n, e), e = lf(t, e, 1), t = qt(t, e, 1), e = Re(), t !== null && (tl(t, 1, e), Ue(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function n0(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = Re(), e.pingedLanes |= e.suspendedLanes & n, xe === e && (Se & n) === n && (ge === 4 || ge === 3 && (Se & 130023424) === Se && 500 > ae() - Ws ? kn(e, 0) : Bs |= n), Ue(e, t);
}
function _f(e, t) {
  t === 0 && (e.mode & 1 ? (t = Sl, Sl <<= 1, !(Sl & 130023424) && (Sl = 4194304)) : t = 1);
  var n = Re();
  e = Dt(e, t), e !== null && (tl(e, t, n), Ue(e, n));
}
function r0(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), _f(e, n);
}
function l0(e, t) {
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
      throw Error(_(314));
  }
  r !== null && r.delete(t), _f(e, n);
}
var Nf;
Nf = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Fe.current) Oe = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Oe = !1, Qp(e, t, n);
    Oe = !!(e.flags & 131072);
  }
  else Oe = !1, ee && t.flags & 1048576 && zc(t, ro, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Bl(e, t), e = t.pendingProps;
      var l = nr(t, je.current);
      qn(t, n), l = Ds(null, t, r, e, l, n);
      var o = Os();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Ae(r) ? (o = !0, to(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Ps(t), l.updater = Co, t.stateNode = l, l._reactInternals = t, Wi(t, r, e, n), t = Qi(null, t, r, !0, o, n)) : (t.tag = 0, ee && o && Es(t), Le(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Bl(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = i0(r), e = rt(r, e), l) {
          case 0:
            t = Vi(null, t, r, e, n);
            break e;
          case 1:
            t = ta(null, t, r, e, n);
            break e;
          case 11:
            t = qu(null, t, r, e, n);
            break e;
          case 14:
            t = ea(null, t, r, rt(r.type, e), n);
            break e;
        }
        throw Error(_(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : rt(r, l), Vi(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : rt(r, l), ta(e, t, r, l, n);
    case 3:
      e: {
        if (af(t), e === null) throw Error(_(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, Dc(e, t), io(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = ir(Error(_(423)), t), t = na(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = ir(Error(_(424)), t), t = na(e, t, r, n, l);
          break e;
        } else for (He = Zt(t.stateNode.containerInfo.firstChild), Ve = t, ee = !0, ot = null, n = Mc(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (rr(), r === l) {
            t = Ot(e, t, n);
            break e;
          }
          Le(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Oc(t), e === null && Ui(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Ii(r, l) ? i = null : o !== null && Ii(r, o) && (t.flags |= 32), uf(e, t), Le(e, t, i, n), t.child;
    case 6:
      return e === null && Ui(t), null;
    case 13:
      return cf(e, t, n);
    case 4:
      return Ls(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = lr(t, null, r, n) : Le(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : rt(r, l), qu(e, t, r, l, n);
    case 7:
      return Le(e, t, t.pendingProps, n), t.child;
    case 8:
      return Le(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Le(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, b(lo, r._currentValue), r._currentValue = i, o !== null) if (ut(o.value, i)) {
          if (o.children === l.children && !Fe.current) {
            t = Ot(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var s = o.dependencies;
          if (s !== null) {
            i = o.child;
            for (var u = s.firstContext; u !== null; ) {
              if (u.context === r) {
                if (o.tag === 1) {
                  u = Rt(-1, n & -n), u.tag = 2;
                  var c = o.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var g = c.pending;
                    g === null ? u.next = u : (u.next = g.next, g.next = u), c.pending = u;
                  }
                }
                o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), $i(
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
            if (i = o.return, i === null) throw Error(_(341));
            i.lanes |= n, s = i.alternate, s !== null && (s.lanes |= n), $i(i, n, t), i = o.sibling;
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
        Le(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, qn(t, n), l = et(l), r = r(l), t.flags |= 1, Le(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = rt(r, t.pendingProps), l = rt(r.type, l), ea(e, t, r, l, n);
    case 15:
      return of(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : rt(r, l), Bl(e, t), t.tag = 1, Ae(r) ? (e = !0, to(t)) : e = !1, qn(t, n), nf(t, r, l), Wi(t, r, l, n), Qi(null, t, r, !0, e, n);
    case 19:
      return ff(e, t, n);
    case 22:
      return sf(e, t, n);
  }
  throw Error(_(156, t.tag));
};
function Tf(e, t) {
  return qa(e, t);
}
function o0(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ze(e, t, n, r) {
  return new o0(e, t, n, r);
}
function Xs(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function i0(e) {
  if (typeof e == "function") return Xs(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === fs) return 11;
    if (e === ds) return 14;
  }
  return 2;
}
function nn(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ze(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Vl(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") Xs(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case An:
      return En(n.children, l, o, t);
    case cs:
      i = 8, l |= 8;
      break;
    case di:
      return e = Ze(12, n, t, l | 2), e.elementType = di, e.lanes = o, e;
    case pi:
      return e = Ze(13, n, t, l), e.elementType = pi, e.lanes = o, e;
    case hi:
      return e = Ze(19, n, t, l), e.elementType = hi, e.lanes = o, e;
    case Oa:
      return To(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Ia:
          i = 10;
          break e;
        case Da:
          i = 9;
          break e;
        case fs:
          i = 11;
          break e;
        case ds:
          i = 14;
          break e;
        case Ht:
          i = 16, r = null;
          break e;
      }
      throw Error(_(130, e == null ? e : typeof e, ""));
  }
  return t = Ze(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function En(e, t, n, r) {
  return e = Ze(7, e, r, t), e.lanes = n, e;
}
function To(e, t, n, r) {
  return e = Ze(22, e, r, t), e.elementType = Oa, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ai(e, t, n) {
  return e = Ze(6, e, null, t), e.lanes = n, e;
}
function ci(e, t, n) {
  return t = Ze(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function s0(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Vo(0), this.expirationTimes = Vo(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Vo(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Ks(e, t, n, r, l, o, i, s, u) {
  return e = new s0(e, t, n, s, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Ze(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ps(o), e;
}
function u0(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Fn, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function jf(e) {
  if (!e) return ln;
  e = e._reactInternals;
  e: {
    if (Pn(e) !== e || e.tag !== 1) throw Error(_(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ae(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(_(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ae(n)) return Tc(e, n, t);
  }
  return t;
}
function zf(e, t, n, r, l, o, i, s, u) {
  return e = Ks(n, r, !0, e, l, o, i, s, u), e.context = jf(null), n = e.current, r = Re(), l = tn(n), o = Rt(r, l), o.callback = t != null ? t : null, qt(n, o, l), e.current.lanes = l, tl(e, l, r), Ue(e, r), e;
}
function jo(e, t, n, r) {
  var l = t.current, o = Re(), i = tn(l);
  return n = jf(n), t.context === null ? t.context = n : t.pendingContext = n, t = Rt(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = qt(l, t, i), e !== null && (st(e, l, i, o), Al(e, l, i)), i;
}
function mo(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function da(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function bs(e, t) {
  da(e, t), (e = e.alternate) && da(e, t);
}
function a0() {
  return null;
}
var Pf = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Ys(e) {
  this._internalRoot = e;
}
zo.prototype.render = Ys.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(_(409));
  jo(e, t, null, null);
};
zo.prototype.unmount = Ys.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    jn(function() {
      jo(null, e, null, null);
    }), t[It] = null;
  }
};
function zo(e) {
  this._internalRoot = e;
}
zo.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = ic();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Qt.length && t !== 0 && t < Qt[n].priority; n++) ;
    Qt.splice(n, 0, e), n === 0 && uc(e);
  }
};
function Gs(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Po(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function pa() {
}
function c0(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = mo(i);
        o.call(c);
      };
    }
    var i = zf(t, r, e, 0, null, !1, !1, "", pa);
    return e._reactRootContainer = i, e[It] = i.current, Qr(e.nodeType === 8 ? e.parentNode : e), jn(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var c = mo(u);
      s.call(c);
    };
  }
  var u = Ks(e, 0, !1, null, null, !1, !1, "", pa);
  return e._reactRootContainer = u, e[It] = u.current, Qr(e.nodeType === 8 ? e.parentNode : e), jn(function() {
    jo(t, u, n, r);
  }), u;
}
function Lo(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var s = l;
      l = function() {
        var u = mo(i);
        s.call(u);
      };
    }
    jo(t, i, e, l);
  } else i = c0(n, t, e, l, r);
  return mo(i);
}
lc = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Nr(t.pendingLanes);
        n !== 0 && (ms(t, n | 1), Ue(t, ae()), !(W & 6) && (sr = ae() + 500, un()));
      }
      break;
    case 13:
      jn(function() {
        var r = Dt(e, 1);
        if (r !== null) {
          var l = Re();
          st(r, e, 1, l);
        }
      }), bs(e, 1);
  }
};
gs = function(e) {
  if (e.tag === 13) {
    var t = Dt(e, 134217728);
    if (t !== null) {
      var n = Re();
      st(t, e, 134217728, n);
    }
    bs(e, 134217728);
  }
};
oc = function(e) {
  if (e.tag === 13) {
    var t = tn(e), n = Dt(e, t);
    if (n !== null) {
      var r = Re();
      st(n, e, t, r);
    }
    bs(e, t);
  }
};
ic = function() {
  return Q;
};
sc = function(e, t) {
  var n = Q;
  try {
    return Q = e, t();
  } finally {
    Q = n;
  }
};
Ci = function(e, t, n) {
  switch (t) {
    case "input":
      if (yi(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = So(r);
            if (!l) throw Error(_(90));
            Aa(r), yi(r, l);
          }
        }
      }
      break;
    case "textarea":
      $a(e, n);
      break;
    case "select":
      t = n.value, t != null && Yn(e, !!n.multiple, t, !1);
  }
};
Ka = Hs;
ba = jn;
var f0 = { usingClientEntryPoint: !1, Events: [rl, Wn, So, Qa, Xa, Hs] }, Er = { findFiberByHostInstance: xn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, d0 = { bundleType: Er.bundleType, version: Er.version, rendererPackageName: Er.rendererPackageName, rendererConfig: Er.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ft.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ja(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Er.findFiberByHostInstance || a0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined") {
  var Rl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Rl.isDisabled && Rl.supportsFiber) try {
    yo = Rl.inject(d0), vt = Rl;
  } catch (e) {
  }
}
Xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = f0;
Xe.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Gs(t)) throw Error(_(200));
  return u0(e, t, null, n);
};
Xe.createRoot = function(e, t) {
  if (!Gs(e)) throw Error(_(299));
  var n = !1, r = "", l = Pf;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Ks(e, 1, !1, null, null, n, !1, r, l), e[It] = t.current, Qr(e.nodeType === 8 ? e.parentNode : e), new Ys(t);
};
Xe.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(_(188)) : (e = Object.keys(e).join(","), Error(_(268, e)));
  return e = Ja(t), e = e === null ? null : e.stateNode, e;
};
Xe.flushSync = function(e) {
  return jn(e);
};
Xe.hydrate = function(e, t, n) {
  if (!Po(t)) throw Error(_(200));
  return Lo(null, e, t, !0, n);
};
Xe.hydrateRoot = function(e, t, n) {
  if (!Gs(e)) throw Error(_(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = Pf;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = zf(t, null, e, 1, n != null ? n : null, l, !1, o, i), e[It] = t.current, Qr(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new zo(t);
};
Xe.render = function(e, t, n) {
  if (!Po(t)) throw Error(_(200));
  return Lo(null, e, t, !1, n);
};
Xe.unmountComponentAtNode = function(e) {
  if (!Po(e)) throw Error(_(40));
  return e._reactRootContainer ? (jn(function() {
    Lo(null, null, e, !1, function() {
      e._reactRootContainer = null, e[It] = null;
    });
  }), !0) : !1;
};
Xe.unstable_batchedUpdates = Hs;
Xe.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Po(n)) throw Error(_(200));
  if (e == null || e._reactInternals === void 0) throw Error(_(38));
  return Lo(e, t, n, !1, r);
};
Xe.version = "18.3.1-next-f1338f8080-20240426";
function Lf() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ == "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Lf);
    } catch (e) {
      console.error(e);
    }
}
Lf(), Pa.exports = Xe;
var p0 = Pa.exports, Rf, ha = p0;
Rf = ha.createRoot, ha.hydrateRoot;
const ma = [
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
], ga = { "#39ff14": 110, "#ff2fbf": 320, "#00e5ff": 190, "#ff6b6b": 0, "#ffd93d": 55, "#7c3aed": 265 };
function ya(e) {
  return ma[(e - 1) % ma.length];
}
function jt(e) {
  const t = Math.floor((e - 1) / 10) + 1, n = (e - 1) % 10 + 1, r = m0.worlds[t - 1];
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
function h0(e) {
  return jt(e).tiles;
}
function On(e) {
  return jt(e).time;
}
const va = [
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
  [392, 440, 392, 349, 294, 294, 349, 392, 440, 392, 349, 330],
  // Titanic (motivo)
  // Más populares
  [330, 392, 330, 392, 330, 392, 330, 494, 392, 330, 294],
  // Für Elise (Beethoven)
  [392, 523, 494, 440, 392, 523, 494, 440, 392, 659, 587, 523],
  // Pink Panther
  [349, 392, 440, 392, 349, 294, 330, 349, 330, 294],
  // Can't Help Falling in Love
  [440, 440, 523, 494, 440, 392, 349, 392, 440],
  // Eye of the Tiger
  [659, 587, 523, 440, 523, 587, 659, 523, 440, 392],
  // Mission Impossible
  [294, 330, 294, 262, 294, 330, 349, 392, 349, 330, 294],
  // Somewhere Over the Rainbow
  [392, 440, 494, 523, 587, 523, 494, 440, 392],
  // Don't Stop Believin'
  [523, 494, 440, 523, 494, 440, 523, 587, 659],
  // Sweet Child O' Mine (intro)
  [262, 294, 330, 262, 262, 294, 330, 262, 330, 349, 392],
  // Frère Jacques
  [440, 494, 523, 587, 523, 494, 440, 392, 440]
  // The Entertainer (ragtime)
], m0 = {
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
function g0(e, t = 0.08) {
  const n = E.useRef(null), r = E.useRef(null), l = E.useRef(null), o = typeof window != "undefined" ? window : {}, i = () => {
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
  }, s = (y = 440, D = 0.12, f = "sine", a = 0.25) => {
    const d = i();
    if (d)
      try {
        const v = d.createOscillator(), C = d.createGain();
        v.type = f, v.frequency.value = y, C.gain.value = a, v.connect(C), C.connect(d.destination), d.state === "suspended" && d.resume().catch(() => {
        });
        const N = d.currentTime;
        v.start(N), v.stop(N + D);
      } catch (v) {
      }
  }, u = (y, D = 0.12, f = 0.04) => {
    const a = i();
    if (!(!a || !y || !y.length))
      try {
        a.state === "suspended" && a.resume().catch(() => {
        }), y.forEach((d, v) => {
          const C = a.createOscillator(), N = a.createGain();
          C.type = "triangle", C.frequency.value = d, N.gain.value = 0.3, C.connect(N), N.connect(a.destination);
          const z = a.currentTime + v * (D + f);
          C.start(z), C.stop(z + D);
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
        r.current.play().catch((D) => {
          console.log("Error reproduciendo audio de fondo:", D);
        });
      } catch (D) {
      }
  }, m = () => {
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
        const y = new Audio("lumetrix/audio/jugar.mp3");
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
    ok: (y) => s(y || 880, 0.1, "triangle", 0.07),
    fail: () => s(260, 0.12, "sine", 0.045),
    // suave "meck"
    blink: (y) => s(y || 720, 0.12, "sine", 0.08),
    // Victoria: siempre trozo corto (5–6 notas) + retraso 300ms
    winMelody: (y) => {
      const D = y && y.length ? y.slice(0, 6) : [659.25, 880, 1046.5];
      setTimeout(() => u(D, 0.12, 0.04), 300);
    },
    // Audio de fondo
    initBg: c,
    startBg: g,
    stopBg: m,
    updateVolume: h,
    // Audio de inicio
    initStart: w
  };
}
function Nt(e, t) {
  try {
    t && navigator.vibrate && navigator.vibrate(e);
  } catch (n) {
  }
}
function y0() {
  E.useEffect(() => {
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
function v0({ onPlay: e, onAuth: t }) {
  const n = E.useRef(null), r = E.useRef(null), [l, o] = E.useState(!1), [i, s] = E.useState(null), u = async () => {
    try {
      await window.LUM_API.api("auth.php?action=logout"), o(!1), s(null), window.location.reload();
    } catch (c) {
      console.log("Error al cerrar sesión");
    }
  };
  return E.useEffect(() => {
    const c = n.current;
    if (!c) return;
    const m = setInterval(() => {
      const h = document.createElement("i"), w = 20 + Math.random() * 25, k = 40 + Math.random() * 60;
      let y, D;
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
        ], C = v[Math.floor(Math.random() * v.length)];
        y = C.x[0] + Math.random() * (C.x[1] - C.x[0]), D = C.y[0] + Math.random() * (C.y[1] - C.y[0]);
      } else
        y = Math.random() * 100, D = Math.random() * 100;
      h.style.left = y + "%", h.style.top = D + "%", h.style.width = w + "px", h.style.height = k + "px";
      const a = [0, 60, 120, 180, 240, 300, 45, 135, 225, 315], d = a[Math.floor(Math.random() * a.length)];
      h.style.background = `hsl(${d} 95% 65% / .9)`, c.appendChild(h), setTimeout(() => h.remove(), 3e3);
    }, 80);
    return () => clearInterval(m);
  }, []), E.useEffect(() => {
    const c = () => {
      var y;
      const m = r.current;
      if (!m) return;
      const h = (y = m.parentElement) == null ? void 0 : y.parentElement;
      if (!h) return;
      m.style.fontSize = "";
      let w = Math.min(42, Math.max(28, Math.floor(h.clientWidth * 0.16)));
      m.style.fontSize = w + "px", m.style.letterSpacing = "0.16em";
      let k = 0;
      for (; m.scrollWidth > h.clientWidth - 24 && k < 20; )
        w -= 1, m.style.fontSize = w + "px", k++;
    };
    c();
    const g = new ResizeObserver(c);
    return g.observe(document.body), () => g.disconnect();
  }, []), E.useEffect(() => {
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
  }, []), /* @__PURE__ */ p.jsx("section", { className: "screen intro", children: /* @__PURE__ */ p.jsxs("div", { className: "introWrap", children: [
    /* @__PURE__ */ p.jsx("div", { className: "introBg", ref: n }),
    /* @__PURE__ */ p.jsxs("div", { className: "neon-borders", children: [
      /* @__PURE__ */ p.jsx("div", { className: "neon-line top" }),
      /* @__PURE__ */ p.jsx("div", { className: "neon-line right" }),
      /* @__PURE__ */ p.jsx("div", { className: "neon-line bottom" }),
      /* @__PURE__ */ p.jsx("div", { className: "neon-line left" })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "panel", children: [
      /* @__PURE__ */ p.jsxs("h1", { className: "logo", children: [
        /* @__PURE__ */ p.jsx("img", { src: "lumetrix/img/logo.png", alt: "LUMETRIX", style: {
          height: "150px",
          width: "500px",
          filter: "drop-shadow(0 0 20px #39ff14) drop-shadow(0 0 40px #00ffff) drop-shadow(0 0 60px #ff00ff)",
          animation: "logoGlow 2s ease-in-out infinite alternate"
        }, onError: (c) => {
          c.target.style.display = "none", c.target.nextSibling.style.display = "block";
        } }),
        /* @__PURE__ */ p.jsx("div", { style: { display: "none", fontSize: "48px", fontWeight: "900", letterSpacing: "0.1em", background: "linear-gradient(90deg,#39ff14,#00ffff,#ff00ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", textShadow: "0 0 20px #39ff14,0 0 40px #00ffff,0 0 60px #ff00ff" }, children: "LUMETRIX" })
      ] }),
      /* @__PURE__ */ p.jsxs("div", { style: { textAlign: "center", fontSize: 18, opacity: 0.9, marginTop: 20, marginBottom: 8, lineHeight: "1.4", fontWeight: 500 }, children: [
        "Esto no es un Simón: es el ",
        /* @__PURE__ */ p.jsx("b", { children: "anti‑Simón" }),
        ".",
        /* @__PURE__ */ p.jsx("br", {}),
        /* @__PURE__ */ p.jsx("br", {}),
        /* @__PURE__ */ p.jsx("b", { children: "Encuentra" }),
        " la secuencia y pinta ",
        /* @__PURE__ */ p.jsx("b", { children: "todas" }),
        " las piezas del color del borde."
      ] }),
      l ? (
        // Usuario logueado - mostrar progreso guardado
        /* @__PURE__ */ p.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
          /* @__PURE__ */ p.jsxs("div", { style: { fontSize: 18, opacity: 0.9, color: "#39ff14", fontWeight: 700, marginBottom: 16 }, children: [
            "¡Hola, ",
            (i == null ? void 0 : i.nick) || "Usuario",
            "!"
          ] }),
          /* @__PURE__ */ p.jsx("div", { className: "actions", style: { marginBottom: 8 }, children: /* @__PURE__ */ p.jsx("button", { className: "btn btn1", onClick: e, children: "CONTINUAR" }) }),
          /* @__PURE__ */ p.jsx(
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
        /* @__PURE__ */ p.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
          /* @__PURE__ */ p.jsx("div", { className: "actions", style: { marginBottom: 16 }, children: /* @__PURE__ */ p.jsx("button", { className: "btn btn1", onClick: e, children: "JUGAR" }) }),
          /* @__PURE__ */ p.jsx("div", { style: { fontSize: 12, opacity: 0.5, marginBottom: 6 }, children: "¿Ya tienes cuenta?" }),
          /* @__PURE__ */ p.jsx(
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
    /* @__PURE__ */ p.jsx("div", { className: "copy", style: { fontSize: "14px", fontWeight: 500 }, children: "© @intocables13 · Todos los derechos reservados" })
  ] }) });
}
function x0({ level: e, setLevel: t, soundOn: n, musicOn: r, musicVolume: l, vibrateOn: o, onOpenAuth: i, onOpenRanking: s, onOpenOptions: u, onOpenLevelSelector: c, onTotalUpdate: g, totalTime: m, onPuntosUpdate: h, totalPuntos: w, practiceModeLevel: k, currentLevel: y, onExitPracticeMode: D, onUpdateCurrentLevel: f }) {
  const a = E.useRef(null), [d, v] = E.useState(On(e)), [C, N] = E.useState(!1), [z, M] = E.useState(!1), [X, A] = E.useState(!1), [Ee, ye] = E.useState(!1), [at, be] = E.useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0;
    } catch (x) {
      return 0;
    }
  }), [wt, ct] = E.useState(0), [At, P] = E.useState(!1), [O, U] = E.useState(null), K = E.useRef(!1);
  E.useEffect(() => {
    typeof m == "number" && be(m);
  }, [m]), E.useEffect(() => {
    typeof w == "number" && ct(w);
  }, [w]);
  const ce = (x) => {
    const S = `lum_tutorial_${x}`;
    if (localStorage.getItem(S)) return null;
    switch (x) {
      case 1:
        return {
          title: "¡Bienvenido a Lumetrix!",
          steps: [
            "Memoriza la secuencia de colores que aparece",
            "Toca las fichas en el mismo orden",
            "Completa antes de que se acabe el tiempo"
          ],
          icon: "★"
        };
      case 11:
        return {
          title: "Nueva mecánica: Arrastre",
          steps: [
            "Algunas fichas tienen un símbolo de arrastre ⇄",
            "Arrastra estas fichas a la zona marcada",
            "Las fichas normales se tocan como siempre"
          ],
          icon: "⇄"
        };
      case 31:
        return {
          title: "Nueva mecánica: Doble Toque",
          steps: [
            "Algunas fichas tienen dos círculos ⦿",
            "Toca estas fichas DOS veces seguidas",
            "Las demás fichas se tocan una sola vez"
          ],
          icon: "⦿"
        };
      case 40:
        return {
          title: "Nivel Combo",
          steps: [
            "Este nivel combina TODAS las mecánicas",
            "Arrastra ⇄ las fichas de arrastre",
            "Toca doble ⦿ las fichas marcadas",
            "¡Concéntrate y buena suerte!"
          ],
          icon: "⚡"
        };
      default:
        return null;
    }
  }, Ut = (x, S, T = !0, I = !1) => {
    let j = 10;
    x <= 10 ? j = 10 : x <= 20 ? j = 15 : x <= 30 ? j = 20 : x <= 40 ? j = 25 : j = 30;
    let R = 0;
    S <= 5 ? R = 0 : S <= 10 ? R = 5 : S <= 15 ? R = 10 : R = 15;
    let F = 0;
    return T && (F += 10), I || (F += 5), j + R + F;
  }, V = g0(n, l), St = Math.floor((e - 1) / 10) + 1, Ye = (e - 1) % 10 + 1, $e = E.useMemo(() => ya(e), [e]);
  E.useEffect(() => {
    V.initBg(), V.initStart();
    const x = setTimeout(() => {
      V.startBg(r);
    }, 1e3);
    return () => clearTimeout(x);
  }, [V, r]), E.useEffect(() => {
    r ? V.startBg(!0) : V.stopBg();
  }, [r, V]), E.useEffect(() => {
    V.updateVolume(l);
  }, [l, V]);
  const Mf = (x) => {
    const S = jt(x), T = S.mechanics, I = Math.floor((x - 1) / 10) + 1;
    if (T.includes("drag") && T.includes("double")) {
      const j = S.tiles, R = 1, F = 1, fe = [...Array.from({ length: j }, (q, Pe) => Pe)].sort(() => Math.random() - 0.5), se = new Set(fe.slice(0, R)), ue = new Set(fe.slice(R, R + F)), de = new Set(fe.slice(R + F));
      if (il(se), sl(ue), ul(de), ol(ue), $t.current = ue, se.size > 0) {
        const q = Array.from(se)[0];
        dr(q), le.current = q, Io(q);
      } else
        dr(null), le.current = null, Io(null);
    } else if (T.includes("double") && !T.includes("drag")) {
      const R = /* @__PURE__ */ new Set();
      for (; R.size < 1; ) {
        const F = Math.floor(Math.random() * S.tiles);
        R.add(F);
      }
      $t.current = R, ol(R), il(/* @__PURE__ */ new Set()), sl(/* @__PURE__ */ new Set()), ul(/* @__PURE__ */ new Set()), Io(null), dr(null), le.current = null;
    } else if (I >= 2 && T.includes("drag")) {
      const j = S.tiles, R = Array.from({ length: j - 1 }, (fe, se) => se + 1), F = Math.floor(Math.random() * R.length), Y = R[F];
      dr(Y), le.current = Y, $t.current.clear(), ol(/* @__PURE__ */ new Set()), il(/* @__PURE__ */ new Set()), sl(/* @__PURE__ */ new Set()), ul(/* @__PURE__ */ new Set());
    } else
      $t.current.clear(), ol(/* @__PURE__ */ new Set()), il(/* @__PURE__ */ new Set()), sl(/* @__PURE__ */ new Set()), ul(/* @__PURE__ */ new Set()), dr(null), le.current = null;
    Et.current.clear(), Rn(/* @__PURE__ */ new Set());
  }, [If, _0] = E.useState([]), [he, ft] = E.useState(null), [dt, fr] = E.useState(null), [N0, dr] = E.useState(null), kt = E.useRef(null), Ro = E.useRef({ x: 0, y: 0 }), Ln = E.useRef({ x: 0, y: 0 }), le = E.useRef(null), an = E.useRef(null), [T0, ol] = E.useState(/* @__PURE__ */ new Set()), $t = E.useRef(/* @__PURE__ */ new Set()), [j0, Rn] = E.useState(/* @__PURE__ */ new Set()), Et = E.useRef(/* @__PURE__ */ new Set()), [Js, il] = E.useState(/* @__PURE__ */ new Set()), [Mo, sl] = E.useState(/* @__PURE__ */ new Set()), [z0, ul] = E.useState(/* @__PURE__ */ new Set()), [P0, Io] = E.useState(null), ze = E.useRef([]), oe = E.useRef(0);
  E.useRef(/* @__PURE__ */ new Map());
  const Bt = E.useRef(null), cn = E.useRef(!1), Df = 8, Do = E.useRef({ x: 0, y: 0 }), Oo = E.useRef(!1), al = (x) => {
    const T = (jt(e) || { mechanics: [] }).mechanics || [], I = Math.floor((e - 1) / 10) + 1;
    return T.includes("combo") || T.includes("touch") && T.includes("drag") && T.includes("double") ? Js.has(x) : I >= 2 && T.includes("drag") ? le.current === x : !1;
  }, Of = (x = "tap") => {
    const S = a.current;
    if (!S || le.current == null) return;
    const T = S.querySelector(`.tile[data-id="${le.current}"]`);
    if (!T) return;
    T.classList.remove("nudge-shake"), T.offsetHeight, T.classList.add("nudge-shake"), setTimeout(() => T.classList.remove("nudge-shake"), 550), ft((F) => F && { ...F, hint: !0 }), setTimeout(() => ft((F) => F && { ...F, hint: !1 }), 900);
    const I = T.getBoundingClientRect(), j = S.getBoundingClientRect(), R = document.createElement("div");
    R.className = "drag-hint", R.textContent = "arrastra", Object.assign(R.style, {
      left: `${I.left - j.left + I.width / 2}px`,
      top: `${I.top - j.top}px`
    }), S.appendChild(R), requestAnimationFrame(() => R.classList.add("show")), setTimeout(() => {
      R.classList.remove("show"), setTimeout(() => {
        try {
          R.remove();
        } catch (F) {
        }
      }, 180);
    }, 800);
    try {
      V.blink(720);
    } catch (F) {
    }
    Nt(10, o);
  }, Ff = (x) => {
    const S = a.current;
    if (!S) return;
    const T = S.querySelector(`.tile[data-id="${x}"]`);
    if (!T) return;
    T.classList.remove("nudge-shake"), T.offsetHeight, T.classList.add("nudge-shake"), setTimeout(() => T.classList.remove("nudge-shake"), 550);
    const I = T.getBoundingClientRect(), j = S.getBoundingClientRect(), R = document.createElement("div");
    R.className = "drag-hint", R.textContent = "dos veces", Object.assign(R.style, {
      left: `${I.left - j.left + I.width / 2}px`,
      top: `${I.top - j.top}px`
    }), S.appendChild(R), requestAnimationFrame(() => R.classList.add("show")), setTimeout(() => {
      R.classList.remove("show"), setTimeout(() => {
        try {
          R.remove();
        } catch (F) {
        }
      }, 180);
    }, 800);
    try {
      V.blink(720);
    } catch (F) {
    }
    Nt(10, o);
  }, cl = (x = "unknown") => {
    const S = a.current, T = le.current;
    if (!S || T == null) return;
    const I = S.querySelector(`.tile[data-id="${T}"]`);
    if (!I) return;
    let j = an.current;
    if (!j && I.dataset.origX && (j = {
      x: parseFloat(I.dataset.origX),
      y: parseFloat(I.dataset.origY),
      width: parseFloat(I.dataset.origW),
      height: parseFloat(I.dataset.origH)
    }), !j) {
      console.warn("restoreSpecialTile: no original position", { reason: x, id: T });
      return;
    }
    I.style.position = "absolute", I.style.left = `${j.x}px`, I.style.top = `${j.y}px`, I.style.width = `${j.width}px`, I.style.height = `${j.height}px`, I.classList.remove("dragging"), I.style.zIndex = "", I.style.pointerEvents = "", fr(null), kt.current = null;
  }, Zs = (x, S, T, I, j = 48) => {
    if (!T || !I) return !1;
    const R = I.getBoundingClientRect(), F = x - R.left, Y = S - R.top;
    return F > T.x - j && F < T.x + T.w + j && Y > T.y - j && Y < T.y + T.h + j;
  }, qs = (x) => {
    var T;
    const S = (T = a.current) == null ? void 0 : T.querySelector(`.tile[data-id="${x}"]`);
    if (S) {
      const I = parseFloat(S.dataset.pitch || "880");
      S.style.background = fn.current || $e, S.style.pointerEvents = "none", S.style.opacity = "0.7", V.ok(I), Nt(20, o);
    }
  }, eu = () => {
    if (oe.current++, oe.current >= ze.current.length) {
      if (!dn.current) {
        dn.current = !0;
        const x = Math.ceil((Date.now() - fl.current) / 1e3);
        Fo(x);
        try {
          if (window.LUM_API) {
            const S = k !== null, T = K.current, I = S || T ? 0 : Ut(e, On(e) - d);
            if (!S && !T) {
              const j = wt + I;
              ct(j), typeof h == "function" && h(j), typeof f == "function" && f(e + 1), K.current = !0;
            }
            window.LUM_API.api("game.php?action=save_progress", {
              method: "POST",
              body: JSON.stringify({
                level: S ? y : e + 1,
                // En práctica no avanza
                total_time_s: x,
                puntos: I,
                success: 1
              })
            }).catch((j) => {
              console.log("No hay sesión activa para guardar progreso");
            });
          }
        } catch (S) {
        }
      }
      Bt.current && clearInterval(Bt.current), N(!1), cn.current = !1, M(!0);
      try {
        V.winMelody((dl.current || []).slice(0, 6));
      } catch (x) {
      }
    }
  }, tu = () => {
    V.fail(), Nt(80, o), oe.current = 0, hl(), Et.current.clear(), Rn(/* @__PURE__ */ new Set());
    const x = a.current;
    if (x && le.current !== null && an.current) {
      const S = x.querySelector(`.tile[data-id="${le.current}"]`);
      S && (S.style.position = "absolute", S.style.left = `${an.current.x}px`, S.style.top = `${an.current.y}px`, S.style.width = `${an.current.width}px`, S.style.height = `${an.current.height}px`, S.style.zIndex = "", S.style.pointerEvents = "", S.classList.remove("dragging"));
    }
  }, fl = E.useRef(0), dl = E.useRef([]), fn = E.useRef($e), dn = E.useRef(!1);
  E.useEffect(() => {
    var S;
    const x = (S = a.current) == null ? void 0 : S.closest(".device");
    x && x.style.setProperty("--accent", $e);
  }, [$e]);
  const Fo = (x) => {
    try {
      const T = (Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0) + x;
      localStorage.setItem("lum_total", JSON.stringify(T)), be(T), typeof g == "function" && g(T);
    } catch (S) {
    }
  };
  function Af(x, S = null, T = null) {
    var Mn;
    const j = jt(e).mechanics, R = j.includes("drag") && j.includes("double"), F = T || (R ? Mo : $t.current), Y = a.current;
    if (!Y) return;
    Y.querySelectorAll(".tile, .dropzone").forEach((H) => H.remove());
    const fe = Y.getBoundingClientRect(), se = fe.width, ue = fe.height, de = (H, Ce) => Math.random() * (Ce - H) + H, q = (Mn = ga[fn.current || $e]) != null ? Mn : 0, Pe = () => {
      let H = Math.floor(Math.random() * 360), Ce = 0;
      for (; Math.min(Math.abs(H - q), 360 - Math.abs(H - q)) < 30 && Ce++ < 120; )
        H = Math.floor(Math.random() * 360);
      return H;
    };
    let pt = null;
    Math.floor((e - 1) / 10) + 1 >= 2 && S !== null && (pt = "hsl(300 96% 58%)");
    const ht = [], Ct = /* @__PURE__ */ new Set();
    for (let H = 0; H < x; H++) {
      let Ce = 0, Be = 0, _t = 0, mn = 0, nu = !1, Bf = 0;
      for (; !nu && Bf++ < 300; )
        Ce = Math.max(56, Math.min(140, 60 + Math.random() * 80)), Be = Math.max(56, Math.min(160, 60 + Math.random() * 100)), _t = Math.max(8, Math.min(se - Ce - 8, de(0, se - Ce))), mn = Math.max(8, Math.min(ue - Be - 8, de(0, ue - Be))), nu = !ht.some((G) => !(_t + Ce <= G.x || G.x + G.w <= _t || mn + Be <= G.y || G.y + G.h <= mn));
      ht.push({ x: _t, y: mn, w: Ce, h: Be });
      const B = document.createElement("button");
      B.type = "button", B.className = "tile";
      let In;
      if (S === H && pt)
        In = pt, Ct.add(pt);
      else {
        let G;
        do
          G = Pe(), In = `hsl(${G} 96% 58%)`;
        while (Ct.has(In) || In === pt);
        Ct.add(In);
      }
      if (Object.assign(B.style, { left: _t + "px", top: mn + "px", width: Ce + "px", height: Be + "px", background: In }), B.style.background === (fn.current || $e)) {
        const G = ((ga[fn.current || $e] || 0) + 180) % 360;
        B.style.background = `hsl(${G} 96% 58%)`;
      }
      B.dataset.id = String(H), B.dataset.orig = B.style.background;
      const ru = dl.current || [];
      B.dataset.pitch = String(ru[H % ru.length] || 660);
      const ml = jt(e).mechanics, lu = Math.floor((e - 1) / 10) + 1;
      if (B.style.cursor = "pointer", lu >= 2 && le.current === H && (B.classList.add("special-drag-tile"), B.addEventListener("dragstart", (G) => G.preventDefault()), B.addEventListener("touchstart", (G) => G.preventDefault(), { passive: !1 }), B.addEventListener("pointerdown", (G) => {
        Ao(G, { id: H });
      }, { passive: !1 }), setTimeout(() => {
        var ou;
        const G = B.getBoundingClientRect(), gn = (ou = a.current) == null ? void 0 : ou.getBoundingClientRect();
        if (gn) {
          const mr = {
            x: G.left - gn.left,
            y: G.top - gn.top,
            width: G.width,
            height: G.height
          };
          an.current = mr, B.dataset.origX = String(mr.x), B.dataset.origY = String(mr.y), B.dataset.origW = String(mr.width), B.dataset.origH = String(mr.height);
        }
      }, 50)), ml.includes("combo") || ml.includes("touch") && ml.includes("drag") && ml.includes("double"))
        if (Js.has(H)) {
          const G = B.style.background;
          B.style.border = `1px solid ${G}`, B.style.boxShadow = `0 0 8px ${G}88`, B.style.cursor = "grab", B.addEventListener("pointerdown", (gn) => Ao(gn, H)), B.addEventListener("dragstart", (gn) => gn.preventDefault());
        } else Mo.has(H) ? (B.style.setProperty("border", "2px solid white", "important"), B.style.setProperty("outline", "2px solid white", "important"), B.style.setProperty("outline-offset", "4px", "important")) : (B.style.border = "1px solid rgba(255,255,255,0.2)", B.style.boxShadow = "none");
      else
        F.has(H) && (B.style.setProperty("border", "2px solid white", "important"), B.style.setProperty("outline", "2px solid white", "important"), B.style.setProperty("outline-offset", "4px", "important"));
      lu >= 2 && le.current === H && (B.style.cursor = "grab"), Y.appendChild(B);
    }
    Y.__lumDeleg && Y.removeEventListener("pointerdown", Y.__lumDeleg);
    const hn = (H) => {
      const Ce = H.target && H.target.closest && H.target.closest(".tile");
      if (!Ce || !Y.contains(Ce) || !cn.current) return;
      const Be = Number(Ce.dataset.id), _t = ze.current[oe.current], mn = al(_t);
      if (Ce.classList.contains("special-drag-tile") || Be === le.current) {
        Ao(H, { id: Be });
        return;
      }
      mn || (H.preventDefault && H.preventDefault(), pr(Be));
    };
    Y.addEventListener("pointerdown", hn, { passive: !1 }), Y.__lumDeleg = hn;
  }
  function pl(x) {
    const S = a.current, T = S && S.querySelector(`.tile[data-id="${x}"]`);
    if (!T) return;
    T.style.background;
    const I = T.style.border, j = T.style.boxShadow, R = T.style.outline, F = T.style.outlineOffset;
    T.classList.add("lit"), T.style.background = fn.current || $e, V.blink(parseFloat(T.dataset.pitch || "720")), setTimeout(() => {
      T.classList.remove("lit"), $t.current.has(x) && (T.style.border = I, T.style.boxShadow = j, T.style.outline = R, T.style.outlineOffset = F);
    }, 260);
  }
  function Uf() {
    const x = ze.current;
    x && x.length && pl(x[0]);
  }
  function hl() {
    const x = a.current;
    x && x.querySelectorAll(".tile").forEach((S) => {
      S.style.background = S.dataset.orig || S.style.background, S.classList.remove("lit"), S.style.opacity = "1";
    });
  }
  function pn(x) {
    var pt;
    const S = typeof x == "number" ? x : e, T = (pt = a.current) == null ? void 0 : pt.closest(".device");
    fn.current = ya(S), T && T.style.setProperty("--accent", fn.current);
    const I = ce(S);
    if (I) {
      U(I), P(!0);
      return;
    }
    M(!1), A(!1), ye(!1), dn.current = !1, Bt.current && clearInterval(Bt.current);
    const j = h0(S), R = Array.from({ length: j }, (hr, ht) => ht), F = 0, Y = R.slice(1).sort(() => Math.random() - 0.5);
    ze.current = [F, ...Y], oe.current = 0, dl.current = va[Math.floor(Math.random() * va.length)] || [440, 494, 523, 587, 659, 698, 784, 880, 988, 1046, 1174, 1318, 1396, 1567, 1760], Mf(S);
    let fe = null, se = /* @__PURE__ */ new Set();
    const ue = Math.floor((S - 1) / 10) + 1;
    jt(S).mechanics, fe = le.current, se = $t.current, Af(j, fe, se), setTimeout(() => {
      var ht, Ct, hn;
      const hr = jt(S);
      if (ue >= 2 && fe !== null && hr.mechanics.includes("drag")) {
        const Mn = (ht = a.current) == null ? void 0 : ht.querySelector(`.tile[data-id="${fe}"]`);
        if (Mn) {
          const H = Mn.getBoundingClientRect();
          if ((Ct = a.current) == null ? void 0 : Ct.getBoundingClientRect()) {
            (hn = a.current) == null || hn.getBoundingClientRect();
            const Be = 60, _t = {
              x: Be,
              // Esquina izquierda con margen
              y: Be,
              // Esquina superior con margen
              w: H.width,
              h: H.height,
              color: Mn.style.backgroundColor,
              over: !1
            };
            ft(_t);
          }
        }
      } else
        ft(null);
    }, 100);
    const q = On(S);
    v(q), N(!0), cn.current = !0, V.start(), fl.current = Date.now();
    const Pe = Date.now();
    Bt.current = setInterval(() => {
      const hr = (Date.now() - Pe) / 1e3, ht = Math.max(0, q - hr);
      if (v(Math.ceil(ht)), ht <= 0) {
        if (!dn.current) {
          dn.current = !0;
          const Ct = Math.ceil((Date.now() - fl.current) / 1e3);
          Fo(Ct);
          try {
            window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
              method: "POST",
              body: JSON.stringify({
                level: e,
                total_time_s: Ct,
                puntos: 0,
                // No hay puntos al perder
                success: 0
              })
            }).catch((hn) => {
              console.log("No hay sesión activa para guardar progreso");
            });
          } catch (hn) {
          }
        }
        clearInterval(Bt.current), N(!1), cn.current = !1, cl("timeout"), A(!0), V.fail(), hl();
      }
    }, 100), setTimeout(Uf, 1500);
  }
  E.useEffect(() => {
    const x = (S) => {
      Oo.current && (S.preventDefault(), S.stopPropagation(), Oo.current = !1);
    };
    return document.addEventListener("click", x, !0), () => document.removeEventListener("click", x, !0);
  }, []), E.useEffect(() => {
    window.LumetrixTest = Object.assign({}, window.LumetrixTest, {
      start: pn,
      state: () => ({ level: e, world: St, levelInWorld: Ye, running: C, time: d, seqLen: (ze.current || []).length }),
      tapExpected: () => {
        const x = ze.current[oe.current];
        x != null && pr(x);
      },
      tapId: (x) => pr(x),
      isDragStep: () => {
        const x = ze.current[oe.current];
        return al(x);
      },
      test: {
        ignoreClicksOnDragStep: () => {
          const x = ze.current[oe.current], S = oe.current;
          return al(x) ? (pr(x === 0 ? 1 : 0), { ok: oe.current === S, step: oe.current, expected: x }) : { ok: !1, reason: "not drag step" };
        }
      }
    });
  }, [e, St, Ye, C, d]);
  const Ao = (x, S) => {
    var R;
    if (!cn.current) return;
    const T = ze.current[oe.current], I = a.current, j = I == null ? void 0 : I.querySelector(`.tile[data-id="${S.id}"]`);
    if (j) {
      if (S.id === le.current) {
        x.preventDefault(), x.stopPropagation();
        const F = j.getBoundingClientRect();
        Do.current = { x: F.left, y: F.top }, Oo.current = !0, fr(S.id), kt.current = (R = x.pointerId) != null ? R : null, Ro.current = { x: x.clientX - F.left, y: x.clientY - F.top }, Ln.current = { x: F.left, y: F.top }, j.style.zIndex = 1e3, j.classList.add("dragging"), j.style.pointerEvents = "none", j.style.touchAction = "none";
        return;
      }
      if (S.id !== T) return tu();
      qs(S.id), eu();
    }
  };
  function pr(x) {
    if (!cn.current) return;
    const S = jt(e);
    if (S.mechanics.includes("drag") && x === le.current)
      return;
    const T = ze.current[oe.current], I = a.current;
    if (al(T))
      return;
    const j = I && I.querySelector(`.tile[data-id="${x}"]`);
    if (!j) return;
    const R = parseFloat(j.dataset.pitch || "880"), F = $t.current.has(x), Y = (S.mechanics.includes("combo") || S.mechanics.includes("touch") && S.mechanics.includes("drag") && S.mechanics.includes("double")) && Mo.has(x);
    if (F && S.mechanics.includes("double") || Y)
      if (x === T)
        if (Et.current.has(x))
          j.style.opacity = "1", pl(x), V.ok(R), Nt(20, o), oe.current++, Et.current.delete(x), Rn(new Set(Et.current));
        else {
          j.style.opacity = "0.6", pl(x), V.ok(R), Nt(20, o), Et.current.add(x), Rn(new Set(Et.current)), Ff(x);
          return;
        }
      else {
        V.fail(), Nt(80, o), oe.current = 0, hl(), Et.current.clear(), Rn(/* @__PURE__ */ new Set());
        return;
      }
    else if (x === T) {
      pl(x), V.ok(R), Nt(20, o), oe.current++;
      const fe = Math.floor((e - 1) / 10) + 1;
      if ((fe >= 2 || S.mechanics.includes("combo") || S.mechanics.includes("touch") && S.mechanics.includes("drag") && S.mechanics.includes("double")) && oe.current < ze.current.length ? setTimeout(() => {
        var ue, de;
        if (Math.floor((e - 1) / 10) + 1 >= 2 && le.current !== null) {
          const q = (ue = a.current) == null ? void 0 : ue.querySelector(`.tile[data-id="${le.current}"]`);
          if (q) {
            (de = a.current) == null || de.getBoundingClientRect();
            const Pe = 60, pt = {
              x: Pe,
              // Esquina izquierda con margen
              y: Pe,
              // Esquina superior con margen
              w: q.offsetWidth,
              h: q.offsetHeight,
              color: q.style.backgroundColor,
              over: !1
            };
            ft(pt);
          }
        }
      }, 100) : (fe >= 2 || S.mechanics.includes("combo") || S.mechanics.includes("touch") && S.mechanics.includes("drag") && S.mechanics.includes("double")) && ft(null), oe.current >= ze.current.length) {
        if (!dn.current) {
          dn.current = !0;
          const se = Math.ceil((Date.now() - fl.current) / 1e3);
          Fo(se);
          try {
            if (window.LUM_API) {
              const ue = k !== null, de = K.current, q = ue || de ? 0 : Ut(e, On(e) - d);
              if (!ue && !de) {
                const Pe = wt + q;
                ct(Pe), typeof h == "function" && h(Pe), typeof f == "function" && f(e + 1), K.current = !0;
              }
              window.LUM_API.api("game.php?action=save_progress", {
                method: "POST",
                body: JSON.stringify({
                  level: ue ? y : e + 1,
                  // En práctica no avanza
                  total_time_s: se,
                  puntos: q,
                  success: 1
                })
              }).catch((Pe) => {
                console.log("No hay sesión activa para guardar progreso");
              });
            }
          } catch (ue) {
          }
        }
        Bt.current && clearInterval(Bt.current), N(!1), cn.current = !1, e === 50 ? ye(!0) : M(!0);
        try {
          V.winMelody((dl.current || []).slice(0, 6));
        } catch (se) {
        }
      }
    } else
      V.fail(), Nt(80, o), oe.current = 0, cl("wrong-tap"), hl(), Et.current.clear(), Rn(/* @__PURE__ */ new Set());
  }
  function $f() {
    M(!1), A(!1), ye(!1);
    const x = e + 1;
    x > y && typeof D == "function" && D(), K.current = !1, t(x), setTimeout(() => pn(x), 0);
  }
  return E.useEffect(() => {
    window.LumetrixTest = { start: pn, state: () => ({ level: e, world: St, levelInWorld: Ye, running: C, time: d, seqLen: (ze.current || []).length }), tapExpected: () => {
      const x = ze.current[oe.current];
      x != null && pr(x);
    } };
  }, [e, St, Ye, C, d]), E.useEffect(() => {
    const x = (T) => {
      var q;
      if (dt == null || kt.current !== null && T.pointerId !== kt.current) return;
      const I = T.clientX - Ro.current.x, j = T.clientY - Ro.current.y, R = (q = a.current) == null ? void 0 : q.querySelector(`.tile[data-id="${dt}"]`);
      if (!R) return;
      const F = Math.abs(I - Ln.current.x), Y = Math.abs(j - Ln.current.y), fe = 5;
      (F > fe || Y > fe || R.style.position === "fixed") && (R.style.position = "fixed", R.style.left = `${I}px`, R.style.top = `${j}px`, Ln.current = { x: I, y: j });
      const se = I + ((R == null ? void 0 : R.offsetWidth) || 0) / 2, ue = j + ((R == null ? void 0 : R.offsetHeight) || 0) / 2, de = Zs(se, ue, he, a.current, 48);
      ft((Pe) => Pe ? { ...Pe, over: de } : null);
    }, S = (T) => {
      var ue;
      if (dt == null || kt.current !== null && T.pointerId !== kt.current) return;
      const I = ze.current[oe.current], j = (ue = a.current) == null ? void 0 : ue.querySelector(`.tile[data-id="${dt}"]`), R = Ln.current.x, F = Ln.current.y, Y = R + ((j == null ? void 0 : j.offsetWidth) || 0) / 2, fe = F + ((j == null ? void 0 : j.offsetHeight) || 0) / 2, se = Zs(Y, fe, he, a.current, 48);
      if (console.debug("Drag drop validation:", {
        expected: I,
        draggingId: dt,
        special: le.current,
        inside: se,
        step: oe.current,
        drop: he
      }), dt === I && dt === le.current && se && j)
        return j.style.position = "absolute", j.style.left = `${he.x + (he.w - j.offsetWidth) / 2}px`, j.style.top = `${he.y + (he.h - j.offsetHeight) / 2}px`, fr(null), kt.current = null, ft((de) => de ? { ...de, over: !1 } : null), j && (j.classList.remove("dragging"), j.style.pointerEvents = "", j.style.zIndex = ""), qs(dt), eu();
      if (dt === le.current)
        if (Math.hypot(R - Do.current.x, F - Do.current.y) < Df) {
          cl("tap-detected"), fr(null), kt.current = null, ft((q) => q ? { ...q, over: !1 } : null), Of("tap");
          return;
        } else
          cl("drop-miss");
      fr(null), kt.current = null, ft((de) => de ? { ...de, over: !1 } : null), tu();
    };
    return document.addEventListener("pointermove", x, !0), document.addEventListener("pointerup", S, !0), document.addEventListener("pointercancel", S, !0), () => {
      document.removeEventListener("pointermove", x, !0), document.removeEventListener("pointerup", S, !0), document.removeEventListener("pointercancel", S, !0);
    };
  }, [dt, he, If]), /* @__PURE__ */ p.jsxs("section", { className: "screen", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "topbar", children: [
      /* @__PURE__ */ p.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ p.jsx("img", { src: "lumetrix/img/logo2.png", alt: "LUMETRIX", style: { height: "32px", width: "auto" }, onError: (x) => {
          x.target.style.display = "none", x.target.nextSibling.style.display = "inline";
        } }),
        /* @__PURE__ */ p.jsx("span", { style: { display: "none", fontSize: "16px", fontWeight: "900", letterSpacing: "0.1em", color: "#fff" }, children: "LUMETRIX" })
      ] }),
      /* @__PURE__ */ p.jsxs("div", { className: "icons", children: [
        /* @__PURE__ */ p.jsxs("button", { className: "icon", onClick: c, "aria-label": "Niveles", title: "Selector de niveles", children: [
          /* @__PURE__ */ p.jsx("img", { src: "lumetrix/img/ico_niveles.png?v=2", alt: "Niveles", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (x) => {
            x.target.style.display = "none", x.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ p.jsx("span", { style: { display: "none", fontSize: "22px", fontWeight: "bold", color: "var(--accent)" }, children: "≡" })
        ] }),
        /* @__PURE__ */ p.jsxs("button", { className: "icon", onClick: s, "aria-label": "Ranking", children: [
          /* @__PURE__ */ p.jsx("img", { src: "lumetrix/img/ico_ranking.png", alt: "Ranking", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (x) => {
            x.target.style.display = "none", x.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ p.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "🏆" })
        ] }),
        /* @__PURE__ */ p.jsxs("button", { className: "icon", onClick: u, "aria-label": "Opciones", children: [
          /* @__PURE__ */ p.jsx("img", { src: "lumetrix/img/ico_config.png", alt: "Configuración", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (x) => {
            x.target.style.display = "none", x.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ p.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "⚙️" })
        ] }),
        /* @__PURE__ */ p.jsxs("button", { className: "icon", onClick: i, "aria-label": "Login", children: [
          /* @__PURE__ */ p.jsx("img", { src: "lumetrix/img/ico_user.png", alt: "Usuario", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (x) => {
            x.target.style.display = "none", x.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ p.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "👤" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "hud", children: [
      /* @__PURE__ */ p.jsx("div", { className: "timebar", children: /* @__PURE__ */ p.jsx("i", { className: "timefill", style: { width: `${Math.max(0, Math.min(100, d / On(e) * 100))}%` } }) }),
      /* @__PURE__ */ p.jsxs("div", { className: "meta", children: [
        /* @__PURE__ */ p.jsxs("span", { className: "chip", children: [
          "Nivel ",
          /* @__PURE__ */ p.jsx("b", { children: e })
        ] }),
        /* @__PURE__ */ p.jsx("span", { className: "chip", children: /* @__PURE__ */ p.jsx("b", { children: wt }) }),
        k !== null && /* @__PURE__ */ p.jsx("span", { className: "chip", style: { background: "rgba(255,165,0,0.2)", border: "1px solid #ffa500", color: "#ffa500", fontSize: "11px" }, children: "PRÁCTICA" })
      ] })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "board", ref: a, children: [
      he && /* @__PURE__ */ p.jsx(
        "div",
        {
          className: `drop-zone ${he.over ? "drag-over" : ""} ${he.hint ? "pulse" : ""}`,
          style: {
            position: "absolute",
            left: he.x,
            top: he.y,
            width: he.w,
            height: he.h,
            border: `3px dashed ${he.color}`,
            borderRadius: "12px",
            background: "rgba(0,0,0,0.3)",
            pointerEvents: "none",
            zIndex: 10,
            transition: "all 0.2s ease",
            boxShadow: he.over ? `0 0 25px ${he.color}` : `0 0 15px ${he.color}33`
          }
        }
      ),
      !C && !z && !X && /* @__PURE__ */ p.jsxs("div", { className: "overlay", style: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }, children: [
        /* @__PURE__ */ p.jsx("button", { className: "btn-start", onClick: () => pn(), children: "EMPEZAR" }),
        /* @__PURE__ */ p.jsxs("div", { style: { marginTop: "16px", color: "#ffffff88", fontSize: "16px", fontWeight: 600 }, children: [
          "Nivel ",
          e,
          " • Mundo ",
          St
        ] })
      ] }),
      z && /* @__PURE__ */ p.jsx("div", { className: "overlay", children: /* @__PURE__ */ p.jsxs("div", { className: "card-compact", style: { textAlign: "center" }, children: [
        /* @__PURE__ */ p.jsx("div", { style: { fontSize: 32, marginBottom: 8, textShadow: "0 0 10px var(--neon2), 0 0 20px var(--neon2)" }, children: "✨" }),
        /* @__PURE__ */ p.jsx("h3", { style: { color: "var(--neon2)", marginBottom: 8 }, children: "¡Nivel superado!" }),
        /* @__PURE__ */ p.jsxs("div", { style: { fontSize: 16, color: "#ffffff88", marginBottom: 16 }, children: [
          "Puntos: ",
          Ut(e, On(e) - d),
          " pts"
        ] }),
        /* @__PURE__ */ p.jsxs("div", { style: { display: "flex", gap: "12px", justifyContent: "center" }, children: [
          /* @__PURE__ */ p.jsx("button", { className: "btn", onClick: () => {
            M(!1), pn();
          }, style: { border: "2px solid #ff6b6b", color: "#ff6b6b", boxShadow: "0 0 10px #ff6b6b44" }, children: "Reiniciar" }),
          /* @__PURE__ */ p.jsx("button", { className: "btn btn1", onClick: $f, children: "Siguiente" })
        ] })
      ] }) }),
      X && /* @__PURE__ */ p.jsx("div", { className: "overlay", children: /* @__PURE__ */ p.jsxs("div", { className: "card-compact", style: { textAlign: "center" }, children: [
        /* @__PURE__ */ p.jsx("div", { style: { fontSize: 32, marginBottom: 8, textShadow: "0 0 10px var(--neon1), 0 0 20px var(--neon1)" }, children: "💔" }),
        /* @__PURE__ */ p.jsx("h3", { style: { color: "var(--neon1)", marginBottom: 12 }, children: "Tiempo agotado" }),
        /* @__PURE__ */ p.jsx("button", { className: "btn btn1", onClick: () => pn(), children: "Reintentar" })
      ] }) }),
      Ee && /* @__PURE__ */ p.jsx("div", { className: "overlay", children: /* @__PURE__ */ p.jsxs("div", { className: "card-compact", style: { textAlign: "center", maxWidth: "90vw", padding: "24px" }, children: [
        /* @__PURE__ */ p.jsx("div", { style: { fontSize: 48, marginBottom: 16, textShadow: "0 0 20px #ffd700, 0 0 40px #ffd700" }, children: "🏆" }),
        /* @__PURE__ */ p.jsx("h2", { style: { color: "#ffd700", marginBottom: 16, fontSize: "24px", fontWeight: "bold", textShadow: "0 0 10px #ffd700" }, children: "¡CRACK TOTAL! 🎯" }),
        /* @__PURE__ */ p.jsxs("p", { style: { color: "#ffffff", marginBottom: 20, fontSize: "16px", lineHeight: "1.4" }, children: [
          "Has completado todos los 50 niveles.",
          /* @__PURE__ */ p.jsx("br", {}),
          "¡Eres una máquina de LUMETRIX! 🤖"
        ] }),
        /* @__PURE__ */ p.jsxs("p", { style: { color: "#00ffff", marginBottom: 24, fontSize: "14px", fontStyle: "italic" }, children: [
          "Si hay más cracks como tú,",
          /* @__PURE__ */ p.jsx("br", {}),
          "añadiremos más niveles. ¡Sigue practicando! 💪"
        ] }),
        /* @__PURE__ */ p.jsxs("div", { style: { display: "flex", gap: "12px", justifyContent: "center" }, children: [
          /* @__PURE__ */ p.jsx("button", { className: "btn btn1", onClick: () => {
            ye(!1), t(1);
          }, children: "Reiniciar" }),
          /* @__PURE__ */ p.jsx("button", { className: "btn btn1", onClick: () => {
            ye(!1), s();
          }, children: "Ranking" })
        ] })
      ] }) }),
      At && O && /* @__PURE__ */ p.jsx("div", { className: "overlay", style: { zIndex: 1e3 }, children: /* @__PURE__ */ p.jsxs("div", { className: "card", style: { textAlign: "center", maxWidth: "400px", padding: "28px" }, children: [
        /* @__PURE__ */ p.jsx("div", { style: { fontSize: 48, marginBottom: 16 }, children: O.icon }),
        /* @__PURE__ */ p.jsx("h3", { style: { color: "var(--accent)", marginBottom: 20, fontSize: "20px" }, children: O.title }),
        /* @__PURE__ */ p.jsx("div", { style: { textAlign: "left", marginBottom: 24 }, children: O.steps.map((x, S) => /* @__PURE__ */ p.jsxs("div", { style: {
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          marginBottom: "12px",
          fontSize: "14px",
          lineHeight: "1.5",
          color: "#ffffffdd"
        }, children: [
          /* @__PURE__ */ p.jsx("span", { style: {
            minWidth: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "var(--accent)",
            color: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "12px",
            marginTop: "2px"
          }, children: S + 1 }),
          /* @__PURE__ */ p.jsx("span", { children: x })
        ] }, S)) }),
        /* @__PURE__ */ p.jsx(
          "button",
          {
            className: "btn btn1",
            onClick: () => {
              P(!1), localStorage.setItem(`lum_tutorial_${e}`, "1"), setTimeout(() => pn(), 100);
            },
            style: { width: "100%", padding: "14px", fontSize: "16px", fontWeight: "bold" },
            children: "¡Entendido!"
          }
        )
      ] }) }),
      /* @__PURE__ */ p.jsxs("div", { className: "bokeh", children: [
        /* @__PURE__ */ p.jsx("i", { className: "b1" }),
        /* @__PURE__ */ p.jsx("i", { className: "b2" }),
        /* @__PURE__ */ p.jsx("i", { className: "b3" })
      ] })
    ] })
  ] });
}
function w0({ onClose: e, total: t }) {
  const [n, r] = E.useState([]), [l, o] = E.useState(!0), [i, s] = E.useState(null), u = E.useRef(null);
  E.useEffect(() => {
    (async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const h = await window.LUM_API.api("auth.php?action=check_session");
          h && h.success && s(h.user.email);
          const w = await window.LUM_API.api("ranking.php?action=global");
          w && w.success && w.data && r(w.data.map((k, y) => ({
            rank: y + 1,
            name: k.nick,
            email: k.email,
            level: k.level,
            puntos: k.total_puntos,
            world: Math.floor((k.level - 1) / 10) + 1
          })));
        }
      } catch (h) {
        r([]);
      } finally {
        o(!1);
      }
    })();
  }, []), E.useEffect(() => {
    !l && u.current && setTimeout(() => {
      var m;
      (m = u.current) == null || m.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }, [l, n]);
  const c = (m) => m === 1 ? "#FFD700" : m === 2 ? "#C0C0C0" : m === 3 ? "#CD7F32" : "#00ffff", g = (m) => m === 1 ? "1" : m === 2 ? "2" : m === 3 ? "3" : m;
  return /* @__PURE__ */ p.jsx("div", { className: "modal", children: /* @__PURE__ */ p.jsxs("div", { className: "card", style: { border: "2px solid #00ffff", boxShadow: "0 0 20px #00ffff44" }, children: [
    /* @__PURE__ */ p.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #00ffff", boxShadow: "0 0 10px #00ffff", background: "#000" }, children: "✕" }),
    /* @__PURE__ */ p.jsx("h3", { style: { color: "#00ffff", marginTop: 0, textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff", fontSize: "20px" }, children: "RANKING GLOBAL" }),
    l ? /* @__PURE__ */ p.jsx("div", { style: { textAlign: "center", padding: "40px", color: "#00ffff66" }, children: "Cargando ranking..." }) : n.length === 0 ? /* @__PURE__ */ p.jsxs("div", { style: { textAlign: "center", padding: "40px", color: "#00ffff66" }, children: [
      /* @__PURE__ */ p.jsx("div", { style: { fontSize: 16, marginBottom: 8 }, children: "Aún no hay jugadores" }),
      /* @__PURE__ */ p.jsx("div", { style: { fontSize: 12 }, children: "¡Sé el primero en aparecer aquí!" })
    ] }) : /* @__PURE__ */ p.jsx("div", { className: "list", style: { gap: "8px", maxHeight: "400px", overflowY: "auto", paddingRight: "4px" }, children: n.map((m) => {
      const h = i && m.email === i;
      return /* @__PURE__ */ p.jsxs(
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
            h && /* @__PURE__ */ p.jsx("div", { style: {
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
            /* @__PURE__ */ p.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
              /* @__PURE__ */ p.jsxs("span", { style: {
                color: c(m.rank),
                fontWeight: "bold",
                fontSize: "14px",
                minWidth: "30px"
              }, children: [
                "#",
                g(m.rank)
              ] }),
              /* @__PURE__ */ p.jsx("span", { style: { color: h ? "#FFD700" : "#fff", fontSize: "12px", fontWeight: h ? "bold" : "normal" }, children: m.name })
            ] }),
            /* @__PURE__ */ p.jsxs("div", { style: { textAlign: "right", fontSize: "11px", opacity: 0.8 }, children: [
              /* @__PURE__ */ p.jsxs("div", { children: [
                "Mundo ",
                m.world,
                " • Nivel ",
                m.level
              ] }),
              /* @__PURE__ */ p.jsxs("div", { style: { color: h ? "#FFD700" : "#00ffff" }, children: [
                m.puntos,
                " pts"
              ] })
            ] })
          ]
        },
        m.rank
      );
    }) })
  ] }) });
}
function S0({ onClose: e, onOpenAuth: t, level: n, setLevel: r, soundOn: l, musicOn: o, vibrateOn: i, setSoundOn: s, setMusicOn: u, setVibrateOn: c, onResetTotal: g, musicVolume: m, setMusicVolume: h }) {
  return /* @__PURE__ */ p.jsx("div", { className: "modal", children: /* @__PURE__ */ p.jsxs("div", { className: "card", style: { border: "2px solid #39ff14", boxShadow: "0 0 20px #39ff1444" }, children: [
    /* @__PURE__ */ p.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #39ff14", boxShadow: "0 0 10px #39ff14", background: "#000" }, children: "✕" }),
    /* @__PURE__ */ p.jsx("h3", { style: { color: "#39ff14", marginTop: 0, textShadow: "0 0 10px #39ff14, 0 0 20px #39ff14", fontSize: "20px" }, children: "CONFIGURACIÓN" }),
    /* @__PURE__ */ p.jsxs("div", { className: "list", style: { gap: "12px" }, children: [
      /* @__PURE__ */ p.jsxs("label", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ p.jsx("span", { style: { color: "#39ff14", fontWeight: "bold" }, children: "Música de fondo" }),
        /* @__PURE__ */ p.jsx("input", { type: "checkbox", checked: o, onChange: (w) => u(w.target.checked), style: { transform: "scale(1.2)", accentColor: "#39ff14" } })
      ] }),
      o && /* @__PURE__ */ p.jsxs("div", { style: { background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ p.jsxs("div", { style: { color: "#39ff14", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }, children: [
          "Volumen: ",
          Math.round(m * 100),
          "%"
        ] }),
        /* @__PURE__ */ p.jsx(
          "input",
          {
            type: "range",
            min: "0",
            max: "1",
            step: "0.1",
            value: m,
            onChange: (w) => h(parseFloat(w.target.value)),
            style: {
              width: "100%",
              accentColor: "#39ff14",
              background: "transparent"
            }
          }
        )
      ] }),
      /* @__PURE__ */ p.jsxs("label", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ p.jsx("span", { style: { color: "#39ff14", fontWeight: "bold" }, children: "Vibración" }),
        /* @__PURE__ */ p.jsx("input", { type: "checkbox", checked: i, onChange: (w) => c(w.target.checked), style: { transform: "scale(1.2)", accentColor: "#39ff14" } })
      ] })
    ] })
  ] }) });
}
function k0({ onClose: e }) {
  const [t, n] = E.useState("login"), [r, l] = E.useState(""), [o, i] = E.useState(""), [s, u] = E.useState(""), [c, g] = E.useState(""), [m, h] = E.useState(""), [w, k] = E.useState(!1), [y, D] = E.useState(!1), [f, a] = E.useState(null);
  E.useEffect(() => {
    (async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const z = await window.LUM_API.api("auth.php?action=check_session");
          z && z.success && (D(!0), a(z.user));
        }
      } catch (z) {
        D(!1);
      }
    })();
  }, []);
  const d = async () => {
    k(!0);
    try {
      await window.LUM_API.api("auth.php?action=logout"), window.location.reload();
    } catch (N) {
      h("❌ Error al cerrar sesión"), k(!1);
    }
  }, v = async () => {
    if (!o || !r || !s || !c) {
      h("❌ Rellena todos los campos");
      return;
    }
    k(!0), h("");
    try {
      const N = await window.LUM_API.api("auth.php?action=register", {
        method: "POST",
        body: JSON.stringify({ nombre: o, username: r, email: s, password: c })
      });
      N.success ? (h("✅ ¡Registrado! Ahora inicia sesión"), n("login"), g("")) : h("❌ " + (N.message || "Error en registro"));
    } catch (N) {
      h("❌ Error de conexión");
    }
    k(!1);
  }, C = async () => {
    if (!s || !c) {
      h("❌ Rellena email y contraseña");
      return;
    }
    k(!0), h("");
    try {
      const N = await window.LUM_API.api("auth.php?action=login", {
        method: "POST",
        body: JSON.stringify({ username: s, password: c })
      });
      N.success ? (h("✅ ¡Bienvenido!"), setTimeout(() => {
        window.location.reload();
      }, 500)) : h("❌ " + (N.message || "Credenciales incorrectas"));
    } catch (N) {
      h("❌ Error de conexión");
    }
    k(!1);
  };
  return /* @__PURE__ */ p.jsx("div", { className: "modal", children: /* @__PURE__ */ p.jsxs("div", { className: "card", style: { maxWidth: "420px", border: "2px solid #ff00ff", boxShadow: "0 0 20px #ff00ff44" }, children: [
    /* @__PURE__ */ p.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #ff00ff", boxShadow: "0 0 10px #ff00ff", background: "#000" }, children: "✕" }),
    y ? (
      // Usuario ya logueado - mostrar info y logout
      /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
        /* @__PURE__ */ p.jsx("h3", { style: { color: "#ff00ff", marginTop: 0, marginBottom: 12, textShadow: "0 0 10px #ff00ff, 0 0 20px #ff00ff", fontSize: "18px" }, children: "Mi cuenta" }),
        /* @__PURE__ */ p.jsxs("div", { className: "list", style: { gap: 12 }, children: [
          f && /* @__PURE__ */ p.jsxs("div", { style: { background: "rgba(255,0,255,0.1)", border: "1px solid #ff00ff33", borderRadius: "10px", padding: "16px", textAlign: "center" }, children: [
            /* @__PURE__ */ p.jsx("div", { style: { fontSize: 12, opacity: 0.6, marginBottom: 4 }, children: "Jugador" }),
            /* @__PURE__ */ p.jsx("div", { style: { fontSize: 20, color: "#ff00ff", fontWeight: "bold", marginBottom: 4 }, children: f.nick }),
            /* @__PURE__ */ p.jsx("div", { style: { fontSize: 11, opacity: 0.5, marginBottom: 8 }, children: f.email }),
            f.fecha_registro && /* @__PURE__ */ p.jsxs("div", { style: { fontSize: 9, opacity: 0.4 }, children: [
              "Desde ",
              new Date(f.fecha_registro).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })
            ] })
          ] }),
          /* @__PURE__ */ p.jsx(
            "button",
            {
              className: "btn",
              onClick: d,
              disabled: w,
              style: { border: "2px solid #ff4466", color: "#ff4466", boxShadow: "0 0 10px #ff446644", fontWeight: "bold", width: "100%", opacity: w ? 0.5 : 1 },
              children: w ? "Cerrando..." : "Cerrar sesión"
            }
          ),
          /* @__PURE__ */ p.jsxs("div", { style: { fontSize: 10, opacity: 0.4, textAlign: "center", marginTop: 8, lineHeight: 1.4 }, children: [
            "¿Eliminar cuenta?",
            " ",
            /* @__PURE__ */ p.jsx(
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
      /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
        /* @__PURE__ */ p.jsxs("div", { style: { display: "flex", gap: 8, marginBottom: 16, borderBottom: "1px solid #ff00ff33", paddingBottom: 8 }, children: [
          /* @__PURE__ */ p.jsx(
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
          /* @__PURE__ */ p.jsx(
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
        /* @__PURE__ */ p.jsx("h3", { style: { color: "#ff00ff", marginTop: 0, marginBottom: 12, textShadow: "0 0 10px #ff00ff, 0 0 20px #ff00ff", fontSize: "18px" }, children: t === "login" ? "Entrar con tu cuenta" : "Crear nueva cuenta" }),
        /* @__PURE__ */ p.jsxs("div", { className: "list", style: { gap: 12 }, children: [
          t === "register" && /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
            /* @__PURE__ */ p.jsx(
              "input",
              {
                placeholder: "Nombre completo",
                value: o,
                onChange: (N) => i(N.target.value),
                style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#fff", boxShadow: "0 0 10px #ff00ff22", outline: "none" }
              }
            ),
            /* @__PURE__ */ p.jsx(
              "input",
              {
                placeholder: "Nick (nombre de usuario)",
                value: r,
                onChange: (N) => l(N.target.value),
                style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#fff", boxShadow: "0 0 10px #ff00ff22", outline: "none" }
              }
            )
          ] }),
          /* @__PURE__ */ p.jsx(
            "input",
            {
              placeholder: "Email",
              type: "email",
              value: s,
              onChange: (N) => u(N.target.value),
              style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#fff", boxShadow: "0 0 10px #ff00ff22", outline: "none" }
            }
          ),
          /* @__PURE__ */ p.jsx(
            "input",
            {
              placeholder: "Contraseña",
              type: "password",
              value: c,
              onChange: (N) => g(N.target.value),
              onKeyPress: (N) => N.key === "Enter" && (t === "login" ? C() : v()),
              style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#fff", boxShadow: "0 0 10px #ff00ff22", outline: "none" }
            }
          ),
          m && /* @__PURE__ */ p.jsx("div", { style: { fontSize: 14, textAlign: "center", marginTop: 4, color: m.includes("✅") ? "#39ff14" : "#ff4466" }, children: m }),
          /* @__PURE__ */ p.jsxs("div", { style: { display: "flex", gap: 12, justifyContent: "center", marginTop: 8 }, children: [
            /* @__PURE__ */ p.jsx(
              "button",
              {
                className: "btn btn1",
                onClick: t === "login" ? C : v,
                disabled: w,
                style: { border: "2px solid #39ff14", color: "#39ff14", boxShadow: "0 0 10px #39ff1444", fontWeight: "bold", opacity: w ? 0.5 : 1 },
                children: w ? "Cargando..." : t === "login" ? "Entrar" : "Crear cuenta"
              }
            ),
            /* @__PURE__ */ p.jsx(
              "button",
              {
                className: "btn",
                onClick: e,
                disabled: w,
                style: { border: "2px solid #00ffff", color: "#00ffff", boxShadow: "0 0 10px #00ffff44", fontWeight: "bold", opacity: w ? 0.5 : 1 },
                children: "Cancelar"
              }
            )
          ] })
        ] })
      ] })
    )
  ] }) });
}
function E0({ onClose: e, currentLevel: t, onSelectLevel: n }) {
  const r = [
    { name: "Mundo 1", color: "#39ff14", levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { name: "Mundo 2", color: "#00ffff", levels: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
    { name: "Mundo 3", color: "#ff6b9d", levels: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
    { name: "Mundo 4", color: "#ffd700", levels: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40] },
    { name: "Mundo 5", color: "#ff00ff", levels: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50] }
  ];
  return /* @__PURE__ */ p.jsx("div", { className: "modal", children: /* @__PURE__ */ p.jsxs("div", { className: "card", style: { maxWidth: "90vw", width: "600px", maxHeight: "80vh", overflowY: "auto", padding: "20px" }, children: [
    /* @__PURE__ */ p.jsx("button", { className: "closer", onClick: e, "aria-label": "Cerrar", children: "×" }),
    /* @__PURE__ */ p.jsx("h3", { style: { color: "var(--accent)", marginBottom: "12px", textAlign: "center" }, children: "Seleccionar Nivel" }),
    /* @__PURE__ */ p.jsxs("div", { style: {
      marginBottom: "20px",
      padding: "10px",
      background: "rgba(57,255,20,0.1)",
      borderRadius: "8px",
      fontSize: "12px",
      color: "#ffffffaa",
      textAlign: "center"
    }, children: [
      /* @__PURE__ */ p.jsx("strong", { style: { color: "#39ff14" }, children: "Modo Práctica:" }),
      " Los niveles ya completados no suman puntos"
    ] }),
    /* @__PURE__ */ p.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "24px" }, children: r.map((l, o) => /* @__PURE__ */ p.jsxs("div", { children: [
      /* @__PURE__ */ p.jsx("h4", { style: {
        color: l.color,
        fontSize: "16px",
        marginBottom: "12px",
        textShadow: `0 0 10px ${l.color}`,
        fontWeight: "bold"
      }, children: l.name }),
      /* @__PURE__ */ p.jsx("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
        gap: "10px"
      }, children: l.levels.map((i) => {
        const s = i <= t, u = i === t, c = i < t;
        return /* @__PURE__ */ p.jsxs(
          "button",
          {
            disabled: !s,
            onClick: () => {
              n(i), e();
            },
            style: {
              position: "relative",
              background: s ? u ? `linear-gradient(135deg, ${l.color}22, ${l.color}11)` : "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.3)",
              border: u ? `2px solid ${l.color}` : s ? "2px solid rgba(255,255,255,0.2)" : "2px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "16px 8px",
              color: s ? "#fff" : "#666",
              cursor: s ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
              opacity: s ? 1 : 0.4,
              boxShadow: u ? `0 0 15px ${l.color}44` : "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              minHeight: "70px"
            },
            onMouseEnter: (g) => {
              s && (g.currentTarget.style.transform = "translateY(-2px)", g.currentTarget.style.boxShadow = `0 4px 12px ${l.color}44`);
            },
            onMouseLeave: (g) => {
              s && (g.currentTarget.style.transform = "translateY(0)", g.currentTarget.style.boxShadow = u ? `0 0 15px ${l.color}44` : "none");
            },
            children: [
              !s && /* @__PURE__ */ p.jsx("span", { style: { fontSize: "20px", opacity: 0.5 }, children: "🔒" }),
              c && /* @__PURE__ */ p.jsx("span", { style: {
                position: "absolute",
                top: "4px",
                right: "4px",
                fontSize: "12px",
                color: l.color
              }, children: "✓" }),
              /* @__PURE__ */ p.jsx("span", { style: {
                fontSize: "18px",
                fontWeight: "bold",
                color: s ? l.color : "#666"
              }, children: i }),
              u && /* @__PURE__ */ p.jsx("span", { style: {
                fontSize: "10px",
                color: l.color,
                fontWeight: "bold",
                marginTop: "2px"
              }, children: "ACTUAL" })
            ]
          },
          i
        );
      }) })
    ] }, o)) })
  ] }) });
}
function C0() {
  y0();
  const [e, t] = E.useState("intro"), [n, r] = E.useState(!1), [l, o] = E.useState(!1), [i, s] = E.useState(!1), [u, c] = E.useState(!0), [g, m] = E.useState(!0), [h, w] = E.useState(0.08), [k, y] = E.useState(!0), [D, f] = E.useState(1), [a, d] = E.useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0;
    } catch (ye) {
      return 0;
    }
  }), [v, C] = E.useState(0), [N, z] = E.useState(!1), [M, X] = E.useState(1), [A, Ee] = E.useState(null);
  return E.useEffect(() => {
    (async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const at = await window.LUM_API.api("auth.php?action=check_session");
          if (at && at.success) {
            const be = await window.LUM_API.api("game.php?action=get_progress");
            if (be && be.success && be.data) {
              const wt = be.data.nivel_actual || 1, ct = be.data.total_time_s || 0, At = be.data.total_puntos || 0;
              f(wt), X(wt), d(ct), C(At), console.log(`Progreso cargado: Nivel ${wt}, Tiempo ${ct}s, Puntos ${At}`);
            }
          }
        }
      } catch (at) {
        console.log("Sin progreso guardado, empezando desde nivel 1");
      }
    })();
  }, []), E.useEffect(() => {
    window.LumetrixTest = Object.assign({}, window.LumetrixTest, { help: "LumetrixTest.start(), .tapExpected(), .state() — tras pulsar Jugar" });
  }, []), /* @__PURE__ */ p.jsx("div", { className: "shell", children: /* @__PURE__ */ p.jsxs("div", { className: "device", children: [
    e === "intro" ? /* @__PURE__ */ p.jsx(v0, { onPlay: () => t("game"), onAuth: () => s(!0) }) : /* @__PURE__ */ p.jsx(
      x0,
      {
        level: D,
        setLevel: f,
        soundOn: u,
        musicOn: g,
        musicVolume: h,
        vibrateOn: k,
        onOpenAuth: () => s(!0),
        onOpenRanking: () => r(!0),
        onOpenOptions: () => o(!0),
        onOpenLevelSelector: () => z(!0),
        onTotalUpdate: d,
        totalTime: a,
        onPuntosUpdate: C,
        totalPuntos: v,
        practiceModeLevel: A,
        currentLevel: M,
        onExitPracticeMode: () => Ee(null),
        onUpdateCurrentLevel: X
      }
    ),
    n && /* @__PURE__ */ p.jsx(w0, { onClose: () => r(!1), total: a }),
    N && /* @__PURE__ */ p.jsx(
      E0,
      {
        onClose: () => z(!1),
        currentLevel: M,
        onSelectLevel: (ye) => {
          Ee(ye < M ? ye : null), f(ye);
        }
      }
    ),
    l && /* @__PURE__ */ p.jsx(
      S0,
      {
        onClose: () => o(!1),
        onOpenAuth: () => {
          o(!1), s(!0);
        },
        level: D,
        setLevel: f,
        soundOn: u,
        musicOn: g,
        vibrateOn: k,
        setSoundOn: c,
        setMusicOn: m,
        setVibrateOn: y,
        musicVolume: h,
        setMusicVolume: w,
        onResetTotal: () => {
          try {
            localStorage.removeItem("lum_total");
          } catch (ye) {
          }
          d(0);
        }
      }
    ),
    i && /* @__PURE__ */ p.jsx(k0, { onClose: () => s(!1) })
  ] }) });
}
function R0(e) {
  const t = Rf(e);
  t.render(/* @__PURE__ */ p.jsx(C0, {})), e.__lum_unmount = () => {
    var n;
    return (n = t.unmount) == null ? void 0 : n.call(t);
  };
}
function M0(e) {
  var t;
  try {
    (t = e.__lum_unmount) == null || t.call(e);
  } catch (n) {
  }
}
export {
  R0 as mount,
  M0 as unmount
};
//# sourceMappingURL=game.bundle.js.map
