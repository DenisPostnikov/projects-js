/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "99405150c9073296ffa8";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/js/app.js")(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--4-1!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Imports\nexports.push([module.i, \"@import url(https://fonts.googleapis.com/css2?family=Pacifico&display=swap);\", \"\"]);\n\n// Module\nexports.push([module.i, \"/*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */\\n/* Document\\n   ========================================================================== */\\n/**\\n * 1. Correct the line height in all browsers.\\n * 2. Prevent adjustments of font size after orientation changes in iOS.\\n */\\nhtml {\\n  line-height: 1.15;\\n  /* 1 */\\n  -webkit-text-size-adjust: 100%;\\n  /* 2 */ }\\n\\n/* Sections\\n   ========================================================================== */\\n/**\\n * Remove the margin in all browsers.\\n */\\nbody {\\n  margin: 0; }\\n\\n/**\\n * Correct the font size and margin on `h1` elements within `section` and\\n * `article` contexts in Chrome, Firefox, and Safari.\\n */\\nh1 {\\n  font-size: 2em;\\n  margin: 0.67em 0; }\\n\\n/* Grouping content\\n   ========================================================================== */\\n/**\\n * 1. Add the correct box sizing in Firefox.\\n * 2. Show the overflow in Edge and IE.\\n */\\nhr {\\n  box-sizing: content-box;\\n  /* 1 */\\n  height: 0;\\n  /* 1 */\\n  overflow: visible;\\n  /* 2 */ }\\n\\n/**\\n * 1. Correct the inheritance and scaling of font size in all browsers.\\n * 2. Correct the odd `em` font sizing in all browsers.\\n */\\npre {\\n  font-family: monospace, monospace;\\n  /* 1 */\\n  font-size: 1em;\\n  /* 2 */ }\\n\\n/* Text-level semantics\\n   ========================================================================== */\\n/**\\n * Remove the gray background on active links in IE 10.\\n */\\na {\\n  background-color: transparent; }\\n\\n/**\\n * 1. Remove the bottom border in Chrome 57-\\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\\n */\\nabbr[title] {\\n  border-bottom: none;\\n  /* 1 */\\n  text-decoration: underline;\\n  /* 2 */\\n  text-decoration: underline dotted;\\n  /* 2 */ }\\n\\n/**\\n * Add the correct font weight in Chrome, Edge, and Safari.\\n */\\nb,\\nstrong {\\n  font-weight: bolder; }\\n\\n/**\\n * 1. Correct the inheritance and scaling of font size in all browsers.\\n * 2. Correct the odd `em` font sizing in all browsers.\\n */\\ncode,\\nkbd,\\nsamp {\\n  font-family: monospace, monospace;\\n  /* 1 */\\n  font-size: 1em;\\n  /* 2 */ }\\n\\n/**\\n * Add the correct font size in all browsers.\\n */\\nsmall {\\n  font-size: 80%; }\\n\\n/**\\n * Prevent `sub` and `sup` elements from affecting the line height in\\n * all browsers.\\n */\\nsub,\\nsup {\\n  font-size: 75%;\\n  line-height: 0;\\n  position: relative;\\n  vertical-align: baseline; }\\n\\nsub {\\n  bottom: -0.25em; }\\n\\nsup {\\n  top: -0.5em; }\\n\\n/* Embedded content\\n   ========================================================================== */\\n/**\\n * Remove the border on images inside links in IE 10.\\n */\\nimg {\\n  border-style: none; }\\n\\n/* Forms\\n   ========================================================================== */\\n/**\\n * 1. Change the font styles in all browsers.\\n * 2. Remove the margin in Firefox and Safari.\\n */\\nbutton,\\ninput,\\noptgroup,\\nselect,\\ntextarea {\\n  font-family: inherit;\\n  /* 1 */\\n  font-size: 100%;\\n  /* 1 */\\n  line-height: 1.15;\\n  /* 1 */\\n  margin: 0;\\n  /* 2 */ }\\n\\n/**\\n * Show the overflow in IE.\\n * 1. Show the overflow in Edge.\\n */\\nbutton,\\ninput {\\n  /* 1 */\\n  overflow: visible; }\\n\\n/**\\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\\n * 1. Remove the inheritance of text transform in Firefox.\\n */\\nbutton,\\nselect {\\n  /* 1 */\\n  text-transform: none; }\\n\\n/**\\n * Correct the inability to style clickable types in iOS and Safari.\\n */\\nbutton,\\n[type='button'],\\n[type='reset'],\\n[type='submit'] {\\n  -webkit-appearance: button; }\\n\\n/**\\n * Remove the inner border and padding in Firefox.\\n */\\nbutton::-moz-focus-inner,\\n[type='button']::-moz-focus-inner,\\n[type='reset']::-moz-focus-inner,\\n[type='submit']::-moz-focus-inner {\\n  border-style: none;\\n  padding: 0; }\\n\\n/**\\n * Restore the focus styles unset by the previous rule.\\n */\\nbutton:-moz-focusring,\\n[type='button']:-moz-focusring,\\n[type='reset']:-moz-focusring,\\n[type='submit']:-moz-focusring {\\n  outline: 1px dotted ButtonText; }\\n\\n/**\\n * Correct the padding in Firefox.\\n */\\nfieldset {\\n  padding: 0.35em 0.75em 0.625em; }\\n\\n/**\\n * 1. Correct the text wrapping in Edge and IE.\\n * 2. Correct the color inheritance from `fieldset` elements in IE.\\n * 3. Remove the padding so developers are not caught out when they zero out\\n *    `fieldset` elements in all browsers.\\n */\\nlegend {\\n  box-sizing: border-box;\\n  /* 1 */\\n  color: inherit;\\n  /* 2 */\\n  display: table;\\n  /* 1 */\\n  max-width: 100%;\\n  /* 1 */\\n  padding: 0;\\n  /* 3 */\\n  white-space: normal;\\n  /* 1 */ }\\n\\n/**\\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\\n */\\nprogress {\\n  vertical-align: baseline; }\\n\\n/**\\n * Remove the default vertical scrollbar in IE 10+.\\n */\\ntextarea {\\n  overflow: auto; }\\n\\n/**\\n * 1. Add the correct box sizing in IE 10.\\n * 2. Remove the padding in IE 10.\\n */\\n[type='checkbox'],\\n[type='radio'] {\\n  box-sizing: border-box;\\n  /* 1 */\\n  padding: 0;\\n  /* 2 */ }\\n\\n/**\\n * Correct the cursor style of increment and decrement buttons in Chrome.\\n */\\n[type='number']::-webkit-inner-spin-button,\\n[type='number']::-webkit-outer-spin-button {\\n  height: auto; }\\n\\n/**\\n * 1. Correct the odd appearance in Chrome and Safari.\\n * 2. Correct the outline style in Safari.\\n */\\n[type='search'] {\\n  -webkit-appearance: textfield;\\n  /* 1 */\\n  outline-offset: -2px;\\n  /* 2 */ }\\n\\n/**\\n * Remove the inner padding in Chrome and Safari on macOS.\\n */\\n[type='search']::-webkit-search-decoration {\\n  -webkit-appearance: none; }\\n\\n/**\\n * 1. Correct the inability to style clickable types in iOS and Safari.\\n * 2. Change font properties to `inherit` in Safari.\\n */\\n::-webkit-file-upload-button {\\n  -webkit-appearance: button;\\n  /* 1 */\\n  font: inherit;\\n  /* 2 */ }\\n\\n/* Interactive\\n   ========================================================================== */\\n/*\\n * Add the correct display in Edge, IE 10+, and Firefox.\\n */\\ndetails {\\n  display: block; }\\n\\n/*\\n * Add the correct display in all browsers.\\n */\\nsummary {\\n  display: list-item; }\\n\\n/* Misc\\n   ========================================================================== */\\n/**\\n * Add the correct display in IE 10+.\\n */\\ntemplate {\\n  display: none; }\\n\\n/**\\n * Add the correct display in IE 10.\\n */\\n[hidden] {\\n  display: none; }\\n\\n* {\\n  box-sizing: border-box;\\n  margin: 0;\\n  padding: 0; }\\n\\ninput:focus,\\ninput:active,\\ntextarea:focus,\\ntextarea:active,\\nbutton:focus,\\nbutton:active {\\n  outline: none; }\\n\\nhtml,\\nbody {\\n  height: 100%; }\\n\\nbody {\\n  font: 15px/160% Arial, Helvetica, sans-serif;\\n  background-color: #61b5d4; }\\n\\nimg {\\n  width: 100%; }\\n\\na {\\n  text-decoration: none; }\\n\\n.container {\\n  max-width: 1400px;\\n  width: 90vw;\\n  margin: 0 auto; }\\n\\n.overlay {\\n  position: fixed;\\n  top: 0;\\n  left: 0;\\n  width: 100%;\\n  height: 100%;\\n  background-color: rgba(41, 41, 41, 0.6);\\n  z-index: 3; }\\n\\n.hide {\\n  visibility: hidden; }\\n\\n.noscroll {\\n  overflow: hidden; }\\n\\n.header {\\n  display: flex;\\n  justify-content: space-between;\\n  align-items: center;\\n  margin: 2.5rem auto 4rem; }\\n  .header__touch-button {\\n    position: relative;\\n    z-index: 7;\\n    width: 40px;\\n    height: 30px;\\n    background: transparent;\\n    border: none;\\n    transition: 0.5s ease-in-out;\\n    cursor: pointer; }\\n    .header__touch-button span {\\n      position: absolute;\\n      left: 0;\\n      display: block;\\n      width: 100%;\\n      height: 5px;\\n      background-color: #fff;\\n      border-radius: 10px;\\n      opacity: 1;\\n      transition: 0.25s ease-in-out; }\\n      .header__touch-button span:first-child {\\n        top: 0; }\\n      .header__touch-button span:nth-child(2), .header__touch-button span:nth-child(3) {\\n        top: 12px; }\\n      .header__touch-button span:nth-child(4) {\\n        top: 24px; }\\n    .header__touch-button_open {\\n      position: absolute;\\n      top: 50px;\\n      left: 300px; }\\n      .header__touch-button_open span:first-child, .header__touch-button_open span:nth-child(4) {\\n        top: 18px;\\n        left: 50%;\\n        width: 0; }\\n      .header__touch-button_open span:nth-child(2) {\\n        transform: rotate(45deg); }\\n      .header__touch-button_open span:nth-child(3) {\\n        transform: rotate(-45deg); }\\n  .header__menu {\\n    position: absolute;\\n    top: 0;\\n    left: -355px;\\n    z-index: 6;\\n    display: flex;\\n    flex-direction: column;\\n    width: 290px;\\n    height: 100%;\\n    padding: 7rem 0 1rem 5rem;\\n    background: linear-gradient(40deg, #ffd86f, #fc6262);\\n    list-style-type: none;\\n    transition: all 0.3s ease; }\\n    .header__menu_open {\\n      left: 0; }\\n    .header__menu-item {\\n      line-height: 3rem; }\\n      .header__menu-item_active .header__menu-link {\\n        background-color: #346bbc;\\n        margin-left: -20px;\\n        padding: 7px 20px;\\n        border-radius: 20px;\\n        box-shadow: -1px 3px 0px #30296f; }\\n    .header__menu-icon {\\n      position: relative;\\n      top: 6px;\\n      display: inline-block;\\n      width: 31px;\\n      height: 30px;\\n      margin-right: 0.7rem;\\n      background-position: center;\\n      background-size: contain; }\\n    .header__menu-link {\\n      font-size: 1.5rem;\\n      text-transform: capitalize;\\n      color: #fff;\\n      transition: all 0.3s ease; }\\n      .header__menu-link:hover {\\n        font-size: 1.6rem;\\n        background-color: #23d5ab;\\n        padding: 7px 20px;\\n        margin-left: -20px;\\n        border-radius: 20px;\\n        box-shadow: -1px 3px 0px #209b7e; }\\n  .header__logo-link {\\n    font-family: 'Pacifico', Verdana, cursive;\\n    font-size: 3.5rem;\\n    color: #fff;\\n    text-shadow: 0px 3px 3px #30296f;\\n    transition: all 0.3s ease; }\\n    .header__logo-link:hover {\\n      color: #a3ffff; }\\n\\n.cards {\\n  display: flex;\\n  justify-content: center;\\n  gap: 4rem;\\n  flex-wrap: wrap;\\n  align-items: flex-start; }\\n  .cards__category, .cards__word {\\n    width: 300px;\\n    background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=) 100% 100% no-repeat;\\n    background-size: cover;\\n    box-shadow: -1px 15px 30px -12px black;\\n    border-radius: 20px;\\n    cursor: pointer;\\n    transition: all 0.3s ease; }\\n    .cards__category:hover, .cards__word:hover {\\n      transform: translateY(-5px) scale(1.005) translateZ(0);\\n      box-shadow: 5px 6px 17px #24d7f7; }\\n  .cards__image {\\n    position: relative;\\n    height: 180px;\\n    border-top-left-radius: 14px;\\n    border-top-right-radius: 14px; }\\n    .cards__image_space {\\n      background-color: #346bbc; }\\n    .cards__image_food {\\n      background-color: #ddcbb8; }\\n    .cards__image_animals {\\n      background-color: #b2f191; }\\n    .cards__image_body {\\n      background-color: #0388b7; }\\n    .cards__image_nature {\\n      background-color: #a3ffff; }\\n    .cards__image_colors {\\n      background-color: #f0f0f0; }\\n    .cards__image_family {\\n      background-color: #f191a9; }\\n    .cards__image_home {\\n      background-color: #beeae8; }\\n    .cards__image img {\\n      position: absolute;\\n      top: -34px;\\n      left: 0;\\n      width: 300px; }\\n  .cards__title {\\n    margin: 2.5rem 0;\\n    font-size: 1.8rem;\\n    text-transform: uppercase;\\n    letter-spacing: 0.15rem;\\n    text-align: center;\\n    color: #30296f; }\\n  .cards__word {\\n    position: relative;\\n    perspective: 1000px; }\\n    .cards__word_3d .cards__word-front {\\n      transform: rotateY(180deg); }\\n    .cards__word_3d .cards__word-back {\\n      transform: rotateY(360deg); }\\n    .cards__word-front {\\n      position: absolute;\\n      width: 100%;\\n      height: 100%; }\\n    .cards__word-back {\\n      transform: rotateY(180deg); }\\n    .cards__word-front, .cards__word-back {\\n      backface-visibility: hidden;\\n      transition: all 0.5s ease; }\\n    .cards__word-image {\\n      display: flex;\\n      justify-content: center;\\n      align-items: center;\\n      height: 180px;\\n      padding-top: 2rem; }\\n      .cards__word-image img {\\n        width: 160px; }\\n    .cards__word-title {\\n      margin: 2.5rem 0;\\n      font-size: 1.8rem;\\n      text-transform: uppercase;\\n      letter-spacing: 0.15rem;\\n      text-align: center;\\n      color: #30296f; }\\n    .cards__word-sound {\\n      position: absolute;\\n      bottom: 0;\\n      left: 0;\\n      width: 45px;\\n      height: 45px;\\n      background-color: #24d7f7;\\n      border-bottom-left-radius: 18px;\\n      border-top-right-radius: 30px;\\n      cursor: pointer; }\\n      .cards__word-sound:before {\\n        content: '';\\n        position: absolute;\\n        top: 13px;\\n        left: 11px;\\n        width: 21px;\\n        height: 21px;\\n        background: url(\\\"../src/assets/images/sound-icon.png\\\") no-repeat;\\n        background-size: cover; }\\n    .cards__word-turn {\\n      position: absolute;\\n      bottom: 0;\\n      right: 0;\\n      width: 45px;\\n      height: 45px;\\n      background-color: #23d5ab;\\n      border-bottom-right-radius: 18px;\\n      border-top-left-radius: 30px;\\n      cursor: pointer; }\\n      .cards__word-turn:before {\\n        content: '';\\n        position: absolute;\\n        top: 15px;\\n        left: 15px;\\n        width: 20px;\\n        height: 20px;\\n        background: url(\\\"../src/assets/images/restart-icon.png\\\") no-repeat;\\n        background-size: cover; }\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/scss/style.scss?./node_modules/css-loader/dist/cjs.js??ref--4-1!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return '@media ' + item[2] + '{' + content + '}';\n      } else {\n        return content;\n      }\n    }).join('');\n  }; // import a list of modules into the list\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (i = 0; i < modules.length; i++) {\n      var item = modules[i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || '';\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n  return '/*# ' + data + ' */';\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target, parent) {\n  if (parent){\n    return parent.querySelector(target);\n  }\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target, parent) {\n                // If passing function in options, then use it for resolve \"head\" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector(\"#foo\").shadowRoot }\n                // }\n                if (typeof target === 'function') {\n                        return target();\n                }\n                if (typeof memo[target] === \"undefined\") {\n\t\t\tvar styleTarget = getTarget.call(this, target, parent);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertAt.before, target);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\n\tif(options.attrs.nonce === undefined) {\n\t\tvar nonce = getNonce();\n\t\tif (nonce) {\n\t\t\toptions.attrs.nonce = nonce;\n\t\t}\n\t}\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction getNonce() {\n\tif (false) {}\n\n\treturn __webpack_require__.nc;\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = typeof options.transform === 'function'\n\t\t ? options.transform(obj.css) \n\t\t : options.transform.default(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/urls.js?");

