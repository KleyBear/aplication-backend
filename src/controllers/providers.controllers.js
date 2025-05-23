 import { pool } from '../db.js';

 export const getproviders = async (req, res) => {
 
     const {rows} = await pool.query('SELECT * FROM provider')
 
     res.json(rows)
 }
 
 export const getprovider = async (req, res) => {
    const {id} = req.params;

    const {rows} = await pool.query('SELECT * FROM provider WHERE id_provider = $1', [id]);


    if (rows.length === 0) return res.status(404).json({message: 'Usuario no encontrado'})

    res.json(rows[0])
}

export const createprovider = async (req, res) => {
    try {
        const data = req.body;

        const {rows} = await pool.query('INSERT INTO provider (name, phone) VALUES ($1, $2) returning *', [data.name, data.phone])

        res.json(rows[0])

    } catch (error) {
        console.log(error)

        if (error.code === '23505') {
            return res.status(409).json({message: 'El proveedor ya existe'})
        }
        if (error.code === '23502') {
            return res.status(400).json({message: 'Faltan datos obligatorios'})
        }
        
        return res.status(500).json({message: 'Error al crear el registro'})
    }
}

export const deleteprovider = async (req, res) => {
    const {id} = req.params;

    const {rowCount} = await pool.query('DELETE FROM provider WHERE id_provider = $1 returning *', [id])

    if (rowCount === 0) return res.status(404).json({message: 'proveedor no encontrado'})

    res.sendStatus(204)
}

export const updateprovider = async (req, res) => {
    const {id} = req.params
    const data = req.body

    const {rows} = await pool.query('UPDATE provider SET name = $1, phone = $2, WHERE id_provider = $3', [data.name, data.phone, id])


    res.json(rows[0])
}