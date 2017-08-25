module.exports = {
    plugins:[
        require('cssnano')({
            preset:'default'
        }),
        require('autoprefixer')({
            browserslist:[
                ">1%",
                "last 2 versions",
                "Edge",
                "ie >= 10"
            ]
        })
       // require('postcss-flexibility'),
        //require('postcss-opacity'),
        //require('postcss-color-rgba-fallback')
    ]
}