import React, { useContext, useState, useEffect } from "react";
import { Authcontext } from "../../context/Authcontext";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
// import cloudinary from "cloudinary/lib/cloudinary";
// import crypto from "crypto";

import "./Profile.scss";
import { toast } from "react-toastify";

const UserProfile = () => {
    const { currentUser } = useContext(Authcontext);
    const [loading, setLoading] = useState(true);
    const [loadingImage, setLoadingImage] = useState(true);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const id = currentUser.user._id;
    console.log(id);
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
    // cloudinary.config({
    //     cloud_name: 'wakai-megumi',
    //     api_key: '832632286875291',
    //     api_secret: 'xeyNxamtltv3rR9KAsSObbJOug8'
    // });
    useEffect(() => {
        console.log(id);
        const fetchUserData = async () => {
            try {
                const response = await axios.get(

                    `http://localhost:3000/api/v1/user/get/${id}`,
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
    // const generateSHA1 = (data) => {
    //     const hash = crypto.createHash("sha1");
    //     hash.update(data);
    //     return hash.digest("hex");
    // }

    // const generateSignature = (publicid, apiSecret) => {
    //     const timestamp = new Date().getTime();
    //     return `public_id=${publicid}&timestamp=${timestamp}${apiSecret}`;
    // };

    // const getPublicId = (url) => {
    //     const parts = url.split("/");
    //     const lastValueWithExtension = parts[parts.length - 1];
    //     const lastValue = lastValueWithExtension.split(".")[0];
    //     return lastValue;
    // };

    // const deleteImage = async (publicId) => {
    //     const cloudName = 'wakai-megumi';
    //     const timestamp = new Date().getTime();
    //     const apiKey = '832632286875291';
    //     const apiSecret = 'xeyNxamtltv3rR9KAsSObbJOug8'
    //     const id = getPublicId(publicId);
    //     const signature = generateSHA1(generateSignature(id, apiSecret));
    //     const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

    //     try {
    //         const response = await axios.post(url, {
    //             public_id: publicId,
    //             signature: signature,
    //             api_key: apiKey,
    //             timestamp: timestamp,
    //         });


    //         console.error(response);

    //     } catch (error) {
    //         console.error(error);
    //     }
    // };


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
                // await deleteImage(userData[0].value);

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
            // setUpdateSuccess(true);
            const response = await axios.put(
                `http://localhost:3000/api/v1/user/update/${id}`,
                {
                    username: userData[1].value,
                    email: userData[2].value,
                    country: userData[3].value,
                    city: userData[4].value,
                    address: userData[5].value,
                    phone: userData[6].value,
                    profileimage: userData[0].value,
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
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                    <div className="wrapper">
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
                                                        <img
                                                            src={user.value}
                                                            alt="Profile"
                                                            className="profile-image"
                                                        />
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
                        disabled={updateSuccess}
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
