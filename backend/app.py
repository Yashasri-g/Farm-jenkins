from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import BlogPost
from database import post_collection
from bson import ObjectId
from fastapi.exceptions import HTTPException

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Routes (create, read, update, delete)

@app.post("/posts/")
async def create_post(post: BlogPost):
    new_post = post.dict()
    result = await post_collection.insert_one(new_post)
    return {"id": str(result.inserted_id)}


@app.get("/posts/")
async def get_posts():
    posts = await post_collection.find().to_list(100)
    for post in posts:
        post["_id"] = str(post["_id"])
    return posts

@app.get("/posts/{post_id}")
async def get_post(post_id: str):
    post = await post_collection.find_one({"_id": ObjectId(post_id)})
    if post:
        post["_id"] = str(post["_id"])
        return post
    raise HTTPException(status_code=404, detail="Post not found")

@app.put("/posts/{post_id}")
async def update_post(post_id: str, post: BlogPost):
    result = await post_collection.update_one(
        {"_id": ObjectId(post_id)},
        {"$set": post.dict(exclude_unset=True)}
    )
    if result.modified_count:
        return {"message": "Post updated"}
    raise HTTPException(status_code=404, detail="Post not found")

@app.delete("/posts/{post_id}")
async def delete_post(post_id: str):
    result = await post_collection.delete_one({"_id": ObjectId(post_id)})
    if result.deleted_count:
        return {"message": "Post deleted"}
    raise HTTPException(status_code=404, detail="Post not found")