/*------------------------------------css相关的------------------------------------------*/

$.extend({
    // 获取指定元素的某个样式
    getStyle: function ( ele, style ) {
        if ( ele.currentStyle ) {
            return ele.currentStyle[ style ];
        }else {
            return window.getComputedStyle( ele )[ style ];
        }
    }
});
$.fn.extend({
    css: function ( name, value ) {

        // 传入一个参数的处理
        if ( value === undefined ) {

            // 如果传入的是一个字符串，那么就是获取第一个元素的样式
            if ( $.isString( name ) ) {
                return $.getStyle( this[0], name );
            }

            // 如果传入的是一个对象，那么给所有的元素批量设置样式
            if ( typeof name === 'object' ) {

                /*// 遍历所有的元素
                 for ( var i = 0; i < this.length; i++ ) {

                 // 遍历所有的样式
                 for ( var key in name ) {
                 this[i].style[ key ] = name[key];
                 }
                 }*/

                // 遍历所有的元素
                this.each( function () {
                    // 把遍历到的每一个元素先存储起来
                    var that = this;
                    // 遍历所有的样式
                    $.each(name, function ( key, val ) {
                        // 给每一个元素设置样式
                        that.style[ key ] = val;
                    });
                });
            }

        }else if ( $.isString( name ) && $.isString( value ) ){

            // 如果传入两个字符串，那么给所有的元素设置指定的样式
            this.each( function () {

                // 给每一个元素设置样式
                this.style[ name ] = value;
            });
        }

        // 实例链式编程
        return this;
    },

    // 显示所有的元素
    show: function () {
        return this.css( 'display', 'block' );
    },

    // 隐藏所有的元素
    hide: function () {
        return this.css( 'display', 'none' );
    }
});

/*------------------------------------Class相关的------------------------------------------*/

// 静态方法，所有人通用。
$.extend({

    // 查看指定元素中，是否含有指定的className
    hasClass: function( ele, className ) {
        if ( (' ' + ele.className + ' ').indexOf(' ' + className + ' ') > -1 ) {
            return true;
        }
        return false;
    },

    // 给指定元素，添加一个指定的className
    addClass: function ( ele, className ) {

        // 已经有了，就不用添加了
        if ( $.hasClass( ele, className ) ) {
            return false;
        }

        if ( ele.className === '' ) {
            ele.className = className;
        }else {
            ele.className += ' ' + className;
        }
    },

    // 删除元素指定的className
    removeClass: function ( ele, className ) {
        ele.className = (' ' + ele.className + ' ').replace(' ' + className + ' ', ' ');
    }
});

// 实例方法，供实例使用。
$.fn.extend({

    // 查看所有元素中，是否有元素存在指定的className
    hasClass: function ( className ) {
        var i = 0, len = this.length;
        // 遍历所有的元素，只要有一个元素存在这个class，
        // 那么就返回true，否则返回false
        for ( ; i < len; i++ ) {
            // 只要有一个元素存在这个class，那么就返回true
            if ( $.hasClass( this[i], className ) ) {
                return true;
            }
        }
        return false;
    },

    // 给所有元素添加指定的className，如果元素已经有了，那么就不用重复添加了
    addClass: function ( className ) {
        this.each( function ( key, val ) {
            $.addClass( this, className );
        });

        // 实例链式编程
        return this;
    },

    // 把所有元素指定的className删除掉
    removeClass: function ( className ) {
        /*
         * 先遍历得到所有的元素，
         * 再获取元素的className，在获取到的className前后分别加一个空格，
         * 然后把得到的字符串，使用replace替换' ' + className + ' '为空格，即可完成删除。
         * */
        this.each( function () {
            $.removeClass( this, className );
            //this.className = (' ' + this.className + ' ').replace(' ' + className + ' ', ' ');
        });

        // 实例链式编程
        return this;
    },

    // 元素有这个class，那么就删除，没有就添加
    toggleClass: function ( className ) {
        /*
         * 先遍历得到所有的元素，
         * 分别使用hasClass查看这个元素有没有指定的class，
         * 没有则调用addClass进行添加，
         * 有则调用removeClass进行删除。
         * */
        this.each( function () {
            if ( $.hasClass( this, className ) ) {
                $.removeClass( this, className );
            }else {
                $.addClass( this, className );
            }
        });

        // 实例链式编程
        return this;
    }
});

