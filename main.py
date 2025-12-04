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
    first_name: str
    last_name: str
    phone_num: str
    street_address: str
    city: str
    state_code: str
    email: str
    date_of_birth: str

class Service_RecordCreate(BaseModel):
    client_id: int
    service_type: str
    date_received: str
    notes: str

class ClientUpdate(BaseModel):
    first_name: str
    last_name: str
    phone_num: str
    street_address: str
    city: str
    state_code: str
    email: str

class Service_RecordUpdate(BaseModel):
    client_id: int
    service_type: str
    date_received: str
    notes: str

@app.post("/clients")
def add_client(client: ClientCreate):
    connection=sqlite3.connect("cityteam.db")
    cursor=connection.cursor()
    cursor.execute(
        "Insert into clients(first_name, last_name, phone_num, street_address, city, state_code, email, date_of_birth) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
        (client.first_name, client.last_name, client.phone_num, client.street_address, client.city, client.state_code, client.email, client.date_of_birth)
    )
    connection.commit()
    connection.close()
    return("Client successfully added")

@app.post("/service_records")
def add_service_record(service_record: Service_RecordCreate):
    connection=sqlite3.connect("cityteam.db")
    cursor=connection.cursor()
    cursor.execute(
        "Insert into service_records(client_id, service_type, date_received, notes) VALUES(?, ?, ?, ?)",
        (service_record.client_id, service_record.service_type, service_record.date_received, service_record.notes)
    )
    connection.commit()
    connection.close()
    return("Service Record successfully added")

