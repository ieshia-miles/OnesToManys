CREATE TABLE clients (
    client_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_num TEXT,
    street_address TEXT,
    city TEXT NOT NULL,
    state_code TEXT NOT NULL,
    email TEXT UNIQUE,
    date_of_birth DATE

);

CREATE TABLE service_records (
    record_id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    service_type TEXT NOT NULL,
    date_received DATE NOT NULL,
    notes TEXT,
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
);