CREATE TABLE invoice_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    invoice_key VARCHAR(255) NOT NULL,
    number INT NOT NULL,
    competence DATETIME NOT NULL,
    dateIssue DATETIME NOT NULL,
    series INT NOT NULL
);

CREATE TABLE addresses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    street VARCHAR(255) NOT NULL,
    number VARCHAR(50) NOT NULL,
    neighborhood VARCHAR(255) NOT NULL,
    complement VARCHAR(255)
);

CREATE TABLE persons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    identity VARCHAR(255) NOT NULL,
    address_id INT NOT NULL,
    city VARCHAR(255),
    FOREIGN KEY (address_id) REFERENCES addresses (id)
);

CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL,
    codeDescription VARCHAR(355) NOT NULL,
    serviceDescription VARCHAR(355) NOT NULL,
    locationProvision VARCHAR(255)
);

CREATE TABLE invoices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    info_id INT NOT NULL,
    issuer_id INT NOT NULL,
    recipient_id INT NOT NULL,
    service_id INT NOT NULL,
    total NUMERIC(15,2) NOT NULL,
    FOREIGN KEY (info_id) REFERENCES invoice_info (id) ON DELETE CASCADE,
    FOREIGN KEY (issuer_id) REFERENCES persons (id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES persons (id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services (id) ON DELETE CASCADE
);

CREATE TABLE xmls (
	id INT PRIMARY KEY AUTO_INCREMENT,
  	name VARCHAR(255) NOT NULL,
  	content TEXT NOT NULL,
  	invoice_id INT NOT NULL,
  	FOREIGN KEY (invoice_id) REFERENCES invoices (id) ON DELETE CASCADE
);