/*-------------------------------------------属性相关---------------------------------------------*/

$.fn.extend({

    // attr获取和设置属性通过getAttribute与setAttribute方法实现
    // 如果传入一个字符串，那么就是获取；
    // 如果传入一个对象，那么就是批量设置；
    // 如果传入两个字符串，那么就设置指定的属性值
    attr: function ( name, value ) {
        var len = arguments.length;

        // 1个参数
        if ( len === 1 ) {

            // 如果是字符串，那就获取第一个元素的属性
            if ( $.isString( name ) ) {
                return this[0].getAttribute( name );
            }

            // 如果是对象，那么就给所有元素批量添加属性
            else if ( typeof name === 'object' ) {

                // 遍历所有的元素
                this.each( function () {
                    // 分别给每一个元素，批量添加属性
                    for ( var key in name ) {
                        this.setAttribute( key, name[ key ] );
                    }
                });
            }
        }

        // 2个参数，都是字符串的情况
        else if ( $.isString( name ) && $.isString( value ) ) {
            // 遍历所有的元素
            this.each( function () {
                // 分别给每一个元素添加指定的属性
                this.setAttribute( name, value );
            });
        }

        return this;
    },

    // prop获取和设置属性通过直接.的方式
    // 如果传入一个字符串，那么就是获取；
    // 如果传入一个对象，那么就是批量设置；
    // 如果传入两个字符串，那么就设置指定的属性值
    prop: function ( name, value ) {
        // 1个参数
        if ( value === undefined ) {

            // 如果是字符串，那就获取第一个元素的属性
            if ( $.isString( name ) ) {
                return this[0][ name ];
            }

            // 如果是对象，那么就给所有元素批量添加属性
            else if ( typeof name === 'object' ) {

                // 遍历所有的元素
                this.each( function () {
                    // 分别给每一个元素，批量添加属性
                    for ( var key in name ) {
                        this[ key ] = name[ key ];
                    }
                });
            }
        }

        // 2个参数，都是字符串的情况
        else if ( $.isString( name ) && $.isString( value ) ) {
            // 遍历所有的元素
            this.each( function () {
                // 分别给每一个元素添加指定的属性
                this[ name ] = value;
            });
        }

        return this;
    },

    /*
     * function { html } 设置或获取或删除元素的内容
     * param { html: string || null || 没有 }
     * */
    html: function ( html ) {
        /*
         * 实现思路：
         * 1、如果传入undefined，不做处理，
         * 2、如果传入null，遍历所有的元素，设置他们的innerHTML为空字符串，
         * 3、如果没有传参，则获取第一个元素的innerHTML，
         * 4、如果传入了html，那么遍历所有的元素，设置他们的innerHTML为传入的参数，
         * 备注，如果是获取，则返回第一个元素的innerHTML；如果是设置，则返回this。
         * */
        var len = arguments.length;

        // 如果传入undefined，不做任何处理
        if ( len == 1 && html === undefined ) {
            return this;
        }
        // 如果传入null,清除所有元素内容
        else if ( html === null ) {
            this.prop( 'innerHTML', '' );
        }
        // 如果没有传参，获取第一个元素内容
        else if ( len == 0 ) {
            return this.prop( 'innerHTML' );
        }
        // 如果传参了
        else {
            this.prop( 'innerHTML', html );
        }

        // 为了链式编程
        return this;
    },

    // 设置或获取元素里面的文本
    text: function ( text ) {

        var len = arguments.length,
            result = '';

        // 传入undefined，不做任何处理
        if ( len === 1 && text === undefined ) {
            return this;
        }

        // 没传参，返回所有元素的innerText
        else if ( len === 0 ) {
            this.each( function() {
                result += this.innerText;
            } );
            return result;
        }

        // 如果传入null，那么清空内容
        else if ( text === null ) {
            text = '';
        }

        // 交由prop处理
        return this.prop( 'innerText', text );
    },

    // 设置或获取元素的value属性值
    val: function ( value ) {

        var len = arguments.length;

        // 没传参，返回第一个元素的value属性值
        if ( len === 0 ) {
            return this.prop( 'value' );
        }

        // 如果传入null或undefined，那么重置value属性值
        else if ( value == null ) {
            value = '';
        }

        // 交由prop处理
        return this.prop( 'value', value );
    }
});