/***/ }),

/***/ "./src/js/CardsWord/CardsWord.js":
/*!***************************************!*\
  !*** ./src/js/CardsWord/CardsWord.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CardsWord; });\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data */ \"./src/js/data.js\");\n/* harmony import */ var _CardsWordTemplate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CardsWordTemplate */ \"./src/js/CardsWord/CardsWordTemplate.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\nvar CardsWord = /*#__PURE__*/function () {\n  function CardsWord(wrap, hash) {\n    _classCallCheck(this, CardsWord);\n\n    this.wrap = wrap;\n    this.hash = hash;\n  }\n\n  _createClass(CardsWord, [{\n    key: \"create\",\n    value: function create() {\n      var _this = this;\n\n      var currentCard = _data__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(function (el) {\n        return el.name === _this.hash;\n      });\n      currentCard.cards.forEach(function (item) {\n        _this.rendorCardsWord(item);\n      });\n    }\n  }, {\n    key: \"rendorCardsWord\",\n    value: function rendorCardsWord(item) {\n      var word = item.word,\n          translate = item.translation,\n          image = item.image,\n          audioUrl = item.audioSrc,\n          card = document.createElement('div');\n      card.classList.add('cards__word');\n      card.innerHTML = Object(_CardsWordTemplate__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(word, translate, image, audioUrl);\n      this.wrap.appendChild(card);\n      this.soundClick(card.querySelector('.cards__word-sound'));\n      this.addTurnClass(card, card.querySelector('.cards__word-turn'));\n      this.removeTurnClass(card);\n    }\n  }, {\n    key: \"soundClick\",\n    value: function soundClick(el) {\n      el.addEventListener('click', function (e) {\n        var audioElem = e.target.querySelector('audio');\n        if (audioElem) audioElem.play();\n      });\n    }\n  }, {\n    key: \"addTurnClass\",\n    value: function addTurnClass(wrap, el) {\n      el.addEventListener('click', function () {\n        wrap.classList.add('cards__word_3d');\n      });\n    }\n  }, {\n    key: \"removeTurnClass\",\n    value: function removeTurnClass(el) {\n      el.addEventListener('mouseleave', function (e) {\n        e.target.classList.remove('cards__word_3d');\n      });\n    }\n  }]);\n\n  return CardsWord;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/CardsWord/CardsWord.js?");

