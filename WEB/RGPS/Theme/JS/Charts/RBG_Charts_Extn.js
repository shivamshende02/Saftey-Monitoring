﻿/*
 RBGcharts JS v8.2.2 (2020-10-22)

 (c) 2009-2018 Torstein Honsi

 License: www.RBG_charts.com/license
*/
(function (c) {
    "object" === typeof module && module.exports
        ? ((c["default"] = c), (module.exports = c))
        : "function" === typeof define && define.amd
        ? define("RBG_charts/RBG_charts-more", ["RBG_charts"], function (A) {
            c(A);
            c.RBGcharts = A;
            return c;
        })
        : c("undefined" !== typeof RBGcharts ? RBGcharts : void 0);
})(function (c) {
    function A(c, b, h, a) {
        c.hasOwnProperty(b) || (c[b] = a.apply(null, h));
    }
    c = c ? c._modules : {};
    A(c, "Extensions/Pane.js", [c["Core/Chart/Chart.js"], c["Core/Globals.js"], c["Core/Pointer.js"], c["Core/Utilities.js"], c["Mixins/CenteredSeries.js"]], function (c, b, h, a, f) {
        function q(e, f, m) {
            return Math.sqrt(Math.pow(e - m[0], 2) + Math.pow(f - m[1], 2)) <= m[2] / 2;
        }
        var u = a.addEvent,
            z = a.extend,
            E = a.merge,
            B = a.pick,
            e = a.splat;
        c.prototype.collectionsWithUpdate.push("pane");
        a = (function () {
            function b(e, m) {
                this.options = this.chart = this.center = this.background = void 0;
                this.coll = "pane";
                this.defaultOptions = { center: ["50%", "50%"], size: "85%", innerSize: "0%", startAngle: 0 };
                this.defaultBackgroundOptions = {
                    shape: "circle",
                    borderWidth: 1,
                    borderColor: "#cccccc",
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, "#ffffff"],
                            [1, "#e6e6e6"],
                        ],
                    },
                    from: -Number.MAX_VALUE,
                    innerRadius: 0,
                    to: Number.MAX_VALUE,
                    outerRadius: "105%",
                };
                this.init(e, m);
            }
            b.prototype.init = function (e, m) {
                this.chart = m;
                this.background = [];
                m.pane.push(this);
                this.setOptions(e);
            };
            b.prototype.setOptions = function (e) {
                this.options = E(this.defaultOptions, this.chart.angular ? { background: {} } : void 0, e);
            };
            b.prototype.render = function () {
                var b = this.options,
                    m = this.options.background,
                    f = this.chart.renderer;
                this.group ||
                    (this.group = f
                        .g("pane-group")
                        .attr({ zIndex: b.zIndex || 0 })
                        .add());
                this.updateCenter();
                if (m)
                    for (m = e(m), b = Math.max(m.length, this.background.length || 0), f = 0; f < b; f++)
                        m[f] && this.axis ? this.renderBackground(E(this.defaultBackgroundOptions, m[f]), f) : this.background[f] && ((this.background[f] = this.background[f].destroy()), this.background.splice(f, 1));
            };
            b.prototype.renderBackground = function (e, f) {
                var b = "animate",
                    m = { class: "RBG_charts-pane " + (e.className || "") };
                this.chart.styledMode || z(m, { fill: e.backgroundColor, stroke: e.borderColor, "stroke-width": e.borderWidth });
                this.background[f] || ((this.background[f] = this.chart.renderer.path().add(this.group)), (b = "attr"));
                this.background[f][b]({ d: this.axis.getPlotBandPath(e.from, e.to, e) }).attr(m);
            };
            b.prototype.updateCenter = function (e) {
                this.center = (e || this.axis || {}).center = f.getCenter.call(this);
            };
            b.prototype.update = function (e, f) {
                E(!0, this.options, e);
                E(!0, this.chart.options.pane, e);
                this.setOptions(this.options);
                this.render();
                this.chart.axes.forEach(function (e) {
                    e.pane === this && ((e.pane = null), e.update({}, f));
                }, this);
            };
            return b;
        })();
        c.prototype.getHoverPane = function (e) {
            var f = this,
                b;
            e &&
                f.pane.forEach(function (m) {
                    var a = e.chartX - f.plotLeft,
                        p = e.chartY - f.plotTop;
                    q(f.inverted ? p : a, f.inverted ? a : p, m.center) && (b = m);
                });
            return b;
        };
        u(c, "afterIsInsidePlot", function (e) {
            this.polar &&
                (e.isInsidePlot = this.pane.some(function (f) {
                    return q(e.x, e.y, f.center);
                }));
        });
        u(h, "beforeGetHoverData", function (e) {
            var f = this.chart;
            f.polar &&
                ((f.hoverPane = f.getHoverPane(e)),
                (e.filter = function (b) {
                    return b.visible && !(!e.shared && b.directTouch) && B(b.options.enableMouseTracking, !0) && (!f.hoverPane || b.xAxis.pane === f.hoverPane);
                }));
        });
        u(h, "afterGetHoverData", function (e) {
            var f = this.chart;
            e.hoverPoint && e.hoverPoint.plotX && e.hoverPoint.plotY && f.hoverPane && !q(e.hoverPoint.plotX, e.hoverPoint.plotY, f.hoverPane.center) && (e.hoverPoint = void 0);
        });
        b.Pane = a;
        return b.Pane;
    });
    A(c, "Core/Axis/HiddenAxis.js", [], function () {
        return (function () {
            function c() { }
            c.init = function (b) {
                b.getOffset = function () { };
                b.redraw = function () {
                    this.isDirty = !1;
                };
                b.render = function () {
                    this.isDirty = !1;
                };
                b.createLabelCollector = function () {
                    return function () { };
                };
                b.setScale = function () { };
                b.setCategories = function () { };
                b.setTitle = function () { };
                b.isHidden = !0;
            };
            return c;
        })();
    });
    A(c, "Core/Axis/RadialAxis.js", [c["Core/Axis/Axis.js"], c["Core/Axis/Tick.js"], c["Core/Axis/HiddenAxis.js"], c["Core/Utilities.js"]], function (c, b, h, a) {
        var f = a.addEvent,
            q = a.correctFloat,
            u = a.defined,
            z = a.extend,
            E = a.fireEvent,
            B = a.merge,
            e = a.pick,
            x = a.relativeLength,
            w = a.wrap;
        a = (function () {
            function b() { }
            b.init = function (f) {
                var b = c.prototype;
                f.setOptions = function (e) {
                    e = this.options = B(f.constructor.defaultOptions, this.defaultPolarOptions, e);
                    e.plotBands || (e.plotBands = []);
                    E(this, "afterSetOptions");
                };
                f.getOffset = function () {
                    b.getOffset.call(this);
                    this.chart.axisOffset[this.side] = 0;
                };
                f.getLinePath = function (f, l, k) {
                    f = this.pane.center;
                    var d = this.chart,
                        g = e(l, f[2] / 2 - this.offset);
                    "undefined" === typeof k && (k = this.horiz ? 0 : this.center && -this.center[3] / 2);
                    k && (g += k);
                    this.isCircular || "undefined" !== typeof l
                        ? ((l = this.chart.renderer.symbols.arc(this.left + f[0], this.top + f[1], g, g, { start: this.startAngleRad, end: this.endAngleRad, open: !0, innerR: 0 })),
                          (l.xBounds = [this.left + f[0]]),
                          (l.yBounds = [this.top + f[1] - g]))
                        : ((l = this.postTranslate(this.angleRad, g)),
                          (l = [
                              ["M", this.center[0] + d.plotLeft, this.center[1] + d.plotTop],
                              ["L", l.x, l.y],
                          ]));
                    return l;
                };
                f.setAxisTranslation = function () {
                    b.setAxisTranslation.call(this);
                    this.center &&
                        ((this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : (this.center[2] - this.center[3]) / 2 / (this.max - this.min || 1)),
                        (this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0));
                };
                f.beforeSetTickPositions = function () {
                    this.autoConnect = this.isCircular && "undefined" === typeof e(this.userMax, this.options.max) && q(this.endAngleRad - this.startAngleRad) === q(2 * Math.PI);
                    !this.isCircular && this.chart.inverted && this.max++;
                    this.autoConnect && (this.max += (this.categories && 1) || this.pointRange || this.closestPointRange || 0);
                };
                f.setAxisSize = function () {
                    b.setAxisSize.call(this);
                    if (this.isRadial) {
                        this.pane.updateCenter(this);
                        var f = (this.center = z([], this.pane.center));
                        if (this.isCircular) this.sector = this.endAngleRad - this.startAngleRad;
                        else {
                            var l = this.postTranslate(this.angleRad, f[3] / 2);
                            f[0] = l.x - this.chart.plotLeft;
                            f[1] = l.y - this.chart.plotTop;
                        }
                        this.len = this.width = this.height = ((f[2] - f[3]) * e(this.sector, 1)) / 2;
                    }
                };
                f.getPosition = function (f, l) {
                    f = this.translate(f);
                    return this.postTranslate(this.isCircular ? f : this.angleRad, e(this.isCircular ? l : 0 > f ? 0 : f, this.center[2] / 2) - this.offset);
                };
                f.postTranslate = function (e, l) {
                    var k = this.chart,
                        d = this.center;
                    e = this.startAngleRad + e;
                    return { x: k.plotLeft + d[0] + Math.cos(e) * l, y: k.plotTop + d[1] + Math.sin(e) * l };
                };
                f.getPlotBandPath = function (f, l, k) {
                    var d = function (d) {
                        if ("string" === typeof d) {
                            var g = parseInt(d, 10);
                            n.test(d) && (g = (g * D) / 100);
                            return g;
                        }
                        return d;
                    },
                        g = this.center,
                        r = this.startAngleRad,
                        D = g[2] / 2,
                        t = Math.min(this.offset, 0),
                        n = /%$/;
                    var y = this.isCircular;
                    var b = e(d(k.outerRadius), D),
                        p = d(k.innerRadius);
                    d = e(d(k.thickness), 10);
                    if ("polygon" === this.options.gridLineInterpolation) t = this.getPlotLinePath({ value: f }).concat(this.getPlotLinePath({ value: l, reverse: !0 }));
                    else {
                        f = Math.max(f, this.min);
                        l = Math.min(l, this.max);
                        f = this.translate(f);
                        l = this.translate(l);
                        y || ((b = f || 0), (p = l || 0));
                        if ("circle" !== k.shape && y) (k = r + (f || 0)), (r += l || 0);
                        else {
                            k = -Math.PI / 2;
                            r = 1.5 * Math.PI;
                            var a = !0;
                        }
                        b -= t;
                        t = this.chart.renderer.symbols.arc(this.left + g[0], this.top + g[1], b, b, { start: Math.min(k, r), end: Math.max(k, r), innerR: e(p, b - (d - t)), open: a });
                        y &&
                            ((y = (r + k) / 2),
                            (a = this.left + g[0] + (g[2] / 2) * Math.cos(y)),
                            (t.xBounds = y > -Math.PI / 2 && y < Math.PI / 2 ? [a, this.chart.plotWidth] : [0, a]),
                            (t.yBounds = [this.top + g[1] + (g[2] / 2) * Math.sin(y)]),
                            (t.yBounds[0] += (y > -Math.PI && 0 > y) || y > Math.PI ? -10 : 10));
                    }
                    return t;
                };
                f.getCrosshairPosition = function (e, l, k) {
                    var d = e.value,
                        g = this.pane.center;
                    if (this.isCircular) {
                        if (u(d)) e.point && ((r = e.point.shapeArgs || {}), r.start && (d = this.chart.inverted ? this.translate(e.point.rectPlotY, !0) : e.point.x));
                        else {
                            var r = e.chartX || 0;
                            var D = e.chartY || 0;
                            d = this.translate(Math.atan2(D - k, r - l) - this.startAngleRad, !0);
                        }
                        e = this.getPosition(d);
                        r = e.x;
                        D = e.y;
                    } else u(d) || ((r = e.chartX), (D = e.chartY)), u(r) && u(D) && ((k = g[1] + this.chart.plotTop), (d = this.translate(Math.min(Math.sqrt(Math.pow(r - l, 2) + Math.pow(D - k, 2)), g[2] / 2) - g[3] / 2, !0)));
                    return [d, r || 0, D || 0];
                };
                f.getPlotLinePath = function (e) {
                    var l = this,
                        k = l.pane.center,
                        d = l.chart,
                        g = d.inverted,
                        r = e.value,
                        D = e.reverse,
                        t = l.getPosition(r),
                        n = l.pane.options.background ? l.pane.options.background[0] || l.pane.options.background : {},
                        f = n.innerRadius || "0%",
                        b = n.outerRadius || "100%";
                    n = k[0] + d.plotLeft;
                    var a = k[1] + d.plotTop,
                        p = t.x,
                        m = t.y,
                        h = l.height;
                    t = k[3] / 2;
                    var v;
                    e.isCrosshair && ((m = this.getCrosshairPosition(e, n, a)), (r = m[0]), (p = m[1]), (m = m[2]));
                    if (l.isCircular)
                        (r = Math.sqrt(Math.pow(p - n, 2) + Math.pow(m - a, 2))),
                            (D = "string" === typeof f ? x(f, 1) : f / r),
                            (d = "string" === typeof b ? x(b, 1) : b / r),
                            k && t && ((r = t / r), D < r && (D = r), d < r && (d = r)),
                            (k = [
                                ["M", n + D * (p - n), a - D * (a - m)],
                                ["L", p - (1 - d) * (p - n), m + (1 - d) * (a - m)],
                            ]);
                    else if (((r = l.translate(r)) && (0 > r || r > h) && (r = 0), "circle" === l.options.gridLineInterpolation)) k = l.getLinePath(0, r, t);
                    else if (
                        ((k = []),
                        d[g ? "yAxis" : "xAxis"].forEach(function (d) {
                            d.pane === l.pane && (v = d);
                    }),
                        v)
                    )
                        for (n = v.tickPositions, v.autoConnect && (n = n.concat([n[0]])), D && (n = n.slice().reverse()), r && (r += t), p = 0; p < n.length; p++) (a = v.getPosition(n[p], r)), k.push(p ? ["L", a.x, a.y] : ["M", a.x, a.y]);
                    return k;
                };
                f.getTitlePosition = function () {
                    var e = this.center,
                        l = this.chart,
                        k = this.options.title;
                    return { x: l.plotLeft + e[0] + (k.x || 0), y: l.plotTop + e[1] - { high: 0.5, middle: 0.25, low: 0 }[k.align] * e[2] + (k.y || 0) };
                };
                f.createLabelCollector = function () {
                    var e = this;
                    return function () {
                        if (e.isRadial && e.tickPositions && !0 !== e.options.labels.allowOverlap)
                            return e.tickPositions
                                .map(function (l) {
                                    return e.ticks[l] && e.ticks[l].label;
                                })
                                .filter(function (e) {
                                    return !!e;
                                });
                    };
                };
            };
            b.compose = function (a, m) {
                f(a, "init", function (e) {
                    var l = this.chart,
                        k = l.inverted,
                        d = l.angular,
                        g = l.polar,
                        r = this.isXAxis,
                        D = this.coll,
                        t = d && r,
                        n,
                        f = l.options;
                    e = e.userOptions.pane || 0;
                    e = this.pane = l.pane && l.pane[e];
                    if ("colorAxis" === D) this.isRadial = !1;
                    else {
                        if (d) {
                            if ((t ? h.init(this) : b.init(this), (n = !r))) this.defaultPolarOptions = b.defaultRadialGaugeOptions;
                        } else
                            g &&
                                (b.init(this),
                                (this.defaultPolarOptions = (n = this.horiz) ? b.defaultCircularOptions : B("xAxis" === D ? a.defaultOptions : a.defaultYAxisOptions, b.defaultRadialOptions)),
                                k && "yAxis" === D && (this.defaultPolarOptions.stackLabels = a.defaultYAxisOptions.stackLabels));
                        d || g
                            ? ((this.isRadial = !0), (f.chart.zoomType = null), this.labelCollector || (this.labelCollector = this.createLabelCollector()), this.labelCollector && l.labelCollectors.push(this.labelCollector))
                            : (this.isRadial = !1);
                        e && n && (e.axis = this);
                        this.isCircular = n;
                    }
                });
                f(a, "afterInit", function () {
                    var f = this.chart,
                        l = this.options,
                        k = this.pane,
                        d = k && k.options;
                    (f.angular && this.isXAxis) ||
                        !k ||
                        (!f.angular && !f.polar) ||
                        ((this.angleRad = ((l.angle || 0) * Math.PI) / 180),
                        (this.startAngleRad = ((d.startAngle - 90) * Math.PI) / 180),
                        (this.endAngleRad = ((e(d.endAngle, d.startAngle + 360) - 90) * Math.PI) / 180),
                        (this.offset = l.offset || 0));
                });
                f(a, "autoLabelAlign", function (e) {
                    this.isRadial && ((e.align = void 0), e.preventDefault());
                });
                f(a, "destroy", function () {
                    if (this.chart && this.chart.labelCollectors) {
                        var e = this.labelCollector ? this.chart.labelCollectors.indexOf(this.labelCollector) : -1;
                        0 <= e && this.chart.labelCollectors.splice(e, 1);
                    }
                });
                f(a, "initialAxisTranslation", function () {
                    this.isRadial && this.beforeSetTickPositions();
                });
                f(m, "afterGetPosition", function (e) {
                    this.axis.getPosition && z(e.pos, this.axis.getPosition(this.pos));
                });
                f(m, "afterGetLabelPosition", function (f) {
                    var l = this.axis,
                        k = this.label;
                    if (k) {
                        var d = k.getBBox(),
                            g = l.options.labels,
                            r = g.y,
                            D = 20,
                            t = g.align,
                            n = (((l.translate(this.pos) + l.startAngleRad + Math.PI / 2) / Math.PI) * 180) % 360,
                            y = Math.round(n),
                            b = "end",
                            a = 0 > y ? y + 360 : y,
                            m = a,
                            h = 0,
                            v = 0,
                            p = null === g.y ? 0.3 * -d.height : 0;
                        if (l.isRadial) {
                            var c = l.getPosition(this.pos, l.center[2] / 2 + x(e(g.distance, -25), l.center[2] / 2, -l.center[2] / 2));
                            "auto" === g.rotation ? k.attr({ rotation: n }) : null === r && (r = l.chart.renderer.fontMetrics(k.styles && k.styles.fontSize).b - d.height / 2);
                            null === t &&
                                (l.isCircular ? (d.width > (l.len * l.tickInterval) / (l.max - l.min) && (D = 0), (t = n > D && n < 180 - D ? "left" : n > 180 + D && n < 360 - D ? "right" : "center")) : (t = "center"),
                                k.attr({ align: t }));
                            if ("auto" === t && 2 === l.tickPositions.length && l.isCircular) {
                                90 < a && 180 > a ? (a = 180 - a) : 270 < a && 360 >= a && (a = 540 - a);
                                180 < m && 360 >= m && (m = 360 - m);
                                if (l.pane.options.startAngle === y || l.pane.options.startAngle === y + 360 || l.pane.options.startAngle === y - 360) b = "start";
                                t = (-90 <= y && 90 >= y) || (-360 <= y && -270 >= y) || (270 <= y && 360 >= y) ? ("start" === b ? "right" : "left") : "start" === b ? "left" : "right";
                                70 < m && 110 > m && (t = "center");
                                15 > a || (180 <= a && 195 > a)
                                    ? (h = 0.3 * d.height)
                                    : 15 <= a && 35 >= a
                                    ? (h = "start" === b ? 0 : 0.75 * d.height)
                                    : 195 <= a && 215 >= a
                                    ? (h = "start" === b ? 0.75 * d.height : 0)
                                    : 35 < a && 90 >= a
                                    ? (h = "start" === b ? 0.25 * -d.height : d.height)
                                    : 215 < a && 270 >= a && (h = "start" === b ? d.height : 0.25 * -d.height);
                                15 > m ? (v = "start" === b ? 0.15 * -d.height : 0.15 * d.height) : 165 < m && 180 >= m && (v = "start" === b ? 0.15 * d.height : 0.15 * -d.height);
                                k.attr({ align: t });
                                k.translate(v, h + p);
                            }
                            f.pos.x = c.x + g.x;
                            f.pos.y = c.y + r;
                        }
                    }
                });
                w(m.prototype, "getMarkPath", function (e, l, k, d, g, r, D) {
                    var t = this.axis;
                    t.isRadial ? ((e = t.getPosition(this.pos, t.center[2] / 2 + d)), (l = ["M", l, k, "L", e.x, e.y])) : (l = e.call(this, l, k, d, g, r, D));
                    return l;
                });
            };
            b.defaultCircularOptions = { gridLineWidth: 1, labels: { align: null, distance: 15, x: 0, y: null, style: { textOverflow: "none" } }, maxPadding: 0, minPadding: 0, showLastLabel: !1, tickLength: 0 };
            b.defaultRadialGaugeOptions = {
                labels: { align: "center", x: 0, y: null },
                minorGridLineWidth: 0,
                minorTickInterval: "auto",
                minorTickLength: 10,
                minorTickPosition: "inside",
                minorTickWidth: 1,
                tickLength: 10,
                tickPosition: "inside",
                tickWidth: 2,
                title: { rotation: 0 },
                zIndex: 2,
            };
            b.defaultRadialOptions = { gridLineInterpolation: "circle", gridLineWidth: 1, labels: { align: "right", x: -3, y: -2 }, showLastLabel: !1, title: { x: 4, text: null, rotation: 90 } };
            return b;
        })();
        a.compose(c, b);
        return a;
    });
    A(c, "Series/AreaRangeSeries.js", [c["Core/Series/Series.js"], c["Core/Globals.js"], c["Core/Series/Point.js"], c["Core/Utilities.js"]], function (c, b, h, a) {
        var f = a.defined,
            q = a.extend,
            u = a.isArray,
            z = a.isNumber,
            E = a.pick,
            B = c.seriesTypes.area.prototype,
            e = c.seriesTypes.column.prototype,
            x = h.prototype,
            w = b.Series.prototype;
        c.seriesType(
            "arearange",
            "area",
            {
                lineWidth: 1,
                threshold: null,
                tooltip: { pointFormat: '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>' },
                trackByArea: !0,
                dataLabels: { align: void 0, verticalAlign: void 0, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0 },
            },
            {
                pointArrayMap: ["low", "high"],
                pointValKey: "low",
                deferTranslatePolar: !0,
                toYData: function (e) {
                    return [e.low, e.high];
                },
                highToXY: function (e) {
                    var f = this.chart,
                        b = this.xAxis.postTranslate(e.rectPlotX, this.yAxis.len - e.plotHigh);
                    e.plotHighX = b.x - f.plotLeft;
                    e.plotHigh = b.y - f.plotTop;
                    e.plotLowX = e.plotX;
                },
                translate: function () {
                    var e = this,
                        f = e.yAxis,
                        b = !!e.modifyValue;
                    B.translate.apply(e);
                    e.points.forEach(function (a) {
                        var l = a.high,
                            k = a.plotY;
                        a.isNull ? (a.plotY = null) : ((a.plotLow = k), (a.plotHigh = f.translate(b ? e.modifyValue(l, a) : l, 0, 1, 0, 1)), b && (a.yBottom = a.plotHigh));
                    });
                    this.chart.polar &&
                        this.points.forEach(function (f) {
                            e.highToXY(f);
                            f.tooltipPos = [(f.plotHighX + f.plotLowX) / 2, (f.plotHigh + f.plotLow) / 2];
                        });
                },
                getGraphPath: function (e) {
                    var f = [],
                        b = [],
                        a,
                        l = B.getGraphPath;
                    var k = this.options;
                    var d = this.chart.polar,
                        g = d && !1 !== k.connectEnds,
                        r = k.connectNulls,
                        D = k.step;
                    e = e || this.points;
                    for (a = e.length; a--;) {
                        var t = e[a];
                        var n = d ? { plotX: t.rectPlotX, plotY: t.yBottom, doCurve: !1 } : { plotX: t.plotX, plotY: t.plotY, doCurve: !1 };
                        t.isNull || g || r || (e[a + 1] && !e[a + 1].isNull) || b.push(n);
                        var y = { polarPlotY: t.polarPlotY, rectPlotX: t.rectPlotX, yBottom: t.yBottom, plotX: E(t.plotHighX, t.plotX), plotY: t.plotHigh, isNull: t.isNull };
                        b.push(y);
                        f.push(y);
                        t.isNull || g || r || (e[a - 1] && !e[a - 1].isNull) || b.push(n);
                    }
                    e = l.call(this, e);
                    D && (!0 === D && (D = "left"), (k.step = { left: "right", center: "center", right: "left" }[D]));
                    f = l.call(this, f);
                    b = l.call(this, b);
                    k.step = D;
                    k = [].concat(e, f);
                    !this.chart.polar && b[0] && "M" === b[0][0] && (b[0] = ["L", b[0][1], b[0][2]]);
                    this.graphPath = k;
                    this.areaPath = e.concat(b);
                    k.isArea = !0;
                    k.xMap = e.xMap;
                    this.areaPath.xMap = e.xMap;
                    return k;
                },
                drawDataLabels: function () {
                    var e = this.points,
                        f = e.length,
                        b,
                        a = [],
                        l = this.options.dataLabels,
                        k,
                        d = this.chart.inverted;
                    if (u(l)) {
                        var g = l[0] || { enabled: !1 };
                        var r = l[1] || { enabled: !1 };
                    } else (g = q({}, l)), (g.x = l.xHigh), (g.y = l.yHigh), (r = q({}, l)), (r.x = l.xLow), (r.y = l.yLow);
                    if (g.enabled || this._hasPointLabels) {
                        for (b = f; b--;)
                            if ((k = e[b])) {
                                var D = g.inside ? k.plotHigh < k.plotLow : k.plotHigh > k.plotLow;
                                k.y = k.high;
                                k._plotY = k.plotY;
                                k.plotY = k.plotHigh;
                                a[b] = k.dataLabel;
                                k.dataLabel = k.dataLabelUpper;
                                k.below = D;
                                d ? g.align || (g.align = D ? "right" : "left") : g.verticalAlign || (g.verticalAlign = D ? "top" : "bottom");
                            }
                        this.options.dataLabels = g;
                        w.drawDataLabels && w.drawDataLabels.apply(this, arguments);
                        for (b = f; b--;) if ((k = e[b])) (k.dataLabelUpper = k.dataLabel), (k.dataLabel = a[b]), delete k.dataLabels, (k.y = k.low), (k.plotY = k._plotY);
                    }
                    if (r.enabled || this._hasPointLabels) {
                        for (b = f; b--;)
                            if ((k = e[b])) (D = r.inside ? k.plotHigh < k.plotLow : k.plotHigh > k.plotLow), (k.below = !D), d ? r.align || (r.align = D ? "left" : "right") : r.verticalAlign || (r.verticalAlign = D ? "bottom" : "top");
                        this.options.dataLabels = r;
                        w.drawDataLabels && w.drawDataLabels.apply(this, arguments);
                    }
                    if (g.enabled)
                        for (b = f; b--;)
                            if ((k = e[b]))
                                k.dataLabels = [k.dataLabelUpper, k.dataLabel].filter(function (d) {
                                    return !!d;
                                });
                    this.options.dataLabels = l;
                },
                alignDataLabel: function () {
                    e.alignDataLabel.apply(this, arguments);
                },
                drawPoints: function () {
                    var e = this.points.length,
                        b;
                    w.drawPoints.apply(this, arguments);
                    for (b = 0; b < e;) {
                        var a = this.points[b];
                        a.origProps = { plotY: a.plotY, plotX: a.plotX, isInside: a.isInside, negative: a.negative, zone: a.zone, y: a.y };
                        a.lowerGraphic = a.graphic;
                        a.graphic = a.upperGraphic;
                        a.plotY = a.plotHigh;
                        f(a.plotHighX) && (a.plotX = a.plotHighX);
                        a.y = a.high;
                        a.negative = a.high < (this.options.threshold || 0);
                        a.zone = this.zones.length && a.getZone();
                        this.chart.polar || (a.isInside = a.isTopInside = "undefined" !== typeof a.plotY && 0 <= a.plotY && a.plotY <= this.yAxis.len && 0 <= a.plotX && a.plotX <= this.xAxis.len);
                        b++;
                    }
                    w.drawPoints.apply(this, arguments);
                    for (b = 0; b < e;) (a = this.points[b]), (a.upperGraphic = a.graphic), (a.graphic = a.lowerGraphic), q(a, a.origProps), delete a.origProps, b++;
                },
                setStackedPoints: b.noop,
            },
            {
                setState: function () {
                    var e = this.state,
                        a = this.series,
                        b = a.chart.polar;
                    f(this.plotHigh) || (this.plotHigh = a.yAxis.toPixels(this.high, !0));
                    f(this.plotLow) || (this.plotLow = this.plotY = a.yAxis.toPixels(this.low, !0));
                    a.stateMarkerGraphic && ((a.lowerStateMarkerGraphic = a.stateMarkerGraphic), (a.stateMarkerGraphic = a.upperStateMarkerGraphic));
                    this.graphic = this.upperGraphic;
                    this.plotY = this.plotHigh;
                    b && (this.plotX = this.plotHighX);
                    x.setState.apply(this, arguments);
                    this.state = e;
                    this.plotY = this.plotLow;
                    this.graphic = this.lowerGraphic;
                    b && (this.plotX = this.plotLowX);
                    a.stateMarkerGraphic && ((a.upperStateMarkerGraphic = a.stateMarkerGraphic), (a.stateMarkerGraphic = a.lowerStateMarkerGraphic), (a.lowerStateMarkerGraphic = void 0));
                    x.setState.apply(this, arguments);
                },
                haloPath: function () {
                    var e = this.series.chart.polar,
                        a = [];
                    this.plotY = this.plotLow;
                    e && (this.plotX = this.plotLowX);
                    this.isInside && (a = x.haloPath.apply(this, arguments));
                    this.plotY = this.plotHigh;
                    e && (this.plotX = this.plotHighX);
                    this.isTopInside && (a = a.concat(x.haloPath.apply(this, arguments)));
                    return a;
                },
                destroyElements: function () {
                    ["lowerGraphic", "upperGraphic"].forEach(function (e) {
                        this[e] && (this[e] = this[e].destroy());
                    }, this);
                    this.graphic = null;
                    return x.destroyElements.apply(this, arguments);
                },
                isValid: function () {
                    return z(this.low) && z(this.high);
                },
            }
        );
        ("");
    });
    A(c, "Series/AreaSplineRangeSeries.js", [c["Core/Series/Series.js"]], function (c) {
        c.seriesType("areasplinerange", "arearange", null, { getPointSpline: c.seriesTypes.spline.prototype.getPointSpline });
        ("");
    });
    A(c, "Series/ColumnRangeSeries.js", [c["Core/Series/Series.js"], c["Core/Globals.js"], c["Core/Options.js"], c["Core/Utilities.js"]], function (c, b, h, a) {
        b = b.noop;
        h = h.defaultOptions;
        var f = a.clamp,
            q = a.merge,
            u = a.pick,
            z = c.seriesTypes.column.prototype;
        c.seriesType(
            "columnrange",
            "arearange",
            q(h.plotOptions.column, h.plotOptions.arearange, { pointRange: null, marker: null, states: { hover: { halo: !1 } } }),
            {
                translate: function () {
                    var a = this,
                        b = a.yAxis,
                        e = a.xAxis,
                        h = e.startAngleRad,
                        c,
                        m = a.chart,
                        q = a.xAxis.isRadial,
                        v = Math.max(m.chartWidth, m.chartHeight) + 999,
                        p;
                    z.translate.apply(a);
                    a.points.forEach(function (l) {
                        var k = l.shapeArgs,
                            d = a.options.minPointLength;
                        l.plotHigh = p = f(b.translate(l.high, 0, 1, 0, 1), -v, v);
                        l.plotLow = f(l.plotY, -v, v);
                        var g = p;
                        var r = u(l.rectPlotY, l.plotY) - p;
                        Math.abs(r) < d ? ((d -= r), (r += d), (g -= d / 2)) : 0 > r && ((r *= -1), (g -= r));
                        q
                            ? ((c = l.barX + h), (l.shapeType = "arc"), (l.shapeArgs = a.polarArc(g + r, g, c, c + l.pointWidth)))
                            : ((k.height = r),
                              (k.y = g),
                              (l.tooltipPos = m.inverted ? [b.len + b.pos - m.plotLeft - g - r / 2, e.len + e.pos - m.plotTop - k.x - k.width / 2, r] : [e.left - m.plotLeft + k.x + k.width / 2, b.pos - m.plotTop + g + r / 2, r]));
                    });
                },
                directTouch: !0,
                trackerGroups: ["group", "dataLabelsGroup"],
                drawGraph: b,
                getSymbol: b,
                crispCol: function () {
                    return z.crispCol.apply(this, arguments);
                },
                drawPoints: function () {
                    return z.drawPoints.apply(this, arguments);
                },
                drawTracker: function () {
                    return z.drawTracker.apply(this, arguments);
                },
                getColumnMetrics: function () {
                    return z.getColumnMetrics.apply(this, arguments);
                },
                pointAttribs: function () {
                    return z.pointAttribs.apply(this, arguments);
                },
                animate: function () {
                    return z.animate.apply(this, arguments);
                },
                polarArc: function () {
                    return z.polarArc.apply(this, arguments);
                },
                translate3dPoints: function () {
                    return z.translate3dPoints.apply(this, arguments);
                },
                translate3dShapes: function () {
                    return z.translate3dShapes.apply(this, arguments);
                },
            },
            { setState: z.pointClass.prototype.setState }
        );
        ("");
    });
    A(c, "Series/ColumnPyramidSeries.js", [c["Core/Series/Series.js"], c["Series/ColumnSeries.js"], c["Core/Utilities.js"]], function (c, b, h) {
        var a = b.prototype,
            f = h.clamp,
            q = h.pick;
        c.seriesType(
            "columnpyramid",
            "column",
            {},
            {
                translate: function () {
                    var b = this,
                        h = b.chart,
                        c = b.options,
                        B = (b.dense = 2 > b.closestPointRange * b.xAxis.transA);
                    B = b.borderWidth = q(c.borderWidth, B ? 0 : 1);
                    var e = b.yAxis,
                        x = c.threshold,
                        w = (b.translatedThreshold = e.getThreshold(x)),
                        m = q(c.minPointLength, 5),
                        C = b.getColumnMetrics(),
                        v = C.width,
                        p = (b.barW = Math.max(v, 1 + 2 * B)),
                        l = (b.pointXOffset = C.offset);
                    h.inverted && (w -= 0.5);
                    c.pointPadding && (p = Math.ceil(p));
                    a.translate.apply(b);
                    b.points.forEach(function (k) {
                        var d = q(k.yBottom, w),
                            g = 999 + Math.abs(d),
                            r = f(k.plotY, -g, e.len + g);
                        g = k.plotX + l;
                        var a = p / 2,
                            t = Math.min(r, d);
                        d = Math.max(r, d) - t;
                        var n;
                        k.barX = g;
                        k.pointWidth = v;
                        k.tooltipPos = h.inverted ? [e.len + e.pos - h.plotLeft - r, b.xAxis.len - g - a, d] : [g + a, r + e.pos - h.plotTop, d];
                        r = x + (k.total || k.y);
                        "percent" === c.stacking && (r = x + (0 > k.y) ? -100 : 100);
                        r = e.toPixels(r, !0);
                        var y = (n = h.plotHeight - r - (h.plotHeight - w)) ? (a * (t - r)) / n : 0;
                        var G = n ? (a * (t + d - r)) / n : 0;
                        n = g - y + a;
                        y = g + y + a;
                        var H = g + G + a;
                        G = g - G + a;
                        var u = t - m;
                        var F = t + d;
                        0 > k.y && ((u = t), (F = t + d + m));
                        h.inverted &&
                            ((H = h.plotWidth - t),
                            (n = r - (h.plotWidth - w)),
                            (y = (a * (r - H)) / n),
                            (G = (a * (r - (H - d))) / n),
                            (n = g + a + y),
                            (y = n - 2 * y),
                            (H = g - G + a),
                            (G = g + G + a),
                            (u = t),
                            (F = t + d - m),
                            0 > k.y && (F = t + d + m));
                        k.shapeType = "path";
                        k.shapeArgs = { x: n, y: u, width: y - n, height: d, d: [["M", n, u], ["L", y, u], ["L", H, F], ["L", G, F], ["Z"]] };
                    });
                },
            }
        );
        ("");
    });
    A(c, "Series/GaugeSeries.js", [c["Core/Series/Series.js"], c["Core/Globals.js"], c["Core/Utilities.js"]], function (c, b, h) {
        var a = h.clamp,
            f = h.isNumber,
            q = h.merge,
            u = h.pick,
            z = h.pInt,
            E = b.Series;
        h = b.TrackerMixin;
        c.seriesType(
            "gauge",
            "line",
            { dataLabels: { borderColor: "#cccccc", borderRadius: 3, borderWidth: 1, crop: !1, defer: !1, enabled: !0, verticalAlign: "top", y: 15, zIndex: 2 }, dial: {}, pivot: {}, tooltip: { headerFormat: "" }, showInLegend: !1 },
            {
                angular: !0,
                directTouch: !0,
                drawGraph: b.noop,
                fixedBox: !0,
                forceDL: !0,
                noSharedTooltip: !0,
                trackerGroups: ["group", "dataLabelsGroup"],
                translate: function () {
                    var b = this.yAxis,
                        e = this.options,
                        h = b.center;
                    this.generatePoints();
                    this.points.forEach(function (c) {
                        var m = q(e.dial, c.dial),
                            x = (z(u(m.radius, "80%")) * h[2]) / 200,
                            w = (z(u(m.baseLength, "70%")) * x) / 100,
                            p = (z(u(m.rearLength, "10%")) * x) / 100,
                            l = m.baseWidth || 3,
                            k = m.topWidth || 1,
                            d = e.overshoot,
                            g = b.startAngleRad + b.translate(c.y, null, null, null, !0);
                        if (f(d) || !1 === e.wrap) (d = f(d) ? (d / 180) * Math.PI : 0), (g = a(g, b.startAngleRad - d, b.endAngleRad + d));
                        g = (180 * g) / Math.PI;
                        c.shapeType = "path";
                        c.shapeArgs = { d: m.path || [["M", -p, -l / 2], ["L", w, -l / 2], ["L", x, -k / 2], ["L", x, k / 2], ["L", w, l / 2], ["L", -p, l / 2], ["Z"]], translateX: h[0], translateY: h[1], rotation: g };
                        c.plotX = h[0];
                        c.plotY = h[1];
                    });
                },
                drawPoints: function () {
                    var a = this,
                        e = a.chart,
                        b = a.yAxis.center,
                        f = a.pivot,
                        h = a.options,
                        c = h.pivot,
                        z = e.renderer;
                    a.points.forEach(function (b) {
                        var f = b.graphic,
                            k = b.shapeArgs,
                            d = k.d,
                            g = q(h.dial, b.dial);
                        f ? (f.animate(k), (k.d = d)) : (b.graphic = z[b.shapeType](k).attr({ rotation: k.rotation, zIndex: 1 }).addClass("RBG_charts-dial").add(a.group));
                        if (!e.styledMode) b.graphic[f ? "animate" : "attr"]({ stroke: g.borderColor || "none", "stroke-width": g.borderWidth || 0, fill: g.backgroundColor || "#000000" });
                    });
                    f
                        ? f.animate({ translateX: b[0], translateY: b[1] })
                        : ((a.pivot = z.circle(0, 0, u(c.radius, 5)).attr({ zIndex: 2 }).addClass("RBG_charts-pivot").translate(b[0], b[1]).add(a.group)),
                          e.styledMode || a.pivot.attr({ "stroke-width": c.borderWidth || 0, stroke: c.borderColor || "#cccccc", fill: c.backgroundColor || "#000000" }));
                },
                animate: function (a) {
                    var e = this;
                    a ||
                        e.points.forEach(function (a) {
                            var b = a.graphic;
                            b && (b.attr({ rotation: (180 * e.yAxis.startAngleRad) / Math.PI }), b.animate({ rotation: a.shapeArgs.rotation }, e.options.animation));
                        });
                },
                render: function () {
                    this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex, this.chart.seriesGroup);
                    E.prototype.render.call(this);
                    this.group.clip(this.chart.clipRect);
                },
                setData: function (a, e) {
                    E.prototype.setData.call(this, a, !1);
                    this.processData();
                    this.generatePoints();
                    u(e, !0) && this.chart.redraw();
                },
                hasData: function () {
                    return !!this.points.length;
                },
                drawTracker: h && h.drawTrackerPoint,
            },
            {
                setState: function (a) {
                    this.state = a;
                },
            }
        );
        ("");
    });
    A(c, "Series/BoxPlotSeries.js", [c["Core/Series/Series.js"], c["Series/ColumnSeries.js"], c["Core/Globals.js"], c["Core/Utilities.js"]], function (c, b, h, a) {
        var f = b.prototype;
        b = h.noop;
        var q = a.pick;
        c.seriesType(
            "boxplot",
            "column",
            {
                threshold: null,
                tooltip: {
                    pointFormat:
                        '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>',
                },
                whiskerLength: "50%",
                fillColor: "#ffffff",
                lineWidth: 1,
                medianWidth: 2,
                whiskerWidth: 2,
            },
            {
                pointArrayMap: ["low", "q1", "median", "q3", "high"],
                toYData: function (a) {
                    return [a.low, a.q1, a.median, a.q3, a.high];
                },
                pointValKey: "high",
                pointAttribs: function () {
                    return {};
                },
                drawDataLabels: b,
                translate: function () {
                    var a = this.yAxis,
                        b = this.pointArrayMap;
                    f.translate.apply(this);
                    this.points.forEach(function (f) {
                        b.forEach(function (b) {
                            null !== f[b] && (f[b + "Plot"] = a.translate(f[b], 0, 1, 0, 1));
                        });
                        f.plotHigh = f.highPlot;
                    });
                },
                drawPoints: function () {
                    var a = this,
                        b = a.options,
                        f = a.chart,
                        h = f.renderer,
                        e,
                        c,
                        w,
                        m,
                        C,
                        v,
                        p = 0,
                        l,
                        k,
                        d,
                        g,
                        r = !1 !== a.doQuartiles,
                        D,
                        t = a.options.whiskerLength;
                    a.points.forEach(function (n) {
                        var y = n.graphic,
                            G = y ? "animate" : "attr",
                            x = n.shapeArgs,
                            I = {},
                            F = {},
                            J = {},
                            K = {},
                            u = n.color || a.color;
                        "undefined" !== typeof n.plotY &&
                            ((l = Math.round(x.width)),
                            (k = Math.floor(x.x)),
                            (d = k + l),
                            (g = Math.round(l / 2)),
                            (e = Math.floor(r ? n.q1Plot : n.lowPlot)),
                            (c = Math.floor(r ? n.q3Plot : n.lowPlot)),
                            (w = Math.floor(n.highPlot)),
                            (m = Math.floor(n.lowPlot)),
                            y ||
                                ((n.graphic = y = h.g("point").add(a.group)),
                                (n.stem = h.path().addClass("RBG_charts-boxplot-stem").add(y)),
                                t && (n.whiskers = h.path().addClass("RBG_charts-boxplot-whisker").add(y)),
                                r &&
                                    (n.box = h
                                        .path(void 0)
                                        .addClass("RBG_charts-boxplot-box")
                                        .add(y)),
                                (n.medianShape = h
                                    .path(void 0)
                                    .addClass("RBG_charts-boxplot-median")
                                    .add(y))),
                            f.styledMode ||
                                ((F.stroke = n.stemColor || b.stemColor || u),
                                (F["stroke-width"] = q(n.stemWidth, b.stemWidth, b.lineWidth)),
                                (F.dashstyle = n.stemDashStyle || b.stemDashStyle || b.dashStyle),
                                n.stem.attr(F),
                                t &&
                                    ((J.stroke = n.whiskerColor || b.whiskerColor || u),
                                    (J["stroke-width"] = q(n.whiskerWidth, b.whiskerWidth, b.lineWidth)),
                                    (J.dashstyle = n.whiskerDashStyle || b.whiskerDashStyle || b.dashStyle),
                                    n.whiskers.attr(J)),
                                r && ((I.fill = n.fillColor || b.fillColor || u), (I.stroke = b.lineColor || u), (I["stroke-width"] = b.lineWidth || 0), (I.dashstyle = n.boxDashStyle || b.boxDashStyle || b.dashStyle), n.box.attr(I)),
                                (K.stroke = n.medianColor || b.medianColor || u),
                                (K["stroke-width"] = q(n.medianWidth, b.medianWidth, b.lineWidth)),
                                (K.dashstyle = n.medianDashStyle || b.medianDashStyle || b.dashStyle),
                                n.medianShape.attr(K)),
                            (v = (n.stem.strokeWidth() % 2) / 2),
                            (p = k + g + v),
                            (y = [
                                ["M", p, c],
                                ["L", p, w],
                                ["M", p, e],
                                ["L", p, m],
                            ]),
                            n.stem[G]({ d: y }),
                            r &&
                                ((v = (n.box.strokeWidth() % 2) / 2), (e = Math.floor(e) + v), (c = Math.floor(c) + v), (k += v), (d += v), (y = [["M", k, c], ["L", k, e], ["L", d, e], ["L", d, c], ["L", k, c], ["Z"]]), n.box[G]({ d: y })),
                            t &&
                                ((v = (n.whiskers.strokeWidth() % 2) / 2),
                                (w += v),
                                (m += v),
                                (D = /%$/.test(t) ? (g * parseFloat(t)) / 100 : t / 2),
                                (y = [
                                    ["M", p - D, w],
                                    ["L", p + D, w],
                                    ["M", p - D, m],
                                    ["L", p + D, m],
                                ]),
                                n.whiskers[G]({ d: y })),
                            (C = Math.round(n.medianPlot)),
                            (v = (n.medianShape.strokeWidth() % 2) / 2),
                            (C += v),
                            (y = [
                                ["M", k, C],
                                ["L", d, C],
                            ]),
                            n.medianShape[G]({ d: y }));
                    });
                },
                setStackedPoints: b,
            }
        );
        ("");
    });
    A(c, "Series/ErrorBarSeries.js", [c["Core/Series/Series.js"], c["Core/Globals.js"]], function (c, b) {
        b = b.noop;
        var h = c.seriesTypes;
        c.seriesType(
            "errorbar",
            "boxplot",
            { color: "#000000", grouping: !1, linkedTo: ":previous", tooltip: { pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>' }, whiskerWidth: null },
            {
                type: "errorbar",
                pointArrayMap: ["low", "high"],
                toYData: function (a) {
                    return [a.low, a.high];
                },
                pointValKey: "high",
                doQuartiles: !1,
                drawDataLabels: h.arearange
                    ? function () {
                        var a = this.pointValKey;
                        h.arearange.prototype.drawDataLabels.call(this);
                        this.data.forEach(function (b) {
                            b.y = b[a];
                        });
                    }
                    : b,
                getColumnMetrics: function () {
                    return (this.linkedParent && this.linkedParent.columnMetrics) || h.column.prototype.getColumnMetrics.call(this);
                },
            }
        );
        ("");
    });
    A(c, "Series/WaterfallSeries.js", [c["Core/Axis/Axis.js"], c["Core/Series/Series.js"], c["Core/Chart/Chart.js"], c["Core/Globals.js"], c["Core/Series/Point.js"], c["Extensions/Stacking.js"], c["Core/Utilities.js"]], function (
        c,
        b,
        h,
        a,
        f,
        q,
        u
    ) {
        var z = b.seriesTypes,
            E = u.addEvent,
            B = u.arrayMax,
            e = u.arrayMin,
            x = u.correctFloat,
            w = u.isNumber,
            m = u.objectEach,
            C = u.pick,
            v = a.Series,
            p;
        (function (e) {
            function a() {
                var d = this.waterfall.stacks;
                d && ((d.changed = !1), delete d.alreadyChanged);
            }
            function d() {
                var d = this.options.stackLabels;
                d && d.enabled && this.waterfall.stacks && this.waterfall.renderStackTotals();
            }
            function g() {
                for (var d = this.axes, g = this.series, e = g.length; e--;)
                    g[e].options.stacking &&
                        (d.forEach(function (d) {
                            d.isXAxis || (d.waterfall.stacks.changed = !0);
                        }),
                        (e = 0));
            }
            function b() {
                this.waterfall || (this.waterfall = new f(this));
            }
            var f = (function () {
                function d(d) {
                    this.axis = d;
                    this.stacks = { changed: !1 };
                }
                d.prototype.renderStackTotals = function () {
                    var d = this.axis,
                        g = d.waterfall.stacks,
                        e = d.stacking && d.stacking.stackTotalGroup,
                        a = new q(d, d.options.stackLabels, !1, 0, void 0);
                    this.dummyStackItem = a;
                    m(g, function (d) {
                        m(d, function (d) {
                            a.total = d.stackTotal;
                            d.label && (a.label = d.label);
                            q.prototype.render.call(a, e);
                            d.label = a.label;
                            delete a.label;
                        });
                    });
                    a.total = null;
                };
                return d;
            })();
            e.Composition = f;
            e.compose = function (e, k) {
                E(e, "init", b);
                E(e, "afterBuildStacks", a);
                E(e, "afterRender", d);
                E(k, "beforeRedraw", g);
            };
        })(p || (p = {}));
        b.seriesType(
            "waterfall",
            "column",
            { dataLabels: { inside: !0 }, lineWidth: 1, lineColor: "#333333", dashStyle: "Dot", borderColor: "#333333", states: { hover: { lineWidthPlus: 0 } } },
            {
                pointValKey: "y",
                showLine: !0,
                generatePoints: function () {
                    var e;
                    z.column.prototype.generatePoints.apply(this);
                    var a = 0;
                    for (e = this.points.length; a < e; a++) {
                        var d = this.points[a];
                        var g = this.processedYData[a];
                        if (d.isIntermediateSum || d.isSum) d.y = x(g);
                    }
                },
                translate: function () {
                    var e = this.options,
                        a = this.yAxis,
                        d,
                        g = C(e.minPointLength, 5),
                        b = g / 2,
                        f = e.threshold,
                        t = e.stacking,
                        n = a.waterfall.stacks[this.stackKey];
                    z.column.prototype.translate.apply(this);
                    var y = (d = f);
                    var h = this.points;
                    var c = 0;
                    for (e = h.length; c < e; c++) {
                        var m = h[c];
                        var x = this.processedYData[c];
                        var q = m.shapeArgs;
                        var p = [0, x];
                        var w = m.y;
                        if (t) {
                            if (n) {
                                p = n[c];
                                if ("overlap" === t) {
                                    var u = p.stackState[p.stateIndex--];
                                    u = 0 <= w ? u : u - w;
                                    Object.hasOwnProperty.call(p, "absolutePos") && delete p.absolutePos;
                                    Object.hasOwnProperty.call(p, "absoluteNeg") && delete p.absoluteNeg;
                                } else
                                    0 <= w ? ((u = p.threshold + p.posTotal), (p.posTotal -= w)) : ((u = p.threshold + p.negTotal), (p.negTotal -= w), (u -= w)),
                                        !p.posTotal && Object.hasOwnProperty.call(p, "absolutePos") && ((p.posTotal = p.absolutePos), delete p.absolutePos),
                                        !p.negTotal && Object.hasOwnProperty.call(p, "absoluteNeg") && ((p.negTotal = p.absoluteNeg), delete p.absoluteNeg);
                                m.isSum || (p.connectorThreshold = p.threshold + p.stackTotal);
                                a.reversed ? ((x = 0 <= w ? u - w : u + w), (w = u)) : ((x = u), (w = u - w));
                                m.below = x <= C(f, 0);
                                q.y = a.translate(x, 0, 1, 0, 1);
                                q.height = Math.abs(q.y - a.translate(w, 0, 1, 0, 1));
                            }
                            if ((w = a.waterfall.dummyStackItem)) (w.x = c), (w.label = n[c].label), w.setOffset(this.pointXOffset || 0, this.barW || 0, this.stackedYNeg[c], this.stackedYPos[c]);
                        } else 
                            (u = Math.max(y, y + w) + p[0]),
                                                        (q.y = a.translate(u, 0, 1, 0, 1)),
                                                        m.isSum
                                                            ? ((q.y = a.translate(p[1], 0, 1, 0, 1)), (q.height = Math.min(a.translate(p[0], 0, 1, 0, 1), a.len) - q.y))
                                                            : m.isIntermediateSum
                                                            ? (0 <= w ? ((x = p[1] + d), (w = d)) : ((x = d), (w = p[1] + d)),
                                                              a.reversed && ((x ^= w), (w ^= x), (x ^= w)),
                                                              (q.y = a.translate(x, 0, 1, 0, 1)),
                                                              (q.height = Math.abs(q.y - Math.min(a.translate(w, 0, 1, 0, 1), a.len))),
                                                              (d += p[1]))
                                                            : ((q.height = 0 < x ? a.translate(y, 0, 1, 0, 1) - q.y : a.translate(y, 0, 1, 0, 1) - a.translate(y - x, 0, 1, 0, 1)), (y += x), (m.below = y < C(f, 0))),
                                                        0 > q.height && ((q.y += q.height), (q.height *= -1));
                        m.plotY = q.y = Math.round(q.y) - (this.borderWidth % 2) / 2;
                        q.height = Math.max(Math.round(q.height), 0.001);
                        m.yBottom = q.y + q.height;
                        q.height <= g && !m.isNull ? ((q.height = g), (q.y -= b), (m.plotY = q.y), (m.minPointLengthOffset = 0 > m.y ? -b : b)) : (m.isNull && (q.width = 0), (m.minPointLengthOffset = 0));
                        q = m.plotY + (m.negative ? q.height : 0);
                        this.chart.inverted ? (m.tooltipPos[0] = a.len - q) : (m.tooltipPos[1] = q);
                    }
                },
                processData: function (a) {
                    var e = this.options,
                        d = this.yData,
                        g = e.data,
                        b = d.length,
                        f = e.threshold || 0,
                        t,
                        n,
                        l,
                        h,
                        c;
                    for (c = n = t = l = h = 0; c < b; c++) {
                        var m = d[c];
                        var q = g && g[c] ? g[c] : {};
                        "sum" === m || q.isSum ? (d[c] = x(n)) : "intermediateSum" === m || q.isIntermediateSum ? ((d[c] = x(t)), (t = 0)) : ((n += m), (t += m));
                        l = Math.min(n, l);
                        h = Math.max(n, h);
                    }
                    v.prototype.processData.call(this, a);
                    e.stacking || ((this.dataMin = l + f), (this.dataMax = h));
                },
                toYData: function (a) {
                    return a.isSum ? "sum" : a.isIntermediateSum ? "intermediateSum" : a.y;
                },
                updateParallelArrays: function (a, e) {
                    v.prototype.updateParallelArrays.call(this, a, e);
                    if ("sum" === this.yData[0] || "intermediateSum" === this.yData[0]) this.yData[0] = null;
                },
                pointAttribs: function (a, e) {
                    var d = this.options.upColor;
                    d && !a.options.color && (a.color = 0 < a.y ? d : null);
                    a = z.column.prototype.pointAttribs.call(this, a, e);
                    delete a.dashstyle;
                    return a;
                },
                getGraphPath: function () {
                    return [["M", 0, 0]];
                },
                getCrispPath: function () {
                    var a = this.data,
                        e = this.yAxis,
                        d = a.length,
                        g = (Math.round(this.graph.strokeWidth()) % 2) / 2,
                        b = (Math.round(this.borderWidth) % 2) / 2,
                        f = this.xAxis.reversed,
                        t = this.yAxis.reversed,
                        n = this.options.stacking,
                        y = [],
                        c;
                    for (c = 1; c < d; c++) {
                        var h = a[c].shapeArgs;
                        var m = a[c - 1];
                        var q = a[c - 1].shapeArgs;
                        var p = e.waterfall.stacks[this.stackKey];
                        var x = 0 < m.y ? -q.height : 0;
                        p &&
                            q &&
                            h &&
                            ((p = p[c - 1]),
                            n ? ((p = p.connectorThreshold), (x = Math.round(e.translate(p, 0, 1, 0, 1) + (t ? x : 0)) - g)) : (x = q.y + m.minPointLengthOffset + b - g),
                            y.push(["M", (q.x || 0) + (f ? 0 : q.width || 0), x], ["L", (h.x || 0) + (f ? h.width || 0 : 0), x]));
                        !n && y.length && q && ((0 > m.y && !t) || (0 < m.y && t)) && ((y[y.length - 2][2] += q.height), (y[y.length - 1][2] += q.height));
                    }
                    return y;
                },
                drawGraph: function () {
                    v.prototype.drawGraph.call(this);
                    this.graph.attr({ d: this.getCrispPath() });
                },
                setStackedPoints: function () {
                    function a(d, g, a, e) {
                        if (E) for (a; a < E; a++) v.stackState[a] += e;
                        else (v.stackState[0] = d), (E = v.stackState.length);
                        v.stackState.push(v.stackState[E - 1] + g);
                    }
                    var e = this.options,
                        d = this.yAxis.waterfall.stacks,
                        g = e.threshold,
                        b = g || 0,
                        f = b,
                        t = this.stackKey,
                        n = this.xData,
                        c = n.length,
                        h,
                        q,
                        m;
                    this.yAxis.stacking.usePercentage = !1;
                    var p = (q = m = b);
                    if (this.visible || !this.chart.options.chart.ignoreHiddenSeries) {
                        var x = d.changed;
                        (h = d.alreadyChanged) && 0 > h.indexOf(t) && (x = !0);
                        d[t] || (d[t] = {});
                        h = d[t];
                        for (var w = 0; w < c; w++) {
                            var u = n[w];
                            if (!h[u] || x) h[u] = { negTotal: 0, posTotal: 0, stackTotal: 0, threshold: 0, stateIndex: 0, stackState: [], label: x && h[u] ? h[u].label : void 0 };
                            var v = h[u];
                            var z = this.yData[w];
                            0 <= z ? (v.posTotal += z) : (v.negTotal += z);
                            var B = e.data[w];
                            u = v.absolutePos = v.posTotal;
                            var C = (v.absoluteNeg = v.negTotal);
                            v.stackTotal = u + C;
                            var E = v.stackState.length;
                            B && B.isIntermediateSum ? (a(m, q, 0, m), (m = q), (q = g), (b ^= f), (f ^= b), (b ^= f)) : B && B.isSum ? (a(g, p, E), (b = g)) : (a(b, z, 0, p), B && ((p += z), (q += z)));
                            v.stateIndex++;
                            v.threshold = b;
                            b += v.stackTotal;
                        }
                        d.changed = !1;
                        d.alreadyChanged || (d.alreadyChanged = []);
                        d.alreadyChanged.push(t);
                    }
                },
                getExtremes: function () {
                    var a = this.options.stacking;
                    if (a) {
                        var b = this.yAxis;
                        b = b.waterfall.stacks;
                        var d = (this.stackedYNeg = []);
                        var g = (this.stackedYPos = []);
                        "overlap" === a
                            ? m(b[this.stackKey], function (a) {
                                d.push(e(a.stackState));
                                g.push(B(a.stackState));
                            })
                            : m(b[this.stackKey], function (a) {
                                d.push(a.negTotal + a.threshold);
                                g.push(a.posTotal + a.threshold);
                            });
                        return { dataMin: e(d), dataMax: B(g) };
                    }
                    return { dataMin: this.dataMin, dataMax: this.dataMax };
                },
            },
            {
                getClassName: function () {
                    var a = f.prototype.getClassName.call(this);
                    this.isSum ? (a += " RBG_charts-sum") : this.isIntermediateSum && (a += " RBG_charts-intermediate-sum");
                    return a;
                },
                isValid: function () {
                    return w(this.y) || this.isSum || !!this.isIntermediateSum;
                },
            }
        );
        ("");
        p.compose(c, h);
        return p;
    });
    A(c, "Series/PolygonSeries.js", [c["Core/Series/Series.js"], c["Core/Globals.js"], c["Mixins/LegendSymbol.js"]], function (c, b, h) {
        var a = c.seriesTypes,
            f = b.Series;
        c.seriesType(
            "polygon",
            "scatter",
            { marker: { enabled: !1, states: { hover: { enabled: !1 } } }, stickyTracking: !1, tooltip: { followPointer: !0, pointFormat: "" }, trackByArea: !0 },
            {
                type: "polygon",
                getGraphPath: function () {
                    for (var a = f.prototype.getGraphPath.call(this), b = a.length + 1; b--;) (b === a.length || "M" === a[b][0]) && 0 < b && a.splice(b, 0, ["Z"]);
                    return (this.areaPath = a);
                },
                drawGraph: function () {
                    this.options.fillColor = this.color;
                    a.area.prototype.drawGraph.call(this);
                },
                drawLegendSymbol: h.drawRectangle,
                drawTracker: f.prototype.drawTracker,
                setStackedPoints: b.noop,
            }
        );
        ("");
    });
    A(c, "Series/Bubble/BubbleLegend.js", [c["Core/Chart/Chart.js"], c["Core/Color/Color.js"], c["Core/Globals.js"], c["Core/Legend.js"], c["Core/Utilities.js"]], function (c, b, h, a, f) {
        var q = b.parse;
        b = f.addEvent;
        var u = f.arrayMax,
            z = f.arrayMin,
            E = f.isNumber,
            B = f.merge,
            e = f.objectEach,
            x = f.pick,
            w = f.setOptions,
            m = f.stableSort,
            C = f.wrap;
        ("");
        var v = h.Series,
            p = h.noop;
        w({
            legend: {
                bubbleLegend: {
                    borderColor: void 0,
                    borderWidth: 2,
                    className: void 0,
                    color: void 0,
                    connectorClassName: void 0,
                    connectorColor: void 0,
                    connectorDistance: 60,
                    connectorWidth: 1,
                    enabled: !1,
                    labels: { className: void 0, allowOverlap: !1, format: "", formatter: void 0, align: "right", style: { fontSize: 10, color: void 0 }, x: 0, y: 0 },
                    maxSize: 60,
                    minSize: 10,
                    legendIndex: 0,
                    ranges: { value: void 0, borderColor: void 0, color: void 0, connectorColor: void 0 },
                    sizeBy: "area",
                    sizeByAbsoluteValue: !1,
                    zIndex: 1,
                    zThreshold: 0,
                },
            },
        });
        w = (function () {
            function a(a, d) {
                this.options = this.symbols = this.visible = this.ranges = this.movementX = this.maxLabel = this.legendSymbol = this.legendItemWidth = this.legendItemHeight = this.legendItem = this.legendGroup = this.legend = this.fontMetrics = this.chart = void 0;
                this.setState = p;
                this.init(a, d);
            }
            a.prototype.init = function (a, d) {
                this.options = a;
                this.visible = !0;
                this.chart = d.chart;
                this.legend = d;
            };
            a.prototype.addToLegend = function (a) {
                a.splice(this.options.legendIndex, 0, this);
            };
            a.prototype.drawLegendSymbol = function (a) {
                var d = this.chart,
                    g = this.options,
                    e = x(a.options.itemDistance, 20),
                    b = g.ranges;
                var f = g.connectorDistance;
                this.fontMetrics = d.renderer.fontMetrics(g.labels.style.fontSize.toString() + "px");
                b && b.length && E(b[0].value)
                    ? (m(b, function (d, a) {
                        return a.value - d.value;
                    }),
                      (this.ranges = b),
                      this.setOptions(),
                      this.render(),
                      (d = this.getMaxLabelSize()),
                      (b = this.ranges[0].radius),
                      (a = 2 * b),
                      (f = f - b + d.width),
                      (f = 0 < f ? f : 0),
                      (this.maxLabel = d),
                      (this.movementX = "left" === g.labels.align ? f : 0),
                      (this.legendItemWidth = a + f + e),
                      (this.legendItemHeight = a + this.fontMetrics.h / 2))
                    : (a.options.bubbleLegend.autoRanges = !0);
            };
            a.prototype.setOptions = function () {
                var a = this.ranges,
                    d = this.options,
                    g = this.chart.series[d.seriesIndex],
                    e = this.legend.baseline,
                    b = { "z-index": d.zIndex, "stroke-width": d.borderWidth },
                    f = { "z-index": d.zIndex, "stroke-width": d.connectorWidth },
                    n = this.getLabelStyles(),
                    c = g.options.marker.fillOpacity,
                    h = this.chart.styledMode;
                a.forEach(function (t, r) {
                    h || ((b.stroke = x(t.borderColor, d.borderColor, g.color)), (b.fill = x(t.color, d.color, 1 !== c ? q(g.color).setOpacity(c).get("rgba") : g.color)), (f.stroke = x(t.connectorColor, d.connectorColor, g.color)));
                    a[r].radius = this.getRangeRadius(t.value);
                    a[r] = B(a[r], { center: a[0].radius - a[r].radius + e });
                    h || B(!0, a[r], { bubbleStyle: B(!1, b), connectorStyle: B(!1, f), labelStyle: n });
                }, this);
            };
            a.prototype.getLabelStyles = function () {
                var a = this.options,
                    d = {},
                    g = "left" === a.labels.align,
                    b = this.legend.options.rtl;
                e(a.labels.style, function (a, g) {
                    "color" !== g && "fontSize" !== g && "z-index" !== g && (d[g] = a);
                });
                return B(!1, d, { "font-size": a.labels.style.fontSize, fill: x(a.labels.style.color, "#000000"), "z-index": a.zIndex, align: b || g ? "right" : "left" });
            };
            a.prototype.getRangeRadius = function (a) {
                var d = this.options;
                return this.chart.series[this.options.seriesIndex].getRadius.call(this, d.ranges[d.ranges.length - 1].value, d.ranges[0].value, d.minSize, d.maxSize, a);
            };
            a.prototype.render = function () {
                var a = this.chart.renderer,
                    d = this.options.zThreshold;
                this.symbols || (this.symbols = { connectors: [], bubbleItems: [], labels: [] });
                this.legendSymbol = a.g("bubble-legend");
                this.legendItem = a.g("bubble-legend-item");
                this.legendSymbol.translateX = 0;
                this.legendSymbol.translateY = 0;
                this.ranges.forEach(function (a) {
                    a.value >= d && this.renderRange(a);
                }, this);
                this.legendSymbol.add(this.legendItem);
                this.legendItem.add(this.legendGroup);
                this.hideOverlappingLabels();
            };
            a.prototype.renderRange = function (a) {
                var d = this.options,
                    g = d.labels,
                    e = this.chart.renderer,
                    b = this.symbols,
                    f = b.labels,
                    n = a.center,
                    k = Math.abs(a.radius),
                    c = d.connectorDistance || 0,
                    h = g.align,
                    l = g.style.fontSize;
                c = this.legend.options.rtl || "left" === h ? -c : c;
                g = d.connectorWidth;
                var m = this.ranges[0].radius || 0,
                    q = n - k - d.borderWidth / 2 + g / 2;
                l = l / 2 - (this.fontMetrics.h - l) / 2;
                var p = e.styledMode;
                "center" === h && ((c = 0), (d.connectorDistance = 0), (a.labelStyle.align = "center"));
                h = q + d.labels.y;
                var x = m + c + d.labels.x;
                b.bubbleItems.push(
                    e
                        .circle(m, n + ((q % 1 ? 1 : 0.5) - (g % 2 ? 0 : 0.5)), k)
                        .attr(p ? {} : a.bubbleStyle)
                        .addClass((p ? "RBG_charts-color-" + this.options.seriesIndex + " " : "") + "RBG_charts-bubble-legend-symbol " + (d.className || ""))
                        .add(this.legendSymbol)
                );
                b.connectors.push(
                    e
                        .path(
                            e.crispLine(
                                [
                                    ["M", m, q],
                                    ["L", m + c, q],
                                ],
                                d.connectorWidth
                            )
                        )
                        .attr(p ? {} : a.connectorStyle)
                        .addClass((p ? "RBG_charts-color-" + this.options.seriesIndex + " " : "") + "RBG_charts-bubble-legend-connectors " + (d.connectorClassName || ""))
                        .add(this.legendSymbol)
                );
                a = e
                    .text(this.formatLabel(a), x, h + l)
                    .attr(p ? {} : a.labelStyle)
                    .addClass("RBG_charts-bubble-legend-labels " + (d.labels.className || ""))
                    .add(this.legendSymbol);
                f.push(a);
                a.placed = !0;
                a.alignAttr = { x: x, y: h + l };
            };
            a.prototype.getMaxLabelSize = function () {
                var a, d;
                this.symbols.labels.forEach(function (g) {
                    d = g.getBBox(!0);
                    a = a ? (d.width > a.width ? d : a) : d;
                });
                return a || {};
            };
            a.prototype.formatLabel = function (a) {
                var d = this.options,
                    g = d.labels.formatter;
                d = d.labels.format;
                var e = this.chart.numberFormatter;
                return d ? f.format(d, a) : g ? g.call(a) : e(a.value, 1);
            };
            a.prototype.hideOverlappingLabels = function () {
                var a = this.chart,
                    d = this.symbols;
                !this.options.labels.allowOverlap &&
                    d &&
                    (a.hideOverlappingLabels(d.labels),
                    d.labels.forEach(function (a, e) {
                        a.newOpacity ? a.newOpacity !== a.oldOpacity && d.connectors[e].show() : d.connectors[e].hide();
                    }));
            };
            a.prototype.getRanges = function () {
                var a = this.legend.bubbleLegend,
                    d = a.options.ranges,
                    g,
                    e = Number.MAX_VALUE,
                    b = -Number.MAX_VALUE;
                a.chart.series.forEach(function (d) {
                    d.isBubble &&
                        !d.ignoreSeries &&
                        ((g = d.zData.filter(E)), g.length && ((e = x(d.options.zMin, Math.min(e, Math.max(z(g), !1 === d.options.displayNegative ? d.options.zThreshold : -Number.MAX_VALUE)))), (b = x(d.options.zMax, Math.max(b, u(g))))));
                });
                var f = e === b ? [{ value: b }] : [{ value: e }, { value: (e + b) / 2 }, { value: b, autoRanges: !0 }];
                d.length && d[0].radius && f.reverse();
                f.forEach(function (a, g) {
                    d && d[g] && (f[g] = B(!1, d[g], a));
                });
                return f;
            };
            a.prototype.predictBubbleSizes = function () {
                var a = this.chart,
                    d = this.fontMetrics,
                    g = a.legend.options,
                    e = "horizontal" === g.layout,
                    b = e ? a.legend.lastLineHeight : 0,
                    f = a.plotSizeX,
                    n = a.plotSizeY,
                    c = a.series[this.options.seriesIndex];
                a = Math.ceil(c.minPxSize);
                var h = Math.ceil(c.maxPxSize);
                c = c.options.maxSize;
                var l = Math.min(n, f);
                if (g.floating || !/%$/.test(c)) d = h;
                else if (((c = parseFloat(c)), (d = ((l + b - d.h / 2) * c) / 100 / (c / 100 + 1)), (e && n - d >= f) || (!e && f - d >= n))) d = h;
                return [a, Math.ceil(d)];
            };
            a.prototype.updateRanges = function (a, d) {
                var g = this.legend.options.bubbleLegend;
                g.minSize = a;
                g.maxSize = d;
                g.ranges = this.getRanges();
            };
            a.prototype.correctSizes = function () {
                var a = this.legend,
                    d = this.chart.series[this.options.seriesIndex];
                1 < Math.abs(Math.ceil(d.maxPxSize) - this.options.maxSize) && (this.updateRanges(this.options.minSize, d.maxPxSize), a.render());
            };
            return a;
        })();
        b(a, "afterGetAllItems", function (a) {
            var e = this.bubbleLegend,
                d = this.options,
                g = d.bubbleLegend,
                b = this.chart.getVisibleBubbleSeriesIndex();
            e && e.ranges && e.ranges.length && (g.ranges.length && (g.autoRanges = !!g.ranges[0].autoRanges), this.destroyItem(e));
            0 <= b && d.enabled && g.enabled && ((g.seriesIndex = b), (this.bubbleLegend = new h.BubbleLegend(g, this)), this.bubbleLegend.addToLegend(a.allItems));
        });
        c.prototype.getVisibleBubbleSeriesIndex = function () {
            for (var a = this.series, e = 0; e < a.length;) {
                if (a[e] && a[e].isBubble && a[e].visible && a[e].zData.length) return e;
                e++;
            }
            return -1;
        };
        a.prototype.getLinesHeights = function () {
            var a = this.allItems,
                e = [],
                d = a.length,
                g,
                b = 0;
            for (g = 0; g < d; g++)
                if ((a[g].legendItemHeight && (a[g].itemHeight = a[g].legendItemHeight), a[g] === a[d - 1] || (a[g + 1] && a[g]._legendItemPos[1] !== a[g + 1]._legendItemPos[1]))) {
                    e.push({ height: 0 });
                    var f = e[e.length - 1];
                    for (b; b <= g; b++) a[b].itemHeight > f.height && (f.height = a[b].itemHeight);
                    f.step = g;
                }
            return e;
        };
        a.prototype.retranslateItems = function (a) {
            var e,
                d,
                g,
                b = this.options.rtl,
                f = 0;
            this.allItems.forEach(function (t, n) {
                e = t.legendGroup.translateX;
                d = t._legendItemPos[1];
                if ((g = t.movementX) || (b && t.ranges)) (g = b ? e - t.options.maxSize / 2 : e + g), t.legendGroup.attr({ translateX: g });
                n > a[f].step && f++;
                t.legendGroup.attr({ translateY: Math.round(d + a[f].height / 2) });
                t._legendItemPos[1] = d + a[f].height / 2;
            });
        };
        b(v, "legendItemClick", function () {
            var a = this.chart,
                e = this.visible,
                d = this.chart.legend;
            d &&
                d.bubbleLegend &&
                ((this.visible = !e), (this.ignoreSeries = e), (a = 0 <= a.getVisibleBubbleSeriesIndex()), d.bubbleLegend.visible !== a && (d.update({ bubbleLegend: { enabled: a } }), (d.bubbleLegend.visible = a)), (this.visible = e));
        });
        C(c.prototype, "drawChartBox", function (a, b, d) {
            var g = this.legend,
                f = 0 <= this.getVisibleBubbleSeriesIndex();
            if (g && g.options.enabled && g.bubbleLegend && g.options.bubbleLegend.autoRanges && f) {
                var c = g.bubbleLegend.options;
                f = g.bubbleLegend.predictBubbleSizes();
                g.bubbleLegend.updateRanges(f[0], f[1]);
                c.placed ||
                    ((g.group.placed = !1),
                    g.allItems.forEach(function (d) {
                        d.legendGroup.translateY = null;
                    }));
                g.render();
                this.getMargins();
                this.axes.forEach(function (d) {
                    d.visible && d.render();
                    c.placed ||
                        (d.setScale(),
                        d.updateNames(),
                        e(d.ticks, function (d) {
                            d.isNew = !0;
                            d.isNewLabel = !0;
                        }));
                });
                c.placed = !0;
                this.getMargins();
                a.call(this, b, d);
                g.bubbleLegend.correctSizes();
                g.retranslateItems(g.getLinesHeights());
            } else a.call(this, b, d), g && g.options.enabled && g.bubbleLegend && (g.render(), g.retranslateItems(g.getLinesHeights()));
        });
        h.BubbleLegend = w;
        return h.BubbleLegend;
    });
    A(c, "Series/Bubble/BubbleSeries.js", [c["Core/Axis/Axis.js"], c["Core/Series/Series.js"], c["Core/Color/Color.js"], c["Core/Globals.js"], c["Core/Series/Point.js"], c["Core/Utilities.js"]], function (c, b, h, a, f, q) {
        var u = h.parse;
        h = a.noop;
        var z = q.arrayMax,
            E = q.arrayMin,
            B = q.clamp,
            e = q.extend,
            x = q.isNumber,
            w = q.pick,
            m = q.pInt,
            C = a.Series,
            v = b.seriesTypes;
        ("");
        b.seriesType(
            "bubble",
            "scatter",
            {
                dataLabels: {
                    formatter: function () {
                        return this.point.z;
                    },
                    inside: !0,
                    verticalAlign: "middle",
                },
                animationLimit: 250,
                marker: { lineColor: null, lineWidth: 1, fillOpacity: 0.5, radius: null, states: { hover: { radiusPlus: 0 } }, symbol: "circle" },
                minSize: 8,
                maxSize: "20%",
                softThreshold: !1,
                states: { hover: { halo: { size: 5 } } },
                tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" },
                turboThreshold: 0,
                zThreshold: 0,
                zoneAxis: "z",
            },
            {
                pointArrayMap: ["y", "z"],
                parallelArrays: ["x", "y", "z"],
                trackerGroups: ["group", "dataLabelsGroup"],
                specialGroup: "group",
                bubblePadding: !0,
                zoneAxis: "z",
                directTouch: !0,
                isBubble: !0,
                pointAttribs: function (a, e) {
                    var b = this.options.marker.fillOpacity;
                    a = C.prototype.pointAttribs.call(this, a, e);
                    1 !== b && (a.fill = u(a.fill).setOpacity(b).get("rgba"));
                    return a;
                },
                getRadii: function (a, e, b) {
                    var d = this.zData,
                        g = this.yData,
                        f = b.minPxSize,
                        c = b.maxPxSize,
                        t = [];
                    var n = 0;
                    for (b = d.length; n < b; n++) {
                        var h = d[n];
                        t.push(this.getRadius(a, e, f, c, h, g[n]));
                    }
                    this.radii = t;
                },
                getRadius: function (a, e, b, d, g, f) {
                    var r = this.options,
                        t = "width" !== r.sizeBy,
                        n = r.zThreshold,
                        c = e - a,
                        h = 0.5;
                    if (null === f || null === g) return null;
                    if (x(g)) {
                        r.sizeByAbsoluteValue && ((g = Math.abs(g - n)), (c = Math.max(e - n, Math.abs(a - n))), (a = 0));
                        if (g < a) return b / 2 - 1;
                        0 < c && (h = (g - a) / c);
                    }
                    t && 0 <= h && (h = Math.sqrt(h));
                    return Math.ceil(b + h * (d - b)) / 2;
                },
                animate: function (a) {
                    !a &&
                        this.points.length < this.options.animationLimit &&
                        this.points.forEach(function (a) {
                            var e = a.graphic;
                            e && e.width && (this.hasRendered || e.attr({ x: a.plotX, y: a.plotY, width: 1, height: 1 }), e.animate(this.markerAttribs(a), this.options.animation));
                        }, this);
                },
                hasData: function () {
                    return !!this.processedXData.length;
                },
                translate: function () {
                    var a,
                        b = this.data,
                        f = this.radii;
                    v.scatter.prototype.translate.call(this);
                    for (a = b.length; a--;) {
                        var d = b[a];
                        var g = f ? f[a] : 0;
                        x(g) && g >= this.minPxSize / 2
                            ? ((d.marker = e(d.marker, { radius: g, width: 2 * g, height: 2 * g })), (d.dlBox = { x: d.plotX - g, y: d.plotY - g, width: 2 * g, height: 2 * g }))
                            : (d.shapeArgs = d.plotY = d.dlBox = void 0);
                    }
                },
                alignDataLabel: v.column.prototype.alignDataLabel,
                buildKDTree: h,
                applyZones: h,
            },
            {
                haloPath: function (a) {
                    return f.prototype.haloPath.call(this, 0 === a ? 0 : (this.marker ? this.marker.radius || 0 : 0) + a);
                },
                ttBelow: !1,
            }
        );
        c.prototype.beforePadding = function () {
            var a = this,
                e = this.len,
                b = this.chart,
                d = 0,
                g = e,
                f = this.isXAxis,
                c = f ? "xData" : "yData",
                t = this.min,
                n = {},
                h = Math.min(b.plotWidth, b.plotHeight),
                q = Number.MAX_VALUE,
                u = -Number.MAX_VALUE,
                v = this.max - t,
                F = e / v,
                C = [];
            this.series.forEach(function (d) {
                var e = d.options;
                !d.bubblePadding ||
                    (!d.visible && b.options.chart.ignoreHiddenSeries) ||
                    ((a.allowZoomOutside = !0),
                    C.push(d),
                    f &&
                        (["minSize", "maxSize"].forEach(function (d) {
                            var a = e[d],
                                g = /%$/.test(a);
                            a = m(a);
                            n[d] = g ? (h * a) / 100 : a;
                        }),
                        (d.minPxSize = n.minSize),
                        (d.maxPxSize = Math.max(n.maxSize, n.minSize)),
                        (d = d.zData.filter(x)),
                        d.length && ((q = w(e.zMin, B(E(d), !1 === e.displayNegative ? e.zThreshold : -Number.MAX_VALUE, q))), (u = w(e.zMax, Math.max(u, z(d)))))));
            });
            C.forEach(function (e) {
                var b = e[c],
                    n = b.length;
                f && e.getRadii(q, u, e);
                if (0 < v)
                    for (; n--;)
                        if (x(b[n]) && a.dataMin <= b[n] && b[n] <= a.max) {
                            var r = e.radii ? e.radii[n] : 0;
                            d = Math.min((b[n] - t) * F - r, d);
                            g = Math.max((b[n] - t) * F + r, g);
                        }
            });
            C.length &&
                0 < v &&
                !this.logarithmic &&
                ((g -= e),
                (F *= (e + Math.max(0, d) - Math.min(g, e)) / e),
                [
                    ["min", "userMin", d],
                    ["max", "userMax", g],
                ].forEach(function (d) {
                    "undefined" === typeof w(a.options[d[0]], a[d[1]]) && (a[d[0]] += d[2] / F);
                }));
        };
        ("");
    });
    A(c, "Series/Networkgraph/DraggableNodes.js", [c["Core/Chart/Chart.js"], c["Core/Globals.js"], c["Core/Utilities.js"]], function (c, b, h) {
        var a = h.addEvent;
        b.dragNodesMixin = {
            onMouseDown: function (a, b) {
                b = this.chart.pointer.normalize(b);
                a.fixedPosition = { chartX: b.chartX, chartY: b.chartY, plotX: a.plotX, plotY: a.plotY };
                a.inDragMode = !0;
            },
            onMouseMove: function (a, b) {
                if (a.fixedPosition && a.inDragMode) {
                    var f = this.chart;
                    b = f.pointer.normalize(b);
                    var c = a.fixedPosition.chartX - b.chartX,
                        h = a.fixedPosition.chartY - b.chartY;
                    b = f.graphLayoutsLookup;
                    if (5 < Math.abs(c) || 5 < Math.abs(h))
                        (c = a.fixedPosition.plotX - c),
                            (h = a.fixedPosition.plotY - h),
                            f.isInsidePlot(c, h) &&
                                ((a.plotX = c),
                                (a.plotY = h),
                                (a.hasDragged = !0),
                                this.redrawHalo(a),
                                b.forEach(function (a) {
                                    a.restartSimulation();
                                }));
                }
            },
            onMouseUp: function (a, b) {
                a.fixedPosition && (a.hasDragged && (this.layout.enableSimulation ? this.layout.start() : this.chart.redraw()), (a.inDragMode = a.hasDragged = !1), this.options.fixedDraggable || delete a.fixedPosition);
            },
            redrawHalo: function (a) {
                a && this.halo && this.halo.attr({ d: a.haloPath(this.options.states.hover.halo.size) });
            },
        };
        a(c, "load", function () {
            var b = this,
                c,
                h,
                z;
            b.container &&
                (c = a(b.container, "mousedown", function (f) {
                    var c = b.hoverPoint;
                    c &&
                        c.series &&
                        c.series.hasDraggableNodes &&
                        c.series.options.draggable &&
                        (c.series.onMouseDown(c, f),
                        (h = a(b.container, "mousemove", function (a) {
                            return c && c.series && c.series.onMouseMove(c, a);
                        })),
                        (z = a(b.container.ownerDocument, "mouseup", function (a) {
                            h();
                            z();
                            return c && c.series && c.series.onMouseUp(c, a);
                        })));
                }));
            a(b, "destroy", function () {
                c();
            });
        });
    });
    A(c, "Series/Networkgraph/Integrations.js", [c["Core/Globals.js"]], function (c) {
        c.networkgraphIntegrations = {
            verlet: {
                attractiveForceFunction: function (b, c) {
                    return (c - b) / b;
                },
                repulsiveForceFunction: function (b, c) {
                    return ((c - b) / b) * (c > b ? 1 : 0);
                },
                barycenter: function () {
                    var b = this.options.gravitationalConstant,
                        c = this.barycenter.xFactor,
                        a = this.barycenter.yFactor;
                    c = (c - (this.box.left + this.box.width) / 2) * b;
                    a = (a - (this.box.top + this.box.height) / 2) * b;
                    this.nodes.forEach(function (b) {
                        b.fixedPosition || ((b.plotX -= c / b.mass / b.degree), (b.plotY -= a / b.mass / b.degree));
                    });
                },
                repulsive: function (b, c, a) {
                    c = (c * this.diffTemperature) / b.mass / b.degree;
                    b.fixedPosition || ((b.plotX += a.x * c), (b.plotY += a.y * c));
                },
                attractive: function (b, c, a) {
                    var f = b.getMass(),
                        h = -a.x * c * this.diffTemperature;
                    c = -a.y * c * this.diffTemperature;
                    b.fromNode.fixedPosition || ((b.fromNode.plotX -= (h * f.fromNode) / b.fromNode.degree), (b.fromNode.plotY -= (c * f.fromNode) / b.fromNode.degree));
                    b.toNode.fixedPosition || ((b.toNode.plotX += (h * f.toNode) / b.toNode.degree), (b.toNode.plotY += (c * f.toNode) / b.toNode.degree));
                },
                integrate: function (b, c) {
                    var a = -b.options.friction,
                        f = b.options.maxSpeed,
                        h = (c.plotX + c.dispX - c.prevX) * a;
                    a *= c.plotY + c.dispY - c.prevY;
                    var u = Math.abs,
                        z = u(h) / (h || 1);
                    u = u(a) / (a || 1);
                    h = z * Math.min(f, Math.abs(h));
                    a = u * Math.min(f, Math.abs(a));
                    c.prevX = c.plotX + c.dispX;
                    c.prevY = c.plotY + c.dispY;
                    c.plotX += h;
                    c.plotY += a;
                    c.temperature = b.vectorLength({ x: h, y: a });
                },
                getK: function (b) {
                    return Math.pow((b.box.width * b.box.height) / b.nodes.length, 0.5);
                },
            },
            euler: {
                attractiveForceFunction: function (b, c) {
                    return (b * b) / c;
                },
                repulsiveForceFunction: function (b, c) {
                    return (c * c) / b;
                },
                barycenter: function () {
                    var b = this.options.gravitationalConstant,
                        c = this.barycenter.xFactor,
                        a = this.barycenter.yFactor;
                    this.nodes.forEach(function (f) {
                        if (!f.fixedPosition) {
                            var h = f.getDegree();
                            h *= 1 + h / 2;
                            f.dispX += ((c - f.plotX) * b * h) / f.degree;
                            f.dispY += ((a - f.plotY) * b * h) / f.degree;
                        }
                    });
                },
                repulsive: function (b, c, a, f) {
                    b.dispX += ((a.x / f) * c) / b.degree;
                    b.dispY += ((a.y / f) * c) / b.degree;
                },
                attractive: function (b, c, a, f) {
                    var h = b.getMass(),
                        u = (a.x / f) * c;
                    c *= a.y / f;
                    b.fromNode.fixedPosition || ((b.fromNode.dispX -= (u * h.fromNode) / b.fromNode.degree), (b.fromNode.dispY -= (c * h.fromNode) / b.fromNode.degree));
                    b.toNode.fixedPosition || ((b.toNode.dispX += (u * h.toNode) / b.toNode.degree), (b.toNode.dispY += (c * h.toNode) / b.toNode.degree));
                },
                integrate: function (b, c) {
                    c.dispX += c.dispX * b.options.friction;
                    c.dispY += c.dispY * b.options.friction;
                    var a = (c.temperature = b.vectorLength({ x: c.dispX, y: c.dispY }));
                    0 !== a && ((c.plotX += (c.dispX / a) * Math.min(Math.abs(c.dispX), b.temperature)), (c.plotY += (c.dispY / a) * Math.min(Math.abs(c.dispY), b.temperature)));
                },
                getK: function (b) {
                    return Math.pow((b.box.width * b.box.height) / b.nodes.length, 0.3);
                },
            },
        };
    });
    A(c, "Series/Networkgraph/QuadTree.js", [c["Core/Globals.js"], c["Core/Utilities.js"]], function (c, b) {
        b = b.extend;
        var h = (c.QuadTreeNode = function (a) {
            this.box = a;
            this.boxSize = Math.min(a.width, a.height);
            this.nodes = [];
            this.body = this.isInternal = !1;
            this.isEmpty = !0;
        });
        b(h.prototype, {
            insert: function (a, b) {
                this.isInternal
                    ? this.nodes[this.getBoxPosition(a)].insert(a, b - 1)
                    : ((this.isEmpty = !1),
                      this.body
                          ? b
                              ? ((this.isInternal = !0), this.divideBox(), !0 !== this.body && (this.nodes[this.getBoxPosition(this.body)].insert(this.body, b - 1), (this.body = !0)), this.nodes[this.getBoxPosition(a)].insert(a, b - 1))
                              : ((b = new h({ top: a.plotX, left: a.plotY, width: 0.1, height: 0.1 })), (b.body = a), (b.isInternal = !1), this.nodes.push(b))
                          : ((this.isInternal = !1), (this.body = a)));
            },
            updateMassAndCenter: function () {
                var a = 0,
                    b = 0,
                    c = 0;
                this.isInternal
                    ? (this.nodes.forEach(function (f) {
                        f.isEmpty || ((a += f.mass), (b += f.plotX * f.mass), (c += f.plotY * f.mass));
                    }),
                      (b /= a),
                      (c /= a))
                    : this.body && ((a = this.body.mass), (b = this.body.plotX), (c = this.body.plotY));
                this.mass = a;
                this.plotX = b;
                this.plotY = c;
            },
            divideBox: function () {
                var a = this.box.width / 2,
                    b = this.box.height / 2;
                this.nodes[0] = new h({ left: this.box.left, top: this.box.top, width: a, height: b });
                this.nodes[1] = new h({ left: this.box.left + a, top: this.box.top, width: a, height: b });
                this.nodes[2] = new h({ left: this.box.left + a, top: this.box.top + b, width: a, height: b });
                this.nodes[3] = new h({ left: this.box.left, top: this.box.top + b, width: a, height: b });
            },
            getBoxPosition: function (a) {
                var b = a.plotY < this.box.top + this.box.height / 2;
                return a.plotX < this.box.left + this.box.width / 2 ? (b ? 0 : 3) : b ? 1 : 2;
            },
        });
        c = c.QuadTree = function (a, b, c, u) {
            this.box = { left: a, top: b, width: c, height: u };
            this.maxDepth = 25;
            this.root = new h(this.box, "0");
            this.root.isInternal = !0;
            this.root.isRoot = !0;
            this.root.divideBox();
        };
        b(c.prototype, {
            insertNodes: function (a) {
                a.forEach(function (a) {
                    this.root.insert(a, this.maxDepth);
                }, this);
            },
            visitNodeRecursive: function (a, b, c) {
                var f;
                a || (a = this.root);
                a === this.root && b && (f = b(a));
                !1 !== f &&
                    (a.nodes.forEach(function (a) {
                        if (a.isInternal) {
                            b && (f = b(a));
                            if (!1 === f) return;
                            this.visitNodeRecursive(a, b, c);
                        } else a.body && b && b(a.body);
                        c && c(a);
                    }, this),
                    a === this.root && c && c(a));
            },
            calculateMassAndCenter: function () {
                this.visitNodeRecursive(null, null, function (a) {
                    a.updateMassAndCenter();
                });
            },
        });
    });
    A(c, "Series/Networkgraph/Layouts.js", [c["Core/Chart/Chart.js"], c["Core/Animation/AnimationUtilities.js"], c["Core/Globals.js"], c["Core/Utilities.js"]], function (c, b, h, a) {
        var f = b.setAnimation;
        b = a.addEvent;
        var q = a.clamp,
            u = a.defined,
            z = a.extend,
            E = a.isFunction,
            B = a.pick;
        h.layouts = { "reingold-fruchterman": function () { } };
        z(h.layouts["reingold-fruchterman"].prototype, {
            init: function (a) {
                this.options = a;
                this.nodes = [];
                this.links = [];
                this.series = [];
                this.box = { x: 0, y: 0, width: 0, height: 0 };
                this.setInitialRendering(!0);
                this.integration = h.networkgraphIntegrations[a.integration];
                this.enableSimulation = a.enableSimulation;
                this.attractiveForce = B(a.attractiveForce, this.integration.attractiveForceFunction);
                this.repulsiveForce = B(a.repulsiveForce, this.integration.repulsiveForceFunction);
                this.approximation = a.approximation;
            },
            updateSimulation: function (a) {
                this.enableSimulation = B(a, this.options.enableSimulation);
            },
            start: function () {
                var a = this.series,
                    b = this.options;
                this.currentStep = 0;
                this.forces = (a[0] && a[0].forces) || [];
                this.chart = a[0] && a[0].chart;
                this.initialRendering &&
                    (this.initPositions(),
                    a.forEach(function (a) {
                        a.finishedAnimating = !0;
                        a.render();
                    }));
                this.setK();
                this.resetSimulation(b);
                this.enableSimulation && this.step();
            },
            step: function () {
                var a = this,
                    b = this.series;
                a.currentStep++;
                "barnes-hut" === a.approximation && (a.createQuadTree(), a.quadTree.calculateMassAndCenter());
                a.forces.forEach(function (b) {
                    a[b + "Forces"](a.temperature);
                });
                a.applyLimits(a.temperature);
                a.temperature = a.coolDown(a.startTemperature, a.diffTemperature, a.currentStep);
                a.prevSystemTemperature = a.systemTemperature;
                a.systemTemperature = a.getSystemTemperature();
                a.enableSimulation &&
                    (b.forEach(function (a) {
                        a.chart && a.render();
                    }),
                    a.maxIterations-- && isFinite(a.temperature) && !a.isStable()
                        ? (a.simulation && h.win.cancelAnimationFrame(a.simulation),
                          (a.simulation = h.win.requestAnimationFrame(function () {
                              a.step();
                          })))
                        : (a.simulation = !1));
            },
            stop: function () {
                this.simulation && h.win.cancelAnimationFrame(this.simulation);
            },
            setArea: function (a, b, c, f) {
                this.box = { left: a, top: b, width: c, height: f };
            },
            setK: function () {
                this.k = this.options.linkLength || this.integration.getK(this);
            },
            addElementsToCollection: function (a, b) {
                a.forEach(function (a) {
                    -1 === b.indexOf(a) && b.push(a);
                });
            },
            removeElementFromCollection: function (a, b) {
                a = b.indexOf(a);
                -1 !== a && b.splice(a, 1);
            },
            clear: function () {
                this.nodes.length = 0;
                this.links.length = 0;
                this.series.length = 0;
                this.resetSimulation();
            },
            resetSimulation: function () {
                this.forcedStop = !1;
                this.systemTemperature = 0;
                this.setMaxIterations();
                this.setTemperature();
                this.setDiffTemperature();
            },
            restartSimulation: function () {
                this.simulation ? this.resetSimulation() : (this.setInitialRendering(!1), this.enableSimulation ? this.start() : this.setMaxIterations(1), this.chart && this.chart.redraw(), this.setInitialRendering(!0));
            },
            setMaxIterations: function (a) {
                this.maxIterations = B(a, this.options.maxIterations);
            },
            setTemperature: function () {
                this.temperature = this.startTemperature = Math.sqrt(this.nodes.length);
            },
            setDiffTemperature: function () {
                this.diffTemperature = this.startTemperature / (this.options.maxIterations + 1);
            },
            setInitialRendering: function (a) {
                this.initialRendering = a;
            },
            createQuadTree: function () {
                this.quadTree = new h.QuadTree(this.box.left, this.box.top, this.box.width, this.box.height);
                this.quadTree.insertNodes(this.nodes);
            },
            initPositions: function () {
                var a = this.options.initialPositions;
                E(a)
                    ? (a.call(this),
                      this.nodes.forEach(function (a) {
                          u(a.prevX) || (a.prevX = a.plotX);
                          u(a.prevY) || (a.prevY = a.plotY);
                          a.dispX = 0;
                          a.dispY = 0;
                      }))
                    : "circle" === a
                    ? this.setCircularPositions()
                    : this.setRandomPositions();
            },
            setCircularPositions: function () {
                function a(b) {
                    b.linksFrom.forEach(function (d) {
                        p[d.toNode.id] || ((p[d.toNode.id] = !0), q.push(d.toNode), a(d.toNode));
                    });
                }
                var b = this.box,
                    c = this.nodes,
                    f = (2 * Math.PI) / (c.length + 1),
                    h = c.filter(function (a) {
                        return 0 === a.linksTo.length;
                    }),
                    q = [],
                    p = {},
                    l = this.options.initialPositionRadius;
                h.forEach(function (b) {
                    q.push(b);
                    a(b);
                });
                q.length
                    ? c.forEach(function (a) {
                        -1 === q.indexOf(a) && q.push(a);
                    })
                    : (q = c);
                q.forEach(function (a, d) {
                    a.plotX = a.prevX = B(a.plotX, b.width / 2 + l * Math.cos(d * f));
                    a.plotY = a.prevY = B(a.plotY, b.height / 2 + l * Math.sin(d * f));
                    a.dispX = 0;
                    a.dispY = 0;
                });
            },
            setRandomPositions: function () {
                function a(a) {
                    a = (a * a) / Math.PI;
                    return (a -= Math.floor(a));
                }
                var b = this.box,
                    c = this.nodes,
                    f = c.length + 1;
                c.forEach(function (e, c) {
                    e.plotX = e.prevX = B(e.plotX, b.width * a(c));
                    e.plotY = e.prevY = B(e.plotY, b.height * a(f + c));
                    e.dispX = 0;
                    e.dispY = 0;
                });
            },
            force: function (a) {
                this.integration[a].apply(this, Array.prototype.slice.call(arguments, 1));
            },
            barycenterForces: function () {
                this.getBarycenter();
                this.force("barycenter");
            },
            getBarycenter: function () {
                var a = 0,
                    b = 0,
                    c = 0;
                this.nodes.forEach(function (e) {
                    b += e.plotX * e.mass;
                    c += e.plotY * e.mass;
                    a += e.mass;
                });
                return (this.barycenter = { x: b, y: c, xFactor: b / a, yFactor: c / a });
            },
            barnesHutApproximation: function (a, b) {
                var e = this.getDistXY(a, b),
                    c = this.vectorLength(e);
                if (a !== b && 0 !== c)
                    if (b.isInternal)
                        if (b.boxSize / c < this.options.theta && 0 !== c) {
                            var f = this.repulsiveForce(c, this.k);
                            this.force("repulsive", a, f * b.mass, e, c);
                            var h = !1;
                        } else h = !0;
                    else (f = this.repulsiveForce(c, this.k)), this.force("repulsive", a, f * b.mass, e, c);
                return h;
            },
            repulsiveForces: function () {
                var a = this;
                "barnes-hut" === a.approximation
                    ? a.nodes.forEach(function (b) {
                        a.quadTree.visitNodeRecursive(null, function (e) {
                            return a.barnesHutApproximation(b, e);
                        });
                    })
                    : a.nodes.forEach(function (b) {
                        a.nodes.forEach(function (e) {
                            if (b !== e && !b.fixedPosition) {
                                var c = a.getDistXY(b, e);
                                var f = a.vectorLength(c);
                                if (0 !== f) {
                                    var h = a.repulsiveForce(f, a.k);
                                    a.force("repulsive", b, h * e.mass, c, f);
                                }
                            }
                        });
                    });
            },
            attractiveForces: function () {
                var a = this,
                    b,
                    c,
                    f;
                a.links.forEach(function (e) {
                    e.fromNode && e.toNode && ((b = a.getDistXY(e.fromNode, e.toNode)), (c = a.vectorLength(b)), 0 !== c && ((f = a.attractiveForce(c, a.k)), a.force("attractive", e, f, b, c)));
                });
            },
            applyLimits: function () {
                var a = this;
                a.nodes.forEach(function (b) {
                    b.fixedPosition || (a.integration.integrate(a, b), a.applyLimitBox(b, a.box), (b.dispX = 0), (b.dispY = 0));
                });
            },
            applyLimitBox: function (a, b) {
                var c = a.radius;
                a.plotX = q(a.plotX, b.left + c, b.width - c);
                a.plotY = q(a.plotY, b.top + c, b.height - c);
            },
            coolDown: function (a, b, c) {
                return a - b * c;
            },
            isStable: function () {
                return 0.00001 > Math.abs(this.systemTemperature - this.prevSystemTemperature) || 0 >= this.temperature;
            },
            getSystemTemperature: function () {
                return this.nodes.reduce(function (a, b) {
                    return a + b.temperature;
                }, 0);
            },
            vectorLength: function (a) {
                return Math.sqrt(a.x * a.x + a.y * a.y);
            },
            getDistR: function (a, b) {
                a = this.getDistXY(a, b);
                return this.vectorLength(a);
            },
            getDistXY: function (a, b) {
                var c = a.plotX - b.plotX;
                a = a.plotY - b.plotY;
                return { x: c, y: a, absX: Math.abs(c), absY: Math.abs(a) };
            },
        });
        b(c, "predraw", function () {
            this.graphLayoutsLookup &&
                this.graphLayoutsLookup.forEach(function (a) {
                    a.stop();
                });
        });
        b(c, "render", function () {
            function a(a) {
                a.maxIterations-- && isFinite(a.temperature) && !a.isStable() && !a.enableSimulation && (a.beforeStep && a.beforeStep(), a.step(), (c = !1), (b = !0));
            }
            var b = !1;
            if (this.graphLayoutsLookup) {
                f(!1, this);
                for (
                    this.graphLayoutsLookup.forEach(function (a) {
                        a.start();
                }) ;
                    !c;

                ) {
                    var c = !0;
                    this.graphLayoutsLookup.forEach(a);
                }
                b &&
                    this.series.forEach(function (a) {
                        a && a.layout && a.render();
                    });
            }
        });
        b(c, "beforePrint", function () {
            this.graphLayoutsLookup &&
                (this.graphLayoutsLookup.forEach(function (a) {
                    a.updateSimulation(!1);
                }),
                this.redraw());
        });
        b(c, "afterPrint", function () {
            this.graphLayoutsLookup &&
                this.graphLayoutsLookup.forEach(function (a) {
                    a.updateSimulation();
                });
            this.redraw();
        });
    });
    A(c, "Series/PackedBubbleSeries.js", [c["Core/Series/Series.js"], c["Core/Chart/Chart.js"], c["Core/Color/Color.js"], c["Core/Globals.js"], c["Core/Series/Point.js"], c["Core/Utilities.js"]], function (c, b, h, a, f, q) {
        var u = h.parse,
            z = q.addEvent,
            E = q.clamp,
            B = q.defined,
            e = q.extend;
        h = q.extendClass;
        var x = q.fireEvent,
            w = q.isArray,
            m = q.isNumber,
            C = q.merge,
            v = q.pick,
            p = a.Series,
            l = a.layouts["reingold-fruchterman"],
            k = a.dragNodesMixin;
        ("");
        b.prototype.getSelectedParentNodes = function () {
            var a = [];
            this.series.forEach(function (d) {
                d.parentNode && d.parentNode.selected && a.push(d.parentNode);
            });
            return a;
        };
        a.networkgraphIntegrations.packedbubble = {
            repulsiveForceFunction: function (a, b, c, e) {
                return Math.min(a, (c.marker.radius + e.marker.radius) / 2);
            },
            barycenter: function () {
                var a = this,
                    b = a.options.gravitationalConstant,
                    c = a.box,
                    e = a.nodes,
                    f,
                    n;
                e.forEach(function (d) {
                    a.options.splitSeries && !d.isParentNode ? ((f = d.series.parentNode.plotX), (n = d.series.parentNode.plotY)) : ((f = c.width / 2), (n = c.height / 2));
                    d.fixedPosition || ((d.plotX -= ((d.plotX - f) * b) / (d.mass * Math.sqrt(e.length))), (d.plotY -= ((d.plotY - n) * b) / (d.mass * Math.sqrt(e.length))));
                });
            },
            repulsive: function (a, b, c, e) {
                var d = (b * this.diffTemperature) / a.mass / a.degree;
                b = c.x * d;
                c = c.y * d;
                a.fixedPosition || ((a.plotX += b), (a.plotY += c));
                e.fixedPosition || ((e.plotX -= b), (e.plotY -= c));
            },
            integrate: a.networkgraphIntegrations.verlet.integrate,
            getK: a.noop,
        };
        a.layouts.packedbubble = h(l, {
            beforeStep: function () {
                this.options.marker &&
                    this.series.forEach(function (a) {
                        a && a.calculateParentRadius();
                    });
            },
            setCircularPositions: function () {
                var a = this,
                    b = a.box,
                    c = a.nodes,
                    e = (2 * Math.PI) / (c.length + 1),
                    f,
                    n,
                    h = a.options.initialPositionRadius;
                c.forEach(function (d, g) {
                    a.options.splitSeries && !d.isParentNode ? ((f = d.series.parentNode.plotX), (n = d.series.parentNode.plotY)) : ((f = b.width / 2), (n = b.height / 2));
                    d.plotX = d.prevX = v(d.plotX, f + h * Math.cos(d.index || g * e));
                    d.plotY = d.prevY = v(d.plotY, n + h * Math.sin(d.index || g * e));
                    d.dispX = 0;
                    d.dispY = 0;
                });
            },
            repulsiveForces: function () {
                var a = this,
                    b,
                    c,
                    e,
                    f = a.options.bubblePadding;
                a.nodes.forEach(function (d) {
                    d.degree = d.mass;
                    d.neighbours = 0;
                    a.nodes.forEach(function (g) {
                        b = 0;
                        d === g ||
                            d.fixedPosition ||
                            (!a.options.seriesInteraction && d.series !== g.series) ||
                            ((e = a.getDistXY(d, g)),
                            (c = a.vectorLength(e) - (d.marker.radius + g.marker.radius + f)),
                            0 > c && ((d.degree += 0.01), d.neighbours++, (b = a.repulsiveForce(-c / Math.sqrt(d.neighbours), a.k, d, g))),
                            a.force("repulsive", d, b * g.mass, e, g, c));
                    });
                });
            },
            applyLimitBox: function (a) {
                if (this.options.splitSeries && !a.isParentNode && this.options.parentNodeLimit) {
                    var d = this.getDistXY(a, a.series.parentNode);
                    var b = a.series.parentNodeRadius - a.marker.radius - this.vectorLength(d);
                    0 > b && b > -2 * a.marker.radius && ((a.plotX -= 0.01 * d.x), (a.plotY -= 0.01 * d.y));
                }
                l.prototype.applyLimitBox.apply(this, arguments);
            },
        });
        c.seriesType(
            "packedbubble",
            "bubble",
            {
                minSize: "10%",
                maxSize: "50%",
                sizeBy: "area",
                zoneAxis: "y",
                crisp: !1,
                tooltip: { pointFormat: "Value: {point.value}" },
                draggable: !0,
                useSimulation: !0,
                parentNode: { allowPointSelect: !1 },
                dataLabels: {
                    formatter: function () {
                        return this.point.value;
                    },
                    parentNodeFormatter: function () {
                        return this.name;
                    },
                    parentNodeTextPath: { enabled: !0 },
                    padding: 0,
                    style: { transition: "opacity 2000ms" },
                },
                layoutAlgorithm: {
                    initialPositions: "circle",
                    initialPositionRadius: 20,
                    bubblePadding: 5,
                    parentNodeLimit: !1,
                    seriesInteraction: !0,
                    dragBetweenSeries: !1,
                    parentNodeOptions: {
                        maxIterations: 400,
                        gravitationalConstant: 0.03,
                        maxSpeed: 50,
                        initialPositionRadius: 100,
                        seriesInteraction: !0,
                        marker: { fillColor: null, fillOpacity: 1, lineWidth: 1, lineColor: null, symbol: "circle" },
                    },
                    enableSimulation: !0,
                    type: "packedbubble",
                    integration: "packedbubble",
                    maxIterations: 1e3,
                    splitSeries: !1,
                    maxSpeed: 5,
                    gravitationalConstant: 0.01,
                    friction: -0.981,
                },
            },
            {
                hasDraggableNodes: !0,
                forces: ["barycenter", "repulsive"],
                pointArrayMap: ["value"],
                trackerGroups: ["group", "dataLabelsGroup", "parentNodesGroup"],
                pointValKey: "value",
                isCartesian: !1,
                requireSorting: !1,
                directTouch: !0,
                axisTypes: [],
                noSharedTooltip: !0,
                searchPoint: a.noop,
                accumulateAllPoints: function (a) {
                    var d = a.chart,
                        b = [],
                        c,
                        e;
                    for (c = 0; c < d.series.length; c++)
                        if (((a = d.series[c]), (a.is("packedbubble") && a.visible) || !d.options.chart.ignoreHiddenSeries))
                            for (e = 0; e < a.yData.length; e++) b.push([null, null, a.yData[e], a.index, e, { id: e, marker: { radius: 0 } }]);
                    return b;
                },
                init: function () {
                    p.prototype.init.apply(this, arguments);
                    z(this, "updatedData", function () {
                        this.chart.series.forEach(function (a) {
                            a.type === this.type && (a.isDirty = !0);
                        }, this);
                    });
                    return this;
                },
                render: function () {
                    var a = [];
                    p.prototype.render.apply(this, arguments);
                    this.options.dataLabels.allowOverlap ||
                        (this.data.forEach(function (d) {
                            w(d.dataLabels) &&
                                d.dataLabels.forEach(function (d) {
                                    a.push(d);
                                });
                        }),
                        this.options.useSimulation && this.chart.hideOverlappingLabels(a));
                },
                setVisible: function () {
                    var a = this;
                    p.prototype.setVisible.apply(a, arguments);
                    a.parentNodeLayout && a.graph
                        ? a.visible
                            ? (a.graph.show(), a.parentNode.dataLabel && a.parentNode.dataLabel.show())
                            : (a.graph.hide(), a.parentNodeLayout.removeElementFromCollection(a.parentNode, a.parentNodeLayout.nodes), a.parentNode.dataLabel && a.parentNode.dataLabel.hide())
                        : a.layout &&
                          (a.visible
                              ? a.layout.addElementsToCollection(a.points, a.layout.nodes)
                              : a.points.forEach(function (d) {
                                  a.layout.removeElementFromCollection(d, a.layout.nodes);
                              }));
                },
                drawDataLabels: function () {
                    var a = this.options.dataLabels.textPath,
                        b = this.points;
                    p.prototype.drawDataLabels.apply(this, arguments);
                    this.parentNode &&
                        ((this.parentNode.formatPrefix = "parentNode"),
                        (this.points = [this.parentNode]),
                        (this.options.dataLabels.textPath = this.options.dataLabels.parentNodeTextPath),
                        p.prototype.drawDataLabels.apply(this, arguments),
                        (this.points = b),
                        (this.options.dataLabels.textPath = a));
                },
                seriesBox: function () {
                    var a = this.chart,
                        b = Math.max,
                        c = Math.min,
                        e,
                        f = [a.plotLeft, a.plotLeft + a.plotWidth, a.plotTop, a.plotTop + a.plotHeight];
                    this.data.forEach(function (a) {
                        B(a.plotX) && B(a.plotY) && a.marker.radius && ((e = a.marker.radius), (f[0] = c(f[0], a.plotX - e)), (f[1] = b(f[1], a.plotX + e)), (f[2] = c(f[2], a.plotY - e)), (f[3] = b(f[3], a.plotY + e)));
                    });
                    return m(f.width / f.height) ? f : null;
                },
                calculateParentRadius: function () {
                    var a = this.seriesBox();
                    this.parentNodeRadius = E(
                        Math.sqrt((2 * this.parentNodeMass) / Math.PI) + 20,
                        20,
                        a ? Math.max(Math.sqrt(Math.pow(a.width, 2) + Math.pow(a.height, 2)) / 2 + 20, 20) : Math.sqrt((2 * this.parentNodeMass) / Math.PI) + 20
                    );
                    this.parentNode && (this.parentNode.marker.radius = this.parentNode.radius = this.parentNodeRadius);
                },
                drawGraph: function () {
                    if (this.layout && this.layout.options.splitSeries) {
                        var a = this.chart,
                            b = this.layout.options.parentNodeOptions.marker;
                        b = { fill: b.fillColor || u(this.color).brighten(0.4).get(), opacity: b.fillOpacity, stroke: b.lineColor || this.color, "stroke-width": b.lineWidth };
                        var c = this.visible ? "inherit" : "hidden";
                        this.parentNodesGroup || ((this.parentNodesGroup = this.plotGroup("parentNodesGroup", "parentNode", c, 0.1, a.seriesGroup)), this.group.attr({ zIndex: 2 }));
                        this.calculateParentRadius();
                        c = C({ x: this.parentNode.plotX - this.parentNodeRadius, y: this.parentNode.plotY - this.parentNodeRadius, width: 2 * this.parentNodeRadius, height: 2 * this.parentNodeRadius }, b);
                        this.parentNode.graphic || (this.graph = this.parentNode.graphic = a.renderer.symbol(b.symbol).add(this.parentNodesGroup));
                        this.parentNode.graphic.attr(c);
                    }
                },
                createParentNodes: function () {
                    var a = this,
                        b = a.chart,
                        c = a.parentNodeLayout,
                        e,
                        f = a.parentNode,
                        n = a.pointClass;
                    a.parentNodeMass = 0;
                    a.points.forEach(function (d) {
                        a.parentNodeMass += Math.PI * Math.pow(d.marker.radius, 2);
                    });
                    a.calculateParentRadius();
                    c.nodes.forEach(function (d) {
                        d.seriesIndex === a.index && (e = !0);
                    });
                    c.setArea(0, 0, b.plotWidth, b.plotHeight);
                    e ||
                        (f ||
                            (f = new n().init(this, {
                                mass: a.parentNodeRadius / 2,
                                marker: { radius: a.parentNodeRadius },
                                dataLabels: { inside: !1 },
                                dataLabelOnNull: !0,
                                degree: a.parentNodeRadius,
                                isParentNode: !0,
                                seriesIndex: a.index,
                            })),
                        a.parentNode && ((f.plotX = a.parentNode.plotX), (f.plotY = a.parentNode.plotY)),
                        (a.parentNode = f),
                        c.addElementsToCollection([a], c.series),
                        c.addElementsToCollection([f], c.nodes));
                },
                drawTracker: function () {
                    var d = this.parentNode;
                    a.TrackerMixin.drawTrackerPoint.call(this);
                    if (d) {
                        var b = w(d.dataLabels) ? d.dataLabels : d.dataLabel ? [d.dataLabel] : [];
                        d.graphic && (d.graphic.element.point = d);
                        b.forEach(function (a) {
                            a.div ? (a.div.point = d) : (a.element.point = d);
                        });
                    }
                },
                addSeriesLayout: function () {
                    var d = this.options.layoutAlgorithm,
                        b = this.chart.graphLayoutsStorage,
                        c = this.chart.graphLayoutsLookup,
                        e = C(d, d.parentNodeOptions, { enableSimulation: this.layout.options.enableSimulation });
                    var f = b[d.type + "-series"];
                    f || ((b[d.type + "-series"] = f = new a.layouts[d.type]()), f.init(e), c.splice(f.index, 0, f));
                    this.parentNodeLayout = f;
                    this.createParentNodes();
                },
                addLayout: function () {
                    var d = this.options.layoutAlgorithm,
                        b = this.chart.graphLayoutsStorage,
                        c = this.chart.graphLayoutsLookup,
                        e = this.chart.options.chart;
                    b || ((this.chart.graphLayoutsStorage = b = {}), (this.chart.graphLayoutsLookup = c = []));
                    var f = b[d.type];
                    f || ((d.enableSimulation = B(e.forExport) ? !e.forExport : d.enableSimulation), (b[d.type] = f = new a.layouts[d.type]()), f.init(d), c.splice(f.index, 0, f));
                    this.layout = f;
                    this.points.forEach(function (a) {
                        a.mass = 2;
                        a.degree = 1;
                        a.collisionNmb = 1;
                    });
                    f.setArea(0, 0, this.chart.plotWidth, this.chart.plotHeight);
                    f.addElementsToCollection([this], f.series);
                    f.addElementsToCollection(this.points, f.nodes);
                },
                deferLayout: function () {
                    var a = this.options.layoutAlgorithm;
                    this.visible && (this.addLayout(), a.splitSeries && this.addSeriesLayout());
                },
                translate: function () {
                    var a = this.chart,
                        b = this.data,
                        c = this.index,
                        f,
                        t = this.options.useSimulation;
                    this.processedXData = this.xData;
                    this.generatePoints();
                    B(a.allDataPoints) || ((a.allDataPoints = this.accumulateAllPoints(this)), this.getPointRadius());
                    if (t) var n = a.allDataPoints;
                    else (n = this.placeBubbles(a.allDataPoints)), (this.options.draggable = !1);
                    for (f = 0; f < n.length; f++)
                        if (n[f][3] === c) {
                            var h = b[n[f][4]];
                            var l = n[f][2];
                            t || ((h.plotX = n[f][0] - a.plotLeft + a.diffX), (h.plotY = n[f][1] - a.plotTop + a.diffY));
                            h.marker = e(h.marker, { radius: l, width: 2 * l, height: 2 * l });
                            h.radius = l;
                        }
                    t && this.deferLayout();
                    x(this, "afterTranslate");
                },
                checkOverlap: function (a, b) {
                    var d = a[0] - b[0],
                        c = a[1] - b[1];
                    return -0.001 > Math.sqrt(d * d + c * c) - Math.abs(a[2] + b[2]);
                },
                positionBubble: function (a, b, c) {
                    var d = Math.sqrt,
                        e = Math.asin,
                        g = Math.acos,
                        f = Math.pow,
                        h = Math.abs;
                    d = d(f(a[0] - b[0], 2) + f(a[1] - b[1], 2));
                    g = g((f(d, 2) + f(c[2] + b[2], 2) - f(c[2] + a[2], 2)) / (2 * (c[2] + b[2]) * d));
                    e = e(h(a[0] - b[0]) / d);
                    a = (0 > a[1] - b[1] ? 0 : Math.PI) + g + e * (0 > (a[0] - b[0]) * (a[1] - b[1]) ? 1 : -1);
                    return [b[0] + (b[2] + c[2]) * Math.sin(a), b[1] - (b[2] + c[2]) * Math.cos(a), c[2], c[3], c[4]];
                },
                placeBubbles: function (a) {
                    var b = this.checkOverlap,
                        d = this.positionBubble,
                        c = [],
                        e = 1,
                        f = 0,
                        h = 0;
                    var l = [];
                    var k;
                    a = a.sort(function (a, b) {
                        return b[2] - a[2];
                    });
                    if (a.length) {
                        c.push([[0, 0, a[0][2], a[0][3], a[0][4]]]);
                        if (1 < a.length)
                            for (c.push([[0, 0 - a[1][2] - a[0][2], a[1][2], a[1][3], a[1][4]]]), k = 2; k < a.length; k++)
                                (a[k][2] = a[k][2] || 1),
                                    (l = d(c[e][f], c[e - 1][h], a[k])),
                                    b(l, c[e][0])
                                        ? (c.push([]), (h = 0), c[e + 1].push(d(c[e][f], c[e][0], a[k])), e++, (f = 0))
                                        : 1 < e && c[e - 1][h + 1] && b(l, c[e - 1][h + 1])
                                        ? (h++, c[e].push(d(c[e][f], c[e - 1][h], a[k])), f++)
                                        : (f++, c[e].push(l));
                        this.chart.stages = c;
                        this.chart.rawPositions = [].concat.apply([], c);
                        this.resizeRadius();
                        l = this.chart.rawPositions;
                    }
                    return l;
                },
                resizeRadius: function () {
                    var a = this.chart,
                        b = a.rawPositions,
                        c = Math.min,
                        e = Math.max,
                        f = a.plotLeft,
                        n = a.plotTop,
                        h = a.plotHeight,
                        l = a.plotWidth,
                        k,
                        q,
                        m;
                    var p = (k = Number.POSITIVE_INFINITY);
                    var u = (q = Number.NEGATIVE_INFINITY);
                    for (m = 0; m < b.length; m++) {
                        var v = b[m][2];
                        p = c(p, b[m][0] - v);
                        u = e(u, b[m][0] + v);
                        k = c(k, b[m][1] - v);
                        q = e(q, b[m][1] + v);
                    }
                    m = [u - p, q - k];
                    c = c.apply([], [(l - f) / m[0], (h - n) / m[1]]);
                    if (1e-10 < Math.abs(c - 1)) {
                        for (m = 0; m < b.length; m++) b[m][2] *= c;
                        this.placeBubbles(b);
                    } else (a.diffY = h / 2 + n - k - (q - k) / 2), (a.diffX = l / 2 + f - p - (u - p) / 2);
                },
                calculateZExtremes: function () {
                    var a = this.options.zMin,
                        b = this.options.zMax,
                        c = Infinity,
                        e = -Infinity;
                    if (a && b) return [a, b];
                    this.chart.series.forEach(function (a) {
                        a.yData.forEach(function (a) {
                            B(a) && (a > e && (e = a), a < c && (c = a));
                        });
                    });
                    a = v(a, c);
                    b = v(b, e);
                    return [a, b];
                },
                getPointRadius: function () {
                    var a = this,
                        b = a.chart,
                        c = a.options,
                        e = c.useSimulation,
                        f = Math.min(b.plotWidth, b.plotHeight),
                        n = {},
                        h = [],
                        k = b.allDataPoints,
                        l,
                        m,
                        q,
                        p;
                    ["minSize", "maxSize"].forEach(function (a) {
                        var b = parseInt(c[a], 10),
                            d = /%$/.test(c[a]);
                        n[a] = d ? (f * b) / 100 : b * Math.sqrt(k.length);
                    });
                    b.minRadius = l = n.minSize / Math.sqrt(k.length);
                    b.maxRadius = m = n.maxSize / Math.sqrt(k.length);
                    var u = e ? a.calculateZExtremes() : [l, m];
                    (k || []).forEach(function (b, d) {
                        q = e ? E(b[2], u[0], u[1]) : b[2];
                        p = a.getRadius(u[0], u[1], l, m, q);
                        0 === p && (p = null);
                        k[d][2] = p;
                        h.push(p);
                    });
                    a.radii = h;
                },
                redrawHalo: k.redrawHalo,
                onMouseDown: k.onMouseDown,
                onMouseMove: k.onMouseMove,
                onMouseUp: function (a) {
                    if (a.fixedPosition && !a.removed) {
                        var b,
                            d,
                            c = this.layout,
                            e = this.parentNodeLayout;
                        e &&
                            c.options.dragBetweenSeries &&
                            e.nodes.forEach(function (e) {
                                a &&
                                    a.marker &&
                                    e !== a.series.parentNode &&
                                    ((b = c.getDistXY(a, e)),
                                    (d = c.vectorLength(b) - e.marker.radius - a.marker.radius),
                                    0 > d && (e.series.addPoint(C(a.options, { plotX: a.plotX, plotY: a.plotY }), !1), c.removeElementFromCollection(a, c.nodes), a.remove()));
                            });
                        k.onMouseUp.apply(this, arguments);
                    }
                },
                destroy: function () {
                    this.chart.graphLayoutsLookup &&
                        this.chart.graphLayoutsLookup.forEach(function (a) {
                            a.removeElementFromCollection(this, a.series);
                        }, this);
                    this.parentNode && (this.parentNodeLayout.removeElementFromCollection(this.parentNode, this.parentNodeLayout.nodes), this.parentNode.dataLabel && (this.parentNode.dataLabel = this.parentNode.dataLabel.destroy()));
                    a.Series.prototype.destroy.apply(this, arguments);
                },
                alignDataLabel: a.Series.prototype.alignDataLabel,
            },
            {
                destroy: function () {
                    this.series.layout && this.series.layout.removeElementFromCollection(this, this.series.layout.nodes);
                    return f.prototype.destroy.apply(this, arguments);
                },
                firePointEvent: function (a, b, c) {
                    var d = this.series.options;
                    if (this.isParentNode && d.parentNode) {
                        var e = d.allowPointSelect;
                        d.allowPointSelect = d.parentNode.allowPointSelect;
                        f.prototype.firePointEvent.apply(this, arguments);
                        d.allowPointSelect = e;
                    } else f.prototype.firePointEvent.apply(this, arguments);
                },
                select: function (a, c) {
                    var d = this.series.chart;
                    this.isParentNode ? ((d.getSelectedPoints = d.getSelectedParentNodes), f.prototype.select.apply(this, arguments), (d.getSelectedPoints = b.prototype.getSelectedPoints)) : f.prototype.select.apply(this, arguments);
                },
            }
        );
        z(b, "beforeRedraw", function () {
            this.allDataPoints && delete this.allDataPoints;
        });
        ("");
    });
    A(
        c,
        "Extensions/Polar.js",
        [c["Core/Animation/AnimationUtilities.js"], c["Core/Chart/Chart.js"], c["Core/Globals.js"], c["Extensions/Pane.js"], c["Core/Pointer.js"], c["Core/Renderer/SVG/SVGRenderer.js"], c["Core/Utilities.js"]],
        function (c, b, h, a, f, q, u) {
            var z = c.animObject,
                E = u.addEvent,
                B = u.defined,
                e = u.find,
                x = u.isNumber,
                w = u.pick,
                m = u.splat,
                C = u.uniqueKey;
            c = u.wrap;
            var v = h.Series,
                p = h.seriesTypes,
                l = v.prototype;
            f = f.prototype;
            l.searchPointByAngle = function (a) {
                var b = this.chart,
                    d = this.xAxis.pane.center;
                return this.searchKDTree({ clientX: 180 + (-180 / Math.PI) * Math.atan2(a.chartX - d[0] - b.plotLeft, a.chartY - d[1] - b.plotTop) });
            };
            l.getConnectors = function (a, b, c, e) {
                var d = e ? 1 : 0;
                var f = 0 <= b && b <= a.length - 1 ? b : 0 > b ? a.length - 1 + b : 0;
                b = 0 > f - 1 ? a.length - (1 + d) : f - 1;
                d = f + 1 > a.length - 1 ? d : f + 1;
                var g = a[b];
                d = a[d];
                var h = g.plotX;
                g = g.plotY;
                var k = d.plotX;
                var l = d.plotY;
                d = a[f].plotX;
                f = a[f].plotY;
                h = (1.5 * d + h) / 2.5;
                g = (1.5 * f + g) / 2.5;
                k = (1.5 * d + k) / 2.5;
                var r = (1.5 * f + l) / 2.5;
                l = Math.sqrt(Math.pow(h - d, 2) + Math.pow(g - f, 2));
                var m = Math.sqrt(Math.pow(k - d, 2) + Math.pow(r - f, 2));
                h = Math.atan2(g - f, h - d);
                r = Math.PI / 2 + (h + Math.atan2(r - f, k - d)) / 2;
                Math.abs(h - r) > Math.PI / 2 && (r -= Math.PI);
                h = d + Math.cos(r) * l;
                g = f + Math.sin(r) * l;
                k = d + Math.cos(Math.PI + r) * m;
                r = f + Math.sin(Math.PI + r) * m;
                d = { rightContX: k, rightContY: r, leftContX: h, leftContY: g, plotX: d, plotY: f };
                c && (d.prevPointCont = this.getConnectors(a, b, !1, e));
                return d;
            };
            l.toXY = function (a) {
                var b = this.chart,
                    d = this.xAxis;
                var c = this.yAxis;
                var e = a.plotX,
                    f = a.plotY,
                    h = a.series,
                    k = b.inverted,
                    l = a.y,
                    m = k ? e : c.len - f;
                k && h && !h.isRadialBar && (a.plotY = f = "number" === typeof l ? c.translate(l) || 0 : 0);
                a.rectPlotX = e;
                a.rectPlotY = f;
                c.center && (m += c.center[3] / 2);
                c = k ? c.postTranslate(f, m) : d.postTranslate(e, m);
                a.plotX = a.polarPlotX = c.x - b.plotLeft;
                a.plotY = a.polarPlotY = c.y - b.plotTop;
                this.kdByAngle ? ((b = ((e / Math.PI) * 180 + d.pane.options.startAngle) % 360), 0 > b && (b += 360), (a.clientX = b)) : (a.clientX = a.plotX);
            };
            p.spline &&
                (c(p.spline.prototype, "getPointSpline", function (a, b, c, e) {
                    this.chart.polar
                        ? e
                            ? ((a = this.getConnectors(b, e, !0, this.connectEnds)), (a = ["C", a.prevPointCont.rightContX, a.prevPointCont.rightContY, a.leftContX, a.leftContY, a.plotX, a.plotY]))
                            : (a = ["M", c.plotX, c.plotY])
                        : (a = a.call(this, b, c, e));
                    return a;
                }),
                p.areasplinerange && (p.areasplinerange.prototype.getPointSpline = p.spline.prototype.getPointSpline));
            E(
                v,
                "afterTranslate",
                function () {
                    var a = this.chart;
                    if (a.polar && this.xAxis) {
                        (this.kdByAngle = a.tooltip && a.tooltip.shared) ? (this.searchPoint = this.searchPointByAngle) : (this.options.findNearestPointBy = "xy");
                        if (!this.preventPostTranslate) for (var b = this.points, c = b.length; c--;) this.toXY(b[c]), !a.hasParallelCoordinates && !this.yAxis.reversed && b[c].y < this.yAxis.min && (b[c].isNull = !0);
                        this.hasClipCircleSetter ||
                            (this.hasClipCircleSetter = !!this.eventsToUnbind.push(
                                E(this, "afterRender", function () {
                                    if (a.polar) {
                                        var b = this.yAxis.pane.center;
                                        this.clipCircle ? this.clipCircle.animate({ x: b[0], y: b[1], r: b[2] / 2, innerR: b[3] / 2 }) : (this.clipCircle = a.renderer.clipCircle(b[0], b[1], b[2] / 2, b[3] / 2));
                                        this.group.clip(this.clipCircle);
                                        this.setClip = h.noop;
                                    }
                                })
                            ));
                    }
                },
                { order: 2 }
            );
            c(l, "getGraphPath", function (a, b) {
                var c = this,
                    d;
                if (this.chart.polar) {
                    b = b || this.points;
                    for (d = 0; d < b.length; d++)
                        if (!b[d].isNull) {
                            var e = d;
                            break;
                        }
                    if (!1 !== this.options.connectEnds && "undefined" !== typeof e) {
                        this.connectEnds = !0;
                        b.splice(b.length, 0, b[e]);
                        var f = !0;
                    }
                    b.forEach(function (a) {
                        "undefined" === typeof a.polarPlotY && c.toXY(a);
                    });
                }
                d = a.apply(this, [].slice.call(arguments, 1));
                f && b.pop();
                return d;
            });
            var k = function (a, b) {
                var c = this,
                    d = this.chart,
                    e = this.options.animation,
                    f = this.group,
                    g = this.markerGroup,
                    k = this.xAxis.center,
                    l = d.plotLeft,
                    m = d.plotTop,
                    p,
                    q,
                    u,
                    v;
                if (d.polar)
                    if (c.isRadialBar) b || ((c.startAngleRad = w(c.translatedThreshold, c.xAxis.startAngleRad)), h.seriesTypes.pie.prototype.animate.call(c, b));
                    else {
                        if (d.renderer.isSVG)
                            if (((e = z(e)), c.is("column"))) {
                                if (!b) {
                                    var x = k[3] / 2;
                                    c.points.forEach(function (a) {
                                        p = a.graphic;
                                        u = (q = a.shapeArgs) && q.r;
                                        v = q && q.innerR;
                                        p && q && (p.attr({ r: x, innerR: x }), p.animate({ r: u, innerR: v }, c.options.animation));
                                    });
                                }
                            } else
                                b
                                    ? ((a = { translateX: k[0] + l, translateY: k[1] + m, scaleX: 0.001, scaleY: 0.001 }), f.attr(a), g && g.attr(a))
                                    : ((a = { translateX: l, translateY: m, scaleX: 1, scaleY: 1 }), f.animate(a, e), g && g.animate(a, e));
                    }
                else a.call(this, b);
            };
            c(l, "animate", k);
            p.column &&
                ((v = p.arearange.prototype),
                (p = p.column.prototype),
                (p.polarArc = function (a, b, c, e) {
                    var d = this.xAxis.center,
                        f = this.yAxis.len,
                        g = d[3] / 2;
                    b = f - b + g;
                    a = f - w(a, f) + g;
                    this.yAxis.reversed && (0 > b && (b = g), 0 > a && (a = g));
                    return { x: d[0], y: d[1], r: b, innerR: a, start: c, end: e };
                }),
                c(p, "animate", k),
                c(p, "translate", function (a) {
                    var b = this.options,
                        c = b.stacking,
                        d = this.chart,
                        e = this.xAxis,
                        f = this.yAxis,
                        h = f.reversed,
                        k = f.center,
                        l = e.startAngleRad,
                        m = e.endAngleRad - l;
                    this.preventPostTranslate = !0;
                    a.call(this);
                    if (e.isRadial) {
                        a = this.points;
                        e = a.length;
                        var p = f.translate(f.min);
                        var q = f.translate(f.max);
                        b = b.threshold || 0;
                        if (d.inverted && x(b)) {
                            var v = f.translate(b);
                            B(v) && (0 > v ? (v = 0) : v > m && (v = m), (this.translatedThreshold = v + l));
                        }
                        for (; e--;) {
                            b = a[e];
                            var w = b.barX;
                            var z = b.x;
                            var E = b.y;
                            b.shapeType = "arc";
                            if (d.inverted) {
                                b.plotY = f.translate(E);
                                if (c && f.stacking) {
                                    if (((E = f.stacking.stacks[(0 > E ? "-" : "") + this.stackKey]), this.visible && E && E[z] && !b.isNull)) {
                                        var C = E[z].points[this.getStackIndicator(void 0, z, this.index).key];
                                        var A = f.translate(C[0]);
                                        C = f.translate(C[1]);
                                        B(A) && (A = u.clamp(A, 0, m));
                                    }
                                } else (A = v), (C = b.plotY);
                                A > C && (C = [A, (A = C)][0]);
                                if (!h)
                                    if (A < p) A = p;
                                    else if (C > q) C = q;
                                    else {
                                        if (C < p || A > q) A = C = 0;
                                    }
                                else if (C > p) C = p;
                                else if (A < q) A = q;
                                else if (A > p || C < q) A = C = m;
                                f.min > f.max && (A = C = h ? m : 0);
                                A += l;
                                C += l;
                                k && (b.barX = w += k[3] / 2);
                                z = Math.max(w, 0);
                                E = Math.max(w + b.pointWidth, 0);
                                b.shapeArgs = { x: k && k[0], y: k && k[1], r: E, innerR: z, start: A, end: C };
                                b.opacity = A === C ? 0 : void 0;
                                b.plotY = (B(this.translatedThreshold) && (A < this.translatedThreshold ? A : C)) - l;
                            } else (A = w + l), (b.shapeArgs = this.polarArc(b.yBottom, b.plotY, A, A + b.pointWidth));
                            this.toXY(b);
                            d.inverted ? ((w = f.postTranslate(b.rectPlotY, w + b.pointWidth / 2)), (b.tooltipPos = [w.x - d.plotLeft, w.y - d.plotTop])) : (b.tooltipPos = [b.plotX, b.plotY]);
                            k && (b.ttBelow = b.plotY > k[1]);
                        }
                    }
                }),
                (p.findAlignments = function (a, b) {
                    null === b.align && (b.align = 20 < a && 160 > a ? "left" : 200 < a && 340 > a ? "right" : "center");
                    null === b.verticalAlign && (b.verticalAlign = 45 > a || 315 < a ? "bottom" : 135 < a && 225 > a ? "top" : "middle");
                    return b;
                }),
                v && (v.findAlignments = p.findAlignments),
                c(p, "alignDataLabel", function (a, b, c, e, f, h) {
                    var d = this.chart,
                        g = w(e.inside, !!this.options.stacking);
                    d.polar
                        ? ((a = (b.rectPlotX / Math.PI) * 180),
                          d.inverted
                              ? ((this.forceDL = d.isInsidePlot(b.plotX, Math.round(b.plotY), !1)),
                                g && b.shapeArgs
                                    ? ((f = b.shapeArgs), (f = this.yAxis.postTranslate((f.start + f.end) / 2 - this.xAxis.startAngleRad, b.barX + b.pointWidth / 2)), (f = { x: f.x - d.plotLeft, y: f.y - d.plotTop }))
                                    : b.tooltipPos && (f = { x: b.tooltipPos[0], y: b.tooltipPos[1] }),
                                (e.align = w(e.align, "center")),
                                (e.verticalAlign = w(e.verticalAlign, "middle")))
                              : this.findAlignments && (e = this.findAlignments(a, e)),
                          l.alignDataLabel.call(this, b, c, e, f, h),
                          this.isRadialBar && b.shapeArgs && b.shapeArgs.start === b.shapeArgs.end && c.hide(!0))
                        : a.call(this, b, c, e, f, h);
                }));
            c(f, "getCoordinates", function (a, b) {
                var c = this.chart,
                    d = { xAxis: [], yAxis: [] };
                c.polar
                    ? c.axes.forEach(function (a) {
                        var e = a.isXAxis,
                            f = a.center;
                        if ("colorAxis" !== a.coll) {
                            var g = b.chartX - f[0] - c.plotLeft;
                            f = b.chartY - f[1] - c.plotTop;
                            d[e ? "xAxis" : "yAxis"].push({ axis: a, value: a.translate(e ? Math.PI - Math.atan2(g, f) : Math.sqrt(Math.pow(g, 2) + Math.pow(f, 2)), !0) });
                        }
                    })
                    : (d = a.call(this, b));
                return d;
            });
            q.prototype.clipCircle = function (a, b, c, e) {
                var d = C(),
                    f = this.createElement("clipPath").attr({ id: d }).add(this.defs);
                a = e ? this.arc(a, b, c, e, 0, 2 * Math.PI).add(f) : this.circle(a, b, c).add(f);
                a.id = d;
                a.clipPath = f;
                return a;
            };
            E(b, "getAxes", function () {
                this.pane || (this.pane = []);
                m(this.options.pane).forEach(function (b) {
                    new a(b, this);
                }, this);
            });
            E(b, "afterDrawChartBox", function () {
                this.pane.forEach(function (a) {
                    a.render();
                });
            });
            E(h.Series, "afterInit", function () {
                var a = this.chart;
                a.inverted && a.polar && ((this.isRadialSeries = !0), this.is("column") && (this.isRadialBar = !0));
            });
            c(b.prototype, "get", function (a, b) {
                return (
                    e(this.pane, function (a) {
                        return a.options.id === b;
                    }) || a.call(this, b)
                );
            });
        }
    );
    A(c, "masters/RBG_charts-more.src.js", [], function () { });
});
//# sourceMappingURL=RBG_charts-more.js.map
