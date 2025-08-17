import Navbar from '../components/Navbar';

import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import PetForm from '../components/PetForm';
import PetList from '../components/PetList';
import { useAuth } from '../context/AuthContext';

const Pets = () => {
    const { user } = useAuth();
    const [pets, setPets] = useState([]);
    const [editingPet, setEditingPet] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axiosInstance.get('/api/pets', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setPets(response.data);
            } catch (error) {
                alert('Failed to fetch pets.');
            }
        };

        fetchPets();
    }, [user]);

    return (
        <>
            <Navbar />
            {/* <div className="container mx-auto p-6"> */}
            <div className="flex gap-6">
                <div className="w-1/3">
                    <PetForm
                        pets={pets}
                        setPets={setPets}
                        editingPet={editingPet}
                        setEditingPet={setEditingPet}
                    />
                </div>

                <div className="w-2/3">
                    <PetList
                        pets={pets}
                        setPets={setPets}
                        setEditingPet={setEditingPet}
                    />
                </div>
            </div>
            {/* </div> */}
        </>
    );
};

export default Pets;