/***/ }),

/***/ "./src/js/CardsWord/CardsWordTemplate.js":
/*!***********************************************!*\
  !*** ./src/js/CardsWord/CardsWordTemplate.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CardsWordTemplate; });\nfunction CardsWordTemplate(word, translate, image, audioUrl) {\n  return \"\\n    <div class=\\\"cards__word-front\\\">\\n      <div class=\\\"cards__word-image\\\">\\n        <img src=\\\"\".concat(image, \"\\\" alt=\\\"\").concat(word, \"\\\">\\n      </div>\\n      <div class=\\\"cards__word-title\\\">\").concat(word, \"</div>\\n      <div class=\\\"cards__word-sound\\\">\\n        <audio src=\\\"\").concat(audioUrl, \"\\\"></audio>\\n      </div>\\n      <div class=\\\"cards__word-turn\\\"></div>\\n    </div>\\n    <div class=\\\"cards__word-back\\\">\\n      <div class=\\\"cards__word-image\\\">\\n        <img src=\\\"\").concat(image, \"\\\" alt=\\\"\").concat(word, \"\\\">\\n      </div>\\n      <div class=\\\"cards__word-title\\\">\").concat(translate, \"</div>\\n    </div>\\n  \");\n}\n\n//# sourceURL=webpack:///./src/js/CardsWord/CardsWordTemplate.js?");

/***/ }),

