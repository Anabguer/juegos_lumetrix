var sa = { exports: {} }, ro = {}, aa = { exports: {} }, $ = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hr = Symbol.for("react.element"), jf = Symbol.for("react.portal"), Lf = Symbol.for("react.fragment"), Pf = Symbol.for("react.strict_mode"), Rf = Symbol.for("react.profiler"), Mf = Symbol.for("react.provider"), If = Symbol.for("react.context"), Df = Symbol.for("react.forward_ref"), Of = Symbol.for("react.suspense"), Ff = Symbol.for("react.memo"), Af = Symbol.for("react.lazy"), Gu = Symbol.iterator;
function Uf(e) {
  return e === null || typeof e != "object" ? null : (e = Gu && e[Gu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ca = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, fa = Object.assign, da = {};
function qn(e, t, n) {
  this.props = e, this.context = t, this.refs = da, this.updater = n || ca;
}
qn.prototype.isReactComponent = {};
qn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
qn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function pa() {
}
pa.prototype = qn.prototype;
function Xi(e, t, n) {
  this.props = e, this.context = t, this.refs = da, this.updater = n || ca;
}
var Ki = Xi.prototype = new pa();
Ki.constructor = Xi;
fa(Ki, qn.prototype);
Ki.isPureReactComponent = !0;
var Ju = Array.isArray, ha = Object.prototype.hasOwnProperty, Yi = { current: null }, ma = { key: !0, ref: !0, __self: !0, __source: !0 };
function ga(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) ha.call(t, r) && !ma.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var s = Array(u), c = 0; c < u; c++) s[c] = arguments[c + 2];
    l.children = s;
  }
  if (e && e.defaultProps) for (r in u = e.defaultProps, u) l[r] === void 0 && (l[r] = u[r]);
  return { $$typeof: Hr, type: e, key: o, ref: i, props: l, _owner: Yi.current };
}
function $f(e, t) {
  return { $$typeof: Hr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Gi(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Hr;
}
function Bf(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Zu = /\/+/g;
function To(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Bf("" + e.key) : t.toString(36);
}
function Sl(e, t, n, r, l) {
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
        case Hr:
        case jf:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + To(i, 0) : r, Ju(l) ? (n = "", e != null && (n = e.replace(Zu, "$&/") + "/"), Sl(l, t, n, "", function(c) {
    return c;
  })) : l != null && (Gi(l) && (l = $f(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Zu, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", Ju(e)) for (var u = 0; u < e.length; u++) {
    o = e[u];
    var s = r + To(o, u);
    i += Sl(o, t, n, s, l);
  }
  else if (s = Uf(e), typeof s == "function") for (e = s.call(e), u = 0; !(o = e.next()).done; ) o = o.value, s = r + To(o, u++), i += Sl(o, t, n, s, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function ll(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Sl(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function Wf(e) {
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
var Le = { current: null }, kl = { transition: null }, Hf = { ReactCurrentDispatcher: Le, ReactCurrentBatchConfig: kl, ReactCurrentOwner: Yi };
function ya() {
  throw Error("act(...) is not supported in production builds of React.");
}
$.Children = { map: ll, forEach: function(e, t, n) {
  ll(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return ll(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return ll(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Gi(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
$.Component = qn;
$.Fragment = Lf;
$.Profiler = Rf;
$.PureComponent = Xi;
$.StrictMode = Pf;
$.Suspense = Of;
$.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Hf;
$.act = ya;
$.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = fa({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = Yi.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var u = e.type.defaultProps;
    for (s in t) ha.call(t, s) && !ma.hasOwnProperty(s) && (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    u = Array(s);
    for (var c = 0; c < s; c++) u[c] = arguments[c + 2];
    r.children = u;
  }
  return { $$typeof: Hr, type: e.type, key: l, ref: o, props: r, _owner: i };
};
$.createContext = function(e) {
  return e = { $$typeof: If, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Mf, _context: e }, e.Consumer = e;
};
$.createElement = ga;
$.createFactory = function(e) {
  var t = ga.bind(null, e);
  return t.type = e, t;
};
$.createRef = function() {
  return { current: null };
};
$.forwardRef = function(e) {
  return { $$typeof: Df, render: e };
};
$.isValidElement = Gi;
$.lazy = function(e) {
  return { $$typeof: Af, _payload: { _status: -1, _result: e }, _init: Wf };
};
$.memo = function(e, t) {
  return { $$typeof: Ff, type: e, compare: t === void 0 ? null : t };
};
$.startTransition = function(e) {
  var t = kl.transition;
  kl.transition = {};
  try {
    e();
  } finally {
    kl.transition = t;
  }
};
$.unstable_act = ya;
$.useCallback = function(e, t) {
  return Le.current.useCallback(e, t);
};
$.useContext = function(e) {
  return Le.current.useContext(e);
};
$.useDebugValue = function() {
};
$.useDeferredValue = function(e) {
  return Le.current.useDeferredValue(e);
};
$.useEffect = function(e, t) {
  return Le.current.useEffect(e, t);
};
$.useId = function() {
  return Le.current.useId();
};
$.useImperativeHandle = function(e, t, n) {
  return Le.current.useImperativeHandle(e, t, n);
};
$.useInsertionEffect = function(e, t) {
  return Le.current.useInsertionEffect(e, t);
};
$.useLayoutEffect = function(e, t) {
  return Le.current.useLayoutEffect(e, t);
};
$.useMemo = function(e, t) {
  return Le.current.useMemo(e, t);
};
$.useReducer = function(e, t, n) {
  return Le.current.useReducer(e, t, n);
};
$.useRef = function(e) {
  return Le.current.useRef(e);
};
$.useState = function(e) {
  return Le.current.useState(e);
};
$.useSyncExternalStore = function(e, t, n) {
  return Le.current.useSyncExternalStore(e, t, n);
};
$.useTransition = function() {
  return Le.current.useTransition();
};
$.version = "18.3.1";
aa.exports = $;
var _ = aa.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vf = _, Qf = Symbol.for("react.element"), Xf = Symbol.for("react.fragment"), Kf = Object.prototype.hasOwnProperty, Yf = Vf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Gf = { key: !0, ref: !0, __self: !0, __source: !0 };
function va(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) Kf.call(t, r) && !Gf.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Qf, type: e, key: o, ref: i, props: l, _owner: Yf.current };
}
ro.Fragment = Xf;
ro.jsx = va;
ro.jsxs = va;
sa.exports = ro;
var m = sa.exports, xa = { exports: {} }, He = {}, wa = { exports: {} }, Sa = {};
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
  function t(j, F) {
    var O = j.length;
    j.push(F);
    e: for (; 0 < O; ) {
      var H = O - 1 >>> 1, re = j[H];
      if (0 < l(re, F)) j[H] = F, j[O] = re, O = H;
      else break e;
    }
  }
  function n(j) {
    return j.length === 0 ? null : j[0];
  }
  function r(j) {
    if (j.length === 0) return null;
    var F = j[0], O = j.pop();
    if (O !== F) {
      j[0] = O;
      e: for (var H = 0, re = j.length, et = re >>> 1; H < et; ) {
        var V = 2 * (H + 1) - 1, tt = j[V], zt = V + 1, ht = j[zt];
        if (0 > l(tt, O)) zt < re && 0 > l(ht, tt) ? (j[H] = ht, j[zt] = O, H = zt) : (j[H] = tt, j[V] = O, H = V);
        else if (zt < re && 0 > l(ht, O)) j[H] = ht, j[zt] = O, H = zt;
        else break e;
      }
    }
    return F;
  }
  function l(j, F) {
    var O = j.sortIndex - F.sortIndex;
    return O !== 0 ? O : j.id - F.id;
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
  var s = [], c = [], g = 1, p = null, h = 3, x = !1, S = !1, v = !1, D = typeof setTimeout == "function" ? setTimeout : null, d = typeof clearTimeout == "function" ? clearTimeout : null, a = typeof setImmediate != "undefined" ? setImmediate : null;
  typeof navigator != "undefined" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function f(j) {
    for (var F = n(c); F !== null; ) {
      if (F.callback === null) r(c);
      else if (F.startTime <= j) r(c), F.sortIndex = F.expirationTime, t(s, F);
      else break;
      F = n(c);
    }
  }
  function y(j) {
    if (v = !1, f(j), !S) if (n(s) !== null) S = !0, Re(k);
    else {
      var F = n(c);
      F !== null && Me(y, F.startTime - j);
    }
  }
  function k(j, F) {
    S = !1, v && (v = !1, d(N), N = -1), x = !0;
    var O = h;
    try {
      for (f(F), p = n(s); p !== null && (!(p.expirationTime > F) || j && !se()); ) {
        var H = p.callback;
        if (typeof H == "function") {
          p.callback = null, h = p.priorityLevel;
          var re = H(p.expirationTime <= F);
          F = e.unstable_now(), typeof re == "function" ? p.callback = re : p === n(s) && r(s), f(F);
        } else r(s);
        p = n(s);
      }
      if (p !== null) var et = !0;
      else {
        var V = n(c);
        V !== null && Me(y, V.startTime - F), et = !1;
      }
      return et;
    } finally {
      p = null, h = O, x = !1;
    }
  }
  var z = !1, L = null, N = -1, Y = 5, U = -1;
  function se() {
    return !(e.unstable_now() - U < Y);
  }
  function en() {
    if (L !== null) {
      var j = e.unstable_now();
      U = j;
      var F = !0;
      try {
        F = L(!0, j);
      } finally {
        F ? tn() : (z = !1, L = null);
      }
    } else z = !1;
  }
  var tn;
  if (typeof a == "function") tn = function() {
    a(en);
  };
  else if (typeof MessageChannel != "undefined") {
    var wo = new MessageChannel(), ie = wo.port2;
    wo.port1.onmessage = en, tn = function() {
      ie.postMessage(null);
    };
  } else tn = function() {
    D(en, 0);
  };
  function Re(j) {
    L = j, z || (z = !0, tn());
  }
  function Me(j, F) {
    N = D(function() {
      j(e.unstable_now());
    }, F);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(j) {
    j.callback = null;
  }, e.unstable_continueExecution = function() {
    S || x || (S = !0, Re(k));
  }, e.unstable_forceFrameRate = function(j) {
    0 > j || 125 < j ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Y = 0 < j ? Math.floor(1e3 / j) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(s);
  }, e.unstable_next = function(j) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var F = 3;
        break;
      default:
        F = h;
    }
    var O = h;
    h = F;
    try {
      return j();
    } finally {
      h = O;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(j, F) {
    switch (j) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        j = 3;
    }
    var O = h;
    h = j;
    try {
      return F();
    } finally {
      h = O;
    }
  }, e.unstable_scheduleCallback = function(j, F, O) {
    var H = e.unstable_now();
    switch (typeof O == "object" && O !== null ? (O = O.delay, O = typeof O == "number" && 0 < O ? H + O : H) : O = H, j) {
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
    return re = O + re, j = { id: g++, callback: F, priorityLevel: j, startTime: O, expirationTime: re, sortIndex: -1 }, O > H ? (j.sortIndex = O, t(c, j), n(s) === null && j === n(c) && (v ? (d(N), N = -1) : v = !0, Me(y, O - H))) : (j.sortIndex = re, t(s, j), S || x || (S = !0, Re(k))), j;
  }, e.unstable_shouldYield = se, e.unstable_wrapCallback = function(j) {
    var F = h;
    return function() {
      var O = h;
      h = F;
      try {
        return j.apply(this, arguments);
      } finally {
        h = O;
      }
    };
  };
})(Sa);
wa.exports = Sa;
var Jf = wa.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zf = _, We = Jf;
function C(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ka = /* @__PURE__ */ new Set(), Nr = {};
function Sn(e, t) {
  Qn(e, t), Qn(e + "Capture", t);
}
function Qn(e, t) {
  for (Nr[e] = t, e = 0; e < t.length; e++) ka.add(t[e]);
}
var Et = !(typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined"), ei = Object.prototype.hasOwnProperty, qf = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, qu = {}, bu = {};
function bf(e) {
  return ei.call(bu, e) ? !0 : ei.call(qu, e) ? !1 : qf.test(e) ? bu[e] = !0 : (qu[e] = !0, !1);
}
function ed(e, t, n, r) {
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
function td(e, t, n, r) {
  if (t === null || typeof t == "undefined" || ed(e, t, n, r)) return !0;
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
function Pe(e, t, n, r, l, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
var ke = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ke[e] = new Pe(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ke[t] = new Pe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ke[e] = new Pe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ke[e] = new Pe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ke[e] = new Pe(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ke[e] = new Pe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ke[e] = new Pe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ke[e] = new Pe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ke[e] = new Pe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ji = /[\-:]([a-z])/g;
function Zi(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Ji,
    Zi
  );
  ke[t] = new Pe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Ji, Zi);
  ke[t] = new Pe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Ji, Zi);
  ke[t] = new Pe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ke[e] = new Pe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ke.xlinkHref = new Pe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ke[e] = new Pe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function qi(e, t, n, r) {
  var l = ke.hasOwnProperty(t) ? ke[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (td(t, n, l, r) && (n = null), r || l === null ? bf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Tt = Zf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ol = Symbol.for("react.element"), Tn = Symbol.for("react.portal"), zn = Symbol.for("react.fragment"), bi = Symbol.for("react.strict_mode"), ti = Symbol.for("react.profiler"), Ea = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), eu = Symbol.for("react.forward_ref"), ni = Symbol.for("react.suspense"), ri = Symbol.for("react.suspense_list"), tu = Symbol.for("react.memo"), Dt = Symbol.for("react.lazy"), _a = Symbol.for("react.offscreen"), es = Symbol.iterator;
function or(e) {
  return e === null || typeof e != "object" ? null : (e = es && e[es] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ne = Object.assign, zo;
function pr(e) {
  if (zo === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    zo = t && t[1] || "";
  }
  return `
` + zo + e;
}
var jo = !1;
function Lo(e, t) {
  if (!e || jo) return "";
  jo = !0;
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
    jo = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? pr(e) : "";
}
function nd(e) {
  switch (e.tag) {
    case 5:
      return pr(e.type);
    case 16:
      return pr("Lazy");
    case 13:
      return pr("Suspense");
    case 19:
      return pr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Lo(e.type, !1), e;
    case 11:
      return e = Lo(e.type.render, !1), e;
    case 1:
      return e = Lo(e.type, !0), e;
    default:
      return "";
  }
}
function li(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case zn:
      return "Fragment";
    case Tn:
      return "Portal";
    case ti:
      return "Profiler";
    case bi:
      return "StrictMode";
    case ni:
      return "Suspense";
    case ri:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Ca:
      return (e.displayName || "Context") + ".Consumer";
    case Ea:
      return (e._context.displayName || "Context") + ".Provider";
    case eu:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case tu:
      return t = e.displayName || null, t !== null ? t : li(e.type) || "Memo";
    case Dt:
      t = e._payload, e = e._init;
      try {
        return li(e(t));
      } catch (n) {
      }
  }
  return null;
}
function rd(e) {
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
      return li(t);
    case 8:
      return t === bi ? "StrictMode" : "Mode";
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
function Gt(e) {
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
function Na(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function ld(e) {
  var t = Na(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function il(e) {
  e._valueTracker || (e._valueTracker = ld(e));
}
function Ta(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Na(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Ml(e) {
  if (e = e || (typeof document != "undefined" ? document : void 0), typeof e == "undefined") return null;
  try {
    return e.activeElement || e.body;
  } catch (t) {
    return e.body;
  }
}
function oi(e, t) {
  var n = t.checked;
  return ne({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n != null ? n : e._wrapperState.initialChecked });
}
function ts(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = Gt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function za(e, t) {
  t = t.checked, t != null && qi(e, "checked", t, !1);
}
function ii(e, t) {
  za(e, t);
  var n = Gt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? ui(e, t.type, n) : t.hasOwnProperty("defaultValue") && ui(e, t.type, Gt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function ns(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function ui(e, t, n) {
  (t !== "number" || Ml(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var hr = Array.isArray;
function Un(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Gt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function si(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(C(91));
  return ne({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function rs(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(C(92));
      if (hr(n)) {
        if (1 < n.length) throw Error(C(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: Gt(n) };
}
function ja(e, t) {
  var n = Gt(t.value), r = Gt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function ls(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function La(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ai(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? La(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var ul, Pa = function(e) {
  return typeof MSApp != "undefined" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (ul = ul || document.createElement("div"), ul.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = ul.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Tr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var yr = {
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
}, od = ["Webkit", "ms", "Moz", "O"];
Object.keys(yr).forEach(function(e) {
  od.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), yr[t] = yr[e];
  });
});
function Ra(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || yr.hasOwnProperty(e) && yr[e] ? ("" + t).trim() : t + "px";
}
function Ma(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Ra(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var id = ne({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function ci(e, t) {
  if (t) {
    if (id[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(C(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(C(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(C(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(C(62));
  }
}
function fi(e, t) {
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
var di = null;
function nu(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var pi = null, $n = null, Bn = null;
function os(e) {
  if (e = Xr(e)) {
    if (typeof pi != "function") throw Error(C(280));
    var t = e.stateNode;
    t && (t = so(t), pi(e.stateNode, e.type, t));
  }
}
function Ia(e) {
  $n ? Bn ? Bn.push(e) : Bn = [e] : $n = e;
}
function Da() {
  if ($n) {
    var e = $n, t = Bn;
    if (Bn = $n = null, os(e), t) for (e = 0; e < t.length; e++) os(t[e]);
  }
}
function Oa(e, t) {
  return e(t);
}
function Fa() {
}
var Po = !1;
function Aa(e, t, n) {
  if (Po) return e(t, n);
  Po = !0;
  try {
    return Oa(e, t, n);
  } finally {
    Po = !1, ($n !== null || Bn !== null) && (Fa(), Da());
  }
}
function zr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = so(n);
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
var hi = !1;
if (Et) try {
  var ir = {};
  Object.defineProperty(ir, "passive", { get: function() {
    hi = !0;
  } }), window.addEventListener("test", ir, ir), window.removeEventListener("test", ir, ir);
} catch (e) {
  hi = !1;
}
function ud(e, t, n, r, l, o, i, u, s) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (g) {
    this.onError(g);
  }
}
var vr = !1, Il = null, Dl = !1, mi = null, sd = { onError: function(e) {
  vr = !0, Il = e;
} };
function ad(e, t, n, r, l, o, i, u, s) {
  vr = !1, Il = null, ud.apply(sd, arguments);
}
function cd(e, t, n, r, l, o, i, u, s) {
  if (ad.apply(this, arguments), vr) {
    if (vr) {
      var c = Il;
      vr = !1, Il = null;
    } else throw Error(C(198));
    Dl || (Dl = !0, mi = c);
  }
}
function kn(e) {
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
function Ua(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function is(e) {
  if (kn(e) !== e) throw Error(C(188));
}
function fd(e) {
  var t = e.alternate;
  if (!t) {
    if (t = kn(e), t === null) throw Error(C(188));
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
        if (o === n) return is(l), e;
        if (o === r) return is(l), t;
        o = o.sibling;
      }
      throw Error(C(188));
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
        if (!i) throw Error(C(189));
      }
    }
    if (n.alternate !== r) throw Error(C(190));
  }
  if (n.tag !== 3) throw Error(C(188));
  return n.stateNode.current === n ? e : t;
}
function $a(e) {
  return e = fd(e), e !== null ? Ba(e) : null;
}
function Ba(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ba(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Wa = We.unstable_scheduleCallback, us = We.unstable_cancelCallback, dd = We.unstable_shouldYield, pd = We.unstable_requestPaint, ue = We.unstable_now, hd = We.unstable_getCurrentPriorityLevel, ru = We.unstable_ImmediatePriority, Ha = We.unstable_UserBlockingPriority, Ol = We.unstable_NormalPriority, md = We.unstable_LowPriority, Va = We.unstable_IdlePriority, lo = null, dt = null;
function gd(e) {
  if (dt && typeof dt.onCommitFiberRoot == "function") try {
    dt.onCommitFiberRoot(lo, e, void 0, (e.current.flags & 128) === 128);
  } catch (t) {
  }
}
var it = Math.clz32 ? Math.clz32 : xd, yd = Math.log, vd = Math.LN2;
function xd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (yd(e) / vd | 0) | 0;
}
var sl = 64, al = 4194304;
function mr(e) {
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
function Fl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var u = i & ~l;
    u !== 0 ? r = mr(u) : (o &= i, o !== 0 && (r = mr(o)));
  } else i = n & ~l, i !== 0 ? r = mr(i) : o !== 0 && (r = mr(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - it(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function wd(e, t) {
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
function Sd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - it(o), u = 1 << i, s = l[i];
    s === -1 ? (!(u & n) || u & r) && (l[i] = wd(u, t)) : s <= t && (e.expiredLanes |= u), o &= ~u;
  }
}
function gi(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Qa() {
  var e = sl;
  return sl <<= 1, !(sl & 4194240) && (sl = 64), e;
}
function Ro(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Vr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - it(t), e[t] = n;
}
function kd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - it(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function lu(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - it(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var X = 0;
function Xa(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Ka, ou, Ya, Ga, Ja, yi = !1, cl = [], Bt = null, Wt = null, Ht = null, jr = /* @__PURE__ */ new Map(), Lr = /* @__PURE__ */ new Map(), Ft = [], Ed = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function ss(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Bt = null;
      break;
    case "dragenter":
    case "dragleave":
      Wt = null;
      break;
    case "mouseover":
    case "mouseout":
      Ht = null;
      break;
    case "pointerover":
    case "pointerout":
      jr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Lr.delete(t.pointerId);
  }
}
function ur(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = Xr(t), t !== null && ou(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Cd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return Bt = ur(Bt, e, t, n, r, l), !0;
    case "dragenter":
      return Wt = ur(Wt, e, t, n, r, l), !0;
    case "mouseover":
      return Ht = ur(Ht, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return jr.set(o, ur(jr.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Lr.set(o, ur(Lr.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Za(e) {
  var t = fn(e.target);
  if (t !== null) {
    var n = kn(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ua(n), t !== null) {
          e.blockedOn = t, Ja(e.priority, function() {
            Ya(n);
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
function El(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = vi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      di = r, n.target.dispatchEvent(r), di = null;
    } else return t = Xr(n), t !== null && ou(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function as(e, t, n) {
  El(e) && n.delete(t);
}
function _d() {
  yi = !1, Bt !== null && El(Bt) && (Bt = null), Wt !== null && El(Wt) && (Wt = null), Ht !== null && El(Ht) && (Ht = null), jr.forEach(as), Lr.forEach(as);
}
function sr(e, t) {
  e.blockedOn === t && (e.blockedOn = null, yi || (yi = !0, We.unstable_scheduleCallback(We.unstable_NormalPriority, _d)));
}
function Pr(e) {
  function t(l) {
    return sr(l, e);
  }
  if (0 < cl.length) {
    sr(cl[0], e);
    for (var n = 1; n < cl.length; n++) {
      var r = cl[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (Bt !== null && sr(Bt, e), Wt !== null && sr(Wt, e), Ht !== null && sr(Ht, e), jr.forEach(t), Lr.forEach(t), n = 0; n < Ft.length; n++) r = Ft[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Ft.length && (n = Ft[0], n.blockedOn === null); ) Za(n), n.blockedOn === null && Ft.shift();
}
var Wn = Tt.ReactCurrentBatchConfig, Al = !0;
function Nd(e, t, n, r) {
  var l = X, o = Wn.transition;
  Wn.transition = null;
  try {
    X = 1, iu(e, t, n, r);
  } finally {
    X = l, Wn.transition = o;
  }
}
function Td(e, t, n, r) {
  var l = X, o = Wn.transition;
  Wn.transition = null;
  try {
    X = 4, iu(e, t, n, r);
  } finally {
    X = l, Wn.transition = o;
  }
}
function iu(e, t, n, r) {
  if (Al) {
    var l = vi(e, t, n, r);
    if (l === null) Wo(e, t, r, Ul, n), ss(e, r);
    else if (Cd(l, e, t, n, r)) r.stopPropagation();
    else if (ss(e, r), t & 4 && -1 < Ed.indexOf(e)) {
      for (; l !== null; ) {
        var o = Xr(l);
        if (o !== null && Ka(o), o = vi(e, t, n, r), o === null && Wo(e, t, r, Ul, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Wo(e, t, r, null, n);
  }
}
var Ul = null;
function vi(e, t, n, r) {
  if (Ul = null, e = nu(r), e = fn(e), e !== null) if (t = kn(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Ua(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Ul = e, null;
}
function qa(e) {
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
      switch (hd()) {
        case ru:
          return 1;
        case Ha:
          return 4;
        case Ol:
        case md:
          return 16;
        case Va:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Ut = null, uu = null, Cl = null;
function ba() {
  if (Cl) return Cl;
  var e, t = uu, n = t.length, r, l = "value" in Ut ? Ut.value : Ut.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return Cl = l.slice(e, 1 < r ? 1 - r : void 0);
}
function _l(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function fl() {
  return !0;
}
function cs() {
  return !1;
}
function Ve(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var u in e) e.hasOwnProperty(u) && (n = e[u], this[u] = n ? n(o) : o[u]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? fl : cs, this.isPropagationStopped = cs, this;
  }
  return ne(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = fl);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = fl);
  }, persist: function() {
  }, isPersistent: fl }), t;
}
var bn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, su = Ve(bn), Qr = ne({}, bn, { view: 0, detail: 0 }), zd = Ve(Qr), Mo, Io, ar, oo = ne({}, Qr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: au, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== ar && (ar && e.type === "mousemove" ? (Mo = e.screenX - ar.screenX, Io = e.screenY - ar.screenY) : Io = Mo = 0, ar = e), Mo);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Io;
} }), fs = Ve(oo), jd = ne({}, oo, { dataTransfer: 0 }), Ld = Ve(jd), Pd = ne({}, Qr, { relatedTarget: 0 }), Do = Ve(Pd), Rd = ne({}, bn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Md = Ve(Rd), Id = ne({}, bn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Dd = Ve(Id), Od = ne({}, bn, { data: 0 }), ds = Ve(Od), Fd = {
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
}, Ad = {
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
}, Ud = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function $d(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Ud[e]) ? !!t[e] : !1;
}
function au() {
  return $d;
}
var Bd = ne({}, Qr, { key: function(e) {
  if (e.key) {
    var t = Fd[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = _l(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Ad[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: au, charCode: function(e) {
  return e.type === "keypress" ? _l(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? _l(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Wd = Ve(Bd), Hd = ne({}, oo, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ps = Ve(Hd), Vd = ne({}, Qr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: au }), Qd = Ve(Vd), Xd = ne({}, bn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Kd = Ve(Xd), Yd = ne({}, oo, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Gd = Ve(Yd), Jd = [9, 13, 27, 32], cu = Et && "CompositionEvent" in window, xr = null;
Et && "documentMode" in document && (xr = document.documentMode);
var Zd = Et && "TextEvent" in window && !xr, ec = Et && (!cu || xr && 8 < xr && 11 >= xr), hs = " ", ms = !1;
function tc(e, t) {
  switch (e) {
    case "keyup":
      return Jd.indexOf(t.keyCode) !== -1;
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
function nc(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var jn = !1;
function qd(e, t) {
  switch (e) {
    case "compositionend":
      return nc(t);
    case "keypress":
      return t.which !== 32 ? null : (ms = !0, hs);
    case "textInput":
      return e = t.data, e === hs && ms ? null : e;
    default:
      return null;
  }
}
function bd(e, t) {
  if (jn) return e === "compositionend" || !cu && tc(e, t) ? (e = ba(), Cl = uu = Ut = null, jn = !1, e) : null;
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
      return ec && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var ep = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function gs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!ep[e.type] : t === "textarea";
}
function rc(e, t, n, r) {
  Ia(r), t = $l(t, "onChange"), 0 < t.length && (n = new su("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var wr = null, Rr = null;
function tp(e) {
  hc(e, 0);
}
function io(e) {
  var t = Rn(e);
  if (Ta(t)) return e;
}
function np(e, t) {
  if (e === "change") return t;
}
var lc = !1;
if (Et) {
  var Oo;
  if (Et) {
    var Fo = "oninput" in document;
    if (!Fo) {
      var ys = document.createElement("div");
      ys.setAttribute("oninput", "return;"), Fo = typeof ys.oninput == "function";
    }
    Oo = Fo;
  } else Oo = !1;
  lc = Oo && (!document.documentMode || 9 < document.documentMode);
}
function vs() {
  wr && (wr.detachEvent("onpropertychange", oc), Rr = wr = null);
}
function oc(e) {
  if (e.propertyName === "value" && io(Rr)) {
    var t = [];
    rc(t, Rr, e, nu(e)), Aa(tp, t);
  }
}
function rp(e, t, n) {
  e === "focusin" ? (vs(), wr = t, Rr = n, wr.attachEvent("onpropertychange", oc)) : e === "focusout" && vs();
}
function lp(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return io(Rr);
}
function op(e, t) {
  if (e === "click") return io(t);
}
function ip(e, t) {
  if (e === "input" || e === "change") return io(t);
}
function up(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var st = typeof Object.is == "function" ? Object.is : up;
function Mr(e, t) {
  if (st(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ei.call(t, l) || !st(e[l], t[l])) return !1;
  }
  return !0;
}
function xs(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ws(e, t) {
  var n = xs(e);
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
    n = xs(n);
  }
}
function ic(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ic(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function uc() {
  for (var e = window, t = Ml(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch (r) {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Ml(e.document);
  }
  return t;
}
function fu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function sp(e) {
  var t = uc(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && ic(n.ownerDocument.documentElement, n)) {
    if (r !== null && fu(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = ws(n, o);
        var i = ws(
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
var ap = Et && "documentMode" in document && 11 >= document.documentMode, Ln = null, xi = null, Sr = null, wi = !1;
function Ss(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  wi || Ln == null || Ln !== Ml(r) || (r = Ln, "selectionStart" in r && fu(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Sr && Mr(Sr, r) || (Sr = r, r = $l(xi, "onSelect"), 0 < r.length && (t = new su("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Ln)));
}
function dl(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Pn = { animationend: dl("Animation", "AnimationEnd"), animationiteration: dl("Animation", "AnimationIteration"), animationstart: dl("Animation", "AnimationStart"), transitionend: dl("Transition", "TransitionEnd") }, Ao = {}, sc = {};
Et && (sc = document.createElement("div").style, "AnimationEvent" in window || (delete Pn.animationend.animation, delete Pn.animationiteration.animation, delete Pn.animationstart.animation), "TransitionEvent" in window || delete Pn.transitionend.transition);
function uo(e) {
  if (Ao[e]) return Ao[e];
  if (!Pn[e]) return e;
  var t = Pn[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in sc) return Ao[e] = t[n];
  return e;
}
var ac = uo("animationend"), cc = uo("animationiteration"), fc = uo("animationstart"), dc = uo("transitionend"), pc = /* @__PURE__ */ new Map(), ks = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Zt(e, t) {
  pc.set(e, t), Sn(t, [e]);
}
for (var Uo = 0; Uo < ks.length; Uo++) {
  var $o = ks[Uo], cp = $o.toLowerCase(), fp = $o[0].toUpperCase() + $o.slice(1);
  Zt(cp, "on" + fp);
}
Zt(ac, "onAnimationEnd");
Zt(cc, "onAnimationIteration");
Zt(fc, "onAnimationStart");
Zt("dblclick", "onDoubleClick");
Zt("focusin", "onFocus");
Zt("focusout", "onBlur");
Zt(dc, "onTransitionEnd");
Qn("onMouseEnter", ["mouseout", "mouseover"]);
Qn("onMouseLeave", ["mouseout", "mouseover"]);
Qn("onPointerEnter", ["pointerout", "pointerover"]);
Qn("onPointerLeave", ["pointerout", "pointerover"]);
Sn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Sn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Sn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Sn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Sn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Sn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var gr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), dp = new Set("cancel close invalid load scroll toggle".split(" ").concat(gr));
function Es(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, cd(r, t, void 0, e), e.currentTarget = null;
}
function hc(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var u = r[i], s = u.instance, c = u.currentTarget;
        if (u = u.listener, s !== o && l.isPropagationStopped()) break e;
        Es(l, u, c), o = s;
      }
      else for (i = 0; i < r.length; i++) {
        if (u = r[i], s = u.instance, c = u.currentTarget, u = u.listener, s !== o && l.isPropagationStopped()) break e;
        Es(l, u, c), o = s;
      }
    }
  }
  if (Dl) throw e = mi, Dl = !1, mi = null, e;
}
function Z(e, t) {
  var n = t[_i];
  n === void 0 && (n = t[_i] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (mc(t, e, 2, !1), n.add(r));
}
function Bo(e, t, n) {
  var r = 0;
  t && (r |= 4), mc(n, e, r, t);
}
var pl = "_reactListening" + Math.random().toString(36).slice(2);
function Ir(e) {
  if (!e[pl]) {
    e[pl] = !0, ka.forEach(function(n) {
      n !== "selectionchange" && (dp.has(n) || Bo(n, !1, e), Bo(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[pl] || (t[pl] = !0, Bo("selectionchange", !1, t));
  }
}
function mc(e, t, n, r) {
  switch (qa(t)) {
    case 1:
      var l = Nd;
      break;
    case 4:
      l = Td;
      break;
    default:
      l = iu;
  }
  n = l.bind(null, t, n, e), l = void 0, !hi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Wo(e, t, n, r, l) {
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
        if (i = fn(u), i === null) return;
        if (s = i.tag, s === 5 || s === 6) {
          r = o = i;
          continue e;
        }
        u = u.parentNode;
      }
    }
    r = r.return;
  }
  Aa(function() {
    var c = o, g = nu(n), p = [];
    e: {
      var h = pc.get(e);
      if (h !== void 0) {
        var x = su, S = e;
        switch (e) {
          case "keypress":
            if (_l(n) === 0) break e;
          case "keydown":
          case "keyup":
            x = Wd;
            break;
          case "focusin":
            S = "focus", x = Do;
            break;
          case "focusout":
            S = "blur", x = Do;
            break;
          case "beforeblur":
          case "afterblur":
            x = Do;
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
            x = fs;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            x = Ld;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            x = Qd;
            break;
          case ac:
          case cc:
          case fc:
            x = Md;
            break;
          case dc:
            x = Kd;
            break;
          case "scroll":
            x = zd;
            break;
          case "wheel":
            x = Gd;
            break;
          case "copy":
          case "cut":
          case "paste":
            x = Dd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            x = ps;
        }
        var v = (t & 4) !== 0, D = !v && e === "scroll", d = v ? h !== null ? h + "Capture" : null : h;
        v = [];
        for (var a = c, f; a !== null; ) {
          f = a;
          var y = f.stateNode;
          if (f.tag === 5 && y !== null && (f = y, d !== null && (y = zr(a, d), y != null && v.push(Dr(a, y, f)))), D) break;
          a = a.return;
        }
        0 < v.length && (h = new x(h, S, null, n, g), p.push({ event: h, listeners: v }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", x = e === "mouseout" || e === "pointerout", h && n !== di && (S = n.relatedTarget || n.fromElement) && (fn(S) || S[Ct])) break e;
        if ((x || h) && (h = g.window === g ? g : (h = g.ownerDocument) ? h.defaultView || h.parentWindow : window, x ? (S = n.relatedTarget || n.toElement, x = c, S = S ? fn(S) : null, S !== null && (D = kn(S), S !== D || S.tag !== 5 && S.tag !== 6) && (S = null)) : (x = null, S = c), x !== S)) {
          if (v = fs, y = "onMouseLeave", d = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (v = ps, y = "onPointerLeave", d = "onPointerEnter", a = "pointer"), D = x == null ? h : Rn(x), f = S == null ? h : Rn(S), h = new v(y, a + "leave", x, n, g), h.target = D, h.relatedTarget = f, y = null, fn(g) === c && (v = new v(d, a + "enter", S, n, g), v.target = f, v.relatedTarget = D, y = v), D = y, x && S) t: {
            for (v = x, d = S, a = 0, f = v; f; f = Nn(f)) a++;
            for (f = 0, y = d; y; y = Nn(y)) f++;
            for (; 0 < a - f; ) v = Nn(v), a--;
            for (; 0 < f - a; ) d = Nn(d), f--;
            for (; a--; ) {
              if (v === d || d !== null && v === d.alternate) break t;
              v = Nn(v), d = Nn(d);
            }
            v = null;
          }
          else v = null;
          x !== null && Cs(p, h, x, v, !1), S !== null && D !== null && Cs(p, D, S, v, !0);
        }
      }
      e: {
        if (h = c ? Rn(c) : window, x = h.nodeName && h.nodeName.toLowerCase(), x === "select" || x === "input" && h.type === "file") var k = np;
        else if (gs(h)) if (lc) k = ip;
        else {
          k = lp;
          var z = rp;
        }
        else (x = h.nodeName) && x.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (k = op);
        if (k && (k = k(e, c))) {
          rc(p, k, n, g);
          break e;
        }
        z && z(e, h, c), e === "focusout" && (z = h._wrapperState) && z.controlled && h.type === "number" && ui(h, "number", h.value);
      }
      switch (z = c ? Rn(c) : window, e) {
        case "focusin":
          (gs(z) || z.contentEditable === "true") && (Ln = z, xi = c, Sr = null);
          break;
        case "focusout":
          Sr = xi = Ln = null;
          break;
        case "mousedown":
          wi = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          wi = !1, Ss(p, n, g);
          break;
        case "selectionchange":
          if (ap) break;
        case "keydown":
        case "keyup":
          Ss(p, n, g);
      }
      var L;
      if (cu) e: {
        switch (e) {
          case "compositionstart":
            var N = "onCompositionStart";
            break e;
          case "compositionend":
            N = "onCompositionEnd";
            break e;
          case "compositionupdate":
            N = "onCompositionUpdate";
            break e;
        }
        N = void 0;
      }
      else jn ? tc(e, n) && (N = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (N = "onCompositionStart");
      N && (ec && n.locale !== "ko" && (jn || N !== "onCompositionStart" ? N === "onCompositionEnd" && jn && (L = ba()) : (Ut = g, uu = "value" in Ut ? Ut.value : Ut.textContent, jn = !0)), z = $l(c, N), 0 < z.length && (N = new ds(N, e, null, n, g), p.push({ event: N, listeners: z }), L ? N.data = L : (L = nc(n), L !== null && (N.data = L)))), (L = Zd ? qd(e, n) : bd(e, n)) && (c = $l(c, "onBeforeInput"), 0 < c.length && (g = new ds("onBeforeInput", "beforeinput", null, n, g), p.push({ event: g, listeners: c }), g.data = L));
    }
    hc(p, t);
  });
}
function Dr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function $l(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = zr(e, n), o != null && r.unshift(Dr(e, o, l)), o = zr(e, t), o != null && r.push(Dr(e, o, l))), e = e.return;
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
function Cs(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var u = n, s = u.alternate, c = u.stateNode;
    if (s !== null && s === r) break;
    u.tag === 5 && c !== null && (u = c, l ? (s = zr(n, o), s != null && i.unshift(Dr(n, s, u))) : l || (s = zr(n, o), s != null && i.push(Dr(n, s, u)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var pp = /\r\n?/g, hp = /\u0000|\uFFFD/g;
function _s(e) {
  return (typeof e == "string" ? e : "" + e).replace(pp, `
`).replace(hp, "");
}
function hl(e, t, n) {
  if (t = _s(t), _s(e) !== t && n) throw Error(C(425));
}
function Bl() {
}
var Si = null, ki = null;
function Ei(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Ci = typeof setTimeout == "function" ? setTimeout : void 0, mp = typeof clearTimeout == "function" ? clearTimeout : void 0, Ns = typeof Promise == "function" ? Promise : void 0, gp = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ns != "undefined" ? function(e) {
  return Ns.resolve(null).then(e).catch(yp);
} : Ci;
function yp(e) {
  setTimeout(function() {
    throw e;
  });
}
function Ho(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Pr(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Pr(t);
}
function Vt(e) {
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
function Ts(e) {
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
var er = Math.random().toString(36).slice(2), ft = "__reactFiber$" + er, Or = "__reactProps$" + er, Ct = "__reactContainer$" + er, _i = "__reactEvents$" + er, vp = "__reactListeners$" + er, xp = "__reactHandles$" + er;
function fn(e) {
  var t = e[ft];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Ct] || n[ft]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Ts(e); e !== null; ) {
        if (n = e[ft]) return n;
        e = Ts(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Xr(e) {
  return e = e[ft] || e[Ct], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Rn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(C(33));
}
function so(e) {
  return e[Or] || null;
}
var Ni = [], Mn = -1;
function qt(e) {
  return { current: e };
}
function q(e) {
  0 > Mn || (e.current = Ni[Mn], Ni[Mn] = null, Mn--);
}
function G(e, t) {
  Mn++, Ni[Mn] = e.current, e.current = t;
}
var Jt = {}, Ne = qt(Jt), Oe = qt(!1), gn = Jt;
function Xn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Jt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Fe(e) {
  return e = e.childContextTypes, e != null;
}
function Wl() {
  q(Oe), q(Ne);
}
function zs(e, t, n) {
  if (Ne.current !== Jt) throw Error(C(168));
  G(Ne, t), G(Oe, n);
}
function gc(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(C(108, rd(e) || "Unknown", l));
  return ne({}, n, r);
}
function Hl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Jt, gn = Ne.current, G(Ne, e), G(Oe, Oe.current), !0;
}
function js(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(C(169));
  n ? (e = gc(e, t, gn), r.__reactInternalMemoizedMergedChildContext = e, q(Oe), q(Ne), G(Ne, e)) : q(Oe), G(Oe, n);
}
var xt = null, ao = !1, Vo = !1;
function yc(e) {
  xt === null ? xt = [e] : xt.push(e);
}
function wp(e) {
  ao = !0, yc(e);
}
function bt() {
  if (!Vo && xt !== null) {
    Vo = !0;
    var e = 0, t = X;
    try {
      var n = xt;
      for (X = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      xt = null, ao = !1;
    } catch (l) {
      throw xt !== null && (xt = xt.slice(e + 1)), Wa(ru, bt), l;
    } finally {
      X = t, Vo = !1;
    }
  }
  return null;
}
var In = [], Dn = 0, Vl = null, Ql = 0, Ye = [], Ge = 0, yn = null, wt = 1, St = "";
function an(e, t) {
  In[Dn++] = Ql, In[Dn++] = Vl, Vl = e, Ql = t;
}
function vc(e, t, n) {
  Ye[Ge++] = wt, Ye[Ge++] = St, Ye[Ge++] = yn, yn = e;
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
function du(e) {
  e.return !== null && (an(e, 1), vc(e, 1, 0));
}
function pu(e) {
  for (; e === Vl; ) Vl = In[--Dn], In[Dn] = null, Ql = In[--Dn], In[Dn] = null;
  for (; e === yn; ) yn = Ye[--Ge], Ye[Ge] = null, St = Ye[--Ge], Ye[Ge] = null, wt = Ye[--Ge], Ye[Ge] = null;
}
var Be = null, $e = null, b = !1, ot = null;
function xc(e, t) {
  var n = Je(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Ls(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Be = e, $e = Vt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Be = e, $e = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = yn !== null ? { id: wt, overflow: St } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Je(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Be = e, $e = null, !0) : !1;
    default:
      return !1;
  }
}
function Ti(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function zi(e) {
  if (b) {
    var t = $e;
    if (t) {
      var n = t;
      if (!Ls(e, t)) {
        if (Ti(e)) throw Error(C(418));
        t = Vt(n.nextSibling);
        var r = Be;
        t && Ls(e, t) ? xc(r, n) : (e.flags = e.flags & -4097 | 2, b = !1, Be = e);
      }
    } else {
      if (Ti(e)) throw Error(C(418));
      e.flags = e.flags & -4097 | 2, b = !1, Be = e;
    }
  }
}
function Ps(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Be = e;
}
function ml(e) {
  if (e !== Be) return !1;
  if (!b) return Ps(e), b = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ei(e.type, e.memoizedProps)), t && (t = $e)) {
    if (Ti(e)) throw wc(), Error(C(418));
    for (; t; ) xc(e, t), t = Vt(t.nextSibling);
  }
  if (Ps(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(C(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              $e = Vt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      $e = null;
    }
  } else $e = Be ? Vt(e.stateNode.nextSibling) : null;
  return !0;
}
function wc() {
  for (var e = $e; e; ) e = Vt(e.nextSibling);
}
function Kn() {
  $e = Be = null, b = !1;
}
function hu(e) {
  ot === null ? ot = [e] : ot.push(e);
}
var Sp = Tt.ReactCurrentBatchConfig;
function cr(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(C(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(C(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var u = l.refs;
        i === null ? delete u[o] : u[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(C(284));
    if (!n._owner) throw Error(C(290, e));
  }
  return e;
}
function gl(e, t) {
  throw e = Object.prototype.toString.call(t), Error(C(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Rs(e) {
  var t = e._init;
  return t(e._payload);
}
function Sc(e) {
  function t(d, a) {
    if (e) {
      var f = d.deletions;
      f === null ? (d.deletions = [a], d.flags |= 16) : f.push(a);
    }
  }
  function n(d, a) {
    if (!e) return null;
    for (; a !== null; ) t(d, a), a = a.sibling;
    return null;
  }
  function r(d, a) {
    for (d = /* @__PURE__ */ new Map(); a !== null; ) a.key !== null ? d.set(a.key, a) : d.set(a.index, a), a = a.sibling;
    return d;
  }
  function l(d, a) {
    return d = Yt(d, a), d.index = 0, d.sibling = null, d;
  }
  function o(d, a, f) {
    return d.index = f, e ? (f = d.alternate, f !== null ? (f = f.index, f < a ? (d.flags |= 2, a) : f) : (d.flags |= 2, a)) : (d.flags |= 1048576, a);
  }
  function i(d) {
    return e && d.alternate === null && (d.flags |= 2), d;
  }
  function u(d, a, f, y) {
    return a === null || a.tag !== 6 ? (a = Zo(f, d.mode, y), a.return = d, a) : (a = l(a, f), a.return = d, a);
  }
  function s(d, a, f, y) {
    var k = f.type;
    return k === zn ? g(d, a, f.props.children, y, f.key) : a !== null && (a.elementType === k || typeof k == "object" && k !== null && k.$$typeof === Dt && Rs(k) === a.type) ? (y = l(a, f.props), y.ref = cr(d, a, f), y.return = d, y) : (y = Rl(f.type, f.key, f.props, null, d.mode, y), y.ref = cr(d, a, f), y.return = d, y);
  }
  function c(d, a, f, y) {
    return a === null || a.tag !== 4 || a.stateNode.containerInfo !== f.containerInfo || a.stateNode.implementation !== f.implementation ? (a = qo(f, d.mode, y), a.return = d, a) : (a = l(a, f.children || []), a.return = d, a);
  }
  function g(d, a, f, y, k) {
    return a === null || a.tag !== 7 ? (a = mn(f, d.mode, y, k), a.return = d, a) : (a = l(a, f), a.return = d, a);
  }
  function p(d, a, f) {
    if (typeof a == "string" && a !== "" || typeof a == "number") return a = Zo("" + a, d.mode, f), a.return = d, a;
    if (typeof a == "object" && a !== null) {
      switch (a.$$typeof) {
        case ol:
          return f = Rl(a.type, a.key, a.props, null, d.mode, f), f.ref = cr(d, null, a), f.return = d, f;
        case Tn:
          return a = qo(a, d.mode, f), a.return = d, a;
        case Dt:
          var y = a._init;
          return p(d, y(a._payload), f);
      }
      if (hr(a) || or(a)) return a = mn(a, d.mode, f, null), a.return = d, a;
      gl(d, a);
    }
    return null;
  }
  function h(d, a, f, y) {
    var k = a !== null ? a.key : null;
    if (typeof f == "string" && f !== "" || typeof f == "number") return k !== null ? null : u(d, a, "" + f, y);
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case ol:
          return f.key === k ? s(d, a, f, y) : null;
        case Tn:
          return f.key === k ? c(d, a, f, y) : null;
        case Dt:
          return k = f._init, h(
            d,
            a,
            k(f._payload),
            y
          );
      }
      if (hr(f) || or(f)) return k !== null ? null : g(d, a, f, y, null);
      gl(d, f);
    }
    return null;
  }
  function x(d, a, f, y, k) {
    if (typeof y == "string" && y !== "" || typeof y == "number") return d = d.get(f) || null, u(a, d, "" + y, k);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case ol:
          return d = d.get(y.key === null ? f : y.key) || null, s(a, d, y, k);
        case Tn:
          return d = d.get(y.key === null ? f : y.key) || null, c(a, d, y, k);
        case Dt:
          var z = y._init;
          return x(d, a, f, z(y._payload), k);
      }
      if (hr(y) || or(y)) return d = d.get(f) || null, g(a, d, y, k, null);
      gl(a, y);
    }
    return null;
  }
  function S(d, a, f, y) {
    for (var k = null, z = null, L = a, N = a = 0, Y = null; L !== null && N < f.length; N++) {
      L.index > N ? (Y = L, L = null) : Y = L.sibling;
      var U = h(d, L, f[N], y);
      if (U === null) {
        L === null && (L = Y);
        break;
      }
      e && L && U.alternate === null && t(d, L), a = o(U, a, N), z === null ? k = U : z.sibling = U, z = U, L = Y;
    }
    if (N === f.length) return n(d, L), b && an(d, N), k;
    if (L === null) {
      for (; N < f.length; N++) L = p(d, f[N], y), L !== null && (a = o(L, a, N), z === null ? k = L : z.sibling = L, z = L);
      return b && an(d, N), k;
    }
    for (L = r(d, L); N < f.length; N++) Y = x(L, d, N, f[N], y), Y !== null && (e && Y.alternate !== null && L.delete(Y.key === null ? N : Y.key), a = o(Y, a, N), z === null ? k = Y : z.sibling = Y, z = Y);
    return e && L.forEach(function(se) {
      return t(d, se);
    }), b && an(d, N), k;
  }
  function v(d, a, f, y) {
    var k = or(f);
    if (typeof k != "function") throw Error(C(150));
    if (f = k.call(f), f == null) throw Error(C(151));
    for (var z = k = null, L = a, N = a = 0, Y = null, U = f.next(); L !== null && !U.done; N++, U = f.next()) {
      L.index > N ? (Y = L, L = null) : Y = L.sibling;
      var se = h(d, L, U.value, y);
      if (se === null) {
        L === null && (L = Y);
        break;
      }
      e && L && se.alternate === null && t(d, L), a = o(se, a, N), z === null ? k = se : z.sibling = se, z = se, L = Y;
    }
    if (U.done) return n(
      d,
      L
    ), b && an(d, N), k;
    if (L === null) {
      for (; !U.done; N++, U = f.next()) U = p(d, U.value, y), U !== null && (a = o(U, a, N), z === null ? k = U : z.sibling = U, z = U);
      return b && an(d, N), k;
    }
    for (L = r(d, L); !U.done; N++, U = f.next()) U = x(L, d, N, U.value, y), U !== null && (e && U.alternate !== null && L.delete(U.key === null ? N : U.key), a = o(U, a, N), z === null ? k = U : z.sibling = U, z = U);
    return e && L.forEach(function(en) {
      return t(d, en);
    }), b && an(d, N), k;
  }
  function D(d, a, f, y) {
    if (typeof f == "object" && f !== null && f.type === zn && f.key === null && (f = f.props.children), typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case ol:
          e: {
            for (var k = f.key, z = a; z !== null; ) {
              if (z.key === k) {
                if (k = f.type, k === zn) {
                  if (z.tag === 7) {
                    n(d, z.sibling), a = l(z, f.props.children), a.return = d, d = a;
                    break e;
                  }
                } else if (z.elementType === k || typeof k == "object" && k !== null && k.$$typeof === Dt && Rs(k) === z.type) {
                  n(d, z.sibling), a = l(z, f.props), a.ref = cr(d, z, f), a.return = d, d = a;
                  break e;
                }
                n(d, z);
                break;
              } else t(d, z);
              z = z.sibling;
            }
            f.type === zn ? (a = mn(f.props.children, d.mode, y, f.key), a.return = d, d = a) : (y = Rl(f.type, f.key, f.props, null, d.mode, y), y.ref = cr(d, a, f), y.return = d, d = y);
          }
          return i(d);
        case Tn:
          e: {
            for (z = f.key; a !== null; ) {
              if (a.key === z) if (a.tag === 4 && a.stateNode.containerInfo === f.containerInfo && a.stateNode.implementation === f.implementation) {
                n(d, a.sibling), a = l(a, f.children || []), a.return = d, d = a;
                break e;
              } else {
                n(d, a);
                break;
              }
              else t(d, a);
              a = a.sibling;
            }
            a = qo(f, d.mode, y), a.return = d, d = a;
          }
          return i(d);
        case Dt:
          return z = f._init, D(d, a, z(f._payload), y);
      }
      if (hr(f)) return S(d, a, f, y);
      if (or(f)) return v(d, a, f, y);
      gl(d, f);
    }
    return typeof f == "string" && f !== "" || typeof f == "number" ? (f = "" + f, a !== null && a.tag === 6 ? (n(d, a.sibling), a = l(a, f), a.return = d, d = a) : (n(d, a), a = Zo(f, d.mode, y), a.return = d, d = a), i(d)) : n(d, a);
  }
  return D;
}
var Yn = Sc(!0), kc = Sc(!1), Xl = qt(null), Kl = null, On = null, mu = null;
function gu() {
  mu = On = Kl = null;
}
function yu(e) {
  var t = Xl.current;
  q(Xl), e._currentValue = t;
}
function ji(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Hn(e, t) {
  Kl = e, mu = On = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (De = !0), e.firstContext = null);
}
function qe(e) {
  var t = e._currentValue;
  if (mu !== e) if (e = { context: e, memoizedValue: t, next: null }, On === null) {
    if (Kl === null) throw Error(C(308));
    On = e, Kl.dependencies = { lanes: 0, firstContext: e };
  } else On = On.next = e;
  return t;
}
var dn = null;
function vu(e) {
  dn === null ? dn = [e] : dn.push(e);
}
function Ec(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, vu(t)) : (n.next = l.next, l.next = n), t.interleaved = n, _t(e, r);
}
function _t(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Ot = !1;
function xu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Cc(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function kt(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Qt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, W & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, _t(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, vu(r)) : (t.next = l.next, l.next = t), r.interleaved = t, _t(e, n);
}
function Nl(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, lu(e, n);
  }
}
function Ms(e, t) {
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
function Yl(e, t, n, r) {
  var l = e.updateQueue;
  Ot = !1;
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
      var h = u.lane, x = u.eventTime;
      if ((r & h) === h) {
        g !== null && (g = g.next = {
          eventTime: x,
          lane: 0,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null
        });
        e: {
          var S = e, v = u;
          switch (h = t, x = n, v.tag) {
            case 1:
              if (S = v.payload, typeof S == "function") {
                p = S.call(x, p, h);
                break e;
              }
              p = S;
              break e;
            case 3:
              S.flags = S.flags & -65537 | 128;
            case 0:
              if (S = v.payload, h = typeof S == "function" ? S.call(x, p, h) : S, h == null) break e;
              p = ne({}, p, h);
              break e;
            case 2:
              Ot = !0;
          }
        }
        u.callback !== null && u.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [u] : h.push(u));
      } else x = { eventTime: x, lane: h, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, g === null ? (c = g = x, s = p) : g = g.next = x, i |= h;
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
    xn |= i, e.lanes = i, e.memoizedState = p;
  }
}
function Is(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(C(191, l));
      l.call(r);
    }
  }
}
var Kr = {}, pt = qt(Kr), Fr = qt(Kr), Ar = qt(Kr);
function pn(e) {
  if (e === Kr) throw Error(C(174));
  return e;
}
function wu(e, t) {
  switch (G(Ar, t), G(Fr, e), G(pt, Kr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ai(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = ai(t, e);
  }
  q(pt), G(pt, t);
}
function Gn() {
  q(pt), q(Fr), q(Ar);
}
function _c(e) {
  pn(Ar.current);
  var t = pn(pt.current), n = ai(t, e.type);
  t !== n && (G(Fr, e), G(pt, n));
}
function Su(e) {
  Fr.current === e && (q(pt), q(Fr));
}
var ee = qt(0);
function Gl(e) {
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
var Qo = [];
function ku() {
  for (var e = 0; e < Qo.length; e++) Qo[e]._workInProgressVersionPrimary = null;
  Qo.length = 0;
}
var Tl = Tt.ReactCurrentDispatcher, Xo = Tt.ReactCurrentBatchConfig, vn = 0, te = null, pe = null, ye = null, Jl = !1, kr = !1, Ur = 0, kp = 0;
function Ee() {
  throw Error(C(321));
}
function Eu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!st(e[n], t[n])) return !1;
  return !0;
}
function Cu(e, t, n, r, l, o) {
  if (vn = o, te = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Tl.current = e === null || e.memoizedState === null ? Np : Tp, e = n(r, l), kr) {
    o = 0;
    do {
      if (kr = !1, Ur = 0, 25 <= o) throw Error(C(301));
      o += 1, ye = pe = null, t.updateQueue = null, Tl.current = zp, e = n(r, l);
    } while (kr);
  }
  if (Tl.current = Zl, t = pe !== null && pe.next !== null, vn = 0, ye = pe = te = null, Jl = !1, t) throw Error(C(300));
  return e;
}
function _u() {
  var e = Ur !== 0;
  return Ur = 0, e;
}
function ct() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ye === null ? te.memoizedState = ye = e : ye = ye.next = e, ye;
}
function be() {
  if (pe === null) {
    var e = te.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = pe.next;
  var t = ye === null ? te.memoizedState : ye.next;
  if (t !== null) ye = t, pe = e;
  else {
    if (e === null) throw Error(C(310));
    pe = e, e = { memoizedState: pe.memoizedState, baseState: pe.baseState, baseQueue: pe.baseQueue, queue: pe.queue, next: null }, ye === null ? te.memoizedState = ye = e : ye = ye.next = e;
  }
  return ye;
}
function $r(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Ko(e) {
  var t = be(), n = t.queue;
  if (n === null) throw Error(C(311));
  n.lastRenderedReducer = e;
  var r = pe, l = r.baseQueue, o = n.pending;
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
      if ((vn & g) === g) s !== null && (s = s.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var p = {
          lane: g,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        s === null ? (u = s = p, i = r) : s = s.next = p, te.lanes |= g, xn |= g;
      }
      c = c.next;
    } while (c !== null && c !== o);
    s === null ? i = r : s.next = u, st(r, t.memoizedState) || (De = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = s, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, te.lanes |= o, xn |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Yo(e) {
  var t = be(), n = t.queue;
  if (n === null) throw Error(C(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = l = l.next;
    do
      o = e(o, i.action), i = i.next;
    while (i !== l);
    st(o, t.memoizedState) || (De = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function Nc() {
}
function Tc(e, t) {
  var n = te, r = be(), l = t(), o = !st(r.memoizedState, l);
  if (o && (r.memoizedState = l, De = !0), r = r.queue, Nu(Lc.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || ye !== null && ye.memoizedState.tag & 1) {
    if (n.flags |= 2048, Br(9, jc.bind(null, n, r, l, t), void 0, null), ve === null) throw Error(C(349));
    vn & 30 || zc(n, t, l);
  }
  return l;
}
function zc(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = te.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, te.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function jc(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Pc(t) && Rc(e);
}
function Lc(e, t, n) {
  return n(function() {
    Pc(t) && Rc(e);
  });
}
function Pc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !st(e, n);
  } catch (r) {
    return !0;
  }
}
function Rc(e) {
  var t = _t(e, 1);
  t !== null && ut(t, e, 1, -1);
}
function Ds(e) {
  var t = ct();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: $r, lastRenderedState: e }, t.queue = e, e = e.dispatch = _p.bind(null, te, e), [t.memoizedState, e];
}
function Br(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = te.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, te.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Mc() {
  return be().memoizedState;
}
function zl(e, t, n, r) {
  var l = ct();
  te.flags |= e, l.memoizedState = Br(1 | t, n, void 0, r === void 0 ? null : r);
}
function co(e, t, n, r) {
  var l = be();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (pe !== null) {
    var i = pe.memoizedState;
    if (o = i.destroy, r !== null && Eu(r, i.deps)) {
      l.memoizedState = Br(t, n, o, r);
      return;
    }
  }
  te.flags |= e, l.memoizedState = Br(1 | t, n, o, r);
}
function Os(e, t) {
  return zl(8390656, 8, e, t);
}
function Nu(e, t) {
  return co(2048, 8, e, t);
}
function Ic(e, t) {
  return co(4, 2, e, t);
}
function Dc(e, t) {
  return co(4, 4, e, t);
}
function Oc(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Fc(e, t, n) {
  return n = n != null ? n.concat([e]) : null, co(4, 4, Oc.bind(null, t, e), n);
}
function Tu() {
}
function Ac(e, t) {
  var n = be();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Eu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Uc(e, t) {
  var n = be();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Eu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function $c(e, t, n) {
  return vn & 21 ? (st(n, t) || (n = Qa(), te.lanes |= n, xn |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, De = !0), e.memoizedState = n);
}
function Ep(e, t) {
  var n = X;
  X = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Xo.transition;
  Xo.transition = {};
  try {
    e(!1), t();
  } finally {
    X = n, Xo.transition = r;
  }
}
function Bc() {
  return be().memoizedState;
}
function Cp(e, t, n) {
  var r = Kt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Wc(e)) Hc(t, n);
  else if (n = Ec(e, t, n, r), n !== null) {
    var l = je();
    ut(n, e, r, l), Vc(n, t, r);
  }
}
function _p(e, t, n) {
  var r = Kt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Wc(e)) Hc(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, u = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = u, st(u, i)) {
        var s = t.interleaved;
        s === null ? (l.next = l, vu(t)) : (l.next = s.next, s.next = l), t.interleaved = l;
        return;
      }
    } catch (c) {
    } finally {
    }
    n = Ec(e, t, l, r), n !== null && (l = je(), ut(n, e, r, l), Vc(n, t, r));
  }
}
function Wc(e) {
  var t = e.alternate;
  return e === te || t !== null && t === te;
}
function Hc(e, t) {
  kr = Jl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Vc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, lu(e, n);
  }
}
var Zl = { readContext: qe, useCallback: Ee, useContext: Ee, useEffect: Ee, useImperativeHandle: Ee, useInsertionEffect: Ee, useLayoutEffect: Ee, useMemo: Ee, useReducer: Ee, useRef: Ee, useState: Ee, useDebugValue: Ee, useDeferredValue: Ee, useTransition: Ee, useMutableSource: Ee, useSyncExternalStore: Ee, useId: Ee, unstable_isNewReconciler: !1 }, Np = { readContext: qe, useCallback: function(e, t) {
  return ct().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: qe, useEffect: Os, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, zl(
    4194308,
    4,
    Oc.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return zl(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return zl(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = ct();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = ct();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Cp.bind(null, te, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = ct();
  return e = { current: e }, t.memoizedState = e;
}, useState: Ds, useDebugValue: Tu, useDeferredValue: function(e) {
  return ct().memoizedState = e;
}, useTransition: function() {
  var e = Ds(!1), t = e[0];
  return e = Ep.bind(null, e[1]), ct().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = te, l = ct();
  if (b) {
    if (n === void 0) throw Error(C(407));
    n = n();
  } else {
    if (n = t(), ve === null) throw Error(C(349));
    vn & 30 || zc(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Os(Lc.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, Br(9, jc.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = ct(), t = ve.identifierPrefix;
  if (b) {
    var n = St, r = wt;
    n = (r & ~(1 << 32 - it(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Ur++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = kp++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Tp = {
  readContext: qe,
  useCallback: Ac,
  useContext: qe,
  useEffect: Nu,
  useImperativeHandle: Fc,
  useInsertionEffect: Ic,
  useLayoutEffect: Dc,
  useMemo: Uc,
  useReducer: Ko,
  useRef: Mc,
  useState: function() {
    return Ko($r);
  },
  useDebugValue: Tu,
  useDeferredValue: function(e) {
    var t = be();
    return $c(t, pe.memoizedState, e);
  },
  useTransition: function() {
    var e = Ko($r)[0], t = be().memoizedState;
    return [e, t];
  },
  useMutableSource: Nc,
  useSyncExternalStore: Tc,
  useId: Bc,
  unstable_isNewReconciler: !1
}, zp = { readContext: qe, useCallback: Ac, useContext: qe, useEffect: Nu, useImperativeHandle: Fc, useInsertionEffect: Ic, useLayoutEffect: Dc, useMemo: Uc, useReducer: Yo, useRef: Mc, useState: function() {
  return Yo($r);
}, useDebugValue: Tu, useDeferredValue: function(e) {
  var t = be();
  return pe === null ? t.memoizedState = e : $c(t, pe.memoizedState, e);
}, useTransition: function() {
  var e = Yo($r)[0], t = be().memoizedState;
  return [e, t];
}, useMutableSource: Nc, useSyncExternalStore: Tc, useId: Bc, unstable_isNewReconciler: !1 };
function rt(e, t) {
  if (e && e.defaultProps) {
    t = ne({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Li(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : ne({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var fo = { isMounted: function(e) {
  return (e = e._reactInternals) ? kn(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = je(), l = Kt(e), o = kt(r, l);
  o.payload = t, n != null && (o.callback = n), t = Qt(e, o, l), t !== null && (ut(t, e, l, r), Nl(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = je(), l = Kt(e), o = kt(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Qt(e, o, l), t !== null && (ut(t, e, l, r), Nl(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = je(), r = Kt(e), l = kt(n, r);
  l.tag = 2, t != null && (l.callback = t), t = Qt(e, l, r), t !== null && (ut(t, e, r, n), Nl(t, e, r));
} };
function Fs(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !Mr(n, r) || !Mr(l, o) : !0;
}
function Qc(e, t, n) {
  var r = !1, l = Jt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = qe(o) : (l = Fe(t) ? gn : Ne.current, r = t.contextTypes, o = (r = r != null) ? Xn(e, l) : Jt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = fo, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function As(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && fo.enqueueReplaceState(t, t.state, null);
}
function Pi(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, xu(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = qe(o) : (o = Fe(t) ? gn : Ne.current, l.context = Xn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Li(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && fo.enqueueReplaceState(l, l.state, null), Yl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Jn(e, t) {
  try {
    var n = "", r = t;
    do
      n += nd(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Go(e, t, n) {
  return { value: e, source: null, stack: n != null ? n : null, digest: t != null ? t : null };
}
function Ri(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var jp = typeof WeakMap == "function" ? WeakMap : Map;
function Xc(e, t, n) {
  n = kt(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    bl || (bl = !0, Wi = r), Ri(e, t);
  }, n;
}
function Kc(e, t, n) {
  n = kt(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Ri(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Ri(e, t), typeof r != "function" && (Xt === null ? Xt = /* @__PURE__ */ new Set([this]) : Xt.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function Us(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new jp();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Hp.bind(null, e, t, n), t.then(e, e));
}
function $s(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Bs(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = kt(-1, 1), t.tag = 2, Qt(n, t, 1))), n.lanes |= 1), e);
}
var Lp = Tt.ReactCurrentOwner, De = !1;
function ze(e, t, n, r) {
  t.child = e === null ? kc(t, null, n, r) : Yn(t, e.child, n, r);
}
function Ws(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return Hn(t, l), r = Cu(e, t, n, r, o, l), n = _u(), e !== null && !De ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Nt(e, t, l)) : (b && n && du(t), t.flags |= 1, ze(e, t, r, l), t.child);
}
function Hs(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Du(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Yc(e, t, o, r, l)) : (e = Rl(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Mr, n(i, r) && e.ref === t.ref) return Nt(e, t, l);
  }
  return t.flags |= 1, e = Yt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Yc(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Mr(o, r) && e.ref === t.ref) if (De = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (De = !0);
    else return t.lanes = e.lanes, Nt(e, t, l);
  }
  return Mi(e, t, n, r, l);
}
function Gc(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(An, Ue), Ue |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, G(An, Ue), Ue |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, G(An, Ue), Ue |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, G(An, Ue), Ue |= r;
  return ze(e, t, l, n), t.child;
}
function Jc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Mi(e, t, n, r, l) {
  var o = Fe(n) ? gn : Ne.current;
  return o = Xn(t, o), Hn(t, l), n = Cu(e, t, n, r, o, l), r = _u(), e !== null && !De ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Nt(e, t, l)) : (b && r && du(t), t.flags |= 1, ze(e, t, n, l), t.child);
}
function Vs(e, t, n, r, l) {
  if (Fe(n)) {
    var o = !0;
    Hl(t);
  } else o = !1;
  if (Hn(t, l), t.stateNode === null) jl(e, t), Qc(t, n, r), Pi(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, u = t.memoizedProps;
    i.props = u;
    var s = i.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = qe(c) : (c = Fe(n) ? gn : Ne.current, c = Xn(t, c));
    var g = n.getDerivedStateFromProps, p = typeof g == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    p || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== r || s !== c) && As(t, i, r, c), Ot = !1;
    var h = t.memoizedState;
    i.state = h, Yl(t, r, i, l), s = t.memoizedState, u !== r || h !== s || Oe.current || Ot ? (typeof g == "function" && (Li(t, n, g, r), s = t.memoizedState), (u = Ot || Fs(t, n, u, r, h, s, c)) ? (p || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), i.props = r, i.state = s, i.context = c, r = u) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, Cc(e, t), u = t.memoizedProps, c = t.type === t.elementType ? u : rt(t.type, u), i.props = c, p = t.pendingProps, h = i.context, s = n.contextType, typeof s == "object" && s !== null ? s = qe(s) : (s = Fe(n) ? gn : Ne.current, s = Xn(t, s));
    var x = n.getDerivedStateFromProps;
    (g = typeof x == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== p || h !== s) && As(t, i, r, s), Ot = !1, h = t.memoizedState, i.state = h, Yl(t, r, i, l);
    var S = t.memoizedState;
    u !== p || h !== S || Oe.current || Ot ? (typeof x == "function" && (Li(t, n, x, r), S = t.memoizedState), (c = Ot || Fs(t, n, c, r, h, S, s) || !1) ? (g || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, S, s), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, S, s)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = S), i.props = r, i.state = S, i.context = s, r = c) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Ii(e, t, n, r, o, l);
}
function Ii(e, t, n, r, l, o) {
  Jc(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && js(t, n, !1), Nt(e, t, o);
  r = t.stateNode, Lp.current = t;
  var u = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = Yn(t, e.child, null, o), t.child = Yn(t, null, u, o)) : ze(e, t, u, o), t.memoizedState = r.state, l && js(t, n, !0), t.child;
}
function Zc(e) {
  var t = e.stateNode;
  t.pendingContext ? zs(e, t.pendingContext, t.pendingContext !== t.context) : t.context && zs(e, t.context, !1), wu(e, t.containerInfo);
}
function Qs(e, t, n, r, l) {
  return Kn(), hu(l), t.flags |= 256, ze(e, t, n, r), t.child;
}
var Di = { dehydrated: null, treeContext: null, retryLane: 0 };
function Oi(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function qc(e, t, n) {
  var r = t.pendingProps, l = ee.current, o = !1, i = (t.flags & 128) !== 0, u;
  if ((u = i) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), u ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), G(ee, l & 1), e === null)
    return zi(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = mo(i, r, 0, null), e = mn(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Oi(n), t.memoizedState = Di, e) : zu(t, i));
  if (l = e.memoizedState, l !== null && (u = l.dehydrated, u !== null)) return Pp(e, t, i, r, u, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, u = l.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = Yt(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), u !== null ? o = Yt(u, o) : (o = mn(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? Oi(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = Di, r;
  }
  return o = e.child, e = o.sibling, r = Yt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function zu(e, t) {
  return t = mo({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function yl(e, t, n, r) {
  return r !== null && hu(r), Yn(t, e.child, null, n), e = zu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Pp(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Go(Error(C(422))), yl(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = mo({ mode: "visible", children: r.children }, l, 0, null), o = mn(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Yn(t, e.child, null, i), t.child.memoizedState = Oi(i), t.memoizedState = Di, o);
  if (!(t.mode & 1)) return yl(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var u = r.dgst;
    return r = u, o = Error(C(419)), r = Go(o, r, void 0), yl(e, t, i, r);
  }
  if (u = (i & e.childLanes) !== 0, De || u) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, _t(e, l), ut(r, e, l, -1));
    }
    return Iu(), r = Go(Error(C(421))), yl(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Vp.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, $e = Vt(l.nextSibling), Be = t, b = !0, ot = null, e !== null && (Ye[Ge++] = wt, Ye[Ge++] = St, Ye[Ge++] = yn, wt = e.id, St = e.overflow, yn = t), t = zu(t, r.children), t.flags |= 4096, t);
}
function Xs(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), ji(e.return, t, n);
}
function Jo(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function bc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (ze(e, t, r.children, n), r = ee.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Xs(e, n, t);
      else if (e.tag === 19) Xs(e, n, t);
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
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && Gl(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Jo(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Gl(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Jo(t, !0, n, null, o);
      break;
    case "together":
      Jo(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function jl(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Nt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), xn |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(C(153));
  if (t.child !== null) {
    for (e = t.child, n = Yt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Yt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Rp(e, t, n) {
  switch (t.tag) {
    case 3:
      Zc(t), Kn();
      break;
    case 5:
      _c(t);
      break;
    case 1:
      Fe(t.type) && Hl(t);
      break;
    case 4:
      wu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      G(Xl, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (G(ee, ee.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? qc(e, t, n) : (G(ee, ee.current & 1), e = Nt(e, t, n), e !== null ? e.sibling : null);
      G(ee, ee.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return bc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), G(ee, ee.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Gc(e, t, n);
  }
  return Nt(e, t, n);
}
var ef, Fi, tf, nf;
ef = function(e, t) {
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
Fi = function() {
};
tf = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, pn(pt.current);
    var o = null;
    switch (n) {
      case "input":
        l = oi(e, l), r = oi(e, r), o = [];
        break;
      case "select":
        l = ne({}, l, { value: void 0 }), r = ne({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = si(e, l), r = si(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Bl);
    }
    ci(n, r);
    var i;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var u = l[c];
      for (i in u) u.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Nr.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var s = r[c];
      if (u = l != null ? l[c] : void 0, r.hasOwnProperty(c) && s !== u && (s != null || u != null)) if (c === "style") if (u) {
        for (i in u) !u.hasOwnProperty(i) || s && s.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in s) s.hasOwnProperty(i) && u[i] !== s[i] && (n || (n = {}), n[i] = s[i]);
      } else n || (o || (o = []), o.push(
        c,
        n
      )), n = s;
      else c === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, u = u ? u.__html : void 0, s != null && u !== s && (o = o || []).push(c, s)) : c === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(c, "" + s) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Nr.hasOwnProperty(c) ? (s != null && c === "onScroll" && Z("scroll", e), o || u === s || (o = [])) : (o = o || []).push(c, s));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
nf = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function fr(e, t) {
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
function Mp(e, t, n) {
  var r = t.pendingProps;
  switch (pu(t), t.tag) {
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
      return Fe(t.type) && Wl(), Ce(t), null;
    case 3:
      return r = t.stateNode, Gn(), q(Oe), q(Ne), ku(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (ml(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ot !== null && (Qi(ot), ot = null))), Fi(e, t), Ce(t), null;
    case 5:
      Su(t);
      var l = pn(Ar.current);
      if (n = t.type, e !== null && t.stateNode != null) tf(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(C(166));
          return Ce(t), null;
        }
        if (e = pn(pt.current), ml(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[ft] = t, r[Or] = o, e = (t.mode & 1) !== 0, n) {
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
              for (l = 0; l < gr.length; l++) Z(gr[l], r);
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
              ts(r, o), Z("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Z("invalid", r);
              break;
            case "textarea":
              rs(r, o), Z("invalid", r);
          }
          ci(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var u = o[i];
            i === "children" ? typeof u == "string" ? r.textContent !== u && (o.suppressHydrationWarning !== !0 && hl(r.textContent, u, e), l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (o.suppressHydrationWarning !== !0 && hl(
              r.textContent,
              u,
              e
            ), l = ["children", "" + u]) : Nr.hasOwnProperty(i) && u != null && i === "onScroll" && Z("scroll", r);
          }
          switch (n) {
            case "input":
              il(r), ns(r, o, !0);
              break;
            case "textarea":
              il(r), ls(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Bl);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = La(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[ft] = t, e[Or] = r, ef(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = fi(n, r), n) {
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
                for (l = 0; l < gr.length; l++) Z(gr[l], e);
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
                ts(e, r), l = oi(e, r), Z("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = ne({}, r, { value: void 0 }), Z("invalid", e);
                break;
              case "textarea":
                rs(e, r), l = si(e, r), Z("invalid", e);
                break;
              default:
                l = r;
            }
            ci(n, l), u = l;
            for (o in u) if (u.hasOwnProperty(o)) {
              var s = u[o];
              o === "style" ? Ma(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && Pa(e, s)) : o === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && Tr(e, s) : typeof s == "number" && Tr(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Nr.hasOwnProperty(o) ? s != null && o === "onScroll" && Z("scroll", e) : s != null && qi(e, o, s, i));
            }
            switch (n) {
              case "input":
                il(e), ns(e, r, !1);
                break;
              case "textarea":
                il(e), ls(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Gt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? Un(e, !!r.multiple, o, !1) : r.defaultValue != null && Un(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Bl);
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
      if (e && t.stateNode != null) nf(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(C(166));
        if (n = pn(Ar.current), pn(pt.current), ml(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[ft] = t, (o = r.nodeValue !== n) && (e = Be, e !== null)) switch (e.tag) {
            case 3:
              hl(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && hl(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[ft] = t, t.stateNode = r;
      }
      return Ce(t), null;
    case 13:
      if (q(ee), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (b && $e !== null && t.mode & 1 && !(t.flags & 128)) wc(), Kn(), t.flags |= 98560, o = !1;
        else if (o = ml(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(C(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(C(317));
            o[ft] = t;
          } else Kn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          Ce(t), o = !1;
        } else ot !== null && (Qi(ot), ot = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || ee.current & 1 ? he === 0 && (he = 3) : Iu())), t.updateQueue !== null && (t.flags |= 4), Ce(t), null);
    case 4:
      return Gn(), Fi(e, t), e === null && Ir(t.stateNode.containerInfo), Ce(t), null;
    case 10:
      return yu(t.type._context), Ce(t), null;
    case 17:
      return Fe(t.type) && Wl(), Ce(t), null;
    case 19:
      if (q(ee), o = t.memoizedState, o === null) return Ce(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) fr(o, !1);
      else {
        if (he !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = Gl(e), i !== null) {
            for (t.flags |= 128, fr(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return G(ee, ee.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && ue() > Zn && (t.flags |= 128, r = !0, fr(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = Gl(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), fr(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !b) return Ce(t), null;
        } else 2 * ue() - o.renderingStartTime > Zn && n !== 1073741824 && (t.flags |= 128, r = !0, fr(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = ue(), t.sibling = null, n = ee.current, G(ee, r ? n & 1 | 2 : n & 1), t) : (Ce(t), null);
    case 22:
    case 23:
      return Mu(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Ue & 1073741824 && (Ce(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ce(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(C(156, t.tag));
}
function Ip(e, t) {
  switch (pu(t), t.tag) {
    case 1:
      return Fe(t.type) && Wl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Gn(), q(Oe), q(Ne), ku(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Su(t), null;
    case 13:
      if (q(ee), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(C(340));
        Kn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return q(ee), null;
    case 4:
      return Gn(), null;
    case 10:
      return yu(t.type._context), null;
    case 22:
    case 23:
      return Mu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var vl = !1, _e = !1, Dp = typeof WeakSet == "function" ? WeakSet : Set, P = null;
function Fn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    oe(e, t, r);
  }
  else n.current = null;
}
function Ai(e, t, n) {
  try {
    n();
  } catch (r) {
    oe(e, t, r);
  }
}
var Ks = !1;
function Op(e, t) {
  if (Si = Al, e = uc(), fu(e)) {
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
        } catch (y) {
          n = null;
          break e;
        }
        var i = 0, u = -1, s = -1, c = 0, g = 0, p = e, h = null;
        t: for (; ; ) {
          for (var x; p !== n || l !== 0 && p.nodeType !== 3 || (u = i + l), p !== o || r !== 0 && p.nodeType !== 3 || (s = i + r), p.nodeType === 3 && (i += p.nodeValue.length), (x = p.firstChild) !== null; )
            h = p, p = x;
          for (; ; ) {
            if (p === e) break t;
            if (h === n && ++c === l && (u = i), h === o && ++g === r && (s = i), (x = p.nextSibling) !== null) break;
            p = h, h = p.parentNode;
          }
          p = x;
        }
        n = u === -1 || s === -1 ? null : { start: u, end: s };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (ki = { focusedElem: e, selectionRange: n }, Al = !1, P = t; P !== null; ) if (t = P, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, P = e;
  else for (; P !== null; ) {
    t = P;
    try {
      var S = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (S !== null) {
            var v = S.memoizedProps, D = S.memoizedState, d = t.stateNode, a = d.getSnapshotBeforeUpdate(t.elementType === t.type ? v : rt(t.type, v), D);
            d.__reactInternalSnapshotBeforeUpdate = a;
          }
          break;
        case 3:
          var f = t.stateNode.containerInfo;
          f.nodeType === 1 ? f.textContent = "" : f.nodeType === 9 && f.documentElement && f.removeChild(f.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(C(163));
      }
    } catch (y) {
      oe(t, t.return, y);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, P = e;
      break;
    }
    P = t.return;
  }
  return S = Ks, Ks = !1, S;
}
function Er(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && Ai(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function po(e, t) {
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
function Ui(e) {
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
function rf(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, rf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[ft], delete t[Or], delete t[_i], delete t[vp], delete t[xp])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function lf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ys(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || lf(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function $i(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Bl));
  else if (r !== 4 && (e = e.child, e !== null)) for ($i(e, t, n), e = e.sibling; e !== null; ) $i(e, t, n), e = e.sibling;
}
function Bi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Bi(e, t, n), e = e.sibling; e !== null; ) Bi(e, t, n), e = e.sibling;
}
var we = null, lt = !1;
function It(e, t, n) {
  for (n = n.child; n !== null; ) of(e, t, n), n = n.sibling;
}
function of(e, t, n) {
  if (dt && typeof dt.onCommitFiberUnmount == "function") try {
    dt.onCommitFiberUnmount(lo, n);
  } catch (u) {
  }
  switch (n.tag) {
    case 5:
      _e || Fn(n, t);
    case 6:
      var r = we, l = lt;
      we = null, It(e, t, n), we = r, lt = l, we !== null && (lt ? (e = we, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : we.removeChild(n.stateNode));
      break;
    case 18:
      we !== null && (lt ? (e = we, n = n.stateNode, e.nodeType === 8 ? Ho(e.parentNode, n) : e.nodeType === 1 && Ho(e, n), Pr(e)) : Ho(we, n.stateNode));
      break;
    case 4:
      r = we, l = lt, we = n.stateNode.containerInfo, lt = !0, It(e, t, n), we = r, lt = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!_e && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && Ai(n, t, i), l = l.next;
        } while (l !== r);
      }
      It(e, t, n);
      break;
    case 1:
      if (!_e && (Fn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (u) {
        oe(n, t, u);
      }
      It(e, t, n);
      break;
    case 21:
      It(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (_e = (r = _e) || n.memoizedState !== null, It(e, t, n), _e = r) : It(e, t, n);
      break;
    default:
      It(e, t, n);
  }
}
function Gs(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Dp()), t.forEach(function(r) {
      var l = Qp.bind(null, e, r);
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
            we = u.stateNode, lt = !1;
            break e;
          case 3:
            we = u.stateNode.containerInfo, lt = !0;
            break e;
          case 4:
            we = u.stateNode.containerInfo, lt = !0;
            break e;
        }
        u = u.return;
      }
      if (we === null) throw Error(C(160));
      of(o, i, l), we = null, lt = !1;
      var s = l.alternate;
      s !== null && (s.return = null), l.return = null;
    } catch (c) {
      oe(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) uf(t, e), t = t.sibling;
}
function uf(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (nt(t, e), at(e), r & 4) {
        try {
          Er(3, e, e.return), po(3, e);
        } catch (v) {
          oe(e, e.return, v);
        }
        try {
          Er(5, e, e.return);
        } catch (v) {
          oe(e, e.return, v);
        }
      }
      break;
    case 1:
      nt(t, e), at(e), r & 512 && n !== null && Fn(n, n.return);
      break;
    case 5:
      if (nt(t, e), at(e), r & 512 && n !== null && Fn(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Tr(l, "");
        } catch (v) {
          oe(e, e.return, v);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, u = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null) try {
          u === "input" && o.type === "radio" && o.name != null && za(l, o), fi(u, i);
          var c = fi(u, o);
          for (i = 0; i < s.length; i += 2) {
            var g = s[i], p = s[i + 1];
            g === "style" ? Ma(l, p) : g === "dangerouslySetInnerHTML" ? Pa(l, p) : g === "children" ? Tr(l, p) : qi(l, g, p, c);
          }
          switch (u) {
            case "input":
              ii(l, o);
              break;
            case "textarea":
              ja(l, o);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var x = o.value;
              x != null ? Un(l, !!o.multiple, x, !1) : h !== !!o.multiple && (o.defaultValue != null ? Un(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : Un(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[Or] = o;
        } catch (v) {
          oe(e, e.return, v);
        }
      }
      break;
    case 6:
      if (nt(t, e), at(e), r & 4) {
        if (e.stateNode === null) throw Error(C(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (v) {
          oe(e, e.return, v);
        }
      }
      break;
    case 3:
      if (nt(t, e), at(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Pr(t.containerInfo);
      } catch (v) {
        oe(e, e.return, v);
      }
      break;
    case 4:
      nt(t, e), at(e);
      break;
    case 13:
      nt(t, e), at(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Pu = ue())), r & 4 && Gs(e);
      break;
    case 22:
      if (g = n !== null && n.memoizedState !== null, e.mode & 1 ? (_e = (c = _e) || g, nt(t, e), _e = c) : nt(t, e), at(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !g && e.mode & 1) for (P = e, g = e.child; g !== null; ) {
          for (p = P = g; P !== null; ) {
            switch (h = P, x = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Er(4, h, h.return);
                break;
              case 1:
                Fn(h, h.return);
                var S = h.stateNode;
                if (typeof S.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, S.props = t.memoizedProps, S.state = t.memoizedState, S.componentWillUnmount();
                  } catch (v) {
                    oe(r, n, v);
                  }
                }
                break;
              case 5:
                Fn(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  Zs(p);
                  continue;
                }
            }
            x !== null ? (x.return = h, P = x) : Zs(p);
          }
          g = g.sibling;
        }
        e: for (g = null, p = e; ; ) {
          if (p.tag === 5) {
            if (g === null) {
              g = p;
              try {
                l = p.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (u = p.stateNode, s = p.memoizedProps.style, i = s != null && s.hasOwnProperty("display") ? s.display : null, u.style.display = Ra("display", i));
              } catch (v) {
                oe(e, e.return, v);
              }
            }
          } else if (p.tag === 6) {
            if (g === null) try {
              p.stateNode.nodeValue = c ? "" : p.memoizedProps;
            } catch (v) {
              oe(e, e.return, v);
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
      nt(t, e), at(e), r & 4 && Gs(e);
      break;
    case 21:
      break;
    default:
      nt(
        t,
        e
      ), at(e);
  }
}
function at(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (lf(n)) {
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
          r.flags & 32 && (Tr(l, ""), r.flags &= -33);
          var o = Ys(e);
          Bi(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, u = Ys(e);
          $i(e, u, i);
          break;
        default:
          throw Error(C(161));
      }
    } catch (s) {
      oe(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Fp(e, t, n) {
  P = e, sf(e);
}
function sf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; P !== null; ) {
    var l = P, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || vl;
      if (!i) {
        var u = l.alternate, s = u !== null && u.memoizedState !== null || _e;
        u = vl;
        var c = _e;
        if (vl = i, (_e = s) && !c) for (P = l; P !== null; ) i = P, s = i.child, i.tag === 22 && i.memoizedState !== null ? qs(l) : s !== null ? (s.return = i, P = s) : qs(l);
        for (; o !== null; ) P = o, sf(o), o = o.sibling;
        P = l, vl = u, _e = c;
      }
      Js(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, P = o) : Js(e);
  }
}
function Js(e) {
  for (; P !== null; ) {
    var t = P;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            _e || po(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !_e) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : rt(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Is(t, o, r);
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
              Is(t, i, n);
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
                  p !== null && Pr(p);
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
        _e || t.flags & 512 && Ui(t);
      } catch (h) {
        oe(t, t.return, h);
      }
    }
    if (t === e) {
      P = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, P = n;
      break;
    }
    P = t.return;
  }
}
function Zs(e) {
  for (; P !== null; ) {
    var t = P;
    if (t === e) {
      P = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, P = n;
      break;
    }
    P = t.return;
  }
}
function qs(e) {
  for (; P !== null; ) {
    var t = P;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            po(4, t);
          } catch (s) {
            oe(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              oe(t, l, s);
            }
          }
          var o = t.return;
          try {
            Ui(t);
          } catch (s) {
            oe(t, o, s);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Ui(t);
          } catch (s) {
            oe(t, i, s);
          }
      }
    } catch (s) {
      oe(t, t.return, s);
    }
    if (t === e) {
      P = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      u.return = t.return, P = u;
      break;
    }
    P = t.return;
  }
}
var Ap = Math.ceil, ql = Tt.ReactCurrentDispatcher, ju = Tt.ReactCurrentOwner, Ze = Tt.ReactCurrentBatchConfig, W = 0, ve = null, fe = null, Se = 0, Ue = 0, An = qt(0), he = 0, Wr = null, xn = 0, ho = 0, Lu = 0, Cr = null, Ie = null, Pu = 0, Zn = 1 / 0, yt = null, bl = !1, Wi = null, Xt = null, xl = !1, $t = null, eo = 0, _r = 0, Hi = null, Ll = -1, Pl = 0;
function je() {
  return W & 6 ? ue() : Ll !== -1 ? Ll : Ll = ue();
}
function Kt(e) {
  return e.mode & 1 ? W & 2 && Se !== 0 ? Se & -Se : Sp.transition !== null ? (Pl === 0 && (Pl = Qa()), Pl) : (e = X, e !== 0 || (e = window.event, e = e === void 0 ? 16 : qa(e.type)), e) : 1;
}
function ut(e, t, n, r) {
  if (50 < _r) throw _r = 0, Hi = null, Error(C(185));
  Vr(e, n, r), (!(W & 2) || e !== ve) && (e === ve && (!(W & 2) && (ho |= n), he === 4 && At(e, Se)), Ae(e, r), n === 1 && W === 0 && !(t.mode & 1) && (Zn = ue() + 500, ao && bt()));
}
function Ae(e, t) {
  var n = e.callbackNode;
  Sd(e, t);
  var r = Fl(e, e === ve ? Se : 0);
  if (r === 0) n !== null && us(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && us(n), t === 1) e.tag === 0 ? wp(bs.bind(null, e)) : yc(bs.bind(null, e)), gp(function() {
      !(W & 6) && bt();
    }), n = null;
    else {
      switch (Xa(r)) {
        case 1:
          n = ru;
          break;
        case 4:
          n = Ha;
          break;
        case 16:
          n = Ol;
          break;
        case 536870912:
          n = Va;
          break;
        default:
          n = Ol;
      }
      n = gf(n, af.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function af(e, t) {
  if (Ll = -1, Pl = 0, W & 6) throw Error(C(327));
  var n = e.callbackNode;
  if (Vn() && e.callbackNode !== n) return null;
  var r = Fl(e, e === ve ? Se : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = to(e, r);
  else {
    t = r;
    var l = W;
    W |= 2;
    var o = ff();
    (ve !== e || Se !== t) && (yt = null, Zn = ue() + 500, hn(e, t));
    do
      try {
        Bp();
        break;
      } catch (u) {
        cf(e, u);
      }
    while (!0);
    gu(), ql.current = o, W = l, fe !== null ? t = 0 : (ve = null, Se = 0, t = he);
  }
  if (t !== 0) {
    if (t === 2 && (l = gi(e), l !== 0 && (r = l, t = Vi(e, l))), t === 1) throw n = Wr, hn(e, 0), At(e, r), Ae(e, ue()), n;
    if (t === 6) At(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Up(l) && (t = to(e, r), t === 2 && (o = gi(e), o !== 0 && (r = o, t = Vi(e, o))), t === 1)) throw n = Wr, hn(e, 0), At(e, r), Ae(e, ue()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(C(345));
        case 2:
          cn(e, Ie, yt);
          break;
        case 3:
          if (At(e, r), (r & 130023424) === r && (t = Pu + 500 - ue(), 10 < t)) {
            if (Fl(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              je(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Ci(cn.bind(null, e, Ie, yt), t);
            break;
          }
          cn(e, Ie, yt);
          break;
        case 4:
          if (At(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - it(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = ue() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Ap(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Ci(cn.bind(null, e, Ie, yt), r);
            break;
          }
          cn(e, Ie, yt);
          break;
        case 5:
          cn(e, Ie, yt);
          break;
        default:
          throw Error(C(329));
      }
    }
  }
  return Ae(e, ue()), e.callbackNode === n ? af.bind(null, e) : null;
}
function Vi(e, t) {
  var n = Cr;
  return e.current.memoizedState.isDehydrated && (hn(e, t).flags |= 256), e = to(e, t), e !== 2 && (t = Ie, Ie = n, t !== null && Qi(t)), e;
}
function Qi(e) {
  Ie === null ? Ie = e : Ie.push.apply(Ie, e);
}
function Up(e) {
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
function At(e, t) {
  for (t &= ~Lu, t &= ~ho, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - it(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function bs(e) {
  if (W & 6) throw Error(C(327));
  Vn();
  var t = Fl(e, 0);
  if (!(t & 1)) return Ae(e, ue()), null;
  var n = to(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = gi(e);
    r !== 0 && (t = r, n = Vi(e, r));
  }
  if (n === 1) throw n = Wr, hn(e, 0), At(e, t), Ae(e, ue()), n;
  if (n === 6) throw Error(C(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, cn(e, Ie, yt), Ae(e, ue()), null;
}
function Ru(e, t) {
  var n = W;
  W |= 1;
  try {
    return e(t);
  } finally {
    W = n, W === 0 && (Zn = ue() + 500, ao && bt());
  }
}
function wn(e) {
  $t !== null && $t.tag === 0 && !(W & 6) && Vn();
  var t = W;
  W |= 1;
  var n = Ze.transition, r = X;
  try {
    if (Ze.transition = null, X = 1, e) return e();
  } finally {
    X = r, Ze.transition = n, W = t, !(W & 6) && bt();
  }
}
function Mu() {
  Ue = An.current, q(An);
}
function hn(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, mp(n)), fe !== null) for (n = fe.return; n !== null; ) {
    var r = n;
    switch (pu(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Wl();
        break;
      case 3:
        Gn(), q(Oe), q(Ne), ku();
        break;
      case 5:
        Su(r);
        break;
      case 4:
        Gn();
        break;
      case 13:
        q(ee);
        break;
      case 19:
        q(ee);
        break;
      case 10:
        yu(r.type._context);
        break;
      case 22:
      case 23:
        Mu();
    }
    n = n.return;
  }
  if (ve = e, fe = e = Yt(e.current, null), Se = Ue = t, he = 0, Wr = null, Lu = ho = xn = 0, Ie = Cr = null, dn !== null) {
    for (t = 0; t < dn.length; t++) if (n = dn[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, o = n.pending;
      if (o !== null) {
        var i = o.next;
        o.next = l, r.next = i;
      }
      n.pending = r;
    }
    dn = null;
  }
  return e;
}
function cf(e, t) {
  do {
    var n = fe;
    try {
      if (gu(), Tl.current = Zl, Jl) {
        for (var r = te.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        Jl = !1;
      }
      if (vn = 0, ye = pe = te = null, kr = !1, Ur = 0, ju.current = null, n === null || n.return === null) {
        he = 1, Wr = t, fe = null;
        break;
      }
      e: {
        var o = e, i = n.return, u = n, s = t;
        if (t = Se, u.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var c = s, g = u, p = g.tag;
          if (!(g.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var h = g.alternate;
            h ? (g.updateQueue = h.updateQueue, g.memoizedState = h.memoizedState, g.lanes = h.lanes) : (g.updateQueue = null, g.memoizedState = null);
          }
          var x = $s(i);
          if (x !== null) {
            x.flags &= -257, Bs(x, i, u, o, t), x.mode & 1 && Us(o, c, t), t = x, s = c;
            var S = t.updateQueue;
            if (S === null) {
              var v = /* @__PURE__ */ new Set();
              v.add(s), t.updateQueue = v;
            } else S.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              Us(o, c, t), Iu();
              break e;
            }
            s = Error(C(426));
          }
        } else if (b && u.mode & 1) {
          var D = $s(i);
          if (D !== null) {
            !(D.flags & 65536) && (D.flags |= 256), Bs(D, i, u, o, t), hu(Jn(s, u));
            break e;
          }
        }
        o = s = Jn(s, u), he !== 4 && (he = 2), Cr === null ? Cr = [o] : Cr.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var d = Xc(o, s, t);
              Ms(o, d);
              break e;
            case 1:
              u = s;
              var a = o.type, f = o.stateNode;
              if (!(o.flags & 128) && (typeof a.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (Xt === null || !Xt.has(f)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var y = Kc(o, u, t);
                Ms(o, y);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      pf(n);
    } catch (k) {
      t = k, fe === n && n !== null && (fe = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function ff() {
  var e = ql.current;
  return ql.current = Zl, e === null ? Zl : e;
}
function Iu() {
  (he === 0 || he === 3 || he === 2) && (he = 4), ve === null || !(xn & 268435455) && !(ho & 268435455) || At(ve, Se);
}
function to(e, t) {
  var n = W;
  W |= 2;
  var r = ff();
  (ve !== e || Se !== t) && (yt = null, hn(e, t));
  do
    try {
      $p();
      break;
    } catch (l) {
      cf(e, l);
    }
  while (!0);
  if (gu(), W = n, ql.current = r, fe !== null) throw Error(C(261));
  return ve = null, Se = 0, he;
}
function $p() {
  for (; fe !== null; ) df(fe);
}
function Bp() {
  for (; fe !== null && !dd(); ) df(fe);
}
function df(e) {
  var t = mf(e.alternate, e, Ue);
  e.memoizedProps = e.pendingProps, t === null ? pf(e) : fe = t, ju.current = null;
}
function pf(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Ip(n, t), n !== null) {
        n.flags &= 32767, fe = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        he = 6, fe = null;
        return;
      }
    } else if (n = Mp(n, t, Ue), n !== null) {
      fe = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      fe = t;
      return;
    }
    fe = t = e;
  } while (t !== null);
  he === 0 && (he = 5);
}
function cn(e, t, n) {
  var r = X, l = Ze.transition;
  try {
    Ze.transition = null, X = 1, Wp(e, t, n, r);
  } finally {
    Ze.transition = l, X = r;
  }
  return null;
}
function Wp(e, t, n, r) {
  do
    Vn();
  while ($t !== null);
  if (W & 6) throw Error(C(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(C(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (kd(e, o), e === ve && (fe = ve = null, Se = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || xl || (xl = !0, gf(Ol, function() {
    return Vn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Ze.transition, Ze.transition = null;
    var i = X;
    X = 1;
    var u = W;
    W |= 4, ju.current = null, Op(e, n), uf(n, e), sp(ki), Al = !!Si, ki = Si = null, e.current = n, Fp(n), pd(), W = u, X = i, Ze.transition = o;
  } else e.current = n;
  if (xl && (xl = !1, $t = e, eo = l), o = e.pendingLanes, o === 0 && (Xt = null), gd(n.stateNode), Ae(e, ue()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (bl) throw bl = !1, e = Wi, Wi = null, e;
  return eo & 1 && e.tag !== 0 && Vn(), o = e.pendingLanes, o & 1 ? e === Hi ? _r++ : (_r = 0, Hi = e) : _r = 0, bt(), null;
}
function Vn() {
  if ($t !== null) {
    var e = Xa(eo), t = Ze.transition, n = X;
    try {
      if (Ze.transition = null, X = 16 > e ? 16 : e, $t === null) var r = !1;
      else {
        if (e = $t, $t = null, eo = 0, W & 6) throw Error(C(331));
        var l = W;
        for (W |= 4, P = e.current; P !== null; ) {
          var o = P, i = o.child;
          if (P.flags & 16) {
            var u = o.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var c = u[s];
                for (P = c; P !== null; ) {
                  var g = P;
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Er(8, g, o);
                  }
                  var p = g.child;
                  if (p !== null) p.return = g, P = p;
                  else for (; P !== null; ) {
                    g = P;
                    var h = g.sibling, x = g.return;
                    if (rf(g), g === c) {
                      P = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = x, P = h;
                      break;
                    }
                    P = x;
                  }
                }
              }
              var S = o.alternate;
              if (S !== null) {
                var v = S.child;
                if (v !== null) {
                  S.child = null;
                  do {
                    var D = v.sibling;
                    v.sibling = null, v = D;
                  } while (v !== null);
                }
              }
              P = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, P = i;
          else e: for (; P !== null; ) {
            if (o = P, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Er(9, o, o.return);
            }
            var d = o.sibling;
            if (d !== null) {
              d.return = o.return, P = d;
              break e;
            }
            P = o.return;
          }
        }
        var a = e.current;
        for (P = a; P !== null; ) {
          i = P;
          var f = i.child;
          if (i.subtreeFlags & 2064 && f !== null) f.return = i, P = f;
          else e: for (i = a; P !== null; ) {
            if (u = P, u.flags & 2048) try {
              switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  po(9, u);
              }
            } catch (k) {
              oe(u, u.return, k);
            }
            if (u === i) {
              P = null;
              break e;
            }
            var y = u.sibling;
            if (y !== null) {
              y.return = u.return, P = y;
              break e;
            }
            P = u.return;
          }
        }
        if (W = l, bt(), dt && typeof dt.onPostCommitFiberRoot == "function") try {
          dt.onPostCommitFiberRoot(lo, e);
        } catch (k) {
        }
        r = !0;
      }
      return r;
    } finally {
      X = n, Ze.transition = t;
    }
  }
  return !1;
}
function ea(e, t, n) {
  t = Jn(n, t), t = Xc(e, t, 1), e = Qt(e, t, 1), t = je(), e !== null && (Vr(e, 1, t), Ae(e, t));
}
function oe(e, t, n) {
  if (e.tag === 3) ea(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      ea(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Xt === null || !Xt.has(r))) {
        e = Jn(n, e), e = Kc(t, e, 1), t = Qt(t, e, 1), e = je(), t !== null && (Vr(t, 1, e), Ae(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Hp(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = je(), e.pingedLanes |= e.suspendedLanes & n, ve === e && (Se & n) === n && (he === 4 || he === 3 && (Se & 130023424) === Se && 500 > ue() - Pu ? hn(e, 0) : Lu |= n), Ae(e, t);
}
function hf(e, t) {
  t === 0 && (e.mode & 1 ? (t = al, al <<= 1, !(al & 130023424) && (al = 4194304)) : t = 1);
  var n = je();
  e = _t(e, t), e !== null && (Vr(e, t, n), Ae(e, n));
}
function Vp(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), hf(e, n);
}
function Qp(e, t) {
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
  r !== null && r.delete(t), hf(e, n);
}
var mf;
mf = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Oe.current) De = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return De = !1, Rp(e, t, n);
    De = !!(e.flags & 131072);
  }
  else De = !1, b && t.flags & 1048576 && vc(t, Ql, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      jl(e, t), e = t.pendingProps;
      var l = Xn(t, Ne.current);
      Hn(t, n), l = Cu(null, t, r, e, l, n);
      var o = _u();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Fe(r) ? (o = !0, Hl(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, xu(t), l.updater = fo, t.stateNode = l, l._reactInternals = t, Pi(t, r, e, n), t = Ii(null, t, r, !0, o, n)) : (t.tag = 0, b && o && du(t), ze(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (jl(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Kp(r), e = rt(r, e), l) {
          case 0:
            t = Mi(null, t, r, e, n);
            break e;
          case 1:
            t = Vs(null, t, r, e, n);
            break e;
          case 11:
            t = Ws(null, t, r, e, n);
            break e;
          case 14:
            t = Hs(null, t, r, rt(r.type, e), n);
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
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : rt(r, l), Mi(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : rt(r, l), Vs(e, t, r, l, n);
    case 3:
      e: {
        if (Zc(t), e === null) throw Error(C(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, Cc(e, t), Yl(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = Jn(Error(C(423)), t), t = Qs(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = Jn(Error(C(424)), t), t = Qs(e, t, r, n, l);
          break e;
        } else for ($e = Vt(t.stateNode.containerInfo.firstChild), Be = t, b = !0, ot = null, n = kc(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Kn(), r === l) {
            t = Nt(e, t, n);
            break e;
          }
          ze(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return _c(t), e === null && zi(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Ei(r, l) ? i = null : o !== null && Ei(r, o) && (t.flags |= 32), Jc(e, t), ze(e, t, i, n), t.child;
    case 6:
      return e === null && zi(t), null;
    case 13:
      return qc(e, t, n);
    case 4:
      return wu(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Yn(t, null, r, n) : ze(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : rt(r, l), Ws(e, t, r, l, n);
    case 7:
      return ze(e, t, t.pendingProps, n), t.child;
    case 8:
      return ze(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ze(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, G(Xl, r._currentValue), r._currentValue = i, o !== null) if (st(o.value, i)) {
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
                o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), ji(
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
            if (i = o.return, i === null) throw Error(C(341));
            i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), ji(i, n, t), i = o.sibling;
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
      return l = t.type, r = t.pendingProps.children, Hn(t, n), l = qe(l), r = r(l), t.flags |= 1, ze(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = rt(r, t.pendingProps), l = rt(r.type, l), Hs(e, t, r, l, n);
    case 15:
      return Yc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : rt(r, l), jl(e, t), t.tag = 1, Fe(r) ? (e = !0, Hl(t)) : e = !1, Hn(t, n), Qc(t, r, l), Pi(t, r, l, n), Ii(null, t, r, !0, e, n);
    case 19:
      return bc(e, t, n);
    case 22:
      return Gc(e, t, n);
  }
  throw Error(C(156, t.tag));
};
function gf(e, t) {
  return Wa(e, t);
}
function Xp(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Je(e, t, n, r) {
  return new Xp(e, t, n, r);
}
function Du(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Kp(e) {
  if (typeof e == "function") return Du(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === eu) return 11;
    if (e === tu) return 14;
  }
  return 2;
}
function Yt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Je(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Rl(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") Du(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case zn:
      return mn(n.children, l, o, t);
    case bi:
      i = 8, l |= 8;
      break;
    case ti:
      return e = Je(12, n, t, l | 2), e.elementType = ti, e.lanes = o, e;
    case ni:
      return e = Je(13, n, t, l), e.elementType = ni, e.lanes = o, e;
    case ri:
      return e = Je(19, n, t, l), e.elementType = ri, e.lanes = o, e;
    case _a:
      return mo(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Ea:
          i = 10;
          break e;
        case Ca:
          i = 9;
          break e;
        case eu:
          i = 11;
          break e;
        case tu:
          i = 14;
          break e;
        case Dt:
          i = 16, r = null;
          break e;
      }
      throw Error(C(130, e == null ? e : typeof e, ""));
  }
  return t = Je(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function mn(e, t, n, r) {
  return e = Je(7, e, r, t), e.lanes = n, e;
}
function mo(e, t, n, r) {
  return e = Je(22, e, r, t), e.elementType = _a, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Zo(e, t, n) {
  return e = Je(6, e, null, t), e.lanes = n, e;
}
function qo(e, t, n) {
  return t = Je(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Yp(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ro(0), this.expirationTimes = Ro(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ro(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Ou(e, t, n, r, l, o, i, u, s) {
  return e = new Yp(e, t, n, u, s), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Je(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, xu(o), e;
}
function Gp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Tn, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function yf(e) {
  if (!e) return Jt;
  e = e._reactInternals;
  e: {
    if (kn(e) !== e || e.tag !== 1) throw Error(C(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Fe(t.type)) {
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
    if (Fe(n)) return gc(e, n, t);
  }
  return t;
}
function vf(e, t, n, r, l, o, i, u, s) {
  return e = Ou(n, r, !0, e, l, o, i, u, s), e.context = yf(null), n = e.current, r = je(), l = Kt(n), o = kt(r, l), o.callback = t != null ? t : null, Qt(n, o, l), e.current.lanes = l, Vr(e, l, r), Ae(e, r), e;
}
function go(e, t, n, r) {
  var l = t.current, o = je(), i = Kt(l);
  return n = yf(n), t.context === null ? t.context = n : t.pendingContext = n, t = kt(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Qt(l, t, i), e !== null && (ut(e, l, i, o), Nl(e, l, i)), i;
}
function no(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function ta(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Fu(e, t) {
  ta(e, t), (e = e.alternate) && ta(e, t);
}
function Jp() {
  return null;
}
var xf = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Au(e) {
  this._internalRoot = e;
}
yo.prototype.render = Au.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(C(409));
  go(e, t, null, null);
};
yo.prototype.unmount = Au.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    wn(function() {
      go(null, e, null, null);
    }), t[Ct] = null;
  }
};
function yo(e) {
  this._internalRoot = e;
}
yo.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Ga();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Ft.length && t !== 0 && t < Ft[n].priority; n++) ;
    Ft.splice(n, 0, e), n === 0 && Za(e);
  }
};
function Uu(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function vo(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function na() {
}
function Zp(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = no(i);
        o.call(c);
      };
    }
    var i = vf(t, r, e, 0, null, !1, !1, "", na);
    return e._reactRootContainer = i, e[Ct] = i.current, Ir(e.nodeType === 8 ? e.parentNode : e), wn(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function() {
      var c = no(s);
      u.call(c);
    };
  }
  var s = Ou(e, 0, !1, null, null, !1, !1, "", na);
  return e._reactRootContainer = s, e[Ct] = s.current, Ir(e.nodeType === 8 ? e.parentNode : e), wn(function() {
    go(t, s, n, r);
  }), s;
}
function xo(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var u = l;
      l = function() {
        var s = no(i);
        u.call(s);
      };
    }
    go(t, i, e, l);
  } else i = Zp(n, t, e, l, r);
  return no(i);
}
Ka = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = mr(t.pendingLanes);
        n !== 0 && (lu(t, n | 1), Ae(t, ue()), !(W & 6) && (Zn = ue() + 500, bt()));
      }
      break;
    case 13:
      wn(function() {
        var r = _t(e, 1);
        if (r !== null) {
          var l = je();
          ut(r, e, 1, l);
        }
      }), Fu(e, 1);
  }
};
ou = function(e) {
  if (e.tag === 13) {
    var t = _t(e, 134217728);
    if (t !== null) {
      var n = je();
      ut(t, e, 134217728, n);
    }
    Fu(e, 134217728);
  }
};
Ya = function(e) {
  if (e.tag === 13) {
    var t = Kt(e), n = _t(e, t);
    if (n !== null) {
      var r = je();
      ut(n, e, t, r);
    }
    Fu(e, t);
  }
};
Ga = function() {
  return X;
};
Ja = function(e, t) {
  var n = X;
  try {
    return X = e, t();
  } finally {
    X = n;
  }
};
pi = function(e, t, n) {
  switch (t) {
    case "input":
      if (ii(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = so(r);
            if (!l) throw Error(C(90));
            Ta(r), ii(r, l);
          }
        }
      }
      break;
    case "textarea":
      ja(e, n);
      break;
    case "select":
      t = n.value, t != null && Un(e, !!n.multiple, t, !1);
  }
};
Oa = Ru;
Fa = wn;
var qp = { usingClientEntryPoint: !1, Events: [Xr, Rn, so, Ia, Da, Ru] }, dr = { findFiberByHostInstance: fn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, bp = { bundleType: dr.bundleType, version: dr.version, rendererPackageName: dr.rendererPackageName, rendererConfig: dr.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Tt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = $a(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: dr.findFiberByHostInstance || Jp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined") {
  var wl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!wl.isDisabled && wl.supportsFiber) try {
    lo = wl.inject(bp), dt = wl;
  } catch (e) {
  }
}
He.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = qp;
He.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Uu(t)) throw Error(C(200));
  return Gp(e, t, null, n);
};
He.createRoot = function(e, t) {
  if (!Uu(e)) throw Error(C(299));
  var n = !1, r = "", l = xf;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Ou(e, 1, !1, null, null, n, !1, r, l), e[Ct] = t.current, Ir(e.nodeType === 8 ? e.parentNode : e), new Au(t);
};
He.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(C(188)) : (e = Object.keys(e).join(","), Error(C(268, e)));
  return e = $a(t), e = e === null ? null : e.stateNode, e;
};
He.flushSync = function(e) {
  return wn(e);
};
He.hydrate = function(e, t, n) {
  if (!vo(t)) throw Error(C(200));
  return xo(null, e, t, !0, n);
};
He.hydrateRoot = function(e, t, n) {
  if (!Uu(e)) throw Error(C(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = xf;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = vf(t, null, e, 1, n != null ? n : null, l, !1, o, i), e[Ct] = t.current, Ir(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new yo(t);
};
He.render = function(e, t, n) {
  if (!vo(t)) throw Error(C(200));
  return xo(null, e, t, !1, n);
};
He.unmountComponentAtNode = function(e) {
  if (!vo(e)) throw Error(C(40));
  return e._reactRootContainer ? (wn(function() {
    xo(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ct] = null;
    });
  }), !0) : !1;
};
He.unstable_batchedUpdates = Ru;
He.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!vo(n)) throw Error(C(200));
  if (e == null || e._reactInternals === void 0) throw Error(C(38));
  return xo(e, t, n, !1, r);
};
He.version = "18.3.1-next-f1338f8080-20240426";
function wf() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ == "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(wf);
    } catch (e) {
      console.error(e);
    }
}
wf(), xa.exports = He;
var e0 = xa.exports, Sf, ra = e0;
Sf = ra.createRoot, ra.hydrateRoot;
const la = [
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
], oa = { "#39ff14": 110, "#ff2fbf": 320, "#00e5ff": 190, "#ff6b6b": 0, "#ffd93d": 55, "#7c3aed": 265 };
function ia(e) {
  return la[(e - 1) % la.length];
}
function vt(e) {
  const t = Math.floor((e - 1) / 10) + 1, n = (e - 1) % 10 + 1, r = n0.worlds[t - 1];
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
function t0(e) {
  return vt(e).tiles;
}
function bo(e) {
  return vt(e).time;
}
const ua = [
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
], n0 = {
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
function r0(e, t = 0.15) {
  const n = _.useRef(null), r = _.useRef(null), l = _.useRef(null), o = typeof window != "undefined" ? window : {}, i = () => {
    if (!e) return null;
    try {
      if (!n.current) {
        const v = o.AudioContext || o.webkitAudioContext;
        if (!v) return null;
        n.current = new v();
      }
      return n.current;
    } catch (v) {
      return null;
    }
  }, u = (v = 440, D = 0.12, d = "sine", a = 0.07) => {
    const f = i();
    if (f)
      try {
        const y = f.createOscillator(), k = f.createGain();
        y.type = d, y.frequency.value = v, k.gain.value = a, y.connect(k), k.connect(f.destination), f.state === "suspended" && f.resume().catch(() => {
        });
        const z = f.currentTime;
        y.start(z), y.stop(z + D);
      } catch (y) {
      }
  }, s = (v, D = 0.12, d = 0.04) => {
    const a = i();
    if (!(!a || !v || !v.length))
      try {
        a.state === "suspended" && a.resume().catch(() => {
        }), v.forEach((f, y) => {
          const k = a.createOscillator(), z = a.createGain();
          k.type = "triangle", k.frequency.value = f, z.gain.value = 0.08, k.connect(z), z.connect(a.destination);
          const L = a.currentTime + y * (D + d);
          k.start(L), k.stop(L + D);
        });
      } catch (f) {
      }
  }, c = () => {
    if (!r.current)
      try {
        const v = new Audio("lumetrix/audio/audiofondo.mp3");
        v.loop = !0, v.volume = t, r.current = v;
      } catch (v) {
        console.log("Error cargando audio de fondo:", v);
      }
  }, g = (v = !0) => {
    if (!(!v || !r.current))
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
      } catch (v) {
      }
  }, h = (v) => {
    r.current && (r.current.volume = v);
  }, x = () => {
    if (!l.current)
      try {
        const v = new Audio("lumetrix/audio/jugar.mp3");
        v.volume = 0.7, l.current = v;
      } catch (v) {
        console.log("Error cargando audio de inicio:", v);
      }
  }, S = () => {
    if (!(!e || !l.current))
      try {
        l.current.currentTime = 0, l.current.play().catch((v) => {
          console.log("Error reproduciendo audio de inicio:", v);
        });
      } catch (v) {
      }
  };
  return {
    start: () => {
      S();
    },
    ok: (v) => u(v || 880, 0.1, "triangle", 0.07),
    fail: () => u(260, 0.12, "sine", 0.045),
    // suave "meck"
    blink: (v) => u(v || 720, 0.12, "sine", 0.08),
    // Victoria: siempre trozo corto (5–6 notas) + retraso 300ms
    winMelody: (v) => {
      const D = v && v.length ? v.slice(0, 6) : [659.25, 880, 1046.5];
      setTimeout(() => s(D, 0.12, 0.04), 300);
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
function l0() {
  _.useEffect(() => {
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
      .tile{position:absolute;border-radius:12px;border:1px solid #ffffff2f;z-index:1;touch-action:manipulation;transition:filter .12s ease, transform .06s ease;cursor:pointer}
      .tile:active{transform:scale(.985)}
      .tile.dragging{transform:scale(1.1);z-index:100;box-shadow:0 0 20px rgba(255,255,255,0.5);cursor:grabbing}
      .drop-zone{border:3px solid #ffffff66;border-radius:12px;background:transparent;pointer-events:none;z-index:100}
      .drop-zone.drag-over{border-style:solid;transform:scale(1.1);box-shadow:0 0 25px currentColor}
      .lit{box-shadow:0 0 10px var(--accent), 0 0 18px var(--accent); filter:brightness(1.18)}
      .overlay{position:absolute;inset:0;display:grid;place-items:center;z-index:2}
      .modal{position:fixed;inset:0;background:#000c;display:flex;align-items:center;justify-content:center;z-index:50;padding:20px 0}
      .card{position:relative;width:280px;max-width:85vw;background:#000;border:1px solid #ffffff1f;border-radius:14px;box-shadow:0 0 12px #ff2fbf55;color:#fff;padding:20px;min-height:400px}
      .card h3{margin-top:0;margin-bottom:16px;padding-top:4px}
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
function o0({ onPlay: e, onAuth: t }) {
  const n = _.useRef(null), r = _.useRef(null), [l, o] = _.useState(!1), [i, u] = _.useState(null), s = async () => {
    try {
      await window.LUM_API.api("auth.php?action=logout"), o(!1), u(null), window.location.reload();
    } catch (c) {
      console.log("Error al cerrar sesión");
    }
  };
  return _.useEffect(() => {
    const c = n.current;
    if (!c) return;
    const p = setInterval(() => {
      const h = document.createElement("i"), x = 20 + Math.random() * 25, S = 40 + Math.random() * 60;
      let v, D;
      if (Math.random() < 0.7) {
        const y = [
          { x: [0, 15], y: [0, 100] },
          // Lado izquierdo
          { x: [85, 100], y: [0, 100] },
          // Lado derecho  
          { x: [0, 100], y: [0, 15] },
          // Parte superior
          { x: [0, 100], y: [85, 100] }
          // Parte inferior
        ], k = y[Math.floor(Math.random() * y.length)];
        v = k.x[0] + Math.random() * (k.x[1] - k.x[0]), D = k.y[0] + Math.random() * (k.y[1] - k.y[0]);
      } else
        v = Math.random() * 100, D = Math.random() * 100;
      h.style.left = v + "%", h.style.top = D + "%", h.style.width = x + "px", h.style.height = S + "px";
      const a = [0, 60, 120, 180, 240, 300, 45, 135, 225, 315], f = a[Math.floor(Math.random() * a.length)];
      h.style.background = `hsl(${f} 95% 65% / .9)`, c.appendChild(h), setTimeout(() => h.remove(), 3e3);
    }, 80);
    return () => clearInterval(p);
  }, []), _.useEffect(() => {
    const c = () => {
      var v;
      const p = r.current;
      if (!p) return;
      const h = (v = p.parentElement) == null ? void 0 : v.parentElement;
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
  }, []), _.useEffect(() => {
    (async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const g = await window.LUM_API.api("auth.php?action=check_session");
          g && g.success && (o(!0), u(g.user));
        }
      } catch (g) {
        console.log("No hay sesión activa"), o(!1), u(null);
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
          /* @__PURE__ */ m.jsxs("div", { style: { fontSize: 18, opacity: 0.9, color: "#39ff14", fontWeight: 700, marginBottom: 4 }, children: [
            "¡Hola, ",
            (i == null ? void 0 : i.nick) || "Usuario",
            "!"
          ] }),
          /* @__PURE__ */ m.jsx("div", { style: { fontSize: 13, opacity: 0.6, marginBottom: 16 }, children: "Partida guardada" }),
          /* @__PURE__ */ m.jsx("div", { className: "actions", style: { marginBottom: 8 }, children: /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: e, children: "CONTINUAR" }) }),
          /* @__PURE__ */ m.jsx(
            "button",
            {
              className: "btn btn2",
              onClick: s,
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
function i0({ level: e, setLevel: t, soundOn: n, musicOn: r, musicVolume: l, vibrateOn: o, onOpenAuth: i, onOpenRanking: u, onOpenOptions: s, onTotalUpdate: c, totalTime: g }) {
  const p = _.useRef(null), [h, x] = _.useState(bo(e)), [S, v] = _.useState(!1), [D, d] = _.useState(!1), [a, f] = _.useState(!1), [y, k] = _.useState(!1), [z, L] = _.useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0;
    } catch (w) {
      return 0;
    }
  });
  _.useEffect(() => {
    typeof g == "number" && L(g);
  }, [g]);
  const N = r0(n, l), Y = Math.floor((e - 1) / 10) + 1, U = (e - 1) % 10 + 1, se = _.useMemo(() => ia(e), [e]);
  _.useEffect(() => {
    N.initBg(), N.initStart();
    const w = setTimeout(() => {
      N.startBg(r);
    }, 1e3);
    return () => clearTimeout(w);
  }, [N, r]), _.useEffect(() => {
    r ? N.startBg(!0) : N.stopBg();
  }, [r, N]), _.useEffect(() => {
    N.updateVolume(l);
  }, [l, N]);
  const en = (w) => {
    const E = vt(w), T = E.mechanics, I = Math.floor((w - 1) / 10) + 1;
    if (T.includes("drag") && T.includes("double")) {
      const R = E.tiles, M = 1, A = 1, me = [...Array.from({ length: R }, (ce, Qe) => Qe)].sort(() => Math.random() - 0.5), ae = new Set(me.slice(0, M)), xe = new Set(me.slice(M, M + A)), de = new Set(me.slice(M + A));
      if (Yr(ae), Gr(xe), Jr(de), ht(xe), jt.current = xe, ae.size > 0) {
        const ce = Array.from(ae)[0];
        O(ce), V.current = ce, ko(ce);
      } else
        O(null), V.current = null, ko(null);
    } else if (T.includes("double") && !T.includes("drag")) {
      const M = /* @__PURE__ */ new Set();
      for (; M.size < 1; ) {
        const A = Math.floor(Math.random() * E.tiles);
        M.add(A);
      }
      jt.current = M, ht(M), Yr(/* @__PURE__ */ new Set()), Gr(/* @__PURE__ */ new Set()), Jr(/* @__PURE__ */ new Set()), ko(null), O(null), V.current = null;
    } else if (I >= 2 && T.includes("drag")) {
      const R = E.tiles, M = Array.from({ length: R - 1 }, (me, ae) => ae + 1), A = Math.floor(Math.random() * M.length), K = M[A];
      O(K), V.current = K, jt.current.clear(), ht(/* @__PURE__ */ new Set()), Yr(/* @__PURE__ */ new Set()), Gr(/* @__PURE__ */ new Set()), Jr(/* @__PURE__ */ new Set());
    } else
      jt.current.clear(), ht(/* @__PURE__ */ new Set()), Yr(/* @__PURE__ */ new Set()), Gr(/* @__PURE__ */ new Set()), Jr(/* @__PURE__ */ new Set()), O(null), V.current = null;
    mt.current.clear(), En(/* @__PURE__ */ new Set());
  }, [tn, wo] = _.useState([]), [ie, Re] = _.useState(null), [Me, j] = _.useState(null), [F, O] = _.useState(null), H = _.useRef(null), re = _.useRef({ x: 0, y: 0 }), et = _.useRef({ x: 0, y: 0 }), V = _.useRef(null), tt = _.useRef(null), [zt, ht] = _.useState(/* @__PURE__ */ new Set()), jt = _.useRef(/* @__PURE__ */ new Set()), [f0, En] = _.useState(/* @__PURE__ */ new Set()), mt = _.useRef(/* @__PURE__ */ new Set()), [$u, Yr] = _.useState(/* @__PURE__ */ new Set()), [So, Gr] = _.useState(/* @__PURE__ */ new Set()), [d0, Jr] = _.useState(/* @__PURE__ */ new Set()), [p0, ko] = _.useState(null), Te = _.useRef([]), le = _.useRef(0);
  _.useRef(/* @__PURE__ */ new Map());
  const Lt = _.useRef(null), nn = _.useRef(!1), kf = 8, Eo = _.useRef({ x: 0, y: 0 }), Co = _.useRef(!1), Zr = (w) => {
    const T = (vt(e) || { mechanics: [] }).mechanics || [], I = Math.floor((e - 1) / 10) + 1;
    return T.includes("combo") || T.includes("touch") && T.includes("drag") && T.includes("double") ? $u.has(w) : I >= 2 && T.includes("drag") ? V.current === w : !1;
  }, Ef = (w = "tap") => {
    const E = p.current;
    if (!E || V.current == null) return;
    const T = E.querySelector(`.tile[data-id="${V.current}"]`);
    if (!T) return;
    T.classList.remove("nudge-shake"), T.offsetHeight, T.classList.add("nudge-shake"), setTimeout(() => T.classList.remove("nudge-shake"), 550), Re((A) => A && { ...A, hint: !0 }), setTimeout(() => Re((A) => A && { ...A, hint: !1 }), 900);
    const I = T.getBoundingClientRect(), R = E.getBoundingClientRect(), M = document.createElement("div");
    M.className = "drag-hint", M.textContent = "arrastra", Object.assign(M.style, {
      left: `${I.left - R.left + I.width / 2}px`,
      top: `${I.top - R.top}px`
    }), E.appendChild(M), requestAnimationFrame(() => M.classList.add("show")), setTimeout(() => {
      M.classList.remove("show"), setTimeout(() => {
        try {
          M.remove();
        } catch (A) {
        }
      }, 180);
    }, 800);
    try {
      N.blink(720);
    } catch (A) {
    }
    gt(10, o);
  }, Cf = (w) => {
    const E = p.current;
    if (!E) return;
    const T = E.querySelector(`.tile[data-id="${w}"]`);
    if (!T) return;
    T.classList.remove("nudge-shake"), T.offsetHeight, T.classList.add("nudge-shake"), setTimeout(() => T.classList.remove("nudge-shake"), 550);
    const I = T.getBoundingClientRect(), R = E.getBoundingClientRect(), M = document.createElement("div");
    M.className = "drag-hint", M.textContent = "dos veces", Object.assign(M.style, {
      left: `${I.left - R.left + I.width / 2}px`,
      top: `${I.top - R.top}px`
    }), E.appendChild(M), requestAnimationFrame(() => M.classList.add("show")), setTimeout(() => {
      M.classList.remove("show"), setTimeout(() => {
        try {
          M.remove();
        } catch (A) {
        }
      }, 180);
    }, 800);
    try {
      N.blink(720);
    } catch (A) {
    }
    gt(10, o);
  }, qr = (w = "unknown") => {
    const E = p.current, T = V.current;
    if (!E || T == null) return;
    const I = E.querySelector(`.tile[data-id="${T}"]`);
    if (!I) return;
    let R = tt.current;
    if (!R && I.dataset.origX && (R = {
      x: parseFloat(I.dataset.origX),
      y: parseFloat(I.dataset.origY),
      width: parseFloat(I.dataset.origW),
      height: parseFloat(I.dataset.origH)
    }), !R) {
      console.warn("restoreSpecialTile: no original position", { reason: w, id: T });
      return;
    }
    I.style.position = "absolute", I.style.left = `${R.x}px`, I.style.top = `${R.y}px`, I.style.width = `${R.width}px`, I.style.height = `${R.height}px`, I.classList.remove("dragging"), I.style.zIndex = "", I.style.pointerEvents = "", j(null), H.current = null;
  }, Bu = (w, E, T, I, R = 48) => {
    if (!T || !I) return !1;
    const M = I.getBoundingClientRect(), A = w - M.left, K = E - M.top;
    return A > T.x - R && A < T.x + T.w + R && K > T.y - R && K < T.y + T.h + R;
  }, Wu = (w) => {
    var T;
    const E = (T = p.current) == null ? void 0 : T.querySelector(`.tile[data-id="${w}"]`);
    if (E) {
      const I = parseFloat(E.dataset.pitch || "880");
      E.style.background = rn.current || se, E.style.pointerEvents = "none", E.style.opacity = "0.7", N.ok(I), gt(20, o);
    }
  }, Hu = () => {
    if (le.current++, le.current >= Te.current.length) {
      if (!ln.current) {
        ln.current = !0;
        const w = Math.ceil((Date.now() - br.current) / 1e3);
        _o(w);
        try {
          window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
            method: "POST",
            body: JSON.stringify({
              level: e + 1,
              // Próximo nivel desbloqueado
              total_time_s: w,
              success: 1
            })
          }).catch((E) => {
            console.log("No hay sesión activa para guardar progreso");
          });
        } catch (E) {
        }
      }
      Lt.current && clearInterval(Lt.current), v(!1), nn.current = !1, d(!0);
      try {
        N.winMelody((el.current || []).slice(0, 6));
      } catch (w) {
      }
    }
  }, Vu = () => {
    N.fail(), gt(80, o), le.current = 0, nl(), mt.current.clear(), En(/* @__PURE__ */ new Set());
    const w = p.current;
    if (w && V.current !== null && tt.current) {
      const E = w.querySelector(`.tile[data-id="${V.current}"]`);
      E && (E.style.position = "absolute", E.style.left = `${tt.current.x}px`, E.style.top = `${tt.current.y}px`, E.style.width = `${tt.current.width}px`, E.style.height = `${tt.current.height}px`, E.style.zIndex = "", E.style.pointerEvents = "", E.classList.remove("dragging"));
    }
  }, br = _.useRef(0), el = _.useRef([]), rn = _.useRef(se), ln = _.useRef(!1);
  _.useEffect(() => {
    var E;
    const w = (E = p.current) == null ? void 0 : E.closest(".device");
    w && w.style.setProperty("--accent", se);
  }, [se]);
  const _o = (w) => {
    try {
      const T = (Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0) + w;
      localStorage.setItem("lum_total", JSON.stringify(T)), L(T), typeof c == "function" && c(T);
    } catch (E) {
    }
  };
  function _f(w, E = null, T = null) {
    var rr;
    const R = vt(e).mechanics, M = R.includes("drag") && R.includes("double"), A = T || (M ? So : jt.current), K = p.current;
    if (!K) return;
    K.querySelectorAll(".tile, .dropzone").forEach((Q) => Q.remove());
    const me = K.getBoundingClientRect(), ae = me.width, xe = me.height, de = (Q, ge) => Math.random() * (ge - Q) + Q, ce = (rr = oa[rn.current || se]) != null ? rr : 0, Qe = () => {
      let Q = Math.floor(Math.random() * 360), ge = 0;
      for (; Math.min(Math.abs(Q - ce), 360 - Math.abs(Q - ce)) < 30 && ge++ < 120; )
        Q = Math.floor(Math.random() * 360);
      return Q;
    };
    let Xe = null;
    Math.floor((e - 1) / 10) + 1 >= 2 && E !== null && (Xe = "hsl(300 96% 58%)");
    const Rt = [], Mt = /* @__PURE__ */ new Set();
    for (let Q = 0; Q < w; Q++) {
      let ge = 0, Ke = 0, on = 0, un = 0, Qu = !1, zf = 0;
      for (; !Qu && zf++ < 300; )
        ge = Math.max(56, Math.min(140, 60 + Math.random() * 80)), Ke = Math.max(56, Math.min(160, 60 + Math.random() * 100)), on = Math.max(8, Math.min(ae - ge - 8, de(0, ae - ge))), un = Math.max(8, Math.min(xe - Ke - 8, de(0, xe - Ke))), Qu = !Rt.some((J) => !(on + ge <= J.x || J.x + J.w <= on || un + Ke <= J.y || J.y + J.h <= un));
      Rt.push({ x: on, y: un, w: ge, h: Ke });
      const B = document.createElement("button");
      B.type = "button", B.className = "tile";
      let _n;
      if (E === Q && Xe)
        _n = Xe, Mt.add(Xe);
      else {
        let J;
        do
          J = Qe(), _n = `hsl(${J} 96% 58%)`;
        while (Mt.has(_n) || _n === Xe);
        Mt.add(_n);
      }
      if (Object.assign(B.style, { left: on + "px", top: un + "px", width: ge + "px", height: Ke + "px", background: _n }), B.style.background === (rn.current || se)) {
        const J = ((oa[rn.current || se] || 0) + 180) % 360;
        B.style.background = `hsl(${J} 96% 58%)`;
      }
      B.dataset.id = String(Q), B.dataset.orig = B.style.background;
      const Xu = el.current || [];
      B.dataset.pitch = String(Xu[Q % Xu.length] || 660);
      const rl = vt(e).mechanics, Ku = Math.floor((e - 1) / 10) + 1;
      if (B.style.cursor = "pointer", Ku >= 2 && V.current === Q && (B.classList.add("special-drag-tile"), B.addEventListener("dragstart", (J) => J.preventDefault()), B.addEventListener("touchstart", (J) => J.preventDefault(), { passive: !1 }), B.addEventListener("pointerdown", (J) => {
        No(J, { id: Q });
      }, { passive: !1 }), setTimeout(() => {
        var Yu;
        const J = B.getBoundingClientRect(), sn = (Yu = p.current) == null ? void 0 : Yu.getBoundingClientRect();
        if (sn) {
          const lr = {
            x: J.left - sn.left,
            y: J.top - sn.top,
            width: J.width,
            height: J.height
          };
          tt.current = lr, B.dataset.origX = String(lr.x), B.dataset.origY = String(lr.y), B.dataset.origW = String(lr.width), B.dataset.origH = String(lr.height);
        }
      }, 50)), rl.includes("combo") || rl.includes("touch") && rl.includes("drag") && rl.includes("double"))
        if ($u.has(Q)) {
          const J = B.style.background;
          B.style.border = `1px solid ${J}`, B.style.boxShadow = `0 0 8px ${J}88`, B.style.cursor = "grab", B.addEventListener("pointerdown", (sn) => No(sn, Q)), B.addEventListener("dragstart", (sn) => sn.preventDefault());
        } else So.has(Q) ? (B.style.setProperty("border", "2px solid white", "important"), B.style.setProperty("outline", "2px solid white", "important"), B.style.setProperty("outline-offset", "4px", "important")) : (B.style.border = "1px solid rgba(255,255,255,0.2)", B.style.boxShadow = "none");
      else
        A.has(Q) && (B.style.setProperty("border", "2px solid white", "important"), B.style.setProperty("outline", "2px solid white", "important"), B.style.setProperty("outline-offset", "4px", "important"));
      Ku >= 2 && V.current === Q && (B.style.cursor = "grab"), K.appendChild(B);
    }
    K.__lumDeleg && K.removeEventListener("pointerdown", K.__lumDeleg);
    const Cn = (Q) => {
      const ge = Q.target && Q.target.closest && Q.target.closest(".tile");
      if (!ge || !K.contains(ge) || !nn.current) return;
      const Ke = Number(ge.dataset.id), on = Te.current[le.current], un = Zr(on);
      if (ge.classList.contains("special-drag-tile") || Ke === V.current) {
        No(Q, { id: Ke });
        return;
      }
      un || (Q.preventDefault && Q.preventDefault(), nr(Ke));
    };
    K.addEventListener("pointerdown", Cn, { passive: !1 }), K.__lumDeleg = Cn;
  }
  function tl(w) {
    const E = p.current, T = E && E.querySelector(`.tile[data-id="${w}"]`);
    if (!T) return;
    T.style.background;
    const I = T.style.border, R = T.style.boxShadow, M = T.style.outline, A = T.style.outlineOffset;
    T.classList.add("lit"), T.style.background = rn.current || se, N.blink(parseFloat(T.dataset.pitch || "720")), setTimeout(() => {
      T.classList.remove("lit"), jt.current.has(w) && (T.style.border = I, T.style.boxShadow = R, T.style.outline = M, T.style.outlineOffset = A);
    }, 260);
  }
  function Nf() {
    const w = Te.current;
    w && w.length && tl(w[0]);
  }
  function nl() {
    const w = p.current;
    w && w.querySelectorAll(".tile").forEach((E) => {
      E.style.background = E.dataset.orig || E.style.background, E.classList.remove("lit"), E.style.opacity = "1";
    });
  }
  function tr(w) {
    var Qe;
    const E = typeof w == "number" ? w : e, T = (Qe = p.current) == null ? void 0 : Qe.closest(".device");
    rn.current = ia(E), T && T.style.setProperty("--accent", rn.current), d(!1), f(!1), k(!1), ln.current = !1, Lt.current && clearInterval(Lt.current);
    const I = t0(E), R = Array.from({ length: I }, (Xe, Pt) => Pt), M = 0, A = R.slice(1).sort(() => Math.random() - 0.5);
    Te.current = [M, ...A], le.current = 0, el.current = ua[Math.floor(Math.random() * ua.length)] || [440, 494, 523, 587, 659, 698, 784, 880, 988, 1046, 1174, 1318, 1396, 1567, 1760], en(E);
    let K = null, me = /* @__PURE__ */ new Set();
    const ae = Math.floor((E - 1) / 10) + 1;
    vt(E).mechanics, K = V.current, me = jt.current, _f(I, K, me), setTimeout(() => {
      var Pt, Rt, Mt;
      const Xe = vt(E);
      if (ae >= 2 && K !== null && Xe.mechanics.includes("drag")) {
        const Cn = (Pt = p.current) == null ? void 0 : Pt.querySelector(`.tile[data-id="${K}"]`);
        if (Cn) {
          const rr = Cn.getBoundingClientRect();
          if ((Rt = p.current) == null ? void 0 : Rt.getBoundingClientRect()) {
            (Mt = p.current) == null || Mt.getBoundingClientRect();
            const ge = 60, Ke = {
              x: ge,
              // Esquina izquierda con margen
              y: ge,
              // Esquina superior con margen
              w: rr.width,
              h: rr.height,
              color: Cn.style.backgroundColor,
              over: !1
            };
            Re(Ke);
          }
        }
      } else
        Re(null);
    }, 100);
    const de = bo(E);
    x(de), v(!0), nn.current = !0, N.start(), br.current = Date.now();
    const ce = Date.now();
    Lt.current = setInterval(() => {
      const Xe = (Date.now() - ce) / 1e3, Pt = Math.max(0, de - Xe);
      if (x(Math.ceil(Pt)), Pt <= 0) {
        if (!ln.current) {
          ln.current = !0;
          const Rt = Math.ceil((Date.now() - br.current) / 1e3);
          _o(Rt);
          try {
            window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
              method: "POST",
              body: JSON.stringify({
                level: e,
                total_time_s: Rt,
                success: 0
              })
            }).catch((Mt) => {
              console.log("No hay sesión activa para guardar progreso");
            });
          } catch (Mt) {
          }
        }
        clearInterval(Lt.current), v(!1), nn.current = !1, qr("timeout"), f(!0), N.fail(), nl();
      }
    }, 100), setTimeout(Nf, 1500);
  }
  _.useEffect(() => {
    const w = (E) => {
      Co.current && (E.preventDefault(), E.stopPropagation(), Co.current = !1);
    };
    return document.addEventListener("click", w, !0), () => document.removeEventListener("click", w, !0);
  }, []), _.useEffect(() => {
    window.LumetrixTest = Object.assign({}, window.LumetrixTest, {
      start: tr,
      state: () => ({ level: e, world: Y, levelInWorld: U, running: S, time: h, seqLen: (Te.current || []).length }),
      tapExpected: () => {
        const w = Te.current[le.current];
        w != null && nr(w);
      },
      tapId: (w) => nr(w),
      isDragStep: () => {
        const w = Te.current[le.current];
        return Zr(w);
      },
      test: {
        ignoreClicksOnDragStep: () => {
          const w = Te.current[le.current], E = le.current;
          return Zr(w) ? (nr(w === 0 ? 1 : 0), { ok: le.current === E, step: le.current, expected: w }) : { ok: !1, reason: "not drag step" };
        }
      }
    });
  }, [e, Y, U, S, h]);
  const No = (w, E) => {
    var M;
    if (!nn.current) return;
    const T = Te.current[le.current], I = p.current, R = I == null ? void 0 : I.querySelector(`.tile[data-id="${E.id}"]`);
    if (R) {
      if (E.id === V.current) {
        w.preventDefault(), w.stopPropagation();
        const A = R.getBoundingClientRect();
        Eo.current = { x: A.left, y: A.top }, Co.current = !0, j(E.id), H.current = (M = w.pointerId) != null ? M : null, re.current = { x: w.clientX - A.left, y: w.clientY - A.top }, et.current = { x: A.left, y: A.top }, R.style.zIndex = 1e3, R.classList.add("dragging"), R.style.pointerEvents = "none", R.style.touchAction = "none";
        return;
      }
      if (E.id !== T) return Vu();
      Wu(E.id), Hu();
    }
  };
  function nr(w) {
    if (!nn.current) return;
    const E = vt(e);
    if (E.mechanics.includes("drag") && w === V.current)
      return;
    const T = Te.current[le.current], I = p.current;
    if (Zr(T))
      return;
    const R = I && I.querySelector(`.tile[data-id="${w}"]`);
    if (!R) return;
    const M = parseFloat(R.dataset.pitch || "880"), A = jt.current.has(w), K = (E.mechanics.includes("combo") || E.mechanics.includes("touch") && E.mechanics.includes("drag") && E.mechanics.includes("double")) && So.has(w);
    if (A && E.mechanics.includes("double") || K)
      if (w === T)
        if (mt.current.has(w))
          R.style.opacity = "1", tl(w), N.ok(M), gt(20, o), le.current++, mt.current.delete(w), En(new Set(mt.current));
        else {
          R.style.opacity = "0.6", tl(w), N.ok(M), gt(20, o), mt.current.add(w), En(new Set(mt.current)), Cf(w);
          return;
        }
      else {
        N.fail(), gt(80, o), le.current = 0, nl(), mt.current.clear(), En(/* @__PURE__ */ new Set());
        return;
      }
    else if (w === T) {
      tl(w), N.ok(M), gt(20, o), le.current++;
      const me = Math.floor((e - 1) / 10) + 1;
      if ((me >= 2 || E.mechanics.includes("combo") || E.mechanics.includes("touch") && E.mechanics.includes("drag") && E.mechanics.includes("double")) && le.current < Te.current.length ? setTimeout(() => {
        var xe, de;
        if (Math.floor((e - 1) / 10) + 1 >= 2 && V.current !== null) {
          const ce = (xe = p.current) == null ? void 0 : xe.querySelector(`.tile[data-id="${V.current}"]`);
          if (ce) {
            (de = p.current) == null || de.getBoundingClientRect();
            const Qe = 60, Xe = {
              x: Qe,
              // Esquina izquierda con margen
              y: Qe,
              // Esquina superior con margen
              w: ce.offsetWidth,
              h: ce.offsetHeight,
              color: ce.style.backgroundColor,
              over: !1
            };
            Re(Xe);
          }
        }
      }, 100) : (me >= 2 || E.mechanics.includes("combo") || E.mechanics.includes("touch") && E.mechanics.includes("drag") && E.mechanics.includes("double")) && Re(null), le.current >= Te.current.length) {
        if (!ln.current) {
          ln.current = !0;
          const ae = Math.ceil((Date.now() - br.current) / 1e3);
          _o(ae);
          try {
            window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
              method: "POST",
              body: JSON.stringify({
                level: e + 1,
                // Próximo nivel desbloqueado
                total_time_s: ae,
                success: 1
              })
            }).catch((xe) => {
              console.log("No hay sesión activa para guardar progreso");
            });
          } catch (xe) {
          }
        }
        Lt.current && clearInterval(Lt.current), v(!1), nn.current = !1, e === 50 ? k(!0) : d(!0);
        try {
          N.winMelody((el.current || []).slice(0, 6));
        } catch (ae) {
        }
      }
    } else
      N.fail(), gt(80, o), le.current = 0, qr("wrong-tap"), nl(), mt.current.clear(), En(/* @__PURE__ */ new Set());
  }
  function Tf() {
    d(!1), f(!1), k(!1);
    const w = e + 1;
    t(w), setTimeout(() => tr(w), 0);
  }
  return _.useEffect(() => {
    window.LumetrixTest = { start: tr, state: () => ({ level: e, world: Y, levelInWorld: U, running: S, time: h, seqLen: (Te.current || []).length }), tapExpected: () => {
      const w = Te.current[le.current];
      w != null && nr(w);
    } };
  }, [e, Y, U, S, h]), _.useEffect(() => {
    const w = (T) => {
      var ce;
      if (Me == null || H.current !== null && T.pointerId !== H.current) return;
      const I = T.clientX - re.current.x, R = T.clientY - re.current.y, M = (ce = p.current) == null ? void 0 : ce.querySelector(`.tile[data-id="${Me}"]`);
      if (!M) return;
      const A = Math.abs(I - et.current.x), K = Math.abs(R - et.current.y), me = 5;
      (A > me || K > me || M.style.position === "fixed") && (M.style.position = "fixed", M.style.left = `${I}px`, M.style.top = `${R}px`, et.current = { x: I, y: R });
      const ae = I + ((M == null ? void 0 : M.offsetWidth) || 0) / 2, xe = R + ((M == null ? void 0 : M.offsetHeight) || 0) / 2, de = Bu(ae, xe, ie, p.current, 48);
      Re((Qe) => Qe ? { ...Qe, over: de } : null);
    }, E = (T) => {
      var xe;
      if (Me == null || H.current !== null && T.pointerId !== H.current) return;
      const I = Te.current[le.current], R = (xe = p.current) == null ? void 0 : xe.querySelector(`.tile[data-id="${Me}"]`), M = et.current.x, A = et.current.y, K = M + ((R == null ? void 0 : R.offsetWidth) || 0) / 2, me = A + ((R == null ? void 0 : R.offsetHeight) || 0) / 2, ae = Bu(K, me, ie, p.current, 48);
      if (console.debug("Drag drop validation:", {
        expected: I,
        draggingId: Me,
        special: V.current,
        inside: ae,
        step: le.current,
        drop: ie
      }), Me === I && Me === V.current && ae && R)
        return R.style.position = "absolute", R.style.left = `${ie.x + (ie.w - R.offsetWidth) / 2}px`, R.style.top = `${ie.y + (ie.h - R.offsetHeight) / 2}px`, j(null), H.current = null, Re((de) => de ? { ...de, over: !1 } : null), R && (R.classList.remove("dragging"), R.style.pointerEvents = "", R.style.zIndex = ""), Wu(Me), Hu();
      if (Me === V.current)
        if (Math.hypot(M - Eo.current.x, A - Eo.current.y) < kf) {
          qr("tap-detected"), j(null), H.current = null, Re((ce) => ce ? { ...ce, over: !1 } : null), Ef("tap");
          return;
        } else
          qr("drop-miss");
      j(null), H.current = null, Re((de) => de ? { ...de, over: !1 } : null), Vu();
    };
    return document.addEventListener("pointermove", w, !0), document.addEventListener("pointerup", E, !0), document.addEventListener("pointercancel", E, !0), () => {
      document.removeEventListener("pointermove", w, !0), document.removeEventListener("pointerup", E, !0), document.removeEventListener("pointercancel", E, !0);
    };
  }, [Me, ie, tn]), /* @__PURE__ */ m.jsxs("section", { className: "screen", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "topbar", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ m.jsx("img", { src: "lumetrix/img/logo2.png", alt: "LUMETRIX", style: { height: "32px", width: "auto" }, onError: (w) => {
          w.target.style.display = "none", w.target.nextSibling.style.display = "inline";
        } }),
        /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "16px", fontWeight: "900", letterSpacing: "0.1em", color: "#fff" }, children: "LUMETRIX" })
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: "icons", children: [
        /* @__PURE__ */ m.jsxs("button", { className: "icon", onClick: u, "aria-label": "Ranking", children: [
          /* @__PURE__ */ m.jsx("img", { src: "lumetrix/img/ico_ranking.png", alt: "Ranking", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (w) => {
            w.target.style.display = "none", w.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "🏆" })
        ] }),
        /* @__PURE__ */ m.jsxs("button", { className: "icon", onClick: s, "aria-label": "Opciones", children: [
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
      /* @__PURE__ */ m.jsx("div", { className: "timebar", children: /* @__PURE__ */ m.jsx("i", { className: "timefill", style: { width: `${Math.max(0, Math.min(100, h / bo(e) * 100))}%` } }) }),
      /* @__PURE__ */ m.jsxs("div", { className: "meta", children: [
        /* @__PURE__ */ m.jsxs("span", { className: "chip", children: [
          "Nivel ",
          /* @__PURE__ */ m.jsx("b", { children: e })
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
      ie && /* @__PURE__ */ m.jsx(
        "div",
        {
          className: `drop-zone ${ie.over ? "drag-over" : ""} ${ie.hint ? "pulse" : ""}`,
          style: {
            position: "absolute",
            left: ie.x,
            top: ie.y,
            width: ie.w,
            height: ie.h,
            border: `3px dashed ${ie.color}`,
            borderRadius: "12px",
            background: "rgba(0,0,0,0.3)",
            pointerEvents: "none",
            zIndex: 10,
            transition: "all 0.2s ease",
            boxShadow: ie.over ? `0 0 25px ${ie.color}` : `0 0 15px ${ie.color}33`
          }
        }
      ),
      !S && !D && !a && /* @__PURE__ */ m.jsxs("div", { className: "overlay", style: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }, children: [
        /* @__PURE__ */ m.jsx("button", { className: "btn-start", onClick: () => tr(), children: "EMPEZAR" }),
        /* @__PURE__ */ m.jsxs("div", { style: { marginTop: "16px", color: "#ffffff88", fontSize: "16px", fontWeight: 600 }, children: [
          "Nivel ",
          e,
          " • Mundo ",
          Y
        ] })
      ] }),
      D && /* @__PURE__ */ m.jsx("div", { className: "overlay", children: /* @__PURE__ */ m.jsxs("div", { className: "card-compact", style: { textAlign: "center" }, children: [
        /* @__PURE__ */ m.jsx("div", { style: { fontSize: 32, marginBottom: 8, textShadow: "0 0 10px var(--neon2), 0 0 20px var(--neon2)" }, children: "✨" }),
        /* @__PURE__ */ m.jsx("h3", { style: { color: "var(--neon2)", marginBottom: 12 }, children: "¡Nivel superado!" }),
        /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: Tf, children: "Siguiente" })
      ] }) }),
      a && /* @__PURE__ */ m.jsx("div", { className: "overlay", children: /* @__PURE__ */ m.jsxs("div", { className: "card-compact", style: { textAlign: "center" }, children: [
        /* @__PURE__ */ m.jsx("div", { style: { fontSize: 32, marginBottom: 8, textShadow: "0 0 10px var(--neon1), 0 0 20px var(--neon1)" }, children: "💔" }),
        /* @__PURE__ */ m.jsx("h3", { style: { color: "var(--neon1)", marginBottom: 12 }, children: "Tiempo agotado" }),
        /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: () => tr(), children: "Reintentar" })
      ] }) }),
      y && /* @__PURE__ */ m.jsx("div", { className: "overlay", children: /* @__PURE__ */ m.jsxs("div", { className: "card-compact", style: { textAlign: "center", maxWidth: "90vw", padding: "24px" }, children: [
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
            k(!1), t(1);
          }, children: "Reiniciar" }),
          /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: () => {
            k(!1), u();
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
function u0({ onClose: e, total: t }) {
  const [n, r] = _.useState([]), [l, o] = _.useState(!0), [i, u] = _.useState(null), s = _.useRef(null);
  _.useEffect(() => {
    (async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const h = await window.LUM_API.api("auth.php?action=check_session");
          h && h.success && u(h.user.email);
          const x = await window.LUM_API.api("ranking.php?action=global");
          x && x.success && x.data && r(x.data.map((S, v) => ({
            rank: v + 1,
            name: S.nick,
            email: S.email,
            level: S.level,
            time: S.total_time_s,
            world: Math.floor((S.level - 1) / 10) + 1
          })));
        }
      } catch (h) {
        r([]);
      } finally {
        o(!1);
      }
    })();
  }, []), _.useEffect(() => {
    !l && s.current && setTimeout(() => {
      var p;
      (p = s.current) == null || p.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }, [l, n]);
  const c = (p) => p === 1 ? "#FFD700" : p === 2 ? "#C0C0C0" : p === 3 ? "#CD7F32" : "#00ffff", g = (p) => p === 1 ? "1" : p === 2 ? "2" : p === 3 ? "3" : p;
  return /* @__PURE__ */ m.jsx("div", { className: "modal", children: /* @__PURE__ */ m.jsxs("div", { className: "card", style: { border: "2px solid #00ffff", boxShadow: "0 0 20px #00ffff44" }, children: [
    /* @__PURE__ */ m.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #00ffff", boxShadow: "0 0 10px #00ffff", background: "#000" }, children: "✕" }),
    /* @__PURE__ */ m.jsx("h3", { style: { color: "#00ffff", marginTop: 0, textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff", fontSize: "20px" }, children: "RANKING GLOBAL" }),
    l ? /* @__PURE__ */ m.jsx("div", { style: { textAlign: "center", padding: "40px", color: "#00ffff66" }, children: "Cargando ranking..." }) : n.length === 0 ? /* @__PURE__ */ m.jsxs("div", { style: { textAlign: "center", padding: "40px", color: "#00ffff66" }, children: [
      /* @__PURE__ */ m.jsx("div", { style: { fontSize: 16, marginBottom: 8 }, children: "Aún no hay jugadores" }),
      /* @__PURE__ */ m.jsx("div", { style: { fontSize: 12 }, children: "¡Sé el primero en aparecer aquí!" })
    ] }) : /* @__PURE__ */ m.jsx("div", { className: "list", style: { gap: "8px", maxHeight: "300px", overflowY: "auto", paddingRight: "4px" }, children: n.map((p) => {
      const h = i && p.email === i;
      return /* @__PURE__ */ m.jsxs(
        "div",
        {
          ref: h ? s : null,
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
              right: "8px",
              top: "-8px",
              background: "#FFD700",
              color: "#000",
              fontSize: "9px",
              fontWeight: "bold",
              padding: "2px 6px",
              borderRadius: "10px"
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
                Math.round(p.time),
                "s"
              ] })
            ] })
          ]
        },
        p.rank
      );
    }) })
  ] }) });
}
function s0({ onClose: e, onOpenAuth: t, level: n, setLevel: r, soundOn: l, musicOn: o, vibrateOn: i, setSoundOn: u, setMusicOn: s, setVibrateOn: c, onResetTotal: g, musicVolume: p, setMusicVolume: h }) {
  return /* @__PURE__ */ m.jsx("div", { className: "modal", children: /* @__PURE__ */ m.jsxs("div", { className: "card", style: { border: "2px solid #39ff14", boxShadow: "0 0 20px #39ff1444" }, children: [
    /* @__PURE__ */ m.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #39ff14", boxShadow: "0 0 10px #39ff14", background: "#000" }, children: "✕" }),
    /* @__PURE__ */ m.jsx("h3", { style: { color: "#39ff14", marginTop: 0, textShadow: "0 0 10px #39ff14, 0 0 20px #39ff14", fontSize: "20px" }, children: "CONFIGURACIÓN" }),
    /* @__PURE__ */ m.jsxs("div", { className: "list", style: { gap: "12px" }, children: [
      /* @__PURE__ */ m.jsxs("label", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ m.jsx("span", { style: { color: "#39ff14", fontWeight: "bold" }, children: "Música de fondo" }),
        /* @__PURE__ */ m.jsx("input", { type: "checkbox", checked: o, onChange: (x) => s(x.target.checked), style: { transform: "scale(1.2)", accentColor: "#39ff14" } })
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
function a0({ onClose: e }) {
  const [t, n] = _.useState("login"), [r, l] = _.useState(""), [o, i] = _.useState(""), [u, s] = _.useState(""), [c, g] = _.useState(""), [p, h] = _.useState(!1), [x, S] = _.useState(!1), [v, D] = _.useState(null);
  _.useEffect(() => {
    (async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const k = await window.LUM_API.api("auth.php?action=check_session");
          k && k.success && (S(!0), D(k.user));
        }
      } catch (k) {
        S(!1);
      }
    })();
  }, []);
  const d = async () => {
    h(!0);
    try {
      await window.LUM_API.api("auth.php?action=logout"), window.location.reload();
    } catch (y) {
      g("❌ Error al cerrar sesión"), h(!1);
    }
  }, a = async () => {
    if (!r || !o || !u) {
      g("❌ Rellena todos los campos");
      return;
    }
    h(!0), g("");
    try {
      const y = await window.LUM_API.api("auth.php?action=register", {
        method: "POST",
        body: JSON.stringify({ username: r, email: o, password: u })
      });
      y.success ? (g("✅ ¡Registrado! Ahora inicia sesión"), n("login"), s("")) : g("❌ " + (y.message || "Error en registro"));
    } catch (y) {
      g("❌ Error de conexión");
    }
    h(!1);
  }, f = async () => {
    if (!o || !u) {
      g("❌ Rellena email y contraseña");
      return;
    }
    h(!0), g("");
    try {
      const y = await window.LUM_API.api("auth.php?action=login", {
        method: "POST",
        body: JSON.stringify({ username: o, password: u })
      });
      y.success ? (g("✅ ¡Bienvenido!"), setTimeout(() => {
        window.location.reload();
      }, 500)) : g("❌ " + (y.message || "Credenciales incorrectas"));
    } catch (y) {
      g("❌ Error de conexión");
    }
    h(!1);
  };
  return /* @__PURE__ */ m.jsx("div", { className: "modal", children: /* @__PURE__ */ m.jsxs("div", { className: "card", style: { maxWidth: "420px", border: "2px solid #ff00ff", boxShadow: "0 0 20px #ff00ff44" }, children: [
    /* @__PURE__ */ m.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #ff00ff", boxShadow: "0 0 10px #ff00ff", background: "#000" }, children: "✕" }),
    x ? (
      // Usuario ya logueado - mostrar info y logout
      /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
        /* @__PURE__ */ m.jsx("h3", { style: { color: "#ff00ff", marginTop: 0, marginBottom: 12, textShadow: "0 0 10px #ff00ff, 0 0 20px #ff00ff", fontSize: "18px" }, children: "Mi cuenta" }),
        /* @__PURE__ */ m.jsxs("div", { className: "list", style: { gap: 12 }, children: [
          v && /* @__PURE__ */ m.jsxs("div", { style: { background: "rgba(255,0,255,0.1)", border: "1px solid #ff00ff33", borderRadius: "10px", padding: "16px", textAlign: "center" }, children: [
            /* @__PURE__ */ m.jsx("div", { style: { fontSize: 12, opacity: 0.6, marginBottom: 4 }, children: "Jugador" }),
            /* @__PURE__ */ m.jsx("div", { style: { fontSize: 20, color: "#ff00ff", fontWeight: "bold", marginBottom: 4 }, children: v.nick }),
            /* @__PURE__ */ m.jsx("div", { style: { fontSize: 11, opacity: 0.5, marginBottom: 8 }, children: v.email }),
            v.fecha_registro && /* @__PURE__ */ m.jsxs("div", { style: { fontSize: 9, opacity: 0.4 }, children: [
              "Desde ",
              new Date(v.fecha_registro).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })
            ] })
          ] }),
          /* @__PURE__ */ m.jsx(
            "button",
            {
              className: "btn",
              onClick: d,
              disabled: p,
              style: { border: "2px solid #ff4466", color: "#ff4466", boxShadow: "0 0 10px #ff446644", fontWeight: "bold", width: "100%", opacity: p ? 0.5 : 1 },
              children: p ? "Cerrando..." : "Cerrar sesión"
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
          t === "register" && /* @__PURE__ */ m.jsx(
            "input",
            {
              placeholder: "Nick",
              value: r,
              onChange: (y) => l(y.target.value),
              style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#fff", boxShadow: "0 0 10px #ff00ff22", outline: "none" }
            }
          ),
          /* @__PURE__ */ m.jsx(
            "input",
            {
              placeholder: "Email",
              type: "email",
              value: o,
              onChange: (y) => i(y.target.value),
              style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#fff", boxShadow: "0 0 10px #ff00ff22", outline: "none" }
            }
          ),
          /* @__PURE__ */ m.jsx(
            "input",
            {
              placeholder: "Contraseña",
              type: "password",
              value: u,
              onChange: (y) => s(y.target.value),
              onKeyPress: (y) => y.key === "Enter" && (t === "login" ? f() : a()),
              style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#fff", boxShadow: "0 0 10px #ff00ff22", outline: "none" }
            }
          ),
          c && /* @__PURE__ */ m.jsx("div", { style: { fontSize: 14, textAlign: "center", marginTop: 4, color: c.includes("✅") ? "#39ff14" : "#ff4466" }, children: c }),
          /* @__PURE__ */ m.jsxs("div", { style: { display: "flex", gap: 12, justifyContent: "center", marginTop: 8 }, children: [
            /* @__PURE__ */ m.jsx(
              "button",
              {
                className: "btn btn1",
                onClick: t === "login" ? f : a,
                disabled: p,
                style: { border: "2px solid #39ff14", color: "#39ff14", boxShadow: "0 0 10px #39ff1444", fontWeight: "bold", opacity: p ? 0.5 : 1 },
                children: p ? "Cargando..." : t === "login" ? "Entrar" : "Crear cuenta"
              }
            ),
            /* @__PURE__ */ m.jsx(
              "button",
              {
                className: "btn",
                onClick: e,
                disabled: p,
                style: { border: "2px solid #00ffff", color: "#00ffff", boxShadow: "0 0 10px #00ffff44", fontWeight: "bold", opacity: p ? 0.5 : 1 },
                children: "Cancelar"
              }
            )
          ] })
        ] })
      ] })
    )
  ] }) });
}
function c0() {
  l0();
  const [e, t] = _.useState("intro"), [n, r] = _.useState(!1), [l, o] = _.useState(!1), [i, u] = _.useState(!1), [s, c] = _.useState(!0), [g, p] = _.useState(!0), [h, x] = _.useState(0.15), [S, v] = _.useState(!0), [D, d] = _.useState(1), [a, f] = _.useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0;
    } catch (y) {
      return 0;
    }
  });
  return _.useEffect(() => {
    (async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const k = await window.LUM_API.api("auth.php?action=check_session");
          if (k && k.success) {
            const z = await window.LUM_API.api("game.php?action=get_progress");
            if (z && z.success && z.data) {
              const L = z.data.nivel_actual || 1, N = z.data.total_time_s || 0;
              d(L), f(N), console.log(`Progreso cargado: Nivel ${L}, Tiempo ${N}s`);
            }
          }
        }
      } catch (k) {
        console.log("Sin progreso guardado, empezando desde nivel 1");
      }
    })();
  }, []), _.useEffect(() => {
    window.LumetrixTest = Object.assign({}, window.LumetrixTest, { help: "LumetrixTest.start(), .tapExpected(), .state() — tras pulsar Jugar" });
  }, []), /* @__PURE__ */ m.jsx("div", { className: "shell", children: /* @__PURE__ */ m.jsxs("div", { className: "device", children: [
    e === "intro" ? /* @__PURE__ */ m.jsx(o0, { onPlay: () => t("game"), onAuth: () => u(!0) }) : /* @__PURE__ */ m.jsx(
      i0,
      {
        level: D,
        setLevel: d,
        soundOn: s,
        musicOn: g,
        musicVolume: h,
        vibrateOn: S,
        onOpenAuth: () => u(!0),
        onOpenRanking: () => r(!0),
        onOpenOptions: () => o(!0),
        onTotalUpdate: f,
        totalTime: a
      }
    ),
    n && /* @__PURE__ */ m.jsx(u0, { onClose: () => r(!1), total: a }),
    l && /* @__PURE__ */ m.jsx(
      s0,
      {
        onClose: () => o(!1),
        onOpenAuth: () => {
          o(!1), u(!0);
        },
        level: D,
        setLevel: d,
        soundOn: s,
        musicOn: g,
        vibrateOn: S,
        setSoundOn: c,
        setMusicOn: p,
        setVibrateOn: v,
        musicVolume: h,
        setMusicVolume: x,
        onResetTotal: () => {
          try {
            localStorage.removeItem("lum_total");
          } catch (y) {
          }
          f(0);
        }
      }
    ),
    i && /* @__PURE__ */ m.jsx(a0, { onClose: () => u(!1) })
  ] }) });
}
function m0(e) {
  const t = Sf(e);
  t.render(/* @__PURE__ */ m.jsx(c0, {})), e.__lum_unmount = () => {
    var n;
    return (n = t.unmount) == null ? void 0 : n.call(t);
  };
}
function g0(e) {
  var t;
  try {
    (t = e.__lum_unmount) == null || t.call(e);
  } catch (n) {
  }
}
export {
  m0 as mount,
  g0 as unmount
};
//# sourceMappingURL=game.bundle.js.map
