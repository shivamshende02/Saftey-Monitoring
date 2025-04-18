/*
 RBGcharts JS v8.2.2 (2020-10-22)

 Solid angular gauge module

 (c) 2010-2019 Torstein Honsi

 License: www.rbg_charts.com/license
*/
(function (a) {
    "object" === typeof module && module.exports
        ? ((a["default"] = a), (module.exports = a))
        : "function" === typeof define && define.amd
        ? define("rbg_charts/modules/solid-gauge", ["rbg_charts", "rbg_charts/rbg_charts-more"], function (c) {
            a(c);
            a.RBGcharts = c;
            return a;
        })
        : a("undefined" !== typeof RBGcharts ? RBGcharts : void 0);
})(function (a) {
    function c(a, r, c, t) {
        a.hasOwnProperty(r) || (a[r] = t.apply(null, c));
    }
    a = a ? a._modules : {};
    c(a, "Series/SolidGaugeSeries.js", [a["Core/Series/Series.js"], a["Core/Color/Color.js"], a["Core/Globals.js"], a["Mixins/LegendSymbol.js"], a["Core/Utilities.js"]], function (a, c, m, t, k) {
        var u = c.parse,
            r = k.clamp,
            w = k.extend,
            x = k.isNumber,
            A = k.merge,
            v = k.pick,
            y = k.pInt;
        c = k.wrap;
        c(m.Renderer.prototype.symbols, "arc", function (e, a, l, b, B, d) {
            e = e(a, l, b, B, d);
            d.rounded && ((b = ((d.r || b) - (d.innerR || 0)) / 2), (a = e[0]), (d = e[2]), "M" === a[0] && "L" === d[0] && ((a = ["A", b, b, 0, 1, 1, a[1], a[2]]), (e[2] = ["A", b, b, 0, 1, 1, d[1], d[2]]), (e[4] = a)));
            return e;
        });
        var h;
        (function (a) {
            var e = {
                initDataClasses: function (a) {
                    var e = this.chart,
                        l,
                        d = 0,
                        g = this.options;
                    this.dataClasses = l = [];
                    a.dataClasses.forEach(function (b, f) {
                        b = A(b);
                        l.push(b);
                        b.color || ("category" === g.dataClassColor ? ((f = e.options.colors), (b.color = f[d++]), d === f.length && (d = 0)) : (b.color = u(g.minColor).tweenTo(u(g.maxColor), f / (a.dataClasses.length - 1))));
                    });
                },
                initStops: function (a) {
                    this.stops = a.stops || [
                        [0, this.options.minColor],
                        [1, this.options.maxColor],
                    ];
                    this.stops.forEach(function (a) {
                        a.color = u(a[1]);
                    });
                },
                toColor: function (a, e) {
                    var b = this.stops,
                        d = this.dataClasses,
                        g;
                    if (d)
                        for (g = d.length; g--;) {
                            var c = d[g];
                            var f = c.from;
                            b = c.to;
                            if (("undefined" === typeof f || a >= f) && ("undefined" === typeof b || a <= b)) {
                                var z = c.color;
                                e && (e.dataClass = g);
                                break;
                            }
                        }
                    else {
                        this.logarithmic && (a = this.val2lin(a));
                        a = 1 - (this.max - a) / (this.max - this.min);
                        for (g = b.length; g-- && !(a > b[g][0]) ;);
                        f = b[g] || b[g + 1];
                        b = b[g + 1] || f;
                        a = 1 - (b[0] - a) / (b[0] - f[0] || 1);
                        z = f.color.tweenTo(b.color, a);
                    }
                    return z;
                },
            };
            a.init = function (a) {
                w(a, e);
            };
        })(h || (h = {}));
        a.seriesType(
            "solidgauge",
            "gauge",
            { colorByPoint: !0, dataLabels: { y: 0 } },
            {
                drawLegendSymbol: t.drawRectangle,
                translate: function () {
                    var a = this.yAxis;
                    h.init(a);
                    !a.dataClasses && a.options.dataClasses && a.initDataClasses(a.options);
                    a.initStops(a.options);
                    m.seriesTypes.gauge.prototype.translate.call(this);
                },
                drawPoints: function () {
                    var a = this,
                        c = a.yAxis,
                        l = c.center,
                        b = a.options,
                        k = a.chart.renderer,
                        d = b.overshoot,
                        g = x(d) ? (d / 180) * Math.PI : 0,
                        h;
                    x(b.threshold) && (h = c.startAngleRad + c.translate(b.threshold, null, null, null, !0));
                    this.thresholdAngleRad = v(h, c.startAngleRad);
                    a.points.forEach(function (f) {
                        if (!f.isNull) {
                            var d = f.graphic,
                                e = c.startAngleRad + c.translate(f.y, null, null, null, !0),
                                h = (y(v(f.options.radius, b.radius, 100)) * l[2]) / 200,
                                n = (y(v(f.options.innerRadius, b.innerRadius, 60)) * l[2]) / 200,
                                p = c.toColor(f.y, f),
                                q = Math.min(c.startAngleRad, c.endAngleRad),
                                m = Math.max(c.startAngleRad, c.endAngleRad);
                            "none" === p && (p = f.color || a.color || "none");
                            "none" !== p && (f.color = p);
                            e = r(e, q - g, m + g);
                            !1 === b.wrap && (e = r(e, q, m));
                            q = Math.min(e, a.thresholdAngleRad);
                            e = Math.max(e, a.thresholdAngleRad);
                            e - q > 2 * Math.PI && (e = q + 2 * Math.PI);
                            f.shapeArgs = n = { x: l[0], y: l[1], r: h, innerR: n, start: q, end: e, rounded: b.rounded };
                            f.startR = h;
                            d ? ((h = n.d), d.animate(w({ fill: p }, n)), h && (n.d = h)) : (f.graphic = d = k.arc(n).attr({ fill: p, "sweep-flag": 0 }).add(a.group));
                            a.chart.styledMode || ("square" !== b.linecap && d.attr({ "stroke-linecap": "round", "stroke-linejoin": "round" }), d.attr({ stroke: b.borderColor || "none", "stroke-width": b.borderWidth || 0 }));
                            d && d.addClass(f.getClassName(), !0);
                        }
                    });
                },
                animate: function (a) {
                    a || ((this.startAngleRad = this.thresholdAngleRad), m.seriesTypes.pie.prototype.animate.call(this, a));
                },
            }
        );
        ("");
        return h;
    });
    c(a, "masters/modules/solid-gauge.src.js", [], function () { });
});
//# sourceMappingURL=solid-gauge.js.map
