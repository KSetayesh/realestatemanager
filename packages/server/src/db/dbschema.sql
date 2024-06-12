
-- Query: CreateRentCastConfigDetailsTable
CREATE TABLE IF NOT EXISTS rent_cast_config_details (
    id SERIAL PRIMARY KEY,
    api_key_name VARCHAR(250),
    email VARCHAR(250),
    api_calls_this_month INT,
    number_of_free_api_calls INT,
    billing_period INT,
    first_billed_on TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    most_recent_billing_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);
-- EndQuery

-- Query: CreateSchoolRatingTable
CREATE TABLE IF NOT EXISTS school_rating (
    id SERIAL PRIMARY KEY,
    elementary_school_rating INT,
    middle_school_rating INT,
    high_school_rating INT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);
-- EndQuery

-- Query: CreateAddressTable
CREATE TABLE IF NOT EXISTS address (
    id SERIAL PRIMARY KEY,
    full_address VARCHAR(255) UNIQUE,
    state VARCHAR(50),
    zipcode VARCHAR(10),
    city VARCHAR(50),
    county VARCHAR(50),
    country VARCHAR(50),
    street_address VARCHAR(255),
    apartment_number VARCHAR(50),
    longitude DECIMAL(9,6),
    latitude DECIMAL(9,6),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);
-- EndQuery

-- Query: CreateZillowMarketEstimatesTable
CREATE TABLE IF NOT EXISTS zillow_market_estimates (
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

-- Query: CreateAgentsTable
CREATE TABLE IF NOT EXISTS agent (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    website VARCHAR(250),
    company_name VARCHAR(250),
    phone_number VARCHAR(15),
    email VARCHAR(250),
    state VARCHAR(50),
    country VARCHAR(50),
    agent_type VARCHAR(50),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);
-- EndQuery

-- Query: CreateRentCastApiCallTable
CREATE TABLE IF NOT EXISTS rent_cast_api_call (
    id SERIAL PRIMARY KEY, 
    end_point VARCHAR(50),
    full_url VARCHAR(500),
    execution_time TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    rent_cast_config_detail_id INT,
    FOREIGN KEY (rent_cast_config_detail_id) REFERENCES rent_cast_config_details(id) ON DELETE CASCADE
);
-- EndQuery

-- Query: CreateRentCastApiResponseTable
CREATE TABLE IF NOT EXISTS rent_cast_api_response (
    id SERIAL PRIMARY KEY,
    address_id VARCHAR(255), -- Not unique because different api calls can return the same address (we want that)
    api_response_data JSONB,
    execution_time TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    rent_cast_api_call_id INT,
    FOREIGN KEY (rent_cast_api_call_id) REFERENCES rent_cast_api_call(id) ON DELETE CASCADE
);
-- EndQuery

-- Query: CreatePropertyDetailsTable
CREATE TABLE IF NOT EXISTS property_details (
    id SERIAL PRIMARY KEY,
    address_id INT,
    school_rating_id INT,
    number_of_bedrooms INT,
    number_of_full_bathrooms INT,
    number_of_half_bathrooms INT,
    square_feet INT,
    acres DECIMAL,
    year_built INT,
    has_garage BOOLEAN,
    has_pool BOOLEAN,
    has_basement BOOLEAN,
    property_type VARCHAR(50),
    _description TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (school_rating_id) REFERENCES school_rating(id) ON DELETE CASCADE,
    FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE CASCADE
);
-- EndQuery

-- Query: CreateListingDetailsTable
CREATE TABLE IF NOT EXISTS listing_details (
    id SERIAL PRIMARY KEY,
    zillow_url VARCHAR(255) UNIQUE,
    property_details_id INT,
    zillow_market_estimates_id INT,
    listing_price INT,
    property_status VARCHAR(50),
    date_listed TIMESTAMP WITHOUT TIME ZONE DEFAULT '1970-01-01 00:00:00',
    creation_type VARCHAR(50),
    rent_cast_sale_response_id INT,
    rent_cast_property_response_id INT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (property_details_id) REFERENCES property_details(id) ON DELETE CASCADE,
    FOREIGN KEY (zillow_market_estimates_id) REFERENCES zillow_market_estimates(id) ON DELETE CASCADE,
    FOREIGN KEY (rent_cast_sale_response_id) REFERENCES rent_cast_api_response(id) ON DELETE CASCADE,
    FOREIGN KEY (rent_cast_property_response_id) REFERENCES rent_cast_api_response(id) ON DELETE CASCADE
);
-- EndQuery

-- Query: InsertIntoRentCastConfigDetailsTable
INSERT INTO rent_cast_config_details (
    api_key_name,
    email,
    api_calls_this_month, 
    number_of_free_api_calls, 
    billing_period, 
    first_billed_on, 
    most_recent_billing_date, 
    created_at, 
    updated_at
) SELECT 'Kevins RentCast API Key', 'kevinsetayesh@gmail.com', 0, 50, 31, NOW(), NOW(), NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM rent_cast_config_details);
-- EndQuery

-- Step 1: Create a table to store affected IDs temporarily
CREATE TABLE IF NOT EXISTS affected_ids (
    operation VARCHAR,
    id INT
);

-- Step 2: Create or replace the function that logs the changes
CREATE OR REPLACE FUNCTION log_listing_change() RETURNS TRIGGER AS $$
BEGIN
    RAISE NOTICE 'Trigger fired: % %', TG_OP, NEW.id; -- Add this line for debugging
    IF (TG_OP = 'INSERT') THEN
        INSERT INTO affected_ids (operation, id) VALUES ('INSERT', NEW.id);
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO affected_ids (operation, id) VALUES ('UPDATE', NEW.id);
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO affected_ids (operation, id) VALUES ('DELETE', OLD.id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Step 3: Create triggers to call the function on insert, update, and delete
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'after_listing_insert') THEN
        CREATE TRIGGER after_listing_insert AFTER INSERT ON listing_details
        FOR EACH ROW EXECUTE FUNCTION log_listing_change();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'after_listing_update') THEN
        CREATE TRIGGER after_listing_update AFTER UPDATE ON listing_details
        FOR EACH ROW EXECUTE FUNCTION log_listing_change();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'after_listing_delete') THEN
        CREATE TRIGGER after_listing_delete AFTER DELETE ON listing_details
        FOR EACH ROW EXECUTE FUNCTION log_listing_change();
    END IF;
END $$;

-- Step 4: Create a function to notify and clear the affected_ids table
CREATE OR REPLACE FUNCTION notify_and_clear_affected_ids() RETURNS VOID AS $$
DECLARE
    affected_data TEXT;
BEGIN
    SELECT json_agg(row_to_json(affected_ids))::text INTO affected_data FROM affected_ids;
    PERFORM pg_notify('listing_change', affected_data);
    DELETE FROM affected_ids;
END;
$$ LANGUAGE plpgsql;


