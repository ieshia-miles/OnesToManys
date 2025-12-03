from fastapi import FastAPI
import sqlite3
from pydantic import BaseModel #fastapi uses pydantic models
from typing import Optional

app = FastAPI()

@app.get("/")
def home():
    return {"message: Hello World"}

@app.get("/clients")
def get_clients():
    connection=sqlite3.connect("cityteam.db")
    cursor=connection.cursor()
    cursor.execute("SELECT*FROM clients")
    results = cursor.fetchall()
    connection.close()
    return{"Clients":results}

@app.get("/service_records")
def get_service_records():
    connection=sqlite3.connect("cityteam.db")
    cursor=connection.cursor()
    cursor.execute("SELECT*FROM service_records")
    results = cursor.fetchall()
    connection.close()
    return{"Service Records":results}

@app.get("/clients/{client_id}")
def get_client(client_id: int):
    connection=sqlite3.connect("cityteam.db")
    cursor=connection.cursor()
    cursor.execute("SELECT * FROM clients WHERE client_id = ?", (client_id,))
    results = cursor.fetchone()
    connection.close()
    return{"Client":results}

@app.get("/service_records/{record_id}")
def get_service_record(record_id: int):
    connection=sqlite3.connect("cityteam.db")
    cursor=connection.cursor()
    cursor.execute("SELECT * FROM service_records WHERE record_id = ?", (record_id,))
    results = cursor.fetchone()
    connection.close()
    return{"Service Record":results}

class ClientCreate(BaseModel):
    client_id: str
    first_name: str
    last_name: str
    phone_num: str
    street_address: str
    city: str
    state_code: str
    email: str
    date_of_birth: str

class Service_RecordCreate(BaseModel):
    record_id: int
    client_id: int
    service_type: str
    date_received: str
    notes: str
    