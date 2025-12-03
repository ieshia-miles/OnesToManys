from fastapi import FastAPI
import sqlite3
from pydantic import BaseModel #fastapi uses pydantic models
from typing import Optional

app = FastAPI()

@app.get("/")
def home():
    return {"message: Hello World"}

@app.get("/client")
def get_clients():
    connection=sqlite3.connect("client.db")
    cursor=connection.cursor()
    cursor.execute("SELECT*FROM client")
    results = cursor.fetchall()
    connection.close()
    return{"Clients":results}

