
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const { resolve } = require('path');
const { options } = require('less');



//webapck配置信息
module.exports = {

  mode:'development',
  //入口文件
  entry:'./src/index.ts',

  //打包文件
  output:{
    //打包后所在目录
    path:path.resolve(__dirname,'dist'),
    //打包后文件名
    filename:"bundle.js",
    
    environment:{
      //不使用箭头函数
      arrowFunction:false
      //不使用const
      // const:false
    }
  },
  //制定webpack打包时用的模块
  module:{
    //指定加载的规则
    rules:[
      {
        //指定规则生效的文件
        test:/\.ts$/,
        // 要使用的loader
        use:[
          { 
            //指定加载器
            loader:'babel-loader',
            //配置babel
            options:{
              //设置预定义的环境
              presets:[
                [
                //指定环境的插件
                "@babel/preset-env",
                //配置信息
                  {
                    //兼容的浏览器版本
                    targets:{
                      "chrome":"88",
                    },
                    //指定版本
                    "corejs":"3",
                    //使用corejs的方式usage按需加载
                    "useBuiltIns":"usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        // 要排除文件
        exclude:/node-modules/
      },
      //设置less的处理
      {
        test:/\.less$/,
        use:[
          "style-loader",
          "css-loader",
          //引入postcss
          {
            loader:"postcss-loader",
            options:{
              postcssOptions:{
                pligins:[
                  [
                    "postcss-preset-env",
                    {
                      browsers:'last 2 versions',
                    }
                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  //配置webpack插件
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title:'我是自定义的',
      // 插件模板路径
      template:"./src/index.html"
    }),
  ],

  //用来设置引用模块
  resolve:{
    extensions:['.ts','.js']
  }
}