 -- dbschema.sql

-- Query: CreateRealEstateDB
 CREATE DATABASE realestate;
-- EndQuery

-- Query: CreateSchoolRatingTable
CREATE TABLE IF NOT EXISTS school_rating (
    id SERIAL PRIMARY KEY,
    elementary_school_rating INT,
    middle_school_rating INT,
    high_school_rating INT,
);

-- Query: CreateAddressTable
CREATE TABLE IF NOT EXISTS address (
    id SERIAL PRIMARY KEY,
    full_address VARCHAR(255) UNIQUE,
    state VARCHAR(50),
    zipcode VARCHAR(10),
    town VARCHAR(50),
    county VARCHAR(50),
    country VARCHAR(50),
    street_address VARCHAR(255),
    apartment_number VARCHAR(50),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);
-- EndQuery

-- Query: CreatePropertyDetailsTable
CREATE TABLE IF NOT EXISTS property_details (
    id SERIAL PRIMARY KEY,
    address_id INT,
    school_rating_id INT,
    number_of_days_on_market INT,
    elementary_school_rating INT,
    middle_school_rating INT,
    high_school_rating INT,
    number_of_bedrooms INT,
    number_of_full_bathrooms INT,
    number_of_half_bathrooms INT,
    square_feet INT,
    acres DECIMAL,
    year_built INT,
    has_garage BOOLEAN,
    has_pool BOOLEAN,
    has_basement BOOLEAN,
    home_type VARCHAR(50), -- Changed from ENUM to VARCHAR
    description TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (school_rating_id) REFERENCES school_rating(id) ON DELETE CASCADE
    FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE CASCADE
);
-- EndQuery

-- Query: CreateZillowMarketEstimatesTable
CREATE TABLE zillow_market_estimates (
    id SERIAL PRIMARY KEY,
    zestimate INT,
    zillow_rent_estimate INT,
    zestimate_low INT,
    zestimate_high INT,
    zillow_monthly_property_tax_amount INT,
    zillow_monthly_home_insurance_amount INT,
    zillow_monthly_hoa_fees_amount INT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);
-- EndQuery

-- Query: CreateListingDetailsTable
CREATE TABLE listing_details (
    id SERIAL PRIMARY KEY,
    zillow_url VARCHAR(255) UNIQUE,
    property_details_id INT,
    zillow_market_estimates_id INT, 
    listing_price INT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (property_details_id) REFERENCES property_details(id) ON DELETE CASCADE,
    FOREIGN KEY (price_details_id) REFERENCES price_details(id) ON DELETE CASCADE,
    FOREIGN KEY (zillow_market_estimates_id) REFERENCES zillow_market_estimates(id) ON DELETE CASCADE
);
-- EndQuery


