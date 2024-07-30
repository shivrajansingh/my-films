import React, { useEffect, useState } from 'react';
import Image from '../components/common/Image';
export default function MyAccount() {
    const [user, setUser] = useState<Record<string, any>>({});
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        phoneNumber: '',
        photoURL: '',
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setFormData({
                displayName: userData.displayName,
                email: userData.email,
                phoneNumber: userData.phoneNumber ?? '',
                photoURL: userData.photoURL ?? '',
            });
        }
    }, []);

    // const handleEditClick = () => {
    //     setEditing(true);
    // };

    const handleCancelClick = () => {
        setEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setUser(formData);
        localStorage.setItem('user', JSON.stringify(formData));
        setEditing(false);
    };

    return (
        <main className="login-form">
            <section className="p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-5 col-xxl-5">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <div className="mb-5">
                                        {
                                            editing ? <h3>Edit My Account</h3> : <h3>My Account</h3>
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                            {
                                editing ? "" : <div className="row">
                                <div className='col text-center'>
                                    <Image src={user?.photoURL} alt="Profile Picture" className="profile-pic" />
                                </div>
                            </div>
                            }
                            
                            <div className="row">
                                <div className='col text-center text-white'>
                                    {editing ? (
                                        <form>
                                            <div className="row gy-3 overflow-hidden">
                                            <div className="col-12">
                                                    <div className="mb-3">
                                                        <label htmlFor="displayName" className="form-label">Name</label>
                                                        <input
                                                            type="displayName"
                                                            className="form-control search-bar-parent mt-0"
                                                            name="displayName"
                                                            id="displayName"
                                                            placeholder="Enter Your Name"
                                                            defaultValue={user?.displayName}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="mb-3">
                                                        <label htmlFor="photoURL" className="form-label">Photo Url</label>
                                                        <input
                                                            type="photoURL"
                                                            className="form-control search-bar-parent mt-0"
                                                            name="photoURL"
                                                            id="photoURL"
                                                            placeholder="Enter Photo Url"
                                                            onChange={handleChange}
                                                            defaultValue={user.photoURL}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="mb-3">
                                                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                                        <input
                                                            type="phoneNumber"
                                                            className="form-control search-bar-parent mt-0"
                                                            name="phoneNumber"
                                                            id="phoneNumber"
                                                            onChange={handleChange}
                                                            placeholder="Enter Your Phone Number"
                                                            defaultValue={user.phoneNumber}
                                                        />
                                                    </div>
                                                </div>



                                                

                                                <div className="col-12">
                                                    <div className="d-grid">
                                                        <button className="btn bsb-btn-2xl btn-sign" type="submit" onClick={(e:any)=>handleSubmit(e)} >Save</button>
                                                        <button className="btn bsb-btn-2xl bg-white mt-2" onClick={handleCancelClick}>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <h2>{user?.displayName}</h2>
                                            <p><b>Email</b>: {user?.email}</p>
                                            <p><b>Phone</b>: {user?.phoneNumber ?? "N/A"}</p>
                                            {/* <button type="button" className="atf-btn atw-btn w-25 bg-theme-yellow text-dark" onClick={handleEditClick}> <Image src="/assets/images/icons8-edit.svg" style={{width:'20px'}}/> Edit Profile</button> */}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