/***/ "./src/js/Category/Category.js":
/*!*************************************!*\
  !*** ./src/js/Category/Category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Category; });\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data */ \"./src/js/data.js\");\n/* harmony import */ var _CategoryHtml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CategoryHtml */ \"./src/js/Category/CategoryHtml.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\nvar Category = /*#__PURE__*/function () {\n  function Category(wrap) {\n    _classCallCheck(this, Category);\n\n    this.wrap = wrap;\n    this.init();\n  }\n\n  _createClass(Category, [{\n    key: \"init\",\n    value: function init() {\n      return this.create();\n    }\n  }, {\n    key: \"create\",\n    value: function create() {\n      for (var i = 0; i < _data__WEBPACK_IMPORTED_MODULE_0__[\"default\"].length; i++) {\n        var name = _data__WEBPACK_IMPORTED_MODULE_0__[\"default\"][i].name,\n            lowerName = name.toLowerCase();\n        this.rendorCardCategory('div', name, lowerName);\n      }\n    }\n  }, {\n    key: \"rendorCardCategory\",\n    value: function rendorCardCategory(item, name, lowerName) {\n      var category = document.createElement(item);\n      category.classList.add('cards__category');\n      category.innerHTML = Object(_CategoryHtml__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(name, lowerName);\n      this.wrap.appendChild(category);\n    }\n  }]);\n\n  return Category;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/Category/Category.js?");

