/*
 RBGcharts Javascript v2.3.14 (2021-Jan-01)

 Pareto series type for RBGcharts

 License: allowed to Tata Motors - all Operations
*/
(function (a) {
    "object" === typeof module && module.exports
        ? ((a["default"] = a), (module.exports = a))
        : "function" === typeof define && define.amd
        ? define("RBG_charts/modules/export-data", ["RBG_charts", "RBG_charts/modules/exporting"], function (g) {
            a(g);
            a.RBGcharts = g;
            return a;
        })
        : a("undefined" !== typeof RBGcharts ? RBGcharts : void 0);
})(function (a) {
    function g(a, b, e, c) {
        a.hasOwnProperty(b) || (a[b] = c.apply(null, e));
    }
    a = a ? a._modules : {};
    g(a, "Extensions/DownloadURL.js", [a["Core/Globals.js"]], function (a) {
        var b = a.win,
            e = b.navigator,
            c = b.document,
            g = b.URL || b.webkitURL || b,
            v = /Edge\/\d+/.test(e.userAgent),
            C = (a.dataURLtoBlob = function (f) {
                if ((f = f.replace(/filename=.*;/, "").match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/)) && 3 < f.length && b.atob && b.ArrayBuffer && b.Uint8Array && b.Blob && g.createObjectURL) {
                    var a = b.atob(f[3]),
                        c = new b.ArrayBuffer(a.length);
                    c = new b.Uint8Array(c);
                    for (var e = 0; e < c.length; ++e) c[e] = a.charCodeAt(e);
                    f = new b.Blob([c], { type: f[1] });
                    return g.createObjectURL(f);
                }
            });
        a = a.downloadURL = function (a, n) {
            var f = c.createElement("a");
            if ("string" === typeof a || a instanceof String || !e.msSaveOrOpenBlob) {
                a = "" + a;
                if (v || 2e6 < a.length) if (((a = C(a) || ""), !a)) throw Error("Failed to convert to blob");
                if ("undefined" !== typeof f.download) (f.href = a), (f.download = n), c.body.appendChild(f), f.click(), c.body.removeChild(f);
                else
                    try {
                        var g = b.open(a, "chart");
                        if ("undefined" === typeof g || null === g) throw Error("Failed to open window");
                    } catch (F) {
                        b.location.href = a;
                    }
            } else e.msSaveOrOpenBlob(a, n);
        };
        return { dataURLtoBlob: C, downloadURL: a };
    });
    g(a, "Extensions/ExportData.js", [a["Core/Axis/Axis.js"], a["Core/Chart/Chart.js"], a["Core/Globals.js"], a["Core/Utilities.js"], a["Extensions/DownloadURL.js"]], function (a, b, e, c, g) {
        function v(a, b) {
            var d = n.navigator,
                f = -1 < d.userAgent.indexOf("WebKit") && 0 > d.userAgent.indexOf("Chrome"),
                c = n.URL || n.webkitURL || n;
            try {
                if (d.msSaveOrOpenBlob && n.MSBlobBuilder) {
                    var m = new n.MSBlobBuilder();
                    m.append(a);
                    return m.getBlob("image/svg+xml");
                }
                if (!f) return c.createObjectURL(new n.Blob(["\ufeff" + a], { type: b }));
            } catch (N) { }
        }
        var C = e.doc,
            f = e.seriesTypes,
            n = e.win;
        e = c.addEvent;
        var J = c.defined,
            K = c.extend,
            F = c.find,
            D = c.fireEvent,
            L = c.getOptions,
            M = c.isNumber,
            x = c.pick;
        c = c.setOptions;
        var G = g.downloadURL;
        c({
            exporting: {
                csv: { annotations: { itemDelimiter: "; ", join: !1 }, columnHeaderFormatter: null, dateFormat: "%Y-%m-%d %H:%M:%S", decimalPoint: null, itemDelimiter: null, lineDelimiter: "\n" },
                showTable: !1,
                useMultiLevelHeaders: !0,
                useRowspanHeaders: !0,
            },
            lang: {
                downloadCSV: "Download CSV",
                downloadXLS: "Download XLS",
                exportData: { annotationHeader: "Annotations", categoryHeader: "Category", categoryDatetimeHeader: "DateTime" },
                viewData: "View data table",
                hideData: "Hide data table",
            },
        });
        e(b, "render", function () {
            this.options && this.options.exporting && this.options.exporting.showTable && !this.options.chart.forExport && !this.dataTableDiv && this.viewData();
        });
        b.prototype.setUpKeyToAxis = function () {
            f.arearange && (f.arearange.prototype.keyToAxis = { low: "y", high: "y" });
            f.gantt && (f.gantt.prototype.keyToAxis = { start: "x", end: "x" });
        };
        b.prototype.getDataRows = function (d) {
            var b = this.hasParallelCoordinates,
                f = this.time,
                c = (this.options.exporting && this.options.exporting.csv) || {},
                e = this.xAxis,
                r = {},
                g = [],
                n = [],
                E = [],
                t;
            var u = this.options.lang.exportData;
            var q = u.categoryHeader,
                y = u.categoryDatetimeHeader,
                H = function (k, b, f) {
                    if (c.columnHeaderFormatter) {
                        var h = c.columnHeaderFormatter(k, b, f);
                        if (!1 !== h) return h;
                    }
                    return k ? (k instanceof a ? (k.options.title && k.options.title.text) || (k.dateTime ? y : q) : d ? { columnTitle: 1 < f ? b : k.name, topLevelColumnTitle: k.name } : k.name + (1 < f ? " (" + b + ")" : "")) : q;
                },
                I = function (k, a, b) {
                    var f = {},
                        d = {};
                    a.forEach(function (a) {
                        var c = ((k.keyToAxis && k.keyToAxis[a]) || a) + "Axis";
                        c = M(b) ? k.chart[c][b] : k[c];
                        f[a] = (c && c.categories) || [];
                        d[a] = c && c.dateTime;
                    });
                    return { categoryMap: f, dateTimeValueAxisMap: d };
                },
                z = function (a, b) {
                    return a.data.filter(function (a) {
                        return "undefined" !== typeof a.y && a.name;
                    }).length &&
                        b &&
                        !b.categories &&
                        !a.keyToAxis
                        ? a.pointArrayMap &&
                          a.pointArrayMap.filter(function (a) {
                              return "x" === a;
                          }).length
                            ? (a.pointArrayMap.unshift("x"), a.pointArrayMap)
                            : ["x", "y"]
                        : a.pointArrayMap || ["y"];
                },
                h = [];
            var A = 0;
            this.setUpKeyToAxis();
            this.series.forEach(function (a) {
                var y = a.xAxis,
                    k = a.options.keys || z(a, y),
                    m = k.length,
                    g = !a.requireSorting && {},
                    l = e.indexOf(y),
                    w = I(a, k),
                    q;
                if (!1 !== a.options.includeInDataExport && !a.options.isInternal && !1 !== a.visible) {
                    F(h, function (a) {
                        return a[0] === l;
                    }) || h.push([l, A]);
                    for (q = 0; q < m;) (t = H(a, k[q], k.length)), E.push(t.columnTitle || t), d && n.push(t.topLevelColumnTitle || t), q++;
                    var u = { chart: a.chart, autoIncrement: a.autoIncrement, options: a.options, pointArrayMap: a.pointArrayMap };
                    a.options.data.forEach(function (d, h) {
                        b && (w = I(a, k, h));
                        var z = { series: u };
                        a.pointClass.prototype.applyOptions.apply(z, [d]);
                        d = z.x;
                        var e = a.data[h] && a.data[h].name;
                        q = 0;
                        if (!y || "name" === a.exportKey || (!b && y && y.hasNames && e)) d = e;
                        g && (g[d] && (d += "|" + h), (g[d] = !0));
                        r[d] || ((r[d] = []), (r[d].xValues = []));
                        r[d].x = z.x;
                        r[d].name = e;
                        for (r[d].xValues[l] = z.x; q < m;) (h = k[q]), (e = z[h]), (r[d][A + q] = x(w.categoryMap[h][e], w.dateTimeValueAxisMap[h] ? f.dateFormat(c.dateFormat, e) : null, e)), q++;
                    });
                    A += q;
                }
            });
            for (l in r) Object.hasOwnProperty.call(r, l) && g.push(r[l]);
            var l = d ? [n, E] : [E];
            for (A = h.length; A--;) {
                var p = h[A][0];
                var v = h[A][1];
                var B = e[p];
                g.sort(function (a, d) {
                    return a.xValues[p] - d.xValues[p];
                });
                u = H(B);
                l[0].splice(v, 0, u);
                d && l[1] && l[1].splice(v, 0, u);
                g.forEach(function (a) {
                    var d = a.name;
                    B && !J(d) && (B.dateTime ? (a.x instanceof Date && (a.x = a.x.getTime()), (d = f.dateFormat(c.dateFormat, a.x))) : (d = B.categories ? x(B.names[a.x], B.categories[a.x], a.x) : a.x));
                    a.splice(v, 0, d);
                });
            }
            l = l.concat(g);
            D(this, "exportData", { dataRows: l });
            return l;
        };
        b.prototype.getCSV = function (a) {
            var d = "",
                b = this.getDataRows(),
                c = this.options.exporting.csv,
                f = x(c.decimalPoint, "," !== c.itemDelimiter && a ? (1.1).toLocaleString()[1] : "."),
                e = x(c.itemDelimiter, "," === f ? ";" : ","),
                g = c.lineDelimiter;
            b.forEach(function (a, c) {
                for (var m, w = a.length; w--;) (m = a[w]), "string" === typeof m && (m = '"' + m + '"'), "number" === typeof m && "." !== f && (m = m.toString().replace(".", f)), (a[w] = m);
                d += a.join(e);
                c < b.length - 1 && (d += g);
            });
            return d;
        };
        b.prototype.getTable = function (a) {
            var b = '<table id="RBG_charts-data-table-' + this.index + '">',
                d = this.options,
                c = a ? (1.1).toLocaleString()[1] : ".",
                f = x(d.exporting.useMultiLevelHeaders, !0);
            a = this.getDataRows(f);
            var e = 0,
                g = f ? a.shift() : null,
                n = a.shift(),
                p = function (a, b, d, f) {
                    var e = x(f, "");
                    b = "text" + (b ? " " + b : "");
                    "number" === typeof e ? ((e = e.toString()), "," === c && (e = e.replace(".", c)), (b = "number")) : f || (b = "empty");
                    return "<" + a + (d ? " " + d : "") + ' class="' + b + '">' + e + "</" + a + ">";
                };
            !1 !== d.exporting.tableCaption &&
                (b +=
                    '<caption class="RBG_charts-table-caption">' +
                    x(d.exporting.tableCaption, d.title.text ? d.title.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;") : "Chart") +
                    "</caption>");
            for (var t = 0, u = a.length; t < u; ++t) a[t].length > e && (e = a[t].length);
            b += (function (a, b, c) {
                var e = "<thead>",
                    g = 0;
                c = c || (b && b.length);
                var h,
                    m = 0;
                if ((h = f && a && b)) {
                    a: if (((h = a.length), b.length === h)) {
                        for (; h--;)
                            if (a[h] !== b[h]) {
                                h = !1;
                                break a;
                            }
                        h = !0;
                    } else h = !1;
                    h = !h;
                }
                if (h) {
                    for (e += "<tr>"; g < c; ++g) {
                        h = a[g];
                        var l = a[g + 1];
                        h === l
                            ? ++m
                            : m
                            ? ((e += p("th", "RBG_charts-table-topheading", 'scope="col" colspan="' + (m + 1) + '"', h)), (m = 0))
                            : (h === b[g] ? (d.exporting.useRowspanHeaders ? ((l = 2), delete b[g]) : ((l = 1), (b[g] = ""))) : (l = 1),
                              (e += p("th", "RBG_charts-table-topheading", 'scope="col"' + (1 < l ? ' valign="top" rowspan="' + l + '"' : ""), h)));
                    }
                    e += "</tr>";
                }
                if (b) {
                    e += "<tr>";
                    g = 0;
                    for (c = b.length; g < c; ++g) "undefined" !== typeof b[g] && (e += p("th", null, 'scope="col"', b[g]));
                    e += "</tr>";
                }
                return e + "</thead>";
            })(g, n, Math.max(e, n.length));
            b += "<tbody>";
            a.forEach(function (a) {
                b += "<tr>";
                for (var d = 0; d < e; d++) b += p(d ? "td" : "th", null, d ? "" : 'scope="row"', a[d]);
                b += "</tr>";
            });
            b += "</tbody></table>";
            a = { html: b };
            D(this, "afterGetTable", a);
            return a.html;
        };
        b.prototype.downloadCSV = function () {
            var a = this.getCSV(!0);
            G(v(a, "text/csv") || "data:text/csv,\ufeff" + encodeURIComponent(a), this.getFilename() + ".csv");
        };
        b.prototype.downloadXLS = function () {
            var a =
                '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Ark1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e<style>td{border:none;font-family: Calibri, sans-serif;} .number{mso-number-format:"0.00";} .text{ mso-number-format:"@";}</style><meta name=ProgId content=Excel.Sheet><meta charset=UTF-8></head><body>' +
                this.getTable(!0) +
                "</body></html>";
            G(v(a, "application/vnd.ms-excel") || "data:application/vnd.ms-excel;base64," + n.btoa(unescape(encodeURIComponent(a))), this.getFilename() + ".xls");
        };
        b.prototype.downloadXLS = function (elem) {
            var a =
                '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Ark1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e<style>td{border:none;font-family: Calibri, sans-serif;} .number{mso-number-format:"0.00";} .text{ mso-number-format:"@";}</style><meta name=ProgId content=Excel.Sheet><meta charset=UTF-8></head><body>' +
                elem.html() +
                "</body></html>";
            G(v(a, "application/vnd.ms-excel") || "data:application/vnd.ms-excel;base64," + n.btoa(unescape(encodeURIComponent(a))), this.getFilename() + ".xls");
        };
        b.prototype.viewData = function () {
            this.dataTableDiv ||
                ((this.dataTableDiv = C.createElement("div")),
                (this.dataTableDiv.className = "RBG_charts-data-table"),
                this.renderTo.parentNode.insertBefore(this.dataTableDiv, this.renderTo.nextSibling),
                (this.dataTableDiv.innerHTML = this.getTable()));
          
            if ("" === this.dataTableDiv.style.display || "none" === this.dataTableDiv.style.display) this.dataTableDiv.style.display = "block";
            this.isDataTableVisible = !0;
            D(this, "afterViewData", this.dataTableDiv);
        };
        b.prototype.hideData = function () {
            this.dataTableDiv && "block" === this.dataTableDiv.style.display && (this.dataTableDiv.style.display = "none");
            this.isDataTableVisible = !1;
        };
        b.prototype.toggleDataTable = function () {
            var a = this.exportDivElements,
                b = this.options.exporting;
            b = b && b.buttons && b.buttons.contextButton.menuItems;
            var c = this.options.lang;
            this.isDataTableVisible ? this.hideData() : this.viewData();
            (null === p || void 0 === p ? 0 : p.menuItemDefinitions) &&
                (null === c || void 0 === c ? 0 : c.viewData) &&
                c.hideData &&
                b &&
                a &&
                a.length &&
                (a[b.indexOf("viewData")].innerHTML = this.isDataTableVisible ? c.hideData : c.viewData);
        };
        var p = L().exporting;
        p &&
            (K(p.menuItemDefinitions, {
                downloadCSV: {
                    textKey: "downloadCSV",
                    onclick: function () {
                        this.downloadCSV();
                    },
                },
                downloadXLS: {
                    textKey: "downloadXLS",
                    onclick: function () {
                        this.downloadXLS();
                    },
                },
                //viewData: {
                //    textKey: "viewData",
                //    onclick: function () {
                //        this.toggleDataTable();
                //    },
                //},
            }),
            p.buttons && p.buttons.contextButton.menuItems.push("separator", "downloadCSV", "downloadXLS", "viewData"));
        f.map && (f.map.prototype.exportKey = "name");
        f.mapbubble && (f.mapbubble.prototype.exportKey = "name");
        f.treemap && (f.treemap.prototype.exportKey = "name");
    });
    g(a, "masters/modules/export-data.src.js", [], function () { });
});
//# sourceMappingURL=export-data.js.map
