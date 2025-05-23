﻿/*
 RBGcharts Javascript v2.3.14 (2021-Jan-01)

 Pareto series type for RBGcharts

 License: allowed to Tata Motors - all Operations
*/
var OriginalRBGChartColor;
(function (e) {
    "object" === typeof module && module.exports
        ? ((e["default"] = e), (module.exports = e))
        : "function" === typeof define && define.amd
        ? define("RBG_charts/modules/exporting", ["RBG_charts"], function (q) {
            e(q);
            e.RBGcharts = q;
            return e;
        })
        : e("undefined" !== typeof RBGcharts ? RBGcharts : void 0);
})(function (e) {
    function q(e, l, g, k) {
        e.hasOwnProperty(l) || (e[l] = k.apply(null, g));
    }
    e = e ? e._modules : {};
    q(e, "Extensions/FullScreen.js", [e["Core/Chart/Chart.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function (e, l, g) {
        if (typeof g === "undefined") { return;}
        var k = g.addEvent;
        g = (function () {
            try { this.chart.chartHeight = screen.availHeight; this.chart.redraw();}catch(ex){}
            function e(f) {
                this.chart = f;
                this.isOpen = !1;
                f = f.renderTo;
                this.browserProps ||
                    ("function" === typeof f.requestFullscreen
                        ? (this.browserProps = { fullscreenChange: "fullscreenchange", requestFullscreen: "requestFullscreen", exitFullscreen: "exitFullscreen" })
                        : f.mozRequestFullScreen
                        ? (this.browserProps = { fullscreenChange: "mozfullscreenchange", requestFullscreen: "mozRequestFullScreen", exitFullscreen: "mozCancelFullScreen" })
                        : f.webkitRequestFullScreen
                        ? (this.browserProps = {
                            fullscreenChange: "webkitfullscreenchange",
                            requestFullscreen: "webkitRequestFullScreen",
                            exitFullscreen: "webkitExitFullscreen",
                        })
                        : f.msRequestFullscreen && (this.browserProps = { fullscreenChange: "MSFullscreenChange", requestFullscreen: "msRequestFullscreen", exitFullscreen: "msExitFullscreen" }));

            }
            e.prototype.close = function () {
               
                try { this.chart.chartHeight = hitgh; this.chart.redraw(); } catch (ex) { }
                this.chart.renderTo.style.backgroundColor = OriginalRBGChartColor;
                f = this.chart;
                if (this.isOpen && this.browserProps && f.container.ownerDocument instanceof Document) f.container.ownerDocument[this.browserProps.exitFullscreen]();
                this.unbindFullscreenEvent && this.unbindFullscreenEvent();
                this.isOpen = !1;
                this.setButtonText();
               
            };
            e.prototype.open = function () {
                var f = this,
                    e = f.chart;
               
                OriginalRBGChartColor = e.renderTo.style.backgroundColor;
                e.renderTo.style.backgroundColor = 'white';
               

                if (f.browserProps) {
                    f.unbindFullscreenEvent = k(e.container.ownerDocument, f.browserProps.fullscreenChange, function () {
                        f.isOpen ? ((f.isOpen = !1), f.close()) : ((f.isOpen = !0), f.setButtonText());
                    });
                    var g = e.renderTo[f.browserProps.requestFullscreen]();
                    if (g)
                        g["catch"](function () {
                            alert("Full screen is not supported inside a frame.");
                        });
                    k(e, "destroy", f.unbindFullscreenEvent);
                }
            };
            e.prototype.setButtonText = function () {
                var f,
                    e = this.chart,
                    g = e.exportDivElements,
                    k = e.options.exporting,
                    l = null === (f = null === k || void 0 === k ? void 0 : k.buttons) || void 0 === f ? void 0 : f.contextButton.menuItems;
                f = e.options.lang;
                (null === k || void 0 === k ? 0 : k.menuItemDefinitions) &&
                    (null === f || void 0 === f ? 0 : f.exitFullscreen) &&
                    f.viewFullscreen &&
                    l &&
                    g &&
                    g.length &&
                    (g[l.indexOf("viewFullscreen")].innerHTML = this.isOpen ? f.exitFullscreen : k.menuItemDefinitions.viewFullscreen.text || f.viewFullscreen);
            };
            e.prototype.toggle = function () {
                this.isOpen ? this.close() : this.open();
            };
            return e;
        })();
        l.Fullscreen = g;
        k(e, "beforeRender", function () {
            this.fullscreen = new l.Fullscreen(this);
        });
        return l.Fullscreen;
    });
    q(e, "Mixins/Navigation.js", [], function () {
        return {
            initUpdate: function (e) {
                e.navigation ||
                    (e.navigation = {
                        updates: [],
                        update: function (e, g) {
                            this.updates.forEach(function (k) {
                                k.update.call(k.context, e, g);
                            });
                        },
                    });
            },
            addUpdate: function (e, l) {
                l.navigation || this.initUpdate(l);
                l.navigation.updates.push({ update: e, context: l });
            },
        };
    });
    q(e, "Extensions/Exporting.js", [e["Core/Chart/Chart.js"], e["Mixins/Navigation.js"], e["Core/Globals.js"], e["Core/Options.js"], e["Core/Renderer/SVG/SVGRenderer.js"], e["Core/Utilities.js"]], function (e, l, g, k, q, f) {
        var A = g.doc,
            H = g.isTouchDevice,
            y = g.win;
        k = k.defaultOptions;
        var v = f.addEvent,
            r = f.css,
            x = f.createElement,
            D = f.discardElement,
            z = f.extend,
            I = f.find,
            C = f.fireEvent,
            J = f.isObject,
            p = f.merge,
            E = f.objectEach,
            t = f.pick,
            K = f.removeEvent,
            L = f.uniqueKey,
            F = y.navigator.userAgent,
            G = g.Renderer.prototype.symbols,
            M = /Edge\/|Trident\/|MSIE /.test(F),
            N = /firefox/i.test(F);
        z(k.lang, {
            viewFullscreen: "View in full screen",
            exitFullscreen: "Exit from full screen",
            printChart: "Print chart",
            downloadPNG: "Download PNG image",
            downloadJPEG: "Download JPEG image",
            downloadPDF: "Download PDF document",
            downloadSVG: "Download SVG vector image",
            contextButtonTitle: "Chart context menu",
        });
        k.navigation || (k.navigation = {});
        p(!0, k.navigation, { buttonOptions: { theme: {}, symbolSize: 14, symbolX: 12.5, symbolY: 10.5, align: "right", buttonSpacing: 3, height: 22, verticalAlign: "top", width: 24 } });
        p(!0, k.navigation, {
            menuStyle: { border: "1px solid #999999", background: "#ffffff", padding: "5px 0" },
            menuItemStyle: {
                padding: "0.5em 1em",
                color: "#333333",
                background: "none",
                fontSize: H ? "14px" : "11px",
                transition: "background 250ms, color 250ms",
            },
            menuItemHoverStyle: { background: "#335cad", color: "#ffffff" },
            buttonOptions: { symbolFill: "#666666", symbolStroke: "#666666", symbolStrokeWidth: 3, theme: { padding: 5 } },
        });
        k.exporting = {
            type: "image/png",
            url: "http://tmlpnewskc31137.tmindia.tatamotors.com/RIYA_V03/exportChart.aspx",
            printMaxWidth: 780,
            scale: 2,
            buttons: {
                contextButton: {
                    className: "RBG_charts-contextbutton",
                    menuClassName: "RBG_charts-contextmenu",
                    symbol: "menu",
                    titleKey: "contextButtonTitle",
                    menuItems: "viewFullscreen printChart separator downloadPNG downloadJPEG downloadPDF downloadSVG".split(" "),
                },
            },
            menuItemDefinitions: {
                viewFullscreen: {
                    textKey: "viewFullscreen",
                    onclick: function () {
                        this.fullscreen.toggle();
                    },
                },
                printChart: {
                    textKey: "printChart",
                    onclick: function () {
                        this.print();
                    },
                },
                separator: { separator: !0 },
                downloadPNG: {
                    textKey: "downloadPNG",
                    onclick: function () {
                        alert("This Function is under development");//  this.exportChart();
                    },
                },
                downloadJPEG: {
                    textKey: "downloadJPEG",
                    onclick: function () {
                        alert("This Function is under development");//  this.exportChart({ type: "image/jpeg" });
                    },
                },
                downloadPDF: {
                    textKey: "downloadPDF",
                    onclick: function () {
                        alert("This Function is under development");// this.exportChart({ type: "application/pdf" });
                    },
                },
                downloadSVG: {
                    textKey: "downloadSVG",
                    onclick: function () {
                        alert("This Function is under development");//   this.exportChart({ type: "image/svg+xml" });
                    },
                },
            },
        };
        g.post = function (a, b, c) {
            var d = x("form", p({ method: "post", action: a, enctype: "multipart/form-data" }, c), { display: "none" }, A.body);
            E(b, function (a, b) {
                x("input", { type: "hidden", name: b, value: a }, null, d);
            });
            d.submit();
            D(d);
        };
        g.isSafari &&
            g.win.matchMedia("print").addListener(function (a) {
                g.printingChart && (a.matches ? g.printingChart.beforePrint() : g.printingChart.afterPrint());
            });
        z(e.prototype, {
            sanitizeSVG: function (a, b) {
                var c = a.indexOf("</svg>") + 6,
                    d = a.substr(c);
                a = a.substr(0, c);
                b &&
                    b.exporting &&
                    b.exporting.allowHTML &&
                    d &&
                    ((d = '<foreignObject x="0" y="0" width="' + b.chart.width + '" height="' + b.chart.height + '"><body xmlns="http://www.w3.org/1999/xhtml">' + d.replace(/(<(?:img|br).*?(?=>))>/g, "$1 />") + "</body></foreignObject>"),
                    (a = a.replace("</svg>", d + "</svg>")));
                a = a
                    .replace(/zIndex="[^"]+"/g, "")
                    .replace(/symbolName="[^"]+"/g, "")
                    .replace(/jQuery[0-9]+="[^"]+"/g, "")
                    .replace(/url\(("|&quot;)(.*?)("|&quot;);?\)/g, "url($2)")
                    .replace(/url\([^#]+#/g, "url(#")
                    .replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ')
                    .replace(/ (|NS[0-9]+:)href=/g, " xlink:href=")
                    .replace(/\n/, " ")
                    .replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g, '$1="rgb($2)" $1-opacity="$3"')
                    .replace(/&nbsp;/g, "\u00a0")
                    .replace(/&shy;/g, "\u00ad");
                this.ieSanitizeSVG && (a = this.ieSanitizeSVG(a));
                return a;
            },
            getChartHTML: function () {
                this.styledMode && this.inlineStyles();
                return this.container.innerHTML;
            },
            getSVG: function (a) {
                var b,
                    c = p(this.options, a);
                c.plotOptions = p(this.userOptions.plotOptions, a && a.plotOptions);
                c.time = p(this.userOptions.time, a && a.time);
                var d = x("div", null, { position: "absolute", top: "-9999em", width: this.chartWidth + "px", height: this.chartHeight + "px" }, A.body);
                var f = this.renderTo.style.width;
                var w = this.renderTo.style.height;
                f = c.exporting.sourceWidth || c.chart.width || (/px$/.test(f) && parseInt(f, 10)) || (c.isGantt ? 800 : 600);
                w = c.exporting.sourceHeight || c.chart.height || (/px$/.test(w) && parseInt(w, 10)) || 400;
                z(c.chart, { animation: !1, renderTo: d, forExport: !0, renderer: "SVGRenderer", width: f, height: w });
                c.exporting.enabled = !1;
                delete c.data;
                c.series = [];
                this.series.forEach(function (a) {
                    b = p(a.userOptions, { animation: !1, enableMouseTracking: !1, showCheckbox: !1, visible: a.visible });
                    b.isInternal || c.series.push(b);
                });
                this.axes.forEach(function (a) {
                    a.userOptions.internalKey || (a.userOptions.internalKey = L());
                });
                var g = new e(c, this.callback);
                a &&
                    ["xAxis", "yAxis", "series"].forEach(function (b) {
                        var d = {};
                        a[b] && ((d[b] = a[b]), g.update(d));
                    });
                this.axes.forEach(function (a) {
                    var b = I(g.axes, function (b) {
                        return b.options.internalKey === a.userOptions.internalKey;
                    }),
                        d = a.getExtremes(),
                        c = d.userMin;
                    d = d.userMax;
                    b && (("undefined" !== typeof c && c !== b.min) || ("undefined" !== typeof d && d !== b.max)) && b.setExtremes(c, d, !0, !1);
                });
                f = g.getChartHTML();
                C(this, "getSVG", { chartCopy: g });
                f = this.sanitizeSVG(f, c);
                c = null;
                g.destroy();
                D(d);
                return f;
            },
            getSVGForExport: function (a, b) {
                var c = this.options.exporting;
                return this.getSVG(p({ chart: { borderRadius: 0 } }, c.chartOptions, b, { exporting: { sourceWidth: (a && a.sourceWidth) || c.sourceWidth, sourceHeight: (a && a.sourceHeight) || c.sourceHeight } }));
            },
            getFilename: function () {
                var a = this.userOptions.title && this.userOptions.title.text,
                    b = this.options.exporting.filename;
                if (b) return b.replace(/\//g, "-");
                "string" === typeof a &&
                    (b = a
                        .toLowerCase()
                        .replace(/<\/?[^>]+(>|$)/g, "")
                        .replace(/[\s_]+/g, "-")
                        .replace(/[^a-z0-9\-]/g, "")
                        .replace(/^[\-]+/g, "")
                        .replace(/[\-]+/g, "-")
                        .substr(0, 24)
                        .replace(/[\-]+$/g, ""));
                if (!b || 5 > b.length) b = "chart";
                return b;
            },
            exportChart: function (a, b) {
                b = this.getSVGForExport(a, b);
                a = p(this.options.exporting, a);
                g.post(
                    a.url,
                    {
                        filename: a.filename ? a.filename.replace(/\//g, "-") : this.getFilename(),
                        type: a.type,
                        width: a.width || 0,
                        scale: a.scale,
                        svg: b,
                    },
                    a.formAttributes
                );
            },
            moveContainers: function (a) {
                (this.fixedDiv ? [this.fixedDiv, this.scrollingContainer] : [this.container]).forEach(function (b) {
                    a.appendChild(b);
                });
            },
            beforePrint: function () {
                var a = A.body,
                    b = this.options.exporting.printMaxWidth,
                    c = { childNodes: a.childNodes, origDisplay: [], resetParams: void 0 };
                this.isPrinting = !0;
                this.pointer.reset(null, 0);
                C(this, "beforePrint");
                b && this.chartWidth > b && ((c.resetParams = [this.options.chart.width, void 0, !1]), this.setSize(b, void 0, !1));
                [].forEach.call(c.childNodes, function (a, b) {
                    1 === a.nodeType && ((c.origDisplay[b] = a.style.display), (a.style.display = "none"));
                });
                this.moveContainers(a);
                this.printReverseInfo = c;
            },
            afterPrint: function () {
                if (this.printReverseInfo) {
                    var a = this.printReverseInfo.childNodes,
                        b = this.printReverseInfo.origDisplay,
                        c = this.printReverseInfo.resetParams;
                    this.moveContainers(this.renderTo);
                    [].forEach.call(a, function (a, c) {
                        1 === a.nodeType && (a.style.display = b[c] || "");
                    });
                    this.isPrinting = !1;
                    c && this.setSize.apply(this, c);
                    delete this.printReverseInfo;
                    delete g.printingChart;
                    C(this, "afterPrint");
                }
            },
            print: function () {
                var a = this;
                a.isPrinting ||
                    ((g.printingChart = a),
                    g.isSafari || a.beforePrint(),
                    setTimeout(function () {
                        y.focus();
                        y.print();
                        g.isSafari ||
                            setTimeout(function () {
                                a.afterPrint();
                            }, 1e3);
                    }, 1));
            },
            contextMenu: function (a, b, c, d, e, g, k) {
                var h = this,
                    w = h.options.navigation,
                    l = h.chartWidth,
                    B = h.chartHeight,
                    n = "cache-" + a,
                    m = h[n],
                    u = Math.max(e, g);
                if (!m) {
                    h.exportContextMenu = h[n] = m = x(
                        "div",
                        { className: a },
                        {
                            position: "absolute",
                            zIndex: 1e3,
                            padding: u + "px",
                            pointerEvents: "auto",
                        },
                        h.fixedDiv || h.container
                    );
                    var p = x("ul", { className: "RBG_charts-menu" }, { listStyle: "none", margin: 0, padding: 0 }, m);
                    h.styledMode || r(p, z({ MozBoxShadow: "3px 3px 10px #888", WebkitBoxShadow: "3px 3px 10px #888", boxShadow: "3px 3px 10px #888" }, w.menuStyle));
                    m.hideMenu = function () {
                        r(m, { display: "none" });
                        k && k.setState(0);
                        h.openMenu = !1;
                        r(h.renderTo, { overflow: "hidden" });
                        f.clearTimeout(m.hideTimer);
                        C(h, "exportMenuHidden");
                    };
                    h.exportEvents.push(
                        v(m, "mouseleave", function () {
                            m.hideTimer = y.setTimeout(m.hideMenu, 500);
                        }),
                        v(m, "mouseenter", function () {
                            f.clearTimeout(m.hideTimer);
                        }),
                        v(A, "mouseup", function (b) {
                            h.pointer.inClass(b.target, a) || m.hideMenu();
                        }),
                        v(m, "click", function () {
                            h.openMenu && m.hideMenu();
                        })
                    );
                    b.forEach(function (a) {
                        "string" === typeof a && (a = h.options.exporting.menuItemDefinitions[a]);
                        if (J(a, !0)) {
                            if (a.separator) var b = x("hr", null, null, p);
                            else
                                "viewData" === a.textKey && h.isDataTableVisible && (a.textKey = "hideData"),
                                    (b = x(
                                        "li",
                                        {
                                            className: "RBG_charts-menu-item",
                                            onclick: function (b) {
                                                b && b.stopPropagation();
                                                m.hideMenu();
                                                a.onclick && a.onclick.apply(h, arguments);
                                            },
                                            innerHTML: a.text || h.options.lang[a.textKey],
                                        },
                                        null,
                                        p
                                    )),
                                    h.styledMode ||
                                        ((b.onmouseover = function () {
                                            r(this, w.menuItemHoverStyle);
                                        }),
                                        (b.onmouseout = function () {
                                            r(this, w.menuItemStyle);
                                        }),
                                        r(b, z({ cursor: "pointer" }, w.menuItemStyle)));
                            h.exportDivElements.push(b);
                        }
                    });
                    h.exportDivElements.push(p, m);
                    h.exportMenuWidth = m.offsetWidth;
                    h.exportMenuHeight = m.offsetHeight;
                }
                b = { display: "block" };
                c + h.exportMenuWidth > l ? (b.right = l - c - e - u + "px") : (b.left = c - u + "px");
                d + g + h.exportMenuHeight > B && "top" !== k.alignOptions.verticalAlign ? (b.bottom = B - d - u + "px") : (b.top = d + g - u + "px");
                r(m, b);
                r(h.renderTo, { overflow: "" });
                h.openMenu = !0;
                C(h, "exportMenuShown");
            },
            addButton: function (a) {
                var b = this,
                    c = b.renderer,
                    d = p(b.options.navigation.buttonOptions, a),
                    e = d.onclick,
                    f = d.menuItems,
                    g = d.symbolSize || 12;
                b.btnCount || (b.btnCount = 0);
                b.exportDivElements || ((b.exportDivElements = []), (b.exportSVGElements = []));
                if (!1 !== d.enabled) {
                    var h = d.theme,
                        k = h.states,
                        l = k && k.hover;
                    k = k && k.select;
                    var B;
                    b.styledMode || ((h.fill = t(h.fill, "#ffffff")), (h.stroke = t(h.stroke, "none")));
                    delete h.states;
                    e
                        ? (B = function (a) {
                            a && a.stopPropagation();
                            e.call(b, a);
                        })
                        : f &&
                          (B = function (a) {
                              a && a.stopPropagation();
                              b.contextMenu(n.menuClassName, f, n.translateX, n.translateY, n.width, n.height, n);
                              n.setState(2);
                          });
                    d.text && d.symbol ? (h.paddingLeft = t(h.paddingLeft, 25)) : d.text || z(h, { width: d.width, height: d.height, padding: 0 });
                    b.styledMode || ((h["stroke-linecap"] = "round"), (h.fill = t(h.fill, "#ffffff")), (h.stroke = t(h.stroke, "none")));
                    var n = c
                        .button(d.text, 0, 0, B, h, l, k)
                        .addClass(a.className)
                        .attr({
                            title: t(b.options.lang[d._titleKey || d.titleKey], ""),
                        });
                    n.menuClassName = a.menuClassName || "RBG_charts-menu-" + b.btnCount++;
                    if (d.symbol) {
                        var m = c
                            .symbol(d.symbol, d.symbolX - g / 2, d.symbolY - g / 2, g, g, { width: g, height: g })
                            .addClass("RBG_charts-button-symbol")
                            .attr({ zIndex: 1 })
                            .add(n);
                        b.styledMode || m.attr({ stroke: d.symbolStroke, fill: d.symbolFill, "stroke-width": d.symbolStrokeWidth || 1 });
                    }
                    n.add(b.exportingGroup).align(z(d, { width: n.width, x: t(d.x, b.buttonOffset) }), !0, "spacingBox");
                    b.buttonOffset += (n.width + d.buttonSpacing) * ("right" === d.align ? -1 : 1);
                    b.exportSVGElements.push(n, m);
                }
            },
            destroyExport: function (a) {
                var b = a ? a.target : this;
                a = b.exportSVGElements;
                var c = b.exportDivElements,
                    d = b.exportEvents,
                    e;
                a &&
                    (a.forEach(function (a, d) {
                        a && ((a.onclick = a.ontouchstart = null), (e = "cache-" + a.menuClassName), b[e] && delete b[e], (b.exportSVGElements[d] = a.destroy()));
                    }),
                    (a.length = 0));
                b.exportingGroup && (b.exportingGroup.destroy(), delete b.exportingGroup);
                c &&
                    (c.forEach(function (a, d) {
                        f.clearTimeout(a.hideTimer);
                        K(a, "mouseleave");
                        b.exportDivElements[d] = a.onmouseout = a.onmouseover = a.ontouchstart = a.onclick = null;
                        D(a);
                    }),
                    (c.length = 0));
                d &&
                    (d.forEach(function (a) {
                        a();
                    }),
                    (d.length = 0));
            },
        });
        q.prototype.inlineToAttributes = "fill stroke strokeLinecap strokeLinejoin strokeWidth textAnchor x y".split(" ");
        q.prototype.inlineBlacklist = [/-/, /^(clipPath|cssText|d|height|width)$/, /^font$/, /[lL]ogical(Width|Height)$/, /perspective/, /TapHighlightColor/, /^transition/, /^length$/];
        q.prototype.unstyledElements = ["clipPath", "defs", "desc"];
        e.prototype.inlineStyles = function () {
            function a(a) {
                return a.replace(/([A-Z])/g, function (a, b) {
                    return "-" + b.toLowerCase();
                });
            }
            function b(c) {
                function n(b, g) {
                    u = q = !1;
                    if (f) {
                        for (r = f.length; r-- && !q;) q = f[r].test(g);
                        u = !q;
                    }
                    "transform" === g && "none" === b && (u = !0);
                    for (r = e.length; r-- && !u;) u = e[r].test(g) || "function" === typeof b;
                    u || (w[g] === b && "svg" !== c.nodeName) || h[c.nodeName][g] === b || (d && -1 === d.indexOf(g) ? (m += a(g) + ":" + b + ";") : b && c.setAttribute(a(g), b));
                }
                var m = "",
                    u,
                    q,
                    r;
                if (1 === c.nodeType && -1 === g.indexOf(c.nodeName)) {
                    var t = y.getComputedStyle(c, null);
                    var w = "svg" === c.nodeName ? {} : y.getComputedStyle(c.parentNode, null);
                    if (!h[c.nodeName]) {
                        k = l.getElementsByTagName("svg")[0];
                        var v = l.createElementNS(c.namespaceURI, c.nodeName);
                        k.appendChild(v);
                        h[c.nodeName] = p(y.getComputedStyle(v, null));
                        "text" === c.nodeName && delete h.text.fill;
                        k.removeChild(v);
                    }
                    if (N || M) for (var x in t) n(t[x], x);
                    else E(t, n);
                    m && ((t = c.getAttribute("style")), c.setAttribute("style", (t ? t + ";" : "") + m));
                    "svg" === c.nodeName && c.setAttribute("stroke-width", "1px");
                    "text" !== c.nodeName && [].forEach.call(c.children || c.childNodes, b);
                }
            }
            var c = this.renderer,
                d = c.inlineToAttributes,
                e = c.inlineBlacklist,
                f = c.inlineWhitelist,
                g = c.unstyledElements,
                h = {},
                k;
            c = A.createElement("iframe");
            r(c, { width: "1px", height: "1px", visibility: "hidden" });
            A.body.appendChild(c);
            var l = c.contentWindow.document;
            l.open();
            l.write('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
            l.close();
            b(this.container.querySelector("svg"));
            k.parentNode.remove();
            c.remove();
        };
        G.menu = function (a, b, c, d) {
            return [
                ["M", a, b + 2.5],
                ["L", a + c, b + 2.5],
                ["M", a, b + d / 2 + 0.5],
                ["L", a + c, b + d / 2 + 0.5],
                ["M", a, b + d - 1.5],
                ["L", a + c, b + d - 1.5],
            ];
        };
        G.menuball = function (a, b, c, d) {
            a = [];
            d = d / 3 - 2;
            return (a = a.concat(this.circle(c - d, b, d, d), this.circle(c - d, b + d + 4, d, d), this.circle(c - d, b + 2 * (d + 4), d, d)));
        };
        e.prototype.renderExporting = function () {
            var a = this,
                b = a.options.exporting,
                c = b.buttons,
                d = a.isDirtyExporting || !a.exportSVGElements;
            a.buttonOffset = 0;
            a.isDirtyExporting && a.destroyExport();
            d &&
                !1 !== b.enabled &&
                ((a.exportEvents = []),
                (a.exportingGroup = a.exportingGroup || a.renderer.g("exporting-group").attr({ zIndex: 3 }).add()),
                E(c, function (b) {
                    a.addButton(b);
                }),
                (a.isDirtyExporting = !1));
            v(a, "destroy", a.destroyExport);
        };
        v(e, "init", function () {
            var a = this;
            a.exporting = {
                update: function (b, c) {
                    a.isDirtyExporting = !0;
                    p(!0, a.options.exporting, b);
                    t(c, !0) && a.redraw();
                },
            };
            l.addUpdate(function (b, c) {
                a.isDirtyExporting = !0;
                p(!0, a.options.navigation, b);
                t(c, !0) && a.redraw();
            }, a);
        });
        e.prototype.callbacks.push(function (a) {
            a.renderExporting();
            v(a, "redraw", a.renderExporting);
        });
    });
    q(e, "masters/modules/exporting.src.js", [], function () { });
});
//# sourceMappingURL=exporting.js.map
