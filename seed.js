const { initDb, getDb, saveDb } = require('./config/db');
const createTables = require('./config/schema');

async function seed() {
    try {
        const db = getDb();

        const existing = db.exec("SELECT COUNT(*) as count FROM pgs");
        if (existing.length && existing[0].values[0][0] > 0) {
            console.log('Database already seeded, skipping');
            return;
        }

        console.log('Seeding data...');
        const { allPGHostels } = require('./pgdata');

        const pgEntries = Object.entries(allPGHostels);
        let count = 0;

        for (const [slug, pg] of pgEntries) {
            try {
                const pgSlug = slug || pg.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                const cp = (v) => { if (!v) return 0; if (typeof v === 'number') return v; return parseInt(String(v).replace(/[₹,\s]/g, '')) || 0; };
                const cg = (g) => { if (!g) return 'unisex'; const l = g.toLowerCase(); if (l.includes('male') && !l.includes('female')) return 'male'; if (l.includes('female')) return 'female'; return 'unisex'; };

                db.run(`INSERT OR IGNORE INTO pgs (slug,name,city,area,full_address,lat,lng,gender,type,price_min,price_max,deposit,lock_in,notice_period,food_type,wifi_speed,phone,whatsapp,email,description,rating,total_reviews,is_available) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [pgSlug, pg.name, pg.city||'Hyderabad', pg.area||'', pg.full_address||pg.area+', '+(pg.city||'Hyderabad'),
                    pg.lat||0, pg.lng||0, cg(pg.gender), pg.type||'standard',
                    pg.priceMin||cp(pg.priceMin), pg.priceMax||cp(pg.priceMax)||pg.priceMin||cp(pg.priceMin),
                    cp(pg.deposit), parseInt(String(pg.lockIn||'1').replace(/[^\d]/g,''))||1,
                    parseInt(String(pg.noticePeriod||'30').replace(/[^\d]/g,''))||30,
                    pg.foodType||'veg', pg.wifiSpeed||'',
                    pg.phone||(pg.contact&&pg.contact.phone)||'', pg.whatsapp||(pg.contact&&pg.contact.whatsapp)||'',
                    pg.email||(pg.contact&&pg.contact.email)||'', pg.description||pg.name+' in '+(pg.area||''),
                    pg.rating||0, pg.totalReviews||0, 1]);

                const lastId = db.exec("SELECT last_insert_rowid() as id");
                const pgId = lastId.length ? lastId[0].values[0][0] : 0;
                if (!pgId) continue;

                if (pg.amenities) pg.amenities.forEach(a => db.run('INSERT OR IGNORE INTO pg_amenities (pg_id,amenity) VALUES (?,?)', [pgId, a]));
                if (pg.photos) pg.photos.forEach((url, i) => db.run('INSERT OR IGNORE INTO pg_photos (pg_id,photo_url,is_primary) VALUES (?,?,?)', [pgId, url, i===0?1:0]));
                if (pg.roomPrices) Object.entries(pg.roomPrices).forEach(([rt,pr]) => { const p=cp(pr); if(p) db.run('INSERT OR IGNORE INTO room_prices (pg_id,room_type,price) VALUES (?,?,?)', [pgId,rt,p]); });
                if (pg.foodMenu) Object.entries(pg.foodMenu).forEach(([mt,items]) => { if(items&&items.length) db.run('INSERT OR IGNORE INTO food_menu (pg_id,meal_type,items,timing) VALUES (?,?,?,?)', [pgId,mt,Array.isArray(items)?items.join(', '):items,'']); });
                if (pg.reviews) pg.reviews.forEach(r => db.run('INSERT OR IGNORE INTO reviews (pg_id,reviewer_name,rating,comment) VALUES (?,?,?,?)', [pgId,r.name,r.rating,r.comment]));
                if (pg.rules) pg.rules.forEach(rule => db.run('INSERT OR IGNORE INTO house_rules (pg_id,rule) VALUES (?,?)', [pgId,rule]));
                count++;
            } catch(e) { /* skip individual PG errors */ }
        }

        saveDb();
        console.log('Seeded ' + count + ' PGs');
        return count;
    } catch(e) {
        console.error('Seed error:', e.message);
        return 0;
    }
}

if (require.main === module) {
    initDb().then(() => createTables()).then(() => seed()).then(() => process.exit(0)).catch(() => process.exit(0));
}

module.exports = seed;
