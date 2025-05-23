/*
 RBGcharts Javascript v2.3.14 (2021-Jan-01)

 Pareto series type for RBGcharts

 License: allowed to Tata Motors - all Operations
*/
(function (a) {
    "object" === typeof module && module.exports
        ? ((a["default"] = a), (module.exports = a))
        : "function" === typeof define && define.amd
        ? define("RBG_charts/modules/pareto", ["RBG_charts"], function (b) {
            a(b);
            a.RBGcharts = b;
            return a;
        })
        : a("undefined" !== typeof RBGcharts ? RBGcharts : void 0);
})(function (a) {
    function b(a, e, c, b) {
        a.hasOwnProperty(e) || (a[e] = b.apply(null, c));
    }
    a = a ? a._modules : {};
    b(a, "Mixins/DerivedSeries.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, b) {
        var c = b.addEvent,
            e = b.defined,
            d = a.Series;
        return {
            hasDerivedData: !0,
            init: function () {
                d.prototype.init.apply(this, arguments);
                this.initialised = !1;
                this.baseSeries = null;
                this.eventRemovers = [];
                this.addEvents();
            },
            setDerivedData: a.noop,
            setBaseSeries: function () {
                var a = this.chart,
                    b = this.options.baseSeries;
                this.baseSeries = (e(b) && (a.series[b] || a.get(b))) || null;
            },
            addEvents: function () {
                var a = this;
                var b = c(this.chart, "afterLinkSeries", function () {
                    a.setBaseSeries();
                    a.baseSeries && !a.initialised && (a.setDerivedData(), a.addBaseSeriesEvents(), (a.initialised = !0));
                });
                this.eventRemovers.push(b);
            },
            addBaseSeriesEvents: function () {
                var a = this;
                var b = c(a.baseSeries, "updatedData", function () {
                    a.setDerivedData();
                });
                var d = c(a.baseSeries, "destroy", function () {
                    a.baseSeries = null;
                    a.initialised = !1;
                });
                a.eventRemovers.push(b, d);
            },
            destroy: function () {
                this.eventRemovers.forEach(function (a) {
                    a();
                });
                d.prototype.destroy.apply(this, arguments);
            },
        };
    });
    b(a, "Series/ParetoSeries.js", [a["Core/Series/Series.js"], a["Mixins/DerivedSeries.js"], a["Core/Utilities.js"]], function (a, b, c) {
        var e = c.correctFloat;
        c = c.merge;
        a.seriesType(
            "pareto",
            "line",
            { zIndex: 3 },
            c(b, {
                setDerivedData: function () {
                    var a = this.baseSeries.xData,
                        b = this.baseSeries.yData,
                        c = this.sumPointsPercents(b, a, null, !0);
                    this.setData(this.sumPointsPercents(b, a, c, !1), !1);
                },
                sumPointsPercents: function (a, b, c, g) {
                    var d = 0,
                        h = 0,
                        k = [],
                        f;
                    a.forEach(function (a, l) {
                        null !== a && (g ? (d += a) : ((f = (a / c) * 100), k.push([b[l], e(h + f)]), (h += f)));
                    });
                    return g ? d : k;
                },
            })
        );
        ("");
    });
    b(a, "masters/modules/pareto.src.js", [], function () { });
});
//# sourceMappingURL=pareto.js.map
