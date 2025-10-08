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
var Hr = Symbol.for("react.element"), jf = Symbol.for("react.portal"), Pf = Symbol.for("react.fragment"), Rf = Symbol.for("react.strict_mode"), Lf = Symbol.for("react.profiler"), Mf = Symbol.for("react.provider"), Of = Symbol.for("react.context"), If = Symbol.for("react.forward_ref"), Df = Symbol.for("react.suspense"), $f = Symbol.for("react.memo"), Ff = Symbol.for("react.lazy"), Ju = Symbol.iterator;
function Af(e) {
  return e === null || typeof e != "object" ? null : (e = Ju && e[Ju] || e["@@iterator"], typeof e == "function" ? e : null);
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
var Zu = Array.isArray, ma = Object.prototype.hasOwnProperty, Gi = { current: null }, ga = { key: !0, ref: !0, __self: !0, __source: !0 };
function ya(e, t, n) {
  var r, l = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) ma.call(t, r) && !ga.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var s = Array(u), c = 0; c < u; c++) s[c] = arguments[c + 2];
    l.children = s;
  }
  if (e && e.defaultProps) for (r in u = e.defaultProps, u) l[r] === void 0 && (l[r] = u[r]);
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
var qu = /\/+/g;
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
        case jf:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = r === "" ? "." + zo(i, 0) : r, Zu(l) ? (n = "", e != null && (n = e.replace(qu, "$&/") + "/"), Sl(l, t, n, "", function(c) {
    return c;
  })) : l != null && (Ji(l) && (l = Uf(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(qu, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", Zu(e)) for (var u = 0; u < e.length; u++) {
    o = e[u];
    var s = r + zo(o, u);
    i += Sl(o, t, n, s, l);
  }
  else if (s = Af(e), typeof s == "function") for (e = s.call(e), u = 0; !(o = e.next()).done; ) o = o.value, s = r + zo(o, u++), i += Sl(o, t, n, s, l);
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
B.Profiler = Lf;
B.PureComponent = Ki;
B.StrictMode = Rf;
B.Suspense = Df;
B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Hf;
B.act = va;
B.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = da({}, e.props), l = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = Gi.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var u = e.type.defaultProps;
    for (s in t) ma.call(t, s) && !ga.hasOwnProperty(s) && (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s]);
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
B.createContext = function(e) {
  return e = { $$typeof: Of, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Mf, _context: e }, e.Consumer = e;
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
  return { $$typeof: If, render: e };
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
var T = ca.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vf = T, Qf = Symbol.for("react.element"), Xf = Symbol.for("react.fragment"), Kf = Object.prototype.hasOwnProperty, Yf = Vf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Gf = { key: !0, ref: !0, __self: !0, __source: !0 };
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
var g = aa.exports, wa = { exports: {} }, He = {}, Sa = { exports: {} }, ka = {};
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
  function t(z, F) {
    var $ = z.length;
    z.push(F);
    e: for (; 0 < $; ) {
      var V = $ - 1 >>> 1, re = z[V];
      if (0 < l(re, F)) z[V] = F, z[$] = re, $ = V;
      else break e;
    }
  }
  function n(z) {
    return z.length === 0 ? null : z[0];
  }
  function r(z) {
    if (z.length === 0) return null;
    var F = z[0], $ = z.pop();
    if ($ !== F) {
      z[0] = $;
      e: for (var V = 0, re = z.length, nt = re >>> 1; V < nt; ) {
        var Q = 2 * (V + 1) - 1, Qe = z[Q], jt = Q + 1, mt = z[jt];
        if (0 > l(Qe, $)) jt < re && 0 > l(mt, Qe) ? (z[V] = mt, z[jt] = $, V = jt) : (z[V] = Qe, z[Q] = $, V = Q);
        else if (jt < re && 0 > l(mt, $)) z[V] = mt, z[jt] = $, V = jt;
        else break e;
      }
    }
    return F;
  }
  function l(z, F) {
    var $ = z.sortIndex - F.sortIndex;
    return $ !== 0 ? $ : z.id - F.id;
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
  var s = [], c = [], m = 1, p = null, h = 3, S = !1, E = !1, y = !1, D = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, a = typeof setImmediate != "undefined" ? setImmediate : null;
  typeof navigator != "undefined" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function d(z) {
    for (var F = n(c); F !== null; ) {
      if (F.callback === null) r(c);
      else if (F.startTime <= z) r(c), F.sortIndex = F.expirationTime, t(s, F);
      else break;
      F = n(c);
    }
  }
  function x(z) {
    if (y = !1, d(z), !E) if (n(s) !== null) E = !0, Le(C);
    else {
      var F = n(c);
      F !== null && Me(x, F.startTime - z);
    }
  }
  function C(z, F) {
    E = !1, y && (y = !1, f(N), N = -1), S = !0;
    var $ = h;
    try {
      for (d(F), p = n(s); p !== null && (!(p.expirationTime > F) || z && !ae()); ) {
        var V = p.callback;
        if (typeof V == "function") {
          p.callback = null, h = p.priorityLevel;
          var re = V(p.expirationTime <= F);
          F = e.unstable_now(), typeof re == "function" ? p.callback = re : p === n(s) && r(s), d(F);
        } else r(s);
        p = n(s);
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
  var P = !1, L = null, N = -1, Y = 5, A = -1;
  function ae() {
    return !(e.unstable_now() - A < Y);
  }
  function en() {
    if (L !== null) {
      var z = e.unstable_now();
      A = z;
      var F = !0;
      try {
        F = L(!0, z);
      } finally {
        F ? tn() : (P = !1, L = null);
      }
    } else P = !1;
  }
  var tn;
  if (typeof a == "function") tn = function() {
    a(en);
  };
  else if (typeof MessageChannel != "undefined") {
    var wo = new MessageChannel(), ue = wo.port2;
    wo.port1.onmessage = en, tn = function() {
      ue.postMessage(null);
    };
  } else tn = function() {
    D(en, 0);
  };
  function Le(z) {
    L = z, P || (P = !0, tn());
  }
  function Me(z, F) {
    N = D(function() {
      z(e.unstable_now());
    }, F);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(z) {
    z.callback = null;
  }, e.unstable_continueExecution = function() {
    E || S || (E = !0, Le(C));
  }, e.unstable_forceFrameRate = function(z) {
    0 > z || 125 < z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Y = 0 < z ? Math.floor(1e3 / z) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(s);
  }, e.unstable_next = function(z) {
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
      return z();
    } finally {
      h = $;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(z, F) {
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
    var $ = h;
    h = z;
    try {
      return F();
    } finally {
      h = $;
    }
  }, e.unstable_scheduleCallback = function(z, F, $) {
    var V = e.unstable_now();
    switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? V + $ : V) : $ = V, z) {
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
    return re = $ + re, z = { id: m++, callback: F, priorityLevel: z, startTime: $, expirationTime: re, sortIndex: -1 }, $ > V ? (z.sortIndex = $, t(c, z), n(s) === null && z === n(c) && (y ? (f(N), N = -1) : y = !0, Me(x, $ - V))) : (z.sortIndex = re, t(s, z), E || S || (E = !0, Le(C))), z;
  }, e.unstable_shouldYield = ae, e.unstable_wrapCallback = function(z) {
    var F = h;
    return function() {
      var $ = h;
      h = F;
      try {
        return z.apply(this, arguments);
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
var Zf = T, We = Jf;
function k(e) {
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
var Ct = !(typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined"), ti = Object.prototype.hasOwnProperty, qf = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, bu = {}, es = {};
function bf(e) {
  return ti.call(es, e) ? !0 : ti.call(bu, e) ? !1 : qf.test(e) ? es[e] = !0 : (bu[e] = !0, !1);
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
function Re(e, t, n, r, l, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
var ke = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ke[e] = new Re(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ke[t] = new Re(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ke[e] = new Re(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ke[e] = new Re(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ke[e] = new Re(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ke[e] = new Re(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ke[e] = new Re(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ke[e] = new Re(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ke[e] = new Re(e, 5, !1, e.toLowerCase(), null, !1, !1);
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
  ke[t] = new Re(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Zi, qi);
  ke[t] = new Re(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Zi, qi);
  ke[t] = new Re(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ke[e] = new Re(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ke.xlinkHref = new Re("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ke[e] = new Re(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function bi(e, t, n, r) {
  var l = ke.hasOwnProperty(t) ? ke[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (td(t, n, l, r) && (n = null), r || l === null ? bf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var zt = Zf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ol = Symbol.for("react.element"), jn = Symbol.for("react.portal"), Pn = Symbol.for("react.fragment"), eu = Symbol.for("react.strict_mode"), ni = Symbol.for("react.profiler"), Ca = Symbol.for("react.provider"), _a = Symbol.for("react.context"), tu = Symbol.for("react.forward_ref"), ri = Symbol.for("react.suspense"), li = Symbol.for("react.suspense_list"), nu = Symbol.for("react.memo"), It = Symbol.for("react.lazy"), Na = Symbol.for("react.offscreen"), ts = Symbol.iterator;
function or(e) {
  return e === null || typeof e != "object" ? null : (e = ts && e[ts] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ne = Object.assign, jo;
function pr(e) {
  if (jo === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    jo = t && t[1] || "";
  }
  return `
` + jo + e;
}
var Po = !1;
function Ro(e, t) {
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
      return e = Ro(e.type, !1), e;
    case 11:
      return e = Ro(e.type.render, !1), e;
    case 1:
      return e = Ro(e.type, !0), e;
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
    case jn:
      return "Portal";
    case ni:
      return "Profiler";
    case eu:
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
    case tu:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case nu:
      return t = e.displayName || null, t !== null ? t : oi(e.type) || "Memo";
    case It:
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
      return t === eu ? "StrictMode" : "Mode";
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
function ns(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = Gt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function ja(e, t) {
  t = t.checked, t != null && bi(e, "checked", t, !1);
}
function ui(e, t) {
  ja(e, t);
  var n = Gt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? si(e, t.type, n) : t.hasOwnProperty("defaultValue") && si(e, t.type, Gt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function rs(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function si(e, t, n) {
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
  if (t.dangerouslySetInnerHTML != null) throw Error(k(91));
  return ne({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function ls(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(k(92));
      if (hr(n)) {
        if (1 < n.length) throw Error(k(93));
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
function os(e) {
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
function ci(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ra(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var ul, La = function(e) {
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
function Ma(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || yr.hasOwnProperty(e) && yr[e] ? ("" + t).trim() : t + "px";
}
function Oa(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Ma(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var id = ne({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function fi(e, t) {
  if (t) {
    if (id[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(k(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(k(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(k(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(k(62));
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
function ru(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var hi = null, Wn = null, Hn = null;
function is(e) {
  if (e = Xr(e)) {
    if (typeof hi != "function") throw Error(k(280));
    var t = e.stateNode;
    t && (t = so(t), hi(e.stateNode, e.type, t));
  }
}
function Ia(e) {
  Wn ? Hn ? Hn.push(e) : Hn = [e] : Wn = e;
}
function Da() {
  if (Wn) {
    var e = Wn, t = Hn;
    if (Hn = Wn = null, is(e), t) for (e = 0; e < t.length; e++) is(t[e]);
  }
}
function $a(e, t) {
  return e(t);
}
function Fa() {
}
var Lo = !1;
function Aa(e, t, n) {
  if (Lo) return e(t, n);
  Lo = !0;
  try {
    return $a(e, t, n);
  } finally {
    Lo = !1, (Wn !== null || Hn !== null) && (Fa(), Da());
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
  if (n && typeof n != "function") throw Error(k(231, t, typeof n));
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
function ud(e, t, n, r, l, o, i, u, s) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (m) {
    this.onError(m);
  }
}
var vr = !1, Ol = null, Il = !1, gi = null, sd = { onError: function(e) {
  vr = !0, Ol = e;
} };
function ad(e, t, n, r, l, o, i, u, s) {
  vr = !1, Ol = null, ud.apply(sd, arguments);
}
function cd(e, t, n, r, l, o, i, u, s) {
  if (ad.apply(this, arguments), vr) {
    if (vr) {
      var c = Ol;
      vr = !1, Ol = null;
    } else throw Error(k(198));
    Il || (Il = !0, gi = c);
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
function us(e) {
  if (kn(e) !== e) throw Error(k(188));
}
function fd(e) {
  var t = e.alternate;
  if (!t) {
    if (t = kn(e), t === null) throw Error(k(188));
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
        if (o === n) return us(l), e;
        if (o === r) return us(l), t;
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
var Ha = We.unstable_scheduleCallback, ss = We.unstable_cancelCallback, dd = We.unstable_shouldYield, pd = We.unstable_requestPaint, se = We.unstable_now, hd = We.unstable_getCurrentPriorityLevel, lu = We.unstable_ImmediatePriority, Va = We.unstable_UserBlockingPriority, Dl = We.unstable_NormalPriority, md = We.unstable_LowPriority, Qa = We.unstable_IdlePriority, lo = null, pt = null;
function gd(e) {
  if (pt && typeof pt.onCommitFiberRoot == "function") try {
    pt.onCommitFiberRoot(lo, e, void 0, (e.current.flags & 128) === 128);
  } catch (t) {
  }
}
var ut = Math.clz32 ? Math.clz32 : xd, yd = Math.log, vd = Math.LN2;
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
function $l(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var u = i & ~l;
    u !== 0 ? r = mr(u) : (o &= i, o !== 0 && (r = mr(o)));
  } else i = n & ~l, i !== 0 ? r = mr(i) : o !== 0 && (r = mr(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - ut(t), l = 1 << n, r |= e[n], t &= ~l;
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
    var i = 31 - ut(o), u = 1 << i, s = l[i];
    s === -1 ? (!(u & n) || u & r) && (l[i] = wd(u, t)) : s <= t && (e.expiredLanes |= u), o &= ~u;
  }
}
function yi(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Xa() {
  var e = sl;
  return sl <<= 1, !(sl & 4194240) && (sl = 64), e;
}
function Mo(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Vr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - ut(t), e[t] = n;
}
function kd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - ut(n), o = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
  }
}
function ou(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - ut(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var K = 0;
function Ka(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Ya, iu, Ga, Ja, Za, vi = !1, cl = [], Bt = null, Wt = null, Ht = null, jr = /* @__PURE__ */ new Map(), Pr = /* @__PURE__ */ new Map(), $t = [], Ed = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function as(e, t) {
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
      Pr.delete(t.pointerId);
  }
}
function ur(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = Xr(t), t !== null && iu(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
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
      return o = l.pointerId, Pr.set(o, ur(Pr.get(o) || null, e, t, n, r, l)), !0;
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
    } else return t = Xr(n), t !== null && iu(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function cs(e, t, n) {
  El(e) && n.delete(t);
}
function _d() {
  vi = !1, Bt !== null && El(Bt) && (Bt = null), Wt !== null && El(Wt) && (Wt = null), Ht !== null && El(Ht) && (Ht = null), jr.forEach(cs), Pr.forEach(cs);
}
function sr(e, t) {
  e.blockedOn === t && (e.blockedOn = null, vi || (vi = !0, We.unstable_scheduleCallback(We.unstable_NormalPriority, _d)));
}
function Rr(e) {
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
  for (Bt !== null && sr(Bt, e), Wt !== null && sr(Wt, e), Ht !== null && sr(Ht, e), jr.forEach(t), Pr.forEach(t), n = 0; n < $t.length; n++) r = $t[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < $t.length && (n = $t[0], n.blockedOn === null); ) qa(n), n.blockedOn === null && $t.shift();
}
var Vn = zt.ReactCurrentBatchConfig, Fl = !0;
function Nd(e, t, n, r) {
  var l = K, o = Vn.transition;
  Vn.transition = null;
  try {
    K = 1, uu(e, t, n, r);
  } finally {
    K = l, Vn.transition = o;
  }
}
function Td(e, t, n, r) {
  var l = K, o = Vn.transition;
  Vn.transition = null;
  try {
    K = 4, uu(e, t, n, r);
  } finally {
    K = l, Vn.transition = o;
  }
}
function uu(e, t, n, r) {
  if (Fl) {
    var l = xi(e, t, n, r);
    if (l === null) Ho(e, t, r, Al, n), as(e, r);
    else if (Cd(l, e, t, n, r)) r.stopPropagation();
    else if (as(e, r), t & 4 && -1 < Ed.indexOf(e)) {
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
  if (Al = null, e = ru(r), e = fn(e), e !== null) if (t = kn(e), t === null) e = null;
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
        case lu:
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
var At = null, su = null, Cl = null;
function ec() {
  if (Cl) return Cl;
  var e, t = su, n = t.length, r, l = "value" in At ? At.value : At.textContent, o = l.length;
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
function fs() {
  return !1;
}
function Ve(e) {
  function t(n, r, l, o, i) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var u in e) e.hasOwnProperty(u) && (n = e[u], this[u] = n ? n(o) : o[u]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? fl : fs, this.isPropagationStopped = fs, this;
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
}, defaultPrevented: 0, isTrusted: 0 }, au = Ve(tr), Qr = ne({}, tr, { view: 0, detail: 0 }), zd = Ve(Qr), Oo, Io, ar, oo = ne({}, Qr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: cu, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== ar && (ar && e.type === "mousemove" ? (Oo = e.screenX - ar.screenX, Io = e.screenY - ar.screenY) : Io = Oo = 0, ar = e), Oo);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Io;
} }), ds = Ve(oo), jd = ne({}, oo, { dataTransfer: 0 }), Pd = Ve(jd), Rd = ne({}, Qr, { relatedTarget: 0 }), Do = Ve(Rd), Ld = ne({}, tr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Md = Ve(Ld), Od = ne({}, tr, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Id = Ve(Od), Dd = ne({}, tr, { data: 0 }), ps = Ve(Dd), $d = {
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
function cu() {
  return Ud;
}
var Bd = ne({}, Qr, { key: function(e) {
  if (e.key) {
    var t = $d[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = _l(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Fd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: cu, charCode: function(e) {
  return e.type === "keypress" ? _l(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? _l(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Wd = Ve(Bd), Hd = ne({}, oo, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), hs = Ve(Hd), Vd = ne({}, Qr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: cu }), Qd = Ve(Vd), Xd = ne({}, tr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Kd = Ve(Xd), Yd = ne({}, oo, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Gd = Ve(Yd), Jd = [9, 13, 27, 32], fu = Ct && "CompositionEvent" in window, xr = null;
Ct && "documentMode" in document && (xr = document.documentMode);
var Zd = Ct && "TextEvent" in window && !xr, tc = Ct && (!fu || xr && 8 < xr && 11 >= xr), ms = " ", gs = !1;
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
var Rn = !1;
function qd(e, t) {
  switch (e) {
    case "compositionend":
      return rc(t);
    case "keypress":
      return t.which !== 32 ? null : (gs = !0, ms);
    case "textInput":
      return e = t.data, e === ms && gs ? null : e;
    default:
      return null;
  }
}
function bd(e, t) {
  if (Rn) return e === "compositionend" || !fu && nc(e, t) ? (e = ec(), Cl = su = At = null, Rn = !1, e) : null;
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
function ys(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!ep[e.type] : t === "textarea";
}
function lc(e, t, n, r) {
  Ia(r), t = Ul(t, "onChange"), 0 < t.length && (n = new au("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var wr = null, Lr = null;
function tp(e) {
  mc(e, 0);
}
function io(e) {
  var t = On(e);
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
      var vs = document.createElement("div");
      vs.setAttribute("oninput", "return;"), Fo = typeof vs.oninput == "function";
    }
    $o = Fo;
  } else $o = !1;
  oc = $o && (!document.documentMode || 9 < document.documentMode);
}
function xs() {
  wr && (wr.detachEvent("onpropertychange", ic), Lr = wr = null);
}
function ic(e) {
  if (e.propertyName === "value" && io(Lr)) {
    var t = [];
    lc(t, Lr, e, ru(e)), Aa(tp, t);
  }
}
function rp(e, t, n) {
  e === "focusin" ? (xs(), wr = t, Lr = n, wr.attachEvent("onpropertychange", ic)) : e === "focusout" && xs();
}
function lp(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return io(Lr);
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
var at = typeof Object.is == "function" ? Object.is : up;
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
function ws(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ss(e, t) {
  var n = ws(e);
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
    n = ws(n);
  }
}
function uc(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? uc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function sc() {
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
function du(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function sp(e) {
  var t = sc(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && uc(n.ownerDocument.documentElement, n)) {
    if (r !== null && du(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, o = Math.min(r.start, l);
        r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = Ss(n, o);
        var i = Ss(
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
var ap = Ct && "documentMode" in document && 11 >= document.documentMode, Ln = null, wi = null, Sr = null, Si = !1;
function ks(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Si || Ln == null || Ln !== Ml(r) || (r = Ln, "selectionStart" in r && du(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Sr && Mr(Sr, r) || (Sr = r, r = Ul(wi, "onSelect"), 0 < r.length && (t = new au("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Ln)));
}
function dl(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Mn = { animationend: dl("Animation", "AnimationEnd"), animationiteration: dl("Animation", "AnimationIteration"), animationstart: dl("Animation", "AnimationStart"), transitionend: dl("Transition", "TransitionEnd") }, Ao = {}, ac = {};
Ct && (ac = document.createElement("div").style, "AnimationEvent" in window || (delete Mn.animationend.animation, delete Mn.animationiteration.animation, delete Mn.animationstart.animation), "TransitionEvent" in window || delete Mn.transitionend.transition);
function uo(e) {
  if (Ao[e]) return Ao[e];
  if (!Mn[e]) return e;
  var t = Mn[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in ac) return Ao[e] = t[n];
  return e;
}
var cc = uo("animationend"), fc = uo("animationiteration"), dc = uo("animationstart"), pc = uo("transitionend"), hc = /* @__PURE__ */ new Map(), Es = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Zt(e, t) {
  hc.set(e, t), Sn(t, [e]);
}
for (var Uo = 0; Uo < Es.length; Uo++) {
  var Bo = Es[Uo], cp = Bo.toLowerCase(), fp = Bo[0].toUpperCase() + Bo.slice(1);
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
function Cs(e, t, n) {
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
        var u = r[i], s = u.instance, c = u.currentTarget;
        if (u = u.listener, s !== o && l.isPropagationStopped()) break e;
        Cs(l, u, c), o = s;
      }
      else for (i = 0; i < r.length; i++) {
        if (u = r[i], s = u.instance, c = u.currentTarget, u = u.listener, s !== o && l.isPropagationStopped()) break e;
        Cs(l, u, c), o = s;
      }
    }
  }
  if (Il) throw e = gi, Il = !1, gi = null, e;
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
function Or(e) {
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
      l = uu;
  }
  n = l.bind(null, t, n, e), l = void 0, !mi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Ho(e, t, n, r, l) {
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
    var c = o, m = ru(n), p = [];
    e: {
      var h = hc.get(e);
      if (h !== void 0) {
        var S = au, E = e;
        switch (e) {
          case "keypress":
            if (_l(n) === 0) break e;
          case "keydown":
          case "keyup":
            S = Wd;
            break;
          case "focusin":
            E = "focus", S = Do;
            break;
          case "focusout":
            E = "blur", S = Do;
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
            S = ds;
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
            S = Id;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            S = hs;
        }
        var y = (t & 4) !== 0, D = !y && e === "scroll", f = y ? h !== null ? h + "Capture" : null : h;
        y = [];
        for (var a = c, d; a !== null; ) {
          d = a;
          var x = d.stateNode;
          if (d.tag === 5 && x !== null && (d = x, f !== null && (x = zr(a, f), x != null && y.push(Ir(a, x, d)))), D) break;
          a = a.return;
        }
        0 < y.length && (h = new S(h, E, null, n, m), p.push({ event: h, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", S = e === "mouseout" || e === "pointerout", h && n !== pi && (E = n.relatedTarget || n.fromElement) && (fn(E) || E[_t])) break e;
        if ((S || h) && (h = m.window === m ? m : (h = m.ownerDocument) ? h.defaultView || h.parentWindow : window, S ? (E = n.relatedTarget || n.toElement, S = c, E = E ? fn(E) : null, E !== null && (D = kn(E), E !== D || E.tag !== 5 && E.tag !== 6) && (E = null)) : (S = null, E = c), S !== E)) {
          if (y = ds, x = "onMouseLeave", f = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (y = hs, x = "onPointerLeave", f = "onPointerEnter", a = "pointer"), D = S == null ? h : On(S), d = E == null ? h : On(E), h = new y(x, a + "leave", S, n, m), h.target = D, h.relatedTarget = d, x = null, fn(m) === c && (y = new y(f, a + "enter", E, n, m), y.target = d, y.relatedTarget = D, x = y), D = x, S && E) t: {
            for (y = S, f = E, a = 0, d = y; d; d = zn(d)) a++;
            for (d = 0, x = f; x; x = zn(x)) d++;
            for (; 0 < a - d; ) y = zn(y), a--;
            for (; 0 < d - a; ) f = zn(f), d--;
            for (; a--; ) {
              if (y === f || f !== null && y === f.alternate) break t;
              y = zn(y), f = zn(f);
            }
            y = null;
          }
          else y = null;
          S !== null && _s(p, h, S, y, !1), E !== null && D !== null && _s(p, D, E, y, !0);
        }
      }
      e: {
        if (h = c ? On(c) : window, S = h.nodeName && h.nodeName.toLowerCase(), S === "select" || S === "input" && h.type === "file") var C = np;
        else if (ys(h)) if (oc) C = ip;
        else {
          C = lp;
          var P = rp;
        }
        else (S = h.nodeName) && S.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (C = op);
        if (C && (C = C(e, c))) {
          lc(p, C, n, m);
          break e;
        }
        P && P(e, h, c), e === "focusout" && (P = h._wrapperState) && P.controlled && h.type === "number" && si(h, "number", h.value);
      }
      switch (P = c ? On(c) : window, e) {
        case "focusin":
          (ys(P) || P.contentEditable === "true") && (Ln = P, wi = c, Sr = null);
          break;
        case "focusout":
          Sr = wi = Ln = null;
          break;
        case "mousedown":
          Si = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Si = !1, ks(p, n, m);
          break;
        case "selectionchange":
          if (ap) break;
        case "keydown":
        case "keyup":
          ks(p, n, m);
      }
      var L;
      if (fu) e: {
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
      else Rn ? nc(e, n) && (N = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (N = "onCompositionStart");
      N && (tc && n.locale !== "ko" && (Rn || N !== "onCompositionStart" ? N === "onCompositionEnd" && Rn && (L = ec()) : (At = m, su = "value" in At ? At.value : At.textContent, Rn = !0)), P = Ul(c, N), 0 < P.length && (N = new ps(N, e, null, n, m), p.push({ event: N, listeners: P }), L ? N.data = L : (L = rc(n), L !== null && (N.data = L)))), (L = Zd ? qd(e, n) : bd(e, n)) && (c = Ul(c, "onBeforeInput"), 0 < c.length && (m = new ps("onBeforeInput", "beforeinput", null, n, m), p.push({ event: m, listeners: c }), m.data = L));
    }
    mc(p, t);
  });
}
function Ir(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Ul(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, o = l.stateNode;
    l.tag === 5 && o !== null && (l = o, o = zr(e, n), o != null && r.unshift(Ir(e, o, l)), o = zr(e, t), o != null && r.push(Ir(e, o, l))), e = e.return;
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
function _s(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var u = n, s = u.alternate, c = u.stateNode;
    if (s !== null && s === r) break;
    u.tag === 5 && c !== null && (u = c, l ? (s = zr(n, o), s != null && i.unshift(Ir(n, s, u))) : l || (s = zr(n, o), s != null && i.push(Ir(n, s, u)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var pp = /\r\n?/g, hp = /\u0000|\uFFFD/g;
function Ns(e) {
  return (typeof e == "string" ? e : "" + e).replace(pp, `
`).replace(hp, "");
}
function hl(e, t, n) {
  if (t = Ns(t), Ns(e) !== t && n) throw Error(k(425));
}
function Bl() {
}
var ki = null, Ei = null;
function Ci(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var _i = typeof setTimeout == "function" ? setTimeout : void 0, mp = typeof clearTimeout == "function" ? clearTimeout : void 0, Ts = typeof Promise == "function" ? Promise : void 0, gp = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ts != "undefined" ? function(e) {
  return Ts.resolve(null).then(e).catch(yp);
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
        e.removeChild(l), Rr(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Rr(t);
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
function zs(e) {
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
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = zs(e); e !== null; ) {
        if (n = e[dt]) return n;
        e = zs(e);
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
function On(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(k(33));
}
function so(e) {
  return e[Dr] || null;
}
var Ti = [], In = -1;
function qt(e) {
  return { current: e };
}
function q(e) {
  0 > In || (e.current = Ti[In], Ti[In] = null, In--);
}
function G(e, t) {
  In++, Ti[In] = e.current, e.current = t;
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
function js(e, t, n) {
  if (Te.current !== Jt) throw Error(k(168));
  G(Te, t), G(De, n);
}
function yc(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(k(108, rd(e) || "Unknown", l));
  return ne({}, n, r);
}
function Hl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Jt, gn = Te.current, G(Te, e), G(De, De.current), !0;
}
function Ps(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(k(169));
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
      throw wt !== null && (wt = wt.slice(e + 1)), Ha(lu, bt), l;
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
  var l = 32 - ut(r) - 1;
  r &= ~(1 << l), n += 1;
  var o = 32 - ut(t) + l;
  if (30 < o) {
    var i = l - l % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, St = 1 << 32 - ut(t) + l | n << l | r, kt = o + e;
  } else St = 1 << o | n << l | r, kt = e;
}
function pu(e) {
  e.return !== null && (an(e, 1), xc(e, 1, 0));
}
function hu(e) {
  for (; e === Vl; ) Vl = Dn[--$n], Dn[$n] = null, Ql = Dn[--$n], Dn[$n] = null;
  for (; e === yn; ) yn = Je[--Ze], Je[Ze] = null, kt = Je[--Ze], Je[Ze] = null, St = Je[--Ze], Je[Ze] = null;
}
var Be = null, Ue = null, b = !1, it = null;
function wc(e, t) {
  var n = qe(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Rs(e, t) {
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
function ji(e) {
  if (b) {
    var t = Ue;
    if (t) {
      var n = t;
      if (!Rs(e, t)) {
        if (zi(e)) throw Error(k(418));
        t = Vt(n.nextSibling);
        var r = Be;
        t && Rs(e, t) ? wc(r, n) : (e.flags = e.flags & -4097 | 2, b = !1, Be = e);
      }
    } else {
      if (zi(e)) throw Error(k(418));
      e.flags = e.flags & -4097 | 2, b = !1, Be = e;
    }
  }
}
function Ls(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Be = e;
}
function ml(e) {
  if (e !== Be) return !1;
  if (!b) return Ls(e), b = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ci(e.type, e.memoizedProps)), t && (t = Ue)) {
    if (zi(e)) throw Sc(), Error(k(418));
    for (; t; ) wc(e, t), t = Vt(t.nextSibling);
  }
  if (Ls(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(k(317));
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
function mu(e) {
  it === null ? it = [e] : it.push(e);
}
var Sp = zt.ReactCurrentBatchConfig;
function cr(e, t, n) {
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
function gl(e, t) {
  throw e = Object.prototype.toString.call(t), Error(k(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Ms(e) {
  var t = e._init;
  return t(e._payload);
}
function kc(e) {
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
    return f = Yt(f, a), f.index = 0, f.sibling = null, f;
  }
  function o(f, a, d) {
    return f.index = d, e ? (d = f.alternate, d !== null ? (d = d.index, d < a ? (f.flags |= 2, a) : d) : (f.flags |= 2, a)) : (f.flags |= 1048576, a);
  }
  function i(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function u(f, a, d, x) {
    return a === null || a.tag !== 6 ? (a = qo(d, f.mode, x), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function s(f, a, d, x) {
    var C = d.type;
    return C === Pn ? m(f, a, d.props.children, x, d.key) : a !== null && (a.elementType === C || typeof C == "object" && C !== null && C.$$typeof === It && Ms(C) === a.type) ? (x = l(a, d.props), x.ref = cr(f, a, d), x.return = f, x) : (x = Ll(d.type, d.key, d.props, null, f.mode, x), x.ref = cr(f, a, d), x.return = f, x);
  }
  function c(f, a, d, x) {
    return a === null || a.tag !== 4 || a.stateNode.containerInfo !== d.containerInfo || a.stateNode.implementation !== d.implementation ? (a = bo(d, f.mode, x), a.return = f, a) : (a = l(a, d.children || []), a.return = f, a);
  }
  function m(f, a, d, x, C) {
    return a === null || a.tag !== 7 ? (a = mn(d, f.mode, x, C), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function p(f, a, d) {
    if (typeof a == "string" && a !== "" || typeof a == "number") return a = qo("" + a, f.mode, d), a.return = f, a;
    if (typeof a == "object" && a !== null) {
      switch (a.$$typeof) {
        case ol:
          return d = Ll(a.type, a.key, a.props, null, f.mode, d), d.ref = cr(f, null, a), d.return = f, d;
        case jn:
          return a = bo(a, f.mode, d), a.return = f, a;
        case It:
          var x = a._init;
          return p(f, x(a._payload), d);
      }
      if (hr(a) || or(a)) return a = mn(a, f.mode, d, null), a.return = f, a;
      gl(f, a);
    }
    return null;
  }
  function h(f, a, d, x) {
    var C = a !== null ? a.key : null;
    if (typeof d == "string" && d !== "" || typeof d == "number") return C !== null ? null : u(f, a, "" + d, x);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case ol:
          return d.key === C ? s(f, a, d, x) : null;
        case jn:
          return d.key === C ? c(f, a, d, x) : null;
        case It:
          return C = d._init, h(
            f,
            a,
            C(d._payload),
            x
          );
      }
      if (hr(d) || or(d)) return C !== null ? null : m(f, a, d, x, null);
      gl(f, d);
    }
    return null;
  }
  function S(f, a, d, x, C) {
    if (typeof x == "string" && x !== "" || typeof x == "number") return f = f.get(d) || null, u(a, f, "" + x, C);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case ol:
          return f = f.get(x.key === null ? d : x.key) || null, s(a, f, x, C);
        case jn:
          return f = f.get(x.key === null ? d : x.key) || null, c(a, f, x, C);
        case It:
          var P = x._init;
          return S(f, a, d, P(x._payload), C);
      }
      if (hr(x) || or(x)) return f = f.get(d) || null, m(a, f, x, C, null);
      gl(a, x);
    }
    return null;
  }
  function E(f, a, d, x) {
    for (var C = null, P = null, L = a, N = a = 0, Y = null; L !== null && N < d.length; N++) {
      L.index > N ? (Y = L, L = null) : Y = L.sibling;
      var A = h(f, L, d[N], x);
      if (A === null) {
        L === null && (L = Y);
        break;
      }
      e && L && A.alternate === null && t(f, L), a = o(A, a, N), P === null ? C = A : P.sibling = A, P = A, L = Y;
    }
    if (N === d.length) return n(f, L), b && an(f, N), C;
    if (L === null) {
      for (; N < d.length; N++) L = p(f, d[N], x), L !== null && (a = o(L, a, N), P === null ? C = L : P.sibling = L, P = L);
      return b && an(f, N), C;
    }
    for (L = r(f, L); N < d.length; N++) Y = S(L, f, N, d[N], x), Y !== null && (e && Y.alternate !== null && L.delete(Y.key === null ? N : Y.key), a = o(Y, a, N), P === null ? C = Y : P.sibling = Y, P = Y);
    return e && L.forEach(function(ae) {
      return t(f, ae);
    }), b && an(f, N), C;
  }
  function y(f, a, d, x) {
    var C = or(d);
    if (typeof C != "function") throw Error(k(150));
    if (d = C.call(d), d == null) throw Error(k(151));
    for (var P = C = null, L = a, N = a = 0, Y = null, A = d.next(); L !== null && !A.done; N++, A = d.next()) {
      L.index > N ? (Y = L, L = null) : Y = L.sibling;
      var ae = h(f, L, A.value, x);
      if (ae === null) {
        L === null && (L = Y);
        break;
      }
      e && L && ae.alternate === null && t(f, L), a = o(ae, a, N), P === null ? C = ae : P.sibling = ae, P = ae, L = Y;
    }
    if (A.done) return n(
      f,
      L
    ), b && an(f, N), C;
    if (L === null) {
      for (; !A.done; N++, A = d.next()) A = p(f, A.value, x), A !== null && (a = o(A, a, N), P === null ? C = A : P.sibling = A, P = A);
      return b && an(f, N), C;
    }
    for (L = r(f, L); !A.done; N++, A = d.next()) A = S(L, f, N, A.value, x), A !== null && (e && A.alternate !== null && L.delete(A.key === null ? N : A.key), a = o(A, a, N), P === null ? C = A : P.sibling = A, P = A);
    return e && L.forEach(function(en) {
      return t(f, en);
    }), b && an(f, N), C;
  }
  function D(f, a, d, x) {
    if (typeof d == "object" && d !== null && d.type === Pn && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case ol:
          e: {
            for (var C = d.key, P = a; P !== null; ) {
              if (P.key === C) {
                if (C = d.type, C === Pn) {
                  if (P.tag === 7) {
                    n(f, P.sibling), a = l(P, d.props.children), a.return = f, f = a;
                    break e;
                  }
                } else if (P.elementType === C || typeof C == "object" && C !== null && C.$$typeof === It && Ms(C) === P.type) {
                  n(f, P.sibling), a = l(P, d.props), a.ref = cr(f, P, d), a.return = f, f = a;
                  break e;
                }
                n(f, P);
                break;
              } else t(f, P);
              P = P.sibling;
            }
            d.type === Pn ? (a = mn(d.props.children, f.mode, x, d.key), a.return = f, f = a) : (x = Ll(d.type, d.key, d.props, null, f.mode, x), x.ref = cr(f, a, d), x.return = f, f = x);
          }
          return i(f);
        case jn:
          e: {
            for (P = d.key; a !== null; ) {
              if (a.key === P) if (a.tag === 4 && a.stateNode.containerInfo === d.containerInfo && a.stateNode.implementation === d.implementation) {
                n(f, a.sibling), a = l(a, d.children || []), a.return = f, f = a;
                break e;
              } else {
                n(f, a);
                break;
              }
              else t(f, a);
              a = a.sibling;
            }
            a = bo(d, f.mode, x), a.return = f, f = a;
          }
          return i(f);
        case It:
          return P = d._init, D(f, a, P(d._payload), x);
      }
      if (hr(d)) return E(f, a, d, x);
      if (or(d)) return y(f, a, d, x);
      gl(f, d);
    }
    return typeof d == "string" && d !== "" || typeof d == "number" ? (d = "" + d, a !== null && a.tag === 6 ? (n(f, a.sibling), a = l(a, d), a.return = f, f = a) : (n(f, a), a = qo(d, f.mode, x), a.return = f, f = a), i(f)) : n(f, a);
  }
  return D;
}
var Jn = kc(!0), Ec = kc(!1), Xl = qt(null), Kl = null, Fn = null, gu = null;
function yu() {
  gu = Fn = Kl = null;
}
function vu(e) {
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
  Kl = e, gu = Fn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Ie = !0), e.firstContext = null);
}
function et(e) {
  var t = e._currentValue;
  if (gu !== e) if (e = { context: e, memoizedValue: t, next: null }, Fn === null) {
    if (Kl === null) throw Error(k(308));
    Fn = e, Kl.dependencies = { lanes: 0, firstContext: e };
  } else Fn = Fn.next = e;
  return t;
}
var dn = null;
function xu(e) {
  dn === null ? dn = [e] : dn.push(e);
}
function Cc(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, xu(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Nt(e, r);
}
function Nt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Dt = !1;
function wu(e) {
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
  return l = r.interleaved, l === null ? (t.next = t, xu(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Nt(e, n);
}
function Nl(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ou(e, n);
  }
}
function Os(e, t) {
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
  var o = l.firstBaseUpdate, i = l.lastBaseUpdate, u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var s = u, c = s.next;
    s.next = null, i === null ? o = c : i.next = c, i = s;
    var m = e.alternate;
    m !== null && (m = m.updateQueue, u = m.lastBaseUpdate, u !== i && (u === null ? m.firstBaseUpdate = c : u.next = c, m.lastBaseUpdate = s));
  }
  if (o !== null) {
    var p = l.baseState;
    i = 0, m = c = s = null, u = o;
    do {
      var h = u.lane, S = u.eventTime;
      if ((r & h) === h) {
        m !== null && (m = m.next = {
          eventTime: S,
          lane: 0,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null
        });
        e: {
          var E = e, y = u;
          switch (h = t, S = n, y.tag) {
            case 1:
              if (E = y.payload, typeof E == "function") {
                p = E.call(S, p, h);
                break e;
              }
              p = E;
              break e;
            case 3:
              E.flags = E.flags & -65537 | 128;
            case 0:
              if (E = y.payload, h = typeof E == "function" ? E.call(S, p, h) : E, h == null) break e;
              p = ne({}, p, h);
              break e;
            case 2:
              Dt = !0;
          }
        }
        u.callback !== null && u.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [u] : h.push(u));
      } else S = { eventTime: S, lane: h, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, m === null ? (c = m = S, s = p) : m = m.next = S, i |= h;
      if (u = u.next, u === null) {
        if (u = l.shared.pending, u === null) break;
        h = u, u = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (m === null && (s = p), l.baseState = s, l.firstBaseUpdate = c, l.lastBaseUpdate = m, t = l.shared.interleaved, t !== null) {
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
      if (r.callback = null, r = n, typeof l != "function") throw Error(k(191, l));
      l.call(r);
    }
  }
}
var Kr = {}, ht = qt(Kr), $r = qt(Kr), Fr = qt(Kr);
function pn(e) {
  if (e === Kr) throw Error(k(174));
  return e;
}
function Su(e, t) {
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
function ku(e) {
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
function Eu() {
  for (var e = 0; e < Xo.length; e++) Xo[e]._workInProgressVersionPrimary = null;
  Xo.length = 0;
}
var Tl = zt.ReactCurrentDispatcher, Ko = zt.ReactCurrentBatchConfig, vn = 0, te = null, he = null, ve = null, Jl = !1, kr = !1, Ar = 0, kp = 0;
function Ce() {
  throw Error(k(321));
}
function Cu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!at(e[n], t[n])) return !1;
  return !0;
}
function _u(e, t, n, r, l, o) {
  if (vn = o, te = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Tl.current = e === null || e.memoizedState === null ? Np : Tp, e = n(r, l), kr) {
    o = 0;
    do {
      if (kr = !1, Ar = 0, 25 <= o) throw Error(k(301));
      o += 1, ve = he = null, t.updateQueue = null, Tl.current = zp, e = n(r, l);
    } while (kr);
  }
  if (Tl.current = Zl, t = he !== null && he.next !== null, vn = 0, ve = he = te = null, Jl = !1, t) throw Error(k(300));
  return e;
}
function Nu() {
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
    if (e === null) throw Error(k(310));
    he = e, e = { memoizedState: he.memoizedState, baseState: he.baseState, baseQueue: he.baseQueue, queue: he.queue, next: null }, ve === null ? te.memoizedState = ve = e : ve = ve.next = e;
  }
  return ve;
}
function Ur(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Yo(e) {
  var t = tt(), n = t.queue;
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
      var m = c.lane;
      if ((vn & m) === m) s !== null && (s = s.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var p = {
          lane: m,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        s === null ? (u = s = p, i = r) : s = s.next = p, te.lanes |= m, xn |= m;
      }
      c = c.next;
    } while (c !== null && c !== o);
    s === null ? i = r : s.next = u, at(r, t.memoizedState) || (Ie = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = s, n.lastRenderedState = r;
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
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = l = l.next;
    do
      o = e(o, i.action), i = i.next;
    while (i !== l);
    at(o, t.memoizedState) || (Ie = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function Tc() {
}
function zc(e, t) {
  var n = te, r = tt(), l = t(), o = !at(r.memoizedState, l);
  if (o && (r.memoizedState = l, Ie = !0), r = r.queue, Tu(Rc.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || ve !== null && ve.memoizedState.tag & 1) {
    if (n.flags |= 2048, Br(9, Pc.bind(null, n, r, l, t), void 0, null), xe === null) throw Error(k(349));
    vn & 30 || jc(n, t, l);
  }
  return l;
}
function jc(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = te.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, te.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Pc(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Lc(t) && Mc(e);
}
function Rc(e, t, n) {
  return n(function() {
    Lc(t) && Mc(e);
  });
}
function Lc(e) {
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
  t !== null && st(t, e, 1, -1);
}
function Ds(e) {
  var t = ft();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ur, lastRenderedState: e }, t.queue = e, e = e.dispatch = _p.bind(null, te, e), [t.memoizedState, e];
}
function Br(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = te.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, te.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Oc() {
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
    if (o = i.destroy, r !== null && Cu(r, i.deps)) {
      l.memoizedState = Br(t, n, o, r);
      return;
    }
  }
  te.flags |= e, l.memoizedState = Br(1 | t, n, o, r);
}
function $s(e, t) {
  return zl(8390656, 8, e, t);
}
function Tu(e, t) {
  return co(2048, 8, e, t);
}
function Ic(e, t) {
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
function zu() {
}
function Ac(e, t) {
  var n = tt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Cu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Uc(e, t) {
  var n = tt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Cu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Bc(e, t, n) {
  return vn & 21 ? (at(n, t) || (n = Xa(), te.lanes |= n, xn |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Ie = !0), e.memoizedState = n);
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
    var l = je();
    st(n, e, r, l), Qc(n, t, r);
  }
}
function _p(e, t, n) {
  var r = Kt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Hc(e)) Vc(t, l);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, u = o(i, n);
      if (l.hasEagerState = !0, l.eagerState = u, at(u, i)) {
        var s = t.interleaved;
        s === null ? (l.next = l, xu(t)) : (l.next = s.next, s.next = l), t.interleaved = l;
        return;
      }
    } catch (c) {
    } finally {
    }
    n = Cc(e, t, l, r), n !== null && (l = je(), st(n, e, r, l), Qc(n, t, r));
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
    r &= e.pendingLanes, n |= r, t.lanes = n, ou(e, n);
  }
}
var Zl = { readContext: et, useCallback: Ce, useContext: Ce, useEffect: Ce, useImperativeHandle: Ce, useInsertionEffect: Ce, useLayoutEffect: Ce, useMemo: Ce, useReducer: Ce, useRef: Ce, useState: Ce, useDebugValue: Ce, useDeferredValue: Ce, useTransition: Ce, useMutableSource: Ce, useSyncExternalStore: Ce, useId: Ce, unstable_isNewReconciler: !1 }, Np = { readContext: et, useCallback: function(e, t) {
  return ft().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: et, useEffect: $s, useImperativeHandle: function(e, t, n) {
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
}, useState: Ds, useDebugValue: zu, useDeferredValue: function(e) {
  return ft().memoizedState = e;
}, useTransition: function() {
  var e = Ds(!1), t = e[0];
  return e = Ep.bind(null, e[1]), ft().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = te, l = ft();
  if (b) {
    if (n === void 0) throw Error(k(407));
    n = n();
  } else {
    if (n = t(), xe === null) throw Error(k(349));
    vn & 30 || jc(r, t, n);
  }
  l.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return l.queue = o, $s(Rc.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, Br(9, Pc.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = ft(), t = xe.identifierPrefix;
  if (b) {
    var n = kt, r = St;
    n = (r & ~(1 << 32 - ut(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Ar++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = kp++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Tp = {
  readContext: et,
  useCallback: Ac,
  useContext: et,
  useEffect: Tu,
  useImperativeHandle: Fc,
  useInsertionEffect: Ic,
  useLayoutEffect: Dc,
  useMemo: Uc,
  useReducer: Yo,
  useRef: Oc,
  useState: function() {
    return Yo(Ur);
  },
  useDebugValue: zu,
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
}, zp = { readContext: et, useCallback: Ac, useContext: et, useEffect: Tu, useImperativeHandle: Fc, useInsertionEffect: Ic, useLayoutEffect: Dc, useMemo: Uc, useReducer: Go, useRef: Oc, useState: function() {
  return Go(Ur);
}, useDebugValue: zu, useDeferredValue: function(e) {
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
function Ri(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : ne({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var fo = { isMounted: function(e) {
  return (e = e._reactInternals) ? kn(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = je(), l = Kt(e), o = Et(r, l);
  o.payload = t, n != null && (o.callback = n), t = Qt(e, o, l), t !== null && (st(t, e, l, r), Nl(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = je(), l = Kt(e), o = Et(r, l);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Qt(e, o, l), t !== null && (st(t, e, l, r), Nl(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = je(), r = Kt(e), l = Et(n, r);
  l.tag = 2, t != null && (l.callback = t), t = Qt(e, l, r), t !== null && (st(t, e, r, n), Nl(t, e, r));
} };
function Fs(e, t, n, r, l, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !Mr(n, r) || !Mr(l, o) : !0;
}
function Xc(e, t, n) {
  var r = !1, l = Jt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = et(o) : (l = $e(t) ? gn : Te.current, r = t.contextTypes, o = (r = r != null) ? Yn(e, l) : Jt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = fo, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function As(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && fo.enqueueReplaceState(t, t.state, null);
}
function Li(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, wu(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? l.context = et(o) : (o = $e(t) ? gn : Te.current, l.context = Yn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Ri(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && fo.enqueueReplaceState(l, l.state, null), Yl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
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
var jp = typeof WeakMap == "function" ? WeakMap : Map;
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
function Us(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new jp();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Hp.bind(null, e, t, n), t.then(e, e));
}
function Bs(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ws(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Et(-1, 1), t.tag = 2, Qt(n, t, 1))), n.lanes |= 1), e);
}
var Pp = zt.ReactCurrentOwner, Ie = !1;
function ze(e, t, n, r) {
  t.child = e === null ? Ec(t, null, n, r) : Jn(t, e.child, n, r);
}
function Hs(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return Qn(t, l), r = _u(e, t, n, r, o, l), n = Nu(), e !== null && !Ie ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Tt(e, t, l)) : (b && n && pu(t), t.flags |= 1, ze(e, t, r, l), t.child);
}
function Vs(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Du(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Gc(e, t, o, r, l)) : (e = Ll(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
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
    if (Mr(o, r) && e.ref === t.ref) if (Ie = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) e.flags & 131072 && (Ie = !0);
    else return t.lanes = e.lanes, Tt(e, t, l);
  }
  return Oi(e, t, n, r, l);
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
function Oi(e, t, n, r, l) {
  var o = $e(n) ? gn : Te.current;
  return o = Yn(t, o), Qn(t, l), n = _u(e, t, n, r, o, l), r = Nu(), e !== null && !Ie ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Tt(e, t, l)) : (b && r && pu(t), t.flags |= 1, ze(e, t, n, l), t.child);
}
function Qs(e, t, n, r, l) {
  if ($e(n)) {
    var o = !0;
    Hl(t);
  } else o = !1;
  if (Qn(t, l), t.stateNode === null) jl(e, t), Xc(t, n, r), Li(t, n, r, l), r = !0;
  else if (e === null) {
    var i = t.stateNode, u = t.memoizedProps;
    i.props = u;
    var s = i.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = et(c) : (c = $e(n) ? gn : Te.current, c = Yn(t, c));
    var m = n.getDerivedStateFromProps, p = typeof m == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    p || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== r || s !== c) && As(t, i, r, c), Dt = !1;
    var h = t.memoizedState;
    i.state = h, Yl(t, r, i, l), s = t.memoizedState, u !== r || h !== s || De.current || Dt ? (typeof m == "function" && (Ri(t, n, m, r), s = t.memoizedState), (u = Dt || Fs(t, n, u, r, h, s, c)) ? (p || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), i.props = r, i.state = s, i.context = c, r = u) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, _c(e, t), u = t.memoizedProps, c = t.type === t.elementType ? u : lt(t.type, u), i.props = c, p = t.pendingProps, h = i.context, s = n.contextType, typeof s == "object" && s !== null ? s = et(s) : (s = $e(n) ? gn : Te.current, s = Yn(t, s));
    var S = n.getDerivedStateFromProps;
    (m = typeof S == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== p || h !== s) && As(t, i, r, s), Dt = !1, h = t.memoizedState, i.state = h, Yl(t, r, i, l);
    var E = t.memoizedState;
    u !== p || h !== E || De.current || Dt ? (typeof S == "function" && (Ri(t, n, S, r), E = t.memoizedState), (c = Dt || Fs(t, n, c, r, h, E, s) || !1) ? (m || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, E, s), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, E, s)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = E), i.props = r, i.state = E, i.context = s, r = c) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Ii(e, t, n, r, o, l);
}
function Ii(e, t, n, r, l, o) {
  Zc(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && Ps(t, n, !1), Tt(e, t, o);
  r = t.stateNode, Pp.current = t;
  var u = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = Jn(t, e.child, null, o), t.child = Jn(t, null, u, o)) : ze(e, t, u, o), t.memoizedState = r.state, l && Ps(t, n, !0), t.child;
}
function qc(e) {
  var t = e.stateNode;
  t.pendingContext ? js(e, t.pendingContext, t.pendingContext !== t.context) : t.context && js(e, t.context, !1), Su(e, t.containerInfo);
}
function Xs(e, t, n, r, l) {
  return Gn(), mu(l), t.flags |= 256, ze(e, t, n, r), t.child;
}
var Di = { dehydrated: null, treeContext: null, retryLane: 0 };
function $i(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function bc(e, t, n) {
  var r = t.pendingProps, l = ee.current, o = !1, i = (t.flags & 128) !== 0, u;
  if ((u = i) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), u ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), G(ee, l & 1), e === null)
    return ji(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = mo(i, r, 0, null), e = mn(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = $i(n), t.memoizedState = Di, e) : ju(t, i));
  if (l = e.memoizedState, l !== null && (u = l.dehydrated, u !== null)) return Rp(e, t, i, r, u, l, n);
  if (o) {
    o = r.fallback, i = t.mode, l = e.child, u = l.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = Yt(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), u !== null ? o = Yt(u, o) : (o = mn(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? $i(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = Di, r;
  }
  return o = e.child, e = o.sibling, r = Yt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function ju(e, t) {
  return t = mo({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function yl(e, t, n, r) {
  return r !== null && mu(r), Jn(t, e.child, null, n), e = ju(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Rp(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Jo(Error(k(422))), yl(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = mo({ mode: "visible", children: r.children }, l, 0, null), o = mn(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Jn(t, e.child, null, i), t.child.memoizedState = $i(i), t.memoizedState = Di, o);
  if (!(t.mode & 1)) return yl(e, t, i, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var u = r.dgst;
    return r = u, o = Error(k(419)), r = Jo(o, r, void 0), yl(e, t, i, r);
  }
  if (u = (i & e.childLanes) !== 0, Ie || u) {
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
      l = l & (r.suspendedLanes | i) ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Nt(e, l), st(r, e, l, -1));
    }
    return Iu(), r = Jo(Error(k(421))), yl(e, t, i, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Vp.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Ue = Vt(l.nextSibling), Be = t, b = !0, it = null, e !== null && (Je[Ze++] = St, Je[Ze++] = kt, Je[Ze++] = yn, St = e.id, kt = e.overflow, yn = t), t = ju(t, r.children), t.flags |= 4096, t);
}
function Ks(e, t, n) {
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
      if (e.tag === 13) e.memoizedState !== null && Ks(e, n, t);
      else if (e.tag === 19) Ks(e, n, t);
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
function jl(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Tt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), xn |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(k(153));
  if (t.child !== null) {
    for (e = t.child, n = Yt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Yt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Lp(e, t, n) {
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
      Su(t, t.stateNode.containerInfo);
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
  switch (hu(t), t.tag) {
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
      return r = t.stateNode, Zn(), q(De), q(Te), Eu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (ml(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, it !== null && (Xi(it), it = null))), Fi(e, t), _e(t), null;
    case 5:
      ku(t);
      var l = pn(Fr.current);
      if (n = t.type, e !== null && t.stateNode != null) nf(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(k(166));
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
              ns(r, o), Z("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Z("invalid", r);
              break;
            case "textarea":
              ls(r, o), Z("invalid", r);
          }
          fi(n, o), l = null;
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
              il(r), rs(r, o, !0);
              break;
            case "textarea":
              il(r), os(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Bl);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ra(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[dt] = t, e[Dr] = r, tf(e, t, !1, !1), t.stateNode = e;
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
                ns(e, r), l = ii(e, r), Z("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = ne({}, r, { value: void 0 }), Z("invalid", e);
                break;
              case "textarea":
                ls(e, r), l = ai(e, r), Z("invalid", e);
                break;
              default:
                l = r;
            }
            fi(n, l), u = l;
            for (o in u) if (u.hasOwnProperty(o)) {
              var s = u[o];
              o === "style" ? Oa(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && La(e, s)) : o === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && Tr(e, s) : typeof s == "number" && Tr(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Nr.hasOwnProperty(o) ? s != null && o === "onScroll" && Z("scroll", e) : s != null && bi(e, o, s, i));
            }
            switch (n) {
              case "input":
                il(e), rs(e, r, !1);
                break;
              case "textarea":
                il(e), os(e);
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
        if (typeof r != "string" && t.stateNode === null) throw Error(k(166));
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
            if (!o) throw Error(k(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(k(317));
            o[dt] = t;
          } else Gn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          _e(t), o = !1;
        } else it !== null && (Xi(it), it = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || ee.current & 1 ? me === 0 && (me = 3) : Iu())), t.updateQueue !== null && (t.flags |= 4), _e(t), null);
    case 4:
      return Zn(), Fi(e, t), e === null && Or(t.stateNode.containerInfo), _e(t), null;
    case 10:
      return vu(t.type._context), _e(t), null;
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
        o.tail !== null && se() > bn && (t.flags |= 128, r = !0, fr(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = Gl(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), fr(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !b) return _e(t), null;
        } else 2 * se() - o.renderingStartTime > bn && n !== 1073741824 && (t.flags |= 128, r = !0, fr(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = se(), t.sibling = null, n = ee.current, G(ee, r ? n & 1 | 2 : n & 1), t) : (_e(t), null);
    case 22:
    case 23:
      return Ou(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Ae & 1073741824 && (_e(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : _e(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(k(156, t.tag));
}
function Op(e, t) {
  switch (hu(t), t.tag) {
    case 1:
      return $e(t.type) && Wl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Zn(), q(De), q(Te), Eu(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return ku(t), null;
    case 13:
      if (q(ee), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(k(340));
        Gn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return q(ee), null;
    case 4:
      return Zn(), null;
    case 10:
      return vu(t.type._context), null;
    case 22:
    case 23:
      return Ou(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var vl = !1, Ne = !1, Ip = typeof WeakSet == "function" ? WeakSet : Set, R = null;
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
var Ys = !1;
function Dp(e, t) {
  if (ki = Fl, e = sc(), du(e)) {
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
        var i = 0, u = -1, s = -1, c = 0, m = 0, p = e, h = null;
        t: for (; ; ) {
          for (var S; p !== n || l !== 0 && p.nodeType !== 3 || (u = i + l), p !== o || r !== 0 && p.nodeType !== 3 || (s = i + r), p.nodeType === 3 && (i += p.nodeValue.length), (S = p.firstChild) !== null; )
            h = p, p = S;
          for (; ; ) {
            if (p === e) break t;
            if (h === n && ++c === l && (u = i), h === o && ++m === r && (s = i), (S = p.nextSibling) !== null) break;
            p = h, h = p.parentNode;
          }
          p = S;
        }
        n = u === -1 || s === -1 ? null : { start: u, end: s };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ei = { focusedElem: e, selectionRange: n }, Fl = !1, R = t; R !== null; ) if (t = R, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, R = e;
  else for (; R !== null; ) {
    t = R;
    try {
      var E = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (E !== null) {
            var y = E.memoizedProps, D = E.memoizedState, f = t.stateNode, a = f.getSnapshotBeforeUpdate(t.elementType === t.type ? y : lt(t.type, y), D);
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
      e.return = t.return, R = e;
      break;
    }
    R = t.return;
  }
  return E = Ys, Ys = !1, E;
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
function Gs(e) {
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
function Ot(e, t, n) {
  for (n = n.child; n !== null; ) uf(e, t, n), n = n.sibling;
}
function uf(e, t, n) {
  if (pt && typeof pt.onCommitFiberUnmount == "function") try {
    pt.onCommitFiberUnmount(lo, n);
  } catch (u) {
  }
  switch (n.tag) {
    case 5:
      Ne || An(n, t);
    case 6:
      var r = we, l = ot;
      we = null, Ot(e, t, n), we = r, ot = l, we !== null && (ot ? (e = we, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : we.removeChild(n.stateNode));
      break;
    case 18:
      we !== null && (ot ? (e = we, n = n.stateNode, e.nodeType === 8 ? Vo(e.parentNode, n) : e.nodeType === 1 && Vo(e, n), Rr(e)) : Vo(we, n.stateNode));
      break;
    case 4:
      r = we, l = ot, we = n.stateNode.containerInfo, ot = !0, Ot(e, t, n), we = r, ot = l;
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
      Ot(e, t, n);
      break;
    case 1:
      if (!Ne && (An(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
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
      n.mode & 1 ? (Ne = (r = Ne) || n.memoizedState !== null, Ot(e, t, n), Ne = r) : Ot(e, t, n);
      break;
    default:
      Ot(e, t, n);
  }
}
function Js(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Ip()), t.forEach(function(r) {
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
      var o = e, i = t, u = i;
      e: for (; u !== null; ) {
        switch (u.tag) {
          case 5:
            we = u.stateNode, ot = !1;
            break e;
          case 3:
            we = u.stateNode.containerInfo, ot = !0;
            break e;
          case 4:
            we = u.stateNode.containerInfo, ot = !0;
            break e;
        }
        u = u.return;
      }
      if (we === null) throw Error(k(160));
      uf(o, i, l), we = null, ot = !1;
      var s = l.alternate;
      s !== null && (s.return = null), l.return = null;
    } catch (c) {
      ie(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) sf(t, e), t = t.sibling;
}
function sf(e, t) {
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
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, u = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null) try {
          u === "input" && o.type === "radio" && o.name != null && ja(l, o), di(u, i);
          var c = di(u, o);
          for (i = 0; i < s.length; i += 2) {
            var m = s[i], p = s[i + 1];
            m === "style" ? Oa(l, p) : m === "dangerouslySetInnerHTML" ? La(l, p) : m === "children" ? Tr(l, p) : bi(l, m, p, c);
          }
          switch (u) {
            case "input":
              ui(l, o);
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
        if (e.stateNode === null) throw Error(k(162));
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
        Rr(t.containerInfo);
      } catch (y) {
        ie(e, e.return, y);
      }
      break;
    case 4:
      rt(t, e), ct(e);
      break;
    case 13:
      rt(t, e), ct(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Lu = se())), r & 4 && Js(e);
      break;
    case 22:
      if (m = n !== null && n.memoizedState !== null, e.mode & 1 ? (Ne = (c = Ne) || m, rt(t, e), Ne = c) : rt(t, e), ct(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !m && e.mode & 1) for (R = e, m = e.child; m !== null; ) {
          for (p = R = m; R !== null; ) {
            switch (h = R, S = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Er(4, h, h.return);
                break;
              case 1:
                An(h, h.return);
                var E = h.stateNode;
                if (typeof E.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, E.props = t.memoizedProps, E.state = t.memoizedState, E.componentWillUnmount();
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
                  qs(p);
                  continue;
                }
            }
            S !== null ? (S.return = h, R = S) : qs(p);
          }
          m = m.sibling;
        }
        e: for (m = null, p = e; ; ) {
          if (p.tag === 5) {
            if (m === null) {
              m = p;
              try {
                l = p.stateNode, c ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (u = p.stateNode, s = p.memoizedProps.style, i = s != null && s.hasOwnProperty("display") ? s.display : null, u.style.display = Ma("display", i));
              } catch (y) {
                ie(e, e.return, y);
              }
            }
          } else if (p.tag === 6) {
            if (m === null) try {
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
            m === p && (m = null), p = p.return;
          }
          m === p && (m = null), p.sibling.return = p.return, p = p.sibling;
        }
      }
      break;
    case 19:
      rt(t, e), ct(e), r & 4 && Js(e);
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
        throw Error(k(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Tr(l, ""), r.flags &= -33);
          var o = Gs(e);
          Wi(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, u = Gs(e);
          Bi(e, u, i);
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
function $p(e, t, n) {
  R = e, af(e);
}
function af(e, t, n) {
  for (var r = (e.mode & 1) !== 0; R !== null; ) {
    var l = R, o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || vl;
      if (!i) {
        var u = l.alternate, s = u !== null && u.memoizedState !== null || Ne;
        u = vl;
        var c = Ne;
        if (vl = i, (Ne = s) && !c) for (R = l; R !== null; ) i = R, s = i.child, i.tag === 22 && i.memoizedState !== null ? bs(l) : s !== null ? (s.return = i, R = s) : bs(l);
        for (; o !== null; ) R = o, af(o), o = o.sibling;
        R = l, vl = u, Ne = c;
      }
      Zs(e);
    } else l.subtreeFlags & 8772 && o !== null ? (o.return = l, R = o) : Zs(e);
  }
}
function Zs(e) {
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
                var m = c.memoizedState;
                if (m !== null) {
                  var p = m.dehydrated;
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
            throw Error(k(163));
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
function qs(e) {
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
function bs(e) {
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
            Ui(t);
          } catch (s) {
            ie(t, o, s);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Ui(t);
          } catch (s) {
            ie(t, i, s);
          }
      }
    } catch (s) {
      ie(t, t.return, s);
    }
    if (t === e) {
      R = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      u.return = t.return, R = u;
      break;
    }
    R = t.return;
  }
}
var Fp = Math.ceil, ql = zt.ReactCurrentDispatcher, Pu = zt.ReactCurrentOwner, be = zt.ReactCurrentBatchConfig, H = 0, xe = null, pe = null, Se = 0, Ae = 0, Un = qt(0), me = 0, Wr = null, xn = 0, ho = 0, Ru = 0, Cr = null, Oe = null, Lu = 0, bn = 1 / 0, vt = null, bl = !1, Hi = null, Xt = null, xl = !1, Ut = null, eo = 0, _r = 0, Vi = null, Pl = -1, Rl = 0;
function je() {
  return H & 6 ? se() : Pl !== -1 ? Pl : Pl = se();
}
function Kt(e) {
  return e.mode & 1 ? H & 2 && Se !== 0 ? Se & -Se : Sp.transition !== null ? (Rl === 0 && (Rl = Xa()), Rl) : (e = K, e !== 0 || (e = window.event, e = e === void 0 ? 16 : ba(e.type)), e) : 1;
}
function st(e, t, n, r) {
  if (50 < _r) throw _r = 0, Vi = null, Error(k(185));
  Vr(e, n, r), (!(H & 2) || e !== xe) && (e === xe && (!(H & 2) && (ho |= n), me === 4 && Ft(e, Se)), Fe(e, r), n === 1 && H === 0 && !(t.mode & 1) && (bn = se() + 500, ao && bt()));
}
function Fe(e, t) {
  var n = e.callbackNode;
  Sd(e, t);
  var r = $l(e, e === xe ? Se : 0);
  if (r === 0) n !== null && ss(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && ss(n), t === 1) e.tag === 0 ? wp(ea.bind(null, e)) : vc(ea.bind(null, e)), gp(function() {
      !(H & 6) && bt();
    }), n = null;
    else {
      switch (Ka(r)) {
        case 1:
          n = lu;
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
  if (Pl = -1, Rl = 0, H & 6) throw Error(k(327));
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
    (xe !== e || Se !== t) && (vt = null, bn = se() + 500, hn(e, t));
    do
      try {
        Bp();
        break;
      } catch (u) {
        ff(e, u);
      }
    while (!0);
    yu(), ql.current = o, H = l, pe !== null ? t = 0 : (xe = null, Se = 0, t = me);
  }
  if (t !== 0) {
    if (t === 2 && (l = yi(e), l !== 0 && (r = l, t = Qi(e, l))), t === 1) throw n = Wr, hn(e, 0), Ft(e, r), Fe(e, se()), n;
    if (t === 6) Ft(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Ap(l) && (t = to(e, r), t === 2 && (o = yi(e), o !== 0 && (r = o, t = Qi(e, o))), t === 1)) throw n = Wr, hn(e, 0), Ft(e, r), Fe(e, se()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(k(345));
        case 2:
          cn(e, Oe, vt);
          break;
        case 3:
          if (Ft(e, r), (r & 130023424) === r && (t = Lu + 500 - se(), 10 < t)) {
            if ($l(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              je(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = _i(cn.bind(null, e, Oe, vt), t);
            break;
          }
          cn(e, Oe, vt);
          break;
        case 4:
          if (Ft(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - ut(r);
            o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
          }
          if (r = l, r = se() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Fp(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = _i(cn.bind(null, e, Oe, vt), r);
            break;
          }
          cn(e, Oe, vt);
          break;
        case 5:
          cn(e, Oe, vt);
          break;
        default:
          throw Error(k(329));
      }
    }
  }
  return Fe(e, se()), e.callbackNode === n ? cf.bind(null, e) : null;
}
function Qi(e, t) {
  var n = Cr;
  return e.current.memoizedState.isDehydrated && (hn(e, t).flags |= 256), e = to(e, t), e !== 2 && (t = Oe, Oe = n, t !== null && Xi(t)), e;
}
function Xi(e) {
  Oe === null ? Oe = e : Oe.push.apply(Oe, e);
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
  for (t &= ~Ru, t &= ~ho, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - ut(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function ea(e) {
  if (H & 6) throw Error(k(327));
  Xn();
  var t = $l(e, 0);
  if (!(t & 1)) return Fe(e, se()), null;
  var n = to(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = yi(e);
    r !== 0 && (t = r, n = Qi(e, r));
  }
  if (n === 1) throw n = Wr, hn(e, 0), Ft(e, t), Fe(e, se()), n;
  if (n === 6) throw Error(k(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, cn(e, Oe, vt), Fe(e, se()), null;
}
function Mu(e, t) {
  var n = H;
  H |= 1;
  try {
    return e(t);
  } finally {
    H = n, H === 0 && (bn = se() + 500, ao && bt());
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
function Ou() {
  Ae = Un.current, q(Un);
}
function hn(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, mp(n)), pe !== null) for (n = pe.return; n !== null; ) {
    var r = n;
    switch (hu(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Wl();
        break;
      case 3:
        Zn(), q(De), q(Te), Eu();
        break;
      case 5:
        ku(r);
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
        vu(r.type._context);
        break;
      case 22:
      case 23:
        Ou();
    }
    n = n.return;
  }
  if (xe = e, pe = e = Yt(e.current, null), Se = Ae = t, me = 0, Wr = null, Ru = ho = xn = 0, Oe = Cr = null, dn !== null) {
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
      if (yu(), Tl.current = Zl, Jl) {
        for (var r = te.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        Jl = !1;
      }
      if (vn = 0, ve = he = te = null, kr = !1, Ar = 0, Pu.current = null, n === null || n.return === null) {
        me = 1, Wr = t, pe = null;
        break;
      }
      e: {
        var o = e, i = n.return, u = n, s = t;
        if (t = Se, u.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var c = s, m = u, p = m.tag;
          if (!(m.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var h = m.alternate;
            h ? (m.updateQueue = h.updateQueue, m.memoizedState = h.memoizedState, m.lanes = h.lanes) : (m.updateQueue = null, m.memoizedState = null);
          }
          var S = Bs(i);
          if (S !== null) {
            S.flags &= -257, Ws(S, i, u, o, t), S.mode & 1 && Us(o, c, t), t = S, s = c;
            var E = t.updateQueue;
            if (E === null) {
              var y = /* @__PURE__ */ new Set();
              y.add(s), t.updateQueue = y;
            } else E.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              Us(o, c, t), Iu();
              break e;
            }
            s = Error(k(426));
          }
        } else if (b && u.mode & 1) {
          var D = Bs(i);
          if (D !== null) {
            !(D.flags & 65536) && (D.flags |= 256), Ws(D, i, u, o, t), mu(qn(s, u));
            break e;
          }
        }
        o = s = qn(s, u), me !== 4 && (me = 2), Cr === null ? Cr = [o] : Cr.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var f = Kc(o, s, t);
              Os(o, f);
              break e;
            case 1:
              u = s;
              var a = o.type, d = o.stateNode;
              if (!(o.flags & 128) && (typeof a.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (Xt === null || !Xt.has(d)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var x = Yc(o, u, t);
                Os(o, x);
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
function Iu() {
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
  if (yu(), H = n, ql.current = r, pe !== null) throw Error(k(261));
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
  e.memoizedProps = e.pendingProps, t === null ? hf(e) : pe = t, Pu.current = null;
}
function hf(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Op(n, t), n !== null) {
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
  if (H & 6) throw Error(k(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(k(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (kd(e, o), e === xe && (pe = xe = null, Se = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || xl || (xl = !0, yf(Dl, function() {
    return Xn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = be.transition, be.transition = null;
    var i = K;
    K = 1;
    var u = H;
    H |= 4, Pu.current = null, Dp(e, n), sf(n, e), sp(Ei), Fl = !!ki, Ei = ki = null, e.current = n, $p(n), pd(), H = u, K = i, be.transition = o;
  } else e.current = n;
  if (xl && (xl = !1, Ut = e, eo = l), o = e.pendingLanes, o === 0 && (Xt = null), gd(n.stateNode), Fe(e, se()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (bl) throw bl = !1, e = Hi, Hi = null, e;
  return eo & 1 && e.tag !== 0 && Xn(), o = e.pendingLanes, o & 1 ? e === Vi ? _r++ : (_r = 0, Vi = e) : _r = 0, bt(), null;
}
function Xn() {
  if (Ut !== null) {
    var e = Ka(eo), t = be.transition, n = K;
    try {
      if (be.transition = null, K = 16 > e ? 16 : e, Ut === null) var r = !1;
      else {
        if (e = Ut, Ut = null, eo = 0, H & 6) throw Error(k(331));
        var l = H;
        for (H |= 4, R = e.current; R !== null; ) {
          var o = R, i = o.child;
          if (R.flags & 16) {
            var u = o.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var c = u[s];
                for (R = c; R !== null; ) {
                  var m = R;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Er(8, m, o);
                  }
                  var p = m.child;
                  if (p !== null) p.return = m, R = p;
                  else for (; R !== null; ) {
                    m = R;
                    var h = m.sibling, S = m.return;
                    if (lf(m), m === c) {
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
              var E = o.alternate;
              if (E !== null) {
                var y = E.child;
                if (y !== null) {
                  E.child = null;
                  do {
                    var D = y.sibling;
                    y.sibling = null, y = D;
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
            var f = o.sibling;
            if (f !== null) {
              f.return = o.return, R = f;
              break e;
            }
            R = o.return;
          }
        }
        var a = e.current;
        for (R = a; R !== null; ) {
          i = R;
          var d = i.child;
          if (i.subtreeFlags & 2064 && d !== null) d.return = i, R = d;
          else e: for (i = a; R !== null; ) {
            if (u = R, u.flags & 2048) try {
              switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  po(9, u);
              }
            } catch (C) {
              ie(u, u.return, C);
            }
            if (u === i) {
              R = null;
              break e;
            }
            var x = u.sibling;
            if (x !== null) {
              x.return = u.return, R = x;
              break e;
            }
            R = u.return;
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
  t = qn(n, t), t = Kc(e, t, 1), e = Qt(e, t, 1), t = je(), e !== null && (Vr(e, 1, t), Fe(e, t));
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
        e = qn(n, e), e = Yc(t, e, 1), t = Qt(t, e, 1), e = je(), t !== null && (Vr(t, 1, e), Fe(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Hp(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = je(), e.pingedLanes |= e.suspendedLanes & n, xe === e && (Se & n) === n && (me === 4 || me === 3 && (Se & 130023424) === Se && 500 > se() - Lu ? hn(e, 0) : Ru |= n), Fe(e, t);
}
function mf(e, t) {
  t === 0 && (e.mode & 1 ? (t = al, al <<= 1, !(al & 130023424) && (al = 4194304)) : t = 1);
  var n = je();
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
      throw Error(k(314));
  }
  r !== null && r.delete(t), mf(e, n);
}
var gf;
gf = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || De.current) Ie = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Ie = !1, Lp(e, t, n);
    Ie = !!(e.flags & 131072);
  }
  else Ie = !1, b && t.flags & 1048576 && xc(t, Ql, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      jl(e, t), e = t.pendingProps;
      var l = Yn(t, Te.current);
      Qn(t, n), l = _u(null, t, r, e, l, n);
      var o = Nu();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, $e(r) ? (o = !0, Hl(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, wu(t), l.updater = fo, t.stateNode = l, l._reactInternals = t, Li(t, r, e, n), t = Ii(null, t, r, !0, o, n)) : (t.tag = 0, b && o && pu(t), ze(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (jl(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Kp(r), e = lt(r, e), l) {
          case 0:
            t = Oi(null, t, r, e, n);
            break e;
          case 1:
            t = Qs(null, t, r, e, n);
            break e;
          case 11:
            t = Hs(null, t, r, e, n);
            break e;
          case 14:
            t = Vs(null, t, r, lt(r.type, e), n);
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
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : lt(r, l), Oi(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : lt(r, l), Qs(e, t, r, l, n);
    case 3:
      e: {
        if (qc(t), e === null) throw Error(k(387));
        r = t.pendingProps, o = t.memoizedState, l = o.element, _c(e, t), Yl(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          l = qn(Error(k(423)), t), t = Xs(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = qn(Error(k(424)), t), t = Xs(e, t, r, n, l);
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
      return Nc(t), e === null && ji(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Ci(r, l) ? i = null : o !== null && Ci(r, o) && (t.flags |= 32), Zc(e, t), ze(e, t, i, n), t.child;
    case 6:
      return e === null && ji(t), null;
    case 13:
      return bc(e, t, n);
    case 4:
      return Su(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Jn(t, null, r, n) : ze(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : lt(r, l), Hs(e, t, r, l, n);
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
          var u = o.dependencies;
          if (u !== null) {
            i = o.child;
            for (var s = u.firstContext; s !== null; ) {
              if (s.context === r) {
                if (o.tag === 1) {
                  s = Et(-1, n & -n), s.tag = 2;
                  var c = o.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var m = c.pending;
                    m === null ? s.next = s : (s.next = m.next, m.next = s), c.pending = s;
                  }
                }
                o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), Pi(
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
            i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), Pi(i, n, t), i = o.sibling;
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
      return r = t.type, l = lt(r, t.pendingProps), l = lt(r.type, l), Vs(e, t, r, l, n);
    case 15:
      return Gc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : lt(r, l), jl(e, t), t.tag = 1, $e(r) ? (e = !0, Hl(t)) : e = !1, Qn(t, n), Xc(t, r, l), Li(t, r, l, n), Ii(null, t, r, !0, e, n);
    case 19:
      return ef(e, t, n);
    case 22:
      return Jc(e, t, n);
  }
  throw Error(k(156, t.tag));
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
function Du(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Kp(e) {
  if (typeof e == "function") return Du(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === tu) return 11;
    if (e === nu) return 14;
  }
  return 2;
}
function Yt(e, t) {
  var n = e.alternate;
  return n === null ? (n = qe(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Ll(e, t, n, r, l, o) {
  var i = 2;
  if (r = e, typeof e == "function") Du(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case Pn:
      return mn(n.children, l, o, t);
    case eu:
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
        case tu:
          i = 11;
          break e;
        case nu:
          i = 14;
          break e;
        case It:
          i = 16, r = null;
          break e;
      }
      throw Error(k(130, e == null ? e : typeof e, ""));
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
function $u(e, t, n, r, l, o, i, u, s) {
  return e = new Yp(e, t, n, u, s), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = qe(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, wu(o), e;
}
function Gp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: jn, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function vf(e) {
  if (!e) return Jt;
  e = e._reactInternals;
  e: {
    if (kn(e) !== e || e.tag !== 1) throw Error(k(170));
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
    if ($e(n)) return yc(e, n, t);
  }
  return t;
}
function xf(e, t, n, r, l, o, i, u, s) {
  return e = $u(n, r, !0, e, l, o, i, u, s), e.context = vf(null), n = e.current, r = je(), l = Kt(n), o = Et(r, l), o.callback = t != null ? t : null, Qt(n, o, l), e.current.lanes = l, Vr(e, l, r), Fe(e, r), e;
}
function go(e, t, n, r) {
  var l = t.current, o = je(), i = Kt(l);
  return n = vf(n), t.context === null ? t.context = n : t.pendingContext = n, t = Et(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Qt(l, t, i), e !== null && (st(e, l, i, o), Nl(e, l, i)), i;
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
function Fu(e, t) {
  na(e, t), (e = e.alternate) && na(e, t);
}
function Jp() {
  return null;
}
var wf = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Au(e) {
  this._internalRoot = e;
}
yo.prototype.render = Au.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(k(409));
  go(e, t, null, null);
};
yo.prototype.unmount = Au.prototype.unmount = function() {
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
function Uu(e) {
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
    return e._reactRootContainer = i, e[_t] = i.current, Or(e.nodeType === 8 ? e.parentNode : e), wn(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function() {
      var c = no(s);
      u.call(c);
    };
  }
  var s = $u(e, 0, !1, null, null, !1, !1, "", ra);
  return e._reactRootContainer = s, e[_t] = s.current, Or(e.nodeType === 8 ? e.parentNode : e), wn(function() {
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
Ya = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = mr(t.pendingLanes);
        n !== 0 && (ou(t, n | 1), Fe(t, se()), !(H & 6) && (bn = se() + 500, bt()));
      }
      break;
    case 13:
      wn(function() {
        var r = Nt(e, 1);
        if (r !== null) {
          var l = je();
          st(r, e, 1, l);
        }
      }), Fu(e, 1);
  }
};
iu = function(e) {
  if (e.tag === 13) {
    var t = Nt(e, 134217728);
    if (t !== null) {
      var n = je();
      st(t, e, 134217728, n);
    }
    Fu(e, 134217728);
  }
};
Ga = function(e) {
  if (e.tag === 13) {
    var t = Kt(e), n = Nt(e, t);
    if (n !== null) {
      var r = je();
      st(n, e, t, r);
    }
    Fu(e, t);
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
      if (ui(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = so(r);
            if (!l) throw Error(k(90));
            za(r), ui(r, l);
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
$a = Mu;
Fa = wn;
var qp = { usingClientEntryPoint: !1, Events: [Xr, On, so, Ia, Da, Mu] }, dr = { findFiberByHostInstance: fn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, bp = { bundleType: dr.bundleType, version: dr.version, rendererPackageName: dr.rendererPackageName, rendererConfig: dr.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: zt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
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
  if (!Uu(t)) throw Error(k(200));
  return Gp(e, t, null, n);
};
He.createRoot = function(e, t) {
  if (!Uu(e)) throw Error(k(299));
  var n = !1, r = "", l = wf;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = $u(e, 1, !1, null, null, n, !1, r, l), e[_t] = t.current, Or(e.nodeType === 8 ? e.parentNode : e), new Au(t);
};
He.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(k(188)) : (e = Object.keys(e).join(","), Error(k(268, e)));
  return e = Ba(t), e = e === null ? null : e.stateNode, e;
};
He.flushSync = function(e) {
  return wn(e);
};
He.hydrate = function(e, t, n) {
  if (!vo(t)) throw Error(k(200));
  return xo(null, e, t, !0, n);
};
He.hydrateRoot = function(e, t, n) {
  if (!Uu(e)) throw Error(k(405));
  var r = n != null && n.hydratedSources || null, l = !1, o = "", i = wf;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = xf(t, null, e, 1, n != null ? n : null, l, !1, o, i), e[_t] = t.current, Or(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new yo(t);
};
He.render = function(e, t, n) {
  if (!vo(t)) throw Error(k(200));
  return xo(null, e, t, !1, n);
};
He.unmountComponentAtNode = function(e) {
  if (!vo(e)) throw Error(k(40));
  return e._reactRootContainer ? (wn(function() {
    xo(null, null, e, !1, function() {
      e._reactRootContainer = null, e[_t] = null;
    });
  }), !0) : !1;
};
He.unstable_batchedUpdates = Mu;
He.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!vo(n)) throw Error(k(200));
  if (e == null || e._reactInternals === void 0) throw Error(k(38));
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
function ua(e) {
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
const sa = [
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
  const n = T.useRef(null), r = T.useRef(null), l = T.useRef(null), o = typeof window != "undefined" ? window : {}, i = () => {
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
        const x = d.createOscillator(), C = d.createGain();
        x.type = f, x.frequency.value = y, C.gain.value = a, x.connect(C), C.connect(d.destination), d.state === "suspended" && d.resume().catch(() => {
        });
        const P = d.currentTime;
        x.start(P), x.stop(P + D);
      } catch (x) {
      }
  }, s = (y, D = 0.12, f = 0.04) => {
    const a = i();
    if (!(!a || !y || !y.length))
      try {
        a.state === "suspended" && a.resume().catch(() => {
        }), y.forEach((d, x) => {
          const C = a.createOscillator(), P = a.createGain();
          C.type = "triangle", C.frequency.value = d, P.gain.value = 0.08, C.connect(P), P.connect(a.destination);
          const L = a.currentTime + x * (D + f);
          C.start(L), C.stop(L + D);
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
  }, m = (y = !0) => {
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
  }, S = () => {
    if (!l.current)
      try {
        const y = new Audio("lumetrix/audio/jugar.mp3");
        y.volume = 0.7, l.current = y;
      } catch (y) {
        console.log("Error cargando audio de inicio:", y);
      }
  }, E = () => {
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
      E();
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
    startBg: m,
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
  T.useEffect(() => {
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
  const n = T.useRef(null), r = T.useRef(null), [l, o] = T.useState(!1), [i, u] = T.useState(null), s = async () => {
    try {
      await window.LUM_API.api("auth.php?action=logout"), o(!1), u(null), window.location.reload();
    } catch (c) {
      console.log("Error al cerrar sesión");
    }
  };
  return T.useEffect(() => {
    const c = n.current;
    if (!c) return;
    const p = setInterval(() => {
      const h = document.createElement("i"), S = 20 + Math.random() * 25, E = 40 + Math.random() * 60;
      let y, D;
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
        y = C.x[0] + Math.random() * (C.x[1] - C.x[0]), D = C.y[0] + Math.random() * (C.y[1] - C.y[0]);
      } else
        y = Math.random() * 100, D = Math.random() * 100;
      h.style.left = y + "%", h.style.top = D + "%", h.style.width = S + "px", h.style.height = E + "px";
      const a = [0, 60, 120, 180, 240, 300, 45, 135, 225, 315], d = a[Math.floor(Math.random() * a.length)];
      h.style.background = `hsl(${d} 95% 65% / .9)`, c.appendChild(h), setTimeout(() => h.remove(), 3e3);
    }, 80);
    return () => clearInterval(p);
  }, []), T.useEffect(() => {
    const c = () => {
      var y;
      const p = r.current;
      if (!p) return;
      const h = (y = p.parentElement) == null ? void 0 : y.parentElement;
      if (!h) return;
      p.style.fontSize = "";
      let S = Math.min(42, Math.max(28, Math.floor(h.clientWidth * 0.16)));
      p.style.fontSize = S + "px", p.style.letterSpacing = "0.16em";
      let E = 0;
      for (; p.scrollWidth > h.clientWidth - 24 && E < 20; )
        S -= 1, p.style.fontSize = S + "px", E++;
    };
    c();
    const m = new ResizeObserver(c);
    return m.observe(document.body), () => m.disconnect();
  }, []), T.useEffect(() => {
    (async () => {
      try {
        if (window.LUM_API && window.LUM_API.api) {
          const m = await window.LUM_API.api("auth.php?action=check_session");
          m && m.success && (o(!0), u(m.user));
        }
      } catch (m) {
        console.log("No hay sesión activa"), o(!1), u(null);
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
        /* @__PURE__ */ g.jsx("img", { src: "lumetrix/img/logo.png", alt: "LUMETRIX", style: {
          height: "150px",
          width: "500px",
          filter: "drop-shadow(0 0 20px #39ff14) drop-shadow(0 0 40px #00ffff) drop-shadow(0 0 60px #ff00ff)",
          animation: "logoGlow 2s ease-in-out infinite alternate"
        }, onError: (c) => {
          c.target.style.display = "none", c.target.nextSibling.style.display = "block";
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
      l ? (
        // Usuario logueado - mostrar progreso guardado
        /* @__PURE__ */ g.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
          /* @__PURE__ */ g.jsxs("div", { style: { fontSize: 18, opacity: 0.9, color: "#39ff14", fontWeight: 700, marginBottom: 4 }, children: [
            "¡Hola, ",
            (i == null ? void 0 : i.nick) || "Usuario",
            "! 👋"
          ] }),
          /* @__PURE__ */ g.jsx("div", { style: { fontSize: 13, opacity: 0.6, marginBottom: 16 }, children: "Partida guardada" }),
          /* @__PURE__ */ g.jsx("div", { className: "actions", style: { marginBottom: 8 }, children: /* @__PURE__ */ g.jsx("button", { className: "btn btn1", onClick: e, children: "CONTINUAR" }) }),
          /* @__PURE__ */ g.jsx(
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
        /* @__PURE__ */ g.jsxs("div", { style: { textAlign: "center", marginTop: 20 }, children: [
          /* @__PURE__ */ g.jsx("div", { className: "actions", style: { marginBottom: 16 }, children: /* @__PURE__ */ g.jsx("button", { className: "btn btn1", onClick: e, children: "JUGAR" }) }),
          /* @__PURE__ */ g.jsx("div", { style: { fontSize: 12, opacity: 0.5, marginBottom: 6 }, children: "¿Ya tienes cuenta?" }),
          /* @__PURE__ */ g.jsx(
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
    /* @__PURE__ */ g.jsx("div", { className: "copy", style: { fontSize: "14px", fontWeight: 500 }, children: "© @intocables13 · Todos los derechos reservados" })
  ] }) });
}
function i0({ level: e, setLevel: t, soundOn: n, musicOn: r, musicVolume: l, vibrateOn: o, onOpenAuth: i, onOpenRanking: u, onOpenOptions: s, onTotalUpdate: c, totalTime: m }) {
  const p = T.useRef(null), [h, S] = T.useState(ei(e)), [E, y] = T.useState(!1), [D, f] = T.useState(!1), [a, d] = T.useState(!1), [x, C] = T.useState(!1), [P, L] = T.useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0;
    } catch (v) {
      return 0;
    }
  });
  T.useEffect(() => {
    typeof m == "number" && L(m);
  }, [m]);
  const N = r0(n, l), Y = Math.floor((e - 1) / 10) + 1, A = (e - 1) % 10 + 1, ae = T.useMemo(() => ua(e), [e]);
  T.useEffect(() => {
    N.initBg(), N.initStart();
    const v = setTimeout(() => {
      N.startBg(r);
    }, 1e3);
    return () => clearTimeout(v);
  }, [N, r]), T.useEffect(() => {
    r ? N.startBg(!0) : N.stopBg();
  }, [r, N]), T.useEffect(() => {
    N.updateVolume(l);
  }, [l, N]);
  const en = (v) => {
    const w = xt(v), _ = w.mechanics, O = Math.floor((v - 1) / 10) + 1;
    if (console.log(`CACHE_ROTO_NUEVO_CODIGO_FUNCIONANDO_Nivel_${v}_mechanics_`, _), _.includes("drag") && _.includes("double")) {
      console.log("COMBO DETECTADO: drag + double");
      const j = w.tiles, M = Math.max(1, Math.floor(j / 4)), I = Math.max(1, Math.floor(j / 4)), ce = [...Array.from({ length: j }, (de, Ke) => Ke)].sort(() => Math.random() - 0.5), fe = new Set(ce.slice(0, M)), ge = new Set(ce.slice(M, M + I)), oe = new Set(ce.slice(M + I));
      if (Yr(fe), Gr(ge), Jr(oe), mt(ge), gt.current = ge, fe.size > 0) {
        const de = Array.from(fe)[0];
        $(de), Q.current = de, ko(de);
      } else
        $(null), Q.current = null, ko(null);
      console.log("COMBO: dragTiles=", Array.from(new Set(ce.slice(0, M)))), console.log("COMBO: doubleTiles=", Array.from(ge)), console.log("COMBO: touchTiles=", Array.from(new Set(ce.slice(M + I))));
    } else if (_.includes("double") && !_.includes("drag")) {
      console.log(`DEBUG: Nivel ${v} - detectado como doble toque. mechanics=`, _);
      const j = 1, M = /* @__PURE__ */ new Set();
      for (; M.size < j; ) {
        const I = Math.floor(Math.random() * w.tiles);
        M.add(I);
      }
      console.log(`Mundo ${O}, Nivel ${v}: Fichas de doble toque = [${Array.from(M)}], Total fichas = ${w.tiles}`), gt.current = M, mt(M), Yr(/* @__PURE__ */ new Set()), Gr(/* @__PURE__ */ new Set()), Jr(/* @__PURE__ */ new Set()), ko(null), $(null), Q.current = null;
    } else if (O >= 2 && _.includes("drag")) {
      const j = w.tiles, M = Array.from({ length: j - 1 }, (ce, fe) => fe + 1), I = Math.floor(Math.random() * M.length), X = M[I];
      console.log(`Mundo ${O}, Nivel ${v}: Ficha especial = ${X}, Total fichas = ${j}`), $(X), Q.current = X, gt.current.clear(), mt(/* @__PURE__ */ new Set()), Yr(/* @__PURE__ */ new Set()), Gr(/* @__PURE__ */ new Set()), Jr(/* @__PURE__ */ new Set());
    } else
      gt.current.clear(), mt(/* @__PURE__ */ new Set()), Yr(/* @__PURE__ */ new Set()), Gr(/* @__PURE__ */ new Set()), Jr(/* @__PURE__ */ new Set()), $(null), Q.current = null;
    Xe.current.clear(), En(/* @__PURE__ */ new Set());
  }, [tn, wo] = T.useState([]), [ue, Le] = T.useState(null), [Me, z] = T.useState(null), [F, $] = T.useState(null), V = T.useRef(null), re = T.useRef({ x: 0, y: 0 }), nt = T.useRef({ x: 0, y: 0 }), Q = T.useRef(null), Qe = T.useRef(null), [jt, mt] = T.useState(/* @__PURE__ */ new Set()), gt = T.useRef(/* @__PURE__ */ new Set()), [f0, En] = T.useState(/* @__PURE__ */ new Set()), Xe = T.useRef(/* @__PURE__ */ new Set()), [Bu, Yr] = T.useState(/* @__PURE__ */ new Set()), [So, Gr] = T.useState(/* @__PURE__ */ new Set()), [d0, Jr] = T.useState(/* @__PURE__ */ new Set()), [p0, ko] = T.useState(null), Ee = T.useRef([]), le = T.useRef(0);
  T.useRef(/* @__PURE__ */ new Map());
  const Pt = T.useRef(null), nn = T.useRef(!1), Eo = 8, Co = T.useRef({ x: 0, y: 0 }), _o = T.useRef(!1), Zr = (v) => {
    const _ = (xt(e) || { mechanics: [] }).mechanics || [], O = Math.floor((e - 1) / 10) + 1;
    return _.includes("combo") || _.includes("touch") && _.includes("drag") && _.includes("double") ? Bu.has(v) : O >= 2 && _.includes("drag") ? Q.current === v : !1;
  }, Ef = (v = "tap") => {
    const w = p.current;
    if (!w || Q.current == null) return;
    const _ = w.querySelector(`.tile[data-id="${Q.current}"]`);
    if (!_) return;
    _.classList.remove("nudge-shake"), _.offsetHeight, _.classList.add("nudge-shake"), setTimeout(() => _.classList.remove("nudge-shake"), 550), Le((I) => I && { ...I, hint: !0 }), setTimeout(() => Le((I) => I && { ...I, hint: !1 }), 900);
    const O = _.getBoundingClientRect(), j = w.getBoundingClientRect(), M = document.createElement("div");
    M.className = "drag-hint", M.textContent = "arrastra", Object.assign(M.style, {
      left: `${O.left - j.left + O.width / 2}px`,
      top: `${O.top - j.top}px`
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
    yt(10, o);
  }, Cf = (v) => {
    const w = p.current;
    if (!w) return;
    const _ = w.querySelector(`.tile[data-id="${v}"]`);
    if (!_) return;
    _.classList.remove("nudge-shake"), _.offsetHeight, _.classList.add("nudge-shake"), setTimeout(() => _.classList.remove("nudge-shake"), 550);
    const O = _.getBoundingClientRect(), j = w.getBoundingClientRect(), M = document.createElement("div");
    M.className = "drag-hint", M.textContent = "dos veces", Object.assign(M.style, {
      left: `${O.left - j.left + O.width / 2}px`,
      top: `${O.top - j.top}px`
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
    yt(10, o);
  }, qr = (v = "unknown") => {
    const w = p.current, _ = Q.current;
    if (!w || _ == null) return;
    const O = w.querySelector(`.tile[data-id="${_}"]`);
    if (!O) return;
    let j = Qe.current;
    if (!j && O.dataset.origX && (j = {
      x: parseFloat(O.dataset.origX),
      y: parseFloat(O.dataset.origY),
      width: parseFloat(O.dataset.origW),
      height: parseFloat(O.dataset.origH)
    }), !j) {
      console.warn("restoreSpecialTile: no original position", { reason: v, id: _ });
      return;
    }
    O.style.position = "absolute", O.style.left = `${j.x}px`, O.style.top = `${j.y}px`, O.style.width = `${j.width}px`, O.style.height = `${j.height}px`, O.classList.remove("dragging"), O.style.zIndex = "", O.style.pointerEvents = "", z(null), V.current = null, console.log(`Ficha especial ${_} restaurada (${v}) →`, j);
  }, Wu = (v, w, _, O, j = 48) => {
    if (!_ || !O) return !1;
    const M = O.getBoundingClientRect(), I = v - M.left, X = w - M.top;
    return I > _.x - j && I < _.x + _.w + j && X > _.y - j && X < _.y + _.h + j;
  }, Hu = (v) => {
    var _;
    const w = (_ = p.current) == null ? void 0 : _.querySelector(`.tile[data-id="${v}"]`);
    if (w) {
      const O = parseFloat(w.dataset.pitch || "880");
      w.style.background = rn.current || ae, w.style.pointerEvents = "none", w.style.opacity = "0.7", N.ok(O), yt(20, o);
    }
  }, Vu = () => {
    if (le.current++, le.current >= Ee.current.length) {
      if (!ln.current) {
        ln.current = !0;
        const v = Math.ceil((Date.now() - br.current) / 1e3);
        No(v);
        try {
          window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
            method: "POST",
            body: JSON.stringify({
              level: e,
              total_time_s: v,
              success: 1
            })
          }).catch((w) => {
            console.log("No hay sesión activa para guardar progreso");
          });
        } catch (w) {
        }
      }
      Pt.current && clearInterval(Pt.current), y(!1), nn.current = !1, f(!0);
      try {
        N.winMelody((el.current || []).slice(0, 6));
      } catch (v) {
      }
    }
  }, Qu = () => {
    N.fail(), yt(80, o), le.current = 0, nl(), Xe.current.clear(), En(/* @__PURE__ */ new Set());
    const v = p.current;
    if (v && Q.current !== null && Qe.current) {
      const w = v.querySelector(`.tile[data-id="${Q.current}"]`);
      w && (w.style.position = "absolute", w.style.left = `${Qe.current.x}px`, w.style.top = `${Qe.current.y}px`, w.style.width = `${Qe.current.width}px`, w.style.height = `${Qe.current.height}px`, w.style.zIndex = "", w.style.pointerEvents = "", w.classList.remove("dragging"), console.log(`Ficha especial ${Q.current} reposicionada a su lugar original:`, Qe.current));
    }
  }, br = T.useRef(0), el = T.useRef([]), rn = T.useRef(ae), ln = T.useRef(!1);
  T.useEffect(() => {
    var w;
    const v = (w = p.current) == null ? void 0 : w.closest(".device");
    v && v.style.setProperty("--accent", ae);
  }, [ae]);
  const No = (v) => {
    try {
      const _ = (Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0) + v;
      localStorage.setItem("lum_total", JSON.stringify(_)), L(_), typeof c == "function" && c(_);
    } catch (w) {
    }
  };
  function _f(v, w = null, _ = null) {
    var lr;
    const j = xt(e).mechanics, M = j.includes("drag") && j.includes("double"), I = _ || (M ? So : gt.current);
    console.log(`placeTiles llamado: n=${v}, currentSpecialId=${w}, doubleTouchTiles=`, Array.from(I));
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
    const Lt = [], Mt = /* @__PURE__ */ new Set();
    for (let U = 0; U < v; U++) {
      let ye = 0, Ge = 0, on = 0, un = 0, Xu = !1, zf = 0;
      for (; !Xu && zf++ < 300; )
        ye = Math.max(56, Math.min(140, 60 + Math.random() * 80)), Ge = Math.max(56, Math.min(160, 60 + Math.random() * 100)), on = Math.max(8, Math.min(fe - ye - 8, oe(0, fe - ye))), un = Math.max(8, Math.min(ge - Ge - 8, oe(0, ge - Ge))), Xu = !Lt.some((J) => !(on + ye <= J.x || J.x + J.w <= on || un + Ge <= J.y || J.y + J.h <= un));
      Lt.push({ x: on, y: un, w: ye, h: Ge });
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
      if (Object.assign(W.style, { left: on + "px", top: un + "px", width: ye + "px", height: Ge + "px", background: Nn }), W.style.background === (rn.current || ae)) {
        const J = ((ia[rn.current || ae] || 0) + 180) % 360;
        W.style.background = `hsl(${J} 96% 58%)`;
      }
      W.dataset.id = String(U), W.dataset.orig = W.style.background;
      const Ku = el.current || [];
      W.dataset.pitch = String(Ku[U % Ku.length] || 660);
      const rl = xt(e).mechanics, Yu = Math.floor((e - 1) / 10) + 1;
      if (W.style.cursor = "pointer", Yu >= 2 && Q.current === U && (W.classList.add("special-drag-tile"), W.addEventListener("dragstart", (J) => J.preventDefault()), W.addEventListener("touchstart", (J) => J.preventDefault(), { passive: !1 }), W.addEventListener("pointerdown", (J) => {
        To(J, { id: U });
      }, { passive: !1 }), setTimeout(() => {
        var Gu;
        const J = W.getBoundingClientRect(), sn = (Gu = p.current) == null ? void 0 : Gu.getBoundingClientRect();
        if (sn) {
          const Tn = {
            x: J.left - sn.left,
            y: J.top - sn.top,
            width: J.width,
            height: J.height
          };
          Qe.current = Tn, W.dataset.origX = String(Tn.x), W.dataset.origY = String(Tn.y), W.dataset.origW = String(Tn.width), W.dataset.origH = String(Tn.height), console.log("Posición original guardada:", Tn);
        }
      }, 50), console.log(`Ficha especial ${U} configurada para arrastre con clase 'special-drag-tile' (SIN event listener específico)`)), rl.includes("combo") || rl.includes("touch") && rl.includes("drag") && rl.includes("double"))
        if (Bu.has(U)) {
          const J = W.style.background;
          W.style.border = `1px solid ${J}`, W.style.boxShadow = `0 0 8px ${J}88`, W.style.cursor = "grab", W.addEventListener("pointerdown", (sn) => To(sn, U)), W.addEventListener("dragstart", (sn) => sn.preventDefault()), console.log(`Ficha ${U} marcada como ARRASTRE en COMBO`);
        } else So.has(U) ? (W.style.setProperty("border", "2px solid white", "important"), W.style.setProperty("outline", "2px solid white", "important"), W.style.setProperty("outline-offset", "4px", "important"), console.log(`Ficha ${U} marcada como doble toque en COMBO - BORDE DOBLE APLICADO`)) : (W.style.border = "1px solid rgba(255,255,255,0.2)", W.style.boxShadow = "none");
      else
        console.log(`Procesando ficha ${U}, doubleTouchTiles:`, Array.from(I), `¿Tiene ${U}?`, I.has(U)), I.has(U) && (W.style.setProperty("border", "2px solid white", "important"), W.style.setProperty("outline", "2px solid white", "important"), W.style.setProperty("outline-offset", "4px", "important"), console.log(`🚨 CACHE ROOTO - Ficha ${U} marcada como doble toque - BORDES BLANCOS APLICADOS`));
      Yu >= 2 && Q.current === U && (W.style.cursor = "grab", console.log(`Cursor 'grab' aplicado a ficha especial ${U}`)), X.appendChild(W);
    }
    X.__lumDeleg && X.removeEventListener("pointerdown", X.__lumDeleg);
    const _n = (U) => {
      const ye = U.target && U.target.closest && U.target.closest(".tile");
      if (!ye || !X.contains(ye) || !nn.current) return;
      const Ge = Number(ye.dataset.id), on = Ee.current[le.current], un = Zr(on);
      if (ye.classList.contains("special-drag-tile") || Ge === Q.current) {
        To(U, { id: Ge });
        return;
      }
      un || (U.preventDefault && U.preventDefault(), rr(Ge));
    };
    X.addEventListener("pointerdown", _n, { passive: !1 }), X.__lumDeleg = _n;
  }
  function tl(v) {
    const w = p.current, _ = w && w.querySelector(`.tile[data-id="${v}"]`);
    if (!_) return;
    _.style.background;
    const O = _.style.border, j = _.style.boxShadow, M = _.style.outline, I = _.style.outlineOffset;
    _.classList.add("lit"), _.style.background = rn.current || ae, N.blink(parseFloat(_.dataset.pitch || "720")), setTimeout(() => {
      _.classList.remove("lit"), gt.current.has(v) && (_.style.border = O, _.style.boxShadow = j, _.style.outline = M, _.style.outlineOffset = I);
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
    rn.current = ua(w), _ && _.style.setProperty("--accent", rn.current), f(!1), d(!1), C(!1), ln.current = !1, Pt.current && clearInterval(Pt.current);
    const O = t0(w), j = Array.from({ length: O }, (Ye, Rt) => Rt), M = 0, I = j.slice(1).sort(() => Math.random() - 0.5);
    Ee.current = [M, ...I], console.log(`Secuencia generada para nivel ${w}:`, Ee.current), le.current = 0, el.current = sa[Math.floor(Math.random() * sa.length)] || [440, 494, 523, 587, 659, 698, 784, 880, 988, 1046, 1174, 1318, 1396, 1567, 1760], en(w);
    let X = null, ce = /* @__PURE__ */ new Set();
    const fe = Math.floor((w - 1) / 10) + 1;
    xt(w).mechanics, X = Q.current, ce = gt.current, _f(O, X, ce), setTimeout(() => {
      var Rt, Lt, Mt;
      const Ye = xt(w);
      if (fe >= 2 && X !== null && Ye.mechanics.includes("drag")) {
        const _n = (Rt = p.current) == null ? void 0 : Rt.querySelector(`.tile[data-id="${X}"]`);
        if (_n) {
          const lr = _n.getBoundingClientRect();
          if ((Lt = p.current) == null ? void 0 : Lt.getBoundingClientRect()) {
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
            Le(Ge), console.log(`Zona de drop creada para ficha ${X}`);
          }
        }
      } else
        Le(null);
    }, 100);
    const oe = ei(w);
    S(oe), y(!0), nn.current = !0, N.start(), br.current = Date.now();
    const de = Date.now();
    Pt.current = setInterval(() => {
      const Ye = (Date.now() - de) / 1e3, Rt = Math.max(0, oe - Ye);
      if (S(Math.ceil(Rt)), Rt <= 0) {
        if (!ln.current) {
          ln.current = !0;
          const Lt = Math.ceil((Date.now() - br.current) / 1e3);
          No(Lt);
          try {
            window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
              method: "POST",
              body: JSON.stringify({
                level: e,
                total_time_s: Lt,
                success: 0
              })
            }).catch((Mt) => {
              console.log("No hay sesión activa para guardar progreso");
            });
          } catch (Mt) {
          }
        }
        clearInterval(Pt.current), y(!1), nn.current = !1, qr("timeout"), d(!0), N.fail(), nl();
      }
    }, 100), setTimeout(Nf, 1500);
  }
  T.useEffect(() => {
    const v = (w) => {
      _o.current && (w.preventDefault(), w.stopPropagation(), _o.current = !1, console.log("Click sintético anulado tras drag"));
    };
    return document.addEventListener("click", v, !0), () => document.removeEventListener("click", v, !0);
  }, []), T.useEffect(() => {
    window.LumetrixTest = Object.assign({}, window.LumetrixTest, {
      start: Cn,
      state: () => ({ level: e, world: Y, levelInWorld: A, running: E, time: h, seqLen: (Ee.current || []).length }),
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
  }, [e, Y, A, E, h]);
  const To = (v, w) => {
    var M;
    if (!nn.current) return;
    const _ = Ee.current[le.current], O = p.current, j = O == null ? void 0 : O.querySelector(`.tile[data-id="${w.id}"]`);
    if (j) {
      if (w.id === Q.current) {
        console.log(`Ficha especial ${w.id} tocada, esperada: ${_}`), v.preventDefault(), v.stopPropagation();
        const I = j.getBoundingClientRect();
        Co.current = { x: I.left, y: I.top }, _o.current = !0, z(w.id), V.current = (M = v.pointerId) != null ? M : null, re.current = { x: v.clientX - I.left, y: v.clientY - I.top }, nt.current = { x: I.left, y: I.top }, j.style.zIndex = 1e3, j.classList.add("dragging"), j.style.pointerEvents = "none", j.style.touchAction = "none", console.log("Drag iniciado correctamente - ficha en posición original");
        return;
      }
      if (w.id !== _) return Qu();
      Hu(w.id), Vu();
    }
  };
  function rr(v) {
    if (!nn.current) return;
    const w = xt(e);
    if (w.mechanics.includes("drag") && v === Q.current) {
      console.log("tap ignorado en especial (modo drag)");
      return;
    }
    const _ = Ee.current[le.current], O = p.current;
    if (Zr(_))
      return;
    const j = O && O.querySelector(`.tile[data-id="${v}"]`);
    if (!j) return;
    const M = parseFloat(j.dataset.pitch || "880"), I = gt.current.has(v), X = (w.mechanics.includes("combo") || w.mechanics.includes("touch") && w.mechanics.includes("drag") && w.mechanics.includes("double")) && So.has(v);
    if (console.log(`tap(${v}): doubleTouchTiles=`, Array.from(gt.current), `isDoubleTile=${I}`), console.log(`tap(${v}): isDoubleTile=${I}, config.mechanics=`, w.mechanics, "includes('double')=", w.mechanics.includes("double"), `isComboDouble=${X}`), I && w.mechanics.includes("double") || X)
      if (v === _)
        if (console.log(`Ficha ${v} es de doble toque y es su turno. partiallyTouched:`, Array.from(Xe.current), `¿Tiene ${v}?`, Xe.current.has(v)), Xe.current.has(v))
          console.log(`SEGUNDO TOQUE en ficha ${v} - completando doble toque`), j.style.opacity = "1", tl(v), N.ok(M), yt(20, o), le.current++, Xe.current.delete(v), En(new Set(Xe.current));
        else {
          console.log(`PRIMER TOQUE en ficha ${v} - marcando como parcialmente tocada`), j.style.opacity = "0.6", tl(v), N.ok(M), yt(20, o), Xe.current.add(v), console.log("Actualizando partiallyTouched:", Array.from(Xe.current)), En(new Set(Xe.current)), Cf(v);
          return;
        }
      else {
        console.log(`Error: ficha de doble toque ${v} no es la esperada (${_})`), N.fail(), yt(80, o), le.current = 0, nl(), Xe.current.clear(), En(/* @__PURE__ */ new Set());
        return;
      }
    else if (v === _) {
      tl(v), N.ok(M), yt(20, o), le.current++;
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
            Le(Ye);
          }
        }
      }, 100) : (ce >= 2 || w.mechanics.includes("combo") || w.mechanics.includes("touch") && w.mechanics.includes("drag") && w.mechanics.includes("double")) && Le(null), le.current >= Ee.current.length) {
        if (!ln.current) {
          ln.current = !0;
          const fe = Math.ceil((Date.now() - br.current) / 1e3);
          No(fe);
          try {
            window.LUM_API && window.LUM_API.api("game.php?action=save_progress", {
              method: "POST",
              body: JSON.stringify({
                level: e,
                // nivel actual
                total_time_s: fe,
                success: 1
              })
            }).catch((ge) => {
              console.log("No hay sesión activa para guardar progreso");
            });
          } catch (ge) {
          }
        }
        Pt.current && clearInterval(Pt.current), y(!1), nn.current = !1, e === 50 ? C(!0) : f(!0);
        try {
          N.winMelody((el.current || []).slice(0, 6));
        } catch (fe) {
        }
      }
    } else
      console.log(`Error: ficha ${v} no es la esperada (${_})`), N.fail(), yt(80, o), le.current = 0, qr("wrong-tap"), nl(), Xe.current.clear(), En(/* @__PURE__ */ new Set());
  }
  function Tf() {
    f(!1), d(!1), C(!1);
    const v = e + 1;
    t(v), setTimeout(() => Cn(v), 0);
  }
  return T.useEffect(() => {
    window.LumetrixTest = { start: Cn, state: () => ({ level: e, world: Y, levelInWorld: A, running: E, time: h, seqLen: (Ee.current || []).length }), tapExpected: () => {
      const v = Ee.current[le.current];
      v != null && rr(v);
    } };
  }, [e, Y, A, E, h]), T.useEffect(() => {
    const v = (_) => {
      var de;
      if (Me == null || V.current !== null && _.pointerId !== V.current) return;
      const O = _.clientX - re.current.x, j = _.clientY - re.current.y, M = (de = p.current) == null ? void 0 : de.querySelector(`.tile[data-id="${Me}"]`);
      if (!M) return;
      const I = Math.abs(O - nt.current.x), X = Math.abs(j - nt.current.y), ce = 5;
      (I > ce || X > ce || M.style.position === "fixed") && (M.style.position = "fixed", M.style.left = `${O}px`, M.style.top = `${j}px`, nt.current = { x: O, y: j });
      const fe = O + ((M == null ? void 0 : M.offsetWidth) || 0) / 2, ge = j + ((M == null ? void 0 : M.offsetHeight) || 0) / 2, oe = Wu(fe, ge, ue, p.current, 48);
      Le((Ke) => Ke ? { ...Ke, over: oe } : null);
    }, w = (_) => {
      var ge;
      if (Me == null || V.current !== null && _.pointerId !== V.current) return;
      const O = Ee.current[le.current], j = (ge = p.current) == null ? void 0 : ge.querySelector(`.tile[data-id="${Me}"]`), M = nt.current.x, I = nt.current.y, X = M + ((j == null ? void 0 : j.offsetWidth) || 0) / 2, ce = I + ((j == null ? void 0 : j.offsetHeight) || 0) / 2, fe = Wu(X, ce, ue, p.current, 48);
      if (console.debug("Drag drop validation:", {
        expected: O,
        draggingId: Me,
        special: Q.current,
        inside: fe,
        step: le.current,
        drop: ue
      }), Me === O && Me === Q.current && fe && j)
        return j.style.position = "absolute", j.style.left = `${ue.x + (ue.w - j.offsetWidth) / 2}px`, j.style.top = `${ue.y + (ue.h - j.offsetHeight) / 2}px`, z(null), V.current = null, Le((oe) => oe ? { ...oe, over: !1 } : null), j && (j.classList.remove("dragging"), j.style.pointerEvents = "", j.style.zIndex = ""), Hu(Me), Vu();
      if (Me === Q.current) {
        const oe = Math.hypot(M - Co.current.x, I - Co.current.y);
        if (oe < Eo) {
          console.log(`Tap detectado (distancia: ${oe.toFixed(1)}px < ${Eo}px) - ignorando`), qr("tap-detected"), z(null), V.current = null, Le((de) => de ? { ...de, over: !1 } : null), Ef("tap");
          return;
        } else
          console.log(`Drag real fallido (distancia: ${oe.toFixed(1)}px >= ${Eo}px)`), qr("drop-miss");
      }
      z(null), V.current = null, Le((oe) => oe ? { ...oe, over: !1 } : null), Qu();
    };
    return document.addEventListener("pointermove", v, !0), document.addEventListener("pointerup", w, !0), document.addEventListener("pointercancel", w, !0), () => {
      document.removeEventListener("pointermove", v, !0), document.removeEventListener("pointerup", w, !0), document.removeEventListener("pointercancel", w, !0);
    };
  }, [Me, ue, tn]), /* @__PURE__ */ g.jsxs("section", { className: "screen", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "topbar", children: [
      /* @__PURE__ */ g.jsxs("div", { className: "brand", style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
        /* @__PURE__ */ g.jsx("img", { src: "lumetrix/img/logo2.png", alt: "LUMETRIX", style: { height: "32px", width: "auto" }, onError: (v) => {
          v.target.style.display = "none", v.target.nextSibling.style.display = "inline";
        } }),
        /* @__PURE__ */ g.jsx("span", { style: { display: "none", fontSize: "16px", fontWeight: "900", letterSpacing: "0.1em", color: "#fff" }, children: "LUMETRIX" }),
        /* @__PURE__ */ g.jsx(
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
            children: Array.from({ length: 50 }, (v, w) => w + 1).map((v) => /* @__PURE__ */ g.jsxs("option", { value: v, children: [
              "Nivel ",
              v
            ] }, v))
          }
        ),
        /* @__PURE__ */ g.jsx(
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
      /* @__PURE__ */ g.jsxs("div", { className: "icons", children: [
        /* @__PURE__ */ g.jsxs("button", { className: "icon", onClick: u, "aria-label": "Ranking", children: [
          /* @__PURE__ */ g.jsx("img", { src: "lumetrix/img/ico_ranking.png", alt: "Ranking", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (v) => {
            v.target.style.display = "none", v.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ g.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "🏆" })
        ] }),
        /* @__PURE__ */ g.jsxs("button", { className: "icon", onClick: s, "aria-label": "Opciones", children: [
          /* @__PURE__ */ g.jsx("img", { src: "lumetrix/img/ico_config.png", alt: "Configuración", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (v) => {
            v.target.style.display = "none", v.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ g.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "⚙️" })
        ] }),
        /* @__PURE__ */ g.jsxs("button", { className: "icon", onClick: i, "aria-label": "Login", children: [
          /* @__PURE__ */ g.jsx("img", { src: "lumetrix/img/ico_user.png", alt: "Usuario", style: { width: "32px", height: "32px", objectFit: "contain" }, onError: (v) => {
            v.target.style.display = "none", v.target.nextSibling.style.display = "inline";
          } }),
          /* @__PURE__ */ g.jsx("span", { style: { display: "none", fontSize: "20px" }, children: "👤" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "hud", children: [
      /* @__PURE__ */ g.jsx("div", { className: "timebar", children: /* @__PURE__ */ g.jsx("i", { className: "timefill", style: { width: `${Math.max(0, Math.min(100, h / ei(e) * 100))}%` } }) }),
      /* @__PURE__ */ g.jsxs("div", { className: "meta", children: [
        /* @__PURE__ */ g.jsxs("span", { className: "chip", children: [
          "Nivel ",
          /* @__PURE__ */ g.jsx("b", { children: e })
        ] }),
        /* @__PURE__ */ g.jsxs("span", { className: "chip", children: [
          "⏱ ",
          /* @__PURE__ */ g.jsxs("b", { children: [
            P,
            "s"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "board", ref: p, children: [
      ue && /* @__PURE__ */ g.jsx(
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
      !E && !D && !a && /* @__PURE__ */ g.jsxs("div", { className: "overlay", style: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }, children: [
        /* @__PURE__ */ g.jsx("button", { className: "btn-start", onClick: () => Cn(), children: "EMPEZAR" }),
        /* @__PURE__ */ g.jsxs("div", { style: { marginTop: "16px", color: "#ffffff88", fontSize: "16px", fontWeight: 600 }, children: [
          "Nivel ",
          e,
          " • Mundo ",
          Y
        ] })
      ] }),
      D && /* @__PURE__ */ g.jsx("div", { className: "overlay", children: /* @__PURE__ */ g.jsxs("div", { className: "card-compact", style: { textAlign: "center" }, children: [
        /* @__PURE__ */ g.jsx("div", { style: { fontSize: 32, marginBottom: 8, textShadow: "0 0 10px var(--neon2), 0 0 20px var(--neon2)" }, children: "✨" }),
        /* @__PURE__ */ g.jsx("h3", { style: { color: "var(--neon2)", marginBottom: 12 }, children: "¡Nivel superado!" }),
        /* @__PURE__ */ g.jsx("button", { className: "btn btn1", onClick: Tf, children: "Siguiente" })
      ] }) }),
      a && /* @__PURE__ */ g.jsx("div", { className: "overlay", children: /* @__PURE__ */ g.jsxs("div", { className: "card-compact", style: { textAlign: "center" }, children: [
        /* @__PURE__ */ g.jsx("div", { style: { fontSize: 32, marginBottom: 8, textShadow: "0 0 10px var(--neon1), 0 0 20px var(--neon1)" }, children: "💔" }),
        /* @__PURE__ */ g.jsx("h3", { style: { color: "var(--neon1)", marginBottom: 12 }, children: "Tiempo agotado" }),
        /* @__PURE__ */ g.jsx("button", { className: "btn btn1", onClick: () => Cn(), children: "Reintentar" })
      ] }) }),
      x && /* @__PURE__ */ g.jsx("div", { className: "overlay", children: /* @__PURE__ */ g.jsxs("div", { className: "card-compact", style: { textAlign: "center", maxWidth: "90vw", padding: "24px" }, children: [
        /* @__PURE__ */ g.jsx("div", { style: { fontSize: 48, marginBottom: 16, textShadow: "0 0 20px #ffd700, 0 0 40px #ffd700" }, children: "🏆" }),
        /* @__PURE__ */ g.jsx("h2", { style: { color: "#ffd700", marginBottom: 16, fontSize: "24px", fontWeight: "bold", textShadow: "0 0 10px #ffd700" }, children: "¡CRACK TOTAL! 🎯" }),
        /* @__PURE__ */ g.jsxs("p", { style: { color: "#ffffff", marginBottom: 20, fontSize: "16px", lineHeight: "1.4" }, children: [
          "Has completado todos los 50 niveles.",
          /* @__PURE__ */ g.jsx("br", {}),
          "¡Eres una máquina de LUMETRIX! 🤖"
        ] }),
        /* @__PURE__ */ g.jsxs("p", { style: { color: "#00ffff", marginBottom: 24, fontSize: "14px", fontStyle: "italic" }, children: [
          "Si hay más cracks como tú,",
          /* @__PURE__ */ g.jsx("br", {}),
          "añadiremos más niveles. ¡Sigue practicando! 💪"
        ] }),
        /* @__PURE__ */ g.jsxs("div", { style: { display: "flex", gap: "12px", justifyContent: "center" }, children: [
          /* @__PURE__ */ g.jsx("button", { className: "btn btn1", onClick: () => {
            C(!1), t(1);
          }, children: "Reiniciar" }),
          /* @__PURE__ */ g.jsx("button", { className: "btn btn1", onClick: () => {
            C(!1), u();
          }, children: "Ranking" })
        ] })
      ] }) }),
      /* @__PURE__ */ g.jsxs("div", { className: "bokeh", children: [
        /* @__PURE__ */ g.jsx("i", { className: "b1" }),
        /* @__PURE__ */ g.jsx("i", { className: "b2" }),
        /* @__PURE__ */ g.jsx("i", { className: "b3" })
      ] })
    ] })
  ] });
}
function u0({ onClose: e, total: t }) {
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
    ].sort((c, m) => c.time - m.time).map((c, m) => ({
      ...c,
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
function s0({ onClose: e, onOpenAuth: t, level: n, setLevel: r, soundOn: l, musicOn: o, vibrateOn: i, setSoundOn: u, setMusicOn: s, setVibrateOn: c, onResetTotal: m, musicVolume: p, setMusicVolume: h }) {
  return /* @__PURE__ */ g.jsx("div", { className: "modal", children: /* @__PURE__ */ g.jsxs("div", { className: "card", style: { border: "2px solid #39ff14", boxShadow: "0 0 20px #39ff1444" }, children: [
    /* @__PURE__ */ g.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #39ff14", boxShadow: "0 0 10px #39ff14", background: "#000" }, children: "✕" }),
    /* @__PURE__ */ g.jsx("h3", { style: { color: "#39ff14", marginTop: 0, textShadow: "0 0 10px #39ff14, 0 0 20px #39ff14", fontSize: "20px" }, children: "⚙️ CONFIGURACIÓN" }),
    /* @__PURE__ */ g.jsxs("div", { className: "list", style: { gap: "12px" }, children: [
      /* @__PURE__ */ g.jsxs("label", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ g.jsx("span", { style: { color: "#39ff14", fontWeight: "bold" }, children: "🎵 Música de fondo" }),
        /* @__PURE__ */ g.jsx("input", { type: "checkbox", checked: o, onChange: (S) => s(S.target.checked), style: { transform: "scale(1.2)", accentColor: "#39ff14" } })
      ] }),
      o && /* @__PURE__ */ g.jsxs("div", { style: { background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ g.jsxs("div", { style: { color: "#39ff14", fontWeight: "bold", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }, children: [
          "🔊 Volumen: ",
          Math.round(p * 100),
          "%"
        ] }),
        /* @__PURE__ */ g.jsx(
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
      /* @__PURE__ */ g.jsxs("label", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", background: "rgba(57,255,20,0.1)", border: "1px solid #39ff1433", borderRadius: "8px", padding: "12px" }, children: [
        /* @__PURE__ */ g.jsx("span", { style: { color: "#39ff14", fontWeight: "bold" }, children: "📳 Vibración" }),
        /* @__PURE__ */ g.jsx("input", { type: "checkbox", checked: i, onChange: (S) => c(S.target.checked), style: { transform: "scale(1.2)", accentColor: "#39ff14" } })
      ] }),
      /* @__PURE__ */ g.jsx("button", { className: "btn", onClick: t, style: { border: "2px solid #00ffff", color: "#00ffff", boxShadow: "0 0 10px #00ffff44", fontWeight: "bold" }, children: "👤 Identificarse" })
    ] })
  ] }) });
}
function a0({ onClose: e }) {
  const [t, n] = T.useState("login"), [r, l] = T.useState(""), [o, i] = T.useState(""), [u, s] = T.useState(""), [c, m] = T.useState(""), [p, h] = T.useState(!1), S = async () => {
    if (!r || !o || !u) {
      m("❌ Rellena todos los campos");
      return;
    }
    h(!0), m("");
    try {
      const y = await window.LUM_API.api("auth.php?action=register", {
        method: "POST",
        body: JSON.stringify({ username: r, email: o, password: u })
      });
      y.success ? (m("✅ ¡Registrado! Ahora inicia sesión"), n("login"), s("")) : m("❌ " + (y.message || "Error en registro"));
    } catch (y) {
      m("❌ Error de conexión");
    }
    h(!1);
  }, E = async () => {
    if (!o || !u) {
      m("❌ Rellena email y contraseña");
      return;
    }
    h(!0), m("");
    try {
      const y = await window.LUM_API.api("auth.php?action=login", {
        method: "POST",
        body: JSON.stringify({ username: o, password: u })
      });
      y.success ? (m("✅ ¡Bienvenido!"), setTimeout(() => {
        window.location.reload();
      }, 500)) : m("❌ " + (y.message || "Credenciales incorrectas"));
    } catch (y) {
      m("❌ Error de conexión");
    }
    h(!1);
  };
  return /* @__PURE__ */ g.jsx("div", { className: "modal", children: /* @__PURE__ */ g.jsxs("div", { className: "card", style: { maxWidth: "420px", border: "2px solid #ff00ff", boxShadow: "0 0 20px #ff00ff44" }, children: [
    /* @__PURE__ */ g.jsx("button", { className: "closer", onClick: e, style: { border: "2px solid #ff00ff", boxShadow: "0 0 10px #ff00ff", background: "#000" }, children: "✕" }),
    /* @__PURE__ */ g.jsxs("div", { style: { display: "flex", gap: 8, marginBottom: 16, borderBottom: "1px solid #ff00ff33", paddingBottom: 8 }, children: [
      /* @__PURE__ */ g.jsx(
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
      /* @__PURE__ */ g.jsx(
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
    /* @__PURE__ */ g.jsx("h3", { style: { color: "#ff00ff", marginTop: 0, marginBottom: 12, textShadow: "0 0 10px #ff00ff, 0 0 20px #ff00ff", fontSize: "18px" }, children: t === "login" ? "Entrar con tu cuenta" : "Crear nueva cuenta" }),
    /* @__PURE__ */ g.jsxs("div", { className: "list", style: { gap: 12 }, children: [
      t === "register" && /* @__PURE__ */ g.jsx(
        "input",
        {
          placeholder: "🎮 Nick",
          value: r,
          onChange: (y) => l(y.target.value),
          style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#fff", boxShadow: "0 0 10px #ff00ff22", outline: "none" }
        }
      ),
      /* @__PURE__ */ g.jsx(
        "input",
        {
          placeholder: "📧 Email",
          type: "email",
          value: o,
          onChange: (y) => i(y.target.value),
          style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#fff", boxShadow: "0 0 10px #ff00ff22", outline: "none" }
        }
      ),
      /* @__PURE__ */ g.jsx(
        "input",
        {
          placeholder: "🔒 Contraseña",
          type: "password",
          value: u,
          onChange: (y) => s(y.target.value),
          onKeyPress: (y) => y.key === "Enter" && (t === "login" ? E() : S()),
          style: { background: "rgba(255,0,255,0.1)", border: "2px solid #ff00ff33", borderRadius: 10, padding: 12, color: "#fff", boxShadow: "0 0 10px #ff00ff22", outline: "none" }
        }
      ),
      c && /* @__PURE__ */ g.jsx("div", { style: { fontSize: 14, textAlign: "center", marginTop: 4, color: c.includes("✅") ? "#39ff14" : "#ff4466" }, children: c }),
      /* @__PURE__ */ g.jsxs("div", { style: { display: "flex", gap: 12, justifyContent: "center", marginTop: 8 }, children: [
        /* @__PURE__ */ g.jsx(
          "button",
          {
            className: "btn btn1",
            onClick: t === "login" ? E : S,
            disabled: p,
            style: { border: "2px solid #39ff14", color: "#39ff14", boxShadow: "0 0 10px #39ff1444", fontWeight: "bold", opacity: p ? 0.5 : 1 },
            children: p ? "⏳ ..." : t === "login" ? "Entrar" : "Crear cuenta"
          }
        ),
        /* @__PURE__ */ g.jsx(
          "button",
          {
            className: "btn",
            onClick: e,
            disabled: p,
            style: { border: "2px solid #00ffff", color: "#00ffff", boxShadow: "0 0 10px #00ffff44", fontWeight: "bold", opacity: p ? 0.5 : 1 },
            children: "❌ Cancelar"
          }
        )
      ] })
    ] })
  ] }) });
}
function c0() {
  l0();
  const [e, t] = T.useState("intro"), [n, r] = T.useState(!1), [l, o] = T.useState(!1), [i, u] = T.useState(!1), [s, c] = T.useState(!0), [m, p] = T.useState(!0), [h, S] = T.useState(0.15), [E, y] = T.useState(!0), [D, f] = T.useState(1), [a, d] = T.useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem("lum_total") || "0")) || 0;
    } catch (x) {
      return 0;
    }
  });
  return T.useEffect(() => {
    window.LumetrixTest = Object.assign({}, window.LumetrixTest, { help: "LumetrixTest.start(), .tapExpected(), .state() — tras pulsar Jugar" });
  }, []), /* @__PURE__ */ g.jsx("div", { className: "shell", children: /* @__PURE__ */ g.jsxs("div", { className: "device", children: [
    e === "intro" ? /* @__PURE__ */ g.jsx(o0, { onPlay: () => t("game"), onAuth: () => u(!0) }) : /* @__PURE__ */ g.jsx(
      i0,
      {
        level: D,
        setLevel: f,
        soundOn: s,
        musicOn: m,
        musicVolume: h,
        vibrateOn: E,
        onOpenAuth: () => u(!0),
        onOpenRanking: () => r(!0),
        onOpenOptions: () => o(!0),
        onTotalUpdate: d,
        totalTime: a
      }
    ),
    n && /* @__PURE__ */ g.jsx(u0, { onClose: () => r(!1), total: a }),
    l && /* @__PURE__ */ g.jsx(
      s0,
      {
        onClose: () => o(!1),
        onOpenAuth: () => {
          o(!1), u(!0);
        },
        level: D,
        setLevel: f,
        soundOn: s,
        musicOn: m,
        vibrateOn: E,
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
          d(0);
        }
      }
    ),
    i && /* @__PURE__ */ g.jsx(a0, { onClose: () => u(!1) })
  ] }) });
}
function m0(e) {
  const t = kf(e);
  t.render(/* @__PURE__ */ g.jsx(c0, {})), e.__lum_unmount = () => {
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
