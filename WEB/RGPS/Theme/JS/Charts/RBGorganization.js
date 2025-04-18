/*
 RBGcharts JS v8.2.2 (2020-10-22)
 RBGORGchart chart series type

 (c) 2019-2019 Torstein Honsi

 License: www.RBG_charts.com/license
*/
(function (b) {
    "object" === typeof module && module.exports
        ? ((b["default"] = b), (module.exports = b))
        : "function" === typeof define && define.amd
        ? define("RBG_charts/modules/RBGOrgchart", ["RBG_charts", "RBG_charts/modules/sankey"], function (f) {
            b(f);
            b.RBGcharts = f;
            return b;
        })
        : b("undefined" !== typeof RBGcharts ? RBGcharts : void 0);
})(function (b) {
    function f(b, f, n, r) {
        b.hasOwnProperty(f) || (b[f] = r.apply(null, n));
    }
    b = b ? b._modules : {};
    f(b, "Series/RBGORGchartSeries.js", [b["Core/Series/Series.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, f, n) {
        var r = n.css,
            u = n.pick,
            v = n.wrap,
            t = b.seriesTypes.sankey.prototype;
        ("");
        b.seriesType(
            "RBGOrgchart",
            "sankey",
            {
                borderColor: "#666666",
                borderRadius: 3,
                linkRadius: 10,
                borderWidth: 1,
                dataLabels: {
                    nodeFormatter: function () {
                        function a(a) {
                            return (
                                Object.keys(a).reduce(function (c, d) {
                                    return c + d + ":" + a[d] + ";";
                                }, 'style="') + '"'
                            );
                        }
                        var c = { width: "100%", height: "100%", display: "flex", "flex-direction": "row", "align-items": "center", "justify-content": "center" },
                            g = { "max-height": "100%", "border-radius": "50%" },
                            d = { width: "100%", padding: 0, "text-align": "center", "white-space": "normal" },
                            m = { margin: 0 },
                            e = { margin: 0 },
                            b = { opacity: 0.75, margin: "5px" };
                        if (this.point.only) {
                            this.point.image && ((g["max-width"] = "100%"), (d.width = "0%"));
                            this.series.chart.renderer.forExport && ((c.display = "block"), (d.display = "none"));
                        } else {
                            this.point.image && ((g["max-width"] = "30%"), (d.width = "70%"));
                            this.series.chart.renderer.forExport && ((c.display = "block"), (d.position = "absolute"), (d.left = this.point.image ? "30%" : 0), (d.top = 0));
                        }
                       
                       
                        c = "<div " + a(c) + ">";
                        this.point.image && (c += '<img src="' + this.point.image + '" ' + a(g) + ">");
                        c += "<div " + a(d) + ">";
                        if (!this.point.only) {
                            this.point.name && (c += "<h4 " + a(m) + ">" + this.point.name + "</h4>");
                            this.point.title && (c += "<p " + a(e) + ">" + (this.point.title || "") + "</p>");
                            this.point.description && (c += "<p " + a(b) + ">" + this.point.description + "</p>");
                            
                        }
                        return c + "</div></div>";
                    },
                    style: { fontWeight: "normal", fontSize: "13px" },
                    useHTML: !0,
                },
                hangingIndent: 20,
                linkColor: "#666666",
                linkLineWidth: 1,
                nodeWidth: 50,
                tooltip: { nodeFormat: "{point.name}<br>{point.title}<br>{point.description}" },
            },
            {
                pointAttribs: function (a, c) {
                    var g = this,
                        d = t.pointAttribs.call(g, a, c),
                        m = g.mapOptionsToLevel[(a.isNode ? a.level : a.fromNode.level) || 0] || {},
                        e = a.options,
                        b = (m.states && m.states[c]) || {};
                    c = ["borderRadius", "linkColor", "linkLineWidth"].reduce(function (a, c) {
                        a[c] = u(b[c], e[c], m[c], g.options[c]);
                        return a;
                    }, {});
                    a.isNode ? c.borderRadius && (d.r = c.borderRadius) : ((d.stroke = c.linkColor), (d["stroke-width"] = c.linkLineWidth), delete d.fill);
                    return d;
                },
                createNode: function (a) {
                    a = t.createNode.call(this, a);
                    a.getSum = function () {
                        return 1;
                    };
                    return a;
                },
                createNodeColumn: function () {
                    var a = t.createNodeColumn.call(this);
                    v(a, "offset", function (a, g, d) {
                        a = a.call(this, g, d);
                        return g.hangsFrom ? { absoluteTop: g.hangsFrom.nodeY } : a;
                    });
                    return a;
                },
                translateNode: function (a, c) {
                    t.translateNode.call(this, a, c);
                    a.hangsFrom && ((a.shapeArgs.height -= this.options.hangingIndent), this.chart.inverted || (a.shapeArgs.y += this.options.hangingIndent));
                    a.nodeHeight = this.chart.inverted ? a.shapeArgs.width : a.shapeArgs.height;
                },
                curvedPath: function (a, c) {
                    for (var g = [], d = 0; d < a.length; d++) {
                        var b = a[d][1],
                            e = a[d][2];
                        if ("number" === typeof b && "number" === typeof e)
                            if (0 === d) g.push(["M", b, e]);
                            else if (d === a.length - 1) g.push(["L", b, e]);
                            else if (c) {
                                var h = a[d - 1],
                                    k = a[d + 1];
                                if (h && k) {
                                    var f = h[1];
                                    h = h[2];
                                    var l = k[1];
                                    k = k[2];
                                    if ("number" === typeof f && "number" === typeof l && "number" === typeof h && "number" === typeof k && f !== l && h !== k) {
                                        var p = f < l ? 1 : -1,
                                            q = h < k ? 1 : -1;
                                        g.push(["L", b - p * Math.min(Math.abs(b - f), c), e - q * Math.min(Math.abs(e - h), c)], ["C", b, e, b, e, b + p * Math.min(Math.abs(b - l), c), e + q * Math.min(Math.abs(e - k), c)]);
                                    }
                                }
                            } else g.push(["L", b, e]);
                    }
                    return g;
                },
                translateLink: function (a) {
                    var c = a.fromNode,
                        b = a.toNode,
                        d = (Math.round(this.options.linkLineWidth) % 2) / 2,
                        f = Math.floor(c.shapeArgs.x + c.shapeArgs.width) + d,
                        e = Math.floor(c.shapeArgs.y + c.shapeArgs.height / 2) + d,
                        h = Math.floor(b.shapeArgs.x) + d,
                        k = Math.floor(b.shapeArgs.y + b.shapeArgs.height / 2) + d,
                        n = this.options.hangingIndent;
                    var l = b.options.offset;
                    var p = /%$/.test(l) && parseInt(l, 10),
                        q = this.chart.inverted;
                    q && ((f -= c.shapeArgs.width), (h += b.shapeArgs.width));
                    l = Math.floor(h + ((q ? 1 : -1) * (this.colDistance - this.nodeWidth)) / 2) + d;
                    p && (50 <= p || -50 >= p) && ((l = h = Math.floor(h + (q ? -0.5 : 0.5) * b.shapeArgs.width) + d), (k = b.shapeArgs.y), 0 < p && (k += b.shapeArgs.height));
                    b.hangsFrom === c &&
                        (this.chart.inverted ? ((e = Math.floor(c.shapeArgs.y + c.shapeArgs.height - n / 2) + d), (k = b.shapeArgs.y + b.shapeArgs.height)) : (e = Math.floor(c.shapeArgs.y + n / 2) + d),
                        (l = h = Math.floor(b.shapeArgs.x + b.shapeArgs.width / 2) + d));
                    a.plotY = 1;
                    a.shapeType = "path";
                    a.shapeArgs = {
                        d: this.curvedPath(
                            [
                                ["M", f, e],
                                ["L", l, e],
                                ["L", l, k],
                                ["L", h, k],
                            ],
                            this.options.linkRadius
                        ),
                    };
                },
                alignDataLabel: function (a, b, g) {
                    if (g.useHTML) {
                        var c = a.shapeArgs.width,
                            m = a.shapeArgs.height,
                            e = this.options.borderWidth + 2 * this.options.dataLabels.padding;
                        this.chart.inverted && ((c = m), (m = a.shapeArgs.width));
                        m -= e;
                        c -= e;
                        if ((e = b.text)) r(e.element.parentNode, { width: c + "px", height: m + "px" }), r(e.element, { left: 0, top: 0, width: "100%", height: "100%", overflow: "hidden" });
                        b.getBBox = function () {
                            return { width: c, height: m };
                        };
                        b.width = c;
                        b.height = m;
                    }
                    f.seriesTypes.column.prototype.alignDataLabel.apply(this, arguments);
                },
            }
        );
        ("");
    });
    f(b, "masters/modules/RBGOrgchart.src.js", [], function () { });
});
//# sourceMappingURL=RBGOrgchart.js.map
