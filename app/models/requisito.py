from pydantic import BaseModel, Field
from bson import ObjectId
"""
class Requisito(BaseModel):
    title: str = Field(..., min_length=1, max_length=50)
    description: str = Field(..., min_length=1, max_length=500)
    patron: str = Field(..., min_length=1, max_length=500)
    identifier: str

    class Config:
        arbitrary_types_allowed = True"""

class Requisito(BaseModel):
    description: str
    identifier: str
    patron: str
    title: str