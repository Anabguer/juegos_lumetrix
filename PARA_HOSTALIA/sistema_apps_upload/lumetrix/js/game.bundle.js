var aa = { exports: {} }, ro = {}, ca = { exports: {} }, B = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hr = Symbol.for("react.element"), Lf = Symbol.for("react.portal"), Pf = Symbol.for("react.fragment"), jf = Symbol.for("react.strict_mode"), Rf = Symbol.for("react.profiler"), Mf = Symbol.for("react.provider"), If = Symbol.for("react.context"), Of = Symbol.for("react.forward_ref"), Df = Symbol.for("react.suspense"), $f = Symbol.for("react.memo"), Ff = Symbol.for("react.lazy"), Js = Symbol.iterator;
function Af(e) {
  return e === null || typeof e != "object" ? null : (e = Js && e[Js] || e["@@iterator"], typeof e == "function" ? e : null);
}
var fa = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, da = Object.assign, pa = {};
function er(e, t, n) {
  this.props = e, this.context = t, this.refs = pa, this.updater = n || fa;
}
er.prototype.isReactComponent = {};
er.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
er.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ha() {
}
ha.prototype = er.prototype;
function Ki(e, t, n) {
  this.props = e, this.context = t, this.refs = pa, this.updater = n || fa;
}
var Yi = Ki.prototype = new ha();
Yi.constructor = Ki;
da(Yi, er.prototype);
Yi.isPureReactComponent = !0;
var Zs = Array.isArray, ma = Object.prototype.hasOwnProperty, Gi = { current: null }, ga = { key: !0, ref: !0, __self: !0, __source: !0 };
function ya(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) ma.call(t, r) && !ga.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in s = e.defaultProps, s) l[r] === void 0 && (l[r] = s[r]);
  return { $$typeof: Hr, type: e, key: o, ref: i, props: l, _owner: Gi.current };
}
function Uf(e, t) {
  return { $$typeof: Hr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Ji(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Hr;
}
function Bf(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var qs = /\/+/g;
function zo(e, t) {
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
        case Lf:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + zo(i, 0) : r, Zs(l) ? (n = "", e != null && (n = e.replace(qs, "$&/") + "/"), Sl(l, t, n, "", function(c) {
    return c;
  })) : l != null && (Ji(l) && (l = Uf(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(qs, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", Zs(e)) for (var s = 0; s < e.length; s++) {
    o = e[s];
    var u = r + zo(o, s);
    i += Sl(o, t, n, u, l);
  }
  else if (u = Af(e), typeof u == "function") for (e = u.call(e), s = 0; !(o = e.next()).done; ) o = o.value, u = r + zo(o, s++), i += Sl(o, t, n, u, l);
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
var Pe = { current: null }, kl = { transition: null }, Hf = { ReactCurrentDispatcher: Pe, ReactCurrentBatchConfig: kl, ReactCurrentOwner: Gi };
function va() {
  throw Error("act(...) is not supported in production builds of React.");
}
B.Children = { map: ll, forEach: function(e, t, n) {
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
  if (!Ji(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
B.Component = er;
B.Fragment = Pf;
B.Profiler = Rf;
B.PureComponent = Ki;
B.StrictMode = jf;
B.Suspense = Df;
B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Hf;
B.act = va;
B.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = da({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = Gi.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
    for (u in t) ma.call(t, u) && !ga.hasOwnProperty(u) && (r[u] = t[u] === void 0 && s !== void 0 ? s[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    s = Array(u);
    for (var c = 0; c < u; c++) s[c] = arguments[c + 2];
    r.children = s;
  }
  return { $$typeof: Hr, type: e.type, key: l, ref: o, props: r, _owner: i };
};
B.createContext = function(e) {
  return e = { $$typeof: If, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Mf, _context: e }, e.Consumer = e;
};
B.createElement = ya;
B.createFactory = function(e) {
  var t = ya.bind(null, e);
  return t.type = e, t;
};
B.createRef = function() {
  return { current: null };
};
B.forwardRef = function(e) {
  return { $$typeof: Of, render: e };
};
B.isValidElement = Ji;
B.lazy = function(e) {
  return { $$typeof: Ff, _payload: { _status: -1, _result: e }, _init: Wf };
};
B.memo = function(e, t) {
  return { $$typeof: $f, type: e, compare: t === void 0 ? null : t };
};
B.startTransition = function(e) {
  var t = kl.transition;
  kl.transition = {};
  try {
    e();
  } finally {
    kl.transition = t;
  }
};
B.unstable_act = va;
B.useCallback = function(e, t) {
  return Pe.current.useCallback(e, t);
};
B.useContext = function(e) {
  return Pe.current.useContext(e);
};
B.useDebugValue = function() {
};
B.useDeferredValue = function(e) {
  return Pe.current.useDeferredValue(e);
};
B.useEffect = function(e, t) {
  return Pe.current.useEffect(e, t);
};
B.useId = function() {
  return Pe.current.useId();
};
B.useImperativeHandle = function(e, t, n) {
  return Pe.current.useImperativeHandle(e, t, n);
};
B.useInsertionEffect = function(e, t) {
  return Pe.current.useInsertionEffect(e, t);
};
B.useLayoutEffect = function(e, t) {
  return Pe.current.useLayoutEffect(e, t);
};
B.useMemo = function(e, t) {
  return Pe.current.useMemo(e, t);
};
B.useReducer = function(e, t, n) {
  return Pe.current.useReducer(e, t, n);
};
B.useRef = function(e) {
  return Pe.current.useRef(e);
};
B.useState = function(e) {
  return Pe.current.useState(e);
};
B.useSyncExternalStore = function(e, t, n) {
  return Pe.current.useSyncExternalStore(e, t, n);
};
B.useTransition = function() {
  return Pe.current.useTransition();
};
B.version = "18.3.1";
ca.exports = B;
var N = ca.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vf = N, Qf = Symbol.for("react.element"), Xf = Symbol.for("react.fragment"), Kf = Object.prototype.hasOwnProperty, Yf = Vf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Gf = { key: !0, ref: !0, __self: !0, __source: !0 };
function xa(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) Kf.call(t, r) && !Gf.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Qf, type: e, key: o, ref: i, props: l, _owner: Yf.current };
}
ro.Fragment = Xf;
ro.jsx = xa;
ro.jsxs = xa;
aa.exports = ro;
var m = aa.exports, wa = { exports: {} }, He = {}, Sa = { exports: {} }, ka = {};
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
  function t(L, F) {
    var $ = L.length;
    L.push(F);
    e: for (; 0 < $; ) {
      var V = $ - 1 >>> 1, re = L[V];
      if (0 < l(re, F)) L[V] = F, L[$] = re, $ = V;
      else break e;
    }
  }
  function n(L) {
    return L.length === 0 ? null : L[0];
  }
  function r(L) {
    if (L.length === 0) return null;
    var F = L[0], $ = L.pop();
    if ($ !== F) {
      L[0] = $;
      e: for (var V = 0, re = L.length, nt = re >>> 1; V < nt; ) {
        var Q = 2 * (V + 1) - 1, Qe = L[Q], Lt = Q + 1, mt = L[Lt];
        if (0 > l(Qe, $)) Lt < re && 0 > l(mt, Qe) ? (L[V] = mt, L[Lt] = $, V = Lt) : (L[V] = Qe, L[Q] = $, V = Q);
        else if (Lt < re && 0 > l(mt, $)) L[V] = mt, L[Lt] = $, V = Lt;
        else break e;
      }
    }
    return F;
  }
  function l(L, F) {
    var $ = L.sortIndex - F.sortIndex;
    return $ !== 0 ? $ : L.id - F.id;
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
  var u = [], c = [], g = 1, p = null, h = 3, S = !1, k = !1, y = !1, O = typeof setTimeout == "function" ? setTimeout : null, d = typeof clearTimeout == "function" ? clearTimeout : null, a = typeof setImmediate != "undefined" ? setImmediate : null;
  typeof navigator != "undefined" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function f(L) {
    for (var F = n(c); F !== null; ) {
      if (F.callback === null) r(c);
      else if (F.startTime <= L) r(c), F.sortIndex = F.expirationTime, t(u, F);
      else break;
      F = n(c);
    }
  }
  function x(L) {
    if (y = !1, f(L), !k) if (n(u) !== null) k = !0, Re(C);
    else {
      var F = n(c);
      F !== null && Me(x, F.startTime - L);
    }
  }
  function C(L, F) {
    k = !1, y && (y = !1, d(T), T = -1), S = !0;
    var $ = h;
    try {
      for (f(F), p = n(u); p !== null && (!(p.expirationTime > F) || L && !ae()); ) {
        var V = p.callback;
        if (typeof V == "function") {
          p.callback = null, h = p.priorityLevel;
          var re = V(p.expirationTime <= F);
          F = e.unstable_now(), typeof re == "function" ? p.callback = re : p === n(u) && r(u), f(F);
        } else r(u);
        p = n(u);
      }
      if (p !== null) var nt = !0;
      else {
        var Q = n(c);
        Q !== null && Me(x, Q.startTime - F), nt = !1;
      }
      return nt;
    } finally {
      p = null, h = $, S = !1;
    }
  }
  var z = !1, j = null, T = -1, Y = 5, A = -1;
  function ae() {
    return !(e.unstable_now() - A < Y);
  }
  function en() {
    if (j !== null) {
      var L = e.unstable_now();
      A = L;
      var F = !0;
      try {
        F = j(!0, L);
      } finally {
        F ? tn() : (z = !1, j = null);
      }
    } else z = !1;
  }
  var tn;
  if (typeof a == "function") tn = function() {
    a(en);
  };
  else if (typeof MessageChannel != "undefined") {
    var wo = new MessageChannel(), se = wo.port2;
    wo.port1.onmessage = en, tn = function() {
      se.postMessage(null);
    };
  } else tn = function() {
    O(en, 0);
  };
  function Re(L) {
    j = L, z || (z = !0, tn());
  }
  function Me(L, F) {
    T = O(function() {
      L(e.unstable_now());
    }, F);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(L) {
    L.callback = null;
  }, e.unstable_continueExecution = function() {
    k || S || (k = !0, Re(C));
  }, e.unstable_forceFrameRate = function(L) {
    0 > L || 125 < L ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Y = 0 < L ? Math.floor(1e3 / L) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(L) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var F = 3;
        break;
      default:
        F = h;
    }
    var $ = h;
    h = F;
    try {
      return L();
    } finally {
      h = $;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(L, F) {
    switch (L) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        L = 3;
    }
    var $ = h;
    h = L;
    try {
      return F();
    } finally {
      h = $;
    }
  }, e.unstable_scheduleCallback = function(L, F, $) {
    var V = e.unstable_now();
    switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? V + $ : V) : $ = V, L) {
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
    return re = $ + re, L = { id: g++, callback: F, priorityLevel: L, startTime: $, expirationTime: re, sortIndex: -1 }, $ > V ? (L.sortIndex = $, t(c, L), n(u) === null && L === n(c) && (y ? (d(T), T = -1) : y = !0, Me(x, $ - V))) : (L.sortIndex = re, t(u, L), k || S || (k = !0, Re(C))), L;
  }, e.unstable_shouldYield = ae, e.unstable_wrapCallback = function(L) {
    var F = h;
    return function() {
      var $ = h;
      h = F;
      try {
        return L.apply(this, arguments);
      } finally {
        h = $;
      }
    };
  };
})(ka);
Sa.exports = ka;
var Jf = Sa.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zf = N, We = Jf;
function E(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Ea = /* @__PURE__ */ new Set(), Nr = {};
function Sn(e, t) {
  Kn(e, t), Kn(e + "Capture", t);
}
function Kn(e, t) {
  for (Nr[e] = t, e = 0; e < t.length; e++) Ea.add(t[e]);
}
var Ct = !(typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined"), ti = Object.prototype.hasOwnProperty, qf = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, bs = {}, eu = {};
function bf(e) {
  return ti.call(eu, e) ? !0 : ti.call(bs, e) ? !1 : qf.test(e) ? eu[e] = !0 : (bs[e] = !0, !1);
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
function je(e, t, n, r, l, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
var ke = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ke[e] = new je(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ke[t] = new je(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ke[e] = new je(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ke[e] = new je(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ke[e] = new je(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ke[e] = new je(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ke[e] = new je(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ke[e] = new je(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ke[e] = new je(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Zi = /[\-:]([a-z])/g;
function qi(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Zi,
    qi
  );
  ke[t] = new je(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Zi, qi);
  ke[t] = new je(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Zi, qi);
  ke[t] = new je(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ke[e] = new je(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ke.xlinkHref = new je("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ke[e] = new je(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function bi(e, t, n, r) {
  var l = ke.hasOwnProperty(t) ? ke[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (td(t, n, l, r) && (n = null), r || l === null ? bf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var zt = Zf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ol = Symbol.for("react.element"), Ln = Symbol.for("react.portal"), Pn = Symbol.for("react.fragment"), es = Symbol.for("react.strict_mode"), ni = Symbol.for("react.profiler"), Ca = Symbol.for("react.provider"), _a = Symbol.for("react.context"), ts = Symbol.for("react.forward_ref"), ri = Symbol.for("react.suspense"), li = Symbol.for("react.suspense_list"), ns = Symbol.for("react.memo"), Ot = Symbol.for("react.lazy"), Na = Symbol.for("react.offscreen"), tu = Symbol.iterator;
function or(e) {
  return e === null || typeof e != "object" ? null : (e = tu && e[tu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ne = Object.assign, Lo;
function pr(e) {
  if (Lo === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Lo = t && t[1] || "";
  }
  return `
` + Lo + e;
}
var Po = !1;
function jo(e, t) {
  if (!e || Po) return "";
  Po = !0;
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
    Po = !1, Error.prepareStackTrace = n;
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
      return e = jo(e.type, !1), e;
    case 11:
      return e = jo(e.type.render, !1), e;
    case 1:
      return e = jo(e.type, !0), e;
    default:
      return "";
  }
}
function oi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Pn:
      return "Fragment";
    case Ln:
      return "Portal";
    case ni:
      return "Profiler";
    case es:
      return "StrictMode";
    case ri:
      return "Suspense";
    case li:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case _a:
      return (e.displayName || "Context") + ".Consumer";
    case Ca:
      return (e._context.displayName || "Context") + ".Provider";
    case ts:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case ns:
      return t = e.displayName || null, t !== null ? t : oi(e.type) || "Memo";
    case Ot:
      t = e._payload, e = e._init;
      try {
        return oi(e(t));
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
      return oi(t);
    case 8:
      return t === es ? "StrictMode" : "Mode";
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
function Ta(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function ld(e) {
  var t = Ta(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function za(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Ta(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Ml(e) {
  if (e = e || (typeof document != "undefined" ? document : void 0), typeof e == "undefined") return null;
  try {
    return e.activeElement || e.body;
  } catch (t) {
    return e.body;
  }
}
function ii(e, t) {
  var n = t.checked;
  return ne({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n != null ? n : e._wrapperState.initialChecked });
}
function nu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = Gt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function La(e, t) {
  t = t.checked, t != null && bi(e, "checked", t, !1);
}
function si(e, t) {
  La(e, t);
  var n = Gt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? ui(e, t.type, n) : t.hasOwnProperty("defaultValue") && ui(e, t.type, Gt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function ru(e, t, n) {
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
function Bn(e, t, n, r) {
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
function ai(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(E(91));
  return ne({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function lu(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(E(92));
      if (hr(n)) {
        if (1 < n.length) throw Error(E(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: Gt(n) };
}
function Pa(e, t) {
  var n = Gt(t.value), r = Gt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function ou(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function ja(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ci(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? ja(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var sl, Ra = function(e) {
  return typeof MSApp != "undefined" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (sl = sl || document.createElement("div"), sl.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = sl.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
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
function Ma(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || yr.hasOwnProperty(e) && yr[e] ? ("" + t).trim() : t + "px";
}
function Ia(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Ma(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var id = ne({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function fi(e, t) {
  if (t) {
    if (id[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(E(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(E(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(E(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(E(62));
  }
}
function di(e, t) {
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
var pi = null;
function rs(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var hi = null, Wn = null, Hn = null;
function iu(e) {
  if (e = Xr(e)) {
    if (typeof hi != "function") throw Error(E(280));
    var t = e.stateNode;
    t && (t = uo(t), hi(e.stateNode, e.type, t));
  }
}
function Oa(e) {
  Wn ? Hn ? Hn.push(e) : Hn = [e] : Wn = e;
}
function Da() {
  if (Wn) {
    var e = Wn, t = Hn;
    if (Hn = Wn = null, iu(e), t) for (e = 0; e < t.length; e++) iu(t[e]);
  }
}
function $a(e, t) {
  return e(t);
}
function Fa() {
}
var Ro = !1;
function Aa(e, t, n) {
  if (Ro) return e(t, n);
  Ro = !0;
  try {
    return $a(e, t, n);
  } finally {
    Ro = !1, (Wn !== null || Hn !== null) && (Fa(), Da());
  }
}
function zr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = uo(n);
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
  if (n && typeof n != "function") throw Error(E(231, t, typeof n));
  return n;
}
var mi = !1;
if (Ct) try {
  var ir = {};
  Object.defineProperty(ir, "passive", { get: function() {
    mi = !0;
  } }), window.addEventListener("test", ir, ir), window.removeEventListener("test", ir, ir);
} catch (e) {
  mi = !1;
}
function sd(e, t, n, r, l, o, i, s, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (g) {
    this.onError(g);
  }
}
var vr = !1, Il = null, Ol = !1, gi = null, ud = { onError: function(e) {
  vr = !0, Il = e;
} };
function ad(e, t, n, r, l, o, i, s, u) {
  vr = !1, Il = null, sd.apply(ud, arguments);
}
function cd(e, t, n, r, l, o, i, s, u) {
  if (ad.apply(this, arguments), vr) {
    if (vr) {
      var c = Il;
      vr = !1, Il = null;
    } else throw Error(E(198));
    Ol || (Ol = !0, gi = c);
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
function su(e) {
  if (kn(e) !== e) throw Error(E(188));
}
function fd(e) {
  var t = e.alternate;
  if (!t) {
    if (t = kn(e), t === null) throw Error(E(188));
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
        if (o === n) return su(l), e;
        if (o === r) return su(l), t;
        o = o.sibling;
      }
      throw Error(E(188));
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
        if (!i) throw Error(E(189));
      }
    }
    if (n.alternate !== r) throw Error(E(190));
  }
  if (n.tag !== 3) throw Error(E(188));
  return n.stateNode.current === n ? e : t;
}
function Ba(e) {
  return e = fd(e), e !== null ? Wa(e) : null;
}
function Wa(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Wa(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Ha = We.unstable_scheduleCallback, uu = We.unstable_cancelCallback, dd = We.unstable_shouldYield, pd = We.unstable_requestPaint, ue = We.unstable_now, hd = We.unstable_getCurrentPriorityLevel, ls = We.unstable_ImmediatePriority, Va = We.unstable_UserBlockingPriority, Dl = We.unstable_NormalPriority, md = We.unstable_LowPriority, Qa = We.unstable_IdlePriority, lo = null, pt = null;
function gd(e) {
  if (pt && typeof pt.onCommitFiberRoot == "function") try {
    pt.onCommitFiberRoot(lo, e, void 0, (e.current.flags & 128) === 128);
  } catch (t) {
  }
}
var st = Math.clz32 ? Math.clz32 : xd, yd = Math.log, vd = Math.LN2;
function xd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (yd(e) / vd | 0) | 0;
}
var ul = 64, al = 4194304;
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
function $l(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var s = i & ~l;
    s !== 0 ? r = mr(s) : (o &= i, o !== 0 && (r = mr(o)));
  } else i = n & ~l, i !== 0 ? r = mr(i) : o !== 0 && (r = mr(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - st(t), l = 1 << n, r |= e[n], t &= ~l;
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
    var i = 31 - st(o), s = 1 << i, u = l[i];
    u === -1 ? (!(s & n) || s & r) && (l[i] = wd(s, t)) : u <= t && (e.expiredLanes |= s), o &= ~s;
  }
}
function yi(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Xa() {
  var e = ul;
  return ul <<= 1, !(ul & 4194240) && (ul = 64), e;
}
function Mo(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Vr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - st(t), e[t] = n;
}
function kd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - st(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function os(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - st(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var K = 0;
function Ka(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Ya, is, Ga, Ja, Za, vi = !1, cl = [], Bt = null, Wt = null, Ht = null, Lr = /* @__PURE__ */ new Map(), Pr = /* @__PURE__ */ new Map(), $t = [], Ed = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function au(e, t) {
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
      Lr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pr.delete(t.pointerId);
  }
}
function sr(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = Xr(t), t !== null && is(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Cd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return Bt = sr(Bt, e, t, n, r, l), !0;
    case "dragenter":
      return Wt = sr(Wt, e, t, n, r, l), !0;
    case "mouseover":
      return Ht = sr(Ht, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Lr.set(o, sr(Lr.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Pr.set(o, sr(Pr.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function qa(e) {
  var t = fn(e.target);
  if (t !== null) {
    var n = kn(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ua(n), t !== null) {
          e.blockedOn = t, Za(e.priority, function() {
            Ga(n);
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
    var n = xi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      pi = r, n.target.dispatchEvent(r), pi = null;
    } else return t = Xr(n), t !== null && is(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function cu(e, t, n) {
  El(e) && n.delete(t);
}
function _d() {
  vi = !1, Bt !== null && El(Bt) && (Bt = null), Wt !== null && El(Wt) && (Wt = null), Ht !== null && El(Ht) && (Ht = null), Lr.forEach(cu), Pr.forEach(cu);
}
function ur(e, t) {
  e.blockedOn === t && (e.blockedOn = null, vi || (vi = !0, We.unstable_scheduleCallback(We.unstable_NormalPriority, _d)));
}
function jr(e) {
  function t(l) {
    return ur(l, e);
  }
  if (0 < cl.length) {
    ur(cl[0], e);
    for (var n = 1; n < cl.length; n++) {
      var r = cl[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (Bt !== null && ur(Bt, e), Wt !== null && ur(Wt, e), Ht !== null && ur(Ht, e), Lr.forEach(t), Pr.forEach(t), n = 0; n < $t.length; n++) r = $t[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < $t.length && (n = $t[0], n.blockedOn === null); ) qa(n), n.blockedOn === null && $t.shift();
}
var Vn = zt.ReactCurrentBatchConfig, Fl = !0;
function Nd(e, t, n, r) {
  var l = K, o = Vn.transition;
  Vn.transition = null;
  try {
    K = 1, ss(e, t, n, r);
  } finally {
    K = l, Vn.transition = o;
  }
}
function Td(e, t, n, r) {
  var l = K, o = Vn.transition;
  Vn.transition = null;
  try {
    K = 4, ss(e, t, n, r);
  } finally {
    K = l, Vn.transition = o;
  }
}
function ss(e, t, n, r) {
  if (Fl) {
    var l = xi(e, t, n, r);
    if (l === null) Ho(e, t, r, Al, n), au(e, r);
    else if (Cd(l, e, t, n, r)) r.stopPropagation();
    else if (au(e, r), t & 4 && -1 < Ed.indexOf(e)) {
      for (; l !== null; ) {
        var o = Xr(l);
        if (o !== null && Ya(o), o = xi(e, t, n, r), o === null && Ho(e, t, r, Al, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Ho(e, t, r, null, n);
  }
}
var Al = null;
function xi(e, t, n, r) {
  if (Al = null, e = rs(r), e = fn(e), e !== null) if (t = kn(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Ua(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Al = e, null;
}
function ba(e) {
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
        case ls:
          return 1;
        case Va:
          return 4;
        case Dl:
        case md:
          return 16;
        case Qa:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var At = null, us = null, Cl = null;
function ec() {
  if (Cl) return Cl;
  var e, t = us, n = t.length, r, l = "value" in At ? At.value : At.textContent, o = l.length;
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
function fu() {
  return !1;
}
function Ve(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(o) : o[s]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? fl : fu, this.isPropagationStopped = fu, this;
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
var tr = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, as = Ve(tr), Qr = ne({}, tr, { view: 0, detail: 0 }), zd = Ve(Qr), Io, Oo, ar, oo = ne({}, Qr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: cs, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== ar && (ar && e.type === "mousemove" ? (Io = e.screenX - ar.screenX, Oo = e.screenY - ar.screenY) : Oo = Io = 0, ar = e), Io);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Oo;
} }), du = Ve(oo), Ld = ne({}, oo, { dataTransfer: 0 }), Pd = Ve(Ld), jd = ne({}, Qr, { relatedTarget: 0 }), Do = Ve(jd), Rd = ne({}, tr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Md = Ve(Rd), Id = ne({}, tr, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Od = Ve(Id), Dd = ne({}, tr, { data: 0 }), pu = Ve(Dd), $d = {
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
}, Fd = {
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
}, Ad = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Ud(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Ad[e]) ? !!t[e] : !1;
}
function cs() {
  return Ud;
}
var Bd = ne({}, Qr, { key: function(e) {
  if (e.key) {
    var t = $d[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = _l(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Fd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: cs, charCode: function(e) {
  return e.type === "keypress" ? _l(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? _l(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Wd = Ve(Bd), Hd = ne({}, oo, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), hu = Ve(Hd), Vd = ne({}, Qr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: cs }), Qd = Ve(Vd), Xd = ne({}, tr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Kd = Ve(Xd), Yd = ne({}, oo, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Gd = Ve(Yd), Jd = [9, 13, 27, 32], fs = Ct && "CompositionEvent" in window, xr = null;
Ct && "documentMode" in document && (xr = document.documentMode);
var Zd = Ct && "TextEvent" in window && !xr, tc = Ct && (!fs || xr && 8 < xr && 11 >= xr), mu = " ", gu = !1;
function nc(e, t) {
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
function rc(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var jn = !1;
function qd(e, t) {
  switch (e) {
    case "compositionend":
      return rc(t);
    case "keypress":
      return t.which !== 32 ? null : (gu = !0, mu);
    case "textInput":
      return e = t.data, e === mu && gu ? null : e;
    default:
      return null;
  }
}
function bd(e, t) {
  if (jn) return e === "compositionend" || !fs && nc(e, t) ? (e = ec(), Cl = us = At = null, jn = !1, e) : null;
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
      return tc && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var ep = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function yu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!ep[e.type] : t === "textarea";
}
function lc(e, t, n, r) {
  Oa(r), t = Ul(t, "onChange"), 0 < t.length && (n = new as("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var wr = null, Rr = null;
function tp(e) {
  mc(e, 0);
}
function io(e) {
  var t = In(e);
  if (za(t)) return e;
}
function np(e, t) {
  if (e === "change") return t;
}
var oc = !1;
if (Ct) {
  var $o;
  if (Ct) {
    var Fo = "oninput" in document;
    if (!Fo) {
      var vu = document.createElement("div");
      vu.setAttribute("oninput", "return;"), Fo = typeof vu.oninput == "function";
    }
    $o = Fo;
  } else $o = !1;
  oc = $o && (!document.documentMode || 9 < document.documentMode);
}
function xu() {
  wr && (wr.detachEvent("onpropertychange", ic), Rr = wr = null);
}
function ic(e) {
  if (e.propertyName === "value" && io(Rr)) {
    var t = [];
    lc(t, Rr, e, rs(e)), Aa(tp, t);
  }
}
function rp(e, t, n) {
  e === "focusin" ? (xu(), wr = t, Rr = n, wr.attachEvent("onpropertychange", ic)) : e === "focusout" && xu();
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
function sp(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var at = typeof Object.is == "function" ? Object.is : sp;
function Mr(e, t) {
  if (at(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ti.call(t, l) || !at(e[l], t[l])) return !1;
  }
  return !0;
}
function wu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Su(e, t) {
  var n = wu(e);
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
    n = wu(n);
  }
}
function sc(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? sc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
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
function ds(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function up(e) {
  var t = uc(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && sc(n.ownerDocument.documentElement, n)) {
    if (r !== null && ds(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = Su(n, o);
        var i = Su(
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
var ap = Ct && "documentMode" in document && 11 >= document.documentMode, Rn = null, wi = null, Sr = null, Si = !1;
function ku(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Si || Rn == null || Rn !== Ml(r) || (r = Rn, "selectionStart" in r && ds(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Sr && Mr(Sr, r) || (Sr = r, r = Ul(wi, "onSelect"), 0 < r.length && (t = new as("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Rn)));
}
function dl(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Mn = { animationend: dl("Animation", "AnimationEnd"), animationiteration: dl("Animation", "AnimationIteration"), animationstart: dl("Animation", "AnimationStart"), transitionend: dl("Transition", "TransitionEnd") }, Ao = {}, ac = {};
Ct && (ac = document.createElement("div").style, "AnimationEvent" in window || (delete Mn.animationend.animation, delete Mn.animationiteration.animation, delete Mn.animationstart.animation), "TransitionEvent" in window || delete Mn.transitionend.transition);
function so(e) {
  if (Ao[e]) return Ao[e];
  if (!Mn[e]) return e;
  var t = Mn[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in ac) return Ao[e] = t[n];
  return e;
}
var cc = so("animationend"), fc = so("animationiteration"), dc = so("animationstart"), pc = so("transitionend"), hc = /* @__PURE__ */ new Map(), Eu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Zt(e, t) {
  hc.set(e, t), Sn(t, [e]);
}
for (var Uo = 0; Uo < Eu.length; Uo++) {
  var Bo = Eu[Uo], cp = Bo.toLowerCase(), fp = Bo[0].toUpperCase() + Bo.slice(1);
  Zt(cp, "on" + fp);
}
Zt(cc, "onAnimationEnd");
Zt(fc, "onAnimationIteration");
Zt(dc, "onAnimationStart");
Zt("dblclick", "onDoubleClick");
Zt("focusin", "onFocus");
Zt("focusout", "onBlur");
Zt(pc, "onTransitionEnd");
Kn("onMouseEnter", ["mouseout", "mouseover"]);
Kn("onMouseLeave", ["mouseout", "mouseover"]);
Kn("onPointerEnter", ["pointerout", "pointerover"]);
Kn("onPointerLeave", ["pointerout", "pointerover"]);
Sn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Sn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Sn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Sn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Sn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Sn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var gr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), dp = new Set("cancel close invalid load scroll toggle".split(" ").concat(gr));
function Cu(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, cd(r, t, void 0, e), e.currentTarget = null;
}
function mc(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var s = r[i], u = s.instance, c = s.currentTarget;
        if (s = s.listener, u !== o && l.isPropagationStopped()) break e;
        Cu(l, s, c), o = u;
      }
      else for (i = 0; i < r.length; i++) {
        if (s = r[i], u = s.instance, c = s.currentTarget, s = s.listener, u !== o && l.isPropagationStopped()) break e;
        Cu(l, s, c), o = u;
      }
    }
  }
  if (Ol) throw e = gi, Ol = !1, gi = null, e;
}
function Z(e, t) {
  var n = t[Ni];
  n === void 0 && (n = t[Ni] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (gc(t, e, 2, !1), n.add(r));
}
function Wo(e, t, n) {
  var r = 0;
  t && (r |= 4), gc(n, e, r, t);
}
var pl = "_reactListening" + Math.random().toString(36).slice(2);
function Ir(e) {
  if (!e[pl]) {
    e[pl] = !0, Ea.forEach(function(n) {
      n !== "selectionchange" && (dp.has(n) || Wo(n, !1, e), Wo(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[pl] || (t[pl] = !0, Wo("selectionchange", !1, t));
  }
}
function gc(e, t, n, r) {
  switch (ba(t)) {
    case 1:
      var l = Nd;
      break;
    case 4:
      l = Td;
      break;
    default:
      l = ss;
  }
  n = l.bind(null, t, n, e), l = void 0, !mi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Ho(e, t, n, r, l) {
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
        if (i = fn(s), i === null) return;
        if (u = i.tag, u === 5 || u === 6) {
          r = o = i;
          continue e;
        }
        s = s.parentNode;
      }
    }
    r = r.return;
  }
  Aa(function() {
    var c = o, g = rs(n), p = [];
    e: {
      var h = hc.get(e);
      if (h !== void 0) {
        var S = as, k = e;
        switch (e) {
          case "keypress":
            if (_l(n) === 0) break e;
          case "keydown":
          case "keyup":
            S = Wd;
            break;
          case "focusin":
            k = "focus", S = Do;
            break;
          case "focusout":
            k = "blur", S = Do;
            break;
          case "beforeblur":
          case "afterblur":
            S = Do;
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
            S = du;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            S = Pd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            S = Qd;
            break;
          case cc:
          case fc:
          case dc:
            S = Md;
            break;
          case pc:
            S = Kd;
            break;
          case "scroll":
            S = zd;
            break;
          case "wheel":
            S = Gd;
            break;
          case "copy":
          case "cut":
          case "paste":
            S = Od;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            S = hu;
        }
        var y = (t & 4) !== 0, O = !y && e === "scroll", d = y ? h !== null ? h + "Capture" : null : h;
        y = [];
        for (var a = c, f; a !== null; ) {
          f = a;
          var x = f.stateNode;
          if (f.tag === 5 && x !== null && (f = x, d !== null && (x = zr(a, d), x != null && y.push(Or(a, x, f)))), O) break;
          a = a.return;
        }
        0 < y.length && (h = new S(h, k, null, n, g), p.push({ event: h, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", S = e === "mouseout" || e === "pointerout", h && n !== pi && (k = n.relatedTarget || n.fromElement) && (fn(k) || k[_t])) break e;
        if ((S || h) && (h = g.window === g ? g : (h = g.ownerDocument) ? h.defaultView || h.parentWindow : window, S ? (k = n.relatedTarget || n.toElement, S = c, k = k ? fn(k) : null, k !== null && (O = kn(k), k !== O || k.tag !== 5 && k.tag !== 6) && (k = null)) : (S = null, k = c), S !== k)) {
          if (y = du, x = "onMouseLeave", d = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (y = hu, x = "onPointerLeave", d = "onPointerEnter", a = "pointer"), O = S == null ? h : In(S), f = k == null ? h : In(k), h = new y(x, a + "leave", S, n, g), h.target = O, h.relatedTarget = f, x = null, fn(g) === c && (y = new y(d, a + "enter", k, n, g), y.target = f, y.relatedTarget = O, x = y), O = x, S && k) t: {
            for (y = S, d = k, a = 0, f = y; f; f = zn(f)) a++;
            for (f = 0, x = d; x; x = zn(x)) f++;
            for (; 0 < a - f; ) y = zn(y), a--;
            for (; 0 < f - a; ) d = zn(d), f--;
            for (; a--; ) {
              if (y === d || d !== null && y === d.alternate) break t;
              y = zn(y), d = zn(d);
            }
            y = null;
          }
          else y = null;
          S !== null && _u(p, h, S, y, !1), k !== null && O !== null && _u(p, O, k, y, !0);
        }
      }
      e: {
        if (h = c ? In(c) : window, S = h.nodeName && h.nodeName.toLowerCase(), S === "select" || S === "input" && h.type === "file") var C = np;
        else if (yu(h)) if (oc) C = ip;
        else {
          C = lp;
          var z = rp;
        }
        else (S = h.nodeName) && S.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (C = op);
        if (C && (C = C(e, c))) {
          lc(p, C, n, g);
          break e;
        }
        z && z(e, h, c), e === "focusout" && (z = h._wrapperState) && z.controlled && h.type === "number" && ui(h, "number", h.value);
      }
      switch (z = c ? In(c) : window, e) {
        case "focusin":
          (yu(z) || z.contentEditable === "true") && (Rn = z, wi = c, Sr = null);
          break;
        case "focusout":
          Sr = wi = Rn = null;
          break;
        case "mousedown":
          Si = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Si = !1, ku(p, n, g);
          break;
        case "selectionchange":
          if (ap) break;
        case "keydown":
        case "keyup":
          ku(p, n, g);
      }
      var j;
      if (fs) e: {
        switch (e) {
          case "compositionstart":
            var T = "onCompositionStart";
            break e;
          case "compositionend":
            T = "onCompositionEnd";
            break e;
          case "compositionupdate":
            T = "onCompositionUpdate";
            break e;
        }
        T = void 0;
      }
      else jn ? nc(e, n) && (T = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
      T && (tc && n.locale !== "ko" && (jn || T !== "onCompositionStart" ? T === "onCompositionEnd" && jn && (j = ec()) : (At = g, us = "value" in At ? At.value : At.textContent, jn = !0)), z = Ul(c, T), 0 < z.length && (T = new pu(T, e, null, n, g), p.push({ event: T, listeners: z }), j ? T.data = j : (j = rc(n), j !== null && (T.data = j)))), (j = Zd ? qd(e, n) : bd(e, n)) && (c = Ul(c, "onBeforeInput"), 0 < c.length && (g = new pu("onBeforeInput", "beforeinput", null, n, g), p.push({ event: g, listeners: c }), g.data = j));
    }
    mc(p, t);
  });
}
function Or(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Ul(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = zr(e, n), o != null && r.unshift(Or(e, o, l)), o = zr(e, t), o != null && r.push(Or(e, o, l))), e = e.return;
  }
  return r;
}
function zn(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function _u(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var s = n, u = s.alternate, c = s.stateNode;
    if (u !== null && u === r) break;
    s.tag === 5 && c !== null && (s = c, l ? (u = zr(n, o), u != null && i.unshift(Or(n, u, s))) : l || (u = zr(n, o), u != null && i.push(Or(n, u, s)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var pp = /\r\n?/g, hp = /\u0000|\uFFFD/g;
function Nu(e) {
  return (typeof e == "string" ? e : "" + e).replace(pp, `
`).replace(hp, "");
}
function hl(e, t, n) {
  if (t = Nu(t), Nu(e) !== t && n) throw Error(E(425));
}
function Bl() {
}
var ki = null, Ei = null;
function Ci(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var _i = typeof setTimeout == "function" ? setTimeout : void 0, mp = typeof clearTimeout == "function" ? clearTimeout : void 0, Tu = typeof Promise == "function" ? Promise : void 0, gp = typeof queueMicrotask == "function" ? queueMicrotask : typeof Tu != "undefined" ? function(e) {
  return Tu.resolve(null).then(e).catch(yp);
} : _i;
function yp(e) {
  setTimeout(function() {
    throw e;
  });
}
function Vo(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), jr(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  jr(t);
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
function zu(e) {
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
var nr = Math.random().toString(36).slice(2), dt = "__reactFiber$" + nr, Dr = "__reactProps$" + nr, _t = "__reactContainer$" + nr, Ni = "__reactEvents$" + nr, vp = "__reactListeners$" + nr, xp = "__reactHandles$" + nr;
function fn(e) {
  var t = e[dt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[_t] || n[dt]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = zu(e); e !== null; ) {
        if (n = e[dt]) return n;
        e = zu(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Xr(e) {
  return e = e[dt] || e[_t], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function In(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(E(33));
}
function uo(e) {
  return e[Dr] || null;
}
var Ti = [], On = -1;
function qt(e) {
  return { current: e };
}
function q(e) {
  0 > On || (e.current = Ti[On], Ti[On] = null, On--);
}
function G(e, t) {
  On++, Ti[On] = e.current, e.current = t;
}
var Jt = {}, Te = qt(Jt), De = qt(!1), gn = Jt;
function Yn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Jt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function $e(e) {
  return e = e.childContextTypes, e != null;
}
function Wl() {
  q(De), q(Te);
}
function Lu(e, t, n) {
  if (Te.current !== Jt) throw Error(E(168));
  G(Te, t), G(De, n);
}
function yc(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(E(108, rd(e) || "Unknown", l));
  return ne({}, n, r);
}
function Hl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Jt, gn = Te.current, G(Te, e), G(De, De.current), !0;
}
function Pu(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(E(169));
  n ? (e = yc(e, t, gn), r.__reactInternalMemoizedMergedChildContext = e, q(De), q(Te), G(Te, e)) : q(De), G(De, n);
}
var wt = null, ao = !1, Qo = !1;
function vc(e) {
  wt === null ? wt = [e] : wt.push(e);
}
function wp(e) {
  ao = !0, vc(e);
}
function bt() {
  if (!Qo && wt !== null) {
    Qo = !0;
    var e = 0, t = K;
    try {
      var n = wt;
      for (K = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      wt = null, ao = !1;
    } catch (l) {
      throw wt !== null && (wt = wt.slice(e + 1)), Ha(ls, bt), l;
    } finally {
      K = t, Qo = !1;
    }
  }
  return null;
}
var Dn = [], $n = 0, Vl = null, Ql = 0, Je = [], Ze = 0, yn = null, St = 1, kt = "";
function an(e, t) {
  Dn[$n++] = Ql, Dn[$n++] = Vl, Vl = e, Ql = t;
}
function xc(e, t, n) {
  Je[Ze++] = St, Je[Ze++] = kt, Je[Ze++] = yn, yn = e;
  var r = St;
  e = kt;
  var l = 32 - st(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - st(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, St = 1 << 32 - st(t) + l | n << l | r, kt = o + e;
  } else St = 1 << o | n << l | r, kt = e;
}
function ps(e) {
  e.return !== null && (an(e, 1), xc(e, 1, 0));
}
function hs(e) {
  for (; e === Vl; ) Vl = Dn[--$n], Dn[$n] = null, Ql = Dn[--$n], Dn[$n] = null;
  for (; e === yn; ) yn = Je[--Ze], Je[Ze] = null, kt = Je[--Ze], Je[Ze] = null, St = Je[--Ze], Je[Ze] = null;
}
var Be = null, Ue = null, b = !1, it = null;
function wc(e, t) {
  var n = qe(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function ju(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Be = e, Ue = Vt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Be = e, Ue = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = yn !== null ? { id: St, overflow: kt } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = qe(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Be = e, Ue = null, !0) : !1;
    default:
      return !1;
  }
}
function zi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Li(e) {
  if (b) {
    var t = Ue;
    if (t) {
      var n = t;
      if (!ju(e, t)) {
        if (zi(e)) throw Error(E(418));
        t = Vt(n.nextSibling);
        var r = Be;
        t && ju(e, t) ? wc(r, n) : (e.flags = e.flags & -4097 | 2, b = !1, Be = e);
      }
    } else {
      if (zi(e)) throw Error(E(418));
      e.flags = e.flags & -4097 | 2, b = !1, Be = e;
    }
  }
}
function Ru(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Be = e;
}
function ml(e) {
  if (e !== Be) return !1;
  if (!b) return Ru(e), b = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ci(e.type, e.memoizedProps)), t && (t = Ue)) {
    if (zi(e)) throw Sc(), Error(E(418));
    for (; t; ) wc(e, t), t = Vt(t.nextSibling);
  }
  if (Ru(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(E(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ue = Vt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Ue = null;
    }
  } else Ue = Be ? Vt(e.stateNode.nextSibling) : null;
  return !0;
}
function Sc() {
  for (var e = Ue; e; ) e = Vt(e.nextSibling);
}
function Gn() {
  Ue = Be = null, b = !1;
}
function ms(e) {
  it === null ? it = [e] : it.push(e);
}
var Sp = zt.ReactCurrentBatchConfig;
function cr(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(E(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(E(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var s = l.refs;
        i === null ? delete s[o] : s[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(E(284));
    if (!n._owner) throw Error(E(290, e));
  }
  return e;
}
function gl(e, t) {
  throw e = Object.prototype.toString.call(t), Error(E(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Mu(e) {
  var t = e._init;
  return t(e._payload);
}
function kc(e) {
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
  function s(d, a, f, x) {
    return a === null || a.tag !== 6 ? (a = qo(f, d.mode, x), a.return = d, a) : (a = l(a, f), a.return = d, a);
  }
  function u(d, a, f, x) {
    var C = f.type;
    return C === Pn ? g(d, a, f.props.children, x, f.key) : a !== null && (a.elementType === C || typeof C == "object" && C !== null && C.$$typeof === Ot && Mu(C) === a.type) ? (x = l(a, f.props), x.ref = cr(d, a, f), x.return = d, x) : (x = Rl(f.type, f.key, f.props, null, d.mode, x), x.ref = cr(d, a, f), x.return = d, x);
  }
  function c(d, a, f, x) {
    return a === null || a.tag !== 4 || a.stateNode.containerInfo !== f.containerInfo || a.stateNode.implementation !== f.implementation ? (a = bo(f, d.mode, x), a.return = d, a) : (a = l(a, f.children || []), a.return = d, a);
  }
  function g(d, a, f, x, C) {
    return a === null || a.tag !== 7 ? (a = mn(f, d.mode, x, C), a.return = d, a) : (a = l(a, f), a.return = d, a);
  }
  function p(d, a, f) {
    if (typeof a == "string" && a !== "" || typeof a == "number") return a = qo("" + a, d.mode, f), a.return = d, a;
    if (typeof a == "object" && a !== null) {
      switch (a.$$typeof) {
        case ol:
          return f = Rl(a.type, a.key, a.props, null, d.mode, f), f.ref = cr(d, null, a), f.return = d, f;
        case Ln:
          return a = bo(a, d.mode, f), a.return = d, a;
        case Ot:
          var x = a._init;
          return p(d, x(a._payload), f);
      }
      if (hr(a) || or(a)) return a = mn(a, d.mode, f, null), a.return = d, a;
      gl(d, a);
    }
    return null;
  }
  function h(d, a, f, x) {
    var C = a !== null ? a.key : null;
    if (typeof f == "string" && f !== "" || typeof f == "number") return C !== null ? null : s(d, a, "" + f, x);
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case ol:
          return f.key === C ? u(d, a, f, x) : null;
        case Ln:
          return f.key === C ? c(d, a, f, x) : null;
        case Ot:
          return C = f._init, h(
            d,
            a,
            C(f._payload),
            x
          );
      }
      if (hr(f) || or(f)) return C !== null ? null : g(d, a, f, x, null);
      gl(d, f);
    }
    return null;
  }
  function S(d, a, f, x, C) {
    if (typeof x == "string" && x !== "" || typeof x == "number") return d = d.get(f) || null, s(a, d, "" + x, C);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case ol:
          return d = d.get(x.key === null ? f : x.key) || null, u(a, d, x, C);
        case Ln:
          return d = d.get(x.key === null ? f : x.key) || null, c(a, d, x, C);
        case Ot:
          var z = x._init;
          return S(d, a, f, z(x._payload), C);
      }
      if (hr(x) || or(x)) return d = d.get(f) || null, g(a, d, x, C, null);
      gl(a, x);
    }
    return null;
  }
  function k(d, a, f, x) {
    for (var C = null, z = null, j = a, T = a = 0, Y = null; j !== null && T < f.length; T++) {
      j.index > T ? (Y = j, j = null) : Y = j.sibling;
      var A = h(d, j, f[T], x);
      if (A === null) {
        j === null && (j = Y);
        break;
      }
      e && j && A.alternate === null && t(d, j), a = o(A, a, T), z === null ? C = A : z.sibling = A, z = A, j = Y;
    }
    if (T === f.length) return n(d, j), b && an(d, T), C;
    if (j === null) {
      for (; T < f.length; T++) j = p(d, f[T], x), j !== null && (a = o(j, a, T), z === null ? C = j : z.sibling = j, z = j);
      return b && an(d, T), C;
    }
    for (j = r(d, j); T < f.length; T++) Y = S(j, d, T, f[T], x), Y !== null && (e && Y.alternate !== null && j.delete(Y.key === null ? T : Y.key), a = o(Y, a, T), z === null ? C = Y : z.sibling = Y, z = Y);
    return e && j.forEach(function(ae) {
      return t(d, ae);
    }), b && an(d, T), C;
  }
  function y(d, a, f, x) {
    var C = or(f);
    if (typeof C != "function") throw Error(E(150));
    if (f = C.call(f), f == null) throw Error(E(151));
    for (var z = C = null, j = a, T = a = 0, Y = null, A = f.next(); j !== null && !A.done; T++, A = f.next()) {
      j.index > T ? (Y = j, j = null) : Y = j.sibling;
      var ae = h(d, j, A.value, x);
      if (ae === null) {
        j === null && (j = Y);
        break;
      }
      e && j && ae.alternate === null && t(d, j), a = o(ae, a, T), z === null ? C = ae : z.sibling = ae, z = ae, j = Y;
    }
    if (A.done) return n(
      d,
      j
    ), b && an(d, T), C;
    if (j === null) {
      for (; !A.done; T++, A = f.next()) A = p(d, A.value, x), A !== null && (a = o(A, a, T), z === null ? C = A : z.sibling = A, z = A);
      return b && an(d, T), C;
    }
    for (j = r(d, j); !A.done; T++, A = f.next()) A = S(j, d, T, A.value, x), A !== null && (e && A.alternate !== null && j.delete(A.key === null ? T : A.key), a = o(A, a, T), z === null ? C = A : z.sibling = A, z = A);
    return e && j.forEach(function(en) {
      return t(d, en);
    }), b && an(d, T), C;
  }
  function O(d, a, f, x) {
    if (typeof f == "object" && f !== null && f.type === Pn && f.key === null && (f = f.props.children), typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case ol:
          e: {
            for (var C = f.key, z = a; z !== null; ) {
              if (z.key === C) {
                if (C = f.type, C === Pn) {
                  if (z.tag === 7) {
                    n(d, z.sibling), a = l(z, f.props.children), a.return = d, d = a;
                    break e;
                  }
                } else if (z.elementType === C || typeof C == "object" && C !== null && C.$$typeof === Ot && Mu(C) === z.type) {
                  n(d, z.sibling), a = l(z, f.props), a.ref = cr(d, z, f), a.return = d, d = a;
                  break e;
                }
                n(d, z);
                break;
              } else t(d, z);
              z = z.sibling;
            }
            f.type === Pn ? (a = mn(f.props.children, d.mode, x, f.key), a.return = d, d = a) : (x = Rl(f.type, f.key, f.props, null, d.mode, x), x.ref = cr(d, a, f), x.return = d, d = x);
          }
          return i(d);
        case Ln:
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
            a = bo(f, d.mode, x), a.return = d, d = a;
          }
          return i(d);
        case Ot:
          return z = f._init, O(d, a, z(f._payload), x);
      }
      if (hr(f)) return k(d, a, f, x);
      if (or(f)) return y(d, a, f, x);
      gl(d, f);
    }
    return typeof f == "string" && f !== "" || typeof f == "number" ? (f = "" + f, a !== null && a.tag === 6 ? (n(d, a.sibling), a = l(a, f), a.return = d, d = a) : (n(d, a), a = qo(f, d.mode, x), a.return = d, d = a), i(d)) : n(d, a);
  }
  return O;
}
var Jn = kc(!0), Ec = kc(!1), Xl = qt(null), Kl = null, Fn = null, gs = null;
function ys() {
  gs = Fn = Kl = null;
}
function vs(e) {
  var t = Xl.current;
  q(Xl), e._currentValue = t;
}
function Pi(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Qn(e, t) {
  Kl = e, gs = Fn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Oe = !0), e.firstContext = null);
}
function et(e) {
  var t = e._currentValue;
  if (gs !== e) if (e = { context: e, memoizedValue: t, next: null }, Fn === null) {
    if (Kl === null) throw Error(E(308));
    Fn = e, Kl.dependencies = { lanes: 0, firstContext: e };
  } else Fn = Fn.next = e;
  return t;
}
var dn = null;
function xs(e) {
  dn === null ? dn = [e] : dn.push(e);
}
function Cc(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, xs(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Nt(e, r);
}
function Nt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Dt = !1;
function ws(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function _c(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Et(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Qt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, H & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Nt(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, xs(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Nt(e, n);
}
function Nl(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, os(e, n);
  }
}
function Iu(e, t) {
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
      var h = s.lane, S = s.eventTime;
      if ((r & h) === h) {
        g !== null && (g = g.next = {
          eventTime: S,
          lane: 0,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        });
        e: {
          var k = e, y = s;
          switch (h = t, S = n, y.tag) {
            case 1:
              if (k = y.payload, typeof k == "function") {
                p = k.call(S, p, h);
                break e;
              }
              p = k;
              break e;
            case 3:
              k.flags = k.flags & -65537 | 128;
            case 0:
              if (k = y.payload, h = typeof k == "function" ? k.call(S, p, h) : k, h == null) break e;
              p = ne({}, p, h);
              break e;
            case 2:
              Dt = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [s] : h.push(s));
      } else S = { eventTime: S, lane: h, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, g === null ? (c = g = S, u = p) : g = g.next = S, i |= h;
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
    xn |= i, e.lanes = i, e.memoizedState = p;
  }
}
function Ou(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(E(191, l));
      l.call(r);
    }
  }
}
var Kr = {}, ht = qt(Kr), $r = qt(Kr), Fr = qt(Kr);
function pn(e) {
  if (e === Kr) throw Error(E(174));
  return e;
}
function Ss(e, t) {
  switch (G(Fr, t), G($r, e), G(ht, Kr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ci(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = ci(t, e);
  }
  q(ht), G(ht, t);
}
function Zn() {
  q(ht), q($r), q(Fr);
}
function Nc(e) {
  pn(Fr.current);
  var t = pn(ht.current), n = ci(t, e.type);
  t !== n && (G($r, e), G(ht, n));
}
function ks(e) {
  $r.current === e && (q(ht), q($r));
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
var Xo = [];
function Es() {
  for (var e = 0; e < Xo.length; e++) Xo[e]._workInProgressVersionPrimary = null;
  Xo.length = 0;
}
var Tl = zt.ReactCurrentDispatcher, Ko = zt.ReactCurrentBatchConfig, vn = 0, te = null, he = null, ve = null, Jl = !1, kr = !1, Ar = 0, kp = 0;
function Ce() {
  throw Error(E(321));
}
function Cs(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!at(e[n], t[n])) return !1;
  return !0;
}
function _s(e, t, n, r, l, o) {
  if (vn = o, te = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Tl.current = e === null || e.memoizedState === null ? Np : Tp, e = n(r, l), kr) {
    o = 0;
    do {
      if (kr = !1, Ar = 0, 25 <= o) throw Error(E(301));
      o += 1, ve = he = null, t.updateQueue = null, Tl.current = zp, e = n(r, l);
    } while (kr);
  }
  if (Tl.current = Zl, t = he !== null && he.next !== null, vn = 0, ve = he = te = null, Jl = !1, t) throw Error(E(300));
  return e;
}
function Ns() {
  var e = Ar !== 0;
  return Ar = 0, e;
}
function ft() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ve === null ? te.memoizedState = ve = e : ve = ve.next = e, ve;
}
function tt() {
  if (he === null) {
    var e = te.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = he.next;
  var t = ve === null ? te.memoizedState : ve.next;
  if (t !== null) ve = t, he = e;
  else {
    if (e === null) throw Error(E(310));
    he = e, e = { memoizedState: he.memoizedState, baseState: he.baseState, baseQueue: he.baseQueue, queue: he.queue, next: null }, ve === null ? te.memoizedState = ve = e : ve = ve.next = e;
  }
  return ve;
}
function Ur(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Yo(e) {
  var t = tt(), n = t.queue;
  if (n === null) throw Error(E(311));
  n.lastRenderedReducer = e;
  var r = he, l = r.baseQueue, o = n.pending;
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
      if ((vn & g) === g) u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var p = {
          lane: g,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (s = u = p, i = r) : u = u.next = p, te.lanes |= g, xn |= g;
      }
      c = c.next;
    } while (c !== null && c !== o);
    u === null ? i = r : u.next = s, at(r, t.memoizedState) || (Oe = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, te.lanes |= o, xn |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Go(e) {
  var t = tt(), n = t.queue;
  if (n === null) throw Error(E(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = l = l.next;
    do
      o = e(o, i.action), i = i.next;
    while (i !== l);
    at(o, t.memoizedState) || (Oe = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function Tc() {
}
function zc(e, t) {
  var n = te, r = tt(), l = t(), o = !at(r.memoizedState, l);
  if (o && (r.memoizedState = l, Oe = !0), r = r.queue, Ts(jc.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || ve !== null && ve.memoizedState.tag & 1) {
    if (n.flags |= 2048, Br(9, Pc.bind(null, n, r, l, t), void 0, null), xe === null) throw Error(E(349));
    vn & 30 || Lc(n, t, l);
  }
  return l;
}
function Lc(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = te.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, te.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Pc(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Rc(t) && Mc(e);
}
function jc(e, t, n) {
  return n(function() {
    Rc(t) && Mc(e);
  });
}
function Rc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !at(e, n);
  } catch (r) {
    return !0;
  }
}
function Mc(e) {
  var t = Nt(e, 1);
  t !== null && ut(t, e, 1, -1);
}
function Du(e) {
  var t = ft();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ur, lastRenderedState: e }, t.queue = e, e = e.dispatch = _p.bind(null, te, e), [t.memoizedState, e];
}
function Br(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = te.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, te.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Ic() {
  return tt().memoizedState;
}
function zl(e, t, n, r) {
  var l = ft();
  te.flags |= e, l.memoizedState = Br(1 | t, n, void 0, r === void 0 ? null : r);
}
function co(e, t, n, r) {
  var l = tt();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (he !== null) {
    var i = he.memoizedState;
    if (o = i.destroy, r !== null && Cs(r, i.deps)) {
      l.memoizedState = Br(t, n, o, r);
      return;
    }
  }
  te.flags |= e, l.memoizedState = Br(1 | t, n, o, r);
}
function $u(e, t) {
  return zl(8390656, 8, e, t);
}
function Ts(e, t) {
  return co(2048, 8, e, t);
}
function Oc(e, t) {
  return co(4, 2, e, t);
}
function Dc(e, t) {
  return co(4, 4, e, t);
}
function $c(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Fc(e, t, n) {
  return n = n != null ? n.concat([e]) : null, co(4, 4, $c.bind(null, t, e), n);
}
function zs() {
}
function Ac(e, t) {
  var n = tt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Cs(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Uc(e, t) {
  var n = tt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Cs(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Bc(e, t, n) {
  return vn & 21 ? (at(n, t) || (n = Xa(), te.lanes |= n, xn |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Oe = !0), e.memoizedState = n);
}
function Ep(e, t) {
  var n = K;
  K = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Ko.transition;
  Ko.transition = {};
  try {
    e(!1), t();
  } finally {
    K = n, Ko.transition = r;
  }
}
function Wc() {
  return tt().memoizedState;
}
function Cp(e, t, n) {
  var r = Kt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Hc(e)) Vc(t, n);
  else if (n = Cc(e, t, n, r), n !== null) {
    var l = Le();
    ut(n, e, r, l), Qc(n, t, r);
  }
}
function _p(e, t, n) {
  var r = Kt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Hc(e)) Vc(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, s = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = s, at(s, i)) {
        var u = t.interleaved;
        u === null ? (l.next = l, xs(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch (c) {
    } finally {
    }
    n = Cc(e, t, l, r), n !== null && (l = Le(), ut(n, e, r, l), Qc(n, t, r));
  }
}
function Hc(e) {
  var t = e.alternate;
  return e === te || t !== null && t === te;
}
function Vc(e, t) {
  kr = Jl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Qc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, os(e, n);
  }
}
var Zl = { readContext: et, useCallback: Ce, useContext: Ce, useEffect: Ce, useImperativeHandle: Ce, useInsertionEffect: Ce, useLayoutEffect: Ce, useMemo: Ce, useReducer: Ce, useRef: Ce, useState: Ce, useDebugValue: Ce, useDeferredValue: Ce, useTransition: Ce, useMutableSource: Ce, useSyncExternalStore: Ce, useId: Ce, unstable_isNewReconciler: !1 }, Np = { readContext: et, useCallback: function(e, t) {
  return ft().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: et, useEffect: $u, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, zl(
    4194308,
    4,
    $c.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return zl(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return zl(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = ft();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = ft();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Cp.bind(null, te, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = ft();
  return e = { current: e }, t.memoizedState = e;
}, useState: Du, useDebugValue: zs, useDeferredValue: function(e) {
  return ft().memoizedState = e;
}, useTransition: function() {
  var e = Du(!1), t = e[0];
  return e = Ep.bind(null, e[1]), ft().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = te, l = ft();
  if (b) {
    if (n === void 0) throw Error(E(407));
    n = n();
  } else {
    if (n = t(), xe === null) throw Error(E(349));
    vn & 30 || Lc(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, $u(jc.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, Br(9, Pc.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = ft(), t = xe.identifierPrefix;
  if (b) {
    var n = kt, r = St;
    n = (r & ~(1 << 32 - st(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Ar++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = kp++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Tp = {
  readContext: et,
  useCallback: Ac,
  useContext: et,
  useEffect: Ts,
  useImperativeHandle: Fc,
  useInsertionEffect: Oc,
  useLayoutEffect: Dc,
  useMemo: Uc,
  useReducer: Yo,
  useRef: Ic,
  useState: function() {
    return Yo(Ur);
  },
  useDebugValue: zs,
  useDeferredValue: function(e) {
    var t = tt();
    return Bc(t, he.memoizedState, e);
  },
  useTransition: function() {
    var e = Yo(Ur)[0], t = tt().memoizedState;
    return [e, t];
  },
  useMutableSource: Tc,
  useSyncExternalStore: zc,
  useId: Wc,
  unstable_isNewReconciler: !1
}, zp = { readContext: et, useCallback: Ac, useContext: et, useEffect: Ts, useImperativeHandle: Fc, useInsertionEffect: Oc, useLayoutEffect: Dc, useMemo: Uc, useReducer: Go, useRef: Ic, useState: function() {
  return Go(Ur);
}, useDebugValue: zs, useDeferredValue: function(e) {
  var t = tt();
  return he === null ? t.memoizedState = e : Bc(t, he.memoizedState, e);
}, useTransition: function() {
  var e = Go(Ur)[0], t = tt().memoizedState;
  return [e, t];
}, useMutableSource: Tc, useSyncExternalStore: zc, useId: Wc, unstable_isNewReconciler: !1 };
function lt(e, t) {
  if (e && e.defaultProps) {
    t = ne({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function ji(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : ne({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var fo = { isMounted: function(e) {
  return (e = e._reactInternals) ? kn(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = Le(), l = Kt(e), o = Et(r, l);
  o.payload = t, n != null && (o.callback = n), t = Qt(e, o, l), t !== null && (ut(t, e, l, r), Nl(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = Le(), l = Kt(e), o = Et(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Qt(e, o, l), t !== null && (ut(t, e, l, r), Nl(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Le(), r = Kt(e), l = Et(n, r);
  l.tag = 2, t != null && (l.callback = t), t = Qt(e, l, r), t !== null && (ut(t, e, r, n), Nl(t, e, r));
} };
function Fu(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !Mr(n, r) || !Mr(l, o) : !0;
}
function Xc(e, t, n) {
  var r = !1, l = Jt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = et(o) : (l = $e(t) ? gn : Te.current, r = t.contextTypes, o = (r = r != null) ? Yn(e, l) : Jt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = fo, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Au(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && fo.enqueueReplaceState(t, t.state, null);
}
function Ri(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, ws(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = et(o) : (o = $e(t) ? gn : Te.current, l.context = Yn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (ji(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && fo.enqueueReplaceState(l, l.state, null), Yl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function qn(e, t) {
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
function Jo(e, t, n) {
  return { value: e, source: null, stack: n != null ? n : null, digest: t != null ? t : null };
}
function Mi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Lp = typeof WeakMap == "function" ? WeakMap : Map;
function Kc(e, t, n) {
  n = Et(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    bl || (bl = !0, Hi = r), Mi(e, t);
  }, n;
}
function Yc(e, t, n) {
  n = Et(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Mi(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Mi(e, t), typeof r != "function" && (Xt === null ? Xt = /* @__PURE__ */ new Set([this]) : Xt.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function Uu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Lp();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Hp.bind(null, e, t, n), t.then(e, e));
}
function Bu(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Wu(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Et(-1, 1), t.tag = 2, Qt(n, t, 1))), n.lanes |= 1), e);
}
var Pp = zt.ReactCurrentOwner, Oe = !1;
function ze(e, t, n, r) {
  t.child = e === null ? Ec(t, null, n, r) : Jn(t, e.child, n, r);
}
function Hu(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return Qn(t, l), r = _s(e, t, n, r, o, l), n = Ns(), e !== null && !Oe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Tt(e, t, l)) : (b && n && ps(t), t.flags |= 1, ze(e, t, r, l), t.child);
}
function Vu(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Ds(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Gc(e, t, o, r, l)) : (e = Rl(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Mr, n(i, r) && e.ref === t.ref) return Tt(e, t, l);
  }
  return t.flags |= 1, e = Yt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Gc(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Mr(o, r) && e.ref === t.ref) if (Oe = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Oe = !0);
    else return t.lanes = e.lanes, Tt(e, t, l);
  }
  return Ii(e, t, n, r, l);
}
function Jc(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(Un, Ae), Ae |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, G(Un, Ae), Ae |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, G(Un, Ae), Ae |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, G(Un, Ae), Ae |= r;
  return ze(e, t, l, n), t.child;
}
function Zc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Ii(e, t, n, r, l) {
  var o = $e(n) ? gn : Te.current;
  return o = Yn(t, o), Qn(t, l), n = _s(e, t, n, r, o, l), r = Ns(), e !== null && !Oe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Tt(e, t, l)) : (b && r && ps(t), t.flags |= 1, ze(e, t, n, l), t.child);
}
function Qu(e, t, n, r, l) {
  if ($e(n)) {
    var o = !0;
    Hl(t);
  } else o = !1;
  if (Qn(t, l), t.stateNode === null) Ll(e, t), Xc(t, n, r), Ri(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, s = t.memoizedProps;
    i.props = s;
    var u = i.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = et(c) : (c = $e(n) ? gn : Te.current, c = Yn(t, c));
    var g = n.getDerivedStateFromProps, p = typeof g == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    p || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== r || u !== c) && Au(t, i, r, c), Dt = !1;
    var h = t.memoizedState;
    i.state = h, Yl(t, r, i, l), u = t.memoizedState, s !== r || h !== u || De.current || Dt ? (typeof g == "function" && (ji(t, n, g, r), u = t.memoizedState), (s = Dt || Fu(t, n, s, r, h, u, c)) ? (p || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), i.props = r, i.state = u, i.context = c, r = s) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, _c(e, t), s = t.memoizedProps, c = t.type === t.elementType ? s : lt(t.type, s), i.props = c, p = t.pendingProps, h = i.context, u = n.contextType, typeof u == "object" && u !== null ? u = et(u) : (u = $e(n) ? gn : Te.current, u = Yn(t, u));
    var S = n.getDerivedStateFromProps;
    (g = typeof S == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== p || h !== u) && Au(t, i, r, u), Dt = !1, h = t.memoizedState, i.state = h, Yl(t, r, i, l);
    var k = t.memoizedState;
    s !== p || h !== k || De.current || Dt ? (typeof S == "function" && (ji(t, n, S, r), k = t.memoizedState), (c = Dt || Fu(t, n, c, r, h, k, u) || !1) ? (g || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, k, u), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, k, u)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = k), i.props = r, i.state = k, i.context = u, r = c) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Oi(e, t, n, r, o, l);
}
function Oi(e, t, n, r, l, o) {
  Zc(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && Pu(t, n, !1), Tt(e, t, o);
  r = t.stateNode, Pp.current = t;
  var s = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = Jn(t, e.child, null, o), t.child = Jn(t, null, s, o)) : ze(e, t, s, o), t.memoizedState = r.state, l && Pu(t, n, !0), t.child;
}
function qc(e) {
  var t = e.stateNode;
  t.pendingContext ? Lu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Lu(e, t.context, !1), Ss(e, t.containerInfo);
}
function Xu(e, t, n, r, l) {
  return Gn(), ms(l), t.flags |= 256, ze(e, t, n, r), t.child;
}
var Di = { dehydrated: null, treeContext: null, retryLane: 0 };
function $i(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function bc(e, t, n) {
  var r = t.pendingProps, l = ee.current, o = !1, i = (t.flags & 128) !== 0, s;
  if ((s = i) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), s ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), G(ee, l & 1), e === null)
    return Li(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = mo(i, r, 0, null), e = mn(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = $i(n), t.memoizedState = Di, e) : Ls(t, i));
  if (l = e.memoizedState, l !== null && (s = l.dehydrated, s !== null)) return jp(e, t, i, r, s, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, s = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = Yt(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), s !== null ? o = Yt(s, o) : (o = mn(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? $i(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = Di, r;
  }
  return o = e.child, e = o.sibling, r = Yt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Ls(e, t) {
  return t = mo({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function yl(e, t, n, r) {
  return r !== null && ms(r), Jn(t, e.child, null, n), e = Ls(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function jp(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Jo(Error(E(422))), yl(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = mo({ mode: "visible", children: r.children }, l, 0, null), o = mn(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Jn(t, e.child, null, i), t.child.memoizedState = $i(i), t.memoizedState = Di, o);
  if (!(t.mode & 1)) return yl(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var s = r.dgst;
    return r = s, o = Error(E(419)), r = Jo(o, r, void 0), yl(e, t, i, r);
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Nt(e, l), ut(r, e, l, -1));
    }
    return Os(), r = Jo(Error(E(421))), yl(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Vp.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Ue = Vt(l.nextSibling), Be = t, b = !0, it = null, e !== null && (Je[Ze++] = St, Je[Ze++] = kt, Je[Ze++] = yn, St = e.id, kt = e.overflow, yn = t), t = Ls(t, r.children), t.flags |= 4096, t);
}
function Ku(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Pi(e.return, t, n);
}
function Zo(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function ef(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (ze(e, t, r.children, n), r = ee.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Ku(e, n, t);
      else if (e.tag === 19) Ku(e, n, t);
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
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Zo(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Gl(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Zo(t, !0, n, null, o);
      break;
    case "together":
      Zo(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Ll(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Tt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), xn |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(E(153));
  if (t.child !== null) {
    for (e = t.child, n = Yt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Yt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Rp(e, t, n) {
  switch (t.tag) {
    case 3:
      qc(t), Gn();
      break;
    case 5:
      Nc(t);
      break;
    case 1:
      $e(t.type) && Hl(t);
      break;
    case 4:
      Ss(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      G(Xl, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (G(ee, ee.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? bc(e, t, n) : (G(ee, ee.current & 1), e = Tt(e, t, n), e !== null ? e.sibling : null);
      G(ee, ee.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return ef(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), G(ee, ee.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Jc(e, t, n);
  }
  return Tt(e, t, n);
}
var tf, Fi, nf, rf;
tf = function(e, t) {
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
nf = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, pn(ht.current);
    var o = null;
    switch (n) {
      case "input":
        l = ii(e, l), r = ii(e, r), o = [];
        break;
      case "select":
        l = ne({}, l, { value: void 0 }), r = ne({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = ai(e, l), r = ai(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Bl);
    }
    fi(n, r);
    var i;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var s = l[c];
      for (i in s) s.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Nr.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (s = l != null ? l[c] : void 0, r.hasOwnProperty(c) && u !== s && (u != null || s != null)) if (c === "style") if (s) {
        for (i in s) !s.hasOwnProperty(i) || u && u.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in u) u.hasOwnProperty(i) && s[i] !== u[i] && (n || (n = {}), n[i] = u[i]);
      } else n || (o || (o = []), o.push(
        c,
        n
      )), n = u;
      else c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, s = s ? s.__html : void 0, u != null && s !== u && (o = o || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Nr.hasOwnProperty(c) ? (u != null && c === "onScroll" && Z("scroll", e), o || s === u || (o = [])) : (o = o || []).push(c, u));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
rf = function(e, t, n, r) {
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
function _e(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Mp(e, t, n) {
  var r = t.pendingProps;
  switch (hs(t), t.tag) {
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
      return _e(t), null;
    case 1:
      return $e(t.type) && Wl(), _e(t), null;
    case 3:
      return r = t.stateNode, Zn(), q(De), q(Te), Es(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (ml(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, it !== null && (Xi(it), it = null))), Fi(e, t), _e(t), null;
    case 5:
      ks(t);
      var l = pn(Fr.current);
      if (n = t.type, e !== null && t.stateNode != null) nf(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(E(166));
          return _e(t), null;
        }
        if (e = pn(ht.current), ml(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[dt] = t, r[Dr] = o, e = (t.mode & 1) !== 0, n) {
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
              nu(r, o), Z("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Z("invalid", r);
              break;
            case "textarea":
              lu(r, o), Z("invalid", r);
          }
          fi(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var s = o[i];
            i === "children" ? typeof s == "string" ? r.textContent !== s && (o.suppressHydrationWarning !== !0 && hl(r.textContent, s, e), l = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (o.suppressHydrationWarning !== !0 && hl(
              r.textContent,
              s,
              e
            ), l = ["children", "" + s]) : Nr.hasOwnProperty(i) && s != null && i === "onScroll" && Z("scroll", r);
          }
          switch (n) {
            case "input":
              il(r), ru(r, o, !0);
              break;
            case "textarea":
              il(r), ou(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Bl);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = ja(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[dt] = t, e[Dr] = r, tf(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = di(n, r), n) {
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
                nu(e, r), l = ii(e, r), Z("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = ne({}, r, { value: void 0 }), Z("invalid", e);
                break;
              case "textarea":
                lu(e, r), l = ai(e, r), Z("invalid", e);
                break;
              default:
                l = r;
            }
            fi(n, l), s = l;
            for (o in s) if (s.hasOwnProperty(o)) {
              var u = s[o];
              o === "style" ? Ia(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Ra(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Tr(e, u) : typeof u == "number" && Tr(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Nr.hasOwnProperty(o) ? u != null && o === "onScroll" && Z("scroll", e) : u != null && bi(e, o, u, i));
            }
            switch (n) {
              case "input":
                il(e), ru(e, r, !1);
                break;
              case "textarea":
                il(e), ou(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Gt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? Bn(e, !!r.multiple, o, !1) : r.defaultValue != null && Bn(
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
      return _e(t), null;
    case 6:
      if (e && t.stateNode != null) rf(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(E(166));
        if (n = pn(Fr.current), pn(ht.current), ml(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[dt] = t, (o = r.nodeValue !== n) && (e = Be, e !== null)) switch (e.tag) {
            case 3:
              hl(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && hl(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[dt] = t, t.stateNode = r;
      }
      return _e(t), null;
    case 13:
      if (q(ee), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (b && Ue !== null && t.mode & 1 && !(t.flags & 128)) Sc(), Gn(), t.flags |= 98560, o = !1;
        else if (o = ml(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(E(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(E(317));
            o[dt] = t;
          } else Gn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          _e(t), o = !1;
        } else it !== null && (Xi(it), it = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || ee.current & 1 ? me === 0 && (me = 3) : Os())), t.updateQueue !== null && (t.flags |= 4), _e(t), null);
    case 4:
      return Zn(), Fi(e, t), e === null && Ir(t.stateNode.containerInfo), _e(t), null;
    case 10:
      return vs(t.type._context), _e(t), null;
    case 17:
      return $e(t.type) && Wl(), _e(t), null;
    case 19:
      if (q(ee), o = t.memoizedState, o === null) return _e(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) fr(o, !1);
      else {
        if (me !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = Gl(e), i !== null) {
            for (t.flags |= 128, fr(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return G(ee, ee.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && ue() > bn && (t.flags |= 128, r = !0, fr(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = Gl(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), fr(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !b) return _e(t), null;
        } else 2 * ue() - o.renderingStartTime > bn && n !== 1073741824 && (t.flags |= 128, r = !0, fr(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = ue(), t.sibling = null, n = ee.current, G(ee, r ? n & 1 | 2 : n & 1), t) : (_e(t), null);
    case 22:
    case 23:
      return Is(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Ae & 1073741824 && (_e(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : _e(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(E(156, t.tag));
}
function Ip(e, t) {
  switch (hs(t), t.tag) {
    case 1:
      return $e(t.type) && Wl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Zn(), q(De), q(Te), Es(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return ks(t), null;
    case 13:
      if (q(ee), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(E(340));
        Gn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return q(ee), null;
    case 4:
      return Zn(), null;
    case 10:
      return vs(t.type._context), null;
    case 22:
    case 23:
      return Is(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var vl = !1, Ne = !1, Op = typeof WeakSet == "function" ? WeakSet : Set, R = null;
function An(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    ie(e, t, r);
  }
  else n.current = null;
}
function Ai(e, t, n) {
  try {
    n();
  } catch (r) {
    ie(e, t, r);
  }
}
var Yu = !1;
function Dp(e, t) {
  if (ki = Fl, e = uc(), ds(e)) {
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
        } catch (x) {
          n = null;
          break e;
        }
        var i = 0, s = -1, u = -1, c = 0, g = 0, p = e, h = null;
        t: for (; ; ) {
          for (var S; p !== n || l !== 0 && p.nodeType !== 3 || (s = i + l), p !== o || r !== 0 && p.nodeType !== 3 || (u = i + r), p.nodeType === 3 && (i += p.nodeValue.length), (S = p.firstChild) !== null; )
            h = p, p = S;
          for (; ; ) {
            if (p === e) break t;
            if (h === n && ++c === l && (s = i), h === o && ++g === r && (u = i), (S = p.nextSibling) !== null) break;
            p = h, h = p.parentNode;
          }
          p = S;
        }
        n = s === -1 || u === -1 ? null : { start: s, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ei = { focusedElem: e, selectionRange: n }, Fl = !1, R = t; R !== null; ) if (t = R, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, R = e;
  else for (; R !== null; ) {
    t = R;
    try {
      var k = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (k !== null) {
            var y = k.memoizedProps, O = k.memoizedState, d = t.stateNode, a = d.getSnapshotBeforeUpdate(t.elementType === t.type ? y : lt(t.type, y), O);
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
          throw Error(E(163));
      }
    } catch (x) {
      ie(t, t.return, x);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, R = e;
      break;
    }
    R = t.return;
  }
  return k = Yu, Yu = !1, k;
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
function lf(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, lf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[dt], delete t[Dr], delete t[Ni], delete t[vp], delete t[xp])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function of(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Gu(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || of(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Bi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Bl));
  else if (r !== 4 && (e = e.child, e !== null)) for (Bi(e, t, n), e = e.sibling; e !== null; ) Bi(e, t, n), e = e.sibling;
}
function Wi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Wi(e, t, n), e = e.sibling; e !== null; ) Wi(e, t, n), e = e.sibling;
}
var we = null, ot = !1;
function It(e, t, n) {
  for (n = n.child; n !== null; ) sf(e, t, n), n = n.sibling;
}
function sf(e, t, n) {
  if (pt && typeof pt.onCommitFiberUnmount == "function") try {
    pt.onCommitFiberUnmount(lo, n);
  } catch (s) {
  }
  switch (n.tag) {
    case 5:
      Ne || An(n, t);
    case 6:
      var r = we, l = ot;
      we = null, It(e, t, n), we = r, ot = l, we !== null && (ot ? (e = we, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : we.removeChild(n.stateNode));
      break;
    case 18:
      we !== null && (ot ? (e = we, n = n.stateNode, e.nodeType === 8 ? Vo(e.parentNode, n) : e.nodeType === 1 && Vo(e, n), jr(e)) : Vo(we, n.stateNode));
      break;
    case 4:
      r = we, l = ot, we = n.stateNode.containerInfo, ot = !0, It(e, t, n), we = r, ot = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Ne && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && Ai(n, t, i), l = l.next;
        } while (l !== r);
      }
      It(e, t, n);
      break;
    case 1:
      if (!Ne && (An(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (s) {
        ie(n, t, s);
      }
      It(e, t, n);
      break;
    case 21:
      It(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (Ne = (r = Ne) || n.memoizedState !== null, It(e, t, n), Ne = r) : It(e, t, n);
      break;
    default:
      It(e, t, n);
  }
}
function Ju(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Op()), t.forEach(function(r) {
      var l = Qp.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function rt(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var o = e, i = t, s = i;
      e: for (; s !== null; ) {
        switch (s.tag) {
          case 5:
            we = s.stateNode, ot = !1;
            break e;
          case 3:
            we = s.stateNode.containerInfo, ot = !0;
            break e;
          case 4:
            we = s.stateNode.containerInfo, ot = !0;
            break e;
        }
        s = s.return;
      }
      if (we === null) throw Error(E(160));
      sf(o, i, l), we = null, ot = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (c) {
      ie(l, t, c);
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
      if (rt(t, e), ct(e), r & 4) {
        try {
          Er(3, e, e.return), po(3, e);
        } catch (y) {
          ie(e, e.return, y);
        }
        try {
          Er(5, e, e.return);
        } catch (y) {
          ie(e, e.return, y);
        }
      }
      break;
    case 1:
      rt(t, e), ct(e), r & 512 && n !== null && An(n, n.return);
      break;
    case 5:
      if (rt(t, e), ct(e), r & 512 && n !== null && An(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Tr(l, "");
        } catch (y) {
          ie(e, e.return, y);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, s = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          s === "input" && o.type === "radio" && o.name != null && La(l, o), di(s, i);
          var c = di(s, o);
          for (i = 0; i < u.length; i += 2) {
            var g = u[i], p = u[i + 1];
            g === "style" ? Ia(l, p) : g === "dangerouslySetInnerHTML" ? Ra(l, p) : g === "children" ? Tr(l, p) : bi(l, g, p, c);
          }
          switch (s) {
            case "input":
              si(l, o);
              break;
            case "textarea":
              Pa(l, o);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var S = o.value;
              S != null ? Bn(l, !!o.multiple, S, !1) : h !== !!o.multiple && (o.defaultValue != null ? Bn(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : Bn(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[Dr] = o;
        } catch (y) {
          ie(e, e.return, y);
        }
      }
      break;
    case 6:
      if (rt(t, e), ct(e), r & 4) {
        if (e.stateNode === null) throw Error(E(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (y) {
          ie(e, e.return, y);
        }
      }
      break;
    case 3:
      if (rt(t, e), ct(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        jr(t.containerInfo);
      } catch (y) {
        ie(e, e.return, y);
      }
      break;
    case 4:
      rt(t, e), ct(e);
      break;
    case 13:
      rt(t, e), ct(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Rs = ue())), r & 4 && Ju(e);
      break;
    case 22:
      if (g = n !== null && n.memoizedState !== null, e.mode & 1 ? (Ne = (c = Ne) || g, rt(t, e), Ne = c) : rt(t, e), ct(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !g && e.mode & 1) for (R = e, g = e.child; g !== null; ) {
          for (p = R = g; R !== null; ) {
            switch (h = R, S = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Er(4, h, h.return);
                break;
              case 1:
                An(h, h.return);
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
                An(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  qu(p);
                  continue;
                }
            }
            S !== null ? (S.return = h, R = S) : qu(p);
          }
          g = g.sibling;
        }
        e: for (g = null, p = e; ; ) {
          if (p.tag === 5) {
            if (g === null) {
              g = p;
              try {
                l = p.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (s = p.stateNode, u = p.memoizedProps.style, i = u != null && u.hasOwnProperty("display") ? u.display : null, s.style.display = Ma("display", i));
              } catch (y) {
                ie(e, e.return, y);
              }
            }
          } else if (p.tag === 6) {
            if (g === null) try {
              p.stateNode.nodeValue = c ? "" : p.memoizedProps;
            } catch (y) {
              ie(e, e.return, y);
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
      rt(t, e), ct(e), r & 4 && Ju(e);
      break;
    case 21:
      break;
    default:
      rt(
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
          if (of(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(E(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Tr(l, ""), r.flags &= -33);
          var o = Gu(e);
          Wi(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, s = Gu(e);
          Bi(e, s, i);
          break;
        default:
          throw Error(E(161));
      }
    } catch (u) {
      ie(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function $p(e, t, n) {
  R = e, af(e);
}
function af(e, t, n) {
  for (var r = (e.mode & 1) !== 0; R !== null; ) {
    var l = R, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || vl;
      if (!i) {
        var s = l.alternate, u = s !== null && s.memoizedState !== null || Ne;
        s = vl;
        var c = Ne;
        if (vl = i, (Ne = u) && !c) for (R = l; R !== null; ) i = R, u = i.child, i.tag === 22 && i.memoizedState !== null ? bu(l) : u !== null ? (u.return = i, R = u) : bu(l);
        for (; o !== null; ) R = o, af(o), o = o.sibling;
        R = l, vl = s, Ne = c;
      }
      Zu(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, R = o) : Zu(e);
  }
}
function Zu(e) {
  for (; R !== null; ) {
    var t = R;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            Ne || po(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !Ne) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : lt(t.type, n.memoizedProps);
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
                  p !== null && jr(p);
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
            throw Error(E(163));
        }
        Ne || t.flags & 512 && Ui(t);
      } catch (h) {
        ie(t, t.return, h);
      }
    }
    if (t === e) {
      R = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, R = n;
      break;
    }
    R = t.return;
  }
}
function qu(e) {
  for (; R !== null; ) {
    var t = R;
    if (t === e) {
      R = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, R = n;
      break;
    }
    R = t.return;
  }
}
function bu(e) {
  for (; R !== null; ) {
    var t = R;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            po(4, t);
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
            Ui(t);
          } catch (u) {
            ie(t, o, u);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Ui(t);
          } catch (u) {
            ie(t, i, u);
          }
      }
    } catch (u) {
      ie(t, t.return, u);
    }
    if (t === e) {
      R = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      s.return = t.return, R = s;
      break;
    }
    R = t.return;
  }
}
var Fp = Math.ceil, ql = zt.ReactCurrentDispatcher, Ps = zt.ReactCurrentOwner, be = zt.ReactCurrentBatchConfig, H = 0, xe = null, pe = null, Se = 0, Ae = 0, Un = qt(0), me = 0, Wr = null, xn = 0, ho = 0, js = 0, Cr = null, Ie = null, Rs = 0, bn = 1 / 0, vt = null, bl = !1, Hi = null, Xt = null, xl = !1, Ut = null, eo = 0, _r = 0, Vi = null, Pl = -1, jl = 0;
function Le() {
  return H & 6 ? ue() : Pl !== -1 ? Pl : Pl = ue();
}
function Kt(e) {
  return e.mode & 1 ? H & 2 && Se !== 0 ? Se & -Se : Sp.transition !== null ? (jl === 0 && (jl = Xa()), jl) : (e = K, e !== 0 || (e = window.event, e = e === void 0 ? 16 : ba(e.type)), e) : 1;
}
function ut(e, t, n, r) {
  if (50 < _r) throw _r = 0, Vi = null, Error(E(185));
  Vr(e, n, r), (!(H & 2) || e !== xe) && (e === xe && (!(H & 2) && (ho |= n), me === 4 && Ft(e, Se)), Fe(e, r), n === 1 && H === 0 && !(t.mode & 1) && (bn = ue() + 500, ao && bt()));
}
function Fe(e, t) {
  var n = e.callbackNode;
  Sd(e, t);
  var r = $l(e, e === xe ? Se : 0);
  if (r === 0) n !== null && uu(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && uu(n), t === 1) e.tag === 0 ? wp(ea.bind(null, e)) : vc(ea.bind(null, e)), gp(function() {
      !(H & 6) && bt();
    }), n = null;
    else {
      switch (Ka(r)) {
        case 1:
          n = ls;
          break;
        case 4:
          n = Va;
          break;
        case 16:
          n = Dl;
          break;
        case 536870912:
          n = Qa;
          break;
        default:
          n = Dl;
      }
      n = yf(n, cf.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function cf(e, t) {
  if (Pl = -1, jl = 0, H & 6) throw Error(E(327));
  var n = e.callbackNode;
  if (Xn() && e.callbackNode !== n) return null;
  var r = $l(e, e === xe ? Se : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = to(e, r);
  else {
    t = r;
    var l = H;
    H |= 2;
    var o = df();
    (xe !== e || Se !== t) && (vt = null, bn = ue() + 500, hn(e, t));
    do
      try {
        Bp();
        break;
      } catch (s) {
        ff(e, s);
      }
    while (!0);
    ys(), ql.current = o, H = l, pe !== null ? t = 0 : (xe = null, Se = 0, t = me);
  }
  if (t !== 0) {
    if (t === 2 && (l = yi(e), l !== 0 && (r = l, t = Qi(e, l))), t === 1) throw n = Wr, hn(e, 0), Ft(e, r), Fe(e, ue()), n;
    if (t === 6) Ft(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Ap(l) && (t = to(e, r), t === 2 && (o = yi(e), o !== 0 && (r = o, t = Qi(e, o))), t === 1)) throw n = Wr, hn(e, 0), Ft(e, r), Fe(e, ue()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(E(345));
        case 2:
          cn(e, Ie, vt);
          break;
        case 3:
          if (Ft(e, r), (r & 130023424) === r && (t = Rs + 500 - ue(), 10 < t)) {
            if ($l(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              Le(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = _i(cn.bind(null, e, Ie, vt), t);
            break;
          }
          cn(e, Ie, vt);
          break;
        case 4:
          if (Ft(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - st(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = ue() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Fp(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = _i(cn.bind(null, e, Ie, vt), r);
            break;
          }
          cn(e, Ie, vt);
          break;
        case 5:
          cn(e, Ie, vt);
          break;
        default:
          throw Error(E(329));
      }
    }
  }
  return Fe(e, ue()), e.callbackNode === n ? cf.bind(null, e) : null;
}
function Qi(e, t) {
  var n = Cr;
  return e.current.memoizedState.isDehydrated && (hn(e, t).flags |= 256), e = to(e, t), e !== 2 && (t = Ie, Ie = n, t !== null && Xi(t)), e;
}
function Xi(e) {
  Ie === null ? Ie = e : Ie.push.apply(Ie, e);
}
function Ap(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], o = l.getSnapshot;
        l = l.value;
        try {
          if (!at(o(), l)) return !1;
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
  for (t &= ~js, t &= ~ho, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - st(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function ea(e) {
  if (H & 6) throw Error(E(327));
  Xn();
  var t = $l(e, 0);
  if (!(t & 1)) return Fe(e, ue()), null;
  var n = to(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = yi(e);
    r !== 0 && (t = r, n = Qi(e, r));
  }
  if (n === 1) throw n = Wr, hn(e, 0), Ft(e, t), Fe(e, ue()), n;
  if (n === 6) throw Error(E(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, cn(e, Ie, vt), Fe(e, ue()), null;
}
function Ms(e, t) {
  var n = H;
  H |= 1;
  try {
    return e(t);
  } finally {
    H = n, H === 0 && (bn = ue() + 500, ao && bt());
  }
}
function wn(e) {
  Ut !== null && Ut.tag === 0 && !(H & 6) && Xn();
  var t = H;
  H |= 1;
  var n = be.transition, r = K;
  try {
    if (be.transition = null, K = 1, e) return e();
  } finally {
    K = r, be.transition = n, H = t, !(H & 6) && bt();
  }
}
function Is() {
  Ae = Un.current, q(Un);
}
function hn(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, mp(n)), pe !== null) for (n = pe.return; n !== null; ) {
    var r = n;
    switch (hs(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Wl();
        break;
      case 3:
        Zn(), q(De), q(Te), Es();
        break;
      case 5:
        ks(r);
        break;
      case 4:
        Zn();
        break;
      case 13:
        q(ee);
        break;
      case 19:
        q(ee);
        break;
      case 10:
        vs(r.type._context);
        break;
      case 22:
      case 23:
        Is();
    }
    n = n.return;
  }
  if (xe = e, pe = e = Yt(e.current, null), Se = Ae = t, me = 0, Wr = null, js = ho = xn = 0, Ie = Cr = null, dn !== null) {
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
function ff(e, t) {
  do {
    var n = pe;
    try {
      if (ys(), Tl.current = Zl, Jl) {
        for (var r = te.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        Jl = !1;
      }
      if (vn = 0, ve = he = te = null, kr = !1, Ar = 0, Ps.current = null, n === null || n.return === null) {
        me = 1, Wr = t, pe = null;
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
          var S = Bu(i);
          if (S !== null) {
            S.flags &= -257, Wu(S, i, s, o, t), S.mode & 1 && Uu(o, c, t), t = S, u = c;
            var k = t.updateQueue;
            if (k === null) {
              var y = /* @__PURE__ */ new Set();
              y.add(u), t.updateQueue = y;
            } else k.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Uu(o, c, t), Os();
              break e;
            }
            u = Error(E(426));
          }
        } else if (b && s.mode & 1) {
          var O = Bu(i);
          if (O !== null) {
            !(O.flags & 65536) && (O.flags |= 256), Wu(O, i, s, o, t), ms(qn(u, s));
            break e;
          }
        }
        o = u = qn(u, s), me !== 4 && (me = 2), Cr === null ? Cr = [o] : Cr.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var d = Kc(o, u, t);
              Iu(o, d);
              break e;
            case 1:
              s = u;
              var a = o.type, f = o.stateNode;
              if (!(o.flags & 128) && (typeof a.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (Xt === null || !Xt.has(f)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var x = Yc(o, s, t);
                Iu(o, x);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      hf(n);
    } catch (C) {
      t = C, pe === n && n !== null && (pe = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function df() {
  var e = ql.current;
  return ql.current = Zl, e === null ? Zl : e;
}
function Os() {
  (me === 0 || me === 3 || me === 2) && (me = 4), xe === null || !(xn & 268435455) && !(ho & 268435455) || Ft(xe, Se);
}
function to(e, t) {
  var n = H;
  H |= 2;
  var r = df();
  (xe !== e || Se !== t) && (vt = null, hn(e, t));
  do
    try {
      Up();
      break;
    } catch (l) {
      ff(e, l);
    }
  while (!0);
  if (ys(), H = n, ql.current = r, pe !== null) throw Error(E(261));
  return xe = null, Se = 0, me;
}
function Up() {
  for (; pe !== null; ) pf(pe);
}
function Bp() {
  for (; pe !== null && !dd(); ) pf(pe);
}
function pf(e) {
  var t = gf(e.alternate, e, Ae);
  e.memoizedProps = e.pendingProps, t === null ? hf(e) : pe = t, Ps.current = null;
}
function hf(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Ip(n, t), n !== null) {
        n.flags &= 32767, pe = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        me = 6, pe = null;
        return;
      }
    } else if (n = Mp(n, t, Ae), n !== null) {
      pe = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      pe = t;
      return;
    }
    pe = t = e;
  } while (t !== null);
  me === 0 && (me = 5);
}
function cn(e, t, n) {
  var r = K, l = be.transition;
  try {
    be.transition = null, K = 1, Wp(e, t, n, r);
  } finally {
    be.transition = l, K = r;
  }
  return null;
}
function Wp(e, t, n, r) {
  do
    Xn();
  while (Ut !== null);
  if (H & 6) throw Error(E(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(E(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (kd(e, o), e === xe && (pe = xe = null, Se = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || xl || (xl = !0, yf(Dl, function() {
    return Xn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = be.transition, be.transition = null;
    var i = K;
    K = 1;
    var s = H;
    H |= 4, Ps.current = null, Dp(e, n), uf(n, e), up(Ei), Fl = !!ki, Ei = ki = null, e.current = n, $p(n), pd(), H = s, K = i, be.transition = o;
  } else e.current = n;
  if (xl && (xl = !1, Ut = e, eo = l), o = e.pendingLanes, o === 0 && (Xt = null), gd(n.stateNode), Fe(e, ue()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (bl) throw bl = !1, e = Hi, Hi = null, e;
  return eo & 1 && e.tag !== 0 && Xn(), o = e.pendingLanes, o & 1 ? e === Vi ? _r++ : (_r = 0, Vi = e) : _r = 0, bt(), null;
}
function Xn() {
  if (Ut !== null) {
    var e = Ka(eo), t = be.transition, n = K;
    try {
      if (be.transition = null, K = 16 > e ? 16 : e, Ut === null) var r = !1;
      else {
        if (e = Ut, Ut = null, eo = 0, H & 6) throw Error(E(331));
        var l = H;
        for (H |= 4, R = e.current; R !== null; ) {
          var o = R, i = o.child;
          if (R.flags & 16) {
            var s = o.deletions;
            if (s !== null) {
              for (var u = 0; u < s.length; u++) {
                var c = s[u];
                for (R = c; R !== null; ) {
                  var g = R;
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Er(8, g, o);
                  }
                  var p = g.child;
                  if (p !== null) p.return = g, R = p;
                  else for (; R !== null; ) {
                    g = R;
                    var h = g.sibling, S = g.return;
                    if (lf(g), g === c) {
                      R = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = S, R = h;
                      break;
                    }
                    R = S;
                  }
                }
              }
              var k = o.alternate;
              if (k !== null) {
                var y = k.child;
                if (y !== null) {
                  k.child = null;
                  do {
                    var O = y.sibling;
                    y.sibling = null, y = O;
                  } while (y !== null);
                }
              }
              R = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, R = i;
          else e: for (; R !== null; ) {
            if (o = R, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Er(9, o, o.return);
            }
            var d = o.sibling;
            if (d !== null) {
              d.return = o.return, R = d;
              break e;
            }
            R = o.return;
          }
        }
        var a = e.current;
        for (R = a; R !== null; ) {
          i = R;
          var f = i.child;
          if (i.subtreeFlags & 2064 && f !== null) f.return = i, R = f;
          else e: for (i = a; R !== null; ) {
            if (s = R, s.flags & 2048) try {
              switch (s.tag) {
                case 0:
                case 11:
                case 15:
                  po(9, s);
              }
            } catch (C) {
              ie(s, s.return, C);
            }
            if (s === i) {
              R = null;
              break e;
            }
            var x = s.sibling;
            if (x !== null) {
              x.return = s.return, R = x;
              break e;
            }
            R = s.return;
          }
        }
        if (H = l, bt(), pt && typeof pt.onPostCommitFiberRoot == "function") try {
          pt.onPostCommitFiberRoot(lo, e);
        } catch (C) {
        }
        r = !0;
      }
      return r;
    } finally {
      K = n, be.transition = t;
    }
  }
  return !1;
}
function ta(e, t, n) {
  t = qn(n, t), t = Kc(e, t, 1), e = Qt(e, t, 1), t = Le(), e !== null && (Vr(e, 1, t), Fe(e, t));
}
function ie(e, t, n) {
  if (e.tag === 3) ta(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      ta(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Xt === null || !Xt.has(r))) {
        e = qn(n, e), e = Yc(t, e, 1), t = Qt(t, e, 1), e = Le(), t !== null && (Vr(t, 1, e), Fe(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Hp(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = Le(), e.pingedLanes |= e.suspendedLanes & n, xe === e && (Se & n) === n && (me === 4 || me === 3 && (Se & 130023424) === Se && 500 > ue() - Rs ? hn(e, 0) : js |= n), Fe(e, t);
}
function mf(e, t) {
  t === 0 && (e.mode & 1 ? (t = al, al <<= 1, !(al & 130023424) && (al = 4194304)) : t = 1);
  var n = Le();
  e = Nt(e, t), e !== null && (Vr(e, t, n), Fe(e, n));
}
function Vp(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), mf(e, n);
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
      throw Error(E(314));
  }
  r !== null && r.delete(t), mf(e, n);
}
var gf;
gf = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || De.current) Oe = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Oe = !1, Rp(e, t, n);
    Oe = !!(e.flags & 131072);
  }
  else Oe = !1, b && t.flags & 1048576 && xc(t, Ql, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Ll(e, t), e = t.pendingProps;
      var l = Yn(t, Te.current);
      Qn(t, n), l = _s(null, t, r, e, l, n);
      var o = Ns();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, $e(r) ? (o = !0, Hl(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, ws(t), l.updater = fo, t.stateNode = l, l._reactInternals = t, Ri(t, r, e, n), t = Oi(null, t, r, !0, o, n)) : (t.tag = 0, b && o && ps(t), ze(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Ll(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Kp(r), e = lt(r, e), l) {
          case 0:
            t = Ii(null, t, r, e, n);
            break e;
          case 1:
            t = Qu(null, t, r, e, n);
            break e;
          case 11:
            t = Hu(null, t, r, e, n);
            break e;
          case 14:
            t = Vu(null, t, r, lt(r.type, e), n);
            break e;
        }
        throw Error(E(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : lt(r, l), Ii(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : lt(r, l), Qu(e, t, r, l, n);
    case 3:
      e: {
        if (qc(t), e === null) throw Error(E(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, _c(e, t), Yl(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = qn(Error(E(423)), t), t = Xu(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = qn(Error(E(424)), t), t = Xu(e, t, r, n, l);
          break e;
        } else for (Ue = Vt(t.stateNode.containerInfo.firstChild), Be = t, b = !0, it = null, n = Ec(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Gn(), r === l) {
            t = Tt(e, t, n);
            break e;
          }
          ze(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Nc(t), e === null && Li(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Ci(r, l) ? i = null : o !== null && Ci(r, o) && (t.flags |= 32), Zc(e, t), ze(e, t, i, n), t.child;
    case 6:
      return e === null && Li(t), null;
    case 13:
      return bc(e, t, n);
    case 4:
      return Ss(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Jn(t, null, r, n) : ze(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : lt(r, l), Hu(e, t, r, l, n);
    case 7:
      return ze(e, t, t.pendingProps, n), t.child;
    case 8:
      return ze(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ze(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, G(Xl, r._currentValue), r._currentValue = i, o !== null) if (at(o.value, i)) {
          if (o.children === l.children && !De.current) {
            t = Tt(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var s = o.dependencies;
          if (s !== null) {
            i = o.child;
            for (var u = s.firstContext; u !== null; ) {
              if (u.context === r) {
                if (o.tag === 1) {
                  u = Et(-1, n & -n), u.tag = 2;
                  var c = o.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var g = c.pending;
                    g === null ? u.next = u : (u.next = g.next, g.next = u), c.pending = u;
                  }
                }
                o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Pi(
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
            if (i = o.return, i === null) throw Error(E(341));
            i.lanes |= n, s = i.alternate, s !== null && (s.lanes |= n), Pi(i, n, t), i = o.sibling;
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
      return l = t.type, r = t.pendingProps.children, Qn(t, n), l = et(l), r = r(l), t.flags |= 1, ze(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = lt(r, t.pendingProps), l = lt(r.type, l), Vu(e, t, r, l, n);
    case 15:
      return Gc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : lt(r, l), Ll(e, t), t.tag = 1, $e(r) ? (e = !0, Hl(t)) : e = !1, Qn(t, n), Xc(t, r, l), Ri(t, r, l, n), Oi(null, t, r, !0, e, n);
    case 19:
      return ef(e, t, n);
    case 22:
      return Jc(e, t, n);
  }
  throw Error(E(156, t.tag));
};
function yf(e, t) {
  return Ha(e, t);
}
function Xp(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function qe(e, t, n, r) {
  return new Xp(e, t, n, r);
}
function Ds(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Kp(e) {
  if (typeof e == "function") return Ds(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ts) return 11;
    if (e === ns) return 14;
  }
  return 2;
}
function Yt(e, t) {
  var n = e.alternate;
  return n === null ? (n = qe(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Rl(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") Ds(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case Pn:
      return mn(n.children, l, o, t);
    case es:
      i = 8, l |= 8;
      break;
    case ni:
      return e = qe(12, n, t, l | 2), e.elementType = ni, e.lanes = o, e;
    case ri:
      return e = qe(13, n, t, l), e.elementType = ri, e.lanes = o, e;
    case li:
      return e = qe(19, n, t, l), e.elementType = li, e.lanes = o, e;
    case Na:
      return mo(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Ca:
          i = 10;
          break e;
        case _a:
          i = 9;
          break e;
        case ts:
          i = 11;
          break e;
        case ns:
          i = 14;
          break e;
        case Ot:
          i = 16, r = null;
          break e;
      }
      throw Error(E(130, e == null ? e : typeof e, ""));
  }
  return t = qe(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function mn(e, t, n, r) {
  return e = qe(7, e, r, t), e.lanes = n, e;
}
function mo(e, t, n, r) {
  return e = qe(22, e, r, t), e.elementType = Na, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function qo(e, t, n) {
  return e = qe(6, e, null, t), e.lanes = n, e;
}
function bo(e, t, n) {
  return t = qe(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Yp(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Mo(0), this.expirationTimes = Mo(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Mo(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function $s(e, t, n, r, l, o, i, s, u) {
  return e = new Yp(e, t, n, s, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = qe(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ws(o), e;
}
function Gp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Ln, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function vf(e) {
  if (!e) return Jt;
  e = e._reactInternals;
  e: {
    if (kn(e) !== e || e.tag !== 1) throw Error(E(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if ($e(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(E(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if ($e(n)) return yc(e, n, t);
  }
  return t;
}
function xf(e, t, n, r, l, o, i, s, u) {
  return e = $s(n, r, !0, e, l, o, i, s, u), e.context = vf(null), n = e.current, r = Le(), l = Kt(n), o = Et(r, l), o.callback = t != null ? t : null, Qt(n, o, l), e.current.lanes = l, Vr(e, l, r), Fe(e, r), e;
}
function go(e, t, n, r) {
  var l = t.current, o = Le(), i = Kt(l);
  return n = vf(n), t.context === null ? t.context = n : t.pendingContext = n, t = Et(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Qt(l, t, i), e !== null && (ut(e, l, i, o), Nl(e, l, i)), i;
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
function na(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Fs(e, t) {
  na(e, t), (e = e.alternate) && na(e, t);
}
function Jp() {
  return null;
}
var wf = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function As(e) {
  this._internalRoot = e;
}
yo.prototype.render = As.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(E(409));
  go(e, t, null, null);
};
yo.prototype.unmount = As.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    wn(function() {
      go(null, e, null, null);
    }), t[_t] = null;
  }
};
function yo(e) {
  this._internalRoot = e;
}
yo.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Ja();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < $t.length && t !== 0 && t < $t[n].priority; n++) ;
    $t.splice(n, 0, e), n === 0 && qa(e);
  }
};
function Us(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function vo(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function ra() {
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
    var i = xf(t, r, e, 0, null, !1, !1, "", ra);
    return e._reactRootContainer = i, e[_t] = i.current, Ir(e.nodeType === 8 ? e.parentNode : e), wn(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var c = no(u);
      s.call(c);
    };
  }
  var u = $s(e, 0, !1, null, null, !1, !1, "", ra);
  return e._reactRootContainer = u, e[_t] = u.current, Ir(e.nodeType === 8 ? e.parentNode : e), wn(function() {
    go(t, u, n, r);
  }), u;
}
function xo(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var s = l;
      l = function() {
        var u = no(i);
        s.call(u);
      };
    }
    go(t, i, e, l);
  } else i = Zp(n, t, e, l, r);
  return no(i);
}
Ya = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = mr(t.pendingLanes);
        n !== 0 && (os(t, n | 1), Fe(t, ue()), !(H & 6) && (bn = ue() + 500, bt()));
      }
      break;
    case 13:
      wn(function() {
        var r = Nt(e, 1);
        if (r !== null) {
          var l = Le();
          ut(r, e, 1, l);
        }
      }), Fs(e, 1);
  }
};
is = function(e) {
  if (e.tag === 13) {
    var t = Nt(e, 134217728);
    if (t !== null) {
      var n = Le();
      ut(t, e, 134217728, n);
    }
    Fs(e, 134217728);
  }
};
Ga = function(e) {
  if (e.tag === 13) {
    var t = Kt(e), n = Nt(e, t);
    if (n !== null) {
      var r = Le();
      ut(n, e, t, r);
    }
    Fs(e, t);
  }
};
Ja = function() {
  return K;
};
Za = function(e, t) {
  var n = K;
  try {
    return K = e, t();
  } finally {
    K = n;
  }
};
hi = function(e, t, n) {
  switch (t) {
    case "input":
      if (si(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = uo(r);
            if (!l) throw Error(E(90));
            za(r), si(r, l);
          }
        }
      }
      break;
    case "textarea":
      Pa(e, n);
      break;
    case "select":
      t = n.value, t != null && Bn(e, !!n.multiple, t, !1);
  }
};
$a = Ms;
Fa = wn;
var qp = { usingClientEntryPoint: !1, Events: [Xr, In, uo, Oa, Da, Ms] }, dr = { findFiberByHostInstance: fn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, bp = { bundleType: dr.bundleType, version: dr.version, rendererPackageName: dr.rendererPackageName, rendererConfig: dr.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: zt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ba(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: dr.findFiberByHostInstance || Jp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined") {
  var wl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!wl.isDisabled && wl.supportsFiber) try {
    lo = wl.inject(bp), pt = wl;
  } catch (e) {
  }
}
He.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = qp;
He.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Us(t)) throw Error(E(200));
  return Gp(e, t, null, n);
};
He.createRoot = function(e, t) {
  if (!Us(e)) throw Error(E(299));
  var n = !1, r = "", l = wf;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = $s(e, 1, !1, null, null, n, !1, r, l), e[_t] = t.current, Ir(e.nodeType === 8 ? e.parentNode : e), new As(t);
};
He.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(E(188)) : (e = Object.keys(e).join(","), Error(E(268, e)));
  return e = Ba(t), e = e === null ? null : e.stateNode, e;
};
He.flushSync = function(e) {
  return wn(e);
};
He.hydrate = function(e, t, n) {
  if (!vo(t)) throw Error(E(200));
  return xo(null, e, t, !0, n);
};
He.hydrateRoot = function(e, t, n) {
  if (!Us(e)) throw Error(E(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = wf;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = xf(t, null, e, 1, n != null ? n : null, l, !1, o, i), e[_t] = t.current, Ir(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new yo(t);
};
He.render = function(e, t, n) {
  if (!vo(t)) throw Error(E(200));
  return xo(null, e, t, !1, n);
};
He.unmountComponentAtNode = function(e) {
  if (!vo(e)) throw Error(E(40));
  return e._reactRootContainer ? (wn(function() {
    xo(null, null, e, !1, function() {
      e._reactRootContainer = null, e[_t] = null;
    });
  }), !0) : !1;
};
He.unstable_batchedUpdates = Ms;
He.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!vo(n)) throw Error(E(200));
  if (e == null || e._reactInternals === void 0) throw Error(E(38));
  return xo(e, t, n, !1, r);
};
He.version = "18.3.1-next-f1338f8080-20240426";
function Sf() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ == "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Sf);
    } catch (e) {
      console.error(e);
    }
}
Sf(), wa.exports = He;
var e0 = wa.exports, kf, la = e0;
kf = la.createRoot, la.hydrateRoot;
const oa = [
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
], ia = { "#39ff14": 110, "#ff2fbf": 320, "#00e5ff": 190, "#ff6b6b": 0, "#ffd93d": 55, "#7c3aed": 265 };
function sa(e) {
  return oa[(e - 1) % oa.length];
}
function xt(e) {
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
  return xt(e).tiles;
}
function ei(e) {
  return xt(e).time;
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
function r0(e, t = 0.15) {
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
  }, s = (y = 440, O = 0.12, d = "sine", a = 0.07) => {
    const f = i();
    if (f)
      try {
        const x = f.createOscillator(), C = f.createGain();
        x.type = d, x.frequency.value = y, C.gain.value = a, x.connect(C), C.connect(f.destination), f.state === "suspended" && f.resume().catch(() => {
        });
        const z = f.currentTime;
        x.start(z), x.stop(z + O);
      } catch (x) {
      }
  }, u = (y, O = 0.12, d = 0.04) => {
    const a = i();
    if (!(!a || !y || !y.length))
      try {
        a.state === "suspended" && a.resume().catch(() => {
        }), y.forEach((f, x) => {
          const C = a.createOscillator(), z = a.createGain();
          C.type = "triangle", C.frequency.value = f, z.gain.value = 0.08, C.connect(z), z.connect(a.destination);
          const j = a.currentTime + x * (O + d);
          C.start(j), C.stop(j + O);
        });
      } catch (f) {
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
        r.current.play().catch((O) => {
          console.log("Error reproduciendo audio de fondo:", O);
        });
      } catch (O) {
      }
  }, p = () => {
    if (r.current)
      try {
        r.current.pause(), r.current.currentTime = 0;
      } catch (y) {
      }
  }, h = (y) => {
    r.current && (r.current.volume = y);
  }, S = () => {
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
      const O = y && y.length ? y.slice(0, 6) : [659.25, 880, 1046.5];
      setTimeout(() => u(O, 0.12, 0.04), 300);
    },
    // Audio de fondo
    initBg: c,
    startBg: g,
    stopBg: p,
    updateVolume: h,
    // Audio de inicio
    initStart: S
  };
}
function yt(e, t) {
  try {
    t && navigator.vibrate && navigator.vibrate(e);
  } catch (n) {
  }
}
function l0() {
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
      const h = document.createElement("i"), S = 20 + Math.random() * 25, k = 40 + Math.random() * 60;
      let y, O;
      if (Math.random() < 0.7) {
        const x = [
          { x: [0, 15], y: [0, 100] },
          // Lado izquierdo
          { x: [85, 100], y: [0, 100] },
          // Lado derecho  
          { x: [0, 100], y: [0, 15] },
          // Parte superior
          { x: [0, 100], y: [85, 100] }
          // Parte inferior
        ], C = x[Math.floor(Math.random() * x.length)];
        y = C.x[0] + Math.random() * (C.x[1] - C.x[0]), O = C.y[0] + Math.random() * (C.y[1] - C.y[0]);
      } else
        y = Math.random() * 100, O = Math.random() * 100;
      h.style.left = y + "%", h.style.top = O + "%", h.style.width = S + "px", h.style.height = k + "px";
      const a = [0, 60, 120, 180, 240, 300, 45, 135, 225, 315], f = a[Math.floor(Math.random() * a.length)];
      h.style.background = `hsl(${f} 95% 65% / .9)`, c.appendChild(h), setTimeout(() => h.remove(), 3e3);
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
      let S = Math.min(42, Math.max(28, Math.floor(h.clientWidth * 0.16)));
      p.style.fontSize = S + "px", p.style.letterSpacing = "0.16em";
      let k = 0;
      for (; p.scrollWidth > h.clientWidth - 24 && k < 20; )
        S -= 1, p.style.fontSize = S + "px", k++;
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
function i0({ level: e, setLevel: t, soundOn: n, musicOn: r, musicVolume: l, vibrateOn: o, onOpenAuth: i, onOpenRanking: s, onOpenOptions: u, onTotalUpdate: c, totalTime: g }) {
  const p = N.useRef(null), [h, S] = N.useState(ei(e)), [k, y] = N.useState(!1), [O, d] = N.useState(!1), [a, f] = N.useState(!1), [x, C] = N.useState(!1), [z, j] = N.useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0;
    } catch (v) {
      return 0;
    }
  });
  N.useEffect(() => {
    typeof g == "number" && j(g);
  }, [g]);
  const T = r0(n, l), Y = Math.floor((e - 1) / 10) + 1, A = (e - 1) % 10 + 1, ae = N.useMemo(() => sa(e), [e]);
  N.useEffect(() => {
    T.initBg(), T.initStart();
    const v = setTimeout(() => {
      T.startBg(r);
    }, 1e3);
    return () => clearTimeout(v);
  }, [T, r]), N.useEffect(() => {
    r ? T.startBg(!0) : T.stopBg();
  }, [r, T]), N.useEffect(() => {
    T.updateVolume(l);
  }, [l, T]);
  const en = (v) => {
    const w = xt(v), _ = w.mechanics, I = Math.floor((v - 1) / 10) + 1;
    if (console.log(`CACHE_ROTO_NUEVO_CODIGO_FUNCIONANDO_Nivel_${v}_mechanics_`, _), _.includes("drag") && _.includes("double")) {
      console.log("COMBO DETECTADO: drag + double");
      const P = w.tiles, M = Math.max(1, Math.floor(P / 4)), D = Math.max(1, Math.floor(P / 4)), ce = [...Array.from({ length: P }, (de, Ke) => Ke)].sort(() => Math.random() - 0.5), fe = new Set(ce.slice(0, M)), ge = new Set(ce.slice(M, M + D)), oe = new Set(ce.slice(M + D));
      if (Yr(fe), Gr(ge), Jr(oe), mt(ge), gt.current = ge, fe.size > 0) {
        const de = Array.from(fe)[0];
        $(de), Q.current = de, ko(de);
      } else
        $(null), Q.current = null, ko(null);
      console.log("COMBO: dragTiles=", Array.from(new Set(ce.slice(0, M)))), console.log("COMBO: doubleTiles=", Array.from(ge)), console.log("COMBO: touchTiles=", Array.from(new Set(ce.slice(M + D))));
    } else if (_.includes("double") && !_.includes("drag")) {
      console.log(`DEBUG: Nivel ${v} - detectado como doble toque. mechanics=`, _);
      const P = 1, M = /* @__PURE__ */ new Set();
      for (; M.size < P; ) {
        const D = Math.floor(Math.random() * w.tiles);
        M.add(D);
      }
      console.log(`Mundo ${I}, Nivel ${v}: Fichas de doble toque = [${Array.from(M)}], Total fichas = ${w.tiles}`), gt.current = M, mt(M), Yr(/* @__PURE__ */ new Set()), Gr(/* @__PURE__ */ new Set()), Jr(/* @__PURE__ */ new Set()), ko(null), $(null), Q.current = null;
    } else if (I >= 2 && _.includes("drag")) {
      const P = w.tiles, M = Array.from({ length: P - 1 }, (ce, fe) => fe + 1), D = Math.floor(Math.random() * M.length), X = M[D];
      console.log(`Mundo ${I}, Nivel ${v}: Ficha especial = ${X}, Total fichas = ${P}`), $(X), Q.current = X, gt.current.clear(), mt(/* @__PURE__ */ new Set()), Yr(/* @__PURE__ */ new Set()), Gr(/* @__PURE__ */ new Set()), Jr(/* @__PURE__ */ new Set());
    } else
      gt.current.clear(), mt(/* @__PURE__ */ new Set()), Yr(/* @__PURE__ */ new Set()), Gr(/* @__PURE__ */ new Set()), Jr(/* @__PURE__ */ new Set()), $(null), Q.current = null;
    Xe.current.clear(), En(/* @__PURE__ */ new Set());
  }, [tn, wo] = N.useState([]), [se, Re] = N.useState(null), [Me, L] = N.useState(null), [F, $] = N.useState(null), V = N.useRef(null), re = N.useRef({ x: 0, y: 0 }), nt = N.useRef({ x: 0, y: 0 }), Q = N.useRef(null), Qe = N.useRef(null), [Lt, mt] = N.useState(/* @__PURE__ */ new Set()), gt = N.useRef(/* @__PURE__ */ new Set()), [f0, En] = N.useState(/* @__PURE__ */ new Set()), Xe = N.useRef(/* @__PURE__ */ new Set()), [Bs, Yr] = N.useState(/* @__PURE__ */ new Set()), [So, Gr] = N.useState(/* @__PURE__ */ new Set()), [d0, Jr] = N.useState(/* @__PURE__ */ new Set()), [p0, ko] = N.useState(null), Ee = N.useRef([]), le = N.useRef(0);
  N.useRef(/* @__PURE__ */ new Map());
  const Pt = N.useRef(null), nn = N.useRef(!1), Eo = 8, Co = N.useRef({ x: 0, y: 0 }), _o = N.useRef(!1), Zr = (v) => {
    const _ = (xt(e) || { mechanics: [] }).mechanics || [], I = Math.floor((e - 1) / 10) + 1;
    return _.includes("combo") || _.includes("touch") && _.includes("drag") && _.includes("double") ? Bs.has(v) : I >= 2 && _.includes("drag") ? Q.current === v : !1;
  }, Ef = (v = "tap") => {
    const w = p.current;
    if (!w || Q.current == null) return;
    const _ = w.querySelector(`.tile[data-id="${Q.current}"]`);
    if (!_) return;
    _.classList.remove("nudge-shake"), _.offsetHeight, _.classList.add("nudge-shake"), setTimeout(() => _.classList.remove("nudge-shake"), 550), Re((D) => D && { ...D, hint: !0 }), setTimeout(() => Re((D) => D && { ...D, hint: !1 }), 900);
    const I = _.getBoundingClientRect(), P = w.getBoundingClientRect(), M = document.createElement("div");
    M.className = "drag-hint", M.textContent = "arrastra", Object.assign(M.style, {
      left: `${I.left - P.left + I.width / 2}px`,
      top: `${I.top - P.top}px`
    }), w.appendChild(M), requestAnimationFrame(() => M.classList.add("show")), setTimeout(() => {
      M.classList.remove("show"), setTimeout(() => {
        try {
          M.remove();
        } catch (D) {
        }
      }, 180);
    }, 800);
    try {
      T.blink(720);
    } catch (D) {
    }
    yt(10, o);
  }, Cf = (v) => {
    const w = p.current;
    if (!w) return;
    const _ = w.querySelector(`.tile[data-id="${v}"]`);
    if (!_) return;
    _.classList.remove("nudge-shake"), _.offsetHeight, _.classList.add("nudge-shake"), setTimeout(() => _.classList.remove("nudge-shake"), 550);
    const I = _.getBoundingClientRect(), P = w.getBoundingClientRect(), M = document.createElement("div");
    M.className = "drag-hint", M.textContent = "dos veces", Object.assign(M.style, {
      left: `${I.left - P.left + I.width / 2}px`,
      top: `${I.top - P.top}px`
    }), w.appendChild(M), requestAnimationFrame(() => M.classList.add("show")), setTimeout(() => {
      M.classList.remove("show"), setTimeout(() => {
        try {
          M.remove();
        } catch (D) {
        }
      }, 180);
    }, 800);
    try {
      T.blink(720);
    } catch (D) {
    }
    yt(10, o);
  }, qr = (v = "unknown") => {
    const w = p.current, _ = Q.current;
    if (!w || _ == null) return;
    const I = w.querySelector(`.tile[data-id="${_}"]`);
    if (!I) return;
    let P = Qe.current;
    if (!P && I.dataset.origX && (P = {
      x: parseFloat(I.dataset.origX),
      y: parseFloat(I.dataset.origY),
      width: parseFloat(I.dataset.origW),
      height: parseFloat(I.dataset.origH)
    }), !P) {
      console.warn("restoreSpecialTile: no original position", { reason: v, id: _ });
      return;
    }
    I.style.position = "absolute", I.style.left = `${P.x}px`, I.style.top = `${P.y}px`, I.style.width = `${P.width}px`, I.style.height = `${P.height}px`, I.classList.remove("dragging"), I.style.zIndex = "", I.style.pointerEvents = "", L(null), V.current = null, console.log(`Ficha especial ${_} restaurada (${v}) →`, P);
  }, Ws = (v, w, _, I, P = 48) => {
    if (!_ || !I) return !1;
    const M = I.getBoundingClientRect(), D = v - M.left, X = w - M.top;
    return D > _.x - P && D < _.x + _.w + P && X > _.y - P && X < _.y + _.h + P;
  }, Hs = (v) => {
    var _;
    const w = (_ = p.current) == null ? void 0 : _.querySelector(`.tile[data-id="${v}"]`);
    if (w) {
      const I = parseFloat(w.dataset.pitch || "880");
      w.style.background = rn.current || ae, w.style.pointerEvents = "none", w.style.opacity = "0.7", T.ok(I), yt(20, o);
    }
  }, Vs = () => {
    if (le.current++, le.current >= Ee.current.length) {
      if (!ln.current) {
        ln.current = !0;
        const v = Math.ceil((Date.now() - br.current) / 1e3);
        No(v);
        try {
          window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
            method: "POST",
            body: JSON.stringify({
              level: e + 1,
              // Próximo nivel desbloqueado
              total_time_s: v,
              success: 1
            })
          }).catch((w) => {
            console.log("No hay sesión activa para guardar progreso");
          });
        } catch (w) {
        }
      }
      Pt.current && clearInterval(Pt.current), y(!1), nn.current = !1, d(!0);
      try {
        T.winMelody((el.current || []).slice(0, 6));
      } catch (v) {
      }
    }
  }, Qs = () => {
    T.fail(), yt(80, o), le.current = 0, nl(), Xe.current.clear(), En(/* @__PURE__ */ new Set());
    const v = p.current;
    if (v && Q.current !== null && Qe.current) {
      const w = v.querySelector(`.tile[data-id="${Q.current}"]`);
      w && (w.style.position = "absolute", w.style.left = `${Qe.current.x}px`, w.style.top = `${Qe.current.y}px`, w.style.width = `${Qe.current.width}px`, w.style.height = `${Qe.current.height}px`, w.style.zIndex = "", w.style.pointerEvents = "", w.classList.remove("dragging"), console.log(`Ficha especial ${Q.current} reposicionada a su lugar original:`, Qe.current));
    }
  }, br = N.useRef(0), el = N.useRef([]), rn = N.useRef(ae), ln = N.useRef(!1);
  N.useEffect(() => {
    var w;
    const v = (w = p.current) == null ? void 0 : w.closest(".device");
    v && v.style.setProperty("--accent", ae);
  }, [ae]);
  const No = (v) => {
    try {
      const _ = (Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0) + v;
      localStorage.setItem("lum_total", JSON.stringify(_)), j(_), typeof c == "function" && c(_);
    } catch (w) {
    }
  };
  function _f(v, w = null, _ = null) {
    var lr;
    const P = xt(e).mechanics, M = P.includes("drag") && P.includes("double"), D = _ || (M ? So : gt.current);
    console.log(`placeTiles llamado: n=${v}, currentSpecialId=${w}, doubleTouchTiles=`, Array.from(D));
    const X = p.current;
    if (!X) return;
    X.querySelectorAll(".tile, .dropzone").forEach((U) => U.remove());
    const ce = X.getBoundingClientRect(), fe = ce.width, ge = ce.height, oe = (U, ye) => Math.random() * (ye - U) + U, de = (lr = ia[rn.current || ae]) != null ? lr : 0, Ke = () => {
      let U = Math.floor(Math.random() * 360), ye = 0;
      for (; Math.min(Math.abs(U - de), 360 - Math.abs(U - de)) < 30 && ye++ < 120; )
        U = Math.floor(Math.random() * 360);
      return U;
    };
    let Ye = null;
    Math.floor((e - 1) / 10) + 1 >= 2 && w !== null && (Ye = "hsl(300 96% 58%)");
    const Rt = [], Mt = /* @__PURE__ */ new Set();
    for (let U = 0; U < v; U++) {
      let ye = 0, Ge = 0, on = 0, sn = 0, Xs = !1, zf = 0;
      for (; !Xs && zf++ < 300; )
        ye = Math.max(56, Math.min(140, 60 + Math.random() * 80)), Ge = Math.max(56, Math.min(160, 60 + Math.random() * 100)), on = Math.max(8, Math.min(fe - ye - 8, oe(0, fe - ye))), sn = Math.max(8, Math.min(ge - Ge - 8, oe(0, ge - Ge))), Xs = !Rt.some((J) => !(on + ye <= J.x || J.x + J.w <= on || sn + Ge <= J.y || J.y + J.h <= sn));
      Rt.push({ x: on, y: sn, w: ye, h: Ge });
      const W = document.createElement("button");
      W.type = "button", W.className = "tile";
      let Nn;
      if (w === U && Ye)
        Nn = Ye, Mt.add(Ye);
      else {
        let J;
        do
          J = Ke(), Nn = `hsl(${J} 96% 58%)`;
        while (Mt.has(Nn) || Nn === Ye);
        Mt.add(Nn);
      }
      if (Object.assign(W.style, { left: on + "px", top: sn + "px", width: ye + "px", height: Ge + "px", background: Nn }), W.style.background === (rn.current || ae)) {
        const J = ((ia[rn.current || ae] || 0) + 180) % 360;
        W.style.background = `hsl(${J} 96% 58%)`;
      }
      W.dataset.id = String(U), W.dataset.orig = W.style.background;
      const Ks = el.current || [];
      W.dataset.pitch = String(Ks[U % Ks.length] || 660);
      const rl = xt(e).mechanics, Ys = Math.floor((e - 1) / 10) + 1;
      if (W.style.cursor = "pointer", Ys >= 2 && Q.current === U && (W.classList.add("special-drag-tile"), W.addEventListener("dragstart", (J) => J.preventDefault()), W.addEventListener("touchstart", (J) => J.preventDefault(), { passive: !1 }), W.addEventListener("pointerdown", (J) => {
        To(J, { id: U });
      }, { passive: !1 }), setTimeout(() => {
        var Gs;
        const J = W.getBoundingClientRect(), un = (Gs = p.current) == null ? void 0 : Gs.getBoundingClientRect();
        if (un) {
          const Tn = {
            x: J.left - un.left,
            y: J.top - un.top,
            width: J.width,
            height: J.height
          };
          Qe.current = Tn, W.dataset.origX = String(Tn.x), W.dataset.origY = String(Tn.y), W.dataset.origW = String(Tn.width), W.dataset.origH = String(Tn.height), console.log("Posición original guardada:", Tn);
        }
      }, 50), console.log(`Ficha especial ${U} configurada para arrastre con clase 'special-drag-tile' (SIN event listener específico)`)), rl.includes("combo") || rl.includes("touch") && rl.includes("drag") && rl.includes("double"))
        if (Bs.has(U)) {
          const J = W.style.background;
          W.style.border = `1px solid ${J}`, W.style.boxShadow = `0 0 8px ${J}88`, W.style.cursor = "grab", W.addEventListener("pointerdown", (un) => To(un, U)), W.addEventListener("dragstart", (un) => un.preventDefault()), console.log(`Ficha ${U} marcada como ARRASTRE en COMBO`);
        } else So.has(U) ? (W.style.setProperty("border", "2px solid white", "important"), W.style.setProperty("outline", "2px solid white", "important"), W.style.setProperty("outline-offset", "4px", "important"), console.log(`Ficha ${U} marcada como doble toque en COMBO - BORDE DOBLE APLICADO`)) : (W.style.border = "1px solid rgba(255,255,255,0.2)", W.style.boxShadow = "none");
      else
        console.log(`Procesando ficha ${U}, doubleTouchTiles:`, Array.from(D), `¿Tiene ${U}?`, D.has(U)), D.has(U) && (W.style.setProperty("border", "2px solid white", "important"), W.style.setProperty("outline", "2px solid white", "important"), W.style.setProperty("outline-offset", "4px", "important"), console.log(`🚨 CACHE ROOTO - Ficha ${U} marcada como doble toque - BORDES BLANCOS APLICADOS`));
      Ys >= 2 && Q.current === U && (W.style.cursor = "grab", console.log(`Cursor 'grab' aplicado a ficha especial ${U}`)), X.appendChild(W);
    }
    X.__lumDeleg && X.removeEventListener("pointerdown", X.__lumDeleg);
    const _n = (U) => {
      const ye = U.target && U.target.closest && U.target.closest(".tile");
      if (!ye || !X.contains(ye) || !nn.current) return;
      const Ge = Number(ye.dataset.id), on = Ee.current[le.current], sn = Zr(on);
      if (ye.classList.contains("special-drag-tile") || Ge === Q.current) {
        To(U, { id: Ge });
        return;
      }
      sn || (U.preventDefault && U.preventDefault(), rr(Ge));
    };
    X.addEventListener("pointerdown", _n, { passive: !1 }), X.__lumDeleg = _n;
  }
  function tl(v) {
    const w = p.current, _ = w && w.querySelector(`.tile[data-id="${v}"]`);
    if (!_) return;
    _.style.background;
    const I = _.style.border, P = _.style.boxShadow, M = _.style.outline, D = _.style.outlineOffset;
    _.classList.add("lit"), _.style.background = rn.current || ae, T.blink(parseFloat(_.dataset.pitch || "720")), setTimeout(() => {
      _.classList.remove("lit"), gt.current.has(v) && (_.style.border = I, _.style.boxShadow = P, _.style.outline = M, _.style.outlineOffset = D);
    }, 260);
  }
  function Nf() {
    const v = Ee.current;
    v && v.length && tl(v[0]);
  }
  function nl() {
    const v = p.current;
    v && v.querySelectorAll(".tile").forEach((w) => {
      w.style.background = w.dataset.orig || w.style.background, w.classList.remove("lit"), w.style.opacity = "1";
    });
  }
  function Cn(v) {
    var Ke;
    const w = typeof v == "number" ? v : e, _ = (Ke = p.current) == null ? void 0 : Ke.closest(".device");
    rn.current = sa(w), _ && _.style.setProperty("--accent", rn.current), d(!1), f(!1), C(!1), ln.current = !1, Pt.current && clearInterval(Pt.current);
    const I = t0(w), P = Array.from({ length: I }, (Ye, jt) => jt), M = 0, D = P.slice(1).sort(() => Math.random() - 0.5);
    Ee.current = [M, ...D], console.log(`Secuencia generada para nivel ${w}:`, Ee.current), le.current = 0, el.current = ua[Math.floor(Math.random() * ua.length)] || [440, 494, 523, 587, 659, 698, 784, 880, 988, 1046, 1174, 1318, 1396, 1567, 1760], en(w);
    let X = null, ce = /* @__PURE__ */ new Set();
    const fe = Math.floor((w - 1) / 10) + 1;
    xt(w).mechanics, X = Q.current, ce = gt.current, _f(I, X, ce), setTimeout(() => {
      var jt, Rt, Mt;
      const Ye = xt(w);
      if (fe >= 2 && X !== null && Ye.mechanics.includes("drag")) {
        const _n = (jt = p.current) == null ? void 0 : jt.querySelector(`.tile[data-id="${X}"]`);
        if (_n) {
          const lr = _n.getBoundingClientRect();
          if ((Rt = p.current) == null ? void 0 : Rt.getBoundingClientRect()) {
            (Mt = p.current) == null || Mt.getBoundingClientRect();
            const ye = 60, Ge = {
              x: ye,
              // Esquina izquierda con margen
              y: ye,
              // Esquina superior con margen
              w: lr.width,
              h: lr.height,
              color: _n.style.backgroundColor,
              over: !1
            };
            Re(Ge), console.log(`Zona de drop creada para ficha ${X}`);
          }
        }
      } else
        Re(null);
    }, 100);
    const oe = ei(w);
    S(oe), y(!0), nn.current = !0, T.start(), br.current = Date.now();
    const de = Date.now();
    Pt.current = setInterval(() => {
      const Ye = (Date.now() - de) / 1e3, jt = Math.max(0, oe - Ye);
      if (S(Math.ceil(jt)), jt <= 0) {
        if (!ln.current) {
          ln.current = !0;
          const Rt = Math.ceil((Date.now() - br.current) / 1e3);
          No(Rt);
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
        clearInterval(Pt.current), y(!1), nn.current = !1, qr("timeout"), f(!0), T.fail(), nl();
      }
    }, 100), setTimeout(Nf, 1500);
  }
  N.useEffect(() => {
    const v = (w) => {
      _o.current && (w.preventDefault(), w.stopPropagation(), _o.current = !1, console.log("Click sintético anulado tras drag"));
    };
    return document.addEventListener("click", v, !0), () => document.removeEventListener("click", v, !0);
  }, []), N.useEffect(() => {
    window.LumetrixTest = Object.assign({}, window.LumetrixTest, {
      start: Cn,
      state: () => ({ level: e, world: Y, levelInWorld: A, running: k, time: h, seqLen: (Ee.current || []).length }),
      tapExpected: () => {
        const v = Ee.current[le.current];
        v != null && rr(v);
      },
      tapId: (v) => rr(v),
      isDragStep: () => {
        const v = Ee.current[le.current];
        return Zr(v);
      },
      test: {
        ignoreClicksOnDragStep: () => {
          const v = Ee.current[le.current], w = le.current;
          return Zr(v) ? (rr(v === 0 ? 1 : 0), { ok: le.current === w, step: le.current, expected: v }) : { ok: !1, reason: "not drag step" };
        }
      }
    });
  }, [e, Y, A, k, h]);
  const To = (v, w) => {
    var M;
    if (!nn.current) return;
    const _ = Ee.current[le.current], I = p.current, P = I == null ? void 0 : I.querySelector(`.tile[data-id="${w.id}"]`);
    if (P) {
      if (w.id === Q.current) {
        console.log(`Ficha especial ${w.id} tocada, esperada: ${_}`), v.preventDefault(), v.stopPropagation();
        const D = P.getBoundingClientRect();
        Co.current = { x: D.left, y: D.top }, _o.current = !0, L(w.id), V.current = (M = v.pointerId) != null ? M : null, re.current = { x: v.clientX - D.left, y: v.clientY - D.top }, nt.current = { x: D.left, y: D.top }, P.style.zIndex = 1e3, P.classList.add("dragging"), P.style.pointerEvents = "none", P.style.touchAction = "none", console.log("Drag iniciado correctamente - ficha en posición original");
        return;
      }
      if (w.id !== _) return Qs();
      Hs(w.id), Vs();
    }
  };
  function rr(v) {
    if (!nn.current) return;
    const w = xt(e);
    if (w.mechanics.includes("drag") && v === Q.current) {
      console.log("tap ignorado en especial (modo drag)");
      return;
    }
    const _ = Ee.current[le.current], I = p.current;
    if (Zr(_))
      return;
    const P = I && I.querySelector(`.tile[data-id="${v}"]`);
    if (!P) return;
    const M = parseFloat(P.dataset.pitch || "880"), D = gt.current.has(v), X = (w.mechanics.includes("combo") || w.mechanics.includes("touch") && w.mechanics.includes("drag") && w.mechanics.includes("double")) && So.has(v);
    if (console.log(`tap(${v}): doubleTouchTiles=`, Array.from(gt.current), `isDoubleTile=${D}`), console.log(`tap(${v}): isDoubleTile=${D}, config.mechanics=`, w.mechanics, "includes('double')=", w.mechanics.includes("double"), `isComboDouble=${X}`), D && w.mechanics.includes("double") || X)
      if (v === _)
        if (console.log(`Ficha ${v} es de doble toque y es su turno. partiallyTouched:`, Array.from(Xe.current), `¿Tiene ${v}?`, Xe.current.has(v)), Xe.current.has(v))
          console.log(`SEGUNDO TOQUE en ficha ${v} - completando doble toque`), P.style.opacity = "1", tl(v), T.ok(M), yt(20, o), le.current++, Xe.current.delete(v), En(new Set(Xe.current));
        else {
          console.log(`PRIMER TOQUE en ficha ${v} - marcando como parcialmente tocada`), P.style.opacity = "0.6", tl(v), T.ok(M), yt(20, o), Xe.current.add(v), console.log("Actualizando partiallyTouched:", Array.from(Xe.current)), En(new Set(Xe.current)), Cf(v);
          return;
        }
      else {
        console.log(`Error: ficha de doble toque ${v} no es la esperada (${_})`), T.fail(), yt(80, o), le.current = 0, nl(), Xe.current.clear(), En(/* @__PURE__ */ new Set());
        return;
      }
    else if (v === _) {
      tl(v), T.ok(M), yt(20, o), le.current++;
      const ce = Math.floor((e - 1) / 10) + 1;
      if ((ce >= 2 || w.mechanics.includes("combo") || w.mechanics.includes("touch") && w.mechanics.includes("drag") && w.mechanics.includes("double")) && le.current < Ee.current.length ? setTimeout(() => {
        var ge, oe;
        if (Math.floor((e - 1) / 10) + 1 >= 2 && Q.current !== null) {
          const de = (ge = p.current) == null ? void 0 : ge.querySelector(`.tile[data-id="${Q.current}"]`);
          if (de) {
            (oe = p.current) == null || oe.getBoundingClientRect();
            const Ke = 60, Ye = {
              x: Ke,
              // Esquina izquierda con margen
              y: Ke,
              // Esquina superior con margen
              w: de.offsetWidth,
              h: de.offsetHeight,
              color: de.style.backgroundColor,
              over: !1
            };
            Re(Ye);
          }
        }
      }, 100) : (ce >= 2 || w.mechanics.includes("combo") || w.mechanics.includes("touch") && w.mechanics.includes("drag") && w.mechanics.includes("double")) && Re(null), le.current >= Ee.current.length) {
        if (!ln.current) {
          ln.current = !0;
          const fe = Math.ceil((Date.now() - br.current) / 1e3);
          No(fe);
          try {
            window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
              method: "POST",
              body: JSON.stringify({
                level: e + 1,
                // Próximo nivel desbloqueado
                total_time_s: fe,
                success: 1
              })
            }).catch((ge) => {
              console.log("No hay sesión activa para guardar progreso");
            });
          } catch (ge) {
          }
        }
        Pt.current && clearInterval(Pt.current), y(!1), nn.current = !1, e === 50 ? C(!0) : d(!0);
        try {
          T.winMelody((el.current || []).slice(0, 6));
        } catch (fe) {
        }
      }
    } else
      console.log(`Error: ficha ${v} no es la esperada (${_})`), T.fail(), yt(80, o), le.current = 0, qr("wrong-tap"), nl(), Xe.current.clear(), En(/* @__PURE__ */ new Set());
  }
  function Tf() {
    d(!1), f(!1), C(!1);
    const v = e + 1;
    t(v), setTimeout(() => Cn(v), 0);
  }
  return N.useEffect(() => {
    window.LumetrixTest = { start: Cn, state: () => ({ level: e, world: Y, levelInWorld: A, running: k, time: h, seqLen: (Ee.current || []).length }), tapExpected: () => {
      const v = Ee.current[le.current];
      v != null && rr(v);
    } };
  }, [e, Y, A, k, h]), N.useEffect(() => {
    const v = (_) => {
      var de;
      if (Me == null || V.current !== null && _.pointerId !== V.current) return;
      const I = _.clientX - re.current.x, P = _.clientY - re.current.y, M = (de = p.current) == null ? void 0 : de.querySelector(`.tile[data-id="${Me}"]`);
      if (!M) return;
      const D = Math.abs(I - nt.current.x), X = Math.abs(P - nt.current.y), ce = 5;
      (D > ce || X > ce || M.style.position === "fixed") && (M.style.position = "fixed", M.style.left = `${I}px`, M.style.top = `${P}px`, nt.current = { x: I, y: P });
      const fe = I + ((M == null ? void 0 : M.offsetWidth) || 0) / 2, ge = P + ((M == null ? void 0 : M.offsetHeight) || 0) / 2, oe = Ws(fe, ge, se, p.current, 48);
      Re((Ke) => Ke ? { ...Ke, over: oe } : null);
    }, w = (_) => {
      var ge;
      if (Me == null || V.current !== null && _.pointerId !== V.current) return;
      const I = Ee.current[le.current], P = (ge = p.current) == null ? void 0 : ge.querySelector(`.tile[data-id="${Me}"]`), M = nt.current.x, D = nt.current.y, X = M + ((P == null ? void 0 : P.offsetWidth) || 0) / 2, ce = D + ((P == null ? void 0 : P.offsetHeight) || 0) / 2, fe = Ws(X, ce, se, p.current, 48);
      if (console.debug("Drag drop validation:", {
        expected: I,
        draggingId: Me,
        special: Q.current,
        inside: fe,
        step: le.current,
        drop: se
      }), Me === I && Me === Q.current && fe && P)
        return P.style.position = "absolute", P.style.left = `${se.x + (se.w - P.offsetWidth) / 2}px`, P.style.top = `${se.y + (se.h - P.offsetHeight) / 2}px`, L(null), V.current = null, Re((oe) => oe ? { ...oe, over: !1 } : null), P && (P.classList.remove("dragging"), P.style.pointerEvents = "", P.style.zIndex = ""), Hs(Me), Vs();
      if (Me === Q.current) {
        const oe = Math.hypot(M - Co.current.x, D - Co.current.y);
        if (oe < Eo) {
          console.log(`Tap detectado (distancia: ${oe.toFixed(1)}px < ${Eo}px) - ignorando`), qr("tap-detected"), L(null), V.current = null, Re((de) => de ? { ...de, over: !1 } : null), Ef("tap");
          return;
        } else
          console.log(`Drag real fallido (distancia: ${oe.toFixed(1)}px >= ${Eo}px)`), qr("drop-miss");
      }
      L(null), V.current = null, Re((oe) => oe ? { ...oe, over: !1 } : null), Qs();
    };
    return document.addEventListener("pointermove", v, !0), document.addEventListener("pointerup", w, !0), document.addEventListener("pointercancel", w, !0), () => {
      document.removeEventListener("pointermove", v, !0), document.removeEventListener("pointerup", w, !0), document.removeEventListener("pointercancel", w, !0);
    };
  }, [Me, se, tn]), /* @__PURE__ */ m.jsxs("section", { className: "screen", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "topbar", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "brand", style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
        /* @__PURE__ */ m.jsx("img", { src: "lumetrix/img/logo2.png", alt: "LUMETRIX", style: { height: "32px", width: "auto" }, onError: (v) => {
          v.target.style.display = "none", v.target.nextSibling.style.display = "inline";
        } }),
        /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "16px", fontWeight: "900", letterSpacing: "0.1em", color: "#fff" }, children: "LUMETRIX" }),
        /* @__PURE__ */ m.jsx(
          "select",
          {
            value: e,
            onChange: (v) => {
              const w = parseInt(v.target.value);
              t(w);
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
            children: Array.from({ length: 50 }, (v, w) => w + 1).map((v) => /* @__PURE__ */ m.jsxs("option", { value: v, children: [
              "Nivel ",
              v
            ] }, v))
          }
        ),
        /* @__PURE__ */ m.jsx(
          "button",
          {
            onClick: () => Cn(e),
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
        /* @__PURE__ */ m.jsxs("button", { className: "icon", onClick: s, "aria-label": "Ranking", children: [
          /* @__PURE__ */ m.jsx("img", { src: "lumetrix/img/ico_ranking.png", alt: "Ranking", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (v) => {
            v.target.style.display = "none", v.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "🏆" })
        ] }),
        /* @__PURE__ */ m.jsxs("button", { className: "icon", onClick: u, "aria-label": "Opciones", children: [
          /* @__PURE__ */ m.jsx("img", { src: "lumetrix/img/ico_config.png", alt: "Configuración", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (v) => {
            v.target.style.display = "none", v.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "⚙️" })
        ] }),
        /* @__PURE__ */ m.jsxs("button", { className: "icon", onClick: i, "aria-label": "Login", children: [
          /* @__PURE__ */ m.jsx("img", { src: "lumetrix/img/ico_user.png", alt: "Usuario", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (v) => {
            v.target.style.display = "none", v.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "👤" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "hud", children: [
      /* @__PURE__ */ m.jsx("div", { className: "timebar", children: /* @__PURE__ */ m.jsx("i", { className: "timefill", style: { width: `${Math.max(0, Math.min(100, h / ei(e) * 100))}%` } }) }),
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
      se && /* @__PURE__ */ m.jsx(
        "div",
        {
          className: `drop-zone ${se.over ? "drag-over" : ""} ${se.hint ? "pulse" : ""}`,
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
      !k && !O && !a && /* @__PURE__ */ m.jsxs("div", { className: "overlay", style: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }, children: [
        /* @__PURE__ */ m.jsx("button", { className: "btn-start", onClick: () => Cn(), children: "EMPEZAR" }),
        /* @__PURE__ */ m.jsxs("div", { style: { marginTop: "16px", color: "#ffffff88", fontSize: "16px", fontWeight: 600 }, children: [
          "Nivel ",
          e,
          " • Mundo ",
          Y
        ] })
      ] }),
      O && /* @__PURE__ */ m.jsx("div", { className: "overlay", children: /* @__PURE__ */ m.jsxs("div", { className: "card-compact", style: { textAlign: "center" }, children: [
        /* @__PURE__ */ m.jsx("div", { style: { fontSize: 32, marginBottom: 8, textShadow: "0 0 10px var(--neon2), 0 0 20px var(--neon2)" }, children: "✨" }),
        /* @__PURE__ */ m.jsx("h3", { style: { color: "var(--neon2)", marginBottom: 12 }, children: "¡Nivel superado!" }),
        /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: Tf, children: "Siguiente" })
      ] }) }),
      a && /* @__PURE__ */ m.jsx("div", { className: "overlay", children: /* @__PURE__ */ m.jsxs("div", { className: "card-compact", style: { textAlign: "center" }, children: [
        /* @__PURE__ */ m.jsx("div", { style: { fontSize: 32, marginBottom: 8, textShadow: "0 0 10px var(--neon1), 0 0 20px var(--neon1)" }, children: "💔" }),
        /* @__PURE__ */ m.jsx("h3", { style: { color: "var(--neon1)", marginBottom: 12 }, children: "Tiempo agotado" }),
        /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: () => Cn(), children: "Reintentar" })
      ] }) }),
      x && /* @__PURE__ */ m.jsx("div", { className: "overlay", children: /* @__PURE__ */ m.jsxs("div", { className: "card-compact", style: { textAlign: "center", maxWidth: "90vw", padding: "24px" }, children: [
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
            C(!1), t(1);
          }, children: "Reiniciar" }),
          /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: () => {
            C(!1), s();
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
function s0({ onClose: e, total: t }) {
  const [n, r] = N.useState([]), [l, o] = N.useState(!0);
  N.useEffect(() => {
    (async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const c = await window.LUM_API.api("ranking.php?action=global");
          c && c.success && c.data && r(c.data.map((g, p) => ({
            rank: p + 1,
            name: g.nick,
            level: g.level,
            time: g.total_time_s,
            world: Math.floor((g.level - 1) / 10) + 1
          })));
        }
      } catch (c) {
        console.log("Error cargando ranking:", c), r([]);
      } finally {
        o(!1);
      }
    })();
  }, []);
  const i = (u) => u === 1 ? "#FFD700" : u === 2 ? "#C0C0C0" : u === 3 ? "#CD7F32" : "#00ffff", s = (u) => u === 1 ? "1" : u === 2 ? "2" : u === 3 ? "3" : u;
  return /* @__PURE__ */ m.jsx("div", { className: "modal", children: /* @__PURE__ */ m.jsxs("div", { className: "card", style: { border: "2px solid #00ffff", boxShadow: "0 0 20px #00ffff44" }, children: [
    /* @__PURE__ */ m.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #00ffff", boxShadow: "0 0 10px #00ffff", background: "#000" }, children: "✕" }),
    /* @__PURE__ */ m.jsx("h3", { style: { color: "#00ffff", marginTop: 0, textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff", fontSize: "20px" }, children: "RANKING GLOBAL" }),
    l ? /* @__PURE__ */ m.jsx("div", { style: { textAlign: "center", padding: "40px", color: "#00ffff66" }, children: "Cargando ranking..." }) : n.length === 0 ? /* @__PURE__ */ m.jsxs("div", { style: { textAlign: "center", padding: "40px", color: "#00ffff66" }, children: [
      /* @__PURE__ */ m.jsx("div", { style: { fontSize: 16, marginBottom: 8 }, children: "Aún no hay jugadores" }),
      /* @__PURE__ */ m.jsx("div", { style: { fontSize: 12 }, children: "¡Sé el primero en aparecer aquí!" })
    ] }) : /* @__PURE__ */ m.jsx("div", { className: "list", style: { gap: "8px", maxHeight: "300px", overflowY: "auto" }, children: n.map((u) => /* @__PURE__ */ m.jsxs("div", { style: {
      background: "rgba(0,255,255,0.1)",
      border: "1px solid #00ffff33",
      borderRadius: "8px",
      padding: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ m.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
        /* @__PURE__ */ m.jsxs("span", { style: {
          color: i(u.rank),
          fontWeight: "bold",
          fontSize: "14px",
          minWidth: "30px"
        }, children: [
          "#",
          s(u.rank)
        ] }),
        /* @__PURE__ */ m.jsx("span", { style: { color: "#fff", fontSize: "12px" }, children: u.name })
      ] }),
      /* @__PURE__ */ m.jsxs("div", { style: { textAlign: "right", fontSize: "11px", opacity: 0.8 }, children: [
        /* @__PURE__ */ m.jsxs("div", { children: [
          "Mundo ",
          u.world,
          " • Nivel ",
          u.level
        ] }),
        /* @__PURE__ */ m.jsxs("div", { style: { color: "#00ffff" }, children: [
          Math.round(u.time),
          "s"
        ] })
      ] })
    ] }, u.rank)) })
  ] }) });
}
function u0({ onClose: e, onOpenAuth: t, level: n, setLevel: r, soundOn: l, musicOn: o, vibrateOn: i, setSoundOn: s, setMusicOn: u, setVibrateOn: c, onResetTotal: g, musicVolume: p, setMusicVolume: h }) {
  const [S, k] = N.useState(null), [y, O] = N.useState(!1);
  N.useEffect(() => {
    (async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const f = await window.LUM_API.api("auth.php?action=check_session");
          f && f.success && (O(!0), k(f.user));
        }
      } catch (f) {
        O(!1);
      }
    })();
  }, []);
  const d = async () => {
    try {
      await window.LUM_API.api("auth.php?action=logout"), window.location.reload();
    } catch (a) {
      console.log("Error al cerrar sesión");
    }
  };
  return /* @__PURE__ */ m.jsx("div", { className: "modal", children: /* @__PURE__ */ m.jsxs("div", { className: "card", style: { border: "2px solid #39ff14", boxShadow: "0 0 20px #39ff1444" }, children: [
    /* @__PURE__ */ m.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #39ff14", boxShadow: "0 0 10px #39ff14", background: "#000" }, children: "✕" }),
    /* @__PURE__ */ m.jsx("h3", { style: { color: "#39ff14", marginTop: 0, textShadow: "0 0 10px #39ff14, 0 0 20px #39ff14", fontSize: "20px" }, children: "CONFIGURACIÓN" }),
    /* @__PURE__ */ m.jsxs("div", { className: "list", style: { gap: "12px" }, children: [
      /* @__PURE__ */ m.jsxs("label", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ m.jsx("span", { style: { color: "#39ff14", fontWeight: "bold" }, children: "Música de fondo" }),
        /* @__PURE__ */ m.jsx("input", { type: "checkbox", checked: o, onChange: (a) => u(a.target.checked), style: { transform: "scale(1.2)", accentColor: "#39ff14" } })
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
            onChange: (a) => h(parseFloat(a.target.value)),
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
        /* @__PURE__ */ m.jsx("input", { type: "checkbox", checked: i, onChange: (a) => c(a.target.checked), style: { transform: "scale(1.2)", accentColor: "#39ff14" } })
      ] }),
      y ? /* @__PURE__ */ m.jsxs("div", { style: { background: "rgba(0,255,255,0.1)", border: "1px solid #00ffff33", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ m.jsx("div", { style: { fontSize: 12, opacity: 0.7, marginBottom: 4 }, children: "Sesión activa:" }),
        /* @__PURE__ */ m.jsx("div", { style: { color: "#00ffff", fontWeight: "bold", marginBottom: 8 }, children: (S == null ? void 0 : S.nick) || (S == null ? void 0 : S.email) }),
        /* @__PURE__ */ m.jsx(
          "button",
          {
            className: "btn",
            onClick: d,
            style: { border: "2px solid #ff00ff", color: "#ff00ff", boxShadow: "0 0 10px #ff00ff44", fontWeight: "bold", width: "100%" },
            children: "Cerrar sesión"
          }
        )
      ] }) : /* @__PURE__ */ m.jsx(
        "button",
        {
          className: "btn",
          onClick: t,
          style: { border: "2px solid #00ffff", color: "#00ffff", boxShadow: "0 0 10px #00ffff44", fontWeight: "bold" },
          children: "Entrar"
        }
      )
    ] })
  ] }) });
}
function a0({ onClose: e }) {
  const [t, n] = N.useState("login"), [r, l] = N.useState(""), [o, i] = N.useState(""), [s, u] = N.useState(""), [c, g] = N.useState(""), [p, h] = N.useState(!1), S = async () => {
    if (!r || !o || !s) {
      g("❌ Rellena todos los campos");
      return;
    }
    h(!0), g("");
    try {
      const y = await window.LUM_API.api("auth.php?action=register", {
        method: "POST",
        body: JSON.stringify({ username: r, email: o, password: s })
      });
      y.success ? (g("✅ ¡Registrado! Ahora inicia sesión"), n("login"), u("")) : g("❌ " + (y.message || "Error en registro"));
    } catch (y) {
      g("❌ Error de conexión");
    }
    h(!1);
  }, k = async () => {
    if (!o || !s) {
      g("❌ Rellena email y contraseña");
      return;
    }
    h(!0), g("");
    try {
      const y = await window.LUM_API.api("auth.php?action=login", {
        method: "POST",
        body: JSON.stringify({ username: o, password: s })
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
          value: s,
          onChange: (y) => u(y.target.value),
          onKeyPress: (y) => y.key === "Enter" && (t === "login" ? k() : S()),
          style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#fff", boxShadow: "0 0 10px #ff00ff22", outline: "none" }
        }
      ),
      c && /* @__PURE__ */ m.jsx("div", { style: { fontSize: 14, textAlign: "center", marginTop: 4, color: c.includes("✅") ? "#39ff14" : "#ff4466" }, children: c }),
      /* @__PURE__ */ m.jsxs("div", { style: { display: "flex", gap: 12, justifyContent: "center", marginTop: 8 }, children: [
        /* @__PURE__ */ m.jsx(
          "button",
          {
            className: "btn btn1",
            onClick: t === "login" ? k : S,
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
  ] }) });
}
function c0() {
  l0();
  const [e, t] = N.useState("intro"), [n, r] = N.useState(!1), [l, o] = N.useState(!1), [i, s] = N.useState(!1), [u, c] = N.useState(!0), [g, p] = N.useState(!0), [h, S] = N.useState(0.15), [k, y] = N.useState(!0), [O, d] = N.useState(1), [a, f] = N.useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0;
    } catch (x) {
      return 0;
    }
  });
  return N.useEffect(() => {
    (async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const C = await window.LUM_API.api("auth.php?action=check_session");
          if (C && C.success) {
            const z = await window.LUM_API.api("game.php?action=get_progress");
            if (z && z.success && z.data) {
              const j = z.data.nivel_actual || 1, T = z.data.total_time_s || 0;
              d(j), f(T), console.log(`Progreso cargado: Nivel ${j}, Tiempo ${T}s`);
            }
          }
        }
      } catch (C) {
        console.log("Sin progreso guardado, empezando desde nivel 1");
      }
    })();
  }, []), N.useEffect(() => {
    window.LumetrixTest = Object.assign({}, window.LumetrixTest, { help: "LumetrixTest.start(), .tapExpected(), .state() — tras pulsar Jugar" });
  }, []), /* @__PURE__ */ m.jsx("div", { className: "shell", children: /* @__PURE__ */ m.jsxs("div", { className: "device", children: [
    e === "intro" ? /* @__PURE__ */ m.jsx(o0, { onPlay: () => t("game"), onAuth: () => s(!0) }) : /* @__PURE__ */ m.jsx(
      i0,
      {
        level: O,
        setLevel: d,
        soundOn: u,
        musicOn: g,
        musicVolume: h,
        vibrateOn: k,
        onOpenAuth: () => s(!0),
        onOpenRanking: () => r(!0),
        onOpenOptions: () => o(!0),
        onTotalUpdate: f,
        totalTime: a
      }
    ),
    n && /* @__PURE__ */ m.jsx(s0, { onClose: () => r(!1), total: a }),
    l && /* @__PURE__ */ m.jsx(
      u0,
      {
        onClose: () => o(!1),
        onOpenAuth: () => {
          o(!1), s(!0);
        },
        level: O,
        setLevel: d,
        soundOn: u,
        musicOn: g,
        vibrateOn: k,
        setSoundOn: c,
        setMusicOn: p,
        setVibrateOn: y,
        musicVolume: h,
        setMusicVolume: S,
        onResetTotal: () => {
          try {
            localStorage.removeItem("lum_total");
          } catch (x) {
          }
          f(0);
        }
      }
    ),
    i && /* @__PURE__ */ m.jsx(a0, { onClose: () => s(!1) })
  ] }) });
}
function m0(e) {
  const t = kf(e);
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
