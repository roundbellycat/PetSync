
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const PetList = ({ pets, setPets, setEditingPet }) => {
    const { user } = useAuth();

    const handleDelete = async (petId) => {
        try {
            await axiosInstance.delete(`/api/pets/${petId}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setPets(pets.filter((pet) => pet._id !== petId));
        } catch (error) {
            alert('Failed to delete pet.');
        }
    };

    return (
        <div>
            {pets.map((pet) => (
                <div key={pet._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
                    <h2 className="font-bold">{pet.pname}</h2>
                    <p>{pet.gender}</p>
                    <p>{pet.age}</p>
                    <p>{pet.type}</p>
                    <p>{pet.breed}</p>
                    <p>{pet.history}</p>
                    <p>{pet.owner}</p>

                    <div className="mt-2">
                        <button
                            onClick={() => setEditingPet(pet)}
                            className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                            Edit
                        </button>
                        
                        <button
                            onClick={() => handleDelete(pet._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PetList;
