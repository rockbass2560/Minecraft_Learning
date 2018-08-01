! function e(t, n, o) {
    function a(r, s) {
        if (!n[r]) {
            if (!t[r]) {
                var p = "function" == typeof require && require;
                if (!s && p) return p(r, !0);
                if (i) return i(r, !0);
                var c = new Error("Cannot find module '" + r + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var l = n[r] = {
                exports: {}
            };
            t[r][0].call(l.exports, function(e) {
                var n = t[r][1][e];
                return a(n ? n : e)
            }, l, l.exports, e, t, n, o)
        }
        return n[r].exports
    }
    for (var i = "function" == typeof require && require, r = 0; r < o.length; r++) a(o[r]);
    return a
}({
    1: [function(e, t) {
        function n(e) {
            var t = $(e).attr("clip-path");
            return t ? t.match(/\(\#(.*)\)/)[1] : void 0
        }

        function o(e, t) {
            var o = $('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" />');
            t && o.attr("class", t);
            var a = n(e),
                i = $("#" + a);
            i.insertAfter(e).add(e).wrapAll(o)
        }

        function a() {
            var e, t = $("#visualization>svg")[0];
            if (t) {
                var a = {},
                    i = {},
                    r = new WebKitMutationObserver(function(t) {
                        t.forEach(function(t) {
                            for (e = 0; e < t.addedNodes.length; e++) {
                                var n = t.addedNodes[e];
                                "image" == n.nodeName && (a[$(n).attr("id")] = n), "clipPath" == n.nodeName && (i[$(n).attr("id")] = n)
                            }
                            for (e = 0; e < t.removedNodes.length; e++) {
                                var o = t.removedNodes[e];
                                ("image" == o.nodeName || "clipPath" == o.nodeName) && $("svg > svg:empty").remove()
                            }
                        }), $.each(a, function(e, t) {
                            var r = n(t);
                            i.hasOwnProperty(r) && (o(t), delete a[e], delete i[r])
                        })
                    });
                r.observe(t, {
                    childList: !0
                })
            }
        }

        function i() {
            $("[clip-path]").each(function(e, t) {
                $(t).attr("class") === r ? ($(t).attr("class", ""), o(t, r)) : o(t)
            })
        }
        var r = "pegman-location";
        t.exports = {
            fixup: function() {
                i(), a()
            }
        }
    }, {}],
    2: [function(e, t) {
        var n = {
            api_base_url: "/v3/channels",
            all: function(e) {
                $.ajax({
                    url: this.api_base_url,
                    type: "get",
                    dataType: "json"
                }).done(function(t) {
                    e(null, t)
                }).fail(function(t, n, o) {
                    var a = new Error("status: " + n + "; error: " + o);
                    e(a, null)
                })
            },
            create: function(e, t) {
                $.ajax({
                    url: this.api_base_url,
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(e)
                }).done(function(e) {
                    t(null, e)
                }).fail(function(e, n, o) {
                    var a = new Error("status: " + n + "; error: " + o);
                    t(a, void 0)
                })
            },
            "delete": function(e, t) {
                $.ajax({
                    url: this.api_base_url + "/" + e + "/delete",
                    type: "post",
                    dataType: "json"
                }).done(function() {
                    t(null, !0)
                }).fail(function(e, n, o) {
                    var a = new Error("status: " + n + "; error: " + o);
                    t(a, !1)
                })
            },
            fetch: function(e, t) {
                $.ajax({
                    url: this.api_base_url + "/" + e,
                    type: "get",
                    dataType: "json"
                }).done(function(e) {
                    t(null, e)
                }).fail(function(e, n, o) {
                    var a = new Error("status: " + n + "; error: " + o);
                    t(a, void 0)
                })
            },
            update: function(e, t, n) {
                $.ajax({
                    url: this.api_base_url + "/" + e,
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(t)
                }).done(function(e) {
                    n(null, e)
                }).fail(function(e, t, o) {
                    var a = new Error("status: " + t + "; error: " + o);
                    n(a, !1)
                })
            },
            copyAll: function(e, t, n) {
                $.ajax({
                    url: this.api_base_url + "/" + t + "?src=" + e,
                    type: "put"
                }).done(function(e) {
                    n(null, e)
                }).fail(function(e, t, o) {
                    var a = new Error("status: " + t + "; error: " + o);
                    n(a, !1)
                })
            },
            put: function(e, t, n, o) {
                $.ajax({
                    url: this.api_base_url + "/" + e + "/" + n,
                    type: "put",
                    contentType: "application/json; charset=utf-8",
                    data: t
                }).done(function(e) {
                    o(null, e)
                }).fail(function(e, t, n) {
                    var a = new Error("status: " + t + "; error: " + n);
                    o(a, !1)
                })
            },
            patchAll: function(e, t, n, o) {
                $.ajax({
                    url: this.api_base_url + "/" + e + "/?" + t,
                    type: "patch",
                    contentType: "application/json; charset=utf-8",
                    data: n
                }).done(function(e) {
                    o(null, e)
                }).fail(function(e, t, n) {
                    var a = new Error("status: " + t + "; error: " + n);
                    o(a, !1)
                })
            }
        };
        t.exports = {
            create: function(e) {
                return $.extend({}, n, {
                    api_base_url: e
                })
            }
        }
    }, {}],
    3: [function(require, module, exports) {
        var timing = require("./timing"),
            chrome34Fix = require("./chrome34Fix"),
            loadApp = require("./loadApp"),
            project = require("./project");
        window.apps = {
            load: loadApp,
            setupApp: function(appOptions) {
                if (!window.dashboard) throw new Error("Assume existence of window.dashboard");
                dashboard.project = project, timing.startTiming("Puzzle", script_path, "");
                var lastSavedProgram, baseOptions = {
                    containerId: "codeApp",
                    Dialog: Dialog,
                    cdoSounds: CDOSounds,
                    position: {
                        blockYCoordinateInterval: 25
                    },
                    onInitialize: function() {
                        dashboard.createCallouts(this.level.callouts || this.callouts), window.dashboard.isChrome34 && chrome34Fix.fixup(), (appOptions.level.projectTemplateLevelName || "applab" === appOptions.app) && ($("#clear-puzzle-header").hide(), $("#versions-header").show()), $(document).trigger("appInitialized")
                    },
                    onAttempt: function(e) {
                        appOptions.level.isProjectLevel || (appOptions.channel ? (delete e.program, delete e.image) : (lastSavedProgram = decodeURIComponent(e.program), dashboard.clientState.writeSourceForLevel(appOptions.scriptName, appOptions.serverLevelId, +new Date, lastSavedProgram)), e.scriptName = appOptions.scriptName, e.fallbackResponse = appOptions.report.fallback_response, e.callback = appOptions.report.callback, trackEvent("Puzzle", "Attempt", script_path, e.pass ? 1 : 0), e.pass && (trackEvent("Puzzle", "Success", script_path, e.attempt), timing.stopTiming("Puzzle", script_path, "")), trackEvent("Activity", "Lines of Code", script_path, e.lines), sendReport(e))
                    },
                    onComplete: function(e) {
                        appOptions.channel || dashboard.clientState.writeSourceForLevel(appOptions.scriptName, appOptions.serverLevelId, e.timestamp, lastSavedProgram)
                    },
                    onResetPressed: function() {
                        cancelReport()
                    },
                    onContinue: function() {
                        lastServerResponse.videoInfo ? showVideoDialog(lastServerResponse.videoInfo) : lastServerResponse.nextRedirect && (window.location.href = lastServerResponse.nextRedirect)
                    },
                    backToPreviousLevel: function() {
                        lastServerResponse.previousLevelRedirect && (window.location.href = lastServerResponse.previousLevelRedirect)
                    },
                    showInstructionsWrapper: function(e) {
                        if (!this.share && !appOptions.level.skipInstructionsPopup) {
                            var t = e;
                            appOptions.level.afterVideoBeforeInstructionsFn && (t = function() {
                                appOptions.level.afterVideoBeforeInstructionsFn(e)
                            });
                            var n = !!appOptions.autoplayVideo,
                                o = !(!appOptions.level.instructions && !appOptions.level.aniGifURL);
                            n ? (o && (appOptions.autoplayVideo.onClose = t), showVideoDialog(appOptions.autoplayVideo)) : o && t()
                        }
                    }
                };
                $.extend(!0, appOptions, baseOptions),
                    function fixUpFunctions(node) {
                        if ("object" == typeof node)
                            for (var i in node)
                                if (/^fn_/.test(i)) try {
                                    node[i.replace(/^fn_/, "")] = eval("(" + node[i] + ")")
                                } catch (e) {} else fixUpFunctions(node[i])
                    }(appOptions.level)
            },
            setupProjectsExternal: function() {
                if (!window.dashboard) throw new Error("Assume existence of window.dashboard");
                dashboard.project = project
            },
            sourceHandler: {
                setInitialLevelHtml: function(e) {
                    appOptions.level.levelHtml = e
                },
                getLevelHtml: function() {
                    return window.Applab && Applab.getHtml()
                },
                setInitialLevelSource: function(e) {
                    appOptions.level.lastAttempt = e
                },
                getLevelSource: function(e) {
                    var t;
                    return t = window.Blockly ? Blockly.readOnly ? e : Blockly.Xml.domToText(Blockly.Xml.blockSpaceToDom(Blockly.mainBlockSpace)) : window.Applab && Applab.getCode()
                }
            },
            init: function() {
                dashboard.project.init(window.apps.sourceHandler), window[appOptions.app + "Main"](appOptions)
            }
        }
    }, {
        "./chrome34Fix": 1,
        "./loadApp": 4,
        "./project": 5,
        "./timing": 7
    }],
    4: [function(e, t) {
        function n(e) {
            "Jigsaw" !== appOptions.levelGameName && (appOptions.level.lastAttempt = e)
        }
        var o = e("./renderAbusive"),
            a = 5e3;
        t.exports = function(e) {
            var t = !1,
                i = function() {
                    t || (t = !0, n(dashboard.clientState.sourceForLevel(appOptions.scriptName, appOptions.serverLevelId)), e())
                },
                r = "true" === dashboard.clientState.queryParams("solution"),
                s = !!dashboard.clientState.queryParams("user_id");
            appOptions.channel || r || s ? window.dashboard && dashboard.project ? dashboard.project.load().then(function() {
                return dashboard.project.hideBecauseAbusive() ? (o(), $.Deferred().reject()) : void 0
            }).then(e) : i() : (appOptions.publicCaching && (appOptions.disableSocialShare = !0), $.ajax("/api/user_progress/" + appOptions.scriptName + "/" + appOptions.stagePosition + "/" + appOptions.levelPosition).done(function(o) {
                appOptions.disableSocialShare = o.disableSocialShare;
                var a = o.progress || {},
                    r = dashboard.clientState.allLevelsProgress()[appOptions.scriptName] || {};
                if (Object.keys(a).forEach(function(e) {
                        if (a[e] !== r[e]) {
                            var t = mergedActivityCssClass(r[e], a[e]);
                            $("#header-level-" + e).attr("class", "level_link " + t), dashboard.clientState.trackProgress(null, null, a[e], appOptions.scriptName, e)
                        }
                    }), !t)
                    if (o.lastAttempt) {
                        t = !0;
                        var s = o.lastAttempt.timestamp,
                            p = o.lastAttempt.source,
                            c = dashboard.clientState.sourceForLevel(appOptions.scriptName, appOptions.serverLevelId, s);
                        void 0 !== c ? n(c) : p && p.length && (n(p), dashboard.clientState.writeSourceForLevel(appOptions.scriptName, appOptions.serverLevelId, s, p)), e()
                    } else i()
            }).fail(i), setTimeout(i, a))
        }
    }, {
        "./renderAbusive": 6
    }],
    5: [function(e, t) {
        function n() {
            return JSON.stringify(S)
        }

        function o(e) {
            S = {
                source: e.source,
                html: e.html
            }
        }

        function a(e, t) {
            delete e.levelSource, delete e.levelHtml, delete e.html, u = e, P.setTitle(u.name), e.migratedToS3 ? w.fetch(u.id + "/" + b, function(e, n) {
                o(n), t()
            }) : t()
        }

        function i(e) {
            g.fetch(u.id + "/abuse", function(t, n) {
                if (y = n && n.abuse_score || y, e(), t) throw t
            })
        }

        function r(e, t) {
            "function" == typeof e && e(t)
        }

        function s() {
            return u && u.isOwner && !u.frozen
        }

        function p() {
            var e = l();
            if (e.action && u) {
                var t;
                return "view" === e.action && s() ? (t = location.href.replace(/(\/projects\/[^/]+\/[^/]+)\/view/, "$1/edit"), appOptions.readonlyWorkspace = !1, A = !0) : "edit" !== e.action || s() || (t = location.href.replace(/(\/projects\/[^/]+\/[^/]+)\/edit/, "$1/view"), appOptions.readonlyWorkspace = !0, A = !1), t && t !== location.href && window.history.pushState && window.history.pushState({
                    modified: !0
                }, document.title, t), !1
            }
        }

        function c() {
            var e = location.href.replace("#", "/");
            return e === location.href ? !1 : (l(), location.href = e, !0)
        }

        function l() {
            var e = location.pathname;
            return location.hash && (e += location.hash.replace("#", "/")), "p" !== e.split("/")[j.PROJECTS] && "projects" !== e.split("/")[j.PROJECTS] ? {
                appName: null,
                channelId: null,
                action: null
            } : {
                appName: e.split("/")[j.APP],
                channelId: e.split("/")[j.CHANNEL_ID],
                action: e.split("/")[j.ACTION]
            }
        }
        var u, d, h = 3e4,
            f = 10,
            v = !1,
            m = e("./clientApi").create("/v3/assets"),
            w = e("./clientApi").create("/v3/sources"),
            g = e("./clientApi").create("/v3/channels"),
            b = "main.json",
            O = {
                appModeChanged: "appModeChanged",
                appInitialized: "appInitialized",
                workspaceChange: "workspaceChange"
            },
            j = {
                START: 0,
                PROJECTS: 1,
                APP: 2,
                CHANNEL_ID: 3,
                ACTION: 4
            },
            y = 0,
            A = !1,
            S = {
                source: null,
                html: null
            },
            P = t.exports = {
                getCurrentId: function() {
                    return u ? u.id : void 0
                },
                getCurrentName: function() {
                    return u ? u.name : void 0
                },
                getCurrentTimestamp: function() {
                    return u ? u.updatedAt : void 0
                },
                getAbuseScore: function() {
                    return y
                },
                adminResetAbuseScore: function() {
                    var e = this.getCurrentId();
                    e && g["delete"](e + "/abuse", function(t) {
                        if (t) throw t;
                        m.patchAll(e, "abuse_score=0", null, function(e) {
                            if (e) throw e;
                            $(".admin-abuse-score").text(0)
                        })
                    })
                },
                isFrozen: function() {
                    return u ? u.frozen : void 0
                },
                isOwner: function() {
                    return u && u.isOwner
                },
                exceedsAbuseThreshold: function() {
                    return y >= f
                },
                hideBecauseAbusive: function() {
                    if (!this.exceedsAbuseThreshold() || appOptions.scriptId) return !1;
                    var e = l().action;
                    return !this.isOwner() && !appOptions.isAdmin || "edit" !== e && "view" !== e ? !0 : !1
                },
                isEditing: function() {
                    return A
                },
                isProjectLevel: function() {
                    return appOptions.level && appOptions.level.isProjectLevel
                },
                shouldUpdateHeaders: function() {
                    return !appOptions.isExternalProjectLevel
                },
                showProjectHeader: function() {
                    this.shouldUpdateHeaders() && dashboard.header.showProjectHeader()
                },
                showAdmin: function() {
                    dashboard.admin.showProjectAdmin()
                },
                showMinimalProjectHeader: function() {
                    this.shouldUpdateHeaders() && dashboard.header.showMinimalProjectHeader()
                },
                showProjectLevelHeader: function() {
                    this.shouldUpdateHeaders() && dashboard.header.showProjectLevelHeader()
                },
                setName: function(e) {
                    u = u || {}, e && (u.name = e, this.setTitle(e))
                },
                setTitle: function(e) {
                    e && appOptions.gameDisplayName && (document.title = e + " - " + appOptions.gameDisplayName)
                },
                init: function(e) {
                    this.sourceHandler = e, c() || p() || (this.isProjectLevel() || u ? (S.html && e.setInitialLevelHtml(S.html), A ? (u ? S.source && e.setInitialLevelSource(S.source) : this.setName("My Project"), $(window).on(O.appModeChanged, function(e, t) {
                        this.save(t)
                    }.bind(this)), $(window).on(O.appInitialized, function() {
                        S.source = this.sourceHandler.getLevelSource(S.source)
                    }.bind(this)), $(window).on(O.workspaceChange, function() {
                        v = !0
                    }), window.setInterval(this.autosave_.bind(this), h), u.hidden || (u.isOwner || !l().channelId ? this.showProjectHeader() : this.showMinimalProjectHeader())) : u && (this.sourceHandler.setInitialLevelSource(S.source), this.showMinimalProjectHeader())) : appOptions.isLegacyShare && this.getStandaloneApp() && (this.setName("Untitled Project"), this.showMinimalProjectHeader()), appOptions.noPadding && $(".full_container").css({
                        padding: "0px"
                    }), this.showAdmin())
                },
                projectChanged: function() {
                    v = !0
                },
                getStandaloneApp: function() {
                    switch (appOptions.app) {
                        case "applab":
                            return "applab";
                        case "turtle":
                            return "artist";
                        case "calc":
                            return "calc";
                        case "eval":
                            return "eval";
                        case "studio":
                            return appOptions.level.useContractEditor ? "algebra_game" : "hoc2015" === appOptions.skinId || "infinity" === appOptions.skinId ? null : "playlab";
                        default:
                            return null
                    }
                },
                appToProjectUrl: function() {
                    var e = P.getStandaloneApp();
                    if (!e) throw new Error("This type of project cannot be run as a standalone app.");
                    return "/projects/" + e
                },
                clearHtml: function() {
                    S.html = ""
                },
                save: function(e, t, a) {
                    if (!u || u.isOwner !== !1) {
                        if ("function" == typeof arguments[0] || !e) {
                            var i = Array.prototype.slice.apply(arguments);
                            t = i[0], a = i[1], e = {
                                source: this.sourceHandler.getLevelSource(),
                                html: this.sourceHandler.getLevelHtml()
                            }
                        }
                        a && (d = null), $(".project_updated_at").text("Saving...");
                        var s = u.id;
                        if (S.html && !e.html) throw new Error("Attempting to blow away existing levelHtml");
                        o(e), this.getStandaloneApp() && (u.level = this.appToProjectUrl());
                        var p = b + (d ? "?version=" + d : "");
                        w.put(s, n(), p, function(e, n) {
                            d = n.versionId, u.migratedToS3 = !0, g.update(s, u, function(e, n) {
                                this.updateCurrentData_(e, n, !1), r(t, n)
                            }.bind(this))
                        }.bind(this))
                    }
                },
                updateCurrentData_: function(e, t, n) {
                    return e ? void $(".project_updated_at").text("Error saving project") : (u = t, n && (A && l().appName ? window.history.pushState && window.history.pushState(null, document.title, this.getPathName("edit")) : location.href = this.getPathName("edit")), void dashboard.header.updateTimestamp())
                },
                autosave_: function() {
                    if (null !== S.source && (appOptions.droplet || v) && 0 === $("#designModeViz .ui-draggable-dragging").length) {
                        var e = this.sourceHandler.getLevelSource(),
                            t = this.sourceHandler.getLevelHtml();
                        return S.source === e && S.html === t ? void(v = !1) : void this.save({
                            source: e,
                            html: t
                        }, function() {
                            v = !1
                        })
                    }
                },
                rename: function(e, t) {
                    this.setName(e), this.save(t)
                },
                freeze: function(e) {
                    u.frozen = !0, u.hidden = !0, this.save(function(t) {
                        r(e, t), p()
                    })
                },
                copy: function(e, t) {
                    var n = u.id,
                        o = this.copyAssets.bind(this, n, t);
                    delete u.id, delete u.hidden, this.setName(e), g.create(u, function(e, t) {
                        this.updateCurrentData_(e, t, !0), this.save(o)
                    }.bind(this))
                },
                copyAssets: function(e, t) {
                    if (!e) return void r(t);
                    var n = u.id;
                    m.copyAll(e, n, function(e) {
                        return e ? void $(".project_updated_at").text("Error copying files") : void r(t)
                    })
                },
                serverSideRemix: function() {
                    function e() {
                        location.href = P.getPathName("remix")
                    }
                    u && !u.name && ("/projects/algebra_game" === P.appToProjectUrl() ? this.setName("Big Game Template") : "/projects/applab" === P.appToProjectUrl() && this.setName("My Project")), u.isOwner ? P.save(e) : e()
                },
                createNew: function() {
                    P.save(function() {
                        location.href = P.appToProjectUrl() + "/new"
                    })
                },
                "delete": function(e) {
                    var t = u.id;
                    g["delete"](t, function(t, n) {
                        r(e, n)
                    })
                },
                load: function() {
                    var e = new $.Deferred;
                    if (P.isProjectLevel()) {
                        if (c() || p()) return e.resolve(), e;
                        var t = l();
                        t.channelId ? ("edit" === t.action ? A = !0 : $("#betainfo").hide(), g.fetch(t.channelId, function(n, o) {
                            n ? location.href = location.pathname.split("/").slice(j.START, j.APP + 1).join("/") : a(o, function() {
                                u.isOwner && "view" === t.action && (A = !0), i(function() {
                                    e.resolve()
                                })
                            })
                        })) : (A = !0, e.resolve())
                    } else appOptions.isChannelBacked ? (A = !0, g.fetch(appOptions.channel, function(t, n) {
                        t ? e.reject() : a(n, function() {
                            P.showProjectLevelHeader(), i(function() {
                                e.resolve()
                            })
                        })
                    })) : e.resolve();
                    return e
                },
                getPathName: function(e) {
                    var t = this.appToProjectUrl() + "/" + this.getCurrentId();
                    return e && (t += "/" + e), t
                }
            }
    }, {
        "./clientApi": 2
    }],
    6: [function(e, t) {
        t.exports = function() {
            React.render(React.createElement(window.dashboard.AbuseExclamation, {
                i18n: {
                    tos: window.dashboard.i18n.t("project.abuse.tos"),
                    contact_us: window.dashboard.i18n.t("project.abuse.contact_us"),
                    edit_project: window.dashboard.i18n.t("project.edit_project"),
                    go_to_code_studio: window.dashboard.i18n.t("project.abuse.go_to_code_studio")
                },
                isOwner: dashboard.project.isOwner()
            }), document.getElementById("codeApp")), dashboard.admin.showProjectAdmin()
        }
    }, {}],
    7: [function(e, t) {
        var n = {};
        t.exports = {
            startTiming: function(e, t, o) {
                var a = e + t + o;
                n[a] = (new Date).getTime()
            },
            stopTiming: function(e, t, o) {
                var a = e + t + o,
                    i = (new Date).getTime(),
                    r = n[a],
                    s = i - r;
                ga("send", "timing", e, t, s, o)
            }
        }
    }, {}]
}, {}, [3]);