/*
 RBGcharts JS v8.2.2 (2020-10-22)

 Sankey diagram module

 (c) 2010-2019 Torstein Honsi

 License: www.RBG_charts.com/license
*/
(function (b) {
    "object" === typeof module && module.exports
        ? ((b["default"] = b), (module.exports = b))
        : "function" === typeof define && define.amd
        ? define("RBG_charts/modules/sankey", ["RBG_charts"], function (m) {
            b(m);
            b.RBGcharts = m;
            return b;
        })
        : b("undefined" !== typeof RBGcharts ? RBGcharts : void 0);
})(function (b) {
    function m(b, d, l, v) {
        b.hasOwnProperty(d) || (b[d] = v.apply(null, l));
    }
    b = b ? b._modules : {};
    m(b, "Mixins/Nodes.js", [b["Core/Globals.js"], b["Core/Series/Point.js"], b["Core/Utilities.js"]], function (b, d, l) {
        var v = l.defined,
            m = l.extend,
            g = l.find,
            u = l.pick;
        return (b.NodesMixin = {
            createNode: function (b) {
                function c(a, c) {
                    return g(a, function (a) {
                        return a.id === c;
                    });
                }
                var a = c(this.nodes, b),
                    r = this.pointClass;
                if (!a) {
                    var d = this.options.nodes && c(this.options.nodes, b);
                    a = new r().init(this, m({ className: "RBG_charts-node", isNode: !0, id: b, y: 1 }, d));
                    a.linksTo = [];
                    a.linksFrom = [];
                    a.formatPrefix = "node";
                    a.name = a.name || a.options.id || "";
                    a.mass = u(a.options.mass, a.options.marker && a.options.marker.radius, this.options.marker && this.options.marker.radius, 4);
                    a.getSum = function () {
                        var c = 0,
                            b = 0;
                        a.linksTo.forEach(function (a) {
                            c += a.weight;
                        });
                        a.linksFrom.forEach(function (a) {
                            b += a.weight;
                        });
                        return Math.max(c, b);
                    };
                    a.offset = function (c, b) {
                        for (var r = 0, k = 0; k < a[b].length; k++) {
                            if (a[b][k] === c) return r;
                            r += a[b][k].weight;
                        }
                    };
                    a.hasShape = function () {
                        var c = 0;
                        a.linksTo.forEach(function (a) {
                            a.outgoing && c++;
                        });
                        return !a.linksTo.length || c !== a.linksTo.length;
                    };
                    this.nodes.push(a);
                }
                return a;
            },
            generatePoints: function () {
                var d = this.chart,
                    c = {};
                b.Series.prototype.generatePoints.call(this);
                this.nodes || (this.nodes = []);
                this.colorCounter = 0;
                this.nodes.forEach(function (a) {
                    a.linksFrom.length = 0;
                    a.linksTo.length = 0;
                    a.level = a.options.level;
                });
                this.points.forEach(function (a) {
                    v(a.from) &&
                        (c[a.from] || (c[a.from] = this.createNode(a.from)),
                        c[a.from].linksFrom.push(a),
                        (a.fromNode = c[a.from]),
                        d.styledMode ? (a.colorIndex = u(a.options.colorIndex, c[a.from].colorIndex)) : (a.color = a.options.color || c[a.from].color));
                    v(a.to) && (c[a.to] || (c[a.to] = this.createNode(a.to)), c[a.to].linksTo.push(a), (a.toNode = c[a.to]));
                    a.name = a.name || a.id;
                }, this);
                this.nodeLookup = c;
            },
            setData: function () {
                this.nodes &&
                    (this.nodes.forEach(function (b) {
                        b.destroy();
                    }),
                    (this.nodes.length = 0));
                b.Series.prototype.setData.apply(this, arguments);
            },
            destroy: function () {
                this.data = [].concat(this.points || [], this.nodes);
                return b.Series.prototype.destroy.apply(this, arguments);
            },
            setNodeState: function (b) {
                var c = arguments,
                    a = this.isNode ? this.linksTo.concat(this.linksFrom) : [this.fromNode, this.toNode];
                "select" !== b &&
                    a.forEach(function (a) {
                        a && a.series && (d.prototype.setState.apply(a, c), a.isNode || (a.fromNode.graphic && d.prototype.setState.apply(a.fromNode, c), a.toNode && a.toNode.graphic && d.prototype.setState.apply(a.toNode, c)));
                    });
                d.prototype.setState.apply(this, c);
            },
        });
    });
    m(b, "Mixins/TreeSeries.js", [b["Core/Color/Color.js"], b["Core/Utilities.js"]], function (b, d) {
        var l = d.extend,
            m = d.isArray,
            w = d.isNumber,
            g = d.isObject,
            u = d.merge,
            q = d.pick;
        return {
            getColor: function (c, a) {
                var r = a.index,
                    d = a.mapOptionsToLevel,
                    g = a.parentColor,
                    l = a.parentColorIndex,
                    x = a.series,
                    k = a.colors,
                    C = a.siblings,
                    e = x.points,
                    n = x.chart.options.chart,
                    h;
                if (c) {
                    e = e[c.i];
                    c = d[c.level] || {};
                    if ((d = e && c.colorByPoint)) {
                        var z = e.index % (k ? k.length : n.colorCount);
                        var D = k && k[z];
                    }
                    if (!x.chart.styledMode) {
                        k = e && e.options.color;
                        n = c && c.color;
                        if ((h = g))
                            h =
                                (h = c && c.colorVariation) && "brightness" === h.key
                                    ? b
                                          .parse(g)
                                          .brighten((r / C) * h.to)
                                          .get()
                                    : g;
                        h = q(k, n, D, h, x.color);
                    }
                    var M = q(e && e.options.colorIndex, c && c.colorIndex, z, l, a.colorIndex);
                }
                return { color: h, colorIndex: M };
            },
            getLevelOptions: function (c) {
                var a = null;
                if (g(c)) {
                    a = {};
                    var b = w(c.from) ? c.from : 1;
                    var d = c.levels;
                    var y = {};
                    var q = g(c.defaults) ? c.defaults : {};
                    m(d) &&
                        (y = d.reduce(function (a, c) {
                            if (g(c) && w(c.level)) {
                                var d = u({}, c);
                                var e = "boolean" === typeof d.levelIsConstant ? d.levelIsConstant : q.levelIsConstant;
                                delete d.levelIsConstant;
                                delete d.level;
                                c = c.level + (e ? 0 : b - 1);
                                g(a[c]) ? l(a[c], d) : (a[c] = d);
                            }
                            return a;
                        }, {}));
                    d = w(c.to) ? c.to : 1;
                    for (c = 0; c <= d; c++) a[c] = u({}, q, g(y[c]) ? y[c] : {});
                }
                return a;
            },
            setTreeValues: function L(a, b) {
                var d = b.before,
                    g = b.idRoot,
                    r = b.mapIdToNode[g],
                    k = b.points[a.i],
                    m = (k && k.options) || {},
                    e = 0,
                    n = [];
                l(a, { levelDynamic: a.level - (("boolean" === typeof b.levelIsConstant ? b.levelIsConstant : 1) ? 0 : r.level), name: q(k && k.name, ""), visible: g === a.id || ("boolean" === typeof b.visible ? b.visible : !1) });
                "function" === typeof d && (a = d(a, b));
                a.children.forEach(function (h, z) {
                    var D = l({}, b);
                    l(D, { index: z, siblings: a.children.length, visible: a.visible });
                    h = L(h, D);
                    n.push(h);
                    h.visible && (e += h.val);
                });
                a.visible = 0 < e || a.visible;
                d = q(m.value, e);
                l(a, { children: n, childrenTotal: e, isLeaf: a.visible && !e, val: d });
                return a;
            },
            updateRootId: function (a) {
                if (g(a)) {
                    var b = g(a.options) ? a.options : {};
                    b = q(a.rootNode, b.rootId, "");
                    g(a.userOptions) && (a.userOptions.rootId = b);
                    a.rootNode = b;
                }
                return b;
            },
        };
    });
    m(
        b,
        "Series/SankeySeries.js",
        [
            b["Core/Series/Series.js"],
            b["Core/Series/CartesianSeries.js"],
            b["Core/Color/Color.js"],
            b["Series/ColumnSeries.js"],
            b["Core/Globals.js"],
            b["Mixins/Nodes.js"],
            b["Core/Series/Point.js"],
            b["Mixins/TreeSeries.js"],
            b["Core/Utilities.js"],
        ],
        function (b, d, l, m, w, g, u, q, c) {
            var a = q.getLevelOptions,
                r = c.defined,
                v = c.find,
                y = c.isObject,
                K = c.merge,
                x = c.pick,
                k = c.relativeLength,
                C = c.stableSort;
            ("");
            b.seriesType(
                "sankey",
                "column",
                {
                    borderWidth: 0,
                    colorByPoint: !0,
                    curveFactor: 0.33,
                    dataLabels: {
                        enabled: !0,
                        backgroundColor: "none",
                        crop: !1,
                        nodeFormat: void 0,
                        nodeFormatter: function () {
                            return this.point.name;
                        },
                        format: void 0,
                        formatter: function () { },
                        inside: !0,
                    },
                    inactiveOtherPoints: !0,
                    linkOpacity: 0.5,
                    minLinkWidth: 0,
                    nodeWidth: 20,
                    nodePadding: 10,
                    showInLegend: !1,
                    states: { hover: { linkOpacity: 1 }, inactive: { linkOpacity: 0.1, opacity: 0.1, animation: { duration: 50 } } },
                    tooltip: {
                        followPointer: !0,
                        headerFormat: '<span style="font-size: 10px">{series.name}</span><br/>',
                        pointFormat: "{point.fromNode.name} \u2192 {point.toNode.name}: <b>{point.weight}</b><br/>",
                        nodeFormat: "{point.name}: <b>{point.sum}</b><br/>",
                    },
                },
                {
                    isCartesian: !1,
                    invertable: !0,
                    forceDL: !0,
                    orderNodes: !0,
                    pointArrayMap: ["from", "to"],
                    createNode: g.createNode,
                    searchPoint: w.noop,
                    setData: g.setData,
                    destroy: g.destroy,
                    getNodePadding: function () {
                        var a = this.options.nodePadding || 0;
                        if (this.nodeColumns) {
                            var b = this.nodeColumns.reduce(function (a, e) {
                                return Math.max(a, e.length);
                            }, 0);
                            b * a > this.chart.plotSizeY && (a = this.chart.plotSizeY / b);
                        }
                        return a;
                    },
                    createNodeColumn: function () {
                        var a = this,
                            b = this.chart,
                            c = [];
                        c.sum = function () {
                            return this.reduce(function (a, e) {
                                return a + e.getSum();
                            }, 0);
                        };
                        c.offset = function (e, b) {
                            for (var n = 0, h, D = a.nodePadding, z = 0; z < c.length; z++) {
                                h = c[z].getSum();
                                var d = Math.max(h * b, a.options.minLinkWidth);
                                h = h ? d + D : 0;
                                if (c[z] === e) return { relativeTop: n + k(e.options.offset || 0, h) };
                                n += h;
                            }
                        };
                        c.top = function (e) {
                            var c = a.nodePadding,
                                h = this.reduce(function (b, h) {
                                    0 < b && (b += c);
                                    h = Math.max(h.getSum() * e, a.options.minLinkWidth);
                                    return b + h;
                                }, 0);
                            return (b.plotSizeY - h) / 2;
                        };
                        return c;
                    },
                    createNodeColumns: function () {
                        var a = [];
                        this.nodes.forEach(function (b) {
                            var e = -1,
                                c;
                            if (!r(b.options.column))
                                if (0 === b.linksTo.length) b.column = 0;
                                else {
                                    for (c = 0; c < b.linksTo.length; c++) {
                                        var n = b.linksTo[0];
                                        if (n.fromNode.column > e) {
                                            var h = n.fromNode;
                                            e = h.column;
                                        }
                                    }
                                    b.column = e + 1;
                                    h &&
                                        "hanging" === h.options.layout &&
                                        ((b.hangsFrom = h),
                                        (c = -1),
                                        v(h.linksFrom, function (a, e) {
                                            (a = a.toNode === b) && (c = e);
                                            return a;
                                        }),
                                        (b.column += c));
                                }
                            a[b.column] || (a[b.column] = this.createNodeColumn());
                            a[b.column].push(b);
                        }, this);
                        for (var b = 0; b < a.length; b++) "undefined" === typeof a[b] && (a[b] = this.createNodeColumn());
                        return a;
                    },
                    hasData: function () {
                        return !!this.processedXData.length;
                    },
                    pointAttribs: function (a, b) {
                        var c = this,
                            e = c.mapOptionsToLevel[(a.isNode ? a.level : a.fromNode.level) || 0] || {},
                            n = a.options,
                            d = (e.states && e.states[b]) || {};
                        b = ["colorByPoint", "borderColor", "borderWidth", "linkOpacity"].reduce(function (a, b) {
                            a[b] = x(d[b], n[b], e[b], c.options[b]);
                            return a;
                        }, {});
                        var f = x(d.color, n.color, b.colorByPoint ? a.color : e.color);
                        return a.isNode ? { fill: f, stroke: b.borderColor, "stroke-width": b.borderWidth } : { fill: l.parse(f).setOpacity(b.linkOpacity).get() };
                    },
                    generatePoints: function () {
                        function a(b, c) {
                            "undefined" === typeof b.level &&
                                ((b.level = c),
                                b.linksFrom.forEach(function (b) {
                                    b.toNode && a(b.toNode, c + 1);
                                }));
                        }
                        g.generatePoints.apply(this, arguments);
                        this.orderNodes &&
                            (this.nodes
                                .filter(function (a) {
                                    return 0 === a.linksTo.length;
                                })
                                .forEach(function (b) {
                                    a(b, 0);
                                }),
                            C(this.nodes, function (a, b) {
                                return a.level - b.level;
                            }));
                    },
                    translateNode: function (a, b) {
                        var c = this.translationFactor,
                            e = this.chart,
                            d = this.options,
                            n = a.getSum(),
                            f = Math.max(Math.round(n * c), this.options.minLinkWidth),
                            p = (Math.round(d.borderWidth) % 2) / 2,
                            t = b.offset(a, c);
                        b = Math.floor(x(t.absoluteTop, b.top(c) + t.relativeTop)) + p;
                        p = Math.floor(this.colDistance * a.column + d.borderWidth / 2) + p;
                        p = e.inverted ? e.plotSizeX - p : p;
                        c = Math.round(this.nodeWidth);
                        (a.sum = n)
                            ? ((a.shapeType = "rect"),
                              (a.nodeX = p),
                              (a.nodeY = b),
                              (a.shapeArgs = e.inverted
                                  ? { x: p - c, y: e.plotSizeY - b - f, width: a.options.height || d.height || c, height: a.options.width || d.width || f }
                                  : { x: p, y: b, width: a.options.width || d.width || c, height: a.options.height || d.height || f }),
                              (a.shapeArgs.display = a.hasShape() ? "" : "none"),
                              (d = this.mapOptionsToLevel[a.level]),
                              (n = a.options),
                              (n = y(n) ? n.dataLabels : {}),
                              (d = y(d) ? d.dataLabels : {}),
                              (d = K({ style: {} }, d, n)),
                              (a.dlOptions = d),
                              (a.plotY = 1),
                              (a.tooltipPos = e.inverted
                                  ? [e.plotSizeY - a.shapeArgs.y - a.shapeArgs.height / 2, e.plotSizeX - a.shapeArgs.x - a.shapeArgs.width / 2]
                                  : [a.shapeArgs.x + a.shapeArgs.width / 2, a.shapeArgs.y + a.shapeArgs.height / 2]))
                            : (a.dlOptions = { enabled: !1 });
                    },
                    translateLink: function (a) {
                        var b = function (b, c) {
                            var d;
                            c = b.offset(a, c) * g;
                            return Math.min(b.nodeY + c, b.nodeY + (null === (d = b.shapeArgs) || void 0 === d ? void 0 : d.height) - f);
                        },
                            c = a.fromNode,
                            d = a.toNode,
                            e = this.chart,
                            g = this.translationFactor,
                            f = Math.max(a.weight * g, this.options.minLinkWidth),
                            p = (e.inverted ? -this.colDistance : this.colDistance) * this.options.curveFactor,
                            t = b(c, "linksFrom");
                        b = b(d, "linksTo");
                        var k = c.nodeX,
                            l = this.nodeWidth;
                        d = d.column * this.colDistance;
                        var m = a.outgoing,
                            A = d > k + l;
                        e.inverted && ((t = e.plotSizeY - t), (b = (e.plotSizeY || 0) - b), (d = e.plotSizeX - d), (l = -l), (f = -f), (A = k > d));
                        a.shapeType = "path";
                        a.linkBase = [t, t + f, b, b + f];
                        if (A && "number" === typeof b)
                            a.shapeArgs = { d: [["M", k + l, t], ["C", k + l + p, t, d - p, b, d, b], ["L", d + (m ? l : 0), b + f / 2], ["L", d, b + f], ["C", d - p, b + f, k + l + p, t + f, k + l, t + f], ["Z"]] };
                        else if ("number" === typeof b) {
                            p = d - 20 - f;
                            m = d - 20;
                            A = d;
                            var r = k + l,
                                q = r + 20,
                                u = q + f,
                                x = t,
                                v = t + f,
                                y = v + 20,
                                w = y + (e.plotHeight - t - f),
                                B = w + 20,
                                F = B + f,
                                C = b,
                                E = C + f,
                                G = E + 20,
                                H = B + 0.7 * f,
                                I = A - 0.7 * f,
                                J = r + 0.7 * f;
                            a.shapeArgs = {
                                d: [
                                    ["M", r, x],
                                    ["C", J, x, u, v - 0.7 * f, u, y],
                                    ["L", u, w],
                                    ["C", u, H, J, F, r, F],
                                    ["L", A, F],
                                    ["C", I, F, p, H, p, w],
                                    ["L", p, G],
                                    ["C", p, E - 0.7 * f, I, C, A, C],
                                    ["L", A, E],
                                    ["C", m, E, m, E, m, G],
                                    ["L", m, w],
                                    ["C", m, B, m, B, A, B],
                                    ["L", r, B],
                                    ["C", q, B, q, B, q, w],
                                    ["L", q, y],
                                    ["C", q, v, q, v, r, v],
                                    ["Z"],
                                ],
                            };
                        }
                        a.dlBox = { x: k + (d - k + l) / 2, y: t + (b - t) / 2, height: f, width: 0 };
                        a.tooltipPos = e.inverted ? [e.plotSizeY - a.dlBox.y - f / 2, e.plotSizeX - a.dlBox.x] : [a.dlBox.x, a.dlBox.y + f / 2];
                        a.y = a.plotY = 1;
                        a.color || (a.color = c.color);
                    },
                    translate: function () {
                        var b = this,
                            c = function (a) {
                                for (var c = a.slice(), e = b.options.minLinkWidth || 0, f, h = 0, k, m = l.plotSizeY - g.borderWidth - (a.length - 1) * d.nodePadding; a.length;) {
                                    h = m / a.sum();
                                    f = !1;
                                    for (k = a.length; k--;) a[k].getSum() * h < e && (a.splice(k, 1), (m -= e), (f = !0));
                                    if (!f) break;
                                }
                                a.length = 0;
                                c.forEach(function (b) {
                                    return a.push(b);
                                });
                                return h;
                            };
                        this.processedXData || this.processData();
                        this.generatePoints();
                        this.nodeColumns = this.createNodeColumns();
                        this.nodeWidth = k(this.options.nodeWidth, this.chart.plotSizeX);
                        var d = this,
                            l = this.chart,
                            g = this.options,
                            m = this.nodeWidth,
                            f = this.nodeColumns;
                        this.nodePadding = this.getNodePadding();
                        this.translationFactor = f.reduce(function (a, b) {
                            return Math.min(a, c(b));
                        }, Infinity);
                        this.colDistance = (l.plotSizeX - m - g.borderWidth) / Math.max(1, f.length - 1);
                        d.mapOptionsToLevel = a({
                            from: 1,
                            levels: g.levels,
                            to: f.length - 1,
                            defaults: {
                                borderColor: g.borderColor,
                                borderRadius: g.borderRadius,
                                borderWidth: g.borderWidth,
                                color: d.color,
                                colorByPoint: g.colorByPoint,
                                levelIsConstant: !0,
                                linkColor: g.linkColor,
                                linkLineWidth: g.linkLineWidth,
                                linkOpacity: g.linkOpacity,
                                states: g.states,
                            },
                        });
                        f.forEach(function (a) {
                            a.forEach(function (b) {
                                d.translateNode(b, a);
                            });
                        }, this);
                        this.nodes.forEach(function (a) {
                            a.linksFrom.forEach(function (a) {
                                (a.weight || a.isNull) && a.to && (d.translateLink(a), (a.allowShadow = !1));
                            });
                        });
                    },
                    render: function () {
                        var a = this.points;
                        this.points = this.points.concat(this.nodes || []);
                        m.prototype.render.call(this);
                        this.points = a;
                    },
                    animate: d.prototype.animate,
                },
                {
                    applyOptions: function (a, b) {
                        u.prototype.applyOptions.call(this, a, b);
                        r(this.options.level) && (this.options.column = this.column = this.options.level);
                        return this;
                    },
                    setState: g.setNodeState,
                    getClassName: function () {
                        return (this.isNode ? "RBG_charts-node " : "RBG_charts-link ") + u.prototype.getClassName.call(this);
                    },
                    isValid: function () {
                        return this.isNode || "number" === typeof this.weight;
                    },
                }
            );
            ("");
        }
    );
    m(b, "masters/modules/sankey.src.js", [], function () { });
});
//# sourceMappingURL=sankey.js.map
