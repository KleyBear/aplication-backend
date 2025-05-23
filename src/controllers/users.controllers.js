 import { pool } from '../db.js';

 export const getusers = async (req, res) => {
 
     const {rows} = await pool.query('SELECT * FROM users')
 
     res.json(rows)
 }
 
 export const getuser = async (req, res) => {
    const {id} = req.params;

    const {rows} = await pool.query('SELECT * FROM users WHERE id_users = $1', [id]);


    if (rows.length === 0) return res.status(404).json({message: 'Usuario no encontrado'})

    res.json(rows[0])
}

export const createusers = async (req, res) => {
    try {
        const data = req.body;

        const {rows} = await pool.query('INSERT INTO users (name, email, password, phone, birthday ) VALUES ($1, $2, $3, $4, $5) returning *', [data.name, data.email, data.password, data.phone, data.birthday])

        res.json(rows[0])

    } catch (error) {
        console.log(error)

        if (error.code === '23505') {
            return res.status(409).json({message: 'El correo ya existe'})
        }
        if (error.code === '23502') {
            return res.status(400).json({message: 'Faltan datos obligatorios'})
        }
        
        return res.status(500).json({message: 'Error al crear el usuario'})
    }
}

export const deleteusers = async (req, res) => {
    const {id} = req.params;

    const {rowCount} = await pool.query('DELETE FROM users WHERE id_users = $1 returning *', [id])

    if (rowCount === 0) return res.status(404).json({message: 'Usuario no encontrado'})

    res.sendStatus(204)
}

export const updateusers = async (req, res) => {
    const {id} = req.params
    const data = req.body

    const {rows} = await pool.query('UPDATE users SET name = $1, email = $2, password = $3, phone = $4, birthday = $5 WHERE id_users = $6', [data.name, data.email, data.password, data.phone, data.birthday, id])


    res.json(rows[0])
}