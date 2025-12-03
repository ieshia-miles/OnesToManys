-- Insert 5 Clients
-- Client 1: Has full information
INSERT INTO clients (first_name, last_name, phone_num, street_address, city, state_code, email, date_of_birth)
VALUES ('Maria', 'Rodriguez', '610-555-0101', '123 Main St', 'Chester', 'PA', 'maria.r@email.com', '1985-03-15');

-- Client 2: Homeless client (no street address)
INSERT INTO clients (first_name, last_name, phone_num, street_address, city, state_code, email, date_of_birth)
VALUES ('James', 'Chen', '610-555-0102', NULL, 'Chester', 'PA', 'james.chen@email.com', '1978-07-22');

-- Client 3: No phone or email
INSERT INTO clients (first_name, last_name, phone_num, street_address, city, state_code, email, date_of_birth)
VALUES ('Sarah', 'Johnson', NULL, '456 Oak Ave', 'Aston', 'PA', NULL, '1992-11-08');

-- Client 4: Homeless, minimal contact info
INSERT INTO clients (first_name, last_name, phone_num, street_address, city, state_code, email, date_of_birth)
VALUES ('Michael', 'Williams', NULL, NULL, 'Chester', 'PA', NULL, '1965-05-30');

-- Client 5: Full information
INSERT INTO clients (first_name, last_name, phone_num, street_address, city, state_code, email, date_of_birth)
VALUES ('Linda', 'Martinez', '610-555-0105', '789 Pine St', 'Media', 'PA', 'linda.m@email.com', '1988-09-12');

-- Insert Service Records
-- Service types: Food Pantry, Adult Clothing, Mother/Baby Program, Child Clothing, Dinner Service, Fresh Produce

-- Client 1 (Maria) service records
INSERT INTO service_records (client_id, service_type, date_received, notes)
VALUES (1, 'Food Pantry', '2024-01-15', 'First visit, received groceries for family of 4');

INSERT INTO service_records (client_id, service_type, date_received, notes)
VALUES (1, 'Adult Clothing', '2024-01-20', 'Received winter coat and boots');

INSERT INTO service_records (client_id, service_type, date_received, notes)
VALUES (1, 'Fresh Produce', '2024-01-25', 'Fresh fruits and vegetables');

-- Client 2 (James) service records
INSERT INTO service_records (client_id, service_type, date_received, notes)
VALUES (2, 'Food Pantry', '2024-01-10', 'Homeless client, regular visitor');

INSERT INTO service_records (client_id, service_type, date_received, notes)
VALUES (2, 'Dinner Service', '2024-01-12', 'Participated in meal service');

INSERT INTO service_records (client_id, service_type, date_received, notes)
VALUES (2, 'Adult Clothing', '2024-01-18', 'Received warm clothing for winter');

-- Client 3 (Sarah) service records
INSERT INTO service_records (client_id, service_type, date_received, notes)
VALUES (3, 'Mother/Baby Program', '2024-01-05', 'Received diapers and baby formula');

INSERT INTO service_records (client_id, service_type, date_received, notes)
VALUES (3, 'Child Clothing', '2024-01-12', 'Clothing for 2 children ages 3 and 5');

INSERT INTO service_records (client_id, service_type, date_received, notes)
VALUES (3, 'Food Pantry', '2024-01-22', 'Weekly food assistance');

-- Client 4 (Michael) service records
INSERT INTO service_records (client_id, service_type, date_received, notes)
VALUES (4, 'Dinner Service', '2024-01-08', 'Regular dinner program participant');

INSERT INTO service_records (client_id, service_type, date_received, notes)
VALUES (4, 'Food Pantry', '2024-01-14', 'Emergency food assistance');

INSERT INTO service_records (client_id, service_type, date_received, notes)
VALUES (4, 'Adult Clothing', '2024-01-19', 'Needed shoes and pants');

-- Client 5 (Linda) service records
INSERT INTO service_records (client_id, service_type, date_received, notes)
VALUES (5, 'Fresh Produce', '2024-01-11', 'Weekly produce distribution');

INSERT INTO service_records (client_id, service_type, date_received, notes)
VALUES (5, 'Child Clothing', '2024-01-16', 'Back to school clothing for 1 child');

INSERT INTO service_records (client_id, service_type, date_received, notes)
VALUES (5, 'Mother/Baby Program', '2024-01-23', 'Received size 3 diapers and toys');