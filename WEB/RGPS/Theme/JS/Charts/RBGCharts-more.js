﻿/*
 RBGcharts JS v9.0.0 (2021-02-02)

 (c) 2009-2018 Torstein Honsi

 License: www.RBG_charts.com/license
*/
(function (e) { "object" === typeof module && module.exports ? (e["default"] = e, module.exports = e) : "function" === typeof define && define.amd ? define("RBG_charts/RBG_charts-more", ["RBG_charts"], function (z) { e(z); e.RBGcharts = z; return e }) : e("undefined" !== typeof RBGcharts ? RBGcharts : void 0) })(function (e) {
    function z(e, c, h, f) { e.hasOwnProperty(c) || (e[c] = f.apply(null, h)) } e = e ? e._modules : {}; z(e, "Extensions/Pane.js", [e["Core/Chart/Chart.js"], e["Core/Globals.js"], e["Core/Color/Palette.js"], e["Core/Pointer.js"], e["Core/Utilities.js"],
    e["Mixins/CenteredSeries.js"]], function (e, c, h, f, a, u) {
        function d(b, a, k) { return Math.sqrt(Math.pow(b - k[0], 2) + Math.pow(a - k[1], 2)) <= k[2] / 2 } var r = a.addEvent, n = a.extend, x = a.merge, b = a.pick, k = a.splat; e.prototype.collectionsWithUpdate.push("pane"); a = function () {
            function b(b, a) {
                this.options = this.chart = this.center = this.background = void 0; this.coll = "pane"; this.defaultOptions = { center: ["50%", "50%"], size: "85%", innerSize: "0%", startAngle: 0 }; this.defaultBackgroundOptions = {
                    shape: "circle", borderWidth: 1, borderColor: h.neutralColor20,
                    backgroundColor: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, h.backgroundColor], [1, h.neutralColor10]] }, from: -Number.MAX_VALUE, innerRadius: 0, to: Number.MAX_VALUE, outerRadius: "105%"
                }; this.init(b, a)
            } b.prototype.init = function (b, a) { this.chart = a; this.background = []; a.pane.push(this); this.setOptions(b) }; b.prototype.setOptions = function (b) { this.options = x(this.defaultOptions, this.chart.angular ? { background: {} } : void 0, b) }; b.prototype.render = function () {
                var b = this.options, a = this.options.background, l = this.chart.renderer;
                this.group || (this.group = l.g("pane-group").attr({ zIndex: b.zIndex || 0 }).add()); this.updateCenter(); if (a) for (a = k(a), b = Math.max(a.length, this.background.length || 0), l = 0; l < b; l++) a[l] && this.axis ? this.renderBackground(x(this.defaultBackgroundOptions, a[l]), l) : this.background[l] && (this.background[l] = this.background[l].destroy(), this.background.splice(l, 1))
            }; b.prototype.renderBackground = function (b, a) {
                var k = "animate", l = { "class": "RBG_charts-pane " + (b.className || "") }; this.chart.styledMode || n(l, {
                    fill: b.backgroundColor,
                    stroke: b.borderColor, "stroke-width": b.borderWidth
                }); this.background[a] || (this.background[a] = this.chart.renderer.path().add(this.group), k = "attr"); this.background[a][k]({ d: this.axis.getPlotBandPath(b.from, b.to, b) }).attr(l)
            }; b.prototype.updateCenter = function (b) { this.center = (b || this.axis || {}).center = u.getCenter.call(this) }; b.prototype.update = function (b, a) {
                x(!0, this.options, b); x(!0, this.chart.options.pane, b); this.setOptions(this.options); this.render(); this.chart.axes.forEach(function (b) {
                    b.pane === this &&
                    (b.pane = null, b.update({}, a))
                }, this)
            }; return b
        }(); e.prototype.getHoverPane = function (b) { var a = this, k; b && a.pane.forEach(function (l) { var c = b.chartX - a.plotLeft, f = b.chartY - a.plotTop; d(a.inverted ? f : c, a.inverted ? c : f, l.center) && (k = l) }); return k }; r(e, "afterIsInsidePlot", function (b) { this.polar && (b.isInsidePlot = this.pane.some(function (a) { return d(b.x, b.y, a.center) })) }); r(f, "beforeGetHoverData", function (a) {
            var k = this.chart; k.polar ? (k.hoverPane = k.getHoverPane(a), a.filter = function (l) {
                return l.visible && !(!a.shared &&
                l.directTouch) && b(l.options.enableMouseTracking, !0) && (!k.hoverPane || l.xAxis.pane === k.hoverPane)
            }) : k.hoverPane = void 0
        }); r(f, "afterGetHoverData", function (b) { var a = this.chart; b.hoverPoint && b.hoverPoint.plotX && b.hoverPoint.plotY && a.hoverPane && !d(b.hoverPoint.plotX, b.hoverPoint.plotY, a.hoverPane.center) && (b.hoverPoint = void 0) }); c.Pane = a; return c.Pane
    }); z(e, "Core/Axis/HiddenAxis.js", [], function () {
        return function () {
            function e() { } e.init = function (c) {
                c.getOffset = function () { }; c.redraw = function () {
                    this.isDirty =
                    !1
                }; c.render = function () { this.isDirty = !1 }; c.createLabelCollector = function () { return function () { } }; c.setScale = function () { }; c.setCategories = function () { }; c.setTitle = function () { }; c.isHidden = !0
            }; return e
        }()
    }); z(e, "Core/Axis/RadialAxis.js", [e["Core/Axis/Axis.js"], e["Core/Axis/Tick.js"], e["Core/Axis/HiddenAxis.js"], e["Core/Utilities.js"]], function (e, c, h, f) {
        var a = f.addEvent, u = f.correctFloat, d = f.defined, r = f.extend, n = f.fireEvent, x = f.merge, b = f.pick, k = f.relativeLength, l = f.wrap; f = function () {
            function c() { } c.init =
            function (a) {
                var l = e.prototype; a.setOptions = function (b) { b = this.options = x(a.constructor.defaultOptions, this.defaultPolarOptions, b); b.plotBands || (b.plotBands = []); n(this, "afterSetOptions") }; a.getOffset = function () { l.getOffset.call(this); this.chart.axisOffset[this.side] = 0 }; a.getLinePath = function (a, k, l) {
                    a = this.pane.center; var p = this.chart, q = b(k, a[2] / 2 - this.offset), g = this.left || 0, A = this.top || 0; "undefined" === typeof l && (l = this.horiz ? 0 : this.center && -this.center[3] / 2); l && (q += l); this.isCircular || "undefined" !==
                    typeof k ? (k = this.chart.renderer.symbols.arc(g + a[0], A + a[1], q, q, { start: this.startAngleRad, end: this.endAngleRad, open: !0, innerR: 0 }), k.xBounds = [g + a[0]], k.yBounds = [A + a[1] - q]) : (k = this.postTranslate(this.angleRad, q), k = [["M", this.center[0] + p.plotLeft, this.center[1] + p.plotTop], ["L", k.x, k.y]]); return k
                }; a.setAxisTranslation = function () {
                    l.setAxisTranslation.call(this); this.center && (this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : (this.center[2] - this.center[3]) / 2 / (this.max -
                    this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0)
                }; a.beforeSetTickPositions = function () { this.autoConnect = this.isCircular && "undefined" === typeof b(this.userMax, this.options.max) && u(this.endAngleRad - this.startAngleRad) === u(2 * Math.PI); !this.isCircular && this.chart.inverted && this.max++; this.autoConnect && (this.max += this.categories && 1 || this.pointRange || this.closestPointRange || 0) }; a.setAxisSize = function () {
                    l.setAxisSize.call(this); if (this.isRadial) {
                        this.pane.updateCenter(this);
                        var a = this.center = r([], this.pane.center); if (this.isCircular) this.sector = this.endAngleRad - this.startAngleRad; else { var k = this.postTranslate(this.angleRad, a[3] / 2); a[0] = k.x - this.chart.plotLeft; a[1] = k.y - this.chart.plotTop } this.len = this.width = this.height = (a[2] - a[3]) * b(this.sector, 1) / 2
                    }
                }; a.getPosition = function (a, k) { a = this.translate(a); return this.postTranslate(this.isCircular ? a : this.angleRad, b(this.isCircular ? k : 0 > a ? 0 : a, this.center[2] / 2) - this.offset) }; a.postTranslate = function (b, a) {
                    var k = this.chart, p = this.center;
                    b = this.startAngleRad + b; return { x: k.plotLeft + p[0] + Math.cos(b) * a, y: k.plotTop + p[1] + Math.sin(b) * a }
                }; a.getPlotBandPath = function (a, k, l) {
                    var p = function (g) { if ("string" === typeof g) { var q = parseInt(g, 10); H.test(g) && (q = q * A / 100); return q } return g }, q = this.center, g = this.startAngleRad, A = q[2] / 2, v = Math.min(this.offset, 0), m = this.left || 0, C = this.top || 0, H = /%$/; var c = this.isCircular; var d = b(p(l.outerRadius), A), y = p(l.innerRadius); p = b(p(l.thickness), 10); if ("polygon" === this.options.gridLineInterpolation) v = this.getPlotLinePath({ value: a }).concat(this.getPlotLinePath({
                        value: k,
                        reverse: !0
                    })); else {
                        a = Math.max(a, this.min); k = Math.min(k, this.max); a = this.translate(a); k = this.translate(k); c || (d = a || 0, y = k || 0); if ("circle" !== l.shape && c) l = g + (a || 0), g += k || 0; else { l = -Math.PI / 2; g = 1.5 * Math.PI; var f = !0 } d -= v; v = this.chart.renderer.symbols.arc(m + q[0], C + q[1], d, d, { start: Math.min(l, g), end: Math.max(l, g), innerR: b(y, d - (p - v)), open: f }); c && (c = (g + l) / 2, m = m + q[0] + q[2] / 2 * Math.cos(c), v.xBounds = c > -Math.PI / 2 && c < Math.PI / 2 ? [m, this.chart.plotWidth] : [0, m], v.yBounds = [C + q[1] + q[2] / 2 * Math.sin(c)], v.yBounds[0] += c > -Math.PI &&
                        0 > c || c > Math.PI ? -10 : 10)
                    } return v
                }; a.getCrosshairPosition = function (b, a, k) {
                    var p = b.value, q = this.pane.center; if (this.isCircular) { if (d(p)) b.point && (g = b.point.shapeArgs || {}, g.start && (p = this.chart.inverted ? this.translate(b.point.rectPlotY, !0) : b.point.x)); else { var g = b.chartX || 0; var A = b.chartY || 0; p = this.translate(Math.atan2(A - k, g - a) - this.startAngleRad, !0) } b = this.getPosition(p); g = b.x; A = b.y } else d(p) || (g = b.chartX, A = b.chartY), d(g) && d(A) && (k = q[1] + this.chart.plotTop, p = this.translate(Math.min(Math.sqrt(Math.pow(g -
                    a, 2) + Math.pow(A - k, 2)), q[2] / 2) - q[3] / 2, !0)); return [p, g || 0, A || 0]
                }; a.getPlotLinePath = function (b) {
                    var a = this, l = a.pane.center, p = a.chart, q = p.inverted, g = b.value, A = b.reverse, v = a.getPosition(g), m = a.pane.options.background ? a.pane.options.background[0] || a.pane.options.background : {}, C = m.innerRadius || "0%", c = m.outerRadius || "100%"; m = l[0] + p.plotLeft; var d = l[1] + p.plotTop, f = v.x, D = v.y, h = a.height; v = l[3] / 2; var r; b.isCrosshair && (D = this.getCrosshairPosition(b, m, d), g = D[0], f = D[1], D = D[2]); if (a.isCircular) g = Math.sqrt(Math.pow(f -
                    m, 2) + Math.pow(D - d, 2)), A = "string" === typeof C ? k(C, 1) : C / g, p = "string" === typeof c ? k(c, 1) : c / g, l && v && (g = v / g, A < g && (A = g), p < g && (p = g)), l = [["M", m + A * (f - m), d - A * (d - D)], ["L", f - (1 - p) * (f - m), D + (1 - p) * (d - D)]]; else if ((g = a.translate(g)) && (0 > g || g > h) && (g = 0), "circle" === a.options.gridLineInterpolation) l = a.getLinePath(0, g, v); else if (l = [], p[q ? "yAxis" : "xAxis"].forEach(function (g) { g.pane === a.pane && (r = g) }), r) for (m = r.tickPositions, r.autoConnect && (m = m.concat([m[0]])), A && (m = m.slice().reverse()), g && (g += v), f = 0; f < m.length; f++) d = r.getPosition(m[f],
                    g), l.push(f ? ["L", d.x, d.y] : ["M", d.x, d.y]); return l
                }; a.getTitlePosition = function () { var b = this.center, a = this.chart, k = this.options.title; return { x: a.plotLeft + b[0] + (k.x || 0), y: a.plotTop + b[1] - { high: .5, middle: .25, low: 0 }[k.align] * b[2] + (k.y || 0) } }; a.createLabelCollector = function () { var b = this; return function () { if (b.isRadial && b.tickPositions && !0 !== b.options.labels.allowOverlap) return b.tickPositions.map(function (a) { return b.ticks[a] && b.ticks[a].label }).filter(function (b) { return !!b }) } }
            }; c.compose = function (d, f) {
                a(d,
                "init", function (b) {
                    var a = this.chart, k = a.inverted, p = a.angular, q = a.polar, g = this.isXAxis, A = this.coll, v = p && g, m, C = a.options; b = b.userOptions.pane || 0; b = this.pane = a.pane && a.pane[b]; if ("colorAxis" === A) this.isRadial = !1; else {
                        if (p) { if (v ? h.init(this) : c.init(this), m = !g) this.defaultPolarOptions = c.defaultRadialGaugeOptions } else q && (c.init(this), this.defaultPolarOptions = (m = this.horiz) ? c.defaultCircularOptions : x("xAxis" === A ? d.defaultOptions : d.defaultYAxisOptions, c.defaultRadialOptions), k && "yAxis" === A && (this.defaultPolarOptions.stackLabels =
                        d.defaultYAxisOptions.stackLabels)); p || q ? (this.isRadial = !0, C.chart.zoomType = null, this.labelCollector || (this.labelCollector = this.createLabelCollector()), this.labelCollector && a.labelCollectors.push(this.labelCollector)) : this.isRadial = !1; b && m && (b.axis = this); this.isCircular = m
                    }
                }); a(d, "afterInit", function () {
                    var a = this.chart, k = this.options, l = this.pane, p = l && l.options; a.angular && this.isXAxis || !l || !a.angular && !a.polar || (this.angleRad = (k.angle || 0) * Math.PI / 180, this.startAngleRad = (p.startAngle - 90) * Math.PI / 180,
                    this.endAngleRad = (b(p.endAngle, p.startAngle + 360) - 90) * Math.PI / 180, this.offset = k.offset || 0)
                }); a(d, "autoLabelAlign", function (b) { this.isRadial && (b.align = void 0, b.preventDefault()) }); a(d, "destroy", function () { if (this.chart && this.chart.labelCollectors) { var b = this.labelCollector ? this.chart.labelCollectors.indexOf(this.labelCollector) : -1; 0 <= b && this.chart.labelCollectors.splice(b, 1) } }); a(d, "initialAxisTranslation", function () { this.isRadial && this.beforeSetTickPositions() }); a(f, "afterGetPosition", function (b) {
                    this.axis.getPosition &&
                    r(b.pos, this.axis.getPosition(this.pos))
                }); a(f, "afterGetLabelPosition", function (a) {
                    var l = this.axis, d = this.label; if (d) {
                        var p = d.getBBox(), q = l.options.labels, g = q.y, A = 20, v = q.align, m = (l.translate(this.pos) + l.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360, C = Math.round(m), c = "end", f = 0 > C ? C + 360 : C, h = f, D = 0, r = 0, e = null === q.y ? .3 * -p.height : 0; if (l.isRadial) {
                            var x = l.getPosition(this.pos, l.center[2] / 2 + k(b(q.distance, -25), l.center[2] / 2, -l.center[2] / 2)); "auto" === q.rotation ? d.attr({ rotation: m }) : null === g && (g = l.chart.renderer.fontMetrics(d.styles &&
                            d.styles.fontSize).b - p.height / 2); null === v && (l.isCircular ? (p.width > l.len * l.tickInterval / (l.max - l.min) && (A = 0), v = m > A && m < 180 - A ? "left" : m > 180 + A && m < 360 - A ? "right" : "center") : v = "center", d.attr({ align: v })); if ("auto" === v && 2 === l.tickPositions.length && l.isCircular) {
                                90 < f && 180 > f ? f = 180 - f : 270 < f && 360 >= f && (f = 540 - f); 180 < h && 360 >= h && (h = 360 - h); if (l.pane.options.startAngle === C || l.pane.options.startAngle === C + 360 || l.pane.options.startAngle === C - 360) c = "start"; v = -90 <= C && 90 >= C || -360 <= C && -270 >= C || 270 <= C && 360 >= C ? "start" === c ? "right" :
                                "left" : "start" === c ? "left" : "right"; 70 < h && 110 > h && (v = "center"); 15 > f || 180 <= f && 195 > f ? D = .3 * p.height : 15 <= f && 35 >= f ? D = "start" === c ? 0 : .75 * p.height : 195 <= f && 215 >= f ? D = "start" === c ? .75 * p.height : 0 : 35 < f && 90 >= f ? D = "start" === c ? .25 * -p.height : p.height : 215 < f && 270 >= f && (D = "start" === c ? p.height : .25 * -p.height); 15 > h ? r = "start" === c ? .15 * -p.height : .15 * p.height : 165 < h && 180 >= h && (r = "start" === c ? .15 * p.height : .15 * -p.height); d.attr({ align: v }); d.translate(r, D + e)
                            } a.pos.x = x.x + q.x; a.pos.y = x.y + g
                        }
                    }
                }); l(f.prototype, "getMarkPath", function (b, a, k,
                p, q, g, A) { var v = this.axis; v.isRadial ? (b = v.getPosition(this.pos, v.center[2] / 2 + p), a = ["M", a, k, "L", b.x, b.y]) : a = b.call(this, a, k, p, q, g, A); return a })
            }; c.defaultCircularOptions = { gridLineWidth: 1, labels: { align: null, distance: 15, x: 0, y: null, style: { textOverflow: "none" } }, maxPadding: 0, minPadding: 0, showLastLabel: !1, tickLength: 0 }; c.defaultRadialGaugeOptions = {
                labels: { align: "center", x: 0, y: null }, minorGridLineWidth: 0, minorTickInterval: "auto", minorTickLength: 10, minorTickPosition: "inside", minorTickWidth: 1, tickLength: 10, tickPosition: "inside",
                tickWidth: 2, title: { rotation: 0 }, zIndex: 2
            }; c.defaultRadialOptions = { gridLineInterpolation: "circle", gridLineWidth: 1, labels: { align: "right", x: -3, y: -2 }, showLastLabel: !1, title: { x: 4, text: null, rotation: 90 } }; return c
        }(); f.compose(e, c); return f
    }); z(e, "Series/AreaRange/AreaRangePoint.js", [e["Series/Area/AreaSeries.js"], e["Core/Series/Point.js"], e["Core/Utilities.js"]], function (e, c, h) {
        var f = this && this.__extends || function () {
            var a = function (d, c) {
                a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (b,
                a) { b.__proto__ = a } || function (b, a) { for (var k in a) a.hasOwnProperty(k) && (b[k] = a[k]) }; return a(d, c)
            }; return function (d, c) { function b() { this.constructor = d } a(d, c); d.prototype = null === c ? Object.create(c) : (b.prototype = c.prototype, new b) }
        }(), a = c.prototype, u = h.defined, d = h.isNumber; return function (c) {
            function h() { var a = null !== c && c.apply(this, arguments) || this; a.high = void 0; a.low = void 0; a.options = void 0; a.plotHigh = void 0; a.plotLow = void 0; a.plotHighX = void 0; a.plotLowX = void 0; a.plotX = void 0; a.series = void 0; return a }
            f(h, c); h.prototype.setState = function () {
                var c = this.state, b = this.series, k = b.chart.polar; u(this.plotHigh) || (this.plotHigh = b.yAxis.toPixels(this.high, !0)); u(this.plotLow) || (this.plotLow = this.plotY = b.yAxis.toPixels(this.low, !0)); b.stateMarkerGraphic && (b.lowerStateMarkerGraphic = b.stateMarkerGraphic, b.stateMarkerGraphic = b.upperStateMarkerGraphic); this.graphic = this.upperGraphic; this.plotY = this.plotHigh; k && (this.plotX = this.plotHighX); a.setState.apply(this, arguments); this.state = c; this.plotY = this.plotLow; this.graphic =
                this.lowerGraphic; k && (this.plotX = this.plotLowX); b.stateMarkerGraphic && (b.upperStateMarkerGraphic = b.stateMarkerGraphic, b.stateMarkerGraphic = b.lowerStateMarkerGraphic, b.lowerStateMarkerGraphic = void 0); a.setState.apply(this, arguments)
            }; h.prototype.haloPath = function () {
                var c = this.series.chart.polar, b = []; this.plotY = this.plotLow; c && (this.plotX = this.plotLowX); this.isInside && (b = a.haloPath.apply(this, arguments)); this.plotY = this.plotHigh; c && (this.plotX = this.plotHighX); this.isTopInside && (b = b.concat(a.haloPath.apply(this,
                arguments))); return b
            }; h.prototype.isValid = function () { return d(this.low) && d(this.high) }; return h
        }(e.prototype.pointClass)
    }); z(e, "Series/AreaRange/AreaRangeSeries.js", [e["Series/AreaRange/AreaRangePoint.js"], e["Series/Area/AreaSeries.js"], e["Series/Column/ColumnSeries.js"], e["Core/Globals.js"], e["Core/Series/Series.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, h, f, a, u, d) {
        var r = this && this.__extends || function () {
            var b = function (a, p) {
                b = Object.setPrototypeOf || { __proto__: [] } instanceof
                Array && function (b, g) { b.__proto__ = g } || function (b, g) { for (var q in g) g.hasOwnProperty(q) && (b[q] = g[q]) }; return b(a, p)
            }; return function (a, p) { function q() { this.constructor = a } b(a, p); a.prototype = null === p ? Object.create(p) : (q.prototype = p.prototype, new q) }
        }(), n = c.prototype, x = h.prototype, b = f.noop, k = a.prototype, l = d.defined, t = d.extend, w = d.isArray, K = d.pick, L = d.merge; h = function (a) {
            function d() {
                var p = null !== a && a.apply(this, arguments) || this; p.data = void 0; p.options = void 0; p.points = void 0; p.lowerStateMarkerGraphic = void 0;
                p.xAxis = void 0; p.setStackedPoints = b; return p
            } r(d, a); d.prototype.toYData = function (b) { return [b.low, b.high] }; d.prototype.highToXY = function (b) { var q = this.chart, g = this.xAxis.postTranslate(b.rectPlotX, this.yAxis.len - b.plotHigh); b.plotHighX = g.x - q.plotLeft; b.plotHigh = g.y - q.plotTop; b.plotLowX = b.plotX }; d.prototype.translate = function () {
                var b = this, q = b.yAxis, g = !!b.modifyValue; n.translate.apply(b); b.points.forEach(function (a) {
                    var v = a.high, m = a.plotY; a.isNull ? a.plotY = null : (a.plotLow = m, a.plotHigh = q.translate(g ? b.modifyValue(v,
                    a) : v, 0, 1, 0, 1), g && (a.yBottom = a.plotHigh))
                }); this.chart.polar && this.points.forEach(function (g) { b.highToXY(g); g.tooltipPos = [(g.plotHighX + g.plotLowX) / 2, (g.plotHigh + g.plotLow) / 2] })
            }; d.prototype.getGraphPath = function (b) {
                var a = [], g = [], p, v = n.getGraphPath; var m = this.options; var k = this.chart.polar, l = k && !1 !== m.connectEnds, d = m.connectNulls, c = m.step; b = b || this.points; for (p = b.length; p--;) {
                    var f = b[p]; var h = k ? { plotX: f.rectPlotX, plotY: f.yBottom, doCurve: !1 } : { plotX: f.plotX, plotY: f.plotY, doCurve: !1 }; f.isNull || l || d || b[p +
                    1] && !b[p + 1].isNull || g.push(h); var e = { polarPlotY: f.polarPlotY, rectPlotX: f.rectPlotX, yBottom: f.yBottom, plotX: K(f.plotHighX, f.plotX), plotY: f.plotHigh, isNull: f.isNull }; g.push(e); a.push(e); f.isNull || l || d || b[p - 1] && !b[p - 1].isNull || g.push(h)
                } b = v.call(this, b); c && (!0 === c && (c = "left"), m.step = { left: "right", center: "center", right: "left" }[c]); a = v.call(this, a); g = v.call(this, g); m.step = c; m = [].concat(b, a); !this.chart.polar && g[0] && "M" === g[0][0] && (g[0] = ["L", g[0][1], g[0][2]]); this.graphPath = m; this.areaPath = b.concat(g);
                m.isArea = !0; m.xMap = b.xMap; this.areaPath.xMap = b.xMap; return m
            }; d.prototype.drawDataLabels = function () {
                var b = this.points, a = b.length, g, A = [], v = this.options.dataLabels, m, C = this.chart.inverted; if (w(v)) { var l = v[0] || { enabled: !1 }; var d = v[1] || { enabled: !1 } } else l = t({}, v), l.x = v.xHigh, l.y = v.yHigh, d = t({}, v), d.x = v.xLow, d.y = v.yLow; if (l.enabled || this._hasPointLabels) {
                    for (g = a; g--;) if (m = b[g]) {
                        var c = l.inside ? m.plotHigh < m.plotLow : m.plotHigh > m.plotLow; m.y = m.high; m._plotY = m.plotY; m.plotY = m.plotHigh; A[g] = m.dataLabel; m.dataLabel =
                        m.dataLabelUpper; m.below = c; C ? l.align || (l.align = c ? "right" : "left") : l.verticalAlign || (l.verticalAlign = c ? "top" : "bottom")
                    } this.options.dataLabels = l; k.drawDataLabels && k.drawDataLabels.apply(this, arguments); for (g = a; g--;) if (m = b[g]) m.dataLabelUpper = m.dataLabel, m.dataLabel = A[g], delete m.dataLabels, m.y = m.low, m.plotY = m._plotY
                } if (d.enabled || this._hasPointLabels) {
                    for (g = a; g--;) if (m = b[g]) c = d.inside ? m.plotHigh < m.plotLow : m.plotHigh > m.plotLow, m.below = !c, C ? d.align || (d.align = c ? "left" : "right") : d.verticalAlign || (d.verticalAlign =
                    c ? "bottom" : "top"); this.options.dataLabels = d; k.drawDataLabels && k.drawDataLabels.apply(this, arguments)
                } if (l.enabled) for (g = a; g--;) if (m = b[g]) m.dataLabels = [m.dataLabelUpper, m.dataLabel].filter(function (g) { return !!g }); this.options.dataLabels = v
            }; d.prototype.alignDataLabel = function () { x.alignDataLabel.apply(this, arguments) }; d.prototype.drawPoints = function () {
                var b = this.points.length, a; k.drawPoints.apply(this, arguments); for (a = 0; a < b;) {
                    var g = this.points[a]; g.origProps = {
                        plotY: g.plotY, plotX: g.plotX, isInside: g.isInside,
                        negative: g.negative, zone: g.zone, y: g.y
                    }; g.lowerGraphic = g.graphic; g.graphic = g.upperGraphic; g.plotY = g.plotHigh; l(g.plotHighX) && (g.plotX = g.plotHighX); g.y = g.high; g.negative = g.high < (this.options.threshold || 0); g.zone = this.zones.length && g.getZone(); this.chart.polar || (g.isInside = g.isTopInside = "undefined" !== typeof g.plotY && 0 <= g.plotY && g.plotY <= this.yAxis.len && 0 <= g.plotX && g.plotX <= this.xAxis.len); a++
                } k.drawPoints.apply(this, arguments); for (a = 0; a < b;) g = this.points[a], g.upperGraphic = g.graphic, g.graphic = g.lowerGraphic,
                t(g, g.origProps), delete g.origProps, a++
            }; d.defaultOptions = L(c.defaultOptions, { lineWidth: 1, threshold: null, tooltip: { pointFormat: '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>' }, trackByArea: !0, dataLabels: { align: void 0, verticalAlign: void 0, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0 } }); return d
        }(c); t(h.prototype, { pointArrayMap: ["low", "high"], pointValKey: "low", deferTranslatePolar: !0, pointClass: e }); u.registerSeriesType("arearange", h); ""; return h
    }); z(e, "Series/AreaSplineRange/AreaSplineRangeSeries.js",
    [e["Series/AreaRange/AreaRangeSeries.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, h) {
        var f = this && this.__extends || function () { var a = function (d, c) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (b, a) { b.__proto__ = a } || function (b, a) { for (var k in a) a.hasOwnProperty(k) && (b[k] = a[k]) }; return a(d, c) }; return function (d, c) { function b() { this.constructor = d } a(d, c); d.prototype = null === c ? Object.create(c) : (b.prototype = c.prototype, new b) } }(), a = c.seriesTypes.spline, u = h.merge;
        h = h.extend; var d = function (a) { function d() { var d = null !== a && a.apply(this, arguments) || this; d.options = void 0; d.data = void 0; d.points = void 0; return d } f(d, a); d.defaultOptions = u(e.defaultOptions); return d }(e); h(d.prototype, { getPointSpline: a.prototype.getPointSpline }); c.registerSeriesType("areasplinerange", d); ""; return d
    }); z(e, "Series/ColumnRange/ColumnRangePoint.js", [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c) {
        var h = this && this.__extends || function () {
            var a = function (c, d) {
                a = Object.setPrototypeOf ||
                { __proto__: [] } instanceof Array && function (a, d) { a.__proto__ = d } || function (a, d) { for (var c in d) d.hasOwnProperty(c) && (a[c] = d[c]) }; return a(c, d)
            }; return function (c, d) { function f() { this.constructor = c } a(c, d); c.prototype = null === d ? Object.create(d) : (f.prototype = d.prototype, new f) }
        }(), f = e.seriesTypes; e = f.column.prototype.pointClass; c = c.extend; f = function (a) {
            function c() {
                var d = null !== a && a.apply(this, arguments) || this; d.series = void 0; d.options = void 0; d.barX = void 0; d.pointWidth = void 0; d.shapeArgs = void 0; d.shapeType =
                void 0; return d
            } h(c, a); return c
        }(f.arearange.prototype.pointClass); c(f.prototype, { setState: e.prototype.setState }); return f
    }); z(e, "Series/ColumnRange/ColumnRangeSeries.js", [e["Series/ColumnRange/ColumnRangePoint.js"], e["Core/Globals.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, h, f) {
        var a = this && this.__extends || function () {
            var b = function (a, d) {
                b = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (b, a) { b.__proto__ = a } || function (b, a) {
                    for (var p in a) a.hasOwnProperty(p) &&
                    (b[p] = a[p])
                }; return b(a, d)
            }; return function (a, d) { function k() { this.constructor = a } b(a, d); a.prototype = null === d ? Object.create(d) : (k.prototype = d.prototype, new k) }
        }(); c = c.noop; var u = h.seriesTypes, d = u.arearange, r = u.column, n = r.prototype, x = d.prototype, b = f.clamp, k = f.merge, l = f.pick; f = f.extend; var t = { pointRange: null, marker: null, states: { hover: { halo: !1 } } }; u = function (c) {
            function f() { var b = null !== c && c.apply(this, arguments) || this; b.data = void 0; b.points = void 0; b.options = void 0; return b } a(f, c); f.prototype.setOptions =
            function () { k(!0, arguments[0], { stacking: void 0 }); return x.setOptions.apply(this, arguments) }; f.prototype.translate = function () {
                var a = this, d = a.yAxis, k = a.xAxis, p = k.startAngleRad, q, g = a.chart, A = a.xAxis.isRadial, v = Math.max(g.chartWidth, g.chartHeight) + 999, m; n.translate.apply(a); a.points.forEach(function (c) {
                    var f = c.shapeArgs, C = a.options.minPointLength; c.plotHigh = m = b(d.translate(c.high, 0, 1, 0, 1), -v, v); c.plotLow = b(c.plotY, -v, v); var h = m; var e = l(c.rectPlotY, c.plotY) - m; Math.abs(e) < C ? (C -= e, e += C, h -= C / 2) : 0 > e && (e *= -1,
                    h -= e); A ? (q = c.barX + p, c.shapeType = "arc", c.shapeArgs = a.polarArc(h + e, h, q, q + c.pointWidth)) : (f.height = e, f.y = h, c.tooltipPos = g.inverted ? [d.len + d.pos - g.plotLeft - h - e / 2, k.len + k.pos - g.plotTop - f.x - f.width / 2, e] : [k.left - g.plotLeft + f.x + f.width / 2, d.pos - g.plotTop + h + e / 2, e])
                })
            }; f.prototype.crispCol = function () { return n.crispCol.apply(this, arguments) }; f.prototype.drawPoints = function () { return n.drawPoints.apply(this, arguments) }; f.prototype.drawTracker = function () { return n.drawTracker.apply(this, arguments) }; f.prototype.getColumnMetrics =
            function () { return n.getColumnMetrics.apply(this, arguments) }; f.prototype.pointAttribs = function () { return n.pointAttribs.apply(this, arguments) }; f.prototype.adjustForMissingColumns = function () { return n.adjustForMissingColumns.apply(this, arguments) }; f.prototype.animate = function () { return n.animate.apply(this, arguments) }; f.prototype.translate3dPoints = function () { return n.translate3dPoints.apply(this, arguments) }; f.prototype.translate3dShapes = function () { return n.translate3dShapes.apply(this, arguments) }; f.defaultOptions =
            k(r.defaultOptions, d.defaultOptions, t); return f
        }(d); f(u.prototype, { directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"], drawGraph: c, getSymbol: c, polarArc: function () { return n.polarArc.apply(this, arguments) }, pointClass: e }); h.registerSeriesType("columnrange", u); ""; return u
    }); z(e, "Series/ColumnPyramid/ColumnPyramidSeries.js", [e["Series/Column/ColumnSeries.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, h) {
        var f = this && this.__extends || function () {
            var a = function (d, b) {
                a = Object.setPrototypeOf ||
                { __proto__: [] } instanceof Array && function (b, a) { b.__proto__ = a } || function (b, a) { for (var d in a) a.hasOwnProperty(d) && (b[d] = a[d]) }; return a(d, b)
            }; return function (d, b) { function c() { this.constructor = d } a(d, b); d.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c) }
        }(), a = e.prototype, u = h.clamp, d = h.merge, r = h.pick; h = function (c) {
            function h() { var b = null !== c && c.apply(this, arguments) || this; b.data = void 0; b.options = void 0; b.points = void 0; return b } f(h, c); h.prototype.translate = function () {
                var b = this, d = b.chart,
                c = b.options, f = b.dense = 2 > b.closestPointRange * b.xAxis.transA; f = b.borderWidth = r(c.borderWidth, f ? 0 : 1); var h = b.yAxis, e = c.threshold, x = b.translatedThreshold = h.getThreshold(e), n = r(c.minPointLength, 5), y = b.getColumnMetrics(), p = y.width, q = b.barW = Math.max(p, 1 + 2 * f), g = b.pointXOffset = y.offset; d.inverted && (x -= .5); c.pointPadding && (q = Math.ceil(q)); a.translate.apply(b); b.points.forEach(function (a) {
                    var v = r(a.yBottom, x), m = 999 + Math.abs(v), A = u(a.plotY, -m, h.len + m); m = a.plotX + g; var k = q / 2, f = Math.min(A, v); v = Math.max(A, v) - f; var l;
                    a.barX = m; a.pointWidth = p; a.tooltipPos = d.inverted ? [h.len + h.pos - d.plotLeft - A, b.xAxis.len - m - k, v] : [m + k, A + h.pos - d.plotTop, v]; A = e + (a.total || a.y); "percent" === c.stacking && (A = e + (0 > a.y) ? -100 : 100); A = h.toPixels(A, !0); var D = (l = d.plotHeight - A - (d.plotHeight - x)) ? k * (f - A) / l : 0; var t = l ? k * (f + v - A) / l : 0; l = m - D + k; D = m + D + k; var y = m + t + k; t = m - t + k; var w = f - n; var G = f + v; 0 > a.y && (w = f, G = f + v + n); d.inverted && (y = d.plotWidth - f, l = A - (d.plotWidth - x), D = k * (A - y) / l, t = k * (A - (y - v)) / l, l = m + k + D, D = l - 2 * D, y = m - t + k, t = m + t + k, w = f, G = f + v - n, 0 > a.y && (G = f + v + n)); a.shapeType =
                    "path"; a.shapeArgs = { x: l, y: w, width: D - l, height: v, d: [["M", l, w], ["L", D, w], ["L", y, G], ["L", t, G], ["Z"]] }
                })
            }; h.defaultOptions = d(e.defaultOptions, {}); return h
        }(e); c.registerSeriesType("columnpyramid", h); ""; return h
    }); z(e, "Series/Gauge/GaugePoint.js", [e["Core/Series/SeriesRegistry.js"]], function (e) {
        var c = this && this.__extends || function () {
            var c = function (f, a) {
                c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, d) { a.__proto__ = d } || function (a, d) { for (var c in d) d.hasOwnProperty(c) && (a[c] = d[c]) }; return c(f,
                a)
            }; return function (f, a) { function h() { this.constructor = f } c(f, a); f.prototype = null === a ? Object.create(a) : (h.prototype = a.prototype, new h) }
        }(); return function (h) { function f() { var a = null !== h && h.apply(this, arguments) || this; a.options = void 0; a.series = void 0; a.shapeArgs = void 0; return a } c(f, h); f.prototype.setState = function (a) { this.state = a }; return f }(e.series.prototype.pointClass)
    }); z(e, "Series/Gauge/GaugeSeries.js", [e["Series/Gauge/GaugePoint.js"], e["Core/Globals.js"], e["Core/Color/Palette.js"], e["Core/Series/SeriesRegistry.js"],
    e["Core/Utilities.js"]], function (e, c, h, f, a) {
        var u = this && this.__extends || function () { var a = function (b, d) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, b) { a.__proto__ = b } || function (a, b) { for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]) }; return a(b, d) }; return function (b, d) { function c() { this.constructor = b } a(b, d); b.prototype = null === d ? Object.create(d) : (c.prototype = d.prototype, new c) } }(); c = c.noop; var d = f.series, r = f.seriesTypes.column, n = a.clamp, x = a.isNumber, b = a.extend, k = a.merge, l = a.pick,
        t = a.pInt; a = function (a) {
            function b() { var b = null !== a && a.apply(this, arguments) || this; b.data = void 0; b.points = void 0; b.options = void 0; b.yAxis = void 0; return b } u(b, a); b.prototype.translate = function () {
                var a = this.yAxis, b = this.options, d = a.center; this.generatePoints(); this.points.forEach(function (c) {
                    var q = k(b.dial, c.dial), g = t(l(q.radius, "80%")) * d[2] / 200, A = t(l(q.baseLength, "70%")) * g / 100, v = t(l(q.rearLength, "10%")) * g / 100, m = q.baseWidth || 3, p = q.topWidth || 1, f = b.overshoot, h = a.startAngleRad + a.translate(c.y, null, null,
                    null, !0); if (x(f) || !1 === b.wrap) f = x(f) ? f / 180 * Math.PI : 0, h = n(h, a.startAngleRad - f, a.endAngleRad + f); h = 180 * h / Math.PI; c.shapeType = "path"; c.shapeArgs = { d: q.path || [["M", -v, -m / 2], ["L", A, -m / 2], ["L", g, -p / 2], ["L", g, p / 2], ["L", A, m / 2], ["L", -v, m / 2], ["Z"]], translateX: d[0], translateY: d[1], rotation: h }; c.plotX = d[0]; c.plotY = d[1]
                })
            }; b.prototype.drawPoints = function () {
                var a = this, b = a.chart, d = a.yAxis.center, c = a.pivot, q = a.options, g = q.pivot, A = b.renderer; a.points.forEach(function (g) {
                    var d = g.graphic, c = g.shapeArgs, v = c.d, p = k(q.dial,
                    g.dial); d ? (d.animate(c), c.d = v) : g.graphic = A[g.shapeType](c).attr({ rotation: c.rotation, zIndex: 1 }).addClass("RBG_charts-dial").add(a.group); if (!b.styledMode) g.graphic[d ? "animate" : "attr"]({ stroke: p.borderColor || "none", "stroke-width": p.borderWidth || 0, fill: p.backgroundColor || h.neutralColor100 })
                }); c ? c.animate({ translateX: d[0], translateY: d[1] }) : (a.pivot = A.circle(0, 0, l(g.radius, 5)).attr({ zIndex: 2 }).addClass("RBG_charts-pivot").translate(d[0], d[1]).add(a.group), b.styledMode || a.pivot.attr({
                    "stroke-width": g.borderWidth ||
                    0, stroke: g.borderColor || h.neutralColor20, fill: g.backgroundColor || h.neutralColor100
                }))
            }; b.prototype.animate = function (a) { var b = this; a || b.points.forEach(function (a) { var d = a.graphic; d && (d.attr({ rotation: 180 * b.yAxis.startAngleRad / Math.PI }), d.animate({ rotation: a.shapeArgs.rotation }, b.options.animation)) }) }; b.prototype.render = function () { this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex, this.chart.seriesGroup); d.prototype.render.call(this); this.group.clip(this.chart.clipRect) };
            b.prototype.setData = function (a, b) { d.prototype.setData.call(this, a, !1); this.processData(); this.generatePoints(); l(b, !0) && this.chart.redraw() }; b.prototype.hasData = function () { return !!this.points.length }; b.defaultOptions = k(d.defaultOptions, { dataLabels: { borderColor: h.neutralColor20, borderRadius: 3, borderWidth: 1, crop: !1, defer: !1, enabled: !0, verticalAlign: "top", y: 15, zIndex: 2 }, dial: {}, pivot: {}, tooltip: { headerFormat: "" }, showInLegend: !1 }); return b
        }(d); b(a.prototype, {
            angular: !0, directTouch: !0, drawGraph: c, drawTracker: r.prototype.drawTracker,
            fixedBox: !0, forceDL: !0, noSharedTooltip: !0, pointClass: e, trackerGroups: ["group", "dataLabelsGroup"]
        }); f.registerSeriesType("gauge", a); ""; return a
    }); z(e, "Series/BoxPlot/BoxPlotSeries.js", [e["Series/Column/ColumnSeries.js"], e["Core/Globals.js"], e["Core/Color/Palette.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, h, f, a) {
        var u = this && this.__extends || function () {
            var a = function (b, d) {
                a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, b) { a.__proto__ = b } || function (a,
                b) { for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]) }; return a(b, d)
            }; return function (b, d) { function c() { this.constructor = b } a(b, d); b.prototype = null === d ? Object.create(d) : (c.prototype = d.prototype, new c) }
        }(); c = c.noop; var d = a.extend, r = a.merge, n = a.pick; a = function (a) {
            function b() { var b = null !== a && a.apply(this, arguments) || this; b.data = void 0; b.options = void 0; b.points = void 0; return b } u(b, a); b.prototype.pointAttribs = function () { return {} }; b.prototype.translate = function () {
                var b = this.yAxis, d = this.pointArrayMap; a.prototype.translate.apply(this);
                this.points.forEach(function (a) { d.forEach(function (d) { null !== a[d] && (a[d + "Plot"] = b.translate(a[d], 0, 1, 0, 1)) }); a.plotHigh = a.highPlot })
            }; b.prototype.drawPoints = function () {
                var a = this, b = a.options, d = a.chart, c = d.renderer, f, h, e, r, p, q, g = 0, A, v, m, C, H = !1 !== a.doQuartiles, u, x = a.options.whiskerLength; a.points.forEach(function (k) {
                    var l = k.graphic, t = l ? "animate" : "attr", D = k.shapeArgs, y = {}, I = {}, w = {}, J = {}, B = k.color || a.color; "undefined" !== typeof k.plotY && (A = Math.round(D.width), v = Math.floor(D.x), m = v + A, C = Math.round(A / 2),
                    f = Math.floor(H ? k.q1Plot : k.lowPlot), h = Math.floor(H ? k.q3Plot : k.lowPlot), e = Math.floor(k.highPlot), r = Math.floor(k.lowPlot), l || (k.graphic = l = c.g("point").add(a.group), k.stem = c.path().addClass("RBG_charts-boxplot-stem").add(l), x && (k.whiskers = c.path().addClass("RBG_charts-boxplot-whisker").add(l)), H && (k.box = c.path(void 0).addClass("RBG_charts-boxplot-box").add(l)), k.medianShape = c.path(void 0).addClass("RBG_charts-boxplot-median").add(l)), d.styledMode || (I.stroke = k.stemColor || b.stemColor || B, I["stroke-width"] =
                    n(k.stemWidth, b.stemWidth, b.lineWidth), I.dashstyle = k.stemDashStyle || b.stemDashStyle || b.dashStyle, k.stem.attr(I), x && (w.stroke = k.whiskerColor || b.whiskerColor || B, w["stroke-width"] = n(k.whiskerWidth, b.whiskerWidth, b.lineWidth), w.dashstyle = k.whiskerDashStyle || b.whiskerDashStyle || b.dashStyle, k.whiskers.attr(w)), H && (y.fill = k.fillColor || b.fillColor || B, y.stroke = b.lineColor || B, y["stroke-width"] = b.lineWidth || 0, y.dashstyle = k.boxDashStyle || b.boxDashStyle || b.dashStyle, k.box.attr(y)), J.stroke = k.medianColor || b.medianColor ||
                    B, J["stroke-width"] = n(k.medianWidth, b.medianWidth, b.lineWidth), J.dashstyle = k.medianDashStyle || b.medianDashStyle || b.dashStyle, k.medianShape.attr(J)), q = k.stem.strokeWidth() % 2 / 2, g = v + C + q, l = [["M", g, h], ["L", g, e], ["M", g, f], ["L", g, r]], k.stem[t]({ d: l }), H && (q = k.box.strokeWidth() % 2 / 2, f = Math.floor(f) + q, h = Math.floor(h) + q, v += q, m += q, l = [["M", v, h], ["L", v, f], ["L", m, f], ["L", m, h], ["L", v, h], ["Z"]], k.box[t]({ d: l })), x && (q = k.whiskers.strokeWidth() % 2 / 2, e += q, r += q, u = /%$/.test(x) ? C * parseFloat(x) / 100 : x / 2, l = [["M", g - u, e], ["L",
                    g + u, e], ["M", g - u, r], ["L", g + u, r]], k.whiskers[t]({ d: l })), p = Math.round(k.medianPlot), q = k.medianShape.strokeWidth() % 2 / 2, p += q, l = [["M", v, p], ["L", m, p]], k.medianShape[t]({ d: l }))
                })
            }; b.prototype.toYData = function (a) { return [a.low, a.q1, a.median, a.q3, a.high] }; b.defaultOptions = r(e.defaultOptions, {
                threshold: null, tooltip: { pointFormat: '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>' },
                whiskerLength: "50%", fillColor: h.backgroundColor, lineWidth: 1, medianWidth: 2, whiskerWidth: 2
            }); return b
        }(e); d(a.prototype, { pointArrayMap: ["low", "q1", "median", "q3", "high"], pointValKey: "high", drawDataLabels: c, setStackedPoints: c }); f.registerSeriesType("boxplot", a); ""; return a
    }); z(e, "Series/ErrorBar/ErrorBarSeries.js", [e["Series/BoxPlot/BoxPlotSeries.js"], e["Series/Column/ColumnSeries.js"], e["Core/Color/Palette.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, h, f, a) {
        var u = this &&
        this.__extends || function () { var a = function (b, d) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, b) { a.__proto__ = b } || function (a, b) { for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]) }; return a(b, d) }; return function (b, d) { function c() { this.constructor = b } a(b, d); b.prototype = null === d ? Object.create(d) : (c.prototype = d.prototype, new c) } }(), d = f.seriesTypes.arearange, r = a.merge; a = a.extend; var n = function (a) {
            function b() {
                var b = null !== a && a.apply(this, arguments) || this; b.data = void 0; b.options = void 0;
                b.points = void 0; return b
            } u(b, a); b.prototype.getColumnMetrics = function () { return this.linkedParent && this.linkedParent.columnMetrics || c.prototype.getColumnMetrics.call(this) }; b.prototype.drawDataLabels = function () { var a = this.pointValKey; d && (d.prototype.drawDataLabels.call(this), this.data.forEach(function (b) { b.y = b[a] })) }; b.prototype.toYData = function (a) { return [a.low, a.high] }; b.defaultOptions = r(e.defaultOptions, {
                color: h.neutralColor100, grouping: !1, linkedTo: ":previous", tooltip: { pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>' },
                whiskerWidth: null
            }); return b
        }(e); a(n.prototype, { pointArrayMap: ["low", "high"], pointValKey: "high", doQuartiles: !1 }); f.registerSeriesType("errorbar", n); ""; return n
    }); z(e, "Core/Axis/WaterfallAxis.js", [e["Extensions/Stacking.js"], e["Core/Utilities.js"]], function (e, c) {
        var h = c.addEvent, f = c.objectEach, a; (function (a) {
            function d() { var a = this.waterfall.stacks; a && (a.changed = !1, delete a.alreadyChanged) } function c() { var a = this.options.stackLabels; a && a.enabled && this.waterfall.stacks && this.waterfall.renderStackTotals() }
            function u() { for (var a = this.axes, b = this.series, d = b.length; d--;) b[d].options.stacking && (a.forEach(function (a) { a.isXAxis || (a.waterfall.stacks.changed = !0) }), d = 0) } function x() { this.waterfall || (this.waterfall = new b(this)) } var b = function () {
                function a(a) { this.axis = a; this.stacks = { changed: !1 } } a.prototype.renderStackTotals = function () {
                    var a = this.axis, b = a.waterfall.stacks, d = a.stacking && a.stacking.stackTotalGroup, c = new e(a, a.options.stackLabels, !1, 0, void 0); this.dummyStackItem = c; f(b, function (a) {
                        f(a, function (a) {
                            c.total =
                            a.stackTotal; a.label && (c.label = a.label); e.prototype.render.call(c, d); a.label = c.label; delete c.label
                        })
                    }); c.total = null
                }; return a
            }(); a.Composition = b; a.compose = function (a, b) { h(a, "init", x); h(a, "afterBuildStacks", d); h(a, "afterRender", c); h(b, "beforeRedraw", u) }
        })(a || (a = {})); return a
    }); z(e, "Series/Waterfall/WaterfallPoint.js", [e["Series/Column/ColumnSeries.js"], e["Core/Series/Point.js"], e["Core/Utilities.js"]], function (e, c, h) {
        var f = this && this.__extends || function () {
            var a = function (d, c) {
                a = Object.setPrototypeOf ||
                { __proto__: [] } instanceof Array && function (a, d) { a.__proto__ = d } || function (a, d) { for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b]) }; return a(d, c)
            }; return function (d, c) { function f() { this.constructor = d } a(d, c); d.prototype = null === c ? Object.create(c) : (f.prototype = c.prototype, new f) }
        }(), a = h.isNumber; return function (h) {
            function d() { var a = null !== h && h.apply(this, arguments) || this; a.options = void 0; a.series = void 0; return a } f(d, h); d.prototype.getClassName = function () {
                var a = c.prototype.getClassName.call(this); this.isSum ?
                a += " RBG_charts-sum" : this.isIntermediateSum && (a += " RBG_charts-intermediate-sum"); return a
            }; d.prototype.isValid = function () { return a(this.y) || this.isSum || !!this.isIntermediateSum }; return d
        }(e.prototype.pointClass)
    }); z(e, "Series/Waterfall/WaterfallSeries.js", [e["Core/Chart/Chart.js"], e["Core/Globals.js"], e["Core/Color/Palette.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"], e["Core/Axis/WaterfallAxis.js"], e["Series/Waterfall/WaterfallPoint.js"]], function (e, c, h, f, a, u, d) {
        var r = this && this.__extends ||
        function () { var a = function (b, d) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, g) { a.__proto__ = g } || function (a, g) { for (var b in g) g.hasOwnProperty(b) && (a[b] = g[b]) }; return a(b, d) }; return function (b, d) { function q() { this.constructor = b } a(b, d); b.prototype = null === d ? Object.create(d) : (q.prototype = d.prototype, new q) } }(), n = f.seriesTypes, x = n.column, b = n.line, k = a.arrayMax, l = a.arrayMin, t = a.correctFloat; n = a.extend; var w = a.merge, B = a.objectEach, z = a.pick; a = function (a) {
            function d() {
                var b = null !== a &&
                a.apply(this, arguments) || this; b.chart = void 0; b.data = void 0; b.options = void 0; b.points = void 0; b.stackedYNeg = void 0; b.stackedYPos = void 0; b.stackKey = void 0; b.xData = void 0; b.yAxis = void 0; b.yData = void 0; return b
            } r(d, a); d.prototype.generatePoints = function () { var a; x.prototype.generatePoints.apply(this); var b = 0; for (a = this.points.length; b < a; b++) { var g = this.points[b]; var d = this.processedYData[b]; if (g.isIntermediateSum || g.isSum) g.y = t(d) } }; d.prototype.translate = function () {
                var a = this.options, b = this.yAxis, g, d = z(a.minPointLength,
                5), c = d / 2, m = a.threshold, f = a.stacking, k = b.waterfall.stacks[this.stackKey]; x.prototype.translate.apply(this); var h = g = m; var l = this.points; var e = 0; for (a = l.length; e < a; e++) {
                    var r = l[e]; var u = this.processedYData[e]; var t = r.shapeArgs; var n = [0, u]; var y = r.y; if (f) {
                        if (k) {
                            n = k[e]; if ("overlap" === f) { var w = n.stackState[n.stateIndex--]; w = 0 <= y ? w : w - y; Object.hasOwnProperty.call(n, "absolutePos") && delete n.absolutePos; Object.hasOwnProperty.call(n, "absoluteNeg") && delete n.absoluteNeg } else 0 <= y ? (w = n.threshold + n.posTotal, n.posTotal -=
                            y) : (w = n.threshold + n.negTotal, n.negTotal -= y, w -= y), !n.posTotal && Object.hasOwnProperty.call(n, "absolutePos") && (n.posTotal = n.absolutePos, delete n.absolutePos), !n.negTotal && Object.hasOwnProperty.call(n, "absoluteNeg") && (n.negTotal = n.absoluteNeg, delete n.absoluteNeg); r.isSum || (n.connectorThreshold = n.threshold + n.stackTotal); b.reversed ? (u = 0 <= y ? w - y : w + y, y = w) : (u = w, y = w - y); r.below = u <= z(m, 0); t.y = b.translate(u, 0, 1, 0, 1); t.height = Math.abs(t.y - b.translate(y, 0, 1, 0, 1)); if (y = b.waterfall.dummyStackItem) y.x = e, y.label = k[e].label,
                            y.setOffset(this.pointXOffset || 0, this.barW || 0, this.stackedYNeg[e], this.stackedYPos[e])
                        }
                    } else w = Math.max(h, h + y) + n[0], t.y = b.translate(w, 0, 1, 0, 1), r.isSum ? (t.y = b.translate(n[1], 0, 1, 0, 1), t.height = Math.min(b.translate(n[0], 0, 1, 0, 1), b.len) - t.y) : r.isIntermediateSum ? (0 <= y ? (u = n[1] + g, y = g) : (u = g, y = n[1] + g), b.reversed && (u ^= y, y ^= u, u ^= y), t.y = b.translate(u, 0, 1, 0, 1), t.height = Math.abs(t.y - Math.min(b.translate(y, 0, 1, 0, 1), b.len)), g += n[1]) : (t.height = 0 < u ? b.translate(h, 0, 1, 0, 1) - t.y : b.translate(h, 0, 1, 0, 1) - b.translate(h - u,
                    0, 1, 0, 1), h += u, r.below = h < z(m, 0)), 0 > t.height && (t.y += t.height, t.height *= -1); r.plotY = t.y = Math.round(t.y) - this.borderWidth % 2 / 2; t.height = Math.max(Math.round(t.height), .001); r.yBottom = t.y + t.height; t.height <= d && !r.isNull ? (t.height = d, t.y -= c, r.plotY = t.y, r.minPointLengthOffset = 0 > r.y ? -c : c) : (r.isNull && (t.width = 0), r.minPointLengthOffset = 0); t = r.plotY + (r.negative ? t.height : 0); this.chart.inverted ? r.tooltipPos[0] = b.len - t : r.tooltipPos[1] = t
                }
            }; d.prototype.processData = function (b) {
                var d = this.options, g = this.yData, c = d.data,
                v = g.length, m = d.threshold || 0, f, k, p, h, l; for (l = k = f = p = h = 0; l < v; l++) { var e = g[l]; var r = c && c[l] ? c[l] : {}; "sum" === e || r.isSum ? g[l] = t(k) : "intermediateSum" === e || r.isIntermediateSum ? (g[l] = t(f), f = 0) : (k += e, f += e); p = Math.min(k, p); h = Math.max(k, h) } a.prototype.processData.call(this, b); d.stacking || (this.dataMin = p + m, this.dataMax = h)
            }; d.prototype.toYData = function (a) { return a.isSum ? "sum" : a.isIntermediateSum ? "intermediateSum" : a.y }; d.prototype.updateParallelArrays = function (b, d) {
                a.prototype.updateParallelArrays.call(this, b, d);
                if ("sum" === this.yData[0] || "intermediateSum" === this.yData[0]) this.yData[0] = null
            }; d.prototype.pointAttribs = function (a, b) { var g = this.options.upColor; g && !a.options.color && (a.color = 0 < a.y ? g : null); a = x.prototype.pointAttribs.call(this, a, b); delete a.dashstyle; return a }; d.prototype.getGraphPath = function () { return [["M", 0, 0]] }; d.prototype.getCrispPath = function () {
                var a = this.data, b = this.yAxis, g = a.length, d = Math.round(this.graph.strokeWidth()) % 2 / 2, c = Math.round(this.borderWidth) % 2 / 2, m = this.xAxis.reversed, f = this.yAxis.reversed,
                k = this.options.stacking, h = [], l; for (l = 1; l < g; l++) { var e = a[l].shapeArgs; var r = a[l - 1]; var t = a[l - 1].shapeArgs; var u = b.waterfall.stacks[this.stackKey]; var n = 0 < r.y ? -t.height : 0; u && t && e && (u = u[l - 1], k ? (u = u.connectorThreshold, n = Math.round(b.translate(u, 0, 1, 0, 1) + (f ? n : 0)) - d) : n = t.y + r.minPointLengthOffset + c - d, h.push(["M", (t.x || 0) + (m ? 0 : t.width || 0), n], ["L", (e.x || 0) + (m ? e.width || 0 : 0), n])); t && h.length && (!k && 0 > r.y && !f || 0 < r.y && f) && (h[h.length - 2][2] += t.height, h[h.length - 1][2] += t.height) } return h
            }; d.prototype.drawGraph = function () {
                b.prototype.drawGraph.call(this);
                this.graph.attr({ d: this.getCrispPath() })
            }; d.prototype.setStackedPoints = function () {
                function a(a, g, b, d) { if (z) for (b; b < z; b++) w.stackState[b] += d; else w.stackState[0] = a, z = w.stackState.length; w.stackState.push(w.stackState[z - 1] + g) } var b = this.options, g = this.yAxis.waterfall.stacks, d = b.threshold, c = d || 0, m = c, f = this.stackKey, k = this.xData, h = k.length, l, e, r; this.yAxis.stacking.usePercentage = !1; var t = e = r = c; if (this.visible || !this.chart.options.chart.ignoreHiddenSeries) {
                    var u = g.changed; (l = g.alreadyChanged) && 0 > l.indexOf(f) &&
                    (u = !0); g[f] || (g[f] = {}); l = g[f]; for (var n = 0; n < h; n++) {
                        var y = k[n]; if (!l[y] || u) l[y] = { negTotal: 0, posTotal: 0, stackTotal: 0, threshold: 0, stateIndex: 0, stackState: [], label: u && l[y] ? l[y].label : void 0 }; var w = l[y]; var x = this.yData[n]; 0 <= x ? w.posTotal += x : w.negTotal += x; var B = b.data[n]; y = w.absolutePos = w.posTotal; var K = w.absoluteNeg = w.negTotal; w.stackTotal = y + K; var z = w.stackState.length; B && B.isIntermediateSum ? (a(r, e, 0, r), r = e, e = d, c ^= m, m ^= c, c ^= m) : B && B.isSum ? (a(d, t, z), c = d) : (a(c, x, 0, t), B && (t += x, e += x)); w.stateIndex++; w.threshold =
                        c; c += w.stackTotal
                    } g.changed = !1; g.alreadyChanged || (g.alreadyChanged = []); g.alreadyChanged.push(f)
                }
            }; d.prototype.getExtremes = function () {
                var a = this.options.stacking; if (a) { var b = this.yAxis; b = b.waterfall.stacks; var g = this.stackedYNeg = []; var d = this.stackedYPos = []; "overlap" === a ? B(b[this.stackKey], function (a) { g.push(l(a.stackState)); d.push(k(a.stackState)) }) : B(b[this.stackKey], function (a) { g.push(a.negTotal + a.threshold); d.push(a.posTotal + a.threshold) }); return { dataMin: l(g), dataMax: k(d) } } return {
                    dataMin: this.dataMin,
                    dataMax: this.dataMax
                }
            }; d.defaultOptions = w(x.defaultOptions, { dataLabels: { inside: !0 }, lineWidth: 1, lineColor: h.neutralColor80, dashStyle: "Dot", borderColor: h.neutralColor80, states: { hover: { lineWidthPlus: 0 } } }); return d
        }(x); n(a.prototype, { getZonesGraphs: b.prototype.getZonesGraphs, pointValKey: "y", showLine: !0, pointClass: d }); f.registerSeriesType("waterfall", a); u.compose(c.Axis, e); ""; return a
    }); z(e, "Series/Polygon/PolygonSeries.js", [e["Core/Globals.js"], e["Mixins/LegendSymbol.js"], e["Core/Series/SeriesRegistry.js"],
    e["Core/Utilities.js"]], function (e, c, h, f) {
        var a = this && this.__extends || function () { var a = function (b, d) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, b) { a.__proto__ = b } || function (a, b) { for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]) }; return a(b, d) }; return function (b, d) { function c() { this.constructor = b } a(b, d); b.prototype = null === d ? Object.create(d) : (c.prototype = d.prototype, new c) } }(); e = e.noop; var u = h.series, d = h.seriesTypes, r = d.area, n = d.line, x = d.scatter; d = f.extend; var b = f.merge; f = function (d) {
            function c() {
                var a =
                null !== d && d.apply(this, arguments) || this; a.data = void 0; a.options = void 0; a.points = void 0; return a
            } a(c, d); c.prototype.getGraphPath = function () { for (var a = n.prototype.getGraphPath.call(this), b = a.length + 1; b--;) (b === a.length || "M" === a[b][0]) && 0 < b && a.splice(b, 0, ["Z"]); return this.areaPath = a }; c.prototype.drawGraph = function () { this.options.fillColor = this.color; r.prototype.drawGraph.call(this) }; c.defaultOptions = b(x.defaultOptions, {
                marker: { enabled: !1, states: { hover: { enabled: !1 } } }, stickyTracking: !1, tooltip: {
                    followPointer: !0,
                    pointFormat: ""
                }, trackByArea: !0
            }); return c
        }(x); d(f.prototype, { type: "polygon", drawLegendSymbol: c.drawRectangle, drawTracker: u.prototype.drawTracker, setStackedPoints: e }); h.registerSeriesType("polygon", f); ""; return f
    }); z(e, "Series/Bubble/BubblePoint.js", [e["Core/Series/Point.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, h) {
        var f = this && this.__extends || function () {
            var a = function (c, d) {
                a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, d) { a.__proto__ = d } || function (a,
                d) { for (var c in d) d.hasOwnProperty(c) && (a[c] = d[c]) }; return a(c, d)
            }; return function (c, d) { function f() { this.constructor = c } a(c, d); c.prototype = null === d ? Object.create(d) : (f.prototype = d.prototype, new f) }
        }(); h = h.extend; c = function (a) { function c() { var d = null !== a && a.apply(this, arguments) || this; d.options = void 0; d.series = void 0; return d } f(c, a); c.prototype.haloPath = function (a) { return e.prototype.haloPath.call(this, 0 === a ? 0 : (this.marker ? this.marker.radius || 0 : 0) + a) }; return c }(c.seriesTypes.scatter.prototype.pointClass);
        h(c.prototype, { ttBelow: !1 }); return c
    }); z(e, "Series/Bubble/BubbleLegend.js", [e["Core/Chart/Chart.js"], e["Core/Color/Color.js"], e["Core/Globals.js"], e["Core/Legend.js"], e["Core/Color/Palette.js"], e["Core/Series/Series.js"], e["Core/Utilities.js"]], function (e, c, h, f, a, u, d) {
        var r = c.parse, n = h.noop; c = d.addEvent; var x = d.arrayMax, b = d.arrayMin, k = d.isNumber, l = d.merge, t = d.objectEach, w = d.pick, B = d.setOptions, z = d.stableSort, F = d.wrap; ""; B({
            legend: {
                bubbleLegend: {
                    borderColor: void 0, borderWidth: 2, className: void 0, color: void 0,
                    connectorClassName: void 0, connectorColor: void 0, connectorDistance: 60, connectorWidth: 1, enabled: !1, labels: { className: void 0, allowOverlap: !1, format: "", formatter: void 0, align: "right", style: { fontSize: 10, color: void 0 }, x: 0, y: 0 }, maxSize: 60, minSize: 10, legendIndex: 0, ranges: { value: void 0, borderColor: void 0, color: void 0, connectorColor: void 0 }, sizeBy: "area", sizeByAbsoluteValue: !1, zIndex: 1, zThreshold: 0
                }
            }
        }); B = function () {
            function c(a, b) {
                this.options = this.symbols = this.visible = this.ranges = this.movementX = this.maxLabel =
                this.legendSymbol = this.legendItemWidth = this.legendItemHeight = this.legendItem = this.legendGroup = this.legend = this.fontMetrics = this.chart = void 0; this.setState = n; this.init(a, b)
            } c.prototype.init = function (a, b) { this.options = a; this.visible = !0; this.chart = b.chart; this.legend = b }; c.prototype.addToLegend = function (a) { a.splice(this.options.legendIndex, 0, this) }; c.prototype.drawLegendSymbol = function (a) {
                var b = this.chart, g = this.options, d = w(a.options.itemDistance, 20), c = g.ranges; var m = g.connectorDistance; this.fontMetrics =
                b.renderer.fontMetrics(g.labels.style.fontSize.toString() + "px"); c && c.length && k(c[0].value) ? (z(c, function (a, b) { return b.value - a.value }), this.ranges = c, this.setOptions(), this.render(), b = this.getMaxLabelSize(), c = this.ranges[0].radius, a = 2 * c, m = m - c + b.width, m = 0 < m ? m : 0, this.maxLabel = b, this.movementX = "left" === g.labels.align ? m : 0, this.legendItemWidth = a + m + d, this.legendItemHeight = a + this.fontMetrics.h / 2) : a.options.bubbleLegend.autoRanges = !0
            }; c.prototype.setOptions = function () {
                var a = this.ranges, b = this.options, g = this.chart.series[b.seriesIndex],
                d = this.legend.baseline, c = { "z-index": b.zIndex, "stroke-width": b.borderWidth }, m = { "z-index": b.zIndex, "stroke-width": b.connectorWidth }, f = this.getLabelStyles(), k = g.options.marker.fillOpacity, h = this.chart.styledMode; a.forEach(function (q, v) {
                    h || (c.stroke = w(q.borderColor, b.borderColor, g.color), c.fill = w(q.color, b.color, 1 !== k ? r(g.color).setOpacity(k).get("rgba") : g.color), m.stroke = w(q.connectorColor, b.connectorColor, g.color)); a[v].radius = this.getRangeRadius(q.value); a[v] = l(a[v], {
                        center: a[0].radius - a[v].radius +
                        d
                    }); h || l(!0, a[v], { bubbleStyle: l(!1, c), connectorStyle: l(!1, m), labelStyle: f })
                }, this)
            }; c.prototype.getLabelStyles = function () { var b = this.options, d = {}, g = "left" === b.labels.align, c = this.legend.options.rtl; t(b.labels.style, function (a, b) { "color" !== b && "fontSize" !== b && "z-index" !== b && (d[b] = a) }); return l(!1, d, { "font-size": b.labels.style.fontSize, fill: w(b.labels.style.color, a.neutralColor100), "z-index": b.zIndex, align: c || g ? "right" : "left" }) }; c.prototype.getRangeRadius = function (a) {
                var b = this.options; return this.chart.series[this.options.seriesIndex].getRadius.call(this,
                b.ranges[b.ranges.length - 1].value, b.ranges[0].value, b.minSize, b.maxSize, a)
            }; c.prototype.render = function () {
                var a = this.chart.renderer, b = this.options.zThreshold; this.symbols || (this.symbols = { connectors: [], bubbleItems: [], labels: [] }); this.legendSymbol = a.g("bubble-legend"); this.legendItem = a.g("bubble-legend-item"); this.legendSymbol.translateX = 0; this.legendSymbol.translateY = 0; this.ranges.forEach(function (a) { a.value >= b && this.renderRange(a) }, this); this.legendSymbol.add(this.legendItem); this.legendItem.add(this.legendGroup);
                this.hideOverlappingLabels()
            }; c.prototype.renderRange = function (a) {
                var b = this.options, g = b.labels, d = this.chart.renderer, c = this.symbols, m = c.labels, f = a.center, k = Math.abs(a.radius), h = b.connectorDistance || 0, e = g.align, l = g.style.fontSize; h = this.legend.options.rtl || "left" === e ? -h : h; g = b.connectorWidth; var p = this.ranges[0].radius || 0, r = f - k - b.borderWidth / 2 + g / 2; l = l / 2 - (this.fontMetrics.h - l) / 2; var t = d.styledMode; "center" === e && (h = 0, b.connectorDistance = 0, a.labelStyle.align = "center"); e = r + b.labels.y; var n = p + h + b.labels.x;
                c.bubbleItems.push(d.circle(p, f + ((r % 1 ? 1 : .5) - (g % 2 ? 0 : .5)), k).attr(t ? {} : a.bubbleStyle).addClass((t ? "RBG_charts-color-" + this.options.seriesIndex + " " : "") + "RBG_charts-bubble-legend-symbol " + (b.className || "")).add(this.legendSymbol)); c.connectors.push(d.path(d.crispLine([["M", p, r], ["L", p + h, r]], b.connectorWidth)).attr(t ? {} : a.connectorStyle).addClass((t ? "RBG_charts-color-" + this.options.seriesIndex + " " : "") + "RBG_charts-bubble-legend-connectors " + (b.connectorClassName || "")).add(this.legendSymbol)); a = d.text(this.formatLabel(a),
                n, e + l).attr(t ? {} : a.labelStyle).addClass("RBG_charts-bubble-legend-labels " + (b.labels.className || "")).add(this.legendSymbol); m.push(a); a.placed = !0; a.alignAttr = { x: n, y: e + l }
            }; c.prototype.getMaxLabelSize = function () { var a, b; this.symbols.labels.forEach(function (g) { b = g.getBBox(!0); a = a ? b.width > a.width ? b : a : b }); return a || {} }; c.prototype.formatLabel = function (a) { var b = this.options, g = b.labels.formatter; b = b.labels.format; var c = this.chart.numberFormatter; return b ? d.format(b, a) : g ? g.call(a) : c(a.value, 1) }; c.prototype.hideOverlappingLabels =
            function () { var a = this.chart, b = this.symbols; !this.options.labels.allowOverlap && b && (a.hideOverlappingLabels(b.labels), b.labels.forEach(function (a, d) { a.newOpacity ? a.newOpacity !== a.oldOpacity && b.connectors[d].show() : b.connectors[d].hide() })) }; c.prototype.getRanges = function () {
                var a = this.legend.bubbleLegend, d = a.options.ranges, g, c = Number.MAX_VALUE, f = -Number.MAX_VALUE; a.chart.series.forEach(function (a) {
                    a.isBubble && !a.ignoreSeries && (g = a.zData.filter(k), g.length && (c = w(a.options.zMin, Math.min(c, Math.max(b(g),
                    !1 === a.options.displayNegative ? a.options.zThreshold : -Number.MAX_VALUE))), f = w(a.options.zMax, Math.max(f, x(g)))))
                }); var m = c === f ? [{ value: f }] : [{ value: c }, { value: (c + f) / 2 }, { value: f, autoRanges: !0 }]; d.length && d[0].radius && m.reverse(); m.forEach(function (a, b) { d && d[b] && (m[b] = l(!1, d[b], a)) }); return m
            }; c.prototype.predictBubbleSizes = function () {
                var a = this.chart, b = this.fontMetrics, g = a.legend.options, d = "horizontal" === g.layout, c = d ? a.legend.lastLineHeight : 0, f = a.plotSizeX, k = a.plotSizeY, h = a.series[this.options.seriesIndex];
                a = Math.ceil(h.minPxSize); var e = Math.ceil(h.maxPxSize); h = h.options.maxSize; var l = Math.min(k, f); if (g.floating || !/%$/.test(h)) b = e; else if (h = parseFloat(h), b = (l + c - b.h / 2) * h / 100 / (h / 100 + 1), d && k - b >= f || !d && f - b >= k) b = e; return [a, Math.ceil(b)]
            }; c.prototype.updateRanges = function (a, b) { var g = this.legend.options.bubbleLegend; g.minSize = a; g.maxSize = b; g.ranges = this.getRanges() }; c.prototype.correctSizes = function () {
                var a = this.legend, b = this.chart.series[this.options.seriesIndex]; 1 < Math.abs(Math.ceil(b.maxPxSize) - this.options.maxSize) &&
                (this.updateRanges(this.options.minSize, b.maxPxSize), a.render())
            }; return c
        }(); c(f, "afterGetAllItems", function (a) { var b = this.bubbleLegend, d = this.options, g = d.bubbleLegend, c = this.chart.getVisibleBubbleSeriesIndex(); b && b.ranges && b.ranges.length && (g.ranges.length && (g.autoRanges = !!g.ranges[0].autoRanges), this.destroyItem(b)); 0 <= c && d.enabled && g.enabled && (g.seriesIndex = c, this.bubbleLegend = new h.BubbleLegend(g, this), this.bubbleLegend.addToLegend(a.allItems)) }); e.prototype.getVisibleBubbleSeriesIndex = function () {
            for (var a =
            this.series, b = 0; b < a.length;) { if (a[b] && a[b].isBubble && a[b].visible && a[b].zData.length) return b; b++ } return -1
        }; f.prototype.getLinesHeights = function () { var a = this.allItems, b = [], d = a.length, g, c = 0; for (g = 0; g < d; g++) if (a[g].legendItemHeight && (a[g].itemHeight = a[g].legendItemHeight), a[g] === a[d - 1] || a[g + 1] && a[g]._legendItemPos[1] !== a[g + 1]._legendItemPos[1]) { b.push({ height: 0 }); var f = b[b.length - 1]; for (c; c <= g; c++) a[c].itemHeight > f.height && (f.height = a[c].itemHeight); f.step = g } return b }; f.prototype.retranslateItems = function (a) {
            var b,
            d, g, c = this.options.rtl, f = 0; this.allItems.forEach(function (m, h) { b = m.legendGroup.translateX; d = m._legendItemPos[1]; if ((g = m.movementX) || c && m.ranges) g = c ? b - m.options.maxSize / 2 : b + g, m.legendGroup.attr({ translateX: g }); h > a[f].step && f++; m.legendGroup.attr({ translateY: Math.round(d + a[f].height / 2) }); m._legendItemPos[1] = d + a[f].height / 2 })
        }; c(u, "legendItemClick", function () {
            var a = this.chart, b = this.visible, d = this.chart.legend; d && d.bubbleLegend && (this.visible = !b, this.ignoreSeries = b, a = 0 <= a.getVisibleBubbleSeriesIndex(),
            d.bubbleLegend.visible !== a && (d.update({ bubbleLegend: { enabled: a } }), d.bubbleLegend.visible = a), this.visible = b)
        }); F(e.prototype, "drawChartBox", function (a, b, d) {
            var g = this.legend, c = 0 <= this.getVisibleBubbleSeriesIndex(); if (g && g.options.enabled && g.bubbleLegend && g.options.bubbleLegend.autoRanges && c) {
                var f = g.bubbleLegend.options; c = g.bubbleLegend.predictBubbleSizes(); g.bubbleLegend.updateRanges(c[0], c[1]); f.placed || (g.group.placed = !1, g.allItems.forEach(function (a) { a.legendGroup.translateY = null })); g.render();
                this.getMargins(); this.axes.forEach(function (a) { a.visible && a.render(); f.placed || (a.setScale(), a.updateNames(), t(a.ticks, function (a) { a.isNew = !0; a.isNewLabel = !0 })) }); f.placed = !0; this.getMargins(); a.call(this, b, d); g.bubbleLegend.correctSizes(); g.retranslateItems(g.getLinesHeights())
            } else a.call(this, b, d), g && g.options.enabled && g.bubbleLegend && (g.render(), g.retranslateItems(g.getLinesHeights()))
        }); h.BubbleLegend = B; return h.BubbleLegend
    }); z(e, "Series/Bubble/BubbleSeries.js", [e["Core/Axis/Axis.js"], e["Series/Bubble/BubblePoint.js"],
    e["Core/Color/Color.js"], e["Core/Globals.js"], e["Core/Series/Series.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function (e, c, h, f, a, u, d) {
        var r = this && this.__extends || function () {
            var a = function (b, g) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, b) { a.__proto__ = b } || function (a, b) { for (var g in b) b.hasOwnProperty(g) && (a[g] = b[g]) }; return a(b, g) }; return function (b, g) {
                function d() { this.constructor = b } a(b, g); b.prototype = null === g ? Object.create(g) : (d.prototype = g.prototype,
                new d)
            }
        }(), n = h.parse; h = f.noop; var x = u.seriesTypes; f = x.column; var b = x.scatter, k = d.arrayMax, l = d.arrayMin, t = d.clamp, w = d.extend, B = d.isNumber, z = d.merge, F = d.pick, y = d.pInt; d = function (d) {
            function c() { var a = null !== d && d.apply(this, arguments) || this; a.data = void 0; a.maxPxSize = void 0; a.minPxSize = void 0; a.options = void 0; a.points = void 0; a.radii = void 0; a.yData = void 0; a.zData = void 0; return a } r(c, d); c.prototype.animate = function (a) {
                !a && this.points.length < this.options.animationLimit && this.points.forEach(function (a) {
                    var b =
                    a.graphic; b && b.width && (this.hasRendered || b.attr({ x: a.plotX, y: a.plotY, width: 1, height: 1 }), b.animate(this.markerAttribs(a), this.options.animation))
                }, this)
            }; c.prototype.getRadii = function (a, b, d) { var g = this.zData, c = this.yData, f = d.minPxSize, h = d.maxPxSize, k = []; var e = 0; for (d = g.length; e < d; e++) { var l = g[e]; k.push(this.getRadius(a, b, f, h, l, c[e])) } this.radii = k }; c.prototype.getRadius = function (a, b, d, c, f, h) {
                var g = this.options, m = "width" !== g.sizeBy, k = g.zThreshold, e = b - a, l = .5; if (null === h || null === f) return null; if (B(f)) {
                    g.sizeByAbsoluteValue &&
                    (f = Math.abs(f - k), e = Math.max(b - k, Math.abs(a - k)), a = 0); if (f < a) return d / 2 - 1; 0 < e && (l = (f - a) / e)
                } m && 0 <= l && (l = Math.sqrt(l)); return Math.ceil(d + l * (c - d)) / 2
            }; c.prototype.hasData = function () { return !!this.processedXData.length }; c.prototype.pointAttribs = function (b, d) { var g = this.options.marker.fillOpacity; b = a.prototype.pointAttribs.call(this, b, d); 1 !== g && (b.fill = n(b.fill).setOpacity(g).get("rgba")); return b }; c.prototype.translate = function () {
                var a, b = this.data, c = this.radii; d.prototype.translate.call(this); for (a = b.length; a--;) {
                    var f =
                    b[a]; var k = c ? c[a] : 0; B(k) && k >= this.minPxSize / 2 ? (f.marker = w(f.marker, { radius: k, width: 2 * k, height: 2 * k }), f.dlBox = { x: f.plotX - k, y: f.plotY - k, width: 2 * k, height: 2 * k }) : f.shapeArgs = f.plotY = f.dlBox = void 0
                }
            }; c.defaultOptions = z(b.defaultOptions, {
                dataLabels: { formatter: function () { return this.point.z }, inside: !0, verticalAlign: "middle" }, animationLimit: 250, marker: { lineColor: null, lineWidth: 1, fillOpacity: .5, radius: null, states: { hover: { radiusPlus: 0 } }, symbol: "circle" }, minSize: 8, maxSize: "20%", softThreshold: !1, states: { hover: { halo: { size: 5 } } },
                tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" }, turboThreshold: 0, zThreshold: 0, zoneAxis: "z"
            }); return c
        }(b); w(d.prototype, { alignDataLabel: f.prototype.alignDataLabel, applyZones: h, bubblePadding: !0, buildKDTree: h, directTouch: !0, isBubble: !0, pointArrayMap: ["y", "z"], pointClass: c, parallelArrays: ["x", "y", "z"], trackerGroups: ["group", "dataLabelsGroup"], specialGroup: "group", zoneAxis: "z" }); e.prototype.beforePadding = function () {
            var a = this, b = this.len, g = this.chart, d = 0, c = b, f = this.isXAxis, h = f ? "xData" :
            "yData", e = this.min, r = {}, n = Math.min(g.plotWidth, g.plotHeight), u = Number.MAX_VALUE, w = -Number.MAX_VALUE, x = this.max - e, z = b / x, G = []; this.series.forEach(function (b) {
                var d = b.options; !b.bubblePadding || !b.visible && g.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, G.push(b), f && (["minSize", "maxSize"].forEach(function (a) { var b = d[a], g = /%$/.test(b); b = y(b); r[a] = g ? n * b / 100 : b }), b.minPxSize = r.minSize, b.maxPxSize = Math.max(r.maxSize, r.minSize), b = b.zData.filter(B), b.length && (u = F(d.zMin, t(l(b), !1 === d.displayNegative ?
                d.zThreshold : -Number.MAX_VALUE, u)), w = F(d.zMax, Math.max(w, k(b))))))
            }); G.forEach(function (b) { var g = b[h], k = g.length; f && b.getRadii(u, w, b); if (0 < x) for (; k--;) if (B(g[k]) && a.dataMin <= g[k] && g[k] <= a.max) { var m = b.radii ? b.radii[k] : 0; d = Math.min((g[k] - e) * z - m, d); c = Math.max((g[k] - e) * z + m, c) } }); G.length && 0 < x && !this.logarithmic && (c -= b, z *= (b + Math.max(0, d) - Math.min(c, b)) / b, [["min", "userMin", d], ["max", "userMax", c]].forEach(function (b) { "undefined" === typeof F(a.options[b[0]], a[b[1]]) && (a[b[0]] += b[2] / z) }))
        }; u.registerSeriesType("bubble",
        d); ""; ""; return d
    }); z(e, "Series/PackedBubble/PackedBubblePoint.js", [e["Core/Chart/Chart.js"], e["Core/Series/Point.js"], e["Core/Series/SeriesRegistry.js"]], function (e, c, h) {
        var f = this && this.__extends || function () {
            var a = function (c, d) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, d) { a.__proto__ = d } || function (a, d) { for (var c in d) d.hasOwnProperty(c) && (a[c] = d[c]) }; return a(c, d) }; return function (c, d) {
                function f() { this.constructor = c } a(c, d); c.prototype = null === d ? Object.create(d) : (f.prototype =
                d.prototype, new f)
            }
        }(); return function (a) {
            function h() { var d = null !== a && a.apply(this, arguments) || this; d.degree = NaN; d.mass = NaN; d.radius = NaN; d.options = void 0; d.series = void 0; d.value = null; return d } f(h, a); h.prototype.destroy = function () { this.series.layout && this.series.layout.removeElementFromCollection(this, this.series.layout.nodes); return c.prototype.destroy.apply(this, arguments) }; h.prototype.firePointEvent = function () {
                var a = this.series.options; if (this.isParentNode && a.parentNode) {
                    var f = a.allowPointSelect;
                    a.allowPointSelect = a.parentNode.allowPointSelect; c.prototype.firePointEvent.apply(this, arguments); a.allowPointSelect = f
                } else c.prototype.firePointEvent.apply(this, arguments)
            }; h.prototype.select = function () { var a = this.series.chart; this.isParentNode ? (a.getSelectedPoints = a.getSelectedParentNodes, c.prototype.select.apply(this, arguments), a.getSelectedPoints = e.prototype.getSelectedPoints) : c.prototype.select.apply(this, arguments) }; return h
        }(h.seriesTypes.bubble.prototype.pointClass)
    }); z(e, "Series/Networkgraph/DraggableNodes.js",
    [e["Core/Chart/Chart.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (e, c, h) {
        var f = h.addEvent; c.dragNodesMixin = {
            onMouseDown: function (a, c) { c = this.chart.pointer.normalize(c); a.fixedPosition = { chartX: c.chartX, chartY: c.chartY, plotX: a.plotX, plotY: a.plotY }; a.inDragMode = !0 }, onMouseMove: function (a, c) {
                if (a.fixedPosition && a.inDragMode) {
                    var d = this.chart; c = d.pointer.normalize(c); var f = a.fixedPosition.chartX - c.chartX, h = a.fixedPosition.chartY - c.chartY; c = d.graphLayoutsLookup; if (5 < Math.abs(f) || 5 < Math.abs(h)) f =
                    a.fixedPosition.plotX - f, h = a.fixedPosition.plotY - h, d.isInsidePlot(f, h) && (a.plotX = f, a.plotY = h, a.hasDragged = !0, this.redrawHalo(a), c.forEach(function (a) { a.restartSimulation() }))
                }
            }, onMouseUp: function (a, c) { a.fixedPosition && (a.hasDragged && (this.layout.enableSimulation ? this.layout.start() : this.chart.redraw()), a.inDragMode = a.hasDragged = !1, this.options.fixedDraggable || delete a.fixedPosition) }, redrawHalo: function (a) { a && this.halo && this.halo.attr({ d: a.haloPath(this.options.states.hover.halo.size) }) }
        }; f(e, "load",
        function () { var a = this, c, d, h; a.container && (c = f(a.container, "mousedown", function (c) { var e = a.hoverPoint; e && e.series && e.series.hasDraggableNodes && e.series.options.draggable && (e.series.onMouseDown(e, c), d = f(a.container, "mousemove", function (a) { return e && e.series && e.series.onMouseMove(e, a) }), h = f(a.container.ownerDocument, "mouseup", function (a) { d(); h(); return e && e.series && e.series.onMouseUp(e, a) })) })); f(a, "destroy", function () { c() }) })
    }); z(e, "Series/Networkgraph/Integrations.js", [e["Core/Globals.js"]], function (e) {
        e.networkgraphIntegrations =
        {
            verlet: {
                attractiveForceFunction: function (c, h) { return (h - c) / c }, repulsiveForceFunction: function (c, h) { return (h - c) / c * (h > c ? 1 : 0) }, barycenter: function () { var c = this.options.gravitationalConstant, h = this.barycenter.xFactor, f = this.barycenter.yFactor; h = (h - (this.box.left + this.box.width) / 2) * c; f = (f - (this.box.top + this.box.height) / 2) * c; this.nodes.forEach(function (a) { a.fixedPosition || (a.plotX -= h / a.mass / a.degree, a.plotY -= f / a.mass / a.degree) }) }, repulsive: function (c, h, f) {
                    h = h * this.diffTemperature / c.mass / c.degree; c.fixedPosition ||
                    (c.plotX += f.x * h, c.plotY += f.y * h)
                }, attractive: function (c, h, f) { var a = c.getMass(), e = -f.x * h * this.diffTemperature; h = -f.y * h * this.diffTemperature; c.fromNode.fixedPosition || (c.fromNode.plotX -= e * a.fromNode / c.fromNode.degree, c.fromNode.plotY -= h * a.fromNode / c.fromNode.degree); c.toNode.fixedPosition || (c.toNode.plotX += e * a.toNode / c.toNode.degree, c.toNode.plotY += h * a.toNode / c.toNode.degree) }, integrate: function (c, e) {
                    var f = -c.options.friction, a = c.options.maxSpeed, h = (e.plotX + e.dispX - e.prevX) * f; f *= e.plotY + e.dispY - e.prevY;
                    var d = Math.abs, r = d(h) / (h || 1); d = d(f) / (f || 1); h = r * Math.min(a, Math.abs(h)); f = d * Math.min(a, Math.abs(f)); e.prevX = e.plotX + e.dispX; e.prevY = e.plotY + e.dispY; e.plotX += h; e.plotY += f; e.temperature = c.vectorLength({ x: h, y: f })
                }, getK: function (c) { return Math.pow(c.box.width * c.box.height / c.nodes.length, .5) }
            }, euler: {
                attractiveForceFunction: function (c, e) { return c * c / e }, repulsiveForceFunction: function (c, e) { return e * e / c }, barycenter: function () {
                    var c = this.options.gravitationalConstant, e = this.barycenter.xFactor, f = this.barycenter.yFactor;
                    this.nodes.forEach(function (a) { if (!a.fixedPosition) { var h = a.getDegree(); h *= 1 + h / 2; a.dispX += (e - a.plotX) * c * h / a.degree; a.dispY += (f - a.plotY) * c * h / a.degree } })
                }, repulsive: function (c, e, f, a) { c.dispX += f.x / a * e / c.degree; c.dispY += f.y / a * e / c.degree }, attractive: function (c, e, f, a) {
                    var h = c.getMass(), d = f.x / a * e; e *= f.y / a; c.fromNode.fixedPosition || (c.fromNode.dispX -= d * h.fromNode / c.fromNode.degree, c.fromNode.dispY -= e * h.fromNode / c.fromNode.degree); c.toNode.fixedPosition || (c.toNode.dispX += d * h.toNode / c.toNode.degree, c.toNode.dispY +=
                    e * h.toNode / c.toNode.degree)
                }, integrate: function (c, e) { e.dispX += e.dispX * c.options.friction; e.dispY += e.dispY * c.options.friction; var f = e.temperature = c.vectorLength({ x: e.dispX, y: e.dispY }); 0 !== f && (e.plotX += e.dispX / f * Math.min(Math.abs(e.dispX), c.temperature), e.plotY += e.dispY / f * Math.min(Math.abs(e.dispY), c.temperature)) }, getK: function (c) { return Math.pow(c.box.width * c.box.height / c.nodes.length, .3) }
            }
        }
    }); z(e, "Series/Networkgraph/QuadTree.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function (e, c) {
        c = c.extend;
        var h = e.QuadTreeNode = function (c) { this.box = c; this.boxSize = Math.min(c.width, c.height); this.nodes = []; this.body = this.isInternal = !1; this.isEmpty = !0 }; c(h.prototype, {
            insert: function (c, a) {
                this.isInternal ? this.nodes[this.getBoxPosition(c)].insert(c, a - 1) : (this.isEmpty = !1, this.body ? a ? (this.isInternal = !0, this.divideBox(), !0 !== this.body && (this.nodes[this.getBoxPosition(this.body)].insert(this.body, a - 1), this.body = !0), this.nodes[this.getBoxPosition(c)].insert(c, a - 1)) : (a = new h({
                    top: c.plotX, left: c.plotY, width: .1,
                    height: .1
                }), a.body = c, a.isInternal = !1, this.nodes.push(a)) : (this.isInternal = !1, this.body = c))
            }, updateMassAndCenter: function () { var c = 0, a = 0, e = 0; this.isInternal ? (this.nodes.forEach(function (d) { d.isEmpty || (c += d.mass, a += d.plotX * d.mass, e += d.plotY * d.mass) }), a /= c, e /= c) : this.body && (c = this.body.mass, a = this.body.plotX, e = this.body.plotY); this.mass = c; this.plotX = a; this.plotY = e }, divideBox: function () {
                var c = this.box.width / 2, a = this.box.height / 2; this.nodes[0] = new h({ left: this.box.left, top: this.box.top, width: c, height: a });
                this.nodes[1] = new h({ left: this.box.left + c, top: this.box.top, width: c, height: a }); this.nodes[2] = new h({ left: this.box.left + c, top: this.box.top + a, width: c, height: a }); this.nodes[3] = new h({ left: this.box.left, top: this.box.top + a, width: c, height: a })
            }, getBoxPosition: function (c) { var a = c.plotY < this.box.top + this.box.height / 2; return c.plotX < this.box.left + this.box.width / 2 ? a ? 0 : 3 : a ? 1 : 2 }
        }); e = e.QuadTree = function (c, a, e, d) {
            this.box = { left: c, top: a, width: e, height: d }; this.maxDepth = 25; this.root = new h(this.box, "0"); this.root.isInternal =
            !0; this.root.isRoot = !0; this.root.divideBox()
        }; c(e.prototype, { insertNodes: function (c) { c.forEach(function (a) { this.root.insert(a, this.maxDepth) }, this) }, visitNodeRecursive: function (c, a, e) { var d; c || (c = this.root); c === this.root && a && (d = a(c)); !1 !== d && (c.nodes.forEach(function (c) { if (c.isInternal) { a && (d = a(c)); if (!1 === d) return; this.visitNodeRecursive(c, a, e) } else c.body && a && a(c.body); e && e(c) }, this), c === this.root && e && e(c)) }, calculateMassAndCenter: function () { this.visitNodeRecursive(null, null, function (c) { c.updateMassAndCenter() }) } })
    });
    z(e, "Series/Networkgraph/Layouts.js", [e["Core/Chart/Chart.js"], e["Core/Animation/AnimationUtilities.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (e, c, h, f) {
        var a = c.setAnimation; c = f.addEvent; var u = f.clamp, d = f.defined, r = f.extend, n = f.isFunction, x = f.pick; h.layouts = { "reingold-fruchterman": function () { } }; r(h.layouts["reingold-fruchterman"].prototype, {
            init: function (a) {
                this.options = a; this.nodes = []; this.links = []; this.series = []; this.box = { x: 0, y: 0, width: 0, height: 0 }; this.setInitialRendering(!0); this.integration =
                h.networkgraphIntegrations[a.integration]; this.enableSimulation = a.enableSimulation; this.attractiveForce = x(a.attractiveForce, this.integration.attractiveForceFunction); this.repulsiveForce = x(a.repulsiveForce, this.integration.repulsiveForceFunction); this.approximation = a.approximation
            }, updateSimulation: function (a) { this.enableSimulation = x(a, this.options.enableSimulation) }, start: function () {
                var a = this.series, c = this.options; this.currentStep = 0; this.forces = a[0] && a[0].forces || []; this.chart = a[0] && a[0].chart; this.initialRendering &&
                (this.initPositions(), a.forEach(function (a) { a.finishedAnimating = !0; a.render() })); this.setK(); this.resetSimulation(c); this.enableSimulation && this.step()
            }, step: function () {
                var a = this, c = this.series; a.currentStep++; "barnes-hut" === a.approximation && (a.createQuadTree(), a.quadTree.calculateMassAndCenter()); a.forces.forEach(function (b) { a[b + "Forces"](a.temperature) }); a.applyLimits(a.temperature); a.temperature = a.coolDown(a.startTemperature, a.diffTemperature, a.currentStep); a.prevSystemTemperature = a.systemTemperature;
                a.systemTemperature = a.getSystemTemperature(); a.enableSimulation && (c.forEach(function (a) { a.chart && a.render() }), a.maxIterations-- && isFinite(a.temperature) && !a.isStable() ? (a.simulation && h.win.cancelAnimationFrame(a.simulation), a.simulation = h.win.requestAnimationFrame(function () { a.step() })) : a.simulation = !1)
            }, stop: function () { this.simulation && h.win.cancelAnimationFrame(this.simulation) }, setArea: function (a, c, d, e) { this.box = { left: a, top: c, width: d, height: e } }, setK: function () { this.k = this.options.linkLength || this.integration.getK(this) },
            addElementsToCollection: function (a, c) { a.forEach(function (a) { -1 === c.indexOf(a) && c.push(a) }) }, removeElementFromCollection: function (a, c) { a = c.indexOf(a); -1 !== a && c.splice(a, 1) }, clear: function () { this.nodes.length = 0; this.links.length = 0; this.series.length = 0; this.resetSimulation() }, resetSimulation: function () { this.forcedStop = !1; this.systemTemperature = 0; this.setMaxIterations(); this.setTemperature(); this.setDiffTemperature() }, restartSimulation: function () {
                this.simulation ? this.resetSimulation() : (this.setInitialRendering(!1),
                this.enableSimulation ? this.start() : this.setMaxIterations(1), this.chart && this.chart.redraw(), this.setInitialRendering(!0))
            }, setMaxIterations: function (a) { this.maxIterations = x(a, this.options.maxIterations) }, setTemperature: function () { this.temperature = this.startTemperature = Math.sqrt(this.nodes.length) }, setDiffTemperature: function () { this.diffTemperature = this.startTemperature / (this.options.maxIterations + 1) }, setInitialRendering: function (a) { this.initialRendering = a }, createQuadTree: function () {
                this.quadTree =
                new h.QuadTree(this.box.left, this.box.top, this.box.width, this.box.height); this.quadTree.insertNodes(this.nodes)
            }, initPositions: function () { var a = this.options.initialPositions; n(a) ? (a.call(this), this.nodes.forEach(function (a) { d(a.prevX) || (a.prevX = a.plotX); d(a.prevY) || (a.prevY = a.plotY); a.dispX = 0; a.dispY = 0 })) : "circle" === a ? this.setCircularPositions() : this.setRandomPositions() }, setCircularPositions: function () {
                function a(b) {
                    b.linksFrom.forEach(function (b) {
                        r[b.toNode.id] || (r[b.toNode.id] = !0, h.push(b.toNode),
                        a(b.toNode))
                    })
                } var c = this.box, d = this.nodes, e = 2 * Math.PI / (d.length + 1), f = d.filter(function (a) { return 0 === a.linksTo.length }), h = [], r = {}, n = this.options.initialPositionRadius; f.forEach(function (b) { h.push(b); a(b) }); h.length ? d.forEach(function (a) { -1 === h.indexOf(a) && h.push(a) }) : h = d; h.forEach(function (a, b) { a.plotX = a.prevX = x(a.plotX, c.width / 2 + n * Math.cos(b * e)); a.plotY = a.prevY = x(a.plotY, c.height / 2 + n * Math.sin(b * e)); a.dispX = 0; a.dispY = 0 })
            }, setRandomPositions: function () {
                function a(a) { a = a * a / Math.PI; return a -= Math.floor(a) }
                var c = this.box, d = this.nodes, e = d.length + 1; d.forEach(function (b, d) { b.plotX = b.prevX = x(b.plotX, c.width * a(d)); b.plotY = b.prevY = x(b.plotY, c.height * a(e + d)); b.dispX = 0; b.dispY = 0 })
            }, force: function (a) { this.integration[a].apply(this, Array.prototype.slice.call(arguments, 1)) }, barycenterForces: function () { this.getBarycenter(); this.force("barycenter") }, getBarycenter: function () {
                var a = 0, c = 0, d = 0; this.nodes.forEach(function (b) { c += b.plotX * b.mass; d += b.plotY * b.mass; a += b.mass }); return this.barycenter = {
                    x: c, y: d, xFactor: c / a,
                    yFactor: d / a
                }
            }, barnesHutApproximation: function (a, c) { var b = this.getDistXY(a, c), d = this.vectorLength(b); if (a !== c && 0 !== d) if (c.isInternal) if (c.boxSize / d < this.options.theta && 0 !== d) { var e = this.repulsiveForce(d, this.k); this.force("repulsive", a, e * c.mass, b, d); var f = !1 } else f = !0; else e = this.repulsiveForce(d, this.k), this.force("repulsive", a, e * c.mass, b, d); return f }, repulsiveForces: function () {
                var a = this; "barnes-hut" === a.approximation ? a.nodes.forEach(function (b) {
                    a.quadTree.visitNodeRecursive(null, function (c) {
                        return a.barnesHutApproximation(b,
                        c)
                    })
                }) : a.nodes.forEach(function (b) { a.nodes.forEach(function (c) { if (b !== c && !b.fixedPosition) { var d = a.getDistXY(b, c); var e = a.vectorLength(d); if (0 !== e) { var f = a.repulsiveForce(e, a.k); a.force("repulsive", b, f * c.mass, d, e) } } }) })
            }, attractiveForces: function () { var a = this, c, d, e; a.links.forEach(function (b) { b.fromNode && b.toNode && (c = a.getDistXY(b.fromNode, b.toNode), d = a.vectorLength(c), 0 !== d && (e = a.attractiveForce(d, a.k), a.force("attractive", b, e, c, d))) }) }, applyLimits: function () {
                var a = this; a.nodes.forEach(function (b) {
                    b.fixedPosition ||
                    (a.integration.integrate(a, b), a.applyLimitBox(b, a.box), b.dispX = 0, b.dispY = 0)
                })
            }, applyLimitBox: function (a, c) { var b = a.radius; a.plotX = u(a.plotX, c.left + b, c.width - b); a.plotY = u(a.plotY, c.top + b, c.height - b) }, coolDown: function (a, c, d) { return a - c * d }, isStable: function () { return .00001 > Math.abs(this.systemTemperature - this.prevSystemTemperature) || 0 >= this.temperature }, getSystemTemperature: function () { return this.nodes.reduce(function (a, c) { return a + c.temperature }, 0) }, vectorLength: function (a) {
                return Math.sqrt(a.x * a.x +
                a.y * a.y)
            }, getDistR: function (a, c) { a = this.getDistXY(a, c); return this.vectorLength(a) }, getDistXY: function (a, c) { var b = a.plotX - c.plotX; a = a.plotY - c.plotY; return { x: b, y: a, absX: Math.abs(b), absY: Math.abs(a) } }
        }); c(e, "predraw", function () { this.graphLayoutsLookup && this.graphLayoutsLookup.forEach(function (a) { a.stop() }) }); c(e, "render", function () {
            function b(a) { a.maxIterations-- && isFinite(a.temperature) && !a.isStable() && !a.enableSimulation && (a.beforeStep && a.beforeStep(), a.step(), d = !1, c = !0) } var c = !1; if (this.graphLayoutsLookup) {
                a(!1,
                this); for (this.graphLayoutsLookup.forEach(function (a) { a.start() }) ; !d;) { var d = !0; this.graphLayoutsLookup.forEach(b) } c && this.series.forEach(function (a) { a && a.layout && a.render() })
            }
        }); c(e, "beforePrint", function () { this.graphLayoutsLookup && (this.graphLayoutsLookup.forEach(function (a) { a.updateSimulation(!1) }), this.redraw()) }); c(e, "afterPrint", function () { this.graphLayoutsLookup && this.graphLayoutsLookup.forEach(function (a) { a.updateSimulation() }); this.redraw() })
    }); z(e, "Series/PackedBubble/PackedBubbleComposition.js",
    [e["Core/Chart/Chart.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (e, c, h) {
        var f = c.layouts["reingold-fruchterman"], a = h.addEvent, u = h.extendClass, d = h.pick; e.prototype.getSelectedParentNodes = function () { var a = []; this.series.forEach(function (c) { c.parentNode && c.parentNode.selected && a.push(c.parentNode) }); return a }; c.networkgraphIntegrations.packedbubble = {
            repulsiveForceFunction: function (a, c, d, b) { return Math.min(a, (d.marker.radius + b.marker.radius) / 2) }, barycenter: function () {
                var a = this, c = a.options.gravitationalConstant,
                d = a.box, b = a.nodes, e, f; b.forEach(function (h) { a.options.splitSeries && !h.isParentNode ? (e = h.series.parentNode.plotX, f = h.series.parentNode.plotY) : (e = d.width / 2, f = d.height / 2); h.fixedPosition || (h.plotX -= (h.plotX - e) * c / (h.mass * Math.sqrt(b.length)), h.plotY -= (h.plotY - f) * c / (h.mass * Math.sqrt(b.length))) })
            }, repulsive: function (a, c, d, b) { var e = c * this.diffTemperature / a.mass / a.degree; c = d.x * e; d = d.y * e; a.fixedPosition || (a.plotX += c, a.plotY += d); b.fixedPosition || (b.plotX -= c, b.plotY -= d) }, integrate: c.networkgraphIntegrations.verlet.integrate,
            getK: c.noop
        }; c.layouts.packedbubble = u(f, {
            beforeStep: function () { this.options.marker && this.series.forEach(function (a) { a && a.calculateParentRadius() }) }, setCircularPositions: function () {
                var a = this, c = a.box, e = a.nodes, b = 2 * Math.PI / (e.length + 1), f, h, t = a.options.initialPositionRadius; e.forEach(function (e, k) {
                    a.options.splitSeries && !e.isParentNode ? (f = e.series.parentNode.plotX, h = e.series.parentNode.plotY) : (f = c.width / 2, h = c.height / 2); e.plotX = e.prevX = d(e.plotX, f + t * Math.cos(e.index || k * b)); e.plotY = e.prevY = d(e.plotY, h +
                    t * Math.sin(e.index || k * b)); e.dispX = 0; e.dispY = 0
                })
            }, repulsiveForces: function () { var a = this, c, d, b, e = a.options.bubblePadding; a.nodes.forEach(function (f) { f.degree = f.mass; f.neighbours = 0; a.nodes.forEach(function (h) { c = 0; f === h || f.fixedPosition || !a.options.seriesInteraction && f.series !== h.series || (b = a.getDistXY(f, h), d = a.vectorLength(b) - (f.marker.radius + h.marker.radius + e), 0 > d && (f.degree += .01, f.neighbours++, c = a.repulsiveForce(-d / Math.sqrt(f.neighbours), a.k, f, h)), a.force("repulsive", f, c * h.mass, b, h, d)) }) }) }, applyLimitBox: function (a) {
                if (this.options.splitSeries &&
                !a.isParentNode && this.options.parentNodeLimit) { var c = this.getDistXY(a, a.series.parentNode); var d = a.series.parentNodeRadius - a.marker.radius - this.vectorLength(c); 0 > d && d > -2 * a.marker.radius && (a.plotX -= .01 * c.x, a.plotY -= .01 * c.y) } f.prototype.applyLimitBox.apply(this, arguments)
            }
        }); a(e, "beforeRedraw", function () { this.allDataPoints && delete this.allDataPoints })
    }); z(e, "Series/PackedBubble/PackedBubbleSeries.js", [e["Core/Color/Color.js"], e["Core/Globals.js"], e["Series/PackedBubble/PackedBubblePoint.js"], e["Core/Series/SeriesRegistry.js"],
    e["Core/Utilities.js"]], function (e, c, h, f, a) {
        var u = this && this.__extends || function () { var a = function (b, c) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, b) { a.__proto__ = b } || function (a, b) { for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]) }; return a(b, c) }; return function (b, c) { function g() { this.constructor = b } a(b, c); b.prototype = null === c ? Object.create(c) : (g.prototype = c.prototype, new g) } }(), d = e.parse, r = f.series, n = f.seriesTypes.bubble, x = a.addEvent, b = a.clamp, k = a.defined, l = a.extend, t = a.fireEvent,
        w = a.isArray, z = a.isNumber, B = a.merge, F = a.pick, y = c.dragNodesMixin; e = function (a) {
            function e() { var b = null !== a && a.apply(this, arguments) || this; b.chart = void 0; b.data = void 0; b.layout = void 0; b.options = void 0; b.points = void 0; b.xData = void 0; return b } u(e, a); e.prototype.accumulateAllPoints = function (a) {
                var b = a.chart, c = [], g, d; for (g = 0; g < b.series.length; g++) if (a = b.series[g], a.is("packedbubble") && a.visible || !b.options.chart.ignoreHiddenSeries) for (d = 0; d < a.yData.length; d++) c.push([null, null, a.yData[d], a.index, d, {
                    id: d,
                    marker: { radius: 0 }
                }]); return c
            }; e.prototype.addLayout = function () {
                var a = this.options.layoutAlgorithm, b = this.chart.graphLayoutsStorage, d = this.chart.graphLayoutsLookup, e = this.chart.options.chart; b || (this.chart.graphLayoutsStorage = b = {}, this.chart.graphLayoutsLookup = d = []); var f = b[a.type]; f || (a.enableSimulation = k(e.forExport) ? !e.forExport : a.enableSimulation, b[a.type] = f = new c.layouts[a.type], f.init(a), d.splice(f.index, 0, f)); this.layout = f; this.points.forEach(function (a) {
                    a.mass = 2; a.degree = 1; a.collisionNmb =
                    1
                }); f.setArea(0, 0, this.chart.plotWidth, this.chart.plotHeight); f.addElementsToCollection([this], f.series); f.addElementsToCollection(this.points, f.nodes)
            }; e.prototype.addSeriesLayout = function () {
                var a = this.options.layoutAlgorithm, b = this.chart.graphLayoutsStorage, d = this.chart.graphLayoutsLookup, e = B(a, a.parentNodeOptions, { enableSimulation: this.layout.options.enableSimulation }); var f = b[a.type + "-series"]; f || (b[a.type + "-series"] = f = new c.layouts[a.type], f.init(e), d.splice(f.index, 0, f)); this.parentNodeLayout =
                f; this.createParentNodes()
            }; e.prototype.calculateParentRadius = function () { var a = this.seriesBox(); this.parentNodeRadius = b(Math.sqrt(2 * this.parentNodeMass / Math.PI) + 20, 20, a ? Math.max(Math.sqrt(Math.pow(a.width, 2) + Math.pow(a.height, 2)) / 2 + 20, 20) : Math.sqrt(2 * this.parentNodeMass / Math.PI) + 20); this.parentNode && (this.parentNode.marker.radius = this.parentNode.radius = this.parentNodeRadius) }; e.prototype.calculateZExtremes = function () {
                var a = this.options.zMin, b = this.options.zMax, c = Infinity, d = -Infinity; if (a && b) return [a,
                b]; this.chart.series.forEach(function (a) { a.yData.forEach(function (a) { k(a) && (a > d && (d = a), a < c && (c = a)) }) }); a = F(a, c); b = F(b, d); return [a, b]
            }; e.prototype.checkOverlap = function (a, b) { var c = a[0] - b[0], d = a[1] - b[1]; return -.001 > Math.sqrt(c * c + d * d) - Math.abs(a[2] + b[2]) }; e.prototype.createParentNodes = function () {
                var a = this, b = a.chart, c = a.parentNodeLayout, d, e = a.parentNode, f = a.pointClass; a.parentNodeMass = 0; a.points.forEach(function (b) { a.parentNodeMass += Math.PI * Math.pow(b.marker.radius, 2) }); a.calculateParentRadius(); c.nodes.forEach(function (b) {
                    b.seriesIndex ===
                    a.index && (d = !0)
                }); c.setArea(0, 0, b.plotWidth, b.plotHeight); d || (e || (e = (new f).init(this, { mass: a.parentNodeRadius / 2, marker: { radius: a.parentNodeRadius }, dataLabels: { inside: !1 }, dataLabelOnNull: !0, degree: a.parentNodeRadius, isParentNode: !0, seriesIndex: a.index })), a.parentNode && (e.plotX = a.parentNode.plotX, e.plotY = a.parentNode.plotY), a.parentNode = e, c.addElementsToCollection([a], c.series), c.addElementsToCollection([e], c.nodes))
            }; e.prototype.deferLayout = function () {
                var a = this.options.layoutAlgorithm; this.visible &&
                (this.addLayout(), a.splitSeries && this.addSeriesLayout())
            }; e.prototype.destroy = function () { this.chart.graphLayoutsLookup && this.chart.graphLayoutsLookup.forEach(function (a) { a.removeElementFromCollection(this, a.series) }, this); this.parentNode && this.parentNodeLayout && (this.parentNodeLayout.removeElementFromCollection(this.parentNode, this.parentNodeLayout.nodes), this.parentNode.dataLabel && (this.parentNode.dataLabel = this.parentNode.dataLabel.destroy())); r.prototype.destroy.apply(this, arguments) }; e.prototype.drawDataLabels =
            function () { var a = this.options.dataLabels.textPath, b = this.points; r.prototype.drawDataLabels.apply(this, arguments); this.parentNode && (this.parentNode.formatPrefix = "parentNode", this.points = [this.parentNode], this.options.dataLabels.textPath = this.options.dataLabels.parentNodeTextPath, r.prototype.drawDataLabels.apply(this, arguments), this.points = b, this.options.dataLabels.textPath = a) }; e.prototype.drawGraph = function () {
                if (this.layout && this.layout.options.splitSeries) {
                    var a = this.chart, b = this.layout.options.parentNodeOptions.marker;
                    b = { fill: b.fillColor || d(this.color).brighten(.4).get(), opacity: b.fillOpacity, stroke: b.lineColor || this.color, "stroke-width": b.lineWidth }; var c = this.visible ? "inherit" : "hidden"; this.parentNodesGroup || (this.parentNodesGroup = this.plotGroup("parentNodesGroup", "parentNode", c, .1, a.seriesGroup), this.group.attr({ zIndex: 2 })); this.calculateParentRadius(); c = B({ x: this.parentNode.plotX - this.parentNodeRadius, y: this.parentNode.plotY - this.parentNodeRadius, width: 2 * this.parentNodeRadius, height: 2 * this.parentNodeRadius },
                    b); this.parentNode.graphic || (this.graph = this.parentNode.graphic = a.renderer.symbol(b.symbol).add(this.parentNodesGroup)); this.parentNode.graphic.attr(c)
                }
            }; e.prototype.drawTracker = function () { var b = this.parentNode; a.prototype.drawTracker.call(this); if (b) { var c = w(b.dataLabels) ? b.dataLabels : b.dataLabel ? [b.dataLabel] : []; b.graphic && (b.graphic.element.point = b); c.forEach(function (a) { a.div ? a.div.point = b : a.element.point = b }) } }; e.prototype.getPointRadius = function () {
                var a = this, c = a.chart, d = a.options, e = d.useSimulation,
                f = Math.min(c.plotWidth, c.plotHeight), h = {}, k = [], l = c.allDataPoints, q, n, p, r;["minSize", "maxSize"].forEach(function (a) { var b = parseInt(d[a], 10), c = /%$/.test(d[a]); h[a] = c ? f * b / 100 : b * Math.sqrt(l.length) }); c.minRadius = q = h.minSize / Math.sqrt(l.length); c.maxRadius = n = h.maxSize / Math.sqrt(l.length); var t = e ? a.calculateZExtremes() : [q, n]; (l || []).forEach(function (c, d) { p = e ? b(c[2], t[0], t[1]) : c[2]; r = a.getRadius(t[0], t[1], q, n, p); 0 === r && (r = null); l[d][2] = r; k.push(r) }); a.radii = k
            }; e.prototype.init = function () {
                r.prototype.init.apply(this,
                arguments); this.eventsToUnbind.push(x(this, "updatedData", function () { this.chart.series.forEach(function (a) { a.type === this.type && (a.isDirty = !0) }, this) })); return this
            }; e.prototype.onMouseUp = function (a) {
                if (a.fixedPosition && !a.removed) {
                    var b, c, d = this.layout, g = this.parentNodeLayout; g && d.options.dragBetweenSeries && g.nodes.forEach(function (g) {
                        a && a.marker && g !== a.series.parentNode && (b = d.getDistXY(a, g), c = d.vectorLength(b) - g.marker.radius - a.marker.radius, 0 > c && (g.series.addPoint(B(a.options, { plotX: a.plotX, plotY: a.plotY }),
                        !1), d.removeElementFromCollection(a, d.nodes), a.remove()))
                    }); y.onMouseUp.apply(this, arguments)
                }
            }; e.prototype.placeBubbles = function (a) {
                var b = this.checkOverlap, c = this.positionBubble, d = [], g = 1, e = 0, f = 0; var h = []; var k; a = a.sort(function (a, b) { return b[2] - a[2] }); if (a.length) {
                    d.push([[0, 0, a[0][2], a[0][3], a[0][4]]]); if (1 < a.length) for (d.push([[0, 0 - a[1][2] - a[0][2], a[1][2], a[1][3], a[1][4]]]), k = 2; k < a.length; k++) a[k][2] = a[k][2] || 1, h = c(d[g][e], d[g - 1][f], a[k]), b(h, d[g][0]) ? (d.push([]), f = 0, d[g + 1].push(c(d[g][e], d[g][0],
                    a[k])), g++, e = 0) : 1 < g && d[g - 1][f + 1] && b(h, d[g - 1][f + 1]) ? (f++, d[g].push(c(d[g][e], d[g - 1][f], a[k])), e++) : (e++, d[g].push(h)); this.chart.stages = d; this.chart.rawPositions = [].concat.apply([], d); this.resizeRadius(); h = this.chart.rawPositions
                } return h
            }; e.prototype.positionBubble = function (a, b, c) {
                var d = Math.sqrt, g = Math.asin, e = Math.acos, f = Math.pow, h = Math.abs; d = d(f(a[0] - b[0], 2) + f(a[1] - b[1], 2)); e = e((f(d, 2) + f(c[2] + b[2], 2) - f(c[2] + a[2], 2)) / (2 * (c[2] + b[2]) * d)); g = g(h(a[0] - b[0]) / d); a = (0 > a[1] - b[1] ? 0 : Math.PI) + e + g * (0 > (a[0] - b[0]) *
                (a[1] - b[1]) ? 1 : -1); return [b[0] + (b[2] + c[2]) * Math.sin(a), b[1] - (b[2] + c[2]) * Math.cos(a), c[2], c[3], c[4]]
            }; e.prototype.render = function () { var a = []; r.prototype.render.apply(this, arguments); this.options.dataLabels.allowOverlap || (this.data.forEach(function (b) { w(b.dataLabels) && b.dataLabels.forEach(function (b) { a.push(b) }) }), this.options.useSimulation && this.chart.hideOverlappingLabels(a)) }; e.prototype.resizeRadius = function () {
                var a = this.chart, b = a.rawPositions, c = Math.min, d = Math.max, e = a.plotLeft, f = a.plotTop, h = a.plotHeight,
                k = a.plotWidth, l, q, n; var p = l = Number.POSITIVE_INFINITY; var r = q = Number.NEGATIVE_INFINITY; for (n = 0; n < b.length; n++) { var t = b[n][2]; p = c(p, b[n][0] - t); r = d(r, b[n][0] + t); l = c(l, b[n][1] - t); q = d(q, b[n][1] + t) } n = [r - p, q - l]; c = c.apply([], [(k - e) / n[0], (h - f) / n[1]]); if (1e-10 < Math.abs(c - 1)) { for (n = 0; n < b.length; n++) b[n][2] *= c; this.placeBubbles(b) } else a.diffY = h / 2 + f - l - (q - l) / 2, a.diffX = k / 2 + e - p - (r - p) / 2
            }; e.prototype.seriesBox = function () {
                var a = this.chart, b = Math.max, c = Math.min, d, e = [a.plotLeft, a.plotLeft + a.plotWidth, a.plotTop, a.plotTop +
                a.plotHeight]; this.data.forEach(function (a) { k(a.plotX) && k(a.plotY) && a.marker.radius && (d = a.marker.radius, e[0] = c(e[0], a.plotX - d), e[1] = b(e[1], a.plotX + d), e[2] = c(e[2], a.plotY - d), e[3] = b(e[3], a.plotY + d)) }); return z(e.width / e.height) ? e : null
            }; e.prototype.setVisible = function () {
                var a = this; r.prototype.setVisible.apply(a, arguments); a.parentNodeLayout && a.graph ? a.visible ? (a.graph.show(), a.parentNode.dataLabel && a.parentNode.dataLabel.show()) : (a.graph.hide(), a.parentNodeLayout.removeElementFromCollection(a.parentNode,
                a.parentNodeLayout.nodes), a.parentNode.dataLabel && a.parentNode.dataLabel.hide()) : a.layout && (a.visible ? a.layout.addElementsToCollection(a.points, a.layout.nodes) : a.points.forEach(function (b) { a.layout.removeElementFromCollection(b, a.layout.nodes) }))
            }; e.prototype.translate = function () {
                var a = this.chart, b = this.data, c = this.index, d, e = this.options.useSimulation; this.processedXData = this.xData; this.generatePoints(); k(a.allDataPoints) || (a.allDataPoints = this.accumulateAllPoints(this), this.getPointRadius()); if (e) var f =
                a.allDataPoints; else f = this.placeBubbles(a.allDataPoints), this.options.draggable = !1; for (d = 0; d < f.length; d++) if (f[d][3] === c) { var h = b[f[d][4]]; var q = f[d][2]; e || (h.plotX = f[d][0] - a.plotLeft + a.diffX, h.plotY = f[d][1] - a.plotTop + a.diffY); h.marker = l(h.marker, { radius: q, width: 2 * q, height: 2 * q }); h.radius = q } e && this.deferLayout(); t(this, "afterTranslate")
            }; e.defaultOptions = B(n.defaultOptions, {
                minSize: "10%", maxSize: "50%", sizeBy: "area", zoneAxis: "y", crisp: !1, tooltip: { pointFormat: "Value: {point.value}" }, draggable: !0, useSimulation: !0,
                parentNode: { allowPointSelect: !1 }, dataLabels: { formatter: function () { return this.point.value }, parentNodeFormatter: function () { return this.name }, parentNodeTextPath: { enabled: !0 }, padding: 0, style: { transition: "opacity 2000ms" } }, layoutAlgorithm: {
                    initialPositions: "circle", initialPositionRadius: 20, bubblePadding: 5, parentNodeLimit: !1, seriesInteraction: !0, dragBetweenSeries: !1, parentNodeOptions: {
                        maxIterations: 400, gravitationalConstant: .03, maxSpeed: 50, initialPositionRadius: 100, seriesInteraction: !0, marker: {
                            fillColor: null,
                            fillOpacity: 1, lineWidth: 1, lineColor: null, symbol: "circle"
                        }
                    }, enableSimulation: !0, type: "packedbubble", integration: "packedbubble", maxIterations: 1E3, splitSeries: !1, maxSpeed: 5, gravitationalConstant: .01, friction: -.981
                }
            }); return e
        }(n); l(e.prototype, {
            alignDataLabel: r.prototype.alignDataLabel, axisTypes: [], directTouch: !0, forces: ["barycenter", "repulsive"], hasDraggableNodes: !0, isCartesian: !1, noSharedTooltip: !0, onMouseDown: y.onMouseDown, onMouseMove: y.onMouseMove, pointArrayMap: ["value"], pointClass: h, pointValKey: "value",
            redrawHalo: y.redrawHalo, requireSorting: !1, searchPoint: c.noop, trackerGroups: ["group", "dataLabelsGroup", "parentNodesGroup"]
        }); f.registerSeriesType("packedbubble", e); ""; ""; return e
    }); z(e, "Extensions/Polar.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Chart/Chart.js"], e["Core/Globals.js"], e["Extensions/Pane.js"], e["Core/Pointer.js"], e["Core/Series/Series.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Renderer/SVG/SVGRenderer.js"], e["Core/Utilities.js"]], function (e, c, h, f, a, u, d, r, n) {
        var x = e.animObject;
        d = d.seriesTypes; var b = n.addEvent, k = n.defined, l = n.find, t = n.isNumber, w = n.pick, z = n.splat, B = n.uniqueKey; e = n.wrap; var F = u.prototype; a = a.prototype; F.searchPointByAngle = function (a) { var b = this.chart, c = this.xAxis.pane.center; return this.searchKDTree({ clientX: 180 + -180 / Math.PI * Math.atan2(a.chartX - c[0] - b.plotLeft, a.chartY - c[1] - b.plotTop) }) }; F.getConnectors = function (a, b, c, d) {
            var e = d ? 1 : 0; var g = 0 <= b && b <= a.length - 1 ? b : 0 > b ? a.length - 1 + b : 0; b = 0 > g - 1 ? a.length - (1 + e) : g - 1; e = g + 1 > a.length - 1 ? e : g + 1; var f = a[b]; e = a[e]; var h = f.plotX;
            f = f.plotY; var k = e.plotX; var l = e.plotY; e = a[g].plotX; g = a[g].plotY; h = (1.5 * e + h) / 2.5; f = (1.5 * g + f) / 2.5; k = (1.5 * e + k) / 2.5; var q = (1.5 * g + l) / 2.5; l = Math.sqrt(Math.pow(h - e, 2) + Math.pow(f - g, 2)); var v = Math.sqrt(Math.pow(k - e, 2) + Math.pow(q - g, 2)); h = Math.atan2(f - g, h - e); q = Math.PI / 2 + (h + Math.atan2(q - g, k - e)) / 2; Math.abs(h - q) > Math.PI / 2 && (q -= Math.PI); h = e + Math.cos(q) * l; f = g + Math.sin(q) * l; k = e + Math.cos(Math.PI + q) * v; q = g + Math.sin(Math.PI + q) * v; e = { rightContX: k, rightContY: q, leftContX: h, leftContY: f, plotX: e, plotY: g }; c && (e.prevPointCont =
            this.getConnectors(a, b, !1, d)); return e
        }; F.toXY = function (a) {
            var b = this.chart, c = this.xAxis; var d = this.yAxis; var e = a.plotX, f = a.plotY, h = a.series, k = b.inverted, l = a.y, q = k ? e : d.len - f; k && h && !h.isRadialBar && (a.plotY = f = "number" === typeof l ? d.translate(l) || 0 : 0); a.rectPlotX = e; a.rectPlotY = f; d.center && (q += d.center[3] / 2); d = k ? d.postTranslate(f, q) : c.postTranslate(e, q); a.plotX = a.polarPlotX = d.x - b.plotLeft; a.plotY = a.polarPlotY = d.y - b.plotTop; this.kdByAngle ? (b = (e / Math.PI * 180 + c.pane.options.startAngle) % 360, 0 > b && (b += 360), a.clientX =
            b) : a.clientX = a.plotX
        }; d.spline && (e(d.spline.prototype, "getPointSpline", function (a, b, c, d) { this.chart.polar ? d ? (a = this.getConnectors(b, d, !0, this.connectEnds), a = ["C", a.prevPointCont.rightContX, a.prevPointCont.rightContY, a.leftContX, a.leftContY, a.plotX, a.plotY]) : a = ["M", c.plotX, c.plotY] : a = a.call(this, b, c, d); return a }), d.areasplinerange && (d.areasplinerange.prototype.getPointSpline = d.spline.prototype.getPointSpline)); b(u, "afterTranslate", function () {
            var a = this.chart; if (a.polar && this.xAxis) {
                (this.kdByAngle =
                a.tooltip && a.tooltip.shared) ? this.searchPoint = this.searchPointByAngle : this.options.findNearestPointBy = "xy"; if (!this.preventPostTranslate) for (var c = this.points, d = c.length; d--;) this.toXY(c[d]), !a.hasParallelCoordinates && !this.yAxis.reversed && c[d].y < this.yAxis.min && (c[d].isNull = !0); this.hasClipCircleSetter || (this.hasClipCircleSetter = !!this.eventsToUnbind.push(b(this, "afterRender", function () {
                    if (a.polar) {
                        var b = this.yAxis.pane.center; this.clipCircle ? this.clipCircle.animate({
                            x: b[0], y: b[1], r: b[2] / 2, innerR: b[3] /
                            2
                        }) : this.clipCircle = a.renderer.clipCircle(b[0], b[1], b[2] / 2, b[3] / 2); this.group.clip(this.clipCircle); this.setClip = h.noop
                    }
                })))
            }
        }, { order: 2 }); e(d.line.prototype, "getGraphPath", function (a, b) {
            var c = this, d; if (this.chart.polar) { b = b || this.points; for (d = 0; d < b.length; d++) if (!b[d].isNull) { var e = d; break } if (!1 !== this.options.connectEnds && "undefined" !== typeof e) { this.connectEnds = !0; b.splice(b.length, 0, b[e]); var g = !0 } b.forEach(function (a) { "undefined" === typeof a.polarPlotY && c.toXY(a) }) } d = a.apply(this, [].slice.call(arguments,
            1)); g && b.pop(); return d
        }); var y = function (a, b) {
            var c = this, d = this.chart, e = this.options.animation, g = this.group, f = this.markerGroup, k = this.xAxis.center, l = d.plotLeft, q = d.plotTop, n, p, r, t; if (d.polar) if (c.isRadialBar) b || (c.startAngleRad = w(c.translatedThreshold, c.xAxis.startAngleRad), h.seriesTypes.pie.prototype.animate.call(c, b)); else {
                if (d.renderer.isSVG) if (e = x(e), c.is("column")) {
                    if (!b) {
                        var u = k[3] / 2; c.points.forEach(function (a) {
                            n = a.graphic; r = (p = a.shapeArgs) && p.r; t = p && p.innerR; n && p && (n.attr({ r: u, innerR: u }),
                            n.animate({ r: r, innerR: t }, c.options.animation))
                        })
                    }
                } else b ? (a = { translateX: k[0] + l, translateY: k[1] + q, scaleX: .001, scaleY: .001 }, g.attr(a), f && f.attr(a)) : (a = { translateX: l, translateY: q, scaleX: 1, scaleY: 1 }, g.animate(a, e), f && f.animate(a, e))
            } else a.call(this, b)
        }; e(F, "animate", y); if (d.column) {
            var p = d.arearange.prototype; d = d.column.prototype; d.polarArc = function (a, b, c, d) {
                var e = this.xAxis.center, g = this.yAxis.len, f = e[3] / 2; b = g - b + f; a = g - w(a, g) + f; this.yAxis.reversed && (0 > b && (b = f), 0 > a && (a = f)); return {
                    x: e[0], y: e[1], r: b, innerR: a,
                    start: c, end: d
                }
            }; e(d, "animate", y); e(d, "translate", function (a) {
                var b = this.options, c = b.stacking, d = this.chart, e = this.xAxis, f = this.yAxis, h = f.reversed, l = f.center, q = e.startAngleRad, p = e.endAngleRad - q; this.preventPostTranslate = !0; a.call(this); if (e.isRadial) {
                    a = this.points; e = a.length; var r = f.translate(f.min); var u = f.translate(f.max); b = b.threshold || 0; if (d.inverted && t(b)) { var w = f.translate(b); k(w) && (0 > w ? w = 0 : w > p && (w = p), this.translatedThreshold = w + q) } for (; e--;) {
                        b = a[e]; var x = b.barX; var y = b.x; var z = b.y; b.shapeType =
                        "arc"; if (d.inverted) {
                            b.plotY = f.translate(z); if (c && f.stacking) { if (z = f.stacking.stacks[(0 > z ? "-" : "") + this.stackKey], this.visible && z && z[y] && !b.isNull) { var B = z[y].points[this.getStackIndicator(void 0, y, this.index).key]; var E = f.translate(B[0]); B = f.translate(B[1]); k(E) && (E = n.clamp(E, 0, p)) } } else E = w, B = b.plotY; E > B && (B = [E, E = B][0]); if (!h) if (E < r) E = r; else if (B > u) B = u; else { if (B < r || E > u) E = B = 0 } else if (B > r) B = r; else if (E < u) E = u; else if (E > r || B < u) E = B = p; f.min > f.max && (E = B = h ? p : 0); E += q; B += q; l && (b.barX = x += l[3] / 2); y = Math.max(x,
                            0); z = Math.max(x + b.pointWidth, 0); b.shapeArgs = { x: l && l[0], y: l && l[1], r: z, innerR: y, start: E, end: B }; b.opacity = E === B ? 0 : void 0; b.plotY = (k(this.translatedThreshold) && (E < this.translatedThreshold ? E : B)) - q
                        } else E = x + q, b.shapeArgs = this.polarArc(b.yBottom, b.plotY, E, E + b.pointWidth); this.toXY(b); d.inverted ? (x = f.postTranslate(b.rectPlotY, x + b.pointWidth / 2), b.tooltipPos = [x.x - d.plotLeft, x.y - d.plotTop]) : b.tooltipPos = [b.plotX, b.plotY]; l && (b.ttBelow = b.plotY > l[1])
                    }
                }
            }); d.findAlignments = function (a, b) {
                null === b.align && (b.align =
                20 < a && 160 > a ? "left" : 200 < a && 340 > a ? "right" : "center"); null === b.verticalAlign && (b.verticalAlign = 45 > a || 315 < a ? "bottom" : 135 < a && 225 > a ? "top" : "middle"); return b
            }; p && (p.findAlignments = d.findAlignments); e(d, "alignDataLabel", function (a, b, c, d, e, f) {
                var g = this.chart, h = w(d.inside, !!this.options.stacking); g.polar ? (a = b.rectPlotX / Math.PI * 180, g.inverted ? (this.forceDL = g.isInsidePlot(b.plotX, Math.round(b.plotY), !1), h && b.shapeArgs ? (e = b.shapeArgs, e = this.yAxis.postTranslate((e.start + e.end) / 2 - this.xAxis.startAngleRad, b.barX +
                b.pointWidth / 2), e = { x: e.x - g.plotLeft, y: e.y - g.plotTop }) : b.tooltipPos && (e = { x: b.tooltipPos[0], y: b.tooltipPos[1] }), d.align = w(d.align, "center"), d.verticalAlign = w(d.verticalAlign, "middle")) : this.findAlignments && (d = this.findAlignments(a, d)), F.alignDataLabel.call(this, b, c, d, e, f), this.isRadialBar && b.shapeArgs && b.shapeArgs.start === b.shapeArgs.end && c.hide(!0)) : a.call(this, b, c, d, e, f)
            })
        } e(a, "getCoordinates", function (a, b) {
            var c = this.chart, d = { xAxis: [], yAxis: [] }; c.polar ? c.axes.forEach(function (a) {
                var e = a.isXAxis,
                f = a.center; if ("colorAxis" !== a.coll) { var g = b.chartX - f[0] - c.plotLeft; f = b.chartY - f[1] - c.plotTop; d[e ? "xAxis" : "yAxis"].push({ axis: a, value: a.translate(e ? Math.PI - Math.atan2(g, f) : Math.sqrt(Math.pow(g, 2) + Math.pow(f, 2)), !0) }) }
            }) : d = a.call(this, b); return d
        }); r.prototype.clipCircle = function (a, b, c, d) { var e = B(), f = this.createElement("clipPath").attr({ id: e }).add(this.defs); a = d ? this.arc(a, b, c, d, 0, 2 * Math.PI).add(f) : this.circle(a, b, c).add(f); a.id = e; a.clipPath = f; return a }; b(c, "getAxes", function () {
            this.pane || (this.pane =
            []); z(this.options.pane).forEach(function (a) { new f(a, this) }, this)
        }); b(c, "afterDrawChartBox", function () { this.pane.forEach(function (a) { a.render() }) }); b(u, "afterInit", function () { var a = this.chart; a.inverted && a.polar && (this.isRadialSeries = !0, this.is("column") && (this.isRadialBar = !0)) }); e(c.prototype, "get", function (a, b) { return l(this.pane || [], function (a) { return a.options.id === b }) || a.call(this, b) })
    }); z(e, "masters/RBG_charts-more.src.js", [], function () { })
});
//# sourceMappingURL=RBG_charts-more.js.map