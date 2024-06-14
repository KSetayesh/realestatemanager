-- Step 1: Create a table to store affected IDs temporarily
CREATE TABLE IF NOT EXISTS affected_ids (
    id SERIAL PRIMARY KEY,
    operation VARCHAR,
    listing_details_id INT
);

CREATE OR REPLACE FUNCTION log_listing_change() RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        RAISE NOTICE 'Trigger fired: INSERT %', NEW.id;
        INSERT INTO affected_ids (operation, listing_details_id) VALUES ('INSERT', NEW.id);
    ELSIF (TG_OP = 'UPDATE') THEN
        RAISE NOTICE 'Trigger fired: UPDATE %', NEW.id;
        INSERT INTO affected_ids (operation, listing_details_id) VALUES ('UPDATE', NEW.id);
    ELSIF (TG_OP = 'DELETE') THEN
        RAISE NOTICE 'Trigger fired: DELETE %', OLD.id;
        INSERT INTO affected_ids (operation, listing_details_id) VALUES ('DELETE', OLD.id);
    END IF;
    RETURN NULL; -- Use RETURN NULL for AFTER triggers
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

-- Step 4: Create function to notify and clear affected IDs
CREATE OR REPLACE FUNCTION notify_and_clear_affected_ids() RETURNS VOID AS $$
BEGIN
    PERFORM pg_notify('listing_change', 'true');
END;
$$ LANGUAGE plpgsql;
