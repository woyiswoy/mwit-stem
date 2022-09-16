// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    console.log(req.method, req.query)
    if (req.method === 'POST') {
        const client = await clientPromise;
        const collection = client.db('mwitstem').collection("collect");
        if (req.query.work === 'true') {
            collection.update({
                id: parseInt(req.query.id),
                work: true
            }, {
                $setOnInsert: {
                    id: parseInt(req.query.id),
                    work: true,
                    start: new Date()
                }
            }, {
                upsert: true
            }, (err, resp) => {
                // console.log('err', err);
                // console.log('res', resp);
                if (resp.upsertedCount === 0) {
                    res.status(401).json({
                        message: 'Setstatus Failed',
                        ok: false
                    })
                } else {
                    res.status(200).json({ ok: true });

                }
            });
        } else if (req.query.work === 'false') {
            collection.findOneAndUpdate({
                id: parseInt(req.query.id),
                work: true
            }, { $set: { work: false, end: new Date() } }, (err, resp) => {
                // console.log('err', err);
                // console.log('res', resp);
                if (resp.value === null) res.status(401).json({
                    message: 'Setstatus Failed',
                    ok: false
                })
                else res.status(200).json({ ok: true });
            });
        }
    }
}