import express from "express";
import bodyParser from "body-parser";

const port = 2000;
const app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static("public"));

var blogPosts = {
    title: [],
    body: [],
    date: []
};

app.get("/", (req, res) => {
    let data = {postCollection: blogPosts}
    res.render("index.ejs", data);
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/submit", (req, res) => {

    const date = new Date();
    let today = new Date().toLocaleString('en-GB', {
        hour12: false,
      });
    if(req.body["blogTitle"].length > 0 && req.body["blogEntry"].length > 0){
        blogPosts.title.push(req.body.blogTitle);
        blogPosts.body.push(req.body.blogEntry);
        blogPosts.date.push(today);
        console.log(req.body)
        console.log(blogPosts)
    }
    else{
       console.log("empty")
    }
    
    res.redirect("/create");
});

app.get("/delete", (req, res) => {
    console.log(blogPosts.length);
    let data = {postCollection: blogPosts};
    res.render("delete.ejs", data);
});

app.post("/deleteProcess", (req, res) => {
    console.log(req.body)
    let delIndex = req.body.deleteValue;
    blogPosts.title.splice(delIndex, 1);
    blogPosts.body.splice(delIndex, 1);
    blogPosts.date.splice(delIndex, 1);
    console.log(blogPosts)
    res.redirect("/delete");
});

app.get("/edit", (req, res) => {
    let data = {postCollection: blogPosts};
    res.render("edit.ejs", data);
})

app.post("/editProcess", (req, res) => {
    let index = Number(req.body.editValue);
    let blogTitle = req.body.blogTitle;
    let blogEntry = req.body.blogEntry;

   console.log(index);
   console.log(req.body)

    if(blogTitle[blogTitle.length - index - 1].length > 0 ){
        blogPosts.title[index] = blogTitle[blogTitle.length - index - 1];
    }
    if(blogEntry[blogEntry.length - index - 1].length > 0){
        blogPosts.body[index] = blogEntry[blogEntry.length - index - 1];
    }

    console.log(blogPosts);
    res.redirect("/edit");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});