/***/ }),

/***/ "./src/js/Category/CategoryHtml.js":
/*!*****************************************!*\
  !*** ./src/js/Category/CategoryHtml.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CategoryTemplate; });\nfunction CategoryTemplate(name, lowerName) {\n  return \"\\n    <a href=\\\"#\".concat(lowerName, \"\\\">\\n      <div class=\\\"cards__image cards__image_\").concat(lowerName, \"\\\">\\n        <img src=\\\"../src/assets/images/categories/\").concat(lowerName, \".png\\\" alt=\\\"\").concat(name, \"\\\">\\n      </div>\\n      <div class=\\\"cards__title\\\">\").concat(name, \"</div>\\n    </a>\\n  \");\n}\n\n//# sourceURL=webpack:///./src/js/Category/CategoryHtml.js?");

/***/ }),

/***/ "./src/js/Menu/MenuItem.js":
/*!*********************************!*\
  !*** ./src/js/Menu/MenuItem.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MenuItem; });\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data */ \"./src/js/data.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar MenuItem = /*#__PURE__*/function () {\n  function MenuItem(wrap) {\n    _classCallCheck(this, MenuItem);\n\n    this.wrap = wrap;\n  }\n\n  _createClass(MenuItem, [{\n    key: \"create\",\n    value: function create() {\n      for (var i = 0; i < _data__WEBPACK_IMPORTED_MODULE_0__[\"default\"].length; i++) {\n        var name = _data__WEBPACK_IMPORTED_MODULE_0__[\"default\"][i].name;\n        this.rendorItem(name);\n      }\n    }\n  }, {\n    key: \"rendorItem\",\n    value: function rendorItem(name) {\n      var item = document.createElement('li');\n      item.classList.add('header__menu-item');\n      item.innerHTML = \"\\n      <a class=\\\"header__menu-link\\\" href=\\\"#\".concat(name, \"\\\">\\n        <i class=\\\"header__menu-icon\\\" style=\\\"background-image: url(../src/assets/images/icons/\").concat(name, \".svg)\\\"></i>\\n        \").concat(name, \"\\n      </a>\\n      \");\n      this.wrap.appendChild(item);\n    }\n  }]);\n\n  return MenuItem;\n}();\n\n\n\n//# sourceURL=webpack:///./src/js/Menu/MenuItem.js?");

/***/ }),

/***/ "./src/js/Rendor.js":
/*!**************************!*\
  !*** ./src/js/Rendor.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Category_Category__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Category/Category */ \"./src/js/Category/Category.js\");\n/* harmony import */ var _CardsWord_CardsWord__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CardsWord/CardsWord */ \"./src/js/CardsWord/CardsWord.js\");\n\n\nvar categoryItems = new _Category_Category__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.querySelector('.cards'));\n\nfunction getContent(fragmentId) {\n  var cardsWord = new _CardsWord_CardsWord__WEBPACK_IMPORTED_MODULE_1__[\"default\"](document.querySelector('.cards'), fragmentId);\n  cardsWord.create();\n}\n\nfunction loadContent() {\n  var contentDiv = document.querySelector('.cards');\n  var fragmentId = location.hash.substr(1);\n\n  if (!fragmentId) {\n    contentDiv.innerHTML = '';\n    categoryItems.init();\n  } else {\n    contentDiv.innerHTML = '';\n    getContent(fragmentId);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (loadContent);\n\n//# sourceURL=webpack:///./src/js/Rendor.js?");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ \"./src/scss/style.scss\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Rendor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Rendor */ \"./src/js/Rendor.js\");\n/* harmony import */ var _Menu_MenuItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Menu/MenuItem */ \"./src/js/Menu/MenuItem.js\");\n/* harmony import */ var _touchButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./touchButton */ \"./src/js/touchButton.js\");\n\n\n\n\nObject(_touchButton__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(document.querySelector('.header__touch-button'), document.querySelector('.header__menu'), document.querySelector('.overlay'), document.querySelector('body'));\nvar menu = new _Menu_MenuItem__WEBPACK_IMPORTED_MODULE_2__[\"default\"](document.querySelector('.header__menu'));\nmenu.create();\nwindow.addEventListener('hashchange', _Rendor__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/data.js":
