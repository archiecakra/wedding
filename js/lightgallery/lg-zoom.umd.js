!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.lgZoom=e()}(this,(function(){"use strict";var t=function(){return t=Object.assign||function(t){for(var e,o=1,a=arguments.length;o<a;o++)for(var i in e=arguments[o])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},t.apply(this,arguments)},e={scale:1,zoom:!0,actualSize:!0,showZoomInOutIcons:!1,actualSizeIcons:{zoomIn:"lg-zoom-in",zoomOut:"lg-zoom-out"},enableZoomAfter:300},o="lgContainerResize",a="lgBeforeOpen",i="lgSlideItemLoad",s="lgAfterSlide";return function(){function r(o,a){return this.core=o,this.$LG=a,this.settings=t(t({},e),this.core.settings),this.settings.zoom&&(this.init(),this.zoomableTimeout=!1,this.positionChanged=!1,this.pageX=this.core.outer.width()/2,this.pageY=this.core.outer.height()/2+this.$LG(window).scrollTop(),this.scale=1),this}return r.prototype.buildTemplates=function(){var t=this.settings.showZoomInOutIcons?'<button id="'+this.core.getIdName("lg-zoom-in")+'" type="button" class="lg-zoom-in lg-icon"></button><button id="'+this.core.getIdName("lg-zoom-out")+'" type="button" class="lg-zoom-out lg-icon"></button>':"";this.settings.actualSize&&(t+='<button id="'+this.core.getIdName("lg-actual-size")+'" type="button" class="'+this.settings.actualSizeIcons.zoomIn+' lg-icon"></button>'),this.core.outer.addClass("lg-use-transition-for-zoom"),this.core.$toolbar.first().append(t)},r.prototype.enableZoom=function(t){var e=this,o=this.settings.enableZoomAfter+t.detail.delay;this.$LG("body").first().hasClass("lg-from-hash")&&t.detail.delay?o=0:this.$LG("body").first().removeClass("lg-from-hash"),this.zoomableTimeout=setTimeout((function(){e.core.getSlideItem(t.detail.index).addClass("lg-zoomable")}),o+30)},r.prototype.enableZoomOnSlideItemLoad=function(){this.core.LGel.on(i+".zoom",this.enableZoom.bind(this))},r.prototype.getModifier=function(t,e,o){var a=t;t=Math.abs(t);var i=this.getCurrentTransform(o);if(!i)return 1;var s=1;if("X"===e){var r=Math.sign(parseFloat(i[0]));0===t||180===t?s=1:90===t&&(s=-90===a&&1===r||90===a&&-1===r?-1:1),s*=r}else{var n=Math.sign(parseFloat(i[3]));if(0===t||180===t)s=1;else if(90===t){var l=parseFloat(i[1]),g=parseFloat(i[2]);s=Math.sign(l*g*a*n)}s*=n}return s},r.prototype.getImageSize=function(t,e,o){return 90===e&&(o="x"===o?"y":"x"),t[{y:"offsetHeight",x:"offsetWidth"}[o]]},r.prototype.getDragCords=function(t,e){return 90===e?{x:t.pageY,y:t.pageX}:{x:t.pageX,y:t.pageY}},r.prototype.getSwipeCords=function(t,e){var o=t.targetTouches[0].pageX,a=t.targetTouches[0].pageY;return 90===e?{x:a,y:o}:{x:o,y:a}},r.prototype.getDragAllowedAxises=function(t,e){var o=this.core.$lgContent.get(),a=parseFloat(t.attr("data-scale"))||1,i=t.get(),s=this.getImageSize(i,e,"y")*a>o.clientHeight,r=this.getImageSize(i,e,"x")*a>o.clientWidth;return 90===e?{allowX:s,allowY:r}:{allowX:r,allowY:s}},r.prototype.getCurrentTransform=function(t){if(t){var e=window.getComputedStyle(t,null),o=e.getPropertyValue("-webkit-transform")||e.getPropertyValue("-moz-transform")||e.getPropertyValue("-ms-transform")||e.getPropertyValue("-o-transform")||e.getPropertyValue("transform")||"none";return"none"!==o?o.split("(")[1].split(")")[0].split(","):void 0}},r.prototype.getCurrentRotation=function(t){if(!t)return 0;var e=this.getCurrentTransform(t);return e?Math.round(Math.atan2(parseFloat(e[1]),parseFloat(e[0]))*(180/Math.PI)):0},r.prototype.zoomImage=function(t){var e=this.core.getSlideItem(this.core.index).find(".lg-image").first(),o=e.get();if(o){var a,i,s=this.core.outer.get().getBoundingClientRect(),r=(s.width-o.offsetWidth)/2+s.left,n=(s.height-o.offsetHeight)/2+this.$LG(window).scrollTop()+s.top;1===t&&(this.positionChanged=!1),this.positionChanged&&(a=parseFloat(e.parent().attr("data-x"))/(parseFloat(e.attr("data-scale"))-1),i=parseFloat(e.parent().attr("data-y"))/(parseFloat(e.attr("data-scale"))-1),this.pageX=a+r,this.pageY=i+n,this.positionChanged=!1);var l=(t-1)*(this.pageX-r),g=(t-1)*(this.pageY-n);this.setZoomStyles({x:l,y:g,scale:t})}},r.prototype.setZoomStyles=function(t){var e=this.core.getSlideItem(this.core.index).find(".lg-image").first(),o=this.core.outer.find(".lg-current .lg-dummy-img").first(),a=e.parent();e.attr("data-scale",t.scale+"").css("transform","scale3d("+t.scale+", "+t.scale+", 1)"),o.css("transform","scale3d("+t.scale+", "+t.scale+", 1)");var i="translate3d(-"+t.x+"px, -"+t.y+"px, 0)";a.css("transform",i),a.attr("data-x",t.x).attr("data-y",t.y)},r.prototype.setActualSize=function(t,e){var o=this;if(this.core.galleryItems[this.core.index].src){var a=this.getCurrentImageActualSizeScale();this.core.outer.hasClass("lg-zoomed")?this.scale=1:this.scale=this.getScale(a),this.setPageCords(e),this.beginZoom(this.scale),this.zoomImage(this.scale),setTimeout((function(){o.core.outer.removeClass("lg-grabbing").addClass("lg-grab")}),10)}},r.prototype.getNaturalWidth=function(t){var e=this.core.getSlideItem(t).find(".lg-image").first(),o=this.core.galleryItems[t].width;return o?parseFloat(o):e.get().naturalWidth},r.prototype.getActualSizeScale=function(t,e){return t>e?t/e||2:1},r.prototype.getCurrentImageActualSizeScale=function(){var t=this.core.getSlideItem(this.core.index).find(".lg-image").first().get().offsetWidth,e=this.getNaturalWidth(this.core.index)||t;return this.getActualSizeScale(e,t)},r.prototype.getPageCords=function(t){var e={};if(t)e.x=t.pageX||t.targetTouches[0].pageX,e.y=t.pageY||t.targetTouches[0].pageY;else{var o=this.core.outer.get().getBoundingClientRect();e.x=o.width/2+o.left,e.y=o.height/2+this.$LG(window).scrollTop()+o.top}return e},r.prototype.setPageCords=function(t){var e=this.getPageCords(t);this.pageX=e.x,this.pageY=e.y},r.prototype.beginZoom=function(t){(this.core.outer.removeClass("lg-zoom-drag-transition lg-zoom-dragging"),t>1)?(this.core.outer.addClass("lg-zoomed"),this.core.getElementById("lg-actual-size").removeClass(this.settings.actualSizeIcons.zoomIn).addClass(this.settings.actualSizeIcons.zoomOut)):this.resetZoom();return t>1},r.prototype.getScale=function(t){var e=this.getCurrentImageActualSizeScale();return t<1?t=1:t>e&&(t=e),t},r.prototype.init=function(){var t=this;this.buildTemplates(),this.enableZoomOnSlideItemLoad();var e=null;this.core.outer.on("dblclick.lg",(function(e){t.$LG(e.target).hasClass("lg-image")&&t.setActualSize(t.core.index,e)})),this.core.outer.on("touchstart.lg",(function(o){var a=t.$LG(o.target);1===o.targetTouches.length&&a.hasClass("lg-image")&&(e?(clearTimeout(e),e=null,t.setActualSize(t.core.index,o)):e=setTimeout((function(){e=null}),300),o.preventDefault())})),this.core.LGel.on(o+".zoom",(function(){t.core.lgOpened&&(t.setPageCords(),t.zoomImage(t.scale))})),this.core.getElementById("lg-zoom-out").on("click.lg",(function(){t.core.outer.find(".lg-current .lg-image").get()&&(t.scale-=t.settings.scale,t.scale=t.getScale(t.scale),t.beginZoom(t.scale),t.zoomImage(t.scale))})),this.core.getElementById("lg-zoom-in").on("click.lg",(function(){t.zoomIn()})),this.core.getElementById("lg-actual-size").on("click.lg",(function(){t.setActualSize(t.core.index)})),this.core.LGel.on(a+".zoom",(function(){t.core.outer.find(".lg-item").removeClass("lg-zoomable")})),this.core.LGel.on(s+".zoom",(function(e){var o=e.detail.prevIndex;t.scale=1,t.resetZoom(o)})),this.zoomDrag(),this.pinchZoom(),this.zoomSwipe()},r.prototype.zoomIn=function(t){this.core.galleryItems[this.core.index].src&&(t?this.scale=t:this.scale+=this.settings.scale,this.scale=this.getScale(this.scale),this.beginZoom(this.scale),this.zoomImage(this.scale))},r.prototype.resetZoom=function(t){this.core.outer.removeClass("lg-zoomed lg-zoom-drag-transition");var e=this.core.getElementById("lg-actual-size"),o=this.core.getSlideItem(void 0!==t?t:this.core.index);e.removeClass(this.settings.actualSizeIcons.zoomOut).addClass(this.settings.actualSizeIcons.zoomIn),o.find(".lg-img-wrap").first().removeAttr("style data-x data-y"),o.find(".lg-image").first().removeAttr("style data-scale"),this.setPageCords()},r.prototype.getTouchDistance=function(t){return Math.sqrt((t.targetTouches[0].pageX-t.targetTouches[1].pageX)*(t.targetTouches[0].pageX-t.targetTouches[1].pageX)+(t.targetTouches[0].pageY-t.targetTouches[1].pageY)*(t.targetTouches[0].pageY-t.targetTouches[1].pageY))},r.prototype.pinchZoom=function(){var t=this,e=0,o=!1,a=1,i=this.core.getSlideItem(this.core.index);this.core.$inner.on("touchstart.lg",(function(o){i=t.core.getSlideItem(t.core.index),o.preventDefault(),2===o.targetTouches.length&&(t.$LG(o.target).hasClass("lg-item")||i.get().contains(o.target))&&(a=t.scale||1,t.core.outer.removeClass("lg-zoom-drag-transition lg-zoom-dragging"),t.core.touchAction="pinch",e=t.getTouchDistance(o))})),this.core.$inner.on("touchmove.lg",(function(s){if(s.preventDefault(),2===s.targetTouches.length&&"pinch"===t.core.touchAction&&(t.$LG(s.target).hasClass("lg-item")||i.get().contains(s.target))){var r=t.getTouchDistance(s),n=e-r;!o&&Math.abs(n)>5&&(o=!0),o&&(t.scale=Math.max(1,a+.008*-n),t.zoomImage(t.scale))}})),this.core.$inner.on("touchend.lg",(function(a){"pinch"===t.core.touchAction&&(t.$LG(a.target).hasClass("lg-item")||i.get().contains(a.target))&&(o=!1,e=0,t.scale<=1?t.resetZoom():(t.scale=t.getScale(t.scale),t.zoomImage(t.scale),t.core.outer.addClass("lg-zoomed")),t.core.touchAction=void 0)}))},r.prototype.touchendZoom=function(t,e,o,a,i,s){var r=this.core.getSlideItem(this.core.index).find(".lg-img-rotate").first().get(),n=e.x-t.x,l=e.y-t.y,g=Math.abs(n)/i+1,c=Math.abs(l)/i+1;g>2&&(g+=1),c>2&&(c+=1),n*=g,l*=c;var h=this.core.getSlideItem(this.core.index).find(".lg-img-wrap").first(),m=this.core.getSlideItem(this.core.index).find(".lg-object").first(),u=parseFloat(h.attr("data-x"))||0,d=parseFloat(h.attr("data-y"))||0,p={};p.x=-Math.abs(u)+n*this.getModifier(s,"X",r),p.y=-Math.abs(d)+l*this.getModifier(s,"Y",r);var f=this.getPossibleSwipeDragCords(m,s);if(Math.abs(n)>15||Math.abs(l)>15){if(a&&(p.y<=-f.maxY?p.y=-f.maxY:p.y>=-f.minY&&(p.y=-f.minY)),o&&(p.x<=-f.maxX?p.x=-f.maxX:p.x>=-f.minX&&(p.x=-f.minX)),a)h.attr("data-y",Math.abs(p.y));else{var y=parseFloat(h.attr("data-y"))||0;p.y=-Math.abs(y)}if(o)h.attr("data-x",Math.abs(p.x));else{var x=parseFloat(h.attr("data-x"))||0;p.x=-Math.abs(x)}this.setZoomSwipeStyles(h,p),this.positionChanged=!0}},r.prototype.getZoomSwipeCords=function(t,e,o,a,i,s,r,n,l){var g={};if(a){if(g.y=-Math.abs(s)+(e.y-t.y)*this.getModifier(n,"Y",l),g.y<=-i.maxY){var c=-i.maxY-g.y;g.y=-i.maxY-c/6}else if(g.y>=-i.minY){var h=g.y- -i.minY;g.y=-i.minY+h/6}}else g.y=-Math.abs(s);if(o){if(g.x=-Math.abs(r)+(e.x-t.x)*this.getModifier(n,"X",l),g.x<=-i.maxX){var m=-i.maxX-g.x;g.x=-i.maxX-m/6}else if(g.x>=-i.minX){var u=g.x- -i.minX;g.x=-i.minX+u/6}}else g.x=-Math.abs(r);return g},r.prototype.getPossibleSwipeDragCords=function(t,e){var o=this.core.$lgContent,a=o.height(),i=o.width(),s=this.getImageSize(t.get(),e,"y"),r=this.getImageSize(t.get(),e,"x"),n=parseFloat(t.attr("data-scale"))||1,l=Math.abs(n),g=(a-s)/2,c=Math.abs(s*l-a+g),h=(i-r)/2,m=Math.abs(r*l-i+h);return 90===e?{minY:h,maxY:m,minX:g,maxX:c}:{minY:g,maxY:c,minX:h,maxX:m}},r.prototype.setZoomSwipeStyles=function(t,e){t.css("transform","translate3d("+e.x+"px, "+e.y+"px, 0)")},r.prototype.zoomSwipe=function(){var t,e,o=this,a={},i={},s=!1,r=!1,n=!1,l=new Date,g=(new Date,0),c=0,h=null,m=0,u=this.core.getSlideItem(this.core.index);this.core.$inner.on("touchstart.lg",(function(i){if(i.preventDefault(),o.core.galleryItems[o.core.index].src&&(u=o.core.getSlideItem(o.core.index),(o.$LG(i.target).hasClass("lg-item")||u.get().contains(i.target))&&1===i.targetTouches.length&&o.core.outer.hasClass("lg-zoomed"))){l=new Date,o.core.touchAction="zoomSwipe";var s=o.core.getSlideItem(o.core.index).find(".lg-object").first();e=o.core.getSlideItem(o.core.index).find(".lg-img-wrap").first(),h=o.core.getSlideItem(o.core.index).find(".lg-img-rotate").first().get(),m=o.getCurrentRotation(h);var d=o.getDragAllowedAxises(s,Math.abs(m));n=d.allowY,((r=d.allowX)||n)&&(a=o.getSwipeCords(i,Math.abs(m))),c=parseFloat(e.attr("data-y")),g=parseFloat(e.attr("data-x")),t=o.getPossibleSwipeDragCords(s,m),o.core.outer.addClass("lg-zoom-dragging lg-zoom-drag-transition")}})),this.core.$inner.on("touchmove.lg",(function(l){if(l.preventDefault(),1===l.targetTouches.length&&"zoomSwipe"===o.core.touchAction&&(o.$LG(l.target).hasClass("lg-item")||u.get().contains(l.target))){o.core.touchAction="zoomSwipe",i=o.getSwipeCords(l,Math.abs(m));var d=o.getZoomSwipeCords(a,i,r,n,t,c,g,m,h);(Math.abs(i.x-a.x)>15||Math.abs(i.y-a.y)>15)&&(s=!0,o.setZoomSwipeStyles(e,d))}})),this.core.$inner.on("touchend.lg",(function(t){if("zoomSwipe"===o.core.touchAction&&(o.$LG(t.target).hasClass("lg-item")||u.get().contains(t.target))){if(o.core.touchAction=void 0,o.core.outer.removeClass("lg-zoom-dragging"),!s)return;s=!1;var e=(new Date).valueOf()-l.valueOf();o.touchendZoom(a,i,r,n,e,m)}}))},r.prototype.zoomDrag=function(){var t,e,o,a,i,s,r=this,n={},l={},g=!1,c=!1,h=null,m=0,u=!1,d=!1;this.core.outer.on("mousedown.lg.zoom",(function(e){if(r.core.galleryItems[r.core.index].src){var l=r.core.getSlideItem(r.core.index);if(r.$LG(e.target).hasClass("lg-item")||l.get().contains(e.target)){t=new Date;var c=r.core.getSlideItem(r.core.index).find(".lg-object").first();s=r.core.getSlideItem(r.core.index).find(".lg-img-wrap").first(),h=r.core.getSlideItem(r.core.index).find(".lg-img-rotate").get(),m=r.getCurrentRotation(h);var p=r.getDragAllowedAxises(c,Math.abs(m));d=p.allowY,u=p.allowX,r.core.outer.hasClass("lg-zoomed")&&r.$LG(e.target).hasClass("lg-object")&&(u||d)&&(e.preventDefault(),n=r.getDragCords(e,Math.abs(m)),o=r.getPossibleSwipeDragCords(c,m),g=!0,a=parseFloat(s.attr("data-y")),i=parseFloat(s.attr("data-x")),r.core.outer.get().scrollLeft+=1,r.core.outer.get().scrollLeft-=1,r.core.outer.removeClass("lg-grab").addClass("lg-grabbing lg-zoom-drag-transition lg-zoom-dragging"))}}})),this.$LG(window).on("mousemove.lg.zoom.global"+this.core.lgId,(function(t){if(g){c=!0,l=r.getDragCords(t,Math.abs(m));var e=r.getZoomSwipeCords(n,l,u,d,o,a,i,m,h);r.setZoomSwipeStyles(s,e)}})),this.$LG(window).on("mouseup.lg.zoom.global"+this.core.lgId,(function(o){if(g){if(e=new Date,g=!1,r.core.outer.removeClass("lg-zoom-dragging"),c&&(n.x!==l.x||n.y!==l.y)){l=r.getDragCords(o,Math.abs(m));var a=e.valueOf()-t.valueOf();r.touchendZoom(n,l,u,d,a,m)}c=!1}r.core.outer.removeClass("lg-grabbing").addClass("lg-grab")}))},r.prototype.closeGallery=function(){this.resetZoom()},r.prototype.destroy=function(){this.$LG(window).off(".lg.zoom.global"+this.core.lgId),this.core.LGel.off(".lg.zoom"),this.core.LGel.off(".zoom"),clearTimeout(this.zoomableTimeout),this.zoomableTimeout=!1},r}()}));