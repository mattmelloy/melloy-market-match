-- Create the market_entries table for tracking player share values
CREATE TABLE market_entries (
    id SERIAL PRIMARY KEY,
    player_name TEXT NOT NULL,
    share_value NUMERIC(10, 2) NOT NULL CHECK (share_value >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index to improve query performance for player name
CREATE INDEX idx_market_entries_player_name ON market_entries(player_name);

-- Create an index to improve query performance for created_at
CREATE INDEX idx_market_entries_created_at ON market_entries(created_at);

-- Add a comment to the table for documentation
COMMENT ON TABLE market_entries IS 'Stores share market game entries for players, tracking their share values over time';

-- Add comments to columns for clarity
COMMENT ON COLUMN market_entries.id IS 'Unique identifier for each market entry';
COMMENT ON COLUMN market_entries.player_name IS 'Name of the player submitting the share value';
COMMENT ON COLUMN market_entries.share_value IS 'Current share value for the player, must be non-negative';
COMMENT ON COLUMN market_entries.created_at IS 'Timestamp of when the share value was recorded';

-- Optional: Create a function to ensure unique player entries within a short time frame
CREATE OR REPLACE FUNCTION prevent_duplicate_entries()
RETURNS TRIGGER AS $$
BEGIN
    -- Prevent multiple entries by the same player within 5 minutes
    IF EXISTS (
        SELECT 1 
        FROM market_entries 
        WHERE player_name = NEW.player_name 
        AND created_at > NOW() - INTERVAL '5 minutes'
    ) THEN
        RAISE EXCEPTION 'Cannot submit multiple entries within 5 minutes';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to enforce the duplicate entry prevention
CREATE TRIGGER enforce_entry_interval
BEFORE INSERT ON market_entries
FOR EACH ROW
EXECUTE FUNCTION prevent_duplicate_entries();

-- Optional: Create a view to get the latest share values for each player
CREATE OR REPLACE VIEW player_latest_values AS
SELECT 
    player_name, 
    MAX(share_value) AS latest_share_value,
    MAX(created_at) AS last_updated
FROM market_entries
GROUP BY player_name;

-- Optional: Create a function to calculate player rankings
CREATE OR REPLACE FUNCTION get_player_rankings()
RETURNS TABLE (
    rank INTEGER,
    player_name TEXT,
    latest_share_value NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        RANK() OVER (ORDER BY latest_share_value DESC) AS rank,
        player_name,
        latest_share_value
    FROM player_latest_values
    ORDER BY rank;
END;
$$ LANGUAGE plpgsql;