/*!************************!*\
  !*** ./src/js/data.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar cardsData = [{\n  name: 'space',\n  cards: [{\n    word: 'rocket',\n    translation: 'ракета',\n    image: '../src/assets/images/space/rocket.svg',\n    audioSrc: '../src/assets/audio/space/rocket.mp3'\n  }, {\n    word: 'sun',\n    translation: 'солнце',\n    image: '../src/assets/images/space/sun.svg',\n    audioSrc: '../src/assets/audio/space/sun.mp3'\n  }, {\n    word: 'moon',\n    translation: 'луна',\n    image: '../src/assets/images/space/moon.svg',\n    audioSrc: '../src/assets/audio/space/moon.mp3'\n  }, {\n    word: 'planet',\n    translation: 'планета',\n    image: '../src/assets/images/space/planet.svg',\n    audioSrc: '../src/assets/audio/space/planet.mp3'\n  }, {\n    word: 'earth',\n    translation: 'земля',\n    image: '../src/assets/images/space/earth.svg',\n    audioSrc: '../src/assets/audio/space/earth.mp3'\n  }, {\n    word: 'telescope',\n    translation: 'телескоп',\n    image: '../src/assets/images/space/telescope.svg',\n    audioSrc: '../src/assets/audio/space/telescope.mp3'\n  }, {\n    word: 'satellite',\n    translation: 'спутник',\n    image: '../src/assets/images/space/satellite.svg',\n    audioSrc: '../src/assets/audio/space/satellite.mp3'\n  }, {\n    word: 'astronaut',\n    translation: 'космонавт',\n    image: '../src/assets/images/space/astronaut.svg',\n    audioSrc: '../src/assets/audio/space/astronaut.mp3'\n  }]\n}, {\n  name: 'food',\n  cards: [{\n    word: 'apple',\n    translation: 'яблоко',\n    image: '../src/assets/images/food/apple.svg',\n    audioSrc: '../src/assets/audio/food/apple.mp3'\n  }, {\n    word: 'banana',\n    translation: 'банан',\n    image: '../src/assets/images/food/banana.svg',\n    audioSrc: '../src/assets/audio/food/banana.mp3'\n  }, {\n    word: 'fish',\n    translation: 'рыба',\n    image: '../src/assets/images/food/fish.svg',\n    audioSrc: '../src/assets/audio/food/fish.mp3'\n  }, {\n    word: 'bread',\n    translation: 'хлеб',\n    image: '../src/assets/images/food/bread.svg',\n    audioSrc: '../src/assets/audio/food/bread.mp3'\n  }, {\n    word: 'cheese',\n    translation: 'сыр',\n    image: '../src/assets/images/food/cheese.svg',\n    audioSrc: '../src/assets/audio/food/cheese.mp3'\n  }, {\n    word: 'pumpkin',\n    translation: 'тыква',\n    image: '../src/assets/images/food/pumpkin.svg',\n    audioSrc: '../src/assets/audio/food/pumpkin.mp3'\n  }, {\n    word: 'cabbage',\n    translation: 'капуста',\n    image: '../src/assets/images/food/cabbage.svg',\n    audioSrc: '../src/assets/audio/food/cabbage.mp3'\n  }, {\n    word: 'tomato',\n    translation: 'помидор',\n    image: '../src/assets/images/food/tomato.svg',\n    audioSrc: '../src/assets/audio/food/tomato.mp3'\n  }]\n}, {\n  name: 'animals',\n  cards: [{\n    word: 'whale',\n    translation: 'кит',\n    image: '../src/assets/images/animals/whale.svg',\n    audioSrc: '../src/assets/audio/animals/whale.mp3'\n  }, {\n    word: 'pig',\n    translation: 'свинья',\n    image: '../src/assets/images/animals/pig.svg',\n    audioSrc: '../src/assets/audio/animals/pig.mp3'\n  }, {\n    word: 'fox',\n    translation: 'лиса',\n    image: '../src/assets/images/animals/fox.svg',\n    audioSrc: '../src/assets/audio/animals/fox.mp3'\n  }, {\n    word: 'koala',\n    translation: 'коала',\n    image: '../src/assets/images/animals/koala.svg',\n    audioSrc: '../src/assets/audio/animals/koala.mp3'\n  }, {\n    word: 'tiger',\n    translation: 'тигр',\n    image: '../src/assets/images/animals/tiger.svg',\n    audioSrc: '../src/assets/audio/animals/tiger.mp3'\n  }, {\n    word: 'crab',\n    translation: 'краб',\n    image: '../src/assets/images/animals/crab.svg',\n    audioSrc: '../src/assets/audio/animals/crab.mp3'\n  }, {\n    word: 'zebra',\n    translation: 'зебра',\n    image: '../src/assets/images/animals/zebra.svg',\n    audioSrc: '../src/assets/audio/animals/zebra.mp3'\n  }, {\n    word: 'hippo',\n    translation: 'гиппопотам',\n    image: '../src/assets/images/animals/hippo.svg',\n    audioSrc: '../src/assets/audio/animals/hippo.mp3'\n  }]\n}, {\n  name: 'body',\n  cards: [{\n    word: 'head',\n    translation: 'голова',\n    image: '../src/assets/images/body/head.svg',\n    audioSrc: '../src/assets/audio/body/head.mp3'\n  }, {\n    word: 'neck',\n    translation: 'шея',\n    image: '../src/assets/images/body/neck.svg',\n    audioSrc: '../src/assets/audio/body/neck.mp3'\n  }, {\n    word: 'hand',\n    translation: 'рука',\n    image: '../src/assets/images/body/hand.svg',\n    audioSrc: '../src/assets/audio/body/hand.mp3'\n  }, {\n    word: 'nose',\n    translation: 'нос',\n    image: '../src/assets/images/body/nose.svg',\n    audioSrc: '../src/assets/audio/body/nose.mp3'\n  }, {\n    word: 'skull',\n    translation: 'череп',\n    image: '../src/assets/images/body/skull.svg',\n    audioSrc: '../src/assets/audio/body/skull.mp3'\n  }, {\n    word: 'ear',\n    translation: 'ухо',\n    image: '../src/assets/images/body/ear.svg',\n    audioSrc: '../src/assets/audio/body/ear.mp3'\n  }, {\n    word: 'tooth',\n    translation: 'зуб',\n    image: '../src/assets/images/body/tooth.svg',\n    audioSrc: '../src/assets/audio/body/tooth.mp3'\n  }, {\n    word: 'stomach',\n    translation: 'желудок',\n    image: '../src/assets/images/body/stomach.svg',\n    audioSrc: '../src/assets/audio/body/stomach.mp3'\n  }]\n}, {\n  name: 'nature',\n  cards: [{\n    word: 'forest',\n    translation: 'лес',\n    image: '../src/assets/images/nature/forest.svg',\n    audioSrc: '../src/assets/audio/nature/forest.mp3'\n  }, {\n    word: 'beach',\n    translation: 'пляж',\n    image: '../src/assets/images/nature/beach.svg',\n    audioSrc: '../src/assets/audio/nature/beach.mp3'\n  }, {\n    word: 'lake',\n    translation: 'озеро',\n    image: '../src/assets/images/nature/lake.svg',\n    audioSrc: '../src/assets/audio/nature/lake.mp3'\n  }, {\n    word: 'volcano',\n    translation: 'вулкан',\n    image: '../src/assets/images/nature/volcano.svg',\n    audioSrc: '../src/assets/audio/nature/volcano.mp3'\n  }, {\n    word: 'rainbow',\n    translation: 'радуга',\n    image: '../src/assets/images/nature/rainbow.svg',\n    audioSrc: '../src/assets/audio/nature/rainbow.mp3'\n  }, {\n    word: 'desert',\n    translation: 'пустыня',\n    image: '../src/assets/images/nature/desert.svg',\n    audioSrc: '../src/assets/audio/nature/desert.mp3'\n  }, {\n    word: 'snow',\n    translation: 'снег',\n    image: '../src/assets/images/nature/snow.svg',\n    audioSrc: '../src/assets/audio/nature/snow.mp3'\n  }, {\n    word: 'mountain',\n    translation: 'гора',\n    image: '../src/assets/images/nature/mountain.svg',\n    audioSrc: '../src/assets/audio/nature/mountain.mp3'\n  }]\n}, {\n  name: 'colors',\n  cards: [{\n    word: 'white',\n    translation: 'белый',\n    image: '../src/assets/images/colors/white.svg',\n    audioSrc: '../src/assets/audio/colors/white.mp3'\n  }, {\n    word: 'yellow',\n    translation: 'жёлтый',\n    image: '../src/assets/images/colors/yellow.svg',\n    audioSrc: '../src/assets/audio/colors/yellow.mp3'\n  }, {\n    word: 'orange',\n    translation: 'оранжевый',\n    image: '../src/assets/images/colors/orange.svg',\n    audioSrc: '../src/assets/audio/colors/orange.mp3'\n  }, {\n    word: 'red',\n    translation: 'красный',\n    image: '../src/assets/images/colors/red.svg',\n    audioSrc: '../src/assets/audio/colors/red.mp3'\n  }, {\n    word: 'purple',\n    translation: 'фиолетовый',\n    image: '../src/assets/images/colors/purple.svg',\n    audioSrc: '../src/assets/audio/colors/purple.mp3'\n  }, {\n    word: 'blue',\n    translation: 'синий',\n    image: '../src/assets/images/colors/blue.svg',\n    audioSrc: '../src/assets/audio/colors/blue.mp3'\n  }, {\n    word: 'green',\n    translation: 'зелёный',\n    image: '../src/assets/images/colors/green.svg',\n    audioSrc: '../src/assets/audio/colors/green.mp3'\n  }, {\n    word: 'black',\n    translation: 'чёрный',\n    image: '../src/assets/images/colors/black.svg',\n    audioSrc: '../src/assets/audio/colors/black.mp3'\n  }]\n}, {\n  name: 'family',\n  cards: [{\n    word: 'family',\n    translation: 'семья',\n    image: '../src/assets/images/family/family.svg',\n    audioSrc: '../src/assets/audio/family/family.mp3'\n  }, {\n    word: 'father',\n    translation: 'отец',\n    image: '../src/assets/images/family/father.svg',\n    audioSrc: '../src/assets/audio/family/father.mp3'\n  }, {\n    word: 'mother',\n    translation: 'мать',\n    image: '../src/assets/images/family/mother.svg',\n    audioSrc: '../src/assets/audio/family/mother.mp3'\n  }, {\n    word: 'brother',\n    translation: 'брат',\n    image: '../src/assets/images/family/brother.svg',\n    audioSrc: '../src/assets/audio/family/brother.mp3'\n  }, {\n    word: 'sister',\n    translation: 'сестра',\n    image: '../src/assets/images/family/sister.svg',\n    audioSrc: '../src/assets/audio/family/sister.mp3'\n  }, {\n    word: 'grandpa',\n    translation: 'дедушка',\n    image: '../src/assets/images/family/grandpa.svg',\n    audioSrc: '../src/assets/audio/family/grandpa.mp3'\n  }, {\n    word: 'grandma',\n    translation: 'бабушка',\n    image: '../src/assets/images/family/grandma.svg',\n    audioSrc: '../src/assets/audio/family/grandma.mp3'\n  }, {\n    word: 'pet',\n    translation: 'питомец',\n    image: '../src/assets/images/family/pet.svg',\n    audioSrc: '../src/assets/audio/family/pet.mp3'\n  }]\n}, {\n  name: 'home',\n  cards: [{\n    word: 'mirror',\n    translation: 'зеркало',\n    image: '../src/assets/images/home/mirror.svg',\n    audioSrc: '../src/assets/audio/home/mirror.mp3'\n  }, {\n    word: 'kitchen',\n    translation: 'кухня',\n    image: '../src/assets/images/home/kitchen.svg',\n    audioSrc: '../src/assets/audio/home/kitchen.mp3'\n  }, {\n    word: 'bed',\n    translation: 'кровать',\n    image: '../src/assets/images/home/bed.svg',\n    audioSrc: '../src/assets/audio/home/bed.mp3'\n  }, {\n    word: 'toilet',\n    translation: 'туалет',\n    image: '../src/assets/images/home/toilet.svg',\n    audioSrc: '../src/assets/audio/home/toilet.mp3'\n  }, {\n    word: 'door',\n    translation: 'дверь',\n    image: '../src/assets/images/home/door.svg',\n    audioSrc: '../src/assets/audio/home/door.mp3'\n  }, {\n    word: 'window',\n    translation: 'окно',\n    image: '../src/assets/images/home/window.svg',\n    audioSrc: '../src/assets/audio/home/window.mp3'\n  }, {\n    word: 'chair',\n    translation: 'стул',\n    image: '../src/assets/images/home/chair.svg',\n    audioSrc: '../src/assets/audio/home/chair.mp3'\n  }, {\n    word: 'fridge',\n    translation: 'холодильник',\n    image: '../src/assets/images/home/fridge.svg',\n    audioSrc: '../src/assets/audio/home/fridge.mp3'\n  }]\n}];\n/* harmony default export */ __webpack_exports__[\"default\"] = (cardsData);\n\n//# sourceURL=webpack:///./src/js/data.js?");

