import React, { useState, useEffect } from 'react';
import { deleteTip, getTips } from '../../api/TipService';
import { useNavigate } from "react-router-dom";
import "../liststyle.css"
import { connect } from 'react-redux';
import { deleteUser, getUsers } from '../../api/UserService';

function UserList(props){

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            const c = await getUsers(props.token);
            const copy = c.filter(user => (user.role === "ROLE_TEACHER" || user.role === "ROLE_ADMIN"));
            setUsers(copy);
        }
        fetchData();
    },[]);

    const onDeleteButtonClicked = async (id) => {
        await deleteUser(props.token, id);
        const copy = users.filter(u => u.id != id);
        setUsers(copy);
    }

    return(
        <div className="list">
            <div className="list-header">Użytkownicy</div>
            <button className="list-button create-button" onClick={() => navigate("/admin/users/new")}>Stwórz nowe konto</button>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Login</th>
                    <th>Email</th>
                    <th>Rola</th>
                    <th></th>
                </tr>
            {users.map((t) => (
                <tr>
                    <td>{t.id}</td>
                    <td>{t.username}</td>
                    <td>{t.email}</td>
                    <td>{t.role}</td>
                    <td><button className="list-button delete-button" onClick={() => onDeleteButtonClicked(t.id)}>Usuń</button></td>
                </tr>
            ))}
            </table>
        </div>
    );

}

const mapStateToProps = (state) => {
    return{
        userLogged: state.userLoggedIn,
        token: state.token
    }
}

export default connect(mapStateToProps, null) (UserList);