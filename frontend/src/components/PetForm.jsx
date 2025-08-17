
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const PetForm = ({ pets, setPets, editingPet, setEditingPet }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        pname: '',
        gender: '',
        age: '',
        type: '',
        breed: '',
        history: '',
        owner: ''
    });

    useEffect(() => {
        if (editingPet) {
            setFormData({
                pname: editingPet.pname,
                gender: editingPet.gender,
                age: editingPet.age,
                type: editingPet.type,
                breed: editingPet.breed,
                history: editingPet.history,
                owner: editingPet.owner,
            });
        } else {
            setFormData({
                pname: '',
                gender: '',
                age: '',
                type: '',
                breed: '',
                history: '',
                owner: ''
            });
        }
    }, [editingPet]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingPet) {
                const response = await axiosInstance.put(`/api/pets/${editingPet._id}`, formData, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setPets(pets.map((pet) => (pet._id === response.data._id ? response.data : pet)));
            } else {
                const response = await axiosInstance.post('/api/pets', formData, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setPets([...pets, response.data]);
            }
            setEditingPet(null);
            setFormData({
                pname: '',
                gender: '',
                age: '',
                type: '',
                breed: '',
                history: '',
                owner: ''
            });
        } catch (error) {
            alert('Failed to save pet profile.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
            <h1 className="text-2xl font-bold mb-4">{editingPet ? 'Pet profile: edit' : 'Pet profile: create'}</h1>

            <input
                type="text"
                placeholder="Pet name"
                value={formData.pname}
                onChange={(e) => setFormData({ ...formData, pname: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
            />

            <input
                type="text"
                placeholder="Gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
            />

            <input
                type="text"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
            />

            <input
                type="text"
                placeholder="Type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
            />

            <input
                type="text"
                placeholder="Breed"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
            />

            <input
                type="text"
                placeholder="History"
                value={formData.history}
                onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
            />

            <input
                type="text"
                placeholder="Owner"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
            />

            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                {editingPet ? 'Update Button' : 'Create Button'}
            </button>
        </form>
    );
};

export default PetForm;
