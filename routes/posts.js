const express = require ('express');
const router = express.Router();
const Post = require('../models/post');

//Routes
router.get('/', (req,res,next) => {
    // res.send('We are on posts');
    next()
});

//give post
router.post('/', async (req,res)=>{
    const post = new Post({
        title : req.body.title,
        description : req.body.description
    });
    await post.save()
    .then(data=>{
        res.json({status:"success",data});
    })
    .catch(err=>{
        console.log(err);
        res.json({message:err}); 
    })
});
 
//specific post
router.get('/:postId',async(req,res) =>{
   try{
   const post= await Post.findById(req.params.postId);
    res.json(post);
   }catch(err){
    res.json({message:err})
   }
})
 
//gets all post
router.get('/',async (req,res)=>{
    try{
        const posts=await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
})

//delete
router.delete('/:postId', async(req,res)=>{
    try{
    const removedPost = await Post.deleteOne ({_id:req.params.postId});
    res.json(removedPost);
    }catch(err){
        res.json({message:err});
    }
})

//uodate a post
router.patch('/:postId', async(req,res)=>{
    try{
        const updatePost =await  Post.updateOne(
            {_id:req.params.postId},
            {$set:{title:req.body.title}}
            );
            res.json(updatePost)
    }catch (err){

    }
})

module.exports = router;

