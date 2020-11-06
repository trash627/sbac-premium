const express = require('express')
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use('/public', express.static('public'))



app.get('/', async (req, res) => {
    const article = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { article: article })
})



app.use('/articles', articleRouter)
app.listen(process.env.PORT || 4000)
