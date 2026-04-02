from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class BlogPost(BaseModel):
    title: str
    content: str
    author: str
    created_at: Optional[datetime] = datetime.now()
    updated_at: Optional[datetime] = None
