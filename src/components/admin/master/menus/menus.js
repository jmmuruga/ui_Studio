import React from "react";
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import { useConfirmDialog } from "../../../confirmDialog/ConfirmDialogContext";
import { Button } from "@mui/material";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

function Menus() {
    const [errors, setErrors] = useState({});
    const [menusForm, setMenusForm] = useState({ menuid: 0, menu_name: '' });
    const { openDialog } = useConfirmDialog();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMenusForm({ ...menusForm, [name]: value });
    }

    const validate = async () => {
        let tempErrors = {};
        if (!menusForm.menu_name) tempErrors.menu_name = 'Menu Name is required';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const resetForm = () => {
        setMenusForm({ menuid: 0, menu_name: '' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        console.log(menusForm);

        await openDialog(
            'Add Menus', 'Are you sure you want to add this Menu?',
            () => {
                alert('ok')
                console.log('Menu deleted');
            },
            () => {
                alert('Not ok')
                console.log('Deletion canceled');
            }
        );
    };

    return (
        <>
            <div className='body'>
                <h2 className="pageheading">Add Menus</h2>

                <div style={{ padding: '0px 30px' }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <div style={{ display: 'block' }}>
                                    <label className="label-text">Menu Name <span className="text-danger">*</span></label>
                                    <input type="text" name="menu_name" value={menusForm.menu_name} onChange={handleChange}
                                        maxLength={25}
                                        className={`text-input ${!menusForm.menu_name && errors.menu_name ? 'text-input-invalid' : ''}`}
                                        placeholder="Enter Menu Name" required />
                                </div>
                            </Grid>

                            <div style={{ marginTop: '17px', display: 'flex', justifyContent: 'right', gap: '20px' }}>
                                <Button style={{ padding: '0px 25px' }} type="submit" color="success" variant="contained">Save</Button>
                                <Button type="button" color="primary" onClick={resetForm} variant="contained">Clear</Button>
                                <Button type="button" color="error" onClick={handleSubmit} variant="contained">Close</Button>
                            </div>
                        </Grid>
                    </form>

                    <hr style={{ marginTop: '25px', border: '1px dashed lightgrey' }}></hr>
                    <div style={{ overflowX: 'auto', marginTop: '20px' }}>
                        <table className="table-bordered">
                            <thead>
                                <tr>
                                    <th>Si.No</th>
                                    <th>Menu Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>KAMAL</td>
                                    <td><BiSolidEditAlt style={{ color: 'blue', cursor: 'pointer' }} size={20} />
                                        <MdDeleteForever style={{ color: 'red', marginLeft: '15px', cursor: 'pointer' }} size={20} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menus;