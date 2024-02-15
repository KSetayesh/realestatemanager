 -- dbschema.sql

-- Query: CreateRealEstateDB
 CREATE DATABASE realestate;
-- EndQuery

-- Query: CreateAddressTable
CREATE TABLE IF NOT EXISTS address (
    id SERIAL PRIMARY KEY,
    full_address VARCHAR(255),
    state VARCHAR(50), -- Changed from ENUM to VARCHAR
    zipcode VARCHAR(10),
    town VARCHAR(50),
    county VARCHAR(50),
    country VARCHAR(50), -- Changed from ENUM to VARCHAR
    street_address VARCHAR(255),
    apartment_number VARCHAR(50)
);
-- EndQuery

-- Query: CreateListingTable
CREATE TABLE IF NOT EXISTS listing (
    id SERIAL PRIMARY KEY,
    address_id INT,
    zillow_url VARCHAR(255),
    number_of_days_on_market INT,
    elementary_school_rating INT,
    middle_school_rating INT,
    high_school_rating INT,
    number_of_bedrooms INT,
    number_of_full_bathrooms INT,
    number_of_half_bathrooms INT,
    square_feet INT,
    acres NUMERIC(12, 2),
    year_built INT,
    home_type VARCHAR(50), -- Changed from ENUM to VARCHAR
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE CASCADE
);
-- EndQuery

-- Query: CreateListingPrices
CREATE TABLE IF NOT EXISTS listing_price (
    id SERIAL PRIMARY KEY,
    listing_id INT,
    price NUMERIC(12, 2),
    zestimate NUMERIC(12, 2),
    rent_estimate NUMERIC(12, 2),
    monthly_property_tax_amount NUMERIC(12, 2),
    monthly_home_insurance_amount NUMERIC(12, 2),
    monthly_hoa_fees_amount NUMERIC(12, 2),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (listing_id) REFERENCES listing(id) ON DELETE CASCADE
);
-- EndQuery

