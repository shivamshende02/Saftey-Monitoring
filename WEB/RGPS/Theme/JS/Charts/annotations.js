﻿/*
 RBGcharts JS v11.1.0 (2023-06-05)

 Annotations module

 (c) 2009-2021 Torstein Honsi

 License: www.RBGcharts.com/license
*/
"use strict";
(function (b) {
    "object" === typeof module && module.exports
        ? ((b["default"] = b), (module.exports = b))
        : "function" === typeof define && define.amd
        ? define("RBGcharts/modules/annotations", ["RBGcharts"], function (r) {
            b(r);
            b.RBGcharts = r;
            return b;
        })
        : b("undefined" !== typeof RBGcharts ? RBGcharts : void 0);
})(function (b) {
    function r(b, n, h, g) {
        b.hasOwnProperty(n) || ((b[n] = g.apply(null, h)), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("RBGchartsModuleLoaded", { detail: { path: n, module: b[n] } })));
    }
    b = b ? b._modules : {};
    r(b, "Extensions/Annotations/AnnotationChart.js", [b["Core/Utilities.js"]], function (b) {
        function n(a, c) {
            a = this.initAnnotation(a);
            this.options.annotations.push(a.options);
            f(c, !0) && (a.redraw(), a.graphic.attr({ opacity: 1 }));
            return a;
        }
        function h() {
            const a = this;
            a.plotBoxClip = this.renderer.clipRect(this.plotBox);
            a.controlPointsGroup = a.renderer.g("control-points").attr({ zIndex: 99 }).clip(a.plotBoxClip).add();
            a.options.annotations.forEach((c, d) => {
                if (!a.annotations.some((a) => a.options === c)) {
                    const f = a.initAnnotation(c);
                    a.options.annotations[d] = f.options;
                }
            });
            a.drawAnnotations();
            c(a, "redraw", a.drawAnnotations);
            c(a, "destroy", function () {
                a.plotBoxClip.destroy();
                a.controlPointsGroup.destroy();
            });
            c(a, "exportData", function (c) {
                const d = ((this.options.exporting && this.options.exporting.csv) || {}).columnHeaderFormatter,
                    f = !c.dataRows[1].xValues,
                    m = a.options.lang && a.options.lang.exportData && a.options.lang.exportData.annotationHeader,
                    b = function (a) {
                        let c;
                        if (d && ((c = d(a)), !1 !== c)) return c;
                        c = m + " " + a;
                        return f ? { columnTitle: c, topLevelColumnTitle: c } : c;
                    },
                    q = c.dataRows[0].length,
                    u = a.options.exporting && a.options.exporting.csv && a.options.exporting.csv.annotations && a.options.exporting.csv.annotations.itemDelimiter,
                    e = a.options.exporting && a.options.exporting.csv && a.options.exporting.csv.annotations && a.options.exporting.csv.annotations.join;
                a.annotations.forEach((a) => {
                    a.options.labelOptions &&
                        a.options.labelOptions.includeInDataExport &&
                        a.labels.forEach((a) => {
                            if (a.options.text) {
                                const d = a.options.text;
                                a.points.forEach((a) => {
                                    const k = a.x,
                                        f = a.series.xAxis ? a.series.xAxis.index : -1;
                                    let m = !1;
                                    if (-1 === f) {
                                        a = c.dataRows[0].length;
                                        var l = Array(a);
                                        for (var w = 0; w < a; ++w) l[w] = "";
                                        l.push(d);
                                        l.xValues = [];
                                        l.xValues[f] = k;
                                        c.dataRows.push(l);
                                        m = !0;
                                    }
                                    m ||
                                        c.dataRows.forEach((a) => {
                                            !m && a.xValues && void 0 !== f && k === a.xValues[f] && (e && a.length > q ? (a[a.length - 1] += u + d) : a.push(d), (m = !0));
                                        });
                                    if (!m) {
                                        a = c.dataRows[0].length;
                                        l = Array(a);
                                        for (w = 0; w < a; ++w) l[w] = "";
                                        l[0] = k;
                                        l.push(d);
                                        l.xValues = [];
                                        void 0 !== f && (l.xValues[f] = k);
                                        c.dataRows.push(l);
                                    }
                                });
                            }
                        });
                });
                let v = 0;
                c.dataRows.forEach((a) => {
                    v = Math.max(v, a.length);
                });
                const D = v - c.dataRows[0].length;
                for (let a = 0; a < D; a++) {
                    const d = b(a + 1);
                    f ? (c.dataRows[0].push(d.topLevelColumnTitle), c.dataRows[1].push(d.columnTitle)) : c.dataRows[0].push(d);
                }
            });
        }
        function g() {
            this.plotBoxClip.attr(this.plotBox);
            this.annotations.forEach((a) => {
                a.redraw();
                a.graphic.animate({ opacity: 1 }, a.animationConfig);
            });
        }
        function e(a) {
            const c = this.annotations,
                d =
                    "annotations" === a.coll
                        ? a
                        : p(c, function (c) {
                            return c.options.id === a;
                        });
            d && (q(d, "remove"), u(this.options.annotations, d.options), u(c, d), d.destroy());
        }
        function d() {
            this.annotations = [];
            this.options.annotations || (this.options.annotations = []);
        }
        function a(a) {
            this.chart.hasDraggedAnnotation || a.apply(this, Array.prototype.slice.call(arguments, 1));
        }
        const { addEvent: c, erase: u, find: p, fireEvent: q, pick: f, wrap: m } = b,
            D = [];
        var A;
        (function (f) {
            f.compose = function (f, q, l) {
                b.pushUnique(D, q) &&
                    (c(q, "afterInit", d),
                    (q = q.prototype),
                    (q.addAnnotation = n),
                    q.callbacks.push(h),
                    (q.collectionsWithInit.annotations = [n]),
                    q.collectionsWithUpdate.push("annotations"),
                    (q.drawAnnotations = g),
                    (q.removeAnnotation = e),
                    (q.initAnnotation = function (a) {
                        a = new (f.types[a.type] || f)(this, a);
                        this.annotations.push(a);
                        return a;
                    }));
                b.pushUnique(D, l) && m(l.prototype, "onContainerMouseDown", a);
            };
        })(A || (A = {}));
        return A;
    });
    r(b, "Extensions/Annotations/AnnotationDefaults.js", [b["Core/Utilities.js"]], function (b) {
        const { defined: n } = b;
        return {
            visible: !0,
            animation: {},
            crop: !0,
            draggable: "xy",
            labelOptions: {
                align: "center",
                allowOverlap: !1,
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                borderColor: "#000000",
                borderRadius: 3,
                borderWidth: 1,
                className: "RBGcharts-no-tooltip",
                crop: !1,
                formatter: function () {
                    return n(this.y) ? "" + this.y : "Annotation label";
                },
                includeInDataExport: !0,
                overflow: "justify",
                padding: 5,
                shadow: !1,
                shape: "callout",
                style: { fontSize: "0.7em", fontWeight: "normal", color: "contrast" },
                useHTML: !1,
                verticalAlign: "bottom",
                x: 0,
                y: -16,
            },
            shapeOptions: { stroke: "rgba(0, 0, 0, 0.75)", strokeWidth: 1, fill: "rgba(0, 0, 0, 0.75)", r: 0, snap: 2 },
            controlPointOptions: { events: {}, style: { cursor: "pointer", fill: "#ffffff", stroke: "#000000", "stroke-width": 2 }, height: 10, symbol: "circle", visible: !1, width: 10 },
            events: {},
            zIndex: 6,
        };
    });
    r(b, "Extensions/Annotations/EventEmitter.js", [b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, n) {
        const { doc: h, isTouchDevice: g } = b,
            { addEvent: e, fireEvent: d, objectEach: a, pick: c, removeEvent: u } = n;
        class p {
            addEvents() {
                const c = this,
                    f = function (a) {
                        e(
                            a,
                            g ? "touchstart" : "mousedown",
                            (a) => {
                                c.onMouseDown(a);
                            },
                            { passive: !1 }
                        );
                    };
                f(this.graphic.element);
                (c.labels || []).forEach((a) => {
                    a.options.useHTML && a.graphic.text && f(a.graphic.text.element);
                });
                a(c.options.events, (a, d) => {
                    const f = function (f) {
                        ("click" === d && c.cancelClick) || a.call(c, c.chart.pointer.normalize(f), c.target);
                    };
                    if (-1 === (c.nonDOMEvents || []).indexOf(d)) c.graphic.on(d, f);
                    else e(c, d, f, { passive: !1 });
                });
                if (c.options.draggable && (e(c, "drag", c.onDrag), !c.graphic.renderer.styledMode)) {
                    const a = { cursor: { x: "ew-resize", y: "ns-resize", xy: "move" }[c.options.draggable] };
                    c.graphic.css(a);
                    (c.labels || []).forEach((c) => {
                        c.options.useHTML && c.graphic.text && c.graphic.text.css(a);
                    });
                }
                c.isUpdating || d(c, "add");
            }
            destroy() {
                this.removeDocEvents();
                u(this);
                this.hcEvents = null;
            }
            mouseMoveToRadians(a, c, d) {
                let f = a.prevChartY - d,
                    m = a.prevChartX - c;
                d = a.chartY - d;
                a = a.chartX - c;
                this.chart.inverted && ((c = m), (m = f), (f = c), (c = a), (a = d), (d = c));
                return Math.atan2(d, a) - Math.atan2(f, m);
            }
            mouseMoveToScale(a, c, d) {
                c = (a.chartX - c || 1) / (a.prevChartX - c || 1);
                a = (a.chartY - d || 1) / (a.prevChartY - d || 1);
                this.chart.inverted && ((d = a), (a = c), (c = d));
                return { x: c, y: a };
            }
            mouseMoveToTranslation(a) {
                let c = a.chartX - a.prevChartX;
                a = a.chartY - a.prevChartY;
                let d;
                this.chart.inverted && ((d = a), (a = c), (c = d));
                return { x: c, y: a };
            }
            onDrag(a) {
                if (this.chart.isInsidePlot(a.chartX - this.chart.plotLeft, a.chartY - this.chart.plotTop, { visiblePlotOnly: !0 })) {
                    const c = this.mouseMoveToTranslation(a);
                    "x" === this.options.draggable && (c.y = 0);
                    "y" === this.options.draggable && (c.x = 0);
                    this.points.length ? this.translate(c.x, c.y) : (this.shapes.forEach((a) => a.translate(c.x, c.y)), this.labels.forEach((a) => a.translate(c.x, c.y)));
                    this.redraw(!1);
                }
            }
            onMouseDown(a) {
                a.preventDefault && a.preventDefault();
                if (2 !== a.button) {
                    var f = this,
                        b = f.chart.pointer;
                    a = b.normalize(a);
                    var u = a.chartX,
                        p = a.chartY;
                    f.cancelClick = !1;
                    f.chart.hasDraggedAnnotation = !0;
                    f.removeDrag = e(
                        h,
                        g ? "touchmove" : "mousemove",
                        function (a) {
                            f.hasDragged = !0;
                            a = b.normalize(a);
                            a.prevChartX = u;
                            a.prevChartY = p;
                            d(f, "drag", a);
                            u = a.chartX;
                            p = a.chartY;
                        },
                        g ? { passive: !1 } : void 0
                    );
                    f.removeMouseUp = e(
                        h,
                        g ? "touchend" : "mouseup",
                        function (a) {
                            const b = c(f.target && f.target.annotation, f.target);
                            b && (b.cancelClick = f.hasDragged);
                            f.cancelClick = f.hasDragged;
                            f.hasDragged = !1;
                            f.chart.hasDraggedAnnotation = !1;
                            d(c(b, f), "afterUpdate");
                            f.onMouseUp(a);
                        },
                        g ? { passive: !1 } : void 0
                    );
                }
            }
            onMouseUp(a) {
                var c = this.chart;
                a = this.target || this;
                const d = c.options.annotations;
                c = c.annotations.indexOf(a);
                this.removeDocEvents();
                d[c] = a.options;
            }
            removeDocEvents() {
                this.removeDrag && (this.removeDrag = this.removeDrag());
                this.removeMouseUp && (this.removeMouseUp = this.removeMouseUp());
            }
        }
        return p;
    });
    r(b, "Extensions/Annotations/ControlPoint.js", [b["Extensions/Annotations/EventEmitter.js"], b["Core/Utilities.js"]], function (b, n) {
        const { merge: h, pick: g } = n;
        class e extends b {
            constructor(d, a, c, b) {
                super();
                this.graphic = void 0;
                this.nonDOMEvents = ["drag"];
                this.chart = d;
                this.target = a;
                this.options = c;
                this.index = g(c.index, b);
            }
            destroy() {
                super.destroy();
                this.graphic && (this.graphic = this.graphic.destroy());
                this.options = this.target = this.chart = null;
            }
            redraw(d) {
                this.graphic[d ? "animate" : "attr"](this.options.positioner.call(this, this.target));
            }
            render() {
                const d = this.chart,
                    a = this.options;
                this.graphic = d.renderer.symbol(a.symbol, 0, 0, a.width, a.height).add(d.controlPointsGroup).css(a.style);
                this.setVisibility(a.visible);
                this.addEvents();
            }
            setVisibility(d) {
                this.graphic[d ? "show" : "hide"]();
                this.options.visible = d;
            }
            update(d) {
                const a = this.chart,
                    c = this.target,
                    b = this.index;
                d = h(!0, this.options, d);
                this.destroy();
                this.constructor(a, c, d, b);
                this.render(a.controlPointsGroup);
                this.redraw();
            }
        }
        ("");
        return e;
    });
    r(b, "Extensions/Annotations/MockPoint.js", [b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (b, n) {
        const {
            series: { prototype: h },
            } = b,
            { defined: g, fireEvent: e } = n;
        class d {
            static fromPoint(a) {
                return new d(a.series.chart, null, { x: a.x, y: a.y, xAxis: a.series.xAxis, yAxis: a.series.yAxis });
            }
            static pointToPixels(a, c) {
                const d = a.series,
                    b = d.chart;
                let e = a.plotX || 0,
                    f = a.plotY || 0;
                b.inverted && (a.mock ? ((e = a.plotY), (f = a.plotX)) : ((e = b.plotWidth - (a.plotY || 0)), (f = b.plotHeight - (a.plotX || 0))));
                d && !c && ((a = d.getPlotBox()), (e += a.translateX), (f += a.translateY));
                return { x: e, y: f };
            }
            static pointToOptions(a) {
                return { x: a.x, y: a.y, xAxis: a.series.xAxis, yAxis: a.series.yAxis };
            }
            constructor(a, c, d) {
                this.plotY = this.plotX = void 0;
                this.mock = !0;
                this.series = { visible: !0, chart: a, getPlotBox: h.getPlotBox };
                this.target = c || null;
                this.options = d;
                this.applyOptions(this.getOptions());
            }
            applyOptions(a) {
                this.command = a.command;
                this.setAxis(a, "x");
                this.setAxis(a, "y");
                this.refresh();
            }
            getLabelConfig() {
                return { x: this.x, y: this.y, point: this };
            }
            getOptions() {
                return this.hasDynamicOptions() ? this.options(this.target) : this.options;
            }
            hasDynamicOptions() {
                return "function" === typeof this.options;
            }
            isInsidePlot() {
                const a = this.plotX,
                    c = this.plotY,
                    d = this.series.xAxis,
                    b = this.series.yAxis,
                    h = { x: a, y: c, isInsidePlot: !0, options: {} };
                d && (h.isInsidePlot = g(a) && 0 <= a && a <= d.len);
                b && (h.isInsidePlot = h.isInsidePlot && g(c) && 0 <= c && c <= b.len);
                e(this.series.chart, "afterIsInsidePlot", h);
                return h.isInsidePlot;
            }
            refresh() {
                var a = this.series;
                const c = a.xAxis;
                a = a.yAxis;
                const d = this.getOptions();
                c ? ((this.x = d.x), (this.plotX = c.toPixels(d.x, !0))) : ((this.x = void 0), (this.plotX = d.x));
                a ? ((this.y = d.y), (this.plotY = a.toPixels(d.y, !0))) : ((this.y = null), (this.plotY = d.y));
                this.isInside = this.isInsidePlot();
            }
            refreshOptions() {
                var a = this.series;
                const c = a.xAxis;
                a = a.yAxis;
                this.x = this.options.x = c ? (this.options.x = c.toValue(this.plotX, !0)) : this.plotX;
                this.y = this.options.y = a ? a.toValue(this.plotY, !0) : this.plotY;
            }
            rotate(a, c, d) {
                if (!this.hasDynamicOptions()) {
                    const b = Math.cos(d);
                    d = Math.sin(d);
                    const e = this.plotX - a,
                        f = this.plotY - c,
                        m = e * d + f * b;
                    this.plotX = e * b - f * d + a;
                    this.plotY = m + c;
                    this.refreshOptions();
                }
            }
            scale(a, c, d, b) {
                if (!this.hasDynamicOptions()) {
                    const e = this.plotY * b;
                    this.plotX = (1 - d) * a + this.plotX * d;
                    this.plotY = (1 - b) * c + e;
                    this.refreshOptions();
                }
            }
            setAxis(a, c) {
                c += "Axis";
                a = a[c];
                const d = this.series.chart;
                this.series[c] = "object" === typeof a ? a : g(a) ? d[c][a] || d.get(a) : null;
            }
            toAnchor() {
                const a = [this.plotX, this.plotY, 0, 0];
                this.series.chart.inverted && ((a[0] = this.plotY), (a[1] = this.plotX));
                return a;
            }
            translate(a, c, d, b) {
                this.hasDynamicOptions() || ((this.plotX += d), (this.plotY += b), this.refreshOptions());
            }
        }
        ("");
        return d;
    });
    r(b, "Extensions/Annotations/ControlTarget.js", [b["Extensions/Annotations/ControlPoint.js"], b["Extensions/Annotations/MockPoint.js"], b["Core/Utilities.js"]], function (b, n, h) {
        var g;
        (function (e) {
            function d() {
                const a = this.controlPoints,
                    c = this.options.controlPoints || [];
                c.forEach((d, l) => {
                    d = h.merge(this.options.controlPointOptions, d);
                    d.index || (d.index = l);
                    c[l] = d;
                    a.push(new b(this.chart, this, d));
                });
            }
            function a(a) {
                const c = a.series.getPlotBox(),
                    d = a.series.chart;
                var b = a.mock ? a.toAnchor() : (d.tooltip && d.tooltip.getAnchor.call({ chart: a.series.chart }, a)) || [0, 0, 0, 0];
                b = { x: b[0] + (this.options.x || 0), y: b[1] + (this.options.y || 0), height: b[2] || 0, width: b[3] || 0 };
                return { relativePosition: b, absolutePosition: h.merge(b, { x: b.x + (a.mock ? c.translateX : d.plotLeft), y: b.y + (a.mock ? c.translateY : d.plotTop) }) };
            }
            function c() {
                this.controlPoints.forEach((a) => a.destroy());
                this.options = this.points = this.controlPoints = this.chart = null;
                this.annotation && (this.annotation = null);
            }
            function u() {
                const a = this.options;
                return a.points || (a.point && h.splat(a.point));
            }
            function g() {
                const a = this.getPointsOptions(),
                    c = this.points,
                    d = (a && a.length) || 0;
                let b, f;
                for (b = 0; b < d; b++) {
                    f = this.point(a[b], c[b]);
                    if (!f) {
                        c.length = 0;
                        return;
                    }
                    f.mock && f.refresh();
                    c[b] = f;
                }
                return c;
            }
            function q(a, c) {
                if (a && a.series) return a;
                (c && null !== c.series) ||
                    (h.isObject(a) ? (c = new n(this.chart, this, a)) : h.isString(a) ? (c = this.chart.get(a) || null) : "function" === typeof a && ((c = a.call(c, this)), (c = c.series ? c : new n(this.chart, this, a))));
                return c;
            }
            function f(a) {
                this.controlPoints.forEach((c) => c.redraw(a));
            }
            function m() {
                this.controlPoints.forEach((a) => a.render());
            }
            function D(a, c, d, b, f) {
                if (this.chart.inverted) {
                    const a = c;
                    c = d;
                    d = a;
                }
                this.points.forEach((m, l) => this.transformPoint(a, c, d, b, f, l), this);
            }
            function A(a, c, d, b, f, m) {
                let l = this.points[m];
                l.mock || (l = this.points[m] = n.fromPoint(l));
                l[a](c, d, b, f);
            }
            function v(a, c) {
                this.transform("translate", null, null, a, c);
            }
            function E(a, c, d) {
                this.transformPoint("translate", null, null, a, c, d);
            }
            const C = [];
            e.compose = function (b) {
                h.pushUnique(C, b) &&
                    h.merge(!0, b.prototype, {
                        addControlPoints: d,
                        anchor: a,
                        destroyControlTarget: c,
                        getPointsOptions: u,
                        linkPoints: g,
                        point: q,
                        redrawControlPoints: f,
                        renderControlPoints: m,
                        transform: D,
                        transformPoint: A,
                        translate: v,
                        translatePoint: E,
                    });
            };
        })(g || (g = {}));
        return g;
    });
    r(b, "Extensions/Annotations/Controllables/Controllable.js", [b["Extensions/Annotations/ControlTarget.js"], b["Core/Utilities.js"]], function (b, n) {
        const { merge: h } = n;
        class g {
            constructor(b, d, a, c) {
                this.graphic = void 0;
                this.annotation = b;
                this.chart = b.chart;
                this.collection = "label" === c ? "labels" : "shapes";
                this.controlPoints = [];
                this.options = d;
                this.points = [];
                this.index = a;
                this.itemType = c;
                this.init(b, d, a);
            }
            attr(...b) {
                this.graphic.attr.apply(this.graphic, arguments);
            }
            attrsFromOptions(b) {
                const d = this.constructor.attrsMap,
                    a = {},
                    c = this.chart.styledMode;
                let e, g;
                for (e in b) (g = d[e]), "undefined" === typeof d[e] || (c && -1 !== ["fill", "stroke", "stroke-width"].indexOf(g)) || (a[g] = b[e]);
                return a;
            }
            destroy() {
                this.graphic && (this.graphic = this.graphic.destroy());
                this.tracker && (this.tracker = this.tracker.destroy());
                this.destroyControlTarget();
            }
            init(b, d, a) {
                this.annotation = b;
                this.chart = b.chart;
                this.options = d;
                this.points = [];
                this.controlPoints = [];
                this.index = a;
                this.linkPoints();
                this.addControlPoints();
            }
            redraw(b) {
                this.redrawControlPoints(b);
            }
            render(b) {
                this.renderControlPoints();
            }
            rotate(b, d, a) {
                this.transform("rotate", b, d, a);
            }
            scale(b, d, a, c) {
                this.transform("scale", b, d, a, c);
            }
            setControlPointsVisibility(b) {
                this.controlPoints.forEach((d) => {
                    d.setVisibility(b);
                });
            }
            shouldBeDrawn() {
                return !!this.points.length;
            }
            translateShape(b, d, a) {
                var c = this.annotation.chart;
                const e = this.annotation.userOptions,
                    g = c.annotations.indexOf(this.annotation);
                c = c.options.annotations[g];
                this.translatePoint(b, d, 0);
                a && this.translatePoint(b, d, 1);
                c[this.collection][this.index].point = this.options.point;
                e[this.collection][this.index].point = this.options.point;
            }
            update(b) {
                var d = this.annotation;
                const a = h(!0, this.options, b);
                b = this.graphic.parentGroup;
                const c = this.constructor;
                this.destroy();
                d = new c(d, a, this.index, this.itemType);
                h(!0, this, d);
                this.render(b);
                this.redraw();
            }
        }
        b.compose(g);
        ("");
        return g;
    });
    r(b, "Extensions/Annotations/Controllables/ControllableDefaults.js", [], function () {
        return {
            defaultMarkers: {
                arrow: { tagName: "marker", attributes: { id: "arrow", refY: 5, refX: 9, markerWidth: 10, markerHeight: 10 }, children: [{ tagName: "path", attributes: { d: "M 0 0 L 10 5 L 0 10 Z", "stroke-width": 0 } }] },
                "reverse-arrow": {
                    tagName: "marker",
                    attributes: { id: "reverse-arrow", refY: 5, refX: 1, markerWidth: 10, markerHeight: 10 },
                    children: [{ tagName: "path", attributes: { d: "M 0 5 L 10 0 L 10 10 Z", "stroke-width": 0 } }],
                },
            },
        };
    });
    r(
        b,
        "Extensions/Annotations/Controllables/ControllablePath.js",
        [b["Extensions/Annotations/Controllables/Controllable.js"], b["Extensions/Annotations/Controllables/ControllableDefaults.js"], b["Core/Globals.js"], b["Core/Utilities.js"]],
        function (b, n, h, g) {
            function e(a) {
                return function (c) {
                    this.attr(a, "url(#" + c + ")");
                };
            }
            function d() {
                this.options.defs = f(c, this.options.defs || {});
            }
            function a(a, c) {
                const d = { attributes: { id: a } },
                    b = { stroke: c.color || "none", fill: c.color || "rgba(0, 0, 0, 0.75)" };
                d.children =
                    c.children &&
                    c.children.map(function (a) {
                        return f(b, a);
                    });
                c = f(!0, { attributes: { markerWidth: 20, markerHeight: 20, refX: 0, refY: 0, orient: "auto" } }, c, d);
                c = this.definition(c);
                c.id = a;
                return c;
            }
            const { defaultMarkers: c } = n,
                { addEvent: u, defined: p, extend: q, merge: f, uniqueKey: m } = g,
                D = [],
                A = e("marker-end"),
                v = e("marker-start"),
                E = "rgba(192,192,192," + (h.svg ? 0.0001 : 0.002) + ")";
            class C extends b {
                static compose(c, b) {
                    g.pushUnique(D, c) && u(c, "afterGetContainer", d);
                    g.pushUnique(D, b) && (b.prototype.addMarker = a);
                }
                constructor(a, c, d) {
                    super(a, c, d, "shape");
                    this.type = "path";
                }
                toD() {
                    var a = this.options.d;
                    if (a) return "function" === typeof a ? a.call(this) : a;
                    a = this.points;
                    const c = a.length,
                        d = [];
                    var b = c;
                    let f = a[0],
                        m = b && this.anchor(f).absolutePosition,
                        e = 0;
                    if (m)
                        for (d.push(["M", m.x, m.y]); ++e < c && b; )
                            (f = a[e]), (b = f.command || "L"), (m = this.anchor(f).absolutePosition), "M" === b ? d.push([b, m.x, m.y]) : "L" === b ? d.push([b, m.x, m.y]) : "Z" === b && d.push([b]), (b = f.series.visible);
                    return b && this.graphic ? this.chart.renderer.crispLine(d, this.graphic.strokeWidth()) : null;
                }
                shouldBeDrawn() {
                    return super.shouldBeDrawn() || !!this.options.d;
                }
                render(a) {
                    const c = this.options,
                        d = this.attrsFromOptions(c);
                    this.graphic = this.annotation.chart.renderer
                        .path([["M", 0, 0]])
                        .attr(d)
                        .add(a);
                    c.className && this.graphic.addClass(c.className);
                    this.tracker = this.annotation.chart.renderer
                        .path([["M", 0, 0]])
                        .addClass("RBGcharts-tracker-line")
                        .attr({ zIndex: 2 })
                        .add(a);
                    this.annotation.chart.styledMode || this.tracker.attr({ "stroke-linejoin": "round", stroke: E, fill: E, "stroke-width": this.graphic.strokeWidth() + 2 * c.snap });
                    super.render();
                    q(this.graphic, { markerStartSetter: v, markerEndSetter: A });
                    this.setMarkers(this);
                }
                redraw(a) {
                    if (this.graphic) {
                        const c = this.toD(),
                            d = a ? "animate" : "attr";
                        c ? (this.graphic[d]({ d: c }), this.tracker[d]({ d: c })) : (this.graphic.attr({ d: "M 0 -9000000000" }), this.tracker.attr({ d: "M 0 -9000000000" }));
                        this.graphic.placed = this.tracker.placed = !!c;
                    }
                    super.redraw(a);
                }
                setMarkers(a) {
                    const c = a.options,
                        d = a.chart,
                        b = d.options.defs,
                        e = c.fill,
                        g = p(e) && "none" !== e ? e : c.stroke;
                    ["markerStart", "markerEnd"].forEach(function (e) {
                        var l = c[e];
                        let k, t, z;
                        if (l) {
                            for (z in b)
                                if (((k = b[z]), (l === (k.attributes && k.attributes.id) || l === k.id) && "marker" === k.tagName)) {
                                    t = k;
                                    break;
                                }
                            t && ((l = a[e] = d.renderer.addMarker((c.id || m()) + "-" + l, f(t, { color: g }))), a.attr(e, l.getAttribute("id")));
                        }
                    });
                }
            }
            C.attrsMap = { dashStyle: "dashstyle", strokeWidth: "stroke-width", stroke: "stroke", fill: "fill", zIndex: "zIndex" };
            return C;
        }
    );
    r(b, "Extensions/Annotations/Controllables/ControllableRect.js", [b["Extensions/Annotations/Controllables/Controllable.js"], b["Extensions/Annotations/Controllables/ControllablePath.js"], b["Core/Utilities.js"]], function (b, n, h) {
        ({ merge: h } = h);
        class g extends b {
            constructor(b, d, a) {
                super(b, d, a, "shape");
                this.type = "rect";
                this.translate = super.translateShape;
            }
            render(b) {
                const d = this.attrsFromOptions(this.options);
                this.graphic = this.annotation.chart.renderer.rect(0, -9e9, 0, 0).attr(d).add(b);
                super.render();
            }
            redraw(b) {
                if (this.graphic) {
                    const d = this.anchor(this.points[0]).absolutePosition;
                    if (d) this.graphic[b ? "animate" : "attr"]({ x: d.x, y: d.y, width: this.options.width, height: this.options.height });
                    else this.attr({ x: 0, y: -9e9 });
                    this.graphic.placed = !!d;
                }
                super.redraw(b);
            }
        }
        g.attrsMap = h(n.attrsMap, { width: "width", height: "height" });
        return g;
    });
    r(b, "Extensions/Annotations/Controllables/ControllableCircle.js", [b["Extensions/Annotations/Controllables/Controllable.js"], b["Extensions/Annotations/Controllables/ControllablePath.js"], b["Core/Utilities.js"]], function (b, n, h) {
        ({ merge: h } = h);
        class g extends b {
            constructor(b, d, a) {
                super(b, d, a, "shape");
                this.type = "circle";
                this.translate = super.translateShape;
            }
            redraw(b) {
                if (this.graphic) {
                    const d = this.anchor(this.points[0]).absolutePosition;
                    if (d) this.graphic[b ? "animate" : "attr"]({ x: d.x, y: d.y, r: this.options.r });
                    else this.graphic.attr({ x: 0, y: -9e9 });
                    this.graphic.placed = !!d;
                }
                super.redraw.call(this, b);
            }
            render(b) {
                const d = this.attrsFromOptions(this.options);
                this.graphic = this.annotation.chart.renderer.circle(0, -9e9, 0).attr(d).add(b);
                super.render();
            }
            setRadius(b) {
                this.options.r = b;
            }
        }
        g.attrsMap = h(n.attrsMap, { r: "r" });
        return g;
    });
    r(b, "Extensions/Annotations/Controllables/ControllableEllipse.js", [b["Extensions/Annotations/Controllables/Controllable.js"], b["Extensions/Annotations/Controllables/ControllablePath.js"], b["Core/Utilities.js"]], function (b, n, h) {
        const { merge: g, defined: e } = h;
        class d extends b {
            constructor(a, c, d) {
                super(a, c, d, "shape");
                this.type = "ellipse";
            }
            init(a, c, d) {
                e(c.yAxis) &&
                    c.points.forEach((a) => {
                        a.yAxis = c.yAxis;
                    });
                e(c.xAxis) &&
                    c.points.forEach((a) => {
                        a.xAxis = c.xAxis;
                    });
                super.init(a, c, d);
            }
            render(a) {
                this.graphic = this.annotation.chart.renderer.createElement("ellipse").attr(this.attrsFromOptions(this.options)).add(a);
                super.render();
            }
            translate(a, c) {
                super.translateShape(a, c, !0);
            }
            getDistanceFromLine(a, c, d, b) {
                return Math.abs((c.y - a.y) * d - (c.x - a.x) * b + c.x * a.y - c.y * a.x) / Math.sqrt((c.y - a.y) * (c.y - a.y) + (c.x - a.x) * (c.x - a.x));
            }
            getAttrs(a, c) {
                var d = a.x,
                    b = a.y;
                const g = c.x,
                    f = c.y;
                c = (d + g) / 2;
                a = (b + f) / 2;
                const m = Math.sqrt(((d - g) * (d - g)) / 4 + ((b - f) * (b - f)) / 4);
                b = (180 * Math.atan((f - b) / (g - d))) / Math.PI;
                c < d && (b += 180);
                d = this.getRY();
                return { cx: c, cy: a, rx: m, ry: d, angle: b };
            }
            getRY() {
                const a = this.getYAxis();
                return e(a) ? Math.abs(a.toPixels(this.options.ry) - a.toPixels(0)) : this.options.ry;
            }
            getYAxis() {
                return this.chart.yAxis[this.options.yAxis];
            }
            getAbsolutePosition(a) {
                return this.anchor(a).absolutePosition;
            }
            redraw(a) {
                if (this.graphic) {
                    const d = this.getAbsolutePosition(this.points[0]);
                    var c = this.getAbsolutePosition(this.points[1]);
                    c = this.getAttrs(d, c);
                    if (d) this.graphic[a ? "animate" : "attr"]({ cx: c.cx, cy: c.cy, rx: c.rx, ry: c.ry, rotation: c.angle, rotationOriginX: c.cx, rotationOriginY: c.cy });
                    else this.graphic.attr({ x: 0, y: -9e9 });
                    this.graphic.placed = !!d;
                }
                super.redraw(a);
            }
            setYRadius(a) {
                const c = this.annotation.userOptions.shapes;
                this.options.ry = a;
                c && c[0] && ((c[0].ry = a), (c[0].ry = a));
            }
        }
        d.attrsMap = g(n.attrsMap, { ry: "ry" });
        return d;
    });
    r(b, "Extensions/Annotations/Controllables/ControllableLabel.js", [b["Extensions/Annotations/Controllables/Controllable.js"], b["Core/Templating.js"], b["Extensions/Annotations/MockPoint.js"], b["Core/Utilities.js"]], function (
        b,
        n,
        h,
        g
    ) {
        function e(a, d, b, g, e) {
            const f = e && e.anchorX;
            e = e && e.anchorY;
            let m,
                l,
                h = b / 2;
            c(f) &&
                c(e) &&
                ((m = [["M", f, e]]),
                (l = d - e),
                0 > l && (l = -g - l),
                l < b && (h = f < a + b / 2 ? l : b - l),
                e > d + g ? m.push(["L", a + h, d + g]) : e < d ? m.push(["L", a + h, d]) : f < a ? m.push(["L", a, d + g / 2]) : f > a + b && m.push(["L", a + b, d + g / 2]));
            return m || [];
        }
        const { format: d } = n,
            { extend: a, isNumber: c, pick: u } = g,
            p = [];
        class q extends b {
            static alignedPosition(a, c) {
                const d = a.align,
                    b = a.verticalAlign;
                let f = (c.x || 0) + (a.x || 0),
                    m = (c.y || 0) + (a.y || 0),
                    g,
                    e;
                "right" === d ? (g = 1) : "center" === d && (g = 2);
                g && (f += (c.width - (a.width || 0)) / g);
                "bottom" === b ? (e = 1) : "middle" === b && (e = 2);
                e && (m += (c.height - (a.height || 0)) / e);
                return { x: Math.round(f), y: Math.round(m) };
            }
            static compose(a) {
                g.pushUnique(p, a) && (a.prototype.symbols.connector = e);
            }
            static justifiedOptions(a, c, d, b) {
                const f = d.align,
                    m = d.verticalAlign,
                    g = c.box ? 0 : c.padding || 0,
                    e = c.getBBox();
                c = { align: f, verticalAlign: m, x: d.x, y: d.y, width: c.width, height: c.height };
                d = (b.x || 0) - a.plotLeft;
                b = (b.y || 0) - a.plotTop;
                let h;
                h = d + g;
                0 > h && ("right" === f ? (c.align = "left") : (c.x = (c.x || 0) - h));
                h = d + e.width - g;
                h > a.plotWidth && ("left" === f ? (c.align = "right") : (c.x = (c.x || 0) + a.plotWidth - h));
                h = b + g;
                0 > h && ("bottom" === m ? (c.verticalAlign = "top") : (c.y = (c.y || 0) - h));
                h = b + e.height - g;
                h > a.plotHeight && ("top" === m ? (c.verticalAlign = "bottom") : (c.y = (c.y || 0) + a.plotHeight - h));
                return c;
            }
            constructor(a, c, d) {
                super(a, c, d, "label");
            }
            translatePoint(a, c) {
                super.translatePoint(a, c, 0);
            }
            translate(a, c) {
                var d = this.annotation.chart;
                const b = this.annotation.userOptions;
                var f = d.annotations.indexOf(this.annotation);
                f = d.options.annotations[f];
                d.inverted && ((d = a), (a = c), (c = d));
                this.options.x += a;
                this.options.y += c;
                f[this.collection][this.index].x = this.options.x;
                f[this.collection][this.index].y = this.options.y;
                b[this.collection][this.index].x = this.options.x;
                b[this.collection][this.index].y = this.options.y;
            }
            render(a) {
                const c = this.options,
                    d = this.attrsFromOptions(c),
                    b = c.style;
                this.graphic = this.annotation.chart.renderer.label("", 0, -9999, c.shape, null, null, c.useHTML, null, "annotation-label").attr(d).add(a);
                this.annotation.chart.styledMode ||
                    ("contrast" === b.color && (b.color = this.annotation.chart.renderer.getContrast(-1 < q.shapesWithoutBackground.indexOf(c.shape) ? "#FFFFFF" : c.backgroundColor)), this.graphic.css(c.style).shadow(c.shadow));
                c.className && this.graphic.addClass(c.className);
                this.graphic.labelrank = c.labelrank;
                super.render();
            }
            redraw(a) {
                var c = this.options,
                    b = this.text || c.format || c.text;
                const f = this.graphic,
                    g = this.points[0];
                f
                    ? (f.attr({ text: b ? d(String(b), g.getLabelConfig(), this.annotation.chart) : c.formatter.call(g, this) }),
                      (c = this.anchor(g)),
                      (b = this.position(c)) ? ((f.alignAttr = b), (b.anchorX = c.absolutePosition.x), (b.anchorY = c.absolutePosition.y), f[a ? "animate" : "attr"](b)) : f.attr({ x: 0, y: -9999 }),
                      (f.placed = !!b),
                      super.redraw(a))
                    : this.redraw(a);
            }
            anchor(a) {
                const c = super.anchor.apply(this, arguments),
                    d = this.options.x || 0,
                    b = this.options.y || 0;
                c.absolutePosition.x -= d;
                c.absolutePosition.y -= b;
                c.relativePosition.x -= d;
                c.relativePosition.y -= b;
                return c;
            }
            position(c) {
                var d = this.graphic;
                const b = this.annotation.chart;
                var f = b.tooltip;
                const g = this.points[0];
                var e = this.options;
                const n = c.absolutePosition,
                    l = c.relativePosition;
                let p;
                c = g.series.visible && h.prototype.isInsidePlot.call(g);
                if (d && c) {
                    const { width: h = 0, height: m = 0 } = d;
                    e.distance && f
                        ? (p = f.getPosition.call({ chart: b, distance: u(e.distance, 16), getPlayingField: f.getPlayingField }, h, m, { plotX: l.x, plotY: l.y, negative: g.negative, ttBelow: g.ttBelow, h: l.height || l.width }))
                        : e.positioner
                        ? (p = e.positioner.call(this))
                        : ((f = { x: n.x, y: n.y, width: 0, height: 0 }), (p = q.alignedPosition(a(e, { width: h, height: m }), f)), "justify" === this.options.overflow && (p = q.alignedPosition(q.justifiedOptions(b, d, e, p), f)));
                    e.crop && ((d = p.x - b.plotLeft), (e = p.y - b.plotTop), (c = b.isInsidePlot(d, e) && b.isInsidePlot(d + h, e + m)));
                }
                return c ? p : null;
            }
        }
        q.attrsMap = { backgroundColor: "fill", borderColor: "stroke", borderWidth: "stroke-width", zIndex: "zIndex", borderRadius: "r", padding: "padding" };
        q.shapesWithoutBackground = ["connector"];
        return q;
    });
    r(b, "Extensions/Annotations/Controllables/ControllableImage.js", [b["Extensions/Annotations/Controllables/Controllable.js"], b["Extensions/Annotations/Controllables/ControllableLabel.js"]], function (b, n) {
        class h extends b {
            constructor(b, e, d) {
                super(b, e, d, "shape");
                this.type = "image";
                this.translate = super.translateShape;
            }
            render(b) {
                const e = this.attrsFromOptions(this.options),
                    d = this.options;
                this.graphic = this.annotation.chart.renderer.image(d.src, 0, -9e9, d.width, d.height).attr(e).add(b);
                this.graphic.width = d.width;
                this.graphic.height = d.height;
                super.render();
            }
            redraw(b) {
                if (this.graphic) {
                    var e = this.anchor(this.points[0]);
                    if ((e = n.prototype.position.call(this, e))) this.graphic[b ? "animate" : "attr"]({ x: e.x, y: e.y });
                    else this.graphic.attr({ x: 0, y: -9e9 });
                    this.graphic.placed = !!e;
                }
                super.redraw(b);
            }
        }
        h.attrsMap = { width: "width", height: "height", zIndex: "zIndex" };
        return h;
    });
    r(b, "Core/Chart/ChartNavigationComposition.js", [], function () {
        var b;
        (function (b) {
            b.compose = function (b) {
                b.navigation || (b.navigation = new h(b));
                return b;
            };
            class h {
                constructor(b) {
                    this.updates = [];
                    this.chart = b;
                }
                addUpdate(b) {
                    this.chart.navigation.updates.push(b);
                }
                update(b, e) {
                    this.updates.forEach((d) => {
                        d.call(this.chart, b, e);
                    });
                }
            }
            b.Additions = h;
        })(b || (b = {}));
        return b;
    });
    r(b, "Extensions/Annotations/NavigationBindingsUtilities.js", [b["Core/Utilities.js"]], function (b) {
        const { defined: n, isNumber: h, pick: g } = b,
            e = { backgroundColor: "string", borderColor: "string", borderRadius: "string", color: "string", fill: "string", fontSize: "string", labels: "string", name: "string", stroke: "string", title: "string" };
        return {
            annotationsFieldsTypes: e,
            getAssignedAxis: function (b) {
                return b.filter((a) => {
                    var c = a.axis.getExtremes();
                    const b = c.min;
                    c = c.max;
                    const d = g(a.axis.minPointOffset, 0);
                    return h(b) && h(c) && a.value >= b - d && a.value <= c + d && !a.axis.options.isInternal;
                })[0];
            },
            getFieldType: function (b, a) {
                b = e[b];
                a = typeof a;
                n(b) && (a = b);
                return { string: "text", number: "number", boolean: "checkbox" }[a];
            },
        };
    });
    r(b, "Extensions/Annotations/NavigationBindingsDefaults.js", [b["Extensions/Annotations/NavigationBindingsUtilities.js"], b["Core/Utilities.js"]], function (b, n) {
        const { getAssignedAxis: h } = b,
            { isNumber: g, merge: e } = n;
        return {
            lang: {
                navigation: {
                    popup: {
                        simpleShapes: "Simple shapes",
                        lines: "Lines",
                        circle: "Circle",
                        ellipse: "Ellipse",
                        rectangle: "Rectangle",
                        label: "Label",
                        shapeOptions: "Shape options",
                        typeOptions: "Details",
                        fill: "Fill",
                        format: "Text",
                        strokeWidth: "Line width",
                        stroke: "Line color",
                        title: "Title",
                        name: "Name",
                        labelOptions: "Label options",
                        labels: "Labels",
                        backgroundColor: "Background color",
                        backgroundColors: "Background colors",
                        borderColor: "Border color",
                        borderRadius: "Border radius",
                        borderWidth: "Border width",
                        style: "Style",
                        padding: "Padding",
                        fontSize: "Font size",
                        color: "Color",
                        height: "Height",
                        shapes: "Shape options",
                    },
                },
            },
            navigation: {
                bindingsClassName: "RBGcharts-bindings-container",
                bindings: {
                    circleAnnotation: {
                        className: "RBGcharts-circle-annotation",
                        start: function (b) {
                            var a = this.chart.pointer.getCoordinates(b);
                            b = h(a.xAxis);
                            a = h(a.yAxis);
                            const c = this.chart.options.navigation;
                            if (b && a)
                                return this.chart.addAnnotation(
                                    e(
                                        { langKey: "circle", type: "basicAnnotation", shapes: [{ type: "circle", point: { x: b.value, y: a.value, xAxis: b.axis.index, yAxis: a.axis.index }, r: 5 }] },
                                        c.annotationsOptions,
                                        c.bindings.circleAnnotation.annotationsOptions
                                    )
                                );
                        },
                        steps: [
                            function (b, a) {
                                var c = a.options.shapes;
                                c = (c && c[0] && c[0].point) || {};
                                if (g(c.xAxis) && g(c.yAxis)) {
                                    var d = this.chart.inverted;
                                    const a = this.chart.xAxis[c.xAxis].toPixels(c.x);
                                    c = this.chart.yAxis[c.yAxis].toPixels(c.y);
                                    d = Math.max(Math.sqrt(Math.pow(d ? c - b.chartX : a - b.chartX, 2) + Math.pow(d ? a - b.chartY : c - b.chartY, 2)), 5);
                                }
                                a.update({ shapes: [{ r: d }] });
                            },
                        ],
                    },
                    ellipseAnnotation: {
                        className: "RBGcharts-ellipse-annotation",
                        start: function (b) {
                            var a = this.chart.pointer.getCoordinates(b);
                            b = h(a.xAxis);
                            a = h(a.yAxis);
                            const c = this.chart.options.navigation;
                            if (b && a)
                                return this.chart.addAnnotation(
                                    e(
                                        {
                                            langKey: "ellipse",
                                            type: "basicAnnotation",
                                            shapes: [
                                                {
                                                    type: "ellipse",
                                                    xAxis: b.axis.index,
                                                    yAxis: a.axis.index,
                                                    points: [
                                                        { x: b.value, y: a.value },
                                                        { x: b.value, y: a.value },
                                                    ],
                                                    ry: 1,
                                                },
                                            ],
                                        },
                                        c.annotationsOptions,
                                        c.bindings.ellipseAnnotation.annotationOptions
                                    )
                                );
                        },
                        steps: [
                            function (b, a) {
                                a = a.shapes[0];
                                const c = a.getAbsolutePosition(a.points[1]);
                                a.translatePoint(b.chartX - c.x, b.chartY - c.y, 1);
                                a.redraw(!1);
                            },
                            function (b, a) {
                                a = a.shapes[0];
                                var c = a.getAbsolutePosition(a.points[0]);
                                const d = a.getAbsolutePosition(a.points[1]);
                                b = a.getDistanceFromLine(c, d, b.chartX, b.chartY);
                                c = a.getYAxis();
                                b = Math.abs(c.toValue(0) - c.toValue(b));
                                a.setYRadius(b);
                                a.redraw(!1);
                            },
                        ],
                    },
                    rectangleAnnotation: {
                        className: "RBGcharts-rectangle-annotation",
                        start: function (b) {
                            b = this.chart.pointer.getCoordinates(b);
                            var a = h(b.xAxis),
                                c = h(b.yAxis);
                            if (a && c) {
                                b = a.value;
                                var d = c.value;
                                a = a.axis.index;
                                c = c.axis.index;
                                var g = this.chart.options.navigation;
                                return this.chart.addAnnotation(
                                    e(
                                        {
                                            langKey: "rectangle",
                                            type: "basicAnnotation",
                                            shapes: [
                                                { type: "path", points: [{ xAxis: a, yAxis: c, x: b, y: d }, { xAxis: a, yAxis: c, x: b, y: d }, { xAxis: a, yAxis: c, x: b, y: d }, { xAxis: a, yAxis: c, x: b, y: d }, { command: "Z" }] },
                                            ],
                                        },
                                        g.annotationsOptions,
                                        g.bindings.rectangleAnnotation.annotationsOptions
                                    )
                                );
                            }
                        },
                        steps: [
                            function (b, a) {
                                var c = a.options.shapes;
                                c = (c && c[0] && c[0].points) || [];
                                var d = this.chart.pointer.getCoordinates(b);
                                b = h(d.xAxis);
                                d = h(d.yAxis);
                                b && d && ((b = b.value), (d = d.value), (c[1].x = b), (c[2].x = b), (c[2].y = d), (c[3].y = d), a.update({ shapes: [{ points: c }] }));
                            },
                        ],
                    },
                    labelAnnotation: {
                        className: "RBGcharts-label-annotation",
                        start: function (b) {
                            var a = this.chart.pointer.getCoordinates(b);
                            b = h(a.xAxis);
                            a = h(a.yAxis);
                            const c = this.chart.options.navigation;
                            if (b && a)
                                return this.chart.addAnnotation(
                                    e(
                                        {
                                            langKey: "label",
                                            type: "basicAnnotation",
                                            labelOptions: { format: "{y:.2f}" },
                                            labels: [{ point: { xAxis: b.axis.index, yAxis: a.axis.index, x: b.value, y: a.value }, overflow: "none", crop: !0 }],
                                        },
                                        c.annotationsOptions,
                                        c.bindings.labelAnnotation.annotationsOptions
                                    )
                                );
                        },
                    },
                },
                events: {},
                annotationsOptions: { animation: { defer: 0 } },
            },
        };
    });
    r(
        b,
        "Extensions/Annotations/NavigationBindings.js",
        [
            b["Core/Chart/ChartNavigationComposition.js"],
            b["Core/Defaults.js"],
            b["Core/Templating.js"],
            b["Core/Globals.js"],
            b["Extensions/Annotations/NavigationBindingsDefaults.js"],
            b["Extensions/Annotations/NavigationBindingsUtilities.js"],
            b["Core/Utilities.js"],
        ],
        function (b, n, h, g, e, d, a) {
            function c(a, b) {
                const c = l.Element.prototype,
                    d = c.matches || c.msMatchesSelector || c.webkitMatchesSelector;
                let k = null;
                if (c.closest) k = c.closest.call(a, b);
                else {
                    do {
                        if (d.call(a, b)) return a;
                        a = a.parentElement || a.parentNode;
                    } while (null !== a && 1 === a.nodeType);
                }
                return k;
            }
            function u() {
                this.chart.navigationBindings && this.chart.navigationBindings.deselectAnnotation();
            }
            function p() {
                this.navigationBindings && this.navigationBindings.destroy();
            }
            function q() {
                const a = this.options;
                a && a.navigation && a.navigation.bindings && ((this.navigationBindings = new F(this, a.navigation)), this.navigationBindings.initEvents(), this.navigationBindings.initUpdate());
            }
            function f() {
                const a = this.navigationBindings;
                if (this && a) {
                    let c = !1;
                    this.series.forEach((a) => {
                        !a.options.isInternal && a.visible && (c = !0);
                    });
                    if (this.navigationBindings && this.navigationBindings.container && this.navigationBindings.container[0]) {
                        const b = this.navigationBindings.container[0];
                        z(a.boundClassNames, (a, d) => {
                            if ((d = b.querySelectorAll("." + d)))
                                for (let b = 0; b < d.length; b++) {
                                    const k = d[b],
                                        f = k.className;
                                    "normal" === a.noDataState
                                        ? -1 !== f.indexOf("RBGcharts-disabled-btn") && k.classList.remove("RBGcharts-disabled-btn")
                                        : c
                                        ? -1 !== f.indexOf("RBGcharts-disabled-btn") && k.classList.remove("RBGcharts-disabled-btn")
                                        : -1 === f.indexOf("RBGcharts-disabled-btn") && (k.className += " RBGcharts-disabled-btn");
                                }
                        });
                    }
                }
            }
            function m() {
                this.deselectAnnotation();
            }
            function D() {
                this.selectedButtonElement = null;
            }
            function A(a) {
                function b(a) {
                    const b = this,
                        d = b.chart.navigationBindings,
                        k = d.activeAnnotation;
                    c && c.call(b, a);
                    k !== b
                        ? (d.deselectAnnotation(),
                          (d.activeAnnotation = b),
                          b.setControlPointsVisibility(!0),
                          y(d, "showPopup", {
                              annotation: b,
                              formType: "annotation-toolbar",
                              options: d.annotationToFields(b),
                              onSubmit: function (a) {
                                  if ("remove" === a.actionType) (d.activeAnnotation = !1), d.chart.removeAnnotation(b);
                                  else {
                                      const c = {};
                                      d.fieldsToOptions(a.fields, c);
                                      d.deselectAnnotation();
                                      a = c.typeOptions;
                                      "measure" === b.options.type && ((a.crosshairY.enabled = 0 !== a.crosshairY.strokeWidth), (a.crosshairX.enabled = 0 !== a.crosshairX.strokeWidth));
                                      b.update(c);
                                  }
                              },
                          }))
                        : y(d, "closePopup");
                    a.activeAnnotation = !0;
                }
                const c = a.prototype.defaultOptions.events && a.prototype.defaultOptions.events.click;
                let d, k;
                t(!0, a.prototype.defaultOptions.events, {
                    click: b,
                    touchstart: function (a) {
                        d = a.touches[0].clientX;
                        k = a.touches[0].clientY;
                    },
                    touchend: function (a) {
                        (d && 4 <= Math.sqrt(Math.pow(d - a.changedTouches[0].clientX, 2) + Math.pow(k - a.changedTouches[0].clientY, 2))) || b.call(this, a);
                    },
                });
            }
            const { setOptions: v } = n,
                { format: E } = h,
                { doc: C, win: l } = g,
                { getFieldType: w } = d,
                { addEvent: x, attr: K, fireEvent: y, isArray: r, isFunction: H, isNumber: B, isObject: k, merge: t, objectEach: z, pick: G } = a,
                J = [];
            class F {
                static compose(b, c) {
                    a.pushUnique(J, b) &&
                        (x(b, "remove", u),
                        A(b),
                        z(b.types, (a) => {
                            A(a);
                        }));
                    a.pushUnique(J, c) && (x(c, "destroy", p), x(c, "load", q), x(c, "render", f));
                    a.pushUnique(J, F) && (x(F, "closePopup", m), x(F, "deselectButton", D));
                    a.pushUnique(J, v) && v(e);
                }
                constructor(a, b) {
                    this.selectedButton = this.boundClassNames = void 0;
                    this.chart = a;
                    this.options = b;
                    this.eventsToUnbind = [];
                    this.container = this.chart.container.getElementsByClassName(this.options.bindingsClassName || "");
                    this.container.length || (this.container = C.getElementsByClassName(this.options.bindingsClassName || ""));
                }
                initEvents() {
                    const a = this,
                        b = a.chart,
                        c = a.container,
                        d = a.options;
                    a.boundClassNames = {};
                    z(d.bindings || {}, (b) => {
                        a.boundClassNames[b.className] = b;
                    });
                    [].forEach.call(c, (b) => {
                        a.eventsToUnbind.push(
                            x(b, "click", (c) => {
                                const d = a.getButtonEvents(b, c);
                                d && !d.button.classList.contains("RBGcharts-disabled-btn") && a.bindingsButtonClick(d.button, d.events, c);
                            })
                        );
                    });
                    z(d.events || {}, (b, c) => {
                        H(b) && a.eventsToUnbind.push(x(a, c, b, { passive: !1 }));
                    });
                    a.eventsToUnbind.push(
                        x(b.container, "click", function (c) {
                            !b.cancelClick && b.isInsidePlot(c.chartX - b.plotLeft, c.chartY - b.plotTop, { visiblePlotOnly: !0 }) && a.bindingsChartClick(this, c);
                        })
                    );
                    a.eventsToUnbind.push(
                        x(
                            b.container,
                            g.isTouchDevice ? "touchmove" : "mousemove",
                            function (b) {
                                a.bindingsContainerMouseMove(this, b);
                            },
                            g.isTouchDevice ? { passive: !1 } : void 0
                        )
                    );
                }
                initUpdate() {
                    const a = this;
                    b.compose(this.chart).navigation.addUpdate((b) => {
                        a.update(b);
                    });
                }
                bindingsButtonClick(a, b, c) {
                    const d = this.chart,
                        k = d.renderer.boxWrapper;
                    let f = !0;
                    this.selectedButtonElement &&
                        (this.selectedButtonElement.classList === a.classList && (f = !1),
                        y(this, "deselectButton", { button: this.selectedButtonElement }),
                        this.nextEvent && (this.currentUserDetails && "annotations" === this.currentUserDetails.coll && d.removeAnnotation(this.currentUserDetails), (this.mouseMoveEvent = this.nextEvent = !1)));
                    f
                        ? ((this.selectedButton = b),
                          (this.selectedButtonElement = a),
                          y(this, "selectButton", { button: a }),
                          b.init && b.init.call(this, a, c),
                          (b.start || b.steps) && d.renderer.boxWrapper.addClass("RBGcharts-draw-mode"))
                        : (d.stockTools && d.stockTools.toggleButtonActiveClass(a), k.removeClass("RBGcharts-draw-mode"), (this.mouseMoveEvent = this.nextEvent = !1), (this.selectedButton = null));
                }
                bindingsChartClick(a, b) {
                    a = this.chart;
                    const d = this.activeAnnotation,
                        k = this.selectedButton;
                    a = a.renderer.boxWrapper;
                    d &&
                        (d.cancelClick || b.activeAnnotation || !b.target.parentNode || c(b.target, ".RBGcharts-popup")
                            ? d.cancelClick &&
                              setTimeout(() => {
                                  d.cancelClick = !1;
                              }, 0)
                            : y(this, "closePopup"));
                    k &&
                        k.start &&
                        (this.nextEvent
                            ? (this.nextEvent(b, this.currentUserDetails),
                              this.steps &&
                                  (this.stepIndex++,
                                  k.steps[this.stepIndex]
                                      ? (this.mouseMoveEvent = this.nextEvent = k.steps[this.stepIndex])
                                      : (y(this, "deselectButton", { button: this.selectedButtonElement }),
                                        a.removeClass("RBGcharts-draw-mode"),
                                        k.end && k.end.call(this, b, this.currentUserDetails),
                                        (this.mouseMoveEvent = this.nextEvent = !1),
                                        (this.selectedButton = null))))
                            : (this.currentUserDetails = k.start.call(this, b)) && k.steps
                            ? ((this.stepIndex = 0), (this.steps = !0), (this.mouseMoveEvent = this.nextEvent = k.steps[this.stepIndex]))
                            : (y(this, "deselectButton", { button: this.selectedButtonElement }),
                              a.removeClass("RBGcharts-draw-mode"),
                              (this.steps = !1),
                              (this.selectedButton = null),
                              k.end && k.end.call(this, b, this.currentUserDetails)));
                }
                bindingsContainerMouseMove(a, b) {
                    this.mouseMoveEvent && this.mouseMoveEvent(b, this.currentUserDetails);
                }
                fieldsToOptions(a, b) {
                    z(a, (a, c) => {
                        const d = parseFloat(a),
                            k = c.split("."),
                            f = k.length - 1;
                        !B(d) || a.match(/px|em/g) || c.match(/format/g) || (a = d);
                        if ("undefined" !== a) {
                            let c = b;
                            k.forEach((b, d) => {
                                const t = G(k[d + 1], "");
                                f === d ? (c[b] = a) : (c[b] || (c[b] = t.match(/\d/g) ? [] : {}), (c = c[b]));
                            });
                        }
                    });
                    return b;
                }
                deselectAnnotation() {
                    this.activeAnnotation && (this.activeAnnotation.setControlPointsVisibility(!1), (this.activeAnnotation = !1));
                }
                annotationToFields(a) {
                    function b(c, d, t, g, h) {
                        let l;
                        t &&
                            c &&
                            -1 === e.indexOf(d) &&
                            (0 <= (t.indexOf && t.indexOf(d)) || t[d] || !0 === t) &&
                            (r(c)
                                ? ((g[d] = []),
                                  c.forEach((a, c) => {
                                      k(a)
                                          ? ((g[d][c] = {}),
                                            z(a, (a, k) => {
                                                b(a, k, f[d], g[d][c], d);
                                            }))
                                          : b(a, 0, f[d], g[d], d);
                                  }))
                                : k(c)
                                ? ((l = {}),
                                  r(g) ? (g.push(l), (l[d] = {}), (l = l[d])) : (g[d] = l),
                                  z(c, (a, c) => {
                                      b(a, c, 0 === d ? t : f[d], l, d);
                                  }))
                                : "format" === d
                                ? (g[d] = [E(c, a.labels[0].points[0]).toString(), "text"])
                                : r(g)
                                ? g.push([c, w(h, c)])
                                : (g[d] = [c, w(d, c)]));
                    }
                    const c = a.options,
                        d = F.annotationsEditable,
                        f = d.nestedOptions,
                        t = G(c.type, c.shapes && c.shapes[0] && c.shapes[0].type, c.labels && c.labels[0] && c.labels[0].type, "label"),
                        e = F.annotationsNonEditable[c.langKey] || [],
                        g = { langKey: c.langKey, type: t };
                    z(c, (a, k) => {
                        "typeOptions" === k
                            ? ((g[k] = {}),
                              z(c[k], (a, c) => {
                                  b(a, c, f, g[k], c);
                              }))
                            : b(a, k, d[t], g, k);
                    });
                    return g;
                }
                getClickedClassNames(a, b) {
                    let c = b.target;
                    b = [];
                    let d;
                    for (; c && c.tagName && ((d = K(c, "class")) && (b = b.concat(d.split(" ").map((a) => [a, c]))), (c = c.parentNode), c !== a); );
                    return b;
                }
                getButtonEvents(a, b) {
                    const c = this;
                    let d;
                    this.getClickedClassNames(a, b).forEach((a) => {
                        c.boundClassNames[a[0]] && !d && (d = { events: c.boundClassNames[a[0]], button: a[1] });
                    });
                    return d;
                }
                update(a) {
                    this.options = t(!0, this.options, a);
                    this.removeEvents();
                    this.initEvents();
                }
                removeEvents() {
                    this.eventsToUnbind.forEach((a) => a());
                }
                destroy() {
                    this.removeEvents();
                }
            }
            F.annotationsEditable = {
                nestedOptions: {
                    labelOptions: ["style", "format", "backgroundColor"],
                    labels: ["style"],
                    label: ["style"],
                    style: ["fontSize", "color"],
                    background: ["fill", "strokeWidth", "stroke"],
                    innerBackground: ["fill", "strokeWidth", "stroke"],
                    outerBackground: ["fill", "strokeWidth", "stroke"],
                    shapeOptions: ["fill", "strokeWidth", "stroke"],
                    shapes: ["fill", "strokeWidth", "stroke"],
                    line: ["strokeWidth", "stroke"],
                    backgroundColors: [!0],
                    connector: ["fill", "strokeWidth", "stroke"],
                    crosshairX: ["strokeWidth", "stroke"],
                    crosshairY: ["strokeWidth", "stroke"],
                },
                circle: ["shapes"],
                ellipse: ["shapes"],
                verticalLine: [],
                label: ["labelOptions"],
                measure: ["background", "crosshairY", "crosshairX"],
                fibonacci: [],
                tunnel: ["background", "line", "height"],
                pitchfork: ["innerBackground", "outerBackground"],
                rect: ["shapes"],
                crookedLine: [],
                basicAnnotation: ["shapes", "labelOptions"],
            };
            F.annotationsNonEditable = { rectangle: ["crosshairX", "crosshairY", "labelOptions"], ellipse: ["labelOptions"], circle: ["labelOptions"] };
            ("");
            return F;
        }
    );
    r(b, "Shared/BaseForm.js", [b["Core/Renderer/HTML/AST.js"], b["Core/Utilities.js"]], function (b, n) {
        const { addEvent: h, createElement: g } = n;
        class e {
            constructor(b, a) {
                this.iconsURL = a;
                this.container = this.createPopupContainer(b);
                this.closeButton = this.addCloseButton();
            }
            createPopupContainer(b, a = "RBGcharts-popup RBGcharts-no-tooltip") {
                return g("div", { className: a }, void 0, b);
            }
                addCloseButton(b = "RBGcharts-popup-close") {
                    const a = this,
                        c = this.iconsURL,
                        d = g("div", { className: b }, void 0, this.container);
                    d.style["background-image"] = "url(" + (c.match(/png|svg|jpeg|jpg|gif/gi) ? c : c + "close.svg") + ")";
                    ["click", "touchstart"].forEach((b) => {
                        h(d, b, a.closeButtonEvents.bind(a));
                    });
                    return d;
                }
                closeButtonEvents() {
                    this.closePopup();
                }
                showPopup(d = "RBGcharts-annotation-toolbar") {
                    const a = this.container,
                        c = this.closeButton;
                    this.type = void 0;
                    a.innerHTML = b.emptyHTML;
                    0 <= a.className.indexOf(d) && (a.classList.remove(d), a.removeAttribute("style"));
                    a.appendChild(c);
                    a.style.display = "block";
                    a.style.height = "";
                }
                closePopup() {
                    this.container.style.display = "none";
                }
            }
            return e;
            });
                r(b, "Extensions/Annotations/Popup/PopupAnnotations.js", [b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, n) {
                    function h(b, m, n, p, v, E) {
                        if (m) {
                            var f = this.addInput,
                                l = this.lang,
                                w,
                                x;
                            u(p, (d, f) => {
                                w = "" !== n ? n + "." + f : f;
                                c(d) && (!a(d) || (a(d) && c(d[0])) ? ((x = l[f] || f), x.match(/\d/g) || v.push([!0, x, b]), h.call(this, b, m, w, d, v, !1)) : v.push([this, w, "annotation", b, d]));
                            });
                            E &&
                                (q(v, (a) => (a[1].match(/format/g) ? -1 : 1)),
                                e && v.reverse(),
                                v.forEach((a) => {
                                    !0 === a[0] ? d("span", { className: "RBGcharts-annotation-title" }, void 0, a[2]).appendChild(g.createTextNode(a[1])) : ((a[4] = { value: a[4][0], type: a[4][1] }), f.apply(a[0], a.splice(1)));
                                }));
                        }
                    }
                    const { doc: g, isFirefox: e } = b,
                        { createElement: d, isArray: a, isObject: c, objectEach: u, pick: p, stableSort: q } = n;
                    return {
                        addForm: function (a, b, c, e) {
                            if (a) {
                                var f = this.container,
                                    m = this.lang,
                                    n = d("h2", { className: "RBGcharts-popup-main-title" }, void 0, f);
                                n.appendChild(g.createTextNode(m[b.langKey] || b.langKey || ""));
                                n = d("div", { className: "RBGcharts-popup-lhs-col RBGcharts-popup-lhs-full" }, void 0, f);
                                var l = d("div", { className: "RBGcharts-popup-bottom-row" }, void 0, f);
                                h.call(this, n, a, "", b, [], !0);
                                this.addButton(l, e ? m.addButton || "Add" : m.saveButton || "Save", e ? "add" : "save", f, c);
                            }
                        },
                        addToolbar: function (a, b, c) {
                            const f = this.lang,
                                e = this.container,
                                h = this.showForm;
                            -1 === e.className.indexOf("RBGcharts-annotation-toolbar") && (e.className += " RBGcharts-annotation-toolbar");
                            a && (e.style.top = a.plotTop + 10 + "px");
                            d("span", void 0, void 0, e).appendChild(g.createTextNode(p(f[b.langKey] || b.langKey, b.shapes && b.shapes[0].type, "")));
                            let m = this.addButton(e, f.removeButton || "Remove", "remove", e, c);
                            m.className += " RBGcharts-annotation-remove-button";
                            m.style["background-image"] = "url(" + this.iconsURL + "destroy.svg)";
                            m = this.addButton(e, f.editButton || "Edit", "edit", e, () => {
                                h.call(this, "annotation-edit", a, b, c);
                            });
                            m.className += " RBGcharts-annotation-edit-button";
                            m.style["background-image"] = "url(" + this.iconsURL + "edit.svg)";
                        },
                    };
                });
                r(
                    b,
                    "Extensions/Annotations/Popup/PopupIndicators.js",
                    [b["Core/Renderer/HTML/AST.js"], b["Core/Globals.js"], b["Extensions/Annotations/NavigationBindingsUtilities.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]],
                    function (b, n, h, g, e) {
                        function d(a) {
                            const b = l("div", { className: "RBGcharts-popup-lhs-col" }, void 0, a);
                            a = l("div", { className: "RBGcharts-popup-rhs-col" }, void 0, a);
                            l("div", { className: "RBGcharts-popup-rhs-col-wrapper" }, void 0, a);
                            return { lhsCol: b, rhsCol: a };
                        }
                        function a(a, d, e, g) {
                            const k = this,
                                t = k.lang,
                                h = d.querySelectorAll(".RBGcharts-popup-lhs-col")[0];
                            d = d.querySelectorAll(".RBGcharts-popup-rhs-col")[0];
                            const z = "edit" === e;
                            e = z ? a.series : a.options.plotOptions || {};
                            if (a || !e) {
                                var n,
                                    G = [];
                                z || x(e) ? x(e) && (G = m.call(this, e)) : (G = f.call(this, e, g));
                                H(G, (a, b) => {
                                    a = a.indicatorFullName.toLowerCase();
                                    b = b.indicatorFullName.toLowerCase();
                                    return a < b ? -1 : a > b ? 1 : 0;
                                });
                                h.children[1] && h.children[1].remove();
                                var q = l("ul", { className: "RBGcharts-indicator-list" }, void 0, h),
                                    p = d.querySelectorAll(".RBGcharts-popup-rhs-col-wrapper")[0];
                                G.forEach((d) => {
                                    const { indicatorFullName: f, indicatorType: e, series: t } = d;
                                    n = l("li", { className: "RBGcharts-indicator-list" }, void 0, q);
                                    n.appendChild(v.createTextNode(f));
                                    ["click", "touchstart"].forEach((d) => {
                                        C(n, d, function () {
                                            const d = p.parentNode.children[1];
                                            {
                                                const d = t.params || t.options.params;
                                                p.innerHTML = b.emptyHTML;
                                                l("h3", { className: "RBGcharts-indicator-title" }, void 0, p).appendChild(v.createTextNode(r(t, e).indicatorFullName));
                                                l("input", { type: "hidden", name: "RBGcharts-type-" + e, value: e }, void 0, p);
                                                A.call(k, e, "series", a, p, t, t.linkedParent && t.linkedParent.options.id);
                                                d.volumeSeriesID && A.call(k, e, "volume", a, p, t, t.linkedParent && d.volumeSeriesID);
                                                c.call(k, a, "params", d, e, p);
                                            }
                                            d && (d.style.display = "block");
                                            z && t.options && l("input", { type: "hidden", name: "RBGcharts-id-" + e, value: t.options.id }, void 0, p).setAttribute("RBGcharts-data-series-id", t.options.id);
                                        });
                                    });
                                });
                                0 < q.childNodes.length ? q.childNodes[0].click() : z || (b.setElementHTML(p.parentNode.children[0], t.noFilterMatch || ""), (p.parentNode.children[1].style.display = "none"));
                            }
                        }
                        function c(a, b, d, f, e) {
                            if (a) {
                                var k = this.addInput;
                                y(d, (d, t) => {
                                    var g = b + "." + t;
                                    w(d) &&
                                        g &&
                                        (K(d) && (k.call(this, g, f, e, {}), c.call(this, a, g, d, f, e)),
                                        g in I ? ((g = p.call(this, f, g, e)), q.call(this, a, b, g, f, t, d)) : "params.volumeSeriesID" === g || x(d) || k.call(this, g, f, e, { value: d, type: "number" }));
                                });
                            }
                        }
                        function u(b, c) {
                            const d = this;
                            var k = c.querySelectorAll(".RBGcharts-popup-lhs-col")[0];
                            c = this.lang.clearFilter;
                            k = l("div", { className: "RBGcharts-input-wrapper" }, void 0, k);
                            const f = this.addInput("searchIndicators", "input", k, { value: "", type: "text", htmlFor: "search-indicators", labelClassName: "RBGcharts-input-search-indicators-label" }),
                                e = l("a", { textContent: c }, void 0, k);
                            f.classList.add("RBGcharts-input-search-indicators");
                            e.classList.add("clear-filter-button");
                            C(f, "input", function (c) {
                                a.call(d, b, d.container, "add", this.value);
                                e.style.display = this.value.length ? "inline-block" : "none";
                            });
                            ["click", "touchstart"].forEach((c) => {
                                C(e, c, function () {
                                    f.value = "";
                                    a.call(d, b, d.container, "add", "");
                                    e.style.display = "none";
                                });
                            });
                        }
                        function p(a, b, c) {
                            var d = b.split(".");
                            d = d[d.length - 1];
                            a = "RBGcharts-" + b + "-type-" + a;
                            const k = this.lang;
                            l("label", { htmlFor: a }, null, c).appendChild(v.createTextNode(k[d] || b));
                            c = l("select", { name: a, className: "RBGcharts-popup-field", id: "RBGcharts-select-" + b }, null, c);
                            c.setAttribute("id", "RBGcharts-select-" + b);
                            return c;
                        }
                        function q(a, b, c, d, f, e, g) {
                            "series" === b || "volume" === b
                                ? a.series.forEach((a) => {
                                    const d = a.options,
                                        k = d.name || d.params ? a.name : d.id || "";
                                    "RBGcharts-navigator-series" !== d.id &&
                                        d.id !== (g && g.options && g.options.id) &&
                                        (w(e) || "volume" !== b || "column" !== a.type || (e = d.id), l("option", { value: d.id }, void 0, c).appendChild(v.createTextNode(k)));
                                })
                                : d &&
                                  f &&
                                  B[f + "-" + d].forEach((a) => {
                                      l("option", { value: a }, void 0, c).appendChild(v.createTextNode(a));
                                  });
                            w(e) && (c.value = e);
                        }
                        function f(a, b) {
                            const c = this.chart && this.chart.options.lang,
                                d = c && c.navigation && c.navigation.popup && c.navigation.popup.indicatorAliases,
                                k = [];
                            let f;
                            y(a, (a, c) => {
                                var e = a && a.options;
                                if (a.params || (e && e.params)) {
                                    const { indicatorFullName: g, indicatorType: t } = r(a, c);
                                    if (b) {
                                        if (((c = b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), (c = new RegExp(c, "i")), (e = (d && d[t] && d[t].join(" ")) || ""), g.match(c) || e.match(c)))
                                            (f = { indicatorFullName: g, indicatorType: t, series: a }), k.push(f);
                                    } else (f = { indicatorFullName: g, indicatorType: t, series: a }), k.push(f);
                                }
                            });
                            return k;
                        }
                        function m(a) {
                            const b = [];
                            a.forEach((a) => {
                                a.is("sma") && b.push({ indicatorFullName: a.name, indicatorType: a.type, series: a });
                            });
                            return b;
                        }
                        function r(a, b) {
                            const c = a.options;
                            let d = (E[b] && E[b].prototype.nameBase) || b.toUpperCase();
                            c && c.type && ((b = a.options.type), (d = a.name));
                            return { indicatorFullName: d, indicatorType: b };
                        }
                        function A(a, b, c, d, f, e) {
                            c && ((a = p.call(this, a, b, d)), q.call(this, c, b, a, void 0, void 0, void 0, f), w(e) && (a.value = e));
                        }
                        const { doc: v } = n,
                            { seriesTypes: E } = g,
                            { addEvent: C, createElement: l, defined: w, isArray: x, isObject: K, objectEach: y, stableSort: H } = e;
                        var I;
                        (function (a) {
                            a[(a["params.algorithm"] = 0)] = "params.algorithm";
                            a[(a["params.average"] = 1)] = "params.average";
                        })(I || (I = {}));
                        const B = { "algorithm-pivotpoints": ["standard", "fibonacci", "camarilla"], "average-disparityindex": ["sma", "ema", "dema", "tema", "wma"] };
                        return {
                            addForm: function (b, c, f) {
                                c = this.lang;
                                let k;
                                if (b) {
                                    this.tabs.init.call(this, b);
                                    var e = this.container.querySelectorAll(".RBGcharts-tab-item-content");
                                    d(e[0]);
                                    u.call(this, b, e[0]);
                                    a.call(this, b, e[0], "add");
                                    k = e[0].querySelectorAll(".RBGcharts-popup-rhs-col")[0];
                                    this.addButton(k, c.addButton || "add", "add", k, f);
                                    d(e[1]);
                                    a.call(this, b, e[1], "edit");
                                    k = e[1].querySelectorAll(".RBGcharts-popup-rhs-col")[0];
                                    this.addButton(k, c.saveButton || "save", "edit", k, f);
                                    this.addButton(k, c.removeButton || "remove", "remove", k, f);
                                }
                            },
                            getAmount: function () {
                                let a = 0;
                                this.series.forEach((b) => {
                                    (b.params || b.options.params) && a++;
                                });
                                return a;
                            },
                        };
                    }
                );
                r(b, "Extensions/Annotations/Popup/PopupTabs.js", [b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, n) {
                    function h() {
                        return u("div", { className: "RBGcharts-tab-item-content RBGcharts-no-mousewheel" }, void 0, this.container);
                    }
                    function g(b, c) {
                        const d = this.container,
                            e = this.lang;
                        let g = "RBGcharts-tab-item";
                        0 === c && (g += " RBGcharts-tab-disabled");
                        c = u("span", { className: g }, void 0, d);
                        c.appendChild(a.createTextNode(e[b + "Button"] || b));
                        c.setAttribute("RBGcharts-data-tab-type", b);
                        return c;
                    }
                    function e(a, b) {
                        const c = this.container.querySelectorAll(".RBGcharts-tab-item-content");
                        a.className += " RBGcharts-tab-item-active";
                        c[b].className += " RBGcharts-tab-item-show";
                    }
                    function d(a) {
                        const b = this;
                        this.container.querySelectorAll(".RBGcharts-tab-item").forEach((d, g) => {
                            (0 === a && "edit" === d.getAttribute("RBGcharts-data-tab-type")) ||
                                ["click", "touchstart"].forEach((a) => {
                                    c(d, a, function () {
                                        {
                                            var a = b.container;
                                            const c = a.querySelectorAll(".RBGcharts-tab-item");
                                            a = a.querySelectorAll(".RBGcharts-tab-item-content");
                                            for (let b = 0; b < c.length; b++) c[b].classList.remove("RBGcharts-tab-item-active"), a[b].classList.remove("RBGcharts-tab-item-show");
                                        }
                                        e.call(b, this, g);
                                    });
                                });
                        });
                    }
                    const { doc: a } = b,
                        { addEvent: c, createElement: u } = n;
                    return {
                        init: function (a) {
                            if (a) {
                                a = this.indicators.getAmount.call(a);
                                var b = g.call(this, "add");
                                g.call(this, "edit", a);
                                h.call(this);
                                h.call(this);
                                d.call(this, a);
                                e.call(this, b, 0);
                            }
                        },
                    };
                });
                r(
                    b,
                    "Extensions/Annotations/Popup/Popup.js",
                    [
                        b["Shared/BaseForm.js"],
                        b["Core/Globals.js"],
                        b["Core/Defaults.js"],
                        b["Extensions/Annotations/Popup/PopupAnnotations.js"],
                        b["Extensions/Annotations/Popup/PopupIndicators.js"],
                        b["Extensions/Annotations/Popup/PopupTabs.js"],
                        b["Core/Utilities.js"],
                    ],
                    function (b, n, h, g, e, d, a) {
                        function c(a, b) {
                            const c = Array.prototype.slice.call(a.querySelectorAll("input")),
                                d = Array.prototype.slice.call(a.querySelectorAll("select")),
                                e = a.querySelectorAll("#RBGcharts-select-series > option:checked")[0];
                            a = a.querySelectorAll("#RBGcharts-select-volume > option:checked")[0];
                            const f = { actionType: b, linkedTo: (e && e.getAttribute("value")) || "", fields: {} };
                            c.forEach((a) => {
                                const b = a.getAttribute("RBGcharts-data-name");
                                a.getAttribute("RBGcharts-data-series-id") ? (f.seriesId = a.value) : b ? (f.fields[b] = a.value) : (f.type = a.value);
                            });
                            d.forEach((a) => {
                                var b = a.id;
                                "RBGcharts-select-series" !== b && "RBGcharts-select-volume" !== b && ((b = b.split("RBGcharts-select-")[1]), (f.fields[b] = a.value));
                            });
                            a && (f.fields["params.volumeSeriesID"] = a.getAttribute("value") || "");
                            return f;
                        }
                        const { doc: u } = n,
                            { getOptions: p } = h,
                            { addEvent: q, createElement: f, extend: m, fireEvent: r, pick: A } = a;
                        class v extends b {
                            constructor(a, b, c) {
                                super(a, b);
                                this.chart = c;
                                this.lang = p().lang.navigation.popup;
                                q(this.container, "mousedown", () => {
                                    const a = c && c.navigationBindings && c.navigationBindings.activeAnnotation;
                                    if (a) {
                                        a.cancelClick = !0;
                                        const b = q(u, "click", () => {
                                            setTimeout(() => {
                                                a.cancelClick = !1;
                                            }, 0);
                                            b();
                                        });
                                    }
                                });
                            }
                            addInput(a, b, c, d) {
                                var e = a.split(".");
                                e = e[e.length - 1];
                                const g = this.lang;
                                b = "RBGcharts-" + b + "-" + A(d.htmlFor, e);
                                e.match(/^\d+$/) || f("label", { htmlFor: b, className: d.labelClassName }, void 0, c).appendChild(u.createTextNode(g[e] || e));
                                c = f("input", { name: b, value: d.value, type: d.type, className: "RBGcharts-popup-field" }, void 0, c);
                                c.setAttribute("RBGcharts-data-name", a);
                                return c;
                            }
                            closeButtonEvents() {
                                if (this.chart) {
                                    const a = this.chart.navigationBindings;
                                    r(a, "closePopup");
                                    a && a.selectedButtonElement && r(a, "deselectButton", { button: a.selectedButtonElement });
                                } else super.closeButtonEvents();
                            }
                            addButton(a, b, d, e, g) {
                                const h = f("button", void 0, void 0, a);
                                h.appendChild(u.createTextNode(b));
                                g &&
                                    ["click", "touchstart"].forEach((a) => {
                                        q(h, a, () => {
                                            this.closePopup();
                                            return g(c(e, d));
                                        });
                                    });
                                return h;
                            }
                            showForm(a, b, c, d) {
                                b &&
                                    (this.showPopup(),
                                    "indicators" === a && this.indicators.addForm.call(this, b, c, d),
                                    "annotation-toolbar" === a && this.annotations.addToolbar.call(this, b, c, d),
                                    "annotation-edit" === a && this.annotations.addForm.call(this, b, c, d),
                                    "flag" === a && this.annotations.addForm.call(this, b, c, d, !0),
                                    (this.type = a),
                                    (this.container.style.height = this.container.offsetHeight + "px"));
                            }
                        }
                        m(v.prototype, { annotations: g, indicators: e, tabs: d });
                        return v;
                    }
                );
                r(b, "Extensions/Annotations/Popup/PopupComposition.js", [b["Extensions/Annotations/Popup/Popup.js"], b["Core/Utilities.js"]], function (b, n) {
                    function h() {
                        this.popup && this.popup.closePopup();
                    }
                    function g(a) {
                        this.popup ||
                            (this.popup = new b(
                                this.chart.container,
                                this.chart.options.navigation.iconsURL || (this.chart.options.stockTools && this.chart.options.stockTools.gui.iconsURL) || "https://code.RBGcharts.com/11.1.0/gfx/stock-icons/",
                                this.chart
                            ));
                        this.popup.showForm(a.formType, this.chart, a.options, a.onSubmit);
                    }
                    function e(a, b) {
                        this.inClass(b.target, "RBGcharts-popup") || a.apply(this, Array.prototype.slice.call(arguments, 1));
                    }
                    const { addEvent: d, wrap: a } = n,
                        c = [];
                    return {
                        compose: function (b, p) {
                            n.pushUnique(c, b) && (d(b, "closePopup", h), d(b, "showPopup", g));
                            n.pushUnique(c, p) && a(p.prototype, "onContainerMouseDown", e);
                        },
                    };
                });
                r(
                    b,
                    "Extensions/Annotations/Annotation.js",
                    [
                        b["Core/Animation/AnimationUtilities.js"],
                        b["Extensions/Annotations/AnnotationChart.js"],
                        b["Extensions/Annotations/AnnotationDefaults.js"],
                        b["Extensions/Annotations/Controllables/ControllableRect.js"],
                        b["Extensions/Annotations/Controllables/ControllableCircle.js"],
                        b["Extensions/Annotations/Controllables/ControllableEllipse.js"],
                        b["Extensions/Annotations/Controllables/ControllablePath.js"],
                        b["Extensions/Annotations/Controllables/ControllableImage.js"],
                        b["Extensions/Annotations/Controllables/ControllableLabel.js"],
                        b["Extensions/Annotations/ControlPoint.js"],
                        b["Extensions/Annotations/ControlTarget.js"],
                        b["Extensions/Annotations/EventEmitter.js"],
                        b["Extensions/Annotations/MockPoint.js"],
                        b["Extensions/Annotations/NavigationBindings.js"],
                        b["Extensions/Annotations/Popup/PopupComposition.js"],
                        b["Core/Utilities.js"],
                    ],
                    function (b, n, h, g, e, d, a, c, r, p, q, f, m, D, A, v) {
                        function u(a) {
                            const b = a.graphic;
                            a = a.points.some((a) => !1 !== a.series.visible && !1 !== a.visible);
                            b && (a ? "hidden" === b.visibility && b.show() : b.hide());
                        }
                        function C(a, b) {
                            const c = {};
                            ["labels", "shapes"].forEach((d) => {
                                const e = a[d];
                                e &&
                                    (c[d] = b[d]
                                        ? I(b[d]).map(function (a, b) {
                                            return y(e[b], a);
                                        })
                                        : a[d]);
                            });
                            return c;
                        }
                        const { getDeferredAnimation: l } = b,
                            { destroyObjectProperties: w, erase: x, fireEvent: H, merge: y, pick: L, splat: I } = v;
                        class B extends f {
                            static compose(b, c, d) {
                                n.compose(B, b, c);
                                r.compose(d);
                                a.compose(b, d);
                                D.compose(B, b);
                                A.compose(D, c);
                            }
                            constructor(a, b) {
                                super();
                                this.coll = "annotations";
                                this.shapesGroup = this.labelsGroup = this.labelCollector = this.group = this.graphic = this.animationConfig = void 0;
                                this.chart = a;
                                this.points = [];
                                this.controlPoints = [];
                                this.coll = "annotations";
                                this.index = -1;
                                this.labels = [];
                                this.shapes = [];
                                this.options = y(this.defaultOptions, b);
                                this.userOptions = b;
                                b = C(this.options, b);
                                this.options.labels = b.labels;
                                this.options.shapes = b.shapes;
                                this.init(a, this.options);
                            }
                            addClipPaths() {
                                this.setClipAxes();
                                this.clipXAxis && this.clipYAxis && this.options.crop && (this.clipRect = this.chart.renderer.clipRect(this.getClipBox()));
                            }
                            addLabels() {
                                const a = this.options.labels || [];
                                a.forEach((b, c) => {
                                    b = this.initLabel(b, c);
                                    y(!0, a[c], b.options);
                                });
                            }
                            addShapes() {
                                const a = this.options.shapes || [];
                                a.forEach((b, c) => {
                                    b = this.initShape(b, c);
                                    y(!0, a[c], b.options);
                                });
                            }
                            destroy() {
                                const a = this.chart,
                                    b = function (a) {
                                        a.destroy();
                                    };
                                this.labels.forEach(b);
                                this.shapes.forEach(b);
                                this.clipYAxis = this.clipXAxis = null;
                                x(a.labelCollectors, this.labelCollector);
                                super.destroy();
                                this.destroyControlTarget();
                                w(this, a);
                            }
                            destroyItem(a) {
                                x(this[a.itemType + "s"], a);
                                a.destroy();
                            }
                            getClipBox() {
                                if (this.clipXAxis && this.clipYAxis) return { x: this.clipXAxis.left, y: this.clipYAxis.top, width: this.clipXAxis.width, height: this.clipYAxis.height };
                            }
                            initProperties(a, b) {
                                this.setOptions(b);
                                const c = C(this.options, b);
                                this.options.labels = c.labels;
                                this.options.shapes = c.shapes;
                                this.chart = a;
                                this.points = [];
                                this.controlPoints = [];
                                this.coll = "annotations";
                                this.userOptions = b;
                                this.labels = [];
                                this.shapes = [];
                            }
                            init(a, b, c = this.index) {
                                a = this.chart;
                                b = this.options.animation;
                                this.index = c;
                                this.linkPoints();
                                this.addControlPoints();
                                this.addShapes();
                                this.addLabels();
                                this.setLabelCollector();
                                this.animationConfig = l(a, b);
                            }
                                initLabel(a, b) {
                                    a = y(this.options.labelOptions, { controlPointOptions: this.options.controlPointOptions }, a);
                                    b = new r(this, a, b);
                                    b.itemType = "label";
                                    this.labels.push(b);
                                    return b;
                                }
                                initShape(a, b) {
                                    a = y(this.options.shapeOptions, { controlPointOptions: this.options.controlPointOptions }, a);
                                    b = new B.shapesMap[a.type](this, a, b);
                                    b.itemType = "shape";
                                    this.shapes.push(b);
                                    return b;
                                }
                                redraw(a) {
                                    this.linkPoints();
                                    this.graphic || this.render();
                                    this.clipRect && this.clipRect.animate(this.getClipBox());
                                    this.redrawItems(this.shapes, a);
                                    this.redrawItems(this.labels, a);
                                    this.redrawControlPoints(a);
                                }
                                redrawItem(a, b) {
                                    a.linkPoints();
                                    a.shouldBeDrawn() ? (a.graphic || this.renderItem(a), a.redraw(L(b, !0) && a.graphic.placed), a.points.length && u(a)) : this.destroyItem(a);
                                }
                                redrawItems(a, b) {
                                    let c = a.length;
                                    for (; c--; ) this.redrawItem(a[c], b);
                                }
                                remove() {
                                    return this.chart.removeAnnotation(this);
                                }
                                render() {
                                    const a = this.chart.renderer;
                                    this.graphic = a
                                        .g("annotation")
                                        .attr({ opacity: 0, zIndex: this.options.zIndex, visibility: this.options.visible ? "inherit" : "hidden" })
                                        .add();
                                    this.shapesGroup = a.g("annotation-shapes").add(this.graphic);
                                    this.options.crop && this.shapesGroup.clip(this.chart.plotBoxClip);
                                    this.labelsGroup = a.g("annotation-labels").attr({ translateX: 0, translateY: 0 }).add(this.graphic);
                                    this.addClipPaths();
                                    this.clipRect && this.graphic.clip(this.clipRect);
                                    this.renderItems(this.shapes);
                                    this.renderItems(this.labels);
                                    this.addEvents();
                                    this.renderControlPoints();
                                }
                                renderItem(a) {
                                    a.render("label" === a.itemType ? this.labelsGroup : this.shapesGroup);
                                }
                                renderItems(a) {
                                    let b = a.length;
                                    for (; b--; ) this.renderItem(a[b]);
                                }
                                setClipAxes() {
                                    const a = this.chart.xAxis,
                                        b = this.chart.yAxis,
                                        c = (this.options.labels || []).concat(this.options.shapes || []).reduce((c, d) => {
                                            d = d && (d.point || (d.points && d.points[0]));
                                            return [a[d && d.xAxis] || c[0], b[d && d.yAxis] || c[1]];
                                        }, []);
                                    this.clipXAxis = c[0];
                                    this.clipYAxis = c[1];
                                }
                                setControlPointsVisibility(a) {
                                    const b = function (b) {
                                        b.setControlPointsVisibility(a);
                                    };
                                    this.controlPoints.forEach((b) => {
                                        b.setVisibility(a);
                                    });
                                    this.shapes.forEach(b);
                                    this.labels.forEach(b);
                                }
                                setLabelCollector() {
                                    const a = this;
                                    a.labelCollector = function () {
                                        return a.labels.reduce(function (a, b) {
                                            b.options.allowOverlap || a.push(b.graphic);
                                            return a;
                                        }, []);
                                    };
                                    a.chart.labelCollectors.push(a.labelCollector);
                                }
                                setOptions(a) {
                                    this.options = y(this.defaultOptions, a);
                                }
                                setVisibility(a) {
                                    const b = this.options,
                                        c = this.chart.navigationBindings,
                                        d = L(a, !b.visible);
                                    this.graphic.attr("visibility", d ? "inherit" : "hidden");
                                    d ||
                                        ((a = function (a) {
                                            a.setControlPointsVisibility(d);
                                        }),
                                        this.shapes.forEach(a),
                                        this.labels.forEach(a),
                                        c.activeAnnotation === this && c.popup && "annotation-toolbar" === c.popup.type && H(c, "closePopup"));
                                    b.visible = d;
                                }
                                update(a, b) {
                                    const c = this.chart,
                                        d = C(this.userOptions, a),
                                        e = c.annotations.indexOf(this);
                                    a = y(!0, this.userOptions, a);
                                    a.labels = d.labels;
                                    a.shapes = d.shapes;
                                    this.destroy();
                                    this.initProperties(c, a);
                                    this.init(c, a);
                                    c.options.annotations[e] = a;
                                    this.isUpdating = !0;
                                    L(b, !0) && c.redraw();
                                    H(this, "afterUpdate");
                                    this.isUpdating = !1;
                                }
                            }
                            B.ControlPoint = p;
                            B.MockPoint = m;
                            B.shapesMap = { rect: g, circle: e, ellipse: d, path: a, image: c };
                            B.types = {};
                            B.prototype.defaultOptions = h;
                            B.prototype.nonDOMEvents = ["add", "afterUpdate", "drag", "remove"];
                            q.compose(B);
                                ("");
                                return B;
                            }
                );
                r(b, "masters/modules/annotations.src.js", [b["Core/Globals.js"], b["Extensions/Annotations/Annotation.js"]], function (b, n) {
                    b.Annotation = n;
                    n.compose(b.Chart, b.Pointer, b.SVGRenderer);
                });
                });
                //# sourceMappingURL=annotations.js.map
