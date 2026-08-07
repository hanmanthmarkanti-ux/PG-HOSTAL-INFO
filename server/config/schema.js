const pool = require('./db');

const createTables = async () => {
    try {
        // Users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                phone VARCHAR(15),
                password VARCHAR(255) NOT NULL,
                role ENUM('user', 'admin') DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // PGs table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS pgs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                slug VARCHAR(255) UNIQUE NOT NULL,
                name VARCHAR(200) NOT NULL,
                city VARCHAR(100) NOT NULL,
                area VARCHAR(200) NOT NULL,
                full_address TEXT,
                lat DECIMAL(10, 8),
                lng DECIMAL(11, 8),
                gender ENUM('male', 'female', 'unisex') DEFAULT 'unisex',
                type ENUM('standard', 'premium', 'deluxe') DEFAULT 'standard',
                price_min INT,
                price_max INT,
                deposit INT DEFAULT 0,
                lock_in INT DEFAULT 0,
                notice_period INT DEFAULT 30,
                food_type ENUM('veg', 'non-veg', 'both') DEFAULT 'veg',
                wifi_speed VARCHAR(50),
                rating DECIMAL(2,1) DEFAULT 0,
                total_reviews INT DEFAULT 0,
                phone VARCHAR(15),
                whatsapp VARCHAR(15),
                email VARCHAR(100),
                description TEXT,
                is_available TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // PG Amenities table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS pg_amenities (
                id INT AUTO_INCREMENT PRIMARY KEY,
                pg_id INT NOT NULL,
                amenity VARCHAR(100) NOT NULL,
                FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE
            )
        `);

        // PG Photos table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS pg_photos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                pg_id INT NOT NULL,
                photo_url VARCHAR(500) NOT NULL,
                is_primary TINYINT(1) DEFAULT 0,
                FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE
            )
        `);

        // Room Prices table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS room_prices (
                id INT AUTO_INCREMENT PRIMARY KEY,
                pg_id INT NOT NULL,
                room_type ENUM('single', 'double', 'triple', 'quad', 'penta') NOT NULL,
                price INT NOT NULL,
                FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE
            )
        `);

        // Food Menu table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS food_menu (
                id INT AUTO_INCREMENT PRIMARY KEY,
                pg_id INT NOT NULL,
                meal_type ENUM('breakfast', 'lunch', 'dinner', 'snacks') NOT NULL,
                items TEXT NOT NULL,
                timing VARCHAR(50),
                FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE
            )
        `);

        // Reviews table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS reviews (
                id INT AUTO_INCREMENT PRIMARY KEY,
                pg_id INT NOT NULL,
                user_id INT,
                reviewer_name VARCHAR(100) NOT NULL,
                rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
                comment TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
            )
        `);

        // Inquiries table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS inquiries (
                id INT AUTO_INCREMENT PRIMARY KEY,
                pg_id INT NOT NULL,
                user_id INT,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(15) NOT NULL,
                message TEXT,
                status ENUM('pending', 'contacted', 'resolved') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
            )
        `);

        // Favorites table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS favorites (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                pg_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE,
                UNIQUE KEY unique_fav (user_id, pg_id)
            )
        `);

        // House Rules table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS house_rules (
                id INT AUTO_INCREMENT PRIMARY KEY,
                pg_id INT NOT NULL,
                rule TEXT NOT NULL,
                FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE
            )
        `);

        console.log('All tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

module.exports = createTables;
