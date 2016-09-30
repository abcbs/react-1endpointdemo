$(function(){
    var Todo=Backbone.Model.extend({
        // 设置默认的属性
        defaults:{
            content:"empty todo...",
            done:false
        },
        //确保每一个content都不为空
        initialize:function(){
            if(!this.get("content")){
                this.set({"content":this.defaults.content});
            }
        },
        // 将一个任务的完成状态置为逆状态
        toggle:function(){
            this.save({done:!this.get("done")});
        },
        //从localStorage中删除一个条目
        clear:function(){
            this.destroy();
        }
    });

    /**
     *Todo的一个集合，数据通过localStorage存储在本地。
     **/
    var TodoList=Backbone.Collection.extend({
    // 设置Collection的模型为Todo
        model:Todo,
        //存储到本地，以todos-backbone命名的空间中
        //localStorage:new Store("todos-backbone"),
        localStorage: new Backbone.LocalStorage("todos-backbone"),

        // Filter down the list of all todo items that are finished.
        done: function() {
            return this.where({done: true});
        },

        // Filter down the list to only todo items that are still not finished.
        remaining: function() {
            return this.where({done: false});
        },

        // We keep the Todos in sequential order, despite being saved by unordered
        // GUID in the database. This generates the next order number for new items.
        nextOrder: function() {
            if (!this.length) return 1;
            return this.last().get('order') + 1;
        },

        // Todos are sorted by their original insertion order.
        comparator: 'order'

    });

    // 首先是创建一个全局的Todo的collection对象
    var Todos=new TodoList;

    //先来看TodoView，作用是控制任务列表
    var TodoView=Backbone.View.extend({

        //下面这个标签的作用是，把template模板中获取到的html代码放到这标签中。
        tagName: "li",

        // 获取一个任务条目的模板
        template: _.template($('#item-template').html()),

        //为每一个任务条目绑定事件
        events: {
            "click .toggle": "toggleDone",
            "dblclick .view": "edit",
            "click a.destroy": "clear",
            "keypress .edit": "updateOnEnter",
            "blur .edit": "close"
        },

        //在初始化设置了todoview和todo的以一对一引用，这里我们可以把todoview看作是todo在界面的映射。
        initialize:function(){
            _.bindAll(this,'render','close','remove');
            this.model.bind('change',this.render);
            this.model.bind('destroy',this.remove);//这个remove是view的中的方法，用来清除页面中的dom
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('done', this.model.get('done'));
            this.input = this.$('.edit');
            return this;
        },

        // 控制任务完成或者未完成
        toggleDone:function(){
            this.model.toggle();
        },

        //修改任务条目的样式
        edit:function(){
            $(this.el).addClass("editing");
            this.input.focus();
        },
        // 关闭编辑界面，并把修改内容同步到界面
        close:function(){
            this.model.save({content:this.input.val()});//会触发change事件
            $(this.el).removeClass("editing");
        },

        // 按下回车之后，关闭编辑界面
        updateOnEnter:function(e){
            if(e.keyCode==13)this.close();
        },

        // 移除对应条目，以及对应的数据对象
        clear:function(){
            this.model.clear();
        }

    });

    //显示所有任务列表，显示整体的列表状态（如：完成多少，未完成多少）
    //以及任务的添加。主要是整体上的一个控制
    var AppView=Backbone.View.extend({

        //绑定页面上主要的DOM节点
        el:$("#todoapp"),
        //在底部显示的统计数据模板
        statsTemplate:_.template($('#stats-template').html()),

        //绑定dom节点上的事件
        events:{
            "keypress #new-todo":"createOnEnter",
            "keyup #new-todo": "showTooltip",
            "click #clear-completed": "clearCompleted",
            "click #toggle-all": "toggleAllComplete"
        },

        //在初始化过程中，绑定事件到Todos上，当任务列表改变时会触发对应的事件。
        //最后把存在localStorage中的数据取出来。
        initialize:function(){
            //下面这个是underscore库中的方法，用来绑定方法到目前的这个对象中，是为了在以后运行环境中调用当前
            //对象的时候能够找到对象中的这些方法。
            _.bindAll(this,'addOne','addAll','render','toggleAllComplete');
            this.input=this.$("#new-todo");
            
            this.allCheckbox=this.$("#toggle-all")[0];

            /**
            Todos.bind('add', this.addOne);
            Todos.bind('reset',this.addAll);
            Todos.bind('all', this.render);
            **/

            this.listenTo(Todos, 'add', this.addOne);
            this.listenTo(Todos, 'reset', this.addAll);
            this.listenTo(Todos, 'all', this.render);

            this.footer = this.$('footer');
            this.main = $('#main');

            Todos.fetch();
        },

        // 更改当前任务列表的状态
        /**
        render:function(){
            var done=Todos.done().length;
            var remaining=Todos.remaining().length;
            this.$('#todo-stats').html(this.statsTemplate({
                total: Todos.length,
                done: done,
                remaining:remaining
            }));

            //根据剩余多少未完成确定标记全部完成的checkbox的显示
            this.allCheckbox.checked=!remaining;
        },
        **/

        render: function() {
            var done = Todos.done().length;
            var remaining = Todos.remaining().length;

            if (Todos.length) {
                this.main.show();
                this.footer.show();
                this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
            } else {
                this.main.hide();
                this.footer.hide();
            }

            this.allCheckbox.checked = !remaining;
        },

        //添加一个任务到页面id为todo-list的div/ul中
        addOne:function(todo){
            var view=new TodoView({model:todo});
            this.$("#todo-list").append(view.render().el);
        },

        //把Todos中的所有数据渲染到页面,页面加载的时候用到
        addAll:function(){
            Todos.each(this.addOne);
        },

        //生成一个新Todo的所有属性的字典
        newAttributes:function(){
            return{
                content:this.input.val(),
                order: Todos.nextOrder(),
                done: false
            };
        },

        //创建一个任务的方法，使用backbone.collection的create方法。将数据保存到localStorage,这是一个html5
       // 的js库。需要浏览器支持html5 才能用。
        createOnEnter:function(e){
            if(e.keyCode!=13)return;
            //创建一个对象之后会在backbone中动态调用Todos的add方法，该方法已绑定addOne。
            //Todos.create(this.newAttributes());
            //创建一个对象之后会在backbone中动态调用Todos的add方法，该方法已绑定addOne。
            Todos.create({content: this.input.val()});
            this.input.val('');
        },

        // 去掉所有已经完成的任务
        clearCompleted:function(){
            _.each(Todos.done(),function(todo){
                todo.clear();
            });
            return false;
        },

        //用户输入新任务的时候提示，延时1 秒钟
        //处理逻辑是：首先获取隐藏的提示节点的引用，然后获取用户输入的值，
        //先判断是否有设置显示的延时，如果有则删除，然后再次设置，因为这个事件是按键的keyup时发生的，
        //所以该方法会被连续调用。
        showTooltip:function(e){
            var tooltip=this.$(".ui-tooltip-top");
            var val=this.input.val();
            tooltip.fadeOut();
            if(this.tooltipTimeout){
                clearTimeout(this.tooltipTimeout);
            }
            if(val==''||val==this.input.attr('placeholder')){
                return;
            }
            var show=function(){
                tooltip.show().fadeIn();
            };
            this.tooltipTimeout=_.delay(show,1000);
        },

        //处理页面点击标记全部完成按钮
        //处理逻辑：如果标记全部按钮已选，则所有都完成，如果未选，则所有的都未完成。
        toggleAllComplete:function(){
            var done=this.allCheckbox.checked;
            Todos.each(function(todo){
                todo.save({'done':done});
            });
        }


    });
    var App=new AppView;
});