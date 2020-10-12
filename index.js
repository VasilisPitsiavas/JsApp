const db = require('./db')
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())

/*
db('user').select().then(console.log)
db('user').insert({name:'kostas'}, {email: 'fjiiofjiofj'}, {password: 'iojdfisdjf'})
*/

app.get('/user', async (req, res) => {
    if (!req.query.id) {
        res.status(400).send("Id missing")
        return
    }

    const user = await db('user')
        .select()
        .where({id: req.query.id})
        .first()
    
    if (!user) {
        res.status(404).send("User not found")
        return
    }

    res.json(user)
})

app.post('/user', async (req, res) => { 
    const {name, email, password} = req.body
    if (!email) {
        res.status(400).send("Email missing")
    }
    if (!password) {
        res.status(400).send("Password missing")
    }
    if (!name) {
        res.status(400).send("Name missing")
    }

    await db('user').insert({name, email, password})

    res.json({message: 'User added'})
})

app.delete('/user', async (req, res) => {
    await db('user')
        .del(req.body.id)
    res.json({message: "User deleted"})
})

app.get('/post', async (req, res) => {
    if (!req.query.id) {
        res.status(400).send("Id missing")
        return
    }

    const post = await db('post')
        .select()
        .where({id: req.query.id})
        .first()
    
    if (!post) {
        res.status(404).send("Post not found")
        return
    }

    res.json(user)
})

app.post('/post', async (req, res) =>  {
    const {blog_id, title, txt} = req.body
    if (!blog_id) {
        res.status(400).send("Blog_id missing")
    }
    if (!title) {
        res.status(400).send("Title missing")
    }
    if (!txt) {
        res.status(400).send("Name missing")
    }

    await db('post').insert({blog_id, title, name})

    res.json({message: 'Post added'})
})

app.get('/blog', async (req, res) => {
    if (!req.query.id) {
        res.status(400).send("Id missing")
        return
    }

    const blog = await db('blog')
        .select()
        .where({id: req.query.id})
        .first()

    if (!blog) {
        res.status(400).send("Blog not found")
        return
    }

    res.json(blog)    
})

app.post('/blog', async (req, res) => {
    const {user_id, name} = req.body
    if(!user_id) {
        res.status(400).send("User_id missing")
    }
    if(!name) {
        res.status(400).send("Name missing")
    }

    await db('blog').insert({user_id, name})

    res.json({message: 'Blog added'})
})

app.get('/category', async (req, res) => {
    if (!req.query.id) {
        res.status(400).send("Id missing")
        return 
    }

    const category = await db('category')
        .select()
        .where({id: req.query.id})
        .first()

    if (!category) {
        res.status(400).send("Category not found")
        return
    }

    res.json(category)
})

app.post('/category', async (req, res) => {
    const {blog_id, name} = req.body
    if (!blog_id) {
        res.status(400).send("Blog_id missing")
    }
    if (!name) {
        res.status(400).send("Name missing")
    }

    await db('category').insert({blog_id, name})

    res.json({message: "Category added"})
})

app.get('/post_category', async (req, res) => {
    if(!req.query.post_id) {
        res.status(400).send("Post_id missing")
        return
    }
    
    const post_category = await db('post_category')
    .select()
    .where({post_id: req.query.post_id})
    .first()

    if (!post_category) {
        res.status(400).send("Post_category not found")
        return
    }

    res.json(post_category)
})

app.post('/post_category', async(req, res) => {
    const {post_id, category_id} = req.body
    if (!post_id) {
        req.status(400).send("Post_category missing")
        return
    }
    if (!category_id) {
        req.status(400).send("Category_id missing")
        return 
    }

    await db('post_category').insert({post_id, category_id})

    res.json({message: "Post_category added"})
})

console.log("Magic is happening at 3000")
app.listen(3000)