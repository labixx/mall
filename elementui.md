+ 表单前缀图标：prefix-icon='图标名'
+ 表单后缀图标：suffix-icon='图标名'
+ 避免入坑之表单：
     + el-form表单一定要进行双向绑定数据，要不能不能输入
     + 表单以:model：实现双向绑定
     + 表单项以v-model：实现双向绑定
+ 避免入坑之重置功能：
     + 给表单设置ref
     + methods设置点击事件，调用ele的重置方法：this.$refs.表单ref名.resetFileds()
     + 注意：一定要给表单项增加prop属性，prop='对应model的值'
+ 给表单设置输入校验规则;
     + 给el-form表单增加:rules属性，：rules='校验规则名'
     + 在data属性里面定义规则,校验规则名{表单项的prop值:[{校验规则}]}
+ 对输入的表单数据进行校验思路
     + 设置输入校验规则，:rules
     + 是否符合校验规则， :validate((valid)=>{
     valid为true则再验证是否携带token,
     携带token则可以进入之后的界面，
     valid为false则让进行登录，再登录界面
     })
     + 在路由配置文件中，设置路由全局守卫，使用beforeEach(to,from,next)实现
          + 如果请求的路径为登录界面则直接放行
          + 如果请求的路径为别的界面则判断是否携带token,携带token则放行，没有携带则强制放行到登录界面
+ 登录成功后，访问别的路径使用携带token访问
     + 在请求拦截器中添加req.heads.Authorization为token值
     + 在响应拦截器中，如果响应状态为401则清除token,并且重新进入登录界面，自动进入当前界面
+ 整体页面布局可以使用：el-container,具体的可以看：container组件布局
+ 避免踩坑之表单的自定义校验规则，自定义校验规则是在data里面写，不要写在return里面，然后写校验规则的时候最后一定一定要执行那个回调函数，一定一定，要不然那个预校验的时候为true时不会执行
+避免踩坑之el-dialog的visible.sync属性，不可以通过props来传递，要不然会报错，只能通过父组件传给子组件，可通过this.$emit或者vuex来实现，要不然点击那个X关闭窗口会报错
+ 避免踩坑之验证规则：el-input里面的v-model的属性名要和rules里面的prop的属性名一致，要不然没有有校验结果
+注意：el-dialog，几层嵌套dialog的话，dialog会出现灰色的蒙层，需要给dialog设置属性解决该问题：
 :modal-append-to-body='false'或者 :append-to-body="true"
 +对于el-cascader中数据的清空，需要把v-model里面的数据进行置空并且在该组件中添加key值，