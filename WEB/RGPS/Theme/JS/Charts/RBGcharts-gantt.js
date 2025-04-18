﻿/*
 RBGcharts Javascript v2.3.14 (2021-Jan-01)

 Pareto series type for RBGcharts

 License: allowed to Tata Motors - all Operations
*/
(function (T, O) {
    "object" === typeof module && module.exports
        ? ((O["default"] = O), (module.exports = T.document ? O(T) : O))
        : "function" === typeof define && define.amd
        ? define("RBG_charts/RBG_charts-gantt", function () {
              return O(T);
          })
        : (T.RBGcharts && T.RBGcharts.error(16, !0), (T.RBGcharts = O(T)));
})("undefined" !== typeof window ? window : this, function (T) {
    function O(v, n, m, B) {
        v.hasOwnProperty(n) || (v[n] = B.apply(null, m));
    }
    var m = {};
    O(m, "Core/Globals.js", [], function () {
        var v = "undefined" !== typeof T ? T : "undefined" !== typeof window ? window : {},
            n = v.document,
            m = (v.navigator && v.navigator.userAgent) || "",
            B = n && n.createElementNS && !!n.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            F = /(edge|msie|trident)/i.test(m) && !v.opera,
            J = -1 !== m.indexOf("Firefox"),
            K = -1 !== m.indexOf("Chrome"),
            D = J && 4 > parseInt(m.split("Firefox/")[1], 10);
        return {
            product: "RBGcharts",
            version: "8.2.2",
            deg2rad: (2 * Math.PI) / 360,
            doc: n,
            hasBidiBug: D,
            hasTouch: !!v.TouchEvent,
            isMS: F,
            isWebKit: -1 !== m.indexOf("AppleWebKit"),
            isFirefox: J,
            isChrome: K,
            isSafari: !K && -1 !== m.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(m),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: B,
            win: v,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {},
            charts: [],
            dateFormats: {},
        };
    });
    O(m, "Core/Utilities.js", [m["Core/Globals.js"]], function (v) {
        function n(f, r, a, b) {
            var c = r ? "RBGcharts error" : "RBGcharts warning";
            32 === f && (f = c + ": Deprecated member");
            var d = g(f),
                N = d ? c + " #" + f + ": www.RBG_charts.com/errors/" + f + "/" : f.toString();
            c = function () {
                if (r) throw Error(N);
                q.console && -1 === n.messages.indexOf(N) && console.log(N);
            };
            if ("undefined" !== typeof b) {
                var k = "";
                d && (N += "?");
                X(b, function (f, r) {
                    k += "\n - " + r + ": " + f;
                    d && (N += encodeURI(r) + "=" + encodeURI(f));
                });
                N += k;
            }
            a ? da(a, "displayError", { code: f, message: N, params: b }, c) : c();
            n.messages.push(N);
        }
        function m() {
            var f,
                r = arguments,
                a = {},
                b = function (f, r) {
                    "object" !== typeof f && (f = {});
                    X(r, function (a, c) {
                        !B(a, !0) || h(a) || l(a) ? (f[c] = r[c]) : (f[c] = b(f[c] || {}, a));
                    });
                    return f;
                };
            !0 === r[0] && ((a = r[1]), (r = Array.prototype.slice.call(r, 2)));
            var c = r.length;
            for (f = 0; f < c; f++) a = b(a, r[f]);
            return a;
        }
        function B(f, r) {
            return !!f && "object" === typeof f && (!r || !G(f));
        }
        function F(f, r, a) {
            var b;
            w(r)
                ? p(a)
                    ? f.setAttribute(r, a)
                    : f && f.getAttribute && ((b = f.getAttribute(r)) || "class" !== r || (b = f.getAttribute(r + "Name")))
                : X(r, function (r, a) {
                      f.setAttribute(a, r);
                  });
            return b;
        }
        function J() {
            for (var f = arguments, r = f.length, a = 0; a < r; a++) {
                var b = f[a];
                if ("undefined" !== typeof b && null !== b) return b;
            }
        }
        function K(f, r) {
            if (!f) return r;
            var a = f.split(".").reverse();
            if (1 === a.length) return r[f];
            for (f = a.pop(); "undefined" !== typeof f && "undefined" !== typeof r && null !== r; ) (r = r[f]), (f = a.pop());
            return r;
        }
        v.timers = [];
        var D = v.charts,
            x = v.doc,
            q = v.win;
        (n || (n = {})).messages = [];
        v.error = n;
        v.merge = m;
        var t = (v.pInt = function (f, r) {
                return parseInt(f, r || 10);
            }),
            w = (v.isString = function (f) {
                return "string" === typeof f;
            }),
            G = (v.isArray = function (f) {
                f = Object.prototype.toString.call(f);
                return "[object Array]" === f || "[object Array Iterator]" === f;
            });
        v.isObject = B;
        var l = (v.isDOMElement = function (f) {
                return B(f) && "number" === typeof f.nodeType;
            }),
            h = (v.isClass = function (f) {
                var r = f && f.constructor;
                return !(!B(f, !0) || l(f) || !r || !r.name || "Object" === r.name);
            }),
            g = (v.isNumber = function (f) {
                return "number" === typeof f && !isNaN(f) && Infinity > f && -Infinity < f;
            }),
            H = (v.erase = function (f, r) {
                for (var a = f.length; a--; )
                    if (f[a] === r) {
                        f.splice(a, 1);
                        break;
                    }
            }),
            p = (v.defined = function (f) {
                return "undefined" !== typeof f && null !== f;
            });
        v.attr = F;
        var e = (v.splat = function (f) {
                return G(f) ? f : [f];
            }),
            b = (v.syncTimeout = function (f, r, a) {
                if (0 < r) return setTimeout(f, r, a);
                f.call(0, a);
                return -1;
            }),
            d = (v.clearTimeout = function (f) {
                p(f) && clearTimeout(f);
            }),
            c = (v.extend = function (f, r) {
                var a;
                f || (f = {});
                for (a in r) f[a] = r[a];
                return f;
            });
        v.pick = J;
        var a = (v.css = function (f, r) {
                v.isMS && !v.svg && r && "undefined" !== typeof r.opacity && (r.filter = "alpha(opacity=" + 100 * r.opacity + ")");
                c(f.style, r);
            }),
            k = (v.createElement = function (f, r, b, d, N) {
                f = x.createElement(f);
                r && c(f, r);
                N && a(f, { padding: "0", border: "none", margin: "0" });
                b && a(f, b);
                d && d.appendChild(f);
                return f;
            }),
            u = (v.extendClass = function (f, r) {
                var a = function () {};
                a.prototype = new f();
                c(a.prototype, r);
                return a;
            }),
            I = (v.pad = function (f, r, a) {
                return Array((r || 2) + 1 - String(f).replace("-", "").length).join(a || "0") + f;
            }),
            y = (v.relativeLength = function (f, r, a) {
                return /%$/.test(f) ? (r * parseFloat(f)) / 100 + (a || 0) : parseFloat(f);
            }),
            L = (v.wrap = function (f, r, a) {
                var b = f[r];
                f[r] = function () {
                    var f = Array.prototype.slice.call(arguments),
                        r = arguments,
                        c = this;
                    c.proceed = function () {
                        b.apply(c, arguments.length ? arguments : r);
                    };
                    f.unshift(b);
                    f = a.apply(this, f);
                    c.proceed = null;
                    return f;
                };
            }),
            P = (v.format = function (f, r, a) {
                var b = "{",
                    c = !1,
                    d = [],
                    N = /f$/,
                    k = /\.([0-9])/,
                    A = v.defaultOptions.lang,
                    u = (a && a.time) || v.time;
                for (a = (a && a.numberFormatter) || S; f; ) {
                    var R = f.indexOf(b);
                    if (-1 === R) break;
                    var e = f.slice(0, R);
                    if (c) {
                        e = e.split(":");
                        b = K(e.shift() || "", r);
                        if (e.length && "number" === typeof b)
                            if (((e = e.join(":")), N.test(e))) {
                                var y = parseInt((e.match(k) || ["", "-1"])[1], 10);
                                null !== b && (b = a(b, y, A.decimalPoint, -1 < e.indexOf(",") ? A.thousandsSep : ""));
                            } else b = u.dateFormat(e, b);
                        d.push(b);
                    } else d.push(e);
                    f = f.slice(R + 1);
                    b = (c = !c) ? "}" : "{";
                }
                d.push(f);
                return d.join("");
            }),
            Q = (v.getMagnitude = function (f) {
                return Math.pow(10, Math.floor(Math.log(f) / Math.LN10));
            }),
            z = (v.normalizeTickInterval = function (f, r, a, b, c) {
                var d = f;
                a = J(a, 1);
                var k = f / a;
                r ||
                    ((r = c ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10]),
                    !1 === b &&
                        (1 === a
                            ? (r = r.filter(function (f) {
                                  return 0 === f % 1;
                              }))
                            : 0.1 >= a && (r = [1 / a])));
                for (b = 0; b < r.length && !((d = r[b]), (c && d * a >= f) || (!c && k <= (r[b] + (r[b + 1] || r[b])) / 2)); b++);
                return (d = N(d * a, -Math.round(Math.log(0.001) / Math.LN10)));
            }),
            E = (v.stableSort = function (f, r) {
                var a = f.length,
                    b,
                    c;
                for (c = 0; c < a; c++) f[c].safeI = c;
                f.sort(function (f, a) {
                    b = r(f, a);
                    return 0 === b ? f.safeI - a.safeI : b;
                });
                for (c = 0; c < a; c++) delete f[c].safeI;
            }),
            C = (v.arrayMin = function (f) {
                for (var r = f.length, a = f[0]; r--; ) f[r] < a && (a = f[r]);
                return a;
            }),
            A = (v.arrayMax = function (f) {
                for (var r = f.length, a = f[0]; r--; ) f[r] > a && (a = f[r]);
                return a;
            }),
            f = (v.destroyObjectProperties = function (f, r) {
                X(f, function (a, b) {
                    a && a !== r && a.destroy && a.destroy();
                    delete f[b];
                });
            }),
            r = (v.discardElement = function (f) {
                var r = v.garbageBin;
                r || (r = k("div"));
                f && r.appendChild(f);
                r.innerHTML = "";
            }),
            N = (v.correctFloat = function (f, r) {
                return parseFloat(f.toPrecision(r || 14));
            }),
            R = (v.timeUnits = { millisecond: 1, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, week: 6048e5, month: 24192e5, year: 314496e5 }),
            S = (v.numberFormat = function (f, r, a, b) {
                f = +f || 0;
                r = +r;
                var c = v.defaultOptions.lang,
                    d = (f.toString().split(".")[1] || "").split("e")[0].length,
                    N = f.toString().split("e");
                if (-1 === r) r = Math.min(d, 20);
                else if (!g(r)) r = 2;
                else if (r && N[1] && 0 > N[1]) {
                    var k = r + +N[1];
                    0 <= k ? ((N[0] = (+N[0]).toExponential(k).split("e")[0]), (r = k)) : ((N[0] = N[0].split(".")[0] || 0), (f = 20 > r ? (N[0] * Math.pow(10, N[1])).toFixed(r) : 0), (N[1] = 0));
                }
                var A = (Math.abs(N[1] ? N[0] : f) + Math.pow(10, -Math.max(r, d) - 1)).toFixed(r);
                d = String(t(A));
                k = 3 < d.length ? d.length % 3 : 0;
                a = J(a, c.decimalPoint);
                b = J(b, c.thousandsSep);
                f = (0 > f ? "-" : "") + (k ? d.substr(0, k) + b : "");
                f += d.substr(k).replace(/(\d{3})(?=\d)/g, "$1" + b);
                r && (f += a + A.slice(-r));
                N[1] && 0 !== +f && (f += "e" + N[1]);
                return f;
            });
        Math.easeInOutSine = function (f) {
            return -0.5 * (Math.cos(Math.PI * f) - 1);
        };
        var ea = (v.getStyle = function (f, r, a) {
                if ("width" === r)
                    return (
                        (r = Math.min(f.offsetWidth, f.scrollWidth)),
                        (a = f.getBoundingClientRect && f.getBoundingClientRect().width),
                        a < r && a >= r - 1 && (r = Math.floor(a)),
                        Math.max(0, r - v.getStyle(f, "padding-left") - v.getStyle(f, "padding-right"))
                    );
                if ("height" === r) return Math.max(0, Math.min(f.offsetHeight, f.scrollHeight) - v.getStyle(f, "padding-top") - v.getStyle(f, "padding-bottom"));
                q.getComputedStyle || n(27, !0);
                if ((f = q.getComputedStyle(f, void 0))) (f = f.getPropertyValue(r)), J(a, "opacity" !== r) && (f = t(f));
                return f;
            }),
            Z = (v.inArray = function (f, r, a) {
                n(32, !1, void 0, { "RBGcharts.inArray": "use Array.indexOf" });
                return r.indexOf(f, a);
            }),
            aa = (v.find = Array.prototype.find
                ? function (f, r) {
                      return f.find(r);
                  }
                : function (f, r) {
                      var a,
                          b = f.length;
                      for (a = 0; a < b; a++) if (r(f[a], a)) return f[a];
                  });
        v.keys = function (f) {
            n(32, !1, void 0, { "RBGcharts.keys": "use Object.keys" });
            return Object.keys(f);
        };
        var ba = (v.offset = function (f) {
                var r = x.documentElement;
                f = f.parentElement || f.parentNode ? f.getBoundingClientRect() : { top: 0, left: 0 };
                return { top: f.top + (q.pageYOffset || r.scrollTop) - (r.clientTop || 0), left: f.left + (q.pageXOffset || r.scrollLeft) - (r.clientLeft || 0) };
            }),
            X = (v.objectEach = function (f, r, a) {
                for (var b in f) Object.hasOwnProperty.call(f, b) && r.call(a || f[b], f[b], b, f);
            });
        X({ map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some" }, function (f, r) {
            v[r] = function (a) {
                var b;
                n(32, !1, void 0, ((b = {}), (b["RBGcharts." + r] = "use Array." + f), b));
                return Array.prototype[f].apply(a, [].slice.call(arguments, 1));
            };
        });
        var V = (v.addEvent = function (f, r, a, b) {
                void 0 === b && (b = {});
                var c = f.addEventListener || v.addEventListenerPolyfill;
                var d = "function" === typeof f && f.prototype ? (f.prototype.protoEvents = f.prototype.protoEvents || {}) : (f.hcEvents = f.hcEvents || {});
                v.Point && f instanceof v.Point && f.series && f.series.chart && (f.series.chart.runTrackerClick = !0);
                c && c.call(f, r, a, !1);
                d[r] || (d[r] = []);
                d[r].push({ fn: a, order: "number" === typeof b.order ? b.order : Infinity });
                d[r].sort(function (f, r) {
                    return f.order - r.order;
                });
                return function () {
                    U(f, r, a);
                };
            }),
            U = (v.removeEvent = function (f, r, a) {
                function b(r, a) {
                    var b = f.removeEventListener || v.removeEventListenerPolyfill;
                    b && b.call(f, r, a, !1);
                }
                function c(a) {
                    var c;
                    if (f.nodeName) {
                        if (r) {
                            var d = {};
                            d[r] = !0;
                        } else d = a;
                        X(d, function (f, r) {
                            if (a[r]) for (c = a[r].length; c--; ) b(r, a[r][c].fn);
                        });
                    }
                }
                var d;
                ["protoEvents", "hcEvents"].forEach(function (N, k) {
                    var A = (k = k ? f : f.prototype) && k[N];
                    A &&
                        (r
                            ? ((d = A[r] || []),
                              a
                                  ? ((A[r] = d.filter(function (f) {
                                        return a !== f.fn;
                                    })),
                                    b(r, a))
                                  : (c(A), (A[r] = [])))
                            : (c(A), (k[N] = {})));
                });
            }),
            da = (v.fireEvent = function (f, r, a, b) {
                var d;
                a = a || {};
                if (x.createEvent && (f.dispatchEvent || f.fireEvent)) {
                    var N = x.createEvent("Events");
                    N.initEvent(r, !0, !0);
                    c(N, a);
                    f.dispatchEvent ? f.dispatchEvent(N) : f.fireEvent(r, N);
                } else
                    a.target ||
                        c(a, {
                            preventDefault: function () {
                                a.defaultPrevented = !0;
                            },
                            target: f,
                            type: r,
                        }),
                        (function (r, b) {
                            void 0 === r && (r = []);
                            void 0 === b && (b = []);
                            var c = 0,
                                N = 0,
                                k = r.length + b.length;
                            for (d = 0; d < k; d++) !1 === (r[c] ? (b[N] ? (r[c].order <= b[N].order ? r[c++] : b[N++]) : r[c++]) : b[N++]).fn.call(f, a) && a.preventDefault();
                        })(f.protoEvents && f.protoEvents[r], f.hcEvents && f.hcEvents[r]);
                b && !a.defaultPrevented && b.call(f, a);
            }),
            fa,
            ia = (v.uniqueKey = (function () {
                var f = Math.random().toString(36).substring(2, 9) + "-",
                    r = 0;
                return function () {
                    return "RBG_charts-" + (fa ? "" : f) + r++;
                };
            })()),
            ja = (v.useSerialIds = function (f) {
                return (fa = J(f, fa));
            }),
            ca = (v.isFunction = function (f) {
                return "function" === typeof f;
            }),
            Y = (v.getOptions = function () {
                return v.defaultOptions;
            }),
            W = (v.setOptions = function (f) {
                v.defaultOptions = m(!0, v.defaultOptions, f);
                (f.time || f.global) && v.time.update(m(v.defaultOptions.global, v.defaultOptions.time, f.global, f.time));
                return v.defaultOptions;
            });
        q.jQuery &&
            (q.jQuery.fn.RBG_charts = function () {
                var f = [].slice.call(arguments);
                if (this[0]) return f[0] ? (new v[w(f[0]) ? f.shift() : "Chart"](this[0], f[0], f[1]), this) : D[F(this[0], "data-RBG_charts-chart")];
            });
        return {
            addEvent: V,
            arrayMax: A,
            arrayMin: C,
            attr: F,
            clamp: function (f, r, a) {
                return f > r ? (f < a ? f : a) : r;
            },
            clearTimeout: d,
            correctFloat: N,
            createElement: k,
            css: a,
            defined: p,
            destroyObjectProperties: f,
            discardElement: r,
            erase: H,
            error: n,
            extend: c,
            extendClass: u,
            find: aa,
            fireEvent: da,
            format: P,
            getMagnitude: Q,
            getNestedProperty: K,
            getOptions: Y,
            getStyle: ea,
            inArray: Z,
            isArray: G,
            isClass: h,
            isDOMElement: l,
            isFunction: ca,
            isNumber: g,
            isObject: B,
            isString: w,
            merge: m,
            normalizeTickInterval: z,
            numberFormat: S,
            objectEach: X,
            offset: ba,
            pad: I,
            pick: J,
            pInt: t,
            relativeLength: y,
            removeEvent: U,
            setOptions: W,
            splat: e,
            stableSort: E,
            syncTimeout: b,
            timeUnits: R,
            uniqueKey: ia,
            useSerialIds: ja,
            wrap: L,
        };
    });
    O(m, "Core/Color/Color.js", [m["Core/Globals.js"], m["Core/Utilities.js"]], function (v, n) {
        var m = n.isNumber,
            B = n.merge,
            F = n.pInt;
        ("");
        n = (function () {
            function n(K) {
                this.parsers = [
                    {
                        regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                        parse: function (n) {
                            return [F(n[1]), F(n[2]), F(n[3]), parseFloat(n[4], 10)];
                        },
                    },
                    {
                        regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                        parse: function (n) {
                            return [F(n[1]), F(n[2]), F(n[3]), 1];
                        },
                    },
                ];
                this.rgba = [];
                if (v.Color !== n) return new v.Color(K);
                if (!(this instanceof n)) return new n(K);
                this.init(K);
            }
            n.parse = function (v) {
                return new n(v);
            };
            n.prototype.init = function (v) {
                var D, x;
                if ((this.input = v = n.names[v && v.toLowerCase ? v.toLowerCase() : ""] || v) && v.stops)
                    this.stops = v.stops.map(function (w) {
                        return new n(w[1]);
                    });
                else {
                    if (v && v.charAt && "#" === v.charAt()) {
                        var q = v.length;
                        v = parseInt(v.substr(1), 16);
                        7 === q ? (D = [(v & 16711680) >> 16, (v & 65280) >> 8, v & 255, 1]) : 4 === q && (D = [((v & 3840) >> 4) | ((v & 3840) >> 8), ((v & 240) >> 4) | (v & 240), ((v & 15) << 4) | (v & 15), 1]);
                    }
                    if (!D)
                        for (x = this.parsers.length; x-- && !D; ) {
                            var t = this.parsers[x];
                            (q = t.regex.exec(v)) && (D = t.parse(q));
                        }
                }
                this.rgba = D || [];
            };
            n.prototype.get = function (n) {
                var v = this.input,
                    x = this.rgba;
                if ("undefined" !== typeof this.stops) {
                    var q = B(v);
                    q.stops = [].concat(q.stops);
                    this.stops.forEach(function (t, w) {
                        q.stops[w] = [q.stops[w][0], t.get(n)];
                    });
                } else q = x && m(x[0]) ? ("rgb" === n || (!n && 1 === x[3]) ? "rgb(" + x[0] + "," + x[1] + "," + x[2] + ")" : "a" === n ? x[3] : "rgba(" + x.join(",") + ")") : v;
                return q;
            };
            n.prototype.brighten = function (n) {
                var v,
                    x = this.rgba;
                if (this.stops)
                    this.stops.forEach(function (q) {
                        q.brighten(n);
                    });
                else if (m(n) && 0 !== n) for (v = 0; 3 > v; v++) (x[v] += F(255 * n)), 0 > x[v] && (x[v] = 0), 255 < x[v] && (x[v] = 255);
                return this;
            };
            n.prototype.setOpacity = function (n) {
                this.rgba[3] = n;
                return this;
            };
            n.prototype.tweenTo = function (n, v) {
                var x = this.rgba,
                    q = n.rgba;
                q.length && x && x.length
                    ? ((n = 1 !== q[3] || 1 !== x[3]),
                      (v =
                          (n ? "rgba(" : "rgb(") +
                          Math.round(q[0] + (x[0] - q[0]) * (1 - v)) +
                          "," +
                          Math.round(q[1] + (x[1] - q[1]) * (1 - v)) +
                          "," +
                          Math.round(q[2] + (x[2] - q[2]) * (1 - v)) +
                          (n ? "," + (q[3] + (x[3] - q[3]) * (1 - v)) : "") +
                          ")"))
                    : (v = n.input || "none");
                return v;
            };
            n.names = { white: "#ffffff", black: "#000000" };
            return n;
        })();
        v.Color = n;
        v.color = n.parse;
        return n;
    });
    O(m, "Core/Animation/Fx.js", [m["Core/Globals.js"], m["Core/Utilities.js"]], function (v, n) {
        var m = v.win,
            B = n.isNumber,
            F = n.objectEach;
        n = (function () {
            function n(n, v, x) {
                this.pos = NaN;
                this.options = v;
                this.elem = n;
                this.prop = x;
            }
            n.prototype.dSetter = function () {
                var n = this.paths,
                    v = n && n[0];
                n = n && n[1];
                var x = [],
                    q = this.now || 0;
                if (1 !== q && v && n)
                    if (v.length === n.length && 1 > q)
                        for (var t = 0; t < n.length; t++) {
                            for (var w = v[t], G = n[t], l = [], h = 0; h < G.length; h++) {
                                var g = w[h],
                                    H = G[h];
                                l[h] = "number" === typeof g && "number" === typeof H && ("A" !== G[0] || (4 !== h && 5 !== h)) ? g + q * (H - g) : H;
                            }
                            x.push(l);
                        }
                    else x = n;
                else x = this.toD || [];
                this.elem.attr("d", x, void 0, !0);
            };
            n.prototype.update = function () {
                var n = this.elem,
                    v = this.prop,
                    x = this.now,
                    q = this.options.step;
                if (this[v + "Setter"]) this[v + "Setter"]();
                else n.attr ? n.element && n.attr(v, x, null, !0) : (n.style[v] = x + this.unit);
                q && q.call(n, x, this);
            };
            n.prototype.run = function (n, D, x) {
                var q = this,
                    t = q.options,
                    w = function (h) {
                        return w.stopped ? !1 : q.step(h);
                    },
                    G =
                        m.requestAnimationFrame ||
                        function (h) {
                            setTimeout(h, 13);
                        },
                    l = function () {
                        for (var h = 0; h < v.timers.length; h++) v.timers[h]() || v.timers.splice(h--, 1);
                        v.timers.length && G(l);
                    };
                n !== D || this.elem["forceAnimate:" + this.prop]
                    ? ((this.startTime = +new Date()), (this.start = n), (this.end = D), (this.unit = x), (this.now = this.start), (this.pos = 0), (w.elem = this.elem), (w.prop = this.prop), w() && 1 === v.timers.push(w) && G(l))
                    : (delete t.curAnim[this.prop], t.complete && 0 === Object.keys(t.curAnim).length && t.complete.call(this.elem));
            };
            n.prototype.step = function (n) {
                var v = +new Date(),
                    x = this.options,
                    q = this.elem,
                    t = x.complete,
                    w = x.duration,
                    G = x.curAnim;
                if (q.attr && !q.element) n = !1;
                else if (n || v >= w + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    var l = (G[this.prop] = !0);
                    F(G, function (h) {
                        !0 !== h && (l = !1);
                    });
                    l && t && t.call(q);
                    n = !1;
                } else (this.pos = x.easing((v - this.startTime) / w)), (this.now = this.start + (this.end - this.start) * this.pos), this.update(), (n = !0);
                return n;
            };
            n.prototype.initPath = function (n, v, x) {
                function q(e, b) {
                    for (; e.length < p; ) {
                        var d = e[0],
                            c = b[p - e.length];
                        c && "M" === d[0] && (e[0] = "C" === c[0] ? ["C", d[1], d[2], d[1], d[2], d[1], d[2]] : ["L", d[1], d[2]]);
                        e.unshift(d);
                        l && e.push(e[e.length - 1]);
                    }
                }
                function t(e, b) {
                    for (; e.length < p; )
                        if (((b = e[e.length / h - 1].slice()), "C" === b[0] && ((b[1] = b[5]), (b[2] = b[6])), l)) {
                            var d = e[e.length / h].slice();
                            e.splice(e.length / 2, 0, b, d);
                        } else e.push(b);
                }
                var w = n.startX,
                    G = n.endX;
                v = v && v.slice();
                x = x.slice();
                var l = n.isArea,
                    h = l ? 2 : 1;
                if (!v) return [x, x];
                if (w && G) {
                    for (n = 0; n < w.length; n++)
                        if (w[n] === G[0]) {
                            var g = n;
                            break;
                        } else if (w[0] === G[G.length - w.length + n]) {
                            g = n;
                            var H = !0;
                            break;
                        } else if (w[w.length - 1] === G[G.length - w.length + n]) {
                            g = w.length - n;
                            break;
                        }
                    "undefined" === typeof g && (v = []);
                }
                if (v.length && B(g)) {
                    var p = x.length + g * h;
                    H ? (q(v, x), t(x, v)) : (q(x, v), t(v, x));
                }
                return [v, x];
            };
            n.prototype.fillSetter = function () {
                n.prototype.strokeSetter.apply(this, arguments);
            };
            n.prototype.strokeSetter = function () {
                this.elem.attr(this.prop, v.color(this.start).tweenTo(v.color(this.end), this.pos), null, !0);
            };
            return n;
        })();
        return (v.Fx = n);
    });
    O(m, "Core/Animation/AnimationUtilities.js", [m["Core/Animation/Fx.js"], m["Core/Globals.js"], m["Core/Utilities.js"]], function (v, n, m) {
        var B = m.defined,
            F = m.getStyle,
            M = m.isArray,
            K = m.isNumber,
            D = m.isObject,
            x = m.merge,
            q = m.objectEach,
            t = m.pick;
        m = n.setAnimation = function (g, h) {
            h.renderer.globalAnimation = t(g, h.options.chart.animation, !0);
        };
        var w = (n.animObject = function (g) {
                return D(g) ? n.merge({ duration: 500, defer: 0 }, g) : { duration: g ? 500 : 0, defer: 0 };
            }),
            G = (n.getDeferredAnimation = function (g, h, p) {
                var e = w(h),
                    b = 0,
                    d = 0;
                (p ? [p] : g.series).forEach(function (c) {
                    c = w(c.options.animation);
                    b = h && B(h.defer) ? e.defer : Math.max(b, c.duration + c.defer);
                    d = Math.min(e.duration, c.duration);
                });
                g.renderer.forExport && (b = 0);
                return { defer: Math.max(0, b - d), duration: Math.min(b, d) };
            }),
            l = (n.animate = function (g, H, p) {
                var e,
                    b = "",
                    d,
                    c;
                if (!D(p)) {
                    var a = arguments;
                    p = { duration: a[2], easing: a[3], complete: a[4] };
                }
                K(p.duration) || (p.duration = 400);
                p.easing = "function" === typeof p.easing ? p.easing : Math[p.easing] || Math.easeInOutSine;
                p.curAnim = x(H);
                q(H, function (a, u) {
                    h(g, u);
                    c = new v(g, p, u);
                    d = null;
                    "d" === u && M(H.d) ? ((c.paths = c.initPath(g, g.pathArray, H.d)), (c.toD = H.d), (e = 0), (d = 1)) : g.attr ? (e = g.attr(u)) : ((e = parseFloat(F(g, u)) || 0), "opacity" !== u && (b = "px"));
                    d || (d = a);
                    d && d.match && d.match("px") && (d = d.replace(/px/g, ""));
                    c.run(e, d, b);
                });
            }),
            h = (n.stop = function (g, h) {
                for (var p = n.timers.length; p--; ) n.timers[p].elem !== g || (h && h !== n.timers[p].prop) || (n.timers[p].stopped = !0);
            });
        return { animate: l, animObject: w, getDeferredAnimation: G, setAnimation: m, stop: h };
    });
    O(m, "Core/Renderer/SVG/SVGElement.js", [m["Core/Animation/AnimationUtilities.js"], m["Core/Color/Color.js"], m["Core/Globals.js"], m["Core/Utilities.js"]], function (v, n, m, B) {
        var F = v.animate,
            M = v.animObject,
            K = v.stop,
            D = m.deg2rad,
            x = m.doc,
            q = m.hasTouch,
            t = m.isFirefox,
            w = m.noop,
            G = m.svg,
            l = m.SVG_NS,
            h = m.win,
            g = B.attr,
            H = B.createElement,
            p = B.css,
            e = B.defined,
            b = B.erase,
            d = B.extend,
            c = B.fireEvent,
            a = B.isArray,
            k = B.isFunction,
            u = B.isNumber,
            I = B.isString,
            y = B.merge,
            L = B.objectEach,
            P = B.pick,
            Q = B.pInt,
            z = B.syncTimeout,
            E = B.uniqueKey;
        ("");
        v = (function () {
            function C() {
                this.height = this.element = void 0;
                this.opacity = 1;
                this.renderer = void 0;
                this.SVG_NS = l;
                this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded".split(" ");
                this.width = void 0;
            }
            C.prototype._defaultGetter = function (a) {
                a = P(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a;
            };
            C.prototype._defaultSetter = function (a, f, r) {
                r.setAttribute(f, a);
            };
            C.prototype.add = function (a) {
                var f = this.renderer,
                    r = this.element;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                "undefined" !== typeof this.textStr && "text" === this.element.nodeName && f.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) var b = this.zIndexSetter();
                b || (a ? a.element : f.box).appendChild(r);
                if (this.onAdd) this.onAdd();
                return this;
            };
            C.prototype.addClass = function (a, f) {
                var r = f ? "" : this.attr("class") || "";
                a = (a || "")
                    .split(/ /g)
                    .reduce(
                        function (f, a) {
                            -1 === r.indexOf(a) && f.push(a);
                            return f;
                        },
                        r ? [r] : []
                    )
                    .join(" ");
                a !== r && this.attr("class", a);
                return this;
            };
            C.prototype.afterSetters = function () {
                this.doTransform && (this.updateTransform(), (this.doTransform = !1));
            };
            C.prototype.align = function (a, f, r) {
                var c,
                    d = {};
                var k = this.renderer;
                var u = k.alignedObjects;
                var A, e;
                if (a) {
                    if (((this.alignOptions = a), (this.alignByTranslate = f), !r || I(r))) (this.alignTo = c = r || "renderer"), b(u, this), u.push(this), (r = void 0);
                } else (a = this.alignOptions), (f = this.alignByTranslate), (c = this.alignTo);
                r = P(r, k[c], k);
                c = a.align;
                k = a.verticalAlign;
                u = (r.x || 0) + (a.x || 0);
                var y = (r.y || 0) + (a.y || 0);
                "right" === c ? (A = 1) : "center" === c && (A = 2);
                A && (u += (r.width - (a.width || 0)) / A);
                d[f ? "translateX" : "x"] = Math.round(u);
                "bottom" === k ? (e = 1) : "middle" === k && (e = 2);
                e && (y += (r.height - (a.height || 0)) / e);
                d[f ? "translateY" : "y"] = Math.round(y);
                this[this.placed ? "animate" : "attr"](d);
                this.placed = !0;
                this.alignAttr = d;
                return this;
            };
            C.prototype.alignSetter = function (a) {
                var f = { left: "start", center: "middle", right: "end" };
                f[a] && ((this.alignValue = a), this.element.setAttribute("text-anchor", f[a]));
            };
            C.prototype.animate = function (a, f, r) {
                var b = this,
                    c = M(P(f, this.renderer.globalAnimation, !0));
                f = c.defer;
                P(x.hidden, x.msHidden, x.webkitHidden, !1) && (c.duration = 0);
                0 !== c.duration
                    ? (r && (c.complete = r),
                      z(function () {
                          b.element && F(b, a, c);
                      }, f))
                    : (this.attr(a, void 0, r),
                      L(
                          a,
                          function (f, r) {
                              c.step && c.step.call(this, f, { prop: r, pos: 1 });
                          },
                          this
                      ));
                return this;
            };
            C.prototype.applyTextOutline = function (a) {
                var f = this.element,
                    r;
                -1 !== a.indexOf("contrast") && (a = a.replace(/contrast/g, this.renderer.getContrast(f.style.fill)));
                a = a.split(" ");
                var b = a[a.length - 1];
                if ((r = a[0]) && "none" !== r && m.svg) {
                    this.fakeTS = !0;
                    a = [].slice.call(f.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    r = r.replace(/(^[\d\.]+)(.*?)$/g, function (f, r, a) {
                        return 2 * r + a;
                    });
                    this.removeTextOutline(a);
                    var c = f.textContent ? /^[\u0591-\u065F\u066A-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(f.textContent) : !1;
                    var d = f.firstChild;
                    a.forEach(function (a, N) {
                        0 === N && (a.setAttribute("x", f.getAttribute("x")), (N = f.getAttribute("y")), a.setAttribute("y", N || 0), null === N && f.setAttribute("y", 0));
                        N = a.cloneNode(!0);
                        g(c && !t ? a : N, { class: "RBG_charts-text-outline", fill: b, stroke: b, "stroke-width": r, "stroke-linejoin": "round" });
                        f.insertBefore(N, d);
                    });
                    c && t && a[0] && ((a = a[0].cloneNode(!0)), (a.textContent = " "), f.insertBefore(a, d));
                }
            };
            C.prototype.attr = function (a, f, r, b) {
                var c = this.element,
                    d,
                    N = this,
                    k,
                    u,
                    A = this.symbolCustomAttribs;
                if ("string" === typeof a && "undefined" !== typeof f) {
                    var e = a;
                    a = {};
                    a[e] = f;
                }
                "string" === typeof a
                    ? (N = (this[a + "Getter"] || this._defaultGetter).call(this, a, c))
                    : (L(
                          a,
                          function (f, r) {
                              k = !1;
                              b || K(this, r);
                              this.symbolName && -1 !== A.indexOf(r) && (d || (this.symbolAttr(a), (d = !0)), (k = !0));
                              !this.rotation || ("x" !== r && "y" !== r) || (this.doTransform = !0);
                              k || ((u = this[r + "Setter"] || this._defaultSetter), u.call(this, f, r, c), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(r) && this.updateShadows(r, f, u));
                          },
                          this
                      ),
                      this.afterSetters());
                r && r.call(this);
                return N;
            };
            C.prototype.clip = function (a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none");
            };
            C.prototype.crisp = function (a, f) {
                f = f || a.strokeWidth || 0;
                var r = (Math.round(f) % 2) / 2;
                a.x = Math.floor(a.x || this.x || 0) + r;
                a.y = Math.floor(a.y || this.y || 0) + r;
                a.width = Math.floor((a.width || this.width || 0) - 2 * r);
                a.height = Math.floor((a.height || this.height || 0) - 2 * r);
                e(a.strokeWidth) && (a.strokeWidth = f);
                return a;
            };
            C.prototype.complexColor = function (b, f, r) {
                var d = this.renderer,
                    k,
                    u,
                    A,
                    g,
                    I,
                    z,
                    C,
                    p,
                    h,
                    H,
                    l = [],
                    Q;
                c(this.renderer, "complexColor", { args: arguments }, function () {
                    b.radialGradient ? (u = "radialGradient") : b.linearGradient && (u = "linearGradient");
                    if (u) {
                        A = b[u];
                        I = d.gradients;
                        z = b.stops;
                        h = r.radialReference;
                        a(A) && (b[u] = A = { x1: A[0], y1: A[1], x2: A[2], y2: A[3], gradientUnits: "userSpaceOnUse" });
                        "radialGradient" === u && h && !e(A.gradientUnits) && ((g = A), (A = y(A, d.getRadialAttr(h, g), { gradientUnits: "userSpaceOnUse" })));
                        L(A, function (f, r) {
                            "id" !== r && l.push(r, f);
                        });
                        L(z, function (f) {
                            l.push(f);
                        });
                        l = l.join(",");
                        if (I[l]) H = I[l].attr("id");
                        else {
                            A.id = H = E();
                            var c = (I[l] = d.createElement(u).attr(A).add(d.defs));
                            c.radAttr = g;
                            c.stops = [];
                            z.forEach(function (f) {
                                0 === f[1].indexOf("rgba") ? ((k = n.parse(f[1])), (C = k.get("rgb")), (p = k.get("a"))) : ((C = f[1]), (p = 1));
                                f = d.createElement("stop").attr({ offset: f[0], "stop-color": C, "stop-opacity": p }).add(c);
                                c.stops.push(f);
                            });
                        }
                        Q = "url(" + d.url + "#" + H + ")";
                        r.setAttribute(f, Q);
                        r.gradient = l;
                        b.toString = function () {
                            return Q;
                        };
                    }
                });
            };
            C.prototype.css = function (a) {
                var f = this.styles,
                    r = {},
                    b = this.element,
                    c = "",
                    k = !f,
                    u = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                f &&
                    L(a, function (a, b) {
                        f && f[b] !== a && ((r[b] = a), (k = !0));
                    });
                if (k) {
                    f && (a = d(f, r));
                    if (a)
                        if (null === a.width || "auto" === a.width) delete this.textWidth;
                        else if ("text" === b.nodeName.toLowerCase() && a.width) var e = (this.textWidth = Q(a.width));
                    this.styles = a;
                    e && !G && this.renderer.forExport && delete a.width;
                    if (b.namespaceURI === this.SVG_NS) {
                        var A = function (f, r) {
                            return "-" + r.toLowerCase();
                        };
                        L(a, function (f, r) {
                            -1 === u.indexOf(r) && (c += r.replace(/([A-Z])/g, A) + ":" + f + ";");
                        });
                        c && g(b, "style", c);
                    } else p(b, a);
                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline));
                }
                return this;
            };
            C.prototype.dashstyleSetter = function (a) {
                var f = this["stroke-width"];
                "inherit" === f && (f = 1);
                if ((a = a && a.toLowerCase())) {
                    var r = a
                        .replace("shortdashdotdot", "3,1,1,1,1,1,")
                        .replace("shortdashdot", "3,1,1,1")
                        .replace("shortdot", "1,1,")
                        .replace("shortdash", "3,1,")
                        .replace("longdash", "8,3,")
                        .replace(/dot/g, "1,3,")
                        .replace("dash", "4,3,")
                        .replace(/,$/, "")
                        .split(",");
                    for (a = r.length; a--; ) r[a] = "" + Q(r[a]) * P(f, NaN);
                    a = r.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a);
                }
            };
            C.prototype.destroy = function () {
                var a = this,
                    f = a.element || {},
                    r = a.renderer,
                    c = (r.isSVG && "SPAN" === f.nodeName && a.parentGroup) || void 0,
                    d = f.ownerSVGElement;
                f.onclick = f.onmouseout = f.onmouseover = f.onmousemove = f.point = null;
                K(a);
                if (a.clipPath && d) {
                    var k = a.clipPath;
                    [].forEach.call(d.querySelectorAll("[clip-path],[CLIP-PATH]"), function (f) {
                        -1 < f.getAttribute("clip-path").indexOf(k.element.id) && f.removeAttribute("clip-path");
                    });
                    a.clipPath = k.destroy();
                }
                if (a.stops) {
                    for (d = 0; d < a.stops.length; d++) a.stops[d].destroy();
                    a.stops.length = 0;
                    a.stops = void 0;
                }
                a.safeRemoveChild(f);
                for (r.styledMode || a.destroyShadows(); c && c.div && 0 === c.div.childNodes.length; ) (f = c.parentGroup), a.safeRemoveChild(c.div), delete c.div, (c = f);
                a.alignTo && b(r.alignedObjects, a);
                L(a, function (f, r) {
                    a[r] && a[r].parentGroup === a && a[r].destroy && a[r].destroy();
                    delete a[r];
                });
            };
            C.prototype.destroyShadows = function () {
                (this.shadows || []).forEach(function (a) {
                    this.safeRemoveChild(a);
                }, this);
                this.shadows = void 0;
            };
            C.prototype.destroyTextPath = function (a, f) {
                var r = a.getElementsByTagName("text")[0];
                if (r) {
                    if ((r.removeAttribute("dx"), r.removeAttribute("dy"), f.element.setAttribute("id", ""), this.textPathWrapper && r.getElementsByTagName("textPath").length)) {
                        for (a = this.textPathWrapper.element.childNodes; a.length; ) r.appendChild(a[0]);
                        r.removeChild(this.textPathWrapper.element);
                    }
                } else if (a.getAttribute("dx") || a.getAttribute("dy")) a.removeAttribute("dx"), a.removeAttribute("dy");
                this.textPathWrapper && (this.textPathWrapper = this.textPathWrapper.destroy());
            };
            C.prototype.dSetter = function (b, f, r) {
                a(b) &&
                    ("string" === typeof b[0] && (b = this.renderer.pathToSegments(b)),
                    (this.pathArray = b),
                    (b = b.reduce(function (f, r, a) {
                        return r && r.join ? (a ? f + " " : "") + r.join(" ") : (r || "").toString();
                    }, "")));
                /(NaN| {2}|^$)/.test(b) && (b = "M 0 0");
                this[f] !== b && (r.setAttribute(f, b), (this[f] = b));
            };
            C.prototype.fadeOut = function (a) {
                var f = this;
                f.animate(
                    { opacity: 0 },
                    {
                        duration: P(a, 150),
                        complete: function () {
                            f.attr({ y: -9999 }).hide();
                        },
                    }
                );
            };
            C.prototype.fillSetter = function (a, f, r) {
                "string" === typeof a ? r.setAttribute(f, a) : a && this.complexColor(a, f, r);
            };
            C.prototype.getBBox = function (a, f) {
                var r,
                    b = this.renderer,
                    c = this.element,
                    u = this.styles,
                    A = this.textStr,
                    y = b.cache,
                    g = b.cacheKeys,
                    I = c.namespaceURI === this.SVG_NS;
                f = P(f, this.rotation, 0);
                var z = b.styledMode ? c && C.prototype.getStyle.call(c, "font-size") : u && u.fontSize;
                if (e(A)) {
                    var E = A.toString();
                    -1 === E.indexOf("<") && (E = E.replace(/[0-9]/g, "0"));
                    E += ["", f, z, this.textWidth, u && u.textOverflow, u && u.fontWeight].join();
                }
                E && !a && (r = y[E]);
                if (!r) {
                    if (I || b.forExport) {
                        try {
                            var p =
                                this.fakeTS &&
                                function (f) {
                                    [].forEach.call(c.querySelectorAll(".RBG_charts-text-outline"), function (r) {
                                        r.style.display = f;
                                    });
                                };
                            k(p) && p("none");
                            r = c.getBBox ? d({}, c.getBBox()) : { width: c.offsetWidth, height: c.offsetHeight };
                            k(p) && p("");
                        } catch (da) {
                            ("");
                        }
                        if (!r || 0 > r.width) r = { width: 0, height: 0 };
                    } else r = this.htmlGetBBox();
                    b.isSVG &&
                        ((a = r.width),
                        (b = r.height),
                        I && (r.height = b = { "11px,17": 14, "13px,20": 16 }[u && u.fontSize + "," + Math.round(b)] || b),
                        f && ((u = f * D), (r.width = Math.abs(b * Math.sin(u)) + Math.abs(a * Math.cos(u))), (r.height = Math.abs(b * Math.cos(u)) + Math.abs(a * Math.sin(u)))));
                    if (E && 0 < r.height) {
                        for (; 250 < g.length; ) delete y[g.shift()];
                        y[E] || g.push(E);
                        y[E] = r;
                    }
                }
                return r;
            };
            C.prototype.getStyle = function (a) {
                return h.getComputedStyle(this.element || this, "").getPropertyValue(a);
            };
            C.prototype.hasClass = function (a) {
                return -1 !== ("" + this.attr("class")).split(" ").indexOf(a);
            };
            C.prototype.hide = function (a) {
                a ? this.attr({ y: -9999 }) : this.attr({ visibility: "hidden" });
                return this;
            };
            C.prototype.htmlGetBBox = function () {
                return { height: 0, width: 0, x: 0, y: 0 };
            };
            C.prototype.init = function (a, f) {
                this.element = "span" === f ? H(f) : x.createElementNS(this.SVG_NS, f);
                this.renderer = a;
                c(this, "afterInit");
            };
            C.prototype.invert = function (a) {
                this.inverted = a;
                this.updateTransform();
                return this;
            };
            C.prototype.on = function (a, f) {
                var r,
                    b,
                    c = this.element,
                    d;
                q && "click" === a
                    ? ((c.ontouchstart = function (f) {
                          r = f.touches[0].clientX;
                          b = f.touches[0].clientY;
                      }),
                      (c.ontouchend = function (a) {
                          (r && 4 <= Math.sqrt(Math.pow(r - a.changedTouches[0].clientX, 2) + Math.pow(b - a.changedTouches[0].clientY, 2))) || f.call(c, a);
                          d = !0;
                          !1 !== a.cancelable && a.preventDefault();
                      }),
                      (c.onclick = function (r) {
                          d || f.call(c, r);
                      }))
                    : (c["on" + a] = f);
                return this;
            };
            C.prototype.opacitySetter = function (a, f, r) {
                this.opacity = a = Number(Number(a).toFixed(3));
                r.setAttribute(f, a);
            };
            C.prototype.removeClass = function (a) {
                return this.attr(
                    "class",
                    ("" + this.attr("class"))
                        .replace(I(a) ? new RegExp("(^| )" + a + "( |$)") : a, " ")
                        .replace(/ +/g, " ")
                        .trim()
                );
            };
            C.prototype.removeTextOutline = function (a) {
                for (var f = a.length, r; f--; ) (r = a[f]), "RBG_charts-text-outline" === r.getAttribute("class") && b(a, this.element.removeChild(r));
            };
            C.prototype.safeRemoveChild = function (a) {
                var f = a.parentNode;
                f && f.removeChild(a);
            };
            C.prototype.setRadialReference = function (a) {
                var f = this.element.gradient && this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                f && f.radAttr && f.animate(this.renderer.getRadialAttr(a, f.radAttr));
                return this;
            };
            C.prototype.setTextPath = function (a, f) {
                var r = this.element,
                    b = { textAnchor: "text-anchor" },
                    c = !1,
                    d = this.textPathWrapper,
                    k = !d;
                f = y(!0, { enabled: !0, attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" } }, f);
                var A = f.attributes;
                if (a && f && f.enabled) {
                    d && null === d.element.parentNode ? ((k = !0), (d = d.destroy())) : d && this.removeTextOutline.call(d.parentGroup, [].slice.call(r.getElementsByTagName("tspan")));
                    this.options && this.options.padding && (A.dx = -this.options.padding);
                    d || ((this.textPathWrapper = d = this.renderer.createElement("textPath")), (c = !0));
                    var g = d.element;
                    (f = a.element.getAttribute("id")) || a.element.setAttribute("id", (f = E()));
                    if (k) for (a = r.getElementsByTagName("tspan"); a.length; ) a[0].setAttribute("y", 0), u(A.dx) && a[0].setAttribute("x", -A.dx), g.appendChild(a[0]);
                    c && d && d.add({ element: this.text ? this.text.element : r });
                    g.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + f);
                    e(A.dy) && (g.parentNode.setAttribute("dy", A.dy), delete A.dy);
                    e(A.dx) && (g.parentNode.setAttribute("dx", A.dx), delete A.dx);
                    L(A, function (f, a) {
                        g.setAttribute(b[a] || a, f);
                    });
                    r.removeAttribute("transform");
                    this.removeTextOutline.call(d, [].slice.call(r.getElementsByTagName("tspan")));
                    this.text && !this.renderer.styledMode && this.attr({ fill: "none", "stroke-width": 0 });
                    this.applyTextOutline = this.updateTransform = w;
                } else d && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(r, a), this.updateTransform(), this.options && this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
                return this;
            };
            C.prototype.shadow = function (a, f, r) {
                var b = [],
                    c = this.element,
                    k = !1,
                    u = this.oldShadowOptions;
                var e = { color: "#000000", offsetX: 1, offsetY: 1, opacity: 0.15, width: 3 };
                var A;
                !0 === a ? (A = e) : "object" === typeof a && (A = d(e, a));
                A &&
                    (A &&
                        u &&
                        L(A, function (f, a) {
                            f !== u[a] && (k = !0);
                        }),
                    k && this.destroyShadows(),
                    (this.oldShadowOptions = A));
                if (!A) this.destroyShadows();
                else if (!this.shadows) {
                    var y = A.opacity / A.width;
                    var I = this.parentInverted ? "translate(-1,-1)" : "translate(" + A.offsetX + ", " + A.offsetY + ")";
                    for (e = 1; e <= A.width; e++) {
                        var z = c.cloneNode(!1);
                        var E = 2 * A.width + 1 - 2 * e;
                        g(z, { stroke: a.color || "#000000", "stroke-opacity": y * e, "stroke-width": E, transform: I, fill: "none" });
                        z.setAttribute("class", (z.getAttribute("class") || "") + " RBG_charts-shadow");
                        r && (g(z, "height", Math.max(g(z, "height") - E, 0)), (z.cutHeight = E));
                        f ? f.element.appendChild(z) : c.parentNode && c.parentNode.insertBefore(z, c);
                        b.push(z);
                    }
                    this.shadows = b;
                }
                return this;
            };
            C.prototype.show = function (a) {
                return this.attr({ visibility: a ? "inherit" : "visible" });
            };
            C.prototype.strokeSetter = function (a, f, r) {
                this[f] = a;
                this.stroke && this["stroke-width"]
                    ? (C.prototype.fillSetter.call(this, this.stroke, "stroke", r), r.setAttribute("stroke-width", this["stroke-width"]), (this.hasStroke = !0))
                    : "stroke-width" === f && 0 === a && this.hasStroke
                    ? (r.removeAttribute("stroke"), (this.hasStroke = !1))
                    : this.renderer.styledMode && this["stroke-width"] && (r.setAttribute("stroke-width", this["stroke-width"]), (this.hasStroke = !0));
            };
            C.prototype.strokeWidth = function () {
                if (!this.renderer.styledMode) return this["stroke-width"] || 0;
                var a = this.getStyle("stroke-width"),
                    f = 0;
                if (a.indexOf("px") === a.length - 2) f = Q(a);
                else if ("" !== a) {
                    var r = x.createElementNS(l, "rect");
                    g(r, { width: a, "stroke-width": 0 });
                    this.element.parentNode.appendChild(r);
                    f = r.getBBox().width;
                    r.parentNode.removeChild(r);
                }
                return f;
            };
            C.prototype.symbolAttr = function (a) {
                var f = this;
                "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function (r) {
                    f[r] = P(a[r], f[r]);
                });
                f.attr({ d: f.renderer.symbols[f.symbolName](f.x, f.y, f.width, f.height, f) });
            };
            C.prototype.textSetter = function (a) {
                a !== this.textStr && (delete this.textPxLength, (this.textStr = a), this.added && this.renderer.buildText(this));
            };
            C.prototype.titleSetter = function (a) {
                var f = this.element.getElementsByTagName("title")[0];
                f || ((f = x.createElementNS(this.SVG_NS, "title")), this.element.appendChild(f));
                f.firstChild && f.removeChild(f.firstChild);
                f.appendChild(
                    x.createTextNode(
                        String(P(a, ""))
                            .replace(/<[^>]*>/g, "")
                            .replace(/&lt;/g, "<")
                            .replace(/&gt;/g, ">")
                    )
                );
            };
            C.prototype.toFront = function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this;
            };
            C.prototype.translate = function (a, f) {
                return this.attr({ translateX: a, translateY: f });
            };
            C.prototype.updateShadows = function (a, f, r) {
                var b = this.shadows;
                if (b) for (var c = b.length; c--; ) r.call(b[c], "height" === a ? Math.max(f - (b[c].cutHeight || 0), 0) : "d" === a ? this.d : f, a, b[c]);
            };
            C.prototype.updateTransform = function () {
                var a = this.translateX || 0,
                    f = this.translateY || 0,
                    r = this.scaleX,
                    b = this.scaleY,
                    c = this.inverted,
                    d = this.rotation,
                    k = this.matrix,
                    u = this.element;
                c && ((a += this.width), (f += this.height));
                a = ["translate(" + a + "," + f + ")"];
                e(k) && a.push("matrix(" + k.join(",") + ")");
                c ? a.push("rotate(90) scale(-1,1)") : d && a.push("rotate(" + d + " " + P(this.rotationOriginX, u.getAttribute("x"), 0) + " " + P(this.rotationOriginY, u.getAttribute("y") || 0) + ")");
                (e(r) || e(b)) && a.push("scale(" + P(r, 1) + " " + P(b, 1) + ")");
                a.length && u.setAttribute("transform", a.join(" "));
            };
            C.prototype.visibilitySetter = function (a, f, r) {
                "inherit" === a ? r.removeAttribute(f) : this[f] !== a && r.setAttribute(f, a);
                this[f] = a;
            };
            C.prototype.xGetter = function (a) {
                "circle" === this.element.nodeName && ("x" === a ? (a = "cx") : "y" === a && (a = "cy"));
                return this._defaultGetter(a);
            };
            C.prototype.zIndexSetter = function (a, f) {
                var r = this.renderer,
                    b = this.parentGroup,
                    c = (b || r).element || r.box,
                    d = this.element,
                    k = !1;
                r = c === r.box;
                var u = this.added;
                var y;
                e(a) ? (d.setAttribute("data-z-index", a), (a = +a), this[f] === a && (u = !1)) : e(this[f]) && d.removeAttribute("data-z-index");
                this[f] = a;
                if (u) {
                    (a = this.zIndex) && b && (b.handleZ = !0);
                    f = c.childNodes;
                    for (y = f.length - 1; 0 <= y && !k; y--) {
                        b = f[y];
                        u = b.getAttribute("data-z-index");
                        var g = !e(u);
                        if (b !== d)
                            if (0 > a && g && !r && !y) c.insertBefore(d, f[y]), (k = !0);
                            else if (Q(u) <= a || (g && (!e(a) || 0 <= a))) c.insertBefore(d, f[y + 1] || null), (k = !0);
                    }
                    k || (c.insertBefore(d, f[r ? 3 : 0] || null), (k = !0));
                }
                return k;
            };
            return C;
        })();
        v.prototype["stroke-widthSetter"] = v.prototype.strokeSetter;
        v.prototype.yGetter = v.prototype.xGetter;
        v.prototype.matrixSetter = v.prototype.rotationOriginXSetter = v.prototype.rotationOriginYSetter = v.prototype.rotationSetter = v.prototype.scaleXSetter = v.prototype.scaleYSetter = v.prototype.translateXSetter = v.prototype.translateYSetter = v.prototype.verticalAlignSetter = function (
            a,
            b
        ) {
            this[b] = a;
            this.doTransform = !0;
        };
        m.SVGElement = v;
        return m.SVGElement;
    });
    O(m, "Core/Renderer/SVG/SVGLabel.js", [m["Core/Renderer/SVG/SVGElement.js"], m["Core/Utilities.js"]], function (v, n) {
        var m =
                (this && this.__extends) ||
                (function () {
                    var x = function (q, t) {
                        x =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (w, t) {
                                    w.__proto__ = t;
                                }) ||
                            function (w, t) {
                                for (var l in t) t.hasOwnProperty(l) && (w[l] = t[l]);
                            };
                        return x(q, t);
                    };
                    return function (q, t) {
                        function w() {
                            this.constructor = q;
                        }
                        x(q, t);
                        q.prototype = null === t ? Object.create(t) : ((w.prototype = t.prototype), new w());
                    };
                })(),
            B = n.defined,
            F = n.extend,
            J = n.isNumber,
            K = n.merge,
            D = n.removeEvent;
        return (function (x) {
            function q(t, w, G, l, h, g, H, p, e, b) {
                var d = x.call(this) || this;
                d.init(t, "g");
                d.textStr = w;
                d.x = G;
                d.y = l;
                d.anchorX = g;
                d.anchorY = H;
                d.baseline = e;
                d.className = b;
                "button" !== b && d.addClass("RBG_charts-label");
                b && d.addClass("RBG_charts-" + b);
                d.text = t.text("", 0, 0, p).attr({ zIndex: 1 });
                if ("string" === typeof h) {
                    var c = /^url\((.*?)\)$/.test(h);
                    if (d.renderer.symbols[h] || c) d.symbolKey = h;
                }
                d.bBox = q.emptyBBox;
                d.padding = 3;
                d.paddingLeft = 0;
                d.baselineOffset = 0;
                d.needsBox = t.styledMode || c;
                d.deferredAttr = {};
                d.alignFactor = 0;
                return d;
            }
            m(q, x);
            q.prototype.alignSetter = function (t) {
                t = { left: 0, center: 0.5, right: 1 }[t];
                t !== this.alignFactor && ((this.alignFactor = t), this.bBox && J(this.xSetting) && this.attr({ x: this.xSetting }));
            };
            q.prototype.anchorXSetter = function (t, w) {
                this.anchorX = t;
                this.boxAttr(w, Math.round(t) - this.getCrispAdjust() - this.xSetting);
            };
            q.prototype.anchorYSetter = function (t, w) {
                this.anchorY = t;
                this.boxAttr(w, t - this.ySetting);
            };
            q.prototype.boxAttr = function (t, w) {
                this.box ? this.box.attr(t, w) : (this.deferredAttr[t] = w);
            };
            q.prototype.css = function (t) {
                if (t) {
                    var w = {};
                    t = K(t);
                    q.textProps.forEach(function (l) {
                        "undefined" !== typeof t[l] && ((w[l] = t[l]), delete t[l]);
                    });
                    this.text.css(w);
                    var G = "fontSize" in w || "fontWeight" in w;
                    if ("width" in w || G) this.updateBoxSize(), G && this.updateTextPadding();
                }
                return v.prototype.css.call(this, t);
            };
            q.prototype.destroy = function () {
                D(this.element, "mouseenter");
                D(this.element, "mouseleave");
                this.text && this.text.destroy();
                this.box && (this.box = this.box.destroy());
                v.prototype.destroy.call(this);
            };
            q.prototype.fillSetter = function (t, w) {
                t && (this.needsBox = !0);
                this.fill = t;
                this.boxAttr(w, t);
            };
            q.prototype.getBBox = function () {
                var t = this.bBox,
                    w = this.padding;
                return { width: t.width + 2 * w, height: t.height + 2 * w, x: t.x - w, y: t.y - w };
            };
            q.prototype.getCrispAdjust = function () {
                return this.renderer.styledMode && this.box ? (this.box.strokeWidth() % 2) / 2 : ((this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2) / 2;
            };
            q.prototype.heightSetter = function (t) {
                this.heightSetting = t;
            };
            q.prototype.on = function (t, w) {
                var q = this,
                    l = q.text,
                    h = l && "SPAN" === l.element.tagName ? l : void 0;
                if (h) {
                    var g = function (g) {
                        (("mouseenter" === t || "mouseleave" === t) && g.relatedTarget instanceof Element && (q.element.contains(g.relatedTarget) || h.element.contains(g.relatedTarget))) || w.call(q.element, g);
                    };
                    h.on(t, g);
                }
                v.prototype.on.call(q, t, g || w);
                return q;
            };
            q.prototype.onAdd = function () {
                var t = this.textStr;
                this.text.add(this);
                this.attr({ text: B(t) ? t : "", x: this.x, y: this.y });
                this.box && B(this.anchorX) && this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
            };
            q.prototype.paddingSetter = function (t) {
                B(t) && t !== this.padding && ((this.padding = t), this.updateTextPadding());
            };
            q.prototype.paddingLeftSetter = function (t) {
                B(t) && t !== this.paddingLeft && ((this.paddingLeft = t), this.updateTextPadding());
            };
            q.prototype.rSetter = function (t, w) {
                this.boxAttr(w, t);
            };
            q.prototype.shadow = function (t) {
                t && !this.renderer.styledMode && (this.updateBoxSize(), this.box && this.box.shadow(t));
                return this;
            };
            q.prototype.strokeSetter = function (t, w) {
                this.stroke = t;
                this.boxAttr(w, t);
            };
            q.prototype["stroke-widthSetter"] = function (t, w) {
                t && (this.needsBox = !0);
                this["stroke-width"] = t;
                this.boxAttr(w, t);
            };
            q.prototype["text-alignSetter"] = function (t) {
                this.textAlign = t;
            };
            q.prototype.textSetter = function (t) {
                "undefined" !== typeof t && this.text.attr({ text: t });
                this.updateBoxSize();
                this.updateTextPadding();
            };
            q.prototype.updateBoxSize = function () {
                var t = this.text.element.style,
                    w = {},
                    G = this.padding,
                    l = this.paddingLeft,
                    h = (J(this.widthSetting) && J(this.heightSetting) && !this.textAlign) || !B(this.text.textStr) ? q.emptyBBox : this.text.getBBox();
                this.width = (this.widthSetting || h.width || 0) + 2 * G + l;
                this.height = (this.heightSetting || h.height || 0) + 2 * G;
                this.baselineOffset = G + Math.min(this.renderer.fontMetrics(t && t.fontSize, this.text).b, h.height || Infinity);
                this.needsBox &&
                    (this.box ||
                        ((t = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect()),
                        t.addClass(("button" === this.className ? "" : "RBG_charts-label-box") + (this.className ? " RBG_charts-" + this.className + "-box" : "")),
                        t.add(this),
                        (t = this.getCrispAdjust()),
                        (w.x = t),
                        (w.y = (this.baseline ? -this.baselineOffset : 0) + t)),
                    (w.width = Math.round(this.width)),
                    (w.height = Math.round(this.height)),
                    this.box.attr(F(w, this.deferredAttr)),
                    (this.deferredAttr = {}));
                this.bBox = h;
            };
            q.prototype.updateTextPadding = function () {
                var t = this.text,
                    w = this.baseline ? 0 : this.baselineOffset,
                    q = this.paddingLeft + this.padding;
                B(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" === this.textAlign) && (q += { center: 0.5, right: 1 }[this.textAlign] * (this.widthSetting - this.bBox.width));
                if (q !== t.x || w !== t.y) t.attr("x", q), t.hasBoxWidthChanged && ((this.bBox = t.getBBox(!0)), this.updateBoxSize()), "undefined" !== typeof w && t.attr("y", w);
                t.x = q;
                t.y = w;
            };
            q.prototype.widthSetter = function (t) {
                this.widthSetting = J(t) ? t : void 0;
            };
            q.prototype.xSetter = function (t) {
                this.x = t;
                this.alignFactor && ((t -= this.alignFactor * ((this.widthSetting || this.bBox.width) + 2 * this.padding)), (this["forceAnimate:x"] = !0));
                this.xSetting = Math.round(t);
                this.attr("translateX", this.xSetting);
            };
            q.prototype.ySetter = function (t) {
                this.ySetting = this.y = Math.round(t);
                this.attr("translateY", this.ySetting);
            };
            q.emptyBBox = { width: 0, height: 0, x: 0, y: 0 };
            q.textProps = "color cursor direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" ");
            return q;
        })(v);
    });
    O(m, "Core/Renderer/SVG/SVGRenderer.js", [m["Core/Color/Color.js"], m["Core/Globals.js"], m["Core/Renderer/SVG/SVGElement.js"], m["Core/Renderer/SVG/SVGLabel.js"], m["Core/Utilities.js"]], function (v, n, m, B, F) {
        var M = F.addEvent,
            K = F.attr,
            D = F.createElement,
            x = F.css,
            q = F.defined,
            t = F.destroyObjectProperties,
            w = F.extend,
            G = F.isArray,
            l = F.isNumber,
            h = F.isObject,
            g = F.isString,
            H = F.merge,
            p = F.objectEach,
            e = F.pick,
            b = F.pInt,
            d = F.splat,
            c = F.uniqueKey,
            a = n.charts,
            k = n.deg2rad,
            u = n.doc,
            I = n.isFirefox,
            y = n.isMS,
            L = n.isWebKit;
        F = n.noop;
        var P = n.svg,
            Q = n.SVG_NS,
            z = n.symbolSizes,
            E = n.win,
            C = (function () {
                function A(f, a, b, c, d, k, u) {
                    this.width = this.url = this.style = this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0;
                    this.init(f, a, b, c, d, k, u);
                }
                A.prototype.init = function (f, a, b, c, d, k, e) {
                    var r = this.createElement("svg").attr({ version: "1.1", class: "RBG_charts-root" });
                    e || r.css(this.getStyle(c));
                    c = r.element;
                    f.appendChild(c);
                    K(f, "dir", "ltr");
                    -1 === f.innerHTML.indexOf("xmlns") && K(c, "xmlns", this.SVG_NS);
                    this.isSVG = !0;
                    this.box = c;
                    this.boxWrapper = r;
                    this.alignedObjects = [];
                    this.url =
                        (I || L) && u.getElementsByTagName("base").length
                            ? E.location.href
                                  .split("#")[0]
                                  .replace(/<[^>]*>/g, "")
                                  .replace(/([\('\)])/g, "\\$1")
                                  .replace(/ /g, "%20")
                            : "";
                    this.createElement("desc").add().element.appendChild(u.createTextNode("Created with RBGcharts 8.2.2"));
                    this.defs = this.createElement("defs").add();
                    this.allowHTML = k;
                    this.forExport = d;
                    this.styledMode = e;
                    this.gradients = {};
                    this.cache = {};
                    this.cacheKeys = [];
                    this.imgCount = 0;
                    this.setSize(a, b, !1);
                    var N;
                    I &&
                        f.getBoundingClientRect &&
                        ((a = function () {
                            x(f, { left: 0, top: 0 });
                            N = f.getBoundingClientRect();
                            x(f, { left: Math.ceil(N.left) - N.left + "px", top: Math.ceil(N.top) - N.top + "px" });
                        }),
                        a(),
                        (this.unSubPixelFix = M(E, "resize", a)));
                };
                A.prototype.definition = function (f) {
                    function a(f, r) {
                        var c;
                        d(f).forEach(function (f) {
                            var d = b.createElement(f.tagName),
                                k = {};
                            p(f, function (f, a) {
                                "tagName" !== a && "children" !== a && "textContent" !== a && (k[a] = f);
                            });
                            d.attr(k);
                            d.add(r || b.defs);
                            f.textContent && d.element.appendChild(u.createTextNode(f.textContent));
                            a(f.children || [], d);
                            c = d;
                        });
                        return c;
                    }
                    var b = this;
                    return a(f);
                };
                A.prototype.getStyle = function (f) {
                    return (this.style = w({ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: "12px" }, f));
                };
                A.prototype.setStyle = function (f) {
                    this.boxWrapper.css(this.getStyle(f));
                };
                A.prototype.isHidden = function () {
                    return !this.boxWrapper.getBBox().width;
                };
                A.prototype.destroy = function () {
                    var f = this.defs;
                    this.box = null;
                    this.boxWrapper = this.boxWrapper.destroy();
                    t(this.gradients || {});
                    this.gradients = null;
                    f && (this.defs = f.destroy());
                    this.unSubPixelFix && this.unSubPixelFix();
                    return (this.alignedObjects = null);
                };
                A.prototype.createElement = function (f) {
                    var a = new this.Element();
                    a.init(this, f);
                    return a;
                };
                A.prototype.getRadialAttr = function (f, a) {
                    return { cx: f[0] - f[2] / 2 + a.cx * f[2], cy: f[1] - f[2] / 2 + a.cy * f[2], r: a.r * f[2] };
                };
                A.prototype.truncate = function (f, a, b, c, d, k, e) {
                    var r = this,
                        N = f.rotation,
                        R,
                        y = c ? 1 : 0,
                        g = (b || c).length,
                        S = g,
                        I = [],
                        A = function (f) {
                            a.firstChild && a.removeChild(a.firstChild);
                            f && a.appendChild(u.createTextNode(f));
                        },
                        z = function (k, u) {
                            u = u || k;
                            if ("undefined" === typeof I[u])
                                if (a.getSubStringLength)
                                    try {
                                        I[u] = d + a.getSubStringLength(0, c ? u + 1 : u);
                                    } catch (ka) {
                                        ("");
                                    }
                                else r.getSpanWidth && (A(e(b || c, k)), (I[u] = d + r.getSpanWidth(f, a)));
                            return I[u];
                        },
                        E;
                    f.rotation = 0;
                    var C = z(a.textContent.length);
                    if ((E = d + C > k)) {
                        for (; y <= g; ) (S = Math.ceil((y + g) / 2)), c && (R = e(c, S)), (C = z(S, R && R.length - 1)), y === g ? (y = g + 1) : C > k ? (g = S - 1) : (y = S);
                        0 === g ? A("") : (b && g === b.length - 1) || A(R || e(b || c, S));
                    }
                    c && c.splice(0, S);
                    f.actualWidth = C;
                    f.rotation = N;
                    return E;
                };
                A.prototype.buildText = function (f) {
                    var a = f.element,
                        c = this,
                        d = c.forExport,
                        k = e(f.textStr, "").toString(),
                        y = -1 !== k.indexOf("<"),
                        I = a.childNodes,
                        A,
                        z = K(a, "x"),
                        E = f.styles,
                        C = f.textWidth,
                        h = E && E.lineHeight,
                        L = E && E.textOutline,
                        H = E && "ellipsis" === E.textOverflow,
                        l = E && "nowrap" === E.whiteSpace,
                        t = E && E.fontSize,
                        w,
                        q = I.length;
                    E = C && !f.added && this.box;
                    var G = function (f) {
                            var r;
                            c.styledMode || (r = /(px|em)$/.test(f && f.style.fontSize) ? f.style.fontSize : t || c.style.fontSize || 12);
                            return h ? b(h) : c.fontMetrics(r, f.getAttribute("style") ? f : a).h;
                        },
                        n = function (f, a) {
                            p(c.escapes, function (r, b) {
                                (a && -1 !== a.indexOf(r)) || (f = f.toString().replace(new RegExp(r, "g"), b));
                            });
                            return f;
                        },
                        v = function (f, a) {
                            var r = f.indexOf("<");
                            f = f.substring(r, f.indexOf(">") - r);
                            r = f.indexOf(a + "=");
                            if (-1 !== r && ((r = r + a.length + 1), (a = f.charAt(r)), '"' === a || "'" === a)) return (f = f.substring(r + 1)), f.substring(0, f.indexOf(a));
                        },
                        m = /<br.*?>/g;
                    var D = [k, H, l, h, L, t, C].join();
                    if (D !== f.textCache) {
                        for (f.textCache = D; q--; ) a.removeChild(I[q]);
                        y || L || H || C || (-1 !== k.indexOf(" ") && (!l || m.test(k)))
                            ? (E && E.appendChild(a),
                              y
                                  ? ((k = c.styledMode
                                        ? k.replace(/<(b|strong)>/g, '<span class="RBG_charts-strong">').replace(/<(i|em)>/g, '<span class="RBG_charts-emphasized">')
                                        : k.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">')),
                                    (k = k
                                        .replace(/<a/g, "<span")
                                        .replace(/<\/(b|strong|i|em|a)>/g, "</span>")
                                        .split(m)))
                                  : (k = [k]),
                              (k = k.filter(function (f) {
                                  return "" !== f;
                              })),
                              k.forEach(function (r, b) {
                                  var k = 0,
                                      N = 0;
                                  r = r
                                      .replace(/^\s+|\s+$/g, "")
                                      .replace(/<span/g, "|||<span")
                                      .replace(/<\/span>/g, "</span>|||");
                                  var e = r.split("|||");
                                  e.forEach(function (r) {
                                      if ("" !== r || 1 === e.length) {
                                          var R = {},
                                              y = u.createElementNS(c.SVG_NS, "tspan"),
                                              g,
                                              I;
                                          (g = v(r, "class")) && K(y, "class", g);
                                          if ((g = v(r, "style"))) (g = g.replace(/(;| |^)color([ :])/, "$1fill$2")), K(y, "style", g);
                                          if ((I = v(r, "href")) && !d && -1 === I.split(":")[0].toLowerCase().indexOf("javascript")) {
                                              var E = u.createElementNS(c.SVG_NS, "a");
                                              K(E, "href", I);
                                              K(y, "class", "RBG_charts-anchor");
                                              E.appendChild(y);
                                              c.styledMode || x(y, { cursor: "pointer" });
                                          }
                                          r = n(r.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                          if (" " !== r) {
                                              y.appendChild(u.createTextNode(r));
                                              k ? (R.dx = 0) : b && null !== z && (R.x = z);
                                              K(y, R);
                                              a.appendChild(E || y);
                                              !k && w && (!P && d && x(y, { display: "block" }), K(y, "dy", G(y)));
                                              if (C) {
                                                  var S = r.replace(/([^\^])-/g, "$1- ").split(" ");
                                                  R = !l && (1 < e.length || b || 1 < S.length);
                                                  E = 0;
                                                  I = G(y);
                                                  if (H)
                                                      A = c.truncate(f, y, r, void 0, 0, Math.max(0, C - parseInt(t || 12, 10)), function (f, a) {
                                                          return f.substring(0, a) + "\u2026";
                                                      });
                                                  else if (R)
                                                      for (; S.length; )
                                                          S.length &&
                                                              !l &&
                                                              0 < E &&
                                                              ((y = u.createElementNS(Q, "tspan")), K(y, { dy: I, x: z }), g && K(y, "style", g), y.appendChild(u.createTextNode(S.join(" ").replace(/- /g, "-"))), a.appendChild(y)),
                                                              c.truncate(f, y, null, S, 0 === E ? N : 0, C, function (f, a) {
                                                                  return S.slice(0, a).join(" ").replace(/- /g, "-");
                                                              }),
                                                              (N = f.actualWidth),
                                                              E++;
                                              }
                                              k++;
                                          }
                                      }
                                  });
                                  w = w || a.childNodes.length;
                              }),
                              H && A && f.attr("title", n(f.textStr || "", ["&lt;", "&gt;"])),
                              E && E.removeChild(a),
                              g(L) && f.applyTextOutline && f.applyTextOutline(L))
                            : a.appendChild(u.createTextNode(n(k)));
                    }
                };
                A.prototype.getContrast = function (f) {
                    f = v.parse(f).rgba;
                    f[0] *= 1;
                    f[1] *= 1.2;
                    f[2] *= 0.5;
                    return 459 < f[0] + f[1] + f[2] ? "#000000" : "#FFFFFF";
                };
                A.prototype.button = function (f, a, b, c, d, k, u, e, g, I) {
                    var r = this.label(f, a, b, g, void 0, void 0, I, void 0, "button"),
                        N = 0,
                        R = this.styledMode;
                    f = ((d = d ? H(d) : d) && d.style) || {};
                    d && d.style && delete d.style;
                    r.attr(H({ padding: 8, r: 2 }, d));
                    if (!R) {
                        d = H({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333", cursor: "pointer", fontWeight: "normal" } }, { style: f }, d);
                        var E = d.style;
                        delete d.style;
                        k = H(d, { fill: "#e6e6e6" }, k);
                        var A = k.style;
                        delete k.style;
                        u = H(d, { fill: "#e6ebf5", style: { color: "#000000", fontWeight: "bold" } }, u);
                        var z = u.style;
                        delete u.style;
                        e = H(d, { style: { color: "#cccccc" } }, e);
                        var S = e.style;
                        delete e.style;
                    }
                    M(r.element, y ? "mouseover" : "mouseenter", function () {
                        3 !== N && r.setState(1);
                    });
                    M(r.element, y ? "mouseout" : "mouseleave", function () {
                        3 !== N && r.setState(N);
                    });
                    r.setState = function (f) {
                        1 !== f && (r.state = N = f);
                        r.removeClass(/RBG_charts-button-(normal|hover|pressed|disabled)/).addClass("RBG_charts-button-" + ["normal", "hover", "pressed", "disabled"][f || 0]);
                        R || r.attr([d, k, u, e][f || 0]).css([E, A, z, S][f || 0]);
                    };
                    R || r.attr(d).css(w({ cursor: "default" }, E));
                    return r.on("click", function (f) {
                        3 !== N && c.call(r, f);
                    });
                };
                A.prototype.crispLine = function (f, a, b) {
                    void 0 === b && (b = "round");
                    var r = f[0],
                        c = f[1];
                    r[1] === c[1] && (r[1] = c[1] = Math[b](r[1]) - (a % 2) / 2);
                    r[2] === c[2] && (r[2] = c[2] = Math[b](r[2]) + (a % 2) / 2);
                    return f;
                };
                A.prototype.path = function (f) {
                    var a = this.styledMode ? {} : { fill: "none" };
                    G(f) ? (a.d = f) : h(f) && w(a, f);
                    return this.createElement("path").attr(a);
                };
                A.prototype.circle = function (f, a, b) {
                    f = h(f) ? f : "undefined" === typeof f ? {} : { x: f, y: a, r: b };
                    a = this.createElement("circle");
                    a.xSetter = a.ySetter = function (f, a, r) {
                        r.setAttribute("c" + a, f);
                    };
                    return a.attr(f);
                };
                A.prototype.arc = function (f, a, b, c, d, k) {
                    h(f) ? ((c = f), (a = c.y), (b = c.r), (f = c.x)) : (c = { innerR: c, start: d, end: k });
                    f = this.symbol("arc", f, a, b, b, c);
                    f.r = b;
                    return f;
                };
                A.prototype.rect = function (f, a, b, c, d, k) {
                    d = h(f) ? f.r : d;
                    var r = this.createElement("rect");
                    f = h(f) ? f : "undefined" === typeof f ? {} : { x: f, y: a, width: Math.max(b, 0), height: Math.max(c, 0) };
                    this.styledMode || ("undefined" !== typeof k && ((f.strokeWidth = k), (f = r.crisp(f))), (f.fill = "none"));
                    d && (f.r = d);
                    r.rSetter = function (f, a, b) {
                        r.r = f;
                        K(b, { rx: f, ry: f });
                    };
                    r.rGetter = function () {
                        return r.r;
                    };
                    return r.attr(f);
                };
                A.prototype.setSize = function (f, a, b) {
                    var r = this.alignedObjects,
                        c = r.length;
                    this.width = f;
                    this.height = a;
                    for (
                        this.boxWrapper.animate(
                            { width: f, height: a },
                            {
                                step: function () {
                                    this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") });
                                },
                                duration: e(b, !0) ? void 0 : 0,
                            }
                        );
                        c--;

                    )
                        r[c].align();
                };
                A.prototype.g = function (f) {
                    var a = this.createElement("g");
                    return f ? a.attr({ class: "RBG_charts-" + f }) : a;
                };
                A.prototype.image = function (f, a, b, c, d, k) {
                    var r = { preserveAspectRatio: "none" },
                        u = function (f, a) {
                            f.setAttributeNS ? f.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : f.setAttribute("hc-svg-href", a);
                        },
                        N = function (a) {
                            u(e.element, f);
                            k.call(e, a);
                        };
                    1 < arguments.length && w(r, { x: a, y: b, width: c, height: d });
                    var e = this.createElement("image").attr(r);
                    k ? (u(e.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), (r = new E.Image()), M(r, "load", N), (r.src = f), r.complete && N({})) : u(e.element, f);
                    return e;
                };
                A.prototype.symbol = function (f, r, b, c, d, k) {
                    var N = this,
                        R = /^url\((.*?)\)$/,
                        y = R.test(f),
                        g = !y && (this.symbols[f] ? f : "circle"),
                        I = g && this.symbols[g],
                        E;
                    if (I) {
                        "number" === typeof r && (E = I.call(this.symbols, Math.round(r || 0), Math.round(b || 0), c || 0, d || 0, k));
                        var A = this.path(E);
                        N.styledMode || A.attr("fill", "none");
                        w(A, { symbolName: g, x: r, y: b, width: c, height: d });
                        k && w(A, k);
                    } else if (y) {
                        var C = f.match(R)[1];
                        A = this.image(C);
                        A.imgwidth = e(z[C] && z[C].width, k && k.width);
                        A.imgheight = e(z[C] && z[C].height, k && k.height);
                        var S = function () {
                            A.attr({ width: A.width, height: A.height });
                        };
                        ["width", "height"].forEach(function (f) {
                            A[f + "Setter"] = function (f, a) {
                                var r = {},
                                    b = this["img" + a],
                                    c = "width" === a ? "translateX" : "translateY";
                                this[a] = f;
                                q(b) &&
                                    (k && "within" === k.backgroundSize && this.width && this.height && (b = Math.round(b * Math.min(this.width / this.imgwidth, this.height / this.imgheight))),
                                    this.element && this.element.setAttribute(a, b),
                                    this.alignByTranslate || ((r[c] = ((this[a] || 0) - b) / 2), this.attr(r)));
                            };
                        });
                        q(r) && A.attr({ x: r, y: b });
                        A.isImg = !0;
                        q(A.imgwidth) && q(A.imgheight)
                            ? S()
                            : (A.attr({ width: 0, height: 0 }),
                              D("img", {
                                  onload: function () {
                                      var f = a[N.chartIndex];
                                      0 === this.width && (x(this, { position: "absolute", top: "-999em" }), u.body.appendChild(this));
                                      z[C] = { width: this.width, height: this.height };
                                      A.imgwidth = this.width;
                                      A.imgheight = this.height;
                                      A.element && S();
                                      this.parentNode && this.parentNode.removeChild(this);
                                      N.imgCount--;
                                      if (!N.imgCount && f && !f.hasLoaded) f.onload();
                                  },
                                  src: C,
                              }),
                              this.imgCount++);
                    }
                    return A;
                };
                A.prototype.clipRect = function (f, a, b, d) {
                    var r = c() + "-",
                        k = this.createElement("clipPath").attr({ id: r }).add(this.defs);
                    f = this.rect(f, a, b, d, 0).add(k);
                    f.id = r;
                    f.clipPath = k;
                    f.count = 0;
                    return f;
                };
                A.prototype.text = function (f, a, b, c) {
                    var r = {};
                    if (c && (this.allowHTML || !this.forExport)) return this.html(f, a, b);
                    r.x = Math.round(a || 0);
                    b && (r.y = Math.round(b));
                    q(f) && (r.text = f);
                    f = this.createElement("text").attr(r);
                    c ||
                        (f.xSetter = function (f, a, r) {
                            var b = r.getElementsByTagName("tspan"),
                                c = r.getAttribute(a),
                                d;
                            for (d = 0; d < b.length; d++) {
                                var k = b[d];
                                k.getAttribute(a) === c && k.setAttribute(a, f);
                            }
                            r.setAttribute(a, f);
                        });
                    return f;
                };
                A.prototype.fontMetrics = function (f, a) {
                    f = (!this.styledMode && /px/.test(f)) || !E.getComputedStyle ? f || (a && a.style && a.style.fontSize) || (this.style && this.style.fontSize) : a && m.prototype.getStyle.call(a, "font-size");
                    f = /px/.test(f) ? b(f) : 12;
                    a = 24 > f ? f + 3 : Math.round(1.2 * f);
                    return { h: a, b: Math.round(0.8 * a), f: f };
                };
                A.prototype.rotCorr = function (f, a, b) {
                    var r = f;
                    a && b && (r = Math.max(r * Math.cos(a * k), 4));
                    return { x: (-f / 3) * Math.sin(a * k), y: r };
                };
                A.prototype.pathToSegments = function (f) {
                    for (var a = [], b = [], c = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 }, d = 0; d < f.length; d++)
                        g(b[0]) && l(f[d]) && b.length === c[b[0].toUpperCase()] && f.splice(d, 0, b[0].replace("M", "L").replace("m", "l")), "string" === typeof f[d] && (b.length && a.push(b.slice(0)), (b.length = 0)), b.push(f[d]);
                    a.push(b.slice(0));
                    return a;
                };
                A.prototype.label = function (f, a, b, c, d, k, u, e, y) {
                    return new B(this, f, a, b, c, d, k, u, e, y);
                };
                return A;
            })();
        C.prototype.Element = m;
        C.prototype.SVG_NS = Q;
        C.prototype.draw = F;
        C.prototype.escapes = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" };
        C.prototype.symbols = {
            circle: function (a, f, r, b) {
                return this.arc(a + r / 2, f + b / 2, r / 2, b / 2, { start: 0.5 * Math.PI, end: 2.5 * Math.PI, open: !1 });
            },
            square: function (a, f, r, b) {
                return [["M", a, f], ["L", a + r, f], ["L", a + r, f + b], ["L", a, f + b], ["Z"]];
            },
            triangle: function (a, f, r, b) {
                return [["M", a + r / 2, f], ["L", a + r, f + b], ["L", a, f + b], ["Z"]];
            },
            "triangle-down": function (a, f, r, b) {
                return [["M", a, f], ["L", a + r, f], ["L", a + r / 2, f + b], ["Z"]];
            },
            diamond: function (a, f, r, b) {
                return [["M", a + r / 2, f], ["L", a + r, f + b / 2], ["L", a + r / 2, f + b], ["L", a, f + b / 2], ["Z"]];
            },
            arc: function (a, f, r, b, c) {
                var d = [];
                if (c) {
                    var k = c.start || 0,
                        u = c.end || 0,
                        N = c.r || r;
                    r = c.r || b || r;
                    var y = 0.001 > Math.abs(u - k - 2 * Math.PI);
                    u -= 0.001;
                    b = c.innerR;
                    y = e(c.open, y);
                    var g = Math.cos(k),
                        R = Math.sin(k),
                        I = Math.cos(u),
                        E = Math.sin(u);
                    k = e(c.longArc, 0.001 > u - k - Math.PI ? 0 : 1);
                    d.push(["M", a + N * g, f + r * R], ["A", N, r, 0, k, e(c.clockwise, 1), a + N * I, f + r * E]);
                    q(b) && d.push(y ? ["M", a + b * I, f + b * E] : ["L", a + b * I, f + b * E], ["A", b, b, 0, k, q(c.clockwise) ? 1 - c.clockwise : 0, a + b * g, f + b * R]);
                    y || d.push(["Z"]);
                }
                return d;
            },
            callout: function (a, f, r, b, c) {
                var d = Math.min((c && c.r) || 0, r, b),
                    k = d + 6,
                    u = (c && c.anchorX) || 0;
                c = (c && c.anchorY) || 0;
                var e = [
                    ["M", a + d, f],
                    ["L", a + r - d, f],
                    ["C", a + r, f, a + r, f, a + r, f + d],
                    ["L", a + r, f + b - d],
                    ["C", a + r, f + b, a + r, f + b, a + r - d, f + b],
                    ["L", a + d, f + b],
                    ["C", a, f + b, a, f + b, a, f + b - d],
                    ["L", a, f + d],
                    ["C", a, f, a, f, a + d, f],
                ];
                u && u > r
                    ? c > f + k && c < f + b - k
                        ? e.splice(3, 1, ["L", a + r, c - 6], ["L", a + r + 6, c], ["L", a + r, c + 6], ["L", a + r, f + b - d])
                        : e.splice(3, 1, ["L", a + r, b / 2], ["L", u, c], ["L", a + r, b / 2], ["L", a + r, f + b - d])
                    : u && 0 > u
                    ? c > f + k && c < f + b - k
                        ? e.splice(7, 1, ["L", a, c + 6], ["L", a - 6, c], ["L", a, c - 6], ["L", a, f + d])
                        : e.splice(7, 1, ["L", a, b / 2], ["L", u, c], ["L", a, b / 2], ["L", a, f + d])
                    : c && c > b && u > a + k && u < a + r - k
                    ? e.splice(5, 1, ["L", u + 6, f + b], ["L", u, f + b + 6], ["L", u - 6, f + b], ["L", a + d, f + b])
                    : c && 0 > c && u > a + k && u < a + r - k && e.splice(1, 1, ["L", u - 6, f], ["L", u, f - 6], ["L", u + 6, f], ["L", r - d, f]);
                return e;
            },
        };
        n.SVGRenderer = C;
        n.Renderer = n.SVGRenderer;
        return n.Renderer;
    });
    O(m, "Core/Renderer/HTML/HTMLElement.js", [m["Core/Globals.js"], m["Core/Renderer/SVG/SVGElement.js"], m["Core/Utilities.js"]], function (v, n, m) {
        var B = m.css,
            F = m.defined,
            M = m.extend,
            K = m.pick,
            D = m.pInt,
            x = v.isFirefox;
        M(n.prototype, {
            htmlCss: function (q) {
                var t = "SPAN" === this.element.tagName && q && "width" in q,
                    w = K(t && q.width, void 0);
                if (t) {
                    delete q.width;
                    this.textWidth = w;
                    var G = !0;
                }
                q && "ellipsis" === q.textOverflow && ((q.whiteSpace = "nowrap"), (q.overflow = "hidden"));
                this.styles = M(this.styles, q);
                B(this.element, q);
                G && this.htmlUpdateTransform();
                return this;
            },
            htmlGetBBox: function () {
                var q = this.element;
                return { x: q.offsetLeft, y: q.offsetTop, width: q.offsetWidth, height: q.offsetHeight };
            },
            htmlUpdateTransform: function () {
                if (this.added) {
                    var q = this.renderer,
                        t = this.element,
                        w = this.translateX || 0,
                        G = this.translateY || 0,
                        l = this.x || 0,
                        h = this.y || 0,
                        g = this.textAlign || "left",
                        H = { left: 0, center: 0.5, right: 1 }[g],
                        p = this.styles,
                        e = p && p.whiteSpace;
                    B(t, { marginLeft: w, marginTop: G });
                    !q.styledMode &&
                        this.shadows &&
                        this.shadows.forEach(function (a) {
                            B(a, { marginLeft: w + 1, marginTop: G + 1 });
                        });
                    this.inverted &&
                        [].forEach.call(t.childNodes, function (a) {
                            q.invertChild(a, t);
                        });
                    if ("SPAN" === t.tagName) {
                        p = this.rotation;
                        var b = this.textWidth && D(this.textWidth),
                            d = [p, g, t.innerHTML, this.textWidth, this.textAlign].join(),
                            c;
                        (c = b !== this.oldTextWidth) && !(c = b > this.oldTextWidth) && ((c = this.textPxLength) || (B(t, { width: "", whiteSpace: e || "nowrap" }), (c = t.offsetWidth)), (c = c > b));
                        c && (/[ \-]/.test(t.textContent || t.innerText) || "ellipsis" === t.style.textOverflow)
                            ? (B(t, { width: b + "px", display: "block", whiteSpace: e || "normal" }), (this.oldTextWidth = b), (this.hasBoxWidthChanged = !0))
                            : (this.hasBoxWidthChanged = !1);
                        d !== this.cTT &&
                            ((e = q.fontMetrics(t.style.fontSize, t).b),
                            !F(p) || (p === (this.oldRotation || 0) && g === this.oldAlign) || this.setSpanRotation(p, H, e),
                            this.getSpanCorrection((!F(p) && this.textPxLength) || t.offsetWidth, e, H, p, g));
                        B(t, { left: l + (this.xCorr || 0) + "px", top: h + (this.yCorr || 0) + "px" });
                        this.cTT = d;
                        this.oldRotation = p;
                        this.oldAlign = g;
                    }
                } else this.alignOnAdd = !0;
            },
            setSpanRotation: function (q, t, w) {
                var G = {},
                    l = this.renderer.getTransformKey();
                G[l] = G.transform = "rotate(" + q + "deg)";
                G[l + (x ? "Origin" : "-origin")] = G.transformOrigin = 100 * t + "% " + w + "px";
                B(this.element, G);
            },
            getSpanCorrection: function (q, t, w) {
                this.xCorr = -q * w;
                this.yCorr = -t;
            },
        });
        return n;
    });
    O(m, "Core/Renderer/HTML/HTMLRenderer.js", [m["Core/Globals.js"], m["Core/Renderer/SVG/SVGElement.js"], m["Core/Renderer/SVG/SVGRenderer.js"], m["Core/Utilities.js"]], function (v, n, m, B) {
        var F = v.isFirefox,
            M = v.isMS,
            K = v.isWebKit,
            D = v.win,
            x = B.attr,
            q = B.createElement,
            t = B.extend,
            w = B.pick;
        t(m.prototype, {
            getTransformKey: function () {
                return M && !/Edge/.test(D.navigator.userAgent) ? "-ms-transform" : K ? "-webkit-transform" : F ? "MozTransform" : D.opera ? "-o-transform" : "";
            },
            html: function (G, l, h) {
                var g = this.createElement("span"),
                    H = g.element,
                    p = g.renderer,
                    e = p.isSVG,
                    b = function (b, c) {
                        ["opacity", "visibility"].forEach(function (a) {
                            b[a + "Setter"] = function (d, u, e) {
                                var k = b.div ? b.div.style : c;
                                n.prototype[a + "Setter"].call(this, d, u, e);
                                k && (k[u] = d);
                            };
                        });
                        b.addedSetters = !0;
                    };
                g.textSetter = function (b) {
                    b !== H.innerHTML && (delete this.bBox, delete this.oldTextWidth);
                    this.textStr = b;
                    H.innerHTML = w(b, "");
                    g.doTransform = !0;
                };
                e && b(g, g.element.style);
                g.xSetter = g.ySetter = g.alignSetter = g.rotationSetter = function (b, c) {
                    "align" === c ? (g.alignValue = g.textAlign = b) : (g[c] = b);
                    g.doTransform = !0;
                };
                g.afterSetters = function () {
                    this.doTransform && (this.htmlUpdateTransform(), (this.doTransform = !1));
                };
                g.attr({ text: G, x: Math.round(l), y: Math.round(h) }).css({ position: "absolute" });
                p.styledMode || g.css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize });
                H.style.whiteSpace = "nowrap";
                g.css = g.htmlCss;
                e &&
                    (g.add = function (d) {
                        var c = p.box.parentNode,
                            a = [];
                        if ((this.parentGroup = d)) {
                            var k = d.div;
                            if (!k) {
                                for (; d; ) a.push(d), (d = d.parentGroup);
                                a.reverse().forEach(function (d) {
                                    function u(a, b) {
                                        d[b] = a;
                                        "translateX" === b ? (p.left = a + "px") : (p.top = a + "px");
                                        d.doTransform = !0;
                                    }
                                    var e = x(d.element, "class");
                                    k = d.div =
                                        d.div ||
                                        q(
                                            "div",
                                            e ? { className: e } : void 0,
                                            { position: "absolute", left: (d.translateX || 0) + "px", top: (d.translateY || 0) + "px", display: d.display, opacity: d.opacity, pointerEvents: d.styles && d.styles.pointerEvents },
                                            k || c
                                        );
                                    var p = k.style;
                                    t(d, {
                                        classSetter: (function (a) {
                                            return function (b) {
                                                this.element.setAttribute("class", b);
                                                a.className = b;
                                            };
                                        })(k),
                                        on: function () {
                                            a[0].div && g.on.apply({ element: a[0].div }, arguments);
                                            return d;
                                        },
                                        translateXSetter: u,
                                        translateYSetter: u,
                                    });
                                    d.addedSetters || b(d);
                                });
                            }
                        } else k = c;
                        k.appendChild(H);
                        g.added = !0;
                        g.alignOnAdd && g.htmlUpdateTransform();
                        return g;
                    });
                return g;
            },
        });
        return m;
    });
    O(m, "Core/Axis/Tick.js", [m["Core/Globals.js"], m["Core/Utilities.js"]], function (v, n) {
        var m = n.clamp,
            B = n.correctFloat,
            F = n.defined,
            J = n.destroyObjectProperties,
            K = n.extend,
            D = n.fireEvent,
            x = n.isNumber,
            q = n.merge,
            t = n.objectEach,
            w = n.pick,
            G = v.deg2rad;
        n = (function () {
            function l(h, g, H, p, e) {
                this.isNewLabel = this.isNew = !0;
                this.axis = h;
                this.pos = g;
                this.type = H || "";
                this.parameters = e || {};
                this.tickmarkOffset = this.parameters.tickmarkOffset;
                this.options = this.parameters.options;
                D(this, "init");
                H || p || this.addLabel();
            }
            l.prototype.addLabel = function () {
                var h = this,
                    g = h.axis,
                    H = g.options,
                    p = g.chart,
                    e = g.categories,
                    b = g.logarithmic,
                    d = g.names,
                    c = h.pos,
                    a = w(h.options && h.options.labels, H.labels),
                    k = g.tickPositions,
                    u = c === k[0],
                    I = c === k[k.length - 1];
                d = this.parameters.category || (e ? w(e[c], d[c], c) : c);
                var y = h.label;
                e = (!a.step || 1 === a.step) && 1 === g.tickInterval;
                k = k.info;
                var L, l;
                if (g.dateTime && k) {
                    var t = p.time.resolveDTLFormat(H.dateTimeLabelFormats[(!H.grid && k.higherRanks[c]) || k.unitName]);
                    var z = t.main;
                }
                h.isFirst = u;
                h.isLast = I;
                h.formatCtx = { axis: g, chart: p, isFirst: u, isLast: I, dateTimeLabelFormat: z, tickPositionInfo: k, value: b ? B(b.lin2log(d)) : d, pos: c };
                H = g.labelFormatter.call(h.formatCtx, this.formatCtx);
                if ((l = t && t.list))
                    h.shortenLabel = function () {
                        for (L = 0; L < l.length; L++) if ((y.attr({ text: g.labelFormatter.call(K(h.formatCtx, { dateTimeLabelFormat: l[L] })) }), y.getBBox().width < g.getSlotWidth(h) - 2 * w(a.padding, 5))) return;
                        y.attr({ text: "" });
                    };
                e && g._addedPlotLB && h.moveLabel(H, a);
                F(y) || h.movedLabel
                    ? y && y.textStr !== H && !e && (!y.textWidth || (a.style && a.style.width) || y.styles.width || y.css({ width: null }), y.attr({ text: H }), (y.textPxLength = y.getBBox().width))
                    : ((h.label = y = h.createLabel({ x: 0, y: 0 }, H, a)), (h.rotation = 0));
            };
            l.prototype.createLabel = function (h, g, H) {
                var p = this.axis,
                    e = p.chart;
                if ((h = F(g) && H.enabled ? e.renderer.text(g, h.x, h.y, H.useHTML).add(p.labelGroup) : null)) e.styledMode || h.css(q(H.style)), (h.textPxLength = h.getBBox().width);
                return h;
            };
            l.prototype.destroy = function () {
                J(this, this.axis);
            };
            l.prototype.getPosition = function (h, g, H, p) {
                var e = this.axis,
                    b = e.chart,
                    d = (p && b.oldChartHeight) || b.chartHeight;
                h = {
                    x: h ? B(e.translate(g + H, null, null, p) + e.transB) : e.left + e.offset + (e.opposite ? ((p && b.oldChartWidth) || b.chartWidth) - e.right - e.left : 0),
                    y: h ? d - e.bottom + e.offset - (e.opposite ? e.height : 0) : B(d - e.translate(g + H, null, null, p) - e.transB),
                };
                h.y = m(h.y, -1e5, 1e5);
                D(this, "afterGetPosition", { pos: h });
                return h;
            };
            l.prototype.getLabelPosition = function (h, g, H, p, e, b, d, c) {
                var a = this.axis,
                    k = a.transA,
                    u = a.isLinked && a.linkedParent ? a.linkedParent.reversed : a.reversed,
                    I = a.staggerLines,
                    y = a.tickRotCorr || { x: 0, y: 0 },
                    L = e.y,
                    l = p || a.reserveSpaceDefault ? 0 : -a.labelOffset * ("center" === a.labelAlign ? 0.5 : 1),
                    t = {};
                F(L) || (L = 0 === a.side ? (H.rotation ? -8 : -H.getBBox().height) : 2 === a.side ? y.y + 8 : Math.cos(H.rotation * G) * (y.y - H.getBBox(!1, 0).height / 2));
                h = h + e.x + l + y.x - (b && p ? b * k * (u ? -1 : 1) : 0);
                g = g + L - (b && !p ? b * k * (u ? 1 : -1) : 0);
                I && ((H = (d / (c || 1)) % I), a.opposite && (H = I - H - 1), (g += (a.labelOffset / I) * H));
                t.x = h;
                t.y = Math.round(g);
                D(this, "afterGetLabelPosition", { pos: t, tickmarkOffset: b, index: d });
                return t;
            };
            l.prototype.getLabelSize = function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0;
            };
            l.prototype.getMarkPath = function (h, g, l, p, e, b) {
                return b.crispLine(
                    [
                        ["M", h, g],
                        ["L", h + (e ? 0 : -l), g + (e ? l : 0)],
                    ],
                    p
                );
            };
            l.prototype.handleOverflow = function (h) {
                var g = this.axis,
                    l = g.options.labels,
                    p = h.x,
                    e = g.chart.chartWidth,
                    b = g.chart.spacing,
                    d = w(g.labelLeft, Math.min(g.pos, b[3]));
                b = w(g.labelRight, Math.max(g.isRadial ? 0 : g.pos + g.len, e - b[1]));
                var c = this.label,
                    a = this.rotation,
                    k = { left: 0, center: 0.5, right: 1 }[g.labelAlign || c.attr("align")],
                    u = c.getBBox().width,
                    I = g.getSlotWidth(this),
                    y = I,
                    L = 1,
                    t,
                    q = {};
                if (a || "justify" !== w(l.overflow, "justify")) 0 > a && p - k * u < d ? (t = Math.round(p / Math.cos(a * G) - d)) : 0 < a && p + k * u > b && (t = Math.round((e - p) / Math.cos(a * G)));
                else if (
                    ((e = p + (1 - k) * u),
                    p - k * u < d ? (y = h.x + y * (1 - k) - d) : e > b && ((y = b - h.x + y * k), (L = -1)),
                    (y = Math.min(I, y)),
                    y < I && "center" === g.labelAlign && (h.x += L * (I - y - k * (I - Math.min(u, y)))),
                    u > y || (g.autoRotation && (c.styles || {}).width))
                )
                    t = y;
                t && (this.shortenLabel ? this.shortenLabel() : ((q.width = Math.floor(t) + "px"), (l.style || {}).textOverflow || (q.textOverflow = "ellipsis"), c.css(q)));
            };
            l.prototype.moveLabel = function (h, g) {
                var l = this,
                    p = l.label,
                    e = !1,
                    b = l.axis,
                    d = b.reversed;
                p && p.textStr === h
                    ? ((l.movedLabel = p), (e = !0), delete l.label)
                    : t(b.ticks, function (a) {
                          e || a.isNew || a === l || !a.label || a.label.textStr !== h || ((l.movedLabel = a.label), (e = !0), (a.labelPos = l.movedLabel.xy), delete a.label);
                      });
                if (!e && (l.labelPos || p)) {
                    var c = l.labelPos || p.xy;
                    p = b.horiz ? (d ? 0 : b.width + b.left) : c.x;
                    b = b.horiz ? c.y : d ? b.width + b.left : 0;
                    l.movedLabel = l.createLabel({ x: p, y: b }, h, g);
                    l.movedLabel && l.movedLabel.attr({ opacity: 0 });
                }
            };
            l.prototype.render = function (h, g, l) {
                var p = this.axis,
                    e = p.horiz,
                    b = this.pos,
                    d = w(this.tickmarkOffset, p.tickmarkOffset);
                b = this.getPosition(e, b, d, g);
                d = b.x;
                var c = b.y;
                p = (e && d === p.pos + p.len) || (!e && c === p.pos) ? -1 : 1;
                l = w(l, 1);
                this.isActive = !0;
                this.renderGridLine(g, l, p);
                this.renderMark(b, l, p);
                this.renderLabel(b, g, l, h);
                this.isNew = !1;
                D(this, "afterRender");
            };
            l.prototype.renderGridLine = function (h, g, l) {
                var p = this.axis,
                    e = p.options,
                    b = this.gridLine,
                    d = {},
                    c = this.pos,
                    a = this.type,
                    k = w(this.tickmarkOffset, p.tickmarkOffset),
                    u = p.chart.renderer,
                    I = a ? a + "Grid" : "grid",
                    y = e[I + "LineWidth"],
                    L = e[I + "LineColor"];
                e = e[I + "LineDashStyle"];
                b ||
                    (p.chart.styledMode || ((d.stroke = L), (d["stroke-width"] = y), e && (d.dashstyle = e)),
                    a || (d.zIndex = 1),
                    h && (g = 0),
                    (this.gridLine = b = u
                        .path()
                        .attr(d)
                        .addClass("RBG_charts-" + (a ? a + "-" : "") + "grid-line")
                        .add(p.gridGroup)));
                if (b && (l = p.getPlotLinePath({ value: c + k, lineWidth: b.strokeWidth() * l, force: "pass", old: h }))) b[h || this.isNew ? "attr" : "animate"]({ d: l, opacity: g });
            };
            l.prototype.renderMark = function (h, g, l) {
                var p = this.axis,
                    e = p.options,
                    b = p.chart.renderer,
                    d = this.type,
                    c = d ? d + "Tick" : "tick",
                    a = p.tickSize(c),
                    k = this.mark,
                    u = !k,
                    I = h.x;
                h = h.y;
                var y = w(e[c + "Width"], !d && p.isXAxis ? 1 : 0);
                e = e[c + "Color"];
                a &&
                    (p.opposite && (a[0] = -a[0]),
                    u &&
                        ((this.mark = k = b
                            .path()
                            .addClass("RBG_charts-" + (d ? d + "-" : "") + "tick")
                            .add(p.axisGroup)),
                        p.chart.styledMode || k.attr({ stroke: e, "stroke-width": y })),
                    k[u ? "attr" : "animate"]({ d: this.getMarkPath(I, h, a[0], k.strokeWidth() * l, p.horiz, b), opacity: g }));
            };
            l.prototype.renderLabel = function (h, g, l, p) {
                var e = this.axis,
                    b = e.horiz,
                    d = e.options,
                    c = this.label,
                    a = d.labels,
                    k = a.step;
                e = w(this.tickmarkOffset, e.tickmarkOffset);
                var u = !0,
                    I = h.x;
                h = h.y;
                c &&
                    x(I) &&
                    ((c.xy = h = this.getLabelPosition(I, h, c, b, a, e, p, k)),
                    (this.isFirst && !this.isLast && !w(d.showFirstLabel, 1)) || (this.isLast && !this.isFirst && !w(d.showLastLabel, 1)) ? (u = !1) : !b || a.step || a.rotation || g || 0 === l || this.handleOverflow(h),
                    k && p % k && (u = !1),
                    u && x(h.y) ? ((h.opacity = l), c[this.isNewLabel ? "attr" : "animate"](h), (this.isNewLabel = !1)) : (c.attr("y", -9999), (this.isNewLabel = !0)));
            };
            l.prototype.replaceMovedLabel = function () {
                var h = this.label,
                    g = this.axis,
                    l = g.reversed;
                if (h && !this.isNew) {
                    var p = g.horiz ? (l ? g.left : g.width + g.left) : h.xy.x;
                    l = g.horiz ? h.xy.y : l ? g.width + g.top : g.top;
                    h.animate({ x: p, y: l, opacity: 0 }, void 0, h.destroy);
                    delete this.label;
                }
                g.isDirty = !0;
                this.label = this.movedLabel;
                delete this.movedLabel;
            };
            return l;
        })();
        v.Tick = n;
        return v.Tick;
    });
    O(m, "Core/Time.js", [m["Core/Globals.js"], m["Core/Utilities.js"]], function (v, n) {
        var m = n.defined,
            B = n.error,
            F = n.extend,
            J = n.isObject,
            K = n.merge,
            D = n.objectEach,
            x = n.pad,
            q = n.pick,
            t = n.splat,
            w = n.timeUnits,
            G = v.win;
        n = (function () {
            function l(h) {
                this.options = {};
                this.variableTimezone = this.useUTC = !1;
                this.Date = G.Date;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.update(h);
            }
            l.prototype.get = function (h, g) {
                if (this.variableTimezone || this.timezoneOffset) {
                    var l = g.getTime(),
                        p = l - this.getTimezoneOffset(g);
                    g.setTime(p);
                    h = g["getUTC" + h]();
                    g.setTime(l);
                    return h;
                }
                return this.useUTC ? g["getUTC" + h]() : g["get" + h]();
            };
            l.prototype.set = function (h, g, l) {
                if (this.variableTimezone || this.timezoneOffset) {
                    if ("Milliseconds" === h || "Seconds" === h || "Minutes" === h) return g["setUTC" + h](l);
                    var p = this.getTimezoneOffset(g);
                    p = g.getTime() - p;
                    g.setTime(p);
                    g["setUTC" + h](l);
                    h = this.getTimezoneOffset(g);
                    p = g.getTime() + h;
                    return g.setTime(p);
                }
                return this.useUTC ? g["setUTC" + h](l) : g["set" + h](l);
            };
            l.prototype.update = function (h) {
                var g = q(h && h.useUTC, !0);
                this.options = h = K(!0, this.options || {}, h);
                this.Date = h.Date || G.Date || Date;
                this.timezoneOffset = (this.useUTC = g) && h.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.variableTimezone = !(g && !h.getTimezoneOffset && !h.timezone);
            };
            l.prototype.makeTime = function (h, g, l, p, e, b) {
                if (this.useUTC) {
                    var d = this.Date.UTC.apply(0, arguments);
                    var c = this.getTimezoneOffset(d);
                    d += c;
                    var a = this.getTimezoneOffset(d);
                    c !== a ? (d += a - c) : c - 36e5 !== this.getTimezoneOffset(d - 36e5) || v.isSafari || (d -= 36e5);
                } else d = new this.Date(h, g, q(l, 1), q(p, 0), q(e, 0), q(b, 0)).getTime();
                return d;
            };
            l.prototype.timezoneOffsetFunction = function () {
                var h = this,
                    g = this.options,
                    l = g.moment || G.moment;
                if (!this.useUTC)
                    return function (g) {
                        return 6e4 * new Date(g.toString()).getTimezoneOffset();
                    };
                if (g.timezone) {
                    if (l)
                        return function (p) {
                            return 6e4 * -l.tz(p, g.timezone).utcOffset();
                        };
                    B(25);
                }
                return this.useUTC && g.getTimezoneOffset
                    ? function (p) {
                          return 6e4 * g.getTimezoneOffset(p.valueOf());
                      }
                    : function () {
                          return 6e4 * (h.timezoneOffset || 0);
                      };
            };
            l.prototype.dateFormat = function (h, g, l) {
                var p;
                if (!m(g) || isNaN(g)) return (null === (p = v.defaultOptions.lang) || void 0 === p ? void 0 : p.invalidDate) || "";
                h = q(h, "%Y-%m-%d %H:%M:%S");
                var e = this;
                p = new this.Date(g);
                var b = this.get("Hours", p),
                    d = this.get("Day", p),
                    c = this.get("Date", p),
                    a = this.get("Month", p),
                    k = this.get("FullYear", p),
                    u = v.defaultOptions.lang,
                    I = null === u || void 0 === u ? void 0 : u.weekdays,
                    y = null === u || void 0 === u ? void 0 : u.shortWeekdays;
                p = F(
                    {
                        a: y ? y[d] : I[d].substr(0, 3),
                        A: I[d],
                        d: x(c),
                        e: x(c, 2, " "),
                        w: d,
                        b: u.shortMonths[a],
                        B: u.months[a],
                        m: x(a + 1),
                        o: a + 1,
                        y: k.toString().substr(2, 2),
                        Y: k,
                        H: x(b),
                        k: b,
                        I: x(b % 12 || 12),
                        l: b % 12 || 12,
                        M: x(this.get("Minutes", p)),
                        p: 12 > b ? "AM" : "PM",
                        P: 12 > b ? "am" : "pm",
                        S: x(p.getSeconds()),
                        L: x(Math.floor(g % 1e3), 3),
                    },
                    v.dateFormats
                );
                D(p, function (a, b) {
                    for (; -1 !== h.indexOf("%" + b); ) h = h.replace("%" + b, "function" === typeof a ? a.call(e, g) : a);
                });
                return l ? h.substr(0, 1).toUpperCase() + h.substr(1) : h;
            };
            l.prototype.resolveDTLFormat = function (h) {
                return J(h, !0) ? h : ((h = t(h)), { main: h[0], from: h[1], to: h[2] });
            };
            l.prototype.getTimeTicks = function (h, g, l, p) {
                var e = this,
                    b = [],
                    d = {};
                var c = new e.Date(g);
                var a = h.unitRange,
                    k = h.count || 1,
                    u;
                p = q(p, 1);
                if (m(g)) {
                    e.set("Milliseconds", c, a >= w.second ? 0 : k * Math.floor(e.get("Milliseconds", c) / k));
                    a >= w.second && e.set("Seconds", c, a >= w.minute ? 0 : k * Math.floor(e.get("Seconds", c) / k));
                    a >= w.minute && e.set("Minutes", c, a >= w.hour ? 0 : k * Math.floor(e.get("Minutes", c) / k));
                    a >= w.hour && e.set("Hours", c, a >= w.day ? 0 : k * Math.floor(e.get("Hours", c) / k));
                    a >= w.day && e.set("Date", c, a >= w.month ? 1 : Math.max(1, k * Math.floor(e.get("Date", c) / k)));
                    if (a >= w.month) {
                        e.set("Month", c, a >= w.year ? 0 : k * Math.floor(e.get("Month", c) / k));
                        var I = e.get("FullYear", c);
                    }
                    a >= w.year && e.set("FullYear", c, I - (I % k));
                    a === w.week && ((I = e.get("Day", c)), e.set("Date", c, e.get("Date", c) - I + p + (I < p ? -7 : 0)));
                    I = e.get("FullYear", c);
                    p = e.get("Month", c);
                    var y = e.get("Date", c),
                        L = e.get("Hours", c);
                    g = c.getTime();
                    e.variableTimezone && (u = l - g > 4 * w.month || e.getTimezoneOffset(g) !== e.getTimezoneOffset(l));
                    g = c.getTime();
                    for (c = 1; g < l; )
                        b.push(g),
                            (g =
                                a === w.year
                                    ? e.makeTime(I + c * k, 0)
                                    : a === w.month
                                    ? e.makeTime(I, p + c * k)
                                    : !u || (a !== w.day && a !== w.week)
                                    ? u && a === w.hour && 1 < k
                                        ? e.makeTime(I, p, y, L + c * k)
                                        : g + a * k
                                    : e.makeTime(I, p, y + c * k * (a === w.day ? 1 : 7))),
                            c++;
                    b.push(g);
                    a <= w.hour &&
                        1e4 > b.length &&
                        b.forEach(function (a) {
                            0 === a % 18e5 && "000000000" === e.dateFormat("%H%M%S%L", a) && (d[a] = "day");
                        });
                }
                b.info = F(h, { higherRanks: d, totalRange: a * k });
                return b;
            };
            return l;
        })();
        v.Time = n;
        return v.Time;
    });
    O(m, "Core/Options.js", [m["Core/Globals.js"], m["Core/Color/Color.js"], m["Core/Time.js"], m["Core/Utilities.js"]], function (v, n, m, B) {
        var F = v.isTouchDevice,
            M = v.svg;
        n = n.parse;
        B = B.merge;
        ("");
        v.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " ",
            },
            global: {},
            time: { Date: void 0, getTimezoneOffset: void 0, timezone: void 0, timezoneOffset: 0, useUTC: !0 },
            chart: {
                styledMode: !1,
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc",
            },
            title: { text: "Chart title", align: "center", margin: 15, widthAdjust: -44 },
            subtitle: { text: "", align: "center", widthAdjust: -44 },
            caption: { margin: 15, text: "", align: "left", verticalAlign: "bottom" },
            plotOptions: {},
            labels: { style: { position: "absolute", color: "#333333" } },
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name;
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: { activeColor: "#003399", inactiveColor: "#cccccc" },
                itemStyle: { color: "#333333", cursor: "pointer", fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis" },
                itemHoverStyle: { color: "#000000" },
                itemHiddenStyle: { color: "#cccccc" },
                shadow: !1,
                itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: { style: { fontWeight: "bold" } },
            },
            loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: 0.5, textAlign: "center" } },
            tooltip: {
                enabled: !0,
                animation: M,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y",
                },
                footerFormat: "",
                padding: 8,
                snap: F ? 25 : 10,
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                backgroundColor: n("#f7f7f7").setOpacity(0.85).get(),
                borderWidth: 1,
                shadow: !0,
                style: { color: "#333333", cursor: "default", fontSize: "12px", whiteSpace: "nowrap" },
            },
            credits: { enabled: !0, href: "mailto:g.ravindra@tatamotors.com", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "9px" }, text: "Gantt Chart UX Developed by Ravindra Gaikwad" },
        };
        ("");
        v.time = new m(B(v.defaultOptions.global, v.defaultOptions.time));
        v.dateFormat = function (n, m, x) {
            return v.time.dateFormat(n, m, x);
        };
        return { dateFormat: v.dateFormat, defaultOptions: v.defaultOptions, time: v.time };
    });
    O(m, "Core/Axis/Axis.js", [m["Core/Animation/AnimationUtilities.js"], m["Core/Color/Color.js"], m["Core/Globals.js"], m["Core/Axis/Tick.js"], m["Core/Utilities.js"], m["Core/Options.js"]], function (v, n, m, B, F, J) {
        var K = v.animObject,
            D = F.addEvent,
            x = F.arrayMax,
            q = F.arrayMin,
            t = F.clamp,
            w = F.correctFloat,
            G = F.defined,
            l = F.destroyObjectProperties,
            h = F.error,
            g = F.extend,
            H = F.fireEvent,
            p = F.format,
            e = F.getMagnitude,
            b = F.isArray,
            d = F.isFunction,
            c = F.isNumber,
            a = F.isString,
            k = F.merge,
            u = F.normalizeTickInterval,
            I = F.objectEach,
            y = F.pick,
            L = F.relativeLength,
            P = F.removeEvent,
            Q = F.splat,
            z = F.syncTimeout,
            E = J.defaultOptions,
            C = m.deg2rad;
        v = (function () {
            function A(f, a) {
                this.zoomEnabled = this.width = this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks = this.overlap = this.options = this.oldMin = this.oldMax = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max = this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.coll = this.closestPointRange = this.chart = this.categories = this.bottom = this.alternateBands = void 0;
                this.init(f, a);
            }
            A.prototype.init = function (f, a) {
                var r = a.isX,
                    b = this;
                b.chart = f;
                b.horiz = f.inverted && !b.isZAxis ? !r : r;
                b.isXAxis = r;
                b.coll = b.coll || (r ? "xAxis" : "yAxis");
                H(this, "init", { userOptions: a });
                b.opposite = a.opposite;
                b.side = a.side || (b.horiz ? (b.opposite ? 0 : 2) : b.opposite ? 1 : 3);
                b.setOptions(a);
                var c = this.options,
                    k = c.type;
                b.labelFormatter = c.labels.formatter || b.defaultLabelFormatter;
                b.userOptions = a;
                b.minPixelPadding = 0;
                b.reversed = c.reversed;
                b.visible = !1 !== c.visible;
                b.zoomEnabled = !1 !== c.zoomEnabled;
                b.hasNames = "category" === k || !0 === c.categories;
                b.categories = c.categories || b.hasNames;
                b.names || ((b.names = []), (b.names.keys = {}));
                b.plotLinesAndBandsGroups = {};
                b.positiveValuesOnly = !!b.logarithmic;
                b.isLinked = G(c.linkedTo);
                b.ticks = {};
                b.labelEdge = [];
                b.minorTicks = {};
                b.plotLinesAndBands = [];
                b.alternateBands = {};
                b.len = 0;
                b.minRange = b.userMinRange = c.minRange || c.maxZoom;
                b.range = c.range;
                b.offset = c.offset || 0;
                b.max = null;
                b.min = null;
                b.crosshair = y(c.crosshair, Q(f.options.tooltip.crosshairs)[r ? 0 : 1], !1);
                a = b.options.events;
                -1 === f.axes.indexOf(b) && (r ? f.axes.splice(f.xAxis.length, 0, b) : f.axes.push(b), f[b.coll].push(b));
                b.series = b.series || [];
                f.inverted && !b.isZAxis && r && "undefined" === typeof b.reversed && (b.reversed = !0);
                b.labelRotation = b.options.labels.rotation;
                I(a, function (f, a) {
                    d(f) && D(b, a, f);
                });
                H(this, "afterInit");
            };
            A.prototype.setOptions = function (f) {
                this.options = k(A.defaultOptions, "yAxis" === this.coll && A.defaultYAxisOptions, [A.defaultTopAxisOptions, A.defaultRightAxisOptions, A.defaultBottomAxisOptions, A.defaultLeftAxisOptions][this.side], k(E[this.coll], f));
                H(this, "afterSetOptions", { userOptions: f });
            };
            A.prototype.defaultLabelFormatter = function () {
                var f = this.axis,
                    a = c(this.value) ? this.value : NaN,
                    b = f.chart.time,
                    d = f.categories,
                    k = this.dateTimeLabelFormat,
                    u = E.lang,
                    e = u.numericSymbols;
                u = u.numericSymbolMagnitude || 1e3;
                var y = e && e.length,
                    g = f.options.labels.format;
                f = f.logarithmic ? Math.abs(a) : f.tickInterval;
                var I = this.chart,
                    z = I.numberFormatter;
                if (g) var C = p(g, this, I);
                else if (d) C = "" + this.value;
                else if (k) C = b.dateFormat(k, a);
                else if (y && 1e3 <= f) for (; y-- && "undefined" === typeof C; ) (b = Math.pow(u, y + 1)), f >= b && 0 === (10 * a) % b && null !== e[y] && 0 !== a && (C = z(a / b, -1) + e[y]);
                "undefined" === typeof C && (C = 1e4 <= Math.abs(a) ? z(a, -1) : z(a, -1, void 0, ""));
                return C;
            };
            A.prototype.getSeriesExtremes = function () {
                var f = this,
                    a = f.chart,
                    b;
                H(this, "getSeriesExtremes", null, function () {
                    f.hasVisibleSeries = !1;
                    f.dataMin = f.dataMax = f.threshold = null;
                    f.softThreshold = !f.isXAxis;
                    f.stacking && f.stacking.buildStacks();
                    f.series.forEach(function (r) {
                        if (r.visible || !a.options.chart.ignoreHiddenSeries) {
                            var d = r.options,
                                k = d.threshold;
                            f.hasVisibleSeries = !0;
                            f.positiveValuesOnly && 0 >= k && (k = null);
                            if (f.isXAxis) {
                                if (((d = r.xData), d.length)) {
                                    d = f.logarithmic ? d.filter(f.validatePositiveValue) : d;
                                    b = r.getXExtremes(d);
                                    var u = b.min;
                                    var e = b.max;
                                    c(u) || u instanceof Date || ((d = d.filter(c)), (b = r.getXExtremes(d)), (u = b.min), (e = b.max));
                                    d.length && ((f.dataMin = Math.min(y(f.dataMin, u), u)), (f.dataMax = Math.max(y(f.dataMax, e), e)));
                                }
                            } else if (
                                ((r = r.applyExtremes()),
                                c(r.dataMin) && ((u = r.dataMin), (f.dataMin = Math.min(y(f.dataMin, u), u))),
                                c(r.dataMax) && ((e = r.dataMax), (f.dataMax = Math.max(y(f.dataMax, e), e))),
                                G(k) && (f.threshold = k),
                                !d.softThreshold || f.positiveValuesOnly)
                            )
                                f.softThreshold = !1;
                        }
                    });
                });
                H(this, "afterGetSeriesExtremes");
            };
            A.prototype.translate = function (f, a, b, d, k, u) {
                var r = this.linkedParent || this,
                    e = 1,
                    N = 0,
                    y = d ? r.oldTransA : r.transA;
                d = d ? r.oldMin : r.min;
                var g = r.minPixelPadding;
                k = (r.isOrdinal || (r.brokenAxis && r.brokenAxis.hasBreaks) || (r.logarithmic && k)) && r.lin2val;
                y || (y = r.transA);
                b && ((e *= -1), (N = r.len));
                r.reversed && ((e *= -1), (N -= e * (r.sector || r.len)));
                a ? ((f = (f * e + N - g) / y + d), k && (f = r.lin2val(f))) : (k && (f = r.val2lin(f)), (f = c(d) ? e * (f - d) * y + N + e * g + (c(u) ? y * u : 0) : void 0));
                return f;
            };
            A.prototype.toPixels = function (f, a) {
                return this.translate(f, !1, !this.horiz, null, !0) + (a ? 0 : this.pos);
            };
            A.prototype.toValue = function (f, a) {
                return this.translate(f - (a ? 0 : this.pos), !0, !this.horiz, null, !0);
            };
            A.prototype.getPlotLinePath = function (f) {
                function a(f, a, r) {
                    if (("pass" !== z && f < a) || f > r) z ? (f = t(f, a, r)) : (w = !0);
                    return f;
                }
                var b = this,
                    d = b.chart,
                    k = b.left,
                    u = b.top,
                    e = f.old,
                    g = f.value,
                    I = f.translatedValue,
                    E = f.lineWidth,
                    z = f.force,
                    C,
                    p,
                    A,
                    h,
                    l = (e && d.oldChartHeight) || d.chartHeight,
                    L = (e && d.oldChartWidth) || d.chartWidth,
                    w,
                    q = b.transB;
                f = { value: g, lineWidth: E, old: e, force: z, acrossPanes: f.acrossPanes, translatedValue: I };
                H(this, "getPlotLinePath", f, function (f) {
                    I = y(I, b.translate(g, null, null, e));
                    I = t(I, -1e5, 1e5);
                    C = A = Math.round(I + q);
                    p = h = Math.round(l - I - q);
                    c(I) ? (b.horiz ? ((p = u), (h = l - b.bottom), (C = A = a(C, k, k + b.width))) : ((C = k), (A = L - b.right), (p = h = a(p, u, u + b.height)))) : ((w = !0), (z = !1));
                    f.path =
                        w && !z
                            ? null
                            : d.renderer.crispLine(
                                  [
                                      ["M", C, p],
                                      ["L", A, h],
                                  ],
                                  E || 1
                              );
                });
                return f.path;
            };
            A.prototype.getLinearTickPositions = function (f, a, b) {
                var r = w(Math.floor(a / f) * f);
                b = w(Math.ceil(b / f) * f);
                var c = [],
                    d;
                w(r + f) === r && (d = 20);
                if (this.single) return [a];
                for (a = r; a <= b; ) {
                    c.push(a);
                    a = w(a + f, d);
                    if (a === k) break;
                    var k = a;
                }
                return c;
            };
            A.prototype.getMinorTickInterval = function () {
                var f = this.options;
                return !0 === f.minorTicks ? y(f.minorTickInterval, "auto") : !1 === f.minorTicks ? null : f.minorTickInterval;
            };
            A.prototype.getMinorTickPositions = function () {
                var f = this.options,
                    a = this.tickPositions,
                    b = this.minorTickInterval,
                    c = [],
                    d = this.pointRangePadding || 0,
                    k = this.min - d;
                d = this.max + d;
                var u = d - k;
                if (u && u / b < this.len / 3) {
                    var e = this.logarithmic;
                    if (e)
                        this.paddedTicks.forEach(function (f, a, r) {
                            a && c.push.apply(c, e.getLogTickPositions(b, r[a - 1], r[a], !0));
                        });
                    else if (this.dateTime && "auto" === this.getMinorTickInterval()) c = c.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(b), k, d, f.startOfWeek));
                    else for (f = k + ((a[0] - k) % b); f <= d && f !== c[0]; f += b) c.push(f);
                }
                0 !== c.length && this.trimTicks(c);
                return c;
            };
            A.prototype.adjustForMinRange = function () {
                var f = this.options,
                    a = this.min,
                    b = this.max,
                    c = this.logarithmic,
                    d,
                    k,
                    u,
                    e,
                    g;
                this.isXAxis &&
                    "undefined" === typeof this.minRange &&
                    !c &&
                    (G(f.min) || G(f.max)
                        ? (this.minRange = null)
                        : (this.series.forEach(function (f) {
                              e = f.xData;
                              for (k = g = f.xIncrement ? 1 : e.length - 1; 0 < k; k--) if (((u = e[k] - e[k - 1]), "undefined" === typeof d || u < d)) d = u;
                          }),
                          (this.minRange = Math.min(5 * d, this.dataMax - this.dataMin))));
                if (b - a < this.minRange) {
                    var I = this.dataMax - this.dataMin >= this.minRange;
                    var E = this.minRange;
                    var z = (E - b + a) / 2;
                    z = [a - z, y(f.min, a - z)];
                    I && (z[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) : this.dataMin);
                    a = x(z);
                    b = [a + E, y(f.max, a + E)];
                    I && (b[2] = c ? c.log2lin(this.dataMax) : this.dataMax);
                    b = q(b);
                    b - a < E && ((z[0] = b - E), (z[1] = y(f.min, b - E)), (a = x(z)));
                }
                this.min = a;
                this.max = b;
            };
            A.prototype.getClosest = function () {
                var f;
                this.categories
                    ? (f = 1)
                    : this.series.forEach(function (a) {
                          var b = a.closestPointRange,
                              r = a.visible || !a.chart.options.chart.ignoreHiddenSeries;
                          !a.noSharedTooltip && G(b) && r && (f = G(f) ? Math.min(f, b) : b);
                      });
                return f;
            };
            A.prototype.nameToX = function (f) {
                var a = b(this.categories),
                    c = a ? this.categories : this.names,
                    d = f.options.x;
                f.series.requireSorting = !1;
                G(d) || (d = !1 === this.options.uniqueNames ? f.series.autoIncrement() : a ? c.indexOf(f.name) : y(c.keys[f.name], -1));
                if (-1 === d) {
                    if (!a) var k = c.length;
                } else k = d;
                "undefined" !== typeof k && ((this.names[k] = f.name), (this.names.keys[f.name] = k));
                return k;
            };
            A.prototype.updateNames = function () {
                var f = this,
                    a = this.names;
                0 < a.length &&
                    (Object.keys(a.keys).forEach(function (f) {
                        delete a.keys[f];
                    }),
                    (a.length = 0),
                    (this.minRange = this.userMinRange),
                    (this.series || []).forEach(function (a) {
                        a.xIncrement = null;
                        if (!a.points || a.isDirtyData) (f.max = Math.max(f.max, a.xData.length - 1)), a.processData(), a.generatePoints();
                        a.data.forEach(function (b, r) {
                            if (b && b.options && "undefined" !== typeof b.name) {
                                var c = f.nameToX(b);
                                "undefined" !== typeof c && c !== b.x && ((b.x = c), (a.xData[r] = c));
                            }
                        });
                    }));
            };
            A.prototype.setAxisTranslation = function (f) {
                var b = this,
                    c = b.max - b.min,
                    d = b.axisPointRange || 0,
                    k = 0,
                    u = 0,
                    e = b.linkedParent,
                    g = !!b.categories,
                    I = b.transA,
                    E = b.isXAxis;
                if (E || g || d) {
                    var z = b.getClosest();
                    e
                        ? ((k = e.minPointOffset), (u = e.pointRangePadding))
                        : b.series.forEach(function (f) {
                              var r = g ? 1 : E ? y(f.options.pointRange, z, 0) : b.axisPointRange || 0,
                                  c = f.options.pointPlacement;
                              d = Math.max(d, r);
                              if (!b.single || g) (f = f.is("xrange") ? !E : E), (k = Math.max(k, f && a(c) ? 0 : r / 2)), (u = Math.max(u, f && "on" === c ? 0 : r));
                          });
                    e = b.ordinal && b.ordinal.slope && z ? b.ordinal.slope / z : 1;
                    b.minPointOffset = k *= e;
                    b.pointRangePadding = u *= e;
                    b.pointRange = Math.min(d, b.single && g ? 1 : c);
                    E && (b.closestPointRange = z);
                }
                f && (b.oldTransA = I);
                b.translationSlope = b.transA = I = b.staticScale || b.len / (c + u || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = I * k;
                H(this, "afterSetAxisTranslation");
            };
            A.prototype.minFromRange = function () {
                return this.max - this.range;
            };
            A.prototype.setTickInterval = function (f) {
                var a = this,
                    b = a.chart,
                    d = a.logarithmic,
                    k = a.options,
                    g = a.isXAxis,
                    I = a.isLinked,
                    E = k.maxPadding,
                    z = k.minPadding,
                    C = k.tickInterval,
                    p = k.tickPixelInterval,
                    A = a.categories,
                    l = c(a.threshold) ? a.threshold : null,
                    L = a.softThreshold;
                a.dateTime || A || I || this.getTickAmount();
                var t = y(a.userMin, k.min);
                var q = y(a.userMax, k.max);
                if (I) {
                    a.linkedParent = b[a.coll][k.linkedTo];
                    var Q = a.linkedParent.getExtremes();
                    a.min = y(Q.min, Q.dataMin);
                    a.max = y(Q.max, Q.dataMax);
                    k.type !== a.linkedParent.options.type && h(11, 1, b);
                } else {
                    if (L && G(l))
                        if (a.dataMin >= l) (Q = l), (z = 0);
                        else if (a.dataMax <= l) {
                            var P = l;
                            E = 0;
                        }
                    a.min = y(t, Q, a.dataMin);
                    a.max = y(q, P, a.dataMax);
                }
                d && (a.positiveValuesOnly && !f && 0 >= Math.min(a.min, y(a.dataMin, a.min)) && h(10, 1, b), (a.min = w(d.log2lin(a.min), 16)), (a.max = w(d.log2lin(a.max), 16)));
                a.range && G(a.max) && ((a.userMin = a.min = t = Math.max(a.dataMin, a.minFromRange())), (a.userMax = q = a.max), (a.range = null));
                H(a, "foundExtremes");
                a.beforePadding && a.beforePadding();
                a.adjustForMinRange();
                !(A || a.axisPointRange || (a.stacking && a.stacking.usePercentage) || I) && G(a.min) && G(a.max) && (b = a.max - a.min) && (!G(t) && z && (a.min -= b * z), !G(q) && E && (a.max += b * E));
                c(a.userMin) || (c(k.softMin) && k.softMin < a.min && (a.min = t = k.softMin), c(k.floor) && (a.min = Math.max(a.min, k.floor)));
                c(a.userMax) || (c(k.softMax) && k.softMax > a.max && (a.max = q = k.softMax), c(k.ceiling) && (a.max = Math.min(a.max, k.ceiling)));
                L &&
                    G(a.dataMin) &&
                    ((l = l || 0),
                    !G(t) && a.min < l && a.dataMin >= l ? (a.min = a.options.minRange ? Math.min(l, a.max - a.minRange) : l) : !G(q) && a.max > l && a.dataMax <= l && (a.max = a.options.minRange ? Math.max(l, a.min + a.minRange) : l));
                a.tickInterval =
                    a.min === a.max || "undefined" === typeof a.min || "undefined" === typeof a.max
                        ? 1
                        : I && !C && p === a.linkedParent.options.tickPixelInterval
                        ? (C = a.linkedParent.tickInterval)
                        : y(C, this.tickAmount ? (a.max - a.min) / Math.max(this.tickAmount - 1, 1) : void 0, A ? 1 : ((a.max - a.min) * p) / Math.max(a.len, p));
                g &&
                    !f &&
                    a.series.forEach(function (f) {
                        f.processData(a.min !== a.oldMin || a.max !== a.oldMax);
                    });
                a.setAxisTranslation(!0);
                H(this, "initialAxisTranslation");
                a.pointRange && !C && (a.tickInterval = Math.max(a.pointRange, a.tickInterval));
                f = y(
                    k.minTickInterval,
                    a.dateTime &&
                        !a.series.some(function (a) {
                            return a.noSharedTooltip;
                        })
                        ? a.closestPointRange
                        : 0
                );
                !C && a.tickInterval < f && (a.tickInterval = f);
                a.dateTime || a.logarithmic || C || (a.tickInterval = u(a.tickInterval, void 0, e(a.tickInterval), y(k.allowDecimals, 0.5 > a.tickInterval || void 0 !== this.tickAmount), !!this.tickAmount));
                this.tickAmount || (a.tickInterval = a.unsquish());
                this.setTickPositions();
            };
            A.prototype.setTickPositions = function () {
                var a = this.options,
                    b = a.tickPositions;
                var c = this.getMinorTickInterval();
                var d = a.tickPositioner,
                    k = this.hasVerticalPanning(),
                    u = "colorAxis" === this.coll,
                    e = (u || !k) && a.startOnTick;
                k = (u || !k) && a.endOnTick;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? 0.5 : 0;
                this.minorTickInterval = "auto" === c && this.tickInterval ? this.tickInterval / 5 : c;
                this.single = this.min === this.max && G(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = c = b && b.slice();
                !c &&
                    ((this.ordinal && this.ordinal.positions) || !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200))
                        ? (c = this.dateTime
                              ? this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinal && this.ordinal.positions, this.closestPointRange, !0)
                              : this.logarithmic
                              ? this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max)
                              : this.getLinearTickPositions(this.tickInterval, this.min, this.max))
                        : ((c = [this.min, this.max]), h(19, !1, this.chart)),
                    c.length > this.len && ((c = [c[0], c.pop()]), c[0] === c[1] && (c.length = 1)),
                    (this.tickPositions = c),
                    d && (d = d.apply(this, [this.min, this.max]))) &&
                    (this.tickPositions = c = d);
                this.paddedTicks = c.slice(0);
                this.trimTicks(c, e, k);
                this.isLinked ||
                    (this.single &&
                        2 > c.length &&
                        !this.categories &&
                        !this.series.some(function (a) {
                            return a.is("heatmap") && "between" === a.options.pointPlacement;
                        }) &&
                        ((this.min -= 0.5), (this.max += 0.5)),
                    b || d || this.adjustTickAmount());
                H(this, "afterSetTickPositions");
            };
            A.prototype.trimTicks = function (a, b, c) {
                var f = a[0],
                    r = a[a.length - 1],
                    d = (!this.isOrdinal && this.minPointOffset) || 0;
                H(this, "trimTicks");
                if (!this.isLinked) {
                    if (b && -Infinity !== f) this.min = f;
                    else for (; this.min - d > a[0]; ) a.shift();
                    if (c) this.max = r;
                    else for (; this.max + d < a[a.length - 1]; ) a.pop();
                    0 === a.length && G(f) && !this.options.tickPositions && a.push((r + f) / 2);
                }
            };
            A.prototype.alignToOthers = function () {
                var a = {},
                    b,
                    c = this.options;
                !1 === this.chart.options.chart.alignTicks ||
                    !1 === c.alignTicks ||
                    !1 === c.startOnTick ||
                    !1 === c.endOnTick ||
                    this.logarithmic ||
                    this.chart[this.coll].forEach(function (f) {
                        var c = f.options;
                        c = [f.horiz ? c.left : c.top, c.width, c.height, c.pane].join();
                        f.series.length && (a[c] ? (b = !0) : (a[c] = 1));
                    });
                return b;
            };
            A.prototype.getTickAmount = function () {
                var a = this.options,
                    b = a.tickAmount,
                    c = a.tickPixelInterval;
                !G(a.tickInterval) && !b && this.len < c && !this.isRadial && !this.logarithmic && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);
                4 > b && ((this.finalTickAmt = b), (b = 5));
                this.tickAmount = b;
            };
            A.prototype.adjustTickAmount = function () {
                var a = this.options,
                    b = this.tickInterval,
                    c = this.tickPositions,
                    d = this.tickAmount,
                    k = this.finalTickAmt,
                    u = c && c.length,
                    e = y(this.threshold, this.softThreshold ? 0 : null),
                    g;
                if (this.hasData()) {
                    if (u < d) {
                        for (g = this.min; c.length < d; ) c.length % 2 || g === e ? c.push(w(c[c.length - 1] + b)) : c.unshift(w(c[0] - b));
                        this.transA *= (u - 1) / (d - 1);
                        this.min = a.startOnTick ? c[0] : Math.min(this.min, c[0]);
                        this.max = a.endOnTick ? c[c.length - 1] : Math.max(this.max, c[c.length - 1]);
                    } else u > d && ((this.tickInterval *= 2), this.setTickPositions());
                    if (G(k)) {
                        for (b = a = c.length; b--; ) ((3 === k && 1 === b % 2) || (2 >= k && 0 < b && b < a - 1)) && c.splice(b, 1);
                        this.finalTickAmt = void 0;
                    }
                }
            };
            A.prototype.setScale = function () {
                var a,
                    b = !1,
                    c = !1;
                this.series.forEach(function (a) {
                    var f;
                    b = b || a.isDirtyData || a.isDirty;
                    c = c || (null === (f = a.xAxis) || void 0 === f ? void 0 : f.isDirty) || !1;
                });
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                (a = this.len !== this.oldAxisLength) || b || c || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers()
                    ? (this.stacking && this.stacking.resetStacks(),
                      (this.forceRedraw = !1),
                      this.getSeriesExtremes(),
                      this.setTickInterval(),
                      (this.oldUserMin = this.userMin),
                      (this.oldUserMax = this.userMax),
                      this.isDirty || (this.isDirty = a || this.min !== this.oldMin || this.max !== this.oldMax))
                    : this.stacking && this.stacking.cleanStacks();
                b && this.panningState && (this.panningState.isDirty = !0);
                H(this, "afterSetScale");
            };
            A.prototype.setExtremes = function (a, b, c, d, k) {
                var f = this,
                    r = f.chart;
                c = y(c, !0);
                f.series.forEach(function (a) {
                    delete a.kdTree;
                });
                k = g(k, { min: a, max: b });
                H(f, "setExtremes", k, function () {
                    f.userMin = a;
                    f.userMax = b;
                    f.eventArgs = k;
                    c && r.redraw(d);
                });
            };
            A.prototype.zoom = function (a, b) {
                var f = this,
                    c = this.dataMin,
                    d = this.dataMax,
                    r = this.options,
                    k = Math.min(c, y(r.min, c)),
                    u = Math.max(d, y(r.max, d));
                a = { newMin: a, newMax: b };
                H(this, "zoom", a, function (a) {
                    var b = a.newMin,
                        r = a.newMax;
                    if (b !== f.min || r !== f.max)
                        f.allowZoomOutside || (G(c) && (b < k && (b = k), b > u && (b = u)), G(d) && (r < k && (r = k), r > u && (r = u))),
                            (f.displayBtn = "undefined" !== typeof b || "undefined" !== typeof r),
                            f.setExtremes(b, r, !1, void 0, { trigger: "zoom" });
                    a.zoomed = !0;
                });
                return a.zoomed;
            };
            A.prototype.setAxisSize = function () {
                var a = this.chart,
                    b = this.options,
                    c = b.offsets || [0, 0, 0, 0],
                    d = this.horiz,
                    k = (this.width = Math.round(L(y(b.width, a.plotWidth - c[3] + c[1]), a.plotWidth))),
                    u = (this.height = Math.round(L(y(b.height, a.plotHeight - c[0] + c[2]), a.plotHeight))),
                    e = (this.top = Math.round(L(y(b.top, a.plotTop + c[0]), a.plotHeight, a.plotTop)));
                b = this.left = Math.round(L(y(b.left, a.plotLeft + c[3]), a.plotWidth, a.plotLeft));
                this.bottom = a.chartHeight - u - e;
                this.right = a.chartWidth - k - b;
                this.len = Math.max(d ? k : u, 0);
                this.pos = d ? b : e;
            };
            A.prototype.getExtremes = function () {
                var a = this.logarithmic;
                return { min: a ? w(a.lin2log(this.min)) : this.min, max: a ? w(a.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax };
            };
            A.prototype.getThreshold = function (a) {
                var f = this.logarithmic,
                    b = f ? f.lin2log(this.min) : this.min;
                f = f ? f.lin2log(this.max) : this.max;
                null === a || -Infinity === a ? (a = b) : Infinity === a ? (a = f) : b > a ? (a = b) : f < a && (a = f);
                return this.translate(a, 0, 1, 0, 1);
            };
            A.prototype.autoLabelAlign = function (a) {
                var f = (y(a, 0) - 90 * this.side + 720) % 360;
                a = { align: "center" };
                H(this, "autoLabelAlign", a, function (a) {
                    15 < f && 165 > f ? (a.align = "right") : 195 < f && 345 > f && (a.align = "left");
                });
                return a.align;
            };
            A.prototype.tickSize = function (a) {
                var f = this.options,
                    b = f["tick" === a ? "tickLength" : "minorTickLength"],
                    c = y(f["tick" === a ? "tickWidth" : "minorTickWidth"], "tick" === a && this.isXAxis && !this.categories ? 1 : 0);
                if (c && b) {
                    "inside" === f[a + "Position"] && (b = -b);
                    var d = [b, c];
                }
                a = { tickSize: d };
                H(this, "afterTickSize", a);
                return a.tickSize;
            };
            A.prototype.labelMetrics = function () {
                var a = (this.tickPositions && this.tickPositions[0]) || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label);
            };
            A.prototype.unsquish = function () {
                var a = this.options.labels,
                    b = this.horiz,
                    c = this.tickInterval,
                    d = c,
                    k = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c),
                    u,
                    e = a.rotation,
                    g = this.labelMetrics(),
                    I,
                    E = Number.MAX_VALUE,
                    z,
                    p = this.max - this.min,
                    A = function (a) {
                        var f = a / (k || 1);
                        f = 1 < f ? Math.ceil(f) : 1;
                        f * c > p && Infinity !== a && Infinity !== k && p && (f = Math.ceil(p / c));
                        return w(f * c);
                    };
                b
                    ? (z = !a.staggerLines && !a.step && (G(e) ? [e] : k < y(a.autoRotationLimit, 80) && a.autoRotation)) &&
                      z.forEach(function (a) {
                          if (a === e || (a && -90 <= a && 90 >= a)) {
                              I = A(Math.abs(g.h / Math.sin(C * a)));
                              var f = I + Math.abs(a / 360);
                              f < E && ((E = f), (u = a), (d = I));
                          }
                      })
                    : a.step || (d = A(g.h));
                this.autoRotation = z;
                this.labelRotation = y(u, e);
                return d;
            };
            A.prototype.getSlotWidth = function (a) {
                var f,
                    b = this.chart,
                    d = this.horiz,
                    k = this.options.labels,
                    u = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    e = b.margin[3];
                if (a && c(a.slotWidth)) return a.slotWidth;
                if (d && k && 2 > (k.step || 0)) return k.rotation ? 0 : ((this.staggerLines || 1) * this.len) / u;
                if (!d) {
                    a = null === (f = null === k || void 0 === k ? void 0 : k.style) || void 0 === f ? void 0 : f.width;
                    if (void 0 !== a) return parseInt(a, 10);
                    if (e) return e - b.spacing[3];
                }
                return 0.33 * b.chartWidth;
            };
            A.prototype.renderUnsquish = function () {
                var f = this.chart,
                    b = f.renderer,
                    c = this.tickPositions,
                    d = this.ticks,
                    k = this.options.labels,
                    u = (k && k.style) || {},
                    e = this.horiz,
                    g = this.getSlotWidth(),
                    y = Math.max(1, Math.round(g - 2 * (k.padding || 5))),
                    I = {},
                    E = this.labelMetrics(),
                    z = k.style && k.style.textOverflow,
                    C = 0;
                a(k.rotation) || (I.rotation = k.rotation || 0);
                c.forEach(function (a) {
                    a = d[a];
                    a.movedLabel && a.replaceMovedLabel();
                    a && a.label && a.label.textPxLength > C && (C = a.label.textPxLength);
                });
                this.maxLabelLength = C;
                if (this.autoRotation) C > y && C > E.h ? (I.rotation = this.labelRotation) : (this.labelRotation = 0);
                else if (g) {
                    var p = y;
                    if (!z) {
                        var A = "clip";
                        for (y = c.length; !e && y--; ) {
                            var h = c[y];
                            if ((h = d[h].label))
                                h.styles && "ellipsis" === h.styles.textOverflow ? h.css({ textOverflow: "clip" }) : h.textPxLength > g && h.css({ width: g + "px" }),
                                    h.getBBox().height > this.len / c.length - (E.h - E.f) && (h.specificTextOverflow = "ellipsis");
                        }
                    }
                }
                I.rotation && ((p = C > 0.5 * f.chartHeight ? 0.33 * f.chartHeight : C), z || (A = "ellipsis"));
                if ((this.labelAlign = k.align || this.autoLabelAlign(this.labelRotation))) I.align = this.labelAlign;
                c.forEach(function (a) {
                    var f = (a = d[a]) && a.label,
                        b = u.width,
                        c = {};
                    f &&
                        (f.attr(I),
                        a.shortenLabel
                            ? a.shortenLabel()
                            : p && !b && "nowrap" !== u.whiteSpace && (p < f.textPxLength || "SPAN" === f.element.tagName)
                            ? ((c.width = p + "px"), z || (c.textOverflow = f.specificTextOverflow || A), f.css(c))
                            : f.styles && f.styles.width && !c.width && !b && f.css({ width: null }),
                        delete f.specificTextOverflow,
                        (a.rotation = I.rotation));
                }, this);
                this.tickRotCorr = b.rotCorr(E.b, this.labelRotation || 0, 0 !== this.side);
            };
            A.prototype.hasData = function () {
                return (
                    this.series.some(function (a) {
                        return a.hasData();
                    }) ||
                    (this.options.showEmpty && G(this.min) && G(this.max))
                );
            };
            A.prototype.addTitle = function (a) {
                var f = this.chart.renderer,
                    b = this.horiz,
                    c = this.opposite,
                    d = this.options.title,
                    u,
                    e = this.chart.styledMode;
                this.axisTitle ||
                    ((u = d.textAlign) || (u = (b ? { low: "left", middle: "center", high: "right" } : { low: c ? "right" : "left", middle: "center", high: c ? "left" : "right" })[d.align]),
                    (this.axisTitle = f
                        .text(d.text, 0, 0, d.useHTML)
                        .attr({ zIndex: 7, rotation: d.rotation || 0, align: u })
                        .addClass("RBG_charts-axis-title")),
                    e || this.axisTitle.css(k(d.style)),
                    this.axisTitle.add(this.axisGroup),
                    (this.axisTitle.isNew = !0));
                e || d.style.width || this.isRadial || this.axisTitle.css({ width: this.len + "px" });
                this.axisTitle[a ? "show" : "hide"](a);
            };
            A.prototype.generateTick = function (a) {
                var f = this.ticks;
                f[a] ? f[a].addLabel() : (f[a] = new B(this, a));
            };
            A.prototype.getOffset = function () {
                var a = this,
                    b = a.chart,
                    c = b.renderer,
                    d = a.options,
                    k = a.tickPositions,
                    u = a.ticks,
                    e = a.horiz,
                    g = a.side,
                    E = b.inverted && !a.isZAxis ? [1, 0, 3, 2][g] : g,
                    z,
                    C = 0,
                    p = 0,
                    A = d.title,
                    h = d.labels,
                    l = 0,
                    L = b.axisOffset;
                b = b.clipOffset;
                var t = [-1, 1, 1, -1][g],
                    q = d.className,
                    w = a.axisParent;
                var Q = a.hasData();
                a.showAxis = z = Q || y(d.showEmpty, !0);
                a.staggerLines = a.horiz && h.staggerLines;
                a.axisGroup ||
                    ((a.gridGroup = c
                        .g("grid")
                        .attr({ zIndex: d.gridZIndex || 1 })
                        .addClass("RBG_charts-" + this.coll.toLowerCase() + "-grid " + (q || ""))
                        .add(w)),
                    (a.axisGroup = c
                        .g("axis")
                        .attr({ zIndex: d.zIndex || 2 })
                        .addClass("RBG_charts-" + this.coll.toLowerCase() + " " + (q || ""))
                        .add(w)),
                    (a.labelGroup = c
                        .g("axis-labels")
                        .attr({ zIndex: h.zIndex || 7 })
                        .addClass("RBG_charts-" + a.coll.toLowerCase() + "-labels " + (q || ""))
                        .add(w)));
                Q || a.isLinked
                    ? (k.forEach(function (f, b) {
                          a.generateTick(f, b);
                      }),
                      a.renderUnsquish(),
                      (a.reserveSpaceDefault = 0 === g || 2 === g || { 1: "left", 3: "right" }[g] === a.labelAlign),
                      y(h.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) &&
                          k.forEach(function (a) {
                              l = Math.max(u[a].getLabelSize(), l);
                          }),
                      a.staggerLines && (l *= a.staggerLines),
                      (a.labelOffset = l * (a.opposite ? -1 : 1)))
                    : I(u, function (a, f) {
                          a.destroy();
                          delete u[f];
                      });
                if (A && A.text && !1 !== A.enabled && (a.addTitle(z), z && !1 !== A.reserveSpace)) {
                    a.titleOffset = C = a.axisTitle.getBBox()[e ? "height" : "width"];
                    var P = A.offset;
                    p = G(P) ? 0 : y(A.margin, e ? 5 : 10);
                }
                a.renderLine();
                a.offset = t * y(d.offset, L[g] ? L[g] + (d.margin || 0) : 0);
                a.tickRotCorr = a.tickRotCorr || { x: 0, y: 0 };
                c = 0 === g ? -a.labelMetrics().h : 2 === g ? a.tickRotCorr.y : 0;
                p = Math.abs(l) + p;
                l && (p = p - c + t * (e ? y(h.y, a.tickRotCorr.y + 8 * t) : h.x));
                a.axisTitleMargin = y(P, p);
                a.getMaxLabelDimensions && (a.maxLabelDimensions = a.getMaxLabelDimensions(u, k));
                e = this.tickSize("tick");
                L[g] = Math.max(L[g], a.axisTitleMargin + C + t * a.offset, p, k && k.length && e ? e[0] + t * a.offset : 0);
                d = d.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[E] = Math.max(b[E], d);
                H(this, "afterGetOffset");
            };
            A.prototype.getLinePath = function (a) {
                var f = this.chart,
                    b = this.opposite,
                    c = this.offset,
                    d = this.horiz,
                    k = this.left + (b ? this.width : 0) + c;
                c = f.chartHeight - this.bottom - (b ? this.height : 0) + c;
                b && (a *= -1);
                return f.renderer.crispLine(
                    [
                        ["M", d ? this.left : k, d ? c : this.top],
                        ["L", d ? f.chartWidth - this.right : k, d ? c : f.chartHeight - this.bottom],
                    ],
                    a
                );
            };
            A.prototype.renderLine = function () {
                this.axisLine ||
                    ((this.axisLine = this.chart.renderer.path().addClass("RBG_charts-axis-line").add(this.axisGroup)),
                    this.chart.styledMode || this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }));
            };
            A.prototype.getTitlePosition = function () {
                var a = this.horiz,
                    b = this.left,
                    c = this.top,
                    d = this.len,
                    k = this.options.title,
                    u = a ? b : c,
                    e = this.opposite,
                    g = this.offset,
                    y = k.x || 0,
                    I = k.y || 0,
                    E = this.axisTitle,
                    z = this.chart.renderer.fontMetrics(k.style && k.style.fontSize, E);
                E = Math.max(E.getBBox(null, 0).height - z.h - 1, 0);
                d = { low: u + (a ? 0 : d), middle: u + d / 2, high: u + (a ? d : 0) }[k.align];
                b = (a ? c + this.height : b) + (a ? 1 : -1) * (e ? -1 : 1) * this.axisTitleMargin + [-E, E, z.f, -E][this.side];
                a = { x: a ? d + y : b + (e ? this.width : 0) + g + y, y: a ? b + I - (e ? this.height : 0) + g : d + I };
                H(this, "afterGetTitlePosition", { titlePosition: a });
                return a;
            };
            A.prototype.renderMinorTick = function (a) {
                var f = this.chart.hasRendered && c(this.oldMin),
                    b = this.minorTicks;
                b[a] || (b[a] = new B(this, a, "minor"));
                f && b[a].isNew && b[a].render(null, !0);
                b[a].render(null, !1, 1);
            };
            A.prototype.renderTick = function (a, b) {
                var f,
                    d = this.isLinked,
                    r = this.ticks,
                    k = this.chart.hasRendered && c(this.oldMin);
                if (!d || (a >= this.min && a <= this.max) || (null === (f = this.grid) || void 0 === f ? 0 : f.isColumn)) r[a] || (r[a] = new B(this, a)), k && r[a].isNew && r[a].render(b, !0, -1), r[a].render(b);
            };
            A.prototype.render = function () {
                var a = this,
                    b = a.chart,
                    d = a.logarithmic,
                    k = a.options,
                    u = a.isLinked,
                    e = a.tickPositions,
                    g = a.axisTitle,
                    y = a.ticks,
                    E = a.minorTicks,
                    C = a.alternateBands,
                    p = k.stackLabels,
                    A = k.alternateGridColor,
                    h = a.tickmarkOffset,
                    l = a.axisLine,
                    L = a.showAxis,
                    t = K(b.renderer.globalAnimation),
                    q,
                    w;
                a.labelEdge.length = 0;
                a.overlap = !1;
                [y, E, C].forEach(function (a) {
                    I(a, function (a) {
                        a.isActive = !1;
                    });
                });
                if (a.hasData() || u)
                    a.minorTickInterval &&
                        !a.categories &&
                        a.getMinorTickPositions().forEach(function (f) {
                            a.renderMinorTick(f);
                        }),
                        e.length &&
                            (e.forEach(function (f, b) {
                                a.renderTick(f, b);
                            }),
                            h && (0 === a.min || a.single) && (y[-1] || (y[-1] = new B(a, -1, null, !0)), y[-1].render(-1))),
                        A &&
                            e.forEach(function (f, c) {
                                w = "undefined" !== typeof e[c + 1] ? e[c + 1] + h : a.max - h;
                                0 === c % 2 &&
                                    f < a.max &&
                                    w <= a.max + (b.polar ? -h : h) &&
                                    (C[f] || (C[f] = new m.PlotLineOrBand(a)),
                                    (q = f + h),
                                    (C[f].options = { from: d ? d.lin2log(q) : q, to: d ? d.lin2log(w) : w, color: A, className: "RBG_charts-alternate-grid" }),
                                    C[f].render(),
                                    (C[f].isActive = !0));
                            }),
                        a._addedPlotLB ||
                            ((k.plotLines || []).concat(k.plotBands || []).forEach(function (f) {
                                a.addPlotBandOrLine(f);
                            }),
                            (a._addedPlotLB = !0));
                [y, E, C].forEach(function (a) {
                    var f,
                        c = [],
                        d = t.duration;
                    I(a, function (a, f) {
                        a.isActive || (a.render(f, !1, 0), (a.isActive = !1), c.push(f));
                    });
                    z(
                        function () {
                            for (f = c.length; f--; ) a[c[f]] && !a[c[f]].isActive && (a[c[f]].destroy(), delete a[c[f]]);
                        },
                        a !== C && b.hasRendered && d ? d : 0
                    );
                });
                l && (l[l.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(l.strokeWidth()) }), (l.isPlaced = !0), l[L ? "show" : "hide"](L));
                g && L && ((k = a.getTitlePosition()), c(k.y) ? (g[g.isNew ? "attr" : "animate"](k), (g.isNew = !1)) : (g.attr("y", -9999), (g.isNew = !0)));
                p && p.enabled && a.stacking && a.stacking.renderStackTotals();
                a.isDirty = !1;
                H(this, "afterRender");
            };
            A.prototype.redraw = function () {
                this.visible &&
                    (this.render(),
                    this.plotLinesAndBands.forEach(function (a) {
                        a.render();
                    }));
                this.series.forEach(function (a) {
                    a.isDirty = !0;
                });
            };
            A.prototype.getKeepProps = function () {
                return this.keepProps || A.keepProps;
            };
            A.prototype.destroy = function (a) {
                var f = this,
                    b = f.plotLinesAndBands,
                    c;
                H(this, "destroy", { keepEvents: a });
                a || P(f);
                [f.ticks, f.minorTicks, f.alternateBands].forEach(function (a) {
                    l(a);
                });
                if (b) for (a = b.length; a--; ) b[a].destroy();
                "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (a) {
                    f[a] && (f[a] = f[a].destroy());
                });
                for (c in f.plotLinesAndBandsGroups) f.plotLinesAndBandsGroups[c] = f.plotLinesAndBandsGroups[c].destroy();
                I(f, function (a, b) {
                    -1 === f.getKeepProps().indexOf(b) && delete f[b];
                });
            };
            A.prototype.drawCrosshair = function (a, b) {
                var f = this.crosshair,
                    c = y(f.snap, !0),
                    d,
                    k = this.cross,
                    r = this.chart;
                H(this, "drawCrosshair", { e: a, point: b });
                a || (a = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (G(b) || !c)) {
                    c ? G(b) && (d = y("colorAxis" !== this.coll ? b.crosshairPos : null, this.isXAxis ? b.plotX : this.len - b.plotY)) : (d = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos));
                    if (G(d)) {
                        var u = { value: b && (this.isXAxis ? b.x : y(b.stackY, b.y)), translatedValue: d };
                        r.polar && g(u, { isCrosshair: !0, chartX: a && a.chartX, chartY: a && a.chartY, point: b });
                        u = this.getPlotLinePath(u) || null;
                    }
                    if (!G(u)) {
                        this.hideCrosshair();
                        return;
                    }
                    c = this.categories && !this.isRadial;
                    k ||
                        ((this.cross = k = r.renderer
                            .path()
                            .addClass("RBG_charts-crosshair RBG_charts-crosshair-" + (c ? "category " : "thin ") + f.className)
                            .attr({ zIndex: y(f.zIndex, 2) })
                            .add()),
                        r.styledMode ||
                            (k.attr({ stroke: f.color || (c ? n.parse("#ccd6eb").setOpacity(0.25).get() : "#cccccc"), "stroke-width": y(f.width, 1) }).css({ "pointer-events": "none" }), f.dashStyle && k.attr({ dashstyle: f.dashStyle })));
                    k.show().attr({ d: u });
                    c && !f.width && k.attr({ "stroke-width": this.transA });
                    this.cross.e = a;
                } else this.hideCrosshair();
                H(this, "afterDrawCrosshair", { e: a, point: b });
            };
            A.prototype.hideCrosshair = function () {
                this.cross && this.cross.hide();
                H(this, "afterHideCrosshair");
            };
            A.prototype.hasVerticalPanning = function () {
                var a, b;
                return /y/.test((null === (b = null === (a = this.chart.options.chart) || void 0 === a ? void 0 : a.panning) || void 0 === b ? void 0 : b.type) || "");
            };
            A.prototype.validatePositiveValue = function (a) {
                return c(a) && 0 < a;
            };
            A.defaultOptions = {
                dateTimeLabelFormats: {
                    millisecond: { main: "%H:%M:%S.%L", range: !1 },
                    second: { main: "%H:%M:%S", range: !1 },
                    minute: { main: "%H:%M", range: !1 },
                    hour: { main: "%H:%M", range: !1 },
                    day: { main: "%e. %b" },
                    week: { main: "%e. %b" },
                    month: { main: "%b '%y" },
                    year: { main: "%Y" },
                },
                endOnTick: !1,
                labels: { enabled: !0, indentation: 10, x: 0, style: { color: "#666666", cursor: "default", fontSize: "11px" } },
                maxPadding: 0.01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: 0.01,
                showEmpty: !0,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: { align: "middle", style: { color: "#666666" } },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb",
            };
            A.defaultYAxisOptions = {
                endOnTick: !0,
                maxPadding: 0.05,
                minPadding: 0.05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: { x: -8 },
                startOnTick: !0,
                title: { rotation: 270, text: "Values" },
                stackLabels: {
                    animation: {},
                    allowOverlap: !1,
                    enabled: !1,
                    crop: !0,
                    overflow: "justify",
                    formatter: function () {
                        var a = this.axis.chart.numberFormatter;
                        return a(this.total, -1);
                    },
                    style: { color: "#000000", fontSize: "11px", fontWeight: "bold", textOutline: "1px contrast" },
                },
                gridLineWidth: 1,
                lineWidth: 0,
            };
            A.defaultLeftAxisOptions = { labels: { x: -15 }, title: { rotation: 270 } };
            A.defaultRightAxisOptions = { labels: { x: 15 }, title: { rotation: 90 } };
            A.defaultBottomAxisOptions = { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } };
            A.defaultTopAxisOptions = { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } };
            A.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
            return A;
        })();
        m.Axis = v;
        return m.Axis;
    });
    O(m, "Core/Axis/DateTimeAxis.js", [m["Core/Axis/Axis.js"], m["Core/Utilities.js"]], function (v, n) {
        var m = n.addEvent,
            B = n.getMagnitude,
            F = n.normalizeTickInterval,
            J = n.timeUnits,
            K = (function () {
                function n(x) {
                    this.axis = x;
                }
                n.prototype.normalizeTimeTickInterval = function (x, q) {
                    var t = q || [
                        ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                        ["second", [1, 2, 5, 10, 15, 30]],
                        ["minute", [1, 2, 5, 10, 15, 30]],
                        ["hour", [1, 2, 3, 4, 6, 8, 12]],
                        ["day", [1, 2]],
                        ["week", [1, 2]],
                        ["month", [1, 2, 3, 4, 6]],
                        ["year", null],
                    ];
                    q = t[t.length - 1];
                    var w = J[q[0]],
                        G = q[1],
                        l;
                    for (l = 0; l < t.length && !((q = t[l]), (w = J[q[0]]), (G = q[1]), t[l + 1] && x <= (w * G[G.length - 1] + J[t[l + 1][0]]) / 2); l++);
                    w === J.year && x < 5 * w && (G = [1, 2, 5]);
                    x = F(x / w, G, "year" === q[0] ? Math.max(B(x / w), 1) : 1);
                    return { unitRange: w, count: x, unitName: q[0] };
                };
                return n;
            })();
        n = (function () {
            function n() {}
            n.compose = function (x) {
                x.keepProps.push("dateTime");
                x.prototype.getTimeTicks = function () {
                    return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
                };
                m(x, "init", function (q) {
                    "datetime" !== q.userOptions.type ? (this.dateTime = void 0) : this.dateTime || (this.dateTime = new K(this));
                });
            };
            n.AdditionsClass = K;
            return n;
        })();
        n.compose(v);
        return n;
    });
    O(m, "Core/Axis/LogarithmicAxis.js", [m["Core/Axis/Axis.js"], m["Core/Utilities.js"]], function (v, n) {
        var m = n.addEvent,
            B = n.getMagnitude,
            F = n.normalizeTickInterval,
            J = n.pick,
            K = (function () {
                function n(x) {
                    this.axis = x;
                }
                n.prototype.getLogTickPositions = function (x, q, t, w) {
                    var G = this.axis,
                        l = G.len,
                        h = G.options,
                        g = [];
                    w || (this.minorAutoInterval = void 0);
                    if (0.5 <= x) (x = Math.round(x)), (g = G.getLinearTickPositions(x, q, t));
                    else if (0.08 <= x) {
                        h = Math.floor(q);
                        var H, p;
                        for (l = 0.3 < x ? [1, 2, 4] : 0.15 < x ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; h < t + 1 && !p; h++) {
                            var e = l.length;
                            for (H = 0; H < e && !p; H++) {
                                var b = this.log2lin(this.lin2log(h) * l[H]);
                                b > q && (!w || d <= t) && "undefined" !== typeof d && g.push(d);
                                d > t && (p = !0);
                                var d = b;
                            }
                        }
                    } else
                        (q = this.lin2log(q)),
                            (t = this.lin2log(t)),
                            (x = w ? G.getMinorTickInterval() : h.tickInterval),
                            (x = J("auto" === x ? null : x, this.minorAutoInterval, ((h.tickPixelInterval / (w ? 5 : 1)) * (t - q)) / ((w ? l / G.tickPositions.length : l) || 1))),
                            (x = F(x, void 0, B(x))),
                            (g = G.getLinearTickPositions(x, q, t).map(this.log2lin)),
                            w || (this.minorAutoInterval = x / 5);
                    w || (G.tickInterval = x);
                    return g;
                };
                n.prototype.lin2log = function (x) {
                    return Math.pow(10, x);
                };
                n.prototype.log2lin = function (x) {
                    return Math.log(x) / Math.LN10;
                };
                return n;
            })();
        n = (function () {
            function n() {}
            n.compose = function (n) {
                n.keepProps.push("logarithmic");
                var q = n.prototype,
                    t = K.prototype;
                q.log2lin = t.log2lin;
                q.lin2log = t.lin2log;
                m(n, "init", function (t) {
                    var q = this.logarithmic;
                    "logarithmic" !== t.userOptions.type
                        ? (this.logarithmic = void 0)
                        : (q || (q = this.logarithmic = new K(this)), this.log2lin !== q.log2lin && (q.log2lin = this.log2lin.bind(this)), this.lin2log !== q.lin2log && (q.lin2log = this.lin2log.bind(this)));
                });
                m(n, "afterInit", function () {
                    var t = this.logarithmic;
                    t &&
                        ((this.lin2val = function (q) {
                            return t.lin2log(q);
                        }),
                        (this.val2lin = function (q) {
                            return t.log2lin(q);
                        }));
                });
            };
            return n;
        })();
        n.compose(v);
        return n;
    });
    O(m, "Core/Axis/PlotLineOrBand.js", [m["Core/Axis/Axis.js"], m["Core/Globals.js"], m["Core/Utilities.js"]], function (v, n, m) {
        var B = m.arrayMax,
            F = m.arrayMin,
            J = m.defined,
            K = m.destroyObjectProperties,
            D = m.erase,
            x = m.extend,
            q = m.merge,
            t = m.objectEach,
            w = m.pick;
        m = (function () {
            function G(l, h) {
                this.axis = l;
                h && ((this.options = h), (this.id = h.id));
            }
            G.prototype.render = function () {
                n.fireEvent(this, "render");
                var l = this,
                    h = l.axis,
                    g = h.horiz,
                    H = h.logarithmic,
                    p = l.options,
                    e = p.label,
                    b = l.label,
                    d = p.to,
                    c = p.from,
                    a = p.value,
                    k = J(c) && J(d),
                    u = J(a),
                    I = l.svgElem,
                    y = !I,
                    L = [],
                    G = p.color,
                    Q = w(p.zIndex, 0),
                    z = p.events;
                L = { class: "RBG_charts-plot-" + (k ? "band " : "line ") + (p.className || "") };
                var E = {},
                    C = h.chart.renderer,
                    A = k ? "bands" : "lines";
                H && ((c = H.log2lin(c)), (d = H.log2lin(d)), (a = H.log2lin(a)));
                h.chart.styledMode ||
                    (u
                        ? ((L.stroke = G || "#999999"), (L["stroke-width"] = w(p.width, 1)), p.dashStyle && (L.dashstyle = p.dashStyle))
                        : k && ((L.fill = G || "#e6ebf5"), p.borderWidth && ((L.stroke = p.borderColor), (L["stroke-width"] = p.borderWidth))));
                E.zIndex = Q;
                A += "-" + Q;
                (H = h.plotLinesAndBandsGroups[A]) ||
                    (h.plotLinesAndBandsGroups[A] = H = C.g("plot-" + A)
                        .attr(E)
                        .add());
                y && (l.svgElem = I = C.path().attr(L).add(H));
                if (u) L = h.getPlotLinePath({ value: a, lineWidth: I.strokeWidth(), acrossPanes: p.acrossPanes });
                else if (k) L = h.getPlotBandPath(c, d, p);
                else return;
                !l.eventsAdded &&
                    z &&
                    (t(z, function (a, b) {
                        I.on(b, function (a) {
                            z[b].apply(l, [a]);
                        });
                    }),
                    (l.eventsAdded = !0));
                (y || !I.d) && L && L.length ? I.attr({ d: L }) : I && (L ? (I.show(!0), I.animate({ d: L })) : I.d && (I.hide(), b && (l.label = b = b.destroy())));
                e && (J(e.text) || J(e.formatter)) && L && L.length && 0 < h.width && 0 < h.height && !L.isFlat
                    ? ((e = q({ align: g && k && "center", x: g ? !k && 4 : 10, verticalAlign: !g && k && "middle", y: g ? (k ? 16 : 10) : k ? 6 : -4, rotation: g && !k && 90 }, e)), this.renderLabel(e, L, k, Q))
                    : b && b.hide();
                return l;
            };
            G.prototype.renderLabel = function (l, h, g, t) {
                var p = this.label,
                    e = this.axis.chart.renderer;
                p ||
                    ((p = { align: l.textAlign || l.align, rotation: l.rotation, class: "RBG_charts-plot-" + (g ? "band" : "line") + "-label " + (l.className || "") }),
                    (p.zIndex = t),
                    (t = this.getLabelText(l)),
                    (this.label = p = e.text(t, 0, 0, l.useHTML).attr(p).add()),
                    this.axis.chart.styledMode || p.css(l.style));
                e = h.xBounds || [h[0][1], h[1][1], g ? h[2][1] : h[0][1]];
                h = h.yBounds || [h[0][2], h[1][2], g ? h[2][2] : h[0][2]];
                g = F(e);
                t = F(h);
                p.align(l, !1, { x: g, y: t, width: B(e) - g, height: B(h) - t });
                p.show(!0);
            };
            G.prototype.getLabelText = function (l) {
                return J(l.formatter) ? l.formatter.call(this) : l.text;
            };
            G.prototype.destroy = function () {
                D(this.axis.plotLinesAndBands, this);
                delete this.axis;
                K(this);
            };
            return G;
        })();
        x(v.prototype, {
            getPlotBandPath: function (t, l, h) {
                void 0 === h && (h = this.options);
                var g = this.getPlotLinePath({ value: l, force: !0, acrossPanes: h.acrossPanes });
                h = this.getPlotLinePath({ value: t, force: !0, acrossPanes: h.acrossPanes });
                var q = [],
                    p = this.horiz,
                    e = 1;
                t = (t < this.min && l < this.min) || (t > this.max && l > this.max);
                if (h && g) {
                    if (t) {
                        var b = h.toString() === g.toString();
                        e = 0;
                    }
                    for (t = 0; t < h.length; t += 2) {
                        l = h[t];
                        var d = h[t + 1],
                            c = g[t],
                            a = g[t + 1];
                        ("M" !== l[0] && "L" !== l[0]) ||
                            ("M" !== d[0] && "L" !== d[0]) ||
                            ("M" !== c[0] && "L" !== c[0]) ||
                            ("M" !== a[0] && "L" !== a[0]) ||
                            (p && c[1] === l[1] ? ((c[1] += e), (a[1] += e)) : p || c[2] !== l[2] || ((c[2] += e), (a[2] += e)), q.push(["M", l[1], l[2]], ["L", d[1], d[2]], ["L", a[1], a[2]], ["L", c[1], c[2]], ["Z"]));
                        q.isFlat = b;
                    }
                }
                return q;
            },
            addPlotBand: function (t) {
                return this.addPlotBandOrLine(t, "plotBands");
            },
            addPlotLine: function (t) {
                return this.addPlotBandOrLine(t, "plotLines");
            },
            addPlotBandOrLine: function (t, l) {
                var h = new n.PlotLineOrBand(this, t),
                    g = this.userOptions;
                this.visible && (h = h.render());
                if (h) {
                    if (l) {
                        var q = g[l] || [];
                        q.push(t);
                        g[l] = q;
                    }
                    this.plotLinesAndBands.push(h);
                    this._addedPlotLB = !0;
                }
                return h;
            },
            removePlotBandOrLine: function (t) {
                for (var l = this.plotLinesAndBands, h = this.options, g = this.userOptions, q = l.length; q--; ) l[q].id === t && l[q].destroy();
                [h.plotLines || [], g.plotLines || [], h.plotBands || [], g.plotBands || []].forEach(function (g) {
                    for (q = g.length; q--; ) (g[q] || {}).id === t && D(g, g[q]);
                });
            },
            removePlotBand: function (t) {
                this.removePlotBandOrLine(t);
            },
            removePlotLine: function (t) {
                this.removePlotBandOrLine(t);
            },
        });
        n.PlotLineOrBand = m;
        return n.PlotLineOrBand;
    });
    O(m, "Core/Tooltip.js", [m["Core/Globals.js"], m["Core/Utilities.js"]], function (v, n) {
        var m = v.doc,
            B = n.clamp,
            F = n.css,
            J = n.defined,
            K = n.discardElement,
            D = n.extend,
            x = n.fireEvent,
            q = n.format,
            t = n.isNumber,
            w = n.isString,
            G = n.merge,
            l = n.pick,
            h = n.splat,
            g = n.syncTimeout,
            H = n.timeUnits;
        ("");
        var p = (function () {
            function e(b, d) {
                this.container = void 0;
                this.crosshairs = [];
                this.distance = 0;
                this.isHidden = !0;
                this.isSticky = !1;
                this.now = {};
                this.options = {};
                this.outside = !1;
                this.chart = b;
                this.init(b, d);
            }
            e.prototype.applyFilter = function () {
                var b = this.chart;
                b.renderer.definition({
                    tagName: "filter",
                    id: "drop-shadow-" + b.index,
                    opacity: 0.5,
                    children: [
                        { tagName: "feGaussianBlur", in: "SourceAlpha", stdDeviation: 1 },
                        { tagName: "feOffset", dx: 1, dy: 1 },
                        { tagName: "feComponentTransfer", children: [{ tagName: "feFuncA", type: "linear", slope: 0.3 }] },
                        { tagName: "feMerge", children: [{ tagName: "feMergeNode" }, { tagName: "feMergeNode", in: "SourceGraphic" }] },
                    ],
                });
                b.renderer.definition({ tagName: "style", textContent: ".RBG_charts-tooltip-" + b.index + "{filter:url(#drop-shadow-" + b.index + ")}" });
            };
            e.prototype.bodyFormatter = function (b) {
                return b.map(function (b) {
                    var c = b.series.tooltipOptions;
                    return (c[(b.point.formatPrefix || "point") + "Formatter"] || b.point.tooltipFormatter).call(b.point, c[(b.point.formatPrefix || "point") + "Format"] || "");
                });
            };
            e.prototype.cleanSplit = function (b) {
                this.chart.series.forEach(function (d) {
                    var c = d && d.tt;
                    c && (!c.isActive || b ? (d.tt = c.destroy()) : (c.isActive = !1));
                });
            };
            e.prototype.defaultFormatter = function (b) {
                var d = this.points || h(this);
                var c = [b.tooltipFooterHeaderFormatter(d[0])];
                c = c.concat(b.bodyFormatter(d));
                c.push(b.tooltipFooterHeaderFormatter(d[0], !0));
                return c;
            };
            e.prototype.destroy = function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), (this.tt = this.tt.destroy()));
                this.renderer && ((this.renderer = this.renderer.destroy()), K(this.container));
                n.clearTimeout(this.hideTimer);
                n.clearTimeout(this.tooltipTimeout);
            };
            e.prototype.getAnchor = function (b, d) {
                var c = this.chart,
                    a = c.pointer,
                    k = c.inverted,
                    u = c.plotTop,
                    e = c.plotLeft,
                    g = 0,
                    p = 0,
                    l,
                    t;
                b = h(b);
                this.followPointer && d
                    ? ("undefined" === typeof d.chartX && (d = a.normalize(d)), (b = [d.chartX - e, d.chartY - u]))
                    : b[0].tooltipPos
                    ? (b = b[0].tooltipPos)
                    : (b.forEach(function (a) {
                          l = a.series.yAxis;
                          t = a.series.xAxis;
                          g += a.plotX + (!k && t ? t.left - e : 0);
                          p += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!k && l ? l.top - u : 0);
                      }),
                      (g /= b.length),
                      (p /= b.length),
                      (b = [k ? c.plotWidth - p : g, this.shared && !k && 1 < b.length && d ? d.chartY - u : k ? c.plotHeight - g : p]));
                return b.map(Math.round);
            };
            e.prototype.getDateFormat = function (b, d, c, a) {
                var k = this.chart.time,
                    u = k.dateFormat("%m-%d %H:%M:%S.%L", d),
                    e = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
                    g = "millisecond";
                for (p in H) {
                    if (b === H.week && +k.dateFormat("%w", d) === c && "00:00:00.000" === u.substr(6)) {
                        var p = "week";
                        break;
                    }
                    if (H[p] > b) {
                        p = g;
                        break;
                    }
                    if (e[p] && u.substr(e[p]) !== "01-01 00:00:00.000".substr(e[p])) break;
                    "week" !== p && (g = p);
                }
                if (p) var h = k.resolveDTLFormat(a[p]).main;
                return h;
            };
            e.prototype.getLabel = function () {
                var b,
                    d,
                    c = this,
                    a = this.chart.renderer,
                    k = this.chart.styledMode,
                    u = this.options,
                    e = "tooltip" + (J(u.className) ? " " + u.className : ""),
                    g = (null === (b = u.style) || void 0 === b ? void 0 : b.pointerEvents) || (!this.followPointer && u.stickOnContact ? "auto" : "none"),
                    p;
                b = function () {
                    c.inContact = !0;
                };
                var h = function () {
                    var a = c.chart.hoverSeries;
                    c.inContact = !1;
                    if (a && a.onMouseOut) a.onMouseOut();
                };
                if (!this.label) {
                    this.outside &&
                        ((this.container = p = v.doc.createElement("div")),
                        (p.className = "RBG_charts-tooltip-container"),
                        F(p, { position: "absolute", top: "1px", pointerEvents: g, zIndex: 3 }),
                        v.doc.body.appendChild(p),
                        (this.renderer = a = new v.Renderer(p, 0, 0, null === (d = this.chart.options.chart) || void 0 === d ? void 0 : d.style, void 0, void 0, a.styledMode)));
                    this.split
                        ? (this.label = a.g(e))
                        : ((this.label = a.label("", 0, 0, u.shape || "callout", null, null, u.useHTML, null, e).attr({ padding: u.padding, r: u.borderRadius })),
                          k || this.label.attr({ fill: u.backgroundColor, "stroke-width": u.borderWidth }).css(u.style).css({ pointerEvents: g }).shadow(u.shadow));
                    k && (this.applyFilter(), this.label.addClass("RBG_charts-tooltip-" + this.chart.index));
                    if (c.outside && !c.split) {
                        var l = this.label,
                            z = l.xSetter,
                            E = l.ySetter;
                        l.xSetter = function (a) {
                            z.call(l, c.distance);
                            p.style.left = a + "px";
                        };
                        l.ySetter = function (a) {
                            E.call(l, c.distance);
                            p.style.top = a + "px";
                        };
                    }
                    this.label.on("mouseenter", b).on("mouseleave", h).attr({ zIndex: 8 }).add();
                }
                return this.label;
            };
            e.prototype.getPosition = function (b, d, c) {
                var a = this.chart,
                    k = this.distance,
                    u = {},
                    e = (a.inverted && c.h) || 0,
                    g,
                    p = this.outside,
                    h = p ? m.documentElement.clientWidth - 2 * k : a.chartWidth,
                    t = p ? Math.max(m.body.scrollHeight, m.documentElement.scrollHeight, m.body.offsetHeight, m.documentElement.offsetHeight, m.documentElement.clientHeight) : a.chartHeight,
                    z = a.pointer.getChartPosition(),
                    E = a.containerScaling,
                    C = function (a) {
                        return E ? a * E.scaleX : a;
                    },
                    A = function (a) {
                        return E ? a * E.scaleY : a;
                    },
                    f = function (f) {
                        var r = "x" === f;
                        return [f, r ? h : t, r ? b : d].concat(
                            p
                                ? [r ? C(b) : A(d), r ? z.left - k + C(c.plotX + a.plotLeft) : z.top - k + A(c.plotY + a.plotTop), 0, r ? h : t]
                                : [r ? b : d, r ? c.plotX + a.plotLeft : c.plotY + a.plotTop, r ? a.plotLeft : a.plotTop, r ? a.plotLeft + a.plotWidth : a.plotTop + a.plotHeight]
                        );
                    },
                    r = f("y"),
                    N = f("x"),
                    q = !this.followPointer && l(c.ttBelow, !a.inverted === !!c.negative),
                    w = function (a, f, b, c, d, r, g) {
                        var y = "y" === a ? A(k) : C(k),
                            E = (b - c) / 2,
                            I = c < d - k,
                            z = d + k + c < f,
                            p = d - y - b + E;
                        d = d + y - E;
                        if (q && z) u[a] = d;
                        else if (!q && I) u[a] = p;
                        else if (I) u[a] = Math.min(g - c, 0 > p - e ? p : p - e);
                        else if (z) u[a] = Math.max(r, d + e + b > f ? d : d + e);
                        else return !1;
                    },
                    H = function (a, f, b, c, d) {
                        var r;
                        d < k || d > f - k ? (r = !1) : (u[a] = d < b / 2 ? 1 : d > f - c / 2 ? f - c - 2 : d - b / 2);
                        return r;
                    },
                    n = function (a) {
                        var f = r;
                        r = N;
                        N = f;
                        g = a;
                    },
                    x = function () {
                        !1 !== w.apply(0, r) ? !1 !== H.apply(0, N) || g || (n(!0), x()) : g ? (u.x = u.y = 0) : (n(!0), x());
                    };
                (a.inverted || 1 < this.len) && n();
                x();
                return u;
            };
            e.prototype.getXDateFormat = function (b, d, c) {
                d = d.dateTimeLabelFormats;
                var a = c && c.closestPointRange;
                return (a ? this.getDateFormat(a, b.x, c.options.startOfWeek, d) : d.day) || d.year;
            };
            e.prototype.hide = function (b) {
                var d = this;
                n.clearTimeout(this.hideTimer);
                b = l(b, this.options.hideDelay, 500);
                this.isHidden ||
                    (this.hideTimer = g(function () {
                        d.getLabel().fadeOut(b ? void 0 : b);
                        d.isHidden = !0;
                    }, b));
            };
            e.prototype.init = function (b, d) {
                this.chart = b;
                this.options = d;
                this.crosshairs = [];
                this.now = { x: 0, y: 0 };
                this.isHidden = !0;
                this.split = d.split && !b.inverted && !b.polar;
                this.shared = d.shared || this.split;
                this.outside = l(d.outside, !(!b.scrollablePixelsX && !b.scrollablePixelsY));
            };
            e.prototype.isStickyOnContact = function () {
                return !(this.followPointer || !this.options.stickOnContact || !this.inContact);
            };
            e.prototype.move = function (b, d, c, a) {
                var k = this,
                    u = k.now,
                    e = !1 !== k.options.animation && !k.isHidden && (1 < Math.abs(b - u.x) || 1 < Math.abs(d - u.y)),
                    g = k.followPointer || 1 < k.len;
                D(u, { x: e ? (2 * u.x + b) / 3 : b, y: e ? (u.y + d) / 2 : d, anchorX: g ? void 0 : e ? (2 * u.anchorX + c) / 3 : c, anchorY: g ? void 0 : e ? (u.anchorY + a) / 2 : a });
                k.getLabel().attr(u);
                k.drawTracker();
                e &&
                    (n.clearTimeout(this.tooltipTimeout),
                    (this.tooltipTimeout = setTimeout(function () {
                        k && k.move(b, d, c, a);
                    }, 32)));
            };
            e.prototype.refresh = function (b, d) {
                var c = this.chart,
                    a = this.options,
                    k = b,
                    u = {},
                    e = [],
                    g = a.formatter || this.defaultFormatter;
                u = this.shared;
                var p = c.styledMode;
                if (a.enabled) {
                    n.clearTimeout(this.hideTimer);
                    this.followPointer = h(k)[0].series.tooltipOptions.followPointer;
                    var t = this.getAnchor(k, d);
                    d = t[0];
                    var q = t[1];
                    !u || (k.series && k.series.noSharedTooltip)
                        ? (u = k.getLabelConfig())
                        : (c.pointer.applyInactiveState(k),
                          k.forEach(function (a) {
                              a.setState("hover");
                              e.push(a.getLabelConfig());
                          }),
                          (u = { x: k[0].category, y: k[0].y }),
                          (u.points = e),
                          (k = k[0]));
                    this.len = e.length;
                    c = g.call(u, this);
                    g = k.series;
                    this.distance = l(g.tooltipOptions.distance, 16);
                    !1 === c
                        ? this.hide()
                        : (this.split
                              ? this.renderSplit(c, h(b))
                              : ((b = this.getLabel()),
                                (a.style.width && !p) || b.css({ width: this.chart.spacingBox.width + "px" }),
                                b.attr({ text: c && c.join ? c.join("") : c }),
                                b.removeClass(/RBG_charts-color-[\d]+/g).addClass("RBG_charts-color-" + l(k.colorIndex, g.colorIndex)),
                                p || b.attr({ stroke: a.borderColor || k.color || g.color || "#666666" }),
                                this.updatePosition({ plotX: d, plotY: q, negative: k.negative, ttBelow: k.ttBelow, h: t[2] || 0 })),
                          this.isHidden && this.label && this.label.attr({ opacity: 1 }).show(),
                          (this.isHidden = !1));
                    x(this, "refresh");
                }
            };
            e.prototype.renderSplit = function (b, d) {
                function c(a, f, b, c, d) {
                    void 0 === d && (d = !0);
                    b ? ((f = x ? 0 : F), (a = B(a - c / 2, H.left, H.right - c))) : ((f -= G), (a = d ? a - c - r : a + r), (a = B(a, d ? a : H.left, H.right)));
                    return { x: a, y: f };
                }
                var a = this,
                    k = a.chart,
                    u = a.chart,
                    e = u.plotHeight,
                    g = u.plotLeft,
                    p = u.plotTop,
                    h = u.pointer,
                    t = u.renderer,
                    z = u.scrollablePixelsY,
                    E = void 0 === z ? 0 : z;
                z = u.scrollingContainer;
                z = void 0 === z ? { scrollLeft: 0, scrollTop: 0 } : z;
                var C = z.scrollLeft,
                    A = z.scrollTop,
                    f = u.styledMode,
                    r = a.distance,
                    N = a.options,
                    q = a.options.positioner,
                    H = { left: C, right: C + u.chartWidth, top: A, bottom: A + u.chartHeight },
                    n = a.getLabel(),
                    x = !(!k.xAxis[0] || !k.xAxis[0].opposite),
                    G = p + A,
                    m = 0,
                    F = e - E;
                w(b) && (b = [!1, b]);
                b = b.slice(0, d.length + 1).reduce(function (b, k, u) {
                    if (!1 !== k && "" !== k) {
                        u = d[u - 1] || { isHeader: !0, plotX: d[0].plotX, plotY: e, series: {} };
                        var y = u.isHeader,
                            z = y ? a : u.series,
                            I = z.tt,
                            C = u.isHeader;
                        var h = u.series;
                        var w = "RBG_charts-color-" + l(u.colorIndex, h.colorIndex, "none");
                        I ||
                            ((I = { padding: N.padding, r: N.borderRadius }),
                            f || ((I.fill = N.backgroundColor), (I["stroke-width"] = N.borderWidth)),
                            (I = t
                                .label("", 0, 0, N[C ? "headerShape" : "shape"] || "callout", void 0, void 0, N.useHTML)
                                .addClass((C ? "RBG_charts-tooltip-header " : "") + "RBG_charts-tooltip-box " + w)
                                .attr(I)
                                .add(n)));
                        I.isActive = !0;
                        I.attr({ text: k });
                        f ||
                            I.css(N.style)
                                .shadow(N.shadow)
                                .attr({ stroke: N.borderColor || u.color || h.color || "#333333" });
                        k = z.tt = I;
                        C = k.getBBox();
                        z = C.width + k.strokeWidth();
                        y && ((m = C.height), (F += m), x && (G -= m));
                        h = u.plotX;
                        h = void 0 === h ? 0 : h;
                        w = u.plotY;
                        w = void 0 === w ? 0 : w;
                        var L = u.series;
                        if (u.isHeader) {
                            h = g + h;
                            var Q = p + e / 2;
                        } else (I = L.xAxis), (L = L.yAxis), (h = I.pos + B(h, -r, I.len + r)), L.pos + w >= A + p && L.pos + w <= A + p + e - E && (Q = L.pos + w);
                        h = B(h, H.left - r, H.right + r);
                        "number" === typeof Q
                            ? ((C = C.height + 1),
                              (w = q ? q.call(a, z, C, u) : c(h, Q, y, z)),
                              b.push({ align: q ? 0 : void 0, anchorX: h, anchorY: Q, boxWidth: z, point: u, rank: l(w.rank, y ? 1 : 0), size: C, target: w.y, tt: k, x: w.x }))
                            : (k.isActive = !1);
                    }
                    return b;
                }, []);
                !q &&
                    b.some(function (a) {
                        return a.x < H.left;
                    }) &&
                    (b = b.map(function (a) {
                        var f = c(a.anchorX, a.anchorY, a.point.isHeader, a.boxWidth, !1);
                        return D(a, { target: f.y, x: f.x });
                    }));
                a.cleanSplit();
                v.distribute(b, F);
                b.forEach(function (a) {
                    var f = a.pos;
                    a.tt.attr({ visibility: "undefined" === typeof f ? "hidden" : "inherit", x: a.x, y: f + G, anchorX: a.anchorX, anchorY: a.anchorY });
                });
                b = a.container;
                k = a.renderer;
                a.outside && b && k && ((u = n.getBBox()), k.setSize(u.width + u.x, u.height + u.y, !1), (h = h.getChartPosition()), (b.style.left = h.left + "px"), (b.style.top = h.top + "px"));
            };
            e.prototype.drawTracker = function () {
                if (this.followPointer || !this.options.stickOnContact) this.tracker && this.tracker.destroy();
                else {
                    var b = this.chart,
                        d = this.label,
                        c = b.hoverPoint;
                    if (d && c) {
                        var a = { x: 0, y: 0, width: 0, height: 0 };
                        c = this.getAnchor(c);
                        var k = d.getBBox();
                        c[0] += b.plotLeft - d.translateX;
                        c[1] += b.plotTop - d.translateY;
                        a.x = Math.min(0, c[0]);
                        a.y = Math.min(0, c[1]);
                        a.width = 0 > c[0] ? Math.max(Math.abs(c[0]), k.width - c[0]) : Math.max(Math.abs(c[0]), k.width);
                        a.height = 0 > c[1] ? Math.max(Math.abs(c[1]), k.height - Math.abs(c[1])) : Math.max(Math.abs(c[1]), k.height);
                        this.tracker ? this.tracker.attr(a) : ((this.tracker = d.renderer.rect(a).addClass("RBG_charts-tracker").add(d)), b.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
                    }
                }
            };
            e.prototype.styledModeFormat = function (b) {
                return b.replace('style="font-size: 10px"', 'class="RBG_charts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="RBG_charts-color-{$1.colorIndex}"');
            };
            e.prototype.tooltipFooterHeaderFormatter = function (b, d) {
                var c = d ? "footer" : "header",
                    a = b.series,
                    k = a.tooltipOptions,
                    u = k.xDateFormat,
                    e = a.xAxis,
                    g = e && "datetime" === e.options.type && t(b.key),
                    p = k[c + "Format"];
                d = { isFooter: d, labelConfig: b };
                x(this, "headerFormatter", d, function (c) {
                    g && !u && (u = this.getXDateFormat(b, k, e));
                    g &&
                        u &&
                        ((b.point && b.point.tooltipDateKeys) || ["key"]).forEach(function (a) {
                            p = p.replace("{point." + a + "}", "{point." + a + ":" + u + "}");
                        });
                    a.chart.styledMode && (p = this.styledModeFormat(p));
                    c.text = q(p, { point: b, series: a }, this.chart);
                });
                return d.text;
            };
            e.prototype.update = function (b) {
                this.destroy();
                G(!0, this.chart.options.tooltip.userOptions, b);
                this.init(this.chart, G(!0, this.options, b));
            };
            e.prototype.updatePosition = function (b) {
                var d = this.chart,
                    c = d.pointer,
                    a = this.getLabel(),
                    k = b.plotX + d.plotLeft,
                    u = b.plotY + d.plotTop;
                c = c.getChartPosition();
                b = (this.options.positioner || this.getPosition).call(this, a.width, a.height, b);
                if (this.outside) {
                    var e = (this.options.borderWidth || 0) + 2 * this.distance;
                    this.renderer.setSize(a.width + e, a.height + e, !1);
                    if ((d = d.containerScaling)) F(this.container, { transform: "scale(" + d.scaleX + ", " + d.scaleY + ")" }), (k *= d.scaleX), (u *= d.scaleY);
                    k += c.left - b.x;
                    u += c.top - b.y;
                }
                this.move(Math.round(b.x), Math.round(b.y || 0), k, u);
            };
            return e;
        })();
        v.Tooltip = p;
        return v.Tooltip;
    });
    O(m, "Core/Pointer.js", [m["Core/Color/Color.js"], m["Core/Globals.js"], m["Core/Tooltip.js"], m["Core/Utilities.js"]], function (v, n, m, B) {
        var F = v.parse,
            J = n.charts,
            K = n.noop,
            D = B.addEvent,
            x = B.attr,
            q = B.css,
            t = B.defined,
            w = B.extend,
            G = B.find,
            l = B.fireEvent,
            h = B.isNumber,
            g = B.isObject,
            H = B.objectEach,
            p = B.offset,
            e = B.pick,
            b = B.splat;
        ("");
        v = (function () {
            function d(b, a) {
                this.lastValidTouch = {};
                this.pinchDown = [];
                this.runChartClick = !1;
                this.chart = b;
                this.hasDragged = !1;
                this.options = a;
                this.unbindContainerMouseLeave = function () {};
                this.unbindContainerMouseEnter = function () {};
                this.init(b, a);
            }
            d.prototype.applyInactiveState = function (b) {
                var a = [],
                    c;
                (b || []).forEach(function (b) {
                    c = b.series;
                    a.push(c);
                    c.linkedParent && a.push(c.linkedParent);
                    c.linkedSeries && (a = a.concat(c.linkedSeries));
                    c.navigatorSeries && a.push(c.navigatorSeries);
                });
                this.chart.series.forEach(function (b) {
                    -1 === a.indexOf(b) ? b.setState("inactive", !0) : b.options.inactiveOtherPoints && b.setAllPointsToState("inactive");
                });
            };
            d.prototype.destroy = function () {
                var b = this;
                "undefined" !== typeof b.unDocMouseMove && b.unDocMouseMove();
                this.unbindContainerMouseLeave();
                n.chartCount || (n.unbindDocumentMouseUp && (n.unbindDocumentMouseUp = n.unbindDocumentMouseUp()), n.unbindDocumentTouchEnd && (n.unbindDocumentTouchEnd = n.unbindDocumentTouchEnd()));
                clearInterval(b.tooltipTimeout);
                H(b, function (a, c) {
                    b[c] = void 0;
                });
            };
            d.prototype.drag = function (b) {
                var a = this.chart,
                    c = a.options.chart,
                    d = b.chartX,
                    e = b.chartY,
                    y = this.zoomHor,
                    p = this.zoomVert,
                    h = a.plotLeft,
                    l = a.plotTop,
                    z = a.plotWidth,
                    E = a.plotHeight,
                    C = this.selectionMarker,
                    A = this.mouseDownX || 0,
                    f = this.mouseDownY || 0,
                    r = g(c.panning) ? c.panning && c.panning.enabled : c.panning,
                    t = c.panKey && b[c.panKey + "Key"];
                if (!C || !C.touch)
                    if ((d < h ? (d = h) : d > h + z && (d = h + z), e < l ? (e = l) : e > l + E && (e = l + E), (this.hasDragged = Math.sqrt(Math.pow(A - d, 2) + Math.pow(f - e, 2))), 10 < this.hasDragged)) {
                        var q = a.isInsidePlot(A - h, f - l);
                        a.hasCartesianSeries &&
                            (this.zoomX || this.zoomY) &&
                            q &&
                            !t &&
                            !C &&
                            ((this.selectionMarker = C = a.renderer
                                .rect(h, l, y ? 1 : z, p ? 1 : E, 0)
                                .attr({ class: "RBG_charts-selection-marker", zIndex: 7 })
                                .add()),
                            a.styledMode || C.attr({ fill: c.selectionMarkerFill || F("#335cad").setOpacity(0.25).get() }));
                        C && y && ((d -= A), C.attr({ width: Math.abs(d), x: (0 < d ? 0 : d) + A }));
                        C && p && ((d = e - f), C.attr({ height: Math.abs(d), y: (0 < d ? 0 : d) + f }));
                        q && !C && r && a.pan(b, c.panning);
                    }
            };
            d.prototype.dragStart = function (b) {
                var a = this.chart;
                a.mouseIsDown = b.type;
                a.cancelClick = !1;
                a.mouseDownX = this.mouseDownX = b.chartX;
                a.mouseDownY = this.mouseDownY = b.chartY;
            };
            d.prototype.drop = function (b) {
                var a = this,
                    c = this.chart,
                    d = this.hasPinched;
                if (this.selectionMarker) {
                    var e = { originalEvent: b, xAxis: [], yAxis: [] },
                        g = this.selectionMarker,
                        p = g.attr ? g.attr("x") : g.x,
                        H = g.attr ? g.attr("y") : g.y,
                        Q = g.attr ? g.attr("width") : g.width,
                        z = g.attr ? g.attr("height") : g.height,
                        E;
                    if (this.hasDragged || d)
                        c.axes.forEach(function (c) {
                            if (c.zoomEnabled && t(c.min) && (d || a[{ xAxis: "zoomX", yAxis: "zoomY" }[c.coll]]) && h(p) && h(H)) {
                                var k = c.horiz,
                                    f = "touchend" === b.type ? c.minPixelPadding : 0,
                                    r = c.toValue((k ? p : H) + f);
                                k = c.toValue((k ? p + Q : H + z) - f);
                                e[c.coll].push({ axis: c, min: Math.min(r, k), max: Math.max(r, k) });
                                E = !0;
                            }
                        }),
                            E &&
                                l(c, "selection", e, function (a) {
                                    c.zoom(w(a, d ? { animation: !1 } : null));
                                });
                    h(c.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    d && this.scaleGroups();
                }
                c && h(c.index) && (q(c.container, { cursor: c._cursor }), (c.cancelClick = 10 < this.hasDragged), (c.mouseIsDown = this.hasDragged = this.hasPinched = !1), (this.pinchDown = []));
            };
            d.prototype.findNearestKDPoint = function (b, a, d) {
                var c = this.chart,
                    k = c.hoverPoint;
                c = c.tooltip;
                if (k && c && c.isStickyOnContact()) return k;
                var e;
                b.forEach(function (b) {
                    var c = !(b.noSharedTooltip && a) && 0 > b.options.findNearestPointBy.indexOf("y");
                    b = b.searchPoint(d, c);
                    if ((c = g(b, !0)) && !(c = !g(e, !0))) {
                        c = e.distX - b.distX;
                        var k = e.dist - b.dist,
                            u = (b.series.group && b.series.group.zIndex) - (e.series.group && e.series.group.zIndex);
                        c = 0 < (0 !== c && a ? c : 0 !== k ? k : 0 !== u ? u : e.series.index > b.series.index ? -1 : 1);
                    }
                    c && (e = b);
                });
                return e;
            };
            d.prototype.getChartCoordinatesFromPoint = function (b, a) {
                var c = b.series,
                    d = c.xAxis;
                c = c.yAxis;
                var g = e(b.clientX, b.plotX),
                    y = b.shapeArgs;
                if (d && c) return a ? { chartX: d.len + d.pos - g, chartY: c.len + c.pos - b.plotY } : { chartX: g + d.pos, chartY: b.plotY + c.pos };
                if (y && y.x && y.y) return { chartX: y.x, chartY: y.y };
            };
            d.prototype.getChartPosition = function () {
                return this.chartPosition || (this.chartPosition = p(this.chart.container));
            };
            d.prototype.getCoordinates = function (b) {
                var a = { xAxis: [], yAxis: [] };
                this.chart.axes.forEach(function (c) {
                    a[c.isXAxis ? "xAxis" : "yAxis"].push({ axis: c, value: c.toValue(b[c.horiz ? "chartX" : "chartY"]) });
                });
                return a;
            };
            d.prototype.getHoverData = function (b, a, d, u, p, y) {
                var c,
                    k = [];
                u = !(!u || !b);
                var I = a && !a.stickyTracking,
                    z = { chartX: y ? y.chartX : void 0, chartY: y ? y.chartY : void 0, shared: p };
                l(this, "beforeGetHoverData", z);
                I = I
                    ? [a]
                    : d.filter(function (a) {
                          return z.filter ? z.filter(a) : a.visible && !(!p && a.directTouch) && e(a.options.enableMouseTracking, !0) && a.stickyTracking;
                      });
                a = (c = u || !y ? b : this.findNearestKDPoint(I, p, y)) && c.series;
                c &&
                    (p && !a.noSharedTooltip
                        ? ((I = d.filter(function (a) {
                              return z.filter ? z.filter(a) : a.visible && !(!p && a.directTouch) && e(a.options.enableMouseTracking, !0) && !a.noSharedTooltip;
                          })),
                          I.forEach(function (a) {
                              var b = G(a.points, function (a) {
                                  return a.x === c.x && !a.isNull;
                              });
                              g(b) && (a.chart.isBoosting && (b = a.getPoint(b)), k.push(b));
                          }))
                        : k.push(c));
                z = { hoverPoint: c };
                l(this, "afterGetHoverData", z);
                return { hoverPoint: z.hoverPoint, hoverSeries: a, hoverPoints: k };
            };
            d.prototype.getPointFromEvent = function (b) {
                b = b.target;
                for (var a; b && !a; ) (a = b.point), (b = b.parentNode);
                return a;
            };
            d.prototype.onTrackerMouseOut = function (b) {
                b = b.relatedTarget || b.toElement;
                var a = this.chart.hoverSeries;
                this.isDirectTouch = !1;
                if (!(!a || !b || a.stickyTracking || this.inClass(b, "RBG_charts-tooltip") || (this.inClass(b, "RBG_charts-series-" + a.index) && this.inClass(b, "RBG_charts-tracker")))) a.onMouseOut();
            };
            d.prototype.inClass = function (b, a) {
                for (var c; b; ) {
                    if ((c = x(b, "class"))) {
                        if (-1 !== c.indexOf(a)) return !0;
                        if (-1 !== c.indexOf("RBG_charts-container")) return !1;
                    }
                    b = b.parentNode;
                }
            };
            d.prototype.init = function (b, a) {
                this.options = a;
                this.chart = b;
                this.runChartClick = a.chart.events && !!a.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                m && ((b.tooltip = new m(b, a.tooltip)), (this.followTouchMove = e(a.tooltip.followTouchMove, !0)));
                this.setDOMEvents();
            };
            d.prototype.normalize = function (b, a) {
                var c = b.touches,
                    d = c ? (c.length ? c.item(0) : e(c.changedTouches, b.changedTouches)[0]) : b;
                a || (a = this.getChartPosition());
                c = d.pageX - a.left;
                a = d.pageY - a.top;
                if ((d = this.chart.containerScaling)) (c /= d.scaleX), (a /= d.scaleY);
                return w(b, { chartX: Math.round(c), chartY: Math.round(a) });
            };
            d.prototype.onContainerClick = function (b) {
                var a = this.chart,
                    c = a.hoverPoint;
                b = this.normalize(b);
                var d = a.plotLeft,
                    e = a.plotTop;
                a.cancelClick ||
                    (c && this.inClass(b.target, "RBG_charts-tracker")
                        ? (l(c.series, "click", w(b, { point: c })), a.hoverPoint && c.firePointEvent("click", b))
                        : (w(b, this.getCoordinates(b)), a.isInsidePlot(b.chartX - d, b.chartY - e) && l(a, "click", b)));
            };
            d.prototype.onContainerMouseDown = function (b) {
                var a = 1 === ((b.buttons || b.button) & 1);
                b = this.normalize(b);
                if (n.isFirefox && 0 !== b.button) this.onContainerMouseMove(b);
                if ("undefined" === typeof b.button || a) this.zoomOption(b), a && b.preventDefault && b.preventDefault(), this.dragStart(b);
            };
            d.prototype.onContainerMouseLeave = function (b) {
                var a = J[e(n.hoverChartIndex, -1)],
                    c = this.chart.tooltip;
                b = this.normalize(b);
                a && (b.relatedTarget || b.toElement) && (a.pointer.reset(), (a.pointer.chartPosition = void 0));
                c && !c.isHidden && this.reset();
            };
            d.prototype.onContainerMouseEnter = function (b) {
                delete this.chartPosition;
            };
            d.prototype.onContainerMouseMove = function (b) {
                var a = this.chart;
                b = this.normalize(b);
                this.setHoverChartIndex();
                b.preventDefault || (b.returnValue = !1);
                "mousedown" === a.mouseIsDown && this.drag(b);
                a.openMenu || (!this.inClass(b.target, "RBG_charts-tracker") && !a.isInsidePlot(b.chartX - a.plotLeft, b.chartY - a.plotTop)) || this.runPointActions(b);
            };
            d.prototype.onDocumentTouchEnd = function (b) {
                J[n.hoverChartIndex] && J[n.hoverChartIndex].pointer.drop(b);
            };
            d.prototype.onContainerTouchMove = function (b) {
                this.touch(b);
            };
            d.prototype.onContainerTouchStart = function (b) {
                this.zoomOption(b);
                this.touch(b, !0);
            };
            d.prototype.onDocumentMouseMove = function (b) {
                var a = this.chart,
                    c = this.chartPosition;
                b = this.normalize(b, c);
                var d = a.tooltip;
                !c || (d && d.isStickyOnContact()) || a.isInsidePlot(b.chartX - a.plotLeft, b.chartY - a.plotTop) || this.inClass(b.target, "RBG_charts-tracker") || this.reset();
            };
            d.prototype.onDocumentMouseUp = function (b) {
                var a = J[e(n.hoverChartIndex, -1)];
                a && a.pointer.drop(b);
            };
            d.prototype.pinch = function (b) {
                var a = this,
                    c = a.chart,
                    d = a.pinchDown,
                    g = b.touches || [],
                    p = g.length,
                    h = a.lastValidTouch,
                    l = a.hasZoom,
                    t = a.selectionMarker,
                    z = {},
                    E = 1 === p && ((a.inClass(b.target, "RBG_charts-tracker") && c.runTrackerClick) || a.runChartClick),
                    C = {};
                1 < p && (a.initiated = !0);
                l && a.initiated && !E && !1 !== b.cancelable && b.preventDefault();
                [].map.call(g, function (b) {
                    return a.normalize(b);
                });
                "touchstart" === b.type
                    ? ([].forEach.call(g, function (a, b) {
                          d[b] = { chartX: a.chartX, chartY: a.chartY };
                      }),
                      (h.x = [d[0].chartX, d[1] && d[1].chartX]),
                      (h.y = [d[0].chartY, d[1] && d[1].chartY]),
                      c.axes.forEach(function (a) {
                          if (a.zoomEnabled) {
                              var b = c.bounds[a.horiz ? "h" : "v"],
                                  d = a.minPixelPadding,
                                  k = a.toPixels(Math.min(e(a.options.min, a.dataMin), a.dataMin)),
                                  u = a.toPixels(Math.max(e(a.options.max, a.dataMax), a.dataMax)),
                                  g = Math.max(k, u);
                              b.min = Math.min(a.pos, Math.min(k, u) - d);
                              b.max = Math.max(a.pos + a.len, g + d);
                          }
                      }),
                      (a.res = !0))
                    : a.followTouchMove && 1 === p
                    ? this.runPointActions(a.normalize(b))
                    : d.length && (t || (a.selectionMarker = t = w({ destroy: K, touch: !0 }, c.plotBox)), a.pinchTranslate(d, g, z, t, C, h), (a.hasPinched = l), a.scaleGroups(z, C), a.res && ((a.res = !1), this.reset(!1, 0)));
            };
            d.prototype.pinchTranslate = function (b, a, d, e, g, p) {
                this.zoomHor && this.pinchTranslateDirection(!0, b, a, d, e, g, p);
                this.zoomVert && this.pinchTranslateDirection(!1, b, a, d, e, g, p);
            };
            d.prototype.pinchTranslateDirection = function (b, a, d, e, g, p, h, l) {
                var c = this.chart,
                    k = b ? "x" : "y",
                    u = b ? "X" : "Y",
                    y = "chart" + u,
                    I = b ? "width" : "height",
                    f = c["plot" + (b ? "Left" : "Top")],
                    r,
                    t,
                    q = l || 1,
                    w = c.inverted,
                    L = c.bounds[b ? "h" : "v"],
                    H = 1 === a.length,
                    n = a[0][y],
                    x = d[0][y],
                    G = !H && a[1][y],
                    v = !H && d[1][y];
                d = function () {
                    "number" === typeof v && 20 < Math.abs(n - G) && (q = l || Math.abs(x - v) / Math.abs(n - G));
                    t = (f - x) / q + n;
                    r = c["plot" + (b ? "Width" : "Height")] / q;
                };
                d();
                a = t;
                if (a < L.min) {
                    a = L.min;
                    var P = !0;
                } else a + r > L.max && ((a = L.max - r), (P = !0));
                P ? ((x -= 0.8 * (x - h[k][0])), "number" === typeof v && (v -= 0.8 * (v - h[k][1])), d()) : (h[k] = [x, v]);
                w || ((p[k] = t - f), (p[I] = r));
                p = w ? 1 / q : q;
                g[I] = r;
                g[k] = a;
                e[w ? (b ? "scaleY" : "scaleX") : "scale" + u] = q;
                e["translate" + u] = p * f + (x - p * n);
            };
            d.prototype.reset = function (d, a) {
                var c = this.chart,
                    e = c.hoverSeries,
                    g = c.hoverPoint,
                    p = c.hoverPoints,
                    h = c.tooltip,
                    l = h && h.shared ? p : g;
                d &&
                    l &&
                    b(l).forEach(function (a) {
                        a.series.isCartesian && "undefined" === typeof a.plotX && (d = !1);
                    });
                if (d)
                    h &&
                        l &&
                        b(l).length &&
                        (h.refresh(l),
                        h.shared && p
                            ? p.forEach(function (a) {
                                  a.setState(a.state, !0);
                                  a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a));
                              })
                            : g &&
                              (g.setState(g.state, !0),
                              c.axes.forEach(function (a) {
                                  a.crosshair && g.series[a.coll] === a && a.drawCrosshair(null, g);
                              })));
                else {
                    if (g) g.onMouseOut();
                    p &&
                        p.forEach(function (a) {
                            a.setState();
                        });
                    if (e) e.onMouseOut();
                    h && h.hide(a);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    c.axes.forEach(function (a) {
                        a.hideCrosshair();
                    });
                    this.hoverX = c.hoverPoints = c.hoverPoint = null;
                }
            };
            d.prototype.runPointActions = function (b, a) {
                var d = this.chart,
                    c = d.tooltip && d.tooltip.options.enabled ? d.tooltip : void 0,
                    g = c ? c.shared : !1,
                    p = a || d.hoverPoint,
                    h = (p && p.series) || d.hoverSeries;
                h = this.getHoverData(p, h, d.series, (!b || "touchmove" !== b.type) && (!!a || (h && h.directTouch && this.isDirectTouch)), g, b);
                p = h.hoverPoint;
                var l = h.hoverPoints;
                a = (h = h.hoverSeries) && h.tooltipOptions.followPointer;
                g = g && h && !h.noSharedTooltip;
                if (p && (p !== d.hoverPoint || (c && c.isHidden))) {
                    (d.hoverPoints || []).forEach(function (a) {
                        -1 === l.indexOf(a) && a.setState();
                    });
                    if (d.hoverSeries !== h) h.onMouseOver();
                    this.applyInactiveState(l);
                    (l || []).forEach(function (a) {
                        a.setState("hover");
                    });
                    d.hoverPoint && d.hoverPoint.firePointEvent("mouseOut");
                    if (!p.series) return;
                    d.hoverPoints = l;
                    d.hoverPoint = p;
                    p.firePointEvent("mouseOver");
                    c && c.refresh(g ? l : p, b);
                } else a && c && !c.isHidden && ((p = c.getAnchor([{}], b)), c.updatePosition({ plotX: p[0], plotY: p[1] }));
                this.unDocMouseMove ||
                    (this.unDocMouseMove = D(d.container.ownerDocument, "mousemove", function (a) {
                        var b = J[n.hoverChartIndex];
                        if (b) b.pointer.onDocumentMouseMove(a);
                    }));
                d.axes.forEach(function (a) {
                    var c = e((a.crosshair || {}).snap, !0),
                        k;
                    c &&
                        (((k = d.hoverPoint) && k.series[a.coll] === a) ||
                            (k = G(l, function (b) {
                                return b.series[a.coll] === a;
                            })));
                    k || !c ? a.drawCrosshair(b, k) : a.hideCrosshair();
                });
            };
            d.prototype.scaleGroups = function (b, a) {
                var d = this.chart,
                    c;
                d.series.forEach(function (k) {
                    c = b || k.getPlotBox();
                    k.xAxis && k.xAxis.zoomEnabled && k.group && (k.group.attr(c), k.markerGroup && (k.markerGroup.attr(c), k.markerGroup.clip(a ? d.clipRect : null)), k.dataLabelsGroup && k.dataLabelsGroup.attr(c));
                });
                d.clipRect.attr(a || d.clipBox);
            };
            d.prototype.setDOMEvents = function () {
                var b = this.chart.container,
                    a = b.ownerDocument;
                b.onmousedown = this.onContainerMouseDown.bind(this);
                b.onmousemove = this.onContainerMouseMove.bind(this);
                b.onclick = this.onContainerClick.bind(this);
                this.unbindContainerMouseEnter = D(b, "mouseenter", this.onContainerMouseEnter.bind(this));
                this.unbindContainerMouseLeave = D(b, "mouseleave", this.onContainerMouseLeave.bind(this));
                n.unbindDocumentMouseUp || (n.unbindDocumentMouseUp = D(a, "mouseup", this.onDocumentMouseUp.bind(this)));
                n.hasTouch &&
                    (D(b, "touchstart", this.onContainerTouchStart.bind(this)),
                    D(b, "touchmove", this.onContainerTouchMove.bind(this)),
                    n.unbindDocumentTouchEnd || (n.unbindDocumentTouchEnd = D(a, "touchend", this.onDocumentTouchEnd.bind(this))));
            };
            d.prototype.setHoverChartIndex = function () {
                var b = this.chart,
                    a = n.charts[e(n.hoverChartIndex, -1)];
                if (a && a !== b) a.pointer.onContainerMouseLeave({ relatedTarget: !0 });
                (a && a.mouseIsDown) || (n.hoverChartIndex = b.index);
            };
            d.prototype.touch = function (b, a) {
                var d = this.chart,
                    c;
                this.setHoverChartIndex();
                if (1 === b.touches.length)
                    if (((b = this.normalize(b)), (c = d.isInsidePlot(b.chartX - d.plotLeft, b.chartY - d.plotTop)) && !d.openMenu)) {
                        a && this.runPointActions(b);
                        if ("touchmove" === b.type) {
                            a = this.pinchDown;
                            var g = a[0] ? 4 <= Math.sqrt(Math.pow(a[0].chartX - b.chartX, 2) + Math.pow(a[0].chartY - b.chartY, 2)) : !1;
                        }
                        e(g, !0) && this.pinch(b);
                    } else a && this.reset();
                else 2 === b.touches.length && this.pinch(b);
            };
            d.prototype.zoomOption = function (b) {
                var a = this.chart,
                    d = a.options.chart,
                    c = d.zoomType || "";
                a = a.inverted;
                /touch/.test(b.type) && (c = e(d.pinchType, c));
                this.zoomX = b = /x/.test(c);
                this.zoomY = c = /y/.test(c);
                this.zoomHor = (b && !a) || (c && a);
                this.zoomVert = (c && !a) || (b && a);
                this.hasZoom = b || c;
            };
            return d;
        })();
        return (n.Pointer = v);
    });
    O(m, "Core/MSPointer.js", [m["Core/Globals.js"], m["Core/Pointer.js"], m["Core/Utilities.js"]], function (v, n, m) {
        function B() {
            var g = [];
            g.item = function (g) {
                return this[g];
            };
            w(l, function (h) {
                g.push({ pageX: h.pageX, pageY: h.pageY, target: h.target });
            });
            return g;
        }
        function F(g, h, p, e) {
            ("touch" !== g.pointerType && g.pointerType !== g.MSPOINTER_TYPE_TOUCH) || !K[v.hoverChartIndex] || (e(g), (e = K[v.hoverChartIndex].pointer), e[h]({ type: p, target: g.currentTarget, preventDefault: x, touches: B() }));
        }
        var J =
                (this && this.__extends) ||
                (function () {
                    var g = function (h, p) {
                        g =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (e, b) {
                                    e.__proto__ = b;
                                }) ||
                            function (e, b) {
                                for (var d in b) b.hasOwnProperty(d) && (e[d] = b[d]);
                            };
                        return g(h, p);
                    };
                    return function (h, p) {
                        function e() {
                            this.constructor = h;
                        }
                        g(h, p);
                        h.prototype = null === p ? Object.create(p) : ((e.prototype = p.prototype), new e());
                    };
                })(),
            K = v.charts,
            D = v.doc,
            x = v.noop,
            q = m.addEvent,
            t = m.css,
            w = m.objectEach,
            G = m.removeEvent,
            l = {},
            h = !!v.win.PointerEvent;
        return (function (g) {
            function w() {
                return (null !== g && g.apply(this, arguments)) || this;
            }
            J(w, g);
            w.prototype.batchMSEvents = function (g) {
                g(this.chart.container, h ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                g(this.chart.container, h ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                g(D, h ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
            };
            w.prototype.destroy = function () {
                this.batchMSEvents(G);
                g.prototype.destroy.call(this);
            };
            w.prototype.init = function (p, e) {
                g.prototype.init.call(this, p, e);
                this.hasZoom && t(p.container, { "-ms-touch-action": "none", "touch-action": "none" });
            };
            w.prototype.onContainerPointerDown = function (g) {
                F(g, "onContainerTouchStart", "touchstart", function (e) {
                    l[e.pointerId] = { pageX: e.pageX, pageY: e.pageY, target: e.currentTarget };
                });
            };
            w.prototype.onContainerPointerMove = function (g) {
                F(g, "onContainerTouchMove", "touchmove", function (e) {
                    l[e.pointerId] = { pageX: e.pageX, pageY: e.pageY };
                    l[e.pointerId].target || (l[e.pointerId].target = e.currentTarget);
                });
            };
            w.prototype.onDocumentPointerUp = function (g) {
                F(g, "onDocumentTouchEnd", "touchend", function (e) {
                    delete l[e.pointerId];
                });
            };
            w.prototype.setDOMEvents = function () {
                g.prototype.setDOMEvents.call(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(q);
            };
            return w;
        })(n);
    });
    O(m, "Core/Legend.js", [m["Core/Animation/AnimationUtilities.js"], m["Core/Globals.js"], m["Core/Utilities.js"]], function (v, n, m) {
        var B = v.animObject,
            F = v.setAnimation,
            J = m.addEvent,
            K = m.css,
            D = m.defined,
            x = m.discardElement,
            q = m.find,
            t = m.fireEvent,
            w = m.format,
            G = m.isNumber,
            l = m.merge,
            h = m.pick,
            g = m.relativeLength,
            H = m.stableSort,
            p = m.syncTimeout;
        v = m.wrap;
        m = n.isFirefox;
        var e = n.marginNames,
            b = n.win,
            d = (function () {
                function b(a, b) {
                    this.allItems = [];
                    this.contentGroup = this.box = void 0;
                    this.display = !1;
                    this.group = void 0;
                    this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
                    this.options = {};
                    this.padding = 0;
                    this.pages = [];
                    this.proximate = !1;
                    this.scrollGroup = void 0;
                    this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
                    this.chart = a;
                    this.init(a, b);
                }
                b.prototype.init = function (a, b) {
                    this.chart = a;
                    this.setOptions(b);
                    b.enabled &&
                        (this.render(),
                        J(this.chart, "endResize", function () {
                            this.legend.positionCheckboxes();
                        }),
                        this.proximate
                            ? (this.unchartrender = J(this.chart, "render", function () {
                                  this.legend.proximatePositions();
                                  this.legend.positionItems();
                              }))
                            : this.unchartrender && this.unchartrender());
                };
                b.prototype.setOptions = function (a) {
                    var b = h(a.padding, 8);
                    this.options = a;
                    this.chart.styledMode || ((this.itemStyle = a.itemStyle), (this.itemHiddenStyle = l(this.itemStyle, a.itemHiddenStyle)));
                    this.itemMarginTop = a.itemMarginTop || 0;
                    this.itemMarginBottom = a.itemMarginBottom || 0;
                    this.padding = b;
                    this.initialItemY = b - 5;
                    this.symbolWidth = h(a.symbolWidth, 16);
                    this.pages = [];
                    this.proximate = "proximate" === a.layout && !this.chart.inverted;
                    this.baseline = void 0;
                };
                b.prototype.update = function (a, b) {
                    var d = this.chart;
                    this.setOptions(l(!0, this.options, a));
                    this.destroy();
                    d.isDirtyLegend = d.isDirtyBox = !0;
                    h(b, !0) && d.redraw();
                    t(this, "afterUpdate");
                };
                b.prototype.colorizeItem = function (a, b) {
                    a.legendGroup[b ? "removeClass" : "addClass"]("RBG_charts-legend-item-hidden");
                    if (!this.chart.styledMode) {
                        var d = this.options,
                            c = a.legendItem,
                            k = a.legendLine,
                            e = a.legendSymbol,
                            g = this.itemHiddenStyle.color;
                        d = b ? d.itemStyle.color : g;
                        var p = b ? a.color || g : g,
                            h = a.options && a.options.marker,
                            E = { fill: p };
                        c && c.css({ fill: d, color: d });
                        k && k.attr({ stroke: p });
                        e && (h && e.isMarker && ((E = a.pointAttribs()), b || (E.stroke = E.fill = g)), e.attr(E));
                    }
                    t(this, "afterColorizeItem", { item: a, visible: b });
                };
                b.prototype.positionItems = function () {
                    this.allItems.forEach(this.positionItem, this);
                    this.chart.isResizing || this.positionCheckboxes();
                };
                b.prototype.positionItem = function (a) {
                    var b = this,
                        d = this.options,
                        c = d.symbolPadding,
                        e = !d.rtl,
                        g = a._legendItemPos;
                    d = g[0];
                    g = g[1];
                    var p = a.checkbox,
                        h = a.legendGroup;
                    h &&
                        h.element &&
                        ((c = { translateX: e ? d : this.legendWidth - d - 2 * c - 4, translateY: g }),
                        (e = function () {
                            t(b, "afterPositionItem", { item: a });
                        }),
                        D(h.translateY) ? h.animate(c, void 0, e) : (h.attr(c), e()));
                    p && ((p.x = d), (p.y = g));
                };
                b.prototype.destroyItem = function (a) {
                    var b = a.checkbox;
                    ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (b) {
                        a[b] && (a[b] = a[b].destroy());
                    });
                    b && x(a.checkbox);
                };
                b.prototype.destroy = function () {
                    function a(a) {
                        this[a] && (this[a] = this[a].destroy());
                    }
                    this.getAllItems().forEach(function (b) {
                        ["legendItem", "legendGroup"].forEach(a, b);
                    });
                    "clipRect up down pager nav box title group".split(" ").forEach(a, this);
                    this.display = null;
                };
                b.prototype.positionCheckboxes = function () {
                    var a = this.group && this.group.alignAttr,
                        b = this.clipHeight || this.legendHeight,
                        d = this.titleHeight;
                    if (a) {
                        var c = a.translateY;
                        this.allItems.forEach(function (k) {
                            var e = k.checkbox;
                            if (e) {
                                var u = c + d + e.y + (this.scrollOffset || 0) + 3;
                                K(e, { left: a.translateX + k.checkboxOffset + e.x - 20 + "px", top: u + "px", display: this.proximate || (u > c - 6 && u < c + b - 6) ? "" : "none" });
                            }
                        }, this);
                    }
                };
                b.prototype.renderTitle = function () {
                    var a = this.options,
                        b = this.padding,
                        d = a.title,
                        c = 0;
                    d.text &&
                        (this.title ||
                            ((this.title = this.chart.renderer.label(d.text, b - 3, b - 4, null, null, null, a.useHTML, null, "legend-title").attr({ zIndex: 1 })),
                            this.chart.styledMode || this.title.css(d.style),
                            this.title.add(this.group)),
                        d.width || this.title.css({ width: this.maxLegendWidth + "px" }),
                        (a = this.title.getBBox()),
                        (c = a.height),
                        (this.offsetWidth = a.width),
                        this.contentGroup.attr({ translateY: c }));
                    this.titleHeight = c;
                };
                b.prototype.setText = function (a) {
                    var b = this.options;
                    a.legendItem.attr({ text: b.labelFormat ? w(b.labelFormat, a, this.chart) : b.labelFormatter.call(a) });
                };
                b.prototype.renderItem = function (a) {
                    var b = this.chart,
                        d = b.renderer,
                        c = this.options,
                        e = this.symbolWidth,
                        g = c.symbolPadding,
                        p = this.itemStyle,
                        t = this.itemHiddenStyle,
                        z = "horizontal" === c.layout ? h(c.itemDistance, 20) : 0,
                        E = !c.rtl,
                        C = a.legendItem,
                        A = !a.series,
                        f = !A && a.series.drawLegendSymbol ? a.series : a,
                        r = f.options;
                    r = this.createCheckboxForItem && r && r.showCheckbox;
                    z = e + g + z + (r ? 20 : 0);
                    var N = c.useHTML,
                        q = a.options.className;
                    C ||
                        ((a.legendGroup = d
                            .g("legend-item")
                            .addClass("RBG_charts-" + f.type + "-series RBG_charts-color-" + a.colorIndex + (q ? " " + q : "") + (A ? " RBG_charts-series-" + a.index : ""))
                            .attr({ zIndex: 1 })
                            .add(this.scrollGroup)),
                        (a.legendItem = C = d.text("", E ? e + g : -g, this.baseline || 0, N)),
                        b.styledMode || C.css(l(a.visible ? p : t)),
                        C.attr({ align: E ? "left" : "right", zIndex: 2 }).add(a.legendGroup),
                        this.baseline || ((this.fontMetrics = d.fontMetrics(b.styledMode ? 12 : p.fontSize, C)), (this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop), C.attr("y", this.baseline)),
                        (this.symbolHeight = c.symbolHeight || this.fontMetrics.f),
                        f.drawLegendSymbol(this, a),
                        this.setItemEvents && this.setItemEvents(a, C, N));
                    r && !a.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(a);
                    this.colorizeItem(a, a.visible);
                    (!b.styledMode && p.width) || C.css({ width: (c.itemWidth || this.widthOption || b.spacingBox.width) - z + "px" });
                    this.setText(a);
                    b = C.getBBox();
                    a.itemWidth = a.checkboxOffset = c.itemWidth || a.legendItemWidth || b.width + z;
                    this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                    this.totalItemWidth += a.itemWidth;
                    this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || b.height || this.symbolHeight);
                };
                b.prototype.layoutItem = function (a) {
                    var b = this.options,
                        d = this.padding,
                        c = "horizontal" === b.layout,
                        e = a.itemHeight,
                        g = this.itemMarginBottom,
                        p = this.itemMarginTop,
                        l = c ? h(b.itemDistance, 20) : 0,
                        z = this.maxLegendWidth;
                    b = b.alignColumns && this.totalItemWidth > z ? this.maxItemWidth : a.itemWidth;
                    c && this.itemX - d + b > z && ((this.itemX = d), this.lastLineHeight && (this.itemY += p + this.lastLineHeight + g), (this.lastLineHeight = 0));
                    this.lastItemY = p + this.itemY + g;
                    this.lastLineHeight = Math.max(e, this.lastLineHeight);
                    a._legendItemPos = [this.itemX, this.itemY];
                    c ? (this.itemX += b) : ((this.itemY += p + e + g), (this.lastLineHeight = e));
                    this.offsetWidth = this.widthOption || Math.max((c ? this.itemX - d - (a.checkbox ? 0 : l) : b) + d, this.offsetWidth);
                };
                b.prototype.getAllItems = function () {
                    var a = [];
                    this.chart.series.forEach(function (b) {
                        var d = b && b.options;
                        b && h(d.showInLegend, D(d.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === d.legendType ? b.data : b)));
                    });
                    t(this, "afterGetAllItems", { allItems: a });
                    return a;
                };
                b.prototype.getAlignment = function () {
                    var a = this.options;
                    return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0);
                };
                b.prototype.adjustMargins = function (a, b) {
                    var d = this.chart,
                        c = this.options,
                        k = this.getAlignment();
                    k &&
                        [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (u, g) {
                            u.test(k) && !D(a[g]) && (d[e[g]] = Math.max(d[e[g]], d.legend[(g + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][g] * c[g % 2 ? "x" : "y"] + h(c.margin, 12) + b[g] + (d.titleOffset[g] || 0)));
                        });
                };
                b.prototype.proximatePositions = function () {
                    var a = this.chart,
                        b = [],
                        d = "left" === this.options.align;
                    this.allItems.forEach(function (c) {
                        var e;
                        var k = d;
                        if (c.yAxis) {
                            c.xAxis.options.reversed && (k = !k);
                            c.points &&
                                (e = q(k ? c.points : c.points.slice(0).reverse(), function (a) {
                                    return G(a.plotY);
                                }));
                            k = this.itemMarginTop + c.legendItem.getBBox().height + this.itemMarginBottom;
                            var u = c.yAxis.top - a.plotTop;
                            c.visible ? ((e = e ? e.plotY : c.yAxis.height), (e += u - 0.3 * k)) : (e = u + c.yAxis.height);
                            b.push({ target: e, size: k, item: c });
                        }
                    }, this);
                    n.distribute(b, a.plotHeight);
                    b.forEach(function (b) {
                        b.item._legendItemPos[1] = a.plotTop - a.spacing[0] + b.pos;
                    });
                };
                b.prototype.render = function () {
                    var a = this.chart,
                        b = a.renderer,
                        d = this.group,
                        c = this.box,
                        e = this.options,
                        p = this.padding;
                    this.itemX = p;
                    this.itemY = this.initialItemY;
                    this.lastItemY = this.offsetWidth = 0;
                    this.widthOption = g(e.width, a.spacingBox.width - p);
                    var h = a.spacingBox.width - 2 * p - e.x;
                    -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (h /= 2);
                    this.maxLegendWidth = this.widthOption || h;
                    d || ((this.group = d = b.g("legend").attr({ zIndex: 7 }).add()), (this.contentGroup = b.g().attr({ zIndex: 1 }).add(d)), (this.scrollGroup = b.g().add(this.contentGroup)));
                    this.renderTitle();
                    var l = this.getAllItems();
                    H(l, function (a, b) {
                        return ((a.options && a.options.legendIndex) || 0) - ((b.options && b.options.legendIndex) || 0);
                    });
                    e.reversed && l.reverse();
                    this.allItems = l;
                    this.display = h = !!l.length;
                    this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                    l.forEach(this.renderItem, this);
                    l.forEach(this.layoutItem, this);
                    l = (this.widthOption || this.offsetWidth) + p;
                    var z = this.lastItemY + this.lastLineHeight + this.titleHeight;
                    z = this.handleOverflow(z);
                    z += p;
                    c || ((this.box = c = b.rect().addClass("RBG_charts-legend-box").attr({ r: e.borderRadius }).add(d)), (c.isNew = !0));
                    a.styledMode || c.attr({ stroke: e.borderColor, "stroke-width": e.borderWidth || 0, fill: e.backgroundColor || "none" }).shadow(e.shadow);
                    0 < l && 0 < z && (c[c.isNew ? "attr" : "animate"](c.crisp.call({}, { x: 0, y: 0, width: l, height: z }, c.strokeWidth())), (c.isNew = !1));
                    c[h ? "show" : "hide"]();
                    a.styledMode && "none" === d.getStyle("display") && (l = z = 0);
                    this.legendWidth = l;
                    this.legendHeight = z;
                    h && this.align();
                    this.proximate || this.positionItems();
                    t(this, "afterRender");
                };
                b.prototype.align = function (a) {
                    void 0 === a && (a = this.chart.spacingBox);
                    var b = this.chart,
                        d = this.options,
                        c = a.y;
                    /(lth|ct|rth)/.test(this.getAlignment()) && 0 < b.titleOffset[0] ? (c += b.titleOffset[0]) : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < b.titleOffset[2] && (c -= b.titleOffset[2]);
                    c !== a.y && (a = l(a, { y: c }));
                    this.group.align(l(d, { width: this.legendWidth, height: this.legendHeight, verticalAlign: this.proximate ? "top" : d.verticalAlign }), !0, a);
                };
                b.prototype.handleOverflow = function (a) {
                    var b = this,
                        d = this.chart,
                        c = d.renderer,
                        e = this.options,
                        g = e.y,
                        p = this.padding;
                    g = d.spacingBox.height + ("top" === e.verticalAlign ? -g : g) - p;
                    var l = e.maxHeight,
                        z,
                        E = this.clipRect,
                        C = e.navigation,
                        A = h(C.animation, !0),
                        f = C.arrowSize || 12,
                        r = this.nav,
                        t = this.pages,
                        q,
                        w = this.allItems,
                        n = function (a) {
                            "number" === typeof a ? E.attr({ height: a }) : E && ((b.clipRect = E.destroy()), b.contentGroup.clip());
                            b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + p + "px,9999px," + (p + a) + "px,0)" : "auto");
                        },
                        x = function (a) {
                            b[a] = c
                                .circle(0, 0, 1.3 * f)
                                .translate(f / 2, f / 2)
                                .add(r);
                            d.styledMode || b[a].attr("fill", "rgba(0,0,0,0.0001)");
                            return b[a];
                        };
                    "horizontal" !== e.layout || "middle" === e.verticalAlign || e.floating || (g /= 2);
                    l && (g = Math.min(g, l));
                    t.length = 0;
                    a > g && !1 !== C.enabled
                        ? ((this.clipHeight = z = Math.max(g - 20 - this.titleHeight - p, 0)),
                          (this.currentPage = h(this.currentPage, 1)),
                          (this.fullHeight = a),
                          w.forEach(function (a, b) {
                              var f = a._legendItemPos[1],
                                  d = Math.round(a.legendItem.getBBox().height),
                                  c = t.length;
                              if (!c || (f - t[c - 1] > z && (q || f) !== t[c - 1])) t.push(q || f), c++;
                              a.pageIx = c - 1;
                              q && (w[b - 1].pageIx = c - 1);
                              b === w.length - 1 && f + d - t[c - 1] > z && f !== q && (t.push(f), (a.pageIx = c));
                              f !== q && (q = f);
                          }),
                          E || ((E = b.clipRect = c.clipRect(0, p, 9999, 0)), b.contentGroup.clip(E)),
                          n(z),
                          r ||
                              ((this.nav = r = c.g().attr({ zIndex: 1 }).add(this.group)),
                              (this.up = c.symbol("triangle", 0, 0, f, f).add(r)),
                              x("upTracker").on("click", function () {
                                  b.scroll(-1, A);
                              }),
                              (this.pager = c.text("", 15, 10).addClass("RBG_charts-legend-navigation")),
                              d.styledMode || this.pager.css(C.style),
                              this.pager.add(r),
                              (this.down = c.symbol("triangle-down", 0, 0, f, f).add(r)),
                              x("downTracker").on("click", function () {
                                  b.scroll(1, A);
                              })),
                          b.scroll(0),
                          (a = g))
                        : r && (n(), (this.nav = r.destroy()), this.scrollGroup.attr({ translateY: 1 }), (this.clipHeight = 0));
                    return a;
                };
                b.prototype.scroll = function (a, b) {
                    var d = this,
                        c = this.chart,
                        e = this.pages,
                        k = e.length,
                        g = this.currentPage + a;
                    a = this.clipHeight;
                    var l = this.options.navigation,
                        z = this.pager,
                        E = this.padding;
                    g > k && (g = k);
                    0 < g &&
                        ("undefined" !== typeof b && F(b, c),
                        this.nav.attr({ translateX: E, translateY: a + this.padding + 7 + this.titleHeight, visibility: "visible" }),
                        [this.up, this.upTracker].forEach(function (a) {
                            a.attr({ class: 1 === g ? "RBG_charts-legend-nav-inactive" : "RBG_charts-legend-nav-active" });
                        }),
                        z.attr({ text: g + "/" + k }),
                        [this.down, this.downTracker].forEach(function (a) {
                            a.attr({ x: 18 + this.pager.getBBox().width, class: g === k ? "RBG_charts-legend-nav-inactive" : "RBG_charts-legend-nav-active" });
                        }, this),
                        c.styledMode ||
                            (this.up.attr({ fill: 1 === g ? l.inactiveColor : l.activeColor }),
                            this.upTracker.css({ cursor: 1 === g ? "default" : "pointer" }),
                            this.down.attr({ fill: g === k ? l.inactiveColor : l.activeColor }),
                            this.downTracker.css({ cursor: g === k ? "default" : "pointer" })),
                        (this.scrollOffset = -e[g - 1] + this.initialItemY),
                        this.scrollGroup.animate({ translateY: this.scrollOffset }),
                        (this.currentPage = g),
                        this.positionCheckboxes(),
                        (b = B(h(b, c.renderer.globalAnimation, !0))),
                        p(function () {
                            t(d, "afterScroll", { currentPage: g });
                        }, b.duration));
                };
                return b;
            })();
        (/Trident\/7\.0/.test(b.navigator && b.navigator.userAgent) || m) &&
            v(d.prototype, "positionItem", function (b, a) {
                var d = this,
                    c = function () {
                        a._legendItemPos && b.call(d, a);
                    };
                c();
                d.bubbleLegend || setTimeout(c);
            });
        n.Legend = d;
        return n.Legend;
    });
    O(m, "Core/Series/Point.js", [m["Core/Animation/AnimationUtilities.js"], m["Core/Globals.js"], m["Core/Utilities.js"]], function (m, n, M) {
        var v = m.animObject,
            F = M.defined,
            J = M.erase,
            K = M.extend,
            D = M.fireEvent,
            x = M.format,
            q = M.getNestedProperty,
            t = M.isArray,
            w = M.isNumber,
            G = M.isObject,
            l = M.syncTimeout,
            h = M.pick,
            g = M.removeEvent,
            H = M.uniqueKey;
        ("");
        m = (function () {
            function p() {
                this.colorIndex = this.category = void 0;
                this.formatPrefix = "point";
                this.id = void 0;
                this.isNull = !1;
                this.percentage = this.options = this.name = void 0;
                this.selected = !1;
                this.total = this.series = void 0;
                this.visible = !0;
                this.x = void 0;
            }
            p.prototype.animateBeforeDestroy = function () {
                var e = this,
                    b = { x: e.startXPos, opacity: 0 },
                    d,
                    c = e.getGraphicalProps();
                c.singular.forEach(function (a) {
                    d = "dataLabel" === a;
                    e[a] = e[a].animate(d ? { x: e[a].startXPos, y: e[a].startYPos, opacity: 0 } : b);
                });
                c.plural.forEach(function (a) {
                    e[a].forEach(function (a) {
                        a.element && a.animate(K({ x: e.startXPos }, a.startYPos ? { x: a.startXPos, y: a.startYPos } : {}));
                    });
                });
            };
            p.prototype.applyOptions = function (e, b) {
                var d = this.series,
                    c = d.options.pointValKey || d.pointValKey;
                e = p.prototype.optionsToObject.call(this, e);
                K(this, e);
                this.options = this.options ? K(this.options, e) : e;
                e.group && delete this.group;
                e.dataLabels && delete this.dataLabels;
                c && (this.y = p.prototype.getNestedProperty.call(this, c));
                this.formatPrefix = (this.isNull = h(this.isValid && !this.isValid(), null === this.x || !w(this.y))) ? "null" : "point";
                this.selected && (this.state = "select");
                "name" in this && "undefined" === typeof b && d.xAxis && d.xAxis.hasNames && (this.x = d.xAxis.nameToX(this));
                "undefined" === typeof this.x && d && (this.x = "undefined" === typeof b ? d.autoIncrement(this) : b);
                return this;
            };
            p.prototype.destroy = function () {
                function e() {
                    if (b.graphic || b.dataLabel || b.dataLabels) g(b), b.destroyElements();
                    for (u in b) b[u] = null;
                }
                var b = this,
                    d = b.series,
                    c = d.chart;
                d = d.options.dataSorting;
                var a = c.hoverPoints,
                    k = v(b.series.chart.renderer.globalAnimation),
                    u;
                b.legendItem && c.legend.destroyItem(b);
                a && (b.setState(), J(a, b), a.length || (c.hoverPoints = null));
                if (b === c.hoverPoint) b.onMouseOut();
                d && d.enabled ? (this.animateBeforeDestroy(), l(e, k.duration)) : e();
                c.pointCount--;
            };
            p.prototype.destroyElements = function (e) {
                var b = this;
                e = b.getGraphicalProps(e);
                e.singular.forEach(function (d) {
                    b[d] = b[d].destroy();
                });
                e.plural.forEach(function (d) {
                    b[d].forEach(function (b) {
                        b.element && b.destroy();
                    });
                    delete b[d];
                });
            };
            p.prototype.firePointEvent = function (e, b, d) {
                var c = this,
                    a = this.series.options;
                (a.point.events[e] || (c.options && c.options.events && c.options.events[e])) && c.importEvents();
                "click" === e &&
                    a.allowPointSelect &&
                    (d = function (a) {
                        c.select && c.select(null, a.ctrlKey || a.metaKey || a.shiftKey);
                    });
                D(c, e, b, d);
            };
            p.prototype.getClassName = function () {
                return (
                    "RBG_charts-point" +
                    (this.selected ? " RBG_charts-point-select" : "") +
                    (this.negative ? " RBG_charts-negative" : "") +
                    (this.isNull ? " RBG_charts-null-point" : "") +
                    ("undefined" !== typeof this.colorIndex ? " RBG_charts-color-" + this.colorIndex : "") +
                    (this.options.className ? " " + this.options.className : "") +
                    (this.zone && this.zone.className ? " " + this.zone.className.replace("RBG_charts-negative", "") : "")
                );
            };
            p.prototype.getGraphicalProps = function (e) {
                var b = this,
                    d = [],
                    c,
                    a = { singular: [], plural: [] };
                e = e || { graphic: 1, dataLabel: 1 };
                e.graphic && d.push("graphic", "shadowGroup");
                e.dataLabel && d.push("dataLabel", "dataLabelUpper", "connector");
                for (c = d.length; c--; ) {
                    var k = d[c];
                    b[k] && a.singular.push(k);
                }
                ["dataLabel", "connector"].forEach(function (d) {
                    var c = d + "s";
                    e[d] && b[c] && a.plural.push(c);
                });
                return a;
            };
            p.prototype.getLabelConfig = function () {
                return { x: this.category, y: this.y, color: this.color, colorIndex: this.colorIndex, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal };
            };
            p.prototype.getNestedProperty = function (e) {
                if (e) return 0 === e.indexOf("custom.") ? q(e, this.options) : this[e];
            };
            p.prototype.getZone = function () {
                var e = this.series,
                    b = e.zones;
                e = e.zoneAxis || "y";
                var d = 0,
                    c;
                for (c = b[d]; this[e] >= c.value; ) c = b[++d];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = c && c.color && !this.options.color ? c.color : this.nonZonedColor;
                return c;
            };
            p.prototype.hasNewShapeType = function () {
                return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType;
            };
            p.prototype.init = function (e, b, d) {
                this.series = e;
                this.applyOptions(b, d);
                this.id = F(this.id) ? this.id : H();
                this.resolveColor();
                e.chart.pointCount++;
                D(this, "afterInit");
                return this;
            };
            p.prototype.optionsToObject = function (e) {
                var b = {},
                    d = this.series,
                    c = d.options.keys,
                    a = c || d.pointArrayMap || ["y"],
                    k = a.length,
                    g = 0,
                    h = 0;
                if (w(e) || null === e) b[a[0]] = e;
                else if (t(e))
                    for (!c && e.length > k && ((d = typeof e[0]), "string" === d ? (b.name = e[0]) : "number" === d && (b.x = e[0]), g++); h < k; )
                        (c && "undefined" === typeof e[g]) || (0 < a[h].indexOf(".") ? p.prototype.setNestedProperty(b, e[g], a[h]) : (b[a[h]] = e[g])), g++, h++;
                else "object" === typeof e && ((b = e), e.dataLabels && (d._hasPointLabels = !0), e.marker && (d._hasPointMarkers = !0));
                return b;
            };
            p.prototype.resolveColor = function () {
                var e = this.series;
                var b = e.chart.options.chart.colorCount;
                var d = e.chart.styledMode;
                delete this.nonZonedColor;
                d || this.options.color || (this.color = e.color);
                e.options.colorByPoint
                    ? (d || ((b = e.options.colors || e.chart.options.colors), (this.color = this.color || b[e.colorCounter]), (b = b.length)), (d = e.colorCounter), e.colorCounter++, e.colorCounter === b && (e.colorCounter = 0))
                    : (d = e.colorIndex);
                this.colorIndex = h(this.colorIndex, d);
            };
            p.prototype.setNestedProperty = function (e, b, d) {
                d.split(".").reduce(function (d, a, e, g) {
                    d[a] = g.length - 1 === e ? b : G(d[a], !0) ? d[a] : {};
                    return d[a];
                }, e);
                return e;
            };
            p.prototype.tooltipFormatter = function (e) {
                var b = this.series,
                    d = b.tooltipOptions,
                    c = h(d.valueDecimals, ""),
                    a = d.valuePrefix || "",
                    k = d.valueSuffix || "";
                b.chart.styledMode && (e = b.chart.tooltip.styledModeFormat(e));
                (b.pointArrayMap || ["y"]).forEach(function (b) {
                    b = "{point." + b;
                    if (a || k) e = e.replace(RegExp(b + "}", "g"), a + b + "}" + k);
                    e = e.replace(RegExp(b + "}", "g"), b + ":,." + c + "f}");
                });
                return x(e, { point: this, series: this.series }, b.chart);
            };
            return p;
        })();
        return (n.Point = m);
    });
    O(m, "Core/Series/Series.js", [m["Core/Globals.js"], m["Core/Series/Point.js"], m["Core/Utilities.js"]], function (m, n, M) {
        var v = M.error,
            F = M.extendClass,
            J = M.fireEvent,
            K = M.getOptions,
            D = M.isObject,
            x = M.merge,
            q = M.objectEach;
        M = (function () {
            function t(q, n) {
                var l = x(t.defaultOptions, n);
                this.chart = q;
                this._i = q.series.length;
                q.series.push(this);
                this.options = l;
                this.userOptions = x(n);
            }
            t.addSeries = function (q, n) {
                t.seriesTypes[q] = n;
            };
            t.cleanRecursively = function (w, n) {
                var l = {};
                q(w, function (h, g) {
                    if (D(w[g], !0) && !w.nodeType && n[g]) (h = t.cleanRecursively(w[g], n[g])), Object.keys(h).length && (l[g] = h);
                    else if (D(w[g]) || w[g] !== n[g]) l[g] = w[g];
                });
                return l;
            };
            t.getSeries = function (q, n) {
                void 0 === n && (n = {});
                var l = q.options.chart;
                l = n.type || l.type || l.defaultSeriesType || "";
                var h = t.seriesTypes[l];
                h || v(17, !0, q, { missingModuleFor: l });
                return new h(q, n);
            };
            t.seriesType = function (q, G, l, h, g) {
                var w = K().plotOptions || {},
                    p = t.seriesTypes;
                G = G || "";
                w[q] = x(w[G], l);
                t.addSeries(q, F(p[G] || function () {}, h));
                p[q].prototype.type = q;
                g && (p[q].prototype.pointClass = F(n, g));
                return p[q];
            };
            t.prototype.update = function (q, n) {
                void 0 === n && (n = !0);
                var l = this;
                q = t.cleanRecursively(q, this.userOptions);
                var h = q.type;
                "undefined" !== typeof h && h !== l.type && (l = t.getSeries(l.chart, q));
                J(l, "update", { newOptions: q });
                l.userOptions = x(q);
                J(l, "afterUpdate", { newOptions: q });
                n && l.chart.redraw();
                return l;
            };
            t.defaultOptions = { type: "base" };
            t.seriesTypes = {};
            return t;
        })();
        M.prototype.pointClass = n;
        m.seriesType = M.seriesType;
        m.seriesTypes = M.seriesTypes;
        return M;
    });
    O(
        m,
        "Core/Chart/Chart.js",
        [
            m["Core/Animation/AnimationUtilities.js"],
            m["Core/Axis/Axis.js"],
            m["Core/Series/Series.js"],
            m["Core/Globals.js"],
            m["Core/Legend.js"],
            m["Core/MSPointer.js"],
            m["Core/Options.js"],
            m["Core/Pointer.js"],
            m["Core/Time.js"],
            m["Core/Utilities.js"],
        ],
        function (m, n, M, B, F, J, K, D, x, q) {
            var t = m.animate,
                w = m.animObject,
                G = m.setAnimation,
                l = B.charts,
                h = B.doc,
                g = B.win,
                H = K.defaultOptions,
                p = q.addEvent,
                e = q.attr,
                b = q.createElement,
                d = q.css,
                c = q.defined,
                a = q.discardElement,
                k = q.erase,
                u = q.error,
                I = q.extend,
                y = q.find,
                L = q.fireEvent,
                v = q.getStyle,
                Q = q.isArray,
                z = q.isFunction,
                E = q.isNumber,
                C = q.isObject,
                A = q.isString,
                f = q.merge,
                r = q.numberFormat,
                N = q.objectEach,
                R = q.pick,
                S = q.pInt,
                ea = q.relativeLength,
                Z = q.removeEvent,
                aa = q.splat,
                ba = q.syncTimeout,
                X = q.uniqueKey,
                V = B.marginNames,
                U = (function () {
                    function m(a, b, f) {
                        this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = this.series = this.renderTo = this.renderer = this.pointer = this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.legend = this.labelCollectors = this.isResizing = this.index = this.container = this.colorCounter = this.clipBox = this.chartWidth = this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0;
                        this.getArgs(a, b, f);
                    }
                    m.prototype.getArgs = function (a, b, f) {
                        A(a) || a.nodeName ? ((this.renderTo = a), this.init(b, f)) : this.init(a, b);
                    };
                    m.prototype.init = function (a, b) {
                        var d,
                            c = a.series,
                            e = a.plotOptions || {};
                        L(this, "init", { args: arguments }, function () {
                            a.series = null;
                            d = f(H, a);
                            var k = d.chart || {};
                            N(d.plotOptions, function (a, b) {
                                C(a) && (a.tooltip = (e[b] && f(e[b].tooltip)) || void 0);
                            });
                            d.tooltip.userOptions = (a.chart && a.chart.forExport && a.tooltip.userOptions) || a.tooltip;
                            d.series = a.series = c;
                            this.userOptions = a;
                            var g = k.events;
                            this.margin = [];
                            this.spacing = [];
                            this.bounds = { h: {}, v: {} };
                            this.labelCollectors = [];
                            this.callback = b;
                            this.isResizing = 0;
                            this.options = d;
                            this.axes = [];
                            this.series = [];
                            this.time = a.time && Object.keys(a.time).length ? new x(a.time) : B.time;
                            this.numberFormatter = k.numberFormatter || r;
                            this.styledMode = k.styledMode;
                            this.hasCartesianSeries = k.showAxes;
                            var u = this;
                            u.index = l.length;
                            l.push(u);
                            B.chartCount++;
                            g &&
                                N(g, function (a, b) {
                                    z(a) && p(u, b, a);
                                });
                            u.xAxis = [];
                            u.yAxis = [];
                            u.pointCount = u.colorCounter = u.symbolCounter = 0;
                            L(u, "afterInit");
                            u.firstRender();
                        });
                    };
                    m.prototype.initSeries = function (a) {
                        var b = this.options.chart;
                        b = a.type || b.type || b.defaultSeriesType;
                        var f = M.seriesTypes[b];
                        f || u(17, !0, this, { missingModuleFor: b });
                        b = new f(this, a);
                        "function" === typeof b.init && b.init(this, a);
                        return b;
                    };
                    m.prototype.setSeriesData = function () {
                        this.getSeriesOrderByLinks().forEach(function (a) {
                            a.points || a.data || !a.enabledDataSorting || a.setData(a.options.data, !1);
                        });
                    };
                    m.prototype.getSeriesOrderByLinks = function () {
                        return this.series.concat().sort(function (a, b) {
                            return a.linkedSeries.length || b.linkedSeries.length ? b.linkedSeries.length - a.linkedSeries.length : 0;
                        });
                    };
                    m.prototype.orderSeries = function (a) {
                        var b = this.series;
                        for (a = a || 0; a < b.length; a++) b[a] && ((b[a].index = a), (b[a].name = b[a].getName()));
                    };
                    m.prototype.isInsidePlot = function (a, b, f) {
                        var d = f ? b : a;
                        a = f ? a : b;
                        d = { x: d, y: a, isInsidePlot: 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight };
                        L(this, "afterIsInsidePlot", d);
                        return d.isInsidePlot;
                    };
                    m.prototype.redraw = function (a) {
                        L(this, "beforeRedraw");
                        var b = this,
                            f = b.axes,
                            d = b.series,
                            c = b.pointer,
                            r = b.legend,
                            e = b.userOptions.legend,
                            k = b.isDirtyLegend,
                            g = b.hasCartesianSeries,
                            u = b.isDirtyBox,
                            p = b.renderer,
                            h = p.isHidden(),
                            z = [];
                        b.setResponsive && b.setResponsive(!1);
                        G(b.hasRendered ? a : !1, b);
                        h && b.temporaryDisplay();
                        b.layOutTitles();
                        for (a = d.length; a--; ) {
                            var l = d[a];
                            if (l.options.stacking) {
                                var C = !0;
                                if (l.isDirty) {
                                    var y = !0;
                                    break;
                                }
                            }
                        }
                        if (y) for (a = d.length; a--; ) (l = d[a]), l.options.stacking && (l.isDirty = !0);
                        d.forEach(function (a) {
                            a.isDirty && ("point" === a.options.legendType ? ("function" === typeof a.updateTotals && a.updateTotals(), (k = !0)) : e && (e.labelFormatter || e.labelFormat) && (k = !0));
                            a.isDirtyData && L(a, "updatedData");
                        });
                        k && r && r.options.enabled && (r.render(), (b.isDirtyLegend = !1));
                        C && b.getStacks();
                        g &&
                            f.forEach(function (a) {
                                (b.isResizing && E(a.min)) || (a.updateNames(), a.setScale());
                            });
                        b.getMargins();
                        g &&
                            (f.forEach(function (a) {
                                a.isDirty && (u = !0);
                            }),
                            f.forEach(function (a) {
                                var b = a.min + "," + a.max;
                                a.extKey !== b &&
                                    ((a.extKey = b),
                                    z.push(function () {
                                        L(a, "afterSetExtremes", I(a.eventArgs, a.getExtremes()));
                                        delete a.eventArgs;
                                    }));
                                (u || C) && a.redraw();
                            }));
                        u && b.drawChartBox();
                        L(b, "predraw");
                        d.forEach(function (a) {
                            (u || a.isDirty) && a.visible && a.redraw();
                            a.isDirtyData = !1;
                        });
                        c && c.reset(!0);
                        p.draw();
                        L(b, "redraw");
                        L(b, "render");
                        h && b.temporaryDisplay(!0);
                        z.forEach(function (a) {
                            a.call();
                        });
                    };
                    m.prototype.get = function (a) {
                        function b(b) {
                            return b.id === a || (b.options && b.options.id === a);
                        }
                        var f = this.series,
                            d;
                        var c = y(this.axes, b) || y(this.series, b);
                        for (d = 0; !c && d < f.length; d++) c = y(f[d].points || [], b);
                        return c;
                    };
                    m.prototype.getAxes = function () {
                        var a = this,
                            b = this.options,
                            f = (b.xAxis = aa(b.xAxis || {}));
                        b = b.yAxis = aa(b.yAxis || {});
                        L(this, "getAxes");
                        f.forEach(function (a, b) {
                            a.index = b;
                            a.isX = !0;
                        });
                        b.forEach(function (a, b) {
                            a.index = b;
                        });
                        f.concat(b).forEach(function (b) {
                            new n(a, b);
                        });
                        L(this, "afterGetAxes");
                    };
                    m.prototype.getSelectedPoints = function () {
                        var a = [];
                        this.series.forEach(function (b) {
                            a = a.concat(
                                b.getPointsCollection().filter(function (a) {
                                    return R(a.selectedStaging, a.selected);
                                })
                            );
                        });
                        return a;
                    };
                    m.prototype.getSelectedSeries = function () {
                        return this.series.filter(function (a) {
                            return a.selected;
                        });
                    };
                    m.prototype.setTitle = function (a, b, f) {
                        this.applyDescription("title", a);
                        this.applyDescription("subtitle", b);
                        this.applyDescription("caption", void 0);
                        this.layOutTitles(f);
                    };
                    m.prototype.applyDescription = function (a, b) {
                        var d = this,
                            c = "title" === a ? { color: "#333333", fontSize: this.options.isStock ? "16px" : "18px" } : { color: "#666666" };
                        c = this.options[a] = f(!this.styledMode && { style: c }, this.options[a], b);
                        var r = this[a];
                        r && b && (this[a] = r = r.destroy());
                        c &&
                            !r &&
                            ((r = this.renderer
                                .text(c.text, 0, 0, c.useHTML)
                                .attr({ align: c.align, class: "RBG_charts-" + a, zIndex: c.zIndex || 4 })
                                .add()),
                            (r.update = function (b) {
                                d[{ title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" }[a]](b);
                            }),
                            this.styledMode || r.css(c.style),
                            (this[a] = r));
                    };
                    m.prototype.layOutTitles = function (a) {
                        var b = [0, 0, 0],
                            f = this.renderer,
                            d = this.spacingBox;
                        ["title", "subtitle", "caption"].forEach(function (a) {
                            var c = this[a],
                                r = this.options[a],
                                e = r.verticalAlign || "top";
                            a = "title" === a ? -3 : "top" === e ? b[0] + 2 : 0;
                            if (c) {
                                if (!this.styledMode) var k = r.style.fontSize;
                                k = f.fontMetrics(k, c).b;
                                c.css({ width: (r.width || d.width + (r.widthAdjust || 0)) + "px" });
                                var g = Math.round(c.getBBox(r.useHTML).height);
                                c.align(I({ y: "bottom" === e ? k : a + k, height: g }, r), !1, "spacingBox");
                                r.floating || ("top" === e ? (b[0] = Math.ceil(b[0] + g)) : "bottom" === e && (b[2] = Math.ceil(b[2] + g)));
                            }
                        }, this);
                        b[0] && "top" === (this.options.title.verticalAlign || "top") && (b[0] += this.options.title.margin);
                        b[2] && "bottom" === this.options.caption.verticalAlign && (b[2] += this.options.caption.margin);
                        var c = !this.titleOffset || this.titleOffset.join(",") !== b.join(",");
                        this.titleOffset = b;
                        L(this, "afterLayOutTitles");
                        !this.isDirtyBox && c && ((this.isDirtyBox = this.isDirtyLegend = c), this.hasRendered && R(a, !0) && this.isDirtyBox && this.redraw());
                    };
                    m.prototype.getChartSize = function () {
                        var a = this.options.chart,
                            b = a.width;
                        a = a.height;
                        var f = this.renderTo;
                        c(b) || (this.containerWidth = v(f, "width"));
                        c(a) || (this.containerHeight = v(f, "height"));
                        this.chartWidth = Math.max(0, b || this.containerWidth || 600);
                        this.chartHeight = Math.max(0, ea(a, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400));
                    };
                    m.prototype.temporaryDisplay = function (a) {
                        var b = this.renderTo;
                        if (a) for (; b && b.style; ) b.hcOrigStyle && (d(b, b.hcOrigStyle), delete b.hcOrigStyle), b.hcOrigDetached && (h.body.removeChild(b), (b.hcOrigDetached = !1)), (b = b.parentNode);
                        else
                            for (; b && b.style; ) {
                                h.body.contains(b) || b.parentNode || ((b.hcOrigDetached = !0), h.body.appendChild(b));
                                if ("none" === v(b, "display", !1) || b.hcOricDetached)
                                    (b.hcOrigStyle = { display: b.style.display, height: b.style.height, overflow: b.style.overflow }),
                                        (a = { display: "block", overflow: "hidden" }),
                                        b !== this.renderTo && (a.height = 0),
                                        d(b, a),
                                        b.offsetWidth || b.style.setProperty("display", "block", "important");
                                b = b.parentNode;
                                if (b === h.body) break;
                            }
                    };
                    m.prototype.setClassName = function (a) {
                        this.container.className = "RBG_charts-container " + (a || "");
                    };
                    m.prototype.getContainer = function () {
                        var a = this.options,
                            f = a.chart;
                        var c = this.renderTo;
                        var r = X(),
                            k,
                            g;
                        c || (this.renderTo = c = f.renderTo);
                        A(c) && (this.renderTo = c = h.getElementById(c));
                        c || u(13, !0, this);
                        var p = S(e(c, "data-RBG_charts-chart"));
                        E(p) && l[p] && l[p].hasRendered && l[p].destroy();
                        e(c, "data-RBG_charts-chart", this.index);
                        c.innerHTML = "";
                        f.skipClone || c.offsetWidth || this.temporaryDisplay();
                        this.getChartSize();
                        p = this.chartWidth;
                        var z = this.chartHeight;
                        d(c, { overflow: "hidden" });
                        this.styledMode ||
                            (k = I(
                                { position: "relative", overflow: "hidden", width: p + "px", height: z + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)", userSelect: "none" },
                                f.style
                            ));
                        this.container = c = b("div", { id: r }, k, c);
                        this._cursor = c.style.cursor;
                        this.renderer = new (B[f.renderer] || B.Renderer)(c, p, z, null, f.forExport, a.exporting && a.exporting.allowHTML, this.styledMode);
                        G(void 0, this);
                        this.setClassName(f.className);
                        if (this.styledMode) for (g in a.defs) this.renderer.definition(a.defs[g]);
                        else this.renderer.setStyle(f.style);
                        this.renderer.chartIndex = this.index;
                        L(this, "afterGetContainer");
                    };
                    m.prototype.getMargins = function (a) {
                        var b = this.spacing,
                            f = this.margin,
                            d = this.titleOffset;
                        this.resetMargins();
                        d[0] && !c(f[0]) && (this.plotTop = Math.max(this.plotTop, d[0] + b[0]));
                        d[2] && !c(f[2]) && (this.marginBottom = Math.max(this.marginBottom, d[2] + b[2]));
                        this.legend && this.legend.display && this.legend.adjustMargins(f, b);
                        L(this, "getMargins");
                        a || this.getAxisMargins();
                    };
                    m.prototype.getAxisMargins = function () {
                        var a = this,
                            b = (a.axisOffset = [0, 0, 0, 0]),
                            f = a.colorAxis,
                            d = a.margin,
                            r = function (a) {
                                a.forEach(function (a) {
                                    a.visible && a.getOffset();
                                });
                            };
                        a.hasCartesianSeries ? r(a.axes) : f && f.length && r(f);
                        V.forEach(function (f, r) {
                            c(d[r]) || (a[f] += b[r]);
                        });
                        a.setChartSize();
                    };
                    m.prototype.reflow = function (a) {
                        var b = this,
                            f = b.options.chart,
                            d = b.renderTo,
                            r = c(f.width) && c(f.height),
                            e = f.width || v(d, "width");
                        f = f.height || v(d, "height");
                        d = a ? a.target : g;
                        if (!r && !b.isPrinting && e && f && (d === g || d === h)) {
                            if (e !== b.containerWidth || f !== b.containerHeight)
                                q.clearTimeout(b.reflowTimeout),
                                    (b.reflowTimeout = ba(
                                        function () {
                                            b.container && b.setSize(void 0, void 0, !1);
                                        },
                                        a ? 100 : 0
                                    ));
                            b.containerWidth = e;
                            b.containerHeight = f;
                        }
                    };
                    m.prototype.setReflow = function (a) {
                        var b = this;
                        !1 === a || this.unbindReflow
                            ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow())
                            : ((this.unbindReflow = p(g, "resize", function (a) {
                                  b.options && b.reflow(a);
                              })),
                              p(this, "destroy", this.unbindReflow));
                    };
                    m.prototype.setSize = function (a, b, f) {
                        var c = this,
                            r = c.renderer;
                        c.isResizing += 1;
                        G(f, c);
                        f = r.globalAnimation;
                        c.oldChartHeight = c.chartHeight;
                        c.oldChartWidth = c.chartWidth;
                        "undefined" !== typeof a && (c.options.chart.width = a);
                        "undefined" !== typeof b && (c.options.chart.height = b);
                        c.getChartSize();
                        c.styledMode || (f ? t : d)(c.container, { width: c.chartWidth + "px", height: c.chartHeight + "px" }, f);
                        c.setChartSize(!0);
                        r.setSize(c.chartWidth, c.chartHeight, f);
                        c.axes.forEach(function (a) {
                            a.isDirty = !0;
                            a.setScale();
                        });
                        c.isDirtyLegend = !0;
                        c.isDirtyBox = !0;
                        c.layOutTitles();
                        c.getMargins();
                        c.redraw(f);
                        c.oldChartHeight = null;
                        L(c, "resize");
                        ba(function () {
                            c &&
                                L(c, "endResize", null, function () {
                                    --c.isResizing;
                                });
                        }, w(f).duration);
                    };
                    m.prototype.setChartSize = function (a) {
                        var b = this.inverted,
                            f = this.renderer,
                            d = this.chartWidth,
                            c = this.chartHeight,
                            r = this.options.chart,
                            e = this.spacing,
                            k = this.clipOffset,
                            g,
                            u,
                            p,
                            h;
                        this.plotLeft = g = Math.round(this.plotLeft);
                        this.plotTop = u = Math.round(this.plotTop);
                        this.plotWidth = p = Math.max(0, Math.round(d - g - this.marginRight));
                        this.plotHeight = h = Math.max(0, Math.round(c - u - this.marginBottom));
                        this.plotSizeX = b ? h : p;
                        this.plotSizeY = b ? p : h;
                        this.plotBorderWidth = r.plotBorderWidth || 0;
                        this.spacingBox = f.spacingBox = { x: e[3], y: e[0], width: d - e[3] - e[1], height: c - e[0] - e[2] };
                        this.plotBox = f.plotBox = { x: g, y: u, width: p, height: h };
                        d = 2 * Math.floor(this.plotBorderWidth / 2);
                        b = Math.ceil(Math.max(d, k[3]) / 2);
                        f = Math.ceil(Math.max(d, k[0]) / 2);
                        this.clipBox = { x: b, y: f, width: Math.floor(this.plotSizeX - Math.max(d, k[1]) / 2 - b), height: Math.max(0, Math.floor(this.plotSizeY - Math.max(d, k[2]) / 2 - f)) };
                        a ||
                            this.axes.forEach(function (a) {
                                a.setAxisSize();
                                a.setAxisTranslation();
                            });
                        L(this, "afterSetChartSize", { skipAxes: a });
                    };
                    m.prototype.resetMargins = function () {
                        L(this, "resetMargins");
                        var a = this,
                            b = a.options.chart;
                        ["margin", "spacing"].forEach(function (f) {
                            var d = b[f],
                                c = C(d) ? d : [d, d, d, d];
                            ["Top", "Right", "Bottom", "Left"].forEach(function (d, r) {
                                a[f][r] = R(b[f + d], c[r]);
                            });
                        });
                        V.forEach(function (b, f) {
                            a[b] = R(a.margin[f], a.spacing[f]);
                        });
                        a.axisOffset = [0, 0, 0, 0];
                        a.clipOffset = [0, 0, 0, 0];
                    };
                    m.prototype.drawChartBox = function () {
                        var a = this.options.chart,
                            b = this.renderer,
                            f = this.chartWidth,
                            d = this.chartHeight,
                            c = this.chartBackground,
                            r = this.plotBackground,
                            e = this.plotBorder,
                            k = this.styledMode,
                            g = this.plotBGImage,
                            u = a.backgroundColor,
                            p = a.plotBackgroundColor,
                            h = a.plotBackgroundImage,
                            E,
                            z = this.plotLeft,
                            l = this.plotTop,
                            C = this.plotWidth,
                            y = this.plotHeight,
                            A = this.plotBox,
                            t = this.clipRect,
                            q = this.clipBox,
                            N = "animate";
                        c || ((this.chartBackground = c = b.rect().addClass("RBG_charts-background").add()), (N = "attr"));
                        if (k) var I = (E = c.strokeWidth());
                        else {
                            I = a.borderWidth || 0;
                            E = I + (a.shadow ? 8 : 0);
                            u = { fill: u || "none" };
                            if (I || c["stroke-width"]) (u.stroke = a.borderColor), (u["stroke-width"] = I);
                            c.attr(u).shadow(a.shadow);
                        }
                        c[N]({ x: E / 2, y: E / 2, width: f - E - (I % 2), height: d - E - (I % 2), r: a.borderRadius });
                        N = "animate";
                        r || ((N = "attr"), (this.plotBackground = r = b.rect().addClass("RBG_charts-plot-background").add()));
                        r[N](A);
                        k || (r.attr({ fill: p || "none" }).shadow(a.plotShadow), h && (g ? (h !== g.attr("href") && g.attr("href", h), g.animate(A)) : (this.plotBGImage = b.image(h, z, l, C, y).add())));
                        t ? t.animate({ width: q.width, height: q.height }) : (this.clipRect = b.clipRect(q));
                        N = "animate";
                        e || ((N = "attr"), (this.plotBorder = e = b.rect().addClass("RBG_charts-plot-border").attr({ zIndex: 1 }).add()));
                        k || e.attr({ stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none" });
                        e[N](e.crisp({ x: z, y: l, width: C, height: y }, -e.strokeWidth()));
                        this.isDirtyBox = !1;
                        L(this, "afterDrawChartBox");
                    };
                    m.prototype.propFromSeries = function () {
                        var a = this,
                            b = a.options.chart,
                            f,
                            d = a.options.series,
                            c,
                            r;
                        ["inverted", "angular", "polar"].forEach(function (e) {
                            f = M.seriesTypes[b.type || b.defaultSeriesType];
                            r = b[e] || (f && f.prototype[e]);
                            for (c = d && d.length; !r && c--; ) (f = M.seriesTypes[d[c].type]) && f.prototype[e] && (r = !0);
                            a[e] = r;
                        });
                    };
                    m.prototype.linkSeries = function () {
                        var a = this,
                            b = a.series;
                        b.forEach(function (a) {
                            a.linkedSeries.length = 0;
                        });
                        b.forEach(function (b) {
                            var f = b.options.linkedTo;
                            A(f) &&
                                (f = ":previous" === f ? a.series[b.index - 1] : a.get(f)) &&
                                f.linkedParent !== b &&
                                (f.linkedSeries.push(b), (b.linkedParent = f), f.enabledDataSorting && b.setDataSortingOptions(), (b.visible = R(b.options.visible, f.options.visible, b.visible)));
                        });
                        L(this, "afterLinkSeries");
                    };
                    m.prototype.renderSeries = function () {
                        this.series.forEach(function (a) {
                            a.translate();
                            a.render();
                        });
                    };
                    m.prototype.renderLabels = function () {
                        var a = this,
                            b = a.options.labels;
                        b.items &&
                            b.items.forEach(function (f) {
                                var d = I(b.style, f.style),
                                    c = S(d.left) + a.plotLeft,
                                    r = S(d.top) + a.plotTop + 12;
                                delete d.left;
                                delete d.top;
                                a.renderer.text(f.html, c, r).attr({ zIndex: 2 }).css(d).add();
                            });
                    };
                    m.prototype.render = function () {
                        var a = this.axes,
                            b = this.colorAxis,
                            f = this.renderer,
                            d = this.options,
                            c = 0,
                            r = function (a) {
                                a.forEach(function (a) {
                                    a.visible && a.render();
                                });
                            };
                        this.setTitle();
                        this.legend = new F(this, d.legend);
                        this.getStacks && this.getStacks();
                        this.getMargins(!0);
                        this.setChartSize();
                        d = this.plotWidth;
                        a.some(function (a) {
                            if (a.horiz && a.visible && a.options.labels.enabled && a.series.length) return (c = 21), !0;
                        });
                        var e = (this.plotHeight = Math.max(this.plotHeight - c, 0));
                        a.forEach(function (a) {
                            a.setScale();
                        });
                        this.getAxisMargins();
                        var k = 1.1 < d / this.plotWidth;
                        var g = 1.05 < e / this.plotHeight;
                        if (k || g)
                            a.forEach(function (a) {
                                ((a.horiz && k) || (!a.horiz && g)) && a.setTickInterval(!0);
                            }),
                                this.getMargins();
                        this.drawChartBox();
                        this.hasCartesianSeries ? r(a) : b && b.length && r(b);
                        this.seriesGroup || (this.seriesGroup = f.g("series-group").attr({ zIndex: 3 }).add());
                        this.renderSeries();
                        this.renderLabels();
                        this.addCredits();
                        this.setResponsive && this.setResponsive();
                        this.updateContainerScaling();
                        this.hasRendered = !0;
                    };
                    m.prototype.addCredits = function (a) {
                        var b = this,
                            d = f(!0, this.options.credits, a);
                        d.enabled &&
                            !this.credits &&
                            ((this.credits = this.renderer
                                .text(d.text + (this.mapCredits || ""), 0, 0)
                                .addClass("RBG_charts-credits")
                                .on("click", function () {
                                    d.href && (g.location.href = d.href);
                                })
                                .attr({ align: d.position.align, zIndex: 8 })),
                            b.styledMode || this.credits.css(d.style),
                            this.credits.add().align(d.position),
                            (this.credits.update = function (a) {
                                b.credits = b.credits.destroy();
                                b.addCredits(a);
                            }));
                    };
                    m.prototype.updateContainerScaling = function () {
                        var a = this.container;
                        if (2 < a.offsetWidth && 2 < a.offsetHeight && a.getBoundingClientRect) {
                            var b = a.getBoundingClientRect(),
                                f = b.width / a.offsetWidth;
                            a = b.height / a.offsetHeight;
                            1 !== f || 1 !== a ? (this.containerScaling = { scaleX: f, scaleY: a }) : delete this.containerScaling;
                        }
                    };
                    m.prototype.destroy = function () {
                        var b = this,
                            f = b.axes,
                            d = b.series,
                            c = b.container,
                            r,
                            e = c && c.parentNode;
                        L(b, "destroy");
                        b.renderer.forExport ? k(l, b) : (l[b.index] = void 0);
                        B.chartCount--;
                        b.renderTo.removeAttribute("data-RBG_charts-chart");
                        Z(b);
                        for (r = f.length; r--; ) f[r] = f[r].destroy();
                        this.scroller && this.scroller.destroy && this.scroller.destroy();
                        for (r = d.length; r--; ) d[r] = d[r].destroy();
                        "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (a) {
                            var f = b[a];
                            f && f.destroy && (b[a] = f.destroy());
                        });
                        c && ((c.innerHTML = ""), Z(c), e && a(c));
                        N(b, function (a, f) {
                            delete b[f];
                        });
                    };
                    m.prototype.firstRender = function () {
                        var a = this,
                            b = a.options;
                        if (!a.isReadyToRender || a.isReadyToRender()) {
                            a.getContainer();
                            a.resetMargins();
                            a.setChartSize();
                            a.propFromSeries();
                            a.getAxes();
                            (Q(b.series) ? b.series : []).forEach(function (b) {
                                a.initSeries(b);
                            });
                            a.linkSeries();
                            a.setSeriesData();
                            L(a, "beforeRender");
                            D && (a.pointer = B.hasTouch || (!g.PointerEvent && !g.MSPointerEvent) ? new D(a, b) : new J(a, b));
                            a.render();
                            if (!a.renderer.imgCount && !a.hasLoaded) a.onload();
                            a.temporaryDisplay(!0);
                        }
                    };
                    m.prototype.onload = function () {
                        this.callbacks.concat([this.callback]).forEach(function (a) {
                            a && "undefined" !== typeof this.index && a.apply(this, [this]);
                        }, this);
                        L(this, "load");
                        L(this, "render");
                        c(this.index) && this.setReflow(this.options.chart.reflow);
                        this.hasLoaded = !0;
                    };
                    return m;
                })();
            U.prototype.callbacks = [];
            B.chart = function (a, b, f) {
                return new U(a, b, f);
            };
            return (B.Chart = U);
        }
    );
    O(m, "Extensions/ScrollablePlotArea.js", [m["Core/Animation/AnimationUtilities.js"], m["Core/Chart/Chart.js"], m["Core/Globals.js"], m["Core/Utilities.js"]], function (m, n, M, B) {
        var v = m.stop,
            J = B.addEvent,
            K = B.createElement,
            D = B.pick;
        ("");
        J(n, "afterSetChartSize", function (n) {
            var q = this.options.chart.scrollablePlotArea,
                t = q && q.minWidth;
            q = q && q.minHeight;
            if (!this.renderer.forExport) {
                if (t) {
                    if ((this.scrollablePixelsX = t = Math.max(0, t - this.chartWidth))) {
                        this.plotWidth += t;
                        this.inverted ? ((this.clipBox.height += t), (this.plotBox.height += t)) : ((this.clipBox.width += t), (this.plotBox.width += t));
                        var w = { 1: { name: "right", value: t } };
                    }
                } else
                    q &&
                        (this.scrollablePixelsY = t = Math.max(0, q - this.chartHeight)) &&
                        ((this.plotHeight += t), this.inverted ? ((this.clipBox.width += t), (this.plotBox.width += t)) : ((this.clipBox.height += t), (this.plotBox.height += t)), (w = { 2: { name: "bottom", value: t } }));
                w &&
                    !n.skipAxes &&
                    this.axes.forEach(function (t) {
                        w[t.side]
                            ? (t.getPlotLinePath = function () {
                                  var l = w[t.side].name,
                                      h = this[l];
                                  this[l] = h - w[t.side].value;
                                  var g = M.Axis.prototype.getPlotLinePath.apply(this, arguments);
                                  this[l] = h;
                                  return g;
                              })
                            : (t.setAxisSize(), t.setAxisTranslation());
                    });
            }
        });
        J(n, "render", function () {
            this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed();
        });
        n.prototype.setUpScrolling = function () {
            var n = this,
                q = { WebkitOverflowScrolling: "touch", overflowX: "hidden", overflowY: "hidden" };
            this.scrollablePixelsX && (q.overflowX = "auto");
            this.scrollablePixelsY && (q.overflowY = "auto");
            this.scrollingParent = K("div", { className: "RBG_charts-scrolling-parent" }, { position: "relative" }, this.renderTo);
            this.scrollingContainer = K("div", { className: "RBG_charts-scrolling" }, q, this.scrollingParent);
            J(this.scrollingContainer, "scroll", function () {
                n.pointer && delete n.pointer.chartPosition;
            });
            this.innerContainer = K("div", { className: "RBG_charts-inner-container" }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null;
        };
        n.prototype.moveFixedElements = function () {
            var n = this.container,
                q = this.fixedRenderer,
                t = ".RBG_charts-contextbutton .RBG_charts-credits .RBG_charts-legend .RBG_charts-legend-checkbox .RBG_charts-navigator-series .RBG_charts-navigator-xaxis .RBG_charts-navigator-yaxis .RBG_charts-navigator .RBG_charts-reset-zoom .RBG_charts-scrollbar .RBG_charts-subtitle .RBG_charts-title".split(
                    " "
                ),
                w;
            this.scrollablePixelsX && !this.inverted
                ? (w = ".RBG_charts-yaxis")
                : this.scrollablePixelsX && this.inverted
                ? (w = ".RBG_charts-xaxis")
                : this.scrollablePixelsY && !this.inverted
                ? (w = ".RBG_charts-xaxis")
                : this.scrollablePixelsY && this.inverted && (w = ".RBG_charts-yaxis");
            t.push(w, w + "-labels");
            t.forEach(function (t) {
                [].forEach.call(n.querySelectorAll(t), function (l) {
                    (l.namespaceURI === q.SVG_NS ? q.box : q.box.parentNode).appendChild(l);
                    l.style.pointerEvents = "auto";
                });
            });
        };
        n.prototype.applyFixed = function () {
            var n,
                q,
                t = !this.fixedDiv,
                w = this.options.chart.scrollablePlotArea;
            t
                ? ((this.fixedDiv = K("div", { className: "RBG_charts-fixed" }, { position: "absolute", overflow: "hidden", pointerEvents: "none", zIndex: 2, top: 0 }, null, !0)),
                  null === (n = this.scrollingContainer) || void 0 === n ? void 0 : n.parentNode.insertBefore(this.fixedDiv, this.scrollingContainer),
                  (this.renderTo.style.overflow = "visible"),
                  (this.fixedRenderer = n = new M.Renderer(this.fixedDiv, this.chartWidth, this.chartHeight, null === (q = this.options.chart) || void 0 === q ? void 0 : q.style)),
                  (this.scrollableMask = n
                      .path()
                      .attr({ fill: this.options.chart.backgroundColor || "#fff", "fill-opacity": D(w.opacity, 0.85), zIndex: -1 })
                      .addClass("RBG_charts-scrollable-mask")
                      .add()),
                  this.moveFixedElements(),
                  J(this, "afterShowResetZoom", this.moveFixedElements),
                  J(this, "afterLayOutTitles", this.moveFixedElements))
                : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            q = this.chartWidth + (this.scrollablePixelsX || 0);
            n = this.chartHeight + (this.scrollablePixelsY || 0);
            v(this.container);
            this.container.style.width = q + "px";
            this.container.style.height = n + "px";
            this.renderer.boxWrapper.attr({ width: q, height: n, viewBox: [0, 0, q, n].join(" ") });
            this.chartBackground.attr({ width: q, height: n });
            this.scrollingContainer.style.height = this.chartHeight + "px";
            t && (w.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * w.scrollPositionX), w.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * w.scrollPositionY));
            n = this.axisOffset;
            t = this.plotTop - n[0] - 1;
            w = this.plotLeft - n[3] - 1;
            q = this.plotTop + this.plotHeight + n[2] + 1;
            n = this.plotLeft + this.plotWidth + n[1] + 1;
            var m = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
                l = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
            t = this.scrollablePixelsX
                ? [["M", 0, t], ["L", this.plotLeft - 1, t], ["L", this.plotLeft - 1, q], ["L", 0, q], ["Z"], ["M", m, t], ["L", this.chartWidth, t], ["L", this.chartWidth, q], ["L", m, q], ["Z"]]
                : this.scrollablePixelsY
                ? [["M", w, 0], ["L", w, this.plotTop - 1], ["L", n, this.plotTop - 1], ["L", n, 0], ["Z"], ["M", w, l], ["L", w, this.chartHeight], ["L", n, this.chartHeight], ["L", n, l], ["Z"]]
                : [["M", 0, 0]];
            "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({ d: t });
        };
    });
    O(m, "Core/Axis/StackingAxis.js", [m["Core/Animation/AnimationUtilities.js"], m["Core/Utilities.js"]], function (m, n) {
        var v = m.getDeferredAnimation,
            B = n.addEvent,
            F = n.destroyObjectProperties,
            J = n.fireEvent,
            K = n.objectEach,
            D = n.pick,
            x = (function () {
                function q(t) {
                    this.oldStacks = {};
                    this.stacks = {};
                    this.stacksTouched = 0;
                    this.axis = t;
                }
                q.prototype.buildStacks = function () {
                    var t = this.axis,
                        q = t.series,
                        n = D(t.options.reversedStacks, !0),
                        l = q.length,
                        h;
                    if (!t.isXAxis) {
                        this.usePercentage = !1;
                        for (h = l; h--; ) {
                            var g = q[n ? h : l - h - 1];
                            g.setStackedPoints();
                            g.setGroupedPoints();
                        }
                        for (h = 0; h < l; h++) q[h].modifyStacks();
                        J(t, "afterBuildStacks");
                    }
                };
                q.prototype.cleanStacks = function () {
                    if (!this.axis.isXAxis) {
                        if (this.oldStacks) var t = (this.stacks = this.oldStacks);
                        K(t, function (t) {
                            K(t, function (t) {
                                t.cumulative = t.total;
                            });
                        });
                    }
                };
                q.prototype.resetStacks = function () {
                    var t = this,
                        q = t.stacks;
                    t.axis.isXAxis ||
                        K(q, function (q) {
                            K(q, function (l, h) {
                                l.touched < t.stacksTouched ? (l.destroy(), delete q[h]) : ((l.total = null), (l.cumulative = null));
                            });
                        });
                };
                q.prototype.renderStackTotals = function () {
                    var t = this.axis,
                        q = t.chart,
                        n = q.renderer,
                        l = this.stacks;
                    t = v(q, t.options.stackLabels.animation);
                    var h = (this.stackTotalGroup = this.stackTotalGroup || n.g("stack-labels").attr({ visibility: "visible", zIndex: 6, opacity: 0 }).add());
                    h.translate(q.plotLeft, q.plotTop);
                    K(l, function (g) {
                        K(g, function (g) {
                            g.render(h);
                        });
                    });
                    h.animate({ opacity: 1 }, t);
                };
                return q;
            })();
        return (function () {
            function q() {}
            q.compose = function (t) {
                B(t, "init", q.onInit);
                B(t, "destroy", q.onDestroy);
            };
            q.onDestroy = function () {
                var t = this.stacking;
                if (t) {
                    var q = t.stacks;
                    K(q, function (t, l) {
                        F(t);
                        q[l] = null;
                    });
                    t && t.stackTotalGroup && t.stackTotalGroup.destroy();
                }
            };
            q.onInit = function () {
                this.stacking || (this.stacking = new x(this));
            };
            return q;
        })();
    });
    O(m, "Mixins/LegendSymbol.js", [m["Core/Globals.js"], m["Core/Utilities.js"]], function (m, n) {
        var v = n.merge,
            B = n.pick;
        return (m.LegendSymbolMixin = {
            drawRectangle: function (n, m) {
                var v = n.symbolHeight,
                    D = n.options.squareSymbol;
                m.legendSymbol = this.chart.renderer
                    .rect(D ? (n.symbolWidth - v) / 2 : 0, n.baseline - v + 1, D ? v : n.symbolWidth, v, B(n.options.symbolRadius, v / 2))
                    .addClass("RBG_charts-point")
                    .attr({ zIndex: 3 })
                    .add(m.legendGroup);
            },
            drawLineMarker: function (n) {
                var m = this.options,
                    F = m.marker,
                    D = n.symbolWidth,
                    x = n.symbolHeight,
                    q = x / 2,
                    t = this.chart.renderer,
                    w = this.legendGroup;
                n = n.baseline - Math.round(0.3 * n.fontMetrics.b);
                var G = {};
                this.chart.styledMode || ((G = { "stroke-width": m.lineWidth || 0 }), m.dashStyle && (G.dashstyle = m.dashStyle));
                this.legendLine = t
                    .path([
                        ["M", 0, n],
                        ["L", D, n],
                    ])
                    .addClass("RBG_charts-graph")
                    .attr(G)
                    .add(w);
                F &&
                    !1 !== F.enabled &&
                    D &&
                    ((m = Math.min(B(F.radius, q), q)),
                    0 === this.symbol.indexOf("url") && ((F = v(F, { width: x, height: x })), (m = 0)),
                    (this.legendSymbol = F = t
                        .symbol(this.symbol, D / 2 - m, n - m, 2 * m, 2 * m, F)
                        .addClass("RBG_charts-point")
                        .add(w)),
                    (F.isMarker = !0));
            },
        });
    });
    O(
        m,
        "Core/Series/CartesianSeries.js",
        [
            m["Core/Animation/AnimationUtilities.js"],
            m["Core/Series/Series.js"],
            m["Core/Globals.js"],
            m["Mixins/LegendSymbol.js"],
            m["Core/Options.js"],
            m["Core/Series/Point.js"],
            m["Core/Renderer/SVG/SVGElement.js"],
            m["Core/Utilities.js"],
        ],
        function (m, n, M, B, F, J, K, D) {
            var x = m.animObject,
                q = F.defaultOptions,
                t = D.addEvent,
                w = D.arrayMax,
                v = D.arrayMin,
                l = D.clamp,
                h = D.correctFloat,
                g = D.defined,
                H = D.erase,
                p = D.error,
                e = D.extend,
                b = D.find,
                d = D.fireEvent,
                c = D.getNestedProperty,
                a = D.isArray,
                k = D.isFunction,
                u = D.isNumber,
                I = D.isString,
                y = D.merge,
                L = D.objectEach,
                P = D.pick,
                Q = D.removeEvent,
                z = D.splat,
                E = D.syncTimeout;
            ("");
            var C = n.seriesTypes,
                A = M.win;
            m = n.seriesType(
                "line",
                void 0,
                {
                    lineWidth: 2,
                    allowPointSelect: !1,
                    crisp: !0,
                    showCheckbox: !1,
                    animation: { duration: 1e3 },
                    events: {},
                    marker: {
                        enabledThreshold: 2,
                        lineColor: "#ffffff",
                        lineWidth: 0,
                        radius: 4,
                        states: { normal: { animation: !0 }, hover: { animation: { duration: 50 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } },
                    },
                    point: { events: {} },
                    dataLabels: {
                        animation: {},
                        align: "center",
                        defer: !0,
                        formatter: function () {
                            var a = this.series.chart.numberFormatter;
                            return "number" !== typeof this.y ? "" : a(this.y, -1);
                        },
                        padding: 5,
                        style: { fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" },
                        verticalAlign: "bottom",
                        x: 0,
                        y: 0,
                    },
                    cropThreshold: 300,
                    opacity: 1,
                    pointRange: 0,
                    softThreshold: !0,
                    states: {
                        normal: { animation: !0 },
                        hover: { animation: { duration: 50 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: 0.25 } },
                        select: { animation: { duration: 0 } },
                        inactive: { animation: { duration: 50 }, opacity: 0.2 },
                    },
                    stickyTracking: !0,
                    turboThreshold: 1e3,
                    findNearestPointBy: "x",
                },
                {
                    axisTypes: ["xAxis", "yAxis"],
                    coll: "series",
                    colorCounter: 0,
                    cropShoulder: 1,
                    directTouch: !1,
                    isCartesian: !0,
                    parallelArrays: ["x", "y"],
                    pointClass: J,
                    requireSorting: !0,
                    sorted: !0,
                    init: function (a, b) {
                        d(this, "init", { options: b });
                        var f = this,
                            c = a.series,
                            r;
                        this.eventOptions = this.eventOptions || {};
                        this.eventsToUnbind = [];
                        f.chart = a;
                        f.options = b = f.setOptions(b);
                        f.linkedSeries = [];
                        f.bindAxes();
                        e(f, { name: b.name, state: "", visible: !1 !== b.visible, selected: !0 === b.selected });
                        var g = b.events;
                        L(g, function (a, b) {
                            k(a) && f.eventOptions[b] !== a && (k(f.eventOptions[b]) && Q(f, b, f.eventOptions[b]), (f.eventOptions[b] = a), t(f, b, a));
                        });
                        if ((g && g.click) || (b.point && b.point.events && b.point.events.click) || b.allowPointSelect) a.runTrackerClick = !0;
                        f.getColor();
                        f.getSymbol();
                        f.parallelArrays.forEach(function (a) {
                            f[a + "Data"] || (f[a + "Data"] = []);
                        });
                        f.isCartesian && (a.hasCartesianSeries = !0);
                        c.length && (r = c[c.length - 1]);
                        f._i = P(r && r._i, -1) + 1;
                        f.opacity = f.options.opacity;
                        a.orderSeries(this.insert(c));
                        b.dataSorting && b.dataSorting.enabled ? f.setDataSortingOptions() : f.points || f.data || f.setData(b.data, !1);
                        d(this, "afterInit");
                    },
                    is: function (a) {
                        return C[a] && this instanceof C[a];
                    },
                    insert: function (a) {
                        var b = this.options.index,
                            f;
                        if (u(b)) {
                            for (f = a.length; f--; )
                                if (b >= P(a[f].options.index, a[f]._i)) {
                                    a.splice(f + 1, 0, this);
                                    break;
                                }
                            -1 === f && a.unshift(this);
                            f += 1;
                        } else a.push(this);
                        return P(f, a.length - 1);
                    },
                    bindAxes: function () {
                        var a = this,
                            b = a.options,
                            c = a.chart,
                            e;
                        d(this, "bindAxes", null, function () {
                            (a.axisTypes || []).forEach(function (f) {
                                c[f].forEach(function (d) {
                                    e = d.options;
                                    if (b[f] === e.index || ("undefined" !== typeof b[f] && b[f] === e.id) || ("undefined" === typeof b[f] && 0 === e.index)) a.insert(d.series), (a[f] = d), (d.isDirty = !0);
                                });
                                a[f] || a.optionalAxis === f || p(18, !0, c);
                            });
                        });
                        d(this, "afterBindAxes");
                    },
                    updateParallelArrays: function (a, b) {
                        var f = a.series,
                            d = arguments,
                            c = u(b)
                                ? function (d) {
                                      var c = "y" === d && f.toYData ? f.toYData(a) : a[d];
                                      f[d + "Data"][b] = c;
                                  }
                                : function (a) {
                                      Array.prototype[b].apply(f[a + "Data"], Array.prototype.slice.call(d, 2));
                                  };
                        f.parallelArrays.forEach(c);
                    },
                    hasData: function () {
                        return (this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin) || (this.visible && this.yData && 0 < this.yData.length);
                    },
                    autoIncrement: function () {
                        var a = this.options,
                            b = this.xIncrement,
                            d,
                            c = a.pointIntervalUnit,
                            e = this.chart.time;
                        b = P(b, a.pointStart, 0);
                        this.pointInterval = d = P(this.pointInterval, a.pointInterval, 1);
                        c &&
                            ((a = new e.Date(b)),
                            "day" === c ? e.set("Date", a, e.get("Date", a) + d) : "month" === c ? e.set("Month", a, e.get("Month", a) + d) : "year" === c && e.set("FullYear", a, e.get("FullYear", a) + d),
                            (d = a.getTime() - b));
                        this.xIncrement = b + d;
                        return b;
                    },
                    setDataSortingOptions: function () {
                        var a = this.options;
                        e(this, { requireSorting: !1, sorted: !1, enabledDataSorting: !0, allowDG: !1 });
                        g(a.pointRange) || (a.pointRange = 1);
                    },
                    setOptions: function (a) {
                        var b = this.chart,
                            f = b.options,
                            c = f.plotOptions,
                            e = b.userOptions || {};
                        a = y(a);
                        b = b.styledMode;
                        var k = { plotOptions: c, userOptions: a };
                        d(this, "setOptions", k);
                        var u = k.plotOptions[this.type],
                            p = e.plotOptions || {};
                        this.userOptions = k.userOptions;
                        e = y(u, c.series, e.plotOptions && e.plotOptions[this.type], a);
                        this.tooltipOptions = y(q.tooltip, q.plotOptions.series && q.plotOptions.series.tooltip, q.plotOptions[this.type].tooltip, f.tooltip.userOptions, c.series && c.series.tooltip, c[this.type].tooltip, a.tooltip);
                        this.stickyTracking = P(a.stickyTracking, p[this.type] && p[this.type].stickyTracking, p.series && p.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : e.stickyTracking);
                        null === u.marker && delete e.marker;
                        this.zoneAxis = e.zoneAxis;
                        f = this.zones = (e.zones || []).slice();
                        (!e.negativeColor && !e.negativeFillColor) ||
                            e.zones ||
                            ((c = { value: e[this.zoneAxis + "Threshold"] || e.threshold || 0, className: "RBG_charts-negative" }), b || ((c.color = e.negativeColor), (c.fillColor = e.negativeFillColor)), f.push(c));
                        f.length && g(f[f.length - 1].value) && f.push(b ? {} : { color: this.color, fillColor: this.fillColor });
                        d(this, "afterSetOptions", { options: e });
                        return e;
                    },
                    getName: function () {
                        return P(this.options.name, "Series " + (this.index + 1));
                    },
                    getCyclic: function (a, b, d) {
                        var f = this.chart,
                            c = this.userOptions,
                            r = a + "Index",
                            e = a + "Counter",
                            k = d ? d.length : P(f.options.chart[a + "Count"], f[a + "Count"]);
                        if (!b) {
                            var u = P(c[r], c["_" + r]);
                            g(u) || (f.series.length || (f[e] = 0), (c["_" + r] = u = f[e] % k), (f[e] += 1));
                            d && (b = d[u]);
                        }
                        "undefined" !== typeof u && (this[r] = u);
                        this[a] = b;
                    },
                    getColor: function () {
                        this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? (this.options.color = null) : this.getCyclic("color", this.options.color || q.plotOptions[this.type].color, this.chart.options.colors);
                    },
                    getPointsCollection: function () {
                        return (this.hasGroupedData ? this.points : this.data) || [];
                    },
                    getSymbol: function () {
                        this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols);
                    },
                    findPointIndex: function (a, d) {
                        var f = a.id,
                            c = a.x,
                            r = this.points,
                            e,
                            k = this.options.dataSorting;
                        if (f) var g = this.chart.get(f);
                        else if (this.linkedParent || this.enabledDataSorting) {
                            var p = k && k.matchByName ? "name" : "index";
                            g = b(r, function (b) {
                                return !b.touched && b[p] === a[p];
                            });
                            if (!g) return;
                        }
                        if (g) {
                            var h = g && g.index;
                            "undefined" !== typeof h && (e = !0);
                        }
                        "undefined" === typeof h && u(c) && (h = this.xData.indexOf(c, d));
                        -1 !== h && "undefined" !== typeof h && this.cropped && (h = h >= this.cropStart ? h - this.cropStart : h);
                        !e && r[h] && r[h].touched && (h = void 0);
                        return h;
                    },
                    drawLegendSymbol: B.drawLineMarker,
                    updateData: function (a, b) {
                        var f = this.options,
                            d = f.dataSorting,
                            c = this.points,
                            r = [],
                            e,
                            k,
                            p,
                            h = this.requireSorting,
                            E = a.length === c.length,
                            z = !0;
                        this.xIncrement = null;
                        a.forEach(function (a, b) {
                            var k = (g(a) && this.pointClass.prototype.optionsToObject.call({ series: this }, a)) || {};
                            var z = k.x;
                            if (k.id || u(z)) {
                                if (
                                    ((z = this.findPointIndex(k, p)),
                                    -1 === z || "undefined" === typeof z ? r.push(a) : c[z] && a !== f.data[z] ? (c[z].update(a, !1, null, !1), (c[z].touched = !0), h && (p = z + 1)) : c[z] && (c[z].touched = !0),
                                    !E || b !== z || (d && d.enabled) || this.hasDerivedData)
                                )
                                    e = !0;
                            } else r.push(a);
                        }, this);
                        if (e) for (a = c.length; a--; ) (k = c[a]) && !k.touched && k.remove && k.remove(!1, b);
                        else
                            !E || (d && d.enabled)
                                ? (z = !1)
                                : (a.forEach(function (a, b) {
                                      c[b].update && a !== c[b].y && c[b].update(a, !1, null, !1);
                                  }),
                                  (r.length = 0));
                        c.forEach(function (a) {
                            a && (a.touched = !1);
                        });
                        if (!z) return !1;
                        r.forEach(function (a) {
                            this.addPoint(a, !1, null, null, !1);
                        }, this);
                        null === this.xIncrement && this.xData && this.xData.length && ((this.xIncrement = w(this.xData)), this.autoIncrement());
                        return !0;
                    },
                    setData: function (b, d, c, e) {
                        var f = this,
                            r = f.points,
                            k = (r && r.length) || 0,
                            g,
                            h = f.options,
                            z = f.chart,
                            E = h.dataSorting,
                            l = null,
                            C = f.xAxis;
                        l = h.turboThreshold;
                        var y = this.xData,
                            t = this.yData,
                            q = (g = f.pointArrayMap) && g.length,
                            A = h.keys,
                            n = 0,
                            w = 1,
                            m;
                        b = b || [];
                        g = b.length;
                        d = P(d, !0);
                        E && E.enabled && (b = this.sortData(b));
                        !1 !== e && g && k && !f.cropped && !f.hasGroupedData && f.visible && !f.isSeriesBoosting && (m = this.updateData(b, c));
                        if (!m) {
                            f.xIncrement = null;
                            f.colorCounter = 0;
                            this.parallelArrays.forEach(function (a) {
                                f[a + "Data"].length = 0;
                            });
                            if (l && g > l)
                                if (((l = f.getFirstValidPoint(b)), u(l))) for (c = 0; c < g; c++) (y[c] = this.autoIncrement()), (t[c] = b[c]);
                                else if (a(l))
                                    if (q) for (c = 0; c < g; c++) (e = b[c]), (y[c] = e[0]), (t[c] = e.slice(1, q + 1));
                                    else for (A && ((n = A.indexOf("x")), (w = A.indexOf("y")), (n = 0 <= n ? n : 0), (w = 0 <= w ? w : 1)), c = 0; c < g; c++) (e = b[c]), (y[c] = e[n]), (t[c] = e[w]);
                                else p(12, !1, z);
                            else for (c = 0; c < g; c++) "undefined" !== typeof b[c] && ((e = { series: f }), f.pointClass.prototype.applyOptions.apply(e, [b[c]]), f.updateParallelArrays(e, c));
                            t && I(t[0]) && p(14, !0, z);
                            f.data = [];
                            f.options.data = f.userOptions.data = b;
                            for (c = k; c--; ) r[c] && r[c].destroy && r[c].destroy();
                            C && (C.minRange = C.userMinRange);
                            f.isDirty = z.isDirtyBox = !0;
                            f.isDirtyData = !!r;
                            c = !1;
                        }
                        "point" === h.legendType && (this.processData(), this.generatePoints());
                        d && z.redraw(c);
                    },
                    sortData: function (a) {
                        var b = this,
                            f = b.options.dataSorting.sortKey || "y",
                            d = function (a, b) {
                                return (g(b) && a.pointClass.prototype.optionsToObject.call({ series: a }, b)) || {};
                            };
                        a.forEach(function (f, c) {
                            a[c] = d(b, f);
                            a[c].index = c;
                        }, this);
                        a.concat()
                            .sort(function (a, b) {
                                a = c(f, a);
                                b = c(f, b);
                                return b < a ? -1 : b > a ? 1 : 0;
                            })
                            .forEach(function (a, b) {
                                a.x = b;
                            }, this);
                        b.linkedSeries &&
                            b.linkedSeries.forEach(function (b) {
                                var f = b.options,
                                    c = f.data;
                                (f.dataSorting && f.dataSorting.enabled) ||
                                    !c ||
                                    (c.forEach(function (f, r) {
                                        c[r] = d(b, f);
                                        a[r] && ((c[r].x = a[r].x), (c[r].index = r));
                                    }),
                                    b.setData(c, !1));
                            });
                        return a;
                    },
                    getProcessedData: function (a) {
                        var b = this.xData,
                            f = this.yData,
                            c = b.length;
                        var d = 0;
                        var e = this.xAxis,
                            k = this.options;
                        var g = k.cropThreshold;
                        var u = a || this.getExtremesFromAll || k.getExtremesFromAll,
                            h = this.isCartesian;
                        a = e && e.val2lin;
                        k = !(!e || !e.logarithmic);
                        var z = this.requireSorting;
                        if (e) {
                            e = e.getExtremes();
                            var E = e.min;
                            var l = e.max;
                        }
                        if (h && this.sorted && !u && (!g || c > g || this.forceCrop))
                            if (b[c - 1] < E || b[0] > l) (b = []), (f = []);
                            else if (this.yData && (b[0] < E || b[c - 1] > l)) {
                                d = this.cropData(this.xData, this.yData, E, l);
                                b = d.xData;
                                f = d.yData;
                                d = d.start;
                                var C = !0;
                            }
                        for (g = b.length || 1; --g; )
                            if (((c = k ? a(b[g]) - a(b[g - 1]) : b[g] - b[g - 1]), 0 < c && ("undefined" === typeof y || c < y))) var y = c;
                            else 0 > c && z && (p(15, !1, this.chart), (z = !1));
                        return { xData: b, yData: f, cropped: C, cropStart: d, closestPointRange: y };
                    },
                    processData: function (a) {
                        var b = this.xAxis;
                        if (this.isCartesian && !this.isDirty && !b.isDirty && !this.yAxis.isDirty && !a) return !1;
                        a = this.getProcessedData();
                        this.cropped = a.cropped;
                        this.cropStart = a.cropStart;
                        this.processedXData = a.xData;
                        this.processedYData = a.yData;
                        this.closestPointRange = this.basePointRange = a.closestPointRange;
                    },
                    cropData: function (a, b, c, d, e) {
                        var f = a.length,
                            r = 0,
                            k = f,
                            g;
                        e = P(e, this.cropShoulder);
                        for (g = 0; g < f; g++)
                            if (a[g] >= c) {
                                r = Math.max(0, g - e);
                                break;
                            }
                        for (c = g; c < f; c++)
                            if (a[c] > d) {
                                k = c + e;
                                break;
                            }
                        return { xData: a.slice(r, k), yData: b.slice(r, k), start: r, end: k };
                    },
                    generatePoints: function () {
                        var a = this.options,
                            b = a.data,
                            c = this.data,
                            k,
                            g = this.processedXData,
                            u = this.processedYData,
                            p = this.pointClass,
                            h = g.length,
                            E = this.cropStart || 0,
                            l = this.hasGroupedData;
                        a = a.keys;
                        var C = [],
                            y;
                        c || l || ((c = []), (c.length = b.length), (c = this.data = c));
                        a && l && (this.options.keys = !1);
                        for (y = 0; y < h; y++) {
                            var t = E + y;
                            if (l) {
                                var q = new p().init(this, [g[y]].concat(z(u[y])));
                                q.dataGroup = this.groupMap[y];
                                q.dataGroup.options && ((q.options = q.dataGroup.options), e(q, q.dataGroup.options), delete q.dataLabels);
                            } else (q = c[t]) || "undefined" === typeof b[t] || (c[t] = q = new p().init(this, b[t], g[y]));
                            q && ((q.index = t), (C[y] = q));
                        }
                        this.options.keys = a;
                        if (c && (h !== (k = c.length) || l)) for (y = 0; y < k; y++) y !== E || l || (y += h), c[y] && (c[y].destroyElements(), (c[y].plotX = void 0));
                        this.data = c;
                        this.points = C;
                        d(this, "afterGeneratePoints");
                    },
                    getXExtremes: function (a) {
                        return { min: v(a), max: w(a) };
                    },
                    getExtremes: function (b, c) {
                        var f = this.xAxis,
                            e = this.yAxis,
                            r = this.processedXData || this.xData,
                            k = [],
                            g = 0,
                            p = 0;
                        var h = 0;
                        var z = this.requireSorting ? this.cropShoulder : 0,
                            E = e ? e.positiveValuesOnly : !1,
                            l;
                        b = b || this.stackedYData || this.processedYData || [];
                        e = b.length;
                        f && ((h = f.getExtremes()), (p = h.min), (h = h.max));
                        for (l = 0; l < e; l++) {
                            var C = r[l];
                            var y = b[l];
                            var t = (u(y) || a(y)) && (y.length || 0 < y || !E);
                            C = c || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !f || ((r[l + z] || C) >= p && (r[l - z] || C) <= h);
                            if (t && C)
                                if ((t = y.length)) for (; t--; ) u(y[t]) && (k[g++] = y[t]);
                                else k[g++] = y;
                        }
                        b = { dataMin: v(k), dataMax: w(k) };
                        d(this, "afterGetExtremes", { dataExtremes: b });
                        return b;
                    },
                    applyExtremes: function () {
                        var a = this.getExtremes();
                        this.dataMin = a.dataMin;
                        this.dataMax = a.dataMax;
                        return a;
                    },
                    getFirstValidPoint: function (a) {
                        for (var b = null, f = a.length, c = 0; null === b && c < f; ) (b = a[c]), c++;
                        return b;
                    },
                    translate: function () {
                        this.processedXData || this.processData();
                        this.generatePoints();
                        var b = this.options,
                            c = b.stacking,
                            e = this.xAxis,
                            k = e.categories,
                            p = this.enabledDataSorting,
                            z = this.yAxis,
                            E = this.points,
                            C = E.length,
                            y = !!this.modifyValue,
                            t,
                            q = this.pointPlacementToXValue(),
                            A = !!q,
                            I = b.threshold,
                            n = b.startFromThreshold ? I : 0,
                            w,
                            m = this.zoneAxis || "y",
                            H = Number.MAX_VALUE;
                        for (t = 0; t < C; t++) {
                            var x = E[t],
                                L = x.x,
                                v = x.y,
                                Q = x.low,
                                G = c && z.stacking && z.stacking.stacks[(this.negStacks && v < (n ? 0 : I) ? "-" : "") + this.stackKey];
                            if ((z.positiveValuesOnly && !z.validatePositiveValue(v)) || (e.positiveValuesOnly && !e.validatePositiveValue(L))) x.isNull = !0;
                            x.plotX = w = h(l(e.translate(L, 0, 0, 0, 1, q, "flags" === this.type), -1e5, 1e5));
                            if (c && this.visible && G && G[L]) {
                                var D = this.getStackIndicator(D, L, this.index);
                                if (!x.isNull) {
                                    var B = G[L];
                                    var F = B.points[D.key];
                                }
                            }
                            a(F) &&
                                ((Q = F[0]),
                                (v = F[1]),
                                Q === n && D.key === G[L].base && (Q = P(u(I) && I, z.min)),
                                z.positiveValuesOnly && 0 >= Q && (Q = null),
                                (x.total = x.stackTotal = B.total),
                                (x.percentage = B.total && (x.y / B.total) * 100),
                                (x.stackY = v),
                                this.irregularWidths || B.setOffset(this.pointXOffset || 0, this.barW || 0));
                            x.yBottom = g(Q) ? l(z.translate(Q, 0, 1, 0, 1), -1e5, 1e5) : null;
                            y && (v = this.modifyValue(v, x));
                            x.plotY = "number" === typeof v && Infinity !== v ? l(z.translate(v, 0, 1, 0, 1), -1e5, 1e5) : void 0;
                            x.isInside = this.isPointInside(x);
                            x.clientX = A ? h(e.translate(L, 0, 0, 0, 1, q)) : w;
                            x.negative = x[m] < (b[m + "Threshold"] || I || 0);
                            x.category = k && "undefined" !== typeof k[x.x] ? k[x.x] : x.x;
                            if (!x.isNull && !1 !== x.visible) {
                                "undefined" !== typeof K && (H = Math.min(H, Math.abs(w - K)));
                                var K = w;
                            }
                            x.zone = this.zones.length && x.getZone();
                            !x.graphic && this.group && p && (x.isNew = !0);
                        }
                        this.closestPointRangePx = H;
                        d(this, "afterTranslate");
                    },
                    getValidPoints: function (a, b, c) {
                        var f = this.chart;
                        return (a || this.points || []).filter(function (a) {
                            return b && !f.isInsidePlot(a.plotX, a.plotY, f.inverted) ? !1 : !1 !== a.visible && (c || !a.isNull);
                        });
                    },
                    getClipBox: function (a, b) {
                        var f = this.options,
                            c = this.chart,
                            d = c.inverted,
                            e = this.xAxis,
                            r = e && this.yAxis,
                            k = c.options.chart.scrollablePlotArea || {};
                        a && !1 === f.clip && r
                            ? (a = d ? { y: -c.chartWidth + r.len + r.pos, height: c.chartWidth, width: c.chartHeight, x: -c.chartHeight + e.len + e.pos } : { y: -r.pos, height: c.chartHeight, width: c.chartWidth, x: -e.pos })
                            : ((a = this.clipBox || c.clipBox), b && ((a.width = c.plotSizeX), (a.x = (c.scrollablePixelsX || 0) * (k.scrollPositionX || 0))));
                        return b ? { width: a.width, x: a.x } : a;
                    },
                    setClip: function (a) {
                        var b = this.chart,
                            f = this.options,
                            c = b.renderer,
                            d = b.inverted,
                            e = this.clipBox,
                            k = this.getClipBox(a),
                            g = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, k.height, f.xAxis, f.yAxis].join(),
                            u = b[g],
                            p = b[g + "m"];
                        a && ((k.width = 0), d && (k.x = b.plotHeight + (!1 !== f.clip ? 0 : b.plotTop)));
                        u
                            ? b.hasLoaded || u.attr(k)
                            : (a && (b[g + "m"] = p = c.clipRect(d ? b.plotSizeX + 99 : -99, d ? -b.plotLeft : -b.plotTop, 99, d ? b.chartWidth : b.chartHeight)), (b[g] = u = c.clipRect(k)), (u.count = { length: 0 }));
                        a && !u.count[this.index] && ((u.count[this.index] = !0), (u.count.length += 1));
                        if (!1 !== f.clip || a) this.group.clip(a || e ? u : b.clipRect), this.markerGroup.clip(p), (this.sharedClipKey = g);
                        a || (u.count[this.index] && (delete u.count[this.index], --u.count.length), 0 === u.count.length && g && b[g] && (e || (b[g] = b[g].destroy()), b[g + "m"] && (b[g + "m"] = b[g + "m"].destroy())));
                    },
                    animate: function (a) {
                        var b = this.chart,
                            f = x(this.options.animation);
                        if (!b.hasRendered)
                            if (a) this.setClip(f);
                            else {
                                var c = this.sharedClipKey;
                                a = b[c];
                                var d = this.getClipBox(f, !0);
                                a && a.animate(d, f);
                                b[c + "m"] && b[c + "m"].animate({ width: d.width + 99, x: d.x - (b.inverted ? 0 : 99) }, f);
                            }
                    },
                    afterAnimate: function () {
                        this.setClip();
                        d(this, "afterAnimate");
                        this.finishedAnimating = !0;
                    },
                    drawPoints: function () {
                        var a = this.points,
                            b = this.chart,
                            c,
                            d,
                            e = this.options.marker,
                            k = this[this.specialGroup] || this.markerGroup,
                            g = this.xAxis,
                            u = P(e.enabled, !g || g.isRadial ? !0 : null, this.closestPointRangePx >= e.enabledThreshold * e.radius);
                        if (!1 !== e.enabled || this._hasPointMarkers)
                            for (c = 0; c < a.length; c++) {
                                var p = a[c];
                                var h = (d = p.graphic) ? "animate" : "attr";
                                var z = p.marker || {};
                                var E = !!p.marker;
                                if (((u && "undefined" === typeof z.enabled) || z.enabled) && !p.isNull && !1 !== p.visible) {
                                    var l = P(z.symbol, this.symbol);
                                    var C = this.markerAttribs(p, p.selected && "select");
                                    this.enabledDataSorting && (p.startXPos = g.reversed ? -C.width : g.width);
                                    var y = !1 !== p.isInside;
                                    d
                                        ? d[y ? "show" : "hide"](y).animate(C)
                                        : y &&
                                          (0 < C.width || p.hasImage) &&
                                          ((p.graphic = d = b.renderer.symbol(l, C.x, C.y, C.width, C.height, E ? z : e).add(k)), this.enabledDataSorting && b.hasRendered && (d.attr({ x: p.startXPos }), (h = "animate")));
                                    d && "animate" === h && d[y ? "show" : "hide"](y).animate(C);
                                    if (d && !b.styledMode) d[h](this.pointAttribs(p, p.selected && "select"));
                                    d && d.addClass(p.getClassName(), !0);
                                } else d && (p.graphic = d.destroy());
                            }
                    },
                    markerAttribs: function (a, b) {
                        var f = this.options,
                            c = f.marker,
                            d = a.marker || {},
                            e = d.symbol || c.symbol,
                            r = P(d.radius, c.radius);
                        b && ((c = c.states[b]), (b = d.states && d.states[b]), (r = P(b && b.radius, c && c.radius, r + ((c && c.radiusPlus) || 0))));
                        a.hasImage = e && 0 === e.indexOf("url");
                        a.hasImage && (r = 0);
                        a = { x: f.crisp ? Math.floor(a.plotX) - r : a.plotX - r, y: a.plotY - r };
                        r && (a.width = a.height = 2 * r);
                        return a;
                    },
                    pointAttribs: function (a, b) {
                        var f = this.options.marker,
                            c = a && a.options,
                            d = (c && c.marker) || {},
                            e = this.color,
                            r = c && c.color,
                            k = a && a.color;
                        c = P(d.lineWidth, f.lineWidth);
                        var g = a && a.zone && a.zone.color;
                        a = 1;
                        e = r || g || k || e;
                        r = d.fillColor || f.fillColor || e;
                        e = d.lineColor || f.lineColor || e;
                        b = b || "normal";
                        f = f.states[b];
                        b = (d.states && d.states[b]) || {};
                        c = P(b.lineWidth, f.lineWidth, c + P(b.lineWidthPlus, f.lineWidthPlus, 0));
                        r = b.fillColor || f.fillColor || r;
                        e = b.lineColor || f.lineColor || e;
                        a = P(b.opacity, f.opacity, a);
                        return { stroke: e, "stroke-width": c, fill: r, opacity: a };
                    },
                    destroy: function (a) {
                        var b = this,
                            f = b.chart,
                            c = /AppleWebKit\/533/.test(A.navigator.userAgent),
                            e,
                            k,
                            g = b.data || [],
                            u,
                            p;
                        d(b, "destroy");
                        this.removeEvents(a);
                        (b.axisTypes || []).forEach(function (a) {
                            (p = b[a]) && p.series && (H(p.series, b), (p.isDirty = p.forceRedraw = !0));
                        });
                        b.legendItem && b.chart.legend.destroyItem(b);
                        for (k = g.length; k--; ) (u = g[k]) && u.destroy && u.destroy();
                        b.points = null;
                        D.clearTimeout(b.animationTimeout);
                        L(b, function (a, b) {
                            a instanceof K && !a.survive && ((e = c && "group" === b ? "hide" : "destroy"), a[e]());
                        });
                        f.hoverSeries === b && (f.hoverSeries = null);
                        H(f.series, b);
                        f.orderSeries();
                        L(b, function (f, c) {
                            (a && "hcEvents" === c) || delete b[c];
                        });
                    },
                    getGraphPath: function (a, b, c) {
                        var f = this,
                            d = f.options,
                            e = d.step,
                            r,
                            k = [],
                            u = [],
                            p;
                        a = a || f.points;
                        (r = a.reversed) && a.reverse();
                        (e = { right: 1, center: 2 }[e] || (e && 3)) && r && (e = 4 - e);
                        a = this.getValidPoints(a, !1, !(d.connectNulls && !b && !c));
                        a.forEach(function (r, h) {
                            var z = r.plotX,
                                E = r.plotY,
                                l = a[h - 1];
                            (r.leftCliff || (l && l.rightCliff)) && !c && (p = !0);
                            r.isNull && !g(b) && 0 < h
                                ? (p = !d.connectNulls)
                                : r.isNull && !b
                                ? (p = !0)
                                : (0 === h || p
                                      ? (h = [["M", r.plotX, r.plotY]])
                                      : f.getPointSpline
                                      ? (h = [f.getPointSpline(a, r, h)])
                                      : e
                                      ? ((h =
                                            1 === e
                                                ? [["L", l.plotX, E]]
                                                : 2 === e
                                                ? [
                                                      ["L", (l.plotX + z) / 2, l.plotY],
                                                      ["L", (l.plotX + z) / 2, E],
                                                  ]
                                                : [["L", z, l.plotY]]),
                                        h.push(["L", z, E]))
                                      : (h = [["L", z, E]]),
                                  u.push(r.x),
                                  e && (u.push(r.x), 2 === e && u.push(r.x)),
                                  k.push.apply(k, h),
                                  (p = !1));
                        });
                        k.xMap = u;
                        return (f.graphPath = k);
                    },
                    drawGraph: function () {
                        var a = this,
                            b = this.options,
                            c = (this.gappedPath || this.getGraphPath).call(this),
                            d = this.chart.styledMode,
                            e = [["graph", "RBG_charts-graph"]];
                        d || e[0].push(b.lineColor || this.color || "#cccccc", b.dashStyle);
                        e = a.getZonesGraphs(e);
                        e.forEach(function (f, e) {
                            var r = f[0],
                                k = a[r],
                                g = k ? "animate" : "attr";
                            k ? ((k.endX = a.preventGraphAnimation ? null : c.xMap), k.animate({ d: c })) : c.length && (a[r] = k = a.chart.renderer.path(c).addClass(f[1]).attr({ zIndex: 1 }).add(a.group));
                            k &&
                                !d &&
                                ((r = { stroke: f[2], "stroke-width": b.lineWidth, fill: (a.fillGraph && a.color) || "none" }),
                                f[3] ? (r.dashstyle = f[3]) : "square" !== b.linecap && (r["stroke-linecap"] = r["stroke-linejoin"] = "round"),
                                k[g](r).shadow(2 > e && b.shadow));
                            k && ((k.startX = c.xMap), (k.isArea = c.isArea));
                        });
                    },
                    getZonesGraphs: function (a) {
                        this.zones.forEach(function (b, f) {
                            f = ["zone-graph-" + f, "RBG_charts-graph RBG_charts-zone-graph-" + f + " " + (b.className || "")];
                            this.chart.styledMode || f.push(b.color || this.color, b.dashStyle || this.options.dashStyle);
                            a.push(f);
                        }, this);
                        return a;
                    },
                    applyZones: function () {
                        var a = this,
                            b = this.chart,
                            c = b.renderer,
                            d = this.zones,
                            e,
                            k,
                            g = this.clips || [],
                            u,
                            p = this.graph,
                            h = this.area,
                            z = Math.max(b.chartWidth, b.chartHeight),
                            E = this[(this.zoneAxis || "y") + "Axis"],
                            C = b.inverted,
                            y,
                            t,
                            q,
                            A = !1,
                            I,
                            n;
                        if (d.length && (p || h) && E && "undefined" !== typeof E.min) {
                            var w = E.reversed;
                            var m = E.horiz;
                            p && !this.showLine && p.hide();
                            h && h.hide();
                            var x = E.getExtremes();
                            d.forEach(function (f, d) {
                                e = w ? (m ? b.plotWidth : 0) : m ? 0 : E.toPixels(x.min) || 0;
                                e = l(P(k, e), 0, z);
                                k = l(Math.round(E.toPixels(P(f.value, x.max), !0) || 0), 0, z);
                                A && (e = k = E.toPixels(x.max));
                                y = Math.abs(e - k);
                                t = Math.min(e, k);
                                q = Math.max(e, k);
                                E.isXAxis ? ((u = { x: C ? q : t, y: 0, width: y, height: z }), m || (u.x = b.plotHeight - u.x)) : ((u = { x: 0, y: C ? q : t, width: z, height: y }), m && (u.y = b.plotWidth - u.y));
                                C && c.isVML && (u = E.isXAxis ? { x: 0, y: w ? t : q, height: u.width, width: b.chartWidth } : { x: u.y - b.plotLeft - b.spacingBox.x, y: 0, width: u.height, height: b.chartHeight });
                                g[d] ? g[d].animate(u) : (g[d] = c.clipRect(u));
                                I = a["zone-area-" + d];
                                n = a["zone-graph-" + d];
                                p && n && n.clip(g[d]);
                                h && I && I.clip(g[d]);
                                A = f.value > x.max;
                                a.resetZones && 0 === k && (k = void 0);
                            });
                            this.clips = g;
                        } else a.visible && (p && p.show(!0), h && h.show(!0));
                    },
                    invertGroups: function (a) {
                        function b() {
                            ["group", "markerGroup"].forEach(function (b) {
                                f[b] && (c.renderer.isVML && f[b].attr({ width: f.yAxis.len, height: f.xAxis.len }), (f[b].width = f.yAxis.len), (f[b].height = f.xAxis.len), f[b].invert(f.isRadialSeries ? !1 : a));
                            });
                        }
                        var f = this,
                            c = f.chart;
                        f.xAxis && (f.eventsToUnbind.push(t(c, "resize", b)), b(), (f.invertGroups = b));
                    },
                    plotGroup: function (a, b, c, d, e) {
                        var f = this[a],
                            k = !f;
                        c = { visibility: c, zIndex: d || 0.1 };
                        "undefined" === typeof this.opacity || this.chart.styledMode || "inactive" === this.state || (c.opacity = this.opacity);
                        k && (this[a] = f = this.chart.renderer.g().add(e));
                        f.addClass(
                            "RBG_charts-" +
                                b +
                                " RBG_charts-series-" +
                                this.index +
                                " RBG_charts-" +
                                this.type +
                                "-series " +
                                (g(this.colorIndex) ? "RBG_charts-color-" + this.colorIndex + " " : "") +
                                (this.options.className || "") +
                                (f.hasClass("RBG_charts-tracker") ? " RBG_charts-tracker" : ""),
                            !0
                        );
                        f.attr(c)[k ? "attr" : "animate"](this.getPlotBox());
                        return f;
                    },
                    getPlotBox: function () {
                        var a = this.chart,
                            b = this.xAxis,
                            c = this.yAxis;
                        a.inverted && ((b = c), (c = this.xAxis));
                        return { translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1 };
                    },
                    removeEvents: function (a) {
                        a
                            ? this.eventsToUnbind.length &&
                              (this.eventsToUnbind.forEach(function (a) {
                                  a();
                              }),
                              (this.eventsToUnbind.length = 0))
                            : Q(this);
                    },
                    render: function () {
                        var a = this,
                            b = a.chart,
                            c = a.options,
                            e = x(c.animation),
                            k = !a.finishedAnimating && b.renderer.isSVG && e.duration,
                            g = a.visible ? "inherit" : "hidden",
                            u = c.zIndex,
                            p = a.hasRendered,
                            h = b.seriesGroup,
                            z = b.inverted;
                        d(this, "render");
                        var l = a.plotGroup("group", "series", g, u, h);
                        a.markerGroup = a.plotGroup("markerGroup", "markers", g, u, h);
                        k && a.animate && a.animate(!0);
                        l.inverted = a.isCartesian || a.invertable ? z : !1;
                        a.drawGraph && (a.drawGraph(), a.applyZones());
                        a.visible && a.drawPoints();
                        a.drawDataLabels && a.drawDataLabels();
                        a.redrawPoints && a.redrawPoints();
                        a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                        a.invertGroups(z);
                        !1 === c.clip || a.sharedClipKey || p || l.clip(b.clipRect);
                        k && a.animate && a.animate();
                        p ||
                            (k && e.defer && (k += e.defer),
                            (a.animationTimeout = E(function () {
                                a.afterAnimate();
                            }, k || 0)));
                        a.isDirty = !1;
                        a.hasRendered = !0;
                        d(a, "afterRender");
                    },
                    redraw: function () {
                        var a = this.chart,
                            b = this.isDirty || this.isDirtyData,
                            c = this.group,
                            d = this.xAxis,
                            e = this.yAxis;
                        c && (a.inverted && c.attr({ width: a.plotWidth, height: a.plotHeight }), c.animate({ translateX: P(d && d.left, a.plotLeft), translateY: P(e && e.top, a.plotTop) }));
                        this.translate();
                        this.render();
                        b && delete this.kdTree;
                    },
                    kdAxisArray: ["clientX", "plotY"],
                    searchPoint: function (a, b) {
                        var f = this.xAxis,
                            c = this.yAxis,
                            d = this.chart.inverted;
                        return this.searchKDTree({ clientX: d ? f.len - a.chartY + f.pos : a.chartX - f.pos, plotY: d ? c.len - a.chartX + c.pos : a.chartY - c.pos }, b, a);
                    },
                    buildKDTree: function (a) {
                        function b(a, c, d) {
                            var e;
                            if ((e = a && a.length)) {
                                var k = f.kdAxisArray[c % d];
                                a.sort(function (a, b) {
                                    return a[k] - b[k];
                                });
                                e = Math.floor(e / 2);
                                return { point: a[e], left: b(a.slice(0, e), c + 1, d), right: b(a.slice(e + 1), c + 1, d) };
                            }
                        }
                        this.buildingKdTree = !0;
                        var f = this,
                            c = -1 < f.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                        delete f.kdTree;
                        E(
                            function () {
                                f.kdTree = b(f.getValidPoints(null, !f.directTouch), c, c);
                                f.buildingKdTree = !1;
                            },
                            f.options.kdNow || (a && "touchstart" === a.type) ? 0 : 1
                        );
                    },
                    searchKDTree: function (a, b, c) {
                        function f(a, b, c, u) {
                            var p = b.point,
                                h = d.kdAxisArray[c % u],
                                z = p;
                            var E = g(a[e]) && g(p[e]) ? Math.pow(a[e] - p[e], 2) : null;
                            var l = g(a[k]) && g(p[k]) ? Math.pow(a[k] - p[k], 2) : null;
                            l = (E || 0) + (l || 0);
                            p.dist = g(l) ? Math.sqrt(l) : Number.MAX_VALUE;
                            p.distX = g(E) ? Math.sqrt(E) : Number.MAX_VALUE;
                            h = a[h] - p[h];
                            l = 0 > h ? "left" : "right";
                            E = 0 > h ? "right" : "left";
                            b[l] && ((l = f(a, b[l], c + 1, u)), (z = l[r] < z[r] ? l : p));
                            b[E] && Math.sqrt(h * h) < z[r] && ((a = f(a, b[E], c + 1, u)), (z = a[r] < z[r] ? a : z));
                            return z;
                        }
                        var d = this,
                            e = this.kdAxisArray[0],
                            k = this.kdAxisArray[1],
                            r = b ? "distX" : "dist";
                        b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                        this.kdTree || this.buildingKdTree || this.buildKDTree(c);
                        if (this.kdTree) return f(a, this.kdTree, b, b);
                    },
                    pointPlacementToXValue: function () {
                        var a = this.options,
                            b = a.pointRange,
                            c = this.xAxis;
                        a = a.pointPlacement;
                        "between" === a && (a = c.reversed ? -0.5 : 0.5);
                        return u(a) ? a * P(b, c.pointRange) : 0;
                    },
                    isPointInside: function (a) {
                        return "undefined" !== typeof a.plotY && "undefined" !== typeof a.plotX && 0 <= a.plotY && a.plotY <= this.yAxis.len && 0 <= a.plotX && a.plotX <= this.xAxis.len;
                    },
                }
            );
            ("");
            return m;
        }
    );
    O(m, "Series/LineSeries.js", [m["Core/Series/CartesianSeries.js"], m["Core/Globals.js"]], function (m, n) {
        n.Series = m;
        return n.Series;
    });
    O(m, "Extensions/Stacking.js", [m["Core/Axis/Axis.js"], m["Core/Chart/Chart.js"], m["Core/Globals.js"], m["Core/Axis/StackingAxis.js"], m["Core/Utilities.js"]], function (m, n, M, B, F) {
        var v = F.correctFloat,
            K = F.defined,
            D = F.destroyObjectProperties,
            x = F.format,
            q = F.isNumber,
            t = F.pick;
        ("");
        var w = M.Series,
            G = (function () {
                function l(h, g, l, p, e) {
                    var b = h.chart.inverted;
                    this.axis = h;
                    this.isNegative = l;
                    this.options = g = g || {};
                    this.x = p;
                    this.total = null;
                    this.points = {};
                    this.hasValidPoints = !1;
                    this.stack = e;
                    this.rightCliff = this.leftCliff = 0;
                    this.alignOptions = { align: g.align || (b ? (l ? "left" : "right") : "center"), verticalAlign: g.verticalAlign || (b ? "middle" : l ? "bottom" : "top"), y: g.y, x: g.x };
                    this.textAlign = g.textAlign || (b ? (l ? "right" : "left") : "center");
                }
                l.prototype.destroy = function () {
                    D(this, this.axis);
                };
                l.prototype.render = function (h) {
                    var g = this.axis.chart,
                        l = this.options,
                        p = l.format;
                    p = p ? x(p, this, g) : l.formatter.call(this);
                    this.label
                        ? this.label.attr({ text: p, visibility: "hidden" })
                        : ((this.label = g.renderer.label(p, null, null, l.shape, null, null, l.useHTML, !1, "stack-labels")),
                          (p = { r: l.borderRadius || 0, text: p, rotation: l.rotation, padding: t(l.padding, 5), visibility: "hidden" }),
                          g.styledMode || ((p.fill = l.backgroundColor), (p.stroke = l.borderColor), (p["stroke-width"] = l.borderWidth), this.label.css(l.style)),
                          this.label.attr(p),
                          this.label.added || this.label.add(h));
                    this.label.labelrank = g.plotHeight;
                };
                l.prototype.setOffset = function (h, g, l, p, e) {
                    var b = this.axis,
                        d = b.chart;
                    p = b.translate(b.stacking.usePercentage ? 100 : p ? p : this.total, 0, 0, 0, 1);
                    l = b.translate(l ? l : 0);
                    l = K(p) && Math.abs(p - l);
                    h = t(e, d.xAxis[0].translate(this.x)) + h;
                    b = K(p) && this.getStackBox(d, this, h, p, g, l, b);
                    g = this.label;
                    l = this.isNegative;
                    h = "justify" === t(this.options.overflow, "justify");
                    var c = this.textAlign;
                    g &&
                        b &&
                        ((e = g.getBBox()),
                        (p = g.padding),
                        (c = "left" === c ? (d.inverted ? -p : p) : "right" === c ? e.width : d.inverted && "center" === c ? e.width / 2 : d.inverted ? (l ? e.width + p : -p) : e.width / 2),
                        (l = d.inverted ? e.height / 2 : l ? -p : e.height),
                        (this.alignOptions.x = t(this.options.x, 0)),
                        (this.alignOptions.y = t(this.options.y, 0)),
                        (b.x -= c),
                        (b.y -= l),
                        g.align(this.alignOptions, null, b),
                        d.isInsidePlot(g.alignAttr.x + c - this.alignOptions.x, g.alignAttr.y + l - this.alignOptions.y) ? g.show() : ((g.alignAttr.y = -9999), (h = !1)),
                        h && w.prototype.justifyDataLabel.call(this.axis, g, this.alignOptions, g.alignAttr, e, b),
                        g.attr({ x: g.alignAttr.x, y: g.alignAttr.y }),
                        t(!h && this.options.crop, !0) && ((d = q(g.x) && q(g.y) && d.isInsidePlot(g.x - p + g.width, g.y) && d.isInsidePlot(g.x + p, g.y)) || g.hide()));
                };
                l.prototype.getStackBox = function (h, g, l, p, e, b, d) {
                    var c = g.axis.reversed,
                        a = h.inverted,
                        k = d.height + d.pos - (a ? h.plotLeft : h.plotTop);
                    g = (g.isNegative && !c) || (!g.isNegative && c);
                    return { x: a ? (g ? p - d.right : p - b + d.pos - h.plotLeft) : l + h.xAxis[0].transB - h.plotLeft, y: a ? d.height - l - e : g ? k - p - b : k - p, width: a ? b : e, height: a ? e : b };
                };
                return l;
            })();
        n.prototype.getStacks = function () {
            var l = this,
                h = l.inverted;
            l.yAxis.forEach(function (g) {
                g.stacking && g.stacking.stacks && g.hasVisibleSeries && (g.stacking.oldStacks = g.stacking.stacks);
            });
            l.series.forEach(function (g) {
                var q = (g.xAxis && g.xAxis.options) || {};
                !g.options.stacking || (!0 !== g.visible && !1 !== l.options.chart.ignoreHiddenSeries) || (g.stackKey = [g.type, t(g.options.stack, ""), h ? q.top : q.left, h ? q.height : q.width].join());
            });
        };
        B.compose(m);
        w.prototype.setGroupedPoints = function () {
            this.options.centerInCategory && (this.is("column") || this.is("columnrange")) && !this.options.stacking && 1 < this.chart.series.length && w.prototype.setStackedPoints.call(this, "group");
        };
        w.prototype.setStackedPoints = function (l) {
            var h = l || this.options.stacking;
            if (h && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var g = this.processedXData,
                    q = this.processedYData,
                    p = [],
                    e = q.length,
                    b = this.options,
                    d = b.threshold,
                    c = t(b.startFromThreshold && d, 0);
                b = b.stack;
                l = l ? this.type + "," + h : this.stackKey;
                var a = "-" + l,
                    k = this.negStacks,
                    u = this.yAxis,
                    I = u.stacking.stacks,
                    y = u.stacking.oldStacks,
                    n,
                    w;
                u.stacking.stacksTouched += 1;
                for (w = 0; w < e; w++) {
                    var m = g[w];
                    var z = q[w];
                    var E = this.getStackIndicator(E, m, this.index);
                    var C = E.key;
                    var A = (n = k && z < (c ? 0 : d)) ? a : l;
                    I[A] || (I[A] = {});
                    I[A][m] || (y[A] && y[A][m] ? ((I[A][m] = y[A][m]), (I[A][m].total = null)) : (I[A][m] = new G(u, u.options.stackLabels, n, m, b)));
                    A = I[A][m];
                    null !== z
                        ? ((A.points[C] = A.points[this.index] = [t(A.cumulative, c)]),
                          K(A.cumulative) || (A.base = C),
                          (A.touched = u.stacking.stacksTouched),
                          0 < E.index && !1 === this.singleStacks && (A.points[C][0] = A.points[this.index + "," + m + ",0"][0]))
                        : (A.points[C] = A.points[this.index] = null);
                    "percent" === h
                        ? ((n = n ? l : a), k && I[n] && I[n][m] ? ((n = I[n][m]), (A.total = n.total = Math.max(n.total, A.total) + Math.abs(z) || 0)) : (A.total = v(A.total + (Math.abs(z) || 0))))
                        : "group" === h
                        ? null !== z && (A.total = (A.total || 0) + 1)
                        : (A.total = v(A.total + (z || 0)));
                    A.cumulative = "group" === h ? (A.total || 1) - 1 : t(A.cumulative, c) + (z || 0);
                    null !== z && (A.points[C].push(A.cumulative), (p[w] = A.cumulative), (A.hasValidPoints = !0));
                }
                "percent" === h && (u.stacking.usePercentage = !0);
                "group" !== h && (this.stackedYData = p);
                u.stacking.oldStacks = {};
            }
        };
        w.prototype.modifyStacks = function () {
            var l = this,
                h = l.stackKey,
                g = l.yAxis.stacking.stacks,
                t = l.processedXData,
                p,
                e = l.options.stacking;
            l[e + "Stacker"] &&
                [h, "-" + h].forEach(function (b) {
                    for (var d = t.length, c, a; d--; ) if (((c = t[d]), (p = l.getStackIndicator(p, c, l.index, b)), (a = (c = g[b] && g[b][c]) && c.points[p.key]))) l[e + "Stacker"](a, c, d);
                });
        };
        w.prototype.percentStacker = function (l, h, g) {
            h = h.total ? 100 / h.total : 0;
            l[0] = v(l[0] * h);
            l[1] = v(l[1] * h);
            this.stackedYData[g] = l[1];
        };
        w.prototype.getStackIndicator = function (l, h, g, t) {
            !K(l) || l.x !== h || (t && l.key !== t) ? (l = { x: h, index: 0, key: t }) : l.index++;
            l.key = [g, h, l.index].join();
            return l;
        };
        M.StackItem = G;
        return M.StackItem;
    });
    O(
        m,
        "Core/Dynamics.js",
        [
            m["Core/Animation/AnimationUtilities.js"],
            m["Core/Axis/Axis.js"],
            m["Core/Series/Series.js"],
            m["Core/Chart/Chart.js"],
            m["Core/Globals.js"],
            m["Series/LineSeries.js"],
            m["Core/Options.js"],
            m["Core/Series/Point.js"],
            m["Core/Time.js"],
            m["Core/Utilities.js"],
        ],
        function (m, n, M, B, F, J, K, D, x, q) {
            var t = m.animate,
                w = m.setAnimation,
                v = M.seriesTypes,
                l = K.time,
                h = q.addEvent,
                g = q.createElement,
                H = q.css,
                p = q.defined,
                e = q.erase,
                b = q.error,
                d = q.extend,
                c = q.fireEvent,
                a = q.isArray,
                k = q.isNumber,
                u = q.isObject,
                I = q.isString,
                y = q.merge,
                L = q.objectEach,
                P = q.pick,
                Q = q.relativeLength,
                z = q.splat;
            F.cleanRecursively = function (a, b) {
                var c = {};
                L(a, function (f, d) {
                    if (u(a[d], !0) && !a.nodeType && b[d]) (f = F.cleanRecursively(a[d], b[d])), Object.keys(f).length && (c[d] = f);
                    else if (u(a[d]) || a[d] !== b[d]) c[d] = a[d];
                });
                return c;
            };
            d(B.prototype, {
                addSeries: function (a, b, d) {
                    var f,
                        e = this;
                    a &&
                        ((b = P(b, !0)),
                        c(e, "addSeries", { options: a }, function () {
                            f = e.initSeries(a);
                            e.isDirtyLegend = !0;
                            e.linkSeries();
                            f.enabledDataSorting && f.setData(a.data, !1);
                            c(e, "afterAddSeries", { series: f });
                            b && e.redraw(d);
                        }));
                    return f;
                },
                addAxis: function (a, b, c, f) {
                    return this.createAxis(b ? "xAxis" : "yAxis", { axis: a, redraw: c, animation: f });
                },
                addColorAxis: function (a, b, c) {
                    return this.createAxis("colorAxis", { axis: a, redraw: b, animation: c });
                },
                createAxis: function (a, b) {
                    var c = this.options,
                        f = "colorAxis" === a,
                        d = b.redraw,
                        e = b.animation;
                    b = y(b.axis, { index: this[a].length, isX: "xAxis" === a });
                    var k = f ? new F.ColorAxis(this, b) : new n(this, b);
                    c[a] = z(c[a] || {});
                    c[a].push(b);
                    f &&
                        ((this.isDirtyLegend = !0),
                        this.axes.forEach(function (a) {
                            a.series = [];
                        }),
                        this.series.forEach(function (a) {
                            a.bindAxes();
                            a.isDirtyData = !0;
                        }));
                    P(d, !0) && this.redraw(e);
                    return k;
                },
                showLoading: function (a) {
                    var b = this,
                        c = b.options,
                        f = b.loadingDiv,
                        e = c.loading,
                        k = function () {
                            f && H(f, { left: b.plotLeft + "px", top: b.plotTop + "px", width: b.plotWidth + "px", height: b.plotHeight + "px" });
                        };
                    f || ((b.loadingDiv = f = g("div", { className: "RBG_charts-loading RBG_charts-loading-hidden" }, null, b.container)), (b.loadingSpan = g("span", { className: "RBG_charts-loading-inner" }, null, f)), h(b, "redraw", k));
                    f.className = "RBG_charts-loading";
                    b.loadingSpan.innerHTML = P(a, c.lang.loading, "");
                    b.styledMode || (H(f, d(e.style, { zIndex: 10 })), H(b.loadingSpan, e.labelStyle), b.loadingShown || (H(f, { opacity: 0, display: "" }), t(f, { opacity: e.style.opacity || 0.5 }, { duration: e.showDuration || 0 })));
                    b.loadingShown = !0;
                    k();
                },
                hideLoading: function () {
                    var a = this.options,
                        b = this.loadingDiv;
                    b &&
                        ((b.className = "RBG_charts-loading RBG_charts-loading-hidden"),
                        this.styledMode ||
                            t(
                                b,
                                { opacity: 0 },
                                {
                                    duration: a.loading.hideDuration || 100,
                                    complete: function () {
                                        H(b, { display: "none" });
                                    },
                                }
                            ));
                    this.loadingShown = !1;
                },
                propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
                propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
                propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
                collectionsWithUpdate: ["xAxis", "yAxis", "zAxis", "series"],
                update: function (a, b, d, f) {
                    var e = this,
                        g = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" },
                        u,
                        h,
                        E,
                        t = a.isResponsiveOptions,
                        C = [];
                    c(e, "update", { options: a });
                    t || e.setResponsive(!1, !0);
                    a = F.cleanRecursively(a, e.options);
                    y(!0, e.userOptions, a);
                    if ((u = a.chart)) {
                        y(!0, e.options.chart, u);
                        "className" in u && e.setClassName(u.className);
                        "reflow" in u && e.setReflow(u.reflow);
                        if ("inverted" in u || "polar" in u || "type" in u) {
                            e.propFromSeries();
                            var q = !0;
                        }
                        "alignTicks" in u && (q = !0);
                        L(u, function (a, b) {
                            -1 !== e.propsRequireUpdateSeries.indexOf("chart." + b) && (h = !0);
                            -1 !== e.propsRequireDirtyBox.indexOf(b) && (e.isDirtyBox = !0);
                            -1 !== e.propsRequireReflow.indexOf(b) && (t ? (e.isDirtyBox = !0) : (E = !0));
                        });
                        !e.styledMode && "style" in u && e.renderer.setStyle(u.style);
                    }
                    !e.styledMode && a.colors && (this.options.colors = a.colors);
                    a.time && (this.time === l && (this.time = new x(a.time)), y(!0, e.options.time, a.time));
                    L(a, function (b, c) {
                        if (e[c] && "function" === typeof e[c].update) e[c].update(b, !1);
                        else if ("function" === typeof e[g[c]]) e[g[c]](b);
                        else "color" !== c && -1 === e.collectionsWithUpdate.indexOf(c) && y(!0, e.options[c], a[c]);
                        "chart" !== c && -1 !== e.propsRequireUpdateSeries.indexOf(c) && (h = !0);
                    });
                    this.collectionsWithUpdate.forEach(function (b) {
                        if (a[b]) {
                            if ("series" === b) {
                                var c = [];
                                e[b].forEach(function (a, b) {
                                    a.options.isInternal || c.push(P(a.options.index, b));
                                });
                            }
                            z(a[b]).forEach(function (a, f) {
                                var k = p(a.id),
                                    g;
                                k && (g = e.get(a.id));
                                g || ((g = e[b][c ? c[f] : f]) && k && p(g.options.id) && (g = void 0));
                                g && g.coll === b && (g.update(a, !1), d && (g.touched = !0));
                                !g && d && e.collectionsWithInit[b] && (e.collectionsWithInit[b][0].apply(e, [a].concat(e.collectionsWithInit[b][1] || []).concat([!1])).touched = !0);
                            });
                            d &&
                                e[b].forEach(function (a) {
                                    a.touched || a.options.isInternal ? delete a.touched : C.push(a);
                                });
                        }
                    });
                    C.forEach(function (a) {
                        a.remove && a.remove(!1);
                    });
                    q &&
                        e.axes.forEach(function (a) {
                            a.update({}, !1);
                        });
                    h &&
                        e.getSeriesOrderByLinks().forEach(function (a) {
                            a.chart && a.update({}, !1);
                        }, this);
                    q = u && u.width;
                    u = u && u.height;
                    I(u) && (u = Q(u, q || e.chartWidth));
                    E || (k(q) && q !== e.chartWidth) || (k(u) && u !== e.chartHeight) ? e.setSize(q, u, f) : P(b, !0) && e.redraw(f);
                    c(e, "afterUpdate", { options: a, redraw: b, animation: f });
                },
                setSubtitle: function (a, b) {
                    this.applyDescription("subtitle", a);
                    this.layOutTitles(b);
                },
                setCaption: function (a, b) {
                    this.applyDescription("caption", a);
                    this.layOutTitles(b);
                },
            });
            B.prototype.collectionsWithInit = { xAxis: [B.prototype.addAxis, [!0]], yAxis: [B.prototype.addAxis, [!1]], series: [B.prototype.addSeries] };
            d(D.prototype, {
                update: function (a, b, c, f) {
                    function d() {
                        e.applyOptions(a);
                        var f = g && e.hasDummyGraphic;
                        f = null === e.y ? !f : f;
                        g && f && ((e.graphic = g.destroy()), delete e.hasDummyGraphic);
                        u(a, !0) &&
                            (g && g.element && a && a.marker && "undefined" !== typeof a.marker.symbol && (e.graphic = g.destroy()),
                            a && a.dataLabels && e.dataLabel && (e.dataLabel = e.dataLabel.destroy()),
                            e.connector && (e.connector = e.connector.destroy()));
                        p = e.index;
                        k.updateParallelArrays(e, p);
                        l.data[p] = u(l.data[p], !0) || u(a, !0) ? e.options : P(a, l.data[p]);
                        k.isDirty = k.isDirtyData = !0;
                        !k.fixedBox && k.hasCartesianSeries && (h.isDirtyBox = !0);
                        "point" === l.legendType && (h.isDirtyLegend = !0);
                        b && h.redraw(c);
                    }
                    var e = this,
                        k = e.series,
                        g = e.graphic,
                        p,
                        h = k.chart,
                        l = k.options;
                    b = P(b, !0);
                    !1 === f ? d() : e.firePointEvent("update", { options: a }, d);
                },
                remove: function (a, b) {
                    this.series.removePoint(this.series.data.indexOf(this), a, b);
                },
            });
            d(J.prototype, {
                addPoint: function (a, b, d, f, e) {
                    var k = this.options,
                        g = this.data,
                        r = this.chart,
                        u = this.xAxis;
                    u = u && u.hasNames && u.names;
                    var p = k.data,
                        h = this.xData,
                        l;
                    b = P(b, !0);
                    var z = { series: this };
                    this.pointClass.prototype.applyOptions.apply(z, [a]);
                    var y = z.x;
                    var E = h.length;
                    if (this.requireSorting && y < h[E - 1]) for (l = !0; E && h[E - 1] > y; ) E--;
                    this.updateParallelArrays(z, "splice", E, 0, 0);
                    this.updateParallelArrays(z, E);
                    u && z.name && (u[y] = z.name);
                    p.splice(E, 0, a);
                    l && (this.data.splice(E, 0, null), this.processData());
                    "point" === k.legendType && this.generatePoints();
                    d && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), this.updateParallelArrays(z, "shift"), p.shift()));
                    !1 !== e && c(this, "addPoint", { point: z });
                    this.isDirtyData = this.isDirty = !0;
                    b && r.redraw(f);
                },
                removePoint: function (a, b, c) {
                    var f = this,
                        d = f.data,
                        e = d[a],
                        k = f.points,
                        g = f.chart,
                        u = function () {
                            k && k.length === d.length && k.splice(a, 1);
                            d.splice(a, 1);
                            f.options.data.splice(a, 1);
                            f.updateParallelArrays(e || { series: f }, "splice", a, 1);
                            e && e.destroy();
                            f.isDirty = !0;
                            f.isDirtyData = !0;
                            b && g.redraw();
                        };
                    w(c, g);
                    b = P(b, !0);
                    e ? e.firePointEvent("remove", null, u) : u();
                },
                remove: function (a, b, d, f) {
                    function e() {
                        k.destroy(f);
                        k.remove = null;
                        g.isDirtyLegend = g.isDirtyBox = !0;
                        g.linkSeries();
                        P(a, !0) && g.redraw(b);
                    }
                    var k = this,
                        g = k.chart;
                    !1 !== d ? c(k, "remove", null, e) : e();
                },
                update: function (a, e) {
                    a = F.cleanRecursively(a, this.userOptions);
                    c(this, "update", { options: a });
                    var k = this,
                        f = k.chart,
                        g = k.userOptions,
                        u = k.initialType || k.type,
                        p = f.options.plotOptions,
                        h = a.type || g.type || f.options.chart.type,
                        l = !(
                            this.hasDerivedData ||
                            (h && h !== this.type) ||
                            "undefined" !== typeof a.pointStart ||
                            "undefined" !== typeof a.pointInterval ||
                            k.hasOptionChanged("dataGrouping") ||
                            k.hasOptionChanged("pointStart") ||
                            k.hasOptionChanged("pointInterval") ||
                            k.hasOptionChanged("pointIntervalUnit") ||
                            k.hasOptionChanged("keys")
                        ),
                        z = v[u].prototype,
                        t,
                        q = ["eventOptions", "navigatorSeries", "baseSeries"],
                        E = k.finishedAnimating && { animation: !1 },
                        C = {};
                    l &&
                        (q.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "cropped", "_hasPointMarkers", "_hasPointLabels", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"),
                        !1 !== a.visible && q.push("area", "graph"),
                        k.parallelArrays.forEach(function (a) {
                            q.push(a + "Data");
                        }),
                        a.data && (a.dataSorting && d(k.options.dataSorting, a.dataSorting), this.setData(a.data, !1)));
                    a = y(g, E, { index: "undefined" === typeof g.index ? k.index : g.index, pointStart: P(p && p.series && p.series.pointStart, g.pointStart, k.xData[0]) }, !l && { data: k.options.data }, a);
                    l && a.data && (a.data = k.options.data);
                    q = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(q);
                    q.forEach(function (a) {
                        q[a] = k[a];
                        delete k[a];
                    });
                    k.remove(!1, null, !1, !0);
                    for (t in z) k[t] = void 0;
                    v[h || u] ? d(k, v[h || u].prototype) : b(17, !0, f, { missingModuleFor: h || u });
                    q.forEach(function (a) {
                        k[a] = q[a];
                    });
                    k.init(f, a);
                    if (l && this.points) {
                        var I = k.options;
                        !1 === I.visible
                            ? ((C.graphic = 1), (C.dataLabel = 1))
                            : k._hasPointLabels || ((a = I.marker), (g = I.dataLabels), a && (!1 === a.enabled || "symbol" in a) && (C.graphic = 1), g && !1 === g.enabled && (C.dataLabel = 1));
                        this.points.forEach(function (a) {
                            a && a.series && (a.resolveColor(), Object.keys(C).length && a.destroyElements(C), !1 === I.showInLegend && a.legendItem && f.legend.destroyItem(a));
                        }, this);
                    }
                    k.initialType = u;
                    f.linkSeries();
                    c(this, "afterUpdate");
                    P(e, !0) && f.redraw(l ? void 0 : !1);
                },
                setName: function (a) {
                    this.name = this.options.name = this.userOptions.name = a;
                    this.chart.isDirtyLegend = !0;
                },
                hasOptionChanged: function (a) {
                    var b = this.options[a],
                        c = this.chart.options.plotOptions,
                        f = this.userOptions[a];
                    return f ? b !== f : b !== P(c && c[this.type] && c[this.type][a], c && c.series && c.series[a], b);
                },
            });
            d(n.prototype, {
                update: function (a, b) {
                    var c = this.chart,
                        f = (a && a.events) || {};
                    a = y(this.userOptions, a);
                    c.options[this.coll].indexOf && (c.options[this.coll][c.options[this.coll].indexOf(this.userOptions)] = a);
                    L(c.options[this.coll].events, function (a, b) {
                        "undefined" === typeof f[b] && (f[b] = void 0);
                    });
                    this.destroy(!0);
                    this.init(c, d(a, { events: f }));
                    c.isDirtyBox = !0;
                    P(b, !0) && c.redraw();
                },
                remove: function (b) {
                    for (var c = this.chart, d = this.coll, f = this.series, k = f.length; k--; ) f[k] && f[k].remove(!1);
                    e(c.axes, this);
                    e(c[d], this);
                    a(c.options[d]) ? c.options[d].splice(this.options.index, 1) : delete c.options[d];
                    c[d].forEach(function (a, b) {
                        a.options.index = a.userOptions.index = b;
                    });
                    this.destroy();
                    c.isDirtyBox = !0;
                    P(b, !0) && c.redraw();
                },
                setTitle: function (a, b) {
                    this.update({ title: a }, b);
                },
                setCategories: function (a, b) {
                    this.update({ categories: a }, b);
                },
            });
        }
    );
    O(m, "Series/AreaSeries.js", [m["Core/Series/Series.js"], m["Core/Color/Color.js"], m["Core/Globals.js"], m["Mixins/LegendSymbol.js"], m["Core/Utilities.js"]], function (m, n, M, B, F) {
        var v = n.parse,
            K = F.objectEach,
            D = F.pick,
            x = M.Series;
        m.seriesType(
            "area",
            "line",
            { threshold: 0 },
            {
                singleStacks: !1,
                getStackPoints: function (q) {
                    var t = [],
                        n = [],
                        m = this.xAxis,
                        l = this.yAxis,
                        h = l.stacking.stacks[this.stackKey],
                        g = {},
                        x = this.index,
                        p = l.series,
                        e = p.length,
                        b = D(l.options.reversedStacks, !0) ? 1 : -1,
                        d;
                    q = q || this.points;
                    if (this.options.stacking) {
                        for (d = 0; d < q.length; d++) (q[d].leftNull = q[d].rightNull = void 0), (g[q[d].x] = q[d]);
                        K(h, function (a, b) {
                            null !== a.total && n.push(b);
                        });
                        n.sort(function (a, b) {
                            return a - b;
                        });
                        var c = p.map(function (a) {
                            return a.visible;
                        });
                        n.forEach(function (a, k) {
                            var u = 0,
                                p,
                                y;
                            if (g[a] && !g[a].isNull)
                                t.push(g[a]),
                                    [-1, 1].forEach(function (u) {
                                        var l = 1 === u ? "rightNull" : "leftNull",
                                            q = 0,
                                            z = h[n[k + u]];
                                        if (z) for (d = x; 0 <= d && d < e; ) (p = z.points[d]), p || (d === x ? (g[a][l] = !0) : c[d] && (y = h[a].points[d]) && (q -= y[1] - y[0])), (d += b);
                                        g[a][1 === u ? "rightCliff" : "leftCliff"] = q;
                                    });
                            else {
                                for (d = x; 0 <= d && d < e; ) {
                                    if ((p = h[a].points[d])) {
                                        u = p[1];
                                        break;
                                    }
                                    d += b;
                                }
                                u = l.translate(u, 0, 1, 0, 1);
                                t.push({ isNull: !0, plotX: m.translate(a, 0, 0, 0, 1), x: a, plotY: u, yBottom: u });
                            }
                        });
                    }
                    return t;
                },
                getGraphPath: function (q) {
                    var t = x.prototype.getGraphPath,
                        n = this.options,
                        m = n.stacking,
                        l = this.yAxis,
                        h,
                        g = [],
                        v = [],
                        p = this.index,
                        e = l.stacking.stacks[this.stackKey],
                        b = n.threshold,
                        d = Math.round(l.getThreshold(n.threshold));
                    n = D(n.connectNulls, "percent" === m);
                    var c = function (a, c, u) {
                        var h = q[a];
                        a = m && e[h.x].points[p];
                        var y = h[u + "Null"] || 0;
                        u = h[u + "Cliff"] || 0;
                        h = !0;
                        if (u || y) {
                            var z = (y ? a[0] : a[1]) + u;
                            var t = a[0] + u;
                            h = !!y;
                        } else !m && q[c] && q[c].isNull && (z = t = b);
                        "undefined" !== typeof z && (v.push({ plotX: k, plotY: null === z ? d : l.getThreshold(z), isNull: h, isCliff: !0 }), g.push({ plotX: k, plotY: null === t ? d : l.getThreshold(t), doCurve: !1 }));
                    };
                    q = q || this.points;
                    m && (q = this.getStackPoints(q));
                    for (h = 0; h < q.length; h++) {
                        m || (q[h].leftCliff = q[h].rightCliff = q[h].leftNull = q[h].rightNull = void 0);
                        var a = q[h].isNull;
                        var k = D(q[h].rectPlotX, q[h].plotX);
                        var u = m ? q[h].yBottom : d;
                        if (!a || n) n || c(h, h - 1, "left"), (a && !m && n) || (v.push(q[h]), g.push({ x: h, plotX: k, plotY: u })), n || c(h, h + 1, "right");
                    }
                    h = t.call(this, v, !0, !0);
                    g.reversed = !0;
                    a = t.call(this, g, !0, !0);
                    (u = a[0]) && "M" === u[0] && (a[0] = ["L", u[1], u[2]]);
                    a = h.concat(a);
                    t = t.call(this, v, !1, n);
                    a.xMap = h.xMap;
                    this.areaPath = a;
                    return t;
                },
                drawGraph: function () {
                    this.areaPath = [];
                    x.prototype.drawGraph.apply(this);
                    var q = this,
                        t = this.areaPath,
                        n = this.options,
                        m = [["area", "RBG_charts-area", this.color, n.fillColor]];
                    this.zones.forEach(function (l, h) {
                        m.push(["zone-area-" + h, "RBG_charts-area RBG_charts-zone-area-" + h + " " + l.className, l.color || q.color, l.fillColor || n.fillColor]);
                    });
                    m.forEach(function (l) {
                        var h = l[0],
                            g = q[h],
                            m = g ? "animate" : "attr",
                            p = {};
                        g ? ((g.endX = q.preventGraphAnimation ? null : t.xMap), g.animate({ d: t })) : ((p.zIndex = 0), (g = q[h] = q.chart.renderer.path(t).addClass(l[1]).add(q.group)), (g.isArea = !0));
                        q.chart.styledMode || (p.fill = D(l[3], v(l[2]).setOpacity(D(n.fillOpacity, 0.75)).get()));
                        g[m](p);
                        g.startX = t.xMap;
                        g.shiftUnit = n.step ? 2 : 1;
                    });
                },
                drawLegendSymbol: B.drawRectangle,
            }
        );
        ("");
    });
    O(m, "Series/SplineSeries.js", [m["Core/Series/Series.js"], m["Core/Utilities.js"]], function (m, n) {
        var v = n.pick;
        m.seriesType(
            "spline",
            "line",
            {},
            {
                getPointSpline: function (n, m, J) {
                    var B = m.plotX || 0,
                        D = m.plotY || 0,
                        x = n[J - 1];
                    J = n[J + 1];
                    if (x && !x.isNull && !1 !== x.doCurve && !m.isCliff && J && !J.isNull && !1 !== J.doCurve && !m.isCliff) {
                        n = x.plotY || 0;
                        var q = J.plotX || 0;
                        J = J.plotY || 0;
                        var t = 0;
                        var w = (1.5 * B + (x.plotX || 0)) / 2.5;
                        var G = (1.5 * D + n) / 2.5;
                        q = (1.5 * B + q) / 2.5;
                        var l = (1.5 * D + J) / 2.5;
                        q !== w && (t = ((l - G) * (q - B)) / (q - w) + D - l);
                        G += t;
                        l += t;
                        G > n && G > D ? ((G = Math.max(n, D)), (l = 2 * D - G)) : G < n && G < D && ((G = Math.min(n, D)), (l = 2 * D - G));
                        l > J && l > D ? ((l = Math.max(J, D)), (G = 2 * D - l)) : l < J && l < D && ((l = Math.min(J, D)), (G = 2 * D - l));
                        m.rightContX = q;
                        m.rightContY = l;
                    }
                    m = ["C", v(x.rightContX, x.plotX, 0), v(x.rightContY, x.plotY, 0), v(w, B, 0), v(G, D, 0), B, D];
                    x.rightContX = x.rightContY = void 0;
                    return m;
                },
            }
        );
        ("");
    });
    O(m, "Series/AreaSplineSeries.js", [m["Core/Series/Series.js"], m["Mixins/LegendSymbol.js"], m["Core/Options.js"]], function (m, n, M) {
        var v = m.seriesTypes.area.prototype;
        m.seriesType("areaspline", "spline", M.defaultOptions.plotOptions.area, { getStackPoints: v.getStackPoints, getGraphPath: v.getGraphPath, drawGraph: v.drawGraph, drawLegendSymbol: n.drawRectangle });
        ("");
    });
    O(
        m,
        "Series/ColumnSeries.js",
        [m["Core/Animation/AnimationUtilities.js"], m["Core/Series/Series.js"], m["Core/Color/Color.js"], m["Core/Globals.js"], m["Mixins/LegendSymbol.js"], m["Series/LineSeries.js"], m["Core/Utilities.js"]],
        function (m, n, M, B, F, J, K) {
            var v = m.animObject,
                x = M.parse;
            m = B.noop;
            var q = K.clamp,
                t = K.defined,
                w = K.extend,
                G = K.isArray,
                l = K.isNumber,
                h = K.merge,
                g = K.pick,
                H = K.objectEach;
            ("");
            n = n.seriesType(
                "column",
                "line",
                {
                    borderRadius: 0,
                    centerInCategory: !1,
                    groupPadding: 0.2,
                    marker: null,
                    pointPadding: 0.1,
                    minPointLength: 0,
                    cropThreshold: 50,
                    pointRange: null,
                    states: { hover: { halo: !1, brightness: 0.1 }, select: { color: "#cccccc", borderColor: "#000000" } },
                    dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 },
                    startFromThreshold: !0,
                    stickyTracking: !1,
                    tooltip: { distance: 6 },
                    threshold: 0,
                    borderColor: "#ffffff",
                },
                {
                    cropShoulder: 0,
                    directTouch: !0,
                    trackerGroups: ["group", "dataLabelsGroup"],
                    negStacks: !0,
                    init: function () {
                        J.prototype.init.apply(this, arguments);
                        var g = this,
                            e = g.chart;
                        e.hasRendered &&
                            e.series.forEach(function (b) {
                                b.type === g.type && (b.isDirty = !0);
                            });
                    },
                    getColumnMetrics: function () {
                        var p = this,
                            e = p.options,
                            b = p.xAxis,
                            d = p.yAxis,
                            c = b.options.reversedStacks;
                        c = (b.reversed && !c) || (!b.reversed && c);
                        var a,
                            k = {},
                            u = 0;
                        !1 === e.grouping
                            ? (u = 1)
                            : p.chart.series.forEach(function (b) {
                                  var c = b.yAxis,
                                      e = b.options;
                                  if (b.type === p.type && (b.visible || !p.chart.options.chart.ignoreHiddenSeries) && d.len === c.len && d.pos === c.pos) {
                                      if (e.stacking && "group" !== e.stacking) {
                                          a = b.stackKey;
                                          "undefined" === typeof k[a] && (k[a] = u++);
                                          var g = k[a];
                                      } else !1 !== e.grouping && (g = u++);
                                      b.columnIndex = g;
                                  }
                              });
                        var h = Math.min(Math.abs(b.transA) * ((b.ordinal && b.ordinal.slope) || e.pointRange || b.closestPointRange || b.tickInterval || 1), b.len),
                            l = h * e.groupPadding,
                            q = (h - 2 * l) / (u || 1);
                        e = Math.min(e.maxPointWidth || b.len, g(e.pointWidth, q * (1 - 2 * e.pointPadding)));
                        p.columnMetrics = { width: e, offset: (q - e) / 2 + (l + ((p.columnIndex || 0) + (c ? 1 : 0)) * q - h / 2) * (c ? -1 : 1), paddedWidth: q, columnCount: u };
                        return p.columnMetrics;
                    },
                    crispCol: function (g, e, b, d) {
                        var c = this.chart,
                            a = this.borderWidth,
                            k = -(a % 2 ? 0.5 : 0);
                        a = a % 2 ? 0.5 : 1;
                        c.inverted && c.renderer.isVML && (a += 1);
                        this.options.crisp && ((b = Math.round(g + b) + k), (g = Math.round(g) + k), (b -= g));
                        d = Math.round(e + d) + a;
                        k = 0.5 >= Math.abs(e) && 0.5 < d;
                        e = Math.round(e) + a;
                        d -= e;
                        k && d && (--e, (d += 1));
                        return { x: g, y: e, width: b, height: d };
                    },
                    adjustForMissingColumns: function (g, e, b, d) {
                        var c = this,
                            a = this.options.stacking;
                        if (!b.isNull && 1 < d.columnCount) {
                            var k = 0,
                                u = 0;
                            H(this.yAxis.stacking && this.yAxis.stacking.stacks, function (d) {
                                if ("number" === typeof b.x && (d = d[b.x.toString()])) {
                                    var e = d.points[c.index],
                                        g = d.total;
                                    a ? (e && (k = u), d.hasValidPoints && u++) : G(e) && ((k = e[1]), (u = g || 0));
                                }
                            });
                            g = (b.plotX || 0) + ((u - 1) * d.paddedWidth + e) / 2 - e - k * d.paddedWidth;
                        }
                        return g;
                    },
                    translate: function () {
                        var p = this,
                            e = p.chart,
                            b = p.options,
                            d = (p.dense = 2 > p.closestPointRange * p.xAxis.transA);
                        d = p.borderWidth = g(b.borderWidth, d ? 0 : 1);
                        var c = p.xAxis,
                            a = p.yAxis,
                            k = b.threshold,
                            u = (p.translatedThreshold = a.getThreshold(k)),
                            h = g(b.minPointLength, 5),
                            y = p.getColumnMetrics(),
                            n = y.width,
                            m = (p.barW = Math.max(n, 1 + 2 * d)),
                            w = (p.pointXOffset = y.offset),
                            z = p.dataMin,
                            E = p.dataMax;
                        e.inverted && (u -= 0.5);
                        b.pointPadding && (m = Math.ceil(m));
                        J.prototype.translate.apply(p);
                        p.points.forEach(function (d) {
                            var C = g(d.yBottom, u),
                                f = 999 + Math.abs(C),
                                r = n,
                                I = d.plotX || 0;
                            f = q(d.plotY, -f, a.len + f);
                            var x = I + w,
                                v = m,
                                L = Math.min(f, C),
                                H = Math.max(f, C) - L;
                            if (h && Math.abs(H) < h) {
                                H = h;
                                var G = (!a.reversed && !d.negative) || (a.reversed && d.negative);
                                l(k) && l(E) && d.y === k && E <= k && (a.min || 0) < k && z !== E && (G = !G);
                                L = Math.abs(L - u) > h ? C - h : u - (G ? h : 0);
                            }
                            t(d.options.pointWidth) && ((r = v = Math.ceil(d.options.pointWidth)), (x -= Math.round((r - n) / 2)));
                            b.centerInCategory && (x = p.adjustForMissingColumns(x, r, d, y));
                            d.barX = x;
                            d.pointWidth = r;
                            d.tooltipPos = e.inverted ? [a.len + a.pos - e.plotLeft - f, c.len + c.pos - e.plotTop - (I || 0) - w - v / 2, H] : [x + v / 2, f + a.pos - e.plotTop, H];
                            d.shapeType = p.pointClass.prototype.shapeType || "rect";
                            d.shapeArgs = p.crispCol.apply(p, d.isNull ? [x, u, v, 0] : [x, L, v, H]);
                        });
                    },
                    getSymbol: m,
                    drawLegendSymbol: F.drawRectangle,
                    drawGraph: function () {
                        this.group[this.dense ? "addClass" : "removeClass"]("RBG_charts-dense-data");
                    },
                    pointAttribs: function (p, e) {
                        var b = this.options,
                            d = this.pointAttrToOptions || {};
                        var c = d.stroke || "borderColor";
                        var a = d["stroke-width"] || "borderWidth",
                            k = (p && p.color) || this.color,
                            u = (p && p[c]) || b[c] || this.color || k,
                            l = (p && p[a]) || b[a] || this[a] || 0;
                        d = (p && p.options.dashStyle) || b.dashStyle;
                        var q = g(p && p.opacity, b.opacity, 1);
                        if (p && this.zones.length) {
                            var t = p.getZone();
                            k = p.options.color || (t && (t.color || p.nonZonedColor)) || this.color;
                            t && ((u = t.borderColor || u), (d = t.dashStyle || d), (l = t.borderWidth || l));
                        }
                        e &&
                            p &&
                            ((p = h(b.states[e], (p.options.states && p.options.states[e]) || {})),
                            (e = p.brightness),
                            (k = p.color || ("undefined" !== typeof e && x(k).brighten(p.brightness).get()) || k),
                            (u = p[c] || u),
                            (l = p[a] || l),
                            (d = p.dashStyle || d),
                            (q = g(p.opacity, q)));
                        c = { fill: k, stroke: u, "stroke-width": l, opacity: q };
                        d && (c.dashstyle = d);
                        return c;
                    },
                    drawPoints: function () {
                        var g = this,
                            e = this.chart,
                            b = g.options,
                            d = e.renderer,
                            c = b.animationLimit || 250,
                            a;
                        g.points.forEach(function (k) {
                            var u = k.graphic,
                                p = !!u,
                                q = u && e.pointCount < c ? "animate" : "attr";
                            if (l(k.plotY) && null !== k.y) {
                                a = k.shapeArgs;
                                u && k.hasNewShapeType() && (u = u.destroy());
                                g.enabledDataSorting && (k.startXPos = g.xAxis.reversed ? -(a ? a.width : 0) : g.xAxis.width);
                                u || ((k.graphic = u = d[k.shapeType](a).add(k.group || g.group)) && g.enabledDataSorting && e.hasRendered && e.pointCount < c && (u.attr({ x: k.startXPos }), (p = !0), (q = "animate")));
                                if (u && p) u[q](h(a));
                                if (b.borderRadius) u[q]({ r: b.borderRadius });
                                e.styledMode || u[q](g.pointAttribs(k, k.selected && "select")).shadow(!1 !== k.allowShadow && b.shadow, null, b.stacking && !b.borderRadius);
                                u.addClass(k.getClassName(), !0);
                            } else u && (k.graphic = u.destroy());
                        });
                    },
                    animate: function (g) {
                        var e = this,
                            b = this.yAxis,
                            d = e.options,
                            c = this.chart.inverted,
                            a = {},
                            k = c ? "translateX" : "translateY";
                        if (g) (a.scaleY = 0.001), (g = q(b.toPixels(d.threshold), b.pos, b.pos + b.len)), c ? (a.translateX = g - b.len) : (a.translateY = g), e.clipBox && e.setClip(), e.group.attr(a);
                        else {
                            var u = e.group.attr(k);
                            e.group.animate(
                                { scaleY: 1 },
                                w(v(e.options.animation), {
                                    step: function (c, d) {
                                        e.group && ((a[k] = u + d.pos * (b.pos - u)), e.group.attr(a));
                                    },
                                })
                            );
                        }
                    },
                    remove: function () {
                        var g = this,
                            e = g.chart;
                        e.hasRendered &&
                            e.series.forEach(function (b) {
                                b.type === g.type && (b.isDirty = !0);
                            });
                        J.prototype.remove.apply(g, arguments);
                    },
                }
            );
            ("");
            return n;
        }
    );
    O(m, "Series/BarSeries.js", [m["Core/Series/Series.js"]], function (m) {
        m.seriesType("bar", "column", null, { inverted: !0 });
        ("");
    });
    O(m, "Series/ScatterSeries.js", [m["Core/Series/Series.js"], m["Core/Globals.js"], m["Core/Utilities.js"]], function (m, n, M) {
        M = M.addEvent;
        var v = n.Series;
        m.seriesType(
            "scatter",
            "line",
            {
                lineWidth: 0,
                findNearestPointBy: "xy",
                jitter: { x: 0, y: 0 },
                marker: { enabled: !0 },
                tooltip: { headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>', pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>" },
            },
            {
                sorted: !1,
                requireSorting: !1,
                noSharedTooltip: !0,
                trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                takeOrdinalPosition: !1,
                drawGraph: function () {
                    (this.options.lineWidth || (0 === this.options.lineWidth && this.graph && this.graph.strokeWidth())) && v.prototype.drawGraph.call(this);
                },
                applyJitter: function () {
                    var n = this,
                        m = this.options.jitter,
                        v = this.points.length;
                    m &&
                        this.points.forEach(function (D, x) {
                            ["x", "y"].forEach(function (q, t) {
                                var w = "plot" + q.toUpperCase();
                                if (m[q] && !D.isNull) {
                                    var G = n[q + "Axis"];
                                    var l = m[q] * G.transA;
                                    if (G && !G.isLog) {
                                        var h = Math.max(0, D[w] - l);
                                        G = Math.min(G.len, D[w] + l);
                                        t = 1e4 * Math.sin(x + t * v);
                                        D[w] = h + (G - h) * (t - Math.floor(t));
                                        "x" === q && (D.clientX = D.plotX);
                                    }
                                }
                            });
                        });
                },
            }
        );
        M(v, "afterTranslate", function () {
            this.applyJitter && this.applyJitter();
        });
        ("");
    });
    O(m, "Mixins/CenteredSeries.js", [m["Core/Globals.js"], m["Core/Utilities.js"]], function (m, n) {
        var v = n.isNumber,
            B = n.pick,
            F = n.relativeLength,
            J = m.deg2rad;
        return (m.CenteredSeriesMixin = {
            getCenter: function () {
                var n = this.options,
                    v = this.chart,
                    x = 2 * (n.slicedOffset || 0),
                    q = v.plotWidth - 2 * x,
                    t = v.plotHeight - 2 * x,
                    w = n.center,
                    G = Math.min(q, t),
                    l = n.size,
                    h = n.innerSize || 0;
                "string" === typeof l && (l = parseFloat(l));
                "string" === typeof h && (h = parseFloat(h));
                n = [B(w[0], "50%"), B(w[1], "50%"), B(l && 0 > l ? void 0 : n.size, "100%"), B(h && 0 > h ? void 0 : n.innerSize || 0, "0%")];
                !v.angular || this instanceof m.Series || (n[3] = 0);
                for (w = 0; 4 > w; ++w) (l = n[w]), (v = 2 > w || (2 === w && /%$/.test(l))), (n[w] = F(l, [q, t, G, n[2]][w]) + (v ? x : 0));
                n[3] > n[2] && (n[3] = n[2]);
                return n;
            },
            getStartAndEndRadians: function (n, m) {
                n = v(n) ? n : 0;
                m = v(m) && m > n && 360 > m - n ? m : n + 360;
                return { start: J * (n + -90), end: J * (m + -90) };
            },
        });
    });
    O(
        m,
        "Series/PieSeries.js",
        [
            m["Core/Animation/AnimationUtilities.js"],
            m["Core/Series/Series.js"],
            m["Mixins/CenteredSeries.js"],
            m["Core/Globals.js"],
            m["Mixins/LegendSymbol.js"],
            m["Series/LineSeries.js"],
            m["Core/Series/Point.js"],
            m["Core/Renderer/SVG/SVGRenderer.js"],
            m["Core/Utilities.js"],
        ],
        function (m, n, M, B, F, J, K, D, x) {
            var q = m.setAnimation,
                t = M.getStartAndEndRadians;
            m = B.noop;
            var w = x.addEvent,
                v = x.clamp,
                l = x.defined,
                h = x.fireEvent,
                g = x.isNumber,
                H = x.merge,
                p = x.pick,
                e = x.relativeLength;
            n.seriesType(
                "pie",
                "line",
                {
                    center: [null, null],
                    clip: !1,
                    colorByPoint: !0,
                    dataLabels: {
                        allowOverlap: !0,
                        connectorPadding: 5,
                        connectorShape: "fixedOffset",
                        crookDistance: "70%",
                        distance: 30,
                        enabled: !0,
                        formatter: function () {
                            return this.point.isNull ? void 0 : this.point.name;
                        },
                        softConnector: !0,
                        x: 0,
                    },
                    fillColor: void 0,
                    ignoreHiddenPoint: !0,
                    inactiveOtherPoints: !0,
                    legendType: "point",
                    marker: null,
                    size: null,
                    showInLegend: !1,
                    slicedOffset: 10,
                    stickyTracking: !1,
                    tooltip: { followPointer: !0 },
                    borderColor: "#ffffff",
                    borderWidth: 1,
                    lineWidth: void 0,
                    states: { hover: { brightness: 0.1 } },
                },
                {
                    isCartesian: !1,
                    requireSorting: !1,
                    directTouch: !0,
                    noSharedTooltip: !0,
                    trackerGroups: ["group", "dataLabelsGroup"],
                    axisTypes: [],
                    pointAttribs: n.seriesTypes.column.prototype.pointAttribs,
                    animate: function (b) {
                        var d = this,
                            c = d.points,
                            a = d.startAngleRad;
                        b ||
                            c.forEach(function (b) {
                                var c = b.graphic,
                                    e = b.shapeArgs;
                                c && e && (c.attr({ r: p(b.startR, d.center && d.center[3] / 2), start: a, end: a }), c.animate({ r: e.r, start: e.start, end: e.end }, d.options.animation));
                            });
                    },
                    hasData: function () {
                        return !!this.processedXData.length;
                    },
                    updateTotals: function () {
                        var b,
                            d = 0,
                            c = this.points,
                            a = c.length,
                            e = this.options.ignoreHiddenPoint;
                        for (b = 0; b < a; b++) {
                            var g = c[b];
                            d += e && !g.visible ? 0 : g.isNull ? 0 : g.y;
                        }
                        this.total = d;
                        for (b = 0; b < a; b++) (g = c[b]), (g.percentage = 0 < d && (g.visible || !e) ? (g.y / d) * 100 : 0), (g.total = d);
                    },
                    generatePoints: function () {
                        J.prototype.generatePoints.call(this);
                        this.updateTotals();
                    },
                    getX: function (b, d, c) {
                        var a = this.center,
                            e = this.radii ? this.radii[c.index] : a[2] / 2;
                        b = Math.asin(v((b - a[1]) / (e + c.labelDistance), -1, 1));
                        return a[0] + (d ? -1 : 1) * Math.cos(b) * (e + c.labelDistance) + (0 < c.labelDistance ? (d ? -1 : 1) * this.options.dataLabels.padding : 0);
                    },
                    translate: function (b) {
                        this.generatePoints();
                        var d = 0,
                            c = this.options,
                            a = c.slicedOffset,
                            k = a + (c.borderWidth || 0),
                            g = t(c.startAngle, c.endAngle),
                            l = (this.startAngleRad = g.start);
                        g = (this.endAngleRad = g.end) - l;
                        var q = this.points,
                            n = c.dataLabels.distance;
                        c = c.ignoreHiddenPoint;
                        var m,
                            w = q.length;
                        b || (this.center = b = this.getCenter());
                        for (m = 0; m < w; m++) {
                            var z = q[m];
                            var E = l + d * g;
                            if (!c || z.visible) d += z.percentage / 100;
                            var C = l + d * g;
                            z.shapeType = "arc";
                            z.shapeArgs = { x: b[0], y: b[1], r: b[2] / 2, innerR: b[3] / 2, start: Math.round(1e3 * E) / 1e3, end: Math.round(1e3 * C) / 1e3 };
                            z.labelDistance = p(z.options.dataLabels && z.options.dataLabels.distance, n);
                            z.labelDistance = e(z.labelDistance, z.shapeArgs.r);
                            this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, z.labelDistance);
                            C = (C + E) / 2;
                            C > 1.5 * Math.PI ? (C -= 2 * Math.PI) : C < -Math.PI / 2 && (C += 2 * Math.PI);
                            z.slicedTranslation = { translateX: Math.round(Math.cos(C) * a), translateY: Math.round(Math.sin(C) * a) };
                            var A = (Math.cos(C) * b[2]) / 2;
                            var f = (Math.sin(C) * b[2]) / 2;
                            z.tooltipPos = [b[0] + 0.7 * A, b[1] + 0.7 * f];
                            z.half = C < -Math.PI / 2 || C > Math.PI / 2 ? 1 : 0;
                            z.angle = C;
                            E = Math.min(k, z.labelDistance / 5);
                            z.labelPosition = {
                                natural: { x: b[0] + A + Math.cos(C) * z.labelDistance, y: b[1] + f + Math.sin(C) * z.labelDistance },
                                final: {},
                                alignment: 0 > z.labelDistance ? "center" : z.half ? "right" : "left",
                                connectorPosition: { breakAt: { x: b[0] + A + Math.cos(C) * E, y: b[1] + f + Math.sin(C) * E }, touchingSliceAt: { x: b[0] + A, y: b[1] + f } },
                            };
                        }
                        h(this, "afterTranslate");
                    },
                    drawEmpty: function () {
                        var b = this.startAngleRad,
                            d = this.endAngleRad,
                            c = this.options;
                        if (0 === this.total && this.center) {
                            var a = this.center[0];
                            var e = this.center[1];
                            this.graph ||
                                (this.graph = this.chart.renderer
                                    .arc(a, e, this.center[1] / 2, 0, b, d)
                                    .addClass("RBG_charts-empty-series")
                                    .add(this.group));
                            this.graph.attr({ d: D.prototype.symbols.arc(a, e, this.center[2] / 2, 0, { start: b, end: d, innerR: this.center[3] / 2 }) });
                            this.chart.styledMode || this.graph.attr({ "stroke-width": c.borderWidth, fill: c.fillColor || "none", stroke: c.color || "#cccccc" });
                        } else this.graph && (this.graph = this.graph.destroy());
                    },
                    redrawPoints: function () {
                        var b = this,
                            d = b.chart,
                            c = d.renderer,
                            a,
                            e,
                            g,
                            h,
                            p = b.options.shadow;
                        this.drawEmpty();
                        !p || b.shadowGroup || d.styledMode || (b.shadowGroup = c.g("shadow").attr({ zIndex: -1 }).add(b.group));
                        b.points.forEach(function (k) {
                            var u = {};
                            e = k.graphic;
                            if (!k.isNull && e) {
                                h = k.shapeArgs;
                                a = k.getTranslate();
                                if (!d.styledMode) {
                                    var l = k.shadowGroup;
                                    p && !l && (l = k.shadowGroup = c.g("shadow").add(b.shadowGroup));
                                    l && l.attr(a);
                                    g = b.pointAttribs(k, k.selected && "select");
                                }
                                k.delayedRendering
                                    ? (e.setRadialReference(b.center).attr(h).attr(a), d.styledMode || e.attr(g).attr({ "stroke-linejoin": "round" }).shadow(p, l), (k.delayedRendering = !1))
                                    : (e.setRadialReference(b.center), d.styledMode || H(!0, u, g), H(!0, u, h, a), e.animate(u));
                                e.attr({ visibility: k.visible ? "inherit" : "hidden" });
                                e.addClass(k.getClassName());
                            } else e && (k.graphic = e.destroy());
                        });
                    },
                    drawPoints: function () {
                        var b = this.chart.renderer;
                        this.points.forEach(function (d) {
                            d.graphic && d.hasNewShapeType() && (d.graphic = d.graphic.destroy());
                            d.graphic || ((d.graphic = b[d.shapeType](d.shapeArgs).add(d.series.group)), (d.delayedRendering = !0));
                        });
                    },
                    searchPoint: m,
                    sortByAngle: function (b, d) {
                        b.sort(function (b, a) {
                            return "undefined" !== typeof b.angle && (a.angle - b.angle) * d;
                        });
                    },
                    drawLegendSymbol: F.drawRectangle,
                    getCenter: M.getCenter,
                    getSymbol: m,
                    drawGraph: null,
                },
                {
                    init: function () {
                        K.prototype.init.apply(this, arguments);
                        var b = this;
                        b.name = p(b.name, "Slice");
                        var d = function (c) {
                            b.slice("select" === c.type);
                        };
                        w(b, "select", d);
                        w(b, "unselect", d);
                        return b;
                    },
                    isValid: function () {
                        return g(this.y) && 0 <= this.y;
                    },
                    setVisible: function (b, d) {
                        var c = this,
                            a = c.series,
                            e = a.chart,
                            g = a.options.ignoreHiddenPoint;
                        d = p(d, g);
                        b !== c.visible &&
                            ((c.visible = c.options.visible = b = "undefined" === typeof b ? !c.visible : b),
                            (a.options.data[a.data.indexOf(c)] = c.options),
                            ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (a) {
                                if (c[a]) c[a][b ? "show" : "hide"](!0);
                            }),
                            c.legendItem && e.legend.colorizeItem(c, b),
                            b || "hover" !== c.state || c.setState(""),
                            g && (a.isDirty = !0),
                            d && e.redraw());
                    },
                    slice: function (b, d, c) {
                        var a = this.series;
                        q(c, a.chart);
                        p(d, !0);
                        this.sliced = this.options.sliced = l(b) ? b : !this.sliced;
                        a.options.data[a.data.indexOf(this)] = this.options;
                        this.graphic && this.graphic.animate(this.getTranslate());
                        this.shadowGroup && this.shadowGroup.animate(this.getTranslate());
                    },
                    getTranslate: function () {
                        return this.sliced ? this.slicedTranslation : { translateX: 0, translateY: 0 };
                    },
                    haloPath: function (b) {
                        var d = this.shapeArgs;
                        return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(d.x, d.y, d.r + b, d.r + b, { innerR: d.r - 1, start: d.start, end: d.end });
                    },
                    connectorShapes: {
                        fixedOffset: function (b, d, c) {
                            var a = d.breakAt;
                            d = d.touchingSliceAt;
                            return [["M", b.x, b.y], c.softConnector ? ["C", b.x + ("left" === b.alignment ? -5 : 5), b.y, 2 * a.x - d.x, 2 * a.y - d.y, a.x, a.y] : ["L", a.x, a.y], ["L", d.x, d.y]];
                        },
                        straight: function (b, d) {
                            d = d.touchingSliceAt;
                            return [
                                ["M", b.x, b.y],
                                ["L", d.x, d.y],
                            ];
                        },
                        crookedLine: function (b, d, c) {
                            d = d.touchingSliceAt;
                            var a = this.series,
                                k = a.center[0],
                                g = a.chart.plotWidth,
                                h = a.chart.plotLeft;
                            a = b.alignment;
                            var p = this.shapeArgs.r;
                            c = e(c.crookDistance, 1);
                            g = "left" === a ? k + p + (g + h - k - p) * (1 - c) : h + (k - p) * c;
                            c = ["L", g, b.y];
                            k = !0;
                            if ("left" === a ? g > b.x || g < d.x : g < b.x || g > d.x) k = !1;
                            b = [["M", b.x, b.y]];
                            k && b.push(c);
                            b.push(["L", d.x, d.y]);
                            return b;
                        },
                    },
                    getConnectorPath: function () {
                        var b = this.labelPosition,
                            d = this.series.options.dataLabels,
                            c = d.connectorShape,
                            a = this.connectorShapes;
                        a[c] && (c = a[c]);
                        return c.call(this, { x: b.final.x, y: b.final.y, alignment: b.alignment }, b.connectorPosition, d);
                    },
                }
            );
            ("");
        }
    );
    O(m, "Core/Series/DataLabels.js", [m["Core/Animation/AnimationUtilities.js"], m["Core/Globals.js"], m["Core/Series/CartesianSeries.js"], m["Core/Utilities.js"]], function (m, n, M, B) {
        var v = m.getDeferredAnimation;
        m = n.noop;
        var J = n.seriesTypes,
            K = B.arrayMax,
            D = B.clamp,
            x = B.defined,
            q = B.extend,
            t = B.fireEvent,
            w = B.format,
            G = B.isArray,
            l = B.merge,
            h = B.objectEach,
            g = B.pick,
            H = B.relativeLength,
            p = B.splat,
            e = B.stableSort;
        ("");
        n.distribute = function (b, d, c) {
            function a(a, b) {
                return a.target - b.target;
            }
            var k,
                u = !0,
                h = b,
                p = [];
            var l = 0;
            var q = h.reducedLen || d;
            for (k = b.length; k--; ) l += b[k].size;
            if (l > q) {
                e(b, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0);
                });
                for (l = k = 0; l <= q; ) (l += b[k].size), k++;
                p = b.splice(k - 1, b.length);
            }
            e(b, a);
            for (
                b = b.map(function (a) {
                    return { size: a.size, targets: [a.target], align: g(a.align, 0.5) };
                });
                u;

            ) {
                for (k = b.length; k--; ) (u = b[k]), (l = (Math.min.apply(0, u.targets) + Math.max.apply(0, u.targets)) / 2), (u.pos = D(l - u.size * u.align, 0, d - u.size));
                k = b.length;
                for (u = !1; k--; )
                    0 < k &&
                        b[k - 1].pos + b[k - 1].size > b[k].pos &&
                        ((b[k - 1].size += b[k].size), (b[k - 1].targets = b[k - 1].targets.concat(b[k].targets)), (b[k - 1].align = 0.5), b[k - 1].pos + b[k - 1].size > d && (b[k - 1].pos = d - b[k - 1].size), b.splice(k, 1), (u = !0));
            }
            h.push.apply(h, p);
            k = 0;
            b.some(function (a) {
                var b = 0;
                if (
                    a.targets.some(function () {
                        h[k].pos = a.pos + b;
                        if ("undefined" !== typeof c && Math.abs(h[k].pos - h[k].target) > c)
                            return (
                                h.slice(0, k + 1).forEach(function (a) {
                                    delete a.pos;
                                }),
                                (h.reducedLen = (h.reducedLen || d) - 0.1 * d),
                                h.reducedLen > 0.1 * d && n.distribute(h, d, c),
                                !0
                            );
                        b += h[k].size;
                        k++;
                    })
                )
                    return !0;
            });
            e(h, a);
        };
        M.prototype.drawDataLabels = function () {
            function b(a, b) {
                var c = b.filter;
                return c
                    ? ((b = c.operator), (a = a[c.property]), (c = c.value), (">" === b && a > c) || ("<" === b && a < c) || (">=" === b && a >= c) || ("<=" === b && a <= c) || ("==" === b && a == c) || ("===" === b && a === c) ? !0 : !1)
                    : !0;
            }
            function d(a, b) {
                var c = [],
                    f;
                if (G(a) && !G(b))
                    c = a.map(function (a) {
                        return l(a, b);
                    });
                else if (G(b) && !G(a))
                    c = b.map(function (b) {
                        return l(a, b);
                    });
                else if (G(a) || G(b)) for (f = Math.max(a.length, b.length); f--; ) c[f] = l(a[f], b[f]);
                else c = l(a, b);
                return c;
            }
            var c = this,
                a = c.chart,
                e = c.options,
                u = e.dataLabels,
                q = c.points,
                y,
                n = c.hasRendered || 0,
                m = u.animation;
            m = u.defer ? v(a, m, c) : { defer: 0, duration: 0 };
            var H = a.renderer;
            u = d(d(a.options.plotOptions && a.options.plotOptions.series && a.options.plotOptions.series.dataLabels, a.options.plotOptions && a.options.plotOptions[c.type] && a.options.plotOptions[c.type].dataLabels), u);
            t(this, "drawDataLabels");
            if (G(u) || u.enabled || c._hasPointLabels) {
                var z = c.plotGroup("dataLabelsGroup", "data-labels", n ? "inherit" : "hidden", u.zIndex || 6);
                z.attr({ opacity: +n });
                !n && (n = c.dataLabelsGroup) && (c.visible && z.show(!0), n[e.animation ? "animate" : "attr"]({ opacity: 1 }, m));
                q.forEach(function (k) {
                    y = p(d(u, k.dlOptions || (k.options && k.options.dataLabels)));
                    y.forEach(function (d, u) {
                        var f = d.enabled && (!k.isNull || k.dataLabelOnNull) && b(k, d),
                            r = k.dataLabels ? k.dataLabels[u] : k.dataLabel,
                            p = k.connectors ? k.connectors[u] : k.connector,
                            l = g(d.distance, k.labelDistance),
                            q = !r;
                        if (f) {
                            var t = k.getLabelConfig();
                            var y = g(d[k.formatPrefix + "Format"], d.format);
                            t = x(y) ? w(y, t, a) : (d[k.formatPrefix + "Formatter"] || d.formatter).call(t, d);
                            y = d.style;
                            var n = d.rotation;
                            a.styledMode ||
                                ((y.color = g(d.color, y.color, c.color, "#000000")),
                                "contrast" === y.color ? ((k.contrastColor = H.getContrast(k.color || c.color)), (y.color = (!x(l) && d.inside) || 0 > l || e.stacking ? k.contrastColor : "#000000")) : delete k.contrastColor,
                                e.cursor && (y.cursor = e.cursor));
                            var m = { r: d.borderRadius || 0, rotation: n, padding: d.padding, zIndex: 1 };
                            a.styledMode || ((m.fill = d.backgroundColor), (m.stroke = d.borderColor), (m["stroke-width"] = d.borderWidth));
                            h(m, function (a, b) {
                                "undefined" === typeof a && delete m[b];
                            });
                        }
                        !r || (f && x(t))
                            ? f &&
                              x(t) &&
                              (r
                                  ? (m.text = t)
                                  : ((k.dataLabels = k.dataLabels || []),
                                    (r = k.dataLabels[u] = n ? H.text(t, 0, -9999, d.useHTML).addClass("RBG_charts-data-label") : H.label(t, 0, -9999, d.shape, null, null, d.useHTML, null, "data-label")),
                                    u || (k.dataLabel = r),
                                    r.addClass(" RBG_charts-data-label-color-" + k.colorIndex + " " + (d.className || "") + (d.useHTML ? " RBG_charts-tracker" : ""))),
                              (r.options = d),
                              r.attr(m),
                              a.styledMode || r.css(y).shadow(d.shadow),
                              r.added || r.add(z),
                              d.textPath && !d.useHTML && (r.setTextPath((k.getDataLabelPath && k.getDataLabelPath(r)) || k.graphic, d.textPath), k.dataLabelPath && !d.textPath.enabled && (k.dataLabelPath = k.dataLabelPath.destroy())),
                              c.alignDataLabel(k, r, d, null, q))
                            : ((k.dataLabel = k.dataLabel && k.dataLabel.destroy()),
                              k.dataLabels && (1 === k.dataLabels.length ? delete k.dataLabels : delete k.dataLabels[u]),
                              u || delete k.dataLabel,
                              p && ((k.connector = k.connector.destroy()), k.connectors && (1 === k.connectors.length ? delete k.connectors : delete k.connectors[u])));
                    });
                });
            }
            t(this, "afterDrawDataLabels");
        };
        M.prototype.alignDataLabel = function (b, d, c, a, e) {
            var k = this,
                h = this.chart,
                p = this.isCartesian && h.inverted,
                l = this.enabledDataSorting,
                t = g(b.dlBox && b.dlBox.centerX, b.plotX, -9999),
                n = g(b.plotY, -9999),
                z = d.getBBox(),
                m = c.rotation,
                C = c.align,
                A = h.isInsidePlot(t, Math.round(n), p),
                f = "justify" === g(c.overflow, l ? "none" : "justify"),
                r = this.visible && !1 !== b.visible && (b.series.forceDL || (l && !f) || A || (c.inside && a && h.isInsidePlot(t, p ? a.x + 1 : a.y + a.height - 1, p)));
            var w = function (a) {
                l && k.xAxis && !f && k.setDataLabelStartPos(b, d, e, A, a);
            };
            if (r) {
                var x = h.renderer.fontMetrics(h.styledMode ? void 0 : c.style.fontSize, d).b;
                a = q({ x: p ? this.yAxis.len - n : t, y: Math.round(p ? this.xAxis.len - t : n), width: 0, height: 0 }, a);
                q(c, { width: z.width, height: z.height });
                m
                    ? ((f = !1),
                      (t = h.renderer.rotCorr(x, m)),
                      (t = { x: a.x + (c.x || 0) + a.width / 2 + t.x, y: a.y + (c.y || 0) + { top: 0, middle: 0.5, bottom: 1 }[c.verticalAlign] * a.height }),
                      w(t),
                      d[e ? "attr" : "animate"](t).attr({ align: C }),
                      (w = (m + 720) % 360),
                      (w = 180 < w && 360 > w),
                      "left" === C ? (t.y -= w ? z.height : 0) : "center" === C ? ((t.x -= z.width / 2), (t.y -= z.height / 2)) : "right" === C && ((t.x -= z.width), (t.y -= w ? 0 : z.height)),
                      (d.placed = !0),
                      (d.alignAttr = t))
                    : (w(a), d.align(c, null, a), (t = d.alignAttr));
                f && 0 <= a.height ? this.justifyDataLabel(d, c, t, z, a, e) : g(c.crop, !0) && (r = h.isInsidePlot(t.x, t.y) && h.isInsidePlot(t.x + z.width, t.y + z.height));
                if (c.shape && !m) d[e ? "attr" : "animate"]({ anchorX: p ? h.plotWidth - b.plotY : b.plotX, anchorY: p ? h.plotHeight - b.plotX : b.plotY });
            }
            e && l && (d.placed = !1);
            r || (l && !f) || (d.hide(!0), (d.placed = !1));
        };
        M.prototype.setDataLabelStartPos = function (b, d, c, a, e) {
            var k = this.chart,
                g = k.inverted,
                h = this.xAxis,
                p = h.reversed,
                l = g ? d.height / 2 : d.width / 2;
            b = (b = b.pointWidth) ? b / 2 : 0;
            h = g ? e.x : p ? -l - b : h.width - l + b;
            e = g ? (p ? this.yAxis.height - l + b : -l - b) : e.y;
            d.startXPos = h;
            d.startYPos = e;
            a ? "hidden" === d.visibility && (d.show(), d.attr({ opacity: 0 }).animate({ opacity: 1 })) : d.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, d.hide);
            k.hasRendered && (c && d.attr({ x: d.startXPos, y: d.startYPos }), (d.placed = !0));
        };
        M.prototype.justifyDataLabel = function (b, d, c, a, e, g) {
            var k = this.chart,
                u = d.align,
                h = d.verticalAlign,
                p = b.box ? 0 : b.padding || 0,
                l = d.x;
            l = void 0 === l ? 0 : l;
            var z = d.y;
            var t = void 0 === z ? 0 : z;
            z = c.x + p;
            if (0 > z) {
                "right" === u && 0 <= l ? ((d.align = "left"), (d.inside = !0)) : (l -= z);
                var q = !0;
            }
            z = c.x + a.width - p;
            z > k.plotWidth && ("left" === u && 0 >= l ? ((d.align = "right"), (d.inside = !0)) : (l += k.plotWidth - z), (q = !0));
            z = c.y + p;
            0 > z && ("bottom" === h && 0 <= t ? ((d.verticalAlign = "top"), (d.inside = !0)) : (t -= z), (q = !0));
            z = c.y + a.height - p;
            z > k.plotHeight && ("top" === h && 0 >= t ? ((d.verticalAlign = "bottom"), (d.inside = !0)) : (t += k.plotHeight - z), (q = !0));
            q && ((d.x = l), (d.y = t), (b.placed = !g), b.align(d, void 0, e));
            return q;
        };
        J.pie &&
            ((J.pie.prototype.dataLabelPositioners = {
                radialDistributionY: function (b) {
                    return b.top + b.distributeBox.pos;
                },
                radialDistributionX: function (b, d, c, a) {
                    return b.getX(c < d.top + 2 || c > d.bottom - 2 ? a : c, d.half, d);
                },
                justify: function (b, d, c) {
                    return c[0] + (b.half ? -1 : 1) * (d + b.labelDistance);
                },
                alignToPlotEdges: function (b, d, c, a) {
                    b = b.getBBox().width;
                    return d ? b + a : c - b - a;
                },
                alignToConnectors: function (b, d, c, a) {
                    var e = 0,
                        g;
                    b.forEach(function (a) {
                        g = a.dataLabel.getBBox().width;
                        g > e && (e = g);
                    });
                    return d ? e + a : c - e - a;
                },
            }),
            (J.pie.prototype.drawDataLabels = function () {
                var b = this,
                    d = b.data,
                    c,
                    a = b.chart,
                    e = b.options.dataLabels || {},
                    u = e.connectorPadding,
                    h,
                    p = a.plotWidth,
                    t = a.plotHeight,
                    q = a.plotLeft,
                    m = Math.round(a.chartWidth / 3),
                    z,
                    E = b.center,
                    C = E[2] / 2,
                    w = E[1],
                    f,
                    r,
                    v,
                    H,
                    G = [[], []],
                    D,
                    B,
                    F,
                    J,
                    O = [0, 0, 0, 0],
                    V = b.dataLabelPositioners,
                    U;
                b.visible &&
                    (e.enabled || b._hasPointLabels) &&
                    (d.forEach(function (a) {
                        a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), (a.dataLabel.shortened = !1));
                    }),
                    M.prototype.drawDataLabels.apply(b),
                    d.forEach(function (a) {
                        a.dataLabel &&
                            (a.visible
                                ? (G[a.half].push(a),
                                  (a.dataLabel._pos = null),
                                  !x(e.style.width) &&
                                      !x(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) &&
                                      a.dataLabel.getBBox().width > m &&
                                      (a.dataLabel.css({ width: Math.round(0.7 * m) + "px" }), (a.dataLabel.shortened = !0)))
                                : ((a.dataLabel = a.dataLabel.destroy()), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels));
                    }),
                    G.forEach(function (d, k) {
                        var h = d.length,
                            l = [],
                            z;
                        if (h) {
                            b.sortByAngle(d, k - 0.5);
                            if (0 < b.maxLabelDistance) {
                                var y = Math.max(0, w - C - b.maxLabelDistance);
                                var m = Math.min(w + C + b.maxLabelDistance, a.plotHeight);
                                d.forEach(function (b) {
                                    0 < b.labelDistance &&
                                        b.dataLabel &&
                                        ((b.top = Math.max(0, w - C - b.labelDistance)),
                                        (b.bottom = Math.min(w + C + b.labelDistance, a.plotHeight)),
                                        (z = b.dataLabel.getBBox().height || 21),
                                        (b.distributeBox = { target: b.labelPosition.natural.y - b.top + z / 2, size: z, rank: b.y }),
                                        l.push(b.distributeBox));
                                });
                                y = m + z - y;
                                n.distribute(l, y, y / 5);
                            }
                            for (J = 0; J < h; J++) {
                                c = d[J];
                                v = c.labelPosition;
                                f = c.dataLabel;
                                F = !1 === c.visible ? "hidden" : "inherit";
                                B = y = v.natural.y;
                                l && x(c.distributeBox) && ("undefined" === typeof c.distributeBox.pos ? (F = "hidden") : ((H = c.distributeBox.size), (B = V.radialDistributionY(c))));
                                delete c.positionIndex;
                                if (e.justify) D = V.justify(c, C, E);
                                else
                                    switch (e.alignTo) {
                                        case "connectors":
                                            D = V.alignToConnectors(d, k, p, q);
                                            break;
                                        case "plotEdges":
                                            D = V.alignToPlotEdges(f, k, p, q);
                                            break;
                                        default:
                                            D = V.radialDistributionX(b, c, B, y);
                                    }
                                f._attr = { visibility: F, align: v.alignment };
                                U = c.options.dataLabels || {};
                                f._pos = { x: D + g(U.x, e.x) + ({ left: u, right: -u }[v.alignment] || 0), y: B + g(U.y, e.y) - 10 };
                                v.final.x = D;
                                v.final.y = B;
                                g(e.crop, !0) &&
                                    ((r = f.getBBox().width),
                                    (y = null),
                                    D - r < u && 1 === k ? ((y = Math.round(r - D + u)), (O[3] = Math.max(y, O[3]))) : D + r > p - u && 0 === k && ((y = Math.round(D + r - p + u)), (O[1] = Math.max(y, O[1]))),
                                    0 > B - H / 2 ? (O[0] = Math.max(Math.round(-B + H / 2), O[0])) : B + H / 2 > t && (O[2] = Math.max(Math.round(B + H / 2 - t), O[2])),
                                    (f.sideOverflow = y));
                            }
                        }
                    }),
                    0 === K(O) || this.verifyDataLabelOverflow(O)) &&
                    (this.placeDataLabels(),
                    this.points.forEach(function (c) {
                        U = l(e, c.options.dataLabels);
                        if ((h = g(U.connectorWidth, 1))) {
                            var d;
                            z = c.connector;
                            if ((f = c.dataLabel) && f._pos && c.visible && 0 < c.labelDistance) {
                                F = f._attr.visibility;
                                if ((d = !z))
                                    (c.connector = z = a.renderer
                                        .path()
                                        .addClass("RBG_charts-data-label-connector  RBG_charts-color-" + c.colorIndex + (c.className ? " " + c.className : ""))
                                        .add(b.dataLabelsGroup)),
                                        a.styledMode || z.attr({ "stroke-width": h, stroke: U.connectorColor || c.color || "#666666" });
                                z[d ? "attr" : "animate"]({ d: c.getConnectorPath() });
                                z.attr("visibility", F);
                            } else z && (c.connector = z.destroy());
                        }
                    }));
            }),
            (J.pie.prototype.placeDataLabels = function () {
                this.points.forEach(function (b) {
                    var d = b.dataLabel,
                        c;
                    d &&
                        b.visible &&
                        ((c = d._pos)
                            ? (d.sideOverflow &&
                                  ((d._attr.width = Math.max(d.getBBox().width - d.sideOverflow, 0)),
                                  d.css({ width: d._attr.width + "px", textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis" }),
                                  (d.shortened = !0)),
                              d.attr(d._attr),
                              d[d.moved ? "animate" : "attr"](c),
                              (d.moved = !0))
                            : d && d.attr({ y: -9999 }));
                    delete b.distributeBox;
                }, this);
            }),
            (J.pie.prototype.alignDataLabel = m),
            (J.pie.prototype.verifyDataLabelOverflow = function (b) {
                var d = this.center,
                    c = this.options,
                    a = c.center,
                    e = c.minSize || 80,
                    g = null !== c.size;
                if (!g) {
                    if (null !== a[0]) var h = Math.max(d[2] - Math.max(b[1], b[3]), e);
                    else (h = Math.max(d[2] - b[1] - b[3], e)), (d[0] += (b[3] - b[1]) / 2);
                    null !== a[1] ? (h = D(h, e, d[2] - Math.max(b[0], b[2]))) : ((h = D(h, e, d[2] - b[0] - b[2])), (d[1] += (b[0] - b[2]) / 2));
                    h < d[2] ? ((d[2] = h), (d[3] = Math.min(H(c.innerSize || 0, h), h)), this.translate(d), this.drawDataLabels && this.drawDataLabels()) : (g = !0);
                }
                return g;
            }));
        J.column &&
            (J.column.prototype.alignDataLabel = function (b, d, c, a, e) {
                var k = this.chart.inverted,
                    h = b.series,
                    p = b.dlBox || b.shapeArgs,
                    t = g(b.below, b.plotY > g(this.translatedThreshold, h.yAxis.len)),
                    q = g(c.inside, !!this.options.stacking);
                p &&
                    ((a = l(p)),
                    0 > a.y && ((a.height += a.y), (a.y = 0)),
                    (p = a.y + a.height - h.yAxis.len),
                    0 < p && p < a.height && (a.height -= p),
                    k && (a = { x: h.yAxis.len - a.y - a.height, y: h.xAxis.len - a.x - a.width, width: a.height, height: a.width }),
                    q || (k ? ((a.x += t ? 0 : a.width), (a.width = 0)) : ((a.y += t ? a.height : 0), (a.height = 0))));
                c.align = g(c.align, !k || q ? "center" : t ? "right" : "left");
                c.verticalAlign = g(c.verticalAlign, k || q ? "middle" : t ? "top" : "bottom");
                M.prototype.alignDataLabel.call(this, b, d, c, a, e);
                c.inside && b.contrastColor && d.css({ color: b.contrastColor });
            });
    });
    O(m, "Extensions/OverlappingDataLabels.js", [m["Core/Chart/Chart.js"], m["Core/Utilities.js"]], function (m, n) {
        var v = n.addEvent,
            B = n.fireEvent,
            F = n.isArray,
            J = n.isNumber,
            K = n.objectEach,
            D = n.pick;
        v(m, "render", function () {
            var n = [];
            (this.labelCollectors || []).forEach(function (q) {
                n = n.concat(q());
            });
            (this.yAxis || []).forEach(function (q) {
                q.stacking &&
                    q.options.stackLabels &&
                    !q.options.stackLabels.allowOverlap &&
                    K(q.stacking.stacks, function (t) {
                        K(t, function (t) {
                            n.push(t.label);
                        });
                    });
            });
            (this.series || []).forEach(function (q) {
                var t = q.options.dataLabels;
                q.visible &&
                    (!1 !== t.enabled || q._hasPointLabels) &&
                    (q.nodes || q.points).forEach(function (t) {
                        t.visible &&
                            (F(t.dataLabels) ? t.dataLabels : t.dataLabel ? [t.dataLabel] : []).forEach(function (q) {
                                var l = q.options;
                                q.labelrank = D(l.labelrank, t.labelrank, t.shapeArgs && t.shapeArgs.height);
                                l.allowOverlap || n.push(q);
                            });
                    });
            });
            this.hideOverlappingLabels(n);
        });
        m.prototype.hideOverlappingLabels = function (n) {
            var q = this,
                t = n.length,
                m = q.renderer,
                x,
                l,
                h,
                g = !1;
            var v = function (b) {
                var d,
                    c = b.box ? 0 : b.padding || 0,
                    a = (d = 0),
                    e;
                if (b && (!b.alignAttr || b.placed)) {
                    var g = b.alignAttr || { x: b.attr("x"), y: b.attr("y") };
                    var h = b.parentGroup;
                    b.width || ((d = b.getBBox()), (b.width = d.width), (b.height = d.height), (d = m.fontMetrics(null, b.element).h));
                    var p = b.width - 2 * c;
                    (e = { left: "0", center: "0.5", right: "1" }[b.alignValue]) ? (a = +e * p) : J(b.x) && Math.round(b.x) !== b.translateX && (a = b.x - b.translateX);
                    return { x: g.x + (h.translateX || 0) + c - (a || 0), y: g.y + (h.translateY || 0) + c - d, width: b.width - 2 * c, height: b.height - 2 * c };
                }
            };
            for (l = 0; l < t; l++) if ((x = n[l])) (x.oldOpacity = x.opacity), (x.newOpacity = 1), (x.absoluteBox = v(x));
            n.sort(function (b, d) {
                return (d.labelrank || 0) - (b.labelrank || 0);
            });
            for (l = 0; l < t; l++) {
                var p = (v = n[l]) && v.absoluteBox;
                for (x = l + 1; x < t; ++x) {
                    var e = (h = n[x]) && h.absoluteBox;
                    !p || !e || v === h || 0 === v.newOpacity || 0 === h.newOpacity || e.x >= p.x + p.width || e.x + e.width <= p.x || e.y >= p.y + p.height || e.y + e.height <= p.y || ((v.labelrank < h.labelrank ? v : h).newOpacity = 0);
                }
            }
            n.forEach(function (b) {
                if (b) {
                    var d = b.newOpacity;
                    b.oldOpacity !== d &&
                        (b.alignAttr && b.placed
                            ? (b[d ? "removeClass" : "addClass"]("RBG_charts-data-label-hidden"),
                              (g = !0),
                              (b.alignAttr.opacity = d),
                              b[b.isOld ? "animate" : "attr"](b.alignAttr, null, function () {
                                  q.styledMode || b.css({ pointerEvents: d ? "auto" : "none" });
                                  b.visibility = d ? "inherit" : "hidden";
                              }),
                              B(q, "afterHideOverlappingLabel"))
                            : b.attr({ opacity: d }));
                    b.isOld = !0;
                }
            });
            g && B(q, "afterHideAllOverlappingLabels");
        };
    });
    O(
        m,
        "Core/Interaction.js",
        [m["Core/Series/Series.js"], m["Core/Chart/Chart.js"], m["Core/Globals.js"], m["Core/Legend.js"], m["Series/LineSeries.js"], m["Core/Options.js"], m["Core/Series/Point.js"], m["Core/Utilities.js"]],
        function (m, n, M, B, F, J, K, D) {
            m = m.seriesTypes;
            var x = M.hasTouch,
                q = M.svg,
                t = J.defaultOptions,
                w = D.addEvent,
                v = D.createElement,
                l = D.css,
                h = D.defined,
                g = D.extend,
                H = D.fireEvent,
                p = D.isArray,
                e = D.isFunction,
                b = D.isNumber,
                d = D.isObject,
                c = D.merge,
                a = D.objectEach,
                k = D.pick;
            ("");
            M = M.TrackerMixin = {
                drawTrackerPoint: function () {
                    var a = this,
                        b = a.chart,
                        c = b.pointer,
                        d = function (a) {
                            var b = c.getPointFromEvent(a);
                            "undefined" !== typeof b && ((c.isDirectTouch = !0), b.onMouseOver(a));
                        },
                        e;
                    a.points.forEach(function (a) {
                        e = p(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : [];
                        a.graphic && (a.graphic.element.point = a);
                        e.forEach(function (b) {
                            b.div ? (b.div.point = a) : (b.element.point = a);
                        });
                    });
                    a._hasTracking ||
                        (a.trackerGroups.forEach(function (e) {
                            if (a[e]) {
                                a[e]
                                    .addClass("RBG_charts-tracker")
                                    .on("mouseover", d)
                                    .on("mouseout", function (a) {
                                        c.onTrackerMouseOut(a);
                                    });
                                if (x) a[e].on("touchstart", d);
                                !b.styledMode && a.options.cursor && a[e].css(l).css({ cursor: a.options.cursor });
                            }
                        }),
                        (a._hasTracking = !0));
                    H(this, "afterDrawTracker");
                },
                drawTrackerGraph: function () {
                    var a = this,
                        b = a.options,
                        c = b.trackByArea,
                        d = [].concat(c ? a.areaPath : a.graphPath),
                        e = a.chart,
                        k = e.pointer,
                        g = e.renderer,
                        h = e.options.tooltip.snap,
                        p = a.tracker,
                        l = function (b) {
                            if (e.hoverSeries !== a) a.onMouseOver();
                        },
                        f = "rgba(192,192,192," + (q ? 0.0001 : 0.002) + ")";
                    p
                        ? p.attr({ d: d })
                        : a.graph &&
                          ((a.tracker = g
                              .path(d)
                              .attr({ visibility: a.visible ? "visible" : "hidden", zIndex: 2 })
                              .addClass(c ? "RBG_charts-tracker-area" : "RBG_charts-tracker-line")
                              .add(a.group)),
                          e.styledMode || a.tracker.attr({ "stroke-linecap": "round", "stroke-linejoin": "round", stroke: f, fill: c ? f : "none", "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * h) }),
                          [a.tracker, a.markerGroup].forEach(function (a) {
                              a.addClass("RBG_charts-tracker")
                                  .on("mouseover", l)
                                  .on("mouseout", function (a) {
                                      k.onTrackerMouseOut(a);
                                  });
                              b.cursor && !e.styledMode && a.css({ cursor: b.cursor });
                              if (x) a.on("touchstart", l);
                          }));
                    H(this, "afterDrawTracker");
                },
            };
            m.column && (m.column.prototype.drawTracker = M.drawTrackerPoint);
            m.pie && (m.pie.prototype.drawTracker = M.drawTrackerPoint);
            m.scatter && (m.scatter.prototype.drawTracker = M.drawTrackerPoint);
            g(B.prototype, {
                setItemEvents: function (a, b, d) {
                    var e = this,
                        k = e.chart.renderer.boxWrapper,
                        g = a instanceof K,
                        u = "RBG_charts-legend-" + (g ? "point" : "series") + "-active",
                        h = e.chart.styledMode;
                    (d ? [b, a.legendSymbol] : [a.legendGroup]).forEach(function (d) {
                        if (d)
                            d.on("mouseover", function () {
                                a.visible &&
                                    e.allItems.forEach(function (b) {
                                        a !== b && b.setState("inactive", !g);
                                    });
                                a.setState("hover");
                                a.visible && k.addClass(u);
                                h || b.css(e.options.itemHoverStyle);
                            })
                                .on("mouseout", function () {
                                    e.chart.styledMode || b.css(c(a.visible ? e.itemStyle : e.itemHiddenStyle));
                                    e.allItems.forEach(function (b) {
                                        a !== b && b.setState("", !g);
                                    });
                                    k.removeClass(u);
                                    a.setState();
                                })
                                .on("click", function (b) {
                                    var c = function () {
                                        a.setVisible && a.setVisible();
                                        e.allItems.forEach(function (b) {
                                            a !== b && b.setState(a.visible ? "inactive" : "", !g);
                                        });
                                    };
                                    k.removeClass(u);
                                    b = { browserEvent: b };
                                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : H(a, "legendItemClick", b, c);
                                });
                    });
                },
                createCheckboxForItem: function (a) {
                    a.checkbox = v("input", { type: "checkbox", className: "RBG_charts-legend-checkbox", checked: a.selected, defaultChecked: a.selected }, this.options.itemCheckboxStyle, this.chart.container);
                    w(a.checkbox, "click", function (b) {
                        H(a.series || a, "checkboxClick", { checked: b.target.checked, item: a }, function () {
                            a.select();
                        });
                    });
                },
            });
            g(n.prototype, {
                showResetZoom: function () {
                    function a() {
                        b.zoomOut();
                    }
                    var b = this,
                        c = t.lang,
                        d = b.options.chart.resetZoomButton,
                        e = d.theme,
                        k = e.states,
                        g = "chart" === d.relativeTo || "spaceBox" === d.relativeTo ? null : "plotBox";
                    H(this, "beforeShowResetZoom", null, function () {
                        b.resetZoomButton = b.renderer
                            .button(c.resetZoom, null, null, a, e, k && k.hover)
                            .attr({ align: d.position.align, title: c.resetZoomTitle })
                            .addClass("RBG_charts-reset-zoom")
                            .add()
                            .align(d.position, !1, g);
                    });
                    H(this, "afterShowResetZoom");
                },
                zoomOut: function () {
                    H(this, "selection", { resetSelection: !0 }, this.zoom);
                },
                zoom: function (a) {
                    var b = this,
                        c,
                        e = b.pointer,
                        g = !1,
                        u = b.inverted ? e.mouseDownX : e.mouseDownY;
                    !a || a.resetSelection
                        ? (b.axes.forEach(function (a) {
                              c = a.zoom();
                          }),
                          (e.initiated = !1))
                        : a.xAxis.concat(a.yAxis).forEach(function (a) {
                              var d = a.axis,
                                  k = b.inverted ? d.left : d.top,
                                  f = b.inverted ? k + d.width : k + d.height,
                                  r = d.isXAxis,
                                  p = !1;
                              if ((!r && u >= k && u <= f) || r || !h(u)) p = !0;
                              e[r ? "zoomX" : "zoomY"] && p && ((c = d.zoom(a.min, a.max)), d.displayBtn && (g = !0));
                          });
                    var p = b.resetZoomButton;
                    g && !p ? b.showResetZoom() : !g && d(p) && (b.resetZoomButton = p.destroy());
                    c && b.redraw(k(b.options.chart.animation, a && a.animation, 100 > b.pointCount));
                },
                pan: function (a, c) {
                    var d = this,
                        e = d.hoverPoints,
                        g = d.options.chart,
                        u = d.options.mapNavigation && d.options.mapNavigation.enabled,
                        h;
                    c = "object" === typeof c ? c : { enabled: c, type: "x" };
                    g && g.panning && (g.panning = c);
                    var p = c.type;
                    H(this, "pan", { originalEvent: a }, function () {
                        e &&
                            e.forEach(function (a) {
                                a.setState();
                            });
                        var c = [1];
                        "xy" === p ? (c = [1, 0]) : "y" === p && (c = [0]);
                        c.forEach(function (c) {
                            var f = d[c ? "xAxis" : "yAxis"][0],
                                e = f.horiz,
                                g = a[e ? "chartX" : "chartY"];
                            e = e ? "mouseDownX" : "mouseDownY";
                            var l = d[e],
                                t = (f.pointRange || 0) / 2,
                                z = (f.reversed && !d.inverted) || (!f.reversed && d.inverted) ? -1 : 1,
                                q = f.getExtremes(),
                                n = f.toValue(l - g, !0) + t * z;
                            z = f.toValue(l + f.len - g, !0) - t * z;
                            var m = z < n;
                            l = m ? z : n;
                            n = m ? n : z;
                            var y = f.hasVerticalPanning(),
                                E = f.panningState;
                            f.series.forEach(function (a) {
                                if (y && !c && (!E || E.isDirty)) {
                                    var d = a.getProcessedData(!0);
                                    a = a.getExtremes(d.yData, !0);
                                    E || (E = { startMin: Number.MAX_VALUE, startMax: -Number.MAX_VALUE });
                                    b(a.dataMin) && b(a.dataMax) && ((E.startMin = Math.min(a.dataMin, E.startMin)), (E.startMax = Math.max(a.dataMax, E.startMax)));
                                }
                            });
                            z = Math.min(k(null === E || void 0 === E ? void 0 : E.startMin, q.dataMin), t ? q.min : f.toValue(f.toPixels(q.min) - f.minPixelPadding));
                            t = Math.max(k(null === E || void 0 === E ? void 0 : E.startMax, q.dataMax), t ? q.max : f.toValue(f.toPixels(q.max) + f.minPixelPadding));
                            f.panningState = E;
                            f.isOrdinal ||
                                ((m = z - l),
                                0 < m && ((n += m), (l = z)),
                                (m = n - t),
                                0 < m && ((n = t), (l -= m)),
                                f.series.length &&
                                    l !== q.min &&
                                    n !== q.max &&
                                    l >= z &&
                                    n <= t &&
                                    (f.setExtremes(l, n, !1, !1, { trigger: "pan" }), d.resetZoomButton || u || l === z || n === t || !p.match("y") || (d.showResetZoom(), (f.displayBtn = !1)), (h = !0)),
                                (d[e] = g));
                        });
                        h && d.redraw(!1);
                        l(d.container, { cursor: "move" });
                    });
                },
            });
            g(K.prototype, {
                select: function (a, b) {
                    var c = this,
                        d = c.series,
                        e = d.chart;
                    this.selectedStaging = a = k(a, !c.selected);
                    c.firePointEvent(a ? "select" : "unselect", { accumulate: b }, function () {
                        c.selected = c.options.selected = a;
                        d.options.data[d.data.indexOf(c)] = c.options;
                        c.setState(a && "select");
                        b ||
                            e.getSelectedPoints().forEach(function (a) {
                                var b = a.series;
                                a.selected &&
                                    a !== c &&
                                    ((a.selected = a.options.selected = !1), (b.options.data[b.data.indexOf(a)] = a.options), a.setState(e.hoverPoints && b.options.inactiveOtherPoints ? "inactive" : ""), a.firePointEvent("unselect"));
                            });
                    });
                    delete this.selectedStaging;
                },
                onMouseOver: function (a) {
                    var b = this.series.chart,
                        c = b.pointer;
                    a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                    c.runPointActions(a, this);
                },
                onMouseOut: function () {
                    var a = this.series.chart;
                    this.firePointEvent("mouseOut");
                    this.series.options.inactiveOtherPoints ||
                        (a.hoverPoints || []).forEach(function (a) {
                            a.setState();
                        });
                    a.hoverPoints = a.hoverPoint = null;
                },
                importEvents: function () {
                    if (!this.hasImportedEvents) {
                        var b = this,
                            d = c(b.series.options.point, b.options).events;
                        b.events = d;
                        a(d, function (a, c) {
                            e(a) && w(b, c, a);
                        });
                        this.hasImportedEvents = !0;
                    }
                },
                setState: function (a, b) {
                    var c = this.series,
                        d = this.state,
                        e = c.options.states[a || "normal"] || {},
                        h = t.plotOptions[c.type].marker && c.options.marker,
                        p = h && !1 === h.enabled,
                        u = (h && h.states && h.states[a || "normal"]) || {},
                        l = !1 === u.enabled,
                        q = c.stateMarkerGraphic,
                        f = this.marker || {},
                        r = c.chart,
                        n = c.halo,
                        m,
                        w = h && c.markerAttribs;
                    a = a || "";
                    if (!((a === this.state && !b) || (this.selected && "select" !== a) || !1 === e.enabled || (a && (l || (p && !1 === u.enabled))) || (a && f.states && f.states[a] && !1 === f.states[a].enabled))) {
                        this.state = a;
                        w && (m = c.markerAttribs(this, a));
                        if (this.graphic) {
                            d && this.graphic.removeClass("RBG_charts-point-" + d);
                            a && this.graphic.addClass("RBG_charts-point-" + a);
                            if (!r.styledMode) {
                                var x = c.pointAttribs(this, a);
                                var v = k(r.options.chart.animation, e.animation);
                                c.options.inactiveOtherPoints &&
                                    x.opacity &&
                                    ((this.dataLabels || []).forEach(function (a) {
                                        a && a.animate({ opacity: x.opacity }, v);
                                    }),
                                    this.connector && this.connector.animate({ opacity: x.opacity }, v));
                                this.graphic.animate(x, v);
                            }
                            m && this.graphic.animate(m, k(r.options.chart.animation, u.animation, h.animation));
                            q && q.hide();
                        } else {
                            if (a && u) {
                                d = f.symbol || c.symbol;
                                q && q.currentSymbol !== d && (q = q.destroy());
                                if (m)
                                    if (q) q[b ? "animate" : "attr"]({ x: m.x, y: m.y });
                                    else d && ((c.stateMarkerGraphic = q = r.renderer.symbol(d, m.x, m.y, m.width, m.height).add(c.markerGroup)), (q.currentSymbol = d));
                                !r.styledMode && q && q.attr(c.pointAttribs(this, a));
                            }
                            q && (q[a && this.isInside ? "show" : "hide"](), (q.element.point = this));
                        }
                        a = e.halo;
                        e = ((q = this.graphic || q) && q.visibility) || "inherit";
                        a && a.size && q && "hidden" !== e && !this.isCluster
                            ? (n || (c.halo = n = r.renderer.path().add(q.parentGroup)),
                              n.show()[b ? "animate" : "attr"]({ d: this.haloPath(a.size) }),
                              n.attr({ class: "RBG_charts-halo RBG_charts-color-" + k(this.colorIndex, c.colorIndex) + (this.className ? " " + this.className : ""), visibility: e, zIndex: -1 }),
                              (n.point = this),
                              r.styledMode || n.attr(g({ fill: this.color || c.color, "fill-opacity": a.opacity }, a.attributes)))
                            : n && n.point && n.point.haloPath && n.animate({ d: n.point.haloPath(0) }, null, n.hide);
                        H(this, "afterSetState");
                    }
                },
                haloPath: function (a) {
                    return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a);
                },
            });
            g(F.prototype, {
                onMouseOver: function () {
                    var a = this.chart,
                        b = a.hoverSeries;
                    a.pointer.setHoverChartIndex();
                    if (b && b !== this) b.onMouseOut();
                    this.options.events.mouseOver && H(this, "mouseOver");
                    this.setState("hover");
                    a.hoverSeries = this;
                },
                onMouseOut: function () {
                    var a = this.options,
                        b = this.chart,
                        c = b.tooltip,
                        d = b.hoverPoint;
                    b.hoverSeries = null;
                    if (d) d.onMouseOut();
                    this && a.events.mouseOut && H(this, "mouseOut");
                    !c || this.stickyTracking || (c.shared && !this.noSharedTooltip) || c.hide();
                    b.series.forEach(function (a) {
                        a.setState("", !0);
                    });
                },
                setState: function (a, b) {
                    var c = this,
                        d = c.options,
                        e = c.graph,
                        g = d.inactiveOtherPoints,
                        h = d.states,
                        p = d.lineWidth,
                        l = d.opacity,
                        u = k(h[a || "normal"] && h[a || "normal"].animation, c.chart.options.chart.animation);
                    d = 0;
                    a = a || "";
                    if (
                        c.state !== a &&
                        ([c.group, c.markerGroup, c.dataLabelsGroup].forEach(function (b) {
                            b && (c.state && b.removeClass("RBG_charts-series-" + c.state), a && b.addClass("RBG_charts-series-" + a));
                        }),
                        (c.state = a),
                        !c.chart.styledMode)
                    ) {
                        if (h[a] && !1 === h[a].enabled) return;
                        a && ((p = h[a].lineWidth || p + (h[a].lineWidthPlus || 0)), (l = k(h[a].opacity, l)));
                        if (e && !e.dashstyle) for (h = { "stroke-width": p }, e.animate(h, u); c["zone-graph-" + d]; ) c["zone-graph-" + d].attr(h), (d += 1);
                        g ||
                            [c.group, c.markerGroup, c.dataLabelsGroup, c.labelBySeries].forEach(function (a) {
                                a && a.animate({ opacity: l }, u);
                            });
                    }
                    b && g && c.points && c.setAllPointsToState(a);
                },
                setAllPointsToState: function (a) {
                    this.points.forEach(function (b) {
                        b.setState && b.setState(a);
                    });
                },
                setVisible: function (a, b) {
                    var c = this,
                        d = c.chart,
                        e = c.legendItem,
                        k = d.options.chart.ignoreHiddenSeries,
                        g = c.visible;
                    var h = (c.visible = a = c.options.visible = c.userOptions.visible = "undefined" === typeof a ? !g : a) ? "show" : "hide";
                    ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (a) {
                        if (c[a]) c[a][h]();
                    });
                    if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                    e && d.legend.colorizeItem(c, a);
                    c.isDirty = !0;
                    c.options.stacking &&
                        d.series.forEach(function (a) {
                            a.options.stacking && a.visible && (a.isDirty = !0);
                        });
                    c.linkedSeries.forEach(function (b) {
                        b.setVisible(a, !1);
                    });
                    k && (d.isDirtyBox = !0);
                    H(c, h);
                    !1 !== b && d.redraw();
                },
                show: function () {
                    this.setVisible(!0);
                },
                hide: function () {
                    this.setVisible(!1);
                },
                select: function (a) {
                    this.selected = a = this.options.selected = "undefined" === typeof a ? !this.selected : a;
                    this.checkbox && (this.checkbox.checked = a);
                    H(this, a ? "select" : "unselect");
                },
                drawTracker: M.drawTrackerGraph,
            });
        }
    );
    O(m, "Core/Responsive.js", [m["Core/Chart/Chart.js"], m["Core/Utilities.js"]], function (m, n) {
        var v = n.find,
            B = n.isArray,
            F = n.isObject,
            J = n.merge,
            K = n.objectEach,
            D = n.pick,
            x = n.splat,
            q = n.uniqueKey;
        m.prototype.setResponsive = function (t, n) {
            var m = this.options.responsive,
                l = [],
                h = this.currentResponsive;
            !n &&
                m &&
                m.rules &&
                m.rules.forEach(function (g) {
                    "undefined" === typeof g._id && (g._id = q());
                    this.matchResponsiveRule(g, l);
                }, this);
            n = J.apply(
                0,
                l.map(function (g) {
                    return v(m.rules, function (h) {
                        return h._id === g;
                    }).chartOptions;
                })
            );
            n.isResponsiveOptions = !0;
            l = l.toString() || void 0;
            l !== (h && h.ruleIds) &&
                (h && this.update(h.undoOptions, t, !0),
                l ? ((h = this.currentOptions(n)), (h.isResponsiveOptions = !0), (this.currentResponsive = { ruleIds: l, mergedOptions: n, undoOptions: h }), this.update(n, t, !0)) : (this.currentResponsive = void 0));
        };
        m.prototype.matchResponsiveRule = function (t, q) {
            var n = t.condition;
            (
                n.callback ||
                function () {
                    return this.chartWidth <= D(n.maxWidth, Number.MAX_VALUE) && this.chartHeight <= D(n.maxHeight, Number.MAX_VALUE) && this.chartWidth >= D(n.minWidth, 0) && this.chartHeight >= D(n.minHeight, 0);
                }
            ).call(this) && q.push(t._id);
        };
        m.prototype.currentOptions = function (t) {
            function q(h, g, l, p) {
                var e;
                K(h, function (b, d) {
                    if (!p && -1 < n.collectionsWithUpdate.indexOf(d))
                        for (b = x(b), l[d] = [], e = 0; e < Math.max(b.length, g[d].length); e++) g[d][e] && (void 0 === b[e] ? (l[d][e] = g[d][e]) : ((l[d][e] = {}), q(b[e], g[d][e], l[d][e], p + 1)));
                    else F(b) ? ((l[d] = B(b) ? [] : {}), q(b, g[d] || {}, l[d], p + 1)) : (l[d] = "undefined" === typeof g[d] ? null : g[d]);
                });
            }
            var n = this,
                l = {};
            q(t, this.options, l, 0);
            return l;
        };
    });
    O(m, "masters/RBG_charts.src.js", [m["Core/Globals.js"]], function (m) {
        return m;
    });
    O(m, "Gantt/Tree.js", [m["Core/Utilities.js"]], function (m) {
        var n = m.extend,
            v = m.isNumber,
            B = m.pick,
            F = function (n, m) {
                var x = n.reduce(function (q, t) {
                    var n = B(t.parent, "");
                    "undefined" === typeof q[n] && (q[n] = []);
                    q[n].push(t);
                    return q;
                }, {});
                Object.keys(x).forEach(function (q, t) {
                    var n = x[q];
                    "" !== q &&
                        -1 === m.indexOf(q) &&
                        (n.forEach(function (q) {
                            t[""].push(q);
                        }),
                        delete t[q]);
                });
                return x;
            },
            J = function (m, D, x, q, t, w) {
                var G = 0,
                    l = 0,
                    h = w && w.after,
                    g = w && w.before;
                D = { data: q, depth: x - 1, id: m, level: x, parent: D };
                var H, p;
                "function" === typeof g && g(D, w);
                g = (t[m] || []).map(function (e) {
                    var b = J(e.id, m, x + 1, e, t, w),
                        d = e.start;
                    e = !0 === e.milestone ? d : e.end;
                    H = !v(H) || d < H ? d : H;
                    p = !v(p) || e > p ? e : p;
                    G = G + 1 + b.descendants;
                    l = Math.max(b.height + 1, l);
                    return b;
                });
                q && ((q.start = B(q.start, H)), (q.end = B(q.end, p)));
                n(D, { children: g, descendants: G, height: l });
                "function" === typeof h && h(D, w);
                return D;
            };
        return {
            getListOfParents: F,
            getNode: J,
            getTree: function (n, m) {
                var x = n.map(function (q) {
                    return q.id;
                });
                n = F(n, x);
                return J("", null, 1, null, n, m);
            },
        };
    });
    O(m, "Core/Axis/TreeGridTick.js", [m["Core/Utilities.js"]], function (m) {
        var n = m.addEvent,
            v = m.defined,
            B = m.isObject,
            F = m.isNumber,
            J = m.pick,
            K = m.wrap,
            D;
        (function (m) {
            function q() {
                this.treeGrid || (this.treeGrid = new h(this));
            }
            function t(g, h) {
                g = g.treeGrid;
                var p = !g.labelIcon,
                    e = h.renderer,
                    b = h.xy,
                    d = h.options,
                    c = d.width,
                    a = d.height,
                    k = b.x - c / 2 - d.padding;
                b = b.y - a / 2;
                var l = h.collapsed ? 90 : 180,
                    q = h.show && F(b),
                    t = g.labelIcon;
                t || (g.labelIcon = t = e.path(e.symbols[d.type](d.x, d.y, c, a)).addClass("RBG_charts-label-icon").add(h.group));
                q || t.attr({ y: -9999 });
                e.styledMode || t.attr({ "stroke-width": 1, fill: J(h.color, "#666666") }).css({ cursor: "pointer", stroke: d.lineColor, strokeWidth: d.lineWidth });
                t[p ? "attr" : "animate"]({ translateX: k, translateY: b, rotation: l });
            }
            function w(g, h, p, e, b, d, c, a, k) {
                var l = J(this.options && this.options.labels, d);
                d = this.pos;
                var t = this.axis,
                    q = "treegrid" === t.options.type;
                g = g.apply(this, [h, p, e, b, l, c, a, k]);
                q && ((h = l && B(l.symbol, !0) ? l.symbol : {}), (l = l && F(l.indentation) ? l.indentation : 0), (d = ((d = (t = t.treeGrid.mapOfPosToGridNode) && t[d]) && d.depth) || 1), (g.x += h.width + 2 * h.padding + (d - 1) * l));
                return g;
            }
            function x(g) {
                var h = this,
                    p = h.pos,
                    e = h.axis,
                    b = h.label,
                    d = e.treeGrid.mapOfPosToGridNode,
                    c = e.options,
                    a = J(h.options && h.options.labels, c && c.labels),
                    k = a && B(a.symbol, !0) ? a.symbol : {},
                    l = (d = d && d[p]) && d.depth;
                c = "treegrid" === c.type;
                var q = -1 < e.tickPositions.indexOf(p);
                p = e.chart.styledMode;
                c && d && b && b.element && b.addClass("RBG_charts-treegrid-node-level-" + l);
                g.apply(h, Array.prototype.slice.call(arguments, 1));
                c &&
                    b &&
                    b.element &&
                    d &&
                    d.descendants &&
                    0 < d.descendants &&
                    ((e = e.treeGrid.isCollapsed(d)),
                    t(h, { color: (!p && b.styles && b.styles.color) || "", collapsed: e, group: b.parentGroup, options: k, renderer: b.renderer, show: q, xy: b.xy }),
                    (k = "RBG_charts-treegrid-node-" + (e ? "expanded" : "collapsed")),
                    b.addClass("RBG_charts-treegrid-node-" + (e ? "collapsed" : "expanded")).removeClass(k),
                    p || b.css({ cursor: "pointer" }),
                    [b, h.treeGrid.labelIcon].forEach(function (c) {
                        c &&
                            !c.attachedTreeGridEvents &&
                            (n(c.element, "mouseover", function () {
                                b.addClass("RBG_charts-treegrid-node-active");
                                b.renderer.styledMode || b.css({ textDecoration: "underline" });
                            }),
                            n(c.element, "mouseout", function () {
                                var c = v(a.style) ? a.style : {};
                                b.removeClass("RBG_charts-treegrid-node-active");
                                b.renderer.styledMode || b.css({ textDecoration: c.textDecoration });
                            }),
                            n(c.element, "click", function () {
                                h.treeGrid.toggleCollapse();
                            }),
                            (c.attachedTreeGridEvents = !0));
                    }));
            }
            var l = !1;
            m.compose = function (g) {
                l ||
                    (n(g, "init", q),
                    K(g.prototype, "getLabelPosition", w),
                    K(g.prototype, "renderLabel", x),
                    (g.prototype.collapse = function (g) {
                        this.treeGrid.collapse(g);
                    }),
                    (g.prototype.expand = function (g) {
                        this.treeGrid.expand(g);
                    }),
                    (g.prototype.toggleCollapse = function (g) {
                        this.treeGrid.toggleCollapse(g);
                    }),
                    (l = !0));
            };
            var h = (function () {
                function g(g) {
                    this.tick = g;
                }
                g.prototype.collapse = function (g) {
                    var h = this.tick,
                        e = h.axis,
                        b = e.brokenAxis;
                    b && e.treeGrid.mapOfPosToGridNode && ((h = e.treeGrid.collapse(e.treeGrid.mapOfPosToGridNode[h.pos])), b.setBreaks(h, J(g, !0)));
                };
                g.prototype.expand = function (g) {
                    var h = this.tick,
                        e = h.axis,
                        b = e.brokenAxis;
                    b && e.treeGrid.mapOfPosToGridNode && ((h = e.treeGrid.expand(e.treeGrid.mapOfPosToGridNode[h.pos])), b.setBreaks(h, J(g, !0)));
                };
                g.prototype.toggleCollapse = function (g) {
                    var h = this.tick,
                        e = h.axis,
                        b = e.brokenAxis;
                    b && e.treeGrid.mapOfPosToGridNode && ((h = e.treeGrid.toggleCollapse(e.treeGrid.mapOfPosToGridNode[h.pos])), b.setBreaks(h, J(g, !0)));
                };
                return g;
            })();
            m.Additions = h;
        })(D || (D = {}));
        return D;
    });
    O(m, "Mixins/TreeSeries.js", [m["Core/Color/Color.js"], m["Core/Utilities.js"]], function (m, n) {
        var v = n.extend,
            B = n.isArray,
            F = n.isNumber,
            J = n.isObject,
            K = n.merge,
            D = n.pick;
        return {
            getColor: function (n, q) {
                var t = q.index,
                    w = q.mapOptionsToLevel,
                    x = q.parentColor,
                    l = q.parentColorIndex,
                    h = q.series,
                    g = q.colors,
                    v = q.siblings,
                    p = h.points,
                    e = h.chart.options.chart,
                    b;
                if (n) {
                    p = p[n.i];
                    n = w[n.level] || {};
                    if ((w = p && n.colorByPoint)) {
                        var d = p.index % (g ? g.length : e.colorCount);
                        var c = g && g[d];
                    }
                    if (!h.chart.styledMode) {
                        g = p && p.options.color;
                        e = n && n.color;
                        if ((b = x))
                            b =
                                (b = n && n.colorVariation) && "brightness" === b.key
                                    ? m
                                          .parse(x)
                                          .brighten((t / v) * b.to)
                                          .get()
                                    : x;
                        b = D(g, e, c, b, h.color);
                    }
                    var a = D(p && p.options.colorIndex, n && n.colorIndex, d, l, q.colorIndex);
                }
                return { color: b, colorIndex: a };
            },
            getLevelOptions: function (n) {
                var q = null;
                if (J(n)) {
                    q = {};
                    var t = F(n.from) ? n.from : 1;
                    var m = n.levels;
                    var x = {};
                    var l = J(n.defaults) ? n.defaults : {};
                    B(m) &&
                        (x = m.reduce(function (h, g) {
                            if (J(g) && F(g.level)) {
                                var q = K({}, g);
                                var p = "boolean" === typeof q.levelIsConstant ? q.levelIsConstant : l.levelIsConstant;
                                delete q.levelIsConstant;
                                delete q.level;
                                g = g.level + (p ? 0 : t - 1);
                                J(h[g]) ? v(h[g], q) : (h[g] = q);
                            }
                            return h;
                        }, {}));
                    m = F(n.to) ? n.to : 1;
                    for (n = 0; n <= m; n++) q[n] = K({}, l, J(x[n]) ? x[n] : {});
                }
                return q;
            },
            setTreeValues: function w(q, t) {
                var n = t.before,
                    l = t.idRoot,
                    h = t.mapIdToNode[l],
                    g = t.points[q.i],
                    m = (g && g.options) || {},
                    p = 0,
                    e = [];
                v(q, { levelDynamic: q.level - (("boolean" === typeof t.levelIsConstant ? t.levelIsConstant : 1) ? 0 : h.level), name: D(g && g.name, ""), visible: l === q.id || ("boolean" === typeof t.visible ? t.visible : !1) });
                "function" === typeof n && (q = n(q, t));
                q.children.forEach(function (b, d) {
                    var c = v({}, t);
                    v(c, { index: d, siblings: q.children.length, visible: q.visible });
                    b = w(b, c);
                    e.push(b);
                    b.visible && (p += b.val);
                });
                q.visible = 0 < p || q.visible;
                n = D(m.value, p);
                v(q, { children: e, childrenTotal: p, isLeaf: q.visible && !p, val: n });
                return q;
            },
            updateRootId: function (q) {
                if (J(q)) {
                    var t = J(q.options) ? q.options : {};
                    t = D(q.rootNode, t.rootId, "");
                    J(q.userOptions) && (q.userOptions.rootId = t);
                    q.rootNode = t;
                }
                return t;
            },
        };
    });
    O(m, "Core/Axis/GridAxis.js", [m["Core/Axis/Axis.js"], m["Core/Globals.js"], m["Core/Options.js"], m["Core/Axis/Tick.js"], m["Core/Utilities.js"]], function (m, n, M, B, F) {
        var v = F.addEvent,
            K = F.defined,
            D = F.erase,
            x = F.find,
            q = F.isArray,
            t = F.isNumber,
            w = F.merge,
            G = F.pick,
            l = F.timeUnits,
            h = F.wrap;
        M = n.Chart;
        var g = function (e) {
            var b = e.options;
            b.labels || (b.labels = {});
            b.labels.align = G(b.labels.align, "center");
            e.categories || (b.showLastLabel = !1);
            e.labelRotation = 0;
            b.labels.rotation = 0;
        };
        ("");
        m.prototype.getMaxLabelDimensions = function (e, b) {
            var d = { width: 0, height: 0 };
            b.forEach(function (b) {
                b = e[b];
                if (F.isObject(b, !0)) {
                    var a = F.isObject(b.label, !0) ? b.label : {};
                    b = a.getBBox ? a.getBBox().height : 0;
                    a.textStr && !t(a.textPxLength) && (a.textPxLength = a.getBBox().width);
                    var c = t(a.textPxLength) ? Math.round(a.textPxLength) : 0;
                    a.textStr && (c = Math.round(a.getBBox().width));
                    d.height = Math.max(b, d.height);
                    d.width = Math.max(c, d.width);
                }
            });
            return d;
        };
        n.dateFormats.W = function (e) {
            e = new this.Date(e);
            var b = (this.get("Day", e) + 6) % 7,
                d = new this.Date(e.valueOf());
            this.set("Date", d, this.get("Date", e) - b + 3);
            b = new this.Date(this.get("FullYear", d), 0, 1);
            4 !== this.get("Day", b) && (this.set("Month", e, 0), this.set("Date", e, 1 + ((11 - this.get("Day", b)) % 7)));
            return (1 + Math.floor((d.valueOf() - b.valueOf()) / 6048e5)).toString();
        };
        n.dateFormats.E = function (e) {
            return this.dateFormat("%a", e, !0).charAt(0);
        };
        v(M, "afterSetChartSize", function () {
            this.axes.forEach(function (e) {
                ((e.grid && e.grid.columns) || []).forEach(function (b) {
                    b.setAxisSize();
                    b.setAxisTranslation();
                });
            });
        });
        v(B, "afterGetLabelPosition", function (e) {
            var b = this.label,
                d = this.axis,
                c = d.reversed,
                a = d.chart,
                k = d.options.grid || {},
                g = d.options.labels,
                h = g.align,
                l = p.Side[d.side],
                q = e.tickmarkOffset,
                n = d.tickPositions,
                m = this.pos - q;
            n = t(n[e.index + 1]) ? n[e.index + 1] - q : d.max + q;
            var z = d.tickSize("tick");
            q = z ? z[0] : 0;
            z = z ? z[1] / 2 : 0;
            if (!0 === k.enabled) {
                if ("top" === l) {
                    k = d.top + d.offset;
                    var E = k - q;
                } else "bottom" === l ? ((E = a.chartHeight - d.bottom + d.offset), (k = E + q)) : ((k = d.top + d.len - d.translate(c ? n : m)), (E = d.top + d.len - d.translate(c ? m : n)));
                "right" === l
                    ? ((l = a.chartWidth - d.right + d.offset), (c = l + q))
                    : "left" === l
                    ? ((c = d.left + d.offset), (l = c - q))
                    : ((l = Math.round(d.left + d.translate(c ? n : m)) - z), (c = Math.round(d.left + d.translate(c ? m : n)) - z));
                this.slotWidth = c - l;
                e.pos.x = "left" === h ? l : "right" === h ? c : l + (c - l) / 2;
                e.pos.y = E + (k - E) / 2;
                a = a.renderer.fontMetrics(g.style.fontSize, b.element);
                b = b.getBBox().height;
                g.useHTML ? (e.pos.y += a.b + -(b / 2)) : ((b = Math.round(b / a.h)), (e.pos.y += (a.b - (a.h - a.f)) / 2 + -(((b - 1) * a.h) / 2)));
                e.pos.x += (d.horiz && g.x) || 0;
            }
        });
        var H = (function () {
                function e(b) {
                    this.axis = b;
                }
                e.prototype.isOuterAxis = function () {
                    var b = this.axis,
                        d = b.grid.columnIndex,
                        c = (b.linkedParent && b.linkedParent.grid.columns) || b.grid.columns,
                        a = d ? b.linkedParent : b,
                        e = -1,
                        g = 0;
                    b.chart[b.coll].forEach(function (c, d) {
                        c.side !== b.side || c.options.isInternal || ((g = d), c === a && (e = d));
                    });
                    return g === e && (t(d) ? c.length === d : !0);
                };
                e.prototype.renderBorder = function (b) {
                    var d = this.axis,
                        c = d.chart.renderer,
                        a = d.options;
                    b = c.path(b).addClass("RBG_charts-axis-line").add(d.axisBorder);
                    c.styledMode || b.attr({ stroke: a.lineColor, "stroke-width": a.lineWidth, zIndex: 7 });
                    return b;
                };
                return e;
            })(),
            p = (function () {
                function e() {}
                e.compose = function (b) {
                    m.keepProps.push("grid");
                    h(b.prototype, "unsquish", e.wrapUnsquish);
                    v(b, "init", e.onInit);
                    v(b, "afterGetOffset", e.onAfterGetOffset);
                    v(b, "afterGetTitlePosition", e.onAfterGetTitlePosition);
                    v(b, "afterInit", e.onAfterInit);
                    v(b, "afterRender", e.onAfterRender);
                    v(b, "afterSetAxisTranslation", e.onAfterSetAxisTranslation);
                    v(b, "afterSetOptions", e.onAfterSetOptions);
                    v(b, "afterSetOptions", e.onAfterSetOptions2);
                    v(b, "afterSetScale", e.onAfterSetScale);
                    v(b, "afterTickSize", e.onAfterTickSize);
                    v(b, "trimTicks", e.onTrimTicks);
                    v(b, "destroy", e.onDestroy);
                };
                e.onAfterGetOffset = function () {
                    var b = this.grid;
                    ((b && b.columns) || []).forEach(function (b) {
                        b.getOffset();
                    });
                };
                e.onAfterGetTitlePosition = function (b) {
                    if (!0 === (this.options.grid || {}).enabled) {
                        var d = this.axisTitle,
                            c = this.height,
                            a = this.horiz,
                            k = this.left,
                            g = this.offset,
                            h = this.opposite,
                            l = this.options.title,
                            p = void 0 === l ? {} : l;
                        l = this.top;
                        var q = this.width,
                            t = this.tickSize(),
                            n = d && d.getBBox().width,
                            m = p.x || 0,
                            C = p.y || 0,
                            w = G(p.margin, a ? 5 : 10);
                        d = this.chart.renderer.fontMetrics(p.style && p.style.fontSize, d).f;
                        t = (a ? l + c : k) + (a ? 1 : -1) * (h ? -1 : 1) * (t ? t[0] / 2 : 0) + (this.side === e.Side.bottom ? d : 0);
                        b.titlePosition.x = a ? k - n / 2 - w + m : t + (h ? q : 0) + g + m;
                        b.titlePosition.y = a ? t - (h ? c : 0) + (h ? d : -d) / 2 + g + C : l - w + C;
                    }
                };
                e.onAfterInit = function () {
                    var b = this.chart,
                        d = this.options.grid;
                    d = void 0 === d ? {} : d;
                    var c = this.userOptions;
                    d.enabled &&
                        (g(this),
                        h(this, "labelFormatter", function (a) {
                            var b = this.axis,
                                c = this.value,
                                d = b.tickPositions,
                                e = (b.isLinked ? b.linkedParent : b).series[0],
                                g = c === d[0];
                            d = c === d[d.length - 1];
                            var k =
                                e &&
                                x(e.options.data, function (a) {
                                    return a[b.isXAxis ? "x" : "y"] === c;
                                });
                            if (k && e.is("gantt")) {
                                var h = w(k);
                                n.seriesTypes.gantt.prototype.setGanttPointAliases(h);
                            }
                            this.isFirst = g;
                            this.isLast = d;
                            this.point = h;
                            return a.call(this);
                        }));
                    if (d.columns)
                        for (var a = (this.grid.columns = []), e = (this.grid.columnIndex = 0); ++e < d.columns.length; ) {
                            var l = w(c, d.columns[d.columns.length - e - 1], { linkedTo: 0, type: "category", scrollbar: { enabled: !1 } });
                            delete l.grid.columns;
                            l = new m(this.chart, l);
                            l.grid.isColumn = !0;
                            l.grid.columnIndex = e;
                            D(b.axes, l);
                            D(b[this.coll], l);
                            a.push(l);
                        }
                };
                e.onAfterRender = function () {
                    var b,
                        d = this.grid,
                        c = this.options;
                    if (!0 === (c.grid || {}).enabled) {
                        this.maxLabelDimensions = this.getMaxLabelDimensions(this.ticks, this.tickPositions);
                        this.rightWall && this.rightWall.destroy();
                        if (this.grid && this.grid.isOuterAxis() && this.axisLine && (c = c.lineWidth)) {
                            c = this.getLinePath(c);
                            var a = c[0],
                                g = c[1],
                                h = ((this.tickSize("tick") || [1])[0] - 1) * (this.side === e.Side.top || this.side === e.Side.left ? -1 : 1);
                            "M" === a[0] && "L" === g[0] && (this.horiz ? ((a[2] += h), (g[2] += h)) : ((a[1] += h), (g[1] += h)));
                            !this.horiz &&
                                this.chart.marginRight &&
                                ((a = [a, ["L", this.left, a[2]]]),
                                (h = ["L", this.chart.chartWidth - this.chart.marginRight, this.toPixels(this.max + this.tickmarkOffset)]),
                                (g = [["M", g[1], this.toPixels(this.max + this.tickmarkOffset)], h]),
                                this.grid.upperBorder || 0 === this.min % 1 || (this.grid.upperBorder = this.grid.renderBorder(a)),
                                this.grid.upperBorder && this.grid.upperBorder.animate({ d: a }),
                                this.grid.lowerBorder || 0 === this.max % 1 || (this.grid.lowerBorder = this.grid.renderBorder(g)),
                                this.grid.lowerBorder && this.grid.lowerBorder.animate({ d: g }));
                            this.grid.axisLineExtra ? this.grid.axisLineExtra.animate({ d: c }) : (this.grid.axisLineExtra = this.grid.renderBorder(c));
                            this.axisLine[this.showAxis ? "show" : "hide"](!0);
                        }
                        ((d && d.columns) || []).forEach(function (a) {
                            a.render();
                        });
                        !this.horiz &&
                            this.chart.hasRendered &&
                            (this.scrollbar || (null === (b = this.linkedParent) || void 0 === b ? 0 : b.scrollbar)) &&
                            ((b = this.max),
                            (d = this.tickmarkOffset),
                            (c = this.tickPositions[this.tickPositions.length - 1]),
                            (g = this.tickPositions[0]),
                            this.min - g > d ? this.ticks[g].label.hide() : this.ticks[g].label.show(),
                            c - b > d ? this.ticks[c].label.hide() : this.ticks[c].label.show(),
                            c - b < d && 0 < c - b && this.ticks[c].isLast ? this.ticks[c].mark.hide() : this.ticks[c - 1].mark.show());
                    }
                };
                e.onAfterSetAxisTranslation = function () {
                    var b,
                        d = this.tickPositions && this.tickPositions.info,
                        c = this.options,
                        a = c.grid || {},
                        e = this.userOptions.labels || {};
                    this.horiz
                        ? (!0 === a.enabled &&
                              this.series.forEach(function (a) {
                                  a.options.pointRange = 0;
                              }),
                          d && c.dateTimeLabelFormats && c.labels && !K(e.align) && (!1 === c.dateTimeLabelFormats[d.unitName].range || 1 < d.count) && ((c.labels.align = "left"), K(e.x) || (c.labels.x = 3)))
                        : "treegrid" !== this.options.type && (null === (b = this.grid) || void 0 === b ? 0 : b.columns) && (this.minPointOffset = this.tickInterval);
                };
                e.onAfterSetOptions = function (b) {
                    var d = this.options;
                    b = b.userOptions;
                    var c = d && F.isObject(d.grid, !0) ? d.grid : {};
                    if (!0 === c.enabled) {
                        var a = w(
                            !0,
                            {
                                className: "RBG_charts-grid-axis " + (b.className || ""),
                                dateTimeLabelFormats: { hour: { list: ["%H:%M", "%H"] }, day: { list: ["%A, %e. %B", "%a, %e. %b", "%E"] }, week: { list: ["Week %W", "W%W"] }, month: { list: ["%B", "%b", "%o"] } },
                                grid: { borderWidth: 1 },
                                labels: { padding: 2, style: { fontSize: "13px" } },
                                margin: 0,
                                title: { text: null, reserveSpace: !1, rotation: 0 },
                                units: [
                                    ["millisecond", [1, 10, 100]],
                                    ["second", [1, 10]],
                                    ["minute", [1, 5, 15]],
                                    ["hour", [1, 6]],
                                    ["day", [1]],
                                    ["week", [1]],
                                    ["month", [1]],
                                    ["year", null],
                                ],
                            },
                            b
                        );
                        "xAxis" === this.coll &&
                            (K(b.linkedTo) && !K(b.tickPixelInterval) && (a.tickPixelInterval = 350),
                            K(b.tickPixelInterval) ||
                                !K(b.linkedTo) ||
                                K(b.tickPositioner) ||
                                K(b.tickInterval) ||
                                (a.tickPositioner = function (b, c) {
                                    var d = this.linkedParent && this.linkedParent.tickPositions && this.linkedParent.tickPositions.info;
                                    if (d) {
                                        var e,
                                            g = a.units;
                                        for (e = 0; e < g.length; e++)
                                            if (g[e][0] === d.unitName) {
                                                var k = e;
                                                break;
                                            }
                                        if (g[k + 1]) {
                                            var h = g[k + 1][0];
                                            var p = (g[k + 1][1] || [1])[0];
                                        } else "year" === d.unitName && ((h = "year"), (p = 10 * d.count));
                                        d = l[h];
                                        this.tickInterval = d * p;
                                        return this.getTimeTicks({ unitRange: d, count: p, unitName: h }, b, c, this.options.startOfWeek);
                                    }
                                }));
                        w(!0, this.options, a);
                        this.horiz && ((d.minPadding = G(b.minPadding, 0)), (d.maxPadding = G(b.maxPadding, 0)));
                        t(d.grid.borderWidth) && (d.tickWidth = d.lineWidth = c.borderWidth);
                    }
                };
                e.onAfterSetOptions2 = function (b) {
                    b = ((b = b.userOptions) && b.grid) || {};
                    var d = b.columns;
                    b.enabled && d && w(!0, this.options, d[d.length - 1]);
                };
                e.onAfterSetScale = function () {
                    (this.grid.columns || []).forEach(function (b) {
                        b.setScale();
                    });
                };
                e.onAfterTickSize = function (b) {
                    var d = m.defaultLeftAxisOptions,
                        c = this.horiz,
                        a = this.maxLabelDimensions,
                        e = this.options.grid;
                    e = void 0 === e ? {} : e;
                    e.enabled && a && ((d = 2 * Math.abs(d.labels.x)), (c = c ? e.cellHeight || d + a.height : d + a.width), q(b.tickSize) ? (b.tickSize[0] = c) : (b.tickSize = [c, 0]));
                };
                e.onDestroy = function (b) {
                    var d = this.grid;
                    (d.columns || []).forEach(function (c) {
                        c.destroy(b.keepEvents);
                    });
                    d.columns = void 0;
                };
                e.onInit = function (b) {
                    b = b.userOptions || {};
                    var d = b.grid || {};
                    d.enabled && K(d.borderColor) && (b.tickColor = b.lineColor = d.borderColor);
                    this.grid || (this.grid = new H(this));
                };
                e.onTrimTicks = function () {
                    var b = this.options,
                        d = this.categories,
                        c = this.tickPositions,
                        a = c[0],
                        e = c[c.length - 1],
                        g = (this.linkedParent && this.linkedParent.min) || this.min,
                        h = (this.linkedParent && this.linkedParent.max) || this.max,
                        l = this.tickInterval;
                    !0 !== (b.grid || {}).enabled || d || (!this.horiz && !this.isLinked) || (a < g && a + l > g && !b.startOnTick && (c[0] = g), e > h && e - l < h && !b.endOnTick && (c[c.length - 1] = h));
                };
                e.wrapUnsquish = function (b) {
                    var d = this.options.grid;
                    return !0 === (void 0 === d ? {} : d).enabled && this.categories ? this.tickInterval : b.apply(this, Array.prototype.slice.call(arguments, 1));
                };
                return e;
            })();
        (function (e) {
            e = e.Side || (e.Side = {});
            e[(e.top = 0)] = "top";
            e[(e.right = 1)] = "right";
            e[(e.bottom = 2)] = "bottom";
            e[(e.left = 3)] = "left";
        })(p || (p = {}));
        p.compose(m);
        return p;
    });
    O(m, "Core/Axis/BrokenAxis.js", [m["Core/Axis/Axis.js"], m["Series/LineSeries.js"], m["Extensions/Stacking.js"], m["Core/Utilities.js"]], function (m, n, M, B) {
        var v = B.addEvent,
            J = B.find,
            K = B.fireEvent,
            D = B.isArray,
            x = B.isNumber,
            q = B.pick,
            t = (function () {
                function t(t) {
                    this.hasBreaks = !1;
                    this.axis = t;
                }
                t.isInBreak = function (t, l) {
                    var h = t.repeat || Infinity,
                        g = t.from,
                        q = t.to - t.from;
                    l = l >= g ? (l - g) % h : h - ((g - l) % h);
                    return t.inclusive ? l <= q : l < q && 0 !== l;
                };
                t.lin2Val = function (q) {
                    var l = this.brokenAxis;
                    l = l && l.breakArray;
                    if (!l) return q;
                    var h;
                    for (h = 0; h < l.length; h++) {
                        var g = l[h];
                        if (g.from >= q) break;
                        else g.to < q ? (q += g.len) : t.isInBreak(g, q) && (q += g.len);
                    }
                    return q;
                };
                t.val2Lin = function (q) {
                    var l = this.brokenAxis;
                    l = l && l.breakArray;
                    if (!l) return q;
                    var h = q,
                        g;
                    for (g = 0; g < l.length; g++) {
                        var n = l[g];
                        if (n.to <= q) h -= n.len;
                        else if (n.from >= q) break;
                        else if (t.isInBreak(n, q)) {
                            h -= q - n.from;
                            break;
                        }
                    }
                    return h;
                };
                t.prototype.findBreakAt = function (q, l) {
                    return J(l, function (h) {
                        return h.from < q && q < h.to;
                    });
                };
                t.prototype.isInAnyBreak = function (n, l) {
                    var h = this.axis,
                        g = h.options.breaks,
                        m = g && g.length,
                        p;
                    if (m) {
                        for (; m--; )
                            if (t.isInBreak(g[m], n)) {
                                var e = !0;
                                p || (p = q(g[m].showPoints, !h.isXAxis));
                            }
                        var b = e && l ? e && !p : e;
                    }
                    return b;
                };
                t.prototype.setBreaks = function (n, l) {
                    var h = this,
                        g = h.axis,
                        w = D(n) && !!n.length;
                    g.isDirty = h.hasBreaks !== w;
                    h.hasBreaks = w;
                    g.options.breaks = g.userOptions.breaks = n;
                    g.forceRedraw = !0;
                    g.series.forEach(function (g) {
                        g.isDirty = !0;
                    });
                    w || g.val2lin !== t.val2Lin || (delete g.val2lin, delete g.lin2val);
                    w &&
                        ((g.userOptions.ordinal = !1),
                        (g.lin2val = t.lin2Val),
                        (g.val2lin = t.val2Lin),
                        (g.setExtremes = function (g, e, b, d, c) {
                            if (h.hasBreaks) {
                                for (var a, k = this.options.breaks; (a = h.findBreakAt(g, k)); ) g = a.to;
                                for (; (a = h.findBreakAt(e, k)); ) e = a.from;
                                e < g && (e = g);
                            }
                            m.prototype.setExtremes.call(this, g, e, b, d, c);
                        }),
                        (g.setAxisTranslation = function (l) {
                            m.prototype.setAxisTranslation.call(this, l);
                            h.unitLength = null;
                            if (h.hasBreaks) {
                                l = g.options.breaks || [];
                                var e = [],
                                    b = [],
                                    d = 0,
                                    c,
                                    a = g.userMin || g.min,
                                    k = g.userMax || g.max,
                                    p = q(g.pointRangePadding, 0),
                                    n;
                                l.forEach(function (b) {
                                    c = b.repeat || Infinity;
                                    t.isInBreak(b, a) && (a += (b.to % c) - (a % c));
                                    t.isInBreak(b, k) && (k -= (k % c) - (b.from % c));
                                });
                                l.forEach(function (b) {
                                    w = b.from;
                                    for (c = b.repeat || Infinity; w - c > a; ) w -= c;
                                    for (; w < a; ) w += c;
                                    for (n = w; n < k; n += c) e.push({ value: n, move: "in" }), e.push({ value: n + (b.to - b.from), move: "out", size: b.breakSize });
                                });
                                e.sort(function (a, b) {
                                    return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value;
                                });
                                var y = 0;
                                var w = a;
                                e.forEach(function (a) {
                                    y += "in" === a.move ? 1 : -1;
                                    1 === y && "in" === a.move && (w = a.value);
                                    0 === y && (b.push({ from: w, to: a.value, len: a.value - w - (a.size || 0) }), (d += a.value - w - (a.size || 0)));
                                });
                                g.breakArray = h.breakArray = b;
                                h.unitLength = k - a - d + p;
                                K(g, "afterBreaks");
                                g.staticScale ? (g.transA = g.staticScale) : h.unitLength && (g.transA *= (k - g.min + p) / h.unitLength);
                                p && (g.minPixelPadding = g.transA * g.minPointOffset);
                                g.min = a;
                                g.max = k;
                            }
                        }));
                    q(l, !0) && g.chart.redraw();
                };
                return t;
            })();
        B = (function () {
            function m() {}
            m.compose = function (m, l) {
                m.keepProps.push("brokenAxis");
                var h = n.prototype;
                h.drawBreaks = function (g, h) {
                    var l = this,
                        e = l.points,
                        b,
                        d,
                        c,
                        a;
                    if (g && g.brokenAxis && g.brokenAxis.hasBreaks) {
                        var k = g.brokenAxis;
                        h.forEach(function (h) {
                            b = (k && k.breakArray) || [];
                            d = g.isXAxis ? g.min : q(l.options.threshold, g.min);
                            e.forEach(function (e) {
                                a = q(e["stack" + h.toUpperCase()], e[h]);
                                b.forEach(function (b) {
                                    if (x(d) && x(a)) {
                                        c = !1;
                                        if ((d < b.from && a > b.to) || (d > b.from && a < b.from)) c = "pointBreak";
                                        else if ((d < b.from && a > b.from && a < b.to) || (d > b.from && a > b.to && a < b.from)) c = "pointInBreak";
                                        c && K(g, c, { point: e, brk: b });
                                    }
                                });
                            });
                        });
                    }
                };
                h.gappedPath = function () {
                    var g = this.currentDataGrouping,
                        h = g && g.gapSize;
                    g = this.options.gapSize;
                    var l = this.points.slice(),
                        e = l.length - 1,
                        b = this.yAxis,
                        d;
                    if (g && 0 < e)
                        for ("value" !== this.options.gapUnit && (g *= this.basePointRange), h && h > g && h >= this.basePointRange && (g = h), d = void 0; e--; )
                            (d && !1 !== d.visible) || (d = l[e + 1]),
                                (h = l[e]),
                                !1 !== d.visible &&
                                    !1 !== h.visible &&
                                    (d.x - h.x > g &&
                                        ((d = (h.x + d.x) / 2),
                                        l.splice(e + 1, 0, { isNull: !0, x: d }),
                                        b.stacking && this.options.stacking && ((d = b.stacking.stacks[this.stackKey][d] = new M(b, b.options.stackLabels, !1, d, this.stack)), (d.total = 0))),
                                    (d = h));
                    return this.getGraphPath(l);
                };
                v(m, "init", function () {
                    this.brokenAxis || (this.brokenAxis = new t(this));
                });
                v(m, "afterInit", function () {
                    "undefined" !== typeof this.brokenAxis && this.brokenAxis.setBreaks(this.options.breaks, !1);
                });
                v(m, "afterSetTickPositions", function () {
                    var g = this.brokenAxis;
                    if (g && g.hasBreaks) {
                        var h = this.tickPositions,
                            l = this.tickPositions.info,
                            e = [],
                            b;
                        for (b = 0; b < h.length; b++) g.isInAnyBreak(h[b]) || e.push(h[b]);
                        this.tickPositions = e;
                        this.tickPositions.info = l;
                    }
                });
                v(m, "afterSetOptions", function () {
                    this.brokenAxis && this.brokenAxis.hasBreaks && (this.options.ordinal = !1);
                });
                v(l, "afterGeneratePoints", function () {
                    var g = this.options.connectNulls,
                        h = this.points,
                        l = this.xAxis,
                        e = this.yAxis;
                    if (this.isDirty)
                        for (var b = h.length; b--; ) {
                            var d = h[b],
                                c = !(null === d.y && !1 === g) && ((l && l.brokenAxis && l.brokenAxis.isInAnyBreak(d.x, !0)) || (e && e.brokenAxis && e.brokenAxis.isInAnyBreak(d.y, !0)));
                            d.visible = c ? !1 : !1 !== d.options.visible;
                        }
                });
                v(l, "afterRender", function () {
                    this.drawBreaks(this.xAxis, ["x"]);
                    this.drawBreaks(this.yAxis, q(this.pointArrayMap, ["y"]));
                });
            };
            return m;
        })();
        B.compose(m, n);
        return B;
    });
    O(m, "Core/Axis/TreeGridAxis.js", [m["Core/Globals.js"], m["Core/Axis/Axis.js"], m["Core/Axis/Tick.js"], m["Gantt/Tree.js"], m["Core/Axis/TreeGridTick.js"], m["Mixins/TreeSeries.js"], m["Core/Utilities.js"]], function (
        m,
        n,
        M,
        B,
        F,
        J,
        K
    ) {
        var v = J.getLevelOptions,
            x = K.addEvent,
            q = K.find,
            t = K.fireEvent,
            w = K.isArray,
            G = K.isNumber,
            l = K.isObject,
            h = K.isString,
            g = K.merge,
            H = K.pick,
            p = K.wrap,
            e;
        (function (b) {
            function d(a, b) {
                var c = a.collapseStart || 0;
                a = a.collapseEnd || 0;
                a >= b && (c -= 0.5);
                return { from: c, to: a, showPoints: !1 };
            }
            function c(a, b, c) {
                var d = [],
                    e = [],
                    f = {},
                    g = {},
                    k = -1,
                    p = "boolean" === typeof b ? b : !1;
                a = B.getTree(a, {
                    after: function (a) {
                        a = g[a.pos];
                        var b = 0,
                            c = 0;
                        a.children.forEach(function (a) {
                            c += (a.descendants || 0) + 1;
                            b = Math.max((a.height || 0) + 1, b);
                        });
                        a.descendants = c;
                        a.height = b;
                        a.collapsed && e.push(a);
                    },
                    before: function (a) {
                        var b = l(a.data, !0) ? a.data : {},
                            c = h(b.name) ? b.name : "",
                            e = f[a.parent];
                        e = l(e, !0) ? g[e.pos] : null;
                        var r = function (a) {
                                return a.name === c;
                            },
                            t;
                        p && l(e, !0) && (t = q(e.children, r)) ? ((r = t.pos), t.nodes.push(a)) : (r = k++);
                        g[r] || ((g[r] = t = { depth: e ? e.depth + 1 : 0, name: c, id: b.id, nodes: [a], children: [], pos: r }), -1 !== r && d.push(c), l(e, !0) && e.children.push(t));
                        h(a.id) && (f[a.id] = a);
                        t && !0 === b.collapsed && (t.collapsed = !0);
                        a.pos = r;
                    },
                });
                g = (function (a, b) {
                    var c = function (a, d, f) {
                        var e = d + (-1 === d ? 0 : b - 1),
                            g = (e - d) / 2,
                            k = d + g;
                        a.nodes.forEach(function (a) {
                            var b = a.data;
                            l(b, !0) && ((b.y = d + (b.seriesIndex || 0)), delete b.seriesIndex);
                            a.pos = k;
                        });
                        f[k] = a;
                        a.pos = k;
                        a.tickmarkOffset = g + 0.5;
                        a.collapseStart = e + 0.5;
                        a.children.forEach(function (a) {
                            c(a, e + 1, f);
                            e = (a.collapseEnd || 0) - 0.5;
                        });
                        a.collapseEnd = e + 0.5;
                        return f;
                    };
                    return c(a["-1"], -1, {});
                })(g, c);
                return { categories: d, mapOfIdToNode: f, mapOfPosToGridNode: g, collapsedNodes: e, tree: a };
            }
            function a(a) {
                a.target.axes
                    .filter(function (a) {
                        return "treegrid" === a.options.type;
                    })
                    .forEach(function (b) {
                        var d = b.options || {},
                            e = d.labels,
                            k = d.uniqueNames,
                            f = 0;
                        d = d.max;
                        if (
                            !b.treeGrid.mapOfPosToGridNode ||
                            b.series.some(function (a) {
                                return !a.hasRendered || a.isDirtyData || a.isDirty;
                            })
                        ) {
                            var h = b.series.reduce(function (a, b) {
                                b.visible &&
                                    ((b.options.data || []).forEach(function (c) {
                                        b.options.keys && b.options.keys.length && ((c = b.pointClass.prototype.optionsToObject.call({ series: b }, c)), m.seriesTypes.gantt.prototype.setGanttPointAliases(c));
                                        l(c, !0) && ((c.seriesIndex = f), a.push(c));
                                    }),
                                    !0 === k && f++);
                                return a;
                            }, []);
                            if (d && h.length < d) for (var p = h.length; p <= d; p++) h.push({ name: p + "\u200b" });
                            d = c(h, k || !1, !0 === k ? f : 1);
                            b.categories = d.categories;
                            b.treeGrid.mapOfPosToGridNode = d.mapOfPosToGridNode;
                            b.hasNames = !0;
                            b.treeGrid.tree = d.tree;
                            b.series.forEach(function (a) {
                                var b = (a.options.data || []).map(function (b) {
                                    w(b) &&
                                        a.options.keys &&
                                        a.options.keys.length &&
                                        h.forEach(function (a) {
                                            0 <= b.indexOf(a.x) && 0 <= b.indexOf(a.x2) && (b = a);
                                        });
                                    return l(b, !0) ? g(b) : b;
                                });
                                a.visible && a.setData(b, !1);
                            });
                            b.treeGrid.mapOptionsToLevel = v({ defaults: e, from: 1, levels: e && e.levels, to: b.treeGrid.tree && b.treeGrid.tree.height });
                            "beforeRender" === a.type && (b.treeGrid.collapsedNodes = d.collapsedNodes);
                        }
                    });
            }
            function e(a, b) {
                var c = this.treeGrid.mapOptionsToLevel || {},
                    d = this.ticks,
                    e = d[b],
                    f;
                if ("treegrid" === this.options.type && this.treeGrid.mapOfPosToGridNode) {
                    var g = this.treeGrid.mapOfPosToGridNode[b];
                    (c = c[g.depth]) && (f = { labels: c });
                    e ? ((e.parameters.category = g.name), (e.options = f), e.addLabel()) : (d[b] = new M(this, b, void 0, void 0, { category: g.name, tickmarkOffset: g.tickmarkOffset, options: f }));
                } else a.apply(this, Array.prototype.slice.call(arguments, 1));
            }
            function u(a) {
                var b = this.options;
                b = (b = b && b.labels) && G(b.indentation) ? b.indentation : 0;
                var c = a.apply(this, Array.prototype.slice.call(arguments, 1));
                if ("treegrid" === this.options.type && this.treeGrid.mapOfPosToGridNode) {
                    var d = this.treeGrid.mapOfPosToGridNode[-1].height || 0;
                    c.width += b * (d - 1);
                }
                return c;
            }
            function n(b, d, e) {
                var k = this,
                    h = "treegrid" === e.type;
                k.treeGrid || (k.treeGrid = new J(k));
                h &&
                    (x(d, "beforeRender", a),
                    x(d, "beforeRedraw", a),
                    x(d, "addSeries", function (a) {
                        a.options.data && ((a = c(a.options.data, e.uniqueNames || !1, 1)), (k.treeGrid.collapsedNodes = (k.treeGrid.collapsedNodes || []).concat(a.collapsedNodes)));
                    }),
                    x(k, "foundExtremes", function () {
                        k.treeGrid.collapsedNodes &&
                            k.treeGrid.collapsedNodes.forEach(function (a) {
                                var b = k.treeGrid.collapse(a);
                                k.brokenAxis &&
                                    (k.brokenAxis.setBreaks(b, !1),
                                    k.treeGrid.collapsedNodes &&
                                        (k.treeGrid.collapsedNodes = k.treeGrid.collapsedNodes.filter(function (b) {
                                            return a.collapseStart !== b.collapseStart || a.collapseEnd !== b.collapseEnd;
                                        })));
                            });
                    }),
                    x(k, "afterBreaks", function () {
                        var a;
                        "yAxis" === k.coll && !k.staticScale && (null === (a = k.chart.options.chart) || void 0 === a ? 0 : a.height) && (k.isDirty = !0);
                    }),
                    (e = g(
                        {
                            grid: { enabled: !0 },
                            labels: { align: "left", levels: [{ level: void 0 }, { level: 1, style: { fontWeight: "bold" } }], symbol: { type: "triangle", x: -5, y: -5, height: 10, width: 10, padding: 5 } },
                            uniqueNames: !1,
                        },
                        e,
                        { reversed: !0, grid: { columns: void 0 } }
                    )));
                b.apply(k, [d, e]);
                h && ((k.hasNames = !0), (k.options.showLastLabel = !0));
            }
            function y(a) {
                var b = this.options;
                "treegrid" === b.type
                    ? ((this.min = H(this.userMin, b.min, this.dataMin)),
                      (this.max = H(this.userMax, b.max, this.dataMax)),
                      t(this, "foundExtremes"),
                      this.setAxisTranslation(!0),
                      (this.tickmarkOffset = 0.5),
                      (this.tickInterval = 1),
                      (this.tickPositions = this.treeGrid.mapOfPosToGridNode ? this.treeGrid.getTickPositions() : []))
                    : a.apply(this, Array.prototype.slice.call(arguments, 1));
            }
            var D = !1;
            b.compose = function (a) {
                D || (p(a.prototype, "generateTick", e), p(a.prototype, "getMaxLabelDimensions", u), p(a.prototype, "init", n), p(a.prototype, "setTickInterval", y), F.compose(M), (D = !0));
            };
            var J = (function () {
                function a(a) {
                    this.axis = a;
                }
                a.prototype.setCollapsedStatus = function (a) {
                    var b = this.axis,
                        c = b.chart;
                    b.series.forEach(function (b) {
                        var d = b.options.data;
                        if (a.id && d) {
                            var e = c.get(a.id);
                            b = d[b.data.indexOf(e)];
                            e && b && ((e.collapsed = a.collapsed), (b.collapsed = a.collapsed));
                        }
                    });
                };
                a.prototype.collapse = function (a) {
                    var b = this.axis,
                        c = b.options.breaks || [],
                        e = d(a, b.max);
                    c.push(e);
                    a.collapsed = !0;
                    b.treeGrid.setCollapsedStatus(a);
                    return c;
                };
                a.prototype.expand = function (a) {
                    var b = this.axis,
                        c = b.options.breaks || [],
                        e = d(a, b.max);
                    a.collapsed = !1;
                    b.treeGrid.setCollapsedStatus(a);
                    return c.reduce(function (a, b) {
                        (b.to === e.to && b.from === e.from) || a.push(b);
                        return a;
                    }, []);
                };
                a.prototype.getTickPositions = function () {
                    var a = this.axis,
                        b = Math.floor(a.min / a.tickInterval) * a.tickInterval,
                        c = Math.ceil(a.max / a.tickInterval) * a.tickInterval;
                    return Object.keys(a.treeGrid.mapOfPosToGridNode || {}).reduce(function (d, f) {
                        f = +f;
                        !(f >= b && f <= c) || (a.brokenAxis && a.brokenAxis.isInAnyBreak(f)) || d.push(f);
                        return d;
                    }, []);
                };
                a.prototype.isCollapsed = function (a) {
                    var b = this.axis,
                        c = b.options.breaks || [],
                        e = d(a, b.max);
                    return c.some(function (a) {
                        return a.from === e.from && a.to === e.to;
                    });
                };
                a.prototype.toggleCollapse = function (a) {
                    return this.isCollapsed(a) ? this.expand(a) : this.collapse(a);
                };
                return a;
            })();
            b.Additions = J;
        })(e || (e = {}));
        n.prototype.utils = { getNode: B.getNode };
        e.compose(n);
        return e;
    });
    O(m, "Extensions/CurrentDateIndication.js", [m["Core/Axis/Axis.js"], m["Core/Utilities.js"], m["Core/Axis/PlotLineOrBand.js"]], function (m, n, M) {
        var v = n.addEvent,
            F = n.merge;
        n = n.wrap;
        var J = {
            currentDateIndicator: !0,
            color: "#ccd6eb",
            width: 2,
            label: {
                format: "%a, %b %d %Y, %H:%M",
                formatter: function (n, m) {
                    return this.axis.chart.time.dateFormat(m, n);
                },
                rotation: 0,
                style: { fontSize: "10px" },
            },
        };
        v(m, "afterSetOptions", function () {
            var n = this.options,
                m = n.currentDateIndicator;
            m && ((m = "object" === typeof m ? F(J, m) : F(J)), (m.value = new Date()), n.plotLines || (n.plotLines = []), n.plotLines.push(m));
        });
        v(M, "render", function () {
            this.label && this.label.attr({ text: this.getLabelText(this.options.label) });
        });
        n(M.prototype, "getLabelText", function (n, m) {
            var x = this.options;
            return x.currentDateIndicator && x.label && "function" === typeof x.label.formatter ? ((x.value = new Date()), x.label.formatter.call(this, x.value, x.label.format)) : n.call(this, m);
        });
    });
    O(m, "Extensions/StaticScale.js", [m["Core/Axis/Axis.js"], m["Core/Chart/Chart.js"], m["Core/Utilities.js"]], function (m, n, M) {
        var v = M.addEvent,
            F = M.defined,
            J = M.isNumber,
            K = M.pick;
        v(m, "afterSetOptions", function () {
            var n = this.chart.options && this.chart.options.chart;
            !this.horiz && J(this.options.staticScale) && (!n.height || (n.scrollablePlotArea && n.scrollablePlotArea.minHeight)) && (this.staticScale = this.options.staticScale);
        });
        n.prototype.adjustHeight = function () {
            "adjustHeight" !== this.redrawTrigger &&
                ((this.axes || []).forEach(function (n) {
                    var m = n.chart,
                        q = !!m.initiatedScale && m.options.animation,
                        t = n.options.staticScale;
                    if (n.staticScale && F(n.min)) {
                        var w = K(n.brokenAxis && n.brokenAxis.unitLength, n.max + n.tickInterval - n.min) * t;
                        w = Math.max(w, t);
                        t = w - m.plotHeight;
                        1 <= Math.abs(t) && ((m.plotHeight = w), (m.redrawTrigger = "adjustHeight"), m.setSize(void 0, m.chartHeight + t, q));
                        n.series.forEach(function (t) {
                            (t = t.sharedClipKey && m[t.sharedClipKey]) && t.attr({ height: m.plotHeight });
                        });
                    }
                }),
                (this.initiatedScale = !0));
            this.redrawTrigger = null;
        };
        v(n, "render", n.prototype.adjustHeight);
    });
    O(m, "Extensions/ArrowSymbols.js", [m["Core/Renderer/SVG/SVGRenderer.js"]], function (m) {
        m.prototype.symbols.arrow = function (n, m, v, F) {
            return [
                ["M", n, m + F / 2],
                ["L", n + v, m],
                ["L", n, m + F / 2],
                ["L", n + v, m + F],
            ];
        };
        m.prototype.symbols["arrow-half"] = function (n, v, B, F) {
            return m.prototype.symbols.arrow(n, v, B / 2, F);
        };
        m.prototype.symbols["triangle-left"] = function (n, m, v, F) {
            return [["M", n + v, m], ["L", n, m + F / 2], ["L", n + v, m + F], ["Z"]];
        };
        m.prototype.symbols["arrow-filled"] = m.prototype.symbols["triangle-left"];
        m.prototype.symbols["triangle-left-half"] = function (n, v, B, F) {
            return m.prototype.symbols["triangle-left"](n, v, B / 2, F);
        };
        m.prototype.symbols["arrow-filled-half"] = m.prototype.symbols["triangle-left-half"];
    });
    O(m, "Gantt/Connection.js", [m["Core/Globals.js"], m["Core/Options.js"], m["Core/Series/Point.js"], m["Core/Utilities.js"]], function (m, n, M, B) {
        function v(l) {
            var h = l.shapeArgs;
            return h
                ? { xMin: h.x, xMax: h.x + h.width, yMin: h.y, yMax: h.y + h.height }
                : (h = l.graphic && l.graphic.getBBox())
                ? { xMin: l.plotX - h.width / 2, xMax: l.plotX + h.width / 2, yMin: l.plotY - h.height / 2, yMax: l.plotY + h.height / 2 }
                : null;
        }
        ("");
        var J = B.defined,
            K = B.error,
            D = B.extend,
            x = B.merge,
            q = B.objectEach,
            t = m.deg2rad,
            w = Math.max,
            G = Math.min;
        D(n.defaultOptions, {
            connectors: { type: "straight", lineWidth: 1, marker: { enabled: !1, align: "center", verticalAlign: "middle", inside: !1, lineWidth: 1 }, startMarker: { symbol: "diamond" }, endMarker: { symbol: "arrow-filled" } },
        });
        n = (function () {
            function l(h, g, l) {
                this.toPoint = this.pathfinder = this.graphics = this.fromPoint = this.chart = void 0;
                this.init(h, g, l);
            }
            l.prototype.init = function (h, g, l) {
                this.fromPoint = h;
                this.toPoint = g;
                this.options = l;
                this.chart = h.series.chart;
                this.pathfinder = this.chart.pathfinder;
            };
            l.prototype.renderPath = function (h, g, l) {
                var p = this.chart,
                    e = p.styledMode,
                    b = p.pathfinder,
                    d = !p.options.chart.forExport && !1 !== l,
                    c = this.graphics && this.graphics.path;
                b.group || (b.group = p.renderer.g().addClass("RBG_charts-pathfinder-group").attr({ zIndex: -1 }).add(p.seriesGroup));
                b.group.translate(p.plotLeft, p.plotTop);
                (c && c.renderer) || ((c = p.renderer.path().add(b.group)), e || c.attr({ opacity: 0 }));
                c.attr(g);
                h = { d: h };
                e || (h.opacity = 1);
                c[d ? "animate" : "attr"](h, l);
                this.graphics = this.graphics || {};
                this.graphics.path = c;
            };
            l.prototype.addMarker = function (h, g, l) {
                var p = this.fromPoint.series.chart,
                    e = p.pathfinder;
                p = p.renderer;
                var b = "start" === h ? this.fromPoint : this.toPoint,
                    d = b.getPathfinderAnchorPoint(g);
                if (g.enabled && (((l = "start" === h ? l[1] : l[l.length - 2]) && "M" === l[0]) || "L" === l[0])) {
                    l = { x: l[1], y: l[2] };
                    l = b.getRadiansToVector(l, d);
                    d = b.getMarkerVector(l, g.radius, d);
                    l = -l / t;
                    if (g.width && g.height) {
                        var c = g.width;
                        var a = g.height;
                    } else c = a = 2 * g.radius;
                    this.graphics = this.graphics || {};
                    d = { x: d.x - c / 2, y: d.y - a / 2, width: c, height: a, rotation: l, rotationOriginX: d.x, rotationOriginY: d.y };
                    this.graphics[h]
                        ? this.graphics[h].animate(d)
                        : ((this.graphics[h] = p
                              .symbol(g.symbol)
                              .addClass("RBG_charts-point-connecting-path-" + h + "-marker")
                              .attr(d)
                              .add(e.group)),
                          p.styledMode || this.graphics[h].attr({ fill: g.color || this.fromPoint.color, stroke: g.lineColor, "stroke-width": g.lineWidth, opacity: 0 }).animate({ opacity: 1 }, b.series.options.animation));
                }
            };
            l.prototype.getPath = function (h) {
                var g = this.pathfinder,
                    l = this.chart,
                    p = g.algorithms[h.type],
                    e = g.chartObstacles;
                if ("function" !== typeof p) return K('"' + h.type + '" is not a Pathfinder algorithm.'), { path: [], obstacles: [] };
                p.requiresObstacles && !e && ((e = g.chartObstacles = g.getChartObstacles(h)), (l.options.connectors.algorithmMargin = h.algorithmMargin), (g.chartObstacleMetrics = g.getObstacleMetrics(e)));
                return p(
                    this.fromPoint.getPathfinderAnchorPoint(h.startMarker),
                    this.toPoint.getPathfinderAnchorPoint(h.endMarker),
                    x(
                        {
                            chartObstacles: e,
                            lineObstacles: g.lineObstacles || [],
                            obstacleMetrics: g.chartObstacleMetrics,
                            hardBounds: { xMin: 0, xMax: l.plotWidth, yMin: 0, yMax: l.plotHeight },
                            obstacleOptions: { margin: h.algorithmMargin },
                            startDirectionX: g.getAlgorithmStartDirection(h.startMarker),
                        },
                        h
                    )
                );
            };
            l.prototype.render = function () {
                var h = this.fromPoint,
                    g = h.series,
                    l = g.chart,
                    p = l.pathfinder,
                    e = x(l.options.connectors, g.options.connectors, h.options.connectors, this.options),
                    b = {};
                l.styledMode || ((b.stroke = e.lineColor || h.color), (b["stroke-width"] = e.lineWidth), e.dashStyle && (b.dashstyle = e.dashStyle));
                b["class"] = "RBG_charts-point-connecting-path RBG_charts-color-" + h.colorIndex;
                e = x(b, e);
                J(e.marker.radius) || (e.marker.radius = G(w(Math.ceil((e.algorithmMargin || 8) / 2) - 1, 1), 5));
                h = this.getPath(e);
                l = h.path;
                h.obstacles && ((p.lineObstacles = p.lineObstacles || []), (p.lineObstacles = p.lineObstacles.concat(h.obstacles)));
                this.renderPath(l, b, g.options.animation);
                this.addMarker("start", x(e.marker, e.startMarker), l);
                this.addMarker("end", x(e.marker, e.endMarker), l);
            };
            l.prototype.destroy = function () {
                this.graphics &&
                    (q(this.graphics, function (h) {
                        h.destroy();
                    }),
                    delete this.graphics);
            };
            return l;
        })();
        m.Connection = n;
        D(M.prototype, {
            getPathfinderAnchorPoint: function (l) {
                var h = v(this);
                switch (l.align) {
                    case "right":
                        var g = "xMax";
                        break;
                    case "left":
                        g = "xMin";
                }
                switch (l.verticalAlign) {
                    case "top":
                        var t = "yMin";
                        break;
                    case "bottom":
                        t = "yMax";
                }
                return { x: g ? h[g] : (h.xMin + h.xMax) / 2, y: t ? h[t] : (h.yMin + h.yMax) / 2 };
            },
            getRadiansToVector: function (l, h) {
                var g;
                J(h) || ((g = v(this)) && (h = { x: (g.xMin + g.xMax) / 2, y: (g.yMin + g.yMax) / 2 }));
                return Math.atan2(h.y - l.y, l.x - h.x);
            },
            getMarkerVector: function (l, h, g) {
                var t = 2 * Math.PI,
                    p = v(this),
                    e = p.xMax - p.xMin,
                    b = p.yMax - p.yMin,
                    d = Math.atan2(b, e),
                    c = !1;
                e /= 2;
                var a = b / 2,
                    k = p.xMin + e;
                p = p.yMin + a;
                for (var q = k, n = p, m = {}, w = 1, x = 1; l < -Math.PI; ) l += t;
                for (; l > Math.PI; ) l -= t;
                t = Math.tan(l);
                l > -d && l <= d ? ((x = -1), (c = !0)) : l > d && l <= Math.PI - d ? (x = -1) : l > Math.PI - d || l <= -(Math.PI - d) ? ((w = -1), (c = !0)) : (w = -1);
                c ? ((q += w * e), (n += x * e * t)) : ((q += (b / (2 * t)) * w), (n += x * a));
                g.x !== k && (q = g.x);
                g.y !== p && (n = g.y);
                m.x = q + h * Math.cos(l);
                m.y = n - h * Math.sin(l);
                return m;
            },
        });
        return n;
    });
    O(m, "Gantt/PathfinderAlgorithms.js", [m["Core/Utilities.js"]], function (m) {
        function n(t, q, n) {
            n = n || 0;
            var l = t.length - 1;
            q -= 1e-7;
            for (var h, g; n <= l; )
                if (((h = (l + n) >> 1), (g = q - t[h].xMin), 0 < g)) n = h + 1;
                else if (0 > g) l = h - 1;
                else return h;
            return 0 < n ? n - 1 : 0;
        }
        function v(t, q) {
            for (var m = n(t, q.x + 1) + 1; m--; ) {
                var l;
                if ((l = t[m].xMax >= q.x)) (l = t[m]), (l = q.x <= l.xMax && q.x >= l.xMin && q.y <= l.yMax && q.y >= l.yMin);
                if (l) return m;
            }
            return -1;
        }
        function B(t) {
            var q = [];
            if (t.length) {
                q.push(["M", t[0].start.x, t[0].start.y]);
                for (var n = 0; n < t.length; ++n) q.push(["L", t[n].end.x, t[n].end.y]);
            }
            return q;
        }
        function F(q, n) {
            q.yMin = x(q.yMin, n.yMin);
            q.yMax = D(q.yMax, n.yMax);
            q.xMin = x(q.xMin, n.xMin);
            q.xMax = D(q.xMax, n.xMax);
        }
        var J = m.extend,
            K = m.pick,
            D = Math.min,
            x = Math.max,
            q = Math.abs;
        m = J(
            function (t, n, m) {
                function l(b, a, d, e, g) {
                    b = { x: b.x, y: b.y };
                    b[a] = d[e || a] + (g || 0);
                    return b;
                }
                function h(b, a, d) {
                    var c = q(a[d] - b[d + "Min"]) > q(a[d] - b[d + "Max"]);
                    return l(a, d, b, d + (c ? "Max" : "Min"), c ? 1 : -1);
                }
                var g = [],
                    w = K(m.startDirectionX, q(n.x - t.x) > q(n.y - t.y)) ? "x" : "y",
                    p = m.chartObstacles,
                    e = v(p, t);
                m = v(p, n);
                if (-1 < m) {
                    var b = p[m];
                    m = h(b, n, w);
                    b = { start: m, end: n };
                    var d = m;
                } else d = n;
                -1 < e &&
                    ((p = p[e]),
                    (m = h(p, t, w)),
                    g.push({ start: t, end: m }),
                    m[w] >= t[w] === m[w] >= d[w] && ((w = "y" === w ? "x" : "y"), (n = t[w] < n[w]), g.push({ start: m, end: l(m, w, p, w + (n ? "Max" : "Min"), n ? 1 : -1) }), (w = "y" === w ? "x" : "y")));
                t = g.length ? g[g.length - 1].end : t;
                m = l(t, w, d);
                g.push({ start: t, end: m });
                w = l(m, "y" === w ? "x" : "y", d);
                g.push({ start: m, end: w });
                g.push(b);
                return { path: B(g), obstacles: g };
            },
            { requiresObstacles: !0 }
        );
        return {
            fastAvoid: J(
                function (t, m, G) {
                    function l(a, b, c) {
                        var d,
                            e = a.x < b.x ? 1 : -1;
                        if (a.x < b.x) {
                            var f = a;
                            var g = b;
                        } else (f = b), (g = a);
                        if (a.y < b.y) {
                            var k = a;
                            var h = b;
                        } else (k = b), (h = a);
                        for (d = 0 > e ? D(n(y, g.x), y.length - 1) : 0; y[d] && ((0 < e && y[d].xMin <= g.x) || (0 > e && y[d].xMax >= f.x)); ) {
                            if (y[d].xMin <= g.x && y[d].xMax >= f.x && y[d].yMin <= h.y && y[d].yMax >= k.y)
                                return c ? { y: a.y, x: a.x < b.x ? y[d].xMin - 1 : y[d].xMax + 1, obstacle: y[d] } : { x: a.x, y: a.y < b.y ? y[d].yMin - 1 : y[d].yMax + 1, obstacle: y[d] };
                            d += e;
                        }
                        return b;
                    }
                    function h(a, b, c, d, e) {
                        var f = e.soft,
                            g = e.hard,
                            k = d ? "x" : "y",
                            h = { x: b.x, y: b.y },
                            p = { x: b.x, y: b.y };
                        e = a[k + "Max"] >= f[k + "Max"];
                        f = a[k + "Min"] <= f[k + "Min"];
                        var m = a[k + "Max"] >= g[k + "Max"];
                        g = a[k + "Min"] <= g[k + "Min"];
                        var n = q(a[k + "Min"] - b[k]),
                            t = q(a[k + "Max"] - b[k]);
                        c = 10 > q(n - t) ? b[k] < c[k] : t < n;
                        p[k] = a[k + "Min"];
                        h[k] = a[k + "Max"];
                        a = l(b, p, d)[k] !== p[k];
                        b = l(b, h, d)[k] !== h[k];
                        c = a ? (b ? c : !0) : b ? !1 : c;
                        c = f ? (e ? c : !0) : e ? !1 : c;
                        return g ? (m ? c : !0) : m ? !1 : c;
                    }
                    function g(b, c, e) {
                        if (b.x === c.x && b.y === c.y) return [];
                        var p = e ? "x" : "y",
                            q = G.obstacleOptions.margin;
                        var f = { soft: { xMin: a, xMax: k, yMin: u, yMax: I }, hard: G.hardBounds };
                        var r = v(y, b);
                        if (-1 < r) {
                            r = y[r];
                            f = h(r, b, c, e, f);
                            F(r, G.hardBounds);
                            var m = e ? { y: b.y, x: r[f ? "xMax" : "xMin"] + (f ? 1 : -1) } : { x: b.x, y: r[f ? "yMax" : "yMin"] + (f ? 1 : -1) };
                            var n = v(y, m);
                            -1 < n &&
                                ((n = y[n]),
                                F(n, G.hardBounds),
                                (m[p] = f ? x(r[p + "Max"] - q + 1, (n[p + "Min"] + r[p + "Max"]) / 2) : D(r[p + "Min"] + q - 1, (n[p + "Max"] + r[p + "Min"]) / 2)),
                                b.x === m.x && b.y === m.y ? (d && (m[p] = f ? x(r[p + "Max"], n[p + "Max"]) + 1 : D(r[p + "Min"], n[p + "Min"]) - 1), (d = !d)) : (d = !1));
                            b = [{ start: b, end: m }];
                        } else
                            (p = l(b, { x: e ? c.x : b.x, y: e ? b.y : c.y }, e)),
                                (b = [{ start: b, end: { x: p.x, y: p.y } }]),
                                p[e ? "x" : "y"] !== c[e ? "x" : "y"] &&
                                    ((f = h(p.obstacle, p, c, !e, f)),
                                    F(p.obstacle, G.hardBounds),
                                    (f = { x: e ? p.x : p.obstacle[f ? "xMax" : "xMin"] + (f ? 1 : -1), y: e ? p.obstacle[f ? "yMax" : "yMin"] + (f ? 1 : -1) : p.y }),
                                    (e = !e),
                                    (b = b.concat(g({ x: p.x, y: p.y }, f, e))));
                        return (b = b.concat(g(b[b.length - 1].end, c, !e)));
                    }
                    function w(a, b, c) {
                        var d = D(a.xMax - b.x, b.x - a.xMin) < D(a.yMax - b.y, b.y - a.yMin);
                        c = h(a, b, c, d, { soft: G.hardBounds, hard: G.hardBounds });
                        return d ? { y: b.y, x: a[c ? "xMax" : "xMin"] + (c ? 1 : -1) } : { x: b.x, y: a[c ? "yMax" : "yMin"] + (c ? 1 : -1) };
                    }
                    var p = K(G.startDirectionX, q(m.x - t.x) > q(m.y - t.y)),
                        e = p ? "x" : "y",
                        b = [],
                        d = !1,
                        c = G.obstacleMetrics,
                        a = D(t.x, m.x) - c.maxWidth - 10,
                        k = x(t.x, m.x) + c.maxWidth + 10,
                        u = D(t.y, m.y) - c.maxHeight - 10,
                        I = x(t.y, m.y) + c.maxHeight + 10,
                        y = G.chartObstacles;
                    var L = n(y, a);
                    c = n(y, k);
                    y = y.slice(L, c + 1);
                    if (-1 < (c = v(y, m))) {
                        var J = w(y[c], m, t);
                        b.push({ end: m, start: J });
                        m = J;
                    }
                    for (; -1 < (c = v(y, m)); ) (L = 0 > m[e] - t[e]), (J = { x: m.x, y: m.y }), (J[e] = y[c][L ? e + "Max" : e + "Min"] + (L ? 1 : -1)), b.push({ end: m, start: J }), (m = J);
                    t = g(t, m, p);
                    t = t.concat(b.reverse());
                    return { path: B(t), obstacles: t };
                },
                { requiresObstacles: !0 }
            ),
            straight: function (q, m) {
                return {
                    path: [
                        ["M", q.x, q.y],
                        ["L", m.x, m.y],
                    ],
                    obstacles: [{ start: q, end: m }],
                };
            },
            simpleConnect: m,
        };
    });
    O(m, "Gantt/Pathfinder.js", [m["Gantt/Connection.js"], m["Core/Chart/Chart.js"], m["Core/Globals.js"], m["Core/Options.js"], m["Core/Series/Point.js"], m["Core/Utilities.js"], m["Gantt/PathfinderAlgorithms.js"]], function (
        m,
        n,
        M,
        B,
        F,
        J,
        K
    ) {
        function v(b) {
            var c = b.shapeArgs;
            return c
                ? { xMin: c.x, xMax: c.x + c.width, yMin: c.y, yMax: c.y + c.height }
                : (c = b.graphic && b.graphic.getBBox())
                ? { xMin: b.plotX - c.width / 2, xMax: b.plotX + c.width / 2, yMin: b.plotY - c.height / 2, yMax: b.plotY + c.height / 2 }
                : null;
        }
        function x(b) {
            for (
                var c = b.length,
                    a = 0,
                    d,
                    h,
                    l = [],
                    q = function (a, b, c) {
                        c = g(c, 10);
                        var d = a.yMax + c > b.yMin - c && a.yMin - c < b.yMax + c,
                            k = a.xMax + c > b.xMin - c && a.xMin - c < b.xMax + c,
                            h = d ? (a.xMin > b.xMax ? a.xMin - b.xMax : b.xMin - a.xMax) : Infinity,
                            l = k ? (a.yMin > b.yMax ? a.yMin - b.yMax : b.yMin - a.yMax) : Infinity;
                        return k && d ? (c ? q(a, b, Math.floor(c / 2)) : Infinity) : e(h, l);
                    };
                a < c;
                ++a
            )
                for (d = a + 1; d < c; ++d) (h = q(b[a], b[d])), 80 > h && l.push(h);
            l.push(80);
            return p(
                Math.floor(
                    l.sort(function (a, b) {
                        return a - b;
                    })[Math.floor(l.length / 10)] /
                        2 -
                        1
                ),
                1
            );
        }
        function q(b) {
            if (
                b.options.pathfinder ||
                b.series.reduce(function (b, a) {
                    a.options && h(!0, (a.options.connectors = a.options.connectors || {}), a.options.pathfinder);
                    return b || (a.options && a.options.pathfinder);
                }, !1)
            )
                h(!0, (b.options.connectors = b.options.connectors || {}), b.options.pathfinder), G('WARNING: Pathfinder options have been renamed. Use "chart.connectors" or "series.connectors" instead.');
        }
        ("");
        var t = J.addEvent,
            w = J.defined,
            G = J.error,
            l = J.extend,
            h = J.merge,
            g = J.pick,
            H = J.splat,
            p = Math.max,
            e = Math.min;
        l(B.defaultOptions, {
            connectors: { type: "straight", lineWidth: 1, marker: { enabled: !1, align: "center", verticalAlign: "middle", inside: !1, lineWidth: 1 }, startMarker: { symbol: "diamond" }, endMarker: { symbol: "arrow-filled" } },
        });
        var b = (function () {
            function b(b) {
                this.lineObstacles = this.group = this.connections = this.chartObstacleMetrics = this.chartObstacles = this.chart = void 0;
                this.init(b);
            }
            b.prototype.init = function (b) {
                this.chart = b;
                this.connections = [];
                t(b, "redraw", function () {
                    this.pathfinder.update();
                });
            };
            b.prototype.update = function (b) {
                var a = this.chart,
                    c = this,
                    d = c.connections;
                c.connections = [];
                a.series.forEach(function (b) {
                    b.visible &&
                        !b.options.isInternal &&
                        b.points.forEach(function (b) {
                            var d = b.options;
                            d && d.dependency && (d.connect = d.dependency);
                            var e;
                            d = b.options && b.options.connect && H(b.options.connect);
                            b.visible &&
                                !1 !== b.isInside &&
                                d &&
                                d.forEach(function (d) {
                                    e = a.get("string" === typeof d ? d : d.to);
                                    e instanceof F && e.series.visible && e.visible && !1 !== e.isInside && c.connections.push(new m(b, e, "string" === typeof d ? {} : d));
                                });
                        });
                });
                for (var e = 0, g, h, l = d.length, p = c.connections.length; e < l; ++e) {
                    h = !1;
                    for (g = 0; g < p; ++g)
                        if (d[e].fromPoint === c.connections[g].fromPoint && d[e].toPoint === c.connections[g].toPoint) {
                            c.connections[g].graphics = d[e].graphics;
                            h = !0;
                            break;
                        }
                    h || d[e].destroy();
                }
                delete this.chartObstacles;
                delete this.lineObstacles;
                c.renderConnections(b);
            };
            b.prototype.renderConnections = function (b) {
                b
                    ? this.chart.series.forEach(function (a) {
                          var b = function () {
                              var b = a.chart.pathfinder;
                              ((b && b.connections) || []).forEach(function (b) {
                                  b.fromPoint && b.fromPoint.series === a && b.render();
                              });
                              a.pathfinderRemoveRenderEvent && (a.pathfinderRemoveRenderEvent(), delete a.pathfinderRemoveRenderEvent);
                          };
                          !1 === a.options.animation ? b() : (a.pathfinderRemoveRenderEvent = t(a, "afterAnimate", b));
                      })
                    : this.connections.forEach(function (a) {
                          a.render();
                      });
            };
            b.prototype.getChartObstacles = function (b) {
                for (var a = [], c = this.chart.series, d = g(b.algorithmMargin, 0), e, h = 0, l = c.length; h < l; ++h)
                    if (c[h].visible && !c[h].options.isInternal)
                        for (var p = 0, q = c[h].points.length, m; p < q; ++p) (m = c[h].points[p]), m.visible && (m = v(m)) && a.push({ xMin: m.xMin - d, xMax: m.xMax + d, yMin: m.yMin - d, yMax: m.yMax + d });
                a = a.sort(function (a, b) {
                    return a.xMin - b.xMin;
                });
                w(b.algorithmMargin) ||
                    ((e = b.algorithmMargin = x(a)),
                    a.forEach(function (a) {
                        a.xMin -= e;
                        a.xMax += e;
                        a.yMin -= e;
                        a.yMax += e;
                    }));
                return a;
            };
            b.prototype.getObstacleMetrics = function (b) {
                for (var a = 0, c = 0, d, e, g = b.length; g--; ) (d = b[g].xMax - b[g].xMin), (e = b[g].yMax - b[g].yMin), a < d && (a = d), c < e && (c = e);
                return { maxHeight: c, maxWidth: a };
            };
            b.prototype.getAlgorithmStartDirection = function (b) {
                var a = "top" !== b.verticalAlign && "bottom" !== b.verticalAlign;
                return "left" !== b.align && "right" !== b.align ? (a ? void 0 : !1) : a ? !0 : void 0;
            };
            return b;
        })();
        b.prototype.algorithms = K;
        M.Pathfinder = b;
        l(F.prototype, {
            getPathfinderAnchorPoint: function (b) {
                var c = v(this);
                switch (b.align) {
                    case "right":
                        var a = "xMax";
                        break;
                    case "left":
                        a = "xMin";
                }
                switch (b.verticalAlign) {
                    case "top":
                        var d = "yMin";
                        break;
                    case "bottom":
                        d = "yMax";
                }
                return { x: a ? c[a] : (c.xMin + c.xMax) / 2, y: d ? c[d] : (c.yMin + c.yMax) / 2 };
            },
            getRadiansToVector: function (b, c) {
                var a;
                w(c) || ((a = v(this)) && (c = { x: (a.xMin + a.xMax) / 2, y: (a.yMin + a.yMax) / 2 }));
                return Math.atan2(c.y - b.y, b.x - c.x);
            },
            getMarkerVector: function (b, c, a) {
                var d = 2 * Math.PI,
                    e = v(this),
                    g = e.xMax - e.xMin,
                    h = e.yMax - e.yMin,
                    l = Math.atan2(h, g),
                    p = !1;
                g /= 2;
                var m = h / 2,
                    q = e.xMin + g;
                e = e.yMin + m;
                for (var n = q, t = e, w = {}, f = 1, r = 1; b < -Math.PI; ) b += d;
                for (; b > Math.PI; ) b -= d;
                d = Math.tan(b);
                b > -l && b <= l ? ((r = -1), (p = !0)) : b > l && b <= Math.PI - l ? (r = -1) : b > Math.PI - l || b <= -(Math.PI - l) ? ((f = -1), (p = !0)) : (f = -1);
                p ? ((n += f * g), (t += r * g * d)) : ((n += (h / (2 * d)) * f), (t += r * m));
                a.x !== q && (n = a.x);
                a.y !== e && (t = a.y);
                w.x = n + c * Math.cos(b);
                w.y = t - c * Math.sin(b);
                return w;
            },
        });
        n.prototype.callbacks.push(function (d) {
            !1 !== d.options.connectors.enabled && (q(d), (this.pathfinder = new b(this)), this.pathfinder.update(!0));
        });
        return b;
    });
    O(m, "Series/XRangeSeries.js", [m["Core/Axis/Axis.js"], m["Core/Series/Series.js"], m["Core/Globals.js"], m["Core/Color/Color.js"], m["Core/Series/Point.js"], m["Core/Utilities.js"]], function (m, n, M, B, F, J) {
        var v = B.parse;
        B = J.addEvent;
        var D = J.clamp,
            x = J.correctFloat,
            q = J.defined,
            t = J.find,
            w = J.isNumber,
            G = J.isObject,
            l = J.merge,
            h = J.pick,
            g = M.Series,
            H = n.seriesTypes,
            p = H.column;
        n.seriesType(
            "xrange",
            "column",
            {
                colorByPoint: !0,
                dataLabels: {
                    formatter: function () {
                        var e = this.point.partialFill;
                        G(e) && (e = e.amount);
                        if (w(e) && 0 < e) return x(100 * e) + "%";
                    },
                    inside: !0,
                    verticalAlign: "middle",
                },
                tooltip: { headerFormat: '<span style="font-size: 10px">{point.x} - {point.x2}</span><br/>', pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.yCategory}</b><br/>' },
                borderRadius: 3,
                pointRange: 0,
            },
            {
                type: "xrange",
                parallelArrays: ["x", "x2", "y"],
                requireSorting: !1,
                animate: H.line.prototype.animate,
                cropShoulder: 1,
                getExtremesFromAll: !0,
                autoIncrement: M.noop,
                buildKDTree: M.noop,
                init: function () {
                    H.column.prototype.init.apply(this, arguments);
                    this.options.stacking = void 0;
                },
                getColumnMetrics: function () {
                    function e() {
                        b.series.forEach(function (b) {
                            var a = b.xAxis;
                            b.xAxis = b.yAxis;
                            b.yAxis = a;
                        });
                    }
                    var b = this.chart;
                    e();
                    var d = p.prototype.getColumnMetrics.call(this);
                    e();
                    return d;
                },
                cropData: function (e, b, d, c) {
                    b = g.prototype.cropData.call(this, this.x2Data, b, d, c);
                    b.xData = e.slice(b.start, b.end);
                    return b;
                },
                findPointIndex: function (e) {
                    var b = this.cropped,
                        d = this.cropStart,
                        c = this.points,
                        a = e.id;
                    if (a)
                        var g = (g = t(c, function (b) {
                            return b.id === a;
                        }))
                            ? g.index
                            : void 0;
                    "undefined" === typeof g &&
                        (g = (g = t(c, function (a) {
                            return a.x === e.x && a.x2 === e.x2 && !a.touched;
                        }))
                            ? g.index
                            : void 0);
                    b && w(g) && w(d) && g >= d && (g -= d);
                    return g;
                },
                translatePoint: function (e) {
                    var b = this.xAxis,
                        d = this.yAxis,
                        c = this.columnMetrics,
                        a = this.options,
                        g = a.minPointLength || 0,
                        p = e.plotX,
                        m = h(e.x2, e.x + (e.len || 0)),
                        n = b.translate(m, 0, 0, 0, 1);
                    m = Math.abs(n - p);
                    var t = this.chart.inverted,
                        v = (h(a.borderWidth, 1) % 2) / 2,
                        x = c.offset,
                        z = Math.round(c.width);
                    g && ((g -= m), 0 > g && (g = 0), (p -= g / 2), (n += g / 2));
                    p = Math.max(p, -10);
                    n = D(n, -10, b.len + 10);
                    q(e.options.pointWidth) && ((x -= (Math.ceil(e.options.pointWidth) - z) / 2), (z = Math.ceil(e.options.pointWidth)));
                    a.pointPlacement && w(e.plotY) && d.categories && (e.plotY = d.translate(e.y, 0, 1, 0, 1, a.pointPlacement));
                    e.shapeArgs = { x: Math.floor(Math.min(p, n)) + v, y: Math.floor(e.plotY + x) + v, width: Math.round(Math.abs(n - p)), height: z, r: this.options.borderRadius };
                    a = e.shapeArgs.x;
                    g = a + e.shapeArgs.width;
                    0 > a || g > b.len ? ((a = D(a, 0, b.len)), (g = D(g, 0, b.len)), (n = g - a), (e.dlBox = l(e.shapeArgs, { x: a, width: g - a, centerX: n ? n / 2 : null }))) : (e.dlBox = null);
                    a = e.tooltipPos;
                    g = t ? 1 : 0;
                    n = t ? 0 : 1;
                    c = this.columnMetrics ? this.columnMetrics.offset : -c.width / 2;
                    a[g] = D(a[g] + (m / 2) * (b.reversed ? -1 : 1) * (t ? -1 : 1), 0, b.len - 1);
                    a[n] = D(a[n] + (t ? -1 : 1) * c, 0, d.len - 1);
                    if ((c = e.partialFill))
                        G(c) && (c = c.amount),
                            w(c) || (c = 0),
                            (d = e.shapeArgs),
                            (e.partShapeArgs = { x: d.x, y: d.y, width: d.width, height: d.height, r: this.options.borderRadius }),
                            (p = Math.max(Math.round(m * c + e.plotX - p), 0)),
                            (e.clipRectArgs = { x: b.reversed ? d.x + m - p : d.x, y: d.y, width: p, height: d.height });
                },
                translate: function () {
                    p.prototype.translate.apply(this, arguments);
                    this.points.forEach(function (e) {
                        this.translatePoint(e);
                    }, this);
                },
                drawPoint: function (e, b) {
                    var d = this.options,
                        c = this.chart.renderer,
                        a = e.graphic,
                        g = e.shapeType,
                        p = e.shapeArgs,
                        m = e.partShapeArgs,
                        q = e.clipRectArgs,
                        n = e.partialFill,
                        t = d.stacking && !d.borderRadius,
                        w = e.state,
                        z = d.states[w || "normal"] || {},
                        x = "undefined" === typeof w ? "attr" : b;
                    w = this.pointAttribs(e, w);
                    z = h(this.chart.options.chart.animation, z.animation);
                    if (e.isNull || !1 === e.visible) a && (e.graphic = a.destroy());
                    else {
                        if (a) a.rect[b](p);
                        else
                            (e.graphic = a = c
                                .g("point")
                                .addClass(e.getClassName())
                                .add(e.group || this.group)),
                                (a.rect = c[g](l(p)).addClass(e.getClassName()).addClass("RBG_charts-partfill-original").add(a));
                        m &&
                            (a.partRect
                                ? (a.partRect[b](l(m)), a.partialClipRect[b](l(q)))
                                : ((a.partialClipRect = c.clipRect(q.x, q.y, q.width, q.height)), (a.partRect = c[g](m).addClass("RBG_charts-partfill-overlay").add(a).clip(a.partialClipRect))));
                        this.chart.styledMode ||
                            (a.rect[b](w, z).shadow(d.shadow, null, t),
                            m &&
                                (G(n) || (n = {}),
                                G(d.partialFill) && (n = l(d.partialFill, n)),
                                (e =
                                    n.fill ||
                                    v(w.fill).brighten(-0.3).get() ||
                                    v(e.color || this.color)
                                        .brighten(-0.3)
                                        .get()),
                                (w.fill = e),
                                a.partRect[x](w, z).shadow(d.shadow, null, t)));
                    }
                },
                drawPoints: function () {
                    var e = this,
                        b = e.getAnimationVerb();
                    e.points.forEach(function (d) {
                        e.drawPoint(d, b);
                    });
                },
                getAnimationVerb: function () {
                    return this.chart.pointCount < (this.options.animationLimit || 250) ? "animate" : "attr";
                },
            },
            {
                resolveColor: function () {
                    var e = this.series;
                    if (e.options.colorByPoint && !this.options.color) {
                        var b = e.options.colors || e.chart.options.colors;
                        var d = this.y % (b ? b.length : e.chart.options.chart.colorCount);
                        b = b && b[d];
                        e.chart.styledMode || (this.color = b);
                        this.options.colorIndex || (this.colorIndex = d);
                    } else this.color || (this.color = e.color);
                },
                init: function () {
                    F.prototype.init.apply(this, arguments);
                    this.y || (this.y = 0);
                    return this;
                },
                setState: function () {
                    F.prototype.setState.apply(this, arguments);
                    this.series.drawPoint(this, this.series.getAnimationVerb());
                },
                getLabelConfig: function () {
                    var e = F.prototype.getLabelConfig.call(this),
                        b = this.series.yAxis.categories;
                    e.x2 = this.x2;
                    e.yCategory = this.yCategory = b && b[this.y];
                    return e;
                },
                tooltipDateKeys: ["x", "x2"],
                isValid: function () {
                    return "number" === typeof this.x && "number" === typeof this.x2;
                },
            }
        );
        B(m, "afterGetSeriesExtremes", function () {
            var e = this.series,
                b;
            if (this.isXAxis) {
                var d = h(this.dataMax, -Number.MAX_VALUE);
                e.forEach(function (c) {
                    c.x2Data &&
                        c.x2Data.forEach(function (a) {
                            a > d && ((d = a), (b = !0));
                        });
                });
                b && (this.dataMax = d);
            }
        });
        ("");
    });
    O(m, "Series/GanttSeries.js", [m["Core/Series/Series.js"], m["Core/Globals.js"], m["Core/Options.js"], m["Core/Utilities.js"]], function (m, n, M, B) {
        var v = B.isNumber;
        M = B.merge;
        var J = B.pick,
            K = B.splat,
            D = m.seriesTypes.xrange;
        m.seriesType(
            "gantt",
            "xrange",
            {
                grouping: !1,
                dataLabels: { enabled: !0 },
                tooltip: {
                    headerFormat: '<span style="font-size: 10px">{series.name}</span><br/>',
                    pointFormat: null,
                    pointFormatter: function () {
                        var m = this.series,
                            q = m.chart.tooltip,
                            n = m.xAxis,
                            w = m.tooltipOptions.dateTimeLabelFormats,
                            v = n.options.startOfWeek,
                            l = m.tooltipOptions,
                            h = l.xDateFormat,
                            g = this.options.milestone,
                            B = "<b>" + (this.name || this.yCategory) + "</b>";
                        if (l.pointFormat) return this.tooltipFormatter(l.pointFormat);
                        h || (h = K(q.getDateFormat(n.closestPointRange, this.start, v, w))[0]);
                        q = m.chart.time.dateFormat(h, this.start);
                        m = m.chart.time.dateFormat(h, this.end);
                        B += "<br/>";
                        return g ? B + (q + "<br/>") : B + ("Start: " + q + "<br/>End: ") + (m + "<br/>");
                    },
                },
                connectors: { type: "simpleConnect", animation: { reversed: !0 }, startMarker: { enabled: !0, symbol: "arrow-filled", radius: 4, fill: "#fa0", align: "left" }, endMarker: { enabled: !1, align: "right" } },
            },
            {
                pointArrayMap: ["start", "end", "y"],
                keyboardMoveVertical: !1,
                translatePoint: function (m) {
                    D.prototype.translatePoint.call(this, m);
                    if (m.options.milestone) {
                        var n = m.shapeArgs;
                        var t = n.height;
                        m.shapeArgs = { x: n.x - t / 2, y: n.y, width: t, height: t };
                    }
                },
                drawPoint: function (m, n) {
                    var q = this.options,
                        w = this.chart.renderer,
                        x = m.shapeArgs,
                        l = m.plotY,
                        h = m.graphic,
                        g = m.selected && "select",
                        B = q.stacking && !q.borderRadius;
                    if (m.options.milestone)
                        if (v(l) && null !== m.y && !1 !== m.visible) {
                            x = w.symbols.diamond(x.x, x.y, x.width, x.height);
                            if (h) h[n]({ d: x });
                            else
                                m.graphic = w
                                    .path(x)
                                    .addClass(m.getClassName(), !0)
                                    .add(m.group || this.group);
                            this.chart.styledMode || m.graphic.attr(this.pointAttribs(m, g)).shadow(q.shadow, null, B);
                        } else h && (m.graphic = h.destroy());
                    else D.prototype.drawPoint.call(this, m, n);
                },
                setData: n.Series.prototype.setData,
                setGanttPointAliases: function (m) {
                    function n(n, q) {
                        "undefined" !== typeof q && (m[n] = q);
                    }
                    n("x", J(m.start, m.x));
                    n("x2", J(m.end, m.x2));
                    n("partialFill", J(m.completed, m.partialFill));
                },
            },
            M(D.prototype.pointClass.prototype, {
                applyOptions: function (m, q) {
                    m = D.prototype.pointClass.prototype.applyOptions.call(this, m, q);
                    n.seriesTypes.gantt.prototype.setGanttPointAliases(m);
                    return m;
                },
                isValid: function () {
                    return ("number" === typeof this.start || "number" === typeof this.x) && ("number" === typeof this.end || "number" === typeof this.x2 || this.milestone);
                },
            })
        );
        ("");
    });
    O(m, "Core/Chart/GanttChart.js", [m["Core/Chart/Chart.js"], m["Core/Globals.js"], m["Core/Utilities.js"]], function (m, n, M) {
        var v = M.getOptions,
            F = M.isArray,
            J = M.merge,
            K = M.splat;
        n.ganttChart = function (n, x, q) {
            var t = "string" === typeof n || n.nodeName,
                w = x.series,
                B = v(),
                l,
                h = x;
            x = arguments[t ? 1 : 0];
            F(x.xAxis) || (x.xAxis = [x.xAxis || {}, {}]);
            x.xAxis = x.xAxis.map(function (g, h) {
                1 === h && (l = 0);
                return J(B.xAxis, { grid: { enabled: !0 }, opposite: !0, linkedTo: l }, g, { type: "datetime" });
            });
            x.yAxis = K(x.yAxis || {}).map(function (g) {
                return J(B.yAxis, { grid: { enabled: !0 }, staticScale: 50, reversed: !0, type: g.categories ? g.type : "treegrid" }, g);
            });
            x.series = null;
            x = J(!0, { chart: { type: "gantt" }, title: { text: null }, legend: { enabled: !1 }, navigator: { series: { type: "gantt" }, yAxis: { type: "category" } } }, x, { isGantt: !0 });
            x.series = h.series = w;
            return t ? new m(n, x, q) : new m(x, x);
        };
    });
    O(m, "Core/Axis/ScrollbarAxis.js", [m["Core/Globals.js"], m["Core/Utilities.js"]], function (m, n) {
        var v = n.addEvent,
            B = n.defined,
            F = n.pick;
        return (function () {
            function n() {}
            n.compose = function (n, D) {
                v(n, "afterInit", function () {
                    var n = this;
                    n.options &&
                        n.options.scrollbar &&
                        n.options.scrollbar.enabled &&
                        ((n.options.scrollbar.vertical = !n.horiz),
                        (n.options.startOnTick = n.options.endOnTick = !1),
                        (n.scrollbar = new D(n.chart.renderer, n.options.scrollbar, n.chart)),
                        v(n.scrollbar, "changed", function (q) {
                            var t = F(n.options && n.options.min, n.min),
                                w = F(n.options && n.options.max, n.max),
                                v = B(n.dataMin) ? Math.min(t, n.min, n.dataMin) : t,
                                l = (B(n.dataMax) ? Math.max(w, n.max, n.dataMax) : w) - v;
                            B(t) &&
                                B(w) &&
                                ((n.horiz && !n.reversed) || (!n.horiz && n.reversed) ? ((t = v + l * this.to), (v += l * this.from)) : ((t = v + l * (1 - this.from)), (v += l * (1 - this.to))),
                                F(this.options.liveRedraw, m.svg && !m.isTouchDevice && !this.chart.isBoosting) || "mouseup" === q.DOMType || !B(q.DOMType)
                                    ? n.setExtremes(v, t, !0, "mousemove" !== q.DOMType, q)
                                    : this.setRange(this.from, this.to));
                        }));
                });
                v(n, "afterRender", function () {
                    var m = Math.min(F(this.options.min, this.min), this.min, F(this.dataMin, this.min)),
                        n = Math.max(F(this.options.max, this.max), this.max, F(this.dataMax, this.max)),
                        t = this.scrollbar,
                        w = this.axisTitleMargin + (this.titleOffset || 0),
                        v = this.chart.scrollbarsOffsets,
                        l = this.options.margin || 0;
                    t &&
                        (this.horiz
                            ? (this.opposite || (v[1] += w), t.position(this.left, this.top + this.height + 2 + v[1] - (this.opposite ? l : 0), this.width, this.height), this.opposite || (v[1] += l), (w = 1))
                            : (this.opposite && (v[0] += w), t.position(this.left + this.width + 2 + v[0] - (this.opposite ? 0 : l), this.top, this.width, this.height), this.opposite && (v[0] += l), (w = 0)),
                        (v[w] += t.size + t.options.margin),
                        isNaN(m) || isNaN(n) || !B(this.min) || !B(this.max) || this.min === this.max
                            ? t.setRange(0, 1)
                            : ((v = (this.min - m) / (n - m)), (m = (this.max - m) / (n - m)), (this.horiz && !this.reversed) || (!this.horiz && this.reversed) ? t.setRange(v, m) : t.setRange(1 - m, 1 - v)));
                });
                v(n, "afterGetOffset", function () {
                    var m = this.horiz ? 2 : 1,
                        n = this.scrollbar;
                    n && ((this.chart.scrollbarsOffsets = [0, 0]), (this.chart.axisOffset[m] += n.size + n.options.margin));
                });
            };
            return n;
        })();
    });
    O(m, "Core/Scrollbar.js", [m["Core/Axis/Axis.js"], m["Core/Globals.js"], m["Core/Axis/ScrollbarAxis.js"], m["Core/Utilities.js"], m["Core/Options.js"]], function (m, n, M, B, F) {
        var v = B.addEvent,
            K = B.correctFloat,
            D = B.defined,
            x = B.destroyObjectProperties,
            q = B.fireEvent,
            t = B.merge,
            w = B.pick,
            G = B.removeEvent;
        B = F.defaultOptions;
        var l = n.hasTouch,
            h = n.isTouchDevice,
            g = (n.swapXY = function (g, h) {
                h &&
                    g.forEach(function (e) {
                        for (var b = e.length, d, c = 0; c < b; c += 2) (d = e[c + 1]), "number" === typeof d && ((e[c + 1] = e[c + 2]), (e[c + 2] = d));
                    });
                return g;
            });
        F = (function () {
            function m(g, e, b) {
                this._events = [];
                this.from = this.chartY = this.chartX = 0;
                this.scrollbar = this.group = void 0;
                this.scrollbarButtons = [];
                this.scrollbarGroup = void 0;
                this.scrollbarLeft = 0;
                this.scrollbarRifles = void 0;
                this.scrollbarStrokeWidth = 1;
                this.to = this.size = this.scrollbarTop = 0;
                this.track = void 0;
                this.trackBorderWidth = 1;
                this.userOptions = {};
                this.y = this.x = 0;
                this.chart = b;
                this.options = e;
                this.renderer = b.renderer;
                this.init(g, e, b);
            }
            m.prototype.addEvents = function () {
                var g = this.options.inverted ? [1, 0] : [0, 1],
                    e = this.scrollbarButtons,
                    b = this.scrollbarGroup.element,
                    d = this.track.element,
                    c = this.mouseDownHandler.bind(this),
                    a = this.mouseMoveHandler.bind(this),
                    k = this.mouseUpHandler.bind(this);
                g = [
                    [e[g[0]].element, "click", this.buttonToMinClick.bind(this)],
                    [e[g[1]].element, "click", this.buttonToMaxClick.bind(this)],
                    [d, "click", this.trackClick.bind(this)],
                    [b, "mousedown", c],
                    [b.ownerDocument, "mousemove", a],
                    [b.ownerDocument, "mouseup", k],
                ];
                l && g.push([b, "touchstart", c], [b.ownerDocument, "touchmove", a], [b.ownerDocument, "touchend", k]);
                g.forEach(function (a) {
                    v.apply(null, a);
                });
                this._events = g;
            };
            m.prototype.buttonToMaxClick = function (g) {
                var e = (this.to - this.from) * w(this.options.step, 0.2);
                this.updatePosition(this.from + e, this.to + e);
                q(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: g });
            };
            m.prototype.buttonToMinClick = function (g) {
                var e = K(this.to - this.from) * w(this.options.step, 0.2);
                this.updatePosition(K(this.from - e), K(this.to - e));
                q(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: g });
            };
            m.prototype.cursorToScrollbarPosition = function (g) {
                var e = this.options;
                e = e.minWidth > this.calculatedWidth ? e.minWidth : 0;
                return { chartX: (g.chartX - this.x - this.xOffset) / (this.barWidth - e), chartY: (g.chartY - this.y - this.yOffset) / (this.barWidth - e) };
            };
            m.prototype.destroy = function () {
                var g = this.chart.scroller;
                this.removeEvents();
                ["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"].forEach(function (e) {
                    this[e] && this[e].destroy && (this[e] = this[e].destroy());
                }, this);
                g && this === g.scrollbar && ((g.scrollbar = null), x(g.scrollbarButtons));
            };
            m.prototype.drawScrollbarButton = function (h) {
                var e = this.renderer,
                    b = this.scrollbarButtons,
                    d = this.options,
                    c = this.size;
                var a = e.g().add(this.group);
                b.push(a);
                a = e.rect().addClass("RBG_charts-scrollbar-button").add(a);
                this.chart.styledMode || a.attr({ stroke: d.buttonBorderColor, "stroke-width": d.buttonBorderWidth, fill: d.buttonBackgroundColor });
                a.attr(a.crisp({ x: -0.5, y: -0.5, width: c + 1, height: c + 1, r: d.buttonBorderRadius }, a.strokeWidth()));
                a = e
                    .path(
                        g(
                            [
                                ["M", c / 2 + (h ? -1 : 1), c / 2 - 3],
                                ["L", c / 2 + (h ? -1 : 1), c / 2 + 3],
                                ["L", c / 2 + (h ? 2 : -2), c / 2],
                            ],
                            d.vertical
                        )
                    )
                    .addClass("RBG_charts-scrollbar-arrow")
                    .add(b[h]);
                this.chart.styledMode || a.attr({ fill: d.buttonArrowColor });
            };
            m.prototype.init = function (g, e, b) {
                this.scrollbarButtons = [];
                this.renderer = g;
                this.userOptions = e;
                this.options = t(m.defaultOptions, e);
                this.chart = b;
                this.size = w(this.options.size, this.options.height);
                e.enabled && (this.render(), this.addEvents());
            };
            m.prototype.mouseDownHandler = function (g) {
                g = this.chart.pointer.normalize(g);
                g = this.cursorToScrollbarPosition(g);
                this.chartX = g.chartX;
                this.chartY = g.chartY;
                this.initPositions = [this.from, this.to];
                this.grabbedCenter = !0;
            };
            m.prototype.mouseMoveHandler = function (g) {
                var e = this.chart.pointer.normalize(g),
                    b = this.options.vertical ? "chartY" : "chartX",
                    d = this.initPositions || [];
                !this.grabbedCenter ||
                    (g.touches && 0 === g.touches[0][b]) ||
                    ((e = this.cursorToScrollbarPosition(e)[b]),
                    (b = this[b]),
                    (b = e - b),
                    (this.hasDragged = !0),
                    this.updatePosition(d[0] + b, d[1] + b),
                    this.hasDragged && q(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMType: g.type, DOMEvent: g }));
            };
            m.prototype.mouseUpHandler = function (g) {
                this.hasDragged && q(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMType: g.type, DOMEvent: g });
                this.grabbedCenter = this.hasDragged = this.chartX = this.chartY = null;
            };
            m.prototype.position = function (g, e, b, d) {
                var c = this.options.vertical,
                    a = 0,
                    k = this.rendered ? "animate" : "attr";
                this.x = g;
                this.y = e + this.trackBorderWidth;
                this.width = b;
                this.xOffset = this.height = d;
                this.yOffset = a;
                c
                    ? ((this.width = this.yOffset = b = a = this.size), (this.xOffset = e = 0), (this.barWidth = d - 2 * b), (this.x = g += this.options.margin))
                    : ((this.height = this.xOffset = d = e = this.size), (this.barWidth = b - 2 * d), (this.y += this.options.margin));
                this.group[k]({ translateX: g, translateY: this.y });
                this.track[k]({ width: b, height: d });
                this.scrollbarButtons[1][k]({ translateX: c ? 0 : b - e, translateY: c ? d - a : 0 });
            };
            m.prototype.removeEvents = function () {
                this._events.forEach(function (g) {
                    G.apply(null, g);
                });
                this._events.length = 0;
            };
            m.prototype.render = function () {
                var h = this.renderer,
                    e = this.options,
                    b = this.size,
                    d = this.chart.styledMode,
                    c;
                this.group = c = h.g("scrollbar").attr({ zIndex: e.zIndex, translateY: -99999 }).add();
                this.track = h
                    .rect()
                    .addClass("RBG_charts-scrollbar-track")
                    .attr({ x: 0, r: e.trackBorderRadius || 0, height: b, width: b })
                    .add(c);
                d || this.track.attr({ fill: e.trackBackgroundColor, stroke: e.trackBorderColor, "stroke-width": e.trackBorderWidth });
                this.trackBorderWidth = this.track.strokeWidth();
                this.track.attr({ y: (-this.trackBorderWidth % 2) / 2 });
                this.scrollbarGroup = h.g().add(c);
                this.scrollbar = h
                    .rect()
                    .addClass("RBG_charts-scrollbar-thumb")
                    .attr({ height: b, width: b, r: e.barBorderRadius || 0 })
                    .add(this.scrollbarGroup);
                this.scrollbarRifles = h
                    .path(
                        g(
                            [
                                ["M", -3, b / 4],
                                ["L", -3, (2 * b) / 3],
                                ["M", 0, b / 4],
                                ["L", 0, (2 * b) / 3],
                                ["M", 3, b / 4],
                                ["L", 3, (2 * b) / 3],
                            ],
                            e.vertical
                        )
                    )
                    .addClass("RBG_charts-scrollbar-rifles")
                    .add(this.scrollbarGroup);
                d || (this.scrollbar.attr({ fill: e.barBackgroundColor, stroke: e.barBorderColor, "stroke-width": e.barBorderWidth }), this.scrollbarRifles.attr({ stroke: e.rifleColor, "stroke-width": 1 }));
                this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
                this.scrollbarGroup.translate((-this.scrollbarStrokeWidth % 2) / 2, (-this.scrollbarStrokeWidth % 2) / 2);
                this.drawScrollbarButton(0);
                this.drawScrollbarButton(1);
            };
            m.prototype.setRange = function (g, e) {
                var b = this.options,
                    d = b.vertical,
                    c = b.minWidth,
                    a = this.barWidth,
                    k,
                    h = !this.rendered || this.hasDragged || (this.chart.navigator && this.chart.navigator.hasDragged) ? "attr" : "animate";
                if (D(a)) {
                    g = Math.max(g, 0);
                    var l = Math.ceil(a * g);
                    this.calculatedWidth = k = K(a * Math.min(e, 1) - l);
                    k < c && ((l = (a - c + k) * g), (k = c));
                    c = Math.floor(l + this.xOffset + this.yOffset);
                    a = k / 2 - 0.5;
                    this.from = g;
                    this.to = e;
                    d
                        ? (this.scrollbarGroup[h]({ translateY: c }), this.scrollbar[h]({ height: k }), this.scrollbarRifles[h]({ translateY: a }), (this.scrollbarTop = c), (this.scrollbarLeft = 0))
                        : (this.scrollbarGroup[h]({ translateX: c }), this.scrollbar[h]({ width: k }), this.scrollbarRifles[h]({ translateX: a }), (this.scrollbarLeft = c), (this.scrollbarTop = 0));
                    12 >= k ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0);
                    !1 === b.showFull && (0 >= g && 1 <= e ? this.group.hide() : this.group.show());
                    this.rendered = !0;
                }
            };
            m.prototype.trackClick = function (g) {
                var e = this.chart.pointer.normalize(g),
                    b = this.to - this.from,
                    d = this.y + this.scrollbarTop,
                    c = this.x + this.scrollbarLeft;
                (this.options.vertical && e.chartY > d) || (!this.options.vertical && e.chartX > c) ? this.updatePosition(this.from + b, this.to + b) : this.updatePosition(this.from - b, this.to - b);
                q(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: g });
            };
            m.prototype.update = function (g) {
                this.destroy();
                this.init(this.chart.renderer, t(!0, this.options, g), this.chart);
            };
            m.prototype.updatePosition = function (g, e) {
                1 < e && ((g = K(1 - K(e - g))), (e = 1));
                0 > g && ((e = K(e - g)), (g = 0));
                this.from = g;
                this.to = e;
            };
            m.defaultOptions = {
                height: h ? 20 : 14,
                barBorderRadius: 0,
                buttonBorderRadius: 0,
                liveRedraw: void 0,
                margin: 10,
                minWidth: 6,
                step: 0.2,
                zIndex: 3,
                barBackgroundColor: "#cccccc",
                barBorderWidth: 1,
                barBorderColor: "#cccccc",
                buttonArrowColor: "#333333",
                buttonBackgroundColor: "#e6e6e6",
                buttonBorderColor: "#cccccc",
                buttonBorderWidth: 1,
                rifleColor: "#333333",
                trackBackgroundColor: "#f2f2f2",
                trackBorderColor: "#f2f2f2",
                trackBorderWidth: 1,
            };
            return m;
        })();
        n.Scrollbar || ((B.scrollbar = t(!0, F.defaultOptions, B.scrollbar)), (n.Scrollbar = F), M.compose(m, F));
        return n.Scrollbar;
    });
    O(m, "Extensions/RangeSelector.js", [m["Core/Axis/Axis.js"], m["Core/Chart/Chart.js"], m["Core/Globals.js"], m["Core/Options.js"], m["Core/Renderer/SVG/SVGElement.js"], m["Core/Utilities.js"]], function (m, n, M, B, F, J) {
        var v = B.defaultOptions,
            D = J.addEvent,
            x = J.createElement,
            q = J.css,
            t = J.defined,
            w = J.destroyObjectProperties,
            G = J.discardElement,
            l = J.extend,
            h = J.fireEvent,
            g = J.isNumber,
            H = J.merge,
            p = J.objectEach,
            e = J.pick,
            b = J.pInt,
            d = J.splat;
        l(v, {
            rangeSelector: {
                verticalAlign: "top",
                buttonTheme: { width: 28, height: 18, padding: 2, zIndex: 7 },
                floating: !1,
                x: 0,
                y: 0,
                height: void 0,
                inputPosition: { align: "right", x: 0, y: 0 },
                buttonPosition: { align: "left", x: 0, y: 0 },
                labelStyle: { color: "#666666" },
            },
        });
        v.lang = H(v.lang, { rangeSelectorZoom: "Zoom", rangeSelectorFrom: "From", rangeSelectorTo: "To" });
        var c = (function () {
            function a(b) {
                this.buttons = void 0;
                this.buttonOptions = a.prototype.defaultButtons;
                this.options = void 0;
                this.chart = b;
                this.init(b);
            }
            a.prototype.clickButton = function (a, b) {
                var c = this.chart,
                    k = this.buttonOptions[a],
                    h = c.xAxis[0],
                    l = (c.scroller && c.scroller.getUnionExtremes()) || h || {},
                    n = l.dataMin,
                    p = l.dataMax,
                    q = h && Math.round(Math.min(h.max, e(p, h.max))),
                    u = k.type;
                l = k._range;
                var v,
                    f = k.dataGrouping;
                if (null !== n && null !== p) {
                    c.fixedRange = l;
                    f && ((this.forcedDataGrouping = !0), m.prototype.setDataGrouping.call(h || { chart: this.chart }, f, !1), (this.frozenStates = k.preserveDataGrouping));
                    if ("month" === u || "year" === u)
                        if (h) {
                            u = { range: k, max: q, chart: c, dataMin: n, dataMax: p };
                            var r = h.minFromRange.call(u);
                            g(u.newMax) && (q = u.newMax);
                        } else l = k;
                    else if (l) (r = Math.max(q - l, n)), (q = Math.min(r + l, p));
                    else if ("ytd" === u)
                        if (h)
                            "undefined" === typeof p &&
                                ((n = Number.MAX_VALUE),
                                (p = Number.MIN_VALUE),
                                c.series.forEach(function (a) {
                                    a = a.xData;
                                    n = Math.min(a[0], n);
                                    p = Math.max(a[a.length - 1], p);
                                }),
                                (b = !1)),
                                (q = this.getYTDExtremes(p, n, c.time.useUTC)),
                                (r = v = q.min),
                                (q = q.max);
                        else {
                            this.deferredYTDClick = a;
                            return;
                        }
                    else "all" === u && h && ((r = n), (q = p));
                    t(r) && (r += k._offsetMin);
                    t(q) && (q += k._offsetMax);
                    this.setSelected(a);
                    if (h) h.setExtremes(r, q, e(b, 1), null, { trigger: "rangeSelectorButton", rangeSelectorButton: k });
                    else {
                        var w = d(c.options.xAxis)[0];
                        var x = w.range;
                        w.range = l;
                        var B = w.min;
                        w.min = v;
                        D(c, "load", function () {
                            w.range = x;
                            w.min = B;
                        });
                    }
                }
            };
            a.prototype.setSelected = function (a) {
                this.selected = this.options.selected = a;
            };
            a.prototype.init = function (a) {
                var b = this,
                    c = a.options.rangeSelector,
                    d = c.buttons || b.defaultButtons.slice(),
                    e = c.selected,
                    g = function () {
                        var a = b.minInput,
                            c = b.maxInput;
                        a && a.blur && h(a, "blur");
                        c && c.blur && h(c, "blur");
                    };
                b.chart = a;
                b.options = c;
                b.buttons = [];
                b.buttonOptions = d;
                this.unMouseDown = D(a.container, "mousedown", g);
                this.unResize = D(a, "resize", g);
                d.forEach(b.computeButtonRange);
                "undefined" !== typeof e && d[e] && this.clickButton(e, !1);
                D(a, "load", function () {
                    a.xAxis &&
                        a.xAxis[0] &&
                        D(a.xAxis[0], "setExtremes", function (c) {
                            this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger && b.forcedDataGrouping && !b.frozenStates && this.setDataGrouping(!1, !1);
                        });
                });
            };
            a.prototype.updateButtonStates = function () {
                var a = this,
                    b = this.chart,
                    c = b.xAxis[0],
                    d = Math.round(c.max - c.min),
                    e = !c.hasVisibleSeries,
                    h = (b.scroller && b.scroller.getUnionExtremes()) || c,
                    l = h.dataMin,
                    m = h.dataMax;
                b = a.getYTDExtremes(m, l, b.time.useUTC);
                var n = b.min,
                    p = b.max,
                    q = a.selected,
                    f = g(q),
                    r = a.options.allButtonsEnabled,
                    t = a.buttons;
                a.buttonOptions.forEach(function (b, g) {
                    var k = b._range,
                        h = b.type,
                        u = b.count || 1,
                        z = t[g],
                        v = 0,
                        w = b._offsetMax - b._offsetMin;
                    b = g === q;
                    var E = k > m - l,
                        y = k < c.minRange,
                        C = !1,
                        A = !1;
                    k = k === d;
                    ("month" === h || "year" === h) && d + 36e5 >= 864e5 * { month: 28, year: 365 }[h] * u - w && d - 36e5 <= 864e5 * { month: 31, year: 366 }[h] * u + w
                        ? (k = !0)
                        : "ytd" === h
                        ? ((k = p - n + w === d), (C = !b))
                        : "all" === h && ((k = c.max - c.min >= m - l), (A = !b && f && k));
                    h = !r && (E || y || A || e);
                    u = (b && k) || (k && !f && !C) || (b && a.frozenStates);
                    h ? (v = 3) : u && ((f = !0), (v = 2));
                    z.state !== v && (z.setState(v), 0 === v && q === g && a.setSelected(null));
                });
            };
            a.prototype.computeButtonRange = function (a) {
                var b = a.type,
                    c = a.count || 1,
                    d = { millisecond: 1, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, week: 6048e5 };
                if (d[b]) a._range = d[b] * c;
                else if ("month" === b || "year" === b) a._range = 864e5 * { month: 30, year: 365 }[b] * c;
                a._offsetMin = e(a.offsetMin, 0);
                a._offsetMax = e(a.offsetMax, 0);
                a._range += a._offsetMax - a._offsetMin;
            };
            a.prototype.setInputValue = function (a, b) {
                var c = this.chart.options.rangeSelector,
                    d = this.chart.time,
                    e = this[a + "Input"];
                t(b) && ((e.previousValue = e.HCTime), (e.HCTime = b));
                e.value = d.dateFormat(c.inputEditDateFormat || "%Y-%m-%d", e.HCTime);
                this[a + "DateBox"].attr({ text: d.dateFormat(c.inputDateFormat || "%b %e, %Y", e.HCTime) });
            };
            a.prototype.showInput = function (a) {
                var b = this.inputGroup,
                    c = this[a + "DateBox"];
                q(this[a + "Input"], { left: b.translateX + c.x + "px", top: b.translateY + "px", width: c.width - 2 + "px", height: c.height - 2 + "px", border: "2px solid silver" });
            };
            a.prototype.hideInput = function (a) {
                q(this[a + "Input"], { border: 0, width: "1px", height: "1px" });
                this.setInputValue(a);
            };
            a.prototype.defaultInputDateParser = function (a, b) {
                var c = new Date();
                return M.isSafari ? Date.parse(a.split(" ").join("T")) : b ? Date.parse(a + "Z") : Date.parse(a) - 6e4 * c.getTimezoneOffset();
            };
            a.prototype.drawInput = function (a) {
                function c() {
                    var a = t.value,
                        c = e.xAxis[0];
                    var f = e.scroller && e.scroller.xAxis ? e.scroller.xAxis : c;
                    var k = f.dataMin,
                        h = f.dataMax;
                    f = (m.inputDateParser || r)(a, e.time.useUTC);
                    f !== t.previousValue &&
                        ((t.previousValue = f),
                        g(f) || ((f = a.split("-")), (f = Date.UTC(b(f[0]), b(f[1]) - 1, b(f[2])))),
                        g(f) &&
                            (e.time.useUTC || (f += 6e4 * new Date().getTimezoneOffset()),
                            p ? (f > d.maxInput.HCTime ? (f = void 0) : f < k && (f = k)) : f < d.minInput.HCTime ? (f = void 0) : f > h && (f = h),
                            "undefined" !== typeof f && c.setExtremes(p ? f : c.min, p ? c.max : f, void 0, void 0, { trigger: "rangeSelectorInput" })));
                }
                var d = this,
                    e = d.chart,
                    k = e.renderer.style || {},
                    h = e.renderer,
                    m = e.options.rangeSelector,
                    n = d.div,
                    p = "min" === a,
                    t,
                    w,
                    f = this.inputGroup,
                    r = this.defaultInputDateParser;
                this[a + "Label"] = w = h
                    .label(v.lang[p ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset)
                    .addClass("RBG_charts-range-label")
                    .attr({ padding: 2 })
                    .add(f);
                f.offset += w.width + 5;
                this[a + "DateBox"] = h = h
                    .label("", f.offset)
                    .addClass("RBG_charts-range-input")
                    .attr({ padding: 2, width: m.inputBoxWidth || 90, height: m.inputBoxHeight || 17, "text-align": "center" })
                    .on("click", function () {
                        d.showInput(a);
                        d[a + "Input"].focus();
                    });
                e.styledMode || h.attr({ stroke: m.inputBoxBorderColor || "#cccccc", "stroke-width": 1 });
                h.add(f);
                f.offset += h.width + (p ? 10 : 0);
                this[a + "Input"] = t = x("input", { name: a, className: "RBG_charts-range-selector", type: "text" }, { top: e.plotTop + "px" }, n);
                e.styledMode ||
                    (w.css(H(k, m.labelStyle)),
                    h.css(H({ color: "#333333" }, k, m.inputStyle)),
                    q(t, l({ position: "absolute", border: 0, width: "1px", height: "1px", padding: 0, textAlign: "center", fontSize: k.fontSize, fontFamily: k.fontFamily, top: "-9999em" }, m.inputStyle)));
                t.onfocus = function () {
                    d.showInput(a);
                };
                t.onblur = function () {
                    t === M.doc.activeElement && c();
                    d.hideInput(a);
                    t.blur();
                };
                t.onchange = c;
                t.onkeypress = function (a) {
                    13 === a.keyCode && c();
                };
            };
            a.prototype.getPosition = function () {
                var a = this.chart,
                    b = a.options.rangeSelector;
                a = "top" === b.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
                return { buttonTop: a + b.buttonPosition.y, inputTop: a + b.inputPosition.y - 10 };
            };
            a.prototype.getYTDExtremes = function (a, b, c) {
                var d = this.chart.time,
                    e = new d.Date(a),
                    g = d.get("FullYear", e);
                c = c ? d.Date.UTC(g, 0, 1) : +new d.Date(g, 0, 1);
                b = Math.max(b || 0, c);
                e = e.getTime();
                return { max: Math.min(a || e, e), min: b };
            };
            a.prototype.render = function (a, b) {
                var c = this,
                    d = c.chart,
                    g = d.renderer,
                    h = d.container,
                    k = d.options,
                    l = k.exporting && !1 !== k.exporting.enabled && k.navigation && k.navigation.buttonOptions,
                    m = v.lang,
                    n = c.div,
                    p = k.rangeSelector,
                    f = e(k.chart.style && k.chart.style.zIndex, 0) + 1;
                k = p.floating;
                var r = c.buttons;
                n = c.inputGroup;
                var q = p.buttonTheme,
                    t = p.buttonPosition,
                    u = p.inputPosition,
                    w = p.inputEnabled,
                    B = q && q.states,
                    D = d.plotLeft,
                    G = c.buttonGroup,
                    F,
                    H = c.options.verticalAlign,
                    J = d.legend,
                    K = J && J.options,
                    M = t.y,
                    O = u.y,
                    T = d.hasLoaded,
                    ca = T ? "animate" : "attr",
                    Y = 0,
                    W = 0;
                if (!1 !== p.enabled) {
                    c.rendered ||
                        ((c.group = F = g.g("range-selector-group").attr({ zIndex: 7 }).add()),
                        (c.buttonGroup = G = g.g("range-selector-buttons").add(F)),
                        (c.zoomText = g.text(m.rangeSelectorZoom, 0, 15).add(G)),
                        d.styledMode || (c.zoomText.css(p.labelStyle), (q["stroke-width"] = e(q["stroke-width"], 0))),
                        c.buttonOptions.forEach(function (a, b) {
                            r[b] = g
                                .button(
                                    a.text,
                                    0,
                                    0,
                                    function (d) {
                                        var f = a.events && a.events.click,
                                            e;
                                        f && (e = f.call(a, d));
                                        !1 !== e && c.clickButton(b);
                                        c.isActive = !0;
                                    },
                                    q,
                                    B && B.hover,
                                    B && B.select,
                                    B && B.disabled
                                )
                                .attr({ "text-align": "center" })
                                .add(G);
                        }),
                        !1 !== w &&
                            ((c.div = n = x("div", null, { position: "relative", height: 0, zIndex: f })),
                            h.parentNode.insertBefore(n, h),
                            (c.inputGroup = n = g.g("input-group").add(F)),
                            (n.offset = 0),
                            c.drawInput("min"),
                            c.drawInput("max")));
                    c.zoomText[ca]({ x: e(D + t.x, D) });
                    var ha = e(D + t.x, D) + c.zoomText.getBBox().width + 5;
                    c.buttonOptions.forEach(function (a, b) {
                        r[b][ca]({ x: ha });
                        ha += r[b].width + e(p.buttonSpacing, 5);
                    });
                    D = d.plotLeft - d.spacing[3];
                    c.updateButtonStates();
                    l && this.titleCollision(d) && "top" === H && "right" === t.align && t.y + G.getBBox().height - 12 < (l.y || 0) + l.height && (Y = -40);
                    h = t.x - d.spacing[3];
                    "right" === t.align ? (h += Y - D) : "center" === t.align && (h -= D / 2);
                    G.align({ y: t.y, width: G.getBBox().width, align: t.align, x: h }, !0, d.spacingBox);
                    c.group.placed = T;
                    c.buttonGroup.placed = T;
                    !1 !== w &&
                        ((Y = l && this.titleCollision(d) && "top" === H && "right" === u.align && u.y - n.getBBox().height - 12 < (l.y || 0) + l.height + d.spacing[0] ? -40 : 0),
                        "left" === u.align ? (h = D) : "right" === u.align && (h = -Math.max(d.axisOffset[1], -Y)),
                        n.align({ y: u.y, width: n.getBBox().width, align: u.align, x: u.x + h - 2 }, !0, d.spacingBox),
                        (l = n.alignAttr.translateX + n.alignOptions.x - Y + n.getBBox().x + 2),
                        (h = n.alignOptions.width),
                        (m = G.alignAttr.translateX + G.getBBox().x),
                        (D = G.getBBox().width + 20),
                        (u.align === t.align || (m + D > l && l + h > m && M < O + n.getBBox().height)) &&
                            n.attr({ translateX: n.alignAttr.translateX + (d.axisOffset[1] >= -Y ? 0 : -Y), translateY: n.alignAttr.translateY + G.getBBox().height + 10 }),
                        c.setInputValue("min", a),
                        c.setInputValue("max", b),
                        (c.inputGroup.placed = T));
                    c.group.align({ verticalAlign: H }, !0, d.spacingBox);
                    a = c.group.getBBox().height + 20;
                    b = c.group.alignAttr.translateY;
                    "bottom" === H && ((J = K && "bottom" === K.verticalAlign && K.enabled && !K.floating ? J.legendHeight + e(K.margin, 10) : 0), (a = a + J - 20), (W = b - a - (k ? 0 : p.y) - (d.titleOffset ? d.titleOffset[2] : 0) - 10));
                    if ("top" === H) k && (W = 0), d.titleOffset && d.titleOffset[0] && (W = d.titleOffset[0]), (W += d.margin[0] - d.spacing[0] || 0);
                    else if ("middle" === H)
                        if (O === M) W = 0 > O ? b + void 0 : b;
                        else if (O || M) W = 0 > O || 0 > M ? W - Math.min(O, M) : b - a + NaN;
                    c.group.translate(p.x, p.y + Math.floor(W));
                    !1 !== w && ((c.minInput.style.marginTop = c.group.translateY + "px"), (c.maxInput.style.marginTop = c.group.translateY + "px"));
                    c.rendered = !0;
                }
            };
            a.prototype.getHeight = function () {
                var a = this.options,
                    b = this.group,
                    c = a.y,
                    d = a.buttonPosition.y,
                    e = a.inputPosition.y;
                if (a.height) return a.height;
                a = b ? b.getBBox(!0).height + 13 + c : 0;
                b = Math.min(e, d);
                if ((0 > e && 0 > d) || (0 < e && 0 < d)) a += Math.abs(b);
                return a;
            };
            a.prototype.titleCollision = function (a) {
                return !(a.options.title.text || a.options.subtitle.text);
            };
            a.prototype.update = function (a) {
                var b = this.chart;
                H(!0, b.options.rangeSelector, a);
                this.destroy();
                this.init(b);
                b.rangeSelector.render();
            };
            a.prototype.destroy = function () {
                var b = this,
                    c = b.minInput,
                    d = b.maxInput;
                b.unMouseDown();
                b.unResize();
                w(b.buttons);
                c && (c.onfocus = c.onblur = c.onchange = null);
                d && (d.onfocus = d.onblur = d.onchange = null);
                p(
                    b,
                    function (c, d) {
                        c && "chart" !== d && (c instanceof F ? c.destroy() : c instanceof window.HTMLElement && G(c));
                        c !== a.prototype[d] && (b[d] = null);
                    },
                    this
                );
            };
            return a;
        })();
        c.prototype.defaultButtons = [
            { type: "month", count: 1, text: "1m" },
            { type: "month", count: 3, text: "3m" },
            { type: "month", count: 6, text: "6m" },
            { type: "ytd", text: "YTD" },
            { type: "year", count: 1, text: "1y" },
            { type: "all", text: "All" },
        ];
        m.prototype.minFromRange = function () {
            var a = this.range,
                b = a.type,
                c = this.max,
                d = this.chart.time,
                h = function (a, c) {
                    var e = "year" === b ? "FullYear" : "Month",
                        g = new d.Date(a),
                        f = d.get(e, g);
                    d.set(e, g, f + c);
                    f === d.get(e, g) && d.set("Date", g, 0);
                    return g.getTime() - a;
                };
            if (g(a)) {
                var l = c - a;
                var m = a;
            } else (l = c + h(c, -a.count)), this.chart && (this.chart.fixedRange = c - l);
            var n = e(this.dataMin, Number.MIN_VALUE);
            g(l) || (l = n);
            l <= n && ((l = n), "undefined" === typeof m && (m = h(l, a.count)), (this.newMax = Math.min(l + m, this.dataMax)));
            g(c) || (l = void 0);
            return l;
        };
        M.RangeSelector ||
            (D(n, "afterGetContainer", function () {
                this.options.rangeSelector.enabled && (this.rangeSelector = new c(this));
            }),
            D(n, "beforeRender", function () {
                var a = this.axes,
                    b = this.rangeSelector;
                b &&
                    (g(b.deferredYTDClick) && (b.clickButton(b.deferredYTDClick), delete b.deferredYTDClick),
                    a.forEach(function (a) {
                        a.updateNames();
                        a.setScale();
                    }),
                    this.getAxisMargins(),
                    b.render(),
                    (a = b.options.verticalAlign),
                    b.options.floating || ("bottom" === a ? (this.extraBottomMargin = !0) : "middle" !== a && (this.extraTopMargin = !0)));
            }),
            D(n, "update", function (a) {
                var b = a.options.rangeSelector;
                a = this.rangeSelector;
                var d = this.extraBottomMargin,
                    e = this.extraTopMargin;
                b && b.enabled && !t(a) && ((this.options.rangeSelector.enabled = !0), (this.rangeSelector = new c(this)));
                this.extraTopMargin = this.extraBottomMargin = !1;
                a &&
                    (a.render(),
                    (b = (b && b.verticalAlign) || (a.options && a.options.verticalAlign)),
                    a.options.floating || ("bottom" === b ? (this.extraBottomMargin = !0) : "middle" !== b && (this.extraTopMargin = !0)),
                    this.extraBottomMargin !== d || this.extraTopMargin !== e) &&
                    (this.isDirtyBox = !0);
            }),
            D(n, "render", function () {
                var a = this.rangeSelector;
                a && !a.options.floating && (a.render(), (a = a.options.verticalAlign), "bottom" === a ? (this.extraBottomMargin = !0) : "middle" !== a && (this.extraTopMargin = !0));
            }),
            D(n, "getMargins", function () {
                var a = this.rangeSelector;
                a && ((a = a.getHeight()), this.extraTopMargin && (this.plotTop += a), this.extraBottomMargin && (this.marginBottom += a));
            }),
            n.prototype.callbacks.push(function (a) {
                function b() {
                    c = a.xAxis[0].getExtremes();
                    e = a.legend;
                    l = null === d || void 0 === d ? void 0 : d.options.verticalAlign;
                    g(c.min) && d.render(c.min, c.max);
                    d && e.display && "top" === l && l === e.options.verticalAlign && ((h = H(a.spacingBox)), (h.y = "vertical" === e.options.layout ? a.plotTop : h.y + d.getHeight()), (e.group.placed = !1), e.align(h));
                }
                var c,
                    d = a.rangeSelector,
                    e,
                    h,
                    l;
                if (d) {
                    var m = D(a.xAxis[0], "afterSetExtremes", function (a) {
                        d.render(a.min, a.max);
                    });
                    var n = D(a, "redraw", b);
                    b();
                }
                D(a, "destroy", function () {
                    d && (n(), m());
                });
            }),
            (M.RangeSelector = c));
        return M.RangeSelector;
    });
    O(m, "Core/Axis/NavigatorAxis.js", [m["Core/Globals.js"], m["Core/Utilities.js"]], function (m, n) {
        var v = m.isTouchDevice,
            B = n.addEvent,
            F = n.correctFloat,
            J = n.defined,
            K = n.isNumber,
            D = n.pick,
            x = (function () {
                function m(m) {
                    this.axis = m;
                }
                m.prototype.destroy = function () {
                    this.axis = void 0;
                };
                m.prototype.toFixedRange = function (m, n, q, l) {
                    var h = this.axis,
                        g = h.chart;
                    g = g && g.fixedRange;
                    var t = (h.pointRange || 0) / 2;
                    m = D(q, h.translate(m, !0, !h.horiz));
                    n = D(l, h.translate(n, !0, !h.horiz));
                    h = g && (n - m) / g;
                    J(q) || (m = F(m + t));
                    J(l) || (n = F(n - t));
                    0.7 < h && 1.3 > h && (l ? (m = n - g) : (n = m + g));
                    (K(m) && K(n)) || (m = n = void 0);
                    return { min: m, max: n };
                };
                return m;
            })();
        return (function () {
            function m() {}
            m.compose = function (m) {
                m.keepProps.push("navigatorAxis");
                B(m, "init", function () {
                    this.navigatorAxis || (this.navigatorAxis = new x(this));
                });
                B(m, "zoom", function (m) {
                    var n = this.chart.options,
                        l = n.navigator,
                        h = this.navigatorAxis,
                        g = n.chart.pinchType,
                        q = n.rangeSelector;
                    n = n.chart.zoomType;
                    this.isXAxis &&
                        ((l && l.enabled) || (q && q.enabled)) &&
                        ("y" === n
                            ? (m.zoomed = !1)
                            : ((!v && "xy" === n) || (v && "xy" === g)) &&
                              this.options.range &&
                              ((l = h.previousZoom), J(m.newMin) ? (h.previousZoom = [this.min, this.max]) : l && ((m.newMin = l[0]), (m.newMax = l[1]), (h.previousZoom = void 0))));
                    "undefined" !== typeof m.zoomed && m.preventDefault();
                });
            };
            m.AdditionsClass = x;
            return m;
        })();
    });
    O(
        m,
        "Core/Navigator.js",
        [
            m["Core/Axis/Axis.js"],
            m["Core/Series/Series.js"],
            m["Core/Chart/Chart.js"],
            m["Core/Color/Color.js"],
            m["Core/Globals.js"],
            m["Series/LineSeries.js"],
            m["Core/Axis/NavigatorAxis.js"],
            m["Core/Options.js"],
            m["Core/Scrollbar.js"],
            m["Core/Utilities.js"],
        ],
        function (m, n, M, B, F, J, K, D, x, q) {
            B = B.parse;
            var t = F.hasTouch,
                v = F.isTouchDevice,
                G = D.defaultOptions,
                l = q.addEvent,
                h = q.clamp,
                g = q.correctFloat,
                H = q.defined,
                p = q.destroyObjectProperties,
                e = q.erase,
                b = q.extend,
                d = q.find,
                c = q.isArray,
                a = q.isNumber,
                k = q.merge,
                u = q.pick,
                I = q.removeEvent,
                y = q.splat,
                L = function (b) {
                    for (var c = [], d = 1; d < arguments.length; d++) c[d - 1] = arguments[d];
                    c = [].filter.call(c, a);
                    if (c.length) return Math[b].apply(0, c);
                };
            n = "undefined" === typeof n.seriesTypes.areaspline ? "line" : "areaspline";
            b(G, {
                navigator: {
                    height: 40,
                    margin: 25,
                    maskInside: !0,
                    handles: { width: 7, height: 15, symbols: ["navigator-handle", "navigator-handle"], enabled: !0, lineWidth: 1, backgroundColor: "#f2f2f2", borderColor: "#999999" },
                    maskFill: B("#6685c2").setOpacity(0.3).get(),
                    outlineColor: "#cccccc",
                    outlineWidth: 1,
                    series: {
                        type: n,
                        fillOpacity: 0.05,
                        lineWidth: 1,
                        compare: null,
                        dataGrouping: {
                            approximation: "average",
                            enabled: !0,
                            groupPixelWidth: 2,
                            smoothed: !0,
                            units: [
                                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                                ["second", [1, 2, 5, 10, 15, 30]],
                                ["minute", [1, 2, 5, 10, 15, 30]],
                                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                                ["day", [1, 2, 3, 4]],
                                ["week", [1, 2, 3]],
                                ["month", [1, 3, 6]],
                                ["year", null],
                            ],
                        },
                        dataLabels: { enabled: !1, zIndex: 2 },
                        id: "RBG_charts-navigator-series",
                        className: "RBG_charts-navigator-series",
                        lineColor: null,
                        marker: { enabled: !1 },
                        threshold: null,
                    },
                    xAxis: {
                        overscroll: 0,
                        className: "RBG_charts-navigator-xaxis",
                        tickLength: 0,
                        lineWidth: 0,
                        gridLineColor: "#e6e6e6",
                        gridLineWidth: 1,
                        tickPixelInterval: 200,
                        labels: { align: "left", style: { color: "#999999" }, x: 3, y: -4 },
                        crosshair: !1,
                    },
                    yAxis: {
                        className: "RBG_charts-navigator-yaxis",
                        gridLineWidth: 0,
                        startOnTick: !1,
                        endOnTick: !1,
                        minPadding: 0.1,
                        maxPadding: 0.1,
                        labels: { enabled: !1 },
                        crosshair: !1,
                        title: { text: null },
                        tickLength: 0,
                        tickWidth: 0,
                    },
                },
            });
            F.Renderer.prototype.symbols["navigator-handle"] = function (a, b, c, d, e) {
                a = ((e && e.width) || 0) / 2;
                b = Math.round(a / 3) + 0.5;
                e = (e && e.height) || 0;
                return [
                    ["M", -a - 1, 0.5],
                    ["L", a, 0.5],
                    ["L", a, e + 0.5],
                    ["L", -a - 1, e + 0.5],
                    ["L", -a - 1, 0.5],
                    ["M", -b, 4],
                    ["L", -b, e - 3],
                    ["M", b - 1, 4],
                    ["L", b - 1, e - 3],
                ];
            };
            var O = (function () {
                function n(a) {
                    this.zoomedMin = this.zoomedMax = this.yAxis = this.xAxis = this.top = this.size = this.shades = this.rendered = this.range = this.outlineHeight = this.outline = this.opposite = this.navigatorSize = this.navigatorSeries = this.navigatorOptions = this.navigatorGroup = this.navigatorEnabled = this.left = this.height = this.handles = this.chart = this.baseSeries = void 0;
                    this.init(a);
                }
                n.prototype.drawHandle = function (a, b, c, d) {
                    var f = this.navigatorOptions.handles.height;
                    this.handles[b][d](
                        c
                            ? { translateX: Math.round(this.left + this.height / 2), translateY: Math.round(this.top + parseInt(a, 10) + 0.5 - f) }
                            : { translateX: Math.round(this.left + parseInt(a, 10)), translateY: Math.round(this.top + this.height / 2 - f / 2 - 1) }
                    );
                };
                n.prototype.drawOutline = function (a, b, c, d) {
                    var f = this.navigatorOptions.maskInside,
                        e = this.outline.strokeWidth(),
                        g = e / 2,
                        h = (e % 2) / 2;
                    e = this.outlineHeight;
                    var k = this.scrollbarHeight || 0,
                        l = this.size,
                        m = this.left - k,
                        n = this.top;
                    c
                        ? ((m -= g),
                          (c = n + b + h),
                          (b = n + a + h),
                          (h = [
                              ["M", m + e, n - k - h],
                              ["L", m + e, c],
                              ["L", m, c],
                              ["L", m, b],
                              ["L", m + e, b],
                              ["L", m + e, n + l + k],
                          ]),
                          f && h.push(["M", m + e, c - g], ["L", m + e, b + g]))
                        : ((a += m + k - h),
                          (b += m + k - h),
                          (n += g),
                          (h = [
                              ["M", m, n],
                              ["L", a, n],
                              ["L", a, n + e],
                              ["L", b, n + e],
                              ["L", b, n],
                              ["L", m + l + 2 * k, n],
                          ]),
                          f && h.push(["M", a - g, n], ["L", b + g, n]));
                    this.outline[d]({ d: h });
                };
                n.prototype.drawMasks = function (a, b, c, d) {
                    var f = this.left,
                        e = this.top,
                        g = this.height;
                    if (c) {
                        var h = [f, f, f];
                        var k = [e, e + a, e + b];
                        var l = [g, g, g];
                        var m = [a, b - a, this.size - b];
                    } else (h = [f, f + a, f + b]), (k = [e, e, e]), (l = [a, b - a, this.size - b]), (m = [g, g, g]);
                    this.shades.forEach(function (a, b) {
                        a[d]({ x: h[b], y: k[b], width: l[b], height: m[b] });
                    });
                };
                n.prototype.renderElements = function () {
                    var a = this,
                        b = a.navigatorOptions,
                        c = b.maskInside,
                        d = a.chart,
                        f = d.renderer,
                        e,
                        g = { cursor: d.inverted ? "ns-resize" : "ew-resize" };
                    a.navigatorGroup = e = f.g("navigator").attr({ zIndex: 8, visibility: "hidden" }).add();
                    [!c, c, !c].forEach(function (c, h) {
                        a.shades[h] = f
                            .rect()
                            .addClass("RBG_charts-navigator-mask" + (1 === h ? "-inside" : "-outside"))
                            .add(e);
                        d.styledMode || a.shades[h].attr({ fill: c ? b.maskFill : "rgba(0,0,0,0)" }).css(1 === h && g);
                    });
                    a.outline = f.path().addClass("RBG_charts-navigator-outline").add(e);
                    d.styledMode || a.outline.attr({ "stroke-width": b.outlineWidth, stroke: b.outlineColor });
                    b.handles.enabled &&
                        [0, 1].forEach(function (c) {
                            b.handles.inverted = d.inverted;
                            a.handles[c] = f.symbol(b.handles.symbols[c], -b.handles.width / 2 - 1, 0, b.handles.width, b.handles.height, b.handles);
                            a.handles[c]
                                .attr({ zIndex: 7 - c })
                                .addClass("RBG_charts-navigator-handle RBG_charts-navigator-handle-" + ["left", "right"][c])
                                .add(e);
                            if (!d.styledMode) {
                                var h = b.handles;
                                a.handles[c].attr({ fill: h.backgroundColor, stroke: h.borderColor, "stroke-width": h.lineWidth }).css(g);
                            }
                        });
                };
                n.prototype.update = function (a) {
                    (this.series || []).forEach(function (a) {
                        a.baseSeries && delete a.baseSeries.navigatorSeries;
                    });
                    this.destroy();
                    k(!0, this.chart.options.navigator, this.options, a);
                    this.init(this.chart);
                };
                n.prototype.render = function (b, c, d, e) {
                    var f = this.chart,
                        k = this.scrollbarHeight,
                        l,
                        m = this.xAxis,
                        n = m.pointRange || 0;
                    var p = m.navigatorAxis.fake ? f.xAxis[0] : m;
                    var q = this.navigatorEnabled,
                        t,
                        z = this.rendered;
                    var v = f.inverted;
                    var w = f.xAxis[0].minRange,
                        x = f.xAxis[0].options.maxRange;
                    if (!this.hasDragged || H(d)) {
                        b = g(b - n / 2);
                        c = g(c + n / 2);
                        if (!a(b) || !a(c))
                            if (z) (d = 0), (e = u(m.width, p.width));
                            else return;
                        this.left = u(m.left, f.plotLeft + k + (v ? f.plotWidth : 0));
                        this.size = t = l = u(m.len, (v ? f.plotHeight : f.plotWidth) - 2 * k);
                        f = v ? k : l + 2 * k;
                        d = u(d, m.toPixels(b, !0));
                        e = u(e, m.toPixels(c, !0));
                        (a(d) && Infinity !== Math.abs(d)) || ((d = 0), (e = f));
                        b = m.toValue(d, !0);
                        c = m.toValue(e, !0);
                        var E = Math.abs(g(c - b));
                        E < w
                            ? this.grabbedLeft
                                ? (d = m.toPixels(c - w - n, !0))
                                : this.grabbedRight && (e = m.toPixels(b + w + n, !0))
                            : H(x) && g(E - n) > x && (this.grabbedLeft ? (d = m.toPixels(c - x - n, !0)) : this.grabbedRight && (e = m.toPixels(b + x + n, !0)));
                        this.zoomedMax = h(Math.max(d, e), 0, t);
                        this.zoomedMin = h(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(d, e), 0, t);
                        this.range = this.zoomedMax - this.zoomedMin;
                        t = Math.round(this.zoomedMax);
                        d = Math.round(this.zoomedMin);
                        q &&
                            (this.navigatorGroup.attr({ visibility: "visible" }),
                            (z = z && !this.hasDragged ? "animate" : "attr"),
                            this.drawMasks(d, t, v, z),
                            this.drawOutline(d, t, v, z),
                            this.navigatorOptions.handles.enabled && (this.drawHandle(d, 0, v, z), this.drawHandle(t, 1, v, z)));
                        this.scrollbar &&
                            (v ? ((v = this.top - k), (p = this.left - k + (q || !p.opposite ? 0 : (p.titleOffset || 0) + p.axisTitleMargin)), (k = l + 2 * k)) : ((v = this.top + (q ? this.height : -k)), (p = this.left - k)),
                            this.scrollbar.position(p, v, f, k),
                            this.scrollbar.setRange(this.zoomedMin / (l || 1), this.zoomedMax / (l || 1)));
                        this.rendered = !0;
                    }
                };
                n.prototype.addMouseEvents = function () {
                    var a = this,
                        b = a.chart,
                        c = b.container,
                        d = [],
                        f,
                        e;
                    a.mouseMoveHandler = f = function (b) {
                        a.onMouseMove(b);
                    };
                    a.mouseUpHandler = e = function (b) {
                        a.onMouseUp(b);
                    };
                    d = a.getPartsEvents("mousedown");
                    d.push(l(b.renderTo, "mousemove", f), l(c.ownerDocument, "mouseup", e));
                    t && (d.push(l(b.renderTo, "touchmove", f), l(c.ownerDocument, "touchend", e)), d.concat(a.getPartsEvents("touchstart")));
                    a.eventsToUnbind = d;
                    a.series &&
                        a.series[0] &&
                        d.push(
                            l(a.series[0].xAxis, "foundExtremes", function () {
                                b.navigator.modifyNavigatorAxisExtremes();
                            })
                        );
                };
                n.prototype.getPartsEvents = function (a) {
                    var b = this,
                        c = [];
                    ["shades", "handles"].forEach(function (d) {
                        b[d].forEach(function (f, e) {
                            c.push(
                                l(f.element, a, function (a) {
                                    b[d + "Mousedown"](a, e);
                                })
                            );
                        });
                    });
                    return c;
                };
                n.prototype.shadesMousedown = function (a, b) {
                    a = this.chart.pointer.normalize(a);
                    var c = this.chart,
                        d = this.xAxis,
                        f = this.zoomedMin,
                        e = this.left,
                        g = this.size,
                        h = this.range,
                        k = a.chartX;
                    c.inverted && ((k = a.chartY), (e = this.top));
                    if (1 === b) (this.grabbedCenter = k), (this.fixedWidth = h), (this.dragOffset = k - f);
                    else {
                        a = k - e - h / 2;
                        if (0 === b) a = Math.max(0, a);
                        else if (2 === b && a + h >= g)
                            if (((a = g - h), this.reversedExtremes)) {
                                a -= h;
                                var l = this.getUnionExtremes().dataMin;
                            } else var m = this.getUnionExtremes().dataMax;
                        a !== f && ((this.fixedWidth = h), (b = d.navigatorAxis.toFixedRange(a, a + h, l, m)), H(b.min) && c.xAxis[0].setExtremes(Math.min(b.min, b.max), Math.max(b.min, b.max), !0, null, { trigger: "navigator" }));
                    }
                };
                n.prototype.handlesMousedown = function (a, b) {
                    this.chart.pointer.normalize(a);
                    a = this.chart;
                    var c = a.xAxis[0],
                        d = this.reversedExtremes;
                    0 === b
                        ? ((this.grabbedLeft = !0), (this.otherHandlePos = this.zoomedMax), (this.fixedExtreme = d ? c.min : c.max))
                        : ((this.grabbedRight = !0), (this.otherHandlePos = this.zoomedMin), (this.fixedExtreme = d ? c.max : c.min));
                    a.fixedRange = null;
                };
                n.prototype.onMouseMove = function (a) {
                    var b = this,
                        c = b.chart,
                        d = b.left,
                        f = b.navigatorSize,
                        e = b.range,
                        g = b.dragOffset,
                        h = c.inverted;
                    (a.touches && 0 === a.touches[0].pageX) ||
                        ((a = c.pointer.normalize(a)),
                        (c = a.chartX),
                        h && ((d = b.top), (c = a.chartY)),
                        b.grabbedLeft
                            ? ((b.hasDragged = !0), b.render(0, 0, c - d, b.otherHandlePos))
                            : b.grabbedRight
                            ? ((b.hasDragged = !0), b.render(0, 0, b.otherHandlePos, c - d))
                            : b.grabbedCenter && ((b.hasDragged = !0), c < g ? (c = g) : c > f + g - e && (c = f + g - e), b.render(0, 0, c - g, c - g + e)),
                        b.hasDragged &&
                            b.scrollbar &&
                            u(b.scrollbar.options.liveRedraw, F.svg && !v && !this.chart.isBoosting) &&
                            ((a.DOMType = a.type),
                            setTimeout(function () {
                                b.onMouseUp(a);
                            }, 0)));
                };
                n.prototype.onMouseUp = function (b) {
                    var c = this.chart,
                        d = this.xAxis,
                        e = this.scrollbar,
                        f = b.DOMEvent || b,
                        g = c.inverted,
                        h = this.rendered && !this.hasDragged ? "animate" : "attr";
                    if ((this.hasDragged && (!e || !e.hasDragged)) || "scrollbar" === b.trigger) {
                        e = this.getUnionExtremes();
                        if (this.zoomedMin === this.otherHandlePos) var k = this.fixedExtreme;
                        else if (this.zoomedMax === this.otherHandlePos) var l = this.fixedExtreme;
                        this.zoomedMax === this.size && (l = this.reversedExtremes ? e.dataMin : e.dataMax);
                        0 === this.zoomedMin && (k = this.reversedExtremes ? e.dataMax : e.dataMin);
                        d = d.navigatorAxis.toFixedRange(this.zoomedMin, this.zoomedMax, k, l);
                        H(d.min) && c.xAxis[0].setExtremes(Math.min(d.min, d.max), Math.max(d.min, d.max), !0, this.hasDragged ? !1 : null, { trigger: "navigator", triggerOp: "navigator-drag", DOMEvent: f });
                    }
                    "mousemove" !== b.DOMType &&
                        "touchmove" !== b.DOMType &&
                        (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null);
                    this.navigatorEnabled &&
                        a(this.zoomedMin) &&
                        a(this.zoomedMax) &&
                        ((c = Math.round(this.zoomedMin)),
                        (b = Math.round(this.zoomedMax)),
                        this.shades && this.drawMasks(c, b, g, h),
                        this.outline && this.drawOutline(c, b, g, h),
                        this.navigatorOptions.handles.enabled && Object.keys(this.handles).length === this.handles.length && (this.drawHandle(c, 0, g, h), this.drawHandle(b, 1, g, h)));
                };
                n.prototype.removeEvents = function () {
                    this.eventsToUnbind &&
                        (this.eventsToUnbind.forEach(function (a) {
                            a();
                        }),
                        (this.eventsToUnbind = void 0));
                    this.removeBaseSeriesEvents();
                };
                n.prototype.removeBaseSeriesEvents = function () {
                    var a = this.baseSeries || [];
                    this.navigatorEnabled &&
                        a[0] &&
                        (!1 !== this.navigatorOptions.adaptToUpdatedData &&
                            a.forEach(function (a) {
                                I(a, "updatedData", this.updatedDataHandler);
                            }, this),
                        a[0].xAxis && I(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
                };
                n.prototype.init = function (a) {
                    var b = a.options,
                        c = b.navigator,
                        d = c.enabled,
                        f = b.scrollbar,
                        e = f.enabled;
                    b = d ? c.height : 0;
                    var g = e ? f.height : 0;
                    this.handles = [];
                    this.shades = [];
                    this.chart = a;
                    this.setBaseSeries();
                    this.height = b;
                    this.scrollbarHeight = g;
                    this.scrollbarEnabled = e;
                    this.navigatorEnabled = d;
                    this.navigatorOptions = c;
                    this.scrollbarOptions = f;
                    this.outlineHeight = b + g;
                    this.opposite = u(c.opposite, !(d || !a.inverted));
                    var h = this;
                    d = h.baseSeries;
                    f = a.xAxis.length;
                    e = a.yAxis.length;
                    var n = (d && d[0] && d[0].xAxis) || a.xAxis[0] || { options: {} };
                    a.isDirtyBox = !0;
                    h.navigatorEnabled
                        ? ((h.xAxis = new m(
                              a,
                              k(
                                  { breaks: n.options.breaks, ordinal: n.options.ordinal },
                                  c.xAxis,
                                  {
                                      id: "navigator-x-axis",
                                      yAxis: "navigator-y-axis",
                                      isX: !0,
                                      type: "datetime",
                                      index: f,
                                      isInternal: !0,
                                      offset: 0,
                                      keepOrdinalPadding: !0,
                                      startOnTick: !1,
                                      endOnTick: !1,
                                      minPadding: 0,
                                      maxPadding: 0,
                                      zoomEnabled: !1,
                                  },
                                  a.inverted ? { offsets: [g, 0, -g, 0], width: b } : { offsets: [0, -g, 0, g], height: b }
                              )
                          )),
                          (h.yAxis = new m(
                              a,
                              k(
                                  c.yAxis,
                                  { id: "navigator-y-axis", alignTicks: !1, offset: 0, index: e, isInternal: !0, reversed: u(c.yAxis && c.yAxis.reversed, a.yAxis[0] && a.yAxis[0].reversed, !1), zoomEnabled: !1 },
                                  a.inverted ? { width: b } : { height: b }
                              )
                          )),
                          d || c.series.data
                              ? h.updateNavigatorSeries(!1)
                              : 0 === a.series.length &&
                                (h.unbindRedraw = l(a, "beforeRedraw", function () {
                                    0 < a.series.length && !h.series && (h.setBaseSeries(), h.unbindRedraw());
                                })),
                          (h.reversedExtremes = (a.inverted && !h.xAxis.reversed) || (!a.inverted && h.xAxis.reversed)),
                          h.renderElements(),
                          h.addMouseEvents())
                        : ((h.xAxis = {
                              chart: a,
                              navigatorAxis: { fake: !0 },
                              translate: function (b, c) {
                                  var d = a.xAxis[0],
                                      e = d.getExtremes(),
                                      f = d.len - 2 * g,
                                      h = L("min", d.options.min, e.dataMin);
                                  d = L("max", d.options.max, e.dataMax) - h;
                                  return c ? (b * d) / f + h : (f * (b - h)) / d;
                              },
                              toPixels: function (a) {
                                  return this.translate(a);
                              },
                              toValue: function (a) {
                                  return this.translate(a, !0);
                              },
                          }),
                          (h.xAxis.navigatorAxis.axis = h.xAxis),
                          (h.xAxis.navigatorAxis.toFixedRange = K.AdditionsClass.prototype.toFixedRange.bind(h.xAxis.navigatorAxis)));
                    a.options.scrollbar.enabled &&
                        ((a.scrollbar = h.scrollbar = new x(a.renderer, k(a.options.scrollbar, { margin: h.navigatorEnabled ? 0 : 10, vertical: a.inverted }), a)),
                        l(h.scrollbar, "changed", function (b) {
                            var c = h.size,
                                d = c * this.to;
                            c *= this.from;
                            h.hasDragged = h.scrollbar.hasDragged;
                            h.render(0, 0, c, d);
                            (a.options.scrollbar.liveRedraw || ("mousemove" !== b.DOMType && "touchmove" !== b.DOMType)) &&
                                setTimeout(function () {
                                    h.onMouseUp(b);
                                });
                        }));
                    h.addBaseSeriesEvents();
                    h.addChartEvents();
                };
                n.prototype.getUnionExtremes = function (a) {
                    var b = this.chart.xAxis[0],
                        c = this.xAxis,
                        d = c.options,
                        e = b.options,
                        g;
                    (a && null === b.dataMin) || (g = { dataMin: u(d && d.min, L("min", e.min, b.dataMin, c.dataMin, c.min)), dataMax: u(d && d.max, L("max", e.max, b.dataMax, c.dataMax, c.max)) });
                    return g;
                };
                n.prototype.setBaseSeries = function (a, b) {
                    var c = this.chart,
                        e = (this.baseSeries = []);
                    a =
                        a ||
                        (c.options && c.options.navigator.baseSeries) ||
                        (c.series.length
                            ? d(c.series, function (a) {
                                  return !a.options.isInternal;
                              }).index
                            : 0);
                    (c.series || []).forEach(function (b, c) {
                        b.options.isInternal || (!b.options.showInNavigator && ((c !== a && b.options.id !== a) || !1 === b.options.showInNavigator)) || e.push(b);
                    });
                    this.xAxis && !this.xAxis.navigatorAxis.fake && this.updateNavigatorSeries(!0, b);
                };
                n.prototype.updateNavigatorSeries = function (a, d) {
                    var e = this,
                        g = e.chart,
                        f = e.baseSeries,
                        h,
                        l,
                        m = e.navigatorOptions.series,
                        n,
                        p = {
                            enableMouseTracking: !1,
                            index: null,
                            linkedTo: null,
                            group: "nav",
                            padXAxis: !1,
                            xAxis: "navigator-x-axis",
                            yAxis: "navigator-y-axis",
                            showInLegend: !1,
                            stacking: void 0,
                            isInternal: !0,
                            states: { inactive: { opacity: 1 } },
                        },
                        q = (e.series = (e.series || []).filter(function (a) {
                            var b = a.baseSeries;
                            return 0 > f.indexOf(b) ? (b && (I(b, "updatedData", e.updatedDataHandler), delete b.navigatorSeries), a.chart && a.destroy(), !1) : !0;
                        }));
                    f &&
                        f.length &&
                        f.forEach(function (a) {
                            var r = a.navigatorSeries,
                                t = b({ color: a.color, visible: a.visible }, c(m) ? G.navigator.series : m);
                            (r && !1 === e.navigatorOptions.adaptToUpdatedData) ||
                                ((p.name = "Navigator " + f.length),
                                (h = a.options || {}),
                                (n = h.navigatorOptions || {}),
                                (l = k(h, p, t, n)),
                                (l.pointRange = u(t.pointRange, n.pointRange, G.plotOptions[l.type || "line"].pointRange)),
                                (t = n.data || t.data),
                                (e.hasNavigatorData = e.hasNavigatorData || !!t),
                                (l.data = t || (h.data && h.data.slice(0))),
                                r && r.options ? r.update(l, d) : ((a.navigatorSeries = g.initSeries(l)), (a.navigatorSeries.baseSeries = a), q.push(a.navigatorSeries)));
                        });
                    if ((m.data && (!f || !f.length)) || c(m))
                        (e.hasNavigatorData = !1),
                            (m = y(m)),
                            m.forEach(function (a, b) {
                                p.name = "Navigator " + (q.length + 1);
                                l = k(G.navigator.series, { color: (g.series[b] && !g.series[b].options.isInternal && g.series[b].color) || g.options.colors[b] || g.options.colors[0] }, p, a);
                                l.data = a.data;
                                l.data && ((e.hasNavigatorData = !0), q.push(g.initSeries(l)));
                            });
                    a && this.addBaseSeriesEvents();
                };
                n.prototype.addBaseSeriesEvents = function () {
                    var a = this,
                        b = a.baseSeries || [];
                    b[0] && b[0].xAxis && l(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes);
                    b.forEach(function (b) {
                        l(b, "show", function () {
                            this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1);
                        });
                        l(b, "hide", function () {
                            this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1);
                        });
                        !1 !== this.navigatorOptions.adaptToUpdatedData && b.xAxis && l(b, "updatedData", this.updatedDataHandler);
                        l(b, "remove", function () {
                            this.navigatorSeries && (e(a.series, this.navigatorSeries), H(this.navigatorSeries.options) && this.navigatorSeries.remove(!1), delete this.navigatorSeries);
                        });
                    }, this);
                };
                n.prototype.getBaseSeriesMin = function (a) {
                    return this.baseSeries.reduce(function (a, b) {
                        return Math.min(a, b.xData ? b.xData[0] : a);
                    }, a);
                };
                n.prototype.modifyNavigatorAxisExtremes = function () {
                    var a = this.xAxis,
                        b;
                    "undefined" !== typeof a.getExtremes && (!(b = this.getUnionExtremes(!0)) || (b.dataMin === a.min && b.dataMax === a.max) || ((a.min = b.dataMin), (a.max = b.dataMax)));
                };
                n.prototype.modifyBaseAxisExtremes = function () {
                    var b = this.chart.navigator,
                        c = this.getExtremes(),
                        d = c.dataMin,
                        e = c.dataMax;
                    c = c.max - c.min;
                    var f = b.stickToMin,
                        g = b.stickToMax,
                        h = u(this.options.overscroll, 0),
                        k = b.series && b.series[0],
                        l = !!this.setExtremes;
                    if (!this.eventArgs || "rangeSelectorButton" !== this.eventArgs.trigger) {
                        if (f) {
                            var m = d;
                            var n = m + c;
                        }
                        g && ((n = e + h), f || (m = Math.max(d, n - c, b.getBaseSeriesMin(k && k.xData ? k.xData[0] : -Number.MAX_VALUE))));
                        l && (f || g) && a(m) && ((this.min = this.userMin = m), (this.max = this.userMax = n));
                    }
                    b.stickToMin = b.stickToMax = null;
                };
                n.prototype.updatedDataHandler = function () {
                    var b = this.chart.navigator,
                        c = this.navigatorSeries,
                        d = b.getBaseSeriesMin(this.xData[0]);
                    b.stickToMax = b.reversedExtremes ? 0 === Math.round(b.zoomedMin) : Math.round(b.zoomedMax) >= Math.round(b.size);
                    b.stickToMin = a(this.xAxis.min) && this.xAxis.min <= d && (!this.chart.fixedRange || !b.stickToMax);
                    c && !b.hasNavigatorData && ((c.options.pointStart = this.xData[0]), c.setData(this.options.data, !1, null, !1));
                };
                n.prototype.addChartEvents = function () {
                    this.eventsToUnbind || (this.eventsToUnbind = []);
                    this.eventsToUnbind.push(
                        l(this.chart, "redraw", function () {
                            var a = this.navigator,
                                b = a && ((a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis) || this.xAxis[0]);
                            b && a.render(b.min, b.max);
                        }),
                        l(this.chart, "getMargins", function () {
                            var a = this.navigator,
                                b = a.opposite ? "plotTop" : "marginBottom";
                            this.inverted && (b = a.opposite ? "marginRight" : "plotLeft");
                            this[b] = (this[b] || 0) + (a.navigatorEnabled || !this.inverted ? a.outlineHeight : 0) + a.navigatorOptions.margin;
                        })
                    );
                };
                n.prototype.destroy = function () {
                    this.removeEvents();
                    this.xAxis && (e(this.chart.xAxis, this.xAxis), e(this.chart.axes, this.xAxis));
                    this.yAxis && (e(this.chart.yAxis, this.yAxis), e(this.chart.axes, this.yAxis));
                    (this.series || []).forEach(function (a) {
                        a.destroy && a.destroy();
                    });
                    "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" ").forEach(function (a) {
                        this[a] && this[a].destroy && this[a].destroy();
                        this[a] = null;
                    }, this);
                    [this.handles].forEach(function (a) {
                        p(a);
                    }, this);
                };
                return n;
            })();
            F.Navigator ||
                ((F.Navigator = O),
                K.compose(m),
                l(M, "beforeShowResetZoom", function () {
                    var a = this.options,
                        b = a.navigator,
                        c = a.rangeSelector;
                    if (((b && b.enabled) || (c && c.enabled)) && ((!v && "x" === a.chart.zoomType) || (v && "x" === a.chart.pinchType))) return !1;
                }),
                l(M, "beforeRender", function () {
                    var a = this.options;
                    if (a.navigator.enabled || a.scrollbar.enabled) this.scroller = this.navigator = new O(this);
                }),
                l(M, "afterSetChartSize", function () {
                    var a = this.legend,
                        b = this.navigator;
                    if (b) {
                        var c = a && a.options;
                        var d = b.xAxis;
                        var e = b.yAxis;
                        var f = b.scrollbarHeight;
                        this.inverted
                            ? ((b.left = b.opposite ? this.chartWidth - f - b.height : this.spacing[3] + f), (b.top = this.plotTop + f))
                            : ((b.left = this.plotLeft + f),
                              (b.top =
                                  b.navigatorOptions.top ||
                                  this.chartHeight -
                                      b.height -
                                      f -
                                      this.spacing[2] -
                                      (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) -
                                      (c && "bottom" === c.verticalAlign && "proximate" !== c.layout && c.enabled && !c.floating ? a.legendHeight + u(c.margin, 10) : 0) -
                                      (this.titleOffset ? this.titleOffset[2] : 0)));
                        d && e && (this.inverted ? (d.options.left = e.options.left = b.left) : (d.options.top = e.options.top = b.top), d.setAxisSize(), e.setAxisSize());
                    }
                }),
                l(M, "update", function (a) {
                    var b = a.options.navigator || {},
                        c = a.options.scrollbar || {};
                    this.navigator || this.scroller || (!b.enabled && !c.enabled) || (k(!0, this.options.navigator, b), k(!0, this.options.scrollbar, c), delete a.options.navigator, delete a.options.scrollbar);
                }),
                l(M, "afterUpdate", function (a) {
                    this.navigator || this.scroller || (!this.options.navigator.enabled && !this.options.scrollbar.enabled) || ((this.scroller = this.navigator = new O(this)), u(a.redraw, !0) && this.redraw(a.animation));
                }),
                l(M, "afterAddSeries", function () {
                    this.navigator && this.navigator.setBaseSeries(null, !1);
                }),
                l(J, "afterUpdate", function () {
                    this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, !1);
                }),
                M.prototype.callbacks.push(function (a) {
                    var b = a.navigator;
                    b && a.xAxis[0] && ((a = a.xAxis[0].getExtremes()), b.render(a.min, a.max));
                }));
            F.Navigator = O;
            return F.Navigator;
        }
    );
    O(m, "masters/modules/gantt.src.js", [], function () {});
    O(m, "masters/RBG_charts-gantt.src.js", [m["masters/RBG_charts.src.js"]], function (m) {
        m.product = "RBGcharts Gantt";
        return m;
    });
    m["masters/RBG_charts-gantt.src.js"]._modules = m;
    return m["masters/RBG_charts-gantt.src.js"];
});
//# sourceMappingURL=RBG_charts-gantt.js.map
