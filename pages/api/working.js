import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    return new Promise(async(resolve) => {
        if (req.method === 'POST') {
            const client = await clientPromise;
            const collection = client.db('mwitstem').collection("collect");
            collection.find({ work: true }).toArray().then(resp => {
                res.status(200).json({ ok: true, data: resp });
                resolve();
            })
        } else {
            res.status(401).json({ ok: false, message: 'method not allowed' });
            resolve();
        }
    });

    // res.status(401).json({ ok: false, message: 'method not allowed' });
}