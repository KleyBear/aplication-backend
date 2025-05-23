 import { pool } from '../db.js';

 export const getinvestments = async (req, res) => {
 
     const {rows} = await pool.query('SELECT * FROM investment')
 
     res.json(rows)
 }
 
 export const getinvestment = async (req, res) => {
    const {id} = req.params;

    const {rows} = await pool.query('SELECT * FROM investment WHERE id_investment = $1', [id]);


    if (rows.length === 0) return res.status(404).json({message: 'Usuario no encontrado'})

    res.json(rows[0])
}

export const createinvestment = async (req, res) => {
    try {
        const data = req.body;

        const {rows} = await pool.query('INSERT INTO investment (date, total, id_provider) VALUES ($1, $2, $3) returning *', [data.date, data.total, data.id_provider])

        res.json(rows[0])

    } catch (error) {
        console.log(error)

        if (error.code === '23502') {
            return res.status(400).json({message: 'Faltan datos obligatorios'})
        }
        
        return res.status(500).json({message: 'Error al crear el registro'})
    }
}

export const deleteinvestment = async (req, res) => {
    const {id} = req.params;

    const {rowCount} = await pool.query('DELETE FROM investment WHERE id_investment = $1 returning *', [id])

    if (rowCount === 0) return res.status(404).json({message: 'registro no encontrado'})

    res.sendStatus(204)
}

export const updateinvestment = async (req, res) => {
    const {id} = req.params
    const data = req.body

    const {rows} = await pool.query('UPDATE investment SET date = $1, total = $2, id_provider = $3, WHERE id_investment = $4', [data.date, data.total, data.id_provider, id])


    res.json(rows[0])
}