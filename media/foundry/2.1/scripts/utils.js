dispatch.to("Foundry/2.1 Core Plugins").at(function($,manifest){$.IE=function(){var undef,v=3,div=document.createElement("div"),all=div.getElementsByTagName("i");while(div.innerHTML="<!--[if gt IE "+ ++v+"]><i></i><![endif]-->",all[0]);return v>4?v:undef}();$.uid=function(p,s){return(p?p:"")+Math.random().toString().replace(".","")+(s?s:"")};$.isDeferred=function(obj){return obj&&$.isFunction(obj.always)};$.distinct=function(items){var uniqueElements=$.unique;if(items.length<1){return}if(items[0].nodeType){return uniqueElements.apply(this,arguments)}if(typeof items[0]=="object"){var unique=Math.random(),uniqueObjects=[];$.each(items,function(i){if(!items[i][unique]){uniqueObjects.push(items[i]);items[i][unique]=true}});$.each(uniqueObjects,function(i){delete uniqueObjects[i][unique]});return uniqueObjects}return $.grep(items,function(item,i){return $.inArray(item,items)===i})};$.trimSeparators=function(keyword,separator,removeDuplicates){var s=separator;keyword=keyword.replace(new RegExp("^["+s+"\\s]+|["+s+",\\s]+$","g"),"").replace(new RegExp(s+"["+s+"\\s]*"+s,"g"),s).replace(new RegExp("[\\s]+"+s,"g"),s).replace(new RegExp(s+"[\\s]+","g"),s);if(removeDuplicates){keyword=$.distinct(keyword.split(s)).join(s)}return keyword};$.isNumeric=function(n){return!isNaN(parseFloat(n))&&isFinite(n)};$.Number={rotate:function(n,min,max,offset){if(offset===undefined)offset=0;n+=offset;if(n<min){n+=max+1}else if(n>max){n-=max+1}return n}};$.fn.stretchToFit=function(){return $.each(this,function(){var $this=$(this);$this.css("width","100%").css("width",$this.width()*2-$this.outerWidth(true)-parseInt($this.css("borderLeftWidth"))-parseInt($this.css("borderRightWidth")))})};$.fn.serializeJSON=function(stringify){var obj={};$.each($(this).serializeArray(),function(i,prop){if(obj.hasOwnProperty(prop.name)){if(!$.isArray(obj[prop.name])){obj[prop.name]=[obj[prop.name]]}obj[prop.name].push(prop.value)}else{obj[prop.name]=prop.value}});if(stringify){obj=(JSON.stringify||$.toJSON).apply(this,obj)}return obj};$.fn.toHTML=function(){return $("<div>").html(this).html()};!function(){var Bloop=function(items){this.items=items;this.start=0;this.end=items.length-1;this.node=null;this.stopped=false};$.extend(Bloop.prototype,{isLooping:function(){if(this.stopped)return false;if(Math.abs(this.start-this.end)>1){this.node=Math.floor((this.start+this.end)/2);return true}return false},flip:function(flip){if(flip){this.end=this.node-1}else{this.start=this.node+1}},stop:function(){this.stop=true}});$.Bloop=function(items){return new Bloop(items)}}();$.remap=function(to,from,props){$.each(props,function(i,prop){to[prop]=from[prop]});return obj};$.deletes=function(obj,props){$.each(props,function(i,prop){delete obj[prop]})};!function(){var Threads=function(options){this.threads=[];this.threadCount=0;this.threadLimit=options.threadLimit||1;this.threadDelay=options.threadDelay||0};$.extend(Threads.prototype,{add:function(thread,type){if(!$.isFunction(thread))return;thread.type=type||"normal";if(type=="deferred"){thread.deferred=$.Deferred().always($.proxy(this.next,this))}this.threads.push(thread);this.run()},addDeferred:function(thread){return this.add(thread,"deferred")},next:function(){this.threadCount--;this.run()},run:function(){var self=this;setTimeout(function(){if(self.threads.length<1)return;if(self.threadCount<self.threadLimit){self.threadCount++;var thread=self.threads.shift();try{thread.call(thread,thread.deferred)}catch(e){console.error(e)}!thread.deferred&&self.next()}},self.threadDelay)}});$.Threads=function(options){return new Threads(options)}}();!function(){var isFunction=$.isFunction;var Enqueue=function(){this.lastId=0};Enqueue.prototype.queue=function(filter){var self=this,id=$.uid();self.lastId=id;return function(){if(self.lastId===id){var args=arguments,args=isFunction(filter)?filter.apply(this,args):args;return isFunction(self.fn)?self.fn.apply(this,args):args}}};$.Enqueue=function(fn){var self=new Enqueue;if($.isFunction(fn))self.fn=fn;var func=$.proxy(self.queue,self);func.reset=function(){self.lastId=0};return func}}();!function(){var instance="___eventable",publicMethods=["on","off","fire"],getEventName=function(name){return name.split(".")[0]};var Eventable=function(mode){this.fnList={};this.events={};this.mode=mode};$.extend(Eventable.prototype,{createEvent:function(name){return this.events[name]=$.Callbacks(this.mode)},on:function(name,fn){if(!name||!$.isFunction(fn))return this;var fnList=this.fnList;(fnList[name]||(fnList[name]=[])).push(fn);var basename=getEventName(name);(this.events[basename]||this.createEvent(basename)).add(fn);return this},off:function(name){if(!name)return this;var basename=getEventName(name),event=this.events[basename];if(!event)return this;var removeCallbacks=function(fnList){$.each(fnList,function(i,fn){event.remove(fn)})};if(basename!==name){$.each(this.fnList,function(name,fnList){if(name.indexOf(basename)>-1){removeCallbacks(fnList)}})}else{removeCallbacks(this.fnList[name])}return this},fire:function(name){var event=this.events[name];if(!event)return;event.fire.apply(event,$.makeArray(arguments).slice(1));return this},destroy:function(){for(name in this.events){this.events[name].disable()}}});$.eventable=function(obj,mode){var eventable=obj[instance];if(eventable&&mode==="destroy"){eventable.destroy();$.deletes(obj,publicMethods);return delete obj[instance]}eventable=obj[instance]=new Eventable(mode);obj.on=$.proxy(eventable.on,eventable);obj.off=$.proxy(eventable.off,eventable);obj.fire=$.proxy(eventable.fire,eventable);return obj}}();$.Chunk=function(array,options){if($.isArray(array)){array=[]}var options=$.extend({},{size:256,every:1e3},options);var self=$.extend($.Deferred(),{size:options.size,every:options.every,from:0,to:array.length,process:function(callback){self.process.fn=callback;return self},chunkStart:function(callback){self.chunkStart.fn=callback;return self},chunkEnd:function(callback){self.chunkEnd.fn=callback;return self},start:function(){self.stopped=false;self.iterate();return self},iterate:function(){if(self.stopped)return;var iterator=self.process.fn;if(!iterator)return;self.to=from.size+self.size;var max=array.length;if(self.to>max){self.to=max}var range={from:self.from,to:self.to};self.chunkStart.fn&&self.chunkStart.fn.call(self,range.from,range.to);while(self.from<self.to){if(self.stopped)break;iterator.call(self,array[self.from]);self.from++}self.chunkEnd.fn&&self.chunkEnd.fn.call(self,range.from,range.to);self.completed=self.from>=array.length-1;if(self.completed){self.resolveWith(self)}else{self.nextIteration=setTimeout(self.iterate,self.every)}return self},pause:function(){self.stopped=true;clearTimeout(self.nextIteration);return self},restart:function(){if(self.state()==="rejected")return self;self.from=0;self.start();return self},stop:function(){self.pause();self.rejectWith(self,[self.from]);return self}});return self};$.fn.disabled=function(x){return x===undefined?this.hasClass("disabled"):this.toggleClass("disabled",!!x)};$.fn.enabled=function(x){return x===undefined?!this.disabled():this.disabled(!x)};!function(){var self=$.Ajax=function(options){var request=$.Deferred(),args=arguments;$.isPlainObject(options)&&$.isFunction(options.beforeCreate)&&options.beforeCreate(request);self.queue.addDeferred(function(queue){request.xhr=$.ajax.apply(null,args).pipe(request.resolve,request.reject,request.notify);setTimeout(queue.resolve,self.requestInterval)});return request};self.queue=$.Threads({threadLimit:1});self.requestInterval=1200}()});