// 原型上添加DOM方法
jQuery.fn.extend({

    // 把调用该方法的N多元素  分别  添加到selector对应的N多元素里
    // 把调用该方法的N多元素  添加到selector中的1个元素里
    appendTo: function ( selector ) {
        /*
         * $('p').appendTo('div');
         * 执行过程：
         * 外面循环的是被添加的元素，里面循环的是元素被添加到的目的地。
         *
         * 1、外面第一次循环遍历到第一个p元素，
         * 2、然后在里面的循环中遍历2个div，把p的2个clone版本分别添加到2个div中；
         *
         * 3、外面第二次循环遍历到第二个p元素，
         * 4、然后在里面的循环中再遍历2个div，把第二个p的2个clone版本分别再添加到2个div中；
         * */

        var i = 0, len = this.length,
            j, lenJ, result = [], dom;

        // 不管传入的是DOM、选择器、实例对象，统一使用jQuery包装成实例对象处理。
        var new$ = jQuery( selector );

        // 遍历this中的每一个元素，分别添加到new$中的每一个元素。
        for ( ; i < len; i++) {

            // 遍历new$
            for ( j = 0, lenJ = new$.length; j < lenJ; j++ ) {

                // 使用一个中间变量先把要添加的元素保存一下，
                // 然后push到result中，append到指定元素中。
                // 三元运算含义：第一次把我自己添加进去，以后就添加我的clone版本
                dom = j === 0? this[i] : this[i].cloneNode( true );
                result.push( dom );

                // 依次把this中的元素添加到new$中的每一个元素
                new$[j].appendChild( dom );
            }

        }

        // 把所有新添加的元素，包装成一个jQuery对象返回
        return jQuery( result );

        /*// 假设selector是DOM
         // 遍历this里面的DOM元素，依次添加到selector里面
         for ( ; i < len; i++) {
         selector.appendChild( this[i] );
         }*/

        /*// 假设jQuery对象
         // 遍历this里面的DOM元素，依次添加到selector里面
         for ( ; i < len; i++) {

         // 遍历selector里面所有的元素
         for ( j = 0; j < lenJ; j++ ) {

         // 依次把this中的元素添加进去
         selector[j].appendChild( this[i].cloneNode( true ) );
         }

         }*/

        // 假设传入的是选择器,
        // 那么我们自己可以通过这个选择器得到jQuery实例对象，
        // 那么处理方式就和上面一样了。

        // 遍历this里面的DOM元素，依次添加到selector里面
        /*var new$ = jQuery( selector );
         var k = 0, lenK = new$.length;

         for ( ; i < len; i++) {

         // 遍历selector里面所有的元素
         for ( k = 0; k < lenK; k++ ) {

         // 依次把this中的元素添加进去
         new$[k].appendChild( this[i].cloneNode( true ) );
         }

         }*/
    },

    // 把selector对应的N多元素，添加到调用该方法的this中
    append: function ( selector ) {

        // 如果是字符串，并且不是hmtl字符串，那么把它作为文本添加到元素中
        if ( jQuery.isString( selector ) && !jQuery.isHtml( selector ) ) {

            // 外面的this，是append调用者，即实例对象
            this.each(function () {

                // 里面的this，是each遍历到的实例对象中的每一个value值
                this.appendChild( document.createTextNode( selector ) );
            });
        }

        // 否则把 selector 对应的元素 添加 到 this 对应的元素中
        else {
            var new$ = jQuery( selector );
            new$.appendTo( this );
        }

        return this;
    },

    // 把this所以的元素添加到selector所有的元素的最前面
    prependTo: function ( selector ) {
        /*
         * $('p').appendTo('div');
         * 执行过程：
         * 外面循环的是被添加的元素，里面循环的是元素被添加到的目的地。
         *
         * 1、外面第一次循环遍历到第一个p元素，
         * 2、然后在里面的循环中遍历2个div，把p的2个clone版本分别添加到2个div中；
         *
         * 3、外面第二次循环遍历到第二个p元素，
         * 4、然后在里面的循环中再遍历2个div，把第二个p的2个clone版本分别再添加到2个div中；
         * */

        var i = 0, len = this.length,
            j, lenJ, result = [], dom;

        // 不管传入的是DOM、选择器、实例对象，统一使用jQuery包装成实例对象处理。
        var new$ = jQuery( selector );

        // 遍历this中的每一个元素，分别添加到new$中的每一个元素。
        for ( ; i < len; i++) {

            // 遍历new$
            for ( j = 0, lenJ = new$.length; j < lenJ; j++ ) {

                // 使用一个中间变量先把要添加的元素保存一下，
                // 然后push到result中，append到指定元素中。
                // 三元运算含义：第一次把我自己添加进去，以后就添加我的clone版本
                dom = j === 0? this[i] : this[i].cloneNode( true );
                result.push( dom );

                // 依次把this中的元素添加到new$中的每一个元素
                new$[j].insertBefore( dom, new$[j].firstChild );
            }

        }

        // 把所有新添加的元素，包装成一个jQuery对象返回
        return jQuery( result );
    },

    // 给this中所有元素的前面添加元素
    prepend: function ( selector ) {

        // 如果是字符串，并且不是hmtl字符串，那么把它作为文本添加到元素中
        if ( jQuery.isString( selector ) && !jQuery.isHtml( selector ) ) {

            // 外面的this，是prepend调用者，即实例对象
            this.each(function () {

                // 里面的this，是each遍历到的实例对象中的每一个value值，
                // 把这个值添加到某元素的最前面
                this.insertBefore( document.createTextNode( selector ),  this.firstChild );
            });
        }

        // 否则把 selector 对应的元素 添加 到 this 对应的元素的最前面
        else {
            var new$ = jQuery( selector );
            new$.prependTo( this );
        }

        return this;
    },

    // 把实例中所有元素的内容都清空
    empty: function () {
        this.each(function () {

            // 把遍历到的每一个元素内容清空
            this.innerHTML = '';
        });

        return this;
    },

    // 删除自己
    remove: function () {
        this.each(function () {

            // 获取遍历到的每一个元素的父元素，然后通过父元素的removeChild删除自己。
            this.parentNode.removeChild( this );
        });

        return this;
    }
});