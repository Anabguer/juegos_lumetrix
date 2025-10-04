var xs = { exports: {} }, Sl = {}, ws = { exports: {} }, O = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yr = Symbol.for("react.element"), Fc = Symbol.for("react.portal"), Uc = Symbol.for("react.fragment"), Ac = Symbol.for("react.strict_mode"), $c = Symbol.for("react.profiler"), Wc = Symbol.for("react.provider"), Bc = Symbol.for("react.context"), Vc = Symbol.for("react.forward_ref"), Hc = Symbol.for("react.suspense"), Qc = Symbol.for("react.memo"), Kc = Symbol.for("react.lazy"), ou = Symbol.iterator;
function Xc(e) {
  return e === null || typeof e != "object" ? null : (e = ou && e[ou] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ks = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Ss = Object.assign, Es = {};
function jn(e, t, n) {
  this.props = e, this.context = t, this.refs = Es, this.updater = n || ks;
}
jn.prototype.isReactComponent = {};
jn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
jn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Cs() {
}
Cs.prototype = jn.prototype;
function ui(e, t, n) {
  this.props = e, this.context = t, this.refs = Es, this.updater = n || ks;
}
var si = ui.prototype = new Cs();
si.constructor = ui;
Ss(si, jn.prototype);
si.isPureReactComponent = !0;
var iu = Array.isArray, _s = Object.prototype.hasOwnProperty, ai = { current: null }, Ns = { key: !0, ref: !0, __self: !0, __source: !0 };
function zs(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) _s.call(t, r) && !Ns.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var s = Array(u), a = 0; a < u; a++) s[a] = arguments[a + 2];
    l.children = s;
  }
  if (e && e.defaultProps) for (r in u = e.defaultProps, u) l[r] === void 0 && (l[r] = u[r]);
  return { $$typeof: yr, type: e, key: o, ref: i, props: l, _owner: ai.current };
}
function Yc(e, t) {
  return { $$typeof: yr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function ci(e) {
  return typeof e == "object" && e !== null && e.$$typeof === yr;
}
function Gc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var uu = /\/+/g;
function Wl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Gc("" + e.key) : t.toString(36);
}
function $r(e, t, n, r, l) {
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
        case yr:
        case Fc:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + Wl(i, 0) : r, iu(l) ? (n = "", e != null && (n = e.replace(uu, "$&/") + "/"), $r(l, t, n, "", function(a) {
    return a;
  })) : l != null && (ci(l) && (l = Yc(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(uu, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", iu(e)) for (var u = 0; u < e.length; u++) {
    o = e[u];
    var s = r + Wl(o, u);
    i += $r(o, t, n, s, l);
  }
  else if (s = Xc(e), typeof s == "function") for (e = s.call(e), u = 0; !(o = e.next()).done; ) o = o.value, s = r + Wl(o, u++), i += $r(o, t, n, s, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function Er(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return $r(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function Zc(e) {
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
var ge = { current: null }, Wr = { transition: null }, Jc = { ReactCurrentDispatcher: ge, ReactCurrentBatchConfig: Wr, ReactCurrentOwner: ai };
function js() {
  throw Error("act(...) is not supported in production builds of React.");
}
O.Children = { map: Er, forEach: function(e, t, n) {
  Er(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Er(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Er(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!ci(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
O.Component = jn;
O.Fragment = Uc;
O.Profiler = $c;
O.PureComponent = ui;
O.StrictMode = Ac;
O.Suspense = Hc;
O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Jc;
O.act = js;
O.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Ss({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = ai.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var u = e.type.defaultProps;
    for (s in t) _s.call(t, s) && !Ns.hasOwnProperty(s) && (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    u = Array(s);
    for (var a = 0; a < s; a++) u[a] = arguments[a + 2];
    r.children = u;
  }
  return { $$typeof: yr, type: e.type, key: l, ref: o, props: r, _owner: i };
};
O.createContext = function(e) {
  return e = { $$typeof: Bc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Wc, _context: e }, e.Consumer = e;
};
O.createElement = zs;
O.createFactory = function(e) {
  var t = zs.bind(null, e);
  return t.type = e, t;
};
O.createRef = function() {
  return { current: null };
};
O.forwardRef = function(e) {
  return { $$typeof: Vc, render: e };
};
O.isValidElement = ci;
O.lazy = function(e) {
  return { $$typeof: Kc, _payload: { _status: -1, _result: e }, _init: Zc };
};
O.memo = function(e, t) {
  return { $$typeof: Qc, type: e, compare: t === void 0 ? null : t };
};
O.startTransition = function(e) {
  var t = Wr.transition;
  Wr.transition = {};
  try {
    e();
  } finally {
    Wr.transition = t;
  }
};
O.unstable_act = js;
O.useCallback = function(e, t) {
  return ge.current.useCallback(e, t);
};
O.useContext = function(e) {
  return ge.current.useContext(e);
};
O.useDebugValue = function() {
};
O.useDeferredValue = function(e) {
  return ge.current.useDeferredValue(e);
};
O.useEffect = function(e, t) {
  return ge.current.useEffect(e, t);
};
O.useId = function() {
  return ge.current.useId();
};
O.useImperativeHandle = function(e, t, n) {
  return ge.current.useImperativeHandle(e, t, n);
};
O.useInsertionEffect = function(e, t) {
  return ge.current.useInsertionEffect(e, t);
};
O.useLayoutEffect = function(e, t) {
  return ge.current.useLayoutEffect(e, t);
};
O.useMemo = function(e, t) {
  return ge.current.useMemo(e, t);
};
O.useReducer = function(e, t, n) {
  return ge.current.useReducer(e, t, n);
};
O.useRef = function(e) {
  return ge.current.useRef(e);
};
O.useState = function(e) {
  return ge.current.useState(e);
};
O.useSyncExternalStore = function(e, t, n) {
  return ge.current.useSyncExternalStore(e, t, n);
};
O.useTransition = function() {
  return ge.current.useTransition();
};
O.version = "18.3.1";
ws.exports = O;
var L = ws.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qc = L, bc = Symbol.for("react.element"), ef = Symbol.for("react.fragment"), tf = Object.prototype.hasOwnProperty, nf = qc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, rf = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ts(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) tf.call(t, r) && !rf.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: bc, type: e, key: o, ref: i, props: l, _owner: nf.current };
}
Sl.Fragment = ef;
Sl.jsx = Ts;
Sl.jsxs = Ts;
xs.exports = Sl;
var g = xs.exports, Ps = { exports: {} }, Pe = {}, Ls = { exports: {} }, Ms = {};
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
  function t(E, T) {
    var R = E.length;
    E.push(T);
    e: for (; 0 < R; ) {
      var H = R - 1 >>> 1, Z = E[H];
      if (0 < l(Z, T)) E[H] = T, E[R] = Z, R = H;
      else break e;
    }
  }
  function n(E) {
    return E.length === 0 ? null : E[0];
  }
  function r(E) {
    if (E.length === 0) return null;
    var T = E[0], R = E.pop();
    if (R !== T) {
      E[0] = R;
      e: for (var H = 0, Z = E.length, Ft = Z >>> 1; H < Ft; ) {
        var $e = 2 * (H + 1) - 1, Ut = E[$e], pe = $e + 1, Ge = E[pe];
        if (0 > l(Ut, R)) pe < Z && 0 > l(Ge, Ut) ? (E[H] = Ge, E[pe] = R, H = pe) : (E[H] = Ut, E[$e] = R, H = $e);
        else if (pe < Z && 0 > l(Ge, R)) E[H] = Ge, E[pe] = R, H = pe;
        else break e;
      }
    }
    return T;
  }
  function l(E, T) {
    var R = E.sortIndex - T.sortIndex;
    return R !== 0 ? R : E.id - T.id;
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
  var s = [], a = [], m = 1, h = null, p = 3, y = !1, w = !1, k = !1, F = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, c = typeof setImmediate != "undefined" ? setImmediate : null;
  typeof navigator != "undefined" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function d(E) {
    for (var T = n(a); T !== null; ) {
      if (T.callback === null) r(a);
      else if (T.startTime <= E) r(a), T.sortIndex = T.expirationTime, t(s, T);
      else break;
      T = n(a);
    }
  }
  function v(E) {
    if (k = !1, d(E), !w) if (n(s) !== null) w = !0, Ae(S);
    else {
      var T = n(a);
      T !== null && Ye(v, T.startTime - E);
    }
  }
  function S(E, T) {
    w = !1, k && (k = !1, f(j), j = -1), y = !0;
    var R = p;
    try {
      for (d(T), h = n(s); h !== null && (!(h.expirationTime > T) || E && !ye()); ) {
        var H = h.callback;
        if (typeof H == "function") {
          h.callback = null, p = h.priorityLevel;
          var Z = H(h.expirationTime <= T);
          T = e.unstable_now(), typeof Z == "function" ? h.callback = Z : h === n(s) && r(s), d(T);
        } else r(s);
        h = n(s);
      }
      if (h !== null) var Ft = !0;
      else {
        var $e = n(a);
        $e !== null && Ye(v, $e.startTime - T), Ft = !1;
      }
      return Ft;
    } finally {
      h = null, p = R, y = !1;
    }
  }
  var z = !1, _ = null, j = -1, Y = 5, I = -1;
  function ye() {
    return !(e.unstable_now() - I < Y);
  }
  function se() {
    if (_ !== null) {
      var E = e.unstable_now();
      I = E;
      var T = !0;
      try {
        T = _(!0, E);
      } finally {
        T ? mt() : (z = !1, _ = null);
      }
    } else z = !1;
  }
  var mt;
  if (typeof c == "function") mt = function() {
    c(se);
  };
  else if (typeof MessageChannel != "undefined") {
    var bt = new MessageChannel(), Ul = bt.port2;
    bt.port1.onmessage = se, mt = function() {
      Ul.postMessage(null);
    };
  } else mt = function() {
    F(se, 0);
  };
  function Ae(E) {
    _ = E, z || (z = !0, mt());
  }
  function Ye(E, T) {
    j = F(function() {
      E(e.unstable_now());
    }, T);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(E) {
    E.callback = null;
  }, e.unstable_continueExecution = function() {
    w || y || (w = !0, Ae(S));
  }, e.unstable_forceFrameRate = function(E) {
    0 > E || 125 < E ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Y = 0 < E ? Math.floor(1e3 / E) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return p;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(s);
  }, e.unstable_next = function(E) {
    switch (p) {
      case 1:
      case 2:
      case 3:
        var T = 3;
        break;
      default:
        T = p;
    }
    var R = p;
    p = T;
    try {
      return E();
    } finally {
      p = R;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(E, T) {
    switch (E) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        E = 3;
    }
    var R = p;
    p = E;
    try {
      return T();
    } finally {
      p = R;
    }
  }, e.unstable_scheduleCallback = function(E, T, R) {
    var H = e.unstable_now();
    switch (typeof R == "object" && R !== null ? (R = R.delay, R = typeof R == "number" && 0 < R ? H + R : H) : R = H, E) {
      case 1:
        var Z = -1;
        break;
      case 2:
        Z = 250;
        break;
      case 5:
        Z = 1073741823;
        break;
      case 4:
        Z = 1e4;
        break;
      default:
        Z = 5e3;
    }
    return Z = R + Z, E = { id: m++, callback: T, priorityLevel: E, startTime: R, expirationTime: Z, sortIndex: -1 }, R > H ? (E.sortIndex = R, t(a, E), n(s) === null && E === n(a) && (k ? (f(j), j = -1) : k = !0, Ye(v, R - H))) : (E.sortIndex = Z, t(s, E), w || y || (w = !0, Ae(S))), E;
  }, e.unstable_shouldYield = ye, e.unstable_wrapCallback = function(E) {
    var T = p;
    return function() {
      var R = p;
      p = T;
      try {
        return E.apply(this, arguments);
      } finally {
        p = R;
      }
    };
  };
})(Ms);
Ls.exports = Ms;
var lf = Ls.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var of = L, Te = lf;
function x(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Rs = /* @__PURE__ */ new Set(), tr = {};
function Jt(e, t) {
  kn(e, t), kn(e + "Capture", t);
}
function kn(e, t) {
  for (tr[e] = t, e = 0; e < t.length; e++) Rs.add(t[e]);
}
var at = !(typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined"), ho = Object.prototype.hasOwnProperty, uf = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, su = {}, au = {};
function sf(e) {
  return ho.call(au, e) ? !0 : ho.call(su, e) ? !1 : uf.test(e) ? au[e] = !0 : (su[e] = !0, !1);
}
function af(e, t, n, r) {
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
function cf(e, t, n, r) {
  if (t === null || typeof t == "undefined" || af(e, t, n, r)) return !0;
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
function ve(e, t, n, r, l, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
var ue = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ue[e] = new ve(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ue[t] = new ve(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ue[e] = new ve(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ue[e] = new ve(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ue[e] = new ve(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ue[e] = new ve(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ue[e] = new ve(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ue[e] = new ve(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ue[e] = new ve(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var fi = /[\-:]([a-z])/g;
function di(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    fi,
    di
  );
  ue[t] = new ve(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(fi, di);
  ue[t] = new ve(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(fi, di);
  ue[t] = new ve(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ue[e] = new ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ue.xlinkHref = new ve("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ue[e] = new ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function pi(e, t, n, r) {
  var l = ue.hasOwnProperty(t) ? ue[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (cf(t, n, l, r) && (n = null), r || l === null ? sf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var pt = of.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Cr = Symbol.for("react.element"), nn = Symbol.for("react.portal"), rn = Symbol.for("react.fragment"), mi = Symbol.for("react.strict_mode"), go = Symbol.for("react.profiler"), Is = Symbol.for("react.provider"), Os = Symbol.for("react.context"), hi = Symbol.for("react.forward_ref"), vo = Symbol.for("react.suspense"), yo = Symbol.for("react.suspense_list"), gi = Symbol.for("react.memo"), yt = Symbol.for("react.lazy"), Ds = Symbol.for("react.offscreen"), cu = Symbol.iterator;
function In(e) {
  return e === null || typeof e != "object" ? null : (e = cu && e[cu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var X = Object.assign, Bl;
function Bn(e) {
  if (Bl === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Bl = t && t[1] || "";
  }
  return `
` + Bl + e;
}
var Vl = !1;
function Hl(e, t) {
  if (!e || Vl) return "";
  Vl = !0;
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
      } catch (a) {
        var r = a;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (a) {
        r = a;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (a) {
        r = a;
      }
      e();
    }
  } catch (a) {
    if (a && r && typeof a.stack == "string") {
      for (var l = a.stack.split(`
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
    Vl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Bn(e) : "";
}
function ff(e) {
  switch (e.tag) {
    case 5:
      return Bn(e.type);
    case 16:
      return Bn("Lazy");
    case 13:
      return Bn("Suspense");
    case 19:
      return Bn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Hl(e.type, !1), e;
    case 11:
      return e = Hl(e.type.render, !1), e;
    case 1:
      return e = Hl(e.type, !0), e;
    default:
      return "";
  }
}
function xo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case rn:
      return "Fragment";
    case nn:
      return "Portal";
    case go:
      return "Profiler";
    case mi:
      return "StrictMode";
    case vo:
      return "Suspense";
    case yo:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Os:
      return (e.displayName || "Context") + ".Consumer";
    case Is:
      return (e._context.displayName || "Context") + ".Provider";
    case hi:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case gi:
      return t = e.displayName || null, t !== null ? t : xo(e.type) || "Memo";
    case yt:
      t = e._payload, e = e._init;
      try {
        return xo(e(t));
      } catch (n) {
      }
  }
  return null;
}
function df(e) {
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
      return xo(t);
    case 8:
      return t === mi ? "StrictMode" : "Mode";
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
function Mt(e) {
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
function Fs(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function pf(e) {
  var t = Fs(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function _r(e) {
  e._valueTracker || (e._valueTracker = pf(e));
}
function Us(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Fs(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function qr(e) {
  if (e = e || (typeof document != "undefined" ? document : void 0), typeof e == "undefined") return null;
  try {
    return e.activeElement || e.body;
  } catch (t) {
    return e.body;
  }
}
function wo(e, t) {
  var n = t.checked;
  return X({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n != null ? n : e._wrapperState.initialChecked });
}
function fu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = Mt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function As(e, t) {
  t = t.checked, t != null && pi(e, "checked", t, !1);
}
function ko(e, t) {
  As(e, t);
  var n = Mt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? So(e, t.type, n) : t.hasOwnProperty("defaultValue") && So(e, t.type, Mt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function du(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function So(e, t, n) {
  (t !== "number" || qr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Vn = Array.isArray;
function hn(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Mt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Eo(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(x(91));
  return X({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function pu(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(x(92));
      if (Vn(n)) {
        if (1 < n.length) throw Error(x(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: Mt(n) };
}
function $s(e, t) {
  var n = Mt(t.value), r = Mt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function mu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ws(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Co(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ws(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Nr, Bs = function(e) {
  return typeof MSApp != "undefined" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Nr = Nr || document.createElement("div"), Nr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Nr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function nr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Kn = {
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
}, mf = ["Webkit", "ms", "Moz", "O"];
Object.keys(Kn).forEach(function(e) {
  mf.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Kn[t] = Kn[e];
  });
});
function Vs(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Kn.hasOwnProperty(e) && Kn[e] ? ("" + t).trim() : t + "px";
}
function Hs(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Vs(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var hf = X({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function _o(e, t) {
  if (t) {
    if (hf[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(x(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(x(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(x(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(x(62));
  }
}
function No(e, t) {
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
var zo = null;
function vi(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var jo = null, gn = null, vn = null;
function hu(e) {
  if (e = kr(e)) {
    if (typeof jo != "function") throw Error(x(280));
    var t = e.stateNode;
    t && (t = zl(t), jo(e.stateNode, e.type, t));
  }
}
function Qs(e) {
  gn ? vn ? vn.push(e) : vn = [e] : gn = e;
}
function Ks() {
  if (gn) {
    var e = gn, t = vn;
    if (vn = gn = null, hu(e), t) for (e = 0; e < t.length; e++) hu(t[e]);
  }
}
function Xs(e, t) {
  return e(t);
}
function Ys() {
}
var Ql = !1;
function Gs(e, t, n) {
  if (Ql) return e(t, n);
  Ql = !0;
  try {
    return Xs(e, t, n);
  } finally {
    Ql = !1, (gn !== null || vn !== null) && (Ys(), Ks());
  }
}
function rr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = zl(n);
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
  if (n && typeof n != "function") throw Error(x(231, t, typeof n));
  return n;
}
var To = !1;
if (at) try {
  var On = {};
  Object.defineProperty(On, "passive", { get: function() {
    To = !0;
  } }), window.addEventListener("test", On, On), window.removeEventListener("test", On, On);
} catch (e) {
  To = !1;
}
function gf(e, t, n, r, l, o, i, u, s) {
  var a = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, a);
  } catch (m) {
    this.onError(m);
  }
}
var Xn = !1, br = null, el = !1, Po = null, vf = { onError: function(e) {
  Xn = !0, br = e;
} };
function yf(e, t, n, r, l, o, i, u, s) {
  Xn = !1, br = null, gf.apply(vf, arguments);
}
function xf(e, t, n, r, l, o, i, u, s) {
  if (yf.apply(this, arguments), Xn) {
    if (Xn) {
      var a = br;
      Xn = !1, br = null;
    } else throw Error(x(198));
    el || (el = !0, Po = a);
  }
}
function qt(e) {
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
function Zs(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function gu(e) {
  if (qt(e) !== e) throw Error(x(188));
}
function wf(e) {
  var t = e.alternate;
  if (!t) {
    if (t = qt(e), t === null) throw Error(x(188));
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
        if (o === n) return gu(l), e;
        if (o === r) return gu(l), t;
        o = o.sibling;
      }
      throw Error(x(188));
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
        if (!i) throw Error(x(189));
      }
    }
    if (n.alternate !== r) throw Error(x(190));
  }
  if (n.tag !== 3) throw Error(x(188));
  return n.stateNode.current === n ? e : t;
}
function Js(e) {
  return e = wf(e), e !== null ? qs(e) : null;
}
function qs(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = qs(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var bs = Te.unstable_scheduleCallback, vu = Te.unstable_cancelCallback, kf = Te.unstable_shouldYield, Sf = Te.unstable_requestPaint, b = Te.unstable_now, Ef = Te.unstable_getCurrentPriorityLevel, yi = Te.unstable_ImmediatePriority, ea = Te.unstable_UserBlockingPriority, tl = Te.unstable_NormalPriority, Cf = Te.unstable_LowPriority, ta = Te.unstable_IdlePriority, El = null, be = null;
function _f(e) {
  if (be && typeof be.onCommitFiberRoot == "function") try {
    be.onCommitFiberRoot(El, e, void 0, (e.current.flags & 128) === 128);
  } catch (t) {
  }
}
var Qe = Math.clz32 ? Math.clz32 : jf, Nf = Math.log, zf = Math.LN2;
function jf(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Nf(e) / zf | 0) | 0;
}
var zr = 64, jr = 4194304;
function Hn(e) {
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
function nl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var u = i & ~l;
    u !== 0 ? r = Hn(u) : (o &= i, o !== 0 && (r = Hn(o)));
  } else i = n & ~l, i !== 0 ? r = Hn(i) : o !== 0 && (r = Hn(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Qe(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Tf(e, t) {
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
function Pf(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - Qe(o), u = 1 << i, s = l[i];
    s === -1 ? (!(u & n) || u & r) && (l[i] = Tf(u, t)) : s <= t && (e.expiredLanes |= u), o &= ~u;
  }
}
function Lo(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function na() {
  var e = zr;
  return zr <<= 1, !(zr & 4194240) && (zr = 64), e;
}
function Kl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function xr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Qe(t), e[t] = n;
}
function Lf(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Qe(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function xi(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Qe(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var U = 0;
function ra(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var la, wi, oa, ia, ua, Mo = !1, Tr = [], Ct = null, _t = null, Nt = null, lr = /* @__PURE__ */ new Map(), or = /* @__PURE__ */ new Map(), wt = [], Mf = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function yu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Ct = null;
      break;
    case "dragenter":
    case "dragleave":
      _t = null;
      break;
    case "mouseover":
    case "mouseout":
      Nt = null;
      break;
    case "pointerover":
    case "pointerout":
      lr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      or.delete(t.pointerId);
  }
}
function Dn(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = kr(t), t !== null && wi(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Rf(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return Ct = Dn(Ct, e, t, n, r, l), !0;
    case "dragenter":
      return _t = Dn(_t, e, t, n, r, l), !0;
    case "mouseover":
      return Nt = Dn(Nt, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return lr.set(o, Dn(lr.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, or.set(o, Dn(or.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function sa(e) {
  var t = Wt(e.target);
  if (t !== null) {
    var n = qt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Zs(n), t !== null) {
          e.blockedOn = t, ua(e.priority, function() {
            oa(n);
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
function Br(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Ro(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      zo = r, n.target.dispatchEvent(r), zo = null;
    } else return t = kr(n), t !== null && wi(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function xu(e, t, n) {
  Br(e) && n.delete(t);
}
function If() {
  Mo = !1, Ct !== null && Br(Ct) && (Ct = null), _t !== null && Br(_t) && (_t = null), Nt !== null && Br(Nt) && (Nt = null), lr.forEach(xu), or.forEach(xu);
}
function Fn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Mo || (Mo = !0, Te.unstable_scheduleCallback(Te.unstable_NormalPriority, If)));
}
function ir(e) {
  function t(l) {
    return Fn(l, e);
  }
  if (0 < Tr.length) {
    Fn(Tr[0], e);
    for (var n = 1; n < Tr.length; n++) {
      var r = Tr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (Ct !== null && Fn(Ct, e), _t !== null && Fn(_t, e), Nt !== null && Fn(Nt, e), lr.forEach(t), or.forEach(t), n = 0; n < wt.length; n++) r = wt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < wt.length && (n = wt[0], n.blockedOn === null); ) sa(n), n.blockedOn === null && wt.shift();
}
var yn = pt.ReactCurrentBatchConfig, rl = !0;
function Of(e, t, n, r) {
  var l = U, o = yn.transition;
  yn.transition = null;
  try {
    U = 1, ki(e, t, n, r);
  } finally {
    U = l, yn.transition = o;
  }
}
function Df(e, t, n, r) {
  var l = U, o = yn.transition;
  yn.transition = null;
  try {
    U = 4, ki(e, t, n, r);
  } finally {
    U = l, yn.transition = o;
  }
}
function ki(e, t, n, r) {
  if (rl) {
    var l = Ro(e, t, n, r);
    if (l === null) no(e, t, r, ll, n), yu(e, r);
    else if (Rf(l, e, t, n, r)) r.stopPropagation();
    else if (yu(e, r), t & 4 && -1 < Mf.indexOf(e)) {
      for (; l !== null; ) {
        var o = kr(l);
        if (o !== null && la(o), o = Ro(e, t, n, r), o === null && no(e, t, r, ll, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else no(e, t, r, null, n);
  }
}
var ll = null;
function Ro(e, t, n, r) {
  if (ll = null, e = vi(r), e = Wt(e), e !== null) if (t = qt(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Zs(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return ll = e, null;
}
function aa(e) {
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
      switch (Ef()) {
        case yi:
          return 1;
        case ea:
          return 4;
        case tl:
        case Cf:
          return 16;
        case ta:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var St = null, Si = null, Vr = null;
function ca() {
  if (Vr) return Vr;
  var e, t = Si, n = t.length, r, l = "value" in St ? St.value : St.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return Vr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Hr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Pr() {
  return !0;
}
function wu() {
  return !1;
}
function Le(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var u in e) e.hasOwnProperty(u) && (n = e[u], this[u] = n ? n(o) : o[u]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Pr : wu, this.isPropagationStopped = wu, this;
  }
  return X(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Pr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Pr);
  }, persist: function() {
  }, isPersistent: Pr }), t;
}
var Tn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Ei = Le(Tn), wr = X({}, Tn, { view: 0, detail: 0 }), Ff = Le(wr), Xl, Yl, Un, Cl = X({}, wr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ci, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Un && (Un && e.type === "mousemove" ? (Xl = e.screenX - Un.screenX, Yl = e.screenY - Un.screenY) : Yl = Xl = 0, Un = e), Xl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Yl;
} }), ku = Le(Cl), Uf = X({}, Cl, { dataTransfer: 0 }), Af = Le(Uf), $f = X({}, wr, { relatedTarget: 0 }), Gl = Le($f), Wf = X({}, Tn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Bf = Le(Wf), Vf = X({}, Tn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Hf = Le(Vf), Qf = X({}, Tn, { data: 0 }), Su = Le(Qf), Kf = {
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
}, Xf = {
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
}, Yf = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Gf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Yf[e]) ? !!t[e] : !1;
}
function Ci() {
  return Gf;
}
var Zf = X({}, wr, { key: function(e) {
  if (e.key) {
    var t = Kf[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Hr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Xf[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ci, charCode: function(e) {
  return e.type === "keypress" ? Hr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Hr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Jf = Le(Zf), qf = X({}, Cl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Eu = Le(qf), bf = X({}, wr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ci }), ed = Le(bf), td = X({}, Tn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), nd = Le(td), rd = X({}, Cl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), ld = Le(rd), od = [9, 13, 27, 32], _i = at && "CompositionEvent" in window, Yn = null;
at && "documentMode" in document && (Yn = document.documentMode);
var id = at && "TextEvent" in window && !Yn, fa = at && (!_i || Yn && 8 < Yn && 11 >= Yn), Cu = " ", _u = !1;
function da(e, t) {
  switch (e) {
    case "keyup":
      return od.indexOf(t.keyCode) !== -1;
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
function pa(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var ln = !1;
function ud(e, t) {
  switch (e) {
    case "compositionend":
      return pa(t);
    case "keypress":
      return t.which !== 32 ? null : (_u = !0, Cu);
    case "textInput":
      return e = t.data, e === Cu && _u ? null : e;
    default:
      return null;
  }
}
function sd(e, t) {
  if (ln) return e === "compositionend" || !_i && da(e, t) ? (e = ca(), Vr = Si = St = null, ln = !1, e) : null;
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
      return fa && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var ad = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Nu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!ad[e.type] : t === "textarea";
}
function ma(e, t, n, r) {
  Qs(r), t = ol(t, "onChange"), 0 < t.length && (n = new Ei("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Gn = null, ur = null;
function cd(e) {
  _a(e, 0);
}
function _l(e) {
  var t = sn(e);
  if (Us(t)) return e;
}
function fd(e, t) {
  if (e === "change") return t;
}
var ha = !1;
if (at) {
  var Zl;
  if (at) {
    var Jl = "oninput" in document;
    if (!Jl) {
      var zu = document.createElement("div");
      zu.setAttribute("oninput", "return;"), Jl = typeof zu.oninput == "function";
    }
    Zl = Jl;
  } else Zl = !1;
  ha = Zl && (!document.documentMode || 9 < document.documentMode);
}
function ju() {
  Gn && (Gn.detachEvent("onpropertychange", ga), ur = Gn = null);
}
function ga(e) {
  if (e.propertyName === "value" && _l(ur)) {
    var t = [];
    ma(t, ur, e, vi(e)), Gs(cd, t);
  }
}
function dd(e, t, n) {
  e === "focusin" ? (ju(), Gn = t, ur = n, Gn.attachEvent("onpropertychange", ga)) : e === "focusout" && ju();
}
function pd(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return _l(ur);
}
function md(e, t) {
  if (e === "click") return _l(t);
}
function hd(e, t) {
  if (e === "input" || e === "change") return _l(t);
}
function gd(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Xe = typeof Object.is == "function" ? Object.is : gd;
function sr(e, t) {
  if (Xe(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ho.call(t, l) || !Xe(e[l], t[l])) return !1;
  }
  return !0;
}
function Tu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Pu(e, t) {
  var n = Tu(e);
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
    n = Tu(n);
  }
}
function va(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? va(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function ya() {
  for (var e = window, t = qr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch (r) {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = qr(e.document);
  }
  return t;
}
function Ni(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function vd(e) {
  var t = ya(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && va(n.ownerDocument.documentElement, n)) {
    if (r !== null && Ni(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = Pu(n, o);
        var i = Pu(
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
var yd = at && "documentMode" in document && 11 >= document.documentMode, on = null, Io = null, Zn = null, Oo = !1;
function Lu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Oo || on == null || on !== qr(r) || (r = on, "selectionStart" in r && Ni(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Zn && sr(Zn, r) || (Zn = r, r = ol(Io, "onSelect"), 0 < r.length && (t = new Ei("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = on)));
}
function Lr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var un = { animationend: Lr("Animation", "AnimationEnd"), animationiteration: Lr("Animation", "AnimationIteration"), animationstart: Lr("Animation", "AnimationStart"), transitionend: Lr("Transition", "TransitionEnd") }, ql = {}, xa = {};
at && (xa = document.createElement("div").style, "AnimationEvent" in window || (delete un.animationend.animation, delete un.animationiteration.animation, delete un.animationstart.animation), "TransitionEvent" in window || delete un.transitionend.transition);
function Nl(e) {
  if (ql[e]) return ql[e];
  if (!un[e]) return e;
  var t = un[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in xa) return ql[e] = t[n];
  return e;
}
var wa = Nl("animationend"), ka = Nl("animationiteration"), Sa = Nl("animationstart"), Ea = Nl("transitionend"), Ca = /* @__PURE__ */ new Map(), Mu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function It(e, t) {
  Ca.set(e, t), Jt(t, [e]);
}
for (var bl = 0; bl < Mu.length; bl++) {
  var eo = Mu[bl], xd = eo.toLowerCase(), wd = eo[0].toUpperCase() + eo.slice(1);
  It(xd, "on" + wd);
}
It(wa, "onAnimationEnd");
It(ka, "onAnimationIteration");
It(Sa, "onAnimationStart");
It("dblclick", "onDoubleClick");
It("focusin", "onFocus");
It("focusout", "onBlur");
It(Ea, "onTransitionEnd");
kn("onMouseEnter", ["mouseout", "mouseover"]);
kn("onMouseLeave", ["mouseout", "mouseover"]);
kn("onPointerEnter", ["pointerout", "pointerover"]);
kn("onPointerLeave", ["pointerout", "pointerover"]);
Jt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Jt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Jt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Jt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Jt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Jt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Qn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), kd = new Set("cancel close invalid load scroll toggle".split(" ").concat(Qn));
function Ru(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, xf(r, t, void 0, e), e.currentTarget = null;
}
function _a(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var u = r[i], s = u.instance, a = u.currentTarget;
        if (u = u.listener, s !== o && l.isPropagationStopped()) break e;
        Ru(l, u, a), o = s;
      }
      else for (i = 0; i < r.length; i++) {
        if (u = r[i], s = u.instance, a = u.currentTarget, u = u.listener, s !== o && l.isPropagationStopped()) break e;
        Ru(l, u, a), o = s;
      }
    }
  }
  if (el) throw e = Po, el = !1, Po = null, e;
}
function $(e, t) {
  var n = t[$o];
  n === void 0 && (n = t[$o] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Na(t, e, 2, !1), n.add(r));
}
function to(e, t, n) {
  var r = 0;
  t && (r |= 4), Na(n, e, r, t);
}
var Mr = "_reactListening" + Math.random().toString(36).slice(2);
function ar(e) {
  if (!e[Mr]) {
    e[Mr] = !0, Rs.forEach(function(n) {
      n !== "selectionchange" && (kd.has(n) || to(n, !1, e), to(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Mr] || (t[Mr] = !0, to("selectionchange", !1, t));
  }
}
function Na(e, t, n, r) {
  switch (aa(t)) {
    case 1:
      var l = Of;
      break;
    case 4:
      l = Df;
      break;
    default:
      l = ki;
  }
  n = l.bind(null, t, n, e), l = void 0, !To || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function no(e, t, n, r, l) {
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
        if (i = Wt(u), i === null) return;
        if (s = i.tag, s === 5 || s === 6) {
          r = o = i;
          continue e;
        }
        u = u.parentNode;
      }
    }
    r = r.return;
  }
  Gs(function() {
    var a = o, m = vi(n), h = [];
    e: {
      var p = Ca.get(e);
      if (p !== void 0) {
        var y = Ei, w = e;
        switch (e) {
          case "keypress":
            if (Hr(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = Jf;
            break;
          case "focusin":
            w = "focus", y = Gl;
            break;
          case "focusout":
            w = "blur", y = Gl;
            break;
          case "beforeblur":
          case "afterblur":
            y = Gl;
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
            y = ku;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = Af;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = ed;
            break;
          case wa:
          case ka:
          case Sa:
            y = Bf;
            break;
          case Ea:
            y = nd;
            break;
          case "scroll":
            y = Ff;
            break;
          case "wheel":
            y = ld;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = Hf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = Eu;
        }
        var k = (t & 4) !== 0, F = !k && e === "scroll", f = k ? p !== null ? p + "Capture" : null : p;
        k = [];
        for (var c = a, d; c !== null; ) {
          d = c;
          var v = d.stateNode;
          if (d.tag === 5 && v !== null && (d = v, f !== null && (v = rr(c, f), v != null && k.push(cr(c, v, d)))), F) break;
          c = c.return;
        }
        0 < k.length && (p = new y(p, w, null, n, m), h.push({ event: p, listeners: k }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (p = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", p && n !== zo && (w = n.relatedTarget || n.fromElement) && (Wt(w) || w[ct])) break e;
        if ((y || p) && (p = m.window === m ? m : (p = m.ownerDocument) ? p.defaultView || p.parentWindow : window, y ? (w = n.relatedTarget || n.toElement, y = a, w = w ? Wt(w) : null, w !== null && (F = qt(w), w !== F || w.tag !== 5 && w.tag !== 6) && (w = null)) : (y = null, w = a), y !== w)) {
          if (k = ku, v = "onMouseLeave", f = "onMouseEnter", c = "mouse", (e === "pointerout" || e === "pointerover") && (k = Eu, v = "onPointerLeave", f = "onPointerEnter", c = "pointer"), F = y == null ? p : sn(y), d = w == null ? p : sn(w), p = new k(v, c + "leave", y, n, m), p.target = F, p.relatedTarget = d, v = null, Wt(m) === a && (k = new k(f, c + "enter", w, n, m), k.target = d, k.relatedTarget = F, v = k), F = v, y && w) t: {
            for (k = y, f = w, c = 0, d = k; d; d = tn(d)) c++;
            for (d = 0, v = f; v; v = tn(v)) d++;
            for (; 0 < c - d; ) k = tn(k), c--;
            for (; 0 < d - c; ) f = tn(f), d--;
            for (; c--; ) {
              if (k === f || f !== null && k === f.alternate) break t;
              k = tn(k), f = tn(f);
            }
            k = null;
          }
          else k = null;
          y !== null && Iu(h, p, y, k, !1), w !== null && F !== null && Iu(h, F, w, k, !0);
        }
      }
      e: {
        if (p = a ? sn(a) : window, y = p.nodeName && p.nodeName.toLowerCase(), y === "select" || y === "input" && p.type === "file") var S = fd;
        else if (Nu(p)) if (ha) S = hd;
        else {
          S = pd;
          var z = dd;
        }
        else (y = p.nodeName) && y.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (S = md);
        if (S && (S = S(e, a))) {
          ma(h, S, n, m);
          break e;
        }
        z && z(e, p, a), e === "focusout" && (z = p._wrapperState) && z.controlled && p.type === "number" && So(p, "number", p.value);
      }
      switch (z = a ? sn(a) : window, e) {
        case "focusin":
          (Nu(z) || z.contentEditable === "true") && (on = z, Io = a, Zn = null);
          break;
        case "focusout":
          Zn = Io = on = null;
          break;
        case "mousedown":
          Oo = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Oo = !1, Lu(h, n, m);
          break;
        case "selectionchange":
          if (yd) break;
        case "keydown":
        case "keyup":
          Lu(h, n, m);
      }
      var _;
      if (_i) e: {
        switch (e) {
          case "compositionstart":
            var j = "onCompositionStart";
            break e;
          case "compositionend":
            j = "onCompositionEnd";
            break e;
          case "compositionupdate":
            j = "onCompositionUpdate";
            break e;
        }
        j = void 0;
      }
      else ln ? da(e, n) && (j = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (j = "onCompositionStart");
      j && (fa && n.locale !== "ko" && (ln || j !== "onCompositionStart" ? j === "onCompositionEnd" && ln && (_ = ca()) : (St = m, Si = "value" in St ? St.value : St.textContent, ln = !0)), z = ol(a, j), 0 < z.length && (j = new Su(j, e, null, n, m), h.push({ event: j, listeners: z }), _ ? j.data = _ : (_ = pa(n), _ !== null && (j.data = _)))), (_ = id ? ud(e, n) : sd(e, n)) && (a = ol(a, "onBeforeInput"), 0 < a.length && (m = new Su("onBeforeInput", "beforeinput", null, n, m), h.push({ event: m, listeners: a }), m.data = _));
    }
    _a(h, t);
  });
}
function cr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ol(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = rr(e, n), o != null && r.unshift(cr(e, o, l)), o = rr(e, t), o != null && r.push(cr(e, o, l))), e = e.return;
  }
  return r;
}
function tn(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Iu(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var u = n, s = u.alternate, a = u.stateNode;
    if (s !== null && s === r) break;
    u.tag === 5 && a !== null && (u = a, l ? (s = rr(n, o), s != null && i.unshift(cr(n, s, u))) : l || (s = rr(n, o), s != null && i.push(cr(n, s, u)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var Sd = /\r\n?/g, Ed = /\u0000|\uFFFD/g;
function Ou(e) {
  return (typeof e == "string" ? e : "" + e).replace(Sd, `
`).replace(Ed, "");
}
function Rr(e, t, n) {
  if (t = Ou(t), Ou(e) !== t && n) throw Error(x(425));
}
function il() {
}
var Do = null, Fo = null;
function Uo(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Ao = typeof setTimeout == "function" ? setTimeout : void 0, Cd = typeof clearTimeout == "function" ? clearTimeout : void 0, Du = typeof Promise == "function" ? Promise : void 0, _d = typeof queueMicrotask == "function" ? queueMicrotask : typeof Du != "undefined" ? function(e) {
  return Du.resolve(null).then(e).catch(Nd);
} : Ao;
function Nd(e) {
  setTimeout(function() {
    throw e;
  });
}
function ro(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), ir(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  ir(t);
}
function zt(e) {
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
function Fu(e) {
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
var Pn = Math.random().toString(36).slice(2), qe = "__reactFiber$" + Pn, fr = "__reactProps$" + Pn, ct = "__reactContainer$" + Pn, $o = "__reactEvents$" + Pn, zd = "__reactListeners$" + Pn, jd = "__reactHandles$" + Pn;
function Wt(e) {
  var t = e[qe];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[ct] || n[qe]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Fu(e); e !== null; ) {
        if (n = e[qe]) return n;
        e = Fu(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function kr(e) {
  return e = e[qe] || e[ct], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function sn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(x(33));
}
function zl(e) {
  return e[fr] || null;
}
var Wo = [], an = -1;
function Ot(e) {
  return { current: e };
}
function W(e) {
  0 > an || (e.current = Wo[an], Wo[an] = null, an--);
}
function A(e, t) {
  an++, Wo[an] = e.current, e.current = t;
}
var Rt = {}, de = Ot(Rt), Se = Ot(!1), Kt = Rt;
function Sn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Rt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Ee(e) {
  return e = e.childContextTypes, e != null;
}
function ul() {
  W(Se), W(de);
}
function Uu(e, t, n) {
  if (de.current !== Rt) throw Error(x(168));
  A(de, t), A(Se, n);
}
function za(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(x(108, df(e) || "Unknown", l));
  return X({}, n, r);
}
function sl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Rt, Kt = de.current, A(de, e), A(Se, Se.current), !0;
}
function Au(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(x(169));
  n ? (e = za(e, t, Kt), r.__reactInternalMemoizedMergedChildContext = e, W(Se), W(de), A(de, e)) : W(Se), A(Se, n);
}
var ot = null, jl = !1, lo = !1;
function ja(e) {
  ot === null ? ot = [e] : ot.push(e);
}
function Td(e) {
  jl = !0, ja(e);
}
function Dt() {
  if (!lo && ot !== null) {
    lo = !0;
    var e = 0, t = U;
    try {
      var n = ot;
      for (U = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      ot = null, jl = !1;
    } catch (l) {
      throw ot !== null && (ot = ot.slice(e + 1)), bs(yi, Dt), l;
    } finally {
      U = t, lo = !1;
    }
  }
  return null;
}
var cn = [], fn = 0, al = null, cl = 0, Re = [], Ie = 0, Xt = null, it = 1, ut = "";
function At(e, t) {
  cn[fn++] = cl, cn[fn++] = al, al = e, cl = t;
}
function Ta(e, t, n) {
  Re[Ie++] = it, Re[Ie++] = ut, Re[Ie++] = Xt, Xt = e;
  var r = it;
  e = ut;
  var l = 32 - Qe(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - Qe(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, it = 1 << 32 - Qe(t) + l | n << l | r, ut = o + e;
  } else it = 1 << o | n << l | r, ut = e;
}
function zi(e) {
  e.return !== null && (At(e, 1), Ta(e, 1, 0));
}
function ji(e) {
  for (; e === al; ) al = cn[--fn], cn[fn] = null, cl = cn[--fn], cn[fn] = null;
  for (; e === Xt; ) Xt = Re[--Ie], Re[Ie] = null, ut = Re[--Ie], Re[Ie] = null, it = Re[--Ie], Re[Ie] = null;
}
var je = null, ze = null, V = !1, He = null;
function Pa(e, t) {
  var n = Oe(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function $u(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, je = e, ze = zt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, je = e, ze = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Xt !== null ? { id: it, overflow: ut } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Oe(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, je = e, ze = null, !0) : !1;
    default:
      return !1;
  }
}
function Bo(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Vo(e) {
  if (V) {
    var t = ze;
    if (t) {
      var n = t;
      if (!$u(e, t)) {
        if (Bo(e)) throw Error(x(418));
        t = zt(n.nextSibling);
        var r = je;
        t && $u(e, t) ? Pa(r, n) : (e.flags = e.flags & -4097 | 2, V = !1, je = e);
      }
    } else {
      if (Bo(e)) throw Error(x(418));
      e.flags = e.flags & -4097 | 2, V = !1, je = e;
    }
  }
}
function Wu(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  je = e;
}
function Ir(e) {
  if (e !== je) return !1;
  if (!V) return Wu(e), V = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Uo(e.type, e.memoizedProps)), t && (t = ze)) {
    if (Bo(e)) throw La(), Error(x(418));
    for (; t; ) Pa(e, t), t = zt(t.nextSibling);
  }
  if (Wu(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(x(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ze = zt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      ze = null;
    }
  } else ze = je ? zt(e.stateNode.nextSibling) : null;
  return !0;
}
function La() {
  for (var e = ze; e; ) e = zt(e.nextSibling);
}
function En() {
  ze = je = null, V = !1;
}
function Ti(e) {
  He === null ? He = [e] : He.push(e);
}
var Pd = pt.ReactCurrentBatchConfig;
function An(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(x(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(x(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var u = l.refs;
        i === null ? delete u[o] : u[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(x(284));
    if (!n._owner) throw Error(x(290, e));
  }
  return e;
}
function Or(e, t) {
  throw e = Object.prototype.toString.call(t), Error(x(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Bu(e) {
  var t = e._init;
  return t(e._payload);
}
function Ma(e) {
  function t(f, c) {
    if (e) {
      var d = f.deletions;
      d === null ? (f.deletions = [c], f.flags |= 16) : d.push(c);
    }
  }
  function n(f, c) {
    if (!e) return null;
    for (; c !== null; ) t(f, c), c = c.sibling;
    return null;
  }
  function r(f, c) {
    for (f = /* @__PURE__ */ new Map(); c !== null; ) c.key !== null ? f.set(c.key, c) : f.set(c.index, c), c = c.sibling;
    return f;
  }
  function l(f, c) {
    return f = Lt(f, c), f.index = 0, f.sibling = null, f;
  }
  function o(f, c, d) {
    return f.index = d, e ? (d = f.alternate, d !== null ? (d = d.index, d < c ? (f.flags |= 2, c) : d) : (f.flags |= 2, c)) : (f.flags |= 1048576, c);
  }
  function i(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function u(f, c, d, v) {
    return c === null || c.tag !== 6 ? (c = fo(d, f.mode, v), c.return = f, c) : (c = l(c, d), c.return = f, c);
  }
  function s(f, c, d, v) {
    var S = d.type;
    return S === rn ? m(f, c, d.props.children, v, d.key) : c !== null && (c.elementType === S || typeof S == "object" && S !== null && S.$$typeof === yt && Bu(S) === c.type) ? (v = l(c, d.props), v.ref = An(f, c, d), v.return = f, v) : (v = Jr(d.type, d.key, d.props, null, f.mode, v), v.ref = An(f, c, d), v.return = f, v);
  }
  function a(f, c, d, v) {
    return c === null || c.tag !== 4 || c.stateNode.containerInfo !== d.containerInfo || c.stateNode.implementation !== d.implementation ? (c = po(d, f.mode, v), c.return = f, c) : (c = l(c, d.children || []), c.return = f, c);
  }
  function m(f, c, d, v, S) {
    return c === null || c.tag !== 7 ? (c = Qt(d, f.mode, v, S), c.return = f, c) : (c = l(c, d), c.return = f, c);
  }
  function h(f, c, d) {
    if (typeof c == "string" && c !== "" || typeof c == "number") return c = fo("" + c, f.mode, d), c.return = f, c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case Cr:
          return d = Jr(c.type, c.key, c.props, null, f.mode, d), d.ref = An(f, null, c), d.return = f, d;
        case nn:
          return c = po(c, f.mode, d), c.return = f, c;
        case yt:
          var v = c._init;
          return h(f, v(c._payload), d);
      }
      if (Vn(c) || In(c)) return c = Qt(c, f.mode, d, null), c.return = f, c;
      Or(f, c);
    }
    return null;
  }
  function p(f, c, d, v) {
    var S = c !== null ? c.key : null;
    if (typeof d == "string" && d !== "" || typeof d == "number") return S !== null ? null : u(f, c, "" + d, v);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case Cr:
          return d.key === S ? s(f, c, d, v) : null;
        case nn:
          return d.key === S ? a(f, c, d, v) : null;
        case yt:
          return S = d._init, p(
            f,
            c,
            S(d._payload),
            v
          );
      }
      if (Vn(d) || In(d)) return S !== null ? null : m(f, c, d, v, null);
      Or(f, d);
    }
    return null;
  }
  function y(f, c, d, v, S) {
    if (typeof v == "string" && v !== "" || typeof v == "number") return f = f.get(d) || null, u(c, f, "" + v, S);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Cr:
          return f = f.get(v.key === null ? d : v.key) || null, s(c, f, v, S);
        case nn:
          return f = f.get(v.key === null ? d : v.key) || null, a(c, f, v, S);
        case yt:
          var z = v._init;
          return y(f, c, d, z(v._payload), S);
      }
      if (Vn(v) || In(v)) return f = f.get(d) || null, m(c, f, v, S, null);
      Or(c, v);
    }
    return null;
  }
  function w(f, c, d, v) {
    for (var S = null, z = null, _ = c, j = c = 0, Y = null; _ !== null && j < d.length; j++) {
      _.index > j ? (Y = _, _ = null) : Y = _.sibling;
      var I = p(f, _, d[j], v);
      if (I === null) {
        _ === null && (_ = Y);
        break;
      }
      e && _ && I.alternate === null && t(f, _), c = o(I, c, j), z === null ? S = I : z.sibling = I, z = I, _ = Y;
    }
    if (j === d.length) return n(f, _), V && At(f, j), S;
    if (_ === null) {
      for (; j < d.length; j++) _ = h(f, d[j], v), _ !== null && (c = o(_, c, j), z === null ? S = _ : z.sibling = _, z = _);
      return V && At(f, j), S;
    }
    for (_ = r(f, _); j < d.length; j++) Y = y(_, f, j, d[j], v), Y !== null && (e && Y.alternate !== null && _.delete(Y.key === null ? j : Y.key), c = o(Y, c, j), z === null ? S = Y : z.sibling = Y, z = Y);
    return e && _.forEach(function(ye) {
      return t(f, ye);
    }), V && At(f, j), S;
  }
  function k(f, c, d, v) {
    var S = In(d);
    if (typeof S != "function") throw Error(x(150));
    if (d = S.call(d), d == null) throw Error(x(151));
    for (var z = S = null, _ = c, j = c = 0, Y = null, I = d.next(); _ !== null && !I.done; j++, I = d.next()) {
      _.index > j ? (Y = _, _ = null) : Y = _.sibling;
      var ye = p(f, _, I.value, v);
      if (ye === null) {
        _ === null && (_ = Y);
        break;
      }
      e && _ && ye.alternate === null && t(f, _), c = o(ye, c, j), z === null ? S = ye : z.sibling = ye, z = ye, _ = Y;
    }
    if (I.done) return n(
      f,
      _
    ), V && At(f, j), S;
    if (_ === null) {
      for (; !I.done; j++, I = d.next()) I = h(f, I.value, v), I !== null && (c = o(I, c, j), z === null ? S = I : z.sibling = I, z = I);
      return V && At(f, j), S;
    }
    for (_ = r(f, _); !I.done; j++, I = d.next()) I = y(_, f, j, I.value, v), I !== null && (e && I.alternate !== null && _.delete(I.key === null ? j : I.key), c = o(I, c, j), z === null ? S = I : z.sibling = I, z = I);
    return e && _.forEach(function(se) {
      return t(f, se);
    }), V && At(f, j), S;
  }
  function F(f, c, d, v) {
    if (typeof d == "object" && d !== null && d.type === rn && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case Cr:
          e: {
            for (var S = d.key, z = c; z !== null; ) {
              if (z.key === S) {
                if (S = d.type, S === rn) {
                  if (z.tag === 7) {
                    n(f, z.sibling), c = l(z, d.props.children), c.return = f, f = c;
                    break e;
                  }
                } else if (z.elementType === S || typeof S == "object" && S !== null && S.$$typeof === yt && Bu(S) === z.type) {
                  n(f, z.sibling), c = l(z, d.props), c.ref = An(f, z, d), c.return = f, f = c;
                  break e;
                }
                n(f, z);
                break;
              } else t(f, z);
              z = z.sibling;
            }
            d.type === rn ? (c = Qt(d.props.children, f.mode, v, d.key), c.return = f, f = c) : (v = Jr(d.type, d.key, d.props, null, f.mode, v), v.ref = An(f, c, d), v.return = f, f = v);
          }
          return i(f);
        case nn:
          e: {
            for (z = d.key; c !== null; ) {
              if (c.key === z) if (c.tag === 4 && c.stateNode.containerInfo === d.containerInfo && c.stateNode.implementation === d.implementation) {
                n(f, c.sibling), c = l(c, d.children || []), c.return = f, f = c;
                break e;
              } else {
                n(f, c);
                break;
              }
              else t(f, c);
              c = c.sibling;
            }
            c = po(d, f.mode, v), c.return = f, f = c;
          }
          return i(f);
        case yt:
          return z = d._init, F(f, c, z(d._payload), v);
      }
      if (Vn(d)) return w(f, c, d, v);
      if (In(d)) return k(f, c, d, v);
      Or(f, d);
    }
    return typeof d == "string" && d !== "" || typeof d == "number" ? (d = "" + d, c !== null && c.tag === 6 ? (n(f, c.sibling), c = l(c, d), c.return = f, f = c) : (n(f, c), c = fo(d, f.mode, v), c.return = f, f = c), i(f)) : n(f, c);
  }
  return F;
}
var Cn = Ma(!0), Ra = Ma(!1), fl = Ot(null), dl = null, dn = null, Pi = null;
function Li() {
  Pi = dn = dl = null;
}
function Mi(e) {
  var t = fl.current;
  W(fl), e._currentValue = t;
}
function Ho(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function xn(e, t) {
  dl = e, Pi = dn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (ke = !0), e.firstContext = null);
}
function Fe(e) {
  var t = e._currentValue;
  if (Pi !== e) if (e = { context: e, memoizedValue: t, next: null }, dn === null) {
    if (dl === null) throw Error(x(308));
    dn = e, dl.dependencies = { lanes: 0, firstContext: e };
  } else dn = dn.next = e;
  return t;
}
var Bt = null;
function Ri(e) {
  Bt === null ? Bt = [e] : Bt.push(e);
}
function Ia(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Ri(t)) : (n.next = l.next, l.next = n), t.interleaved = n, ft(e, r);
}
function ft(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var xt = !1;
function Ii(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Oa(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function st(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function jt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, D & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, ft(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Ri(r)) : (t.next = l.next, l.next = t), r.interleaved = t, ft(e, n);
}
function Qr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, xi(e, n);
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
function pl(e, t, n, r) {
  var l = e.updateQueue;
  xt = !1;
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var s = u, a = s.next;
    s.next = null, i === null ? o = a : i.next = a, i = s;
    var m = e.alternate;
    m !== null && (m = m.updateQueue, u = m.lastBaseUpdate, u !== i && (u === null ? m.firstBaseUpdate = a : u.next = a, m.lastBaseUpdate = s));
  }
  if (o !== null) {
    var h = l.baseState;
    i = 0, m = a = s = null, u = o;
    do {
      var p = u.lane, y = u.eventTime;
      if ((r & p) === p) {
        m !== null && (m = m.next = {
          eventTime: y,
          lane: 0,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null
        });
        e: {
          var w = e, k = u;
          switch (p = t, y = n, k.tag) {
            case 1:
              if (w = k.payload, typeof w == "function") {
                h = w.call(y, h, p);
                break e;
              }
              h = w;
              break e;
            case 3:
              w.flags = w.flags & -65537 | 128;
            case 0:
              if (w = k.payload, p = typeof w == "function" ? w.call(y, h, p) : w, p == null) break e;
              h = X({}, h, p);
              break e;
            case 2:
              xt = !0;
          }
        }
        u.callback !== null && u.lane !== 0 && (e.flags |= 64, p = l.effects, p === null ? l.effects = [u] : p.push(u));
      } else y = { eventTime: y, lane: p, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, m === null ? (a = m = y, s = h) : m = m.next = y, i |= p;
      if (u = u.next, u === null) {
        if (u = l.shared.pending, u === null) break;
        p = u, u = p.next, p.next = null, l.lastBaseUpdate = p, l.shared.pending = null;
      }
    } while (!0);
    if (m === null && (s = h), l.baseState = s, l.firstBaseUpdate = a, l.lastBaseUpdate = m, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    Gt |= i, e.lanes = i, e.memoizedState = h;
  }
}
function Hu(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(x(191, l));
      l.call(r);
    }
  }
}
var Sr = {}, et = Ot(Sr), dr = Ot(Sr), pr = Ot(Sr);
function Vt(e) {
  if (e === Sr) throw Error(x(174));
  return e;
}
function Oi(e, t) {
  switch (A(pr, t), A(dr, e), A(et, Sr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Co(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Co(t, e);
  }
  W(et), A(et, t);
}
function _n() {
  W(et), W(dr), W(pr);
}
function Da(e) {
  Vt(pr.current);
  var t = Vt(et.current), n = Co(t, e.type);
  t !== n && (A(dr, e), A(et, n));
}
function Di(e) {
  dr.current === e && (W(et), W(dr));
}
var Q = Ot(0);
function ml(e) {
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
var oo = [];
function Fi() {
  for (var e = 0; e < oo.length; e++) oo[e]._workInProgressVersionPrimary = null;
  oo.length = 0;
}
var Kr = pt.ReactCurrentDispatcher, io = pt.ReactCurrentBatchConfig, Yt = 0, K = null, te = null, re = null, hl = !1, Jn = !1, mr = 0, Ld = 0;
function ae() {
  throw Error(x(321));
}
function Ui(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Xe(e[n], t[n])) return !1;
  return !0;
}
function Ai(e, t, n, r, l, o) {
  if (Yt = o, K = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Kr.current = e === null || e.memoizedState === null ? Od : Dd, e = n(r, l), Jn) {
    o = 0;
    do {
      if (Jn = !1, mr = 0, 25 <= o) throw Error(x(301));
      o += 1, re = te = null, t.updateQueue = null, Kr.current = Fd, e = n(r, l);
    } while (Jn);
  }
  if (Kr.current = gl, t = te !== null && te.next !== null, Yt = 0, re = te = K = null, hl = !1, t) throw Error(x(300));
  return e;
}
function $i() {
  var e = mr !== 0;
  return mr = 0, e;
}
function Je() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return re === null ? K.memoizedState = re = e : re = re.next = e, re;
}
function Ue() {
  if (te === null) {
    var e = K.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = te.next;
  var t = re === null ? K.memoizedState : re.next;
  if (t !== null) re = t, te = e;
  else {
    if (e === null) throw Error(x(310));
    te = e, e = { memoizedState: te.memoizedState, baseState: te.baseState, baseQueue: te.baseQueue, queue: te.queue, next: null }, re === null ? K.memoizedState = re = e : re = re.next = e;
  }
  return re;
}
function hr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function uo(e) {
  var t = Ue(), n = t.queue;
  if (n === null) throw Error(x(311));
  n.lastRenderedReducer = e;
  var r = te, l = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      l.next = o.next, o.next = i;
    }
    r.baseQueue = l = o, n.pending = null;
  }
  if (l !== null) {
    o = l.next, r = r.baseState;
    var u = i = null, s = null, a = o;
    do {
      var m = a.lane;
      if ((Yt & m) === m) s !== null && (s = s.next = { lane: 0, action: a.action, hasEagerState: a.hasEagerState, eagerState: a.eagerState, next: null }), r = a.hasEagerState ? a.eagerState : e(r, a.action);
      else {
        var h = {
          lane: m,
          action: a.action,
          hasEagerState: a.hasEagerState,
          eagerState: a.eagerState,
          next: null
        };
        s === null ? (u = s = h, i = r) : s = s.next = h, K.lanes |= m, Gt |= m;
      }
      a = a.next;
    } while (a !== null && a !== o);
    s === null ? i = r : s.next = u, Xe(r, t.memoizedState) || (ke = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = s, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, K.lanes |= o, Gt |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function so(e) {
  var t = Ue(), n = t.queue;
  if (n === null) throw Error(x(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = l = l.next;
    do
      o = e(o, i.action), i = i.next;
    while (i !== l);
    Xe(o, t.memoizedState) || (ke = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function Fa() {
}
function Ua(e, t) {
  var n = K, r = Ue(), l = t(), o = !Xe(r.memoizedState, l);
  if (o && (r.memoizedState = l, ke = !0), r = r.queue, Wi(Wa.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || re !== null && re.memoizedState.tag & 1) {
    if (n.flags |= 2048, gr(9, $a.bind(null, n, r, l, t), void 0, null), le === null) throw Error(x(349));
    Yt & 30 || Aa(n, t, l);
  }
  return l;
}
function Aa(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = K.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, K.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function $a(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Ba(t) && Va(e);
}
function Wa(e, t, n) {
  return n(function() {
    Ba(t) && Va(e);
  });
}
function Ba(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Xe(e, n);
  } catch (r) {
    return !0;
  }
}
function Va(e) {
  var t = ft(e, 1);
  t !== null && Ke(t, e, 1, -1);
}
function Qu(e) {
  var t = Je();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: hr, lastRenderedState: e }, t.queue = e, e = e.dispatch = Id.bind(null, K, e), [t.memoizedState, e];
}
function gr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = K.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, K.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Ha() {
  return Ue().memoizedState;
}
function Xr(e, t, n, r) {
  var l = Je();
  K.flags |= e, l.memoizedState = gr(1 | t, n, void 0, r === void 0 ? null : r);
}
function Tl(e, t, n, r) {
  var l = Ue();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (te !== null) {
    var i = te.memoizedState;
    if (o = i.destroy, r !== null && Ui(r, i.deps)) {
      l.memoizedState = gr(t, n, o, r);
      return;
    }
  }
  K.flags |= e, l.memoizedState = gr(1 | t, n, o, r);
}
function Ku(e, t) {
  return Xr(8390656, 8, e, t);
}
function Wi(e, t) {
  return Tl(2048, 8, e, t);
}
function Qa(e, t) {
  return Tl(4, 2, e, t);
}
function Ka(e, t) {
  return Tl(4, 4, e, t);
}
function Xa(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Ya(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Tl(4, 4, Xa.bind(null, t, e), n);
}
function Bi() {
}
function Ga(e, t) {
  var n = Ue();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ui(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Za(e, t) {
  var n = Ue();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ui(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Ja(e, t, n) {
  return Yt & 21 ? (Xe(n, t) || (n = na(), K.lanes |= n, Gt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, ke = !0), e.memoizedState = n);
}
function Md(e, t) {
  var n = U;
  U = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = io.transition;
  io.transition = {};
  try {
    e(!1), t();
  } finally {
    U = n, io.transition = r;
  }
}
function qa() {
  return Ue().memoizedState;
}
function Rd(e, t, n) {
  var r = Pt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, ba(e)) ec(t, n);
  else if (n = Ia(e, t, n, r), n !== null) {
    var l = he();
    Ke(n, e, r, l), tc(n, t, r);
  }
}
function Id(e, t, n) {
  var r = Pt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (ba(e)) ec(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, u = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = u, Xe(u, i)) {
        var s = t.interleaved;
        s === null ? (l.next = l, Ri(t)) : (l.next = s.next, s.next = l), t.interleaved = l;
        return;
      }
    } catch (a) {
    } finally {
    }
    n = Ia(e, t, l, r), n !== null && (l = he(), Ke(n, e, r, l), tc(n, t, r));
  }
}
function ba(e) {
  var t = e.alternate;
  return e === K || t !== null && t === K;
}
function ec(e, t) {
  Jn = hl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function tc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, xi(e, n);
  }
}
var gl = { readContext: Fe, useCallback: ae, useContext: ae, useEffect: ae, useImperativeHandle: ae, useInsertionEffect: ae, useLayoutEffect: ae, useMemo: ae, useReducer: ae, useRef: ae, useState: ae, useDebugValue: ae, useDeferredValue: ae, useTransition: ae, useMutableSource: ae, useSyncExternalStore: ae, useId: ae, unstable_isNewReconciler: !1 }, Od = { readContext: Fe, useCallback: function(e, t) {
  return Je().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Fe, useEffect: Ku, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Xr(
    4194308,
    4,
    Xa.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Xr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Xr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Je();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Je();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Rd.bind(null, K, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Je();
  return e = { current: e }, t.memoizedState = e;
}, useState: Qu, useDebugValue: Bi, useDeferredValue: function(e) {
  return Je().memoizedState = e;
}, useTransition: function() {
  var e = Qu(!1), t = e[0];
  return e = Md.bind(null, e[1]), Je().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = K, l = Je();
  if (V) {
    if (n === void 0) throw Error(x(407));
    n = n();
  } else {
    if (n = t(), le === null) throw Error(x(349));
    Yt & 30 || Aa(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Ku(Wa.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, gr(9, $a.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Je(), t = le.identifierPrefix;
  if (V) {
    var n = ut, r = it;
    n = (r & ~(1 << 32 - Qe(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = mr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Ld++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Dd = {
  readContext: Fe,
  useCallback: Ga,
  useContext: Fe,
  useEffect: Wi,
  useImperativeHandle: Ya,
  useInsertionEffect: Qa,
  useLayoutEffect: Ka,
  useMemo: Za,
  useReducer: uo,
  useRef: Ha,
  useState: function() {
    return uo(hr);
  },
  useDebugValue: Bi,
  useDeferredValue: function(e) {
    var t = Ue();
    return Ja(t, te.memoizedState, e);
  },
  useTransition: function() {
    var e = uo(hr)[0], t = Ue().memoizedState;
    return [e, t];
  },
  useMutableSource: Fa,
  useSyncExternalStore: Ua,
  useId: qa,
  unstable_isNewReconciler: !1
}, Fd = { readContext: Fe, useCallback: Ga, useContext: Fe, useEffect: Wi, useImperativeHandle: Ya, useInsertionEffect: Qa, useLayoutEffect: Ka, useMemo: Za, useReducer: so, useRef: Ha, useState: function() {
  return so(hr);
}, useDebugValue: Bi, useDeferredValue: function(e) {
  var t = Ue();
  return te === null ? t.memoizedState = e : Ja(t, te.memoizedState, e);
}, useTransition: function() {
  var e = so(hr)[0], t = Ue().memoizedState;
  return [e, t];
}, useMutableSource: Fa, useSyncExternalStore: Ua, useId: qa, unstable_isNewReconciler: !1 };
function Be(e, t) {
  if (e && e.defaultProps) {
    t = X({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Qo(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : X({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Pl = { isMounted: function(e) {
  return (e = e._reactInternals) ? qt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = he(), l = Pt(e), o = st(r, l);
  o.payload = t, n != null && (o.callback = n), t = jt(e, o, l), t !== null && (Ke(t, e, l, r), Qr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = he(), l = Pt(e), o = st(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = jt(e, o, l), t !== null && (Ke(t, e, l, r), Qr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = he(), r = Pt(e), l = st(n, r);
  l.tag = 2, t != null && (l.callback = t), t = jt(e, l, r), t !== null && (Ke(t, e, r, n), Qr(t, e, r));
} };
function Xu(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !sr(n, r) || !sr(l, o) : !0;
}
function nc(e, t, n) {
  var r = !1, l = Rt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Fe(o) : (l = Ee(t) ? Kt : de.current, r = t.contextTypes, o = (r = r != null) ? Sn(e, l) : Rt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Pl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Yu(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Pl.enqueueReplaceState(t, t.state, null);
}
function Ko(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Ii(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = Fe(o) : (o = Ee(t) ? Kt : de.current, l.context = Sn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Qo(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && Pl.enqueueReplaceState(l, l.state, null), pl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Nn(e, t) {
  try {
    var n = "", r = t;
    do
      n += ff(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function ao(e, t, n) {
  return { value: e, source: null, stack: n != null ? n : null, digest: t != null ? t : null };
}
function Xo(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Ud = typeof WeakMap == "function" ? WeakMap : Map;
function rc(e, t, n) {
  n = st(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    yl || (yl = !0, ri = r), Xo(e, t);
  }, n;
}
function lc(e, t, n) {
  n = st(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Xo(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Xo(e, t), typeof r != "function" && (Tt === null ? Tt = /* @__PURE__ */ new Set([this]) : Tt.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function Gu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Ud();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = qd.bind(null, e, t, n), t.then(e, e));
}
function Zu(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ju(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = st(-1, 1), t.tag = 2, jt(n, t, 1))), n.lanes |= 1), e);
}
var Ad = pt.ReactCurrentOwner, ke = !1;
function me(e, t, n, r) {
  t.child = e === null ? Ra(t, null, n, r) : Cn(t, e.child, n, r);
}
function qu(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return xn(t, l), r = Ai(e, t, n, r, o, l), n = $i(), e !== null && !ke ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, dt(e, t, l)) : (V && n && zi(t), t.flags |= 1, me(e, t, r, l), t.child);
}
function bu(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Zi(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, oc(e, t, o, r, l)) : (e = Jr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : sr, n(i, r) && e.ref === t.ref) return dt(e, t, l);
  }
  return t.flags |= 1, e = Lt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function oc(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (sr(o, r) && e.ref === t.ref) if (ke = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (ke = !0);
    else return t.lanes = e.lanes, dt(e, t, l);
  }
  return Yo(e, t, n, r, l);
}
function ic(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, A(mn, Ne), Ne |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, A(mn, Ne), Ne |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, A(mn, Ne), Ne |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, A(mn, Ne), Ne |= r;
  return me(e, t, l, n), t.child;
}
function uc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Yo(e, t, n, r, l) {
  var o = Ee(n) ? Kt : de.current;
  return o = Sn(t, o), xn(t, l), n = Ai(e, t, n, r, o, l), r = $i(), e !== null && !ke ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, dt(e, t, l)) : (V && r && zi(t), t.flags |= 1, me(e, t, n, l), t.child);
}
function es(e, t, n, r, l) {
  if (Ee(n)) {
    var o = !0;
    sl(t);
  } else o = !1;
  if (xn(t, l), t.stateNode === null) Yr(e, t), nc(t, n, r), Ko(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, u = t.memoizedProps;
    i.props = u;
    var s = i.context, a = n.contextType;
    typeof a == "object" && a !== null ? a = Fe(a) : (a = Ee(n) ? Kt : de.current, a = Sn(t, a));
    var m = n.getDerivedStateFromProps, h = typeof m == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    h || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== r || s !== a) && Yu(t, i, r, a), xt = !1;
    var p = t.memoizedState;
    i.state = p, pl(t, r, i, l), s = t.memoizedState, u !== r || p !== s || Se.current || xt ? (typeof m == "function" && (Qo(t, n, m, r), s = t.memoizedState), (u = xt || Xu(t, n, u, r, p, s, a)) ? (h || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), i.props = r, i.state = s, i.context = a, r = u) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, Oa(e, t), u = t.memoizedProps, a = t.type === t.elementType ? u : Be(t.type, u), i.props = a, h = t.pendingProps, p = i.context, s = n.contextType, typeof s == "object" && s !== null ? s = Fe(s) : (s = Ee(n) ? Kt : de.current, s = Sn(t, s));
    var y = n.getDerivedStateFromProps;
    (m = typeof y == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== h || p !== s) && Yu(t, i, r, s), xt = !1, p = t.memoizedState, i.state = p, pl(t, r, i, l);
    var w = t.memoizedState;
    u !== h || p !== w || Se.current || xt ? (typeof y == "function" && (Qo(t, n, y, r), w = t.memoizedState), (a = xt || Xu(t, n, a, r, p, w, s) || !1) ? (m || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, w, s), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, w, s)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = w), i.props = r, i.state = w, i.context = s, r = a) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Go(e, t, n, r, o, l);
}
function Go(e, t, n, r, l, o) {
  uc(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && Au(t, n, !1), dt(e, t, o);
  r = t.stateNode, Ad.current = t;
  var u = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = Cn(t, e.child, null, o), t.child = Cn(t, null, u, o)) : me(e, t, u, o), t.memoizedState = r.state, l && Au(t, n, !0), t.child;
}
function sc(e) {
  var t = e.stateNode;
  t.pendingContext ? Uu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Uu(e, t.context, !1), Oi(e, t.containerInfo);
}
function ts(e, t, n, r, l) {
  return En(), Ti(l), t.flags |= 256, me(e, t, n, r), t.child;
}
var Zo = { dehydrated: null, treeContext: null, retryLane: 0 };
function Jo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function ac(e, t, n) {
  var r = t.pendingProps, l = Q.current, o = !1, i = (t.flags & 128) !== 0, u;
  if ((u = i) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), u ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), A(Q, l & 1), e === null)
    return Vo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = Rl(i, r, 0, null), e = Qt(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Jo(n), t.memoizedState = Zo, e) : Vi(t, i));
  if (l = e.memoizedState, l !== null && (u = l.dehydrated, u !== null)) return $d(e, t, i, r, u, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, u = l.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = Lt(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), u !== null ? o = Lt(u, o) : (o = Qt(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? Jo(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = Zo, r;
  }
  return o = e.child, e = o.sibling, r = Lt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Vi(e, t) {
  return t = Rl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Dr(e, t, n, r) {
  return r !== null && Ti(r), Cn(t, e.child, null, n), e = Vi(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function $d(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = ao(Error(x(422))), Dr(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Rl({ mode: "visible", children: r.children }, l, 0, null), o = Qt(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Cn(t, e.child, null, i), t.child.memoizedState = Jo(i), t.memoizedState = Zo, o);
  if (!(t.mode & 1)) return Dr(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var u = r.dgst;
    return r = u, o = Error(x(419)), r = ao(o, r, void 0), Dr(e, t, i, r);
  }
  if (u = (i & e.childLanes) !== 0, ke || u) {
    if (r = le, r !== null) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, ft(e, l), Ke(r, e, l, -1));
    }
    return Gi(), r = ao(Error(x(421))), Dr(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = bd.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, ze = zt(l.nextSibling), je = t, V = !0, He = null, e !== null && (Re[Ie++] = it, Re[Ie++] = ut, Re[Ie++] = Xt, it = e.id, ut = e.overflow, Xt = t), t = Vi(t, r.children), t.flags |= 4096, t);
}
function ns(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ho(e.return, t, n);
}
function co(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function cc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (me(e, t, r.children, n), r = Q.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && ns(e, n, t);
      else if (e.tag === 19) ns(e, n, t);
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
  if (A(Q, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && ml(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), co(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && ml(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      co(t, !0, n, null, o);
      break;
    case "together":
      co(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Yr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function dt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Gt |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(x(153));
  if (t.child !== null) {
    for (e = t.child, n = Lt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Lt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Wd(e, t, n) {
  switch (t.tag) {
    case 3:
      sc(t), En();
      break;
    case 5:
      Da(t);
      break;
    case 1:
      Ee(t.type) && sl(t);
      break;
    case 4:
      Oi(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      A(fl, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (A(Q, Q.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? ac(e, t, n) : (A(Q, Q.current & 1), e = dt(e, t, n), e !== null ? e.sibling : null);
      A(Q, Q.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return cc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), A(Q, Q.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, ic(e, t, n);
  }
  return dt(e, t, n);
}
var fc, qo, dc, pc;
fc = function(e, t) {
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
qo = function() {
};
dc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Vt(et.current);
    var o = null;
    switch (n) {
      case "input":
        l = wo(e, l), r = wo(e, r), o = [];
        break;
      case "select":
        l = X({}, l, { value: void 0 }), r = X({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = Eo(e, l), r = Eo(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = il);
    }
    _o(n, r);
    var i;
    n = null;
    for (a in l) if (!r.hasOwnProperty(a) && l.hasOwnProperty(a) && l[a] != null) if (a === "style") {
      var u = l[a];
      for (i in u) u.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else a !== "dangerouslySetInnerHTML" && a !== "children" && a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && a !== "autoFocus" && (tr.hasOwnProperty(a) ? o || (o = []) : (o = o || []).push(a, null));
    for (a in r) {
      var s = r[a];
      if (u = l != null ? l[a] : void 0, r.hasOwnProperty(a) && s !== u && (s != null || u != null)) if (a === "style") if (u) {
        for (i in u) !u.hasOwnProperty(i) || s && s.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in s) s.hasOwnProperty(i) && u[i] !== s[i] && (n || (n = {}), n[i] = s[i]);
      } else n || (o || (o = []), o.push(
        a,
        n
      )), n = s;
      else a === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, u = u ? u.__html : void 0, s != null && u !== s && (o = o || []).push(a, s)) : a === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(a, "" + s) : a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && (tr.hasOwnProperty(a) ? (s != null && a === "onScroll" && $("scroll", e), o || u === s || (o = [])) : (o = o || []).push(a, s));
    }
    n && (o = o || []).push("style", n);
    var a = o;
    (t.updateQueue = a) && (t.flags |= 4);
  }
};
pc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function $n(e, t) {
  if (!V) switch (e.tailMode) {
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
function ce(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Bd(e, t, n) {
  var r = t.pendingProps;
  switch (ji(t), t.tag) {
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
      return ce(t), null;
    case 1:
      return Ee(t.type) && ul(), ce(t), null;
    case 3:
      return r = t.stateNode, _n(), W(Se), W(de), Fi(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Ir(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, He !== null && (ii(He), He = null))), qo(e, t), ce(t), null;
    case 5:
      Di(t);
      var l = Vt(pr.current);
      if (n = t.type, e !== null && t.stateNode != null) dc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(x(166));
          return ce(t), null;
        }
        if (e = Vt(et.current), Ir(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[qe] = t, r[fr] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              $("cancel", r), $("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              $("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Qn.length; l++) $(Qn[l], r);
              break;
            case "source":
              $("error", r);
              break;
            case "img":
            case "image":
            case "link":
              $(
                "error",
                r
              ), $("load", r);
              break;
            case "details":
              $("toggle", r);
              break;
            case "input":
              fu(r, o), $("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, $("invalid", r);
              break;
            case "textarea":
              pu(r, o), $("invalid", r);
          }
          _o(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var u = o[i];
            i === "children" ? typeof u == "string" ? r.textContent !== u && (o.suppressHydrationWarning !== !0 && Rr(r.textContent, u, e), l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (o.suppressHydrationWarning !== !0 && Rr(
              r.textContent,
              u,
              e
            ), l = ["children", "" + u]) : tr.hasOwnProperty(i) && u != null && i === "onScroll" && $("scroll", r);
          }
          switch (n) {
            case "input":
              _r(r), du(r, o, !0);
              break;
            case "textarea":
              _r(r), mu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = il);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ws(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[qe] = t, e[fr] = r, fc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = No(n, r), n) {
              case "dialog":
                $("cancel", e), $("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                $("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Qn.length; l++) $(Qn[l], e);
                l = r;
                break;
              case "source":
                $("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                $(
                  "error",
                  e
                ), $("load", e), l = r;
                break;
              case "details":
                $("toggle", e), l = r;
                break;
              case "input":
                fu(e, r), l = wo(e, r), $("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = X({}, r, { value: void 0 }), $("invalid", e);
                break;
              case "textarea":
                pu(e, r), l = Eo(e, r), $("invalid", e);
                break;
              default:
                l = r;
            }
            _o(n, l), u = l;
            for (o in u) if (u.hasOwnProperty(o)) {
              var s = u[o];
              o === "style" ? Hs(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && Bs(e, s)) : o === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && nr(e, s) : typeof s == "number" && nr(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (tr.hasOwnProperty(o) ? s != null && o === "onScroll" && $("scroll", e) : s != null && pi(e, o, s, i));
            }
            switch (n) {
              case "input":
                _r(e), du(e, r, !1);
                break;
              case "textarea":
                _r(e), mu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Mt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? hn(e, !!r.multiple, o, !1) : r.defaultValue != null && hn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = il);
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
      return ce(t), null;
    case 6:
      if (e && t.stateNode != null) pc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(x(166));
        if (n = Vt(pr.current), Vt(et.current), Ir(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[qe] = t, (o = r.nodeValue !== n) && (e = je, e !== null)) switch (e.tag) {
            case 3:
              Rr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Rr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[qe] = t, t.stateNode = r;
      }
      return ce(t), null;
    case 13:
      if (W(Q), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (V && ze !== null && t.mode & 1 && !(t.flags & 128)) La(), En(), t.flags |= 98560, o = !1;
        else if (o = Ir(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(x(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(x(317));
            o[qe] = t;
          } else En(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ce(t), o = !1;
        } else He !== null && (ii(He), He = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Q.current & 1 ? ne === 0 && (ne = 3) : Gi())), t.updateQueue !== null && (t.flags |= 4), ce(t), null);
    case 4:
      return _n(), qo(e, t), e === null && ar(t.stateNode.containerInfo), ce(t), null;
    case 10:
      return Mi(t.type._context), ce(t), null;
    case 17:
      return Ee(t.type) && ul(), ce(t), null;
    case 19:
      if (W(Q), o = t.memoizedState, o === null) return ce(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) $n(o, !1);
      else {
        if (ne !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = ml(e), i !== null) {
            for (t.flags |= 128, $n(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return A(Q, Q.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && b() > zn && (t.flags |= 128, r = !0, $n(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = ml(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), $n(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !V) return ce(t), null;
        } else 2 * b() - o.renderingStartTime > zn && n !== 1073741824 && (t.flags |= 128, r = !0, $n(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = b(), t.sibling = null, n = Q.current, A(Q, r ? n & 1 | 2 : n & 1), t) : (ce(t), null);
    case 22:
    case 23:
      return Yi(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Ne & 1073741824 && (ce(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ce(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(x(156, t.tag));
}
function Vd(e, t) {
  switch (ji(t), t.tag) {
    case 1:
      return Ee(t.type) && ul(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return _n(), W(Se), W(de), Fi(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Di(t), null;
    case 13:
      if (W(Q), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(x(340));
        En();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return W(Q), null;
    case 4:
      return _n(), null;
    case 10:
      return Mi(t.type._context), null;
    case 22:
    case 23:
      return Yi(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Fr = !1, fe = !1, Hd = typeof WeakSet == "function" ? WeakSet : Set, N = null;
function pn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    G(e, t, r);
  }
  else n.current = null;
}
function bo(e, t, n) {
  try {
    n();
  } catch (r) {
    G(e, t, r);
  }
}
var rs = !1;
function Qd(e, t) {
  if (Do = rl, e = ya(), Ni(e)) {
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
        var i = 0, u = -1, s = -1, a = 0, m = 0, h = e, p = null;
        t: for (; ; ) {
          for (var y; h !== n || l !== 0 && h.nodeType !== 3 || (u = i + l), h !== o || r !== 0 && h.nodeType !== 3 || (s = i + r), h.nodeType === 3 && (i += h.nodeValue.length), (y = h.firstChild) !== null; )
            p = h, h = y;
          for (; ; ) {
            if (h === e) break t;
            if (p === n && ++a === l && (u = i), p === o && ++m === r && (s = i), (y = h.nextSibling) !== null) break;
            h = p, p = h.parentNode;
          }
          h = y;
        }
        n = u === -1 || s === -1 ? null : { start: u, end: s };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Fo = { focusedElem: e, selectionRange: n }, rl = !1, N = t; N !== null; ) if (t = N, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, N = e;
  else for (; N !== null; ) {
    t = N;
    try {
      var w = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (w !== null) {
            var k = w.memoizedProps, F = w.memoizedState, f = t.stateNode, c = f.getSnapshotBeforeUpdate(t.elementType === t.type ? k : Be(t.type, k), F);
            f.__reactInternalSnapshotBeforeUpdate = c;
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
          throw Error(x(163));
      }
    } catch (v) {
      G(t, t.return, v);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, N = e;
      break;
    }
    N = t.return;
  }
  return w = rs, rs = !1, w;
}
function qn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && bo(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Ll(e, t) {
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
function ei(e) {
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
function mc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, mc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[qe], delete t[fr], delete t[$o], delete t[zd], delete t[jd])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function hc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ls(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || hc(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function ti(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = il));
  else if (r !== 4 && (e = e.child, e !== null)) for (ti(e, t, n), e = e.sibling; e !== null; ) ti(e, t, n), e = e.sibling;
}
function ni(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (ni(e, t, n), e = e.sibling; e !== null; ) ni(e, t, n), e = e.sibling;
}
var oe = null, Ve = !1;
function vt(e, t, n) {
  for (n = n.child; n !== null; ) gc(e, t, n), n = n.sibling;
}
function gc(e, t, n) {
  if (be && typeof be.onCommitFiberUnmount == "function") try {
    be.onCommitFiberUnmount(El, n);
  } catch (u) {
  }
  switch (n.tag) {
    case 5:
      fe || pn(n, t);
    case 6:
      var r = oe, l = Ve;
      oe = null, vt(e, t, n), oe = r, Ve = l, oe !== null && (Ve ? (e = oe, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : oe.removeChild(n.stateNode));
      break;
    case 18:
      oe !== null && (Ve ? (e = oe, n = n.stateNode, e.nodeType === 8 ? ro(e.parentNode, n) : e.nodeType === 1 && ro(e, n), ir(e)) : ro(oe, n.stateNode));
      break;
    case 4:
      r = oe, l = Ve, oe = n.stateNode.containerInfo, Ve = !0, vt(e, t, n), oe = r, Ve = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!fe && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && bo(n, t, i), l = l.next;
        } while (l !== r);
      }
      vt(e, t, n);
      break;
    case 1:
      if (!fe && (pn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (u) {
        G(n, t, u);
      }
      vt(e, t, n);
      break;
    case 21:
      vt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (fe = (r = fe) || n.memoizedState !== null, vt(e, t, n), fe = r) : vt(e, t, n);
      break;
    default:
      vt(e, t, n);
  }
}
function os(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Hd()), t.forEach(function(r) {
      var l = ep.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function We(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, i = t, u = i;
      e: for (; u !== null; ) {
        switch (u.tag) {
          case 5:
            oe = u.stateNode, Ve = !1;
            break e;
          case 3:
            oe = u.stateNode.containerInfo, Ve = !0;
            break e;
          case 4:
            oe = u.stateNode.containerInfo, Ve = !0;
            break e;
        }
        u = u.return;
      }
      if (oe === null) throw Error(x(160));
      gc(o, i, l), oe = null, Ve = !1;
      var s = l.alternate;
      s !== null && (s.return = null), l.return = null;
    } catch (a) {
      G(l, t, a);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) vc(t, e), t = t.sibling;
}
function vc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (We(t, e), Ze(e), r & 4) {
        try {
          qn(3, e, e.return), Ll(3, e);
        } catch (k) {
          G(e, e.return, k);
        }
        try {
          qn(5, e, e.return);
        } catch (k) {
          G(e, e.return, k);
        }
      }
      break;
    case 1:
      We(t, e), Ze(e), r & 512 && n !== null && pn(n, n.return);
      break;
    case 5:
      if (We(t, e), Ze(e), r & 512 && n !== null && pn(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          nr(l, "");
        } catch (k) {
          G(e, e.return, k);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, u = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null) try {
          u === "input" && o.type === "radio" && o.name != null && As(l, o), No(u, i);
          var a = No(u, o);
          for (i = 0; i < s.length; i += 2) {
            var m = s[i], h = s[i + 1];
            m === "style" ? Hs(l, h) : m === "dangerouslySetInnerHTML" ? Bs(l, h) : m === "children" ? nr(l, h) : pi(l, m, h, a);
          }
          switch (u) {
            case "input":
              ko(l, o);
              break;
            case "textarea":
              $s(l, o);
              break;
            case "select":
              var p = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var y = o.value;
              y != null ? hn(l, !!o.multiple, y, !1) : p !== !!o.multiple && (o.defaultValue != null ? hn(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : hn(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[fr] = o;
        } catch (k) {
          G(e, e.return, k);
        }
      }
      break;
    case 6:
      if (We(t, e), Ze(e), r & 4) {
        if (e.stateNode === null) throw Error(x(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (k) {
          G(e, e.return, k);
        }
      }
      break;
    case 3:
      if (We(t, e), Ze(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        ir(t.containerInfo);
      } catch (k) {
        G(e, e.return, k);
      }
      break;
    case 4:
      We(t, e), Ze(e);
      break;
    case 13:
      We(t, e), Ze(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Ki = b())), r & 4 && os(e);
      break;
    case 22:
      if (m = n !== null && n.memoizedState !== null, e.mode & 1 ? (fe = (a = fe) || m, We(t, e), fe = a) : We(t, e), Ze(e), r & 8192) {
        if (a = e.memoizedState !== null, (e.stateNode.isHidden = a) && !m && e.mode & 1) for (N = e, m = e.child; m !== null; ) {
          for (h = N = m; N !== null; ) {
            switch (p = N, y = p.child, p.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                qn(4, p, p.return);
                break;
              case 1:
                pn(p, p.return);
                var w = p.stateNode;
                if (typeof w.componentWillUnmount == "function") {
                  r = p, n = p.return;
                  try {
                    t = r, w.props = t.memoizedProps, w.state = t.memoizedState, w.componentWillUnmount();
                  } catch (k) {
                    G(r, n, k);
                  }
                }
                break;
              case 5:
                pn(p, p.return);
                break;
              case 22:
                if (p.memoizedState !== null) {
                  us(h);
                  continue;
                }
            }
            y !== null ? (y.return = p, N = y) : us(h);
          }
          m = m.sibling;
        }
        e: for (m = null, h = e; ; ) {
          if (h.tag === 5) {
            if (m === null) {
              m = h;
              try {
                l = h.stateNode, a ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (u = h.stateNode, s = h.memoizedProps.style, i = s != null && s.hasOwnProperty("display") ? s.display : null, u.style.display = Vs("display", i));
              } catch (k) {
                G(e, e.return, k);
              }
            }
          } else if (h.tag === 6) {
            if (m === null) try {
              h.stateNode.nodeValue = a ? "" : h.memoizedProps;
            } catch (k) {
              G(e, e.return, k);
            }
          } else if ((h.tag !== 22 && h.tag !== 23 || h.memoizedState === null || h === e) && h.child !== null) {
            h.child.return = h, h = h.child;
            continue;
          }
          if (h === e) break e;
          for (; h.sibling === null; ) {
            if (h.return === null || h.return === e) break e;
            m === h && (m = null), h = h.return;
          }
          m === h && (m = null), h.sibling.return = h.return, h = h.sibling;
        }
      }
      break;
    case 19:
      We(t, e), Ze(e), r & 4 && os(e);
      break;
    case 21:
      break;
    default:
      We(
        t,
        e
      ), Ze(e);
  }
}
function Ze(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (hc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(x(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (nr(l, ""), r.flags &= -33);
          var o = ls(e);
          ni(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, u = ls(e);
          ti(e, u, i);
          break;
        default:
          throw Error(x(161));
      }
    } catch (s) {
      G(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Kd(e, t, n) {
  N = e, yc(e);
}
function yc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; N !== null; ) {
    var l = N, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || Fr;
      if (!i) {
        var u = l.alternate, s = u !== null && u.memoizedState !== null || fe;
        u = Fr;
        var a = fe;
        if (Fr = i, (fe = s) && !a) for (N = l; N !== null; ) i = N, s = i.child, i.tag === 22 && i.memoizedState !== null ? ss(l) : s !== null ? (s.return = i, N = s) : ss(l);
        for (; o !== null; ) N = o, yc(o), o = o.sibling;
        N = l, Fr = u, fe = a;
      }
      is(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, N = o) : is(e);
  }
}
function is(e) {
  for (; N !== null; ) {
    var t = N;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            fe || Ll(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !fe) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : Be(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Hu(t, o, r);
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
              Hu(t, i, n);
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
              var a = t.alternate;
              if (a !== null) {
                var m = a.memoizedState;
                if (m !== null) {
                  var h = m.dehydrated;
                  h !== null && ir(h);
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
            throw Error(x(163));
        }
        fe || t.flags & 512 && ei(t);
      } catch (p) {
        G(t, t.return, p);
      }
    }
    if (t === e) {
      N = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, N = n;
      break;
    }
    N = t.return;
  }
}
function us(e) {
  for (; N !== null; ) {
    var t = N;
    if (t === e) {
      N = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, N = n;
      break;
    }
    N = t.return;
  }
}
function ss(e) {
  for (; N !== null; ) {
    var t = N;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Ll(4, t);
          } catch (s) {
            G(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              G(t, l, s);
            }
          }
          var o = t.return;
          try {
            ei(t);
          } catch (s) {
            G(t, o, s);
          }
          break;
        case 5:
          var i = t.return;
          try {
            ei(t);
          } catch (s) {
            G(t, i, s);
          }
      }
    } catch (s) {
      G(t, t.return, s);
    }
    if (t === e) {
      N = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      u.return = t.return, N = u;
      break;
    }
    N = t.return;
  }
}
var Xd = Math.ceil, vl = pt.ReactCurrentDispatcher, Hi = pt.ReactCurrentOwner, De = pt.ReactCurrentBatchConfig, D = 0, le = null, ee = null, ie = 0, Ne = 0, mn = Ot(0), ne = 0, vr = null, Gt = 0, Ml = 0, Qi = 0, bn = null, we = null, Ki = 0, zn = 1 / 0, lt = null, yl = !1, ri = null, Tt = null, Ur = !1, Et = null, xl = 0, er = 0, li = null, Gr = -1, Zr = 0;
function he() {
  return D & 6 ? b() : Gr !== -1 ? Gr : Gr = b();
}
function Pt(e) {
  return e.mode & 1 ? D & 2 && ie !== 0 ? ie & -ie : Pd.transition !== null ? (Zr === 0 && (Zr = na()), Zr) : (e = U, e !== 0 || (e = window.event, e = e === void 0 ? 16 : aa(e.type)), e) : 1;
}
function Ke(e, t, n, r) {
  if (50 < er) throw er = 0, li = null, Error(x(185));
  xr(e, n, r), (!(D & 2) || e !== le) && (e === le && (!(D & 2) && (Ml |= n), ne === 4 && kt(e, ie)), Ce(e, r), n === 1 && D === 0 && !(t.mode & 1) && (zn = b() + 500, jl && Dt()));
}
function Ce(e, t) {
  var n = e.callbackNode;
  Pf(e, t);
  var r = nl(e, e === le ? ie : 0);
  if (r === 0) n !== null && vu(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && vu(n), t === 1) e.tag === 0 ? Td(as.bind(null, e)) : ja(as.bind(null, e)), _d(function() {
      !(D & 6) && Dt();
    }), n = null;
    else {
      switch (ra(r)) {
        case 1:
          n = yi;
          break;
        case 4:
          n = ea;
          break;
        case 16:
          n = tl;
          break;
        case 536870912:
          n = ta;
          break;
        default:
          n = tl;
      }
      n = Nc(n, xc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function xc(e, t) {
  if (Gr = -1, Zr = 0, D & 6) throw Error(x(327));
  var n = e.callbackNode;
  if (wn() && e.callbackNode !== n) return null;
  var r = nl(e, e === le ? ie : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = wl(e, r);
  else {
    t = r;
    var l = D;
    D |= 2;
    var o = kc();
    (le !== e || ie !== t) && (lt = null, zn = b() + 500, Ht(e, t));
    do
      try {
        Zd();
        break;
      } catch (u) {
        wc(e, u);
      }
    while (!0);
    Li(), vl.current = o, D = l, ee !== null ? t = 0 : (le = null, ie = 0, t = ne);
  }
  if (t !== 0) {
    if (t === 2 && (l = Lo(e), l !== 0 && (r = l, t = oi(e, l))), t === 1) throw n = vr, Ht(e, 0), kt(e, r), Ce(e, b()), n;
    if (t === 6) kt(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Yd(l) && (t = wl(e, r), t === 2 && (o = Lo(e), o !== 0 && (r = o, t = oi(e, o))), t === 1)) throw n = vr, Ht(e, 0), kt(e, r), Ce(e, b()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(x(345));
        case 2:
          $t(e, we, lt);
          break;
        case 3:
          if (kt(e, r), (r & 130023424) === r && (t = Ki + 500 - b(), 10 < t)) {
            if (nl(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              he(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Ao($t.bind(null, e, we, lt), t);
            break;
          }
          $t(e, we, lt);
          break;
        case 4:
          if (kt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - Qe(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = b() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Xd(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Ao($t.bind(null, e, we, lt), r);
            break;
          }
          $t(e, we, lt);
          break;
        case 5:
          $t(e, we, lt);
          break;
        default:
          throw Error(x(329));
      }
    }
  }
  return Ce(e, b()), e.callbackNode === n ? xc.bind(null, e) : null;
}
function oi(e, t) {
  var n = bn;
  return e.current.memoizedState.isDehydrated && (Ht(e, t).flags |= 256), e = wl(e, t), e !== 2 && (t = we, we = n, t !== null && ii(t)), e;
}
function ii(e) {
  we === null ? we = e : we.push.apply(we, e);
}
function Yd(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!Xe(o(), l)) return !1;
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
function kt(e, t) {
  for (t &= ~Qi, t &= ~Ml, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Qe(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function as(e) {
  if (D & 6) throw Error(x(327));
  wn();
  var t = nl(e, 0);
  if (!(t & 1)) return Ce(e, b()), null;
  var n = wl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Lo(e);
    r !== 0 && (t = r, n = oi(e, r));
  }
  if (n === 1) throw n = vr, Ht(e, 0), kt(e, t), Ce(e, b()), n;
  if (n === 6) throw Error(x(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, $t(e, we, lt), Ce(e, b()), null;
}
function Xi(e, t) {
  var n = D;
  D |= 1;
  try {
    return e(t);
  } finally {
    D = n, D === 0 && (zn = b() + 500, jl && Dt());
  }
}
function Zt(e) {
  Et !== null && Et.tag === 0 && !(D & 6) && wn();
  var t = D;
  D |= 1;
  var n = De.transition, r = U;
  try {
    if (De.transition = null, U = 1, e) return e();
  } finally {
    U = r, De.transition = n, D = t, !(D & 6) && Dt();
  }
}
function Yi() {
  Ne = mn.current, W(mn);
}
function Ht(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Cd(n)), ee !== null) for (n = ee.return; n !== null; ) {
    var r = n;
    switch (ji(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && ul();
        break;
      case 3:
        _n(), W(Se), W(de), Fi();
        break;
      case 5:
        Di(r);
        break;
      case 4:
        _n();
        break;
      case 13:
        W(Q);
        break;
      case 19:
        W(Q);
        break;
      case 10:
        Mi(r.type._context);
        break;
      case 22:
      case 23:
        Yi();
    }
    n = n.return;
  }
  if (le = e, ee = e = Lt(e.current, null), ie = Ne = t, ne = 0, vr = null, Qi = Ml = Gt = 0, we = bn = null, Bt !== null) {
    for (t = 0; t < Bt.length; t++) if (n = Bt[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var i = o.next;
        o.next = l, r.next = i;
      }
      n.pending = r;
    }
    Bt = null;
  }
  return e;
}
function wc(e, t) {
  do {
    var n = ee;
    try {
      if (Li(), Kr.current = gl, hl) {
        for (var r = K.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        hl = !1;
      }
      if (Yt = 0, re = te = K = null, Jn = !1, mr = 0, Hi.current = null, n === null || n.return === null) {
        ne = 1, vr = t, ee = null;
        break;
      }
      e: {
        var o = e, i = n.return, u = n, s = t;
        if (t = ie, u.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var a = s, m = u, h = m.tag;
          if (!(m.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var p = m.alternate;
            p ? (m.updateQueue = p.updateQueue, m.memoizedState = p.memoizedState, m.lanes = p.lanes) : (m.updateQueue = null, m.memoizedState = null);
          }
          var y = Zu(i);
          if (y !== null) {
            y.flags &= -257, Ju(y, i, u, o, t), y.mode & 1 && Gu(o, a, t), t = y, s = a;
            var w = t.updateQueue;
            if (w === null) {
              var k = /* @__PURE__ */ new Set();
              k.add(s), t.updateQueue = k;
            } else w.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              Gu(o, a, t), Gi();
              break e;
            }
            s = Error(x(426));
          }
        } else if (V && u.mode & 1) {
          var F = Zu(i);
          if (F !== null) {
            !(F.flags & 65536) && (F.flags |= 256), Ju(F, i, u, o, t), Ti(Nn(s, u));
            break e;
          }
        }
        o = s = Nn(s, u), ne !== 4 && (ne = 2), bn === null ? bn = [o] : bn.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var f = rc(o, s, t);
              Vu(o, f);
              break e;
            case 1:
              u = s;
              var c = o.type, d = o.stateNode;
              if (!(o.flags & 128) && (typeof c.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (Tt === null || !Tt.has(d)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var v = lc(o, u, t);
                Vu(o, v);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Ec(n);
    } catch (S) {
      t = S, ee === n && n !== null && (ee = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function kc() {
  var e = vl.current;
  return vl.current = gl, e === null ? gl : e;
}
function Gi() {
  (ne === 0 || ne === 3 || ne === 2) && (ne = 4), le === null || !(Gt & 268435455) && !(Ml & 268435455) || kt(le, ie);
}
function wl(e, t) {
  var n = D;
  D |= 2;
  var r = kc();
  (le !== e || ie !== t) && (lt = null, Ht(e, t));
  do
    try {
      Gd();
      break;
    } catch (l) {
      wc(e, l);
    }
  while (!0);
  if (Li(), D = n, vl.current = r, ee !== null) throw Error(x(261));
  return le = null, ie = 0, ne;
}
function Gd() {
  for (; ee !== null; ) Sc(ee);
}
function Zd() {
  for (; ee !== null && !kf(); ) Sc(ee);
}
function Sc(e) {
  var t = _c(e.alternate, e, Ne);
  e.memoizedProps = e.pendingProps, t === null ? Ec(e) : ee = t, Hi.current = null;
}
function Ec(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Vd(n, t), n !== null) {
        n.flags &= 32767, ee = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ne = 6, ee = null;
        return;
      }
    } else if (n = Bd(n, t, Ne), n !== null) {
      ee = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      ee = t;
      return;
    }
    ee = t = e;
  } while (t !== null);
  ne === 0 && (ne = 5);
}
function $t(e, t, n) {
  var r = U, l = De.transition;
  try {
    De.transition = null, U = 1, Jd(e, t, n, r);
  } finally {
    De.transition = l, U = r;
  }
  return null;
}
function Jd(e, t, n, r) {
  do
    wn();
  while (Et !== null);
  if (D & 6) throw Error(x(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(x(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Lf(e, o), e === le && (ee = le = null, ie = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Ur || (Ur = !0, Nc(tl, function() {
    return wn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = De.transition, De.transition = null;
    var i = U;
    U = 1;
    var u = D;
    D |= 4, Hi.current = null, Qd(e, n), vc(n, e), vd(Fo), rl = !!Do, Fo = Do = null, e.current = n, Kd(n), Sf(), D = u, U = i, De.transition = o;
  } else e.current = n;
  if (Ur && (Ur = !1, Et = e, xl = l), o = e.pendingLanes, o === 0 && (Tt = null), _f(n.stateNode), Ce(e, b()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (yl) throw yl = !1, e = ri, ri = null, e;
  return xl & 1 && e.tag !== 0 && wn(), o = e.pendingLanes, o & 1 ? e === li ? er++ : (er = 0, li = e) : er = 0, Dt(), null;
}
function wn() {
  if (Et !== null) {
    var e = ra(xl), t = De.transition, n = U;
    try {
      if (De.transition = null, U = 16 > e ? 16 : e, Et === null) var r = !1;
      else {
        if (e = Et, Et = null, xl = 0, D & 6) throw Error(x(331));
        var l = D;
        for (D |= 4, N = e.current; N !== null; ) {
          var o = N, i = o.child;
          if (N.flags & 16) {
            var u = o.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var a = u[s];
                for (N = a; N !== null; ) {
                  var m = N;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      qn(8, m, o);
                  }
                  var h = m.child;
                  if (h !== null) h.return = m, N = h;
                  else for (; N !== null; ) {
                    m = N;
                    var p = m.sibling, y = m.return;
                    if (mc(m), m === a) {
                      N = null;
                      break;
                    }
                    if (p !== null) {
                      p.return = y, N = p;
                      break;
                    }
                    N = y;
                  }
                }
              }
              var w = o.alternate;
              if (w !== null) {
                var k = w.child;
                if (k !== null) {
                  w.child = null;
                  do {
                    var F = k.sibling;
                    k.sibling = null, k = F;
                  } while (k !== null);
                }
              }
              N = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, N = i;
          else e: for (; N !== null; ) {
            if (o = N, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                qn(9, o, o.return);
            }
            var f = o.sibling;
            if (f !== null) {
              f.return = o.return, N = f;
              break e;
            }
            N = o.return;
          }
        }
        var c = e.current;
        for (N = c; N !== null; ) {
          i = N;
          var d = i.child;
          if (i.subtreeFlags & 2064 && d !== null) d.return = i, N = d;
          else e: for (i = c; N !== null; ) {
            if (u = N, u.flags & 2048) try {
              switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  Ll(9, u);
              }
            } catch (S) {
              G(u, u.return, S);
            }
            if (u === i) {
              N = null;
              break e;
            }
            var v = u.sibling;
            if (v !== null) {
              v.return = u.return, N = v;
              break e;
            }
            N = u.return;
          }
        }
        if (D = l, Dt(), be && typeof be.onPostCommitFiberRoot == "function") try {
          be.onPostCommitFiberRoot(El, e);
        } catch (S) {
        }
        r = !0;
      }
      return r;
    } finally {
      U = n, De.transition = t;
    }
  }
  return !1;
}
function cs(e, t, n) {
  t = Nn(n, t), t = rc(e, t, 1), e = jt(e, t, 1), t = he(), e !== null && (xr(e, 1, t), Ce(e, t));
}
function G(e, t, n) {
  if (e.tag === 3) cs(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      cs(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Tt === null || !Tt.has(r))) {
        e = Nn(n, e), e = lc(t, e, 1), t = jt(t, e, 1), e = he(), t !== null && (xr(t, 1, e), Ce(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function qd(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = he(), e.pingedLanes |= e.suspendedLanes & n, le === e && (ie & n) === n && (ne === 4 || ne === 3 && (ie & 130023424) === ie && 500 > b() - Ki ? Ht(e, 0) : Qi |= n), Ce(e, t);
}
function Cc(e, t) {
  t === 0 && (e.mode & 1 ? (t = jr, jr <<= 1, !(jr & 130023424) && (jr = 4194304)) : t = 1);
  var n = he();
  e = ft(e, t), e !== null && (xr(e, t, n), Ce(e, n));
}
function bd(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Cc(e, n);
}
function ep(e, t) {
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
      throw Error(x(314));
  }
  r !== null && r.delete(t), Cc(e, n);
}
var _c;
_c = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Se.current) ke = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return ke = !1, Wd(e, t, n);
    ke = !!(e.flags & 131072);
  }
  else ke = !1, V && t.flags & 1048576 && Ta(t, cl, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Yr(e, t), e = t.pendingProps;
      var l = Sn(t, de.current);
      xn(t, n), l = Ai(null, t, r, e, l, n);
      var o = $i();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Ee(r) ? (o = !0, sl(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Ii(t), l.updater = Pl, t.stateNode = l, l._reactInternals = t, Ko(t, r, e, n), t = Go(null, t, r, !0, o, n)) : (t.tag = 0, V && o && zi(t), me(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Yr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = np(r), e = Be(r, e), l) {
          case 0:
            t = Yo(null, t, r, e, n);
            break e;
          case 1:
            t = es(null, t, r, e, n);
            break e;
          case 11:
            t = qu(null, t, r, e, n);
            break e;
          case 14:
            t = bu(null, t, r, Be(r.type, e), n);
            break e;
        }
        throw Error(x(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Be(r, l), Yo(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Be(r, l), es(e, t, r, l, n);
    case 3:
      e: {
        if (sc(t), e === null) throw Error(x(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, Oa(e, t), pl(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = Nn(Error(x(423)), t), t = ts(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = Nn(Error(x(424)), t), t = ts(e, t, r, n, l);
          break e;
        } else for (ze = zt(t.stateNode.containerInfo.firstChild), je = t, V = !0, He = null, n = Ra(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (En(), r === l) {
            t = dt(e, t, n);
            break e;
          }
          me(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Da(t), e === null && Vo(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Uo(r, l) ? i = null : o !== null && Uo(r, o) && (t.flags |= 32), uc(e, t), me(e, t, i, n), t.child;
    case 6:
      return e === null && Vo(t), null;
    case 13:
      return ac(e, t, n);
    case 4:
      return Oi(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Cn(t, null, r, n) : me(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Be(r, l), qu(e, t, r, l, n);
    case 7:
      return me(e, t, t.pendingProps, n), t.child;
    case 8:
      return me(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return me(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, A(fl, r._currentValue), r._currentValue = i, o !== null) if (Xe(o.value, i)) {
          if (o.children === l.children && !Se.current) {
            t = dt(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var u = o.dependencies;
          if (u !== null) {
            i = o.child;
            for (var s = u.firstContext; s !== null; ) {
              if (s.context === r) {
                if (o.tag === 1) {
                  s = st(-1, n & -n), s.tag = 2;
                  var a = o.updateQueue;
                  if (a !== null) {
                    a = a.shared;
                    var m = a.pending;
                    m === null ? s.next = s : (s.next = m.next, m.next = s), a.pending = s;
                  }
                }
                o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), Ho(
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
            if (i = o.return, i === null) throw Error(x(341));
            i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), Ho(i, n, t), i = o.sibling;
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
        me(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, xn(t, n), l = Fe(l), r = r(l), t.flags |= 1, me(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Be(r, t.pendingProps), l = Be(r.type, l), bu(e, t, r, l, n);
    case 15:
      return oc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Be(r, l), Yr(e, t), t.tag = 1, Ee(r) ? (e = !0, sl(t)) : e = !1, xn(t, n), nc(t, r, l), Ko(t, r, l, n), Go(null, t, r, !0, e, n);
    case 19:
      return cc(e, t, n);
    case 22:
      return ic(e, t, n);
  }
  throw Error(x(156, t.tag));
};
function Nc(e, t) {
  return bs(e, t);
}
function tp(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Oe(e, t, n, r) {
  return new tp(e, t, n, r);
}
function Zi(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function np(e) {
  if (typeof e == "function") return Zi(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === hi) return 11;
    if (e === gi) return 14;
  }
  return 2;
}
function Lt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Oe(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Jr(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") Zi(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case rn:
      return Qt(n.children, l, o, t);
    case mi:
      i = 8, l |= 8;
      break;
    case go:
      return e = Oe(12, n, t, l | 2), e.elementType = go, e.lanes = o, e;
    case vo:
      return e = Oe(13, n, t, l), e.elementType = vo, e.lanes = o, e;
    case yo:
      return e = Oe(19, n, t, l), e.elementType = yo, e.lanes = o, e;
    case Ds:
      return Rl(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Is:
          i = 10;
          break e;
        case Os:
          i = 9;
          break e;
        case hi:
          i = 11;
          break e;
        case gi:
          i = 14;
          break e;
        case yt:
          i = 16, r = null;
          break e;
      }
      throw Error(x(130, e == null ? e : typeof e, ""));
  }
  return t = Oe(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Qt(e, t, n, r) {
  return e = Oe(7, e, r, t), e.lanes = n, e;
}
function Rl(e, t, n, r) {
  return e = Oe(22, e, r, t), e.elementType = Ds, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function fo(e, t, n) {
  return e = Oe(6, e, null, t), e.lanes = n, e;
}
function po(e, t, n) {
  return t = Oe(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function rp(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Kl(0), this.expirationTimes = Kl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Kl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Ji(e, t, n, r, l, o, i, u, s) {
  return e = new rp(e, t, n, u, s), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Oe(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ii(o), e;
}
function lp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: nn, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function zc(e) {
  if (!e) return Rt;
  e = e._reactInternals;
  e: {
    if (qt(e) !== e || e.tag !== 1) throw Error(x(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ee(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(x(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ee(n)) return za(e, n, t);
  }
  return t;
}
function jc(e, t, n, r, l, o, i, u, s) {
  return e = Ji(n, r, !0, e, l, o, i, u, s), e.context = zc(null), n = e.current, r = he(), l = Pt(n), o = st(r, l), o.callback = t != null ? t : null, jt(n, o, l), e.current.lanes = l, xr(e, l, r), Ce(e, r), e;
}
function Il(e, t, n, r) {
  var l = t.current, o = he(), i = Pt(l);
  return n = zc(n), t.context === null ? t.context = n : t.pendingContext = n, t = st(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = jt(l, t, i), e !== null && (Ke(e, l, i, o), Qr(e, l, i)), i;
}
function kl(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function fs(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function qi(e, t) {
  fs(e, t), (e = e.alternate) && fs(e, t);
}
function op() {
  return null;
}
var Tc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function bi(e) {
  this._internalRoot = e;
}
Ol.prototype.render = bi.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(x(409));
  Il(e, t, null, null);
};
Ol.prototype.unmount = bi.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Zt(function() {
      Il(null, e, null, null);
    }), t[ct] = null;
  }
};
function Ol(e) {
  this._internalRoot = e;
}
Ol.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = ia();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < wt.length && t !== 0 && t < wt[n].priority; n++) ;
    wt.splice(n, 0, e), n === 0 && sa(e);
  }
};
function eu(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Dl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function ds() {
}
function ip(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var a = kl(i);
        o.call(a);
      };
    }
    var i = jc(t, r, e, 0, null, !1, !1, "", ds);
    return e._reactRootContainer = i, e[ct] = i.current, ar(e.nodeType === 8 ? e.parentNode : e), Zt(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function() {
      var a = kl(s);
      u.call(a);
    };
  }
  var s = Ji(e, 0, !1, null, null, !1, !1, "", ds);
  return e._reactRootContainer = s, e[ct] = s.current, ar(e.nodeType === 8 ? e.parentNode : e), Zt(function() {
    Il(t, s, n, r);
  }), s;
}
function Fl(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var u = l;
      l = function() {
        var s = kl(i);
        u.call(s);
      };
    }
    Il(t, i, e, l);
  } else i = ip(n, t, e, l, r);
  return kl(i);
}
la = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Hn(t.pendingLanes);
        n !== 0 && (xi(t, n | 1), Ce(t, b()), !(D & 6) && (zn = b() + 500, Dt()));
      }
      break;
    case 13:
      Zt(function() {
        var r = ft(e, 1);
        if (r !== null) {
          var l = he();
          Ke(r, e, 1, l);
        }
      }), qi(e, 1);
  }
};
wi = function(e) {
  if (e.tag === 13) {
    var t = ft(e, 134217728);
    if (t !== null) {
      var n = he();
      Ke(t, e, 134217728, n);
    }
    qi(e, 134217728);
  }
};
oa = function(e) {
  if (e.tag === 13) {
    var t = Pt(e), n = ft(e, t);
    if (n !== null) {
      var r = he();
      Ke(n, e, t, r);
    }
    qi(e, t);
  }
};
ia = function() {
  return U;
};
ua = function(e, t) {
  var n = U;
  try {
    return U = e, t();
  } finally {
    U = n;
  }
};
jo = function(e, t, n) {
  switch (t) {
    case "input":
      if (ko(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = zl(r);
            if (!l) throw Error(x(90));
            Us(r), ko(r, l);
          }
        }
      }
      break;
    case "textarea":
      $s(e, n);
      break;
    case "select":
      t = n.value, t != null && hn(e, !!n.multiple, t, !1);
  }
};
Xs = Xi;
Ys = Zt;
var up = { usingClientEntryPoint: !1, Events: [kr, sn, zl, Qs, Ks, Xi] }, Wn = { findFiberByHostInstance: Wt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, sp = { bundleType: Wn.bundleType, version: Wn.version, rendererPackageName: Wn.rendererPackageName, rendererConfig: Wn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: pt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Js(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Wn.findFiberByHostInstance || op, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined") {
  var Ar = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Ar.isDisabled && Ar.supportsFiber) try {
    El = Ar.inject(sp), be = Ar;
  } catch (e) {
  }
}
Pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = up;
Pe.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!eu(t)) throw Error(x(200));
  return lp(e, t, null, n);
};
Pe.createRoot = function(e, t) {
  if (!eu(e)) throw Error(x(299));
  var n = !1, r = "", l = Tc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Ji(e, 1, !1, null, null, n, !1, r, l), e[ct] = t.current, ar(e.nodeType === 8 ? e.parentNode : e), new bi(t);
};
Pe.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(x(188)) : (e = Object.keys(e).join(","), Error(x(268, e)));
  return e = Js(t), e = e === null ? null : e.stateNode, e;
};
Pe.flushSync = function(e) {
  return Zt(e);
};
Pe.hydrate = function(e, t, n) {
  if (!Dl(t)) throw Error(x(200));
  return Fl(null, e, t, !0, n);
};
Pe.hydrateRoot = function(e, t, n) {
  if (!eu(e)) throw Error(x(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = Tc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = jc(t, null, e, 1, n != null ? n : null, l, !1, o, i), e[ct] = t.current, ar(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Ol(t);
};
Pe.render = function(e, t, n) {
  if (!Dl(t)) throw Error(x(200));
  return Fl(null, e, t, !1, n);
};
Pe.unmountComponentAtNode = function(e) {
  if (!Dl(e)) throw Error(x(40));
  return e._reactRootContainer ? (Zt(function() {
    Fl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[ct] = null;
    });
  }), !0) : !1;
};
Pe.unstable_batchedUpdates = Xi;
Pe.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Dl(n)) throw Error(x(200));
  if (e == null || e._reactInternals === void 0) throw Error(x(38));
  return Fl(e, t, n, !1, r);
};
Pe.version = "18.3.1-next-f1338f8080-20240426";
function Pc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ == "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Pc);
    } catch (e) {
      console.error(e);
    }
}
Pc(), Ps.exports = Pe;
var ap = Ps.exports, Lc, ps = ap;
Lc = ps.createRoot, ps.hydrateRoot;
const ms = [
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
], hs = { "#39ff14": 110, "#ff2fbf": 320, "#00e5ff": 190, "#ff6b6b": 0, "#ffd93d": 55, "#7c3aed": 265 };
function gs(e) {
  return ms[(e - 1) % ms.length];
}
function cp(e) {
  const t = Math.floor((e - 1) / 10) + 1, n = (e - 1) % 10 + 1, r = [4, 4, 5, 5, 6, 6, 7, 7, 8, 8], l = [4, 4, 5, 5, 6, 6, 7, 7, 8, 8], o = [5, 5, 6, 6, 7, 7, 8, 8, 9, 9], i = [5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
  return ([r, l, o, i][t - 1] || i)[n - 1] || 9;
}
function mo(e) {
  const r = Math.floor((e - 1) / 2);
  return Math.max(20, 35 - r);
}
const vs = [
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
];
function fp(e) {
  const t = L.useRef(null), n = typeof window != "undefined" ? window : {}, r = () => {
    if (!e) return null;
    try {
      if (!t.current) {
        const i = n.AudioContext || n.webkitAudioContext;
        if (!i) return null;
        t.current = new i();
      }
      return t.current;
    } catch (i) {
      return null;
    }
  }, l = (i = 440, u = 0.12, s = "sine", a = 0.07) => {
    const m = r();
    if (m)
      try {
        const h = m.createOscillator(), p = m.createGain();
        h.type = s, h.frequency.value = i, p.gain.value = a, h.connect(p), p.connect(m.destination), m.state === "suspended" && m.resume().catch(() => {
        });
        const y = m.currentTime;
        h.start(y), h.stop(y + u);
      } catch (h) {
      }
  }, o = (i, u = 0.12, s = 0.04) => {
    const a = r();
    if (!(!a || !i || !i.length))
      try {
        a.state === "suspended" && a.resume().catch(() => {
        }), i.forEach((m, h) => {
          const p = a.createOscillator(), y = a.createGain();
          p.type = "triangle", p.frequency.value = m, y.gain.value = 0.08, p.connect(y), y.connect(a.destination);
          const w = a.currentTime + h * (u + s);
          p.start(w), p.stop(w + u);
        });
      } catch (m) {
      }
  };
  return {
    start: () => l(600, 0.1, "triangle", 0.06),
    ok: (i) => l(i || 880, 0.1, "triangle", 0.07),
    fail: () => l(260, 0.12, "sine", 0.045),
    // suave "meck"
    blink: (i) => l(i || 720, 0.08, "sine", 0.05),
    // Victoria: siempre trozo corto (5–6 notas) + retraso 300ms
    winMelody: (i) => {
      const u = i && i.length ? i.slice(0, 6) : [659.25, 880, 1046.5];
      setTimeout(() => o(u, 0.12, 0.04), 300);
    }
  };
}
function ys(e, t) {
  try {
    t && navigator.vibrate && navigator.vibrate(e);
  } catch (n) {
  }
}
function dp() {
  L.useEffect(() => {
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
      .panel{position:relative;z-index:2;width:100%;max-width:300px;border-radius:16px;padding:40px 24px;background:#ffffff35;border:1px solid #ffffff4d;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:0 0 22px rgba(0,0,0,.55);margin:0 20px;display:flex;flex-direction:column;justify-content:flex-start}
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
function pp({ onPlay: e, onAuth: t }) {
  const n = L.useRef(null), r = L.useRef(null), [l, o] = L.useState(!1), [i, u] = L.useState(null);
  return L.useEffect(() => {
    const s = n.current;
    if (!s) return;
    const m = setInterval(() => {
      const h = document.createElement("i"), p = 20 + Math.random() * 25, y = 40 + Math.random() * 60;
      let w, k;
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
        w = v.x[0] + Math.random() * (v.x[1] - v.x[0]), k = v.y[0] + Math.random() * (v.y[1] - v.y[0]);
      } else
        w = Math.random() * 100, k = Math.random() * 100;
      h.style.left = w + "%", h.style.top = k + "%", h.style.width = p + "px", h.style.height = y + "px";
      const f = [0, 60, 120, 180, 240, 300, 45, 135, 225, 315], c = f[Math.floor(Math.random() * f.length)];
      h.style.background = `hsl(${c} 95% 65% / .9)`, s.appendChild(h), setTimeout(() => h.remove(), 3e3);
    }, 80);
    return () => clearInterval(m);
  }, []), L.useEffect(() => {
    const s = () => {
      var w;
      const m = r.current;
      if (!m) return;
      const h = (w = m.parentElement) == null ? void 0 : w.parentElement;
      if (!h) return;
      m.style.fontSize = "";
      let p = Math.min(42, Math.max(28, Math.floor(h.clientWidth * 0.16)));
      m.style.fontSize = p + "px", m.style.letterSpacing = "0.16em";
      let y = 0;
      for (; m.scrollWidth > h.clientWidth - 24 && y < 20; )
        p -= 1, m.style.fontSize = p + "px", y++;
    };
    s();
    const a = new ResizeObserver(s);
    return a.observe(document.body), () => a.disconnect();
  }, []), L.useEffect(() => {
    (async () => {
      try {
        if (window.LUM_AUTH && window.LUM_AUTH.lum_check) {
          const a = await window.LUM_AUTH.lum_check();
          a && a.success && (o(!0), u(a.user));
        }
      } catch (a) {
        console.log("No hay sesión activa");
      }
    })();
  }, []), /* @__PURE__ */ g.jsx("section", { className: "screen intro", children: /* @__PURE__ */ g.jsxs("div", { className: "introWrap", children: [
    /* @__PURE__ */ g.jsx("div", { className: "introBg", ref: n }),
    /* @__PURE__ */ g.jsxs("div", { className: "neon-borders", children: [
      /* @__PURE__ */ g.jsx("div", { className: "neon-line top" }),
      /* @__PURE__ */ g.jsx("div", { className: "neon-line right" }),
      /* @__PURE__ */ g.jsx("div", { className: "neon-line bottom" }),
      /* @__PURE__ */ g.jsx("div", { className: "neon-line left" })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "panel", children: [
      /* @__PURE__ */ g.jsxs("h1", { className: "logo", children: [
        /* @__PURE__ */ g.jsx("img", { src: "sistema_apps_api/lumetrix/img/logo.png", alt: "LUMETRIX", style: {
          height: "80px",
          width: "auto",
          filter: "drop-shadow(0 0 20px #39ff14) drop-shadow(0 0 40px #00ffff) drop-shadow(0 0 60px #ff00ff)",
          animation: "logoGlow 2s ease-in-out infinite alternate"
        }, onError: (s) => {
          s.target.style.display = "none", s.target.nextSibling.style.display = "block";
        } }),
        /* @__PURE__ */ g.jsx("div", { style: { display: "none", fontSize: "48px", fontWeight: "900", letterSpacing: "0.1em", background: "linear-gradient(90deg,#39ff14,#00ffff,#ff00ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", textShadow: "0 0 20px #39ff14,0 0 40px #00ffff,0 0 60px #ff00ff" }, children: "LUMETRIX" })
      ] }),
      /* @__PURE__ */ g.jsxs("div", { style: { textAlign: "center", fontSize: 18, opacity: 0.9, marginTop: 20, marginBottom: 8, lineHeight: "1.4", fontWeight: 500 }, children: [
        "Esto no es un Simón: es el ",
        /* @__PURE__ */ g.jsx("b", { children: "anti‑Simón" }),
        ".",
        /* @__PURE__ */ g.jsx("br", {}),
        /* @__PURE__ */ g.jsx("br", {}),
        /* @__PURE__ */ g.jsx("b", { children: "Encuentra" }),
        " la secuencia y pinta ",
        /* @__PURE__ */ g.jsx("b", { children: "todas" }),
        " las piezas del color del borde."
      ] }),
      /* @__PURE__ */ g.jsxs("div", { className: "actions", style: { marginTop: 20 }, children: [
        /* @__PURE__ */ g.jsx("button", { className: "btn btn1", onClick: e, children: "Jugar" }),
        !l && /* @__PURE__ */ g.jsx("button", { className: "btn btn2", onClick: t, children: "Iniciar sesión" })
      ] }),
      l && /* @__PURE__ */ g.jsxs("div", { style: { textAlign: "center", marginTop: 8 }, children: [
        /* @__PURE__ */ g.jsxs("div", { style: { fontSize: 16, opacity: 0.8, color: "#39ff14", fontWeight: 600 }, children: [
          "¡Hola, ",
          (i == null ? void 0 : i.username) || "Usuario",
          "!"
        ] }),
        /* @__PURE__ */ g.jsx("button", { className: "btn btn2", onClick: t, style: { marginTop: 4, fontSize: 11 }, children: "Cerrar sesión" })
      ] })
    ] }),
    /* @__PURE__ */ g.jsx("div", { className: "copy", style: { fontSize: "14px", fontWeight: 500 }, children: "© @intocables13 · Todos los derechos reservados" })
  ] }) });
}
function mp({ level: e, setLevel: t, soundOn: n, vibrateOn: r, onOpenAuth: l, onOpenRanking: o, onOpenOptions: i, onTotalUpdate: u, totalTime: s }) {
  const a = L.useRef(null), [m, h] = L.useState(mo(e)), [p, y] = L.useState(!1), [w, k] = L.useState(!1), [F, f] = L.useState(!1), [c, d] = L.useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0;
    } catch (C) {
      return 0;
    }
  });
  L.useEffect(() => {
    typeof s == "number" && d(s);
  }, [s]);
  const v = fp(n), S = Math.floor((e - 1) / 10) + 1, z = (e - 1) % 10 + 1, _ = L.useMemo(() => gs(e), [e]), [j, Y] = L.useState([]), [I, ye] = L.useState([]), [se, mt] = L.useState(null), [bt, Ul] = L.useState({ x: 0, y: 0 }), Ae = L.useRef([]), Ye = L.useRef(0), E = L.useRef(null), T = L.useRef(!1), R = L.useCallback((C) => {
    var B;
    if (S < 2) return [];
    const P = [], M = (B = a.current) == null ? void 0 : B.getBoundingClientRect();
    return M && C.forEach((J, tt) => {
      const nt = document.getElementById(`tile-${J}`);
      if (!nt) return;
      nt.getBoundingClientRect(), M.left, M.top;
      const ht = tt % 2 * 80 + 20, rt = Math.floor(tt / 2) * 60 + 20;
      P.push({
        id: `drop-${J}`,
        tileId: J,
        x: ht,
        y: rt,
        color: nt.style.backgroundColor || "#333"
      });
    }), P;
  }, [S]), H = L.useCallback((C, P) => {
    if (S < 2 || !p) return;
    C.preventDefault();
    const M = C.currentTarget, B = M.getBoundingClientRect();
    mt(P), Ul({
      x: C.clientX - B.left,
      y: C.clientY - B.top
    }), M.classList.add("dragging"), M.style.position = "fixed", M.style.pointerEvents = "none";
  }, [S, p]), Z = L.useCallback((C) => {
    if (!se) return;
    C.preventDefault();
    const P = document.querySelector(`.tile[data-id="${se}"]`);
    if (!P) return;
    P.style.left = C.clientX - bt.x + "px", P.style.top = C.clientY - bt.y + "px";
    const M = document.elementFromPoint(C.clientX, C.clientY), B = M == null ? void 0 : M.closest(".drop-zone");
    document.querySelectorAll(".drop-zone").forEach((J) => J.classList.remove("drag-over")), B && B.classList.add("drag-over");
  }, [se, bt]), Ft = L.useCallback((C) => {
    if (!se) return;
    const P = document.querySelector(`.tile[data-id="${se}"]`), M = document.elementFromPoint(C.clientX, C.clientY), B = M == null ? void 0 : M.closest(".drop-zone");
    if (P && (P.classList.remove("dragging"), P.style.position = "", P.style.pointerEvents = ""), document.querySelectorAll(".drop-zone").forEach((J) => J.classList.remove("drag-over")), B) {
      const J = parseInt(B.id.replace("drop-", ""));
      parseInt(se) === J ? (v.play("success"), Al(se)) : (v.play("error"), en());
    } else
      v.play("error"), en();
    mt(null);
  }, [se, v]), $e = L.useRef(0), Ut = L.useRef([]), pe = L.useRef(_), Ge = L.useRef(!1);
  L.useEffect(() => {
    var P;
    const C = (P = a.current) == null ? void 0 : P.closest(".device");
    C && C.style.setProperty("--accent", _);
  }, [_]);
  const tu = (C) => {
    try {
      const M = (Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0) + C;
      localStorage.setItem("lum_total", JSON.stringify(M)), d(M), typeof u == "function" && u(M);
    } catch (P) {
    }
  };
  function Mc(C) {
    var $l;
    const P = a.current;
    if (!P) return;
    P.querySelectorAll(".tile, .dropzone").forEach((q) => q.remove());
    const M = P.getBoundingClientRect(), B = M.width, J = M.height, tt = (q, xe) => Math.random() * (xe - q) + q, nt = ($l = hs[pe.current || _]) != null ? $l : 0, ht = () => {
      let q = Math.floor(Math.random() * 360), xe = 0;
      for (; Math.min(Math.abs(q - nt), 360 - Math.abs(q - nt)) < 30 && xe++ < 120; )
        q = Math.floor(Math.random() * 360);
      return q;
    }, rt = [];
    for (let q = 0; q < C; q++) {
      let xe = 0, gt = 0, Mn = 0, Rn = 0, ru = !1, Dc = 0;
      for (; !ru && Dc++ < 300; )
        xe = Math.max(56, Math.min(140, 60 + Math.random() * 80)), gt = Math.max(56, Math.min(160, 60 + Math.random() * 100)), Mn = Math.max(8, Math.min(B - xe - 8, tt(0, B - xe))), Rn = Math.max(8, Math.min(J - gt - 8, tt(0, J - gt))), ru = !rt.some((Me) => !(Mn + xe <= Me.x || Me.x + Me.w <= Mn || Rn + gt <= Me.y || Me.y + Me.h <= Rn));
      rt.push({ x: Mn, y: Rn, w: xe, h: gt });
      const _e = document.createElement("button");
      if (_e.type = "button", _e.className = "tile", Object.assign(_e.style, { left: Mn + "px", top: Rn + "px", width: xe + "px", height: gt + "px", background: `hsl(${ht()} 96% 58%)` }), _e.style.background === (pe.current || _)) {
        const Me = ((hs[pe.current || _] || 0) + 180) % 360;
        _e.style.background = `hsl(${Me} 96% 58%)`;
      }
      _e.dataset.id = String(q), _e.dataset.orig = _e.style.background;
      const lu = Ut.current || [];
      _e.dataset.pitch = String(lu[q % lu.length] || 660), S >= 2 && (_e.style.cursor = "grab", _e.addEventListener("mousedown", (Me) => H(Me, q)), _e.addEventListener("dragstart", (Me) => Me.preventDefault())), P.appendChild(_e);
    }
    P.__lumDeleg && P.removeEventListener("pointerdown", P.__lumDeleg);
    const Ln = (q) => {
      const xe = q.target && q.target.closest && q.target.closest(".tile");
      if (!xe || !P.contains(xe) || !T.current) return;
      q.preventDefault && q.preventDefault();
      const gt = Number(xe.dataset.id);
      Al(gt);
    };
    P.addEventListener("pointerdown", Ln, { passive: !1 }), P.__lumDeleg = Ln;
  }
  function Rc(C) {
    const P = a.current, M = P && P.querySelector(`.tile[data-id="${C}"]`);
    if (!M) return;
    const B = M.style.background;
    M.classList.add("lit"), M.style.background = pe.current || _, v.blink(parseFloat(M.dataset.pitch || "720")), setTimeout(() => {
      M.classList.remove("lit"), M.style.background = B;
    }, 260);
  }
  function Ic() {
    const C = Ae.current;
    C && C.length && Rc(C[0]);
  }
  function nu() {
    const C = a.current;
    C && C.querySelectorAll(".tile").forEach((P) => {
      P.style.background = P.dataset.orig || P.style.background, P.classList.remove("lit");
    });
  }
  function en(C) {
    var nt;
    const P = typeof C == "number" ? C : e, M = (nt = a.current) == null ? void 0 : nt.closest(".device");
    pe.current = gs(P), M && M.style.setProperty("--accent", pe.current), k(!1), f(!1), Ge.current = !1, E.current && clearInterval(E.current);
    const B = cp(P);
    Ae.current = Array.from({ length: B }, (ht, rt) => rt).sort(() => Math.random() - 0.5), Ye.current = 0, Ut.current = vs[Math.floor(Math.random() * vs.length)] || [440, 494, 523, 587, 659, 698, 784, 880, 988, 1046, 1174, 1318, 1396, 1567, 1760], Mc(B), setTimeout(() => {
      if (S >= 2) {
        const ht = R(Ae.current);
        ye(ht);
      } else
        ye([]);
    }, 100);
    const J = mo(P);
    h(J), y(!0), T.current = !0, v.start(), $e.current = Date.now();
    const tt = Date.now();
    E.current = setInterval(() => {
      const ht = (Date.now() - tt) / 1e3, rt = Math.max(0, J - ht);
      if (h(Math.ceil(rt)), rt <= 0) {
        if (!Ge.current) {
          Ge.current = !0;
          const Ln = Math.ceil((Date.now() - $e.current) / 1e3);
          tu(Ln);
          try {
            window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
              method: "POST",
              body: JSON.stringify({
                level: e,
                total_time_s: Ln,
                success: 0
              })
            });
          } catch ($l) {
          }
        }
        clearInterval(E.current), y(!1), T.current = !1, f(!0), v.fail(), nu();
      }
    }, 100), setTimeout(Ic, 700);
  }
  function Al(C) {
    if (!T.current) return;
    const P = Ae.current[Ye.current], M = a.current;
    if (C === P) {
      const B = M && M.querySelector(`.tile[data-id="${C}"]`);
      if (B) {
        const J = parseFloat(B.dataset.pitch || "880");
        B.style.background = pe.current || _, B.classList.remove("lit"), v.ok(J), ys(20, r);
      }
      if (Ye.current++, Ye.current >= Ae.current.length) {
        if (!Ge.current) {
          Ge.current = !0;
          const J = Math.ceil((Date.now() - $e.current) / 1e3);
          tu(J);
          try {
            window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
              method: "POST",
              body: JSON.stringify({
                level: e,
                // nivel actual
                total_time_s: J,
                success: 1
              })
            });
          } catch (tt) {
          }
        }
        E.current && clearInterval(E.current), y(!1), T.current = !1, k(!0);
        try {
          v.winMelody((Ut.current || []).slice(0, 6));
        } catch (J) {
        }
      }
    } else
      v.fail(), ys(80, r), Ye.current = 0, nu();
  }
  function Oc() {
    k(!1), f(!1);
    const C = e + 1;
    t(C), setTimeout(() => en(C), 0);
  }
  return L.useEffect(() => {
    window.LumetrixTest = { start: en, state: () => ({ level: e, world: S, levelInWorld: z, running: p, time: m, seqLen: (Ae.current || []).length }), tapExpected: () => {
      const C = Ae.current[Ye.current];
      C != null && Al(C);
    } };
  }, [e, S, z, p, m]), L.useEffect(() => {
    const C = (M) => Z(M), P = (M) => Ft(M);
    return se && (document.addEventListener("mousemove", C), document.addEventListener("mouseup", P)), () => {
      document.removeEventListener("mousemove", C), document.removeEventListener("mouseup", P);
    };
  }, [se, Z, Ft]), /* @__PURE__ */ g.jsxs("section", { className: "screen", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "topbar", children: [
      /* @__PURE__ */ g.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ g.jsx("img", { src: "sistema_apps_api/lumetrix/img/logo.png", alt: "LUMETRIX", style: { height: "32px", width: "auto" }, onError: (C) => {
          C.target.style.display = "none", C.target.nextSibling.style.display = "inline";
        } }),
        /* @__PURE__ */ g.jsx("span", { style: { display: "none", fontSize: "16px", fontWeight: "900", letterSpacing: "0.1em", color: "#fff" }, children: "LUMETRIX" })
      ] }),
      /* @__PURE__ */ g.jsxs("div", { className: "icons", children: [
        /* @__PURE__ */ g.jsxs("button", { className: "icon", onClick: o, "aria-label": "Ranking", children: [
          /* @__PURE__ */ g.jsx("img", { src: "sistema_apps_api/lumetrix/img/ico_ranking.png", alt: "Ranking", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (C) => {
            C.target.style.display = "none", C.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ g.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "🏆" })
        ] }),
        /* @__PURE__ */ g.jsxs("button", { className: "icon", onClick: i, "aria-label": "Opciones", children: [
          /* @__PURE__ */ g.jsx("img", { src: "sistema_apps_api/lumetrix/img/ico_config.png", alt: "Configuración", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (C) => {
            C.target.style.display = "none", C.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ g.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "⚙️" })
        ] }),
        /* @__PURE__ */ g.jsxs("button", { className: "icon", onClick: l, "aria-label": "Login", children: [
          /* @__PURE__ */ g.jsx("img", { src: "sistema_apps_api/lumetrix/img/ico_user.png", alt: "Usuario", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (C) => {
            C.target.style.display = "none", C.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ g.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "👤" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "hud", children: [
      /* @__PURE__ */ g.jsx("div", { className: "timebar", children: /* @__PURE__ */ g.jsx("i", { className: "timefill", style: { width: `${Math.max(0, Math.min(100, m / mo(e) * 100))}%` } }) }),
      /* @__PURE__ */ g.jsxs("div", { className: "meta", children: [
        /* @__PURE__ */ g.jsxs("span", { className: "chip", children: [
          "W ",
          /* @__PURE__ */ g.jsx("b", { children: S })
        ] }),
        /* @__PURE__ */ g.jsxs("span", { className: "chip", children: [
          "N ",
          /* @__PURE__ */ g.jsx("b", { children: z })
        ] }),
        /* @__PURE__ */ g.jsxs("span", { className: "chip", children: [
          "⏱ ",
          /* @__PURE__ */ g.jsxs("b", { children: [
            c,
            "s"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "board", ref: a, children: [
      S >= 2 && I.map((C) => /* @__PURE__ */ g.jsx(
        "div",
        {
          id: C.id,
          className: "drop-zone",
          style: {
            position: "absolute",
            left: C.x,
            top: C.y,
            width: "60px",
            height: "60px",
            border: `3px dashed ${C.color}`,
            borderRadius: "12px",
            background: "rgba(0,0,0,0.3)",
            pointerEvents: "auto",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            boxShadow: `0 0 15px ${C.color}33`
          },
          children: /* @__PURE__ */ g.jsx("div", { style: {
            width: "20px",
            height: "20px",
            border: `2px solid ${C.color}`,
            borderRadius: "50%",
            background: "transparent"
          } })
        },
        C.id
      )),
      !p && !w && !F && /* @__PURE__ */ g.jsxs("div", { className: "overlay", style: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }, children: [
        /* @__PURE__ */ g.jsx("button", { className: "btn-start", onClick: () => en(), children: "EMPEZAR" }),
        /* @__PURE__ */ g.jsxs("div", { style: { marginTop: "16px", color: "#ffffff88", fontSize: "16px", fontWeight: 600 }, children: [
          "Nivel ",
          e,
          " • Mundo ",
          S
        ] })
      ] }),
      w && /* @__PURE__ */ g.jsx("div", { className: "overlay", children: /* @__PURE__ */ g.jsxs("div", { className: "card-compact", style: { textAlign: "center" }, children: [
        /* @__PURE__ */ g.jsx("div", { style: { fontSize: 32, marginBottom: 8, textShadow: "0 0 10px var(--neon2), 0 0 20px var(--neon2)" }, children: "✨" }),
        /* @__PURE__ */ g.jsx("h3", { style: { color: "var(--neon2)", marginBottom: 12 }, children: "¡Nivel superado!" }),
        /* @__PURE__ */ g.jsx("button", { className: "btn btn1", onClick: Oc, children: "Siguiente" })
      ] }) }),
      F && /* @__PURE__ */ g.jsx("div", { className: "overlay", children: /* @__PURE__ */ g.jsxs("div", { className: "card-compact", style: { textAlign: "center" }, children: [
        /* @__PURE__ */ g.jsx("div", { style: { fontSize: 32, marginBottom: 8, textShadow: "0 0 10px var(--neon1), 0 0 20px var(--neon1)" }, children: "💔" }),
        /* @__PURE__ */ g.jsx("h3", { style: { color: "var(--neon1)", marginBottom: 12 }, children: "Tiempo agotado" }),
        /* @__PURE__ */ g.jsx("button", { className: "btn btn1", onClick: () => en(), children: "Reintentar" })
      ] }) }),
      /* @__PURE__ */ g.jsxs("div", { className: "bokeh", children: [
        /* @__PURE__ */ g.jsx("i", { className: "b1" }),
        /* @__PURE__ */ g.jsx("i", { className: "b2" }),
        /* @__PURE__ */ g.jsx("i", { className: "b3" })
      ] })
    ] })
  ] });
}
function hp({ onClose: e, total: t }) {
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
    ].sort((a, m) => a.time - m.time).map((a, m) => ({
      ...a,
      rank: m + 1
    }));
  })(), l = (u) => u === 1 ? "#FFD700" : u === 2 ? "#C0C0C0" : u === 3 ? "#CD7F32" : "#00ffff", o = (u) => u <= 3 ? ["🥇", "🥈", "🥉"][u - 1] : "🏆";
  return (i = r.find((u) => u.name === "Tú")) != null && i.rank, /* @__PURE__ */ g.jsx("div", { className: "modal", children: /* @__PURE__ */ g.jsxs("div", { className: "card", style: { border: "2px solid #00ffff", boxShadow: "0 0 20px #00ffff44" }, children: [
    /* @__PURE__ */ g.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #00ffff", boxShadow: "0 0 10px #00ffff", background: "#000" }, children: "✕" }),
    /* @__PURE__ */ g.jsx("h3", { style: { color: "#00ffff", marginTop: 0, textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff", fontSize: "20px" }, children: "RANKING GLOBAL" }),
    /* @__PURE__ */ g.jsx("div", { className: "list", style: { gap: "8px", maxHeight: "300px", overflowY: "auto" }, children: r.map((u) => {
      const s = u.name === "Tú";
      return /* @__PURE__ */ g.jsxs("div", { style: {
        background: s ? "rgba(0,255,255,0.3)" : "rgba(0,255,255,0.1)",
        border: s ? "2px solid #00ffff" : "1px solid #00ffff33",
        borderRadius: "8px",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: s ? "0 0 15px #00ffff66" : "none"
      }, children: [
        /* @__PURE__ */ g.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
          /* @__PURE__ */ g.jsx("span", { style: { fontSize: "16px" }, children: o(u.rank) }),
          /* @__PURE__ */ g.jsxs("span", { style: { color: l(u.rank), fontWeight: "bold", fontSize: "14px" }, children: [
            "#",
            u.rank
          ] }),
          /* @__PURE__ */ g.jsx("span", { style: { color: s ? "#00ffff" : "#fff", fontSize: "12px", fontWeight: s ? "bold" : "normal" }, children: u.name })
        ] }),
        /* @__PURE__ */ g.jsxs("div", { style: { textAlign: "right", fontSize: "11px", opacity: 0.8 }, children: [
          /* @__PURE__ */ g.jsxs("div", { children: [
            "W",
            u.world,
            " • N",
            u.level
          ] }),
          /* @__PURE__ */ g.jsxs("div", { style: { color: "#00ffff" }, children: [
            Math.round(u.time),
            "s"
          ] })
        ] })
      ] }, u.rank);
    }) })
  ] }) });
}
function gp({ onClose: e, onOpenAuth: t, level: n, setLevel: r, soundOn: l, vibrateOn: o, setSoundOn: i, setVibrateOn: u, onResetTotal: s }) {
  return /* @__PURE__ */ g.jsx("div", { className: "modal", children: /* @__PURE__ */ g.jsxs("div", { className: "card", style: { border: "2px solid #39ff14", boxShadow: "0 0 20px #39ff1444" }, children: [
    /* @__PURE__ */ g.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #39ff14", boxShadow: "0 0 10px #39ff14", background: "#000" }, children: "✕" }),
    /* @__PURE__ */ g.jsx("h3", { style: { color: "#39ff14", marginTop: 0, textShadow: "0 0 10px #39ff14, 0 0 20px #39ff14", fontSize: "20px" }, children: "⚙️ CONFIGURACIÓN" }),
    /* @__PURE__ */ g.jsxs("div", { className: "list", style: { gap: "12px" }, children: [
      /* @__PURE__ */ g.jsxs("label", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ g.jsx("span", { style: { color: "#39ff14", fontWeight: "bold" }, children: "🔊 Sonido" }),
        /* @__PURE__ */ g.jsx("input", { type: "checkbox", checked: l, onChange: (a) => i(a.target.checked), style: { transform: "scale(1.2)", accentColor: "#39ff14" } })
      ] }),
      /* @__PURE__ */ g.jsxs("label", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ g.jsx("span", { style: { color: "#39ff14", fontWeight: "bold" }, children: "📳 Vibración" }),
        /* @__PURE__ */ g.jsx("input", { type: "checkbox", checked: o, onChange: (a) => u(a.target.checked), style: { transform: "scale(1.2)", accentColor: "#39ff14" } })
      ] }),
      /* @__PURE__ */ g.jsxs("div", { style: { background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ g.jsx("div", { style: { color: "#39ff14", fontWeight: "bold", marginBottom: "8px", textAlign: "center" }, children: "🎯 Ir a nivel (DEBUG)" }),
        /* @__PURE__ */ g.jsxs("div", { style: { display: "flex", gap: "8px", alignItems: "center", justifyContent: "center" }, children: [
          /* @__PURE__ */ g.jsx("input", { type: "number", min: 1, max: 20, value: n, onChange: (a) => r(Math.max(1, Math.min(20, Number(a.target.value) || 1))), style: { width: 60, background: "#000", color: "#39ff14", border: "2px solid #39ff14", borderRadius: 8, padding: 6, boxShadow: "0 0 10px #39ff1444" } }),
          /* @__PURE__ */ g.jsx("button", { onClick: () => {
            e();
          }, style: { background: "rgba(57,255,20,0.2)", border: "2px solid #39ff14", color: "#39ff14", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: "12px", fontWeight: "bold", boxShadow: "0 0 10px #39ff1444" }, children: "IR" })
        ] })
      ] }),
      /* @__PURE__ */ g.jsx("button", { className: "btn", onClick: t, style: { border: "2px solid #00ffff", color: "#00ffff", boxShadow: "0 0 10px #00ffff44", fontWeight: "bold" }, children: "👤 Identificarse" }),
      /* @__PURE__ */ g.jsx("button", { className: "btn", onClick: () => {
        confirm("¿Reiniciar el tiempo total acumulado?") && s && s();
      }, style: { border: "2px solid #ff00ff", color: "#ff00ff", boxShadow: "0 0 10px #ff00ff44", fontWeight: "bold" }, children: "🔄 Reiniciar tiempo total" })
    ] })
  ] }) });
}
function vp({ onClose: e }) {
  return /* @__PURE__ */ g.jsx("div", { className: "modal", children: /* @__PURE__ */ g.jsxs("div", { className: "card", style: { maxWidth: "420px", border: "2px solid #ff00ff", boxShadow: "0 0 20px #ff00ff44" }, children: [
    /* @__PURE__ */ g.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #ff00ff", boxShadow: "0 0 10px #ff00ff", background: "#000" }, children: "✕" }),
    /* @__PURE__ */ g.jsx("h3", { style: { color: "#ff00ff", marginTop: 0, marginBottom: 12, textShadow: "0 0 10px #ff00ff, 0 0 20px #ff00ff", fontSize: "20px" }, children: "👤 REGISTRARSE" }),
    /* @__PURE__ */ g.jsxs("div", { className: "list", style: { gap: 12 }, children: [
      /* @__PURE__ */ g.jsx("input", { placeholder: "🎮 Nick", style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#ff00ff", boxShadow: "0 0 10px #ff00ff22" } }),
      /* @__PURE__ */ g.jsx("input", { placeholder: "📧 Correo", type: "email", style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#ff00ff", boxShadow: "0 0 10px #ff00ff22" } }),
      /* @__PURE__ */ g.jsx("input", { placeholder: "🔒 Contraseña", type: "password", style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#ff00ff", boxShadow: "0 0 10px #ff00ff22" } }),
      /* @__PURE__ */ g.jsxs("div", { style: { display: "flex", gap: 12, justifyContent: "center", marginTop: 8 }, children: [
        /* @__PURE__ */ g.jsx("button", { className: "btn btn1", style: { border: "2px solid #39ff14", color: "#39ff14", boxShadow: "0 0 10px #39ff1444", fontWeight: "bold" }, children: "✅ Registrarse" }),
        /* @__PURE__ */ g.jsx("button", { className: "btn", onClick: e, style: { border: "2px solid #00ffff", color: "#00ffff", boxShadow: "0 0 10px #00ffff44", fontWeight: "bold" }, children: "❌ Cancelar" })
      ] })
    ] })
  ] }) });
}
function yp() {
  dp();
  const [e, t] = L.useState("intro"), [n, r] = L.useState(!1), [l, o] = L.useState(!1), [i, u] = L.useState(!1), [s, a] = L.useState(!0), [m, h] = L.useState(!0), [p, y] = L.useState(1), [w, k] = L.useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0;
    } catch (F) {
      return 0;
    }
  });
  return L.useEffect(() => {
    window.LumetrixTest = Object.assign({}, window.LumetrixTest, { help: "LumetrixTest.start(), .tapExpected(), .state() — tras pulsar Jugar" });
  }, []), /* @__PURE__ */ g.jsx("div", { className: "shell", children: /* @__PURE__ */ g.jsxs("div", { className: "device", children: [
    e === "intro" ? /* @__PURE__ */ g.jsx(pp, { onPlay: () => t("game"), onAuth: () => u(!0) }) : /* @__PURE__ */ g.jsx(
      mp,
      {
        level: p,
        setLevel: y,
        soundOn: s,
        vibrateOn: m,
        onOpenAuth: () => u(!0),
        onOpenRanking: () => r(!0),
        onOpenOptions: () => o(!0),
        onTotalUpdate: k,
        totalTime: w
      }
    ),
    n && /* @__PURE__ */ g.jsx(hp, { onClose: () => r(!1), total: w }),
    l && /* @__PURE__ */ g.jsx(
      gp,
      {
        onClose: () => o(!1),
        onOpenAuth: () => {
          o(!1), u(!0);
        },
        level: p,
        setLevel: y,
        soundOn: s,
        vibrateOn: m,
        setSoundOn: a,
        setVibrateOn: h,
        onResetTotal: () => {
          try {
            localStorage.removeItem("lum_total");
          } catch (F) {
          }
          k(0);
        }
      }
    ),
    i && /* @__PURE__ */ g.jsx(vp, { onClose: () => u(!1) })
  ] }) });
}
function xp(e) {
  const t = Lc(e);
  t.render(/* @__PURE__ */ g.jsx(yp, {})), e.__lum_unmount = () => {
    var n;
    return (n = t.unmount) == null ? void 0 : n.call(t);
  };
}
function wp(e) {
  var t;
  try {
    (t = e.__lum_unmount) == null || t.call(e);
  } catch (n) {
  }
}
export {
  xp as mount,
  wp as unmount
};
//# sourceMappingURL=game.bundle.js.map
