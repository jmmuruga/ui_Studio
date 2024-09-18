import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid2';
import { Button } from "@mui/material";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import notify from "../../../toast-utils";
import { MdDeleteForever } from "react-icons/md";
import { useConfirmDialog } from "../../../confirmDialog/ConfirmDialogContext";
import { fetchUsers } from "../../../../redux/reducers/userSlice";
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../loadingAnimation/LoadingSpinner";

function UserMasterPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const { openDialog } = useConfirmDialog();
    const [userForm, setUserForm] = useState({ userid: 0, user_name: '', phone: '', role: '', e_mail: '', password: '', c_password: '' });

    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 5; // Define how many users per page
    const offset = currentPage * usersPerPage;
    const currentUsers = users.slice(offset, offset + usersPerPage);
    const pageCount = Math.ceil(users.length / usersPerPage);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const goGallery = () => {
        navigate('/home')
    }

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    // const handleFetchUsers = () => {
    //     dispatch(fetchUsers());
    // };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    };

    const validate = async () => {
        let tempErrors = {};
        if (!userForm.user_name) tempErrors.user_name = 'User Name is required';
        if (!userForm.phone) tempErrors.phone = 'Phone Number is required';
        if (!userForm.e_mail) tempErrors.phone = 'E-mail is required';
        if (!userForm.password) tempErrors.phone = 'Password is required';
        if (!userForm.c_password) tempErrors.phone = 'Confirm Password is required';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const resetForm = () => {
        setUserForm({ userid: 0, user_name: '', phone: '', role: '', e_mail: '', password: '', c_password: '' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        if (userForm.password !== userForm.c_password) {
            setErrors({ ...errors, 'c_password': 'Passwords should be the same' });
            notify.warning('Passwords should be the same');
            return;
        }
        console.log(userForm);

        await openDialog(
            'Add User', 'Are you sure you want to add this user?',
            () => {
                alert('ok')
                console.log('User deleted');
            },
            () => {
                alert('Not ok')
                console.log('Deletion canceled');
            }
        );
    };

    return (
        <>
            {loading && <LoadingSpinner />}
            {error && <p className="text-danger" style={{ textAlign: 'center', fontSize: '20px' }}><b>{error} !</b></p>}

            {!error && <div className='body'>
                <h2 className="pageheading">User Details </h2>

                <div style={{ padding: '0px 30px' }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <div style={{ display: 'block' }}>
                                    <label className="label-text">User Name <span className="text-danger">*</span></label>
                                    <input type="text" name="user_name" value={userForm.user_name} onChange={handleChange}
                                        className={`text-input ${!userForm.user_name && errors.user_name ? 'text-input-invalid' : ''}`}
                                        placeholder="Enter your Name" required />
                                </div>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <div style={{ display: 'block' }}>
                                    <label className="label-text">Phone Number <span className="text-danger">*</span></label>
                                    <input maxLength={10} minLength={10}
                                        pattern="\d{10}"  // Regular expression for exactly 10 digits
                                        title="Phone number should be 10 digit number"
                                        name="phone" value={userForm.phone} onChange={handleChange}
                                        type="text" placeholder="Enter your Phone Number" className="text-input" required />
                                </div>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <div style={{ display: 'block' }}>
                                    <label className="label-text">Role Name</label>
                                    <select name="role" value={userForm.role} onChange={handleChange}
                                        placeholder="Enter your Role" className="text-input">
                                        <option value="">Select your Role</option>
                                        <option value="Super Admin">Super Admin</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <div style={{ display: 'block' }}>
                                    <label className="label-text">E-mail <span className="text-danger">*</span></label>
                                    <input name="e_mail" value={userForm.e_mail} onChange={handleChange}
                                        type="email" placeholder="Enter your E-mail" className="text-input" required />
                                </div>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <div style={{ display: 'block' }}>
                                    <label className="label-text">Password <span className="text-danger">*</span></label>

                                    <div className="password-input-container">
                                        <input name="password" value={userForm.password} onChange={handleChange}
                                            type={showPassword ? 'text' : 'password'}
                                            className="text-input"
                                            placeholder="Enter your password"
                                            pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}"
                                            title="Password must contain at least one letter, one number, and be at least 6 characters long."
                                            required
                                        />
                                        <button style={{ outline: 'none' }}
                                            type="button"
                                            className="toggle-password"
                                            onClick={handleTogglePassword}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <div style={{ display: 'block' }}>
                                    <label className="label-text">Confirm Password <span className="text-danger">*</span></label>
                                    <input
                                        className={`text-input ${errors.c_password ? 'text-input-invalid' : ''}`}
                                        name="c_password" value={userForm.c_password} onChange={handleChange}
                                        placeholder="Re-enter the password"
                                        type="password"
                                        required />
                                </div>
                            </Grid>
                        </Grid>

                        <div style={{ marginTop: '17px', display: 'flex', justifyContent: 'right', gap: '20px' }}>
                            <Button style={{ padding: '0px 25px' }} type="submit" color="success" variant="contained">Save</Button>
                            <Button type="button" color="primary" onClick={resetForm} variant="contained">Clear</Button>
                            <Button type="button" color="error" onClick={goGallery} variant="contained">Close</Button>
                        </div>
                    </form>
                    <hr style={{ marginTop: '20px', border: '1px dashed lightgrey' }}></hr>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="table-bordered">
                            <thead>
                                <tr>
                                    <th>Si.No</th>
                                    <th>User Name</th>
                                    <th>Phone Number</th>
                                    <th>Role Name</th>
                                    <th>E-mail </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((item, i) => (
                                    <tr key={i}>
                                        <td>{offset + i + 1}</td>
                                        <td>{item.class_name}</td>
                                        <td>8675987896</td>
                                        <td>Admin</td>
                                        <td>kamal@gmail.com</td>
                                        <td>
                                            <BiSolidEditAlt style={{ color: 'blue', cursor: 'pointer' }} size={20} />
                                            <MdDeleteForever style={{ color: 'red', marginLeft: '15px', cursor: 'pointer' }} size={20} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <ReactPaginate
                            //   previousLabel={currentPage === 0 ? null : 'Previous'}
                            //   nextLabel={currentPage === pageCount - 1 ? null : 'Next'}
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>
            </div>}
        </>
    )
}

export default UserMasterPage;