/***/ }),

/***/ "./src/js/touchButton.js":
/*!*******************************!*\
  !*** ./src/js/touchButton.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (button, menu, overlay, body) {\n  button.addEventListener('click', function (e) {\n    e.preventDefault;\n\n    if (button.classList.contains('header__touch-button_open')) {\n      button.classList.remove('header__touch-button_open');\n      menu.classList.remove('header__menu_open');\n      overlay.classList.add('hide');\n      body.classList.remove('noscroll');\n    } else {\n      button.classList.add('header__touch-button_open');\n      menu.classList.add('header__menu_open');\n      overlay.classList.remove('hide');\n      body.classList.add('noscroll');\n    }\n  });\n  menu.addEventListener('click', function (e) {\n    if (e.target) {\n      button.classList.remove('header__touch-button_open');\n      menu.classList.remove('header__menu_open');\n      overlay.classList.add('hide');\n      body.classList.remove('noscroll');\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/js/touchButton.js?");

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--4-1!../../node_modules/sass-loader/dist/cjs.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(true) {\n\tmodule.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--4-1!../../node_modules/sass-loader/dist/cjs.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss\", function() {\n\t\tvar newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--4-1!../../node_modules/sass-loader/dist/cjs.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js!./src/scss/style.scss\");\n\n\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\n\t\tvar locals = (function(a, b) {\n\t\t\tvar key, idx = 0;\n\n\t\t\tfor(key in a) {\n\t\t\t\tif(!b || a[key] !== b[key]) return false;\n\t\t\t\tidx++;\n\t\t\t}\n\n\t\t\tfor(key in b) idx--;\n\n\t\t\treturn idx === 0;\n\t\t}(content.locals, newContent.locals));\n\n\t\tif(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');\n\n\t\tupdate(newContent);\n\t});\n\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./src/scss/style.scss?");

/***/ })

/******/ });