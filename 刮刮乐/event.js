$.extend({
    // 处理事件绑定兼容性
    addEvent: function( ele, type, fn ) {
        if ( ele.addEventListener ) {
            ele.addEventListener( type, fn );
        }else {
            ele.attachEvent( 'on' + type, fn );
        }
    },
    // 处理事件移除兼容性
    removeEvent: function( ele, type, fn ) {
        if ( ele.removeEventListener ) {
            ele.removeEventListener( type, fn );
        }else {
            ele.detachEvent( 'on' + type, fn );
        }
    }
});

// 原型添加一个点击事件
$.fn.extend({

    /*
     * 要求每一个DOM对象，都有一个it_events自定义属性，
     * 它是以事件名为key，函数数组为val的这样一个对象,
     * 这个对象的数据类型是这个样子的：
     * DOM.it_events = {
     *   click: [ 点击触发的函数1，点击触发的函数2... ] ,
     *   scroll: [ 滚动触发的函数1，滚动触发的函数2... ] ,
     *   change: [ 改变时触发的函数1，改变时触发的函数2... ]
     * }
     *
     * 代码的处理逻辑：
     * 1、如果是第一次给DOM绑定click事件，那么先需要给DOM添加it_events自定义属性；即DOM.it_events = {｝
     * 2、添加完毕后，再给这个it_events添加一个key为'click'的数组，即DOM.it_events = { click: []｝
     * 然后把事件触发的函数push进去,等待执行。
     * 3、最后需要给DOM绑定click事件( 根据浏览器的不同，绑定时调用的api不同 )，
     * 绑定事件时传入的回调函数里面，统一遍历添加到it_events['click']数组中存储的所有函数。
     *
     * 需要注意：
     * 如果不是第一次给DOM绑定click事件，那么只需要把函数push到it_events['click']即可。
     *
     * 不是第一次的话，为什么只push数组里面就可以了呢？
     * 因为第一次给DOM绑定的事件回调函数里面，会统一遍历it_events['click']执行里面的函数。
     * */
    on: function ( type, fn ) {

        // 遍历所有的元素，把fn存储到这些元素中
        this.each(function () {
            var that = this;

            // 判断这个DOM是不是第一次绑定该事件
            this.it_events = this.it_events || {};
            if (!this.it_events[ type ]) {
                this.it_events[ type ] = [];
                this.it_events[ type ].push( fn );

                // 某个类型的事件，只需要绑定一次就好
                jQuery.addEvent( type, eventTrigger );
                function eventTrigger( e ) {
                    for (var i = 0, len = that.it_events[type].length; i < len; i++) {
                        // 为了模仿原生的事件回调函数，
                        // 所以让这些回调函数执行时this指向绑定的DOM对象，
                        // 同时把Event对象传递过去，以供对方使用。
                        that.it_events[type][i].call( that, e );
                    }
                }

            }else {
                this.it_events[ type ].push( fn );
            }
        });

        return this;
    },

    // 解除事件回调函数
    off: function( type, fn ) {
        var arg = arguments;

        this.each( function () {
            var i, len, key;

            // 如果没有绑定过任何事件，不用做处理
            if ( this.it_events ) {

                // 如果不传任何参数，那么清空所有的事件队列
                if ( arg.length === 0 ) {
                    // 把所有的事件队列重新赋值为新数组
                    for ( key in this.it_events ) {
                        this.it_events[key] = [];
                    }
                }

                // 如果之前没有绑定过该类型的事件，那么就不用处理了。
                if ( this.it_events[ type ] ) {

                    // 只传入type，那么解除type类型的所有函数
                    if ( arg.length === 1 ) {
                        this.it_events[ type ] = [];
                    }

                    // 传入type和fn，那么解除type类型指定的函数
                    else if ( arg.length === 2 ) {

                        for ( i = 0, len = this.it_events[ type ].length; i < len; i++) {

                            // 把对应的函数给删除掉
                            if ( this.it_events[ type ][i] === fn ) {
                                this.it_events[ type ].splice( i, 1 );
                                break;
                            }
                        }
                    }
                }
            }
        });
    },

    // 第一个函数是over时触发的，
    // 第二个函数是out时触发的
    hover: function ( fn1, fn2 ) {
        return this.on( 'mouseover', fn1 ).on( 'mouseout', fn2 );
    },

    // 给元素绑定click事件，回调函数可以指定多个，
    // 每次点击的时候轮回执行这些函数
    toggle: function ( ) {
        var fns = arguments, i = 0;

        this.on( 'click', function ( e ) {

            // 轮回执行arg里面的每一个函数
            fns[i++ % arg.length].call( this, e );

        });
    }
});

// 给原型扩展一些事件绑定函数
$.each(( "blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error contextmenu" ).split( " " ),
    function ( index, value ) {
        // 以事件名为key，在原型上添加事件绑定方法
        $.fn[ value ] = function ( fn ) {
            // 交由on处理
            return this.on( value, fn );
        }
    });