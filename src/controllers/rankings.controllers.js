import { connectionWithDB } from "../database/db.js"

export async function rankingUrls (req, res) {
    try {
        console.log("oi")
        const ranking = await connectionWithDB.query(`SELECT users.id, users.name, COUNT(urls.url) AS "linksCount", SUM(urls.visits) AS "visitCount" FROM users LEFT JOIN Urls ON users.id = urls."userId" GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10;`)
        
        const rankingsFormat = ranking.rows.forEach(obj => {
            console.log
            if (obj.visitCount == null) {
                obj.visitCount = 0
            }
        });
        console.log(ranking)
        res.status(200).send(rankingsFormat)
        
    } catch (err) {
       res.status(500).send(err.message) 
    }
}

