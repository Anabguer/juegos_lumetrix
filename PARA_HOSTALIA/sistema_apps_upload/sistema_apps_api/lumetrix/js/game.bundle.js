var ia = { exports: {} }, to = {}, ua = { exports: {} }, B = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ur = Symbol.for("react.element"), Tf = Symbol.for("react.portal"), Nf = Symbol.for("react.fragment"), zf = Symbol.for("react.strict_mode"), Rf = Symbol.for("react.profiler"), jf = Symbol.for("react.provider"), Lf = Symbol.for("react.context"), Pf = Symbol.for("react.forward_ref"), Mf = Symbol.for("react.suspense"), Of = Symbol.for("react.memo"), If = Symbol.for("react.lazy"), Ku = Symbol.iterator;
function Df(e) {
  return e === null || typeof e != "object" ? null : (e = Ku && e[Ku] || e["@@iterator"], typeof e == "function" ? e : null);
}
var sa = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, aa = Object.assign, ca = {};
function qn(e, t, n) {
  this.props = e, this.context = t, this.refs = ca, this.updater = n || sa;
}
qn.prototype.isReactComponent = {};
qn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
qn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function fa() {
}
fa.prototype = qn.prototype;
function Vi(e, t, n) {
  this.props = e, this.context = t, this.refs = ca, this.updater = n || sa;
}
var Qi = Vi.prototype = new fa();
Qi.constructor = Vi;
aa(Qi, qn.prototype);
Qi.isPureReactComponent = !0;
var Yu = Array.isArray, da = Object.prototype.hasOwnProperty, Xi = { current: null }, pa = { key: !0, ref: !0, __self: !0, __source: !0 };
function ha(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) da.call(t, r) && !pa.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var s = Array(u), c = 0; c < u; c++) s[c] = arguments[c + 2];
    l.children = s;
  }
  if (e && e.defaultProps) for (r in u = e.defaultProps, u) l[r] === void 0 && (l[r] = u[r]);
  return { $$typeof: Ur, type: e, key: o, ref: i, props: l, _owner: Xi.current };
}
function $f(e, t) {
  return { $$typeof: Ur, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Ki(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Ur;
}
function Ff(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Gu = /\/+/g;
function _o(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Ff("" + e.key) : t.toString(36);
}
function xl(e, t, n, r, l) {
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
        case Ur:
        case Tf:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + _o(i, 0) : r, Yu(l) ? (n = "", e != null && (n = e.replace(Gu, "$&/") + "/"), xl(l, t, n, "", function(c) {
    return c;
  })) : l != null && (Ki(l) && (l = $f(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Gu, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", Yu(e)) for (var u = 0; u < e.length; u++) {
    o = e[u];
    var s = r + _o(o, u);
    i += xl(o, t, n, s, l);
  }
  else if (s = Df(e), typeof s == "function") for (e = s.call(e), u = 0; !(o = e.next()).done; ) o = o.value, s = r + _o(o, u++), i += xl(o, t, n, s, l);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function nl(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return xl(e, r, "", "", function(o) {
    return t.call(n, o, l++);
  }), r;
}
function Af(e) {
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
var je = { current: null }, wl = { transition: null }, Uf = { ReactCurrentDispatcher: je, ReactCurrentBatchConfig: wl, ReactCurrentOwner: Xi };
function ma() {
  throw Error("act(...) is not supported in production builds of React.");
}
B.Children = { map: nl, forEach: function(e, t, n) {
  nl(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return nl(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return nl(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Ki(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
B.Component = qn;
B.Fragment = Nf;
B.Profiler = Rf;
B.PureComponent = Vi;
B.StrictMode = zf;
B.Suspense = Mf;
B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Uf;
B.act = ma;
B.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = aa({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = Xi.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var u = e.type.defaultProps;
    for (s in t) da.call(t, s) && !pa.hasOwnProperty(s) && (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    u = Array(s);
    for (var c = 0; c < s; c++) u[c] = arguments[c + 2];
    r.children = u;
  }
  return { $$typeof: Ur, type: e.type, key: l, ref: o, props: r, _owner: i };
};
B.createContext = function(e) {
  return e = { $$typeof: Lf, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: jf, _context: e }, e.Consumer = e;
};
B.createElement = ha;
B.createFactory = function(e) {
  var t = ha.bind(null, e);
  return t.type = e, t;
};
B.createRef = function() {
  return { current: null };
};
B.forwardRef = function(e) {
  return { $$typeof: Pf, render: e };
};
B.isValidElement = Ki;
B.lazy = function(e) {
  return { $$typeof: If, _payload: { _status: -1, _result: e }, _init: Af };
};
B.memo = function(e, t) {
  return { $$typeof: Of, type: e, compare: t === void 0 ? null : t };
};
B.startTransition = function(e) {
  var t = wl.transition;
  wl.transition = {};
  try {
    e();
  } finally {
    wl.transition = t;
  }
};
B.unstable_act = ma;
B.useCallback = function(e, t) {
  return je.current.useCallback(e, t);
};
B.useContext = function(e) {
  return je.current.useContext(e);
};
B.useDebugValue = function() {
};
B.useDeferredValue = function(e) {
  return je.current.useDeferredValue(e);
};
B.useEffect = function(e, t) {
  return je.current.useEffect(e, t);
};
B.useId = function() {
  return je.current.useId();
};
B.useImperativeHandle = function(e, t, n) {
  return je.current.useImperativeHandle(e, t, n);
};
B.useInsertionEffect = function(e, t) {
  return je.current.useInsertionEffect(e, t);
};
B.useLayoutEffect = function(e, t) {
  return je.current.useLayoutEffect(e, t);
};
B.useMemo = function(e, t) {
  return je.current.useMemo(e, t);
};
B.useReducer = function(e, t, n) {
  return je.current.useReducer(e, t, n);
};
B.useRef = function(e) {
  return je.current.useRef(e);
};
B.useState = function(e) {
  return je.current.useState(e);
};
B.useSyncExternalStore = function(e, t, n) {
  return je.current.useSyncExternalStore(e, t, n);
};
B.useTransition = function() {
  return je.current.useTransition();
};
B.version = "18.3.1";
ua.exports = B;
var R = ua.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bf = R, Wf = Symbol.for("react.element"), Hf = Symbol.for("react.fragment"), Vf = Object.prototype.hasOwnProperty, Qf = Bf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Xf = { key: !0, ref: !0, __self: !0, __source: !0 };
function ga(e, t, n) {
  var r, l = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) Vf.call(t, r) && !Xf.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Wf, type: e, key: o, ref: i, props: l, _owner: Qf.current };
}
to.Fragment = Hf;
to.jsx = ga;
to.jsxs = ga;
ia.exports = to;
var m = ia.exports, ya = { exports: {} }, Qe = {}, va = { exports: {} }, xa = {};
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
  function t(z, $) {
    var D = z.length;
    z.push($);
    e: for (; 0 < D; ) {
      var V = D - 1 >>> 1, le = z[V];
      if (0 < l(le, $)) z[V] = $, z[D] = le, D = V;
      else break e;
    }
  }
  function n(z) {
    return z.length === 0 ? null : z[0];
  }
  function r(z) {
    if (z.length === 0) return null;
    var $ = z[0], D = z.pop();
    if (D !== $) {
      z[0] = D;
      e: for (var V = 0, le = z.length, tt = le >>> 1; V < tt; ) {
        var Q = 2 * (V + 1) - 1, Ke = z[Q], jt = Q + 1, yt = z[jt];
        if (0 > l(Ke, D)) jt < le && 0 > l(yt, Ke) ? (z[V] = yt, z[jt] = D, V = jt) : (z[V] = Ke, z[Q] = D, V = Q);
        else if (jt < le && 0 > l(yt, D)) z[V] = yt, z[jt] = D, V = jt;
        else break e;
      }
    }
    return $;
  }
  function l(z, $) {
    var D = z.sortIndex - $.sortIndex;
    return D !== 0 ? D : z.id - $.id;
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
  var s = [], c = [], g = 1, p = null, h = 3, S = !1, E = !1, v = !1, A = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, a = typeof setImmediate != "undefined" ? setImmediate : null;
  typeof navigator != "undefined" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function d(z) {
    for (var $ = n(c); $ !== null; ) {
      if ($.callback === null) r(c);
      else if ($.startTime <= z) r(c), $.sortIndex = $.expirationTime, t(s, $);
      else break;
      $ = n(c);
    }
  }
  function x(z) {
    if (v = !1, d(z), !E) if (n(s) !== null) E = !0, Pe(_);
    else {
      var $ = n(c);
      $ !== null && Me(x, $.startTime - z);
    }
  }
  function _(z, $) {
    E = !1, v && (v = !1, f(N), N = -1), S = !0;
    var D = h;
    try {
      for (d($), p = n(s); p !== null && (!(p.expirationTime > $) || z && !ae()); ) {
        var V = p.callback;
        if (typeof V == "function") {
          p.callback = null, h = p.priorityLevel;
          var le = V(p.expirationTime <= $);
          $ = e.unstable_now(), typeof le == "function" ? p.callback = le : p === n(s) && r(s), d($);
        } else r(s);
        p = n(s);
      }
      if (p !== null) var tt = !0;
      else {
        var Q = n(c);
        Q !== null && Me(x, Q.startTime - $), tt = !1;
      }
      return tt;
    } finally {
      p = null, h = D, S = !1;
    }
  }
  var j = !1, P = null, N = -1, K = 5, U = -1;
  function ae() {
    return !(e.unstable_now() - U < K);
  }
  function tn() {
    if (P !== null) {
      var z = e.unstable_now();
      U = z;
      var $ = !0;
      try {
        $ = P(!0, z);
      } finally {
        $ ? nn() : (j = !1, P = null);
      }
    } else j = !1;
  }
  var nn;
  if (typeof a == "function") nn = function() {
    a(tn);
  };
  else if (typeof MessageChannel != "undefined") {
    var vo = new MessageChannel(), ue = vo.port2;
    vo.port1.onmessage = tn, nn = function() {
      ue.postMessage(null);
    };
  } else nn = function() {
    A(tn, 0);
  };
  function Pe(z) {
    P = z, j || (j = !0, nn());
  }
  function Me(z, $) {
    N = A(function() {
      z(e.unstable_now());
    }, $);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(z) {
    z.callback = null;
  }, e.unstable_continueExecution = function() {
    E || S || (E = !0, Pe(_));
  }, e.unstable_forceFrameRate = function(z) {
    0 > z || 125 < z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : K = 0 < z ? Math.floor(1e3 / z) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(s);
  }, e.unstable_next = function(z) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var $ = 3;
        break;
      default:
        $ = h;
    }
    var D = h;
    h = $;
    try {
      return z();
    } finally {
      h = D;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(z, $) {
    switch (z) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        z = 3;
    }
    var D = h;
    h = z;
    try {
      return $();
    } finally {
      h = D;
    }
  }, e.unstable_scheduleCallback = function(z, $, D) {
    var V = e.unstable_now();
    switch (typeof D == "object" && D !== null ? (D = D.delay, D = typeof D == "number" && 0 < D ? V + D : V) : D = V, z) {
      case 1:
        var le = -1;
        break;
      case 2:
        le = 250;
        break;
      case 5:
        le = 1073741823;
        break;
      case 4:
        le = 1e4;
        break;
      default:
        le = 5e3;
    }
    return le = D + le, z = { id: g++, callback: $, priorityLevel: z, startTime: D, expirationTime: le, sortIndex: -1 }, D > V ? (z.sortIndex = D, t(c, z), n(s) === null && z === n(c) && (v ? (f(N), N = -1) : v = !0, Me(x, D - V))) : (z.sortIndex = le, t(s, z), E || S || (E = !0, Pe(_))), z;
  }, e.unstable_shouldYield = ae, e.unstable_wrapCallback = function(z) {
    var $ = h;
    return function() {
      var D = h;
      h = $;
      try {
        return z.apply(this, arguments);
      } finally {
        h = D;
      }
    };
  };
})(xa);
va.exports = xa;
var Kf = va.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yf = R, Ve = Kf;
function k(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var wa = /* @__PURE__ */ new Set(), Er = {};
function wn(e, t) {
  Qn(e, t), Qn(e + "Capture", t);
}
function Qn(e, t) {
  for (Er[e] = t, e = 0; e < t.length; e++) wa.add(t[e]);
}
var _t = !(typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined"), qo = Object.prototype.hasOwnProperty, Gf = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ju = {}, Zu = {};
function Jf(e) {
  return qo.call(Zu, e) ? !0 : qo.call(Ju, e) ? !1 : Gf.test(e) ? Zu[e] = !0 : (Ju[e] = !0, !1);
}
function Zf(e, t, n, r) {
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
function qf(e, t, n, r) {
  if (t === null || typeof t == "undefined" || Zf(e, t, n, r)) return !0;
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
var Yi = /[\-:]([a-z])/g;
function Gi(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Yi,
    Gi
  );
  ke[t] = new Le(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Yi, Gi);
  ke[t] = new Le(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Yi, Gi);
  ke[t] = new Le(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ke[e] = new Le(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ke.xlinkHref = new Le("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ke[e] = new Le(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Ji(e, t, n, r) {
  var l = ke.hasOwnProperty(t) ? ke[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (qf(t, n, l, r) && (n = null), r || l === null ? Jf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Rt = Yf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, rl = Symbol.for("react.element"), Nn = Symbol.for("react.portal"), zn = Symbol.for("react.fragment"), Zi = Symbol.for("react.strict_mode"), bo = Symbol.for("react.profiler"), Sa = Symbol.for("react.provider"), ka = Symbol.for("react.context"), qi = Symbol.for("react.forward_ref"), ei = Symbol.for("react.suspense"), ti = Symbol.for("react.suspense_list"), bi = Symbol.for("react.memo"), It = Symbol.for("react.lazy"), Ea = Symbol.for("react.offscreen"), qu = Symbol.iterator;
function nr(e) {
  return e === null || typeof e != "object" ? null : (e = qu && e[qu] || e["@@iterator"], typeof e == "function" ? e : null);
}
var re = Object.assign, To;
function cr(e) {
  if (To === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    To = t && t[1] || "";
  }
  return `
` + To + e;
}
var No = !1;
function zo(e, t) {
  if (!e || No) return "";
  No = !0;
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
    No = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? cr(e) : "";
}
function bf(e) {
  switch (e.tag) {
    case 5:
      return cr(e.type);
    case 16:
      return cr("Lazy");
    case 13:
      return cr("Suspense");
    case 19:
      return cr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = zo(e.type, !1), e;
    case 11:
      return e = zo(e.type.render, !1), e;
    case 1:
      return e = zo(e.type, !0), e;
    default:
      return "";
  }
}
function ni(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case zn:
      return "Fragment";
    case Nn:
      return "Portal";
    case bo:
      return "Profiler";
    case Zi:
      return "StrictMode";
    case ei:
      return "Suspense";
    case ti:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case ka:
      return (e.displayName || "Context") + ".Consumer";
    case Sa:
      return (e._context.displayName || "Context") + ".Provider";
    case qi:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case bi:
      return t = e.displayName || null, t !== null ? t : ni(e.type) || "Memo";
    case It:
      t = e._payload, e = e._init;
      try {
        return ni(e(t));
      } catch (n) {
      }
  }
  return null;
}
function ed(e) {
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
      return ni(t);
    case 8:
      return t === Zi ? "StrictMode" : "Mode";
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
function Jt(e) {
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
function Ca(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function td(e) {
  var t = Ca(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function ll(e) {
  e._valueTracker || (e._valueTracker = td(e));
}
function _a(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Ca(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Ll(e) {
  if (e = e || (typeof document != "undefined" ? document : void 0), typeof e == "undefined") return null;
  try {
    return e.activeElement || e.body;
  } catch (t) {
    return e.body;
  }
}
function ri(e, t) {
  var n = t.checked;
  return re({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n != null ? n : e._wrapperState.initialChecked });
}
function bu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = Jt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Ta(e, t) {
  t = t.checked, t != null && Ji(e, "checked", t, !1);
}
function li(e, t) {
  Ta(e, t);
  var n = Jt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? oi(e, t.type, n) : t.hasOwnProperty("defaultValue") && oi(e, t.type, Jt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function es(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function oi(e, t, n) {
  (t !== "number" || Ll(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var fr = Array.isArray;
function An(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Jt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function ii(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(k(91));
  return re({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function ts(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(k(92));
      if (fr(n)) {
        if (1 < n.length) throw Error(k(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: Jt(n) };
}
function Na(e, t) {
  var n = Jt(t.value), r = Jt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function ns(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function za(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ui(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? za(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var ol, Ra = function(e) {
  return typeof MSApp != "undefined" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (ol = ol || document.createElement("div"), ol.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = ol.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Cr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var hr = {
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
}, nd = ["Webkit", "ms", "Moz", "O"];
Object.keys(hr).forEach(function(e) {
  nd.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), hr[t] = hr[e];
  });
});
function ja(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || hr.hasOwnProperty(e) && hr[e] ? ("" + t).trim() : t + "px";
}
function La(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = ja(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var rd = re({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function si(e, t) {
  if (t) {
    if (rd[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(k(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(k(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(k(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(k(62));
  }
}
function ai(e, t) {
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
var ci = null;
function eu(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var fi = null, Un = null, Bn = null;
function rs(e) {
  if (e = Hr(e)) {
    if (typeof fi != "function") throw Error(k(280));
    var t = e.stateNode;
    t && (t = io(t), fi(e.stateNode, e.type, t));
  }
}
function Pa(e) {
  Un ? Bn ? Bn.push(e) : Bn = [e] : Un = e;
}
function Ma() {
  if (Un) {
    var e = Un, t = Bn;
    if (Bn = Un = null, rs(e), t) for (e = 0; e < t.length; e++) rs(t[e]);
  }
}
function Oa(e, t) {
  return e(t);
}
function Ia() {
}
var Ro = !1;
function Da(e, t, n) {
  if (Ro) return e(t, n);
  Ro = !0;
  try {
    return Oa(e, t, n);
  } finally {
    Ro = !1, (Un !== null || Bn !== null) && (Ia(), Ma());
  }
}
function _r(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = io(n);
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
  if (n && typeof n != "function") throw Error(k(231, t, typeof n));
  return n;
}
var di = !1;
if (_t) try {
  var rr = {};
  Object.defineProperty(rr, "passive", { get: function() {
    di = !0;
  } }), window.addEventListener("test", rr, rr), window.removeEventListener("test", rr, rr);
} catch (e) {
  di = !1;
}
function ld(e, t, n, r, l, o, i, u, s) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (g) {
    this.onError(g);
  }
}
var mr = !1, Pl = null, Ml = !1, pi = null, od = { onError: function(e) {
  mr = !0, Pl = e;
} };
function id(e, t, n, r, l, o, i, u, s) {
  mr = !1, Pl = null, ld.apply(od, arguments);
}
function ud(e, t, n, r, l, o, i, u, s) {
  if (id.apply(this, arguments), mr) {
    if (mr) {
      var c = Pl;
      mr = !1, Pl = null;
    } else throw Error(k(198));
    Ml || (Ml = !0, pi = c);
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
function $a(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function ls(e) {
  if (Sn(e) !== e) throw Error(k(188));
}
function sd(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Sn(e), t === null) throw Error(k(188));
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
        if (o === n) return ls(l), e;
        if (o === r) return ls(l), t;
        o = o.sibling;
      }
      throw Error(k(188));
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
        if (!i) throw Error(k(189));
      }
    }
    if (n.alternate !== r) throw Error(k(190));
  }
  if (n.tag !== 3) throw Error(k(188));
  return n.stateNode.current === n ? e : t;
}
function Fa(e) {
  return e = sd(e), e !== null ? Aa(e) : null;
}
function Aa(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Aa(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Ua = Ve.unstable_scheduleCallback, os = Ve.unstable_cancelCallback, ad = Ve.unstable_shouldYield, cd = Ve.unstable_requestPaint, se = Ve.unstable_now, fd = Ve.unstable_getCurrentPriorityLevel, tu = Ve.unstable_ImmediatePriority, Ba = Ve.unstable_UserBlockingPriority, Ol = Ve.unstable_NormalPriority, dd = Ve.unstable_LowPriority, Wa = Ve.unstable_IdlePriority, no = null, mt = null;
function pd(e) {
  if (mt && typeof mt.onCommitFiberRoot == "function") try {
    mt.onCommitFiberRoot(no, e, void 0, (e.current.flags & 128) === 128);
  } catch (t) {
  }
}
var it = Math.clz32 ? Math.clz32 : gd, hd = Math.log, md = Math.LN2;
function gd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (hd(e) / md | 0) | 0;
}
var il = 64, ul = 4194304;
function dr(e) {
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
function Il(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var u = i & ~l;
    u !== 0 ? r = dr(u) : (o &= i, o !== 0 && (r = dr(o)));
  } else i = n & ~l, i !== 0 ? r = dr(i) : o !== 0 && (r = dr(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - it(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function yd(e, t) {
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
function vd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - it(o), u = 1 << i, s = l[i];
    s === -1 ? (!(u & n) || u & r) && (l[i] = yd(u, t)) : s <= t && (e.expiredLanes |= u), o &= ~u;
  }
}
function hi(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ha() {
  var e = il;
  return il <<= 1, !(il & 4194240) && (il = 64), e;
}
function jo(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Br(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - it(t), e[t] = n;
}
function xd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - it(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function nu(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - it(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var X = 0;
function Va(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Qa, ru, Xa, Ka, Ya, mi = !1, sl = [], Wt = null, Ht = null, Vt = null, Tr = /* @__PURE__ */ new Map(), Nr = /* @__PURE__ */ new Map(), Ft = [], wd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function is(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Wt = null;
      break;
    case "dragenter":
    case "dragleave":
      Ht = null;
      break;
    case "mouseover":
    case "mouseout":
      Vt = null;
      break;
    case "pointerover":
    case "pointerout":
      Tr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Nr.delete(t.pointerId);
  }
}
function lr(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = Hr(t), t !== null && ru(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Sd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return Wt = lr(Wt, e, t, n, r, l), !0;
    case "dragenter":
      return Ht = lr(Ht, e, t, n, r, l), !0;
    case "mouseover":
      return Vt = lr(Vt, e, t, n, r, l), !0;
    case "pointerover":
      var o = l.pointerId;
      return Tr.set(o, lr(Tr.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return o = l.pointerId, Nr.set(o, lr(Nr.get(o) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Ga(e) {
  var t = cn(e.target);
  if (t !== null) {
    var n = Sn(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = $a(n), t !== null) {
          e.blockedOn = t, Ya(e.priority, function() {
            Xa(n);
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
function Sl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = gi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ci = r, n.target.dispatchEvent(r), ci = null;
    } else return t = Hr(n), t !== null && ru(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function us(e, t, n) {
  Sl(e) && n.delete(t);
}
function kd() {
  mi = !1, Wt !== null && Sl(Wt) && (Wt = null), Ht !== null && Sl(Ht) && (Ht = null), Vt !== null && Sl(Vt) && (Vt = null), Tr.forEach(us), Nr.forEach(us);
}
function or(e, t) {
  e.blockedOn === t && (e.blockedOn = null, mi || (mi = !0, Ve.unstable_scheduleCallback(Ve.unstable_NormalPriority, kd)));
}
function zr(e) {
  function t(l) {
    return or(l, e);
  }
  if (0 < sl.length) {
    or(sl[0], e);
    for (var n = 1; n < sl.length; n++) {
      var r = sl[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (Wt !== null && or(Wt, e), Ht !== null && or(Ht, e), Vt !== null && or(Vt, e), Tr.forEach(t), Nr.forEach(t), n = 0; n < Ft.length; n++) r = Ft[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Ft.length && (n = Ft[0], n.blockedOn === null); ) Ga(n), n.blockedOn === null && Ft.shift();
}
var Wn = Rt.ReactCurrentBatchConfig, Dl = !0;
function Ed(e, t, n, r) {
  var l = X, o = Wn.transition;
  Wn.transition = null;
  try {
    X = 1, lu(e, t, n, r);
  } finally {
    X = l, Wn.transition = o;
  }
}
function Cd(e, t, n, r) {
  var l = X, o = Wn.transition;
  Wn.transition = null;
  try {
    X = 4, lu(e, t, n, r);
  } finally {
    X = l, Wn.transition = o;
  }
}
function lu(e, t, n, r) {
  if (Dl) {
    var l = gi(e, t, n, r);
    if (l === null) Uo(e, t, r, $l, n), is(e, r);
    else if (Sd(l, e, t, n, r)) r.stopPropagation();
    else if (is(e, r), t & 4 && -1 < wd.indexOf(e)) {
      for (; l !== null; ) {
        var o = Hr(l);
        if (o !== null && Qa(o), o = gi(e, t, n, r), o === null && Uo(e, t, r, $l, n), o === l) break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Uo(e, t, r, null, n);
  }
}
var $l = null;
function gi(e, t, n, r) {
  if ($l = null, e = eu(r), e = cn(e), e !== null) if (t = Sn(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = $a(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return $l = e, null;
}
function Ja(e) {
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
      switch (fd()) {
        case tu:
          return 1;
        case Ba:
          return 4;
        case Ol:
        case dd:
          return 16;
        case Wa:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Ut = null, ou = null, kl = null;
function Za() {
  if (kl) return kl;
  var e, t = ou, n = t.length, r, l = "value" in Ut ? Ut.value : Ut.textContent, o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
  return kl = l.slice(e, 1 < r ? 1 - r : void 0);
}
function El(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function al() {
  return !0;
}
function ss() {
  return !1;
}
function Xe(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var u in e) e.hasOwnProperty(u) && (n = e[u], this[u] = n ? n(o) : o[u]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? al : ss, this.isPropagationStopped = ss, this;
  }
  return re(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = al);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = al);
  }, persist: function() {
  }, isPersistent: al }), t;
}
var bn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, iu = Xe(bn), Wr = re({}, bn, { view: 0, detail: 0 }), _d = Xe(Wr), Lo, Po, ir, ro = re({}, Wr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: uu, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== ir && (ir && e.type === "mousemove" ? (Lo = e.screenX - ir.screenX, Po = e.screenY - ir.screenY) : Po = Lo = 0, ir = e), Lo);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Po;
} }), as = Xe(ro), Td = re({}, ro, { dataTransfer: 0 }), Nd = Xe(Td), zd = re({}, Wr, { relatedTarget: 0 }), Mo = Xe(zd), Rd = re({}, bn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), jd = Xe(Rd), Ld = re({}, bn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Pd = Xe(Ld), Md = re({}, bn, { data: 0 }), cs = Xe(Md), Od = {
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
}, Id = {
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
}, Dd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function $d(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Dd[e]) ? !!t[e] : !1;
}
function uu() {
  return $d;
}
var Fd = re({}, Wr, { key: function(e) {
  if (e.key) {
    var t = Od[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = El(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Id[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: uu, charCode: function(e) {
  return e.type === "keypress" ? El(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? El(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Ad = Xe(Fd), Ud = re({}, ro, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), fs = Xe(Ud), Bd = re({}, Wr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: uu }), Wd = Xe(Bd), Hd = re({}, bn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Vd = Xe(Hd), Qd = re({}, ro, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Xd = Xe(Qd), Kd = [9, 13, 27, 32], su = _t && "CompositionEvent" in window, gr = null;
_t && "documentMode" in document && (gr = document.documentMode);
var Yd = _t && "TextEvent" in window && !gr, qa = _t && (!su || gr && 8 < gr && 11 >= gr), ds = " ", ps = !1;
function ba(e, t) {
  switch (e) {
    case "keyup":
      return Kd.indexOf(t.keyCode) !== -1;
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
function ec(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Rn = !1;
function Gd(e, t) {
  switch (e) {
    case "compositionend":
      return ec(t);
    case "keypress":
      return t.which !== 32 ? null : (ps = !0, ds);
    case "textInput":
      return e = t.data, e === ds && ps ? null : e;
    default:
      return null;
  }
}
function Jd(e, t) {
  if (Rn) return e === "compositionend" || !su && ba(e, t) ? (e = Za(), kl = ou = Ut = null, Rn = !1, e) : null;
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
      return qa && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Zd = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function hs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Zd[e.type] : t === "textarea";
}
function tc(e, t, n, r) {
  Pa(r), t = Fl(t, "onChange"), 0 < t.length && (n = new iu("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var yr = null, Rr = null;
function qd(e) {
  dc(e, 0);
}
function lo(e) {
  var t = Pn(e);
  if (_a(t)) return e;
}
function bd(e, t) {
  if (e === "change") return t;
}
var nc = !1;
if (_t) {
  var Oo;
  if (_t) {
    var Io = "oninput" in document;
    if (!Io) {
      var ms = document.createElement("div");
      ms.setAttribute("oninput", "return;"), Io = typeof ms.oninput == "function";
    }
    Oo = Io;
  } else Oo = !1;
  nc = Oo && (!document.documentMode || 9 < document.documentMode);
}
function gs() {
  yr && (yr.detachEvent("onpropertychange", rc), Rr = yr = null);
}
function rc(e) {
  if (e.propertyName === "value" && lo(Rr)) {
    var t = [];
    tc(t, Rr, e, eu(e)), Da(qd, t);
  }
}
function ep(e, t, n) {
  e === "focusin" ? (gs(), yr = t, Rr = n, yr.attachEvent("onpropertychange", rc)) : e === "focusout" && gs();
}
function tp(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return lo(Rr);
}
function np(e, t) {
  if (e === "click") return lo(t);
}
function rp(e, t) {
  if (e === "input" || e === "change") return lo(t);
}
function lp(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var st = typeof Object.is == "function" ? Object.is : lp;
function jr(e, t) {
  if (st(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!qo.call(t, l) || !st(e[l], t[l])) return !1;
  }
  return !0;
}
function ys(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function vs(e, t) {
  var n = ys(e);
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
    n = ys(n);
  }
}
function lc(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? lc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function oc() {
  for (var e = window, t = Ll(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch (r) {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Ll(e.document);
  }
  return t;
}
function au(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function op(e) {
  var t = oc(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && lc(n.ownerDocument.documentElement, n)) {
    if (r !== null && au(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = vs(n, o);
        var i = vs(
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
var ip = _t && "documentMode" in document && 11 >= document.documentMode, jn = null, yi = null, vr = null, vi = !1;
function xs(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  vi || jn == null || jn !== Ll(r) || (r = jn, "selectionStart" in r && au(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), vr && jr(vr, r) || (vr = r, r = Fl(yi, "onSelect"), 0 < r.length && (t = new iu("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = jn)));
}
function cl(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Ln = { animationend: cl("Animation", "AnimationEnd"), animationiteration: cl("Animation", "AnimationIteration"), animationstart: cl("Animation", "AnimationStart"), transitionend: cl("Transition", "TransitionEnd") }, Do = {}, ic = {};
_t && (ic = document.createElement("div").style, "AnimationEvent" in window || (delete Ln.animationend.animation, delete Ln.animationiteration.animation, delete Ln.animationstart.animation), "TransitionEvent" in window || delete Ln.transitionend.transition);
function oo(e) {
  if (Do[e]) return Do[e];
  if (!Ln[e]) return e;
  var t = Ln[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in ic) return Do[e] = t[n];
  return e;
}
var uc = oo("animationend"), sc = oo("animationiteration"), ac = oo("animationstart"), cc = oo("transitionend"), fc = /* @__PURE__ */ new Map(), ws = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function qt(e, t) {
  fc.set(e, t), wn(t, [e]);
}
for (var $o = 0; $o < ws.length; $o++) {
  var Fo = ws[$o], up = Fo.toLowerCase(), sp = Fo[0].toUpperCase() + Fo.slice(1);
  qt(up, "on" + sp);
}
qt(uc, "onAnimationEnd");
qt(sc, "onAnimationIteration");
qt(ac, "onAnimationStart");
qt("dblclick", "onDoubleClick");
qt("focusin", "onFocus");
qt("focusout", "onBlur");
qt(cc, "onTransitionEnd");
Qn("onMouseEnter", ["mouseout", "mouseover"]);
Qn("onMouseLeave", ["mouseout", "mouseover"]);
Qn("onPointerEnter", ["pointerout", "pointerover"]);
Qn("onPointerLeave", ["pointerout", "pointerover"]);
wn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
wn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
wn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
wn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
wn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
wn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var pr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), ap = new Set("cancel close invalid load scroll toggle".split(" ").concat(pr));
function Ss(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, ud(r, t, void 0, e), e.currentTarget = null;
}
function dc(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var u = r[i], s = u.instance, c = u.currentTarget;
        if (u = u.listener, s !== o && l.isPropagationStopped()) break e;
        Ss(l, u, c), o = s;
      }
      else for (i = 0; i < r.length; i++) {
        if (u = r[i], s = u.instance, c = u.currentTarget, u = u.listener, s !== o && l.isPropagationStopped()) break e;
        Ss(l, u, c), o = s;
      }
    }
  }
  if (Ml) throw e = pi, Ml = !1, pi = null, e;
}
function Z(e, t) {
  var n = t[Ei];
  n === void 0 && (n = t[Ei] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (pc(t, e, 2, !1), n.add(r));
}
function Ao(e, t, n) {
  var r = 0;
  t && (r |= 4), pc(n, e, r, t);
}
var fl = "_reactListening" + Math.random().toString(36).slice(2);
function Lr(e) {
  if (!e[fl]) {
    e[fl] = !0, wa.forEach(function(n) {
      n !== "selectionchange" && (ap.has(n) || Ao(n, !1, e), Ao(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[fl] || (t[fl] = !0, Ao("selectionchange", !1, t));
  }
}
function pc(e, t, n, r) {
  switch (Ja(t)) {
    case 1:
      var l = Ed;
      break;
    case 4:
      l = Cd;
      break;
    default:
      l = lu;
  }
  n = l.bind(null, t, n, e), l = void 0, !di || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Uo(e, t, n, r, l) {
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
  Da(function() {
    var c = o, g = eu(n), p = [];
    e: {
      var h = fc.get(e);
      if (h !== void 0) {
        var S = iu, E = e;
        switch (e) {
          case "keypress":
            if (El(n) === 0) break e;
          case "keydown":
          case "keyup":
            S = Ad;
            break;
          case "focusin":
            E = "focus", S = Mo;
            break;
          case "focusout":
            E = "blur", S = Mo;
            break;
          case "beforeblur":
          case "afterblur":
            S = Mo;
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
            S = as;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            S = Nd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            S = Wd;
            break;
          case uc:
          case sc:
          case ac:
            S = jd;
            break;
          case cc:
            S = Vd;
            break;
          case "scroll":
            S = _d;
            break;
          case "wheel":
            S = Xd;
            break;
          case "copy":
          case "cut":
          case "paste":
            S = Pd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            S = fs;
        }
        var v = (t & 4) !== 0, A = !v && e === "scroll", f = v ? h !== null ? h + "Capture" : null : h;
        v = [];
        for (var a = c, d; a !== null; ) {
          d = a;
          var x = d.stateNode;
          if (d.tag === 5 && x !== null && (d = x, f !== null && (x = _r(a, f), x != null && v.push(Pr(a, x, d)))), A) break;
          a = a.return;
        }
        0 < v.length && (h = new S(h, E, null, n, g), p.push({ event: h, listeners: v }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", S = e === "mouseout" || e === "pointerout", h && n !== ci && (E = n.relatedTarget || n.fromElement) && (cn(E) || E[Tt])) break e;
        if ((S || h) && (h = g.window === g ? g : (h = g.ownerDocument) ? h.defaultView || h.parentWindow : window, S ? (E = n.relatedTarget || n.toElement, S = c, E = E ? cn(E) : null, E !== null && (A = Sn(E), E !== A || E.tag !== 5 && E.tag !== 6) && (E = null)) : (S = null, E = c), S !== E)) {
          if (v = as, x = "onMouseLeave", f = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (v = fs, x = "onPointerLeave", f = "onPointerEnter", a = "pointer"), A = S == null ? h : Pn(S), d = E == null ? h : Pn(E), h = new v(x, a + "leave", S, n, g), h.target = A, h.relatedTarget = d, x = null, cn(g) === c && (v = new v(f, a + "enter", E, n, g), v.target = d, v.relatedTarget = A, x = v), A = x, S && E) t: {
            for (v = S, f = E, a = 0, d = v; d; d = Tn(d)) a++;
            for (d = 0, x = f; x; x = Tn(x)) d++;
            for (; 0 < a - d; ) v = Tn(v), a--;
            for (; 0 < d - a; ) f = Tn(f), d--;
            for (; a--; ) {
              if (v === f || f !== null && v === f.alternate) break t;
              v = Tn(v), f = Tn(f);
            }
            v = null;
          }
          else v = null;
          S !== null && ks(p, h, S, v, !1), E !== null && A !== null && ks(p, A, E, v, !0);
        }
      }
      e: {
        if (h = c ? Pn(c) : window, S = h.nodeName && h.nodeName.toLowerCase(), S === "select" || S === "input" && h.type === "file") var _ = bd;
        else if (hs(h)) if (nc) _ = rp;
        else {
          _ = tp;
          var j = ep;
        }
        else (S = h.nodeName) && S.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (_ = np);
        if (_ && (_ = _(e, c))) {
          tc(p, _, n, g);
          break e;
        }
        j && j(e, h, c), e === "focusout" && (j = h._wrapperState) && j.controlled && h.type === "number" && oi(h, "number", h.value);
      }
      switch (j = c ? Pn(c) : window, e) {
        case "focusin":
          (hs(j) || j.contentEditable === "true") && (jn = j, yi = c, vr = null);
          break;
        case "focusout":
          vr = yi = jn = null;
          break;
        case "mousedown":
          vi = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          vi = !1, xs(p, n, g);
          break;
        case "selectionchange":
          if (ip) break;
        case "keydown":
        case "keyup":
          xs(p, n, g);
      }
      var P;
      if (su) e: {
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
      else Rn ? ba(e, n) && (N = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (N = "onCompositionStart");
      N && (qa && n.locale !== "ko" && (Rn || N !== "onCompositionStart" ? N === "onCompositionEnd" && Rn && (P = Za()) : (Ut = g, ou = "value" in Ut ? Ut.value : Ut.textContent, Rn = !0)), j = Fl(c, N), 0 < j.length && (N = new cs(N, e, null, n, g), p.push({ event: N, listeners: j }), P ? N.data = P : (P = ec(n), P !== null && (N.data = P)))), (P = Yd ? Gd(e, n) : Jd(e, n)) && (c = Fl(c, "onBeforeInput"), 0 < c.length && (g = new cs("onBeforeInput", "beforeinput", null, n, g), p.push({ event: g, listeners: c }), g.data = P));
    }
    dc(p, t);
  });
}
function Pr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Fl(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = _r(e, n), o != null && r.unshift(Pr(e, o, l)), o = _r(e, t), o != null && r.push(Pr(e, o, l))), e = e.return;
  }
  return r;
}
function Tn(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function ks(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var u = n, s = u.alternate, c = u.stateNode;
    if (s !== null && s === r) break;
    u.tag === 5 && c !== null && (u = c, l ? (s = _r(n, o), s != null && i.unshift(Pr(n, s, u))) : l || (s = _r(n, o), s != null && i.push(Pr(n, s, u)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var cp = /\r\n?/g, fp = /\u0000|\uFFFD/g;
function Es(e) {
  return (typeof e == "string" ? e : "" + e).replace(cp, `
`).replace(fp, "");
}
function dl(e, t, n) {
  if (t = Es(t), Es(e) !== t && n) throw Error(k(425));
}
function Al() {
}
var xi = null, wi = null;
function Si(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var ki = typeof setTimeout == "function" ? setTimeout : void 0, dp = typeof clearTimeout == "function" ? clearTimeout : void 0, Cs = typeof Promise == "function" ? Promise : void 0, pp = typeof queueMicrotask == "function" ? queueMicrotask : typeof Cs != "undefined" ? function(e) {
  return Cs.resolve(null).then(e).catch(hp);
} : ki;
function hp(e) {
  setTimeout(function() {
    throw e;
  });
}
function Bo(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), zr(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  zr(t);
}
function Qt(e) {
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
function _s(e) {
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
var er = Math.random().toString(36).slice(2), ht = "__reactFiber$" + er, Mr = "__reactProps$" + er, Tt = "__reactContainer$" + er, Ei = "__reactEvents$" + er, mp = "__reactListeners$" + er, gp = "__reactHandles$" + er;
function cn(e) {
  var t = e[ht];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Tt] || n[ht]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = _s(e); e !== null; ) {
        if (n = e[ht]) return n;
        e = _s(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Hr(e) {
  return e = e[ht] || e[Tt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Pn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(k(33));
}
function io(e) {
  return e[Mr] || null;
}
var Ci = [], Mn = -1;
function bt(e) {
  return { current: e };
}
function q(e) {
  0 > Mn || (e.current = Ci[Mn], Ci[Mn] = null, Mn--);
}
function Y(e, t) {
  Mn++, Ci[Mn] = e.current, e.current = t;
}
var Zt = {}, Ne = bt(Zt), De = bt(!1), mn = Zt;
function Xn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Zt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, o;
  for (o in n) l[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function $e(e) {
  return e = e.childContextTypes, e != null;
}
function Ul() {
  q(De), q(Ne);
}
function Ts(e, t, n) {
  if (Ne.current !== Zt) throw Error(k(168));
  Y(Ne, t), Y(De, n);
}
function hc(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(k(108, ed(e) || "Unknown", l));
  return re({}, n, r);
}
function Bl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Zt, mn = Ne.current, Y(Ne, e), Y(De, De.current), !0;
}
function Ns(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(k(169));
  n ? (e = hc(e, t, mn), r.__reactInternalMemoizedMergedChildContext = e, q(De), q(Ne), Y(Ne, e)) : q(De), Y(De, n);
}
var St = null, uo = !1, Wo = !1;
function mc(e) {
  St === null ? St = [e] : St.push(e);
}
function yp(e) {
  uo = !0, mc(e);
}
function en() {
  if (!Wo && St !== null) {
    Wo = !0;
    var e = 0, t = X;
    try {
      var n = St;
      for (X = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      St = null, uo = !1;
    } catch (l) {
      throw St !== null && (St = St.slice(e + 1)), Ua(tu, en), l;
    } finally {
      X = t, Wo = !1;
    }
  }
  return null;
}
var On = [], In = 0, Wl = null, Hl = 0, Ge = [], Je = 0, gn = null, kt = 1, Et = "";
function sn(e, t) {
  On[In++] = Hl, On[In++] = Wl, Wl = e, Hl = t;
}
function gc(e, t, n) {
  Ge[Je++] = kt, Ge[Je++] = Et, Ge[Je++] = gn, gn = e;
  var r = kt;
  e = Et;
  var l = 32 - it(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - it(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, kt = 1 << 32 - it(t) + l | n << l | r, Et = o + e;
  } else kt = 1 << o | n << l | r, Et = e;
}
function cu(e) {
  e.return !== null && (sn(e, 1), gc(e, 1, 0));
}
function fu(e) {
  for (; e === Wl; ) Wl = On[--In], On[In] = null, Hl = On[--In], On[In] = null;
  for (; e === gn; ) gn = Ge[--Je], Ge[Je] = null, Et = Ge[--Je], Ge[Je] = null, kt = Ge[--Je], Ge[Je] = null;
}
var He = null, We = null, b = !1, ot = null;
function yc(e, t) {
  var n = Ze(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function zs(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, He = e, We = Qt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, He = e, We = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = gn !== null ? { id: kt, overflow: Et } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ze(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, He = e, We = null, !0) : !1;
    default:
      return !1;
  }
}
function _i(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ti(e) {
  if (b) {
    var t = We;
    if (t) {
      var n = t;
      if (!zs(e, t)) {
        if (_i(e)) throw Error(k(418));
        t = Qt(n.nextSibling);
        var r = He;
        t && zs(e, t) ? yc(r, n) : (e.flags = e.flags & -4097 | 2, b = !1, He = e);
      }
    } else {
      if (_i(e)) throw Error(k(418));
      e.flags = e.flags & -4097 | 2, b = !1, He = e;
    }
  }
}
function Rs(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  He = e;
}
function pl(e) {
  if (e !== He) return !1;
  if (!b) return Rs(e), b = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Si(e.type, e.memoizedProps)), t && (t = We)) {
    if (_i(e)) throw vc(), Error(k(418));
    for (; t; ) yc(e, t), t = Qt(t.nextSibling);
  }
  if (Rs(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(k(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              We = Qt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      We = null;
    }
  } else We = He ? Qt(e.stateNode.nextSibling) : null;
  return !0;
}
function vc() {
  for (var e = We; e; ) e = Qt(e.nextSibling);
}
function Kn() {
  We = He = null, b = !1;
}
function du(e) {
  ot === null ? ot = [e] : ot.push(e);
}
var vp = Rt.ReactCurrentBatchConfig;
function ur(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(k(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(k(147, e));
      var l = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var u = l.refs;
        i === null ? delete u[o] : u[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(k(284));
    if (!n._owner) throw Error(k(290, e));
  }
  return e;
}
function hl(e, t) {
  throw e = Object.prototype.toString.call(t), Error(k(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function js(e) {
  var t = e._init;
  return t(e._payload);
}
function xc(e) {
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
    return f = Gt(f, a), f.index = 0, f.sibling = null, f;
  }
  function o(f, a, d) {
    return f.index = d, e ? (d = f.alternate, d !== null ? (d = d.index, d < a ? (f.flags |= 2, a) : d) : (f.flags |= 2, a)) : (f.flags |= 1048576, a);
  }
  function i(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function u(f, a, d, x) {
    return a === null || a.tag !== 6 ? (a = Go(d, f.mode, x), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function s(f, a, d, x) {
    var _ = d.type;
    return _ === zn ? g(f, a, d.props.children, x, d.key) : a !== null && (a.elementType === _ || typeof _ == "object" && _ !== null && _.$$typeof === It && js(_) === a.type) ? (x = l(a, d.props), x.ref = ur(f, a, d), x.return = f, x) : (x = jl(d.type, d.key, d.props, null, f.mode, x), x.ref = ur(f, a, d), x.return = f, x);
  }
  function c(f, a, d, x) {
    return a === null || a.tag !== 4 || a.stateNode.containerInfo !== d.containerInfo || a.stateNode.implementation !== d.implementation ? (a = Jo(d, f.mode, x), a.return = f, a) : (a = l(a, d.children || []), a.return = f, a);
  }
  function g(f, a, d, x, _) {
    return a === null || a.tag !== 7 ? (a = hn(d, f.mode, x, _), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function p(f, a, d) {
    if (typeof a == "string" && a !== "" || typeof a == "number") return a = Go("" + a, f.mode, d), a.return = f, a;
    if (typeof a == "object" && a !== null) {
      switch (a.$$typeof) {
        case rl:
          return d = jl(a.type, a.key, a.props, null, f.mode, d), d.ref = ur(f, null, a), d.return = f, d;
        case Nn:
          return a = Jo(a, f.mode, d), a.return = f, a;
        case It:
          var x = a._init;
          return p(f, x(a._payload), d);
      }
      if (fr(a) || nr(a)) return a = hn(a, f.mode, d, null), a.return = f, a;
      hl(f, a);
    }
    return null;
  }
  function h(f, a, d, x) {
    var _ = a !== null ? a.key : null;
    if (typeof d == "string" && d !== "" || typeof d == "number") return _ !== null ? null : u(f, a, "" + d, x);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case rl:
          return d.key === _ ? s(f, a, d, x) : null;
        case Nn:
          return d.key === _ ? c(f, a, d, x) : null;
        case It:
          return _ = d._init, h(
            f,
            a,
            _(d._payload),
            x
          );
      }
      if (fr(d) || nr(d)) return _ !== null ? null : g(f, a, d, x, null);
      hl(f, d);
    }
    return null;
  }
  function S(f, a, d, x, _) {
    if (typeof x == "string" && x !== "" || typeof x == "number") return f = f.get(d) || null, u(a, f, "" + x, _);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case rl:
          return f = f.get(x.key === null ? d : x.key) || null, s(a, f, x, _);
        case Nn:
          return f = f.get(x.key === null ? d : x.key) || null, c(a, f, x, _);
        case It:
          var j = x._init;
          return S(f, a, d, j(x._payload), _);
      }
      if (fr(x) || nr(x)) return f = f.get(d) || null, g(a, f, x, _, null);
      hl(a, x);
    }
    return null;
  }
  function E(f, a, d, x) {
    for (var _ = null, j = null, P = a, N = a = 0, K = null; P !== null && N < d.length; N++) {
      P.index > N ? (K = P, P = null) : K = P.sibling;
      var U = h(f, P, d[N], x);
      if (U === null) {
        P === null && (P = K);
        break;
      }
      e && P && U.alternate === null && t(f, P), a = o(U, a, N), j === null ? _ = U : j.sibling = U, j = U, P = K;
    }
    if (N === d.length) return n(f, P), b && sn(f, N), _;
    if (P === null) {
      for (; N < d.length; N++) P = p(f, d[N], x), P !== null && (a = o(P, a, N), j === null ? _ = P : j.sibling = P, j = P);
      return b && sn(f, N), _;
    }
    for (P = r(f, P); N < d.length; N++) K = S(P, f, N, d[N], x), K !== null && (e && K.alternate !== null && P.delete(K.key === null ? N : K.key), a = o(K, a, N), j === null ? _ = K : j.sibling = K, j = K);
    return e && P.forEach(function(ae) {
      return t(f, ae);
    }), b && sn(f, N), _;
  }
  function v(f, a, d, x) {
    var _ = nr(d);
    if (typeof _ != "function") throw Error(k(150));
    if (d = _.call(d), d == null) throw Error(k(151));
    for (var j = _ = null, P = a, N = a = 0, K = null, U = d.next(); P !== null && !U.done; N++, U = d.next()) {
      P.index > N ? (K = P, P = null) : K = P.sibling;
      var ae = h(f, P, U.value, x);
      if (ae === null) {
        P === null && (P = K);
        break;
      }
      e && P && ae.alternate === null && t(f, P), a = o(ae, a, N), j === null ? _ = ae : j.sibling = ae, j = ae, P = K;
    }
    if (U.done) return n(
      f,
      P
    ), b && sn(f, N), _;
    if (P === null) {
      for (; !U.done; N++, U = d.next()) U = p(f, U.value, x), U !== null && (a = o(U, a, N), j === null ? _ = U : j.sibling = U, j = U);
      return b && sn(f, N), _;
    }
    for (P = r(f, P); !U.done; N++, U = d.next()) U = S(P, f, N, U.value, x), U !== null && (e && U.alternate !== null && P.delete(U.key === null ? N : U.key), a = o(U, a, N), j === null ? _ = U : j.sibling = U, j = U);
    return e && P.forEach(function(tn) {
      return t(f, tn);
    }), b && sn(f, N), _;
  }
  function A(f, a, d, x) {
    if (typeof d == "object" && d !== null && d.type === zn && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case rl:
          e: {
            for (var _ = d.key, j = a; j !== null; ) {
              if (j.key === _) {
                if (_ = d.type, _ === zn) {
                  if (j.tag === 7) {
                    n(f, j.sibling), a = l(j, d.props.children), a.return = f, f = a;
                    break e;
                  }
                } else if (j.elementType === _ || typeof _ == "object" && _ !== null && _.$$typeof === It && js(_) === j.type) {
                  n(f, j.sibling), a = l(j, d.props), a.ref = ur(f, j, d), a.return = f, f = a;
                  break e;
                }
                n(f, j);
                break;
              } else t(f, j);
              j = j.sibling;
            }
            d.type === zn ? (a = hn(d.props.children, f.mode, x, d.key), a.return = f, f = a) : (x = jl(d.type, d.key, d.props, null, f.mode, x), x.ref = ur(f, a, d), x.return = f, f = x);
          }
          return i(f);
        case Nn:
          e: {
            for (j = d.key; a !== null; ) {
              if (a.key === j) if (a.tag === 4 && a.stateNode.containerInfo === d.containerInfo && a.stateNode.implementation === d.implementation) {
                n(f, a.sibling), a = l(a, d.children || []), a.return = f, f = a;
                break e;
              } else {
                n(f, a);
                break;
              }
              else t(f, a);
              a = a.sibling;
            }
            a = Jo(d, f.mode, x), a.return = f, f = a;
          }
          return i(f);
        case It:
          return j = d._init, A(f, a, j(d._payload), x);
      }
      if (fr(d)) return E(f, a, d, x);
      if (nr(d)) return v(f, a, d, x);
      hl(f, d);
    }
    return typeof d == "string" && d !== "" || typeof d == "number" ? (d = "" + d, a !== null && a.tag === 6 ? (n(f, a.sibling), a = l(a, d), a.return = f, f = a) : (n(f, a), a = Go(d, f.mode, x), a.return = f, f = a), i(f)) : n(f, a);
  }
  return A;
}
var Yn = xc(!0), wc = xc(!1), Vl = bt(null), Ql = null, Dn = null, pu = null;
function hu() {
  pu = Dn = Ql = null;
}
function mu(e) {
  var t = Vl.current;
  q(Vl), e._currentValue = t;
}
function Ni(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Hn(e, t) {
  Ql = e, pu = Dn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Ie = !0), e.firstContext = null);
}
function be(e) {
  var t = e._currentValue;
  if (pu !== e) if (e = { context: e, memoizedValue: t, next: null }, Dn === null) {
    if (Ql === null) throw Error(k(308));
    Dn = e, Ql.dependencies = { lanes: 0, firstContext: e };
  } else Dn = Dn.next = e;
  return t;
}
var fn = null;
function gu(e) {
  fn === null ? fn = [e] : fn.push(e);
}
function Sc(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, gu(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Nt(e, r);
}
function Nt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Dt = !1;
function yu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function kc(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ct(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Xt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, H & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Nt(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, gu(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Nt(e, n);
}
function Cl(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, nu(e, n);
  }
}
function Ls(e, t) {
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
function Xl(e, t, n, r) {
  var l = e.updateQueue;
  Dt = !1;
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
      var h = u.lane, S = u.eventTime;
      if ((r & h) === h) {
        g !== null && (g = g.next = {
          eventTime: S,
          lane: 0,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null
        });
        e: {
          var E = e, v = u;
          switch (h = t, S = n, v.tag) {
            case 1:
              if (E = v.payload, typeof E == "function") {
                p = E.call(S, p, h);
                break e;
              }
              p = E;
              break e;
            case 3:
              E.flags = E.flags & -65537 | 128;
            case 0:
              if (E = v.payload, h = typeof E == "function" ? E.call(S, p, h) : E, h == null) break e;
              p = re({}, p, h);
              break e;
            case 2:
              Dt = !0;
          }
        }
        u.callback !== null && u.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [u] : h.push(u));
      } else S = { eventTime: S, lane: h, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, g === null ? (c = g = S, s = p) : g = g.next = S, i |= h;
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
function Ps(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(k(191, l));
      l.call(r);
    }
  }
}
var Vr = {}, gt = bt(Vr), Or = bt(Vr), Ir = bt(Vr);
function dn(e) {
  if (e === Vr) throw Error(k(174));
  return e;
}
function vu(e, t) {
  switch (Y(Ir, t), Y(Or, e), Y(gt, Vr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ui(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = ui(t, e);
  }
  q(gt), Y(gt, t);
}
function Gn() {
  q(gt), q(Or), q(Ir);
}
function Ec(e) {
  dn(Ir.current);
  var t = dn(gt.current), n = ui(t, e.type);
  t !== n && (Y(Or, e), Y(gt, n));
}
function xu(e) {
  Or.current === e && (q(gt), q(Or));
}
var te = bt(0);
function Kl(e) {
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
var Ho = [];
function wu() {
  for (var e = 0; e < Ho.length; e++) Ho[e]._workInProgressVersionPrimary = null;
  Ho.length = 0;
}
var _l = Rt.ReactCurrentDispatcher, Vo = Rt.ReactCurrentBatchConfig, yn = 0, ne = null, he = null, ye = null, Yl = !1, xr = !1, Dr = 0, xp = 0;
function Ce() {
  throw Error(k(321));
}
function Su(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!st(e[n], t[n])) return !1;
  return !0;
}
function ku(e, t, n, r, l, o) {
  if (yn = o, ne = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, _l.current = e === null || e.memoizedState === null ? Ep : Cp, e = n(r, l), xr) {
    o = 0;
    do {
      if (xr = !1, Dr = 0, 25 <= o) throw Error(k(301));
      o += 1, ye = he = null, t.updateQueue = null, _l.current = _p, e = n(r, l);
    } while (xr);
  }
  if (_l.current = Gl, t = he !== null && he.next !== null, yn = 0, ye = he = ne = null, Yl = !1, t) throw Error(k(300));
  return e;
}
function Eu() {
  var e = Dr !== 0;
  return Dr = 0, e;
}
function pt() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ye === null ? ne.memoizedState = ye = e : ye = ye.next = e, ye;
}
function et() {
  if (he === null) {
    var e = ne.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = he.next;
  var t = ye === null ? ne.memoizedState : ye.next;
  if (t !== null) ye = t, he = e;
  else {
    if (e === null) throw Error(k(310));
    he = e, e = { memoizedState: he.memoizedState, baseState: he.baseState, baseQueue: he.baseQueue, queue: he.queue, next: null }, ye === null ? ne.memoizedState = ye = e : ye = ye.next = e;
  }
  return ye;
}
function $r(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Qo(e) {
  var t = et(), n = t.queue;
  if (n === null) throw Error(k(311));
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
        s === null ? (u = s = p, i = r) : s = s.next = p, ne.lanes |= g, vn |= g;
      }
      c = c.next;
    } while (c !== null && c !== o);
    s === null ? i = r : s.next = u, st(r, t.memoizedState) || (Ie = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = s, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      o = l.lane, ne.lanes |= o, vn |= o, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Xo(e) {
  var t = et(), n = t.queue;
  if (n === null) throw Error(k(311));
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
function Cc() {
}
function _c(e, t) {
  var n = ne, r = et(), l = t(), o = !st(r.memoizedState, l);
  if (o && (r.memoizedState = l, Ie = !0), r = r.queue, Cu(zc.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || ye !== null && ye.memoizedState.tag & 1) {
    if (n.flags |= 2048, Fr(9, Nc.bind(null, n, r, l, t), void 0, null), ve === null) throw Error(k(349));
    yn & 30 || Tc(n, t, l);
  }
  return l;
}
function Tc(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = ne.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ne.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Nc(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Rc(t) && jc(e);
}
function zc(e, t, n) {
  return n(function() {
    Rc(t) && jc(e);
  });
}
function Rc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !st(e, n);
  } catch (r) {
    return !0;
  }
}
function jc(e) {
  var t = Nt(e, 1);
  t !== null && ut(t, e, 1, -1);
}
function Ms(e) {
  var t = pt();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: $r, lastRenderedState: e }, t.queue = e, e = e.dispatch = kp.bind(null, ne, e), [t.memoizedState, e];
}
function Fr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = ne.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, ne.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Lc() {
  return et().memoizedState;
}
function Tl(e, t, n, r) {
  var l = pt();
  ne.flags |= e, l.memoizedState = Fr(1 | t, n, void 0, r === void 0 ? null : r);
}
function so(e, t, n, r) {
  var l = et();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (he !== null) {
    var i = he.memoizedState;
    if (o = i.destroy, r !== null && Su(r, i.deps)) {
      l.memoizedState = Fr(t, n, o, r);
      return;
    }
  }
  ne.flags |= e, l.memoizedState = Fr(1 | t, n, o, r);
}
function Os(e, t) {
  return Tl(8390656, 8, e, t);
}
function Cu(e, t) {
  return so(2048, 8, e, t);
}
function Pc(e, t) {
  return so(4, 2, e, t);
}
function Mc(e, t) {
  return so(4, 4, e, t);
}
function Oc(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Ic(e, t, n) {
  return n = n != null ? n.concat([e]) : null, so(4, 4, Oc.bind(null, t, e), n);
}
function _u() {
}
function Dc(e, t) {
  var n = et();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Su(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function $c(e, t) {
  var n = et();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Su(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Fc(e, t, n) {
  return yn & 21 ? (st(n, t) || (n = Ha(), ne.lanes |= n, vn |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Ie = !0), e.memoizedState = n);
}
function wp(e, t) {
  var n = X;
  X = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Vo.transition;
  Vo.transition = {};
  try {
    e(!1), t();
  } finally {
    X = n, Vo.transition = r;
  }
}
function Ac() {
  return et().memoizedState;
}
function Sp(e, t, n) {
  var r = Yt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Uc(e)) Bc(t, n);
  else if (n = Sc(e, t, n, r), n !== null) {
    var l = Re();
    ut(n, e, r, l), Wc(n, t, r);
  }
}
function kp(e, t, n) {
  var r = Yt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Uc(e)) Bc(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, u = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = u, st(u, i)) {
        var s = t.interleaved;
        s === null ? (l.next = l, gu(t)) : (l.next = s.next, s.next = l), t.interleaved = l;
        return;
      }
    } catch (c) {
    } finally {
    }
    n = Sc(e, t, l, r), n !== null && (l = Re(), ut(n, e, r, l), Wc(n, t, r));
  }
}
function Uc(e) {
  var t = e.alternate;
  return e === ne || t !== null && t === ne;
}
function Bc(e, t) {
  xr = Yl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Wc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, nu(e, n);
  }
}
var Gl = { readContext: be, useCallback: Ce, useContext: Ce, useEffect: Ce, useImperativeHandle: Ce, useInsertionEffect: Ce, useLayoutEffect: Ce, useMemo: Ce, useReducer: Ce, useRef: Ce, useState: Ce, useDebugValue: Ce, useDeferredValue: Ce, useTransition: Ce, useMutableSource: Ce, useSyncExternalStore: Ce, useId: Ce, unstable_isNewReconciler: !1 }, Ep = { readContext: be, useCallback: function(e, t) {
  return pt().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: be, useEffect: Os, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Tl(
    4194308,
    4,
    Oc.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Tl(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Tl(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = pt();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = pt();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Sp.bind(null, ne, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = pt();
  return e = { current: e }, t.memoizedState = e;
}, useState: Ms, useDebugValue: _u, useDeferredValue: function(e) {
  return pt().memoizedState = e;
}, useTransition: function() {
  var e = Ms(!1), t = e[0];
  return e = wp.bind(null, e[1]), pt().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = ne, l = pt();
  if (b) {
    if (n === void 0) throw Error(k(407));
    n = n();
  } else {
    if (n = t(), ve === null) throw Error(k(349));
    yn & 30 || Tc(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, Os(zc.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, Fr(9, Nc.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = pt(), t = ve.identifierPrefix;
  if (b) {
    var n = Et, r = kt;
    n = (r & ~(1 << 32 - it(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Dr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = xp++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Cp = {
  readContext: be,
  useCallback: Dc,
  useContext: be,
  useEffect: Cu,
  useImperativeHandle: Ic,
  useInsertionEffect: Pc,
  useLayoutEffect: Mc,
  useMemo: $c,
  useReducer: Qo,
  useRef: Lc,
  useState: function() {
    return Qo($r);
  },
  useDebugValue: _u,
  useDeferredValue: function(e) {
    var t = et();
    return Fc(t, he.memoizedState, e);
  },
  useTransition: function() {
    var e = Qo($r)[0], t = et().memoizedState;
    return [e, t];
  },
  useMutableSource: Cc,
  useSyncExternalStore: _c,
  useId: Ac,
  unstable_isNewReconciler: !1
}, _p = { readContext: be, useCallback: Dc, useContext: be, useEffect: Cu, useImperativeHandle: Ic, useInsertionEffect: Pc, useLayoutEffect: Mc, useMemo: $c, useReducer: Xo, useRef: Lc, useState: function() {
  return Xo($r);
}, useDebugValue: _u, useDeferredValue: function(e) {
  var t = et();
  return he === null ? t.memoizedState = e : Fc(t, he.memoizedState, e);
}, useTransition: function() {
  var e = Xo($r)[0], t = et().memoizedState;
  return [e, t];
}, useMutableSource: Cc, useSyncExternalStore: _c, useId: Ac, unstable_isNewReconciler: !1 };
function rt(e, t) {
  if (e && e.defaultProps) {
    t = re({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function zi(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : re({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var ao = { isMounted: function(e) {
  return (e = e._reactInternals) ? Sn(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = Re(), l = Yt(e), o = Ct(r, l);
  o.payload = t, n != null && (o.callback = n), t = Xt(e, o, l), t !== null && (ut(t, e, l, r), Cl(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = Re(), l = Yt(e), o = Ct(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Xt(e, o, l), t !== null && (ut(t, e, l, r), Cl(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Re(), r = Yt(e), l = Ct(n, r);
  l.tag = 2, t != null && (l.callback = t), t = Xt(e, l, r), t !== null && (ut(t, e, r, n), Cl(t, e, r));
} };
function Is(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !jr(n, r) || !jr(l, o) : !0;
}
function Hc(e, t, n) {
  var r = !1, l = Zt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = be(o) : (l = $e(t) ? mn : Ne.current, r = t.contextTypes, o = (r = r != null) ? Xn(e, l) : Zt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ao, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Ds(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && ao.enqueueReplaceState(t, t.state, null);
}
function Ri(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, yu(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = be(o) : (o = $e(t) ? mn : Ne.current, l.context = Xn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (zi(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && ao.enqueueReplaceState(l, l.state, null), Xl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Jn(e, t) {
  try {
    var n = "", r = t;
    do
      n += bf(r), r = r.return;
    while (r);
    var l = n;
  } catch (o) {
    l = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Ko(e, t, n) {
  return { value: e, source: null, stack: n != null ? n : null, digest: t != null ? t : null };
}
function ji(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Tp = typeof WeakMap == "function" ? WeakMap : Map;
function Vc(e, t, n) {
  n = Ct(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Zl || (Zl = !0, Ui = r), ji(e, t);
  }, n;
}
function Qc(e, t, n) {
  n = Ct(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      ji(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    ji(e, t), typeof r != "function" && (Kt === null ? Kt = /* @__PURE__ */ new Set([this]) : Kt.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function $s(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Tp();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Up.bind(null, e, t, n), t.then(e, e));
}
function Fs(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function As(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ct(-1, 1), t.tag = 2, Xt(n, t, 1))), n.lanes |= 1), e);
}
var Np = Rt.ReactCurrentOwner, Ie = !1;
function ze(e, t, n, r) {
  t.child = e === null ? wc(t, null, n, r) : Yn(t, e.child, n, r);
}
function Us(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return Hn(t, l), r = ku(e, t, n, r, o, l), n = Eu(), e !== null && !Ie ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, zt(e, t, l)) : (b && n && cu(t), t.flags |= 1, ze(e, t, r, l), t.child);
}
function Bs(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Mu(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Xc(e, t, o, r, l)) : (e = jl(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & l)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : jr, n(i, r) && e.ref === t.ref) return zt(e, t, l);
  }
  return t.flags |= 1, e = Gt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Xc(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (jr(o, r) && e.ref === t.ref) if (Ie = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Ie = !0);
    else return t.lanes = e.lanes, zt(e, t, l);
  }
  return Li(e, t, n, r, l);
}
function Kc(e, t, n) {
  var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Y(Fn, Be), Be |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Y(Fn, Be), Be |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, Y(Fn, Be), Be |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, Y(Fn, Be), Be |= r;
  return ze(e, t, l, n), t.child;
}
function Yc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Li(e, t, n, r, l) {
  var o = $e(n) ? mn : Ne.current;
  return o = Xn(t, o), Hn(t, l), n = ku(e, t, n, r, o, l), r = Eu(), e !== null && !Ie ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, zt(e, t, l)) : (b && r && cu(t), t.flags |= 1, ze(e, t, n, l), t.child);
}
function Ws(e, t, n, r, l) {
  if ($e(n)) {
    var o = !0;
    Bl(t);
  } else o = !1;
  if (Hn(t, l), t.stateNode === null) Nl(e, t), Hc(t, n, r), Ri(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, u = t.memoizedProps;
    i.props = u;
    var s = i.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = be(c) : (c = $e(n) ? mn : Ne.current, c = Xn(t, c));
    var g = n.getDerivedStateFromProps, p = typeof g == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    p || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== r || s !== c) && Ds(t, i, r, c), Dt = !1;
    var h = t.memoizedState;
    i.state = h, Xl(t, r, i, l), s = t.memoizedState, u !== r || h !== s || De.current || Dt ? (typeof g == "function" && (zi(t, n, g, r), s = t.memoizedState), (u = Dt || Is(t, n, u, r, h, s, c)) ? (p || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), i.props = r, i.state = s, i.context = c, r = u) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, kc(e, t), u = t.memoizedProps, c = t.type === t.elementType ? u : rt(t.type, u), i.props = c, p = t.pendingProps, h = i.context, s = n.contextType, typeof s == "object" && s !== null ? s = be(s) : (s = $e(n) ? mn : Ne.current, s = Xn(t, s));
    var S = n.getDerivedStateFromProps;
    (g = typeof S == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== p || h !== s) && Ds(t, i, r, s), Dt = !1, h = t.memoizedState, i.state = h, Xl(t, r, i, l);
    var E = t.memoizedState;
    u !== p || h !== E || De.current || Dt ? (typeof S == "function" && (zi(t, n, S, r), E = t.memoizedState), (c = Dt || Is(t, n, c, r, h, E, s) || !1) ? (g || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, E, s), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, E, s)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = E), i.props = r, i.state = E, i.context = s, r = c) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Pi(e, t, n, r, o, l);
}
function Pi(e, t, n, r, l, o) {
  Yc(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && Ns(t, n, !1), zt(e, t, o);
  r = t.stateNode, Np.current = t;
  var u = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = Yn(t, e.child, null, o), t.child = Yn(t, null, u, o)) : ze(e, t, u, o), t.memoizedState = r.state, l && Ns(t, n, !0), t.child;
}
function Gc(e) {
  var t = e.stateNode;
  t.pendingContext ? Ts(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Ts(e, t.context, !1), vu(e, t.containerInfo);
}
function Hs(e, t, n, r, l) {
  return Kn(), du(l), t.flags |= 256, ze(e, t, n, r), t.child;
}
var Mi = { dehydrated: null, treeContext: null, retryLane: 0 };
function Oi(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Jc(e, t, n) {
  var r = t.pendingProps, l = te.current, o = !1, i = (t.flags & 128) !== 0, u;
  if ((u = i) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), u ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Y(te, l & 1), e === null)
    return Ti(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = po(i, r, 0, null), e = hn(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Oi(n), t.memoizedState = Mi, e) : Tu(t, i));
  if (l = e.memoizedState, l !== null && (u = l.dehydrated, u !== null)) return zp(e, t, i, r, u, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, u = l.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = Gt(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), u !== null ? o = Gt(u, o) : (o = hn(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? Oi(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = Mi, r;
  }
  return o = e.child, e = o.sibling, r = Gt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Tu(e, t) {
  return t = po({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function ml(e, t, n, r) {
  return r !== null && du(r), Yn(t, e.child, null, n), e = Tu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function zp(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Ko(Error(k(422))), ml(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = po({ mode: "visible", children: r.children }, l, 0, null), o = hn(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Yn(t, e.child, null, i), t.child.memoizedState = Oi(i), t.memoizedState = Mi, o);
  if (!(t.mode & 1)) return ml(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var u = r.dgst;
    return r = u, o = Error(k(419)), r = Ko(o, r, void 0), ml(e, t, i, r);
  }
  if (u = (i & e.childLanes) !== 0, Ie || u) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Nt(e, l), ut(r, e, l, -1));
    }
    return Pu(), r = Ko(Error(k(421))), ml(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Bp.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, We = Qt(l.nextSibling), He = t, b = !0, ot = null, e !== null && (Ge[Je++] = kt, Ge[Je++] = Et, Ge[Je++] = gn, kt = e.id, Et = e.overflow, gn = t), t = Tu(t, r.children), t.flags |= 4096, t);
}
function Vs(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ni(e.return, t, n);
}
function Yo(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
}
function Zc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, o = r.tail;
  if (ze(e, t, r.children, n), r = te.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Vs(e, n, t);
      else if (e.tag === 19) Vs(e, n, t);
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
  if (Y(te, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && Kl(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Yo(t, !1, l, n, o);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Kl(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Yo(t, !0, n, null, o);
      break;
    case "together":
      Yo(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Nl(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function zt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), vn |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(k(153));
  if (t.child !== null) {
    for (e = t.child, n = Gt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Gt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Rp(e, t, n) {
  switch (t.tag) {
    case 3:
      Gc(t), Kn();
      break;
    case 5:
      Ec(t);
      break;
    case 1:
      $e(t.type) && Bl(t);
      break;
    case 4:
      vu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      Y(Vl, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (Y(te, te.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Jc(e, t, n) : (Y(te, te.current & 1), e = zt(e, t, n), e !== null ? e.sibling : null);
      Y(te, te.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Zc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Y(te, te.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Kc(e, t, n);
  }
  return zt(e, t, n);
}
var qc, Ii, bc, ef;
qc = function(e, t) {
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
Ii = function() {
};
bc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, dn(gt.current);
    var o = null;
    switch (n) {
      case "input":
        l = ri(e, l), r = ri(e, r), o = [];
        break;
      case "select":
        l = re({}, l, { value: void 0 }), r = re({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        l = ii(e, l), r = ii(e, r), o = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Al);
    }
    si(n, r);
    var i;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var u = l[c];
      for (i in u) u.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Er.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var s = r[c];
      if (u = l != null ? l[c] : void 0, r.hasOwnProperty(c) && s !== u && (s != null || u != null)) if (c === "style") if (u) {
        for (i in u) !u.hasOwnProperty(i) || s && s.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in s) s.hasOwnProperty(i) && u[i] !== s[i] && (n || (n = {}), n[i] = s[i]);
      } else n || (o || (o = []), o.push(
        c,
        n
      )), n = s;
      else c === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, u = u ? u.__html : void 0, s != null && u !== s && (o = o || []).push(c, s)) : c === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(c, "" + s) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Er.hasOwnProperty(c) ? (s != null && c === "onScroll" && Z("scroll", e), o || u === s || (o = [])) : (o = o || []).push(c, s));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
ef = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function sr(e, t) {
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
function jp(e, t, n) {
  var r = t.pendingProps;
  switch (fu(t), t.tag) {
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
      return $e(t.type) && Ul(), _e(t), null;
    case 3:
      return r = t.stateNode, Gn(), q(De), q(Ne), wu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (pl(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ot !== null && (Hi(ot), ot = null))), Ii(e, t), _e(t), null;
    case 5:
      xu(t);
      var l = dn(Ir.current);
      if (n = t.type, e !== null && t.stateNode != null) bc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(k(166));
          return _e(t), null;
        }
        if (e = dn(gt.current), pl(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[ht] = t, r[Mr] = o, e = (t.mode & 1) !== 0, n) {
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
              for (l = 0; l < pr.length; l++) Z(pr[l], r);
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
              bu(r, o), Z("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Z("invalid", r);
              break;
            case "textarea":
              ts(r, o), Z("invalid", r);
          }
          si(n, o), l = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var u = o[i];
            i === "children" ? typeof u == "string" ? r.textContent !== u && (o.suppressHydrationWarning !== !0 && dl(r.textContent, u, e), l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (o.suppressHydrationWarning !== !0 && dl(
              r.textContent,
              u,
              e
            ), l = ["children", "" + u]) : Er.hasOwnProperty(i) && u != null && i === "onScroll" && Z("scroll", r);
          }
          switch (n) {
            case "input":
              ll(r), es(r, o, !0);
              break;
            case "textarea":
              ll(r), ns(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Al);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = za(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[ht] = t, e[Mr] = r, qc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = ai(n, r), n) {
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
                for (l = 0; l < pr.length; l++) Z(pr[l], e);
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
                bu(e, r), l = ri(e, r), Z("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = re({}, r, { value: void 0 }), Z("invalid", e);
                break;
              case "textarea":
                ts(e, r), l = ii(e, r), Z("invalid", e);
                break;
              default:
                l = r;
            }
            si(n, l), u = l;
            for (o in u) if (u.hasOwnProperty(o)) {
              var s = u[o];
              o === "style" ? La(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && Ra(e, s)) : o === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && Cr(e, s) : typeof s == "number" && Cr(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Er.hasOwnProperty(o) ? s != null && o === "onScroll" && Z("scroll", e) : s != null && Ji(e, o, s, i));
            }
            switch (n) {
              case "input":
                ll(e), es(e, r, !1);
                break;
              case "textarea":
                ll(e), ns(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Jt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? An(e, !!r.multiple, o, !1) : r.defaultValue != null && An(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Al);
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
      if (e && t.stateNode != null) ef(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(k(166));
        if (n = dn(Ir.current), dn(gt.current), pl(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[ht] = t, (o = r.nodeValue !== n) && (e = He, e !== null)) switch (e.tag) {
            case 3:
              dl(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && dl(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[ht] = t, t.stateNode = r;
      }
      return _e(t), null;
    case 13:
      if (q(te), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (b && We !== null && t.mode & 1 && !(t.flags & 128)) vc(), Kn(), t.flags |= 98560, o = !1;
        else if (o = pl(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(k(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(k(317));
            o[ht] = t;
          } else Kn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          _e(t), o = !1;
        } else ot !== null && (Hi(ot), ot = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || te.current & 1 ? me === 0 && (me = 3) : Pu())), t.updateQueue !== null && (t.flags |= 4), _e(t), null);
    case 4:
      return Gn(), Ii(e, t), e === null && Lr(t.stateNode.containerInfo), _e(t), null;
    case 10:
      return mu(t.type._context), _e(t), null;
    case 17:
      return $e(t.type) && Ul(), _e(t), null;
    case 19:
      if (q(te), o = t.memoizedState, o === null) return _e(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) sr(o, !1);
      else {
        if (me !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = Kl(e), i !== null) {
            for (t.flags |= 128, sr(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Y(te, te.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && se() > Zn && (t.flags |= 128, r = !0, sr(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = Kl(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), sr(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !b) return _e(t), null;
        } else 2 * se() - o.renderingStartTime > Zn && n !== 1073741824 && (t.flags |= 128, r = !0, sr(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = se(), t.sibling = null, n = te.current, Y(te, r ? n & 1 | 2 : n & 1), t) : (_e(t), null);
    case 22:
    case 23:
      return Lu(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Be & 1073741824 && (_e(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : _e(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(k(156, t.tag));
}
function Lp(e, t) {
  switch (fu(t), t.tag) {
    case 1:
      return $e(t.type) && Ul(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Gn(), q(De), q(Ne), wu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return xu(t), null;
    case 13:
      if (q(te), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(k(340));
        Kn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return q(te), null;
    case 4:
      return Gn(), null;
    case 10:
      return mu(t.type._context), null;
    case 22:
    case 23:
      return Lu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var gl = !1, Te = !1, Pp = typeof WeakSet == "function" ? WeakSet : Set, L = null;
function $n(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    ie(e, t, r);
  }
  else n.current = null;
}
function Di(e, t, n) {
  try {
    n();
  } catch (r) {
    ie(e, t, r);
  }
}
var Qs = !1;
function Mp(e, t) {
  if (xi = Dl, e = oc(), au(e)) {
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
        var i = 0, u = -1, s = -1, c = 0, g = 0, p = e, h = null;
        t: for (; ; ) {
          for (var S; p !== n || l !== 0 && p.nodeType !== 3 || (u = i + l), p !== o || r !== 0 && p.nodeType !== 3 || (s = i + r), p.nodeType === 3 && (i += p.nodeValue.length), (S = p.firstChild) !== null; )
            h = p, p = S;
          for (; ; ) {
            if (p === e) break t;
            if (h === n && ++c === l && (u = i), h === o && ++g === r && (s = i), (S = p.nextSibling) !== null) break;
            p = h, h = p.parentNode;
          }
          p = S;
        }
        n = u === -1 || s === -1 ? null : { start: u, end: s };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (wi = { focusedElem: e, selectionRange: n }, Dl = !1, L = t; L !== null; ) if (t = L, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, L = e;
  else for (; L !== null; ) {
    t = L;
    try {
      var E = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (E !== null) {
            var v = E.memoizedProps, A = E.memoizedState, f = t.stateNode, a = f.getSnapshotBeforeUpdate(t.elementType === t.type ? v : rt(t.type, v), A);
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
          throw Error(k(163));
      }
    } catch (x) {
      ie(t, t.return, x);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, L = e;
      break;
    }
    L = t.return;
  }
  return E = Qs, Qs = !1, E;
}
function wr(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        l.destroy = void 0, o !== void 0 && Di(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function co(e, t) {
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
function $i(e) {
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
function tf(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, tf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[ht], delete t[Mr], delete t[Ei], delete t[mp], delete t[gp])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function nf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Xs(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || nf(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Fi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Al));
  else if (r !== 4 && (e = e.child, e !== null)) for (Fi(e, t, n), e = e.sibling; e !== null; ) Fi(e, t, n), e = e.sibling;
}
function Ai(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Ai(e, t, n), e = e.sibling; e !== null; ) Ai(e, t, n), e = e.sibling;
}
var we = null, lt = !1;
function Ot(e, t, n) {
  for (n = n.child; n !== null; ) rf(e, t, n), n = n.sibling;
}
function rf(e, t, n) {
  if (mt && typeof mt.onCommitFiberUnmount == "function") try {
    mt.onCommitFiberUnmount(no, n);
  } catch (u) {
  }
  switch (n.tag) {
    case 5:
      Te || $n(n, t);
    case 6:
      var r = we, l = lt;
      we = null, Ot(e, t, n), we = r, lt = l, we !== null && (lt ? (e = we, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : we.removeChild(n.stateNode));
      break;
    case 18:
      we !== null && (lt ? (e = we, n = n.stateNode, e.nodeType === 8 ? Bo(e.parentNode, n) : e.nodeType === 1 && Bo(e, n), zr(e)) : Bo(we, n.stateNode));
      break;
    case 4:
      r = we, l = lt, we = n.stateNode.containerInfo, lt = !0, Ot(e, t, n), we = r, lt = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Te && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var o = l, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && Di(n, t, i), l = l.next;
        } while (l !== r);
      }
      Ot(e, t, n);
      break;
    case 1:
      if (!Te && ($n(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (u) {
        ie(n, t, u);
      }
      Ot(e, t, n);
      break;
    case 21:
      Ot(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (Te = (r = Te) || n.memoizedState !== null, Ot(e, t, n), Te = r) : Ot(e, t, n);
      break;
    default:
      Ot(e, t, n);
  }
}
function Ks(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Pp()), t.forEach(function(r) {
      var l = Wp.bind(null, e, r);
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
      if (we === null) throw Error(k(160));
      rf(o, i, l), we = null, lt = !1;
      var s = l.alternate;
      s !== null && (s.return = null), l.return = null;
    } catch (c) {
      ie(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) lf(t, e), t = t.sibling;
}
function lf(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (nt(t, e), dt(e), r & 4) {
        try {
          wr(3, e, e.return), co(3, e);
        } catch (v) {
          ie(e, e.return, v);
        }
        try {
          wr(5, e, e.return);
        } catch (v) {
          ie(e, e.return, v);
        }
      }
      break;
    case 1:
      nt(t, e), dt(e), r & 512 && n !== null && $n(n, n.return);
      break;
    case 5:
      if (nt(t, e), dt(e), r & 512 && n !== null && $n(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Cr(l, "");
        } catch (v) {
          ie(e, e.return, v);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, u = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null) try {
          u === "input" && o.type === "radio" && o.name != null && Ta(l, o), ai(u, i);
          var c = ai(u, o);
          for (i = 0; i < s.length; i += 2) {
            var g = s[i], p = s[i + 1];
            g === "style" ? La(l, p) : g === "dangerouslySetInnerHTML" ? Ra(l, p) : g === "children" ? Cr(l, p) : Ji(l, g, p, c);
          }
          switch (u) {
            case "input":
              li(l, o);
              break;
            case "textarea":
              Na(l, o);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!o.multiple;
              var S = o.value;
              S != null ? An(l, !!o.multiple, S, !1) : h !== !!o.multiple && (o.defaultValue != null ? An(
                l,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : An(l, !!o.multiple, o.multiple ? [] : "", !1));
          }
          l[Mr] = o;
        } catch (v) {
          ie(e, e.return, v);
        }
      }
      break;
    case 6:
      if (nt(t, e), dt(e), r & 4) {
        if (e.stateNode === null) throw Error(k(162));
        l = e.stateNode, o = e.memoizedProps;
        try {
          l.nodeValue = o;
        } catch (v) {
          ie(e, e.return, v);
        }
      }
      break;
    case 3:
      if (nt(t, e), dt(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        zr(t.containerInfo);
      } catch (v) {
        ie(e, e.return, v);
      }
      break;
    case 4:
      nt(t, e), dt(e);
      break;
    case 13:
      nt(t, e), dt(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Ru = se())), r & 4 && Ks(e);
      break;
    case 22:
      if (g = n !== null && n.memoizedState !== null, e.mode & 1 ? (Te = (c = Te) || g, nt(t, e), Te = c) : nt(t, e), dt(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !g && e.mode & 1) for (L = e, g = e.child; g !== null; ) {
          for (p = L = g; L !== null; ) {
            switch (h = L, S = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                wr(4, h, h.return);
                break;
              case 1:
                $n(h, h.return);
                var E = h.stateNode;
                if (typeof E.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, E.props = t.memoizedProps, E.state = t.memoizedState, E.componentWillUnmount();
                  } catch (v) {
                    ie(r, n, v);
                  }
                }
                break;
              case 5:
                $n(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  Gs(p);
                  continue;
                }
            }
            S !== null ? (S.return = h, L = S) : Gs(p);
          }
          g = g.sibling;
        }
        e: for (g = null, p = e; ; ) {
          if (p.tag === 5) {
            if (g === null) {
              g = p;
              try {
                l = p.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (u = p.stateNode, s = p.memoizedProps.style, i = s != null && s.hasOwnProperty("display") ? s.display : null, u.style.display = ja("display", i));
              } catch (v) {
                ie(e, e.return, v);
              }
            }
          } else if (p.tag === 6) {
            if (g === null) try {
              p.stateNode.nodeValue = c ? "" : p.memoizedProps;
            } catch (v) {
              ie(e, e.return, v);
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
      nt(t, e), dt(e), r & 4 && Ks(e);
      break;
    case 21:
      break;
    default:
      nt(
        t,
        e
      ), dt(e);
  }
}
function dt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (nf(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(k(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Cr(l, ""), r.flags &= -33);
          var o = Xs(e);
          Ai(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, u = Xs(e);
          Fi(e, u, i);
          break;
        default:
          throw Error(k(161));
      }
    } catch (s) {
      ie(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Op(e, t, n) {
  L = e, of(e);
}
function of(e, t, n) {
  for (var r = (e.mode & 1) !== 0; L !== null; ) {
    var l = L, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || gl;
      if (!i) {
        var u = l.alternate, s = u !== null && u.memoizedState !== null || Te;
        u = gl;
        var c = Te;
        if (gl = i, (Te = s) && !c) for (L = l; L !== null; ) i = L, s = i.child, i.tag === 22 && i.memoizedState !== null ? Js(l) : s !== null ? (s.return = i, L = s) : Js(l);
        for (; o !== null; ) L = o, of(o), o = o.sibling;
        L = l, gl = u, Te = c;
      }
      Ys(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, L = o) : Ys(e);
  }
}
function Ys(e) {
  for (; L !== null; ) {
    var t = L;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            Te || co(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !Te) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : rt(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Ps(t, o, r);
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
              Ps(t, i, n);
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
                  p !== null && zr(p);
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
            throw Error(k(163));
        }
        Te || t.flags & 512 && $i(t);
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
function Gs(e) {
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
function Js(e) {
  for (; L !== null; ) {
    var t = L;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            co(4, t);
          } catch (s) {
            ie(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              ie(t, l, s);
            }
          }
          var o = t.return;
          try {
            $i(t);
          } catch (s) {
            ie(t, o, s);
          }
          break;
        case 5:
          var i = t.return;
          try {
            $i(t);
          } catch (s) {
            ie(t, i, s);
          }
      }
    } catch (s) {
      ie(t, t.return, s);
    }
    if (t === e) {
      L = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      u.return = t.return, L = u;
      break;
    }
    L = t.return;
  }
}
var Ip = Math.ceil, Jl = Rt.ReactCurrentDispatcher, Nu = Rt.ReactCurrentOwner, qe = Rt.ReactCurrentBatchConfig, H = 0, ve = null, de = null, Se = 0, Be = 0, Fn = bt(0), me = 0, Ar = null, vn = 0, fo = 0, zu = 0, Sr = null, Oe = null, Ru = 0, Zn = 1 / 0, wt = null, Zl = !1, Ui = null, Kt = null, yl = !1, Bt = null, ql = 0, kr = 0, Bi = null, zl = -1, Rl = 0;
function Re() {
  return H & 6 ? se() : zl !== -1 ? zl : zl = se();
}
function Yt(e) {
  return e.mode & 1 ? H & 2 && Se !== 0 ? Se & -Se : vp.transition !== null ? (Rl === 0 && (Rl = Ha()), Rl) : (e = X, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ja(e.type)), e) : 1;
}
function ut(e, t, n, r) {
  if (50 < kr) throw kr = 0, Bi = null, Error(k(185));
  Br(e, n, r), (!(H & 2) || e !== ve) && (e === ve && (!(H & 2) && (fo |= n), me === 4 && At(e, Se)), Fe(e, r), n === 1 && H === 0 && !(t.mode & 1) && (Zn = se() + 500, uo && en()));
}
function Fe(e, t) {
  var n = e.callbackNode;
  vd(e, t);
  var r = Il(e, e === ve ? Se : 0);
  if (r === 0) n !== null && os(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && os(n), t === 1) e.tag === 0 ? yp(Zs.bind(null, e)) : mc(Zs.bind(null, e)), pp(function() {
      !(H & 6) && en();
    }), n = null;
    else {
      switch (Va(r)) {
        case 1:
          n = tu;
          break;
        case 4:
          n = Ba;
          break;
        case 16:
          n = Ol;
          break;
        case 536870912:
          n = Wa;
          break;
        default:
          n = Ol;
      }
      n = hf(n, uf.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function uf(e, t) {
  if (zl = -1, Rl = 0, H & 6) throw Error(k(327));
  var n = e.callbackNode;
  if (Vn() && e.callbackNode !== n) return null;
  var r = Il(e, e === ve ? Se : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = bl(e, r);
  else {
    t = r;
    var l = H;
    H |= 2;
    var o = af();
    (ve !== e || Se !== t) && (wt = null, Zn = se() + 500, pn(e, t));
    do
      try {
        Fp();
        break;
      } catch (u) {
        sf(e, u);
      }
    while (!0);
    hu(), Jl.current = o, H = l, de !== null ? t = 0 : (ve = null, Se = 0, t = me);
  }
  if (t !== 0) {
    if (t === 2 && (l = hi(e), l !== 0 && (r = l, t = Wi(e, l))), t === 1) throw n = Ar, pn(e, 0), At(e, r), Fe(e, se()), n;
    if (t === 6) At(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Dp(l) && (t = bl(e, r), t === 2 && (o = hi(e), o !== 0 && (r = o, t = Wi(e, o))), t === 1)) throw n = Ar, pn(e, 0), At(e, r), Fe(e, se()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(k(345));
        case 2:
          an(e, Oe, wt);
          break;
        case 3:
          if (At(e, r), (r & 130023424) === r && (t = Ru + 500 - se(), 10 < t)) {
            if (Il(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              Re(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = ki(an.bind(null, e, Oe, wt), t);
            break;
          }
          an(e, Oe, wt);
          break;
        case 4:
          if (At(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - it(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = se() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Ip(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = ki(an.bind(null, e, Oe, wt), r);
            break;
          }
          an(e, Oe, wt);
          break;
        case 5:
          an(e, Oe, wt);
          break;
        default:
          throw Error(k(329));
      }
    }
  }
  return Fe(e, se()), e.callbackNode === n ? uf.bind(null, e) : null;
}
function Wi(e, t) {
  var n = Sr;
  return e.current.memoizedState.isDehydrated && (pn(e, t).flags |= 256), e = bl(e, t), e !== 2 && (t = Oe, Oe = n, t !== null && Hi(t)), e;
}
function Hi(e) {
  Oe === null ? Oe = e : Oe.push.apply(Oe, e);
}
function Dp(e) {
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
  for (t &= ~zu, t &= ~fo, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - it(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Zs(e) {
  if (H & 6) throw Error(k(327));
  Vn();
  var t = Il(e, 0);
  if (!(t & 1)) return Fe(e, se()), null;
  var n = bl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = hi(e);
    r !== 0 && (t = r, n = Wi(e, r));
  }
  if (n === 1) throw n = Ar, pn(e, 0), At(e, t), Fe(e, se()), n;
  if (n === 6) throw Error(k(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, an(e, Oe, wt), Fe(e, se()), null;
}
function ju(e, t) {
  var n = H;
  H |= 1;
  try {
    return e(t);
  } finally {
    H = n, H === 0 && (Zn = se() + 500, uo && en());
  }
}
function xn(e) {
  Bt !== null && Bt.tag === 0 && !(H & 6) && Vn();
  var t = H;
  H |= 1;
  var n = qe.transition, r = X;
  try {
    if (qe.transition = null, X = 1, e) return e();
  } finally {
    X = r, qe.transition = n, H = t, !(H & 6) && en();
  }
}
function Lu() {
  Be = Fn.current, q(Fn);
}
function pn(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, dp(n)), de !== null) for (n = de.return; n !== null; ) {
    var r = n;
    switch (fu(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Ul();
        break;
      case 3:
        Gn(), q(De), q(Ne), wu();
        break;
      case 5:
        xu(r);
        break;
      case 4:
        Gn();
        break;
      case 13:
        q(te);
        break;
      case 19:
        q(te);
        break;
      case 10:
        mu(r.type._context);
        break;
      case 22:
      case 23:
        Lu();
    }
    n = n.return;
  }
  if (ve = e, de = e = Gt(e.current, null), Se = Be = t, me = 0, Ar = null, zu = fo = vn = 0, Oe = Sr = null, fn !== null) {
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
function sf(e, t) {
  do {
    var n = de;
    try {
      if (hu(), _l.current = Gl, Yl) {
        for (var r = ne.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        Yl = !1;
      }
      if (yn = 0, ye = he = ne = null, xr = !1, Dr = 0, Nu.current = null, n === null || n.return === null) {
        me = 1, Ar = t, de = null;
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
          var S = Fs(i);
          if (S !== null) {
            S.flags &= -257, As(S, i, u, o, t), S.mode & 1 && $s(o, c, t), t = S, s = c;
            var E = t.updateQueue;
            if (E === null) {
              var v = /* @__PURE__ */ new Set();
              v.add(s), t.updateQueue = v;
            } else E.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              $s(o, c, t), Pu();
              break e;
            }
            s = Error(k(426));
          }
        } else if (b && u.mode & 1) {
          var A = Fs(i);
          if (A !== null) {
            !(A.flags & 65536) && (A.flags |= 256), As(A, i, u, o, t), du(Jn(s, u));
            break e;
          }
        }
        o = s = Jn(s, u), me !== 4 && (me = 2), Sr === null ? Sr = [o] : Sr.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var f = Vc(o, s, t);
              Ls(o, f);
              break e;
            case 1:
              u = s;
              var a = o.type, d = o.stateNode;
              if (!(o.flags & 128) && (typeof a.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (Kt === null || !Kt.has(d)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var x = Qc(o, u, t);
                Ls(o, x);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      ff(n);
    } catch (_) {
      t = _, de === n && n !== null && (de = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function af() {
  var e = Jl.current;
  return Jl.current = Gl, e === null ? Gl : e;
}
function Pu() {
  (me === 0 || me === 3 || me === 2) && (me = 4), ve === null || !(vn & 268435455) && !(fo & 268435455) || At(ve, Se);
}
function bl(e, t) {
  var n = H;
  H |= 2;
  var r = af();
  (ve !== e || Se !== t) && (wt = null, pn(e, t));
  do
    try {
      $p();
      break;
    } catch (l) {
      sf(e, l);
    }
  while (!0);
  if (hu(), H = n, Jl.current = r, de !== null) throw Error(k(261));
  return ve = null, Se = 0, me;
}
function $p() {
  for (; de !== null; ) cf(de);
}
function Fp() {
  for (; de !== null && !ad(); ) cf(de);
}
function cf(e) {
  var t = pf(e.alternate, e, Be);
  e.memoizedProps = e.pendingProps, t === null ? ff(e) : de = t, Nu.current = null;
}
function ff(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Lp(n, t), n !== null) {
        n.flags &= 32767, de = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        me = 6, de = null;
        return;
      }
    } else if (n = jp(n, t, Be), n !== null) {
      de = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      de = t;
      return;
    }
    de = t = e;
  } while (t !== null);
  me === 0 && (me = 5);
}
function an(e, t, n) {
  var r = X, l = qe.transition;
  try {
    qe.transition = null, X = 1, Ap(e, t, n, r);
  } finally {
    qe.transition = l, X = r;
  }
  return null;
}
function Ap(e, t, n, r) {
  do
    Vn();
  while (Bt !== null);
  if (H & 6) throw Error(k(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(k(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (xd(e, o), e === ve && (de = ve = null, Se = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || yl || (yl = !0, hf(Ol, function() {
    return Vn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = qe.transition, qe.transition = null;
    var i = X;
    X = 1;
    var u = H;
    H |= 4, Nu.current = null, Mp(e, n), lf(n, e), op(wi), Dl = !!xi, wi = xi = null, e.current = n, Op(n), cd(), H = u, X = i, qe.transition = o;
  } else e.current = n;
  if (yl && (yl = !1, Bt = e, ql = l), o = e.pendingLanes, o === 0 && (Kt = null), pd(n.stateNode), Fe(e, se()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Zl) throw Zl = !1, e = Ui, Ui = null, e;
  return ql & 1 && e.tag !== 0 && Vn(), o = e.pendingLanes, o & 1 ? e === Bi ? kr++ : (kr = 0, Bi = e) : kr = 0, en(), null;
}
function Vn() {
  if (Bt !== null) {
    var e = Va(ql), t = qe.transition, n = X;
    try {
      if (qe.transition = null, X = 16 > e ? 16 : e, Bt === null) var r = !1;
      else {
        if (e = Bt, Bt = null, ql = 0, H & 6) throw Error(k(331));
        var l = H;
        for (H |= 4, L = e.current; L !== null; ) {
          var o = L, i = o.child;
          if (L.flags & 16) {
            var u = o.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var c = u[s];
                for (L = c; L !== null; ) {
                  var g = L;
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      wr(8, g, o);
                  }
                  var p = g.child;
                  if (p !== null) p.return = g, L = p;
                  else for (; L !== null; ) {
                    g = L;
                    var h = g.sibling, S = g.return;
                    if (tf(g), g === c) {
                      L = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = S, L = h;
                      break;
                    }
                    L = S;
                  }
                }
              }
              var E = o.alternate;
              if (E !== null) {
                var v = E.child;
                if (v !== null) {
                  E.child = null;
                  do {
                    var A = v.sibling;
                    v.sibling = null, v = A;
                  } while (v !== null);
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
                wr(9, o, o.return);
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
            if (u = L, u.flags & 2048) try {
              switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  co(9, u);
              }
            } catch (_) {
              ie(u, u.return, _);
            }
            if (u === i) {
              L = null;
              break e;
            }
            var x = u.sibling;
            if (x !== null) {
              x.return = u.return, L = x;
              break e;
            }
            L = u.return;
          }
        }
        if (H = l, en(), mt && typeof mt.onPostCommitFiberRoot == "function") try {
          mt.onPostCommitFiberRoot(no, e);
        } catch (_) {
        }
        r = !0;
      }
      return r;
    } finally {
      X = n, qe.transition = t;
    }
  }
  return !1;
}
function qs(e, t, n) {
  t = Jn(n, t), t = Vc(e, t, 1), e = Xt(e, t, 1), t = Re(), e !== null && (Br(e, 1, t), Fe(e, t));
}
function ie(e, t, n) {
  if (e.tag === 3) qs(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      qs(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Kt === null || !Kt.has(r))) {
        e = Jn(n, e), e = Qc(t, e, 1), t = Xt(t, e, 1), e = Re(), t !== null && (Br(t, 1, e), Fe(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Up(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = Re(), e.pingedLanes |= e.suspendedLanes & n, ve === e && (Se & n) === n && (me === 4 || me === 3 && (Se & 130023424) === Se && 500 > se() - Ru ? pn(e, 0) : zu |= n), Fe(e, t);
}
function df(e, t) {
  t === 0 && (e.mode & 1 ? (t = ul, ul <<= 1, !(ul & 130023424) && (ul = 4194304)) : t = 1);
  var n = Re();
  e = Nt(e, t), e !== null && (Br(e, t, n), Fe(e, n));
}
function Bp(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), df(e, n);
}
function Wp(e, t) {
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
      throw Error(k(314));
  }
  r !== null && r.delete(t), df(e, n);
}
var pf;
pf = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || De.current) Ie = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Ie = !1, Rp(e, t, n);
    Ie = !!(e.flags & 131072);
  }
  else Ie = !1, b && t.flags & 1048576 && gc(t, Hl, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Nl(e, t), e = t.pendingProps;
      var l = Xn(t, Ne.current);
      Hn(t, n), l = ku(null, t, r, e, l, n);
      var o = Eu();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, $e(r) ? (o = !0, Bl(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, yu(t), l.updater = ao, t.stateNode = l, l._reactInternals = t, Ri(t, r, e, n), t = Pi(null, t, r, !0, o, n)) : (t.tag = 0, b && o && cu(t), ze(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Nl(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Vp(r), e = rt(r, e), l) {
          case 0:
            t = Li(null, t, r, e, n);
            break e;
          case 1:
            t = Ws(null, t, r, e, n);
            break e;
          case 11:
            t = Us(null, t, r, e, n);
            break e;
          case 14:
            t = Bs(null, t, r, rt(r.type, e), n);
            break e;
        }
        throw Error(k(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : rt(r, l), Li(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : rt(r, l), Ws(e, t, r, l, n);
    case 3:
      e: {
        if (Gc(t), e === null) throw Error(k(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, kc(e, t), Xl(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = Jn(Error(k(423)), t), t = Hs(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = Jn(Error(k(424)), t), t = Hs(e, t, r, n, l);
          break e;
        } else for (We = Qt(t.stateNode.containerInfo.firstChild), He = t, b = !0, ot = null, n = wc(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Kn(), r === l) {
            t = zt(e, t, n);
            break e;
          }
          ze(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Ec(t), e === null && Ti(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Si(r, l) ? i = null : o !== null && Si(r, o) && (t.flags |= 32), Yc(e, t), ze(e, t, i, n), t.child;
    case 6:
      return e === null && Ti(t), null;
    case 13:
      return Jc(e, t, n);
    case 4:
      return vu(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Yn(t, null, r, n) : ze(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : rt(r, l), Us(e, t, r, l, n);
    case 7:
      return ze(e, t, t.pendingProps, n), t.child;
    case 8:
      return ze(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ze(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, Y(Vl, r._currentValue), r._currentValue = i, o !== null) if (st(o.value, i)) {
          if (o.children === l.children && !De.current) {
            t = zt(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var u = o.dependencies;
          if (u !== null) {
            i = o.child;
            for (var s = u.firstContext; s !== null; ) {
              if (s.context === r) {
                if (o.tag === 1) {
                  s = Ct(-1, n & -n), s.tag = 2;
                  var c = o.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var g = c.pending;
                    g === null ? s.next = s : (s.next = g.next, g.next = s), c.pending = s;
                  }
                }
                o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), Ni(
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
            if (i = o.return, i === null) throw Error(k(341));
            i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), Ni(i, n, t), i = o.sibling;
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
      return l = t.type, r = t.pendingProps.children, Hn(t, n), l = be(l), r = r(l), t.flags |= 1, ze(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = rt(r, t.pendingProps), l = rt(r.type, l), Bs(e, t, r, l, n);
    case 15:
      return Xc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : rt(r, l), Nl(e, t), t.tag = 1, $e(r) ? (e = !0, Bl(t)) : e = !1, Hn(t, n), Hc(t, r, l), Ri(t, r, l, n), Pi(null, t, r, !0, e, n);
    case 19:
      return Zc(e, t, n);
    case 22:
      return Kc(e, t, n);
  }
  throw Error(k(156, t.tag));
};
function hf(e, t) {
  return Ua(e, t);
}
function Hp(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ze(e, t, n, r) {
  return new Hp(e, t, n, r);
}
function Mu(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Vp(e) {
  if (typeof e == "function") return Mu(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === qi) return 11;
    if (e === bi) return 14;
  }
  return 2;
}
function Gt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ze(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function jl(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") Mu(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case zn:
      return hn(n.children, l, o, t);
    case Zi:
      i = 8, l |= 8;
      break;
    case bo:
      return e = Ze(12, n, t, l | 2), e.elementType = bo, e.lanes = o, e;
    case ei:
      return e = Ze(13, n, t, l), e.elementType = ei, e.lanes = o, e;
    case ti:
      return e = Ze(19, n, t, l), e.elementType = ti, e.lanes = o, e;
    case Ea:
      return po(n, l, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Sa:
          i = 10;
          break e;
        case ka:
          i = 9;
          break e;
        case qi:
          i = 11;
          break e;
        case bi:
          i = 14;
          break e;
        case It:
          i = 16, r = null;
          break e;
      }
      throw Error(k(130, e == null ? e : typeof e, ""));
  }
  return t = Ze(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
}
function hn(e, t, n, r) {
  return e = Ze(7, e, r, t), e.lanes = n, e;
}
function po(e, t, n, r) {
  return e = Ze(22, e, r, t), e.elementType = Ea, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Go(e, t, n) {
  return e = Ze(6, e, null, t), e.lanes = n, e;
}
function Jo(e, t, n) {
  return t = Ze(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Qp(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = jo(0), this.expirationTimes = jo(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = jo(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Ou(e, t, n, r, l, o, i, u, s) {
  return e = new Qp(e, t, n, u, s), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Ze(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, yu(o), e;
}
function Xp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Nn, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function mf(e) {
  if (!e) return Zt;
  e = e._reactInternals;
  e: {
    if (Sn(e) !== e || e.tag !== 1) throw Error(k(170));
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
    throw Error(k(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if ($e(n)) return hc(e, n, t);
  }
  return t;
}
function gf(e, t, n, r, l, o, i, u, s) {
  return e = Ou(n, r, !0, e, l, o, i, u, s), e.context = mf(null), n = e.current, r = Re(), l = Yt(n), o = Ct(r, l), o.callback = t != null ? t : null, Xt(n, o, l), e.current.lanes = l, Br(e, l, r), Fe(e, r), e;
}
function ho(e, t, n, r) {
  var l = t.current, o = Re(), i = Yt(l);
  return n = mf(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ct(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Xt(l, t, i), e !== null && (ut(e, l, i, o), Cl(e, l, i)), i;
}
function eo(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function bs(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Iu(e, t) {
  bs(e, t), (e = e.alternate) && bs(e, t);
}
function Kp() {
  return null;
}
var yf = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Du(e) {
  this._internalRoot = e;
}
mo.prototype.render = Du.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(k(409));
  ho(e, t, null, null);
};
mo.prototype.unmount = Du.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    xn(function() {
      ho(null, e, null, null);
    }), t[Tt] = null;
  }
};
function mo(e) {
  this._internalRoot = e;
}
mo.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Ka();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Ft.length && t !== 0 && t < Ft[n].priority; n++) ;
    Ft.splice(n, 0, e), n === 0 && Ga(e);
  }
};
function $u(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function go(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function ea() {
}
function Yp(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = eo(i);
        o.call(c);
      };
    }
    var i = gf(t, r, e, 0, null, !1, !1, "", ea);
    return e._reactRootContainer = i, e[Tt] = i.current, Lr(e.nodeType === 8 ? e.parentNode : e), xn(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function() {
      var c = eo(s);
      u.call(c);
    };
  }
  var s = Ou(e, 0, !1, null, null, !1, !1, "", ea);
  return e._reactRootContainer = s, e[Tt] = s.current, Lr(e.nodeType === 8 ? e.parentNode : e), xn(function() {
    ho(t, s, n, r);
  }), s;
}
function yo(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var u = l;
      l = function() {
        var s = eo(i);
        u.call(s);
      };
    }
    ho(t, i, e, l);
  } else i = Yp(n, t, e, l, r);
  return eo(i);
}
Qa = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = dr(t.pendingLanes);
        n !== 0 && (nu(t, n | 1), Fe(t, se()), !(H & 6) && (Zn = se() + 500, en()));
      }
      break;
    case 13:
      xn(function() {
        var r = Nt(e, 1);
        if (r !== null) {
          var l = Re();
          ut(r, e, 1, l);
        }
      }), Iu(e, 1);
  }
};
ru = function(e) {
  if (e.tag === 13) {
    var t = Nt(e, 134217728);
    if (t !== null) {
      var n = Re();
      ut(t, e, 134217728, n);
    }
    Iu(e, 134217728);
  }
};
Xa = function(e) {
  if (e.tag === 13) {
    var t = Yt(e), n = Nt(e, t);
    if (n !== null) {
      var r = Re();
      ut(n, e, t, r);
    }
    Iu(e, t);
  }
};
Ka = function() {
  return X;
};
Ya = function(e, t) {
  var n = X;
  try {
    return X = e, t();
  } finally {
    X = n;
  }
};
fi = function(e, t, n) {
  switch (t) {
    case "input":
      if (li(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = io(r);
            if (!l) throw Error(k(90));
            _a(r), li(r, l);
          }
        }
      }
      break;
    case "textarea":
      Na(e, n);
      break;
    case "select":
      t = n.value, t != null && An(e, !!n.multiple, t, !1);
  }
};
Oa = ju;
Ia = xn;
var Gp = { usingClientEntryPoint: !1, Events: [Hr, Pn, io, Pa, Ma, ju] }, ar = { findFiberByHostInstance: cn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Jp = { bundleType: ar.bundleType, version: ar.version, rendererPackageName: ar.rendererPackageName, rendererConfig: ar.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Rt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Fa(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: ar.findFiberByHostInstance || Kp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined") {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    no = vl.inject(Jp), mt = vl;
  } catch (e) {
  }
}
Qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Gp;
Qe.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!$u(t)) throw Error(k(200));
  return Xp(e, t, null, n);
};
Qe.createRoot = function(e, t) {
  if (!$u(e)) throw Error(k(299));
  var n = !1, r = "", l = yf;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Ou(e, 1, !1, null, null, n, !1, r, l), e[Tt] = t.current, Lr(e.nodeType === 8 ? e.parentNode : e), new Du(t);
};
Qe.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(k(188)) : (e = Object.keys(e).join(","), Error(k(268, e)));
  return e = Fa(t), e = e === null ? null : e.stateNode, e;
};
Qe.flushSync = function(e) {
  return xn(e);
};
Qe.hydrate = function(e, t, n) {
  if (!go(t)) throw Error(k(200));
  return yo(null, e, t, !0, n);
};
Qe.hydrateRoot = function(e, t, n) {
  if (!$u(e)) throw Error(k(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = yf;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = gf(t, null, e, 1, n != null ? n : null, l, !1, o, i), e[Tt] = t.current, Lr(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new mo(t);
};
Qe.render = function(e, t, n) {
  if (!go(t)) throw Error(k(200));
  return yo(null, e, t, !1, n);
};
Qe.unmountComponentAtNode = function(e) {
  if (!go(e)) throw Error(k(40));
  return e._reactRootContainer ? (xn(function() {
    yo(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Tt] = null;
    });
  }), !0) : !1;
};
Qe.unstable_batchedUpdates = ju;
Qe.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!go(n)) throw Error(k(200));
  if (e == null || e._reactInternals === void 0) throw Error(k(38));
  return yo(e, t, n, !1, r);
};
Qe.version = "18.3.1-next-f1338f8080-20240426";
function vf() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ == "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(vf);
    } catch (e) {
      console.error(e);
    }
}
vf(), ya.exports = Qe;
var Zp = ya.exports, xf, ta = Zp;
xf = ta.createRoot, ta.hydrateRoot;
const na = [
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
], ra = { "#39ff14": 110, "#ff2fbf": 320, "#00e5ff": 190, "#ff6b6b": 0, "#ffd93d": 55, "#7c3aed": 265 };
function la(e) {
  return na[(e - 1) % na.length];
}
function $t(e) {
  const t = Math.floor((e - 1) / 10) + 1, n = (e - 1) % 10 + 1, r = bp.worlds[t - 1];
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
function qp(e) {
  return $t(e).tiles;
}
function Zo(e) {
  return $t(e).time;
}
const oa = [
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
], bp = {
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
function e0(e, t = 0.15) {
  const n = R.useRef(null), r = R.useRef(null), l = R.useRef(null), o = typeof window != "undefined" ? window : {}, i = () => {
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
  }, u = (v = 440, A = 0.12, f = "sine", a = 0.07) => {
    const d = i();
    if (d)
      try {
        const x = d.createOscillator(), _ = d.createGain();
        x.type = f, x.frequency.value = v, _.gain.value = a, x.connect(_), _.connect(d.destination), d.state === "suspended" && d.resume().catch(() => {
        });
        const j = d.currentTime;
        x.start(j), x.stop(j + A);
      } catch (x) {
      }
  }, s = (v, A = 0.12, f = 0.04) => {
    const a = i();
    if (!(!a || !v || !v.length))
      try {
        a.state === "suspended" && a.resume().catch(() => {
        }), v.forEach((d, x) => {
          const _ = a.createOscillator(), j = a.createGain();
          _.type = "triangle", _.frequency.value = d, j.gain.value = 0.08, _.connect(j), j.connect(a.destination);
          const P = a.currentTime + x * (A + f);
          _.start(P), _.stop(P + A);
        });
      } catch (d) {
      }
  }, c = () => {
    if (!r.current)
      try {
        const v = new Audio("sistema_apps_api/lumetrix/audiofondo.mp3");
        v.loop = !0, v.volume = t, r.current = v;
      } catch (v) {
        console.log("Error cargando audio de fondo:", v);
      }
  }, g = (v = !0) => {
    if (!(!v || !r.current))
      try {
        r.current.play().catch((A) => {
          console.log("Error reproduciendo audio de fondo:", A);
        });
      } catch (A) {
      }
  }, p = () => {
    if (r.current)
      try {
        r.current.pause(), r.current.currentTime = 0;
      } catch (v) {
      }
  }, h = (v) => {
    r.current && (r.current.volume = v);
  }, S = () => {
    if (!l.current)
      try {
        const v = new Audio("sistema_apps_api/lumetrix/jugar.mp3");
        v.volume = 0.7, l.current = v;
      } catch (v) {
        console.log("Error cargando audio de inicio:", v);
      }
  }, E = () => {
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
      E();
    },
    ok: (v) => u(v || 880, 0.1, "triangle", 0.07),
    fail: () => u(260, 0.12, "sine", 0.045),
    // suave "meck"
    blink: (v) => u(v || 720, 0.12, "sine", 0.08),
    // Victoria: siempre trozo corto (5–6 notas) + retraso 300ms
    winMelody: (v) => {
      const A = v && v.length ? v.slice(0, 6) : [659.25, 880, 1046.5];
      setTimeout(() => s(A, 0.12, 0.04), 300);
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
function xt(e, t) {
  try {
    t && navigator.vibrate && navigator.vibrate(e);
  } catch (n) {
  }
}
function t0() {
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
function n0({ onPlay: e, onAuth: t }) {
  const n = R.useRef(null), r = R.useRef(null), [l, o] = R.useState(!1), [i, u] = R.useState(null);
  return R.useEffect(() => {
    const s = n.current;
    if (!s) return;
    const g = setInterval(() => {
      const p = document.createElement("i"), h = 20 + Math.random() * 25, S = 40 + Math.random() * 60;
      let E, v;
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
        ], x = d[Math.floor(Math.random() * d.length)];
        E = x.x[0] + Math.random() * (x.x[1] - x.x[0]), v = x.y[0] + Math.random() * (x.y[1] - x.y[0]);
      } else
        E = Math.random() * 100, v = Math.random() * 100;
      p.style.left = E + "%", p.style.top = v + "%", p.style.width = h + "px", p.style.height = S + "px";
      const f = [0, 60, 120, 180, 240, 300, 45, 135, 225, 315], a = f[Math.floor(Math.random() * f.length)];
      p.style.background = `hsl(${a} 95% 65% / .9)`, s.appendChild(p), setTimeout(() => p.remove(), 3e3);
    }, 80);
    return () => clearInterval(g);
  }, []), R.useEffect(() => {
    const s = () => {
      var E;
      const g = r.current;
      if (!g) return;
      const p = (E = g.parentElement) == null ? void 0 : E.parentElement;
      if (!p) return;
      g.style.fontSize = "";
      let h = Math.min(42, Math.max(28, Math.floor(p.clientWidth * 0.16)));
      g.style.fontSize = h + "px", g.style.letterSpacing = "0.16em";
      let S = 0;
      for (; g.scrollWidth > p.clientWidth - 24 && S < 20; )
        h -= 1, g.style.fontSize = h + "px", S++;
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
function r0({ level: e, setLevel: t, soundOn: n, musicOn: r, musicVolume: l, vibrateOn: o, onOpenAuth: i, onOpenRanking: u, onOpenOptions: s, onTotalUpdate: c, totalTime: g }) {
  const p = R.useRef(null), [h, S] = R.useState(Zo(e)), [E, v] = R.useState(!1), [A, f] = R.useState(!1), [a, d] = R.useState(!1), [x, _] = R.useState(!1), [j, P] = R.useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0;
    } catch (y) {
      return 0;
    }
  });
  R.useEffect(() => {
    typeof g == "number" && P(g);
  }, [g]);
  const N = e0(n, l), K = Math.floor((e - 1) / 10) + 1, U = (e - 1) % 10 + 1, ae = R.useMemo(() => la(e), [e]);
  R.useEffect(() => {
    N.initBg(), N.initStart();
    const y = setTimeout(() => {
      N.startBg(r);
    }, 1e3);
    return () => clearTimeout(y);
  }, [N, r]), R.useEffect(() => {
    r ? N.startBg(!0) : N.stopBg();
  }, [r, N]), R.useEffect(() => {
    N.updateVolume(l);
  }, [l, N]);
  const tn = (y) => {
    const w = $t(y), C = w.mechanics, O = Math.floor((y - 1) / 10) + 1;
    if (console.log(`CACHE_ROTO_NUEVO_CODIGO_FUNCIONANDO_Nivel_${y}_mechanics_`, C), C.includes("drag") && C.includes("double")) {
      console.log("COMBO DETECTADO: drag + double");
      const T = w.tiles, M = Math.max(1, Math.floor(T / 4)), I = Math.max(1, Math.floor(T / 4)), ce = [...Array.from({ length: T }, (ge, Ae) => Ae)].sort(() => Math.random() - 0.5), fe = new Set(ce.slice(0, M)), xe = new Set(ce.slice(M, M + I)), G = new Set(ce.slice(M + I));
      if (Qr(fe), Xr(xe), Kr(G), yt(xe), vt.current = xe, fe.size > 0) {
        const ge = Array.from(fe)[0];
        D(ge), Q.current = ge, xo(ge);
      } else
        D(null), Q.current = null, xo(null);
      console.log("COMBO: dragTiles=", Array.from(new Set(ce.slice(0, M)))), console.log("COMBO: doubleTiles=", Array.from(xe)), console.log("COMBO: touchTiles=", Array.from(new Set(ce.slice(M + I))));
    } else if (C.includes("double") && !C.includes("drag")) {
      console.log(`DEBUG: Nivel ${y} - detectado como doble toque. mechanics=`, C);
      const T = 1, M = /* @__PURE__ */ new Set();
      for (; M.size < T; ) {
        const I = Math.floor(Math.random() * w.tiles);
        M.add(I);
      }
      console.log(`Mundo ${O}, Nivel ${y}: Fichas de doble toque = [${Array.from(M)}], Total fichas = ${w.tiles}`), vt.current = M, yt(M), Qr(/* @__PURE__ */ new Set()), Xr(/* @__PURE__ */ new Set()), Kr(/* @__PURE__ */ new Set()), xo(null), D(null), Q.current = null;
    } else if (O >= 2 && C.includes("drag")) {
      const T = w.tiles, M = Array.from({ length: T - 1 }, (ce, fe) => fe + 1), I = Math.floor(Math.random() * M.length), ee = M[I];
      console.log(`Mundo ${O}, Nivel ${y}: Ficha especial = ${ee}, Total fichas = ${T}`), D(ee), Q.current = ee, vt.current.clear(), yt(/* @__PURE__ */ new Set()), Qr(/* @__PURE__ */ new Set()), Xr(/* @__PURE__ */ new Set()), Kr(/* @__PURE__ */ new Set());
    } else
      vt.current.clear(), yt(/* @__PURE__ */ new Set()), Qr(/* @__PURE__ */ new Set()), Xr(/* @__PURE__ */ new Set()), Kr(/* @__PURE__ */ new Set()), D(null), Q.current = null;
    Ye.current.clear(), kn(/* @__PURE__ */ new Set());
  }, [nn, vo] = R.useState([]), [ue, Pe] = R.useState(null), [Me, z] = R.useState(null), [$, D] = R.useState(null), V = R.useRef(null), le = R.useRef({ x: 0, y: 0 }), tt = R.useRef({ x: 0, y: 0 }), Q = R.useRef(null), Ke = R.useRef(null), [jt, yt] = R.useState(/* @__PURE__ */ new Set()), vt = R.useRef(/* @__PURE__ */ new Set()), [s0, kn] = R.useState(/* @__PURE__ */ new Set()), Ye = R.useRef(/* @__PURE__ */ new Set()), [Fu, Qr] = R.useState(/* @__PURE__ */ new Set()), [Au, Xr] = R.useState(/* @__PURE__ */ new Set()), [a0, Kr] = R.useState(/* @__PURE__ */ new Set()), [c0, xo] = R.useState(null), Ee = R.useRef([]), oe = R.useRef(0);
  R.useRef(/* @__PURE__ */ new Map());
  const Lt = R.useRef(null), rn = R.useRef(!1), wo = 8, So = R.useRef({ x: 0, y: 0 }), ko = R.useRef(!1), Yr = (y) => {
    const C = ($t(e) || { mechanics: [] }).mechanics || [], O = Math.floor((e - 1) / 10) + 1;
    return C.includes("combo") || C.includes("touch") && C.includes("drag") && C.includes("double") ? Fu.has(y) : O >= 2 && C.includes("drag") ? Q.current === y : !1;
  }, wf = (y = "tap") => {
    const w = p.current;
    if (!w || Q.current == null) return;
    const C = w.querySelector(`.tile[data-id="${Q.current}"]`);
    if (!C) return;
    C.classList.remove("nudge-shake"), C.offsetHeight, C.classList.add("nudge-shake"), setTimeout(() => C.classList.remove("nudge-shake"), 550), Pe((I) => I && { ...I, hint: !0 }), setTimeout(() => Pe((I) => I && { ...I, hint: !1 }), 900);
    const O = C.getBoundingClientRect(), T = w.getBoundingClientRect(), M = document.createElement("div");
    M.className = "drag-hint", M.textContent = "arrastra", Object.assign(M.style, {
      left: `${O.left - T.left + O.width / 2}px`,
      top: `${O.top - T.top}px`
    }), w.appendChild(M), requestAnimationFrame(() => M.classList.add("show")), setTimeout(() => {
      M.classList.remove("show"), setTimeout(() => {
        try {
          M.remove();
        } catch (I) {
        }
      }, 180);
    }, 800);
    try {
      N.blink(720);
    } catch (I) {
    }
    xt(10, o);
  }, Sf = (y) => {
    const w = p.current;
    if (!w) return;
    const C = w.querySelector(`.tile[data-id="${y}"]`);
    if (!C) return;
    C.classList.remove("nudge-shake"), C.offsetHeight, C.classList.add("nudge-shake"), setTimeout(() => C.classList.remove("nudge-shake"), 550);
    const O = C.getBoundingClientRect(), T = w.getBoundingClientRect(), M = document.createElement("div");
    M.className = "drag-hint", M.textContent = "dos veces", Object.assign(M.style, {
      left: `${O.left - T.left + O.width / 2}px`,
      top: `${O.top - T.top}px`
    }), w.appendChild(M), requestAnimationFrame(() => M.classList.add("show")), setTimeout(() => {
      M.classList.remove("show"), setTimeout(() => {
        try {
          M.remove();
        } catch (I) {
        }
      }, 180);
    }, 800);
    try {
      N.blink(720);
    } catch (I) {
    }
    xt(10, o);
  }, Gr = (y = "unknown") => {
    const w = p.current, C = Q.current;
    if (!w || C == null) return;
    const O = w.querySelector(`.tile[data-id="${C}"]`);
    if (!O) return;
    let T = Ke.current;
    if (!T && O.dataset.origX && (T = {
      x: parseFloat(O.dataset.origX),
      y: parseFloat(O.dataset.origY),
      width: parseFloat(O.dataset.origW),
      height: parseFloat(O.dataset.origH)
    }), !T) {
      console.warn("restoreSpecialTile: no original position", { reason: y, id: C });
      return;
    }
    O.style.position = "absolute", O.style.left = `${T.x}px`, O.style.top = `${T.y}px`, O.style.width = `${T.width}px`, O.style.height = `${T.height}px`, O.classList.remove("dragging"), O.style.zIndex = "", O.style.pointerEvents = "", z(null), V.current = null, console.log(`Ficha especial ${C} restaurada (${y}) →`, T);
  }, Uu = (y, w, C, O, T = 48) => {
    if (!C || !O) return !1;
    const M = O.getBoundingClientRect(), I = y - M.left, ee = w - M.top;
    return I > C.x - T && I < C.x + C.w + T && ee > C.y - T && ee < C.y + C.h + T;
  }, Bu = (y) => {
    var C;
    const w = (C = p.current) == null ? void 0 : C.querySelector(`.tile[data-id="${y}"]`);
    if (w) {
      const O = parseFloat(w.dataset.pitch || "880");
      w.style.background = ln.current || ae, w.style.pointerEvents = "none", w.style.opacity = "0.7", N.ok(O), xt(20, o);
    }
  }, Wu = () => {
    if (oe.current++, oe.current >= Ee.current.length) {
      if (!on.current) {
        on.current = !0;
        const y = Math.ceil((Date.now() - Jr.current) / 1e3);
        Eo(y);
        try {
          window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
            method: "POST",
            body: JSON.stringify({
              level: e,
              total_time_s: y,
              success: 1
            })
          }).catch((w) => {
            console.log("No hay sesión activa para guardar progreso");
          });
        } catch (w) {
        }
      }
      Lt.current && clearInterval(Lt.current), v(!1), rn.current = !1, f(!0);
      try {
        N.winMelody((Zr.current || []).slice(0, 6));
      } catch (y) {
      }
    }
  }, Hu = () => {
    N.fail(), xt(80, o), oe.current = 0, br(), Ye.current.clear(), kn(/* @__PURE__ */ new Set());
    const y = p.current;
    if (y && Q.current !== null && Ke.current) {
      const w = y.querySelector(`.tile[data-id="${Q.current}"]`);
      w && (w.style.position = "absolute", w.style.left = `${Ke.current.x}px`, w.style.top = `${Ke.current.y}px`, w.style.width = `${Ke.current.width}px`, w.style.height = `${Ke.current.height}px`, w.style.zIndex = "", w.style.pointerEvents = "", w.classList.remove("dragging"), console.log(`Ficha especial ${Q.current} reposicionada a su lugar original:`, Ke.current));
    }
  }, Jr = R.useRef(0), Zr = R.useRef([]), ln = R.useRef(ae), on = R.useRef(!1);
  R.useEffect(() => {
    var w;
    const y = (w = p.current) == null ? void 0 : w.closest(".device");
    y && y.style.setProperty("--accent", ae);
  }, [ae]);
  const Eo = (y) => {
    try {
      const C = (Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0) + y;
      localStorage.setItem("lum_total", JSON.stringify(C)), P(C), typeof c == "function" && c(C);
    } catch (w) {
    }
  };
  function kf(y, w = null, C = null) {
    var Pt;
    const O = C || vt.current;
    console.log(`placeTiles llamado: n=${y}, currentSpecialId=${w}, doubleTouchTiles=`, Array.from(O));
    const T = p.current;
    if (!T) return;
    T.querySelectorAll(".tile, .dropzone").forEach((F) => F.remove());
    const M = T.getBoundingClientRect(), I = M.width, ee = M.height, ce = (F, pe) => Math.random() * (pe - F) + F, fe = (Pt = ra[ln.current || ae]) != null ? Pt : 0, xe = () => {
      let F = Math.floor(Math.random() * 360), pe = 0;
      for (; Math.min(Math.abs(F - fe), 360 - Math.abs(F - fe)) < 30 && pe++ < 120; )
        F = Math.floor(Math.random() * 360);
      return F;
    };
    let G = null;
    Math.floor((e - 1) / 10) + 1 >= 2 && w !== null && (G = "hsl(300 96% 58%)");
    const Ae = [], at = /* @__PURE__ */ new Set();
    for (let F = 0; F < y; F++) {
      let pe = 0, Ue = 0, Mt = 0, ft = 0, el = !1, _f = 0;
      for (; !el && _f++ < 300; )
        pe = Math.max(56, Math.min(140, 60 + Math.random() * 80)), Ue = Math.max(56, Math.min(160, 60 + Math.random() * 100)), Mt = Math.max(8, Math.min(I - pe - 8, ce(0, I - pe))), ft = Math.max(8, Math.min(ee - Ue - 8, ce(0, ee - Ue))), el = !Ae.some((J) => !(Mt + pe <= J.x || J.x + J.w <= Mt || ft + Ue <= J.y || J.y + J.h <= ft));
      Ae.push({ x: Mt, y: ft, w: pe, h: Ue });
      const W = document.createElement("button");
      W.type = "button", W.className = "tile";
      let Cn;
      if (w === F && G)
        Cn = G, at.add(G);
      else {
        let J;
        do
          J = xe(), Cn = `hsl(${J} 96% 58%)`;
        while (at.has(Cn) || Cn === G);
        at.add(Cn);
      }
      if (Object.assign(W.style, { left: Mt + "px", top: ft + "px", width: pe + "px", height: Ue + "px", background: Cn }), W.style.background === (ln.current || ae)) {
        const J = ((ra[ln.current || ae] || 0) + 180) % 360;
        W.style.background = `hsl(${J} 96% 58%)`;
      }
      W.dataset.id = String(F), W.dataset.orig = W.style.background;
      const Vu = Zr.current || [];
      W.dataset.pitch = String(Vu[F % Vu.length] || 660);
      const tl = $t(e).mechanics, Qu = Math.floor((e - 1) / 10) + 1;
      if (W.style.cursor = "pointer", Qu >= 2 && Q.current === F && (W.classList.add("special-drag-tile"), W.addEventListener("dragstart", (J) => J.preventDefault()), W.addEventListener("touchstart", (J) => J.preventDefault(), { passive: !1 }), W.addEventListener("pointerdown", (J) => {
        Co(J, { id: F });
      }, { passive: !1 }), setTimeout(() => {
        var Xu;
        const J = W.getBoundingClientRect(), un = (Xu = p.current) == null ? void 0 : Xu.getBoundingClientRect();
        if (un) {
          const _n = {
            x: J.left - un.left,
            y: J.top - un.top,
            width: J.width,
            height: J.height
          };
          Ke.current = _n, W.dataset.origX = String(_n.x), W.dataset.origY = String(_n.y), W.dataset.origW = String(_n.width), W.dataset.origH = String(_n.height), console.log("Posición original guardada:", _n);
        }
      }, 50), console.log(`Ficha especial ${F} configurada para arrastre con clase 'special-drag-tile' (SIN event listener específico)`)), tl.includes("combo") || tl.includes("touch") && tl.includes("drag") && tl.includes("double"))
        if (Fu.has(F)) {
          const J = W.style.background;
          W.style.border = `1px solid ${J}`, W.style.boxShadow = `0 0 8px ${J}88`, W.style.cursor = "grab", W.addEventListener("pointerdown", (un) => Co(un, F)), W.addEventListener("dragstart", (un) => un.preventDefault()), console.log(`Ficha ${F} marcada como ARRASTRE en COMBO`);
        } else Au.has(F) ? (W.style.setProperty("border", "2px solid white", "important"), W.style.setProperty("outline", "2px solid white", "important"), W.style.setProperty("outline-offset", "4px", "important"), console.log(`Ficha ${F} marcada como doble toque en COMBO - BORDE DOBLE APLICADO`)) : (W.style.border = "1px solid rgba(255,255,255,0.2)", W.style.boxShadow = "none");
      else
        console.log(`Procesando ficha ${F}, doubleTouchTiles:`, Array.from(O), `¿Tiene ${F}?`, O.has(F)), O.has(F) && (W.style.setProperty("border", "2px solid white", "important"), W.style.setProperty("outline", "2px solid white", "important"), W.style.setProperty("outline-offset", "4px", "important"), console.log(`🚨 CACHE ROOTO - Ficha ${F} marcada como doble toque - BORDES BLANCOS APLICADOS`));
      Qu >= 2 && Q.current === F && (W.style.cursor = "grab", console.log(`Cursor 'grab' aplicado a ficha especial ${F}`)), T.appendChild(W);
    }
    T.__lumDeleg && T.removeEventListener("pointerdown", T.__lumDeleg);
    const ct = (F) => {
      const pe = F.target && F.target.closest && F.target.closest(".tile");
      if (!pe || !T.contains(pe) || !rn.current) return;
      const Ue = Number(pe.dataset.id), Mt = Ee.current[oe.current], ft = Yr(Mt);
      if (pe.classList.contains("special-drag-tile") || Ue === Q.current) {
        Co(F, { id: Ue });
        return;
      }
      ft || (F.preventDefault && F.preventDefault(), tr(Ue));
    };
    T.addEventListener("pointerdown", ct, { passive: !1 }), T.__lumDeleg = ct;
  }
  function qr(y) {
    const w = p.current, C = w && w.querySelector(`.tile[data-id="${y}"]`);
    if (!C) return;
    C.style.background;
    const O = C.style.border, T = C.style.boxShadow, M = C.style.outline, I = C.style.outlineOffset;
    C.classList.add("lit"), C.style.background = ln.current || ae, N.blink(parseFloat(C.dataset.pitch || "720")), setTimeout(() => {
      C.classList.remove("lit"), vt.current.has(y) && (C.style.border = O, C.style.boxShadow = T, C.style.outline = M, C.style.outlineOffset = I);
    }, 260);
  }
  function Ef() {
    const y = Ee.current;
    y && y.length && qr(y[0]);
  }
  function br() {
    const y = p.current;
    y && y.querySelectorAll(".tile").forEach((w) => {
      w.style.background = w.dataset.orig || w.style.background, w.classList.remove("lit"), w.style.opacity = "1";
    });
  }
  function En(y) {
    var Ae;
    const w = typeof y == "number" ? y : e, C = (Ae = p.current) == null ? void 0 : Ae.closest(".device");
    ln.current = la(w), C && C.style.setProperty("--accent", ln.current), f(!1), d(!1), _(!1), on.current = !1, Lt.current && clearInterval(Lt.current);
    const O = qp(w), T = Array.from({ length: O }, (at, ct) => ct), M = 0, I = T.slice(1).sort(() => Math.random() - 0.5);
    Ee.current = [M, ...I], console.log(`Secuencia generada para nivel ${w}:`, Ee.current), oe.current = 0, Zr.current = oa[Math.floor(Math.random() * oa.length)] || [440, 494, 523, 587, 659, 698, 784, 880, 988, 1046, 1174, 1318, 1396, 1567, 1760], tn(w);
    let ee = null, ce = /* @__PURE__ */ new Set();
    const fe = Math.floor((w - 1) / 10) + 1;
    $t(w).mechanics, ee = Q.current, ce = vt.current, kf(O, ee, ce), setTimeout(() => {
      var ct, Pt, F;
      const at = $t(w);
      if (fe >= 2 && ee !== null && at.mechanics.includes("drag")) {
        const pe = (ct = p.current) == null ? void 0 : ct.querySelector(`.tile[data-id="${ee}"]`);
        if (pe) {
          const Ue = pe.getBoundingClientRect();
          if ((Pt = p.current) == null ? void 0 : Pt.getBoundingClientRect()) {
            (F = p.current) == null || F.getBoundingClientRect();
            const ft = 60, el = {
              x: ft,
              // Esquina izquierda con margen
              y: ft,
              // Esquina superior con margen
              w: Ue.width,
              h: Ue.height,
              color: pe.style.backgroundColor,
              over: !1
            };
            Pe(el), console.log(`Zona de drop creada para ficha ${ee}`);
          }
        }
      } else
        Pe(null);
    }, 100);
    const G = Zo(w);
    S(G), v(!0), rn.current = !0, N.start(), Jr.current = Date.now();
    const ge = Date.now();
    Lt.current = setInterval(() => {
      const at = (Date.now() - ge) / 1e3, ct = Math.max(0, G - at);
      if (S(Math.ceil(ct)), ct <= 0) {
        if (!on.current) {
          on.current = !0;
          const Pt = Math.ceil((Date.now() - Jr.current) / 1e3);
          Eo(Pt);
          try {
            window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
              method: "POST",
              body: JSON.stringify({
                level: e,
                total_time_s: Pt,
                success: 0
              })
            }).catch((F) => {
              console.log("No hay sesión activa para guardar progreso");
            });
          } catch (F) {
          }
        }
        clearInterval(Lt.current), v(!1), rn.current = !1, Gr("timeout"), d(!0), N.fail(), br();
      }
    }, 100), setTimeout(Ef, 1500);
  }
  R.useEffect(() => {
    const y = (w) => {
      ko.current && (w.preventDefault(), w.stopPropagation(), ko.current = !1, console.log("Click sintético anulado tras drag"));
    };
    return document.addEventListener("click", y, !0), () => document.removeEventListener("click", y, !0);
  }, []), R.useEffect(() => {
    window.LumetrixTest = Object.assign({}, window.LumetrixTest, {
      start: En,
      state: () => ({ level: e, world: K, levelInWorld: U, running: E, time: h, seqLen: (Ee.current || []).length }),
      tapExpected: () => {
        const y = Ee.current[oe.current];
        y != null && tr(y);
      },
      tapId: (y) => tr(y),
      isDragStep: () => {
        const y = Ee.current[oe.current];
        return Yr(y);
      },
      test: {
        ignoreClicksOnDragStep: () => {
          const y = Ee.current[oe.current], w = oe.current;
          return Yr(y) ? (tr(y === 0 ? 1 : 0), { ok: oe.current === w, step: oe.current, expected: y }) : { ok: !1, reason: "not drag step" };
        }
      }
    });
  }, [e, K, U, E, h]);
  const Co = (y, w) => {
    var M;
    if (!rn.current) return;
    const C = Ee.current[oe.current], O = p.current, T = O == null ? void 0 : O.querySelector(`.tile[data-id="${w.id}"]`);
    if (T) {
      if (w.id === Q.current) {
        console.log(`Ficha especial ${w.id} tocada, esperada: ${C}`), y.preventDefault(), y.stopPropagation();
        const I = T.getBoundingClientRect();
        So.current = { x: I.left, y: I.top }, ko.current = !0, z(w.id), V.current = (M = y.pointerId) != null ? M : null, le.current = { x: y.clientX - I.left, y: y.clientY - I.top }, tt.current = { x: I.left, y: I.top }, T.style.zIndex = 1e3, T.classList.add("dragging"), T.style.pointerEvents = "none", T.style.touchAction = "none", console.log("Drag iniciado correctamente - ficha en posición original");
        return;
      }
      if (w.id !== C) return Hu();
      Bu(w.id), Wu();
    }
  };
  function tr(y) {
    if (!rn.current) return;
    const w = $t(e);
    if (w.mechanics.includes("drag") && y === Q.current) {
      console.log("tap ignorado en especial (modo drag)");
      return;
    }
    const C = Ee.current[oe.current], O = p.current;
    if (Yr(C))
      return;
    const T = O && O.querySelector(`.tile[data-id="${y}"]`);
    if (!T) return;
    const M = parseFloat(T.dataset.pitch || "880"), I = vt.current.has(y), ee = (w.mechanics.includes("combo") || w.mechanics.includes("touch") && w.mechanics.includes("drag") && w.mechanics.includes("double")) && Au.has(y);
    if (console.log(`tap(${y}): doubleTouchTiles=`, Array.from(vt.current), `isDoubleTile=${I}`), console.log(`tap(${y}): isDoubleTile=${I}, config.mechanics=`, w.mechanics, "includes('double')=", w.mechanics.includes("double"), `isComboDouble=${ee}`), I && w.mechanics.includes("double") || ee)
      if (y === C)
        if (console.log(`Ficha ${y} es de doble toque y es su turno. partiallyTouched:`, Array.from(Ye.current), `¿Tiene ${y}?`, Ye.current.has(y)), Ye.current.has(y))
          console.log(`SEGUNDO TOQUE en ficha ${y} - completando doble toque`), T.style.opacity = "1", qr(y), N.ok(M), xt(20, o), oe.current++, Ye.current.delete(y), kn(new Set(Ye.current));
        else {
          console.log(`PRIMER TOQUE en ficha ${y} - marcando como parcialmente tocada`), T.style.opacity = "0.6", qr(y), N.ok(M), xt(20, o), Ye.current.add(y), console.log("Actualizando partiallyTouched:", Array.from(Ye.current)), kn(new Set(Ye.current)), Sf(y);
          return;
        }
      else {
        console.log(`Error: ficha de doble toque ${y} no es la esperada (${C})`), N.fail(), xt(80, o), oe.current = 0, br(), Ye.current.clear(), kn(/* @__PURE__ */ new Set());
        return;
      }
    else if (y === C) {
      qr(y), N.ok(M), xt(20, o), oe.current++;
      const ce = Math.floor((e - 1) / 10) + 1;
      if ((ce >= 2 || w.mechanics.includes("combo") || w.mechanics.includes("touch") && w.mechanics.includes("drag") && w.mechanics.includes("double")) && oe.current < Ee.current.length ? setTimeout(() => {
        var xe, G;
        if (Math.floor((e - 1) / 10) + 1 >= 2 && Q.current !== null) {
          const ge = (xe = p.current) == null ? void 0 : xe.querySelector(`.tile[data-id="${Q.current}"]`);
          if (ge) {
            (G = p.current) == null || G.getBoundingClientRect();
            const Ae = 60, at = {
              x: Ae,
              // Esquina izquierda con margen
              y: Ae,
              // Esquina superior con margen
              w: ge.offsetWidth,
              h: ge.offsetHeight,
              color: ge.style.backgroundColor,
              over: !1
            };
            Pe(at);
          }
        }
      }, 100) : (ce >= 2 || w.mechanics.includes("combo") || w.mechanics.includes("touch") && w.mechanics.includes("drag") && w.mechanics.includes("double")) && Pe(null), oe.current >= Ee.current.length) {
        if (!on.current) {
          on.current = !0;
          const fe = Math.ceil((Date.now() - Jr.current) / 1e3);
          Eo(fe);
          try {
            window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
              method: "POST",
              body: JSON.stringify({
                level: e,
                // nivel actual
                total_time_s: fe,
                success: 1
              })
            }).catch((xe) => {
              console.log("No hay sesión activa para guardar progreso");
            });
          } catch (xe) {
          }
        }
        Lt.current && clearInterval(Lt.current), v(!1), rn.current = !1, e === 50 ? _(!0) : f(!0);
        try {
          N.winMelody((Zr.current || []).slice(0, 6));
        } catch (fe) {
        }
      }
    } else
      console.log(`Error: ficha ${y} no es la esperada (${C})`), N.fail(), xt(80, o), oe.current = 0, Gr("wrong-tap"), br(), Ye.current.clear(), kn(/* @__PURE__ */ new Set());
  }
  function Cf() {
    f(!1), d(!1), _(!1);
    const y = e + 1;
    t(y), setTimeout(() => En(y), 0);
  }
  return R.useEffect(() => {
    window.LumetrixTest = { start: En, state: () => ({ level: e, world: K, levelInWorld: U, running: E, time: h, seqLen: (Ee.current || []).length }), tapExpected: () => {
      const y = Ee.current[oe.current];
      y != null && tr(y);
    } };
  }, [e, K, U, E, h]), R.useEffect(() => {
    const y = (C) => {
      var ge;
      if (Me == null || V.current !== null && C.pointerId !== V.current) return;
      const O = C.clientX - le.current.x, T = C.clientY - le.current.y, M = (ge = p.current) == null ? void 0 : ge.querySelector(`.tile[data-id="${Me}"]`);
      if (!M) return;
      const I = Math.abs(O - tt.current.x), ee = Math.abs(T - tt.current.y), ce = 5;
      (I > ce || ee > ce || M.style.position === "fixed") && (M.style.position = "fixed", M.style.left = `${O}px`, M.style.top = `${T}px`, tt.current = { x: O, y: T });
      const fe = O + ((M == null ? void 0 : M.offsetWidth) || 0) / 2, xe = T + ((M == null ? void 0 : M.offsetHeight) || 0) / 2, G = Uu(fe, xe, ue, p.current, 48);
      Pe((Ae) => Ae ? { ...Ae, over: G } : null);
    }, w = (C) => {
      var xe;
      if (Me == null || V.current !== null && C.pointerId !== V.current) return;
      const O = Ee.current[oe.current], T = (xe = p.current) == null ? void 0 : xe.querySelector(`.tile[data-id="${Me}"]`), M = tt.current.x, I = tt.current.y, ee = M + ((T == null ? void 0 : T.offsetWidth) || 0) / 2, ce = I + ((T == null ? void 0 : T.offsetHeight) || 0) / 2, fe = Uu(ee, ce, ue, p.current, 48);
      if (console.debug("Drag drop validation:", {
        expected: O,
        draggingId: Me,
        special: Q.current,
        inside: fe,
        step: oe.current,
        drop: ue
      }), Me === O && Me === Q.current && fe && T)
        return T.style.position = "absolute", T.style.left = `${ue.x + (ue.w - T.offsetWidth) / 2}px`, T.style.top = `${ue.y + (ue.h - T.offsetHeight) / 2}px`, z(null), V.current = null, Pe((G) => G ? { ...G, over: !1 } : null), T && (T.classList.remove("dragging"), T.style.pointerEvents = "", T.style.zIndex = ""), Bu(Me), Wu();
      if (Me === Q.current) {
        const G = Math.hypot(M - So.current.x, I - So.current.y);
        if (G < wo) {
          console.log(`Tap detectado (distancia: ${G.toFixed(1)}px < ${wo}px) - ignorando`), Gr("tap-detected"), z(null), V.current = null, Pe((ge) => ge ? { ...ge, over: !1 } : null), wf("tap");
          return;
        } else
          console.log(`Drag real fallido (distancia: ${G.toFixed(1)}px >= ${wo}px)`), Gr("drop-miss");
      }
      z(null), V.current = null, Pe((G) => G ? { ...G, over: !1 } : null), Hu();
    };
    return document.addEventListener("pointermove", y, !0), document.addEventListener("pointerup", w, !0), document.addEventListener("pointercancel", w, !0), () => {
      document.removeEventListener("pointermove", y, !0), document.removeEventListener("pointerup", w, !0), document.removeEventListener("pointercancel", w, !0);
    };
  }, [Me, ue, nn]), /* @__PURE__ */ m.jsxs("section", { className: "screen", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "topbar", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "brand", style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
        /* @__PURE__ */ m.jsx("img", { src: "sistema_apps_api/lumetrix/img/logo2.png", alt: "LUMETRIX", style: { height: "32px", width: "auto" }, onError: (y) => {
          y.target.style.display = "none", y.target.nextSibling.style.display = "inline";
        } }),
        /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "16px", fontWeight: "900", letterSpacing: "0.1em", color: "#fff" }, children: "LUMETRIX" }),
        /* @__PURE__ */ m.jsx(
          "select",
          {
            value: e,
            onChange: (y) => {
              const w = parseInt(y.target.value);
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
            children: Array.from({ length: 50 }, (y, w) => w + 1).map((y) => /* @__PURE__ */ m.jsxs("option", { value: y, children: [
              "Nivel ",
              y
            ] }, y))
          }
        ),
        /* @__PURE__ */ m.jsx(
          "button",
          {
            onClick: () => En(e),
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
          /* @__PURE__ */ m.jsx("img", { src: "sistema_apps_api/lumetrix/img/ico_ranking.png", alt: "Ranking", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (y) => {
            y.target.style.display = "none", y.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "🏆" })
        ] }),
        /* @__PURE__ */ m.jsxs("button", { className: "icon", onClick: s, "aria-label": "Opciones", children: [
          /* @__PURE__ */ m.jsx("img", { src: "sistema_apps_api/lumetrix/img/ico_config.png", alt: "Configuración", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (y) => {
            y.target.style.display = "none", y.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "⚙️" })
        ] }),
        /* @__PURE__ */ m.jsxs("button", { className: "icon", onClick: i, "aria-label": "Login", children: [
          /* @__PURE__ */ m.jsx("img", { src: "sistema_apps_api/lumetrix/img/ico_user.png", alt: "Usuario", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (y) => {
            y.target.style.display = "none", y.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ m.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "👤" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "hud", children: [
      /* @__PURE__ */ m.jsx("div", { className: "timebar", children: /* @__PURE__ */ m.jsx("i", { className: "timefill", style: { width: `${Math.max(0, Math.min(100, h / Zo(e) * 100))}%` } }) }),
      /* @__PURE__ */ m.jsxs("div", { className: "meta", children: [
        /* @__PURE__ */ m.jsxs("span", { className: "chip", children: [
          "Nivel ",
          /* @__PURE__ */ m.jsx("b", { children: e })
        ] }),
        /* @__PURE__ */ m.jsxs("span", { className: "chip", children: [
          "⏱ ",
          /* @__PURE__ */ m.jsxs("b", { children: [
            j,
            "s"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "board", ref: p, children: [
      ue && /* @__PURE__ */ m.jsx(
        "div",
        {
          className: `drop-zone ${ue.over ? "drag-over" : ""} ${ue.hint ? "pulse" : ""}`,
          style: {
            position: "absolute",
            left: ue.x,
            top: ue.y,
            width: ue.w,
            height: ue.h,
            border: `3px dashed ${ue.color}`,
            borderRadius: "12px",
            background: "rgba(0,0,0,0.3)",
            pointerEvents: "none",
            zIndex: 10,
            transition: "all 0.2s ease",
            boxShadow: ue.over ? `0 0 25px ${ue.color}` : `0 0 15px ${ue.color}33`
          }
        }
      ),
      !E && !A && !a && /* @__PURE__ */ m.jsxs("div", { className: "overlay", style: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }, children: [
        /* @__PURE__ */ m.jsx("button", { className: "btn-start", onClick: () => En(), children: "EMPEZAR" }),
        /* @__PURE__ */ m.jsxs("div", { style: { marginTop: "16px", color: "#ffffff88", fontSize: "16px", fontWeight: 600 }, children: [
          "Nivel ",
          e,
          " • Mundo ",
          K
        ] })
      ] }),
      A && /* @__PURE__ */ m.jsx("div", { className: "overlay", children: /* @__PURE__ */ m.jsxs("div", { className: "card-compact", style: { textAlign: "center" }, children: [
        /* @__PURE__ */ m.jsx("div", { style: { fontSize: 32, marginBottom: 8, textShadow: "0 0 10px var(--neon2), 0 0 20px var(--neon2)" }, children: "✨" }),
        /* @__PURE__ */ m.jsx("h3", { style: { color: "var(--neon2)", marginBottom: 12 }, children: "¡Nivel superado!" }),
        /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: Cf, children: "Siguiente" })
      ] }) }),
      a && /* @__PURE__ */ m.jsx("div", { className: "overlay", children: /* @__PURE__ */ m.jsxs("div", { className: "card-compact", style: { textAlign: "center" }, children: [
        /* @__PURE__ */ m.jsx("div", { style: { fontSize: 32, marginBottom: 8, textShadow: "0 0 10px var(--neon1), 0 0 20px var(--neon1)" }, children: "💔" }),
        /* @__PURE__ */ m.jsx("h3", { style: { color: "var(--neon1)", marginBottom: 12 }, children: "Tiempo agotado" }),
        /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: () => En(), children: "Reintentar" })
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
            _(!1), t(1);
          }, children: "Reiniciar" }),
          /* @__PURE__ */ m.jsx("button", { className: "btn btn1", onClick: () => {
            _(!1), u();
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
function l0({ onClose: e, total: t }) {
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
function o0({ onClose: e, onOpenAuth: t, level: n, setLevel: r, soundOn: l, musicOn: o, vibrateOn: i, setSoundOn: u, setMusicOn: s, setVibrateOn: c, onResetTotal: g, musicVolume: p, setMusicVolume: h }) {
  return /* @__PURE__ */ m.jsx("div", { className: "modal", children: /* @__PURE__ */ m.jsxs("div", { className: "card", style: { border: "2px solid #39ff14", boxShadow: "0 0 20px #39ff1444" }, children: [
    /* @__PURE__ */ m.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #39ff14", boxShadow: "0 0 10px #39ff14", background: "#000" }, children: "✕" }),
    /* @__PURE__ */ m.jsx("h3", { style: { color: "#39ff14", marginTop: 0, textShadow: "0 0 10px #39ff14, 0 0 20px #39ff14", fontSize: "20px" }, children: "⚙️ CONFIGURACIÓN" }),
    /* @__PURE__ */ m.jsxs("div", { className: "list", style: { gap: "12px" }, children: [
      /* @__PURE__ */ m.jsxs("label", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ m.jsx("span", { style: { color: "#39ff14", fontWeight: "bold" }, children: "🎵 Música de fondo" }),
        /* @__PURE__ */ m.jsx("input", { type: "checkbox", checked: o, onChange: (S) => s(S.target.checked), style: { transform: "scale(1.2)", accentColor: "#39ff14" } })
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
            onChange: (S) => h(parseFloat(S.target.value)),
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
        /* @__PURE__ */ m.jsx("input", { type: "checkbox", checked: i, onChange: (S) => c(S.target.checked), style: { transform: "scale(1.2)", accentColor: "#39ff14" } })
      ] }),
      /* @__PURE__ */ m.jsx("button", { className: "btn", onClick: t, style: { border: "2px solid #00ffff", color: "#00ffff", boxShadow: "0 0 10px #00ffff44", fontWeight: "bold" }, children: "👤 Identificarse" })
    ] })
  ] }) });
}
function i0({ onClose: e }) {
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
function u0() {
  t0();
  const [e, t] = R.useState("intro"), [n, r] = R.useState(!1), [l, o] = R.useState(!1), [i, u] = R.useState(!1), [s, c] = R.useState(!0), [g, p] = R.useState(!0), [h, S] = R.useState(0.15), [E, v] = R.useState(!0), [A, f] = R.useState(1), [a, d] = R.useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0;
    } catch (x) {
      return 0;
    }
  });
  return R.useEffect(() => {
    window.LumetrixTest = Object.assign({}, window.LumetrixTest, { help: "LumetrixTest.start(), .tapExpected(), .state() — tras pulsar Jugar" });
  }, []), /* @__PURE__ */ m.jsx("div", { className: "shell", children: /* @__PURE__ */ m.jsxs("div", { className: "device", children: [
    e === "intro" ? /* @__PURE__ */ m.jsx(n0, { onPlay: () => t("game"), onAuth: () => u(!0) }) : /* @__PURE__ */ m.jsx(
      r0,
      {
        level: A,
        setLevel: f,
        soundOn: s,
        musicOn: g,
        musicVolume: h,
        vibrateOn: E,
        onOpenAuth: () => u(!0),
        onOpenRanking: () => r(!0),
        onOpenOptions: () => o(!0),
        onTotalUpdate: d,
        totalTime: a
      }
    ),
    n && /* @__PURE__ */ m.jsx(l0, { onClose: () => r(!1), total: a }),
    l && /* @__PURE__ */ m.jsx(
      o0,
      {
        onClose: () => o(!1),
        onOpenAuth: () => {
          o(!1), u(!0);
        },
        level: A,
        setLevel: f,
        soundOn: s,
        musicOn: g,
        vibrateOn: E,
        setSoundOn: c,
        setMusicOn: p,
        setVibrateOn: v,
        musicVolume: h,
        setMusicVolume: S,
        onResetTotal: () => {
          try {
            localStorage.removeItem("lum_total");
          } catch (x) {
          }
          d(0);
        }
      }
    ),
    i && /* @__PURE__ */ m.jsx(i0, { onClose: () => u(!1) })
  ] }) });
}
function d0(e) {
  const t = xf(e);
  t.render(/* @__PURE__ */ m.jsx(u0, {})), e.__lum_unmount = () => {
    var n;
    return (n = t.unmount) == null ? void 0 : n.call(t);
  };
}
function p0(e) {
  var t;
  try {
    (t = e.__lum_unmount) == null || t.call(e);
  } catch (n) {
  }
}
export {
  d0 as mount,
  p0 as unmount
};
//# sourceMappingURL=game.bundle.js.map
