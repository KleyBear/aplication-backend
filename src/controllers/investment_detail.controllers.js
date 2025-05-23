import { pool } from '../db.js';

 export const getinvestment_details = async (req, res) => {
 
     const {rows} = await pool.query('SELECT * FROM investment_detail')
 
     res.json(rows)
 }
 
 export const getinvestment_detail = async (req, res) => {
    const {id} = req.params;

    const {rows} = await pool.query('SELECT * FROM investment_detail WHERE id_investment_detail = $1', [id]);


    if (rows.length === 0) return res.status(404).json({message: 'Registro no encontrado'})

    res.json(rows[0])
}

export const getinvestment_detail2 = async (req, res) => {
    const {id} = req.params;

    const {rows} = await pool.query('SELECT investment_detail.* from investment_detail INNER join investment on investment_detail.id_investment = investment.id_investment WHERE investment.id_investment = $1', [id]);


    if (rows.length === 0) return res.status(404).json({message: 'Registro no encontrado'})

    res.json(rows)
}

export const createinvestment_detail = async (req, res) => {
    try {
        const data = req.body;

        const {rows} = await pool.query('INSERT INTO investment_detail (amount, subtotal, id_product, id_investment) VALUES ($1, $2, $3, $4) returning *', [data.amount, data.subtotal, data.id_product, data.id_investment])

        res.json(rows[0])

    } catch (error) {
        console.log(error)

        if (error.code === '23502') {
            return res.status(400).json({message: 'Faltan datos obligatorios'})
        }
        
        return res.status(500).json({message: 'Error al crear el registro'})
    }
}

export const deleteinvestment_detail = async (req, res) => {
    const {id} = req.params;

    const {rowCount} = await pool.query('DELETE FROM investment_detail WHERE id_investment_detail = $1 returning *', [id])

    if (rowCount === 0) return res.status(404).json({message: 'registro no encontrado'})

    res.sendStatus(204)
}

export const updateinvestment_detail = async (req, res) => {
    const {id} = req.params
    const data = req.body

    const {rows} = await pool.query('UPDATE investment_detail SET amount = $1, subtotal = $2, id_product = $3, id_investment = $4, WHERE id_invesment_detail = $5', [data.amount, data.subtotal, data.id_product, id_investment, id])


    res.json(rows[0])
}