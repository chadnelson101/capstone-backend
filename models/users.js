import {pool} from '../config/config.js'

const getUsers = async () => {
    const [users] = await pool.query(`SELECT * FROM users`)
    return users
}

const getUser = async (userid) => {
    const [users] = await pool.query(`SELECT * FROM users where userid =?`,[userid])
    return users
}

const createUser = async (firstname,lastname,age,gender,email,role,password) =>{
    const [user] = await pool.query(`INSERT INTO users (firstname,lastname,age,gender,email,role,password) VALUES (?,?,?,?,?,?,?)`
    ,[firstname,lastname,age,gender,email,role,password])
    return user
}

const updatedUser = async (firstname, lastname, age, gender, email, role, password, userid) => {
     await pool.query(
        `UPDATE users SET firstname = ?, lastname = ?, age = ?, gender = ?, email = ?, role = ?, password = ? WHERE userid = ?`,
        [firstname, lastname, age, gender, email, role, password, userid]
        );
};

const deleteUser = async (userid) => {
    await pool.query(`DELETE FROM users WHERE userid = ?`, [userid]);
    return getUsers();
};

const checkuser = async (email)=>{
    const [[{password}]] = await pool.query(`SELECT * FROM users WHERE email =?`,[email])
    return password
}


export{getUsers,getUser,createUser,updatedUser,deleteUser,checkuser}