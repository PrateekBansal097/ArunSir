(function () {
    var aa = function (a, b, c) {
        return a.call.apply(a.bind, arguments)
    }, ba = function (a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function () {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c)
                }
            }
            return function () {
                return a.apply(b, arguments)
            }
        }, e = function (a, b, c) {
            e = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? aa : ba;
            return e.apply(null, arguments)
        };
    var h = (new Date).getTime();
    var k = function (a) {
        a = parseFloat(a);
        return isNaN(a) || 1 < a || 0 > a ? 0 : a
    }, ca = /^([\w-]+\.)*([\w-]{2,})(\:[0-9]+)?$/,
        da = function (a, b) {
            if (!a) return b;
            var c = a.match(ca);
            return c ? c[0] : b
        };
    var ea = k("0.15"),
        fa = k("0.005"),
        ga = k("1.0"),
        ha = k("0.005"),
        ia = k("0.01");
    var ja = /^true$/.test("false") ? !0 : !1;
    var ka = function () {
        return da("", "pagead2.googlesyndication.com")
    };
    var la = /&/g,
        ma = /</g,
        pa = />/g,
        qa = /\"/g,
        ra = {
            "\x00": "\\0",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\x0B",
            '"': '\\"',
            "\\": "\\\\"
        }, l = {
            "'": "\\'"
        };
    var sa = window,
        n, ta = null,
        r = document.getElementsByTagName("script");
    r && r.length && (ta = r[r.length - 1].parentNode);
    n = ta;
    ka();
    var ua = function (a, b) {
        for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.call(null, a[c], c, a)
    }, s = function (a) {
            return !!a && "function" == typeof a && !! a.call
        }, va = function (a, b) {
            if (!(2 > arguments.length))
                for (var c = 1, d = arguments.length; c < d; ++c) a.push(arguments[c])
        };

    function wa(a, b) {
        xa(a, "load", b)
    }
    var xa = function (a, b, c, d) {
        return a.addEventListener ? (a.addEventListener(b, c, d || !1), !0) : a.attachEvent ? (a.attachEvent("on" + b, c), !0) : !1
    }, ya = function (a, b, c, d) {
            c = e(d, c);
            return xa(a, b, c, void 0) ? c : null
        }, za = function (a, b, c) {
            a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c)
        }, u = function (a, b) {
            if (!(1E-4 > Math.random())) {
                var c = Math.random();
                if (c < b) return a[Math.floor(c / b * a.length)]
            }
            return null
        }, Aa = function (a) {
            try {
                return !!a.location.href || "" === a.location.href
            } catch (b) {
                return !1
            }
        };
    var Ba = null,
        Ca = function () {
            if (!Ba) {
                for (var a = window, b = a, c = 0; a != a.parent;)
                    if (a = a.parent, c++, Aa(a)) b = a;
                    else break;
                Ba = b
            }
            return Ba
        };
    var v, w = function (a) {
            this.c = [];
            this.b = a || window;
            this.a = 0;
            this.d = null
        }, Da = function (a, b) {
            this.l = a;
            this.win = b
        };
    w.prototype.p = function (a, b) {
        0 != this.a || 0 != this.c.length || b && b != window ? this.g(a, b) : (this.a = 2, this.f(new Da(a, window)))
    };
    w.prototype.g = function (a, b) {
        this.c.push(new Da(a, b || this.b));
        Ea(this)
    };
    w.prototype.q = function (a) {
        this.a = 1;
        a && (this.d = this.b.setTimeout(e(this.e, this), a))
    };
    w.prototype.e = function () {
        1 == this.a && (null != this.d && (this.b.clearTimeout(this.d), this.d = null), this.a = 0);
        Ea(this)
    };
    w.prototype.r = function () {
        return !0
    };
    w.prototype.nq = w.prototype.p;
    w.prototype.nqa = w.prototype.g;
    w.prototype.al = w.prototype.q;
    w.prototype.rl = w.prototype.e;
    w.prototype.sz = w.prototype.r;
    var Ea = function (a) {
        a.b.setTimeout(e(a.o, a), 0)
    };
    w.prototype.o = function () {
        if (0 == this.a && this.c.length) {
            var a = this.c.shift();
            this.a = 2;
            a.win.setTimeout(e(this.f, this, a), 0);
            Ea(this)
        }
    };
    w.prototype.f = function (a) {
        this.a = 0;
        a.l()
    };
    var Fa = function (a) {
        try {
            return a.sz()
        } catch (b) {
            return !1
        }
    }, Ga = function (a) {
            return !!a && ("object" == typeof a || "function" == typeof a) && Fa(a) && s(a.nq) && s(a.nqa) && s(a.al) && s(a.rl)
        }, Ha = function () {
            if (v && Fa(v)) return v;
            var a = Ca(),
                b = a.google_jobrunner;
            return Ga(b) ? v = b : a.google_jobrunner = v = new w(a)
        }, Ia = function (a, b) {
            Ha().nq(a, b)
        }, Ja = function (a, b) {
            Ha().nqa(a, b)
        };
    var Ka = /MSIE [2-7]|PlayStation|Gecko\/20090226|Android 2\./i,
        La = /Android|Opera/;
    var Ma = function (a, b, c) {
        c || (c = ja ? "https" : "http");
        return [c, "://", a, b].join("")
    };
    var Na = function () {}, Pa = function (a, b, c) {
            switch (typeof b) {
            case "string":
                Oa(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? b : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "undefined":
                c.push("null");
                break;
            case "object":
                if (null == b) {
                    c.push("null");
                    break
                }
                if (b instanceof Array) {
                    var d = b.length;
                    c.push("[");
                    for (var f = "", g = 0; g < d; g++) c.push(f), Pa(a, b[g], c), f = ",";
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (f in b) b.hasOwnProperty(f) && (g = b[f], "function" != typeof g && (c.push(d), Oa(f, c), c.push(":"), Pa(a, g, c),
                    d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof b);
            }
        }, Qa = {
            '"': '\\"',
            "\\": "\\\\",
            "/": "\\/",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\u000b"
        }, Ra = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g,
        Oa = function (a, b) {
            b.push('"');
            b.push(a.replace(Ra, function (a) {
                if (a in Qa) return Qa[a];
                var b = a.charCodeAt(0),
                    f = "\\u";
                16 > b ? f += "000" : 256 > b ? f += "00" : 4096 > b && (f += "0");
                return Qa[a] = f + b.toString(16)
            }));
            b.push('"')
        };
    var x = "google_ad_block google_ad_channel google_ad_client google_ad_format google_ad_height google_ad_host google_ad_host_channel google_ad_host_tier_id google_ad_output google_ad_override google_ad_region google_ad_section google_ad_slot google_ad_type google_ad_width google_adtest google_allow_expandable_ads google_alternate_ad_url google_alternate_color google_analytics_domain_name google_analytics_uacct google_bid google_city google_color_bg google_color_border google_color_line google_color_link google_color_text google_color_url google_container_id google_contents google_country google_cpm google_ctr_threshold google_cust_age google_cust_ch google_cust_gender google_cust_id google_cust_interests google_cust_job google_cust_l google_cust_lh google_cust_u_url google_disable_video_autoplay google_ed google_eids google_enable_ose google_encoding google_font_face google_font_size google_frame_id google_gl google_hints google_image_size google_kw google_kw_type google_lact google_language google_loeid google_max_num_ads google_max_radlink_len google_mtl google_num_radlinks google_num_radlinks_per_unit google_num_slots_to_rotate google_only_ads_with_video google_only_pyv_ads google_only_userchoice_ads google_override_format google_page_url google_previous_watch google_previous_searches google_referrer_url google_region google_reuse_colors google_rl_dest_url google_rl_filtering google_rl_mode google_rt google_safe google_sc_id google_scs google_sui google_skip google_tag_info google_targeting google_tdsma google_tfs google_tl google_ui_features google_ui_version google_video_doc_id google_video_product_type google_with_pyv_ads google_yt_pt google_yt_up".split(" "),
        Sa = function () {
            var a = y;
            a.google_page_url && (a.google_page_url = String(a.google_page_url));
            var b = [];
            ua(a, function (a, d) {
                if (null != a) {
                    var f;
                    try {
                        var g = [];
                        Pa(new Na, a, g);
                        f = g.join("")
                    } catch (p) {}
                    f && va(b, d, "=", f, ";")
                }
            });
            return b.join("")
        };
    var Ta = /\.((google(|groups|mail|images|print))|gmail)\./,
        Ua = function () {
            var a = z,
                b = Ta.test(a.location.host);
            return !(!a.postMessage || !a.localStorage || !a.JSON || b)
        };
    var Va = function (a) {
        this.b = a;
        a.google_iframe_oncopy || (a.google_iframe_oncopy = {
            handlers: {}
        });
        this.m = a.google_iframe_oncopy
    }, Wa;
    var A = "var i=this.id,s=window.google_iframe_oncopy,H=s&&s.handlers,h=H&&H[i],w=this.contentWindow,d;try{d=w.document}catch(e){}if(h&&d&&(!d.body||!d.body.firstChild)){if(h.call){setTimeout(h,0)}else if(h.match){w.location.replace(h)}}";
    /[&<>\"]/.test(A) && (-1 != A.indexOf("&") && (A = A.replace(la, "&amp;")), -1 != A.indexOf("<") && (A = A.replace(ma, "&lt;")), -1 != A.indexOf(">") && (A = A.replace(pa, "&gt;")), -1 != A.indexOf('"') && (A = A.replace(qa, "&quot;")));
    Wa = A;
    Va.prototype.set = function (a, b) {
        this.m.handlers[a] = b;
        this.b.addEventListener && !/MSIE/.test(navigator.userAgent) && this.b.addEventListener("load", e(this.n, this, a), !1)
    };
    Va.prototype.n = function (a) {
        a = this.b.document.getElementById(a);
        var b = a.contentWindow.document;
        if (a.onload && b && (!b.body || !b.body.firstChild)) a.onload()
    };
    var Ya = function (a) {
        a = a.google_unique_id;
        return "number" == typeof a ? a : 0
    }, Za = function () {
            var a = "script";
            return ["<", a, ' src="', Ma(ka(), "/pagead/js/r20130613/r20130206/show_ads_impl.js", ""), '"></', a, ">"].join("")
        }, $a = function (a, b, c, d) {
            return function () {
                var f = !1;
                d && Ha().al(3E4);
                try {
                    if (Aa(a.document.getElementById(b).contentWindow)) {
                        var g = a.document.getElementById(b).contentWindow,
                            p = g.document;
                        p.body && p.body.firstChild || (p.open(), g.google_async_iframe_close = !0, p.write(c))
                    } else {
                        var P = a.document.getElementById(b).contentWindow,
                            na;
                        g = c;
                        g = String(g);
                        if (g.quote) na = g.quote();
                        else {
                            for (var p = ['"'], Q = 0; Q < g.length; Q++) {
                                var R = g.charAt(Q),
                                    Xa = R.charCodeAt(0),
                                    Xb = p,
                                    Yb = Q + 1,
                                    oa;
                                if (!(oa = ra[R])) {
                                    var C;
                                    if (31 < Xa && 127 > Xa) C = R;
                                    else {
                                        var q = R;
                                        if (q in l) C = l[q];
                                        else if (q in ra) C = l[q] = ra[q];
                                        else {
                                            var m = q,
                                                t = q.charCodeAt(0);
                                            if (31 < t && 127 > t) m = q;
                                            else {
                                                if (256 > t) {
                                                    if (m = "\\x", 16 > t || 256 < t) m += "0"
                                                } else m = "\\u", 4096 > t &&
                                                    (m += "0");
                                                m += t.toString(16).toUpperCase()
                                            }
                                            C = l[q] = m
                                        }
                                    }
                                    oa = C
                                }
                                Xb[Yb] = oa
                            }
                            p.push('"');
                            na = p.join("")
                        }
                        P.location.replace("javascript:" + na)
                    }
                    f = !0
                } catch (mc) {
                    P = Ca().google_jobrunner, Ga(P) && P.rl()
                }
                f && (new Va(a)).set(b, $a(a, b, c, !1))
            }
        }, ab = function () {
            var a = ["<iframe"];
            ua(B, function (b, c) {
                a.push(" " + c + '="' + (null == b ? "" : b) + '"')
            });
            a.push("></iframe>");
            return a.join("")
        }, db = function (a, b) {
            var c = bb,
                d = b ? '"' : "",
                f = d + "0" + d;
            a.width = d + cb + d;
            a.height = d + c + d;
            a.frameborder = f;
            a.marginwidth = f;
            a.marginheight = f;
            a.vspace = f;
            a.hspace = f;
            a.allowtransparency =
                d + "true" + d;
            a.scrolling = d + "no" + d
        }, eb = Math.floor(1E6 * Math.random()),
        fb = function (a) {
            for (var b = a.data.split("\n"), c = {}, d = 0; d < b.length; d++) {
                var f = b[d].indexOf("="); - 1 != f && (c[b[d].substr(0, f)] = b[d].substr(f + 1))
            }
            b = c[3];
            if (c[1] == eb && (window.google_top_js_status = 4, a.source == top && 0 == b.indexOf(a.origin) && (window.google_top_values = c, window.google_top_js_status = 5), window.google_top_js_callbacks)) {
                for (a = 0; a < window.google_top_js_callbacks.length; a++) window.google_top_js_callbacks[a]();
                window.google_top_js_callbacks.length =
                    0
            }
        };
    var gb = function (a, b, c) {
        this.x = a;
        this.y = b;
        this.z = c
    }, hb = function (a, b, c) {
            this.beta = a;
            this.gamma = b;
            this.alpha = c
        }, jb = function () {
            var a = D,
                b = ib;
            this.deviceAccelerationWithGravity = this.deviceAccelerationWithoutGravity = null;
            this.deviceMotionEventCallbacks = [];
            this.deviceOrientation = null;
            this.deviceOrientationEventCallbacks = [];
            this.isDeviceOrientationEventListenerRegistered = this.isDeviceMotionEventListenerRegistered = this.didDeviceOrientationCallbacksTimeoutExpire = this.didDeviceMotionCallbacksTimeoutExpire = !1;
            this.registeredMozOrientationEventListener = this.registeredDeviceOrientationEventListener = this.registeredDeviceMotionEventListener = null;
            this.sensorsExperiment = b;
            this.stopTimeStamp = this.startTimeStamp = null;
            this.win = a
        }, E = function (a) {
            this.a = a;
            this.a.win.DeviceOrientationEvent ? (this.a.registeredDeviceOrientationEventListener = ya(this.a.win, "deviceorientation", this, this.j), this.a.isDeviceOrientationEventListenerRegistered = !0) : this.a.win.OrientationEvent && (this.a.registeredMozOrientationEventListener = ya(this.a.win,
                "MozOrientation", this, this.k), this.a.isDeviceOrientationEventListenerRegistered = !0);
            this.a.win.DeviceMotionEvent && (this.a.registeredDeviceMotionEventListener = ya(this.a.win, "devicemotion", this, this.i), this.a.isDeviceMotionEventListenerRegistered = !0)
        };
    E.prototype.i = function (a) {
        a.acceleration && (this.a.deviceAccelerationWithoutGravity = new gb(a.acceleration.x, a.acceleration.y, a.acceleration.z));
        a.accelerationIncludingGravity && (this.a.deviceAccelerationWithGravity = new gb(a.accelerationIncludingGravity.x, a.accelerationIncludingGravity.y, a.accelerationIncludingGravity.z));
        kb(this.a.deviceMotionEventCallbacks);
        za(this.a.win, "devicemotion", this.a.registeredDeviceMotionEventListener)
    };
    E.prototype.j = function (a) {
        this.a.deviceOrientation = new hb(a.beta, a.gamma, a.alpha);
        kb(this.a.deviceOrientationEventCallbacks);
        za(this.a.win, "deviceorientation", this.a.registeredDeviceOrientationEventListener)
    };
    E.prototype.k = function (a) {
        this.a.deviceOrientation = new hb(-90 * a.y, 90 * a.x, null);
        kb(this.a.deviceOrientationEventCallbacks);
        za(this.a.win, "MozOrientation", this.a.registeredMozOrientationEventListener)
    };
    var kb = function (a) {
        for (var b = 0; b < a.length; ++b) a[b]();
        a.length = 0
    };
    (function (a) {
        "google_onload_fired" in a || (a.google_onload_fired = !1, wa(a, function () {
            a.google_onload_fired = !0
        }))
    })(window);
    if (!window.google_top_experiment) {
        var lb = window;
        if (2 !== (lb.top == lb ? 0 : Aa(lb.top) ? 1 : 2)) window.google_top_js_status = 0;
        else if (top.postMessage) {
            var mb;
            try {
                mb = top.frames.google_top_static_frame ? !0 : !1
            } catch (nb) {
                mb = !1
            }
            if (mb) {
                if (window.google_top_experiment = u(["jp_c", "jp_zl"], ea) || "jp_wfpmr", "jp_zl" === window.google_top_experiment || "jp_wfpmr" === window.google_top_experiment) {
                    xa(window, "message", fb);
                    window.google_top_js_status = 3;
                    var ob = {
                        0: "google_loc_request",
                        1: eb
                    }, pb = [],
                        qb;
                    for (qb in ob) pb.push(qb + "=" + ob[qb]);
                    top.postMessage(pb.join("\n"), "*")
                }
            } else window.google_top_js_status = 2
        } else window.google_top_js_status = 1
    }
    var rb = !1;
    if (navigator && navigator.userAgent) var sb = navigator.userAgent,
    rb = 0 != sb.indexOf("Opera") && -1 != sb.indexOf("WebKit") && -1 != sb.indexOf("Mobile");
    if (rb) {
        var D = window;
        if (!/Android/.test(D.navigator.userAgent) && 0 == Ya(D) && !D.google_sensors) {
            var ib, tb = null,
                ub = D;
            ub.google_top_experiment && "jp_c" != ub.google_top_experiment || (tb = u(["ds_c", "ds_zl", "ds_wfea"], ia));
            if (ib = tb) D.google_sensors = new jb, "ds_c" != ib && new E(D.google_sensors)
        }
    }
    var vb;
    if (!(vb = !1 === window.google_enable_async)) {
        var wb;
        var xb = navigator.userAgent;
        Ka.test(xb) ? wb = !1 : (void 0 !== window.google_async_for_oa_experiment || (!La.test(navigator.userAgent) || Ka.test(navigator.userAgent)) || (window.google_async_for_oa_experiment = u(["C", "E"], ha)), wb = La.test(xb) ? "E" === window.google_async_for_oa_experiment : !0);
        vb = !wb || window.google_container_id || window.google_ad_output && "html" != window.google_ad_output
    }
    if (vb) window.google_loader_used = "sb", window.google_start_time = h, document.write(Za());
    else {
        var yb = window;
        yb.google_unique_id ? ++yb.google_unique_id : yb.google_unique_id = 1;
        for (var z = window, y, zb = {}, Ab = 0, Bb = x.length; Ab < Bb; Ab++) {
            var Cb = x[Ab];
            null != z[Cb] && (zb[Cb] = z[Cb])
        }
        y = zb;
        y.google_loader_used = "sa";
        for (var Db = 0, Eb = x.length; Db < Eb; Db++) z[x[Db]] = null;
        var cb = y.google_ad_width,
            bb = y.google_ad_height,
            F = {};
        db(F, !0);
        F.onload = '"' + Wa + '"';
        for (var G, Fb = y, Gb = z.document, H = F.id, Hb = 0; !H || Gb.getElementById(H);) H = "aswift_" +
            Hb++;
        F.id = H;
        F.name = H;
        var Ib = Fb.google_ad_width,
            Jb = Fb.google_ad_height,
            I = ["<iframe"],
            J;
        for (J in F) F.hasOwnProperty(J) && va(I, J + "=" + F[J]);
        I.push('style="left:0;position:absolute;top:0;"');
        I.push("></iframe>");
        var Kb = "border:none;height:" + Jb + "px;margin:0;padding:0;position:relative;visibility:visible;width:" + Ib + "px";
        Gb.write(['<ins style="display:inline-table;', Kb, '"><ins id="', F.id + "_anchor", '" style="display:block;', Kb, '">', I.join(" "), "</ins></ins>"].join(""));
        G = F.id;
        var Lb = Sa(),
            K = y,
            Mb = K.google_ad_output,
            L = K.google_ad_format;
        L || "html" != Mb && null != Mb || (L = K.google_ad_width + "x" + K.google_ad_height);
        var Nb = !K.google_ad_slot || K.google_override_format || "aa" == K.google_loader_used,
            L = L && Nb ? L.toLowerCase() : "";
        K.google_ad_format = L;
        var M, N = y || sa,
            Ob = [N.google_ad_slot, N.google_ad_format, N.google_ad_type, N.google_ad_width, N.google_ad_height];
        if (n) {
            var O;
            if (n) {
                for (var Pb = [], Qb = 0, S = n; S && 25 > Qb; S = S.parentNode, ++Qb) Pb.push(9 != S.nodeType && S.id || "");
                O = Pb.join()
            } 