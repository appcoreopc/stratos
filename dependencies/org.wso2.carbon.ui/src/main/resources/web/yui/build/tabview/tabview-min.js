/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
(function(){var D=YAHOO.util.Dom,H=YAHOO.util.Event,C=YAHOO.widget.Tab,F=document;var E="element";var J=function(L,K){K=K||{};if(arguments.length==1&&!YAHOO.lang.isString(L)&&!L.nodeName){K=L;L=K.element||null;}if(!L&&!K.element){L=I.call(this,K);}J.superclass.constructor.call(this,L,K);};YAHOO.extend(J,YAHOO.util.Element,{CLASSNAME:"yui-navset",TAB_PARENT_CLASSNAME:"yui-nav",CONTENT_PARENT_CLASSNAME:"yui-content",_tabParent:null,_contentParent:null,addTab:function(N,P){var Q=this.get("tabs");if(!Q){this._queue[this._queue.length]=["addTab",arguments];return false;}P=(P===undefined)?Q.length:P;var S=this.getTab(P);var U=this;var M=this.get(E);var T=this._tabParent;var R=this._contentParent;var K=N.get(E);var L=N.get("contentEl");if(S){T.insertBefore(K,S.get(E));}else{T.appendChild(K);}if(L&&!D.isAncestor(R,L)){R.appendChild(L);}if(!N.get("active")){N.set("contentVisible",false,true);}else{this.set("activeTab",N,true);}var O=function(W){YAHOO.util.Event.preventDefault(W);var V=false;if(this==U.get("activeTab")){V=true;}U.set("activeTab",this,V);};N.addListener(N.get("activationEvent"),O);N.addListener("activationEventChange",function(V){if(V.prevValue!=V.newValue){N.removeListener(V.prevValue,O);N.addListener(V.newValue,O);}});Q.splice(P,0,N);},DOMEventHandler:function(Q){var L=this.get(E);var R=YAHOO.util.Event.getTarget(Q);var T=this._tabParent;if(D.isAncestor(T,R)){var M;var N=null;var K;var S=this.get("tabs");for(var O=0,P=S.length;O<P;O++){M=S[O].get(E);K=S[O].get("contentEl");if(R==M||D.isAncestor(M,R)){N=S[O];break;}}if(N){N.fireEvent(Q.type,Q);}}},getTab:function(K){return this.get("tabs")[K];},getTabIndex:function(O){var L=null;var N=this.get("tabs");for(var M=0,K=N.length;M<K;++M){if(O==N[M]){L=M;break;}}return L;},removeTab:function(N){var M=this.get("tabs").length;var L=this.getTabIndex(N);var K=L+1;if(N==this.get("activeTab")){if(M>1){if(L+1==M){this.set("activeIndex",L-1);}else{this.set("activeIndex",L+1);}}}this._tabParent.removeChild(N.get(E));this._contentParent.removeChild(N.get("contentEl"));this._configs.tabs.value.splice(L,1);},toString:function(){var K=this.get("id")||this.get("tagName");return"TabView "+K;},contentTransition:function(L,K){L.set("contentVisible",true);K.set("contentVisible",false);},initAttributes:function(K){J.superclass.initAttributes.call(this,K);if(!K.orientation){K.orientation="top";}var M=this.get(E);if(!D.hasClass(M,this.CLASSNAME)){D.addClass(M,this.CLASSNAME);}this.setAttributeConfig("tabs",{value:[],readOnly:true});this._tabParent=this.getElementsByClassName(this.TAB_PARENT_CLASSNAME,"ul")[0]||G.call(this);this._contentParent=this.getElementsByClassName(this.CONTENT_PARENT_CLASSNAME,"div")[0]||B.call(this);this.setAttributeConfig("orientation",{value:K.orientation,method:function(N){var O=this.get("orientation");this.addClass("yui-navset-"+N);if(O!=N){this.removeClass("yui-navset-"+O);}switch(N){case"bottom":this.appendChild(this._tabParent);break;}}});this.setAttributeConfig("activeIndex",{value:K.activeIndex,method:function(N){},validator:function(N){return !this.getTab(N).get("disabled");}});this.setAttributeConfig("activeTab",{value:K.activeTab,method:function(O){var N=this.get("activeTab");if(O){O.set("active",true);}if(N&&N!=O){N.set("active",false);}if(N&&O!=N){this.contentTransition(O,N);}else{if(O){O.set("contentVisible",true);}}},validator:function(N){return !N.get("disabled");}});this.on("activeTabChange",this._handleActiveTabChange);this.on("activeIndexChange",this._handleActiveIndexChange);if(this._tabParent){A.call(this);}this.DOM_EVENTS.submit=false;this.DOM_EVENTS.focus=false;this.DOM_EVENTS.blur=false;for(var L in this.DOM_EVENTS){if(YAHOO.lang.hasOwnProperty(this.DOM_EVENTS,L)){this.addListener.call(this,L,this.DOMEventHandler);}}},_handleActiveTabChange:function(M){var K=this.get("activeIndex"),L=this.getTabIndex(M.newValue);if(K!==L){if(!(this.set("activeIndex",L))){this.set("activeTab",M.prevValue);}}},_handleActiveIndexChange:function(K){if(K.newValue!==this.getTabIndex(this.get("activeTab"))){if(!(this.set("activeTab",this.getTab(K.newValue)))){this.set("activeIndex",K.prevValue);}}}});var A=function(){var R,M,Q;var P=this.get(E);var O=D.getChildren(this._tabParent);var L=D.getChildren(this._contentParent);for(var N=0,K=O.length;N<K;++N){M={};if(L[N]){M.contentEl=L[N];}R=new YAHOO.widget.Tab(O[N],M);this.addTab(R);if(R.hasClass(R.ACTIVE_CLASSNAME)){this._configs.activeTab.value=R;this._configs.activeIndex.value=this.getTabIndex(R);}}};var I=function(K){var L=F.createElement("div");if(this.CLASSNAME){L.className=this.CLASSNAME;}return L;};var G=function(K){var L=F.createElement("ul");if(this.TAB_PARENT_CLASSNAME){L.className=this.TAB_PARENT_CLASSNAME;}this.get(E).appendChild(L);return L;};var B=function(K){var L=F.createElement("div");if(this.CONTENT_PARENT_CLASSNAME){L.className=this.CONTENT_PARENT_CLASSNAME;}this.get(E).appendChild(L);return L;};YAHOO.widget.TabView=J;})();(function(){var B=YAHOO.util.Dom,T=YAHOO.util.Event,D=YAHOO.lang;var E="contentEl",Q="labelEl",G="content",M="element",C="cacheData",K="dataSrc",J="dataLoaded",F="dataTimeout",I="loadMethod",L="postData",P="disabled";var H=function(V,U){U=U||{};if(arguments.length==1&&!D.isString(V)&&!V.nodeName){U=V;V=U.element;}if(!V&&!U.element){V=N.call(this,U);}this.loadHandler={success:function(W){this.set(G,W.responseText);},failure:function(W){}};H.superclass.constructor.call(this,V,U);this.DOM_EVENTS={};};YAHOO.extend(H,YAHOO.util.Element,{LABEL_TAGNAME:"em",ACTIVE_CLASSNAME:"selected",HIDDEN_CLASSNAME:"yui-hidden",ACTIVE_TITLE:"active",DISABLED_CLASSNAME:P,LOADING_CLASSNAME:"loading",dataConnection:null,loadHandler:null,_loading:false,toString:function(){var U=this.get(M);var V=U.id||U.tagName;return"Tab "+V;},initAttributes:function(U){U=U||{};H.superclass.initAttributes.call(this,U);var W=this.get(M);this.setAttributeConfig("activationEvent",{value:U.activationEvent||"click"});this.setAttributeConfig(Q,{value:U.labelEl||O.call(this),method:function(X){var Y=this.get(Q);
if(Y){if(Y==X){return false;}this.replaceChild(X,Y);}else{if(W.firstChild){this.insertBefore(X,W.firstChild);}else{this.appendChild(X);}}}});this.setAttributeConfig("label",{value:U.label||A.call(this),method:function(Y){var X=this.get(Q);if(!X){this.set(Q,S.call(this));}R.call(this,Y);}});this.setAttributeConfig(E,{value:U.contentEl||document.createElement("div"),method:function(X){var Y=this.get(E);if(Y){if(Y==X){return false;}this.replaceChild(X,Y);}}});this.setAttributeConfig(G,{value:U.content,method:function(X){this.get(E).innerHTML=X;}});var V=false;this.setAttributeConfig(K,{value:U.dataSrc});this.setAttributeConfig(C,{value:U.cacheData||false,validator:D.isBoolean});this.setAttributeConfig(I,{value:U.loadMethod||"GET",validator:D.isString});this.setAttributeConfig(J,{value:false,validator:D.isBoolean,writeOnce:true});this.setAttributeConfig(F,{value:U.dataTimeout||null,validator:D.isNumber});this.setAttributeConfig(L,{value:U.postData||null});this.setAttributeConfig("active",{value:U.active||this.hasClass(this.ACTIVE_CLASSNAME),method:function(X){if(X===true){this.addClass(this.ACTIVE_CLASSNAME);this.set("title",this.ACTIVE_TITLE);}else{this.removeClass(this.ACTIVE_CLASSNAME);this.set("title","");}},validator:function(X){return D.isBoolean(X)&&!this.get(P);}});this.setAttributeConfig(P,{value:U.disabled||this.hasClass(this.DISABLED_CLASSNAME),method:function(X){if(X===true){B.addClass(this.get(M),this.DISABLED_CLASSNAME);}else{B.removeClass(this.get(M),this.DISABLED_CLASSNAME);}},validator:D.isBoolean});this.setAttributeConfig("href",{value:U.href||this.getElementsByTagName("a")[0].getAttribute("href",2)||"#",method:function(X){this.getElementsByTagName("a")[0].href=X;},validator:D.isString});this.setAttributeConfig("contentVisible",{value:U.contentVisible,method:function(X){if(X){B.removeClass(this.get(E),this.HIDDEN_CLASSNAME);if(this.get(K)){if(!this._loading&&!(this.get(J)&&this.get(C))){this._dataConnect();}}}else{B.addClass(this.get(E),this.HIDDEN_CLASSNAME);}},validator:D.isBoolean});},_dataConnect:function(){if(!YAHOO.util.Connect){return false;}B.addClass(this.get(E).parentNode,this.LOADING_CLASSNAME);this._loading=true;this.dataConnection=YAHOO.util.Connect.asyncRequest(this.get(I),this.get(K),{success:function(U){this.loadHandler.success.call(this,U);this.set(J,true);this.dataConnection=null;B.removeClass(this.get(E).parentNode,this.LOADING_CLASSNAME);this._loading=false;},failure:function(U){this.loadHandler.failure.call(this,U);this.dataConnection=null;B.removeClass(this.get(E).parentNode,this.LOADING_CLASSNAME);this._loading=false;},scope:this,timeout:this.get(F)},this.get(L));}});var N=function(U){var Y=document.createElement("li");var V=document.createElement("a");V.href=U.href||"#";Y.appendChild(V);var X=U.label||null;var W=U.labelEl||null;if(W){if(!X){X=A.call(this,W);}}else{W=S.call(this);}V.appendChild(W);return Y;};var O=function(){return this.getElementsByTagName(this.LABEL_TAGNAME)[0];};var S=function(){var U=document.createElement(this.LABEL_TAGNAME);return U;};var R=function(U){var V=this.get(Q);V.innerHTML=U;};var A=function(){var U,V=this.get(Q);if(!V){return undefined;}return V.innerHTML;};YAHOO.widget.Tab=H;})();YAHOO.register("tabview",YAHOO.widget.TabView,{version:"2.6.0",build:"1321"});