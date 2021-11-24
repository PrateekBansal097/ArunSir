if (!AmCharts) var AmCharts = {};
AmCharts.inheriting = {};
AmCharts.Class = function(e) {
    var t = function() {
        arguments[0] !== AmCharts.inheriting && (this.events = {}, this.construct.apply(this, arguments))
    };
    e.inherits ? (t.prototype = new e.inherits(AmCharts.inheriting), t.base = e.inherits.prototype, delete e.inherits) : (t.prototype.createEvents = function() {
        for (var e = 0, t = arguments.length; e < t; e++) this.events[arguments[e]] = []
    }, t.prototype.listenTo = function(e, t, n) {
        e.events[t].push({
            handler: n,
            scope: this
        })
    }, t.prototype.addListener = function(e, t, n) {
        this.events[e].push({
            handler: t,
            scope: n
        })
    }, t.prototype.removeListener = function(e, t, n) {
        e = e.events[t];
        for (t = e.length - 1; 0 <= t; t--) e[t].handler === n && e.splice(t, 1)
    }, t.prototype.fire = function(e, t) {
        for (var n = this.events[e], r = 0, i = n.length; r < i; r++) {
            var s = n[r];
            s.handler.call(s.scope, t)
        }
    });
    for (var n in e) t.prototype[n] = e[n];
    return t
};
AmCharts.charts = [];
AmCharts.addChart = function(e) {
    AmCharts.charts.push(e)
};
AmCharts.removeChart = function(e) {
    for (var t = AmCharts.charts, n = t.length - 1; 0 <= n; n--) t[n] == e && t.splice(n, 1)
};
AmCharts.IEversion = 0; - 1 != navigator.appVersion.indexOf("MSIE") && document.documentMode && (AmCharts.IEversion = Number(document.documentMode));
if (document.addEventListener || window.opera) AmCharts.isNN = !0, AmCharts.isIE = !1, AmCharts.dx = .5, AmCharts.dy = .5;
document.attachEvent && (AmCharts.isNN = !1, AmCharts.isIE = !0, 9 > AmCharts.IEversion && (AmCharts.dx = 0, AmCharts.dy = 0));
window.chrome && (AmCharts.chrome = !0);
AmCharts.handleResize = function() {
    for (var e = AmCharts.charts, t = 0; t < e.length; t++) {
        var n = e[t];
        n && n.div && n.handleResize()
    }
};
AmCharts.handleMouseUp = function(e) {
    for (var t = AmCharts.charts, n = 0; n < t.length; n++) {
        var r = t[n];
        r && r.handleReleaseOutside(e)
    }
};
AmCharts.handleMouseMove = function(e) {
    for (var t = AmCharts.charts, n = 0; n < t.length; n++) {
        var r = t[n];
        r && r.handleMouseMove(e)
    }
};
AmCharts.resetMouseOver = function() {
    for (var e = AmCharts.charts, t = 0; t < e.length; t++) {
        var n = e[t];
        n && (n.mouseIsOver = !1)
    }
};
AmCharts.onReadyArray = [];
AmCharts.ready = function(e) {
    AmCharts.onReadyArray.push(e)
};
AmCharts.handleLoad = function() {
    for (var e = AmCharts.onReadyArray, t = 0; t < e.length; t++)(0, e[t])()
};
AmCharts.useUTC = !1;
AmCharts.updateRate = 40;
AmCharts.uid = 0;
AmCharts.getUniqueId = function() {
    AmCharts.uid++;
    return "AmChartsEl-" + AmCharts.uid
};
AmCharts.isNN && (document.addEventListener("mousemove", AmCharts.handleMouseMove, !0), window.addEventListener("resize", AmCharts.handleResize, !0), document.addEventListener("mouseup", AmCharts.handleMouseUp, !0), window.addEventListener("load", AmCharts.handleLoad, !0));
AmCharts.isIE && (document.attachEvent("onmousemove", AmCharts.handleMouseMove), window.attachEvent("onresize", AmCharts.handleResize), document.attachEvent("onmouseup", AmCharts.handleMouseUp), window.attachEvent("onload", AmCharts.handleLoad));
AmCharts.clear = function() {
    var e = AmCharts.charts;
    if (e)
        for (var t = 0; t < e.length; t++) e[t].clear();
    AmCharts.charts = null;
    AmCharts.isNN && (document.removeEventListener("mousemove", AmCharts.handleMouseMove, !0), window.removeEventListener("resize", AmCharts.handleResize, !0), document.removeEventListener("mouseup", AmCharts.handleMouseUp, !0), window.removeEventListener("load", AmCharts.handleLoad, !0));
    AmCharts.isIE && (document.detachEvent("onmousemove", AmCharts.handleMouseMove), window.detachEvent("onresize", AmCharts.handleResize), document.detachEvent("onmouseup", AmCharts.handleMouseUp), window.detachEvent("onload", AmCharts.handleLoad))
};
AmCharts.AmChart = AmCharts.Class({
    construct: function() {
        this.version = "2.10.2";
        AmCharts.addChart(this);
        this.createEvents("dataUpdated", "init", "rendered");
        this.height = this.width = "100%";
        this.dataChanged = !0;
        this.chartCreated = !1;
        this.previousWidth = this.previousHeight = 0;
        this.backgroundColor = "#FFFFFF";
        this.borderAlpha = this.backgroundAlpha = 0;
        this.color = this.borderColor = "#000000";
        this.fontFamily = "Verdana";
        this.fontSize = 11;
        this.numberFormatter = {
            precision: -1,
            decimalSeparator: ".",
            thousandsSeparator: ","
        };
        this.percentFormatter = {
            precision: 2,
            decimalSeparator: ".",
            thousandsSeparator: ","
        };
        this.labels = [];
        this.allLabels = [];
        this.titles = [];
        this.marginRight = this.marginLeft = this.autoMarginOffset = 0;
        this.timeOuts = [];
        var e = document.createElement("div"),
            t = e.style;
        t.overflow = "hidden";
        t.position = "relative";
        t.textAlign = "left";
        this.chartDiv = e;
        e = document.createElement("div");
        t = e.style;
        t.overflow = "hidden";
        t.position = "relative";
        t.textAlign = "left";
        this.legendDiv = e;
        this.balloon = new AmCharts.AmBalloon;
        this.balloon.chart = this;
        this.titleHeight = 0;
        this.prefixesOfBigNumbers = [{
            number: 1e3,
            prefix: "k"
        }, {
            number: 1e6,
            prefix: "M"
        }, {
            number: 1e9,
            prefix: "G"
        }, {
            number: 1e12,
            prefix: "T"
        }, {
            number: 1e15,
            prefix: "P"
        }, {
            number: 1e18,
            prefix: "E"
        }, {
            number: 1e21,
            prefix: "Z"
        }, {
            number: 1e24,
            prefix: "Y"
        }];
        this.prefixesOfSmallNumbers = [{
            number: 1e-24,
            prefix: "y"
        }, {
            number: 1e-21,
            prefix: "z"
        }, {
            number: 1e-18,
            prefix: "a"
        }, {
            number: 1e-15,
            prefix: "f"
        }, {
            number: 1e-12,
            prefix: "p"
        }, {
            number: 1e-9,
            prefix: "n"
        }, {
            number: 1e-6,
            prefix: "μ"
        }, {
            number: .001,
            prefix: "m"
        }];
        this.panEventsEnabled = !1;
        AmCharts.bezierX = 3;
        AmCharts.bezierY = 6;
        this.product = "amcharts"
    },
    drawChart: function() {
        this.drawBackground();
        this.redrawLabels();
        this.drawTitles()
    },
    drawBackground: function() {
        AmCharts.remove(this.background);
        var e = this.container,
            t = this.backgroundColor,
            n = this.backgroundAlpha,
            r = this.set,
            i = this.updateWidth();
        this.realWidth = i;
        var s = this.updateHeight();
        this.realHeight = s;
        this.background = t = AmCharts.polygon(e, [0, i - 1, i - 1, 0], [0, 0, s - 1, s - 1], t, n, 1, this.borderColor, this.borderAlpha);
        r.push(t);
        if (t = this.backgroundImage) this.path && (t = this.path + t), this.bgImg = e = e.image(t, 0, 0, i, s), r.push(e)
    },
    drawTitles: function() {
        var e = this.titles;
        if (AmCharts.ifArray(e)) {
            var t = 20,
                n;
            for (n = 0; n < e.length; n++) {
                var r = e[n],
                    i = r.color;
                void 0 === i && (i = this.color);
                var s = r.size;
                isNaN(r.alpha);
                var o = this.marginLeft,
                    i = AmCharts.text(this.container, r.text, i, this.fontFamily, s);
                i.translate(o + (this.realWidth - this.marginRight - o) / 2, t);
                o = !0;
                void 0 !== r.bold && (o = r.bold);
                o && i.attr({
                    "font-weight": "bold"
                });
                t += s + 6;
                this.freeLabelsSet.push(i)
            }
        }
    },
    write: function(e) {
        var t = this.balloon;
        t && !t.chart && (t.chart = this);
        e = "object" != typeof e ? document.getElementById(e) : e;
        e.innerHTML = "";
        this.div = e;
        e.style.overflow = "hidden";
        e.style.textAlign = "left";
        var t = this.chartDiv,
            n = this.legendDiv,
            r = this.legend,
            i = n.style,
            s = t.style;
        this.measure();
        var o, u;
        if (r) switch (r.position) {
            case "bottom":
                e.appendChild(t);
                e.appendChild(n);
                break;
            case "top":
                e.appendChild(n);
                e.appendChild(t);
                break;
            case "absolute":
                o = document.createElement("div");
                u = o.style;
                u.position = "relative";
                u.width = e.style.width;
                u.height = e.style.height;
                e.appendChild(o);
                i.position = "absolute";
                s.position = "absolute";
                void 0 !== r.left && (i.left = r.left + "px");
                void 0 !== r.right && (i.right = r.right + "px");
                void 0 !== r.top && (i.top = r.top + "px");
                void 0 !== r.bottom && (i.bottom = r.bottom + "px");
                r.marginLeft = 0;
                r.marginRight = 0;
                o.appendChild(t);
                o.appendChild(n);
                break;
            case "right":
                o = document.createElement("div");
                u = o.style;
                u.position = "relative";
                u.width = e.style.width;
                u.height = e.style.height;
                e.appendChild(o);
                i.position = "relative";
                s.position = "absolute";
                o.appendChild(t);
                o.appendChild(n);
                break;
            case "left":
                o = document.createElement("div");
                u = o.style;
                u.position = "relative";
                u.width = e.style.width;
                u.height = e.style.height;
                e.appendChild(o);
                i.position = "absolute";
                s.position = "relative";
                o.appendChild(t);
                o.appendChild(n);
                break;
            case "outside":
                e.appendChild(t)
        } else e.appendChild(t);
        this.listenersAdded || (this.addListeners(), this.listenersAdded = !0);
        this.initChart()
    },
    createLabelsSet: function() {
        AmCharts.remove(this.labelsSet);
        this.labelsSet = this.container.set();
        this.freeLabelsSet.push(this.labelsSet)
    },
    initChart: function() {
        this.divIsFixed = AmCharts.findIfFixed(this.chartDiv);
        this.previousHeight = this.divRealHeight;
        this.previousWidth = this.divRealWidth;
        this.destroy();
        var e = 0;
        document.attachEvent && !window.opera && (e = 1);
        this.dmouseX = this.dmouseY = 0;
        var t = document.getElementsByTagName("html")[0];
        if (t && window.getComputedStyle && (t = window.getComputedStyle(t, null))) this.dmouseY = AmCharts.removePx(t.getPropertyValue("margin-top")), this.dmouseX = AmCharts.removePx(t.getPropertyValue("margin-left"));
        this.mouseMode = e;
        this.container = new AmCharts.AmDraw(this.chartDiv, this.realWidth, this.realHeight);
        if (AmCharts.VML || AmCharts.SVG) e = this.container, this.set = e.set(), this.gridSet = e.set(), this.graphsBehindSet = e.set(), this.bulletBehindSet = e.set(), this.columnSet = e.set(), this.graphsSet = e.set(), this.trendLinesSet = e.set(), this.axesLabelsSet = e.set(), this.axesSet = e.set(), this.cursorSet = e.set(), this.scrollbarsSet = e.set(), this.bulletSet = e.set(), this.freeLabelsSet = e.set(), this.balloonsSet = e.set(), this.balloonsSet.setAttr("id", "balloons"), this.zoomButtonSet = e.set(), this.linkSet = e.set(), this.drb(), this.renderFix()
    },
    measure: function() {
        var e = this.div,
            t = this.chartDiv,
            n = e.offsetWidth,
            r = e.offsetHeight,
            i = this.container;
        e.clientHeight && (n = e.clientWidth, r = e.clientHeight);
        var s = AmCharts.removePx(AmCharts.getStyle(e, "padding-left")),
            o = AmCharts.removePx(AmCharts.getStyle(e, "padding-right")),
            u = AmCharts.removePx(AmCharts.getStyle(e, "padding-top")),
            a = AmCharts.removePx(AmCharts.getStyle(e, "padding-bottom"));
        isNaN(s) || (n -= s);
        isNaN(o) || (n -= o);
        isNaN(u) || (r -= u);
        isNaN(a) || (r -= a);
        s = e.style;
        e = s.width;
        s = s.height; - 1 != e.indexOf("px") && (n = AmCharts.removePx(e)); - 1 != s.indexOf("px") && (r = AmCharts.removePx(s));
        e = AmCharts.toCoordinate(this.width, n);
        s = AmCharts.toCoordinate(this.height, r);
        if (e != this.previousWidth || s != this.previousHeight) t.style.width = e + "px", t.style.height = s + "px", i && i.setSize(e, s), this.balloon.setBounds(2, 2, e - 2, s);
        this.realWidth = e;
        this.realHeight = s;
        this.divRealWidth = n;
        this.divRealHeight = r
    },
    destroy: function() {
        this.chartDiv.innerHTML = "";
        this.clearTimeOuts()
    },
    clearTimeOuts: function() {
        var e = this.timeOuts;
        if (e) {
            var t;
            for (t = 0; t < e.length; t++) clearTimeout(e[t])
        }
        this.timeOuts = []
    },
    clear: function(e) {
        AmCharts.callMethod("clear", [this.chartScrollbar, this.scrollbarV, this.scrollbarH, this.chartCursor]);
        this.chartCursor = this.scrollbarH = this.scrollbarV = this.chartScrollbar = null;
        this.clearTimeOuts();
        this.container && (this.container.remove(this.chartDiv), this.container.remove(this.legendDiv));
        e || AmCharts.removeChart(this)
    },
    setMouseCursor: function(e) {
        "auto" == e && AmCharts.isNN && (e = "default");
        this.chartDiv.style.cursor = e;
        this.legendDiv.style.cursor = e
    },
    redrawLabels: function() {
        this.labels = [];
        var e = this.allLabels;
        this.createLabelsSet();
        var t;
        for (t = 0; t < e.length; t++) this.drawLabel(e[t])
    },
    drawLabel: function(e) {
        if (this.container) {
            var t = e.y,
                n = e.text,
                r = e.align,
                i = e.size,
                s = e.color,
                o = e.rotation,
                u = e.alpha,
                a = e.bold,
                f = AmCharts.toCoordinate(e.x, this.realWidth),
                t = AmCharts.toCoordinate(t, this.realHeight);
            f || (f = 0);
            t || (t = 0);
            void 0 === s && (s = this.color);
            isNaN(i) && (i = this.fontSize);
            r || (r = "start");
            "left" == r && (r = "start");
            "right" == r && (r = "end");
            "center" == r && (r = "middle", o ? t = this.realHeight - t + t / 2 : f = this.realWidth / 2 - f);
            void 0 === u && (u = 1);
            void 0 === o && (o = 0);
            t += i / 2;
            n = AmCharts.text(this.container, n, s, this.fontFamily, i, r, a, u);
            n.translate(f, t);
            0 !== o && n.rotate(o);
            e.url && (n.setAttr("cursor", "pointer"), n.click(function() {
                AmCharts.getURL(e.url)
            }));
            this.labelsSet.push(n);
            this.labels.push(n)
        }
    },
    addLabel: function(e, t, n, r, i, s, o, u, a, f) {
        e = {
            x: e,
            y: t,
            text: n,
            align: r,
            size: i,
            color: s,
            alpha: u,
            rotation: o,
            bold: a,
            url: f
        };
        this.container && this.drawLabel(e);
        this.allLabels.push(e)
    },
    clearLabels: function() {
        var e = this.labels,
            t;
        for (t = e.length - 1; 0 <= t; t--) e[t].remove();
        this.labels = [];
        this.allLabels = []
    },
    updateHeight: function() {
        var e = this.divRealHeight,
            t = this.legend;
        if (t) {
            var n = this.legendDiv.offsetHeight,
                t = t.position;
            if ("top" == t || "bottom" == t) e -= n, 0 > e && (e = 0), this.chartDiv.style.height = e + "px"
        }
        return e
    },
    updateWidth: function() {
        var e = this.divRealWidth,
            t = this.divRealHeight,
            n = this.legend;
        if (n) {
            var r = this.legendDiv,
                i = r.offsetWidth,
                s = r.offsetHeight,
                r = r.style,
                o = this.chartDiv.style,
                n = n.position;
            if ("right" == n || "left" == n) e -= i, 0 > e && (e = 0), o.width = e + "px", "left" == n ? o.left = i + "px" : r.left = e + "px", r.top = (t - s) / 2 + "px"
        }
        return e
    },
    getTitleHeight: function() {
        var e = 0,
            t = this.titles;
        if (0 < t.length) {
            var e = 15,
                n;
            for (n = 0; n < t.length; n++) e += t[n].size + 6
        }
        return e
    },
    addTitle: function(e, t, n, r, i) {
        isNaN(t) && (t = this.fontSize + 1);
        e = {
            text: e,
            size: 12,
            color: n,
            alpha: r,
            bold: i
        };
        this.titles.push(e);
        return e
    },
    addListeners: function() {
        var e = this,
            t = e.chartDiv;
        AmCharts.isNN && (e.panEventsEnabled && "ontouchstart" in document.documentElement && (t.addEventListener("touchstart", function(t) {
            e.handleTouchMove.call(e, t);
            e.handleTouchStart.call(e, t)
        }, !0), t.addEventListener("touchmove", function(t) {
            e.handleTouchMove.call(e, t)
        }, !0), t.addEventListener("touchend", function(t) {
            e.handleTouchEnd.call(e, t)
        }, !0)), t.addEventListener("mousedown", function(t) {
            e.handleMouseDown.call(e, t)
        }, !0), t.addEventListener("mouseover", function(t) {
            e.handleMouseOver.call(e, t)
        }, !0), t.addEventListener("mouseout", function(t) {
            e.handleMouseOut.call(e, t)
        }, !0));
        AmCharts.isIE && (t.attachEvent("onmousedown", function(t) {
            e.handleMouseDown.call(e, t)
        }), t.attachEvent("onmouseover", function(t) {
            e.handleMouseOver.call(e, t)
        }), t.attachEvent("onmouseout", function(t) {
            e.handleMouseOut.call(e, t)
        }))
    },
    dispDUpd: function() {
        var e;
        this.dispatchDataUpdated && (this.dispatchDataUpdated = !1, e = "dataUpdated", this.fire(e, {
            type: e,
            chart: this
        }));
        this.chartCreated || (e = "init", this.fire(e, {
            type: e,
            chart: this
        }));
        this.chartRendered || (e = "rendered", this.fire(e, {
            type: e,
            chart: this
        }), this.chartRendered = !0)
    },
    drb: function() {
        var e = this.product,
            t = e + ".com",
            n = window.location.hostname.split("."),
            r;
        2 <= n.length && (r = n[n.length - 2] + "." + n[n.length - 1]);
        AmCharts.remove(this.bbset);
        if (r != t) {}
    },
    validateSize: function() {
        var e = this;
        e.measure();
        var t = e.legend;
        if ((e.realWidth != e.previousWidth || e.realHeight != e.previousHeight) && 0 < e.realWidth && 0 < e.realHeight) {
            e.sizeChanged = !0;
            if (t) {
                clearTimeout(e.legendInitTO);
                var n = setTimeout(function() {
                    t.invalidateSize()
                }, 100);
                e.timeOuts.push(n);
                e.legendInitTO = n
            }
            e.marginsUpdated = "xy" != e.chartType ? !1 : !0;
            clearTimeout(e.initTO);
            n = setTimeout(function() {
                e.initChart()
            }, 150);
            e.timeOuts.push(n);
            e.initTO = n
        }
        e.renderFix();
        t && t.renderFix()
    },
    invalidateSize: function() {
        this.previousHeight = this.previousWidth = NaN;
        this.invalidateSizeReal()
    },
    invalidateSizeReal: function() {
        var e = this;
        e.marginsUpdated = !1;
        clearTimeout(e.validateTO);
        var t = setTimeout(function() {
            e.validateSize()
        }, 5);
        e.timeOuts.push(t);
        e.validateTO = t
    },
    validateData: function(e) {
        this.chartCreated && (this.dataChanged = !0, this.marginsUpdated = "xy" != this.chartType ? !1 : !0, this.initChart(e))
    },
    validateNow: function() {
        this.listenersAdded = !1;
        this.write(this.div)
    },
    showItem: function(e) {
        e.hidden = !1;
        this.initChart()
    },
    hideItem: function(e) {
        e.hidden = !0;
        this.initChart()
    },
    hideBalloon: function() {
        var e = this;
        e.hoverInt = setTimeout(function() {
            e.hideBalloonReal.call(e)
        }, 80)
    },
    cleanChart: function() {},
    hideBalloonReal: function() {
        var e = this.balloon;
        e && e.hide()
    },
    showBalloon: function(e, t, n, r, i) {
        var s = this;
        clearTimeout(s.balloonTO);
        s.balloonTO = setTimeout(function() {
            s.showBalloonReal.call(s, e, t, n, r, i)
        }, 1)
    },
    showBalloonReal: function(e, t, n, r, i) {
        this.handleMouseMove();
        var s = this.balloon;
        s.enabled && (s.followCursor(!1), s.changeColor(t), n || s.setPosition(r, i), s.followCursor(n), e && s.showBalloon(e))
    },
    handleTouchMove: function(e) {
        this.hideBalloon();
        var t = this.chartDiv;
        e.touches && (e = e.touches.item(0), this.mouseX = e.pageX - AmCharts.findPosX(t), this.mouseY = e.pageY - AmCharts.findPosY(t))
    },
    handleMouseOver: function() {
        AmCharts.resetMouseOver();
        this.mouseIsOver = !0
    },
    handleMouseOut: function() {
        AmCharts.resetMouseOver();
        this.mouseIsOver = !1
    },
    handleMouseMove: function(e) {
        if (this.mouseIsOver) {
            var t = this.chartDiv;
            e || (e = window.event);
            var n, r;
            if (e) {
                this.posX = AmCharts.findPosX(t);
                this.posY = AmCharts.findPosY(t);
                switch (this.mouseMode) {
                    case 1:
                        n = e.clientX - this.posX;
                        r = e.clientY - this.posY;
                        if (!this.divIsFixed) {
                            var t = document.body,
                                i, s;
                            t && (i = t.scrollLeft, y1 = t.scrollTop);
                            if (t = document.documentElement) s = t.scrollLeft, y2 = t.scrollTop;
                            i = Math.max(i, s);
                            s = Math.max(y1, y2);
                            n += i;
                            r += s
                        }
                        break;
                    case 0:
                        this.divIsFixed ? (n = e.clientX - this.posX, r = e.clientY - this.posY) : (n = e.pageX - this.posX, r = e.pageY - this.posY)
                }
                e.touches && (e = e.touches.item(0), n = e.pageX - this.posX, r = e.pageY - this.posY);
                this.mouseX = n - this.dmouseX;
                this.mouseY = r - this.dmouseY
            }
        }
    },
    handleTouchStart: function(e) {
        this.handleMouseDown(e)
    },
    handleTouchEnd: function(e) {
        AmCharts.resetMouseOver();
        this.handleReleaseOutside(e)
    },
    handleReleaseOutside: function() {},
    handleMouseDown: function(e) {
        AmCharts.resetMouseOver();
        this.mouseIsOver = !0;
        e && e.preventDefault && e.preventDefault()
    },
    addLegend: function(e, t) {
        AmCharts.extend(e, new AmCharts.AmLegend);
        var n;
        n = "object" != typeof t ? document.getElementById(t) : t;
        this.legend = e;
        e.chart = this;
        n ? (e.div = n, e.position = "outside", e.autoMargins = !1) : e.div = this.legendDiv;
        n = this.handleLegendEvent;
        this.listenTo(e, "showItem", n);
        this.listenTo(e, "hideItem", n);
        this.listenTo(e, "clickMarker", n);
        this.listenTo(e, "rollOverItem", n);
        this.listenTo(e, "rollOutItem", n);
        this.listenTo(e, "rollOverMarker", n);
        this.listenTo(e, "rollOutMarker", n);
        this.listenTo(e, "clickLabel", n)
    },
    removeLegend: function() {
        this.legend = void 0;
        this.legendDiv.innerHTML = ""
    },
    handleResize: function() {
        (AmCharts.isPercents(this.width) || AmCharts.isPercents(this.height)) && this.invalidateSizeReal();
        this.renderFix()
    },
    renderFix: function() {
        if (!AmCharts.VML) {
            var e = this.container;
            e && e.renderFix()
        }
    },
    getSVG: function() {
        if (AmCharts.hasSVG) return this.container
    }
});
AmCharts.Slice = AmCharts.Class({
    construct: function() {}
});
AmCharts.SerialDataItem = AmCharts.Class({
    construct: function() {}
});
AmCharts.GraphDataItem = AmCharts.Class({
    construct: function() {}
});
AmCharts.Guide = AmCharts.Class({
    construct: function() {}
});
AmCharts.toBoolean = function(e, t) {
    if (void 0 === e) return t;
    switch (String(e).toLowerCase()) {
        case "true":
        case "yes":
        case "1":
            return !0;
        case "false":
        case "no":
        case "0":
        case null:
            return !1;
        default:
            return Boolean(e)
    }
};
AmCharts.removeFromArray = function(e, t) {
    var n;
    for (n = e.length - 1; 0 <= n; n--) e[n] == t && e.splice(n, 1)
};
AmCharts.getStyle = function(e, t) {
    var n = "";
    document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "").getPropertyValue(t) : e.currentStyle && (t = t.replace(/\-(\w)/g, function(e, t) {
        return t.toUpperCase()
    }), n = e.currentStyle[t]);
    return n
};
AmCharts.removePx = function(e) {
    return Number(e.substring(0, e.length - 2))
};
AmCharts.getURL = function(e, t) {
    if (e)
        if ("_self" == t || !t) window.location.href = e;
        else if ("_top" == t && window.top) window.top.location.href = e;
    else if ("_parent" == t && window.parent) window.parent.location.href = e;
    else {
        var n = document.getElementsByName(t)[0];
        n ? n.src = e : window.open(e)
    }
};
AmCharts.formatMilliseconds = function(e, t) {
    if (-1 != e.indexOf("fff")) {
        var n = t.getMilliseconds(),
            r = String(n);
        10 > n && (r = "00" + n);
        10 <= n && 100 > n && (r = "0" + n);
        e = e.replace(/fff/g, r)
    }
    return e
};
AmCharts.ifArray = function(e) {
    return e && 0 < e.length ? !0 : !1
};
AmCharts.callMethod = function(e, t) {
    var n;
    for (n = 0; n < t.length; n++) {
        var r = t[n];
        if (r) {
            if (r[e]) r[e]();
            var i = r.length;
            if (0 < i) {
                var s;
                for (s = 0; s < i; s++) {
                    var o = r[s];
                    if (o && o[e]) o[e]()
                }
            }
        }
    }
};
AmCharts.toNumber = function(e) {
    return "number" == typeof e ? e : Number(String(e).replace(/[^0-9\-.]+/g, ""))
};
AmCharts.toColor = function(e) {
    if ("" !== e && void 0 !== e)
        if (-1 != e.indexOf(",")) {
            e = e.split(",");
            var t;
            for (t = 0; t < e.length; t++) {
                var n = e[t].substring(e[t].length - 6, e[t].length);
                e[t] = "#" + n
            }
        } else e = e.substring(e.length - 6, e.length), e = "#" + e;
    return e
};
AmCharts.toCoordinate = function(e, t, n) {
    var r;
    void 0 !== e && (e = String(e), n && n < t && (t = n), r = Number(e), -1 != e.indexOf("!") && (r = t - Number(e.substr(1))), -1 != e.indexOf("%") && (r = t * Number(e.substr(0, e.length - 1)) / 100));
    return r
};
AmCharts.fitToBounds = function(e, t, n) {
    e < t && (e = t);
    e > n && (e = n);
    return e
};
AmCharts.isDefined = function(e) {
    return void 0 === e ? !1 : !0
};
AmCharts.stripNumbers = function(e) {
    return e.replace(/[0-9]+/g, "")
};
AmCharts.extractPeriod = function(e) {
    var t = AmCharts.stripNumbers(e),
        n = 1;
    t != e && (n = Number(e.slice(0, e.indexOf(t))));
    return {
        period: t,
        count: n
    }
};
AmCharts.resetDateToMin = function(e, t, n, r) {
    void 0 === r && (r = 1);
    var i, s, o, u, a, f, l;
    AmCharts.useUTC ? (i = e.getUTCFullYear(), s = e.getUTCMonth(), o = e.getUTCDate(), u = e.getUTCHours(), a = e.getUTCMinutes(), f = e.getUTCSeconds(), l = e.getUTCMilliseconds(), e = e.getUTCDay()) : (i = e.getFullYear(), s = e.getMonth(), o = e.getDate(), u = e.getHours(), a = e.getMinutes(), f = e.getSeconds(), l = e.getMilliseconds(), e = e.getDay());
    switch (t) {
        case "YYYY":
            i = Math.floor(i / n) * n;
            s = 0;
            o = 1;
            l = f = a = u = 0;
            break;
        case "MM":
            s = Math.floor(s / n) * n;
            o = 1;
            l = f = a = u = 0;
            break;
        case "WW":
            0 === e && 0 < r && (e = 7);
            o = o - e + r;
            l = f = a = u = 0;
            break;
        case "DD":
            o = Math.floor(o / n) * n;
            l = f = a = u = 0;
            break;
        case "hh":
            u = Math.floor(u / n) * n;
            l = f = a = 0;
            break;
        case "mm":
            a = Math.floor(a / n) * n;
            l = f = 0;
            break;
        case "ss":
            f = Math.floor(f / n) * n;
            l = 0;
            break;
        case "fff":
            l = Math.floor(l / n) * n
    }
    AmCharts.useUTC ? (e = new Date, e.setUTCFullYear(i), e.setUTCMonth(s), e.setUTCDate(o), e.setUTCHours(u), e.setUTCMinutes(a), e.setUTCSeconds(f), e.setUTCMilliseconds(l)) : e = new Date(i, s, o, u, a, f, l);
    return e
};
AmCharts.getPeriodDuration = function(e, t) {
    void 0 === t && (t = 1);
    var n;
    switch (e) {
        case "YYYY":
            n = 316224e5;
            break;
        case "MM":
            n = 26784e5;
            break;
        case "WW":
            n = 6048e5;
            break;
        case "DD":
            n = 864e5;
            break;
        case "hh":
            n = 36e5;
            break;
        case "mm":
            n = 6e4;
            break;
        case "ss":
            n = 1e3;
            break;
        case "fff":
            n = 1
    }
    return n * t
};
AmCharts.roundTo = function(e, t) {
    if (0 > t) return e;
    var n = Math.pow(10, t);
    return Math.round(e * n) / n
};
AmCharts.toFixed = function(e, t) {
    var n = String(Math.round(e * Math.pow(10, t)));
    if (0 < t) {
        var r = n.length;
        if (r < t) {
            var i;
            for (i = 0; i < t - r; i++) n = "0" + n
        }
        r = n.substring(0, n.length - t);
        "" === r && (r = 0);
        return r + "." + n.substring(n.length - t, n.length)
    }
    return String(n)
};
AmCharts.intervals = {
    s: {
        nextInterval: "ss",
        contains: 1e3
    },
    ss: {
        nextInterval: "mm",
        contains: 60,
        count: 0
    },
    mm: {
        nextInterval: "hh",
        contains: 60,
        count: 1
    },
    hh: {
        nextInterval: "DD",
        contains: 24,
        count: 2
    },
    DD: {
        nextInterval: "",
        contains: Infinity,
        count: 3
    }
};
AmCharts.getMaxInterval = function(e, t) {
    var n = AmCharts.intervals;
    return e >= n[t].contains ? (e = Math.round(e / n[t].contains), t = n[t].nextInterval, AmCharts.getMaxInterval(e, t)) : "ss" == t ? n[t].nextInterval : t
};
AmCharts.formatDuration = function(e, t, n, r, i, s) {
    var o = AmCharts.intervals,
        u = s.decimalSeparator;
    if (e >= o[t].contains) {
        var a = e - Math.floor(e / o[t].contains) * o[t].contains;
        "ss" == t && (a = AmCharts.formatNumber(a, s), 1 == a.split(u)[0].length && (a = "0" + a));
        if (("mm" == t || "hh" == t) && 10 > a) a = "0" + a;
        n = a + "" + r[t] + "" + n;
        e = Math.floor(e / o[t].contains);
        t = o[t].nextInterval;
        return AmCharts.formatDuration(e, t, n, r, i, s)
    }
    "ss" == t && (e = AmCharts.formatNumber(e, s), 1 == e.split(u)[0].length && (e = "0" + e));
    if (("mm" == t || "hh" == t) && 10 > e) e = "0" + e;
    n = e + "" + r[t] + "" + n;
    if (o[i].count > o[t].count)
        for (e = o[t].count; e < o[i].count; e++) t = o[t].nextInterval, "ss" == t || "mm" == t || "hh" == t ? n = "00" + r[t] + "" + n : "DD" == t && (n = "0" + r[t] + "" + n);
    ":" == n.charAt(n.length - 1) && (n = n.substring(0, n.length - 1));
    return n
};
AmCharts.formatNumber = function(e, t, n, r, i) {
    e = AmCharts.roundTo(e, t.precision);
    isNaN(n) && (n = t.precision);
    var s = t.decimalSeparator;
    t = t.thousandsSeparator;
    var o;
    o = 0 > e ? "-" : "";
    e = Math.abs(e);
    var u = String(e),
        a = !1; - 1 != u.indexOf("e") && (a = !0);
    0 <= n && !a && (u = AmCharts.toFixed(e, n));
    var f = "";
    if (a) f = u;
    else {
        var u = u.split("."),
            a = String(u[0]),
            l;
        for (l = a.length; 0 <= l; l -= 3) f = l != a.length ? 0 !== l ? a.substring(l - 3, l) + t + f : a.substring(l - 3, l) + f : a.substring(l - 3, l);
        void 0 !== u[1] && (f = f + s + u[1]);
        void 0 !== n && 0 < n && "0" != f && (f = AmCharts.addZeroes(f, s, n))
    }
    f = o + f;
    "" === o && !0 === r && 0 !== e && (f = "+" + f);
    !0 === i && (f += "%");
    return f
};
AmCharts.addZeroes = function(e, t, n) {
    e = e.split(t);
    void 0 === e[1] && 0 < n && (e[1] = "0");
    return e[1].length < n ? (e[1] += "0", AmCharts.addZeroes(e[0] + t + e[1], t, n)) : void 0 !== e[1] ? e[0] + t + e[1] : e[0]
};
AmCharts.scientificToNormal = function(e) {
    var t;
    e = String(e).split("e");
    var n;
    if ("-" == e[1].substr(0, 1)) {
        t = "0.";
        for (n = 0; n < Math.abs(Number(e[1])) - 1; n++) t += "0";
        t += e[0].split(".").join("")
    } else {
        var r = 0;
        t = e[0].split(".");
        t[1] && (r = t[1].length);
        t = e[0].split(".").join("");
        for (n = 0; n < Math.abs(Number(e[1])) - r; n++) t += "0"
    }
    return t
};
AmCharts.toScientific = function(e, t) {
    if (0 === e) return "0";
    var n = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E);
    Math.pow(10, n);
    mantissa = String(mantissa).split(".").join(t);
    return String(mantissa) + "e" + n
};
AmCharts.randomColor = function() {
    return "#" + ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6)
};
AmCharts.hitTest = function(e, t, n) {
    var r = !1,
        i = e.x,
        s = e.x + e.width,
        o = e.y,
        u = e.y + e.height,
        a = AmCharts.isInRectangle;
    r || (r = a(i, o, t));
    r || (r = a(i, u, t));
    r || (r = a(s, o, t));
    r || (r = a(s, u, t));
    !r && !0 !== n && (r = AmCharts.hitTest(t, e, !0));
    return r
};
AmCharts.isInRectangle = function(e, t, n) {
    return e >= n.x - 5 && e <= n.x + n.width + 5 && t >= n.y - 5 && t <= n.y + n.height + 5 ? !0 : !1
};
AmCharts.isPercents = function(e) {
    if (-1 != String(e).indexOf("%")) return !0
};
AmCharts.dayNames = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
AmCharts.shortDayNames = "Sun Mon Tue Wed Thu Fri Sat".split(" ");
AmCharts.monthNames = "January February March April May June July August September October November December".split(" ");
AmCharts.shortMonthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
AmCharts.getWeekNumber = function(e) {
    e = new Date(e);
    e.setHours(0, 0, 0);
    e.setDate(e.getDate() + 4 - (e.getDay() || 7));
    var t = new Date(e.getFullYear(), 0, 1);
    return Math.ceil(((e - t) / 864e5 + 1) / 7)
};
AmCharts.formatDate = function(e, t) {
    var n, r, i, s, o, u, a, f, l = AmCharts.getWeekNumber(e);
    AmCharts.useUTC ? (n = e.getUTCFullYear(), r = e.getUTCMonth(), i = e.getUTCDate(), s = e.getUTCDay(), o = e.getUTCHours(), u = e.getUTCMinutes(), a = e.getUTCSeconds(), f = e.getUTCMilliseconds()) : (n = e.getFullYear(), r = e.getMonth(), i = e.getDate(), s = e.getDay(), o = e.getHours(), u = e.getMinutes(), a = e.getSeconds(), f = e.getMilliseconds());
    var c = String(n).substr(2, 2),
        h = r + 1;
    9 > r && (h = "0" + h);
    var p = i;
    10 > i && (p = "0" + i);
    var d = "0" + s;
    t = t.replace(/W/g, l);
    l = o;
    24 == l && (l = 0);
    var v = l;
    10 > v && (v = "0" + v);
    t = t.replace(/JJ/g, v);
    t = t.replace(/J/g, l);
    l = o;
    0 === l && (l = 24);
    v = l;
    10 > v && (v = "0" + v);
    t = t.replace(/HH/g, v);
    t = t.replace(/H/g, l);
    l = o;
    11 < l && (l -= 12);
    v = l;
    10 > v && (v = "0" + v);
    t = t.replace(/KK/g, v);
    t = t.replace(/K/g, l);
    l = o;
    0 === l && (l = 12);
    12 < l && (l -= 12);
    v = l;
    10 > v && (v = "0" + v);
    t = t.replace(/LL/g, v);
    t = t.replace(/L/g, l);
    l = u;
    10 > l && (l = "0" + l);
    t = t.replace(/NN/g, l);
    t = t.replace(/N/g, u);
    u = a;
    10 > u && (u = "0" + u);
    t = t.replace(/SS/g, u);
    t = t.replace(/S/g, a);
    a = f;
    10 > a && (a = "00" + a);
    100 > a && (a = "0" + a);
    u = f;
    10 > u && (u = "00" + u);
    t = t.replace(/QQQ/g, a);
    t = t.replace(/QQ/g, u);
    t = t.replace(/Q/g, f);
    t = 12 > o ? t.replace(/A/g, "am") : t.replace(/A/g, "pm");
    t = t.replace(/YYYY/g, "@IIII@");
    t = t.replace(/YY/g, "@II@");
    t = t.replace(/MMMM/g, "@XXXX@");
    t = t.replace(/MMM/g, "@XXX@");
    t = t.replace(/MM/g, "@XX@");
    t = t.replace(/M/g, "@X@");
    t = t.replace(/DD/g, "@RR@");
    t = t.replace(/D/g, "@R@");
    t = t.replace(/EEEE/g, "@PPPP@");
    t = t.replace(/EEE/g, "@PPP@");
    t = t.replace(/EE/g, "@PP@");
    t = t.replace(/E/g, "@P@");
    t = t.replace(/@IIII@/g, n);
    t = t.replace(/@II@/g, c);
    t = t.replace(/@XXXX@/g, AmCharts.monthNames[r]);
    t = t.replace(/@XXX@/g, AmCharts.shortMonthNames[r]);
    t = t.replace(/@XX@/g, h);
    t = t.replace(/@X@/g, r + 1);
    t = t.replace(/@RR@/g, p);
    t = t.replace(/@R@/g, i);
    t = t.replace(/@PPPP@/g, AmCharts.dayNames[s]);
    t = t.replace(/@PPP@/g, AmCharts.shortDayNames[s]);
    t = t.replace(/@PP@/g, d);
    return t = t.replace(/@P@/g, s)
};
AmCharts.findPosX = function(e) {
    var t = e,
        n = e.offsetLeft;
    if (e.offsetParent) {
        for (; e = e.offsetParent;) n += e.offsetLeft;
        for (;
            (t = t.parentNode) && t != document.body;) n -= t.scrollLeft || 0
    }
    return n
};
AmCharts.findPosY = function(e) {
    var t = e,
        n = e.offsetTop;
    if (e.offsetParent) {
        for (; e = e.offsetParent;) n += e.offsetTop;
        for (;
            (t = t.parentNode) && t != document.body;) n -= t.scrollTop || 0
    }
    return n
};
AmCharts.findIfFixed = function(e) {
    if (e.offsetParent)
        for (; e = e.offsetParent;)
            if ("fixed" == AmCharts.getStyle(e, "position")) return !0;
    return !1
};
AmCharts.findIfAuto = function(e) {
    return e.style && "auto" == AmCharts.getStyle(e, "overflow") ? !0 : e.parentNode ? AmCharts.findIfAuto(e.parentNode) : !1
};
AmCharts.findScrollLeft = function(e, t) {
    e.scrollLeft && (t += e.scrollLeft);
    return e.parentNode ? AmCharts.findScrollLeft(e.parentNode, t) : t
};
AmCharts.findScrollTop = function(e, t) {
    e.scrollTop && (t += e.scrollTop);
    return e.parentNode ? AmCharts.findScrollTop(e.parentNode, t) : t
};
AmCharts.formatValue = function(e, t, n, r, i, s, o, u) {
    if (t) {
        void 0 === i && (i = "");
        var a;
        for (a = 0; a < n.length; a++) {
            var f = n[a],
                l = t[f];
            void 0 !== l && (l = s ? AmCharts.addPrefix(l, u, o, r) : AmCharts.formatNumber(l, r), e = e.replace(RegExp("\\[\\[" + i + "" + f + "\\]\\]", "g"), l))
        }
    }
    return e
};
AmCharts.formatDataContextValue = function(e, t) {
    if (e) {
        var n = e.match(/\[\[.*?\]\]/g),
            r;
        for (r = 0; r < n.length; r++) {
            var i = n[r],
                i = i.substr(2, i.length - 4);
            void 0 !== t[i] && (e = e.replace(RegExp("\\[\\[" + i + "\\]\\]", "g"), t[i]))
        }
    }
    return e
};
AmCharts.massReplace = function(e, t) {
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = t[n];
            void 0 === r && (r = "");
            e = e.replace(n, r)
        }
    return e
};
AmCharts.cleanFromEmpty = function(e) {
    return e.replace(/\[\[[^\]]*\]\]/g, "")
};
AmCharts.addPrefix = function(e, t, n, r, i) {
    var s = AmCharts.formatNumber(e, r),
        o = "",
        u, a, f;
    if (0 === e) return "0";
    0 > e && (o = "-");
    e = Math.abs(e);
    if (1 < e)
        for (u = t.length - 1; - 1 < u; u--) {
            if (e >= t[u].number && (a = e / t[u].number, f = Number(r.precision), 1 > f && (f = 1), n = AmCharts.roundTo(a, f), !(i && a != n))) {
                s = o + "" + n + "" + t[u].prefix;
                break
            }
        } else
            for (u = 0; u < n.length; u++)
                if (e <= n[u].number) {
                    a = e / n[u].number;
                    f = Math.abs(Math.round(Math.log(a) * Math.LOG10E));
                    a = AmCharts.roundTo(a, f);
                    s = o + "" + a + "" + n[u].prefix;
                    break
                }
    return s
};
AmCharts.remove = function(e) {
    e && e.remove()
};
AmCharts.copyProperties = function(e, t) {
    for (var n in e) e.hasOwnProperty(n) && "events" != n && void 0 !== e[n] && "function" != typeof e[n] && (t[n] = e[n])
};
AmCharts.recommended = function() {
    var e = "js";
    document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") || swfobject && swfobject.hasFlashPlayerVersion("8") && (e = "flash");
    return e
};
AmCharts.getEffect = function(e) {
    ">" == e && (e = "easeOutSine");
    "<" == e && (e = "easeInSine");
    "elastic" == e && (e = "easeOutElastic");
    return e
};
AmCharts.extend = function(e, t) {
    for (var n in t) void 0 !== t[n] && (e.hasOwnProperty(n) || (e[n] = t[n]))
};
AmCharts.fixNewLines = function(e) {
    if (9 > AmCharts.IEversion && 0 < AmCharts.IEversion) {
        var t = RegExp("\\n", "g");
        e && (e = e.replace(t, "<br />"))
    }
    return e
};
AmCharts.deleteObject = function(e, t) {
    if (e) {
        if (void 0 === t || null === t) t = 20;
        if (0 != t)
            if ("[object Array]" === Object.prototype.toString.call(e))
                for (var n = 0; n < e.length; n++) AmCharts.deleteObject(e[n], t - 1), e[n] = null;
            else try {
                for (n in e) e[n] && ("object" == typeof e[n] && AmCharts.deleteObject(e[n], t - 1), "function" != typeof e[n] && (e[n] = null))
            } catch (r) {}
    }
};
AmCharts.changeDate = function(e, t, n, r, i) {
    var s = -1;
    void 0 === r && (r = !0);
    void 0 === i && (i = !1);
    !0 === r && (s = 1);
    switch (t) {
        case "YYYY":
            e.setFullYear(e.getFullYear() + n * s);
            !r && !i && e.setDate(e.getDate() + 1);
            break;
        case "MM":
            e.setMonth(e.getMonth() + n * s);
            !r && !i && e.setDate(e.getDate() + 1);
            break;
        case "DD":
            e.setDate(e.getDate() + n * s);
            break;
        case "WW":
            e.setDate(e.getDate() + 7 * n * s + 1);
            break;
        case "hh":
            e.setHours(e.getHours() + n * s);
            break;
        case "mm":
            e.setMinutes(e.getMinutes() + n * s);
            break;
        case "ss":
            e.setSeconds(e.getSeconds() + n * s);
            break;
        case "fff":
            e.setMilliseconds(e.getMilliseconds() + n * s)
    }
    return e
};
AmCharts.Bezier = AmCharts.Class({
    construct: function(e, t, n, r, i, s, o, u, a, f) {
        "object" == typeof o && (o = o[0]);
        "object" == typeof u && (u = u[0]);
        s = {
            fill: o,
            "fill-opacity": u,
            "stroke-width": s
        };
        void 0 !== a && 0 < a && (s["stroke-dasharray"] = a);
        isNaN(i) || (s["stroke-opacity"] = i);
        r && (s.stroke = r);
        r = "M" + Math.round(t[0]) + "," + Math.round(n[0]);
        i = [];
        for (a = 0; a < t.length; a++) i.push({
            x: Number(t[a]),
            y: Number(n[a])
        });
        1 < i.length && (t = this.interpolate(i), r += this.drawBeziers(t));
        f ? r += f : AmCharts.VML || (r += "M0,0 L0,0");
        this.path = e.path(r).attr(s)
    },
    interpolate: function(e) {
        var t = [];
        t.push({
            x: e[0].x,
            y: e[0].y
        });
        var n = e[1].x - e[0].x,
            r = e[1].y - e[0].y,
            i = AmCharts.bezierX,
            s = AmCharts.bezierY;
        t.push({
            x: e[0].x + n / i,
            y: e[0].y + r / s
        });
        var o;
        for (o = 1; o < e.length - 1; o++) {
            var u = e[o - 1],
                a = e[o],
                r = e[o + 1],
                n = r.x - a.x,
                r = r.y - u.y,
                u = a.x - u.x;
            u > n && (u = n);
            t.push({
                x: a.x - u / i,
                y: a.y - r / s
            });
            t.push({
                x: a.x,
                y: a.y
            });
            t.push({
                x: a.x + u / i,
                y: a.y + r / s
            })
        }
        r = e[e.length - 1].y - e[e.length - 2].y;
        n = e[e.length - 1].x - e[e.length - 2].x;
        t.push({
            x: e[e.length - 1].x - n / i,
            y: e[e.length - 1].y - r / s
        });
        t.push({
            x: e[e.length - 1].x,
            y: e[e.length - 1].y
        });
        return t
    },
    drawBeziers: function(e) {
        var t = "",
            n;
        for (n = 0; n < (e.length - 1) / 3; n++) t += this.drawBezierMidpoint(e[3 * n], e[3 * n + 1], e[3 * n + 2], e[3 * n + 3]);
        return t
    },
    drawBezierMidpoint: function(e, t, n, r) {
        var i = Math.round,
            s = this.getPointOnSegment(e, t, .75),
            o = this.getPointOnSegment(r, n, .75),
            u = (r.x - e.x) / 16,
            a = (r.y - e.y) / 16,
            f = this.getPointOnSegment(e, t, .375);
        e = this.getPointOnSegment(s, o, .375);
        e.x -= u;
        e.y -= a;
        t = this.getPointOnSegment(o, s, .375);
        t.x += u;
        t.y += a;
        n = this.getPointOnSegment(r, n, .375);
        u = this.getMiddle(f, e);
        s = this.getMiddle(s, o);
        o = this.getMiddle(t, n);
        f = " Q" + i(f.x) + "," + i(f.y) + "," + i(u.x) + "," + i(u.y);
        f += " Q" + i(e.x) + "," + i(e.y) + "," + i(s.x) + "," + i(s.y);
        f += " Q" + i(t.x) + "," + i(t.y) + "," + i(o.x) + "," + i(o.y);
        return f += " Q" + i(n.x) + "," + i(n.y) + "," + i(r.x) + "," + i(r.y)
    },
    getMiddle: function(e, t) {
        return {
            x: (e.x + t.x) / 2,
            y: (e.y + t.y) / 2
        }
    },
    getPointOnSegment: function(e, t, n) {
        return {
            x: e.x + (t.x - e.x) * n,
            y: e.y + (t.y - e.y) * n
        }
    }
});
AmCharts.Cuboid = AmCharts.Class({
    construct: function(e, t, n, r, i, s, o, u, a, f, l, c, h) {
        this.set = e.set();
        this.container = e;
        this.h = Math.round(n);
        this.w = Math.round(t);
        this.dx = r;
        this.dy = i;
        this.colors = s;
        this.alpha = o;
        this.bwidth = u;
        this.bcolor = a;
        this.balpha = f;
        this.colors = s;
        h ? 0 > t && 0 === l && (l = 180) : 0 > n && 270 == l && (l = 90);
        this.gradientRotation = l;
        0 === r && 0 === i && (this.cornerRadius = c);
        this.draw()
    },
    draw: function() {
        var e = this.set;
        e.clear();
        var t = this.container,
            n = this.w,
            r = this.h,
            i = this.dx,
            s = this.dy,
            o = this.colors,
            u = this.alpha,
            a = this.bwidth,
            f = this.bcolor,
            l = this.balpha,
            c = this.gradientRotation,
            h = this.cornerRadius,
            p = o,
            d = o;
        "object" == typeof o && (p = o[0], d = o[o.length - 1]);
        var v, m, g, y, b, w, E, S, x;
        if (0 < i || 0 < s) E = d, d = AmCharts.adjustLuminosity(p, -.2), d = AmCharts.adjustLuminosity(p, -.2), v = AmCharts.polygon(t, [0, i, n + i, n, 0], [0, s, s, 0, 0], d, u, 0, 0, 0, c), 0 < l && (x = AmCharts.line(t, [0, i, n + i], [0, s, s], f, l, a)), m = AmCharts.polygon(t, [0, 0, n, n, 0], [0, r, r, 0, 0], d, u, 0, 0, 0, 0, c), m.translate(i, s), 0 < l && (g = AmCharts.line(t, [i, i], [s, s + r], f, 1, a)), y = AmCharts.polygon(t, [0, 0, i, i, 0], [0, r, r + s, s, 0], d, u, 0, 0, 0, c), b = AmCharts.polygon(t, [n, n, n + i, n + i, n], [0, r, r + s, s, 0], d, u, 0, 0, 0, c), 0 < l && (w = AmCharts.line(t, [n, n + i, n + i, n], [0, s, r + s, r], f, l, a)), d = AmCharts.adjustLuminosity(E, .2), E = AmCharts.polygon(t, [0, i, n + i, n, 0], [r, r + s, r + s, r, r], d, u, 0, 0, 0, c), 0 < l && (S = AmCharts.line(t, [0, i, n + i], [r, r + s, r + s], f, l, a));
        1 > Math.abs(r) && (r = 0);
        1 > Math.abs(n) && (n = 0);
        t = 0 === r ? AmCharts.line(t, [0, n], [0, 0], p, l, a) : 0 === n ? AmCharts.line(t, [0, 0], [0, r], p, l, a) : 0 < h ? AmCharts.rect(t, n, r, o, u, a, f, l, h, c) : AmCharts.polygon(t, [0, 0, n, n, 0], [0, r, r, 0, 0], o, u, a, f, l, c);
        r = 0 > r ? [v, x, m, g, y, b, w, E, S, t] : [E, S, m, g, y, b, v, x, w, t];
        for (v = 0; v < r.length; v++)(m = r[v]) && e.push(m)
    },
    width: function(e) {
        this.w = e;
        this.draw()
    },
    height: function(e) {
        this.h = e;
        this.draw()
    },
    animateHeight: function(e, t) {
        var n = this;
        n.easing = t;
        n.totalFrames = 1e3 * e / AmCharts.updateRate;
        n.rh = n.h;
        n.frame = 0;
        n.height(1);
        setTimeout(function() {
            n.updateHeight.call(n)
        }, AmCharts.updateRate)
    },
    updateHeight: function() {
        var e = this;
        e.frame++;
        var t = e.totalFrames;
        e.frame <= t && (t = e.easing(0, e.frame, 1, e.rh - 1, t), e.height(t), setTimeout(function() {
            e.updateHeight.call(e)
        }, AmCharts.updateRate))
    },
    animateWidth: function(e, t) {
        var n = this;
        n.easing = t;
        n.totalFrames = 1e3 * e / AmCharts.updateRate;
        n.rw = n.w;
        n.frame = 0;
        n.width(1);
        setTimeout(function() {
            n.updateWidth.call(n)
        }, AmCharts.updateRate)
    },
    updateWidth: function() {
        var e = this;
        e.frame++;
        var t = e.totalFrames;
        e.frame <= t && (t = e.easing(0, e.frame, 1, e.rw - 1, t), e.width(t), setTimeout(function() {
            e.updateWidth.call(e)
        }, AmCharts.updateRate))
    }
});
AmCharts.AmLegend = AmCharts.Class({
    construct: function() {
        this.createEvents("rollOverMarker", "rollOverItem", "rollOutMarker", "rollOutItem", "showItem", "hideItem", "clickMarker", "rollOverItem", "rollOutItem", "clickLabel");
        this.position = "bottom";
        this.borderColor = this.color = "#000000";
        this.borderAlpha = 0;
        this.markerLabelGap = 5;
        this.verticalGap = 10;
        this.align = "left";
        this.horizontalGap = 0;
        this.spacing = 10;
        this.markerDisabledColor = "#AAB3B3";
        this.markerType = "square";
        this.markerSize = 16;
        this.markerBorderThickness = 1;
        this.marginBottom = this.marginTop = 0;
        this.marginLeft = this.marginRight = 20;
        this.autoMargins = !0;
        this.valueWidth = 50;
        this.switchable = !0;
        this.switchType = "x";
        this.switchColor = "#FFFFFF";
        this.rollOverColor = "#CC0000";
        this.reversedOrder = !1;
        this.labelText = "[[title]]";
        this.useMarkerColorForLabels = !1;
        this.rollOverGraphAlpha = 1;
        this.textClickEnabled = !1;
        this.equalWidths = !0;
        this.dateFormat = "DD-MM-YYYY";
        this.backgroundColor = "#FFFFFF";
        this.backgroundAlpha = 0;
        this.showEntries = !0
    },
    setData: function(e) {
        this.data = e;
        this.invalidateSize()
    },
    invalidateSize: function() {
        this.destroy();
        this.entries = [];
        this.valueLabels = [];
        AmCharts.ifArray(this.data) && this.drawLegend()
    },
    drawLegend: function() {
        var e = this.chart,
            t = this.position,
            n = this.width,
            r = e.divRealWidth,
            i = e.divRealHeight,
            s = this.div,
            o = this.data;
        isNaN(this.fontSize) && (this.fontSize = e.fontSize);
        if ("right" == t || "left" == t) this.maxColumns = 1, this.marginLeft = this.marginRight = 10;
        else if (this.autoMargins) {
            this.marginRight = e.marginRight;
            this.marginLeft = e.marginLeft;
            var u = e.autoMarginOffset;
            "bottom" == t ? (this.marginBottom = u, this.marginTop = 0) : (this.marginTop = u, this.marginBottom = 0)
        }
        n = void 0 !== n ? AmCharts.toCoordinate(n, r) : e.realWidth;
        "outside" == t ? (n = s.offsetWidth, i = s.offsetHeight, s.clientHeight && (n = s.clientWidth, i = s.clientHeight)) : (s.style.width = n + "px", s.className = "amChartsLegend");
        this.divWidth = n;
        this.container = new AmCharts.AmDraw(s, n, i);
        this.lx = 0;
        this.ly = 8;
        t = this.markerSize;
        t > this.fontSize && (this.ly = t / 2 - 1);
        0 < t && (this.lx += t + this.markerLabelGap);
        this.titleWidth = 0;
        if (t = this.title) e = AmCharts.text(this.container, t, this.color, e.fontFamily, this.fontSize, "start", !0), e.translate(this.marginLeft, this.marginTop + this.verticalGap + this.ly + 1), e = e.getBBox(), this.titleWidth = e.width + 15, this.titleHeight = e.height + 6;
        this.index = this.maxLabelWidth = 0;
        if (this.showEntries) {
            for (e = 0; e < o.length; e++) this.createEntry(o[e]);
            for (e = this.index = 0; e < o.length; e++) this.createValue(o[e])
        }
        this.arrangeEntries();
        this.updateValues()
    },
    arrangeEntries: function() {
        var e = this.position,
            t = this.marginLeft + this.titleWidth,
            n = this.marginRight,
            r = this.marginTop,
            i = this.marginBottom,
            s = this.horizontalGap,
            o = this.div,
            u = this.divWidth,
            a = this.maxColumns,
            f = this.verticalGap,
            l = this.spacing,
            c = u - n - t,
            h = 0,
            p = 0,
            d = this.container,
            v = d.set();
        this.set = v;
        d = d.set();
        v.push(d);
        var m = this.entries,
            g, y;
        for (y = 0; y < m.length; y++) {
            g = m[y].getBBox();
            var b = g.width;
            b > h && (h = b);
            g = g.height;
            g > p && (p = g)
        }
        var w = b = 0,
            E = s;
        for (y = 0; y < m.length; y++) {
            var S = m[y];
            this.reversedOrder && (S = m[m.length - y - 1]);
            g = S.getBBox();
            var x;
            this.equalWidths ? x = s + w * (h + l + this.markerLabelGap) : (x = E, E = E + g.width + s + l);
            x + g.width > c && 0 < y && 0 != w && (b++, w = 0, x = s, E = x + g.width + s + l, skipNewRow = !0);
            S.translate(x, (p + f) * b);
            w++;
            !isNaN(a) && w >= a && (w = 0, b++);
            d.push(S)
        }
        g = d.getBBox();
        a = g.height + 2 * f - 1;
        "left" == e || "right" == e ? (u = g.width + 2 * s, o.style.width = u + t + n + "px") : u = u - t - n - 1;
        n = AmCharts.polygon(this.container, [0, u, u, 0], [0, 0, a, a], this.backgroundColor, this.backgroundAlpha, 1, this.borderColor, this.borderAlpha);
        v.push(n);
        v.translate(t, r);
        n.toBack();
        t = s;
        if ("top" == e || "bottom" == e || "absolute" == e || "outside" == e) "center" == this.align ? t = s + (u - g.width) / 2 : "right" == this.align && (t = s + u - g.width);
        d.translate(t, f + 1);
        this.titleHeight > a && (a = this.titleHeight);
        e = a + r + i + 1;
        0 > e && (e = 0);
        o.style.height = Math.round(e) + "px"
    },
    createEntry: function(e) {
        if (!1 !== e.visibleInLegend) {
            var t = this.chart,
                n = e.markerType;
            n || (n = this.markerType);
            var r = e.color,
                i = e.alpha;
            e.legendKeyColor && (r = e.legendKeyColor());
            e.legendKeyAlpha && (i = e.legendKeyAlpha());
            !0 === e.hidden && (r = this.markerDisabledColor);
            var s = this.createMarker(n, r, i);
            this.addListeners(s, e);
            i = this.container.set([s]);
            this.switchable && i.setAttr("cursor", "pointer");
            var o = this.switchType;
            if (o) {
                var u;
                u = "x" == o ? this.createX() : this.createV();
                u.dItem = e;
                !0 !== e.hidden ? "x" == o ? u.hide() : u.show() : "x" != o && u.hide();
                this.switchable || u.hide();
                this.addListeners(u, e);
                e.legendSwitch = u;
                i.push(u)
            }
            o = this.color;
            e.showBalloon && this.textClickEnabled && void 0 !== this.selectedColor && (o = this.selectedColor);
            this.useMarkerColorForLabels && (o = r);
            !0 === e.hidden && (o = this.markerDisabledColor);
            var r = AmCharts.massReplace(this.labelText, {
                    "[[title]]": e.title
                }),
                a = this.fontSize,
                f = this.markerSize;
            if (s && f <= a) {
                var l = 0;
                if ("bubble" == n || "circle" == n) l = f / 2;
                n = l + this.ly - a / 2 + (a + 2 - f) / 2;
                s.translate(l, n);
                u && u.translate(l, n)
            }
            var c;
            r && (r = AmCharts.fixNewLines(r), c = AmCharts.text(this.container, r, o, t.fontFamily, a, "start"), c.translate(this.lx, this.ly), i.push(c), t = c.getBBox().width, this.maxLabelWidth < t && (this.maxLabelWidth = t));
            this.entries[this.index] = i;
            e.legendEntry = this.entries[this.index];
            e.legendLabel = c;
            this.index++
        }
    },
    addListeners: function(e, t) {
        var n = this;
        e && e.mouseover(function() {
            n.rollOverMarker(t)
        }).mouseout(function() {
            n.rollOutMarker(t)
        }).click(function() {
            n.clickMarker(t)
        })
    },
    rollOverMarker: function(e) {
        this.switchable && this.dispatch("rollOverMarker", e);
        this.dispatch("rollOverItem", e)
    },
    rollOutMarker: function(e) {
        this.switchable && this.dispatch("rollOutMarker", e);
        this.dispatch("rollOutItem", e)
    },
    clickMarker: function(e) {
        this.switchable ? !0 === e.hidden ? this.dispatch("showItem", e) : this.dispatch("hideItem", e) : this.textClickEnabled && this.dispatch("clickMarker", e)
    },
    rollOverLabel: function(e) {
        e.hidden || (this.textClickEnabled && e.legendLabel && e.legendLabel.attr({
            fill: this.rollOverColor
        }), this.dispatch("rollOverItem", e))
    },
    rollOutLabel: function(e) {
        if (!e.hidden) {
            if (this.textClickEnabled && e.legendLabel) {
                var t = this.color;
                void 0 !== this.selectedColor && e.showBalloon && (t = this.selectedColor);
                this.useMarkerColorForLabels && (t = e.lineColor, void 0 === t && (t = e.color));
                e.legendLabel.attr({
                    fill: t
                })
            }
            this.dispatch("rollOutItem", e)
        }
    },
    clickLabel: function(e) {
        this.textClickEnabled ? e.hidden || this.dispatch("clickLabel", e) : this.switchable && (!0 === e.hidden ? this.dispatch("showItem", e) : this.dispatch("hideItem", e))
    },
    dispatch: function(e, t) {
        this.fire(e, {
            type: e,
            dataItem: t,
            target: this,
            chart: this.chart
        })
    },
    createValue: function(e) {
        var t = this,
            n = t.fontSize;
        if (!1 !== e.visibleInLegend) {
            var r = t.maxLabelWidth;
            t.equalWidths || (t.valueAlign = "left");
            "left" == t.valueAlign && (r = e.legendEntry.getBBox().width);
            var i = r;
            if (t.valueText) {
                var s = t.color;
                t.useMarkerColorForValues && (s = e.color, e.legendKeyColor && (s = e.legendKeyColor()));
                !0 === e.hidden && (s = t.markerDisabledColor);
                var o = t.valueText,
                    r = r + t.lx + t.markerLabelGap + t.valueWidth,
                    u = "end";
                "left" == t.valueAlign && (r -= t.valueWidth, u = "start");
                s = AmCharts.text(t.container, o, s, t.chart.fontFamily, n, u);
                s.translate(r, t.ly);
                t.entries[t.index].push(s);
                i += t.valueWidth + 2 * t.markerLabelGap;
                s.dItem = e;
                t.valueLabels.push(s)
            }
            t.index++;
            s = t.markerSize;
            s < n + 7 && (s = n + 7, AmCharts.VML && (s += 3));
            n = t.container.rect(t.markerSize, 0, i, s, 0, 0).attr({
                stroke: "none",
                fill: "#ffffff",
                "fill-opacity": .005
            });
            n.dItem = e;
            t.entries[t.index - 1].push(n);
            n.mouseover(function() {
                t.rollOverLabel(e)
            }).mouseout(function() {
                t.rollOutLabel(e)
            }).click(function() {
                t.clickLabel(e)
            })
        }
    },
    createV: function() {
        var e = this.markerSize;
        return AmCharts.polygon(this.container, [e / 5, e / 2, e - e / 5, e / 2], [e / 3, e - e / 5, e / 5, e / 1.7], this.switchColor)
    },
    createX: function() {
        var e = this.markerSize - 3,
            t = {
                stroke: this.switchColor,
                "stroke-width": 3
            },
            n = this.container,
            r = AmCharts.line(n, [3, e], [3, e]).attr(t),
            e = AmCharts.line(n, [3, e], [e, 3]).attr(t);
        return this.container.set([r, e])
    },
    createMarker: function(e, t, n) {
        var r = this.markerSize,
            i = this.container,
            s, o = this.markerBorderColor;
        o || (o = t);
        var u = this.markerBorderThickness,
            a = this.markerBorderAlpha;
        switch (e) {
            case "square":
                s = AmCharts.polygon(i, [0, r, r, 0], [0, 0, r, r], t, n, u, o, a);
                break;
            case "circle":
                s = AmCharts.circle(i, r / 2, t, n, u, o, a);
                s.translate(r / 2, r / 2);
                break;
            case "line":
                s = AmCharts.line(i, [0, r], [r / 2, r / 2], t, n, u);
                break;
            case "dashedLine":
                s = AmCharts.line(i, [0, r], [r / 2, r / 2], t, n, u, 3);
                break;
            case "triangleUp":
                s = AmCharts.polygon(i, [0, r / 2, r, r], [r, 0, r, r], t, n, u, o, a);
                break;
            case "triangleDown":
                s = AmCharts.polygon(i, [0, r / 2, r, r], [0, r, 0, 0], t, n, u, o, a);
                break;
            case "bubble":
                s = AmCharts.circle(i, r / 2, t, n, u, o, a, !0), s.translate(r / 2, r / 2)
        }
        return s
    },
    validateNow: function() {
        this.invalidateSize()
    },
    updateValues: function() {
        var e = this.valueLabels,
            t = this.chart,
            n;
        for (n = 0; n < e.length; n++) {
            var r = e[n],
                i = r.dItem;
            if (void 0 !== i.type) {
                var s = i.currentDataItem;
                if (s) {
                    var o = this.valueText;
                    i.legendValueText && (o = i.legendValueText);
                    i = o;
                    i = t.formatString(i, s);
                    r.text(i)
                } else r.text(" ")
            } else s = t.formatString(this.valueText, i), r.text(s)
        }
    },
    renderFix: function() {
        if (!AmCharts.VML) {
            var e = this.container;
            e && e.renderFix()
        }
    },
    destroy: function() {
        this.div.innerHTML = "";
        AmCharts.remove(this.set)
    }
});
AmCharts.AmBalloon = AmCharts.Class({
    construct: function() {
        this.enabled = !0;
        this.fillColor = "#CC0000";
        this.fillAlpha = 1;
        this.borderThickness = 2;
        this.borderColor = "#FFFFFF";
        this.borderAlpha = 1;
        this.cornerRadius = 6;
        this.maximumWidth = 220;
        this.horizontalPadding = 8;
        this.verticalPadding = 5;
        this.pointerWidth = 10;
        this.pointerOrientation = "V";
        this.color = "#FFFFFF";
        this.textShadowColor = "#000000";
        this.adjustBorderColor = !1;
        this.showBullet = !0;
        this.show = this.follow = !1;
        this.bulletSize = 3;
        this.textAlign = "middle"
    },
    draw: function() {
        var e = this.pointToX,
            t = this.pointToY,
            n = this.textAlign;
        if (!isNaN(e)) {
            var r = this.chart,
                i = r.container,
                s = this.set;
            AmCharts.remove(s);
            AmCharts.remove(this.pointer);
            this.set = s = i.set();
            r.balloonsSet.push(s);
            if (this.show) {
                var o = this.l,
                    u = this.t,
                    a = this.r,
                    f = this.b,
                    l = this.textShadowColor;
                this.color == l && (l = void 0);
                var c = this.balloonColor,
                    h = this.fillColor,
                    p = this.borderColor;
                void 0 != c && (this.adjustBorderColor ? p = c : h = c);
                var d = this.horizontalPadding,
                    c = this.verticalPadding,
                    v = this.pointerWidth,
                    m = this.pointerOrientation,
                    g = this.cornerRadius,
                    y = r.fontFamily,
                    b = this.fontSize;
                void 0 == b && (b = r.fontSize);
                r = AmCharts.text(i, this.text, this.color, y, b, n);
                s.push(r);
                var w;
                void 0 != l && (w = AmCharts.text(i, this.text, l, y, b, n, !1, .4), s.push(w));
                y = r.getBBox();
                l = y.height + 2 * c;
                y = y.width + 2 * d;
                window.opera && (l += 2);
                var E, b = b / 2 + c;
                switch (n) {
                    case "middle":
                        E = y / 2;
                        break;
                    case "left":
                        E = d;
                        break;
                    case "right":
                        E = y - d
                }
                r.translate(E, b);
                w && w.translate(E + 1, b + 1);
                "H" != m ? (E = e - y / 2, n = t < u + l + 10 && "down" != m ? t + v : t - l - v) : (2 * v > l && (v = l / 2), n = t - l / 2, E = e < o + (a - o) / 2 ? e + v : e - y - v);
                n + l >= f && (n = f - l);
                n < u && (n = u);
                E < o && (E = o);
                E + y > a && (E = a - y);
                0 < g || 0 === v ? (p = AmCharts.rect(i, y, l, h, this.fillAlpha, this.borderThickness, p, this.borderAlpha, this.cornerRadius), this.showBullet && (i = AmCharts.circle(i, this.bulletSize, h, this.fillAlpha), i.translate(e, t), this.pointer = i)) : (f = [], g = [], "H" != m ? (o = e - E, o > y - v && (o = y - v), o < v && (o = v), f = [0, o - v, e - E, o + v, y, y, 0, 0], g = t < u + l + 10 && "down" != m ? [0, 0, t - n, 0, 0, l, l, 0] : [l, l, t - n, l, l, 0, 0, l]) : (u = t - n, u > l - v && (u = l - v), u < v && (u = v), g = [0, u - v, t - n, u + v, l, l, 0, 0], f = e < o + (a - o) / 2 ? [0, 0, E < e ? 0 : e - E, 0, 0, y, y, 0] : [y, y, E + y > e ? y : e - E, y, y, 0, 0, y]), p = AmCharts.polygon(i, f, g, h, this.fillAlpha, this.borderThickness, p, this.borderAlpha));
                s.push(p);
                p.toFront();
                w && w.toFront();
                r.toFront();
                e = 1;
                9 > AmCharts.IEversion && this.follow && (e = 6);
                s.translate(E - e, n);
                s = r.getBBox();
                this.bottom = n + s.y + s.height + 2 * c + 2;
                this.yPos = s.y + n
            }
        }
    },
    followMouse: function() {
        if (this.follow && this.show) {
            var e = this.chart.mouseX,
                t = this.chart.mouseY - 3;
            this.pointToX = e;
            this.pointToY = t;
            if (e != this.previousX || t != this.previousY)
                if (this.previousX = e, this.previousY = t, 0 === this.cornerRadius) this.draw();
                else {
                    var n = this.set;
                    if (n) {
                        var r = n.getBBox(),
                            e = e - r.width / 2,
                            i = t - r.height - 10;
                        e < this.l && (e = this.l);
                        e > this.r - r.width && (e = this.r - r.width);
                        i < this.t && (i = t + 10);
                        n.translate(e, i)
                    }
                }
        }
    },
    changeColor: function(e) {
        this.balloonColor = e
    },
    setBounds: function(e, t, n, r) {
        this.l = e;
        this.t = t;
        this.r = n;
        this.b = r
    },
    showBalloon: function(e) {
        this.text = e;
        this.show = !0;
        this.draw()
    },
    hide: function() {
        this.follow = this.show = !1;
        this.destroy()
    },
    setPosition: function(e, t, n) {
        this.pointToX = e;
        this.pointToY = t;
        n && (e != this.previousX || t != this.previousY) && this.draw();
        this.previousX = e;
        this.previousY = t
    },
    followCursor: function(e) {
        var t = this;
        (t.follow = e) ? (t.pShowBullet = t.showBullet, t.showBullet = !1) : void 0 !== t.pShowBullet && (t.showBullet = t.pShowBullet);
        clearInterval(t.interval);
        var n = t.chart.mouseX,
            r = t.chart.mouseY;
        !isNaN(n) && e && (t.pointToX = n, t.pointToY = r - 3, t.interval = setInterval(function() {
            t.followMouse.call(t)
        }, 40))
    },
    destroy: function() {
        clearInterval(this.interval);
        AmCharts.remove(this.set);
        this.set = null;
        AmCharts.remove(this.pointer);
        this.pointer = null
    }
});
AmCharts.AmCoordinateChart = AmCharts.Class({
    inherits: AmCharts.AmChart,
    construct: function() {
        AmCharts.AmCoordinateChart.base.construct.call(this);
        this.createEvents("rollOverGraphItem", "rollOutGraphItem", "clickGraphItem", "doubleClickGraphItem", "rightClickGraphItem", "clickGraph");
        this.plotAreaFillColors = "#FFFFFF";
        this.plotAreaFillAlphas = 0;
        this.plotAreaBorderColor = "#000000";
        this.plotAreaBorderAlpha = 0;
        this.startAlpha = 1;
        this.startDuration = 0;
        this.startEffect = "elastic";
        this.sequencedAnimation = !0;
        this.colors = "#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" ");
        this.balloonDateFormat = "MMM DD, YYYY";
        this.valueAxes = [];
        this.graphs = []
    },
    initChart: function() {
        AmCharts.AmCoordinateChart.base.initChart.call(this);
        this.createValueAxes();
        AmCharts.VML && (this.startAlpha = 1);
        var e = this.legend;
        e && e.setData(this.graphs)
    },
    createValueAxes: function() {
        if (0 === this.valueAxes.length) {
            var e = new AmCharts.ValueAxis;
            this.addValueAxis(e)
        }
    },
    parseData: function() {
        this.processValueAxes();
        this.processGraphs()
    },
    parseSerialData: function() {
        AmCharts.AmSerialChart.base.parseData.call(this);
        var e = this.graphs,
            t, n = {},
            r = this.seriesIdField;
        r || (r = this.categoryField);
        this.chartData = [];
        var i = this.dataProvider;
        if (i) {
            var s = !1,
                o, u = this.categoryAxis;
            if (u) {
                var s = u.parseDates,
                    a = u.forceShowField;
                o = u.categoryFunction
            }
            var f, l;
            s && (t = AmCharts.extractPeriod(u.minPeriod), f = t.period, l = t.count);
            var c = {};
            this.lookupTable = c;
            var h;
            for (h = 0; h < i.length; h++) {
                var p = {},
                    d = i[h];
                t = d[this.categoryField];
                p.category = o ? o(t, d, u) : String(t);
                a && (p.forceShow = d[a]);
                c[d[r]] = p;
                s && (t = u.categoryFunction ? u.categoryFunction(t, d, u) : isNaN(t) ? AmCharts.useUTC ? new Date(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate(), t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds(), t.getUTCMilliseconds()) : new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()) : new Date(t), t = AmCharts.resetDateToMin(t, f, l), p.category = t, p.time = t.getTime());
                var v = this.valueAxes;
                p.axes = {};
                p.x = {};
                var m;
                for (m = 0; m < v.length; m++) {
                    var g = v[m].id;
                    p.axes[g] = {};
                    p.axes[g].graphs = {};
                    var y;
                    for (y = 0; y < e.length; y++) {
                        t = e[y];
                        var b = t.id,
                            w = t.periodValue;
                        if (t.valueAxis.id == g) {
                            p.axes[g].graphs[b] = {};
                            var E = {};
                            E.index = h;
                            t.dataProvider && (d = n);
                            E.values = this.processValues(d, t, w);
                            this.processFields(t, E, d);
                            E.category = p.category;
                            E.serialDataItem = p;
                            E.graph = t;
                            p.axes[g].graphs[b] = E
                        }
                    }
                }
                this.chartData[h] = p
            }
        }
        for (n = 0; n < e.length; n++) t = e[n], t.dataProvider && this.parseGraphData(t)
    },
    processValues: function(e, t, n) {
        var r = {},
            i, s = !1;
        if (("candlestick" == t.type || "ohlc" == t.type) && "" !== n) s = !0;
        i = Number(e[t.valueField + n]);
        isNaN(i) || (r.value = i);
        s && (n = "Open");
        i = Number(e[t.openField + n]);
        isNaN(i) || (r.open = i);
        s && (n = "Close");
        i = Number(e[t.closeField + n]);
        isNaN(i) || (r.close = i);
        s && (n = "Low");
        i = Number(e[t.lowField + n]);
        isNaN(i) || (r.low = i);
        s && (n = "High");
        i = Number(e[t.highField + n]);
        isNaN(i) || (r.high = i);
        return r
    },
    parseGraphData: function(e) {
        var t = e.dataProvider,
            n = e.seriesIdField;
        n || (n = this.seriesIdField);
        n || (n = this.categoryField);
        var r;
        for (r = 0; r < t.length; r++) {
            var i = t[r],
                s = this.lookupTable[String(i[n])],
                o = e.valueAxis.id;
            s && (o = s.axes[o].graphs[e.id], o.serialDataItem = s, o.values = this.processValues(i, e, e.periodValue), this.processFields(e, o, i))
        }
    },
    addValueAxis: function(e) {
        e.chart = this;
        this.valueAxes.push(e);
        this.validateData()
    },
    removeValueAxesAndGraphs: function() {
        var e = this.valueAxes,
            t;
        for (t = e.length - 1; - 1 < t; t--) this.removeValueAxis(e[t])
    },
    removeValueAxis: function(e) {
        var t = this.graphs,
            n;
        for (n = t.length - 1; 0 <= n; n--) {
            var r = t[n];
            r && r.valueAxis == e && this.removeGraph(r)
        }
        t = this.valueAxes;
        for (n = t.length - 1; 0 <= n; n--) t[n] == e && t.splice(n, 1);
        this.validateData()
    },
    addGraph: function(e) {
        this.graphs.push(e);
        this.chooseGraphColor(e, this.graphs.length - 1);
        this.validateData()
    },
    removeGraph: function(e) {
        var t = this.graphs,
            n;
        for (n = t.length - 1; 0 <= n; n--) t[n] == e && (t.splice(n, 1), e.destroy());
        this.validateData()
    },
    processValueAxes: function() {
        var e = this.valueAxes,
            t;
        for (t = 0; t < e.length; t++) {
            var n = e[t];
            n.chart = this;
            n.id || (n.id = "valueAxis" + t + "_" + (new Date).getTime());
            if (!0 === this.usePrefixes || !1 === this.usePrefixes) n.usePrefixes = this.usePrefixes
        }
    },
    processGraphs: function() {
        var e = this.graphs,
            t;
        for (t = 0; t < e.length; t++) {
            var n = e[t];
            n.chart = this;
            n.valueAxis || (n.valueAxis = this.valueAxes[0]);
            n.id || (n.id = "graph" + t + "_" + (new Date).getTime())
        }
    },
    formatString: function(e, t) {
        var n = t.graph,
            r = n.valueAxis;
        r.duration && t.values.value && (r = AmCharts.formatDuration(t.values.value, r.duration, "", r.durationUnits, r.maxInterval, r.numberFormatter), e = e.split("[[value]]").join(r));
        e = AmCharts.massReplace(e, {
            "[[title]]": n.title,
            "[[description]]": t.description,
            "<br>": "\n"
        });
        e = AmCharts.fixNewLines(e);
        return e = AmCharts.cleanFromEmpty(e)
    },
    getBalloonColor: function(e, t) {
        var n = e.lineColor,
            r = e.balloonColor,
            i = e.fillColors;
        "object" == typeof i ? n = i[0] : void 0 !== i && (n = i);
        if (t.isNegative) {
            var i = e.negativeLineColor,
                s = e.negativeFillColors;
            "object" == typeof s ? i = s[0] : void 0 !== s && (i = s);
            void 0 !== i && (n = i)
        }
        void 0 !== t.color && (n = t.color);
        void 0 === r && (r = n);
        return r
    },
    getGraphById: function(e) {
        return this.getObjById(this.graphs, e)
    },
    getValueAxisById: function(e) {
        return this.getObjById(this.valueAxes, e)
    },
    getObjById: function(e, t) {
        var n, r;
        for (r = 0; r < e.length; r++) {
            var i = e[r];
            i.id == t && (n = i)
        }
        return n
    },
    processFields: function(e, t, n) {
        if (e.itemColors) {
            var r = e.itemColors,
                i = t.index;
            t.color = i < r.length ? r[i] : AmCharts.randomColor()
        }
        r = "lineColor color alpha fillColors description bullet customBullet bulletSize bulletConfig url labelColor".split(" ");
        for (i = 0; i < r.length; i++) {
            var s = r[i],
                o = e[s + "Field"];
            o && (o = n[o], AmCharts.isDefined(o) && (t[s] = o))
        }
        t.dataContext = n
    },
    chooseGraphColor: function(e, t) {
        if (void 0 == e.lineColor) {
            var n;
            n = this.colors.length > t ? this.colors[t] : AmCharts.randomColor();
            e.lineColor = n
        }
    },
    handleLegendEvent: function(e) {
        var t = e.type;
        if (e = e.dataItem) {
            var n = e.hidden,
                r = e.showBalloon;
            switch (t) {
                case "clickMarker":
                    r ? this.hideGraphsBalloon(e) : this.showGraphsBalloon(e);
                    break;
                case "clickLabel":
                    r ? this.hideGraphsBalloon(e) : this.showGraphsBalloon(e);
                    break;
                case "rollOverItem":
                    n || this.highlightGraph(e);
                    break;
                case "rollOutItem":
                    n || this.unhighlightGraph();
                    break;
                case "hideItem":
                    this.hideGraph(e);
                    break;
                case "showItem":
                    this.showGraph(e)
            }
        }
    },
    highlightGraph: function(e) {
        var t = this.graphs,
            n, r = .2;
        this.legend && (r = this.legend.rollOverGraphAlpha);
        if (1 != r)
            for (n = 0; n < t.length; n++) {
                var i = t[n];
                i != e && i.changeOpacity(r)
            }
    },
    unhighlightGraph: function() {
        this.legend && (alpha = this.legend.rollOverGraphAlpha);
        if (1 != alpha) {
            var e = this.graphs,
                t;
            for (t = 0; t < e.length; t++) e[t].changeOpacity(1)
        }
    },
    showGraph: function(e) {
        e.hidden = !1;
        this.dataChanged = !0;
        this.marginsUpdated = !1;
        this.chartCreated && this.initChart()
    },
    hideGraph: function(e) {
        this.dataChanged = !0;
        this.marginsUpdated = !1;
        e.hidden = !0;
        this.chartCreated && this.initChart()
    },
    hideGraphsBalloon: function(e) {
        e.showBalloon = !1;
        this.updateLegend()
    },
    showGraphsBalloon: function(e) {
        e.showBalloon = !0;
        this.updateLegend()
    },
    updateLegend: function() {
        this.legend && this.legend.invalidateSize()
    },
    resetAnimation: function() {
        var e = this.graphs;
        if (e) {
            var t;
            for (t = 0; t < e.length; t++) e[t].animationPlayed = !1
        }
    },
    animateAgain: function() {
        this.resetAnimation();
        this.validateNow()
    }
});
AmCharts.AmRectangularChart = AmCharts.Class({
    inherits: AmCharts.AmCoordinateChart,
    construct: function() {
        AmCharts.AmRectangularChart.base.construct.call(this);
        this.createEvents("zoomed");
        this.marginRight = this.marginBottom = this.marginTop = this.marginLeft = 20;
        this.verticalPosition = this.horizontalPosition = this.depth3D = this.angle = 0;
        this.heightMultiplier = this.widthMultiplier = 1;
        this.zoomOutText = "Show all";
        this.zoomOutButton = {
            backgroundColor: "#b2e1ff",
            backgroundAlpha: 1
        };
        this.trendLines = [];
        this.autoMargins = !0;
        this.marginsUpdated = !1;
        this.autoMarginOffset = 10
    },
    initChart: function() {
        AmCharts.AmRectangularChart.base.initChart.call(this);
        this.updateDxy();
        var e = !0;
        !this.marginsUpdated && this.autoMargins && (this.resetMargins(), e = !1);
        this.updateMargins();
        this.updatePlotArea();
        this.updateScrollbars();
        this.updateTrendLines();
        this.updateChartCursor();
        this.updateValueAxes();
        e && (this.scrollbarOnly || this.updateGraphs())
    },
    drawChart: function() {
        AmCharts.AmRectangularChart.base.drawChart.call(this);
        this.drawPlotArea();
        if (AmCharts.ifArray(this.chartData)) {
            var e = this.chartCursor;
            e && e.draw();
            e = this.zoomOutText;
            "" !== e && e && this.drawZoomOutButton()
        }
    },
    resetMargins: function() {
        var e = {},
            t;
        if ("serial" == this.chartType) {
            var n = this.valueAxes;
            for (t = 0; t < n.length; t++) {
                var r = n[t];
                r.ignoreAxisWidth || (r.setOrientation(this.rotate), r.fixAxisPosition(), e[r.position] = !0)
            }
            if ((t = this.categoryAxis) && !t.ignoreAxisWidth) t.setOrientation(!this.rotate), t.fixAxisPosition(), t.fixAxisPosition(), e[t.position] = !0
        } else {
            r = this.xAxes;
            n = this.yAxes;
            for (t = 0; t < r.length; t++) {
                var i = r[t];
                i.ignoreAxisWidth || (i.setOrientation(!0), i.fixAxisPosition(), e[i.position] = !0)
            }
            for (t = 0; t < n.length; t++) r = n[t], r.ignoreAxisWidth || (r.setOrientation(!1), r.fixAxisPosition(), e[r.position] = !0)
        }
        e.left && (this.marginLeft = 0);
        e.right && (this.marginRight = 0);
        e.top && (this.marginTop = 0);
        e.bottom && (this.marginBottom = 0);
        this.fixMargins = e
    },
    measureMargins: function() {
        var e = this.valueAxes,
            t, n = this.autoMarginOffset,
            r = this.fixMargins,
            i = this.realWidth,
            s = this.realHeight,
            o = n,
            u = n,
            a = i - n;
        t = s - n;
        var f;
        for (f = 0; f < e.length; f++) t = this.getAxisBounds(e[f], o, a, u, t), o = t.l, a = t.r, u = t.t, t = t.b;
        if (e = this.categoryAxis) t = this.getAxisBounds(e, o, a, u, t), o = t.l, a = t.r, u = t.t, t = t.b;
        r.left && o < n && (this.marginLeft = Math.round(-o + n));
        r.right && a > i - n && (this.marginRight = Math.round(a - i + n));
        r.top && u < n + this.titleHeight && (this.marginTop = Math.round(this.marginTop - u + n + this.titleHeight));
        r.bottom && t > s - n && (this.marginBottom = Math.round(t - s + n));
        this.initChart()
    },
    getAxisBounds: function(e, t, n, r, i) {
        if (!e.ignoreAxisWidth) {
            var s = e.labelsSet,
                o = e.tickLength;
            e.inside && (o = 0);
            if (s) switch (s = e.getBBox(), e.position) {
                case "top":
                    e = s.y;
                    r > e && (r = e);
                    break;
                case "bottom":
                    e = s.y + s.height;
                    i < e && (i = e);
                    break;
                case "right":
                    e = s.x + s.width + o + 3;
                    n < e && (n = e);
                    break;
                case "left":
                    e = s.x - o, t > e && (t = e)
            }
        }
        return {
            l: t,
            t: r,
            r: n,
            b: i
        }
    },
    drawZoomOutButton: function() {
        var e = this,
            t = e.container.set();
        e.zoomButtonSet.push(t);
        var n = e.color,
            r = e.fontSize,
            i = e.zoomOutButton;
        i && (i.fontSize && (r = i.fontSize), i.color && (n = i.color));
        n = AmCharts.text(e.container, e.zoomOutText, n, e.fontFamily, r, "start");
        r = n.getBBox();
        n.translate(29, 6 + r.height / 2);
        i = AmCharts.rect(e.container, r.width + 40, r.height + 15, i.backgroundColor, i.backgroundAlpha);
        t.push(i);
        e.zbBG = i;
        void 0 !== e.pathToImages && (i = e.container.image(e.pathToImages + "lens.png", 0, 0, 16, 16), i.translate(7, r.height / 2 - 1), i.toFront(), t.push(i));
        n.toFront();
        t.push(n);
        i = t.getBBox();
        t.translate(e.marginLeftReal + e.plotAreaWidth - i.width, e.marginTopReal);
        t.hide();
        t.mouseover(function() {
            e.rollOverZB()
        }).mouseout(function() {
            e.rollOutZB()
        }).click(function() {
            e.clickZB()
        }).touchstart(function() {
            e.rollOverZB()
        }).touchend(function() {
            e.rollOutZB();
            e.clickZB()
        });
        for (i = 0; i < t.length; i++) t[i].attr({
            cursor: "pointer"
        });
        e.zbSet = t
    },
    rollOverZB: function() {
        this.zbBG.show()
    },
    rollOutZB: function() {
        this.zbBG.hide()
    },
    clickZB: function() {
        this.zoomOut()
    },
    zoomOut: function() {
        this.updateScrollbar = !0;
        this.zoom()
    },
    drawPlotArea: function() {
        var e = this.dx,
            t = this.dy,
            n = this.marginLeftReal,
            r = this.marginTopReal,
            i = this.plotAreaWidth - 1,
            s = this.plotAreaHeight - 1,
            o = this.plotAreaFillColors,
            u = this.plotAreaFillAlphas,
            a = this.plotAreaBorderColor,
            f = this.plotAreaBorderAlpha;
        this.trendLinesSet.clipRect(n, r, i, s);
        "object" == typeof u && (u = u[0]);
        o = AmCharts.polygon(this.container, [0, i, i, 0], [0, 0, s, s], o, u, 1, a, f, this.plotAreaGradientAngle);
        o.translate(n + e, r + t);
        o.node.setAttribute("class", "amChartsPlotArea");
        this.set.push(o);
        0 !== e && 0 !== t && (o = this.plotAreaFillColors, "object" == typeof o && (o = o[0]), o = AmCharts.adjustLuminosity(o, -.15), i = AmCharts.polygon(this.container, [0, e, i + e, i, 0], [0, t, t, 0, 0], o, u, 1, a, f), i.translate(n, r + s), this.set.push(i), e = AmCharts.polygon(this.container, [0, 0, e, e, 0], [0, s, s + t, t, 0], o, u, 1, a, f), e.translate(n, r), this.set.push(e))
    },
    updatePlotArea: function() {
        var e = this.updateWidth(),
            t = this.updateHeight(),
            n = this.container;
        this.realWidth = e;
        this.realWidth = t;
        n && this.container.setSize(e, t);
        e = e - this.marginLeftReal - this.marginRightReal - this.dx;
        t = t - this.marginTopReal - this.marginBottomReal;
        1 > e && (e = 1);
        1 > t && (t = 1);
        this.plotAreaWidth = Math.round(e);
        this.plotAreaHeight = Math.round(t)
    },
    updateDxy: function() {
        this.dx = Math.round(this.depth3D * Math.cos(this.angle * Math.PI / 180));
        this.dy = Math.round(-this.depth3D * Math.sin(this.angle * Math.PI / 180));
        this.d3x = Math.round(this.columnSpacing3D * Math.cos(this.angle * Math.PI / 180));
        this.d3y = Math.round(-this.columnSpacing3D * Math.sin(this.angle * Math.PI / 180))
    },
    updateMargins: function() {
        var e = this.getTitleHeight();
        this.titleHeight = e;
        this.marginTopReal = this.marginTop - this.dy + e;
        this.marginBottomReal = this.marginBottom;
        this.marginLeftReal = this.marginLeft;
        this.marginRightReal = this.marginRight
    },
    updateValueAxes: function() {
        var e = this.valueAxes,
            t = this.marginLeftReal,
            n = this.marginTopReal,
            r = this.plotAreaHeight,
            i = this.plotAreaWidth,
            s;
        for (s = 0; s < e.length; s++) {
            var o = e[s];
            o.axisRenderer = AmCharts.RecAxis;
            o.guideFillRenderer = AmCharts.RecFill;
            o.axisItemRenderer = AmCharts.RecItem;
            o.dx = this.dx;
            o.dy = this.dy;
            o.viW = i - 1;
            o.viH = r - 1;
            o.marginsChanged = !0;
            o.viX = t;
            o.viY = n;
            this.updateObjectSize(o)
        }
    },
    updateObjectSize: function(e) {
        e.width = (this.plotAreaWidth - 1) * this.widthMultiplier;
        e.height = (this.plotAreaHeight - 1) * this.heightMultiplier;
        e.x = this.marginLeftReal + this.horizontalPosition;
        e.y = this.marginTopReal + this.verticalPosition
    },
    updateGraphs: function() {
        var e = this.graphs,
            t;
        for (t = 0; t < e.length; t++) {
            var n = e[t];
            n.x = this.marginLeftReal + this.horizontalPosition;
            n.y = this.marginTopReal + this.verticalPosition;
            n.width = this.plotAreaWidth * this.widthMultiplier;
            n.height = this.plotAreaHeight * this.heightMultiplier;
            n.index = t;
            n.dx = this.dx;
            n.dy = this.dy;
            n.rotate = this.rotate;
            n.chartType = this.chartType
        }
    },
    updateChartCursor: function() {
        var e = this.chartCursor;
        e && (e.x = this.marginLeftReal, e.y = this.marginTopReal, e.width = this.plotAreaWidth - 1, e.height = this.plotAreaHeight - 1, e.chart = this)
    },
    updateScrollbars: function() {},
    addChartCursor: function(e) {
        AmCharts.callMethod("destroy", [this.chartCursor]);
        e && (this.listenTo(e, "changed", this.handleCursorChange), this.listenTo(e, "zoomed", this.handleCursorZoom));
        this.chartCursor = e
    },
    removeChartCursor: function() {
        AmCharts.callMethod("destroy", [this.chartCursor]);
        this.chartCursor = null
    },
    zoomTrendLines: function() {
        var e = this.trendLines,
            t;
        for (t = 0; t < e.length; t++) {
            var n = e[t];
            n.valueAxis.recalculateToPercents ? n.set && n.set.hide() : (n.x = this.marginLeftReal + this.horizontalPosition, n.y = this.marginTopReal + this.verticalPosition, n.draw())
        }
    },
    addTrendLine: function(e) {
        this.trendLines.push(e)
    },
    removeTrendLine: function(e) {
        var t = this.trendLines,
            n;
        for (n = t.length - 1; 0 <= n; n--) t[n] == e && t.splice(n, 1)
    },
    adjustMargins: function(e, t) {
        var n = e.scrollbarHeight;
        "top" == e.position ? t ? this.marginLeftReal += n : this.marginTopReal += n : t ? this.marginRightReal += n : this.marginBottomReal += n
    },
    getScrollbarPosition: function(e, t, n) {
        e.position = t ? "bottom" == n || "left" == n ? "bottom" : "top" : "top" == n || "right" == n ? "bottom" : "top"
    },
    updateChartScrollbar: function(e, t) {
        if (e) {
            e.rotate = t;
            var n = this.marginTopReal,
                r = this.marginLeftReal,
                i = e.scrollbarHeight,
                s = this.dx,
                o = this.dy;
            "top" == e.position ? t ? (e.y = n, e.x = r - i) : (e.y = n - i + o, e.x = r + s) : t ? (e.y = n + o, e.x = r + this.plotAreaWidth + s) : (e.y = n + this.plotAreaHeight + 1, e.x = this.marginLeftReal)
        }
    },
    showZB: function(e) {
        var t = this.zbSet;
        t && (e ? t.show() : t.hide(), this.zbBG.hide())
    },
    handleReleaseOutside: function(e) {
        AmCharts.AmRectangularChart.base.handleReleaseOutside.call(this, e);
        (e = this.chartCursor) && e.handleReleaseOutside()
    },
    handleMouseDown: function(e) {
        AmCharts.AmRectangularChart.base.handleMouseDown.call(this, e);
        var t = this.chartCursor;
        t && t.handleMouseDown(e)
    },
    handleCursorChange: function() {}
});
AmCharts.TrendLine = AmCharts.Class({
    construct: function() {
        this.createEvents("click");
        this.isProtected = !1;
        this.dashLength = 0;
        this.lineColor = "#00CC00";
        this.lineThickness = this.lineAlpha = 1
    },
    draw: function() {
        var e = this;
        e.destroy();
        var t = e.chart,
            n = t.container,
            r, i, s, o, u = e.categoryAxis,
            a = e.initialDate,
            f = e.initialCategory,
            l = e.finalDate,
            c = e.finalCategory,
            h = e.valueAxis,
            p = e.valueAxisX,
            d = e.initialXValue,
            v = e.finalXValue,
            m = e.initialValue,
            g = e.finalValue,
            y = h.recalculateToPercents;
        u && (a && (r = u.dateToCoordinate(a)), f && (r = u.categoryToCoordinate(f)), l && (i = u.dateToCoordinate(l)), c && (i = u.categoryToCoordinate(c)));
        p && !y && (isNaN(d) || (r = p.getCoordinate(d)), isNaN(v) || (i = p.getCoordinate(v)));
        h && !y && (isNaN(m) || (s = h.getCoordinate(m)), isNaN(g) || (o = h.getCoordinate(g)));
        !isNaN(r) && !isNaN(i) && !isNaN(s) && !isNaN(s) && (t.rotate ? (u = [s, o], i = [r, i]) : (u = [r, i], i = [s, o]), s = e.lineColor, r = AmCharts.line(n, u, i, s, e.lineAlpha, e.lineThickness, e.dashLength), i = AmCharts.line(n, u, i, s, .005, 5), n = n.set([r, i]), n.translate(t.marginLeftReal, t.marginTopReal), t.trendLinesSet.push(n), e.line = r, e.set = n, i.mouseup(function() {
            e.handleLineClick()
        }).mouseover(function() {
            e.handleLineOver()
        }).mouseout(function() {
            e.handleLineOut()
        }), i.touchend && i.touchend(function() {
            e.handleLineClick()
        }))
    },
    handleLineClick: function() {
        var e = {
            type: "click",
            trendLine: this,
            chart: this.chart
        };
        this.fire(e.type, e)
    },
    handleLineOver: function() {
        var e = this.rollOverColor;
        void 0 !== e && this.line.attr({
            stroke: e
        })
    },
    handleLineOut: function() {
        this.line.attr({
            stroke: this.lineColor
        })
    },
    destroy: function() {
        AmCharts.remove(this.set)
    }
});
AmCharts.AmSerialChart = AmCharts.Class({
    inherits: AmCharts.AmRectangularChart,
    construct: function() {
        AmCharts.AmSerialChart.base.construct.call(this);
        this.createEvents("changed");
        this.columnSpacing = 5;
        this.columnSpacing3D = 0;
        this.columnWidth = .8;
        this.updateScrollbar = !0;
        var e = new AmCharts.CategoryAxis;
        e.chart = this;
        this.categoryAxis = e;
        this.chartType = "serial";
        this.zoomOutOnDataUpdate = !0;
        this.skipZoom = !1;
        this.minSelectedTime = 0
    },
    initChart: function() {
        AmCharts.AmSerialChart.base.initChart.call(this);
        this.updateCategoryAxis();
        this.dataChanged && (this.updateData(), this.dataChanged = !1, this.dispatchDataUpdated = !0);
        var e = this.chartCursor;
        e && e.updateData();
        var e = this.countColumns(),
            t = this.graphs,
            n;
        for (n = 0; n < t.length; n++) t[n].columnCount = e;
        this.updateScrollbar = !0;
        this.drawChart();
        this.autoMargins && !this.marginsUpdated && (this.marginsUpdated = !0, this.measureMargins())
    },
    validateData: function(e) {
        this.marginsUpdated = !1;
        this.zoomOutOnDataUpdate && !e && (this.endTime = this.end = this.startTime = this.start = NaN);
        AmCharts.AmSerialChart.base.validateData.call(this)
    },
    drawChart: function() {
        AmCharts.AmSerialChart.base.drawChart.call(this);
        var e = this.chartData;
        if (AmCharts.ifArray(e)) {
            var t = this.chartScrollbar;
            t && t.draw();
            if (0 < this.realWidth && 0 < this.realHeight) {
                var e = e.length - 1,
                    n, t = this.categoryAxis;
                if (t.parseDates && !t.equalSpacing) {
                    if (t = this.startTime, n = this.endTime, isNaN(t) || isNaN(n)) t = this.firstTime, n = this.lastTime
                } else if (t = this.start, n = this.end, isNaN(t) || isNaN(n)) t = 0, n = e;
                this.endTime = this.startTime = this.end = this.start = void 0;
                this.zoom(t, n)
            }
        } else this.cleanChart();
        this.dispDUpd();
        this.chartCreated = !0
    },
    cleanChart: function() {
        AmCharts.callMethod("destroy", [this.valueAxes, this.graphs, this.categoryAxis, this.chartScrollbar, this.chartCursor])
    },
    updateCategoryAxis: function() {
        var e = this.categoryAxis;
        e.id = "categoryAxis";
        e.rotate = this.rotate;
        e.axisRenderer = AmCharts.RecAxis;
        e.guideFillRenderer = AmCharts.RecFill;
        e.axisItemRenderer = AmCharts.RecItem;
        e.setOrientation(!this.rotate);
        e.x = this.marginLeftReal;
        e.y = this.marginTopReal;
        e.dx = this.dx;
        e.dy = this.dy;
        e.width = this.plotAreaWidth - 1;
        e.height = this.plotAreaHeight - 1;
        e.viW = this.plotAreaWidth - 1;
        e.viH = this.plotAreaHeight - 1;
        e.viX = this.marginLeftReal;
        e.viY = this.marginTopReal;
        e.marginsChanged = !0
    },
    updateValueAxes: function() {
        AmCharts.AmSerialChart.base.updateValueAxes.call(this);
        var e = this.valueAxes,
            t;
        for (t = 0; t < e.length; t++) {
            var n = e[t],
                r = this.rotate;
            n.rotate = r;
            n.setOrientation(r);
            r = this.categoryAxis;
            if (!r.startOnAxis || r.parseDates) n.expandMinMax = !0
        }
    },
    updateData: function() {
        this.parseData();
        var e = this.graphs,
            t, n = this.chartData;
        for (t = 0; t < e.length; t++) e[t].data = n;
        0 < n.length && (this.firstTime = this.getStartTime(n[0].time), this.lastTime = this.getEndTime(n[n.length - 1].time))
    },
    getStartTime: function(e) {
        var t = this.categoryAxis;
        return AmCharts.resetDateToMin(new Date(e), t.minPeriod, 1, t.firstDayOfWeek).getTime()
    },
    getEndTime: function(e) {
        var t = this.categoryAxis;
        t.minDuration();
        return AmCharts.changeDate(new Date(e), t.minPeriod, 1, !0).getTime() - 1
    },
    updateMargins: function() {
        AmCharts.AmSerialChart.base.updateMargins.call(this);
        var e = this.chartScrollbar;
        e && (this.getScrollbarPosition(e, this.rotate, this.categoryAxis.position), this.adjustMargins(e, this.rotate))
    },
    updateScrollbars: function() {
        this.updateChartScrollbar(this.chartScrollbar, this.rotate)
    },
    zoom: function(e, t) {
        var n = this.categoryAxis;
        n.parseDates && !n.equalSpacing ? this.timeZoom(e, t) : this.indexZoom(e, t)
    },
    timeZoom: function(e, t) {
        var n = this.maxSelectedTime;
        isNaN(n) || (t != this.endTime && t - e > n && (e = t - n, this.updateScrollbar = !0), e != this.startTime && t - e > n && (t = e + n, this.updateScrollbar = !0));
        var r = this.minSelectedTime;
        if (0 < r && t - e < r) {
            var i = Math.round(e + (t - e) / 2),
                r = Math.round(r / 2);
            e = i - r;
            t = i + r
        }
        var s = this.chartData,
            i = this.categoryAxis;
        if (AmCharts.ifArray(s) && (e != this.startTime || t != this.endTime)) {
            var o = i.minDuration(),
                r = this.firstTime,
                u = this.lastTime;
            e || (e = r, isNaN(n) || (e = u - n));
            t || (t = u);
            e > u && (e = u);
            t < r && (t = r);
            e < r && (e = r);
            t > u && (t = u);
            t < e && (t = e + o);
            t - e < o / 5 && (t < u ? t = e + o / 5 : e = t - o / 5);
            this.startTime = e;
            this.endTime = t;
            n = s.length - 1;
            o = this.getClosestIndex(s, "time", e, !0, 0, n);
            s = this.getClosestIndex(s, "time", t, !1, o, n);
            i.timeZoom(e, t);
            i.zoom(o, s);
            this.start = AmCharts.fitToBounds(o, 0, n);
            this.end = AmCharts.fitToBounds(s, 0, n);
            this.zoomAxesAndGraphs();
            this.zoomScrollbar();
            e != r || t != u ? this.showZB(!0) : this.showZB(!1);
            this.updateColumnsDepth();
            this.dispatchTimeZoomEvent()
        }
    },
    indexZoom: function(e, t) {
        var n = this.maxSelectedSeries;
        isNaN(n) || (t != this.end && t - e > n && (e = t - n, this.updateScrollbar = !0), e != this.start && t - e > n && (t = e + n, this.updateScrollbar = !0));
        if (e != this.start || t != this.end) {
            var r = this.chartData.length - 1;
            isNaN(e) && (e = 0, isNaN(n) || (e = r - n));
            isNaN(t) && (t = r);
            t < e && (t = e);
            t > r && (t = r);
            e > r && (e = r - 1);
            0 > e && (e = 0);
            this.start = e;
            this.end = t;
            this.categoryAxis.zoom(e, t);
            this.zoomAxesAndGraphs();
            this.zoomScrollbar();
            0 !== e || t != this.chartData.length - 1 ? this.showZB(!0) : this.showZB(!1);
            this.updateColumnsDepth();
            this.dispatchIndexZoomEvent()
        }
    },
    updateGraphs: function() {
        AmCharts.AmSerialChart.base.updateGraphs.call(this);
        var e = this.graphs,
            t;
        for (t = 0; t < e.length; t++) {
            var n = e[t];
            n.columnWidth = this.columnWidth;
            n.categoryAxis = this.categoryAxis
        }
    },
    updateColumnsDepth: function() {
        var e, t = this.graphs,
            n;
        AmCharts.remove(this.columnsSet);
        this.columnsArray = [];
        for (e = 0; e < t.length; e++) {
            n = t[e];
            var r = n.columnsArray;
            if (r) {
                var i;
                for (i = 0; i < r.length; i++) this.columnsArray.push(r[i])
            }
        }
        this.columnsArray.sort(this.compareDepth);
        if (0 < this.columnsArray.length) {
            t = this.container.set();
            this.columnSet.push(t);
            for (e = 0; e < this.columnsArray.length; e++) t.push(this.columnsArray[e].column.set);
            n && t.translate(n.x, n.y);
            this.columnsSet = t
        }
    },
    compareDepth: function(e, t) {
        return e.depth > t.depth ? 1 : -1
    },
    zoomScrollbar: function() {
        var e = this.chartScrollbar,
            t = this.categoryAxis;
        e && this.updateScrollbar && (t.parseDates && !t.equalSpacing ? e.timeZoom(this.startTime, this.endTime) : e.zoom(this.start, this.end), this.updateScrollbar = !0)
    },
    updateTrendLines: function() {
        var e = this.trendLines,
            t;
        for (t = 0; t < e.length; t++) {
            var n = e[t];
            n.chart = this;
            n.valueAxis || (n.valueAxis = this.valueAxes[0]);
            n.categoryAxis = this.categoryAxis
        }
    },
    zoomAxesAndGraphs: function() {
        if (!this.scrollbarOnly) {
            var e = this.valueAxes,
                t;
            for (t = 0; t < e.length; t++) e[t].zoom(this.start, this.end);
            e = this.graphs;
            for (t = 0; t < e.length; t++) e[t].zoom(this.start, this.end);
            this.zoomTrendLines();
            (t = this.chartCursor) && t.zoom(this.start, this.end, this.startTime, this.endTime)
        }
    },
    countColumns: function() {
        var e = 0,
            t = this.valueAxes.length,
            n = this.graphs.length,
            r, i, s = !1,
            o, u;
        for (u = 0; u < t; u++) {
            i = this.valueAxes[u];
            var a = i.stackType;
            if ("100%" == a || "regular" == a) {
                s = !1;
                for (o = 0; o < n; o++) r = this.graphs[o], !r.hidden && r.valueAxis == i && "column" == r.type && (!s && r.stackable && (e++, s = !0), r.stackable || e++, r.columnIndex = e - 1)
            }
            if ("none" == a || "3d" == a)
                for (o = 0; o < n; o++) r = this.graphs[o], !r.hidden && r.valueAxis == i && "column" == r.type && (r.columnIndex = e, e++);
            if ("3d" == a) {
                for (u = 0; u < n; u++) r = this.graphs[u], r.depthCount = e;
                e = 1
            }
        }
        return e
    },
    parseData: function() {
        AmCharts.AmSerialChart.base.parseData.call(this);
        this.parseSerialData()
    },
    getCategoryIndexByValue: function(e) {
        var t = this.chartData,
            n, r;
        for (r = 0; r < t.length; r++) t[r].category == e && (n = r);
        return n
    },
    handleCursorChange: function(e) {
        this.updateLegendValues(e.index)
    },
    handleCursorZoom: function(e) {
        this.updateScrollbar = !0;
        this.zoom(e.start, e.end)
    },
    handleScrollbarZoom: function(e) {
        this.updateScrollbar = !1;
        this.zoom(e.start, e.end)
    },
    dispatchTimeZoomEvent: function() {
        if (this.prevStartTime != this.startTime || this.prevEndTime != this.endTime) {
            var e = {
                type: "zoomed"
            };
            e.startDate = new Date(this.startTime);
            e.endDate = new Date(this.endTime);
            e.startIndex = this.start;
            e.endIndex = this.end;
            this.startIndex = this.start;
            this.endIndex = this.end;
            this.startDate = e.startDate;
            this.endDate = e.endDate;
            this.prevStartTime = this.startTime;
            this.prevEndTime = this.endTime;
            var t = this.categoryAxis,
                n = AmCharts.extractPeriod(t.minPeriod).period,
                t = t.dateFormatsObject[n];
            e.startValue = AmCharts.formatDate(e.startDate, t);
            e.endValue = AmCharts.formatDate(e.endDate, t);
            e.chart = this;
            e.target = this;
            this.fire(e.type, e)
        }
    },
    dispatchIndexZoomEvent: function() {
        if (this.prevStartIndex != this.start || this.prevEndIndex != this.end) {
            this.startIndex = this.start;
            this.endIndex = this.end;
            var e = this.chartData;
            if (AmCharts.ifArray(e) && !isNaN(this.start) && !isNaN(this.end)) {
                var t = {
                    chart: this,
                    target: this,
                    type: "zoomed"
                };
                t.startIndex = this.start;
                t.endIndex = this.end;
                t.startValue = e[this.start].category;
                t.endValue = e[this.end].category;
                this.categoryAxis.parseDates && (this.startTime = e[this.start].time, this.endTime = e[this.end].time, t.startDate = new Date(this.startTime), t.endDate = new Date(this.endTime));
                this.prevStartIndex = this.start;
                this.prevEndIndex = this.end;
                this.fire(t.type, t)
            }
        }
    },
    updateLegendValues: function(e) {
        var t = this.graphs,
            n;
        for (n = 0; n < t.length; n++) {
            var r = t[n];
            r.currentDataItem = isNaN(e) ? void 0 : this.chartData[e].axes[r.valueAxis.id].graphs[r.id]
        }
        this.legend && this.legend.updateValues()
    },
    getClosestIndex: function(e, t, n, r, i, s) {
        0 > i && (i = 0);
        s > e.length - 1 && (s = e.length - 1);
        var o = i + Math.round((s - i) / 2),
            u = e[o][t];
        if (1 >= s - i) {
            if (r) return i;
            r = e[s][t];
            return Math.abs(e[i][t] - n) < Math.abs(r - n) ? i : s
        }
        return n == u ? o : n < u ? this.getClosestIndex(e, t, n, r, i, o) : this.getClosestIndex(e, t, n, r, o, s)
    },
    zoomToIndexes: function(e, t) {
        this.updateScrollbar = !0;
        var n = this.chartData;
        if (n) {
            var r = n.length;
            0 < r && (0 > e && (e = 0), t > r - 1 && (t = r - 1), r = this.categoryAxis, r.parseDates && !r.equalSpacing ? this.zoom(n[e].time, this.getEndTime(n[t].time)) : this.zoom(e, t))
        }
    },
    zoomToDates: function(e, t) {
        this.updateScrollbar = !0;
        var n = this.chartData;
        if (this.categoryAxis.equalSpacing) {
            var r = this.getClosestIndex(n, "time", e.getTime(), !0, 0, n.length),
                n = this.getClosestIndex(n, "time", t.getTime(), !1, 0, n.length);
            this.zoom(r, n)
        } else this.zoom(e.getTime(), t.getTime())
    },
    zoomToCategoryValues: function(e, t) {
        this.updateScrollbar = !0;
        this.zoom(this.getCategoryIndexByValue(e), this.getCategoryIndexByValue(t))
    },
    formatString: function(e, t) {
        var n = t.graph;
        if (-1 != e.indexOf("[[category]]")) {
            var r = t.serialDataItem.category;
            if (this.categoryAxis.parseDates) {
                var i = this.balloonDateFormat,
                    s = this.chartCursor;
                s && (i = s.categoryBalloonDateFormat); - 1 != e.indexOf("[[category]]") && (i = AmCharts.formatDate(r, i), -1 != i.indexOf("fff") && (i = AmCharts.formatMilliseconds(i, r)), r = i)
            }
            e = e.replace(/\[\[category\]\]/g, String(r))
        }
        n = n.numberFormatter;
        n || (n = this.numberFormatter);
        r = t.graph.valueAxis;
        if ((i = r.duration) && !isNaN(t.values.value)) r = AmCharts.formatDuration(t.values.value, i, "", r.durationUnits, r.maxInterval, n), e = e.replace(RegExp("\\[\\[value\\]\\]", "g"), r);
        r = "value open low high close total".split(" ");
        i = this.percentFormatter;
        e = AmCharts.formatValue(e, t.percents, r, i, "percents\\.");
        e = AmCharts.formatValue(e, t.values, r, n, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
        e = AmCharts.formatValue(e, t.values, ["percents"], i); - 1 != e.indexOf("[[") && (e = AmCharts.formatDataContextValue(e, t.dataContext));
        return e = AmCharts.AmSerialChart.base.formatString.call(this, e, t)
    },
    addChartScrollbar: function(e) {
        AmCharts.callMethod("destroy", [this.chartScrollbar]);
        e && (e.chart = this, this.listenTo(e, "zoomed", this.handleScrollbarZoom));
        this.rotate ? void 0 === e.width && (e.width = e.scrollbarHeight) : void 0 === e.height && (e.height = e.scrollbarHeight);
        this.chartScrollbar = e
    },
    removeChartScrollbar: function() {
        AmCharts.callMethod("destroy", [this.chartScrollbar]);
        this.chartScrollbar = null
    },
    handleReleaseOutside: function(e) {
        AmCharts.AmSerialChart.base.handleReleaseOutside.call(this, e);
        AmCharts.callMethod("handleReleaseOutside", [this.chartScrollbar])
    }
});
AmCharts.AmRadarChart = AmCharts.Class({
    inherits: AmCharts.AmCoordinateChart,
    construct: function() {
        AmCharts.AmRadarChart.base.construct.call(this);
        this.marginRight = this.marginBottom = this.marginTop = this.marginLeft = 0;
        this.chartType = "radar";
        this.radius = "35%"
    },
    initChart: function() {
        AmCharts.AmRadarChart.base.initChart.call(this);
        this.dataChanged && (this.updateData(), this.dataChanged = !1, this.dispatchDataUpdated = !0);
        this.drawChart()
    },
    updateData: function() {
        this.parseData();
        var e = this.graphs,
            t;
        for (t = 0; t < e.length; t++) e[t].data = this.chartData
    },
    updateGraphs: function() {
        var e = this.graphs,
            t;
        for (t = 0; t < e.length; t++) {
            var n = e[t];
            n.index = t;
            n.width = this.realRadius;
            n.height = this.realRadius;
            n.x = this.marginLeftReal;
            n.y = this.marginTopReal;
            n.chartType = this.chartType
        }
    },
    parseData: function() {
        AmCharts.AmRadarChart.base.parseData.call(this);
        this.parseSerialData()
    },
    updateValueAxes: function() {
        var e = this.valueAxes,
            t;
        for (t = 0; t < e.length; t++) {
            var n = e[t];
            n.axisRenderer = AmCharts.RadAxis;
            n.guideFillRenderer = AmCharts.RadarFill;
            n.axisItemRenderer = AmCharts.RadItem;
            n.autoGridCount = !1;
            n.x = this.marginLeftReal;
            n.y = this.marginTopReal;
            n.width = this.realRadius;
            n.height = this.realRadius
        }
    },
    drawChart: function() {
        AmCharts.AmRadarChart.base.drawChart.call(this);
        var e = this.updateWidth(),
            t = this.updateHeight(),
            n = this.marginTop + this.getTitleHeight(),
            r = this.marginLeft,
            t = t - n - this.marginBottom;
        this.marginLeftReal = r + (e - r - this.marginRight) / 2;
        this.marginTopReal = n + t / 2;
        this.realRadius = AmCharts.toCoordinate(this.radius, e, t);
        this.updateValueAxes();
        this.updateGraphs();
        e = this.chartData;
        if (AmCharts.ifArray(e)) {
            if (0 < this.realWidth && 0 < this.realHeight) {
                e = e.length - 1;
                r = this.valueAxes;
                for (n = 0; n < r.length; n++) r[n].zoom(0, e);
                r = this.graphs;
                for (n = 0; n < r.length; n++) r[n].zoom(0, e);
                (e = this.legend) && e.invalidateSize()
            }
        } else this.cleanChart();
        this.dispDUpd();
        this.chartCreated = !0
    },
    formatString: function(e, t) {
        var n = t.graph; - 1 != e.indexOf("[[category]]") && (e = e.replace(/\[\[category\]\]/g, String(t.serialDataItem.category)));
        n = n.numberFormatter;
        n || (n = this.numberFormatter);
        e = AmCharts.formatValue(e, t.values, ["value"], n, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
        return e = AmCharts.AmRadarChart.base.formatString.call(this, e, t)
    },
    cleanChart: function() {
        AmCharts.callMethod("destroy", [this.valueAxes, this.graphs])
    }
});
AmCharts.AxisBase = AmCharts.Class({
    construct: function() {
        this.viY = this.viX = this.y = this.x = this.dy = this.dx = 0;
        this.axisThickness = 1;
        this.axisColor = "#000000";
        this.axisAlpha = 1;
        this.gridCount = this.tickLength = 5;
        this.gridAlpha = .15;
        this.gridThickness = 1;
        this.gridColor = "#000000";
        this.dashLength = 0;
        this.labelFrequency = 1;
        this.showLastLabel = this.showFirstLabel = !0;
        this.fillColor = "#FFFFFF";
        this.fillAlpha = 0;
        this.labelsEnabled = !0;
        this.labelRotation = 0;
        this.autoGridCount = !0;
        this.valueRollOverColor = "#CC0000";
        this.offset = 0;
        this.guides = [];
        this.visible = !0;
        this.counter = 0;
        this.guides = [];
        this.ignoreAxisWidth = this.inside = !1;
        this.minGap = 75;
        this.titleBold = !0
    },
    zoom: function(e, t) {
        this.start = e;
        this.end = t;
        this.dataChanged = !0;
        this.draw()
    },
    fixAxisPosition: function() {
        var e = this.position;
        "H" == this.orientation ? ("left" == e && (e = "bottom"), "right" == e && (e = "top")) : ("bottom" == e && (e = "left"), "top" == e && (e = "right"));
        this.position = e
    },
    draw: function() {
        var e = this.chart;
        void 0 === this.titleColor && (this.titleColor = e.color);
        isNaN(this.titleFontSize) && (this.titleFontSize = e.fontSize + 1);
        this.allLabels = [];
        this.counter = 0;
        this.destroy();
        this.fixAxisPosition();
        this.labels = [];
        var t = e.container,
            n = t.set();
        e.gridSet.push(n);
        this.set = n;
        t = t.set();
        e.axesLabelsSet.push(t);
        this.labelsSet = t;
        this.axisLine = new this.axisRenderer(this);
        this.autoGridCount && ("V" == this.orientation ? (e = this.height / 35, 3 > e && (e = 3)) : e = this.width / this.minGap, this.gridCount = Math.max(e, 1));
        this.axisWidth = this.axisLine.axisWidth;
        this.addTitle()
    },
    setOrientation: function(e) {
        this.orientation = e ? "H" : "V"
    },
    addTitle: function() {
        var e = this.title;
        if (e) {
            var t = this.chart;
            this.titleLabel = AmCharts.text(t.container, e, this.titleColor, t.fontFamily, this.titleFontSize, "middle", this.titleBold)
        }
    },
    positionTitle: function() {
        var e = this.titleLabel;
        if (e) {
            var t, n, r = this.labelsSet,
                i = {};
            0 < r.length() ? i = r.getBBox() : (i.x = 0, i.y = 0, i.width = this.viW, i.height = this.viH);
            r.push(e);
            var r = i.x,
                s = i.y;
            AmCharts.VML && (this.rotate ? r -= this.x : s -= this.y);
            var o = i.width,
                i = i.height,
                u = this.viW,
                a = this.viH;
            e.getBBox();
            var f = 0,
                l = this.titleFontSize / 2,
                c = this.inside;
            switch (this.position) {
                case "top":
                    t = u / 2;
                    n = s - 10 - l;
                    break;
                case "bottom":
                    t = u / 2;
                    n = s + i + 10 + l;
                    break;
                case "left":
                    t = r - 10 - l;
                    c && (t -= 5);
                    n = a / 2;
                    f = -90;
                    break;
                case "right":
                    t = r + o + 10 + l - 3, c && (t += 7), n = a / 2, f = -90
            }
            this.marginsChanged ? (e.translate(t, n), this.tx = t, this.ty = n) : e.translate(this.tx, this.ty);
            this.marginsChanged = !1;
            0 !== f && e.rotate(f)
        }
    },
    pushAxisItem: function(e, t) {
        var n = e.graphics();
        0 < n.length() && (t ? this.labelsSet.push(n) : this.set.push(n));
        (n = e.getLabel()) && this.labelsSet.push(n)
    },
    addGuide: function(e) {
        this.guides.push(e)
    },
    removeGuide: function(e) {
        var t = this.guides,
            n;
        for (n = 0; n < t.length; n++) t[n] == e && t.splice(n, 1)
    },
    handleGuideOver: function(e) {
        clearTimeout(this.chart.hoverInt);
        var t = e.graphics.getBBox(),
            n = t.x + t.width / 2,
            t = t.y + t.height / 2,
            r = e.fillColor;
        void 0 === r && (r = e.lineColor);
        this.chart.showBalloon(e.balloonText, r, !0, n, t)
    },
    handleGuideOut: function() {
        this.chart.hideBalloon()
    },
    addEventListeners: function(e, t) {
        var n = this;
        e.mouseover(function() {
            n.handleGuideOver(t)
        });
        e.mouseout(function() {
            n.handleGuideOut(t)
        })
    },
    getBBox: function() {
        var e = this.labelsSet.getBBox();
        AmCharts.VML || (e = {
            x: e.x + this.x,
            y: e.y + this.y,
            width: e.width,
            height: e.height
        });
        return e
    },
    destroy: function() {
        AmCharts.remove(this.set);
        AmCharts.remove(this.labelsSet);
        var e = this.axisLine;
        e && AmCharts.remove(e.set);
        AmCharts.remove(this.grid0)
    }
});
AmCharts.ValueAxis = AmCharts.Class({
    inherits: AmCharts.AxisBase,
    construct: function() {
        this.createEvents("axisChanged", "logarithmicAxisFailed", "axisSelfZoomed", "axisZoomed");
        AmCharts.ValueAxis.base.construct.call(this);
        this.dataChanged = !0;
        this.gridCount = 8;
        this.stackType = "none";
        this.position = "left";
        this.unitPosition = "right";
        this.recalculateToPercents = this.includeHidden = this.includeGuidesInMinMax = this.integersOnly = !1;
        this.durationUnits = {
            DD: "d. ",
            hh: ":",
            mm: ":",
            ss: ""
        };
        this.scrollbar = !1;
        this.baseValue = 0;
        this.radarCategoriesEnabled = !0;
        this.gridType = "polygons";
        this.useScientificNotation = !1;
        this.axisTitleOffset = 10;
        this.minMaxMultiplier = 1
    },
    updateData: function() {
        0 >= this.gridCount && (this.gridCount = 1);
        this.totals = [];
        this.data = this.chart.chartData;
        "xy" != this.chart.chartType && (this.stackGraphs("smoothedLine"), this.stackGraphs("line"), this.stackGraphs("column"), this.stackGraphs("step"));
        this.recalculateToPercents && this.recalculate();
        this.synchronizationMultiplier && this.synchronizeWithAxis ? this.foundGraphs = !0 : (this.foundGraphs = !1, this.getMinMax())
    },
    draw: function() {
        AmCharts.ValueAxis.base.draw.call(this);
        var e = this.chart,
            t = this.set;
        "duration" == this.type && (this.duration = "ss");
        !0 === this.dataChanged && (this.updateData(), this.dataChanged = !1);
        if (this.logarithmic && (0 >= this.getMin(0, this.data.length - 1) || 0 >= this.minimum)) this.fire("logarithmicAxisFailed", {
            type: "logarithmicAxisFailed",
            chart: e
        });
        else {
            this.grid0 = null;
            var n, r, i = e.dx,
                s = e.dy,
                o = !1,
                u = this.logarithmic,
                a = e.chartType;
            if (!isNaN(this.min) && !isNaN(this.max) && this.foundGraphs && Infinity != this.min && -Infinity != this.max) {
                var f = this.labelFrequency,
                    l = this.showFirstLabel,
                    c = this.showLastLabel,
                    h = 1,
                    p = 0,
                    d = Math.round((this.max - this.min) / this.step) + 1,
                    v;
                !0 === u ? (v = Math.log(this.max) * Math.LOG10E - Math.log(this.minReal) * Math.LOG10E, this.stepWidth = this.axisWidth / v, 2 < v && (d = Math.ceil(Math.log(this.max) * Math.LOG10E) + 1, p = Math.round(Math.log(this.minReal) * Math.LOG10E), d > this.gridCount && (h = Math.ceil(d / this.gridCount)))) : this.stepWidth = this.axisWidth / (this.max - this.min);
                n = 0;
                1 > this.step && -1 < this.step && (n = this.getDecimals(this.step));
                this.integersOnly && (n = 0);
                n > this.maxDecCount && (n = this.maxDecCount);
                var m = this.precision;
                isNaN(m) || (n = m);
                this.max = AmCharts.roundTo(this.max, this.maxDecCount);
                this.min = AmCharts.roundTo(this.min, this.maxDecCount);
                var g = {};
                g.precision = n;
                g.decimalSeparator = e.numberFormatter.decimalSeparator;
                g.thousandsSeparator = e.numberFormatter.thousandsSeparator;
                this.numberFormatter = g;
                var y, b = this.guides,
                    w = b.length;
                if (0 < w) {
                    var E = this.fillAlpha;
                    for (r = this.fillAlpha = 0; r < w; r++) {
                        var S = b[r],
                            x = NaN,
                            T = S.above;
                        isNaN(S.toValue) || (x = this.getCoordinate(S.toValue), y = new this.axisItemRenderer(this, x, "", !0, NaN, NaN, S), this.pushAxisItem(y, T));
                        var N = NaN;
                        isNaN(S.value) || (N = this.getCoordinate(S.value), y = new this.axisItemRenderer(this, N, S.label, !0, NaN, (x - N) / 2, S), this.pushAxisItem(y, T));
                        isNaN(x - N) || (y = new this.guideFillRenderer(this, N, x, S), this.pushAxisItem(y, T), y = y.graphics(), S.graphics = y, S.balloonText && this.addEventListeners(y, S))
                    }
                    this.fillAlpha = E
                }
                b = !1;
                for (r = p; r < d; r += h) y = AmCharts.roundTo(this.step * r + this.min, n), -1 != String(y).indexOf("e") && (b = !0, String(y).split("e"));
                this.duration && (this.maxInterval = AmCharts.getMaxInterval(this.max, this.duration));
                for (r = p; r < d; r += h)
                    if (p = this.step * r + this.min, p = AmCharts.roundTo(p, this.maxDecCount + 1), !(this.integersOnly && Math.round(p) != p) && (isNaN(m) || Number(AmCharts.toFixed(p, m)) == p)) {
                        !0 === u && (0 === p && (p = this.minReal), 2 < v && (p = Math.pow(10, r)), b = -1 != String(p).indexOf("e") ? !0 : !1);
                        this.useScientificNotation && (b = !0);
                        this.usePrefixes && (b = !1);
                        b ? (y = -1 == String(p).indexOf("e") ? p.toExponential(15) : String(p), y = y.split("e"), n = Number(y[0]), y = Number(y[1]), n = AmCharts.roundTo(n, 14), 10 == n && (n = 1, y += 1), y = n + "e" + y, 0 === p && (y = "0"), 1 == p && (y = "1")) : (u && (n = String(p).split("."), g.precision = n[1] ? n[1].length : -1), y = this.usePrefixes ? AmCharts.addPrefix(p, e.prefixesOfBigNumbers, e.prefixesOfSmallNumbers, g, !0) : AmCharts.formatNumber(p, g, g.precision));
                        this.duration && (y = AmCharts.formatDuration(p, this.duration, "", this.durationUnits, this.maxInterval, g));
                        this.recalculateToPercents ? y += "%" : (n = this.unit) && (y = "left" == this.unitPosition ? n + y : y + n);
                        Math.round(r / f) != r / f && (y = void 0);
                        if (0 === r && !l || r == d - 1 && !c) y = " ";
                        n = this.getCoordinate(p);
                        this.labelFunction && (y = this.labelFunction(p, y, this));
                        y = new this.axisItemRenderer(this, n, y);
                        this.pushAxisItem(y);
                        if (p == this.baseValue && "radar" != a) {
                            var C, k, w = this.viW,
                                E = this.viH,
                                p = this.viX;
                            y = this.viY;
                            "H" == this.orientation ? 0 <= n && n <= w + 1 && (C = [n, n, n + i], k = [E, 0, s]) : 0 <= n && n <= E + 1 && (C = [0, w, w + i], k = [n, n, n + s]);
                            C && (n = AmCharts.fitToBounds(2 * this.gridAlpha, 0, 1), n = AmCharts.line(e.container, C, k, this.gridColor, n, 1, this.dashLength), n.translate(p, y), this.grid0 = n, e.axesSet.push(n), n.toBack())
                        }
                    }
                r = this.baseValue;
                this.min > this.baseValue && this.max > this.baseValue && (r = this.min);
                this.min < this.baseValue && this.max < this.baseValue && (r = this.max);
                u && r < this.minReal && (r = this.minReal);
                this.baseCoord = this.getCoordinate(r);
                e = {
                    type: "axisChanged",
                    target: this,
                    chart: e
                };
                e.min = u ? this.minReal : this.min;
                e.max = this.max;
                this.fire("axisChanged", e);
                this.axisCreated = !0
            } else o = !0;
            u = this.axisLine.set;
            e = this.labelsSet;
            this.positionTitle();
            "radar" != a ? (a = this.viX, r = this.viY, t.translate(a, r), e.translate(a, r)) : u.toFront();
            !this.visible || o ? (t.hide(), u.hide(), e.hide()) : (t.show(), u.show(), e.show())
        }
    },
    getDecimals: function(e) {
        var t = 0;
        isNaN(e) || (e = String(e), -1 != e.indexOf("e-") ? t = Number(e.split("-")[1]) : -1 != e.indexOf(".") && (t = e.split(".")[1].length));
        return t
    },
    stackGraphs: function(e) {
        var t = this.stackType;
        "stacked" == t && (t = "regular");
        "line" == t && (t = "none");
        "100% stacked" == t && (t = "100%");
        this.stackType = t;
        var n = [],
            r = [],
            i = [],
            s = [],
            o, u = this.chart.graphs,
            a, f, l, c, h = this.baseValue,
            p = !1;
        if ("line" == e || "step" == e || "smoothedLine" == e) p = !0;
        if (p && ("regular" == t || "100%" == t))
            for (c = 0; c < u.length; c++) l = u[c], l.hidden || (f = l.type, l.chart == this.chart && l.valueAxis == this && e == f && l.stackable && (a && (l.stackGraph = a), a = l));
        for (a = this.start; a <= this.end; a++) {
            var d = 0;
            for (c = 0; c < u.length; c++)
                if (l = u[c], !l.hidden && (f = l.type, l.chart == this.chart && l.valueAxis == this && e == f && l.stackable && (f = this.data[a].axes[this.id].graphs[l.id], o = f.values.value, !isNaN(o)))) {
                    var v = this.getDecimals(o);
                    d < v && (d = v);
                    s[a] = isNaN(s[a]) ? Math.abs(o) : s[a] + Math.abs(o);
                    s[a] = AmCharts.roundTo(s[a], d);
                    l = l.fillToGraph;
                    if (p && l && (l = this.data[a].axes[this.id].graphs[l.id])) f.values.open = l.values.value;
                    "regular" == t && (p && (isNaN(n[a]) ? (n[a] = o, f.values.close = o, f.values.open = this.baseValue) : (f.values.close = isNaN(o) ? n[a] : o + n[a], f.values.open = n[a], n[a] = f.values.close)), "column" == e && !isNaN(o) && (f.values.close = o, 0 > o ? (f.values.close = o, isNaN(r[a]) ? f.values.open = h : (f.values.close += r[a], f.values.open = r[a]), r[a] = f.values.close) : (f.values.close = o, isNaN(i[a]) ? f.values.open = h : (f.values.close += i[a], f.values.open = i[a]), i[a] = f.values.close)))
                }
        }
        for (a = this.start; a <= this.end; a++)
            for (c = 0; c < u.length; c++) l = u[c], l.hidden || (f = l.type, l.chart == this.chart && l.valueAxis == this && e == f && l.stackable && (f = this.data[a].axes[this.id].graphs[l.id], o = f.values.value, isNaN(o) || (n = 100 * (o / s[a]), f.values.percents = n, f.values.total = s[a], "100%" == t && (isNaN(r[a]) && (r[a] = 0), isNaN(i[a]) && (i[a] = 0), 0 > n ? (f.values.close = AmCharts.fitToBounds(n + r[a], -100, 100), f.values.open = r[a], r[a] = f.values.close) : (f.values.close = AmCharts.fitToBounds(n + i[a], -100, 100), f.values.open = i[a], i[a] = f.values.close)))))
    },
    recalculate: function() {
        var e = this.chart.graphs,
            t;
        for (t = 0; t < e.length; t++) {
            var n = e[t];
            if (n.valueAxis == this) {
                var r = "value";
                if ("candlestick" == n.type || "ohlc" == n.type) r = "open";
                var i, s, o = this.end + 2,
                    o = AmCharts.fitToBounds(this.end + 1, 0, this.data.length - 1),
                    u = this.start;
                0 < u && u--;
                var a;
                for (a = this.start; a <= o && !(s = this.data[a].axes[this.id].graphs[n.id], i = s.values[r], !isNaN(i)); a++);
                for (r = u; r <= o; r++) {
                    s = this.data[r].axes[this.id].graphs[n.id];
                    s.percents = {};
                    var u = s.values,
                        f;
                    for (f in u) s.percents[f] = "percents" != f ? 100 * (u[f] / i) - 100 : u[f]
                }
            }
        }
    },
    getMinMax: function() {
        var e = !1,
            t = this.chart,
            n = t.graphs,
            r;
        for (r = 0; r < n.length; r++) {
            var i = n[r].type;
            if ("line" == i || "step" == i || "smoothedLine" == i) this.expandMinMax && (e = !0)
        }
        e && (0 < this.start && this.start--, this.end < this.data.length - 1 && this.end++);
        "serial" == t.chartType && !0 === t.categoryAxis.parseDates && !e && this.end < this.data.length - 1 && this.end++;
        e = this.minMaxMultiplier;
        this.min = this.getMin(this.start, this.end);
        this.max = this.getMax();
        e = (this.max - this.min) * (e - 1);
        this.min -= e;
        this.max += e;
        e = this.guides.length;
        if (this.includeGuidesInMinMax && 0 < e)
            for (t = 0; t < e; t++) n = this.guides[t], n.toValue < this.min && (this.min = n.toValue), n.value < this.min && (this.min = n.value), n.toValue > this.max && (this.max = n.toValue), n.value > this.max && (this.max = n.value);
        isNaN(this.minimum) || (this.min = this.minimum);
        isNaN(this.maximum) || (this.max = this.maximum);
        this.min > this.max && (e = this.max, this.max = this.min, this.min = e);
        isNaN(this.minTemp) || (this.min = this.minTemp);
        isNaN(this.maxTemp) || (this.max = this.maxTemp);
        this.minReal = this.min;
        this.maxReal = this.max;
        0 === this.min && 0 === this.max && (this.max = 9);
        this.min > this.max && (this.min = this.max - 1);
        e = this.min;
        t = this.max;
        n = this.max - this.min;
        r = 0 === n ? Math.pow(10, Math.floor(Math.log(Math.abs(this.max)) * Math.LOG10E)) / 10 : Math.pow(10, Math.floor(Math.log(Math.abs(n)) * Math.LOG10E)) / 10;
        isNaN(this.maximum) && isNaN(this.maxTemp) && (this.max = Math.ceil(this.max / r) * r + r);
        isNaN(this.minimum) && isNaN(this.minTemp) && (this.min = Math.floor(this.min / r) * r - r);
        0 > this.min && 0 <= e && (this.min = 0);
        0 < this.max && 0 >= t && (this.max = 0);
        "100%" == this.stackType && (this.min = 0 > this.min ? -100 : 0, this.max = 0 > this.max ? 0 : 100);
        n = this.max - this.min;
        r = Math.pow(10, Math.floor(Math.log(Math.abs(n)) * Math.LOG10E)) / 10;
        this.step = Math.ceil(n / this.gridCount / r) * r;
        n = Math.pow(10, Math.floor(Math.log(Math.abs(this.step)) * Math.LOG10E));
        n = n.toExponential(0).split("e");
        r = Number(n[1]);
        9 == Number(n[0]) && r++;
        n = this.generateNumber(1, r);
        r = Math.ceil(this.step / n);
        5 < r && (r = 10);
        5 >= r && 2 < r && (r = 5);
        this.step = Math.ceil(this.step / (n * r)) * n * r;
        1 > n ? (this.maxDecCount = Math.abs(Math.log(Math.abs(n)) * Math.LOG10E), this.maxDecCount = Math.round(this.maxDecCount), this.step = AmCharts.roundTo(this.step, this.maxDecCount + 1)) : this.maxDecCount = 0;
        this.min = this.step * Math.floor(this.min / this.step);
        this.max = this.step * Math.ceil(this.max / this.step);
        0 > this.min && 0 <= e && (this.min = 0);
        0 < this.max && 0 >= t && (this.max = 0);
        1 < this.minReal && 1 < this.max - this.minReal && (this.minReal = Math.floor(this.minReal));
        n = Math.pow(10, Math.floor(Math.log(Math.abs(this.minReal)) * Math.LOG10E));
        0 === this.min && (this.minReal = n);
        0 === this.min && 1 < this.minReal && (this.minReal = 1);
        0 < this.min && 0 < this.minReal - this.step && (this.minReal = this.min + this.step < this.minReal ? this.min + this.step : this.min);
        n = Math.log(t) * Math.LOG10E - Math.log(e) * Math.LOG10E;
        this.logarithmic && (2 < n ? (this.minReal = this.min = Math.pow(10, Math.floor(Math.log(Math.abs(e)) * Math.LOG10E)), this.max = Math.pow(10, Math.ceil(Math.log(Math.abs(t)) * Math.LOG10E))) : (t = Math.pow(10, Math.floor(Math.log(Math.abs(this.min)) * Math.LOG10E)) / 10, e = Math.pow(10, Math.floor(Math.log(Math.abs(e)) * Math.LOG10E)) / 10, t < e && (this.minReal = this.min = 10 * e)))
    },
    generateNumber: function(e, t) {
        var n = "",
            r;
        r = 0 > t ? Math.abs(t) - 1 : Math.abs(t);
        var i;
        for (i = 0; i < r; i++) n += "0";
        return 0 > t ? Number("0." + n + String(e)) : Number(String(e) + n)
    },
    getMin: function(e, t) {
        var n, r;
        for (r = e; r <= t; r++) {
            var i = this.data[r].axes[this.id].graphs,
                s;
            for (s in i)
                if (i.hasOwnProperty(s)) {
                    var o = this.chart.getGraphById(s);
                    if (o.includeInMinMax && (!o.hidden || this.includeHidden)) {
                        isNaN(n) && (n = Infinity);
                        this.foundGraphs = !0;
                        o = i[s].values;
                        this.recalculateToPercents && (o = i[s].percents);
                        var u;
                        if (this.minMaxField) u = o[this.minMaxField], u < n && (n = u);
                        else
                            for (var a in o) o.hasOwnProperty(a) && "percents" != a && "total" != a && (u = o[a], u < n && (n = u))
                    }
                }
        }
        return n
    },
    getMax: function() {
        var e, t;
        for (t = this.start; t <= this.end; t++) {
            var n = this.data[t].axes[this.id].graphs,
                r;
            for (r in n)
                if (n.hasOwnProperty(r)) {
                    var i = this.chart.getGraphById(r);
                    if (i.includeInMinMax && (!i.hidden || this.includeHidden)) {
                        isNaN(e) && (e = -Infinity);
                        this.foundGraphs = !0;
                        i = n[r].values;
                        this.recalculateToPercents && (i = n[r].percents);
                        var s;
                        if (this.minMaxField) s = i[this.minMaxField], s > e && (e = s);
                        else
                            for (var o in i) i.hasOwnProperty(o) && "percents" != o && "total" != o && (s = i[o], s > e && (e = s))
                    }
                }
        }
        return e
    },
    dispatchZoomEvent: function(e, t) {
        var n = {
            type: "axisZoomed",
            startValue: e,
            endValue: t,
            target: this,
            chart: this.chart
        };
        this.fire(n.type, n)
    },
    zoomToValues: function(e, t) {
        if (t < e) {
            var n = t;
            t = e;
            e = n
        }
        e < this.min && (e = this.min);
        t > this.max && (t = this.max);
        n = {
            type: "axisSelfZoomed"
        };
        n.chart = this.chart;
        n.valueAxis = this;
        n.multiplier = this.axisWidth / Math.abs(this.getCoordinate(t) - this.getCoordinate(e));
        n.position = "V" == this.orientation ? this.reversed ? this.getCoordinate(e) : this.getCoordinate(t) : this.reversed ? this.getCoordinate(t) : this.getCoordinate(e);
        this.fire(n.type, n)
    },
    coordinateToValue: function(e) {
        if (isNaN(e)) return NaN;
        var t = this.axisWidth,
            n = this.stepWidth,
            r = this.reversed,
            i = this.rotate,
            s = this.min,
            o = this.minReal;
        return !0 === this.logarithmic ? Math.pow(10, (i ? !0 === r ? (t - e) / n : e / n : !0 === r ? e / n : (t - e) / n) + Math.log(o) * Math.LOG10E) : !0 === r ? i ? s - (e - t) / n : e / n + s : i ? e / n + s : s - (e - t) / n
    },
    getCoordinate: function(e) {
        if (isNaN(e)) return NaN;
        var t = this.rotate,
            n = this.reversed,
            r = this.axisWidth,
            i = this.stepWidth,
            s = this.min,
            o = this.minReal;
        !0 === this.logarithmic ? (e = Math.log(e) * Math.LOG10E - Math.log(o) * Math.LOG10E, t = t ? !0 === n ? r - i * e : i * e : !0 === n ? i * e : r - i * e) : t = !0 === n ? t ? r - i * (e - s) : i * (e - s) : t ? i * (e - s) : r - i * (e - s);
        t = this.rotate ? t + (this.x - this.viX) : t + (this.y - this.viY);
        return Math.round(t)
    },
    synchronizeWithAxis: function(e) {
        this.synchronizeWithAxis = e;
        this.removeListener(this.synchronizeWithAxis, "axisChanged", this.handleSynchronization);
        this.listenTo(this.synchronizeWithAxis, "axisChanged", this.handleSynchronization)
    },
    handleSynchronization: function() {
        var e = this.synchronizeWithAxis,
            t = e.min,
            n = e.max,
            e = e.step,
            r = this.synchronizationMultiplier;
        r && (this.min = t * r, this.max = n * r, this.step = e * r, t = Math.pow(10, Math.floor(Math.log(Math.abs(this.step)) * Math.LOG10E)), t = Math.abs(Math.log(Math.abs(t)) * Math.LOG10E), this.maxDecCount = t = Math.round(t), this.draw())
    }
});
AmCharts.CategoryAxis = AmCharts.Class({
    inherits: AmCharts.AxisBase,
    construct: function() {
        AmCharts.CategoryAxis.base.construct.call(this);
        this.minPeriod = "DD";
        this.equalSpacing = this.parseDates = !1;
        this.position = "bottom";
        this.startOnAxis = !1;
        this.firstDayOfWeek = 1;
        this.gridPosition = "middle";
        this.boldPeriodBeginning = !0;
        this.periods = [{
            period: "ss",
            count: 1
        }, {
            period: "ss",
            count: 5
        }, {
            period: "ss",
            count: 10
        }, {
            period: "ss",
            count: 30
        }, {
            period: "mm",
            count: 1
        }, {
            period: "mm",
            count: 5
        }, {
            period: "mm",
            count: 10
        }, {
            period: "mm",
            count: 30
        }, {
            period: "hh",
            count: 1
        }, {
            period: "hh",
            count: 3
        }, {
            period: "hh",
            count: 6
        }, {
            period: "hh",
            count: 12
        }, {
            period: "DD",
            count: 1
        }, {
            period: "DD",
            count: 2
        }, {
            period: "DD",
            count: 3
        }, {
            period: "DD",
            count: 4
        }, {
            period: "DD",
            count: 5
        }, {
            period: "WW",
            count: 1
        }, {
            period: "MM",
            count: 1
        }, {
            period: "MM",
            count: 2
        }, {
            period: "MM",
            count: 3
        }, {
            period: "MM",
            count: 6
        }, {
            period: "YYYY",
            count: 1
        }, {
            period: "YYYY",
            count: 2
        }, {
            period: "YYYY",
            count: 5
        }, {
            period: "YYYY",
            count: 10
        }, {
            period: "YYYY",
            count: 50
        }, {
            period: "YYYY",
            count: 100
        }];
        this.dateFormats = [{
            period: "fff",
            format: "JJ:NN:SS"
        }, {
            period: "ss",
            format: "JJ:NN:SS"
        }, {
            period: "mm",
            format: "JJ:NN"
        }, {
            period: "hh",
            format: "JJ:NN"
        }, {
            period: "DD",
            format: "MMM DD"
        }, {
            period: "WW",
            format: "MMM DD"
        }, {
            period: "MM",
            format: "MMM"
        }, {
            period: "YYYY",
            format: "YYYY"
        }];
        this.nextPeriod = {};
        this.nextPeriod.fff = "ss";
        this.nextPeriod.ss = "mm";
        this.nextPeriod.mm = "hh";
        this.nextPeriod.hh = "DD";
        this.nextPeriod.DD = "MM";
        this.nextPeriod.MM = "YYYY"
    },
    draw: function() {
        AmCharts.CategoryAxis.base.draw.call(this);
        this.generateDFObject();
        var e = this.chart.chartData;
        this.data = e;
        if (AmCharts.ifArray(e)) {
            var t, n = this.chart,
                r = this.start,
                i = this.labelFrequency,
                s = 0;
            t = this.end - r + 1;
            var o = this.gridCount,
                u = this.showFirstLabel,
                a = this.showLastLabel,
                f, l = "",
                l = AmCharts.extractPeriod(this.minPeriod);
            f = AmCharts.getPeriodDuration(l.period, l.count);
            var c, h, p, d, v;
            c = this.rotate;
            var m = this.firstDayOfWeek,
                g = this.boldPeriodBeginning,
                e = AmCharts.resetDateToMin(new Date(e[e.length - 1].time + 1.05 * f), this.minPeriod, 1, m).getTime(),
                y;
            this.endTime > e && (this.endTime = e);
            if (this.parseDates && !this.equalSpacing) {
                if (this.timeDifference = this.endTime - this.startTime, r = this.choosePeriod(0), i = r.period, c = r.count, e = AmCharts.getPeriodDuration(i, c), e < f && (i = l.period, c = l.count, e = f), h = i, "WW" == h && (h = "DD"), this.stepWidth = this.getStepWidth(this.timeDifference), o = Math.ceil(this.timeDifference / e) + 1, l = AmCharts.resetDateToMin(new Date(this.startTime - e), i, c, m).getTime(), h == i && 1 == c && (p = e * this.stepWidth), this.cellWidth = f * this.stepWidth, t = Math.round(l / e), r = -1, t / 2 == Math.round(t / 2) && (r = -2, l -= e), 0 < this.gridCount)
                    for (t = r; t <= o; t++) {
                        d = l + 1.5 * e;
                        d = AmCharts.resetDateToMin(new Date(d), i, c, m).getTime();
                        f = (d - this.startTime) * this.stepWidth;
                        v = !1;
                        this.nextPeriod[h] && (v = this.checkPeriodChange(this.nextPeriod[h], 1, d, l));
                        y = !1;
                        v ? (l = this.dateFormatsObject[this.nextPeriod[h]], y = !0) : l = this.dateFormatsObject[h];
                        g || (y = !1);
                        l = AmCharts.formatDate(new Date(d), l);
                        if (t == r && !u || t == o && !a) l = " ";
                        this.labelFunction && (l = this.labelFunction(l, new Date(d), this));
                        l = new this.axisItemRenderer(this, f, l, !1, p, 0, !1, y);
                        this.pushAxisItem(l);
                        l = d
                    }
            } else if (this.parseDates) {
                if (this.parseDates && this.equalSpacing) {
                    s = this.start;
                    this.startTime = this.data[this.start].time;
                    this.endTime = this.data[this.end].time;
                    this.timeDifference = this.endTime - this.startTime;
                    r = this.choosePeriod(0);
                    i = r.period;
                    c = r.count;
                    e = AmCharts.getPeriodDuration(i, c);
                    e < f && (i = l.period, c = l.count, e = f);
                    h = i;
                    "WW" == h && (h = "DD");
                    this.stepWidth = this.getStepWidth(t);
                    o = Math.ceil(this.timeDifference / e) + 1;
                    l = AmCharts.resetDateToMin(new Date(this.startTime - e), i, c, m).getTime();
                    this.cellWidth = this.getStepWidth(t);
                    t = Math.round(l / e);
                    r = -1;
                    t / 2 == Math.round(t / 2) && (r = -2, l -= e);
                    t = this.start;
                    t / 2 == Math.round(t / 2) && t--;
                    0 > t && (t = 0);
                    p = this.end + 2;
                    p >= this.data.length && (p = this.data.length);
                    m = !1;
                    this.end - this.start > this.gridCount && (m = !0);
                    for (this.previousPos = 0; t < p; t++)
                        if (d = this.data[t].time, this.checkPeriodChange(i, c, d, l)) {
                            f = this.getCoordinate(t - this.start);
                            v = !1;
                            this.nextPeriod[h] && (v = this.checkPeriodChange(this.nextPeriod[h], 1, d, l));
                            y = !1;
                            v ? (l = this.dateFormatsObject[this.nextPeriod[h]], y = !0) : l = this.dateFormatsObject[h];
                            l = AmCharts.formatDate(new Date(d), l);
                            if (t == r && !u || t == o && !a) l = " ";
                            m ? m = !1 : (g || (y = !1), 40 < f - this.previousPos && (this.labelFunction && (l = this.labelFunction(l, new Date(d), this)), l = new this.axisItemRenderer(this, f, l, void 0, void 0, void 0, void 0, y), e = l.graphics(), this.pushAxisItem(l), this.previousPos = f + e.getBBox().width));
                            l = d
                        }
                }
            } else if (this.cellWidth = this.getStepWidth(t), t < o && (o = t), s += this.start, this.stepWidth = this.getStepWidth(t), 0 < o) {
                g = Math.floor(t / o);
                t = s;
                t / 2 == Math.round(t / 2) && t--;
                0 > t && (t = 0);
                for (o = 0; t <= this.end + 2; t++)
                    if (0 <= t && t < this.data.length ? (h = this.data[t], l = h.category) : l = "", t / g == Math.round(t / g) || h.forceShow) {
                        f = this.getCoordinate(t - s);
                        p = 0;
                        "start" == this.gridPosition && (f -= this.cellWidth / 2, p = this.cellWidth / 2);
                        if (t == r && !u || t == this.end && !a) l = void 0;
                        Math.round(o / i) != o / i && (l = void 0);
                        o++;
                        m = this.cellWidth;
                        c && (m = NaN);
                        this.labelFunction && (l = this.labelFunction(l, h, this));
                        l = AmCharts.fixNewLines(l);
                        l = new this.axisItemRenderer(this, f, l, !0, m, p, void 0, !1, p);
                        this.pushAxisItem(l)
                    }
            }
            for (t = 0; t < this.data.length; t++)
                if (u = this.data[t]) a = this.parseDates && !this.equalSpacing ? Math.round((u.time - this.startTime) * this.stepWidth + this.cellWidth / 2) : this.getCoordinate(t - s), u.x[this.id] = a;
            u = this.guides.length;
            for (t = 0; t < u; t++) a = this.guides[t], f = f = f = o = g = NaN, r = a.above, a.toCategory && (f = n.getCategoryIndexByValue(a.toCategory), isNaN(f) || (g = this.getCoordinate(f - s), l = new this.axisItemRenderer(this, g, "", !0, NaN, NaN, a), this.pushAxisItem(l, r))), a.category && (f = n.getCategoryIndexByValue(a.category), isNaN(f) || (o = this.getCoordinate(f - s), f = (g - o) / 2, l = new this.axisItemRenderer(this, o, a.label, !0, NaN, f, a), this.pushAxisItem(l, r))), a.toDate && (this.equalSpacing ? (f = n.getClosestIndex(this.data, "time", a.toDate.getTime(), !1, 0, this.data.length - 1), isNaN(f) || (g = this.getCoordinate(f - s))) : g = (a.toDate.getTime() - this.startTime) * this.stepWidth, l = new this.axisItemRenderer(this, g, "", !0, NaN, NaN, a), this.pushAxisItem(l, r)), a.date && (this.equalSpacing ? (f = n.getClosestIndex(this.data, "time", a.date.getTime(), !1, 0, this.data.length - 1), isNaN(f) || (o = this.getCoordinate(f - s))) : o = (a.date.getTime() - this.startTime) * this.stepWidth, f = (g - o) / 2, l = "H" == this.orientation ? new this.axisItemRenderer(this, o, a.label, !1, 2 * f, NaN, a) : new this.axisItemRenderer(this, o, a.label, !1, NaN, f, a), this.pushAxisItem(l, r)), g = new this.guideFillRenderer(this, o, g, a), o = g.graphics(), this.pushAxisItem(g, r), a.graphics = o, o.index = t, a.balloonText && this.addEventListeners(o, a)
        }
        this.axisCreated = !0;
        n = this.x;
        s = this.y;
        this.set.translate(n, s);
        this.labelsSet.translate(n, s);
        this.positionTitle();
        (n = this.axisLine.set) && n.toFront()
    },
    choosePeriod: function(e) {
        var t = AmCharts.getPeriodDuration(this.periods[e].period, this.periods[e].count),
            n = Math.ceil(this.timeDifference / t),
            r = this.periods;
        return this.timeDifference < t && 0 < e ? r[e - 1] : n <= this.gridCount ? r[e] : e + 1 < r.length ? this.choosePeriod(e + 1) : r[e]
    },
    getStepWidth: function(e) {
        var t;
        this.startOnAxis ? (t = this.axisWidth / (e - 1), 1 == e && (t = this.axisWidth)) : t = this.axisWidth / e;
        return t
    },
    getCoordinate: function(e) {
        e *= this.stepWidth;
        this.startOnAxis || (e += this.stepWidth / 2);
        return Math.round(e)
    },
    timeZoom: function(e, t) {
        this.startTime = e;
        this.endTime = t
    },
    minDuration: function() {
        var e = AmCharts.extractPeriod(this.minPeriod);
        return AmCharts.getPeriodDuration(e.period, e.count)
    },
    checkPeriodChange: function(e, t, n, r) {
        r = new Date(r);
        var i = this.firstDayOfWeek;
        n = AmCharts.resetDateToMin(new Date(n), e, t, i).getTime();
        e = AmCharts.resetDateToMin(r, e, t, i).getTime();
        return n != e ? !0 : !1
    },
    generateDFObject: function() {
        this.dateFormatsObject = {};
        var e;
        for (e = 0; e < this.dateFormats.length; e++) {
            var t = this.dateFormats[e];
            this.dateFormatsObject[t.period] = t.format
        }
    },
    xToIndex: function(e) {
        var t = this.data,
            n = this.chart,
            r = n.rotate,
            i = this.stepWidth;
        this.parseDates && !this.equalSpacing ? (e = this.startTime + Math.round(e / i) - this.minDuration() / 2, n = n.getClosestIndex(t, "time", e, !1, this.start, this.end + 1)) : (this.startOnAxis || (e -= i / 2), n = this.start + Math.round(e / i));
        var n = AmCharts.fitToBounds(n, 0, t.length - 1),
            s;
        t[n] && (s = t[n].x[this.id]);
        r ? s > this.height + 1 && n-- : s > this.width + 1 && n--;
        0 > s && n++;
        return n = AmCharts.fitToBounds(n, 0, t.length - 1)
    },
    dateToCoordinate: function(e) {
        return this.parseDates && !this.equalSpacing ? (e.getTime() - this.startTime) * this.stepWidth : this.parseDates && this.equalSpacing ? (e = this.chart.getClosestIndex(this.data, "time", e.getTime(), !1, 0, this.data.length - 1), this.getCoordinate(e - this.start)) : NaN
    },
    categoryToCoordinate: function(e) {
        return this.chart ? (e = this.chart.getCategoryIndexByValue(e), this.getCoordinate(e - this.start)) : NaN
    },
    coordinateToDate: function(e) {
        return this.equalSpacing ? (e = this.xToIndex(e), new Date(this.data[e].time)) : new Date(this.startTime + e / this.stepWidth)
    }
});
AmCharts.RecAxis = AmCharts.Class({
    construct: function(e) {
        var t = e.chart,
            n = e.axisThickness,
            r = e.axisColor,
            i = e.axisAlpha,
            s = e.offset,
            o = e.dx,
            u = e.dy,
            a = e.viX,
            f = e.viY,
            l = e.viH,
            c = e.viW,
            h = t.container;
        "H" == e.orientation ? (r = AmCharts.line(h, [0, c], [0, 0], r, i, n), this.axisWidth = e.width, "bottom" == e.position ? (e = n / 2 + s + l + f - 1, n = a) : (e = -n / 2 - s + f + u, n = o + a)) : (this.axisWidth = e.height, "right" == e.position ? (r = AmCharts.line(h, [0, 0, -o], [0, l, l - u], r, i, n), e = f + u, n = n / 2 + s + o + c + a - 1) : (r = AmCharts.line(h, [0, 0], [0, l], r, i, n), e = f, n = -n / 2 - s + a));
        r.translate(n, e);
        t.axesSet.push(r);
        this.set = r
    }
});
AmCharts.RecItem = AmCharts.Class({
    construct: function(e, t, n, r, i, s, o, u, a) {
        t = Math.round(t);
        void 0 == n && (n = "");
        a || (a = 0);
        void 0 == r && (r = !0);
        var f = e.chart.fontFamily,
            l = e.fontSize;
        void 0 == l && (l = e.chart.fontSize);
        var c = e.color;
        void 0 == c && (c = e.chart.color);
        var h = e.chart.container,
            p = h.set();
        this.set = p;
        var d = e.axisThickness,
            v = e.axisColor,
            m = e.axisAlpha,
            g = e.tickLength,
            y = e.gridAlpha,
            b = e.gridThickness,
            w = e.gridColor,
            E = e.dashLength,
            S = e.fillColor,
            x = e.fillAlpha,
            T = e.labelsEnabled,
            N = e.labelRotation,
            C = e.counter,
            k = e.inside,
            L = e.dx,
            A = e.dy,
            O = e.orientation,
            M = e.position,
            _ = e.previousCoord,
            D = e.viH,
            P = e.viW,
            H = e.offset,
            B, j;
        o ? (T = !0, isNaN(o.tickLength) || (g = o.tickLength), void 0 != o.lineColor && (w = o.lineColor), void 0 != o.color && (c = o.color), isNaN(o.lineAlpha) || (y = o.lineAlpha), isNaN(o.dashLength) || (E = o.dashLength), isNaN(o.lineThickness) || (b = o.lineThickness), !0 === o.inside && (k = !0), isNaN(o.labelRotation) || (N = o.labelRotation), isNaN(o.fontSize) || (l = o.fontSize), o.position && (M = o.position)) : "" === n && (g = 0);
        j = "start";
        i && (j = "middle");
        var F = N * Math.PI / 180,
            I, q = 0,
            R = 0,
            U = 0,
            z = I = 0;
        "V" == O && (N = 0);
        var W;
        T && (W = AmCharts.text(h, n, c, f, l, j, u), z = W.getBBox().width);
        if ("H" == O) {
            if (0 <= t && t <= P + 1 && (0 < g && 0 < m && t + a <= P + 1 && (B = AmCharts.line(h, [t + a, t + a], [0, g], v, m, b), p.push(B)), 0 < y && (j = AmCharts.line(h, [t, t + L, t + L], [D, D + A, A], w, y, b, E), p.push(j))), R = 0, q = t, o && 90 == N && (q -= l), !1 === r ? (j = "start", R = "bottom" == M ? k ? R + g : R - g : k ? R - g : R + g, q += 3, i && (q += i / 2, j = "middle"), 0 < N && (j = "middle")) : j = "middle", 1 == C && 0 < x && !o && _ < P && (r = AmCharts.fitToBounds(t, 0, P), _ = AmCharts.fitToBounds(_, 0, P), I = r - _, 0 < I && (fill = AmCharts.rect(h, I, e.height, S, x), fill.translate(r - I + L, A), p.push(fill))), "bottom" == M ? (R += D + l / 2 + H, k ? 0 < N ? (R = D - z / 2 * Math.sin(F) - g - 3, q += z / 2 * Math.cos(F)) : R -= g + l + 3 + 3 : 0 < N ? (R = D + z / 2 * Math.sin(F) + g + 3, q -= z / 2 * Math.cos(F)) : R += g + d + 3 + 3) : (R += A + l / 2 - H, q += L, k ? 0 < N ? (R = z / 2 * Math.sin(F) + g + 3, q -= z / 2 * Math.cos(F)) : R += g + 3 : 0 < N ? (R = -(z / 2) * Math.sin(F) - g - 6, q += z / 2 * Math.cos(F)) : R -= g + l + 3 + d + 3), "bottom" == M ? I = (k ? D - g - 1 : D + d - 1) + H : (U = L, I = (k ? A : A - g - d + 1) - H), s && (q += s), A = q, 0 < N && (A += z / 2 * Math.cos(F)), W && (M = 0, k && (M = z / 2 * Math.cos(F)), A + M > P + 1 || 0 > A)) W.remove(), W = null
        } else {
            0 <= t && t <= D + 1 && (0 < g && 0 < m && t + a <= D + 1 && (B = AmCharts.line(h, [0, g], [t + a, t + a], v, m, b), p.push(B)), 0 < y && (j = AmCharts.line(h, [0, L, P + L], [t, t + A, t + A], w, y, b, E), p.push(j)));
            j = "end";
            if (!0 === k && "left" == M || !1 === k && "right" == M) j = "start";
            R = t - l / 2;
            1 == C && 0 < x && !o && (r = AmCharts.fitToBounds(t, 0, D), _ = AmCharts.fitToBounds(_, 0, D), F = r - _, fill = AmCharts.polygon(h, [0, e.width, e.width, 0], [0, 0, F, F], S, x), fill.translate(L, r - F + A), p.push(fill));
            R += l / 2;
            "right" == M ? (q += L + P + H, R += A, k ? (q -= g + 4, s || (R -= l / 2 + 3)) : (q += g + 4 + d, R -= 2)) : k ? (q += g + 4 - H, s || (R -= l / 2 + 3), o && (q += L, R += A)) : (q += -g - d - 4 - 2 - H, R -= 2);
            B && ("right" == M ? (U += L + H + P, I += A, U = k ? U - d : U + d) : (U -= H, k || (U -= g + d)));
            s && (R += s);
            k = -3;
            "right" == M && (k += A);
            if (W && (R > D + 1 || R < k)) W.remove(), W = null
        }
        B && B.translate(U, I);
        !1 === e.visible && (B && B.remove(), W && (W.remove(), W = null));
        W && (W.attr({
            "text-anchor": j
        }), W.translate(q, R), 0 !== N && W.rotate(-N), e.allLabels.push(W), " " != n && (this.label = W));
        e.counter = 0 === C ? 1 : 0;
        e.previousCoord = t;
        0 === this.set.node.childNodes.length && this.set.remove()
    },
    graphics: function() {
        return this.set
    },
    getLabel: function() {
        return this.label
    }
});
AmCharts.RecFill = AmCharts.Class({
    construct: function(e, t, n, r) {
        var i = e.dx,
            s = e.dy,
            o = e.orientation,
            u = 0;
        if (n < t) {
            var a = t;
            t = n;
            n = a
        }
        var f = r.fillAlpha;
        isNaN(f) && (f = 0);
        a = e.chart.container;
        r = r.fillColor;
        "V" == o ? (t = AmCharts.fitToBounds(t, 0, e.viH), n = AmCharts.fitToBounds(n, 0, e.viH)) : (t = AmCharts.fitToBounds(t, 0, e.viW), n = AmCharts.fitToBounds(n, 0, e.viW));
        n -= t;
        isNaN(n) && (n = 4, u = 2, f = 0);
        0 > n && "object" == typeof r && (r = r.join(",").split(",").reverse());
        "V" == o ? (e = AmCharts.rect(a, e.width, n, r, f), e.translate(i, t - u + s)) : (e = AmCharts.rect(a, n, e.height, r, f), e.translate(t - u + i, s));
        this.set = a.set([e])
    },
    graphics: function() {
        return this.set
    },
    getLabel: function() {}
});
AmCharts.RadAxis = AmCharts.Class({
    construct: function(e) {
        var t = e.chart,
            n = e.axisThickness,
            r = e.axisColor,
            i = e.axisAlpha,
            s = e.x,
            o = e.y;
        this.set = t.container.set();
        t.axesSet.push(this.set);
        var u = e.axisTitleOffset,
            a = e.radarCategoriesEnabled,
            f = e.chart.fontFamily,
            l = e.fontSize;
        void 0 === l && (l = e.chart.fontSize);
        var c = e.color;
        void 0 === c && (c = e.chart.color);
        if (t) {
            this.axisWidth = e.height;
            e = t.chartData;
            var h = e.length,
                p;
            for (p = 0; p < h; p++) {
                var d = 180 - 360 / h * p,
                    v = s + this.axisWidth * Math.sin(d / 180 * Math.PI),
                    m = o + this.axisWidth * Math.cos(d / 180 * Math.PI);
                0 < i && (v = AmCharts.line(t.container, [s, v], [o, m], r, i, n), this.set.push(v));
                if (a) {
                    var g = "start",
                        v = s + (this.axisWidth + u) * Math.sin(d / 180 * Math.PI),
                        m = o + (this.axisWidth + u) * Math.cos(d / 180 * Math.PI);
                    if (180 == d || 0 === d) g = "middle", v -= 5;
                    0 > d && (g = "end", v -= 10);
                    180 == d && (m -= 5);
                    0 === d && (m += 5);
                    d = AmCharts.text(t.container, e[p].category, c, f, l, g);
                    d.translate(v + 5, m);
                    this.set.push(d);
                    d.getBBox()
                }
            }
        }
    }
});
AmCharts.RadItem = AmCharts.Class({
    construct: function(e, t, n, r, i, s, o) {
        void 0 === n && (n = "");
        var u = e.chart.fontFamily,
            a = e.fontSize;
        void 0 === a && (a = e.chart.fontSize);
        var f = e.color;
        void 0 === f && (f = e.chart.color);
        var l = e.chart.container;
        this.set = r = l.set();
        var c = e.axisColor,
            h = e.axisAlpha,
            p = e.tickLength,
            d = e.gridAlpha,
            v = e.gridThickness,
            m = e.gridColor,
            g = e.dashLength,
            y = e.fillColor,
            b = e.fillAlpha,
            w = e.labelsEnabled;
        i = e.counter;
        var E = e.inside,
            S = e.gridType,
            x;
        t -= e.height;
        var T;
        s = e.x;
        var N = e.y;
        o ? (w = !0, isNaN(o.tickLength) || (p = o.tickLength), void 0 != o.lineColor && (m = o.lineColor), isNaN(o.lineAlpha) || (d = o.lineAlpha), isNaN(o.dashLength) || (g = o.dashLength), isNaN(o.lineThickness) || (v = o.lineThickness), !0 === o.inside && (E = !0)) : n || (d /= 3, p /= 2);
        var C = "end",
            k = -1;
        E && (C = "start", k = 1);
        var L;
        w && (L = AmCharts.text(l, n, f, u, a, C), L.translate(s + (p + 3) * k, t), r.push(L), this.label = L, T = AmCharts.line(l, [s, s + p * k], [t, t], c, h, v), r.push(T));
        t = e.y - t;
        n = [];
        u = [];
        if (0 < d) {
            if ("polygons" == S) {
                x = e.data.length;
                for (a = 0; a < x; a++) f = 180 - 360 / x * a, n.push(t * Math.sin(f / 180 * Math.PI)), u.push(t * Math.cos(f / 180 * Math.PI));
                n.push(n[0]);
                u.push(u[0]);
                d = AmCharts.line(l, n, u, m, d, v, g)
            } else d = AmCharts.circle(l, t, "#FFFFFF", 0, v, m, d);
            d.translate(s, N);
            r.push(d)
        }
        if (1 == i && 0 < b && !o) {
            o = e.previousCoord;
            if ("polygons" == S) {
                for (a = x; 0 <= a; a--) f = 180 - 360 / x * a, n.push(o * Math.sin(f / 180 * Math.PI)), u.push(o * Math.cos(f / 180 * Math.PI));
                x = AmCharts.polygon(l, n, u, y, b)
            } else x = AmCharts.wedge(l, 0, 0, 0, -360, t, t, o, 0, {
                fill: y,
                "fill-opacity": b,
                stroke: 0,
                "stroke-opacity": 0,
                "stroke-width": 0
            });
            r.push(x);
            x.translate(s, N)
        }!1 === e.visible && (T && T.hide(), L && L.hide());
        e.counter = 0 === i ? 1 : 0;
        e.previousCoord = t
    },
    graphics: function() {
        return this.set
    },
    getLabel: function() {
        return this.label
    }
});
AmCharts.RadarFill = AmCharts.Class({
    construct: function(e, t, n, r) {
        t -= e.axisWidth;
        n -= e.axisWidth;
        var i = Math.max(t, n);
        t = n = Math.min(t, n);
        n = e.chart.container;
        var s = r.fillAlpha,
            o = r.fillColor,
            i = Math.abs(i - e.y);
        t = Math.abs(t - e.y);
        var u = Math.max(i, t);
        t = Math.min(i, t);
        i = u;
        u = -r.angle;
        r = -r.toAngle;
        isNaN(u) && (u = 0);
        isNaN(r) && (r = -360);
        this.set = n.set();
        void 0 === o && (o = "#000000");
        isNaN(s) && (s = 0);
        if ("polygons" == e.gridType) {
            r = [];
            var a = [],
                f = e.data.length,
                l;
            for (l = 0; l < f; l++) u = 180 - 360 / f * l, r.push(i * Math.sin(u / 180 * Math.PI)), a.push(i * Math.cos(u / 180 * Math.PI));
            r.push(r[0]);
            a.push(a[0]);
            for (l = f; 0 <= l; l--) u = 180 - 360 / f * l, r.push(t * Math.sin(u / 180 * Math.PI)), a.push(t * Math.cos(u / 180 * Math.PI));
            this.fill = AmCharts.polygon(n, r, a, o, s)
        } else this.fill = AmCharts.wedge(n, 0, 0, u, r - u, i, i, t, 0, {
            fill: o,
            "fill-opacity": s,
            stroke: 0,
            "stroke-opacity": 0,
            "stroke-width": 0
        });
        this.set.push(this.fill);
        this.fill.translate(e.x, e.y)
    },
    graphics: function() {
        return this.set
    },
    getLabel: function() {}
});
AmCharts.AmGraph = AmCharts.Class({
    construct: function() {
        this.createEvents("rollOverGraphItem", "rollOutGraphItem", "clickGraphItem", "doubleClickGraphItem", "rightClickGraphItem", "clickGraph");
        this.type = "line";
        this.stackable = !0;
        this.columnCount = 1;
        this.columnIndex = 0;
        this.centerCustomBullets = this.showBalloon = !0;
        this.maxBulletSize = 50;
        this.minBulletSize = 0;
        this.balloonText = "[[value]]";
        this.hidden = this.scrollbar = this.animationPlayed = !1;
        this.columnWidth = .8;
        this.pointPosition = "middle";
        this.depthCount = 1;
        this.includeInMinMax = !0;
        this.negativeBase = 0;
        this.visibleInLegend = !0;
        this.showAllValueLabels = !1;
        this.showBalloonAt = "close";
        this.lineThickness = 1;
        this.dashLength = 0;
        this.connect = !0;
        this.lineAlpha = 1;
        this.bullet = "none";
        this.bulletBorderThickness = 2;
        this.bulletAlpha = this.bulletBorderAlpha = 1;
        this.bulletSize = 8;
        this.hideBulletsCount = this.bulletOffset = 0;
        this.labelPosition = "top";
        this.cornerRadiusTop = 0;
        this.cursorBulletAlpha = 1;
        this.gradientOrientation = "vertical";
        this.dy = this.dx = 0;
        this.periodValue = "";
        this.y = this.x = 0
    },
    draw: function() {
        var e = this.chart,
            t = e.container;
        this.container = t;
        this.destroy();
        var n = t.set(),
            r = t.set();
        this.behindColumns ? (e.graphsBehindSet.push(n), e.bulletBehindSet.push(r)) : (e.graphsSet.push(n), e.bulletSet.push(r));
        this.bulletSet = r;
        if (!this.scrollbar) {
            var i = e.marginLeftReal,
                e = e.marginTopReal;
            n.translate(i, e);
            r.translate(i, e)
        }
        t = t.set();
        AmCharts.remove(this.columnsSet);
        n.push(t);
        this.set = n;
        this.columnsSet = t;
        this.columnsArray = [];
        this.ownColumns = [];
        this.allBullets = [];
        this.animationArray = [];
        AmCharts.ifArray(this.data) && (n = !1, "xy" == this.chartType ? this.xAxis.axisCreated && this.yAxis.axisCreated && (n = !0) : this.valueAxis.axisCreated && (n = !0), !this.hidden && n && this.createGraph())
    },
    createGraph: function() {
        var e = this,
            t = e.chart;
        "inside" == e.labelPosition && (e.labelPosition = "bottom");
        e.startAlpha = t.startAlpha;
        e.seqAn = t.sequencedAnimation;
        e.baseCoord = e.valueAxis.baseCoord;
        e.fillColors || (e.fillColors = e.lineColor);
        void 0 === e.fillAlphas && (e.fillAlphas = 0);
        void 0 === e.bulletColor && (e.bulletColor = e.lineColor, e.bulletColorNegative = e.negativeLineColor);
        void 0 === e.bulletAlpha && (e.bulletAlpha = e.lineAlpha);
        e.bulletBorderColor || (e.bulletBorderAlpha = 0);
        clearTimeout(e.playedTO);
        if (!isNaN(e.valueAxis.min) && !isNaN(e.valueAxis.max)) {
            switch (e.chartType) {
                case "serial":
                    e.createSerialGraph();
                    "candlestick" == e.type && 1 > e.valueAxis.minMaxMultiplier && e.positiveClip(e.set);
                    break;
                case "radar":
                    e.createRadarGraph();
                    break;
                case "xy":
                    e.createXYGraph(), e.positiveClip(e.set)
            }
            e.playedTO = setTimeout(function() {
                e.setAnimationPlayed.call(e)
            }, 500 * e.chart.startDuration)
        }
    },
    setAnimationPlayed: function() {
        this.animationPlayed = !0
    },
    createXYGraph: function() {
        var e = [],
            t = [],
            n = this.xAxis,
            r = this.yAxis;
        this.pmh = r.viH + 1;
        this.pmw = n.viW + 1;
        this.pmy = this.pmx = 0;
        var i;
        for (i = this.start; i <= this.end; i++) {
            var s = this.data[i].axes[n.id].graphs[this.id],
                o = s.values,
                u = o.x,
                a = o.y,
                o = n.getCoordinate(u),
                f = r.getCoordinate(a);
            if (!isNaN(u) && !isNaN(a) && (e.push(o), t.push(f), (u = this.createBullet(s, o, f, i)) || (u = 0), a = this.labelText)) s = this.createLabel(s, o, f, a), this.allBullets.push(s), this.positionLabel(o, f, s, this.labelPosition, u)
        }
        this.drawLineGraph(e, t);
        this.launchAnimation()
    },
    createRadarGraph: function() {
        var e = this.valueAxis.stackType,
            t = [],
            n = [],
            r, i, s;
        for (s = this.start; s <= this.end; s++) {
            var o = this.data[s].axes[this.valueAxis.id].graphs[this.id],
                u;
            u = "none" == e || "3d" == e ? o.values.value : o.values.close;
            if (isNaN(u)) this.drawLineGraph(t, n), t = [], n = [];
            else {
                var a = this.y - (this.valueAxis.getCoordinate(u) - this.height),
                    f = 180 - 360 / (this.end - this.start + 1) * s;
                u = a * Math.sin(f / 180 * Math.PI);
                a *= Math.cos(f / 180 * Math.PI);
                t.push(u);
                n.push(a);
                (f = this.createBullet(o, u, a, s)) || (f = 0);
                var l = this.labelText;
                l && (o = this.createLabel(o, u, a, l), this.allBullets.push(o), this.positionLabel(u, a, o, this.labelPosition, f));
                isNaN(r) && (r = u);
                isNaN(i) && (i = a)
            }
        }
        t.push(r);
        n.push(i);
        this.drawLineGraph(t, n);
        this.launchAnimation()
    },
    positionLabel: function(e, t, n, r, i) {
        var s = n.getBBox();
        switch (r) {
            case "left":
                e -= (s.width + i) / 2 + 2;
                break;
            case "top":
                t -= (i + s.height) / 2 + 1;
                break;
            case "right":
                e += (s.width + i) / 2 + 2;
                break;
            case "bottom":
                t += (i + s.height) / 2 + 1
        }
        n.translate(e, t)
    },
    createSerialGraph: function() {
        var e = this.chart,
            t = this.id,
            n = this.index,
            r = this.data,
            i = this.chart.container,
            s = this.valueAxis,
            o = this.type,
            u = this.columnWidth,
            a = this.width,
            f = this.height,
            l = this.y,
            c = this.rotate,
            h = this.columnCount,
            p = AmCharts.toCoordinate(this.cornerRadiusTop, u / 2),
            d = this.connect,
            v = [],
            m = [],
            g, y, b = this.chart.graphs.length,
            w, E = this.dx / this.depthCount,
            S = this.dy / this.depthCount,
            x = s.stackType,
            T = this.labelPosition,
            N = this.start,
            C = this.end,
            k = this.scrollbar,
            L = this.categoryAxis,
            A = this.baseCoord,
            O = this.negativeBase,
            M = this.columnIndex,
            _ = this.lineThickness,
            D = this.lineAlpha,
            P = this.lineColor,
            H = this.dashLength,
            B = this.set;
        "above" == T && (T = "top");
        "below" == T && (T = "bottom");
        var j = T,
            F = 270;
        "horizontal" == this.gradientOrientation && (F = 0);
        this.gradientRotation = F;
        var I = this.chart.columnSpacing,
            q = L.cellWidth,
            R = (q * u - h) / h;
        I > R && (I = R);
        var U, z, W, X = f + 1,
            V = a + 1,
            $ = 0,
            J = 0,
            K, Q, G, Y, Z = this.fillColors,
            et = this.negativeFillColors,
            tt = this.negativeLineColor,
            nt = this.fillAlphas,
            rt = this.negativeFillAlphas;
        "object" == typeof nt && (nt = nt[0]);
        "object" == typeof rt && (rt = rt[0]);
        var it = s.getCoordinate(s.min);
        s.logarithmic && (it = s.getCoordinate(s.minReal));
        this.minCoord = it;
        this.resetBullet && (this.bullet = "none");
        if (!k && ("line" == o || "smoothedLine" == o || "step" == o))
            if (1 == r.length && "step" != o && "none" == this.bullet && (this.bullet = "round", this.resetBullet = !0), et || void 0 != tt) {
                var st = O;
                st > s.max && (st = s.max);
                st < s.min && (st = s.min);
                s.logarithmic && (st = s.minReal);
                var ot = s.getCoordinate(st),
                    ut = s.getCoordinate(s.max);
                c ? (X = f, V = Math.abs(ut - ot), K = f, Q = Math.abs(it - ot), Y = J = 0, s.reversed ? ($ = 0, G = ot) : ($ = ot, G = 0)) : (V = a, X = Math.abs(ut - ot), Q = a, K = Math.abs(it - ot), G = $ = 0, s.reversed ? (Y = l, J = ot) : Y = ot + 1)
            }
        var at = Math.round;
        this.pmx = at($);
        this.pmy = at(J);
        this.pmh = at(X);
        this.pmw = at(V);
        this.nmx = at(G);
        this.nmy = at(Y);
        this.nmh = at(K);
        this.nmw = at(Q);
        9 > AmCharts.IEversion && 0 < AmCharts.IEversion && (this.nmy = this.nmx = 0, this.nmh = this.height);
        u = "column" == o ? (q * u - I * (h - 1)) / h : q * u;
        1 > u && (u = 1);
        var ft;
        if ("line" == o || "step" == o || "smoothedLine" == o) {
            if (0 < N)
                for (ft = N - 1; - 1 < ft; ft--)
                    if (U = r[ft], z = U.axes[s.id].graphs[t], W = z.values.value) {
                        N = ft;
                        break
                    }
            if (C < r.length - 1)
                for (ft = C + 1; ft < r.length; ft++)
                    if (U = r[ft], z = U.axes[s.id].graphs[t], W = z.values.value) {
                        C = ft;
                        break
                    }
        }
        C < r.length - 1 && C++;
        var lt = [],
            ct = [],
            ht = !1;
        if ("line" == o || "step" == o || "smoothedLine" == o)
            if (this.stackable && "regular" == x || "100%" == x || this.fillToGraph) ht = !0;
        for (ft = N; ft <= C; ft++) {
            U = r[ft];
            z = U.axes[s.id].graphs[t];
            z.index = ft;
            var pt, dt, vt, mt, gt = NaN,
                yt = NaN,
                bt = NaN,
                wt = NaN,
                Et = NaN,
                St = NaN,
                xt = NaN,
                Tt = NaN,
                Nt = NaN,
                Ct = NaN,
                kt = NaN,
                Lt = NaN,
                At = NaN,
                Ot = NaN,
                Mt = NaN,
                _t = NaN,
                Dt = NaN,
                Pt = void 0,
                Ht = Z,
                Bt = nt,
                jt = P,
                Ft, It;
            void 0 != z.color && (Ht = z.color);
            z.fillColors && (Ht = z.fillColors);
            isNaN(z.alpha) || (Bt = z.alpha);
            var qt = z.values;
            s.recalculateToPercents && (qt = z.percents);
            if (qt) {
                Ot = !this.stackable || "none" == x || "3d" == x ? qt.value : qt.close;
                if ("candlestick" == o || "ohlc" == o) Ot = qt.close, _t = qt.low, xt = s.getCoordinate(_t), Mt = qt.high, Nt = s.getCoordinate(Mt);
                Dt = qt.open;
                bt = s.getCoordinate(Ot);
                isNaN(Dt) || (Et = s.getCoordinate(Dt));
                if (!k) switch (this.showBalloonAt) {
                    case "close":
                        z.y = bt;
                        break;
                    case "open":
                        z.y = Et;
                        break;
                    case "high":
                        z.y = Nt;
                        break;
                    case "low":
                        z.y = xt
                }
                var gt = U.x[L.id],
                    Rt = Math.floor(q / 2),
                    Ut = Rt;
                "start" == this.pointPosition && (gt -= q / 2, Rt = 0, Ut = q);
                k || (z.x = gt); - 1e5 > gt && (gt = -1e5);
                gt > a + 1e5 && (gt = a + 1e5);
                c ? (yt = bt, wt = Et, Et = bt = gt, isNaN(Dt) && !this.fillToGraph && (wt = A), St = xt, Tt = Nt) : (wt = yt = gt, isNaN(Dt) && !this.fillToGraph && (Et = A));
                Ot < Dt && (z.isNegative = !0, et && (Ht = et), rt && (Bt = rt), void 0 != tt && (jt = tt));
                switch (o) {
                    case "line":
                        isNaN(Ot) ? d || (this.drawLineGraph(v, m, lt, ct), v = [], m = [], lt = [], ct = []) : (z.isNegative = Ot < O ? !0 : !1, v.push(yt), m.push(bt), Ct = yt, kt = bt, Lt = yt, At = bt, ht && !isNaN(Et) && !isNaN(wt) && (lt.push(wt), ct.push(Et)));
                        break;
                    case "smoothedLine":
                        isNaN(Ot) ? d || (this.drawSmoothedGraph(v, m, lt, ct), v = [], m = [], lt = [], ct = []) : (z.isNegative = Ot < O ? !0 : !1, v.push(yt), m.push(bt), Ct = yt, kt = bt, Lt = yt, At = bt, ht && !isNaN(Et) && !isNaN(wt) && (lt.push(wt), ct.push(Et)));
                        break;
                    case "step":
                        isNaN(Ot) ? d || (y = NaN, this.drawLineGraph(v, m, lt, ct), v = [], m = [], lt = [], ct = []) : (z.isNegative = Ot < O ? !0 : !1, c ? (isNaN(g) || (v.push(g), m.push(bt - Rt)), m.push(bt - Rt), v.push(yt), m.push(bt + Ut), v.push(yt), ht && !isNaN(Et) && !isNaN(wt) && (lt.push(wt), ct.push(Et - Rt), lt.push(wt), ct.push(Et + Ut))) : (isNaN(y) || (m.push(y), v.push(yt - Rt)), v.push(yt - Rt), m.push(bt), v.push(yt + Ut), m.push(bt), ht && !isNaN(Et) && !isNaN(wt) && (lt.push(wt - Rt), ct.push(Et), lt.push(wt + Ut), ct.push(Et))), g = yt, y = bt, Ct = yt, kt = bt, Lt = yt, At = bt);
                        break;
                    case "column":
                        Ft = jt;
                        void 0 != z.lineColor && (Ft = z.lineColor);
                        if (!isNaN(Ot)) {
                            Ot < O ? (z.isNegative = !0, et && (Ht = et), void 0 != tt && (jt = tt)) : z.isNegative = !1;
                            var zt = s.min,
                                Wt = s.max;
                            if (!(Ot < zt && Dt < zt || Ot > Wt && Dt > Wt))
                                if (c) {
                                    "3d" == x ? (dt = bt - .5 * (u + I) + I / 2 + S * M, pt = wt + E * M) : (dt = bt - (h / 2 - M) * (u + I) + I / 2, pt = wt);
                                    vt = u;
                                    Ct = yt;
                                    kt = dt + u / 2;
                                    Lt = yt;
                                    At = dt + u / 2;
                                    dt + vt > f && (vt = f - dt);
                                    0 > dt && (vt += dt, dt = 0);
                                    mt = yt - wt;
                                    var Xt = pt;
                                    pt = AmCharts.fitToBounds(pt, 0, a);
                                    mt += Xt - pt;
                                    mt = AmCharts.fitToBounds(mt, -pt, a - pt + E * M);
                                    if (dt < f && 0 < vt && (Pt = new AmCharts.Cuboid(i, mt, vt, E - e.d3x, S - e.d3y, Ht, Bt, _, Ft, D, F, p, c), "bottom" != T))
                                        if (T = s.reversed ? "left" : "right", 0 > Ot) T = s.reversed ? "right" : "left";
                                        else if ("regular" == x || "100%" == x) Ct += this.dx
                                } else {
                                    "3d" == x ? (pt = yt - .5 * (u + I) + I / 2 + E * M, dt = Et + S * M) : (pt = yt - (h / 2 - M) * (u + I) + I / 2, dt = Et);
                                    vt = u;
                                    Ct = pt + u / 2;
                                    kt = bt;
                                    Lt = pt + u / 2;
                                    At = bt;
                                    pt + vt > a + M * E && (vt = a - pt + M * E);
                                    0 > pt && (vt += pt, pt = 0);
                                    mt = bt - Et;
                                    var Vt = dt;
                                    dt = AmCharts.fitToBounds(dt, this.dy, f);
                                    mt += Vt - dt;
                                    mt = AmCharts.fitToBounds(mt, -dt + S * M, f - dt);
                                    if (pt < a + M * E && 0 < vt)
                                        if (Pt = new AmCharts.Cuboid(i, vt, mt, E - e.d3x, S - e.d3y, Ht, Bt, _, Ft, this.lineAlpha, F, p, c), 0 > Ot && "middle" != T) T = "bottom";
                                        else if (T = j, "regular" == x || "100%" == x) kt += this.dy
                                }
                            if (Pt && (It = Pt.set, It.translate(pt, dt), this.columnsSet.push(It), (z.url || this.showHandOnHover) && It.setAttr("cursor", "pointer"), !k)) {
                                "none" == x && (w = c ? (this.end + 1 - ft) * b - n : b * ft + n);
                                "3d" == x && (c ? (w = (b - n) * (this.end + 1 - ft), Ct += E * this.columnIndex, Lt += E * this.columnIndex, z.y += E * this.columnIndex) : (w = (b - n) * (ft + 1), Ct += 3, kt += S * this.columnIndex + 7, At += S * this.columnIndex, z.y += S * this.columnIndex));
                                if ("regular" == x || "100%" == x) T = "middle", w = c ? 0 < qt.value ? (this.end + 1 - ft) * b + n : (this.end + 1 - ft) * b - n : 0 < qt.value ? b * ft + n : b * ft - n;
                                this.columnsArray.push({
                                    column: Pt,
                                    depth: w
                                });
                                z.x = c ? dt + vt / 2 : pt + vt / 2;
                                this.ownColumns.push(Pt);
                                this.animateColumns(Pt, ft, yt, wt, bt, Et);
                                this.addListeners(It, z)
                            }
                        }
                        break;
                    case "candlestick":
                        if (!isNaN(Dt) && !isNaN(Ot)) {
                            var $t, Jt;
                            Ft = jt;
                            void 0 != z.lineColor && (Ft = z.lineColor);
                            if (c) {
                                if (dt = bt - u / 2, pt = wt, vt = u, dt + vt > f && (vt = f - dt), 0 > dt && (vt += dt, dt = 0), dt < f && 0 < vt) {
                                    var Kt, Qt;
                                    Ot > Dt ? (Kt = [yt, Tt], Qt = [wt, St]) : (Kt = [wt, Tt], Qt = [yt, St]);
                                    !isNaN(Tt) && !isNaN(St) && bt < f && 0 < bt && ($t = AmCharts.line(i, Kt, [bt, bt], Ft, D, _), Jt = AmCharts.line(i, Qt, [bt, bt], Ft, D, _));
                                    mt = yt - wt;
                                    Pt = new AmCharts.Cuboid(i, mt, vt, E, S, Ht, nt, _, Ft, D, F, p, c)
                                }
                            } else if (pt = yt - u / 2, dt = Et + _ / 2, vt = u, pt + vt > a && (vt = a - pt), 0 > pt && (vt += pt, pt = 0), mt = bt - Et, pt < a && 0 < vt) {
                                var Pt = new AmCharts.Cuboid(i, vt, mt, E, S, Ht, Bt, _, Ft, D, F, p, c),
                                    Gt, Yt;
                                Ot > Dt ? (Gt = [bt, Nt], Yt = [Et, xt]) : (Gt = [Et, Nt], Yt = [bt, xt]);
                                !isNaN(Nt) && !isNaN(xt) && yt < a && 0 < yt && ($t = AmCharts.line(i, [yt, yt], Gt, Ft, D, _), Jt = AmCharts.line(i, [yt, yt], Yt, Ft, D, _))
                            }
                            Pt && (It = Pt.set, B.push(It), It.translate(pt, dt - _ / 2), (z.url || this.showHandOnHover) && It.setAttr("cursor", "pointer"), $t && (B.push($t), B.push(Jt)), Ct = yt, kt = bt, Lt = yt, At = bt, k || (z.x = c ? dt + vt / 2 : pt + vt / 2, this.animateColumns(Pt, ft, yt, wt, bt, Et), this.addListeners(It, z)))
                        }
                        break;
                    case "ohlc":
                        if (!isNaN(Dt) && !isNaN(Mt) && !isNaN(_t) && !isNaN(Ot)) {
                            Ot < Dt && (z.isNegative = !0, void 0 != tt && (jt = tt));
                            var Zt, en, tn;
                            if (c) {
                                var nn = bt - u / 2,
                                    nn = AmCharts.fitToBounds(nn, 0, f),
                                    rn = AmCharts.fitToBounds(bt, 0, f),
                                    sn = bt + u / 2,
                                    sn = AmCharts.fitToBounds(sn, 0, f);
                                en = AmCharts.line(i, [wt, wt], [nn, rn], jt, D, _, H);
                                0 < bt && bt < f && (Zt = AmCharts.line(i, [St, Tt], [bt, bt], jt, D, _, H));
                                tn = AmCharts.line(i, [yt, yt], [rn, sn], jt, D, _, H)
                            } else {
                                var on = yt - u / 2,
                                    on = AmCharts.fitToBounds(on, 0, a),
                                    un = AmCharts.fitToBounds(yt, 0, a),
                                    an = yt + u / 2,
                                    an = AmCharts.fitToBounds(an, 0, a);
                                en = AmCharts.line(i, [on, un], [Et, Et], jt, D, _, H);
                                0 < yt && yt < a && (Zt = AmCharts.line(i, [yt, yt], [xt, Nt], jt, D, _, H));
                                tn = AmCharts.line(i, [un, an], [bt, bt], jt, D, _, H)
                            }
                            B.push(en);
                            B.push(Zt);
                            B.push(tn);
                            Ct = yt;
                            kt = bt;
                            Lt = yt;
                            At = bt
                        }
                }
                if (!k && !isNaN(Ot)) {
                    var fn = this.hideBulletsCount;
                    if (this.end - this.start <= fn || 0 === fn) {
                        var ln = this.createBullet(z, Lt, At, ft);
                        ln || (ln = 0);
                        var cn = this.labelText;
                        if (cn) {
                            var hn = this.createLabel(z, 0, 0, cn),
                                pn = 0,
                                dn = 0,
                                vn = hn.getBBox(),
                                mn = vn.width,
                                gn = vn.height;
                            switch (T) {
                                case "left":
                                    pn = -(mn / 2 + ln / 2 + 3);
                                    break;
                                case "top":
                                    dn = -(gn / 2 + ln / 2 + 3);
                                    break;
                                case "right":
                                    pn = ln / 2 + 2 + mn / 2;
                                    break;
                                case "bottom":
                                    c && "column" == o ? (Ct = A, 0 > Ot ? (pn = -6, hn.attr({
                                        "text-anchor": "end"
                                    })) : (pn = 6, hn.attr({
                                        "text-anchor": "start"
                                    }))) : (dn = ln / 2 + gn / 2, hn.x = -(mn / 2 + 2));
                                    break;
                                case "middle":
                                    "column" == o && (c ? (dn = -(gn / 2) + this.fontSize / 2, pn = -(yt - wt) / 2 - E, 0 > mt && (pn += E), Math.abs(yt - wt) < mn && !this.showAllValueLabels && (hn.remove(), hn = null)) : (dn = -(bt - Et) / 2, 0 > mt && (dn -= S), Math.abs(bt - Et) < gn && !this.showAllValueLabels && (hn.remove(), hn = null)))
                            }
                            if (hn) {
                                if (!isNaN(kt) && !isNaN(Ct))
                                    if (Ct += pn, kt += dn, hn.translate(Ct, kt), c) {
                                        if (0 > kt || kt > f) hn.remove(), hn = null
                                    } else {
                                        var yn = 0;
                                        "3d" == x && (yn = E * M);
                                        if (0 > Ct || Ct > a + yn) hn.remove(), hn = null
                                    }
                                else hn.remove(), hn = null;
                                hn && this.allBullets.push(hn)
                            }
                        }
                        if ("column" == o && "regular" == x || "100%" == x) {
                            var bn = s.totalText;
                            if (bn) {
                                var wn = this.createLabel(z, 0, 0, bn, s.totalTextColor);
                                this.allBullets.push(wn);
                                var En = wn.getBBox(),
                                    Sn = En.width,
                                    xn = En.height,
                                    Tn, Nn, Cn = s.totals[ft];
                                Cn && Cn.remove();
                                c ? (Nn = bt, Tn = 0 > Ot ? yt - Sn / 2 - 2 : yt + Sn / 2 + 3) : (Tn = yt, Nn = 0 > Ot ? bt + xn / 2 : bt - xn / 2 - 3);
                                wn.translate(Tn, Nn);
                                s.totals[ft] = wn;
                                c ? (0 > Nn || Nn > f) && wn.remove() : (0 > Tn || Tn > a) && wn.remove()
                            }
                        }
                    }
                }
            }
        }
        if ("line" == o || "step" == o || "smoothedLine" == o) "smoothedLine" == o ? this.drawSmoothedGraph(v, m, lt, ct) : this.drawLineGraph(v, m, lt, ct), k || this.launchAnimation()
    },
    animateColumns: function(e, t) {
        var n = this,
            r = n.chart.startDuration;
        0 < r && !n.animationPlayed && (n.seqAn ? (e.set.hide(), n.animationArray.push(e), r = setTimeout(function() {
            n.animate.call(n)
        }, 1e3 * r / (n.end - n.start + 1) * (t - n.start)), n.timeOuts.push(r)) : n.animate(e))
    },
    createLabel: function(e, t, n, r, i) {
        var s = this.chart,
            o = e.labelColor;
        void 0 == o && (o = this.color);
        void 0 == o && (o = s.color);
        void 0 != i && (o = i);
        i = this.fontSize;
        void 0 === i && (this.fontSize = i = s.fontSize);
        e = s.formatString(r, e, this);
        e = AmCharts.cleanFromEmpty(e);
        s = AmCharts.text(this.container, e, o, s.fontFamily, i);
        s.translate(t, n);
        this.bulletSet.push(s);
        return s
    },
    positiveClip: function(e) {
        e.clipRect(this.pmx, this.pmy, this.pmw, this.pmh)
    },
    negativeClip: function(e) {
        e.clipRect(this.nmx, this.nmy, this.nmw, this.nmh)
    },
    drawLineGraph: function(e, t, n, r) {
        var i = this;
        if (1 < e.length) {
            var s = i.set,
                o = i.container,
                u = o.set(),
                a = o.set();
            s.push(a);
            s.push(u);
            var f = i.lineAlpha,
                l = i.lineThickness,
                c = i.dashLength,
                s = i.fillAlphas,
                h = i.lineColor,
                p = i.fillColors,
                d = i.negativeLineColor,
                v = i.negativeFillColors,
                m = i.negativeFillAlphas,
                g = i.baseCoord;
            0 != i.negativeBase && (g = i.valueAxis.getCoordinate(i.negativeBase));
            h = AmCharts.line(o, e, t, h, f, l, c, !1, !0);
            u.push(h);
            u.click(function() {
                i.handleGraphClick()
            });
            void 0 !== d && (f = AmCharts.line(o, e, t, d, f, l, c, !1, !0), a.push(f));
            if (0 < s || 0 < m)
                if (f = e.join(";").split(";"), l = t.join(";").split(";"), "serial" == i.chartType && (0 < n.length ? (n.reverse(), r.reverse(), f = e.concat(n), l = t.concat(r)) : i.rotate ? (l.push(l[l.length - 1]), f.push(g), l.push(l[0]), f.push(g), l.push(l[0]), f.push(f[0])) : (f.push(f[f.length - 1]), l.push(g), f.push(f[0]), l.push(g), f.push(e[0]), l.push(l[0]))), 0 < s && (e = AmCharts.polygon(o, f, l, p, s, 0, 0, 0, this.gradientRotation), u.push(e)), v || void 0 !== d) isNaN(m) && (m = s), v || (v = d), o = AmCharts.polygon(o, f, l, v, m, 0, 0, 0, this.gradientRotation), a.push(o), a.click(function() {
                    i.handleGraphClick()
                });
            i.applyMask(a, u)
        }
    },
    applyMask: function(e, t) {
        var n = e.length();
        "serial" == this.chartType && !this.scrollbar && (this.positiveClip(t), 0 < n && this.negativeClip(e))
    },
    drawSmoothedGraph: function(e, t, n, r) {
        if (1 < e.length) {
            var i = this.set,
                s = this.container,
                o = s.set(),
                u = s.set();
            i.push(u);
            i.push(o);
            var a = this.lineAlpha,
                f = this.lineThickness,
                i = this.dashLength,
                l = this.fillAlphas,
                c = this.fillColors,
                h = this.negativeLineColor,
                p = this.negativeFillColors,
                d = this.negativeFillAlphas,
                v = this.baseCoord,
                m = new AmCharts.Bezier(s, e, t, this.lineColor, a, f, c, 0, i);
            o.push(m.path);
            void 0 !== h && (a = new AmCharts.Bezier(s, e, t, h, a, f, c, 0, i), u.push(a.path));
            if (0 < l && (f = e.join(";").split(";"), m = t.join(";").split(";"), a = "", 0 < n.length ? (n.reverse(), r.reverse(), f = e.concat(n), m = t.concat(r)) : (this.rotate ? (a += " L" + v + "," + t[t.length - 1], a += " L" + v + "," + t[0]) : (a += " L" + e[e.length - 1] + "," + v, a += " L" + e[0] + "," + v), a += " L" + e[0] + "," + t[0]), n = new AmCharts.Bezier(s, f, m, NaN, 0, 0, c, l, i, a), o.push(n.path), p || void 0 !== h)) d || (d = l), p || (p = h), e = new AmCharts.Bezier(s, e, t, NaN, 0, 0, p, d, i, a), u.push(e.path);
            this.applyMask(u, o)
        }
    },
    launchAnimation: function() {
        var e = this,
            t = e.chart.startDuration;
        if (0 < t && !e.animationPlayed) {
            var n = e.set,
                r = e.bulletSet;
            AmCharts.VML || (n.attr({
                opacity: e.startAlpha
            }), r.attr({
                opacity: e.startAlpha
            }));
            n.hide();
            r.hide();
            e.seqAn ? (t = setTimeout(function() {
                e.animateGraphs.call(e)
            }, 1e3 * e.index * t), e.timeOuts.push(t)) : e.animateGraphs()
        }
    },
    animateGraphs: function() {
        var e = this.chart,
            t = this.set,
            n = this.bulletSet,
            r = this.x,
            i = this.y;
        t.show();
        n.show();
        var s = e.startDuration,
            e = e.startEffect;
        t && (this.rotate ? (t.translate(-1e3, i), n.translate(-1e3, i)) : (t.translate(r, -1e3), n.translate(r, -1e3)), t.animate({
            opacity: 1,
            translate: r + "," + i
        }, s, e), n.animate({
            opacity: 1,
            translate: r + "," + i
        }, s, e))
    },
    animate: function(e) {
        var t = this.chart,
            n = this.container,
            r = this.animationArray;
        !e && 0 < r.length && (e = r[0], r.shift());
        n = n[AmCharts.getEffect(t.startEffect)];
        t = t.startDuration;
        e && (this.rotate ? e.animateWidth(t, n) : e.animateHeight(t, n), e.set.show())
    },
    legendKeyColor: function() {
        var e = this.legendColor,
            t = this.lineAlpha;
        void 0 === e && (e = this.lineColor, 0 === t && (t = this.fillColors) && (e = "object" == typeof t ? t[0] : t));
        return e
    },
    legendKeyAlpha: function() {
        var e = this.legendAlpha;
        void 0 === e && (e = this.lineAlpha, 0 === e && this.fillAlphas && (e = this.fillAlphas), 0 === e && (e = this.bulletAlpha), 0 === e && (e = 1));
        return e
    },
    createBullet: function(e, t, n) {
        var r = this.container,
            i = this.bulletOffset,
            s = this.bulletSize;
        isNaN(e.bulletSize) || (s = e.bulletSize);
        if (!isNaN(this.maxValue)) {
            var o = e.values.value;
            isNaN(o) || (s = o / this.maxValue * this.maxBulletSize)
        }
        s < this.minBulletSize && (s = this.minBulletSize);
        this.rotate ? t += i : n -= i;
        var u;
        if ("none" != this.bullet || e.bullet) {
            var a = this.bulletColor;
            e.isNegative && void 0 !== this.bulletColorNegative && (a = this.bulletColorNegative);
            void 0 !== e.color && (a = e.color);
            i = this.bullet;
            e.bullet && (i = e.bullet);
            var o = this.bulletBorderThickness,
                f = this.bulletBorderColor,
                l = this.bulletBorderAlpha,
                c = a,
                h = this.bulletAlpha,
                a = e.alpha;
            isNaN(a) || (h = a);
            a = 0;
            switch (i) {
                case "round":
                    u = AmCharts.circle(r, s / 2, c, h, o, f, l);
                    break;
                case "square":
                    u = AmCharts.polygon(r, [0, s, s, 0], [0, 0, s, s], c, h, o, f, l);
                    t -= s / 2;
                    n -= s / 2;
                    a = -s / 2;
                    break;
                case "triangleUp":
                    u = AmCharts.triangle(r, s, 0, c, h, o, f, l);
                    break;
                case "triangleDown":
                    u = AmCharts.triangle(r, s, 180, c, h, o, f, l);
                    break;
                case "triangleLeft":
                    u = AmCharts.triangle(r, s, 270, c, h, o, f, l);
                    break;
                case "triangleRight":
                    u = AmCharts.triangle(r, s, 90, c, h, o, f, l);
                    break;
                case "bubble":
                    u = AmCharts.circle(r, s / 2, c, h, o, f, l, !0)
            }
        }
        o = i = 0;
        if (this.customBullet || e.customBullet) f = this.customBullet, e.customBullet && (f = e.customBullet), f && (u && u.remove(), "function" == typeof f ? (u = new f, u.chart = this.chart, e.bulletConfig && (u.availableSpace = n, u.graph = this, e.bulletConfig.minCoord = this.minCoord - n, u.bulletConfig = e.bulletConfig), u.write(r), u = u.set) : (this.chart.path && (f = this.chart.path + f), u = r.image(f, 0, 0, s, s), this.centerCustomBullets && (t -= s / 2, n -= s / 2, i -= s / 2, o -= s / 2)));
        if (u) {
            (e.url || this.showHandOnHover) && u.setAttr("cursor", "pointer");
            if ("serial" == this.chartType && (t - i < a || t - i > this.width || n < -s / 2 || n - o > this.height)) u.remove(), u = null;
            u && (this.bulletSet.push(u), u.translate(t, n), this.addListeners(u, e), this.allBullets.push(u))
        }
        return s
    },
    showBullets: function() {
        var e = this.allBullets,
            t;
        for (t = 0; t < e.length; t++) e[t].show()
    },
    hideBullets: function() {
        var e = this.allBullets,
            t;
        for (t = 0; t < e.length; t++) e[t].hide()
    },
    addListeners: function(e, t) {
        var n = this;
        e.mouseover(function() {
            n.handleRollOver(t)
        }).mouseout(function() {
            n.handleRollOut(t)
        }).touchend(function() {
            n.handleRollOver(t)
        }).touchstart(function() {
            n.handleRollOver(t)
        }).click(function() {
            n.handleClick(t)
        }).dblclick(function() {
            n.handleDoubleClick(t)
        }).contextmenu(function() {
            n.handleRightClick(t)
        })
    },
    handleRollOver: function(e) {
        if (e) {
            var t = this.chart,
                n = {
                    type: "rollOverGraphItem",
                    item: e,
                    index: e.index,
                    graph: this,
                    target: this,
                    chart: this.chart
                };
            this.fire("rollOverGraphItem", n);
            t.fire("rollOverGraphItem", n);
            clearTimeout(t.hoverInt);
            n = this.showBalloon;
            t.chartCursor && "serial" == this.chartType && (n = !1, !t.chartCursor.valueBalloonsEnabled && this.showBalloon && (n = !0));
            n && (n = t.formatString(this.balloonText, e, e.graph), n = AmCharts.cleanFromEmpty(n), e = t.getBalloonColor(this, e), t.balloon.showBullet = !1, t.balloon.pointerOrientation = "V", t.showBalloon(n, e, !0))
        }
    },
    handleRollOut: function(e) {
        this.chart.hideBalloon();
        e && (e = {
            type: "rollOutGraphItem",
            item: e,
            index: e.index,
            graph: this,
            target: this,
            chart: this.chart
        }, this.fire("rollOutGraphItem", e), this.chart.fire("rollOutGraphItem", e))
    },
    handleClick: function(e) {
        if (e) {
            var t = {
                type: "clickGraphItem",
                item: e,
                index: e.index,
                graph: this,
                target: this,
                chart: this.chart
            };
            this.fire("clickGraphItem", t);
            this.chart.fire("clickGraphItem", t);
            AmCharts.getURL(e.url, this.urlTarget)
        }
        this.handleGraphClick()
    },
    handleGraphClick: function() {
        var e = {
            type: "clickGraph",
            graph: this,
            target: this,
            chart: this.chart
        };
        this.fire("clickGraph", e);
        this.chart.fire("clickGraph", e)
    },
    handleRightClick: function(e) {
        e && (e = {
            type: "rightClickGraphItem",
            item: e,
            index: e.index,
            graph: this,
            target: this,
            chart: this.chart
        }, this.fire("rightClickGraphItem", e), this.chart.fire("rightClickGraphItem", e))
    },
    handleDoubleClick: function(e) {
        e && (e = {
            type: "doubleClickGraphItem",
            item: e,
            index: e.index,
            graph: this,
            target: this,
            chart: this.chart
        }, this.fire("doubleClickGraphItem", e), this.chart.fire("doubleClickGraphItem", e))
    },
    zoom: function(e, t) {
        this.start = e;
        this.end = t;
        this.draw()
    },
    changeOpacity: function(e) {
        var t = this.set;
        t && t.setAttr("opacity", e);
        if (t = this.ownColumns) {
            var n;
            for (n = 0; n < t.length; n++) {
                var r = t[n].set;
                r && r.setAttr("opacity", e)
            }
        }(t = this.bulletSet) && t.setAttr("opacity", e)
    },
    destroy: function() {
        AmCharts.remove(this.set);
        AmCharts.remove(this.bulletSet);
        var e = this.timeOuts;
        if (e) {
            var t;
            for (t = 0; t < e.length; t++) clearTimeout(e[t])
        }
        this.timeOuts = []
    }
});
AmCharts.ChartCursor = AmCharts.Class({
    construct: function() {
        this.createEvents("changed", "zoomed", "onHideCursor", "draw", "selected");
        this.enabled = !0;
        this.cursorAlpha = 1;
        this.selectionAlpha = .2;
        this.cursorColor = "#CC0000";
        this.categoryBalloonAlpha = 1;
        this.color = "#FFFFFF";
        this.type = "cursor";
        this.zoomed = !1;
        this.zoomable = !0;
        this.pan = !1;
        this.animate = !0;
        this.categoryBalloonDateFormat = "MMM DD, YYYY";
        this.categoryBalloonEnabled = this.valueBalloonsEnabled = !0;
        this.rolledOver = !1;
        this.cursorPosition = "middle";
        this.bulletsEnabled = this.skipZoomDispatch = !1;
        this.bulletSize = 8;
        this.selectWithoutZooming = this.oneBalloonOnly = !1
    },
    draw: function() {
        var e = this;
        e.destroy();
        var t = e.chart,
            n = t.container;
        e.rotate = t.rotate;
        e.container = n;
        n = n.set();
        n.translate(e.x, e.y);
        e.set = n;
        t.cursorSet.push(n);
        n = new AmCharts.AmBalloon;
        n.chart = t;
        e.categoryBalloon = n;
        n.cornerRadius = 0;
        n.borderThickness = 0;
        n.borderAlpha = 0;
        n.showBullet = !1;
        var r = e.categoryBalloonColor;
        void 0 === r && (r = e.cursorColor);
        n.fillColor = r;
        n.fillAlpha = e.categoryBalloonAlpha;
        n.borderColor = r;
        n.color = e.color;
        e.rotate && (n.pointerOrientation = "H");
        if (e.valueBalloonsEnabled)
            for (n = 0; n < t.graphs.length; n++) r = new AmCharts.AmBalloon, r.chart = t, AmCharts.copyProperties(t.balloon, r), t.graphs[n].valueBalloon = r;
        "cursor" == e.type ? e.createCursor() : e.createCrosshair();
        e.interval = setInterval(function() {
            e.detectMovement.call(e)
        }, 40)
    },
    updateData: function() {
        var e = this.chart;
        this.data = e.chartData;
        this.firstTime = e.firstTime;
        this.lastTime = e.lastTime
    },
    createCursor: function() {
        var e = this.chart,
            t = this.cursorAlpha,
            n = e.categoryAxis,
            r = n.position,
            i = n.inside,
            s = n.axisThickness,
            o = this.categoryBalloon,
            u, a, f = e.dx,
            l = e.dy,
            c = this.x,
            h = this.y,
            p = this.width,
            d = this.height,
            e = e.rotate,
            v = n.tickLength;
        o.pointerWidth = v;
        e ? (u = [0, p, p + f], a = [0, 0, l]) : (u = [f, 0, 0], a = [l, 0, d]);
        this.line = t = AmCharts.line(this.container, u, a, this.cursorColor, t, 1);
        this.set.push(t);
        e ? (i && (o.pointerWidth = 0), "right" == r ? i ? o.setBounds(c, h + l, c + p + f, h + d + l) : o.setBounds(c + p + f + s, h + l, c + p + 1e3, h + d + l) : i ? o.setBounds(c, h, p + c, d + h) : o.setBounds(-1e3, -1e3, c - v - s, h + d + 15)) : (o.maxWidth = p, n.parseDates && (v = 0, o.pointerWidth = 0), "top" == r ? i ? o.setBounds(c + f, h + l, p + f + c, d + h) : o.setBounds(c + f, -1e3, p + f + c, h + l - v - s) : i ? o.setBounds(c, h, p + c, d + h - v) : o.setBounds(c, h + d + v + s - 1, c + p, h + d + v + s));
        this.hideCursor()
    },
    createCrosshair: function() {
        var e = this.cursorAlpha,
            t = this.container,
            n = AmCharts.line(t, [0, 0], [0, this.height], this.cursorColor, e, 1),
            e = AmCharts.line(t, [0, this.width], [0, 0], this.cursorColor, e, 1);
        this.set.push(n);
        this.set.push(e);
        this.vLine = n;
        this.hLine = e;
        this.hideCursor()
    },
    detectMovement: function() {
        var e = this.chart;
        if (e.mouseIsOver) {
            var t = e.mouseX - this.x,
                n = e.mouseY - this.y;
            0 < t && t < this.width && 0 < n && n < this.height ? (this.drawing ? this.rolledOver || e.setMouseCursor("crosshair") : this.pan && (this.rolledOver || e.setMouseCursor("move")), this.rolledOver = !0, this.setPosition()) : this.rolledOver && (this.handleMouseOut(), this.rolledOver = !1)
        } else this.rolledOver && (this.handleMouseOut(), this.rolledOver = !1)
    },
    getMousePosition: function() {
        var e, t = this.width,
            n = this.height;
        e = this.chart;
        this.rotate ? (e = e.mouseY - this.y, 0 > e && (e = 0), e > n && (e = n)) : (e = e.mouseX - this.x, 0 > e && (e = 0), e > t && (e = t));
        return e
    },
    updateCrosshair: function() {
        var e = this.chart,
            t = e.mouseX - this.x,
            n = e.mouseY - this.y,
            r = this.vLine,
            i = this.hLine,
            t = AmCharts.fitToBounds(t, 0, this.width),
            n = AmCharts.fitToBounds(n, 0, this.height);
        0 < this.cursorAlpha && (r.show(), i.show(), r.translate(t, 0), i.translate(0, n));
        this.zooming && (e.hideXScrollbar && (t = NaN), e.hideYScrollbar && (n = NaN), this.updateSelectionSize(t, n));
        !e.mouseIsOver && !this.zooming && this.hideCursor()
    },
    updateSelectionSize: function(e, t) {
        AmCharts.remove(this.selection);
        var n = this.selectionPosX,
            r = this.selectionPosY,
            i = 0,
            s = 0,
            o = this.width,
            u = this.height;
        isNaN(e) || (n > e && (i = e, o = n - e), n < e && (i = n, o = e - n), n == e && (i = e, o = 0));
        isNaN(t) || (r > t && (s = t, u = r - t), r < t && (s = r, u = t - r), r == t && (s = t, u = 0));
        0 < o && 0 < u && (n = AmCharts.rect(this.container, o, u, this.cursorColor, this.selectionAlpha), n.translate(i + this.x, s + this.y), this.selection = n)
    },
    arrangeBalloons: function() {
        var e = this.valueBalloons,
            t = this.x,
            n = this.y,
            r = this.height + n;
        e.sort(this.compareY);
        var i;
        for (i = 0; i < e.length; i++) {
            var s = e[i].balloon;
            s.setBounds(t, n, t + this.width, r);
            s.draw();
            r = s.yPos - 3
        }
        this.arrangeBalloons2()
    },
    compareY: function(e, t) {
        return e.yy < t.yy ? 1 : -1
    },
    arrangeBalloons2: function() {
        var e = this.valueBalloons;
        e.reverse();
        var t, n = this.x,
            r, i;
        for (i = 0; i < e.length; i++) {
            var s = e[i].balloon;
            t = s.bottom;
            var o = s.bottom - s.yPos;
            0 < i && t - o < r + 3 && (s.setBounds(n, r + 3, n + this.width, r + o + 3), s.draw());
            s.set && s.set.show();
            r = s.bottom
        }
    },
    showBullets: function() {
        AmCharts.remove(this.allBullets);
        var e = this.container,
            t = e.set();
        this.set.push(t);
        this.set.show();
        this.allBullets = t;
        var t = this.chart.graphs,
            n;
        for (n = 0; n < t.length; n++) {
            var r = t[n];
            if (!r.hidden && r.balloonText) {
                var i = this.data[this.index].axes[r.valueAxis.id].graphs[r.id],
                    s = i.y;
                if (!isNaN(s)) {
                    var o, u;
                    o = i.x;
                    this.rotate ? (u = s, s = o) : u = o;
                    r = AmCharts.circle(e, this.bulletSize / 2, this.chart.getBalloonColor(r, i), r.cursorBulletAlpha);
                    r.translate(u, s);
                    this.allBullets.push(r)
                }
            }
        }
    },
    destroy: function() {
        this.clear();
        AmCharts.remove(this.selection);
        this.selection = null;
        var e = this.categoryBalloon;
        e && e.destroy();
        this.destroyValueBalloons();
        AmCharts.remove(this.set)
    },
    clear: function() {
        clearInterval(this.interval)
    },
    destroyValueBalloons: function() {
        var e = this.valueBalloons;
        if (e) {
            var t;
            for (t = 0; t < e.length; t++) e[t].balloon.hide()
        }
    },
    zoom: function(e, t, n, r) {
        var i = this.chart;
        this.destroyValueBalloons();
        this.zooming = !1;
        var s;
        this.rotate ? this.selectionPosY = s = i.mouseY : this.selectionPosX = s = i.mouseX;
        this.start = e;
        this.end = t;
        this.startTime = n;
        this.endTime = r;
        this.zoomed = !0;
        var o = i.categoryAxis,
            i = this.rotate;
        s = this.width;
        var u = this.height;
        o.parseDates && !o.equalSpacing ? (e = r - n + o.minDuration(), e = i ? u / e : s / e) : e = i ? u / (t - e) : s / (t - e);
        this.stepWidth = e;
        this.setPosition();
        this.hideCursor()
    },
    hideObj: function(e) {
        e && e.hide()
    },
    hideCursor: function(e) {
        void 0 === e && (e = !0);
        this.hideObj(this.set);
        this.hideObj(this.categoryBalloon);
        this.hideObj(this.line);
        this.hideObj(this.vLine);
        this.hideObj(this.hLine);
        this.hideObj(this.allBullets);
        this.destroyValueBalloons();
        this.selectWithoutZooming || AmCharts.remove(this.selection);
        this.previousIndex = NaN;
        e && this.fire("onHideCursor", {
            type: "onHideCursor",
            chart: this.chart,
            target: this
        });
        this.drawing || this.chart.setMouseCursor("auto")
    },
    setPosition: function(e, t) {
        void 0 === t && (t = !0);
        if ("cursor" == this.type) {
            if (AmCharts.ifArray(this.data)) {
                isNaN(e) && (e = this.getMousePosition());
                if ((e != this.previousMousePosition || !0 === this.zoomed || this.oneBalloonOnly) && !isNaN(e)) {
                    var n = this.chart.categoryAxis.xToIndex(e);
                    if (n != this.previousIndex || this.zoomed || "mouse" == this.cursorPosition || this.oneBalloonOnly) this.updateCursor(n, t), this.zoomed = !1
                }
                this.previousMousePosition = e
            }
        } else this.updateCrosshair()
    },
    updateCursor: function(e, t) {
        var n = this.chart,
            r = n.mouseX - this.x,
            i = n.mouseY - this.y;
        this.drawingNow && (AmCharts.remove(this.drawingLine), this.drawingLine = AmCharts.line(this.container, [this.x + this.drawStartX, this.x + r], [this.y + this.drawStartY, this.y + i], this.cursorColor, 1, 1));
        if (this.enabled) {
            void 0 === t && (t = !0);
            this.index = e;
            var s = n.categoryAxis,
                o = n.dx,
                u = n.dy,
                a = this.x,
                f = this.y,
                l = this.width,
                c = this.height,
                h = this.data[e];
            if (h) {
                var p = h.x[s.id],
                    d = n.rotate,
                    v = s.inside,
                    m = this.stepWidth,
                    g = this.categoryBalloon,
                    y = this.firstTime,
                    b = this.lastTime,
                    w = this.cursorPosition,
                    E = s.position,
                    S = this.zooming,
                    x = this.panning,
                    T = n.graphs,
                    N = s.axisThickness;
                if (n.mouseIsOver || S || x || this.forceShow)
                    if (this.forceShow = !1, x) {
                        var o = this.panClickPos,
                            n = this.panClickEndTime,
                            S = this.panClickStartTime,
                            C = this.panClickEnd,
                            a = this.panClickStart,
                            r = (d ? o - i : o - r) / m;
                        if (!s.parseDates || s.equalSpacing) r = Math.round(r);
                        0 !== r && (o = {
                            type: "zoomed",
                            target: this
                        }, o.chart = this.chart, s.parseDates && !s.equalSpacing ? (n + r > b && (r = b - n), S + r < y && (r = y - S), o.start = S + r, o.end = n + r, this.fire(o.type, o)) : C + r >= this.data.length || 0 > a + r || (o.start = a + r, o.end = C + r, this.fire(o.type, o)))
                    } else {
                        "start" == w && (p -= s.cellWidth / 2);
                        "mouse" == w && n.mouseIsOver && (p = d ? i - 2 : r - 2);
                        if (d) {
                            if (0 > p)
                                if (S) p = 0;
                                else {
                                    this.hideCursor();
                                    return
                                }
                            if (p > c + 1)
                                if (S) p = c + 1;
                                else {
                                    this.hideCursor();
                                    return
                                }
                        } else {
                            if (0 > p)
                                if (S) p = 0;
                                else {
                                    this.hideCursor();
                                    return
                                }
                            if (p > l)
                                if (S) p = l;
                                else {
                                    this.hideCursor();
                                    return
                                }
                        }
                        0 < this.cursorAlpha && (y = this.line, d ? y.translate(0, p + u) : y.translate(p, 0), y.show());
                        this.linePos = d ? p + u : p;
                        S && (d ? this.updateSelectionSize(NaN, p) : this.updateSelectionSize(p, NaN));
                        y = !0;
                        S && (y = !1);
                        this.categoryBalloonEnabled && y ? (d ? (v && ("right" == E ? g.setBounds(a, f + u, a + l + o, f + p + u) : g.setBounds(a, f + u, a + l + o, f + p)), "right" == E ? v ? g.setPosition(a + l + o, f + p + u) : g.setPosition(a + l + o + N, f + p + u) : v ? g.setPosition(a, f + p) : g.setPosition(a - N, f + p)) : "top" == E ? v ? g.setPosition(a + p + o, f + u) : g.setPosition(a + p + o, f + u - N + 1) : v ? g.setPosition(a + p, f + c) : g.setPosition(a + p, f + c + N - 1), s.parseDates ? (s = AmCharts.formatDate(h.category, this.categoryBalloonDateFormat), -1 != s.indexOf("fff") && (s = AmCharts.formatMilliseconds(s, h.category)), g.showBalloon(s)) : g.showBalloon(h.category)) : g.hide();
                        T && this.bulletsEnabled && this.showBullets();
                        this.destroyValueBalloons();
                        if (T && this.valueBalloonsEnabled && y && n.balloon.enabled) {
                            this.valueBalloons = y = [];
                            if (this.oneBalloonOnly) {
                                u = Infinity;
                                for (s = 0; s < T.length; s++) m = T[s], m.showBalloon && !m.hidden && m.balloonText && (g = h.axes[m.valueAxis.id].graphs[m.id], b = g.y, isNaN(b) || (d ? Math.abs(r - b) < u && (u = Math.abs(r - b), C = m) : Math.abs(i - b) < u && (u = Math.abs(i - b), C = m)));
                                this.mostCloseGraph && (C = this.mostCloseGraph)
                            }
                            for (s = 0; s < T.length; s++)
                                if (m = T[s], !(this.oneBalloonOnly && m != C) && m.showBalloon && !m.hidden && m.balloonText && (g = h.axes[m.valueAxis.id].graphs[m.id], b = g.y, !isNaN(b))) {
                                    p = g.x;
                                    v = !0;
                                    if (d) {
                                        if (u = b, 0 > p || p > c) v = !1
                                    } else if (u = p, p = b, 0 > u || u > l + o) v = !1;
                                    v && (v = m.valueBalloon, E = n.getBalloonColor(m, g), v.setBounds(a, f, a + l, f + c), v.pointerOrientation = "H", v.changeColor(E), void 0 !== m.balloonAlpha && (v.fillAlpha = m.balloonAlpha), void 0 !== m.balloonTextColor && (v.color = m.balloonTextColor), v.setPosition(u + a, p + f), m = n.formatString(m.balloonText, g, m), "" !== m && v.showBalloon(m), !d && v.set && v.set.hide(), y.push({
                                        yy: b,
                                        balloon: v
                                    }))
                                }
                            d || this.arrangeBalloons()
                        }
                        t ? (o = {
                            type: "changed"
                        }, o.index = e, o.target = this, o.chart = this.chart, o.zooming = S, o.mostCloseGraph = C, o.position = d ? i : r, o.target = this, n.fire("changed", o), this.fire("changed", o), this.skipZoomDispatch = !1) : (this.skipZoomDispatch = !0, n.updateLegendValues(e));
                        this.previousIndex = e
                    }
            }
        } else this.hideCursor()
    },
    enableDrawing: function(e) {
        this.enabled = !e;
        this.hideCursor();
        this.rolledOver = !1;
        this.drawing = e
    },
    isZooming: function(e) {
        e && e != this.zooming && this.handleMouseDown("fake");
        !e && e != this.zooming && this.handleMouseUp()
    },
    handleMouseOut: function() {
        if (this.enabled)
            if (this.zooming) this.setPosition();
            else {
                this.index = void 0;
                var e = {
                    type: "changed",
                    index: void 0,
                    target: this
                };
                e.chart = this.chart;
                this.fire("changed", e);
                this.hideCursor()
            }
    },
    handleReleaseOutside: function() {
        this.handleMouseUp()
    },
    handleMouseUp: function() {
        var e = this.chart,
            t = this.data,
            n;
        if (e) {
            var r = e.mouseX - this.x,
                i = e.mouseY - this.y;
            if (this.drawingNow) {
                this.drawingNow = !1;
                AmCharts.remove(this.drawingLine);
                n = this.drawStartX;
                var s = this.drawStartY;
                if (2 < Math.abs(n - r) || 2 < Math.abs(s - i)) n = {
                    type: "draw",
                    target: this,
                    chart: e,
                    initialX: n,
                    initialY: s,
                    finalX: r,
                    finalY: i
                }, this.fire(n.type, n)
            }
            if (this.enabled && 0 < t.length) {
                if (this.pan) this.rolledOver = !1;
                else if (this.zoomable && this.zooming) {
                    n = this.selectWithoutZooming ? {
                        type: "selected"
                    } : {
                        type: "zoomed"
                    };
                    n.target = this;
                    n.chart = e;
                    if ("cursor" == this.type) this.rotate ? this.selectionPosY = i : this.selectionPosX = i = r, 2 > Math.abs(i - this.initialMouse) && this.fromIndex == this.index || (this.index < this.fromIndex ? (n.end = this.fromIndex, n.start = this.index) : (n.end = this.index, n.start = this.fromIndex), i = e.categoryAxis, i.parseDates && !i.equalSpacing && (n.start = t[n.start].time, n.end = e.getEndTime(t[n.end].time)), this.skipZoomDispatch || this.fire(n.type, n));
                    else {
                        var o = this.initialMouseX,
                            u = this.initialMouseY;
                        3 > Math.abs(r - o) && 3 > Math.abs(i - u) || (t = Math.min(o, r), s = Math.min(u, i), r = Math.abs(o - r), i = Math.abs(u - i), e.hideXScrollbar && (t = 0, r = this.width), e.hideYScrollbar && (s = 0, i = this.height), n.selectionHeight = i, n.selectionWidth = r, n.selectionY = s, n.selectionX = t, this.skipZoomDispatch || this.fire(n.type, n))
                    }
                    this.selectWithoutZooming || AmCharts.remove(this.selection)
                }
                this.panning = this.zooming = this.skipZoomDispatch = !1
            }
        }
    },
    showCursorAt: function(e) {
        var t = this.chart.categoryAxis;
        e = t.parseDates ? t.dateToCoordinate(e) : t.categoryToCoordinate(e);
        this.previousMousePosition = NaN;
        this.forceShow = !0;
        this.setPosition(e, !1)
    },
    handleMouseDown: function(e) {
        if (this.zoomable || this.pan || this.drawing) {
            var t = this.rotate,
                n = this.chart,
                r = n.mouseX - this.x,
                i = n.mouseY - this.y;
            if (0 < r && r < this.width && 0 < i && i < this.height || "fake" == e) this.setPosition(), this.selectWithoutZooming && AmCharts.remove(this.selection), this.drawing ? (this.drawStartY = i, this.drawStartX = r, this.drawingNow = !0) : this.pan ? (this.zoomable = !1, n.setMouseCursor("move"), this.panning = !0, this.panClickPos = t ? i : r, this.panClickStart = this.start, this.panClickEnd = this.end, this.panClickStartTime = this.startTime, this.panClickEndTime = this.endTime) : this.zoomable && ("cursor" == this.type ? (this.fromIndex = this.index, t ? (this.initialMouse = i, this.selectionPosY = this.linePos) : (this.initialMouse = r, this.selectionPosX = this.linePos)) : (this.initialMouseX = r, this.initialMouseY = i, this.selectionPosX = r, this.selectionPosY = i), this.zooming = !0)
        }
    }
});
AmCharts.SimpleChartScrollbar = AmCharts.Class({
    construct: function() {
        this.createEvents("zoomed");
        this.backgroundColor = "#D4D4D4";
        this.backgroundAlpha = 1;
        this.selectedBackgroundColor = "#EFEFEF";
        this.scrollDuration = this.selectedBackgroundAlpha = 1;
        this.resizeEnabled = !0;
        this.hideResizeGrips = !1;
        this.scrollbarHeight = 20;
        this.updateOnReleaseOnly = !1;
        9 > document.documentMode && (this.updateOnReleaseOnly = !0);
        this.dragIconWidth = 11;
        this.dragIconHeight = 18
    },
    draw: function() {
        var e = this;
        e.destroy();
        e.interval = setInterval(function() {
            e.updateScrollbar.call(e)
        }, 40);
        var t = e.chart.container,
            n = e.rotate,
            r = e.chart,
            i = t.set();
        e.set = i;
        r.scrollbarsSet.push(i);
        var s, o;
        n ? (s = e.scrollbarHeight, o = r.plotAreaHeight) : (o = e.scrollbarHeight, s = r.plotAreaWidth);
        e.width = s;
        if ((e.height = o) && s) {
            var u = AmCharts.rect(t, s, o, e.backgroundColor, e.backgroundAlpha);
            e.bg = u;
            i.push(u);
            u = AmCharts.rect(t, s, o, "#000", .005);
            i.push(u);
            e.invisibleBg = u;
            u.click(function() {
                e.handleBgClick()
            }).mouseover(function() {
                e.handleMouseOver()
            }).mouseout(function() {
                e.handleMouseOut()
            }).touchend(function() {
                e.handleBgClick()
            });
            u = AmCharts.rect(t, s, o, e.selectedBackgroundColor, e.selectedBackgroundAlpha);
            e.selectedBG = u;
            i.push(u);
            s = AmCharts.rect(t, s, o, "#000", .005);
            e.dragger = s;
            i.push(s);
            s.mousedown(function(t) {
                e.handleDragStart(t)
            }).mouseup(function() {
                e.handleDragStop()
            }).mouseover(function() {
                e.handleDraggerOver()
            }).mouseout(function() {
                e.handleMouseOut()
            }).touchstart(function(t) {
                e.handleDragStart(t)
            }).touchend(function() {
                e.handleDragStop()
            });
            s = r.pathToImages;
            n ? (u = s + "dragIconH.gif", s = e.dragIconWidth, n = e.dragIconHeight) : (u = s + "dragIcon.gif", n = e.dragIconWidth, s = e.dragIconHeight);
            o = t.image(u, 0, 0, n, s);
            var u = t.image(u, 0, 0, n, s),
                a = 10,
                f = 20;
            r.panEventsEnabled && (a = 25, f = e.scrollbarHeight);
            var l = AmCharts.rect(t, a, f, "#000", .005),
                c = AmCharts.rect(t, a, f, "#000", .005);
            c.translate(-(a - n) / 2, -(f - s) / 2);
            l.translate(-(a - n) / 2, -(f - s) / 2);
            n = t.set([o, c]);
            t = t.set([u, l]);
            e.iconLeft = n;
            i.push(e.iconLeft);
            e.iconRight = t;
            i.push(t);
            n.mousedown(function() {
                e.leftDragStart()
            }).mouseup(function() {
                e.leftDragStop()
            }).mouseover(function() {
                e.iconRollOver()
            }).mouseout(function() {
                e.iconRollOut()
            }).touchstart(function() {
                e.leftDragStart()
            }).touchend(function() {
                e.leftDragStop()
            });
            t.mousedown(function() {
                e.rightDragStart()
            }).mouseup(function() {
                e.rightDragStop()
            }).mouseover(function() {
                e.iconRollOver()
            }).mouseout(function() {
                e.iconRollOut()
            }).touchstart(function() {
                e.rightDragStart()
            }).touchend(function() {
                e.rightDragStop()
            });
            AmCharts.ifArray(r.chartData) ? i.show() : i.hide();
            e.hideDragIcons()
        }
        i.translate(e.x, e.y);
        e.clipDragger(!1)
    },
    updateScrollbarSize: function(e, t) {
        var n = this.dragger,
            r, i, s, o;
        this.rotate ? (r = 0, i = e, s = this.width + 1, o = t - e, n.setAttr("height", t - e), n.setAttr("y", i)) : (r = e, i = 0, s = t - e, o = this.height + 1, n.setAttr("width", t - e), n.setAttr("x", r));
        this.clipAndUpdate(r, i, s, o)
    },
    updateScrollbar: function() {
        var e, t = !1,
            n, r, i = this.x,
            s = this.y,
            o = this.dragger,
            u = this.getDBox();
        n = u.x + i;
        r = u.y + s;
        var a = u.width,
            u = u.height,
            f = this.rotate,
            l = this.chart,
            c = this.width,
            h = this.height,
            p = l.mouseX,
            d = l.mouseY;
        e = this.initialMouse;
        l.mouseIsOver && (this.dragging && (l = this.initialCoord, f ? (e = l + (d - e), 0 > e && (e = 0), l = h - u, e > l && (e = l), o.setAttr("y", e)) : (e = l + (p - e), 0 > e && (e = 0), l = c - a, e > l && (e = l), o.setAttr("x", e))), this.resizingRight && (f ? (e = d - r, e + r > h + s && (e = h - r + s), 0 > e ? (this.resizingRight = !1, t = this.resizingLeft = !0) : (0 === e && (e = .1), o.setAttr("height", e))) : (e = p - n, e + n > c + i && (e = c - n + i), 0 > e ? (this.resizingRight = !1, t = this.resizingLeft = !0) : (0 === e && (e = .1), o.setAttr("width", e)))), this.resizingLeft && (f ? (n = r, r = d, r < s && (r = s), r > h + s && (r = h + s), e = !0 === t ? n - r : u + n - r, 0 > e ? (this.resizingRight = !0, this.resizingLeft = !1, o.setAttr("y", n + u - s)) : (0 === e && (e = .1), o.setAttr("y", r - s), o.setAttr("height", e))) : (r = p, r < i && (r = i), r > c + i && (r = c + i), e = !0 === t ? n - r : a + n - r, 0 > e ? (this.resizingRight = !0, this.resizingLeft = !1, o.setAttr("x", n + a - i)) : (0 === e && (e = .1), o.setAttr("x", r - i), o.setAttr("width", e)))), this.clipDragger(!0))
    },
    clipDragger: function(e) {
        var t = this.getDBox(),
            n = t.x,
            r = t.y,
            i = t.width,
            t = t.height,
            s = !1;
        if (this.rotate) {
            if (n = 0, i = this.width + 1, this.clipY != r || this.clipH != t) s = !0
        } else if (r = 0, t = this.height + 1, this.clipX != n || this.clipW != i) s = !0;
        s && (this.clipAndUpdate(n, r, i, t), e && (this.updateOnReleaseOnly || this.dispatchScrollbarEvent()))
    },
    maskGraphs: function() {},
    clipAndUpdate: function(e, t, n, r) {
        this.clipX = e;
        this.clipY = t;
        this.clipW = n;
        this.clipH = r;
        this.selectedBG.clipRect(e, t, n, r);
        this.updateDragIconPositions();
        this.maskGraphs(e, t, n, r)
    },
    dispatchScrollbarEvent: function() {
        if (this.skipEvent) this.skipEvent = !1;
        else {
            var e = this.chart;
            e.hideBalloon();
            var t = this.getDBox(),
                n = t.x,
                r = t.y,
                i = t.width,
                t = t.height;
            this.rotate ? (n = r, i = this.height / t) : i = this.width / i;
            e = {
                type: "zoomed",
                position: n,
                chart: e,
                target: this,
                multiplier: i
            };
            this.fire(e.type, e)
        }
    },
    updateDragIconPositions: function() {
        var e = this.getDBox(),
            t = e.x,
            n = e.y,
            r = this.iconLeft,
            i = this.iconRight,
            s, o, u = this.scrollbarHeight;
        this.rotate ? (s = this.dragIconWidth, o = this.dragIconHeight, r.translate((u - o) / 2, n - s / 2), i.translate((u - o) / 2, n + e.height - s / 2)) : (s = this.dragIconHeight, o = this.dragIconWidth, r.translate(t - o / 2, (u - s) / 2), i.translate(t + -o / 2 + e.width, (u - s) / 2))
    },
    showDragIcons: function() {
        this.resizeEnabled && (this.iconLeft.show(), this.iconRight.show())
    },
    hideDragIcons: function() {
        !this.resizingLeft && !this.resizingRight && !this.dragging && (this.hideResizeGrips && (this.iconLeft.hide(), this.iconRight.hide()), this.removeCursors())
    },
    removeCursors: function() {
        this.chart.setMouseCursor("auto")
    },
    relativeZoom: function(e, t) {
        this.dragger.stop();
        this.multiplier = e;
        this.position = t;
        this.updateScrollbarSize(t, this.rotate ? t + this.height / e : t + this.width / e)
    },
    destroy: function() {
        this.clear();
        AmCharts.remove(this.set)
    },
    clear: function() {
        clearInterval(this.interval)
    },
    handleDragStart: function() {
        var e = this.chart;
        this.dragger.stop();
        this.removeCursors();
        this.dragging = !0;
        var t = this.getDBox();
        this.rotate ? (this.initialCoord = t.y, this.initialMouse = e.mouseY) : (this.initialCoord = t.x, this.initialMouse = e.mouseX)
    },
    handleDragStop: function() {
        this.updateOnReleaseOnly && (this.updateScrollbar(), this.skipEvent = !1, this.dispatchScrollbarEvent());
        this.dragging = !1;
        this.mouseIsOver && this.removeCursors();
        this.updateScrollbar()
    },
    handleDraggerOver: function() {
        this.handleMouseOver()
    },
    leftDragStart: function() {
        this.dragger.stop();
        this.resizingLeft = !0
    },
    leftDragStop: function() {
        this.resizingLeft = !1;
        this.mouseIsOver || this.removeCursors();
        this.updateOnRelease()
    },
    rightDragStart: function() {
        this.dragger.stop();
        this.resizingRight = !0
    },
    rightDragStop: function() {
        this.resizingRight = !1;
        this.mouseIsOver || this.removeCursors();
        this.updateOnRelease()
    },
    iconRollOut: function() {
        this.removeCursors()
    },
    iconRollOver: function() {
        this.rotate ? this.chart.setMouseCursor("n-resize") : this.chart.setMouseCursor("e-resize");
        this.handleMouseOver()
    },
    getDBox: function() {
        return this.dragger.getBBox()
    },
    handleBgClick: function() {
        if (!this.resizingRight && !this.resizingLeft) {
            this.zooming = !0;
            var e, t, n = this.scrollDuration,
                r = this.dragger;
            e = this.getDBox();
            var i = e.height,
                s = e.width;
            t = this.chart;
            var o = this.y,
                u = this.x,
                a = this.rotate;
            a ? (e = "y", t = t.mouseY - i / 2 - o, t = AmCharts.fitToBounds(t, 0, this.height - i)) : (e = "x", t = t.mouseX - s / 2 - u, t = AmCharts.fitToBounds(t, 0, this.width - s));
            this.updateOnReleaseOnly ? (this.skipEvent = !1, r.setAttr(e, t), this.dispatchScrollbarEvent(), this.clipDragger()) : (t = Math.round(t), a ? r.animate({
                y: t
            }, n, ">") : r.animate({
                x: t
            }, n, ">"))
        }
    },
    updateOnRelease: function() {
        this.updateOnReleaseOnly && (this.updateScrollbar(), this.skipEvent = !1, this.dispatchScrollbarEvent())
    },
    handleReleaseOutside: function() {
        if (this.set) {
            if (this.resizingLeft || this.resizingRight || this.dragging) this.updateOnRelease(), this.removeCursors();
            this.mouseIsOver = this.dragging = this.resizingRight = this.resizingLeft = !1;
            this.hideDragIcons();
            this.updateScrollbar()
        }
    },
    handleMouseOver: function() {
        this.mouseIsOver = !0;
        this.showDragIcons()
    },
    handleMouseOut: function() {
        this.mouseIsOver = !1;
        this.hideDragIcons()
    }
});
AmCharts.ChartScrollbar = AmCharts.Class({
    inherits: AmCharts.SimpleChartScrollbar,
    construct: function() {
        AmCharts.ChartScrollbar.base.construct.call(this);
        this.graphLineColor = "#BBBBBB";
        this.graphLineAlpha = 0;
        this.graphFillColor = "#BBBBBB";
        this.graphFillAlpha = 1;
        this.selectedGraphLineColor = "#888888";
        this.selectedGraphLineAlpha = 0;
        this.selectedGraphFillColor = "#888888";
        this.selectedGraphFillAlpha = 1;
        this.gridCount = 0;
        this.gridColor = "#FFFFFF";
        this.gridAlpha = .7;
        this.skipEvent = this.autoGridCount = !1;
        this.color = "#FFFFFF";
        this.scrollbarCreated = !1
    },
    init: function() {
        var e = this.categoryAxis,
            t = this.chart;
        e || (this.categoryAxis = e = new AmCharts.CategoryAxis);
        e.chart = t;
        e.id = "scrollbar";
        e.dateFormats = t.categoryAxis.dateFormats;
        e.boldPeriodBeginning = t.categoryAxis.boldPeriodBeginning;
        e.axisItemRenderer = AmCharts.RecItem;
        e.axisRenderer = AmCharts.RecAxis;
        e.guideFillRenderer = AmCharts.RecFill;
        e.inside = !0;
        e.fontSize = this.fontSize;
        e.tickLength = 0;
        e.axisAlpha = 0;
        this.graph && (e = this.valueAxis, e || (this.valueAxis = e = new AmCharts.ValueAxis, e.visible = !1, e.scrollbar = !0, e.axisItemRenderer = AmCharts.RecItem, e.axisRenderer = AmCharts.RecAxis, e.guideFillRenderer = AmCharts.RecFill, e.labelsEnabled = !1, e.chart = t), t = this.unselectedGraph, t || (t = new AmCharts.AmGraph, t.scrollbar = !0, this.unselectedGraph = t, t.negativeBase = this.graph.negativeBase), t = this.selectedGraph, t || (t = new AmCharts.AmGraph, t.scrollbar = !0, this.selectedGraph = t, t.negativeBase = this.graph.negativeBase));
        this.scrollbarCreated = !0
    },
    draw: function() {
        var e = this;
        AmCharts.ChartScrollbar.base.draw.call(e);
        e.scrollbarCreated || e.init();
        var t = e.chart,
            n = t.chartData,
            r = e.categoryAxis,
            i = e.rotate,
            s = e.x,
            o = e.y,
            u = e.width,
            a = e.height,
            f = t.categoryAxis,
            l = e.set;
        r.setOrientation(!i);
        r.parseDates = f.parseDates;
        r.rotate = i;
        r.equalSpacing = f.equalSpacing;
        r.minPeriod = f.minPeriod;
        r.startOnAxis = f.startOnAxis;
        r.viW = u;
        r.viH = a;
        r.width = u;
        r.height = a;
        r.gridCount = e.gridCount;
        r.gridColor = e.gridColor;
        r.gridAlpha = e.gridAlpha;
        r.color = e.color;
        r.autoGridCount = e.autoGridCount;
        r.parseDates && !r.equalSpacing && r.timeZoom(t.firstTime, t.lastTime);
        r.zoom(0, n.length - 1);
        if (f = e.graph) {
            var c = e.valueAxis,
                h = f.valueAxis;
            c.id = h.id;
            c.rotate = i;
            c.setOrientation(i);
            c.width = u;
            c.height = a;
            c.viW = u;
            c.viH = a;
            c.dataProvider = n;
            c.reversed = h.reversed;
            c.logarithmic = h.logarithmic;
            c.gridAlpha = 0;
            c.axisAlpha = 0;
            l.push(c.set);
            i ? c.y = o : c.x = s;
            var s = Infinity,
                o = -Infinity,
                p;
            for (p = 0; p < n.length; p++) {
                var d = n[p].axes[h.id].graphs[f.id].values,
                    v;
                for (v in d)
                    if (d.hasOwnProperty(v) && "percents" != v && "total" != v) {
                        var m = d[v];
                        m < s && (s = m);
                        m > o && (o = m)
                    }
            }
            Infinity != s && (c.minimum = s); - Infinity != o && (c.maximum = o + .1 * (o - s));
            s == o && (c.minimum -= 1, c.maximum += 1);
            void 0 != e.minimum && (c.minimum = e.minimum);
            void 0 != e.maximum && (c.maximum = e.maximum);
            c.zoom(0, n.length - 1);
            v = e.unselectedGraph;
            v.id = f.id;
            v.rotate = i;
            v.chart = t;
            v.chartType = t.chartType;
            v.data = n;
            v.valueAxis = c;
            v.chart = f.chart;
            v.categoryAxis = e.categoryAxis;
            v.valueField = f.valueField;
            v.openField = f.openField;
            v.closeField = f.closeField;
            v.highField = f.highField;
            v.lowField = f.lowField;
            v.lineAlpha = e.graphLineAlpha;
            v.lineColor = e.graphLineColor;
            v.fillAlphas = e.graphFillAlpha;
            v.fillColors = e.graphFillColor;
            v.connect = f.connect;
            v.hidden = f.hidden;
            v.width = u;
            v.height = a;
            h = e.selectedGraph;
            h.id = f.id;
            h.rotate = i;
            h.chart = t;
            h.chartType = t.chartType;
            h.data = n;
            h.valueAxis = c;
            h.chart = f.chart;
            h.categoryAxis = r;
            h.valueField = f.valueField;
            h.openField = f.openField;
            h.closeField = f.closeField;
            h.highField = f.highField;
            h.lowField = f.lowField;
            h.lineAlpha = e.selectedGraphLineAlpha;
            h.lineColor = e.selectedGraphLineColor;
            h.fillAlphas = e.selectedGraphFillAlpha;
            h.fillColors = e.selectedGraphFillColor;
            h.connect = f.connect;
            h.hidden = f.hidden;
            h.width = u;
            h.height = a;
            t = e.graphType;
            t || (t = f.type);
            v.type = t;
            h.type = t;
            n = n.length - 1;
            v.zoom(0, n);
            h.zoom(0, n);
            h.set.click(function() {
                e.handleBackgroundClick()
            }).mouseover(function() {
                e.handleMouseOver()
            }).mouseout(function() {
                e.handleMouseOut()
            });
            v.set.click(function() {
                e.handleBackgroundClick()
            }).mouseover(function() {
                e.handleMouseOver()
            }).mouseout(function() {
                e.handleMouseOut()
            });
            l.push(v.set);
            l.push(h.set)
        }
        l.push(r.set);
        l.push(r.labelsSet);
        e.bg.toBack();
        e.invisibleBg.toFront();
        e.dragger.toFront();
        e.iconLeft.toFront();
        e.iconRight.toFront()
    },
    timeZoom: function(e, t) {
        this.startTime = e;
        this.endTime = t;
        this.timeDifference = t - e;
        this.skipEvent = !0;
        this.zoomScrollbar()
    },
    zoom: function(e, t) {
        this.start = e;
        this.end = t;
        this.skipEvent = !0;
        this.zoomScrollbar()
    },
    dispatchScrollbarEvent: function() {
        if (this.skipEvent) this.skipEvent = !1;
        else {
            var e = this.chart.chartData,
                t, n, r = this.dragger.getBBox();
            t = r.x;
            n = r.y;
            var i = r.width,
                s = r.height,
                r = this.chart;
            this.rotate ? (t = n, n = s) : n = i;
            i = {
                type: "zoomed",
                target: this
            };
            i.chart = r;
            var s = this.categoryAxis,
                o = this.stepWidth;
            if (s.parseDates && !s.equalSpacing) {
                if (e = r.firstTime, s.minDuration(), r = Math.round(t / o) + e, e = this.dragging ? r + this.timeDifference : Math.round((t + n) / o) + e, r > e && (r = e), r != this.startTime || e != this.endTime) this.startTime = r, this.endTime = e, i.start = r, i.end = e, i.startDate = new Date(r), i.endDate = new Date(e), this.fire(i.type, i)
            } else if (s.startOnAxis || (t += o / 2), n -= this.stepWidth / 2, r = s.xToIndex(t), t = s.xToIndex(t + n), r != this.start || this.end != t) s.startOnAxis && (this.resizingRight && r == t && t++, this.resizingLeft && r == t && (0 < r ? r-- : t = 1)), this.start = r, this.end = this.dragging ? this.start + this.difference : t, i.start = this.start, i.end = this.end, s.parseDates && (e[this.start] && (i.startDate = new Date(e[this.start].time)), e[this.end] && (i.endDate = new Date(e[this.end].time))), this.fire(i.type, i)
        }
    },
    zoomScrollbar: function() {
        var e, t;
        e = this.chart;
        var n = e.chartData,
            r = this.categoryAxis;
        r.parseDates && !r.equalSpacing ? (n = r.stepWidth, r = e.firstTime, e = n * (this.startTime - r), t = n * (this.endTime - r)) : (e = n[this.start].x[r.id], t = n[this.end].x[r.id], n = r.stepWidth, r.startOnAxis || (r = n / 2, e -= r, t += r));
        this.stepWidth = n;
        this.updateScrollbarSize(e, t)
    },
    maskGraphs: function(e, t, n, r) {
        var i = this.selectedGraph;
        i && i.set.clipRect(e, t, n, r)
    },
    handleDragStart: function() {
        AmCharts.ChartScrollbar.base.handleDragStart.call(this);
        this.difference = this.end - this.start;
        this.timeDifference = this.endTime - this.startTime;
        0 > this.timeDifference && (this.timeDifference = 0)
    },
    handleBackgroundClick: function() {
        AmCharts.ChartScrollbar.base.handleBackgroundClick.call(this);
        this.dragging || (this.difference = this.end - this.start, this.timeDifference = this.endTime - this.startTime, 0 > this.timeDifference && (this.timeDifference = 0))
    }
});
AmCharts.circle = function(e, t, n, r, i, s, o, u) {
    if (void 0 == i || 0 === i) i = 1;
    void 0 === s && (s = "#000000");
    void 0 === o && (o = 0);
    r = {
        fill: n,
        stroke: s,
        "fill-opacity": r,
        "stroke-width": i,
        "stroke-opacity": o
    };
    e = e.circle(0, 0, t).attr(r);
    u && e.gradient("radialGradient", [n, AmCharts.adjustLuminosity(n, -.6)]);
    return e
};
AmCharts.text = function(e, t, n, r, i, s, o, u) {
    s || (s = "middle");
    "right" == s && (s = "end");
    AmCharts.isIE && 9 > AmCharts.IEversion && (t = t.replace("&", "&"), t = t.replace("&", "&"));
    n = {
        fill: n,
        "font-family": r,
        "font-size": i,
        opacity: u
    };
    !0 === o && (n["font-weight"] = "bold");
    n["text-anchor"] = s;
    return e.text(t, n)
};
AmCharts.polygon = function(e, t, n, r, i, s, o, u, a) {
    isNaN(s) && (s = 0);
    isNaN(u) && (u = i);
    var f = r,
        l = !1;
    "object" == typeof f && 1 < f.length && (l = !0, f = f[0]);
    void 0 === o && (o = f);
    i = {
        fill: f,
        stroke: o,
        "fill-opacity": i,
        "stroke-width": s,
        "stroke-opacity": u
    };
    s = AmCharts.dx;
    o = AmCharts.dy;
    u = Math.round;
    var f = "M" + (u(t[0]) + s) + "," + (u(n[0]) + o),
        c;
    for (c = 1; c < t.length; c++) f += " L" + (u(t[c]) + s) + "," + (u(n[c]) + o);
    e = e.path(f + " Z").attr(i);
    l && e.gradient("linearGradient", r, a);
    return e
};
AmCharts.rect = function(e, t, n, r, i, s, o, u, a, f) {
    isNaN(s) && (s = 0);
    void 0 === a && (a = 0);
    void 0 === f && (f = 270);
    isNaN(i) && (i = 0);
    var l = r,
        c = !1;
    "object" == typeof l && (l = l[0], c = !0);
    void 0 === o && (o = l);
    void 0 === u && (u = i);
    t = Math.round(t);
    n = Math.round(n);
    var h = 0,
        p = 0;
    0 > t && (t = Math.abs(t), h = -t);
    0 > n && (n = Math.abs(n), p = -n);
    h += AmCharts.dx;
    p += AmCharts.dy;
    i = {
        fill: l,
        stroke: o,
        "fill-opacity": i,
        "stroke-opacity": u
    };
    e = e.rect(h, p, t, n, a, s).attr(i);
    c && e.gradient("linearGradient", r, f);
    return e
};
AmCharts.triangle = function(e, t, n, r, i, s, o, u) {
    if (void 0 === s || 0 === s) s = 1;
    void 0 === o && (o = "#000");
    void 0 === u && (u = 0);
    r = {
        fill: r,
        stroke: o,
        "fill-opacity": i,
        "stroke-width": s,
        "stroke-opacity": u
    };
    t /= 2;
    var a;
    0 === n && (a = " M" + -t + "," + t + " L0," + -t + " L" + t + "," + t + " Z");
    180 == n && (a = " M" + -t + "," + -t + " L0," + t + " L" + t + "," + -t + " Z");
    90 == n && (a = " M" + -t + "," + -t + " L" + t + ",0 L" + -t + "," + t + " Z");
    270 == n && (a = " M" + -t + ",0 L" + t + "," + t + " L" + t + "," + -t + " Z");
    return e.path(a).attr(r)
};
AmCharts.line = function(e, t, n, r, i, s, o, u, a, f) {
    s = {
        fill: "none",
        "stroke-width": s
    };
    void 0 !== o && 0 < o && (s["stroke-dasharray"] = o);
    isNaN(i) || (s["stroke-opacity"] = i);
    r && (s.stroke = r);
    r = Math.round;
    f && (r = AmCharts.doNothing);
    f = AmCharts.dx;
    i = AmCharts.dy;
    o = "M" + (r(t[0]) + f) + "," + (r(n[0]) + i);
    for (u = 1; u < t.length; u++) o += " L" + (r(t[u]) + f) + "," + (r(n[u]) + i);
    if (AmCharts.VML) return e.path(o, void 0, !0).attr(s);
    a && (o += " M0,0 L0,0");
    return e.path(o).attr(s)
};
AmCharts.doNothing = function(e) {
    return e
};
AmCharts.wedge = function(e, t, n, r, i, s, o, u, a, f, l) {
    var c = Math.round;
    s = c(s);
    o = c(o);
    u = c(u);
    var h = c(o / s * u),
        p = AmCharts.VML,
        d = -359.5 - s / 100; - 359.94 > d && (d = -359.94);
    i <= d && (i = d);
    var v = 1 / 180 * Math.PI,
        d = t + Math.cos(r * v) * u,
        m = n + Math.sin(-r * v) * h,
        g = t + Math.cos(r * v) * s,
        y = n + Math.sin(-r * v) * o,
        b = t + Math.cos((r + i) * v) * s,
        w = n + Math.sin((-r - i) * v) * o,
        E = t + Math.cos((r + i) * v) * u,
        v = n + Math.sin((-r - i) * v) * h,
        S = {
            fill: AmCharts.adjustLuminosity(f.fill, -.2),
            "stroke-opacity": 0
        },
        x = 0;
    180 < Math.abs(i) && (x = 1);
    r = e.set();
    var T;
    p && (d = c(10 * d), g = c(10 * g), b = c(10 * b), E = c(10 * E), m = c(10 * m), y = c(10 * y), w = c(10 * w), v = c(10 * v), t = c(10 * t), a = c(10 * a), n = c(10 * n), s *= 10, o *= 10, u *= 10, h *= 10, 1 > Math.abs(i) && 1 >= Math.abs(b - g) && 1 >= Math.abs(w - y) && (T = !0));
    i = "";
    if (0 < a) {
        p ? (path = " M" + d + "," + (m + a) + " L" + g + "," + (y + a), T || (path += " A" + (t - s) + "," + (a + n - o) + "," + (t + s) + "," + (a + n + o) + "," + g + "," + (y + a) + "," + b + "," + (w + a)), path += " L" + E + "," + (v + a), 0 < u && (T || (path += " B" + (t - u) + "," + (a + n - h) + "," + (t + u) + "," + (a + n + h) + "," + E + "," + (a + v) + "," + d + "," + (a + m)))) : (path = " M" + d + "," + (m + a) + " L" + g + "," + (y + a), path += " A" + s + "," + o + ",0," + x + ",1," + b + "," + (w + a) + " L" + E + "," + (v + a), 0 < u && (path += " A" + u + "," + h + ",0," + x + ",0," + d + "," + (m + a)));
        path += " Z";
        var N = e.path(path, void 0, void 0, "1000,1000").attr(S);
        r.push(N);
        N = e.path(" M" + d + "," + m + " L" + d + "," + (m + a) + " L" + g + "," + (y + a) + " L" + g + "," + y + " L" + d + "," + m + " Z", void 0, void 0, "1000,1000").attr(S);
        a = e.path(" M" + b + "," + w + " L" + b + "," + (w + a) + " L" + E + "," + (v + a) + " L" + E + "," + v + " L" + b + "," + w + " Z", void 0, void 0, "1000,1000").attr(S);
        r.push(N);
        r.push(a)
    }
    p ? (T || (i = " A" + c(t - s) + "," + c(n - o) + "," + c(t + s) + "," + c(n + o) + "," + c(g) + "," + c(y) + "," + c(b) + "," + c(w)), s = " M" + c(d) + "," + c(m) + " L" + c(g) + "," + c(y) + i + " L" + c(E) + "," + c(v)) : s = " M" + d + "," + m + " L" + g + "," + y + (" A" + s + "," + o + ",0," + x + ",1," + b + "," + w) + " L" + E + "," + v;
    0 < u && (p ? T || (s += " B" + (t - u) + "," + (n - h) + "," + (t + u) + "," + (n + h) + "," + E + "," + v + "," + d + "," + m) : s += " A" + u + "," + h + ",0," + x + ",0," + d + "," + m);
    e = e.path(s + " Z", void 0, void 0, "1000,1000").attr(f);
    if (l) {
        t = [];
        for (n = 0; n < l.length; n++) t.push(AmCharts.adjustLuminosity(f.fill, l[n]));
        0 < t.length && e.gradient("linearGradient", t)
    }
    r.push(e);
    return r
};
AmCharts.adjustLuminosity = function(e, t) {
    e = String(e).replace(/[^0-9a-f]/gi, "");
    6 > e.length && (e = String(e[0]) + String(e[0]) + String(e[1]) + String(e[1]) + String(e[2]) + String(e[2]));
    t = t || 0;
    var n = "#",
        r, i;
    for (i = 0; 3 > i; i++) r = parseInt(e.substr(2 * i, 2), 16), r = Math.round(Math.min(Math.max(0, r + r * t), 255)).toString(16), n += ("00" + r).substr(r.length);
    return n
};
AmCharts.AmPieChart = AmCharts.Class({
    inherits: AmCharts.AmChart,
    construct: function() {
        this.createEvents("rollOverSlice", "rollOutSlice", "clickSlice", "pullOutSlice", "pullInSlice", "rightClickSlice");
        AmCharts.AmPieChart.base.construct.call(this);
        this.colors = "#75549B #9EC44D #C83E3B #3D79C1 #EECC60 #FFA10B #C1DFF7 #1EA4A5 #B18904 #DF0101 #F7FE2E #A80000 #009933 #FF6600 #FF9E01 #FCD202 #F8FF01".split(" ");
        this.pieAlpha = 1;
        this.pieBrightnessStep = 30;
        this.groupPercent = 0;
        this.groupedTitle = "Other";
        this.groupedPulled = !1;
        this.groupedAlpha = 1;
        this.marginLeft = 0;
        this.marginBottom = this.marginTop = 10;
        this.marginRight = 0;
        this.minRadius = 10;
        this.hoverAlpha = 1;
        this.depth3D = 0;
        this.startAngle = 90;
        this.angle = this.innerRadius = 0;
        this.outlineColor = "#FFFFFF";
        this.outlineAlpha = 0;
        this.outlineThickness = 1;
        this.startRadius = "500%";
        this.startDuration = this.startAlpha = 1;
        this.startEffect = "bounce";
        this.sequencedAnimation = !1;
        this.pullOutRadius = "20%";
        this.pullOutDuration = 1;
        this.pullOutEffect = "bounce";
        this.pullOnHover = this.pullOutOnlyOne = !1;
        this.labelsEnabled = !0;
        this.labelRadius = 30;
        this.labelTickColor = "#000000";
        this.labelTickAlpha = .2;
        this.labelText = "[[title]]: [[percents]]%";
        this.hideLabelsPercent = 0;
        this.balloonText = "[[title]]: [[percents]]% ([[value]])\n[[description]]";
        this.urlTarget = "_self";
        this.previousScale = 1;
        this.autoMarginOffset = 10;
        this.gradientRatio = []
    },
    initChart: function() {
        AmCharts.AmPieChart.base.initChart.call(this);
        this.dataChanged && (this.parseData(), this.dispatchDataUpdated = !0, this.dataChanged = !1, this.legend && this.legend.setData(this.chartData));
        this.drawChart()
    },
    handleLegendEvent: function(e) {
        var t = e.type;
        if (e = e.dataItem) {
            var n = e.hidden;
            switch (t) {
                case "clickMarker":
                    n || this.clickSlice(e);
                    break;
                case "clickLabel":
                    n || this.clickSlice(e);
                    break;
                case "rollOverItem":
                    n || this.rollOverSlice(e, !1);
                    break;
                case "rollOutItem":
                    n || this.rollOutSlice(e);
                    break;
                case "hideItem":
                    this.hideSlice(e);
                    break;
                case "showItem":
                    this.showSlice(e)
            }
        }
    },
    invalidateVisibility: function() {
        this.recalculatePercents();
        this.initChart();
        var e = this.legend;
        e && e.invalidateSize()
    },
    drawChart: function() {
        var e = this;
        AmCharts.AmPieChart.base.drawChart.call(e);
        var t = e.chartData;
        if (AmCharts.ifArray(t)) {
            if (0 < e.realWidth && 0 < e.realHeight) {
                AmCharts.VML && (e.startAlpha = 1);
                var n = e.startDuration,
                    r = e.container,
                    i = e.updateWidth();
                e.realWidth = i;
                var s = e.updateHeight();
                e.realHeight = s;
                var o = AmCharts.toCoordinate,
                    u = o(e.marginLeft, i),
                    a = o(e.marginRight, i),
                    f = o(e.marginTop, s) + e.getTitleHeight(),
                    l = o(e.marginBottom, s);
                e.chartDataLabels = [];
                e.ticks = [];
                var c, h, p, d = AmCharts.toNumber(e.labelRadius),
                    v = e.measureMaxLabel();
                if (!e.labelText || !e.labelsEnabled) d = v = 0;
                c = void 0 === e.pieX ? (i - u - a) / 2 + u : o(e.pieX, e.realWidth);
                h = void 0 === e.pieY ? (s - f - l) / 2 + f : o(e.pieY, s);
                p = o(e.radius, i, s);
                e.pullOutRadiusReal = AmCharts.toCoordinate(e.pullOutRadius, p);
                p || (i = 0 <= d ? i - u - a - 2 * v : i - u - a, s = s - f - l, p = Math.min(i, s), s < i && (p /= 1 - e.angle / 90, p > i && (p = i)), e.pullOutRadiusReal = AmCharts.toCoordinate(e.pullOutRadius, p), p = 0 <= d ? p - 1.8 * (d + e.pullOutRadiusReal) : p - 1.8 * e.pullOutRadiusReal, p /= 2);
                p < e.minRadius && (p = e.minRadius);
                e.pullOutRadiusReal = o(e.pullOutRadius, p);
                o = o(e.innerRadius, p);
                o >= p && (o = p - 1);
                s = AmCharts.fitToBounds(e.startAngle, 0, 360);
                0 < e.depth3D && (s = 270 <= s ? 270 : 90);
                f = p - p * e.angle / 90;
                for (l = 0; l < t.length; l++)
                    if (i = t[l], !0 !== i.hidden && 0 < i.percents) {
                        var a = 360 * -i.percents / 100,
                            v = Math.cos((s + a / 2) / 180 * Math.PI),
                            m = Math.sin((-s - a / 2) / 180 * Math.PI) * (f / p),
                            u = {
                                fill: i.color,
                                stroke: e.outlineColor,
                                "stroke-width": e.outlineThickness,
                                "stroke-opacity": e.outlineAlpha
                            };
                        i.url && (u.cursor = "pointer");
                        u = AmCharts.wedge(r, c, h, s, a, p, f, o, e.depth3D, u, e.gradientRatio);
                        e.addEventListeners(u, i);
                        i.startAngle = s;
                        t[l].wedge = u;
                        if (0 < n) {
                            var g = e.startAlpha;
                            e.chartCreated && (g = i.alpha);
                            u.setAttr("opacity", g)
                        }
                        i.ix = v;
                        i.iy = m;
                        i.wedge = u;
                        i.index = l;
                        if (e.labelsEnabled && e.labelText && i.percents >= e.hideLabelsPercent) {
                            var y = s + a / 2;
                            0 >= y && (y += 360);
                            a = d;
                            isNaN(i.labelRadius) || (a = i.labelRadius);
                            var v = c + v * (p + a),
                                m = h + m * (p + a),
                                b, g = 0;
                            if (0 <= a) {
                                var w;
                                90 >= y && 0 <= y ? (w = 0, b = "start", g = 8) : 360 >= y && 270 < y ? (w = 1, b = "start", g = 8) : 270 >= y && 180 < y ? (w = 2, b = "end", g = -8) : 180 >= y && 90 < y && (w = 3, b = "end", g = -8);
                                i.labelQuarter = w
                            } else b = "middle";
                            var y = e.formatString(e.labelText, i),
                                E = i.labelColor;
                            void 0 == E && (E = e.color);
                            y = AmCharts.text(r, y, E, e.fontFamily, e.fontSize, b);
                            y.translate(v + 1.5 * g, m);
                            i.tx = v + 1.5 * g;
                            i.ty = m;
                            0 <= a ? u.push(y) : e.freeLabelsSet.push(y);
                            i.label = y;
                            e.chartDataLabels[l] = y;
                            i.tx = v;
                            i.tx2 = v + g
                        }
                        e.graphsSet.push(u);
                        (0 === i.alpha || 0 < n && !e.chartCreated) && u.hide();
                        s -= 360 * i.percents / 100;
                        0 >= s && (s += 360)
                    }
                t = setTimeout(function() {
                    e.showLabels.call(e)
                }, 1e3 * n);
                e.timeOuts.push(t);
                0 < d && !e.labelRadiusField && e.arrangeLabels();
                e.pieXReal = c;
                e.pieYReal = h;
                e.radiusReal = p;
                e.innerRadiusReal = o;
                0 < d && e.drawTicks();
                e.chartCreated ? e.pullSlices(!0) : (n = setTimeout(function() {
                    e.pullSlices.call(e)
                }, 1200 * n), e.timeOuts.push(n));
                e.chartCreated || e.startSlices();
                e.setDepths()
            }(n = e.legend) && n.invalidateSize()
        } else e.cleanChart();
        e.dispDUpd();
        e.chartCreated = !0
    },
    setDepths: function() {
        var e = this.chartData,
            t;
        for (t = 0; t < e.length; t++) {
            var n = e[t],
                r = n.wedge,
                n = n.startAngle;
            90 >= n && 0 <= n || 360 >= n && 270 < n ? r.toFront() : (270 >= n && 180 < n || 180 >= n && 90 < n) && r.toBack()
        }
    },
    addEventListeners: function(e, t) {
        var n = this;
        e.mouseover(function() {
            n.rollOverSlice(t, !0)
        }).mouseout(function() {
            n.rollOutSlice(t)
        }).click(function() {
            n.clickSlice(t)
        }).contextmenu(function() {
            n.handleRightClick(t)
        })
    },
    formatString: function(e, t) {
        e = AmCharts.formatValue(e, t, ["value"], this.numberFormatter, "", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers);
        e = AmCharts.formatValue(e, t, ["percents"], this.percentFormatter);
        e = AmCharts.massReplace(e, {
            "[[title]]": t.title,
            "[[description]]": t.description,
            "<br>": "\n"
        });
        e = AmCharts.fixNewLines(e);
        return e = AmCharts.cleanFromEmpty(e)
    },
    drawTicks: function() {
        var e = this.chartData,
            t;
        for (t = 0; t < e.length; t++)
            if (this.chartDataLabels[t]) {
                var n = e[t],
                    r = n.ty,
                    i = this.radiusReal,
                    r = AmCharts.line(this.container, [this.pieXReal + n.ix * i, n.tx, n.tx2], [this.pieYReal + n.iy * i, r, r], this.labelTickColor, this.labelTickAlpha);
                n.wedge.push(r);
                this.ticks[t] = r
            }
    },
    arrangeLabels: function() {
        var e = this.chartData,
            t = e.length,
            n, r;
        for (r = t - 1; 0 <= r; r--) n = e[r], 0 === n.labelQuarter && !n.hidden && this.checkOverlapping(r, n, 0, !0, 0);
        for (r = 0; r < t; r++) n = e[r], 1 == n.labelQuarter && !n.hidden && this.checkOverlapping(r, n, 1, !1, 0);
        for (r = t - 1; 0 <= r; r--) n = e[r], 2 == n.labelQuarter && !n.hidden && this.checkOverlapping(r, n, 2, !0, 0);
        for (r = 0; r < t; r++) n = e[r], 3 == n.labelQuarter && !n.hidden && this.checkOverlapping(r, n, 3, !1, 0)
    },
    checkOverlapping: function(e, t, n, r, i) {
        var s, o, u = this.chartData,
            a = u.length,
            f = t.label;
        if (f) {
            if (!0 === r)
                for (o = e + 1; o < a; o++)(s = this.checkOverlappingReal(t, u[o], n)) && (o = a);
            else
                for (o = e - 1; 0 <= o; o--)(s = this.checkOverlappingReal(t, u[o], n)) && (o = 0);
            !0 === s && 100 > i && (s = t.ty + 3 * t.iy, t.ty = s, f.translate(t.tx2, s), this.checkOverlapping(e, t, n, r, i + 1))
        }
    },
    checkOverlappingReal: function(e, t, n) {
        var r = !1,
            i = e.label,
            s = t.label;
        e.labelQuarter == n && !e.hidden && !t.hidden && s && (i = i.getBBox(), n = {}, n.width = i.width, n.height = i.height, n.y = e.ty, n.x = e.tx, e = s.getBBox(), s = {}, s.width = e.width, s.height = e.height, s.y = t.ty, s.x = t.tx, AmCharts.hitTest(n, s) && (r = !0));
        return r
    },
    startSlices: function() {
        var e;
        for (e = 0; e < this.chartData.length; e++) 0 < this.startDuration && this.sequencedAnimation ? this.setStartTO(e) : this.startSlice(this.chartData[e])
    },
    setStartTO: function(e) {
        var t = this;
        e = setTimeout(function() {
            t.startSequenced.call(t)
        }, 500 * (t.startDuration / t.chartData.length) * e);
        t.timeOuts.push(e)
    },
    pullSlices: function(e) {
        var t = this.chartData,
            n;
        for (n = 0; n < t.length; n++) {
            var r = t[n];
            r.pulled && this.pullSlice(r, 1, e)
        }
    },
    startSequenced: function() {
        var e = this.chartData,
            t;
        for (t = 0; t < e.length; t++)
            if (!e[t].started) {
                this.startSlice(this.chartData[t]);
                break
            }
    },
    startSlice: function(e) {
        e.started = !0;
        var t = e.wedge,
            n = this.startDuration;
        if (t && 0 < n) {
            0 < e.alpha && t.show();
            var r = AmCharts.toCoordinate(this.startRadius, this.radiusReal);
            t.translate(Math.round(e.ix * r), Math.round(e.iy * r));
            t.animate({
                opacity: e.alpha,
                translate: "0,0"
            }, n, this.startEffect)
        }
    },
    showLabels: function() {
        var e = this.chartData,
            t;
        for (t = 0; t < e.length; t++)
            if (0 < e[t].alpha) {
                var n = this.chartDataLabels[t];
                n && n.show();
                (n = this.ticks[t]) && n.show()
            }
    },
    showSlice: function(e) {
        isNaN(e) ? e.hidden = !1 : this.chartData[e].hidden = !1;
        this.hideBalloon();
        this.invalidateVisibility()
    },
    hideSlice: function(e) {
        isNaN(e) ? e.hidden = !0 : this.chartData[e].hidden = !0;
        this.hideBalloon();
        this.invalidateVisibility()
    },
    rollOverSlice: function(e, t) {
        isNaN(e) || (e = this.chartData[e]);
        clearTimeout(this.hoverInt);
        this.pullOnHover && this.pullSlice(e, 1);
        var n = this.innerRadiusReal + (this.radiusReal - this.innerRadiusReal) / 2;
        e.pulled && (n += this.pullOutRadiusReal);
        1 > this.hoverAlpha && e.wedge && e.wedge.attr({
            opacity: this.hoverAlpha
        });
        var r = e.ix * n + this.pieXReal,
            n = e.iy * n + this.pieYReal,
            i = this.formatString(this.balloonText, e),
            s = AmCharts.adjustLuminosity(e.color, -.15);
        this.showBalloon(i, s, t, r, n);
        r = {
            type: "rollOverSlice",
            dataItem: e,
            chart: this
        };
        this.fire(r.type, r)
    },
    rollOutSlice: function(e) {
        isNaN(e) || (e = this.chartData[e]);
        e.wedge && e.wedge.attr({
            opacity: e.alpha
        });
        this.hideBalloon();
        e = {
            type: "rollOutSlice",
            dataItem: e,
            chart: this
        };
        this.fire(e.type, e)
    },
    clickSlice: function(e) {
        isNaN(e) || (e = this.chartData[e]);
        this.hideBalloon();
        e.pulled ? this.pullSlice(e, 0) : this.pullSlice(e, 1);
        AmCharts.getURL(e.url, this.urlTarget);
        e = {
            type: "clickSlice",
            dataItem: e,
            chart: this
        };
        this.fire(e.type, e)
    },
    handleRightClick: function(e) {
        isNaN(e) || (e = this.chartData[e]);
        e = {
            type: "rightClickSlice",
            dataItem: e,
            chart: this
        };
        this.fire(e.type, e)
    },
    pullSlice: function(e, t, n) {
        var r = e.ix,
            i = e.iy,
            s = this.pullOutDuration;
        !0 === n && (s = 0);
        n = e.wedge;
        var o = this.pullOutRadiusReal;
        n && n.animate({
            translate: t * r * o + "," + t * i * o
        }, s, this.pullOutEffect);
        1 == t ? (e.pulled = !0, this.pullOutOnlyOne && this.pullInAll(e.index), e = {
            type: "pullOutSlice",
            dataItem: e,
            chart: this
        }) : (e.pulled = !1, e = {
            type: "pullInSlice",
            dataItem: e,
            chart: this
        });
        this.fire(e.type, e)
    },
    pullInAll: function(e) {
        var t = this.chartData,
            n;
        for (n = 0; n < this.chartData.length; n++) n != e && t[n].pulled && this.pullSlice(t[n], 0)
    },
    pullOutAll: function() {
        var e = this.chartData,
            t;
        for (t = 0; t < e.length; t++) e[t].pulled || this.pullSlice(e[t], 1)
    },
    parseData: function() {
        var e = [];
        this.chartData = e;
        var t = this.dataProvider;
        if (void 0 !== t) {
            var n = t.length,
                r = 0,
                i, s, o;
            for (i = 0; i < n; i++) {
                s = {};
                var u = t[i];
                s.dataContext = u;
                s.value = Number(u[this.valueField]);
                (o = u[this.titleField]) || (o = "");
                s.title = o;
                s.pulled = AmCharts.toBoolean(u[this.pulledField], !1);
                (o = u[this.descriptionField]) || (o = "");
                s.description = o;
                s.labelRadius = Number(u[this.labelRadiusField]);
                s.url = u[this.urlField];
                s.visibleInLegend = AmCharts.toBoolean(u[this.visibleInLegendField], !0);
                o = u[this.alphaField];
                s.alpha = void 0 !== o ? Number(o) : this.pieAlpha;
                o = u[this.colorField];
                void 0 !== o && (s.color = AmCharts.toColor(o));
                s.labelColor = AmCharts.toColor(u[this.labelColorField]);
                r += s.value;
                s.hidden = !1;
                e[i] = s
            }
            for (i = t = 0; i < n; i++) s = e[i], s.percents = 100 * (s.value / r), s.percents < this.groupPercent && t++;
            1 < t && (this.groupValue = 0, this.removeSmallSlices(), e.push({
                title: this.groupedTitle,
                value: this.groupValue,
                percents: 100 * (this.groupValue / r),
                pulled: this.groupedPulled,
                color: this.groupedColor,
                url: this.groupedUrl,
                description: this.groupedDescription,
                alpha: this.groupedAlpha
            }));
            for (i = 0; i < e.length; i++) this.pieBaseColor ? o = AmCharts.adjustLuminosity(this.pieBaseColor, i * this.pieBrightnessStep / 100) : (o = this.colors[i], void 0 === o && (o = AmCharts.randomColor())), void 0 === e[i].color && (e[i].color = o);
            this.recalculatePercents()
        }
    },
    recalculatePercents: function() {
        var e = this.chartData,
            t = 0,
            n, r;
        for (n = 0; n < e.length; n++) r = e[n], !r.hidden && 0 < r.value && (t += r.value);
        for (n = 0; n < e.length; n++) r = this.chartData[n], r.percents = !r.hidden && 0 < r.value ? 100 * r.value / t : 0
    },
    removeSmallSlices: function() {
        var e = this.chartData,
            t;
        for (t = e.length - 1; 0 <= t; t--) e[t].percents < this.groupPercent && (this.groupValue += e[t].value, e.splice(t, 1))
    },
    animateAgain: function() {
        var e = this;
        e.startSlices();
        var t = setTimeout(function() {
            e.pullSlices.call(e)
        }, 1200 * e.startDuration);
        e.timeOuts.push(t)
    },
    measureMaxLabel: function() {
        var e = this.chartData,
            t = 0,
            n;
        for (n = 0; n < e.length; n++) {
            var r = this.formatString(this.labelText, e[n]),
                r = AmCharts.text(this.container, r, this.color, this.fontFamily, this.fontSize),
                i = r.getBBox().width;
            i > t && (t = i);
            r.remove()
        }
        return t
    }
});
AmCharts.AmXYChart = AmCharts.Class({
    inherits: AmCharts.AmRectangularChart,
    construct: function() {
        AmCharts.AmXYChart.base.construct.call(this);
        this.createEvents("zoomed");
        this.maxZoomFactor = 20;
        this.chartType = "xy"
    },
    initChart: function() {
        AmCharts.AmXYChart.base.initChart.call(this);
        this.dataChanged && (this.updateData(), this.dataChanged = !1, this.dispatchDataUpdated = !0);
        this.updateScrollbar = !0;
        this.drawChart();
        this.autoMargins && !this.marginsUpdated && (this.marginsUpdated = !0, this.measureMargins());
        var e = this.marginLeftReal,
            t = this.marginTopReal,
            n = this.plotAreaWidth,
            r = this.plotAreaHeight;
        this.graphsSet.clipRect(e, t, n, r);
        this.bulletSet.clipRect(e, t, n, r);
        this.trendLinesSet.clipRect(e, t, n, r)
    },
    createValueAxes: function() {
        var e = [],
            t = [];
        this.xAxes = e;
        this.yAxes = t;
        var n = this.valueAxes,
            r, i;
        for (i = 0; i < n.length; i++) {
            r = n[i];
            var s = r.position;
            if ("top" == s || "bottom" == s) r.rotate = !0;
            r.setOrientation(r.rotate);
            s = r.orientation;
            "V" == s && t.push(r);
            "H" == s && e.push(r)
        }
        0 === t.length && (r = new AmCharts.ValueAxis, r.rotate = !1, r.setOrientation(!1), n.push(r), t.push(r));
        0 === e.length && (r = new AmCharts.ValueAxis, r.rotate = !0, r.setOrientation(!0), n.push(r), e.push(r));
        for (i = 0; i < n.length; i++) this.processValueAxis(n[i], i);
        e = this.graphs;
        for (i = 0; i < e.length; i++) this.processGraph(e[i], i)
    },
    drawChart: function() {
        AmCharts.AmXYChart.base.drawChart.call(this);
        AmCharts.ifArray(this.chartData) ? (this.chartScrollbar && this.updateScrollbars(), this.zoomChart()) : this.cleanChart();
        if (this.hideXScrollbar) {
            var e = this.scrollbarH;
            e && (this.removeListener(e, "zoomed", this.handleHSBZoom), e.destroy());
            this.scrollbarH = null
        }
        if (this.hideYScrollbar) {
            if (e = this.scrollbarV) this.removeListener(e, "zoomed", this.handleVSBZoom), e.destroy();
            this.scrollbarV = null
        }
        if (!this.autoMargins || this.marginsUpdated) this.dispDUpd(), this.chartCreated = !0, this.zoomScrollbars()
    },
    cleanChart: function() {
        AmCharts.callMethod("destroy", [this.valueAxes, this.graphs, this.scrollbarV, this.scrollbarH, this.chartCursor])
    },
    zoomChart: function() {
        this.toggleZoomOutButton();
        this.zoomObjects(this.valueAxes);
        this.zoomObjects(this.graphs);
        this.zoomTrendLines();
        this.dispatchAxisZoom()
    },
    toggleZoomOutButton: function() {
        1 == this.heightMultiplier && 1 == this.widthMultiplier ? this.showZB(!1) : this.showZB(!0)
    },
    dispatchAxisZoom: function() {
        var e = this.valueAxes,
            t;
        for (t = 0; t < e.length; t++) {
            var n = e[t];
            if (!isNaN(n.min) && !isNaN(n.max)) {
                var r, i;
                "V" == n.orientation ? (r = n.coordinateToValue(-this.verticalPosition), i = n.coordinateToValue(-this.verticalPosition + this.plotAreaHeight)) : (r = n.coordinateToValue(-this.horizontalPosition), i = n.coordinateToValue(-this.horizontalPosition + this.plotAreaWidth));
                if (!isNaN(r) && !isNaN(i)) {
                    if (r > i) {
                        var s = i;
                        i = r;
                        r = s
                    }
                    n.dispatchZoomEvent(r, i)
                }
            }
        }
    },
    zoomObjects: function(e) {
        var t = e.length,
            n;
        for (n = 0; n < t; n++) {
            var r = e[n];
            this.updateObjectSize(r);
            r.zoom(0, this.chartData.length - 1)
        }
    },
    updateData: function() {
        this.parseData();
        var e = this.chartData,
            t = e.length - 1,
            n = this.graphs,
            r = this.dataProvider,
            i = 0,
            s, o;
        for (s = 0; s < n.length; s++)
            if (o = n[s], o.data = e, o.zoom(0, t), o = o.valueField) {
                var u;
                for (u = 0; u < r.length; u++) {
                    var a = r[u][o];
                    a > i && (i = a)
                }
            }
        for (s = 0; s < n.length; s++) o = n[s], o.maxValue = i;
        if (e = this.chartCursor) e.updateData(), e.type = "crosshair", e.valueBalloonsEnabled = !1
    },
    zoomOut: function() {
        this.verticalPosition = this.horizontalPosition = 0;
        this.heightMultiplier = this.widthMultiplier = 1;
        this.zoomChart();
        this.zoomScrollbars()
    },
    processValueAxis: function(e) {
        e.chart = this;
        e.minMaxField = "H" == e.orientation ? "x" : "y";
        e.minTemp = NaN;
        e.maxTemp = NaN;
        this.listenTo(e, "axisSelfZoomed", this.handleAxisSelfZoom)
    },
    processGraph: function(e) {
        e.xAxis || (e.xAxis = this.xAxes[0]);
        e.yAxis || (e.yAxis = this.yAxes[0])
    },
    parseData: function() {
        AmCharts.AmXYChart.base.parseData.call(this);
        this.chartData = [];
        var e = this.dataProvider,
            t = this.valueAxes,
            n = this.graphs,
            r;
        for (r = 0; r < e.length; r++) {
            var i = {
                    axes: {},
                    x: {},
                    y: {}
                },
                s = e[r],
                o;
            for (o = 0; o < t.length; o++) {
                var u = t[o].id;
                i.axes[u] = {};
                i.axes[u].graphs = {};
                var a;
                for (a = 0; a < n.length; a++) {
                    var f = n[a],
                        l = f.id;
                    if (f.xAxis.id == u || f.yAxis.id == u) {
                        var c = {};
                        c.serialDataItem = i;
                        c.index = r;
                        var h = {},
                            p = Number(s[f.valueField]);
                        isNaN(p) || (h.value = p);
                        p = Number(s[f.xField]);
                        isNaN(p) || (h.x = p);
                        p = Number(s[f.yField]);
                        isNaN(p) || (h.y = p);
                        c.values = h;
                        this.processFields(f, c, s);
                        c.serialDataItem = i;
                        c.graph = f;
                        i.axes[u].graphs[l] = c
                    }
                }
            }
            this.chartData[r] = i
        }
    },
    formatString: function(e, t) {
        var n = t.graph.numberFormatter;
        n || (n = this.numberFormatter);
        e = AmCharts.formatValue(e, t.values, ["value", "x", "y"], n); - 1 != e.indexOf("[[") && (e = AmCharts.formatDataContextValue(e, t.dataContext));
        return e = AmCharts.AmSerialChart.base.formatString.call(this, e, t)
    },
    addChartScrollbar: function(e) {
        AmCharts.callMethod("destroy", [this.chartScrollbar, this.scrollbarH, this.scrollbarV]);
        if (e) {
            this.chartScrollbar = e;
            this.scrollbarHeight = e.scrollbarHeight;
            var t = "backgroundColor backgroundAlpha selectedBackgroundColor selectedBackgroundAlpha scrollDuration resizeEnabled hideResizeGrips scrollbarHeight updateOnReleaseOnly".split(" ");
            if (!this.hideYScrollbar) {
                var n = new AmCharts.SimpleChartScrollbar;
                n.skipEvent = !0;
                n.chart = this;
                this.listenTo(n, "zoomed", this.handleVSBZoom);
                AmCharts.copyProperties(e, n, t);
                n.rotate = !0;
                this.scrollbarV = n
            }
            this.hideXScrollbar || (n = new AmCharts.SimpleChartScrollbar, n.skipEvent = !0, n.chart = this, this.listenTo(n, "zoomed", this.handleHSBZoom), AmCharts.copyProperties(e, n, t), n.rotate = !1, this.scrollbarH = n)
        }
    },
    updateTrendLines: function() {
        var e = this.trendLines,
            t;
        for (t = 0; t < e.length; t++) {
            var n = e[t];
            n.chart = this;
            n.valueAxis || (n.valueAxis = this.yAxes[0]);
            n.valueAxisX || (n.valueAxisX = this.xAxes[0])
        }
    },
    updateMargins: function() {
        AmCharts.AmXYChart.base.updateMargins.call(this);
        var e = this.scrollbarV;
        e && (this.getScrollbarPosition(e, !0, this.yAxes[0].position), this.adjustMargins(e, !0));
        if (e = this.scrollbarH) this.getScrollbarPosition(e, !1, this.xAxes[0].position), this.adjustMargins(e, !1)
    },
    updateScrollbars: function() {
        var e = this.scrollbarV;
        e && (this.updateChartScrollbar(e, !0), e.draw());
        if (e = this.scrollbarH) this.updateChartScrollbar(e, !1), e.draw()
    },
    zoomScrollbars: function() {
        var e = this.scrollbarH;
        e && e.relativeZoom(this.widthMultiplier, -this.horizontalPosition / this.widthMultiplier);
        (e = this.scrollbarV) && e.relativeZoom(this.heightMultiplier, -this.verticalPosition / this.heightMultiplier)
    },
    fitMultiplier: function(e) {
        e > this.maxZoomFactor && (e = this.maxZoomFactor);
        return e
    },
    handleHSBZoom: function(e) {
        var t = this.fitMultiplier(e.multiplier);
        e = -e.position * t;
        var n = -(this.plotAreaWidth * t - this.plotAreaWidth);
        e < n && (e = n);
        this.widthMultiplier = t;
        this.horizontalPosition = e;
        this.zoomChart()
    },
    handleVSBZoom: function(e) {
        var t = this.fitMultiplier(e.multiplier);
        e = -e.position * t;
        var n = -(this.plotAreaHeight * t - this.plotAreaHeight);
        e < n && (e = n);
        this.heightMultiplier = t;
        this.verticalPosition = e;
        this.zoomChart()
    },
    handleAxisSelfZoom: function(e) {
        if ("H" == e.valueAxis.orientation) {
            var t = this.fitMultiplier(e.multiplier);
            e = -e.position * t;
            var n = -(this.plotAreaWidth * t - this.plotAreaWidth);
            e < n && (e = n);
            this.horizontalPosition = e;
            this.widthMultiplier = t
        } else t = this.fitMultiplier(e.multiplier), e = -e.position * t, n = -(this.plotAreaHeight * t - this.plotAreaHeight), e < n && (e = n), this.verticalPosition = e, this.heightMultiplier = t;
        this.zoomChart();
        this.zoomScrollbars()
    },
    handleCursorZoom: function(e) {
        var t = this.widthMultiplier * this.plotAreaWidth / e.selectionWidth,
            n = this.heightMultiplier * this.plotAreaHeight / e.selectionHeight,
            t = this.fitMultiplier(t),
            n = this.fitMultiplier(n);
        this.horizontalPosition = (this.horizontalPosition - e.selectionX) * t / this.widthMultiplier;
        this.verticalPosition = (this.verticalPosition - e.selectionY) * n / this.heightMultiplier;
        this.widthMultiplier = t;
        this.heightMultiplier = n;
        this.zoomChart();
        this.zoomScrollbars()
    },
    removeChartScrollbar: function() {
        AmCharts.callMethod("destroy", [this.scrollbarH, this.scrollbarV]);
        this.scrollbarV = this.scrollbarH = null
    },
    handleReleaseOutside: function(e) {
        AmCharts.AmXYChart.base.handleReleaseOutside.call(this, e);
        AmCharts.callMethod("handleReleaseOutside", [this.scrollbarH, this.scrollbarV])
    }
});
AmCharts.AmDraw = AmCharts.Class({
    construct: function(e, t, n) {
        AmCharts.SVG_NS = "http://www.w3.org/2000/svg";
        AmCharts.SVG_XLINK = "http://www.w3.org/1999/xlink";
        AmCharts.hasSVG = !!document.createElementNS && !!document.createElementNS(AmCharts.SVG_NS, "svg").createSVGRect;
        1 > t && (t = 10);
        1 > n && (n = 10);
        this.div = e;
        this.width = t;
        this.height = n;
        this.rBin = document.createElement("div");
        if (AmCharts.hasSVG) {
            AmCharts.SVG = !0;
            var r = this.createSvgElement("svg");
            r.style.position = "absolute";
            r.style.width = t + "px";
            r.style.height = n + "px";
            r.setAttribute("version", "1.1");
            e.appendChild(r);
            this.container = r;
            this.R = new AmCharts.SVGRenderer(this)
        } else AmCharts.isIE && AmCharts.VMLRenderer && (AmCharts.VML = !0, AmCharts.vmlStyleSheet || (document.namespaces.add("amvml", "urn:schemas-microsoft-com:vml"), t = document.createStyleSheet(), t.addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true"), AmCharts.vmlStyleSheet = t), this.container = e, this.R = new AmCharts.VMLRenderer(this), this.R.disableSelection(e))
    },
    createSvgElement: function(e) {
        return document.createElementNS(AmCharts.SVG_NS, e)
    },
    circle: function(e, t, n, r) {
        var i = new AmCharts.AmDObject("circle", this);
        i.attr({
            r: n,
            cx: e,
            cy: t
        });
        this.addToContainer(i.node, r);
        return i
    },
    setSize: function(e, t) {
        0 < e && 0 < t && (this.container.style.width = e + "px", this.container.style.height = t + "px")
    },
    rect: function(e, t, n, r, i, s, o) {
        var u = new AmCharts.AmDObject("rect", this);
        AmCharts.VML && (i = 100 * i / Math.min(n, r), n += 2 * s, r += 2 * s, u.bw = s, u.node.style.marginLeft = -s, u.node.style.marginTop = -s);
        1 > n && (n = 1);
        1 > r && (r = 1);
        u.attr({
            x: e,
            y: t,
            width: n,
            height: r,
            rx: i,
            ry: i,
            "stroke-width": s
        });
        this.addToContainer(u.node, o);
        return u
    },
    image: function(e, t, n, r, i, s) {
        var o = new AmCharts.AmDObject("image", this);
        o.attr({
            x: 0,
            y: 5,
            width: 100,
            height: 240
        });
        this.R.path(o, e);
        this.addToContainer(o.node, s);
        return o
    },
    addToContainer: function(e, t) {
        t || (t = this.container);
        t.appendChild(e)
    },
    text: function(e, t, n) {
        return this.R.text(e, t, n)
    },
    path: function(e, t, n, r) {
        var i = new AmCharts.AmDObject("path", this);
        r || (r = "100,100");
        i.attr({
            cs: r
        });
        n ? i.attr({
            dd: e
        }) : i.attr({
            d: e
        });
        this.addToContainer(i.node, t);
        return i
    },
    set: function(e) {
        return this.R.set(e)
    },
    remove: function(e) {
        if (e) {
            var t = this.rBin;
            t.appendChild(e);
            t.innerHTML = ""
        }
    },
    bounce: function(e, t, n, r, i) {
        return (t /= i) < 1 / 2.75 ? r * 7.5625 * t * t + n : t < 2 / 2.75 ? r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : t < 2.5 / 2.75 ? r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
    },
    easeInSine: function(e, t, n, r, i) {
        return -r * Math.cos(t / i * (Math.PI / 2)) + r + n
    },
    easeOutSine: function(e, t, n, r, i) {
        return r * Math.sin(t / i * (Math.PI / 2)) + n
    },
    easeOutElastic: function(e, t, n, r, i) {
        e = 1.70158;
        var s = 0,
            o = r;
        if (0 === t) return n;
        if (1 == (t /= i)) return n + r;
        s || (s = .3 * i);
        o < Math.abs(r) ? (o = r, e = s / 4) : e = s / (2 * Math.PI) * Math.asin(r / o);
        return o * Math.pow(2, -10 * t) * Math.sin((t * i - e) * 2 * Math.PI / s) + r + n
    },
    renderFix: function() {
        var e = this.container,
            t = e.style,
            n;
        try {
            n = e.getScreenCTM() || e.createSVGMatrix()
        } catch (r) {
            n = e.createSVGMatrix()
        }
        e = 1 - n.e % 1;
        n = 1 - n.f % 1;
        .5 < e && (e -= 1);
        .5 < n && (n -= 1);
        e && (t.left = e + "px");
        n && (t.top = n + "px")
    }
});
AmCharts.AmDObject = AmCharts.Class({
    construct: function(e, t) {
        this.D = t;
        this.R = t.R;
        this.node = this.R.create(this, e);
        this.y = this.x = 0;
        this.scale = 1
    },
    attr: function(e) {
        this.R.attr(this, e);
        return this
    },
    getAttr: function(e) {
        return this.node.getAttribute(e)
    },
    setAttr: function(e, t) {
        this.R.setAttr(this, e, t);
        return this
    },
    clipRect: function(e, t, n, r) {
        this.R.clipRect(this, e, t, n, r)
    },
    translate: function(e, t, n, r) {
        r || (e = Math.round(e), t = Math.round(t));
        this.R.move(this, e, t, n);
        this.x = e;
        this.y = t;
        this.scale = n;
        this.angle && this.rotate(this.angle)
    },
    rotate: function(e) {
        this.R.rotate(this, e);
        this.angle = e
    },
    animate: function(e, t, n) {
        for (var r in e)
            if (e.hasOwnProperty(r)) {
                var i = r,
                    s = e[r];
                n = AmCharts.getEffect(n);
                this.R.animate(this, i, s, t, n)
            }
    },
    push: function(e) {
        if (e) {
            var t = this.node;
            t.appendChild(e.node);
            var n = e.clipPath;
            n && t.appendChild(n);
            (e = e.grad) && t.appendChild(e)
        }
    },
    text: function(e) {
        this.R.setText(this, e)
    },
    remove: function() {
        this.R.remove(this)
    },
    clear: function() {
        var e = this.node;
        if (e.hasChildNodes())
            for (; 1 <= e.childNodes.length;) e.removeChild(e.firstChild)
    },
    hide: function() {
        this.setAttr("visibility", "hidden")
    },
    show: function() {
        this.setAttr("visibility", "visible")
    },
    getBBox: function() {
        return this.R.getBBox(this)
    },
    toFront: function() {
        var e = this.node;
        if (e) {
            this.prevNextNode = e.nextSibling;
            var t = e.parentNode;
            t && t.appendChild(e)
        }
    },
    toPrevious: function() {
        var e = this.node;
        e && this.prevNextNode && (e = e.parentNode) && e.insertBefore(this.prevNextNode, null)
    },
    toBack: function() {
        var e = this.node;
        if (e) {
            this.prevNextNode = e.nextSibling;
            var t = e.parentNode;
            if (t) {
                var n = t.firstChild;
                n && t.insertBefore(e, n)
            }
        }
    },
    mouseover: function(e) {
        this.R.addListener(this, "mouseover", e);
        return this
    },
    mouseout: function(e) {
        this.R.addListener(this, "mouseout", e);
        return this
    },
    click: function(e) {
        this.R.addListener(this, "click", e);
        return this
    },
    dblclick: function(e) {
        this.R.addListener(this, "dblclick", e);
        return this
    },
    mousedown: function(e) {
        this.R.addListener(this, "mousedown", e);
        return this
    },
    mouseup: function(e) {
        this.R.addListener(this, "mouseup", e);
        return this
    },
    touchstart: function(e) {
        this.R.addListener(this, "touchstart", e);
        return this
    },
    touchend: function(e) {
        this.R.addListener(this, "touchend", e);
        return this
    },
    contextmenu: function(e) {
        this.node.addEventListener ? this.node.addEventListener("contextmenu", e) : this.R.addListener(this, "contextmenu", e);
        return this
    },
    stop: function() {
        var e = this.animationX;
        e && AmCharts.removeFromArray(this.R.animations, e);
        (e = this.animationY) && AmCharts.removeFromArray(this.R.animations, e)
    },
    length: function() {
        return this.node.childNodes.length
    },
    gradient: function(e, t, n) {
        this.R.gradient(this, e, t, n)
    }
});
AmCharts.VMLRenderer = AmCharts.Class({
    construct: function(e) {
        this.D = e;
        this.cNames = {
            circle: "oval",
            rect: "roundrect",
            path: "shape"
        };
        this.styleMap = {
            x: "left",
            y: "top",
            width: "width",
            height: "height",
            "font-family": "fontFamily",
            "font-size": "fontSize",
            visibility: "visibility"
        };
        this.animations = []
    },
    create: function(e, t) {
        var n;
        if ("group" == t) n = document.createElement("div"), e.type = "div";
        else if ("text" == t) n = document.createElement("div"), e.type = "text";
        else if ("image" == t) n = document.createElement("img"), e.type = "image";
        else {
            e.type = "shape";
            e.shapeType = this.cNames[t];
            n = document.createElement("amvml:" + this.cNames[t]);
            var r = document.createElement("amvml:stroke");
            n.appendChild(r);
            e.stroke = r;
            var i = document.createElement("amvml:fill");
            n.appendChild(i);
            e.fill = i;
            i.className = "amvml";
            r.className = "amvml";
            n.className = "amvml"
        }
        n.style.position = "absolute";
        n.style.top = 0;
        n.style.left = 0;
        return n
    },
    path: function(e, t) {
        e.node.setAttribute("src", t)
    },
    setAttr: function(e, t, n) {
        if (void 0 !== n) {
            var r;
            8 === document.documentMode && (r = !0);
            var i = e.node,
                s = e.type,
                o = i.style;
            "r" == t && (o.width = 2 * n, o.height = 2 * n);
            if ("roundrect" == e.shapeType && ("width" == t || "height" == t)) n -= 1;
            "cursor" == t && (o.cursor = n);
            "cx" == t && (o.left = n - AmCharts.removePx(o.width) / 2);
            "cy" == t && (o.top = n - AmCharts.removePx(o.height) / 2);
            var u = this.styleMap[t];
            void 0 !== u && (o[u] = n);
            "text" == s && ("text-anchor" == t && (e.anchor = n, u = i.clientWidth, "end" == n && (o.marginLeft = -u + "px"), "middle" == n && (o.marginLeft = -(u / 2) + "px", o.textAlign = "center"), "start" == n && (o.marginLeft = "0px")), "fill" == t && (o.color = n), "font-weight" == t && (o.fontWeight = n));
            if (o = e.children)
                for (u = 0; u < o.length; u++) o[u].setAttr(t, n);
            if ("shape" == s) {
                "cs" == t && (i.style.width = "100px", i.style.height = "100px", i.setAttribute("coordsize", n));
                "d" == t && i.setAttribute("path", this.svgPathToVml(n));
                "dd" == t && i.setAttribute("path", n);
                s = e.stroke;
                e = e.fill;
                "stroke" == t && (r ? s.color = n : s.setAttribute("color", n));
                "stroke-width" == t && (r ? s.weight = n : s.setAttribute("weight", n));
                "stroke-opacity" == t && (r ? s.opacity = n : s.setAttribute("opacity", n));
                "stroke-dasharray" == t && (o = "solid", 0 < n && 3 > n && (o = "dot"), 3 <= n && 6 >= n && (o = "dash"), 6 < n && (o = "longdash"), r ? s.dashstyle = o : s.setAttribute("dashstyle", o));
                if ("fill-opacity" == t || "opacity" == t) 0 === n ? r ? e.on = !1 : e.setAttribute("on", !1) : r ? e.opacity = n : e.setAttribute("opacity", n);
                "fill" == t && (r ? e.color = n : e.setAttribute("color", n));
                "rx" == t && (r ? i.arcSize = n + "%" : i.setAttribute("arcsize", n + "%"))
            }
        }
    },
    attr: function(e, t) {
        for (var n in t) t.hasOwnProperty(n) && this.setAttr(e, n, t[n])
    },
    text: function(e, t, n) {
        var r = new AmCharts.AmDObject("text", this.D),
            i = r.node;
        i.style.whiteSpace = "pre";
        i.innerHTML = e;
        this.D.addToContainer(i, n);
        this.attr(r, t);
        return r
    },
    getBBox: function(e) {
        return this.getBox(e.node)
    },
    getBox: function(e) {
        var t = e.offsetLeft,
            n = e.offsetTop,
            r = e.offsetWidth,
            i = e.offsetHeight,
            s;
        if (e.hasChildNodes()) {
            var o, u, a;
            for (a = 0; a < e.childNodes.length; a++) {
                s = this.getBox(e.childNodes[a]);
                var f = s.x;
                isNaN(f) || (isNaN(o) ? o = f : f < o && (o = f));
                var l = s.y;
                isNaN(l) || (isNaN(u) ? u = l : l < u && (u = l));
                f = s.width + f;
                isNaN(f) || (r = Math.max(r, f));
                s = s.height + l;
                isNaN(s) || (i = Math.max(i, s))
            }
            0 > o && (t += o);
            0 > u && (n += u)
        }
        return {
            x: t,
            y: n,
            width: r,
            height: i
        }
    },
    setText: function(e, t) {
        var n = e.node;
        n && (n.innerHTML = t);
        this.setAttr(e, "text-anchor", e.anchor)
    },
    addListener: function(e, t, n) {
        e.node["on" + t] = n
    },
    move: function(e, t, n) {
        var r = e.node,
            i = r.style;
        "text" == e.type && (n -= AmCharts.removePx(i.fontSize) / 2 - 1);
        "oval" == e.shapeType && (t -= AmCharts.removePx(i.width) / 2, n -= AmCharts.removePx(i.height) / 2);
        e = e.bw;
        isNaN(e) || (t -= e, n -= e);
        !isNaN(t) && !isNaN(n) && (r.style.left = t + "px", r.style.top = n + "px")
    },
    svgPathToVml: function(e) {
        var t = e.split(" ");
        e = "";
        var n, r = Math.round,
            i;
        for (i = 0; i < t.length; i++) {
            var s = t[i],
                o = s.substring(0, 1),
                s = s.substring(1),
                u = s.split(","),
                a = r(u[0]) + "," + r(u[1]);
            "M" == o && (e += " m " + a);
            "L" == o && (e += " l " + a);
            "Z" == o && (e += " x e");
            if ("Q" == o) {
                var f = n.length,
                    l = n[f - 1],
                    c = u[0],
                    h = u[1],
                    a = u[2],
                    p = u[3];
                n = r(n[f - 2] / 3 + 2 / 3 * c);
                l = r(l / 3 + 2 / 3 * h);
                c = r(2 / 3 * c + a / 3);
                h = r(2 / 3 * h + p / 3);
                e += " c " + n + "," + l + "," + c + "," + h + "," + a + "," + p
            }
            "A" == o && (e += " wa " + s);
            "B" == o && (e += " at " + s);
            n = u
        }
        return e
    },
    animate: function(e, t, n, r, i) {
        var s = this,
            o = e.node;
        if ("translate" == t) {
            var u = n.split(",");
            t = u[1];
            n = o.offsetTop;
            o = {
                obj: e,
                frame: 0,
                attribute: "left",
                from: o.offsetLeft,
                to: u[0],
                time: r,
                effect: i
            };
            s.animations.push(o);
            r = {
                obj: e,
                frame: 0,
                attribute: "top",
                from: n,
                to: t,
                time: r,
                effect: i
            };
            s.animations.push(r);
            e.animationX = o;
            e.animationY = r
        }
        s.interval || (s.interval = setInterval(function() {
            s.updateAnimations.call(s)
        }, AmCharts.updateRate))
    },
    updateAnimations: function() {
        var e;
        for (e = this.animations.length - 1; 0 <= e; e--) {
            var t = this.animations[e],
                n = 1e3 * t.time / AmCharts.updateRate,
                r = t.frame + 1,
                i = t.obj,
                s = t.attribute;
            if (r <= n) {
                t.frame++;
                var o = Number(t.from),
                    u = Number(t.to) - o,
                    t = this.D[t.effect](0, r, o, u, n);
                0 === u ? this.animations.splice(e, 1) : i.node.style[s] = t
            } else i.node.style[s] = Number(t.to), this.animations.splice(e, 1)
        }
    },
    clipRect: function(e, t, n, r, i) {
        e = e.node;
        0 == t && 0 == n ? (e.style.width = r + "px", e.style.height = i + "px", e.style.overflow = "hidden") : e.style.clip = "rect(" + n + "px " + (t + r) + "px " + (n + i) + "px " + t + "px)"
    },
    rotate: function(e, t) {
        if (0 != Number(t)) {
            var n = e.node,
                r = n.style,
                i = this.getBGColor(n.parentNode);
            r.backgroundColor = i;
            r.paddingLeft = 1;
            var i = t * Math.PI / 180,
                s = Math.cos(i),
                o = Math.sin(i),
                u = AmCharts.removePx(r.left),
                a = AmCharts.removePx(r.top),
                f = n.offsetWidth,
                n = n.offsetHeight,
                l = t / Math.abs(t);
            r.left = u + f / 2 - f / 2 * Math.cos(i) - l * n / 2 * Math.sin(i) + 3;
            r.top = a - l * f / 2 * Math.sin(i) + l * n / 2 * Math.sin(i);
            r.cssText = r.cssText + "; filter:progid:DXImageTransform.Microsoft.Matrix(M11='" + s + "', M12='" + -o + "', M21='" + o + "', M22='" + s + "', sizingmethod='auto expand');"
        }
    },
    getBGColor: function(e) {
        var t = "#FFFFFF";
        if (e.style) {
            var n = e.style.backgroundColor;
            "" !== n ? t = n : e.parentNode && (t = this.getBGColor(e.parentNode))
        }
        return t
    },
    set: function(e) {
        var t = new AmCharts.AmDObject("group", this.D);
        this.D.container.appendChild(t.node);
        if (e) {
            var n;
            for (n = 0; n < e.length; n++) t.push(e[n])
        }
        return t
    },
    gradient: function(e, t, n, r) {
        var i = "";
        "radialGradient" == t && (t = "gradientradial", n.reverse());
        "linearGradient" == t && (t = "gradient");
        var s;
        for (s = 0; s < n.length; s++) {
            var o = Math.round(100 * s / (n.length - 1)),
                i = i + (o + "% " + n[s]);
            s < n.length - 1 && (i += ",")
        }
        e = e.fill;
        90 == r ? r = 0 : 270 == r ? r = 180 : 180 == r ? r = 90 : 0 === r && (r = 270);
        8 === document.documentMode ? (e.type = t, e.angle = r) : (e.setAttribute("type", t), e.setAttribute("angle", r));
        i && (e.colors.value = i)
    },
    remove: function(e) {
        e.clipPath && this.D.remove(e.clipPath);
        this.D.remove(e.node)
    },
    disableSelection: function(e) {
        void 0 !== typeof e.onselectstart && (e.onselectstart = function() {
            return !1
        });
        e.style.cursor = "default"
    }
});
AmCharts.SVGRenderer = AmCharts.Class({
    construct: function(e) {
        this.D = e;
        this.animations = []
    },
    create: function(e, t) {
        return document.createElementNS(AmCharts.SVG_NS, t)
    },
    attr: function(e, t) {
        for (var n in t) t.hasOwnProperty(n) && this.setAttr(e, n, t[n])
    },
    setAttr: function(e, t, n) {
        void 0 !== n && e.node.setAttribute(t, n)
    },
    animate: function(e, t, n, r, i) {
        var s = this,
            o = e.node;
        "translate" == t ? (o = (o = o.getAttribute("transform")) ? String(o).substring(10, o.length - 1) : "0,0", o = o.split(", ").join(" "), o = o.split(" ").join(","), 0 === o && (o = "0,0")) : o = o.getAttribute(t);
        t = {
            obj: e,
            frame: 0,
            attribute: t,
            from: o,
            to: n,
            time: r,
            effect: i
        };
        s.animations.push(t);
        e.animationX = t;
        s.interval || (s.interval = setInterval(function() {
            s.updateAnimations.call(s)
        }, AmCharts.updateRate))
    },
    updateAnimations: function() {
        var e;
        for (e = this.animations.length - 1; 0 <= e; e--) {
            var t = this.animations[e],
                n = 1e3 * t.time / AmCharts.updateRate,
                r = t.frame + 1,
                i = t.obj,
                s = t.attribute,
                o, u, a;
            r <= n ? (t.frame++, "translate" == s ? (o = t.from.split(","), s = Number(o[0]), o = Number(o[1]), u = t.to.split(","), a = Number(u[0]), u = Number(u[1]), a = 0 === a - s ? a : Math.round(this.D[t.effect](0, r, s, a - s, n)), t = 0 === u - o ? u : Math.round(this.D[t.effect](0, r, o, u - o, n)), s = "transform", t = "translate(" + a + "," + t + ")") : (o = Number(t.from), a = Number(t.to), a -= o, t = this.D[t.effect](0, r, o, a, n), 0 === a && this.animations.splice(e, 1)), this.setAttr(i, s, t)) : ("translate" == s ? (u = t.to.split(","), a = Number(u[0]), u = Number(u[1]), i.translate(a, u)) : (a = Number(t.to), this.setAttr(i, s, a)), this.animations.splice(e, 1))
        }
    },
    getBBox: function(e) {
        if (e = e.node) try {
            return e.getBBox()
        } catch (t) {}
        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        }
    },
    path: function(e, t) {
        if (t == "undefineddragIcon.gif") {} else {
            e.node.setAttributeNS(AmCharts.SVG_XLINK, "xlink:href", t)
        }
    },
    clipRect: function(e, t, n, r, i) {
        var s = e.node,
            o = e.clipPath;
        o && this.D.remove(o);
        var u = s.parentNode;
        u && (s = document.createElementNS(AmCharts.SVG_NS, "clipPath"), o = AmCharts.getUniqueId(), s.setAttribute("id", o), this.D.rect(t, n, r, i, 0, 0, s), u.appendChild(s), t = "#", AmCharts.baseHref && !AmCharts.isIE && (t = window.location.href + t), this.setAttr(e, "clip-path", "url(" + t + o + ")"), this.clipPathC++, e.clipPath = s)
    },
    text: function(e, t, n) {
        var r = new AmCharts.AmDObject("text", this.D);
        e = String(e).split("\n");
        var i = t["font-size"],
            s;
        for (s = 0; s < e.length; s++) {
            var o = this.create(null, "tspan");
            o.appendChild(document.createTextNode(e[s]));
            o.setAttribute("y", (i + 2) * s + i / 2 + 0);
            o.setAttribute("x", 0);
            r.node.appendChild(o)
        }
        r.node.setAttribute("y", i / 2 + 0);
        this.attr(r, t);
        this.D.addToContainer(r.node, n);
        return r
    },
    setText: function(e, t) {
        var n = e.node;
        n && (n.removeChild(n.firstChild), n.appendChild(document.createTextNode(t)))
    },
    move: function(e, t, n, r) {
        t = "translate(" + t + "," + n + ")";
        r && (t = t + " scale(" + r + ")");
        this.setAttr(e, "transform", t)
    },
    rotate: function(e, t) {
        var n = e.node.getAttribute("transform"),
            r = "rotate(" + t + ")";
        n && (r = n + " " + r);
        this.setAttr(e, "transform", r)
    },
    set: function(e) {
        var t = new AmCharts.AmDObject("g", this.D);
        this.D.container.appendChild(t.node);
        if (e) {
            var n;
            for (n = 0; n < e.length; n++) t.push(e[n])
        }
        return t
    },
    addListener: function(e, t, n) {
        e.node["on" + t] = n
    },
    gradient: function(e, t, n, r) {
        var i = e.node,
            s = e.grad;
        s && this.D.remove(s);
        t = document.createElementNS(AmCharts.SVG_NS, t);
        s = AmCharts.getUniqueId();
        t.setAttribute("id", s);
        if (!isNaN(r)) {
            var o = 0,
                u = 0,
                a = 0,
                f = 0;
            90 == r ? a = 100 : 270 == r ? f = 100 : 180 == r ? o = 100 : 0 === r && (u = 100);
            t.setAttribute("x1", o + "%");
            t.setAttribute("x2", u + "%");
            t.setAttribute("y1", a + "%");
            t.setAttribute("y2", f + "%")
        }
        for (r = 0; r < n.length; r++) o = document.createElementNS(AmCharts.SVG_NS, "stop"), u = 100 * r / (n.length - 1), 0 === r && (u = 0), o.setAttribute("offset", u + "%"), o.setAttribute("stop-color", n[r]), t.appendChild(o);
        i.parentNode.appendChild(t);
        n = "#";
        AmCharts.baseHref && !AmCharts.isIE && (n = window.location.href + n);
        i.setAttribute("fill", "url(" + n + s + ")");
        e.grad = t
    },
    remove: function(e) {
        e.clipPath && this.D.remove(e.clipPath);
        e.grad && this.D.remove(e.grad);
        this.D.remove(e.node)
    }
});
AmCharts.AmDSet = AmCharts.Class({
    construct: function() {
        this.create("g")
    },
    attr: function(e) {
        this.R.attr(this.node, e)
    },
    move: function(e, t) {
        this.R.move(this.node, e, t)
    }
})