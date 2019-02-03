'use strict';var JSNInstaller=function(){this.installer=document.id('jsn-installer'),this.schedules=document.id('jsn-installer-list'),this.loginForm=document.id('jsn-installer-login'),this.schedules?this.loginForm?this.init():this.install():this.finish()};JSNInstaller.prototype={init:function init(){this.loginForm.getElement('button.btn').addEvent('click',this.install.bind(this))},install:function install(){this.loginForm&&(this.loginForm.hide(),this.schedules.show()),this.schedules=this.schedules.getChildren('li'),this.current=0,this.downloadPackage()},downloadPackage:function downloadPackage(){this.current<this.schedules.length?(this.schedules[this.current].getElement('ul').show(),this.schedules[this.current].getElement('.jsn-installer-downloading').setStyle('display','list-item'),this.installer.task.value='installer.download',new Request({url:this.installer.getAttribute('action')+'?'+this.schedules[this.current].getAttribute('ref'),data:this.installer,onComplete:function(a){var c,b=this.schedules[this.current].getElement('.jsn-installer-downloading .jsn-installer-status').removeClass('jsn-icon-loading');this.clearTimer(this.schedules[this.current].getElement('.jsn-installer-downloading .jsn-installer-processing')),(c=a.match(/^FAIL:([^\|]+)\|(https?:\/\/.+)$/))?(b.addClass('jsn-icon-warning'),this.schedules[this.current].getElement('.jsn-installer-downloading .jsn-installer-error').show().innerHTML=c[1],this.manualDownload(c[2])):a.match(/^jsn_[^\s]+_install\.zip$/)?(b.addClass('jsn-icon-ok'),this.installPackage(a)):(b.addClass('jsn-icon-fail'),this.schedules[this.current].getElement('.jsn-installer-downloading .jsn-installer-error').show().innerHTML=a,this.current++,this.downloadPackage())}.bind(this)}).send(),this.setTimer(this.schedules[this.current].getElement('.jsn-installer-downloading .jsn-installer-processing'))):this.finish()},manualDownload:function manualDownload(a){this.downloader=this.downloader||document.id('jsn-installer-manual-download'),this.downloader.show().injectInside(this.schedules[this.current].getElement('.jsn-installer-downloading .jsn-installer-error').show()),this.downloader.getElement('ol li a').setProperty('href',a),this.downloader.getElement('button').onclick=function(){return this.installPackage(),!1}.bind(this)},installPackage:function installPackage(a){if(a||'block'!=this.downloader.getStyle('display')||(this.schedules[this.current].getElement('.jsn-installer-downloading .jsn-installer-status').removeClass('jsn-icon-warning').addClass('jsn-icon-ok'),this.downloader.getParent().hide()),this.schedules[this.current].getElement('.jsn-installer-installing').setStyle('display','list-item'),this.installer.task.value='installer.install',a)new Request({url:this.installer.getAttribute('action')+'?package='+a+'&'+this.schedules[this.current].getAttribute('ref'),data:this.installer,onComplete:this.finalizeInstall.bind(this)}).send();else{var b='jsn_installer_iframe_'+this.current,c=function(){var f=document.createElement('div');return function(g){f.innerHTML=g;var h=f.firstChild;return f.removeChild(h)}}();for(var d in this.iframe=c('<iframe src="javascript:false;" name="'+b+'" />'),this.iframe.setAttribute('id',b),this.iframe.style.display='none',document.body.appendChild(this.iframe),this.form=c('<form method="post" enctype="multipart/form-data"></form>'),this.form.setAttribute('action',this.installer.action+'?'+this.schedules[this.current].getAttribute('ref')),this.form.setAttribute('target',this.iframe.name),this.form.style.display='none',document.body.appendChild(this.form),this.installer)if(this.installer[d]&&this.installer[d].nodeName&&'input'==this.installer[d].nodeName.toLowerCase())if('hidden'==this.installer[d].getAttribute('type')){var e=document.createElement('input');e.setAttribute('type','hidden'),e.setAttribute('name',d),e.setAttribute('value',this.installer[d].value),this.form.appendChild(e)}else'file'==this.installer[d].getAttribute('type')&&this.form.appendChild(this.installer[d]);this.form.submit(),this.form.parentNode.removeChild(this.form),this.form=null,document.id('jsn-installer-package-selector').appendChild(c('<input type="file" name="package" size="40" />')),this.getResponse()}this.setTimer(this.schedules[this.current].getElement('.jsn-installer-installing .jsn-installer-processing'))},getResponse:function getResponse(){var a=!1;this.iframe.onload=function(){if('javascript:\'%3Chtml%3E%3C/html%3E\';'==this.iframe.src||'javascript:\'<html></html>\';'==this.iframe.src)return void(a&&setTimeout(function(){this.iframe.parentNode.removeChild(this.iframe),this.iframe=null}.bind(this),0));var b=this.iframe.contentDocument?this.iframe.contentDocument:window.frames[this.iframe.id].document;b.readyState&&'complete'!=b.readyState||b.body&&'false'==b.body.innerHTML||(this.finalizeInstall(b.body.innerHTML),a=!0,this.iframe.src='javascript:\'<html></html>\';')}.bind(this)},finalizeInstall:function finalizeInstall(a){var c,b=this.schedules[this.current].getElement('.jsn-installer-installing .jsn-installer-status').removeClass('jsn-icon-loading');this.clearTimer(this.schedules[this.current].getElement('.jsn-installer-installing .jsn-installer-processing')),(c=a.match(/^FAIL:([^\|]+)\|(https?:\/\/.+)$/))?(b.addClass('jsn-icon-warning'),this.schedules[this.current].getElement('.jsn-installer-installing .jsn-installer-error').show().innerHTML=c[1],this.manualDownload(c[2])):('SUCCESS'==a?b.addClass('jsn-icon-ok'):(b.addClass('jsn-icon-fail'),this.schedules[this.current].getElement('.jsn-installer-installing .jsn-installer-error').show().innerHTML=a),this.current++,this.downloadPackage())},finish:function finish(){this.installer.task.value='installer.finalize',document.id('jsn-installer-finalization').show()},setTimer:function setTimer(a){this.processing=a,this.timer=setInterval(function(){var b=this.processing.innerHTML;this.processing.innerHTML='Still in progress...'==b?'Please wait...':'Still in progress...'}.bind(this),3e3)},clearTimer:function clearTimer(a){clearInterval(this.timer),a.hide()}},new JSNInstaller;