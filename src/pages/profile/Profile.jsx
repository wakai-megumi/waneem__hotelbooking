import React, { useContext, useState, useEffect } from "react";
import { Authcontext } from "../../context/Authcontext";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import noavatar from "../../assets/noavatar.jpg"
import "./Profile.scss";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner/Spinner";
const UserProfile = () => {
    const { currentUser } = useContext(Authcontext);
    const [loading, setLoading] = useState(true);
    const [loadingImage, setLoadingImage] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const userid = currentUser._id;
    console.log(userid);
    const [userData, setUserData] = useState([
        {
            editing: false,
            label: "Profile Image",
            value: "",
            type: "file",
            id: "profileimage",
        },
        {
            editing: false,
            label: "Username",
            value: "",
            type: "text",
            id: "username",
        },
        {
            editing: false,
            label: "Email",
            value: "",
            type: "email",
            id: "email",
        },
        {
            editing: false,
            label: "Country",
            value: "",
            type: "text",
            id: "country",
        },
        {
            editing: false,
            label: "City",
            value: "",
            type: "text",
            id: "city",
        },
        {
            editing: false,
            label: "Address",
            value: "",
            type: "text",
            id: "address",
        },
        {
            editing: false,
            label: "Phone",
            value: "",
            type: "text",
            id: "phone",
        },
    ]);

    useEffect(() => {
        console.log(userid);
        const fetchUserData = async () => {
            try {
                const response = await axios.get(

                    `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/user/get/${userid}`,
                    { withCredentials: true }
                );

                setUserData((prevData) =>
                    prevData.map((user) => ({
                        ...user,
                        value: response.data?.user[user.id] || "",
                    }))
                );
                console.log(response);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleClick = (index) => {
        setUserData((prevData) => {
            const updatedData = [...prevData];
            const field = updatedData[index];
            field.editing = true;
            return updatedData;
        });
    };

    const handleInputChange = (index, value) => {
        setUserData((prevData) => {
            const updatedData = [...prevData];
            const field = updatedData[index];
            field.value = value;
            return updatedData;
        });
    };

    // ////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////
    const handleSave = async (index) => {
        const field = userData[index];
        const { value: file } = field;

        setUserData((prevData) => {
            const updatedData = [...prevData];
            const field = updatedData[index];
            field.editing = false;
            return updatedData;
        });

        if (field.type === "file" && file) {
            try {
                const uploadData = new FormData();
                uploadData.append("file", file);
                uploadData.append("upload_preset", "upload_hotel_booking");
                setLoadingImage(true);

                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/wakai-megumi/image/upload",
                    uploadData
                );

                const imageUrl = response.data.url;

                setUserData((prevData) => {
                    const updatedData = [...prevData];
                    const field = updatedData[index];
                    field.value = imageUrl;
                    return updatedData;
                });
                setLoadingImage(false);
            } catch (error) {
                console.log(error);
                setLoadingImage(false);
            }
        }
    };

    const handleSaveAll = async () => {
        try {
            setUpdateSuccess(true);
            const response = await axios.put(
                `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/user/update/${userid}`,
                {
                    username: userData[1].value,
                    email: userData[2].value,
                    country: userData[3].value,
                    city: userData[4].value,
                    address: userData[5].value,
                    phone: userData[6].value,
                    profileimage: userData[0].value,
                    id: currentUser._id
                },
                {
                    withCredentials: true,
                }
            );
            // console.log(response);
            setUpdateSuccess(false);

            setTimeout(() => {
                toast.success("Update Success");
            }, 3000);
        } catch (error) {
            console.log(error);
            setUpdateSuccess(false);

        }
    };

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            {loading ? (
                <Spinner fullScreen />
            ) : (
                <>
                    <div className="profilewrapper">
                        <table>
                            <tbody>
                                {userData.map((user, index) => (
                                    <tr className="info-row" key={index}>
                                        <th className="info-label">{user.label}:</th>
                                        {user.editing ? (
                                            <>
                                                {user.id === "profileimage" ? (
                                                    <td className="info-value">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            disabled={loadingImage}
                                                            onChange={(e) =>
                                                                handleInputChange(index, e.target.files[0])
                                                            }
                                                        />
                                                    </td>
                                                ) : (
                                                    <td className="info-value">
                                                        <input
                                                            type={user.type}
                                                            value={user.value}
                                                            onChange={(e) =>
                                                                handleInputChange(index, e.target.value)
                                                            }
                                                        />
                                                    </td>
                                                )}

                                                <td>
                                                    <button
                                                        className="edit-button"
                                                        title="Save"
                                                        onClick={() => handleSave(index)}
                                                    >
                                                        Save
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                {user.type === "file" ? (
                                                    <td className="info-value">
                                                        {user.value !== "" ? (
                                                            <>
                                                                {loadingImage ? (
                                                                    <Spinner />
                                                                ) : (
                                                                    <img
                                                                        src={user.value}
                                                                        alt="Profile"
                                                                        className="profile-image"
                                                                    />
                                                                )}
                                                            </>
                                                        ) : (
                                                            <img
                                                                src={noavatar}
                                                                alt="no user profile image "
                                                                className="profile-image"
                                                            />
                                                        )}
                                                    </td>
                                                ) : (
                                                    <td className="info-value">{user.value}</td>
                                                )}
                                                <td>
                                                    <button
                                                        className="edit-button"
                                                        title="Edit"
                                                        onClick={() => handleClick(index)}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button
                        className="button"
                        style={{
                            fontSize: "1rem",
                            border: "none",
                            outline: "none",
                            padding: "5px",
                            backgroundColor: "green",
                            color: "white",
                            marginTop: "20px",
                        }}
                        disabled={updateSuccess || loadingImage}
                        onClick={handleSaveAll}
                    >
                        Save
                    </button>
                </>
            )}
        </div>
    );
};

export default UserProfile;
